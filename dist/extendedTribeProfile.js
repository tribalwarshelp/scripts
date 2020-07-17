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
},{"./util/assertString":"d3m2","./isFQDN":"KGu6","./isIP":"NHAn","./util/merge":"hxfi"}],"Ph2E":[function(require,module,exports) {
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

  const renderODS = !(0, _isNil.default)(stats.rankSup);
  todaysStats.innerHTML = "\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              Today's stats\n            </th>\n          </tr>\n            <tr>\n              <td>\n                Points:\n              </td>\n              <td style=\"".concat(getTodaysStatsTdStyle(stats.points), "\">\n                ").concat(Math.abs(stats.points).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rank), "\">\n                ").concat(Math.abs(stats.rank), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Villages:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.villages), "\">\n                ").concat(Math.abs(stats.villages).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODA:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreAtt), "\">\n                ").concat(Math.abs(stats.scoreAtt).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODA Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankAtt), "\">\n                ").concat(Math.abs(stats.rankAtt), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODD:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreDef), "\">\n                ").concat(Math.abs(stats.scoreDef).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODD Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankDef), "\">\n                ").concat(Math.abs(stats.rankDef), "\n              </td>\n            </tr>\n            ").concat(renderODS ? "<tr>\n              <td>\n                ODS:\n              </td>\n              <td style=\"".concat(getTodaysStatsTdStyle(stats.scoreSup), "\">\n                ").concat(Math.abs(stats.scoreSup).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ODS Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankSup), "\">\n                ").concat(Math.abs(stats.rankSup), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                OD:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.scoreTotal), "\">\n                ").concat(Math.abs(stats.scoreTotal).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                OD Rank:\n              </td>\n              <td style=\"").concat(getTodaysStatsTdStyle(stats.rankTotal), "\">\n                ").concat(Math.abs(stats.rankTotal), "\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
};

exports.default = _default;
},{"./isNil":"yQib"}],"tQUs":[function(require,module,exports) {
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

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _renderTodaysStats = _interopRequireDefault(require("./utils/renderTodaysStats"));

var _getIDFromURL = _interopRequireDefault(require("./utils/getIDFromURL"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _localStorage = require("./utils/localStorage");

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _twstats = require("./utils/twstats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         Extended Tribe Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      0.3
// @description  Extended Tribe Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*&screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const TRIBE_ID = (0, _getIDFromURL.default)(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = "\n    query tribe($server: String!, $id: Int!, $playerFilter: PlayerFilter!, $dailyTribeStatsFilter: DailyTribeStatsFilter!) {\n        tribe(server: $server, id: $id) {\n            id\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            createdAt\n            dominance\n        }\n        dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {\n          items {\n            rank\n            rankAtt\n            rankDef\n            rankTotal\n            points\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreTotal\n            villages\n          }\n        }\n        players(server: $server, filter: $playerFilter) {\n          items {\n            id\n            rankAtt\n            rankDef\n            rankSup\n            rankTotal\n            scoreAtt\n            scoreAtt\n            scoreDef\n            scoreSup\n            scoreTotal\n            dailyGrowth\n          }\n        }\n    }\n";
const profileInfoTBody = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody');
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

(async function () {
  try {
    document.querySelector('#content_value > table:nth-child(3)').style.width = '100%';
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
},{"validator/lib/isURL":"XMVV","./libs/requestCreator":"Ph2E","./utils/renderTodaysStats":"dPMc","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/localStorage":"KWxH","./utils/formatDate":"V6Mf","./utils/twstats":"Syko"}]},{},["r4nF"], null)