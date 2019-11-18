import { root, main } from './helpers';
import { header } from './build-header';
import { hideMenuItems } from './overflow-menu';
import { buildConfig } from './config.js';

export const observers = () => {
  const callback = mutations => {
    const config = window.customHeaderConfig;
    mutations.forEach(({ addedNodes, target }) => {
      if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        buildConfig(true);
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        if (!window.customHeaderDisabled) hideMenuItems(config, header, true);
        header.menu.style.display = 'none';
        root.querySelector('cch-header').style.display = 'none';
        root.querySelector('app-header').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (root.querySelector('#cch_view_style')) root.querySelector('#cch_view_style').remove();
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        buildConfig(true);
        root.querySelector('app-header').style.display = 'none';
        header.menu.style.display = '';
        root.querySelector('cch-header').style.display = '';
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(main.shadowRoot.querySelector('partial-panel-resolver'), { childList: true });
  observer.observe(root.querySelector('app-header'), {
    childList: true,
  });
};
