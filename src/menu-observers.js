export const menuButtonObservers = (config, header, root) => {
  const menu = root.querySelector('ha-menu-button');

  // Create Notification Dot
  const buildDot = () => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.cssText = `
        pointer-events: none;
        position: relative;
        background-color: ${config.notification_dot_color};
        width: 12px;
        height: 12px;
        top: -28px;
        right: ${config.button_direction == 'rtl' ? '' : '-'}16px;
        border-radius: 50%;
    `;
    return dot;
  };

  const menuButtonVisibility = () => {
    if (config.disable_sidebar || window.customHeaderDisabled) return;
    if (menu.style.visibility === 'hidden') header.menu.style.display = 'none';
    else header.menu.style.display = 'initial';
  };

  const notificationDot = mutations => {
    const root = document
      .querySelector('home-assistant')
      .shadowRoot.querySelector('home-assistant-main')
      .shadowRoot.querySelector('ha-panel-lovelace')
      .shadowRoot.querySelector('hui-root');
    mutations.forEach(({ addedNodes, removedNodes }) => {
      if (addedNodes) {
        for (const node of addedNodes) {
          if (
            node.className === 'dot' &&
            !root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot')
          ) {
            root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(buildDot());
          }
        }
      }
      if (removedNodes) {
        for (const node of removedNodes) {
          if (
            node.className === 'dot' &&
            root.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector('.dot')
          ) {
            root.shadowRoot
              .querySelector('[buttonElem="menu"]')
              .shadowRoot.querySelector('.dot')
              .remove();
          }
        }
      }
    });
  };

  if (!window.customHeaderMenuObserver) {
    window.customHeaderMenuObserver = true;
    const notificationObserver = new MutationObserver(notificationDot);
    notificationObserver.observe(menu.shadowRoot, { childList: true });

    const menuButtonObserver = new MutationObserver(menuButtonVisibility);
    menuButtonObserver.observe(menu, { attributes: true, attributeFilter: ['style'] });
  }

  menuButtonVisibility();

  const prevDot = header.menu.shadowRoot.querySelector('.dot');
  if (prevDot && prevDot.style.cssText != buildDot().style.cssText) {
    prevDot.remove();
  }
  if (!header.menu.shadowRoot.querySelector('.dot')) header.menu.shadowRoot.appendChild(buildDot());
};
