import differenceInMinutes from 'date-fns/differenceInMinutes';
import getTranslations from './i18n/extendedMapPopup';
import requestCreator from './libs/requestCreator';
import formatDate from './utils/formatDate';
import getCurrentServer from './utils/getCurrentServer';
import { calcDistanceBetweenTwoPoints } from './utils/math';
import { setItem, getItem } from './utils/localStorage';

// ==UserScript==
// @name         Extended Map Popup
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @version      0.5.0
// @description  Extended Map Popup
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==

const SERVER = getCurrentServer();
const CURR_SERVER_CONFIG = `
    query server($key: String!) {
        server(key: $key) {
            config {
                speed
                snob {
                  maxDist
                }
            }
        }
    }
`;
const LAST_VILLAGE_CONQUER_QUERY = `
    query ennoblements($server: String!, $filter: EnnoblementFilter!) {
        ennoblements(server: $server, filter: $filter) {
            items {
                ennobledAt
                village {
                    id
                }
            }
        }
    }
`;
const SERVER_CONFIG_LOCAL_STORAGE_KEY =
  'kiszkowaty_extended_map_popup_server_cfg';
const translations = getTranslations();

const loadServerConfigFromLocalStorage = () => {
  return getItem(SERVER_CONFIG_LOCAL_STORAGE_KEY);
};

const cacheServerConfig = (data = {}) => {
  setItem(SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};

const isConfigExpired = (date) => {
  return Math.abs(differenceInMinutes(date, new Date())) >= 60 * 24;
};

const loadServerConfig = async () => {
  let data = loadServerConfigFromLocalStorage();
  if (
    !data ||
    !data.server ||
    isConfigExpired(new Date(data.loadedAt)) ||
    !data.server.config ||
    !data.server.config.speed ||
    !data.server.config.snob ||
    !data.server.config.snob.maxDist
  ) {
    data = await requestCreator({
      query: CURR_SERVER_CONFIG,
      variables: {
        key: SERVER,
      },
    });
    data.loadedAt = new Date();
    cacheServerConfig(data);
  }
  return data && data.server && data.server.config ? data.server.config : {};
};

const loadVillageData = async (id, { cacheOnly = false } = {}) => {
  if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) {
    return TWMap.popup.extendedMapPopupCache[id];
  }

  try {
    const data = await requestCreator({
      query: LAST_VILLAGE_CONQUER_QUERY,
      variables: {
        server: SERVER,
        filter: {
          villageID: [id],
          sort: 'ennobledAt DESC',
        },
      },
    });
    TWMap.popup.extendedMapPopupCache[id] = data;
    return data;
  } catch (error) {
    console.log('loadVillageData', error);
  }
};

const calcLoyalty = (ennobledAt, speed) => {
  let loyalty =
    25 + Math.abs(differenceInMinutes(ennobledAt, new Date())) * (speed / 60);
  if (loyalty > 100) {
    loyalty = 100;
  }
  return Math.floor(loyalty);
};

const renderAdditionalInfo = (id, data, cfg) => {
  const coords = TWMap.CoordByXY(TWMap.villageKey[id]);
  const ennoblement =
    data &&
    data.ennoblements &&
    data.ennoblements.items &&
    data.ennoblements.items.length > 0
      ? data.ennoblements.items[0]
      : undefined;
  const parent = document.querySelector('#map_popup #info_content tbody');

  let lastEnnobledAt = parent.querySelector('#lastEnnobledAt');
  if (!lastEnnobledAt) {
    lastEnnobledAt = document.createElement('tr');
    lastEnnobledAt.id = 'lastEnnobledAt';
    parent.appendChild(lastEnnobledAt);
  }
  lastEnnobledAt.innerHTML = `
          <td>
              ${translations.ennobledAt}:
          </td>
          <td>
              ${
                ennoblement
                  ? formatDate(ennoblement.ennobledAt)
                  : translations.never
              }
          </td>
      `;

  let loyalty = parent.querySelector('#loyalty');
  if (!loyalty) {
    loyalty = document.createElement('tr');
    loyalty.id = 'loyalty';
    parent.appendChild(loyalty);
  }
  loyalty.innerHTML = `
          <td>
              ${translations.possibleLoyalty}:
          </td>
          <td>
              ${
                ennoblement
                  ? calcLoyalty(new Date(ennoblement.ennobledAt), cfg.speed)
                  : 100
              }
          </td>
      `;

  let canSendNoble = parent.querySelector('#canSendNoble');
  if (!canSendNoble) {
    canSendNoble = document.createElement('tr');
    canSendNoble.id = 'canSendNoble';
    parent.appendChild(canSendNoble);
  }
  canSendNoble.innerHTML = `
          <td>
              ${translations.canSendNoble}:
          </td>
          <td>
              ${
                calcDistanceBetweenTwoPoints(
                  coords[0],
                  coords[1],
                  window.game_data.village.x,
                  window.game_data.village.y
                ) < cfg.snob.maxDist
                  ? translations.yes
                  : translations.no
              }
          </td>
      `;
};

const createLoadVillageHandler = (cfg) => async (e) => {
  TWMap.popup._loadVillage(e);
  const data = await loadVillageData(parseInt(e));
  renderAdditionalInfo(parseInt(e), data, cfg);
};

const createDisplayForVillageHandler = (cfg) => async (e, a, t) => {
  TWMap.popup._displayForVillage(e, a, t);
  const data = await loadVillageData(parseInt(e.id), {
    cacheOnly: window.game_data.features.Premium.active,
  });
  renderAdditionalInfo(parseInt(e.id), data, cfg);
};

(async function () {
  try {
    const config = await loadServerConfig();

    TWMap.popup.extendedMapPopupCache = {};
    TWMap.popup._loadVillage = TWMap.popup.loadVillage;
    TWMap.popup.loadVillage = createLoadVillageHandler(config);
    TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
    TWMap.popup.displayForVillage = createDisplayForVillageHandler(config);
  } catch (error) {
    console.log('extended map popup', error);
  }
})();
