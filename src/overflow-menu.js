import { hass, root } from './helpers';

export const hideMenuItems = (config, header) => {
  if (config.hide_help || config.hide_config || config.hide_unused) {
    const localized = (item, string) => {
      let localString;
      if (string === 'raw_editor') localString = hass.localize('ui.panel.lovelace.editor.menu.raw_editor');
      else localString = hass.localize(`ui.panel.lovelace.menu.${string}`);
      return item.innerHTML.includes(localString) || item.getAttribute('aria-label') == localString;
    };
    (header.options || root.shadowRoot.querySelector('paper-menu-button'))
      .querySelector('paper-listbox')
      .querySelectorAll('paper-item')
      .forEach(item => {
        if (
          (config.hide_help && localized(item, 'help')) ||
          (config.hide_unused && localized(item, 'unused_entities')) ||
          (config.hide_config && localized(item, 'configure_ui')) ||
          (config.hide_refresh && localized(item, 'refresh')) ||
          (config.hide_config && localized(item, 'configure_ui')) ||
          (config.hide_raw && localized(item, 'raw_editor'))
        ) {
          item.parentNode.removeChild(item);
        }
      });
  }
};
