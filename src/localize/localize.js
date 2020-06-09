import * as en from './languages/en.json';
import * as nb from './languages/nb.json';

const languages = {
  en: en,
  nb: nb,
};

export function localize(string, search = undefined, replace = undefined) {
  let translated;
  const split = string.split(".");
  const lang = (localStorage.getItem("selectedLanguage") || "en")
    .replace(/['"]+/g, "")
    .replace("-", "_");

  try {
    translated = languages[lang];
    split.forEach((section) => {
      translated = translated[section];
    });
  } catch (e) {
    translated = languages["en"];
    split.forEach((section) => {
      translated = translated[section];
    });
  }

  if (translated === undefined) {
    translated = languages["en"];
    split.forEach((section) => {
      translated = translated[section];
    });
  }

  if (search !== undefined && replace !== undefined) {
    translated = translated.replace(search, replace);
  }
  return translated;
}
