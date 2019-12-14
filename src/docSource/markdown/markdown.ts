import { html, TemplateResult } from 'lit-element';
import marked_ from 'marked';
import emoji from 'node-emoji';

//@ts-ignore
import YAML from 'yaml';
import hljs_ from 'highlight.js/lib/highlight';

import yaml_ from 'highlight.js/lib/languages/yaml';
import css_ from 'highlight.js/lib/languages/css';
import js_ from 'highlight.js/lib/languages/javascript';
import md_ from 'highlight.js/lib/languages/markdown';
import jinja_ from 'highlight.js/lib/languages/django';

import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { GFM } from './styles';
import { HLJS } from '../HLJSstyle.js';

hljs_.registerLanguage('yaml', yaml_);
hljs_.registerLanguage('css', css_);
hljs_.registerLanguage('js', js_);
hljs_.registerLanguage('javascript', js_);
hljs_.registerLanguage('md', md_);
hljs_.registerLanguage('markdown', md_);
hljs_.registerLanguage('jinja', jinja_);
hljs_.registerLanguage('django', jinja_);

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
