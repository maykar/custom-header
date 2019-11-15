# Lovelace custom-header

Current config options. Place at root of lovelace yaml (the following config
will result in one ugly header/footer):

* EVERY Config item can be templated with Jinja and updates dynamically with entity changes, etc.
* Can use exception config just like CCH: https://maykar.github.io/compact-custom-header/Exception-Config/
* hide_tabs and show_tabs can also be written as `hide_tabs: 1, home, 10`
* Ranges may also be used for hide/show tabs: `show_tabs: 0 to 10`

```yaml
custom_header:
  footer_mode: true
  kiosk_mode: false
  disabled_mode: false
  compact_mode: false
  mobile_mode: false        # Turns on footer_mode & compact_mode. Makes button & tab directions right to left
  disable_sidebar: false
  tab_direction: 'ltr'      # "ltr" left to right or "rtl" right to left
  button_direction: 'ltr'
  template_variables: '{% set clock = (now().strftime("%I")|int)~now().strftime(":%M") %}'
  header_text: 'Home Assistant'
  hidden_tab_redirect: true
  default_tab: 0
  background: black
  elements_color: "#fff"    # Color of all buttons and tabs
  indicator_color: yellow
  active_tab_color: yellow
  menu_color: red
  voice_color: rgb(255, 99, 71)
  options_color: var(--text-primary-color)
  all_tabs_color: pink
  tabs_color:
    5: yellow
    home: "#fff"
  chevrons: false           # Scroll buttons for tabs
  indicator_top: true       # Current tab indicator can be on top or bottom
  hide_tabs:                # Can be show_tabs if you prefer
    - 1
    - home                  # View's title or path may be used
    - 10

```

## Development

1. Fork and clone the repository.
2. Open the [devcontainer][devcontainer] and run `npm start` when it's ready or
   run `npm start`.
3. The compiled `.js` file will be accessible on
   `http://127.0.0.1:5000/custom-header.js`.
   - It will also be located in the `dist` directory,
4. On a running Home Assistant installation add this to your Lovelace
   `resources:`

```yaml
- url: "http://127.0.0.1:5000/custom-header.js"
  type: module
```

_Change "127.0.0.1" to the IP of your development machine._

### Bonus

If you need a fresh test instance you can install a fresh Home Assistant instance inside the devcontainer as well.

1. Run the command `dc start`.
2. Home Assistant will install and will eventually be running on port `9123`

<!--Links -->

[devcontainer]: https://code.visualstudio.com/docs/remote/containers
