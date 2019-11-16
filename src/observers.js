import { root, main } from './helpers';
import { buildConfig } from './config';
import { header } from './build-header';

export const observers = () => {
  const callback = mutations => {
    mutations.forEach(({ addedNodes, target }) => {
      if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        // When returning to lovelace/overview from elsewhere in HA.
        buildConfig(true);
      } else if (target.className === 'edit-mode' && addedNodes.length) {
        // Entered edit mode.
        header.menu.style.display = 'none';
        root.querySelector('cch-header').style.display = 'none';
        root.querySelector('app-header').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        root.querySelector('#cch_view_style').remove();
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        // Exited edit mode.
        root.querySelector('app-header').style.display = 'none';
        buildConfig(true);
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
