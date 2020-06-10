---
title: Exception Config
index: 5
---

<style>item{color:#f92672;font-weight: bold;}</style>

## Exception Configuration

You can have different settings depending on the conditions listed below. When using multiple conditions each one needs to match to use the exception's config. For more complicated conditions including "not" and "or" conditions use the template condition.

- <item>user:</item> A user or a comma separated list of multiple users. This is the Home Assistant user's name, **not username** (if they're different) or an user's ID. You can look to the bottom of the Custom Header editor or in the HA user list to see which to use. This option is case sensitive.
- <item>user_agent:</item> A matching word or phrase from the devices user agent. You can find this at the bottom of the Custom Header settings or by [googling "what's my user agent"](http://www.google.com/search?q=whats+my+user+agent) on the device in question. This option is case sensitive, enclose in quotes if including special characters and not using editor.
- <item>media_query:</item> A valid [CSS media query](https://www.w3schools.com/css/css_rwd_mediaqueries.asp). Enclose in quotes if not using editor.
- <item>query_string:</item> A matching string following a question mark appended to the end of the URL (e.g. `http://192.168.1.42:8123/lovelace/0?kiosk`).
- <item>tab:</item> View/tab. Accepts ranges, paths, index, and titles. Can use a comma seperated list of tabs as well.
- <item>device_id:</item> This is a generated ID for the current device. It uses the card-tools implimentation, but doesn't require card-tools. [More info](https://github.com/thomasloven/lovelace-card-tools#card-toolssrcdeviceid).
- <item>is_admin:</item> Set to true for target admin users, false for non-admins.
- <item>is_owner:</item> Set to true for target the "owner" user, false for non-owner.
- <item>template:</item> Jinja template, must return a Boolean (true or false).

Under exceptions set your conditions and then set up the config to use below that. If a config item is left out of an exception's config the main config's value is used.

```yaml
custom_header:
  compact_mode: true
  exceptions:
    - conditions:
        user: maykar
      config:
        hide_help: true
        menu_dropdown: true
    - conditions:
        user: maykar, Bram Kragten, Ludeeus
        user_agent: Mobile
        media_query: "(max-width: 600px)"
      config:
        footer_mode: true
        reverse_button_direction: true
        reverse_tab_direction: true
    - conditions:
        query_string: kiosk
      config:
        kiosk_mode: true
```
