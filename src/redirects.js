import { tabIndexByName } from './helpers';
import { haElem } from './ha-elements';

export const redirects = (config, header) => {
  // Change link of "overview" item in sidebar to a visible tab or default tab.
  const overview = haElem.sidebar.listbox.querySelector('[data-panel="lovelace"]');
  if (config.hide_tabs.includes(0) && !config.default_tab) {
    for (const tab of header.tabs) {
      if (getComputedStyle(tab).display != 'none') {
        overview.setAttribute('href', `/lovelace/${header.tabContainer.indexOf(tab)}`);
        break;
      }
    }
  } else if (config.default_tab) {
    overview.setAttribute('href', `/lovelace/${tabIndexByName(config.default_tab)}`);
  }

  // Redirect off hidden tab to first not hidden tab or default tab.
  const defaultTab = config.default_tab != undefined ? tabIndexByName(config.default_tab) : null;

  if (config.hidden_tab_redirect && haElem.tabs.length) {
    const activeTab = haElem.tabContainer.indexOf(haElem.tabContainer.querySelector('paper-tab.iron-selected'));
    if (config.hide_tabs.includes(activeTab) && config.hide_tabs.length != haElem.tabs.length) {
      if (defaultTab && !config.hide_tabs.includes(tabIndexByName(defaultTab))) {
        if (getComputedStyle(header.tabs[defaultTab]).display != 'none') {
          haElem.tabs[defaultTab].click();
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
  }

  let reloaded;
  if (window.performance) reloaded = performance.navigation.type == 0;
  else reloaded = performance.getEntriesByType('navigation')[0].type == 'reload';

  // Click default tab on first open.
  if (
    !reloaded &&
    defaultTab != null &&
    !window.customHeaderDefaultClicked &&
    header.tabs[defaultTab] &&
    getComputedStyle(header.tabs[defaultTab]).display != 'none'
  ) {
    header.tabs[defaultTab].click();
  }
  window.customHeaderDefaultClicked = true;
};
