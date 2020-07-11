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
    if (this.filters.playerID && row.playerID !== this.filters.playerID) {
      return false;
    }

    return true;
  }

  parseRow(row) {
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
},{"../utils/getIDFromURL":"tQUs"}],"DMkL":[function(require,module,exports) {
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
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
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

var _InADayParser = _interopRequireDefault(require("./libs/InADayParser"));

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _twstats = require("./utils/twstats");

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
const PLAYER_QUERY = "\n    query player($server: String!, $id: Int!) {\n        player(server: $server, id: $id) {\n            id\n            name\n            servers\n            joinedAt\n            nameChanges {\n                oldName\n                newName\n                changeDate\n            }\n            dailyGrowth\n        }\n    }\n";
const profileInfoTBody = document.querySelector('#player_info > tbody');
const otherElementsContainer = document.querySelector(PLAYER_ID === CURRENT_PLAYER_ID ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)' : '#content_value > table > tbody > tr > td:nth-child(2)');

const loadPlayerDataFromCache = () => {
  return (0, _localStorage.getItem)(LOCAL_STORAGE_KEY);
};

const cachePlayerData = function cachePlayerData() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, data);
};

const loadInADayRankAndScore = async (name, playerID, type) => {
  try {
    const response = await fetch(TribalWars.buildURL('', {
      screen: 'ranking',
      mode: 'in_a_day',
      type,
      name
    }));
    const html = await response.text();
    const res = new _InADayParser.default(html, {
      playerID
    }).parse();

    if (res.length === 0) {
      throw new Error();
    }

    return res[0];
  } catch (error) {
    console.log(error);
    return {
      rank: 0,
      playerID: 0,
      score: 0,
      tribeID: 0,
      date: new Date()
    };
  }
};

const loadPlayerData = async () => {
  const data = await (0, _requestCreator.default)({
    query: PLAYER_QUERY,
    variables: {
      server: SERVER,
      id: PLAYER_ID
    }
  });

  if (data.player) {
    const inADay = {};
    inADay.att = await loadInADayRankAndScore(data.player.name, data.player.id, 'kill_att');
    inADay.def = await loadInADayRankAndScore(data.player.name, data.player.id, 'kill_def');
    inADay.sup = await loadInADayRankAndScore(data.player.name, data.player.id, 'kill_sup');
    inADay.lootRes = await loadInADayRankAndScore(data.player.name, data.player.id, 'loot_res');
    inADay.lootVil = await loadInADayRankAndScore(data.player.name, data.player.id, 'loot_vil');
    inADay.scavenge = await loadInADayRankAndScore(data.player.name, data.player.id, 'scavenge');
    inADay.conquer = await loadInADayRankAndScore(data.player.name, data.player.id, 'conquer');
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
    playerServers.innerHTML = "\n     <tbody>\n        <tr>\n          <th>\n            Player's Servers\n          </th>\n        </tr>\n        <tr>\n          <td>\n          </td>\n        </tr>\n     </tbody>\n    ";
    otherElementsContainer.prepend(playerServers);
  }

  playerServers.querySelector('td').innerHTML = player.servers.map(server => "<a style=\"margin-right: 5px\" href=\"".concat((0, _twstats.formatPlayerURL)(server, player.id), "\">").concat(server, "</a>")).join('');
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
      month: 'numeric',
      day: 'numeric'
    }), "\n              </td>\n            </tr>\n          ");
  }).join(''), "\n      </tbody>\n      </table>\n  ");
};

const render = player => {
  [{
    title: 'Joined at:',
    data: (0, _formatDate.default)(player.joinedAt),
    id: 'joined_at'
  }, {
    title: 'Daily growth:',
    data: player.dailyGrowth.toLocaleString(),
    id: 'dg'
  }, {
    title: 'Units defeated while attacking:',
    data: "".concat(player.inADay.att.score.toLocaleString(), " (").concat(player.inADay.att.rank, ".)"),
    id: 'kill_att'
  }, {
    title: 'Units defeated while defending:',
    data: "".concat(player.inADay.def.score.toLocaleString(), " (").concat(player.inADay.def.rank, ".)"),
    id: 'kill_def'
  }, {
    title: 'Units defeated while supporting:',
    data: "".concat(player.inADay.sup.score.toLocaleString(), " (").concat(player.inADay.sup.rank, ".)"),
    id: 'kill_sup'
  }, {
    title: 'Resources plundered:',
    data: "".concat(player.inADay.lootRes.score.toLocaleString(), " (").concat(player.inADay.lootRes.rank, ".)"),
    id: 'loot_res'
  }, {
    title: 'Villages plundered:',
    data: "".concat(player.inADay.lootVil.score.toLocaleString(), " (").concat(player.inADay.lootVil.rank, ".)"),
    id: 'loot_vil'
  }, {
    title: 'Resources gathered:',
    data: "".concat(player.inADay.scavenge.score.toLocaleString(), " (").concat(player.inADay.scavenge.rank, ".)"),
    id: 'scavenge'
  }, {
    title: 'Villages conquered:',
    data: "".concat(player.inADay.conquer.score.toLocaleString(), " (").concat(player.inADay.conquer.rank, ".)"),
    id: 'conquer'
  }].forEach(data => {
    renderTr(data);
  });

  if (player.nameChanges.length > 0) {
    renderPlayerOtherNames(player);
  }

  if (player.servers.length > 0) {
    renderPlayerServers(player);
  }
};

(async function () {
  try {
    const {
      player: playerDataFromCache
    } = loadPlayerDataFromCache();

    if (playerDataFromCache) {
      render(playerDataFromCache);
    }

    const {
      player
    } = await loadPlayerData();

    if (player) {
      render(player);
    }

    console.log(player);
  } catch (error) {
    console.log('extended player profile', error);
  }
})();
},{"./libs/requestCreator":"Ph2E","./libs/InADayParser":"dSAr","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/twstats":"Syko","./utils/localStorage":"KWxH"}]},{},["yRop"], null)