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
},{}],"LNef":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const translations = {
  pl_PL: {
    loaded: 'Załadowano',
    pop: 'Populacja',
    mySupport: 'Moje wsparcie',
    allySupport: 'Wsparcie plemienia',
    total: 'Łącznie',
    possibleLoyalty: 'Prawdopodobne poparcie',
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    action: {
      showEnnoblements: 'Pokaż przejęcia',
      countIncomingSupport: 'Policz nadchodzące wsparcie'
    }
  },
  en_DK: {
    loaded: 'Loaded',
    pop: 'Pop',
    mySupport: 'My support',
    allySupport: 'Ally support',
    total: 'Total',
    possibleLoyalty: 'Possible loyalty',
    never: 'Never',
    ennobledAt: 'Ennobled at',
    action: {
      showEnnoblements: 'Show ennoblements',
      countIncomingSupport: 'Count incoming support'
    }
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
},{}],"fHHP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildImgURL = exports.calcAttackDuration = exports.formatVillageName = exports.formatVillageURL = exports.formatPlayerURL = exports.formatTribeURL = void 0;

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

const calcAttackDuration = (distance, unitSpeed, baseSpeed) => {
  return Math.round(distance * baseSpeed / unitSpeed);
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
},{"./tribalwars":"fHHP"}],"V6Mf":[function(require,module,exports) {
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
},{}],"oUdd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = t => new Promise(resolve => setTimeout(resolve, t));

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
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"H70G":[function(require,module,exports) {
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
},{"../differenceInMilliseconds/index.js":"H70G","../_lib/requiredArgs/index.js":"kK6Q"}],"ATOB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _differenceInMinutes = _interopRequireDefault(require("date-fns/differenceInMinutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (ennobledAt, speed) => {
  let loyalty = 25 + Math.abs((0, _differenceInMinutes.default)(ennobledAt, new Date())) * (speed / 60);

  if (loyalty > 100) {
    loyalty = 100;
  }

  return Math.floor(loyalty);
};

exports.default = _default;
},{"date-fns/differenceInMinutes":"oGJj"}],"tKRp":[function(require,module,exports) {
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
},{"../i18n/showEnnoblementsPopup":"tKRp","../utils/pagination":"fCHX","../utils/showPopup":"chDM","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"UdfQ":[function(require,module,exports) {
"use strict";

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _extendedVillageProfile = _interopRequireDefault(require("./i18n/extendedVillageProfile"));

var _pagination = require("./utils/pagination");

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _buildUnitImgURL = _interopRequireDefault(require("./utils/buildUnitImgURL"));

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _wait = _interopRequireDefault(require("./utils/wait"));

var _localStorage = require("./utils/localStorage");

var _countLoyalty = _interopRequireDefault(require("./utils/countLoyalty"));

var _showEnnoblementsPopup = _interopRequireDefault(require("./common/showEnnoblementsPopup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Extended village profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
// @version      0.7.1
// @description  Extended village profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_village*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const VILLAGE_ID = (0, _getIDFromURL.default)(window.location.search);
const LAST_CONQUER_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n        ennoblements(server: $server, filter: $filter) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n";
const ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
const ENNOBLEMENTS_PER_PAGE = 15;
const CURR_SERVER_CONFIG = "\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n              speed\n            }\n            unitConfig {\n              spear {\n                pop\n              }\n              sword {\n                pop\n              }\n              axe {\n                pop\n              }\n              archer {\n                pop\n              }\n              spy {\n                pop\n              }\n              light {\n                pop\n              }\n              marcher {\n                pop\n              }\n              heavy {\n                pop\n              }\n              ram {\n                pop\n              }\n              catapult {\n                pop\n              }\n              knight {\n                pop\n              }\n              snob {\n                pop\n              }\n            }\n        }\n    }\n";
const SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_village_profile_server_cfg';
const actionContainer = document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
const additionalInfoContainer = document.querySelector('#content_value table.vis tbody');
let serverConfig = {};
const translations = (0, _extendedVillageProfile.default)();

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

  if (!data.server || isConfigExpired(new Date(data.loadedAt)) || !data.server.unitConfig || !data.server.config) {
    data = await (0, _requestCreator.default)({
      query: CURR_SERVER_CONFIG,
      variables: {
        key: SERVER
      }
    });
    data.loadedAt = new Date();
    cacheServerConfig(data);
  }

  return data.server;
};

const loadPageData = async () => {
  let data = await (0, _requestCreator.default)({
    query: LAST_CONQUER_QUERY,
    variables: {
      server: SERVER,
      filter: {
        villageID: [VILLAGE_ID],
        sort: 'ennobledAt DESC',
        limit: 1
      }
    }
  });
  return data;
};

const handleShowTribeEnnoblementsClick = async e => {
  e.preventDefault();
  const page = (0, _pagination.getPage)(e.target);

  if (!isNaN(page)) {
    const data = await (0, _requestCreator.default)({
      query: ENNOBLEMENTS_QUERY,
      variables: {
        filter: {
          villageID: [VILLAGE_ID],
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
      onPageChange: handleShowTribeEnnoblementsClick
    });
  }
};

const buildCellsForIncSupport = units => {
  const cells = [];
  let pop = 0;

  for (let unit in units) {
    pop += units[unit] * serverConfig.unitConfig[unit].pop;
    cells.push("<td>".concat(units[unit].toLocaleString(), "</td>"));
  }

  cells.push("<td><strong>".concat(pop.toLocaleString(), "</strong></td>"));
  return cells;
};

const handleCountIncomingSupportClick = async e => {
  e.preventDefault();
  const ids = [];
  const allyCommand = {};
  document.querySelectorAll('span.command_hover_details[data-command-type="support"]').forEach(el => {
    const id = parseInt(el.getAttribute('data-command-id'));

    if (el.classList.contains('commandicon-ally')) {
      allyCommand[id] = true;
    } else {
      allyCommand[id] = false;
    }

    ids.push(id);
  });
  const mySupport = {
    spear: 0,
    sword: 0,
    axe: 0,
    archer: 0,
    spy: 0,
    light: 0,
    marcher: 0,
    heavy: 0,
    ram: 0,
    catapult: 0,
    knight: 0,
    snob: 0
  };

  const allySupport = _objectSpread({}, mySupport);

  const total = _objectSpread({}, mySupport);

  for (let i = 0; i < ids.length; i++) {
    Dialog.show('incomingSupport', "".concat(translations.loaded, ": <strong>").concat(i, " / ").concat(ids.length, "</strong>"));
    const id = ids[i];
    const url = TribalWars.buildURL('', {
      screen: 'info_command',
      ajax: 'details',
      id
    });

    try {
      const resp = await fetch(url);
      const {
        units
      } = await resp.json();

      if (units) {
        for (let unit in mySupport) {
          const count = parseInt(units[unit].count);

          if (allyCommand[id]) {
            allySupport[unit] += count;
          } else {
            mySupport[unit] += count;
          }

          total[unit] += count;
        }
      }

      await (0, _wait.default)(200);
    } catch (error) {
      console.log('count incoming support', error);
    }
  }

  const ths = ['<th></th>'];

  for (let unit in mySupport) {
    ths.push("<th><img src=\"".concat((0, _buildUnitImgURL.default)(unit), "\" /></th>"));
  }

  ths.push("<th>".concat(translations.pop, "</th>"));
  const mySupportCells = ["<th>".concat(translations.mySupport, "</th>"), ...buildCellsForIncSupport(mySupport)];
  const allySupportCells = ["<th>".concat(translations.allySupport, "</th>"), ...buildCellsForIncSupport(allySupport)];
  const totalCells = ["<th>".concat(translations.total, "</th>"), ...buildCellsForIncSupport(total)];
  Dialog.show('incomingSupport', "\n    <table class=\"vis\" style=\"width: 100%;\">\n      <tbody>\n          <tr>\n            ".concat(ths.join(''), "\n          </tr>\n          <tr>\n            ").concat(mySupportCells.join(''), "\n          </tr>\n          <tr>\n            ").concat(allySupportCells.join(''), "\n          </tr>\n          <tr>\n            ").concat(totalCells.join(''), "\n          </tr>\n      </tbody>\n    </table>\n  "));
  const popup = document.querySelector('.popup_box');

  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '900px';
  }
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
  const showEnnoblementsPopup = document.createElement('a');
  showEnnoblementsPopup.href = '#';
  (0, _pagination.setPage)(showEnnoblementsPopup, '1');
  showEnnoblementsPopup.innerHTML = translations.action.showEnnoblements;
  showEnnoblementsPopup.addEventListener('click', handleShowTribeEnnoblementsClick);
  actionContainer.appendChild(wrapAction(showEnnoblementsPopup));
  const countIncomingSupport = document.createElement('a');
  countIncomingSupport.href = '#';
  countIncomingSupport.innerHTML = translations.action.countIncomingSupport;
  countIncomingSupport.addEventListener('click', handleCountIncomingSupportClick);
  actionContainer.appendChild(wrapAction(countIncomingSupport));
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
    additionalInfoContainer.append(tr);
  }

  tr.children[0].innerHTML = title;
  tr.children[1].innerHTML = data;
};

const countTroopsInVillage = () => {
  const trs = document.querySelectorAll('#content_value > div tbody tr');
  const units = [];
  if (trs.length === 0) throw new Error();
  trs[0].querySelectorAll('.unit_link').forEach(() => {
    units.push(0);
  });

  for (let i = 1; i < trs.length; i++) {
    const tr = trs[i];
    tr.querySelectorAll('.unit-item').forEach((td, index) => {
      units[index] += parseInt(td.innerHTML);
    });
  }

  return units;
};

const renderAdditionalInfo = function renderAdditionalInfo() {
  let {
    config,
    ennoblements
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const firstEnnoblement = ennoblements && Array.isArray(ennoblements.items) && ennoblements.items[0] ? ennoblements.items[0] : undefined;
  renderTr({
    id: 'loyalty',
    title: "".concat(translations.possibleLoyalty, ":"),
    data: firstEnnoblement ? (0, _countLoyalty.default)(new Date(firstEnnoblement.ennobledAt), config.speed) : 100
  });
  renderTr({
    id: 'ennobledAt',
    title: "".concat(translations.ennobledAt, ":"),
    data: firstEnnoblement ? (0, _formatDate.default)(firstEnnoblement.ennobledAt) : translations.never
  });

  try {
    const troops = countTroopsInVillage();
    const tr = document.createElement('tr');
    tr.style.textAlign = 'center';
    tr.style.fontWeight = 'bold';
    tr.appendChild(document.createElement('td'));
    troops.forEach(troop => {
      const td = document.createElement('td');
      td.innerHTML = troop;
      tr.appendChild(td);
    });
    document.querySelector('#content_value > div tbody').appendChild(tr);
  } catch (error) {}
};

(async function () {
  try {
    const pageData = await loadPageData();
    serverConfig = await loadConfig();
    renderAdditionalInfo({
      config: serverConfig.config,
      ennoblements: pageData.ennoblements
    });
    renderActions();
  } catch (error) {
    console.log('extended village profile', error);
  }
})();
},{"./libs/requestCreator":"Ph2E","./i18n/extendedVillageProfile":"LNef","./utils/pagination":"fCHX","./utils/getCurrentServer":"DMkL","./utils/getIDFromURL":"tQUs","./utils/buildUnitImgURL":"KX6P","./utils/formatDate":"V6Mf","./utils/wait":"oUdd","./utils/localStorage":"KWxH","./utils/countLoyalty":"ATOB","./common/showEnnoblementsPopup":"vNT1"}]},{},["UdfQ"], null)