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
},{}],"MRps":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    actualCoords: 'Aktualne koordynaty',
    searchBonusBarbarianVillages: 'Wyszukaj koczownicze',
    village: 'Wioska',
    distance: 'Dystans',
    action: 'Akcja'
  },
  en_DK: {
    actualCoords: 'Actual coords',
    searchBonusBarbarianVillages: 'Search bonus barbarian villages',
    village: 'Village',
    distance: 'Distance',
    action: 'Action'
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
},{"../libs/InADayParser":"dSAr"}],"XOOL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcDistanceBetweenTwoPoints = void 0;

const calcDistanceBetweenTwoPoints = (x1, y1, x2, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

exports.calcDistanceBetweenTwoPoints = calcDistanceBetweenTwoPoints;
},{}],"fvjy":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _bonusBarbarianVillageFinder = _interopRequireDefault(require("./i18n/bonusBarbarianVillageFinder"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _tribalwars = require("./utils/tribalwars");

var _math = require("./utils/math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Bonus barbarian village finder
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @version      0.4.2
// @description  Bonus barbarian village finder
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const QUERY = "\n  query villages($server: String!, $filter: VillageFilter) {\n    villages(server: $server, filter: $filter) {\n      total\n      items {\n        id\n        name\n        bonus\n        x\n        y\n      }\n    }\n  }\n";
const TABLE_ID = 'bonusBarbarianVillageFinderTable';
const ACTUAL_COORDS_ID = 'actualCoords';
const translations = (0, _bonusBarbarianVillageFinder.default)();
let container = undefined;

const buildReqOptions = (bonus, offset) => {
  return {
    query: QUERY,
    variables: {
      server: SERVER,
      filter: {
        bonus,
        sort: 'id DESC',
        playerID: [0],
        offset
      }
    }
  };
};

const loadBonusVillages = async bonus => {
  const {
    villages
  } = await (0, _requestCreator.default)(buildReqOptions(bonus, 0));

  for (let i = villages.length; i < villages.total; i += 1000) {
    const data = await (0, _requestCreator.default)(buildReqOptions(bonus, 0));
    villages.items = [...villages.items, ...data.villages.items];
  }

  return villages;
};

const searchBonusBarbarianVillages = async e => {
  e.preventDefault();
  const villages = await loadBonusVillages(parseInt(e.target[0].value));
  const coords = TWMap.pos;
  villages.items = villages.items.map(item => {
    return _objectSpread(_objectSpread({}, item), {}, {
      distance: (0, _math.calcDistanceBetweenTwoPoints)(coords[0], coords[1], item.x, item.y)
    });
  }).sort((a, b) => a.distance - b.distance);
  document.querySelector('#' + TABLE_ID).innerHTML = buildTableBodyHTML(villages.items);
};

const getBonuses = () => {
  let bonuses = [];

  for (let i in TWMap.bonus_data) {
    bonuses.push({
      value: i,
      text: TWMap.bonus_data[i].text
    });
  }

  return bonuses;
};

const buildTableBodyHTML = villages => {
  return "\n        <tbody>\n            <tr>\n                <th>\n                    ".concat(translations.village, "\n                </th>\n                <th>\n                    ").concat(translations.distance, "\n                </th>\n                <th>\n                    ").concat(translations.action, "\n                </th>\n            </tr>\n            ").concat(Array.isArray(villages) ? villages.map(village => "<tr>\n                <td>\n                    <a href=\"".concat((0, _tribalwars.formatVillageURL)(village.id), "\">\n                        ").concat((0, _tribalwars.formatVillageName)(village.name, village.x, village.y), "\n                    </a>\n                </td>\n                <td>\n                    ").concat(village.distance.toFixed(1), "\n                </td>\n                <td>\n                    <a href=\"#\" onclick=\"return TWMap.focusUserSpecified(").concat(village.x, ", ").concat(village.y, ")\">Center</a>\n                </td>\n            </tr>")).join('') : '', "\n        </tbody>\n    ");
};

const updateActualCoords = () => {
  document.querySelector('#' + ACTUAL_COORDS_ID).innerHTML = "".concat(translations.actualCoords, ": <strong>").concat(TWMap.pos.join('|'), "</strong>");
};

const renderUI = () => {
  const html = "\n        <p id=\"".concat(ACTUAL_COORDS_ID, "\"></p>\n        <form>\n            <select>\n                ").concat(getBonuses().map(bonus => "<option value=\"".concat(bonus.value, "\">").concat(bonus.text, "</option>")).join(''), "\n            </select>\n            <button type=\"submit\">").concat(translations.searchBonusBarbarianVillages, "</button>\n        </form>\n        <table class=\"vis\" style=\"width: 100%;\" id=\"").concat(TABLE_ID, "\">\n            ").concat(buildTableBodyHTML(), "\n        </table>\n    ");

  if (!container) {
    container = document.createElement('div');
    container.classList.add('containerBorder');
    container.style.clear = 'both';
    document.querySelector('#map_big').appendChild(container);
  }

  container.innerHTML = html;
  container.querySelector('form').addEventListener('submit', searchBonusBarbarianVillages);
  updateActualCoords();
  setInterval(updateActualCoords, 1000);
};

(function () {
  renderUI();
})();
},{"./libs/requestCreator":"Ph2E","./i18n/bonusBarbarianVillageFinder":"MRps","./utils/getCurrentServer":"DMkL","./utils/tribalwars":"fHHP","./utils/math":"XOOL"}]},{},["fvjy"], null)