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



function $9dee1d3ade18edf3$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    return !isNaN(date);
}


var $7086ba38aadd3849$var$formatDistanceLocale = {
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
function $7086ba38aadd3849$export$2e2bcd8739ae039(token, count, options) {
    options = options || {
    };
    var result;
    if (typeof $7086ba38aadd3849$var$formatDistanceLocale[token] === 'string') result = $7086ba38aadd3849$var$formatDistanceLocale[token];
    else if (count === 1) result = $7086ba38aadd3849$var$formatDistanceLocale[token].one;
    else result = $7086ba38aadd3849$var$formatDistanceLocale[token].other.replace('{{count}}', count);
    if (options.addSuffix) {
        if (options.comparison > 0) return 'in ' + result;
        else return result + ' ago';
    }
    return result;
}


function $9ae2382f7157e841$export$2e2bcd8739ae039(args) {
    return function(dirtyOptions) {
        var options = dirtyOptions || {
        };
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
    };
}


var $c97d8185919fa02d$var$dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
};
var $c97d8185919fa02d$var$timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
};
var $c97d8185919fa02d$var$dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
};
var $c97d8185919fa02d$var$formatLong = {
    date: $9ae2382f7157e841$export$2e2bcd8739ae039({
        formats: $c97d8185919fa02d$var$dateFormats,
        defaultWidth: 'full'
    }),
    time: $9ae2382f7157e841$export$2e2bcd8739ae039({
        formats: $c97d8185919fa02d$var$timeFormats,
        defaultWidth: 'full'
    }),
    dateTime: $9ae2382f7157e841$export$2e2bcd8739ae039({
        formats: $c97d8185919fa02d$var$dateTimeFormats,
        defaultWidth: 'full'
    })
};
var $c97d8185919fa02d$export$2e2bcd8739ae039 = $c97d8185919fa02d$var$formatLong;


var $0526b88958b192d6$var$formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
};
function $0526b88958b192d6$export$2e2bcd8739ae039(token, _date, _baseDate, _options) {
    return $0526b88958b192d6$var$formatRelativeLocale[token];
}


function $d1f924bc50f2b2f5$export$2e2bcd8739ae039(args) {
    return function(dirtyIndex, dirtyOptions) {
        var options = dirtyOptions || {
        };
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


var $2466c6ff78161864$var$eraValues = {
    narrow: [
        'B',
        'A'
    ],
    abbreviated: [
        'BC',
        'AD'
    ],
    wide: [
        'Before Christ',
        'Anno Domini'
    ]
};
var $2466c6ff78161864$var$quarterValues = {
    narrow: [
        '1',
        '2',
        '3',
        '4'
    ],
    abbreviated: [
        'Q1',
        'Q2',
        'Q3',
        'Q4'
    ],
    wide: [
        '1st quarter',
        '2nd quarter',
        '3rd quarter',
        '4th quarter'
    ] // Note: in English, the names of days of the week and months are capitalized.
};
var $2466c6ff78161864$var$monthValues = {
    narrow: [
        'J',
        'F',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'O',
        'N',
        'D'
    ],
    abbreviated: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    wide: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
};
var $2466c6ff78161864$var$dayValues = {
    narrow: [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
    ],
    short: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
    ],
    abbreviated: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ],
    wide: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
};
var $2466c6ff78161864$var$dayPeriodValues = {
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
var $2466c6ff78161864$var$formattingDayPeriodValues = {
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
function $2466c6ff78161864$var$ordinalNumber(dirtyNumber, _dirtyOptions) {
    var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`:
    //
    //   var options = dirtyOptions || {}
    //   var unit = String(options.unit)
    //
    // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) switch(rem100 % 10){
        case 1:
            return number + 'st';
        case 2:
            return number + 'nd';
        case 3:
            return number + 'rd';
    }
    return number + 'th';
}
var $2466c6ff78161864$var$localize = {
    ordinalNumber: $2466c6ff78161864$var$ordinalNumber,
    era: $d1f924bc50f2b2f5$export$2e2bcd8739ae039({
        values: $2466c6ff78161864$var$eraValues,
        defaultWidth: 'wide'
    }),
    quarter: $d1f924bc50f2b2f5$export$2e2bcd8739ae039({
        values: $2466c6ff78161864$var$quarterValues,
        defaultWidth: 'wide',
        argumentCallback: function(quarter) {
            return Number(quarter) - 1;
        }
    }),
    month: $d1f924bc50f2b2f5$export$2e2bcd8739ae039({
        values: $2466c6ff78161864$var$monthValues,
        defaultWidth: 'wide'
    }),
    day: $d1f924bc50f2b2f5$export$2e2bcd8739ae039({
        values: $2466c6ff78161864$var$dayValues,
        defaultWidth: 'wide'
    }),
    dayPeriod: $d1f924bc50f2b2f5$export$2e2bcd8739ae039({
        values: $2466c6ff78161864$var$dayPeriodValues,
        defaultWidth: 'wide',
        formattingValues: $2466c6ff78161864$var$formattingDayPeriodValues,
        defaultFormattingWidth: 'wide'
    })
};
var $2466c6ff78161864$export$2e2bcd8739ae039 = $2466c6ff78161864$var$localize;


function $c372d697f4a6bf78$export$2e2bcd8739ae039(args) {
    return function(dirtyString, dirtyOptions) {
        var string = String(dirtyString);
        var options = dirtyOptions || {
        };
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        return {
            value: value,
            rest: string.slice(matchedString.length)
        };
    };
}


function $853f33f57cdbeba9$export$2e2bcd8739ae039(args) {
    return function(dirtyString, dirtyOptions) {
        var string = String(dirtyString);
        var options = dirtyOptions || {
        };
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var value;
        if (Object.prototype.toString.call(parsePatterns) === '[object Array]') value = $853f33f57cdbeba9$var$findIndex(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
        });
        else value = $853f33f57cdbeba9$var$findKey(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
        });
        value = args.valueCallback ? args.valueCallback(value) : value;
        value = options.valueCallback ? options.valueCallback(value) : value;
        return {
            value: value,
            rest: string.slice(matchedString.length)
        };
    };
}
function $853f33f57cdbeba9$var$findKey(object, predicate) {
    for(var key in object){
        if (object.hasOwnProperty(key) && predicate(object[key])) return key;
    }
}
function $853f33f57cdbeba9$var$findIndex(array, predicate) {
    for(var key = 0; key < array.length; key++){
        if (predicate(array[key])) return key;
    }
}


var $877f5795b2ed9cb4$var$matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var $877f5795b2ed9cb4$var$parseOrdinalNumberPattern = /\d+/i;
var $877f5795b2ed9cb4$var$matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
};
var $877f5795b2ed9cb4$var$parseEraPatterns = {
    any: [
        /^b/i,
        /^(a|c)/i
    ]
};
var $877f5795b2ed9cb4$var$matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
};
var $877f5795b2ed9cb4$var$parseQuarterPatterns = {
    any: [
        /1/i,
        /2/i,
        /3/i,
        /4/i
    ]
};
var $877f5795b2ed9cb4$var$matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var $877f5795b2ed9cb4$var$parseMonthPatterns = {
    narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ],
    any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ]
};
var $877f5795b2ed9cb4$var$matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var $877f5795b2ed9cb4$var$parseDayPatterns = {
    narrow: [
        /^s/i,
        /^m/i,
        /^t/i,
        /^w/i,
        /^t/i,
        /^f/i,
        /^s/i
    ],
    any: [
        /^su/i,
        /^m/i,
        /^tu/i,
        /^w/i,
        /^th/i,
        /^f/i,
        /^sa/i
    ]
};
var $877f5795b2ed9cb4$var$matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var $877f5795b2ed9cb4$var$parseDayPeriodPatterns = {
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
var $877f5795b2ed9cb4$var$match = {
    ordinalNumber: $c372d697f4a6bf78$export$2e2bcd8739ae039({
        matchPattern: $877f5795b2ed9cb4$var$matchOrdinalNumberPattern,
        parsePattern: $877f5795b2ed9cb4$var$parseOrdinalNumberPattern,
        valueCallback: function(value) {
            return parseInt(value, 10);
        }
    }),
    era: $853f33f57cdbeba9$export$2e2bcd8739ae039({
        matchPatterns: $877f5795b2ed9cb4$var$matchEraPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: $877f5795b2ed9cb4$var$parseEraPatterns,
        defaultParseWidth: 'any'
    }),
    quarter: $853f33f57cdbeba9$export$2e2bcd8739ae039({
        matchPatterns: $877f5795b2ed9cb4$var$matchQuarterPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: $877f5795b2ed9cb4$var$parseQuarterPatterns,
        defaultParseWidth: 'any',
        valueCallback: function(index) {
            return index + 1;
        }
    }),
    month: $853f33f57cdbeba9$export$2e2bcd8739ae039({
        matchPatterns: $877f5795b2ed9cb4$var$matchMonthPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: $877f5795b2ed9cb4$var$parseMonthPatterns,
        defaultParseWidth: 'any'
    }),
    day: $853f33f57cdbeba9$export$2e2bcd8739ae039({
        matchPatterns: $877f5795b2ed9cb4$var$matchDayPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: $877f5795b2ed9cb4$var$parseDayPatterns,
        defaultParseWidth: 'any'
    }),
    dayPeriod: $853f33f57cdbeba9$export$2e2bcd8739ae039({
        matchPatterns: $877f5795b2ed9cb4$var$matchDayPeriodPatterns,
        defaultMatchWidth: 'any',
        parsePatterns: $877f5795b2ed9cb4$var$parseDayPeriodPatterns,
        defaultParseWidth: 'any'
    })
};
var $877f5795b2ed9cb4$export$2e2bcd8739ae039 = $877f5795b2ed9cb4$var$match;


/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */ var $436ec39a217422b7$var$locale = {
    code: 'en-US',
    formatDistance: $7086ba38aadd3849$export$2e2bcd8739ae039,
    formatLong: $c97d8185919fa02d$export$2e2bcd8739ae039,
    formatRelative: $0526b88958b192d6$export$2e2bcd8739ae039,
    localize: $2466c6ff78161864$export$2e2bcd8739ae039,
    match: $877f5795b2ed9cb4$export$2e2bcd8739ae039,
    options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
    }
};
var $436ec39a217422b7$export$2e2bcd8739ae039 = $436ec39a217422b7$var$locale;


function $70df79293cae00de$export$2e2bcd8739ae039(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) return NaN;
    var number = Number(dirtyNumber);
    if (isNaN(number)) return number;
    return number < 0 ? Math.ceil(number) : Math.floor(number);
}





function $b214e0d241adf6d7$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var timestamp = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate).getTime();
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    return new Date(timestamp + amount);
}



function $09f369bc154a7d4e$export$2e2bcd8739ae039(dirtyDate, dirtyAmount) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var amount = $70df79293cae00de$export$2e2bcd8739ae039(dirtyAmount);
    return $b214e0d241adf6d7$export$2e2bcd8739ae039(dirtyDate, -amount);
}



function $6fdfe876f242fcf0$export$2e2bcd8739ae039(number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();
    while(output.length < targetLength)output = '0' + output;
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
 */ var $7182a21931ede399$var$formatters = {
    // Year
    y: function(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(token === 'yy' ? year % 100 : year, token.length);
    },
    // Month
    M: function(date, token) {
        var month = date.getUTCMonth();
        return token === 'M' ? String(month + 1) : $6fdfe876f242fcf0$export$2e2bcd8739ae039(month + 1, 2);
    },
    // Day of the month
    d: function(date, token) {
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
        switch(token){
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
    h: function(date, token) {
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function(date, token) {
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(date.getUTCHours(), token.length);
    },
    // Minute
    m: function(date, token) {
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function(date, token) {
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(fractionalSeconds, token.length);
    }
};
var $7182a21931ede399$export$2e2bcd8739ae039 = $7182a21931ede399$var$formatters;




var $b0d3dd691f5f7194$var$MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
function $b0d3dd691f5f7194$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / $b0d3dd691f5f7194$var$MILLISECONDS_IN_DAY) + 1;
}





function $c997942f4278a40b$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var weekStartsOn = 1;
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}





function $67c0a83ed5adeffa$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = $c997942f4278a40b$export$2e2bcd8739ae039(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = $c997942f4278a40b$export$2e2bcd8739ae039(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
    else if (date.getTime() >= startOfThisYear.getTime()) return year;
    else return year - 1;
}




function $b8c2fa8dd98c48fc$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var year = $67c0a83ed5adeffa$export$2e2bcd8739ae039(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = $c997942f4278a40b$export$2e2bcd8739ae039(fourthOfJanuary);
    return date;
}



var $c8b12db2f9ec2fd9$var$MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
function $c8b12db2f9ec2fd9$export$2e2bcd8739ae039(dirtyDate) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var diff = $c997942f4278a40b$export$2e2bcd8739ae039(date).getTime() - $b8c2fa8dd98c48fc$export$2e2bcd8739ae039(date).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / $c8b12db2f9ec2fd9$var$MILLISECONDS_IN_WEEK) + 1;
}







function $ba817ba95b32d048$export$2e2bcd8739ae039(dirtyDate, dirtyOptions) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var options = dirtyOptions || {
    };
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : $70df79293cae00de$export$2e2bcd8739ae039(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : $70df79293cae00de$export$2e2bcd8739ae039(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}







function $d54680960a25f7f1$export$2e2bcd8739ae039(dirtyDate, dirtyOptions) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();
    var options = dirtyOptions || {
    };
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $70df79293cae00de$export$2e2bcd8739ae039(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $70df79293cae00de$export$2e2bcd8739ae039(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = $ba817ba95b32d048$export$2e2bcd8739ae039(firstWeekOfNextYear, dirtyOptions);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = $ba817ba95b32d048$export$2e2bcd8739ae039(firstWeekOfThisYear, dirtyOptions);
    if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
    else if (date.getTime() >= startOfThisYear.getTime()) return year;
    else return year - 1;
}




function $72f3fc966dcdcd0b$export$2e2bcd8739ae039(dirtyDate, dirtyOptions) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var options = dirtyOptions || {
    };
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $70df79293cae00de$export$2e2bcd8739ae039(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $70df79293cae00de$export$2e2bcd8739ae039(options.firstWeekContainsDate);
    var year = $d54680960a25f7f1$export$2e2bcd8739ae039(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = $ba817ba95b32d048$export$2e2bcd8739ae039(firstWeek, dirtyOptions);
    return date;
}



var $f7f1e8140211954c$var$MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
function $f7f1e8140211954c$export$2e2bcd8739ae039(dirtyDate, options) {
    $14473fdd7558f621$export$2e2bcd8739ae039(1, arguments);
    var date = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    var diff = $ba817ba95b32d048$export$2e2bcd8739ae039(date, options).getTime() - $72f3fc966dcdcd0b$export$2e2bcd8739ae039(date, options).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / $f7f1e8140211954c$var$MILLISECONDS_IN_WEEK) + 1;
}




var $7439c3200c97d4cf$var$dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
};
var $7439c3200c97d4cf$var$formatters = {
    // Era
    G: function(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;
        switch(token){
            // AD, BC
            case 'G':
            case 'GG':
            case 'GGG':
                return localize.era(era, {
                    width: 'abbreviated'
                });
            // A, B
            case 'GGGGG':
                return localize.era(era, {
                    width: 'narrow'
                });
            // Anno Domini, Before Christ
            case 'GGGG':
            default:
                return localize.era(era, {
                    width: 'wide'
                });
        }
    },
    // Year
    y: function(date, token, localize) {
        // Ordinal number
        if (token === 'yo') {
            var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)
            var year = signedYear > 0 ? signedYear : 1 - signedYear;
            return localize.ordinalNumber(year, {
                unit: 'year'
            });
        }
        return $7182a21931ede399$export$2e2bcd8739ae039.y(date, token);
    },
    // Local week-numbering year
    Y: function(date, token, localize, options) {
        var signedWeekYear = $d54680960a25f7f1$export$2e2bcd8739ae039(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year
        if (token === 'YY') {
            var twoDigitYear = weekYear % 100;
            return $6fdfe876f242fcf0$export$2e2bcd8739ae039(twoDigitYear, 2);
        } // Ordinal number
        if (token === 'Yo') return localize.ordinalNumber(weekYear, {
            unit: 'year'
        });
         // Padding
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function(date, token) {
        var isoWeekYear = $67c0a83ed5adeffa$export$2e2bcd8739ae039(date); // Padding
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(isoWeekYear, token.length);
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
    u: function(date, token) {
        var year = date.getUTCFullYear();
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(year, token.length);
    },
    // Quarter
    Q: function(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch(token){
            // 1, 2, 3, 4
            case 'Q':
                return String(quarter);
            // 01, 02, 03, 04
            case 'QQ':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case 'Qo':
                return localize.ordinalNumber(quarter, {
                    unit: 'quarter'
                });
            // Q1, Q2, Q3, Q4
            case 'QQQ':
                return localize.quarter(quarter, {
                    width: 'abbreviated',
                    context: 'formatting'
                });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case 'QQQQQ':
                return localize.quarter(quarter, {
                    width: 'narrow',
                    context: 'formatting'
                });
            // 1st quarter, 2nd quarter, ...
            case 'QQQQ':
            default:
                return localize.quarter(quarter, {
                    width: 'wide',
                    context: 'formatting'
                });
        }
    },
    // Stand-alone quarter
    q: function(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch(token){
            // 1, 2, 3, 4
            case 'q':
                return String(quarter);
            // 01, 02, 03, 04
            case 'qq':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case 'qo':
                return localize.ordinalNumber(quarter, {
                    unit: 'quarter'
                });
            // Q1, Q2, Q3, Q4
            case 'qqq':
                return localize.quarter(quarter, {
                    width: 'abbreviated',
                    context: 'standalone'
                });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case 'qqqqq':
                return localize.quarter(quarter, {
                    width: 'narrow',
                    context: 'standalone'
                });
            // 1st quarter, 2nd quarter, ...
            case 'qqqq':
            default:
                return localize.quarter(quarter, {
                    width: 'wide',
                    context: 'standalone'
                });
        }
    },
    // Month
    M: function(date, token, localize) {
        var month = date.getUTCMonth();
        switch(token){
            case 'M':
            case 'MM':
                return $7182a21931ede399$export$2e2bcd8739ae039.M(date, token);
            // 1st, 2nd, ..., 12th
            case 'Mo':
                return localize.ordinalNumber(month + 1, {
                    unit: 'month'
                });
            // Jan, Feb, ..., Dec
            case 'MMM':
                return localize.month(month, {
                    width: 'abbreviated',
                    context: 'formatting'
                });
            // J, F, ..., D
            case 'MMMMM':
                return localize.month(month, {
                    width: 'narrow',
                    context: 'formatting'
                });
            // January, February, ..., December
            case 'MMMM':
            default:
                return localize.month(month, {
                    width: 'wide',
                    context: 'formatting'
                });
        }
    },
    // Stand-alone month
    L: function(date, token, localize) {
        var month = date.getUTCMonth();
        switch(token){
            // 1, 2, ..., 12
            case 'L':
                return String(month + 1);
            // 01, 02, ..., 12
            case 'LL':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(month + 1, 2);
            // 1st, 2nd, ..., 12th
            case 'Lo':
                return localize.ordinalNumber(month + 1, {
                    unit: 'month'
                });
            // Jan, Feb, ..., Dec
            case 'LLL':
                return localize.month(month, {
                    width: 'abbreviated',
                    context: 'standalone'
                });
            // J, F, ..., D
            case 'LLLLL':
                return localize.month(month, {
                    width: 'narrow',
                    context: 'standalone'
                });
            // January, February, ..., December
            case 'LLLL':
            default:
                return localize.month(month, {
                    width: 'wide',
                    context: 'standalone'
                });
        }
    },
    // Local week of year
    w: function(date, token, localize, options) {
        var week = $f7f1e8140211954c$export$2e2bcd8739ae039(date, options);
        if (token === 'wo') return localize.ordinalNumber(week, {
            unit: 'week'
        });
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(week, token.length);
    },
    // ISO week of year
    I: function(date, token, localize) {
        var isoWeek = $c8b12db2f9ec2fd9$export$2e2bcd8739ae039(date);
        if (token === 'Io') return localize.ordinalNumber(isoWeek, {
            unit: 'week'
        });
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(isoWeek, token.length);
    },
    // Day of the month
    d: function(date, token, localize) {
        if (token === 'do') return localize.ordinalNumber(date.getUTCDate(), {
            unit: 'date'
        });
        return $7182a21931ede399$export$2e2bcd8739ae039.d(date, token);
    },
    // Day of year
    D: function(date, token, localize) {
        var dayOfYear = $b0d3dd691f5f7194$export$2e2bcd8739ae039(date);
        if (token === 'Do') return localize.ordinalNumber(dayOfYear, {
            unit: 'dayOfYear'
        });
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(dayOfYear, token.length);
    },
    // Day of week
    E: function(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        switch(token){
            // Tue
            case 'E':
            case 'EE':
            case 'EEE':
                return localize.day(dayOfWeek, {
                    width: 'abbreviated',
                    context: 'formatting'
                });
            // T
            case 'EEEEE':
                return localize.day(dayOfWeek, {
                    width: 'narrow',
                    context: 'formatting'
                });
            // Tu
            case 'EEEEEE':
                return localize.day(dayOfWeek, {
                    width: 'short',
                    context: 'formatting'
                });
            // Tuesday
            case 'EEEE':
            default:
                return localize.day(dayOfWeek, {
                    width: 'wide',
                    context: 'formatting'
                });
        }
    },
    // Local day of week
    e: function(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch(token){
            // Numerical value (Nth day of week with current locale or weekStartsOn)
            case 'e':
                return String(localDayOfWeek);
            // Padded numerical value
            case 'ee':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(localDayOfWeek, 2);
            // 1st, 2nd, ..., 7th
            case 'eo':
                return localize.ordinalNumber(localDayOfWeek, {
                    unit: 'day'
                });
            case 'eee':
                return localize.day(dayOfWeek, {
                    width: 'abbreviated',
                    context: 'formatting'
                });
            // T
            case 'eeeee':
                return localize.day(dayOfWeek, {
                    width: 'narrow',
                    context: 'formatting'
                });
            // Tu
            case 'eeeeee':
                return localize.day(dayOfWeek, {
                    width: 'short',
                    context: 'formatting'
                });
            // Tuesday
            case 'eeee':
            default:
                return localize.day(dayOfWeek, {
                    width: 'wide',
                    context: 'formatting'
                });
        }
    },
    // Stand-alone local day of week
    c: function(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch(token){
            // Numerical value (same as in `e`)
            case 'c':
                return String(localDayOfWeek);
            // Padded numerical value
            case 'cc':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(localDayOfWeek, token.length);
            // 1st, 2nd, ..., 7th
            case 'co':
                return localize.ordinalNumber(localDayOfWeek, {
                    unit: 'day'
                });
            case 'ccc':
                return localize.day(dayOfWeek, {
                    width: 'abbreviated',
                    context: 'standalone'
                });
            // T
            case 'ccccc':
                return localize.day(dayOfWeek, {
                    width: 'narrow',
                    context: 'standalone'
                });
            // Tu
            case 'cccccc':
                return localize.day(dayOfWeek, {
                    width: 'short',
                    context: 'standalone'
                });
            // Tuesday
            case 'cccc':
            default:
                return localize.day(dayOfWeek, {
                    width: 'wide',
                    context: 'standalone'
                });
        }
    },
    // ISO day of week
    i: function(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch(token){
            // 2
            case 'i':
                return String(isoDayOfWeek);
            // 02
            case 'ii':
                return $6fdfe876f242fcf0$export$2e2bcd8739ae039(isoDayOfWeek, token.length);
            // 2nd
            case 'io':
                return localize.ordinalNumber(isoDayOfWeek, {
                    unit: 'day'
                });
            // Tue
            case 'iii':
                return localize.day(dayOfWeek, {
                    width: 'abbreviated',
                    context: 'formatting'
                });
            // T
            case 'iiiii':
                return localize.day(dayOfWeek, {
                    width: 'narrow',
                    context: 'formatting'
                });
            // Tu
            case 'iiiiii':
                return localize.day(dayOfWeek, {
                    width: 'short',
                    context: 'formatting'
                });
            // Tuesday
            case 'iiii':
            default:
                return localize.day(dayOfWeek, {
                    width: 'wide',
                    context: 'formatting'
                });
        }
    },
    // AM or PM
    a: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        switch(token){
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
    b: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours === 12) dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.noon;
        else if (hours === 0) dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.midnight;
        else dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        switch(token){
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
    B: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours >= 17) dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.evening;
        else if (hours >= 12) dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.afternoon;
        else if (hours >= 4) dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.morning;
        else dayPeriodEnumValue = $7439c3200c97d4cf$var$dayPeriodEnum.night;
        switch(token){
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
    h: function(date, token, localize) {
        if (token === 'ho') {
            var hours = date.getUTCHours() % 12;
            if (hours === 0) hours = 12;
            return localize.ordinalNumber(hours, {
                unit: 'hour'
            });
        }
        return $7182a21931ede399$export$2e2bcd8739ae039.h(date, token);
    },
    // Hour [0-23]
    H: function(date, token, localize) {
        if (token === 'Ho') return localize.ordinalNumber(date.getUTCHours(), {
            unit: 'hour'
        });
        return $7182a21931ede399$export$2e2bcd8739ae039.H(date, token);
    },
    // Hour [0-11]
    K: function(date, token, localize) {
        var hours = date.getUTCHours() % 12;
        if (token === 'Ko') return localize.ordinalNumber(hours, {
            unit: 'hour'
        });
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(hours, token.length);
    },
    // Hour [1-24]
    k: function(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;
        if (token === 'ko') return localize.ordinalNumber(hours, {
            unit: 'hour'
        });
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(hours, token.length);
    },
    // Minute
    m: function(date, token, localize) {
        if (token === 'mo') return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: 'minute'
        });
        return $7182a21931ede399$export$2e2bcd8739ae039.m(date, token);
    },
    // Second
    s: function(date, token, localize) {
        if (token === 'so') return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: 'second'
        });
        return $7182a21931ede399$export$2e2bcd8739ae039.s(date, token);
    },
    // Fraction of second
    S: function(date, token) {
        return $7182a21931ede399$export$2e2bcd8739ae039.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) return 'Z';
        switch(token){
            // Hours and optional minutes
            case 'X':
                return $7439c3200c97d4cf$var$formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XX`
            case 'XXXX':
            case 'XX':
                // Hours and minutes without `:` delimiter
                return $7439c3200c97d4cf$var$formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XXX`
            case 'XXXXX':
            case 'XXX':
            default:
                return $7439c3200c97d4cf$var$formatTimezone(timezoneOffset, ':');
        }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Hours and optional minutes
            case 'x':
                return $7439c3200c97d4cf$var$formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xx`
            case 'xxxx':
            case 'xx':
                // Hours and minutes without `:` delimiter
                return $7439c3200c97d4cf$var$formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xxx`
            case 'xxxxx':
            case 'xxx':
            default:
                return $7439c3200c97d4cf$var$formatTimezone(timezoneOffset, ':');
        }
    },
    // Timezone (GMT)
    O: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Short
            case 'O':
            case 'OO':
            case 'OOO':
                return 'GMT' + $7439c3200c97d4cf$var$formatTimezoneShort(timezoneOffset, ':');
            // Long
            case 'OOOO':
            default:
                return 'GMT' + $7439c3200c97d4cf$var$formatTimezone(timezoneOffset, ':');
        }
    },
    // Timezone (specific non-location)
    z: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Short
            case 'z':
            case 'zz':
            case 'zzz':
                return 'GMT' + $7439c3200c97d4cf$var$formatTimezoneShort(timezoneOffset, ':');
            // Long
            case 'zzzz':
            default:
                return 'GMT' + $7439c3200c97d4cf$var$formatTimezone(timezoneOffset, ':');
        }
    },
    // Seconds timestamp
    t: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return $6fdfe876f242fcf0$export$2e2bcd8739ae039(timestamp, token.length);
    }
};
function $7439c3200c97d4cf$var$formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) return sign + String(hours);
    var delimiter = dirtyDelimiter || '';
    return sign + String(hours) + delimiter + $6fdfe876f242fcf0$export$2e2bcd8739ae039(minutes, 2);
}
function $7439c3200c97d4cf$var$formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
        var sign = offset > 0 ? '-' : '+';
        return sign + $6fdfe876f242fcf0$export$2e2bcd8739ae039(Math.abs(offset) / 60, 2);
    }
    return $7439c3200c97d4cf$var$formatTimezone(offset, dirtyDelimiter);
}
function $7439c3200c97d4cf$var$formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = $6fdfe876f242fcf0$export$2e2bcd8739ae039(Math.floor(absOffset / 60), 2);
    var minutes = $6fdfe876f242fcf0$export$2e2bcd8739ae039(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
}
var $7439c3200c97d4cf$export$2e2bcd8739ae039 = $7439c3200c97d4cf$var$formatters;


function $3eca41ae94948c1b$var$dateLongFormatter(pattern, formatLong) {
    switch(pattern){
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
function $3eca41ae94948c1b$var$timeLongFormatter(pattern, formatLong) {
    switch(pattern){
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
function $3eca41ae94948c1b$var$dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) return $3eca41ae94948c1b$var$dateLongFormatter(pattern, formatLong);
    var dateTimeFormat;
    switch(datePattern){
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
    return dateTimeFormat.replace('{{date}}', $3eca41ae94948c1b$var$dateLongFormatter(datePattern, formatLong)).replace('{{time}}', $3eca41ae94948c1b$var$timeLongFormatter(timePattern, formatLong));
}
var $3eca41ae94948c1b$var$longFormatters = {
    p: $3eca41ae94948c1b$var$timeLongFormatter,
    P: $3eca41ae94948c1b$var$dateTimeLongFormatter
};
var $3eca41ae94948c1b$export$2e2bcd8739ae039 = $3eca41ae94948c1b$var$longFormatters;


function $5c7eb77435f5b299$export$2e2bcd8739ae039(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
}


var $679f35d164ce4636$var$protectedDayOfYearTokens = [
    'D',
    'DD'
];
var $679f35d164ce4636$var$protectedWeekYearTokens = [
    'YY',
    'YYYY'
];
function $679f35d164ce4636$export$c6cc36aa33304772(token) {
    return $679f35d164ce4636$var$protectedDayOfYearTokens.indexOf(token) !== -1;
}
function $679f35d164ce4636$export$c6b49d6dceb604a1(token) {
    return $679f35d164ce4636$var$protectedWeekYearTokens.indexOf(token) !== -1;
}
function $679f35d164ce4636$export$8073c1ae88f0e727(token, format, input) {
    if (token === 'YYYY') throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    else if (token === 'YY') throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    else if (token === 'D') throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    else if (token === 'DD') throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
}




// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var $94db3e879bd42ac5$var$formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var $94db3e879bd42ac5$var$longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var $94db3e879bd42ac5$var$escapedStringRegExp = /^'([^]*?)'?$/;
var $94db3e879bd42ac5$var$doubleQuoteRegExp = /''/g;
var $94db3e879bd42ac5$var$unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function $94db3e879bd42ac5$export$2e2bcd8739ae039(dirtyDate, dirtyFormatStr, dirtyOptions) {
    $14473fdd7558f621$export$2e2bcd8739ae039(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {
    };
    var locale = options.locale || $436ec39a217422b7$export$2e2bcd8739ae039;
    var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : $70df79293cae00de$export$2e2bcd8739ae039(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : $70df79293cae00de$export$2e2bcd8739ae039(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : $70df79293cae00de$export$2e2bcd8739ae039(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : $70df79293cae00de$export$2e2bcd8739ae039(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    if (!locale.localize) throw new RangeError('locale must contain localize property');
    if (!locale.formatLong) throw new RangeError('locale must contain formatLong property');
    var originalDate = $cef0ab118a15bdd4$export$2e2bcd8739ae039(dirtyDate);
    if (!$9dee1d3ade18edf3$export$2e2bcd8739ae039(originalDate)) throw new RangeError('Invalid time value');
     // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = $5c7eb77435f5b299$export$2e2bcd8739ae039(originalDate);
    var utcDate = $09f369bc154a7d4e$export$2e2bcd8739ae039(originalDate, timezoneOffset);
    var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate
    };
    var result = formatStr.match($94db3e879bd42ac5$var$longFormattingTokensRegExp).map(function(substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
            var longFormatter = $3eca41ae94948c1b$export$2e2bcd8739ae039[firstCharacter];
            return longFormatter(substring, locale.formatLong, formatterOptions);
        }
        return substring;
    }).join('').match($94db3e879bd42ac5$var$formattingTokensRegExp).map(function(substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") return "'";
        var firstCharacter = substring[0];
        if (firstCharacter === "'") return $94db3e879bd42ac5$var$cleanEscapedString(substring);
        var formatter = $7439c3200c97d4cf$export$2e2bcd8739ae039[firstCharacter];
        if (formatter) {
            if (!options.useAdditionalWeekYearTokens && $679f35d164ce4636$export$c6b49d6dceb604a1(substring)) $679f35d164ce4636$export$8073c1ae88f0e727(substring, dirtyFormatStr, dirtyDate);
            if (!options.useAdditionalDayOfYearTokens && $679f35d164ce4636$export$c6cc36aa33304772(substring)) $679f35d164ce4636$export$8073c1ae88f0e727(substring, dirtyFormatStr, dirtyDate);
            return formatter(utcDate, substring, locale.localize, formatterOptions);
        }
        if (firstCharacter.match($94db3e879bd42ac5$var$unescapedLatinCharacterRegExp)) throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        return substring;
    }).join('');
    return result;
}
function $94db3e879bd42ac5$var$cleanEscapedString(input) {
    return input.match($94db3e879bd42ac5$var$escapedStringRegExp)[1].replace($94db3e879bd42ac5$var$doubleQuoteRegExp, "'");
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


const $bcb3eebcd6da1b00$var$translations = {
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
        devNote: `Information from the author - I've just launched a new stat tracking website, don't forget to check it out :).`
    },
    de_DE: {
        title: 'Tägliche Erfolge - Wahrscheinliche Spieler',
        warning: 'Hinweis! Das Script zeigt die Punke, nicht besiegte Einheiten.',
        aotd: 'Angreifer des Tages',
        dotd: 'Verteidiger des Tages',
        sotd: 'Unterstützer des Tages',
        gpotd: 'Großmacht des Tages',
        devNote: `Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :).`
    }
};
var $bcb3eebcd6da1b00$export$2e2bcd8739ae039 = ()=>$bcb3eebcd6da1b00$var$translations[window.game_data.locale] || $bcb3eebcd6da1b00$var$translations.en_DK
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


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


var $5b3edb3901c8177a$export$2e2bcd8739ae039 = (server = '')=>server.substr(0, 2)
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
// @name         Daily achievements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/dailyAchievements.js
// @version      0.4.6
// @description  Daily achievements
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=info_player&mode=awards*
// @grant        none
// ==/UserScript==
const $2cea5861ee55e521$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $2cea5861ee55e521$var$LOCAL_STORAGE_KEY = 'kichiyaki_daily_achievements';
const $2cea5861ee55e521$var$SERVER_QUERY = `
    query server($server: String!) {
        server(key: $server) {
            key
            historyUpdatedAt
            version {
              timezone
            }
        }
    }
`;
const $2cea5861ee55e521$var$DAILY_STATS_QUERY = `
    query data($server: String!, $createDateGTE: Time!) {
        dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStats(server: $server, sort: ["scoreAtt DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreAtt
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreDef: dailyPlayerStats(server: $server, sort: ["scoreDef DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreDef
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByScoreSup: dailyPlayerStats(server: $server, sort: ["scoreSup DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                scoreSup
                player {
                    id
                    name
                }
            }
        }
        dailyPlayerStatsOrderedByVillages: dailyPlayerStats(server: $server, sort: ["villages DESC", "playerID desc"], filter: { createDateGTE: $createDateGTE }, limit: 5) {
            items {
                villages
                player {
                    id
                    name
                }
            }
        }
    }
`;
let $2cea5861ee55e521$var$container = undefined;
const $2cea5861ee55e521$var$translations = $bcb3eebcd6da1b00$export$2e2bcd8739ae039();
const $2cea5861ee55e521$var$loadDataFromCache = ()=>{
    return $362bcac9fa8968ec$export$f92dfeb71e9bb569($2cea5861ee55e521$var$LOCAL_STORAGE_KEY);
};
const $2cea5861ee55e521$var$cacheData = (data = {
})=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($2cea5861ee55e521$var$LOCAL_STORAGE_KEY, data);
};
const $2cea5861ee55e521$var$loadData = async ()=>{
    let data = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
        query: $2cea5861ee55e521$var$SERVER_QUERY,
        variables: {
            server: $2cea5861ee55e521$var$SERVER
        }
    });
    if (data.server) {
        const d = $ca7593443ca49f96$export$17201263355d526a(data.server.historyUpdatedAt, data.server.version.timezone);
        const dailyStatsData = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $2cea5861ee55e521$var$DAILY_STATS_QUERY,
            variables: {
                server: $2cea5861ee55e521$var$SERVER,
                createDateGTE: $94db3e879bd42ac5$export$2e2bcd8739ae039(d, 'yyyy-MM-dd') + 'T' + $94db3e879bd42ac5$export$2e2bcd8739ae039(d, 'HH:mm:ss') + 'Z'
            }
        });
        data = $f1e9793517c51c58$export$2e2bcd8739ae039({
        }, data, dailyStatsData);
    }
    $2cea5861ee55e521$var$cacheData(data);
    return data;
};
const $2cea5861ee55e521$var$render = ({ dailyPlayerStatsOrderedByScoreAtt: dailyPlayerStatsOrderedByScoreAtt , dailyPlayerStatsOrderedByScoreDef: dailyPlayerStatsOrderedByScoreDef , dailyPlayerStatsOrderedByScoreSup: dailyPlayerStatsOrderedByScoreSup , dailyPlayerStatsOrderedByVillages: dailyPlayerStatsOrderedByVillages ,  })=>{
    const html = `
        <div class="award-group-head">${$2cea5861ee55e521$var$translations.title}</div>
        <div class="award-group-content" style="text-align: center;">
            <div style="padding: 10px;">
            <h1 style="margin-bottom: 0px;"><a href="${$f3b273bd698d94bc$export$5d5850cc00079a21($5b3edb3901c8177a$export$2e2bcd8739ae039($2cea5861ee55e521$var$SERVER), $2cea5861ee55e521$var$SERVER)}">TWHelp</a></h1>
                <h3 style="margin-bottom: 10px; margin-top: 0;">${$2cea5861ee55e521$var$translations.devNote}</h3>
                <h3 style="color: red;"><strong>${$2cea5861ee55e521$var$translations.warning}</strong></h3>
                <p><strong>${$2cea5861ee55e521$var$translations.aotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreAtt.items.map((item, index)=>`<span>${index + 1}. <a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(item.player.id)}">${item.player.name} - ${item.scoreAtt.toLocaleString()}</a></span>`
    ).join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${$2cea5861ee55e521$var$translations.dotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreDef.items.map((item, index)=>`<span>${index + 1}. <a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(item.player.id)}">${item.player.name} - ${item.scoreDef.toLocaleString()}</a></span>`
    ).join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${$2cea5861ee55e521$var$translations.sotd}</strong></p>
                ${dailyPlayerStatsOrderedByScoreSup.items.map((item, index)=>`<span>${index + 1}. <a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(item.player.id)}">${item.player.name} - ${item.scoreSup.toLocaleString()}</a></span>`
    ).join('<br>')}
            </div>
            <hr>
            <div style="padding: 10px;">
                <p><strong>${$2cea5861ee55e521$var$translations.gpotd}</strong></p>
                ${dailyPlayerStatsOrderedByVillages.items.map((item, index)=>`<span>${index + 1}. <a href="${$db1dd60e5389e0c9$export$3df7b9b48f38839e(item.player.id)}">${item.player.name} - ${item.villages.toLocaleString()}</a></span>`
    ).join('<br>')}
            </div>
        </div>
        <div class="award-group-foot"></div>
    `;
    if (!$2cea5861ee55e521$var$container) {
        $2cea5861ee55e521$var$container = document.createElement('div');
        $2cea5861ee55e521$var$container.classList.add('award-group');
        document.querySelector('#content_value > div:nth-child(4)').prepend($2cea5861ee55e521$var$container);
    }
    $2cea5861ee55e521$var$container.innerHTML = html;
};
(async function() {
    try {
        const dataFromCache = $2cea5861ee55e521$var$loadDataFromCache();
        if (dataFromCache && dataFromCache.server) $2cea5861ee55e521$var$render(dataFromCache);
        const data = await $2cea5861ee55e521$var$loadData();
        if (data.server) $2cea5861ee55e521$var$render(data);
    } catch (error) {
        console.log('dailyAchievements', error);
    }
})();

})();
