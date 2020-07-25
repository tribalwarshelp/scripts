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
},{}],"rX6I":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    title: 'Dzienne osiągnięcia - prawdopodobni gracze',
    warning: 'Pamiętaj! Ten skrypt pokazuje wykalkulowane przez TribalWars wyniki, nie pokonane jednostki.',
    aotd: 'Agresor dnia',
    dotd: 'Obrońca dnia',
    sotd: 'Pomocnik dnia',
    gpotd: 'Mocarstwo dnia'
  },
  en_DK: {
    title: 'Daily achievements - probable players',
    warning: 'Remember! This script shows scores, not defeated units.',
    aotd: 'Attacker of the day',
    dotd: 'Defender of the day',
    sotd: 'Supporter of the day',
    gpotd: 'Great power of the day'
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
},{}],"tQUs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = url => parseInt(new URLSearchParams(url).get('id'));

exports.default = _default;
},{}],"dSAr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getIDFromURL = _interopRequireDefault(require("../utils/getIDFromURL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InADayParser {
  constructor(html) {
    let filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.dom = new DOMParser().parseFromString(html, 'text/html');
    this.filters = filters;
  }

  isValidRow(row) {
    if (!row) {
      return false;
    }

    if (this.filters.playerID && row.playerID !== this.filters.playerID) {
      return false;
    }

    return true;
  }

  parseRow(row) {
    if (!row || !row instanceof HTMLTableRowElement) {
      return undefined;
    }

    let obj = {};
    obj.rank = parseInt(row.children[0].innerText.trim());
    obj.name = row.children[1].innerText.trim();
    obj.playerID = (0, _getIDFromURL.default)(row.children[1].querySelector('a').getAttribute('href'));
    obj.tribe = row.children[2].innerText.trim();
    obj.tribeID = 0;

    if (obj.tribe) {
      obj.tribeID = (0, _getIDFromURL.default)(row.children[2].querySelector('a').getAttribute('href'));
    }

    obj.score = parseInt(row.children[3].innerText.trim().replace(/\./g, ''));
    obj.date = row.children[4].innerText.trim();
    return obj;
  }

  parse() {
    const trs = this.dom.querySelectorAll('#in_a_day_ranking_table tbody tr');
    const result = [];

    for (let i = 1; i < trs.length; i++) {
      const row = trs[i];
      const parsed = this.parseRow(row);

      if (this.isValidRow(parsed)) {
        result.push(parsed);
      }
    }

    return result;
  }

}

exports.default = InADayParser;
},{"../utils/getIDFromURL":"tQUs"}],"fHHP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildImgURL = exports.calcAttackDuration = exports.loadInADayData = exports.formatVillageName = exports.formatVillageURL = exports.formatPlayerURL = exports.formatTribeURL = void 0;

var _InADayParser = _interopRequireDefault(require("../libs/InADayParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const formatTribeURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_ally',
    id
  });
};

exports.formatTribeURL = formatTribeURL;

const formatPlayerURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_player',
    id
  });
};

exports.formatPlayerURL = formatPlayerURL;

const formatVillageURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_village',
    id
  });
};

exports.formatVillageURL = formatVillageURL;

const formatVillageName = function formatVillageName() {
  let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  const continent = 'K' + String(y)[0] + String(x)[0];
  return "".concat(n, " (").concat(x, "|").concat(y, ") ").concat(continent);
};

exports.formatVillageName = formatVillageName;

const loadInADayData = async function loadInADayData(type) {
  let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      {
    name
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["name"]);

  try {
    const response = await fetch(TribalWars.buildURL('', {
      screen: 'ranking',
      mode: 'in_a_day',
      type,
      name: name ? name : ''
    }));
    const html = await response.text();

    if (!html) {
      throw new Error();
    }

    const res = new _InADayParser.default(html, rest).parse();

    if (res.length === 0) {
      throw new Error();
    }

    return res[0];
  } catch (error) {
    return {
      rank: 0,
      playerID: 0,
      score: 0,
      tribeID: 0,
      date: new Date()
    };
  }
};

exports.loadInADayData = loadInADayData;

const calcAttackDuration = (distance, unitSpeed, baseSpeed) => {
  return Math.round(distance * baseSpeed / unitSpeed);
};

exports.calcAttackDuration = calcAttackDuration;

const buildImgURL = img => {
  return image_base + img;
};

exports.buildImgURL = buildImgURL;
},{"../libs/InADayParser":"dSAr"}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"Jg9g":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _dailyAchievments = _interopRequireDefault(require("./i18n/dailyAchievments"));

var _localStorage = require("./utils/localStorage");

var _tribalwars = require("./utils/tribalwars");

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Daily achievements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @version      0.4.0
// @description  Daily achievements
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_player&mode=awards*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const LOCAL_STORAGE_KEY = 'kichiyaki_daily_achievements';
const SERVER_QUERY = "\n    query server($server: String!) {\n        server(key: $server) {\n            key\n            historyUpdatedAt\n        }\n    }\n";
const DAILY_STATS_QUERY = "\n    query data($server: String!, $createDateGTE: Time!) {\n        dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStats(server: $server, filter: { sort: \"scoreAtt DESC\", createDateGTE: $createDateGTE, playerFilter: { sort: \"id DESC\" }, limit: 5 }) {\n            items {\n                scoreAtt\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByScoreDef: dailyPlayerStats(server: $server, filter: { sort: \"scoreDef DESC\", createDateGTE: $createDateGTE, playerFilter: { sort: \"id DESC\" }, limit: 5 }) {\n            items {\n                scoreDef\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByScoreSup: dailyPlayerStats(server: $server, filter: { sort: \"scoreSup DESC\", createDateGTE: $createDateGTE, playerFilter: { sort: \"id DESC\" }, limit: 5 }) {\n            items {\n                scoreSup\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByVillages: dailyPlayerStats(server: $server, filter: { sort: \"villages DESC\", createDateGTE: $createDateGTE, playerFilter: { sort: \"id DESC\" }, limit: 5 }) {\n            items {\n                villages\n                player {\n                    id\n                    name\n                }\n            }\n        }\n    }\n";
let container = undefined;
const translations = (0, _dailyAchievments.default)();

const loadDataFromCache = () => {
  return (0, _localStorage.getItem)(LOCAL_STORAGE_KEY);
};

const cacheData = function cacheData() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, data);
};

const loadData = async () => {
  let data = await (0, _requestCreator.default)({
    query: SERVER_QUERY,
    variables: {
      server: SERVER
    }
  });

  if (data.server) {
    const dailyStatsData = await (0, _requestCreator.default)({
      query: DAILY_STATS_QUERY,
      variables: {
        server: SERVER,
        createDateGTE: data.server.historyUpdatedAt.split('T')[0] + 'T00:00:00Z'
      }
    });
    data = _objectSpread(_objectSpread({}, data), dailyStatsData);
  }

  cacheData(data);
  return data;
};

const render = (_ref) => {
  let {
    dailyPlayerStatsOrderedByScoreAtt,
    dailyPlayerStatsOrderedByScoreDef,
    dailyPlayerStatsOrderedByScoreSup,
    dailyPlayerStatsOrderedByVillages
  } = _ref;
  const html = "\n        <div class=\"award-group-head\">".concat(translations.title, "</div>\n        <div class=\"award-group-content\" style=\"text-align: center;\">\n            <div style=\"padding: 10px;\">\n                <h3 style=\"color: red;\"><strong>").concat(translations.warning, "</strong></h3>\n                <p><strong>").concat(translations.aotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreAtt.items.map((item, index) => "<span>".concat(index + 1, ". <a href=\"").concat((0, _tribalwars.formatPlayerURL)(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreAtt.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat(translations.dotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreDef.items.map((item, index) => "<span>".concat(index + 1, ". <a href=\"").concat((0, _tribalwars.formatPlayerURL)(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreDef.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat(translations.sotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreSup.items.map((item, index) => "<span>".concat(index + 1, ". <a href=\"").concat((0, _tribalwars.formatPlayerURL)(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreSup.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat(translations.gpotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByVillages.items.map((item, index) => "<span>".concat(index + 1, ". <a href=\"").concat((0, _tribalwars.formatPlayerURL)(item.player.id), "\">").concat(item.player.name, " - ").concat(item.villages.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n        </div>\n        <div class=\"award-group-foot\"></div>\n    ");

  if (!container) {
    container = document.createElement('div');
    container.classList.add('award-group');
    document.querySelector('#content_value > div:nth-child(4)').prepend(container);
  }

  container.innerHTML = html;
};

(async function () {
  try {
    const dataFromCache = loadDataFromCache();

    if (dataFromCache && dataFromCache.server) {
      render(dataFromCache);
    }

    const data = await loadData();

    if (data.server) {
      render(data);
    }
  } catch (error) {
    console.log('dailyAchievements', error);
  }
})();
},{"./libs/requestCreator":"Ph2E","./i18n/dailyAchievments":"rX6I","./utils/localStorage":"KWxH","./utils/tribalwars":"fHHP","./utils/getCurrentServer":"DMkL"}]},{},["Jg9g"], null)