/* eslint radix: ["error", "as-needed"] */

import { root } from "./get-root";
import { config } from "./config";
import { BuildHeader } from "./build-header";

export function styleHeader() {
  const header = BuildHeader();
  root.querySelector("app-header").style.visibility = "hidden";
  const headerHeight = getComputedStyle(root.querySelector("app-header")).getPropertyValue("height");
  let style = document.createElement("style");
  style.setAttribute("id", "cch_header_style");
  style.innerHTML = `
      cch-header {
        width:100%;
        display:flex;
        justify-content: center;
        background: ${config.background};
        color: ${config.elements_color};
        ${header.tabs.length === 0 ? "margin-top: 48px;" : ""}
        ${config.footer ? "position: sticky; bottom: 0px;" : ""}
      }
      hui-view, hui-panel-view {
        margin-top: -${headerHeight};
        padding-top: ${config.footer ? "0px;" : "53px;"}
        ${config.footer ? "padding-bottom: 48px;" : ""}
        ${config.footer ? "margin-bottom: -48px;" : ""}
      }
      hui-panel-view {
        ${config.footer ? "" : "padding-top: 48px;"}
      }
      #view {
        ${config.footer ? "min-height: calc(100vh - 160px) !important;" : ""}
      }
      [buttonElem="menu"] {
        ${config.menu_color ? `color: ${config.menu_color};` : ""}
      }
      [buttonElem="options"] {
        ${config.options_color ? `color: ${config.options_color};` : ""}
      }
      [buttonElem="voice"] {
        ${config.voice_color ? `color: ${config.voice_color};` : ""}
      }
    `;

  Object.keys(config.tabs_color).forEach((tab) => {
    style.innerHTML += `
      paper-tabs > paper-tab:nth-child(${parseInt(tab) + 1}) {
        color: ${config.tabs_color[tab]};
        ${config.hide_tabs && config.hide_tabs[tab] ? "display: none;" : ""}
      }
    `;
  });

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
    if (menu.style.visibility === "hidden") {
      if (config.footer) header.menu.style.display = "none";
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
