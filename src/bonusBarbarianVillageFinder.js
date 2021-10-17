import requestCreator from './libs/requestCreator';
import getTranslations from './i18n/bonusBarbarianVillageFinder';
import getCurrentServer from './utils/getCurrentServer';
import * as twutils from './utils/tribalwars';
import { calcDistanceBetweenTwoPoints } from './utils/math';

// ==UserScript==
// @name         Bonus barbarian village finder
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @version      <%= version %>
// @description  Bonus barbarian village finder
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==

const SERVER = getCurrentServer();
const QUERY = `
  query villages($server: String!, $filter: VillageFilter, $sort: [String!], $offset: Int) {
    villages(server: $server, filter: $filter, offset: $offset, sort: $sort) {
      total
      items {
        id
        name
        bonus
        x
        y
      }
    }
  }
`;
const TABLE_ID = 'bonusBarbarianVillageFinderTable';
const ACTUAL_COORDS_ID = 'actualCoords';
const translations = getTranslations();
let container = undefined;

const buildReqOptions = (bonus, offset) => {
  return {
    query: QUERY,
    variables: {
      server: SERVER,
      sort: ['id DESC'],
      filter: {
        bonus,
        playerID: [0],
      },
      offset,
    },
  };
};

const loadBonusVillages = async bonus => {
  const { villages } = await requestCreator(buildReqOptions(bonus, 0));
  for (let i = villages.length; i < villages.total; i += 1000) {
    const data = await requestCreator(buildReqOptions(bonus, 0));
    villages.items = [...villages.items, ...data.villages.items];
  }
  return villages;
};

const searchBonusBarbarianVillages = async e => {
  e.preventDefault();

  const villages = await loadBonusVillages(parseInt(e.target[0].value));
  const coords = TWMap.pos;

  villages.items = villages.items
    .map(item => {
      return {
        ...item,
        distance: calcDistanceBetweenTwoPoints(
          coords[0],
          coords[1],
          item.x,
          item.y
        ),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  document.querySelector('#' + TABLE_ID).innerHTML = buildTableBodyHTML(
    villages.items
  );
};

const getBonuses = () => {
  let bonuses = [];
  for (let i in TWMap.bonus_data) {
    bonuses.push({
      value: i,
      text: TWMap.bonus_data[i].text,
    });
  }
  return bonuses;
};

const buildTableBodyHTML = villages => {
  return `
        <tbody>
            <tr>
                <th>
                    ${translations.village}
                </th>
                <th>
                    ${translations.distance}
                </th>
                <th>
                    ${translations.action}
                </th>
            </tr>
            ${
              Array.isArray(villages)
                ? villages
                    .map(
                      village => `<tr>
                <td>
                    <a href="${twutils.buildVillageURL(village.id)}">
                        ${twutils.buildVillageName(
                          village.name,
                          village.x,
                          village.y
                        )}
                    </a>
                </td>
                <td>
                    ${village.distance.toFixed(1)}
                </td>
                <td>
                    <a href="#" onclick="return TWMap.focusUserSpecified(${
                      village.x
                    }, ${village.y})">${translations.center}</a>
                </td>
            </tr>`
                    )
                    .join('')
                : ''
            }
        </tbody>
    `;
};

const updateActualCoords = () => {
  document.querySelector('#' + ACTUAL_COORDS_ID).innerHTML = `${
    translations.actualCoords
  }: <strong>${TWMap.pos.join('|')}</strong>`;
};

const renderUI = () => {
  const html = `
        <p id="${ACTUAL_COORDS_ID}"></p>
        <form>
            <select>
                ${getBonuses()
                  .map(
                    bonus =>
                      `<option value="${bonus.value}">${bonus.text}</option>`
                  )
                  .join('')}
            </select>
            <button type="submit">${
              translations.searchBonusBarbarianVillages
            }</button>
        </form>
        <table class="vis" style="width: 100%;" id="${TABLE_ID}">
            ${buildTableBodyHTML()}
        </table>
    `;

  if (!container) {
    container = document.createElement('div');
    container.classList.add('containerBorder');
    container.style.clear = 'both';
    document.querySelector('#map_big').appendChild(container);
  }

  container.innerHTML = html;
  container
    .querySelector('form')
    .addEventListener('submit', searchBonusBarbarianVillages);
  updateActualCoords();
  setInterval(updateActualCoords, 1000);
};

(function () {
  renderUI();
})();
