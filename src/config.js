import { lovelace } from "./get-root";

export const defaultConfig = {
  footer: false,
  background: "var(--primary-color)",
  elements_color: "var(--text-primary-color)",
  menu_color: "",
  voice_color: "",
  options_color: "",
  tabs_color: ""
};

export const config = { ...defaultConfig, ...lovelace.config.custom_header };
