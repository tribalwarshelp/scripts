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
  return fetch('https://api.tribalwarshelp.com/graphql', {
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
},{}],"P4rL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const POPUP_WRAPPER_SELECTOR = '.popup_helper';
const POPUP_SELECTOR = '#inline_popup';

var _default = function _default() {
  let {
    e,
    title,
    html,
    id
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  inlinePopup(e, id, null, {
    offset_x: 0,
    offset_y: 0
  }, html, title);
  const popup = document.querySelector(POPUP_SELECTOR);

  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '800px';
  }

  const popupWrapper = document.querySelector(POPUP_WRAPPER_SELECTOR);

  if (popupWrapper) {
    popupWrapper.style.width = 'auto';
    popupWrapper.style.position = 'fixed';
    popupWrapper.style.zIndex = '50001';
  }
};

exports.default = _default;
},{}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"KWxH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItem = exports.getItem = void 0;

const getItem = key => {
  const json = localStorage.getItem(key);
  let obj = {};

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
},{}],"hkfB":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _renderPopup = _interopRequireDefault(require("./utils/renderPopup"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _localStorage = require("./utils/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Latest ennoblements
// @namespace    https://gist.github.com/Kichiyaki/3c273582cc6856512e22c86c375f795a
// @version      0.1
// @description  Show the latest ennoblements
// @author       Kichiyaki http://dawid-wysokinski.pl/ | Icon author *GD*
// @match        *://*.plemiona.pl/game.php*
// @match        *://*.tribalwars.net/game.php*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const FILTER_FORM_ID = 'sle_form';
const TABLE_ID = 'sle_table';
const CACHE_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_cache';
const FILTERS_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_filter';
const ICON_URL = 'https://i.imgur.com/4WP4098.png';
const query = "\n    query liveEnnoblements($server: String!) {\n      liveEnnoblements(server: $server) {\n        newOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        oldOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        ennobledAt\n        village {\n          id\n          name\n          x\n          y\n        }\n      }\n    }\n  ";
const DEFAULT_FILTER = {
  newOwner: '',
  newOwnerTribe: '',
  oldOwner: '',
  oldOwnerTribe: ''
};

const loadLatestEnnoblementsFromCache = () => {
  return (0, _localStorage.getItem)(CACHE_LOCAL_STORAGE_KEY);
};

const loadFilters = () => {
  return (0, _localStorage.getItem)(FILTERS_LOCAL_STORAGE_KEY);
};

const cacheEnnoblements = function cacheEnnoblements() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(CACHE_LOCAL_STORAGE_KEY, data);
};

const cacheFilters = function cacheFilters() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(FILTERS_LOCAL_STORAGE_KEY, data);
};

const loadLatestEnnoblements = () => {
  return (0, _requestCreator.default)({
    query,
    variables: {
      server: SERVER
    }
  }).then(data => {
    cacheEnnoblements(data);
    return new Promise(resolve => resolve(data));
  });
};

const isValidPlayer = (obj, searchValue) => {
  return obj && obj.name.toLowerCase().includes(searchValue.toLowerCase());
};

const isValidPlayerTribe = (obj, searchValue) => {
  return obj && obj.tribe && (obj.tribe.name.toLowerCase().includes(searchValue.toLowerCase()) || obj.tribe.tag.toLowerCase().includes(searchValue.toLowerCase()));
};

const filterEnnoblements = function filterEnnoblements() {
  let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let {
    newOwner,
    newOwnerTribe,
    oldOwner,
    oldOwnerTribe
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return ennoblements.filter(ennoblement => {
    if (newOwner && !isValidPlayer(ennoblement.newOwner, newOwner)) {
      return false;
    }

    if (newOwnerTribe && !isValidPlayerTribe(ennoblement.newOwner, newOwnerTribe)) {
      return false;
    }

    if (oldOwner && !isValidPlayer(ennoblement.oldOwner, oldOwner)) {
      return false;
    }

    if (oldOwnerTribe && !isValidPlayerTribe(ennoblement.oldOwner, oldOwnerTribe)) {
      return false;
    }

    return true;
  });
};

const handleFilterFormSubmit = (e, ennoblements) => {
  e.preventDefault();

  const filters = _objectSpread(_objectSpread({}, DEFAULT_FILTER), {}, {
    newOwner: e.target[0].value,
    newOwnerTribe: e.target[1].value,
    oldOwner: e.target[2].value,
    oldOwnerTribe: e.target[3].value
  });

  document.querySelector("#".concat(TABLE_ID, " tbody")).innerHTML = formatEnnoblementRows(filterEnnoblements(ennoblements, filters)).join('');
  cacheFilters(filters);
};

const addEventListeners = function addEventListeners() {
  let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  document.querySelector('#' + FILTER_FORM_ID).addEventListener('submit', e => {
    handleFilterFormSubmit(e, ennoblements);
  });
};

const formatPlayerHTML = player => {
  return player && player.name ? "<a href=\"".concat(window.location.origin + TribalWars.buildURL('', {
    screen: 'info_player',
    id: player.id
  }), "\">").concat(player.name, "</a> (").concat(player.tribe && player.tribe.tag ? "<a href=\"".concat(window.location.origin + TribalWars.buildURL('', {
    screen: 'info_ally',
    id: player.tribe.id
  }), "\">").concat(player.tribe.tag, "</a>") : '-', ")") : '-';
};

const formatVillageHTML = village => {
  const continent = 'K' + String(village.y)[0] + String(village.x)[0];
  return "<a href=\"".concat(window.location.origin + TribalWars.buildURL('', {
    screen: 'info_village',
    id: village.id
  }), "\">").concat(village.name, " (").concat(village.x, "|").concat(village.y, ") ").concat(continent, "</a>");
};

const formatDate = date => {
  return new Date(date).toLocaleDateString(window.game_data.locale.replace('_', '-'), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

const formatEnnoblementRows = ennoblements => {
  return ennoblements.reverse().map(ennoblement => {
    return "<tr>\n              <td>".concat(formatVillageHTML(ennoblement.village), "</td>\n              <td>").concat(formatPlayerHTML(ennoblement.newOwner), "</td>\n              <td>").concat(formatPlayerHTML(ennoblement.oldOwner), "</td>\n              <td>").concat(formatDate(ennoblement.ennobledAt), "</td>\n            </tr>");
  });
};

const renderLatestEnnoblements = function renderLatestEnnoblements() {
  let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  const prepared = _objectSpread(_objectSpread({}, DEFAULT_FILTER), filters);

  const html = "\n        <form style=\"margin-bottom: 15px\" id=\"".concat(FILTER_FORM_ID, "\">\n          <h3 style=\"margin-bottom: 5px\">Filters</h3>\n          <input type=\"text\" placeholder=\"New owner\" value=\"").concat(prepared.newOwner, "\" />\n          <input type=\"text\" placeholder=\"New owner tribe\" value=\"").concat(prepared.newOwnerTribe, "\" />\n          <input type=\"text\" placeholder=\"Old owner\" value=\"").concat(prepared.oldOwner, "\" />\n          <input type=\"text\" placeholder=\"Old owner tribe\" value=\"").concat(prepared.oldOwnerTribe, "\" />\n          <div>\n            <button type=\"submit\">Apply</button>\n          </div>\n        </form>\n        <table class=\"vis\" id=\"").concat(TABLE_ID, "\" style=\"width: 100%\">\n          <thead>\n            <tr>\n              <th>Village</th>\n              <th>New owner</th>\n              <th>Old owner</th>\n              <th>Date</th>\n            </tr>\n          </thead>\n          <tbody>\n            ").concat(formatEnnoblementRows(filterEnnoblements(ennoblements, prepared)).join(''), "\n          </tbody>\n        </table>\n        ");
  (0, _renderPopup.default)({
    e: {
      clientY: 60
    },
    title: "Ennoblements ".concat(SERVER),
    id: 'ennoblements',
    html
  });
  addEventListeners(ennoblements);
};

const handleButtonClick = async () => {
  try {
    const cache = loadLatestEnnoblementsFromCache();
    const filters = loadFilters();

    if (Array.isArray(cache.liveEnnoblements) && cache.liveEnnoblements.length > 0) {
      renderLatestEnnoblements(cache.liveEnnoblements, filters);
    }

    const {
      liveEnnoblements
    } = await loadLatestEnnoblements();
    renderLatestEnnoblements(liveEnnoblements, filters);
  } catch (error) {
    console.log('latestEnnoblements', error);
  }
};

const renderButton = () => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '5px';
  container.style.left = '4px';
  container.style.zIndex = '50000';
  const button = document.createElement('a');
  button.innerHTML = "<img src=\"".concat(ICON_URL, "\">");
  button.title = 'Show latest ennoblements';
  button.style.cursor = 'pointer';
  button.addEventListener('click', handleButtonClick);
  container.append(button);
  document.body.appendChild(container);
};

(function () {
  renderButton();
})();
},{"./libs/requestCreator":"Ph2E","./utils/renderPopup":"P4rL","./utils/getCurrentServer":"DMkL","./utils/localStorage":"KWxH"}]},{},["hkfB"], null)