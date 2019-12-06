import { html, TemplateResult } from 'lit-element';
import marked_ from 'marked';
import { filterXSS } from 'xss';
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

    input = input.replace(/\:\S+:/, ''); // Remove emoji codes

    return html`
      <style>
        ${GFM} ${HLJS}
      </style>
      <div class="markdown-body">
        ${unsafeHTML(filterXSS(marked(input, options)))}
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
