/* eslint-disable prettier/prettier */
// Global settings for the documentation website

// Icons from https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html

module.exports = {
  siteName: 'Custom Header',
  siteDescription: "Custom Header adds enhancements and customization options to Home Assistant's Lovelace header.",
  welcomeCategory: 'intro',
  menuTitle: '',
  siteURL: 'https://maykar.github.io/custom-header',
  github: 'https://github.com/maykar/custom-header',
  branch: 'gh-pages',
  sideBar: [
    {
      category: 'intro',
      icon: 'mdi:home',
    },
  ],
  sideBarBottom: [
    {
      category: 'development',
      icon: 'mdi:code-braces-box',
    },
  ],
  sideBarLinks: [
    {
      link: 'https://github.com/maykar/custom-header',
      caption: 'GitHub',
      icon: 'mdi:github-circle',
    },
    {
      link: 'https://github.com/maykar/custom-header/issues',
      caption: 'Issues',
      icon: 'mdi:alert-circle',
    },
  ],
};
