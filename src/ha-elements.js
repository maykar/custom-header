import { getLovelace } from 'custom-card-helpers';

export const hass = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').hass;

export const ha_elements = () => {
  const haElem = {};
  haElem.lovelace = getLovelace();
  haElem.homeAssistant = document.querySelector('home-assistant');
  haElem.main = haElem.homeAssistant.shadowRoot.querySelector('home-assistant-main').shadowRoot;
  haElem.hass = haElem.homeAssistant.hass;
  haElem.partialPanel = haElem.main.querySelector('partial-panel-resolver');
  haElem.panel = haElem.main.querySelector('ha-panel-lovelace');
  if (!haElem.panel) return;
  haElem.root = haElem.panel.shadowRoot.querySelector('hui-root');
  if (!haElem.root) return;
  haElem.root = haElem.root.shadowRoot;

  haElem.tabs = Array.from((haElem.root.querySelector('paper-tabs') || haElem.root).querySelectorAll('paper-tab'));
  haElem.tabContainer = haElem.root.querySelector('paper-tabs');
  haElem.menu = haElem.root.querySelector('ha-menu-button');
  haElem.options = haElem.root.querySelector('ha-button-menu, paper-menu-button');
  haElem.voice =
    haElem.root.querySelector('app-toolbar').querySelector('mwc-icon-button') ||
    haElem.root.querySelector('ha-start-voice-button') ||
    haElem.root.querySelector('paper-icon-button[icon="hass:microphone"]') ||
    haElem.root.querySelector('ha-icon-button[icon="hass:microphone"]');
  haElem.drawer = haElem.main.querySelector('#drawer');
  haElem.sidebar = {};
  haElem.sidebar.main = haElem.main.querySelector('ha-sidebar').shadowRoot;
  haElem.sidebar.menu = haElem.sidebar.main.querySelector('.menu');
  haElem.sidebar.listbox = haElem.sidebar.main.querySelector('paper-listbox');
  haElem.sidebar.divider = haElem.sidebar.main.querySelector('div.divider');
  haElem.appHeader = haElem.root.querySelector('app-header');
  haElem.appLayout = haElem.root.querySelector('ha-app-layout');
  return haElem;
};
