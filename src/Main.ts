import { LitElement, html, customElement, TemplateResult, property, CSSResult, css } from 'lit-element';

import './docs';

//import { markdown } from './markdown/markdown';

const fetchDocs = (): Promise<[]> => fetch('http://127.0.0.1:5000/jsonfeed.json').then(r => r.json());

@customElement('docs-main')
export class Main extends LitElement {
  @property() public docs?;
  protected render(): TemplateResult | void {
    return html`
  <docs-panel class="view" .docs=${this.docs}></docs-panel>

    `;
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    fetchDocs().then(docs => {
      this.docs = docs;
    });
  }

  static get styles(): CSSResult {
    return css`
body{
  margin: 0;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
  margin-left: -10px;
  text-decoration: underline;
}

ul li {
  padding: 5px;
}

p {
  font-size: 1em;
}

a:active, a:focus {
  outline: 0;
  border: none;
  outline-style: none;
}

app-header {
  position: fixed !important;
  top: 0;
  left: 0;
  display: block;
  transition-timing-function: linear;
  z-index: 1;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
}

app-toolbar {
  align-items: var(--layout-center_-_align-items) !important;
  height: 48px !important;
}

app-toolbar .iconify {
  margin-left: 16px;
  width: 24px;
  height: 24px;
  z-index: 2;
}

app-header, app-toolbar {
  background-color: var(--primary-color);
  font-weight: 400;
  color: #ffffff;
}

app-header {
  transition: margin-top 0s !important;
  transition: margin-left 0.4s ease-in-out !important;
}

#mainTitle {
  margin-top: -5px;
}

.menu {
  box-sizing: border-box;
  height: 48px;
  display: flex;
  white-space: nowrap;
  font-weight: 400;
  color: #212121;
  background-color: #fafafa;
  font-size: 20px;
  align-items: center;
  padding: 0px 12px;
  border-bottom: 1px solid lightgray;
}

paper-listbox a {
  text-decoration: none;
}

paper-listbox .iconify {
  margin-left: -5px !important;
}

paper-tab {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  color: var(--paper-tab-color);
}

paper-tab .iconify {
  width: 24px;
  height: 24px;
  color: var(--paper-tab-color);
}

paper-tabs {
  padding-left: 5px;
  margin-right: 100px;
}

.paper-tabs-0 #selectionBar.paper-tabs {
  border-color: white;
}

.paper-tab-0 paper-ripple.paper-tab {
  color: white;
}

paper-icon-item {
  box-sizing: border-box;
  padding-left: 12px;
  --paper-item-min-height:  40px;
  width: 48px;
  margin: 4px 8px;
  border-radius: 4px;
  color: black;
  white-space: nowrap;
}

paper-icon-item:focus:before {
  background: transparent !important;
}

.iron-selected ::before {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
  content: "";
  opacity: 0.12;
  will-change: opacity;
  border-radius: 4px;
  transition: opacity 15ms linear 0s;
}

.iron-selected .item-text {
  color: var(--primary-color);
}

paper-listbox .iron-selected .iconify {
  color: var(--primary-color);
}

#contentContainer {
  padding: 17px 6px 0 11px;
  box-sizing: border-box;
  height: 48px;
}

.not-visible[icon*="chevron"] {
  display:none;
}

docs-panel {
  width: 90%;
  margin-left: 5%
}
.view {
  display: flex;
  padding-top: 110px;
  background-color: var(--background-color)
}

paper-card {
  padding: 0 30px 0 30px;
  background: var(--paper-card-background-color);
  max-width:1000px;
  margin: 20px auto 20px auto;
  border-radius: 10px !important;
  overflow: hidden;
  height: 1000px;
  width: 85%;
}

pre {
  padding: 20px;
  margin: 0 -30px 0 -30px;
  background: #404040;
  color: #fff;
  font-family: Roboto Mono, monospace;
  overflow-x: auto;
}

.spacer {
  pointer-events: none;
  flex: 1 1 0%;
}

.divider {
  bottom: 112px;
  padding: 10px 0px;
  margin-top: -13px;
}

.divider::before {
  content: " ";
  display: block;
  height: 1px;
  background-color: lightgrey;
}

.sidebar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 0;
  background: var(--sidebar-background-color);
  width: 64px;
  height: 100%;
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
}

.sidebar, .view, ch-header {
  transition: all 0.4s ease-in-out;
}

.sidebarText {
  font: 400 1.3em Roboto, sans-serif;
  color: var(--sidebar-text-color);
  padding-left:3px;
  padding-bottom:-5px;
  text-align:left;
  margin-top:-37.7px;
  margin-left:64px;
  margin-bottom:3px;
  opacity: 0.4;
  cursor: pointer;
}

.sidebarBottom {
  margin: 0;
  margin-left: -4px;
}

.sidebar .iconify {
  margin-right: 23px;
  margin-left: 7px;
  margin-top: -2px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  color: var(--sidebar-icon-color);
}

    `;
  }
}
