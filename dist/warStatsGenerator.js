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
})({"Ph2E":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API_URI = void 0;
const API_URI = 'https://api.tribalwarshelp.com/graphql';
exports.API_URI = API_URI;

var _default = function _default() {
  let {
    query,
    variables = {}
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return fetch(API_URI, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  }).then((_ref) => {
    let {
      data,
      errors
    } = _ref;

    if (errors && Array.isArray(errors) && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return new Promise(resolve => resolve(data));
  });
};

exports.default = _default;
},{}],"vPH5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    conquers: 'Przejęcia',
    sideOne: 'Strona 1',
    sideTwo: 'Strona 2',
    difference: 'Różnica',
    tribeTag: 'Skrót plemienia',
    delete: 'Usuń',
    notEnoughTribesSideOne: 'Musisz dodać jakiekolwiek plemię do strony 1.',
    notEnoughTribesSideTwo: 'Musisz dodać jakiekolwiek plemię do strony 2.',
    from: 'Od',
    to: 'Do',
    warStatsGenerator: 'Generator statystyk wojennych',
    generateWarStats: 'Wygeneruj statystyki wojenne',
    addTribe: 'Dodaj plemię'
  },
  en_DK: {
    conquers: 'Conquers',
    sideOne: 'Side one',
    sideTwo: 'Side two',
    difference: 'Difference',
    tribeTag: 'Tribe tag',
    delete: 'Delete',
    notEnoughTribesSideOne: 'Not enough tribes added to the side one.',
    notEnoughTribesSideTwo: 'Not enough tribes added to the side two.',
    from: 'From',
    to: 'To',
    warStatsGenerator: 'War stats generator',
    generateWarStats: 'Generate war stats',
    addTribe: 'Add tribe'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"chDM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.POPUP_SELECTOR = void 0;
const POPUP_WRAPPER_SELECTOR = '.popup_helper';
const POPUP_SELECTOR = '#inline_popup';
exports.POPUP_SELECTOR = POPUP_SELECTOR;

var _default = function _default() {
  let {
    e,
    title,
    html,
    id
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const popup = document.querySelector(POPUP_SELECTOR);

  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '1000px';
  }

  if (popup.classList.contains('show')) {
    popup.querySelector('#inline_popup_title').innerHTML = title;
    popup.querySelector('#inline_popup_content').innerHTML = html;
  } else {
    inlinePopup(e, id, null, {
      offset_x: 0,
      offset_y: 0
    }, html, title);
  }

  const popupWrapper = document.querySelector(POPUP_WRAPPER_SELECTOR);

  if (popupWrapper) {
    popupWrapper.style.width = 'auto';
    popupWrapper.style.position = 'fixed';
    popupWrapper.style.zIndex = '50001';
  }
};

exports.default = _default;
},{}],"H9GS":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _warStatsGenerator = _interopRequireDefault(require("./i18n/warStatsGenerator"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _showPopup = _interopRequireWildcard(require("./utils/showPopup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         War stats generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @version      0.3.0
// @description  War stats generator
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=ranking*mode=wars*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const SIDE_ONE_BUTTON_ID = 'sideOneAdd';
const SIDE_ONE_INPUT_CONTAINER_ID = 'sideOneInputs';
const SIDE_TWO_BUTTON_ID = 'sideTwoAdd';
const SIDE_TWO_INPUT_CONTAINER_ID = 'sideTwoInputs';
const TO_INPUT_ID = 'to';
const FROM_INPUT_ID = 'from';
const RESULT_CONTAINER_ID = 'warStatsResult';
const TRIBES_QUERY = "\n  query tribes($server: String!, $filter: TribeFilter) {\n    tribes(server: $server, filter: $filter) {\n      items {\n        id\n        tag\n      }\n    }\n  }\n";
const ENNOBLEMENTS_QUERY = "\n  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {\n    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {\n      total\n    }\n    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {\n      total\n    }\n  }\n";
const translations = (0, _warStatsGenerator.default)();

const showResult = function showResult() {
  let sideOne = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let sideTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const html = "\n    <div>\n      <h3>".concat(translations.conquers, ":</h3>\n      <p style=\"margin: 0;\"><strong>").concat(translations.sideOne, ": ").concat(sideOne, "</strong></p>\n      <p style=\"margin: 0;\"><strong>").concat(translations.sideTwo, ": ").concat(sideTwo, "</strong></p>\n      <p style=\"margin: 0;\"><strong>").concat(translations.difference, ": ").concat(Math.abs(sideOne - sideTwo), "</strong></p>\n      <hr style=\"margin: 10px 0;\" />\n    </div>\n  ");
  document.querySelector('#' + RESULT_CONTAINER_ID).innerHTML = html;
};

const createAddTribeHandler = container => {
  return () => {
    const div = document.createElement('div');
    div.innerHTML = "\n        <label>".concat(translations.tribeTag, ": </label>\n        <input type=\"text\" required />\n        <button type=\"button\" class=\"btn\">").concat(translations.delete, "</button>\n    ");
    div.querySelector('button').addEventListener('click', () => {
      div.remove();
    });
    container.appendChild(div);
  };
};

const handleFormSubmit = async e => {
  e.preventDefault();
  const sideOneTags = [];
  const sideTwoTags = [];
  e.target.querySelectorAll("#".concat(SIDE_ONE_INPUT_CONTAINER_ID, " input")).forEach(el => {
    if (el.value.trim()) {
      sideOneTags.push(el.value.trim());
    }
  });
  e.target.querySelectorAll("#".concat(SIDE_TWO_INPUT_CONTAINER_ID, " input")).forEach(el => {
    if (el.value.trim()) {
      sideTwoTags.push(el.value.trim());
    }
  });
  console.log('sideOneTags', sideOneTags, 'sideTwoTags', sideTwoTags);
  if (sideOneTags.length === 0) return UI.ErrorMessage(translations.notEnoughTribesSideOne);
  if (sideTwoTags.length === 0) return UI.ErrorMessage(translations.notEnoughTribesSideTwo);
  const fromInputs = document.querySelectorAll("".concat(_showPopup.POPUP_SELECTOR, " form #").concat(FROM_INPUT_ID, " input"));
  let ennobledAtGTE;

  if (fromInputs.length === 2 && fromInputs[0].value && fromInputs[1].value) {
    ennobledAtGTE = new Date("".concat(fromInputs[0].value, "T").concat(fromInputs[1].value, ":00"));
  }

  const toInputs = document.querySelectorAll("".concat(_showPopup.POPUP_SELECTOR, " form #").concat(TO_INPUT_ID, " input"));
  let ennobledAtLTE;

  if (toInputs.length === 2 && toInputs[0].value && toInputs[1].value) {
    ennobledAtLTE = new Date("".concat(toInputs[0].value, "T").concat(toInputs[1].value, ":00"));
  }

  e.target.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });

  try {
    const {
      tribes
    } = await (0, _requestCreator.default)({
      query: TRIBES_QUERY,
      variables: {
        server: SERVER,
        filter: {
          tag: [...sideOneTags, ...sideTwoTags]
        }
      }
    });
    const sideOneTribes = tribes.items.filter(item => sideOneTags.some(tag => item.tag === tag)).map(tribe => tribe.id);
    const sideTwoTribes = tribes.items.filter(item => sideTwoTags.some(tag => item.tag === tag)).map(tribe => tribe.id);
    const {
      sideOneEnnoblements,
      sideTwoEnnoblements
    } = await (0, _requestCreator.default)({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        server: SERVER,
        sideOneFilter: {
          newOwnerTribeID: sideOneTribes,
          oldOwnerTribeID: sideTwoTribes,
          ennobledAtGTE,
          ennobledAtLTE
        },
        sideTwoFilter: {
          newOwnerTribeID: sideTwoTribes,
          oldOwnerTribeID: sideOneTribes,
          ennobledAtGTE,
          ennobledAtLTE
        }
      }
    });
    console.log('sideOneEnnoblements', sideOneEnnoblements, 'sideTwoEnnoblements', sideTwoEnnoblements);
    showResult(sideOneEnnoblements.total, sideTwoEnnoblements.total);
  } catch (error) {
    console.log('handleFormSubmit', error);
  }

  e.target.querySelectorAll('button').forEach(button => {
    button.disabled = false;
  });
};

const showWarStatsForm = e => {
  const html = "\n        <form>\n            <div id=\"".concat(RESULT_CONTAINER_ID, "\">\n            </div>\n            <div style=\"margin-bottom: 10px;\">\n              <div id=\"").concat(FROM_INPUT_ID, "\">\n                <label>").concat(translations.from, ": </label>\n                <input type=\"date\" required />\n                <input type=\"time\" required />\n              </div>\n              <div id=\"").concat(TO_INPUT_ID, "\">\n                <label>").concat(translations.to, ": </label>\n                <input type=\"date\" required />\n                <input type=\"time\" required />\n              </div>\n            </div>\n            <div style=\"display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;\">\n                <div>\n                    <h3>").concat(translations.sideOne, "</h3>\n                    <div id=\"").concat(SIDE_ONE_INPUT_CONTAINER_ID, "\">\n                    </div>\n                    <button id=\"").concat(SIDE_ONE_BUTTON_ID, "\" class=\"btn\" type=\"button\">").concat(translations.addTribe, "</button>\n                </div>\n                <div style=\"margin: 0 5px;\"></div>\n                <div>\n                    <h3>").concat(translations.sideTwo, "</h3>\n                    <div id=\"").concat(SIDE_TWO_INPUT_CONTAINER_ID, "\">\n                    </div>\n                    <button id=\"").concat(SIDE_TWO_BUTTON_ID, "\" class=\"btn\" type=\"button\">").concat(translations.addTribe, "</button>\n                </div>\n            </div>\n            <div style=\"text-align: center;\">\n              <button class=\"btn\" type=\"submit\">").concat(translations.generateWarStats, "</button>\n            </div>\n        </form>\n    ");
  (0, _showPopup.default)({
    title: translations.warStatsGenerator,
    id: 'warStats',
    html,
    e
  });
  document.querySelector("".concat(_showPopup.POPUP_SELECTOR, " form #").concat(SIDE_ONE_BUTTON_ID)).addEventListener('click', createAddTribeHandler(document.querySelector('#' + SIDE_ONE_INPUT_CONTAINER_ID)));
  document.querySelector("".concat(_showPopup.POPUP_SELECTOR, " form #").concat(SIDE_TWO_BUTTON_ID)).addEventListener('click', createAddTribeHandler(document.querySelector('#' + SIDE_TWO_INPUT_CONTAINER_ID)));
  document.querySelector("".concat(_showPopup.POPUP_SELECTOR, " form")).addEventListener('submit', handleFormSubmit);
};

const renderUI = () => {
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = translations.generateWarStats;
  button.addEventListener('click', showWarStatsForm);
  div.appendChild(button);
  document.querySelector('#wars_ranking_table').parentElement.prepend(div);
};

(function () {
  try {
    renderUI();
  } catch (error) {
    console.log('war stats', error);
  }
})();
},{"./libs/requestCreator":"Ph2E","./i18n/warStatsGenerator":"vPH5","./utils/getCurrentServer":"DMkL","./utils/showPopup":"chDM"}]},{},["H9GS"], null)