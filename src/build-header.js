export class CustomHeader {
  constructor(ha_elements) {
    if (!ha_elements) return;
    this.ha_elem = ha_elements;
    const header = this.ha_elem.appLayout.querySelector('ch-header');
    const footer = this.ha_elem.appLayout.querySelector('ch-footer');
    if (header) {
      header.parentNode.removeChild(header);
      footer.parentNode.removeChild(footer);
    }
    this.header = this.buildHeader();
    this.footer = this.buildFooter();
  }

  get header() {
    return this._header;
  }

  set header(value) {
    this._header = value;
  }

  get footer() {
    return this._footer;
  }

  set footer(value) {
    this._footer = value;
  }

  buildHeader() {
    const header = {};
    header.tabContainer = document.createElement('paper-tabs');
    header.tabContainer.setAttribute('dir', 'ltr');
    header.tabContainer.setAttribute('scrollable', '');
    header.tabContainer.style.width = '100%';
    header.tabContainer.style.marginLeft = '0';

    this.ha_elem.tabs.forEach(tab => {
      const tab_index = this.ha_elem.tabs.indexOf(tab);
      const tab_element = tab.cloneNode(true);
      const tab_icon = tab_element.querySelector('ha-icon');
      this.tapOrClick(tab_element, this.ha_elem.tabs[tab_index]);
      if (tab_icon) tab_icon.setAttribute('icon', this.ha_elem.lovelace.config.views[tab_index].icon);
      header.tabContainer.appendChild(tab_element);
    });

    header.tabs = header.tabContainer.querySelectorAll('paper-tab');

    header.tabs.forEach(tab => {
      const tab_index = Array.from(header.tabs).indexOf(tab);
      const text = document.createElement('p');
      const existingText = tab.innerText.replace(/\s/g, '');
      if (existingText) tab.innerText = '';
      text.innerHTML = existingText ? this.ha_elem.lovelace.config.views[tab_index].title : '';
      tab.appendChild(text);
    });

    const stack = document.createElement('ch-stack');
    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'ch-content-container');
    header.container = document.createElement('ch-header');

    this.cloneButton('menu', 'mdi:menu', header);
    this.cloneButton('voice', 'mdi:microphone', header);
    this.cloneButton('options', 'mdi:dots-vertical', header);

    header.container.appendChild(header.menu);
    header.container.appendChild(stack);
    header.stack = header.container.querySelector('ch-stack');
    header.stack.appendChild(contentContainer);
    header.stack.appendChild(header.tabContainer);
    header.container.appendChild(header.options);
    if (header.voice && header.voice.style.visibility != 'hidden') {
      header.container.appendChild(header.voice);
    }

    header.container.style.visibility = 'hidden';
    this.ha_elem.appLayout.appendChild(header.container);
    return header;
  }

  buildFooter() {
    const footer = {};

    footer.tabContainer = document.createElement('paper-tabs');
    footer.tabContainer.setAttribute('dir', 'ltr');
    footer.tabContainer.setAttribute('scrollable', '');
    footer.tabContainer.style.width = '100%';
    footer.tabContainer.style.marginLeft = '0';

    this.ha_elem.tabs.forEach(tab => {
      const tab_index = this.ha_elem.tabs.indexOf(tab);
      const tab_element = tab.cloneNode(true);
      const tab_icon = tab_element.querySelector('ha-icon');
      this.tapOrClick(tab_element, this.ha_elem.tabs[tab_index]);
      if (tab_icon) tab_icon.setAttribute('icon', this.ha_elem.lovelace.config.views[tab_index].icon);
      footer.tabContainer.appendChild(tab_element);
    });

    footer.tabs = footer.tabContainer.querySelectorAll('paper-tab');

    footer.tabs.forEach(tab => {
      const tab_index = Array.from(footer.tabs).indexOf(tab);
      const text = document.createElement('p');
      const existingText = tab.innerText.replace(/\s/g, '');
      if (existingText) tab.innerText = '';
      text.innerHTML = existingText ? this.ha_elem.lovelace.config.views[tab_index].title : '';
      tab.appendChild(text);
    });

    footer.container = document.createElement('ch-footer');
    footer.container.appendChild(footer.tabContainer);
    footer.container.style.visibility = 'hidden';

    this.ha_elem.appLayout.appendChild(footer.container);
    return footer;
  }

  cloneButton(button, icon, header) {
    if (button === 'options') {
      header[button] = this.ha_elem[button].cloneNode(true);
      header[button].removeAttribute('horizontal-offset');
      if (header[button].querySelector('mwc-icon-button')) {
        const icon = document.createElement('ha-icon-button');
        icon.setAttribute('icon', 'hass:dots-vertical');
        icon.setAttribute('slot', 'trigger');
        icon.setAttribute('title', header[button].querySelector('mwc-icon-button').getAttribute('title'));
        header[button].appendChild(icon);
        header[button].querySelector('mwc-icon-button').style.display = 'none';
      }
      header[button].querySelector('ha-icon, ha-icon-button, paper-icon-button').style.height = '48px';
      const items = Array.from(header[button].querySelectorAll('mwc-list-item, paper-item'));
      items.forEach(item => {
        const index = items.indexOf(item);
        this.tapOrClick(item, this.ha_elem[button].querySelectorAll('mwc-list-item, paper-item')[index]);
      });
    } else {
      if (!this.ha_elem[button]) return;
      if (this.ha_elem['menu'].shadowRoot.querySelector('paper-icon-button')) {
        header[button] = document.createElement('paper-icon-button');
      } else {
        header[button] = document.createElement('ha-icon-button');
      }
      this.tapOrClick(
        header[button],
        button == 'voice'
          ? this.ha_elem[button]
          : this.ha_elem[button].shadowRoot.querySelector('mwc-icon-button, paper-icon-button') || this.ha_elem[button],
      );
    }

    if (button == 'options' && header[button].querySelector('mwc-icon-button')) {
      header[button].querySelector('ha-icon-button').setAttribute('buttonElem', button);
    } else {
      header[button].setAttribute('buttonElem', button);
    }
    header[button].style.flexShrink = '0';
    header[button].style.height = '48px';
    if (button == 'options' && header[button].querySelector('mwc-icon-button')) {
      header[button].icon = header[button].querySelector('ha-icon-button');
    } else {
      header[button].icon = header[button];
      header[button].setAttribute('icon', icon);
    }
  }

  tapOrClick(listenElement, clickElement) {
    listenElement.setAttribute('onClick', ' ');
    if (clickElement.nodeName === 'MWC-LIST-ITEM') {
      listenElement.addEventListener('tap', () => {
        clickElement.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
      });
    }
    listenElement.addEventListener('click', () => {
      if (clickElement.nodeName === 'MWC-LIST-ITEM') {
        clickElement.click();
      } else {
        clickElement.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false }));
      }
    });
  }
}
