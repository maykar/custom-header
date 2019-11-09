import { processTabConfig, invertNumArray, lovelace, subscribeRenderTemplate } from './helpers';
import { conditionalConfig } from './conditional-config';
import { styleHeader } from './style-header';

export const buildConfig = () => {
  const defaultConfig = {
    footer: false,
    background: 'var(--primary-color)',
    elements_color: 'var(--text-primary-color)',
    menu_color: '',
    voice_color: '',
    options_color: '',
    all_tabs_color: '',
    tabs_color: [],
    chevrons: true,
    indicator_top: false,
    hide_tabs: [],
    show_tabs: [],
    template_variables: '',
    exceptions: [],
  };

  let config = { ...defaultConfig, ...lovelace.config.custom_header };
  config = { ...config, ...conditionalConfig(config) };
  const variables = config.template_variables;
  delete config.template_variables;

  subscribeRenderTemplate(
    result => {
      config = JSON.parse(
        result
          .replace(/"true"/gi, 'true')
          .replace(/"false"/gi, 'false')
          .replace(/""/, ''),
      );
      if (config.hide_tabs) config.hide_tabs = processTabConfig(config.hide_tabs);
      if (config.show_tabs) config.show_tabs = processTabConfig(config.show_tabs);
      if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
      delete config.show_tabs;
      styleHeader(config);
    },
    { template: JSON.stringify(variables).replace(/\\/g, '') + JSON.stringify(config).replace(/\\/g, '') },
  );
};
