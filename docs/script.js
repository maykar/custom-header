const header = document.querySelector("app-header");
const view = document.querySelector(".view");
const sidebar = document.querySelector(".sidebar");

resizeSidebarSpacer();
window.addEventListener("resize", resizeSidebarSpacer());

// Sidebar slide open animation at start.
setTimeout(() => {
  if (screen.width > 500) {
    header.style.marginLeft = "256px";
    view.style.marginLeft = "256px";
    sidebar.style.width = "256px";
  }
}, 1000);

// Space in between top sidebar items and bottom needs calculated and run on resize.
function resizeSidebarSpacer() {
  let space = 0;
  const sidebarContents = document.querySelector("paper-listbox").querySelectorAll("*")
  for (const element of sidebarContents) {
    if (element.nodeName == "PAPER-ICON-ITEM") space += 52;
  }
  document.querySelector(".spacer").style.height = `calc(100vh - ${space + 200}px)`;
}

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
