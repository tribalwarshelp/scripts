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
  const $3b197ddc404523dce25bd8470f854619$var$translations = {
    pl_PL: {
      actualCoords: 'Aktualne koordynaty',
      searchBonusBarbarianVillages: 'Wyszukaj koczownicze',
      village: 'Wioska',
      distance: 'Dystans',
      action: 'Akcja',
      center: 'Wycentruj'
    },
    en_DK: {
      actualCoords: 'Actual coords',
      searchBonusBarbarianVillages: 'Search bonus barbarian villages',
      village: 'Village',
      distance: 'Distance',
      action: 'Action',
      center: 'Center'
    },
    de_DE: {
      actualCoords: 'Aktuelle Koordinaten',
      searchBonusBarbarianVillages: 'Suche Bonus-Barbarendörfer',
      village: 'Dorf',
      distance: 'Distanz',
      action: 'Aktion',
      center: 'Center'
    }
  };
  var $3b197ddc404523dce25bd8470f854619$export$default = () => $3b197ddc404523dce25bd8470f854619$var$translations[window.game_data.locale] || $3b197ddc404523dce25bd8470f854619$var$translations.en_DK;
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
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
  const $3d57ea338a09b23ca4b283dff4f79ebd$export$calcDistanceBetweenTwoPoints = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  };
  function $61671ab24a4170eb0a1c7d9e6ffb22e6$var$ownKeys(object, enumerableOnly) {
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
  function $61671ab24a4170eb0a1c7d9e6ffb22e6$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $61671ab24a4170eb0a1c7d9e6ffb22e6$var$ownKeys(Object(source), true).forEach(function (key) {
          $61671ab24a4170eb0a1c7d9e6ffb22e6$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $61671ab24a4170eb0a1c7d9e6ffb22e6$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $61671ab24a4170eb0a1c7d9e6ffb22e6$var$_defineProperty(obj, key, value) {
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
  // @name         Bonus barbarian village finder
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
  // @version      0.4.6
  // @description  Bonus barbarian village finder
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=map*
  // @grant        none
  // ==/UserScript==
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$QUERY = "\n  query villages($server: String!, $filter: VillageFilter, $sort: [String!], $offset: Int) {\n    villages(server: $server, filter: $filter, offset: $offset, sort: $sort) {\n      total\n      items {\n        id\n        name\n        bonus\n        x\n        y\n      }\n    }\n  }\n";
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$TABLE_ID = 'bonusBarbarianVillageFinderTable';
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$ACTUAL_COORDS_ID = 'actualCoords';
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations = $3b197ddc404523dce25bd8470f854619$export$default();
  let $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container = undefined;
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildReqOptions = (bonus, offset) => {
    return {
      query: $61671ab24a4170eb0a1c7d9e6ffb22e6$var$QUERY,
      variables: {
        server: $61671ab24a4170eb0a1c7d9e6ffb22e6$var$SERVER,
        sort: ['id DESC'],
        filter: {
          bonus,
          playerID: [0]
        },
        offset
      }
    };
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$loadBonusVillages = async bonus => {
    const {villages} = await $3af05e958b2a20a26445518aba292c50$export$default($61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildReqOptions(bonus, 0));
    for (let i = villages.length; i < villages.total; i += 1000) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default($61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildReqOptions(bonus, 0));
      villages.items = [...villages.items, ...data.villages.items];
    }
    return villages;
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$searchBonusBarbarianVillages = async e => {
    e.preventDefault();
    const villages = await $61671ab24a4170eb0a1c7d9e6ffb22e6$var$loadBonusVillages(parseInt(e.target[0].value));
    const coords = TWMap.pos;
    villages.items = villages.items.map(item => {
      return $61671ab24a4170eb0a1c7d9e6ffb22e6$var$_objectSpread($61671ab24a4170eb0a1c7d9e6ffb22e6$var$_objectSpread({}, item), {}, {
        distance: $3d57ea338a09b23ca4b283dff4f79ebd$export$calcDistanceBetweenTwoPoints(coords[0], coords[1], item.x, item.y)
      });
    }).sort((a, b) => a.distance - b.distance);
    document.querySelector('#' + $61671ab24a4170eb0a1c7d9e6ffb22e6$var$TABLE_ID).innerHTML = $61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildTableBodyHTML(villages.items);
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$getBonuses = () => {
    let bonuses = [];
    for (let i in TWMap.bonus_data) {
      bonuses.push({
        value: i,
        text: TWMap.bonus_data[i].text
      });
    }
    return bonuses;
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildTableBodyHTML = villages => {
    return ("\n        <tbody>\n            <tr>\n                <th>\n                    ").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.village, "\n                </th>\n                <th>\n                    ").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.distance, "\n                </th>\n                <th>\n                    ").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.action, "\n                </th>\n            </tr>\n            ").concat(Array.isArray(villages) ? villages.map(village => ("<tr>\n                <td>\n                    <a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageURL(village.id), "\">\n                        ").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageName(village.name, village.x, village.y), "\n                    </a>\n                </td>\n                <td>\n                    ").concat(village.distance.toFixed(1), "\n                </td>\n                <td>\n                    <a href=\"#\" onclick=\"return TWMap.focusUserSpecified(").concat(village.x, ", ").concat(village.y, ")\">").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.center, "</a>\n                </td>\n            </tr>")).join('') : '', "\n        </tbody>\n    ");
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$updateActualCoords = () => {
    document.querySelector('#' + $61671ab24a4170eb0a1c7d9e6ffb22e6$var$ACTUAL_COORDS_ID).innerHTML = ("").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.actualCoords, ": <strong>").concat(TWMap.pos.join('|'), "</strong>");
  };
  const $61671ab24a4170eb0a1c7d9e6ffb22e6$var$renderUI = () => {
    const html = ("\n        <p id=\"").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$ACTUAL_COORDS_ID, "\"></p>\n        <form>\n            <select>\n                ").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$getBonuses().map(bonus => ("<option value=\"").concat(bonus.value, "\">").concat(bonus.text, "</option>")).join(''), "\n            </select>\n            <button type=\"submit\">").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$translations.searchBonusBarbarianVillages, "</button>\n        </form>\n        <table class=\"vis\" style=\"width: 100%;\" id=\"").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$TABLE_ID, "\">\n            ").concat($61671ab24a4170eb0a1c7d9e6ffb22e6$var$buildTableBodyHTML(), "\n        </table>\n    ");
    if (!$61671ab24a4170eb0a1c7d9e6ffb22e6$var$container) {
      $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container = document.createElement('div');
      $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container.classList.add('containerBorder');
      $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container.style.clear = 'both';
      document.querySelector('#map_big').appendChild($61671ab24a4170eb0a1c7d9e6ffb22e6$var$container);
    }
    $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container.innerHTML = html;
    $61671ab24a4170eb0a1c7d9e6ffb22e6$var$container.querySelector('form').addEventListener('submit', $61671ab24a4170eb0a1c7d9e6ffb22e6$var$searchBonusBarbarianVillages);
    $61671ab24a4170eb0a1c7d9e6ffb22e6$var$updateActualCoords();
    setInterval($61671ab24a4170eb0a1c7d9e6ffb22e6$var$updateActualCoords, 1000);
  };
  (function () {
    $61671ab24a4170eb0a1c7d9e6ffb22e6$var$renderUI();
  })();
})();

