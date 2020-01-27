import { invertNumArray, subscribeRenderTemplate, processTabArray } from './helpers';
import { lovelace, root } from './ha-elements';
import { conditionalConfig } from './conditional-config';
import { styleHeader } from './style-header';
import { defaultConfig } from './default-config';
import { observers } from './observers';

window.customHeaderExceptionConfig = 'init';
export const buildConfig = config => {
  const defaultConf = defaultConfig();
  if (!config) config = { ...defaultConf, ...lovelace.config.custom_header };
  const testConfig = { ...config, ...conditionalConfig(config) };
  const variables = config.template_variables;
  delete config.template_variables;

  const getBadTemplate = (result, error) => {
    const position = error.toString().match(/\d+/g)[0];
    const left = result.substr(0, position).match(/[^,]*$/);
    const right = result.substr(position).match(/^[^,]*/);
    return `${left ? left[0] : ''}${right ? right[0] : ''}`.replace('":"', ': "');
  };

  const disabled =
    (typeof testConfig.disabled_mode == 'boolean' && testConfig.disabled_mode) ||
    (typeof testConfig.disabled_mode == 'string' &&
      !testConfig.disabled_mode.includes('{{') &&
      !testConfig.disabled_mode.includes('{%')) ||
    window.location.href.includes('disable_ch');

  const processAndContinue = () => {
    config = { ...config, ...conditionalConfig(config) };
    if (config.hide_tabs) config.hide_tabs = processTabArray(config.hide_tabs);
    if (config.show_tabs) config.show_tabs = processTabArray(config.show_tabs);
    if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
    if (config.disable_sidebar || config.menu_dropdown) config.menu_hide = true;
    if (config.voice_dropdown) config.voice_hide = true;
    if (config.header_text != undefined && config.header_text == '') config.header_text = defaultConf.header_text;
    if (config.header_text && config.header_text == ' ') config.header_text = '&nbsp;';
    if (config.hide_header && config.disable_sidebar) {
      config.kiosk_mode = true;
      config.hide_header = false;
      config.disable_sidebar = false;
    }
    if (config.test_template != undefined) {
      if (disabled) {
        console.log(`Custom Header cannot render templates while disabled.`);
      } else if (
        typeof config.test_template == 'string' &&
        (config.test_template.toLowerCase().includes('true') || config.test_template.toLowerCase().includes('false'))
      ) {
        console.log(`Custom Header test returned: "${config.test_template}"`);
        console.log(`Warning: Boolean is returned as string instead of Boolean.`);
      } else if (typeof config.test_template == 'string') {
        console.log(`Custom Header test returned: "${config.test_template}"`);
      } else {
        console.log(`Custom Header test returned: ${config.test_template}`);
      }
    }
    window.customHeaderConfig = config;
    styleHeader(config);
    if (!window.customHeaderObservers) {
      observers();
      window.customHeaderObservers = true;
    }
  };

  const configString = JSON.stringify(config);
  const hasTemplates = !!variables || configString.includes('{{') || configString.includes('{%');

  let templateFailed = false;
  let unsubRenderTemplate;
  if (hasTemplates && !disabled) {
    if (typeof window.unsub === 'function') {
      window.unsub();
      window.unsub = null;
    }
    unsubRenderTemplate = subscribeRenderTemplate(
      result => {
        if (
          window.customHeaderLastTemplateResult == result &&
          window.customHeaderLastExceptionConfig == window.customHeaderExceptionConfig
        ) {
          return;
        }
        window.customHeaderLastExceptionConfig = window.customHeaderExceptionConfig;
        window.customHeaderLastTemplateResult = result;
        try {
          config = JSON.parse(
            result
              .replace(/"true"/gi, 'true')
              .replace(/"false"/gi, 'false')
              .replace(/""/, ''),
          );
        } catch (e) {
          templateFailed = true;
          let err = `[CUSTOM-HEADER] There was an issue with the template: ${getBadTemplate(result, e)}`;
          if (err.includes('locale')) err = '[CUSTOM-HEADER] There was an issue one of your "template_variables".';
          console.log(err);
        }
        processAndContinue();
      },
      { template: JSON.stringify(variables).replace(/\\/g, '') + JSON.stringify(config).replace(/\\/g, '') },
      config.locale,
    );

    // Catch less helpful template errors.
    (async () => {
      try {
        window.unsub = await unsubRenderTemplate;
      } catch (e) {
        templateFailed = true;
        console.log('[CUSTOM-HEADER] There was an error with one or more of your templates:');
        console.log(`${e.message.substring(0, e.message.indexOf(')'))})`);
      }
    })();

    clearTimeout(window.customHeaderTempTimeout);
    // Render templates every minute.
    window.customHeaderTempTimeout = window.setTimeout(() => {
      const panelLovelace = document
        .querySelector('home-assistant')
        .shadowRoot.querySelector('home-assistant-main')
        .shadowRoot.querySelector('ha-panel-lovelace');
      const editor = panelLovelace ? panelLovelace.shadowRoot.querySelector('hui-editor') : null;
      if (editor || templateFailed || root.querySelector('custom-header-editor')) return;
      buildConfig();
    }, (60 - new Date().getSeconds()) * 1000);
    window.customHeaderTempTimeout;
  } else {
    processAndContinue();
  }
};
