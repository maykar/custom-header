import { root } from './helpers';
import { buildConfig } from './config';
import { header } from './build-header';

export const observers = () => {
  const callback = mutations => {
    mutations.forEach(({ addedNodes, target }) => {
      if (target.className === 'edit-mode' && addedNodes.length) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        root.querySelector('app-header').style.visibility = 'initial';
        root.querySelector('cch-header').style.visibility = 'hidden';
        root.querySelector('#cch_header_style').remove();
        header.menu.style.display = 'none';
      } else if (target.nodeName === 'APP-HEADER' && addedNodes.length) {
        header.menu.style.display = '';
        root.querySelector('cch-header').style.visibility = 'initial';
        buildConfig();
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(root.querySelector('app-header'), {
    childList: true,
  });
};
