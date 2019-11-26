import './editor';
import { header } from './build-header';
import { root, lovelace } from './ha-elements';

export const hideMenuItems = (config, header, editMode) => {
  const localized = (item, string) => {
    let localString;
    const hass = document.querySelector('home-assistant').hass;
    if (string === 'raw_editor') localString = hass.localize('ui.panel.lovelace.editor.menu.raw_editor');
    else if (string == 'unused_entities') localString = hass.localize('ui.panel.lovelace.unused_entities.title');
    else localString = hass.localize(`ui.panel.lovelace.menu.${string}`);
    return item.innerHTML.includes(localString) || item.getAttribute('aria-label') == localString;
  };
  (!editMode
    ? header.options
    : document
        .querySelector('home-assistant')
        .shadowRoot.querySelector('home-assistant-main')
        .shadowRoot.querySelector('ha-panel-lovelace')
        .shadowRoot.querySelector('hui-root')
        .shadowRoot.querySelector('app-toolbar > paper-menu-button')
  )
    .querySelector('paper-listbox')
    .querySelectorAll('paper-item')
    .forEach(item => {
      if (
        (config.hide_help && localized(item, 'help')) ||
        (config.hide_unused && localized(item, 'unused_entities')) ||
        (config.hide_refresh && localized(item, 'refresh')) ||
        (config.hide_config && localized(item, 'configure_ui')) ||
        (config.hide_raw && localized(item, 'raw_editor'))
      ) {
        item.style.display = 'none';
      } else {
        item.style.display = '';
      }
    });
};

// Add button to overflow menu.
export const buttonToOverflow = (item, mdiIcon, header, config) => {
  if (header.options.querySelector(`#${item.toLowerCase()}_dropdown`)) {
    header.options.querySelector(`#${item.toLowerCase()}_dropdown`).remove();
  }
  const paperItem = document.createElement('paper-item');
  const icon = document.createElement('ha-icon');
  paperItem.setAttribute('id', `${item.toLowerCase()}_dropdown`);
  icon.setAttribute('icon', config.button_icons[item.toLowerCase()] || mdiIcon);
  icon.style.pointerEvents = 'none';
  if (config.reverse_button_direction) icon.style.marginLeft = 'auto';
  else icon.style.marginRight = 'auto';
  paperItem.innerText = item;
  paperItem.appendChild(icon);
  paperItem.addEventListener('click', () => {
    header[item.toLowerCase()].click();
  });
  icon.addEventListener('click', () => {
    header[item.toLowerCase()].click();
  });
  header.options.querySelector('paper-listbox').appendChild(paperItem);
};

const showEditor = () => {
  window.scrollTo(0, 0);
  if (!root.querySelector('ha-app-layout editor')) {
    const container = document.createElement('editor');
    const nest = document.createElement('div');
    nest.style.cssText = `
      padding: 20px;
      max-width: 600px;
      margin: 15px auto;
      background: var(--paper-card-background-color);
      border: 6px solid var(--paper-card-background-color);
    `;
    container.style.cssText = `
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      position: absolute;
      background: var(--background-color, grey);
      z-index: 2;
      padding: 5px;
    `;
    root.querySelector('ha-app-layout').insertBefore(container, root.querySelector('#view'));
    container.appendChild(nest);
    nest.appendChild(document.createElement('custom-header-editor'));
  }
};

if (lovelace.mode === 'storage') {
  const chSettings = document.createElement('paper-item');
  chSettings.setAttribute('id', 'ch_settings');
  chSettings.addEventListener('click', () => showEditor());
  chSettings.innerHTML = 'Custom Header';
  const paperItems = header.options.querySelector('paper-listbox').querySelectorAll('paper-item');
  if (!header.options.querySelector('paper-listbox').querySelector(`#ch_settings`)) {
    header.options.querySelector('paper-listbox').insertBefore(chSettings, paperItems[paperItems.length]);
  }
}
