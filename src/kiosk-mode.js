import { haElem, root } from './ha-elements';

// Kiosk mode is used to hide sidebar only as well.
export const kioskMode = sidebarOnly => {
  if (window.location.href.includes('disable_ch')) return;

  // Kiosk mode styling.
  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML += `
        #drawer {
          display: none;
        }
      `;
  if (!sidebarOnly) {
    style.innerHTML += `
        cch-header {
          display: none;
        }
        app-header {
          display: none;
        }
        hui-view, hui-panel-view {
          min-height: 100vh;
        }
      `;
  }

  // Add updated styles only if changed.
  const oldStyle = root.querySelector('#cch_header_style');
  if (!oldStyle || oldStyle.innerText != style.innerHTML) {
    root.appendChild(style);
    if (oldStyle) oldStyle.remove();
  }

  haElem.drawer.style.display = 'none';

  // Style sidebar to close immediately and prevent opening.
  if (!haElem.sidebar.main.shadowRoot.querySelector('#cch_sidebar_style')) {
    style = document.createElement('style');
    style.setAttribute('id', 'cch_sidebar_style');
    style.innerHTML = ':host(:not([expanded])) {width: 0px !important;}';
    haElem.sidebar.main.shadowRoot.appendChild(style);
  }
  if (!haElem.main.shadowRoot.querySelector('#cch_sidebar_style')) {
    style = document.createElement('style');
    style.setAttribute('id', 'cch_sidebar_style');
    style.innerHTML = ':host {--app-drawer-width: 0px !important;}';
    haElem.main.shadowRoot.appendChild(style);
  }
  window.dispatchEvent(new Event('resize'));
};

export const removeKioskMode = () => {
  haElem.drawer.style.display = '';
  let style = haElem.main.shadowRoot.querySelector('#cch_sidebar_style');
  if (style) style.remove();
  style = haElem.sidebar.main.shadowRoot.querySelector('#cch_sidebar_style');
  if (style) style.remove();
  haElem.drawer.style.display = '';
};
