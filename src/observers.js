import { header } from './build-header';
import { hideMenuItems } from './overflow-menu';
import { buildConfig } from './config.js';
import { haElem, root } from './ha-elements';

export const observers = () => {
  const callback = mutations => {
    const config = window.customHeaderConfig;
    mutations.forEach(({ addedNodes, target }) => {
      if (target.id == 'view' && addedNodes.length && header.tabs.length) {
        // Navigating to new tab/view.
        const haActiveTabIndex = haElem.tabContainer.indexOf(root.querySelector('paper-tab.iron-selected'));
        const chActiveTabIndex = header.tabContainer.querySelector('paper-tab.iron-selected');
        if (chActiveTabIndex !== haActiveTabIndex) {
          header.tabs.forEach(tab => {
            if (header.tabContainer.indexOf(tab) !== haActiveTabIndex) tab.classList.remove('iron-selected');
            else tab.click();
          });
        }
      } else if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
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
