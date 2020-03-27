import { defaultVariables } from './template-variables';
import { getLovelace } from 'custom-card-helpers';
import { ha_elements } from './ha-elements';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) && depth - 1 ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  },
});

export const tapOrClick = (listenElement, clickElement) => {
  listenElement.addEventListener('click', () => {
    clickElement.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
  });
  listenElement.addEventListener('tap', () => {
    clickElement.dispatchEvent(new MouseEvent('tap', { bubbles: false, cancelable: false }));
  });
};

// Get tab index number from view's title or path
export const tabIndexByName = tab => {
  const lovelace = getLovelace();
  if (!lovelace) return;
  let index;
  const { views } = lovelace.config;
  if (isNaN(tab)) {
    views.forEach(view => {
      if (view.title === tab || view.path === tab) index = views.indexOf(view);
    });
  } else {
    index = parseInt(tab, 10);
  }
  return index;
};

// Invert show_tabs to hide_tabs
export const invertNumArray = show_tabs => {
  if (show_tabs && show_tabs.length) {
    const total_tabs = [];
    for (let i = 0; i < ha_elements().tabs.length; i += 1) total_tabs.push(i);
    return total_tabs.filter(el => !show_tabs.includes(el));
  }
};

// Subscribe and render Jinja templates.
export const subscribeRenderTemplate = (onChange, params, locale) => {
  const hass = ha_elements().hass;
  const conn = hass.connection;
  const variables = {
    user: hass.user.name,
    browser: navigator.userAgent,
    ...params.variables,
    ...defaultVariables(locale),
  };
  const template = params.template;
  const entity_ids = params.entity_ids;

  return conn.subscribeMessage(msg => onChange(msg.result), {
    type: 'render_template',
    template,
    variables,
    entity_ids,
  });
};

// Builds range from single range string "5 to 9" and returns array [5,6,7,8,9].
export const buildRange = string => {
  const ranges = [];
  const range = (start, end) => new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
  if (string.includes('to')) {
    const split = string.split('to');
    if (parseInt(split[1]) > parseInt(split[0])) ranges.push(range(parseInt(split[0]), parseInt(split[1])));
    else ranges.push(range(parseInt(split[1]), parseInt(split[0])));
  }
  return ranges.flat();
};

// Takes in array of tab names/paths, numbers, and ranges.
// Builds array of tab indexes with the results.
export const processTabArray = array => {
  let ranges = [];
  const sortNumber = (a, b) => a - b;
  array = typeof array === 'string' ? array.replace(/\s+/g, '').split(',') : array;
  for (const i in array) {
    if (typeof array[i] == 'string' && array[i].includes('to')) {
      const rangeTest = array[i].replace(/ /g, '').split('to');
      if (!(rangeTest[0].match(/[a-z]/g) || rangeTest[1].match(/[a-z]/g))) ranges.push(buildRange(array[i]));
      else ranges.push(array[i]);
    } else {
      ranges.push(array[i]);
    }
  }
  ranges = ranges.flat();
  for (const i in ranges) {
    if (isNaN(ranges[i])) ranges[i] = tabIndexByName(ranges[i]);
    else ranges[i] = parseInt(ranges[i]);
  }
  return ranges.sort(sortNumber);
};
