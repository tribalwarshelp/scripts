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
})({"ar93":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    rename: 'Zmień',
    name: 'Nazwa'
  },
  en_DK: {
    rename: 'Rename',
    name: 'Name'
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
},{}],"XXZR":[function(require,module,exports) {
"use strict";

var _commandRenamer = _interopRequireDefault(require("./i18n/commandRenamer"));

var _wait = _interopRequireDefault(require("./utils/wait"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         Command renamer
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @version      0.2.1
// @description  Command renamer
// @author       Kichiyaki https://dawid-wysokinski.pl/
// @match        *://*/game.php*mode=incomings*
// @grant        none
// ==/UserScript==
const translations = (0, _commandRenamer.default)();

const handleSubmit = async e => {
  e.preventDefault();
  const name = e.target[0].value;
  if (!name) return;
  const checkboxes = document.querySelectorAll('#incomings_table input:checked');
  e.target[1].disabled = true;

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    if (checkbox.id === 'select_all') continue;
    const icon = checkbox.parentElement.querySelector('.rename-icon');
    icon.click();
    await (0, _wait.default)(20);
    const quickeditForm = checkbox.parentElement.querySelector('.quickedit-edit');
    quickeditForm.querySelector('input').value = name;
    quickeditForm.querySelector('input[type="button"]').click();
    await (0, _wait.default)(350);
  }

  e.target[1].disabled = false;
};

const renderUI = () => {
  const html = "\n    <input type=\"text\" placeholder=\"".concat(translations.name, "\" />\n    <button type=\"submit\">").concat(translations.rename, "</button>\n  ");
  const form = document.createElement('form');
  form.innerHTML = html;
  form.addEventListener('submit', handleSubmit);
  document.querySelector('#paged_view_content').insertBefore(form, document.querySelector('#incomings_form'));
};

(async function () {
  try {
    renderUI();
  } catch (error) {
    console.log('command renamer', error);
  }
})();
},{"./i18n/commandRenamer":"ar93","./utils/wait":"oUdd"}]},{},["XXZR"], null)