import { ha_elements } from './ha-elements';
import { tabIndexByName } from './helpers';
import { deviceID } from './template-variables';
import { processTabArray } from './helpers';

export const conditionalConfig = config => {
  const hass = ha_elements().hass;
  let lovelace = document
    .querySelector('body > home-assistant')
    .shadowRoot.querySelector('home-assistant-main')
    .shadowRoot.querySelector('app-drawer-layout > partial-panel-resolver > ha-panel-lovelace').lovelace;
  const counter = (conditions, cond, count) => {
    const userVars = {
      user: hass.user.name,
      user_agent: navigator.userAgent,
      device_id: deviceID,
    };
    if (cond == 'user' && conditions[cond].includes(',')) {
      conditions[cond].split(/,+/).forEach(user => {
        if (userVars[cond] == user.trim() || user == hass.user.id) count++;
      });
    } else if (cond == 'tab' && (conditions[cond].includes(',') || conditions[cond].includes('to'))) {
      const tabs = processTabArray(conditions[cond]);
      if (lovelace && tabs.includes(lovelace.current_view)) {
        count++;
      }
    } else if (
      (userVars[cond] && userVars[cond] == conditions[cond]) ||
      (cond == 'query_string' && window.location.search.includes(conditions[cond])) ||
      (cond == 'user_agent' && userVars[cond].includes(conditions[cond])) ||
      (cond == 'media_query' && window.matchMedia(conditions[cond]).matches) ||
      (cond == 'user' && conditions[cond] == hass.user.id) ||
      (cond == 'is_admin' && conditions[cond] == hass.user.is_admin) ||
      (cond == 'is_owner' && conditions[cond] == hass.user.is_owner) ||
      (cond == 'template' && conditions[cond]) ||
      (lovelace && cond == 'tab' && tabIndexByName(conditions[cond], lovelace) == lovelace.current_view)
    ) {
      count++;
    }
    return count;
  };

  const countMatches = conditions => {
    let count = 0;
    for (const cond in conditions) {
      if (cond == 'or_conditions') {
        for (const orCond in conditions['or_conditions']) {
          count = counter(
            conditions['or_conditions'][orCond],
            Object.keys(conditions['or_conditions'][orCond])[0],
            count,
          );
        }
      } else {
        count = counter(conditions, cond, count);
      }
    }
    return count;
  };

  let exceptionConfig = {};
  let highestMatch = 0;
  // Count number of matching conditions and choose config with most matches.
  if (config.exceptions) {
    config.exceptions.forEach(exception => {
      const matches = countMatches(exception.conditions);
      if (matches > highestMatch) {
        highestMatch = matches;
        exceptionConfig = exception.config;
      }
    });
  }

  if (
    exceptionConfig &&
    exceptionConfig.default_tab &&
    (exceptionConfig.default_tab == null || exceptionConfig.default_tab == 'null')
  ) {
    config.default_tab = [];
  }

  // If exception config uses hide_tabs and main config uses show_tabs,
  // delete show_tabs and vice versa.
  if (exceptionConfig) {
    if (
      typeof exceptionConfig.hide_tabs != 'undefined' &&
      config.show_tabs &&
      exceptionConfig.hide_tabs.length &&
      config.show_tabs.length
    ) {
      delete config.show_tabs;
    } else if (
      exceptionConfig.show_tabs &&
      config.hide_tabs &&
      exceptionConfig.show_tabs.length &&
      config.hide_tabs.length
    ) {
      delete config.hide_tabs;
    }
  }
  return { ...config, ...exceptionConfig };
};
