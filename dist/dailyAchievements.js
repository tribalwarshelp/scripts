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
  * @name isValid
  * @category Common Helpers
  * @summary Is the given date valid?
  *
  * @description
  * Returns false if argument is Invalid Date and true otherwise.
  * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
  * Invalid Date is a Date, whose time value is NaN.
  *
  * Time value of Date: http://es5.github.io/#x15.9.1.1
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * - Now `isValid` doesn't throw an exception
  *   if the first argument is not an instance of Date.
  *   Instead, argument is converted beforehand using `toDate`.
  *
  *   Examples:
  *
  *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
  *   |---------------------------|---------------|---------------|
  *   | `new Date()`              | `true`        | `true`        |
  *   | `new Date('2016-01-01')`  | `true`        | `true`        |
  *   | `new Date('')`            | `false`       | `false`       |
  *   | `new Date(1488370835081)` | `true`        | `true`        |
  *   | `new Date(NaN)`           | `false`       | `false`       |
  *   | `'2016-01-01'`            | `TypeError`   | `false`       |
  *   | `''`                      | `TypeError`   | `false`       |
  *   | `1488370835081`           | `TypeError`   | `true`        |
  *   | `NaN`                     | `TypeError`   | `false`       |
  *
  *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
  *   that try to coerce arguments to the expected type
  *   (which is also the case with other *date-fns* functions).
  *
  * @param {*} date - the date to check
  * @returns {Boolean} the date is valid
  * @throws {TypeError} 1 argument required
  *
  * @example
  * // For the valid date:
  * var result = isValid(new Date(2014, 1, 31))
  * //=> true
  *
  * @example
  * // For the value, convertable into a date:
  * var result = isValid(1393804800000)
  * //=> true
  *
  * @example
  * // For the invalid date:
  * var result = isValid(new Date(''))
  * //=> false
  */
  function $9f3abccc6bcce2be062107647201d225$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    return !isNaN(date);
  }
  var $af5ae195c918de448c5161b2fb827963$var$formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },
    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },
    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks'
    },
    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks'
    },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },
    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },
    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };
  function $af5ae195c918de448c5161b2fb827963$export$default(token, count, options) {
    options = options || ({});
    var result;
    if (typeof $af5ae195c918de448c5161b2fb827963$var$formatDistanceLocale[token] === 'string') {
      result = $af5ae195c918de448c5161b2fb827963$var$formatDistanceLocale[token];
    } else if (count === 1) {
      result = $af5ae195c918de448c5161b2fb827963$var$formatDistanceLocale[token].one;
    } else {
      result = $af5ae195c918de448c5161b2fb827963$var$formatDistanceLocale[token].other.replace('{{count}}', count);
    }
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }
    return result;
  }
  function $601bcbb57db8e79c76c0c0045fe97d0e$export$default(args) {
    return function (dirtyOptions) {
      var options = dirtyOptions || ({});
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }
  var $d03d651528c41c13a935389aaf457a5e$var$dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
  };
  var $d03d651528c41c13a935389aaf457a5e$var$timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
  };
  var $d03d651528c41c13a935389aaf457a5e$var$dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };
  var $d03d651528c41c13a935389aaf457a5e$export$default = {
    date: $601bcbb57db8e79c76c0c0045fe97d0e$export$default({
      formats: $d03d651528c41c13a935389aaf457a5e$var$dateFormats,
      defaultWidth: 'full'
    }),
    time: $601bcbb57db8e79c76c0c0045fe97d0e$export$default({
      formats: $d03d651528c41c13a935389aaf457a5e$var$timeFormats,
      defaultWidth: 'full'
    }),
    dateTime: $601bcbb57db8e79c76c0c0045fe97d0e$export$default({
      formats: $d03d651528c41c13a935389aaf457a5e$var$dateTimeFormats,
      defaultWidth: 'full'
    })
  };
  var $64b9b8ef8e7f61cef206fda76895899b$var$formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
  };
  function $64b9b8ef8e7f61cef206fda76895899b$export$default(token, _date, _baseDate, _options) {
    return $64b9b8ef8e7f61cef206fda76895899b$var$formatRelativeLocale[token];
  }
  function $063a8fe6186d2e1f790f2c7201b4cc7c$export$default(args) {
    return function (dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || ({});
      var context = options.context ? String(options.context) : 'standalone';
      var valuesArray;
      if (context === 'formatting' && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }
  var $edb16548602ab1d797ec3d23d7087a5f$var$eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini']
  };
  var $edb16548602ab1d797ec3d23d7087a5f$var$quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
  };
  var $edb16548602ab1d797ec3d23d7087a5f$var$monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  var $edb16548602ab1d797ec3d23d7087a5f$var$dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  var $edb16548602ab1d797ec3d23d7087a5f$var$dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    }
  };
  var $edb16548602ab1d797ec3d23d7087a5f$var$formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    }
  };
  function $edb16548602ab1d797ec3d23d7087a5f$var$ordinalNumber(dirtyNumber, _dirtyOptions) {
    var number = Number(dirtyNumber);
    // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`:
    // 
    // var options = dirtyOptions || {}
    // var unit = String(options.unit)
    // 
    // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st';
        case 2:
          return number + 'nd';
        case 3:
          return number + 'rd';
      }
    }
    return number + 'th';
  }
  var $edb16548602ab1d797ec3d23d7087a5f$export$default = {
    ordinalNumber: $edb16548602ab1d797ec3d23d7087a5f$var$ordinalNumber,
    era: $063a8fe6186d2e1f790f2c7201b4cc7c$export$default({
      values: $edb16548602ab1d797ec3d23d7087a5f$var$eraValues,
      defaultWidth: 'wide'
    }),
    quarter: $063a8fe6186d2e1f790f2c7201b4cc7c$export$default({
      values: $edb16548602ab1d797ec3d23d7087a5f$var$quarterValues,
      defaultWidth: 'wide',
      argumentCallback: function (quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: $063a8fe6186d2e1f790f2c7201b4cc7c$export$default({
      values: $edb16548602ab1d797ec3d23d7087a5f$var$monthValues,
      defaultWidth: 'wide'
    }),
    day: $063a8fe6186d2e1f790f2c7201b4cc7c$export$default({
      values: $edb16548602ab1d797ec3d23d7087a5f$var$dayValues,
      defaultWidth: 'wide'
    }),
    dayPeriod: $063a8fe6186d2e1f790f2c7201b4cc7c$export$default({
      values: $edb16548602ab1d797ec3d23d7087a5f$var$dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: $edb16548602ab1d797ec3d23d7087a5f$var$formattingDayPeriodValues,
      defaultFormattingWidth: 'wide'
    })
  };
  function $04898f84f553404b5ec92df2543959d4$export$default(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || ({});
      var matchResult = string.match(args.matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult) {
        return null;
      }
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }
  function $c27f9966a203ec3e38f2c4484638744c$export$default(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || ({});
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var value;
      if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
        value = $c27f9966a203ec3e38f2c4484638744c$var$findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      } else {
        value = $c27f9966a203ec3e38f2c4484638744c$var$findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      }
      value = args.valueCallback ? args.valueCallback(value) : value;
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }
  function $c27f9966a203ec3e38f2c4484638744c$var$findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
  }
  function $c27f9966a203ec3e38f2c4484638744c$var$findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
  }
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseOrdinalNumberPattern = /\d+/i;
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var $efa6ce01b3c72c03ca04fedd15b0b1dc$export$default = {
    ordinalNumber: $04898f84f553404b5ec92df2543959d4$export$default({
      matchPattern: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchOrdinalNumberPattern,
      parsePattern: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseOrdinalNumberPattern,
      valueCallback: function (value) {
        return parseInt(value, 10);
      }
    }),
    era: $c27f9966a203ec3e38f2c4484638744c$export$default({
      matchPatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseEraPatterns,
      defaultParseWidth: 'any'
    }),
    quarter: $c27f9966a203ec3e38f2c4484638744c$export$default({
      matchPatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: function (index) {
        return index + 1;
      }
    }),
    month: $c27f9966a203ec3e38f2c4484638744c$export$default({
      matchPatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseMonthPatterns,
      defaultParseWidth: 'any'
    }),
    day: $c27f9966a203ec3e38f2c4484638744c$export$default({
      matchPatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseDayPatterns,
      defaultParseWidth: 'any'
    }),
    dayPeriod: $c27f9966a203ec3e38f2c4484638744c$export$default({
      matchPatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: $efa6ce01b3c72c03ca04fedd15b0b1dc$var$parseDayPeriodPatterns,
      defaultParseWidth: 'any'
    })
  };
  /**
  * @type {Locale}
  * @category Locales
  * @summary English locale (United States).
  * @language English
  * @iso-639-2 eng
  * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
  * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
  */
  var $807b1f3a9a2de2b79a9bb1f7f1dd4c42$export$default = {
    code: 'en-US',
    formatDistance: $af5ae195c918de448c5161b2fb827963$export$default,
    formatLong: $d03d651528c41c13a935389aaf457a5e$export$default,
    formatRelative: $64b9b8ef8e7f61cef206fda76895899b$export$default,
    localize: $edb16548602ab1d797ec3d23d7087a5f$export$default,
    match: $efa6ce01b3c72c03ca04fedd15b0b1dc$export$default,
    options: {
      weekStartsOn: 0,
      /*Sunday*/
      firstWeekContainsDate: 1
    }
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
  * @name addMilliseconds
  * @category Millisecond Helpers
  * @summary Add the specified number of milliseconds to the given date.
  *
  * @description
  * Add the specified number of milliseconds to the given date.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} date - the date to be changed
  * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
  * @returns {Date} the new date with the milliseconds added
  * @throws {TypeError} 2 arguments required
  *
  * @example
  * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
  * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
  * //=> Thu Jul 10 2014 12:45:30.750
  */
  function $11f02e6f39aa1698d361463648fba3d0$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var timestamp = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate).getTime();
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    return new Date(timestamp + amount);
  }
  /**
  * @name subMilliseconds
  * @category Millisecond Helpers
  * @summary Subtract the specified number of milliseconds from the given date.
  *
  * @description
  * Subtract the specified number of milliseconds from the given date.
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * @param {Date|Number} date - the date to be changed
  * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
  * @returns {Date} the new date with the milliseconds subtracted
  * @throws {TypeError} 2 arguments required
  *
  * @example
  * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
  * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
  * //=> Thu Jul 10 2014 12:45:29.250
  */
  function $fbfb2a8e0aab45b7d81bf45460dfe6e6$export$default(dirtyDate, dirtyAmount) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var amount = $76d20ec5245457ba4d0be92324e15d11$export$default(dirtyAmount);
    return $11f02e6f39aa1698d361463648fba3d0$export$default(dirtyDate, -amount);
  }
  function $af15729eae81e8788655f6959813fca7$export$default(number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return sign + output;
  }
  /*
  * |     | Unit                           |     | Unit                           |
  * |-----|--------------------------------|-----|--------------------------------|
  * |  a  | AM, PM                         |  A* |                                |
  * |  d  | Day of month                   |  D  |                                |
  * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
  * |  m  | Minute                         |  M  | Month                          |
  * |  s  | Second                         |  S  | Fraction of second             |
  * |  y  | Year (abs)                     |  Y  |                                |
  *
  * Letters marked by * are not implemented but reserved by Unicode standard.
  */
  var $5e5446392772c21c578c945508e44e6b$export$default = {
    // Year
    y: function (date, token) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
      var signedYear = date.getUTCFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return $af15729eae81e8788655f6959813fca7$export$default(token === 'yy' ? year % 100 : year, token.length);
    },
    // Month
    M: function (date, token) {
      var month = date.getUTCMonth();
      return token === 'M' ? String(month + 1) : $af15729eae81e8788655f6959813fca7$export$default(month + 1, 2);
    },
    // Day of the month
    d: function (date, token) {
      return $af15729eae81e8788655f6959813fca7$export$default(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function (date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
      switch (token) {
        case 'a':
        case 'aa':
          return dayPeriodEnumValue.toUpperCase();
        case 'aaa':
          return dayPeriodEnumValue;
        case 'aaaaa':
          return dayPeriodEnumValue[0];
        case 'aaaa':
        default:
          return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
      }
    },
    // Hour [1-12]
    h: function (date, token) {
      return $af15729eae81e8788655f6959813fca7$export$default(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function (date, token) {
      return $af15729eae81e8788655f6959813fca7$export$default(date.getUTCHours(), token.length);
    },
    // Minute
    m: function (date, token) {
      return $af15729eae81e8788655f6959813fca7$export$default(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function (date, token) {
      return $af15729eae81e8788655f6959813fca7$export$default(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function (date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return $af15729eae81e8788655f6959813fca7$export$default(fractionalSeconds, token.length);
    }
  };
  var $9d113a4ed556945096e6c9063beac0c8$var$MILLISECONDS_IN_DAY = 86400000;
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $9d113a4ed556945096e6c9063beac0c8$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / $9d113a4ed556945096e6c9063beac0c8$var$MILLISECONDS_IN_DAY) + 1;
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $ae30d016311b28f7594240ac1880d7c7$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var weekStartsOn = 1;
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $02185343cade05e104d91834e6aee75f$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = $ae30d016311b28f7594240ac1880d7c7$export$default(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = $ae30d016311b28f7594240ac1880d7c7$export$default(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $bd71cbfd3eab3e839f70061a9822618c$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var year = $02185343cade05e104d91834e6aee75f$export$default(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = $ae30d016311b28f7594240ac1880d7c7$export$default(fourthOfJanuary);
    return date;
  }
  var $8186dd95d178a425c6133b92a5f54d5e$var$MILLISECONDS_IN_WEEK = 604800000;
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $8186dd95d178a425c6133b92a5f54d5e$export$default(dirtyDate) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var diff = $ae30d016311b28f7594240ac1880d7c7$export$default(date).getTime() - $bd71cbfd3eab3e839f70061a9822618c$export$default(date).getTime();
    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / $8186dd95d178a425c6133b92a5f54d5e$var$MILLISECONDS_IN_WEEK) + 1;
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $d499db06b95a8b8b1b5b5a19e6c3f53e$export$default(dirtyDate, dirtyOptions) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var options = dirtyOptions || ({});
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : $76d20ec5245457ba4d0be92324e15d11$export$default(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : $76d20ec5245457ba4d0be92324e15d11$export$default(options.weekStartsOn);
    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $1d4201c4fa38e76b60e0ff4c488f61f5$export$default(dirtyDate, dirtyOptions) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();
    var options = dirtyOptions || ({});
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $76d20ec5245457ba4d0be92324e15d11$export$default(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $76d20ec5245457ba4d0be92324e15d11$export$default(options.firstWeekContainsDate);
    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = $d499db06b95a8b8b1b5b5a19e6c3f53e$export$default(firstWeekOfNextYear, dirtyOptions);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = $d499db06b95a8b8b1b5b5a19e6c3f53e$export$default(firstWeekOfThisYear, dirtyOptions);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $8037b6dc9b18d8aedae5fea2d33d0790$export$default(dirtyDate, dirtyOptions) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var options = dirtyOptions || ({});
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $76d20ec5245457ba4d0be92324e15d11$export$default(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $76d20ec5245457ba4d0be92324e15d11$export$default(options.firstWeekContainsDate);
    var year = $1d4201c4fa38e76b60e0ff4c488f61f5$export$default(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = $d499db06b95a8b8b1b5b5a19e6c3f53e$export$default(firstWeek, dirtyOptions);
    return date;
  }
  var $3827dcceb609d6bcd5512e2cd225051e$var$MILLISECONDS_IN_WEEK = 604800000;
  // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376
  function $3827dcceb609d6bcd5512e2cd225051e$export$default(dirtyDate, options) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(1, arguments);
    var date = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    var diff = $d499db06b95a8b8b1b5b5a19e6c3f53e$export$default(date, options).getTime() - $8037b6dc9b18d8aedae5fea2d33d0790$export$default(date, options).getTime();
    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / $3827dcceb609d6bcd5512e2cd225051e$var$MILLISECONDS_IN_WEEK) + 1;
  }
  var $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  };
  var $729bdfda59a079a96ef4d2b07705f531$export$default = {
    // Era
    G: function (date, token, localize) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, {
            width: 'abbreviated'
          });
        case 'GGGGG':
          return localize.era(era, {
            width: 'narrow'
          });
        case 'GGGG':
        default:
          return localize.era(era, {
            width: 'wide'
          });
      }
    },
    // Year
    y: function (date, token, localize) {
      // Ordinal number
      if (token === 'yo') {
        var signedYear = date.getUTCFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize.ordinalNumber(year, {
          unit: 'year'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.y(date, token);
    },
    // Local week-numbering year
    Y: function (date, token, localize, options) {
      var signedWeekYear = $1d4201c4fa38e76b60e0ff4c488f61f5$export$default(date, options);
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      // Two digit year
      if (token === 'YY') {
        var twoDigitYear = weekYear % 100;
        return $af15729eae81e8788655f6959813fca7$export$default(twoDigitYear, 2);
      }
      // Ordinal number
      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, {
          unit: 'year'
        });
      }
      // Padding
      return $af15729eae81e8788655f6959813fca7$export$default(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function (date, token) {
      var isoWeekYear = $02185343cade05e104d91834e6aee75f$export$default(date);
      // Padding
      return $af15729eae81e8788655f6959813fca7$export$default(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function (date, token) {
      var year = date.getUTCFullYear();
      return $af15729eae81e8788655f6959813fca7$export$default(year, token.length);
    },
    // Quarter
    Q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case 'Q':
          return String(quarter);
        case 'QQ':
          return $af15729eae81e8788655f6959813fca7$export$default(quarter, 2);
        case 'Qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        case 'QQQ':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'QQQQQ':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'QQQQ':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone quarter
    q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case 'q':
          return String(quarter);
        case 'qq':
          return $af15729eae81e8788655f6959813fca7$export$default(quarter, 2);
        case 'qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        case 'qqq':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'standalone'
          });
        case 'qqqqq':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'standalone'
          });
        case 'qqqq':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Month
    M: function (date, token, localize) {
      var month = date.getUTCMonth();
      switch (token) {
        case 'M':
        case 'MM':
          return $5e5446392772c21c578c945508e44e6b$export$default.M(date, token);
        case 'Mo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        case 'MMM':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'MMMMM':
          return localize.month(month, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'MMMM':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone month
    L: function (date, token, localize) {
      var month = date.getUTCMonth();
      switch (token) {
        case 'L':
          return String(month + 1);
        case 'LL':
          return $af15729eae81e8788655f6959813fca7$export$default(month + 1, 2);
        case 'Lo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        case 'LLL':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'standalone'
          });
        case 'LLLLL':
          return localize.month(month, {
            width: 'narrow',
            context: 'standalone'
          });
        case 'LLLL':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Local week of year
    w: function (date, token, localize, options) {
      var week = $3827dcceb609d6bcd5512e2cd225051e$export$default(date, options);
      if (token === 'wo') {
        return localize.ordinalNumber(week, {
          unit: 'week'
        });
      }
      return $af15729eae81e8788655f6959813fca7$export$default(week, token.length);
    },
    // ISO week of year
    I: function (date, token, localize) {
      var isoWeek = $8186dd95d178a425c6133b92a5f54d5e$export$default(date);
      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, {
          unit: 'week'
        });
      }
      return $af15729eae81e8788655f6959813fca7$export$default(isoWeek, token.length);
    },
    // Day of the month
    d: function (date, token, localize) {
      if (token === 'do') {
        return localize.ordinalNumber(date.getUTCDate(), {
          unit: 'date'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.d(date, token);
    },
    // Day of year
    D: function (date, token, localize) {
      var dayOfYear = $9d113a4ed556945096e6c9063beac0c8$export$default(date);
      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, {
          unit: 'dayOfYear'
        });
      }
      return $af15729eae81e8788655f6959813fca7$export$default(dayOfYear, token.length);
    },
    // Day of week
    E: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      switch (token) {
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'EEEEE':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'EEEEEE':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Local day of week
    e: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case 'e':
          return String(localDayOfWeek);
        case 'ee':
          return $af15729eae81e8788655f6959813fca7$export$default(localDayOfWeek, 2);
        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });
        case 'eee':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'eeeee':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'eeeeee':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        case 'eeee':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone local day of week
    c: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case 'c':
          return String(localDayOfWeek);
        case 'cc':
          return $af15729eae81e8788655f6959813fca7$export$default(localDayOfWeek, token.length);
        case 'co':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });
        case 'ccc':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'standalone'
          });
        case 'ccccc':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'standalone'
          });
        case 'cccccc':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'standalone'
          });
        case 'cccc':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // ISO day of week
    i: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        case 'i':
          return String(isoDayOfWeek);
        case 'ii':
          return $af15729eae81e8788655f6959813fca7$export$default(isoDayOfWeek, token.length);
        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, {
            unit: 'day'
          });
        case 'iii':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'iiiii':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'iiiiii':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        case 'iiii':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM or PM
    a: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      switch (token) {
        case 'a':
        case 'aa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'aaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();
        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM, PM, midnight, noon
    b: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      }
      switch (token) {
        case 'b':
        case 'bb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'bbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();
        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = $729bdfda59a079a96ef4d2b07705f531$var$dayPeriodEnum.night;
      }
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });
        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Hour [1-12]
    h: function (date, token, localize) {
      if (token === 'ho') {
        var hours = date.getUTCHours() % 12;
        if (hours === 0) hours = 12;
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.h(date, token);
    },
    // Hour [0-23]
    H: function (date, token, localize) {
      if (token === 'Ho') {
        return localize.ordinalNumber(date.getUTCHours(), {
          unit: 'hour'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.H(date, token);
    },
    // Hour [0-11]
    K: function (date, token, localize) {
      var hours = date.getUTCHours() % 12;
      if (token === 'Ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return $af15729eae81e8788655f6959813fca7$export$default(hours, token.length);
    },
    // Hour [1-24]
    k: function (date, token, localize) {
      var hours = date.getUTCHours();
      if (hours === 0) hours = 24;
      if (token === 'ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }
      return $af15729eae81e8788655f6959813fca7$export$default(hours, token.length);
    },
    // Minute
    m: function (date, token, localize) {
      if (token === 'mo') {
        return localize.ordinalNumber(date.getUTCMinutes(), {
          unit: 'minute'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.m(date, token);
    },
    // Second
    s: function (date, token, localize) {
      if (token === 'so') {
        return localize.ordinalNumber(date.getUTCSeconds(), {
          unit: 'second'
        });
      }
      return $5e5446392772c21c578c945508e44e6b$export$default.s(date, token);
    },
    // Fraction of second
    S: function (date, token) {
      return $5e5446392772c21c578c945508e44e6b$export$default.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return 'Z';
      }
      switch (token) {
        case 'X':
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneWithOptionalMinutes(timezoneOffset);
        case 'XXXX':
        case 'XX':
          // Hours and minutes without `:` delimiter
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset);
        case 'XXXXX':
        case 'XXX':
        default:
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case 'x':
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneWithOptionalMinutes(timezoneOffset);
        case 'xxxx':
        case 'xx':
          // Hours and minutes without `:` delimiter
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset);
        case 'xxxxx':
        case 'xxx':
        default:
          return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (GMT)
    O: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneShort(timezoneOffset, ':');
        case 'OOOO':
        default:
          return 'GMT' + $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (specific non-location)
    z: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneShort(timezoneOffset, ':');
        case 'zzzz':
        default:
          return 'GMT' + $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(timezoneOffset, ':');
      }
    },
    // Seconds timestamp
    t: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1000);
      return $af15729eae81e8788655f6959813fca7$export$default(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return $af15729eae81e8788655f6959813fca7$export$default(timestamp, token.length);
    }
  };
  function $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimiter = dirtyDelimiter || '';
    return sign + String(hours) + delimiter + $af15729eae81e8788655f6959813fca7$export$default(minutes, 2);
  }
  function $729bdfda59a079a96ef4d2b07705f531$var$formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? '-' : '+';
      return sign + $af15729eae81e8788655f6959813fca7$export$default(Math.abs(offset) / 60, 2);
    }
    return $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(offset, dirtyDelimiter);
  }
  function $729bdfda59a079a96ef4d2b07705f531$var$formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = $af15729eae81e8788655f6959813fca7$export$default(Math.floor(absOffset / 60), 2);
    var minutes = $af15729eae81e8788655f6959813fca7$export$default(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  function $941ceef04b2333e7d6930b3c1a286a9f$var$dateLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'P':
        return formatLong.date({
          width: 'short'
        });
      case 'PP':
        return formatLong.date({
          width: 'medium'
        });
      case 'PPP':
        return formatLong.date({
          width: 'long'
        });
      case 'PPPP':
      default:
        return formatLong.date({
          width: 'full'
        });
    }
  }
  function $941ceef04b2333e7d6930b3c1a286a9f$var$timeLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'p':
        return formatLong.time({
          width: 'short'
        });
      case 'pp':
        return formatLong.time({
          width: 'medium'
        });
      case 'ppp':
        return formatLong.time({
          width: 'long'
        });
      case 'pppp':
      default:
        return formatLong.time({
          width: 'full'
        });
    }
  }
  function $941ceef04b2333e7d6930b3c1a286a9f$var$dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) {
      return $941ceef04b2333e7d6930b3c1a286a9f$var$dateLongFormatter(pattern, formatLong);
    }
    var dateTimeFormat;
    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({
          width: 'short'
        });
        break;
      case 'PP':
        dateTimeFormat = formatLong.dateTime({
          width: 'medium'
        });
        break;
      case 'PPP':
        dateTimeFormat = formatLong.dateTime({
          width: 'long'
        });
        break;
      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({
          width: 'full'
        });
        break;
    }
    return dateTimeFormat.replace('{{date}}', $941ceef04b2333e7d6930b3c1a286a9f$var$dateLongFormatter(datePattern, formatLong)).replace('{{time}}', $941ceef04b2333e7d6930b3c1a286a9f$var$timeLongFormatter(timePattern, formatLong));
  }
  var $941ceef04b2333e7d6930b3c1a286a9f$export$default = {
    p: $941ceef04b2333e7d6930b3c1a286a9f$var$timeLongFormatter,
    P: $941ceef04b2333e7d6930b3c1a286a9f$var$dateTimeLongFormatter
  };
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
  var $e0cc849ee462ea4fab19de8f1a3968f0$var$protectedDayOfYearTokens = ['D', 'DD'];
  var $e0cc849ee462ea4fab19de8f1a3968f0$var$protectedWeekYearTokens = ['YY', 'YYYY'];
  function $e0cc849ee462ea4fab19de8f1a3968f0$export$isProtectedDayOfYearToken(token) {
    return $e0cc849ee462ea4fab19de8f1a3968f0$var$protectedDayOfYearTokens.indexOf(token) !== -1;
  }
  function $e0cc849ee462ea4fab19de8f1a3968f0$export$isProtectedWeekYearToken(token) {
    return $e0cc849ee462ea4fab19de8f1a3968f0$var$protectedWeekYearTokens.indexOf(token) !== -1;
  }
  function $e0cc849ee462ea4fab19de8f1a3968f0$export$throwProtectedError(token, format, input) {
    if (token === 'YYYY') {
      throw new RangeError(("Use `yyyy` instead of `YYYY` (in `").concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'YY') {
      throw new RangeError(("Use `yy` instead of `YY` (in `").concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'D') {
      throw new RangeError(("Use `d` instead of `D` (in `").concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'DD') {
      throw new RangeError(("Use `dd` instead of `DD` (in `").concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    }
  }
  // This RegExp consists of three parts separated by `|`:
  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  // (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  // except a single quote symbol, which ends the sequence.
  // Two quote characters do not end the sequence.
  // If there is no matching single quote
  // then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps
  var $d395262bbac0963dee25c928b5ce5e8e$var$formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
  var $d395262bbac0963dee25c928b5ce5e8e$var$longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var $d395262bbac0963dee25c928b5ce5e8e$var$escapedStringRegExp = /^'([^]*?)'?$/;
  var $d395262bbac0963dee25c928b5ce5e8e$var$doubleQuoteRegExp = /''/g;
  var $d395262bbac0963dee25c928b5ce5e8e$var$unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  /**
  * @name format
  * @category Common Helpers
  * @summary Format the date.
  *
  * @description
  * Return the formatted date string in the given format. The result may vary by locale.
  *
  * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
  * > See: https://git.io/fxCyr
  *
  * The characters wrapped between two single quotes characters (') are escaped.
  * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
  * (see the last example)
  *
  * Format of the string is based on Unicode Technical Standard #35:
  * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  * with a few additions (see note 7 below the table).
  *
  * Accepted patterns:
  * | Unit                            | Pattern | Result examples                   | Notes |
  * |---------------------------------|---------|-----------------------------------|-------|
  * | Era                             | G..GGG  | AD, BC                            |       |
  * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
  * |                                 | GGGGG   | A, B                              |       |
  * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
  * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
  * |                                 | yy      | 44, 01, 00, 17                    | 5     |
  * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
  * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
  * |                                 | yyyyy   | ...                               | 3,5   |
  * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
  * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
  * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
  * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
  * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
  * |                                 | YYYYY   | ...                               | 3,5   |
  * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
  * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
  * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
  * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
  * |                                 | RRRRR   | ...                               | 3,5,7 |
  * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
  * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
  * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
  * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
  * |                                 | uuuuu   | ...                               | 3,5   |
  * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
  * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
  * |                                 | QQ      | 01, 02, 03, 04                    |       |
  * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
  * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
  * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
  * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
  * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
  * |                                 | qq      | 01, 02, 03, 04                    |       |
  * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
  * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
  * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
  * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
  * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
  * |                                 | MM      | 01, 02, ..., 12                   |       |
  * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
  * |                                 | MMMM    | January, February, ..., December  | 2     |
  * |                                 | MMMMM   | J, F, ..., D                      |       |
  * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
  * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
  * |                                 | LL      | 01, 02, ..., 12                   |       |
  * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
  * |                                 | LLLL    | January, February, ..., December  | 2     |
  * |                                 | LLLLL   | J, F, ..., D                      |       |
  * | Local week of year              | w       | 1, 2, ..., 53                     |       |
  * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
  * |                                 | ww      | 01, 02, ..., 53                   |       |
  * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
  * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
  * |                                 | II      | 01, 02, ..., 53                   | 7     |
  * | Day of month                    | d       | 1, 2, ..., 31                     |       |
  * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
  * |                                 | dd      | 01, 02, ..., 31                   |       |
  * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
  * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
  * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
  * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
  * |                                 | DDDD    | ...                               | 3     |
  * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
  * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
  * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
  * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
  * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
  * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
  * |                                 | ii      | 01, 02, ..., 07                   | 7     |
  * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
  * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
  * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
  * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
  * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
  * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
  * |                                 | ee      | 02, 03, ..., 01                   |       |
  * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
  * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
  * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
  * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
  * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
  * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
  * |                                 | cc      | 02, 03, ..., 01                   |       |
  * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
  * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
  * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
  * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
  * | AM, PM                          | a..aa   | AM, PM                            |       |
  * |                                 | aaa     | am, pm                            |       |
  * |                                 | aaaa    | a.m., p.m.                        | 2     |
  * |                                 | aaaaa   | a, p                              |       |
  * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
  * |                                 | bbb     | am, pm, noon, midnight            |       |
  * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
  * |                                 | bbbbb   | a, p, n, mi                       |       |
  * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
  * |                                 | BBBB    | at night, in the morning, ...     | 2     |
  * |                                 | BBBBB   | at night, in the morning, ...     |       |
  * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
  * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
  * |                                 | hh      | 01, 02, ..., 11, 12               |       |
  * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
  * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
  * |                                 | HH      | 00, 01, 02, ..., 23               |       |
  * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
  * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
  * |                                 | KK      | 01, 02, ..., 11, 00               |       |
  * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
  * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
  * |                                 | kk      | 24, 01, 02, ..., 23               |       |
  * | Minute                          | m       | 0, 1, ..., 59                     |       |
  * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
  * |                                 | mm      | 00, 01, ..., 59                   |       |
  * | Second                          | s       | 0, 1, ..., 59                     |       |
  * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
  * |                                 | ss      | 00, 01, ..., 59                   |       |
  * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
  * |                                 | SS      | 00, 01, ..., 99                   |       |
  * |                                 | SSS     | 000, 001, ..., 999                |       |
  * |                                 | SSSS    | ...                               | 3     |
  * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
  * |                                 | XX      | -0800, +0530, Z                   |       |
  * |                                 | XXX     | -08:00, +05:30, Z                 |       |
  * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
  * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
  * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
  * |                                 | xx      | -0800, +0530, +0000               |       |
  * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
  * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
  * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
  * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
  * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
  * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
  * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
  * | Seconds timestamp               | t       | 512969520                         | 7     |
  * |                                 | tt      | ...                               | 3,7   |
  * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
  * |                                 | TT      | ...                               | 3,7   |
  * | Long localized date             | P       | 04/29/1453                        | 7     |
  * |                                 | PP      | Apr 29, 1453                      | 7     |
  * |                                 | PPP     | April 29th, 1453                  | 7     |
  * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
  * | Long localized time             | p       | 12:00 AM                          | 7     |
  * |                                 | pp      | 12:00:00 AM                       | 7     |
  * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
  * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
  * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
  * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
  * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
  * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
  * Notes:
  * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
  *    are the same as "stand-alone" units, but are different in some languages.
  *    "Formatting" units are declined according to the rules of the language
  *    in the context of a date. "Stand-alone" units are always nominative singular:
  *
  *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
  *
  *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
  *
  * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
  *    the single quote characters (see below).
  *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
  *    the output will be the same as default pattern for this unit, usually
  *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
  *    are marked with "2" in the last column of the table.
  *
  *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
  *
  *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
  *
  *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
  *
  *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
  *
  *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
  *
  * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
  *    The output will be padded with zeros to match the length of the pattern.
  *
  *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
  *
  * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
  *    These tokens represent the shortest form of the quarter.
  *
  * 5. The main difference between `y` and `u` patterns are B.C. years:
  *
  *    | Year | `y` | `u` |
  *    |------|-----|-----|
  *    | AC 1 |   1 |   1 |
  *    | BC 1 |   1 |   0 |
  *    | BC 2 |   2 |  -1 |
  *
  *    Also `yy` always returns the last two digits of a year,
  *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
  *
  *    | Year | `yy` | `uu` |
  *    |------|------|------|
  *    | 1    |   01 |   01 |
  *    | 14   |   14 |   14 |
  *    | 376  |   76 |  376 |
  *    | 1453 |   53 | 1453 |
  *
  *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
  *    except local week-numbering years are dependent on `options.weekStartsOn`
  *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
  *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
  *
  * 6. Specific non-location timezones are currently unavailable in `date-fns`,
  *    so right now these tokens fall back to GMT timezones.
  *
  * 7. These patterns are not in the Unicode Technical Standard #35:
  *    - `i`: ISO day of week
  *    - `I`: ISO week of year
  *    - `R`: ISO week-numbering year
  *    - `t`: seconds timestamp
  *    - `T`: milliseconds timestamp
  *    - `o`: ordinal number modifier
  *    - `P`: long localized date
  *    - `p`: long localized time
  *
  * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
  *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
  *
  * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
  *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
  *
  * ### v2.0.0 breaking changes:
  *
  * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
  *
  * - The second argument is now required for the sake of explicitness.
  *
  *   ```javascript
  *   // Before v2.0.0
  *   format(new Date(2016, 0, 1))
  *
  *   // v2.0.0 onward
  *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  *   ```
  *
  * - New format string API for `format` function
  *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
  *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
  *
  * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
  *
  * @param {Date|Number} date - the original date
  * @param {String} format - the string of tokens
  * @param {Object} [options] - an object with options.
  * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
  * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
  * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
  * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
  *   see: https://git.io/fxCyr
  * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
  *   see: https://git.io/fxCyr
  * @returns {String} the formatted date string
  * @throws {TypeError} 2 arguments required
  * @throws {RangeError} `date` must not be Invalid Date
  * @throws {RangeError} `options.locale` must contain `localize` property
  * @throws {RangeError} `options.locale` must contain `formatLong` property
  * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
  * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
  * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
  * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
  * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
  * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
  * @throws {RangeError} format string contains an unescaped latin alphabet character
  *
  * @example
  * // Represent 11 February 2014 in middle-endian format:
  * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
  * //=> '02/11/2014'
  *
  * @example
  * // Represent 2 July 2014 in Esperanto:
  * import { eoLocale } from 'date-fns/locale/eo'
  * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
  *   locale: eoLocale
  * })
  * //=> '2-a de julio 2014'
  *
  * @example
  * // Escape string by single quote characters:
  * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
  * //=> "3 o'clock"
  */
  function $d395262bbac0963dee25c928b5ce5e8e$export$default(dirtyDate, dirtyFormatStr, dirtyOptions) {
    $5a91e85e34da2364b77064ee2dfe41c1$export$default(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || ({});
    var locale = options.locale || $807b1f3a9a2de2b79a9bb1f7f1dd4c42$export$default;
    var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $76d20ec5245457ba4d0be92324e15d11$export$default(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $76d20ec5245457ba4d0be92324e15d11$export$default(options.firstWeekContainsDate);
    // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }
    var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : $76d20ec5245457ba4d0be92324e15d11$export$default(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : $76d20ec5245457ba4d0be92324e15d11$export$default(options.weekStartsOn);
    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    if (!locale.localize) {
      throw new RangeError('locale must contain localize property');
    }
    if (!locale.formatLong) {
      throw new RangeError('locale must contain formatLong property');
    }
    var originalDate = $4b4a7c205fd87731c6d8e6277d9b5d99$export$default(dirtyDate);
    if (!$9f3abccc6bcce2be062107647201d225$export$default(originalDate)) {
      throw new RangeError('Invalid time value');
    }
    // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = $1e5dc0a4c535edd7892d441879eac816$export$default(originalDate);
    var utcDate = $fbfb2a8e0aab45b7d81bf45460dfe6e6$export$default(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale,
      _originalDate: originalDate
    };
    var result = formatStr.match($d395262bbac0963dee25c928b5ce5e8e$var$longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = $941ceef04b2333e7d6930b3c1a286a9f$export$default[firstCharacter];
        return longFormatter(substring, locale.formatLong, formatterOptions);
      }
      return substring;
    }).join('').match($d395262bbac0963dee25c928b5ce5e8e$var$formattingTokensRegExp).map(function (substring) {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }
      var firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return $d395262bbac0963dee25c928b5ce5e8e$var$cleanEscapedString(substring);
      }
      var formatter = $729bdfda59a079a96ef4d2b07705f531$export$default[firstCharacter];
      if (formatter) {
        if (!options.useAdditionalWeekYearTokens && $e0cc849ee462ea4fab19de8f1a3968f0$export$isProtectedWeekYearToken(substring)) {
          $e0cc849ee462ea4fab19de8f1a3968f0$export$throwProtectedError(substring, dirtyFormatStr, dirtyDate);
        }
        if (!options.useAdditionalDayOfYearTokens && $e0cc849ee462ea4fab19de8f1a3968f0$export$isProtectedDayOfYearToken(substring)) {
          $e0cc849ee462ea4fab19de8f1a3968f0$export$throwProtectedError(substring, dirtyFormatStr, dirtyDate);
        }
        return formatter(utcDate, substring, locale.localize, formatterOptions);
      }
      if (firstCharacter.match($d395262bbac0963dee25c928b5ce5e8e$var$unescapedLatinCharacterRegExp)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      }
      return substring;
    }).join('');
    return result;
  }
  function $d395262bbac0963dee25c928b5ce5e8e$var$cleanEscapedString(input) {
    return input.match($d395262bbac0963dee25c928b5ce5e8e$var$escapedStringRegExp)[1].replace($d395262bbac0963dee25c928b5ce5e8e$var$doubleQuoteRegExp, "'");
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
  const $a777d6796a2564869cad39f35c35c293$var$translations = {
    pl_PL: {
      title: 'Dzienne osiągnięcia - prawdopodobni gracze',
      warning: 'Pamiętaj! Ten skrypt pokazuje wyliczone przez TribalWars wyniki a nie pokonane jednostki.',
      aotd: 'Agresor dnia',
      dotd: 'Obrońca dnia',
      sotd: 'Pomocnik dnia',
      gpotd: 'Mocarstwo dnia',
      devNote: 'Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :).'
    },
    en_DK: {
      title: 'Daily achievements - probable players',
      warning: 'Remember! This script shows scores, not defeated units.',
      aotd: 'Attacker of the day',
      dotd: 'Defender of the day',
      sotd: 'Supporter of the day',
      gpotd: 'Great power of the day',
      devNote: "Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."
    },
    de_DE: {
      title: 'Tägliche Erfolge - Wahrscheinliche Spieler',
      warning: 'Hinweis! Das Script zeigt die Punke, nicht besiegte Einheiten.',
      aotd: 'Angreifer des Tages',
      dotd: 'Verteidiger des Tages',
      sotd: 'Unterstützer des Tages',
      gpotd: 'Großmacht des Tages',
      devNote: "Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :)."
    }
  };
  var $a777d6796a2564869cad39f35c35c293$export$default = () => $a777d6796a2564869cad39f35c35c293$var$translations[window.game_data.locale] || $a777d6796a2564869cad39f35c35c293$var$translations.en_DK;
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
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
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
  function $4a3099be828cf86fbe8e45fe1e542e61$var$ownKeys(object, enumerableOnly) {
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
  function $4a3099be828cf86fbe8e45fe1e542e61$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $4a3099be828cf86fbe8e45fe1e542e61$var$ownKeys(Object(source), true).forEach(function (key) {
          $4a3099be828cf86fbe8e45fe1e542e61$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $4a3099be828cf86fbe8e45fe1e542e61$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $4a3099be828cf86fbe8e45fe1e542e61$var$_defineProperty(obj, key, value) {
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
  // @name         Daily achievements
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
  // @version      0.4.5
  // @description  Daily achievements
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=info_player&mode=awards*
  // @grant        none
  // ==/UserScript==
  const $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $4a3099be828cf86fbe8e45fe1e542e61$var$LOCAL_STORAGE_KEY = 'kichiyaki_daily_achievements';
  const $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER_QUERY = "\n    query server($server: String!) {\n        server(key: $server) {\n            key\n            historyUpdatedAt\n            version {\n              timezone\n            }\n        }\n    }\n";
  const $4a3099be828cf86fbe8e45fe1e542e61$var$DAILY_STATS_QUERY = "\n    query data($server: String!, $createDateGTE: Time!) {\n        dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStats(server: $server, sort: [\"scoreAtt DESC\", \"playerID desc\"], filter: { createDateGTE: $createDateGTE }, limit: 5) {\n            items {\n                scoreAtt\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByScoreDef: dailyPlayerStats(server: $server, sort: [\"scoreDef DESC\", \"playerID desc\"], filter: { createDateGTE: $createDateGTE }, limit: 5) {\n            items {\n                scoreDef\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByScoreSup: dailyPlayerStats(server: $server, sort: [\"scoreSup DESC\", \"playerID desc\"], filter: { createDateGTE: $createDateGTE }, limit: 5) {\n            items {\n                scoreSup\n                player {\n                    id\n                    name\n                }\n            }\n        }\n        dailyPlayerStatsOrderedByVillages: dailyPlayerStats(server: $server, sort: [\"villages DESC\", \"playerID desc\"], filter: { createDateGTE: $createDateGTE }, limit: 5) {\n            items {\n                villages\n                player {\n                    id\n                    name\n                }\n            }\n        }\n    }\n";
  let $4a3099be828cf86fbe8e45fe1e542e61$var$container = undefined;
  const $4a3099be828cf86fbe8e45fe1e542e61$var$translations = $a777d6796a2564869cad39f35c35c293$export$default();
  const $4a3099be828cf86fbe8e45fe1e542e61$var$loadDataFromCache = () => {
    return $3d935538f644f492fe681e00121114a4$export$getItem($4a3099be828cf86fbe8e45fe1e542e61$var$LOCAL_STORAGE_KEY);
  };
  const $4a3099be828cf86fbe8e45fe1e542e61$var$cacheData = function cacheData() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    $3d935538f644f492fe681e00121114a4$export$setItem($4a3099be828cf86fbe8e45fe1e542e61$var$LOCAL_STORAGE_KEY, data);
  };
  const $4a3099be828cf86fbe8e45fe1e542e61$var$loadData = async () => {
    let data = await $3af05e958b2a20a26445518aba292c50$export$default({
      query: $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER_QUERY,
      variables: {
        server: $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER
      }
    });
    if (data.server) {
      const d = $87a1b3fb6327eb299adebba75fcb33c5$export$inTZ(data.server.historyUpdatedAt, data.server.version.timezone);
      const dailyStatsData = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $4a3099be828cf86fbe8e45fe1e542e61$var$DAILY_STATS_QUERY,
        variables: {
          server: $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER,
          createDateGTE: $d395262bbac0963dee25c928b5ce5e8e$export$default(d, 'yyyy-MM-dd') + 'T' + $d395262bbac0963dee25c928b5ce5e8e$export$default(d, 'HH:mm:ss') + 'Z'
        }
      });
      data = $4a3099be828cf86fbe8e45fe1e542e61$var$_objectSpread($4a3099be828cf86fbe8e45fe1e542e61$var$_objectSpread({}, data), dailyStatsData);
    }
    $4a3099be828cf86fbe8e45fe1e542e61$var$cacheData(data);
    return data;
  };
  const $4a3099be828cf86fbe8e45fe1e542e61$var$render = _ref => {
    let {dailyPlayerStatsOrderedByScoreAtt, dailyPlayerStatsOrderedByScoreDef, dailyPlayerStatsOrderedByScoreSup, dailyPlayerStatsOrderedByVillages} = _ref;
    const html = ("\n        <div class=\"award-group-head\">").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.title, "</div>\n        <div class=\"award-group-content\" style=\"text-align: center;\">\n            <div style=\"padding: 10px;\">\n            <h1 style=\"margin-bottom: 0px;\"><a href=\"").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage($1f14636dcc53402ba1b7661b758ca0aa$export$default($4a3099be828cf86fbe8e45fe1e542e61$var$SERVER), $4a3099be828cf86fbe8e45fe1e542e61$var$SERVER), "\">TWHelp</a></h1>\n                <h3 style=\"margin-bottom: 10px; margin-top: 0;\">").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.devNote, "</h3>\n                <h3 style=\"color: red;\"><strong>").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.warning, "</strong></h3>\n                <p><strong>").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.aotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreAtt.items.map((item, index) => ("<span>").concat(index + 1, ". <a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreAtt.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.dotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreDef.items.map((item, index) => ("<span>").concat(index + 1, ". <a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreDef.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.sotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByScoreSup.items.map((item, index) => ("<span>").concat(index + 1, ". <a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(item.player.id), "\">").concat(item.player.name, " - ").concat(item.scoreSup.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n            <hr>\n            <div style=\"padding: 10px;\">\n                <p><strong>").concat($4a3099be828cf86fbe8e45fe1e542e61$var$translations.gpotd, "</strong></p>\n                ").concat(dailyPlayerStatsOrderedByVillages.items.map((item, index) => ("<span>").concat(index + 1, ". <a href=\"").concat($6a639e352c067a7850a9fa8cdc59ffca$export$buildPlayerURL(item.player.id), "\">").concat(item.player.name, " - ").concat(item.villages.toLocaleString(), "</a></span>")).join('<br>'), "\n            </div>\n        </div>\n        <div class=\"award-group-foot\"></div>\n    ");
    if (!$4a3099be828cf86fbe8e45fe1e542e61$var$container) {
      $4a3099be828cf86fbe8e45fe1e542e61$var$container = document.createElement('div');
      $4a3099be828cf86fbe8e45fe1e542e61$var$container.classList.add('award-group');
      document.querySelector('#content_value > div:nth-child(4)').prepend($4a3099be828cf86fbe8e45fe1e542e61$var$container);
    }
    $4a3099be828cf86fbe8e45fe1e542e61$var$container.innerHTML = html;
  };
  (async function () {
    try {
      const dataFromCache = $4a3099be828cf86fbe8e45fe1e542e61$var$loadDataFromCache();
      if (dataFromCache && dataFromCache.server) {
        $4a3099be828cf86fbe8e45fe1e542e61$var$render(dataFromCache);
      }
      const data = await $4a3099be828cf86fbe8e45fe1e542e61$var$loadData();
      if (data.server) {
        $4a3099be828cf86fbe8e45fe1e542e61$var$render(data);
      }
    } catch (error) {
      console.log('dailyAchievements', error);
    }
  })();
})();

