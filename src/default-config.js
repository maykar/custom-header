const getThemeVar = themeVar => {
  return getComputedStyle(document.body).getPropertyValue(themeVar);
};

export const defaultConfig = {
  // Main config
  locale: [],
  header_text: 'Home Assistant',
  disabled_mode: false,
  kiosk_mode: false,
  compact_mode: false,
  footer_mode: false,
  disable_sidebar: false,
  chevrons: true,
  indicator_top: false,
  hidden_tab_redirect: true,

  // Colors
  background: getThemeVar('--ch-background') || 'var(--primary-color)',
  elements_color: getThemeVar('--ch-elements-color') || 'var(--text-primary-color)',
  menu_color: getThemeVar('--ch-menu-color') || '',
  voice_color: getThemeVar('--ch-voice-color') || '',
  options_color: getThemeVar('--ch-options-color') || '',
  all_tabs_color: getThemeVar('--ch-all-tabs-color') || '',
  notification_dot_color: getThemeVar('--ch-notification-dot-color') || '#ff9800',
  tab_indicator_color: getThemeVar('--ch-tab-indicator-color') || '',
  active_tab_color: getThemeVar('--ch-active-tab-color') || '',
  tabs_color: [],

  // Tabs
  hide_tabs: [],
  show_tabs: [],
  default_tab: 0,
  tab_icons: [],
  tab_direction: 'ltr',

  // Buttons
  button_icons: [],
  button_direction: 'ltr',
  menu_dropdown: false,
  menu_hide: false,
  voice_dropdown: false,
  voice_hide: false,
  options_hide: false,

  // Overflow menu items
  hide_help: false,
  hide_unused: false,
  hide_refresh: false,
  hide_config: false,
  hide_raw: false,

  // Custom CSS
  tabs_css: [],
  header_css: '',
  stack_css: '',
  header_text_css: '',
  active_tab_css: '',
  options_list_css: '',
  menu_css: '',
  options_css: '',
  voice_css: '',
  all_tabs_css: '',
  tab_container_css: '',
  view_css: '',
  panel_view_css: '',

  // Misc
  template_variables: '',
  exceptions: [],
  editor_warnings: true,
};
