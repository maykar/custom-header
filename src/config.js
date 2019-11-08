import { processTabConfig, invertNumArray, lovelace } from './helpers';
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
  };

  const userConfig = { ...lovelace.config.custom_header };

  if (userConfig.hide_tabs) userConfig.hide_tabs = processTabConfig(userConfig.hide_tabs);
  if (userConfig.show_tabs) userConfig.show_tabs = processTabConfig(userConfig.show_tabs);
  if (userConfig.show_tabs) userConfig.hide_tabs = invertNumArray(userConfig.show_tabs);

  delete userConfig.show_tabs;

  const config = { ...defaultConfig, ...userConfig };

  async function subscribeRenderTemplate(onChange, params) {
    const conn = document.body.querySelector('home-assistant').hass.connection;
    const variables = {
      user: document.body.querySelector('home-assistant').hass.user.name,
      browser: navigator.userAgent,
      hash: location.hash.substr(1) || ' ',
      ...params.variables,
    };
    const template = params.template;
    const entity_ids = params.entity_ids;

    return conn.subscribeMessage(msg => onChange(msg.result), {
      type: 'render_template',
      template,
      variables,
      entity_ids,
    });
  }

  const templates = [];
  const configName = [];
  for (const template in config) {
    if (typeof config[template] === 'string' && (config[template].includes('{{') || config[template].includes('{%'))) {
      configName.push(template);
      templates.push(config[template]);
    }
  }

  for (let i = 0; i < templates.length; i += 1) {
    subscribeRenderTemplate(
      result => {
        config[configName[i]] = result;
        if ((i = templates.length - 1)) styleHeader(config);
      },
      { template: templates[i] },
    );
  }
};
