import {
  getLovelace, getRoot
} from 'custom-card-helpers';

import { processTabConfig } from "./helpers";

const defaultConfig = {
  footer: false,
  background: "var(--primary-color)",
  elements_color: "var(--text-primary-color)",
  menu_color: "",
  voice_color: "",
  options_color: "",
  all_tabs_color: "",
  tabs_color: [],
  chevrons: true,
  indicator_top: false,
  hide_tabs: [],
  show_tabs: []
};

const userConfig = { ...getLovelace().config.custom_header };

if (userConfig.hide_tabs) userConfig.hide_tabs = processTabConfig(userConfig.hide_tabs);
if (userConfig.show_tabs) userConfig.show_tabs = processTabConfig(userConfig.show_tabs);

// Invert show_tabs to hide_tabs
const tabs = Array.from(getRoot().querySelectorAll("paper-tab"));
if (userConfig.show_tabs && userConfig.show_tabs.length) {
  const total_tabs = [];
  for (let i = 0; i < tabs.length; i += 1) { total_tabs.push(i); }
  userConfig.hide_tabs = total_tabs.filter((el) => !userConfig.show_tabs.includes(el));
}

export const config = { ...defaultConfig, ...userConfig };
