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
})({"kK6Q":[function(require,module,exports) {
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
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"aFbL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimezoneOffsetInMilliseconds;
var MILLISECONDS_IN_MINUTE = 60000;

function getDateMillisecondsPart(date) {
  return date.getTime() % MILLISECONDS_IN_MINUTE;
}
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */


function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
  date.setSeconds(0, 0);
  var hasNegativeUTCOffset = baseTimezoneOffset > 0;
  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
}
},{}],"DgmM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDay;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"ieRm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarDays;

var _index = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../startOfDay/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var startOfDayLeft = (0, _index2.default)(dirtyDateLeft);
  var startOfDayRight = (0, _index2.default)(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0, _index.default)(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0, _index.default)(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":"aFbL","../startOfDay/index.js":"DgmM","../_lib/requiredArgs/index.js":"kK6Q"}],"mdVI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInDays;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * var result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = compareLocalAsc(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}
},{"../toDate/index.js":"KYJg","../differenceInCalendarDays/index.js":"ieRm","../_lib/requiredArgs/index.js":"kK6Q"}],"iFDG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    date: 'Data',
    createdAt: 'Data założenia',
    dominance: 'Dominacja',
    bestRank: 'Najlepszy ranking',
    mostPoints: 'Najwięcej punktów',
    mostVillages: 'Najwięcej wiosek',
    player: 'Gracz',
    points: 'Punkty',
    villages: 'Wioski',
    opponentsDefeated: 'Pokonani przeciwnicy',
    opponentsDefeatedAsAttacker: 'Pokonani przeciwnicy jako agresor',
    opponentsDefeatedAsDefender: 'Pokonani przeciwnicy jako obrońca',
    opponentsDefeatedAsSupporter: 'Pokonani przeciwnicy jako wspierający',
    change: 'Zmień',
    left: 'Opuścił',
    joined: 'Dołączył',
    tribeChanges: 'Zmiany plemion',
    membersGrowth: 'Rozwój graczy',
    act: 'Akcja',
    total: 'Razem',
    oda: 'RA',
    odd: 'RO',
    ods: 'RW',
    od: 'Pokonani ogólnie',
    dailyGrowth: 'Dzienny przyrost',
    playerLinks: 'Linki',
    action: {
      linkToTWHelp: 'Akta plemienia - TWHelp - nowa strona ze statystykami i narzędziami',
      showTribeChanges: 'Pokaż zmiany plemion',
      showEnnoblements: 'Pokaż przejęcia',
      showMembersGrowth: 'Pokaż rozwój graczy',
      showHistory: 'Pokaż historię',
      generateMailingList: 'Wygeneruj listę mailingową',
      exportVillages: 'Wyeksportuj wioski'
    }
  },
  en_DK: {
    date: 'Date',
    createdAt: 'Created at',
    dominance: 'Dominance',
    bestRank: 'Best rank',
    mostPoints: 'Most points',
    mostVillages: 'Most villages',
    player: 'Player',
    points: 'Points',
    villages: 'Villages',
    opponentsDefeated: 'Opponents defeated',
    opponentsDefeatedAsAttacker: 'Opponents defeated as attacker',
    opponentsDefeatedAsDefender: 'Opponents defeated as defender',
    opponentsDefeatedAsSupporter: 'Opponents defeated as supporter',
    change: 'Change',
    membersGrowth: 'Members growth',
    tribeChanges: 'Tribe changes',
    left: 'Left',
    joined: 'Joined',
    act: 'Action',
    total: 'Total',
    oda: 'ODA',
    odd: 'ODD',
    ods: 'ODS',
    od: 'OD',
    dailyGrowth: 'Daily growth',
    playerLinks: 'Player links',
    action: {
      linkToTWHelp: 'Tribal file (external link) - TWHelp - A new stat tracking website.',
      showTribeChanges: 'Show tribe changes',
      showEnnoblements: 'Show ennoblements',
      showMembersGrowth: 'Show members growth',
      showHistory: 'Show history',
      generateMailingList: 'Generate mailing list',
      exportVillages: 'Export villages'
    }
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
},{"../i18n/renderTodaysStats":"l9PO","../utils/isNil":"yQib"}],"tKRp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    date: 'Data',
    newOwner: 'Nowy właściciel',
    oldOwner: 'Poprzedni właściciel',
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
},{}],"chDM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.POPUP_SELECTOR = void 0;
const POPUP_WRAPPER_SELECTOR = '.popup_helper';
const POPUP_SELECTOR = '#inline_popup';
exports.POPUP_SELECTOR = POPUP_SELECTOR;

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
},{}],"vNT1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _showEnnoblementsPopup = _interopRequireDefault(require("../i18n/showEnnoblementsPopup"));

var _pagination = require("../utils/pagination");

var _showPopup = _interopRequireDefault(require("../utils/showPopup"));

var _formatDate = _interopRequireDefault(require("../utils/formatDate"));

var twutils = _interopRequireWildcard(require("../utils/tribalwars"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
const translations = (0, _showEnnoblementsPopup.default)();

const getPlayerTd = (player, tribe) => {
  if (player) {
    return "<td><a href=\"".concat(twutils.buildPlayerURL(player.id), "\">").concat(player.name, " (").concat(tribe ? "<a href=\"".concat(twutils.buildTribeURL(tribe.id), "\">").concat(tribe.tag, "</a>") : '-', ")</a></td>");
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
      rowHTML += "<td><a href=\"".concat(twutils.buildVillageURL(ennoblement.village.id), "\">").concat(twutils.buildVillageName(ennoblement.village.name, ennoblement.village.x, ennoblement.village.y), "</a></td>");
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
},{}],"lQIY":[function(require,module,exports) {
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

var twutils = _interopRequireWildcard(require("../utils/tribalwars"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      rowHTML += "<td><a href=\"".concat(twutils.buildTribeURL(history.tribe.id), "\">").concat(history.tribe.tag, "</a></td>");
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
},{"date-fns/subDays":"mRRL","../i18n/showHistoryPopup":"hNDe","../utils/showPopup":"chDM","../utils/pagination":"fCHX","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"tQUs":[function(require,module,exports) {
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
},{}],"J1Ly":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return server.substr(0, 2);
};

exports.default = _default;
},{}],"Syko":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPlayerURL = void 0;

const buildPlayerURL = function buildPlayerURL() {
  let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "http://www.twstats.com/in/".concat(server, "/player/").concat(id);
};

exports.buildPlayerURL = buildPlayerURL;
},{}],"gvXE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildVillageURL = exports.buildTribeURL = exports.buildPlayerURL = exports.buildURLToProfile = exports.buildURLToServerPage = exports.BASE_URL = void 0;
const BASE_URL = 'tribalwarshelp.com';
exports.BASE_URL = BASE_URL;

const buildURLToServerPage = function buildURLToServerPage() {
  let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "https://".concat(version, ".").concat(BASE_URL, "/server/").concat(server);
};

exports.buildURLToServerPage = buildURLToServerPage;

const buildURLToProfile = function buildURLToProfile() {
  let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let entity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return "".concat(buildURLToServerPage(version, server), "/").concat(entity, "/").concat(id);
};

exports.buildURLToProfile = buildURLToProfile;

const buildPlayerURL = function buildPlayerURL() {
  let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return buildURLToProfile(version, server, id, 'player');
};

exports.buildPlayerURL = buildPlayerURL;

const buildTribeURL = function buildTribeURL() {
  let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return buildURLToProfile(version, server, id, 'tribe');
};

exports.buildTribeURL = buildTribeURL;

const buildVillageURL = function buildVillageURL() {
  let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return buildURLToProfile(version, server, id, 'village');
};

exports.buildVillageURL = buildVillageURL;
},{}],"r4nF":[function(require,module,exports) {
"use strict";

var _differenceInDays = _interopRequireDefault(require("date-fns/differenceInDays"));

var _extendedTribeProfile = _interopRequireDefault(require("./i18n/extendedTribeProfile"));

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _pagination = require("./utils/pagination");

var _renderTodaysStats = _interopRequireDefault(require("./common/renderTodaysStats"));

var _showEnnoblementsPopup = _interopRequireDefault(require("./common/showEnnoblementsPopup"));

var _showHistoryPopup = _interopRequireDefault(require("./common/showHistoryPopup"));

var _showPopup = _interopRequireDefault(require("./utils/showPopup"));

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _localStorage = require("./utils/localStorage");

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _getServerVersionCode = _interopRequireDefault(require("./utils/getServerVersionCode"));

var twstatsutils = _interopRequireWildcard(require("./utils/twstats"));

var twhelputils = _interopRequireWildcard(require("./utils/twhelp"));

var twutils = _interopRequireWildcard(require("./utils/tribalwars"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Extended tribe profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      1.1.0
// @description  Extended tribe profile
// @author       Kichiyaki https://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const VERSION = (0, _getServerVersionCode.default)(SERVER);
const TRIBE_ID = (0, _getIDFromURL.default)(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = "\n    query tribe($server: String!, $id: Int!, $dailyTribeStatsSort: [String!], $dailyTribeStatsLimit: Int, $playerSort: [String!], $playerFilter: PlayerFilter!, $dailyTribeStatsFilter: DailyTribeStatsFilter!) {\n        tribe(server: $server, id: $id) {\n            id\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            createdAt\n            dominance\n        }\n        dailyTribeStats(server: $server, limit: $dailyTribeStatsLimit, sort: $dailyTribeStatsSort, filter: $dailyTribeStatsFilter) {\n          items {\n            rank\n            rankAtt\n            rankDef\n            rankTotal\n            points\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreTotal\n            villages\n            members\n          }\n        }\n        players(server: $server, sort: $playerSort, filter: $playerFilter) {\n          items {\n            id\n            rankAtt\n            rankDef\n            rankSup\n            rankTotal\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreSup\n            scoreTotal\n            dailyGrowth\n          }\n        }\n    }\n";
const ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
const ENNOBLEMENTS_PER_PAGE = 15;
const TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY = "\nquery tribeHistoryAndTribeDailyStats($server: String!,\n     $tribeHistoryFilter: TribeHistoryFilter!,\n     $dailyTribeStatsFilter: DailyTribeStatsFilter!,\n     $sort: [String!],\n     $offset: Int,\n     $limit: Int) {\n  tribeHistory(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $tribeHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreTotal\n      rankTotal\n      createDate\n      totalMembers\n    }\n  }\n  dailyTribeStats(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $dailyTribeStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        createDate\n        members\n      }\n    }\n}\n";
const TRIBE_HISTORY_PER_PAGE = 15;
const TRIBE_MEMBERS_DAILY_STATS_QUERY = "\nquery tribeMembersDailyStats($server: String!,\n     $filter: DailyPlayerStatsFilter!,\n     $limit: Int,\n     $sort: [String!]) {\n  dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n    items {\n        player {\n          id\n          name\n        }\n        points\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";
let MEMBERS_GROWTH_MODE = 'points';
const TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          player {\n            id\n            name\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
const TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const TRIBE_CHANGES_PER_PAGE = 15;
const profileInfoTBody = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody');
const actionContainer = profileInfoTBody;
const otherElementsContainer = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)');
const membersContainer = document.querySelector('#content_value > table.vis > tbody');
const translations = (0, _extendedTribeProfile.default)();

const loadDataFromCache = () => {
  return (0, _localStorage.getItem)(LOCAL_STORAGE_KEY);
};

const cacheTribeData = function cacheTribeData() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, data);
};

const getMemberIDs = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');

    if (href.includes('info_player')) {
      ids.push((0, _getIDFromURL.default)(href));
    }
  });
  return ids;
};

const getMemberNames = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href').includes('info_player')) {
      ids.push(a.innerText.trim());
    }
  });
  return ids;
};

const loadData = async () => {
  const memberIDs = getMemberIDs();
  const data = await (0, _requestCreator.default)({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
      dailyTribeStatsSort: ['createDate DESC'],
      dailyTibeStatsLimit: 1,
      dailyTribeStatsFilter: {
        tribeID: [TRIBE_ID]
      },
      playerSort: ['rank ASC'],
      playerFilter: {
        id: memberIDs
      }
    }
  });
  cacheTribeData(data);
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

const extendMembersData = players => {
  membersContainer.parentElement.style.width = '100%';
  const heading = membersContainer.querySelector('tr:first-child');

  if (heading.children.length !== 11) {
    [translations.oda, translations.odd, translations.ods, translations.od, translations.dailyGrowth, translations.playerLinks].forEach(v => {
      const th = document.createElement('th');
      th.innerHTML = v;
      heading.appendChild(th);
    });
  }

  membersContainer.querySelectorAll('tr').forEach(tr => {
    const a = tr.querySelector('a');

    if (!a) {
      return;
    }

    const playerID = (0, _getIDFromURL.default)(a.getAttribute('href'));
    const player = players.items.find(p => p.id === playerID);

    if (player) {
      [[player.scoreAtt, player.rankAtt], [player.scoreDef, player.rankDef], [player.scoreSup, player.rankSup], [player.scoreTotal, player.rankTotal], player.dailyGrowth, [{
        link: twhelputils.buildPlayerURL(VERSION, SERVER, player.id),
        label: 'TWHelp'
      }, {
        link: twstatsutils.buildPlayerURL(SERVER, player.id),
        label: 'TWStats'
      }]].forEach((data, index) => {
        let td = tr.children[5 + index];

        if (!td) {
          td = document.createElement('td');
          tr.appendChild(td);
        }

        if (Array.isArray(data)) {
          if (typeof data[0] === 'number') {
            td.innerHTML = "".concat(data[0].toLocaleString(), " (<strong>").concat(data[1], "</strong>)");
          } else if (data[0].link) {
            td.innerHTML = data.map((_ref2) => {
              let {
                link,
                label
              } = _ref2;
              return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(link, "\">").concat(label, "</a>");
            }).join('<br>');
          }
        } else if (typeof data === 'number') {
          td.innerHTML = data.toLocaleString();
        }
      });
    }
  });
};

const render = (_ref3) => {
  let {
    tribe,
    dailyTribeStats,
    players
  } = _ref3;
  [{
    title: translations.createdAt + ':',
    data: (0, _formatDate.default)(tribe.createdAt),
    id: 'created_at'
  }, {
    title: translations.dominance + ':',
    data: tribe.dominance.toFixed(2) + '%',
    id: 'dominance'
  }, {
    title: translations.bestRank + ':',
    data: tribe.bestRank + ' ' + "(".concat((0, _formatDate.default)(tribe.bestRankAt), ")"),
    id: 'best_rank'
  }, {
    title: translations.mostPoints + ':',
    data: tribe.mostPoints.toLocaleString() + ' ' + "(".concat((0, _formatDate.default)(tribe.mostPointsAt), ")"),
    id: 'most_points'
  }, {
    title: translations.mostVillages + ':',
    data: tribe.mostVillages + ' ' + "(".concat((0, _formatDate.default)(tribe.mostVillagesAt), ")"),
    id: 'most_villages'
  }].forEach(data => {
    renderTr(data);
  });

  if (dailyTribeStats && dailyTribeStats.items.length > 0) {
    (0, _renderTodaysStats.default)(otherElementsContainer, dailyTribeStats.items[0]);
  }

  if (players && players.items.length > 0) {
    extendMembersData(players);
  }
};

const handleShowTribeEnnoblementsClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    const data = await (0, _requestCreator.default)({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          or: {
            oldOwnerTribeID: [TRIBE_ID],
            newOwnerTribeID: [TRIBE_ID]
          }
        },
        offset: ENNOBLEMENTS_PER_PAGE * (page - 1),
        limit: ENNOBLEMENTS_PER_PAGE,
        sort: ['ennobledAt DESC'],
        server: SERVER
      }
    });
    (0, _showEnnoblementsPopup.default)(e, data.ennoblements, {
      currentPage: page,
      limit: ENNOBLEMENTS_PER_PAGE,
      onPageChange: handleShowTribeEnnoblementsClick
    });
  }
};

const handleShowTribeHistoryClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    try {
      const filter = {
        tribeID: [TRIBE_ID]
      };
      const {
        tribeHistory,
        dailyTribeStats
      } = await (0, _requestCreator.default)({
        query: TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
        variables: {
          server: SERVER,
          offset: TRIBE_HISTORY_PER_PAGE * (page - 1),
          limit: TRIBE_HISTORY_PER_PAGE,
          sort: ['createDate DESC'],
          tribeHistoryFilter: filter,
          dailyTribeStatsFilter: filter
        }
      });
      (0, _showHistoryPopup.default)(e, tribeHistory, dailyTribeStats, {
        currentPage: page,
        limit: TRIBE_HISTORY_PER_PAGE,
        tribe: true,
        onPageChange: handleShowTribeHistoryClick
      });
    } catch (error) {
      console.log('cannot load tribe history', error);
    }
  }
};

const getMembersGrowthTdStyle = value => {
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  const defaultStyle = 'color: #000; background-color: #808080';
  return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
};

const mapMembersGrowthTdValue = i => {
  switch (MEMBERS_GROWTH_MODE) {
    case 'points':
      return i.points;

    case 'villages':
      return i.villages;

    case 'od':
      return i.scoreTotal;

    case 'oda':
      return i.scoreAtt;

    case 'odd':
      return i.scoreDef;

    case 'ods':
      return i.scoreSup;

    default:
      return 0;
  }
};

const buildMembersGrowthTBody = stats => {
  const dates = [...new Set(stats.items.map(item => item.createDate))].reverse();
  return "\n    <tbody>\n        <tr>\n          <th>".concat(translations.player, "</th>\n          ").concat(dates.map(date => {
    return "<th>".concat((0, _formatDate.default)(date, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }), "</th>");
  }).join(''), "\n          <th>").concat(translations.total, "</th>\n        </tr>\n        ").concat(getMemberIDs().map(id => {
    const filtered = stats.items.filter(item => item.player && item.player.id === id).reverse();
    let player = undefined;

    if (filtered.length > 0) {
      player = filtered[0].player;
    }

    const tds = [];
    let total = 0;

    for (let date of dates) {
      const i = filtered.find(i => i.createDate === date);
      let val = 0;

      if (i) {
        val = mapMembersGrowthTdValue(i);
      }

      total += val;
      tds.push("<td style=\"".concat(getMembersGrowthTdStyle(val), "\">").concat(val.toLocaleString(), "</td>"));
    }

    return "<tr>\n            <td>\n              ".concat(player ? "<a href=\"".concat(twutils.buildPlayerURL(id), "\">").concat(player.name, "</a>") : '-', "\n            </td>\n            ").concat(tds.join(''), "\n            <td style=\"").concat(getMembersGrowthTdStyle(total), "\"><strong>").concat(total.toLocaleString(), "</strong></td>\n          </tr>");
  }).join(''), "\n      </tbody>\n  ");
};

const MEMBERS_GROWTH_TABLE_ID = 'membersGrowth';
const MEMBERS_GROWTH_FORM = MEMBERS_GROWTH_TABLE_ID + 'Form';

const createChangeTypeHandler = stats => e => {
  e.preventDefault();
  MEMBERS_GROWTH_MODE = e.target[0].value;
  document.querySelector('#' + MEMBERS_GROWTH_TABLE_ID).innerHTML = buildMembersGrowthTBody(stats);
};

const renderMembersGrowthPopup = (e, stats) => {
  const formOptions = [['points', translations.points], ['villages', translations.villages], ['od', translations.opponentsDefeated], ['oda', translations.opponentsDefeatedAsAttacker], ['odd', translations.opponentsDefeatedAsDefender], ['ods', translations.opponentsDefeatedAsSupporter]].map(v => "<option ".concat(MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : '', " value=\"").concat(v[0], "\">").concat(v[1], "</option>"));
  const html = "\n    <form id=\"".concat(MEMBERS_GROWTH_FORM, "\">\n      <select>\n        ").concat(formOptions.join(''), "\n      </select>\n      <button type=\"submit\">").concat(translations.change, "</button>\n    </form>\n    <table id=\"").concat(MEMBERS_GROWTH_TABLE_ID, "\" class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      ").concat(buildMembersGrowthTBody(stats), "\n    </table>\n  ");
  (0, _showPopup.default)({
    e,
    title: translations.membersGrowth,
    id: 'mg',
    html
  });
  document.querySelector('#' + MEMBERS_GROWTH_FORM).addEventListener('submit', createChangeTypeHandler(stats));
};

const loadMembersGrowthData = async function loadMembersGrowthData() {
  let {
    createDateLTE,
    createDateGT
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const memberIDs = getMemberIDs();
  const limit = memberIDs.length * (0, _differenceInDays.default)(createDateLTE, createDateGT);
  const filter = {
    playerID: memberIDs,
    createDateLTE,
    createDateGT
  };
  const data = await (0, _requestCreator.default)({
    query: TRIBE_MEMBERS_DAILY_STATS_QUERY,
    variables: {
      filter,
      limit,
      sort: ['createDate DESC'],
      server: SERVER
    }
  });
  return data;
};

const handleShowMembersGrowthClick = async e => {
  e.preventDefault();
  const createDateGT = new Date();
  createDateGT.setDate(createDateGT.getDate() - 7);
  const data = await loadMembersGrowthData({
    createDateLTE: new Date(),
    createDateGT
  });
  renderMembersGrowthPopup(e, data.dailyPlayerStats);
};

const renderTribeChanges = (e, currentPage, tribeChanges) => {
  const paginationItems = (0, _pagination.generatePaginationItems)({
    total: tribeChanges.total,
    limit: TRIBE_CHANGES_PER_PAGE,
    currentPage
  });
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat(translations.date, "\n          </th>\n          <th>\n            ").concat(translations.player, "\n          </th>\n          <th>\n            ").concat(translations.act, "\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
    let rowHTML = '<tr>' + "<td>".concat((0, _formatDate.default)(tribeChange.createdAt), "</td>");

    if (tribeChange.player) {
      rowHTML += "<td><a href=\"".concat(twutils.buildPlayerURL(tribeChange.player.id), "\">").concat(tribeChange.player.name, "</a></td>");
    } else {
      rowHTML += '<td>-</td>';
    }

    rowHTML += "<td><strong>".concat(tribeChange.newTribe && tribeChange.newTribe.id === TRIBE_ID ? translations.joined : translations.left, "</strong></td>");
    return rowHTML + '</tr>';
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _showPopup.default)({
    e,
    title: translations.tribeChanges,
    id: 'tribeChanges',
    html
  });
  document.querySelectorAll('#' + TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', handleShowTribeChangesClick);
  });
};

const handleShowTribeChangesClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    const data = await (0, _requestCreator.default)({
      query: TRIBE_CHANGES_QUERY,
      variables: {
        filter: {
          or: {
            oldTribeID: [TRIBE_ID],
            newTribeID: [TRIBE_ID]
          }
        },
        offset: TRIBE_CHANGES_PER_PAGE * (page - 1),
        limit: TRIBE_CHANGES_PER_PAGE,
        sort: ['createdAt DESC'],
        server: SERVER
      }
    });
    renderTribeChanges(e, page, data.tribeChanges);
  }
};

const handleGenerateMailingListClick = e => {
  e.preventDefault();
  const members = getMemberNames();
  const chunks = [];

  for (let i = 0; i < members.length; i += 50) {
    chunks.push(members.slice(i, i + 50));
  }

  let html = '';
  chunks.forEach((names, index) => {
    html += "<h3 style=\"margin-bottom: 5px;\">".concat(index + 1, ".</h3>\n    <textarea cols=30 rows=8 readonly style=\"margin-bottom: 15px;\">").concat(names.join(';'), "</textarea>");
  });
  Dialog.show('mailinglist', html);
};

const loadVillages = async function loadVillages(variables) {
  let total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  try {
    const data = await (0, _requestCreator.default)({
      variables,
      query: "\n        query villages($server: String!, $sort: [String!], $limit: Int, $offset: Int, $filter: VillageFilter!) {\n          villages(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $filter) {\n            ".concat(total ? 'total' : '', "\n            items {\n              id\n              x\n              y\n            }\n          }\n        }\n      ")
    });

    if (data && data.villages && Array.isArray(data.villages.items)) {
      return data.villages;
    }
  } catch (error) {
    console.log('load villages', error);
  }

  return {
    total: 0,
    items: []
  };
};

const showLoadingDialog = function showLoadingDialog() {
  let current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!current || !total) {
    return Dialog.show('loading', '<strong>Loading...</strong>');
  }

  return Dialog.show('loading', "Loaded: <strong>".concat(current, "</strong>/<strong>").concat(total, "</strong>"));
};

const handleExportTribeVillagesFormSubmit = async e => {
  e.preventDefault();
  let limit = parseInt(e.target[4].value);
  const variables = {
    filter: {
      xLTE: parseInt(e.target[0].value),
      xGTE: parseInt(e.target[1].value),
      yLTE: parseInt(e.target[2].value),
      yGTE: parseInt(e.target[3].value),
      playerID: getMemberIDs()
    },
    limit: isNaN(limit) || !limit ? 0 : limit,
    sort: ['id ASC'],
    server: SERVER
  };
  showLoadingDialog();
  let {
    total,
    items
  } = await loadVillages(variables, true);
  const length = items.length;

  if (limit !== 0 && limit < total) {
    total = limit;
  }

  if (isNaN(limit) || !limit || limit > length) {
    for (let offset = length; offset < total; offset += length) {
      showLoadingDialog(offset, total);
      const more = await loadVillages(_objectSpread(_objectSpread({}, variables), {}, {
        filter: _objectSpread({}, variables.filter),
        offset
      }));
      items = [...items, ...more.items];
    }
  }

  Dialog.show('exportTribeVillages', "\n    <textarea cols=60 rows=8 readonly>".concat(items.map(item => "".concat(item.x, "|").concat(item.y)).join(' '), "</textarea>\n  "));
};

const handleExportTribeVillagesClick = e => {
  e.preventDefault();
  const FORM_ID = 'etvForm';
  const html = "\n    <div style=\"display: flex; align-items: center; justify-content: center;\">\n      <form id=\"".concat(FORM_ID, "\">\n        <div>\n          <label>X <= </label>\n          <input type=\"number\" min=\"0\" value=\"1000\" required />\n        </div>\n        <div>\n          <label>X >= </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <div>\n          <label>Y <= </label>\n          <input type=\"number\" min=\"0\" value=\"1000\" required />\n        </div>\n        <div>\n          <label>Y >= </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <div>\n          <label>Limit: </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <button type=\"submit\">Export</button>\n      </form>\n    </div>\n  ");
  Dialog.show('exportTribeVillages', html);
  document.querySelector('#' + FORM_ID).addEventListener('submit', handleExportTribeVillagesFormSubmit);
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
  const linkToTWHelp = document.createElement('a');
  linkToTWHelp.href = twhelputils.buildTribeURL(VERSION, SERVER, TRIBE_ID);
  linkToTWHelp.innerHTML = translations.action.linkToTWHelp;
  actionContainer.appendChild(wrapAction(linkToTWHelp));
  const showEnnoblements = document.createElement('a');
  showEnnoblements.href = '#';
  (0, _pagination.setPage)(showEnnoblements, '1');
  showEnnoblements.innerHTML = translations.action.showEnnoblements;
  showEnnoblements.addEventListener('click', handleShowTribeEnnoblementsClick);
  actionContainer.appendChild(wrapAction(showEnnoblements));
  const showHistory = document.createElement('a');
  showHistory.href = '#';
  (0, _pagination.setPage)(showHistory, '1');
  showHistory.innerHTML = translations.action.showHistory;
  showHistory.addEventListener('click', handleShowTribeHistoryClick);
  actionContainer.appendChild(wrapAction(showHistory));
  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  (0, _pagination.setPage)(showTribeChanges, '1');
  showTribeChanges.innerHTML = translations.action.showTribeChanges;
  showTribeChanges.addEventListener('click', handleShowTribeChangesClick);
  actionContainer.appendChild(wrapAction(showTribeChanges));
  const showMembersGrowth = document.createElement('a');
  showMembersGrowth.href = '#';
  showMembersGrowth.innerHTML = translations.action.showMembersGrowth;
  showMembersGrowth.addEventListener('click', handleShowMembersGrowthClick);
  actionContainer.appendChild(wrapAction(showMembersGrowth));
  const generateMailingList = document.createElement('a');
  generateMailingList.href = '#';
  generateMailingList.innerHTML = translations.action.generateMailingList;
  generateMailingList.addEventListener('click', handleGenerateMailingListClick);
  actionContainer.appendChild(wrapAction(generateMailingList));
  const exportVillages = document.createElement('a');
  exportVillages.href = '#';
  exportVillages.innerHTML = translations.action.exportVillages;
  exportVillages.addEventListener('click', handleExportTribeVillagesClick);
  actionContainer.appendChild(wrapAction(exportVillages));
};

(async function () {
  try {
    document.querySelector('#content_value > table:nth-child(3)').style.width = '100%';
    renderActions();
    const dataFromCache = loadDataFromCache();

    if (dataFromCache && dataFromCache.tribe) {
      render(dataFromCache);
    }

    const dataFromAPI = await loadData();

    if (dataFromAPI) {
      render(dataFromAPI);
    }
  } catch (error) {
    console.log('extended tribe profile', error);
  }
})();
},{"date-fns/differenceInDays":"mdVI","./i18n/extendedTribeProfile":"iFDG","./libs/requestCreator":"Ph2E","./utils/pagination":"fCHX","./common/renderTodaysStats":"yrCm","./common/showEnnoblementsPopup":"vNT1","./common/showHistoryPopup":"kEDU","./utils/showPopup":"chDM","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/localStorage":"KWxH","./utils/formatDate":"V6Mf","./utils/getServerVersionCode":"J1Ly","./utils/twstats":"Syko","./utils/twhelp":"gvXE","./utils/tribalwars":"fHHP"}]},{},["r4nF"], null)