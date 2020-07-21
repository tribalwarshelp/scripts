import isURL from 'validator/lib/isURL';
import differenceInDays from 'date-fns/differenceInDays';
import requestCreator from './libs/requestCreator';
import {
  setPage,
  getPage,
  generatePaginationItems,
  getContainerStyles,
} from './utils/pagination';
import renderTodaysStats from './utils/renderTodaysStats';
import showEnnoblementsPopup from './utils/showEnnoblementsPopup';
import showHistoryPopup from './utils/showHistoryPopup';
import showPopup from './utils/showPopup';
import getIDFromURL from './utils/getIDFromURL';
import getCurrentServer from './utils/getCurrentServer';
import { setItem, getItem } from './utils/localStorage';
import formatDate from './utils/formatDate';
import { formatPlayerURL } from './utils/twstats';
import { formatPlayerURL as formatPlayerURLTribalWars } from './utils/tribalwars';

// ==UserScript==
// @name         Extended Tribe Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      0.9.5
// @description  Extended Tribe Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const TRIBE_ID = getIDFromURL(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = `
    query tribe($server: String!, $id: Int!, $playerFilter: PlayerFilter!, $dailyTribeStatsFilter: DailyTribeStatsFilter!) {
        tribe(server: $server, id: $id) {
            id
            bestRank
            bestRankAt
            mostPoints
            mostPointsAt
            mostVillages
            mostVillagesAt
            createdAt
            dominance
        }
        dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {
          items {
            rank
            rankAtt
            rankDef
            rankTotal
            points
            scoreAtt
            scoreAtt
            scoreDef
            scoreTotal
            villages
            members
          }
        }
        players(server: $server, filter: $playerFilter) {
          items {
            id
            rankAtt
            rankDef
            rankSup
            rankTotal
            scoreAtt
            scoreAtt
            scoreDef
            scoreSup
            scoreTotal
            dailyGrowth
          }
        }
    }
`;
const ENNOBLEMENTS_QUERY = `
    query ennoblements($server: String!, $filter: EnnoblementFilter!) {
      ennoblements(server: $server, filter: $filter) {
        total
        items {
          village {
            id
            name
            x
            y
          }
          oldOwner {
            id
            name
          }
          oldOwnerTribe {
            id
            tag
          }
          newOwner {
            id
            name
          }
          newOwnerTribe {
            id
            tag
          }
          ennobledAt
        }
      }
    }
`;
const ENNOBLEMENTS_PER_PAGE = 15;
const TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY = `
query tribeHistoryAndTribeDailyStats($server: String!,
     $tribeHistoryFilter: TribeHistoryFilter!,
     $dailyTribeStatsFilter: DailyTribeStatsFilter!) {
  tribeHistory(server: $server, filter: $tribeHistoryFilter) {
    total
    items {
      totalVillages
      points
      rank
      scoreAtt
      rankAtt
      scoreDef
      rankDef
      scoreTotal
      rankTotal
      createDate
      totalMembers
    }
  }
  dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {
    items {
        points
        scoreAtt
        scoreDef
        scoreTotal
        villages
        createDate
        members
      }
    }
}
`;
const TRIBE_HISTORY_PER_PAGE = 15;
const TRIBE_MEMBERS_DAILY_STATS_QUERY = `
query tribeMembersDailyStats($server: String!,
     $filter: DailyPlayerStatsFilter!) {
  dailyPlayerStats(server: $server, filter: $filter) {
    items {
        player {
          id
          name
        }
        points
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        villages
        createDate
      }
    }
}
`;
let MEMBERS_GROWTH_MODE = 'points';
const TRIBE_CHANGES_QUERY = `
    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {
      tribeChanges(server: $server, filter: $filter) {
        total
        items {
          player {
            id
            name
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
const profileInfoTBody = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody'
);
const actionsContainer = profileInfoTBody;
const otherElementsContainer = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)'
);
const membersContainer = document.querySelector(
  '#content_value > table.vis > tbody'
);

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cacheTribeData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const getMembersIDs = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.includes('info_player')) {
      ids.push(getIDFromURL(href));
    }
  });
  return ids;
};

const loadData = async () => {
  const membersIDs = getMembersIDs();
  const data = await requestCreator({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
      dailyTribeStatsFilter: {
        sort: 'createDate DESC',
        limit: 1,
        tribeID: [TRIBE_ID],
      },
      playerFilter: {
        sort: 'rank ASC',
        limit: membersIDs.length,
        id: membersIDs,
      },
    },
  });
  cacheTribeData(data);
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

const extendMembersData = (players) => {
  membersContainer.parentElement.style.width = '100%';
  const heading = membersContainer.querySelector('tr:first-child');
  if (heading.children.length !== 11) {
    ['ODA', 'ODD', 'ODS', 'OD', 'Daily growth', 'Player links'].forEach((v) => {
      const th = document.createElement('th');
      th.innerHTML = v;
      heading.appendChild(th);
    });
  }
  membersContainer.querySelectorAll('tr').forEach((tr) => {
    const a = tr.querySelector('a');
    if (!a) {
      return;
    }
    const playerID = getIDFromURL(a.getAttribute('href'));
    const player = players.items.find((p) => p.id === playerID);
    if (player) {
      [
        [player.scoreAtt, player.rankAtt],
        [player.scoreDef, player.rankDef],
        [player.scoreSup, player.rankSup],
        [player.scoreTotal, player.rankTotal],
        player.dailyGrowth,
        [formatPlayerURL(SERVER, player.id), 'TWStats'],
      ].forEach((data, index) => {
        let td = tr.children[5 + index];
        if (!td) {
          td = document.createElement('td');
          tr.appendChild(td);
        }
        if (Array.isArray(data)) {
          if (typeof data[0] === 'number') {
            td.innerHTML = `${data[0].toLocaleString()} (<strong>${
              data[1]
            }</strong>)`;
          } else if (isURL(data[0])) {
            td.innerHTML = `<a href="${data[0]}">${data[1]}</a>`;
          }
        } else if (typeof data === 'number') {
          td.innerHTML = data.toLocaleString();
        }
      });
    }
  });
};

const render = ({ tribe, dailyTribeStats, players }) => {
  [
    {
      title: 'Created at:',
      data: formatDate(tribe.createdAt),
      id: 'created_at',
    },
    {
      title: 'Dominance:',
      data: tribe.dominance.toFixed(2) + '%',
      id: 'dominance',
    },
    {
      title: 'Best rank:',
      data: tribe.bestRank + ' ' + `(${formatDate(tribe.bestRankAt)})`,
      id: 'best_rank',
    },
    {
      title: 'Most points:',
      data:
        tribe.mostPoints.toLocaleString() +
        ' ' +
        `(${formatDate(tribe.mostPointsAt)})`,
      id: 'most_points',
    },
    {
      title: 'Most villages:',
      data: tribe.mostVillages + ' ' + `(${formatDate(tribe.mostVillagesAt)})`,
      id: 'most_villages',
    },
  ].forEach((data) => {
    renderTr(data);
  });

  if (dailyTribeStats && dailyTribeStats.items.length > 0) {
    renderTodaysStats(otherElementsContainer, dailyTribeStats.items[0]);
  }

  if (players && players.items.length > 0) {
    extendMembersData(players);
  }
};

const handleShowTribeEnnoblementsClick = async (e) => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    const data = await requestCreator({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          or: {
            oldOwnerTribeID: [TRIBE_ID],
            newOwnerTribeID: [TRIBE_ID],
          },
          offset: ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: ENNOBLEMENTS_PER_PAGE,
          sort: 'ennobledAt DESC',
        },
        server: SERVER,
      },
    });
    showEnnoblementsPopup(e, data.ennoblements, {
      currentPage: page,
      limit: ENNOBLEMENTS_PER_PAGE,
      onPageChange: handleShowTribeEnnoblementsClick,
    });
  }
};

const handleShowTribeHistoryClick = async (e) => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    try {
      const filter = {
        tribeID: [TRIBE_ID],
        offset: TRIBE_HISTORY_PER_PAGE * (page - 1),
        limit: TRIBE_HISTORY_PER_PAGE,
        sort: 'createDate DESC',
      };
      const { tribeHistory, dailyTribeStats } = await requestCreator({
        query: TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
        variables: {
          server: SERVER,
          tribeHistoryFilter: filter,
          dailyTribeStatsFilter: {
            ...filter,
            offset: filter.offset + 1,
          },
        },
      });
      showHistoryPopup(e, tribeHistory, dailyTribeStats, {
        currentPage: page,
        limit: TRIBE_HISTORY_PER_PAGE,
        tribe: true,
        onPageChange: handleShowTribeHistoryClick,
      });
    } catch (error) {
      console.log('cannot load tribe history', error);
    }
  }
};

const getMembersGrowthTdStyle = (value) => {
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  const defaultStyle = 'color: #000; background-color: #808080';

  return value > 0
    ? statIncreaseStyle
    : value < 0
    ? statDecreaseStyle
    : defaultStyle;
};

const mapMembersGrowthTdValue = (i) => {
  switch (MEMBERS_GROWTH_MODE) {
    case 'points':
      return i.points;
    case 'villages':
      return i.villages;
    case 'od':
      return i.scoreTotal;
    case 'oda':
      return i.scoreAtt;
    case 'odd':
      return i.scoreDef;
    case 'ods':
      return i.scoreSup;
    default:
      return 0;
  }
};

const buildMembersGrowthTBody = (stats) => {
  const dates = [
    ...new Set(stats.items.map((item) => item.createDate)),
  ].reverse();

  return `
    <tbody>
        <tr>
          <th>Player</th>
          ${dates
            .map((date) => {
              return `<th>${formatDate(date, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}</th>`;
            })
            .join('')}
          <th>Total</th>
        </tr>
        ${getMembersIDs()
          .map((id) => {
            const filtered = stats.items
              .filter((item) => item.player && item.player.id === id)
              .reverse();
            let player = undefined;
            if (filtered.length > 0) {
              player = filtered[0].player;
            }
            const tds = [];
            let total = 0;
            for (let date of dates) {
              const i = filtered.find((i) => i.createDate === date);
              let val = 0;
              if (i) {
                val = mapMembersGrowthTdValue(i);
              }
              total += val;
              tds.push(
                `<td style="${getMembersGrowthTdStyle(
                  val
                )}">${val.toLocaleString()}</td>`
              );
            }
            return `<tr>
            <td>
              ${
                player
                  ? `<a href="${formatPlayerURLTribalWars(id)}">${
                      player.name
                    }</a>`
                  : '-'
              }
            </td>
            ${tds.join('')}
            <td style="${getMembersGrowthTdStyle(
              total
            )}"><strong>${total.toLocaleString()}</strong></td>
          </tr>`;
          })
          .join('')}
      </tbody>
  `;
};

const MEMBERS_GROWTH_TABLE_ID = 'membersGrowth';
const MEMBERS_GROWTH_FORM = MEMBERS_GROWTH_TABLE_ID + 'Form';

const createChangeTypeHandler = (stats) => (e) => {
  e.preventDefault();
  MEMBERS_GROWTH_MODE = e.target[0].value;
  document.querySelector(
    '#' + MEMBERS_GROWTH_TABLE_ID
  ).innerHTML = buildMembersGrowthTBody(stats);
};

const renderMembersGrowthPopup = (e, stats) => {
  const formOptions = [
    ['points', 'Points'],
    ['villages', 'Villages'],
    ['od', 'Opponents defeated'],
    ['oda', 'Opponents defeated as attacker'],
    ['odd', 'Opponents defeated as defender'],
    ['ods', 'Opponents defeated as supporter'],
  ].map(
    (v) =>
      `<option ${
        MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : ''
      } value="${v[0]}">${v[1]}</option>`
  );
  const html = `
    <form id="${MEMBERS_GROWTH_FORM}">
      <select>
        ${formOptions.join('')}
      </select>
      <button type="submit">Change</button>
    </form>
    <table id="${MEMBERS_GROWTH_TABLE_ID}" class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      ${buildMembersGrowthTBody(stats)}
    </table>
  `;

  showPopup({
    e,
    title: `Members growth`,
    id: 'mg',
    html,
  });

  document
    .querySelector('#' + MEMBERS_GROWTH_FORM)
    .addEventListener('submit', createChangeTypeHandler(stats));
};

const loadMembersGrowthData = async ({ createDateLTE, createDateGT } = {}) => {
  const membersIDs = getMembersIDs();
  const limit =
    membersIDs.length * differenceInDays(createDateLTE, createDateGT);
  const filter = {
    playerID: membersIDs,
    limit,
    sort: 'createDate DESC',
    createDateLTE,
    createDateGT,
  };
  const data = await requestCreator({
    query: TRIBE_MEMBERS_DAILY_STATS_QUERY,
    variables: {
      filter,
      server: SERVER,
    },
  });
  return data;
};

const handleShowMembersGrowthClick = async (e) => {
  e.preventDefault();
  const createDateGT = new Date();
  createDateGT.setDate(createDateGT.getDate() - 7);
  const data = await loadMembersGrowthData({
    createDateLTE: new Date(),
    createDateGT,
  });
  renderMembersGrowthPopup(e, data.dailyPlayerStats);
};

const renderTribeChanges = (e, currentPage, tribeChanges) => {
  const paginationItems = generatePaginationItems({
    total: tribeChanges.total,
    limit: TRIBE_CHANGES_PER_PAGE,
    currentPage,
  });

  const html = `
    <div style="${getContainerStyles()}" id="${TRIBE_CHANGES_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            Date
          </th>
          <th>
            Player
          </th>
          <th>
            Action
          </th>
        </tr>
        ${tribeChanges.items
          .map((tribeChange) => {
            let rowHTML =
              '<tr>' + `<td>${formatDate(tribeChange.createdAt)}</td>`;
            if (tribeChange.player) {
              rowHTML += `<td><a href="${formatPlayerURLTribalWars(
                tribeChange.player.id
              )}">${tribeChange.player.name}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }
            rowHTML += `<td><strong>${
              tribeChange.newTribe && tribeChange.newTribe.id === TRIBE_ID
                ? 'Joined'
                : 'Left'
            }</strong></td>`;
            return rowHTML + '</tr>';
          })
          .join('')}
      </tbody>
    </table>
  `;

  showPopup({
    e,
    title: `Tribe changes`,
    id: 'tribeChanges',
    html,
  });

  document
    .querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', handleShowTribeChangesClick);
    });
};

const handleShowTribeChangesClick = async (e) => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    const data = await requestCreator({
      query: TRIBE_CHANGES_QUERY,
      variables: {
        filter: {
          or: {
            oldTribeID: [TRIBE_ID],
            newTribeID: [TRIBE_ID],
          },
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

const wrapAction = (action) => {
  const actionWrapperTd = document.createElement('td');
  actionWrapperTd.colSpan = '2';
  actionWrapperTd.append(action);
  const actionWrapperTr = document.createElement('tr');
  actionWrapperTr.appendChild(actionWrapperTd);
  return actionWrapperTr;
};

const renderActions = () => {
  const showEnnoblements = document.createElement('a');
  showEnnoblements.href = '#';
  setPage(showEnnoblements, '1');
  showEnnoblements.innerHTML = 'Show ennoblements';
  showEnnoblements.addEventListener('click', handleShowTribeEnnoblementsClick);
  actionsContainer.appendChild(wrapAction(showEnnoblements));

  const showHistory = document.createElement('a');
  showHistory.href = '#';
  setPage(showHistory, '1');
  showHistory.innerHTML = 'Show history';
  showHistory.addEventListener('click', handleShowTribeHistoryClick);
  actionsContainer.appendChild(wrapAction(showHistory));

  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  setPage(showTribeChanges, '1');
  showTribeChanges.innerHTML = 'Show tribe changes';
  showTribeChanges.addEventListener('click', handleShowTribeChangesClick);
  actionsContainer.appendChild(wrapAction(showTribeChanges));

  const showMembersGrowth = document.createElement('a');
  showMembersGrowth.href = '#';
  showMembersGrowth.innerHTML = 'Show members growth';
  showMembersGrowth.addEventListener('click', handleShowMembersGrowthClick);
  actionsContainer.appendChild(wrapAction(showMembersGrowth));
};

(async function () {
  try {
    document.querySelector('#content_value > table:nth-child(3)').style.width =
      '100%';

    renderActions();

    const dataFromCache = loadDataFromCache();
    if (dataFromCache && dataFromCache.tribe) {
      render(dataFromCache);
    }

    const dataFromAPI = await loadData();
    if (dataFromAPI) {
      render(dataFromAPI);
    }
  } catch (error) {
    console.log('extended tribe profile', error);
  }
})();
