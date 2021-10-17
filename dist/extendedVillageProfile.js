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


const $880b3d6f803ef712$var$translations = {
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
var $880b3d6f803ef712$export$2e2bcd8739ae039 = ()=>$880b3d6f803ef712$var$translations[window.game_data.locale] || $880b3d6f803ef712$var$translations.en_DK
;


const $57fe06ddde7dcd5d$var$ATTRIBUTE = 'data-page';
const $57fe06ddde7dcd5d$export$8947b11ec08f5f9d = ()=>{
    return 'display: flex; flex-direction: row; flex-wrap: wrap;';
};
const $57fe06ddde7dcd5d$export$5e830c5f3cd8a610 = (el, page = 1)=>{
    if (!el instanceof HTMLElement) throw new Error('Expected HTMLElement as the first argument');
    page = parseInt(page);
    if (typeof page !== 'number' || isNaN(page)) throw new Error('Expected number or string as the second argument');
    el.setAttribute($57fe06ddde7dcd5d$var$ATTRIBUTE, page + '');
};
const $57fe06ddde7dcd5d$export$c2a6433281518c91 = (el)=>{
    if (!el instanceof HTMLElement) return 0;
    return parseInt(el.getAttribute($57fe06ddde7dcd5d$var$ATTRIBUTE));
};
const $57fe06ddde7dcd5d$export$9b5e2cbbf1f8d8c4 = (total, limit)=>{
    if (typeof total !== 'number') throw new Error('Expected number as the first argument');
    if (typeof limit !== 'number') throw new Error('Expected number as the second argument');
    return total > 0 ? Math.ceil(total / limit) : 1;
};
const $57fe06ddde7dcd5d$export$58a42a77c71a7de0 = ({ total: total , limit: limit , marginRight: marginRight = 3 , currentPage: currentPage = 0 ,  } = {
})=>{
    const numberOfPages = $57fe06ddde7dcd5d$export$9b5e2cbbf1f8d8c4(total, limit);
    const paginationItems = [];
    for(let i = 1; i <= numberOfPages; i++)if (i === currentPage) paginationItems.push(`<strong style="margin-right: ${marginRight}px">>${i}<</strong>`);
    else paginationItems.push(`<a style="margin-right: ${marginRight}px" href="#" ${$57fe06ddde7dcd5d$var$ATTRIBUTE}="${i}">${i}</a>`);
    return paginationItems;
};


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


var $c1259165cf39ac5b$export$2e2bcd8739ae039 = (url)=>parseInt(new URLSearchParams(url).get('id'))
;


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


var $fc029eaf0e980c2d$export$2e2bcd8739ae039 = (t)=>new Promise((resolve)=>setTimeout(resolve, t)
    )
;


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


var $5b3edb3901c8177a$export$2e2bcd8739ae039 = (server = '')=>server.substr(0, 2)
;


const $f3b273bd698d94bc$export$ca6dda5263526f75 = 'tribalwarshelp.com';
const $f3b273bd698d94bc$export$5d5850cc00079a21 = (version = '', server = '')=>{
    return `https://${version}.${$f3b273bd698d94bc$export$ca6dda5263526f75}/server/${server}`;
};
const $f3b273bd698d94bc$export$a4588dcb88e3f9db = (version = '', server = '', id = 0, entity = '')=>{
    return `${$f3b273bd698d94bc$export$5d5850cc00079a21(version, server)}/${entity}/${id}`;
};
const $f3b273bd698d94bc$export$3df7b9b48f38839e = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'player');
};
const $f3b273bd698d94bc$export$7345792e21cfc457 = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'tribe');
};
const $f3b273bd698d94bc$export$e537a41a0fc85cc5 = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'village');
};


const $37476051484be03e$var$translations = {
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
var $37476051484be03e$export$2e2bcd8739ae039 = ()=>$37476051484be03e$var$translations[window.game_data.locale] || $37476051484be03e$var$translations.en_DK
;



const $20636c16dad2c11a$export$21d4bed11ae27f0b = '.popup_box';
const $20636c16dad2c11a$var$showPopup = ({ html: html , id: id , title: title  } = {
})=>{
    Dialog.show(id, `<h3>${title}</h3>` + html);
    const popup = document.querySelector($20636c16dad2c11a$export$21d4bed11ae27f0b);
    if (popup) {
        popup.style.width = 'auto';
        popup.style.maxWidth = '1000px';
    }
};
var $20636c16dad2c11a$export$2e2bcd8739ae039 = $20636c16dad2c11a$var$showPopup;




const $5d71a092de4ef3d0$var$PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
const $5d71a092de4ef3d0$var$translations = $37476051484be03e$export$2e2bcd8739ae039();
const $5d71a092de4ef3d0$var$getPlayerTd = (player, tribe)=>{
    if (player) return `<td><a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(player.id)}">${player.name} (${tribe ? `<a href="${$db1dd60e5389e0c9$export$7345792e21cfc457(tribe.id)}">${tribe.tag}</a>` : '-'})</a></td>`;
    return '<td>-</td>';
};
var $5d71a092de4ef3d0$export$2e2bcd8739ae039 = (e, ennoblements, { limit: limit = 0 , currentPage: currentPage = 1 , onPageChange: onPageChange = ()=>{
}  } = {
})=>{
    const paginationItems = $57fe06ddde7dcd5d$export$58a42a77c71a7de0({
        total: ennoblements.total,
        limit: limit,
        currentPage: currentPage
    });
    const html = `
    <div style="${$57fe06ddde7dcd5d$export$8947b11ec08f5f9d()}" id="${$5d71a092de4ef3d0$var$PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            ${$5d71a092de4ef3d0$var$translations.date}
          </th>
          <th>
            ${$5d71a092de4ef3d0$var$translations.village}
          </th>
          <th>
            ${$5d71a092de4ef3d0$var$translations.newOwner}
          </th>
          <th>
            ${$5d71a092de4ef3d0$var$translations.oldOwner}
          </th>
        </tr>
        ${ennoblements.items.map((ennoblement)=>{
        let rowHTML = '<tr>' + `<td>${$ca7593443ca49f96$export$3ae94a2503e890a1(ennoblement.ennobledAt)}</td>`;
        if (ennoblement.village) rowHTML += `<td><a href="${$db1dd60e5389e0c9$export$e537a41a0fc85cc5(ennoblement.village.id)}">${$db1dd60e5389e0c9$export$c6f77ec2633c38b1(ennoblement.village.name, ennoblement.village.x, ennoblement.village.y)}</a></td>`;
        else rowHTML += '<td>-</td>';
        rowHTML += $5d71a092de4ef3d0$var$getPlayerTd(ennoblement.newOwner, ennoblement.newOwnerTribe);
        rowHTML += $5d71a092de4ef3d0$var$getPlayerTd(ennoblement.oldOwner, ennoblement.oldOwnerTribe);
        return rowHTML + '</tr>';
    }).join('')}
      </tbody>
    </table>
  `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        e: e,
        title: $5d71a092de4ef3d0$var$translations.title,
        id: 'ennoblements',
        html: html
    });
    document.querySelectorAll('#' + $5d71a092de4ef3d0$var$PAGINATION_CONTAINER_ID + ' a').forEach((el)=>{
        el.addEventListener('click', onPageChange);
    });
};


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
const $5206cf4fa105cda6$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $5206cf4fa105cda6$var$VILLAGE_ID = $c1259165cf39ac5b$export$2e2bcd8739ae039(window.location.search);
const $5206cf4fa105cda6$var$LAST_CONQUER_QUERY = `
    query ennoblements($server: String!, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {
        ennoblements(server: $server, limit: $limit, sort: $sort, filter: $filter) {
            items {
                ennobledAt
                village {
                    id
                }
            }
        }
    }
`;
const $5206cf4fa105cda6$var$ENNOBLEMENTS_QUERY = `
    query ennoblements($server: String!, $offset: Int, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {
      ennoblements(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
        total
        items {
          village {
            id
            name
            x
            y
          }
          oldOwner {
            id
            name
          }
          oldOwnerTribe {
            id
            tag
          }
          newOwner {
            id
            name
          }
          newOwnerTribe {
            id
            tag
          }
          ennobledAt
        }
      }
    }
`;
const $5206cf4fa105cda6$var$ENNOBLEMENTS_PER_PAGE = 15;
const $5206cf4fa105cda6$var$CURR_SERVER_CONFIG = `
    query server($key: String!) {
        server(key: $key) {
            config {
              speed
            }
            unitConfig {
              spear {
                pop
              }
              sword {
                pop
              }
              axe {
                pop
              }
              archer {
                pop
              }
              spy {
                pop
              }
              light {
                pop
              }
              marcher {
                pop
              }
              heavy {
                pop
              }
              ram {
                pop
              }
              catapult {
                pop
              }
              knight {
                pop
              }
              snob {
                pop
              }
            }
        }
    }
`;
const $5206cf4fa105cda6$var$SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_village_profile_server_cfg';
const $5206cf4fa105cda6$var$actionContainer = document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
const $5206cf4fa105cda6$var$additionalInfoContainer = document.querySelector('#content_value table.vis tbody');
let $5206cf4fa105cda6$var$serverConfig = {
};
const $5206cf4fa105cda6$var$translations = $880b3d6f803ef712$export$2e2bcd8739ae039();
const $5206cf4fa105cda6$var$loadConfigFromLocalStorage = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($5206cf4fa105cda6$var$SERVER_CONFIG_LOCAL_STORAGE_KEY);
};
const $5206cf4fa105cda6$var$cacheServerConfig = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($5206cf4fa105cda6$var$SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};
const $5206cf4fa105cda6$var$isConfigExpired = (date)=>{
    return Math.abs(date.getTime() - new Date().getTime()) > 86400000;
};
const $5206cf4fa105cda6$var$loadConfig = async ()=>{
    let data = $5206cf4fa105cda6$var$loadConfigFromLocalStorage();
    if (!data.server || $5206cf4fa105cda6$var$isConfigExpired(new Date(data.loadedAt)) || !data.server.unitConfig || !data.server.config) {
        data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $5206cf4fa105cda6$var$CURR_SERVER_CONFIG,
            variables: {
                key: $5206cf4fa105cda6$var$SERVER
            }
        });
        data.loadedAt = new Date();
        $5206cf4fa105cda6$var$cacheServerConfig(data);
    }
    return data.server;
};
const $5206cf4fa105cda6$var$loadPageData = async ()=>{
    let data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $5206cf4fa105cda6$var$LAST_CONQUER_QUERY,
        variables: {
            server: $5206cf4fa105cda6$var$SERVER,
            filter: {
                villageID: [
                    $5206cf4fa105cda6$var$VILLAGE_ID
                ]
            },
            sort: [
                'ennobledAt DESC'
            ],
            limit: 1
        }
    });
    return data;
};
const $5206cf4fa105cda6$var$handleShowTribeEnnoblementsClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $5206cf4fa105cda6$var$ENNOBLEMENTS_QUERY,
            variables: {
                filter: {
                    villageID: [
                        $5206cf4fa105cda6$var$VILLAGE_ID
                    ]
                },
                offset: $5206cf4fa105cda6$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
                limit: $5206cf4fa105cda6$var$ENNOBLEMENTS_PER_PAGE,
                sort: [
                    'ennobledAt DESC'
                ],
                server: $5206cf4fa105cda6$var$SERVER
            }
        });
        $5d71a092de4ef3d0$export$2e2bcd8739ae039(e, data.ennoblements, {
            currentPage: page,
            limit: $5206cf4fa105cda6$var$ENNOBLEMENTS_PER_PAGE,
            onPageChange: $5206cf4fa105cda6$var$handleShowTribeEnnoblementsClick
        });
    }
};
const $5206cf4fa105cda6$var$buildCellsForIncSupport = (units)=>{
    const cells = [];
    let pop = 0;
    for(let unit in units){
        pop += units[unit] * $5206cf4fa105cda6$var$serverConfig.unitConfig[unit].pop;
        cells.push(`<td>${units[unit].toLocaleString()}</td>`);
    }
    cells.push(`<td><strong>${pop.toLocaleString()}</strong></td>`);
    return cells;
};
const $5206cf4fa105cda6$var$handleCountIncomingSupportClick = async (e)=>{
    e.preventDefault();
    const ids = [];
    const allyCommand = {
    };
    document.querySelectorAll('span.command_hover_details[data-command-type="support"]').forEach((el)=>{
        const id = parseInt(el.getAttribute('data-command-id'));
        if (el.classList.contains('commandicon-ally')) allyCommand[id] = true;
        else allyCommand[id] = false;
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
    const allySupport = $f1e9793517c51c58$export$2e2bcd8739ae039({
    }, mySupport);
    const total = $f1e9793517c51c58$export$2e2bcd8739ae039({
    }, mySupport);
    for(let i = 0; i < ids.length; i++){
        Dialog.show('incomingSupport', `${$5206cf4fa105cda6$var$translations.loaded}: <strong>${i} / ${ids.length}</strong>`);
        const id = ids[i];
        const url = TribalWars.buildURL('', {
            screen: 'info_command',
            ajax: 'details',
            id: id
        });
        try {
            const resp = await fetch(url);
            const { units: units  } = await resp.json();
            if (units) for(let unit in mySupport){
                const count = parseInt(units[unit].count);
                if (allyCommand[id]) allySupport[unit] += count;
                else mySupport[unit] += count;
                total[unit] += count;
            }
            await $fc029eaf0e980c2d$export$2e2bcd8739ae039(200);
        } catch (error) {
            console.log('count incoming support', error);
        }
    }
    const ths = [
        '<th></th>'
    ];
    for(let unit in mySupport)ths.push(`<th><img src="${$3cc0f054d48dddd4$export$2e2bcd8739ae039(unit)}" /></th>`);
    ths.push(`<th>${$5206cf4fa105cda6$var$translations.pop}</th>`);
    const mySupportCells = [
        `<th>${$5206cf4fa105cda6$var$translations.mySupport}</th>`,
        ...$5206cf4fa105cda6$var$buildCellsForIncSupport(mySupport), 
    ];
    const allySupportCells = [
        `<th>${$5206cf4fa105cda6$var$translations.allySupport}</th>`,
        ...$5206cf4fa105cda6$var$buildCellsForIncSupport(allySupport), 
    ];
    const totalCells = [
        `<th>${$5206cf4fa105cda6$var$translations.total}</th>`,
        ...$5206cf4fa105cda6$var$buildCellsForIncSupport(total), 
    ];
    Dialog.show('incomingSupport', `
    <table class="vis" style="width: 100%;">
      <tbody>
          <tr>
            ${ths.join('')}
          </tr>
          <tr>
            ${mySupportCells.join('')}
          </tr>
          <tr>
            ${allySupportCells.join('')}
          </tr>
          <tr>
            ${totalCells.join('')}
          </tr>
      </tbody>
    </table>
  `);
    const popup = document.querySelector('.popup_box');
    if (popup) {
        popup.style.width = 'auto';
        popup.style.maxWidth = '900px';
    }
};
const $5206cf4fa105cda6$var$wrapAction = (action)=>{
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
};
const $5206cf4fa105cda6$var$renderActions = ()=>{
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $f3b273bd698d94bc$export$e537a41a0fc85cc5($5b3edb3901c8177a$export$2e2bcd8739ae039($5206cf4fa105cda6$var$SERVER), $5206cf4fa105cda6$var$SERVER, $5206cf4fa105cda6$var$VILLAGE_ID);
    linkToTWHelp.innerHTML = $5206cf4fa105cda6$var$translations.action.linkToTWHelp;
    $5206cf4fa105cda6$var$actionContainer.appendChild($5206cf4fa105cda6$var$wrapAction(linkToTWHelp));
    const showEnnoblementsPopup = document.createElement('a');
    showEnnoblementsPopup.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showEnnoblementsPopup, '1');
    showEnnoblementsPopup.innerHTML = $5206cf4fa105cda6$var$translations.action.showEnnoblements;
    showEnnoblementsPopup.addEventListener('click', $5206cf4fa105cda6$var$handleShowTribeEnnoblementsClick);
    $5206cf4fa105cda6$var$actionContainer.appendChild($5206cf4fa105cda6$var$wrapAction(showEnnoblementsPopup));
    const countIncomingSupport = document.createElement('a');
    countIncomingSupport.href = '#';
    countIncomingSupport.innerHTML = $5206cf4fa105cda6$var$translations.action.countIncomingSupport;
    countIncomingSupport.addEventListener('click', $5206cf4fa105cda6$var$handleCountIncomingSupportClick);
    $5206cf4fa105cda6$var$actionContainer.appendChild($5206cf4fa105cda6$var$wrapAction(countIncomingSupport));
};
const $5206cf4fa105cda6$var$renderTr = ({ title: title , data: data , id: id  })=>{
    let tr = document.querySelector('#' + id);
    if (!tr) {
        tr = document.createElement('tr');
        tr.id = id;
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        $5206cf4fa105cda6$var$additionalInfoContainer.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
};
const $5206cf4fa105cda6$var$countUnitsInVillage = ()=>{
    const trs = document.querySelectorAll('#content_value > div tbody tr');
    const units = [];
    if (trs.length === 0) throw new Error();
    trs[0].querySelectorAll('.unit_link').forEach(()=>{
        units.push(0);
    });
    for(let i = 1; i < trs.length; i++){
        const tr = trs[i];
        tr.querySelectorAll('.unit-item').forEach((td, index)=>{
            units[index] += parseInt(td.innerHTML);
        });
    }
    return units;
};
const $5206cf4fa105cda6$var$renderAdditionalInfo = ({ config: config , ennoblements: ennoblements  } = {
})=>{
    const firstEnnoblement = ennoblements && Array.isArray(ennoblements.items) && ennoblements.items[0] ? ennoblements.items[0] : undefined;
    $5206cf4fa105cda6$var$renderTr({
        id: 'loyalty',
        title: `${$5206cf4fa105cda6$var$translations.possibleLoyalty}:`,
        data: firstEnnoblement ? $8e88e9cb6c51e781$export$2e2bcd8739ae039(new Date(firstEnnoblement.ennobledAt), config.speed) : 100
    });
    $5206cf4fa105cda6$var$renderTr({
        id: 'ennobledAt',
        title: `${$5206cf4fa105cda6$var$translations.ennobledAt}:`,
        data: firstEnnoblement ? $ca7593443ca49f96$export$3ae94a2503e890a1(firstEnnoblement.ennobledAt) : $5206cf4fa105cda6$var$translations.never
    });
    try {
        const units = $5206cf4fa105cda6$var$countUnitsInVillage();
        const tr = document.createElement('tr');
        tr.style.textAlign = 'center';
        tr.style.fontWeight = 'bold';
        tr.appendChild(document.createElement('td'));
        units.forEach((count)=>{
            const td = document.createElement('td');
            td.innerHTML = count;
            tr.appendChild(td);
        });
        document.querySelector('#content_value > div tbody').appendChild(tr);
    } catch (error) {
    }
};
(async function() {
    try {
        const pageData = await $5206cf4fa105cda6$var$loadPageData();
        $5206cf4fa105cda6$var$serverConfig = await $5206cf4fa105cda6$var$loadConfig();
        $5206cf4fa105cda6$var$renderAdditionalInfo({
            config: $5206cf4fa105cda6$var$serverConfig.config,
            ennoblements: pageData.ennoblements
        });
        $5206cf4fa105cda6$var$renderActions();
    } catch (error) {
        console.log('extended village profile', error);
    }
})();

})();
