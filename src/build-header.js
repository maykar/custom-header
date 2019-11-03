import { huiRoot } from "./get-root";
import { config } from "./config";

export function BuildHeader() {
  let lovelace = huiRoot.lovelace;
  let root = huiRoot.shadowRoot;
  const header = {};
  const tabs = Array.from(root.querySelector("paper-tabs").querySelectorAll("paper-tab"));
  header.tabContainer = document.createElement("paper-tabs");
  header.tabContainer.setAttribute("scrollable", "");
  header.tabContainer.setAttribute("dir", "ltr");
  header.tabContainer.style.width = "100%";
  header.tabContainer.style.marginLeft = "0";
  tabs.forEach((tab) => {
    const index = tabs.indexOf(tab);
    tab = tab.cloneNode(true);
    const haIcon = tab.querySelector("ha-icon");
    if (haIcon) {
      haIcon.setAttribute("icon", lovelace.config.views[index].icon);
    }
    tab.addEventListener("click", () => {
      root
        .querySelector("paper-tabs")
        .querySelectorAll("paper-tab")
        [index].dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
    });
    header.tabContainer.appendChild(tab);
  });
  header.tabs = header.tabContainer.querySelectorAll("paper-tab");

  const buildButton = (button, icon, name) => {
    if (button == "options") {
      header[button] = root.querySelector(name).cloneNode(true);
      if (config.bottom) {
        header[button].setAttribute("vertical-align", "bottom");
      }
      header[button].removeAttribute("horizontal-offset");
      header[button].querySelector("paper-icon-button").style.height = "48px";
      const items = Array.from(header[button].querySelectorAll("paper-item"));
      items.forEach((item) => {
        const index = items.indexOf(item);
        item.addEventListener("click", () => {
          root
            .querySelector(name)
            .querySelectorAll("paper-item")
            [index].dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
        });
      });
    } else {
      header[button] = document.createElement("paper-icon-button");
      header[button].addEventListener("click", () => {
        root
          .querySelector(name)
          .shadowRoot.querySelector("paper-icon-button")
          .dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
      });
    }
    header[button].setAttribute("icon", icon);
    header[button].style.flexShrink = "0";
    header[button].style.height = "48px";
  };

  buildButton("menu", "mdi:menu", "ha-menu-button");
  buildButton("voice", "mdi:microphone", "ha-start-voice-button");
  buildButton("options", "mdi:dots-vertical", "paper-menu-button");

  header.container = document.createElement("cch-header");
  if (!config.bottom) header.container.setAttribute("slot", "header");
  if (header.menu) header.container.appendChild(header.menu);
  if (header.tabContainer) header.container.appendChild(header.tabContainer);
  if (header.voice) header.container.appendChild(header.voice);
  if (header.options) header.container.appendChild(header.options);
  root.querySelector("ha-app-layout").appendChild(header.container);

  return header;
}
