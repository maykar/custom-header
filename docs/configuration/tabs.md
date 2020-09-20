---
title: Tabs
index: 4
---

## Tab Config Options

| NAME                  | TYPE          | DEFAULT | DESCRIPTION                                                                                |
| :-------------------- | :------------ | :------ | :----------------------------------------------------------------------------------------- |
| chevrons              | Boolean       | true    | Enables/disables the scroll arrows for the tabs                                            |
| indicator_top         | Boolean       | false   | Places the current tab indicator on top of the tab                                         |
| default_tab           | number/string |         | The default tab when entering Lovelace. Use "null" to override default for exceptions.     |
| reverse_tab_direction | Boolean       | false   | Places tabs at opposite side of the window in reverse order                                |
| fit_tabs              | Boolean       | false   | If the number of tabs fits on screen, fill the header's width with them                    |
| hide_tabs             | string        |         | An array or comma separated string of tabs to hide, more info below                        |
| show_tabs             | string        |         | An array or comma separated string of tabs to show, more info below                        |
| hidden_tab_redirect   | Boolean       | true    | Automatically redirects off hidden tabs to either the default tab or the first visible tab |
| tab_icons_and_text    | Boolean       | false   | Display both the icon and text on tabs                                                     |
| tab_text_only         | Boolean       | false   | Display only text on tabs                                                                  |
| tab_icons             | string        |         | Set the icon of each tab, useful for templates, more info below                            |
| tab_text              | string        |         | Set the text of each tab, useful for templates, more info below                            |

### Hide/Show Tabs

- hide_tabs and show_tabs shouln't be used together, show_tabs will always override hide_tabs
- hide_tabs, show_tabs, tab_icons, and tab_text accept a tab/views index number, title, path, or a comma separated list of tabs. They can also accept ranges like so: `5 to 9`

```yaml
custom_header:
  hide_tabs: '5 to 9, 0, home'
```

or an array of tabs:

```yaml
custom_header:
  hide_tabs:
    - 5 to 9
    - 0
    - home
```

### Tab Icons and Text

These options are mostly useful when used with [templates](#templates). The tab/view must already have an icon in your lovelace config to use this option. 'none' is a valid option for icons, but if not used with and icon and `tab_icons_and_text: true` then it will display as blank and not be selectable.

```yaml
custom_header:
  tab_icons_and_text: true
  tab_icons:
    0: mdi:skull
    home: none
    7: mdi:death-star-variant
  tab_text:
    0: Skull
    home: '{{ time }}
```
