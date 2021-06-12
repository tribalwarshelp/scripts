(function () {
  function $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  function $5a91e85e34da2364b77064ee2dfe41c1$export$default(required, args) {
    if (args.length < required) {
      throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
    }
  }
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
  function $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(argument) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    // Clone the date
    if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        // eslint-disable-next-line no-console
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
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
  * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
  * //=> Thu Jul 10 2014 12:45:30.750
  */
  function $11f02e6f39aa1698d361463648fba3d0$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var timestamp = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate).getTime();
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    return new Date(timestamp + amount);
  }
  var $85f39b52d00a89d06a6562a7df398249$var$MILLISECONDS_IN_MINUTE = 60000;
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
  * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
  * //=> Thu Jul 10 2014 12:30:00
  */
  function $85f39b52d00a89d06a6562a7df398249$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    return $11f02e6f39aa1698d361463648fba3d0$export$default(dirtyDate, amount * $85f39b52d00a89d06a6562a7df398249$var$MILLISECONDS_IN_MINUTE);
  }
  const $b77e52fe2469092ef0c13094c9dc19c1$var$translations = {
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
  var $b77e52fe2469092ef0c13094c9dc19c1$export$default = () => $b77e52fe2469092ef0c13094c9dc19c1$var$translations[window.game_data.locale] || $b77e52fe2469092ef0c13094c9dc19c1$var$translations.en_DK;
  const $3af05e958b2a20a26445518aba292c50$export$API_URI = 'https://api.tribalwarshelp.com/graphql';
  var $3af05e958b2a20a26445518aba292c50$export$default = function () {
    let {query, variables = {}} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return fetch($3af05e958b2a20a26445518aba292c50$export$API_URI, {
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
    }).then(_ref => {
      let {data, errors} = _ref;
      if (errors && Array.isArray(errors) && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      return new Promise(resolve => resolve(data));
    });
  };
  const $87a1b3fb6327eb299adebba75fcb33c5$export$inTZ = function inTZ() {
    let d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    let tz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UTC';
    return new Date(new Date(d).toLocaleString('en-US', {
      timeZone: tz
    }));
  };
  const $87a1b3fb6327eb299adebba75fcb33c5$export$formatDate = (date, options) => {
    return new Date(date).toLocaleDateString(undefined, options ? options : {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
  const $3d57ea338a09b23ca4b283dff4f79ebd$export$calcDistanceBetweenTwoPoints = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL = id => {
    return window.location.origin + TribalWars.buildURL('', {
      screen: 'info_ally',
      id
    });
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL = id => {
    return window.location.origin + TribalWars.buildURL('', {
      screen: 'info_player',
      id
    });
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageURL = id => {
    return window.location.origin + TribalWars.buildURL('', {
      screen: 'info_village',
      id
    });
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageName = function buildVillageName() {
    let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    const continent = 'K' + String(y)[0] + String(x)[0];
    return ("").concat(n, " (").concat(x, "|").concat(y, ") ").concat(continent);
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$calcAttackDuration = (distance, baseSpeed) => {
    return Math.round(distance * baseSpeed);
  };
  const $6a639e352c067a7850a9fa8cdc59ffca$export$buildImgURL = img => {
    return image_base + img;
  };
  var $a2d6afca3e99a4c1d795f97cc5f14c0b$export$default = unit => {
    return $6a639e352c067a7850a9fa8cdc59ffca$export$buildImgURL(("unit/unit_").concat(unit, ".png"));
  };
  const $3d935538f644f492fe681e00121114a4$export$getItem = function getItem(key) {
    let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const json = localStorage.getItem(key);
    let obj = d;
    if (json) {
      obj = JSON.parse(json);
    }
    return obj;
  };
  const $3d935538f644f492fe681e00121114a4$export$setItem = (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
  };
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
  * const result = differenceInMilliseconds(
  *   new Date(2014, 6, 2, 12, 30, 21, 700),
  *   new Date(2014, 6, 2, 12, 30, 20, 600)
  * )
  * //=> 1100
  */
  function $987dc0dc027c0d4aafb08ca79b0ecd15$export$default(dirtyDateLeft, dirtyDateRight) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var dateLeft = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDateLeft);
    var dateRight = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDateRight);
    return dateLeft.getTime() - dateRight.getTime();
  }
  var $8a55ab13e50cc25510a86f88055567af$var$MILLISECONDS_IN_MINUTE = 60000;
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
  function $8a55ab13e50cc25510a86f88055567af$export$default(dirtyDateLeft, dirtyDateRight) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var diff = $987dc0dc027c0d4aafb08ca79b0ecd15$export$default(dirtyDateLeft, dirtyDateRight) / $8a55ab13e50cc25510a86f88055567af$var$MILLISECONDS_IN_MINUTE;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }
  const $497794f7ecdac1fd2ccb9495447c64f0$export$default = (ennobledAt, speed) => {
    let loyalty = 25 + Math.abs($8a55ab13e50cc25510a86f88055567af$export$default(ennobledAt, new Date())) * (speed / 60);
    if (loyalty > 100) {
      loyalty = 100;
    }
    return Math.floor(loyalty);
  };
  function $dd5d786daadd6a3858722303ff53be21$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function $dd5d786daadd6a3858722303ff53be21$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $dd5d786daadd6a3858722303ff53be21$var$ownKeys(Object(source), true).forEach(function (key) {
          $dd5d786daadd6a3858722303ff53be21$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $dd5d786daadd6a3858722303ff53be21$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $dd5d786daadd6a3858722303ff53be21$var$_defineProperty(obj, key, value) {
    if ((key in obj)) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  // ==UserScript==
  // @name         Extended map popup
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
  // @version      0.7.0
  // @description  Extended map popup
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=map*
  // @grant        none
  // ==/UserScript==
  const $dd5d786daadd6a3858722303ff53be21$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $dd5d786daadd6a3858722303ff53be21$var$CURR_SERVER_CONFIG = "\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n                speed\n                unitSpeed\n                snob {\n                  maxDist\n                }\n            }\n            unitConfig {\n              spear {\n                speed\n              }\n              sword {\n                speed\n              }\n              axe {\n                speed\n              }\n              archer {\n                speed\n              }\n              spy {\n                speed\n              }\n              light {\n                speed\n              }\n              marcher {\n                speed\n              }\n              heavy {\n                speed\n              }\n              ram {\n                speed\n              }\n              catapult {\n                speed\n              }\n              knight {\n                speed\n              }\n              snob {\n                speed\n              }\n            }\n        }\n    }\n";
  const $dd5d786daadd6a3858722303ff53be21$var$LAST_CONQUER_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {\n        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n";
  const $dd5d786daadd6a3858722303ff53be21$var$SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_map_popup_server_cfg';
  const $dd5d786daadd6a3858722303ff53be21$var$translations = $b77e52fe2469092ef0c13094c9dc19c1$export$default();
  const $dd5d786daadd6a3858722303ff53be21$var$loadConfigFromLocalStorage = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($dd5d786daadd6a3858722303ff53be21$var$SERVER_CONFIG_LOCAL_STORAGE_KEY);
  };
  const $dd5d786daadd6a3858722303ff53be21$var$cacheServerConfig = function cacheServerConfig() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($dd5d786daadd6a3858722303ff53be21$var$SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
  };
  const $dd5d786daadd6a3858722303ff53be21$var$isConfigExpired = date => {
    return Math.abs(date.getTime() - new Date().getTime()) > 1000 * 60 * 60 * 24;
  };
  const $dd5d786daadd6a3858722303ff53be21$var$loadConfig = async () => {
    let data = $dd5d786daadd6a3858722303ff53be21$var$loadConfigFromLocalStorage();
    if (!data || !data.server || $dd5d786daadd6a3858722303ff53be21$var$isConfigExpired(new Date(data.loadedAt)) || !data.server.config || !data.server.config.speed || !data.server.config.snob || !data.server.config.snob.maxDist || !data.server.config.unitSpeed || !data.server.unitConfig) {
      data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $dd5d786daadd6a3858722303ff53be21$var$CURR_SERVER_CONFIG,
        variables: {
          key: $dd5d786daadd6a3858722303ff53be21$var$SERVER
        }
      });
      data.loadedAt = new Date();
      $dd5d786daadd6a3858722303ff53be21$var$cacheServerConfig(data);
    }
    return data && data.server && data.server.config ? {
      config: data.server.config,
      unitConfig: data.server.unitConfig
    } : {};
  };
  const $dd5d786daadd6a3858722303ff53be21$var$loadVillageData = async function loadVillageData(id) {
    let {cacheOnly = false} = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!id) {
      return;
    }
    if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) {
      return TWMap.popup.extendedMapPopupCache[id];
    }
    try {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $dd5d786daadd6a3858722303ff53be21$var$LAST_CONQUER_QUERY,
        variables: {
          server: $dd5d786daadd6a3858722303ff53be21$var$SERVER,
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
  const $dd5d786daadd6a3858722303ff53be21$var$getAvailableUnits = function getAvailableUnits() {
    let unitCfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const units = [];
    for (let unit in unitCfg) {
      if (unitCfg[unit].speed !== 0) {
        units.push($dd5d786daadd6a3858722303ff53be21$var$_objectSpread($dd5d786daadd6a3858722303ff53be21$var$_objectSpread({}, unitCfg[unit]), {}, {
          name: unit,
          img: $a2d6afca3e99a4c1d795f97cc5f14c0b$export$default(unit)
        }));
      }
    }
    return units;
  };
  const $dd5d786daadd6a3858722303ff53be21$var$getUnitTdBgColor = index => index % 2 === 0 ? '#f8f4e8' : '#ded3b9;';
  const $dd5d786daadd6a3858722303ff53be21$var$buildUnitHeader = (unit, index) => {
    return ("\n    <td style=\"padding: 2px; background-color: ").concat($dd5d786daadd6a3858722303ff53be21$var$getUnitTdBgColor(index), ";\">\n      <img\n        src=\"").concat(unit.img, "\"\n        title=\"").concat(unit.name, "\"\n        alt=\"").concat(unit.name, "\"\n      />\n    </td>\n  ");
  };
  const $dd5d786daadd6a3858722303ff53be21$var$buildUnitArrivalInfo = (t, index) => {
    return ("\n    <td style=\"padding: 2px; background-color: ").concat($dd5d786daadd6a3858722303ff53be21$var$getUnitTdBgColor(index), ";\">\n      ").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate($85f39b52d00a89d06a6562a7df398249$export$default(Timing.getCurrentServerTime(), t)), "\n    </td>\n  ");
  };
  const $dd5d786daadd6a3858722303ff53be21$var$renderAdditionalInfo = (id, data, _ref) => {
    let {config, unitConfig} = _ref;
    const coords = TWMap.CoordByXY(TWMap.villageKey[id]);
    const distance = $3d57ea338a09b23ca4b283dff4f79ebd$export$calcDistanceBetweenTwoPoints(coords[0], coords[1], window.game_data.village.x, window.game_data.village.y);
    const ennoblement = data && data.ennoblements && data.ennoblements.items && data.ennoblements.items.length > 0 ? data.ennoblements.items[0] : undefined;
    const parent = document.querySelector('#map_popup #info_content tbody');
    let unitsEl = parent.querySelector('#units');
    if (!unitsEl) {
      unitsEl = document.createElement('tr');
      unitsEl.id = 'units';
      parent.appendChild(unitsEl);
    }
    const units = $dd5d786daadd6a3858722303ff53be21$var$getAvailableUnits(unitConfig);
    unitsEl.innerHTML = ("\n          <td colspan=\"2\">\n            <table style=\"border: 1px solid #ded3b9; max-width: 450px;\"\n              width=\"100%\"\n              cellpadding=\"0\"\n              cellspacing=\"0\">\n              <tbody>\n                <tr class=\"center\">\n                  ").concat(units.map($dd5d786daadd6a3858722303ff53be21$var$buildUnitHeader).join(''), "\n                </tr>\n                <tr class=\"center\">\n                  ").concat(units.map((unit, index) => {
      return $dd5d786daadd6a3858722303ff53be21$var$buildUnitArrivalInfo($6a639e352c067a7850a9fa8cdc59ffca$export$calcAttackDuration(distance, unit.speed), index);
    }).join(''), "\n                </tr>\n              </tbody>\n            </table>\n          </td>\n      ");
    let lastEnnobledAt = parent.querySelector('#lastEnnobledAt');
    if (!lastEnnobledAt) {
      lastEnnobledAt = document.createElement('tr');
      lastEnnobledAt.id = 'lastEnnobledAt';
      parent.appendChild(lastEnnobledAt);
    }
    lastEnnobledAt.innerHTML = ("\n          <td>\n              ").concat($dd5d786daadd6a3858722303ff53be21$var$translations.ennobledAt, ":\n          </td>\n          <td>\n              ").concat(ennoblement ? $87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(ennoblement.ennobledAt) : $dd5d786daadd6a3858722303ff53be21$var$translations.never, "\n          </td>\n      ");
    let loyalty = parent.querySelector('#loyalty');
    if (!loyalty) {
      loyalty = document.createElement('tr');
      loyalty.id = 'loyalty';
      parent.appendChild(loyalty);
    }
    loyalty.innerHTML = ("\n          <td>\n              ").concat($dd5d786daadd6a3858722303ff53be21$var$translations.possibleLoyalty, ":\n          </td>\n          <td>\n              ").concat(ennoblement ? $497794f7ecdac1fd2ccb9495447c64f0$export$default(new Date(ennoblement.ennobledAt), config.speed) : 100, "\n          </td>\n      ");
    let canSendNoble = parent.querySelector('#canSendNoble');
    if (!canSendNoble) {
      canSendNoble = document.createElement('tr');
      canSendNoble.id = 'canSendNoble';
      parent.appendChild(canSendNoble);
    }
    canSendNoble.innerHTML = ("\n          <td>\n              ").concat($dd5d786daadd6a3858722303ff53be21$var$translations.canSendNoble, ":\n          </td>\n          <td>\n              ").concat(distance < config.snob.maxDist ? $dd5d786daadd6a3858722303ff53be21$var$translations.yes : $dd5d786daadd6a3858722303ff53be21$var$translations.no, "\n          </td>\n      ");
  };
  const $dd5d786daadd6a3858722303ff53be21$var$createLoadVillageHandler = cfg => async e => {
    TWMap.popup._loadVillage(e);
    const data = await $dd5d786daadd6a3858722303ff53be21$var$loadVillageData(parseInt(e));
    if (data) {
      $dd5d786daadd6a3858722303ff53be21$var$renderAdditionalInfo(parseInt(e), data, cfg);
    }
  };
  const $dd5d786daadd6a3858722303ff53be21$var$createDisplayForVillageHandler = cfg => async (e, a, t) => {
    TWMap.popup._displayForVillage(e, a, t);
    const data = await $dd5d786daadd6a3858722303ff53be21$var$loadVillageData(parseInt(e.id), {
      cacheOnly: window.game_data.features.Premium.active
    });
    if (data) {
      $dd5d786daadd6a3858722303ff53be21$var$renderAdditionalInfo(parseInt(e.id), data, cfg);
    }
  };
  (async function () {
    try {
      const configs = await $dd5d786daadd6a3858722303ff53be21$var$loadConfig();
      TWMap.popup.extendedMapPopupCache = {};
      TWMap.popup._loadVillage = TWMap.popup.loadVillage;
      TWMap.popup.loadVillage = $dd5d786daadd6a3858722303ff53be21$var$createLoadVillageHandler(configs);
      TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
      TWMap.popup.displayForVillage = $dd5d786daadd6a3858722303ff53be21$var$createDisplayForVillageHandler(configs);
    } catch (error) {
      console.log('extended map popup', error);
    }
  })();
})();

