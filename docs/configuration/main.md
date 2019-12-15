---
title: Main Config
index: 2
---

## Main Config Options

Options with a :warning: remove the ability to edit from the UI. See [important notes](#intro/notes) on how to restore the default header if needed.

|NAME|TYPE|DEFAULT|DESCRIPTION|
|:-|:-|:-|:-|
|header_text|string|'Home Assistant'|Replace the main header text.
|disabled_mode|boolean|false|Disables Custom Header and returns the default HA header.
|kiosk_mode|boolean|false|Hides the header and sidebar completely. :warning:
|compact_mode|boolean|false|Compacts the header to about half the size while keeping all functionality.
|footer_mode|boolean|false|Places the header at the bottom of the page.
|disable_sidebar|boolean|false|Disables and hides the sidebar and menu button.
|hide_help|boolean|false|Hides the "Help" option in the options menu.
|hide_unused|boolean|false|Hides the "Unused Entities" option in the options menu.
|hide_refresh|boolean|false|Hides the "Refresh" option in the options menu.
|hide_config|boolean|false|Hides the "Configure UI" option in the options menu. :warning:
|hide_raw|boolean|false|Hides the "Raw Config Editor" option in the options menu. :warning:

### Example

```yaml
custom-header:
  header_text: '{{ time }}' # See templates section for more on this.
  compact_mode: true
  footer_mode: true
  hide_help: true
```
