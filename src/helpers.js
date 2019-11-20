import { defaultVariables } from './template-variables';
import { haElem, lovelace, hass } from './ha-elements';

// Get tab index number from view's title or path
export const tabIndexByName = tab => {
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
    for (let i = 0; i < haElem.tabs.length; i += 1) total_tabs.push(i);
    return total_tabs.filter(el => !show_tabs.includes(el));
  }
};

// Subscribe and render Jinja templates.
export const subscribeRenderTemplate = (onChange, params) => {
  const conn = hass.connection;
  const variables = {
    user: hass.user.name,
    browser: navigator.userAgent,
    ...params.variables,
    ...defaultVariables(),
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

// Add button to overflow menu.
export const buttonToOverflow = (item, mdiIcon, header) => {
  if (!header.options.querySelector(`#${item.toLowerCase()}_dropdown`)) {
    const paperItem = document.createElement('paper-item');
    const icon = document.createElement('ha-icon');
    paperItem.setAttribute('id', `${item.toLowerCase()}_dropdown`);
    icon.setAttribute('icon', mdiIcon);
    icon.style.pointerEvents = 'none';
    icon.style.marginLeft = 'auto';
    paperItem.innerText = item;
    paperItem.appendChild(icon);
    paperItem.addEventListener('click', () => {
      header[item.toLowerCase()].click();
    });
    icon.addEventListener('click', () => {
      header[item.toLowerCase()].click();
    });
    header.options.querySelector('paper-listbox').appendChild(paperItem);
  }
};
