import { invertNumArray, subscribeRenderTemplate, processTabArray } from './helpers';
import { lovelace } from './ha-elements';
import { conditionalConfig } from './conditional-config';
import { styleHeader } from './style-header';
import { kioskMode } from './kiosk-mode';
import { defaultConfig } from './default-config';

export const buildConfig = () => {
  let config = { ...defaultConfig, ...lovelace.config.custom_header };
  config = { ...config, ...conditionalConfig(config) };
  const variables = config.template_variables;
  delete config.template_variables;

  const getBadTemplate = (result, error) => {
    const position = error.toString().match(/\d+/g)[0];
    const left = result.substr(0, position).match(/[^,]*$/);
    const right = result.substr(position).match(/^[^,]*/);
    return `${left ? left[0] : ''}${right ? right[0] : ''}`.replace('":"', ': "');
  };

  const processAndContinue = () => {
    if (config.hide_tabs) config.hide_tabs = processTabArray(config.hide_tabs);
    if (config.show_tabs) config.show_tabs = processTabArray(config.show_tabs);
    if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
    if (config.disable_sidebar || config.menu_dropdown) config.menu_hide = true;
    if (config.voice_dropdown) config.voice_hide = true;
    if (config.kiosk_mode && !config.disabled_mode) kioskMode(false);
    else styleHeader(config);
  };

  const configString = JSON.stringify(config);
  const hasTemplates = !!variables || configString.includes('{{') || configString.includes('{%');

  let unsubRenderTemplate;
  if (hasTemplates) {
    unsubRenderTemplate = subscribeRenderTemplate(
      result => {
        if (window.customHeaderLastTemplateResult == result) return;
        window.customHeaderLastTemplateResult = result;
        try {
          config = JSON.parse(
            result
              .replace(/"true"/gi, 'true')
              .replace(/"false"/gi, 'false')
              .replace(/""/, ''),
          );
        } catch (e) {
          console.log(`[CUSTOM-HEADER] There was an issue with the template: ${getBadTemplate(result, e)}`);
        }
        processAndContinue();
      },
      { template: JSON.stringify(variables).replace(/\\/g, '') + JSON.stringify(config).replace(/\\/g, '') },
    );
  } else {
    processAndContinue();
  }

  // Catch less helpful template errors.
  let templateFailed = false;
  (async () => {
    try {
      const test = await unsubRenderTemplate;
    } catch (e) {
      templateFailed = true;
      console.log('[CUSTOM-HEADER] There was an error with one or more of your templates:');
      console.log(`${e.message.substring(0, e.message.indexOf(')'))})`);
    }
  })();

  // Render templates every minute.
  if (hasTemplates) {
    window.setTimeout(() => {
      // Unsubscribe from template.
      if (templateFailed) return;
      (async () => {
        const unsub = await unsubRenderTemplate;
        unsubRenderTemplate = undefined;
        await unsub();
      })();
      buildConfig();
    }, (60 - new Date().getSeconds()) * 1000);
  }
};
