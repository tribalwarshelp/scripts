import requestCreator from './libs/requestCreator';
import { setPage, getPage } from './utils/pagination';
import getCurrentServer from './utils/getCurrentServer';
import getIDFromURL from './utils/getIDFromURL';
import showEnnoblementsPopup from './utils/showEnnoblementsPopup';

// ==UserScript==
// @name         Extended Village Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @version      0.5.2
// @description  Extended Village Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_village*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const VILLAGE_ID = getIDFromURL(window.location.search);
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
const actionsContainer = document.querySelector(
  '#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody'
);

const handleShowTribeEnnoblementsClick = async (e) => {
  e.preventDefault();
  const page = getPage(e.target);
  if (!isNaN(page)) {
    const data = await requestCreator({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          villageID: [VILLAGE_ID],
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

const wrapAction = (action) => {
  const actionWrapperTd = document.createElement('td');
  actionWrapperTd.colSpan = '2';
  actionWrapperTd.append(action);
  const actionWrapperTr = document.createElement('tr');
  actionWrapperTr.appendChild(actionWrapperTd);
  return actionWrapperTr;
};

const renderActions = () => {
  const showEnnoblementsPopup = document.createElement('a');
  showEnnoblementsPopup.href = '#';
  setPage(showEnnoblementsPopup, '1');
  showEnnoblementsPopup.innerHTML = 'Show ennoblements';
  showEnnoblementsPopup.addEventListener(
    'click',
    handleShowTribeEnnoblementsClick
  );
  actionsContainer.appendChild(wrapAction(showEnnoblementsPopup));
};

(function () {
  renderActions();
})();
