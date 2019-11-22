import { LitElement, html } from 'lit-element';
import { defaultConfig } from './default-config';
import { getLovelace } from 'custom-card-helpers';
import { hass } from './ha-elements';

const fireEvent = (node, type, detail, options = {}) => {
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

export class CustomHeaderEditor extends LitElement {
  static get properties() {
    return { _config: {} };
  }

  firstUpdated() {
    this._lovelace = getLovelace();
    this.deepcopy = this.deepcopy.bind(this);
    this._config = this._lovelace.config.custom_header ? this.deepcopy(this._lovelace.config.custom_header) : {};
  }

  render() {
    if (!this._config || !this._lovelace) return html``;
    return html`
      <div @click="${this._close}" class="title_control">
        X
      </div>
      ${this.renderStyle()}
      <ch-config-editor
        .defaultConfig="${defaultConfig}"
        .config="${this._config}"
        @ch-config-changed="${this._configChanged}"
      >
      </ch-config-editor>
      <h4 class="underline">Exceptions</h4>
      <br />
      ${this._config.exceptions
        ? this._config.exceptions.map(
            (exception, index) => html`
              <ch-exception-editor
                .config="${this._config}"
                .exception="${exception}"
                .index="${index}"
                @ch-exception-changed="${this._exceptionChanged}"
                @ch-exception-delete="${this._exceptionDelete}"
              >
              </ch-exception-editor>
            `,
          )
        : ''}
      <br />
      <mwc-button @click="${this._addException}">Add Exception </mwc-button>
      <h4 class="underline">Current User</h4>
      <p style="font-size:16pt">${hass.user.name}</p>
      <h4 class="underline">Current User Agent</h4>
      <br />
      ${navigator.userAgent}
      <br />
      <h4
        style="background:var(--paper-card-background-color);
          margin-bottom:-20px;"
        class="underline"
      >
        ${!this.exception
          ? html`
              ${this._save_button}
            `
          : ''}
        ${!this.exception
          ? html`
              ${this._cancel_button}
            `
          : ''}
      </h4>
    `;
  }

  _close() {
    const editor = this.parentNode.parentNode.parentNode.querySelector('editor');
    this.parentNode.parentNode.parentNode.removeChild(editor);
  }

  _save() {
    for (const key in this._config) {
      if (this._config[key] == defaultConfig[key]) delete this._config[key];
    }
    const newConfig = { ...this._lovelace.config, ...{ custom_header: this._config } };
    try {
      this._lovelace.saveConfig(newConfig).then(() => {
        window.location.href = window.location.href;
      });
    } catch (e) {
      alert(`Save failed: ${e}`);
    }
  }

  get _save_button() {
    const text = 'Save and Reload';
    return html`
      <mwc-button raised @click="${this._save}">${text}</mwc-button>
    `;
  }

  get _cancel_button() {
    return html`
      <mwc-button raised @click="${this._close}">Cancel</mwc-button>
    `;
  }

  _addException() {
    let newExceptions;
    if (this._config.exceptions) {
      newExceptions = this._config.exceptions.slice(0);
      newExceptions.push({ conditions: {}, config: {} });
    } else {
      newExceptions = [{ conditions: {}, config: {} }];
    }
    this._config = { ...this._config, exceptions: newExceptions };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  _configChanged({ detail }) {
    if (!this._config) return;
    this._config = { ...this._config, ...detail.config };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _exceptionChanged(ev) {
    if (!this._config) return;
    const target = ev.target.index;
    const newExceptions = this._config.exceptions.slice(0);
    newExceptions[target] = ev.detail.exception;
    this._config = { ...this._config, exceptions: newExceptions };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  _exceptionDelete(ev) {
    if (!this._config) return;
    const target = ev.target;
    const newExceptions = this._config.exceptions.slice(0);
    newExceptions.splice(target.index, 1);
    this._config = { ...this._config, exceptions: newExceptions };

    fireEvent(this, 'config-changed', { config: this._config });
    this.requestUpdate();
  }

  deepcopy(value) {
    if (!(!!value && typeof value == 'object')) return value;
    if (Object.prototype.toString.call(value) == '[object Date]') {
      return new Date(value.getTime());
    }
    if (Array.isArray(value)) return value.map(this.deepcopy);
    const result = {};
    Object.keys(value).forEach(key => {
      result[key] = this.deepcopy(value[key]);
    });
    return result;
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        .toggle-button {
          margin: 4px;
          background-color: transparent;
          color: var(--primary-color);
        }
        .title_control {
          color: var(--text-dark-color);
          font-weight: bold;
          font-size: 22px;
          float: right;
          cursor: pointer;
          margin: -10px -5px -5px -5px;
        }
        .user_agent {
          display: block;
          margin-left: auto;
          margin-right: auto;
          padding: 5px;
          border: 0;
          resize: none;
          width: 100%;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }
}

customElements.define('custom-header-editor', CustomHeaderEditor);

class ChConfigEditor extends LitElement {
  static get properties() {
    return {
      defaultConfig: {},
      config: {},
      exception: {},
      _closed: {},
    };
  }

  constructor() {
    super();
    this.buttonOptions = ['show', 'hide', 'clock', 'overflow'];
    this.overflowOptions = ['show', 'hide', 'clock'];
    this.swipeAnimation = ['none', 'swipe', 'fade', 'flip'];
  }

  get _clock() {
    return (
      this.getConfig('menu') == 'clock' || this.getConfig('voice') == 'clock' || this.getConfig('options') == 'clock'
    );
  }

  getConfig(item) {
    return this.config[item] !== undefined ? this.config[item] : defaultConfig[item];
  }

  templateExists(item) {
    if (typeof item === 'string' && (item.includes('{{') || item.includes('{%'))) return true;
    else return false;
  }

  render() {
    this.exception = this.exception !== undefined && this.exception !== false;
    return html`
      <custom-style>
        <style is="custom-style">
          a {
            color: var(--text-dark-color);
            text-decoration: none;
          }
          .card-header {
            margin-top: -5px;
            @apply --paper-font-headline;
          }
          .card-header paper-icon-button {
            margin-top: -5px;
            float: right;
          }
        </style>
      </custom-style>
      ${!this.exception
        ? html`
            <h1 style="margin-top:-20px;margin-bottom:0;" class="underline">
              Custom Header &nbsp;₁.₄.₉
            </h1>
            <h4 style="margin-top:-5px;padding-top:10px;font-size:12pt;" class="underline">
              <a href="https://maykar.github.io/compact-custom-header/" target="_blank">
                <ha-icon icon="mdi:help-circle" style="margin-top:-5px;"> </ha-icon>
                Docs&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://github.com/maykar/compact-custom-header" target="_blank">
                <ha-icon icon="mdi:github-circle" style="margin-top:-5px;"> </ha-icon>
                Github&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://community.home-assistant.io/t/compact-custom-header" target="_blank">
                <ha-icon icon="hass:home-assistant" style="margin-top:-5px;"> </ha-icon>
                Forums</a
              >
            </h4>
            ${this.getConfig('editor_warnings')
              ? html`
                  <br />
                  <div class="warning">
                    You can temporaily disable Custom-Header by adding "?disable_ch" to the end of your URL. Hover over
                    any option or icon below for more info.
                  </div>
                  <br />
                `
              : ''}
          `
        : ''}
      ${this.renderStyle()}
      <div class="side-by-side">
        <ha-switch
          class="${this.exception && this.config.disabled_mode === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('disabled_mode') !== false}"
          .configValue="${'disabled_mode'}"
          @change="${this._valueChanged}"
          title="Completely disable Custom-Header. Useful for exceptions."
          ?disabled=${this.templateExists(this.getConfig('disabled_mode'))}
        >
          Disabled Mode
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.footer_mode === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('footer_mode') !== false}"
          .configValue="${'footer_mode'}"
          @change="${this._valueChanged}"
          title="Turn the header into a footer."
          ?disabled=${this.templateExists(this.getConfig('footer_mode'))}
        >
          Footer Mode
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.compact_mode === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('compact_mode') !== false}"
          .configValue="${'compact_mode'}"
          @change="${this._valueChanged}"
          title="Make header compact."
          ?disabled=${this.templateExists(this.getConfig('compact_mode'))}
        >
          Compact Mode
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.kiosk_mode === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('kiosk_mode') !== false}"
          .configValue="${'kiosk_mode'}"
          @change="${this._valueChanged}"
          title="Hide the header, close the sidebar, and disable sidebar swipe."
          ?disabled=${this.templateExists(this.getConfig('kiosk_mode'))}
        >
          Kiosk Mode
          ${this.getConfig('editor_warnings')
            ? html`
                <iron-icon icon="hass:alert" class="alert" title="Removes ability to edit UI"></iron-icon>
              `
            : ''}
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.disable_sidebar === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('disable_sidebar') !== false || this.getConfig('kiosk_mode') !== false}"
          .configValue="${'disable_sidebar'}"
          @change="${this._valueChanged}"
          title="Disable sidebar and menu button."
          ?disabled=${this.templateExists(this.getConfig('disable_sidebar'))}
        >
          Disable Sidebar
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.chevrons === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('chevrons') !== false}"
          .configValue="${'chevrons'}"
          @change="${this._valueChanged}"
          title="View scrolling controls in header."
          ?disabled=${this.templateExists(this.getConfig('chevrons'))}
        >
          Display Tab Chevrons
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.hidden_tab_redirect === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('hidden_tab_redirect') !== false}"
          .configValue="${'hidden_tab_redirect'}"
          @change="${this._valueChanged}"
          title="Auto-redirect away from hidden tabs."
          ?disabled=${this.templateExists(this.getConfig('hidden_tab_redirect'))}
        >
          Hidden Tab Redirect
        </ha-switch>
        ${!this.exception
          ? html`
              <ha-switch
                class="${this.exception && this.config.editor_warnings === undefined ? 'inherited' : ''}"
                ?checked="${this.getConfig('editor_warnings') !== false}"
                .configValue="${'editor_warnings'}"
                @change="${this._valueChanged}"
                title="Toggle warnings in this editor."
                ?disabled=${this.templateExists(this.getConfig('editor_warnings'))}
              >
                Display Editor Warnings
              </ha-switch>
            `
          : ''}
      </div>
      <h4 class="underline">Menu Items</h4>
      <div class="side-by-side">
        <ha-switch
          class="${this.exception && this.config.hide_config === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('hide_config') !== false}"
          .configValue="${'hide_config'}"
          @change="${this._valueChanged}"
          title='Hide "Configure UI" in options menu.'
        >
          Hide "Configure UI"
          ${this.getConfig('editor_warnings')
            ? html`
                <iron-icon icon="hass:alert" class="alert"></iron-icon>
              `
            : ''}
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.hide_raw === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('hide_raw') !== false}"
          .configValue="${'hide_raw'}"
          @change="${this._valueChanged}"
          title='Hide "Raw Config Editor" in options menu.'
        >
          Hide "Raw Config Editor"
          ${this.getConfig('editor_warnings')
            ? html`
                <iron-icon icon="hass:alert" class="alert"></iron-icon>
              `
            : ''}
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.hide_help === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('hide_help') !== false}"
          .configValue="${'hide_help'}"
          @change="${this._valueChanged}"
          title='Hide "Help" in options menu.'
        >
          Hide "Help"
        </ha-switch>
        <ha-switch
          class="${this.exception && this.config.hide_unused === undefined ? 'inherited' : ''}"
          ?checked="${this.getConfig('hide_unused') !== false}"
          .configValue="${'hide_unused'}"
          @change="${this._valueChanged}"
          title='Hide "Help" in options menu.'
        >
          Hide "Unused Entities"
        </ha-switch>
      </div>
      <h4 class="underline">Buttons</h4>

      <h4 class="underline">Tabs</h4>
      <paper-dropdown-menu id="tabs" @value-changed="${this._tabVisibility}">
        <paper-listbox slot="dropdown-content" .selected="${this.getConfig('show_tabs').length > 0 ? '1' : '0'}">
          <paper-item>Hide Tabs</paper-item>
          <paper-item>Show Tabs</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div class="side-by-side">
        <div id="show" style="display:${this.getConfig('show_tabs').length > 0 ? 'initial' : 'none'}">
          <paper-input
            class="${this.exception && this.config.show_tabs === undefined ? 'inherited' : ''}"
            label="Comma-separated list of tab numbers to show:"
            .value="${this.getConfig('show_tabs')}"
            .configValue="${'show_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div id="hide" style="display:${this.getConfig('show_tabs').length > 0 ? 'none' : 'initial'}">
          <paper-input
            class="${this.exception && this.config.hide_tabs === undefined ? 'inherited' : ''}"
            label="Comma-separated list of tab numbers to hide:"
            .value="${this.getConfig('hide_tabs')}"
            .configValue="${'hide_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <paper-input
          class="${this.exception && this.config.default_tab === undefined ? 'inherited' : ''}"
          label="Default tab:"
          .value="${this.getConfig('default_tab')}"
          .configValue="${'default_tab'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
      </div>
    `;
  }

  _toggleCard() {
    this._closed = !this._closed;
    fireEvent(this, 'iron-resize');
  }

  _tabVisibility() {
    const show = this.shadowRoot.querySelector('#show');
    const hide = this.shadowRoot.querySelector('#hide');
    if (this.shadowRoot.querySelector('#tabs').value == 'Hide Tabs') {
      show.style.display = 'none';
      hide.style.display = 'initial';
    } else {
      hide.style.display = 'none';
      show.style.display = 'initial';
    }
  }

  _valueChanged(ev) {
    if (!this.config) return;
    if (ev.target.configValue) {
      if (ev.target.value === '') {
        delete this.config[ev.target.configValue];
      } else {
        this.config = {
          ...this.config,
          [ev.target.configValue]: ev.target.checked !== undefined ? ev.target.checked : ev.target.value,
        };
      }
    }
    fireEvent(this, 'ch-config-changed', { config: this.config });
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        ha-switch {
          padding-top: 16px;
        }
        iron-icon {
          padding-right: 5px;
        }
        iron-input {
          max-width: 115px;
        }
        .inherited {
          opacity: 0.4;
        }
        .inherited:hover {
          opacity: 1;
        }
        .side-by-side {
          display: flex;
          flex-wrap: wrap;
        }
        .side-by-side > * {
          flex: 1;
          padding-right: 4px;
          flex-basis: 33%;
        }
        .buttons > div {
          display: flex;
          align-items: center;
        }
        .buttons > div paper-dropdown-menu {
          flex-grow: 1;
        }
        .buttons > div iron-icon {
          padding-right: 15px;
          padding-top: 20px;
          margin-left: -3px;
        }
        .buttons > div:nth-of-type(2n) iron-icon {
          padding-left: 20px;
        }
        .warning {
          background-color: #455a64;
          padding: 10px;
          color: #ffcd4c;
          border-radius: 5px;
        }
        .alert {
          color: #ffcd4c;
          width: 20px;
          margin-top: -2px;
          padding-left: 7px;
        }
        [closed] {
          overflow: hidden;
          height: 52px;
        }
        paper-card {
          margin-top: 10px;
          width: 100%;
          transition: all 0.5s ease;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }
}

customElements.define('ch-config-editor', ChConfigEditor);

class ChExceptionEditor extends LitElement {
  static get properties() {
    return { config: {}, exception: {}, _closed: {} };
  }

  constructor() {
    super();
    this._closed = true;
  }

  render() {
    if (!this.exception) {
      return html``;
    }
    return html`
      ${this.renderStyle()}
      <custom-style>
        <style is="custom-style">
          .card-header {
            margin-top: -5px;
            @apply --paper-font-headline;
          }
          .card-header paper-icon-button {
            margin-top: -5px;
            float: right;
          }
        </style>
      </custom-style>
      <paper-card ?closed=${this._closed}>
        <div class="card-content">
          <div class="card-header">
            ${Object.values(this.exception.conditions)
              .join(', ')
              .substring(0, 40) || 'New Exception'}
            <paper-icon-button
              icon="${this._closed ? 'mdi:chevron-down' : 'mdi:chevron-up'}"
              @click="${this._toggleCard}"
            >
            </paper-icon-button>
            <paper-icon-button ?hidden=${this._closed} icon="mdi:delete" @click="${this._deleteException}">
            </paper-icon-button>
          </div>
          <h4 class="underline">Conditions</h4>
          <ch-conditions-editor
            .conditions="${this.exception.conditions}"
            @ch-conditions-changed="${this._conditionsChanged}"
          >
          </ch-conditions-editor>
          <h4 class="underline">Config</h4>
          <ch-config-editor
            exception
            .defaultConfig="${{ ...defaultConfig, ...this.config }}"
            .config="${this.exception.config}"
            @ch-config-changed="${this._configChanged}"
          >
          </ch-config-editor>
        </div>
      </paper-card>
    `;
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          font-size: 16pt;
          margin-bottom: 5px;
          width: 100%;
        }
        [closed] {
          overflow: hidden;
          height: 52px;
        }
        paper-card {
          margin-top: 10px;
          width: 100%;
          transition: all 0.5s ease;
        }
        .underline {
          width: 100%;
          background: var(--dark-color);
          color: var(--text-dark-color);
          padding: 5px;
          width: calc(100% + 30px);
          margin-left: calc(0% - 20px);
        }
      </style>
    `;
  }

  _toggleCard() {
    this._closed = !this._closed;
    fireEvent(this, 'iron-resize');
  }

  _deleteException() {
    fireEvent(this, 'ch-exception-delete');
  }

  _conditionsChanged({ detail }) {
    if (!this.exception) return;
    const newException = { ...this.exception, conditions: detail.conditions };
    fireEvent(this, 'ch-exception-changed', { exception: newException });
  }

  _configChanged(ev) {
    ev.stopPropagation();
    if (!this.exception) return;
    const newException = { ...this.exception, config: ev.detail.config };
    fireEvent(this, 'ch-exception-changed', { exception: newException });
  }
}

customElements.define('ch-exception-editor', ChExceptionEditor);

class ChConditionsEditor extends LitElement {
  static get properties() {
    return { conditions: {} };
  }
  get _user() {
    return this.conditions.user || '';
  }
  get _user_agent() {
    return this.conditions.user_agent || '';
  }
  get _media_query() {
    return this.conditions.media_query || '';
  }
  get _query_string() {
    return this.conditions.query_string || '';
  }

  render() {
    if (!this.conditions) return html``;
    return html`
      <paper-input
        label="User (Seperate multiple users with a comma.)"
        .value="${this._user}"
        .configValue="${'user'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="User Agent"
        .value="${this._user_agent}"
        .configValue="${'user_agent'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="Media Query"
        .value="${this._media_query}"
        .configValue="${'media_query'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="Query String"
        .value="${this._query_string}"
        .configValue="${'query_string'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
    `;
  }

  _valueChanged(ev) {
    if (!this.conditions) return;
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) return;
    if (target.configValue) {
      if (target.value === '') {
        delete this.conditions[target.configValue];
      } else {
        this.conditions = {
          ...this.conditions,
          [target.configValue]: target.value,
        };
      }
    }
    fireEvent(this, 'ch-conditions-changed', {
      conditions: this.conditions,
    });
  }
}

customElements.define('ch-conditions-editor', ChConditionsEditor);
