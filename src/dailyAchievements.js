import format from 'date-fns/format';
import requestCreator from './libs/requestCreator';
import getTranslations from './i18n/dailyAchievments';
import { setItem, getItem } from './utils/localStorage';
import * as twutils from './utils/tribalwars';
import getCurrentServer from './utils/getCurrentServer';
import getServerVersionCode from './utils/getServerVersionCode';
import { inTZ } from './utils/date';
import { buildURLToServerPage } from './utils/twhelp';

// ==UserScript==
// @name         Daily achievements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @version      <%= version %>
// @description  Daily achievements
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_player&mode=awards*
// @grant        none
// ==/UserScript==

const SERVER = getCurrentServer();
const LOCAL_STORAGE_KEY = 'kichiyaki_daily_achievements';
const SERVER_QUERY = `
    query server($server: String!) {
        server(key: $server) {
            key
            historyUpdatedAt
            version {
              timezone
            }
        }
    }
`;
const DAILY_STATS_QUERY = `
    query data($server: String!, $createDateGTE: Time!) {
        dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStats(server: $server, sort: ["scoreAtt DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreAtt
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreDef: dailyPlayerStats(server: $server, sort: ["scoreDef DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreDef
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreSup: dailyPlayerStats(server: $server, sort: ["scoreSup DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreSup
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByVillages: dailyPlayerStats(server: $server, sort: ["villages DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                villages
                player {
                    id
                    name
                }
            }
        }
    }
`;
let container = undefined;
const translations = getTranslations();

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cacheData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const loadData = async () => {
  let data = await requestCreator({
    query: SERVER_QUERY,
    variables: {
      server: SERVER,
    },
  });
  if (data.server) {
    const d = inTZ(data.server.historyUpdatedAt, data.server.version.timezone);
    const dailyStatsData = await requestCreator({
      query: DAILY_STATS_QUERY,
      variables: {
        server: SERVER,
        createDateGTE:
          format(d, 'yyyy-MM-dd') + 'T' + format(d, 'HH:mm:ss') + 'Z',
      },
    });
    data = {
      ...data,
      ...dailyStatsData,
    };
  }
  cacheData(data);
  return data;
};

const render = ({
  dailyPlayerStatsOrderedByScoreAtt,
  dailyPlayerStatsOrderedByScoreDef,
  dailyPlayerStatsOrderedByScoreSup,
  dailyPlayerStatsOrderedByVillages,
}) => {
  const html = `
        <div class="award-group-head">${translations.title}</div>
        <div class="award-group-content" style="text-align: center;">
            <div style="padding: 10px;">
            <h1 style="margin-bottom: 0px;"><a href="${buildURLToServerPage(
              getServerVersionCode(SERVER),
              SERVER
            )}">TWHelp</a></h1>
                <h3 style="margin-bottom: 10px; margin-top: 0;">${
                  translations.devNote
                }</h3>
                <h3 style="color: red;"><strong>${
                  translations.warning
                }</strong></h3>
                <p><strong>${translations.aotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreAtt.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${twutils.buildPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreAtt.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${translations.dotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreDef.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${twutils.buildPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreDef.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${translations.sotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreSup.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${twutils.buildPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreSup.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${translations.gpotd}</strong></p>
                ${dailyPlayerStatsOrderedByVillages.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${twutils.buildPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.villages.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
        </div>
        <div class="award-group-foot"></div>
    `;

  if (!container) {
    container = document.createElement('div');
    container.classList.add('award-group');
    document
      .querySelector('#content_value > div:nth-child(4)')
      .prepend(container);
  }

  container.innerHTML = html;
};

(async function () {
  try {
    const dataFromCache = loadDataFromCache();
    if (dataFromCache && dataFromCache.server) {
      render(dataFromCache);
    }
    const data = await loadData();
    if (data.server) {
      render(data);
    }
  } catch (error) {
    console.log('dailyAchievements', error);
  }
})();
