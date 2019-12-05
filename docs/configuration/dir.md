---
title: Dir & Files
index: 1
---

# Directory and File Structure

Each folder inside your /docs directory will be a category in the sidebar and each MD file inside those folders will be a selection in the header.

```none
docs/
└── configuration/         <-- Sidebar category
      ├── dir.md           <-- Header sub category
      └── docSettings.md

```

At the top of each MD file you may use a table to set the title and index (starting at 1) of the section like the example below, this will not be displayed on the page.

```none
---
title: Dir & Files
index: 1
---

```
