export const insertStyleTags = (config, root, header, tabIndexByName) => {
  let headerHeight = 48;
  if (!config.compact_mode) {
    if (config.button_direction == 'rtl') {
      header.container.querySelector('#contentContainer').dir = 'ltr';
      header.container.querySelector('#contentContainer').style.textAlign = 'right';
    } else {
      header.container.querySelector('#contentContainer').style.textAlign = '';
      header.container.querySelector('#contentContainer').dir = '';
    }
    header.container.querySelector('#contentContainer').innerHTML = config.header_text;
    headerHeight = header.tabs.length ? 96 : 48;
  }

  // Main header styling.
  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML = `
      cch-header {
        padding-left: 10px;
        padding-right: 10px;
        width: calc(100% - 20px);
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
      paper-tab.iron-selected {
        ${config.active_tab_color ? `color: ${config.active_tab_color};` : ''}
      }
      paper-listbox {
        position: fixed;
        width: fit-content;
        ${config.button_direction == 'rtl' ? 'left: 0' : 'right: 0'};
        ${config.footer_mode ? 'bottom: 0' : 'top: 0'};
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
};
