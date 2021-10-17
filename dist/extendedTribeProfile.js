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


function $5c7eb77435f5b299$export$2e2bcd8739ae039(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
}




function $e0c28e86cf0881e5$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
}



var $df209d46368bbe8e$var$MILLISECONDS_IN_DAY = 86400000;
function $df209d46368bbe8e$export$2e2bcd8739ae039(dirtyDateLeft, dirtyDateRight) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var startOfDayLeft = $e0c28e86cf0881e5$export$2e2bcd8739ae039(dirtyDateLeft);
    var startOfDayRight = $e0c28e86cf0881e5$export$2e2bcd8739ae039(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - $5c7eb77435f5b299$export$2e2bcd8739ae039(startOfDayLeft);
    var timestampRight = startOfDayRight.getTime() - $5c7eb77435f5b299$export$2e2bcd8739ae039(startOfDayRight); // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / $df209d46368bbe8e$var$MILLISECONDS_IN_DAY);
}



// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function $404c1b1679418875$var$compareLocalAsc(dateLeft, dateRight) {
    var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
    if (diff < 0) return -1;
    else if (diff > 0) return 1; // Return 0 if diff is 0; return NaN if diff is NaN
    else return diff;
}
function $404c1b1679418875$export$2e2bcd8739ae039(dirtyDateLeft, dirtyDateRight) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var dateLeft = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDateLeft);
    var dateRight = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDateRight);
    var sign = $404c1b1679418875$var$compareLocalAsc(dateLeft, dateRight);
    var difference = Math.abs($df209d46368bbe8e$export$2e2bcd8739ae039(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastDayNotFull = Number($404c1b1679418875$var$compareLocalAsc(dateLeft, dateRight) === -sign);
    var result = sign * (difference - isLastDayNotFull); // Prevent negative zero
    return result === 0 ? 0 : result;
}


const $b2c56a1bf7676610$var$translations = {
    pl_PL: {
        date: 'Data',
        createdAt: 'Data założenia',
        dominance: 'Dominacja',
        bestRank: 'Najlepszy ranking',
        mostPoints: 'Najwięcej punktów',
        mostVillages: 'Najwięcej wiosek',
        player: 'Gracz',
        points: 'Punkty',
        villages: 'Wioski',
        opponentsDefeated: 'Pokonani przeciwnicy',
        opponentsDefeatedAsAttacker: 'Pokonani przeciwnicy jako agresor',
        opponentsDefeatedAsDefender: 'Pokonani przeciwnicy jako obrońca',
        opponentsDefeatedAsSupporter: 'Pokonani przeciwnicy jako wspierający',
        change: 'Zmień',
        left: 'Opuścił',
        joined: 'Dołączył',
        tribeChanges: 'Zmiany plemion',
        membersGrowth: 'Rozwój graczy',
        act: 'Akcja',
        total: 'Razem',
        oda: 'RA',
        odd: 'RO',
        ods: 'RW',
        od: 'Pokonani ogólnie',
        dailyGrowth: 'Dzienny przyrost',
        playerLinks: 'Linki',
        action: {
            linkToTWHelp: 'Akta plemienia (TWHelp)',
            showTribeChanges: 'Pokaż zmiany plemion',
            showEnnoblements: 'Pokaż przejęcia',
            showMembersGrowth: 'Pokaż rozwój graczy',
            showHistory: 'Pokaż historię',
            generateMailingList: 'Wygeneruj listę mailingową',
            exportVillages: 'Wyeksportuj wioski'
        }
    },
    en_DK: {
        date: 'Date',
        createdAt: 'Created at',
        dominance: 'Dominance',
        bestRank: 'Best rank',
        mostPoints: 'Most points',
        mostVillages: 'Most villages',
        player: 'Player',
        points: 'Points',
        villages: 'Villages',
        opponentsDefeated: 'Opponents defeated',
        opponentsDefeatedAsAttacker: 'Opponents defeated as attacker',
        opponentsDefeatedAsDefender: 'Opponents defeated as defender',
        opponentsDefeatedAsSupporter: 'Opponents defeated as supporter',
        change: 'Change',
        membersGrowth: 'Members growth',
        tribeChanges: 'Tribe changes',
        left: 'Left',
        joined: 'Joined',
        act: 'Action',
        total: 'Total',
        oda: 'ODA',
        odd: 'ODD',
        ods: 'ODS',
        od: 'OD',
        dailyGrowth: 'Daily growth',
        playerLinks: 'Player links',
        action: {
            linkToTWHelp: 'Tribal file (TWHelp)',
            showTribeChanges: 'Show tribe changes',
            showEnnoblements: 'Show ennoblements',
            showMembersGrowth: 'Show members growth',
            showHistory: 'Show history',
            generateMailingList: 'Generate mailing list',
            exportVillages: 'Export villages'
        }
    },
    de_DE: {
        date: 'Datum',
        createdAt: 'Erstellt am',
        dominance: 'Dominanz',
        bestRank: 'Bester Rang',
        mostPoints: 'Meiste Punkte',
        mostVillages: 'Meiste Dörfer',
        player: 'Spieler',
        points: 'Punkte',
        villages: 'Dörfer',
        opponentsDefeated: 'Besiegte Gegner',
        opponentsDefeatedAsAttacker: 'Besiegte Gegner als Angreifer',
        opponentsDefeatedAsDefender: 'Besiegte Gegner als Verteidiger',
        opponentsDefeatedAsSupporter: 'Besiegte Gegner als Unterstützer',
        change: 'Änderungen',
        membersGrowth: 'Mitglieder Wachstum',
        tribeChanges: 'Stammeswechsel',
        left: 'Verlassen',
        joined: 'Beigetreten',
        act: 'Aktion',
        total: 'Total',
        oda: 'BGA',
        odd: 'BGV',
        ods: 'BGS',
        od: 'BP',
        dailyGrowth: 'Tägl. Wachstum',
        playerLinks: 'Spieler Links',
        action: {
            linkToTWHelp: 'Stammesakte (TWHelp)',
            showTribeChanges: 'Zeige Stammeswechsel',
            showEnnoblements: 'Zeige Adelungen',
            showMembersGrowth: 'Zeige Mitglieder-Wachstum',
            showHistory: 'Zeige Verlauf',
            generateMailingList: 'Maillisten-Generator',
            exportVillages: 'Dörfer exportieren'
        }
    }
};
var $b2c56a1bf7676610$export$2e2bcd8739ae039 = ()=>$b2c56a1bf7676610$var$translations[window.game_data.locale] || $b2c56a1bf7676610$var$translations.en_DK
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



var $c1259165cf39ac5b$export$2e2bcd8739ae039 = (url)=>parseInt(new URLSearchParams(url).get('id'))
;


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
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



var $5b3edb3901c8177a$export$2e2bcd8739ae039 = (server = '')=>server.substr(0, 2)
;


const $c8a988f78c71dfa9$export$3df7b9b48f38839e = (server = '', id = 0)=>{
    return `http://www.twstats.com/in/${server}/player/${id}`;
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



// ==UserScript==
// @name         Extended tribe profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      1.1.8
// @description  Extended tribe profile
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const $9c5e2ca851587025$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $9c5e2ca851587025$var$VERSION = $5b3edb3901c8177a$export$2e2bcd8739ae039($9c5e2ca851587025$var$SERVER);
const $9c5e2ca851587025$var$TRIBE_ID = $c1259165cf39ac5b$export$2e2bcd8739ae039(window.location.search);
const $9c5e2ca851587025$var$LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + $9c5e2ca851587025$var$TRIBE_ID;
const $9c5e2ca851587025$var$TRIBE_QUERY = `
  query tribe(
    $server: String!
    $id: Int!
    $dailyTribeStatsSort: [String!]
    $dailyTribeStatsLimit: Int
    $playersLimit: Int
    $playersSort: [String!]
    $playerFilter: PlayerFilter!
    $dailyTribeStatsFilter: DailyTribeStatsFilter!
  ) {
    tribe(server: $server, id: $id) {
      id
      bestRank
      bestRankAt
      mostPoints
      mostPointsAt
      mostVillages
      mostVillagesAt
      createdAt
      dominance
    }
    dailyTribeStats(
      server: $server
      limit: $dailyTribeStatsLimit
      sort: $dailyTribeStatsSort
      filter: $dailyTribeStatsFilter
    ) {
      items {
        rank
        rankAtt
        rankDef
        rankTotal
        points
        scoreAtt
        scoreAtt
        scoreDef
        scoreTotal
        villages
        members
      }
    }
    players(server: $server, sort: $playersSort, filter: $playerFilter, limit: $playersLimit) {
      items {
        id
        rankAtt
        rankDef
        rankSup
        rankTotal
        scoreAtt
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        dailyGrowth
      }
    }
  }
`;
const $9c5e2ca851587025$var$ENNOBLEMENTS_QUERY = `
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
const $9c5e2ca851587025$var$ENNOBLEMENTS_PER_PAGE = 15;
const $9c5e2ca851587025$var$TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY = `
query tribeHistoryAndTribeDailyStats($server: String!,
     $tribeHistoryFilter: TribeHistoryFilter!,
     $dailyTribeStatsFilter: DailyTribeStatsFilter!,
     $sort: [String!],
     $offset: Int,
     $limit: Int) {
  tribeHistory(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $tribeHistoryFilter) {
    total
    items {
      totalVillages
      points
      rank
      scoreAtt
      rankAtt
      scoreDef
      rankDef
      scoreTotal
      rankTotal
      createDate
      totalMembers
    }
  }
  dailyTribeStats(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $dailyTribeStatsFilter) {
    items {
        points
        scoreAtt
        scoreDef
        scoreTotal
        villages
        createDate
        members
      }
    }
}
`;
const $9c5e2ca851587025$var$TRIBE_HISTORY_PER_PAGE = 15;
const $9c5e2ca851587025$var$TRIBE_MEMBERS_DAILY_STATS_QUERY = `
query tribeMembersDailyStats($server: String!,
     $filter: DailyPlayerStatsFilter!,
     $limit: Int,
     $sort: [String!]) {
  dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {
    items {
        player {
          id
          name
        }
        points
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
let $9c5e2ca851587025$var$MEMBERS_GROWTH_MODE = 'points';
const $9c5e2ca851587025$var$TRIBE_CHANGES_QUERY = `
    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {
      tribeChanges(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {
        total
        items {
          player {
            id
            name
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
const $9c5e2ca851587025$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
const $9c5e2ca851587025$var$TRIBE_CHANGES_PER_PAGE = 15;
const $9c5e2ca851587025$var$contentValue = document.querySelector('#content_value');
const $9c5e2ca851587025$var$profileInfoTBody = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody');
const $9c5e2ca851587025$var$actionContainer = $9c5e2ca851587025$var$profileInfoTBody;
const $9c5e2ca851587025$var$otherElementsContainer = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)');
const $9c5e2ca851587025$var$membersContainer = $9c5e2ca851587025$var$contentValue.querySelector('h3').nextElementSibling.querySelector('tbody');
const $9c5e2ca851587025$var$translations = $b2c56a1bf7676610$export$2e2bcd8739ae039();
const $9c5e2ca851587025$var$loadDataFromCache = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($9c5e2ca851587025$var$LOCAL_STORAGE_KEY);
};
const $9c5e2ca851587025$var$cacheTribeData = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($9c5e2ca851587025$var$LOCAL_STORAGE_KEY, data);
};
const $9c5e2ca851587025$var$getMemberIDs = ()=>{
    const ids = [];
    $9c5e2ca851587025$var$membersContainer.querySelectorAll('a').forEach((a)=>{
        const href = a.getAttribute('href');
        if (href.includes('info_player')) ids.push($c1259165cf39ac5b$export$2e2bcd8739ae039(href));
    });
    return ids;
};
const $9c5e2ca851587025$var$getMemberNames = ()=>{
    const ids = [];
    $9c5e2ca851587025$var$membersContainer.querySelectorAll('a').forEach((a)=>{
        if (a.getAttribute('href').includes('info_player')) ids.push(a.innerText.trim());
    });
    return ids;
};
const $9c5e2ca851587025$var$loadData = async ()=>{
    const memberIDs = $9c5e2ca851587025$var$getMemberIDs();
    const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $9c5e2ca851587025$var$TRIBE_QUERY,
        variables: {
            server: $9c5e2ca851587025$var$SERVER,
            id: $9c5e2ca851587025$var$TRIBE_ID,
            dailyTribeStatsSort: [
                'createDate DESC'
            ],
            dailyTribeStatsLimit: 1,
            dailyTribeStatsFilter: {
                tribeID: [
                    $9c5e2ca851587025$var$TRIBE_ID
                ]
            },
            playersSort: [
                'rank ASC'
            ],
            playersLimit: memberIDs.length,
            playerFilter: {
                id: memberIDs
            }
        }
    });
    $9c5e2ca851587025$var$cacheTribeData(data);
    return data;
};
const $9c5e2ca851587025$var$renderTr = ({ title: title , data: data , id: id  })=>{
    let tr = document.querySelector('#' + id);
    if (!tr) {
        tr = document.createElement('tr');
        tr.id = id;
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        $9c5e2ca851587025$var$profileInfoTBody.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
};
const $9c5e2ca851587025$var$extendMembersData = (players)=>{
    $9c5e2ca851587025$var$membersContainer.parentElement.style.width = '100%';
    $9c5e2ca851587025$var$contentValue.append($9c5e2ca851587025$var$membersContainer.parentElement);
    const heading = $9c5e2ca851587025$var$membersContainer.querySelector('tr:first-child');
    if (heading.children.length !== 11) [
        $9c5e2ca851587025$var$translations.oda,
        $9c5e2ca851587025$var$translations.odd,
        $9c5e2ca851587025$var$translations.ods,
        $9c5e2ca851587025$var$translations.od,
        $9c5e2ca851587025$var$translations.dailyGrowth,
        $9c5e2ca851587025$var$translations.playerLinks, 
    ].forEach((v)=>{
        const th = document.createElement('th');
        th.innerHTML = v;
        heading.appendChild(th);
    });
    $9c5e2ca851587025$var$membersContainer.querySelectorAll('tr').forEach((tr)=>{
        const a = tr.querySelector('a');
        if (!a) return;
        const playerID = $c1259165cf39ac5b$export$2e2bcd8739ae039(a.getAttribute('href'));
        const player = players.items.find((p)=>p.id === playerID
        );
        if (player) [
            [
                player.scoreAtt,
                player.rankAtt
            ],
            [
                player.scoreDef,
                player.rankDef
            ],
            [
                player.scoreSup,
                player.rankSup
            ],
            [
                player.scoreTotal,
                player.rankTotal
            ],
            player.dailyGrowth,
            [
                {
                    link: $f3b273bd698d94bc$export$3df7b9b48f38839e($9c5e2ca851587025$var$VERSION, $9c5e2ca851587025$var$SERVER, player.id),
                    label: 'TWHelp'
                },
                {
                    link: $c8a988f78c71dfa9$export$3df7b9b48f38839e($9c5e2ca851587025$var$SERVER, player.id),
                    label: 'TWStats'
                }, 
            ], 
        ].forEach((data, index)=>{
            let td = tr.children[5 + index];
            if (!td) {
                td = document.createElement('td');
                tr.appendChild(td);
            }
            if (Array.isArray(data)) {
                if (typeof data[0] === 'number') td.innerHTML = `${data[0].toLocaleString()} (<strong>${data[1]}</strong>)`;
                else if (data[0].link) td.innerHTML = data.map(({ link: link , label: label  })=>`<a target="_blank" href="${link}">${label}</a>`
                ).join('<br>');
            } else if (typeof data === 'number') td.innerHTML = data.toLocaleString();
        });
    });
};
const $9c5e2ca851587025$var$render = ({ tribe: tribe , dailyTribeStats: dailyTribeStats , players: players  })=>{
    [
        {
            title: $9c5e2ca851587025$var$translations.createdAt + ':',
            data: $ca7593443ca49f96$export$3ae94a2503e890a1(tribe.createdAt),
            id: 'created_at'
        },
        {
            title: $9c5e2ca851587025$var$translations.dominance + ':',
            data: tribe.dominance.toFixed(2) + '%',
            id: 'dominance'
        },
        {
            title: $9c5e2ca851587025$var$translations.bestRank + ':',
            data: tribe.bestRank + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(tribe.bestRankAt)})`,
            id: 'best_rank'
        },
        {
            title: $9c5e2ca851587025$var$translations.mostPoints + ':',
            data: tribe.mostPoints.toLocaleString() + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(tribe.mostPointsAt)})`,
            id: 'most_points'
        },
        {
            title: $9c5e2ca851587025$var$translations.mostVillages + ':',
            data: tribe.mostVillages + ' ' + `(${$ca7593443ca49f96$export$3ae94a2503e890a1(tribe.mostVillagesAt)})`,
            id: 'most_villages'
        }, 
    ].forEach((data)=>{
        $9c5e2ca851587025$var$renderTr(data);
    });
    if (dailyTribeStats && dailyTribeStats.items.length > 0) $9f98bc5d5b389b94$export$2e2bcd8739ae039($9c5e2ca851587025$var$otherElementsContainer, dailyTribeStats.items[0]);
    if (players && players.items.length > 0) $9c5e2ca851587025$var$extendMembersData(players);
};
const $9c5e2ca851587025$var$handleShowTribeEnnoblementsClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $9c5e2ca851587025$var$ENNOBLEMENTS_QUERY,
            variables: {
                filter: {
                    or: {
                        oldOwnerTribeID: [
                            $9c5e2ca851587025$var$TRIBE_ID
                        ],
                        newOwnerTribeID: [
                            $9c5e2ca851587025$var$TRIBE_ID
                        ]
                    }
                },
                offset: $9c5e2ca851587025$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
                limit: $9c5e2ca851587025$var$ENNOBLEMENTS_PER_PAGE,
                sort: [
                    'ennobledAt DESC'
                ],
                server: $9c5e2ca851587025$var$SERVER
            }
        });
        $5d71a092de4ef3d0$export$2e2bcd8739ae039(e, data.ennoblements, {
            currentPage: page,
            limit: $9c5e2ca851587025$var$ENNOBLEMENTS_PER_PAGE,
            onPageChange: $9c5e2ca851587025$var$handleShowTribeEnnoblementsClick
        });
    }
};
const $9c5e2ca851587025$var$handleShowTribeHistoryClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) try {
        const filter = {
            tribeID: [
                $9c5e2ca851587025$var$TRIBE_ID
            ]
        };
        const { tribeHistory: tribeHistory , dailyTribeStats: dailyTribeStats  } = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $9c5e2ca851587025$var$TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
            variables: {
                server: $9c5e2ca851587025$var$SERVER,
                offset: $9c5e2ca851587025$var$TRIBE_HISTORY_PER_PAGE * (page - 1),
                limit: $9c5e2ca851587025$var$TRIBE_HISTORY_PER_PAGE,
                sort: [
                    'createDate DESC'
                ],
                tribeHistoryFilter: filter,
                dailyTribeStatsFilter: filter
            }
        });
        $8b71c6d7781a0268$export$2e2bcd8739ae039(e, tribeHistory, dailyTribeStats, {
            currentPage: page,
            limit: $9c5e2ca851587025$var$TRIBE_HISTORY_PER_PAGE,
            tribe: true,
            onPageChange: $9c5e2ca851587025$var$handleShowTribeHistoryClick
        });
    } catch (error) {
        console.log('couldnt load tribe history', error);
    }
};
const $9c5e2ca851587025$var$getMembersGrowthTdStyle = (value)=>{
    const statIncreaseStyle = 'color: #000; background-color: #0f0';
    const statDecreaseStyle = 'color: #000; background-color: #f00';
    const defaultStyle = 'color: #000; background-color: #808080';
    return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
};
const $9c5e2ca851587025$var$mapMembersGrowthTdValue = (i)=>{
    switch($9c5e2ca851587025$var$MEMBERS_GROWTH_MODE){
        case 'points':
            return i.points;
        case 'villages':
            return i.villages;
        case 'od':
            return i.scoreTotal;
        case 'oda':
            return i.scoreAtt;
        case 'odd':
            return i.scoreDef;
        case 'ods':
            return i.scoreSup;
        default:
            return 0;
    }
};
const $9c5e2ca851587025$var$buildMembersGrowthTBody = (stats)=>{
    const dates = [
        ...new Set(stats.items.map((item)=>item.createDate
        )), 
    ].reverse();
    return `
    <tbody>
        <tr>
          <th>${$9c5e2ca851587025$var$translations.player}</th>
          ${dates.map((date)=>{
        return `<th>${$ca7593443ca49f96$export$3ae94a2503e890a1(date, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })}</th>`;
    }).join('')}
          <th>${$9c5e2ca851587025$var$translations.total}</th>
        </tr>
        ${$9c5e2ca851587025$var$getMemberIDs().map((id)=>{
        const filtered = stats.items.filter((item)=>item.player && item.player.id === id
        ).reverse();
        let player = undefined;
        if (filtered.length > 0) player = filtered[0].player;
        const tds = [];
        let total = 0;
        for (let date of dates){
            const i = filtered.find((i)=>i.createDate === date
            );
            let val = 0;
            if (i) val = $9c5e2ca851587025$var$mapMembersGrowthTdValue(i);
            total += val;
            tds.push(`<td style="${$9c5e2ca851587025$var$getMembersGrowthTdStyle(val)}">${val.toLocaleString()}</td>`);
        }
        return `<tr>
            <td>
              ${player ? `<a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(id)}">${player.name}</a>` : '-'}
            </td>
            ${tds.join('')}
            <td style="${$9c5e2ca851587025$var$getMembersGrowthTdStyle(total)}"><strong>${total.toLocaleString()}</strong></td>
          </tr>`;
    }).join('')}
      </tbody>
  `;
};
const $9c5e2ca851587025$var$MEMBERS_GROWTH_TABLE_ID = 'membersGrowth';
const $9c5e2ca851587025$var$MEMBERS_GROWTH_FORM = $9c5e2ca851587025$var$MEMBERS_GROWTH_TABLE_ID + 'Form';
const $9c5e2ca851587025$var$createChangeTypeHandler = (stats)=>(e)=>{
        e.preventDefault();
        $9c5e2ca851587025$var$MEMBERS_GROWTH_MODE = e.target[0].value;
        document.querySelector('#' + $9c5e2ca851587025$var$MEMBERS_GROWTH_TABLE_ID).innerHTML = $9c5e2ca851587025$var$buildMembersGrowthTBody(stats);
    }
;
const $9c5e2ca851587025$var$renderMembersGrowthPopup = (e, stats)=>{
    const formOptions = [
        [
            'points',
            $9c5e2ca851587025$var$translations.points
        ],
        [
            'villages',
            $9c5e2ca851587025$var$translations.villages
        ],
        [
            'od',
            $9c5e2ca851587025$var$translations.opponentsDefeated
        ],
        [
            'oda',
            $9c5e2ca851587025$var$translations.opponentsDefeatedAsAttacker
        ],
        [
            'odd',
            $9c5e2ca851587025$var$translations.opponentsDefeatedAsDefender
        ],
        [
            'ods',
            $9c5e2ca851587025$var$translations.opponentsDefeatedAsSupporter
        ], 
    ].map((v)=>`<option ${$9c5e2ca851587025$var$MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : ''} value="${v[0]}">${v[1]}</option>`
    );
    const html = `
    <form id="${$9c5e2ca851587025$var$MEMBERS_GROWTH_FORM}">
      <select>
        ${formOptions.join('')}
      </select>
      <button type="submit">${$9c5e2ca851587025$var$translations.change}</button>
    </form>
    <table id="${$9c5e2ca851587025$var$MEMBERS_GROWTH_TABLE_ID}" class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      ${$9c5e2ca851587025$var$buildMembersGrowthTBody(stats)}
    </table>
  `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        e: e,
        title: $9c5e2ca851587025$var$translations.membersGrowth,
        id: 'mg',
        html: html
    });
    document.querySelector('#' + $9c5e2ca851587025$var$MEMBERS_GROWTH_FORM).addEventListener('submit', $9c5e2ca851587025$var$createChangeTypeHandler(stats));
};
const $9c5e2ca851587025$var$loadMembersGrowthData = async ({ createDateLTE: createDateLTE , createDateGT: createDateGT  } = {
})=>{
    const memberIDs = $9c5e2ca851587025$var$getMemberIDs();
    const limit = memberIDs.length * $404c1b1679418875$export$2e2bcd8739ae039(createDateLTE, createDateGT);
    const filter = {
        playerID: memberIDs,
        createDateLTE: createDateLTE,
        createDateGT: createDateGT
    };
    return await $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $9c5e2ca851587025$var$TRIBE_MEMBERS_DAILY_STATS_QUERY,
        variables: {
            filter: filter,
            limit: limit,
            sort: [
                'createDate DESC'
            ],
            server: $9c5e2ca851587025$var$SERVER
        }
    });
};
const $9c5e2ca851587025$var$handleShowMembersGrowthClick = async (e)=>{
    e.preventDefault();
    const createDateGT = new Date();
    createDateGT.setDate(createDateGT.getDate() - 7);
    const data = await $9c5e2ca851587025$var$loadMembersGrowthData({
        createDateLTE: new Date(),
        createDateGT: createDateGT
    });
    $9c5e2ca851587025$var$renderMembersGrowthPopup(e, data.dailyPlayerStats);
};
const $9c5e2ca851587025$var$renderTribeChanges = (e, currentPage, tribeChanges)=>{
    const paginationItems = $57fe06ddde7dcd5d$export$58a42a77c71a7de0({
        total: tribeChanges.total,
        limit: $9c5e2ca851587025$var$TRIBE_CHANGES_PER_PAGE,
        currentPage: currentPage
    });
    const html = `
    <div style="${$57fe06ddde7dcd5d$export$8947b11ec08f5f9d()}" id="${$9c5e2ca851587025$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            ${$9c5e2ca851587025$var$translations.date}
          </th>
          <th>
            ${$9c5e2ca851587025$var$translations.player}
          </th>
          <th>
            ${$9c5e2ca851587025$var$translations.act}
          </th>
        </tr>
        ${tribeChanges.items.map((tribeChange)=>{
        let rowHTML = '<tr>' + `<td>${$ca7593443ca49f96$export$3ae94a2503e890a1(tribeChange.createdAt)}</td>`;
        if (tribeChange.player) rowHTML += `<td><a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(tribeChange.player.id)}">${tribeChange.player.name}</a></td>`;
        else rowHTML += '<td>-</td>';
        rowHTML += `<td><strong>${tribeChange.newTribe && tribeChange.newTribe.id === $9c5e2ca851587025$var$TRIBE_ID ? $9c5e2ca851587025$var$translations.joined : $9c5e2ca851587025$var$translations.left}</strong></td>`;
        return rowHTML + '</tr>';
    }).join('')}
      </tbody>
    </table>
  `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        e: e,
        title: $9c5e2ca851587025$var$translations.tribeChanges,
        id: 'tribeChanges',
        html: html
    });
    document.querySelectorAll('#' + $9c5e2ca851587025$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach((el)=>{
        el.addEventListener('click', $9c5e2ca851587025$var$handleShowTribeChangesClick);
    });
};
const $9c5e2ca851587025$var$handleShowTribeChangesClick = async (e)=>{
    e.preventDefault();
    const page = $57fe06ddde7dcd5d$export$c2a6433281518c91(e.target);
    if (!isNaN(page)) {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $9c5e2ca851587025$var$TRIBE_CHANGES_QUERY,
            variables: {
                filter: {
                    or: {
                        oldTribeID: [
                            $9c5e2ca851587025$var$TRIBE_ID
                        ],
                        newTribeID: [
                            $9c5e2ca851587025$var$TRIBE_ID
                        ]
                    }
                },
                offset: $9c5e2ca851587025$var$TRIBE_CHANGES_PER_PAGE * (page - 1),
                limit: $9c5e2ca851587025$var$TRIBE_CHANGES_PER_PAGE,
                sort: [
                    'createdAt DESC'
                ],
                server: $9c5e2ca851587025$var$SERVER
            }
        });
        $9c5e2ca851587025$var$renderTribeChanges(e, page, data.tribeChanges);
    }
};
const $9c5e2ca851587025$var$handleGenerateMailingListClick = (e)=>{
    e.preventDefault();
    const members = $9c5e2ca851587025$var$getMemberNames();
    const chunks = [];
    for(let i = 0; i < members.length; i += 50)chunks.push(members.slice(i, i + 50));
    let html = '';
    chunks.forEach((names, index)=>{
        html += `<h3 style="margin-bottom: 5px;">${index + 1}.</h3>
    <textarea cols=30 rows=8 readonly style="margin-bottom: 15px;">${names.join(';')}</textarea>`;
    });
    Dialog.show('mailinglist', html);
};
const $9c5e2ca851587025$var$loadVillages = async (variables, total = false)=>{
    try {
        const data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            variables: variables,
            query: `
        query villages($server: String!, $sort: [String!], $limit: Int, $offset: Int, $filter: VillageFilter!) {
          villages(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $filter) {
            ${total ? 'total' : ''}
            items {
              id
              x
              y
            }
          }
        }
      `
        });
        if (data && data.villages && Array.isArray(data.villages.items)) return data.villages;
    } catch (error) {
        console.log('load villages', error);
    }
    return {
        total: 0,
        items: []
    };
};
const $9c5e2ca851587025$var$showLoadingDialog = (current = 0, total = 0)=>{
    if (!current || !total) return Dialog.show('loading', '<strong>Loading...</strong>');
    return Dialog.show('loading', `Loaded: <strong>${current}</strong>/<strong>${total}</strong>`);
};
const $9c5e2ca851587025$var$handleExportTribeVillagesFormSubmit = async (e)=>{
    e.preventDefault();
    let limit = parseInt(e.target[4].value);
    const variables = {
        filter: {
            xLTE: parseInt(e.target[0].value),
            xGTE: parseInt(e.target[1].value),
            yLTE: parseInt(e.target[2].value),
            yGTE: parseInt(e.target[3].value),
            playerID: $9c5e2ca851587025$var$getMemberIDs()
        },
        limit: isNaN(limit) || !limit ? 0 : limit,
        sort: [
            'id ASC'
        ],
        server: $9c5e2ca851587025$var$SERVER
    };
    $9c5e2ca851587025$var$showLoadingDialog();
    let { total: total , items: items  } = await $9c5e2ca851587025$var$loadVillages(variables, true);
    const length = items.length;
    if (limit !== 0 && limit < total) total = limit;
    if (isNaN(limit) || !limit || limit > length) for(let offset = length; offset < total; offset += length){
        $9c5e2ca851587025$var$showLoadingDialog(offset, total);
        const more = await $9c5e2ca851587025$var$loadVillages($f1e9793517c51c58$export$2e2bcd8739ae039({
        }, variables, {
            filter: $f1e9793517c51c58$export$2e2bcd8739ae039({
            }, variables.filter),
            offset: offset
        }));
        items = [
            ...items,
            ...more.items
        ];
    }
    Dialog.show('exportTribeVillages', `
    <textarea cols=60 rows=8 readonly>${items.map((item)=>`${item.x}|${item.y}`
    ).join(' ')}</textarea>
  `);
};
const $9c5e2ca851587025$var$handleExportTribeVillagesClick = (e)=>{
    e.preventDefault();
    const FORM_ID = 'etvForm';
    const html = `
    <div style="display: flex; align-items: center; justify-content: center;">
      <form id="${FORM_ID}">
        <div>
          <label>X <= </label>
          <input type="number" min="0" value="1000" required />
        </div>
        <div>
          <label>X >= </label>
          <input type="number" min="0" value="0" required />
        </div>
        <div>
          <label>Y <= </label>
          <input type="number" min="0" value="1000" required />
        </div>
        <div>
          <label>Y >= </label>
          <input type="number" min="0" value="0" required />
        </div>
        <div>
          <label>Limit: </label>
          <input type="number" min="0" value="0" required />
        </div>
        <button type="submit">Export</button>
      </form>
    </div>
  `;
    Dialog.show('exportTribeVillages', html);
    document.querySelector('#' + FORM_ID).addEventListener('submit', $9c5e2ca851587025$var$handleExportTribeVillagesFormSubmit);
};
const $9c5e2ca851587025$var$wrapAction = (action)=>{
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
};
const $9c5e2ca851587025$var$renderActions = ()=>{
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $f3b273bd698d94bc$export$7345792e21cfc457($9c5e2ca851587025$var$VERSION, $9c5e2ca851587025$var$SERVER, $9c5e2ca851587025$var$TRIBE_ID);
    linkToTWHelp.innerHTML = $9c5e2ca851587025$var$translations.action.linkToTWHelp;
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(linkToTWHelp));
    const showEnnoblements = document.createElement('a');
    showEnnoblements.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showEnnoblements, '1');
    showEnnoblements.innerHTML = $9c5e2ca851587025$var$translations.action.showEnnoblements;
    showEnnoblements.addEventListener('click', $9c5e2ca851587025$var$handleShowTribeEnnoblementsClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(showEnnoblements));
    const showHistory = document.createElement('a');
    showHistory.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showHistory, '1');
    showHistory.innerHTML = $9c5e2ca851587025$var$translations.action.showHistory;
    showHistory.addEventListener('click', $9c5e2ca851587025$var$handleShowTribeHistoryClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(showHistory));
    const showTribeChanges = document.createElement('a');
    showTribeChanges.href = '#';
    $57fe06ddde7dcd5d$export$5e830c5f3cd8a610(showTribeChanges, '1');
    showTribeChanges.innerHTML = $9c5e2ca851587025$var$translations.action.showTribeChanges;
    showTribeChanges.addEventListener('click', $9c5e2ca851587025$var$handleShowTribeChangesClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(showTribeChanges));
    const showMembersGrowth = document.createElement('a');
    showMembersGrowth.href = '#';
    showMembersGrowth.innerHTML = $9c5e2ca851587025$var$translations.action.showMembersGrowth;
    showMembersGrowth.addEventListener('click', $9c5e2ca851587025$var$handleShowMembersGrowthClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(showMembersGrowth));
    const generateMailingList = document.createElement('a');
    generateMailingList.href = '#';
    generateMailingList.innerHTML = $9c5e2ca851587025$var$translations.action.generateMailingList;
    generateMailingList.addEventListener('click', $9c5e2ca851587025$var$handleGenerateMailingListClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(generateMailingList));
    const exportVillages = document.createElement('a');
    exportVillages.href = '#';
    exportVillages.innerHTML = $9c5e2ca851587025$var$translations.action.exportVillages;
    exportVillages.addEventListener('click', $9c5e2ca851587025$var$handleExportTribeVillagesClick);
    $9c5e2ca851587025$var$actionContainer.appendChild($9c5e2ca851587025$var$wrapAction(exportVillages));
};
(async function() {
    try {
        $9c5e2ca851587025$var$renderActions();
        const dataFromCache = $9c5e2ca851587025$var$loadDataFromCache();
        if (dataFromCache && dataFromCache.tribe) $9c5e2ca851587025$var$render(dataFromCache);
        const dataFromAPI = await $9c5e2ca851587025$var$loadData();
        if (dataFromAPI) $9c5e2ca851587025$var$render(dataFromAPI);
    } catch (error) {
        console.log('extended tribe profile', error);
    }
})();

})();
