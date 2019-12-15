---
title: Buttons
index: 3
---

## Button Config Options

Options with a :warning: remove the ability to edit from the UI. See [important notes](#intro/notes) on how to restore the default header if needed.

|NAME|TYPE|DEFAULT|DESCRIPTION|
|:-|:-|:-|:-|
|menu_hide|boolean|false|Hides the menu button.
|voice_hide|boolean|false|Hides the voice button.
|options_hide|boolean|false|Hides the options button. :warning:
|menu_dropdown|boolean|false|Places menu button in the options dropdown.
|voice_dropdown|boolean|false|Places voice button in the options dropdown.
|reverse_button_direction|boolean|false|Places buttons at opposite side of the window.
|button_icons|||Set the icon of each button. More info below.
|button_text|||Set text instead of an icon. More below.

### Button Icons

You can set any of the button's icons using `button_icons`.

```yaml
custom-header:
  button_icons:
    menu: mdi:skull
    voice: mdi:home
    options: mdi:death-star-variant
```

### Button Text

You can set any of the button's as text instead of icons using `button_text`.
The text may be 2 lines by seperating the strings with `<br>`.

```yaml
custom-header:
  button_text:
    menu: 'menu'
    # The next two options are using templates. See templates page for more info.
    voice: '{{ time }}<br>{{ date }}'
    options: '{{ states.weather.dark_sky.attributes.temperature }}'
```
