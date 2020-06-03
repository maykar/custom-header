import { tabIndexByName } from './helpers';
import { ha_elements } from './ha-elements';

export const redirects = (config, ch) => {
  // Change link of "overview" item in sidebar to a visible tab or default tab.
  if (window.customHeaderDisabled) return;
  const haElem = ha_elements();
  if (!haElem) return;
  const headerType = !config.compact_mode ? ch.footer : ch.header;
  const overview = haElem.sidebar.listbox.querySelector('[data-panel="lovelace"]');
  if (overview) {
    if (config.hide_tabs.includes(0) && !config.default_tab) {
      for (const tab of headerType.tabs) {
        if (getComputedStyle(tab).display != 'none') {
          overview.setAttribute('href', `/lovelace/${headerType.tabContainer.indexOf(tab)}`);
          break;
        }
      }
    } else if (config.default_tab) {
      overview.setAttribute('href', `/lovelace/${tabIndexByName(config.default_tab)}`);
    }
  }

  // Redirect off hidden tab to first not hidden tab or default tab.
  const defaultTab = config.default_tab != undefined ? tabIndexByName(config.default_tab) : null;

  if (config.hidden_tab_redirect && haElem.tabs.length) {
    const activeTab = haElem.tabContainer.indexOf(haElem.tabContainer.querySelector('paper-tab.iron-selected'));
    if (config.hide_tabs.includes(activeTab) && config.hide_tabs.length != haElem.tabs.length) {
      if (defaultTab && !config.hide_tabs.includes(tabIndexByName(defaultTab))) {
        if (getComputedStyle(headerType.tabs[defaultTab]).display != 'none') {
          haElem.tabs[defaultTab].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
          if (overview) overview.setAttribute('href', `/lovelace/${defaultTab}`);
        }
      } else {
        for (const tab of headerType.tabs) {
          if (getComputedStyle(tab).display != 'none') {
            tab.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
            if (overview) overview.setAttribute('href', `/lovelace/${headerType.tabContainer.indexOf(tab)}`);
            break;
          }
        }
      }
    }
  }

  let reloaded;
  if (!config.default_tab_on_refresh && window.performance) {
    reloaded = performance.navigation.type == 0;
  } else if (!config.default_tab_on_refresh && performance.getEntriesByType('navigation')) {
    reloaded = performance.getEntriesByType('navigation')[0].type == 'reload';
  } else {
    reloaded = false;
  }

  // Click default tab on first open.
  if (!reloaded && defaultTab != null && !window.customHeaderDefaultClicked && haElem.tabs[defaultTab]) {
    haElem.tabs[defaultTab].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
    window.customHeaderDefaultClicked = true;
  }
};
