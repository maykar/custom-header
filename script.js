const header = document.querySelector("app-header");
const view = document.querySelector(".view");
const sidebar = document.querySelector(".sidebar");

let options, voice;
// window.addEventListener("scroll", function() {
//   if (!options) options = document.querySelector("#options");
//   if (!voice) voice = document.querySelector("#voice");
//   if (window.scrollY > 48) {
//     header.style.top = "-48px";
//     options.style.marginTop = "48px";
//     voice.style.marginTop = "48px";
//   } else {
//     header.style.transition = "0s";
//     header.style.top = `-${window.scrollY}px`;
//     options.style.marginTop = `${window.scrollY}px`;
//     voice.style.marginTop = `${window.scrollY}px`;
//   }
//   header.style.transition = "";
// });

resizeSidebarSpacer();
window.addEventListener("resize", resizeSidebarSpacer());

setTimeout(() => {
  if (screen.width > 500) {
    header.style.marginLeft = "256px";
    view.style.marginLeft = "256px";
    sidebar.style.width = "256px";
  }
}, 1000);

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
