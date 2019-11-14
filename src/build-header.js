import { root, lovelace } from './helpers';

export const buildHeader = () => {
  if (root.querySelector('cch-header')) return;
  const header = {};
  const tabs = Array.from((root.querySelector('paper-tabs') || root).querySelectorAll('paper-tab'));

  header.tabContainer = document.createElement('paper-tabs');
  header.tabContainer.setAttribute('scrollable', '');
  header.tabContainer.setAttribute('dir', 'ltr');
  header.tabContainer.style.width = '100%';
  header.tabContainer.style.marginLeft = '0';

  tabs.forEach(tab => {
    const index = tabs.indexOf(tab);
    const tabClone = tab.cloneNode(true);
    const haIcon = tabClone.querySelector('ha-icon');
    if (haIcon) {
      haIcon.setAttribute('icon', lovelace.config.views[index].icon);
    }
    tabClone.addEventListener('click', () => {
      root
        .querySelector('paper-tabs')
        .querySelectorAll('paper-tab')
        [index].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
    });
    header.tabContainer.appendChild(tabClone);
  });
  header.tabs = header.tabContainer.querySelectorAll('paper-tab');

  const buildButton = (button, icon, name) => {
    if (button === 'options') {
      header[button] = root.querySelector(name).cloneNode(true);
      header[button].removeAttribute('horizontal-offset');
      header[button].querySelector('paper-icon-button').style.height = '48px';
      const items = Array.from(header[button].querySelectorAll('paper-item'));
      items.forEach(item => {
        const index = items.indexOf(item);
        item.addEventListener('click', () => {
          root
            .querySelector(name)
            .querySelectorAll('paper-item')
            [index].dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
        });
      });
    } else {
      if (button === 'voice' && !root.querySelector('ha-start-voice-button')) name = '[icon="hass:microphone"]';
      if (!root.querySelector(name)) return;
      header[button] = document.createElement('paper-icon-button');
      header[button].addEventListener('click', () => {
        (
          root.querySelector(name).shadowRoot.querySelector('paper-icon-button') || root.querySelector(name)
        ).dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
      });
    }

    header[button].setAttribute('icon', icon);
    header[button].setAttribute('buttonElem', button);
    header[button].style.flexShrink = '0';
    header[button].style.height = '48px';
  };

  buildButton('menu', 'mdi:menu', 'ha-menu-button');
  buildButton('voice', 'mdi:microphone', 'ha-start-voice-button');
  buildButton('options', 'mdi:dots-vertical', 'paper-menu-button');

  const stack = document.createElement('cch-stack');
  const contentContainer = document.createElement('div');
  contentContainer.setAttribute('id', 'contentContainer');

  header.container = document.createElement('cch-header');
  if (header.menu) header.container.appendChild(header.menu);
  header.container.appendChild(stack);
  header.stack = header.container.querySelector('cch-stack');
  header.stack.appendChild(contentContainer);
  if (header.tabContainer) header.stack.appendChild(header.tabContainer);
  if (header.voice && header.voice.style.visibility != 'hidden') header.container.appendChild(header.voice);
  if (header.options) header.container.appendChild(header.options);
  root.querySelector('ha-app-layout').appendChild(header.container);

  return header;
};

export const header = buildHeader();
