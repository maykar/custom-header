---
title: Intro
index: 1
---

## CUSTOM HEADER

Custom Header adds enhancements and customization options to Home Assistant's Lovelace header. Custom Header is the replacement and successor of [Compact Custom Header](https://github.com/maykar/compact-custom-header).

### :warning: Important

- Some config options can remove your ability to access UI elements. Each of these options is marked with a warning in the docs and in the UI editor. Be sure to read the [important notes](#intro/notes) section of the docs or the warning at the top of the UI editor for instructions on how to restore the default header if needed.
- Custom Header version 1.5.0 and above is designed for Home Assistant version 0.110 and above. If you are on lower versions of Home Assistant you need to use earlier versions of CH.

### Features

- Per user/device configs
- Every config item can be templated with Jinja
- Style and hide any element in the header
- Dynamically style header elements based on entity states/attributes
- Buttons can be hidden, made into custom or templated text, or be placed in the options menu
- Compact mode, kiosk mode, and footer mode
- Default/starting view
- But wait, there's more...

<img style="border: 5px solid #767676;border-radius: 10px;max-width: 350px;width: 100%;box-sizing: border-box;" src="https://github.com/maykar/custom-header/blob/master/demo.gif?raw=true" alt="Demo">
