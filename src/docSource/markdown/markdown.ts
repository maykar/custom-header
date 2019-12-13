import { html, TemplateResult } from 'lit-element';
import marked_ from 'marked';
import emoji from 'node-emoji';
import * as settings from '../../siteSettings';

//@ts-ignore
import YAML from 'yaml';
import hljs_ from 'highlight.js/lib/highlight';

import yaml_ from 'highlight.js/lib/languages/yaml';

import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { GFM, HLJS } from './styles';

hljs_.registerLanguage('yaml', yaml_);

const hljs = hljs_,
  marked = marked_;

interface dict {
  [key: string]: string;
}

marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
  breaks: true,
  gfm: true,
  tables: true,
  langPrefix: '',
});

/**
@usage import {markdown} from './markdown'
**/
export class markdown {
  /**
    @param input markdown formated string
    @param options marked options
    @returns html with GFM and HLJS styles
    **/
  static html(input: string, options: dict = {}): TemplateResult | void {
    if (input.includes('---\n')) {
      var split: string[] = input.split('---\n');
      input = split.slice(2).join('---\n');
    }

    const getEmoji = match => emoji.emojify(match);
    input = input.replace(/\:\w+:/g, getEmoji);

    return html`
      <!-- prettier-ignore -->
      <style>${GFM} ${HLJS}</style>
      ${settings.highlightStyle
        ? html`
            <link
              rel="stylesheet"
              type="text/css"
              href=${`https://cdn.jsdelivr.net/npm/highlightjs/styles/${settings.highlightStyle.toLowerCase()}.css`}
            />
          `
        : ''}
      <div class="markdown-body">
        ${unsafeHTML(marked(input, options))}
      </div>
    `;
  }
  /**
    @param input markdown formated string
    @returns settings (key: value)!
    **/
  static settings(input: string) {
    var settings: dict = {};
    if (input.includes('---\n')) {
      if (input.split('---\n').length === 3) {
        settings = YAML.parse(input.split('---\n')[1]);
      }
    }
    return settings;
  }
}
