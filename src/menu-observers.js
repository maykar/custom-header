export const menuButtonObservers = (config, header, root) => {
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

  // Create Notification Dot
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.cssText = `
        pointer-events: none;
        position: relative;
        background-color: #ff9800;
        width: 12px;
        height: 12px;
        top: -30px;
        right: ${config.button_direction == 'rtl' ? '' : '-'}20px;
        border-radius: 50%;
    `;
  if (menu.shadowRoot.querySelector('.dot')) {
    header.menu.shadowRoot.appendChild(dot);
  }

  // Watch for menu button changes.
  if (!window.customHeaderMenuObserver) {
    window.customHeaderMenuObserver = true;
    new MutationObserver(mutations => {
      if (!window.customHeaderDisabled) menuButtonVisibility();
    }).observe(menu, {
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
    });
    new MutationObserver(mutations => {
      const root = document
        .querySelector('home-assistant')
        .shadowRoot.querySelector('home-assistant-main')
        .shadowRoot.querySelector('ha-panel-lovelace')
        .shadowRoot.querySelector('hui-root');
      mutations.forEach(({ addedNodes, removedNodes }) => {
        if (addedNodes) {
          for (const node of addedNodes) {
            if (node.className === 'dot') {
              root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(dot);
            }
          }
        }
        if (removedNodes) {
          for (const node of removedNodes) {
            if (node.className === 'dot') {
              root.shadowRoot
                .querySelector('[buttonElem="menu"]')
                .shadowRoot.querySelector('.dot')
                .remove();
            }
          }
        }
      });
    }).observe(menu.shadowRoot, {
      childList: true,
    });
  }

  menuButtonVisibility();
};
