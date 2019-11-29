import { LitElement, customElement, html, property, CSSResult, css } from 'lit-element';
import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/paper-tabs/paper-tab";
import "@polymer/paper-tabs/paper-tabs";
//import { markdown } from './markdown/markdown';
import './card';

import * as settings from './docSettings'

@customElement('docs-panel')
export class DocsPanel extends LitElement {
  @property() public docs?;
  @property() private page?: string;

  protected render() {
    if (this.docs === undefined) return html``;

    if (this.page === undefined) this.page = this.docs['installation'][0].title
    return html`
        <app-header  slot="header" effects="waterfall" fixed="" condenses="">
          <app-toolbar>
            <div id="mainTitle" main-title="">${settings.siteName}</div>
            <span id="voice" class="iconify" data-icon="mdi:microphone"></span>
            <span id="options" class="iconify" data-icon="mdi:dots-vertical"></span>
          </app-toolbar>
          <div sticky id="sticky">
            <paper-tabs .selected=${this.page} @iron-activate=${this.changePage} attr-for-selected="page-name">
            ${this.docs["installation"].map(element => {
      return html`<paper-tab page-name="${element.title}">${element.title.toUpperCase()}</paper-tab>`
    })}

              <paper-tab role="tab"><span class="iconify" data-icon="mdi:skull"></span></paper-tab>
            </paper-tabs>
          </div>
        </app-header>
        ${this.docs['installation'].map(element => {
      if (element.title === this.page) return html`<docs-card .content=${element}></docs-card>`
      else return
    })}
        `;
  }

  changePage(e: any) {
    const newPage = e.detail.selected;
    this.page = newPage
    console.log(newPage)
    window.history.pushState(null, "", `/${newPage}`)
  }

  static get styles(): CSSResult {
    return css`
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

app-header, app-toolbar {
  background-color: var(--primary-color);
  font-weight: 400;
  color: #ffffff;
}

app-header {
  transition: margin-top 0s !important;
  transition: margin-left 0.4s ease-in-out !important;
}
      docs-card {
        width: 100%;
      }
    `;
  }
}
