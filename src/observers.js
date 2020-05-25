import { hideMenuItems } from './overflow-menu';
import { redirects } from './redirects';
import { getLovelace } from 'custom-card-helpers';
import { CustomHeaderConfig } from './config';
import { rebuild } from './custom-header.ts';

export const selectTab = (config, ch) => {
  const headerType = config.compact_mode || config.button_scroll ? ch.header : ch.footer;
  const lovelace = getLovelace();
  if (!lovelace) return;
  const haActiveTabIndex = lovelace.current_view;
  headerType.tabContainer.setAttribute('selected', haActiveTabIndex);
  if (!headerType.tabs[haActiveTabIndex]) return;
  const tab = headerType.tabs[haActiveTabIndex].getBoundingClientRect();
  const container = headerType.tabContainer.shadowRoot.querySelector('#tabsContainer').getBoundingClientRect();
  if (container.right < tab.right || container.left > tab.left) {
    headerType.tabContainer._scrollToLeft();
    headerType.tabContainer._scrollToRight();
    headerType.tabs[haActiveTabIndex].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
  }
  for (const tab of headerType.tabs) {
    if (tab != headerType.tabs[haActiveTabIndex]) tab.classList.remove('iron-selected');
  }
};

export const observers = (config, ch, haElem) => {
  const callback = mutations => {
    const headerType = config.split_mode ? ch.footer : ch.header;
    mutations.forEach(({ addedNodes, target }) => {
      if (mutations.length && mutations[0].target.nodeName == 'HTML') {
        window.customHeaderExceptionConfig = 'init';
        CustomHeaderConfig.buildConfig(ch);
        mutations = [];
      }
      if (target.id == 'view' && addedNodes.length && headerType.tabs.length) {
        // Navigating to new tab/view.
        if (haElem.root.querySelector('app-toolbar').className != 'edit-mode') {
          redirects(config, ch);
          selectTab(config, ch);
          CustomHeaderConfig.buildConfig(ch);
        }
      } else if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        if (haElem.main.querySelector('ha-panel-lovelace')) {
          if (config.compact_mode && !config.footer_mode) {
            haElem.sidebar.main.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
            haElem.sidebar.main.querySelector('div.divider').style = '';
          } else if (config.footer_mode && !config.split_mode) {
            haElem.sidebar.main.querySelector('.menu').style = '';
            haElem.sidebar.main.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.querySelector('div.divider').style = 'margin-bottom: -10px;';
          } else if (config.split_mode) {
            haElem.sidebar.main.querySelector('.menu').style = 'height:49px;';
            haElem.sidebar.main.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
            haElem.sidebar.main.querySelector('div.divider').style = 'margin-bottom: -3px;';
          }
        } else {
          haElem.sidebar.main.querySelector('.menu').style = '';
          haElem.sidebar.main.querySelector('paper-listbox').style = '';
          haElem.sidebar.main.querySelector('div.divider').style = '';
        }
        if (haElem.root.querySelector('editor')) haElem.root.querySelector('editor').remove();
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        if (haElem.root.querySelector('editor')) haElem.root.querySelector('editor').remove();
        if (!window.customHeaderDisabled) hideMenuItems(config, ch.header, true, haElem);
        haElem.appHeader.style.display = '';
        if (haElem.root.querySelector('ch-header')) haElem.root.querySelector('ch-header').remove();
        if (haElem.root.querySelector('ch-footer')) haElem.root.querySelector('ch-footer').remove();
        if (haElem.root.querySelector('#ch_view_style')) haElem.root.querySelector('#ch_view_style').remove();
        if (haElem.root.querySelector('#ch_header_style')) haElem.root.querySelector('#ch_header_style').remove();
        if (haElem.root.querySelector('#ch_animated')) haElem.root.querySelector('#ch_animated').remove();
        window.dispatchEvent(new Event('resize'));
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        let timeout;
        const wait = () => {
          if (
            !document
              .querySelector('home-assistant')
              .shadowRoot.querySelector('home-assistant-main')
              .shadowRoot.querySelector('ha-panel-lovelace')
              .shadowRoot.querySelector('hui-root')
              .shadowRoot.querySelector('ha-menu-button, paper-menu-button')
              .shadowRoot.querySelector('mwc-icon-button, paper-icon-button')
          ) {
            timeout = window.setTimeout(() => {
              wait();
            }, 200);
            timeout;
          } else {
            clearTimeout(timeout);
            rebuild();
          }
        };
        wait();
      }
    });
  };

  const panel_observer = new MutationObserver(callback);
  const header_observer = new MutationObserver(callback);
  const root_observer = new MutationObserver(callback);
  const html_observer = new MutationObserver(callback);

  if (!window.customHeaderObservers || !window.customHeaderObservers.length) {
    panel_observer.observe(haElem.partialPanelResolver, { childList: true });
    header_observer.observe(haElem.appHeader, { childList: true });
    root_observer.observe(haElem.root.querySelector('#view'), { childList: true });
    html_observer.observe(document.querySelector('html'), { attributes: true });
  }

  window.customHeaderObservers = [panel_observer, header_observer, root_observer, html_observer];
};
