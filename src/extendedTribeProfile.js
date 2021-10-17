import differenceInDays from 'date-fns/differenceInDays';
import getTranslations from './i18n/extendedTribeProfile';
import requestCreator from './libs/requestCreator';
import {
  generatePaginationItems,
  getContainerStyles,
  getPage,
  setPage,
} from './utils/pagination';
import renderTodaysStats from './common/renderTodaysStats';
import showEnnoblementsPopup from './common/showEnnoblementsPopup';
import showHistoryPopup from './common/showHistoryPopup';
import showPopup from './utils/showPopup';
import getIDFromURL from './utils/getIDFromURL';
import getCurrentServer from './utils/getCurrentServer';
import { getItem, setItem } from './utils/localStorage';
import { formatDate } from './utils/date';
import getServerVersionCode from './utils/getServerVersionCode';
import * as twstatsutils from './utils/twstats';
import * as twhelputils from './utils/twhelp';
import * as twutils from './utils/tribalwars';

// ==UserScript==
// @name         Extended tribe profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      <%= version %>
// @description  Extended tribe profile
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const VERSION = getServerVersionCode(SERVER);
const TRIBE_ID = getIDFromURL(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = `
  query tribe(
    $server: String!
    $id: Int!
    $dailyTribeStatsSort: [String!]
    $dailyTribeStatsLimit: Int
    $playersLimit: Int
    $playersSort: [String!]
    $playerFilter: PlayerFilter!
    $dailyTribeStatsFilter: DailyTribeStatsFilter!
  ) {
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
    dailyTribeStats(
      server: $server
      limit: $dailyTribeStatsLimit
      sort: $dailyTribeStatsSort
      filter: $dailyTribeStatsFilter
    ) {
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
    players(server: $server, sort: $playersSort, filter: $playerFilter, limit: $playersLimit) {
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
    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {
      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {
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
     $dailyTribeStatsFilter: DailyTribeStatsFilter!,
     $sort: [String!],
     $offset: Int,
     $limit: Int) {
  tribeHistory(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $tribeHistoryFilter) {
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
  dailyTribeStats(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $dailyTribeStatsFilter) {
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
     $filter: DailyPlayerStatsFilter!,
     $limit: Int,
     $sort: [String!]) {
  dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {
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
    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {
      tribeChanges(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
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
const contentValue = document.querySelector('#content_value');
const profileInfoTBody = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody'
);
const actionContainer = profileInfoTBody;
const otherElementsContainer = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)'
);
const membersContainer = contentValue
  .querySelector('h3')
  .nextElementSibling.querySelector('tbody');
const translations = getTranslations();

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cacheTribeData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const getMemberIDs = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href.includes('info_player')) {
      ids.push(getIDFromURL(href));
    }
  });
  return ids;
};

const getMemberNames = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href').includes('info_player')) {
      ids.push(a.innerText.trim());
    }
  });
  return ids;
};

const loadData = async () => {
  const memberIDs = getMemberIDs();
  const data = await requestCreator({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
      dailyTribeStatsSort: ['createDate DESC'],
      dailyTribeStatsLimit: 1,
      dailyTribeStatsFilter: {
        tribeID: [TRIBE_ID],
      },
      playersSort: ['rank ASC'],
      playersLimit: memberIDs.length,
      playerFilter: {
        id: memberIDs,
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

const extendMembersData = players => {
  membersContainer.parentElement.style.width = '100%';
  contentValue.append(membersContainer.parentElement);
  const heading = membersContainer.querySelector('tr:first-child');
  if (heading.children.length !== 11) {
    [
      translations.oda,
      translations.odd,
      translations.ods,
      translations.od,
      translations.dailyGrowth,
      translations.playerLinks,
    ].forEach(v => {
      const th = document.createElement('th');
      th.innerHTML = v;
      heading.appendChild(th);
    });
  }
  membersContainer.querySelectorAll('tr').forEach(tr => {
    const a = tr.querySelector('a');
    if (!a) {
      return;
    }
    const playerID = getIDFromURL(a.getAttribute('href'));
    const player = players.items.find(p => p.id === playerID);
    if (player) {
      [
        [player.scoreAtt, player.rankAtt],
        [player.scoreDef, player.rankDef],
        [player.scoreSup, player.rankSup],
        [player.scoreTotal, player.rankTotal],
        player.dailyGrowth,
        [
          {
            link: twhelputils.buildPlayerURL(VERSION, SERVER, player.id),
            label: 'TWHelp',
          },
          {
            link: twstatsutils.buildPlayerURL(SERVER, player.id),
            label: 'TWStats',
          },
        ],
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
          } else if (data[0].link) {
            td.innerHTML = data
              .map(
                ({ link, label }) =>
                  `<a target="_blank" href="${link}">${label}</a>`
              )
              .join('<br>');
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
      title: translations.createdAt + ':',
      data: formatDate(tribe.createdAt),
      id: 'created_at',
    },
    {
      title: translations.dominance + ':',
      data: tribe.dominance.toFixed(2) + '%',
      id: 'dominance',
    },
    {
      title: translations.bestRank + ':',
      data: tribe.bestRank + ' ' + `(${formatDate(tribe.bestRankAt)})`,
      id: 'best_rank',
    },
    {
      title: translations.mostPoints + ':',
      data:
        tribe.mostPoints.toLocaleString() +
        ' ' +
        `(${formatDate(tribe.mostPointsAt)})`,
      id: 'most_points',
    },
    {
      title: translations.mostVillages + ':',
      data: tribe.mostVillages + ' ' + `(${formatDate(tribe.mostVillagesAt)})`,
      id: 'most_villages',
    },
  ].forEach(data => {
    renderTr(data);
  });

  if (dailyTribeStats && dailyTribeStats.items.length > 0) {
    renderTodaysStats(otherElementsContainer, dailyTribeStats.items[0]);
  }

  if (players && players.items.length > 0) {
    extendMembersData(players);
  }
};

const handleShowTribeEnnoblementsClick = async e => {
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
        },
        offset: ENNOBLEMENTS_PER_PAGE * (page - 1),
        limit: ENNOBLEMENTS_PER_PAGE,
        sort: ['ennobledAt DESC'],
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

const handleShowTribeHistoryClick = async e => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    try {
      const filter = {
        tribeID: [TRIBE_ID],
      };
      const { tribeHistory, dailyTribeStats } = await requestCreator({
        query: TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
        variables: {
          server: SERVER,
          offset: TRIBE_HISTORY_PER_PAGE * (page - 1),
          limit: TRIBE_HISTORY_PER_PAGE,
          sort: ['createDate DESC'],
          tribeHistoryFilter: filter,
          dailyTribeStatsFilter: filter,
        },
      });
      showHistoryPopup(e, tribeHistory, dailyTribeStats, {
        currentPage: page,
        limit: TRIBE_HISTORY_PER_PAGE,
        tribe: true,
        onPageChange: handleShowTribeHistoryClick,
      });
    } catch (error) {
      console.log('couldnt load tribe history', error);
    }
  }
};

const getMembersGrowthTdStyle = value => {
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  const defaultStyle = 'color: #000; background-color: #808080';

  return value > 0
    ? statIncreaseStyle
    : value < 0
    ? statDecreaseStyle
    : defaultStyle;
};

const mapMembersGrowthTdValue = i => {
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

const buildMembersGrowthTBody = stats => {
  const dates = [
    ...new Set(stats.items.map(item => item.createDate)),
  ].reverse();

  return `
    <tbody>
        <tr>
          <th>${translations.player}</th>
          ${dates
            .map(date => {
              return `<th>${formatDate(date, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}</th>`;
            })
            .join('')}
          <th>${translations.total}</th>
        </tr>
        ${getMemberIDs()
          .map(id => {
            const filtered = stats.items
              .filter(item => item.player && item.player.id === id)
              .reverse();
            let player = undefined;
            if (filtered.length > 0) {
              player = filtered[0].player;
            }
            const tds = [];
            let total = 0;
            for (let date of dates) {
              const i = filtered.find(i => i.createDate === date);
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
                  ? `<a href="${twutils.buildPlayerURL(id)}">${player.name}</a>`
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

const createChangeTypeHandler = stats => e => {
  e.preventDefault();
  MEMBERS_GROWTH_MODE = e.target[0].value;
  document.querySelector('#' + MEMBERS_GROWTH_TABLE_ID).innerHTML =
    buildMembersGrowthTBody(stats);
};

const renderMembersGrowthPopup = (e, stats) => {
  const formOptions = [
    ['points', translations.points],
    ['villages', translations.villages],
    ['od', translations.opponentsDefeated],
    ['oda', translations.opponentsDefeatedAsAttacker],
    ['odd', translations.opponentsDefeatedAsDefender],
    ['ods', translations.opponentsDefeatedAsSupporter],
  ].map(
    v =>
      `<option ${
        MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : ''
      } value="${v[0]}">${v[1]}</option>`
  );
  const html = `
    <form id="${MEMBERS_GROWTH_FORM}">
      <select>
        ${formOptions.join('')}
      </select>
      <button type="submit">${translations.change}</button>
    </form>
    <table id="${MEMBERS_GROWTH_TABLE_ID}" class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      ${buildMembersGrowthTBody(stats)}
    </table>
  `;

  showPopup({
    e,
    title: translations.membersGrowth,
    id: 'mg',
    html,
  });

  document
    .querySelector('#' + MEMBERS_GROWTH_FORM)
    .addEventListener('submit', createChangeTypeHandler(stats));
};

const loadMembersGrowthData = async ({ createDateLTE, createDateGT } = {}) => {
  const memberIDs = getMemberIDs();
  const limit =
    memberIDs.length * differenceInDays(createDateLTE, createDateGT);
  const filter = {
    playerID: memberIDs,
    createDateLTE,
    createDateGT,
  };
  return await requestCreator({
    query: TRIBE_MEMBERS_DAILY_STATS_QUERY,
    variables: {
      filter,
      limit,
      sort: ['createDate DESC'],
      server: SERVER,
    },
  });
};

const handleShowMembersGrowthClick = async e => {
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
            ${translations.date}
          </th>
          <th>
            ${translations.player}
          </th>
          <th>
            ${translations.act}
          </th>
        </tr>
        ${tribeChanges.items
          .map(tribeChange => {
            let rowHTML =
              '<tr>' + `<td>${formatDate(tribeChange.createdAt)}</td>`;
            if (tribeChange.player) {
              rowHTML += `<td><a href="${twutils.buildPlayerURL(
                tribeChange.player.id
              )}">${tribeChange.player.name}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }
            rowHTML += `<td><strong>${
              tribeChange.newTribe && tribeChange.newTribe.id === TRIBE_ID
                ? translations.joined
                : translations.left
            }</strong></td>`;
            return rowHTML + '</tr>';
          })
          .join('')}
      </tbody>
    </table>
  `;

  showPopup({
    e,
    title: translations.tribeChanges,
    id: 'tribeChanges',
    html,
  });

  document
    .querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a')
    .forEach(el => {
      el.addEventListener('click', handleShowTribeChangesClick);
    });
};

const handleShowTribeChangesClick = async e => {
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
        },
        offset: TRIBE_CHANGES_PER_PAGE * (page - 1),
        limit: TRIBE_CHANGES_PER_PAGE,
        sort: ['createdAt DESC'],
        server: SERVER,
      },
    });
    renderTribeChanges(e, page, data.tribeChanges);
  }
};

const handleGenerateMailingListClick = e => {
  e.preventDefault();

  const members = getMemberNames();
  const chunks = [];
  for (let i = 0; i < members.length; i += 50) {
    chunks.push(members.slice(i, i + 50));
  }

  let html = '';
  chunks.forEach((names, index) => {
    html += `<h3 style="margin-bottom: 5px;">${index + 1}.</h3>
    <textarea cols=30 rows=8 readonly style="margin-bottom: 15px;">${names.join(
      ';'
    )}</textarea>`;
  });

  Dialog.show('mailinglist', html);
};

const loadVillages = async (variables, total = false) => {
  try {
    const data = await requestCreator({
      variables,
      query: `
        query villages($server: String!, $sort: [String!], $limit: Int, $offset: Int, $filter: VillageFilter!) {
          villages(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $filter) {
            ${total ? 'total' : ''}
            items {
              id
              x
              y
            }
          }
        }
      `,
    });
    if (data && data.villages && Array.isArray(data.villages.items)) {
      return data.villages;
    }
  } catch (error) {
    console.log('load villages', error);
  }
  return {
    total: 0,
    items: [],
  };
};

const showLoadingDialog = (current = 0, total = 0) => {
  if (!current || !total) {
    return Dialog.show('loading', '<strong>Loading...</strong>');
  }
  return Dialog.show(
    'loading',
    `Loaded: <strong>${current}</strong>/<strong>${total}</strong>`
  );
};

const handleExportTribeVillagesFormSubmit = async e => {
  e.preventDefault();
  let limit = parseInt(e.target[4].value);
  const variables = {
    filter: {
      xLTE: parseInt(e.target[0].value),
      xGTE: parseInt(e.target[1].value),
      yLTE: parseInt(e.target[2].value),
      yGTE: parseInt(e.target[3].value),
      playerID: getMemberIDs(),
    },
    limit: isNaN(limit) || !limit ? 0 : limit,
    sort: ['id ASC'],
    server: SERVER,
  };
  showLoadingDialog();

  let { total, items } = await loadVillages(variables, true);
  const length = items.length;
  if (limit !== 0 && limit < total) {
    total = limit;
  }
  if (isNaN(limit) || !limit || limit > length) {
    for (let offset = length; offset < total; offset += length) {
      showLoadingDialog(offset, total);
      const more = await loadVillages({
        ...variables,
        filter: {
          ...variables.filter,
        },
        offset,
      });
      items = [...items, ...more.items];
    }
  }

  Dialog.show(
    'exportTribeVillages',
    `
    <textarea cols=60 rows=8 readonly>${items
      .map(item => `${item.x}|${item.y}`)
      .join(' ')}</textarea>
  `
  );
};

const handleExportTribeVillagesClick = e => {
  e.preventDefault();
  const FORM_ID = 'etvForm';

  const html = `
    <div style="display: flex; align-items: center; justify-content: center;">
      <form id="${FORM_ID}">
        <div>
          <label>X <= </label>
          <input type="number" min="0" value="1000" required />
        </div>
        <div>
          <label>X >= </label>
          <input type="number" min="0" value="0" required />
        </div>
        <div>
          <label>Y <= </label>
          <input type="number" min="0" value="1000" required />
        </div>
        <div>
          <label>Y >= </label>
          <input type="number" min="0" value="0" required />
        </div>
        <div>
          <label>Limit: </label>
          <input type="number" min="0" value="0" required />
        </div>
        <button type="submit">Export</button>
      </form>
    </div>
  `;

  Dialog.show('exportTribeVillages', html);

  document
    .querySelector('#' + FORM_ID)
    .addEventListener('submit', handleExportTribeVillagesFormSubmit);
};

const wrapAction = action => {
  const actionWrapperTd = document.createElement('td');
  actionWrapperTd.colSpan = '2';
  actionWrapperTd.append(action);
  const actionWrapperTr = document.createElement('tr');
  actionWrapperTr.appendChild(actionWrapperTd);
  return actionWrapperTr;
};

const renderActions = () => {
  const linkToTWHelp = document.createElement('a');
  linkToTWHelp.href = twhelputils.buildTribeURL(VERSION, SERVER, TRIBE_ID);
  linkToTWHelp.innerHTML = translations.action.linkToTWHelp;
  actionContainer.appendChild(wrapAction(linkToTWHelp));

  const showEnnoblements = document.createElement('a');
  showEnnoblements.href = '#';
  setPage(showEnnoblements, '1');
  showEnnoblements.innerHTML = translations.action.showEnnoblements;
  showEnnoblements.addEventListener('click', handleShowTribeEnnoblementsClick);
  actionContainer.appendChild(wrapAction(showEnnoblements));

  const showHistory = document.createElement('a');
  showHistory.href = '#';
  setPage(showHistory, '1');
  showHistory.innerHTML = translations.action.showHistory;
  showHistory.addEventListener('click', handleShowTribeHistoryClick);
  actionContainer.appendChild(wrapAction(showHistory));

  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  setPage(showTribeChanges, '1');
  showTribeChanges.innerHTML = translations.action.showTribeChanges;
  showTribeChanges.addEventListener('click', handleShowTribeChangesClick);
  actionContainer.appendChild(wrapAction(showTribeChanges));

  const showMembersGrowth = document.createElement('a');
  showMembersGrowth.href = '#';
  showMembersGrowth.innerHTML = translations.action.showMembersGrowth;
  showMembersGrowth.addEventListener('click', handleShowMembersGrowthClick);
  actionContainer.appendChild(wrapAction(showMembersGrowth));

  const generateMailingList = document.createElement('a');
  generateMailingList.href = '#';
  generateMailingList.innerHTML = translations.action.generateMailingList;
  generateMailingList.addEventListener('click', handleGenerateMailingListClick);
  actionContainer.appendChild(wrapAction(generateMailingList));

  const exportVillages = document.createElement('a');
  exportVillages.href = '#';
  exportVillages.innerHTML = translations.action.exportVillages;
  exportVillages.addEventListener('click', handleExportTribeVillagesClick);
  actionContainer.appendChild(wrapAction(exportVillages));
};

(async function () {
  try {
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
