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


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


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


var $5b3edb3901c8177a$export$2e2bcd8739ae039 = (server = '')=>server.substr(0, 2)
;


const $aa32efa5012345c3$var$translations = {
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
        devNote: `Information from the author - I've just launched a new stat tracking website, don't forget to check it out :).`
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
        devNote: `Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :).`
    }
};
var $aa32efa5012345c3$export$2e2bcd8739ae039 = ()=>$aa32efa5012345c3$var$translations[window.game_data.locale] || $aa32efa5012345c3$var$translations.en_DK
;


// ==UserScript==
// @name         The latest ennoblements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @version      1.1.2
// @description  Shows the latest ennoblements
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const $bb01b23dae8f6ba6$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $bb01b23dae8f6ba6$var$FILTER_FORM_ID = 'le_form';
const $bb01b23dae8f6ba6$var$TABLE_ID = 'le_table';
const $bb01b23dae8f6ba6$var$CACHE_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_cache';
const $bb01b23dae8f6ba6$var$FILTERS_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_filter';
const $bb01b23dae8f6ba6$var$ICON_URL = 'https://i.imgur.com/4WP4098.png';
const $bb01b23dae8f6ba6$var$query = `
    query ennoblements($server: String!, $sort: [String!], $limit: Int) {
      ennoblements(server: $server, sort: $sort, limit: $limit) {
        items {
          newOwner {
            id
            name
            tribe {
              id
              name
              tag
            }
          }
          oldOwner {
            id
            name
            tribe {
              id
              name
              tag
            }
          }
          ennobledAt
          village {
            id
            name
            x
            y
          }
        }
      }
    }
  `;
const $bb01b23dae8f6ba6$var$DEFAULT_FILTER = {
    newOwner: '',
    newOwnerTribe: '',
    oldOwner: '',
    oldOwnerTribe: ''
};
const $bb01b23dae8f6ba6$var$translations = $aa32efa5012345c3$export$2e2bcd8739ae039();
const $bb01b23dae8f6ba6$var$loadLatestEnnoblementsFromCache = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($bb01b23dae8f6ba6$var$CACHE_LOCAL_STORAGE_KEY);
};
const $bb01b23dae8f6ba6$var$loadFilters = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($bb01b23dae8f6ba6$var$FILTERS_LOCAL_STORAGE_KEY);
};
const $bb01b23dae8f6ba6$var$cacheEnnoblements = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($bb01b23dae8f6ba6$var$CACHE_LOCAL_STORAGE_KEY, data);
};
const $bb01b23dae8f6ba6$var$cacheFilters = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($bb01b23dae8f6ba6$var$FILTERS_LOCAL_STORAGE_KEY, data);
};
const $bb01b23dae8f6ba6$var$loadLatestEnnoblements = ()=>{
    return $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $bb01b23dae8f6ba6$var$query,
        variables: {
            server: $bb01b23dae8f6ba6$var$SERVER,
            limit: 50,
            sort: [
                'ennobledAt DESC'
            ]
        }
    }).then((data)=>{
        $bb01b23dae8f6ba6$var$cacheEnnoblements(data);
        return new Promise((resolve)=>resolve(data)
        );
    });
};
const $bb01b23dae8f6ba6$var$isValidPlayer = (obj, searchValue)=>{
    return obj && obj.name.toLowerCase().includes(searchValue.toLowerCase());
};
const $bb01b23dae8f6ba6$var$isValidPlayerTribe = (obj, searchValue)=>{
    return obj && obj.tribe && (obj.tribe.name.toLowerCase().includes(searchValue.toLowerCase()) || obj.tribe.tag.toLowerCase().includes(searchValue.toLowerCase()));
};
const $bb01b23dae8f6ba6$var$filterEnnoblements = (ennoblements = [], { newOwner: newOwner , newOwnerTribe: newOwnerTribe , oldOwner: oldOwner , oldOwnerTribe: oldOwnerTribe  } = {
})=>{
    return ennoblements.filter((ennoblement)=>{
        if (newOwner && !$bb01b23dae8f6ba6$var$isValidPlayer(ennoblement.newOwner, newOwner)) return false;
        if (newOwnerTribe && !$bb01b23dae8f6ba6$var$isValidPlayerTribe(ennoblement.newOwner, newOwnerTribe)) return false;
        if (oldOwner && !$bb01b23dae8f6ba6$var$isValidPlayer(ennoblement.oldOwner, oldOwner)) return false;
        if (oldOwnerTribe && !$bb01b23dae8f6ba6$var$isValidPlayerTribe(ennoblement.oldOwner, oldOwnerTribe)) return false;
        return true;
    });
};
const $bb01b23dae8f6ba6$var$applyFilters = (e, ennoblements)=>{
    e.preventDefault();
    const filters = $f1e9793517c51c58$export$2e2bcd8739ae039({
    }, $bb01b23dae8f6ba6$var$DEFAULT_FILTER, {
        newOwner: e.target[0].value,
        newOwnerTribe: e.target[1].value,
        oldOwner: e.target[2].value,
        oldOwnerTribe: e.target[3].value
    });
    document.querySelector(`#${$bb01b23dae8f6ba6$var$TABLE_ID} tbody`).innerHTML = $bb01b23dae8f6ba6$var$buildEnnoblementsRows($bb01b23dae8f6ba6$var$filterEnnoblements(ennoblements, filters)).join('');
    $bb01b23dae8f6ba6$var$cacheFilters(filters);
};
const $bb01b23dae8f6ba6$var$addEventListeners = (ennoblements = [])=>{
    document.querySelector('#' + $bb01b23dae8f6ba6$var$FILTER_FORM_ID).addEventListener('submit', (e)=>{
        $bb01b23dae8f6ba6$var$applyFilters(e, ennoblements);
    });
};
const $bb01b23dae8f6ba6$var$getPlayerHTML = (player)=>{
    return player && player.name ? `<a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(player.id)}">${player.name}</a> (${player.tribe && player.tribe.tag ? `<a href="${$db1dd60e5389e0c9$export$7345792e21cfc457(player.tribe.id)}">${player.tribe.tag}</a>` : '-'})` : '-';
};
const $bb01b23dae8f6ba6$var$getVillageHTML = (village)=>{
    return `<a href="${$db1dd60e5389e0c9$export$e537a41a0fc85cc5(village.id)}">${$db1dd60e5389e0c9$export$c6f77ec2633c38b1(village.name, village.x, village.y)}</a>`;
};
const $bb01b23dae8f6ba6$var$buildEnnoblementsRows = (ennoblements)=>{
    return ennoblements.map((ennoblement)=>{
        return `<tr>
              <td>${$bb01b23dae8f6ba6$var$getVillageHTML(ennoblement.village)}</td>
              <td>${$bb01b23dae8f6ba6$var$getPlayerHTML(ennoblement.newOwner)}</td>
              <td>${$bb01b23dae8f6ba6$var$getPlayerHTML(ennoblement.oldOwner)}</td>
              <td>${$ca7593443ca49f96$export$3ae94a2503e890a1(ennoblement.ennobledAt)}</td>
            </tr>`;
    });
};
const $bb01b23dae8f6ba6$var$renderLatestEnnoblements = (ennoblements = [], filters = {
})=>{
    const prepared = $f1e9793517c51c58$export$2e2bcd8739ae039({
    }, $bb01b23dae8f6ba6$var$DEFAULT_FILTER, filters);
    const html = `
        <form style="margin-bottom: 15px" id="${$bb01b23dae8f6ba6$var$FILTER_FORM_ID}">
        <h1 style="margin-bottom: 0px; text-align: center;"><a href="${$f3b273bd698d94bc$export$5d5850cc00079a21($5b3edb3901c8177a$export$2e2bcd8739ae039($bb01b23dae8f6ba6$var$SERVER), $bb01b23dae8f6ba6$var$SERVER)}">TWHelp</a></h1>
            <h3 style="margin-bottom: 10px; margin-top: 0;">${$bb01b23dae8f6ba6$var$translations.devNote}</h3>
          <h3 style="margin-bottom: 5px">${$bb01b23dae8f6ba6$var$translations.filters}</h3>
          <input type="text" placeholder="${$bb01b23dae8f6ba6$var$translations.newOwner}" value="${prepared.newOwner}" />
          <input type="text" placeholder="${$bb01b23dae8f6ba6$var$translations.newOwnerTribe}" value="${prepared.newOwnerTribe}" />
          <input type="text" placeholder="${$bb01b23dae8f6ba6$var$translations.oldOwner}" value="${prepared.oldOwner}" />
          <input type="text" placeholder="${$bb01b23dae8f6ba6$var$translations.oldOwnerTribe}" value="${prepared.oldOwnerTribe}" />
          <div>
            <button type="submit">${$bb01b23dae8f6ba6$var$translations.apply}</button>
          </div>
        </form>
        <table class="vis" id="${$bb01b23dae8f6ba6$var$TABLE_ID}" style="width: 100%">
          <thead>
            <tr>
              <th>${$bb01b23dae8f6ba6$var$translations.village}</th>
              <th>${$bb01b23dae8f6ba6$var$translations.newOwner}</th>
              <th>${$bb01b23dae8f6ba6$var$translations.oldOwner}</th>
              <th>${$bb01b23dae8f6ba6$var$translations.date}</th>
            </tr>
          </thead>
          <tbody>
            ${$bb01b23dae8f6ba6$var$buildEnnoblementsRows($bb01b23dae8f6ba6$var$filterEnnoblements(ennoblements, prepared)).join('')}
          </tbody>
        </table>
        `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        title: $bb01b23dae8f6ba6$var$translations.ennoblements,
        id: 'ennoblements',
        html: html
    });
    $bb01b23dae8f6ba6$var$addEventListeners(ennoblements);
};
const $bb01b23dae8f6ba6$var$handleButtonClick = async ()=>{
    try {
        const cache = $bb01b23dae8f6ba6$var$loadLatestEnnoblementsFromCache();
        const filters = $bb01b23dae8f6ba6$var$loadFilters();
        if (cache.ennoblements && Array.isArray(cache.ennoblements.items) && cache.ennoblements.items.length > 0) $bb01b23dae8f6ba6$var$renderLatestEnnoblements(cache.ennoblements.items, filters);
        const { ennoblements: ennoblements  } = await $bb01b23dae8f6ba6$var$loadLatestEnnoblements();
        $bb01b23dae8f6ba6$var$renderLatestEnnoblements(ennoblements.items, filters);
    } catch (error) {
        console.log('latestEnnoblements', error);
    }
};
const $bb01b23dae8f6ba6$var$renderButton = ()=>{
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '5px';
    container.style.left = '4px';
    container.style.zIndex = '50000';
    const button = document.createElement('a');
    button.innerHTML = `<img src="${$bb01b23dae8f6ba6$var$ICON_URL}">`;
    button.title = $bb01b23dae8f6ba6$var$translations.showLatestEnnoblements;
    button.style.cursor = 'pointer';
    button.addEventListener('click', $bb01b23dae8f6ba6$var$handleButtonClick);
    container.append(button);
    document.body.appendChild(container);
};
(function() {
    $bb01b23dae8f6ba6$var$renderButton();
})();

})();
