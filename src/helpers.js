import { getLovelace, getRoot } from 'custom-card-helpers';

export const main = document.querySelector('body > home-assistant').shadowRoot.querySelector('home-assistant-main');
export const lovelace = getLovelace();
export const root = getRoot();

export const tabIndexByName = tab => {
  let index;
  const { views } = lovelace.config;
  if (isNaN(tab)) {
    views.forEach(view => {
      if (view.title === tab || view.path === tab) {
        index = views.indexOf(view);
      }
    });
  } else {
    index = parseInt(tab, 10);
  }
  return index;
};

// Invert show_tabs to hide_tabs
export const invertNumArray = show_tabs => {
  const tabs = Array.from(root.querySelectorAll('paper-tab'));
  if (show_tabs && show_tabs.length) {
    const total_tabs = [];
    for (let i = 0; i < tabs.length; i += 1) {
      total_tabs.push(i);
    }
    return total_tabs.filter(el => !show_tabs.includes(el));
  }
};

export const subscribeRenderTemplate = (onChange, params) => {
  const conn = document.body.querySelector('home-assistant').hass.connection;
  const variables = {
    user: document.body.querySelector('home-assistant').hass.user.name,
    browser: navigator.userAgent,
    hash: location.hash.substr(1) || ' ',
    ...params.variables,
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
    if (typeof array[i] == 'string' && array[i].includes('to')) ranges.push(buildRange(array[i]));
    else ranges.push(array[i]);
  }
  ranges = ranges.flat();
  for (const i in ranges) {
    if (isNaN(ranges[i])) ranges[i] = tabIndexByName(ranges[i]);
    else ranges[i] = parseInt(ranges[i]);
  }
  return ranges.sort(sortNumber);
};
