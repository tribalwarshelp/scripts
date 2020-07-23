import requestCreator from './libs/requestCreator';
import getCurrentServer from './utils/getCurrentServer';
import { formatVillageURL, formatVillageName } from './utils/tribalwars';

// ==UserScript==
// @name         Bonus barbarian village finder
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @version      0.3.0
// @description  Bonus barbarian village finder
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==

const SERVER = getCurrentServer();
const QUERY = `
  query villages($server: String!, $filter: VillageFilter) {
    villages(server: $server, filter: $filter) {
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
let container = undefined;

const buildReqOptions = (bonus, offset) => {
  return {
    query: QUERY,
    variables: {
      server: SERVER,
      filter: {
        bonus,
        sort: 'id DESC',
        playerID: [0],
        offset,
      },
    },
  };
};

const loadBonusVillages = async (bonus) => {
  const { villages } = await requestCreator(buildReqOptions(bonus, 0));
  for (let i = villages.length; i < villages.total; i += 1000) {
    const data = await requestCreator(buildReqOptions(bonus, 0));
    villages.items = [...villages.items, ...data.villages.items];
  }
  return villages;
};

const searchBonusBarbarianVillages = async (e) => {
  e.preventDefault();

  const villages = await loadBonusVillages(parseInt(e.target[0].value));
  const coords = TWMap.pos;

  villages.items = villages.items
    .map((item) => {
      const a = coords[0] - item.x;
      const b = coords[1] - item.y;
      return {
        ...item,
        distance: Math.sqrt(a * a + b * b),
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

const buildTableBodyHTML = (villages) => {
  return `
        <tbody>
            <tr>
                <th>
                    Village
                </th>
                <th>
                    Distance
                </th>
                <th>
                    Action
                </th>
            </tr>
            ${
              Array.isArray(villages)
                ? villages
                    .map(
                      (village) => `<tr>
                <td>
                    <a href="${formatVillageURL(village.id)}">
                        ${formatVillageName(village.name, village.x, village.y)}
                    </a>
                </td>
                <td>
                    ${village.distance.toFixed(1)}
                </td>
                <td>
                    <a href="#" onclick="return TWMap.focusUserSpecified(${
                      village.x
                    }, ${village.y})">Center</a>
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
  document.querySelector(
    '#' + ACTUAL_COORDS_ID
  ).innerHTML = `Actual coords: <strong>${TWMap.pos.join('|')}</strong>`;
};

const renderUI = () => {
  const html = `
        <p id="${ACTUAL_COORDS_ID}"></p>
        <form>
            <select>
                ${getBonuses()
                  .map(
                    (bonus) =>
                      `<option value="${bonus.value}">${bonus.text}</option>`
                  )
                  .join('')}
            </select>
            <button type="submit">Search bonus barbarian villages</button>
        </form>
        <table class="vis" style="width: 100%;" id="${TABLE_ID}">
            ${buildTableBodyHTML()}
        </table>
    `;

  if (!container) {
    container = document.createElement('div');
    container.classList.add('containerBorder');
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
