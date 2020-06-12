// ==UserScript==
// @name         Show last ennoblements
// @namespace    https://gist.github.com/Kichiyaki/3c273582cc6856512e22c86c375f795a
// @version      0.1
// @description  Show last ennoblements
// @author       http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php*
// @grant        none
// ==/UserScript==

const SERVER = window.location.host.split('.')[0];
const CONTAINER_ID = 'kiszkowaty_show_last_ennoblements';
let container = undefined;
const query = `
    query ennoblements($server: String!) {
      ennoblements(server: $server) {
        newOwner {
          id
          name
          tribe {
            id
            name
            tag
          }
        }
        oldOwner {
          id
          name
          tribe {
            id
            name
            tag
          }
        }
        ennobledAt
        village {
          id
          name
          x
          y
        }
      }
    }
  `;

const wait = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));

const loadLastEnnoblementsFromCache = () => {
  const json = localStorage.getItem(CONTAINER_ID + '_cache');
  let obj = {};
  if (json) {
    obj = JSON.parse(json);
  }
  return obj;
};

const cacheEnnoblements = (data = {}) => {
  localStorage.setItem(CONTAINER_ID + '_cache', JSON.stringify(data));
};

const loadLastEnnoblements = () => {
  return fetch('https://api.tribalwarshelp.com/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: {
        server: SERVER,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(({ data, errors }) => {
      if (errors && Array.isArray(errors) && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      cacheEnnoblements(data);
      return new Promise((resolve) => resolve(data));
    });
};

//draggable
const loadCoordinatesFromLocalStorage = () => {
  const data = localStorage.getItem(CONTAINER_ID + '_drag');
  let coords = {};
  if (data) {
    coords = JSON.parse(data);
  }
  if (!coords.x) {
    coords.x = 5;
  }
  if (!coords.y) {
    coords.y = 32;
  }
  return coords;
};

const saveCoordinatesInLocalStorage = (x, y) => {
  localStorage.setItem(CONTAINER_ID + '_drag', JSON.stringify({ x, y }));
};

const { x: startX, y: startY } = loadCoordinatesFromLocalStorage();
let initialX = startX;
let initialY = startY;
let currentX = startX;
let currentY = startY;
let xOffset = startX;
let yOffset = startY;

const startDrag = (e) => {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  container.style.pointer = 'move';
  container.addEventListener('mousemove', dragElement);
};

const dragElement = (e) => {
  currentX = e.clientX - initialX;
  currentY = e.clientY - initialY;

  container.style.left = currentX + 'px';
  container.style.top = currentY + 'px';

  xOffset = currentX;
  yOffset = currentY;
};

const stopDrag = () => {
  initialX = currentX;
  initialY = currentY;
  saveCoordinatesInLocalStorage(initialX, initialY);
  container.style.pointer = 'auto';
  container.removeEventListener('mousemove', dragElement);
};

const formatPlayerHTML = (player) => {
  return player && player.name
    ? `<a href="${
        window.location.origin +
        TribalWars.buildURL('', { screen: 'info_player', id: player.id })
      }">${player.name}</a> (${
        player.tribe && player.tribe.tag
          ? `<a href="${
              window.location.origin +
              TribalWars.buildURL('', {
                screen: 'info_ally',
                id: player.tribe.id,
              })
            }">${player.tribe.tag}</a>`
          : '-'
      })`
    : '-';
};

const formatVillageHTML = (village) => {
  const continent = 'K' + String(village.y)[0] + String(village.x)[0];
  return `<a href="${
    window.location.origin +
    TribalWars.buildURL('', { screen: 'info_village', id: village.id })
  }">${village.name} (${village.x}|${village.y}) ${continent}</a>`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pl', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

const render = (ennoblements = []) => {
  if (!container) {
    container = document.createElement('aside');
    container.id = CONTAINER_ID;
    container.style.maxHeight = '150px';
    container.style.maxWidth = '100%';
    container.style.marginTop = '15px';
    container.style.overflowY = 'scroll';
    container.style.display = 'block';
    container.style.position = 'fixed';
    container.style.left = initialX + 'px';
    container.style.top = initialY + 'px';
    container.style.zIndex = '10000000';
    container.style.cursor = 'move';
    container.classList.add('content-border');
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mouseup', stopDrag);
    container.addEventListener('mouseleave', stopDrag);
    document.body.appendChild(container);
  }

  container.innerHTML = '';

  const heading = document.createElement('h3');
  heading.style.textAlign = 'center';
  heading.innerHTML = `Ostatnie podboje na świecie ${SERVER}`;
  container.appendChild(heading);

  const table = document.createElement('table');
  table.classList.add('vis');
  table.innerHTML = `
        <thead>
          <tr>
            <th>Wioska</th>
            <th>Podbił</th>
            <th>Stracił</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${ennoblements.reverse().map((ennoblement) => {
            return `
              <tr>
                <td>${formatVillageHTML(ennoblement.village)}</td>
                <td>${formatPlayerHTML(ennoblement.newOwner)}</td>
                <td>${formatPlayerHTML(ennoblement.oldOwner)}</td>
                <td>${formatDate(ennoblement.ennobledAt)}</td>
              </tr>
            `;
          })}
        </tbody>
    `;
  container.appendChild(table);
};

(async function () {
  try {
    const cache = loadLastEnnoblementsFromCache();
    if (Array.isArray(cache.ennoblements) && cache.ennoblements.length > 0) {
      render(cache.ennoblements);
    }
    const { ennoblements } = await loadLastEnnoblements();
    render(ennoblements);
  } catch (error) {
    console.log(error);
  }
})();
