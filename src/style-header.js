import { header } from './build-header';
import { tabIndexByName, buttonToOverflow } from './helpers';
import { hideMenuItems } from './overflow-menu';
import { kioskMode, removeKioskMode } from './kiosk-mode';
import { menuButtonObservers } from './menu-observers';
import { insertStyleTags } from './style-tags';
import { haElem, root, lovelace } from './ha-elements';

export const styleHeader = config => {
  if (window.location.href.includes('disable_ch')) config.disabled_mode = true;
  window.customHeaderConfig = config;

  if (config.disabled_mode) {
    window.customHeaderDisabled = true;
    removeKioskMode();
    if (header.container) header.container.style.visibility = 'hidden';
    if (root.querySelector('#cch_header_style')) root.querySelector('#cch_header_style').remove();
    if (root.querySelector('#cch_view_style')) root.querySelector('#cch_view_style').remove();
    if (header.tabContainer.shadowRoot.querySelector('#cch_chevron')) {
      header.tabContainer.shadowRoot.querySelector('#cch_chevron').remove();
    }
    header.menu.style.display = 'none';
    root.querySelector('ha-menu-button').style.display = '';
    haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
    window.dispatchEvent(new Event('resize'));
    return;
  } else {
    window.customHeaderDisabled = false;
    hideMenuItems(config, header, false);
    header.menu.style.display = '';
    if (header.container) header.container.style.visibility = 'visible';
  }

  if (!header.tabs.length) config.compact_mode = false;

  if (config.menu_dropdown) buttonToOverflow('Menu', 'mdi:menu', header);
  else if (header.options.querySelector(`#menu_dropdown`)) header.options.querySelector(`#menu_dropdown`).remove();
  if (config.voice_dropdown) buttonToOverflow('Voice', 'mdi:microphone', header);
  else if (header.options.querySelector(`#voice_dropdown`)) header.options.querySelector(`#voice_dropdown`).remove();

  // Disable sidebar or style it to fit header's new sizing/placement.
  if (config.disable_sidebar) {
    kioskMode(true);
  } else if (!config.disable_sidebar && !config.kiosk_mode) {
    removeKioskMode();
    haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
    haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 155px);';
    haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
  }

  insertStyleTags(config);

  // Remove chevrons.
  if (!config.chevrons) header.tabContainer.hideScrollButtons = true;
  else header.tabContainer.hideScrollButtons = false;

  // Current tab indicator on top.
  if (config.indicator_top) header.tabContainer.alignBottom = true;
  else header.tabContainer.alignBottom = false;

  // Set/remove attributes for footer mode.
  if (config.footer_mode) header.options.setAttribute('vertical-align', 'bottom');
  else header.options.removeAttribute('vertical-align');
  if (!config.footer_mode) header.container.setAttribute('slot', 'header');
  else header.container.removeAttribute('slot');

  // Tabs direction left to right or right to left.
  header.tabContainer.dir = config.tab_direction;
  header.container.dir = config.button_direction;

  // Tab icon customization.
  if (config.tab_icons) {
    for (const tab in config.tab_icons) {
      const index = tabIndexByName(tab);
      const haIcon = header.tabs[index].querySelector('ha-icon');
      if (!config.tab_icons[tab]) haIcon.icon = lovelace.config.views[index].icon;
      else haIcon.icon = config.tab_icons[tab];
    }
  }

  // Button icon customization.
  if (config.button_icons) {
    for (const button in config.button_icons) {
      if (!config.button_icons[button]) {
        if (button === 'menu') header.menu.icon = 'mdi:menu';
        else if (button === 'voice') header.voice.icon = 'mdi:microphone';
        else if (button === 'options') header[button].querySelector('paper-icon-button').icon = 'mdi:dots-vertical';
      } else {
        if (button === 'options') header[button].querySelector('paper-icon-button').icon = config.button_icons[button];
        else header[button].icon = config.button_icons[button];
      }
    }
  }

  // Button text customization
  if (config.button_text) {
    for (const button in config.button_text) {
      const text = document.createElement('p');
      text.className = 'buttonText';
      const buttonElem = button === 'options' ? header[button].querySelector('paper-icon-button') : header[button];
      if (!config.button_text[button] && buttonElem.shadowRoot.querySelector('.buttonText')) {
        buttonElem.shadowRoot.querySelector('.buttonText').remove();
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = '';
        buttonElem.style.width = '';
        continue;
      } else if (config.button_text[button]) {
        if (!buttonElem.shadowRoot.querySelector('.buttonText')) {
          text.innerText = config.button_text[button];
          buttonElem.shadowRoot.appendChild(text);
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').innerText = config.button_text[button];
        }
        if (config.button_direction == 'rtl') {
          buttonElem.shadowRoot.querySelector('.buttonText').dir = 'ltr';
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').dir = '';
        }
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = 'none';
        buttonElem.style.width = 'auto';
        buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '5.5px 0px 0px 0px';
      }
    }
  }

  // Redirect off hidden tab to first not hidden tab or default tab.
  const defaultTab = config.default_tab != undefined ? tabIndexByName(config.default_tab) : null;
  if (config.hidden_tab_redirect && header.tabs.length) {
    const activeTab = header.tabContainer.indexOf(header.tabContainer.querySelector('paper-tab.iron-selected'));
    if (config.hide_tabs.includes(activeTab) && config.hide_tabs.length != header.tabs.length) {
      if (defaultTab && !config.hide_tabs.includes(tabIndexByName(defaultTab))) {
        if (getComputedStyle(header.tabs[defaultTab]).display != 'none') header.tabs[defaultTab].click();
      } else {
        for (const tab of header.tabs) {
          if (getComputedStyle(tab).display != 'none') {
            tab.click();
            break;
          }
        }
      }
    }
  }

  // Click default tab on first open.
  if (
    defaultTab != null &&
    !window.customHeaderDefaultClicked &&
    header.tabs[defaultTab] &&
    getComputedStyle(header.tabs[defaultTab]).display != 'none'
  ) {
    header.tabs[defaultTab].click();
  }
  window.customHeaderDefaultClicked = true;

  if (header.tabs.length && haElem.activeTab) {
    // Click active tab to refresh indicator.
    header.tabs[haElem.tabs.indexOf(haElem.activeTab)].click();
  } else {
    // Hide tabcontainer if there's only one view.
    header.tabContainer.style.display = 'none';
  }

  menuButtonObservers(config, header, root);

  window.dispatchEvent(new Event('resize'));
};
