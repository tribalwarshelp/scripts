(function () {
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
  const $f8d29f6173b6f6da192c32aafce06dad$var$translations = {
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
        linkToTWHelp: 'Akta wioski (TWHelp)',
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
        linkToTWHelp: 'Village file (TWHelp)',
        showEnnoblements: 'Show ennoblements',
        countIncomingSupport: 'Count incoming support'
      }
    },
    de_DE: {
      loaded: 'Geladen',
      pop: 'Pop',
      mySupport: 'Meine Unterstützung',
      allySupport: 'Verbündete Unterstützung',
      total: 'Total',
      possibleLoyalty: 'Mögliche Zustimmung',
      never: 'Niemals',
      ennobledAt: 'Geadelt am',
      action: {
        linkToTWHelp: 'Dorfakte (TWHelp)',
        showEnnoblements: 'Zeige Adelungen',
        countIncomingSupport: 'Zähle ankommende Unterstützung'
      }
    }
  };
  var $f8d29f6173b6f6da192c32aafce06dad$export$default = () => $f8d29f6173b6f6da192c32aafce06dad$var$translations[window.game_data.locale] || $f8d29f6173b6f6da192c32aafce06dad$var$translations.en_DK;
  const $13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE = 'data-page';
  const $13593d6974cda38c64f44fff96e2987d$export$getContainerStyles = () => {
    return 'display: flex; flex-direction: row; flex-wrap: wrap;';
  };
  const $13593d6974cda38c64f44fff96e2987d$export$setPage = function setPage(el) {
    let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (!el instanceof HTMLElement) {
      throw new Error('Expected HTMLElement as the first argument');
    }
    page = parseInt(page);
    if (typeof page !== 'number' || isNaN(page)) {
      throw new Error('Expected number or string as the second argument');
    }
    el.setAttribute($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE, page + '');
  };
  const $13593d6974cda38c64f44fff96e2987d$export$getPage = el => {
    if (!el instanceof HTMLElement) {
      return 0;
    }
    return parseInt(el.getAttribute($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE));
  };
  const $13593d6974cda38c64f44fff96e2987d$export$calcNumberOfPages = (total, limit) => {
    if (typeof total !== 'number') {
      throw new Error('Expected number as the first argument');
    }
    if (typeof limit !== 'number') {
      throw new Error('Expected number as the second argument');
    }
    return total > 0 ? Math.ceil(total / limit) : 1;
  };
  const $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems = function generatePaginationItems() {
    let {total, limit, marginRight = 3, currentPage = 0} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const numberOfPages = $13593d6974cda38c64f44fff96e2987d$export$calcNumberOfPages(total, limit);
    const paginationItems = [];
    for (let i = 1; i <= numberOfPages; i++) {
      if (i === currentPage) {
        paginationItems.push(("<strong style=\"margin-right: ").concat(marginRight, "px\">>").concat(i, "<</strong>"));
      } else {
        paginationItems.push(("<a style=\"margin-right: ").concat(marginRight, "px\" href=\"#\" ").concat($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE, "=\"").concat(i, "\">").concat(i, "</a>"));
      }
    }
    return paginationItems;
  };
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
  var $39c4220bac5e8e55ae13cc7489410b3e$export$default = url => parseInt(new URLSearchParams(url).get('id'));
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
  var $393a22f746cd1f6e45eff96c71b28370$export$default = t => new Promise(resolve => setTimeout(resolve, t));
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
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$BASE_URL = 'tribalwarshelp.com';
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage = function buildURLToServerPage() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return ("https://").concat(version, ".").concat($d147509fefd1cb8b3b83e8f38f763543$export$BASE_URL, "/server/").concat(server);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile = function buildURLToProfile() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let entity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return ("").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage(version, server), "/").concat(entity, "/").concat(id);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildPlayerURL = function buildPlayerURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'player');
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildTribeURL = function buildTribeURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'tribe');
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildVillageURL = function buildVillageURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'village');
  };
  const $3f288d82e5e972d85d580f8ed66de51e$var$translations = {
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
    },
    de_DE: {
      date: 'Datum',
      newOwner: 'Neuer Besitzer',
      oldOwner: 'Alter Besitzer',
      village: 'Dorf',
      title: 'Adelungen'
    }
  };
  var $3f288d82e5e972d85d580f8ed66de51e$export$default = () => $3f288d82e5e972d85d580f8ed66de51e$var$translations[window.game_data.locale] || $3f288d82e5e972d85d580f8ed66de51e$var$translations.en_DK;
  const $6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR = '.popup_box';
  const $6412e4d8722bc72f55b3c382206290ed$export$default = function showPopup() {
    let {html, id, title} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Dialog.show(id, ("<h3>").concat(title, "</h3>") + html);
    const popup = document.querySelector($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR);
    if (popup) {
      popup.style.width = 'auto';
      popup.style.maxWidth = '1000px';
    }
  };
  const $88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
  const $88f173be92b23fde3128f694442fe0ce$var$translations = $3f288d82e5e972d85d580f8ed66de51e$export$default();
  const $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd = (player, tribe) => {
    if (player) {
      return ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(player.id), "\">").concat(player.name, " (").concat(tribe ? ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(tribe.id), "\">").concat(tribe.tag, "</a>") : '-', ")</a></td>");
    }
    return '<td>-</td>';
  };
  var $88f173be92b23fde3128f694442fe0ce$export$default = function (e, ennoblements) {
    let {limit = 0, currentPage = 1, onPageChange = () => {}} = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const paginationItems = $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems({
      total: ennoblements.total,
      limit,
      currentPage
    });
    const html = ("\n    <div style=\"").concat($13593d6974cda38c64f44fff96e2987d$export$getContainerStyles(), "\" id=\"").concat($88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.date, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.village, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.newOwner, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.oldOwner, "\n          </th>\n        </tr>\n        ").concat(ennoblements.items.map(ennoblement => {
      let rowHTML = '<tr>' + ("<td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(ennoblement.ennobledAt), "</td>");
      if (ennoblement.village) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageURL(ennoblement.village.id), "\">").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageName(ennoblement.village.name, ennoblement.village.x, ennoblement.village.y), "</a></td>");
      } else {
        rowHTML += '<td>-</td>';
      }
      rowHTML += $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd(ennoblement.newOwner, ennoblement.newOwnerTribe);
      rowHTML += $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd(ennoblement.oldOwner, ennoblement.oldOwnerTribe);
      return rowHTML + '</tr>';
    }).join(''), "\n      </tbody>\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $88f173be92b23fde3128f694442fe0ce$var$translations.title,
      id: 'ennoblements',
      html
    });
    document.querySelectorAll('#' + $88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID + ' a').forEach(el => {
      el.addEventListener('click', onPageChange);
    });
  };
  function $a1e110fd96976c18038324dfd6e74ccb$var$ownKeys(object, enumerableOnly) {
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
  function $a1e110fd96976c18038324dfd6e74ccb$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $a1e110fd96976c18038324dfd6e74ccb$var$ownKeys(Object(source), true).forEach(function (key) {
          $a1e110fd96976c18038324dfd6e74ccb$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $a1e110fd96976c18038324dfd6e74ccb$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $a1e110fd96976c18038324dfd6e74ccb$var$_defineProperty(obj, key, value) {
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
  // @name         Extended village profile
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedVillageProfile.js
  // @version      0.7.8
  // @description  Extended village profile
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=info_village*
  // @grant        none
  // @run-at       document-end
  // ==/UserScript==
  const $a1e110fd96976c18038324dfd6e74ccb$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $a1e110fd96976c18038324dfd6e74ccb$var$VILLAGE_ID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(window.location.search);
  const $a1e110fd96976c18038324dfd6e74ccb$var$LAST_CONQUER_QUERY = "\n    query ennoblements($server: String!, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n        ennoblements(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n";
  const $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $offset: Int, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
  const $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_PER_PAGE = 15;
  const $a1e110fd96976c18038324dfd6e74ccb$var$CURR_SERVER_CONFIG = "\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n              speed\n            }\n            unitConfig {\n              spear {\n                pop\n              }\n              sword {\n                pop\n              }\n              axe {\n                pop\n              }\n              archer {\n                pop\n              }\n              spy {\n                pop\n              }\n              light {\n                pop\n              }\n              marcher {\n                pop\n              }\n              heavy {\n                pop\n              }\n              ram {\n                pop\n              }\n              catapult {\n                pop\n              }\n              knight {\n                pop\n              }\n              snob {\n                pop\n              }\n            }\n        }\n    }\n";
  const $a1e110fd96976c18038324dfd6e74ccb$var$SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_village_profile_server_cfg';
  const $a1e110fd96976c18038324dfd6e74ccb$var$actionContainer = document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
  const $a1e110fd96976c18038324dfd6e74ccb$var$additionalInfoContainer = document.querySelector('#content_value table.vis tbody');
  let $a1e110fd96976c18038324dfd6e74ccb$var$serverConfig = {};
  const $a1e110fd96976c18038324dfd6e74ccb$var$translations = $f8d29f6173b6f6da192c32aafce06dad$export$default();
  const $a1e110fd96976c18038324dfd6e74ccb$var$loadConfigFromLocalStorage = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($a1e110fd96976c18038324dfd6e74ccb$var$SERVER_CONFIG_LOCAL_STORAGE_KEY);
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$cacheServerConfig = function cacheServerConfig() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($a1e110fd96976c18038324dfd6e74ccb$var$SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$isConfigExpired = date => {
    return Math.abs(date.getTime() - new Date().getTime()) > 1000 * 60 * 60 * 24;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$loadConfig = async () => {
    let data = $a1e110fd96976c18038324dfd6e74ccb$var$loadConfigFromLocalStorage();
    if (!data.server || $a1e110fd96976c18038324dfd6e74ccb$var$isConfigExpired(new Date(data.loadedAt)) || !data.server.unitConfig || !data.server.config) {
      data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $a1e110fd96976c18038324dfd6e74ccb$var$CURR_SERVER_CONFIG,
        variables: {
          key: $a1e110fd96976c18038324dfd6e74ccb$var$SERVER
        }
      });
      data.loadedAt = new Date();
      $a1e110fd96976c18038324dfd6e74ccb$var$cacheServerConfig(data);
    }
    return data.server;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$loadPageData = async () => {
    let data = await $3af05e958b2a20a26445518aba292c50$export$default({
      query: $a1e110fd96976c18038324dfd6e74ccb$var$LAST_CONQUER_QUERY,
      variables: {
        server: $a1e110fd96976c18038324dfd6e74ccb$var$SERVER,
        filter: {
          villageID: [$a1e110fd96976c18038324dfd6e74ccb$var$VILLAGE_ID]
        },
        sort: ['ennobledAt DESC'],
        limit: 1
      }
    });
    return data;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$handleShowTribeEnnoblementsClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_QUERY,
        variables: {
          filter: {
            villageID: [$a1e110fd96976c18038324dfd6e74ccb$var$VILLAGE_ID]
          },
          offset: $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_PER_PAGE,
          sort: ['ennobledAt DESC'],
          server: $a1e110fd96976c18038324dfd6e74ccb$var$SERVER
        }
      });
      $88f173be92b23fde3128f694442fe0ce$export$default(e, data.ennoblements, {
        currentPage: page,
        limit: $a1e110fd96976c18038324dfd6e74ccb$var$ENNOBLEMENTS_PER_PAGE,
        onPageChange: $a1e110fd96976c18038324dfd6e74ccb$var$handleShowTribeEnnoblementsClick
      });
    }
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$buildCellsForIncSupport = units => {
    const cells = [];
    let pop = 0;
    for (let unit in units) {
      pop += units[unit] * $a1e110fd96976c18038324dfd6e74ccb$var$serverConfig.unitConfig[unit].pop;
      cells.push(("<td>").concat(units[unit].toLocaleString(), "</td>"));
    }
    cells.push(("<td><strong>").concat(pop.toLocaleString(), "</strong></td>"));
    return cells;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$handleCountIncomingSupportClick = async e => {
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
    const allySupport = $a1e110fd96976c18038324dfd6e74ccb$var$_objectSpread({}, mySupport);
    const total = $a1e110fd96976c18038324dfd6e74ccb$var$_objectSpread({}, mySupport);
    for (let i = 0; i < ids.length; i++) {
      Dialog.show('incomingSupport', ("").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.loaded, ": <strong>").concat(i, " / ").concat(ids.length, "</strong>"));
      const id = ids[i];
      const url = TribalWars.buildURL('', {
        screen: 'info_command',
        ajax: 'details',
        id
      });
      try {
        const resp = await fetch(url);
        const {units} = await resp.json();
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
        await $393a22f746cd1f6e45eff96c71b28370$export$default(200);
      } catch (error) {
        console.log('count incoming support', error);
      }
    }
    const ths = ['<th></th>'];
    for (let unit in mySupport) {
      ths.push(("<th><img src=\"").concat($a2d6afca3e99a4c1d795f97cc5f14c0b$export$default(unit), "\" /></th>"));
    }
    ths.push(("<th>").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.pop, "</th>"));
    const mySupportCells = [("<th>").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.mySupport, "</th>"), ...$a1e110fd96976c18038324dfd6e74ccb$var$buildCellsForIncSupport(mySupport)];
    const allySupportCells = [("<th>").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.allySupport, "</th>"), ...$a1e110fd96976c18038324dfd6e74ccb$var$buildCellsForIncSupport(allySupport)];
    const totalCells = [("<th>").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.total, "</th>"), ...$a1e110fd96976c18038324dfd6e74ccb$var$buildCellsForIncSupport(total)];
    Dialog.show('incomingSupport', ("\n    <table class=\"vis\" style=\"width: 100%;\">\n      <tbody>\n          <tr>\n            ").concat(ths.join(''), "\n          </tr>\n          <tr>\n            ").concat(mySupportCells.join(''), "\n          </tr>\n          <tr>\n            ").concat(allySupportCells.join(''), "\n          </tr>\n          <tr>\n            ").concat(totalCells.join(''), "\n          </tr>\n      </tbody>\n    </table>\n  "));
    const popup = document.querySelector('.popup_box');
    if (popup) {
      popup.style.width = 'auto';
      popup.style.maxWidth = '900px';
    }
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$wrapAction = action => {
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$renderActions = () => {
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $d147509fefd1cb8b3b83e8f38f763543$export$buildVillageURL($1f14636dcc53402ba1b7661b758ca0aa$export$default($a1e110fd96976c18038324dfd6e74ccb$var$SERVER), $a1e110fd96976c18038324dfd6e74ccb$var$SERVER, $a1e110fd96976c18038324dfd6e74ccb$var$VILLAGE_ID);
    linkToTWHelp.innerHTML = $a1e110fd96976c18038324dfd6e74ccb$var$translations.action.linkToTWHelp;
    $a1e110fd96976c18038324dfd6e74ccb$var$actionContainer.appendChild($a1e110fd96976c18038324dfd6e74ccb$var$wrapAction(linkToTWHelp));
    const showEnnoblementsPopup = document.createElement('a');
    showEnnoblementsPopup.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showEnnoblementsPopup, '1');
    showEnnoblementsPopup.innerHTML = $a1e110fd96976c18038324dfd6e74ccb$var$translations.action.showEnnoblements;
    showEnnoblementsPopup.addEventListener('click', $a1e110fd96976c18038324dfd6e74ccb$var$handleShowTribeEnnoblementsClick);
    $a1e110fd96976c18038324dfd6e74ccb$var$actionContainer.appendChild($a1e110fd96976c18038324dfd6e74ccb$var$wrapAction(showEnnoblementsPopup));
    const countIncomingSupport = document.createElement('a');
    countIncomingSupport.href = '#';
    countIncomingSupport.innerHTML = $a1e110fd96976c18038324dfd6e74ccb$var$translations.action.countIncomingSupport;
    countIncomingSupport.addEventListener('click', $a1e110fd96976c18038324dfd6e74ccb$var$handleCountIncomingSupportClick);
    $a1e110fd96976c18038324dfd6e74ccb$var$actionContainer.appendChild($a1e110fd96976c18038324dfd6e74ccb$var$wrapAction(countIncomingSupport));
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$renderTr = _ref => {
    let {title, data, id} = _ref;
    let tr = document.querySelector('#' + id);
    if (!tr) {
      tr = document.createElement('tr');
      tr.id = id;
      tr.appendChild(document.createElement('td'));
      tr.appendChild(document.createElement('td'));
      $a1e110fd96976c18038324dfd6e74ccb$var$additionalInfoContainer.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
  };
  const $a1e110fd96976c18038324dfd6e74ccb$var$countUnitsInVillage = () => {
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
  const $a1e110fd96976c18038324dfd6e74ccb$var$renderAdditionalInfo = function renderAdditionalInfo() {
    let {config, ennoblements} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const firstEnnoblement = ennoblements && Array.isArray(ennoblements.items) && ennoblements.items[0] ? ennoblements.items[0] : undefined;
    $a1e110fd96976c18038324dfd6e74ccb$var$renderTr({
      id: 'loyalty',
      title: ("").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.possibleLoyalty, ":"),
      data: firstEnnoblement ? $497794f7ecdac1fd2ccb9495447c64f0$export$default(new Date(firstEnnoblement.ennobledAt), config.speed) : 100
    });
    $a1e110fd96976c18038324dfd6e74ccb$var$renderTr({
      id: 'ennobledAt',
      title: ("").concat($a1e110fd96976c18038324dfd6e74ccb$var$translations.ennobledAt, ":"),
      data: firstEnnoblement ? $87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(firstEnnoblement.ennobledAt) : $a1e110fd96976c18038324dfd6e74ccb$var$translations.never
    });
    try {
      const units = $a1e110fd96976c18038324dfd6e74ccb$var$countUnitsInVillage();
      const tr = document.createElement('tr');
      tr.style.textAlign = 'center';
      tr.style.fontWeight = 'bold';
      tr.appendChild(document.createElement('td'));
      units.forEach(count => {
        const td = document.createElement('td');
        td.innerHTML = count;
        tr.appendChild(td);
      });
      document.querySelector('#content_value > div tbody').appendChild(tr);
    } catch (error) {}
  };
  (async function () {
    try {
      const pageData = await $a1e110fd96976c18038324dfd6e74ccb$var$loadPageData();
      $a1e110fd96976c18038324dfd6e74ccb$var$serverConfig = await $a1e110fd96976c18038324dfd6e74ccb$var$loadConfig();
      $a1e110fd96976c18038324dfd6e74ccb$var$renderAdditionalInfo({
        config: $a1e110fd96976c18038324dfd6e74ccb$var$serverConfig.config,
        ennoblements: pageData.ennoblements
      });
      $a1e110fd96976c18038324dfd6e74ccb$var$renderActions();
    } catch (error) {
      console.log('extended village profile', error);
    }
  })();
})();

