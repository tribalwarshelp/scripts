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
})({"d3m2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType;

    if (input === null) {
      invalidType = 'null';
    } else {
      invalidType = _typeof(input);

      if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
        invalidType = input.constructor.name;
      } else {
        invalidType = "a ".concat(invalidType);
      }
    }

    throw new TypeError("Expected string but received ".concat(invalidType, "."));
  }
}

module.exports = exports.default;
module.exports.default = exports.default;
},{}],"hxfi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : undefined;

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }

  return obj;
}

module.exports = exports.default;
module.exports.default = exports.default;
},{}],"KGu6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = _interopRequireDefault(require("./util/assertString"));

var _merge = _interopRequireDefault(require("./util/merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_fqdn_options);
  /* Remove the optional trailing dot before checking validity */

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  var parts = str.split('.');

  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 63) {
      return false;
    }
  }

  if (options.require_tld) {
    var tld = parts.pop();

    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    } // disallow spaces && special characers


    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
      return false;
    }
  }

  for (var part, _i = 0; _i < parts.length; _i++) {
    part = parts[_i];

    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }

    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    } // disallow full-width chars


    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"d3m2","./util/merge":"hxfi"}],"NHAn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = _interopRequireDefault(require("./util/assertString"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */


var ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  version = String(version);

  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }

    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var addressAndZone = [str]; // ipv6 addresses could have scoped architecture
    // according to https://tools.ietf.org/html/rfc4007#section-11

    if (str.includes('%')) {
      addressAndZone = str.split('%');

      if (addressAndZone.length !== 2) {
        // it must be just two parts
        return false;
      }

      if (!addressAndZone[0].includes(':')) {
        // the first part must be the address
        return false;
      }

      if (addressAndZone[1] === '') {
        // the second part must not be empty
        return false;
      }
    }

    var blocks = addressAndZone[0].split(':');
    var foundOmissionBlock = false; // marker to indicate ::
    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.

    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    } // initial or final ::


    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }

        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {// it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }

    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }

    return blocks.length === expectedNumberOfBlocks;
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"d3m2"}],"XMVV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;

var _assertString = _interopRequireDefault(require("./util/assertString"));

var _isFQDN = _interopRequireDefault(require("./isFQDN"));

var _isIP = _interopRequireDefault(require("./isIP"));

var _merge = _interopRequireDefault(require("./util/merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/*
options for isURL method

require_protocol - if set as true isURL will return false if protocol is not present in the URL
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
protocols - valid protocols can be modified with this option
require_host - if set as false isURL will not check if host is present in the URL
allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed

*/


var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};
var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }

  return false;
}

function isURL(url, options) {
  (0, _assertString.default)(url);

  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
    return false;
  }

  if (url.indexOf('mailto:') === 0) {
    return false;
  }

  options = (0, _merge.default)(options, default_url_options);
  var protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();
  split = url.split('://');

  if (split.length > 1) {
    protocol = split.shift().toLowerCase();

    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (url.substr(0, 2) === '//') {
    if (!options.allow_protocol_relative_urls) {
      return false;
    }

    split[0] = url.substr(2);
  }

  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');

  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }

    auth = split.shift();

    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }

  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);

  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();

    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);

    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }

  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"d3m2","./isFQDN":"KGu6","./isIP":"NHAn","./util/merge":"hxfi"}],"kK6Q":[function(require,module,exports) {
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
},{"../toDate/index.js":"KYJg","../differenceInCalendarDays/index.js":"ieRm","../_lib/requiredArgs/index.js":"kK6Q"}],"Ph2E":[function(require,module,exports) {
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
},{}],"yQib":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = v => v === undefined || v === null;

exports.default = _default;
},{}],"dPMc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isNil = _interopRequireDefault(require("./isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  todaysStats.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              Today's stat changes\n            </th>\n          </tr>\n            <tr>\n              <td>\n                Points:\n              </td>\n              <td style=\"".concat(getTodaysStatsTdStyle(stats.points), "\">\n                ").concat(Math.abs(stats.points).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rank), "\">\n                ").concat(Math.abs(stats.rank), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Villages:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.villages), "\">\n                ").concat(Math.abs(stats.villages).toLocaleString(), "\n              </td>\n            </tr>\n            ").concat(!player ? "<tr>\n              <td>\n                Members:\n              </td>\n              <td style=\"".concat(getTodaysStatsTdStyle(stats.members), "\">\n                ").concat(Math.abs(stats.members), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                ODA:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreAtt), "\">\n                ").concat(Math.abs(stats.scoreAtt).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODA Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankAtt), "\">\n                ").concat(Math.abs(stats.rankAtt), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODD:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreDef), "\">\n                ").concat(Math.abs(stats.scoreDef).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODD Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankDef), "\">\n                ").concat(Math.abs(stats.rankDef), "\n              </td>\n            </tr>\n            ").concat(player ? "<tr>\n              <td>\n                ODS:\n              </td>\n              <td style=\"".concat(getTodaysStatsTdStyle(stats.scoreSup), "\">\n                ").concat(Math.abs(stats.scoreSup).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODS Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankSup), "\">\n                ").concat(Math.abs(stats.rankSup), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                OD:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreTotal), "\">\n                ").concat(Math.abs(stats.scoreTotal).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                OD Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankTotal), "\">\n                ").concat(Math.abs(stats.rankTotal), "\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

exports.default = _default;
},{"./isNil":"yQib"}],"P4rL":[function(require,module,exports) {
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
},{"../libs/InADayParser":"dSAr"}],"vhoq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pagination = require("./pagination");

var _renderPopup = _interopRequireDefault(require("./renderPopup"));

var _formatDate = _interopRequireDefault(require("./formatDate"));

var _tribalwars = require("./tribalwars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ENNOBLEMENTS_PAGINATION_CONTAINER_ID = 'ennoblementsPagination';

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
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(ENNOBLEMENTS_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            Date\n          </th>\n          <th>\n            Village\n          </th>\n          <th>\n            New Owner\n          </th>\n          <th>\n            Old Owner\n          </th>\n        </tr>\n        ").concat(ennoblements.items.map(ennoblement => {
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
  (0, _renderPopup.default)({
    e,
    title: "Ennoblements",
    id: 'ennoblements',
    html
  });
  document.querySelectorAll('#' + ENNOBLEMENTS_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', onPageChange);
  });
};

exports.default = _default;
},{"./pagination":"fCHX","./renderPopup":"P4rL","./formatDate":"V6Mf","./tribalwars":"fHHP"}],"VYL5":[function(require,module,exports) {
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
},{"../_lib/toInteger/index.js":"VYL5","../addDays/index.js":"lQIY","../_lib/requiredArgs/index.js":"kK6Q"}],"gJkK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _renderPopup = _interopRequireDefault(require("./renderPopup"));

var _pagination = require("./pagination");

var _formatDate = _interopRequireDefault(require("./formatDate"));

var _tribalwars = require("./tribalwars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HISTORY_PAGINATION_CONTAINER_ID = 'historyPagination';

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
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(HISTORY_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            Date\n          </th>\n          ").concat(tribe ? '' : '<th>Tribe</th>', "\n          <th>\n          Points\n          </th>\n          <th>\n          Villages\n          </th>\n          ").concat(tribe ? '<th>Members</th>' : '', "\n          <th>\n            OD\n          </th>\n          <th>\n            ODA\n          </th>\n          <th>\n            ODD\n          </th>\n          ").concat(tribe ? '' : '<th>ODS</th>', "\n        </tr>\n        ").concat(history.items.map(history => {
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
  (0, _renderPopup.default)({
    e,
    title: "History",
    id: 'history',
    html
  });
  document.querySelectorAll('#' + HISTORY_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
    el.addEventListener('click', onPageChange);
  });
};

exports.default = _default;
},{"date-fns/subDays":"mRRL","./renderPopup":"P4rL","./pagination":"fCHX","./formatDate":"V6Mf","./tribalwars":"fHHP"}],"DMkL":[function(require,module,exports) {
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
},{}],"r4nF":[function(require,module,exports) {
"use strict";

var _isURL = _interopRequireDefault(require("validator/lib/isURL"));

var _differenceInDays = _interopRequireDefault(require("date-fns/differenceInDays"));

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _pagination = require("./utils/pagination");

var _renderTodaysStats = _interopRequireDefault(require("./utils/renderTodaysStats"));

var _renderEnnoblements = _interopRequireDefault(require("./utils/renderEnnoblements"));

var _renderHistoryPopup = _interopRequireDefault(require("./utils/renderHistoryPopup"));

var _renderPopup = _interopRequireDefault(require("./utils/renderPopup"));

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _localStorage = require("./utils/localStorage");

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _twstats = require("./utils/twstats");

var _tribalwars = require("./utils/tribalwars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ==UserScript==
// @name         Extended Tribe Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      0.9.1
// @description  Extended Tribe Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const TRIBE_ID = (0, _getIDFromURL.default)(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = "\n    query tribe($server: String!, $id: Int!, $playerFilter: PlayerFilter!, $dailyTribeStatsFilter: DailyTribeStatsFilter!) {\n        tribe(server: $server, id: $id) {\n            id\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            createdAt\n            dominance\n        }\n        dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {\n          items {\n            rank\n            rankAtt\n            rankDef\n            rankTotal\n            points\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreTotal\n            villages\n            members\n          }\n        }\n        players(server: $server, filter: $playerFilter) {\n          items {\n            id\n            rankAtt\n            rankDef\n            rankSup\n            rankTotal\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreSup\n            scoreTotal\n            dailyGrowth\n          }\n        }\n    }\n";
const ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
const ENNOBLEMENTS_PER_PAGE = 15;
const TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY = "\nquery tribeHistoryAndTribeDailyStats($server: String!,\n     $tribeHistoryFilter: TribeHistoryFilter!,\n     $dailyTribeStatsFilter: DailyTribeStatsFilter!) {\n  tribeHistory(server: $server, filter: $tribeHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreTotal\n      rankTotal\n      createDate\n      totalMembers\n    }\n  }\n  dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        createDate\n        members\n      }\n    }\n}\n";
const TRIBE_HISTORY_PER_PAGE = 15;
const TRIBE_MEMBERS_DAILY_STATS_QUERY = "\nquery tribeMembersDailyStats($server: String!,\n     $filter: DailyPlayerStatsFilter!) {\n  dailyPlayerStats(server: $server, filter: $filter) {\n    items {\n        player {\n          id\n          name\n        }\n        points\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";
let MEMBERS_GROWTH_MODE = 'points';
const TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, filter: $filter) {\n        total\n        items {\n          player {\n            id\n            name\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
const TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const TRIBE_CHANGES_PER_PAGE = 15;
const profileInfoTBody = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody');
const actionsContainer = profileInfoTBody;
const otherElementsContainer = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)');
const membersContainer = document.querySelector('#content_value > table.vis > tbody');

const loadDataFromCache = () => {
  return (0, _localStorage.getItem)(LOCAL_STORAGE_KEY);
};

const cacheTribeData = function cacheTribeData() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(LOCAL_STORAGE_KEY, data);
};

const getMembersIDs = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');

    if (href.includes('info_player')) {
      ids.push((0, _getIDFromURL.default)(href));
    }
  });
  return ids;
};

const loadData = async () => {
  const membersIDs = getMembersIDs();
  const data = await (0, _requestCreator.default)({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
      dailyTribeStatsFilter: {
        sort: 'createDate DESC',
        limit: 1,
        tribeID: [TRIBE_ID]
      },
      playerFilter: {
        sort: 'rank ASC',
        limit: membersIDs.length,
        id: membersIDs
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
    ['ODA', 'ODD', 'ODS', 'OD', 'Daily growth', 'Player links'].forEach(v => {
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
      [[player.scoreAtt, player.rankAtt], [player.scoreDef, player.rankDef], [player.scoreSup, player.rankSup], [player.scoreTotal, player.rankTotal], player.dailyGrowth, [(0, _twstats.formatPlayerURL)(SERVER, player.id), 'TWStats']].forEach((data, index) => {
        let td = tr.children[5 + index];

        if (!td) {
          td = document.createElement('td');
          tr.appendChild(td);
        }

        if (Array.isArray(data)) {
          if (typeof data[0] === 'number') {
            td.innerHTML = "".concat(data[0].toLocaleString(), " (<strong>").concat(data[1], "</strong>)");
          } else if ((0, _isURL.default)(data[0])) {
            td.innerHTML = "<a href=\"".concat(data[0], "\">").concat(data[1], "</a>");
          }
        } else if (typeof data === 'number') {
          td.innerHTML = data.toLocaleString();
        }
      });
    }
  });
};

const render = (_ref2) => {
  let {
    tribe,
    dailyTribeStats,
    players
  } = _ref2;
  [{
    title: 'Created at:',
    data: (0, _formatDate.default)(tribe.createdAt),
    id: 'created_at'
  }, {
    title: 'Dominance:',
    data: tribe.dominance.toFixed(2) + '%',
    id: 'dominance'
  }, {
    title: 'Best rank:',
    data: tribe.bestRank + ' ' + "(".concat((0, _formatDate.default)(tribe.bestRankAt), ")"),
    id: 'best_rank'
  }, {
    title: 'Most points:',
    data: tribe.mostPoints.toLocaleString() + ' ' + "(".concat((0, _formatDate.default)(tribe.mostPointsAt), ")"),
    id: 'most_points'
  }, {
    title: 'Most villages:',
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
          },
          offset: ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: ENNOBLEMENTS_PER_PAGE,
          sort: 'ennobledAt DESC'
        },
        server: SERVER
      }
    });
    (0, _renderEnnoblements.default)(e, data.ennoblements, {
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
        tribeID: [TRIBE_ID],
        offset: TRIBE_HISTORY_PER_PAGE * (page - 1),
        limit: TRIBE_HISTORY_PER_PAGE,
        sort: 'createDate DESC'
      };
      const {
        tribeHistory,
        dailyTribeStats
      } = await (0, _requestCreator.default)({
        query: TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
        variables: {
          server: SERVER,
          tribeHistoryFilter: filter,
          dailyTribeStatsFilter: _objectSpread(_objectSpread({}, filter), {}, {
            offset: filter.offset + 1
          })
        }
      });
      (0, _renderHistoryPopup.default)(e, tribeHistory, dailyTribeStats, {
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
  return "\n    <tbody>\n        <tr>\n          <th>Player</th>\n          ".concat(dates.map(date => {
    return "<th>".concat((0, _formatDate.default)(date, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }), "</th>");
  }).join(''), "\n          <th>Total</th>\n        </tr>\n        ").concat(getMembersIDs().map(id => {
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

    return "<tr>\n            <td>\n              ".concat(player ? "<a href=\"".concat((0, _tribalwars.formatPlayerURL)(id), "\">").concat(player.name, "</a>") : '-', "\n            </td>\n            ").concat(tds.join(''), "\n            <td style=\"").concat(getMembersGrowthTdStyle(total), "\"><strong>").concat(total.toLocaleString(), "</strong></td>\n          </tr>");
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
  const formOptions = [['points', 'Points'], ['villages', 'Villages'], ['od', 'Opponents defeated'], ['oda', 'Opponents defeated as attacker'], ['odd', 'Opponents defeated as defender'], ['ods', 'Opponents defeated as supporter']].map(v => "<option ".concat(MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : '', " value=\"").concat(v[0], "\">").concat(v[1], "</option>"));
  const html = "\n    <form id=\"".concat(MEMBERS_GROWTH_FORM, "\">\n      <select>\n        ").concat(formOptions.join(''), "\n      </select>\n      <button type=\"submit\">Change</button>\n    </form>\n    <table id=\"").concat(MEMBERS_GROWTH_TABLE_ID, "\" class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      ").concat(buildMembersGrowthTBody(stats), "\n    </table>\n  ");
  (0, _renderPopup.default)({
    e,
    title: "Members growth",
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
  const membersIDs = getMembersIDs();
  const limit = membersIDs.length * (0, _differenceInDays.default)(createDateLTE, createDateGT);
  const filter = {
    playerID: membersIDs,
    limit,
    sort: 'createDate DESC',
    createDateLTE,
    createDateGT
  };
  const data = await (0, _requestCreator.default)({
    query: TRIBE_MEMBERS_DAILY_STATS_QUERY,
    variables: {
      filter,
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
  const html = "\n    <div style=\"".concat((0, _pagination.getContainerStyles)(), "\" id=\"").concat(TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            Date\n          </th>\n          <th>\n            Player\n          </th>\n          <th>\n            Action\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
    let rowHTML = '<tr>' + "<td>".concat((0, _formatDate.default)(tribeChange.createdAt), "</td>");

    if (tribeChange.player) {
      rowHTML += "<td><a href=\"".concat((0, _tribalwars.formatPlayerURL)(tribeChange.player.id), "\">").concat(tribeChange.player.name, "</a></td>");
    } else {
      rowHTML += '<td>-</td>';
    }

    rowHTML += "<td><strong>".concat(tribeChange.newTribe && tribeChange.newTribe.id === TRIBE_ID ? 'Joined' : 'Left', "</strong></td>");
    return rowHTML + '</tr>';
  }).join(''), "\n      </tbody>\n    </table>\n  ");
  (0, _renderPopup.default)({
    e,
    title: "Tribe changes",
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
          },
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

const wrapAction = action => {
  const actionWrapperTd = document.createElement('td');
  actionWrapperTd.colSpan = '2';
  actionWrapperTd.append(action);
  const actionWrapperTr = document.createElement('tr');
  actionWrapperTr.appendChild(actionWrapperTd);
  return actionWrapperTr;
};

const renderActions = () => {
  const showEnnoblements = document.createElement('a');
  showEnnoblements.href = '#';
  (0, _pagination.setPage)(showEnnoblements, '1');
  showEnnoblements.innerHTML = 'Show ennoblements';
  showEnnoblements.addEventListener('click', handleShowTribeEnnoblementsClick);
  actionsContainer.appendChild(wrapAction(showEnnoblements));
  const showHistory = document.createElement('a');
  showHistory.href = '#';
  (0, _pagination.setPage)(showHistory, '1');
  showHistory.innerHTML = 'Show history';
  showHistory.addEventListener('click', handleShowTribeHistoryClick);
  actionsContainer.appendChild(wrapAction(showHistory));
  const showTribeChanges = document.createElement('a');
  showTribeChanges.href = '#';
  (0, _pagination.setPage)(showTribeChanges, '1');
  showTribeChanges.innerHTML = 'Show tribe changes';
  showTribeChanges.addEventListener('click', handleShowTribeChangesClick);
  actionsContainer.appendChild(wrapAction(showTribeChanges));
  const showMembersGrowth = document.createElement('a');
  showMembersGrowth.href = '#';
  showMembersGrowth.innerHTML = 'Show members growth';
  showMembersGrowth.addEventListener('click', handleShowMembersGrowthClick);
  actionsContainer.appendChild(wrapAction(showMembersGrowth));
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
},{"validator/lib/isURL":"XMVV","date-fns/differenceInDays":"mdVI","./libs/requestCreator":"Ph2E","./utils/pagination":"fCHX","./utils/renderTodaysStats":"dPMc","./utils/renderEnnoblements":"vhoq","./utils/renderHistoryPopup":"gJkK","./utils/renderPopup":"P4rL","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/localStorage":"KWxH","./utils/formatDate":"V6Mf","./utils/twstats":"Syko","./utils/tribalwars":"fHHP"}]},{},["r4nF"], null)