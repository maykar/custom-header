import { haElem, root, lovelace } from './ha-elements';

export const buildHeader = () => {
  if (root.querySelector('cch-header')) return;
  const header = {};

  header.tabContainer = document.createElement('paper-tabs');
  header.tabContainer.setAttribute('scrollable', '');
  header.tabContainer.setAttribute('dir', 'ltr');
  header.tabContainer.style.width = '100%';
  header.tabContainer.style.marginLeft = '0';

  haElem.tabs.forEach(tab => {
    const index = haElem.tabs.indexOf(tab);
    const tabClone = tab.cloneNode(true);
    const haIcon = tabClone.querySelector('ha-icon');
    if (haIcon) {
      haIcon.setAttribute('icon', lovelace.config.views[index].icon);
    }
    tabClone.addEventListener('click', () => {
      haElem.tabs[index].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
    });
    header.tabContainer.appendChild(tabClone);
  });
  header.tabs = header.tabContainer.querySelectorAll('paper-tab');

  const buildButton = (button, icon) => {
    if (button === 'options') {
      header[button] = haElem[button].cloneNode(true);
      header[button].removeAttribute('horizontal-offset');
      header[button].querySelector('paper-icon-button').style.height = '48px';
      const items = Array.from(header[button].querySelectorAll('paper-item'));
      items.forEach(item => {
        const index = items.indexOf(item);
        item.addEventListener('click', () => {
          haElem[button]
            .querySelectorAll('paper-item')
            [index].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
        });
      });
    } else {
      if (!haElem[button]) return;
      header[button] = document.createElement('paper-icon-button');
      header[button].addEventListener('click', () => {
        (haElem[button].shadowRoot.querySelector('paper-icon-button') || haElem[button]).dispatchEvent(
          new MouseEvent('click', { bubbles: false, cancelable: true }),
        );
      });
    }

    header[button].setAttribute('icon', icon);
    header[button].setAttribute('buttonElem', button);
    header[button].style.flexShrink = '0';
    header[button].style.height = '48px';
  };

  buildButton('menu', 'mdi:menu');
  buildButton('voice', 'mdi:microphone');
  buildButton('options', 'mdi:dots-vertical');

  const stack = document.createElement('cch-stack');
  const contentContainer = document.createElement('div');
  contentContainer.setAttribute('id', 'contentContainer');

  header.container = document.createElement('cch-header');
  if (header.menu) header.container.appendChild(header.menu);
  header.container.appendChild(stack);
  header.stack = header.container.querySelector('cch-stack');
  header.stack.appendChild(contentContainer);
  header.stack.appendChild(header.tabContainer);
  if (header.voice && header.voice.style.visibility != 'hidden') header.container.appendChild(header.voice);
  if (header.options) header.container.appendChild(header.options);
  haElem.appLayout.appendChild(header.container);

  return header;
};

export const header = buildHeader();
