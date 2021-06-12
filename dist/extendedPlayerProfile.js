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
  const $2fc800f8b49602de97b5533286d99e3b$var$translations = {
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
      playerServers: "Serwery gracza",
      inADayBestScores: "Dzienne rankingi",
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
      playerServers: "Player's servers",
      inADayBestScores: "'In a day' best scores",
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
  var $2fc800f8b49602de97b5533286d99e3b$export$default = () => $2fc800f8b49602de97b5533286d99e3b$var$translations[window.game_data.locale] || $2fc800f8b49602de97b5533286d99e3b$var$translations.en_DK;
  const $bd7f54d77d8feb330faa21d8dcd3f49c$var$translations = {
    pl_PL: {
      title: "Dzisiejsze zmiany w statystykach",
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
      title: "Today's stat changes",
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
      title: "Heutige Werte Änderungen",
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
  var $bd7f54d77d8feb330faa21d8dcd3f49c$export$default = () => $bd7f54d77d8feb330faa21d8dcd3f49c$var$translations[window.game_data.locale] || $bd7f54d77d8feb330faa21d8dcd3f49c$var$translations.en_DK;
  var $1002d61f190d89c6caf1c54a7873c0c5$export$default = v => v === undefined || v === null;
  const $ba543a25c46eef82c43f0acea9c36e26$var$translations = $bd7f54d77d8feb330faa21d8dcd3f49c$export$default();
  const $ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle = value => {
    const statIncreaseStyle = 'color: #000; background-color: #0f0';
    const statDecreaseStyle = 'color: #000; background-color: #f00';
    const defaultStyle = 'color: #000; background-color: #808080';
    return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
  };
  var $ba543a25c46eef82c43f0acea9c36e26$export$default = (container, stats) => {
    let todaysStats = container.querySelector('#todaysStats');
    if (!todaysStats) {
      todaysStats = document.createElement('div');
      todaysStats.id = 'todaysStats';
      todaysStats.width = '100%';
      container.prepend(todaysStats);
    }
    const player = !$1002d61f190d89c6caf1c54a7873c0c5$export$default(stats.rankSup);
    todaysStats.innerHTML = ("\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.title, "\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.points, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.points), "\">\n                ").concat(Math.abs(stats.points).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.rank, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.rank), "\">\n                ").concat(Math.abs(stats.rank), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.villages, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.villages), "\">\n                ").concat(Math.abs(stats.villages).toLocaleString(), "\n              </td>\n            </tr>\n            ").concat(!player ? ("<tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.members, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.members), "\">\n                ").concat(Math.abs(stats.members), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.oda, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.scoreAtt), "\">\n                ").concat(Math.abs(stats.scoreAtt).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.odaRank, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.rankAtt), "\">\n                ").concat(Math.abs(stats.rankAtt), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.odd, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.scoreDef), "\">\n                ").concat(Math.abs(stats.scoreDef).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.oddRank, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.rankDef), "\">\n                ").concat(Math.abs(stats.rankDef), "\n              </td>\n            </tr>\n            ").concat(player ? ("<tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.ods, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.scoreSup), "\">\n                ").concat(Math.abs(stats.scoreSup).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.odsRank, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.rankSup), "\">\n                ").concat(Math.abs(stats.rankSup), "\n              </td>\n            </tr>") : '', "\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.od, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.scoreTotal), "\">\n                ").concat(Math.abs(stats.scoreTotal).toLocaleString(), "\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($ba543a25c46eef82c43f0acea9c36e26$var$translations.odRank, ":\n              </td>\n              <td style=\"").concat($ba543a25c46eef82c43f0acea9c36e26$var$getTodaysStatsTdStyle(stats.rankTotal), "\">\n                ").concat(Math.abs(stats.rankTotal), "\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
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
  const $3f288d82e5e972d85d580f8ed66de51e$var$translations = {
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
  var $3f288d82e5e972d85d580f8ed66de51e$export$default = () => $3f288d82e5e972d85d580f8ed66de51e$var$translations[window.game_data.locale] || $3f288d82e5e972d85d580f8ed66de51e$var$translations.en_DK;
  const $13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE = 'data-page';
  const $13593d6974cda38c64f44fff96e2987d$export$getContainerStyles = () => {
    return 'display: flex; flex-direction: row; flex-wrap: wrap;';
  };
  const $13593d6974cda38c64f44fff96e2987d$export$setPage = function setPage(el) {
    let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (!el instanceof HTMLElement) {
      throw new Error('Expected HTMLElement as the first argument');
    }
    page = parseInt(page);
    if (typeof page !== 'number' || isNaN(page)) {
      throw new Error('Expected number or string as the second argument');
    }
    el.setAttribute($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE, page + '');
  };
  const $13593d6974cda38c64f44fff96e2987d$export$getPage = el => {
    if (!el instanceof HTMLElement) {
      return 0;
    }
    return parseInt(el.getAttribute($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE));
  };
  const $13593d6974cda38c64f44fff96e2987d$export$calcNumberOfPages = (total, limit) => {
    if (typeof total !== 'number') {
      throw new Error('Expected number as the first argument');
    }
    if (typeof limit !== 'number') {
      throw new Error('Expected number as the second argument');
    }
    return total > 0 ? Math.ceil(total / limit) : 1;
  };
  const $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems = function generatePaginationItems() {
    let {total, limit, marginRight = 3, currentPage = 0} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const numberOfPages = $13593d6974cda38c64f44fff96e2987d$export$calcNumberOfPages(total, limit);
    const paginationItems = [];
    for (let i = 1; i <= numberOfPages; i++) {
      if (i === currentPage) {
        paginationItems.push(("<strong style=\"margin-right: ").concat(marginRight, "px\">>").concat(i, "<</strong>"));
      } else {
        paginationItems.push(("<a style=\"margin-right: ").concat(marginRight, "px\" href=\"#\" ").concat($13593d6974cda38c64f44fff96e2987d$var$ATTRIBUTE, "=\"").concat(i, "\">").concat(i, "</a>"));
      }
    }
    return paginationItems;
  };
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
  const $88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
  const $88f173be92b23fde3128f694442fe0ce$var$translations = $3f288d82e5e972d85d580f8ed66de51e$export$default();
  const $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd = (player, tribe) => {
    if (player) {
      return ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(player.id), "\">").concat(player.name, " (").concat(tribe ? ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(tribe.id), "\">").concat(tribe.tag, "</a>") : '-', ")</a></td>");
    }
    return '<td>-</td>';
  };
  var $88f173be92b23fde3128f694442fe0ce$export$default = function (e, ennoblements) {
    let {limit = 0, currentPage = 1, onPageChange = () => {}} = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const paginationItems = $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems({
      total: ennoblements.total,
      limit,
      currentPage
    });
    const html = ("\n    <div style=\"").concat($13593d6974cda38c64f44fff96e2987d$export$getContainerStyles(), "\" id=\"").concat($88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.date, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.village, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.newOwner, "\n          </th>\n          <th>\n            ").concat($88f173be92b23fde3128f694442fe0ce$var$translations.oldOwner, "\n          </th>\n        </tr>\n        ").concat(ennoblements.items.map(ennoblement => {
      let rowHTML = '<tr>' + ("<td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(ennoblement.ennobledAt), "</td>");
      if (ennoblement.village) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageURL(ennoblement.village.id), "\">").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildVillageName(ennoblement.village.name, ennoblement.village.x, ennoblement.village.y), "</a></td>");
      } else {
        rowHTML += '<td>-</td>';
      }
      rowHTML += $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd(ennoblement.newOwner, ennoblement.newOwnerTribe);
      rowHTML += $88f173be92b23fde3128f694442fe0ce$var$getPlayerTd(ennoblement.oldOwner, ennoblement.oldOwnerTribe);
      return rowHTML + '</tr>';
    }).join(''), "\n      </tbody>\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $88f173be92b23fde3128f694442fe0ce$var$translations.title,
      id: 'ennoblements',
      html
    });
    document.querySelectorAll('#' + $88f173be92b23fde3128f694442fe0ce$var$PAGINATION_CONTAINER_ID + ' a').forEach(el => {
      el.addEventListener('click', onPageChange);
    });
  };
  function $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  function $5a91e85e34da2364b77064ee2dfe41c1$export$default(required, args) {
    if (args.length < required) {
      throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
    }
  }
  /**
  * @name toDate
  * @category Common Helpers
  * @summary Convert the given argument to an instance of Date.
  *
  * @description
  * Convert the given argument to an instance of Date.
  *
  * If the argument is an instance of Date, the function returns its clone.
  *
  * If the argument is a number, it is treated as a timestamp.
  *
  * If the argument is none of the above, the function returns Invalid Date.
  *
  * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
  *
  * @param {Date|Number} argument - the value to convert
  * @returns {Date} the parsed date in the local time zone
  * @throws {TypeError} 1 argument required
  *
  * @example
  * // Clone the date:
  * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
  * //=> Tue Feb 11 2014 11:30:30
  *
  * @example
  * // Convert the timestamp to date:
  * const result = toDate(1392098430000)
  * //=> Tue Feb 11 2014 11:30:30
  */
  function $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(argument) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    // Clone the date
    if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        // eslint-disable-next-line no-console
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  /**
  * @name addDays
  * @category Day Helpers
  * @summary Add the specified number of days to the given date.
  *
  * @description
  * Add the specified number of days to the given date.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} date - the date to be changed
  * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
  * @returns {Date} - the new date with the days added
  * @throws {TypeError} - 2 arguments required
  *
  * @example
  * // Add 10 days to 1 September 2014:
  * const result = addDays(new Date(2014, 8, 1), 10)
  * //=> Thu Sep 11 2014 00:00:00
  */
  function $486b1417f4d79b07b40554dadb813aab$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      // If 0 days, no-op to avoid changing times in the hour before end of DST
      return date;
    }
    date.setDate(date.getDate() + amount);
    return date;
  }
  /**
  * @name subDays
  * @category Day Helpers
  * @summary Subtract the specified number of days from the given date.
  *
  * @description
  * Subtract the specified number of days from the given date.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} date - the date to be changed
  * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
  * @returns {Date} the new date with the days subtracted
  * @throws {TypeError} 2 arguments required
  *
  * @example
  * // Subtract 10 days from 1 September 2014:
  * const result = subDays(new Date(2014, 8, 1), 10)
  * //=> Fri Aug 22 2014 00:00:00
  */
  function $8aaca82a2a35fba6a35717d6cb66c145$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    return $486b1417f4d79b07b40554dadb813aab$export$default(dirtyDate, -amount);
  }
  const $efebb7057c86e617f557a3e13c581a7b$var$translations = {
    pl_PL: {
      title: "Historia",
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
      title: "History",
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
      title: "Verlauf",
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
  var $efebb7057c86e617f557a3e13c581a7b$export$default = () => $efebb7057c86e617f557a3e13c581a7b$var$translations[window.game_data.locale] || $efebb7057c86e617f557a3e13c581a7b$var$translations.en_DK;
  const $534d870a885ff77d9d644b38d467ea92$var$PAGINATION_CONTAINER_ID = 'historyPagination';
  const $534d870a885ff77d9d644b38d467ea92$var$translations = $efebb7057c86e617f557a3e13c581a7b$export$default();
  const $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol = v => {
    return v > 0 ? '+' + v : v;
  };
  var $534d870a885ff77d9d644b38d467ea92$export$default = function (e, history, daily) {
    let {currentPage = 1, limit = 0, onPageChange = () => {}, tribe = false} = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const paginationItems = $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems({
      total: history.total,
      limit,
      currentPage
    });
    const html = ("\n    <div style=\"").concat($13593d6974cda38c64f44fff96e2987d$export$getContainerStyles(), "\" id=\"").concat($534d870a885ff77d9d644b38d467ea92$var$PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.date, "\n          </th>\n          ").concat(tribe ? '' : ("<th>").concat($534d870a885ff77d9d644b38d467ea92$var$translations.tribe, "</th>"), "\n          <th>\n          ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.points, "\n          </th>\n          <th>\n          ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.villages, "\n          </th>\n          ").concat(tribe ? ("<th>").concat($534d870a885ff77d9d644b38d467ea92$var$translations.members, "</th>") : '', "\n          <th>\n            ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.od, "\n          </th>\n          <th>\n            ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.oda, "\n          </th>\n          <th>\n            ").concat($534d870a885ff77d9d644b38d467ea92$var$translations.odd, "\n          </th>\n          ").concat(tribe ? '' : ("<th>").concat($534d870a885ff77d9d644b38d467ea92$var$translations.ods, "</th>"), "\n        </tr>\n        ").concat(history.items.map(history => {
      const subtracted = $8aaca82a2a35fba6a35717d6cb66c145$export$default(new Date(history.createDate), 1).toISOString().split('.')[0] + 'Z';
      const stats = daily.items.find(stats => {
        return stats.createDate === subtracted;
      });
      let rowHTML = '<tr>' + ("<td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(history.createDate, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }), "</td>");
      if (!tribe && history.tribe) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(history.tribe.id), "\">").concat(history.tribe.tag, "</a></td>");
      } else if (!tribe) {
        rowHTML += '<td>-</td>';
      }
      rowHTML += ("\n              <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.points) : '', "\">\n                ").concat(history.points.toLocaleString(), " (<strong>").concat(history.rank, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.villages) : '', "\">\n                ").concat(history.totalVillages.toLocaleString(), "\n              </td>\n              ").concat(!tribe ? '' : ("\n                  <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.members) : '', "\">\n                    ").concat(history.totalMembers, "\n                </td>\n              "), "\n              <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.scoreTotal) : '', "\">\n                ").concat(history.scoreTotal.toLocaleString(), " (<strong>").concat(history.rankTotal, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.scoreAtt) : '', "\">\n                ").concat(history.scoreAtt.toLocaleString(), " (<strong>").concat(history.rankAtt, "</strong>)\n              </td>\n              <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.scoreDef) : '', "\">\n                ").concat(history.scoreDef.toLocaleString(), " (<strong>").concat(history.rankDef, "</strong>)\n              </td>\n              ").concat(tribe ? '' : ("\n                  <td title=\"").concat(stats ? $534d870a885ff77d9d644b38d467ea92$var$addMathSymbol(stats.scoreSup) : '', "\">\n                    ").concat(history.scoreSup.toLocaleString(), " (<strong>").concat(history.rankSup, "</strong>)\n                </td>\n              "), "\n            ") + '</tr>';
      return rowHTML;
    }).join(''), "\n      </tbody>\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $534d870a885ff77d9d644b38d467ea92$var$translations.title,
      id: 'history',
      html
    });
    document.querySelectorAll('#' + $534d870a885ff77d9d644b38d467ea92$var$PAGINATION_CONTAINER_ID + ' a').forEach(el => {
      el.addEventListener('click', onPageChange);
    });
  };
  var $2c214da878bfd00b78a9d6405e51d5be$export$default = str => {
    const arr = str.split(/[_-]/);
    let newStr = '';
    for (let i = 1; i < arr.length; i++) {
      newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr[0] + newStr;
  };
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
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
  const $a7d299cc0551ebe181191433d12c53c5$var$_excluded = ["name"];
  function $a7d299cc0551ebe181191433d12c53c5$var$_objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = $a7d299cc0551ebe181191433d12c53c5$var$_objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function $a7d299cc0551ebe181191433d12c53c5$var$_objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
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
  const $a7d299cc0551ebe181191433d12c53c5$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $a7d299cc0551ebe181191433d12c53c5$var$VERSION = $1f14636dcc53402ba1b7661b758ca0aa$export$default($a7d299cc0551ebe181191433d12c53c5$var$SERVER);
  let $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(window.location.search);
  const $a7d299cc0551ebe181191433d12c53c5$var$CURRENT_PLAYER_ID = parseInt(game_data.player.id);
  if (isNaN($a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID) || !$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID) {
    $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID = $a7d299cc0551ebe181191433d12c53c5$var$CURRENT_PLAYER_ID;
  }
  const $a7d299cc0551ebe181191433d12c53c5$var$LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID;
  const $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_QUERY = "\n    query player($server: String!, $id: Int!, $limit: Int, $sort: [String!], $filter: DailyPlayerStatsFilter) {\n        player(server: $server, id: $id) {\n            id\n            name\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            servers\n            joinedAt\n            nameChanges {\n                oldName\n                newName\n                changeDate\n            }\n            dailyGrowth\n        }\n        dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n            items {\n              rank\n              rankAtt\n              rankDef\n              rankSup\n              rankTotal\n              points\n              scoreAtt\n              scoreAtt\n              scoreDef\n              scoreSup\n              scoreTotal\n              villages\n            }\n        }\n    }\n";
  const $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {\n        total\n        items {\n          oldTribe {\n            id\n            tag\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
  const $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
  const $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PER_PAGE = 15;
  const $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY = "\nquery playerHistoryAndPlayerDailyStats($server: String!,\n     $playerHistoryFilter: PlayerHistoryFilter!,\n     $dailyPlayerStatsFilter: DailyPlayerStatsFilter!,\n     $limit: Int,\n     $offset: Int,\n     $sort: [String!]) {\n  playerHistory(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $playerHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreSup\n      rankSup\n      scoreTotal\n      rankTotal\n      tribe {\n        id\n        tag\n      }\n      createDate\n    }\n  }\n  dailyPlayerStats(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $dailyPlayerStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";
  const $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_PER_PAGE = 15;
  const $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
  const $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_PER_PAGE = 15;
  const $a7d299cc0551ebe181191433d12c53c5$var$profileInfoTBody = document.querySelector('#player_info > tbody');
  const $a7d299cc0551ebe181191433d12c53c5$var$actionContainer = $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID === $a7d299cc0551ebe181191433d12c53c5$var$CURRENT_PLAYER_ID ? $a7d299cc0551ebe181191433d12c53c5$var$profileInfoTBody : document.querySelector('#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody');
  const $a7d299cc0551ebe181191433d12c53c5$var$otherElementContainer = document.querySelector($a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID === $a7d299cc0551ebe181191433d12c53c5$var$CURRENT_PLAYER_ID ? '#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)' : '#content_value > table > tbody > tr > td:nth-child(2)');
  const $a7d299cc0551ebe181191433d12c53c5$var$translations = $2fc800f8b49602de97b5533286d99e3b$export$default();
  const $a7d299cc0551ebe181191433d12c53c5$var$loadDataFromCache = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($a7d299cc0551ebe181191433d12c53c5$var$LOCAL_STORAGE_KEY);
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$cachePlayerData = function cachePlayerData() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($a7d299cc0551ebe181191433d12c53c5$var$LOCAL_STORAGE_KEY, data);
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$loadInADayData = async function loadInADayData(type) {
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, {name} = _ref, rest = $a7d299cc0551ebe181191433d12c53c5$var$_objectWithoutProperties(_ref, $a7d299cc0551ebe181191433d12c53c5$var$_excluded);
    try {
      const response = await fetch(TribalWars.buildURL('', {
        screen: 'ranking',
        mode: 'in_a_day',
        type,
        name: name ? name : ''
      }));
      const html = await response.text();
      if (!html) {
        throw new Error();
      }
      const res = new $eb13db7801b83919c60cd8b3e0a8a6d8$export$default(html, rest).parse();
      if (res.length === 0) {
        throw new Error();
      }
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
  const $a7d299cc0551ebe181191433d12c53c5$var$loadData = async () => {
    const data = await $3af05e958b2a20a26445518aba292c50$export$default({
      query: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_QUERY,
      variables: {
        server: $a7d299cc0551ebe181191433d12c53c5$var$SERVER,
        id: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID,
        limit: 1,
        sort: ['createDate DESC'],
        filter: {
          playerID: [$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID]
        }
      }
    });
    if (data.player) {
      const inADay = {};
      const filter = {
        name: data.player.name,
        playerID: data.player.id
      };
      for (let type of ['kill_att', 'kill_def', 'kill_sup', 'loot_res', 'loot_vil', 'scavenge', 'conquer']) {
        inADay[$2c214da878bfd00b78a9d6405e51d5be$export$default(type.replace('kill_', ''))] = await $a7d299cc0551ebe181191433d12c53c5$var$loadInADayData(type, filter);
      }
      data.player.inADay = inADay;
    }
    $a7d299cc0551ebe181191433d12c53c5$var$cachePlayerData(data);
    return data;
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderTr = _ref2 => {
    let {title, data, id} = _ref2;
    let tr = document.querySelector('#' + id);
    if (!tr) {
      tr = document.createElement('tr');
      tr.id = id;
      tr.appendChild(document.createElement('td'));
      tr.appendChild(document.createElement('td'));
      $a7d299cc0551ebe181191433d12c53c5$var$profileInfoTBody.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderPlayerServers = player => {
    let playerServers = document.querySelector('#playerServers');
    if (!playerServers) {
      playerServers = document.createElement('table');
      playerServers.id = 'playerServers';
      playerServers.classList.add('vis');
      playerServers.width = '100%';
      playerServers.innerHTML = ("\n     <tbody>\n        <tr>\n          <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.playerServers, "\n          </th>\n        </tr>\n        <tr>\n          <td>\n          </td>\n        </tr>\n     </tbody>\n    ");
      $a7d299cc0551ebe181191433d12c53c5$var$otherElementContainer.prepend(playerServers);
    }
    playerServers.querySelector('td').innerHTML = player.servers.sort().map(server => ("<a target=\"_blank\" style=\"margin-right: 5px\" href=\"").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildPlayerURL($a7d299cc0551ebe181191433d12c53c5$var$VERSION, server, player.id), "\">").concat(server, "</a>")).join('');
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderPlayerOtherNames = player => {
    let playerOtherNames = document.querySelector('#playerOtherNames');
    if (!playerOtherNames) {
      playerOtherNames = document.createElement('div');
      playerOtherNames.id = 'playerOtherNames';
      playerOtherNames.width = '100%';
      $a7d299cc0551ebe181191433d12c53c5$var$otherElementContainer.prepend(playerOtherNames);
    }
    playerOtherNames.innerHTML = ("\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.oldName, "\n            </th>\n            <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.newName, "\n            </th>\n            <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.date, "\n            </th>\n          </tr>\n        ").concat(player.nameChanges.map(nameChange => {
      return ("\n            <tr>\n              <td>\n                ").concat(nameChange.oldName, "\n              </td>\n              <td>\n                ").concat(nameChange.newName, "\n              </td>\n              <td>\n                ").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(nameChange.changeDate, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }), "\n              </td>\n            </tr>\n          ");
    }).join(''), "\n      </tbody>\n      </table>\n  ");
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderInADayRanks = player => {
    let inADayRanks = document.querySelector('#inADayRanks');
    if (!inADayRanks) {
      inADayRanks = document.createElement('div');
      inADayRanks.id = 'inADayRanks';
      inADayRanks.width = '100%';
      $a7d299cc0551ebe181191433d12c53c5$var$otherElementContainer.prepend(inADayRanks);
    }
    inADayRanks.innerHTML = ("\n      <table width=\"100%\" class=\"vis\">\n        <tbody>\n          <tr>\n            <th colspan=\"2\">\n              ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.inADayBestScores, "\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.unitsDefeatedWhileAttacking, "\n              </td>\n              <td>\n                ").concat(player.inADay.att.score.toLocaleString(), " (").concat(player.inADay.att.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.unitsDefeatedWhileDefending, "\n              </td>\n              <td>\n                ").concat(player.inADay.def.score.toLocaleString(), " (").concat(player.inADay.def.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.unitsDefeatedWhileSupporting, "\n              </td>\n              <td>\n                ").concat(player.inADay.sup.score.toLocaleString(), " (").concat(player.inADay.sup.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.resourcesPlundered, "\n              </td>\n              <td>\n                ").concat(player.inADay.lootRes.score.toLocaleString(), " (").concat(player.inADay.lootRes.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.villagesPlundered, "\n              </td>\n              <td>\n                ").concat(player.inADay.lootVil.score.toLocaleString(), " (").concat(player.inADay.lootVil.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.resourcesGathered, "\n              </td>\n              <td>\n                ").concat(player.inADay.scavenge.score.toLocaleString(), " (").concat(player.inADay.scavenge.rank, ".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.villagesConquered, "\n              </td>\n              <td>\n                ").concat(player.inADay.conquer.score.toLocaleString(), " (").concat(player.inADay.conquer.rank, ".)\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ");
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$render = _ref3 => {
    let {player, dailyPlayerStats} = _ref3;
    [{
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.joinedAt + ':',
      data: $87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(player.joinedAt),
      id: 'joined_at'
    }, {
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.dailyGrowth + ':',
      data: player.dailyGrowth.toLocaleString(),
      id: 'dg'
    }, {
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.bestRank + ':',
      data: player.bestRank + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(player.bestRankAt), ")"),
      id: 'best_rank'
    }, {
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.mostPoints + ':',
      data: player.mostPoints.toLocaleString() + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(player.mostPointsAt), ")"),
      id: 'most_points'
    }, {
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.mostVillages + ':',
      data: player.mostVillages + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(player.mostVillagesAt), ")"),
      id: 'most_villages'
    }].forEach(data => {
      $a7d299cc0551ebe181191433d12c53c5$var$renderTr(data);
    });
    $a7d299cc0551ebe181191433d12c53c5$var$renderInADayRanks(player);
    if (dailyPlayerStats && dailyPlayerStats.items.length > 0) {
      $ba543a25c46eef82c43f0acea9c36e26$export$default($a7d299cc0551ebe181191433d12c53c5$var$otherElementContainer, dailyPlayerStats.items[0]);
    }
    if (player.nameChanges.length > 0) {
      $a7d299cc0551ebe181191433d12c53c5$var$renderPlayerOtherNames(player);
    }
    if (player.servers.length > 0) {
      $a7d299cc0551ebe181191433d12c53c5$var$renderPlayerServers(player);
    }
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderTribeChanges = (e, currentPage, tribeChanges) => {
    const paginationItems = $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems({
      total: tribeChanges.total,
      limit: $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PER_PAGE,
      currentPage
    });
    const html = ("\n    <div style=\"").concat($13593d6974cda38c64f44fff96e2987d$export$getContainerStyles(), "\" id=\"").concat($a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.date, "\n          </th>\n          <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.newTribe, "\n          </th>\n          <th>\n            ").concat($a7d299cc0551ebe181191433d12c53c5$var$translations.oldTribe, "\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
      let rowHTML = '<tr>' + ("<td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribeChange.createdAt), "</td>");
      if (tribeChange.newTribe) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(tribeChange.newTribe.id), "\">").concat(tribeChange.newTribe.tag, "</a></td>");
      } else {
        rowHTML += '<td>-</td>';
      }
      if (tribeChange.oldTribe) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildTribeURL(tribeChange.oldTribe.id), "\">").concat(tribeChange.oldTribe.tag, "</a></td>");
      } else {
        rowHTML += '<td>-</td>';
      }
      return rowHTML + '</tr>';
    }).join(''), "\n      </tbody>\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $a7d299cc0551ebe181191433d12c53c5$var$translations.tribeChanges,
      id: 'tribeChanges',
      html
    });
    document.querySelectorAll('#' + $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
      el.addEventListener('click', $a7d299cc0551ebe181191433d12c53c5$var$handleShowTribeChangesButtonClick);
    });
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$handleShowTribeChangesButtonClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_QUERY,
        variables: {
          filter: {
            playerID: [$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID]
          },
          sort: ['createdAt DESC'],
          offset: $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PER_PAGE * (page - 1),
          limit: $a7d299cc0551ebe181191433d12c53c5$var$TRIBE_CHANGES_PER_PAGE,
          server: $a7d299cc0551ebe181191433d12c53c5$var$SERVER
        }
      });
      $a7d299cc0551ebe181191433d12c53c5$var$renderTribeChanges(e, page, data.tribeChanges);
    }
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerHistoryClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      try {
        const filter = {
          playerID: [$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID]
        };
        const {playerHistory, dailyPlayerStats} = await $3af05e958b2a20a26445518aba292c50$export$default({
          query: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_AND_PLAYER_DAILY_STATS_QUERY,
          variables: {
            server: $a7d299cc0551ebe181191433d12c53c5$var$SERVER,
            playerHistoryFilter: filter,
            offset: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_PER_PAGE * (page - 1),
            limit: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_PER_PAGE,
            sort: ['createDate DESC'],
            dailyPlayerStatsFilter: filter
          }
        });
        $534d870a885ff77d9d644b38d467ea92$export$default(e, playerHistory, dailyPlayerStats, {
          currentPage: page,
          limit: $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_HISTORY_PER_PAGE,
          onPageChange: $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerHistoryClick,
          tribe: false
        });
      } catch (error) {
        console.log('couldnt load player history', error);
      }
    }
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerEnnoblementsClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_QUERY,
        variables: {
          filter: {
            or: {
              oldOwnerID: [$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID],
              newOwnerID: [$a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID]
            }
          },
          offset: $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_PER_PAGE,
          sort: ['ennobledAt DESC'],
          server: $a7d299cc0551ebe181191433d12c53c5$var$SERVER
        }
      });
      $88f173be92b23fde3128f694442fe0ce$export$default(e, data.ennoblements, {
        currentPage: page,
        limit: $a7d299cc0551ebe181191433d12c53c5$var$ENNOBLEMENTS_PER_PAGE,
        onPageChange: $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerEnnoblementsClick
      });
    }
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$handleExportPlayerVillagesButtonClick = e => {
    e.preventDefault();
    Dialog.show($a7d299cc0551ebe181191433d12c53c5$var$translations.exportedVillages, ("<textarea cols=30 rows=8 readonly>").concat(document.querySelector('#villages_list').innerHTML.match(/(\d+)\|(\d+)/g).join(' '), "</textarea>"));
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$wrapAction = action => {
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
  };
  const $a7d299cc0551ebe181191433d12c53c5$var$renderActions = () => {
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $d147509fefd1cb8b3b83e8f38f763543$export$buildPlayerURL($a7d299cc0551ebe181191433d12c53c5$var$VERSION, $a7d299cc0551ebe181191433d12c53c5$var$SERVER, $a7d299cc0551ebe181191433d12c53c5$var$PLAYER_ID);
    linkToTWHelp.innerHTML = $a7d299cc0551ebe181191433d12c53c5$var$translations.action.linkToTWHelp;
    $a7d299cc0551ebe181191433d12c53c5$var$actionContainer.appendChild($a7d299cc0551ebe181191433d12c53c5$var$wrapAction(linkToTWHelp));
    const showTribeChanges = document.createElement('a');
    showTribeChanges.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showTribeChanges, '1');
    showTribeChanges.innerHTML = $a7d299cc0551ebe181191433d12c53c5$var$translations.action.showTribeChanges;
    showTribeChanges.addEventListener('click', $a7d299cc0551ebe181191433d12c53c5$var$handleShowTribeChangesButtonClick);
    $a7d299cc0551ebe181191433d12c53c5$var$actionContainer.appendChild($a7d299cc0551ebe181191433d12c53c5$var$wrapAction(showTribeChanges));
    const showPlayerHistory = document.createElement('a');
    showPlayerHistory.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showPlayerHistory, '1');
    showPlayerHistory.innerHTML = $a7d299cc0551ebe181191433d12c53c5$var$translations.action.showHistory;
    showPlayerHistory.addEventListener('click', $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerHistoryClick);
    $a7d299cc0551ebe181191433d12c53c5$var$actionContainer.appendChild($a7d299cc0551ebe181191433d12c53c5$var$wrapAction(showPlayerHistory));
    const showEnnoblements = document.createElement('a');
    showEnnoblements.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showEnnoblements, '1');
    showEnnoblements.innerHTML = $a7d299cc0551ebe181191433d12c53c5$var$translations.action.showEnnoblements;
    showEnnoblements.addEventListener('click', $a7d299cc0551ebe181191433d12c53c5$var$handleShowPlayerEnnoblementsClick);
    $a7d299cc0551ebe181191433d12c53c5$var$actionContainer.appendChild($a7d299cc0551ebe181191433d12c53c5$var$wrapAction(showEnnoblements));
    const exportPlayerVillages = document.createElement('a');
    exportPlayerVillages.href = '#';
    exportPlayerVillages.innerHTML = $a7d299cc0551ebe181191433d12c53c5$var$translations.action.exportVillages;
    exportPlayerVillages.addEventListener('click', $a7d299cc0551ebe181191433d12c53c5$var$handleExportPlayerVillagesButtonClick);
    $a7d299cc0551ebe181191433d12c53c5$var$actionContainer.appendChild($a7d299cc0551ebe181191433d12c53c5$var$wrapAction(exportPlayerVillages));
  };
  (async function () {
    try {
      $a7d299cc0551ebe181191433d12c53c5$var$renderActions();
      const dataFromCache = $a7d299cc0551ebe181191433d12c53c5$var$loadDataFromCache();
      if (dataFromCache && dataFromCache.player) {
        $a7d299cc0551ebe181191433d12c53c5$var$render(dataFromCache);
      }
      const dataFromAPI = await $a7d299cc0551ebe181191433d12c53c5$var$loadData();
      if (dataFromAPI) {
        $a7d299cc0551ebe181191433d12c53c5$var$render(dataFromAPI);
      }
    } catch (error) {
      console.log('extended player profile', error);
    }
  })();
})();

