(function () {
function $6a49e4c969cec444$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


function $f1e9793517c51c58$export$2e2bcd8739ae039(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            $6a49e4c969cec444$export$2e2bcd8739ae039(target, key, source[key]);
        });
    }
    return target;
}

function $b1520df0e3a4699c$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}


function $f26b272b176e5476$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {
    };
    var target = $b1520df0e3a4699c$export$2e2bcd8739ae039(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}



function $70df79293cae00de$export$2e2bcd8739ae039(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) return NaN;
    var number = Number(dirtyNumber);
    if (isNaN(number)) return number;
    return number < 0 ? Math.ceil(number) : Math.floor(number);
}



function $14473fdd7558f621$export$2e2bcd8739ae039(required, args) {
    if (args.length < required) throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
}


function $cef0ab118a15bdd4$export$2e2bcd8739ae039(argument) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var argStr = Object.prototype.toString.call(argument); // Clone the date
    if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
    else if (typeof argument === 'number' || argStr === '[object Number]') return new Date(argument);
    else {
        if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
            // eslint-disable-next-line no-console
            console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console
            console.warn(new Error().stack);
        }
        return new Date(NaN);
    }
}



function $b214e0d241adf6d7$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var timestamp = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate).getTime();
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    return new Date(timestamp + amount);
}



var $76d93d3ec05eed83$var$MILLISECONDS_IN_MINUTE = 60000;
function $76d93d3ec05eed83$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    return $b214e0d241adf6d7$export$2e2bcd8739ae039(dirtyDate, amount * $76d93d3ec05eed83$var$MILLISECONDS_IN_MINUTE);
}


const $f2fe9362d0defd49$var$translations = {
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
var $f2fe9362d0defd49$export$2e2bcd8739ae039 = ()=>$f2fe9362d0defd49$var$translations[window.game_data.locale] || $f2fe9362d0defd49$var$translations.en_DK
;


const $902f167bfdc7b30b$export$fb18762d0c18fa09 = 'https://api.tribalwarshelp.com/graphql';
var $902f167bfdc7b30b$export$2e2bcd8739ae039 = ({ query: query , variables: variables = {
}  } = {
})=>{
    return fetch($902f167bfdc7b30b$export$fb18762d0c18fa09, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            variables: variables
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        return res.json();
    }).then(({ data: data , errors: errors  })=>{
        if (errors && Array.isArray(errors) && errors.length > 0) throw new Error(errors[0].message);
        return new Promise((resolve)=>resolve(data)
        );
    });
};


const $ca7593443ca49f96$export$17201263355d526a = (d = new Date(), tz = 'UTC')=>{
    return new Date(new Date(d).toLocaleString('en-US', {
        timeZone: tz
    }));
};
const $ca7593443ca49f96$export$6a20e8f386d90a85 = (d = new Date())=>{
    return $ca7593443ca49f96$export$17201263355d526a(d);
};
const $ca7593443ca49f96$export$3ae94a2503e890a1 = (date, options)=>{
    return new Date(date).toLocaleDateString(undefined, options ? options : {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


const $8f952366ce71d0fe$export$6e378131ceaf17af = (x1, y1, x2, y2)=>{
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
};


const $db1dd60e5389e0c9$export$7345792e21cfc457 = (id)=>{
    return window.location.origin + TribalWars.buildURL('', {
        screen: 'info_ally',
        id: id
    });
};
const $db1dd60e5389e0c9$export$3df7b9b48f38839e = (id)=>{
    return window.location.origin + TribalWars.buildURL('', {
        screen: 'info_player',
        id: id
    });
};
const $db1dd60e5389e0c9$export$e537a41a0fc85cc5 = (id)=>{
    return window.location.origin + TribalWars.buildURL('', {
        screen: 'info_village',
        id: id
    });
};
const $db1dd60e5389e0c9$export$c6f77ec2633c38b1 = (n = '', x = 500, y = 500)=>{
    const continent = 'K' + String(y)[0] + String(x)[0];
    return `${n} (${x}|${y}) ${continent}`;
};
const $db1dd60e5389e0c9$export$893530ca1c0f63a2 = (distance, baseSpeed)=>{
    return Math.round(distance * baseSpeed);
};
const $db1dd60e5389e0c9$export$8b4b6650247854da = (img)=>{
    return image_base + img;
};


var $3cc0f054d48dddd4$export$2e2bcd8739ae039 = (unit)=>{
    return $db1dd60e5389e0c9$export$8b4b6650247854da(`unit/unit_${unit}.png`);
};


const $362bcac9fa8968ec$export$f92dfeb71e9bb569 = (key, d = {
})=>{
    const json = localStorage.getItem(key);
    let obj = d;
    if (json) obj = JSON.parse(json);
    return obj;
};
const $362bcac9fa8968ec$export$8a8216c44337cd5 = (key, payload)=>{
    localStorage.setItem(key, JSON.stringify(payload));
};





function $0efd46ae48a1111f$export$2e2bcd8739ae039(dirtyDateLeft, dirtyDateRight) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var dateLeft = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDateLeft);
    var dateRight = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDateRight);
    return dateLeft.getTime() - dateRight.getTime();
}



var $d8d089e636d25180$var$MILLISECONDS_IN_MINUTE = 60000;
function $d8d089e636d25180$export$2e2bcd8739ae039(dirtyDateLeft, dirtyDateRight) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var diff = $0efd46ae48a1111f$export$2e2bcd8739ae039(dirtyDateLeft, dirtyDateRight) / $d8d089e636d25180$var$MILLISECONDS_IN_MINUTE;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}


const $8e88e9cb6c51e781$var$calcLoyalty = (ennobledAt, speed)=>{
    let loyalty = 25 + Math.abs($d8d089e636d25180$export$2e2bcd8739ae039(ennobledAt, new Date())) * (speed / 60);
    if (loyalty > 100) loyalty = 100;
    return Math.floor(loyalty);
};
var $8e88e9cb6c51e781$export$2e2bcd8739ae039 = $8e88e9cb6c51e781$var$calcLoyalty;


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
const $0037f5ff61114eb0$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $0037f5ff61114eb0$var$CURR_SERVER_CONFIG = `
    query server($key: String!) {
        server(key: $key) {
            config {
                speed
                unitSpeed
                snob {
                  maxDist
                }
            }
            unitConfig {
              spear {
                speed
              }
              sword {
                speed
              }
              axe {
                speed
              }
              archer {
                speed
              }
              spy {
                speed
              }
              light {
                speed
              }
              marcher {
                speed
              }
              heavy {
                speed
              }
              ram {
                speed
              }
              catapult {
                speed
              }
              knight {
                speed
              }
              snob {
                speed
              }
            }
        }
    }
`;
const $0037f5ff61114eb0$var$LAST_CONQUER_QUERY = `
    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {
        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {
            items {
                ennobledAt
                village {
                    id
                }
            }
        }
    }
`;
const $0037f5ff61114eb0$var$SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_map_popup_server_cfg';
const $0037f5ff61114eb0$var$translations = $f2fe9362d0defd49$export$2e2bcd8739ae039();
const $0037f5ff61114eb0$var$loadConfigFromLocalStorage = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($0037f5ff61114eb0$var$SERVER_CONFIG_LOCAL_STORAGE_KEY);
};
const $0037f5ff61114eb0$var$cacheServerConfig = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($0037f5ff61114eb0$var$SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};
const $0037f5ff61114eb0$var$isConfigExpired = (date)=>{
    return Math.abs(date.getTime() - new Date().getTime()) > 86400000;
};
const $0037f5ff61114eb0$var$loadConfig = async ()=>{
    let data = $0037f5ff61114eb0$var$loadConfigFromLocalStorage();
    if (!data || !data.server || $0037f5ff61114eb0$var$isConfigExpired(new Date(data.loadedAt)) || !data.server.config || !data.server.config.speed || !data.server.config.snob || !data.server.config.snob.maxDist || !data.server.config.unitSpeed || !data.server.unitConfig) {
        data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $0037f5ff61114eb0$var$CURR_SERVER_CONFIG,
            variables: {
                key: $0037f5ff61114eb0$var$SERVER
            }
        });
        data.loadedAt = new Date();
        $0037f5ff61114eb0$var$cacheServerConfig(data);
    }
    return data && data.server && data.server.config ? {
        config: data.server.config,
        unitConfig: data.server.unitConfig
    } : {
    };
};
const $0037f5ff61114eb0$var$loadVillageData = async (id, { cacheOnly: cacheOnly = false  } = {
})=>{
    if (!id) return;
    if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) return TWMap.popup.extendedMapPopupCache[id];
    try {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $0037f5ff61114eb0$var$LAST_CONQUER_QUERY,
            variables: {
                server: $0037f5ff61114eb0$var$SERVER,
                sort: [
                    'ennobledAt DESC'
                ],
                filter: {
                    villageID: [
                        id
                    ]
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
const $0037f5ff61114eb0$var$getAvailableUnits = (unitCfg = {
})=>{
    const units = [];
    for(let unit in unitCfg)if (unitCfg[unit].speed !== 0) units.push($f1e9793517c51c58$export$2e2bcd8739ae039({
    }, unitCfg[unit], {
        name: unit,
        img: $3cc0f054d48dddd4$export$2e2bcd8739ae039(unit)
    }));
    return units;
};
const $0037f5ff61114eb0$var$getUnitTdBgColor = (index)=>index % 2 === 0 ? '#f8f4e8' : '#ded3b9;'
;
const $0037f5ff61114eb0$var$buildUnitHeader = (unit, index)=>{
    return `
    <td style="padding: 2px; background-color: ${$0037f5ff61114eb0$var$getUnitTdBgColor(index)};">
      <img
        src="${unit.img}"
        title="${unit.name}"
        alt="${unit.name}"
      />
    </td>
  `;
};
const $0037f5ff61114eb0$var$buildUnitArrivalInfo = (t, index)=>{
    return `
    <td style="padding: 2px; background-color: ${$0037f5ff61114eb0$var$getUnitTdBgColor(index)};">
      ${$ca7593443ca49f96$export$3ae94a2503e890a1($76d93d3ec05eed83$export$2e2bcd8739ae039(Timing.getCurrentServerTime(), t))}
    </td>
  `;
};
const $0037f5ff61114eb0$var$renderAdditionalInfo = (id, data, { config: config , unitConfig: unitConfig  })=>{
    const coords = TWMap.CoordByXY(TWMap.villageKey[id]);
    const distance = $8f952366ce71d0fe$export$6e378131ceaf17af(coords[0], coords[1], window.game_data.village.x, window.game_data.village.y);
    const ennoblement = data && data.ennoblements && data.ennoblements.items && data.ennoblements.items.length > 0 ? data.ennoblements.items[0] : undefined;
    const parent = document.querySelector('#map_popup #info_content tbody');
    let unitsEl = parent.querySelector('#units');
    if (!unitsEl) {
        unitsEl = document.createElement('tr');
        unitsEl.id = 'units';
        parent.appendChild(unitsEl);
    }
    const units = $0037f5ff61114eb0$var$getAvailableUnits(unitConfig);
    unitsEl.innerHTML = `
          <td colspan="2">
            <table style="border: 1px solid #ded3b9; max-width: 450px;"
              width="100%"
              cellpadding="0"
              cellspacing="0">
              <tbody>
                <tr class="center">
                  ${units.map($0037f5ff61114eb0$var$buildUnitHeader).join('')}
                </tr>
                <tr class="center">
                  ${units.map((unit, index)=>{
        return $0037f5ff61114eb0$var$buildUnitArrivalInfo($db1dd60e5389e0c9$export$893530ca1c0f63a2(distance, unit.speed), index);
    }).join('')}
                </tr>
              </tbody>
            </table>
          </td>
      `;
    let lastEnnobledAt = parent.querySelector('#lastEnnobledAt');
    if (!lastEnnobledAt) {
        lastEnnobledAt = document.createElement('tr');
        lastEnnobledAt.id = 'lastEnnobledAt';
        parent.appendChild(lastEnnobledAt);
    }
    lastEnnobledAt.innerHTML = `
          <td>
              ${$0037f5ff61114eb0$var$translations.ennobledAt}:
          </td>
          <td>
              ${ennoblement ? $ca7593443ca49f96$export$3ae94a2503e890a1(ennoblement.ennobledAt) : $0037f5ff61114eb0$var$translations.never}
          </td>
      `;
    let loyalty = parent.querySelector('#loyalty');
    if (!loyalty) {
        loyalty = document.createElement('tr');
        loyalty.id = 'loyalty';
        parent.appendChild(loyalty);
    }
    loyalty.innerHTML = `
          <td>
              ${$0037f5ff61114eb0$var$translations.possibleLoyalty}:
          </td>
          <td>
              ${ennoblement ? $8e88e9cb6c51e781$export$2e2bcd8739ae039(new Date(ennoblement.ennobledAt), config.speed) : 100}
          </td>
      `;
    let canSendNoble = parent.querySelector('#canSendNoble');
    if (!canSendNoble) {
        canSendNoble = document.createElement('tr');
        canSendNoble.id = 'canSendNoble';
        parent.appendChild(canSendNoble);
    }
    canSendNoble.innerHTML = `
          <td>
              ${$0037f5ff61114eb0$var$translations.canSendNoble}:
          </td>
          <td>
              ${distance < config.snob.maxDist ? $0037f5ff61114eb0$var$translations.yes : $0037f5ff61114eb0$var$translations.no}
          </td>
      `;
};
const $0037f5ff61114eb0$var$createLoadVillageHandler = (cfg)=>async (e)=>{
        TWMap.popup._loadVillage(e);
        const data = await $0037f5ff61114eb0$var$loadVillageData(parseInt(e));
        if (data) $0037f5ff61114eb0$var$renderAdditionalInfo(parseInt(e), data, cfg);
    }
;
const $0037f5ff61114eb0$var$createDisplayForVillageHandler = (cfg)=>async (e, a, t)=>{
        TWMap.popup._displayForVillage(e, a, t);
        const data = await $0037f5ff61114eb0$var$loadVillageData(parseInt(e.id), {
            cacheOnly: window.game_data.features.Premium.active
        });
        if (data) $0037f5ff61114eb0$var$renderAdditionalInfo(parseInt(e.id), data, cfg);
    }
;
(async function() {
    try {
        const configs = await $0037f5ff61114eb0$var$loadConfig();
        TWMap.popup.extendedMapPopupCache = {
        };
        TWMap.popup._loadVillage = TWMap.popup.loadVillage;
        TWMap.popup.loadVillage = $0037f5ff61114eb0$var$createLoadVillageHandler(configs);
        TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
        TWMap.popup.displayForVillage = $0037f5ff61114eb0$var$createDisplayForVillageHandler(configs);
    } catch (error) {
        console.log('extended map popup', error);
    }
})();

})();
