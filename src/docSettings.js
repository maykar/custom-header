/* eslint-disable prettier/prettier */
// Global settings for the documentation website

// Icons from https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html

module.exports = {
  siteName: 'Documentation Demo Site',
  siteDescription: '',
  welcomeCategory: 'installation',
  siteURL: 'https://maykar.github.io/polymer-docs-template',
  github: 'https://github.com/maykar/polymer-docs-template',
  sideBar: [
    {
      category: 'installation',
      icon: 'icons:arrow-downward',
    },
    {
      category: 'configuration',
      icon: 'icons:create',
    },
  ],
  sideBarLinks: [
    {
      link: 'https://github.com/maykar/polymer-docs-template',
      caption: 'GitHub',
    },
    {
      link: 'https://github.com/maykar/polymer-docs-template/issues',
      caption: 'Issues',
    },
  ],
  sideBarBottom: [
    {
      category: 'developer-tools',
      icon: 'icons:build',
    },
    {
      category: 'faq',
      icon: 'icons:help',
    },
  ],
};
