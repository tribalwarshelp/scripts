import requestCreator from './libs/requestCreator';
import getTranslations from './i18n/extendedVillageProfile';
import { setPage, getPage } from './utils/pagination';
import getCurrentServer from './utils/getCurrentServer';
import getIDFromURL from './utils/getIDFromURL';
import buildUnitImgURL from './utils/buildUnitImgURL';
import { formatDate } from './utils/date';
import wait from './utils/wait';
import { setItem, getItem } from './utils/localStorage';
import calcLoyalty from './utils/calcLoyalty';
import getServerVersionCode from './utils/getServerVersionCode';
import * as twhelputils from './utils/twhelp';
import showEnnoblementsPopup from './common/showEnnoblementsPopup';

// ==UserScript==
// @name         Extended village profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @version      <%= version %>
// @description  Extended village profile
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_village*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const VILLAGE_ID = getIDFromURL(window.location.search);
const LAST_CONQUER_QUERY = `
    query ennoblements($server: String!, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {
        ennoblements(server: $server, limit: $limit, sort: $sort, filter: $filter) {
            items {
                ennobledAt
                village {
                    id
                }
            }
        }
    }
`;
const ENNOBLEMENTS_QUERY = `
    query ennoblements($server: String!, $offset: Int, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {
      ennoblements(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
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
const CURR_SERVER_CONFIG = `
    query server($key: String!) {
        server(key: $key) {
            config {
              speed
            }
            unitConfig {
              spear {
                pop
              }
              sword {
                pop
              }
              axe {
                pop
              }
              archer {
                pop
              }
              spy {
                pop
              }
              light {
                pop
              }
              marcher {
                pop
              }
              heavy {
                pop
              }
              ram {
                pop
              }
              catapult {
                pop
              }
              knight {
                pop
              }
              snob {
                pop
              }
            }
        }
    }
`;
const SERVER_CONFIG_LOCAL_STORAGE_KEY =
  'kiszkowaty_extended_village_profile_server_cfg';
const actionContainer = document.querySelector(
  '#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody'
);
const additionalInfoContainer = document.querySelector(
  '#content_value table.vis tbody'
);
let serverConfig = {};
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
    !data.server ||
    isConfigExpired(new Date(data.loadedAt)) ||
    !data.server.unitConfig ||
    !data.server.config
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
  return data.server;
};

const loadPageData = async () => {
  let data = await requestCreator({
    query: LAST_CONQUER_QUERY,
    variables: {
      server: SERVER,
      filter: {
        villageID: [VILLAGE_ID],
      },
      sort: ['ennobledAt DESC'],
      limit: 1,
    },
  });
  return data;
};

const handleShowTribeEnnoblementsClick = async e => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    const data = await requestCreator({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          villageID: [VILLAGE_ID],
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

const buildCellsForIncSupport = units => {
  const cells = [];
  let pop = 0;
  for (let unit in units) {
    pop += units[unit] * serverConfig.unitConfig[unit].pop;
    cells.push(`<td>${units[unit].toLocaleString()}</td>`);
  }
  cells.push(`<td><strong>${pop.toLocaleString()}</strong></td>`);
  return cells;
};

const handleCountIncomingSupportClick = async e => {
  e.preventDefault();

  const ids = [];
  const allyCommand = {};
  document
    .querySelectorAll('span.command_hover_details[data-command-type="support"]')
    .forEach(el => {
      const id = parseInt(el.getAttribute('data-command-id'));
      if (el.classList.contains('commandicon-ally')) {
        allyCommand[id] = true;
      } else {
        allyCommand[id] = false;
      }
      ids.push(id);
    });

  const mySupport = {
    spear: 0,
    sword: 0,
    axe: 0,
    archer: 0,
    spy: 0,
    light: 0,
    marcher: 0,
    heavy: 0,
    ram: 0,
    catapult: 0,
    knight: 0,
    snob: 0,
  };
  const allySupport = {
    ...mySupport,
  };
  const total = {
    ...mySupport,
  };

  for (let i = 0; i < ids.length; i++) {
    Dialog.show(
      'incomingSupport',
      `${translations.loaded}: <strong>${i} / ${ids.length}</strong>`
    );
    const id = ids[i];
    const url = TribalWars.buildURL('', {
      screen: 'info_command',
      ajax: 'details',
      id,
    });
    try {
      const resp = await fetch(url);
      const { units } = await resp.json();
      if (units) {
        for (let unit in mySupport) {
          const count = parseInt(units[unit].count);
          if (allyCommand[id]) {
            allySupport[unit] += count;
          } else {
            mySupport[unit] += count;
          }
          total[unit] += count;
        }
      }
      await wait(200);
    } catch (error) {
      console.log('count incoming support', error);
    }
  }

  const ths = ['<th></th>'];
  for (let unit in mySupport) {
    ths.push(`<th><img src="${buildUnitImgURL(unit)}" /></th>`);
  }
  ths.push(`<th>${translations.pop}</th>`);
  const mySupportCells = [
    `<th>${translations.mySupport}</th>`,
    ...buildCellsForIncSupport(mySupport),
  ];
  const allySupportCells = [
    `<th>${translations.allySupport}</th>`,
    ...buildCellsForIncSupport(allySupport),
  ];
  const totalCells = [
    `<th>${translations.total}</th>`,
    ...buildCellsForIncSupport(total),
  ];

  Dialog.show(
    'incomingSupport',
    `
    <table class="vis" style="width: 100%;">
      <tbody>
          <tr>
            ${ths.join('')}
          </tr>
          <tr>
            ${mySupportCells.join('')}
          </tr>
          <tr>
            ${allySupportCells.join('')}
          </tr>
          <tr>
            ${totalCells.join('')}
          </tr>
      </tbody>
    </table>
  `
  );

  const popup = document.querySelector('.popup_box');
  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '900px';
  }
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
  linkToTWHelp.href = twhelputils.buildVillageURL(
    getServerVersionCode(SERVER),
    SERVER,
    VILLAGE_ID
  );
  linkToTWHelp.innerHTML = translations.action.linkToTWHelp;
  actionContainer.appendChild(wrapAction(linkToTWHelp));

  const showEnnoblementsPopup = document.createElement('a');
  showEnnoblementsPopup.href = '#';
  setPage(showEnnoblementsPopup, '1');
  showEnnoblementsPopup.innerHTML = translations.action.showEnnoblements;
  showEnnoblementsPopup.addEventListener(
    'click',
    handleShowTribeEnnoblementsClick
  );
  actionContainer.appendChild(wrapAction(showEnnoblementsPopup));

  const countIncomingSupport = document.createElement('a');
  countIncomingSupport.href = '#';
  countIncomingSupport.innerHTML = translations.action.countIncomingSupport;
  countIncomingSupport.addEventListener(
    'click',
    handleCountIncomingSupportClick
  );
  actionContainer.appendChild(wrapAction(countIncomingSupport));
};

const renderTr = ({ title, data, id }) => {
  let tr = document.querySelector('#' + id);
  if (!tr) {
    tr = document.createElement('tr');
    tr.id = id;
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    additionalInfoContainer.append(tr);
  }
  tr.children[0].innerHTML = title;
  tr.children[1].innerHTML = data;
};

const countUnitsInVillage = () => {
  const trs = document.querySelectorAll('#content_value > div tbody tr');
  const units = [];
  if (trs.length === 0) throw new Error();
  trs[0].querySelectorAll('.unit_link').forEach(() => {
    units.push(0);
  });

  for (let i = 1; i < trs.length; i++) {
    const tr = trs[i];
    tr.querySelectorAll('.unit-item').forEach((td, index) => {
      units[index] += parseInt(td.innerHTML);
    });
  }
  return units;
};

const renderAdditionalInfo = ({ config, ennoblements } = {}) => {
  const firstEnnoblement =
    ennoblements && Array.isArray(ennoblements.items) && ennoblements.items[0]
      ? ennoblements.items[0]
      : undefined;
  renderTr({
    id: 'loyalty',
    title: `${translations.possibleLoyalty}:`,
    data: firstEnnoblement
      ? calcLoyalty(new Date(firstEnnoblement.ennobledAt), config.speed)
      : 100,
  });
  renderTr({
    id: 'ennobledAt',
    title: `${translations.ennobledAt}:`,
    data: firstEnnoblement
      ? formatDate(firstEnnoblement.ennobledAt)
      : translations.never,
  });

  try {
    const units = countUnitsInVillage();
    const tr = document.createElement('tr');
    tr.style.textAlign = 'center';
    tr.style.fontWeight = 'bold';
    tr.appendChild(document.createElement('td'));
    units.forEach(count => {
      const td = document.createElement('td');
      td.innerHTML = count;
      tr.appendChild(td);
    });
    document.querySelector('#content_value > div tbody').appendChild(tr);
  } catch (error) {}
};

(async function () {
  try {
    const pageData = await loadPageData();
    serverConfig = await loadConfig();
    renderAdditionalInfo({
      config: serverConfig.config,
      ennoblements: pageData.ennoblements,
    });
    renderActions();
  } catch (error) {
    console.log('extended village profile', error);
  }
})();
