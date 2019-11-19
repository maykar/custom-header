import { getLovelace, getRoot } from 'custom-card-helpers';

export const hass = document.body.querySelector('home-assistant').hass;
export const lovelace = getLovelace();
export const root = getRoot();
export const haElem = {};

haElem.main = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main');
haElem.tabs = Array.from((root.querySelector('paper-tabs') || root).querySelectorAll('paper-tab'));
haElem.activeTab = root.querySelector('paper-tab.iron-selected');
haElem.menu = root.querySelector('ha-menu-button');
haElem.menuDot = haElem.menu.shadowRoot.querySelector('.dot');
haElem.options = root.querySelector('paper-menu-button');
haElem.voice = root.querySelector('ha-start-voice-button') || root.querySelector('[icon="hass:microphone"]');
haElem.drawer = haElem.main.shadowRoot.querySelector('#drawer');
haElem.sidebar = {};
haElem.sidebar.main = haElem.main.shadowRoot.querySelector('ha-sidebar');
haElem.sidebar.menu = haElem.sidebar.main.shadowRoot.querySelector('.menu');
haElem.sidebar.listbox = haElem.sidebar.main.shadowRoot.querySelector('paper-listbox');
haElem.sidebar.divider = haElem.sidebar.main.shadowRoot.querySelector('div.divider');
haElem.appHeader = root.querySelector('app-header');
haElem.appLayout = root.querySelector('ha-app-layout');
haElem.partialPanelResolver = haElem.main.shadowRoot.querySelector('partial-panel-resolver');
