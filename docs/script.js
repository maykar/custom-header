const header = document.querySelector("app-header");
const view = document.querySelector(".view");
const sidebar = document.querySelector(".sidebar");

resizeSidebarSpacer();
window.addEventListener("resize", resizeSidebarSpacer());

// Expand animation after 1s.
setTimeout(() => {
  if (screen.width > 500) {
    header.style.marginLeft = "256px";
    view.style.marginLeft = "256px";
    sidebar.style.width = "256px";
  }
}, 1000);

// Calculate and resize sidebar spacer.
function resizeSidebarSpacer() {
  let space = 0;
  const sidebarContents = document.querySelector("paper-listbox").querySelectorAll("*")
  for (const element of sidebarContents) {
    if (element.nodeName == "PAPER-ICON-ITEM") {
      space += parseInt(window.getComputedStyle(element).getPropertyValue('height').replace('px','')) + 4;
    }
  }
  document.querySelector(".spacer").style.height = `calc(100vh - ${space + 200}px)`;
}

// Expand/shrink sidebar.
function expandSidebar() {
  if (header.style.marginLeft !== "256px") {
    header.style.marginLeft = "256px";
    view.style.marginLeft = "256px";
    sidebar.style.width = "256px";
  } else {
    header.style.marginLeft = "64px";
    view.style.marginLeft = "64px";
    sidebar.style.width = "64px";
  }
}
