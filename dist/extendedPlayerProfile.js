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
},{}],"I8dv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    date: 'Data',
    newTribe: 'Nowe plemię',
    oldTribe: 'Poprzednie plemię',
    joinedAt: 'Dołączył',
    dailyGrowth: 'Dzienny przyrost',
    bestRank: 'Najlepszy ranking',
    mostPoints: 'Najwięcej punktów',
    mostVillages: 'Najwięcej wiosek',
    oldName: 'Poprzedni nick',
    newName: 'Nowy nick',
    playerServers: "Serwery gracza",
    inADayBestScores: "Dzienne rankingi",
    unitsDefeatedWhileAttacking: 'Jako atakujący',
    unitsDefeatedWhileDefending: 'Jako obrońca',
    unitsDefeatedWhileSupporting: 'Jako wspierający',
    resourcesPlundered: 'Sfarmione surowce',
    villagesPlundered: 'Splądrowane wioski',
    resourcesGathered: 'Zebrane surowce',
    villagesConquered: 'Podbite wioski',
    exportedVillages: 'Wyeksportowane wioski',
    tribeChanges: 'Zmiany plemion',
    action: {
      showTribeChanges: 'Pokaż zmiany plemion',
      showEnnoblements: 'Pokaż przejęcia',
      exportVillages: 'Wyeksportuj wioski',
      showHistory: 'Pokaż historię'
    }
  },
  en_DK: {
    date: 'Date',
    newTribe: 'New tribe',
    oldTribe: 'Old tribe',
    joinedAt: 'Joined at',
    dailyGrowth: 'Daily growth',
    bestRank: 'Best rank',
    mostPoints: 'Most points',
    mostVillages: 'Most villages',
    oldName: 'Old name',
    newName: 'New name',
    playerServers: "Player's servers",
    inADayBestScores: "'In a day' best scores",
    unitsDefeatedWhileAttacking: 'Units defeated while attacking',
    unitsDefeatedWhileDefending: 'Units defeated while defending',
    unitsDefeatedWhileSupporting: 'Units defeated while supporting',
    resourcesPlundered: 'Resources plundered',
    villagesPlundered: 'Villages plundered',
    resourcesGathered: 'Resources gathered',
    villagesConquered: 'Villages conquered',
    exportedVillages: 'Exported villages',
    tribeChanges: 'Tribe changes',
    action: {
      showTribeChanges: 'Show tribe changes',
      showEnnoblements: 'Show ennoblements',
      exportVillages: 'Export villages',
      showHistory: 'Show history'
    }
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"l9PO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    title: "Dzisiejsze zmiany w statystykach",
    points: 'Punkty',
    rank: 'Ranking',
    villages: 'Liczba wiosek',
    members: 'Liczba członków',
    oda: 'Pokonani przeciwnicy jako agresor',
    odaRank: 'RA',
    odd: 'Pokonani przeciwnicy jako obrońca',
    oddRank: 'RO',
    ods: 'Pokonani przeciwnicy jako wspierający',
    odsRank: 'RW',
    od: 'Pokonani przeciwnicy',
    odRank: 'Pokonani przeciwnicy razem ranking'
  },
  en_DK: {
    title: "Today's stat changes",
    points: 'Points',
    rank: 'Rank',
    villages: 'Villages',
    members: 'Members',
    oda: 'ODA',
    odaRank: 'ODA Rank',
    odd: 'ODD',
    oddRank: 'ODD Rank',
    ods: 'ODS',
    odsRank: 'ODS Rank',
    od: 'OD',
    odRank: 'OD Rank'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"yQib":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = v => v === undefined || v === null;

exports.default = _default;
},{}],"yrCm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderTodaysStats = _interopRequireDefault(require("../i18n/renderTodaysStats"));

var _isNil = _interopRequireDefault(require("../utils/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const translations = (0, _renderTodaysStats.default)();

const getTodaysStatsTdStyle = value => {
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  const defaultStyle = 'color: #000; background-color: #808080';
  return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
};

var _default = (container, stats) => {
  let todaysStats = container.querySelector('#todaysStats');

  if (!todaysStats) {
    todaysStats = document.createElement('div');
    todaysStats.id = 'todaysStats';
    todaysStats.width = '100%';
    container.prepend(todaysStats);
  }

  const player = !(0, _isNil.default)(stats.rankSup);
  todaysStats.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              ".concat(translations.title, "\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat(translations.points, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.points), "\">\n                ").concat(Math.abs(stats.points).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.rank, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rank), "\">\n                ").concat(Math.abs(stats.rank), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.villages, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.villages), "\">\n                ").concat(Math.abs(stats.villages).toLocaleString(), "\n              </td>\n            </tr>\n            ").concat(!player ? "<tr>\n              <td>\n                ".concat(translations.members, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.members), "\">\n                ").concat(Math.abs(stats.members), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                ").concat(translations.oda, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreAtt), "\">\n                ").concat(Math.abs(stats.scoreAtt).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.odaRank, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankAtt), "\">\n                ").concat(Math.abs(stats.rankAtt), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.odd, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreDef), "\">\n                ").concat(Math.abs(stats.scoreDef).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.oddRank, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankDef), "\">\n                ").concat(Math.abs(stats.rankDef), "\n              </td>\n            </tr>\n            ").concat(player ? "<tr>\n              <td>\n                ".concat(translations.ods, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreSup), "\">\n                ").concat(Math.abs(stats.scoreSup).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.odsRank, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankSup), "\">\n                ").concat(Math.abs(stats.rankSup), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                ").concat(translations.od, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreTotal), "\">\n                ").concat(Math.abs(stats.scoreTotal).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.odRank, ":\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankTotal), "\">\n                ").concat(Math.abs(stats.rankTotal), "\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

exports.default = _default;
},{"../i18n/renderTodaysStats":"l9PO","../utils/isNil":"yQib"}],"chDM":[function(require,module,exports) {
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
},{}],"tKRp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    date: 'Data',
    newOwner: 'Nowy właściciel',
    oldOwner: 'Stary właściciel',
    village: 'Wioska',
    title: 'Przejęcia'
  },
  en_DK: {
    date: 'Date',
    newOwner: 'New owner',
    oldOwner: 'Old owner',
    village: 'Village',
    title: 'Ennoblements'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"fCHX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePaginationItems = exports.calcNumberOfPages = exports.getPage = exports.setPage = exports.getContainerStyles = void 0;
const ATTRIBUTE = 'data-page';

const getContainerStyles = () => {
  return 'display: flex; flex-direction: row; flex-wrap: wrap;';
};

exports.getContainerStyles = getContainerStyles;

const setPage = function setPage(el) {
  let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!el instanceof HTMLElement) {
    throw new Error('Expected HTMLElement as the first argument');
  }

  page = parseInt(page);

  if (typeof page !== 'number' || isNaN(page)) {
    throw new Error('Expected number or string as the second argument');
  }

  el.setAttribute(ATTRIBUTE, page + '');
};

exports.setPage = setPage;

const getPage = el => {
  if (!el instanceof HTMLElement) {
    return 0;
  }

  return parseInt(el.getAttribute(ATTRIBUTE));
};

exports.getPage = getPage;

const calcNumberOfPages = (total, limit) => {
  if (typeof total !== 'number') {
    throw new Error('Expected number as the first argument');
  }

  if (typeof limit !== 'number') {
    throw new Error('Expected number as the second argument');
  }

  return total > 0 ? Math.ceil(total / limit) : 1;
};

exports.calcNumberOfPages = calcNumberOfPages;

const generatePaginationItems = function generatePaginationItems() {
  let {
    total,
    limit,
    marginRight = 3,
    currentPage = 0
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const numberOfPages = calcNumberOfPages(total, limit);
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i++) {
    if (i === currentPage) {
      paginationItems.push("<strong style=\"margin-right: ".concat(marginRight, "px\">>").concat(i, "<</strong>"));
    } else {
      paginationItems.push("<a style=\"margin-right: ".concat(marginRight, "px\" href=\"#\" ").concat(ATTRIBUTE, "=\"").concat(i, "\">").concat(i, "</a>"));
    }
  }

  return paginationItems;
};

exports.generatePaginationItems = generatePaginationItems;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (date, options) => {
  return new Date(date).toLocaleDateString(window.game_data.locale.replace('_', '-'), options ? options : {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

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
exports.loadInADayData = exports.formatVillageName = exports.formatVillageURL = exports.formatPlayerURL = exports.formatTribeURL = void 0;

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
},{"../libs/InADayParser":"dSAr"}],"vNT1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _showEnnoblementsPopup = _interopRequireDefault(require("../i18n/showEnnoblementsPopup"));

var _pagination = require("../utils/pagination");

var _showPopup = _interopRequireDefault(require("../utils/showPopup"));

var _formatDate = _interopRequireDefault(require("../utils/formatDate"));

var _tribalwars = require("../utils/tribalwars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
const translations = (0, _showEnnoblementsPopup.default)();

const getPlayerTd = (player, tribe) => {
  if (player) {
    return "<td><a href=\"".concat((0, _tribalwars.formatPlayerURL)(player.id), "\">").concat(player.name, " (").concat(tribe ? "<a href=\"".concat((0, _tribalwars.formatTribeURL)(tribe.id), "\">").concat(tribe.tag, "</a>") : '-', ")</a></td>");
  }

  return '<td>-</td>';
};

var _default = function _default(e, ennoblements) {
  let {
    limit = 0,
    currentPage = 1,
    onPageChange = () => {}
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const paginationItems = (0, _pagination.generatePaginationItems)({
    total: ennoblements.total,
    limit,
    currentPage
  });
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat(translations.date, "\n          </th>\n          <th>\n            ").concat(translations.village, "\n          </th>\n          <th>\n            ").concat(translations.newOwner, "\n          </th>\n          <th>\n            ").concat(translations.oldOwner, "\n          </th>\n        </tr>\n        ").concat(ennoblements.items.map(ennoblement => {
    let rowHTML = '<tr>' + "<td>".concat((0, _formatDate.default)(ennoblement.ennobledAt), "</td>");

    if (ennoblement.village) {
      rowHTML += "<td><a href=\"".concat((0, _tribalwars.formatVillageURL)(ennoblement.village.id), "\">").concat((0, _tribalwars.formatVillageName)(ennoblement.village.name, ennoblement.village.x, ennoblement.village.y), "</a></td>");
    } else {
      rowHTML += '<td>-</td>';
    }

    rowHTML += getPlayerTd(ennoblement.newOwner, ennoblement.newOwnerTribe);
    rowHTML += getPlayerTd(ennoblement.oldOwner, ennoblement.oldOwnerTribe);
    return rowHTML + '</tr>';
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _showPopup.default)({
    e,
    title: translations.title,
    id: 'ennoblements',
    html
  });
  document.querySelectorAll('#' + PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', onPageChange);
  });
};

exports.default = _default;
},{"../i18n/showEnnoblementsPopup":"tKRp","../utils/pagination":"fCHX","../utils/showPopup":"chDM","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"VYL5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toInteger;

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
},{}],"kK6Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredArgs;

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}
},{}],"KYJg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;

var _index = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0, _index.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"lQIY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDays;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var amount = (0, _index.default)(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}
},{"../_lib/toInteger/index.js":"VYL5","../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"mRRL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subDays;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":"VYL5","../addDays/index.js":"lQIY","../_lib/requiredArgs/index.js":"kK6Q"}],"hNDe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    title: "Historia",
    date: 'Data',
    tribe: 'Plemię',
    points: 'Punkty',
    rank: 'Ranking',
    villages: 'Liczba wiosek',
    members: 'Liczba członków',
    oda: 'Pokonani przeciwnicy jako agresor',
    odd: 'Pokonani przeciwnicy jako obrońca',
    ods: 'Pokonani przeciwnicy jako wspierający',
    od: 'Pokonani przeciwnicy'
  },
  en_DK: {
    title: "History",
    date: 'Date',
    tribe: 'Tribe',
    points: 'Points',
    villages: 'Villages',
    members: 'Members',
    oda: 'ODA',
    odd: 'ODD',
    ods: 'ODS',
    od: 'OD'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"kEDU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _showHistoryPopup = _interopRequireDefault(require("../i18n/showHistoryPopup"));

var _showPopup = _interopRequireDefault(require("../utils/showPopup"));

var _pagination = require("../utils/pagination");

var _formatDate = _interopRequireDefault(require("../utils/formatDate"));

var _tribalwars = require("../utils/tribalwars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGINATION_CONTAINER_ID = 'historyPagination';
const translations = (0, _showHistoryPopup.default)();

const addMathSymbol = v => {
  return v > 0 ? '+' + v : v;
};

var _default = function _default(e, history, daily) {
  let {
    currentPage = 1,
    limit = 0,
    onPageChange = () => {},
    tribe = false
  } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const paginationItems = (0, _pagination.generatePaginationItems)({
    total: history.total,
    limit,
    currentPage
  });
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat(translations.date, "\n          </th>\n          ").concat(tribe ? '' : "<th>".concat(translations.tribe, "</th>"), "\n          <th>\n          ").concat(translations.points, "\n          </th>\n          <th>\n          ").concat(translations.villages, "\n          </th>\n          ").concat(tribe ? "<th>".concat(translations.members, "</th>") : '', "\n          <th>\n            ").concat(translations.od, "\n          </th>\n          <th>\n            ").concat(translations.oda, "\n          </th>\n          <th>\n            ").concat(translations.odd, "\n          </th>\n          ").concat(tribe ? '' : "<th>".concat(translations.ods, "</th>"), "\n        </tr>\n        ").concat(history.items.map(history => {
    const subtracted = (0, _subDays.default)(new Date(history.createDate), 1).toISOString().split('.')[0] + 'Z';
    const stats = daily.items.find(stats => {
      return stats.createDate === subtracted;
    });
    let rowHTML = '<tr>' + "<td>".concat((0, _formatDate.default)(history.createDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }), "</td>");

    if (!tribe && history.tribe) {
      rowHTML += "<td><a href=\"".concat((0, _tribalwars.formatTribeURL)(history.tribe.id), "\">").concat(history.tribe.tag, "</a></td>");
    } else if (!tribe) {
      rowHTML += '<td>-</td>';
    }

    rowHTML += "\n              <td title=\"".concat(stats ? addMathSymbol(stats.points) : '', "\">\n                ").concat(history.points.toLocaleString(), " (<strong>").concat(history.rank, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? addMathSymbol(stats.villages) : '', "\">\n                ").concat(history.totalVillages.toLocaleString(), "\n              </td>\n              ").concat(!tribe ? '' : "\n                  <td title=\"".concat(stats ? addMathSymbol(stats.members) : '', "\">\n                    ").concat(history.totalMembers, "\n                </td>\n              "), "\n              <td title=\"").concat(stats ? addMathSymbol(stats.scoreTotal) : '', "\">\n                ").concat(history.scoreTotal.toLocaleString(), " (<strong>").concat(history.rankTotal, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? addMathSymbol(stats.scoreAtt) : '', "\">\n                ").concat(history.scoreAtt.toLocaleString(), " (<strong>").concat(history.rankAtt, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? addMathSymbol(stats.scoreDef) : '', "\">\n                ").concat(history.scoreDef.toLocaleString(), " (<strong>").concat(history.rankDef, "</strong>)\n              </td>\n              ").concat(tribe ? '' : "\n                  <td title=\"".concat(stats ? addMathSymbol(stats.scoreSup) : '', "\">\n                    ").concat(history.scoreSup.toLocaleString(), " (<strong>").concat(history.rankSup, "</strong>)\n                </td>\n              "), "\n            ") + '</tr>';
    return rowHTML;
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _showPopup.default)({
    e,
    title: translations.title,
    id: 'history',
    html
  });
  document.querySelectorAll('#' + PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', onPageChange);
  });
};

exports.default = _default;
},{"date-fns/subDays":"mRRL","../i18n/showHistoryPopup":"hNDe","../utils/showPopup":"chDM","../utils/pagination":"fCHX","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"Syko":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPlayerURL = void 0;

const formatPlayerURL = function formatPlayerURL() {
  let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "http://www.twstats.com/in/".concat(server, "/player/").concat(id);
};

exports.formatPlayerURL = formatPlayerURL;
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
},{}],"yRop":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _extendedPlayerProfile = _interopRequireDefault(require("./i18n/extendedPlayerProfile"));

var _renderTodaysStats = _interopRequireDefault(require("./common/renderTodaysStats"));

var _showPopup = _interopRequireDefault(require("./utils/showPopup"));

var _showEnnoblementsPopup = _interopRequireDefault(require("./common/showEnnoblementsPopup"));

var _showHistoryPopup = _interopRequireDefault(require("./common/showHistoryPopup"));

var _pagination = require("./utils/pagination");

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _twstats = require("./utils/twstats");

var _tribalwars = require("./utils/tribalwars");

var _localStorage = require("./utils/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Extended Player Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @version      1.1.1
// @description  Extended Player Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_player*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
let PLAYER_ID = (0, _getIDFromURL.default)(window.location.search);
const CURRENT_PLAYER_ID = parseInt(game_data.player.id);

if (isNaN(PLAYER_ID) || !PLAYER_ID) {
  PLAYER_ID = CURRENT_PLAYER_ID;
}

const LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + PLAYER_ID;
const PLAYER_QUERY = "\n    query player($server: String!, $id: Int!, $filter: DailyPlayerStatsFilter) {\n        player(server: $server, id: $id) {\n            id\n            name\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            servers\n            joinedAt\n            nameChanges {\n                oldName\n                newName\n                changeDate\n            }\n            dailyGrowth\n        }\n        dailyPlayerStats(server: $server, filter: $filter) {\n            items {\n              rank\n              rankAtt\n              rankDef\n              rankSup\n              rankTotal\n              points\n              scoreAtt\n              scoreAtt\n              scoreDef\n              scoreSup\n              scoreTotal\n              villages\n            }\n        }\n    }\n";
const TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, filter: $filter) {\n        total\n        items {\n          oldTribe {\n            id\n            tag\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
const TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const TRIBE_CHANGES_PER_PAGE = 15;
const PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY = "\nquery playerHistoryAndPlayerDailyStats($server: String!,\n     $playerHistoryFilter: PlayerHistoryFilter!,\n     $dailyPlayerStatsFilter: DailyPlayerStatsFilter!) {\n  playerHistory(server: $server, filter: $playerHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreSup\n      rankSup\n      scoreTotal\n      rankTotal\n      tribe {\n        id\n        tag\n      }\n      createDate\n    }\n  }\n  dailyPlayerStats(server: $server, filter: $dailyPlayerStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";
const PLAYER_HISTORY_PER_PAGE = 15;
const ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
const ENNOBLEMENTS_PER_PAGE = 15;
const profileInfoTBody = document.querySelector('#player_info > tbody');
const actionContainer = PLAYER_ID === CURRENT_PLAYER_ID ? profileInfoTBody : document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
const otherElementContainer = document.querySelector(PLAYER_ID === CURRENT_PLAYER_ID ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)' : '#content_value > table > tbody > tr > td:nth-child(2)');
const translations = (0, _extendedPlayerProfile.default)();

const loadDataFromCache = () => {
  return (0, _localStorage.getItem)(LOCAL_STORAGE_KEY);
};

const cachePlayerData = function cachePlayerData() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, data);
};

const loadData = async () => {
  const data = await (0, _requestCreator.default)({
    query: PLAYER_QUERY,
    variables: {
      server: SERVER,
      id: PLAYER_ID,
      filter: {
        sort: 'createDate DESC',
        limit: 1,
        playerID: [PLAYER_ID]
      }
    }
  });

  if (data.player) {
    const inADay = {};
    inADay.att = await (0, _tribalwars.loadInADayData)('kill_att', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.def = await (0, _tribalwars.loadInADayData)('kill_def', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.sup = await (0, _tribalwars.loadInADayData)('kill_sup', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.lootRes = await (0, _tribalwars.loadInADayData)('loot_res', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.lootVil = await (0, _tribalwars.loadInADayData)('loot_vil', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.scavenge = await (0, _tribalwars.loadInADayData)('scavenge', {
      name: data.player.name,
      playerID: data.player.id
    });
    inADay.conquer = await (0, _tribalwars.loadInADayData)('conquer', {
      name: data.player.name,
      playerID: data.player.id
    });
    data.player.inADay = inADay;
  }

  cachePlayerData(data);
  return data;
};

const renderTr = (_ref) => {
  let {
    title,
    data,
    id
  } = _ref;
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

const renderPlayerServers = player => {
  let playerServers = document.querySelector('#playerServers');

  if (!playerServers) {
    playerServers = document.createElement('table');
    playerServers.id = 'playerServers';
    playerServers.classList.add('vis');
    playerServers.width = '100%';
    playerServers.innerHTML = "\n     <tbody>\n        <tr>\n          <th>\n            ".concat(translations.playerServers, "\n          </th>\n        </tr>\n        <tr>\n          <td>\n          </td>\n        </tr>\n     </tbody>\n    ");
    otherElementContainer.prepend(playerServers);
  }

  playerServers.querySelector('td').innerHTML = player.servers.sort().map(server => "<a style=\"margin-right: 5px\" href=\"".concat((0, _twstats.formatPlayerURL)(server, player.id), "\">").concat(server, "</a>")).join('');
};

const renderPlayerOtherNames = player => {
  let playerOtherNames = document.querySelector('#playerOtherNames');

  if (!playerOtherNames) {
    playerOtherNames = document.createElement('div');
    playerOtherNames.id = 'playerOtherNames';
    playerOtherNames.width = '100%';
    otherElementContainer.prepend(playerOtherNames);
  }

  playerOtherNames.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th>\n            ".concat(translations.oldName, "\n            </th>\n            <th>\n            ").concat(translations.newName, "\n            </th>\n            <th>\n            ").concat(translations.date, "\n            </th>\n          </tr>\n        ").concat(player.nameChanges.map(nameChange => {
    return "\n            <tr>\n              <td>\n                ".concat(nameChange.oldName, "\n              </td>\n              <td>\n                ").concat(nameChange.newName, "\n              </td>\n              <td>\n                ").concat((0, _formatDate.default)(nameChange.changeDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }), "\n              </td>\n            </tr>\n          ");
  }).join(''), "\n      </tbody>\n      </table>\n  ");
};

const renderInADayRanks = player => {
  let inADayRanks = document.querySelector('#inADayRanks');

  if (!inADayRanks) {
    inADayRanks = document.createElement('div');
    inADayRanks.id = 'inADayRanks';
    inADayRanks.width = '100%';
    otherElementContainer.prepend(inADayRanks);
  }

  inADayRanks.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              ".concat(translations.inADayBestScores, "\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat(translations.unitsDefeatedWhileAttacking, "\n              </td>\n              <td>\n                ").concat(player.inADay.att.score.toLocaleString(), " (").concat(player.inADay.att.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.unitsDefeatedWhileDefending, "\n              </td>\n              <td>\n                ").concat(player.inADay.def.score.toLocaleString(), " (").concat(player.inADay.def.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.unitsDefeatedWhileSupporting, "\n              </td>\n              <td>\n                ").concat(player.inADay.sup.score.toLocaleString(), " (").concat(player.inADay.sup.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.resourcesPlundered, "\n              </td>\n              <td>\n                ").concat(player.inADay.lootRes.score.toLocaleString(), " (").concat(player.inADay.lootRes.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.villagesPlundered, "\n              </td>\n              <td>\n                ").concat(player.inADay.lootVil.score.toLocaleString(), " (").concat(player.inADay.lootVil.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.resourcesGathered, "\n              </td>\n              <td>\n                ").concat(player.inADay.scavenge.score.toLocaleString(), " (").concat(player.inADay.scavenge.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(translations.villagesConquered, "\n              </td>\n              <td>\n                ").concat(player.inADay.conquer.score.toLocaleString(), " (").concat(player.inADay.conquer.rank, ".)\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

const render = (_ref2) => {
  let {
    player,
    dailyPlayerStats
  } = _ref2;
  [{
    title: translations.joinedAt + ':',
    data: (0, _formatDate.default)(player.joinedAt),
    id: 'joined_at'
  }, {
    title: translations.dailyGrowth + ':',
    data: player.dailyGrowth.toLocaleString(),
    id: 'dg'
  }, {
    title: translations.bestRank + ':',
    data: player.bestRank + ' ' + "(".concat((0, _formatDate.default)(player.bestRankAt), ")"),
    id: 'best_rank'
  }, {
    title: translations.mostPoints + ':',
    data: player.mostPoints.toLocaleString() + ' ' + "(".concat((0, _formatDate.default)(player.mostPointsAt), ")"),
    id: 'most_points'
  }, {
    title: translations.mostVillages + ':',
    data: player.mostVillages + ' ' + "(".concat((0, _formatDate.default)(player.mostVillagesAt), ")"),
    id: 'most_villages'
  }].forEach(data => {
    renderTr(data);
  });
  renderInADayRanks(player);

  if (dailyPlayerStats && dailyPlayerStats.items.length > 0) {
    (0, _renderTodaysStats.default)(otherElementContainer, dailyPlayerStats.items[0]);
  }

  if (player.nameChanges.length > 0) {
    renderPlayerOtherNames(player);
  }

  if (player.servers.length > 0) {
    renderPlayerServers(player);
  }
};

const renderTribeChanges = (e, currentPage, tribeChanges) => {
  const paginationItems = (0, _pagination.generatePaginationItems)({
    total: tribeChanges.total,
    limit: TRIBE_CHANGES_PER_PAGE,
    currentPage
  });
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat(translations.date, "\n          </th>\n          <th>\n            ").concat(translations.newTribe, "\n          </th>\n          <th>\n            ").concat(translations.oldTribe, "\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
    let rowHTML = '<tr>' + "<td>".concat((0, _formatDate.default)(tribeChange.createdAt), "</td>");

    if (tribeChange.newTribe) {
      rowHTML += "<td><a href=\"".concat((0, _tribalwars.formatTribeURL)(tribeChange.newTribe.id), "\">").concat(tribeChange.newTribe.tag, "</a></td>");
    } else {
      rowHTML += '<td>-</td>';
    }

    if (tribeChange.oldTribe) {
      rowHTML += "<td><a href=\"".concat((0, _tribalwars.formatTribeURL)(tribeChange.oldTribe.id), "\">").concat(tribeChange.oldTribe.tag, "</a></td>");
    } else {
      rowHTML += '<td>-</td>';
    }

    return rowHTML + '</tr>';
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _showPopup.default)({
    e,
    title: translations.tribeChanges,
    id: 'tribeChanges',
    html
  });
  document.querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', handleShowTribeChangesButtonClick);
  });
};

const handleShowTribeChangesButtonClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    const data = await (0, _requestCreator.default)({
      query: TRIBE_CHANGES_QUERY,
      variables: {
        filter: {
          playerID: [PLAYER_ID],
          offset: TRIBE_CHANGES_PER_PAGE * (page - 1),
          limit: TRIBE_CHANGES_PER_PAGE,
          sort: 'createdAt DESC'
        },
        server: SERVER
      }
    });
    renderTribeChanges(e, page, data.tribeChanges);
  }
};

const handleShowPlayerHistoryClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    try {
      const filter = {
        playerID: [PLAYER_ID],
        offset: PLAYER_HISTORY_PER_PAGE * (page - 1),
        limit: PLAYER_HISTORY_PER_PAGE,
        sort: 'createDate DESC'
      };
      const {
        playerHistory,
        dailyPlayerStats
      } = await (0, _requestCreator.default)({
        query: PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY,
        variables: {
          server: SERVER,
          playerHistoryFilter: filter,
          dailyPlayerStatsFilter: _objectSpread(_objectSpread({}, filter), {}, {
            offset: filter.offset + 1
          })
        }
      });
      (0, _showHistoryPopup.default)(e, playerHistory, dailyPlayerStats, {
        currentPage: page,
        limit: PLAYER_HISTORY_PER_PAGE,
        onPageChange: handleShowPlayerHistoryClick,
        tribe: false
      });
    } catch (error) {
      console.log('cannot load player history', error);
    }
  }
};

const handleShowPlayerEnnoblementsClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    const data = await (0, _requestCreator.default)({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          or: {
            oldOwnerID: [PLAYER_ID],
            newOwnerID: [PLAYER_ID]
          },
          offset: ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: ENNOBLEMENTS_PER_PAGE,
          sort: 'ennobledAt DESC'
        },
        server: SERVER
      }
    });
    (0, _showEnnoblementsPopup.default)(e, data.ennoblements, {
      currentPage: page,
      limit: ENNOBLEMENTS_PER_PAGE,
      onPageChange: handleShowPlayerEnnoblementsClick
    });
  }
};

const handleExportPlayerVillagesButtonClick = e => {
  e.preventDefault();
  Dialog.show(translations.exportedVillages, "<textarea cols=30 rows=8 readonly>".concat(document.querySelector('#villages_list').innerHTML.match(/(\d+)\|(\d+)/g).join(' '), "</textarea>"));
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
  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  (0, _pagination.setPage)(showTribeChanges, '1');
  showTribeChanges.innerHTML = translations.action.showTribeChanges;
  showTribeChanges.addEventListener('click', handleShowTribeChangesButtonClick);
  actionContainer.appendChild(wrapAction(showTribeChanges));
  const showPlayerHistory = document.createElement('a');
  showPlayerHistory.href = '#';
  (0, _pagination.setPage)(showPlayerHistory, '1');
  showPlayerHistory.innerHTML = translations.action.showHistory;
  showPlayerHistory.addEventListener('click', handleShowPlayerHistoryClick);
  actionContainer.appendChild(wrapAction(showPlayerHistory));
  const showEnnoblements = document.createElement('a');
  showEnnoblements.href = '#';
  (0, _pagination.setPage)(showEnnoblements, '1');
  showEnnoblements.innerHTML = translations.action.showEnnoblements;
  showEnnoblements.addEventListener('click', handleShowPlayerEnnoblementsClick);
  actionContainer.appendChild(wrapAction(showEnnoblements));
  const exportPlayerVillages = document.createElement('a');
  exportPlayerVillages.href = '#';
  exportPlayerVillages.innerHTML = translations.action.exportVillages;
  exportPlayerVillages.addEventListener('click', handleExportPlayerVillagesButtonClick);
  actionContainer.appendChild(wrapAction(exportPlayerVillages));
};

(async function () {
  try {
    renderActions();
    const dataFromCache = loadDataFromCache();

    if (dataFromCache && dataFromCache.player) {
      render(dataFromCache);
    }

    const dataFromAPI = await loadData();

    if (dataFromAPI) {
      render(dataFromAPI);
    }
  } catch (error) {
    console.log('extended player profile', error);
  }
})();
},{"./libs/requestCreator":"Ph2E","./i18n/extendedPlayerProfile":"I8dv","./common/renderTodaysStats":"yrCm","./utils/showPopup":"chDM","./common/showEnnoblementsPopup":"vNT1","./common/showHistoryPopup":"kEDU","./utils/pagination":"fCHX","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/twstats":"Syko","./utils/tribalwars":"fHHP","./utils/localStorage":"KWxH"}]},{},["yRop"], null)