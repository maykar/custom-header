import {
  getRoot
} from 'custom-card-helpers';

import { styleHeader } from "./style-header";
import { header } from "./build-header";

export const observers = () => {
  const callback = (mutations) => {
    mutations.forEach(({ addedNodes, target }) => {
      if (target.className === "edit-mode" && addedNodes.length) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getRoot().querySelector("app-header").style.visibility = "initial";
        getRoot().querySelector("cch-header").style.visibility = "hidden";
        getRoot().querySelector("#cch_header_style").remove();
        header.menu.style.display = "none";
      } else if (target.nodeName === "APP-HEADER" && addedNodes.length) {
        header.menu.style.display = "";
        getRoot().querySelector("cch-header").style.visibility = "initial";
        styleHeader();
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(getRoot().querySelector("app-header"), {
    childList: true
  });
};
