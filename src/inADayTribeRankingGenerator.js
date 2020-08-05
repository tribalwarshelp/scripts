import InADayParser from './libs/InADayParser';

// ==UserScript==
// @name         'In A Day' Tribe Ranking Generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @version      0.1.0
// @description  'In A Day' Tribe Ranking Generator
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=ranking&mode=in_a_day*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const TRIBE_CONTAINER_ID = 'iad_tribes';
const LIMIT_INPUT_ID = 'iad_limit';

const addTribe = () => {
  const container = document.querySelector('#' + TRIBE_CONTAINER_ID);
  const div = document.createElement('div');
  div.innerHTML = `
        <label>Tribe: </label>
        <input type="text" required />
        <button type="button">Delete</button>
    `;
  div.querySelector('button').addEventListener('click', () => {
    if (container.children.length > 1) {
      div.remove();
    }
  });
  container.appendChild(div);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const limit = parseInt(document.querySelector('#' + LIMIT_INPUT_ID).value);
  const tribes = [];
  const type =
    new URLSearchParams(window.location.search).get('type') || 'kill_att';
  document
    .querySelectorAll('#' + TRIBE_CONTAINER_ID + ' input')
    .forEach((el) => {
      if (el.value) tribes.push(el.value.trim());
    });

  let players = [];
  let page = 0;
  while (players.length < limit) {
    Dialog.show(
      'iad_loading',
      `Loaded: <strong>${players.length}/${limit}</strong>`
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
    } catch (error) {
      break;
    }
  }

  players = players.slice(0, limit);
  Dialog.show(
    'iad_result',
    `
    <textarea cols=30 rows=8 readonly>[table]
[**][||]Player[||]Tribe[||]Rank[||]Result[||]Date[/**]
${players
  .map((player, index) => {
    return `[*]${index + 1}[|][player]${player.name}[/player][|][ally]${
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
        <button type="submit">Generate</button>
        <button id="${addButtonID}" type="button">Add tribe</button>
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
