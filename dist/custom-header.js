const e=e=>{const t=new Date;return{time:t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"}),date:t.toLocaleDateString(e,{}),monthNum:t.getMonth()+1,monthNumLZ:String(t.getMonth()+1).padStart(2,0),monthNameShort:t.toLocaleDateString(e,{month:"short"}),monthNameLong:t.toLocaleDateString(e,{month:"long"}),dayNum:t.getDate(),dayNumLZ:String(t.getDate()).padStart(2,0),dayNameShort:t.toLocaleDateString(e,{weekday:"short"}),dayNameLong:t.toLocaleDateString(e,{weekday:"long"}),hours12:t.getHours()>12?t.getHours()-12:t.getHours(),hours12LZ:String(t.getHours()>12?t.getHours()-12:t.getHours()).padStart(2,0),hours24:t.getHours(),hours24LZ:String(t.getHours()).padStart(2,0),minutes:t.getMinutes(),minutesLZ:String(t.getMinutes()).padStart(2,0),year2d:String(t.getFullYear()).substr(-2),year4d:t.getFullYear(),AMPM:t.getHours()>=12?"PM":"AM",ampm:t.getHours()>=12?"pm":"am"}};var t={},o=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,i="[^\\s]+",n=/\[([^]*?)\]/gm,s=function(){};function r(e,t){for(var o=[],i=0,n=e.length;i<n;i++)o.push(e[i].substr(0,t));return o}function a(e){return function(t,o,i){var n=i[e].indexOf(o.charAt(0).toUpperCase()+o.substr(1).toLowerCase());~n&&(t.month=n)}}function c(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"],h=r(l,3),u=r(d,3);t.i18n={dayNamesShort:u,dayNames:d,monthNamesShort:h,monthNames:l,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var p={D:function(e){return e.getDate()},DD:function(e){return c(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return c(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return c(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return c(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return c(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return c(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return c(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return c(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return c(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return c(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return c(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+c(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},m={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+i,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var o=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?o-1:o)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",s],ddd:[i,s],MMM:[i,a("monthNamesShort")],MMMM:[i,a("monthNames")],a:[i,function(e,t,o){var i=t.toLowerCase();i===o.amPm[0]?e.isPm=!1:i===o.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var o,i=(t+"").match(/([+-]|\d\d)/gi);i&&(o=60*i[1]+parseInt(i[2],10),e.timezoneOffset="+"===i[0]?o:-o)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,t.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},t.format=function(e,i,s){var r=s||t.i18n;if("number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date in fecha.format");i=t.masks[i]||i||t.masks.default;var a=[];return(i=(i=i.replace(n,(function(e,t){return a.push(t),"@@@"}))).replace(o,(function(t){return t in p?p[t](e,r):t.slice(1,t.length-1)}))).replace(/@@@/g,(function(){return a.shift()}))},t.parse=function(e,i,s){var r=s||t.i18n;if("string"!=typeof i)throw new Error("Invalid format in fecha.parse");if(i=t.masks[i]||i,e.length>1e3)return null;var a={},c=[],d=[];i=i.replace(n,(function(e,t){return d.push(t),"@@@"}));var l,h=(l=i,l.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(o,(function(e){if(m[e]){var t=m[e];return c.push(t[1]),"("+t[0]+")"}return e}));h=h.replace(/@@@/g,(function(){return d.shift()}));var u=e.match(new RegExp(h,"i"));if(!u)return null;for(var p=1;p<u.length;p++)c[p-1](a,u[p],r);var g,_=new Date;return!0===a.isPm&&null!=a.hour&&12!=+a.hour?a.hour=+a.hour+12:!1===a.isPm&&12==+a.hour&&(a.hour=0),null!=a.timezoneOffset?(a.minute=+(a.minute||0)-+a.timezoneOffset,g=new Date(Date.UTC(a.year||_.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0))):g=new Date(a.year||_.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0),g};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();var g=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null};const _=document.querySelector("home-assistant"),f=_.hass,b=g(),y=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot}(),v={};v.main=_.shadowRoot.querySelector("home-assistant-main"),v.tabs=Array.from((y.querySelector("paper-tabs")||y).querySelectorAll("paper-tab")),v.tabContainer=y.querySelector("paper-tabs"),v.activeTab=y.querySelector("paper-tab.iron-selected"),v.menu=y.querySelector("ha-menu-button"),v.options=y.querySelector("paper-menu-button"),v.voice=y.querySelector("ha-start-voice-button")||y.querySelector('paper-icon-button[icon="hass:microphone"]'),v.drawer=v.main.shadowRoot.querySelector("#drawer"),v.sidebar={},v.sidebar.main=v.main.shadowRoot.querySelector("ha-sidebar"),v.sidebar.menu=v.sidebar.main.shadowRoot.querySelector(".menu"),v.sidebar.listbox=v.sidebar.main.shadowRoot.querySelector("paper-listbox"),v.sidebar.divider=v.sidebar.main.shadowRoot.querySelector("div.divider"),v.appHeader=y.querySelector("app-header"),v.appLayout=y.querySelector("ha-app-layout"),v.partialPanelResolver=v.main.shadowRoot.querySelector("partial-panel-resolver");const w=[];for(const e in v);w.length&&console.log(`[CUSTOM HEADER] The following HA element${w.length>1?"s":""} could not be found: ${w.join(", ")}`);const S=e=>{let t;const{views:o}=b.config;return isNaN(e)?o.forEach(i=>{i.title!==e&&i.path!==e||(t=o.indexOf(i))}):t=parseInt(e,10),t},x=e=>{const t=[],o=(e,t)=>new Array(t-e+1).fill(void 0).map((t,o)=>o+e);if(e.includes("to")){const i=e.split("to");parseInt(i[1])>parseInt(i[0])?t.push(o(parseInt(i[0]),parseInt(i[1]))):t.push(o(parseInt(i[1]),parseInt(i[0])))}return t.flat()},C=e=>{let t=[];e="string"==typeof e?e.replace(/\s+/g,"").split(","):e;for(const o in e)"string"==typeof e[o]&&e[o].includes("to")?t.push(x(e[o])):t.push(e[o]);t=t.flat();for(const e in t)isNaN(t[e])?t[e]=S(t[e]):t[e]=parseInt(t[e]);return t.sort((e,t)=>e-t)},$=e=>{let t={},o=0;return e.exceptions&&e.exceptions.forEach(e=>{const i=(e=>{const t={user:f.user.name,user_agent:navigator.userAgent};let o=0;for(const i in e)if("user"==i&&e[i].includes(","))e[i].split(/[ ,]+/).forEach(e=>{t[i]==e&&o++});else{if(!(t[i]==e[i]||"query_string"==i&&window.location.search.includes(e[i])||"user_agent"==i&&t[i].includes(e[i])||"media_query"==i&&window.matchMedia(e[i]).matches))return 0;o++}return o})(e.conditions);i>o&&(o=i,t=e.config)}),t.hide_tabs&&e.show_tabs&&t.hide_tabs.length&&e.show_tabs.length?delete e.show_tabs:t.show_tabs&&e.hide_tabs&&t.show_tabs.length&&e.hide_tabs.length&&delete e.hide_tabs,{...e,...t}},q=(()=>{if(y.querySelector("ch-header"))return;const e={};e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",v.tabs.forEach(t=>{const o=v.tabs.indexOf(t),i=t.cloneNode(!0),n=i.querySelector("ha-icon");n&&n.setAttribute("icon",b.config.views[o].icon),i.addEventListener("click",()=>{v.tabs[o].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(i)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const t=(t,o)=>{if("options"===t){e[t]=v[t].cloneNode(!0),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const o=Array.from(e[t].querySelectorAll("paper-item"));o.forEach(e=>{const i=o.indexOf(e);e.addEventListener("click",()=>{v[t].querySelectorAll("paper-item")[i].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else{if(!v[t])return;e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{(v[t].shadowRoot.querySelector("paper-icon-button")||v[t]).dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})}e[t].setAttribute("icon",o),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};t("menu","mdi:menu"),t("voice","mdi:microphone"),t("options","mdi:dots-vertical");const o=document.createElement("ch-stack"),i=document.createElement("div");return i.setAttribute("id","contentContainer"),e.container=document.createElement("ch-header"),e.menu&&e.container.appendChild(e.menu),e.container.appendChild(o),e.stack=e.container.querySelector("ch-stack"),e.stack.appendChild(i),e.stack.appendChild(e.tabContainer),e.voice&&"hidden"!=e.voice.style.visibility&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),v.appLayout.appendChild(e.container),e})(),E=new WeakMap,k=e=>"function"==typeof e&&E.has(e),M=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,N=(e,t,o=null)=>{for(;t!==o;){const o=t.nextSibling;e.removeChild(t),t=o}},A={},T={},R=`{{lit-${String(Math.random()).slice(2)}}}`,H=`\x3c!--${R}--\x3e`,P=new RegExp(`${R}|${H}`),D="$lit$";class V{constructor(e,t){this.parts=[],this.element=t;const o=[],i=[],n=document.createTreeWalker(t.content,133,null,!1);let s=0,r=-1,a=0;const{strings:c,values:{length:d}}=e;for(;a<d;){const e=n.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:o}=t;let i=0;for(let e=0;e<o;e++)L(t[e].name,D)&&i++;for(;i-- >0;){const t=c[a],o=Y.exec(t)[2],i=o.toLowerCase()+D,n=e.getAttribute(i);e.removeAttribute(i);const s=n.split(P);this.parts.push({type:"attribute",index:r,name:o,strings:s}),a+=s.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(R)>=0){const i=e.parentNode,n=t.split(P),s=n.length-1;for(let t=0;t<s;t++){let o,s=n[t];if(""===s)o=U();else{const e=Y.exec(s);null!==e&&L(e[2],D)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-D.length)+e[3]),o=document.createTextNode(s)}i.insertBefore(o,e),this.parts.push({type:"node",index:++r})}""===n[s]?(i.insertBefore(U(),e),o.push(e)):e.data=n[s],a+=s}}else if(8===e.nodeType)if(e.data===R){const t=e.parentNode;null!==e.previousSibling&&r!==s||(r++,t.insertBefore(U(),e)),s=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(o.push(e),r--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(R,t+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=i.pop()}for(const e of o)e.parentNode.removeChild(e)}}const L=(e,t)=>{const o=e.length-t.length;return o>=0&&e.slice(o)===t},O=e=>-1!==e.index,U=()=>document.createComment(""),Y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class z{constructor(e,t,o){this.__parts=[],this.template=e,this.processor=t,this.options=o}update(e){let t=0;for(const o of this.__parts)void 0!==o&&o.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=M?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],o=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let n,s=0,r=0,a=i.nextNode();for(;s<o.length;)if(n=o[s],O(n)){for(;r<n.index;)r++,"TEMPLATE"===a.nodeName&&(t.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=t.pop(),a=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,n.name,n.strings,this.options));s++}else this.__parts.push(void 0),s++;return M&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const I=` ${R} `;class j{constructor(e,t,o,i){this.strings=e,this.values=t,this.type=o,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let i=0;i<e;i++){const e=this.strings[i],n=e.lastIndexOf("\x3c!--");o=(n>-1||o)&&-1===e.indexOf("--\x3e",n+1);const s=Y.exec(e);t+=null===s?e+(o?I:H):e.substr(0,s.index)+s[1]+s[2]+D+s[3]+R}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
 */const F=e=>null===e||!("object"==typeof e||"function"==typeof e),B=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class J{constructor(e,t,o){this.dirty=!0,this.element=e,this.name=t,this.strings=o,this.parts=[];for(let e=0;e<o.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new W(this)}_getValue(){const e=this.strings,t=e.length-1;let o="";for(let i=0;i<t;i++){o+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(F(e)||!B(e))o+="string"==typeof e?e:String(e);else for(const t of e)o+="string"==typeof t?t:String(t)}}return o+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class W{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===A||F(e)&&e===this.value||(this.value=e,k(e)||(this.committer.dirty=!0))}commit(){for(;k(this.value);){const e=this.value;this.value=A,e(this)}this.value!==A&&this.committer.commit()}}class Z{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(U()),this.endNode=e.appendChild(U())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=U()),e.__insert(this.endNode=U())}insertAfterPart(e){e.__insert(this.startNode=U()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;k(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=A,e(this)}const e=this.__pendingValue;e!==A&&(F(e)?e!==this.value&&this.__commitText(e):e instanceof j?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):B(e)?this.__commitIterable(e):e===T?(this.value=T,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,o="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=o:this.__commitNode(document.createTextNode(o)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof z&&this.value.template===t)this.value.update(e.values);else{const o=new z(t,e.processor,this.options),i=o._clone();o.update(e.values),this.__commitNode(i),this.value=o}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let o,i=0;for(const n of e)void 0===(o=t[i])&&(o=new Z(this.options),t.push(o),0===i?o.appendIntoPart(this):o.insertAfterPart(t[i-1])),o.setValue(n),o.commit(),i++;i<t.length&&(t.length=i,this.clear(o&&o.endNode))}clear(e=this.startNode){N(this.startNode.parentNode,e.nextSibling,this.endNode)}}class Q{constructor(e,t,o){if(this.value=void 0,this.__pendingValue=void 0,2!==o.length||""!==o[0]||""!==o[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=o}setValue(e){this.__pendingValue=e}commit(){for(;k(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=A,e(this)}if(this.__pendingValue===A)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=A}}class G extends J{constructor(e,t,o){super(e,t,o),this.single=2===o.length&&""===o[0]&&""===o[1]}_createPart(){return new K(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class K extends W{}let X=!1;try{const e={get capture(){return X=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class ee{constructor(e,t,o){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=o,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;k(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=A,e(this)}if(this.__pendingValue===A)return;const e=this.__pendingValue,t=this.value,o=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||o);o&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=te(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=A}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const te=e=>e&&(X?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
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
 */const oe=new class{handleAttributeExpressions(e,t,o,i){const n=t[0];if("."===n){return new G(e,t.slice(1),o).parts}return"@"===n?[new ee(e,t.slice(1),i.eventContext)]:"?"===n?[new Q(e,t.slice(1),o)]:new J(e,t,o).parts}handleTextExpression(e){return new Z(e)}};
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
 */function ie(e){let t=ne.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},ne.set(e.type,t));let o=t.stringsArray.get(e.strings);if(void 0!==o)return o;const i=e.strings.join(R);return void 0===(o=t.keyString.get(i))&&(o=new V(e,e.getTemplateElement()),t.keyString.set(i,o)),t.stringsArray.set(e.strings,o),o}const ne=new Map,se=new WeakMap;
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
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const re=(e,...t)=>new j(e,t,"html",oe),ae=133;
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
 */function ce(e,t){const{element:{content:o},parts:i}=e,n=document.createTreeWalker(o,ae,null,!1);let s=le(i),r=i[s],a=-1,c=0;const d=[];let l=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===l&&(l=null),t.has(e)&&(d.push(e),null===l&&(l=e)),null!==l&&c++;void 0!==r&&r.index===a;)r.index=null!==l?-1:r.index-c,r=i[s=le(i,s)]}d.forEach(e=>e.parentNode.removeChild(e))}const de=e=>{let t=11===e.nodeType?0:1;const o=document.createTreeWalker(e,ae,null,!1);for(;o.nextNode();)t++;return t},le=(e,t=-1)=>{for(let o=t+1;o<e.length;o++){const t=e[o];if(O(t))return o}return-1};
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
const he=(e,t)=>`${e}--${t}`;let ue=!0;void 0===window.ShadyCSS?ue=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),ue=!1);const pe=e=>t=>{const o=he(t.type,e);let i=ne.get(o);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},ne.set(o,i));let n=i.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(R);if(void 0===(n=i.keyString.get(s))){const o=t.getTemplateElement();ue&&window.ShadyCSS.prepareTemplateDom(o,e),n=new V(t,o),i.keyString.set(s,n)}return i.stringsArray.set(t.strings,n),n},me=["html","svg"],ge=new Set,_e=(e,t,o)=>{ge.add(e);const i=o?o.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:s}=n;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,e);const r=document.createElement("style");for(let e=0;e<s;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{me.forEach(t=>{const o=ne.get(he(t,e));void 0!==o&&o.keyString.forEach(e=>{const{element:{content:t}}=e,o=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{o.add(e)}),ce(e,o)})})})(e);const a=i.content;o?function(e,t,o=null){const{element:{content:i},parts:n}=e;if(null==o)return void i.appendChild(t);const s=document.createTreeWalker(i,ae,null,!1);let r=le(n),a=0,c=-1;for(;s.nextNode();){for(c++,s.currentNode===o&&(a=de(t),o.parentNode.insertBefore(t,o));-1!==r&&n[r].index===c;){if(a>0){for(;-1!==r;)n[r].index+=a,r=le(n,r);return}r=le(n,r)}}}(o,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(o){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),ce(o,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const fe={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},be=(e,t)=>t!==e&&(t==t||e==e),ye={attribute:!0,type:String,converter:fe,reflect:!1,hasChanged:be},ve=Promise.resolve(!0),we=1,Se=4,xe=8,Ce=16,$e=32,qe="finalized";class Ee extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=ve,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,o)=>{const i=this._attributeNameForProperty(o,t);void 0!==i&&(this._attributeToPropertyMap.set(i,o),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=ye){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const o="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[o]},set(t){const i=this[e];this[o]=t,this._requestUpdate(e,i)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(qe)||e.finalize(),this[qe]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const o of t)this.createProperty(o,e[o])}}static _attributeNameForProperty(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,o=be){return o(e,t)}static _propertyValueFromAttribute(e,t){const o=t.type,i=t.converter||fe,n="function"==typeof i?i:i.fromAttribute;return n?n(e,o):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const o=t.type,i=t.converter;return(i&&i.toAttribute||fe.toAttribute)(e,o)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|$e,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,o){t!==o&&this._attributeToProperty(e,o)}_propertyToAttribute(e,t,o=ye){const i=this.constructor,n=i._attributeNameForProperty(e,o);if(void 0!==n){const e=i._propertyValueToAttribute(t,o);if(void 0===e)return;this._updateState=this._updateState|xe,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=this._updateState&~xe}}_attributeToProperty(e,t){if(this._updateState&xe)return;const o=this.constructor,i=o._attributeToPropertyMap.get(e);if(void 0!==i){const e=o._classProperties.get(i)||ye;this._updateState=this._updateState|Ce,this[i]=o._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~Ce}}_requestUpdate(e,t){let o=!0;if(void 0!==e){const i=this.constructor,n=i._classProperties.get(e)||ye;i._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||this._updateState&Ce||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):o=!1}!this._hasRequestedUpdate&&o&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|Se;const o=this._updatePromise;this._updatePromise=new Promise((o,i)=>{e=o,t=i});try{await o}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&$e}get _hasRequestedUpdate(){return this._updateState&Se}get hasUpdated(){return this._updateState&we}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&we||(this._updateState=this._updateState|we,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Se}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}Ee[qe]=!0;
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
const ke="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;
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
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const Me=e=>e.flat?e.flat(1/0):function e(t,o=[]){for(let i=0,n=t.length;i<n;i++){const n=t[i];Array.isArray(n)?e(n,o):o.push(n)}return o}(e);class Ne extends Ee{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){Me(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ke?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof j&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}Ne.finalized=!0,Ne.render=(e,t,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const i=o.scopeName,n=se.has(t),s=ue&&11===t.nodeType&&!!t.host,r=s&&!ge.has(i),a=r?document.createDocumentFragment():t;if(((e,t,o)=>{let i=se.get(t);void 0===i&&(N(t,t.firstChild),se.set(t,i=new Z(Object.assign({templateFactory:ie},o))),i.appendInto(t)),i.setValue(e),i.commit()})(e,a,Object.assign({templateFactory:pe(i)},o)),r){const e=se.get(a);se.delete(a);const o=e.value instanceof z?e.value.template:void 0;_e(i,a,o),N(t,t.firstChild),t.appendChild(a),se.set(t,e)}!n&&s&&window.ShadyCSS.styleElement(t.host)};const Ae=e=>getComputedStyle(document.body).getPropertyValue(e),Te={locale:[],header_text:"Home Assistant",disabled_mode:!1,kiosk_mode:!1,compact_mode:!1,footer_mode:!1,disable_sidebar:!1,chevrons:!0,indicator_top:!1,hidden_tab_redirect:!0,background:Ae("--ch-background")||"var(--primary-color)",elements_color:Ae("--ch-elements-color")||"var(--text-primary-color)",menu_color:Ae("--ch-menu-color")||"",voice_color:Ae("--ch-voice-color")||"",options_color:Ae("--ch-options-color")||"",all_tabs_color:Ae("--ch-all-tabs-color")||"",notification_dot_color:Ae("--ch-notification-dot-color")||"#ff9800",tab_indicator_color:Ae("--ch-tab-indicator-color")||"",active_tab_color:Ae("--ch-active-tab-color")||"",tabs_color:[],hide_tabs:[],show_tabs:[],default_tab:0,tab_icons:[],tab_direction:"ltr",button_icons:[],button_direction:"ltr",menu_dropdown:!1,menu_hide:!1,voice_dropdown:!1,voice_hide:!1,options_hide:!1,hide_help:!1,hide_unused:!1,hide_refresh:!1,hide_config:!1,hide_raw:!1,tabs_css:[],header_css:"",stack_css:"",header_text_css:"",active_tab_css:"",options_list_css:"",menu_css:"",options_css:"",voice_css:"",all_tabs_css:"",tab_container_css:"",view_css:"",panel_view_css:"",template_variables:"",exceptions:[],editor_warnings:!0},Re=(e,t,o,i={})=>{o=null==o?{}:o;const n=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=o,e.dispatchEvent(n),n};customElements.define("custom-header-editor",class extends Ne{static get properties(){return{_config:{}}}firstUpdated(){this._lovelace=g(),this.deepcopy=this.deepcopy.bind(this),this._config=this._lovelace.config.custom_header?this.deepcopy(this._lovelace.config.custom_header):{}}render(){return this._config&&this._lovelace?re`
      <div @click="${this._close}" class="title_control">
        X
      </div>
      ${this.renderStyle()}
      <ch-config-editor
        .defaultConfig="${Te}"
        .config="${this._config}"
        @ch-config-changed="${this._configChanged}"
      >
      </ch-config-editor>
      <h4 class="underline">Exceptions</h4>
      <br />
      ${this._config.exceptions?this._config.exceptions.map((e,t)=>re`
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
      <p style="font-size:16pt">${f.user.name}</p>
      <h4 class="underline">Current User Agent</h4>
      <br />
      ${navigator.userAgent}
      <br />
      <h4
        style="background:var(--paper-card-background-color);
          margin-bottom:-20px;"
        class="underline"
      >
        ${this.exception?"":re`
              ${this._save_button}
            `}
        ${this.exception?"":re`
              ${this._cancel_button}
            `}
      </h4>
    `:re``}_close(){const e=this.parentNode.parentNode.parentNode.querySelector("editor");this.parentNode.parentNode.parentNode.removeChild(e)}_save(){for(const e in this._config)this._config[e]==Te[e]&&delete this._config[e];const e={...this._lovelace.config,custom_header:this._config};try{this._lovelace.saveConfig(e).then(()=>{window.location.href=window.location.href})}catch(e){alert(`Save failed: ${e}`)}}get _save_button(){return re`
      <mwc-button raised @click="${this._save}">${"Save and Reload"}</mwc-button>
    `}get _cancel_button(){return re`
      <mwc-button raised @click="${this._close}">Cancel</mwc-button>
    `}_addException(){let e;this._config.exceptions?(e=this._config.exceptions.slice(0)).push({conditions:{},config:{}}):e=[{conditions:{},config:{}}],this._config={...this._config,exceptions:e},Re(this,"config-changed",{config:this._config})}_configChanged({detail:e}){this._config&&(this._config={...this._config,...e.config},Re(this,"config-changed",{config:this._config}))}_exceptionChanged(e){if(!this._config)return;const t=e.target.index,o=this._config.exceptions.slice(0);o[t]=e.detail.exception,this._config={...this._config,exceptions:o},Re(this,"config-changed",{config:this._config})}_exceptionDelete(e){if(!this._config)return;const t=e.target,o=this._config.exceptions.slice(0);o.splice(t.index,1),this._config={...this._config,exceptions:o},Re(this,"config-changed",{config:this._config}),this.requestUpdate()}deepcopy(e){if(!e||"object"!=typeof e)return e;if("[object Date]"==Object.prototype.toString.call(e))return new Date(e.getTime());if(Array.isArray(e))return e.map(this.deepcopy);const t={};return Object.keys(e).forEach(o=>{t[o]=this.deepcopy(e[o])}),t}renderStyle(){return re`
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
    `}});customElements.define("ch-config-editor",class extends Ne{static get properties(){return{defaultConfig:{},config:{},exception:{},_closed:{}}}constructor(){super(),this.buttonOptions=["show","hide","clock","overflow"],this.overflowOptions=["show","hide","clock"],this.swipeAnimation=["none","swipe","fade","flip"]}get _clock(){return"clock"==this.getConfig("menu")||"clock"==this.getConfig("voice")||"clock"==this.getConfig("options")}getConfig(e){return void 0!==this.config[e]?this.config[e]:Te[e]}templateExists(e){return!("string"!=typeof e||!e.includes("{{")&&!e.includes("{%"))}render(){return this.exception=void 0!==this.exception&&!1!==this.exception,re`
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
      ${this.exception?"":re`
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
            ${this.getConfig("editor_warnings")?re`
                  <br />
                  <div class="warning">
                    You can temporaily disable Custom-Header by adding "?disable_ch" to the end of your URL. Hover over
                    any option or icon below for more info.
                  </div>
                  <br />
                `:""}
          `}
      ${this.renderStyle()}
      <div class="side-by-side">
        <ha-switch
          class="${this.exception&&void 0===this.config.disabled_mode?"inherited":""}"
          ?checked="${!1!==this.getConfig("disabled_mode")}"
          .configValue="${"disabled_mode"}"
          @change="${this._valueChanged}"
          title="Completely disable Custom-Header. Useful for exceptions."
          ?disabled=${this.templateExists(this.getConfig("disabled_mode"))}
        >
          Disabled Mode
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.footer_mode?"inherited":""}"
          ?checked="${!1!==this.getConfig("footer_mode")}"
          .configValue="${"footer_mode"}"
          @change="${this._valueChanged}"
          title="Turn the header into a footer."
          ?disabled=${this.templateExists(this.getConfig("footer_mode"))}
        >
          Footer Mode
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.compact_mode?"inherited":""}"
          ?checked="${!1!==this.getConfig("compact_mode")}"
          .configValue="${"compact_mode"}"
          @change="${this._valueChanged}"
          title="Make header compact."
          ?disabled=${this.templateExists(this.getConfig("compact_mode"))}
        >
          Compact Mode
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.kiosk_mode?"inherited":""}"
          ?checked="${!1!==this.getConfig("kiosk_mode")}"
          .configValue="${"kiosk_mode"}"
          @change="${this._valueChanged}"
          title="Hide the header, close the sidebar, and disable sidebar swipe."
          ?disabled=${this.templateExists(this.getConfig("kiosk_mode"))}
        >
          Kiosk Mode
          ${this.getConfig("editor_warnings")?re`
                <iron-icon icon="hass:alert" class="alert" title="Removes ability to edit UI"></iron-icon>
              `:""}
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.disable_sidebar?"inherited":""}"
          ?checked="${!1!==this.getConfig("disable_sidebar")||!1!==this.getConfig("kiosk_mode")}"
          .configValue="${"disable_sidebar"}"
          @change="${this._valueChanged}"
          title="Disable sidebar and menu button."
          ?disabled=${this.templateExists(this.getConfig("disable_sidebar"))}
        >
          Disable Sidebar
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.chevrons?"inherited":""}"
          ?checked="${!1!==this.getConfig("chevrons")}"
          .configValue="${"chevrons"}"
          @change="${this._valueChanged}"
          title="View scrolling controls in header."
          ?disabled=${this.templateExists(this.getConfig("chevrons"))}
        >
          Display Tab Chevrons
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.hidden_tab_redirect?"inherited":""}"
          ?checked="${!1!==this.getConfig("hidden_tab_redirect")}"
          .configValue="${"hidden_tab_redirect"}"
          @change="${this._valueChanged}"
          title="Auto-redirect away from hidden tabs."
          ?disabled=${this.templateExists(this.getConfig("hidden_tab_redirect"))}
        >
          Hidden Tab Redirect
        </ha-switch>
        ${this.exception?"":re`
              <ha-switch
                class="${this.exception&&void 0===this.config.editor_warnings?"inherited":""}"
                ?checked="${!1!==this.getConfig("editor_warnings")}"
                .configValue="${"editor_warnings"}"
                @change="${this._valueChanged}"
                title="Toggle warnings in this editor."
                ?disabled=${this.templateExists(this.getConfig("editor_warnings"))}
              >
                Display Editor Warnings
              </ha-switch>
            `}
      </div>
      <h4 class="underline">Menu Items</h4>
      <div class="side-by-side">
        <ha-switch
          class="${this.exception&&void 0===this.config.hide_config?"inherited":""}"
          ?checked="${!1!==this.getConfig("hide_config")}"
          .configValue="${"hide_config"}"
          @change="${this._valueChanged}"
          title='Hide "Configure UI" in options menu.'
        >
          Hide "Configure UI"
          ${this.getConfig("editor_warnings")?re`
                <iron-icon icon="hass:alert" class="alert"></iron-icon>
              `:""}
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.hide_raw?"inherited":""}"
          ?checked="${!1!==this.getConfig("hide_raw")}"
          .configValue="${"hide_raw"}"
          @change="${this._valueChanged}"
          title='Hide "Raw Config Editor" in options menu.'
        >
          Hide "Raw Config Editor"
          ${this.getConfig("editor_warnings")?re`
                <iron-icon icon="hass:alert" class="alert"></iron-icon>
              `:""}
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.hide_help?"inherited":""}"
          ?checked="${!1!==this.getConfig("hide_help")}"
          .configValue="${"hide_help"}"
          @change="${this._valueChanged}"
          title='Hide "Help" in options menu.'
        >
          Hide "Help"
        </ha-switch>
        <ha-switch
          class="${this.exception&&void 0===this.config.hide_unused?"inherited":""}"
          ?checked="${!1!==this.getConfig("hide_unused")}"
          .configValue="${"hide_unused"}"
          @change="${this._valueChanged}"
          title='Hide "Help" in options menu.'
        >
          Hide "Unused Entities"
        </ha-switch>
      </div>
      <h4 class="underline">Buttons</h4>

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
            class="${this.exception&&void 0===this.config.show_tabs?"inherited":""}"
            label="Comma-separated list of tab numbers to show:"
            .value="${this.getConfig("show_tabs")}"
            .configValue="${"show_tabs"}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div id="hide" style="display:${this.getConfig("show_tabs").length>0?"none":"initial"}">
          <paper-input
            class="${this.exception&&void 0===this.config.hide_tabs?"inherited":""}"
            label="Comma-separated list of tab numbers to hide:"
            .value="${this.getConfig("hide_tabs")}"
            .configValue="${"hide_tabs"}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <paper-input
          class="${this.exception&&void 0===this.config.default_tab?"inherited":""}"
          label="Default tab:"
          .value="${this.getConfig("default_tab")}"
          .configValue="${"default_tab"}"
          @value-changed="${this._valueChanged}"
        >
        </paper-input>
      </div>
    `}_toggleCard(){this._closed=!this._closed,Re(this,"iron-resize")}_tabVisibility(){const e=this.shadowRoot.querySelector("#show"),t=this.shadowRoot.querySelector("#hide");"Hide Tabs"==this.shadowRoot.querySelector("#tabs").value?(e.style.display="none",t.style.display="initial"):(t.style.display="none",e.style.display="initial")}_valueChanged(e){this.config&&(e.target.configValue&&(""===e.target.value?delete this.config[e.target.configValue]:this.config={...this.config,[e.target.configValue]:void 0!==e.target.checked?e.target.checked:e.target.value}),Re(this,"ch-config-changed",{config:this.config}))}renderStyle(){return re`
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
    `}});customElements.define("ch-exception-editor",class extends Ne{static get properties(){return{config:{},exception:{},_closed:{}}}constructor(){super(),this._closed=!0}render(){return this.exception?re`
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
            .defaultConfig="${{...Te,...this.config}}"
            .config="${this.exception.config}"
            @ch-config-changed="${this._configChanged}"
          >
          </ch-config-editor>
        </div>
      </paper-card>
    `:re``}renderStyle(){return re`
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
    `}_toggleCard(){this._closed=!this._closed,Re(this,"iron-resize")}_deleteException(){Re(this,"ch-exception-delete")}_conditionsChanged({detail:e}){if(!this.exception)return;const t={...this.exception,conditions:e.conditions};Re(this,"ch-exception-changed",{exception:t})}_configChanged(e){if(e.stopPropagation(),!this.exception)return;const t={...this.exception,config:e.detail.config};Re(this,"ch-exception-changed",{exception:t})}});customElements.define("ch-conditions-editor",class extends Ne{static get properties(){return{conditions:{}}}get _user(){return this.conditions.user||""}get _user_agent(){return this.conditions.user_agent||""}get _media_query(){return this.conditions.media_query||""}get _query_string(){return this.conditions.query_string||""}render(){return this.conditions?re`
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
    `:re``}_valueChanged(e){if(!this.conditions)return;const t=e.target;this[`_${t.configValue}`]!==t.value&&(t.configValue&&(""===t.value?delete this.conditions[t.configValue]:this.conditions={...this.conditions,[t.configValue]:t.value}),Re(this,"ch-conditions-changed",{conditions:this.conditions}))}});const He=(e,t,o)=>{const i=(e,t)=>{let o;const i=document.querySelector("home-assistant").hass;return o="raw_editor"===t?i.localize("ui.panel.lovelace.editor.menu.raw_editor"):"unused_entities"==t?i.localize("ui.panel.lovelace.unused_entities.title"):i.localize(`ui.panel.lovelace.menu.${t}`),e.innerHTML.includes(o)||e.getAttribute("aria-label")==o};(o?document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("app-toolbar > paper-menu-button"):t.options).querySelector("paper-listbox").querySelectorAll("paper-item").forEach(t=>{e.hide_help&&i(t,"help")||e.hide_unused&&i(t,"unused_entities")||e.hide_refresh&&i(t,"refresh")||e.hide_config&&i(t,"configure_ui")||e.hide_raw&&i(t,"raw_editor")?t.style.display="none":t.style.display=""})},Pe=(e,t,o,i)=>{o.options.querySelector(`#${e.toLowerCase()}_dropdown`)&&o.options.querySelector(`#${e.toLowerCase()}_dropdown`).remove();const n=document.createElement("paper-item"),s=document.createElement("ha-icon");n.setAttribute("id",`${e.toLowerCase()}_dropdown`),s.setAttribute("icon",i.button_icons[e.toLowerCase()]||t),s.style.pointerEvents="none","rtl"===i.button_direction?s.style.marginLeft="auto":s.style.marginRight="auto",n.innerText=e,n.appendChild(s),n.addEventListener("click",()=>{o[e.toLowerCase()].click()}),s.addEventListener("click",()=>{o[e.toLowerCase()].click()}),o.options.querySelector("paper-listbox").appendChild(n)};if("storage"===b.mode){const e=document.createElement("paper-item");e.setAttribute("id","cch_settings"),e.addEventListener("click",()=>(()=>{if(window.scrollTo(0,0),!y.querySelector("ha-app-layout editor")){const e=document.createElement("editor"),t=document.createElement("div");t.style.cssText="\n      padding: 20px;\n      max-width: 600px;\n      margin: 15px auto;\n      background: var(--paper-card-background-color);\n      border: 6px solid var(--paper-card-background-color);\n    ",e.style.cssText="\n      width: 100%;\n      min-height: 100%;\n      box-sizing: border-box;\n      position: absolute;\n      background: var(--background-color, grey);\n      z-index: 2;\n      padding: 5px;\n    ",y.querySelector("ha-app-layout").insertBefore(e,y.querySelector("#view")),e.appendChild(t),t.appendChild(document.createElement("custom-header-editor"))}})()),e.innerHTML="CCH Settings";const t=q.options.querySelector("paper-listbox").querySelector("paper-item");q.options.querySelector("paper-listbox").querySelector("#cch_settings")||q.options.querySelector("paper-listbox").insertBefore(e,t)}const De=e=>{if(window.location.href.includes("disable_ch"))return;let t=document.createElement("style");t.setAttribute("id","ch_header_style"),t.innerHTML+="\n        #drawer {\n          display: none;\n        }\n      ",e||(t.innerHTML+="\n        ch-header {\n          display: none;\n        }\n        app-header {\n          display: none;\n        }\n        hui-view, hui-panel-view {\n          min-height: 100vh;\n        }\n      ");const o=y.querySelector("#ch_header_style");o&&o.innerText==t.innerHTML||(y.appendChild(t),o&&o.remove()),v.drawer.style.display="none",v.sidebar.main.shadowRoot.querySelector("#ch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","ch_sidebar_style"),t.innerHTML=":host(:not([expanded])) {width: 0px !important;}",v.sidebar.main.shadowRoot.appendChild(t)),v.main.shadowRoot.querySelector("#ch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","ch_sidebar_style"),t.innerHTML=":host {--app-drawer-width: 0px !important;}",v.main.shadowRoot.appendChild(t)),window.dispatchEvent(new Event("resize"))},Ve=()=>{v.drawer.style.display="";let e=v.main.shadowRoot.querySelector("#ch_sidebar_style");e&&e.remove(),(e=v.sidebar.main.shadowRoot.querySelector("#ch_sidebar_style"))&&e.remove(),v.drawer.style.display=""},Le=e=>{if(window.customHeaderConfig=e,window.location.href.includes("disable_ch")&&(e.disabled_mode=!0),e.disabled_mode)return window.customHeaderDisabled=!0,Ve(),q.container&&(q.container.style.visibility="hidden"),y.querySelector("#ch_header_style")&&y.querySelector("#ch_header_style").remove(),y.querySelector("#ch_view_style")&&y.querySelector("#ch_view_style").remove(),q.tabContainer.shadowRoot.querySelector("#ch_chevron")&&q.tabContainer.shadowRoot.querySelector("#ch_chevron").remove(),q.menu.style.display="none",y.querySelector("ha-menu-button").style.display="",v.sidebar.main.shadowRoot.querySelector(".menu").style="",v.sidebar.main.shadowRoot.querySelector("paper-listbox").style="",v.sidebar.main.shadowRoot.querySelector("div.divider").style="",void window.dispatchEvent(new Event("resize"));if(window.customHeaderDisabled=!1,He(e,q,!1),q.menu.style.display="",q.container&&(q.container.style.visibility="visible"),q.tabs.length||(e.compact_mode=!1),e.menu_dropdown&&!e.disable_sidebar?Pe("Menu","mdi:menu",q,e):q.options.querySelector("#menu_dropdown")&&q.options.querySelector("#menu_dropdown").remove(),e.voice_dropdown?Pe("Voice","mdi:microphone",q,e):q.options.querySelector("#voice_dropdown")&&q.options.querySelector("#voice_dropdown").remove(),"rtl"==e.button_direction?(q.options.setAttribute("horizontal-align","left"),q.options.querySelector("paper-listbox").setAttribute("dir","ltr")):(q.options.setAttribute("horizontal-align","right"),q.options.querySelector("paper-listbox").setAttribute("dir","rtl")),e.disable_sidebar?De(!0):e.disable_sidebar||e.kiosk_mode||(Ve(),v.sidebar.main.shadowRoot.querySelector(".menu").style="height:49px;",v.sidebar.main.shadowRoot.querySelector("paper-listbox").style="height:calc(100% - 155px);",v.sidebar.main.shadowRoot.querySelector("div.divider").style="margin-bottom: -10px;"),(e=>{let t=48;e.compact_mode||("rtl"==e.button_direction?(q.container.querySelector("#contentContainer").dir="ltr",q.container.querySelector("#contentContainer").style.textAlign="right"):(q.container.querySelector("#contentContainer").style.textAlign="",q.container.querySelector("#contentContainer").dir=""),q.container.querySelector("#contentContainer").innerHTML=e.header_text,t=q.tabs.length?96:48);let o=document.createElement("style");o.setAttribute("id","ch_header_style"),o.innerHTML=`\n      ch-header {\n        padding-left: 10px;\n        padding-right: 10px;\n        box-sizing: border-box;\n        display:flex;\n        justify-content: center;\n        font: 400 20px Roboto, sans-serif;\n        background: ${e.background||"var(--primary-color)"};\n        color: ${e.elements_color||"var(--text-primary-color)"};\n        margin-top: 4px;\n        margin-bottom: 0px;\n        margin-top: ${e.footer_mode?"4px;":"0px"};\n        ${e.footer_mode?"position: sticky; bottom: 0px;":"position: sticky; top: 0px;"}\n        ${e.header_css?e.header_css:""}\n      }\n      ch-stack {\n        flex-direction: column;\n        width: 100%;\n        margin-left: 9px;\n        margin-right: 9px;\n        ${e.stack_css?e.stack_css:""}\n      }\n      #contentContainer {\n        padding: 12px 6px 12px 6px;\n        color: var(--text-primary-color);\n        ${e.compact_mode?"display: none;":""}\n        ${e.header_text_css?e.header_text_css:""}\n      }\n      app-header {\n        display: none;\n      }\n      paper-tab.iron-selected {\n        ${e.active_tab_color?`color: ${e.active_tab_color};`:""}\n        ${e.active_tab_css?e.active_tab_css:""}\n      }\n      [buttonElem="menu"] {\n        ${e.menu_color?`color: ${e.menu_color};`:""}\n        ${e.menu_hide?"display: none;":""}\n        ${e.menu_css?e.menu_css:""}\n      }\n      [buttonElem="options"] {\n        ${e.options_color?`color: ${e.options_color};`:""}\n        ${e.options_hide?"display: none;":""}\n        ${e.options_css?e.options_css:""}\n      }\n      [buttonElem="voice"] {\n        ${e.voice_color?`color: ${e.voice_color};`:""}\n        ${e.voice_hide?"display: none;":""}\n        ${e.voice_css?e.voice_css:""}\n      }\n      paper-tab {\n        ${e.all_tabs_color?`color: ${e.all_tabs_color};`:""}\n        ${e.all_tabs_css?e.all_tabs_css:""}\n      }\n      paper-tabs {\n        ${e.tab_indicator_color?`--paper-tabs-selection-bar-color: ${e.tab_indicator_color} !important;`:""}\n        ${e.tab_container_css?e.tab_container_css:""}\n      }\n    `,e.tabs_color&&Object.keys(e.tabs_color).forEach(t=>{o.innerHTML+=`\n        paper-tab:nth-child(${S(t)+1}) {\n          color: ${e.tabs_color[t]};\n        }\n      `}),e.hide_tabs&&e.hide_tabs.forEach(e=>{o.innerHTML+=`\n        paper-tab:nth-child(${S(e)+1}) {\n          display: none;\n        }\n      `}),e.tabs_css&&Object.keys(e.tabs_css).forEach(t=>{o.innerHTML+=`\n        paper-tab:nth-child(${S(t)+1}) {\n          ${e.tabs_css[t]};\n        }\n      `});let i=y.querySelector("#ch_header_style");y.appendChild(o),i&&i.remove(),(o=document.createElement("style")).setAttribute("id","ch_view_style"),o.innerHTML=`\n        hui-view, hui-panel-view {\n          min-height: calc(100vh - ${t}px);\n          padding-top: 2px;\n          ${e.footer_mode?`padding-bottom: ${t}px;`:""}\n          ${e.footer_mode?`margin-bottom: -${t+4}px;`:""}\n        }\n        hui-panel-view {\n          padding-top: 0px;\n          ${e.panel_view_css?e.panel_view_css:""}\n        }\n        hui-view {\n          padding-top: 0px;\n          ${e.view_css?e.view_css:""}\n        }\n        #view {\n          ${e.footer_mode?`min-height: calc(100vh - ${t+4}px) !important;`:""}\n        }\n      `,(i=y.querySelector("#ch_view_style"))&&o.innerHTML==i.innerHTML||(y.appendChild(o),i&&i.remove()),(o=document.createElement("style")).setAttribute("id","ch_chevron"),o.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',i=q.tabContainer.shadowRoot.querySelector("#ch_chevron"),q.tabContainer.shadowRoot.appendChild(o),i&&i.remove()})(e),e.chevrons?q.tabContainer.hideScrollButtons=!1:q.tabContainer.hideScrollButtons=!0,e.indicator_top?q.tabContainer.alignBottom=!0:q.tabContainer.alignBottom=!1,e.footer_mode?q.options.setAttribute("vertical-align","bottom"):q.options.removeAttribute("vertical-align"),e.footer_mode?q.container.removeAttribute("slot"):q.container.setAttribute("slot","header"),q.tabContainer.dir=e.tab_direction,q.container.dir=e.button_direction,e.tab_icons&&q.tabs.length)for(const t in e.tab_icons){const o=S(t),i=q.tabs[o].querySelector("ha-icon");e.tab_icons[t]?i.icon=e.tab_icons[t]:i.icon=b.config.views[o].icon}if(e.button_icons)for(const t in e.button_icons)e.button_icons[t]?"options"===t?q[t].querySelector("paper-icon-button").icon=e.button_icons[t]:q[t].icon=e.button_icons[t]:"menu"===t?q.menu.icon="mdi:menu":"voice"===t?q.voice.icon="mdi:microphone":"options"===t&&(q[t].querySelector("paper-icon-button").icon="mdi:dots-vertical");if(e.button_text)for(const t in e.button_text){const o=document.createElement("p");o.className="buttonText";const i="options"===t?q[t].querySelector("paper-icon-button"):q[t];e.button_text[t]||!i.shadowRoot.querySelector(".buttonText")?e.button_text[t]&&(i.shadowRoot.querySelector(".buttonText")?i.shadowRoot.querySelector(".buttonText").innerText=e.button_text[t]:(o.innerText=e.button_text[t],i.shadowRoot.appendChild(o)),"rtl"==e.button_direction?i.shadowRoot.querySelector(".buttonText").dir="ltr":i.shadowRoot.querySelector(".buttonText").dir="",i.shadowRoot.querySelector("iron-icon").style.display="none",i.style.width="auto",i.shadowRoot.querySelector(".buttonText").style.margin="5.5px 0px 0px 0px"):(i.shadowRoot.querySelector(".buttonText").remove(),i.shadowRoot.querySelector("iron-icon").style.display="",i.style.width="")}((e,t)=>{const o=v.sidebar.listbox.querySelector('[data-panel="lovelace"]');if(e.hide_tabs.includes(0)&&!e.default_tab){for(const e of t.tabs)if("none"!=getComputedStyle(e).display){o.setAttribute("href",`/lovelace/${t.tabContainer.indexOf(e)}`);break}}else e.hide_tabs.includes(0)&&o.setAttribute("href",`/lovelace/${S(e.default_tab)}`);const i=null!=e.default_tab?S(e.default_tab):null;if(e.hidden_tab_redirect&&t.tabs.length){const n=t.tabContainer.indexOf(t.tabContainer.querySelector("paper-tab.iron-selected"));if(e.hide_tabs.includes(n)&&e.hide_tabs.length!=t.tabs.length)if(i&&!e.hide_tabs.includes(S(i)))"none"!=getComputedStyle(t.tabs[i]).display&&(t.tabs[i].click(),o.setAttribute("href",`/lovelace/${i}`));else for(const e of t.tabs)if("none"!=getComputedStyle(e).display){e.click(),o.setAttribute("href",`/lovelace/${t.tabContainer.indexOf(e)}`);break}}null!=i&&!window.customHeaderDefaultClicked&&t.tabs[i]&&"none"!=getComputedStyle(t.tabs[i]).display&&t.tabs[i].click(),window.customHeaderDefaultClicked=!0})(e,q),q.tabs.length||(q.tabContainer.style.display="none"),((e,t)=>{if(e.menu_hide)return;const o=()=>{const t=document.createElement("div");return t.className="dot",t.style.cssText=`\n        pointer-events: none;\n        position: relative;\n        background-color: ${e.notification_dot_color};\n        width: 12px;\n        height: 12px;\n        top: -28px;\n        right: ${"rtl"==e.button_direction?"":"-"}16px;\n        border-radius: 50%;\n    `,t},i=()=>{e.disable_sidebar||window.customHeaderDisabled||("hidden"===v.menu.style.visibility?t.menu.style.display="none":t.menu.style.display="initial")},n=e=>{const t=document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root");e.forEach(({addedNodes:e,removedNodes:i})=>{if(e)for(const i of e)"dot"!==i.className||t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")||t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(o());if(i)for(const e of i)"dot"===e.className&&t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")&&t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot").remove()})};if(!window.customHeaderMenuObserver){window.customHeaderMenuObserver=!0,new MutationObserver(n).observe(v.menu.shadowRoot,{childList:!0}),new MutationObserver(i).observe(v.menu,{attributes:!0,attributeFilter:["style"]})}i();const s=t.menu.shadowRoot.querySelector(".dot");s&&s.style.cssText!=o().style.cssText&&s.remove(),!t.menu.shadowRoot.querySelector(".dot")&&v.menu.shadowRoot.querySelector(".dot")&&t.menu.shadowRoot.appendChild(o())})(e,q),window.dispatchEvent(new Event("resize"))},Oe=t=>{t||(t={...Te,...b.config.custom_header});const o=(t={...t,...$(t)}).template_variables;delete t.template_variables;const i=()=>{t.hide_tabs&&(t.hide_tabs=C(t.hide_tabs)),t.show_tabs&&(t.show_tabs=C(t.show_tabs)),t.show_tabs&&t.show_tabs.length&&(t.hide_tabs=(e=>{if(e&&e.length){const t=[];for(let e=0;e<v.tabs.length;e+=1)t.push(e);return t.filter(t=>!e.includes(t))}})(t.show_tabs)),(t.disable_sidebar||t.menu_dropdown)&&(t.menu_hide=!0),t.voice_dropdown&&(t.voice_hide=!0),t.kiosk_mode&&!t.disabled_mode?De(!1):Le(t)},n=JSON.stringify(t),s=!!o||n.includes("{{")||n.includes("{%");let r;s?r=((t,o,i)=>{const n=f.connection,s={user:f.user.name,browser:navigator.userAgent,...o.variables,...e(i)},r=o.template,a=o.entity_ids;return n.subscribeMessage(e=>t(e.result),{type:"render_template",template:r,variables:s,entity_ids:a})})(e=>{if(window.customHeaderLastTemplateResult!=e){window.customHeaderLastTemplateResult=e;try{t=JSON.parse(e.replace(/"true"/gi,"true").replace(/"false"/gi,"false").replace(/""/,""))}catch(t){console.log(`[CUSTOM-HEADER] There was an issue with the template: ${((e,t)=>{const o=t.toString().match(/\d+/g)[0],i=e.substr(0,o).match(/[^,]*$/),n=e.substr(o).match(/^[^,]*/);return`${i?i[0]:""}${n?n[0]:""}`.replace('":"',': "')})(e,t)}`)}i()}},{template:JSON.stringify(o).replace(/\\/g,"")+JSON.stringify(t).replace(/\\/g,"")},t.locale):i();let a=!1;(async()=>{try{await r}catch(e){a=!0,console.log("[CUSTOM-HEADER] There was an error with one or more of your templates:"),console.log(`${e.message.substring(0,e.message.indexOf(")"))})`)}})(),s&&window.setTimeout(()=>{a||y.querySelector("custom-header-editor")||((async()=>{const e=await r;r=void 0,await e()})(),Oe())},1e3*(60-(new Date).getSeconds()))};Oe(),(()=>{const e=new MutationObserver(e=>{const t=window.customHeaderConfig;e.forEach(({addedNodes:e,target:o})=>{e.length&&"PARTIAL-PANEL-RESOLVER"==o.nodeName?Oe():"edit-mode"===o.className&&e.length?(window.customHeaderDisabled||He(t,q,!0),q.menu.style.display="none",y.querySelector("ch-header").style.display="none",v.appHeader.style.display="block",window.scrollTo({top:0,behavior:"smooth"}),y.querySelector("#ch_view_style")&&y.querySelector("#ch_view_style").remove()):"APP-HEADER"===o.nodeName&&e.length&&(v.appHeader.style.display="none",q.menu.style.display="",y.querySelector("ch-header").style.display="",Oe())})});e.observe(v.partialPanelResolver,{childList:!0}),e.observe(v.appHeader,{childList:!0})})();
