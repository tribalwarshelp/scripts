// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jH35":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    startCoordsPicker: 'Uruchom zbieracza koordynat',
    stopCoordsPicker: 'Zatrzymaj zbieracza koordynat',
    exportedVillages: 'Wyeksportowane wioski',
    cannotDeleteSelectedGroup: 'Nie można usunąć wybranej grupy!',
    select: 'Wybierz',
    delete: 'Usuń',
    add: 'Dodaj',
    save: 'Zapisz',
    groupName: 'Nazwa grupy',
    export: 'Eksport'
  },
  en_DK: {
    startCoordsPicker: 'Start coords picker',
    stopCoordsPicker: 'Stop coords picker',
    exportedVillages: 'Exported villages',
    cannotDeleteSelectedGroup: 'Cannot delete selected group!',
    select: 'Select',
    delete: 'Delete',
    add: 'Add',
    save: 'Save',
    groupName: 'Group name',
    export: 'Export'
  },
  de_DE: {
    startCoordsPicker: 'Starte Koordinaten-Selektor',
    stopCoordsPicker: 'Stoppe Koordinaten-Selektor',
    exportedVillages: 'Exportierte Dörfer',
    cannotDeleteSelectedGroup: 'Gruppe kann nicht gelöscht werden!',
    select: 'Selektieren',
    delete: 'Löschen',
    add: 'Hinzufügen',
    save: 'Speichern',
    groupName: 'Gruppen-Name',
    export: 'Exportieren'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"KWxH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItem = exports.getItem = void 0;

const getItem = function getItem(key) {
  let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const json = localStorage.getItem(key);
  let obj = d;

  if (json) {
    obj = JSON.parse(json);
  }

  return obj;
};

exports.getItem = getItem;

const setItem = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

exports.setItem = setItem;
},{}],"FWa8":[function(require,module,exports) {
"use strict";

var _mapCoordsPicker = _interopRequireDefault(require("./i18n/mapCoordsPicker"));

var _localStorage = require("./utils/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Map coords picker
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @version      0.7.5
// @description  Map coords picker
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const LOCAL_STORAGE_KEY = 'kichiyaki_map_coords_picker';
const container = document.querySelector('#content_value > h2');
let button;
let formsContainer;
let actionsContainer;
let config = (0, _localStorage.getItem)(LOCAL_STORAGE_KEY, {
  started: false,
  groups: {
    All: {
      villages: [],
      color: '#ffffff'
    }
  },
  selectedGroup: 'All'
});
let intervalID;
const translations = (0, _mapCoordsPicker.default)();

const saveConfig = () => {
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, config);
};

const villageIDByCoords = (x, y) => {
  const xy = parseInt("".concat(x).concat(y), 10);
  const village = TWMap.villages[xy];

  if (village) {
    return TWMap.villages[xy].id;
  }

  return NaN;
};

const setVillageBorder = function setVillageBorder(x, y) {
  let color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'transparent';
  const id = villageIDByCoords(x, y);
  if (isNaN(id)) return;
  const village = document.querySelector('#map_village_' + id);

  if (village) {
    village.style.boxSizing = 'border-box';
    village.style.border = color !== 'transparent' ? "5px solid ".concat(color) : 'none';
  }
};

const deleteVillageFromOtherGroups = key => {
  for (let name in config.groups) {
    if (name === config.selectedGroup) return;
    config.groups[name].villages = config.groups[name].villages.filter(village => village.key !== key);
  }
};

const handleMapClick = (x, y, e) => {
  e.preventDefault();
  const key = "".concat(x, "|").concat(y);
  const selected = config.groups[config.selectedGroup].villages.some(village => village.key === key);

  if (selected) {
    config.groups[config.selectedGroup].villages = config.groups[config.selectedGroup].villages.filter(village => village.key !== key);
    setVillageBorder(x, y, 'transparent');
  } else {
    config.groups[config.selectedGroup].villages = [...config.groups[config.selectedGroup].villages, {
      x,
      y,
      key
    }];
    setVillageBorder(x, y, config.groups[config.selectedGroup].color);
    deleteVillageFromOtherGroups(key);
  }
};

const renderForm = (container, group) => {
  const selected = group && group.name !== config.selectedGroup;
  const html = "\n            <input type=\"color\" value=\"".concat(group ? group.color : '', "\" required />\n            <input type=\"text\" required placeholder=\"").concat(translations.groupName, "\" value=\"").concat(group ? group.name : '', "\" />\n            <button type=\"submit\">").concat(group ? translations.save : translations.add, "</button>\n            ").concat(group ? "<button type=\"button\">".concat(translations.delete, "</button>") : '', "\n            ").concat(selected ? "<button class=\"selectButton\" type=\"button\">".concat(translations.select, "</button>") : '', "\n    ");
  const form = document.createElement('form');
  form.innerHTML = html;
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (group) {
      if (group.name === config.selectedGroup) config.selectedGroup = e.target[1].value;
      colorizeGroupVillages(group.name, e.target[0].value);
      config.groups[e.target[1].value] = _objectSpread(_objectSpread({}, config.groups[group.name]), {}, {
        color: e.target[0].value
      });
      if (group.name !== e.target[1].value) delete config.groups[group.name];
    } else {
      config.groups[e.target[1].value] = {
        color: e.target[0].value,
        villages: []
      };
    }

    renderGroups();
  });

  if (group) {
    form.querySelector('button[type="button"]').addEventListener('click', () => {
      if (config.selectedGroup === group.name) {
        return UI.ErrorMessage(translations.cannotDeleteSelectedGroup);
      }

      colorizeGroupVillages(group.name, 'transparent');
      delete config.groups[group.name];
      form.remove();
    });
    const selectButton = form.querySelector('.selectButton');

    if (selectButton) {
      selectButton.addEventListener('click', e => {
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
    renderForm(formsContainer, _objectSpread(_objectSpread({}, config.groups[name]), {}, {
      name
    }));
  }

  renderForm(formsContainer);
};

const handleExportVillages = () => {
  const groups = [];

  for (let name in config.groups) {
    groups.push("<div style=\"margin-bottom: 30px;\">\n      <h3>".concat(name, "</h3>\n      <textarea cols=30 rows=8 readonly>").concat(config.groups[name].villages.map(village => village.key).join(' ').trim(), "</textarea>\n    </div>"));
  }

  const html = "\n    ".concat(groups.join(''), "\n  ");
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

const colorizeGroupVillages = function colorizeGroupVillages(name) {
  let bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  config.groups[name].villages.forEach(village => {
    setVillageBorder(village.x, village.y, bgColor ? bgColor : config.groups[name].color);
  });
};

const colorizeVillages = function colorizeVillages() {
  let bgColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  for (let name in config.groups) {
    colorizeGroupVillages(name, bgColor);
  }
};

const renderUI = () => {
  button = document.createElement('button');
  button.style.marginLeft = '5px';
  button.innerHTML = config.started ? translations.stopCoordsPicker : translations.startCoordsPicker;
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
},{"./i18n/mapCoordsPicker":"jH35","./utils/localStorage":"KWxH"}]},{},["FWa8"], null)