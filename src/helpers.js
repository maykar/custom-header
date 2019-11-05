/* eslint radix: ["error", "as-needed"] */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */

import { lovelace } from "./get-root";

export const tabIndexByName = ((tab) => {
  const { views } = lovelace.config;
  if (isNaN(tab)) {
    for (const view in views) {
      if (views[view].title === tab || views[view].path === tab) {
        return parseInt(view);
      }
    }
  } else if (!isNaN(tab)) {
    return parseInt(tab);
  }
});

export const processTabConfig = ((config) => {
  // Convert to array if comma seperated string.
  const array = (typeof config === "string")
    ? config.replace(/\s+/g, "").split(",")
    : config;
  for (const tab of array) {
    array[array.indexOf(tab)] = tabIndexByName(tab);
  }
  return array;
});
