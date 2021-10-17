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



var $c1259165cf39ac5b$export$2e2bcd8739ae039 = (url)=>parseInt(new URLSearchParams(url).get('id'))
;


class $417def0de2fa2238$export$2e2bcd8739ae039 {
    isValidRow(row) {
        if (!row) return false;
        if (this.filters.playerID && row.playerID !== this.filters.playerID) return false;
        if (this.filters.tribes && Array.isArray(this.filters.tribes) && !this.filters.tribes.some((tribe)=>tribe === row.tribe
        )) return false;
        return true;
    }
    parseRow(row) {
        if (!row || !row instanceof HTMLTableRowElement) return undefined;
        let obj = {
        };
        obj.rank = parseInt(row.children[0].innerText.trim());
        obj.name = row.children[1].innerText.trim();
        obj.playerID = $c1259165cf39ac5b$export$2e2bcd8739ae039(row.children[1].querySelector('a').getAttribute('href'));
        obj.tribe = row.children[2].innerText.trim();
        obj.tribeID = 0;
        if (obj.tribe) obj.tribeID = $c1259165cf39ac5b$export$2e2bcd8739ae039(row.children[2].querySelector('a').getAttribute('href'));
        obj.score = parseInt(row.children[3].innerText.trim().replace(/\./g, ''));
        obj.date = row.children[4].innerText.trim();
        return obj;
    }
    parse() {
        const result = [];
        for(let i = 1; i < this.trs.length; i++){
            const row = this.trs[i];
            const parsed = this.parseRow(row);
            if (this.isValidRow(parsed)) result.push(parsed);
        }
        return result;
    }
    constructor(html = '', filters = {
    }){
        this.dom = new DOMParser().parseFromString(html, 'text/html');
        this.trs = this.dom.querySelectorAll('#in_a_day_ranking_table tbody tr');
        this.filters = filters;
    }
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


const $f659e5b8e7f45afe$var$translations = {
    pl_PL: {
        date: 'Data',
        newTribe: 'Nowe plemię',
        oldTribe: 'Poprzednie plemię',
        joinedAt: 'Dołączył',
        dailyGrowth: 'Dzienny przyrost',
        bestRank: 'Najlepszy ranking',
        mostPoints: 'Najwięcej punktów',
        mostVillages: 'Najwięcej wiosek',
        oldName: 'Poprzedni nick',
        newName: 'Nowy nick',
        playerServers: `Serwery gracza`,
        inADayBestScores: `Dzienne rankingi`,
        unitsDefeatedWhileAttacking: 'Jako atakujący',
        unitsDefeatedWhileDefending: 'Jako obrońca',
        unitsDefeatedWhileSupporting: 'Jako wspierający',
        resourcesPlundered: 'Sfarmione surowce',
        villagesPlundered: 'Splądrowane wioski',
        resourcesGathered: 'Zebrane surowce',
        villagesConquered: 'Podbite wioski',
        exportedVillages: 'Wyeksportowane wioski',
        tribeChanges: 'Zmiany plemion',
        action: {
            linkToTWHelp: 'Akta gracza (TWHelp)',
            showTribeChanges: 'Pokaż zmiany plemion',
            showEnnoblements: 'Pokaż przejęcia',
            exportVillages: 'Wyeksportuj wioski',
            showHistory: 'Pokaż historię'
        }
    },
    en_DK: {
        date: 'Date',
        newTribe: 'New tribe',
        oldTribe: 'Old tribe',
        joinedAt: 'Joined at',
        dailyGrowth: 'Daily growth',
        bestRank: 'Best rank',
        mostPoints: 'Most points',
        mostVillages: 'Most villages',
        oldName: 'Old name',
        newName: 'New name',
        playerServers: `Player's servers`,
        inADayBestScores: `'In a day' best scores`,
        unitsDefeatedWhileAttacking: 'Units defeated while attacking',
        unitsDefeatedWhileDefending: 'Units defeated while defending',
        unitsDefeatedWhileSupporting: 'Units defeated while supporting',
        resourcesPlundered: 'Resources plundered',
        villagesPlundered: 'Villages plundered',
        resourcesGathered: 'Resources gathered',
        villagesConquered: 'Villages conquered',
        exportedVillages: 'Exported villages',
        tribeChanges: 'Tribe changes',
        action: {
            linkToTWHelp: 'User file (TWHelp)',
            showTribeChanges: 'Show tribe changes',
            showEnnoblements: 'Show ennoblements',
            exportVillages: 'Export villages',
            showHistory: 'Show history'
        }
    },
    de_DE: {
        date: 'Datum',
        newTribe: 'Neuer Stamm',
        oldTribe: 'Alter Stamm',
        joinedAt: 'Beigetreten am',
        dailyGrowth: 'Tägl. Wachstum',
        bestRank: 'Bester Rang',
        mostPoints: 'Meiste Punkte',
        mostVillages: 'Meiste Dörfer',
        oldName: 'Alter Name',
        newName: 'Neuer Name',
        playerServers: "Spieler Server",
        inADayBestScores: "'An einem Tag' Bestwerte",
        unitsDefeatedWhileAttacking: 'Besiegte Gegner als Angreifer',
        unitsDefeatedWhileDefending: 'Besiegte Gegner als Verteidiger',
        unitsDefeatedWhileSupporting: 'Besiegte Gegner als Unterstützer',
        resourcesPlundered: 'Geplünderte Rohstoffe',
        villagesPlundered: 'Geplünderte Dörfer',
        resourcesGathered: 'Gesammelte Rohstoffe',
        villagesConquered: 'Eroberte Dörfer',
        exportedVillages: 'Exportierte Dörfer',
        tribeChanges: 'Stammeswechsel',
        action: {
            linkToTWHelp: 'Spielerakte (TWHelp)',
            showTribeChanges: 'Zeige Stammeswechsel',
            showEnnoblements: 'Zeige Adelungen',
            exportVillages: 'Dörfer exportieren',
            showHistory: 'Zeige Verlauf'
        }
    }
};
var $f659e5b8e7f45afe$export$2e2bcd8739ae039 = ()=>$f659e5b8e7f45afe$var$translations[window.game_data.locale] || $f659e5b8e7f45afe$var$translations.en_DK
;


const $2889ee192ffdc307$var$translations = {
    pl_PL: {
        title: `Dzisiejsze zmiany w statystykach`,
        points: 'Punkty',
        rank: 'Ranking',
        villages: 'Liczba wiosek',
        members: 'Liczba członków',
        oda: 'Pokonani przeciwnicy jako agresor',
        odaRank: 'RA',
        odd: 'Pokonani przeciwnicy jako obrońca',
        oddRank: 'RO',
        ods: 'Pokonani przeciwnicy jako wspierający',
        odsRank: 'RW',
        od: 'Pokonani przeciwnicy',
        odRank: 'Pokonani przeciwnicy razem ranking'
    },
    en_DK: {
        title: `Today's stat changes`,
        points: 'Points',
        rank: 'Rank',
        villages: 'Villages',
        members: 'Members',
        oda: 'ODA',
        odaRank: 'ODA Rank',
        odd: 'ODD',
        oddRank: 'ODD Rank',
        ods: 'ODS',
        odsRank: 'ODS Rank',
        od: 'OD',
        odRank: 'OD Rank'
    },
    de_DE: {
        title: `Heutige Werte Änderungen`,
        points: 'Punkte',
        rank: 'Rang',
        villages: 'Dörfer',
        members: 'Mitglieder',
        oda: 'BGA',
        odaRank: 'BGA Rang',
        odd: 'BGD',
        oddRank: 'BGD Rang',
        ods: 'BGS',
        odsRank: 'BGS Rang',
        od: 'BP',
        odRank: 'BP Rang'
    }
};
var $2889ee192ffdc307$export$2e2bcd8739ae039 = ()=>$2889ee192ffdc307$var$translations[window.game_data.locale] || $2889ee192ffdc307$var$translations.en_DK
;


var $3ff10df18b2a4d54$export$2e2bcd8739ae039 = (v)=>v === undefined || v === null
;


const $9f98bc5d5b389b94$var$translations = $2889ee192ffdc307$export$2e2bcd8739ae039();
const $9f98bc5d5b389b94$var$getTodaysStatsTdStyle = (value)=>{
    const statIncreaseStyle = 'color: #000; background-color: #0f0';
    const statDecreaseStyle = 'color: #000; background-color: #f00';
    const defaultStyle = 'color: #000; background-color: #808080';
    return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
};
var $9f98bc5d5b389b94$export$2e2bcd8739ae039 = (container, stats)=>{
    let todaysStats = container.querySelector('#todaysStats');
    if (!todaysStats) {
        todaysStats = document.createElement('div');
        todaysStats.id = 'todaysStats';
        todaysStats.width = '100%';
        container.prepend(todaysStats);
    }
    const player = !$3ff10df18b2a4d54$export$2e2bcd8739ae039(stats.rankSup);
    todaysStats.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              ${$9f98bc5d5b389b94$var$translations.title}
            </th>
          </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.points}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.points)}">
                ${Math.abs(stats.points).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.rank}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.rank)}">
                ${Math.abs(stats.rank)}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.villages}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.villages)}">
                ${Math.abs(stats.villages).toLocaleString()}
              </td>
            </tr>
            ${!player ? `<tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.members}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.members)}">
                ${Math.abs(stats.members)}
              </td>
            </tr>` : ''}
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.oda}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.scoreAtt)}">
                ${Math.abs(stats.scoreAtt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.odaRank}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.rankAtt)}">
                ${Math.abs(stats.rankAtt)}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.odd}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.scoreDef)}">
                ${Math.abs(stats.scoreDef).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.oddRank}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.rankDef)}">
                ${Math.abs(stats.rankDef)}
              </td>
            </tr>
            ${player ? `<tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.ods}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.scoreSup)}">
                ${Math.abs(stats.scoreSup).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.odsRank}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.rankSup)}">
                ${Math.abs(stats.rankSup)}
              </td>
            </tr>` : ''}
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.od}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.scoreTotal)}">
                ${Math.abs(stats.scoreTotal).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${$9f98bc5d5b389b94$var$translations.odRank}:
              </td>
              <td style="${$9f98bc5d5b389b94$var$getTodaysStatsTdStyle(stats.rankTotal)}">
                ${Math.abs(stats.rankTotal)}
              </td>
            </tr>
      </tbody>
      </table>
  `;
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



function $a858d2abc30fc0ee$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    if (isNaN(amount)) return new Date(NaN);
    if (!amount) // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
    date.setDate(date.getDate() + amount);
    return date;
}



function $a1ee77722e069569$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    return $a858d2abc30fc0ee$export$2e2bcd8739ae039(dirtyDate, -amount);
}


const $4b6b30b3791bc0bb$var$translations = {
    pl_PL: {
        title: `Historia`,
        date: 'Data',
        tribe: 'Plemię',
        points: 'Punkty',
        rank: 'Ranking',
        villages: 'Liczba wiosek',
        members: 'Liczba członków',
        oda: 'Pokonani przeciwnicy jako agresor',
        odd: 'Pokonani przeciwnicy jako obrońca',
        ods: 'Pokonani przeciwnicy jako wspierający',
        od: 'Pokonani przeciwnicy'
    },
    en_DK: {
        title: `History`,
        date: 'Date',
        tribe: 'Tribe',
        points: 'Points',
        villages: 'Villages',
        members: 'Members',
        oda: 'ODA',
        odd: 'ODD',
        ods: 'ODS',
        od: 'OD'
    },
    de_DE: {
        title: `Verlauf`,
        date: 'Datum',
        tribe: 'Stamm',
        points: 'Punkte',
        villages: 'Dörfer',
        members: 'Mitglieder',
        oda: 'BGA',
        odd: 'BGV',
        ods: 'BGS',
        od: 'BP'
    }
};
var $4b6b30b3791bc0bb$export$2e2bcd8739ae039 = ()=>$4b6b30b3791bc0bb$var$translations[window.game_data.locale] || $4b6b30b3791bc0bb$var$translations.en_DK
;






const $8b71c6d7781a0268$var$PAGINATION_CONTAINER_ID = 'historyPagination';
const $8b71c6d7781a0268$var$translations = $4b6b30b3791bc0bb$export$2e2bcd8739ae039();
const $8b71c6d7781a0268$var$addMathSymbol = (v)=>{
    return v > 0 ? '+' + v : v;
};
var $8b71c6d7781a0268$export$2e2bcd8739ae039 = (e, history, daily, { currentPage: currentPage = 1 , limit: limit = 0 , onPageChange: onPageChange = ()=>{
} , tribe: tribe = false  } = {
})=>{
    const paginationItems = $57fe06ddde7dcd5d$export$58a42a77c71a7de0({
        total: history.total,
        limit: limit,
        currentPage: currentPage
    });
    const html = `
    <div style="${$57fe06ddde7dcd5d$export$8947b11ec08f5f9d()}" id="${$8b71c6d7781a0268$var$PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            ${$8b71c6d7781a0268$var$translations.date}
          </th>
          ${tribe ? '' : `<th>${$8b71c6d7781a0268$var$translations.tribe}</th>`}
          <th>
          ${$8b71c6d7781a0268$var$translations.points}
          </th>
          <th>
          ${$8b71c6d7781a0268$var$translations.villages}
          </th>
          ${tribe ? `<th>${$8b71c6d7781a0268$var$translations.members}</th>` : ''}
          <th>
            ${$8b71c6d7781a0268$var$translations.od}
          </th>
          <th>
            ${$8b71c6d7781a0268$var$translations.oda}
          </th>
          <th>
            ${$8b71c6d7781a0268$var$translations.odd}
          </th>
          ${tribe ? '' : `<th>${$8b71c6d7781a0268$var$translations.ods}</th>`}
        </tr>
        ${history.items.map((history)=>{
        const subtracted = $a1ee77722e069569$export$2e2bcd8739ae039(new Date(history.createDate), 1).toISOString().split('.')[0] + 'Z';
        const stats = daily.items.find((stats)=>{
            return stats.createDate === subtracted;
        });
        let rowHTML = '<tr>' + `<td>${$ca7593443ca49f96$export$3ae94a2503e890a1(history.createDate, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })}</td>`;
        if (!tribe && history.tribe) rowHTML += `<td><a href="${$db1dd60e5389e0c9$export$7345792e21cfc457(history.tribe.id)}">${history.tribe.tag}</a></td>`;
        else if (!tribe) rowHTML += '<td>-</td>';
        rowHTML += `
              <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.points) : ''}">
                ${history.points.toLocaleString()} (<strong>${history.rank}</strong>)
              </td>
              <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.villages) : ''}">
                ${history.totalVillages.toLocaleString()}
              </td>
              ${!tribe ? '' : `
                  <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.members) : ''}">
                    ${history.totalMembers}
                </td>
              `}
              <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.scoreTotal) : ''}">
                ${history.scoreTotal.toLocaleString()} (<strong>${history.rankTotal}</strong>)
              </td>
              <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.scoreAtt) : ''}">
                ${history.scoreAtt.toLocaleString()} (<strong>${history.rankAtt}</strong>)
              </td>
              <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.scoreDef) : ''}">
                ${history.scoreDef.toLocaleString()} (<strong>${history.rankDef}</strong>)
              </td>
              ${tribe ? '' : `
                  <td title="${stats ? $8b71c6d7781a0268$var$addMathSymbol(stats.scoreSup) : ''}">
                    ${history.scoreSup.toLocaleString()} (<strong>${history.rankSup}</strong>)
                </td>
              `}
            ` + '</tr>';
        return rowHTML;
    }).join('')}
      </tbody>
    </table>
  `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        e: e,
        title: $8b71c6d7781a0268$var$translations.title,
        id: 'history',
        html: html
    });
    document.querySelectorAll('#' + $8b71c6d7781a0268$var$PAGINATION_CONTAINER_ID + ' a').forEach((el)=>{
        el.addEventListener('click', onPageChange);
    });
};


var $9fff48f01cc1b164$export$2e2bcd8739ae039 = (str)=>{
    const arr = str.split(/[_-]/);
    let newStr = '';
    for(let i = 1; i < arr.length; i++)newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    return arr[0] + newStr;
};




var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


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


// ==UserScript==
// @name         Extended player profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedPlayerProfile.js
// @version      1.2.2
// @description  Extended player profile
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_player*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const $94e64df422a76a31$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $94e64df422a76a31$var$VERSION = $5b3edb3901c8177a$export$2e2bcd8739ae039($94e64df422a76a31$var$SERVER);
let $94e64df422a76a31$var$PLAYER_ID = $c1259165cf39ac5b$export$2e2bcd8739ae039(window.location.search);
const $94e64df422a76a31$var$CURRENT_PLAYER_ID = parseInt(game_data.player.id);
if (isNaN($94e64df422a76a31$var$PLAYER_ID) || !$94e64df422a76a31$var$PLAYER_ID) $94e64df422a76a31$var$PLAYER_ID = $94e64df422a76a31$var$CURRENT_PLAYER_ID;
const $94e64df422a76a31$var$LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + $94e64df422a76a31$var$PLAYER_ID;
const $94e64df422a76a31$var$PLAYER_QUERY = `
    query player($server: String!, $id: Int!, $limit: Int, $sort: [String!], $filter: DailyPlayerStatsFilter) {
        player(server: $server, id: $id) {
            id
            name
            bestRank
            bestRankAt
            mostPoints
            mostPointsAt
            mostVillages
            mostVillagesAt
            servers
            joinedAt
            nameChanges {
                oldName
                newName
                changeDate
            }
            dailyGrowth
        }
        dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {
            items {
              rank
              rankAtt
              rankDef
              rankSup
              rankTotal
              points
              scoreAtt
              scoreAtt
              scoreDef
              scoreSup
              scoreTotal
              villages
            }
        }
    }
`;
const $94e64df422a76a31$var$TRIBE_CHANGES_QUERY = `
    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {
      tribeChanges(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {
        total
        items {
          oldTribe {
            id
            tag
          }
          newTribe {
            id
            tag
          }
          createdAt
        }
      }
    }
`;
const $94e64df422a76a31$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const $94e64df422a76a31$var$TRIBE_CHANGES_PER_PAGE = 15;
const $94e64df422a76a31$var$PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY = `
query playerHistoryAndPlayerDailyStats($server: String!,
     $playerHistoryFilter: PlayerHistoryFilter!,
     $dailyPlayerStatsFilter: DailyPlayerStatsFilter!,
     $limit: Int,
     $offset: Int,
     $sort: [String!]) {
  playerHistory(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $playerHistoryFilter) {
    total
    items {
      totalVillages
      points
      rank
      scoreAtt
      rankAtt
      scoreDef
      rankDef
      scoreSup
      rankSup
      scoreTotal
      rankTotal
      tribe {
        id
        tag
      }
      createDate
    }
  }
  dailyPlayerStats(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $dailyPlayerStatsFilter) {
    items {
        points
        scoreAtt
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        villages
        createDate
      }
    }
}
`;
const $94e64df422a76a31$var$PLAYER_HISTORY_PER_PAGE = 15;
const $94e64df422a76a31$var$ENNOBLEMENTS_QUERY = `
    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {
      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {
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
const $94e64df422a76a31$var$ENNOBLEMENTS_PER_PAGE = 15;
const $94e64df422a76a31$var$profileInfoTBody = document.querySelector('#player_info > tbody');
const $94e64df422a76a31$var$actionContainer = $94e64df422a76a31$var$PLAYER_ID === $94e64df422a76a31$var$CURRENT_PLAYER_ID ? $94e64df422a76a31$var$profileInfoTBody : document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
const $94e64df422a76a31$var$otherElementContainer = document.querySelector($94e64df422a76a31$var$PLAYER_ID === $94e64df422a76a31$var$CURRENT_PLAYER_ID ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)' : '#content_value > table > tbody > tr > td:nth-child(2)');
const $94e64df422a76a31$var$translations = $f659e5b8e7f45afe$export$2e2bcd8739ae039();
const $94e64df422a76a31$var$loadDataFromCache = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($94e64df422a76a31$var$LOCAL_STORAGE_KEY);
};
const $94e64df422a76a31$var$cachePlayerData = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($94e64df422a76a31$var$LOCAL_STORAGE_KEY, data);
};
const $94e64df422a76a31$var$loadInADayData = async (type, _param = {
})=>{
    var { name: name  } = _param, rest = $f26b272b176e5476$export$2e2bcd8739ae039(_param, ["name"]);
    try {
        const response = await fetch(TribalWars.buildURL('', {
            screen: 'ranking',
            mode: 'in_a_day',
            type: type,
            name: name ? name : ''
        }));
        const html = await response.text();
        if (!html) throw new Error();
        const res = new $417def0de2fa2238$export$2e2bcd8739ae039(html, rest).parse();
        if (res.length === 0) throw new Error();
        return res[0];
    } catch (error) {
        return {
            rank: 0,
            playerID: 0,
            score: 0,
            tribeID: 0,
            tribe: '',
            date: new Date()
        };
    }
};
const $94e64df422a76a31$var$loadData = async ()=>{
    const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $94e64df422a76a31$var$PLAYER_QUERY,
        variables: {
            server: $94e64df422a76a31$var$SERVER,
            id: $94e64df422a76a31$var$PLAYER_ID,
            limit: 1,
            sort: [
                'createDate DESC'
            ],
            filter: {
                playerID: [
                    $94e64df422a76a31$var$PLAYER_ID
                ]
            }
        }
    });
    if (data.player) {
        const inADay = {
        };
        const filter = {
            name: data.player.name,
            playerID: data.player.id
        };
        for (let type of [
            'kill_att',
            'kill_def',
            'kill_sup',
            'loot_res',
            'loot_vil',
            'scavenge',
            'conquer', 
        ])inADay[$9fff48f01cc1b164$export$2e2bcd8739ae039(type.replace('kill_', ''))] = await $94e64df422a76a31$var$loadInADayData(type, filter);
        data.player.inADay = inADay;
    }
    $94e64df422a76a31$var$cachePlayerData(data);
    return data;
};
const $94e64df422a76a31$var$renderTr = ({ title: title , data: data , id: id  })=>{
    let tr = document.querySelector('#' + id);
    if (!tr) {
        tr = document.createElement('tr');
        tr.id = id;
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        $94e64df422a76a31$var$profileInfoTBody.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
};
const $94e64df422a76a31$var$renderPlayerServers = (player)=>{
    let playerServers = document.querySelector('#playerServers');
    if (!playerServers) {
        playerServers = document.createElement('table');
        playerServers.id = 'playerServers';
        playerServers.classList.add('vis');
        playerServers.width = '100%';
        playerServers.innerHTML = `
     <tbody>
        <tr>
          <th>
            ${$94e64df422a76a31$var$translations.playerServers}
          </th>
        </tr>
        <tr>
          <td>
          </td>
        </tr>
     </tbody>
    `;
        $94e64df422a76a31$var$otherElementContainer.prepend(playerServers);
    }
    playerServers.querySelector('td').innerHTML = player.servers.sort().map((server)=>`<a target="_blank" style="margin-right: 5px" href="${$f3b273bd698d94bc$export$3df7b9b48f38839e($94e64df422a76a31$var$VERSION, server, player.id)}">${server}</a>`
    ).join('');
};
const $94e64df422a76a31$var$renderPlayerOtherNames = (player)=>{
    let playerOtherNames = document.querySelector('#playerOtherNames');
    if (!playerOtherNames) {
        playerOtherNames = document.createElement('div');
        playerOtherNames.id = 'playerOtherNames';
        playerOtherNames.width = '100%';
        $94e64df422a76a31$var$otherElementContainer.prepend(playerOtherNames);
    }
    playerOtherNames.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th>
            ${$94e64df422a76a31$var$translations.oldName}
            </th>
            <th>
            ${$94e64df422a76a31$var$translations.newName}
            </th>
            <th>
            ${$94e64df422a76a31$var$translations.date}
            </th>
          </tr>
        ${player.nameChanges.map((nameChange)=>{
        return `
            <tr>
              <td>
                ${nameChange.oldName}
              </td>
              <td>
                ${nameChange.newName}
              </td>
              <td>
                ${$ca7593443ca49f96$export$3ae94a2503e890a1(nameChange.changeDate, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })}
              </td>
            </tr>
          `;
    }).join('')}
      </tbody>
      </table>
  `;
};
const $94e64df422a76a31$var$renderInADayRanks = (player)=>{
    let inADayRanks = document.querySelector('#inADayRanks');
    if (!inADayRanks) {
        inADayRanks = document.createElement('div');
        inADayRanks.id = 'inADayRanks';
        inADayRanks.width = '100%';
        $94e64df422a76a31$var$otherElementContainer.prepend(inADayRanks);
    }
    inADayRanks.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              ${$94e64df422a76a31$var$translations.inADayBestScores}
            </th>
          </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.unitsDefeatedWhileAttacking}
              </td>
              <td>
                ${player.inADay.att.score.toLocaleString()} (${player.inADay.att.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.unitsDefeatedWhileDefending}
              </td>
              <td>
                ${player.inADay.def.score.toLocaleString()} (${player.inADay.def.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.unitsDefeatedWhileSupporting}
              </td>
              <td>
                ${player.inADay.sup.score.toLocaleString()} (${player.inADay.sup.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.resourcesPlundered}
              </td>
              <td>
                ${player.inADay.lootRes.score.toLocaleString()} (${player.inADay.lootRes.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.villagesPlundered}
              </td>
              <td>
                ${player.inADay.lootVil.score.toLocaleString()} (${player.inADay.lootVil.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.resourcesGathered}
              </td>
              <td>
                ${player.inADay.scavenge.score.toLocaleString()} (${player.inADay.scavenge.rank}.)
              </td>
            </tr>
            <tr>
              <td>
                ${$94e64df422a76a31$var$translations.villagesConquered}
              </td>
              <td>
                ${player.inADay.conquer.score.toLocaleString()} (${player.inADay.conquer.rank}.)
              </td>
            </tr>
      </tbody>
      </table>
  `;
};
const $94e64df422a76a31$var$render = ({ player: player , dailyPlayerStats: dailyPlayerStats  })=>{
    [
        {
            title: $94e64df422a76a31$var$translations.joinedAt + ':',
            data: $ca7593443ca49f96$export$3ae94a2503e890a1(player.joinedAt),
            id: 'joined_at'
        },
        {
            title: $94e64df422a76a31$var$translations.dailyGrowth + ':',
            data: player.dailyGrowth.toLocaleString(),
            id: 'dg'
        },
        {
            title: $94e64df422a76a31$var$translations.bestRank + ':',
            data: player.bestRank + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(player.bestRankAt)})`,
            id: 'best_rank'
        },
        {
            title: $94e64df422a76a31$var$translations.mostPoints + ':',
            data: player.mostPoints.toLocaleString() + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(player.mostPointsAt)})`,
            id: 'most_points'
        },
        {
            title: $94e64df422a76a31$var$translations.mostVillages + ':',
            data: player.mostVillages + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(player.mostVillagesAt)})`,
            id: 'most_villages'
        }, 
    ].forEach((data)=>{
        $94e64df422a76a31$var$renderTr(data);
    });
    $94e64df422a76a31$var$renderInADayRanks(player);
    if (dailyPlayerStats && dailyPlayerStats.items.length > 0) $9f98bc5d5b389b94$export$2e2bcd8739ae039($94e64df422a76a31$var$otherElementContainer, dailyPlayerStats.items[0]);
    if (player.nameChanges.length > 0) $94e64df422a76a31$var$renderPlayerOtherNames(player);
    if (player.servers.length > 0) $94e64df422a76a31$var$renderPlayerServers(player);
};
const $94e64df422a76a31$var$renderTribeChanges = (e, currentPage, tribeChanges)=>{
    const paginationItems = $57fe06ddde7dcd5d$export$58a42a77c71a7de0({
        total: tribeChanges.total,
        limit: $94e64df422a76a31$var$TRIBE_CHANGES_PER_PAGE,
        currentPage: currentPage
    });
    const html = `
    <div style="${$57fe06ddde7dcd5d$export$8947b11ec08f5f9d()}" id="${$94e64df422a76a31$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            ${$94e64df422a76a31$var$translations.date}
          </th>
          <th>
            ${$94e64df422a76a31$var$translations.newTribe}
          </th>
          <th>
            ${$94e64df422a76a31$var$translations.oldTribe}
          </th>
        </tr>
        ${tribeChanges.items.map((tribeChange)=>{
        let rowHTML = '<tr>' + `<td>${$ca7593443ca49f96$export$3ae94a2503e890a1(tribeChange.createdAt)}</td>`;
        if (tribeChange.newTribe) rowHTML += `<td><a href="${$db1dd60e5389e0c9$export$7345792e21cfc457(tribeChange.newTribe.id)}">${tribeChange.newTribe.tag}</a></td>`;
        else rowHTML += '<td>-</td>';
        if (tribeChange.oldTribe) rowHTML += `<td><a href="${$db1dd60e5389e0c9$export$7345792e21cfc457(tribeChange.oldTribe.id)}">${tribeChange.oldTribe.tag}</a></td>`;
        else rowHTML += '<td>-</td>';
        return rowHTML + '</tr>';
    }).join('')}
      </tbody>
    </table>
  `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        e: e,
        title: $94e64df422a76a31$var$translations.tribeChanges,
        id: 'tribeChanges',
        html: html
    });
    document.querySelectorAll('#' + $94e64df422a76a31$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach((el)=>{
        el.addEventListener('click', $94e64df422a76a31$var$handleShowTribeChangesButtonClick);
    });
};
const $94e64df422a76a31$var$handleShowTribeChangesButtonClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $94e64df422a76a31$var$TRIBE_CHANGES_QUERY,
            variables: {
                filter: {
                    playerID: [
                        $94e64df422a76a31$var$PLAYER_ID
                    ]
                },
                sort: [
                    'createdAt DESC'
                ],
                offset: $94e64df422a76a31$var$TRIBE_CHANGES_PER_PAGE * (page - 1),
                limit: $94e64df422a76a31$var$TRIBE_CHANGES_PER_PAGE,
                server: $94e64df422a76a31$var$SERVER
            }
        });
        $94e64df422a76a31$var$renderTribeChanges(e, page, data.tribeChanges);
    }
};
const $94e64df422a76a31$var$handleShowPlayerHistoryClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) try {
        const filter = {
            playerID: [
                $94e64df422a76a31$var$PLAYER_ID
            ]
        };
        const { playerHistory: playerHistory , dailyPlayerStats: dailyPlayerStats  } = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $94e64df422a76a31$var$PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY,
            variables: {
                server: $94e64df422a76a31$var$SERVER,
                playerHistoryFilter: filter,
                offset: $94e64df422a76a31$var$PLAYER_HISTORY_PER_PAGE * (page - 1),
                limit: $94e64df422a76a31$var$PLAYER_HISTORY_PER_PAGE,
                sort: [
                    'createDate DESC'
                ],
                dailyPlayerStatsFilter: filter
            }
        });
        $8b71c6d7781a0268$export$2e2bcd8739ae039(e, playerHistory, dailyPlayerStats, {
            currentPage: page,
            limit: $94e64df422a76a31$var$PLAYER_HISTORY_PER_PAGE,
            onPageChange: $94e64df422a76a31$var$handleShowPlayerHistoryClick,
            tribe: false
        });
    } catch (error) {
        console.log('couldnt load player history', error);
    }
};
const $94e64df422a76a31$var$handleShowPlayerEnnoblementsClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $94e64df422a76a31$var$ENNOBLEMENTS_QUERY,
            variables: {
                filter: {
                    or: {
                        oldOwnerID: [
                            $94e64df422a76a31$var$PLAYER_ID
                        ],
                        newOwnerID: [
                            $94e64df422a76a31$var$PLAYER_ID
                        ]
                    }
                },
                offset: $94e64df422a76a31$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
                limit: $94e64df422a76a31$var$ENNOBLEMENTS_PER_PAGE,
                sort: [
                    'ennobledAt DESC'
                ],
                server: $94e64df422a76a31$var$SERVER
            }
        });
        $5d71a092de4ef3d0$export$2e2bcd8739ae039(e, data.ennoblements, {
            currentPage: page,
            limit: $94e64df422a76a31$var$ENNOBLEMENTS_PER_PAGE,
            onPageChange: $94e64df422a76a31$var$handleShowPlayerEnnoblementsClick
        });
    }
};
const $94e64df422a76a31$var$handleExportPlayerVillagesButtonClick = (e)=>{
    e.preventDefault();
    Dialog.show($94e64df422a76a31$var$translations.exportedVillages, `<textarea cols=30 rows=8 readonly>${document.querySelector('#villages_list').innerHTML.match(/(\d+)\|(\d+)/g).join(' ')}</textarea>`);
};
const $94e64df422a76a31$var$wrapAction = (action)=>{
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
};
const $94e64df422a76a31$var$renderActions = ()=>{
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $f3b273bd698d94bc$export$3df7b9b48f38839e($94e64df422a76a31$var$VERSION, $94e64df422a76a31$var$SERVER, $94e64df422a76a31$var$PLAYER_ID);
    linkToTWHelp.innerHTML = $94e64df422a76a31$var$translations.action.linkToTWHelp;
    $94e64df422a76a31$var$actionContainer.appendChild($94e64df422a76a31$var$wrapAction(linkToTWHelp));
    const showTribeChanges = document.createElement('a');
    showTribeChanges.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showTribeChanges, '1');
    showTribeChanges.innerHTML = $94e64df422a76a31$var$translations.action.showTribeChanges;
    showTribeChanges.addEventListener('click', $94e64df422a76a31$var$handleShowTribeChangesButtonClick);
    $94e64df422a76a31$var$actionContainer.appendChild($94e64df422a76a31$var$wrapAction(showTribeChanges));
    const showPlayerHistory = document.createElement('a');
    showPlayerHistory.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showPlayerHistory, '1');
    showPlayerHistory.innerHTML = $94e64df422a76a31$var$translations.action.showHistory;
    showPlayerHistory.addEventListener('click', $94e64df422a76a31$var$handleShowPlayerHistoryClick);
    $94e64df422a76a31$var$actionContainer.appendChild($94e64df422a76a31$var$wrapAction(showPlayerHistory));
    const showEnnoblements = document.createElement('a');
    showEnnoblements.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showEnnoblements, '1');
    showEnnoblements.innerHTML = $94e64df422a76a31$var$translations.action.showEnnoblements;
    showEnnoblements.addEventListener('click', $94e64df422a76a31$var$handleShowPlayerEnnoblementsClick);
    $94e64df422a76a31$var$actionContainer.appendChild($94e64df422a76a31$var$wrapAction(showEnnoblements));
    const exportPlayerVillages = document.createElement('a');
    exportPlayerVillages.href = '#';
    exportPlayerVillages.innerHTML = $94e64df422a76a31$var$translations.action.exportVillages;
    exportPlayerVillages.addEventListener('click', $94e64df422a76a31$var$handleExportPlayerVillagesButtonClick);
    $94e64df422a76a31$var$actionContainer.appendChild($94e64df422a76a31$var$wrapAction(exportPlayerVillages));
};
(async function() {
    try {
        $94e64df422a76a31$var$renderActions();
        const dataFromCache = $94e64df422a76a31$var$loadDataFromCache();
        if (dataFromCache && dataFromCache.player) $94e64df422a76a31$var$render(dataFromCache);
        const dataFromAPI = await $94e64df422a76a31$var$loadData();
        if (dataFromAPI) $94e64df422a76a31$var$render(dataFromAPI);
    } catch (error) {
        console.log('extended player profile', error);
    }
})();

})();
