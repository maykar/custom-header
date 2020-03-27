import { tabIndexByName } from './helpers';

export const insertStyleTags = (config, ch, haElem) => {
  let headerHeight = 48;
  const headerType = config.split_mode ? ch.footer : ch.header;
  if (!config.compact_mode) {
    if (config.reverse_button_direction) {
      ch.header.container.querySelector('#ch-content-container').dir = 'ltr';
      ch.header.container.querySelector('#ch-content-container').style.textAlign = 'right';
    } else {
      ch.header.container.querySelector('#ch-content-container').style.textAlign = '';
      ch.header.container.querySelector('#ch-content-container').dir = '';
    }
    ch.header.container.querySelector('#ch-content-container').innerHTML = config.header_text;
    headerHeight = headerType.tabs.length ? 96 : 48;
  }

  // Build header's main style.
  let style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');
  style.innerHTML = `
      ch-header {
        z-index: 100;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        display:flex;
        justify-content: center;
        font: 400 20px Roboto, sans-serif;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        margin-bottom: 0px;
        position: sticky;
        position: -webkit-sticky;
        ${config.footer_mode ? 'bottom: 0px;' : 'top: 0px;'}
        ${config.header_css ? config.header_css : ''}
        transition: box-shadow 0.3s ease-in-out;
        ${config.shadow && config.split_mode ? 'box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2)' : ''}
        ${config.footer_mode ? 'margin-top:48px;margin-bottom:-48px;padding-bottom:4px;' : ''}
      }
      ch-footer {
        z-index: 99;
        padding-left: 3px;
        padding-right: 3px;
        box-sizing: border-box;
        display:flex;
        justify-content: center;
        font: 400 20px Roboto, sans-serif;
        background: ${config.background || 'var(--primary-color)'};
        color: ${config.elements_color || 'var(--text-primary-color)'};
        margin-bottom: 0px;
        margin-top: 0px;
        position: sticky;
        position: -webkit-sticky;
        ${config.footer_mode && config.split_mode ? 'top: 0px;' : 'bottom: 0px;'}
        ${config.footer_mode ? 'bottom: 48px;' : ''}
        ${config.header_css ? config.header_css : ''}
        ${config.shadow && config.split_mode ? 'box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2)' : ''}
        transition: box-shadow 0.3s ease-in-out;
        ${
          config.shadow && (config.footer_mode || config.split_mode)
            ? 'box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2)'
            : ''
        }
      }
      ch-stack {
        flex-direction: column;
        width: 100%;
        margin-left: 9px;
        margin-right: 9px;
        ${config.stack_css ? config.stack_css : ''}
      }

      #ch-content-container {
        ${config.compact_mode ? 'display: none;' : ''}
        ${
          config.header_text.includes('<br>')
            ? `
          font-size: 17px;
          line-height: 1.2;
          margin: -9px 0px 0px;
        `
            : ''
        }
        ${config.header_text_css ? config.header_text_css : ''}
        ${
          config.menu_dropdown || config.disable_sidebar || config.hide_menu
            ? 'padding: 12px 0px;'
            : 'padding: 12px 6px;'
        }
      }
      app-header {
        display: none;
      }
      paper-tab.iron-selected {
        ${config.active_tab_color ? `color: ${config.active_tab_color};` : ''}
        ${config.active_tab_css ? config.active_tab_css : ''}
      }
      [buttonElem="menu"] {
        ${config.menu_color ? `color: ${config.menu_color};` : ''}
        ${config.menu_hide ? `display: none;` : ''}
        ${config.menu_css ? config.menu_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      [buttonElem="options"] {
        ${config.options_color ? `color: ${config.options_color};` : ''}
        ${config.options_hide ? `display: none;` : ''}
        ${config.options_css ? config.options_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      [buttonElem="voice"] {
        ${config.voice_color ? `color: ${config.voice_color};` : ''}
        ${config.voice_hide ? `display: none;` : ''}
        ${config.voice_css ? config.voice_css : ''}
        ${config.footer_mode && config.compact_mode ? 'margin-top:0 !important;' : ''}
      }
      paper-tab {
        ${config.all_tabs_color ? `color: ${config.all_tabs_color};` : ''}
        ${config.all_tabs_css ? config.all_tabs_css : ''}
      }
      paper-tabs {
        padding: 0 4px;
        ${
          config.tab_indicator_color
            ? `--paper-tabs-selection-bar-color: ${config.tab_indicator_color} !important;`
            : ''
        }
        ${config.tab_container_css ? config.tab_container_css : ''}
      }
    `;

  // Add per tab coloring.
  if (config.tabs_color) {
    Object.keys(config.tabs_color).forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          color: ${config.tabs_color[tab]};
        }
      `;
    });
  }

  // Add per tab hiding.
  if (config.hide_tabs) {
    config.hide_tabs.forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          display: none;
        }
      `;
    });
  }

  // Add per tab custom css.
  if (config.tabs_css) {
    Object.keys(config.tabs_css).forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          ${config.tabs_css[tab]};
        }
      `;
    });
  }

  // Add updated style element and remove old one after.
  // This prevents elements "flashing" when styles change.
  let currentStyle = haElem.root.querySelector('#ch_header_style');
  if (!currentStyle || style.innerHTML != currentStyle.innerHTML) {
    haElem.root.appendChild(style);
    if (currentStyle) currentStyle.remove();
  }

  // Style views elements.
  style = document.createElement('style');
  style.setAttribute('id', 'ch_view_style');
  style.innerHTML = `
        hui-view, hui-panel-view {
          margin-top: -96px;
          ${config.compact_mode ? 'min-height: calc(100vh - 96px);' : 'min-height: calc(100vh - 112px);'}
          ${config.footer_mode && !config.split_mode ? `padding-bottom: ${headerHeight}px;` : ''}
          ${config.footer_mode && !config.split_mode ? `margin-bottom: -${headerHeight + 4}px;` : ''}
          ${config.split_mode ? `padding-bottom: 48px;` : ''}
          ${config.split_mode && config.footer_mode ? `margin-bottom: -4px;` : ''}
        }
        hui-panel-view {
          padding-top: 96px;
          ${config.panel_view_css ? config.panel_view_css : ''}
          ${config.kiosk_mode || config.hide_header ? `min-height: 100vh !important; margin-bottom: 0 !important;` : ''}
        }
        hui-view {
          padding-top: 100px;
          ${config.view_css ? config.view_css : ''}
        }
        #view {
          min-height: calc(100vh - 96px) !important;
          ${config.footer_mode && !config.split_mode ? `min-height: calc(100vh - ${headerHeight}px) !important;` : ''}
          ${config.compact_mode && !config.footer_mode ? `min-height: calc(100vh - ${headerHeight}px) !important;` : ''}
          ${config.split_mode ? `min-height: calc(100vh - 48px) !important; margin-bottom: -48px;` : ''}
          ${
            config.split_mode && config.footer_mode
              ? 'min-height: calc(100vh - 52px) !important; margin-bottom: -48px;'
              : ''
          }
          ${config.kiosk_mode || config.hide_header ? `min-height: 100vh !important;` : ''}
          ${config.footer_mode ? `min-height: calc(100vh - 100px) !important;` : ''}

        }
      `;

  // Add updated view style if changed.
  // Prevents background images flashing on every change.
  currentStyle = haElem.root.querySelector('#ch_view_style');
  if (!currentStyle || style.innerHTML != currentStyle.innerHTML) {
    haElem.root.appendChild(style);
    if (currentStyle) currentStyle.remove();
  }

  // Hide cheverons completely when not visible.
  style = document.createElement('style');
  style.setAttribute('id', 'ch_chevron');
  style.innerHTML = `
      .not-visible[icon*="chevron"] {
        display:none;
      }
    `;
  // Add updated style element and remove old one after.
  currentStyle = headerType.tabContainer.shadowRoot.querySelector('#ch_chevron');
  headerType.tabContainer.shadowRoot.appendChild(style);
  if (currentStyle) currentStyle.remove();

  currentStyle = ch.footer.tabContainer.shadowRoot.querySelector('#ch_chevron');
  ch.footer.tabContainer.shadowRoot.appendChild(style.cloneNode(true));
  if (currentStyle) currentStyle.remove();
};
