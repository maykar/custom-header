import { root } from './helpers';
import { header } from './build-header';
import { tabIndexByName } from './helpers';
import { removeKioskMode } from './kiosk-mode';

export const styleHeader = config => {
  if (window.location.href.includes('disable_ch')) return;
  removeKioskMode();

  let headerHeight = 50;
  if (!config.compact_mode) {
    header.container.querySelector('#contentContainer').innerHTML = config.header_text;
    headerHeight = 98;
  }

  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML = `
      cch-header {
        width:100%;
        display:flex;
        justify-content: center;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        ${header.tabs.length === 0 ? `margin-top: ${headerHeight}px;` : ''}
        ${config.footer ? 'position: sticky; bottom: 0px;' : ''}
      }
      cch-stack {
        flex-direction: column;
        width: 100%;
      }
      #contentContainer {
        padding: 12px 0px 12px 7px;
        color: var(--text-primary-color);
        font: 400 20px Roboto, sans-serif;
        ${config.compact_mode ? 'display: none;' : ''}
      }
      app-header {
        display: none;
      }
      hui-view, hui-panel-view {
        min-height: 100vh;
        padding-top: ${config.footer ? '0px;' : `${headerHeight}px;`}
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
        margin-left: 7px !important;
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
    if (menu.style.visibility === 'hidden') {
      if (config.footer) header.menu.style.display = 'none';
      else header.menu.style.display = 'initial';
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

  header.tabContainer.querySelector('paper-tab.iron-selected').click();
  window.dispatchEvent(new Event('resize'));
};
