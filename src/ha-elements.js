import { getLovelace, getRoot } from 'custom-card-helpers';

export const homeAssistant = document.querySelector('home-assistant');
export const hass = homeAssistant.hass;
export const lovelace = getLovelace();
export const root = getRoot();
export const haElem = {};

haElem.main = homeAssistant.shadowRoot.querySelector('home-assistant-main');
haElem.tabs = Array.from((root.querySelector('paper-tabs') || root).querySelectorAll('paper-tab'));
haElem.tabContainer = root.querySelector('paper-tabs');
haElem.activeTab = root.querySelector('paper-tab.iron-selected');
haElem.menu = root.querySelector('ha-menu-button');
haElem.options = root.querySelector('paper-menu-button');
haElem.voice =
  root.querySelector('ha-start-voice-button') || root.querySelector('paper-icon-button[icon="hass:microphone"]');
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
  if (item == 'activeTab' || 'voice') {
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
  console.log(
    `[CUSTOM HEADER] The following HA element${missing.length > 1 ? 's' : ''} could not be found: ${missing.join(
      ', ',
    )}`,
  );
}
