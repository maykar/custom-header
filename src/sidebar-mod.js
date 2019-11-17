import { root, main } from './helpers';

export const sidebarMod = (config, header) => {
  const appDrawerLayout = main.shadowRoot.querySelector('app-drawer-layout');
  const appDrawer = main.shadowRoot.querySelector('app-drawer');
  const drawer = main.shadowRoot.querySelector('#drawer');
  const cc = appDrawerLayout.shadowRoot.querySelector('#contentContainer');
  const sidebarStyle = appDrawer.shadowRoot.querySelector('#cch_sidebar_style');

  const sidebarRight = mutations => {
    if (cc.getAttribute('drawer-position') === 'right' || cc.getAttribute('customHeader') === 'left') return;

    if (document.querySelector('home-assistant').hass.dockedSidebar === 'always_hidden') {
      drawer.shadowRoot.querySelector('#contentContainer').setAttribute('position', 'right');
    } else {
      const style = document.createElement('style');
      drawer.setAttribute('position', 'right');
      style.setAttribute('id', 'cch_sidebar_style');
      style.innerHTML = `
            #contentContainer {
              right: 0;
              left: auto;
              -webkit-transform: translate3d(100%, 0, 0);
              transform: translate3d(100%, 0, 0);
            }

            #contentContainer[position=right] {
              right: 0;
              left: auto;
              -webkit-transform: translate3d(100%, 0, 0);
              transform: translate3d(100%, 0, 0);
            }

            #contentContainer[swipe-open]::after {
              right: 100%;
              left: auto;
            }

            #contentContainer[swipe-open][position=right]::after {
              left: 100%;
              right: auto;
            }
        `;
      appDrawer.shadowRoot.appendChild(style);
      if (sidebarStyle) sidebarStyle.remove();

      if (
        (mutations && mutations[0].target.hasAttribute('drawer-position')) ||
        (cc.getAttribute('customHeader') === 'right' && cc.getAttribute('drawer-position') === 'left')
      ) {
        cc.setAttribute('drawer-position', 'right');
      }
    }
  };

  if (config.sidebar_right) {
    cc.setAttribute('customHeader', 'right');
    sidebarRight();
  } else {
    cc.setAttribute('customHeader', 'left');
    if (sidebarStyle) sidebarStyle.remove();
    drawer.shadowRoot.querySelector('#contentContainer').setAttribute('position', 'left');
    drawer.setAttribute('position', 'left');
    if (cc.getAttribute('customHeader') === 'left' && cc.getAttribute('drawer-position') === 'right') {
      cc.setAttribute('drawer-position', 'left');
    }
    if (config.disabled_mode) return;
  }

  if (!window.customHeaderSidebarObserver) {
    window.customHeaderSidebarObserver = true;
    const sidebarObserver = new MutationObserver(sidebarRight);
    sidebarObserver.observe(cc, {
      attributes: true,
      attributeFilter: ['drawer-position'],
    });
  }

  // Style menu button with sidebar changes/resizing.
  const menu = root.querySelector('ha-menu-button');
  const menuButtonVisibility = () => {
    menu.style.display = 'none';
    if (config.disable_sidebar) {
      header.menu.style.display = 'none';
      return;
    } else if (menu.style.visibility === 'hidden') {
      header.menu.style.display = 'none';
      header.menu.style.visibility = 'hidden';
      header.menu.style.marginRight = '33px';
    } else {
      header.menu.style.visibility = 'initial';
      header.menu.style.marginRight = '';
      header.menu.style.display = 'initial';
    }
  };

  // Watch for menu button changes.
  if (!window.customHeaderMenuObserver) {
    window.customHeaderMenuObserver = true;
    new MutationObserver(() => {
      if (!window.customHeaderDisabled) menuButtonVisibility();
    }).observe(menu, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  menuButtonVisibility();
};
