import { LitElement, customElement, html, TemplateResult, CSSResultArray, css, property } from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-item/paper-item';

import * as settings from './docSettings';

@customElement('docs-dot-menu')
export class DotMenu extends LitElement {
  @property() public category?: string;
  @property() public page?: string;
  protected render(): TemplateResult | void {
    return html`
      <paper-menu-button
        no-animations
        horizontal-align="right"
        role="group"
        aria-haspopup="true"
        vertical-align="top"
        aria-disabled="false"
      >
        <paper-icon-button icon="icons:more-vert" slot="dropdown-trigger" role="button"></paper-icon-button>
        <paper-listbox slot="dropdown-content" role="listbox" tabindex="0">
          <paper-item @click=${this.editOnGithub}>
            Edit this page on GitHub
          </paper-item>
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  editOnGithub() {
    window.open(`${settings.github}/edit/master/docs/${this.category}/${this.page}.md`, '_blank');
  }

  static get styles(): CSSResultArray {
    return [
      css`
        paper-menu-button {
          float: right;
        }
        paper-item {
          cursor: pointer;
        }
      `,
    ];
  }
}
