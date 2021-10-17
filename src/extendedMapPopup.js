import addMinutes from 'date-fns/addMinutes';
import getTranslations from './i18n/extendedMapPopup';
import requestCreator from './libs/requestCreator';
import { formatDate } from './utils/date';
import getCurrentServer from './utils/getCurrentServer';
import { calcDistanceBetweenTwoPoints } from './utils/math';
import buildUnitImgURL from './utils/buildUnitImgURL';
import { setItem, getItem } from './utils/localStorage';
import { calcAttackDuration } from './utils/tribalwars';
import calcLoyalty from './utils/calcLoyalty';

// ==UserScript==
// @name         Extended map popup
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @version      <%= version %>
// @description  Extended map popup
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==

const SERVER = getCurrentServer();
const CURR_SERVER_CONFIG = `
    query server($key: String!) {
        server(key: $key) {
            config {
                speed
                unitSpeed
                snob {
                  maxDist
                }
            }
            unitConfig {
              spear {
                speed
              }
              sword {
                speed
              }
              axe {
                speed
              }
              archer {
                speed
              }
              spy {
                speed
              }
              light {
                speed
              }
              marcher {
                speed
              }
              heavy {
                speed
              }
              ram {
                speed
              }
              catapult {
                speed
              }
              knight {
                speed
              }
              snob {
                speed
              }
            }
        }
    }
`;
const LAST_CONQUER_QUERY = `
    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {
        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {
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

const loadConfigFromLocalStorage = () => {
  return getItem(SERVER_CONFIG_LOCAL_STORAGE_KEY);
};

const cacheServerConfig = (data = {}) => {
  setItem(SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};

const isConfigExpired = date => {
  return Math.abs(date.getTime() - new Date().getTime()) > 1000 * 60 * 60 * 24;
};

const loadConfig = async () => {
  let data = loadConfigFromLocalStorage();
  if (
    !data ||
    !data.server ||
    isConfigExpired(new Date(data.loadedAt)) ||
    !data.server.config ||
    !data.server.config.speed ||
    !data.server.config.snob ||
    !data.server.config.snob.maxDist ||
    !data.server.config.unitSpeed ||
    !data.server.unitConfig
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
  return data && data.server && data.server.config
    ? { config: data.server.config, unitConfig: data.server.unitConfig }
    : {};
};

const loadVillageData = async (id, { cacheOnly = false } = {}) => {
  if (!id) {
    return;
  }

  if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) {
    return TWMap.popup.extendedMapPopupCache[id];
  }

  try {
    const data = await requestCreator({
      query: LAST_CONQUER_QUERY,
      variables: {
        server: SERVER,
        sort: ['ennobledAt DESC'],
        filter: {
          villageID: [id],
        },
        limit: 1,
      },
    });
    TWMap.popup.extendedMapPopupCache[id] = data;
    return data;
  } catch (error) {
    console.log('loadVillageData', error);
  }
};

const getAvailableUnits = (unitCfg = {}) => {
  const units = [];
  for (let unit in unitCfg) {
    if (unitCfg[unit].speed !== 0) {
      units.push({
        ...unitCfg[unit],
        name: unit,
        img: buildUnitImgURL(unit),
      });
    }
  }
  return units;
};

const getUnitTdBgColor = index => (index % 2 === 0 ? '#f8f4e8' : '#ded3b9;');

const buildUnitHeader = (unit, index) => {
  return `
    <td style="padding: 2px; background-color: ${getUnitTdBgColor(index)};">
      <img
        src="${unit.img}"
        title="${unit.name}"
        alt="${unit.name}"
      />
    </td>
  `;
};

const buildUnitArrivalInfo = (t, index) => {
  return `
    <td style="padding: 2px; background-color: ${getUnitTdBgColor(index)};">
      ${formatDate(addMinutes(Timing.getCurrentServerTime(), t))}
    </td>
  `;
};

const renderAdditionalInfo = (id, data, { config, unitConfig }) => {
  const coords = TWMap.CoordByXY(TWMap.villageKey[id]);
  const distance = calcDistanceBetweenTwoPoints(
    coords[0],
    coords[1],
    window.game_data.village.x,
    window.game_data.village.y
  );
  const ennoblement =
    data &&
    data.ennoblements &&
    data.ennoblements.items &&
    data.ennoblements.items.length > 0
      ? data.ennoblements.items[0]
      : undefined;
  const parent = document.querySelector('#map_popup #info_content tbody');

  let unitsEl = parent.querySelector('#units');
  if (!unitsEl) {
    unitsEl = document.createElement('tr');
    unitsEl.id = 'units';
    parent.appendChild(unitsEl);
  }
  const units = getAvailableUnits(unitConfig);
  unitsEl.innerHTML = `
          <td colspan="2">
            <table style="border: 1px solid #ded3b9; max-width: 450px;"
              width="100%"
              cellpadding="0"
              cellspacing="0">
              <tbody>
                <tr class="center">
                  ${units.map(buildUnitHeader).join('')}
                </tr>
                <tr class="center">
                  ${units
                    .map((unit, index) => {
                      return buildUnitArrivalInfo(
                        calcAttackDuration(distance, unit.speed),
                        index
                      );
                    })
                    .join('')}
                </tr>
              </tbody>
            </table>
          </td>
      `;

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
                  ? calcLoyalty(new Date(ennoblement.ennobledAt), config.speed)
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
                distance < config.snob.maxDist
                  ? translations.yes
                  : translations.no
              }
          </td>
      `;
};

const createLoadVillageHandler = cfg => async e => {
  TWMap.popup._loadVillage(e);
  const data = await loadVillageData(parseInt(e));
  if (data) {
    renderAdditionalInfo(parseInt(e), data, cfg);
  }
};

const createDisplayForVillageHandler = cfg => async (e, a, t) => {
  TWMap.popup._displayForVillage(e, a, t);
  const data = await loadVillageData(parseInt(e.id), {
    cacheOnly: window.game_data.features.Premium.active,
  });
  if (data) {
    renderAdditionalInfo(parseInt(e.id), data, cfg);
  }
};

(async function () {
  try {
    const configs = await loadConfig();

    TWMap.popup.extendedMapPopupCache = {};
    TWMap.popup._loadVillage = TWMap.popup.loadVillage;
    TWMap.popup.loadVillage = createLoadVillageHandler(configs);
    TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
    TWMap.popup.displayForVillage = createDisplayForVillageHandler(configs);
  } catch (error) {
    console.log('extended map popup', error);
  }
})();
