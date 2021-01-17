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
})({"tQUs":[function(require,module,exports) {
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
  constructor() {
    let html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.dom = new DOMParser().parseFromString(html, 'text/html');
    this.trs = this.dom.querySelectorAll('#in_a_day_ranking_table tbody tr');
    this.filters = filters;
  }

  isValidRow(row) {
    if (!row) {
      return false;
    }

    if (this.filters.playerID && row.playerID !== this.filters.playerID) {
      return false;
    }

    if (this.filters.tribes && Array.isArray(this.filters.tribes) && !this.filters.tribes.some(tribe => tribe === row.tribe)) {
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
    const result = [];

    for (let i = 1; i < this.trs.length; i++) {
      const row = this.trs[i];
      const parsed = this.parseRow(row);

      if (this.isValidRow(parsed)) {
        result.push(parsed);
      }
    }

    return result;
  }

}

exports.default = InADayParser;
},{"../utils/getIDFromURL":"tQUs"}],"hPka":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    addTribe: 'Dodaj plemię',
    generate: 'Wygeneruj',
    delete: 'Usuń',
    player: 'Gracz',
    tribe: 'Plemię',
    rank: 'Ranking',
    score: 'Wynik',
    date: 'Data',
    loaded: 'Załadowano'
  },
  en_DK: {
    addTribe: 'Add tribe',
    generate: 'Generate',
    delete: 'Delete',
    player: 'Player',
    tribe: 'Tribe',
    rank: 'Rank',
    score: 'Score',
    date: 'Date',
    loaded: 'Loaded'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"oUdd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = t => new Promise(resolve => setTimeout(resolve, t));

exports.default = _default;
},{}],"s4G3":[function(require,module,exports) {
"use strict";

var _InADayParser = _interopRequireDefault(require("./libs/InADayParser"));

var _inADayTribeRankingGenerator = _interopRequireDefault(require("./i18n/inADayTribeRankingGenerator"));

var _wait = _interopRequireDefault(require("./utils/wait"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         'In A Day' tribe ranking generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @version      0.2.2
// @description  'In A Day' tribe ranking generator
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=ranking*mode=in_a_day*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const TRIBE_CONTAINER_ID = 'iad_tribes';
const LIMIT_INPUT_ID = 'iad_limit';
const translations = (0, _inADayTribeRankingGenerator.default)();

const addTribe = () => {
  const container = document.querySelector('#' + TRIBE_CONTAINER_ID);
  const div = document.createElement('div');
  div.innerHTML = "\n        <label>".concat(translations.tribe, ": </label>\n        <input type=\"text\" required />\n        <button type=\"button\">").concat(translations.delete, "</button>\n    ");
  div.querySelector('button').addEventListener('click', () => {
    if (container.children.length > 1) {
      div.remove();
    }
  });
  container.appendChild(div);
};

const handleFormSubmit = async e => {
  e.preventDefault();
  const limit = parseInt(document.querySelector('#' + LIMIT_INPUT_ID).value);
  const tribes = [];
  const type = new URLSearchParams(window.location.search).get('type') || 'kill_att';
  document.querySelectorAll('#' + TRIBE_CONTAINER_ID + ' input').forEach(el => {
    if (el.value) tribes.push(el.value.trim());
  });
  let players = [];
  let page = 0;

  while (players.length < limit) {
    Dialog.show('iad_loading', "".concat(translations.loaded, ": <strong>").concat(players.length, "/").concat(limit, "</strong>"));

    try {
      const response = await fetch(TribalWars.buildURL('', {
        screen: 'ranking',
        mode: 'in_a_day',
        type,
        offset: page * 25
      }));
      const html = await response.text();
      const parser = new _InADayParser.default(html, {
        tribes
      });
      if (parser.trs.length !== 26) break;
      players = [...players, ...parser.parse()];
      page++;
      await (0, _wait.default)(200);
    } catch (error) {
      break;
    }
  }

  if (players.length > limit) {
    players = players.slice(0, limit);
  }

  Dialog.show('iad_result', "\n    <textarea cols=30 rows=8 readonly>[table]\n[**][||]".concat(translations.player, "[||]").concat(translations.tribe, "[||]").concat(translations.rank, "[||]").concat(translations.score, "[||]").concat(translations.date, "[/**]\n").concat(players.map((player, index) => {
    return "[*]".concat(index + 1, ".[|][player]").concat(player.name, "[/player][|][ally]").concat(player.tribe, "[/ally][|]").concat(player.rank, "[|]").concat(player.score.toLocaleString(), "[|]").concat(player.date);
  }).join('\n'), "\n[/table]</textarea>\n  "));
};

const renderUI = () => {
  const addButtonID = 'iad_add';
  const div = document.createElement('div');
  const html = "\n    <form>\n        <div id=\"".concat(TRIBE_CONTAINER_ID, "\">\n        </div>\n        <div>\n            <label>Limit: </label>\n            <input id=\"").concat(LIMIT_INPUT_ID, "\" type=\"number\" min=\"1\" value=\"10\" required />\n        </div>\n        <button type=\"submit\">").concat(translations.generate, "</button>\n        <button id=\"").concat(addButtonID, "\" type=\"button\">").concat(translations.addTribe, "</button>\n    </form>\n  ");
  div.innerHTML = html;
  document.querySelector('#content_value > table > tbody > tr > td:nth-child(2)').prepend(div);
  div.querySelector('form').addEventListener('submit', handleFormSubmit);
  div.querySelector('#' + addButtonID).addEventListener('click', addTribe);
  addTribe();
};

(function () {
  try {
    renderUI();
  } catch (error) {
    console.log("'In A Day' Tribe Ranking Generator", error);
  }
})();
},{"./libs/InADayParser":"dSAr","./i18n/inADayTribeRankingGenerator":"hPka","./utils/wait":"oUdd"}]},{},["s4G3"], null)