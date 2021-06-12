(function () {
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
  * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
  * They usually appear for dates that denote time before the timezones were introduced
  * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
  * and GMT+01:00:00 after that date)
  *
  * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
  * which would lead to incorrect calculations.
  *
  * This function returns the timezone offset in milliseconds that takes seconds in account.
  */
  function $1e5dc0a4c535edd7892d441879eac816$export$default(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }
  /**
  * @name startOfDay
  * @category Day Helpers
  * @summary Return the start of a day for the given date.
  *
  * @description
  * Return the start of a day for the given date.
  * The result will be in the local timezone.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} date - the original date
  * @returns {Date} the start of a day
  * @throws {TypeError} 1 argument required
  *
  * @example
  * // The start of a day for 2 September 2014 11:55:00:
  * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
  * //=> Tue Sep 02 2014 00:00:00
  */
  function $6f4c0ded0c1cab4632b54a519fb996bf$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  var $b3273b12dbf4d592ed4ac54eca4b836c$var$MILLISECONDS_IN_DAY = 86400000;
  /**
  * @name differenceInCalendarDays
  * @category Day Helpers
  * @summary Get the number of calendar days between the given dates.
  *
  * @description
  * Get the number of calendar days between the given dates. This means that the times are removed
  * from the dates and then the difference in days is calculated.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} dateLeft - the later date
  * @param {Date|Number} dateRight - the earlier date
  * @returns {Number} the number of calendar days
  * @throws {TypeError} 2 arguments required
  *
  * @example
  * // How many calendar days are between
  * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
  * const result = differenceInCalendarDays(
  *   new Date(2012, 6, 2, 0, 0),
  *   new Date(2011, 6, 2, 23, 0)
  * )
  * //=> 366
  * // How many calendar days are between
  * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
  * const result = differenceInCalendarDays(
  *   new Date(2011, 6, 3, 0, 1),
  *   new Date(2011, 6, 2, 23, 59)
  * )
  * //=> 1
  */
  function $b3273b12dbf4d592ed4ac54eca4b836c$export$default(dirtyDateLeft, dirtyDateRight) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var startOfDayLeft = $6f4c0ded0c1cab4632b54a519fb996bf$export$default(dirtyDateLeft);
    var startOfDayRight = $6f4c0ded0c1cab4632b54a519fb996bf$export$default(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - $1e5dc0a4c535edd7892d441879eac816$export$default(startOfDayLeft);
    var timestampRight = startOfDayRight.getTime() - $1e5dc0a4c535edd7892d441879eac816$export$default(startOfDayRight);
    // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / $b3273b12dbf4d592ed4ac54eca4b836c$var$MILLISECONDS_IN_DAY);
  }
  // Like `compareAsc` but uses local time not UTC, which is needed
  // for accurate equality comparisons of UTC timestamps that end up
  // having the same representation in local time, e.g. one hour before
  // DST ends vs. the instant that DST ends.
  function $c9f3457d5d95bb01e6c13491aea1fd03$var$compareLocalAsc(dateLeft, dateRight) {
    var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }
  /**
  * @name differenceInDays
  * @category Day Helpers
  * @summary Get the number of full days between the given dates.
  *
  * @description
  * Get the number of full day periods between two dates. Fractional days are
  * truncated towards zero.
  *
  * One "full day" is the distance between a local time in one day to the same
  * local time on the next or previous day. A full day can sometimes be less than
  * or more than 24 hours if a daylight savings change happens between two dates.
  *
  * To ignore DST and only measure exact 24-hour periods, use this instead:
  * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
  *
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} dateLeft - the later date
  * @param {Date|Number} dateRight - the earlier date
  * @returns {Number} the number of full days according to the local timezone
  * @throws {TypeError} 2 arguments required
  *
  * @example
  * // How many full days are between
  * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
  * const result = differenceInDays(
  *   new Date(2012, 6, 2, 0, 0),
  *   new Date(2011, 6, 2, 23, 0)
  * )
  * //=> 365
  * // How many full days are between
  * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
  * const result = differenceInDays(
  *   new Date(2011, 6, 3, 0, 1),
  *   new Date(2011, 6, 2, 23, 59)
  * )
  * //=> 0
  * // How many full days are between
  * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
  * // Note: because local time is used, the
  * // result will always be 92 days, even in
  * // time zones where DST starts and the
  * // period has only 92*24-1 hours.
  * const result = differenceInDays(
  *   new Date(2020, 5, 1),
  *   new Date(2020, 2, 1)
  * )
  //=> 92
  */
  function $c9f3457d5d95bb01e6c13491aea1fd03$export$default(dirtyDateLeft, dirtyDateRight) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var dateLeft = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDateLeft);
    var dateRight = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDateRight);
    var sign = $c9f3457d5d95bb01e6c13491aea1fd03$var$compareLocalAsc(dateLeft, dateRight);
    var difference = Math.abs($b3273b12dbf4d592ed4ac54eca4b836c$export$default(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference);
    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastDayNotFull = Number($c9f3457d5d95bb01e6c13491aea1fd03$var$compareLocalAsc(dateLeft, dateRight) === -sign);
    var result = sign * (difference - isLastDayNotFull);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  const $df85c597a30dfe85efd21eb9457ef85e$var$translations = {
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
  var $df85c597a30dfe85efd21eb9457ef85e$export$default = () => $df85c597a30dfe85efd21eb9457ef85e$var$translations[window.game_data.locale] || $df85c597a30dfe85efd21eb9457ef85e$var$translations.en_DK;
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
  var $39c4220bac5e8e55ae13cc7489410b3e$export$default = url => parseInt(new URLSearchParams(url).get('id'));
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
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
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
  };
  const $cd636dca561ab125eed59a2e82498a89$export$buildPlayerURL = function buildPlayerURL() {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return ("http://www.twstats.com/in/").concat(server, "/player/").concat(id);
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
  function $921f485217c0c6d00ec9dfbf07cee198$var$ownKeys(object, enumerableOnly) {
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
  function $921f485217c0c6d00ec9dfbf07cee198$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $921f485217c0c6d00ec9dfbf07cee198$var$ownKeys(Object(source), true).forEach(function (key) {
          $921f485217c0c6d00ec9dfbf07cee198$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $921f485217c0c6d00ec9dfbf07cee198$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $921f485217c0c6d00ec9dfbf07cee198$var$_defineProperty(obj, key, value) {
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
  // @name         Extended tribe profile
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
  // @version      1.1.6
  // @description  Extended tribe profile
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=info_ally*
  // @grant        none
  // @run-at       document-end
  // ==/UserScript==
  const $921f485217c0c6d00ec9dfbf07cee198$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $921f485217c0c6d00ec9dfbf07cee198$var$VERSION = $1f14636dcc53402ba1b7661b758ca0aa$export$default($921f485217c0c6d00ec9dfbf07cee198$var$SERVER);
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(window.location.search);
  const $921f485217c0c6d00ec9dfbf07cee198$var$LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID;
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_QUERY = "\n  query tribe(\n    $server: String!\n    $id: Int!\n    $dailyTribeStatsSort: [String!]\n    $dailyTribeStatsLimit: Int\n    $playersLimit: Int\n    $playersSort: [String!]\n    $playerFilter: PlayerFilter!\n    $dailyTribeStatsFilter: DailyTribeStatsFilter!\n  ) {\n    tribe(server: $server, id: $id) {\n      id\n      bestRank\n      bestRankAt\n      mostPoints\n      mostPointsAt\n      mostVillages\n      mostVillagesAt\n      createdAt\n      dominance\n    }\n    dailyTribeStats(\n      server: $server\n      limit: $dailyTribeStatsLimit\n      sort: $dailyTribeStatsSort\n      filter: $dailyTribeStatsFilter\n    ) {\n      items {\n        rank\n        rankAtt\n        rankDef\n        rankTotal\n        points\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        members\n      }\n    }\n    players(server: $server, sort: $playersSort, filter: $playerFilter, limit: $playersLimit) {\n      items {\n        id\n        rankAtt\n        rankDef\n        rankSup\n        rankTotal\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        dailyGrowth\n      }\n    }\n  }\n";
  const $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_QUERY = "\n    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n";
  const $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_PER_PAGE = 15;
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY = "\nquery tribeHistoryAndTribeDailyStats($server: String!,\n     $tribeHistoryFilter: TribeHistoryFilter!,\n     $dailyTribeStatsFilter: DailyTribeStatsFilter!,\n     $sort: [String!],\n     $offset: Int,\n     $limit: Int) {\n  tribeHistory(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $tribeHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreTotal\n      rankTotal\n      createDate\n      totalMembers\n    }\n  }\n  dailyTribeStats(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $dailyTribeStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        createDate\n        members\n      }\n    }\n}\n";
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_PER_PAGE = 15;
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_MEMBERS_DAILY_STATS_QUERY = "\nquery tribeMembersDailyStats($server: String!,\n     $filter: DailyPlayerStatsFilter!,\n     $limit: Int,\n     $sort: [String!]) {\n  dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n    items {\n        player {\n          id\n          name\n        }\n        points\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";
  let $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_MODE = 'points';
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_QUERY = "\n    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          player {\n            id\n            name\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n";
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID = 'tribeChangesPagination';
  const $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PER_PAGE = 15;
  const $921f485217c0c6d00ec9dfbf07cee198$var$contentValue = document.querySelector('#content_value');
  const $921f485217c0c6d00ec9dfbf07cee198$var$profileInfoTBody = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody');
  const $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer = $921f485217c0c6d00ec9dfbf07cee198$var$profileInfoTBody;
  const $921f485217c0c6d00ec9dfbf07cee198$var$otherElementsContainer = document.querySelector('#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)');
  const $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer = $921f485217c0c6d00ec9dfbf07cee198$var$contentValue.querySelector('h3').nextElementSibling.querySelector('tbody');
  const $921f485217c0c6d00ec9dfbf07cee198$var$translations = $df85c597a30dfe85efd21eb9457ef85e$export$default();
  const $921f485217c0c6d00ec9dfbf07cee198$var$loadDataFromCache = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($921f485217c0c6d00ec9dfbf07cee198$var$LOCAL_STORAGE_KEY);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$cacheTribeData = function cacheTribeData() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($921f485217c0c6d00ec9dfbf07cee198$var$LOCAL_STORAGE_KEY, data);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$getMemberIDs = () => {
    const ids = [];
    $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href.includes('info_player')) {
        ids.push($39c4220bac5e8e55ae13cc7489410b3e$export$default(href));
      }
    });
    return ids;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$getMemberNames = () => {
    const ids = [];
    $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href').includes('info_player')) {
        ids.push(a.innerText.trim());
      }
    });
    return ids;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$loadData = async () => {
    const memberIDs = $921f485217c0c6d00ec9dfbf07cee198$var$getMemberIDs();
    const data = await $3af05e958b2a20a26445518aba292c50$export$default({
      query: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_QUERY,
      variables: {
        server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER,
        id: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID,
        dailyTribeStatsSort: ['createDate DESC'],
        dailyTribeStatsLimit: 1,
        dailyTribeStatsFilter: {
          tribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID]
        },
        playersSort: ['rank ASC'],
        playersLimit: memberIDs.length,
        playerFilter: {
          id: memberIDs
        }
      }
    });
    $921f485217c0c6d00ec9dfbf07cee198$var$cacheTribeData(data);
    return data;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$renderTr = _ref => {
    let {title, data, id} = _ref;
    let tr = document.querySelector('#' + id);
    if (!tr) {
      tr = document.createElement('tr');
      tr.id = id;
      tr.appendChild(document.createElement('td'));
      tr.appendChild(document.createElement('td'));
      $921f485217c0c6d00ec9dfbf07cee198$var$profileInfoTBody.append(tr);
    }
    tr.children[0].innerHTML = title;
    tr.children[1].innerHTML = data;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$extendMembersData = players => {
    $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.parentElement.style.width = '100%';
    $921f485217c0c6d00ec9dfbf07cee198$var$contentValue.append($921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.parentElement);
    const heading = $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.querySelector('tr:first-child');
    if (heading.children.length !== 11) {
      [$921f485217c0c6d00ec9dfbf07cee198$var$translations.oda, $921f485217c0c6d00ec9dfbf07cee198$var$translations.odd, $921f485217c0c6d00ec9dfbf07cee198$var$translations.ods, $921f485217c0c6d00ec9dfbf07cee198$var$translations.od, $921f485217c0c6d00ec9dfbf07cee198$var$translations.dailyGrowth, $921f485217c0c6d00ec9dfbf07cee198$var$translations.playerLinks].forEach(v => {
        const th = document.createElement('th');
        th.innerHTML = v;
        heading.appendChild(th);
      });
    }
    $921f485217c0c6d00ec9dfbf07cee198$var$membersContainer.querySelectorAll('tr').forEach(tr => {
      const a = tr.querySelector('a');
      if (!a) {
        return;
      }
      const playerID = $39c4220bac5e8e55ae13cc7489410b3e$export$default(a.getAttribute('href'));
      const player = players.items.find(p => p.id === playerID);
      if (player) {
        [[player.scoreAtt, player.rankAtt], [player.scoreDef, player.rankDef], [player.scoreSup, player.rankSup], [player.scoreTotal, player.rankTotal], player.dailyGrowth, [{
          link: $d147509fefd1cb8b3b83e8f38f763543$export$buildPlayerURL($921f485217c0c6d00ec9dfbf07cee198$var$VERSION, $921f485217c0c6d00ec9dfbf07cee198$var$SERVER, player.id),
          label: 'TWHelp'
        }, {
          link: $cd636dca561ab125eed59a2e82498a89$export$buildPlayerURL($921f485217c0c6d00ec9dfbf07cee198$var$SERVER, player.id),
          label: 'TWStats'
        }]].forEach((data, index) => {
          let td = tr.children[5 + index];
          if (!td) {
            td = document.createElement('td');
            tr.appendChild(td);
          }
          if (Array.isArray(data)) {
            if (typeof data[0] === 'number') {
              td.innerHTML = ("").concat(data[0].toLocaleString(), " (<strong>").concat(data[1], "</strong>)");
            } else if (data[0].link) {
              td.innerHTML = data.map(_ref2 => {
                let {link, label} = _ref2;
                return ("<a target=\"_blank\" href=\"").concat(link, "\">").concat(label, "</a>");
              }).join('<br>');
            }
          } else if (typeof data === 'number') {
            td.innerHTML = data.toLocaleString();
          }
        });
      }
    });
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$render = _ref3 => {
    let {tribe, dailyTribeStats, players} = _ref3;
    [{
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.createdAt + ':',
      data: $87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribe.createdAt),
      id: 'created_at'
    }, {
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.dominance + ':',
      data: tribe.dominance.toFixed(2) + '%',
      id: 'dominance'
    }, {
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.bestRank + ':',
      data: tribe.bestRank + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribe.bestRankAt), ")"),
      id: 'best_rank'
    }, {
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.mostPoints + ':',
      data: tribe.mostPoints.toLocaleString() + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribe.mostPointsAt), ")"),
      id: 'most_points'
    }, {
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.mostVillages + ':',
      data: tribe.mostVillages + ' ' + ("(").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribe.mostVillagesAt), ")"),
      id: 'most_villages'
    }].forEach(data => {
      $921f485217c0c6d00ec9dfbf07cee198$var$renderTr(data);
    });
    if (dailyTribeStats && dailyTribeStats.items.length > 0) {
      $ba543a25c46eef82c43f0acea9c36e26$export$default($921f485217c0c6d00ec9dfbf07cee198$var$otherElementsContainer, dailyTribeStats.items[0]);
    }
    if (players && players.items.length > 0) {
      $921f485217c0c6d00ec9dfbf07cee198$var$extendMembersData(players);
    }
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeEnnoblementsClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_QUERY,
        variables: {
          filter: {
            or: {
              oldOwnerTribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID],
              newOwnerTribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID]
            }
          },
          offset: $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_PER_PAGE * (page - 1),
          limit: $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_PER_PAGE,
          sort: ['ennobledAt DESC'],
          server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER
        }
      });
      $88f173be92b23fde3128f694442fe0ce$export$default(e, data.ennoblements, {
        currentPage: page,
        limit: $921f485217c0c6d00ec9dfbf07cee198$var$ENNOBLEMENTS_PER_PAGE,
        onPageChange: $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeEnnoblementsClick
      });
    }
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeHistoryClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      try {
        const filter = {
          tribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID]
        };
        const {tribeHistory, dailyTribeStats} = await $3af05e958b2a20a26445518aba292c50$export$default({
          query: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_AND_TRIBE_DAILY_STATS_QUERY,
          variables: {
            server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER,
            offset: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_PER_PAGE * (page - 1),
            limit: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_PER_PAGE,
            sort: ['createDate DESC'],
            tribeHistoryFilter: filter,
            dailyTribeStatsFilter: filter
          }
        });
        $534d870a885ff77d9d644b38d467ea92$export$default(e, tribeHistory, dailyTribeStats, {
          currentPage: page,
          limit: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_HISTORY_PER_PAGE,
          tribe: true,
          onPageChange: $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeHistoryClick
        });
      } catch (error) {
        console.log('couldnt load tribe history', error);
      }
    }
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$getMembersGrowthTdStyle = value => {
    const statIncreaseStyle = 'color: #000; background-color: #0f0';
    const statDecreaseStyle = 'color: #000; background-color: #f00';
    const defaultStyle = 'color: #000; background-color: #808080';
    return value > 0 ? statIncreaseStyle : value < 0 ? statDecreaseStyle : defaultStyle;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$mapMembersGrowthTdValue = i => {
    switch ($921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_MODE) {
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
  const $921f485217c0c6d00ec9dfbf07cee198$var$buildMembersGrowthTBody = stats => {
    const dates = [...new Set(stats.items.map(item => item.createDate))].reverse();
    return ("\n    <tbody>\n        <tr>\n          <th>").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.player, "</th>\n          ").concat(dates.map(date => {
      return ("<th>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(date, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }), "</th>");
    }).join(''), "\n          <th>").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.total, "</th>\n        </tr>\n        ").concat($921f485217c0c6d00ec9dfbf07cee198$var$getMemberIDs().map(id => {
      const filtered = stats.items.filter(item => item.player && item.player.id === id).reverse();
      let player = undefined;
      if (filtered.length > 0) {
        player = filtered[0].player;
      }
      const tds = [];
      let total = 0;
      for (let date of dates) {
        const i = filtered.find(i => i.createDate === date);
        let val = 0;
        if (i) {
          val = $921f485217c0c6d00ec9dfbf07cee198$var$mapMembersGrowthTdValue(i);
        }
        total += val;
        tds.push(("<td style=\"").concat($921f485217c0c6d00ec9dfbf07cee198$var$getMembersGrowthTdStyle(val), "\">").concat(val.toLocaleString(), "</td>"));
      }
      return ("<tr>\n            <td>\n              ").concat(player ? ("<a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(id), "\">").concat(player.name, "</a>") : '-', "\n            </td>\n            ").concat(tds.join(''), "\n            <td style=\"").concat($921f485217c0c6d00ec9dfbf07cee198$var$getMembersGrowthTdStyle(total), "\"><strong>").concat(total.toLocaleString(), "</strong></td>\n          </tr>");
    }).join(''), "\n      </tbody>\n  ");
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_TABLE_ID = 'membersGrowth';
  const $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_FORM = $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_TABLE_ID + 'Form';
  const $921f485217c0c6d00ec9dfbf07cee198$var$createChangeTypeHandler = stats => e => {
    e.preventDefault();
    $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_MODE = e.target[0].value;
    document.querySelector('#' + $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_TABLE_ID).innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$buildMembersGrowthTBody(stats);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$renderMembersGrowthPopup = (e, stats) => {
    const formOptions = [['points', $921f485217c0c6d00ec9dfbf07cee198$var$translations.points], ['villages', $921f485217c0c6d00ec9dfbf07cee198$var$translations.villages], ['od', $921f485217c0c6d00ec9dfbf07cee198$var$translations.opponentsDefeated], ['oda', $921f485217c0c6d00ec9dfbf07cee198$var$translations.opponentsDefeatedAsAttacker], ['odd', $921f485217c0c6d00ec9dfbf07cee198$var$translations.opponentsDefeatedAsDefender], ['ods', $921f485217c0c6d00ec9dfbf07cee198$var$translations.opponentsDefeatedAsSupporter]].map(v => ("<option ").concat($921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_MODE === v[0] ? 'selected="selected"' : '', " value=\"").concat(v[0], "\">").concat(v[1], "</option>"));
    const html = ("\n    <form id=\"").concat($921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_FORM, "\">\n      <select>\n        ").concat(formOptions.join(''), "\n      </select>\n      <button type=\"submit\">").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.change, "</button>\n    </form>\n    <table id=\"").concat($921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_TABLE_ID, "\" class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      ").concat($921f485217c0c6d00ec9dfbf07cee198$var$buildMembersGrowthTBody(stats), "\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.membersGrowth,
      id: 'mg',
      html
    });
    document.querySelector('#' + $921f485217c0c6d00ec9dfbf07cee198$var$MEMBERS_GROWTH_FORM).addEventListener('submit', $921f485217c0c6d00ec9dfbf07cee198$var$createChangeTypeHandler(stats));
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$loadMembersGrowthData = async function loadMembersGrowthData() {
    let {createDateLTE, createDateGT} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const memberIDs = $921f485217c0c6d00ec9dfbf07cee198$var$getMemberIDs();
    const limit = memberIDs.length * $c9f3457d5d95bb01e6c13491aea1fd03$export$default(createDateLTE, createDateGT);
    const filter = {
      playerID: memberIDs,
      createDateLTE,
      createDateGT
    };
    return await $3af05e958b2a20a26445518aba292c50$export$default({
      query: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_MEMBERS_DAILY_STATS_QUERY,
      variables: {
        filter,
        limit,
        sort: ['createDate DESC'],
        server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER
      }
    });
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleShowMembersGrowthClick = async e => {
    e.preventDefault();
    const createDateGT = new Date();
    createDateGT.setDate(createDateGT.getDate() - 7);
    const data = await $921f485217c0c6d00ec9dfbf07cee198$var$loadMembersGrowthData({
      createDateLTE: new Date(),
      createDateGT
    });
    $921f485217c0c6d00ec9dfbf07cee198$var$renderMembersGrowthPopup(e, data.dailyPlayerStats);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$renderTribeChanges = (e, currentPage, tribeChanges) => {
    const paginationItems = $13593d6974cda38c64f44fff96e2987d$export$generatePaginationItems({
      total: tribeChanges.total,
      limit: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PER_PAGE,
      currentPage
    });
    const html = ("\n    <div style=\"").concat($13593d6974cda38c64f44fff96e2987d$export$getContainerStyles(), "\" id=\"").concat($921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID, "\">\n      ").concat(paginationItems.join(''), "\n    </div>\n    <table class=\"vis\" style=\"border-collapse: separate; border-spacing: 2px; width: 100%;\">\n      <tbody>\n        <tr>\n          <th>\n            ").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.date, "\n          </th>\n          <th>\n            ").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.player, "\n          </th>\n          <th>\n            ").concat($921f485217c0c6d00ec9dfbf07cee198$var$translations.act, "\n          </th>\n        </tr>\n        ").concat(tribeChanges.items.map(tribeChange => {
      let rowHTML = '<tr>' + ("<td>").concat($87a1b3fb6327eb299adebba75fcb33c5$export$formatDate(tribeChange.createdAt), "</td>");
      if (tribeChange.player) {
        rowHTML += ("<td><a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(tribeChange.player.id), "\">").concat(tribeChange.player.name, "</a></td>");
      } else {
        rowHTML += '<td>-</td>';
      }
      rowHTML += ("<td><strong>").concat(tribeChange.newTribe && tribeChange.newTribe.id === $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID ? $921f485217c0c6d00ec9dfbf07cee198$var$translations.joined : $921f485217c0c6d00ec9dfbf07cee198$var$translations.left, "</strong></td>");
      return rowHTML + '</tr>';
    }).join(''), "\n      </tbody>\n    </table>\n  ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      e,
      title: $921f485217c0c6d00ec9dfbf07cee198$var$translations.tribeChanges,
      id: 'tribeChanges',
      html
    });
    document.querySelectorAll('#' + $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PAGINATION_CONTAINER_ID + ' a').forEach(el => {
      el.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeChangesClick);
    });
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeChangesClick = async e => {
    e.preventDefault();
    const page = $13593d6974cda38c64f44fff96e2987d$export$getPage(e.target);
    if (!isNaN(page)) {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_QUERY,
        variables: {
          filter: {
            or: {
              oldTribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID],
              newTribeID: [$921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID]
            }
          },
          offset: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PER_PAGE * (page - 1),
          limit: $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_CHANGES_PER_PAGE,
          sort: ['createdAt DESC'],
          server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER
        }
      });
      $921f485217c0c6d00ec9dfbf07cee198$var$renderTribeChanges(e, page, data.tribeChanges);
    }
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleGenerateMailingListClick = e => {
    e.preventDefault();
    const members = $921f485217c0c6d00ec9dfbf07cee198$var$getMemberNames();
    const chunks = [];
    for (let i = 0; i < members.length; i += 50) {
      chunks.push(members.slice(i, i + 50));
    }
    let html = '';
    chunks.forEach((names, index) => {
      html += ("<h3 style=\"margin-bottom: 5px;\">").concat(index + 1, ".</h3>\n    <textarea cols=30 rows=8 readonly style=\"margin-bottom: 15px;\">").concat(names.join(';'), "</textarea>");
    });
    Dialog.show('mailinglist', html);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$loadVillages = async function loadVillages(variables) {
    let total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    try {
      const data = await $3af05e958b2a20a26445518aba292c50$export$default({
        variables,
        query: ("\n        query villages($server: String!, $sort: [String!], $limit: Int, $offset: Int, $filter: VillageFilter!) {\n          villages(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $filter) {\n            ").concat(total ? 'total' : '', "\n            items {\n              id\n              x\n              y\n            }\n          }\n        }\n      ")
      });
      if (data && data.villages && Array.isArray(data.villages.items)) {
        return data.villages;
      }
    } catch (error) {
      console.log('load villages', error);
    }
    return {
      total: 0,
      items: []
    };
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$showLoadingDialog = function showLoadingDialog() {
    let current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!current || !total) {
      return Dialog.show('loading', '<strong>Loading...</strong>');
    }
    return Dialog.show('loading', ("Loaded: <strong>").concat(current, "</strong>/<strong>").concat(total, "</strong>"));
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleExportTribeVillagesFormSubmit = async e => {
    e.preventDefault();
    let limit = parseInt(e.target[4].value);
    const variables = {
      filter: {
        xLTE: parseInt(e.target[0].value),
        xGTE: parseInt(e.target[1].value),
        yLTE: parseInt(e.target[2].value),
        yGTE: parseInt(e.target[3].value),
        playerID: $921f485217c0c6d00ec9dfbf07cee198$var$getMemberIDs()
      },
      limit: isNaN(limit) || !limit ? 0 : limit,
      sort: ['id ASC'],
      server: $921f485217c0c6d00ec9dfbf07cee198$var$SERVER
    };
    $921f485217c0c6d00ec9dfbf07cee198$var$showLoadingDialog();
    let {total, items} = await $921f485217c0c6d00ec9dfbf07cee198$var$loadVillages(variables, true);
    const length = items.length;
    if (limit !== 0 && limit < total) {
      total = limit;
    }
    if (isNaN(limit) || !limit || limit > length) {
      for (let offset = length; offset < total; offset += length) {
        $921f485217c0c6d00ec9dfbf07cee198$var$showLoadingDialog(offset, total);
        const more = await $921f485217c0c6d00ec9dfbf07cee198$var$loadVillages($921f485217c0c6d00ec9dfbf07cee198$var$_objectSpread($921f485217c0c6d00ec9dfbf07cee198$var$_objectSpread({}, variables), {}, {
          filter: $921f485217c0c6d00ec9dfbf07cee198$var$_objectSpread({}, variables.filter),
          offset
        }));
        items = [...items, ...more.items];
      }
    }
    Dialog.show('exportTribeVillages', ("\n    <textarea cols=60 rows=8 readonly>").concat(items.map(item => ("").concat(item.x, "|").concat(item.y)).join(' '), "</textarea>\n  "));
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$handleExportTribeVillagesClick = e => {
    e.preventDefault();
    const FORM_ID = 'etvForm';
    const html = ("\n    <div style=\"display: flex; align-items: center; justify-content: center;\">\n      <form id=\"").concat(FORM_ID, "\">\n        <div>\n          <label>X <= </label>\n          <input type=\"number\" min=\"0\" value=\"1000\" required />\n        </div>\n        <div>\n          <label>X >= </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <div>\n          <label>Y <= </label>\n          <input type=\"number\" min=\"0\" value=\"1000\" required />\n        </div>\n        <div>\n          <label>Y >= </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <div>\n          <label>Limit: </label>\n          <input type=\"number\" min=\"0\" value=\"0\" required />\n        </div>\n        <button type=\"submit\">Export</button>\n      </form>\n    </div>\n  ");
    Dialog.show('exportTribeVillages', html);
    document.querySelector('#' + FORM_ID).addEventListener('submit', $921f485217c0c6d00ec9dfbf07cee198$var$handleExportTribeVillagesFormSubmit);
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$wrapAction = action => {
    const actionWrapperTd = document.createElement('td');
    actionWrapperTd.colSpan = '2';
    actionWrapperTd.append(action);
    const actionWrapperTr = document.createElement('tr');
    actionWrapperTr.appendChild(actionWrapperTd);
    return actionWrapperTr;
  };
  const $921f485217c0c6d00ec9dfbf07cee198$var$renderActions = () => {
    const linkToTWHelp = document.createElement('a');
    linkToTWHelp.href = $d147509fefd1cb8b3b83e8f38f763543$export$buildTribeURL($921f485217c0c6d00ec9dfbf07cee198$var$VERSION, $921f485217c0c6d00ec9dfbf07cee198$var$SERVER, $921f485217c0c6d00ec9dfbf07cee198$var$TRIBE_ID);
    linkToTWHelp.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.linkToTWHelp;
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(linkToTWHelp));
    const showEnnoblements = document.createElement('a');
    showEnnoblements.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showEnnoblements, '1');
    showEnnoblements.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.showEnnoblements;
    showEnnoblements.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeEnnoblementsClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(showEnnoblements));
    const showHistory = document.createElement('a');
    showHistory.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showHistory, '1');
    showHistory.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.showHistory;
    showHistory.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeHistoryClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(showHistory));
    const showTribeChanges = document.createElement('a');
    showTribeChanges.href = '#';
    $13593d6974cda38c64f44fff96e2987d$export$setPage(showTribeChanges, '1');
    showTribeChanges.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.showTribeChanges;
    showTribeChanges.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleShowTribeChangesClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(showTribeChanges));
    const showMembersGrowth = document.createElement('a');
    showMembersGrowth.href = '#';
    showMembersGrowth.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.showMembersGrowth;
    showMembersGrowth.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleShowMembersGrowthClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(showMembersGrowth));
    const generateMailingList = document.createElement('a');
    generateMailingList.href = '#';
    generateMailingList.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.generateMailingList;
    generateMailingList.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleGenerateMailingListClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(generateMailingList));
    const exportVillages = document.createElement('a');
    exportVillages.href = '#';
    exportVillages.innerHTML = $921f485217c0c6d00ec9dfbf07cee198$var$translations.action.exportVillages;
    exportVillages.addEventListener('click', $921f485217c0c6d00ec9dfbf07cee198$var$handleExportTribeVillagesClick);
    $921f485217c0c6d00ec9dfbf07cee198$var$actionContainer.appendChild($921f485217c0c6d00ec9dfbf07cee198$var$wrapAction(exportVillages));
  };
  (async function () {
    try {
      $921f485217c0c6d00ec9dfbf07cee198$var$renderActions();
      const dataFromCache = $921f485217c0c6d00ec9dfbf07cee198$var$loadDataFromCache();
      if (dataFromCache && dataFromCache.tribe) {
        $921f485217c0c6d00ec9dfbf07cee198$var$render(dataFromCache);
      }
      const dataFromAPI = await $921f485217c0c6d00ec9dfbf07cee198$var$loadData();
      if (dataFromAPI) {
        $921f485217c0c6d00ec9dfbf07cee198$var$render(dataFromAPI);
      }
    } catch (error) {
      console.log('extended tribe profile', error);
    }
  })();
})();

