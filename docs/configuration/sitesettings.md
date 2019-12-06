---
title: siteSettings.js
index: 3
---

## Site Settings

Use the siteSettings.js file to setup your docs site's general settings. See example below for the siteSettings.js for this site.

Icons are from [iron-icons](https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html).

|SETTING|DESCRIPTION
|-|-|
|siteName|Name of the site.
|siteDescription|Description of the site.
|welcomeCategory|Default category.
|siteURL|Full URL to access the site.
|github|URL to GitHub repo
|branch|Branch your docs exist in.
|sideBar|List of the categories for the top of the sidebar.
|sideBarBottom|List of the categories for the bottom of the sidebar.
|sideBarLinks|List of external links you want to list at footer of the sidebar.

**example:**

```js
module.exports = {
  siteName: 'Documentation Demo Site',
  siteDescription: '',
  welcomeCategory: 'intro',
  siteURL: 'https://maykar.github.io/polymer-docs-template',
  github: 'https://github.com/maykar/polymer-docs-template',
  branch: "master",
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

```
