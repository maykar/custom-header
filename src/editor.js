import { LitElement, html } from 'lit-element';
import { defaultConfig } from './default-config';
import { getLovelace, fireEvent } from 'custom-card-helpers';
import { ha_elements } from './ha-elements';
import { localize } from './localize/localize';
import { deviceID } from './template-variables';

export class CustomHeaderEditor extends LitElement {
  static get properties() {
    return { _config: {} };
  }

  firstUpdated() {
    this.defaultConfig = defaultConfig();
    this._lovelace = getLovelace();
    this.hass = ha_elements().hass;
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
        .defaultConfig="${this.defaultConfig}"
        .config="${this._config}"
        @ch-config-changed="${this._configChanged}"
      >
      </ch-config-editor>
      <h4 class="underline">${localize('editor.exceptions')}</h4>
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
      <mwc-button @click="${this._addException}">${localize('editor.add_exception')}</mwc-button>
      <h4 class="underline">${localize('editor.current_user')}</h4>
      <br />
      <b>Name:</b> ${this.hass.user.name}<br />
      <b>ID:</b> ${this.hass.user.id}
      <h4 class="underline">Device ID</h4>
      <br />
      ${deviceID}
      <br />
      <h4 class="underline">${localize('editor.current_user_agent')}</h4>
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
      if (this._config[key] == this.defaultConfig[key]) delete this._config[key];
    }
    const newConfig = { ...this._lovelace.config, ...{ custom_header: this._config } };
    try {
      this._lovelace.saveConfig(newConfig).then(() => {
        window.location.href = window.location.href;
      });
    } catch (e) {
      alert(`${localize('editor.save_failed')}: ${e}`);
    }
  }

  get _save_button() {
    const text = localize('editor.save_and_reload');
    return html`
      <mwc-button raised @click="${this._save}">${text}</mwc-button>
    `;
  }

  get _cancel_button() {
    return html`
      <mwc-button raised @click="${this._close}">${localize('editor.cancel')}</mwc-button>
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
    for (const exceptions of newExceptions) {
      for (const key in exceptions.config) {
        if (this._config[key] == exceptions.config[key]) delete exceptions.config[key];
        else if (!this._config[key] && this.defaultConfig[key] == exceptions.config[key]) delete exceptions.config[key];
      }
    }
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
    return this.config[item] !== undefined ? this.config[item] : this.defaultConfig[item];
  }

  templateExists(item) {
    if (typeof item === 'string' && (item.includes('{{') || item.includes('{%'))) return true;
    else return false;
  }

  haSwitch(option, templateWarn, editorWarn, text, title, checked) {
    const templateIcon = html`
      <iron-icon
        icon="mdi:alpha-t-box-outline"
        class="alert"
        title="${localize('editor.disabled_template')}"
      ></iron-icon>
    `;
    const editorWarning = html`
      <iron-icon icon="mdi:alert-box-outline" class="alert" title="${localize('editor.removes_edit_ui')}"></iron-icon>
    `;
    return html`
      <ha-switch
        class="${this.exception && this.config[option] === undefined ? 'inherited slotted' : 'slotted'}"
        ?checked="${this.getConfig(option) !== false && !this.templateExists(this.getConfig(option))}"
        .configValue="${option}"
        @change="${this._valueChanged}"
        title=${title}
        ?disabled=${this.templateExists(this.getConfig(option))}
      >
        ${text} ${this.templateExists(this.getConfig(option)) && templateWarn ? templateIcon : ''}
        ${editorWarn ? editorWarning : ''}
      </ha-switch>
    `;
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
              Custom Header
            </h1>
            <h4 style="margin-top:-5px;padding-top:10px;font-size:12pt;" class="underline">
              <a href="https://maykar.github.io/custom-header/" target="_blank">
                <ha-icon icon="mdi:help-circle" style="margin-top:-5px;"> </ha-icon>
                ${localize('links.docs')}&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://github.com/maykar/custom-header" target="_blank">
                <ha-icon icon="mdi:github-circle" style="margin-top:-5px;"> </ha-icon>
                GitHub&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://community.home-assistant.io/t/custom-header/" target="_blank">
                <ha-icon icon="hass:home-assistant" style="margin-top:-5px;"> </ha-icon>
                ${localize('links.forums')}</a
              >
            </h4>
            ${this.getConfig('editor_warnings')
              ? html`
                  <br />
                  <div class="warning">
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_disable_ch')}
                    </p>
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_raw_editor_reload')}
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      <ha-icon style="padding-right: 3px;" icon="mdi:alpha-t-box-outline"></ha-icon>
                      ${localize('editor.warning_already_a_template')}
                      <br /><ha-icon style="padding-right: 3px;" icon="mdi:alert-box-outline"></ha-icon> ${localize(
                        'editor.warning_edit_ui',
                      )}<br />
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      ${localize('editor.warning_jinja_info')}
                    </p>
                  </div>
                `
              : ''}
            ${!this.exception && this.getConfig('editor_warnings')
              ? this.haSwitch(
                  'editor_warnings',
                  false,
                  false,
                  localize('editor.editor_warnings_title'),
                  localize('editor.editor_warnings_tip'),
                )
              : ''}
          `
        : ''}
      ${this.renderStyle()}
      ${this.getConfig('editor_warnings') && !this.exception
        ? html`
            <h4 class="underline">Main Config</h4>
          `
        : ''}
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch(
          'disabled_mode',
          true,
          false,
          localize('editor.disabled_mode_title'),
          localize('editor.disabled_mode_tip'),
        )}
        ${this.haSwitch(
          'footer_mode',
          true,
          false,
          localize('editor.footer_mode_title'),
          localize('editor.footer_mode_tip'),
        )}
        ${this.haSwitch(
          'compact_mode',
          true,
          false,
          localize('editor.compact_mode_title'),
          localize('editor.compact_mode_tip'),
        )}
        ${this.haSwitch(
          'split_mode',
          true,
          false,
          localize('editor.split_mode_title'),
          localize('editor.split_mode_tip'),
        )}
        ${this.haSwitch(
          'kiosk_mode',
          true,
          true,
          localize('editor.kiosk_mode_title'),
          localize('editor.kiosk_mode_tip'),
        )}
        ${this.haSwitch(
          'disable_sidebar',
          true,
          false,
          localize('editor.disable_sidebar_title'),
          localize('editor.disable_sidebar_tip'),
        )}
        ${this.haSwitch(
          'hide_header',
          true,
          false,
          localize('editor.hide_header_title'),
          localize('editor.hide_header_tip'),
        )}
        ${this.haSwitch('chevrons', true, false, localize('editor.chevrons_title'), localize('editor.chevrons_tip'))}
        ${this.haSwitch(
          'hidden_tab_redirect',
          true,
          false,
          localize('editor.hidden_tab_redirect_title'),
          localize('editor.hidden_tab_redirect_tip'),
        )}
        ${this.haSwitch('shadow', true, false, localize('editor.shadow_title'), localize('editor.shadow_tip'))}
        ${!this.exception && !this.getConfig('editor_warnings')
          ? this.haSwitch(
              'editor_warnings',
              false,
              false,
              localize('editor.editor_warnings_second_title'),
              localize('editor.editor_warnings_tip'),
            )
          : ''}
      </div>
      <hr />
      <div class="side-by-side">
        <paper-input
          style="padding: 10px 10px 0 10px;"
          class="${this.exception && this.config.header_text === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.header_text')}"
          .value="${this.getConfig('header_text')}"
          .configValue="${'header_text'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        <paper-input
          placeholder="${localize('editor.automatic')}"
          style="padding: 10px 10px 0 10px;"
          class="${this.exception && this.config.locale === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.locale_desc')}"
          .value="${this.getConfig('locale')}"
          .configValue="${'locale'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
      </div>
      <h4 class="underline">${localize('editor.menu_items')}</h4>
      <div class="side-by-side">
        ${this.haSwitch(
          'hide_config',
          true,
          true,
          localize('editor.hide_configure_ui_title'),
          localize('editor.hide_configure_ui_tip'),
        )}
        ${this.haSwitch(
          'hide_raw',
          true,
          true,
          localize('editor.hide_raw_editor_title'),
          localize('editor.hide_raw_editor_tip'),
        )}
        ${this.haSwitch('hide_help', true, false, localize('editor.hide_help_title'), localize('editor.hide_help_tip'))}
        ${this.haSwitch(
          'hide_unused',
          true,
          false,
          localize('editor.hide_unused_title'),
          localize('editor.hide_unused_tip'),
        )}
      </div>
      <h4 class="underline">${localize('editor.buttons')}</h4>
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch('menu_hide', true, false, localize('editor.menu_hide_title'), localize('editor.menu_hide_tip'))}
        ${this.haSwitch(
          'menu_dropdown',
          true,
          false,
          localize('editor.menu_dropdown_title'),
          localize('editor.menu_dropdown_tip'),
        )}
        ${this.haSwitch(
          'voice_hide',
          true,
          false,
          localize('editor.voice_hide_title'),
          localize('editor.voice_hide_tip'),
        )}
        ${this.haSwitch(
          'voice_dropdown',
          true,
          false,
          localize('editor.voice_dropdown_title'),
          localize('editor.voice_dropdown_tip'),
        )}
        ${this.haSwitch(
          'options_hide',
          true,
          true,
          localize('editor.options_hide_title'),
          localize('editor.options_hide_tip'),
        )}
        ${this.haSwitch(
          'reverse_button_direction',
          true,
          false,
          localize('editor.reverse_button_title'),
          localize('editor.reverse_button_tip'),
        )}
      </div>
      <h4 class="underline">${localize('editor.tabs')}</h4>
      <paper-dropdown-menu id="tabs" @value-changed="${this._tabVisibility}">
        <paper-listbox slot="dropdown-content" .selected="${this.getConfig('show_tabs').length > 0 ? '1' : '0'}">
          <paper-item>${localize('editor.tabs_hide')}</paper-item>
          <paper-item>${localize('editor.tabs_show')}</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div class="side-by-side">
        <div id="show" style="display:${this.getConfig('show_tabs').length > 0 ? 'initial' : 'none'}">
          <paper-input
            class="${this.exception && this.config.show_tabs === undefined ? 'inherited slotted' : 'slotted'}"
            label="${localize('editor.show_tab_list')}:"
            .value="${this.getConfig('show_tabs')}"
            .configValue="${'show_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div id="hide" style="display:${this.getConfig('show_tabs').length > 0 ? 'none' : 'initial'}">
          <paper-input
            class="${this.exception && this.config.hide_tabs === undefined ? 'inherited slotted' : 'slotted'}"
            label="${localize('editor.hide_tab_list')}:"
            .value="${this.getConfig('hide_tabs')}"
            .configValue="${'hide_tabs'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <paper-input
          class="${this.exception && this.config.default_tab === undefined ? 'inherited slotted' : 'slotted'}"
          label="${localize('editor.default_tab')}:"
          .value="${this.getConfig('default_tab')}"
          .configValue="${'default_tab'}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        ${this.haSwitch(
          'reverse_tab_direction',
          true,
          false,
          localize('editor.reverse_tab_title'),
          localize('editor.reverse_tab_tip'),
        )}
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
          color: #ff9800;
          padding-right: 0;
          margin-right: -5px;
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
          <h4 class="underline">${localize('editor.conditions')}</h4>
          <ch-conditions-editor
            .conditions="${this.exception.conditions}"
            @ch-conditions-changed="${this._conditionsChanged}"
          >
          </ch-conditions-editor>
          <h4 class="underline">${localize('editor.config')}</h4>
          <ch-config-editor
            exception
            .defaultConfig="${{ ...this.defaultConfig, ...this.config }}"
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
  get _template() {
    return this.conditions.template || '';
  }
  get _tab() {
    return this.conditions.tab || '';
  }
  get _device_id() {
    return this.conditions.device_id || '';
  }

  render() {
    if (!this.conditions) return html``;
    return html`
      <paper-input
        label="${localize('editor.user_list')}"
        .value="${this._user}"
        .configValue="${'user'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.user_agent')}"
        .value="${this._user_agent}"
        .configValue="${'user_agent'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.media_query')}"
        .value="${this._media_query}"
        .configValue="${'media_query'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.query_string')}"
        .value="${this._query_string}"
        .configValue="${'query_string'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.template')}"
        .value="${this._template}"
        .configValue="${'template'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="${localize('editor.tabs')}"
        .value="${this._tab}"
        .configValue="${'tab'}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="Device ID"
        .value="${this._device_id}"
        .configValue="${'device_id'}"
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
