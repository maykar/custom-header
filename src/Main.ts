import { LitElement, html, customElement, TemplateResult, property, CSSResultArray } from 'lit-element';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-item/paper-icon-item';

import * as settings from './docSettings';
import { MainStyle } from './styles/MainStyle';
import './card';

const fetchDocs = (): Promise<[]> =>
  fetch(`${window.location.origin}${window.location.pathname}jsonfeed.json`).then(r => r.json());

@customElement('docs-main')
export class Main extends LitElement {
  @property() public docs?;
  @property() private page?: string;
  @property() private category?: string;
  @property() private expanded?: boolean = false;

  firstUpdated(changedProps) {
    const hash = window.location.hash;
    if (hash.includes('#')) {
      this.page = hash.split('/')[1];
      this.category = hash.replace('#', '').split('/')[0];
    }
    super.firstUpdated(changedProps);
    fetchDocs().then(docs => {
      this.docs = docs;
    });
  }

  changePage(e: any) {
    this.page = e.detail.selected;
    window.history.pushState(null, '', `./#${this.category}/${this.page}`);
  }

  changeCategory(e: any) {
    if (e.composedPath()[0].localName !== 'paper-icon-item') {
      this.category = e.composedPath()[3].innerText.toLowerCase();
      this.page = undefined;
      window.history.pushState(null, '', `./#${this.category}`);
    }
  }

  toggleSidebar(): void {
    this.expanded = !this.expanded;
  }

  protected render(): TemplateResult | void {
    if (this.docs === undefined) return html``;
    if (this.category === undefined) {
      this.category = settings!.welcomeCategory;
      window.history.pushState(null, '', `./#${this.category}`);
    }
    if (this.page === undefined) {
      this.page = this.docs[this.category!][0].title;
      window.history.pushState(null, '', `./#${this.category}/${this.page}`);
    }
    return html`
    <app-header-layout has-scrolling-region>
        <div class="sidebar ${this.expanded ? 'expanded' : ''}">
          <div class="menu" @click=${this.toggleSidebar}>
            <paper-icon-item>
              <iron-icon class="iconify" icon="menu"></iron-icon>
              <span>MENU</span>
            </paper-icon-item>
          </div>
          <div class="sidebarTopItems">
          <paper-listbox>
            ${settings.sideBar.map(element => {
              return html`
                <paper-icon-item @click=${this.changeCategory} title=${element.category}>
                  <iron-icon class="iconify" icon=${element.icon}></iron-icon>
                  <span class="item-text">${element.category}</span>
                </paper-icon-item>
              `;
            })}
          </paper-listbox>
          </div>

          <div class="sidebarLinkItems">
          <div class="divider"></div>
          <paper-listbox>
            ${settings.sideBarLinks.map(element => {
              return html`
                <a href="${element.link}" target="_blank">
                  <paper-icon-item title=${element.caption}>
                    <iron-icon class="iconify" icon="open-in-new"></iron-icon>
                    <span class="item-text">${element.caption}</span>
                  </paper-icon-item>
                </a>
              `;
            })}
          </paper-listbox>
          </div>

          <div class="sidebarBottomItems">
          <div class="divider"></div>
          <paper-listbox>
          ${settings.sideBarBottom.map(element => {
            return html`
              <paper-icon-item @click=${this.changeCategory} title=${element.category}>
                <iron-icon class="iconify" icon=${element.icon}></iron-icon>
                <span class="item-text">${element.category}</span>
              </paper-icon-item>
            `;
          })}
              </paper-listbox>
          </div>
        </div>


        <app-header class="${this.expanded ? 'sidebarExpanded' : ''}" fixed slot="header">
          <app-toolbar>
            <div main-title>${settings.siteName}</div>
            <iron-icon class="iconify" icon="av:mic"></iron-icon>
            <iron-icon class="iconify" icon="more-vert"></iron-icon>
          </app-toolbar>
            <paper-tabs .selected=${this.page} @iron-activate=${
      this.changePage
    } attr-for-selected="page-name" scrollable >
            ${this.docs[this.category!].map(element => {
              return html`
                <paper-tab page-name="${element.title}">${element.title}</paper-tab>
              `;
            })}
            </paper-tabs>
        </app-header>

        ${this.docs[this.category!].map(element => {
          if (element.title === this.page)
            return html`
              <docs-card class="view ${this.expanded ? 'sidebarExpanded' : ''}" .content=${element}> </docs-card>
            `;
          else return;
        })}
  </docs-panel>
  </app-header-layout>
        `;
  }

  static get styles(): CSSResultArray {
    return MainStyle;
  }
}
