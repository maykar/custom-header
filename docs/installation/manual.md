---
title: Manual
index: 1
---

## Manual Installation

1. Install by copying [custom-header.js](https://github.com/maykar/custom-header/tree/master/dist) to `www/custom-lovelace/compact-custom-header/` or another folder of your choosing (change url below to match).

2. Add the code below to your resources and refresh the page.

```yaml
resources:
    # Add to the version number at the end of this URL when updating.
  - url: /local/custom-lovelace/custom-header/custom-header.js?v=0.0.1
    type: module
```
