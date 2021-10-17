(function () {
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


const $90cf6cc573d95758$var$translations = {
    pl_PL: {
        addTribe: 'Dodaj plemię',
        generate: 'Wygeneruj',
        delete: 'Usuń',
        player: 'Gracz',
        tribe: 'Plemię',
        rank: 'Ranking',
        score: 'Wynik',
        date: 'Data',
        loaded: 'Załadowano'
    },
    en_DK: {
        addTribe: 'Add tribe',
        generate: 'Generate',
        delete: 'Delete',
        player: 'Player',
        tribe: 'Tribe',
        rank: 'Rank',
        score: 'Score',
        date: 'Date',
        loaded: 'Loaded'
    },
    de_DE: {
        addTribe: 'Stamm hinzufügen',
        generate: 'Generieren',
        delete: 'Löschen',
        player: 'Spieler',
        tribe: 'Stamm',
        rank: 'Rang',
        score: 'Punkte',
        date: 'Datum',
        loaded: 'Geladen'
    }
};
var $90cf6cc573d95758$export$2e2bcd8739ae039 = ()=>$90cf6cc573d95758$var$translations[window.game_data.locale] || $90cf6cc573d95758$var$translations.en_DK
;


var $fc029eaf0e980c2d$export$2e2bcd8739ae039 = (t)=>new Promise((resolve)=>setTimeout(resolve, t)
    )
;


// ==UserScript==
// @name         'In A Day' tribe ranking generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
// @version      0.2.4
// @description  'In A Day' tribe ranking generator
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=ranking*mode=in_a_day*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const $17703ec1bda5292c$var$TRIBE_CONTAINER_ID = 'iad_tribes';
const $17703ec1bda5292c$var$LIMIT_INPUT_ID = 'iad_limit';
const $17703ec1bda5292c$var$translations = $90cf6cc573d95758$export$2e2bcd8739ae039();
const $17703ec1bda5292c$var$addTribe = ()=>{
    const container = document.querySelector('#' + $17703ec1bda5292c$var$TRIBE_CONTAINER_ID);
    const div = document.createElement('div');
    div.innerHTML = `
        <label>${$17703ec1bda5292c$var$translations.tribe}: </label>
        <input type="text" required />
        <button type="button">${$17703ec1bda5292c$var$translations.delete}</button>
    `;
    div.querySelector('button').addEventListener('click', ()=>{
        if (container.children.length > 1) div.remove();
    });
    container.appendChild(div);
};
const $17703ec1bda5292c$var$handleFormSubmit = async (e)=>{
    e.preventDefault();
    const limit = parseInt(document.querySelector('#' + $17703ec1bda5292c$var$LIMIT_INPUT_ID).value);
    const tribes = [];
    const type = new URLSearchParams(window.location.search).get('type') || 'kill_att';
    document.querySelectorAll('#' + $17703ec1bda5292c$var$TRIBE_CONTAINER_ID + ' input').forEach((el)=>{
        if (el.value) tribes.push(el.value.trim());
    });
    let players = [];
    let page = 0;
    while(players.length < limit){
        Dialog.show('iad_loading', `${$17703ec1bda5292c$var$translations.loaded}: <strong>${players.length}/${limit}</strong>`);
        try {
            const response = await fetch(TribalWars.buildURL('', {
                screen: 'ranking',
                mode: 'in_a_day',
                type: type,
                offset: page * 25
            }));
            const html = await response.text();
            const parser = new $417def0de2fa2238$export$2e2bcd8739ae039(html, {
                tribes: tribes
            });
            if (parser.trs.length !== 26) break;
            players = [
                ...players,
                ...parser.parse()
            ];
            page++;
            await $fc029eaf0e980c2d$export$2e2bcd8739ae039(200);
        } catch (error) {
            break;
        }
    }
    if (players.length > limit) players = players.slice(0, limit);
    Dialog.show('iad_result', `
    <textarea cols=30 rows=8 readonly>[table]
[**][||]${$17703ec1bda5292c$var$translations.player}[||]${$17703ec1bda5292c$var$translations.tribe}[||]${$17703ec1bda5292c$var$translations.rank}[||]${$17703ec1bda5292c$var$translations.score}[||]${$17703ec1bda5292c$var$translations.date}[/**]
${players.map((player, index)=>{
        return `[*]${index + 1}.[|][player]${player.name}[/player][|][ally]${player.tribe}[/ally][|]${player.rank}[|]${player.score.toLocaleString()}[|]${player.date}`;
    }).join('\n')}
[/table]</textarea>
  `);
};
const $17703ec1bda5292c$var$renderUI = ()=>{
    const addButtonID = 'iad_add';
    const div = document.createElement('div');
    const html = `
    <form>
        <div id="${$17703ec1bda5292c$var$TRIBE_CONTAINER_ID}">
        </div>
        <div>
            <label>Limit: </label>
            <input id="${$17703ec1bda5292c$var$LIMIT_INPUT_ID}" type="number" min="1" value="10" required />
        </div>
        <button type="submit">${$17703ec1bda5292c$var$translations.generate}</button>
        <button id="${addButtonID}" type="button">${$17703ec1bda5292c$var$translations.addTribe}</button>
    </form>
  `;
    div.innerHTML = html;
    document.querySelector('#content_value > table > tbody > tr > td:nth-child(2)').prepend(div);
    div.querySelector('form').addEventListener('submit', $17703ec1bda5292c$var$handleFormSubmit);
    div.querySelector('#' + addButtonID).addEventListener('click', $17703ec1bda5292c$var$addTribe);
    $17703ec1bda5292c$var$addTribe();
};
(function() {
    try {
        $17703ec1bda5292c$var$renderUI();
    } catch (error) {
        console.log(`'In A Day' Tribe Ranking Generator`, error);
    }
})();

})();
