const header = document.querySelector('ch-header');
const view = document.querySelector('.view');
const sidebar = document.querySelector('.sidebar');

let options, voice;
window.addEventListener('scroll', function(e) {
  if (!options) options = document.querySelector('#options');
  if (!voice) voice = document.querySelector('#voice');
  if (window.scrollY > 48) {
    header.style.top = '-48px';
    options.style.marginTop = '48px';
    voice.style.marginTop = '48px';
  } else {
    header.style.transition = '0s';
    header.style.top = `-${window.scrollY}px`;
    options.style.marginTop = `${window.scrollY}px`;
    voice.style.marginTop = `${window.scrollY}px`;
  }
  header.style.transition = '';
});

setTimeout(() => {
  if (screen.width > 500) {
    header.style.marginLeft = "210px"
    view.style.marginLeft = "210px"
    sidebar.style.width = "210px"
  }
}, 1000)

if (window.location.href.includes("install")) install();
else info();

function expandSidebar() {
  if (header.style.marginLeft !== "210px") {
    header.style.marginLeft = "210px"
    view.style.marginLeft = "210px"
    sidebar.style.width = "210px"    
  } else {
    header.style.marginLeft = "50px"
    view.style.marginLeft = "50px"
    sidebar.style.width = "50px"
  }
}

function goToAnchor(anchor) {
  const loc = document.location.toString().split('#')[0];
  document.location = loc + '#' + anchor;
  return false;
}

function highlight(id) {
  const sidebarElements = document.querySelector('.sidebar').querySelectorAll('*')
  for (const element of sidebarElements) {
    if (element.id === 'nav') continue;
    else if (element.classList.contains("highlight") && element.id !== id) element.classList.remove("highlight")
    else if (element.id === id) element.classList.add("highlight")
  }
}

function info() {
  window.history.replaceState(null, null, "?info");
  highlight('info');
  document.querySelector('ch-stack').innerHTML = `
  <div id="contentContainer">INFO</div>
  <paper-tabs selected="0" scrollable dir="ltr" role="tablist" tabindex="0">
      <paper-tab onclick="goToAnchor('features')">FEATURES</paper-tab>
      <paper-tab onclick="goToAnchor('important')">IMPORTANT NOTES</paper-tab>
      <paper-tab onclick="goToAnchor('support')">SUPPORT DEV</paper-tab>
  </paper-tabs>
  `
  document.querySelector('.content').innerHTML = `
  <h1>CUSTOM HEADER</h1>
  <p>Custom Header adds enhancements and customization options to Home Assistant's Lovelace header. Custom Header is the successor to "Compact Custom Header".</p>
<h2 id="features">Features:</h2>
<ul>
  <li>Per user/device configs.</li>
  <li>Style and hide any element in the header.</li>
  <li>Dynamically style header elements based on entity states/attributes.</li>
  <li>Every config item can be templated with Jinja.</li>
  <li>Buttons can be hidden, turned into custom or templated text, and be placed in the options menu.</li>
  <li>Compact mode, a kiosk mode to remove header and sidebar, and footer mode to turn the header into a footer.</li>
  <li>Default/starting view.</li>
  <li>And much more.</li>
</ul>
<h2 id="important">Important notes:</h2>
<ul>
<li>Some options can remove your ability to edit with the UI, if you ever need to resore the default header just add "?disable_ch" to the end of your URL. Example "http://192.168.1.2:8123/lovelace/1?diable_ch"</li>
<li>After using "Raw Config Editor" you will need to refresh the page to restore Custom Header.</li>
</ul>
<h2 id="support">Supporting the Dev:</h2>
<p>If you'd like to offer support you can do so by buying me a coffee, sponsoring me on github, or providing friendly chat on the HA forums or Discord.</p>
<p><a href="https://github.com/sponsors/maykar">Sponsor me on Github.</a></p>
<p><a href="https://www.buymeacoffee.com/FgwNR2l">Buy me a coffee.</a></p>
  `
}

function install() {
  window.history.replaceState(null, null, "?install");
  highlight('install');
  document.querySelector('ch-stack').innerHTML = `
  <div id="contentContainer">INSTALLATION</div>
  <paper-tabs selected="0" scrollable dir="ltr" role="tablist" tabindex="0">
      <paper-tab onclick="goToAnchor('hacs')">HACS</paper-tab>
      <paper-tab onclick="goToAnchor('manual')">MANUALLY</paper-tab>
      <paper-tab onclick="goToAnchor('issues')">ISSUES</paper-tab>
  </paper-tabs>
  `
  document.querySelector('.content').innerHTML = `
  <p style="color: red">There are 2 methods of installation: manually or with HACS. Follow only one of these two methods.
  </p>
  <h2 id="hacs">HACS Installation:</h2>
  <p><a href="https://github.com/custom-components/hacs">HACS</a> is a Home Assistant integration that can install, manage, and
    discover custom elements. To install Custom Header with HACS search for "Custom Header" in the HACS store and follow
    the links to install.</p>
  <p>Add the code below to your resources and refresh the page.</p>
  
  <pre><code>resources:
- url: /community_plugin/compact-custom-header/compact-custom-header.js
  type: module</code></pre>
  <br />
  <h2 id="manual">Manual Installation:</h2>
  <p>Install by copying custom-header.js from the dir folder to your /www/custom-lovelace/ folder. You may use any folder
    you'd like as long as it's inside your "www" folder, but be sure to modify the resource URL below to match. Add to the version
    number at the end of the resources URL after each update.
  
    <br />
    <br />Add the code below to your resources and refresh the page.</p>
  <pre><code>resources:
- url: /local/custom-lovelace/custom-header.js?v=0.0.1
  type: module</code></pre>
  <br />
  <h2 id="issues">Common Installation Issues:</h2>
  <ul>
    <li>Make sure you are using the <a
        href="https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins#2-download-the-plugin">raw file
        from github</a>.</li>
    <li>If this is your first time using/creating the "www" folder you will need to restart HA.</li>
    <li>Both of these tips and more are covered in <a
        href="https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins">@thomasloven's lovelace
        guide</a>. It is a great resource for Lovelace Plugins.</li>
  </ul>
  `;
}