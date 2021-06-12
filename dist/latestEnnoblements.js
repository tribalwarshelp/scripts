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
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
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
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
  };
  const $99c8891cf568d26204a670851b79ae0c$var$translations = {
    pl_PL: {
      showLatestEnnoblements: 'Pokaż najnowsze przejęcia',
      village: 'Wioska',
      newOwner: 'Nowy właściciel',
      newOwnerTribe: 'Plemię nowego właściciela',
      oldOwner: 'Poprzedni właściciel',
      oldOwnerTribe: 'Plemię poprzedniego właściciela',
      date: 'Data',
      filters: 'Filtry',
      apply: 'Zastosuj',
      ennoblements: 'Przejęcia',
      devNote: 'Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :).'
    },
    en_DK: {
      showLatestEnnoblements: 'Show the latest ennoblements',
      village: 'Village',
      newOwner: 'New owner',
      newOwnerTribe: 'New owner tribe',
      oldOwner: 'Old owner',
      oldOwnerTribe: 'Old owner tribe',
      filters: 'Filters',
      date: 'Date',
      apply: 'Apply',
      ennoblements: 'Ennoblements',
      devNote: "Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."
    },
    de_DE: {
      showLatestEnnoblements: 'Zeige letzten Adelungen',
      village: 'Dorf',
      newOwner: 'Neuer Besitzer',
      newOwnerTribe: 'Neuer Stamm',
      oldOwner: 'Alter Besitzer',
      oldOwnerTribe: 'Alter Stamm',
      filters: 'Filter',
      date: 'Datum',
      apply: 'Anwenden',
      ennoblements: 'Adelungen',
      devNote: "Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :)."
    }
  };
  var $99c8891cf568d26204a670851b79ae0c$export$default = () => $99c8891cf568d26204a670851b79ae0c$var$translations[window.game_data.locale] || $99c8891cf568d26204a670851b79ae0c$var$translations.en_DK;
  function $4b608a4f8bc414684a9ca9d86149295e$var$ownKeys(object, enumerableOnly) {
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
  function $4b608a4f8bc414684a9ca9d86149295e$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $4b608a4f8bc414684a9ca9d86149295e$var$ownKeys(Object(source), true).forEach(function (key) {
          $4b608a4f8bc414684a9ca9d86149295e$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $4b608a4f8bc414684a9ca9d86149295e$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $4b608a4f8bc414684a9ca9d86149295e$var$_defineProperty(obj, key, value) {
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
  // @name         The latest ennoblements
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
  // @version      1.1.1
  // @description  Shows the latest ennoblements
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*
  // @grant        none
  // @run-at       document-end
  // ==/UserScript==
  const $4b608a4f8bc414684a9ca9d86149295e$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $4b608a4f8bc414684a9ca9d86149295e$var$FILTER_FORM_ID = 'le_form';
  const $4b608a4f8bc414684a9ca9d86149295e$var$TABLE_ID = 'le_table';
  const $4b608a4f8bc414684a9ca9d86149295e$var$CACHE_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_cache';
  const $4b608a4f8bc414684a9ca9d86149295e$var$FILTERS_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_filter';
  const $4b608a4f8bc414684a9ca9d86149295e$var$ICON_URL = 'https://i.imgur.com/4WP4098.png';
  const $4b608a4f8bc414684a9ca9d86149295e$var$query = "\n    query ennoblements($server: String!, $sort: [String!], $limit: Int) {\n      ennoblements(server: $server, sort: $sort, limit: $limit) {\n        items {\n          newOwner {\n            id\n            name\n            tribe {\n              id\n              name\n              tag\n            }\n          }\n          oldOwner {\n            id\n            name\n            tribe {\n              id\n              name\n              tag\n            }\n          }\n          ennobledAt\n          village {\n            id\n            name\n            x\n            y\n          }\n        }\n      }\n    }\n  ";
  const $4b608a4f8bc414684a9ca9d86149295e$var$DEFAULT_FILTER = {
    newOwner: '',
    newOwnerTribe: '',
    oldOwner: '',
    oldOwnerTribe: ''
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$translations = $99c8891cf568d26204a670851b79ae0c$export$default();
  const $4b608a4f8bc414684a9ca9d86149295e$var$loadLatestEnnoblementsFromCache = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($4b608a4f8bc414684a9ca9d86149295e$var$CACHE_LOCAL_STORAGE_KEY);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$loadFilters = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($4b608a4f8bc414684a9ca9d86149295e$var$FILTERS_LOCAL_STORAGE_KEY);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$cacheEnnoblements = function cacheEnnoblements() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($4b608a4f8bc414684a9ca9d86149295e$var$CACHE_LOCAL_STORAGE_KEY, data);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$cacheFilters = function cacheFilters() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($4b608a4f8bc414684a9ca9d86149295e$var$FILTERS_LOCAL_STORAGE_KEY, data);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$loadLatestEnnoblements = () => {
    return $3af05e958b2a20a26445518aba292c50$export$default({
      query: $4b608a4f8bc414684a9ca9d86149295e$var$query,
      variables: {
        server: $4b608a4f8bc414684a9ca9d86149295e$var$SERVER,
        limit: 50,
        sort: ['ennobledAt DESC']
      }
    }).then(data => {
      $4b608a4f8bc414684a9ca9d86149295e$var$cacheEnnoblements(data);
      return new Promise(resolve => resolve(data));
    });
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayer = (obj, searchValue) => {
    return obj && obj.name.toLowerCase().includes(searchValue.toLowerCase());
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayerTribe = (obj, searchValue) => {
    return obj && obj.tribe && (obj.tribe.name.toLowerCase().includes(searchValue.toLowerCase()) || obj.tribe.tag.toLowerCase().includes(searchValue.toLowerCase()));
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$filterEnnoblements = function filterEnnoblements() {
    let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let {newOwner, newOwnerTribe, oldOwner, oldOwnerTribe} = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return ennoblements.filter(ennoblement => {
      if (newOwner && !$4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayer(ennoblement.newOwner, newOwner)) {
        return false;
      }
      if (newOwnerTribe && !$4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayerTribe(ennoblement.newOwner, newOwnerTribe)) {
        return false;
      }
      if (oldOwner && !$4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayer(ennoblement.oldOwner, oldOwner)) {
        return false;
      }
      if (oldOwnerTribe && !$4b608a4f8bc414684a9ca9d86149295e$var$isValidPlayerTribe(ennoblement.oldOwner, oldOwnerTribe)) {
        return false;
      }
      return true;
    });
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$applyFilters = (e, ennoblements) => {
    e.preventDefault();
    const filters = $4b608a4f8bc414684a9ca9d86149295e$var$_objectSpread($4b608a4f8bc414684a9ca9d86149295e$var$_objectSpread({}, $4b608a4f8bc414684a9ca9d86149295e$var$DEFAULT_FILTER), {}, {
      newOwner: e.target[0].value,
      newOwnerTribe: e.target[1].value,
      oldOwner: e.target[2].value,
      oldOwnerTribe: e.target[3].value
    });
    document.querySelector(("#").concat($4b608a4f8bc414684a9ca9d86149295e$var$TABLE_ID, " tbody")).innerHTML = $4b608a4f8bc414684a9ca9d86149295e$var$buildEnnoblementsRows($4b608a4f8bc414684a9ca9d86149295e$var$filterEnnoblements(ennoblements, filters)).join('');
    $4b608a4f8bc414684a9ca9d86149295e$var$cacheFilters(filters);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$addEventListeners = function addEventListeners() {
    let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    document.querySelector('#' + $4b608a4f8bc414684a9ca9d86149295e$var$FILTER_FORM_ID).addEventListener('submit', e => {
      $4b608a4f8bc414684a9ca9d86149295e$var$applyFilters(e, ennoblements);
    });
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$getPlayerHTML = player => {
    return player && player.name ? ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(player.id), "\">").concat(player.name, "</a> (").concat(player.tribe && player.tribe.tag ? ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(player.tribe.id), "\">").concat(player.tribe.tag, "</a>") : '-', ")") : '-';
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$getVillageHTML = village => {
    return ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageURL(village.id), "\">").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageName(village.name, village.x, village.y), "</a>");
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$buildEnnoblementsRows = ennoblements => {
    return ennoblements.map(ennoblement => {
      return ("<tr>\n              <td>").concat($4b608a4f8bc414684a9ca9d86149295e$var$getVillageHTML(ennoblement.village), "</td>\n              <td>").concat($4b608a4f8bc414684a9ca9d86149295e$var$getPlayerHTML(ennoblement.newOwner), "</td>\n              <td>").concat($4b608a4f8bc414684a9ca9d86149295e$var$getPlayerHTML(ennoblement.oldOwner), "</td>\n              <td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(ennoblement.ennobledAt), "</td>\n            </tr>");
    });
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$renderLatestEnnoblements = function renderLatestEnnoblements() {
    let ennoblements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const prepared = $4b608a4f8bc414684a9ca9d86149295e$var$_objectSpread($4b608a4f8bc414684a9ca9d86149295e$var$_objectSpread({}, $4b608a4f8bc414684a9ca9d86149295e$var$DEFAULT_FILTER), filters);
    const html = ("\n        <form style=\"margin-bottom: 15px\" id=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$FILTER_FORM_ID, "\">\n        <h1 style=\"margin-bottom: 0px; text-align: center;\"><a href=\"").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage($1f14636dcc53402ba1b7661b758ca0aa$export$default($4b608a4f8bc414684a9ca9d86149295e$var$SERVER), $4b608a4f8bc414684a9ca9d86149295e$var$SERVER), "\">TWHelp</a></h1>\n            <h3 style=\"margin-bottom: 10px; margin-top: 0;\">").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.devNote, "</h3>\n          <h3 style=\"margin-bottom: 5px\">").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.filters, "</h3>\n          <input type=\"text\" placeholder=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.newOwner, "\" value=\"").concat(prepared.newOwner, "\" />\n          <input type=\"text\" placeholder=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.newOwnerTribe, "\" value=\"").concat(prepared.newOwnerTribe, "\" />\n          <input type=\"text\" placeholder=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.oldOwner, "\" value=\"").concat(prepared.oldOwner, "\" />\n          <input type=\"text\" placeholder=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.oldOwnerTribe, "\" value=\"").concat(prepared.oldOwnerTribe, "\" />\n          <div>\n            <button type=\"submit\">").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.apply, "</button>\n          </div>\n        </form>\n        <table class=\"vis\" id=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$TABLE_ID, "\" style=\"width: 100%\">\n          <thead>\n            <tr>\n              <th>").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.village, "</th>\n              <th>").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.newOwner, "</th>\n              <th>").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.oldOwner, "</th>\n              <th>").concat($4b608a4f8bc414684a9ca9d86149295e$var$translations.date, "</th>\n            </tr>\n          </thead>\n          <tbody>\n            ").concat($4b608a4f8bc414684a9ca9d86149295e$var$buildEnnoblementsRows($4b608a4f8bc414684a9ca9d86149295e$var$filterEnnoblements(ennoblements, prepared)).join(''), "\n          </tbody>\n        </table>\n        ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      title: $4b608a4f8bc414684a9ca9d86149295e$var$translations.ennoblements,
      id: 'ennoblements',
      html
    });
    $4b608a4f8bc414684a9ca9d86149295e$var$addEventListeners(ennoblements);
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$handleButtonClick = async () => {
    try {
      const cache = $4b608a4f8bc414684a9ca9d86149295e$var$loadLatestEnnoblementsFromCache();
      const filters = $4b608a4f8bc414684a9ca9d86149295e$var$loadFilters();
      if (cache.ennoblements && Array.isArray(cache.ennoblements.items) && cache.ennoblements.items.length > 0) {
        $4b608a4f8bc414684a9ca9d86149295e$var$renderLatestEnnoblements(cache.ennoblements.items, filters);
      }
      const {ennoblements} = await $4b608a4f8bc414684a9ca9d86149295e$var$loadLatestEnnoblements();
      $4b608a4f8bc414684a9ca9d86149295e$var$renderLatestEnnoblements(ennoblements.items, filters);
    } catch (error) {
      console.log('latestEnnoblements', error);
    }
  };
  const $4b608a4f8bc414684a9ca9d86149295e$var$renderButton = () => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '5px';
    container.style.left = '4px';
    container.style.zIndex = '50000';
    const button = document.createElement('a');
    button.innerHTML = ("<img src=\"").concat($4b608a4f8bc414684a9ca9d86149295e$var$ICON_URL, "\">");
    button.title = $4b608a4f8bc414684a9ca9d86149295e$var$translations.showLatestEnnoblements;
    button.style.cursor = 'pointer';
    button.addEventListener('click', $4b608a4f8bc414684a9ca9d86149295e$var$handleButtonClick);
    container.append(button);
    document.body.appendChild(container);
  };
  (function () {
    $4b608a4f8bc414684a9ca9d86149295e$var$renderButton();
  })();
})();

