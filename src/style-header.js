import { header } from './build-header';
import { tabIndexByName } from './helpers';
import { hideMenuItems, buttonToOverflow } from './overflow-menu';
import { kioskMode, removeKioskMode } from './kiosk-mode';
import { menuButtonObservers } from './menu-observers';
import { insertStyleTags } from './style-tags';
import { haElem, root, lovelace } from './ha-elements';
import { redirects } from './redirects';
import { fireEvent } from 'custom-card-helpers';

export const styleHeader = config => {
  window.customHeaderConfig = config;

  if (window.location.href.includes('disable_ch')) config.disabled_mode = true;
  if (config.kiosk_mode && !config.disabled_mode) kioskMode(false, false);
  if (config.disabled_mode) {
    window.customHeaderDisabled = true;
    removeKioskMode();
    if (header.container) header.container.style.visibility = 'hidden';
    if (root.querySelector('#ch_header_style')) root.querySelector('#ch_header_style').remove();
    if (root.querySelector('#ch_view_style')) root.querySelector('#ch_view_style').remove();
    if (header.tabContainer.shadowRoot.querySelector('#ch_chevron')) {
      header.tabContainer.shadowRoot.querySelector('#ch_chevron').remove();
    }
    header.menu.style.display = 'none';
    root.querySelector('ha-menu-button').style.display = '';
    haElem.sidebar.main.shadowRoot.querySelector('.menu').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = '';
    haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = '';
    window.dispatchEvent(new Event('resize'));
    return;
  } else {
    window.customHeaderDisabled = false;
    hideMenuItems(config, header, false);
    header.menu.style.display = '';
    if (header.container) header.container.style.visibility = 'visible';
  }

  if (!header.tabs.length) config.compact_mode = false;

  if (config.menu_dropdown && !config.disable_sidebar) buttonToOverflow('Menu', 'mdi:menu', header, config);
  else if (header.options.querySelector(`#menu_dropdown`)) header.options.querySelector(`#menu_dropdown`).remove();
  if (config.voice_dropdown) buttonToOverflow('Voice', 'mdi:microphone', header, config);
  else if (header.options.querySelector(`#voice_dropdown`)) header.options.querySelector(`#voice_dropdown`).remove();

  // Style overflow menu depending on position.
  if (config.reverse_button_direction) {
    header.options.setAttribute('horizontal-align', 'left');
    header.options.querySelector('paper-listbox').setAttribute('dir', 'ltr');
  } else {
    header.options.setAttribute('horizontal-align', 'right');
    header.options.querySelector('paper-listbox').setAttribute('dir', 'rtl');
  }

  // Disable sidebar or style it to fit header's new sizing/placement.
  if (config.disable_sidebar) {
    kioskMode(true, false);
    insertStyleTags(config);
  } else if (config.hide_header) {
    insertStyleTags(config);
    kioskMode(false, true);
  } else if (!config.disable_sidebar && !config.kiosk_mode && !config.hide_header) {
    removeKioskMode();
    haElem.sidebar.main.shadowRoot.querySelector('.menu').style = 'height:49px;';
    haElem.sidebar.main.shadowRoot.querySelector('paper-listbox').style = 'height:calc(100% - 155px);';
    haElem.sidebar.main.shadowRoot.querySelector('div.divider').style = 'margin-bottom: -10px;';
    insertStyleTags(config);
  }

  // Remove chevrons.
  if (!config.chevrons) header.tabContainer.hideScrollButtons = true;
  else header.tabContainer.hideScrollButtons = false;

  // Current tab indicator on top.
  if (config.indicator_top) header.tabContainer.alignBottom = true;
  else header.tabContainer.alignBottom = false;

  // Set/remove attributes for footer mode.
  if (config.footer_mode) header.options.setAttribute('vertical-align', 'bottom');
  else header.options.removeAttribute('vertical-align');
  if (!config.footer_mode) header.container.setAttribute('slot', 'header');
  else header.container.removeAttribute('slot');

  // Tabs direction left to right or right to left.
  header.tabContainer.dir = config.reverse_tab_direction ? 'rtl' : 'ltr';
  header.container.dir = config.reverse_button_direction ? 'rtl' : 'ltr';

  // Tab icon customization.
  if (config.tab_icons && header.tabs.length) {
    for (const tab in config.tab_icons) {
      const index = tabIndexByName(tab);
      const haIcon = header.tabs[index].querySelector('ha-icon');
      if (!config.tab_icons[tab]) haIcon.icon = lovelace.config.views[index].icon;
      else haIcon.icon = config.tab_icons[tab];
    }
  }

  // Button icon customization.
  if (config.button_icons) {
    for (const button in config.button_icons) {
      if (!config.button_icons[button]) {
        if (button === 'menu') header.menu.icon = 'mdi:menu';
        else if (button === 'voice' && header.voice) header.voice.icon = 'mdi:microphone';
        else if (button === 'options') header[button].querySelector('paper-icon-button').icon = 'mdi:dots-vertical';
      } else {
        if (button === 'options') header[button].querySelector('paper-icon-button').icon = config.button_icons[button];
        else header[button].icon = config.button_icons[button];
      }
    }
  }

  // Button text customization
  if (config.button_text) {
    for (const button in config.button_text) {
      const text = document.createElement('p');
      text.className = 'buttonText';
      const buttonElem = button === 'options' ? header[button].querySelector('paper-icon-button') : header[button];
      if (!config.button_text[button] && buttonElem.shadowRoot.querySelector('.buttonText')) {
        buttonElem.shadowRoot.querySelector('.buttonText').remove();
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = '';
        buttonElem.style.width = '';
        continue;
      } else if (config.button_text[button]) {
        if (!buttonElem.shadowRoot.querySelector('.buttonText')) {
          text.innerHTML = config.button_text[button];
          buttonElem.shadowRoot.appendChild(text);
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').innerHTML = config.button_text[button];
        }
        buttonElem.shadowRoot.querySelector('.buttonText').dir = 'ltr';
        buttonElem.shadowRoot.querySelector('iron-icon').style.display = 'none';
        buttonElem.style.width = 'auto';
        if (config.button_text[button].includes('<br>')) {
          buttonElem.shadowRoot.querySelector('.buttonText').style.fontSize = '17px';
          buttonElem.shadowRoot.querySelector('.buttonText').style.lineHeight = '1.2';
          buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '-5px 0px 0px 0px';
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '5.5px 0px 0px 0px';
        }
      }
    }
  }

  redirects(config, header);

  if (!header.tabs.length) header.tabContainer.style.display = 'none';

  menuButtonObservers(config, header, root);

  if (!window.customHeaderShrink) {
    window.addEventListener('scroll', function(e) {
      const compact_mode =
        window.getComputedStyle(header.container.querySelector('#contentContainer')).getPropertyValue('display') ===
        'none';
      const footer_mode = window.getComputedStyle(header.container).getPropertyValue('bottom') === '0px';
      if (footer_mode || compact_mode) {
        return;
      } else {
        if (window.scrollY > 48) {
          header.container.style.top = '-48px';
          header.menu.style.marginTop = '48px';
          if (header.voice) header.voice.style.marginTop = '48px';
          header.options.style.marginTop = '48px';
        } else {
          header.container.style.transition = '0s';
          header.menu.style.transition = '0s';
          if (header.voice) header.voice.style.transition = '0s';
          header.options.style.transition = '0s';
          header.container.style.top = `-${window.scrollY}px`;
          header.menu.style.marginTop = `${window.scrollY}px`;
          if (header.voice) header.voice.style.marginTop = `${window.scrollY}px`;
          header.options.style.marginTop = `${window.scrollY}px`;
        }
        header.container.style.transition = '';
      }
    });
  }

  fireEvent(header.container, 'iron-resize');
};
