import { root, main } from './helpers';

export const kioskMode = () => {
  if (window.location.href.includes('disable_ch')) return;

  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML = `
        cch-header {
          display: none;
        }
        app-header {
          display: none;
        }
        hui-view, hui-panel-view {
          min-height: 100vh;
        }
        #drawer {
          display: none;
        }
      `;

  const oldStyle = root.querySelector('#cch_header_style');
  root.appendChild(style);
  if (oldStyle) oldStyle.remove();

  main.shadowRoot.querySelector('#drawer').style.display = 'none';

  style = document.createElement('style');
  style.setAttribute('id', 'cch_sidebar_style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(':host(:not([expanded])) {width: 0px !important;}'));
  main.shadowRoot.querySelector('ha-sidebar').shadowRoot.appendChild(style);

  style = document.createElement('style');
  style.setAttribute('id', 'cch_sidebar_style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(':host {--app-drawer-width: 0px !important;}'));
  main.shadowRoot.appendChild(style);
  window.dispatchEvent(new Event('resize'));
};

export const removeKioskMode = () => {
  main.shadowRoot.querySelector('#drawer').style.display = '';
  let kioskStyle = main.shadowRoot.querySelector('#cch_sidebar_style');
  if (kioskStyle) kioskStyle.remove();
  kioskStyle = main.shadowRoot.querySelector('ha-sidebar').shadowRoot.querySelector('#cch_sidebar_style');
  if (kioskStyle) kioskStyle.remove();
  document
    .querySelector('body > home-assistant')
    .shadowRoot.querySelector('home-assistant-main')
    .shadowRoot.querySelector('#drawer').style.display = '';
};
