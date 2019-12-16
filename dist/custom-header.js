const defaultVariables = locale => {
  const d = new Date();
  return {
    time: d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }),
    date: d.toLocaleDateString(locale, {}),
    monthNum: d.getMonth() + 1,
    monthNumLZ: String(d.getMonth() + 1).padStart(2, 0),
    monthNameShort: d.toLocaleDateString(locale, {
      month: 'short'
    }),
    monthNameLong: d.toLocaleDateString(locale, {
      month: 'long'
    }),
    dayNum: d.getDate(),
    dayNumLZ: String(d.getDate()).padStart(2, 0),
    dayNameShort: d.toLocaleDateString(locale, {
      weekday: 'short'
    }),
    dayNameLong: d.toLocaleDateString(locale, {
      weekday: 'long'
    }),
    hours12: d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
    hours12LZ: String(d.getHours() > 12 ? d.getHours() - 12 : d.getHours()).padStart(2, 0),
    hours24: d.getHours(),
    hours24LZ: String(d.getHours()).padStart(2, 0),
    minutes: d.getMinutes(),
    minutesLZ: String(d.getMinutes()).padStart(2, 0),
    year2d: String(d.getFullYear()).substr(-2),
    year4d: d.getFullYear(),
    AMPM: d.getHours() >= 12 ? 'PM' : 'AM',
    ampm: d.getHours() >= 12 ? 'pm' : 'am'
  };
};

/**
 * Parse or format dates
 * @class fecha
 */
var fecha = {};
var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
var twoDigits = '\\d\\d?';
var threeDigits = '\\d{3}';
var fourDigits = '\\d{4}';
var word = '[^\\s]+';
var literal = /\[([^]*?)\]/gm;
var noop = function () {
};

function regexEscape(str) {
  return str.replace( /[|\\{()[^$+*?.-]/g, '\\$&');
}

function shorten(arr, sLen) {
  var newArr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}

function monthUpdate(arrName) {
  return function (d, v, i18n) {
    var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
    if (~index) {
      d.month = index;
    }
  };
}

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthNamesShort = shorten(monthNames, 3);
var dayNamesShort = shorten(dayNames, 3);
fecha.i18n = {
  dayNamesShort: dayNamesShort,
  dayNames: dayNames,
  monthNamesShort: monthNamesShort,
  monthNames: monthNames,
  amPm: ['am', 'pm'],
  DoFn: function DoFn(D) {
    return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
  }
};

var formatFlags = {
  D: function(dateObj) {
    return dateObj.getDate();
  },
  DD: function(dateObj) {
    return pad(dateObj.getDate());
  },
  Do: function(dateObj, i18n) {
    return i18n.DoFn(dateObj.getDate());
  },
  d: function(dateObj) {
    return dateObj.getDay();
  },
  dd: function(dateObj) {
    return pad(dateObj.getDay());
  },
  ddd: function(dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd: function(dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  M: function(dateObj) {
    return dateObj.getMonth() + 1;
  },
  MM: function(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM: function(dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM: function(dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  YY: function(dateObj) {
    return pad(String(dateObj.getFullYear()), 4).substr(2);
  },
  YYYY: function(dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  h: function(dateObj) {
    return dateObj.getHours() % 12 || 12;
  },
  hh: function(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H: function(dateObj) {
    return dateObj.getHours();
  },
  HH: function(dateObj) {
    return pad(dateObj.getHours());
  },
  m: function(dateObj) {
    return dateObj.getMinutes();
  },
  mm: function(dateObj) {
    return pad(dateObj.getMinutes());
  },
  s: function(dateObj) {
    return dateObj.getSeconds();
  },
  ss: function(dateObj) {
    return pad(dateObj.getSeconds());
  },
  S: function(dateObj) {
    return Math.round(dateObj.getMilliseconds() / 100);
  },
  SS: function(dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS: function(dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  a: function(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A: function(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
  },
  ZZ: function(dateObj) {
    var o = dateObj.getTimezoneOffset();
    return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
  }
};

var parseFlags = {
  D: [twoDigits, function (d, v) {
    d.day = v;
  }],
  Do: [twoDigits + word, function (d, v) {
    d.day = parseInt(v, 10);
  }],
  M: [twoDigits, function (d, v) {
    d.month = v - 1;
  }],
  YY: [twoDigits, function (d, v) {
    var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
    d.year = '' + (v > 68 ? cent - 1 : cent) + v;
  }],
  h: [twoDigits, function (d, v) {
    d.hour = v;
  }],
  m: [twoDigits, function (d, v) {
    d.minute = v;
  }],
  s: [twoDigits, function (d, v) {
    d.second = v;
  }],
  YYYY: [fourDigits, function (d, v) {
    d.year = v;
  }],
  S: ['\\d', function (d, v) {
    d.millisecond = v * 100;
  }],
  SS: ['\\d{2}', function (d, v) {
    d.millisecond = v * 10;
  }],
  SSS: [threeDigits, function (d, v) {
    d.millisecond = v;
  }],
  d: [twoDigits, noop],
  ddd: [word, noop],
  MMM: [word, monthUpdate('monthNamesShort')],
  MMMM: [word, monthUpdate('monthNames')],
  a: [word, function (d, v, i18n) {
    var val = v.toLowerCase();
    if (val === i18n.amPm[0]) {
      d.isPm = false;
    } else if (val === i18n.amPm[1]) {
      d.isPm = true;
    }
  }],
  ZZ: ['[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z', function (d, v) {
    var parts = (v + '').match(/([+-]|\d\d)/gi), minutes;

    if (parts) {
      minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
      d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
    }
  }]
};
parseFlags.dd = parseFlags.d;
parseFlags.dddd = parseFlags.ddd;
parseFlags.DD = parseFlags.D;
parseFlags.mm = parseFlags.m;
parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
parseFlags.MM = parseFlags.M;
parseFlags.ss = parseFlags.s;
parseFlags.A = parseFlags.a;


// Some common format strings
fecha.masks = {
  default: 'ddd MMM DD YYYY HH:mm:ss',
  shortDate: 'M/D/YY',
  mediumDate: 'MMM D, YYYY',
  longDate: 'MMMM D, YYYY',
  fullDate: 'dddd, MMMM D, YYYY',
  shortTime: 'HH:mm',
  mediumTime: 'HH:mm:ss',
  longTime: 'HH:mm:ss.SSS'
};

/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 */
fecha.format = function (dateObj, mask, i18nSettings) {
  var i18n = i18nSettings || fecha.i18n;

  if (typeof dateObj === 'number') {
    dateObj = new Date(dateObj);
  }

  if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
    throw new Error('Invalid Date in fecha.format');
  }

  mask = fecha.masks[mask] || mask || fecha.masks['default'];

  var literals = [];

  // Make literals inactive by replacing them with ??
  mask = mask.replace(literal, function($0, $1) {
    literals.push($1);
    return '@@@';
  });
  // Apply formatting rules
  mask = mask.replace(token, function ($0) {
    return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
  });
  // Inline literal values back into the formatted value
  return mask.replace(/@@@/g, function() {
    return literals.shift();
  });
};

/**
 * Parse a date string into an object, changes - into /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 * @returns {Date|boolean}
 */
fecha.parse = function (dateStr, format, i18nSettings) {
  var i18n = i18nSettings || fecha.i18n;

  if (typeof format !== 'string') {
    throw new Error('Invalid format in fecha.parse');
  }

  format = fecha.masks[format] || format;

  // Avoid regular expression denial of service, fail early for really long strings
  // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
  if (dateStr.length > 1000) {
    return null;
  }

  var dateInfo = {};
  var parseInfo = [];
  var literals = [];
  format = format.replace(literal, function($0, $1) {
    literals.push($1);
    return '@@@';
  });
  var newFormat = regexEscape(format).replace(token, function ($0) {
    if (parseFlags[$0]) {
      var info = parseFlags[$0];
      parseInfo.push(info[1]);
      return '(' + info[0] + ')';
    }

    return $0;
  });
  newFormat = newFormat.replace(/@@@/g, function() {
    return literals.shift();
  });
  var matches = dateStr.match(new RegExp(newFormat, 'i'));
  if (!matches) {
    return null;
  }

  for (var i = 1; i < matches.length; i++) {
    parseInfo[i - 1](dateInfo, matches[i], i18n);
  }

  var today = new Date();
  if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  var date;
  if (dateInfo.timezoneOffset != null) {
    dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
    date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
      dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
  } else {
    date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
      dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
  }
  return date;
};

var a=function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")},n=function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")},r=function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};var A=function(e,t,a,n){n=n||{},a=null==a?{}:a;var r=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=a,e.dispatchEvent(r),r};var F=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null},B=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot};//# sourceMappingURL=index.m.js.map

const homeAssistant = document.querySelector('home-assistant');
const hass = homeAssistant.hass;
const lovelace = F();
const root = B();
const haElem = {};
haElem.main = homeAssistant.shadowRoot.querySelector('home-assistant-main');
haElem.tabs = Array.from((root.querySelector('paper-tabs') || root).querySelectorAll('paper-tab'));
haElem.tabContainer = root.querySelector('paper-tabs');
haElem.menu = root.querySelector('ha-menu-button');
haElem.options = root.querySelector('paper-menu-button');
haElem.voice = root.querySelector('ha-start-voice-button') || root.querySelector('paper-icon-button[icon="hass:microphone"]');
haElem.drawer = haElem.main.shadowRoot.querySelector('#drawer');
haElem.sidebar = {};
haElem.sidebar.main = haElem.main.shadowRoot.querySelector('ha-sidebar');
haElem.sidebar.menu = haElem.sidebar.main.shadowRoot.querySelector('.menu');
haElem.sidebar.listbox = haElem.sidebar.main.shadowRoot.querySelector('paper-listbox');
haElem.sidebar.divider = haElem.sidebar.main.shadowRoot.querySelector('div.divider');
haElem.appHeader = root.querySelector('app-header');
haElem.appLayout = root.querySelector('ha-app-layout');
haElem.partialPanelResolver = haElem.main.shadowRoot.querySelector('partial-panel-resolver');
const missing = [];

for (const item in haElem) {
  if (item == 'voice') {
    continue;
  } else if (!haElem[item]) {
    missing.push(item);
  } else if (typeof haElem[item] === 'object' && !haElem[item].nodeName) {
    for (const nested in haElem[item]) {
      if (!haElem[item][nested]) missing.push(`${item}[${nested}]`);
    }
  }
}

if (missing.length) {
  console.log(`[CUSTOM HEADER] The following HA element${missing.length > 1 ? 's' : ''} could not be found: ${missing.join(', ')}`);
}

const tabIndexByName = tab => {
  let index;
  const {
    views
  } = lovelace.config;

  if (isNaN(tab)) {
    views.forEach(view => {
      if (view.title === tab || view.path === tab) index = views.indexOf(view);
    });
  } else {
    index = parseInt(tab, 10);
  }

  return index;
}; // Invert show_tabs to hide_tabs

const invertNumArray = show_tabs => {
  if (show_tabs && show_tabs.length) {
    const total_tabs = [];

    for (let i = 0; i < haElem.tabs.length; i += 1) total_tabs.push(i);

    return total_tabs.filter(el => !show_tabs.includes(el));
  }
}; // Subscribe and render Jinja templates.

const subscribeRenderTemplate = (onChange, params, locale) => {
  const conn = hass.connection;
  const variables = {
    user: hass.user.name,
    browser: navigator.userAgent,
    ...params.variables,
    ...defaultVariables(locale)
  };
  const template = params.template;
  const entity_ids = params.entity_ids;
  return conn.subscribeMessage(msg => onChange(msg.result), {
    type: 'render_template',
    template,
    variables,
    entity_ids
  });
}; // Builds range from single range string "5 to 9" and returns array [5,6,7,8,9].

const buildRange = string => {
  const ranges = [];

  const range = (start, end) => new Array(end - start + 1).fill(undefined).map((_, i) => i + start);

  if (string.includes('to')) {
    const split = string.split('to');
    if (parseInt(split[1]) > parseInt(split[0])) ranges.push(range(parseInt(split[0]), parseInt(split[1])));else ranges.push(range(parseInt(split[1]), parseInt(split[0])));
  }

  return ranges.flat();
}; // Takes in array of tab names/paths, numbers, and ranges.
// Builds array of tab indexes with the results.

const processTabArray = array => {
  let ranges = [];

  const sortNumber = (a, b) => a - b;

  array = typeof array === 'string' ? array.replace(/\s+/g, '').split(',') : array;

  for (const i in array) {
    if (typeof array[i] == 'string' && array[i].includes('to')) ranges.push(buildRange(array[i]));else ranges.push(array[i]);
  }

  ranges = ranges.flat();

  for (const i in ranges) {
    if (isNaN(ranges[i])) ranges[i] = tabIndexByName(ranges[i]);else ranges[i] = parseInt(ranges[i]);
  }

  return ranges.sort(sortNumber);
};

const conditionalConfig = config => {
  const countMatches = conditions => {
    const userVars = {
      user: hass.user.name,
      user_agent: navigator.userAgent
    };
    let count = 0;

    for (const cond in conditions) {
      if (cond == 'user' && conditions[cond].includes(',')) {
        conditions[cond].split(/,+/).forEach(user => {
          if (userVars[cond] == user.trim()) count++;
        });
      } else {
        if (userVars[cond] == conditions[cond] || cond == 'query_string' && window.location.search.includes(conditions[cond]) || cond == 'user_agent' && userVars[cond].includes(conditions[cond]) || cond == 'media_query' && window.matchMedia(conditions[cond]).matches) {
          count++;
        } else {
          return 0;
        }
      }
    }

    return count;
  };

  let exceptionConfig = {};
  let highestMatch = 0; // Count number of matching conditions and choose config with most matches.

  if (config.exceptions) {
    config.exceptions.forEach(exception => {
      const matches = countMatches(exception.conditions);

      if (matches > highestMatch) {
        highestMatch = matches;
        exceptionConfig = exception.config;
      }
    });
  } // If exception config uses hide_tabs and main config uses show_tabs,
  // delete show_tabs and vice versa.


  if (exceptionConfig.hide_tabs && config.show_tabs && exceptionConfig.hide_tabs.length && config.show_tabs.length) {
    delete config.show_tabs;
  } else if (exceptionConfig.show_tabs && config.hide_tabs && exceptionConfig.show_tabs.length && config.hide_tabs.length) {
    delete config.hide_tabs;
  }

  return { ...config,
    ...exceptionConfig
  };
};

const buildHeader = () => {
  if (root.querySelector('ch-header')) return;
  const header = {};
  header.tabContainer = document.createElement('paper-tabs');
  header.tabContainer.setAttribute('scrollable', '');
  header.tabContainer.setAttribute('dir', 'ltr');
  header.tabContainer.style.width = '100%';
  header.tabContainer.style.marginLeft = '0';
  haElem.tabs.forEach(tab => {
    const index = haElem.tabs.indexOf(tab);
    const tabClone = tab.cloneNode(true);
    const haIcon = tabClone.querySelector('ha-icon');

    if (haIcon) {
      haIcon.setAttribute('icon', lovelace.config.views[index].icon);
    }

    tabClone.addEventListener('click', () => {
      haElem.tabs[index].dispatchEvent(new MouseEvent('click', {
        bubbles: false,
        cancelable: true
      }));
    });
    header.tabContainer.appendChild(tabClone);
  });
  header.tabs = header.tabContainer.querySelectorAll('paper-tab');

  const buildButton = (button, icon) => {
    if (button === 'options') {
      header[button] = haElem[button].cloneNode(true);
      header[button].removeAttribute('horizontal-offset');
      header[button].querySelector('paper-icon-button').style.height = '48px';
      const items = Array.from(header[button].querySelectorAll('paper-item'));
      items.forEach(item => {
        const index = items.indexOf(item);
        item.addEventListener('click', () => {
          haElem[button].querySelectorAll('paper-item')[index].dispatchEvent(new MouseEvent('click', {
            bubbles: false,
            cancelable: true
          }));
        });
      });
    } else {
      if (!haElem[button]) return;
      header[button] = document.createElement('paper-icon-button');
      header[button].addEventListener('click', () => {
        (haElem[button].shadowRoot.querySelector('paper-icon-button') || haElem[button]).dispatchEvent(new MouseEvent('click', {
          bubbles: false,
          cancelable: true
        }));
      });
    }

    header[button].setAttribute('icon', icon);
    header[button].setAttribute('buttonElem', button);
    header[button].style.flexShrink = '0';
    header[button].style.height = '48px';
  };

  buildButton('menu', 'mdi:menu');
  buildButton('voice', 'mdi:microphone');
  buildButton('options', 'mdi:dots-vertical');
  const stack = document.createElement('ch-stack');
  const contentContainer = document.createElement('div');
  contentContainer.setAttribute('id', 'contentContainer');
  header.container = document.createElement('ch-header');
  if (header.menu) header.container.appendChild(header.menu);
  header.container.appendChild(stack);
  header.stack = header.container.querySelector('ch-stack');
  header.stack.appendChild(contentContainer);
  header.stack.appendChild(header.tabContainer);
  if (header.voice && header.voice.style.visibility != 'hidden') header.container.appendChild(header.voice);
  if (header.options) header.container.appendChild(header.options);
  haElem.appLayout.appendChild(header.container);
  return header;
};
const header = buildHeader();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari dooes not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceeding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // tslint:disable-next-line:no-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render$1 = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this._updateState = 0;
        this._instanceProperties = undefined;
        this._updatePromise = microtaskPromise;
        this._hasConnectedResolver = undefined;
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */
        this._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */
        this._reflectingProperties = undefined;
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        Object.defineProperty(this.prototype, name, {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this._requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
        });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this._requestUpdate();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        this._updateState = this._updateState | STATE_HAS_CONNECTED;
        // Ensure first connection completes an update. Updates cannot complete
        // before connection and if one is pending connection the
        // `_hasConnectionResolver` will exist. If so, resolve it to complete the
        // update, otherwise requestUpdate.
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver();
            this._hasConnectedResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    _requestUpdate(name, oldValue) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this._requestUpdate(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        // Mark state updating...
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        let resolve;
        let reject;
        const previousUpdatePromise = this._updatePromise;
        this._updatePromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await previousUpdatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        // Make sure the element has connected before updating.
        if (!this._hasConnected) {
            await new Promise((res) => this._hasConnectedResolver = res);
        }
        try {
            const result = this.performUpdate();
            // If `performUpdate` returns a Promise, we await it. This is done to
            // enable coordinating updates with a scheduler. Note, the result is
            // checked to avoid delaying an additional microtask unless we need to.
            if (result != null) {
                await result;
            }
        }
        catch (e) {
            reject(e);
        }
        resolve(!this._hasRequestedUpdate);
    }
    get _hasConnected() {
        return (this._updateState & STATE_HAS_CONNECTED);
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            throw e;
        }
        finally {
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;
//# sourceMappingURL=updating-element.js.map

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
//# sourceMappingURL=css-tag.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.2.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function arrayFlat(styles, result = []) {
    for (let i = 0, length = styles.length; i < length; i++) {
        const value = styles[i];
        if (Array.isArray(value)) {
            arrayFlat(value, result);
        }
        else {
            result.push(value);
        }
    }
    return result;
}
/** Deeply flattens styles array. Uses native flat if available. */
const flattenStyles = (styles) => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
class LitElement extends UpdatingElement {
    /** @nocollapse */
    static finalize() {
        // The Closure JS Compiler does not always preserve the correct "this"
        // when calling static super methods (b/137460243), so explicitly bind.
        super.finalize.call(this);
        // Prepare styling that is stamped at first render time. Styling
        // is built from user provided `styles` or is inherited from the superclass.
        this._styles =
            this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ?
                this._getUniqueStyles() :
                this._styles || [];
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Take care not to call `this.styles` multiple times since this generates
        // new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.styles;
        const styles = [];
        if (Array.isArray(userStyles)) {
            const flatStyles = flattenStyles(userStyles);
            // As a performance optimization to avoid duplicated styling that can
            // occur especially when composing via subclassing, de-duplicate styles
            // preserving the last item in the list. The last item is kept to
            // try to preserve cascade order with the assumption that it's most
            // important that last added styles override previous styles.
            const styleSet = flatStyles.reduceRight((set, s) => {
                set.add(s);
                // on IE set.add does not return the set.
                return set;
            }, new Set());
            // Array.from does not work on Set in IE
            styleSet.forEach((v) => styles.unshift(v));
        }
        else if (userStyles) {
            styles.push(userStyles);
        }
        return styles;
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
        super.initialize();
        this.renderRoot =
            this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        super.update(changedProperties);
        const templateResult = this.render();
        if (templateResult instanceof TemplateResult) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render() {
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */
LitElement.render = render$1;
//# sourceMappingURL=lit-element.js.map

const getThemeVar = themeVar => {
  return getComputedStyle(document.body).getPropertyValue(themeVar);
};

const defaultConfig = {
  // Main config
  locale: [],
  header_text: 'Home Assistant',
  disabled_mode: false,
  kiosk_mode: false,
  compact_mode: false,
  footer_mode: false,
  disable_sidebar: false,
  hide_header: false,
  chevrons: true,
  indicator_top: false,
  hidden_tab_redirect: true,
  // Colors
  background: getThemeVar('--ch-background') || 'var(--primary-color)',
  elements_color: getThemeVar('--ch-elements-color') || 'var(--text-primary-color)',
  menu_color: getThemeVar('--ch-menu-color') || '',
  voice_color: getThemeVar('--ch-voice-color') || '',
  options_color: getThemeVar('--ch-options-color') || '',
  all_tabs_color: getThemeVar('--ch-all-tabs-color') || '',
  notification_dot_color: getThemeVar('--ch-notification-dot-color') || '#ff9800',
  tab_indicator_color: getThemeVar('--ch-tab-indicator-color') || '',
  active_tab_color: getThemeVar('--ch-active-tab-color') || '',
  tabs_color: [],
  // Tabs
  hide_tabs: [],
  show_tabs: [],
  default_tab: '',
  tab_icons: [],
  reverse_tab_direction: false,
  // Buttons
  button_icons: [],
  button_text: [],
  reverse_button_direction: false,
  menu_dropdown: false,
  menu_hide: false,
  voice_dropdown: false,
  voice_hide: false,
  options_hide: false,
  // Overflow menu items
  hide_help: false,
  hide_unused: false,
  hide_refresh: false,
  hide_config: false,
  hide_raw: false,
  // Custom CSS
  tabs_css: [],
  header_css: '',
  stack_css: '',
  header_text_css: '',
  active_tab_css: '',
  options_list_css: '',
  menu_css: '',
  options_css: '',
  voice_css: '',
  all_tabs_css: '',
  tab_container_css: '',
  view_css: '',
  panel_view_css: '',
  // Misc
  template_variables: '',
  exceptions: [],
  editor_warnings: true
};

var common = {
	version: "Version"
};
var links = {
	docs: "Docs",
	forums: "Forums"
};
var editor = {
	add_exception: "Add Exception",
	automatic: "automatic",
	buttons: "Buttons",
	cancel: "Cancel",
	chevrons_tip: "Disable scrolling arrows for tabs.",
	chevrons_title: "Display Tab Chevrons",
	compact_mode_tip: "Make header compact.",
	compact_mode_title: "Compact Mode",
	conditions: "Conditions",
	config: "Config",
	current_user_agent: "Current User Agent",
	current_user: "Current User",
	default_tab: "Default tab",
	disable_sidebar_tip: "Disable sidebar and menu button.",
	disable_sidebar_title: "Disable Sidebar",
	disabled_mode_tip: "Completely disable Custom-Header.",
	disabled_mode_title: "Disabled Mode",
	disabled_template: "Disabled: The current value is a template.",
	editor_warnings_second_title: "Display Editor Warnings & Info",
	editor_warnings_tip: "Toggle editor warnings.",
	editor_warnings_title: "Display this info and warnings section.",
	exceptions: "Exceptions",
	footer_mode_tip: "Turn the header into a footer.",
	footer_mode_title: "Footer Mode",
	header_text: "Header text.",
	hidden_tab_redirect_tip: "Redirect from hidden tab.",
	hidden_tab_redirect_title: "Hidden Tab Redirect",
	hide_configure_ui_tip: "Hide item in options menu.",
	hide_configure_ui_title: "Hide 'Configure UI'",
	hide_header_tip: "Hide header, but allow swipe out of sidebar.",
	hide_header_title: "Disable Header",
	hide_help_tip: "Hide item in options menu.",
	hide_help_title: "Hide 'Help'",
	hide_raw_editor_tip: "Hide item in options menu.",
	hide_raw_editor_title: "Hide 'Raw Config Editor'",
	hide_tab_list: "Comma-separated list of tab numbers to hide",
	hide_unused_tip: "Hide item in options menu.",
	hide_unused_title: "Hide 'Unused Entities'",
	kiosk_mode_tip: "Hide and disable the header and sidebar",
	kiosk_mode_title: "Kiosk Mode",
	locale_desc: "Locale for default template variables (date/time).",
	media_query: "Media Query",
	menu_dropdown_tip: "Put menu button in options menu.",
	menu_dropdown_title: "Menu in Dropdown Menu",
	menu_hide_tip: "Hide the menu button.",
	menu_hide_title: "Hide Menu Button",
	menu_items: "Menu Items",
	options_hide_tip: "Hide the options button.",
	options_hide_title: "Hide Options Button",
	query_string: "Query String",
	removes_edit_ui: "Removes ability to edit UI.",
	reverse_button_tip: "Reverses all buttons orientation.",
	reverse_button_title: "Reverse Buttons Orientation",
	reverse_tab_tip: "Places tabs on right side in reverse order.",
	reverse_tab_title: "Reverse Tab Direction",
	save_and_reload: "Save and reload",
	save_failed: "Save failed",
	show_tab_list: "Comma-separated list of tab numbers to show",
	tabs_hide: "Hide Tabs",
	tabs_show: "Show Tabs",
	tabs: "Tabs",
	user_agent: "User Agent",
	user_list: "User (Seperate multiple users with a comma.)",
	voice_dropdown_tip: "Put voice button in options menu.",
	voice_dropdown_title: "Voice in Dropdown Menu",
	voice_hide_tip: "Hide the voice button.",
	voice_hide_title: "Hide Voice Button",
	warning_allready_a_template: "Designates items that are already a template and won't be modified by the editor.",
	warning_disable_ch: "You can temporaily disable Custom-Header by adding '?disable_ch' to the end of your URL.",
	warning_edit_ui: "Marks items that remove your ability to edit the UI.",
	warning_jinja_info: "All text options accept Jinja. Hover over any item for more info.",
	warning_raw_editor_reload: "After using the 'Raw Config Editor' you need to reload the page to restore Custom Header."
};
var en = {
	common: common,
	links: links,
	editor: editor
};

var en$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  common: common,
  links: links,
  editor: editor,
  'default': en
});

var common$1 = {
	version: "Versjon"
};
var links$1 = {
	docs: "Documentasjon",
	forums: "Forum"
};
var editor$1 = {
	add_exception: "Legg til unntak",
	automatic: "automatisk",
	buttons: "Brytere",
	cancel: "Avbryt",
	chevrons_tip: "Deaktiver pilene på tab båndet.",
	chevrons_title: "Vis tab piler",
	compact_mode_tip: "Gjør headeren compact.",
	compact_mode_title: "Kompakt modus",
	conditions: "Betingelser",
	config: "Konfigurasjon",
	current_user_agent: "Nåværende User Agent",
	current_user: "Pålogget bruker",
	default_tab: "Standard tab",
	disable_sidebar_tip: "Deaktiver side panelet og meny knappen.",
	disable_sidebar_title: "Deaktiver side panelet",
	disabled_mode_tip: "Deaktiver Custom-Header.",
	disabled_mode_title: "Deaktivert modus",
	disabled_template: "Deaktivert: Nåværende verdi er en mal.",
	editor_warnings_second_title: "Vis editor advarser of informasjon",
	editor_warnings_tip: "Veksle editor advarsler.",
	editor_warnings_title: "Vis denne informasjonen og advarsel seksjoner.",
	exceptions: "Unntak",
	footer_mode_tip: "Gjør headeren om til en footer.",
	footer_mode_title: "Footer modus",
	header_text: "Header tekst.",
	hidden_tab_redirect_tip: "Omadresser fra gjemt tab.",
	hidden_tab_redirect_title: "Gjemt tab omadresser",
	hide_configure_ui_tip: "Gjem 'Konfigurer brukergrensesnitt' in nedtrekksmenyen.",
	hide_configure_ui_title: "Gjem 'Konfigurer brukergrensesnitt'",
	hide_header_tip: "Gjem headderen, men tillat å dra inn fra siden for å åpne side panelet",
	hide_help_tip: "Deaktiver header",
	hide_help_title: "Gjem 'Hjelp'",
	hide_raw_editor_tip: "Gjem 'Tekstbasert konfigurasjonsredigering' in nedtrekksmenyen.",
	hide_raw_editor_title: "Gjem 'Tekstbasert konfigurasjonsredigering'",
	hide_tab_list: "Komma separert liste over tabber som skal gjemmes",
	hide_unused_tip: "Gjem 'Unused Entities' in nedtrekksmenyen.",
	hide_unused_title: "Gjem 'Unused Entities'",
	kiosk_mode_tip: "Gjem og deaktiver headeren og side panelet.",
	kiosk_mode_title: "Kiosk modus",
	locale_desc: "Locale for standard mal variabler (dato/tip).",
	menu_dropdown_tip: "Plasser meny i nedtrekksmenyen.",
	menu_dropdown_title: "Meny i nedtrekksmenyen",
	menu_hide_tip: "Gjem meny knappen.",
	menu_hide_title: "Gjem meny knappen",
	menu_items: "Meny elementer",
	options_hide_tip: "Gjem alternativer knappen.",
	options_hide_title: "Gjem alternativer knappen",
	removes_edit_ui: "Fjerner muligheten til å redigere brukergrensesnittet.",
	reverse_button_tip: "Reverser alle bryter orienteringer.",
	reverse_button_title: "Reverser bryter orientering",
	reverse_tab_tip: "Plasser tabber på høyre side i reversert rekkefølge.",
	reverse_tab_title: "Reverser tab rettning",
	save_and_reload: "Lagre og last inn på nytt",
	save_failed: "Lagring feilet",
	show_tab_list: "Komma separert liste over tabber som skal vises",
	tabs_hide: "Gjem Tabber",
	tabs_show: "Vis Tabber",
	tabs: "Tabber",
	user_list: "Bruker (Skill flere brukere med komma.)",
	voice_dropdown_tip: "Plasser stemme i nedtrekksmenyen.",
	voice_dropdown_title: "Stemme i nedtrekksmenyen",
	voice_hide_tip: "Gjem stemme knappen.",
	voice_hide_title: "Gjem stemme knappen",
	warning_allready_a_template: "Etter å ha brukt 'Tekstbasert konfigurasjonsredigering', må du laste inn siden på nytt for å gjenopprette Custom Header.",
	warning_disable_ch: "Du kan deaktivere Custom-Header midlertidig ved å legge til '?disable_ch' på slutten av nettadressen.",
	warning_edit_ui: "Markerer elementer som fjerner muligheten til å redigere brukergrensesnittet.",
	warning_jinja_info: "Alle tekstalternativer godtar Jinja. Hold musepekeren over et hvilket som helst element for mer informasjon.",
	warning_raw_editor_reload: "After using the 'Tekstbasert konfigurasjonsredigering' you need to reload the page to restore Custom Header."
};
var nb = {
	common: common$1,
	links: links$1,
	editor: editor$1
};

var nb$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  common: common$1,
  links: links$1,
  editor: editor$1,
  'default': nb
});

const languages = {
  en: en$1,
  nb: nb$1
};
function localize(string, search = '', replace = '') {
  const section = string.split('.')[0];
  const key = string.split('.')[1];
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
  let tranlated;

  try {
    tranlated = languages[lang][section][key];
  } catch (e) {
    tranlated = languages['en'][section][key];
  }

  if (tranlated === undefined) tranlated = languages['en'][section][key];

  if (search !== '' && replace !== '') {
    tranlated = tranlated.replace(search, replace);
  }

  return tranlated;
}

class CustomHeaderEditor extends LitElement {
  static get properties() {
    return {
      _config: {}
    };
  }

  firstUpdated() {
    this._lovelace = F();
    this.deepcopy = this.deepcopy.bind(this);
    this._config = this._lovelace.config.custom_header ? this.deepcopy(this._lovelace.config.custom_header) : {};
  }

  render() {
    if (!this._config || !this._lovelace) return html``;
    return html`
      <div @click="${this._close}" class="title_control">
        X
      </div>
      ${this.renderStyle()}
      <ch-config-editor
        .defaultConfig="${defaultConfig}"
        .config="${this._config}"
        @ch-config-changed="${this._configChanged}"
      >
      </ch-config-editor>
      <h4 class="underline">${localize('editor.exceptions')}</h4>
      <br />
      ${this._config.exceptions ? this._config.exceptions.map((exception, index) => html`
              <ch-exception-editor
                .config="${this._config}"
                .exception="${exception}"
                .index="${index}"
                @ch-exception-changed="${this._exceptionChanged}"
                @ch-exception-delete="${this._exceptionDelete}"
              >
              </ch-exception-editor>
            `) : ''}
      <br />
      <mwc-button @click="${this._addException}">${localize('editor.add_exception')}</mwc-button>
      <h4 class="underline">${localize('editor.current_user')}</h4>
      <p style="font-size:16pt">${hass.user.name}</p>
      <h4 class="underline">${localize('editor.current_user_agent')}</h4>
      <br />
      ${navigator.userAgent}
      <br />
      <h4
        style="background:var(--paper-card-background-color);
          margin-bottom:-20px;"
        class="underline"
      >
        ${!this.exception ? html`
              ${this._save_button}
            ` : ''}
        ${!this.exception ? html`
              ${this._cancel_button}
            ` : ''}
      </h4>
    `;
  }

  _close() {
    const editor = this.parentNode.parentNode.parentNode.querySelector('editor');
    this.parentNode.parentNode.parentNode.removeChild(editor);
  }

  _save() {
    for (const key in this._config) {
      if (this._config[key] == defaultConfig[key]) delete this._config[key];
    }

    const newConfig = { ...this._lovelace.config,
      ...{
        custom_header: this._config
      }
    };

    try {
      this._lovelace.saveConfig(newConfig).then(() => {
        window.location.href = window.location.href;
      });
    } catch (e) {
      alert(`${localize('editor.save_failed')}: ${e}`);
    }
  }

  get _save_button() {
    const text = localize('editor.save_and_reload');
    return html`
      <mwc-button raised @click="${this._save}">${text}</mwc-button>
    `;
  }

  get _cancel_button() {
    return html`
      <mwc-button raised @click="${this._close}">${localize('editor.cancel')}</mwc-button>
    `;
  }

  _addException() {
    let newExceptions;

    if (this._config.exceptions) {
      newExceptions = this._config.exceptions.slice(0);
      newExceptions.push({
        conditions: {},
        config: {}
      });
    } else {
      newExceptions = [{
        conditions: {},
        config: {}
      }];
    }

    this._config = { ...this._config,
      exceptions: newExceptions
    };
    A(this, 'config-changed', {
      config: this._config
    });
  }

  _configChanged({
    detail
  }) {
    if (!this._config) return;
    this._config = { ...this._config,
      ...detail.config
    };
    A(this, 'config-changed', {
      config: this._config
    });
  }

  _exceptionChanged(ev) {
    if (!this._config) return;
    const target = ev.target.index;

    const newExceptions = this._config.exceptions.slice(0);

    newExceptions[target] = ev.detail.exception;

    for (const exceptions of newExceptions) {
      for (const key in exceptions.config) {
        if (this._config[key] == exceptions.config[key]) delete exceptions.config[key];else if (!this._config[key] && defaultConfig[key] == exceptions.config[key]) delete exceptions.config[key];
      }
    }

    this._config = { ...this._config,
      exceptions: newExceptions
    };
    A(this, 'config-changed', {
      config: this._config
    });
  }

  _exceptionDelete(ev) {
    if (!this._config) return;
    const target = ev.target;

    const newExceptions = this._config.exceptions.slice(0);

    newExceptions.splice(target.index, 1);
    this._config = { ...this._config,
      exceptions: newExceptions
    };
    A(this, 'config-changed', {
      config: this._config
    });
    this.requestUpdate();
  }

  deepcopy(value) {
    if (!(!!value && typeof value == 'object')) return value;

    if (Object.prototype.toString.call(value) == '[object Date]') {
      return new Date(value.getTime());
    }

    if (Array.isArray(value)) return value.map(this.deepcopy);
    const result = {};
    Object.keys(value).forEach(key => {
      result[key] = this.deepcopy(value[key]);
    });
    return result;
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        .toggle-button {
          margin: 4px;
          background-color: transparent;
          color: var(--primary-color);
        }
        .title_control {
          color: var(--text-dark-color);
          font-weight: bold;
          font-size: 22px;
          float: right;
          cursor: pointer;
          margin: -10px -5px -5px -5px;
        }
        .user_agent {
          display: block;
          margin-left: auto;
          margin-right: auto;
          padding: 5px;
          border: 0;
          resize: none;
          width: 100%;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }

}
customElements.define('custom-header-editor', CustomHeaderEditor);

class ChConfigEditor extends LitElement {
  static get properties() {
    return {
      defaultConfig: {},
      config: {},
      exception: {},
      _closed: {}
    };
  }

  constructor() {
    super();
    this.buttonOptions = ['show', 'hide', 'clock', 'overflow'];
    this.overflowOptions = ['show', 'hide', 'clock'];
    this.swipeAnimation = ['none', 'swipe', 'fade', 'flip'];
  }

  get _clock() {
    return this.getConfig('menu') == 'clock' || this.getConfig('voice') == 'clock' || this.getConfig('options') == 'clock';
  }

  getConfig(item) {
    return this.config[item] !== undefined ? this.config[item] : defaultConfig[item];
  }

  templateExists(item) {
    if (typeof item === 'string' && (item.includes('{{') || item.includes('{%'))) return true;else return false;
  }

  haSwitch(option, templateWarn, editorWarn, text, title, checked) {
    const templateIcon = html`
      <iron-icon
        icon="mdi:alpha-t-box-outline"
        class="alert"
        title="${localize('editor.disabled_template')}"
      ></iron-icon>
    `;
    const editorWarning = html`
      <iron-icon icon="mdi:alert-box-outline" class="alert" title="${localize('editor.removes_edit_ui')}"></iron-icon>
    `;
    return html`
      <ha-switch
        class="${this.exception && this.config[option] === undefined ? 'inherited slotted' : 'slotted'}"
        ?checked="${this.getConfig(option) !== false && !this.templateExists(this.getConfig(option))}"
        .configValue="${option}"
        @change="${this._valueChanged}"
        title=${title}
        ?disabled=${this.templateExists(this.getConfig(option))}
      >
        ${text} ${this.templateExists(this.getConfig(option)) && templateWarn ? templateIcon : ''}
        ${editorWarn ? editorWarning : ''}
      </ha-switch>
    `;
  }

  render() {
    this.exception = this.exception !== undefined && this.exception !== false;
    return html`
      <custom-style>
        <style is="custom-style">
          a {
            color: var(--text-dark-color);
            text-decoration: none;
          }
          .card-header {
            margin-top: -5px;
            @apply --paper-font-headline;
          }
          .card-header paper-icon-button {
            margin-top: -5px;
            float: right;
          }
        </style>
      </custom-style>
      ${!this.exception ? html`
            <h1 style="margin-top:-20px;margin-bottom:0;" class="underline">
              Custom Header
            </h1>
            <h4 style="margin-top:-5px;padding-top:10px;font-size:12pt;" class="underline">
              <a href="https://maykar.github.io/custom-header/" target="_blank">
                <ha-icon icon="mdi:help-circle" style="margin-top:-5px;"> </ha-icon>
                ${localize('links.docs')}&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://github.com/maykar/custom-header" target="_blank">
                <ha-icon icon="mdi:github-circle" style="margin-top:-5px;"> </ha-icon>
                GitHub&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://community.home-assistant.io/t/custom-header/" target="_blank">
                <ha-icon icon="hass:home-assistant" style="margin-top:-5px;"> </ha-icon>
                ${localize('links.forums')}</a
              >
            </h4>
            ${this.getConfig('editor_warnings') ? html`
                  <br />
                  <div class="warning">
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_disable_ch')}
                    </p>
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_raw_editor_reload')}
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      <ha-icon style="padding-right: 3px;" icon="mdi:alpha-t-box-outline"></ha-icon>
                      ${localize('editor.warning_allready_a_template')}
                      <br /><ha-icon style="padding-right: 3px;" icon="mdi:alert-box-outline"></ha-icon> ${localize('editor.warning_edit_ui')}<br />
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_jinja_info')}
                    </p>
                  </div>
                ` : ''}
            ${!this.exception && this.getConfig('editor_warnings') ? this.haSwitch('editor_warnings', false, false, localize('editor.editor_warnings_title'), localize('editor.editor_warnings_tip')) : ''}
          ` : ''}
      ${this.renderStyle()}
      ${this.getConfig('editor_warnings') && !this.exception ? html`
            <h4 class="underline">Main Config</h4>
          ` : ''}
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch('disabled_mode', true, false, localize('editor.disabled_mode_title'), localize('editor.disabled_mode_tip'))}
        ${this.haSwitch('footer_mode', true, false, localize('editor.footer_mode_title'), localize('editor.footer_mode_tip'))}
        ${this.haSwitch('compact_mode', true, false, localize('editor.compact_mode_title'), localize('editor.compact_mode_tip'))}
        ${this.haSwitch('kiosk_mode', true, true, localize('editor.kiosk_mode_title'), localize('editor.kiosk_mode_tip'))}
        ${this.haSwitch('disable_sidebar', true, false, localize('editor.disable_sidebar_title'), localize('editor.disable_sidebar_tip'))}
        ${this.haSwitch('hide_header', true, false, localize('editor.hide_header_title'), localize('editor.hide_header_tip'))}
        ${this.haSwitch('chevrons', true, false, localize('editor.chevrons_title'), localize('editor.chevrons_tip'))}
        ${this.haSwitch('hidden_tab_redirect', true, false, localize('editor.hidden_tab_redirect_title'), localize('editor.hidden_tab_redirect_tip'))}
        ${!this.exception && !this.getConfig('editor_warnings') ? this.haSwitch('editor_warnings', false, false, localize('editor.editor_warnings_second_title'), localize('editor.editor_warnings_tip')) : ''}
      </div>
      <hr />
      <div class="side-by-side">
        <paper-input
          style="padding: 10px 10px 0 10px;"
          class="${this.exception && this.config.header_text === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.header_text')}"
          .value="${this.getConfig('header_text')}"
          .configValue="${'header_text'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        <paper-input
          placeholder="${localize('editor.automatic')}"
          style="padding: 10px 10px 0 10px;"
          class="${this.exception && this.config.locale === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.locale_desc')}"
          .value="${this.getConfig('locale')}"
          .configValue="${'locale'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
      </div>
      <h4 class="underline">${localize('editor.menu_items')}</h4>
      <div class="side-by-side">
        ${this.haSwitch('hide_config', true, true, localize('editor.hide_configure_ui_title'), localize('editor.hide_configure_ui_tip'))}
        ${this.haSwitch('hide_raw', true, true, localize('editor.hide_raw_editor_title'), localize('editor.hide_raw_editor_tip'))}
        ${this.haSwitch('hide_help', true, false, localize('editor.hide_help_title'), localize('editor.hide_help_tip'))}
        ${this.haSwitch('hide_unused', true, false, localize('editor.hide_unused_title'), localize('editor.hide_unused_tip'))}
      </div>
      <h4 class="underline">${localize('editor.buttons')}</h4>
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch('menu_hide', true, false, localize('editor.menu_hide_title'), localize('editor.menu_hide_tip'))}
        ${this.haSwitch('menu_dropdown', true, false, localize('editor.menu_dropdown_title'), localize('editor.menu_dropdown_tip'))}
        ${this.haSwitch('voice_hide', true, false, localize('editor.voice_hide_title'), localize('editor.voice_hide_tip'))}
        ${this.haSwitch('voice_dropdown', true, false, localize('editor.voice_dropdown_title'), localize('editor.voice_dropdown_tip'))}
        ${this.haSwitch('options_hide', true, true, localize('editor.options_hide_title'), localize('editor.options_hide_tip'))}
        ${this.haSwitch('reverse_button_direction', true, false, localize('editor.reverse_button_title'), localize('editor.reverse_button_tip'))}
      </div>
      <h4 class="underline">${localize('editor.tabs')}</h4>
      <paper-dropdown-menu id="tabs" @value-changed="${this._tabVisibility}">
        <paper-listbox slot="dropdown-content" .selected="${this.getConfig('show_tabs').length > 0 ? '1' : '0'}">
          <paper-item>${localize('editor.tabs_hide')}</paper-item>
          <paper-item>${localize('editor.tabs_show')}</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div class="side-by-side">
        <div id="show" style="display:${this.getConfig('show_tabs').length > 0 ? 'initial' : 'none'}">
          <paper-input
            class="${this.exception && this.config.show_tabs === undefined ? 'inherited slotted' : 'slotted'}"
            label="${localize('editor.show_tab_list')}:"
            .value="${this.getConfig('show_tabs')}"
            .configValue="${'show_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div id="hide" style="display:${this.getConfig('show_tabs').length > 0 ? 'none' : 'initial'}">
          <paper-input
            class="${this.exception && this.config.hide_tabs === undefined ? 'inherited slotted' : 'slotted'}"
            label="${localize('editor.hide_tab_list')}:"
            .value="${this.getConfig('hide_tabs')}"
            .configValue="${'hide_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <paper-input
          class="${this.exception && this.config.default_tab === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.default_tab')}:"
          .value="${this.getConfig('default_tab')}"
          .configValue="${'default_tab'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        ${this.haSwitch('reverse_tab_direction', true, false, localize('editor.reverse_tab_title'), localize('editor.reverse_tab_tip'))}
      </div>
    `;
  }

  _toggleCard() {
    this._closed = !this._closed;
    A(this, 'iron-resize');
  }

  _tabVisibility() {
    const show = this.shadowRoot.querySelector('#show');
    const hide = this.shadowRoot.querySelector('#hide');

    if (this.shadowRoot.querySelector('#tabs').value == 'Hide Tabs') {
      show.style.display = 'none';
      hide.style.display = 'initial';
    } else {
      hide.style.display = 'none';
      show.style.display = 'initial';
    }
  }

  _valueChanged(ev) {
    if (!this.config) return;

    if (ev.target.configValue) {
      if (ev.target.value === '') {
        delete this.config[ev.target.configValue];
      } else {
        this.config = { ...this.config,
          [ev.target.configValue]: ev.target.checked !== undefined ? ev.target.checked : ev.target.value
        };
      }
    }

    A(this, 'ch-config-changed', {
      config: this.config
    });
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        ha-switch {
          padding-top: 16px;
        }
        iron-icon {
          padding-right: 5px;
        }
        iron-input {
          max-width: 115px;
        }
        .inherited {
          opacity: 0.4;
        }
        .inherited:hover {
          opacity: 1;
        }
        .side-by-side {
          display: flex;
          flex-wrap: wrap;
        }
        .side-by-side > * {
          flex: 1;
          padding-right: 4px;
          flex-basis: 33%;
        }
        .buttons > div {
          display: flex;
          align-items: center;
        }
        .buttons > div paper-dropdown-menu {
          flex-grow: 1;
        }
        .buttons > div iron-icon {
          padding-right: 15px;
          padding-top: 20px;
          margin-left: -3px;
        }
        .buttons > div:nth-of-type(2n) iron-icon {
          padding-left: 20px;
        }
        .warning {
          background-color: #455a64;
          padding: 10px;
          color: #ffcd4c;
          border-radius: 5px;
        }
        .alert {
          color: #ff9800;
          padding-right: 0;
          margin-right: -5px;
          padding-left: 7px;
        }
        [closed] {
          overflow: hidden;
          height: 52px;
        }
        paper-card {
          margin-top: 10px;
          width: 100%;
          transition: all 0.5s ease;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }

}

customElements.define('ch-config-editor', ChConfigEditor);

class ChExceptionEditor extends LitElement {
  static get properties() {
    return {
      config: {},
      exception: {},
      _closed: {}
    };
  }

  constructor() {
    super();
    this._closed = true;
  }

  render() {
    if (!this.exception) {
      return html``;
    }

    return html`
      ${this.renderStyle()}
      <custom-style>
        <style is="custom-style">
          .card-header {
            margin-top: -5px;
            @apply --paper-font-headline;
          }
          .card-header paper-icon-button {
            margin-top: -5px;
            float: right;
          }
        </style>
      </custom-style>
      <paper-card ?closed=${this._closed}>
        <div class="card-content">
          <div class="card-header">
            ${Object.values(this.exception.conditions).join(', ').substring(0, 40) || 'New Exception'}
            <paper-icon-button
              icon="${this._closed ? 'mdi:chevron-down' : 'mdi:chevron-up'}"
              @click="${this._toggleCard}"
            >
            </paper-icon-button>
            <paper-icon-button ?hidden=${this._closed} icon="mdi:delete" @click="${this._deleteException}">
            </paper-icon-button>
          </div>
          <h4 class="underline">${localize('editor.conditions')}</h4>
          <ch-conditions-editor
            .conditions="${this.exception.conditions}"
            @ch-conditions-changed="${this._conditionsChanged}"
          >
          </ch-conditions-editor>
          <h4 class="underline">${localize('editor.config')}</h4>
          <ch-config-editor
            exception
            .defaultConfig="${{ ...defaultConfig,
      ...this.config
    }}"
            .config="${this.exception.config}"
            @ch-config-changed="${this._configChanged}"
          >
          </ch-config-editor>
        </div>
      </paper-card>
    `;
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        [closed] {
          overflow: hidden;
          height: 52px;
        }
        paper-card {
          margin-top: 10px;
          width: 100%;
          transition: all 0.5s ease;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }

  _toggleCard() {
    this._closed = !this._closed;
    A(this, 'iron-resize');
  }

  _deleteException() {
    A(this, 'ch-exception-delete');
  }

  _conditionsChanged({
    detail
  }) {
    if (!this.exception) return;
    const newException = { ...this.exception,
      conditions: detail.conditions
    };
    A(this, 'ch-exception-changed', {
      exception: newException
    });
  }

  _configChanged(ev) {
    ev.stopPropagation();
    if (!this.exception) return;
    const newException = { ...this.exception,
      config: ev.detail.config
    };
    A(this, 'ch-exception-changed', {
      exception: newException
    });
  }

}

customElements.define('ch-exception-editor', ChExceptionEditor);

class ChConditionsEditor extends LitElement {
  static get properties() {
    return {
      conditions: {}
    };
  }

  get _user() {
    return this.conditions.user || '';
  }

  get _user_agent() {
    return this.conditions.user_agent || '';
  }

  get _media_query() {
    return this.conditions.media_query || '';
  }

  get _query_string() {
    return this.conditions.query_string || '';
  }

  render() {
    if (!this.conditions) return html``;
    return html`
      <paper-input
        label="${localize('editor.user_list')}"
        .value="${this._user}"
        .configValue="${'user'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.user_agent')}"
        .value="${this._user_agent}"
        .configValue="${'user_agent'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.media_query')}"
        .value="${this._media_query}"
        .configValue="${'media_query'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.query_string')}"
        .value="${this._query_string}"
        .configValue="${'query_string'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
    `;
  }

  _valueChanged(ev) {
    if (!this.conditions) return;
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) return;

    if (target.configValue) {
      if (target.value === '') {
        delete this.conditions[target.configValue];
      } else {
        this.conditions = { ...this.conditions,
          [target.configValue]: target.value
        };
      }
    }

    A(this, 'ch-conditions-changed', {
      conditions: this.conditions
    });
  }

}

customElements.define('ch-conditions-editor', ChConditionsEditor);

const hideMenuItems = (config, header, editMode) => {
  const localized = (item, string) => {
    let localString;
    const hass = document.querySelector('home-assistant').hass;
    if (string === 'raw_editor') localString = hass.localize('ui.panel.lovelace.editor.menu.raw_editor');else if (string == 'unused_entities') localString = hass.localize('ui.panel.lovelace.unused_entities.title');else localString = hass.localize(`ui.panel.lovelace.menu.${string}`);
    return item.innerHTML.includes(localString) || item.getAttribute('aria-label') == localString;
  };

  (!editMode ? header.options : document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('ha-panel-lovelace').shadowRoot.querySelector('hui-root').shadowRoot.querySelector('app-toolbar > paper-menu-button')).querySelector('paper-listbox').querySelectorAll('paper-item').forEach(item => {
    if (config.hide_help && localized(item, 'help') || config.hide_unused && localized(item, 'unused_entities') || config.hide_refresh && localized(item, 'refresh') || config.hide_config && localized(item, 'configure_ui') || config.hide_raw && localized(item, 'raw_editor')) {
      item.style.display = 'none';
    } else {
      item.style.display = '';
    }
  });
}; // Add button to overflow menu.

const buttonToOverflow = (item, mdiIcon, header, config) => {
  if (header.options.querySelector(`#${item.toLowerCase()}_dropdown`)) {
    header.options.querySelector(`#${item.toLowerCase()}_dropdown`).remove();
  }

  const paperItem = document.createElement('paper-item');
  const icon = document.createElement('ha-icon');
  paperItem.setAttribute('id', `${item.toLowerCase()}_dropdown`);
  icon.setAttribute('icon', config.button_icons[item.toLowerCase()] || mdiIcon);
  icon.style.pointerEvents = 'none';
  if (config.reverse_button_direction) icon.style.marginLeft = 'auto';else icon.style.marginRight = 'auto';
  paperItem.innerText = item;
  paperItem.appendChild(icon);
  paperItem.addEventListener('click', () => {
    header[item.toLowerCase()].click();
  });
  icon.addEventListener('click', () => {
    header[item.toLowerCase()].click();
  });
  header.options.querySelector('paper-listbox').appendChild(paperItem);
};

const showEditor = () => {
  window.scrollTo(0, 0);

  if (!root.querySelector('ha-app-layout editor')) {
    const container = document.createElement('editor');
    const nest = document.createElement('div');
    nest.style.cssText = `
      padding: 20px;
      max-width: 600px;
      margin: 15px auto;
      background: var(--paper-card-background-color);
      border: 6px solid var(--paper-card-background-color);
    `;
    container.style.cssText = `
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      position: absolute;
      background: var(--background-color, grey);
      z-index: 2;
      padding: 5px;
    `;
    root.querySelector('ha-app-layout').insertBefore(container, root.querySelector('#view'));
    container.appendChild(nest);
    nest.appendChild(document.createElement('custom-header-editor'));
  }
};

if (lovelace.mode === 'storage') {
  const chSettings = document.createElement('paper-item');
  chSettings.setAttribute('id', 'ch_settings');
  chSettings.addEventListener('click', () => showEditor());
  chSettings.innerHTML = 'Custom Header';
  const paperItems = header.options.querySelector('paper-listbox').querySelectorAll('paper-item');

  if (!header.options.querySelector('paper-listbox').querySelector(`#ch_settings`)) {
    header.options.querySelector('paper-listbox').insertBefore(chSettings, paperItems[paperItems.length]);
  }
}

const kioskMode = (sidebarOnly, headerOnly) => {
  if (window.location.href.includes('disable_ch')) return; // Kiosk mode styling.

  let style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');

  if (!headerOnly) {
    style.innerHTML += `
        #drawer {
          display: none;
        }
      `;
  }

  if (!sidebarOnly) {
    style.innerHTML += `
        ch-header {
          display: none;
        }
        app-header {
          display: none;
        }
        hui-view {
          padding-top: 100px;
        }
        hui-view, hui-panel-view {
          min-height: calc(100vh + 96px);
          margin-top: -96px;
          margin-bottom: -16px;
        }
      `;
  } // Add updated styles only if changed.


  const oldStyle = root.querySelector('#ch_header_style');

  if (!oldStyle || oldStyle.innerText != style.innerHTML) {
    root.appendChild(style);
    if (oldStyle) oldStyle.remove();
  }

  if (!headerOnly) {
    haElem.drawer.style.display = 'none'; // Style sidebar to close immediately and prevent opening.

    if (!haElem.sidebar.main.shadowRoot.querySelector('#ch_sidebar_style')) {
      style = document.createElement('style');
      style.setAttribute('id', 'ch_sidebar_style');
      style.innerHTML = ':host(:not([expanded])) {width: 0px !important;}';
      haElem.sidebar.main.shadowRoot.appendChild(style);
    }

    if (!haElem.main.shadowRoot.querySelector('#ch_sidebar_style')) {
      style = document.createElement('style');
      style.setAttribute('id', 'ch_sidebar_style');
      style.innerHTML = ':host {--app-drawer-width: 0px !important;}';
      haElem.main.shadowRoot.appendChild(style);
    }
  }

  window.dispatchEvent(new Event('resize'));
};
const removeKioskMode = () => {
  haElem.drawer.style.display = '';
  let style = haElem.main.shadowRoot.querySelector('#ch_sidebar_style');
  if (style) style.remove();
  style = haElem.sidebar.main.shadowRoot.querySelector('#ch_sidebar_style');
  if (style) style.remove();
  haElem.drawer.style.display = '';
};

const menuButtonObservers = (config, header) => {
  if (config.menu_hide) return; // Create Notification Dot

  const buildDot = () => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.cssText = `
        pointer-events: none;
        position: relative;
        background-color: ${config.notification_dot_color};
        width: 12px;
        height: 12px;
        top: -28px;
        right: ${config.reverse_button_direction ? '' : '-'}16px;
        border-radius: 50%;
    `;
    return dot;
  };

  const menuButtonVisibility = () => {
    if (config.disable_sidebar || window.customHeaderDisabled) return;
    if (haElem.menu.style.visibility === 'hidden') header.menu.style.display = 'none';else header.menu.style.display = 'initial';
  };

  const notificationDot = mutations => {
    const root = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('ha-panel-lovelace').shadowRoot.querySelector('hui-root');
    mutations.forEach(({
      addedNodes,
      removedNodes
    }) => {
      if (addedNodes) {
        for (const node of addedNodes) {
          if (node.className === 'dot' && !root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot')) {
            root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(buildDot());

            if (root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.buttonText')) {
              root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot').style.display = 'none';
              root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.buttonText').style.borderBottom = `3px solid ${window.customHeaderConfig.notification_dot_color}`;
            }
          }
        }
      }

      if (removedNodes) {
        for (const node of removedNodes) {
          if (node.className === 'dot' && root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot')) {
            root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot').remove();

            if (root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.buttonText')) {
              root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.buttonText').style.borderBottom = '';
            }
          }
        }
      }
    });
  };

  if (!window.customHeaderMenuObserver) {
    window.customHeaderMenuObserver = true;
    const notificationObserver = new MutationObserver(notificationDot);
    notificationObserver.observe(haElem.menu.shadowRoot, {
      childList: true
    });
    const menuButtonObserver = new MutationObserver(menuButtonVisibility);
    menuButtonObserver.observe(haElem.menu, {
      attributes: true,
      attributeFilter: ['style']
    });
  }

  menuButtonVisibility();
  const prevDot = header.menu.shadowRoot.querySelector('.dot');

  if (prevDot && prevDot.style.cssText != buildDot().style.cssText) {
    prevDot.remove();

    if (config.button_text.menu) {
      header.menu.shadowRoot.querySelector('.buttonText').style.textDecoration = '';
    }
  }

  if (!header.menu.shadowRoot.querySelector('.dot') && haElem.menu.shadowRoot.querySelector('.dot')) {
    header.menu.shadowRoot.appendChild(buildDot());

    if (config.button_text.menu) {
      header.menu.shadowRoot.querySelector('.dot').style.display = 'none';
      header.menu.shadowRoot.querySelector('.buttonText').style.borderBottom = `3px solid ${config.notification_dot_color}`;
    }
  }
};

const insertStyleTags = config => {
  let headerHeight = 48;

  if (!config.compact_mode) {
    if (config.reverse_button_direction) {
      header.container.querySelector('#contentContainer').dir = 'ltr';
      header.container.querySelector('#contentContainer').style.textAlign = 'right';
    } else {
      header.container.querySelector('#contentContainer').style.textAlign = '';
      header.container.querySelector('#contentContainer').dir = '';
    }

    header.container.querySelector('#contentContainer').innerHTML = config.header_text;
    headerHeight = header.tabs.length ? 96 : 48;
  } // Build header's main style.


  let style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');
  style.innerHTML = `
      ch-header {
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        display:flex;
        justify-content: center;
        font: 400 20px Roboto, sans-serif;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        margin-top: 4px;
        margin-bottom: 0px;
        margin-top: ${config.footer_mode ? '4px;' : '0px'};
        ${config.footer_mode ? 'position: sticky; bottom: 0px;' : 'position: sticky; top: 0px;'}
        ${config.header_css ? config.header_css : ''}
      }
      ch-stack {
        flex-direction: column;
        width: 100%;
        margin-left: 9px;
        margin-right: 9px;
        ${config.stack_css ? config.stack_css : ''}
      }
      #contentContainer {
        padding: 12px 6px 12px 6px;
        ${config.compact_mode ? 'display: none;' : ''}
        ${config.header_text.includes('<br>') ? `
          font-size: 17px;
          line-height: 1.2;
          margin: -9px 0px 0px;
        ` : ''}
        ${config.header_text_css ? config.header_text_css : ''}

      }
      app-header {
        display: none;
      }
      paper-tab.iron-selected {
        ${config.active_tab_color ? `color: ${config.active_tab_color};` : ''}
        ${config.active_tab_css ? config.active_tab_css : ''}
      }
      [buttonElem="menu"] {
        ${config.menu_color ? `color: ${config.menu_color};` : ''}
        ${config.menu_hide ? `display: none;` : ''}
        ${config.menu_css ? config.menu_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      [buttonElem="options"] {
        ${config.options_color ? `color: ${config.options_color};` : ''}
        ${config.options_hide ? `display: none;` : ''}
        ${config.options_css ? config.options_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      [buttonElem="voice"] {
        ${config.voice_color ? `color: ${config.voice_color};` : ''}
        ${config.voice_hide ? `display: none;` : ''}
        ${config.voice_css ? config.voice_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      paper-tab {
        ${config.all_tabs_color ? `color: ${config.all_tabs_color};` : ''}
        ${config.all_tabs_css ? config.all_tabs_css : ''}
      }
      paper-tabs {
        ${config.tab_indicator_color ? `--paper-tabs-selection-bar-color: ${config.tab_indicator_color} !important;` : ''}
        ${config.tab_container_css ? config.tab_container_css : ''}
      }
    `; // Add per tab coloring.

  if (config.tabs_color) {
    Object.keys(config.tabs_color).forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          color: ${config.tabs_color[tab]};
        }
      `;
    });
  } // Add per tab hiding.


  if (config.hide_tabs) {
    config.hide_tabs.forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          display: none;
        }
      `;
    });
  } // Add per tab custom css.


  if (config.tabs_css) {
    Object.keys(config.tabs_css).forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          ${config.tabs_css[tab]};
        }
      `;
    });
  } // Add updated style element and remove old one after.
  // This prevents elements "flashing" when styles change.


  let currentStyle = root.querySelector('#ch_header_style');
  root.appendChild(style);
  if (currentStyle) currentStyle.remove(); // Style views elements.

  style = document.createElement('style');
  style.setAttribute('id', 'ch_view_style');
  style.innerHTML = `
        hui-view, hui-panel-view {
          min-height: calc(100vh - 112px);
          margin-top: -96px;
          ${config.footer_mode ? `padding-bottom: ${headerHeight}px;` : ''}
          ${config.footer_mode ? `margin-bottom: -${headerHeight + 4}px;` : 'margin-bottom: -16px;'}
        }
        hui-panel-view {
          padding-top: 100px;
          ${config.panel_view_css ? config.panel_view_css : ''}
        }
        hui-view {
          padding-top: 100px;
          ${config.view_css ? config.view_css : ''}
        }
        #view {
          ${config.footer_mode ? `min-height: calc(100vh - ${headerHeight + 4}px) !important;` : ''}
          ${config.compact_mode && !config.footer_mode ? `min-height: calc(100vh - ${headerHeight + 16}px) !important;` : ''}
        }
      `; // Add updated view style if changed.
  // Prevents background images flashing on every change.

  currentStyle = root.querySelector('#ch_view_style');

  if (!currentStyle || style.innerHTML != currentStyle.innerHTML) {
    root.appendChild(style);
    if (currentStyle) currentStyle.remove();
  } // Hide cheverons completely when not visible.


  style = document.createElement('style');
  style.setAttribute('id', 'ch_chevron');
  style.innerHTML = `
      .not-visible[icon*="chevron"] {
        display:none;
      }
    `; // Add updated style element and remove old one after.

  currentStyle = header.tabContainer.shadowRoot.querySelector('#ch_chevron');
  header.tabContainer.shadowRoot.appendChild(style);
  if (currentStyle) currentStyle.remove();
  style = document.createElement('style');
  style.setAttribute('id', 'ch_animated');
  style.innerHTML = `
    ch-header, [buttonElem="menu"], [buttonElem="options"], [buttonElem="voice"] {
      transition: margin-top 0.4s ease-in-out;
      transition: top 0.4s ease-in-out;
    }
  `;
  setTimeout(() => {
    if (!root.querySelector('#ch_animated')) root.appendChild(style);
  }, 1000);
};

const redirects = (config, header) => {
  // Change link of "overview" item in sidebar to a visible tab or default tab.
  const overview = haElem.sidebar.listbox.querySelector('[data-panel="lovelace"]');

  if (config.hide_tabs.includes(0) && !config.default_tab) {
    for (const tab of header.tabs) {
      if (getComputedStyle(tab).display != 'none') {
        overview.setAttribute('href', `/lovelace/${header.tabContainer.indexOf(tab)}`);
        break;
      }
    }
  } else if (config.hide_tabs.includes(0)) {
    overview.setAttribute('href', `/lovelace/${tabIndexByName(config.default_tab)}`);
  } // Redirect off hidden tab to first not hidden tab or default tab.


  const defaultTab = config.default_tab != undefined ? tabIndexByName(config.default_tab) : null;

  if (config.hidden_tab_redirect && header.tabs.length) {
    const activeTab = header.tabContainer.indexOf(header.tabContainer.querySelector('paper-tab.iron-selected'));

    if (config.hide_tabs.includes(activeTab) && config.hide_tabs.length != header.tabs.length) {
      if (defaultTab && !config.hide_tabs.includes(tabIndexByName(defaultTab))) {
        if (getComputedStyle(header.tabs[defaultTab]).display != 'none') {
          header.tabs[defaultTab].click();
          overview.setAttribute('href', `/lovelace/${defaultTab}`);
        }
      } else {
        for (const tab of header.tabs) {
          if (getComputedStyle(tab).display != 'none') {
            tab.click();
            overview.setAttribute('href', `/lovelace/${header.tabContainer.indexOf(tab)}`);
            break;
          }
        }
      }
    }
  } // Click default tab on first open.


  if (defaultTab != null && !window.customHeaderDefaultClicked && header.tabs[defaultTab] && getComputedStyle(header.tabs[defaultTab]).display != 'none') {
    header.tabs[defaultTab].click();
  }

  window.customHeaderDefaultClicked = true;
};

const styleHeader = config => {
  window.customHeaderConfig = config;
  if (window.location.href.includes('disable_ch')) config.disabled_mode = true;
  if (config.kiosk_mode && !config.disabled_mode) kioskMode(false, false);

  if (config.disabled_mode) {
    window.customHeaderDisabled = true;
    removeKioskMode();
    if (header.container) header.container.style.visibility = 'hidden';
    if (root.querySelector('#ch_header_style')) root.querySelector('#ch_header_style').remove();
    if (root.querySelector('#ch_view_style')) root.querySelector('#ch_view_style').remove();

    if (header.tabContainer.shadowRoot.querySelector('#ch_chevron')) {
      header.tabContainer.shadowRoot.querySelector('#ch_chevron').remove();
    }

    header.menu.style.display = 'none';
    root.querySelector('ha-menu-button').style.display = '';
    haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
    window.dispatchEvent(new Event('resize'));
    return;
  } else {
    window.customHeaderDisabled = false;
    hideMenuItems(config, header, false);
    header.menu.style.display = '';
    if (header.container) header.container.style.visibility = 'visible';
  }

  if (!header.tabs.length) config.compact_mode = false;
  if (config.menu_dropdown && !config.disable_sidebar) buttonToOverflow('Menu', 'mdi:menu', header, config);else if (header.options.querySelector(`#menu_dropdown`)) header.options.querySelector(`#menu_dropdown`).remove();
  if (config.voice_dropdown) buttonToOverflow('Voice', 'mdi:microphone', header, config);else if (header.options.querySelector(`#voice_dropdown`)) header.options.querySelector(`#voice_dropdown`).remove(); // Style overflow menu depending on position.

  if (config.reverse_button_direction) {
    header.options.setAttribute('horizontal-align', 'left');
    header.options.querySelector('paper-listbox').setAttribute('dir', 'ltr');
  } else {
    header.options.setAttribute('horizontal-align', 'right');
    header.options.querySelector('paper-listbox').setAttribute('dir', 'rtl');
  }

  const style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');
  style.innerHTML = `
    .menu, paper-listbox {
      transition: height 0.1s ease-in-out 0s;
    }
    .divider {
      transition: margin-bottom 0.1s ease-in-out 0s;
    }
  `;
  haElem.sidebar.main.shadowRoot.appendChild(style); // Disable sidebar or style it to fit header's new sizing/placement.

  if (config.disable_sidebar) {
    kioskMode(true, false);
    insertStyleTags(config);
  } else if (config.hide_header) {
    insertStyleTags(config);
    kioskMode(false, true);
  } else if (!config.disable_sidebar && !config.kiosk_mode && !config.hide_header) {
    removeKioskMode();

    if (config.compact_mode && !config.footer_mode) {
      haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
      haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
      haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
    } else if (config.footer_mode) {
      haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
      haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
      haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
    } else {
      haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
      haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
      haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
    }

    insertStyleTags(config);
  } // Remove chevrons.


  if (!config.chevrons) header.tabContainer.hideScrollButtons = true;else header.tabContainer.hideScrollButtons = false; // Current tab indicator on top.

  if (config.indicator_top) header.tabContainer.alignBottom = true;else header.tabContainer.alignBottom = false; // Set/remove attributes for footer mode.

  if (config.footer_mode) header.options.setAttribute('vertical-align', 'bottom');else header.options.removeAttribute('vertical-align');
  if (!config.footer_mode) header.container.setAttribute('slot', 'header');else header.container.removeAttribute('slot'); // Tabs direction left to right or right to left.

  header.tabContainer.dir = config.reverse_tab_direction ? 'rtl' : 'ltr';
  header.container.dir = config.reverse_button_direction ? 'rtl' : 'ltr'; // Tab icon customization.

  if (config.tab_icons && header.tabs.length) {
    for (const tab in config.tab_icons) {
      const index = tabIndexByName(tab);
      const haIcon = header.tabs[index].querySelector('ha-icon');
      if (!config.tab_icons[tab]) haIcon.icon = lovelace.config.views[index].icon;else haIcon.icon = config.tab_icons[tab];
    }
  } // Button icon customization.


  if (config.button_icons) {
    for (const button in config.button_icons) {
      if (!header[button]) continue;

      if (!config.button_icons[button]) {
        if (button === 'menu') header.menu.icon = 'mdi:menu';else if (button === 'voice' && header.voice) header.voice.icon = 'mdi:microphone';else if (button === 'options') {
          header[button].querySelector('paper-icon-button').icon = 'mdi:dots-vertical';
        }
      } else {
        if (button === 'options') header[button].querySelector('paper-icon-button').icon = config.button_icons[button];else header[button].icon = config.button_icons[button];
      }
    }
  } // Button text customization


  if (config.button_text) {
    for (const button in config.button_text) {
      const text = document.createElement('p');
      text.className = 'buttonText';
      const buttonElem = button === 'options' ? header[button].querySelector('paper-icon-button') : header[button];

      if (!config.button_text[button] && buttonElem.shadowRoot.querySelector('.buttonText')) {
        buttonElem.shadowRoot.querySelector('.buttonText').remove();
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = '';
        buttonElem.style.width = '';
        continue;
      } else if (config.button_text[button]) {
        if (!buttonElem.shadowRoot.querySelector('.buttonText')) {
          text.innerHTML = config.button_text[button];
          buttonElem.shadowRoot.appendChild(text);
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').innerHTML = config.button_text[button];
        }

        buttonElem.shadowRoot.querySelector('.buttonText').dir = 'ltr';
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = 'none';
        buttonElem.style.width = 'auto';

        if (config.button_text[button].includes('<br>')) {
          buttonElem.shadowRoot.querySelector('.buttonText').style.fontSize = '17px';
          buttonElem.shadowRoot.querySelector('.buttonText').style.lineHeight = '1.2';
          buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '-5px 0px 0px 0px';
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '5.5px 0px 0px 0px';
        }
      }
    }
  }

  redirects(config, header);
  if (!header.tabs.length) header.tabContainer.style.display = 'none';
  menuButtonObservers(config, header);

  if (!window.customHeaderShrink) {
    window.addEventListener('scroll', function (e) {
      const compact_mode = window.getComputedStyle(header.container.querySelector('#contentContainer')).getPropertyValue('display') === 'none';
      const footer_mode = window.getComputedStyle(header.container).getPropertyValue('bottom') === '0px';

      if (footer_mode || compact_mode) {
        return;
      } else {
        if (window.scrollY > 48) {
          header.container.style.top = '-48px';
          header.menu.style.marginTop = '48px';
          if (header.voice) header.voice.style.marginTop = '48px';
          header.options.style.marginTop = '48px';
        } else {
          header.container.style.transition = '0s';
          header.menu.style.transition = '0s';
          if (header.voice) header.voice.style.transition = '0s';
          header.options.style.transition = '0s';
          header.container.style.top = `-${window.scrollY}px`;
          header.menu.style.marginTop = `${window.scrollY}px`;
          if (header.voice) header.voice.style.marginTop = `${window.scrollY}px`;
          header.options.style.marginTop = `${window.scrollY}px`;
        }

        header.container.style.transition = '';
      }
    });
  }

  A(header.container, 'iron-resize');
};

const buildConfig = config => {
  if (!config) config = { ...defaultConfig,
    ...lovelace.config.custom_header
  };
  config = { ...config,
    ...conditionalConfig(config)
  };
  const variables = config.template_variables;
  delete config.template_variables;

  const getBadTemplate = (result, error) => {
    const position = error.toString().match(/\d+/g)[0];
    const left = result.substr(0, position).match(/[^,]*$/);
    const right = result.substr(position).match(/^[^,]*/);
    return `${left ? left[0] : ''}${right ? right[0] : ''}`.replace('":"', ': "');
  };

  const processAndContinue = () => {
    if (config.hide_tabs) config.hide_tabs = processTabArray(config.hide_tabs);
    if (config.show_tabs) config.show_tabs = processTabArray(config.show_tabs);
    if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
    if (config.disable_sidebar || config.menu_dropdown) config.menu_hide = true;
    if (config.voice_dropdown) config.voice_hide = true;
    styleHeader(config);
  };

  const configString = JSON.stringify(config);
  const hasTemplates = !!variables || configString.includes('{{') || configString.includes('{%');
  let unsubRenderTemplate;

  if (hasTemplates) {
    unsubRenderTemplate = subscribeRenderTemplate(result => {
      if (window.customHeaderLastTemplateResult == result) return;
      window.customHeaderLastTemplateResult = result;

      try {
        config = JSON.parse(result.replace(/"true"/gi, 'true').replace(/"false"/gi, 'false').replace(/""/, ''));
      } catch (e) {
        templateFailed = true;
        let err = `[CUSTOM-HEADER] There was an issue with the template: ${getBadTemplate(result, e)}`;
        if (err.includes('locale')) err = '[CUSTOM-HEADER] There was an issue one of your "template_variables".';
        console.log(err);
      }

      processAndContinue();
    }, {
      template: JSON.stringify(variables).replace(/\\/g, '') + JSON.stringify(config).replace(/\\/g, '')
    }, config.locale);
  } else {
    processAndContinue();
  } // Catch less helpful template errors.


  let templateFailed = false;

  (async () => {
    try {
      const test = await unsubRenderTemplate;
    } catch (e) {
      templateFailed = true;
      console.log('[CUSTOM-HEADER] There was an error with one or more of your templates:');
      console.log(`${e.message.substring(0, e.message.indexOf(')'))})`);
    }
  })(); // Render templates every minute.


  if (hasTemplates) {
    window.setTimeout(() => {
      // Unsubscribe from template.
      if (templateFailed || root.querySelector('custom-header-editor')) return;

      (async () => {
        const unsub = await unsubRenderTemplate;
        unsubRenderTemplate = undefined;
        await unsub();
      })();

      buildConfig();
    }, (60 - new Date().getSeconds()) * 1000);
  }
};

const observers = () => {
  const callback = mutations => {
    const config = window.customHeaderConfig;
    mutations.forEach(({
      addedNodes,
      target
    }) => {
      if (target.id == 'view' && addedNodes.length && header.tabs.length) {
        // Navigating to new tab/view.
        const haActiveTabIndex = haElem.tabContainer.indexOf(root.querySelector('paper-tab.iron-selected'));
        const chActiveTabIndex = header.tabContainer.querySelector('paper-tab.iron-selected');

        if (chActiveTabIndex !== haActiveTabIndex) {
          header.tabContainer.setAttribute('selected', haActiveTabIndex);
        }
      } else if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        if (haElem.main.shadowRoot.querySelector(' ha-panel-lovelace')) {
          if (config.compact_mode && !config.footer_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
          } else if (config.footer_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
          }
        } else {
          haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
        }

        if (root.querySelector('editor')) root.querySelector('editor').remove();
        buildConfig();
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        if (root.querySelector('editor')) root.querySelector('editor').remove();
        if (!window.customHeaderDisabled) hideMenuItems(config, header, true);
        header.menu.style.display = 'none';
        root.querySelector('ch-header').style.display = 'none';
        haElem.appHeader.style.display = 'block';
        if (root.querySelector('#ch_view_style')) root.querySelector('#ch_view_style').remove();
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        haElem.menu = haElem.appHeader.querySelector('ha-menu-button');
        haElem.appHeader.style.display = 'none';
        header.menu.style.display = '';
        root.querySelector('ch-header').style.display = '';
        buildConfig();
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(haElem.partialPanelResolver, {
    childList: true
  });
  observer.observe(haElem.appHeader, {
    childList: true
  });
  observer.observe(root.querySelector('#view'), {
    childList: true
  });
};

buildConfig();
observers();
