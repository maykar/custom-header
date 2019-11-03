import { huiRoot } from "./get-root";
import { config } from "./config";
import { BuildHeader } from "./build-header";

export function styleHeader() {
  const header = BuildHeader();
  const root = huiRoot.shadowRoot;
  root.querySelector("app-header").style.visibility = "hidden";
  const headerHeight = getComputedStyle(root.querySelector("app-header")).getPropertyValue("height");
  let style = document.createElement("style");
  style.setAttribute("id", "cch_header_style");
  style.innerHTML = `
              cch-header {
                width:100%;
                display:flex;
                justify-content: center;
                ${config.bottom ? "position:sticky; bottom:0;" : ""}
                background: var(--primary-color);
                color: var(--text-primary-color);
              }
              hui-view {
                margin-top: -${headerHeight};
                margin-bottom: ${config.bottom ? "-48px" : ""};
                padding-top: ${config.bottom ? "0" : "53px"};
                padding-bottom: ${config.bottom ? "48px" : ""};
              }
              hui-panel-view {
                margin-top: -${headerHeight};
                margin-bottom: ${config.bottom ? "-48px" : ""};
                padding-top: ${config.bottom ? "0" : "48px"};
                padding-bottom: ${config.bottom ? "48px" : ""};
              }
              #view {
                ${config.bottom ? "min-height: calc(100vh - 160px) !important;" : ""}
              }
            `;
  root.appendChild(style);

  // Hide cheverons completely when not visible.
  style = document.createElement("style");
  style.setAttribute("id", "cch_chevron");
  style.innerHTML = `
              .not-visible[icon*="chevron"] {
                display:none;
              }
            `;
  header.tabContainer.shadowRoot.appendChild(style);

  // Remove chevrons
  // header.tabContainer.hideScrollButtons = true

  // Current tab indicator on top
  // header.tabContainer.alignBottom = true

  // Style menu button with sidebar changes/resizing.
  const menu = root.querySelector("ha-menu-button");
  const menuButtonVisibility = () => {
    menu.style.display = "none";
    if (menu.style.visibility == "hidden") {
      if (config.bottom) header.menu.style.display = "none";
      header.menu.style.visibility = "hidden";
      header.menu.style.marginRight = "33px";
    } else {
      header.menu.style.visibility = "initial";
      header.menu.style.display = "initial";
      header.menu.style.marginRight = "";
    }
  };
  menuButtonVisibility();
  new MutationObserver(() => {
    menuButtonVisibility();
  }).observe(menu, {
    attributes: true,
    attributeFilter: ["style"]
  });
}
