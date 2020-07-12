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
})({"tYTs":[function(require,module,exports) {
// ==UserScript==
// @name         Command sender
// @namespace    https://github.com/
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandSender.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandSender.js
// @version      0.1
// @description  Command sender
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php?*&screen=place&try=confirm*
// @match        *://*.tribalwars.net/game.php?*&screen=place&try=confirm*
// @grant        none
// ==/UserScript==
let timeoutID;
const INPUT_ID = 'kichiyaki_command_sender_input';
const START_BUTTON_ID = 'kichiyaki_command_sender_start_button';
const CANCEL_BUTTON_ID = 'kichiyaki_command_sender_cancel_button';

const getDuration = () => {
  const span = document.querySelector('#date_arrival > span');

  if (span) {
    return parseInt(span.getAttribute('data-duration')) * 1000;
  }

  return 0;
};

const getInputInitialValue = () => {
  const date = new Date(Timing.getCurrentServerTime() + getDuration());
  return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, "-").concat(date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), "T").concat(date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), ":").concat(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(), ":").concat(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
};

const calcMillisecondsToAttack = date => {
  return Math.floor(new Date(date).getTime() - getDuration() - Timing.getCurrentServerTime()) + 35;
};

const handleStart = () => {
  const ms = calcMillisecondsToAttack(document.querySelector('#' + INPUT_ID).value);
  console.log(ms);
  if (ms <= 0 || isNaN(ms)) return UI.ErrorMessage('Wprowadzono nieprawidłowy czas!');
  document.querySelector('#' + START_BUTTON_ID).disabled = true;
  document.querySelector('#' + CANCEL_BUTTON_ID).disabled = false;
  timeoutID = setTimeout(() => {
    document.querySelector('#troop_confirm_go').click();
  }, ms);
};

const handleCancel = () => {
  document.querySelector('#' + START_BUTTON_ID).disabled = false;
  document.querySelector('#' + CANCEL_BUTTON_ID).disabled = true;
  clearTimeout(timeoutID);
};

const render = () => {
  const container = document.createElement('div');
  const label = document.createElement('label');
  label.innerHTML = 'Czas dotarcia ataku:';
  label.style.marginRight = '15px';
  container.appendChild(label);
  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.step = '.001';
  input.value = getInputInitialValue();
  input.id = INPUT_ID;
  container.append(input);
  const buttonContainer = document.createElement('div');
  container.appendChild(buttonContainer);
  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'OK';
  submitButton.addEventListener('click', handleStart);
  submitButton.id = START_BUTTON_ID;
  submitButton.type = 'button';
  buttonContainer.appendChild(submitButton);
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.disabled = true;
  cancelButton.id = CANCEL_BUTTON_ID;
  cancelButton.type = 'button';
  cancelButton.addEventListener('click', handleCancel);
  buttonContainer.appendChild(cancelButton);
  document.querySelector('.vis').appendChild(container);
};

(function () {
  render();
})();
},{}]},{},["tYTs"], null)