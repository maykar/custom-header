import { tabIndexByName } from './helpers';

// Kiosk mode is used to hide sidebar only as well.
export const kioskMode = (haElem, sidebarOnly, headerOnly, config) => {
  if (
    (window.location.href.includes('disable_ch') || window.customHeaderDisabled) &&
    (haElem.hass.user.is_admin || haElem.hass.user.is_owner || !config.restrict_users)
  )
    return;

  // Kiosk mode styling.
  let style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');
  if (!headerOnly) {
    style.innerHTML += `
        #drawer {
          display: none;
        }
      `;
  }
  if (!sidebarOnly) {
    style.innerHTML += `
        ch-header {
          display: none;
        }
        ch-footer {
          display: none;
        }
        app-header {
          display: none;
        }
        hui-view {
          padding-top: 100px;
        }
        hui-view, hui-panel-view {
          min-height: calc(100vh + 96px);
          margin-top: -96px;
        }
      `;
  }

  // Add updated styles only if changed.
  const oldStyle = haElem.root.querySelector('#ch_header_style');
  if (!oldStyle || oldStyle.innerText != style.innerHTML) {
    haElem.root.appendChild(style);
    if (oldStyle) oldStyle.remove();
  }

  // Add per tab hiding.
  if (config.hide_tabs) {
    config.hide_tabs.forEach(tab => {
      style.innerHTML += `
        paper-tab:nth-child(${tabIndexByName(tab) + 1}) {
          display: none;
        }
      `;
    });
  }

  if (!headerOnly) {
    haElem.drawer.style.display = 'none';

    // Style sidebar to close immediately and prevent opening.
    if (!haElem.sidebar.main.querySelector('#ch_sidebar_style')) {
      style = document.createElement('style');
      style.setAttribute('id', 'ch_sidebar_style');
      style.innerHTML = ':host(:not([expanded])) {width: 0px !important;}';
      haElem.sidebar.main.appendChild(style);
    }
    if (!haElem.main.querySelector('#ch_sidebar_style')) {
      style = document.createElement('style');
      style.setAttribute('id', 'ch_sidebar_style');
      style.innerHTML = ':host {--app-drawer-width: 0px !important;}';
      haElem.main.appendChild(style);
    }
  }
  window.dispatchEvent(new Event('resize'));
};

export const removeKioskMode = haElem => {
  haElem.drawer.style.display = '';
  let style = haElem.main.querySelector('#ch_sidebar_style');
  if (style) style.remove();
  style = haElem.sidebar.main.querySelector('#ch_sidebar_style');
  if (style) style.remove();
  haElem.drawer.style.display = '';
};
