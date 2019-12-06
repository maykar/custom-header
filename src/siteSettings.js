/* eslint-disable prettier/prettier */
// Global settings for the documentation website

// Icons from https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html

module.exports = {
  siteName: 'Documentation Demo Site',
  siteDescription: '',
  welcomeCategory: 'intro',
  siteURL: 'https://maykar.github.io/polymer-docs-template',
  github: 'https://github.com/maykar/polymer-docs-template',
  branch: 'master',
  sideBar: [
    {
      category: 'intro',
      icon: 'icons:home',
    },
    {
      category: 'installation',
      icon: 'icons:arrow-downward',
    },
    {
      category: 'configuration',
      icon: 'icons:create',
    },
  ],
  sideBarBottom: [
    {
      category: 'faq',
      icon: 'icons:help',
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
};
