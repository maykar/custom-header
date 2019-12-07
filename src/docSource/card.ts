import { LitElement, customElement, html, property, CSSResult, css } from 'lit-element';
import '@polymer/paper-card/paper-card';

import { markdown } from './markdown/markdown';

@customElement('docs-card')
export class Card extends LitElement {
  @property() public content: any;

  protected render() {
    const content = markdown.html(this.content.content_html);
    return html`
      <paper-card>
        <div class="card-content">
          ${content}
        </div>
      </paper-card>
    `;
  }

  static get styles(): CSSResult {
    return css`
      paper-card {
        position: relative;
        width: 100%;
        height: fit-content;
        border-radius: 3px;
        background: var(--card-background);
      }
    `;
  }
}
