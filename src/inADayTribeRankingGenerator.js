import InADayParser from './libs/InADayParser';
import getTranslations from './i18n/inADayTribeRankingGenerator';
import wait from './utils/wait';

// ==UserScript==
// @name         'In A Day' tribe ranking generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @version      <%= version %>
// @description  'In A Day' tribe ranking generator
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=ranking*mode=in_a_day*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const TRIBE_CONTAINER_ID = 'iad_tribes';
const LIMIT_INPUT_ID = 'iad_limit';
const translations = getTranslations();

const addTribe = () => {
  const container = document.querySelector('#' + TRIBE_CONTAINER_ID);
  const div = document.createElement('div');
  div.innerHTML = `
        <label>${translations.tribe}: </label>
        <input type="text" required />
        <button type="button">${translations.delete}</button>
    `;
  div.querySelector('button').addEventListener('click', () => {
    if (container.children.length > 1) {
      div.remove();
    }
  });
  container.appendChild(div);
};

const handleFormSubmit = async e => {
  e.preventDefault();
  const limit = parseInt(document.querySelector('#' + LIMIT_INPUT_ID).value);
  const tribes = [];
  const type =
    new URLSearchParams(window.location.search).get('type') || 'kill_att';
  document.querySelectorAll('#' + TRIBE_CONTAINER_ID + ' input').forEach(el => {
    if (el.value) tribes.push(el.value.trim());
  });

  let players = [];
  let page = 0;
  while (players.length < limit) {
    Dialog.show(
      'iad_loading',
      `${translations.loaded}: <strong>${players.length}/${limit}</strong>`
    );
    try {
      const response = await fetch(
        TribalWars.buildURL('', {
          screen: 'ranking',
          mode: 'in_a_day',
          type,
          offset: page * 25,
        })
      );
      const html = await response.text();
      const parser = new InADayParser(html, {
        tribes,
      });
      if (parser.trs.length !== 26) break;
      players = [...players, ...parser.parse()];
      page++;
      await wait(200);
    } catch (error) {
      break;
    }
  }

  if (players.length > limit) {
    players = players.slice(0, limit);
  }

  Dialog.show(
    'iad_result',
    `
    <textarea cols=30 rows=8 readonly>[table]
[**][||]${translations.player}[||]${translations.tribe}[||]${
      translations.rank
    }[||]${translations.score}[||]${translations.date}[/**]
${players
  .map((player, index) => {
    return `[*]${index + 1}.[|][player]${player.name}[/player][|][ally]${
      player.tribe
    }[/ally][|]${player.rank}[|]${player.score.toLocaleString()}[|]${
      player.date
    }`;
  })
  .join('\n')}
[/table]</textarea>
  `
  );
};

const renderUI = () => {
  const addButtonID = 'iad_add';

  const div = document.createElement('div');
  const html = `
    <form>
        <div id="${TRIBE_CONTAINER_ID}">
        </div>
        <div>
            <label>Limit: </label>
            <input id="${LIMIT_INPUT_ID}" type="number" min="1" value="10" required />
        </div>
        <button type="submit">${translations.generate}</button>
        <button id="${addButtonID}" type="button">${translations.addTribe}</button>
    </form>
  `;
  div.innerHTML = html;
  document
    .querySelector('#content_value > table > tbody > tr > td:nth-child(2)')
    .prepend(div);

  div.querySelector('form').addEventListener('submit', handleFormSubmit);
  div.querySelector('#' + addButtonID).addEventListener('click', addTribe);

  addTribe();
};

(function () {
  try {
    renderUI();
  } catch (error) {
    console.log(`'In A Day' Tribe Ranking Generator`, error);
  }
})();
