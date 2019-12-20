import { header } from './build-header';
import { hideMenuItems } from './overflow-menu';
import { buildConfig } from './config.js';
import { haElem, root } from './ha-elements';

export const selectTab = () => {
  if (!haElem.tabContainer || !header.tabContainer) return;
  const haActiveTabIndex = haElem.tabContainer.indexOf(root.querySelector('paper-tab.iron-selected'));
  header.tabContainer.setAttribute('selected', String(haActiveTabIndex));
  if (!header.tabs[haActiveTabIndex]) return;
  const tab = header.tabs[haActiveTabIndex].getBoundingClientRect();
  if (haActiveTabIndex === 0) header.tabContainer._scrollToSelectedIfNeeded(tab.width, tab.right);
  else header.tabContainer._scrollToSelectedIfNeeded(tab.width, tab.left);
};

export const observers = () => {
  const callback = mutations => {
    const config = window.customHeaderConfig;
    mutations.forEach(({ addedNodes, target }) => {
      if (target.id == 'view' && addedNodes.length && header.tabs.length) {
        // Navigating to new tab/view.
        setTimeout(() => selectTab(), 500);
      } else if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        if (haElem.main.shadowRoot.querySelector(' ha-panel-lovelace')) {
          if (config.compact_mode && !config.footer_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
          } else if (config.footer_mode) {
            haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
            haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
          }
        } else {
          haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
          haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
        }
        if (root.querySelector('editor')) root.querySelector('editor').remove();
        buildConfig();
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        if (root.querySelector('editor')) root.querySelector('editor').remove();
        if (!window.customHeaderDisabled) hideMenuItems(config, header, true);
        header.menu.style.display = 'none';
        root.querySelector('ch-header').style.display = 'none';
        haElem.appHeader.style.display = 'block';
        if (root.querySelector('#ch_view_style')) root.querySelector('#ch_view_style').remove();
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        haElem.menu = haElem.appHeader.querySelector('ha-menu-button');
        haElem.appHeader.style.display = 'none';
        header.menu.style.display = '';
        root.querySelector('ch-header').style.display = '';
        buildConfig();
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(haElem.partialPanelResolver, { childList: true });
  observer.observe(haElem.appHeader, { childList: true });
  observer.observe(root.querySelector('#view'), { childList: true });
};
