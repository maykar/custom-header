---
title: Installation
index: 1
---

## Installation with HACS

[HACS](https://github.com/custom-components/hacs) is a custom integration that allows you to search for, discover, install, and manage custom additions to Home Assistant.

1. In HACS click "Frontend", then the plus in the bottom right.
2. Search for "custom header" and click install.

## Manual Installation

1. Download `custom-header.js` from the bottom of the [latest release page](https://github.com/maykar/custom-header/releases/latest) and place it in `www/custom-lovelace/compact-custom-header/` or another folder of your choosing (change url below to match).

2. Go to your Lovelace dashboard resources found under "Configuration" in your sidebar: `Configuration > Lovelace Dashboards > Resources`. Click the plus icon on the bottom right and add `/local/custom-lovelace/custom-header/custom-header.js?v=0.0.1` as your URL and select "Javascript Module" as the resource type. Any time you update you need to change version number at the end of the URL `?v=0.0.1`.
