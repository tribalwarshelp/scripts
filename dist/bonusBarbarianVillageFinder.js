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


const $71f792443ec67043$var$translations = {
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
var $71f792443ec67043$export$2e2bcd8739ae039 = ()=>$71f792443ec67043$var$translations[window.game_data.locale] || $71f792443ec67043$var$translations.en_DK
;


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
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


const $8f952366ce71d0fe$export$6e378131ceaf17af = (x1, y1, x2, y2)=>{
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
};


// ==UserScript==
// @name         Bonus barbarian village finder
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/bonusBarbarianVillageFinder.js
// @version      0.4.7
// @description  Bonus barbarian village finder
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const $0e40ff93e5ed20a5$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $0e40ff93e5ed20a5$var$QUERY = `
  query villages($server: String!, $filter: VillageFilter, $sort: [String!], $offset: Int) {
    villages(server: $server, filter: $filter, offset: $offset, sort: $sort) {
      total
      items {
        id
        name
        bonus
        x
        y
      }
    }
  }
`;
const $0e40ff93e5ed20a5$var$TABLE_ID = 'bonusBarbarianVillageFinderTable';
const $0e40ff93e5ed20a5$var$ACTUAL_COORDS_ID = 'actualCoords';
const $0e40ff93e5ed20a5$var$translations = $71f792443ec67043$export$2e2bcd8739ae039();
let $0e40ff93e5ed20a5$var$container = undefined;
const $0e40ff93e5ed20a5$var$buildReqOptions = (bonus, offset)=>{
    return {
        query: $0e40ff93e5ed20a5$var$QUERY,
        variables: {
            server: $0e40ff93e5ed20a5$var$SERVER,
            sort: [
                'id DESC'
            ],
            filter: {
                bonus: bonus,
                playerID: [
                    0
                ]
            },
            offset: offset
        }
    };
};
const $0e40ff93e5ed20a5$var$loadBonusVillages = async (bonus)=>{
    const { villages: villages  } = await $902f167bfdc7b30b$export$2e2bcd8739ae039($0e40ff93e5ed20a5$var$buildReqOptions(bonus, 0));
    for(let i = villages.length; i < villages.total; i += 1000){
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039($0e40ff93e5ed20a5$var$buildReqOptions(bonus, 0));
        villages.items = [
            ...villages.items,
            ...data.villages.items
        ];
    }
    return villages;
};
const $0e40ff93e5ed20a5$var$searchBonusBarbarianVillages = async (e)=>{
    e.preventDefault();
    const villages = await $0e40ff93e5ed20a5$var$loadBonusVillages(parseInt(e.target[0].value));
    const coords = TWMap.pos;
    villages.items = villages.items.map((item)=>{
        return $f1e9793517c51c58$export$2e2bcd8739ae039({
        }, item, {
            distance: $8f952366ce71d0fe$export$6e378131ceaf17af(coords[0], coords[1], item.x, item.y)
        });
    }).sort((a, b)=>a.distance - b.distance
    );
    document.querySelector('#' + $0e40ff93e5ed20a5$var$TABLE_ID).innerHTML = $0e40ff93e5ed20a5$var$buildTableBodyHTML(villages.items);
};
const $0e40ff93e5ed20a5$var$getBonuses = ()=>{
    let bonuses = [];
    for(let i in TWMap.bonus_data)bonuses.push({
        value: i,
        text: TWMap.bonus_data[i].text
    });
    return bonuses;
};
const $0e40ff93e5ed20a5$var$buildTableBodyHTML = (villages)=>{
    return `
        <tbody>
            <tr>
                <th>
                    ${$0e40ff93e5ed20a5$var$translations.village}
                </th>
                <th>
                    ${$0e40ff93e5ed20a5$var$translations.distance}
                </th>
                <th>
                    ${$0e40ff93e5ed20a5$var$translations.action}
                </th>
            </tr>
            ${Array.isArray(villages) ? villages.map((village)=>`<tr>
                <td>
                    <a href="${$db1dd60e5389e0c9$export$e537a41a0fc85cc5(village.id)}">
                        ${$db1dd60e5389e0c9$export$c6f77ec2633c38b1(village.name, village.x, village.y)}
                    </a>
                </td>
                <td>
                    ${village.distance.toFixed(1)}
                </td>
                <td>
                    <a href="#" onclick="return TWMap.focusUserSpecified(${village.x}, ${village.y})">${$0e40ff93e5ed20a5$var$translations.center}</a>
                </td>
            </tr>`
    ).join('') : ''}
        </tbody>
    `;
};
const $0e40ff93e5ed20a5$var$updateActualCoords = ()=>{
    document.querySelector('#' + $0e40ff93e5ed20a5$var$ACTUAL_COORDS_ID).innerHTML = `${$0e40ff93e5ed20a5$var$translations.actualCoords}: <strong>${TWMap.pos.join('|')}</strong>`;
};
const $0e40ff93e5ed20a5$var$renderUI = ()=>{
    const html = `
        <p id="${$0e40ff93e5ed20a5$var$ACTUAL_COORDS_ID}"></p>
        <form>
            <select>
                ${$0e40ff93e5ed20a5$var$getBonuses().map((bonus)=>`<option value="${bonus.value}">${bonus.text}</option>`
    ).join('')}
            </select>
            <button type="submit">${$0e40ff93e5ed20a5$var$translations.searchBonusBarbarianVillages}</button>
        </form>
        <table class="vis" style="width: 100%;" id="${$0e40ff93e5ed20a5$var$TABLE_ID}">
            ${$0e40ff93e5ed20a5$var$buildTableBodyHTML()}
        </table>
    `;
    if (!$0e40ff93e5ed20a5$var$container) {
        $0e40ff93e5ed20a5$var$container = document.createElement('div');
        $0e40ff93e5ed20a5$var$container.classList.add('containerBorder');
        $0e40ff93e5ed20a5$var$container.style.clear = 'both';
        document.querySelector('#map_big').appendChild($0e40ff93e5ed20a5$var$container);
    }
    $0e40ff93e5ed20a5$var$container.innerHTML = html;
    $0e40ff93e5ed20a5$var$container.querySelector('form').addEventListener('submit', $0e40ff93e5ed20a5$var$searchBonusBarbarianVillages);
    $0e40ff93e5ed20a5$var$updateActualCoords();
    setInterval($0e40ff93e5ed20a5$var$updateActualCoords, 1000);
};
(function() {
    $0e40ff93e5ed20a5$var$renderUI();
})();

})();
