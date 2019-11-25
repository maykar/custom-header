# **COMPACT CUSTOM HEADER**
Customize the header and add enhancements to Lovelace.

## <u>Features</u>

* Compact design that removes header text.
* Per user/device settings.
* Style & hide anything in the header & the header itself.
* Dynamically style header elements based on entity states/attributes.
* Add swipe navigation to Lovelace for mobile devices.
* Buttons can be hidden, turned into clock with optional date, or placed in the options menu.
* Hide tabs/buttons from user's and devices.
* Set a default/starting view.

## <u>Installation</u>

* There are 2 methods of installation: [Manually](#manual-installation) or with [HACS](#installation-and-tracking-with-hacs). Follow only one of these methods.
* [@thomasloven's lovelace guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins) is a great resource for installation of cards in lovelace and issues.
<br><br>
#### **Manual installation**

1. Install by copying [compact-custom-header.js](https://github.com/maykar/compact-custom-header/) to `www/custom-lovelace/compact-custom-header/`. [Be sure you're using the raw files from github](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins#2-download-the-plugin).

2. Add the code below to your resources and refresh the page.
```yaml
resources:
  # Add to the version number at the end of URL when updating.
  - url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
    type: module
```

<br><br>

#### **Installation and tracking with [HACS](https://github.com/custom-components/hacs)**

1. In the HACS store search for "CCH" and install.

2. Add the code below to your resources and refresh the page.

```yaml
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
```

<br>

## <u>Important notes</u>

* Hiding the header or the options button will remove your ability to edit from the UI.
* You can disable CCH by adding "?disable_cch" to the end of your URL.
* After using the raw config editor you will need to refresh the page to restore CCH.
* While in edit mode select "Show All Tabs" in the options menu to display hidden tabs.
<br><br>
## <u>Breaking Changes</u>

|Version|Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<dot style="color: #fff">.</dot>|Breaking Change|
|:-|:-|:-|
|1.3.0|July 16, 2019|On HA 0.96.0 and above it is no longer possible to modify the notifications button using CCH, `sidebar_closed` and `sidebar_swipe` options have been removed.
|1.1.0|Jun. 26, 2019| Configuration has changed. No longer required to use CCH as a card. [More info here](1_1_0_upgrade.md).
|1.0.2b9|Apr. 6, 2019|**“background _image”** and **“background_color”** have been replaced with just “background”.
|1.0.0b0|Feb. 10, 2019|Complete rewrite. Now **"type: module"** and most config options have changed.
|0.2.8|Jan. 22, 2019|**Tab numbering** in config options now starts at 0 to match Lovelace URLs.

<br>
**A big "Thank you!" to bramkragten, Ludeeus, iantrich, RomRider, thomasloven, balloob, and the community!**
