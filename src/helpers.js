/* eslint-disable no-restricted-globals */
import { lovelace } from "./get-root";

export const tabIndexByName = ((tab) => {
  let index;
  const { views } = lovelace.config;
  if (isNaN(tab)) {
    views.forEach((view) => {
      if (view.title === tab || view.path === tab) {
        index = views.indexOf(view);
      }
    });
  } else {
    index = parseInt(tab, 10);
  }
  return index;
});

export const processTabConfig = ((config) => {
  // Convert to array if comma seperated string.
  const array = (typeof config === "string")
    ? config.replace(/\s+/g, "").split(",")
    : config;
  array.forEach((tab) => {
    array[array.indexOf(tab)] = tabIndexByName(tab);
  });
  return array;
});
