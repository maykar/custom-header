import { root } from "./get-root";
import { styleHeader } from "./style-header";

export const observers = () => {
  const callback = (mutations) => {
    mutations.forEach(({ addedNodes, target }) => {
      if (target.className === "edit-mode" && addedNodes.length) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        root.querySelector("app-header").style.visibility = "initial";
        root.querySelector("cch-header").remove();
        root.querySelector("#cch_header_style").remove();
      } else if (target.nodeName === "APP-HEADER" && addedNodes.length) {
        styleHeader();
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(root.querySelector("app-header"), {
    childList: true
  });
};
