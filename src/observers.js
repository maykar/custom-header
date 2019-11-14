import { root, main } from './helpers';
import { buildConfig } from './config';
import { header } from './build-header';

export const observers = () => {
  const callback = mutations => {
    mutations.forEach(({ addedNodes, target }) => {
      if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        window.customHeaderDefaultClicked = false;
        buildConfig();
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        window.scrollTo({ top: 0, behavior: 'smooth' });
        root.querySelector('app-header').style.visibility = 'initial';
        root.querySelector('cch-header').style.visibility = 'hidden';
        root.querySelector('#cch_header_style').remove();
        header.menu.style.display = 'none';
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        header.menu.style.display = '';
        root.querySelector('cch-header').style.visibility = 'initial';
        buildConfig();
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(main.shadowRoot.querySelector('partial-panel-resolver'), { childList: true });
  observer.observe(root.querySelector('app-header'), {
    childList: true,
  });
};
