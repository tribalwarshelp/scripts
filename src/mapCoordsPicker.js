import getTranslations from './i18n/mapCoordsPicker';
import hexToRGB from './utils/hexToRGB';
import { getItem, setItem } from './utils/localStorage';

// ==UserScript==
// @name         Map coords picker
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @version      0.7.1
// @description  Map coords picker
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==

const LOCAL_STORAGE_KEY = 'kichiyaki_map_coords_picker';
const container = document.querySelector('#content_value > h2');
let button;
let formsContainer;
let actionsContainer;
let config = getItem(LOCAL_STORAGE_KEY, {
  started: false,
  groups: {
    All: {
      villages: [],
      color: '#ffffff',
    },
  },
  selectedGroup: 'All',
});
let intervalID;
const translations = getTranslations();

const saveConfig = () => {
  setItem(LOCAL_STORAGE_KEY, config);
};

const villageIDByCoords = (x, y) => {
  const xy = parseInt(`${x}${y}`, 10);
  const village = TWMap.villages[xy];
  if (village) {
    return TWMap.villages[xy].id;
  }
  return NaN;
};

const setVillageBgColor = (x, y, bgColor = 'transparent') => {
  const id = villageIDByCoords(x, y);
  if (isNaN(id)) return;
  const village = document.querySelector('#map_village_' + id);
  if (village) {
    let overlay = document.querySelector('#' + 'map_village_overlay_' + id);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'map_village_overlay_' + id;
      overlay.style.cssText = document.defaultView.getComputedStyle(
        village,
        ''
      ).cssText;
      village.parentElement.appendChild(overlay);
    }

    overlay.style.backgroundColor =
      bgColor !== 'transparent'
        ? `rgba(${hexToRGB(bgColor.replace('#', '')).join(', ')}, 0.7)`
        : bgColor;
  }
};

const deleteVillageFromOtherGroups = (key) => {
  for (let name in config.groups) {
    if (name === config.selectedGroup) return;
    config.groups[name].villages = config.groups[name].villages.filter(
      (village) => village.key !== key
    );
  }
};

const handleMapClick = (x, y, e) => {
  e.preventDefault();

  const key = `${x}|${y}`;
  const selected = config.groups[config.selectedGroup].villages.some(
    (village) => village.key === key
  );
  if (selected) {
    config.groups[config.selectedGroup].villages = config.groups[
      config.selectedGroup
    ].villages.filter((village) => village.key !== key);
    setVillageBgColor(x, y);
  } else {
    config.groups[config.selectedGroup].villages = [
      ...config.groups[config.selectedGroup].villages,
      {
        x,
        y,
        key,
      },
    ];
    setVillageBgColor(x, y, config.groups[config.selectedGroup].color);
    deleteVillageFromOtherGroups(key);
  }
};

const renderForm = (container, group) => {
  const selected = group && group.name !== config.selectedGroup;
  const html = `
            <input type="color" value="${group ? group.color : ''}" required />
            <input type="text" required placeholder="${
              translations.groupName
            }" value="${group ? group.name : ''}" />
            <button type="submit">${
              group ? translations.save : translations.add
            }</button>
            ${
              group
                ? `<button type="button">${translations.delete}</button>`
                : ''
            }
            ${
              selected
                ? `<button class="selectButton" type="button">${translations.select}</button>`
                : ''
            }
    `;

  const form = document.createElement('form');
  form.innerHTML = html;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (group) {
      if (group.name === config.selectedGroup)
        config.selectedGroup = e.target[1].value;
      colorizeGroupVillages(group.name, e.target[0].value);
      config.groups[e.target[1].value] = {
        ...config.groups[group.name],

        color: e.target[0].value,
      };
      if (group.name !== e.target[1].value) delete config.groups[group.name];
    } else {
      config.groups[e.target[1].value] = {
        color: e.target[0].value,
        villages: [],
      };
    }
    renderGroups();
  });
  if (group) {
    form
      .querySelector('button[type="button"]')
      .addEventListener('click', () => {
        if (config.selectedGroup === group.name) {
          return UI.ErrorMessage(translations.cannotDeleteSelectedGroup);
        }
        colorizeGroupVillages(group.name, 'transparent');
        delete config.groups[group.name];
        form.remove();
      });

    const selectButton = form.querySelector('.selectButton');
    if (selectButton) {
      selectButton.addEventListener('click', (e) => {
        config.selectedGroup = group.name;
        renderGroups();
      });
    }
  }

  container.appendChild(form);
};

const renderGroups = () => {
  formsContainer.innerHTML = '';
  for (let name in config.groups) {
    renderForm(formsContainer, { ...config.groups[name], name });
  }
  renderForm(formsContainer);
};

const handleExportVillages = () => {
  const groups = [];

  for (let name in config.groups) {
    groups.push(`<div style="margin-bottom: 30px;">
      <h3>${name}</h3>
      <textarea cols=30 rows=8 readonly>${config.groups[name].villages
        .map((village) => village.key)
        .join(' ')
        .trim()}</textarea>
    </div>`);
  }

  const html = `
    ${groups.join('')}
  `;

  Dialog.show(translations.exportedVillages, html);
};

const renderActions = () => {
  const exportVillages = document.createElement('button');
  exportVillages.innerHTML = translations.export;
  exportVillages.addEventListener('click', handleExportVillages);
  actionsContainer.appendChild(exportVillages);
};

const handleSpawnSector = (data, sector) => {
  TWMap.mapHandler.__spawnSector(data, sector);
  colorizeVillages();
};

const handleStart = () => {
  TWMap.map.handler.__onClick = TWMap.map.handler.onClick;
  TWMap.map.handler.onClick = handleMapClick;
  TWMap.mapHandler.__spawnSector = TWMap.map.handler.spawnSector;
  TWMap.mapHandler.spawnSector = handleSpawnSector;
  button.innerHTML = translations.stopCoordsPicker;
  renderActions();
  colorizeVillages();
  renderGroups();
  intervalID = setInterval(saveConfig, 500);
};

const handleStop = () => {
  if (typeof TWMap.map.handler.__onClick === 'function') {
    TWMap.map.handler.onClick = TWMap.map.handler.__onClick;
  }
  if (typeof TWMap.map.handler.__spawnSector === 'function') {
    TWMap.mapHandler.spawnSector = TWMap.map.handler.__spawnSector;
  }
  button.innerHTML = translations.startCoordsPicker;
  formsContainer.innerHTML = '';
  actionsContainer.innerHTML = '';
  colorizeVillages('transparent');
  if (intervalID) {
    clearInterval(intervalID);
  }
  for (let name in config.groups) {
    config.groups[name].villages = [];
  }
};

const handleButtonClick = () => {
  if (config.started) {
    handleStop();
  } else {
    handleStart();
  }
  config.started = !config.started;
  saveConfig();
};

const colorizeGroupVillages = (name, bgColor = '') => {
  config.groups[name].villages.forEach((village) => {
    setVillageBgColor(
      village.x,
      village.y,
      bgColor ? bgColor : config.groups[name].color
    );
  });
};

const colorizeVillages = (bgColor = '') => {
  for (let name in config.groups) {
    colorizeGroupVillages(name, bgColor);
  }
};

const renderUI = () => {
  button = document.createElement('button');
  button.style.marginLeft = '5px';
  button.innerHTML = config.started
    ? translations.stopCoordsPicker
    : translations.startCoordsPicker;
  button.addEventListener('click', handleButtonClick);
  container.appendChild(button);

  formsContainer = document.createElement('div');
  container.parentElement.insertBefore(formsContainer, container.nextSibling);

  actionsContainer = document.createElement('div');
  container.parentElement.insertBefore(actionsContainer, container.nextSibling);

  if (config.started) {
    handleStart();
  }
};

(function () {
  try {
    renderUI();
  } catch (error) {
    console.log('Map Coords Picker', error);
  }
})();
