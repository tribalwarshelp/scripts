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
},{}],"tQUs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = url => parseInt(new URLSearchParams(url).get('id'));

exports.default = _default;
},{}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
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
exports.loadInADayData = exports.formatVillageURL = exports.formatPlayerURL = exports.formatTribeURL = void 0;

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
},{"../libs/InADayParser":"dSAr"}],"KWxH":[function(require,module,exports) {
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

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _renderPopup = _interopRequireDefault(require("./utils/renderPopup"));

var _twstats = require("./utils/twstats");

var _tribalwars = require("./utils/tribalwars");

var _localStorage = require("./utils/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         Extended Player Profile
// @namespace    https://gist.github.com/Kichiyaki/3c273582cc6856512e22c86c375f795a
// @version      0.1
// @description  Extended Player Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php*&screen=info_player*
// @match        *://*.tribalwars.net/game.php*&screen=info_player*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
let PLAYER_ID = (0, _getIDFromURL.default)(window.location.search);
const CURRENT_PLAYER_ID = parseInt(game_data.player.id);

if (isNaN(PLAYER_ID) || !PLAYER_ID) {
  PLAYER_ID = CURRENT_PLAYER_ID;
}

const LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + PLAYER_ID;
const PLAYER_QUERY = "\n    query pageData($server: String!, $id: Int!, $filter: DailyPlayerStatsFilter) {\n        player(server: $server, id: $id) {\n            id\n            name\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            servers\n            joinedAt\n            nameChanges {\n                oldName\n                newName\n                changeDate\n            }\n            dailyGrowth\n        }\n        dailyPlayerStats(server: $server, filter: $filter) {\n            items {\n              rank\n              rankAtt\n              rankDef\n              rankSup\n              rankTotal\n              points\n              scoreAtt\n              scoreAtt\n              scoreDef\n              scoreSup\n              scoreTotal\n              villages\n            }\n        }\n    }\n";
const TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, filter: $filter) {\n        total\n        items {\n          oldTribe {\n            id\n            tag\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
const TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const TRIBE_CHANGES_PER_PAGE = 15;
const profileInfoTBody = document.querySelector('#player_info > tbody');
const actionsContainer = PLAYER_ID === CURRENT_PLAYER_ID ? profileInfoTBody : document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
const otherElementsContainer = document.querySelector(PLAYER_ID === CURRENT_PLAYER_ID ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)' : '#content_value > table > tbody > tr > td:nth-child(2)');

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
    playerServers.innerHTML = "\n     <tbody>\n        <tr>\n          <th>\n            Player's servers\n          </th>\n        </tr>\n        <tr>\n          <td>\n          </td>\n        </tr>\n     </tbody>\n    ";
    otherElementsContainer.prepend(playerServers);
  }

  playerServers.querySelector('td').innerHTML = player.servers.sort().map(server => "<a style=\"margin-right: 5px\" href=\"".concat((0, _twstats.formatPlayerURL)(server, player.id), "\">").concat(server, "</a>")).join('');
};

const renderPlayerOtherNames = player => {
  let playerOtherNames = document.querySelector('#playerOtherNames');

  if (!playerOtherNames) {
    playerOtherNames = document.createElement('div');
    playerOtherNames.id = 'playerOtherNames';
    playerOtherNames.width = '100%';
    otherElementsContainer.prepend(playerOtherNames);
  }

  playerOtherNames.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th>\n              Old name\n            </th>\n            <th>\n              New name\n            </th>\n            <th>\n              Date\n            </th>\n          </tr>\n        ".concat(player.nameChanges.map(nameChange => {
    return "\n            <tr>\n              <td>\n                ".concat(nameChange.oldName, "\n              </td>\n              <td>\n                ").concat(nameChange.newName, "\n              </td>\n              <td>\n                ").concat((0, _formatDate.default)(nameChange.changeDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }), "\n              </td>\n            </tr>\n          ");
  }).join(''), "\n      </tbody>\n      </table>\n  ");
};

const renderTodaysStats = stats => {
  let todaysStats = document.querySelector('#todaysStats');

  if (!todaysStats) {
    todaysStats = document.createElement('div');
    todaysStats.id = 'todaysStats';
    todaysStats.width = '100%';
    otherElementsContainer.prepend(todaysStats);
  }

  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  todaysStats.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              Today's stats\n            </th>\n          </tr>\n            <tr>\n              <td>\n                Points:\n              </td>\n              <td style=\"".concat(stats.points > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.points).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank:\n              </td>\n              <td style=\"").concat(stats.rank > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.rank), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Villages:\n              </td>\n              <td style=\"").concat(stats.villages > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.villages).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODA:\n              </td>\n              <td style=\"").concat(stats.scoreAtt > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.scoreAtt).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank ODA:\n              </td>\n              <td style=\"").concat(stats.rankAtt > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.rankAtt), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODD:\n              </td>\n              <td style=\"").concat(stats.scoreDef > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.scoreDef).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank ODD:\n              </td>\n              <td style=\"").concat(stats.rankDef > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.rankDef), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODS:\n              </td>\n              <td style=\"").concat(stats.scoreSup > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.scoreSup).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank ODS:\n              </td>\n              <td style=\"").concat(stats.rankSup > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.rankSup), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                OD:\n              </td>\n              <td style=\"").concat(stats.scoreTotal > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.scoreTotal).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank OD:\n              </td>\n              <td style=\"").concat(stats.rankTotal > 0 ? statIncreaseStyle : statDecreaseStyle, "\">\n                ").concat(Math.abs(stats.rankTotal), "\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

const renderInADayRanks = player => {
  let inADayRanks = document.querySelector('#inADayRanks');

  if (!inADayRanks) {
    inADayRanks = document.createElement('div');
    inADayRanks.id = 'inADayRanks';
    inADayRanks.width = '100%';
    otherElementsContainer.prepend(inADayRanks);
  }

  inADayRanks.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              'In a day' best scores\n            </th>\n          </tr>\n            <tr>\n              <td>\n                Units defeated while attacking:\n              </td>\n              <td>\n                ".concat(player.inADay.att.score.toLocaleString(), " (").concat(player.inADay.att.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Units defeated while defending:\n              </td>\n              <td>\n                ").concat(player.inADay.def.score.toLocaleString(), " (").concat(player.inADay.def.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Units defeated while supporting:\n              </td>\n              <td>\n                ").concat(player.inADay.sup.score.toLocaleString(), " (").concat(player.inADay.sup.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Resources plundered:\n              </td>\n              <td>\n                ").concat(player.inADay.lootRes.score.toLocaleString(), " (").concat(player.inADay.lootRes.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Villages plundered:\n              </td>\n              <td>\n                ").concat(player.inADay.lootVil.score.toLocaleString(), " (").concat(player.inADay.lootVil.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Resources gathered:\n              </td>\n              <td>\n                ").concat(player.inADay.scavenge.score.toLocaleString(), " (").concat(player.inADay.scavenge.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Villages conquered:\n              </td>\n              <td>\n                ").concat(player.inADay.conquer.score.toLocaleString(), " (").concat(player.inADay.conquer.rank, ".)\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

const render = (_ref2) => {
  let {
    player,
    dailyPlayerStats
  } = _ref2;
  [{
    title: 'Joined at:',
    data: (0, _formatDate.default)(player.joinedAt),
    id: 'joined_at'
  }, {
    title: 'Daily growth:',
    data: player.dailyGrowth.toLocaleString(),
    id: 'dg'
  }, {
    title: 'Best rank:',
    data: player.bestRank + ' ' + "(".concat((0, _formatDate.default)(player.bestRankAt), ")"),
    id: 'best_rank'
  }, {
    title: 'Most points:',
    data: player.mostPoints + ' ' + "(".concat((0, _formatDate.default)(player.mostPointsAt), ")"),
    id: 'most_points'
  }, {
    title: 'Most villages:',
    data: player.mostVillages + ' ' + "(".concat((0, _formatDate.default)(player.mostVillagesAt), ")"),
    id: 'most_villages'
  }].forEach(data => {
    renderTr(data);
  });
  renderInADayRanks(player);

  if (dailyPlayerStats && dailyPlayerStats.items.length > 0) {
    renderTodaysStats(dailyPlayerStats.items[0]);
  }

  if (player.nameChanges.length > 0) {
    renderPlayerOtherNames(player);
  }

  if (player.servers.length > 0) {
    renderPlayerServers(player);
  }
};

const addTribeChangesListeners = () => {
  document.querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', handleShowTribeChangesButtonClick);
  });
};

const renderTribeChanges = (e, currentPage, tribeChanges) => {
  const numberOfPages = tribeChanges.total > 0 ? Math.ceil(tribeChanges.total / TRIBE_CHANGES_PER_PAGE) : 1;
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i++) {
    if (i === currentPage) {
      paginationItems.push("<strong style=\"margin-right: 3px\">>".concat(i, "<</strong>"));
    } else {
      paginationItems.push("<a style=\"margin-right: 3px\" href=\"#\" data-page=\"".concat(i, "\">").concat(i, "</a>"));
    }
  }

  const html = "\n    <div id=\"".concat(TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\">\n      <tbody>\n        <tr>\n          <th>\n            Date\n          </th>\n          <th>\n            New tribe\n          </th>\n          <th>\n            Old tribe\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
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

    return rowHTML;
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _renderPopup.default)({
    e,
    title: "Tribe changes",
    id: 'tribeChanges',
    html
  });
  addTribeChangesListeners();
};

const handleShowTribeChangesButtonClick = async e => {
  e.preventDefault();
  const page = parseInt(e.target.getAttribute('data-page'));

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

const handleExportPlayerVillagesButtonClick = e => {
  e.preventDefault();
  Dialog.show('Exported villages', "<textarea cols=30 rows=8 readonly>".concat(document.querySelector('#villages_list').innerHTML.match(/(\d+)\|(\d+)/g).join(' '), "</textarea>"));
};

const renderActions = () => {
  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  showTribeChanges.setAttribute('data-page', '1');
  showTribeChanges.innerHTML = 'Show tribe changes';
  showTribeChanges.addEventListener('click', handleShowTribeChangesButtonClick);
  const showTribeChangesTd = document.createElement('td');
  showTribeChangesTd.colSpan = '2';
  showTribeChangesTd.append(showTribeChanges);
  const showTribeChangesTr = document.createElement('tr');
  showTribeChangesTr.appendChild(showTribeChangesTd);
  actionsContainer.appendChild(showTribeChangesTr);
  const exportPlayerVillages = document.createElement('a');
  exportPlayerVillages.href = '#';
  exportPlayerVillages.innerHTML = 'Export player villages';
  exportPlayerVillages.addEventListener('click', handleExportPlayerVillagesButtonClick);
  const exportPlayerVillagesTd = document.createElement('td');
  exportPlayerVillagesTd.colSpan = '2';
  exportPlayerVillagesTd.append(exportPlayerVillages);
  const exportPlayerVillagesTr = document.createElement('tr');
  exportPlayerVillagesTr.appendChild(exportPlayerVillagesTd);
  actionsContainer.appendChild(exportPlayerVillagesTr);
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
},{"./libs/requestCreator":"Ph2E","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/renderPopup":"P4rL","./utils/twstats":"Syko","./utils/tribalwars":"fHHP","./utils/localStorage":"KWxH"}]},{},["yRop"], null)