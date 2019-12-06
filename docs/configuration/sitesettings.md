---
title: siteSettings.js
index: 3
---

## siteName

_This is the name of your site_

## siteDescription

_This is the description of your site_

## welcomeCategory

_This is the default category of your site_

## siteURL

_This is the full URL that you access your site_

## github

_This is the URL to your GitHub repo_

## branch

_This is the name of the branch your docs are in_

## sideBar

_This a list of categories you want to list at the main part (top) of the sidebar_

**example:**

```txt
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

```

## sideBarBottom

_This a list of categories you want to list at the bottom part of the sidebar_

**example:**

```txt
  sideBarBottom: [
    {
      category: 'faq',
      icon: 'icons:help',
    },
  ],

```

## sideBarLinks

_This a list of external links you want to list at the bottom part of the sidebar_

**example:**

```txt
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

```