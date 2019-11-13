import { root, main } from './helpers';
import { header } from './build-header';
import { tabIndexByName } from './helpers';
import { kioskMode, removeKioskMode } from './kiosk-mode';

export const styleHeader = config => {
  let style = document.createElement('style');
  const sidebar = main.shadowRoot.querySelector('ha-sidebar');
  if (window.location.href.includes('disable_ch')) return;
  removeKioskMode();

  if (config.disable_sidebar) {
    kioskMode(true);
  } else {
    sidebar.shadowRoot.querySelector('.menu').style = 'height:49px;';
    sidebar.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 155px);';
    sidebar.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
  }

  let headerHeight = 50;
  if (!config.compact_mode) {
    header.container.querySelector('#contentContainer').innerHTML = config.header_text;
    headerHeight = header.tabs.length ? 100 : 50;
  }

  style.setAttribute('id', 'cch_header_style');
  style.innerHTML = `
      cch-header {
        width:100%;
        display:flex;
        justify-content: center;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        margin-top: 4px;
        margin-bottom: 0px;
        margin-top: ${config.footer ? '4px;' : '0px'};
        ${config.footer ? 'position: sticky; bottom: 0px;' : 'position: sticky; top: 0px;'}
      }
      cch-stack {
        flex-direction: column;
        width: 100%;
      }
      #contentContainer {
        padding: 12px 0px 12px 20px;
        color: var(--text-primary-color);
        font: 400 20px Roboto, sans-serif;
        ${config.compact_mode ? 'display: none;' : ''}
      }
      app-header {
        display: none;
      }
      hui-view, hui-panel-view {
        min-height: 100vh;
        padding-top: 0px;
        ${config.footer ? `padding-bottom: ${headerHeight}px;` : ''}
        ${config.footer ? `margin-bottom: -${headerHeight}px;` : ''}
      }
      hui-panel-view {
        ${config.footer ? '' : `padding-top: ${headerHeight}px;`}
      }
      #view {
        ${config.footer ? 'min-height: calc(100vh - 160px) !important;' : ''}
      }
      [buttonElem="menu"] {
        ${config.menu_color ? `color: ${config.menu_color};` : ''}
      }
      [buttonElem="options"] {
        ${config.options_color ? `color: ${config.options_color};` : ''}
      }
      [buttonElem="voice"] {
        ${config.voice_color ? `color: ${config.voice_color};` : ''}
      }
      paper-tabs {
        margin-left: 9px !important;
      }
      paper-tab {
        ${config.all_tabs_color ? `color: ${config.all_tabs_color};` : ''}
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

  let oldStyle = root.querySelector('#cch_header_style');
  root.appendChild(style);
  if (oldStyle) oldStyle.remove();

  // Hide cheverons completely when not visible.
  style = document.createElement('style');
  style.setAttribute('id', 'cch_chevron');
  style.innerHTML = `
      .not-visible[icon*="chevron"] {
        display:none;
      }
    `;
  oldStyle = header.tabContainer.shadowRoot.querySelector('#cch_chevron');
  header.tabContainer.shadowRoot.appendChild(style);
  if (oldStyle) oldStyle.remove();

  // Remove chevrons
  if (!config.chevrons) header.tabContainer.hideScrollButtons = true;
  else header.tabContainer.hideScrollButtons = false;

  // Current tab indicator on top
  if (config.indicator_top) header.tabContainer.alignBottom = true;
  else header.tabContainer.alignBottom = false;

  // Set/remove attributes for footer mode.
  if (config.footer) header.options.setAttribute('vertical-align', 'bottom');
  else header.options.removeAttribute('vertical-align');
  if (!config.footer) header.container.setAttribute('slot', 'header');
  else header.container.removeAttribute('slot');

  // Style menu button with sidebar changes/resizing.
  const menu = root.querySelector('ha-menu-button');
  const menuButtonVisibility = () => {
    menu.style.display = 'none';
    if (config.disable_sidebar) {
      header.menu.style.display = 'none';
      return;
    }
    if (menu.style.visibility === 'hidden') {
      header.menu.style.display = 'none';
      header.menu.style.visibility = 'hidden';
      header.menu.style.marginRight = '33px';
    } else {
      header.menu.style.visibility = 'initial';
      header.menu.style.marginRight = '';
      header.menu.style.display = 'initial';
    }
  };
  // Watch for menu button changes.
  new MutationObserver(() => {
    menuButtonVisibility();
  }).observe(menu, {
    attributes: true,
    attributeFilter: ['style'],
  });
  menuButtonVisibility();

  if (header.tabs.length) header.tabContainer.querySelector('paper-tab.iron-selected').click();
  else header.tabContainer.style.display = 'none';
  window.dispatchEvent(new Event('resize'));
};
