import { root, main, lovelace } from './helpers';
import { header } from './build-header';
import { tabIndexByName } from './helpers';
import { kioskMode, removeKioskMode } from './kiosk-mode';
import { sidebarMod } from './sidebar-mod';

export const styleHeader = config => {
  if (window.location.href.includes('disable_ch')) return;
  const sidebar = main.shadowRoot.querySelector('ha-sidebar');

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
    sidebar.shadowRoot.querySelector('.menu').style = '';
    sidebar.shadowRoot.querySelector('paper-listbox').style = '';
    sidebar.shadowRoot.querySelector('div.divider').style = '';
    window.dispatchEvent(new Event('resize'));
    return;
  } else {
    window.customHeaderDisabled = false;
    header.menu.style.display = '';
    if (header.container) header.container.style.visibility = 'visible';
  }

  // No need to compact header if there is only one view.
  if (!header.tabs.length) config.compact_mode = false;

  // Disable sidebar or style it to fit header's new sizing/placement.
  if (config.disable_sidebar) {
    kioskMode(true);
  } else if (!config.disable_sidebar && !config.kiosk_mode) {
    removeKioskMode();
    sidebar.shadowRoot.querySelector('.menu').style = 'height:49px;';
    sidebar.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 155px);';
    sidebar.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
  }

  // Get header height.
  let headerHeight = 48;
  if (!config.compact_mode) {
    header.container.querySelector('#contentContainer').innerHTML = config.header_text;
    headerHeight = header.tabs.length ? 96 : 48;
  }

  // Main header styling.
  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML = `
      cch-header {
        width:100%;
        display:flex;
        justify-content: center;
        font: 400 20px Roboto, sans-serif;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        margin-top: 4px;
        margin-bottom: 0px;
        margin-top: ${config.footer_mode ? '4px;' : '0px'};
        ${config.footer_mode ? 'position: sticky; bottom: 0px;' : 'position: sticky; top: 0px;'}
      }
      cch-stack {
        flex-direction: column;
        width: 100%;
        margin-left: 9px;
        margin-right: 9px;
      }
      #contentContainer {
        padding: 12px 6px 12px 6px;
        color: var(--text-primary-color);
        ${config.compact_mode ? 'display: none;' : ''}
      }
      app-header {
        display: none;
      }
      .iron-selected {
        ${config.active_tab_color ? `color: ${config.active_tab_color};` : ''}
      }
      [buttonElem="menu"] {
        ${config.menu_color ? `color: ${config.menu_color};` : ''}
        ${config.menu_hide ? `display: none;` : ''}
      }
      [buttonElem="options"] {
        ${config.options_color ? `color: ${config.options_color};` : ''}
        ${config.options_hide ? `display: none;` : ''}
      }
      [buttonElem="voice"] {
        ${config.voice_color ? `color: ${config.voice_color};` : ''}
        ${config.voice_hide ? `display: none;` : ''}
      }
      paper-tab {
        ${config.all_tabs_color ? `color: ${config.all_tabs_color};` : ''}
      }
      paper-tabs {
        ${config.indicator_color ? `--paper-tabs-selection-bar-color: ${config.indicator_color} !important;` : ''}
      }
    `;

  // Per tab coloring.
  if (config.tabs_color) {
    Object.keys(config.tabs_color).forEach(tab => {
      style.innerHTML += `
      paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
        color: ${config.tabs_color[tab]};
      }
    `;
    });
  }

  // Per tab hiding.
  if (config.hide_tabs) {
    config.hide_tabs.forEach(tab => {
      style.innerHTML += `
      paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
        display: none;
      }
    `;
    });
  }

  // Add updated style elements and remove old ones after.
  let currentStyle = root.querySelector('#cch_header_style');
  root.appendChild(style);
  if (currentStyle) currentStyle.remove();

  // Style views elements.
  style = document.createElement('style');
  style.setAttribute('id', 'cch_view_style');
  style.innerHTML = `
        hui-view, hui-panel-view {
          min-height: calc(100vh - ${headerHeight}px);
          padding-top: 2px;
          ${config.footer_mode ? `padding-bottom: ${headerHeight}px;` : ''}
          ${config.footer_mode ? `margin-bottom: -${headerHeight + 4}px;` : ''}
        }
        hui-panel-view {
          padding-top: 0px;
        }
        #view {
          ${config.footer_mode ? `min-height: calc(100vh - ${headerHeight + 4}px) !important;` : ''}
        }
      `;

  // Add updated view style if changed.
  currentStyle = root.querySelector('#cch_view_style');
  if (!currentStyle || style.innerHTML != currentStyle.innerHTML) {
    root.appendChild(style);
    if (currentStyle) currentStyle.remove();
  }

  // Hide cheverons completely when not visible.
  style = document.createElement('style');
  style.setAttribute('id', 'cch_chevron');
  style.innerHTML = `
      .not-visible[icon*="chevron"] {
        display:none;
      }
    `;
  currentStyle = header.tabContainer.shadowRoot.querySelector('#cch_chevron');
  header.tabContainer.shadowRoot.appendChild(style);
  if (currentStyle) currentStyle.remove();

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
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = 'none';
        buttonElem.style.width = 'auto';
        buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '5.5px 0px 0px 0px';
      }
    }
  }

  sidebarMod(config, header);

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

  if (header.tabs.length && root.querySelector('paper-tab.iron-selected')) {
    // Click active tab to refresh indicator.
    header.tabs[root.querySelector('paper-tabs').indexOf(root.querySelector('paper-tab.iron-selected'))].click();
  } else {
    // Hide tabcontainer if there's only one view.
    header.tabContainer.style.display = 'none';
  }

  window.dispatchEvent(new Event('resize'));
};
