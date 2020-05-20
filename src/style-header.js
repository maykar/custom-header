import { tabIndexByName } from './helpers';
import { hideMenuItems, buttonToOverflow, insertSettings } from './overflow-menu';
import { kioskMode, removeKioskMode } from './kiosk-mode';
import { menuButtonObservers } from './menu-observers';
import { insertStyleTags } from './style-tags';
import { redirects } from './redirects';
import { fireEvent } from 'custom-card-helpers';
import { selectTab } from './observers';
import { ha_elements } from './ha-elements';

export const styleHeader = (config, ch, haElem = ha_elements()) => {
  if (!haElem) return;
  insertSettings(ch.header, config, haElem);
  insertSettings(ch.header, config, haElem);

  if (window.location.href.includes('disable_ch')) config.disabled_mode = true;
  if (config.disabled_mode) {
    window.customHeaderDisabled = true;
    removeKioskMode(haElem);
    haElem.appHeader.style.display = '';
    if (ch.header.container) ch.header.container.style.visibility = 'hidden';
    if (ch.footer.container) ch.footer.container.style.visibility = 'hidden';
    if (haElem.root.querySelector('#ch_header_style')) haElem.root.querySelector('#ch_header_style').remove();
    if (haElem.root.querySelector('#ch_view_style')) haElem.root.querySelector('#ch_view_style').remove();
    if (ch.header.tabContainer.shadowRoot.querySelector('#ch_chevron')) {
      ch.header.tabContainer.shadowRoot.querySelector('#ch_chevron').remove();
      ch.footer.tabContainer.shadowRoot.querySelector('#ch_chevron').remove();
    }
    ch.header.menu.style.display = 'none';
    haElem.root.querySelector('ha-menu-button').style.display = '';
    haElem.sidebar.main.querySelector('.menu').style = '';
    haElem.sidebar.main.querySelector('paper-listbox').style = '';
    haElem.sidebar.main.querySelector('div.divider').style = '';
    window.dispatchEvent(new Event('resize'));
    return;
  } else {
    window.customHeaderDisabled = false;
    hideMenuItems(config, ch.header, false, haElem);
    ch.header.menu.style.display = '';
    if (ch.header.container) ch.header.container.style.visibility = 'visible';
    if (ch.footer.container) ch.footer.container.style.visibility = 'visible';
  }

  if (!config.compact_mode && !config.button_scroll) {
    ch.header.tabContainer.style.display = 'none';
    ch.footer.container.style.display = '';
  } else {
    ch.header.tabContainer.style.display = '';
    ch.footer.container.style.display = 'none';
  }

  if (config.split_mode) {
    ch.header.tabContainer.style.display = 'none';
    if (config.footer_mode) ch.footer.container.setAttribute('slot', 'header');
    else ch.footer.container.setAttribute('slot', '');
  } else if (!config.footer_mode) {
    ch.footer.container.setAttribute('slot', 'header');
  } else if (config.footer_mode) {
    ch.footer.container.setAttribute('slot', '');
  }

  const headerType = config.compact_mode || config.button_scroll ? ch.header : ch.footer;

  if (!ch.header.tabs.length) config.compact_mode = false;

  if (config.menu_dropdown && !config.disable_sidebar) buttonToOverflow('Menu', 'mdi:menu', ch.header, config);
  else if (ch.header.options.querySelector(`#menu_dropdown`))
    ch.header.options.querySelector(`#menu_dropdown`).remove();
  if (config.voice_dropdown) buttonToOverflow('Voice', 'mdi:microphone', ch.header, config);
  else if (ch.header.options.querySelector(`#voice_dropdown`))
    ch.header.options.querySelector(`#voice_dropdown`).remove();

  // Style overflow menu depending on position.
  if (config.reverse_button_direction) {
    ch.header.options.setAttribute('horizontal-align', 'left');
    ch.header.options.querySelector('paper-listbox').setAttribute('dir', 'ltr');
  } else {
    ch.header.options.setAttribute('horizontal-align', 'right');
    ch.header.options.querySelector('paper-listbox').setAttribute('dir', 'rtl');
  }

  const style = document.createElement('style');
  style.setAttribute('id', 'ch_header_style');
  style.innerHTML = `
    .menu, paper-listbox {
      transition: height 0.1s ease-in-out 0s;
    }
    .divider {
      transition: margin-bottom 0.1s ease-in-out 0s;
    }
  `;
  haElem.sidebar.main.appendChild(style);

  // Disable sidebar or style it to fit header's new sizing/placement.
  if (config.kiosk_mode && !config.disabled_mode) {
    insertStyleTags(config, ch, haElem);
    kioskMode(haElem, false, false, config);
  } else if (config.disable_sidebar) {
    kioskMode(haElem, true, false, config);
    insertStyleTags(config, ch, haElem);
  } else if (config.hide_header) {
    insertStyleTags(config, ch, haElem);
    kioskMode(haElem, false, true, config);
  } else if (!config.disable_sidebar && !config.kiosk_mode && !config.hide_header) {
    removeKioskMode(haElem);
    if (config.compact_mode && !config.footer_mode) {
      haElem.sidebar.main.querySelector('.menu').style = 'height:49px;';
      haElem.sidebar.main.querySelector('paper-listbox').style = 'height:calc(100% - 175px);';
      haElem.sidebar.main.querySelector('div.divider').style = '';
    } else if (config.footer_mode && !config.split_mode) {
      haElem.sidebar.main.querySelector('.menu').style = '';
      haElem.sidebar.main.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
      haElem.sidebar.main.querySelector('div.divider').style = 'margin-bottom: -10px;';
    } else if (config.split_mode) {
      haElem.sidebar.main.querySelector('.menu').style = 'height:49px;';
      haElem.sidebar.main.querySelector('paper-listbox').style = 'height: calc(100% - 170px);';
      haElem.sidebar.main.querySelector('div.divider').style = 'margin-bottom: -3px;';
    } else {
      haElem.sidebar.main.querySelector('.menu').style = '';
      haElem.sidebar.main.querySelector('paper-listbox').style = '';
      haElem.sidebar.main.querySelector('div.divider').style = '';
    }
    insertStyleTags(config, ch, haElem);
  }

  // Remove chevrons.
  if (!config.chevrons) headerType.tabContainer.hideScrollButtons = true;
  else headerType.tabContainer.hideScrollButtons = false;

  // Current tab indicator on top.
  if (config.indicator_top) headerType.tabContainer.alignBottom = true;
  else headerType.tabContainer.alignBottom = false;

  // Set/remove attributes for footer mode.
  if (config.footer_mode) ch.header.options.setAttribute('vertical-align', 'bottom');
  else ch.header.options.removeAttribute('vertical-align');
  if (!config.footer_mode) ch.header.container.setAttribute('slot', 'header');
  else ch.header.container.removeAttribute('slot');

  // Tabs direction left to right or right to left.
  headerType.tabContainer.dir = config.reverse_tab_direction ? 'rtl' : 'ltr';
  ch.header.container.dir = config.reverse_button_direction ? 'rtl' : 'ltr';

  // Tab icon customization.
  if (config.tab_icons && headerType.tabs.length) {
    for (const tab in config.tab_icons) {
      const index = tabIndexByName(tab);
      const haIcon = headerType.tabs[index].querySelector('ha-icon');
      if (!config.tab_icons[tab]) haIcon.icon = haElem.lovelace.config.views[index].icon;
      else haIcon.icon = config.tab_icons[tab];
    }
  }

  // Button icon customization.
  if (config.button_icons) {
    for (const button in config.button_icons) {
      if (!ch.header[button]) continue;
      if (!config.button_icons[button]) {
        if (button === 'menu') ch.header.menu.icon = 'mdi:menu';
        else if (button === 'voice' && ch.header.voice) ch.header.voice.icon = 'mdi:microphone';
        else if (button === 'options') {
          ch.header[button].querySelector('ha-icon-button, paper-icon-button').icon = 'mdi:dots-vertical';
        }
      } else {
        if (button === 'options')
          ch.header[button].querySelector('ha-icon-button, paper-icon-button').icon = config.button_icons[button];
        else ch.header[button].icon = config.button_icons[button];
      }
    }
  }

  // Button text customization
  if (config.button_text) {
    for (const button in config.button_text) {
      const text = document.createElement('p');
      text.className = 'buttonText';
      const buttonElem =
        button === 'options' ? ch.header[button].querySelector('ha-icon-button, paper-icon-button') : ch.header[button];
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
        if (button == 'menu') {
          buttonElem.shadowRoot.querySelector('.buttonText').style.textAlign = config.reverse_button_direction
            ? 'right'
            : 'left';
        } else {
          buttonElem.shadowRoot.querySelector('.buttonText').style.textAlign = config.reverse_button_direction
            ? 'left'
            : 'right';
        }
        if (buttonElem.shadowRoot.querySelector('mwc-icon-button, iron-icon')) {
          buttonElem.shadowRoot.querySelector('mwc-icon-button, iron-icon').style.display = 'none';
          buttonElem.style.width = 'auto';
          if (config.button_text[button].includes('<br>')) {
            if (buttonElem.shadowRoot.querySelector('mwc-icon-button')) {
              buttonElem.shadowRoot.querySelector('.buttonText').style.fontSize = '17px';
              buttonElem.shadowRoot.querySelector('.buttonText').style.lineHeight = '1.2';
              buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '4.5px 0px 0px 0px';
            } else {
              buttonElem.shadowRoot.querySelector('.buttonText').style.fontSize = '17px';
              buttonElem.shadowRoot.querySelector('.buttonText').style.lineHeight = '1.2';
              buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '-5px 0px 0px 0px';
            }
          } else {
            if (buttonElem.shadowRoot.querySelector('mwc-icon-button')) {
              buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '12px 0px 0px 0px';
            } else {
              buttonElem.shadowRoot.querySelector('.buttonText').style.margin = '5.5px 0px 0px 0px';
            }
          }
        }
      }
    }
  }

  if (!headerType.tabs.length) headerType.tabContainer.style.display = 'none';

  menuButtonObservers(config, ch, haElem);

  if (!window.customHeaderShrink && !config.split_mode && !config.footer_mode) {
    window.customHeaderShrink = true;
    window.addEventListener('scroll', function(e) {
      const compact_mode =
        window
          .getComputedStyle(ch.header.container.querySelector('#ch-content-container'))
          .getPropertyValue('display') === 'none';
      const footer_mode = window.getComputedStyle(ch.header.container).getPropertyValue('bottom') === '0px';
      if (footer_mode || compact_mode) {
        return;
      } else if (config.button_scroll) {
        if (window.scrollY > 48) {
          ch.header.container.style.top = '-48px';
          ch.header.menu.style.marginTop = '48px';
          if (ch.header.voice) ch.header.voice.style.marginTop = '48px';
          ch.header.options.style.marginTop = '48px';
        } else {
          ch.header.container.style.transition = '0s';
          ch.header.menu.style.transition = '0s';
          if (ch.header.voice) ch.header.voice.style.transition = '0s';
          ch.header.options.style.transition = '0s';
          ch.header.container.style.top = `-${window.scrollY}px`;
          ch.header.menu.style.marginTop = `${window.scrollY}px`;
          if (ch.header.voice) ch.header.voice.style.marginTop = `${window.scrollY}px`;
          ch.header.options.style.marginTop = `${window.scrollY}px`;
        }
        ch.header.container.style.transition = '';
      } else {
        if (window.scrollY > 48) {
          ch.header.container.style.top = '-48px';
        } else {
          ch.header.container.style.transition = '0s';
          ch.header.container.style.top = `-${window.scrollY}px`;
        }
        ch.header.container.style.transition = '';
      }
    });
  }

  const shadowScroll = () => {
    if (window.scrollY > 15) ch.footer.container.style.boxShadow = '0px 0px 5px 5px rgba(0,0,0,0.2)';
    else ch.footer.container.style.boxShadow = '0px 0px 5px 5px rgba(0,0,0,0)';
  };

  if (!window.customHeaderShadow && !config.footer_mode && !config.split_mode && config.shadow) {
    window.customHeaderShadow = true;
    window.addEventListener('scroll', shadowScroll);
  } else {
    window.removeEventListener('scroll', shadowScroll);
  }

  fireEvent(ch.header.container, 'iron-resize');
  redirects(config, ch);
  selectTab(config, ch);
};
