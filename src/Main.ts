import { LitElement, html, customElement, TemplateResult, property, CSSResultArray } from 'lit-element';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/av-icons';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-item/paper-item';

import * as settings from './docSettings';
import { MainStyle } from './styles/MainStyle';
import './card';
import './DotMenu';

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
    this.page = e.detail.selected.toLowerCase();
    window.history.pushState(null, '', `./#${this.category}/${this.page}`);
  }

  changeCategory(e: any) {
    if (e.composedPath()[0].localName !== 'paper-item') {
      this.category = e.composedPath()[3].innerText.toLowerCase();
      this.page = this.docs[this.category!][0].title;
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
    <app-header-layout has-scrolling-region fullbleed>
        <div class="sidebar ${this.expanded ? 'expanded' : ''}">
          <div class="menu" @click=${this.toggleSidebar}>
            <paper-item>
              <iron-icon class="iconify" icon="icons:menu"></iron-icon>
              <span>MENU</span>
            </paper-item>
          </div>
          <div class="sidebarTopItems">
            ${settings.sideBar.map(element => {
              return html`
                <paper-item
                  @click=${this.changeCategory}
                  title=${element.category}
                  class="${this.category === element.category ? 'selected' : ''}"
                >
                  <iron-icon
                    class="iconify ${this.category === element.category ? 'selected' : ''}"
                    icon=${element.icon}
                  ></iron-icon>
                  <span class="item-text">${element.category}</span>
                </paper-item>
              `;
            })}

          </div>

          <div class="sidebarBottomItems">
          ${settings.sideBarBottom.map(element => {
            return html`
              <paper-item
                @click=${this.changeCategory}
                title=${element.category}
                class="${this.category === element.category ? 'selected' : ''}"
              >
                <iron-icon
                  class="iconify ${this.category === element.category ? 'selected' : ''}"
                  icon=${element.icon}
                ></iron-icon>
                <span class="item-text">${element.category}</span>
              </paper-item>
            `;
          })}
          <div class="divider"></div>
            ${settings.sideBarLinks.map(element => {
              return html`
                <a class="sidebarLinkItems" href="${element.link}" target="_blank">
                  <paper-item title=${element.caption}>
                    <iron-icon class="iconify" icon="icons:open-in-new"></iron-icon>
                    <span class="item-text">${element.caption}</span>
                  </paper-item>
                </a>
              `;
            })}
          </div>
        </div>


        <app-header class="${this.expanded ? 'sidebarExpanded' : ''}" fixed slot="header">
          <app-toolbar>
            <div main-title class="main-title">${settings.siteName}</div>
            <iron-icon class="iconify" icon="av:mic"></iron-icon>
            <docs-dot-menu></docs-dot-menu>
          </app-toolbar>
          <paper-tabs
                    .selected=${this.page}
                    @iron-activate=${this.changePage}
                    attr-for-selected="page-name"
                    scrollable
                  >
          ${
            this.docs[this.category!].length > 1
              ? html`
                  ${this.docs[this.category!].map(element => {
                    return html`
                      <paper-tab page-name="${element.title.toLowerCase()}">${element.title}</paper-tab>
                    `;
                  })}
                `
              : ''
          }
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
