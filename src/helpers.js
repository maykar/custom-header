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

export const processTabConfig = config => {
  // Convert to array if comma seperated string.
  const array = typeof config === 'string' ? config.replace(/\s+/g, '').split(',') : config;
  array.forEach(tab => {
    array[array.indexOf(tab)] = tabIndexByName(tab);
  });
  return array;
};

// Invert show_tabs to hide_tabs
export const invertNumArray = show_tabs => {
  const tabs = Array.from(root.querySelectorAll('paper-tab'));
  if (show_tabs && show_tabs.length) {
    const total_tabs = [];
    for (let i = 0; i < tabs.length; i += 1) {
      total_tabs.push(i);
    }
    return total_tabs.filter(el => !userConfig.show_tabs.includes(el));
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
