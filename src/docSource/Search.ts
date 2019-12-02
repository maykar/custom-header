import { LitElement, customElement, html, TemplateResult, CSSResultArray, css, property } from 'lit-element';
import '@polymer/paper-card/paper-card';

import { MainStyle } from './styles/MainStyle';
import { markdown } from './markdown/markdown';

@customElement('docs-search')
export class Search extends LitElement {
  @property() public docs;
  @property() private search?: boolean = false;
  @property() private searchterm?: string = '';

  protected render(): TemplateResult | void {
    if (!this.search) this.searchterm = '';
    return html`
      <div class="search ${this.search ? '' : 'collapse fade'}">
      ${this.search
        ? html`
              <input @input=${this.Search} type="text" class="searchbox" autofocus />
          `
        : ''}
      </div>
      <iron-icon @click=${this.toggleSearch} class="iconify" icon="icons:search"></iron-icon>
      ${this.searchterm!.length > 0
        ? html`
            <paper-card class="result-container ${this.search ? '' : 'fade'}">
              <div class="result">
                <p>${markdown.html('### Search results:')}</p>
                ${Object.entries(this.docs).map(category => {
          return (category as any)[1].map(element => {
            if (element.content_html.toLowerCase().includes(this.searchterm!.toLowerCase())) {
              return html`
                        <a class="result-item" href="${element.url}" @click=${this.searchClick}>${element.title}</a></br>
                      `;
            } else return;
          });
        })}
              </div>
            </paper-card>
          `
        : ''}
    `;
  }

  toggleSearch(): void {
    this.search = !this.search;
  }

  searchClick(e: any): void {
    window.open(e.composedPath()[0].href, '_self');
    window.location.reload();
  }

  Search(e: any): void {
    this.searchterm = e.composedPath()[0].value;
  }

  static get styles(): CSSResultArray {
    return [
      MainStyle,
      css`
        .result-item {
          cursor: pointer;
          text-decoration: none;
          color: var(--primary-color);
        }
        .result-container {
          position: absolute;
          right: 10px;
          top: 50px;
          width: 295px;
          background: var(--primary-background-color);
          color: var(--primary-text-color);
          z-index: 1337;
          border-radius: 20px;
          transition: all 0.4s ease-in-out;
          border: 1px solid var(--divider-color);
        }

        .result {
          padding-right: 16px;
          padding-left: 16px;
          padding-bottom: 16px;
        }

        .search {
          width: 200px;
          background: var(--paper-listbox-background-color);
          z-index: 2;
          border-radius: 20px;
          margin-right: 8px;
          height: 25px;
          opacity: 1;
          overflow: hidden;
          transition: all 0.4s ease-in-out;
        }

        .collapse {
          width: 0px;
        }

        .fade {
          opacity: 0;
        }

        .searchbox {
          width: 90%;
          margin: -2px 5px 5px 10px;
          border-width: 0;
          outline: none;
          opacity: 1;
          transition-delay: 0.4s;
        }

        .iconify {
          min-width: 24px;
        }
      `,
    ];
  }
}
