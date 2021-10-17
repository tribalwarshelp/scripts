import requestCreator from './libs/requestCreator';
import showPopup from './utils/showPopup';
import getCurrentServer from './utils/getCurrentServer';
import { formatDate } from './utils/date';
import * as twutils from './utils/tribalwars';
import { setItem, getItem } from './utils/localStorage';
import * as twhelputils from './utils/twhelp';
import getServerVersionCode from './utils/getServerVersionCode';
import loadTranslations from './i18n/latestEnnoblements';

// ==UserScript==
// @name         The latest ennoblements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @version      <%= version %>
// @description  Shows the latest ennoblements
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const FILTER_FORM_ID = 'le_form';
const TABLE_ID = 'le_table';
const CACHE_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_cache';
const FILTERS_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_filter';
const ICON_URL = 'https://i.imgur.com/4WP4098.png';
const query = `
    query ennoblements($server: String!, $sort: [String!], $limit: Int) {
      ennoblements(server: $server, sort: $sort, limit: $limit) {
        items {
          newOwner {
            id
            name
            tribe {
              id
              name
              tag
            }
          }
          oldOwner {
            id
            name
            tribe {
              id
              name
              tag
            }
          }
          ennobledAt
          village {
            id
            name
            x
            y
          }
        }
      }
    }
  `;
const DEFAULT_FILTER = {
  newOwner: '',
  newOwnerTribe: '',
  oldOwner: '',
  oldOwnerTribe: '',
};
const translations = loadTranslations();

const loadLatestEnnoblementsFromCache = () => {
  return getItem(CACHE_LOCAL_STORAGE_KEY);
};

const loadFilters = () => {
  return getItem(FILTERS_LOCAL_STORAGE_KEY);
};

const cacheEnnoblements = (data = {}) => {
  setItem(CACHE_LOCAL_STORAGE_KEY, data);
};

const cacheFilters = (data = {}) => {
  setItem(FILTERS_LOCAL_STORAGE_KEY, data);
};

const loadLatestEnnoblements = () => {
  return requestCreator({
    query,
    variables: {
      server: SERVER,
      limit: 50,
      sort: ['ennobledAt DESC'],
    },
  }).then(data => {
    cacheEnnoblements(data);
    return new Promise(resolve => resolve(data));
  });
};

const isValidPlayer = (obj, searchValue) => {
  return obj && obj.name.toLowerCase().includes(searchValue.toLowerCase());
};

const isValidPlayerTribe = (obj, searchValue) => {
  return (
    obj &&
    obj.tribe &&
    (obj.tribe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      obj.tribe.tag.toLowerCase().includes(searchValue.toLowerCase()))
  );
};

const filterEnnoblements = (
  ennoblements = [],
  { newOwner, newOwnerTribe, oldOwner, oldOwnerTribe } = {}
) => {
  return ennoblements.filter(ennoblement => {
    if (newOwner && !isValidPlayer(ennoblement.newOwner, newOwner)) {
      return false;
    }
    if (
      newOwnerTribe &&
      !isValidPlayerTribe(ennoblement.newOwner, newOwnerTribe)
    ) {
      return false;
    }
    if (oldOwner && !isValidPlayer(ennoblement.oldOwner, oldOwner)) {
      return false;
    }
    if (
      oldOwnerTribe &&
      !isValidPlayerTribe(ennoblement.oldOwner, oldOwnerTribe)
    ) {
      return false;
    }
    return true;
  });
};

const applyFilters = (e, ennoblements) => {
  e.preventDefault();
  const filters = {
    ...DEFAULT_FILTER,
    newOwner: e.target[0].value,
    newOwnerTribe: e.target[1].value,
    oldOwner: e.target[2].value,
    oldOwnerTribe: e.target[3].value,
  };
  document.querySelector(`#${TABLE_ID} tbody`).innerHTML =
    buildEnnoblementsRows(filterEnnoblements(ennoblements, filters)).join('');
  cacheFilters(filters);
};

const addEventListeners = (ennoblements = []) => {
  document.querySelector('#' + FILTER_FORM_ID).addEventListener('submit', e => {
    applyFilters(e, ennoblements);
  });
};

const getPlayerHTML = player => {
  return player && player.name
    ? `<a href="${twutils.buildPlayerURL(player.id)}">${player.name}</a> (${
        player.tribe && player.tribe.tag
          ? `<a href="${twutils.buildTribeURL(player.tribe.id)}">${
              player.tribe.tag
            }</a>`
          : '-'
      })`
    : '-';
};

const getVillageHTML = village => {
  return `<a href="${twutils.buildVillageURL(
    village.id
  )}">${twutils.buildVillageName(village.name, village.x, village.y)}</a>`;
};

const buildEnnoblementsRows = ennoblements => {
  return ennoblements.map(ennoblement => {
    return `<tr>
              <td>${getVillageHTML(ennoblement.village)}</td>
              <td>${getPlayerHTML(ennoblement.newOwner)}</td>
              <td>${getPlayerHTML(ennoblement.oldOwner)}</td>
              <td>${formatDate(ennoblement.ennobledAt)}</td>
            </tr>`;
  });
};

const renderLatestEnnoblements = (ennoblements = [], filters = {}) => {
  const prepared = {
    ...DEFAULT_FILTER,
    ...filters,
  };
  const html = `
        <form style="margin-bottom: 15px" id="${FILTER_FORM_ID}">
        <h1 style="margin-bottom: 0px; text-align: center;"><a href="${twhelputils.buildURLToServerPage(
          getServerVersionCode(SERVER),
          SERVER
        )}">TWHelp</a></h1>
            <h3 style="margin-bottom: 10px; margin-top: 0;">${
              translations.devNote
            }</h3>
          <h3 style="margin-bottom: 5px">${translations.filters}</h3>
          <input type="text" placeholder="${translations.newOwner}" value="${
    prepared.newOwner
  }" />
          <input type="text" placeholder="${
            translations.newOwnerTribe
          }" value="${prepared.newOwnerTribe}" />
          <input type="text" placeholder="${translations.oldOwner}" value="${
    prepared.oldOwner
  }" />
          <input type="text" placeholder="${
            translations.oldOwnerTribe
          }" value="${prepared.oldOwnerTribe}" />
          <div>
            <button type="submit">${translations.apply}</button>
          </div>
        </form>
        <table class="vis" id="${TABLE_ID}" style="width: 100%">
          <thead>
            <tr>
              <th>${translations.village}</th>
              <th>${translations.newOwner}</th>
              <th>${translations.oldOwner}</th>
              <th>${translations.date}</th>
            </tr>
          </thead>
          <tbody>
            ${buildEnnoblementsRows(
              filterEnnoblements(ennoblements, prepared)
            ).join('')}
          </tbody>
        </table>
        `;

  showPopup({
    title: translations.ennoblements,
    id: 'ennoblements',
    html,
  });

  addEventListeners(ennoblements);
};

const handleButtonClick = async () => {
  try {
    const cache = loadLatestEnnoblementsFromCache();
    const filters = loadFilters();
    if (
      cache.ennoblements &&
      Array.isArray(cache.ennoblements.items) &&
      cache.ennoblements.items.length > 0
    ) {
      renderLatestEnnoblements(cache.ennoblements.items, filters);
    }
    const { ennoblements } = await loadLatestEnnoblements();
    renderLatestEnnoblements(ennoblements.items, filters);
  } catch (error) {
    console.log('latestEnnoblements', error);
  }
};

const renderButton = () => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '5px';
  container.style.left = '4px';
  container.style.zIndex = '50000';

  const button = document.createElement('a');
  button.innerHTML = `<img src="${ICON_URL}">`;
  button.title = translations.showLatestEnnoblements;
  button.style.cursor = 'pointer';
  button.addEventListener('click', handleButtonClick);
  container.append(button);

  document.body.appendChild(container);
};

(function () {
  renderButton();
})();
