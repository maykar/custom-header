import { LitElement, html, customElement, TemplateResult, property, CSSResult, css } from 'lit-element';
import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import "@polymer/paper-tabs/paper-tab";
import "@polymer/paper-tabs/paper-tabs";
import "@polymer/paper-item/paper-icon-item";

import * as settings from './docSettings'
import './card';

const fetchDocs = (): Promise<[]> => fetch('http://127.0.0.1:5000/jsonfeed.json').then(r => r.json());

@customElement('docs-main')
export class Main extends LitElement {
  @property() public docs?;
  @property() private page?: string;
  @property() private category?: string;

  firstUpdated(changedProps) {
    var hash = window.location.hash;
    if (hash.includes("#")) {
      this.page = hash.split("/")[1]
      this.category = hash.replace("#", "").split("/")[0]
    }

    super.firstUpdated(changedProps);
    fetchDocs().then(docs => {
      this.docs = docs;
    });
  }

  protected render(): TemplateResult | void {

    if (this.docs === undefined) return html``;
    if (this.category === undefined) {
      this.category = settings!.welcomeCategory
      window.history.pushState(null, "", `/#${this.category}`)
    }
    if (this.page === undefined) {
      this.page = this.docs[this.category!][0].title
      window.history.pushState(null, "", `/#${this.category}/${this.page}`)
    }
    return html`
        <app-header  slot="header" effects="waterfall" fixed="" condenses="">
          <app-toolbar>
            <div id="mainTitle" main-title="">${settings.siteName}</div>
            <span id="voice" class="iconify" data-icon="mdi:microphone"></span>
            <span id="options" class="iconify" data-icon="mdi:dots-vertical"></span>
          </app-toolbar>
          <div sticky id="sticky">
            <paper-tabs .selected=${this.page} @iron-activate=${this.changePage} attr-for-selected="page-name">
            ${this.docs[this.category!].map(element => {
      return html`<paper-tab page-name="${element.title}">${element.title.toUpperCase()}</paper-tab>`
    })}
            </paper-tabs>
          </div>
        </app-header>

        <div class="sidebar">
          <paper-icon-item class="menu" tabindex="0" role="option">
            <iron-icon class="iconify" icon="menu"></iron-icon>
            <span class="item-text wrap">${settings.siteName}</span>
          </paper-icon-item>
          <paper-listbox selected="0">
            ${settings.sideBar.map(element => {
      return html`
              <paper-icon-item tabindex="0" role="option" @click=${this.changeCategory}>
                <iron-icon class="iconify" icon=${element.icon}></iron-icon>
                <span class="item-text">${element.category.toUpperCase()}</span>
              </paper-icon-item>
              `
    })}
          </paper-listbox>


          <div class="divider"></div>
          ${settings.sideBarBottom.map(element => {
      return html`
              <paper-icon-item tabindex="0" role="option" @click=${this.changeCategory}>
              <iron-icon class="iconify" icon=${element.icon}></iron-icon>
                <span class="item-text">${element.category.toUpperCase()}</span>
              </paper-icon-item>
              `
    })}
        </div>


        ${this.docs[this.category!].map(element => {
      if (element.title === this.page) return html`<docs-card class="view" .content=${element}></docs-card>`
      else return
    })}
  </docs-panel>
        `;
  }

  changePage(e: any) {
    this.page = e.detail.selected;
    window.history.pushState(null, "", `/#${this.category}/${this.page}`)
  }
  changeCategory(e: any) {
    this.category = e.composedPath()[0].innerText.toLowerCase()
    this.page = undefined
    window.history.pushState(null, "", `/#${this.category}`)
  }

  static get styles(): CSSResult {
    return css`
    app-header {
      position: fixed !important;
      top: 0;
      left: 256px;
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

    .wrap {
      white-space: pre-wrap;
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
      cursor: pointer;
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

    .view {
      display: flex;
      margin-left:254px;
      padding-top: 110px;
      background-color: var(--background-color)
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
      width: 254px;
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
      margin-left:254px;
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
      docs-card {
        width: calc(100% - 254);
        padding-left: 5%;
        padding-right: 5%;
        padding-bottom: 5%;
      }
    `;
  }

}
