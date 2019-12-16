const defaultVariables=e=>{const t=new Date;return{time:t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"}),date:t.toLocaleDateString(e,{}),monthNum:t.getMonth()+1,monthNumLZ:String(t.getMonth()+1).padStart(2,0),monthNameShort:t.toLocaleDateString(e,{month:"short"}),monthNameLong:t.toLocaleDateString(e,{month:"long"}),dayNum:t.getDate(),dayNumLZ:String(t.getDate()).padStart(2,0),dayNameShort:t.toLocaleDateString(e,{weekday:"short"}),dayNameLong:t.toLocaleDateString(e,{weekday:"long"}),hours12:t.getHours()>12?t.getHours()-12:t.getHours(),hours12LZ:String(t.getHours()>12?t.getHours()-12:t.getHours()).padStart(2,0),hours24:t.getHours(),hours24LZ:String(t.getHours()).padStart(2,0),minutes:t.getMinutes(),minutesLZ:String(t.getMinutes()).padStart(2,0),year2d:String(t.getFullYear()).substr(-2),year4d:t.getFullYear(),AMPM:t.getHours()>=12?"PM":"AM",ampm:t.getHours()>=12?"pm":"am"}};var e={},t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,o="[^\\s]+",n=/\[([^]*?)\]/gm,noop=function(){};function shorten(e,t){for(var o=[],n=0,i=e.length;n<i;n++)o.push(e[n].substr(0,t));return o}function monthUpdate(e){return function(t,o,n){var i=n[e].indexOf(o.charAt(0).toUpperCase()+o.substr(1).toLowerCase());~i&&(t.month=i)}}function pad(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=["January","February","March","April","May","June","July","August","September","October","November","December"],s=shorten(r,3),a=shorten(i,3);e.i18n={dayNamesShort:a,dayNames:i,monthNamesShort:s,monthNames:r,amPm:["am","pm"],DoFn:function DoFn(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var c={D:function(e){return e.getDate()},DD:function(e){return pad(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return pad(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return pad(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return pad(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return pad(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return pad(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return pad(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return pad(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return pad(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return pad(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return pad(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+pad(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},l={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+o,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var o=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?o-1:o)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",noop],ddd:[o,noop],MMM:[o,monthUpdate("monthNamesShort")],MMMM:[o,monthUpdate("monthNames")],a:[o,function(e,t,o){var n=t.toLowerCase();n===o.amPm[0]?e.isPm=!1:n===o.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var o,n=(t+"").match(/([+-]|\d\d)/gi);n&&(o=60*n[1]+parseInt(n[2],10),e.timezoneOffset="+"===n[0]?o:-o)}]};l.dd=l.d,l.dddd=l.ddd,l.DD=l.D,l.mm=l.m,l.hh=l.H=l.HH=l.h,l.MM=l.M,l.ss=l.s,l.A=l.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(o,i,r){var s=r||e.i18n;if("number"==typeof o&&(o=new Date(o)),"[object Date]"!==Object.prototype.toString.call(o)||isNaN(o.getTime()))throw new Error("Invalid Date in fecha.format");i=e.masks[i]||i||e.masks.default;var a=[];return(i=(i=i.replace(n,(function(e,t){return a.push(t),"@@@"}))).replace(t,(function(e){return e in c?c[e](o,s):e.slice(1,e.length-1)}))).replace(/@@@/g,(function(){return a.shift()}))},e.parse=function(o,i,r){var s=r||e.i18n;if("string"!=typeof i)throw new Error("Invalid format in fecha.parse");if(i=e.masks[i]||i,o.length>1e3)return null;var a={},c=[],d=[],h=function regexEscape(e){return e.replace(/[|\\{()[^$+*?.-]/g,"\\$&")}(i=i.replace(n,(function(e,t){return d.push(t),"@@@"}))).replace(t,(function(e){if(l[e]){var t=l[e];return c.push(t[1]),"("+t[0]+")"}return e}));h=h.replace(/@@@/g,(function(){return d.shift()}));var u=o.match(new RegExp(h,"i"));if(!u)return null;for(var p=1;p<u.length;p++)c[p-1](a,u[p],s);var m,g=new Date;return!0===a.isPm&&null!=a.hour&&12!=+a.hour?a.hour=+a.hour+12:!1===a.isPm&&12==+a.hour&&(a.hour=0),null!=a.timezoneOffset?(a.minute=+(a.minute||0)-+a.timezoneOffset,m=new Date(Date.UTC(a.year||g.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0))):m=new Date(a.year||g.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0),m};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();var A=function(e,t,o,n){n=n||{},o=null==o?{}:o;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=o,e.dispatchEvent(i),i},F=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null};const d=document.querySelector("home-assistant"),h=d.hass,u=F(),p=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot}(),m={};m.main=d.shadowRoot.querySelector("home-assistant-main"),m.tabs=Array.from((p.querySelector("paper-tabs")||p).querySelectorAll("paper-tab")),m.tabContainer=p.querySelector("paper-tabs"),m.menu=p.querySelector("ha-menu-button"),m.options=p.querySelector("paper-menu-button"),m.voice=p.querySelector("ha-start-voice-button")||p.querySelector('paper-icon-button[icon="hass:microphone"]'),m.drawer=m.main.shadowRoot.querySelector("#drawer"),m.sidebar={},m.sidebar.main=m.main.shadowRoot.querySelector("ha-sidebar"),m.sidebar.menu=m.sidebar.main.shadowRoot.querySelector(".menu"),m.sidebar.listbox=m.sidebar.main.shadowRoot.querySelector("paper-listbox"),m.sidebar.divider=m.sidebar.main.shadowRoot.querySelector("div.divider"),m.appHeader=p.querySelector("app-header"),m.appLayout=p.querySelector("ha-app-layout"),m.partialPanelResolver=m.main.shadowRoot.querySelector("partial-panel-resolver");const g=[];for(const e in m)if("voice"!=e)if(m[e]){if("object"==typeof m[e]&&!m[e].nodeName)for(const t in m[e])m[e][t]||g.push(`${e}[${t}]`)}else g.push(e);g.length&&console.log(`[CUSTOM HEADER] The following HA element${g.length>1?"s":""} could not be found: ${g.join(", ")}`);const tabIndexByName=e=>{let t;const{views:o}=u.config;return isNaN(e)?o.forEach(n=>{n.title!==e&&n.path!==e||(t=o.indexOf(n))}):t=parseInt(e,10),t},buildRange=e=>{const t=[],range=(e,t)=>new Array(t-e+1).fill(void 0).map((t,o)=>o+e);if(e.includes("to")){const o=e.split("to");parseInt(o[1])>parseInt(o[0])?t.push(range(parseInt(o[0]),parseInt(o[1]))):t.push(range(parseInt(o[1]),parseInt(o[0])))}return t.flat()},processTabArray=e=>{let t=[];e="string"==typeof e?e.replace(/\s+/g,"").split(","):e;for(const o in e)"string"==typeof e[o]&&e[o].includes("to")?t.push(buildRange(e[o])):t.push(e[o]);t=t.flat();for(const e in t)isNaN(t[e])?t[e]=tabIndexByName(t[e]):t[e]=parseInt(t[e]);return t.sort((e,t)=>e-t)},conditionalConfig=e=>{let t={},o=0;return e.exceptions&&e.exceptions.forEach(e=>{const n=(e=>{const t={user:h.user.name,user_agent:navigator.userAgent};let o=0;for(const n in e)if("user"==n&&e[n].includes(","))e[n].split(/,+/).forEach(e=>{t[n]==e.trim()&&o++});else{if(!(t[n]==e[n]||"query_string"==n&&window.location.search.includes(e[n])||"user_agent"==n&&t[n].includes(e[n])||"media_query"==n&&window.matchMedia(e[n]).matches))return 0;o++}return o})(e.conditions);n>o&&(o=n,t=e.config)}),t.hide_tabs&&e.show_tabs&&t.hide_tabs.length&&e.show_tabs.length?delete e.show_tabs:t.show_tabs&&e.hide_tabs&&t.show_tabs.length&&e.hide_tabs.length&&delete e.hide_tabs,{...e,...t}},_=(()=>{if(p.querySelector("ch-header"))return;const e={};e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",m.tabs.forEach(t=>{const o=m.tabs.indexOf(t),n=t.cloneNode(!0),i=n.querySelector("ha-icon");i&&i.setAttribute("icon",u.config.views[o].icon),n.addEventListener("click",()=>{m.tabs[o].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(n)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const buildButton=(t,o)=>{if("options"===t){e[t]=m[t].cloneNode(!0),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const o=Array.from(e[t].querySelectorAll("paper-item"));o.forEach(e=>{const n=o.indexOf(e);e.addEventListener("click",()=>{m[t].querySelectorAll("paper-item")[n].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else{if(!m[t])return;e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{(m[t].shadowRoot.querySelector("paper-icon-button")||m[t]).dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})}e[t].setAttribute("icon",o),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};buildButton("menu","mdi:menu"),buildButton("voice","mdi:microphone"),buildButton("options","mdi:dots-vertical");const t=document.createElement("ch-stack"),o=document.createElement("div");return o.setAttribute("id","contentContainer"),e.container=document.createElement("ch-header"),e.menu&&e.container.appendChild(e.menu),e.container.appendChild(t),e.stack=e.container.querySelector("ch-stack"),e.stack.appendChild(o),e.stack.appendChild(e.tabContainer),e.voice&&"hidden"!=e.voice.style.visibility&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),m.appLayout.appendChild(e.container),e})(),b=new WeakMap,isDirective=e=>"function"==typeof e&&b.has(e),y=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,removeNodes=(e,t,o=null)=>{for(;t!==o;){const o=t.nextSibling;e.removeChild(t),t=o}},f={},v={},w=`{{lit-${String(Math.random()).slice(2)}}}`,S=`\x3c!--${w}--\x3e`,x=new RegExp(`${w}|${S}`),C="$lit$";class Template{constructor(e,t){this.parts=[],this.element=t;const o=[],n=[],i=document.createTreeWalker(t.content,133,null,!1);let r=0,s=-1,a=0;const{strings:c,values:{length:l}}=e;for(;a<l;){const e=i.nextNode();if(null!==e){if(s++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:o}=t;let n=0;for(let e=0;e<o;e++)endsWith(t[e].name,C)&&n++;for(;n-- >0;){const t=c[a],o=$.exec(t)[2],n=o.toLowerCase()+C,i=e.getAttribute(n);e.removeAttribute(n);const r=i.split(x);this.parts.push({type:"attribute",index:s,name:o,strings:r}),a+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(w)>=0){const n=e.parentNode,i=t.split(x),r=i.length-1;for(let t=0;t<r;t++){let o,r=i[t];if(""===r)o=createMarker();else{const e=$.exec(r);null!==e&&endsWith(e[2],C)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-C.length)+e[3]),o=document.createTextNode(r)}n.insertBefore(o,e),this.parts.push({type:"node",index:++s})}""===i[r]?(n.insertBefore(createMarker(),e),o.push(e)):e.data=i[r],a+=r}}else if(8===e.nodeType)if(e.data===w){const t=e.parentNode;null!==e.previousSibling&&s!==r||(s++,t.insertBefore(createMarker(),e)),r=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(o.push(e),s--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(w,t+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=n.pop()}for(const e of o)e.parentNode.removeChild(e)}}const endsWith=(e,t)=>{const o=e.length-t.length;return o>=0&&e.slice(o)===t},isTemplatePartActive=e=>-1!==e.index,createMarker=()=>document.createComment(""),$=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance{constructor(e,t,o){this.__parts=[],this.template=e,this.processor=t,this.options=o}update(e){let t=0;for(const o of this.__parts)void 0!==o&&o.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=y?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],o=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,r=0,s=0,a=n.nextNode();for(;r<o.length;)if(i=o[r],isTemplatePartActive(i)){for(;s<i.index;)s++,"TEMPLATE"===a.nodeName&&(t.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=t.pop(),a=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return y&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const q=` ${w} `;class TemplateResult{constructor(e,t,o,n){this.strings=e,this.values=t,this.type=o,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");o=(i>-1||o)&&-1===e.indexOf("--\x3e",i+1);const r=$.exec(e);t+=null===r?e+(o?q:S):e.substr(0,r.index)+r[1]+r[2]+C+r[3]+w}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const isPrimitive=e=>null===e||!("object"==typeof e||"function"==typeof e),isIterable=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class AttributeCommitter{constructor(e,t,o){this.dirty=!0,this.element=e,this.name=t,this.strings=o,this.parts=[];for(let e=0;e<o.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const e=this.strings,t=e.length-1;let o="";for(let n=0;n<t;n++){o+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(isPrimitive(e)||!isIterable(e))o+="string"==typeof e?e:String(e);else for(const t of e)o+="string"==typeof t?t:String(t)}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||isPrimitive(e)&&e===this.value||(this.value=e,isDirective(e)||(this.committer.dirty=!0))}commit(){for(;isDirective(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class NodePart{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(createMarker()),this.endNode=e.appendChild(createMarker())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=createMarker()),e.__insert(this.endNode=createMarker())}insertAfterPart(e){e.__insert(this.startNode=createMarker()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(isPrimitive(e)?e!==this.value&&this.__commitText(e):e instanceof TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):isIterable(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,o="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=o:this.__commitNode(document.createTextNode(o)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof TemplateInstance&&this.value.template===t)this.value.update(e.values);else{const o=new TemplateInstance(t,e.processor,this.options),n=o._clone();o.update(e.values),this.__commitNode(n),this.value=o}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let o,n=0;for(const i of e)o=t[n],void 0===o&&(o=new NodePart(this.options),t.push(o),0===n?o.appendIntoPart(this):o.insertAfterPart(t[n-1])),o.setValue(i),o.commit(),n++;n<t.length&&(t.length=n,this.clear(o&&o.endNode))}clear(e=this.startNode){removeNodes(this.startNode.parentNode,e.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(e,t,o){if(this.value=void 0,this.__pendingValue=void 0,2!==o.length||""!==o[0]||""!==o[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=o}setValue(e){this.__pendingValue=e}commit(){for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class PropertyCommitter extends AttributeCommitter{constructor(e,t,o){super(e,t,o),this.single=2===o.length&&""===o[0]&&""===o[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let E=!1;try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class EventPart{constructor(e,t,o){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=o,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,o=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||o);o&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=getOptions(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const getOptions=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const T=new class DefaultTemplateProcessor{handleAttributeExpressions(e,t,o,n){const i=t[0];if("."===i){return new PropertyCommitter(e,t.slice(1),o).parts}return"@"===i?[new EventPart(e,t.slice(1),n.eventContext)]:"?"===i?[new BooleanAttributePart(e,t.slice(1),o)]:new AttributeCommitter(e,t,o).parts}handleTextExpression(e){return new NodePart(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function templateFactory(e){let t=R.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},R.set(e.type,t));let o=t.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(w);return o=t.keyString.get(n),void 0===o&&(o=new Template(e,e.getTemplateElement()),t.keyString.set(n,o)),t.stringsArray.set(e.strings,o),o}const R=new Map,M=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const html=(e,...t)=>new TemplateResult(e,t,"html",T),N=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function removeNodesFromTemplate(e,t){const{element:{content:o},parts:n}=e,i=document.createTreeWalker(o,N,null,!1);let r=nextActiveIndexInTemplateParts(n),s=n[r],a=-1,c=0;const l=[];let d=null;for(;i.nextNode();){a++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-c,r=nextActiveIndexInTemplateParts(n,r),s=n[r]}l.forEach(e=>e.parentNode.removeChild(e))}const countNodes=e=>{let t=11===e.nodeType?0:1;const o=document.createTreeWalker(e,N,null,!1);for(;o.nextNode();)t++;return t},nextActiveIndexInTemplateParts=(e,t=-1)=>{for(let o=t+1;o<e.length;o++){const t=e[o];if(isTemplatePartActive(t))return o}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const getTemplateCacheKey=(e,t)=>`${e}--${t}`;let P=!0;void 0===window.ShadyCSS?P=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),P=!1);const shadyTemplateFactory=e=>t=>{const o=getTemplateCacheKey(t.type,e);let n=R.get(o);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},R.set(o,n));let i=n.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(w);if(i=n.keyString.get(r),void 0===i){const o=t.getTemplateElement();P&&window.ShadyCSS.prepareTemplateDom(o,e),i=new Template(t,o),n.keyString.set(r,i)}return n.stringsArray.set(t.strings,i),i},k=["html","svg"],H=new Set,prepareTemplateStyles=(e,t,o)=>{H.add(e);const n=o?o.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:r}=i;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,e);const s=document.createElement("style");for(let e=0;e<r;e++){const t=i[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}(e=>{k.forEach(t=>{const o=R.get(getTemplateCacheKey(t,e));void 0!==o&&o.keyString.forEach(e=>{const{element:{content:t}}=e,o=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{o.add(e)}),removeNodesFromTemplate(e,o)})})})(e);const a=n.content;o?function insertNodeIntoTemplate(e,t,o=null){const{element:{content:n},parts:i}=e;if(null==o)return void n.appendChild(t);const r=document.createTreeWalker(n,N,null,!1);let s=nextActiveIndexInTemplateParts(i),a=0,c=-1;for(;r.nextNode();){for(c++,r.currentNode===o&&(a=countNodes(t),o.parentNode.insertBefore(t,o));-1!==s&&i[s].index===c;){if(a>0){for(;-1!==s;)i[s].index+=a,s=nextActiveIndexInTemplateParts(i,s);return}s=nextActiveIndexInTemplateParts(i,s)}}}(o,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(o){a.insertBefore(s,a.firstChild);const e=new Set;e.add(s),removeNodesFromTemplate(o,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const D={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},notEqual=(e,t)=>t!==e&&(t==t||e==e),L={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:notEqual},V=Promise.resolve(!0),O=1,U=4,Y=8,z=16,I=32,j="finalized";class UpdatingElement extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=V,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,o)=>{const n=this._attributeNameForProperty(o,t);void 0!==n&&(this._attributeToPropertyMap.set(n,o),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=L){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const o="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[o]},set(t){const n=this[e];this[o]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(j)||e.finalize(),this[j]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const o of t)this.createProperty(o,e[o])}}static _attributeNameForProperty(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,o=notEqual){return o(e,t)}static _propertyValueFromAttribute(e,t){const o=t.type,n=t.converter||D,i="function"==typeof n?n:n.fromAttribute;return i?i(e,o):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const o=t.type,n=t.converter;return(n&&n.toAttribute||D.toAttribute)(e,o)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|I,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,o){t!==o&&this._attributeToProperty(e,o)}_propertyToAttribute(e,t,o=L){const n=this.constructor,i=n._attributeNameForProperty(e,o);if(void 0!==i){const e=n._propertyValueToAttribute(t,o);if(void 0===e)return;this._updateState=this._updateState|Y,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=this._updateState&~Y}}_attributeToProperty(e,t){if(this._updateState&Y)return;const o=this.constructor,n=o._attributeToPropertyMap.get(e);if(void 0!==n){const e=o._classProperties.get(n)||L;this._updateState=this._updateState|z,this[n]=o._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~z}}_requestUpdate(e,t){let o=!0;if(void 0!==e){const n=this.constructor,i=n._classProperties.get(e)||L;n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||this._updateState&z||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):o=!1}!this._hasRequestedUpdate&&o&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|U;const o=this._updatePromise;this._updatePromise=new Promise((o,n)=>{e=o,t=n});try{await o}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&I}get _hasRequestedUpdate(){return this._updateState&U}get hasUpdated(){return this._updateState&O}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&O||(this._updateState=this._updateState|O,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~U}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}UpdatingElement[j]=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const B="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const flattenStyles=e=>e.flat?e.flat(1/0):function arrayFlat(e,t=[]){for(let o=0,n=e.length;o<n;o++){const n=e[o];Array.isArray(n)?arrayFlat(n,t):t.push(n)}return t}(e);class LitElement extends UpdatingElement{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){flattenStyles(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?B?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof TemplateResult&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}LitElement.finalized=!0,LitElement.render=(e,t,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const n=o.scopeName,i=M.has(t),r=P&&11===t.nodeType&&!!t.host,s=r&&!H.has(n),a=s?document.createDocumentFragment():t;if(((e,t,o)=>{let n=M.get(t);void 0===n&&(removeNodes(t,t.firstChild),M.set(t,n=new NodePart(Object.assign({templateFactory:templateFactory},o))),n.appendInto(t)),n.setValue(e),n.commit()})(e,a,Object.assign({templateFactory:shadyTemplateFactory(n)},o)),s){const e=M.get(a);M.delete(a);const o=e.value instanceof TemplateInstance?e.value.template:void 0;prepareTemplateStyles(n,a,o),removeNodes(t,t.firstChild),t.appendChild(a),M.set(t,e)}!i&&r&&window.ShadyCSS.styleElement(t.host)};const getThemeVar=e=>getComputedStyle(document.body).getPropertyValue(e),J={locale:[],header_text:"Home Assistant",disabled_mode:!1,kiosk_mode:!1,compact_mode:!1,footer_mode:!1,disable_sidebar:!1,chevrons:!0,indicator_top:!1,hidden_tab_redirect:!0,background:getThemeVar("--ch-background")||"var(--primary-color)",elements_color:getThemeVar("--ch-elements-color")||"var(--text-primary-color)",menu_color:getThemeVar("--ch-menu-color")||"",voice_color:getThemeVar("--ch-voice-color")||"",options_color:getThemeVar("--ch-options-color")||"",all_tabs_color:getThemeVar("--ch-all-tabs-color")||"",notification_dot_color:getThemeVar("--ch-notification-dot-color")||"#ff9800",tab_indicator_color:getThemeVar("--ch-tab-indicator-color")||"",active_tab_color:getThemeVar("--ch-active-tab-color")||"",tabs_color:[],hide_tabs:[],show_tabs:[],default_tab:0,tab_icons:[],reverse_tab_direction:!1,button_icons:[],reverse_button_direction:!1,menu_dropdown:!1,menu_hide:!1,voice_dropdown:!1,voice_hide:!1,options_hide:!1,hide_help:!1,hide_unused:!1,hide_refresh:!1,hide_config:!1,hide_raw:!1,tabs_css:[],header_css:"",stack_css:"",header_text_css:"",active_tab_css:"",options_list_css:"",menu_css:"",options_css:"",voice_css:"",all_tabs_css:"",tab_container_css:"",view_css:"",panel_view_css:"",template_variables:"",exceptions:[],editor_warnings:!0};customElements.define("custom-header-editor",class CustomHeaderEditor extends LitElement{static get properties(){return{_config:{}}}firstUpdated(){this._lovelace=F(),this.deepcopy=this.deepcopy.bind(this),this._config=this._lovelace.config.custom_header?this.deepcopy(this._lovelace.config.custom_header):{}}render(){return this._config&&this._lovelace?html`
      <div @click="${this._close}" class="title_control">
        X
      </div>
      ${this.renderStyle()}
      <ch-config-editor
        .defaultConfig="${J}"
        .config="${this._config}"
        @ch-config-changed="${this._configChanged}"
      >
      </ch-config-editor>
      <h4 class="underline">Exceptions</h4>
      <br />
      ${this._config.exceptions?this._config.exceptions.map((e,t)=>html`
              <ch-exception-editor
                .config="${this._config}"
                .exception="${e}"
                .index="${t}"
                @ch-exception-changed="${this._exceptionChanged}"
                @ch-exception-delete="${this._exceptionDelete}"
              >
              </ch-exception-editor>
            `):""}
      <br />
      <mwc-button @click="${this._addException}">Add Exception </mwc-button>
      <h4 class="underline">Current User</h4>
      <p style="font-size:16pt">${h.user.name}</p>
      <h4 class="underline">Current User Agent</h4>
      <br />
      ${navigator.userAgent}
      <br />
      <h4
        style="background:var(--paper-card-background-color);
          margin-bottom:-20px;"
        class="underline"
      >
        ${this.exception?"":html`
              ${this._save_button}
            `}
        ${this.exception?"":html`
              ${this._cancel_button}
            `}
      </h4>
    `:html``}_close(){const e=this.parentNode.parentNode.parentNode.querySelector("editor");this.parentNode.parentNode.parentNode.removeChild(e)}_save(){for(const e in this._config)this._config[e]==J[e]&&delete this._config[e];const e={...this._lovelace.config,custom_header:this._config};try{this._lovelace.saveConfig(e).then(()=>{window.location.href=window.location.href})}catch(e){alert(`Save failed: ${e}`)}}get _save_button(){return html`
      <mwc-button raised @click="${this._save}">${"Save and Reload"}</mwc-button>
    `}get _cancel_button(){return html`
      <mwc-button raised @click="${this._close}">Cancel</mwc-button>
    `}_addException(){let e;this._config.exceptions?(e=this._config.exceptions.slice(0),e.push({conditions:{},config:{}})):e=[{conditions:{},config:{}}],this._config={...this._config,exceptions:e},A(this,"config-changed",{config:this._config})}_configChanged({detail:e}){this._config&&(this._config={...this._config,...e.config},A(this,"config-changed",{config:this._config}))}_exceptionChanged(e){if(!this._config)return;const t=e.target.index,o=this._config.exceptions.slice(0);o[t]=e.detail.exception;for(const e of o)for(const t in e.config)this._config[t]==e.config[t]?delete e.config[t]:this._config[t]||J[t]!=e.config[t]||delete e.config[t];this._config={...this._config,exceptions:o},A(this,"config-changed",{config:this._config})}_exceptionDelete(e){if(!this._config)return;const t=e.target,o=this._config.exceptions.slice(0);o.splice(t.index,1),this._config={...this._config,exceptions:o},A(this,"config-changed",{config:this._config}),this.requestUpdate()}deepcopy(e){if(!e||"object"!=typeof e)return e;if("[object Date]"==Object.prototype.toString.call(e))return new Date(e.getTime());if(Array.isArray(e))return e.map(this.deepcopy);const t={};return Object.keys(e).forEach(o=>{t[o]=this.deepcopy(e[o])}),t}renderStyle(){return html`
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
    `}});customElements.define("ch-config-editor",class ChConfigEditor extends LitElement{static get properties(){return{defaultConfig:{},config:{},exception:{},_closed:{}}}constructor(){super(),this.buttonOptions=["show","hide","clock","overflow"],this.overflowOptions=["show","hide","clock"],this.swipeAnimation=["none","swipe","fade","flip"]}get _clock(){return"clock"==this.getConfig("menu")||"clock"==this.getConfig("voice")||"clock"==this.getConfig("options")}getConfig(e){return void 0!==this.config[e]?this.config[e]:J[e]}templateExists(e){return!("string"!=typeof e||!e.includes("{{")&&!e.includes("{%"))}haSwitch(e,t,o,n,i,r){const s=html`
      <iron-icon
        icon="mdi:alpha-t-box-outline"
        class="alert"
        title="Disabled: The current value is a template."
      ></iron-icon>
    `,a=html`
      <iron-icon icon="mdi:alert-box-outline" class="alert" title="Removes ability to edit UI."></iron-icon>
    `;return html`
      <ha-switch
        class="${this.exception&&void 0===this.config[e]?"inherited slotted":"slotted"}"
        ?checked="${!1!==this.getConfig(e)&&!this.templateExists(this.getConfig(e))}"
        .configValue="${e}"
        @change="${this._valueChanged}"
        title=${i}
        ?disabled=${this.templateExists(this.getConfig(e))}
      >
        ${n} ${this.templateExists(this.getConfig(e))&&t?s:""}
        ${o?a:""}
      </ha-switch>
    `}render(){return this.exception=void 0!==this.exception&&!1!==this.exception,html`
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
      ${this.exception?"":html`
            <h1 style="margin-top:-20px;margin-bottom:0;" class="underline">
              Custom Header
            </h1>
            <h4 style="margin-top:-5px;padding-top:10px;font-size:12pt;" class="underline">
              <a href="https://maykar.github.io/custom-header/" target="_blank">
                <ha-icon icon="mdi:help-circle" style="margin-top:-5px;"> </ha-icon>
                Docs&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://github.com/maykar/custom-header" target="_blank">
                <ha-icon icon="mdi:github-circle" style="margin-top:-5px;"> </ha-icon>
                Github&nbsp;&nbsp;&nbsp;</a
              >
              <a href="https://community.home-assistant.io/t/custom-header/" target="_blank">
                <ha-icon icon="hass:home-assistant" style="margin-top:-5px;"> </ha-icon>
                Forums</a
              >
            </h4>
            ${this.getConfig("editor_warnings")?html`
                  <br />
                  <div class="warning">
                    <p style="padding: 5px; margin: 0;">
                      You can temporaily disable Custom-Header by adding "?disable_ch" to the end of your URL.
                    </p>
                    <p style="padding: 5px; margin: 0;">
                      After using the "Raw Config Editor" you need to reload the page to restore Custom Header.
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      <ha-icon style="padding-right: 3px;" icon="mdi:alpha-t-box-outline"></ha-icon>Designates items
                      that are already a template and won't be modified by the editor.<br /><ha-icon
                        style="padding-right: 3px;"
                        icon="mdi:alert-box-outline"
                      ></ha-icon
                      >Marks items that remove your ability to edit the UI.<br />
                    </p>
                    <br />
                    <p style="padding: 5px; margin: 0;">
                      All text options accept Jinja. Hover over any item for more info.
                    </p>
                  </div>
                `:""}
            ${!this.exception&&this.getConfig("editor_warnings")?this.haSwitch("editor_warnings",!1,!1,"Display this info and warnings section.","Toggle editor warnings."):""}
          `}
      ${this.renderStyle()}
      ${this.getConfig("editor_warnings")&&!this.exception?html`
            <h4 class="underline">Main Config</h4>
          `:""}
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch("disabled_mode",!0,!1,"Disabled Mode","Completely disable Custom-Header.")}
        ${this.haSwitch("footer_mode",!0,!1,"Footer Mode","Turn the header into a footer.")}
        ${this.haSwitch("compact_mode",!0,!1,"Compact Mode","Make header compact.")}
        ${this.haSwitch("kiosk_mode",!0,!0,"Kiosk Mode","Hide and disable the header and sidebar")}
        ${this.haSwitch("disable_sidebar",!0,!1,"Disable Sidebar","Disable sidebar and menu button.")}
        ${this.haSwitch("chevrons",!0,!1,"Display Tab Chevrons","Disable scrolling arrows for tabs.")}
        ${this.haSwitch("hidden_tab_redirect",!0,!1,"Hidden Tab Redirect","Redirect from hidden tab.")}
        ${this.exception||this.getConfig("editor_warnings")?"":this.haSwitch("editor_warnings",!1,!1,"Display Editor Warnings & Info","Toggle editor warnings.")}
      </div>
      <hr />
      <div class="side-by-side">
        <paper-input
          style="padding: 10px 10px 0 10px;"
          class="${this.exception&&void 0===this.config.header_text?"inherited slotted":"slotted"}"
          label="Header text."
          .value="${this.getConfig("header_text")}"
          .configValue="${"header_text"}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        <paper-input
          placeholder="automatic"
          style="padding: 10px 10px 0 10px;"
          class="${this.exception&&void 0===this.config.locale?"inherited slotted":"slotted"}"
          label="Locale for default template variables (date/time)."
          .value="${this.getConfig("locale")}"
          .configValue="${"locale"}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
      </div>
      <h4 class="underline">Menu Items</h4>
      <div class="side-by-side">
        ${this.haSwitch("hide_config",!0,!0,'Hide "Configure UI"',"Hide item in options menu.")}
        ${this.haSwitch("hide_raw",!0,!0,'Hide "Raw Config Editor"',"Hide item in options menu.")}
        ${this.haSwitch("hide_help",!0,!1,'Hide "Help"',"Hide item in options menu.")}
        ${this.haSwitch("hide_unused",!0,!1,'Hide "Unused Entities"',"Hide item in options menu.")}
      </div>
      <h4 class="underline">Buttons</h4>
      <div style="padding-bottom:20px;" class="side-by-side">
        ${this.haSwitch("menu_hide",!0,!1,"Hide Menu Button","Hide the menu button.")}
        ${this.haSwitch("menu_dropdown",!0,!1,"Menu in Dropdown Menu","Put menu button in options menu.")}
        ${this.haSwitch("voice_hide",!0,!1,"Hide Voice Button","Hide the voice button.")}
        ${this.haSwitch("voice_dropdown",!0,!1,"Voice in Dropdown Menu","Put voice button in options menu.")}
        ${this.haSwitch("options_hide",!0,!0,"Hide Options Button","Hide the options button.")}
        ${this.haSwitch("reverse_button_direction",!0,!1,"Reverse Buttons Orientation","Reverses all buttons orientation.")}
      </div>
      <h4 class="underline">Tabs</h4>
      <paper-dropdown-menu id="tabs" @value-changed="${this._tabVisibility}">
        <paper-listbox slot="dropdown-content" .selected="${this.getConfig("show_tabs").length>0?"1":"0"}">
          <paper-item>Hide Tabs</paper-item>
          <paper-item>Show Tabs</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div class="side-by-side">
        <div id="show" style="display:${this.getConfig("show_tabs").length>0?"initial":"none"}">
          <paper-input
            class="${this.exception&&void 0===this.config.show_tabs?"inherited slotted":"slotted"}"
            label="Comma-separated list of tab numbers to show:"
            .value="${this.getConfig("show_tabs")}"
            .configValue="${"show_tabs"}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div id="hide" style="display:${this.getConfig("show_tabs").length>0?"none":"initial"}">
          <paper-input
            class="${this.exception&&void 0===this.config.hide_tabs?"inherited slotted":"slotted"}"
            label="Comma-separated list of tab numbers to hide:"
            .value="${this.getConfig("hide_tabs")}"
            .configValue="${"hide_tabs"}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <paper-input
          class="${this.exception&&void 0===this.config.default_tab?"inherited slotted":"slotted"}"
          label="Default tab:"
          .value="${this.getConfig("default_tab")}"
          .configValue="${"default_tab"}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
        ${this.haSwitch("reverse_tab_direction",!0,!1,"Reverse Tab Direction","Places tabs on right side in reverse order.")}
      </div>
    `}_toggleCard(){this._closed=!this._closed,A(this,"iron-resize")}_tabVisibility(){const e=this.shadowRoot.querySelector("#show"),t=this.shadowRoot.querySelector("#hide");"Hide Tabs"==this.shadowRoot.querySelector("#tabs").value?(e.style.display="none",t.style.display="initial"):(t.style.display="none",e.style.display="initial")}_valueChanged(e){this.config&&(e.target.configValue&&(""===e.target.value?delete this.config[e.target.configValue]:this.config={...this.config,[e.target.configValue]:void 0!==e.target.checked?e.target.checked:e.target.value}),A(this,"ch-config-changed",{config:this.config}))}renderStyle(){return html`
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
    `}});customElements.define("ch-exception-editor",class ChExceptionEditor extends LitElement{static get properties(){return{config:{},exception:{},_closed:{}}}constructor(){super(),this._closed=!0}render(){return this.exception?html`
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
            ${Object.values(this.exception.conditions).join(", ").substring(0,40)||"New Exception"}
            <paper-icon-button
              icon="${this._closed?"mdi:chevron-down":"mdi:chevron-up"}"
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
            .defaultConfig="${{...J,...this.config}}"
            .config="${this.exception.config}"
            @ch-config-changed="${this._configChanged}"
          >
          </ch-config-editor>
        </div>
      </paper-card>
    `:html``}renderStyle(){return html`
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
    `}_toggleCard(){this._closed=!this._closed,A(this,"iron-resize")}_deleteException(){A(this,"ch-exception-delete")}_conditionsChanged({detail:e}){if(!this.exception)return;const t={...this.exception,conditions:e.conditions};A(this,"ch-exception-changed",{exception:t})}_configChanged(e){if(e.stopPropagation(),!this.exception)return;const t={...this.exception,config:e.detail.config};A(this,"ch-exception-changed",{exception:t})}});customElements.define("ch-conditions-editor",class ChConditionsEditor extends LitElement{static get properties(){return{conditions:{}}}get _user(){return this.conditions.user||""}get _user_agent(){return this.conditions.user_agent||""}get _media_query(){return this.conditions.media_query||""}get _query_string(){return this.conditions.query_string||""}render(){return this.conditions?html`
      <paper-input
        label="User (Seperate multiple users with a comma.)"
        .value="${this._user}"
        .configValue="${"user"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="User Agent"
        .value="${this._user_agent}"
        .configValue="${"user_agent"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="Media Query"
        .value="${this._media_query}"
        .configValue="${"media_query"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="Query String"
        .value="${this._query_string}"
        .configValue="${"query_string"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
    `:html``}_valueChanged(e){if(!this.conditions)return;const t=e.target;this[`_${t.configValue}`]!==t.value&&(t.configValue&&(""===t.value?delete this.conditions[t.configValue]:this.conditions={...this.conditions,[t.configValue]:t.value}),A(this,"ch-conditions-changed",{conditions:this.conditions}))}});const hideMenuItems=(e,t,o)=>{const localized=(e,t)=>{let o;const n=document.querySelector("home-assistant").hass;return o="raw_editor"===t?n.localize("ui.panel.lovelace.editor.menu.raw_editor"):"unused_entities"==t?n.localize("ui.panel.lovelace.unused_entities.title"):n.localize(`ui.panel.lovelace.menu.${t}`),e.innerHTML.includes(o)||e.getAttribute("aria-label")==o};(o?document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("app-toolbar > paper-menu-button"):t.options).querySelector("paper-listbox").querySelectorAll("paper-item").forEach(t=>{e.hide_help&&localized(t,"help")||e.hide_unused&&localized(t,"unused_entities")||e.hide_refresh&&localized(t,"refresh")||e.hide_config&&localized(t,"configure_ui")||e.hide_raw&&localized(t,"raw_editor")?t.style.display="none":t.style.display=""})},buttonToOverflow=(e,t,o,n)=>{o.options.querySelector(`#${e.toLowerCase()}_dropdown`)&&o.options.querySelector(`#${e.toLowerCase()}_dropdown`).remove();const i=document.createElement("paper-item"),r=document.createElement("ha-icon");i.setAttribute("id",`${e.toLowerCase()}_dropdown`),r.setAttribute("icon",n.button_icons[e.toLowerCase()]||t),r.style.pointerEvents="none",n.reverse_button_direction?r.style.marginLeft="auto":r.style.marginRight="auto",i.innerText=e,i.appendChild(r),i.addEventListener("click",()=>{o[e.toLowerCase()].click()}),r.addEventListener("click",()=>{o[e.toLowerCase()].click()}),o.options.querySelector("paper-listbox").appendChild(i)};if("storage"===u.mode){const e=document.createElement("paper-item");e.setAttribute("id","ch_settings"),e.addEventListener("click",()=>(()=>{if(window.scrollTo(0,0),!p.querySelector("ha-app-layout editor")){const e=document.createElement("editor"),t=document.createElement("div");t.style.cssText="\n      padding: 20px;\n      max-width: 600px;\n      margin: 15px auto;\n      background: var(--paper-card-background-color);\n      border: 6px solid var(--paper-card-background-color);\n    ",e.style.cssText="\n      width: 100%;\n      min-height: 100%;\n      box-sizing: border-box;\n      position: absolute;\n      background: var(--background-color, grey);\n      z-index: 2;\n      padding: 5px;\n    ",p.querySelector("ha-app-layout").insertBefore(e,p.querySelector("#view")),e.appendChild(t),t.appendChild(document.createElement("custom-header-editor"))}})()),e.innerHTML="Custom Header";const t=_.options.querySelector("paper-listbox").querySelectorAll("paper-item");_.options.querySelector("paper-listbox").querySelector("#ch_settings")||_.options.querySelector("paper-listbox").insertBefore(e,t[t.length])}const kioskMode=(e,t)=>{if(window.location.href.includes("disable_ch"))return;let o=document.createElement("style");o.setAttribute("id","ch_header_style"),t||(o.innerHTML+="\n        #drawer {\n          display: none;\n        }\n      "),e||(o.innerHTML+="\n        ch-header {\n          display: none;\n        }\n        app-header {\n          display: none;\n        }\n        hui-view {\n          padding-top: 100px;\n        }\n        hui-view, hui-panel-view {\n          min-height: calc(100vh + 96px);\n          margin-top: -96px;\n          margin-bottom: -16px;\n        }\n      ");const n=p.querySelector("#ch_header_style");n&&n.innerText==o.innerHTML||(p.appendChild(o),n&&n.remove()),t||(m.drawer.style.display="none",m.sidebar.main.shadowRoot.querySelector("#ch_sidebar_style")||(o=document.createElement("style"),o.setAttribute("id","ch_sidebar_style"),o.innerHTML=":host(:not([expanded])) {width: 0px !important;}",m.sidebar.main.shadowRoot.appendChild(o)),m.main.shadowRoot.querySelector("#ch_sidebar_style")||(o=document.createElement("style"),o.setAttribute("id","ch_sidebar_style"),o.innerHTML=":host {--app-drawer-width: 0px !important;}",m.main.shadowRoot.appendChild(o))),window.dispatchEvent(new Event("resize"))},removeKioskMode=()=>{m.drawer.style.display="";let e=m.main.shadowRoot.querySelector("#ch_sidebar_style");e&&e.remove(),e=m.sidebar.main.shadowRoot.querySelector("#ch_sidebar_style"),e&&e.remove(),m.drawer.style.display=""},insertStyleTags=e=>{let t=48;e.compact_mode||(e.reverse_button_direction?(_.container.querySelector("#contentContainer").dir="ltr",_.container.querySelector("#contentContainer").style.textAlign="right"):(_.container.querySelector("#contentContainer").style.textAlign="",_.container.querySelector("#contentContainer").dir=""),_.container.querySelector("#contentContainer").innerHTML=e.header_text,t=_.tabs.length?96:48);let o=document.createElement("style");o.setAttribute("id","ch_header_style"),o.innerHTML=`\n      ch-header {\n        padding-left: 10px;\n        padding-right: 10px;\n        box-sizing: border-box;\n        display:flex;\n        justify-content: center;\n        font: 400 20px Roboto, sans-serif;\n        background: ${e.background||"var(--primary-color)"};\n        color: ${e.elements_color||"var(--text-primary-color)"};\n        margin-top: 4px;\n        margin-bottom: 0px;\n        margin-top: ${e.footer_mode?"4px;":"0px"};\n        ${e.footer_mode?"position: sticky; bottom: 0px;":"position: sticky; top: 0px;"}\n        ${e.header_css?e.header_css:""}\n      }\n      ch-stack {\n        flex-direction: column;\n        width: 100%;\n        margin-left: 9px;\n        margin-right: 9px;\n        ${e.stack_css?e.stack_css:""}\n      }\n      #contentContainer {\n        padding: 12px 6px 12px 6px;\n        ${e.compact_mode?"display: none;":""}\n        ${e.header_text.includes("<br>")?"\n          font-size: 17px;\n          line-height: 1.2;\n          margin: -9px 0px 0px;\n        ":""}\n        ${e.header_text_css?e.header_text_css:""}\n\n      }\n      app-header {\n        display: none;\n      }\n      paper-tab.iron-selected {\n        ${e.active_tab_color?`color: ${e.active_tab_color};`:""}\n        ${e.active_tab_css?e.active_tab_css:""}\n      }\n      [buttonElem="menu"] {\n        ${e.menu_color?`color: ${e.menu_color};`:""}\n        ${e.menu_hide?"display: none;":""}\n        ${e.menu_css?e.menu_css:""}\n        ${e.footer_mode&&e.compact_mode?"margin-top:0 !important;":""}\n      }\n      [buttonElem="options"] {\n        ${e.options_color?`color: ${e.options_color};`:""}\n        ${e.options_hide?"display: none;":""}\n        ${e.options_css?e.options_css:""}\n        ${e.footer_mode&&e.compact_mode?"margin-top:0 !important;":""}\n      }\n      [buttonElem="voice"] {\n        ${e.voice_color?`color: ${e.voice_color};`:""}\n        ${e.voice_hide?"display: none;":""}\n        ${e.voice_css?e.voice_css:""}\n        ${e.footer_mode&&e.compact_mode?"margin-top:0 !important;":""}\n      }\n      paper-tab {\n        ${e.all_tabs_color?`color: ${e.all_tabs_color};`:""}\n        ${e.all_tabs_css?e.all_tabs_css:""}\n      }\n      paper-tabs {\n        ${e.tab_indicator_color?`--paper-tabs-selection-bar-color: ${e.tab_indicator_color} !important;`:""}\n        ${e.tab_container_css?e.tab_container_css:""}\n      }\n    `,e.tabs_color&&Object.keys(e.tabs_color).forEach(t=>{o.innerHTML+=`\n        paper-tab:nth-child(${tabIndexByName(t)+1}) {\n          color: ${e.tabs_color[t]};\n        }\n      `}),e.hide_tabs&&e.hide_tabs.forEach(e=>{o.innerHTML+=`\n        paper-tab:nth-child(${tabIndexByName(e)+1}) {\n          display: none;\n        }\n      `}),e.tabs_css&&Object.keys(e.tabs_css).forEach(t=>{o.innerHTML+=`\n        paper-tab:nth-child(${tabIndexByName(t)+1}) {\n          ${e.tabs_css[t]};\n        }\n      `});let n=p.querySelector("#ch_header_style");p.appendChild(o),n&&n.remove(),o=document.createElement("style"),o.setAttribute("id","ch_view_style"),o.innerHTML=`\n        hui-view, hui-panel-view {\n          min-height: calc(100vh - 112px);\n          margin-top: -96px;\n          ${e.footer_mode?`padding-bottom: ${t}px;`:""}\n          ${e.footer_mode?`margin-bottom: -${t+4}px;`:"margin-bottom: -16px;"}\n        }\n        hui-panel-view {\n          padding-top: 100px;\n          ${e.panel_view_css?e.panel_view_css:""}\n        }\n        hui-view {\n          padding-top: 100px;\n          ${e.view_css?e.view_css:""}\n        }\n        #view {\n          ${e.footer_mode?`min-height: calc(100vh - ${t+4}px) !important;`:""}\n          ${e.compact_mode&&!e.footer_mode?`min-height: calc(100vh - ${t+16}px) !important;`:""}\n        }\n      `,n=p.querySelector("#ch_view_style"),n&&o.innerHTML==n.innerHTML||(p.appendChild(o),n&&n.remove()),o=document.createElement("style"),o.setAttribute("id","ch_chevron"),o.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',n=_.tabContainer.shadowRoot.querySelector("#ch_chevron"),_.tabContainer.shadowRoot.appendChild(o),n&&n.remove(),o=document.createElement("style"),o.setAttribute("id","ch_animated"),o.innerHTML='\n    ch-header, [buttonElem="menu"], [buttonElem="options"], [buttonElem="voice"] {\n      transition: margin-top 0.4s ease-in-out;\n      transition: top 0.4s ease-in-out;\n    }\n  ',setTimeout(()=>{p.querySelector("#ch_animated")||p.appendChild(o)},1e3)},styleHeader=e=>{if(window.customHeaderConfig=e,window.location.href.includes("disable_ch")&&(e.disabled_mode=!0),e.disabled_mode)return window.customHeaderDisabled=!0,removeKioskMode(),_.container&&(_.container.style.visibility="hidden"),p.querySelector("#ch_header_style")&&p.querySelector("#ch_header_style").remove(),p.querySelector("#ch_view_style")&&p.querySelector("#ch_view_style").remove(),_.tabContainer.shadowRoot.querySelector("#ch_chevron")&&_.tabContainer.shadowRoot.querySelector("#ch_chevron").remove(),_.menu.style.display="none",p.querySelector("ha-menu-button").style.display="",m.sidebar.main.shadowRoot.querySelector(".menu").style="",m.sidebar.main.shadowRoot.querySelector("paper-listbox").style="",m.sidebar.main.shadowRoot.querySelector("div.divider").style="",void window.dispatchEvent(new Event("resize"));if(window.customHeaderDisabled=!1,hideMenuItems(e,_,!1),_.menu.style.display="",_.container&&(_.container.style.visibility="visible"),_.tabs.length||(e.compact_mode=!1),e.menu_dropdown&&!e.disable_sidebar?buttonToOverflow("Menu","mdi:menu",_,e):_.options.querySelector("#menu_dropdown")&&_.options.querySelector("#menu_dropdown").remove(),e.voice_dropdown?buttonToOverflow("Voice","mdi:microphone",_,e):_.options.querySelector("#voice_dropdown")&&_.options.querySelector("#voice_dropdown").remove(),e.reverse_button_direction?(_.options.setAttribute("horizontal-align","left"),_.options.querySelector("paper-listbox").setAttribute("dir","ltr")):(_.options.setAttribute("horizontal-align","right"),_.options.querySelector("paper-listbox").setAttribute("dir","rtl")),e.disable_sidebar?(kioskMode(!0,!1),insertStyleTags(e)):e.hide_header?(insertStyleTags(e),kioskMode(!1,!0)):e.disable_sidebar||e.kiosk_mode||e.hide_header||(removeKioskMode(),m.sidebar.main.shadowRoot.querySelector(".menu").style="height:49px;",m.sidebar.main.shadowRoot.querySelector("paper-listbox").style="height:calc(100% - 155px);",m.sidebar.main.shadowRoot.querySelector("div.divider").style="margin-bottom: -10px;",insertStyleTags(e)),e.chevrons?_.tabContainer.hideScrollButtons=!1:_.tabContainer.hideScrollButtons=!0,e.indicator_top?_.tabContainer.alignBottom=!0:_.tabContainer.alignBottom=!1,e.footer_mode?_.options.setAttribute("vertical-align","bottom"):_.options.removeAttribute("vertical-align"),e.footer_mode?_.container.removeAttribute("slot"):_.container.setAttribute("slot","header"),_.tabContainer.dir=e.reverse_tab_direction?"rtl":"ltr",_.container.dir=e.reverse_button_direction?"rtl":"ltr",e.tab_icons&&_.tabs.length)for(const t in e.tab_icons){const o=tabIndexByName(t),n=_.tabs[o].querySelector("ha-icon");e.tab_icons[t]?n.icon=e.tab_icons[t]:n.icon=u.config.views[o].icon}if(e.button_icons)for(const t in e.button_icons)e.button_icons[t]?"options"===t?_[t].querySelector("paper-icon-button").icon=e.button_icons[t]:_[t].icon=e.button_icons[t]:"menu"===t?_.menu.icon="mdi:menu":"voice"===t?_.voice.icon="mdi:microphone":"options"===t&&(_[t].querySelector("paper-icon-button").icon="mdi:dots-vertical");if(e.button_text)for(const t in e.button_text){const o=document.createElement("p");o.className="buttonText";const n="options"===t?_[t].querySelector("paper-icon-button"):_[t];e.button_text[t]||!n.shadowRoot.querySelector(".buttonText")?e.button_text[t]&&(n.shadowRoot.querySelector(".buttonText")?n.shadowRoot.querySelector(".buttonText").innerHTML=e.button_text[t]:(o.innerHTML=e.button_text[t],n.shadowRoot.appendChild(o)),e.reverse_button_direction&&"menu"!==t||!e.reverse_button_direction&&"menu"===t?n.shadowRoot.querySelector(".buttonText").dir="ltr":n.shadowRoot.querySelector(".buttonText").dir="rtl",n.shadowRoot.querySelector("iron-icon").style.display="none",n.style.width="auto",e.button_text[t].includes("<br>")?(n.shadowRoot.querySelector(".buttonText").style.fontSize="17px",n.shadowRoot.querySelector(".buttonText").style.lineHeight="1.2",n.shadowRoot.querySelector(".buttonText").style.margin="-5px 0px 0px 0px"):n.shadowRoot.querySelector(".buttonText").style.margin="5.5px 0px 0px 0px"):(n.shadowRoot.querySelector(".buttonText").remove(),n.shadowRoot.querySelector("iron-icon").style.display="",n.style.width="")}((e,t)=>{const o=m.sidebar.listbox.querySelector('[data-panel="lovelace"]');if(e.hide_tabs.includes(0)&&!e.default_tab){for(const e of t.tabs)if("none"!=getComputedStyle(e).display){o.setAttribute("href",`/lovelace/${t.tabContainer.indexOf(e)}`);break}}else e.hide_tabs.includes(0)&&o.setAttribute("href",`/lovelace/${tabIndexByName(e.default_tab)}`);const n=null!=e.default_tab?tabIndexByName(e.default_tab):null;if(e.hidden_tab_redirect&&t.tabs.length){const i=t.tabContainer.indexOf(t.tabContainer.querySelector("paper-tab.iron-selected"));if(e.hide_tabs.includes(i)&&e.hide_tabs.length!=t.tabs.length)if(n&&!e.hide_tabs.includes(tabIndexByName(n)))"none"!=getComputedStyle(t.tabs[n]).display&&(t.tabs[n].click(),o.setAttribute("href",`/lovelace/${n}`));else for(const e of t.tabs)if("none"!=getComputedStyle(e).display){e.click(),o.setAttribute("href",`/lovelace/${t.tabContainer.indexOf(e)}`);break}}null!=n&&!window.customHeaderDefaultClicked&&t.tabs[n]&&"none"!=getComputedStyle(t.tabs[n]).display&&t.tabs[n].click(),window.customHeaderDefaultClicked=!0})(e,_),_.tabs.length||(_.tabContainer.style.display="none"),((e,t)=>{if(e.menu_hide)return;const buildDot=()=>{const t=document.createElement("div");return t.className="dot",t.style.cssText=`\n        pointer-events: none;\n        position: relative;\n        background-color: ${e.notification_dot_color};\n        width: 12px;\n        height: 12px;\n        top: -28px;\n        right: ${e.reverse_button_direction?"":"-"}16px;\n        border-radius: 50%;\n    `,t},menuButtonVisibility=()=>{e.disable_sidebar||window.customHeaderDisabled||("hidden"===m.menu.style.visibility?t.menu.style.display="none":t.menu.style.display="initial")},notificationDot=e=>{const t=document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root");e.forEach(({addedNodes:e,removedNodes:o})=>{if(e)for(const o of e)"dot"!==o.className||t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")||(t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(buildDot()),t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".buttonText")&&(t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot").style.display="none",t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".buttonText").style.borderBottom=`3px solid ${window.customHeaderConfig.notification_dot_color}`));if(o)for(const e of o)"dot"===e.className&&t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")&&(t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot").remove(),t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".buttonText")&&(t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".buttonText").style.borderBottom=""))})};if(!window.customHeaderMenuObserver){window.customHeaderMenuObserver=!0,new MutationObserver(notificationDot).observe(m.menu.shadowRoot,{childList:!0}),new MutationObserver(menuButtonVisibility).observe(m.menu,{attributes:!0,attributeFilter:["style"]})}menuButtonVisibility();const o=t.menu.shadowRoot.querySelector(".dot");o&&o.style.cssText!=buildDot().style.cssText&&(o.remove(),e.button_text.menu&&(t.menu.shadowRoot.querySelector(".buttonText").style.textDecoration="")),!t.menu.shadowRoot.querySelector(".dot")&&m.menu.shadowRoot.querySelector(".dot")&&(t.menu.shadowRoot.appendChild(buildDot()),e.button_text.menu&&(t.menu.shadowRoot.querySelector(".dot").style.display="none",t.menu.shadowRoot.querySelector(".buttonText").style.borderBottom=`3px solid ${e.notification_dot_color}`))})(e,_),window.customHeaderShrink||window.addEventListener("scroll",(function(e){const t="none"===window.getComputedStyle(_.container.querySelector("#contentContainer")).getPropertyValue("display");"0px"===window.getComputedStyle(_.container).getPropertyValue("bottom")||t||(window.scrollY>48?(_.container.style.top="-48px",_.menu.style.marginTop="48px",_.voice.style.marginTop="48px",_.options.style.marginTop="48px"):(_.container.style.transition="0s",_.menu.style.transition="0s",_.voice.style.transition="0s",_.options.style.transition="0s",_.container.style.top=`-${window.scrollY}px`,_.menu.style.marginTop=`${window.scrollY}px`,_.voice.style.marginTop=`${window.scrollY}px`,_.options.style.marginTop=`${window.scrollY}px`),_.container.style.transition="")})),A(_.container,"iron-resize")},buildConfig=e=>{e||(e={...J,...u.config.custom_header});const t=(e={...e,...conditionalConfig(e)}).template_variables;delete e.template_variables;const processAndContinue=()=>{e.hide_tabs&&(e.hide_tabs=processTabArray(e.hide_tabs)),e.show_tabs&&(e.show_tabs=processTabArray(e.show_tabs)),e.show_tabs&&e.show_tabs.length&&(e.hide_tabs=(e=>{if(e&&e.length){const t=[];for(let e=0;e<m.tabs.length;e+=1)t.push(e);return t.filter(t=>!e.includes(t))}})(e.show_tabs)),(e.disable_sidebar||e.menu_dropdown)&&(e.menu_hide=!0),e.voice_dropdown&&(e.voice_hide=!0),e.kiosk_mode&&!e.disabled_mode?kioskMode(!1,!1):styleHeader(e)},o=JSON.stringify(e),n=!!t||o.includes("{{")||o.includes("{%");let i;n?i=((e,t,o)=>{const n=h.connection,i={user:h.user.name,browser:navigator.userAgent,...t.variables,...defaultVariables(o)},r=t.template,s=t.entity_ids;return n.subscribeMessage(t=>e(t.result),{type:"render_template",template:r,variables:i,entity_ids:s})})(t=>{if(window.customHeaderLastTemplateResult!=t){window.customHeaderLastTemplateResult=t;try{e=JSON.parse(t.replace(/"true"/gi,"true").replace(/"false"/gi,"false").replace(/""/,""))}catch(e){r=!0;let o=`[CUSTOM-HEADER] There was an issue with the template: ${((e,t)=>{const o=t.toString().match(/\d+/g)[0],n=e.substr(0,o).match(/[^,]*$/),i=e.substr(o).match(/^[^,]*/);return`${n?n[0]:""}${i?i[0]:""}`.replace('":"',': "')})(t,e)}`;o.includes("locale")&&(o='[CUSTOM-HEADER] There was an issue one of your "template_variables".'),console.log(o)}processAndContinue()}},{template:JSON.stringify(t).replace(/\\/g,"")+JSON.stringify(e).replace(/\\/g,"")},e.locale):processAndContinue();let r=!1;(async()=>{try{await i}catch(e){r=!0,console.log("[CUSTOM-HEADER] There was an error with one or more of your templates:"),console.log(`${e.message.substring(0,e.message.indexOf(")"))})`)}})(),n&&window.setTimeout(()=>{r||p.querySelector("custom-header-editor")||((async()=>{const e=await i;i=void 0,await e()})(),buildConfig())},1e3*(60-(new Date).getSeconds()))};buildConfig(),(()=>{const e=new MutationObserver(e=>{const t=window.customHeaderConfig;e.forEach(({addedNodes:e,target:o})=>{if("view"==o.id&&e.length&&_.tabs.length){const e=m.tabContainer.indexOf(p.querySelector("paper-tab.iron-selected"));_.tabContainer.querySelector("paper-tab.iron-selected")!==e&&_.tabContainer.setAttribute("selected",e)}else e.length&&"PARTIAL-PANEL-RESOLVER"==o.nodeName?(p.querySelector("editor")&&p.querySelector("editor").remove(),buildConfig()):"edit-mode"===o.className&&e.length?(p.querySelector("editor")&&p.querySelector("editor").remove(),window.customHeaderDisabled||hideMenuItems(t,_,!0),_.menu.style.display="none",p.querySelector("ch-header").style.display="none",m.appHeader.style.display="block",p.querySelector("#ch_view_style")&&p.querySelector("#ch_view_style").remove()):"APP-HEADER"===o.nodeName&&e.length&&(m.menu=m.appHeader.querySelector("ha-menu-button"),m.appHeader.style.display="none",_.menu.style.display="",p.querySelector("ch-header").style.display="",buildConfig())})});e.observe(m.partialPanelResolver,{childList:!0}),e.observe(m.appHeader,{childList:!0}),e.observe(p.querySelector("#view"),{childList:!0})})();
