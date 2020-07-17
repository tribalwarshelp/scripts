import requestCreator from './libs/requestCreator';
import getIDFromURL from './utils/getIDFromURL';
import getCurrentServer from './utils/getCurrentServer';
import { setItem, getItem } from './utils/localStorage';
import formatDate from './utils/formatDate';

// ==UserScript==
// @name         Extended Tribe Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      0.1
// @description  Extended Tribe Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*&screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const TRIBE_ID = getIDFromURL(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = `
    query tribe($server: String!, $id: Int!) {
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
    }
`;
const profileInfoTBody = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody'
);

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cacheTribeData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const loadData = async () => {
  const data = await requestCreator({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
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

const render = ({ tribe }) => {
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
};

(async function () {
  try {
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
