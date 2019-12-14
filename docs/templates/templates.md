---
title: Templates
index: 1
---

# Jinja Templates

* Every config item can be templated using Jinja templates.
* If the template is using an entity then Custom Header will update dynamically when that entity changes.
* Templates are also updated every minute for time based templates.
* Templates must return the expected value for the config item.

It is advisable to check your templates using the built in tool in HA. To find it select "Developer Tools" in the sidebar and then click the "Template" link at the top.

There are some built in template variables that you may use and you can also create your own.
