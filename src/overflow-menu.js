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
