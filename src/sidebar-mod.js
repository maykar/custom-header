import { root, main } from './helpers';

export const sidebarMod = (config, header) => {
  const appDrawerLayout = main.shadowRoot.querySelector('app-drawer-layout');
  const contContainer = appDrawerLayout.shadowRoot.querySelector('#contentContainer');
  const sidebarRight = mutations => {
    if (
      contContainer.getAttribute('drawer-position') === 'right' ||
      contContainer.getAttribute('customHeader') === 'left'
    )
      return;
    if (document.querySelector('body > home-assistant').hass.dockedSidebar === 'always_hidden') {
      main.shadowRoot
        .querySelector('#drawer')
        .shadowRoot.querySelector('#contentContainer')
        .setAttribute('position', 'right');
    } else {
      const style = document.createElement('style');
      if (mutations && mutations[0].target.hasAttribute('drawer-position')) {
        contContainer.setAttribute('drawer-position', 'right');
      } else {
        if (
          contContainer.getAttribute('customHeader') === 'right' &&
          contContainer.getAttribute('drawer-position') === 'left'
        )
          contContainer.setAttribute('drawer-position', 'right');
      }
      main.shadowRoot.querySelector('#drawer').setAttribute('position', 'right');
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
      const currentStyle = main.shadowRoot.querySelector('app-drawer').shadowRoot.querySelector('#cch_sidebar_style');
      if (!currentStyle || style.innerHTML != currentStyle.innerHTML) {
        main.shadowRoot.querySelector('app-drawer').shadowRoot.appendChild(style);
        if (currentStyle) currentStyle.remove();
      }
    }
  };

  // Style menu button with sidebar changes/resizing.
  const menu = root.querySelector('ha-menu-button');
  const menuButtonVisibility = () => {
    menu.style.display = 'none';
    if (config.disable_sidebar) {
      header.menu.style.display = 'none';
      return;
    }
    if (menu.style.visibility === 'hidden') {
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

  if (config.sidebar_right) {
    contContainer.setAttribute('customHeader', 'right');
    sidebarRight();
  } else {
    contContainer.setAttribute('customHeader', 'left');
    if (main.shadowRoot.querySelector('app-drawer').shadowRoot.querySelector('#cch_sidebar_style')) {
      main.shadowRoot
        .querySelector('app-drawer')
        .shadowRoot.querySelector('#cch_sidebar_style')
        .remove();
    }
    main.shadowRoot
      .querySelector('#drawer')
      .shadowRoot.querySelector('#contentContainer')
      .setAttribute('position', 'left');
    if (
      contContainer.getAttribute('customHeader') === 'left' &&
      contContainer.getAttribute('drawer-position') === 'right'
    )
      contContainer.setAttribute('drawer-position', 'left');
    main.shadowRoot.querySelector('#drawer').setAttribute('position', 'left');
  }

  if (!window.customHeaderSidebarObserver) {
    window.customHeaderSidebarObserver = true;
    const sidebarObserver = new MutationObserver(sidebarRight);
    sidebarObserver.observe(contContainer, {
      attributes: true,
      attributeFilter: ['drawer-position'],
    });
  }
};
