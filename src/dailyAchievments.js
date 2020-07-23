import requestCreator from './libs/requestCreator';
import { setItem, getItem } from './utils/localStorage';
import { formatPlayerURL } from './utils/tribalwars';
import getCurrentServer from './utils/getCurrentServer';

// ==UserScript==
// @name         Daily achievements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @version      0.3.0
// @description  Daily achievements
// @author       Kichiyaki http://dawid-wysokinski.pl/
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
        }
    }
`;
const DAILY_STATS_QUERY = `
    query data($server: String!, $createDateGTE: Time!) {
        dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStats(server: $server, filter: { sort: "scoreAtt DESC", createDateGTE: $createDateGTE, playerFilter: { sort: "id DESC" }, limit: 5 }) {
            items {
                scoreAtt
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreDef: dailyPlayerStats(server: $server, filter: { sort: "scoreDef DESC", createDateGTE: $createDateGTE, playerFilter: { sort: "id DESC" }, limit: 5 }) {
            items {
                scoreDef
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreSup: dailyPlayerStats(server: $server, filter: { sort: "scoreSup DESC", createDateGTE: $createDateGTE, playerFilter: { sort: "id DESC" }, limit: 5 }) {
            items {
                scoreSup
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByVillages: dailyPlayerStats(server: $server, filter: { sort: "villages DESC", createDateGTE: $createDateGTE, playerFilter: { sort: "id DESC" }, limit: 5 }) {
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
    const dailyStatsData = await requestCreator({
      query: DAILY_STATS_QUERY,
      variables: {
        server: SERVER,
        createDateGTE:
          data.server.historyUpdatedAt.split('T')[0] + 'T00:00:00Z',
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
        <div class="award-group-head">Daily achievements - probable players</div>
        <div class="award-group-content" style="text-align: center;">
            <div style="padding: 10px;">
                <p><strong>Attacker of the day</strong></p>
                ${dailyPlayerStatsOrderedByScoreAtt.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${formatPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreAtt.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>Defender of the day</strong></p>
                ${dailyPlayerStatsOrderedByScoreDef.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${formatPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreDef.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>Supporter of the day</strong></p>
                ${dailyPlayerStatsOrderedByScoreSup.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${formatPlayerURL(
                        item.player.id
                      )}">${
                        item.player.name
                      } - ${item.scoreSup.toLocaleString()}</a></span>`
                  )
                  .join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>Great power of the day</strong></p>
                ${dailyPlayerStatsOrderedByVillages.items
                  .map(
                    (item, index) =>
                      `<span>${index + 1}. <a href="${formatPlayerURL(
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
