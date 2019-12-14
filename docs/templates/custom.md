---
title: Custom Vars
index: 2
---

# Custom Variables

To create your own template variables use the `template_variables:` config option. Then you can use that variable in any of your config.

In the following example we set a variable "home" to return true if the input boolean called "home" is "on". So compact mode will be on when that input boolean is on.

```yaml
custom-header:
  template_variables: '{% set home = states.input_boolean.home.state  == "on" %}'
  compact_mode: '{{ home }}'
```
