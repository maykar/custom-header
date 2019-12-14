---
title: Templates
---

# Jinja Templates

Every config item can be templated using Jinja templates. If the template is using an entity then Custom Header will update dynamically when that entity changes. Templates are also updated every minute for time based templates.

It is advisable to check your templates using the built in tool in HA. To find it select "Developer Tools" in the sidebar and then click the "Template" link at the top. The template must return the expected value for the config item.

There are some built in template variables that you may use and you can also create your own.

## Creating Variables

To create your own template variables use the `template_variables:` config option. Then you can use that variable in any of your config.

In the following example we set a variable "home" to return true if the input boolean called "home" is "on". So compact mode will be on when that input boolean is on.

```yaml
custom-header:
  template_variables: '{% set home = states.input_boolean.home.state  == "on" %}'
  compact_mode: '{{ home }}'
```

## Built-in Variables

There are pre-built variables for you to use in the table below. The format of the date/time items is automatically detected by default, but you may use the config variable `locale:` to set a different one if needed. [Here is a list of locale codes](http://download1.parallels.com/SiteBuilder/Windows/docs/3.2/en_US/sitebulder-3.2-win-sdk-localization-pack-creation-guide/30801.htm) to be used like this:

```yaml
custom-header:
  locale: en-gb
```

|VARIABLE|DESCRIPTION|
|:-|:-|
|{{ user }}| Logged in user's name
|{{ time }}| Clock
|{{ date }}| Date
|{{ monthNum }}| Month's number
|{{ monthNumLZ }}| Month's number with a leading zero
|{{ monthNameShort }}| Abbreviated month's name
|{{ monthNameLong }}| Month's name
|{{ dayNum }}| Day's number
|{{ dayNumLZ }}| Day's number with a leading zero
|{{ dayNameShort }}| Abbreviated day's name
|{{ dayNameLong }}| Day's name
|{{ hours12 }}| Hour number for 12 hour clock
|{{ hours12LZ }}| Hour number for 12 hour clock with a leading zero
|{{ hours24}}| Hour number for 24 hour clock
|{{ hours24LZ }}| Hour number for 24 hour clock with a leading zero
|{{ minutes }}| Number of minutes
|{{ minutesLZ }}| Number of minutes with a leading zero
|{{ year2d }}| 2 digit year
|{{ year4d }}| 4 digit year
|{{ AMPM }}| AM or PM uppercase
|{{ ampm }}| am or pm lowercase

## Examples

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
