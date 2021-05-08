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
})({"VYL5":[function(require,module,exports) {
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
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"umce":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMilliseconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var timestamp = (0, _index2.default)(dirtyDate).getTime();
  var amount = (0, _index.default)(dirtyAmount);
  return new Date(timestamp + amount);
}
},{"../_lib/toInteger/index.js":"VYL5","../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"pfh4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMinutes;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */

function addMinutes(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}
},{"../_lib/toInteger/index.js":"VYL5","../addMilliseconds/index.js":"umce","../_lib/requiredArgs/index.js":"kK6Q"}],"ddIN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    possibleLoyalty: 'Prawdopodobne poparcie',
    canSendNoble: 'Można wysłać szlachcica',
    yes: 'Tak',
    no: 'Nie'
  },
  en_DK: {
    ennobledAt: 'Ennobled at',
    never: 'Never',
    possibleLoyalty: 'Possible loyalty',
    canSendNoble: 'Can send noble',
    yes: 'Yes',
    no: 'No'
  },
  de_DE: {
    ennobledAt: 'Adelung bei',
    never: 'Nie',
    possibleLoyalty: 'Mögliche Zustimmung',
    canSendNoble: 'Kann Adelsgeschlecht senden',
    yes: 'Ja',
    no: 'Nein'
  }
};

var _default = () => translations[window.game_data.locale] || translations.en_DK;

exports.default = _default;
},{}],"Ph2E":[function(require,module,exports) {
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
},{}],"ZbyX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = exports.inUTC = exports.inTZ = void 0;

const inTZ = function inTZ() {
  let d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  let tz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTC';
  return new Date(new Date(d).toLocaleString('en-US', {
    timeZone: tz
  }));
};

exports.inTZ = inTZ;

const inUTC = function inUTC() {
  let d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return inTZ(d);
};

exports.inUTC = inUTC;

const formatDate = (date, options) => {
  return new Date(date).toLocaleDateString(undefined, options ? options : {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

exports.formatDate = formatDate;
},{}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"XOOL":[function(require,module,exports) {
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
},{}],"fHHP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildImgURL = exports.calcAttackDuration = exports.buildVillageName = exports.buildVillageURL = exports.buildPlayerURL = exports.buildTribeURL = void 0;

const buildTribeURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_ally',
    id
  });
};

exports.buildTribeURL = buildTribeURL;

const buildPlayerURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_player',
    id
  });
};

exports.buildPlayerURL = buildPlayerURL;

const buildVillageURL = id => {
  return window.location.origin + TribalWars.buildURL('', {
    screen: 'info_village',
    id
  });
};

exports.buildVillageURL = buildVillageURL;

const buildVillageName = function buildVillageName() {
  let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  const continent = 'K' + String(y)[0] + String(x)[0];
  return "".concat(n, " (").concat(x, "|").concat(y, ") ").concat(continent);
};

exports.buildVillageName = buildVillageName;

const calcAttackDuration = (distance, baseSpeed) => {
  return Math.round(distance * baseSpeed);
};

exports.calcAttackDuration = calcAttackDuration;

const buildImgURL = img => {
  return image_base + img;
};

exports.buildImgURL = buildImgURL;
},{}],"KX6P":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tribalwars = require("./tribalwars");

var _default = unit => {
  return (0, _tribalwars.buildImgURL)("unit/unit_".concat(unit, ".png"));
};

exports.default = _default;
},{"./tribalwars":"fHHP"}],"KWxH":[function(require,module,exports) {
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
},{}],"H70G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMilliseconds;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}
},{"../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"oGJj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMinutes;

var _index = _interopRequireDefault(require("../differenceInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are from 10:01:59 to 10:00:00
 * var result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */

function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
},{"../differenceInMilliseconds/index.js":"H70G","../_lib/requiredArgs/index.js":"kK6Q"}],"kcC2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _differenceInMinutes = _interopRequireDefault(require("date-fns/differenceInMinutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const calcLoyalty = (ennobledAt, speed) => {
  let loyalty = 25 + Math.abs((0, _differenceInMinutes.default)(ennobledAt, new Date())) * (speed / 60);

  if (loyalty > 100) {
    loyalty = 100;
  }

  return Math.floor(loyalty);
};

var _default = calcLoyalty;
exports.default = _default;
},{"date-fns/differenceInMinutes":"oGJj"}],"HdqX":[function(require,module,exports) {
"use strict";

var _addMinutes = _interopRequireDefault(require("date-fns/addMinutes"));

var _extendedMapPopup = _interopRequireDefault(require("./i18n/extendedMapPopup"));

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _date = require("./utils/date");

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _math = require("./utils/math");

var _buildUnitImgURL = _interopRequireDefault(require("./utils/buildUnitImgURL"));

var _localStorage = require("./utils/localStorage");

var _tribalwars = require("./utils/tribalwars");

var _calcLoyalty = _interopRequireDefault(require("./utils/calcLoyalty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Extended map popup
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @version      0.6.7
// @description  Extended map popup
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const CURR_SERVER_CONFIG = "\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n                speed\n                unitSpeed\n                snob {\n                  maxDist\n                }\n            }\n            unitConfig {\n              spear {\n                speed\n              }\n              sword {\n                speed\n              }\n              axe {\n                speed\n              }\n              archer {\n                speed\n              }\n              spy {\n                speed\n              }\n              light {\n                speed\n              }\n              marcher {\n                speed\n              }\n              heavy {\n                speed\n              }\n              ram {\n                speed\n              }\n              catapult {\n                speed\n              }\n              knight {\n                speed\n              }\n              snob {\n                speed\n              }\n            }\n        }\n    }\n";
const LAST_VILLAGE_CONQUER_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {\n        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n";
const SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_map_popup_server_cfg';
const translations = (0, _extendedMapPopup.default)();

const loadConfigFromLocalStorage = () => {
  return (0, _localStorage.getItem)(SERVER_CONFIG_LOCAL_STORAGE_KEY);
};

const cacheServerConfig = function cacheServerConfig() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};

const isConfigExpired = date => {
  return Math.abs(date.getTime() - new Date().getTime()) > 1000 * 60 * 60 * 24;
};

const loadConfig = async () => {
  let data = loadConfigFromLocalStorage();

  if (!data || !data.server || isConfigExpired(new Date(data.loadedAt)) || !data.server.config || !data.server.config.speed || !data.server.config.snob || !data.server.config.snob.maxDist || !data.server.config.unitSpeed || !data.server.unitConfig) {
    data = await (0, _requestCreator.default)({
      query: CURR_SERVER_CONFIG,
      variables: {
        key: SERVER
      }
    });
    data.loadedAt = new Date();
    cacheServerConfig(data);
  }

  return data && data.server && data.server.config ? {
    config: data.server.config,
    unitConfig: data.server.unitConfig
  } : {};
};

const loadVillageData = async function loadVillageData(id) {
  let {
    cacheOnly = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) {
    return TWMap.popup.extendedMapPopupCache[id];
  }

  try {
    const data = await (0, _requestCreator.default)({
      query: LAST_VILLAGE_CONQUER_QUERY,
      variables: {
        server: SERVER,
        sort: ['ennobledAt DESC'],
        filter: {
          villageID: [id]
        },
        limit: 1
      }
    });
    TWMap.popup.extendedMapPopupCache[id] = data;
    return data;
  } catch (error) {
    console.log('loadVillageData', error);
  }
};

const getAvailableUnits = function getAvailableUnits() {
  let unitCfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const units = [];

  for (let unit in unitCfg) {
    if (unitCfg[unit].speed !== 0) {
      units.push(_objectSpread(_objectSpread({}, unitCfg[unit]), {}, {
        name: unit,
        img: (0, _buildUnitImgURL.default)(unit)
      }));
    }
  }

  return units;
};

const getUnitTdBgColor = index => index % 2 === 0 ? '#f8f4e8' : '#ded3b9;';

const buildUnitHeader = (unit, index) => {
  return "\n    <td style=\"padding: 2px; background-color: ".concat(getUnitTdBgColor(index), ";\">\n      <img\n        src=\"").concat(unit.img, "\"\n        title=\"").concat(unit.name, "\"\n        alt=\"").concat(unit.name, "\"\n      />\n    </td>\n  ");
};

const buildUnitArrivalInfo = (t, index) => {
  return "\n    <td style=\"padding: 2px; background-color: ".concat(getUnitTdBgColor(index), ";\">\n      ").concat((0, _date.formatDate)((0, _addMinutes.default)(Timing.getCurrentServerTime(), t)), "\n    </td>\n  ");
};

const renderAdditionalInfo = (id, data, _ref) => {
  let {
    config,
    unitConfig
  } = _ref;
  const coords = TWMap.CoordByXY(TWMap.villageKey[id]);
  const distance = (0, _math.calcDistanceBetweenTwoPoints)(coords[0], coords[1], window.game_data.village.x, window.game_data.village.y);
  const ennoblement = data && data.ennoblements && data.ennoblements.items && data.ennoblements.items.length > 0 ? data.ennoblements.items[0] : undefined;
  const parent = document.querySelector('#map_popup #info_content tbody');
  let unitsEl = parent.querySelector('#units');

  if (!unitsEl) {
    unitsEl = document.createElement('tr');
    unitsEl.id = 'units';
    parent.appendChild(unitsEl);
  }

  const units = getAvailableUnits(unitConfig);
  unitsEl.innerHTML = "\n          <td colspan=\"2\">\n            <table style=\"border: 1px solid #ded3b9; max-width: 450px;\"\n              width=\"100%\"\n              cellpadding=\"0\"\n              cellspacing=\"0\">\n              <tbody>\n                <tr class=\"center\">\n                  ".concat(units.map(buildUnitHeader).join(''), "\n                </tr>\n                <tr class=\"center\">\n                  ").concat(units.map((unit, index) => {
    return buildUnitArrivalInfo((0, _tribalwars.calcAttackDuration)(distance, unit.speed), index);
  }).join(''), "\n                </tr>\n              </tbody>\n            </table>\n          </td>\n      ");
  let lastEnnobledAt = parent.querySelector('#lastEnnobledAt');

  if (!lastEnnobledAt) {
    lastEnnobledAt = document.createElement('tr');
    lastEnnobledAt.id = 'lastEnnobledAt';
    parent.appendChild(lastEnnobledAt);
  }

  lastEnnobledAt.innerHTML = "\n          <td>\n              ".concat(translations.ennobledAt, ":\n          </td>\n          <td>\n              ").concat(ennoblement ? (0, _date.formatDate)(ennoblement.ennobledAt) : translations.never, "\n          </td>\n      ");
  let loyalty = parent.querySelector('#loyalty');

  if (!loyalty) {
    loyalty = document.createElement('tr');
    loyalty.id = 'loyalty';
    parent.appendChild(loyalty);
  }

  loyalty.innerHTML = "\n          <td>\n              ".concat(translations.possibleLoyalty, ":\n          </td>\n          <td>\n              ").concat(ennoblement ? (0, _calcLoyalty.default)(new Date(ennoblement.ennobledAt), config.speed) : 100, "\n          </td>\n      ");
  let canSendNoble = parent.querySelector('#canSendNoble');

  if (!canSendNoble) {
    canSendNoble = document.createElement('tr');
    canSendNoble.id = 'canSendNoble';
    parent.appendChild(canSendNoble);
  }

  canSendNoble.innerHTML = "\n          <td>\n              ".concat(translations.canSendNoble, ":\n          </td>\n          <td>\n              ").concat(distance < config.snob.maxDist ? translations.yes : translations.no, "\n          </td>\n      ");
};

const createLoadVillageHandler = cfg => async e => {
  TWMap.popup._loadVillage(e);

  const data = await loadVillageData(parseInt(e));
  renderAdditionalInfo(parseInt(e), data, cfg);
};

const createDisplayForVillageHandler = cfg => async (e, a, t) => {
  TWMap.popup._displayForVillage(e, a, t);

  const data = await loadVillageData(parseInt(e.id), {
    cacheOnly: window.game_data.features.Premium.active
  });
  renderAdditionalInfo(parseInt(e.id), data, cfg);
};

(async function () {
  try {
    const configs = await loadConfig();
    TWMap.popup.extendedMapPopupCache = {};
    TWMap.popup._loadVillage = TWMap.popup.loadVillage;
    TWMap.popup.loadVillage = createLoadVillageHandler(configs);
    TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
    TWMap.popup.displayForVillage = createDisplayForVillageHandler(configs);
  } catch (error) {
    console.log('extended map popup', error);
  }
})();
},{"date-fns/addMinutes":"pfh4","./i18n/extendedMapPopup":"ddIN","./libs/requestCreator":"Ph2E","./utils/date":"ZbyX","./utils/getCurrentServer":"DMkL","./utils/math":"XOOL","./utils/buildUnitImgURL":"KX6P","./utils/localStorage":"KWxH","./utils/tribalwars":"fHHP","./utils/calcLoyalty":"kcC2"}]},{},["HdqX"], null)