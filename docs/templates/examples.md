---
title: Examples
index: 4
---

## Examples Using Entities

If Paulus is "home" default tab is 0 else default tab is 5.

```yaml
custom-header:
  default_tab: '{% if is_state("device_tracker.paulus", "home") %}0{% else %}5{% endif %}'
```

```yaml
custom-header:
  # returns true if state is "on", false otherwise.
  compact_mode: '{{ states.input_boolean.home.state  == "on" }}'
```

## Examples Using Built-in Vars

This will make the header text display a clock like this: `1:45 pm`.

```yaml
custom-header:
  header_text: '{{ hours12 }}:{{ minutesLZ }} {{ ampm }}'
```

This will make the menu button display the date like this `Wed. Dec. 25 2019`.

```yaml
custom-header:
  button_text:
    menu: '{{ dayNameShort }}. {{ monthNameShort }}. {{ monthNum }} {{ year4d }}'
```
