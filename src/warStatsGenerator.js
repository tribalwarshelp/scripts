import requestCreator from './libs/requestCreator';
import getTranslations from './i18n/warStatsGenerator';
import getServer from './utils/getCurrentServer';
import getServerVersionCode from './utils/getServerVersionCode';
import * as twhelputils from './utils/twhelp';
import showPopup, { POPUP_SELECTOR } from './utils/showPopup';

// ==UserScript==
// @name         War stats generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @version      <%= version %>
// @description  War stats generator
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=ranking*mode=wars*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getServer();
const SIDE_ONE_BUTTON_ID = 'sideOneAdd';
const SIDE_ONE_INPUT_CONTAINER_ID = 'sideOneInputs';
const SIDE_TWO_BUTTON_ID = 'sideTwoAdd';
const SIDE_TWO_INPUT_CONTAINER_ID = 'sideTwoInputs';
const TO_INPUT_ID = 'to';
const FROM_INPUT_ID = 'from';
const RESULT_CONTAINER_ID = 'warStatsResult';
const TRIBES_QUERY = `
  query tribes($server: String!, $filter: TribeFilter) {
    tribes(server: $server, filter: $filter) {
      items {
        id
        tag
      }
    }
  }
`;
const ENNOBLEMENTS_QUERY = `
  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {
    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {
      total
    }
    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {
      total
    }
  }
`;
const translations = getTranslations();

const showResult = (sideOne = 0, sideTwo = 0) => {
  const html = `
    <div>
      <h3>${translations.conquers}:</h3>
      <p style="margin: 0;"><strong>${
        translations.sideOne
      }: ${sideOne}</strong></p>
      <p style="margin: 0;"><strong>${
        translations.sideTwo
      }: ${sideTwo}</strong></p>
      <p style="margin: 0;"><strong>${translations.difference}: ${Math.abs(
    sideOne - sideTwo
  )}</strong></p>
      <hr style="margin: 10px 0;" />
    </div>
  `;
  document.querySelector('#' + RESULT_CONTAINER_ID).innerHTML = html;
};

const createAddTribeHandler = container => {
  return () => {
    const div = document.createElement('div');
    div.innerHTML = `
        <label>${translations.tribeTag}: </label>
        <input type="text" required />
        <button type="button" class="btn">${translations.delete}</button>
    `;
    div.querySelector('button').addEventListener('click', () => {
      div.remove();
    });
    container.appendChild(div);
  };
};

const handleFormSubmit = async e => {
  e.preventDefault();

  const sideOneTags = [];
  const sideTwoTags = [];
  e.target
    .querySelectorAll(`#${SIDE_ONE_INPUT_CONTAINER_ID} input`)
    .forEach(el => {
      if (el.value.trim()) {
        sideOneTags.push(el.value.trim());
      }
    });
  e.target
    .querySelectorAll(`#${SIDE_TWO_INPUT_CONTAINER_ID} input`)
    .forEach(el => {
      if (el.value.trim()) {
        sideTwoTags.push(el.value.trim());
      }
    });
  console.log('sideOneTags', sideOneTags, 'sideTwoTags', sideTwoTags);

  if (sideOneTags.length === 0)
    return UI.ErrorMessage(translations.notEnoughTribesSideOne);
  if (sideTwoTags.length === 0)
    return UI.ErrorMessage(translations.notEnoughTribesSideTwo);

  const fromInputs = document.querySelectorAll(
    `${POPUP_SELECTOR} form #${FROM_INPUT_ID} input`
  );
  let ennobledAtGTE;
  if (fromInputs.length === 2 && fromInputs[0].value && fromInputs[1].value) {
    ennobledAtGTE = new Date(
      `${fromInputs[0].value}T${fromInputs[1].value}:00`
    );
  }
  const toInputs = document.querySelectorAll(
    `${POPUP_SELECTOR} form #${TO_INPUT_ID} input`
  );
  let ennobledAtLTE;
  if (toInputs.length === 2 && toInputs[0].value && toInputs[1].value) {
    ennobledAtLTE = new Date(`${toInputs[0].value}T${toInputs[1].value}:00`);
  }
  e.target.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });

  try {
    const { tribes } = await requestCreator({
      query: TRIBES_QUERY,
      variables: {
        server: SERVER,
        filter: {
          tag: [...sideOneTags, ...sideTwoTags],
        },
      },
    });
    const sideOneTribes = tribes.items
      .filter(item => sideOneTags.some(tag => item.tag === tag))
      .map(tribe => tribe.id);
    const sideTwoTribes = tribes.items
      .filter(item => sideTwoTags.some(tag => item.tag === tag))
      .map(tribe => tribe.id);

    const { sideOneEnnoblements, sideTwoEnnoblements } = await requestCreator({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        server: SERVER,
        sideOneFilter: {
          newOwnerTribeID: sideOneTribes,
          oldOwnerTribeID: sideTwoTribes,
          ennobledAtGTE,
          ennobledAtLTE,
        },
        sideTwoFilter: {
          newOwnerTribeID: sideTwoTribes,
          oldOwnerTribeID: sideOneTribes,
          ennobledAtGTE,
          ennobledAtLTE,
        },
      },
    });
    console.log(
      'sideOneEnnoblements',
      sideOneEnnoblements,
      'sideTwoEnnoblements',
      sideTwoEnnoblements
    );

    showResult(sideOneEnnoblements.total, sideTwoEnnoblements.total);
  } catch (error) {
    console.log('handleFormSubmit', error);
  }
  e.target.querySelectorAll('button').forEach(button => {
    button.disabled = false;
  });
};

const showWarStatsForm = e => {
  const html = `
        <form>
        <h1 style="margin-bottom: 0px; text-align: center;"><a href="${twhelputils.buildURLToServerPage(
          getServerVersionCode(SERVER),
          SERVER
        )}">TWHelp</a></h1>
            <h3 style="margin-bottom: 10px; margin-top: 0;">${
              translations.devNote
            }</h3>
            <div id="${RESULT_CONTAINER_ID}">
            </div>
            <div style="margin-bottom: 10px;">
              <div id="${FROM_INPUT_ID}">
                <label>${translations.from}: </label>
                <input type="date" required />
                <input type="time" required />
              </div>
              <div id="${TO_INPUT_ID}">
                <label>${translations.to}: </label>
                <input type="date" required />
                <input type="time" required />
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;">
                <div>
                    <h3>${translations.sideOne}</h3>
                    <div id="${SIDE_ONE_INPUT_CONTAINER_ID}">
                    </div>
                    <button id="${SIDE_ONE_BUTTON_ID}" class="btn" type="button">${
    translations.addTribe
  }</button>
                </div>
                <div style="margin: 0 5px;"></div>
                <div>
                    <h3>${translations.sideTwo}</h3>
                    <div id="${SIDE_TWO_INPUT_CONTAINER_ID}">
                    </div>
                    <button id="${SIDE_TWO_BUTTON_ID}" class="btn" type="button">${
    translations.addTribe
  }</button>
                </div>
            </div>
            <div style="text-align: center;">
              <button class="btn" type="submit">${
                translations.generateWarStats
              }</button>
            </div>
        </form>
    `;

  showPopup({ title: translations.warStatsGenerator, id: 'warStats', html, e });

  document
    .querySelector(`${POPUP_SELECTOR} form #${SIDE_ONE_BUTTON_ID}`)
    .addEventListener(
      'click',
      createAddTribeHandler(
        document.querySelector('#' + SIDE_ONE_INPUT_CONTAINER_ID)
      )
    );
  document
    .querySelector(`${POPUP_SELECTOR} form #${SIDE_TWO_BUTTON_ID}`)
    .addEventListener(
      'click',
      createAddTribeHandler(
        document.querySelector('#' + SIDE_TWO_INPUT_CONTAINER_ID)
      )
    );
  document
    .querySelector(`${POPUP_SELECTOR} form`)
    .addEventListener('submit', handleFormSubmit);
};

const renderUI = () => {
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = translations.generateWarStats;
  button.addEventListener('click', showWarStatsForm);
  div.appendChild(button);

  document.querySelector('#wars_ranking_table').parentElement.prepend(div);
};

(function () {
  try {
    renderUI();
  } catch (error) {
    console.log('war stats', error);
  }
})();
