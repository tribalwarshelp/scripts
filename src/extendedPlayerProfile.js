import requestCreator from './libs/requestCreator';
import getIDFromURL from './utils/getIDFromURL';
import getCurrentServer from './utils/getCurrentServer';
import formatDate from './utils/formatDate';
import renderPopup from './utils/renderPopup';
import { formatPlayerURL } from './utils/twstats';
import { formatTribeURL, loadInADayData } from './utils/tribalwars';
import { setItem, getItem } from './utils/localStorage';

// ==UserScript==
// @name         Extended Player Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @version      0.5
// @description  Extended Player Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php*&screen=info_player*
// @match        *://*.tribalwars.net/game.php*&screen=info_player*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
let PLAYER_ID = getIDFromURL(window.location.search);
const CURRENT_PLAYER_ID = parseInt(game_data.player.id);
if (isNaN(PLAYER_ID) || !PLAYER_ID) {
  PLAYER_ID = CURRENT_PLAYER_ID;
}
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + PLAYER_ID;
const PLAYER_QUERY = `
    query pageData($server: String!, $id: Int!, $filter: DailyPlayerStatsFilter) {
        player(server: $server, id: $id) {
            id
            name
            bestRank
            bestRankAt
            mostPoints
            mostPointsAt
            mostVillages
            mostVillagesAt
            servers
            joinedAt
            nameChanges {
                oldName
                newName
                changeDate
            }
            dailyGrowth
        }
        dailyPlayerStats(server: $server, filter: $filter) {
            items {
              rank
              rankAtt
              rankDef
              rankSup
              rankTotal
              points
              scoreAtt
              scoreAtt
              scoreDef
              scoreSup
              scoreTotal
              villages
            }
        }
    }
`;
const TRIBE_CHANGES_QUERY = `
    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {
      tribeChanges(server: $server, filter: $filter) {
        total
        items {
          oldTribe {
            id
            tag
          }
          newTribe {
            id
            tag
          }
          createdAt
        }
      }
    }
`;
const TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const TRIBE_CHANGES_PER_PAGE = 15;
const profileInfoTBody = document.querySelector('#player_info > tbody');
const actionsContainer =
  PLAYER_ID === CURRENT_PLAYER_ID
    ? profileInfoTBody
    : document.querySelector(
        '#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody'
      );
const otherElementsContainer = document.querySelector(
  PLAYER_ID === CURRENT_PLAYER_ID
    ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)'
    : '#content_value > table > tbody > tr > td:nth-child(2)'
);

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cachePlayerData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const loadData = async () => {
  const data = await requestCreator({
    query: PLAYER_QUERY,
    variables: {
      server: SERVER,
      id: PLAYER_ID,
      filter: {
        sort: 'createDate DESC',
        limit: 1,
        playerID: [PLAYER_ID],
      },
    },
  });
  if (data.player) {
    const inADay = {};
    inADay.att = await loadInADayData('kill_att', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.def = await loadInADayData('kill_def', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.sup = await loadInADayData('kill_sup', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.lootRes = await loadInADayData('loot_res', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.lootVil = await loadInADayData('loot_vil', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.scavenge = await loadInADayData('scavenge', {
      name: data.player.name,
      playerID: data.player.id,
    });
    inADay.conquer = await loadInADayData('conquer', {
      name: data.player.name,
      playerID: data.player.id,
    });
    data.player.inADay = inADay;
  }
  cachePlayerData(data);
  return data;
};

const renderTr = ({ title, data, id }) => {
  let tr = document.querySelector('#' + id);
  if (!tr) {
    tr = document.createElement('tr');
    tr.id = id;
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    profileInfoTBody.append(tr);
  }
  tr.children[0].innerHTML = title;
  tr.children[1].innerHTML = data;
};

const renderPlayerServers = (player) => {
  let playerServers = document.querySelector('#playerServers');
  if (!playerServers) {
    playerServers = document.createElement('table');
    playerServers.id = 'playerServers';
    playerServers.classList.add('vis');
    playerServers.width = '100%';
    playerServers.innerHTML = `
     <tbody>
        <tr>
          <th>
            Player's servers
          </th>
        </tr>
        <tr>
          <td>
          </td>
        </tr>
     </tbody>
    `;
    otherElementsContainer.prepend(playerServers);
  }
  playerServers.querySelector('td').innerHTML = player.servers
    .sort()
    .map(
      (server) =>
        `<a style="margin-right: 5px" href="${formatPlayerURL(
          server,
          player.id
        )}">${server}</a>`
    )
    .join('');
};

const renderPlayerOtherNames = (player) => {
  let playerOtherNames = document.querySelector('#playerOtherNames');
  if (!playerOtherNames) {
    playerOtherNames = document.createElement('div');
    playerOtherNames.id = 'playerOtherNames';
    playerOtherNames.width = '100%';
    otherElementsContainer.prepend(playerOtherNames);
  }
  playerOtherNames.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th>
              Old name
            </th>
            <th>
              New name
            </th>
            <th>
              Date
            </th>
          </tr>
        ${player.nameChanges
          .map((nameChange) => {
            return `
            <tr>
              <td>
                ${nameChange.oldName}
              </td>
              <td>
                ${nameChange.newName}
              </td>
              <td>
                ${formatDate(nameChange.changeDate, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
      </table>
  `;
};

const renderTodaysStats = (stats) => {
  let todaysStats = document.querySelector('#todaysStats');
  if (!todaysStats) {
    todaysStats = document.createElement('div');
    todaysStats.id = 'todaysStats';
    todaysStats.width = '100%';
    otherElementsContainer.prepend(todaysStats);
  }
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';

  todaysStats.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              Today's stats
            </th>
          </tr>
            <tr>
              <td>
                Points:
              </td>
              <td style="${
                stats.points > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.points).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank:
              </td>
              <td style="${
                stats.rank > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.rank)}
              </td>
            </tr>
            <tr>
              <td>
                Villages:
              </td>
              <td style="${
                stats.villages > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.villages).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ODA:
              </td>
              <td style="${
                stats.scoreAtt > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.scoreAtt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank ODA:
              </td>
              <td style="${
                stats.rankAtt > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.rankAtt)}
              </td>
            </tr>
            <tr>
              <td>
                ODD:
              </td>
              <td style="${
                stats.scoreDef > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.scoreDef).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank ODD:
              </td>
              <td style="${
                stats.rankDef > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.rankDef)}
              </td>
            </tr>
            <tr>
              <td>
                ODS:
              </td>
              <td style="${
                stats.scoreSup > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.scoreSup).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank ODS:
              </td>
              <td style="${
                stats.rankSup > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.rankSup)}
              </td>
            </tr>
            <tr>
              <td>
                OD:
              </td>
              <td style="${
                stats.scoreTotal > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.scoreTotal).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank OD:
              </td>
              <td style="${
                stats.rankTotal > 0 ? statIncreaseStyle : statDecreaseStyle
              }">
                ${Math.abs(stats.rankTotal)}
              </td>
            </tr>
      </tbody>
      </table>
  `;
};

const renderInADayRanks = (player) => {
  let inADayRanks = document.querySelector('#inADayRanks');
  if (!inADayRanks) {
    inADayRanks = document.createElement('div');
    inADayRanks.id = 'inADayRanks';
    inADayRanks.width = '100%';
    otherElementsContainer.prepend(inADayRanks);
  }

  inADayRanks.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              'In a day' best scores
            </th>
          </tr>
            <tr>
              <td>
                Units defeated while attacking:
              </td>
              <td>
                ${player.inADay.att.score.toLocaleString()} (${
    player.inADay.att.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Units defeated while defending:
              </td>
              <td>
                ${player.inADay.def.score.toLocaleString()} (${
    player.inADay.def.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Units defeated while supporting:
              </td>
              <td>
                ${player.inADay.sup.score.toLocaleString()} (${
    player.inADay.sup.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Resources plundered:
              </td>
              <td>
                ${player.inADay.lootRes.score.toLocaleString()} (${
    player.inADay.lootRes.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Villages plundered:
              </td>
              <td>
                ${player.inADay.lootVil.score.toLocaleString()} (${
    player.inADay.lootVil.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Resources gathered:
              </td>
              <td>
                ${player.inADay.scavenge.score.toLocaleString()} (${
    player.inADay.scavenge.rank
  }.)
              </td>
            </tr>
            <tr>
              <td>
                Villages conquered:
              </td>
              <td>
                ${player.inADay.conquer.score.toLocaleString()} (${
    player.inADay.conquer.rank
  }.)
              </td>
            </tr>
      </tbody>
      </table>
  `;
};

const render = ({ player, dailyPlayerStats }) => {
  [
    {
      title: 'Joined at:',
      data: formatDate(player.joinedAt),
      id: 'joined_at',
    },
    {
      title: 'Daily growth:',
      data: player.dailyGrowth.toLocaleString(),
      id: 'dg',
    },
    {
      title: 'Best rank:',
      data: player.bestRank + ' ' + `(${formatDate(player.bestRankAt)})`,
      id: 'best_rank',
    },
    {
      title: 'Most points:',
      data: player.mostPoints + ' ' + `(${formatDate(player.mostPointsAt)})`,
      id: 'most_points',
    },
    {
      title: 'Most villages:',
      data:
        player.mostVillages + ' ' + `(${formatDate(player.mostVillagesAt)})`,
      id: 'most_villages',
    },
  ].forEach((data) => {
    renderTr(data);
  });

  renderInADayRanks(player);
  if (dailyPlayerStats && dailyPlayerStats.items.length > 0) {
    renderTodaysStats(dailyPlayerStats.items[0]);
  }
  if (player.nameChanges.length > 0) {
    renderPlayerOtherNames(player);
  }
  if (player.servers.length > 0) {
    renderPlayerServers(player);
  }
};

const addTribeChangesListeners = () => {
  document
    .querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', handleShowTribeChangesButtonClick);
    });
};

const renderTribeChanges = (e, currentPage, tribeChanges) => {
  const numberOfPages =
    tribeChanges.total > 0
      ? Math.ceil(tribeChanges.total / TRIBE_CHANGES_PER_PAGE)
      : 1;
  const paginationItems = [];
  for (let i = 1; i <= numberOfPages; i++) {
    if (i === currentPage) {
      paginationItems.push(`<strong style="margin-right: 3px">>${i}<</strong>`);
    } else {
      paginationItems.push(
        `<a style="margin-right: 3px" href="#" data-page="${i}">${i}</a>`
      );
    }
  }
  const html = `
    <div id="${TRIBE_CHANGES_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis">
      <tbody>
        <tr>
          <th>
            Date
          </th>
          <th>
            New tribe
          </th>
          <th>
            Old tribe
          </th>
        </tr>
        ${tribeChanges.items
          .map((tribeChange) => {
            let rowHTML =
              '<tr>' + `<td>${formatDate(tribeChange.createdAt)}</td>`;
            if (tribeChange.newTribe) {
              rowHTML += `<td><a href="${formatTribeURL(
                tribeChange.newTribe.id
              )}">${tribeChange.newTribe.tag}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }
            if (tribeChange.oldTribe) {
              rowHTML += `<td><a href="${formatTribeURL(
                tribeChange.oldTribe.id
              )}">${tribeChange.oldTribe.tag}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }
            return rowHTML;
          })
          .join('')}
      </tbody>
    </table>
  `;

  renderPopup({
    e,
    title: `Tribe changes`,
    id: 'tribeChanges',
    html,
  });

  addTribeChangesListeners();
};

const handleShowTribeChangesButtonClick = async (e) => {
  e.preventDefault();
  const page = parseInt(e.target.getAttribute('data-page'));
  if (!isNaN(page)) {
    const data = await requestCreator({
      query: TRIBE_CHANGES_QUERY,
      variables: {
        filter: {
          playerID: [PLAYER_ID],
          offset: TRIBE_CHANGES_PER_PAGE * (page - 1),
          limit: TRIBE_CHANGES_PER_PAGE,
          sort: 'createdAt DESC',
        },
        server: SERVER,
      },
    });
    renderTribeChanges(e, page, data.tribeChanges);
  }
};

const handleExportPlayerVillagesButtonClick = (e) => {
  e.preventDefault();

  Dialog.show(
    'Exported villages',
    `<textarea cols=30 rows=8 readonly>${document
      .querySelector('#villages_list')
      .innerHTML.match(/(\d+)\|(\d+)/g)
      .join(' ')}</textarea>`
  );
};

const renderActions = () => {
  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  showTribeChanges.setAttribute('data-page', '1');
  showTribeChanges.innerHTML = 'Show tribe changes';
  showTribeChanges.addEventListener('click', handleShowTribeChangesButtonClick);
  const showTribeChangesTd = document.createElement('td');
  showTribeChangesTd.colSpan = '2';
  showTribeChangesTd.append(showTribeChanges);
  const showTribeChangesTr = document.createElement('tr');
  showTribeChangesTr.appendChild(showTribeChangesTd);
  actionsContainer.appendChild(showTribeChangesTr);

  const exportPlayerVillages = document.createElement('a');
  exportPlayerVillages.href = '#';
  exportPlayerVillages.innerHTML = 'Export player villages';
  exportPlayerVillages.addEventListener(
    'click',
    handleExportPlayerVillagesButtonClick
  );
  const exportPlayerVillagesTd = document.createElement('td');
  exportPlayerVillagesTd.colSpan = '2';
  exportPlayerVillagesTd.append(exportPlayerVillages);
  const exportPlayerVillagesTr = document.createElement('tr');
  exportPlayerVillagesTr.appendChild(exportPlayerVillagesTd);
  actionsContainer.appendChild(exportPlayerVillagesTr);
};

(async function () {
  try {
    renderActions();
    const dataFromCache = loadDataFromCache();
    if (dataFromCache && dataFromCache.player) {
      render(dataFromCache);
    }
    const dataFromAPI = await loadData();
    if (dataFromAPI) {
      render(dataFromAPI);
    }
  } catch (error) {
    console.log('extended player profile', error);
  }
})();
