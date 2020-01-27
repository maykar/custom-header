import { header } from './build-header';
import { hideMenuItems } from './overflow-menu';
import { haElem, root } from './ha-elements';
import { buildConfig } from './config';
import { insertStyleTags } from './style-tags';
import { redirects } from './redirects';
import { getLovelace } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

export const selectTab = config => {
  const headerType = config.split_mode ? header.bottom : header;
  const lovelace = getLovelace();
  if (!lovelace) return;
  if (haElem.tabContainer || headerType.tabContainer) {
    headerType.tabs[lovelace.current_view].dispatchEvent(
      new MouseEvent('click', { bubbles: false, cancelable: false }),
    );
    fireEvent(header.container, 'iron-resize');
  }
};

export const observers = () => {
  const callback = mutations => {
    const config = window.customHeaderConfig;
    const headerType = config.split_mode ? header.bottom : header;
    mutations.forEach(({ addedNodes, target }) => {
      if (mutations.length && mutations[0].target.nodeName == 'HTML') {
        window.customHeaderExceptionConfig = 'init';
        buildConfig();
        mutations = [];
      }
      if (target.id == 'view' && addedNodes.length && headerType.tabs.length) {
        // Navigating to new tab/view.
        redirects(config, header);
        selectTab(config);
        if (window.customHeaderTabCond) buildConfig();
      } else if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        if (haElem.main.shadowRoot.querySelector(' ha-panel-lovelace')) {
          if (config.compact_mode && !config.footer_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
          } else if (config.footer_mode && !config.split_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
          } else if (config.split_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -3px;';
          }
        } else {
          haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
        }
        if (root.querySelector('editor')) root.querySelector('editor').remove();
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        if (root.querySelector('editor')) root.querySelector('editor').remove();
        if (!window.customHeaderDisabled) hideMenuItems(config, header, true);
        header.menu.style.display = 'none';
        root.querySelector('ch-header').style.display = 'none';
        haElem.appHeader.style.display = 'block';
        if (root.querySelector('#ch_view_style')) root.querySelector('#ch_view_style').remove();
        if (root.querySelector('#ch_header_style')) root.querySelector('#ch_header_style').remove();
        if (root.querySelector('#ch_animated')) root.querySelector('#ch_animated').remove();
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        insertStyleTags(config);
        haElem.menu = haElem.appHeader.querySelector('ha-menu-button');
        haElem.appHeader.style.display = 'none';
        header.menu.style.display = '';
        root.querySelector('ch-header').style.display = '';
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(haElem.partialPanelResolver, { childList: true });
  observer.observe(haElem.appHeader, { childList: true });
  observer.observe(root.querySelector('#view'), { childList: true });
  observer.observe(document.querySelector('html'), { attributes: true });
};
