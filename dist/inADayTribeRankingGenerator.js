(function () {
  var $39c4220bac5e8e55ae13cc7489410b3e$export$default = url => parseInt(new URLSearchParams(url).get('id'));
  class $eb13db7801b83919c60cd8b3e0a8a6d8$export$default {
    constructor() {
      let html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      let filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.dom = new DOMParser().parseFromString(html, 'text/html');
      this.trs = this.dom.querySelectorAll('#in_a_day_ranking_table tbody tr');
      this.filters = filters;
    }
    isValidRow(row) {
      if (!row) {
        return false;
      }
      if (this.filters.playerID && row.playerID !== this.filters.playerID) {
        return false;
      }
      if (this.filters.tribes && Array.isArray(this.filters.tribes) && !this.filters.tribes.some(tribe => tribe === row.tribe)) {
        return false;
      }
      return true;
    }
    parseRow(row) {
      if (!row || !row instanceof HTMLTableRowElement) {
        return undefined;
      }
      let obj = {};
      obj.rank = parseInt(row.children[0].innerText.trim());
      obj.name = row.children[1].innerText.trim();
      obj.playerID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(row.children[1].querySelector('a').getAttribute('href'));
      obj.tribe = row.children[2].innerText.trim();
      obj.tribeID = 0;
      if (obj.tribe) {
        obj.tribeID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(row.children[2].querySelector('a').getAttribute('href'));
      }
      obj.score = parseInt(row.children[3].innerText.trim().replace(/\./g, ''));
      obj.date = row.children[4].innerText.trim();
      return obj;
    }
    parse() {
      const result = [];
      for (let i = 1; i < this.trs.length; i++) {
        const row = this.trs[i];
        const parsed = this.parseRow(row);
        if (this.isValidRow(parsed)) {
          result.push(parsed);
        }
      }
      return result;
    }
  }
  const $1ff13e3fe910eee13bb8940db87b1675$var$translations = {
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
  var $1ff13e3fe910eee13bb8940db87b1675$export$default = () => $1ff13e3fe910eee13bb8940db87b1675$var$translations[window.game_data.locale] || $1ff13e3fe910eee13bb8940db87b1675$var$translations.en_DK;
  var $393a22f746cd1f6e45eff96c71b28370$export$default = t => new Promise(resolve => setTimeout(resolve, t));
  // ==UserScript==
  // @name         'In A Day' tribe ranking generator
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/inADayTribeRankingGenerator.js
  // @version      0.2.3
  // @description  'In A Day' tribe ranking generator
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=ranking*mode=in_a_day*
  // @grant        none
  // @run-at       document-end
  // ==/UserScript==
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$TRIBE_CONTAINER_ID = 'iad_tribes';
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$LIMIT_INPUT_ID = 'iad_limit';
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$translations = $1ff13e3fe910eee13bb8940db87b1675$export$default();
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$addTribe = () => {
    const container = document.querySelector('#' + $cfc814bc73bf1f67f8083cc3d02e6787$var$TRIBE_CONTAINER_ID);
    const div = document.createElement('div');
    div.innerHTML = ("\n        <label>").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.tribe, ": </label>\n        <input type=\"text\" required />\n        <button type=\"button\">").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.delete, "</button>\n    ");
    div.querySelector('button').addEventListener('click', () => {
      if (container.children.length > 1) {
        div.remove();
      }
    });
    container.appendChild(div);
  };
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$handleFormSubmit = async e => {
    e.preventDefault();
    const limit = parseInt(document.querySelector('#' + $cfc814bc73bf1f67f8083cc3d02e6787$var$LIMIT_INPUT_ID).value);
    const tribes = [];
    const type = new URLSearchParams(window.location.search).get('type') || 'kill_att';
    document.querySelectorAll('#' + $cfc814bc73bf1f67f8083cc3d02e6787$var$TRIBE_CONTAINER_ID + ' input').forEach(el => {
      if (el.value) tribes.push(el.value.trim());
    });
    let players = [];
    let page = 0;
    while (players.length < limit) {
      Dialog.show('iad_loading', ("").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.loaded, ": <strong>").concat(players.length, "/").concat(limit, "</strong>"));
      try {
        const response = await fetch(TribalWars.buildURL('', {
          screen: 'ranking',
          mode: 'in_a_day',
          type,
          offset: page * 25
        }));
        const html = await response.text();
        const parser = new $eb13db7801b83919c60cd8b3e0a8a6d8$export$default(html, {
          tribes
        });
        if (parser.trs.length !== 26) break;
        players = [...players, ...parser.parse()];
        page++;
        await $393a22f746cd1f6e45eff96c71b28370$export$default(200);
      } catch (error) {
        break;
      }
    }
    if (players.length > limit) {
      players = players.slice(0, limit);
    }
    Dialog.show('iad_result', ("\n    <textarea cols=30 rows=8 readonly>[table]\n[**][||]").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.player, "[||]").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.tribe, "[||]").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.rank, "[||]").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.score, "[||]").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.date, "[/**]\n").concat(players.map((player, index) => {
      return ("[*]").concat(index + 1, ".[|][player]").concat(player.name, "[/player][|][ally]").concat(player.tribe, "[/ally][|]").concat(player.rank, "[|]").concat(player.score.toLocaleString(), "[|]").concat(player.date);
    }).join('\n'), "\n[/table]</textarea>\n  "));
  };
  const $cfc814bc73bf1f67f8083cc3d02e6787$var$renderUI = () => {
    const addButtonID = 'iad_add';
    const div = document.createElement('div');
    const html = ("\n    <form>\n        <div id=\"").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$TRIBE_CONTAINER_ID, "\">\n        </div>\n        <div>\n            <label>Limit: </label>\n            <input id=\"").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$LIMIT_INPUT_ID, "\" type=\"number\" min=\"1\" value=\"10\" required />\n        </div>\n        <button type=\"submit\">").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.generate, "</button>\n        <button id=\"").concat(addButtonID, "\" type=\"button\">").concat($cfc814bc73bf1f67f8083cc3d02e6787$var$translations.addTribe, "</button>\n    </form>\n  ");
    div.innerHTML = html;
    document.querySelector('#content_value > table > tbody > tr > td:nth-child(2)').prepend(div);
    div.querySelector('form').addEventListener('submit', $cfc814bc73bf1f67f8083cc3d02e6787$var$handleFormSubmit);
    div.querySelector('#' + addButtonID).addEventListener('click', $cfc814bc73bf1f67f8083cc3d02e6787$var$addTribe);
    $cfc814bc73bf1f67f8083cc3d02e6787$var$addTribe();
  };
  (function () {
    try {
      $cfc814bc73bf1f67f8083cc3d02e6787$var$renderUI();
    } catch (error) {
      console.log("'In A Day' Tribe Ranking Generator", error);
    }
  })();
})();

