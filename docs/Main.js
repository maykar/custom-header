/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function e(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o
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
 */}const t=new WeakMap,n=e=>"function"==typeof e&&t.has(e),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},s={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,c=new RegExp(`${a}|${l}`),h="$lit$";class d{constructor(e,t){this.parts=[],this.element=t;const n=[],i=[],r=document.createTreeWalker(t.content,133,null,!1);let s=0,o=-1,l=0;const{strings:d,values:{length:u}}=e;for(;l<u;){const e=r.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let i=0;for(let e=0;e<n;e++)p(t[e].name,h)&&i++;for(;i-- >0;){const t=d[l],n=g.exec(t)[2],i=n.toLowerCase()+h,r=e.getAttribute(i);e.removeAttribute(i);const s=r.split(c);this.parts.push({type:"attribute",index:o,name:n,strings:s}),l+=s.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const i=e.parentNode,r=t.split(c),s=r.length-1;for(let t=0;t<s;t++){let n,s=r[t];if(""===s)n=f();else{const e=g.exec(s);null!==e&&p(e[2],h)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-h.length)+e[3]),n=document.createTextNode(s)}i.insertBefore(n,e),this.parts.push({type:"node",index:++o})}""===r[s]?(i.insertBefore(f(),e),n.push(e)):e.data=r[s],l+=s}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&o!==s||(o++,t.insertBefore(f(),e)),s=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(n.push(e),o--),l++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),l++}}else r.currentNode=i.pop()}for(const e of n)e.parentNode.removeChild(e)}}const p=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},u=e=>-1!==e.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let s,o=0,a=0,l=r.nextNode();for(;o<n.length;)if(s=n[o],u(s)){for(;a<s.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=t.pop(),l=r.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return i&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const v=` ${a} `;class y{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let i=0;i<e;i++){const e=this.strings[i],r=e.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===e.indexOf("--\x3e",r+1);const s=g.exec(e);t+=null===s?e+(n?v:l):e.substr(0,s.index)+s[1]+s[2]+h+s[3]+a}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
 */const _=e=>null===e||!("object"==typeof e||"function"==typeof e),b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class w{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new z(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let i=0;i<t;i++){n+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(_(e)||!b(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class z{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===s||_(e)&&e===this.value||(this.value=e,n(e)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const e=this.value;this.value=s,e(this)}this.value!==s&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(f()),this.endNode=e.appendChild(f())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=f()),e.__insert(this.endNode=f())}insertAfterPart(e){e.__insert(this.startNode=f()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}const e=this.__pendingValue;e!==s&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const r of e)void 0===(n=t[i])&&(n=new x(this.options),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(r),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}clear(e=this.startNode){r(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=s}}class k extends w{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends z{}let C=!1;try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class A{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;n(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=E(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=s}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const E=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
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
 */const L=new class{handleAttributeExpressions(e,t,n,i){const r=t[0];if("."===r){return new k(e,t.slice(1),n).parts}return"@"===r?[new A(e,t.slice(1),i.eventContext)]:"?"===r?[new S(e,t.slice(1),n)]:new w(e,t,n).parts}handleTextExpression(e){return new x(e)}};
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
 */function T(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const i=e.strings.join(a);return void 0===(n=t.keyString.get(i))&&(n=new d(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}const O=new Map,H=new WeakMap;
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
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const P=(e,...t)=>new y(e,t,"html",L),N=133;
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
 */function V(e,t){const{element:{content:n},parts:i}=e,r=document.createTreeWalker(n,N,null,!1);let s=R(i),o=i[s],a=-1,l=0;const c=[];let h=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,o=i[s=R(i,s)]}c.forEach(e=>e.parentNode.removeChild(e))}const I=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,N,null,!1);for(;n.nextNode();)t++;return t},R=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(u(t))return n}return-1};
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
const D=(e,t)=>`${e}--${t}`;let B=!0;void 0===window.ShadyCSS?B=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),B=!1);const $=e=>t=>{const n=D(t.type,e);let i=O.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},O.set(n,i));let r=i.stringsArray.get(t.strings);if(void 0!==r)return r;const s=t.strings.join(a);if(void 0===(r=i.keyString.get(s))){const n=t.getTemplateElement();B&&window.ShadyCSS.prepareTemplateDom(n,e),r=new d(t,n),i.keyString.set(s,r)}return i.stringsArray.set(t.strings,r),r},F=["html","svg"],j=new Set,U=(e,t,n)=>{j.add(e);const i=n?n.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<s;e++){const t=r[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{F.forEach(t=>{const n=O.get(D(t,e));void 0!==n&&n.keyString.forEach(e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),V(e,n)})})})(e);const a=i.content;n?function(e,t,n=null){const{element:{content:i},parts:r}=e;if(null==n)return void i.appendChild(t);const s=document.createTreeWalker(i,N,null,!1);let o=R(r),a=0,l=-1;for(;s.nextNode();){for(l++,s.currentNode===n&&(a=I(t),n.parentNode.insertBefore(t,n));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=R(r,o);return}o=R(r,o)}}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(n){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),V(n,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Y={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},K=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:K},W=Promise.resolve(!0),J=1,Q=4,G=8,X=16,Z=32,ee="finalized";class te extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=W,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,n)=>{const i=this._attributeNameForProperty(n,t);void 0!==i&&(this._attributeToPropertyMap.set(i,n),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const n="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[n]},set(t){const i=this[e];this[n]=t,this._requestUpdate(e,i)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ee)||e.finalize(),this[ee]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const n of t)this.createProperty(n,e[n])}}static _attributeNameForProperty(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=K){return n(e,t)}static _propertyValueFromAttribute(e,t){const n=t.type,i=t.converter||Y,r="function"==typeof i?i:i.fromAttribute;return r?r(e,n):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const n=t.type,i=t.converter;return(i&&i.toAttribute||Y.toAttribute)(e,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=q){const i=this.constructor,r=i._attributeNameForProperty(e,n);if(void 0!==r){const e=i._propertyValueToAttribute(t,n);if(void 0===e)return;this._updateState=this._updateState|G,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=this._updateState&~G}}_attributeToProperty(e,t){if(this._updateState&G)return;const n=this.constructor,i=n._attributeToPropertyMap.get(e);if(void 0!==i){const e=n._classProperties.get(i)||q;this._updateState=this._updateState|X,this[i]=n._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~X}}_requestUpdate(e,t){let n=!0;if(void 0!==e){const i=this.constructor,r=i._classProperties.get(e)||q;i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|Q;const n=this._updatePromise;this._updatePromise=new Promise((n,i)=>{e=n,t=i});try{await n}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&J}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&J||(this._updateState=this._updateState|J,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}te[ee]=!0;
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
const ne=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:n,elements:i}=t;return{kind:n,elements:i,finisher(t){window.customElements.define(e,t)}}})(e,t),ie=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(n){n.createProperty(t.key,e)}}:Object.assign({},t,{finisher(n){n.createProperty(t.key,e)}}),re=(e,t,n)=>{t.constructor.createProperty(n,e)};function se(e){return(t,n)=>void 0!==n?re(e,t,n):ie(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const oe="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol();class le{constructor(e,t){if(t!==ae)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(oe?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ce=(e,...t)=>{const n=t.reduce((t,n,i)=>t+(e=>{if(e instanceof le)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[i+1],e[0]);return new le(n,ae)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const he=e=>e.flat?e.flat(1/0):function e(t,n=[]){for(let i=0,r=t.length;i<r;i++){const r=t[i];Array.isArray(r)?e(r,n):n.push(r)}return n}(e);class de extends te{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){he(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?oe?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}de.finalized=!0,de.render=(e,t,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const i=n.scopeName,s=H.has(t),o=B&&11===t.nodeType&&!!t.host,a=o&&!j.has(i),l=a?document.createDocumentFragment():t;if(((e,t,n)=>{let i=H.get(t);void 0===i&&(r(t,t.firstChild),H.set(t,i=new x(Object.assign({templateFactory:T},n))),i.appendInto(t)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:$(i)},n)),a){const e=H.get(l);H.delete(l);const n=e.value instanceof m?e.value.template:void 0;U(i,l,n),r(t,t.firstChild),t.appendChild(l),H.set(t,e)}!s&&o&&window.ShadyCSS.styleElement(t.host)};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const pe=!(window.ShadyDOM&&window.ShadyDOM.inUse);let ue,fe;function ge(e){ue=(!e||!e.shimcssproperties)&&(pe||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(fe=window.ShadyCSS.cssBuild);const me=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?ue=window.ShadyCSS.nativeCss:window.ShadyCSS?(ge(window.ShadyCSS),window.ShadyCSS=void 0):ge(window.WebComponents&&window.WebComponents.flags);const ve=ue;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class ye{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function _e(e){return function e(t,n){let i=n.substring(t.start,t.end-1);if(t.parsedCssText=t.cssText=i.trim(),t.parent){let e=t.previous?t.previous.end:t.parent.start;i=(i=(i=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(i=n.substring(e,t.start-1))).replace(Se.multipleSpaces," ")).substring(i.lastIndexOf(";")+1);let r=t.parsedSelector=t.selector=i.trim();t.atRule=0===r.indexOf(Ce),t.atRule?0===r.indexOf(Me)?t.type=we.MEDIA_RULE:r.match(Se.keyframesRule)&&(t.type=we.KEYFRAMES_RULE,t.keyframesName=t.selector.split(Se.multipleSpaces).pop()):0===r.indexOf(ke)?t.type=we.MIXIN_RULE:t.type=we.STYLE_RULE}let r=t.rules;if(r)for(let t,i=0,s=r.length;i<s&&(t=r[i]);i++)e(t,n);return t}(function(e){let t=new ye;t.start=0,t.end=e.length;let n=t;for(let i=0,r=e.length;i<r;i++)if(e[i]===ze){n.rules||(n.rules=[]);let e=n,t=e.rules[e.rules.length-1]||null;(n=new ye).start=i+1,n.parent=e,n.previous=t,e.rules.push(n)}else e[i]===xe&&(n.end=i+1,n=n.parent||t);return t}(e=e.replace(Se.comments,"").replace(Se.port,"")),e)}function be(e,t,n=""){let i="";if(e.cssText||e.rules){let n=e.rules;if(n&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(ke)}(n))for(let e,r=0,s=n.length;r<s&&(e=n[r]);r++)i=be(e,t,i);else(i=(i=t?e.cssText:function(e){return function(e){return e.replace(Se.mixinApply,"").replace(Se.varApply,"")}(e=function(e){return e.replace(Se.customProp,"").replace(Se.mixinProp,"")}(e))}(e.cssText)).trim())&&(i="  "+i+"\n")}return i&&(e.selector&&(n+=e.selector+" "+ze+"\n"),n+=i,e.selector&&(n+=xe+"\n\n")),n}const we={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},ze="{",xe="}",Se={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},ke="--",Me="@media",Ce="@",Ae=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,Ee=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,Le=/@media\s(.*)/,Te=new Set,Oe="shady-unscoped";function He(e){const t=e.textContent;if(!Te.has(t)){Te.add(t);const n=e.cloneNode(!0);document.head.appendChild(n)}}function Pe(e){return e.hasAttribute(Oe)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Ne(e,t){return e?("string"==typeof e&&(e=_e(e)),t&&Ie(e,t),be(e,ve)):""}function Ve(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=_e(e.textContent)),e.__cssRules||null}function Ie(e,t,n,i){if(!e)return;let r=!1,s=e.type;if(i&&s===we.MEDIA_RULE){let t=e.selector.match(Le);t&&(window.matchMedia(t[1]).matches||(r=!0))}s===we.STYLE_RULE?t(e):n&&s===we.KEYFRAMES_RULE?n(e):s===we.MIXIN_RULE&&(r=!0);let o=e.rules;if(o&&!r)for(let e,r=0,s=o.length;r<s&&(e=o[r]);r++)Ie(e,t,n,i)}window.ShadyDOM&&window.ShadyDOM.wrap;const Re="css-build";function De(e){if(void 0!==fe)return fe;if(void 0===e.__cssBuild){const t=e.getAttribute(Re);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===Re)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/(e),e.__cssBuild=t}}return e.__cssBuild||""}function Be(e){return""!==De(e)}function $e(e,t){for(let n in t)null===n?e.style.removeProperty(n):e.style.setProperty(n,t[n])}function Fe(e,t){const n=window.getComputedStyle(e).getPropertyValue(t);return n?n.trim():""}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const je=/;\s*/m,Ue=/^\s*(initial)|(inherit)\s*$/,Ye=/\s*!important/,Ke="_-_";class qe{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let We=null;class Je{constructor(){this._currentElement=null,this._measureElement=null,this._map=new qe}detectMixin(e){return function(e){const t=Ee.test(e)||Ae.test(e);return Ee.lastIndex=0,Ae.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],n=e.querySelectorAll("style");for(let e=0;e<n.length;e++){const i=n[e];Pe(i)?pe||(He(i),i.parentNode.removeChild(i)):(t.push(i.textContent),i.parentNode.removeChild(i))}return t.join("").trim()}(e.content);if(t){const n=document.createElement("style");return n.textContent=t,e.content.insertBefore(n,e.content.firstChild),n}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const n=e._gatheredStyle;return n?this.transformStyle(n,t):null}transformStyle(e,t=""){let n=Ve(e);return this.transformRules(n,t),e.textContent=Ne(n),n}transformCustomStyle(e){let t=Ve(e);return Ie(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=Ne(t),t}transformRules(e,t){this._currentElement=t,Ie(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(Ae,(e,n,i,r)=>this._produceCssProperties(e,n,i,r,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const n={};let i=!1;return Ie(t,t=>{(i=i||t===e)||t.selector===e.selector&&Object.assign(n,this._cssTextToMap(t.parsedCssText))}),n}_consumeCssProperties(e,t){let n=null;for(;n=Ee.exec(e);){let i=n[0],r=n[1],s=n.index,o=s+i.indexOf("@apply"),a=s+i.length,l=e.slice(0,o),c=e.slice(a),h=t?this._fallbacksFromPreviousRules(t):{};Object.assign(h,this._cssTextToMap(l));let d=this._atApplyToCssProperties(r,h);e=`${l}${d}${c}`,Ee.lastIndex=s+d.length}return e}_atApplyToCssProperties(e,t){e=e.replace(je,"");let n=[],i=this._map.get(e);if(i||(this._map.set(e,{}),i=this._map.get(e)),i){let r,s,o;this._currentElement&&(i.dependants[this._currentElement]=!0);const a=i.properties;for(r in a)o=t&&t[r],s=[r,": var(",e,Ke,r],o&&s.push(",",o.replace(Ye,"")),s.push(")"),Ye.test(a[r])&&s.push(" !important"),n.push(s.join(""))}return n.join("; ")}_replaceInitialOrInherit(e,t){let n=Ue.exec(t);return n&&(t=n[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let n,i,r=e.split(";"),s={};for(let e,o,a=0;a<r.length;a++)(e=r[a])&&(o=e.split(":")).length>1&&(n=o[0].trim(),i=o.slice(1).join(":"),t&&(i=this._replaceInitialOrInherit(n,i)),s[n]=i);return s}_invalidateMixinEntry(e){if(We)for(let t in e.dependants)t!==this._currentElement&&We(t)}_produceCssProperties(e,t,n,i,r){if(n&&function e(t,n){let i=t.indexOf("var(");if(-1===i)return n(t,"","","");let r=function(e,t){let n=0;for(let i=t,r=e.length;i<r;i++)if("("===e[i])n++;else if(")"===e[i]&&0==--n)return i;return-1}(t,i+3),s=t.substring(i+4,r),o=t.substring(0,i),a=e(t.substring(r+1),n),l=s.indexOf(",");return-1===l?n(o,s.trim(),"",a):n(o,s.substring(0,l).trim(),s.substring(l+1).trim(),a)}(n,(e,t)=>{t&&this._map.get(t)&&(i=`@apply ${t};`)}),!i)return e;let s=this._consumeCssProperties(""+i,r),o=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(s,!0),l=a,c=this._map.get(t),h=c&&c.properties;h?l=Object.assign(Object.create(h),a):this._map.set(t,l);let d,p,u=[],f=!1;for(d in l)void 0===(p=a[d])&&(p="initial"),!h||d in h||(f=!0),u.push(`${t}${Ke}${d}: ${p}`);return f&&this._invalidateMixinEntry(c),c&&(c.properties=l),n&&(o=`${e};${o}`),`${o}${u.join("; ")};`}}Je.prototype.detectMixin=Je.prototype.detectMixin,Je.prototype.transformStyle=Je.prototype.transformStyle,Je.prototype.transformCustomStyle=Je.prototype.transformCustomStyle,Je.prototype.transformRules=Je.prototype.transformRules,Je.prototype.transformRule=Je.prototype.transformRule,Je.prototype.transformTemplate=Je.prototype.transformTemplate,Je.prototype._separator=Ke,Object.defineProperty(Je.prototype,"invalidCallback",{get:()=>We,set(e){We=e}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Qe={},Ge="_applyShimCurrentVersion",Xe="_applyShimNextVersion",Ze="_applyShimValidatingVersion",et=Promise.resolve();
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function tt(e){let t=Qe[e];t&&function(e){e[Ge]=e[Ge]||0,e[Ze]=e[Ze]||0,e[Xe]=(e[Xe]||0)+1}(t)}function nt(e){return e[Ge]===e[Xe]}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let it,rt=null,st=window.HTMLImports&&window.HTMLImports.whenReady||null;function ot(e){requestAnimationFrame((function(){st?st(e):(rt||(rt=new Promise(e=>{it=e}),"complete"===document.readyState?it():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&it()})),rt.then((function(){e&&e()})))}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const at="__seenByShadyCSS",lt="__shadyCSSCachedStyle";let ct=null,ht=null;class dt{constructor(){this.customStyles=[],this.enqueued=!1,ot(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&ht&&(this.enqueued=!0,ot(ht))}addCustomStyle(e){e[at]||(e[at]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[lt])return e[lt];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const n=e[t];if(n[lt])continue;const i=this.getStyleForCustomStyle(n);if(i){const e=i.__appliedElement||i;ct&&ct(e),n[lt]=e}}return e}}dt.prototype.addCustomStyle=dt.prototype.addCustomStyle,dt.prototype.getStyleForCustomStyle=dt.prototype.getStyleForCustomStyle,dt.prototype.processStyles=dt.prototype.processStyles,Object.defineProperties(dt.prototype,{transformCallback:{get:()=>ct,set(e){ct=e}},validateCallback:{get:()=>ht,set(e){let t=!1;ht||(t=!0),ht=e,t&&this.enqueueDocumentValidation()}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const pt=new Je;class ut{constructor(){this.customStyleInterface=null,pt.invalidCallback=tt}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{pt.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})}prepareTemplate(e,t){if(this.ensure(),Be(e))return;Qe[t]=e;let n=pt.transformTemplate(e,t);e._styleAst=n}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let n=e[t],i=this.customStyleInterface.getStyleForCustomStyle(n);i&&pt.transformCustomStyle(i)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&$e(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,n="",i="";return t?t.indexOf("-")>-1?n=t:(i=t,n=e.getAttribute&&e.getAttribute("is")||""):(n=e.is,i=e.extends),{is:n,typeExtension:i}}(e),n=Qe[t];if((!n||!Be(n))&&n&&!nt(n)){(function(e){return!nt(e)&&e[Ze]===e[Xe]})(n)||(this.prepareTemplate(n,t),function(e){e[Ze]=e[Xe],e._validating||(e._validating=!0,et.then((function(){e[Ge]=e[Xe],e._validating=!1})))}(n));let i=e.shadowRoot;if(i){let e=i.querySelector("style");e&&(e.__cssRules=n._styleAst,e.textContent=Ne(n._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new ut;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,n,i){e.flushCustomStyles(),e.prepareTemplate(t,n)},prepareTemplateStyles(e,t,n){window.ShadyCSS.prepareTemplate(e,t,n)},prepareTemplateDom(e,t){},styleSubtree(t,n){e.flushCustomStyles(),e.styleSubtree(t,n)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>Fe(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:ve,nativeShadow:pe,cssBuild:fe,disableRuntime:me},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=pt,
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty=function(e,t){return e};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ft,gt,mt=/(url\()([^)]*)(\))/g,vt=/(^\/)|(^#)|(^[\w-\d]*:)/;function yt(e,t){if(e&&vt.test(e))return e;if(void 0===ft){ft=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",ft="http://a/c%20d"===e.href}catch(e){}}return t||(t=document.baseURI||window.location.href),ft?new URL(e,t).href:(gt||((gt=document.implementation.createHTMLDocument("temp")).base=gt.createElement("base"),gt.head.appendChild(gt.base),gt.anchor=gt.createElement("a"),gt.body.appendChild(gt.anchor)),gt.base.href=t,gt.anchor.href=e,gt.anchor.href||e)}function _t(e,t){return e.replace(mt,(function(e,n,i,r){return n+"'"+yt(i.replace(/["']/g,""),t)+"'"+r}))}function bt(e){return e.substring(0,e.lastIndexOf("/")+1)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const wt=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss);let zt=bt(document.baseURI||window.location.href),xt=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,St=!1,kt=!1,Mt=!1,Ct=0;const At=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let n=Ct++;return function(i){let r=i.__mixinSet;if(r&&r[n])return i;let s=t,o=s.get(i);o||(o=e(i),s.set(i,o));let a=Object.create(o.__mixinSet||r||null);return a[n]=!0,o.__mixinSet=a,o}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Et={},Lt={};function Tt(e,t){Et[e]=Lt[e.toLowerCase()]=t}function Ot(e){return Et[e]||Lt[e.toLowerCase()]}class Ht extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let n=Ot(e);return n&&t?n.querySelector(t):n}return null}attributeChangedCallback(e,t,n,i){t!==n&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=yt(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=bt(t)}return this.__assetpath}register(e){if(e=e||this.id){if(kt&&void 0!==Ot(e))throw Tt(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,Tt(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}Ht.prototype.modules=Et,customElements.define("dom-module",Ht);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Pt="link[rel=import][type~=css]",Nt="include",Vt="shady-unscoped";function It(e){return Ht.import(e)}function Rt(e){const t=_t((e.body?e.body:e).textContent,e.baseURI),n=document.createElement("style");return n.textContent=t,n}function Dt(e){const t=e.trim().split(/\s+/),n=[];for(let e=0;e<t.length;e++)n.push(...Bt(t[e]));return n}function Bt(e){const t=It(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...Ft(t));const n=t.querySelector("template");n&&e.push(...$t(n,t.assetpath)),t._styles=e}return t._styles}function $t(e,t){if(!e._styles){const n=[],i=e.content.querySelectorAll("style");for(let e=0;e<i.length;e++){let r=i[e],s=r.getAttribute(Nt);s&&n.push(...Dt(s).filter((function(e,t,n){return n.indexOf(e)===t}))),t&&(r.textContent=_t(r.textContent,t)),n.push(r)}e._styles=n}return e._styles}function Ft(e){const t=[],n=e.querySelectorAll(Pt);for(let e=0;e<n.length;e++){let i=n[e];if(i.import){const e=i.import,n=i.hasAttribute(Vt);if(n&&!e._unscopedStyle){const t=Rt(e);t.setAttribute(Vt,""),e._unscopedStyle=t}else e._style||(e._style=Rt(e));t.push(n?e._unscopedStyle:e._style)}}return t}function jt(e){let t=It(e);if(t&&void 0===t._cssText){let e=function(e){let t="",n=Ft(e);for(let e=0;e<n.length;e++)t+=n[e].textContent;return t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/(t),n=t.querySelector("template");n&&(e+=function(e,t){let n="";const i=$t(e,t);for(let e=0;e<i.length;e++){let t=i[e];t.parentNode&&t.parentNode.removeChild(t),n+=t.textContent}return n}(n,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function Ut(e){return e.indexOf(".")>=0}function Yt(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function Kt(e,t){return 0===e.indexOf(t+".")}function qt(e,t){return 0===t.indexOf(e+".")}function Wt(e,t,n){return t+n.slice(e.length)}function Jt(e){if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let i=e[n].toString().split(".");for(let e=0;e<i.length;e++)t.push(i[e])}return t.join(".")}return e}function Qt(e){return Array.isArray(e)?Jt(e).split("."):e.toString().split(".")}function Gt(e,t,n){let i=e,r=Qt(t);for(let e=0;e<r.length;e++){if(!i)return;i=i[r[e]]}return n&&(n.path=r.join(".")),i}function Xt(e,t,n){let i=e,r=Qt(t),s=r[r.length-1];if(r.length>1){for(let e=0;e<r.length-1;e++){if(!(i=i[r[e]]))return}i[s]=n}else i[t]=n;return r.join(".")}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Zt={},en=/-[a-z]/g,tn=/([A-Z])/g;function nn(e){return Zt[e]||(Zt[e]=e.indexOf("-")<0?e:e.replace(en,e=>e[1].toUpperCase()))}function rn(e){return Zt[e]||(Zt[e]=e.replace(tn,"-$1").toLowerCase())}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let sn=0,on=0,an=[],ln=0,cn=document.createTextNode("");new window.MutationObserver((function(){const e=an.length;for(let t=0;t<e;t++){let e=an[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}an.splice(0,e),on+=e})).observe(cn,{characterData:!0});const hn={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},dn={run:e=>window.requestAnimationFrame(e),cancel(e){window.cancelAnimationFrame(e)}},pn={run:e=>(cn.textContent=ln++,an.push(e),sn++),cancel(e){const t=e-on;if(t>=0){if(!an[t])throw new Error("invalid async handle: "+e);an[t]=null}}},un=pn,fn=At(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let n in e)n in t||t._createPropertyAccessor(n)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,n){let i=this.__data[e],r=this._shouldPropertyChange(e,t,i);return r&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=i),this.__data[e]=t,this.__dataPending[e]=t),r}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,un.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(e,t,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,n))}_shouldPropertiesChange(e,t,n){return Boolean(t)}_propertiesChanged(e,t,n){}_shouldPropertyChange(e,t,n){return n!==t&&(n==n||t==t)}attributeChangedCallback(e,t,n,i){t!==n&&this._attributeToProperty(e,n),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,n,i)}_attributeToProperty(e,t,n){if(!this.__serializing){const i=this.__dataAttributes,r=i&&i[e]||e;this[r]=this._deserializeValue(t,n||this.constructor.typeForProperty(r))}}_propertyToAttribute(e,t,n){this.__serializing=!0,n=arguments.length<3?this[e]:n,this._valueToNodeAttribute(this,n,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,n){const i=this._serializeValue(t);void 0===i?e.removeAttribute(n):e.setAttribute(n,i)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}}),gn={};let mn=HTMLElement.prototype;for(;mn;){let e=Object.getOwnPropertyNames(mn);for(let t=0;t<e.length;t++)gn[e[t]]=!0;mn=Object.getPrototypeOf(mn)}const vn=At(e=>{const t=fn(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(nn(e[t]))}static attributeNameForProperty(e){return rn(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const n=this;n.hasAttribute(e)||this._valueToNodeAttribute(n,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let n;switch(t){case Object:try{n=JSON.parse(e)}catch(t){n=e}break;case Array:try{n=JSON.parse(e)}catch(t){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:n=isNaN(e)?String(e):Number(e),n=new Date(n);break;default:n=super._deserializeValue(e,t)}return n}_definePropertyAccessor(e,t){!function(e,t){if(!gn[t]){let n=e[t];void 0!==n&&(e.__data?e._setPendingProperty(t,n):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=n))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),yn={"dom-if":!0,"dom-repeat":!0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function _n(e){let t=e.getAttribute("is");if(t&&yn[t]){let n=e;for(n.removeAttribute("is"),e=n.ownerDocument.createElement(t),n.parentNode.replaceChild(e,n),e.appendChild(n);n.attributes.length;)e.setAttribute(n.attributes[0].name,n.attributes[0].value),n.removeAttribute(n.attributes[0].name)}return e}function bn(e,t){let n=t.parentInfo&&bn(e,t.parentInfo);if(!n)return e;for(let e=n.firstChild,i=0;e;e=e.nextSibling)if(t.parentIndex===i++)return e}function wn(e,t,n,i){i.id&&(t[i.id]=n)}function zn(e,t,n){if(n.events&&n.events.length)for(let i,r=0,s=n.events;r<s.length&&(i=s[r]);r++)e._addMethodEventListenerToNode(t,i.name,i.value,e)}function xn(e,t,n){n.templateInfo&&(t._templateInfo=n.templateInfo)}const Sn=At(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let n=e._templateInfo={};n.nodeInfoList=[],n.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,n,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,n){return this._parseTemplateNode(e.content,t,n)}static _parseTemplateNode(e,t,n){let i,r=e;return"template"!=r.localName||r.hasAttribute("preserve-content")?"slot"===r.localName&&(t.hasInsertionPoint=!0):i=this._parseTemplateNestedTemplate(r,t,n)||i,r.firstChild&&(i=this._parseTemplateChildNodes(r,t,n)||i),r.hasAttributes&&r.hasAttributes()&&(i=this._parseTemplateNodeAttributes(r,t,n)||i),i}static _parseTemplateChildNodes(e,t,n){if("script"!==e.localName&&"style"!==e.localName)for(let i,r=e.firstChild,s=0;r;r=i){if("template"==r.localName&&(r=_n(r)),i=r.nextSibling,r.nodeType===Node.TEXT_NODE){let n=i;for(;n&&n.nodeType===Node.TEXT_NODE;)r.textContent+=n.textContent,i=n.nextSibling,e.removeChild(n),n=i;if(t.stripWhiteSpace&&!r.textContent.trim()){e.removeChild(r);continue}}let o={parentIndex:s,parentInfo:n};this._parseTemplateNode(r,t,o)&&(o.infoIndex=t.nodeInfoList.push(o)-1),r.parentNode&&s++}}static _parseTemplateNestedTemplate(e,t,n){let i=this._parseTemplate(e,t);return(i.content=e.content.ownerDocument.createDocumentFragment()).appendChild(e.content),n.templateInfo=i,!0}static _parseTemplateNodeAttributes(e,t,n){let i=!1,r=Array.from(e.attributes);for(let s,o=r.length-1;s=r[o];o--)i=this._parseTemplateNodeAttribute(e,t,n,s.name,s.value)||i;return i}static _parseTemplateNodeAttribute(e,t,n,i,r){return"on-"===i.slice(0,3)?(e.removeAttribute(i),n.events=n.events||[],n.events.push({name:i.slice(3),value:r}),!0):"id"===i&&(n.id=r,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),n=t.nodeInfoList,i=t.content||e.content,r=document.importNode(i,!0);r.__noInsertionPoint=!t.hasInsertionPoint;let s=r.nodeList=new Array(n.length);r.$={};for(let e,t=0,i=n.length;t<i&&(e=n[t]);t++){let n=s[t]=bn(r,e);wn(0,r.$,n,e),xn(0,n,e),zn(this,n,e)}return r=r}_addMethodEventListenerToNode(e,t,n,i){let r=function(e,t,n){return e=e._methodHost||e,function(t){e[n]?e[n](t,t.detail):console.warn("listener method `"+n+"` not defined")}}(i=i||e,0,n);return this._addEventListenerToNode(e,t,r),r}_addEventListenerToNode(e,t,n){e.addEventListener(t,n)}_removeEventListenerFromNode(e,t,n){e.removeEventListener(t,n)}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let kn=0;const Mn={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Cn=/[A-Z]/;function An(e,t){let n=e[t];if(n){if(!e.hasOwnProperty(t)){n=e[t]=Object.create(e[t]);for(let e in n){let t=n[e],i=n[e]=Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[e]}}}else n=e[t]={};return n}function En(e,t,n,i,r,s){if(t){let o=!1,a=kn++;for(let l in n)Ln(e,t,a,l,n,i,r,s)&&(o=!0);return o}return!1}function Ln(e,t,n,i,r,s,o,a){let l=!1,c=t[o?Yt(i):i];if(c)for(let t,h=0,d=c.length;h<d&&(t=c[h]);h++)t.info&&t.info.lastRun===n||o&&!Tn(i,t.trigger)||(t.info&&(t.info.lastRun=n),t.fn(e,i,r,s,t.info,o,a),l=!0);return l}function Tn(e,t){if(t){let n=t.name;return n==e||t.structured&&Kt(n,e)||t.wildcard&&qt(n,e)}return!0}function On(e,t,n,i,r){let s="string"==typeof r.method?e[r.method]:r.method,o=r.property;s?s.call(e,e.__data[o],i[o]):r.dynamicFn||console.warn("observer method `"+r.method+"` not defined")}function Hn(e,t,n){let i=Yt(t);if(i!==t){return Pn(e,rn(i)+"-changed",n[t],t),!0}return!1}function Pn(e,t,n,i){let r={value:n,queueProperty:!0};i&&(r.path=i),e.dispatchEvent(new CustomEvent(t,{detail:r}))}function Nn(e,t,n,i,r,s){let o=(s?Yt(t):t)!=t?t:null,a=o?Gt(e,o):e.__data[t];o&&void 0===a&&(a=n[t]),Pn(e,r.eventName,a,o)}function Vn(e,t,n,i,r){let s=e.__data[t];xt&&(s=xt(s,r.attrName,"attribute",e)),e._propertyToAttribute(t,r.attrName,s)}function In(e,t,n,i,r){let s=Un(e,t,n,i,r),o=r.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[o]?e._setPendingProperty(o,s,!0):e[o]=s}function Rn(e,t,n,i,r,s,o){n.bindings=n.bindings||[];let a={kind:i,target:r,parts:s,literal:o,isCompound:1!==s.length};if(n.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||rn(r)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let n=0;n<a.parts.length;n++){let i=a.parts[n];i.compoundIndex=n,Dn(e,t,a,i,l)}}function Dn(e,t,n,i,r){if(!i.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let s=i.dependencies,o={index:r,binding:n,part:i,evaluator:e};for(let n=0;n<s.length;n++){let i=s[n];"string"==typeof i&&((i=Jn(i)).wildcard=!0),e._addTemplatePropertyEffect(t,i.rootProperty,{fn:Bn,info:o,trigger:i})}}}function Bn(e,t,n,i,r,s,o){let a=o[r.index],l=r.binding,c=r.part;if(s&&c.source&&t.length>c.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let i=n[t];t=Wt(c.source,l.target,t),a._setPendingPropertyOrPath(t,i,!1,!0)&&e._enqueueClient(a)}else{!function(e,t,n,i,r){r=function(e,t,n,i){if(n.isCompound){let r=e.__dataCompoundStorage[n.target];r[i.compoundIndex]=t,t=r.join("")}"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,r,n,i),xt&&(r=xt(r,n.target,n.kind,t));if("attribute"==n.kind)e._valueToNodeAttribute(t,r,n.target);else{let i=n.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[i]?t[Mn.READ_ONLY]&&t[Mn.READ_ONLY][i]||t._setPendingProperty(i,r)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,i,r)}}(e,a,l,c,r.evaluator._evaluateBinding(e,c,t,n,i,s))}}function $n(e,t){if(t.isCompound){let n=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),i=t.parts,r=new Array(i.length);for(let e=0;e<i.length;e++)r[e]=i[e].literal;let s=t.target;n[s]=r,t.literal&&"property"==t.kind&&(e[s]=t.literal)}}function Fn(e,t,n){if(n.listenerEvent){let i=n.parts[0];e.addEventListener(n.listenerEvent,(function(e){!function(e,t,n,i,r){let s,o=e.detail,a=o&&o.path;a?(i=Wt(n,i,a),s=o&&o.value):s=e.currentTarget[n],s=r?!s:s,t[Mn.READ_ONLY]&&t[Mn.READ_ONLY][i]||!t._setPendingPropertyOrPath(i,s,!0,Boolean(a))||o&&o.queueProperty||t._invalidateProperties()}(e,t,n.target,i.source,i.negate)}))}}function jn(e,t,n,i,r,s){s=t.static||s&&("object"!=typeof s||s[t.methodName]);let o={methodName:t.methodName,args:t.args,methodInfo:r,dynamicFn:s};for(let r,s=0;s<t.args.length&&(r=t.args[s]);s++)r.literal||e._addPropertyEffect(r.rootProperty,n,{fn:i,info:o,trigger:r});s&&e._addPropertyEffect(t.methodName,n,{fn:i,info:o})}function Un(e,t,n,i,r){let s=e._methodHost||e,o=s[r.methodName];if(o){let i=e._marshalArgs(r.args,t,n);return o.apply(s,i)}r.dynamicFn||console.warn("method `"+r.methodName+"` not defined")}const Yn=[],Kn=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function qn(e){let t="";for(let n=0;n<e.length;n++){t+=e[n].literal||""}return t}function Wn(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:Yn};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let n=Jn(e);return n.literal||(t.static=!1),n}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function Jn(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:t,value:"",literal:!1},i=t[0];switch("-"===i&&(i=t[1]),i>="0"&&i<="9"&&(i="#"),i){case"'":case'"':n.value=t.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(t),n.literal=!0}return n.literal||(n.rootProperty=Yt(t),n.structured=Ut(t),n.structured&&(n.wildcard=".*"==t.slice(-2),n.wildcard&&(n.name=t.slice(0,-2)))),n}function Qn(e,t,n,i){let r=n+".splices";e.notifyPath(r,{indexSplices:i}),e.notifyPath(n+".length",t.length),e.__data[r]={indexSplices:null}}function Gn(e,t,n,i,r,s){Qn(e,t,n,[{index:i,addedCount:r,removed:s,object:t,type:"splice"}])}const Xn=At(e=>{const t=Sn(vn(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return Mn}_initializeProperties(){super._initializeProperties(),Zn.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[Mn.READ_ONLY];for(let n in e)t&&t[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=e[n])}_addPropertyEffect(e,t,n){this._createPropertyAccessor(e,t==Mn.READ_ONLY);let i=An(this,t)[e];i||(i=this[t][e]=[]),i.push(n)}_removePropertyEffect(e,t,n){let i=An(this,t)[e],r=i.indexOf(n);r>=0&&i.splice(r,1)}_hasPropertyEffect(e,t){let n=this[t];return Boolean(n&&n[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,Mn.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,Mn.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,Mn.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,Mn.COMPUTE)}_setPendingPropertyOrPath(e,t,n,i){if(i||Yt(Array.isArray(e)?e[0]:e)!==e){if(!i){let n=Gt(this,e);if(!(e=Xt(this,e,t))||!super._shouldPropertyChange(e,t,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,n))return function(e,t,n){let i=e.__dataLinkedPaths;if(i){let r;for(let s in i){let o=i[s];qt(s,t)?(r=Wt(s,o,t),e._setPendingPropertyOrPath(r,n,!0,!0)):qt(o,t)&&(r=Wt(o,s,t),e._setPendingPropertyOrPath(r,n,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,n);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,n){n===e[t]&&"object"!=typeof n||(e[t]=n)}_setPendingProperty(e,t,n){let i=this.__dataHasPaths&&Ut(e),r=i?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,r[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),i?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(i||this[Mn.NOTIFY]&&this[Mn.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=n),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let n=e[t];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let n in e)!t&&this[Mn.READ_ONLY]&&this[Mn.READ_ONLY][n]||this._setPendingPropertyOrPath(n,e[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,n){let i=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,n,i){let r=e[Mn.COMPUTE];if(r){let s=t;for(;En(e,r,s,n,i);)Object.assign(n,e.__dataOld),Object.assign(t,e.__dataPending),s=e.__dataPending,e.__dataPending=null}}(this,t,n,i);let r=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,n,i),this._flushClients(),En(this,this[Mn.REFLECT],t,n,i),En(this,this[Mn.OBSERVE],t,n,i),r&&function(e,t,n,i,r){let s,o,a=e[Mn.NOTIFY],l=kn++;for(let o in t)t[o]&&(a&&Ln(e,a,l,o,n,i,r)?s=!0:r&&Hn(e,o,n)&&(s=!0));s&&(o=e.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,r,t,n,i),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,n){this[Mn.PROPAGATE]&&En(this,this[Mn.PROPAGATE],e,t,n);let i=this.__templateInfo;for(;i;)En(this,i.propertyEffects,e,t,n,i.nodeList),i=i.nextTemplateInfo}linkPaths(e,t){e=Jt(e),t=Jt(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Jt(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let n={path:""};Qn(this,Gt(this,e,n),n.path,t)}get(e,t){return Gt(t||this,e)}set(e,t,n){n?Xt(n,e,t):this[Mn.READ_ONLY]&&this[Mn.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let n={path:""},i=Gt(this,e,n),r=i.length,s=i.push(...t);return t.length&&Gn(this,i,n.path,r,t.length,[]),s}pop(e){let t={path:""},n=Gt(this,e,t),i=Boolean(n.length),r=n.pop();return i&&Gn(this,n,t.path,n.length,0,[r]),r}splice(e,t,n,...i){let r,s={path:""},o=Gt(this,e,s);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),r=2===arguments.length?o.splice(t):o.splice(t,n,...i),(i.length||r.length)&&Gn(this,o,s.path,t,i.length,r),r}shift(e){let t={path:""},n=Gt(this,e,t),i=Boolean(n.length),r=n.shift();return i&&Gn(this,n,t.path,0,0,[r]),r}unshift(e,...t){let n={path:""},i=Gt(this,e,n),r=i.unshift(...t);return t.length&&Gn(this,i,n.path,0,t.length,[]),r}notifyPath(e,t){let n;if(1==arguments.length){let i={path:""};t=Gt(this,e,i),n=i.path}else n=Array.isArray(e)?Jt(e):e;this._setPendingPropertyOrPath(n,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var n;this._addPropertyEffect(e,Mn.READ_ONLY),t&&(this["_set"+(n=e,n[0].toUpperCase()+n.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,n){let i={property:e,method:t,dynamicFn:Boolean(n)};this._addPropertyEffect(e,Mn.OBSERVE,{fn:On,info:i,trigger:{name:e}}),n&&this._addPropertyEffect(t,Mn.OBSERVE,{fn:On,info:i,trigger:{name:t}})}_createMethodObserver(e,t){let n=Wn(e);if(!n)throw new Error("Malformed observer expression '"+e+"'");jn(this,n,Mn.OBSERVE,Un,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,Mn.NOTIFY,{fn:Nn,info:{eventName:rn(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,Mn.REFLECT,{fn:Vn,info:{attrName:t}})}_createComputedProperty(e,t,n){let i=Wn(t);if(!i)throw new Error("Malformed computed expression '"+t+"'");jn(this,i,Mn.COMPUTE,In,e,n)}_marshalArgs(e,t,n){const i=this.__data;let r=[];for(let s=0,o=e.length;s<o;s++){let o,a=e[s],l=a.name;if(a.literal?o=a.value:a.structured?void 0===(o=Gt(i,l))&&(o=n[l]):o=i[l],a.wildcard){let e=0===l.indexOf(t+"."),i=0===t.indexOf(l)&&!e;r[s]={path:i?t:l,value:i?n[t]:o,base:o}}else r[s]=o}return r}static addPropertyEffect(e,t,n){this.prototype._addPropertyEffect(e,t,n)}static createPropertyObserver(e,t,n){this.prototype._createPropertyObserver(e,t,n)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,n){this.prototype._createComputedProperty(e,t,n)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let n=this.constructor._parseTemplate(e),i=this.__templateInfo==n;if(!i)for(let e in n.propertyEffects)this._createPropertyAccessor(e);if(t&&((n=Object.create(n)).wasPreBound=i,!i&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=n,n.previousTemplateInfo=e,n}return this.__templateInfo=n}static _addTemplatePropertyEffect(e,t,n){(e.hostProps=e.hostProps||{})[t]=!0;let i=e.propertyEffects=e.propertyEffects||{};(i[t]=i[t]||[]).push(n)}_stampTemplate(e){Zn.beginHosting(this);let t=super._stampTemplate(e);Zn.endHosting(this);let n=this._bindTemplate(e,!0);if(n.nodeList=t.nodeList,!n.wasPreBound){let e=n.childNodes=[];for(let n=t.firstChild;n;n=n.nextSibling)e.push(n)}return t.templateInfo=n,function(e,t){let{nodeList:n,nodeInfoList:i}=t;if(i.length)for(let t=0;t<i.length;t++){let r=i[t],s=n[t],o=r.bindings;if(o)for(let t=0;t<o.length;t++){let n=o[t];$n(s,n),Fn(s,e,n)}s.__dataHost=e}}(this,n),this.__dataReady&&En(this,n.propertyEffects,this.__data,null,!1,n.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let n=t.childNodes;for(let e=0;e<n.length;e++){let t=n[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,t,n){let i=super._parseTemplateNode(e,t,n);if(e.nodeType===Node.TEXT_NODE){let r=this._parseBindings(e.textContent,t);r&&(e.textContent=qn(r)||" ",Rn(this,t,n,"text","textContent",r),i=!0)}return i}static _parseTemplateNodeAttribute(e,t,n,i,r){let s=this._parseBindings(r,t);if(s){let r=i,o="property";Cn.test(i)?o="attribute":"$"==i[i.length-1]&&(i=i.slice(0,-1),o="attribute");let a=qn(s);return a&&"attribute"==o&&e.setAttribute(i,a),"input"===e.localName&&"value"===r&&e.setAttribute(r,""),e.removeAttribute(r),"property"===o&&(i=nn(i)),Rn(this,t,n,o,i,s,a),!0}return super._parseTemplateNodeAttribute(e,t,n,i,r)}static _parseTemplateNestedTemplate(e,t,n){let i=super._parseTemplateNestedTemplate(e,t,n),r=n.templateInfo.hostProps;for(let e in r){Rn(this,t,n,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}])}return i}static _parseBindings(e,t){let n,i=[],r=0;for(;null!==(n=Kn.exec(e));){n.index>r&&i.push({literal:e.slice(r,n.index)});let s=n[1][0],o=Boolean(n[2]),a=n[3].trim(),l=!1,c="",h=-1;"{"==s&&(h=a.indexOf("::"))>0&&(c=a.substring(h+2),a=a.substring(0,h),l=!0);let d=Wn(a),p=[];if(d){let{args:e,methodName:n}=d;for(let t=0;t<e.length;t++){let n=e[t];n.literal||p.push(n)}let i=t.dynamicFns;(i&&i[n]||d.static)&&(p.push(n),d.dynamicFn=!0)}else p.push(a);i.push({source:a,mode:s,negate:o,customEvent:l,signature:d,dependencies:p,event:c}),r=Kn.lastIndex}if(r&&r<e.length){let t=e.substring(r);t&&i.push({literal:t})}return i.length?i:null}static _evaluateBinding(e,t,n,i,r,s){let o;return o=t.signature?Un(e,n,i,0,t.signature):n!=t.source?Gt(e,t.source):s&&Ut(n)?Gt(e,n):e.__data[n],t.negate&&(o=!o),o}}});const Zn=new class{constructor(){this.stack=[]}registerHost(e){if(this.stack.length){this.stack[this.stack.length-1]._enqueueClient(e)}}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const ei=At(e=>{const t=fn(e);function n(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof r?t:null}function i(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const n=e.properties;n&&(t=function(e){const t={};for(let n in e){const i=e[n];t[n]="function"==typeof i?{type:i}:i}return t}(n))}e.__ownProperties=t}return e.__ownProperties}class r extends t{static get observedAttributes(){const e=this._properties;return e?Object.keys(e).map(e=>this.attributeNameForProperty(e)):[]}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=n(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=i(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=n(this);this.__properties=Object.assign({},e&&e._properties,i(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return r}),ti="3.0.5",ni=At(e=>{const t=ei(Xn(e));function n(e,t,n,i){n.computed&&(n.readOnly=!0),n.computed&&!e._hasReadOnlyEffect(t)&&e._createComputedProperty(t,n.computed,i),n.readOnly&&!e._hasReadOnlyEffect(t)&&e._createReadOnlyProperty(t,!n.computed),n.reflectToAttribute&&!e._hasReflectEffect(t)&&e._createReflectedProperty(t),n.notify&&!e._hasNotifyEffect(t)&&e._createNotifyingProperty(t),n.observer&&e._createPropertyObserver(t,n.observer,i[n.observer]),e._addPropertyToAttributeMap(t)}function i(e,t,n,i){const r=t.content.querySelectorAll("style"),s=$t(t),o=function(e){let t=It(e);return t?Ft(t):[]}(n),a=t.content.firstElementChild;for(let n=0;n<o.length;n++){let r=o[n];r.textContent=e._processStyleText(r.textContent,i),t.content.insertBefore(r,a)}let l=0;for(let t=0;t<s.length;t++){let n=s[t],o=r[l];o!==n?(n=n.cloneNode(!0),o.parentNode.insertBefore(n,o)):l++,n.textContent=e._processStyleText(n.textContent,i)}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,n)}return class extends t{static get polymerElementVersion(){return ti}static _finalizeClass(){super._finalizeClass(),this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&this.is&&this.prototype;const e=((t=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",t))||(t.__ownObservers=t.hasOwnProperty(JSCompiler_renameProperty("observers",t))?t.observers:null),t.__ownObservers);var t;e&&this.createObservers(e,this._properties);let n=this.template;n&&("string"==typeof n?(console.error("template getter must return HTMLTemplateElement"),n=null):n=n.cloneNode(!0)),this.prototype._template=n}static createProperties(e){for(let t in e)n(this.prototype,t,e[t],e)}static createObservers(e,t){const n=this.prototype;for(let i=0;i<e.length;i++)n._createMethodObserver(e[i],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!kt||Mt)&&(t=Ht.import(e,"template"),kt&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=bt(e.url);else{const e=Ht.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=zt,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let n in t){let i=t[n];"value"in i&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[n]=i)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let n=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return _t(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;i(this,t,e,n?yt(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){if(this.attachShadow)return e?(this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(e),this.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=yt(this.importPath)),yt(e,t)}static _parseTemplateContent(e,t,n){return t.dynamicFns=t.dynamicFns||this._properties,super._parseTemplateContent(e,t,n)}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class ii{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,this._callback()})}cancel(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,n){return e instanceof ii?e.cancel():e=new ii,e.setConfig(t,n),e}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let ri="string"==typeof document.head.style.touchAction,si="__polymerGestures",oi="__polymerGesturesHandled",ai="__polymerGesturesTouchAction",li=25,ci=5,hi=2500,di=["mousedown","mousemove","mouseup","click"],pi=[0,1,4,2],ui=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function fi(e){return di.indexOf(e)>-1}let gi=!1;function mi(e){if(!fi(e)&&"touchend"!==e)return ri&&gi&&St?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){gi=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let vi=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const yi=[],_i={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},bi={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function wi(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let n=e.getRootNode();if(e.id){let i=n.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<i.length;e++)t.push(i[e])}}return t}let zi=function(e){let t=e.sourceCapabilities;var n;if((!t||t.firesTouchEvents)&&(e[oi]={skip:!0},"click"===e.type)){let t=!1,i=e.composedPath&&e.composedPath();if(i)for(let e=0;e<i.length;e++){if(i[e].nodeType===Node.ELEMENT_NODE)if("label"===i[e].localName)yi.push(i[e]);else if(n=i[e],_i[n.localName]){let n=wi(i[e]);for(let e=0;e<n.length;e++)t=t||yi.indexOf(n[e])>-1}if(i[e]===ki.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function xi(e){let t=vi?["click"]:di;for(let n,i=0;i<t.length;i++)n=t[i],e?(yi.length=0,document.addEventListener(n,zi,!0)):document.removeEventListener(n,zi,!0)}function Si(e){let t=e.type;if(!fi(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!ui&&(t=pi[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let ki={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Mi(e,t,n){e.movefn=t,e.upfn=n,document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)}function Ci(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}document.addEventListener("touchend",(function(e){ki.mouse.mouseIgnoreJob||xi(!0),ki.mouse.target=e.composedPath()[0],ki.mouse.mouseIgnoreJob=ii.debounce(ki.mouse.mouseIgnoreJob,hn.after(hi),(function(){xi(),ki.mouse.target=null,ki.mouse.mouseIgnoreJob=null}))}),!!gi&&{passive:!0});const Ai={},Ei=[];function Li(e){if(e.composedPath){const t=e.composedPath();return t.length>0?t[0]:e.target}return e.target}function Ti(e){let t,n=e.type,i=e.currentTarget[si];if(!i)return;let r=i[n];if(r){if(!e[oi]&&(e[oi]={},"touch"===n.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===n&&1===e.touches.length&&(ki.touch.id=t.identifier),ki.touch.id!==t.identifier)return;ri||"touchstart"!==n&&"touchmove"!==n||function(e){let t=e.changedTouches[0],n=e.type;if("touchstart"===n)ki.touch.x=t.clientX,ki.touch.y=t.clientY,ki.touch.scrollDecided=!1;else if("touchmove"===n){if(ki.touch.scrollDecided)return;ki.touch.scrollDecided=!0;let n=function(e){let t="auto",n=e.composedPath&&e.composedPath();if(n)for(let e,i=0;i<n.length;i++)if((e=n[i])[ai]){t=e[ai];break}return t}(e),i=!1,r=Math.abs(ki.touch.x-t.clientX),s=Math.abs(ki.touch.y-t.clientY);e.cancelable&&("none"===n?i=!0:"pan-x"===n?i=s>r:"pan-y"===n&&(i=r>s)),i?e.preventDefault():Ii("track")}}(e)}if(!(t=e[oi]).skip){for(let n,i=0;i<Ei.length;i++)r[(n=Ei[i]).name]&&!t[n.name]&&n.flow&&n.flow.start.indexOf(e.type)>-1&&n.reset&&n.reset();for(let i,s=0;s<Ei.length;s++)r[(i=Ei[s]).name]&&!t[i.name]&&(t[i.name]=!0,i[n](e))}}}function Oi(e,t,n){return!!Ai[t]&&(function(e,t,n){let i=Ai[t],r=i.deps,s=i.name,o=e[si];o||(e[si]=o={});for(let t,n,i=0;i<r.length;i++)t=r[i],vi&&fi(t)&&"click"!==t||((n=o[t])||(o[t]=n={_count:0}),0===n._count&&e.addEventListener(t,Ti,mi(t)),n[s]=(n[s]||0)+1,n._count=(n._count||0)+1);e.addEventListener(t,n),i.touchAction&&Ni(e,i.touchAction)}(e,t,n),!0)}function Hi(e,t,n){return!!Ai[t]&&(function(e,t,n){let i=Ai[t],r=i.deps,s=i.name,o=e[si];if(o)for(let t,n,i=0;i<r.length;i++)t=r[i],(n=o[t])&&n[s]&&(n[s]=(n[s]||1)-1,n._count=(n._count||1)-1,0===n._count&&e.removeEventListener(t,Ti,mi(t)));e.removeEventListener(t,n)}(e,t,n),!0)}function Pi(e){Ei.push(e);for(let t=0;t<e.emits.length;t++)Ai[e.emits[t]]=e}function Ni(e,t){ri&&e instanceof HTMLElement&&pn.run(()=>{e.style.touchAction=t}),e[ai]=t}function Vi(e,t,n){let i=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=n,e.dispatchEvent(i),i.defaultPrevented){let e=n.preventer||n.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function Ii(e){let t=function(e){for(let t,n=0;n<Ei.length;n++){t=Ei[n];for(let n,i=0;i<t.emits.length;i++)if((n=t.emits[i])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function Ri(e,t,n,i){t&&Vi(t,e,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:i,prevent:function(e){return Ii(e)}})}function Di(e,t,n){if(e.prevent)return!1;if(e.started)return!0;let i=Math.abs(e.x-t),r=Math.abs(e.y-n);return i>=ci||r>=ci}function Bi(e,t,n){if(!t)return;let i,r=e.moves[e.moves.length-2],s=e.moves[e.moves.length-1],o=s.x-e.x,a=s.y-e.y,l=0;r&&(i=s.x-r.x,l=s.y-r.y),Vi(t,"track",{state:e.state,x:n.clientX,y:n.clientY,dx:o,dy:a,ddx:i,ddy:l,sourceEvent:n,hover:function(){return function(e,t){let n=document.elementFromPoint(e,t),i=n;for(;i&&i.shadowRoot&&!window.ShadyDOM;){if(i===(i=i.shadowRoot.elementFromPoint(e,t)))break;i&&(n=i)}return n}(n.clientX,n.clientY)}})}function $i(e,t,n){let i=Math.abs(t.clientX-e.x),r=Math.abs(t.clientY-e.y),s=Li(n||t);!s||bi[s.localName]&&s.hasAttribute("disabled")||(isNaN(i)||isNaN(r)||i<=li&&r<=li||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=Li(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let n=t.getBoundingClientRect(),i=e.pageX,r=e.pageY;return!(i>=n.left&&i<=n.right&&r>=n.top&&r<=n.bottom)}return!1}(t))&&(e.prevent||Vi(s,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:n}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/Pi({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Ci(this.info)},mousedown:function(e){if(!Si(e))return;let t=Li(e),n=this;Mi(this.info,(function(e){Si(e)||(Ri("up",t,e),Ci(n.info))}),(function(e){Si(e)&&Ri("up",t,e),Ci(n.info)})),Ri("down",t,e)},touchstart:function(e){Ri("down",Li(e),e.changedTouches[0],e)},touchend:function(e){Ri("up",Li(e),e.changedTouches[0],e)}}),Pi({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Ci(this.info)},mousedown:function(e){if(!Si(e))return;let t=Li(e),n=this,i=function(e){let i=e.clientX,r=e.clientY;Di(n.info,i,r)&&(n.info.state=n.info.started?"mouseup"===e.type?"end":"track":"start","start"===n.info.state&&Ii("tap"),n.info.addMove({x:i,y:r}),Si(e)||(n.info.state="end",Ci(n.info)),t&&Bi(n.info,t,e),n.info.started=!0)};Mi(this.info,i,(function(e){n.info.started&&i(e),Ci(n.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=Li(e),n=e.changedTouches[0],i=n.clientX,r=n.clientY;Di(this.info,i,r)&&("start"===this.info.state&&Ii("tap"),this.info.addMove({x:i,y:r}),Bi(this.info,t,n),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=Li(e),n=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),Bi(this.info,t,n))}}),Pi({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){Si(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){Si(e)&&$i(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){$i(this.info,e.changedTouches[0],e)}});const Fi=At(e=>{return class extends e{_addEventListenerToNode(e,t,n){Oi(e,t,n)||super._addEventListenerToNode(e,t,n)}_removeEventListenerFromNode(e,t,n){Hi(e,t,n)||super._removeEventListenerFromNode(e,t,n)}}}),ji=/:host\(:dir\((ltr|rtl)\)\)/g,Ui=':host([dir="$1"])',Yi=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Ki=':host([dir="$2"]) $1',qi=[];
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Wi=null,Ji="";function Qi(){Ji=document.documentElement.getAttribute("dir")}function Gi(e){if(!e.__autoDirOptOut){e.setAttribute("dir",Ji)}}function Xi(){Qi(),Ji=document.documentElement.getAttribute("dir");for(let e=0;e<qi.length;e++)Gi(qi[e])}const Zi=At(e=>{Wi||(Qi(),(Wi=new MutationObserver(Xi)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=vn(e);class n extends t{static _processStyleText(e,t){return e=super._processStyleText(e,t),e=this._replaceDirInCssText(e)}static _replaceDirInCssText(e){let t=e;return e!==(t=(t=t.replace(ji,Ui)).replace(Yi,Ki))&&(this.__activateDir=!0),t}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(Wi&&Wi.takeRecords().length&&Xi(),qi.push(this),Gi(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=qi.indexOf(this);e>-1&&qi.splice(e,1)}}}return n.__activateDir=!1,n});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function er(){document.body.removeAttribute("unresolved")}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function tr(e,t,n){return{index:e,removed:t,addedCount:n}}"interactive"===document.readyState||"complete"===document.readyState?er():window.addEventListener("DOMContentLoaded",er);const nr=0,ir=1,rr=2,sr=3;function or(e,t,n,i,r,s){let o,a=0,l=0,c=Math.min(n-t,s-r);if(0==t&&0==r&&(a=function(e,t,n){for(let i=0;i<n;i++)if(!lr(e[i],t[i]))return i;return n}(e,i,c)),n==e.length&&s==i.length&&(l=function(e,t,n){let i=e.length,r=t.length,s=0;for(;s<n&&lr(e[--i],t[--r]);)s++;return s}(e,i,c-a)),r+=a,s-=l,(n-=l)-(t+=a)==0&&s-r==0)return[];if(t==n){for(o=tr(t,[],0);r<s;)o.removed.push(i[r++]);return[o]}if(r==s)return[tr(t,[],n-t)];let h=function(e){let t=e.length-1,n=e[0].length-1,i=e[t][n],r=[];for(;t>0||n>0;){if(0==t){r.push(rr),n--;continue}if(0==n){r.push(sr),t--;continue}let s,o=e[t-1][n-1],a=e[t-1][n],l=e[t][n-1];(s=a<l?a<o?a:o:l<o?l:o)==o?(o==i?r.push(nr):(r.push(ir),i=o),t--,n--):s==a?(r.push(sr),t--,i=a):(r.push(rr),n--,i=l)}return r.reverse(),r}(function(e,t,n,i,r,s){let o=s-r+1,a=n-t+1,l=new Array(o);for(let e=0;e<o;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let n=1;n<o;n++)for(let s=1;s<a;s++)if(lr(e[t+s-1],i[r+n-1]))l[n][s]=l[n-1][s-1];else{let e=l[n-1][s]+1,t=l[n][s-1]+1;l[n][s]=e<t?e:t}return l}(e,t,n,i,r,s));o=void 0;let d=[],p=t,u=r;for(let e=0;e<h.length;e++)switch(h[e]){case nr:o&&(d.push(o),o=void 0),p++,u++;break;case ir:o||(o=tr(p,[],0)),o.addedCount++,p++,o.removed.push(i[u]),u++;break;case rr:o||(o=tr(p,[],0)),o.addedCount++,p++;break;case sr:o||(o=tr(p,[],0)),o.removed.push(i[u]),u++}return o&&d.push(o),d}function ar(e,t){return or(e,0,e.length,t,0,t.length)}function lr(e,t){return e===t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function cr(e){return"slot"===e.localName}class hr{static getFlattenedNodes(e){return cr(e)?(e=e).assignedNodes({flatten:!0}):Array.from(e.childNodes).map(e=>cr(e)?(e=e).assignedNodes({flatten:!0}):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){cr(this._target)?this._listenSlots([this._target]):this._target.children&&(this._listenSlots(this._target.children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){cr(this._target)?this._unlistenSlots([this._target]):this._target.children&&(this._unlistenSlots(this._target.children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,pn.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let n=e[t];n.addedNodes&&this._listenSlots(n.addedNodes),n.removedNodes&&this._unlistenSlots(n.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),n=ar(t,this._effectiveNodes);for(let t,i=0;i<n.length&&(t=n[i]);i++)for(let n,i=0;i<t.removed.length&&(n=t.removed[i]);i++)e.removedNodes.push(n);for(let i,r=0;r<n.length&&(i=n[r]);r++)for(let n=i.index;n<i.index+i.addedCount;n++)e.addedNodes.push(t[n]);this._effectiveNodes=t;let i=!1;return(e.addedNodes.length||e.removedNodes.length)&&(i=!0,this.callback.call(this._target,e)),i}_listenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];cr(n)&&n.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];cr(n)&&n.removeEventListener("slotchange",this._boundSchedule)}}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let dr=[];const pr=function(e){dr.push(e)};function ur(){const e=Boolean(dr.length);for(;dr.length;)try{dr.shift().flush()}catch(e){setTimeout(()=>{throw e})}return e}const fr=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=ur()}while(e||t)},gr=Element.prototype,mr=gr.matches||gr.matchesSelector||gr.mozMatchesSelector||gr.msMatchesSelector||gr.oMatchesSelector||gr.webkitMatchesSelector,vr=function(e,t){return mr.call(e,t)};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class yr{constructor(e){this.node=e}observeNodes(e){return new hr(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(this.node.contains(e))return!0;let t=e,n=e.ownerDocument;for(;t&&t!==n&&t!==this.node;)t=t.parentNode||t.host;return t===this.node}getOwnerRoot(){return this.node.getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?this.node.assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=this.node.assignedSlot;for(;t;)e.push(t),t=t.assignedSlot;return e}importNode(e,t){return(this.node instanceof Document?this.node:this.node.ownerDocument).importNode(e,t)}getEffectiveChildNodes(){return hr.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),n=[];for(let i,r=0,s=t.length;r<s&&(i=t[r]);r++)i.nodeType===Node.ELEMENT_NODE&&vr(i,e)&&n.push(i);return n}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}class _r{constructor(e){this.event=e}get rootTarget(){return this.event.composedPath()[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}yr.prototype.cloneNode,yr.prototype.appendChild,yr.prototype.insertBefore,yr.prototype.removeChild,yr.prototype.replaceChild,yr.prototype.setAttribute,yr.prototype.removeAttribute,yr.prototype.querySelector,yr.prototype.querySelectorAll,yr.prototype.parentNode,yr.prototype.firstChild,yr.prototype.lastChild,yr.prototype.nextSibling,yr.prototype.previousSibling,yr.prototype.firstElementChild,yr.prototype.lastElementChild,yr.prototype.nextElementSibling,yr.prototype.previousElementSibling,yr.prototype.childNodes,yr.prototype.children,yr.prototype.classList,yr.prototype.textContent,yr.prototype.innerHTML,function(e,t){for(let n=0;n<t.length;n++){let i=t[n];e[i]=function(){return this.node[i].apply(this.node,arguments)}}}(yr.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),function(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},configurable:!0})}}(yr.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},set:function(e){this.node[i]=e},configurable:!0})}}(yr.prototype,["textContent","innerHTML"]);const br=function(e){if(!(e=e||document).__domApi){let t;t=e instanceof Event?new _r(e):new yr(e),e.__domApi=t}return e.__domApi};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let wr=window.ShadyCSS;const zr=At(e=>{const t=Zi(Fi(ni(e))),n={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class i extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this._applyListeners()}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,n,i){t!==n&&(super.attributeChangedCallback(e,t,n,i),this.attributeChanged(e,t,n))}attributeChanged(e,t,n){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(e.__hasRegisterFinished=!0,this._registered()),super._initializeProperties(),this.root=this,this.created()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,n){this._propertyToAttribute(e,t,n)}serializeValueToAttribute(e,t,n){this._valueToNodeAttribute(n||this,e,t)}extend(e,t){if(!e||!t)return e||t;let n=Object.getOwnPropertyNames(t);for(let i,r=0;r<n.length&&(i=n[r]);r++){let n=Object.getOwnPropertyDescriptor(t,i);n&&Object.defineProperty(e,i,n)}return e}mixin(e,t){for(let n in t)e[n]=t[n];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,n){n=n||{},t=null==t?{}:t;let i=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=t,(n.node||this).dispatchEvent(i),i}listen(e,t,n){e=e||this;let i=this.__boundListeners||(this.__boundListeners=new WeakMap),r=i.get(e);r||(r={},i.set(e,r));let s=t+n;r[s]||(r[s]=this._addMethodEventListenerToNode(e,t,n,this))}unlisten(e,t,n){e=e||this;let i=this.__boundListeners&&this.__boundListeners.get(e),r=t+n,s=i&&i[r];s&&(this._removeEventListenerFromNode(e,t,s),i[r]=null)}setScrollDirection(e,t){Ni(t||this,n[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=this.getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){window.ShadyDOM&&this.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return br(this).getEffectiveChildNodes()}queryDistributedElements(e){return br(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let n,i=0;n=e[i];i++)n.nodeType!==Node.COMMENT_NODE&&t.push(n.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?br(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){return this!==e&&this.contains(e)&&this.getRootNode()===e.getRootNode()}isLocalDescendant(e){return this.root===e.getRootNode()}scopeSubtree(e,t){}getComputedStyleValue(e){return wr.getComputedStyleValue(this,e)}debounce(e,t,n){return this._debouncers=this._debouncers||{},this._debouncers[e]=ii.debounce(this._debouncers[e],n>0?hn.after(n):pn,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?hn.run(e.bind(this),t):~pn.run(e.bind(this))}cancelAsync(e){e<0?pn.cancel(~e):hn.cancel(e)}create(e,t){let n=document.createElement(e);if(t)if(n.setProperties)n.setProperties(t);else for(let e in t)n[e]=t[e];return n}elementMatches(e,t){return vr(t||this,e)}toggleAttribute(e,t){let n=this;return 3===arguments.length&&(n=arguments[2]),1==arguments.length&&(t=!n.hasAttribute(e)),t?(n.setAttribute(e,""),!0):(n.removeAttribute(e),!1)}toggleClass(e,t,n){n=n||this,1==arguments.length&&(t=!n.classList.contains(e)),t?n.classList.add(e):n.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,n,i){i=i||this,this.transform("translate3d("+e+","+t+","+n+")",i)}arrayDelete(e,t){let n;if(Array.isArray(e)){if((n=e.indexOf(t))>=0)return e.splice(n,1)}else{if((n=Gt(this,e).indexOf(t))>=0)return this.splice(e,n,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return i.prototype.is="",i});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let xr={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0};function Sr(e,t){if(!e)return t=t;t=zr(t),Array.isArray(e)||(e=[e]);let n=t.prototype.behaviors;return t=function e(t,n){for(let i=0;i<t.length;i++){let r=t[i];r&&(n=Array.isArray(r)?e(r,n):kr(r,n))}return n}(e=function e(t,n,i){n=n||[];for(let r=t.length-1;r>=0;r--){let s=t[r];s?Array.isArray(s)?e(s,n):n.indexOf(s)<0&&(!i||i.indexOf(s)<0)&&n.unshift(s):console.warn("behavior is null, check for missing or 404 import")}return n}(e,null,n),t),n&&(e=n.concat(e)),t.prototype.behaviors=e,t}function kr(e,t){class n extends t{static get properties(){return e.properties}static get observers(){return e.observers}created(){super.created(),e.created&&e.created.call(this)}_registered(){super._registered(),e.beforeRegister&&e.beforeRegister.call(Object.getPrototypeOf(this)),e.registered&&e.registered.call(Object.getPrototypeOf(this))}_applyListeners(){if(super._applyListeners(),e.listeners)for(let t in e.listeners)this._addMethodEventListenerToNode(this,t,e.listeners[t])}_ensureAttributes(){if(e.hostAttributes)for(let t in e.hostAttributes)this._ensureAttribute(t,e.hostAttributes[t]);super._ensureAttributes()}ready(){super.ready(),e.ready&&e.ready.call(this)}attached(){super.attached(),e.attached&&e.attached.call(this)}detached(){super.detached(),e.detached&&e.detached.call(this)}attributeChanged(t,n,i){super.attributeChanged(t,n,i),e.attributeChanged&&e.attributeChanged.call(this,t,n,i)}}n.generatedFrom=e;for(let t in e)if(!(t in xr)){let i=Object.getOwnPropertyDescriptor(e,t);i&&Object.defineProperty(n.prototype,t,i)}return n}const Mr=function(e){let t;return t="function"==typeof e?e:Mr.Class(e),customElements.define(t.is,t),t};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Cr(e,t,n,i,r){let s;r&&(s="object"==typeof n&&null!==n)&&(i=e.__dataTemp[t]);let o=i!==n&&(i==i||n==n);return s&&o&&(e.__dataTemp[t]=n),o}Mr.Class=function(e,t){e||console.warn("Polymer's Class function requires `info` argument");const n=e.behaviors?Sr(e.behaviors,HTMLElement):zr(HTMLElement),i=kr(e,t?t(n):n);return i.is=e.is,i};const Ar=At(e=>{return class extends e{_shouldPropertyChange(e,t,n){return Cr(this,e,t,n,!0)}}}),Er=At(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,n){return Cr(this,e,t,n,this.mutableData)}}});Ar._mutablePropertyChange=Cr;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Lr=null;function Tr(){return Lr}Tr.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Tr,writable:!0}});const Or=Xn(Tr),Hr=Ar(Or);const Pr=Xn(class{});class Nr extends Pr{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=this.children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let n=this.__templatizeOptions;(e&&n.instanceProps||!n.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,n){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,n(e)});else{let i=this.__dataHost.__dataHost;i&&i._addEventListenerToNode(e,t,n)}}_showHideChildren(e){let t=this.children;for(let n=0;n<t.length;n++){let i=t[n];if(Boolean(e)!=Boolean(i.__hideTemplateChildren__))if(i.nodeType===Node.TEXT_NODE)e?(i.__polymerTextContent__=i.textContent,i.textContent=""):i.textContent=i.__polymerTextContent__;else if("slot"===i.localName)if(e)i.__polymerReplaced__=document.createComment("hidden-slot"),i.parentNode.replaceChild(i.__polymerReplaced__,i);else{const e=i.__polymerReplaced__;e&&e.parentNode.replaceChild(i,e)}else i.style&&(e?(i.__polymerDisplay__=i.style.display,i.style.display="none"):i.style.display=i.__polymerDisplay__);i.__hideTemplateChildren__=e,i._showHideChildren&&i._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,n){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=n:super._setUnmanagedPropertyToNode(e,t,n)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}Nr.prototype.__dataHost,Nr.prototype.__templatizeOptions,Nr.prototype._methodHost,Nr.prototype.__templatizeOwner,Nr.prototype.__hostProps;const Vr=Ar(Nr);function Ir(e){let t=e.__dataHost;return t&&t._methodHost||t}function Rr(e,t,n){let i=n.mutableData?Vr:Nr,r=class extends i{};return r.prototype.__templatizeOptions=n,r.prototype._bindTemplate(e),function(e,t,n,i){let r=n.hostProps||{};for(let t in i.instanceProps){delete r[t];let n=i.notifyInstanceProp;n&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:$r(t,n)})}if(i.forwardHostProp&&t.__dataHost)for(let t in r)e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,n){e.__dataHost._setPendingPropertyOrPath("_host_"+t,n[t],!0,!0)}})}(r,e,t,n),r}function Dr(e,t,n){let i=n.forwardHostProp;if(i){let r=t.templatizeTemplateClass;if(!r){let e=n.mutableData?Hr:Or;r=t.templatizeTemplateClass=class extends e{};let s=t.hostProps;for(let e in s)r.prototype._addPropertyEffect("_host_"+e,r.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:Br(e,i)}),r.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){Lr=e,Object.setPrototypeOf(e,t.prototype),new t,Lr=null}(e,r),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function Br(e,t){return function(e,n,i){t.call(e.__templatizeOwner,n.substring("_host_".length),i[n])}}function $r(e,t){return function(e,n,i){t.call(e.__templatizeOwner,e,n,i[n])}}function Fr(e,t,n){if(kt&&!Ir(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(n=n||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let i=(t?t.constructor:Nr)._parseTemplate(e),r=i.templatizeInstanceClass;r||(r=Rr(e,i,n),i.templatizeInstanceClass=r),Dr(e,i,n);let s=class extends r{};return s.prototype._methodHost=Ir(e),s.prototype.__dataHost=e,s.prototype.__templatizeOwner=t,s.prototype.__hostProps=i.hostProps,s=s}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const jr=Fi(Er(Xn(HTMLElement)));customElements.define("dom-bind",class extends jr{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),kt)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){this.parentNode.insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class Ur{constructor(e){this.value=e.toString()}toString(){return this.value}}function Yr(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof Ur)return function(e){if(e instanceof Ur)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}const Kr=function(e,...t){const n=document.createElement("template");return n.innerHTML=t.reduce((t,n,i)=>t+Yr(n)+e[i+1],e[0]),n},qr=ni(HTMLElement),Wr=Er(qr);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class Jr extends Wr{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let e=this.parentNode;for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=Fr(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let n=this.__instances;for(let i,r=0;r<n.length&&(i=n[r]);r++)i.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,n){if(function(e,t){return e===t||Kt(e,t)||qt(e,t)}(this.as,t)){let i=e[this.itemsIndexAs];t==this.as&&(this.items[i]=n);let r=Wt(this.as,"items."+i,t);this.notifyPath(r,n)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,n=this.__getMethodHost();return function(){return n[t].apply(n,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let n=0;n<t.length;n++)0===e.indexOf(t[n])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=ii.debounce(this.__renderDebouncer,t>0?hn.after(t):pn,e.bind(this)),pr(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),fr()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=n;this.__filterFn&&(t=t.filter((t,n,i)=>this.__filterFn(e[t],n,i))),this.__sortFn&&t.sort((t,n)=>this.__sortFn(e[t],e[n]));const n=this.__itemsIdxToInstIdx={};let i=0;const r=Math.min(t.length,this.__limit);for(;i<r;i++){let r=this.__instances[i],s=t[i],o=e[s];n[s]=i,r?(r._setPendingProperty(this.as,o),r._setPendingProperty(this.indexAs,i),r._setPendingProperty(this.itemsIndexAs,s),r._flushProperties()):this.__insertInstance(o,i,s)}for(let e=this.__instances.length-1;e>=i;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];for(let e=0;e<t.children.length;e++){let n=t.children[e];t.root.appendChild(n)}return t}__attachInstance(e,t){let n=this.__instances[e];t.insertBefore(n.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,n){let i={};return i[this.as]=e,i[this.indexAs]=t,i[this.itemsIndexAs]=n,new this.__ctor(i)}__insertInstance(e,t,n){let i=this.__pool.pop();i?(i._setPendingProperty(this.as,e),i._setPendingProperty(this.indexAs,t),i._setPendingProperty(this.itemsIndexAs,n),i._flushProperties()):i=this.__stampInstance(e,t,n);let r=this.__instances[t+1],s=r?r.children[0]:this;return this.parentNode.insertBefore(i.root,s),this.__instances[t]=i,i}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let n=e.slice(6),i=n.indexOf("."),r=i<0?n:n.substring(0,i);if(r==parseInt(r,10)){let e=i<0?"":n.substring(i+1);this.__handleObservedPaths(e);let s=this.__itemsIdxToInstIdx[r],o=this.__instances[s];if(o){let n=this.as+(e?"."+e:"");o._setPendingPropertyOrPath(n,t,!1,!0),o._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return function(e,t){let n;for(;t;)if(n=t.__templatizeInstance){if(n.__dataHost==e)return n;t=n.__dataHost}else t=t.parentNode;return null}(this.template,e)}}customElements.define(Jr.is,Jr);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class Qr extends qr{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=ii.debounce(this.__renderDebouncer,pn,()=>this.__render()),pr(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback(),this.parentNode&&(this.parentNode.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||this.parentNode.host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){fr()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=this.parentNode;if(e){if(!this.__ctor){let e=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=Fr(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Yt(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(this.previousSibling!==t[t.length-1])for(let n,i=0;i<t.length&&(n=t[i]);i++)e.insertBefore(n,this)}}else this.__instance=new this.__ctor,e.insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=e[0].parentNode;if(t)for(let n,i=0;i<e.length&&(n=e[i]);i++)t.removeChild(n)}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(Qr.is,Qr);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Gr=At(e=>{let t=ni(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let n=t.path;if("items"==n){let n=t.base||[],i=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),i){let e=ar(n,i);this.__applySplices(e)}this.__lastItems=n,this.__lastMulti=e}else if("items.splices"==t.path)this.__applySplices(t.value.indexSplices);else{let e=n.slice("items.".length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let n=0;n<e.length;n++){let i=e[n];t.forEach((e,n)=>{e<i.index||(e>=i.index+i.removed.length?t.set(n,e+i.addedCount-i.removed.length):t.set(n,-1))});for(let e=0;e<i.addedCount;e++){let n=i.index+e;t.has(this.items[n])&&t.set(this.items[n],n)}}this.__updateLinks();let n=0;t.forEach((e,i)=>{e<0?(this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null,t.delete(i)):n++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths("items."+t,"selected."+e++)})}else this.__selectedMap.forEach(e=>{this.linkPaths("selected","items."+e),this.linkPaths("selectedItem","items."+e)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((n,i)=>{t==e++&&this.deselect(i)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths["items."+e];if(t)return parseInt(t.slice("selected.".length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let n;this.__selectedMap.delete(e),this.multi&&(n=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push("selected",t):this.selected=this.selectedItem=t)}}})(qr);class Xr extends Gr{static get is(){return"array-selector"}}customElements.define(Xr.is,Xr);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Zr=new dt;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,n){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,n){},styleSubtree(e,t){Zr.processStyles(),$e(e,t)},styleElement(e){Zr.processStyles()},styleDocument(e){Zr.processStyles(),$e(document.body,e)},getComputedStyleValue:(e,t)=>Fe(e,t),flushCustomStyles(){},nativeCss:ve,nativeShadow:pe,cssBuild:fe,disableRuntime:me}),window.ShadyCSS.CustomStyleInterface=Zr;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const es="include",ts=window.ShadyCSS.CustomStyleInterface;class ns extends HTMLElement{constructor(){super(),this._style=null,ts.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(es);return t&&(e.removeAttribute(es),e.textContent=function(e){let t=e.trim().split(/\s+/),n="";for(let e=0;e<t.length;e++)n+=jt(t[e]);return n}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}window.customElements.define("custom-style",ns);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const is=zr(HTMLElement).prototype,rs=Kr`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/rs.setAttribute("style","display: none;"),document.head.appendChild(rs.content);var ss=document.createElement("style");ss.textContent="[hidden] { display: none !important; }",document.head.appendChild(ss);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var os=new Set;const as={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(os.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach((function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)}),this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():wt||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=br(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function t(){document.removeEventListener("readystatechange",t),e()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((function(e){e!==this&&e._findParent()}),this):(os.forEach((function(e){e!==this&&e._findParent()}),this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?os.delete(this):os.add(this)}},ls=[as,{listeners:{"app-reset-layout":"_appResetLayoutHandler","iron-resize":"resetLayout"},attached:function(){this.fire("app-reset-layout")},_appResetLayoutHandler:function(e){br(e).path[0]!==this&&(this.resetLayout(),e.stopPropagation())},_updateLayoutStates:function(){console.error("unimplemented")},resetLayout:function(){var e=this._updateLayoutStates.bind(this);this._layoutDebouncer=ii.debounce(this._layoutDebouncer,dn,e),pr(this._layoutDebouncer),this._notifyDescendantResize()},_notifyLayoutChanged:function(){var e=this;requestAnimationFrame((function(){e.fire("app-reset-layout")}))},_notifyDescendantResize:function(){this.isAttached&&this._interestedResizables.forEach((function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)}),this)}}];
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        display: block;
        /**
         * Force app-header-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements (e.g. app-drawer-layout).
         * This could be done using \`isolation: isolate\`, but that's not well supported
         * across browsers.
         */
        position: relative;
        z-index: 0;
      }

      #wrapper ::slotted([slot=header]) {
        @apply --layout-fixed-top;
        z-index: 1;
      }

      #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) {
        height: 100%;
      }

      :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
        position: absolute;
      }

      :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
        position: relative;
      }

      :host([has-scrolling-region]) #wrapper #contentContainer {
        @apply --layout-fit;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
        position: relative;
      }

      :host([fullbleed]) {
        @apply --layout-vertical;
        @apply --layout-fit;
      }

      :host([fullbleed]) #wrapper,
      :host([fullbleed]) #wrapper #contentContainer {
        @apply --layout-vertical;
        @apply --layout-flex;
      }

      #contentContainer {
        /* Create a stacking context here so that all children appear below the header. */
        position: relative;
        z-index: 0;
      }

      @media print {
        :host([has-scrolling-region]) #wrapper #contentContainer {
          overflow-y: visible;
        }
      }

    </style>

    <div id="wrapper" class="initializing">
      <slot id="headerSlot" name="header"></slot>

      <div id="contentContainer">
        <slot></slot>
      </div>
    </div>
`,is:"app-header-layout",behaviors:[ls],properties:{hasScrollingRegion:{type:Boolean,value:!1,reflectToAttribute:!0}},observers:["resetLayout(isAttached, hasScrollingRegion)"],get header(){return br(this.$.headerSlot).getDistributedNodes()[0]},_updateLayoutStates:function(){var e=this.header;if(this.isAttached&&e){this.$.wrapper.classList.remove("initializing"),e.scrollTarget=this.hasScrollingRegion?this.$.contentContainer:this.ownerDocument.documentElement;var t=e.offsetHeight;this.hasScrollingRegion?(e.style.left="",e.style.right=""):requestAnimationFrame(function(){var t=this.getBoundingClientRect(),n=document.documentElement.clientWidth-t.right;e.style.left=t.left+"px",e.style.right=n+"px"}.bind(this));var n=this.$.contentContainer.style;e.fixed&&!e.condenses&&this.hasScrollingRegion?(n.marginTop=t+"px",n.paddingTop=""):(n.paddingTop=t+"px",n.marginTop="")}}});
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const cs={properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(e,t){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),t)if("document"===e)this.scrollTarget=this._doc;else if("string"==typeof e){var n=this.domHost;this.scrollTarget=n&&n.$?n.$[e]:br(this.ownerDocument).querySelector("#"+e)}else this._isValidScrollTarget()&&(this._oldScrollTarget=e,this._toggleScrollListener(this._shouldHaveListener,e))},_scrollHandler:function(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(e){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,e):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=e)},set _scrollLeft(e){this.scrollTarget===this._doc?window.scrollTo(e,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=e)},scroll:function(e,t){var n;"object"==typeof e?(n=e.left,t=e.top):n=e,n=n||0,t=t||0,this.scrollTarget===this._doc?window.scrollTo(n,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=n,this.scrollTarget.scrollTop=t)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(e,t){var n=t===this._doc?window:t;e?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),n.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(n.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(e){this._shouldHaveListener=e,this._toggleScrollListener(e,this.scrollTarget)}},hs={},ds=[cs,{properties:{effects:{type:String},effectsConfig:{type:Object,value:function(){return{}}},disabled:{type:Boolean,reflectToAttribute:!0,value:!1},threshold:{type:Number,value:0},thresholdTriggered:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0}},observers:["_effectsChanged(effects, effectsConfig, isAttached)"],_updateScrollState:function(e){},isOnScreen:function(){return!1},isContentBelow:function(){return!1},_effectsRunFn:null,_effects:null,get _clampedScrollTop(){return Math.max(0,this._scrollTop)},attached:function(){this._scrollStateChanged()},detached:function(){this._tearDownEffects()},createEffect:function(e,t){var n=hs[e];if(!n)throw new ReferenceError(this._getUndefinedMsg(e));var i=this._boundEffect(n,t||{});return i.setUp(),i},_effectsChanged:function(e,t,n){this._tearDownEffects(),e&&n&&(e.split(" ").forEach((function(e){var n;""!==e&&((n=hs[e])?this._effects.push(this._boundEffect(n,t[e])):console.warn(this._getUndefinedMsg(e)))}),this),this._setUpEffect())},_layoutIfDirty:function(){return this.offsetWidth},_boundEffect:function(e,t){t=t||{};var n=parseFloat(t.startsAt||0),i=parseFloat(t.endsAt||1),r=i-n,s=function(){},o=0===n&&1===i?e.run:function(t,i){e.run.call(this,Math.max(0,(t-n)/r),i)};return{setUp:e.setUp?e.setUp.bind(this,t):s,run:e.run?o.bind(this):s,tearDown:e.tearDown?e.tearDown.bind(this):s}},_setUpEffect:function(){this.isAttached&&this._effects&&(this._effectsRunFn=[],this._effects.forEach((function(e){!1!==e.setUp()&&this._effectsRunFn.push(e.run)}),this))},_tearDownEffects:function(){this._effects&&this._effects.forEach((function(e){e.tearDown()})),this._effectsRunFn=[],this._effects=[]},_runEffects:function(e,t){this._effectsRunFn&&this._effectsRunFn.forEach((function(n){n(e,t)}))},_scrollHandler:function(){this._scrollStateChanged()},_scrollStateChanged:function(){if(!this.disabled){var e=this._clampedScrollTop;this._updateScrollState(e),this.threshold>0&&this._setThresholdTriggered(e>=this.threshold)}},_getDOMRef:function(e){console.warn("_getDOMRef","`"+e+"` is undefined")},_getUndefinedMsg:function(e){return"Scroll effect `"+e+"` is undefined. Did you forget to import app-layout/app-scroll-effects/effects/"+e+".html ?"}}];
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        position: relative;
        display: block;
        transition-timing-function: linear;
        transition-property: -webkit-transform;
        transition-property: transform;
      }

      :host::before {
        position: absolute;
        right: 0px;
        bottom: -5px;
        left: 0px;
        width: 100%;
        height: 5px;
        content: "";
        transition: opacity 0.4s;
        pointer-events: none;
        opacity: 0;
        box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
        will-change: opacity;
        @apply --app-header-shadow;
      }

      :host([shadow])::before {
        opacity: 1;
      }

      #background {
        @apply --layout-fit;
        overflow: hidden;
      }

      #backgroundFrontLayer,
      #backgroundRearLayer {
        @apply --layout-fit;
        height: 100%;
        pointer-events: none;
        background-size: cover;
      }

      #backgroundFrontLayer {
        @apply --app-header-background-front-layer;
      }

      #backgroundRearLayer {
        opacity: 0;
        @apply --app-header-background-rear-layer;
      }

      #contentContainer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      :host([disabled]),
      :host([disabled])::after,
      :host([disabled]) #backgroundFrontLayer,
      :host([disabled]) #backgroundRearLayer,
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]),
      :host([silent-scroll])::after,
      :host([silent-scroll]) #backgroundFrontLayer,
      :host([silent-scroll]) #backgroundRearLayer {
        transition: none !important;
      }

      :host([disabled]) ::slotted(app-toolbar:first-of-type),
      :host([disabled]) ::slotted([sticky]),
      /* Silent scrolling should not run CSS transitions */
      :host([silent-scroll]) ::slotted(app-toolbar:first-of-type),
      :host([silent-scroll]) ::slotted([sticky]) {
        transition: none !important;
      }

    </style>
    <div id="contentContainer">
      <slot id="slot"></slot>
    </div>
`,is:"app-header",behaviors:[ds,ls],properties:{condenses:{type:Boolean,value:!1},fixed:{type:Boolean,value:!1},reveals:{type:Boolean,value:!1},shadow:{type:Boolean,reflectToAttribute:!0,value:!1}},observers:["_configChanged(isAttached, condenses, fixed)"],_height:0,_dHeight:0,_stickyElTop:0,_stickyElRef:null,_top:0,_progress:0,_wasScrollingDown:!1,_initScrollTop:0,_initTimestamp:0,_lastTimestamp:0,_lastScrollTop:0,get _maxHeaderTop(){return this.fixed?this._dHeight:this._height+5},get _stickyEl(){if(this._stickyElRef)return this._stickyElRef;for(var e,t=br(this.$.slot).getDistributedNodes(),n=0;e=t[n];n++)if(e.nodeType===Node.ELEMENT_NODE){if(e.hasAttribute("sticky")){this._stickyElRef=e;break}this._stickyElRef||(this._stickyElRef=e)}return this._stickyElRef},_configChanged:function(){this.resetLayout(),this._notifyLayoutChanged()},_updateLayoutStates:function(){if(0!==this.offsetWidth||0!==this.offsetHeight){var e=this._clampedScrollTop,t=0===this._height||0===e,n=this.disabled;this._height=this.offsetHeight,this._stickyElRef=null,this.disabled=!0,t||this._updateScrollState(0,!0),this._mayMove()?this._dHeight=this._stickyEl?this._height-this._stickyEl.offsetHeight:0:this._dHeight=0,this._stickyElTop=this._stickyEl?this._stickyEl.offsetTop:0,this._setUpEffect(),t?this._updateScrollState(e,!0):(this._updateScrollState(this._lastScrollTop,!0),this._layoutIfDirty()),this.disabled=n}},_updateScrollState:function(e,t){if(0!==this._height){var n=0,i=0,r=this._top,s=(this._lastScrollTop,this._maxHeaderTop),o=e-this._lastScrollTop,a=Math.abs(o),l=e>this._lastScrollTop,c=performance.now();if(this._mayMove()&&(i=this._clamp(this.reveals?r+o:e,0,s)),e>=this._dHeight&&(i=this.condenses&&!this.fixed?Math.max(this._dHeight,i):i,this.style.transitionDuration="0ms"),this.reveals&&!this.disabled&&a<100&&((c-this._initTimestamp>300||this._wasScrollingDown!==l)&&(this._initScrollTop=e,this._initTimestamp=c),e>=s))if(Math.abs(this._initScrollTop-e)>30||a>10){l&&e>=s?i=s:!l&&e>=this._dHeight&&(i=this.condenses&&!this.fixed?this._dHeight:0);var h=o/(c-this._lastTimestamp);this.style.transitionDuration=this._clamp((i-r)/h,0,300)+"ms"}else i=this._top;n=0===this._dHeight?e>0?1:0:i/this._dHeight,t||(this._lastScrollTop=e,this._top=i,this._wasScrollingDown=l,this._lastTimestamp=c),(t||n!==this._progress||r!==i||0===e)&&(this._progress=n,this._runEffects(n,i),this._transformHeader(i))}},_mayMove:function(){return this.condenses||!this.fixed},willCondense:function(){return this._dHeight>0&&this.condenses},isOnScreen:function(){return 0!==this._height&&this._top<this._height},isContentBelow:function(){return 0===this._top?this._clampedScrollTop>0:this._clampedScrollTop-this._maxHeaderTop>=0},_transformHeader:function(e){this.translate3d(0,-e+"px",0),this._stickyEl&&this.translate3d(0,this.condenses&&e>=this._stickyElTop?Math.min(e,this._dHeight)-this._stickyElTop+"px":0,0,this._stickyEl)},_clamp:function(e,t,n){return Math.min(n,Math.max(t,e))},_ensureBgContainers:function(){this._bgContainer||(this._bgContainer=document.createElement("div"),this._bgContainer.id="background",this._bgRear=document.createElement("div"),this._bgRear.id="backgroundRearLayer",this._bgContainer.appendChild(this._bgRear),this._bgFront=document.createElement("div"),this._bgFront.id="backgroundFrontLayer",this._bgContainer.appendChild(this._bgFront),br(this.root).insertBefore(this._bgContainer,this.$.contentContainer))},_getDOMRef:function(e){switch(e){case"backgroundFrontLayer":return this._ensureBgContainers(),this._bgFront;case"backgroundRearLayer":return this._ensureBgContainers(),this._bgRear;case"background":return this._ensureBgContainers(),this._bgContainer;case"mainTitle":return br(this).querySelector("[main-title]");case"condensedTitle":return br(this).querySelector("[condensed-title]")}return null},getScrollState:function(){return{progress:this._progress,top:this._top}}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>

      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
        height: 64px;
        padding: 0 16px;
        pointer-events: none;
        font-size: var(--app-toolbar-font-size, 20px);
      }

      :host ::slotted(*) {
        pointer-events: auto;
      }

      :host ::slotted(paper-icon-button) {
        /* paper-icon-button/issues/33 */
        font-size: 0;
      }

      :host ::slotted([main-title]),
      :host ::slotted([condensed-title]) {
        pointer-events: none;
        @apply --layout-flex;
      }

      :host ::slotted([bottom-item]) {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
      }

      :host ::slotted([top-item]) {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      }

      :host ::slotted([spacer]) {
        margin-left: 64px;
      }
    </style>

    <slot></slot>
`,is:"app-toolbar"});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class ps{constructor(e){ps[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return ps.types[e]&&ps.types[e][t]}set value(e){var t=this.type,n=this.key;t&&n&&(t=ps.types[t]=ps.types[t]||{},null==e?delete t[n]:t[n]=e)}get list(){if(this.type){var e=ps.types[this.type];return e?Object.keys(e).map((function(e){return us[this.type][e]}),this):[]}}byKey(e){return this.key=e,this.value}}ps[" "]=function(){},ps.types={};var us=ps.types;Mr({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,n){var i=new ps({type:e,key:t});return void 0!==n&&n!==i.value?i.value=n:this.value!==i.value&&(this.value=i.value),i},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new ps({type:this.type,key:e}).value}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:is.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(e){var t=(e||"").split(":");this._iconName=t.pop(),this._iconsetName=t.pop()||this._DEFAULT_ICONSET,this._updateIcon()},_srcChanged:function(e){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){this._usesIconset()?(this._img&&this._img.parentNode&&br(this.root).removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&this._meta&&(this._iconset=this._meta.byKey(this._iconsetName),this._iconset?(this._iconset.applyIcon(this,this._iconName,this.theme),this.unlisten(window,"iron-iconset-added","_updateIcon")):this.listen(window,"iron-iconset-added","_updateIcon"))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,br(this.root).appendChild(this._img))}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const fs=Kr`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;fs.setAttribute("style","display: none;"),document.head.appendChild(fs.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const gs=Kr`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;gs.setAttribute("style","display: none;"),document.head.appendChild(gs.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ms={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var vs={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},ys={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},_s={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},bs=/[a-z0-9*]/,ws=/U\+/,zs=/^arrow/,xs=/^space(bar)?/,Ss=/^escape$/;function ks(e,t){var n="";if(e){var i=e.toLowerCase();" "===i||xs.test(i)?n="space":Ss.test(i)?n="esc":1==i.length?t&&!bs.test(i)||(n=i):n=zs.test(i)?i.replace("arrow",""):"multiply"==i?"*":i}return n}function Ms(e,t){return e.key?ks(e.key,t):e.detail&&e.detail.key?ks(e.detail.key,t):(n=e.keyIdentifier,i="",n&&(n in vs?i=vs[n]:ws.test(n)?(n=parseInt(n.replace("U+","0x"),16),i=String.fromCharCode(n).toLowerCase()):i=n.toLowerCase()),i||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):ys[e]),t}(e.keyCode)||"");var n,i}function Cs(e,t){return Ms(t,e.hasModifiers)===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey)}function As(e){return e.trim().split(" ").map((function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce((function(e,t){var n=t.split(":"),i=n[0],r=n[1];return i in _s?(e[_s[i]]=!0,e.hasModifiers=!0):(e.key=i,e.event=r||"keydown"),e}),{combo:e.split(":").shift()})}(e)}))}const Es={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var n=As(t),i=0;i<n.length;++i)if(Cs(n[i],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map((function(e){return e.keyBindings}));return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach((function(e){for(var t in e)this._addKeyBinding(t,e[t])}),this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort((function(e,t){var n=e[0].hasModifiers;return n===t[0].hasModifiers?0:n?-1:1}))},_addKeyBinding:function(e,t){As(e).forEach((function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach((function(e){var t=this._keyBindings[e],n=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,n]),this.keyEventTarget.addEventListener(e,n)}),this)},_unlistenKeyEventListeners:function(){for(var e,t,n,i;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],n=e[1],i=e[2],t.removeEventListener(n,i)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var n=0;n<e.length;n++){var i=e[n][0],r=e[n][1];if(Cs(i,t)&&(this._triggerKeyHandler(i,r,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,n){var i=Object.create(e);i.keyboardEvent=n;var r=new CustomEvent(e.event,{detail:i,cancelable:!0});this[t].call(this,r),r.defaultPrevented&&n.preventDefault()}},Ls={properties:{pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},toggles:{type:Boolean,value:!1,reflectToAttribute:!0},active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pointerDown:{type:Boolean,readOnly:!0,value:!1},receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){this.toggles?this._userActivate(!this.active):this.active=!1},_focusChanged:function(e){this._detectKeyboardFocus(e),e||this._setPressed(!1)},_detectKeyboardFocus:function(e){this._setReceivedFocusFromKeyboard(!this.pointerDown&&e)},_userActivate:function(e){this.active!==e&&(this.active=e,this.fire("change"))},_downHandler:function(e){this._setPointerDown(!0),this._setPressed(!0),this._setReceivedFocusFromKeyboard(!1)},_upHandler:function(){this._setPointerDown(!1),this._setPressed(!1)},_spaceKeyDownHandler:function(e){var t=e.detail.keyboardEvent,n=br(t).localTarget;this.isLightDescendant(n)||(t.preventDefault(),t.stopImmediatePropagation(),this._setPressed(!0))},_spaceKeyUpHandler:function(e){var t=e.detail.keyboardEvent,n=br(t).localTarget;this.isLightDescendant(n)||(this.pressed&&this._asyncClick(),this._setPressed(!1))},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(e){this._changedButtonState()},_ariaActiveAttributeChanged:function(e,t){t&&t!=e&&this.hasAttribute(t)&&this.removeAttribute(t)},_activeChanged:function(e,t){this.toggles?this.setAttribute(this.ariaActiveAttribute,e?"true":"false"):this.removeAttribute(this.ariaActiveAttribute),this._changedButtonState()},_controlStateChanged:function(){this.disabled?this._setPressed(!1):this._changedButtonState()},_changedButtonState:function(){this._buttonStateChanged&&this._buttonStateChanged()}},Ts=[Es,Ls];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Os={distance:function(e,t,n,i){var r=e-n,s=t-i;return Math.sqrt(r*r+s*s)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};function Hs(e){this.element=e,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}function Ps(e){this.element=e,this.color=window.getComputedStyle(e).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),br(this.waveContainer).appendChild(this.wave),this.resetInteractionState()}Hs.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function(e,t){var n=Os.distance(e,t,0,0),i=Os.distance(e,t,this.width,0),r=Os.distance(e,t,0,this.height),s=Os.distance(e,t,this.width,this.height);return Math.max(n,i,r,s)}},Ps.MAX_RADIUS=300,Ps.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var e;return this.mouseDownStart?(e=Os.now()-this.mouseDownStart,this.mouseUpStart&&(e-=this.mouseUpElapsed),e):0},get mouseUpElapsed(){return this.mouseUpStart?Os.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var e=this.containerMetrics.width*this.containerMetrics.width,t=this.containerMetrics.height*this.containerMetrics.height,n=1.1*Math.min(Math.sqrt(e+t),Ps.MAX_RADIUS)+5,i=1.1-n/Ps.MAX_RADIUS*.2,r=this.mouseInteractionSeconds/i,s=n*(1-Math.pow(80,-r));return Math.abs(s)},get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity},get outerOpacity(){var e=.3*this.mouseUpElapsedSeconds,t=this.opacity;return Math.max(0,Math.min(e,t))},get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,Ps.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,Ps.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))},get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart},get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new Hs(this.element)},draw:function(){var e,t,n;this.wave.style.opacity=this.opacity,e=this.radius/(this.containerMetrics.size/2),t=this.xNow-this.containerMetrics.width/2,n=this.yNow-this.containerMetrics.height/2,this.waveContainer.style.webkitTransform="translate("+t+"px, "+n+"px)",this.waveContainer.style.transform="translate3d("+t+"px, "+n+"px, 0)",this.wave.style.webkitTransform="scale("+e+","+e+")",this.wave.style.transform="scale3d("+e+","+e+",1)"},downAction:function(e){var t=this.containerMetrics.width/2,n=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=Os.now(),this.center?(this.xStart=t,this.yStart=n,this.slideDistance=Os.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=e?e.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=e?e.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=t,this.yEnd=n,this.slideDistance=Os.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=this.containerMetrics.size+"px",this.waveContainer.style.height=this.containerMetrics.size+"px"},upAction:function(e){this.isMouseDown&&(this.mouseUpStart=Os.now())},remove:function(){br(this.waveContainer.parentNode).removeChild(this.waveContainer)}},Mr({_template:Kr`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,is:"paper-ripple",behaviors:[Es],properties:{initialOpacity:{type:Number,value:.25},opacityDecayVelocity:{type:Number,value:.8},recenters:{type:Boolean,value:!1},center:{type:Boolean,value:!1},ripples:{type:Array,value:function(){return[]}},animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function(){11==this.parentNode.nodeType?this.keyEventTarget=br(this).getOwnerRoot().host:this.keyEventTarget=this.parentNode;var e=this.keyEventTarget;this.listen(e,"up","uiUpAction"),this.listen(e,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction"),this.unlisten(this.keyEventTarget,"down","uiDownAction"),this.keyEventTarget=null},get shouldKeepAnimating(){for(var e=0;e<this.ripples.length;++e)if(!this.ripples[e].isAnimationComplete)return!0;return!1},simulatedRipple:function(){this.downAction(null),this.async((function(){this.upAction()}),1)},uiDownAction:function(e){this.noink||this.downAction(e)},downAction:function(e){this.holdDown&&this.ripples.length>0||(this.addRipple().downAction(e),this._animating||(this._animating=!0,this.animate()))},uiUpAction:function(e){this.noink||this.upAction(e)},upAction:function(e){this.holdDown||(this.ripples.forEach((function(t){t.upAction(e)})),this._animating=!0,this.animate())},onAnimationComplete:function(){this._animating=!1,this.$.background.style.backgroundColor=null,this.fire("transitionend")},addRipple:function(){var e=new Ps(this);return br(this.$.waves).appendChild(e.waveContainer),this.$.background.style.backgroundColor=e.color,this.ripples.push(e),this._setAnimating(!0),e},removeRipple:function(e){var t=this.ripples.indexOf(e);t<0||(this.ripples.splice(t,1),e.remove(),this.ripples.length||this._setAnimating(!1))},animate:function(){if(this._animating){var e,t;for(e=0;e<this.ripples.length;++e)(t=this.ripples[e]).draw(),this.$.background.style.opacity=t.outerOpacity,t.isOpacityFullyDecayed&&!t.isRestingAtMaxRadius&&this.removeRipple(t);this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this._boundAnimate):this.onAnimationComplete()}},animateRipple:function(){return this.animate()},_onEnterKeydown:function(){this.uiDownAction(),this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(e,t){void 0!==t&&(e?this.downAction():this.upAction())}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Ns={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){this.focused&&this.ensureRipple()},_downHandler:function(e){Ls._downHandler.call(this,e),this.pressed&&this.ensureRipple(e)},ensureRipple:function(e){if(!this.hasRipple()){this._ripple=this._createRipple(),this._ripple.noink=this.noink;var t=this._rippleContainer||this.root;if(t&&br(t).appendChild(this._ripple),e){var n=br(this._rippleContainer||this),i=br(e).rootTarget;n.deepContains(i)&&this._ripple.uiDownAction(e)}}},getRipple:function(){return this.ensureRipple(),this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){return document.createElement("paper-ripple")},_noinkChanged:function(e){this.hasRipple()&&(this._ripple.noink=e)}},Vs={observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function(e){e&&this.ensureRipple(),this.hasRipple()&&(this._ripple.holdDown=e)},_createRipple:function(){var e=Ns._createRipple();return e.id="ink",e.setAttribute("center",""),e.classList.add("circle"),e}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({is:"paper-icon-button",_template:Kr`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;

        width: 40px;
        height: 40px;

        /*
          NOTE: Both values are needed, since some phones require the value to
          be \`transparent\`.
        */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        /* Because of polymer/2558, this style has lower specificity than * */
        box-sizing: border-box !important;

        @apply --paper-icon-button;
      }

      :host #ink {
        color: var(--paper-icon-button-ink-color, var(--primary-text-color));
        opacity: 0.6;
      }

      :host([disabled]) {
        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));
        pointer-events: none;
        cursor: auto;

        @apply --paper-icon-button-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:hover) {
        @apply --paper-icon-button-hover;
      }

      iron-icon {
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
      }
    </style>

    <iron-icon id="icon" src="[[src]]" icon="[[icon]]"
               alt$="[[alt]]"></iron-icon>
  `,hostAttributes:{role:"button",tabindex:"0"},behaviors:[[Ts,ms,Ns,Vs]],registered:function(){this._template.setAttribute("strip-whitespace","")},properties:{src:{type:String},icon:{type:String},alt:{type:String,observer:"_altChanged"}},_altChanged:function(e,t){var n=this.getAttribute("aria-label");n&&t!=n||this.setAttribute("aria-label",e)}}),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:!1},useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function(){this._meta=new ps({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){return this._icons=this._createIconMap(),Object.keys(this._icons).map((function(e){return this.name+":"+e}),this)},applyIcon:function(e,t){this.removeIcon(e);var n=this._cloneIcon(t,this.rtlMirroring&&this._targetIsRTL(e));if(n){var i=br(e.root||e);return i.insertBefore(n,i.childNodes[0]),e._svgIcon=n}return null},removeIcon:function(e){e._svgIcon&&(br(e.root||e).removeChild(e._svgIcon),e._svgIcon=null)},_targetIsRTL:function(e){if(null==this.__targetIsRTL)if(this.useGlobalRtlAttribute){var t=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===t.getAttribute("dir")}else e&&e.nodeType!==Node.ELEMENT_NODE&&(e=e.host),this.__targetIsRTL=e&&"rtl"===window.getComputedStyle(e).direction;return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null,this._meta.key=this.name,this._meta.value=this,this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var e=Object.create(null);return br(this).querySelectorAll("[id]").forEach((function(t){e[t.id]=t})),e},_cloneIcon:function(e,t){return this._icons=this._icons||this._createIconMap(),this._prepareSvgClone(this._icons[e],this.size,t)},_prepareSvgClone:function(e,t,n){if(e){var i=e.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),s=i.getAttribute("viewBox")||"0 0 "+t+" "+t,o="pointer-events: none; display: block; width: 100%; height: 100%;";return n&&i.hasAttribute("mirror-in-rtl")&&(o+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"),r.setAttribute("viewBox",s),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false"),r.style.cssText=o,r.appendChild(i).removeAttribute("id"),r}return null}});
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Is=Kr`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(Is.content);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Rs=Kr`<iron-iconset-svg name="av" size="24">
<svg><defs>
<g id="add-to-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"></path></g>
<g id="airplay"><path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="album"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g>
<g id="art-track"><path d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"></path></g>
<g id="av-timer"><path d="M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"></path></g>
<g id="branding-watermark"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-9v-6h9v6z"></path></g>
<g id="call-to-action"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"></path></g>
<g id="closed-caption"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"></path></g>
<g id="equalizer"><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path></g>
<g id="explicit"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"></path></g>
<g id="fast-forward"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></g>
<g id="fast-rewind"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></g>
<g id="featured-play-list"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"></path></g>
<g id="featured-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"></path></g>
<g id="fiber-dvr"><path d="M17.5 10.5h2v1h-2zm-13 0h2v3h-2zM21 3H3c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h18c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zM8 13.5c0 .85-.65 1.5-1.5 1.5H3V9h3.5c.85 0 1.5.65 1.5 1.5v3zm4.62 1.5h-1.5L9.37 9h1.5l1 3.43 1-3.43h1.5l-1.75 6zM21 11.5c0 .6-.4 1.15-.9 1.4L21 15h-1.5l-.85-2H17.5v2H16V9h3.5c.85 0 1.5.65 1.5 1.5v1z"></path></g>
<g id="fiber-manual-record"><circle cx="12" cy="12" r="8"></circle></g>
<g id="fiber-new"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM8.5 15H7.3l-2.55-3.5V15H3.5V9h1.25l2.5 3.5V9H8.5v6zm5-4.74H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4v1.26zm7 3.74c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25v5z"></path></g>
<g id="fiber-pin"><path d="M5.5 10.5h2v1h-2zM20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM9 11.5c0 .85-.65 1.5-1.5 1.5h-2v2H4V9h3.5c.85 0 1.5.65 1.5 1.5v1zm3.5 3.5H11V9h1.5v6zm7.5 0h-1.2l-2.55-3.5V15H15V9h1.25l2.5 3.5V9H20v6z"></path></g>
<g id="fiber-smart-record"><g><circle cx="9" cy="12" r="8"></circle><path d="M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z"></path></g></g>
<g id="forward-10"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="forward-30"><path d="M9.6 13.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5zM4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z"></path></g>
<g id="forward-5"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z"></path></g>
<g id="games"><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"></path></g>
<g id="hd"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"></path></g>
<g id="hearing"><path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"></path></g>
<g id="high-quality"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z"></path></g>
<g id="library-add"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="library-books"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path></g>
<g id="library-music"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></g>
<g id="loop"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></path></g>
<g id="mic"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-none"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1.2-9.1c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V4.9zm6.5 6.1c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-off"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path></g>
<g id="movie"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></g>
<g id="music-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z"></path></g>
<g id="new-releases"><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="not-interested"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"></path></g>
<g id="note"><path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z"></path></g>
<g id="pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g>
<g id="pause-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></g>
<g id="pause-circle-outline"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></g>
<g id="play-arrow"><path d="M8 5v14l11-7z"></path></g>
<g id="play-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></g>
<g id="play-circle-outline"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="playlist-add"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"></path></g>
<g id="playlist-add-check"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"></path></g>
<g id="playlist-play"><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path></g>
<g id="queue"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="queue-music"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"></path></g>
<g id="queue-play-next"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z"></path></g>
<g id="radio"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"></path></g>
<g id="recent-actors"><path d="M21 5v14h2V5h-2zm-4 14h2V5h-2v14zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z"></path></g>
<g id="remove-from-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2H8v-2h8z"></path></g>
<g id="repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></g>
<g id="repeat-one"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"></path></g>
<g id="replay"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></g>
<g id="replay-10"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-30"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-2.4 8.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5c0-.1-.1-.2-.1-.3s-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-5"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z"></path></g>
<g id="shuffle"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></g>
<g id="skip-next"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g>
<g id="skip-previous"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g>
<g id="slow-motion-video"><path d="M13.05 9.79L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"></path></g>
<g id="snooze"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z"></path></g>
<g id="sort-by-alpha"><path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"></path></g>
<g id="stop"><path d="M6 6h12v12H6z"></path></g>
<g id="subscriptions"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"></path></g>
<g id="subtitles"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"></path></g>
<g id="surround-sound"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.76 16.24l-1.41 1.41C4.78 16.1 4 14.05 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41C6.59 8.93 6 10.46 6 12s.59 3.07 1.76 4.24zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.66 1.66l-1.41-1.41C17.41 15.07 18 13.54 18 12s-.59-3.07-1.76-4.24l1.41-1.41C19.22 7.9 20 9.95 20 12c0 2.05-.78 4.1-2.34 5.66zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="video-call"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g>
<g id="video-label"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></g>
<g id="video-library"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g>
<g id="videocam"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g>
<g id="videocam-off"><path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"></path></g>
<g id="volume-down"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path></g>
<g id="volume-mute"><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></g>
<g id="volume-off"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></g>
<g id="volume-up"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g>
<g id="web"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>
<g id="web-asset"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(Rs.content),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-flex-auto;

        position: relative;
        padding: 0 12px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;

        @apply --paper-font-common-base;
        @apply --paper-tab;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        height: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-flex-auto;
        @apply --paper-tab-content;
      }

      :host(:not(.iron-selected)) > .tab-content {
        opacity: 0.8;

        @apply --paper-tab-content-unselected;
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;

        @apply --paper-tab-content-focused;
      }

      paper-ripple {
        color: var(--paper-tab-ink, var(--paper-yellow-a100));
      }

      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;

        height: 100%;
      }
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,is:"paper-tab",behaviors:[ms,Ts,Ns],properties:{link:{type:Boolean,value:!1,reflectToAttribute:!0}},hostAttributes:{role:"tab"},listeners:{down:"_updateNoink",tap:"_onTap"},attached:function(){this._updateNoink()},get _parentNoink(){var e=br(this).parentNode;return!!e&&!!e.noink},_updateNoink:function(){this.noink=!!this.noink||!!this._parentNoink},_onTap:function(e){if(this.link){var t=this.queryEffectiveChildren("a");if(!t)return;if(e.target===t)return;t.click()}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Ds=Kr`<iron-iconset-svg name="paper-tabs" size="24">
<svg><defs>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(Ds.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class Bs{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach((function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)}),this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var n=this.selection.indexOf(e);n>=0&&this.selection.splice(n,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const $s={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new Bs(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&br(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=br(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,n=0;t=this.items[n];n++)if(this._valueForItem(t)==e)return n},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var n=e[nn(this.attrForSelected)];return null!=n?n:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return br(e).observeNodes((function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})}))},_activateHandler:function(e){for(var t=e.target,n=this.items;t&&t!=this;){var i=n.indexOf(t);if(i>=0){var r=this._indexToValue(i);return void this._itemActivate(r,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}},Fs={properties:{multi:{type:Boolean,value:!1,observer:"multiChanged"},selectedValues:{type:Array,notify:!0,value:function(){return[]}},selectedItems:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(e){this.multi?this._toggleSelected(e):this.selected=e},multiChanged:function(e){this._selection.multi=e,this._updateSelected()},get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map((function(e){return this._indexToValue(this.indexOf(e))}),this).filter((function(e){return null!=e}),this)):$s._updateAttrForSelected.apply(this)},_updateSelected:function(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)},_selectMulti:function(e){e=e||[];var t=(this._valuesToItems(e)||[]).filter((function(e){return null!=e}));this._selection.clear(t);for(var n=0;n<t.length;n++)this._selection.setItemSelected(t[n],!0);this.fallbackSelection&&!this._selection.get().length&&(this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection))},_selectionChange:function(){var e=this._selection.get();this.multi?(this._setSelectedItems(e),this._setSelectedItem(e.length?e[0]:null)):null!=e?(this._setSelectedItems([e]),this._setSelectedItem(e)):(this._setSelectedItems([]),this._setSelectedItem(null))},_toggleSelected:function(e){var t=this.selectedValues.indexOf(e);t<0?this.push("selectedValues",e):this.splice("selectedValues",t,1)},_valuesToItems:function(e){return null==e?null:e.map((function(e){return this._valueToItem(e)}),this)}},js={properties:{focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],_SEARCH_RESET_TIMEOUT_MS:1e3,_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function(){this._resetTabindices()},select:function(e){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null);var t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._setFocusedItem(t),Fs.select.apply(this,arguments))},_resetTabindices:function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach((function(t){t.setAttribute("tabindex",t===e?"0":"-1"),t.setAttribute("aria-selected",this._selection.isSelected(t))}),this)},_updateMultiselectable:function(e){e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")},_focusWithKeyboardEvent:function(e){if(-1===this._MODIFIER_KEYS.indexOf(e.key)){this.cancelDebouncer("_clearSearchText");for(var t,n=this._searchText||"",i=(n+=(e.key&&1==e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length,r=0;t=this.items[r];r++)if(!t.hasAttribute("disabled")){var s=this.attrForItemTitle||"textContent",o=(t[s]||t.getAttribute(s)||"").trim();if(!(o.length<i)&&o.slice(0,i).toLocaleLowerCase()==n){this._setFocusedItem(t);break}}this._searchText=n,this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)}},_clearSearchText:function(){this._searchText=""},_focusPrevious:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),n=1;n<e+1;n++){var i=this.items[(t-n+e)%e];if(!i.hasAttribute("disabled")){var r=br(i).getOwnerRoot()||document;if(this._setFocusedItem(i),br(r).activeElement==i)return}}},_focusNext:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),n=1;n<e+1;n++){var i=this.items[(t+n)%e];if(!i.hasAttribute("disabled")){var r=br(i).getOwnerRoot()||document;if(this._setFocusedItem(i),br(r).activeElement==i)return}}},_applySelection:function(e,t){t?e.setAttribute("aria-selected","true"):e.setAttribute("aria-selected","false"),$s._applySelection.apply(this,arguments)},_focusedItemChanged:function(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())},_onIronItemsChanged:function(e){e.detail.addedNodes.length&&this._resetTabindices()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");js._shiftTabPressed=!0,this._setFocusedItem(null),this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),js._shiftTabPressed=!1}),1)},_onFocus:function(e){if(!js._shiftTabPressed){var t=br(e).rootTarget;(t===this||void 0===t.tabIndex||this.isLightDescendant(t))&&(this._defaultFocusAsync=this.async((function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null),e?this._setFocusedItem(e):this.items[0]&&this._focusNext()})))}},_onUpKey:function(e){this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onEscKey:function(e){var t=this.focusedItem;t&&t.blur()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down esc")||this._focusWithKeyboardEvent(e),e.stopPropagation()},_activateHandler:function(e){$s._activateHandler.call(this,e),e.stopPropagation()},_disabledChanged:function(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)},_shiftTabPressed:!1};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
if(
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center;

        height: 48px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-tabs;
      }

      :host(:dir(rtl)) {
        @apply --layout-horizontal-reverse;
      }

      #tabsContainer {
        position: relative;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        @apply --layout-flex-auto;
        @apply --paper-tabs-container;
      }

      #tabsContent {
        height: 100%;
        -moz-flex-basis: auto;
        -ms-flex-basis: auto;
        flex-basis: auto;
        @apply --paper-tabs-content;
      }

      #tabsContent.scrollable {
        position: absolute;
        white-space: nowrap;
      }

      #tabsContent:not(.scrollable),
      #tabsContent.scrollable.fit-container {
        @apply --layout-horizontal;
      }

      #tabsContent.scrollable.fit-container {
        min-width: 100%;
      }

      #tabsContent.scrollable.fit-container > ::slotted(*) {
        /* IE - prevent tabs from compressing when they should scroll. */
        -ms-flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
        flex: 1 0 auto;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        cursor: default;
      }

      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 12px;
        margin: 0 4px;
      }

      #selectionBar {
        position: absolute;
        height: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--paper-tabs-selection-bar-color, var(--paper-yellow-a100));
          -webkit-transform: scale(0);
        transform: scale(0);
          -webkit-transform-origin: left center;
        transform-origin: left center;
          transition: -webkit-transform;
        transition: transform;

        @apply --paper-tabs-selection-bar;
      }

      #selectionBar.align-bottom {
        top: 0;
        bottom: auto;
      }

      #selectionBar.expand {
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
      }

      #selectionBar.contract {
        transition-duration: 0.18s;
        transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
      }

      #tabsContent > ::slotted(:not(#selectionBar)) {
        height: 100%;
      }
    </style>

    <paper-icon-button icon="paper-tabs:chevron-left" class$="[[_computeScrollButtonClass(_leftHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onLeftScrollButtonDown" tabindex="-1"></paper-icon-button>

    <div id="tabsContainer" on-track="_scroll" on-down="_down">
      <div id="tabsContent" class$="[[_computeTabsContentClass(scrollable, fitContainer)]]">
        <div id="selectionBar" class$="[[_computeSelectionBarClass(noBar, alignBottom)]]" on-transitionend="_onBarTransitionEnd"></div>
        <slot></slot>
      </div>
    </div>

    <paper-icon-button icon="paper-tabs:chevron-right" class$="[[_computeScrollButtonClass(_rightHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onRightScrollButtonDown" tabindex="-1"></paper-icon-button>
`,is:"paper-tabs",behaviors:[as,[[[$s,Fs],Es,js],{hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(e){this._isRTL?this._focusNext():this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onRightKey:function(e){this._isRTL?this._focusPrevious():this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down left right esc")||this._focusWithKeyboardEvent(e)}}]],properties:{noink:{type:Boolean,value:!1,observer:"_noinkChanged"},noBar:{type:Boolean,value:!1},noSlide:{type:Boolean,value:!1},scrollable:{type:Boolean,value:!1},fitContainer:{type:Boolean,value:!1},disableDrag:{type:Boolean,value:!1},hideScrollButtons:{type:Boolean,value:!1},alignBottom:{type:Boolean,value:!1},selectable:{type:String,value:"paper-tab"},autoselect:{type:Boolean,value:!1},autoselectDelay:{type:Number,value:0},_step:{type:Number,value:10},_holdDelay:{type:Number,value:1},_leftHidden:{type:Boolean,value:!1},_rightHidden:{type:Boolean,value:!1},_previousTab:{type:Object}},hostAttributes:{role:"tablist"},listeners:{"iron-resize":"_onTabSizingChanged","iron-items-changed":"_onTabSizingChanged","iron-select":"_onIronSelect","iron-deselect":"_onIronDeselect"},keyBindings:{"left:keyup right:keyup":"_onArrowKeyup"},created:function(){this._holdJob=null,this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,this._bindDelayedActivationHandler=this._delayedActivationHandler.bind(this),this.addEventListener("blur",this._onBlurCapture.bind(this),!0)},ready:function(){this.setScrollDirection("y",this.$.tabsContainer)},detached:function(){this._cancelPendingActivation()},_noinkChanged:function(e){br(this).querySelectorAll("paper-tab").forEach(e?this._setNoinkAttribute:this._removeNoinkAttribute)},_setNoinkAttribute:function(e){e.setAttribute("noink","")},_removeNoinkAttribute:function(e){e.removeAttribute("noink")},_computeScrollButtonClass:function(e,t,n){return!t||n?"hidden":e?"not-visible":""},_computeTabsContentClass:function(e,t){return e?"scrollable"+(t?" fit-container":""):" fit-container"},_computeSelectionBarClass:function(e,t){return e?"hidden":t?"align-bottom":""},_onTabSizingChanged:function(){this.debounce("_onTabSizingChanged",(function(){this._scroll(),this._tabChanged(this.selectedItem)}),10)},_onIronSelect:function(e){this._tabChanged(e.detail.item,this._previousTab),this._previousTab=e.detail.item,this.cancelDebouncer("tab-changed")},_onIronDeselect:function(e){this.debounce("tab-changed",(function(){this._tabChanged(null,this._previousTab),this._previousTab=null}),1)},_activateHandler:function(){this._cancelPendingActivation(),js._activateHandler.apply(this,arguments)},_scheduleActivation:function(e,t){this._pendingActivationItem=e,this._pendingActivationTimeout=this.async(this._bindDelayedActivationHandler,t)},_delayedActivationHandler:function(){var e=this._pendingActivationItem;this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,e.fire(this.activateEvent,null,{bubbles:!0,cancelable:!0})},_cancelPendingActivation:function(){void 0!==this._pendingActivationTimeout&&(this.cancelAsync(this._pendingActivationTimeout),this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0)},_onArrowKeyup:function(e){this.autoselect&&this._scheduleActivation(this.focusedItem,this.autoselectDelay)},_onBlurCapture:function(e){e.target===this._pendingActivationItem&&this._cancelPendingActivation()},get _tabContainerScrollSize(){return Math.max(0,this.$.tabsContainer.scrollWidth-this.$.tabsContainer.offsetWidth)},_scroll:function(e,t){if(this.scrollable){var n=t&&-t.ddx||0;this._affectScroll(n)}},_down:function(e){this.async((function(){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null)}),1)},_affectScroll:function(e){this.$.tabsContainer.scrollLeft+=e;var t=this.$.tabsContainer.scrollLeft;this._leftHidden=0===t,this._rightHidden=t===this._tabContainerScrollSize},_onLeftScrollButtonDown:function(){this._scrollToLeft(),this._holdJob=setInterval(this._scrollToLeft.bind(this),this._holdDelay)},_onRightScrollButtonDown:function(){this._scrollToRight(),this._holdJob=setInterval(this._scrollToRight.bind(this),this._holdDelay)},_onScrollButtonUp:function(){clearInterval(this._holdJob),this._holdJob=null},_scrollToLeft:function(){this._affectScroll(-this._step)},_scrollToRight:function(){this._affectScroll(this._step)},_tabChanged:function(e,t){if(!e)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(0,0);var n=this.$.tabsContent.getBoundingClientRect(),i=n.width,r=e.getBoundingClientRect(),s=r.left-n.left;if(this._pos={width:this._calcPercent(r.width,i),left:this._calcPercent(s,i)},this.noSlide||null==t)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(this._pos.width,this._pos.left);var o=t.getBoundingClientRect(),a=this.items.indexOf(t),l=this.items.indexOf(e);this.$.selectionBar.classList.add("expand");var c=a<l;this._isRTL&&(c=!c),c?this._positionBar(this._calcPercent(r.left+r.width-o.left,i)-5,this._left):this._positionBar(this._calcPercent(o.left+o.width-r.left,i)-5,this._calcPercent(s,i)+5),this.scrollable&&this._scrollToSelectedIfNeeded(r.width,s)},_scrollToSelectedIfNeeded:function(e,t){var n=t-this.$.tabsContainer.scrollLeft;n<0?this.$.tabsContainer.scrollLeft+=n:(n+=e-this.$.tabsContainer.offsetWidth)>0&&(this.$.tabsContainer.scrollLeft+=n)},_calcPercent:function(e,t){return 100*e/t},_positionBar:function(e,t){e=e||0,t=t||0,this._width=e,this._left=t,this.transform("translateX("+t+"%) scaleX("+e/100+")",this.$.selectionBar)},_onBarTransitionEnd:function(e){var t=this.$.selectionBar.classList;t.contains("expand")?(t.remove("expand"),t.add("contract"),this._positionBar(this._pos.width,this._pos.left)):t.contains("contract")&&t.remove("contract")}}),!window.polymerSkipLoadingFontRoboto){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.crossOrigin="anonymous",e.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(e)}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Us=Kr`<custom-style>
  <style is="custom-style">
    html {

      /* Shared Styles */
      --paper-font-common-base: {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-code: {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-expensive-kerning: {
        text-rendering: optimizeLegibility;
      };

      --paper-font-common-nowrap: {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      };

      /* Material Font Styles */

      --paper-font-display4: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 112px;
        font-weight: 300;
        letter-spacing: -.044em;
        line-height: 120px;
      };

      --paper-font-display3: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 56px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
      };

      --paper-font-display2: {
        @apply --paper-font-common-base;

        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      };

      --paper-font-display1: {
        @apply --paper-font-common-base;

        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      };

      --paper-font-headline: {
        @apply --paper-font-common-base;

        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      };

      --paper-font-title: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      };

      --paper-font-subhead: {
        @apply --paper-font-common-base;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      };

      --paper-font-body2: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-body1: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      };

      --paper-font-caption: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.011em;
        line-height: 20px;
      };

      --paper-font-menu: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-button: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.018em;
        line-height: 24px;
        text-transform: uppercase;
      };

      --paper-font-code2: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      };

      --paper-font-code1: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      };

    }

  </style>
</custom-style>`;Us.setAttribute("style","display: none;"),document.head.appendChild(Us.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Ys=document.createElement("template");Ys.setAttribute("style","display: none;"),Ys.innerHTML="<dom-module id=\"paper-item-shared-styles\">\n  <template>\n    <style>\n      :host, .paper-item {\n        display: block;\n        position: relative;\n        min-height: var(--paper-item-min-height, 48px);\n        padding: 0px 16px;\n      }\n\n      .paper-item {\n        @apply --paper-font-subhead;\n        border:none;\n        outline: none;\n        background: white;\n        width: 100%;\n        text-align: left;\n      }\n\n      :host([hidden]), .paper-item[hidden] {\n        display: none !important;\n      }\n\n      :host(.iron-selected), .paper-item.iron-selected {\n        font-weight: var(--paper-item-selected-weight, bold);\n\n        @apply --paper-item-selected;\n      }\n\n      :host([disabled]), .paper-item[disabled] {\n        color: var(--paper-item-disabled-color, var(--disabled-text-color));\n\n        @apply --paper-item-disabled;\n      }\n\n      :host(:focus), .paper-item:focus {\n        position: relative;\n        outline: 0;\n\n        @apply --paper-item-focused;\n      }\n\n      :host(:focus):before, .paper-item:focus:before {\n        @apply --layout-fit;\n\n        background: currentColor;\n        content: '';\n        opacity: var(--dark-divider-opacity);\n        pointer-events: none;\n\n        @apply --paper-item-focused-before;\n      }\n    </style>\n  </template>\n</dom-module>",document.head.appendChild(Ys.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style include="paper-item-shared-styles"></style>
    <style>
      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-subhead;

        @apply --paper-item;
        @apply --paper-icon-item;
      }

      .content-icon {
        @apply --layout-horizontal;
        @apply --layout-center;

        width: var(--paper-item-icon-width, 56px);
        @apply --paper-item-icon;
      }
    </style>

    <div id="contentIcon" class="content-icon">
      <slot name="item-icon"></slot>
    </div>
    <slot></slot>
`,is:"paper-icon-item",behaviors:[[Ts,ms,{hostAttributes:{role:"option",tabindex:"0"}}]]});var Ks="Documentation Demo Site",qs="installation",Ws=[{category:"installation",icon:"arrow-downward"},{category:"configuration",icon:"create"}],Js=[{category:"developer-tools",icon:"build"}];const Qs=ce`
  app-header {
    position: fixed !important;
    top: 0;
    margin-left: 55px;
    display: block;
    transition-timing-function: linear;
    z-index: 1;
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
  }

  app-toolbar {
    height: 48px !important;
  }

  app-toolbar .iconify {
    margin-left: 16px;
    width: 24px;
    height: 24px;
    z-index: 2;
  }

  app-header,
  app-toolbar {
    background-color: var(--primary-color);
    font-weight: 400;
    color: var(--light-theme-background-color);
  }

  app-header {
    transition: margin-top 0s !important;
    transition: margin-left 0.4s ease-in-out !important;
  }

  paper-tabs {
    --paper-tabs-selection-bar-color: var(--primary-background-color);
    margin-left: 12px;
    text-transform: uppercase;
  }
`,Gs=ce`
  .sidebarBottomItems {
    bottom: 0px;
    padding-bottom: 8px;
    width: 100%;
    position: absolute;
  }

  .menu {
    height: 48px;
    display: flex;
    white-space: nowrap;
    font-weight: 400;
    color: #212121;
    background-color: #fafafa;
    font-size: 20px;
    align-items: center;
    border-bottom: 1px solid var(--light-theme-divider-color);
  }

  paper-listbox a {
    text-decoration: none;
  }

  paper-listbox .iconify {
    margin-left: -5px !important;
  }

  paper-icon-item {
    box-sizing: border-box;
    padding-left: 12px;
    cursor: pointer;
    --paper-item-min-height: 40px;
    width: 48px;
    margin: 4px 8px;
    border-radius: 4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  paper-icon-item:focus:before {
    background: transparent !important;
  }

  .iron-selected ::before {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    content: '';
    opacity: 0.12;
    will-change: opacity;
    border-radius: 4px;
    transition: opacity 15ms linear 0s;
  }

  .item-text {
    text-transform: uppercase;
  }

  paper-listbox .iron-selected {
    color: var(--primary-color);
  }

  paper-listbox .iron-selected .iconify {
    color: var(--primary-color);
  }

  .divider {
    padding: 8px 0px;
  }

  .divider::before {
    content: ' ';
    display: block;
    height: 1px;
    background-color: var(--light-theme-divider-color);
  }

  .sidebar {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 0;
    background: var(--primary-background-color);
    width: 55px;
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;
  }

  .sidebarExpanded {
    margin-left: 254px;
  }

  .sidebarText {
    color: var(--primary-text-color);
    padding-left: 3px;
    padding-bottom: -5px;
    text-align: left;
    margin-top: -37.7px;
    margin-left: 254px;
    margin-bottom: 3px;
    opacity: 0.4;
    cursor: pointer;
  }

  .sidebarBottom {
    margin: 0;
    margin-left: -4px;
  }

  .sidebar .iconify {
    margin-right: 23px;
    margin-left: -5px;
    margin-top: -2px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    color: var(--primary-text-color);
  }
`,Xs=[ce`
  .sidebarBottomItems {
    bottom: 0px;
    width: 100%;
    position: absolute;
  }

  .menu {
    height: 48px;
    display: flex;
    white-space: nowrap;
    font-weight: 400;
    color: var(--primary-text-color);
    background-color: var(--primary-background-color);
    font-size: 20px;
    align-items: center;
    border-bottom: 1px solid var(--light-theme-divider-color);
  }

  .expanded {
    width: 254px !important;
  }

  .sidebar,
  .view {
    transition: all 0.4s ease-in-out;
  }
  .view {
    display: flex;
    margin-left: 55px;
    padding-top: 24px;
    background-color: var(--primary-background-color);
  }

  docs-card {
    width: calc(100% - 254);
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 24px;
  }
`,Qs,Gs];
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style>
      :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
      }

      #baseURIAnchor {
        display: none;
      }

      #sizedImgDiv {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        display: none;
      }

      #img {
        display: block;
        width: var(--iron-image-width, auto);
        height: var(--iron-image-height, auto);
      }

      :host([sizing]) #sizedImgDiv {
        display: block;
      }

      :host([sizing]) #img {
        display: none;
      }

      #placeholder {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        background-color: inherit;
        opacity: 1;

        @apply --iron-image-placeholder;
      }

      #placeholder.faded-out {
        transition: opacity 0.5s linear;
        opacity: 0;
      }
    </style>

    <a id="baseURIAnchor" href="#"></a>
    <div id="sizedImgDiv" role="img" hidden$="[[_computeImgDivHidden(sizing)]]" aria-hidden$="[[_computeImgDivARIAHidden(alt)]]" aria-label$="[[_computeImgDivARIALabel(alt, src)]]"></div>
    <img id="img" alt$="[[alt]]" hidden$="[[_computeImgHidden(sizing)]]" crossorigin$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">
    <div id="placeholder" hidden$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>
`,is:"iron-image",properties:{src:{type:String,value:""},alt:{type:String,value:null},crossorigin:{type:String,value:null},preventLoad:{type:Boolean,value:!1},sizing:{type:String,value:null,reflectToAttribute:!0},position:{type:String,value:"center"},preload:{type:Boolean,value:!1},placeholder:{type:String,value:null,observer:"_placeholderChanged"},fade:{type:Boolean,value:!1},loaded:{notify:!0,readOnly:!0,type:Boolean,value:!1},loading:{notify:!0,readOnly:!0,type:Boolean,value:!1},error:{notify:!0,readOnly:!0,type:Boolean,value:!1},width:{observer:"_widthChanged",type:Number,value:null},height:{observer:"_heightChanged",type:Number,value:null}},observers:["_transformChanged(sizing, position)","_loadStateObserver(src, preventLoad)"],created:function(){this._resolvedSrc=""},_imgOnLoad:function(){this.$.img.src===this._resolveSrc(this.src)&&(this._setLoading(!1),this._setLoaded(!0),this._setError(!1))},_imgOnError:function(){this.$.img.src===this._resolveSrc(this.src)&&(this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",this._setLoading(!1),this._setLoaded(!1),this._setError(!0))},_computePlaceholderHidden:function(){return!this.preload||!this.fade&&!this.loading&&this.loaded},_computePlaceholderClassName:function(){return this.preload&&this.fade&&!this.loading&&this.loaded?"faded-out":""},_computeImgDivHidden:function(){return!this.sizing},_computeImgDivARIAHidden:function(){return""===this.alt?"true":void 0},_computeImgDivARIALabel:function(){return null!==this.alt?this.alt:""===this.src?"":this._resolveSrc(this.src).replace(/[?|#].*/g,"").split("/").pop()},_computeImgHidden:function(){return!!this.sizing},_widthChanged:function(){this.style.width=isNaN(this.width)?this.width:this.width+"px"},_heightChanged:function(){this.style.height=isNaN(this.height)?this.height:this.height+"px"},_loadStateObserver:function(e,t){var n=this._resolveSrc(e);n!==this._resolvedSrc&&(this._resolvedSrc="",this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",""===e||t?(this._setLoading(!1),this._setLoaded(!1),this._setError(!1)):(this._resolvedSrc=n,this.$.img.src=this._resolvedSrc,this.$.sizedImgDiv.style.backgroundImage='url("'+this._resolvedSrc+'")',this._setLoading(!0),this._setLoaded(!1),this._setError(!1)))},_placeholderChanged:function(){this.$.placeholder.style.backgroundImage=this.placeholder?'url("'+this.placeholder+'")':""},_transformChanged:function(){var e=this.$.sizedImgDiv.style,t=this.$.placeholder.style;e.backgroundSize=t.backgroundSize=this.sizing,e.backgroundPosition=t.backgroundPosition=this.sizing?this.position:"",e.backgroundRepeat=t.backgroundRepeat=this.sizing?"no-repeat":""},_resolveSrc:function(e){var t=yt(e,this.$.baseURIAnchor.href);return t.length>=2&&"/"===t[0]&&"/"!==t[1]&&(t=(location.origin||location.protocol+"//"+location.host)+t),t}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Zs=Kr`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;Zs.setAttribute("style","display: none;"),document.head.appendChild(Zs.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const eo=Kr`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;eo.setAttribute("style","display: none;"),document.head.appendChild(eo.content),
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Mr({_template:Kr`
    <style include="paper-material-styles">
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: var(--paper-card-background-color, var(--primary-background-color));
        border-radius: 2px;

        @apply --paper-font-common-base;
        @apply --paper-card;
      }

      /* IE 10 support for HTML5 hidden attr */
      :host([hidden]), [hidden] {
        display: none !important;
      }

      .header {
        position: relative;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        overflow: hidden;

        @apply --paper-card-header;
      }

      .header iron-image {
        display: block;
        width: 100%;
        --iron-image-width: 100%;
        pointer-events: none;

        @apply --paper-card-header-image;
      }

      .header .title-text {
        padding: 16px;
        font-size: 24px;
        font-weight: 400;
        color: var(--paper-card-header-color, #000);

        @apply --paper-card-header-text;
      }

      .header .title-text.over-image {
        position: absolute;
        bottom: 0px;

        @apply --paper-card-header-image-text;
      }

      :host ::slotted(.card-content) {
        padding: 16px;
        position:relative;

        @apply --paper-card-content;
      }

      :host ::slotted(.card-actions) {
        border-top: 1px solid #e8e8e8;
        padding: 5px 16px;
        position:relative;

        @apply --paper-card-actions;
      }

      :host([elevation="1"]) {
        @apply --paper-material-elevation-1;
      }

      :host([elevation="2"]) {
        @apply --paper-material-elevation-2;
      }

      :host([elevation="3"]) {
        @apply --paper-material-elevation-3;
      }

      :host([elevation="4"]) {
        @apply --paper-material-elevation-4;
      }

      :host([elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>

    <div class="header">
      <iron-image hidden\$="[[!image]]" aria-hidden\$="[[_isHidden(image)]]" src="[[image]]" alt="[[alt]]" placeholder="[[placeholderImage]]" preload="[[preloadImage]]" fade="[[fadeImage]]"></iron-image>
      <div hidden\$="[[!heading]]" class\$="title-text [[_computeHeadingClass(image)]]">[[heading]]</div>
    </div>

    <slot></slot>
`,is:"paper-card",properties:{heading:{type:String,value:"",observer:"_headingChanged"},image:{type:String,value:""},alt:{type:String},preloadImage:{type:Boolean,value:!1},fadeImage:{type:Boolean,value:!1},placeholderImage:{type:String,value:null},elevation:{type:Number,value:1,reflectToAttribute:!0},animatedShadow:{type:Boolean,value:!1},animated:{type:Boolean,reflectToAttribute:!0,readOnly:!0,computed:"_computeAnimated(animatedShadow)"}},_isHidden:function(e){return e?"false":"true"},_headingChanged:function(e){var t=this.getAttribute("heading"),n=this.getAttribute("aria-label");"string"==typeof n&&n!==t||this.setAttribute("aria-label",e)},_computeHeadingClass:function(e){return e?" over-image":""},_computeAnimated:function(e){return e}});var to="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function no(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function io(e,t){return e(t={exports:{}},t.exports),t.exports}var ro=io((function(e,t){!function(t){var n={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:m,table:m,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/};function i(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||z.defaults,this.rules=n.normal,this.options.pedantic?this.rules=n.pedantic:this.options.gfm&&(this.rules=n.gfm)}n._label=/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,n._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,n.def=p(n.def).replace("label",n._label).replace("title",n._title).getRegex(),n.bullet=/(?:[*+-]|\d{1,9}\.)/,n.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,n.item=p(n.item,"gm").replace(/bull/g,n.bullet).getRegex(),n.list=p(n.list).replace(/bull/g,n.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+n.def.source+")").getRegex(),n._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",n._comment=/<!--(?!-?>)[\s\S]*?-->/,n.html=p(n.html,"i").replace("comment",n._comment).replace("tag",n._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),n.paragraph=p(n._paragraph).replace("hr",n.hr).replace("heading"," {0,3}#{1,6} +").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",n._tag).getRegex(),n.blockquote=p(n.blockquote).replace("paragraph",n.paragraph).getRegex(),n.normal=v({},n),n.gfm=v({},n.normal,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),n.pedantic=v({},n.normal,{html:p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",n._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:m,paragraph:p(n.normal._paragraph).replace("hr",n.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",n.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()}),i.rules=n,i.lex=function(e,t){return new i(t).lex(e)},i.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},i.prototype.token=function(e,t){var i,r,s,o,a,l,c,d,p,u,f,g,m,v,b,w;for(e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),s[0].length>1&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e)){var z=this.tokens[this.tokens.length-1];e=e.substring(s[0].length),z&&"paragraph"===z.type?z.text+="\n"+s[0].trimRight():(s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?s:_(s,"\n")}))}else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2]?s[2].trim():s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if((s=this.rules.nptable.exec(e))&&(l={type:"table",header:y(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===l.align.length){for(e=e.substring(s[0].length),f=0;f<l.align.length;f++)/^ *-+: *$/.test(l.align[f])?l.align[f]="right":/^ *:-+: *$/.test(l.align[f])?l.align[f]="center":/^ *:-+ *$/.test(l.align[f])?l.align[f]="left":l.align[f]=null;for(f=0;f<l.cells.length;f++)l.cells[f]=y(l.cells[f],l.header.length);this.tokens.push(l)}else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),c={type:"list_start",ordered:v=(o=s[2]).length>1,start:v?+o:"",loose:!1},this.tokens.push(c),d=[],i=!1,m=(s=s[0].match(this.rules.item)).length,f=0;f<m;f++)u=(l=s[f]).length,~(l=l.replace(/^ *([*+-]|\d+\.) */,"")).indexOf("\n ")&&(u-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+u+"}","gm"),"")),f!==m-1&&(a=n.bullet.exec(s[f+1])[0],(o.length>1?1===a.length:a.length>1||this.options.smartLists&&a!==o)&&(e=s.slice(f+1).join("\n")+e,f=m-1)),r=i||/\n\n(?!\s*$)/.test(l),f!==m-1&&(i="\n"===l.charAt(l.length-1),r||(r=i)),r&&(c.loose=!0),w=void 0,(b=/^\[[ xX]\] /.test(l))&&(w=" "!==l[1],l=l.replace(/^\[[ xX]\] +/,"")),p={type:"list_item_start",task:b,checked:w,loose:r},d.push(p),this.tokens.push(p),this.token(l,!1),this.tokens.push({type:"list_item_end"});if(c.loose)for(m=d.length,f=0;f<m;f++)d[f].loose=!0;this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):h(s[0]):s[0]});else if(t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),s[3]&&(s[3]=s[3].substring(1,s[3].length-1)),g=s[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[g]||(this.tokens.links[g]={href:s[2],title:s[3]});else if((s=this.rules.table.exec(e))&&(l={type:"table",header:y(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===l.align.length){for(e=e.substring(s[0].length),f=0;f<l.align.length;f++)/^ *-+: *$/.test(l.align[f])?l.align[f]="right":/^ *:-+: *$/.test(l.align[f])?l.align[f]="center":/^ *:-+ *$/.test(l.align[f])?l.align[f]="left":l.align[f]=null;for(f=0;f<l.cells.length;f++)l.cells[f]=y(l.cells[f].replace(/^ *\| *| *\| *$/g,""),l.header.length);this.tokens.push(l)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2].charAt(0)?1:2,text:s[1]});else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var r={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:m,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:m,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/};function s(e,t){if(this.options=t||z.defaults,this.links=e,this.rules=r.normal,this.renderer=this.options.renderer||new o,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=r.pedantic:this.options.gfm&&(this.options.breaks?this.rules=r.breaks:this.rules=r.gfm)}function o(e){this.options=e||z.defaults}function a(){}function l(e){this.tokens=[],this.token=null,this.options=e||z.defaults,this.options.renderer=this.options.renderer||new o,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new c}function c(){this.seen={}}function h(e,t){if(t){if(h.escapeTest.test(e))return e.replace(h.escapeReplace,(function(e){return h.replacements[e]}))}else if(h.escapeTestNoEncode.test(e))return e.replace(h.escapeReplaceNoEncode,(function(e){return h.replacements[e]}));return e}function d(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,(function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""}))}function p(e,t){return e=e.source||e,t=t||"",{replace:function(t,n){return n=(n=n.source||n).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(t,n),this},getRegex:function(){return new RegExp(e,t)}}}function u(e,t,n){if(e){try{var i=decodeURIComponent(d(n)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return null}if(0===i.indexOf("javascript:")||0===i.indexOf("vbscript:")||0===i.indexOf("data:"))return null}t&&!g.test(n)&&(n=function(e,t){f[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?f[" "+e]=e+"/":f[" "+e]=_(e,"/",!0));return e=f[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}r._punctuation="!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~",r.em=p(r.em).replace(/punctuation/g,r._punctuation).getRegex(),r._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,r._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,r._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,r.autolink=p(r.autolink).replace("scheme",r._scheme).replace("email",r._email).getRegex(),r._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,r.tag=p(r.tag).replace("comment",n._comment).replace("attribute",r._attribute).getRegex(),r._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,r._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,r._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,r.link=p(r.link).replace("label",r._label).replace("href",r._href).replace("title",r._title).getRegex(),r.reflink=p(r.reflink).replace("label",r._label).getRegex(),r.normal=v({},r),r.pedantic=v({},r.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:p(/^!?\[(label)\]\((.*?)\)/).replace("label",r._label).getRegex(),reflink:p(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",r._label).getRegex()}),r.gfm=v({},r.normal,{escape:p(r.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),r.gfm.url=p(r.gfm.url,"i").replace("email",r.gfm._extended_email).getRegex(),r.breaks=v({},r.gfm,{br:p(r.br).replace("{2,}","*").getRegex(),text:p(r.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()}),s.rules=r,s.output=function(e,t,n){return new s(t,n).output(e)},s.prototype.output=function(e){for(var t,n,i,r,o,a,l="";e;)if(o=this.rules.escape.exec(e))e=e.substring(o[0].length),l+=h(o[1]);else if(o=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(o[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(o[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(o[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0])&&(this.inRawBlock=!1),e=e.substring(o[0].length),l+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):h(o[0]):o[0];else if(o=this.rules.link.exec(e)){var c=b(o[2],"()");if(c>-1){var d=4+o[1].length+c;o[2]=o[2].substring(0,c),o[0]=o[0].substring(0,d).trim(),o[3]=""}e=e.substring(o[0].length),this.inLink=!0,i=o[2],this.options.pedantic?(t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i))?(i=t[1],r=t[3]):r="":r=o[3]?o[3].slice(1,-1):"",i=i.trim().replace(/^<([\s\S]*)>$/,"$1"),l+=this.outputLink(o,{href:s.escapes(i),title:s.escapes(r)}),this.inLink=!1}else if((o=this.rules.reflink.exec(e))||(o=this.rules.nolink.exec(e))){if(e=e.substring(o[0].length),t=(o[2]||o[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){l+=o[0].charAt(0),e=o[0].substring(1)+e;continue}this.inLink=!0,l+=this.outputLink(o,t),this.inLink=!1}else if(o=this.rules.strong.exec(e))e=e.substring(o[0].length),l+=this.renderer.strong(this.output(o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.em.exec(e))e=e.substring(o[0].length),l+=this.renderer.em(this.output(o[6]||o[5]||o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.code.exec(e))e=e.substring(o[0].length),l+=this.renderer.codespan(h(o[2].trim(),!0));else if(o=this.rules.br.exec(e))e=e.substring(o[0].length),l+=this.renderer.br();else if(o=this.rules.del.exec(e))e=e.substring(o[0].length),l+=this.renderer.del(this.output(o[1]));else if(o=this.rules.autolink.exec(e))e=e.substring(o[0].length),i="@"===o[2]?"mailto:"+(n=h(this.mangle(o[1]))):n=h(o[1]),l+=this.renderer.link(i,null,n);else if(this.inLink||!(o=this.rules.url.exec(e))){if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.inRawBlock?l+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):h(o[0]):o[0]):l+=this.renderer.text(h(this.smartypants(o[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else{if("@"===o[2])i="mailto:"+(n=h(o[0]));else{do{a=o[0],o[0]=this.rules._backpedal.exec(o[0])[0]}while(a!==o[0]);n=h(o[0]),i="www."===o[1]?"http://"+n:n}e=e.substring(o[0].length),l+=this.renderer.link(i,null,n)}return l},s.escapes=function(e){return e?e.replace(s.rules._escapes,"$1"):e},s.prototype.outputLink=function(e,t){var n=t.href,i=t.title?h(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,i,this.output(e[1])):this.renderer.image(n,i,h(e[1]))},s.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},s.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",i=e.length,r=0;r<i;r++)t=e.charCodeAt(r),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},o.prototype.code=function(e,t,n){var i=(t||"").match(/\S*/)[0];if(this.options.highlight){var r=this.options.highlight(e,i);null!=r&&r!==e&&(n=!0,e=r)}return i?'<pre><code class="'+this.options.langPrefix+h(i,!0)+'">'+(n?e:h(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:h(e,!0))+"</code></pre>"},o.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},o.prototype.html=function(e){return e},o.prototype.heading=function(e,t,n,i){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+i.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},o.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},o.prototype.list=function(e,t,n){var i=t?"ol":"ul";return"<"+i+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+i+">\n"},o.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},o.prototype.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},o.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},o.prototype.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},o.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},o.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},o.prototype.strong=function(e){return"<strong>"+e+"</strong>"},o.prototype.em=function(e){return"<em>"+e+"</em>"},o.prototype.codespan=function(e){return"<code>"+e+"</code>"},o.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},o.prototype.del=function(e){return"<del>"+e+"</del>"},o.prototype.link=function(e,t,n){if(null===(e=u(this.options.sanitize,this.options.baseUrl,e)))return n;var i='<a href="'+h(e)+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>"},o.prototype.image=function(e,t,n){if(null===(e=u(this.options.sanitize,this.options.baseUrl,e)))return n;var i='<img src="'+e+'" alt="'+n+'"';return t&&(i+=' title="'+t+'"'),i+=this.options.xhtml?"/>":">"},o.prototype.text=function(e){return e},a.prototype.strong=a.prototype.em=a.prototype.codespan=a.prototype.del=a.prototype.text=function(e){return e},a.prototype.link=a.prototype.image=function(e,t,n){return""+n},a.prototype.br=function(){return""},l.parse=function(e,t){return new l(t).parse(e)},l.prototype.parse=function(e){this.inline=new s(e.links,this.options),this.inlineText=new s(e.links,v({},this.options,{renderer:new a})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},l.prototype.next=function(){return this.token=this.tokens.pop(),this.token},l.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},l.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},l.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,d(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,i,r="",s="";for(n="",e=0;e<this.token.header.length;e++)n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(r+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",i=0;i<t.length;i++)n+=this.renderer.tablecell(this.inline.output(t[i]),{header:!1,align:this.token.align[i]});s+=this.renderer.tablerow(n)}return this.renderer.table(r,s);case"blockquote_start":for(s="";"blockquote_end"!==this.next().type;)s+=this.tok();return this.renderer.blockquote(s);case"list_start":s="";for(var o=this.token.ordered,a=this.token.start;"list_end"!==this.next().type;)s+=this.tok();return this.renderer.list(s,o,a);case"list_item_start":s="";var l=this.token.loose,c=this.token.checked,h=this.token.task;for(this.token.task&&(s+=this.renderer.checkbox(c));"list_item_end"!==this.next().type;)s+=l||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(s,h,c);case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:var p='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(p);console.log(p)}},c.prototype.slug=function(e){var t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){var n=t;do{this.seen[n]++,t=n+"-"+this.seen[n]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t},h.escapeTest=/[&<>"']/,h.escapeReplace=/[&<>"']/g,h.replacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},h.escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,h.escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g;var f={},g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function m(){}function v(e){for(var t,n,i=1;i<arguments.length;i++)for(n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function y(e,t){var n=e.replace(/\|/g,(function(e,t,n){for(var i=!1,r=t;--r>=0&&"\\"===n[r];)i=!i;return i?"|":" |"})).split(/ \|/),i=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(/\\\|/g,"|");return n}function _(e,t,n){if(0===e.length)return"";for(var i=0;i<e.length;){var r=e.charAt(e.length-i-1);if(r!==t||n){if(r===t||!n)break;i++}else i++}return e.substr(0,e.length-i)}function b(e,t){if(-1===e.indexOf(t[1]))return-1;for(var n=0,i=0;i<e.length;i++)if("\\"===e[i])i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&--n<0)return i;return-1}function w(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function z(e,t,n){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(n||"function"==typeof t){n||(n=t,t=null),w(t=v({},z.defaults,t||{}));var r,s,o=t.highlight,a=0;try{r=i.lex(e,t)}catch(e){return n(e)}s=r.length;var c=function(e){if(e)return t.highlight=o,n(e);var i;try{i=l.parse(r,t)}catch(t){e=t}return t.highlight=o,e?n(e):n(null,i)};if(!o||o.length<3)return c();if(delete t.highlight,!s)return c();for(;a<r.length;a++)!function(e){"code"!==e.type?--s||c():o(e.text,e.lang,(function(t,n){return t?c(t):null==n||n===e.text?--s||c():(e.text=n,e.escaped=!0,void(--s||c()))}))}(r[a])}else try{return t&&(t=v({},z.defaults,t)),w(t),l.parse(i.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||z.defaults).silent)return"<p>An error occurred:</p><pre>"+h(e.message+"",!0)+"</pre>";throw e}}m.exec=m,z.options=z.setOptions=function(e){return v(z.defaults,e),z},z.getDefaults=function(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:new o,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}},z.defaults=z.getDefaults(),z.Parser=l,z.parser=l.parse,z.Renderer=o,z.TextRenderer=a,z.Lexer=i,z.lexer=i.lex,z.InlineLexer=s,z.inlineLexer=s.output,z.Slugger=c,z.parse=z,e.exports=z}()}));function so(){var e={"align-content":!1,"align-items":!1,"align-self":!1,"alignment-adjust":!1,"alignment-baseline":!1,all:!1,"anchor-point":!1,animation:!1,"animation-delay":!1,"animation-direction":!1,"animation-duration":!1,"animation-fill-mode":!1,"animation-iteration-count":!1,"animation-name":!1,"animation-play-state":!1,"animation-timing-function":!1,azimuth:!1,"backface-visibility":!1,background:!0,"background-attachment":!0,"background-clip":!0,"background-color":!0,"background-image":!0,"background-origin":!0,"background-position":!0,"background-repeat":!0,"background-size":!0,"baseline-shift":!1,binding:!1,bleed:!1,"bookmark-label":!1,"bookmark-level":!1,"bookmark-state":!1,border:!0,"border-bottom":!0,"border-bottom-color":!0,"border-bottom-left-radius":!0,"border-bottom-right-radius":!0,"border-bottom-style":!0,"border-bottom-width":!0,"border-collapse":!0,"border-color":!0,"border-image":!0,"border-image-outset":!0,"border-image-repeat":!0,"border-image-slice":!0,"border-image-source":!0,"border-image-width":!0,"border-left":!0,"border-left-color":!0,"border-left-style":!0,"border-left-width":!0,"border-radius":!0,"border-right":!0,"border-right-color":!0,"border-right-style":!0,"border-right-width":!0,"border-spacing":!0,"border-style":!0,"border-top":!0,"border-top-color":!0,"border-top-left-radius":!0,"border-top-right-radius":!0,"border-top-style":!0,"border-top-width":!0,"border-width":!0,bottom:!1,"box-decoration-break":!0,"box-shadow":!0,"box-sizing":!0,"box-snap":!0,"box-suppress":!0,"break-after":!0,"break-before":!0,"break-inside":!0,"caption-side":!1,chains:!1,clear:!0,clip:!1,"clip-path":!1,"clip-rule":!1,color:!0,"color-interpolation-filters":!0,"column-count":!1,"column-fill":!1,"column-gap":!1,"column-rule":!1,"column-rule-color":!1,"column-rule-style":!1,"column-rule-width":!1,"column-span":!1,"column-width":!1,columns:!1,contain:!1,content:!1,"counter-increment":!1,"counter-reset":!1,"counter-set":!1,crop:!1,cue:!1,"cue-after":!1,"cue-before":!1,cursor:!1,direction:!1,display:!0,"display-inside":!0,"display-list":!0,"display-outside":!0,"dominant-baseline":!1,elevation:!1,"empty-cells":!1,filter:!1,flex:!1,"flex-basis":!1,"flex-direction":!1,"flex-flow":!1,"flex-grow":!1,"flex-shrink":!1,"flex-wrap":!1,float:!1,"float-offset":!1,"flood-color":!1,"flood-opacity":!1,"flow-from":!1,"flow-into":!1,font:!0,"font-family":!0,"font-feature-settings":!0,"font-kerning":!0,"font-language-override":!0,"font-size":!0,"font-size-adjust":!0,"font-stretch":!0,"font-style":!0,"font-synthesis":!0,"font-variant":!0,"font-variant-alternates":!0,"font-variant-caps":!0,"font-variant-east-asian":!0,"font-variant-ligatures":!0,"font-variant-numeric":!0,"font-variant-position":!0,"font-weight":!0,grid:!1,"grid-area":!1,"grid-auto-columns":!1,"grid-auto-flow":!1,"grid-auto-rows":!1,"grid-column":!1,"grid-column-end":!1,"grid-column-start":!1,"grid-row":!1,"grid-row-end":!1,"grid-row-start":!1,"grid-template":!1,"grid-template-areas":!1,"grid-template-columns":!1,"grid-template-rows":!1,"hanging-punctuation":!1,height:!0,hyphens:!1,icon:!1,"image-orientation":!1,"image-resolution":!1,"ime-mode":!1,"initial-letters":!1,"inline-box-align":!1,"justify-content":!1,"justify-items":!1,"justify-self":!1,left:!1,"letter-spacing":!0,"lighting-color":!0,"line-box-contain":!1,"line-break":!1,"line-grid":!1,"line-height":!1,"line-snap":!1,"line-stacking":!1,"line-stacking-ruby":!1,"line-stacking-shift":!1,"line-stacking-strategy":!1,"list-style":!0,"list-style-image":!0,"list-style-position":!0,"list-style-type":!0,margin:!0,"margin-bottom":!0,"margin-left":!0,"margin-right":!0,"margin-top":!0,"marker-offset":!1,"marker-side":!1,marks:!1,mask:!1,"mask-box":!1,"mask-box-outset":!1,"mask-box-repeat":!1,"mask-box-slice":!1,"mask-box-source":!1,"mask-box-width":!1,"mask-clip":!1,"mask-image":!1,"mask-origin":!1,"mask-position":!1,"mask-repeat":!1,"mask-size":!1,"mask-source-type":!1,"mask-type":!1,"max-height":!0,"max-lines":!1,"max-width":!0,"min-height":!0,"min-width":!0,"move-to":!1,"nav-down":!1,"nav-index":!1,"nav-left":!1,"nav-right":!1,"nav-up":!1,"object-fit":!1,"object-position":!1,opacity:!1,order:!1,orphans:!1,outline:!1,"outline-color":!1,"outline-offset":!1,"outline-style":!1,"outline-width":!1,overflow:!1,"overflow-wrap":!1,"overflow-x":!1,"overflow-y":!1,padding:!0,"padding-bottom":!0,"padding-left":!0,"padding-right":!0,"padding-top":!0,page:!1,"page-break-after":!1,"page-break-before":!1,"page-break-inside":!1,"page-policy":!1,pause:!1,"pause-after":!1,"pause-before":!1,perspective:!1,"perspective-origin":!1,pitch:!1,"pitch-range":!1,"play-during":!1,position:!1,"presentation-level":!1,quotes:!1,"region-fragment":!1,resize:!1,rest:!1,"rest-after":!1,"rest-before":!1,richness:!1,right:!1,rotation:!1,"rotation-point":!1,"ruby-align":!1,"ruby-merge":!1,"ruby-position":!1,"shape-image-threshold":!1,"shape-outside":!1,"shape-margin":!1,size:!1,speak:!1,"speak-as":!1,"speak-header":!1,"speak-numeral":!1,"speak-punctuation":!1,"speech-rate":!1,stress:!1,"string-set":!1,"tab-size":!1,"table-layout":!1,"text-align":!0,"text-align-last":!0,"text-combine-upright":!0,"text-decoration":!0,"text-decoration-color":!0,"text-decoration-line":!0,"text-decoration-skip":!0,"text-decoration-style":!0,"text-emphasis":!0,"text-emphasis-color":!0,"text-emphasis-position":!0,"text-emphasis-style":!0,"text-height":!0,"text-indent":!0,"text-justify":!0,"text-orientation":!0,"text-overflow":!0,"text-shadow":!0,"text-space-collapse":!0,"text-transform":!0,"text-underline-position":!0,"text-wrap":!0,top:!1,transform:!1,"transform-origin":!1,"transform-style":!1,transition:!1,"transition-delay":!1,"transition-duration":!1,"transition-property":!1,"transition-timing-function":!1,"unicode-bidi":!1,"vertical-align":!1,visibility:!1,"voice-balance":!1,"voice-duration":!1,"voice-family":!1,"voice-pitch":!1,"voice-range":!1,"voice-rate":!1,"voice-stress":!1,"voice-volume":!1,volume:!1,"white-space":!1,widows:!1,width:!0,"will-change":!1,"word-break":!0,"word-spacing":!0,"word-wrap":!0,"wrap-flow":!1,"wrap-through":!1,"writing-mode":!1,"z-index":!1};return e}var oo=/javascript\s*\:/gim;var ao={whiteList:so(),getDefaultWhiteList:so,onAttr:function(e,t,n){},onIgnoreAttr:function(e,t,n){},safeAttrValue:function(e,t){return oo.test(t)?"":t}},lo={indexOf:function(e,t){var n,i;if(Array.prototype.indexOf)return e.indexOf(t);for(n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},forEach:function(e,t,n){var i,r;if(Array.prototype.forEach)return e.forEach(t,n);for(i=0,r=e.length;i<r;i++)t.call(n,e[i],i,e)},trim:function(e){return String.prototype.trim?e.trim():e.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(e){return String.prototype.trimRight?e.trimRight():e.replace(/(\s*$)/g,"")}};var co=function(e,t){";"!==(e=lo.trimRight(e))[e.length-1]&&(e+=";");var n=e.length,i=!1,r=0,s=0,o="";function a(){if(!i){var n=lo.trim(e.slice(r,s)),a=n.indexOf(":");if(-1!==a){var l=lo.trim(n.slice(0,a)),c=lo.trim(n.slice(a+1));if(l){var h=t(r,o.length,l,c,n);h&&(o+=h+"; ")}}}r=s+1}for(;s<n;s++){var l=e[s];if("/"===l&&"*"===e[s+1]){var c=e.indexOf("*/",s+2);if(-1===c)break;r=(s=c+1)+1,i=!1}else"("===l?i=!0:")"===l?i=!1:";"===l?i||a():"\n"===l&&a()}return lo.trim(o)};function ho(e){return null==e}function po(e){(e=function(e){var t={};for(var n in e)t[n]=e[n];return t}(e||{})).whiteList=e.whiteList||ao.whiteList,e.onAttr=e.onAttr||ao.onAttr,e.onIgnoreAttr=e.onIgnoreAttr||ao.onIgnoreAttr,e.safeAttrValue=e.safeAttrValue||ao.safeAttrValue,this.options=e}po.prototype.process=function(e){if(!(e=(e=e||"").toString()))return"";var t=this.options,n=t.whiteList,i=t.onAttr,r=t.onIgnoreAttr,s=t.safeAttrValue;return co(e,(function(e,t,o,a,l){var c=n[o],h=!1;if(!0===c?h=c:"function"==typeof c?h=c(a):c instanceof RegExp&&(h=c.test(a)),!0!==h&&(h=!1),a=s(o,a)){var d,p={position:t,sourcePosition:e,source:l,isWhite:h};return h?ho(d=i(o,a,p))?o+":"+a:d:ho(d=r(o,a,p))?void 0:d}}))};var uo=po,fo=io((function(e,t){for(var n in(t=e.exports=function(e,t){return new uo(t).process(e)}).FilterCSS=uo,ao)t[n]=ao[n];"undefined"!=typeof window&&(window.filterCSS=e.exports)})),go=(fo.FilterCSS,{indexOf:function(e,t){var n,i;if(Array.prototype.indexOf)return e.indexOf(t);for(n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},forEach:function(e,t,n){var i,r;if(Array.prototype.forEach)return e.forEach(t,n);for(i=0,r=e.length;i<r;i++)t.call(n,e[i],i,e)},trim:function(e){return String.prototype.trim?e.trim():e.replace(/(^\s*)|(\s*$)/g,"")},spaceIndex:function(e){var t=/\s|\n|\t/.exec(e);return t?t.index:-1}}),mo=fo.FilterCSS,vo=fo.getDefaultWhiteList;function yo(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}var _o=new mo;function bo(e){return e.replace(wo,"&lt;").replace(zo,"&gt;")}var wo=/</g,zo=/>/g,xo=/"/g,So=/&quot;/g,ko=/&#([a-zA-Z0-9]*);?/gim,Mo=/&colon;?/gim,Co=/&newline;?/gim,Ao=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,Eo=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,Lo=/u\s*r\s*l\s*\(.*/gi;function To(e){return e.replace(xo,"&quot;")}function Oo(e){return e.replace(So,'"')}function Ho(e){return e.replace(ko,(function(e,t){return"x"===t[0]||"X"===t[0]?String.fromCharCode(parseInt(t.substr(1),16)):String.fromCharCode(parseInt(t,10))}))}function Po(e){return e.replace(Mo,":").replace(Co," ")}function No(e){for(var t="",n=0,i=e.length;n<i;n++)t+=e.charCodeAt(n)<32?" ":e.charAt(n);return go.trim(t)}function Vo(e){return e=No(e=Po(e=Ho(e=Oo(e))))}function Io(e){return e=bo(e=To(e))}var Ro=/<!--[\s\S]*?-->/g;var Do={whiteList:{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]},getDefaultWhiteList:yo,onTag:function(e,t,n){},onIgnoreTag:function(e,t,n){},onTagAttr:function(e,t,n){},onIgnoreTagAttr:function(e,t,n){},safeAttrValue:function(e,t,n,i){if(n=Vo(n),"href"===t||"src"===t){if("#"===(n=go.trim(n)))return"#";if("http://"!==n.substr(0,7)&&"https://"!==n.substr(0,8)&&"mailto:"!==n.substr(0,7)&&"tel:"!==n.substr(0,4)&&"#"!==n[0]&&"/"!==n[0])return""}else if("background"===t){if(Ao.lastIndex=0,Ao.test(n))return""}else if("style"===t){if(Eo.lastIndex=0,Eo.test(n))return"";if(Lo.lastIndex=0,Lo.test(n)&&(Ao.lastIndex=0,Ao.test(n)))return"";!1!==i&&(n=(i=i||_o).process(n))}return n=Io(n)},escapeHtml:bo,escapeQuote:To,unescapeQuote:Oo,escapeHtmlEntities:Ho,escapeDangerHtml5Entities:Po,clearNonPrintableCharacter:No,friendlyAttrValue:Vo,escapeAttrValue:Io,onIgnoreTagStripAll:function(){return""},StripTagBody:function(e,t){"function"!=typeof t&&(t=function(){});var n=!Array.isArray(e),i=[],r=!1;return{onIgnoreTag:function(s,o,a){if(function(t){return!!n||-1!==go.indexOf(e,t)}(s)){if(a.isClosing){var l="[/removed]",c=a.position+l.length;return i.push([!1!==r?r:a.position,c]),r=!1,l}return r||(r=a.position),"[removed]"}return t(s,o,a)},remove:function(e){var t="",n=0;return go.forEach(i,(function(i){t+=e.slice(n,i[0]),n=i[1]})),t+=e.slice(n)}}},stripCommentTag:function(e){return e.replace(Ro,"")},stripBlankChar:function(e){var t=e.split("");return(t=t.filter((function(e){var t=e.charCodeAt(0);return 127!==t&&(!(t<=31)||(10===t||13===t))}))).join("")},cssFilter:_o,getDefaultCSSWhiteList:vo};function Bo(e){var t=go.spaceIndex(e);if(-1===t)var n=e.slice(1,-1);else n=e.slice(1,t+1);return"/"===(n=go.trim(n).toLowerCase()).slice(0,1)&&(n=n.slice(1)),"/"===n.slice(-1)&&(n=n.slice(0,-1)),n}function $o(e){return"</"===e.slice(0,2)}var Fo=/[^a-zA-Z0-9_:\.\-]/gim;function jo(e,t){for(;t<e.length;t++){var n=e[t];if(" "!==n)return"="===n?t:-1}}function Uo(e,t){for(;t>0;t--){var n=e[t];if(" "!==n)return"="===n?t:-1}}function Yo(e){return function(e){return'"'===e[0]&&'"'===e[e.length-1]||"'"===e[0]&&"'"===e[e.length-1]}(e)?e.substr(1,e.length-2):e}var Ko={parseTag:function(e,t,n){var i="",r=0,s=!1,o=!1,a=0,l=e.length,c="",h="";for(a=0;a<l;a++){var d=e.charAt(a);if(!1===s){if("<"===d){s=a;continue}}else if(!1===o){if("<"===d){i+=n(e.slice(r,a)),s=a,r=a;continue}if(">"===d){i+=n(e.slice(r,s)),c=Bo(h=e.slice(s,a+1)),i+=t(s,i.length,c,h,$o(h)),r=a+1,s=!1;continue}if(('"'===d||"'"===d)&&"="===e.charAt(a-1)){o=d;continue}}else if(d===o){o=!1;continue}}return r<e.length&&(i+=n(e.substr(r))),i},parseAttr:function(e,t){var n=0,i=[],r=!1,s=e.length;function o(e,n){if(!((e=(e=go.trim(e)).replace(Fo,"").toLowerCase()).length<1)){var r=t(e,n||"");r&&i.push(r)}}for(var a=0;a<s;a++){var l,c=e.charAt(a);if(!1!==r||"="!==c)if(!1===r||a!==n||'"'!==c&&"'"!==c||"="!==e.charAt(a-1))if(/\s|\n|\t/.test(c)){if(e=e.replace(/\s|\n|\t/g," "),!1===r){if(-1===(l=jo(e,a))){o(go.trim(e.slice(n,a))),r=!1,n=a+1;continue}a=l-1;continue}if(-1===(l=Uo(e,a-1))){o(r,Yo(go.trim(e.slice(n,a)))),r=!1,n=a+1;continue}}else;else{if(-1===(l=e.indexOf(c,a+1)))break;o(r,go.trim(e.slice(n+1,l))),r=!1,n=(a=l)+1}else r=e.slice(n,a),n=a+1}return n<e.length&&(!1===r?o(e.slice(n)):o(r,Yo(go.trim(e.slice(n))))),go.trim(i.join(" "))}},qo=fo.FilterCSS,Wo=Ko.parseTag,Jo=Ko.parseAttr;function Qo(e){return null==e}function Go(e){(e=function(e){var t={};for(var n in e)t[n]=e[n];return t}(e||{})).stripIgnoreTag&&(e.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),e.onIgnoreTag=Do.onIgnoreTagStripAll),e.whiteList=e.whiteList||Do.whiteList,e.onTag=e.onTag||Do.onTag,e.onTagAttr=e.onTagAttr||Do.onTagAttr,e.onIgnoreTag=e.onIgnoreTag||Do.onIgnoreTag,e.onIgnoreTagAttr=e.onIgnoreTagAttr||Do.onIgnoreTagAttr,e.safeAttrValue=e.safeAttrValue||Do.safeAttrValue,e.escapeHtml=e.escapeHtml||Do.escapeHtml,this.options=e,!1===e.css?this.cssFilter=!1:(e.css=e.css||{},this.cssFilter=new qo(e.css))}Go.prototype.process=function(e){if(!(e=(e=e||"").toString()))return"";var t=this.options,n=t.whiteList,i=t.onTag,r=t.onIgnoreTag,s=t.onTagAttr,o=t.onIgnoreTagAttr,a=t.safeAttrValue,l=t.escapeHtml,c=this.cssFilter;t.stripBlankChar&&(e=Do.stripBlankChar(e)),t.allowCommentTag||(e=Do.stripCommentTag(e));var h=!1;if(t.stripIgnoreTagBody){h=Do.StripTagBody(t.stripIgnoreTagBody,r);r=h.onIgnoreTag}var d=Wo(e,(function(e,t,h,d,p){var u,f={sourcePosition:e,position:t,isClosing:p,isWhite:n.hasOwnProperty(h)};if(!Qo(u=i(h,d,f)))return u;if(f.isWhite){if(f.isClosing)return"</"+h+">";var g=function(e){var t=go.spaceIndex(e);if(-1===t)return{html:"",closing:"/"===e[e.length-2]};var n="/"===(e=go.trim(e.slice(t+1,-1)))[e.length-1];return n&&(e=go.trim(e.slice(0,-1))),{html:e,closing:n}}(d),m=n[h],v=Jo(g.html,(function(e,t){var n,i=-1!==go.indexOf(m,e);return Qo(n=s(h,e,t,i))?i?(t=a(h,e,t,c))?e+'="'+t+'"':e:Qo(n=o(h,e,t,i))?void 0:n:n}));d="<"+h;return v&&(d+=" "+v),g.closing&&(d+=" /"),d+=">"}return Qo(u=r(h,d,f))?l(d):u}),l);return h&&(d=h.remove(d)),d};var Xo=Go,Zo=io((function(e,t){function n(e,t){return new Xo(t).process(e)}for(var i in(t=e.exports=n).filterXSS=n,t.FilterXSS=Xo,Do)t[i]=Do[i];for(var i in Ko)t[i]=Ko[i];"undefined"!=typeof window&&(window.filterXSS=e.exports),"undefined"!=typeof self&&"undefined"!=typeof DedicatedWorkerGlobalScope&&self instanceof DedicatedWorkerGlobalScope&&(self.filterXSS=e.exports)})),ea=Zo.filterXSS,ta=(Zo.FilterXSS,io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Type=t.Char=void 0;t.Char={ANCHOR:"&",COMMENT:"#",TAG:"!",DIRECTIVES_END:"-",DOCUMENT_END:"."};t.Type={ALIAS:"ALIAS",BLANK_LINE:"BLANK_LINE",BLOCK_FOLDED:"BLOCK_FOLDED",BLOCK_LITERAL:"BLOCK_LITERAL",COMMENT:"COMMENT",DIRECTIVE:"DIRECTIVE",DOCUMENT:"DOCUMENT",FLOW_MAP:"FLOW_MAP",FLOW_SEQ:"FLOW_SEQ",MAP:"MAP",MAP_KEY:"MAP_KEY",MAP_VALUE:"MAP_VALUE",PLAIN:"PLAIN",QUOTE_DOUBLE:"QUOTE_DOUBLE",QUOTE_SINGLE:"QUOTE_SINGLE",SEQ:"SEQ",SEQ_ITEM:"SEQ_ITEM"}})));no(ta);ta.Type,ta.Char;var na=io((function(e,t){function n(e){const t=[0];let n=e.indexOf("\n");for(;-1!==n;)n+=1,t.push(n),n=e.indexOf("\n",n);return t}function i(e){let t,i;return"string"==typeof e?(t=n(e),i=e):(Array.isArray(e)&&(e=e[0]),e&&e.context&&(e.lineStarts||(e.lineStarts=n(e.context.src)),t=e.lineStarts,i=e.context.src)),{lineStarts:t,src:i}}function r(e,t){const{lineStarts:n,src:r}=i(t);if(!n||!(e>=1)||e>n.length)return null;const s=n[e-1];let o=n[e];for(;o&&o>s&&"\n"===r[o-1];)--o;return r.slice(s,o)}Object.defineProperty(t,"__esModule",{value:!0}),t.getLinePos=function(e,t){if("number"!=typeof e||e<0)return null;const{lineStarts:n,src:r}=i(t);if(!n||!r||e>r.length)return null;for(let t=0;t<n.length;++t){const i=n[t];if(e<i)return{line:t,col:e-n[t-1]+1};if(e===i)return{line:t+1,col:1}}const s=n.length;return{line:s,col:e-n[s-1]+1}},t.getLine=r,t.getPrettyContext=function({start:e,end:t},n,i=80){let s=r(e.line,n);if(!s)return null;let{col:o}=e;if(s.length>i)if(o<=i-10)s=s.substr(0,i-1)+"…";else{const e=Math.round(i/2);s.length>o+e&&(s=s.substr(0,o+e-1)+"…"),o-=s.length-i,s="…"+s.substr(1-i)}let a=1,l="";t&&(t.line===e.line&&o+(t.col-e.col)<=i+1?a=t.col-e.col:(a=Math.min(s.length+1,i)-o,l="…"));const c=o>1?" ".repeat(o-1):"",h="^".repeat(a);return`${s}\n${c}${h}${l}`}}));no(na);na.getLinePos,na.getLine,na.getPrettyContext;var ia=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class n{static copy(e){return new n(e.start,e.end)}constructor(e,t){this.start=e,this.end=t||e}isEmpty(){return"number"!=typeof this.start||!this.end||this.end<=this.start}setOrigRange(e,t){const{start:n,end:i}=this;if(0===e.length||i<=e[0])return this.origStart=n,this.origEnd=i,t;let r=t;for(;r<e.length&&!(e[r]>n);)++r;this.origStart=n+r;const s=r;for(;r<e.length&&!(e[r]>=i);)++r;return this.origEnd=i+r,s}}t.default=n}));no(ia);var ra=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=ia)&&n.__esModule?n:{default:n};class r{static addStringTerminator(e,t,n){if("\n"===n[n.length-1])return n;const i=r.endOfWhiteSpace(e,t);return i>=e.length||"\n"===e[i]?n+"\n":n}static atDocumentBoundary(e,t,n){const i=e[t];if(!i)return!0;const r=e[t-1];if(r&&"\n"!==r)return!1;if(n){if(i!==n)return!1}else if(i!==ta.Char.DIRECTIVES_END&&i!==ta.Char.DOCUMENT_END)return!1;const s=e[t+1],o=e[t+2];if(s!==i||o!==i)return!1;const a=e[t+3];return!a||"\n"===a||"\t"===a||" "===a}static endOfIdentifier(e,t){let n=e[t];const i="<"===n,r=i?["\n","\t"," ",">"]:["\n","\t"," ","[","]","{","}",","];for(;n&&-1===r.indexOf(n);)n=e[t+=1];return i&&">"===n&&(t+=1),t}static endOfIndent(e,t){let n=e[t];for(;" "===n;)n=e[t+=1];return t}static endOfLine(e,t){let n=e[t];for(;n&&"\n"!==n;)n=e[t+=1];return t}static endOfWhiteSpace(e,t){let n=e[t];for(;"\t"===n||" "===n;)n=e[t+=1];return t}static startOfLine(e,t){let n=e[t-1];if("\n"===n)return t;for(;n&&"\n"!==n;)n=e[t-=1];return t+1}static endOfBlockIndent(e,t,n){const i=r.endOfIndent(e,n);if(i>n+t)return i;{const t=r.endOfWhiteSpace(e,i),n=e[t];if(!n||"\n"===n)return t}return null}static atBlank(e,t,n){const i=e[t];return"\n"===i||"\t"===i||" "===i||n&&!i}static atCollectionItem(e,t){const n=e[t];return("?"===n||":"===n||"-"===n)&&r.atBlank(e,t+1,!0)}static nextNodeIsIndented(e,t,n){return!(!e||t<0)&&(t>0||n&&"-"===e)}static normalizeOffset(e,t){const n=e[t];return n?"\n"!==n&&"\n"===e[t-1]?t-1:r.endOfWhiteSpace(e,t):t}static foldNewline(e,t,n){let i=0,s=!1,o="",a=e[t+1];for(;" "===a||"\t"===a||"\n"===a;){switch(a){case"\n":i=0,t+=1,o+="\n";break;case"\t":i<=n&&(s=!0),t=r.endOfWhiteSpace(e,t+2)-1;break;case" ":i+=1,t+=1}a=e[t+1]}return o||(o=" "),a&&i<=n&&(s=!0),{fold:o,offset:t,error:s}}constructor(e,t,n){Object.defineProperty(this,"context",{value:n||null,writable:!0}),this.error=null,this.range=null,this.valueRange=null,this.props=t||[],this.type=e,this.value=null}getPropValue(e,t,n){if(!this.context)return null;const{src:i}=this.context,r=this.props[e];return r&&i[r.start]===t?i.slice(r.start+(n?1:0),r.end):null}get anchor(){for(let e=0;e<this.props.length;++e){const t=this.getPropValue(e,ta.Char.ANCHOR,!0);if(null!=t)return t}return null}get comment(){const e=[];for(let t=0;t<this.props.length;++t){const n=this.getPropValue(t,ta.Char.COMMENT,!0);null!=n&&e.push(n)}return e.length>0?e.join("\n"):null}commentHasRequiredWhitespace(e){const{src:t}=this.context;if(this.header&&e===this.header.end)return!1;if(!this.valueRange)return!1;const{end:n}=this.valueRange;return e!==n||r.atBlank(t,n-1)}get hasComment(){if(this.context){const{src:e}=this.context;for(let t=0;t<this.props.length;++t)if(e[this.props[t].start]===ta.Char.COMMENT)return!0}return!1}get hasProps(){if(this.context){const{src:e}=this.context;for(let t=0;t<this.props.length;++t)if(e[this.props[t].start]!==ta.Char.COMMENT)return!0}return!1}get includesTrailingLines(){return!1}get jsonLike(){return-1!==[ta.Type.FLOW_MAP,ta.Type.FLOW_SEQ,ta.Type.QUOTE_DOUBLE,ta.Type.QUOTE_SINGLE].indexOf(this.type)}get rangeAsLinePos(){if(!this.range||!this.context)return;const e=(0,na.getLinePos)(this.range.start,this.context.root);return e?{start:e,end:(0,na.getLinePos)(this.range.end,this.context.root)}:void 0}get rawValue(){if(!this.valueRange||!this.context)return null;const{start:e,end:t}=this.valueRange;return this.context.src.slice(e,t)}get tag(){for(let e=0;e<this.props.length;++e){const t=this.getPropValue(e,ta.Char.TAG,!1);if(null!=t){if("<"===t[1])return{verbatim:t.slice(2,-1)};{const[e,n,i]=t.match(/^(.*!)([^!]*)$/);return{handle:n,suffix:i}}}}return null}get valueRangeContainsNewline(){if(!this.valueRange||!this.context)return!1;const{start:e,end:t}=this.valueRange,{src:n}=this.context;for(let i=e;i<t;++i)if("\n"===n[i])return!0;return!1}parseComment(e){const{src:t}=this.context;if(t[e]===ta.Char.COMMENT){const n=r.endOfLine(t,e+1),s=new i.default(e,n);return this.props.push(s),n}return e}setOrigRanges(e,t){return this.range&&(t=this.range.setOrigRange(e,t)),this.valueRange&&this.valueRange.setOrigRange(e,t),this.props.forEach(n=>n.setOrigRange(e,t)),t}toString(){const{context:{src:e},range:t,value:n}=this;if(null!=n)return n;const i=e.slice(t.start,t.end);return r.addStringTerminator(e,t.end,i)}}t.default=r}));no(ra);var sa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.YAMLWarning=t.YAMLSyntaxError=t.YAMLSemanticError=t.YAMLReferenceError=t.YAMLError=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends Error{constructor(e,t,i){if(!(i&&t instanceof n.default))throw new Error(`Invalid arguments for new ${e}`);super(),this.name=e,this.message=i,this.source=t}makePretty(){if(!this.source)return;this.nodeType=this.source.type;const e=this.source.context&&this.source.context.root;if("number"==typeof this.offset){this.range=new i.default(this.offset,this.offset+1);const t=e&&(0,na.getLinePos)(this.offset,e);if(t){const e={line:t.line,col:t.col+1};this.linePos={start:t,end:e}}delete this.offset}else this.range=this.source.range,this.linePos=this.source.rangeAsLinePos;if(this.linePos){const{line:t,col:n}=this.linePos.start;this.message+=` at line ${t}, column ${n}`;const i=e&&(0,na.getPrettyContext)(this.linePos,e);i&&(this.message+=`:\n\n${i}\n`)}delete this.source}}t.YAMLError=s;t.YAMLReferenceError=class extends s{constructor(e,t){super("YAMLReferenceError",e,t)}};t.YAMLSemanticError=class extends s{constructor(e,t){super("YAMLSemanticError",e,t)}};t.YAMLSyntaxError=class extends s{constructor(e,t){super("YAMLSyntaxError",e,t)}};t.YAMLWarning=class extends s{constructor(e,t){super("YAMLWarning",e,t)}}}));no(sa);sa.YAMLWarning,sa.YAMLSyntaxError,sa.YAMLSemanticError,sa.YAMLReferenceError,sa.YAMLError;var oa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{constructor(){super(ta.Type.BLANK_LINE)}get includesTrailingLines(){return!0}parse(e,t){this.context=e;const{src:r}=e;let s=t+1;for(;n.default.atBlank(r,s);){const e=n.default.endOfWhiteSpace(r,s);if("\n"!==e)break;s=e+1}return this.range=new i.default(t,s),s}}t.default=s}));no(oa);var aa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(oa),i=s(ra),r=s(ia);function s(e){return e&&e.__esModule?e:{default:e}}class o extends i.default{constructor(e,t){super(e,t),this.node=null}get includesTrailingLines(){return!!this.node&&this.node.includesTrailingLines}parse(e,t){this.context=e;const{parseNode:s,src:o}=e;let{atLineStart:a,lineStart:l}=e;a||this.type!==ta.Type.SEQ_ITEM||(this.error=new sa.YAMLSemanticError(this,"Sequence items must not have preceding content on the same line"));const c=a?t-l:e.indent;let h=i.default.endOfWhiteSpace(o,t+1),d=o[h];const p="#"===d,u=[];let f=null;for(;"\n"===d||"#"===d;){if("#"===d){const e=i.default.endOfLine(o,h+1);u.push(new r.default(h,e)),h=e}else{a=!0,l=h+1,"\n"===o[i.default.endOfWhiteSpace(o,l)]&&0===u.length&&(l=(f=new n.default).parse({src:o},l)),h=i.default.endOfIndent(o,l)}d=o[h]}if(i.default.nextNodeIsIndented(d,h-(l+c),this.type!==ta.Type.SEQ_ITEM)?this.node=s({atLineStart:a,inCollection:!1,indent:c,lineStart:l,parent:this},h):d&&l>t+1&&(h=l-1),this.node){if(f){const t=e.parent.items||e.parent.contents;t&&t.push(f)}u.length&&Array.prototype.push.apply(this.props,u),h=this.node.range.end}else if(p){const e=u[0];this.props.push(e),h=e.end}else h=i.default.endOfLine(o,t+1);const g=this.node?this.node.valueRange.end:h;return this.valueRange=new r.default(t,g),h}setOrigRanges(e,t){return t=super.setOrigRanges(e,t),this.node?this.node.setOrigRanges(e,t):t}toString(){const{context:{src:e},node:t,range:n,value:r}=this;if(null!=r)return r;const s=t?e.slice(n.start,t.range.start)+String(t):e.slice(n.start,n.end);return i.default.addStringTerminator(e,n.end,s)}}t.default=o}));no(aa);var la=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{constructor(){super(ta.Type.COMMENT)}parse(e,t){this.context=e;const n=this.parseComment(t);return this.range=new i.default(t,n),n}}t.default=s}));no(la);var ca=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.grabCollectionEndComments=l,t.default=void 0;var n=a(oa),i=a(aa),r=a(la),s=a(ra),o=a(ia);function a(e){return e&&e.__esModule?e:{default:e}}function l(e){let t=e;for(;t instanceof i.default;)t=t.node;if(!(t instanceof c))return null;const n=t.items.length;let r=-1;for(let e=n-1;e>=0;--e){const n=t.items[e];if(n.type===ta.Type.COMMENT){const{indent:t,lineStart:i}=n.context;if(t>0&&n.range.start>=i+t)break;r=e}else{if(n.type!==ta.Type.BLANK_LINE)break;r=e}}if(-1===r)return null;const s=t.items.splice(r,n-r),o=s[0].range.start;for(;t.range.end=o,t.valueRange&&t.valueRange.end>o&&(t.valueRange.end=o),t!==e;)t=t.context.parent;return s}class c extends s.default{static nextContentHasIndent(e,t,n){const i=s.default.endOfLine(e,t)+1,r=e[t=s.default.endOfWhiteSpace(e,i)];return!!r&&(t>=i+n||("#"===r||"\n"===r)&&c.nextContentHasIndent(e,t,n))}constructor(e){super(e.type===ta.Type.SEQ_ITEM?ta.Type.SEQ:ta.Type.MAP);for(let t=e.props.length-1;t>=0;--t)if(e.props[t].start<e.context.lineStart){this.props=e.props.slice(0,t+1),e.props=e.props.slice(t+1);const n=e.props[0]||e.valueRange;e.range.start=n.start;break}this.items=[e];const t=l(e);t&&Array.prototype.push.apply(this.items,t)}get includesTrailingLines(){return this.items.length>0}parse(e,t){this.context=e;const{parseNode:i,src:a}=e;let h=s.default.startOfLine(a,t);const d=this.items[0];d.context.parent=this,this.valueRange=o.default.copy(d.valueRange);const p=d.range.start-d.context.lineStart;let u=t,f=a[u=s.default.normalizeOffset(a,u)],g=s.default.endOfWhiteSpace(a,h)===u,m=!1;for(;f;){for(;"\n"===f||"#"===f;){if(g&&"\n"===f&&!m){const e=new n.default;if(u=e.parse({src:a},u),this.valueRange.end=u,u>=a.length){f=null;break}this.items.push(e),u-=1}else if("#"===f){if(u<h+p&&!c.nextContentHasIndent(a,u,p))return u;const e=new r.default;if(u=e.parse({indent:p,lineStart:h,src:a},u),this.items.push(e),this.valueRange.end=u,u>=a.length){f=null;break}}if(h=u+1,u=s.default.endOfIndent(a,h),s.default.atBlank(a,u)){const e=s.default.endOfWhiteSpace(a,u),t=a[e];t&&"\n"!==t&&"#"!==t||(u=e)}f=a[u],g=!0}if(!f)break;if(u!==h+p&&(g||":"!==f)){h>t&&(u=h);break}if(d.type===ta.Type.SEQ_ITEM!=("-"===f)){let e=!0;if("-"===f){const t=a[u+1];e=!t||"\n"===t||"\t"===t||" "===t}if(e){h>t&&(u=h);break}}const e=i({atLineStart:g,inCollection:!0,indent:p,lineStart:h,parent:this},u);if(!e)return u;if(this.items.push(e),this.valueRange.end=e.valueRange.end,f=a[u=s.default.normalizeOffset(a,e.range.end)],g=!1,m=e.includesTrailingLines,f){let e=u-1,t=a[e];for(;" "===t||"\t"===t;)t=a[--e];"\n"===t&&(h=e+1,g=!0)}const o=l(e);o&&Array.prototype.push.apply(this.items,o)}return u}setOrigRanges(e,t){return t=super.setOrigRanges(e,t),this.items.forEach(n=>{t=n.setOrigRanges(e,t)}),t}toString(){const{context:{src:e},items:t,range:n,value:i}=this;if(null!=i)return i;let r=e.slice(n.start,t[0].range.start)+String(t[0]);for(let e=1;e<t.length;++e){const n=t[e],{atLineStart:i,indent:s}=n.context;if(i)for(let e=0;e<s;++e)r+=" ";r+=String(n)}return s.default.addStringTerminator(e,n.end,r)}}t.default=c}));no(ca);ca.grabCollectionEndComments;var ha=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{static endOfDirective(e,t){let n=e[t];for(;n&&"\n"!==n&&"#"!==n;)n=e[t+=1];for(n=e[t-1];" "===n||"\t"===n;)n=e[(t-=1)-1];return t}constructor(){super(ta.Type.DIRECTIVE),this.name=null}get parameters(){const e=this.rawValue;return e?e.trim().split(/[ \t]+/):[]}parseName(e){const{src:t}=this.context;let n=e,i=t[n];for(;i&&"\n"!==i&&"\t"!==i&&" "!==i;)i=t[n+=1];return this.name=t.slice(e,n),n}parseParameters(e){const{src:t}=this.context;let n=e,r=t[n];for(;r&&"\n"!==r&&"#"!==r;)r=t[n+=1];return this.valueRange=new i.default(e,n),n}parse(e,t){this.context=e;let n=this.parseName(t+1);return n=this.parseParameters(n),n=this.parseComment(n),this.range=new i.default(t,n),n}}t.default=s}));no(ha);var da=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(oa),i=a(la),r=a(ha),s=a(ra),o=a(ia);function a(e){return e&&e.__esModule?e:{default:e}}class l extends s.default{static startCommentOrEndBlankLine(e,t){const n=s.default.endOfWhiteSpace(e,t),i=e[n];return"#"===i||"\n"===i?n:t}constructor(){super(ta.Type.DOCUMENT),this.directives=null,this.contents=null,this.directivesEndMarker=null,this.documentEndMarker=null}parseDirectives(e){const{src:t}=this.context;this.directives=[];let a=!0,c=!1,h=e;for(;!s.default.atDocumentBoundary(t,h,ta.Char.DIRECTIVES_END);)switch(t[h=l.startCommentOrEndBlankLine(t,h)]){case"\n":if(a){const e=new n.default;(h=e.parse({src:t},h))<t.length&&this.directives.push(e)}else h+=1,a=!0;break;case"#":{const e=new i.default;h=e.parse({src:t},h),this.directives.push(e),a=!1}break;case"%":{const e=new r.default;h=e.parse({parent:this,src:t},h),this.directives.push(e),c=!0,a=!1}break;default:return c?this.error=new sa.YAMLSemanticError(this,"Missing directives-end indicator line"):this.directives.length>0&&(this.contents=this.directives,this.directives=[]),h}return t[h]?(this.directivesEndMarker=new o.default(h,h+3),h+3):(c?this.error=new sa.YAMLSemanticError(this,"Missing directives-end indicator line"):this.directives.length>0&&(this.contents=this.directives,this.directives=[]),h)}parseContents(e){const{parseNode:t,src:r}=this.context;this.contents||(this.contents=[]);let a=e;for(;"-"===r[a-1];)a-=1;let c=s.default.endOfWhiteSpace(r,e),h=a===e;for(this.valueRange=new o.default(c);!s.default.atDocumentBoundary(r,c,ta.Char.DOCUMENT_END);){switch(r[c]){case"\n":if(h){const e=new n.default;(c=e.parse({src:r},c))<r.length&&this.contents.push(e)}else c+=1,h=!0;a=c;break;case"#":{const e=new i.default;c=e.parse({src:r},c),this.contents.push(e),h=!1}break;default:{const e=s.default.endOfIndent(r,c),n=t({atLineStart:h,indent:-1,inFlow:!1,inCollection:!1,lineStart:a,parent:this},e);if(!n)return this.valueRange.end=e;this.contents.push(n),c=n.range.end,h=!1;const i=(0,ca.grabCollectionEndComments)(n);i&&Array.prototype.push.apply(this.contents,i)}}c=l.startCommentOrEndBlankLine(r,c)}if(this.valueRange.end=c,r[c]&&(this.documentEndMarker=new o.default(c,c+3),r[c+=3])){if("#"===r[c=s.default.endOfWhiteSpace(r,c)]){const e=new i.default;c=e.parse({src:r},c),this.contents.push(e)}switch(r[c]){case"\n":c+=1;break;case void 0:break;default:this.error=new sa.YAMLSyntaxError(this,"Document end marker line cannot have a non-comment suffix")}}return c}parse(e,t){e.root=this,this.context=e;const{src:n}=e;let i=65279===n.charCodeAt(t)?t+1:t;return i=this.parseDirectives(i),i=this.parseContents(i)}setOrigRanges(e,t){return t=super.setOrigRanges(e,t),this.directives.forEach(n=>{t=n.setOrigRanges(e,t)}),this.directivesEndMarker&&(t=this.directivesEndMarker.setOrigRange(e,t)),this.contents.forEach(n=>{t=n.setOrigRanges(e,t)}),this.documentEndMarker&&(t=this.documentEndMarker.setOrigRange(e,t)),t}toString(){const{contents:e,directives:t,value:n}=this;if(null!=n)return n;let i=t.join("");return e.length>0&&((t.length>0||e[0].type===ta.Type.COMMENT)&&(i+="---\n"),i+=e.join("")),"\n"!==i[i.length-1]&&(i+="\n"),i}}t.default=l}));no(da);var pa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{parse(e,t){this.context=e;const{src:r}=e;let s=n.default.endOfIdentifier(r,t+1);return this.valueRange=new i.default(t+1,s),s=n.default.endOfWhiteSpace(r,s),s=this.parseComment(s)}}t.default=s}));no(pa);var ua=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Chomp=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}const s={CLIP:"CLIP",KEEP:"KEEP",STRIP:"STRIP"};t.Chomp=s;class o extends n.default{constructor(e,t){super(e,t),this.blockIndent=null,this.chomping=s.CLIP,this.header=null}get includesTrailingLines(){return this.chomping===s.KEEP}get strValue(){if(!this.valueRange||!this.context)return null;let{start:e,end:t}=this.valueRange;const{indent:i,src:r}=this.context;if(this.valueRange.isEmpty())return"";let o=null,a=r[t-1];for(;"\n"===a||"\t"===a||" "===a;){if((t-=1)<=e){if(this.chomping===s.KEEP)break;return""}"\n"===a&&(o=t),a=r[t-1]}let l=t+1;o&&(this.chomping===s.KEEP?(l=o,t=this.valueRange.end):t=o);const c=i+this.blockIndent,h=this.type===ta.Type.BLOCK_FOLDED;let d=!0,p="",u="",f=!1;for(let i=e;i<t;++i){for(let e=0;e<c&&" "===r[i];++e)i+=1;const e=r[i];if("\n"===e)"\n"===u?p+="\n":u="\n";else{const s=n.default.endOfLine(r,i),o=r.slice(i,s);i=s,h&&(" "===e||"\t"===e)&&i<l?(" "===u?u="\n":f||d||"\n"!==u||(u="\n\n"),p+=u+o,u=s<t&&r[s]||"",f=!0):(p+=u+o,u=h&&i<l?" ":"\n",f=!1),d&&""!==o&&(d=!1)}}return this.chomping===s.STRIP?p:p+"\n"}parseBlockHeader(e){const{src:t}=this.context;let n=e+1,r="";for(;;){const o=t[n];switch(o){case"-":this.chomping=s.STRIP;break;case"+":this.chomping=s.KEEP;break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":r+=o;break;default:return this.blockIndent=Number(r)||null,this.header=new i.default(e,n),n}n+=1}}parseBlockValue(e){const{indent:t,src:r}=this.context;let o=e,a=e,l=this.blockIndent?t+this.blockIndent-1:t,c=1;for(let e=r[o];"\n"===e&&(o+=1,!n.default.atDocumentBoundary(r,o));e=r[o]){const e=n.default.endOfBlockIndent(r,l,o);if(null===e)break;if(!this.blockIndent){const n=e-(o+t);if("\n"!==r[e]){if(n<c){o-=1;break}this.blockIndent=n,l=t+this.blockIndent-1}else n>c&&(c=n)}o="\n"===r[e]?e:a=n.default.endOfLine(r,e)}return this.chomping!==s.KEEP&&(o=r[a]?a+1:a),this.valueRange=new i.default(e+1,o),o}parse(e,t){this.context=e;const{src:i}=e;let r=this.parseBlockHeader(t);return r=n.default.endOfWhiteSpace(i,r),r=this.parseComment(r),r=this.parseBlockValue(r)}setOrigRanges(e,t){return t=super.setOrigRanges(e,t),this.header?this.header.setOrigRange(e,t):t}}t.default=o}));no(ua);ua.Chomp;var fa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(oa),i=o(la),r=o(ra),s=o(ia);function o(e){return e&&e.__esModule?e:{default:e}}class a extends r.default{constructor(e,t){super(e,t),this.items=null}prevNodeIsJsonLike(e=this.items.length){const t=this.items[e-1];return!!t&&(t.jsonLike||t.type===ta.Type.COMMENT&&this.nodeIsJsonLike(e-1))}parse(e,t){this.context=e;const{parseNode:o,src:a}=e;let{indent:l,lineStart:c}=e,h=a[t];this.items=[{char:h,offset:t}];let d=r.default.endOfWhiteSpace(a,t+1);for(h=a[d];h&&"]"!==h&&"}"!==h;){switch(h){case"\n":if(c=d+1,"\n"===a[r.default.endOfWhiteSpace(a,c)]){const e=new n.default;c=e.parse({src:a},c),this.items.push(e)}if((d=r.default.endOfIndent(a,c))<=c+l&&(h=a[d],d<c+l||"]"!==h&&"}"!==h)){const e="Insufficient indentation in flow collection";this.error=new sa.YAMLSemanticError(this,e)}break;case",":this.items.push({char:h,offset:d}),d+=1;break;case"#":{const e=new i.default;d=e.parse({src:a},d),this.items.push(e)}break;case"?":case":":{const e=a[d+1];if("\n"===e||"\t"===e||" "===e||","===e||":"===h&&this.prevNodeIsJsonLike()){this.items.push({char:h,offset:d}),d+=1;break}}default:{const e=o({atLineStart:!1,inCollection:!1,inFlow:!0,indent:-1,lineStart:c,parent:this},d);if(!e)return this.valueRange=new s.default(t,d),d;this.items.push(e),d=r.default.normalizeOffset(a,e.range.end)}}h=a[d=r.default.endOfWhiteSpace(a,d)]}return this.valueRange=new s.default(t,d+1),h&&(this.items.push({char:h,offset:d}),d=r.default.endOfWhiteSpace(a,d+1),d=this.parseComment(d)),d}setOrigRanges(e,t){return t=super.setOrigRanges(e,t),this.items.forEach(n=>{if(n instanceof r.default)t=n.setOrigRanges(e,t);else if(0===e.length)n.origOffset=n.offset;else{let i=t;for(;i<e.length&&!(e[i]>n.offset);)++i;n.origOffset=n.offset+i,t=i}}),t}toString(){const{context:{src:e},items:t,range:n,value:i}=this;if(null!=i)return i;const s=t.filter(e=>e instanceof r.default);let o="",a=n.start;return s.forEach(t=>{const n=e.slice(a,t.range.start);a=t.range.end,"\n"===(o+=n+String(t))[o.length-1]&&"\n"!==e[a-1]&&"\n"===e[a]&&(a+=1)}),o+=e.slice(a,n.end),r.default.addStringTerminator(e,n.end,o)}}t.default=a}));no(fa);var ga=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{static endOfLine(e,t,n){let i=e[t],r=t;for(;i&&"\n"!==i&&(!n||"["!==i&&"]"!==i&&"{"!==i&&"}"!==i&&","!==i);){const t=e[r+1];if(":"===i&&(!t||"\n"===t||"\t"===t||" "===t||n&&","===t))break;if((" "===i||"\t"===i)&&"#"===t)break;r+=1,i=t}return r}get strValue(){if(!this.valueRange||!this.context)return null;let{start:e,end:t}=this.valueRange;const{src:i}=this.context;let r=i[t-1];for(;e<t&&("\n"===r||"\t"===r||" "===r);)r=i[--t-1];for(r=i[e];e<t&&("\n"===r||"\t"===r||" "===r);)r=i[++e];let s="";for(let r=e;r<t;++r){const e=i[r];if("\n"===e){const{fold:e,offset:t}=n.default.foldNewline(i,r,-1);s+=e,r=t}else if(" "===e||"\t"===e){const n=r;let o=i[r+1];for(;r<t&&(" "===o||"\t"===o);)o=i[(r+=1)+1];"\n"!==o&&(s+=r>n?i.slice(n,r+1):e)}else s+=e}return s}parseBlockValue(e){const{indent:t,inFlow:i,src:r}=this.context;let o=e,a=e;for(let e=r[o];"\n"===e&&!n.default.atDocumentBoundary(r,o+1);e=r[o]){const e=n.default.endOfBlockIndent(r,t,o+1);if(null===e||"#"===r[e])break;o="\n"===r[e]?e:a=s.endOfLine(r,e,i)}return this.valueRange.isEmpty()&&(this.valueRange.start=e),this.valueRange.end=a,a}parse(e,t){this.context=e;const{inFlow:r,src:o}=e;let a=t;const l=o[a];return l&&"#"!==l&&"\n"!==l&&(a=s.endOfLine(o,t,r)),this.valueRange=new i.default(t,a),a=n.default.endOfWhiteSpace(o,a),a=this.parseComment(a),this.hasComment&&!this.valueRange.isEmpty()||(a=this.parseBlockValue(a)),a}}t.default=s}));no(ga);var ma=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{static endOfQuote(e,t){let n=e[t];for(;n&&'"'!==n;)n=e[t+="\\"===n?2:1];return t+1}get strValue(){if(!this.valueRange||!this.context)return null;const e=[],{start:t,end:i}=this.valueRange,{indent:r,src:s}=this.context;'"'!==s[i-1]&&e.push(new sa.YAMLSyntaxError(this,'Missing closing "quote'));let o="";for(let a=t+1;a<i-1;++a){const t=s[a];if("\n"===t){n.default.atDocumentBoundary(s,a+1)&&e.push(new sa.YAMLSemanticError(this,"Document boundary indicators are not allowed within string values"));const{fold:t,offset:i,error:l}=n.default.foldNewline(s,a,r);o+=t,a=i,l&&e.push(new sa.YAMLSemanticError(this,"Multi-line double-quoted string needs to be sufficiently indented"))}else if("\\"===t)switch(s[a+=1]){case"0":o+="\0";break;case"a":o+="";break;case"b":o+="\b";break;case"e":o+="";break;case"f":o+="\f";break;case"n":o+="\n";break;case"r":o+="\r";break;case"t":o+="\t";break;case"v":o+="\v";break;case"N":o+="";break;case"_":o+=" ";break;case"L":o+="\u2028";break;case"P":o+="\u2029";break;case" ":o+=" ";break;case'"':o+='"';break;case"/":o+="/";break;case"\\":o+="\\";break;case"\t":o+="\t";break;case"x":o+=this.parseCharCode(a+1,2,e),a+=2;break;case"u":o+=this.parseCharCode(a+1,4,e),a+=4;break;case"U":o+=this.parseCharCode(a+1,8,e),a+=8;break;case"\n":for(;" "===s[a+1]||"\t"===s[a+1];)a+=1;break;default:e.push(new sa.YAMLSyntaxError(this,`Invalid escape sequence ${s.substr(a-1,2)}`)),o+="\\"+s[a]}else if(" "===t||"\t"===t){const e=a;let n=s[a+1];for(;" "===n||"\t"===n;)n=s[(a+=1)+1];"\n"!==n&&(o+=a>e?s.slice(e,a+1):t)}else o+=t}return e.length>0?{errors:e,str:o}:o}parseCharCode(e,t,n){const{src:i}=this.context,r=i.substr(e,t),s=r.length===t&&/^[0-9a-fA-F]+$/.test(r)?parseInt(r,16):NaN;return isNaN(s)?(n.push(new sa.YAMLSyntaxError(this,`Invalid escape sequence ${i.substr(e-2,t+2)}`)),i.substr(e-2,t+2)):String.fromCodePoint(s)}parse(e,t){this.context=e;const{src:r}=e;let o=s.endOfQuote(r,t+1);return this.valueRange=new i.default(t,o),o=n.default.endOfWhiteSpace(r,o),o=this.parseComment(o)}}t.default=s}));no(ma);var va=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(ra),i=r(ia);function r(e){return e&&e.__esModule?e:{default:e}}class s extends n.default{static endOfQuote(e,t){let n=e[t];for(;n;)if("'"===n){if("'"!==e[t+1])break;n=e[t+=2]}else n=e[t+=1];return t+1}get strValue(){if(!this.valueRange||!this.context)return null;const e=[],{start:t,end:i}=this.valueRange,{indent:r,src:s}=this.context;"'"!==s[i-1]&&e.push(new sa.YAMLSyntaxError(this,"Missing closing 'quote"));let o="";for(let a=t+1;a<i-1;++a){const t=s[a];if("\n"===t){n.default.atDocumentBoundary(s,a+1)&&e.push(new sa.YAMLSemanticError(this,"Document boundary indicators are not allowed within string values"));const{fold:t,offset:i,error:l}=n.default.foldNewline(s,a,r);o+=t,a=i,l&&e.push(new sa.YAMLSemanticError(this,"Multi-line single-quoted string needs to be sufficiently indented"))}else if("'"===t)o+=t,"'"!==s[a+=1]&&e.push(new sa.YAMLSyntaxError(this,"Unescaped single quote? This should not happen."));else if(" "===t||"\t"===t){const e=a;let n=s[a+1];for(;" "===n||"\t"===n;)n=s[(a+=1)+1];"\n"!==n&&(o+=a>e?s.slice(e,a+1):t)}else o+=t}return e.length>0?{errors:e,str:o}:o}parse(e,t){this.context=e;const{src:r}=e;let o=s.endOfQuote(r,t+1);return this.valueRange=new i.default(t,o),o=n.default.endOfWhiteSpace(r,o),o=this.parseComment(o)}}t.default=s}));no(va);var ya=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=p(pa),i=p(ua),r=p(ca),s=p(aa),o=p(fa),a=p(ra),l=p(ga),c=p(ma),h=p(va),d=p(ia);function p(e){return e&&e.__esModule?e:{default:e}}class u{static parseType(e,t,n){switch(e[t]){case"*":return ta.Type.ALIAS;case">":return ta.Type.BLOCK_FOLDED;case"|":return ta.Type.BLOCK_LITERAL;case"{":return ta.Type.FLOW_MAP;case"[":return ta.Type.FLOW_SEQ;case"?":return!n&&a.default.atBlank(e,t+1,!0)?ta.Type.MAP_KEY:ta.Type.PLAIN;case":":return!n&&a.default.atBlank(e,t+1,!0)?ta.Type.MAP_VALUE:ta.Type.PLAIN;case"-":return!n&&a.default.atBlank(e,t+1,!0)?ta.Type.SEQ_ITEM:ta.Type.PLAIN;case'"':return ta.Type.QUOTE_DOUBLE;case"'":return ta.Type.QUOTE_SINGLE;default:return ta.Type.PLAIN}}constructor(e={},{atLineStart:t,inCollection:p,inFlow:f,indent:g,lineStart:m,parent:v}={}){var y,_,b;b=(e,t)=>{if(a.default.atDocumentBoundary(this.src,t))return null;const p=new u(this,e),{props:f,type:g,valueStart:m}=p.parseProps(t);let v;switch(g){case ta.Type.ALIAS:v=new n.default(g,f);break;case ta.Type.BLOCK_FOLDED:case ta.Type.BLOCK_LITERAL:v=new i.default(g,f);break;case ta.Type.FLOW_MAP:case ta.Type.FLOW_SEQ:v=new o.default(g,f);break;case ta.Type.MAP_KEY:case ta.Type.MAP_VALUE:case ta.Type.SEQ_ITEM:v=new s.default(g,f);break;case ta.Type.COMMENT:case ta.Type.PLAIN:v=new l.default(g,f);break;case ta.Type.QUOTE_DOUBLE:v=new c.default(g,f);break;case ta.Type.QUOTE_SINGLE:v=new h.default(g,f);break;default:return v.error=new sa.YAMLSyntaxError(v,`Unknown node type: ${JSON.stringify(g)}`),v.range=new d.default(t,t+1),v}let y=v.parse(p,m);if(v.range=new d.default(t,y),y<=t&&(v.error=new Error("Node#parse consumed no characters"),v.error.parseEnd=y,v.error.source=v,v.range.end=t+1),p.nodeStartsCollection(v)){v.error||p.atLineStart||p.parent.type!==ta.Type.DOCUMENT||(v.error=new sa.YAMLSyntaxError(v,"Block collection must not have preceding content here (e.g. directives-end indicator)"));const e=new r.default(v);return y=e.parse(new u(p),y),e.range=new d.default(t,y),e}return v},(_="parseNode")in(y=this)?Object.defineProperty(y,_,{value:b,enumerable:!0,configurable:!0,writable:!0}):y[_]=b,this.atLineStart=null!=t?t:e.atLineStart||!1,this.inCollection=null!=p?p:e.inCollection||!1,this.inFlow=null!=f?f:e.inFlow||!1,this.indent=null!=g?g:e.indent,this.lineStart=null!=m?m:e.lineStart,this.parent=null!=v?v:e.parent||{},this.root=e.root,this.src=e.src}get pretty(){const e={start:`${this.lineStart} + ${this.indent}`,in:[],parent:this.parent.type};return this.atLineStart||(e.start+=" + N"),this.inCollection&&e.in.push("collection"),this.inFlow&&e.in.push("flow"),e}nodeStartsCollection(e){const{inCollection:t,inFlow:n,src:i}=this;if(t||n)return!1;if(e instanceof s.default)return!0;let r=e.range.end;return"\n"!==i[r]&&"\n"!==i[r-1]&&":"===i[r=a.default.endOfWhiteSpace(i,r)]}parseProps(e){const{inFlow:t,parent:n,src:i}=this,r=[];let s=!1,o=i[e=a.default.endOfWhiteSpace(i,e)];for(;o===ta.Char.ANCHOR||o===ta.Char.COMMENT||o===ta.Char.TAG||"\n"===o;){if("\n"===o){const t=e+1,r=a.default.endOfIndent(i,t),o=r-(t+this.indent),l=n.type===ta.Type.SEQ_ITEM&&n.context.atLineStart;if(!a.default.nextNodeIsIndented(i[r],o,!l))break;this.atLineStart=!0,this.lineStart=t,s=!1,e=r}else if(o===ta.Char.COMMENT){const t=a.default.endOfLine(i,e+1);r.push(new d.default(e,t)),e=t}else{let t=a.default.endOfIdentifier(i,e+1);o===ta.Char.TAG&&","===i[t]&&/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+,\d\d\d\d(-\d\d){0,2}\/\S/.test(i.slice(e+1,t+13))&&(t=a.default.endOfIdentifier(i,t+5)),r.push(new d.default(e,t)),s=!0,e=a.default.endOfWhiteSpace(i,t)}o=i[e]}return s&&":"===o&&a.default.atBlank(i,e+1,!0)&&(e-=1),{props:r,type:u.parseType(i,e,t),valueStart:e}}}t.default=u}));no(ya);var _a=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t=[];-1!==e.indexOf("\r")&&(e=e.replace(/\r\n?/g,(e,n)=>(e.length>1&&t.push(n),"\n")));const r=[];let s=0;do{const t=new n.default,o=new i.default({src:e});s=t.parse(o,s),r.push(t)}while(s<e.length);return r.setOrigRanges=()=>{if(0===t.length)return!1;for(let e=1;e<t.length;++e)t[e]-=e;let e=0;for(let n=0;n<r.length;++n)e=r[n].setOrigRanges(t,e);return t.splice(0,t.length),!0},r.toString=()=>r.join("...\n"),r};var n=r(da),i=r(ya);function r(e){return e&&e.__esModule?e:{default:e}}}));no(_a);var ba=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.addCommentBefore=function(e,t,n){if(!n)return e;return`#${n.replace(/[\s\S]^/gm,`$&${t}#`)}\n${t}${e}`},t.default=function(e,t,n){return n?-1===n.indexOf("\n")?`${e} #${n}`:`${e}\n`+n.replace(/^/gm,`${t||""}#`):e}}));no(ba);ba.addCommentBefore;var wa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function e(t,n,i){if(Array.isArray(t))return t.map((t,n)=>e(t,String(n),i));if(t&&"function"==typeof t.toJSON){const e=i&&i.anchors&&i.anchors.find(e=>e.node===t);e&&(i.onCreate=t=>{e.res=t,delete i.onCreate});const r=t.toJSON(n,i);return e&&i.onCreate&&i.onCreate(r),r}return t}}));no(wa);var za=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class{}}));no(za);var xa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(wa),i=r(za);function r(e){return e&&e.__esModule?e:{default:e}}class s extends i.default{constructor(e){super(),this.value=e}toJSON(e,t){return t&&t.keep?this.value:(0,n.default)(this.value,e,t)}toString(){return String(this.value)}}t.default=s}));no(xa);var Sa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(ba),i=a(wa),r=a(ka),s=a(za),o=a(xa);function a(e){return e&&e.__esModule?e:{default:e}}const l=(e,t,n)=>null===t?"":"object"!=typeof t?String(t):e instanceof s.default&&n&&n.doc?e.toString({anchors:{},doc:n.doc,indent:"",inFlow:!0,inStringifyKey:!0}):JSON.stringify(t);class c extends s.default{constructor(e,t=null){super(),this.key=e,this.value=t,this.type="PAIR"}get commentBefore(){return this.key&&this.key.commentBefore}set commentBefore(e){null==this.key&&(this.key=new o.default(null)),this.key.commentBefore=e}addToJSMap(e,t){const n=(0,i.default)(this.key,"",e);if(t instanceof Map){const r=(0,i.default)(this.value,n,e);t.set(n,r)}else if(t instanceof Set)t.add(n);else{const r=l(this.key,n,e);t[r]=(0,i.default)(this.value,r,e)}return t}toJSON(e,t){const n=t&&t.mapAsMap?new Map:{};return this.addToJSMap(t,n)}toString(e,t,i){if(!e||!e.doc)return JSON.stringify(this);const{simpleKeys:o}=e.doc.options;let{key:a,value:l}=this,c=a instanceof s.default&&a.comment;if(o){if(c)throw new Error("With simple keys, key nodes cannot have comments");if(a instanceof r.default){throw new Error("With simple keys, collection cannot be used as a key value")}}const h=!o&&(!a||c||a instanceof r.default||a.type===ta.Type.BLOCK_FOLDED||a.type===ta.Type.BLOCK_LITERAL),{doc:d,indent:p}=e;e=Object.assign({},e,{implicitKey:!h,indent:p+"  "});let u=!1,f=d.schema.stringify(a,e,()=>c=null,()=>u=!0);if(f=(0,n.default)(f,e.indent,c),e.allNullValues&&!o)return this.comment?(f=(0,n.default)(f,e.indent,this.comment),t&&t()):u&&!c&&i&&i(),e.inFlow?f:`? ${f}`;f=h?`? ${f}\n${p}:`:`${f}:`,this.comment&&(f=(0,n.default)(f,e.indent,this.comment),t&&t());let g="",m=null;if(l instanceof s.default){if(l.spaceBefore&&(g="\n"),l.commentBefore){g+=`\n${l.commentBefore.replace(/^/gm,`${e.indent}#`)}`}m=l.comment}else l&&"object"==typeof l&&(l=d.schema.createNode(l,!0));e.implicitKey=!1,u=!1;const v=d.schema.stringify(l,e,()=>m=null,()=>u=!0);let y=" ";if(g||this.comment)y=`${g}\n${e.indent}`;else if(!h&&l instanceof r.default){("["===v[0]||"{"===v[0])&&!v.includes("\n")||(y=`\n${e.indent}`)}return u&&!m&&i&&i(),(0,n.default)(f+y+v,e.indent,m)}}t.default=c}));no(Sa);var ka=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.isEmptyPath=void 0;var n=o(ba),i=o(za),r=o(Sa),s=o(xa);function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const l=e=>null==e||"object"==typeof e&&e[Symbol.iterator]().next().done;t.isEmptyPath=l;class c extends i.default{constructor(...e){super(...e),a(this,"items",[])}addIn(e,t){if(l(e))this.add(t);else{const[n,...i]=e,r=this.get(n,!0);if(!(r instanceof c))throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`);r.addIn(i,t)}}deleteIn([e,...t]){if(0===t.length)return this.delete(e);const n=this.get(e,!0);if(n instanceof c)return n.deleteIn(t);throw new Error(`Expected YAML collection at ${e}. Remaining path: ${t}`)}getIn([e,...t],n){const i=this.get(e,!0);return 0===t.length?!n&&i instanceof s.default?i.value:i:i instanceof c?i.getIn(t,n):void 0}hasAllNullValues(){return this.items.every(e=>{if(!(e instanceof r.default))return!1;const t=e.value;return null==t||t instanceof s.default&&null==t.value&&!t.commentBefore&&!t.comment&&!t.tag})}hasIn([e,...t]){if(0===t.length)return this.has(e);const n=this.get(e,!0);return n instanceof c&&n.hasIn(t)}setIn([e,...t],n){if(0===t.length)this.set(e,n);else{const i=this.get(e,!0);if(!(i instanceof c))throw new Error(`Expected YAML collection at ${e}. Remaining path: ${t}`);i.setIn(t,n)}}toJSON(){return null}toString(e,{blockItem:t,flowChars:i,isMap:r,itemIndent:s},o,a){const{doc:l,indent:h}=e,d=this.type&&"FLOW"===this.type.substr(0,4)||e.inFlow;d&&(s+="  ");const p=r&&this.hasAllNullValues();e=Object.assign({},e,{allNullValues:p,indent:s,inFlow:d,type:null});let u=!1,f=!1;const g=this.items.reduce((t,i,r)=>{let o;i&&(!u&&i.spaceBefore&&t.push({type:"comment",str:""}),i.commentBefore&&i.commentBefore.match(/^.*$/gm).forEach(e=>{t.push({type:"comment",str:`#${e}`})}),i.comment&&(o=i.comment),d&&(!u&&i.spaceBefore||i.commentBefore||i.comment||i.key&&(i.key.commentBefore||i.key.comment)||i.value&&(i.value.commentBefore||i.value.comment))&&(f=!0)),u=!1;let a=l.schema.stringify(i,e,()=>o=null,()=>u=!0);return d&&!f&&a.includes("\n")&&(f=!0),d&&r<this.items.length-1&&(a+=","),a=(0,n.default)(a,s,o),u&&(o||d)&&(u=!1),t.push({type:"item",str:a}),t},[]);let m;if(0===g.length)m=i.start+i.end;else if(d){const{start:e,end:t}=i,n=g.map(e=>e.str);if(f||n.reduce((e,t)=>e+t.length+2,2)>c.maxFlowStringSingleLineLength){m=e;for(const e of n)m+=e?`\n  ${h}${e}`:"\n";m+=`\n${h}${t}`}else m=`${e} ${n.join(" ")} ${t}`}else{const e=g.map(t);m=e.shift();for(const t of e)m+=t?`\n${h}${t}`:"\n"}return this.comment?(m+="\n"+this.comment.replace(/^/gm,`${h}#`),o&&o()):u&&a&&a(),m}}t.default=c,a(c,"maxFlowStringSingleLineLength",60)}));no(ka);ka.isEmptyPath;var Ma=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(wa),i=o(ka),r=o(za),s=o(Sa);function o(e){return e&&e.__esModule?e:{default:e}}const a=(e,t)=>{if(e instanceof l){const n=t.find(t=>t.node===e.source);return n.count*n.aliasCount}if(e instanceof i.default){let n=0;for(const i of e.items){const e=a(i,t);e>n&&(n=e)}return n}if(e instanceof s.default){const n=a(e.key,t),i=a(e.value,t);return Math.max(n,i)}return 1};class l extends r.default{static stringify({range:e,source:t},{anchors:n,doc:i,implicitKey:r,inStringifyKey:s}){let o=Object.keys(n).find(e=>n[e]===t);if(!o&&s&&(o=i.anchors.getName(t)||i.anchors.newName()),o)return`*${o}${r?" ":""}`;const a=i.anchors.getName(t)?"Alias node must be after source node":"Source node not found for alias node";throw new Error(`${a} [${e}]`)}constructor(e){super(),this.source=e,this.type=ta.Type.ALIAS}set tag(e){throw new Error("Alias nodes cannot have tags")}toJSON(e,t){if(!t)return(0,n.default)(this.source,e,t);const{anchors:i,maxAliasCount:r}=t,s=i.find(e=>e.node===this.source);if(!s||void 0===s.res){const e="This should not happen: Alias anchor was not resolved?";throw this.cstNode?new sa.YAMLReferenceError(this.cstNode,e):new ReferenceError(e)}if(r>=0&&(s.count+=1,0===s.aliasCount&&(s.aliasCount=a(this.source,i)),s.count*s.aliasCount>r)){const e="Excessive alias count indicates a resource exhaustion attack";throw this.cstNode?new sa.YAMLReferenceError(this.cstNode,e):new ReferenceError(e)}return s.res}toString(e){return l.stringify(this,e)}}var c,h,d;t.default=l,d=!0,(h="default")in(c=l)?Object.defineProperty(c,h,{value:d,enumerable:!0,configurable:!0,writable:!0}):c[h]=d}));no(Ma);var Ca=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.findPair=o,t.default=void 0;var n=s(ka),i=s(Sa),r=s(xa);function s(e){return e&&e.__esModule?e:{default:e}}function o(e,t){const n=t instanceof r.default?t.value:t;for(const r of e)if(r instanceof i.default){if(r.key===t||r.key===n)return r;if(r.key&&r.key.value===n)return r}}class a extends n.default{add(e){if(e?e instanceof i.default||(e=new i.default(e.key||e,e.value)):e=new i.default(e),o(this.items,e.key))throw new Error(`Key ${e.key} already set`);this.items.push(e)}delete(e){const t=o(this.items,e);return!!t&&this.items.splice(this.items.indexOf(t),1).length>0}get(e,t){const n=o(this.items,e),i=n&&n.value;return!t&&i instanceof r.default?i.value:i}has(e){return!!o(this.items,e)}set(e,t){const n=o(this.items,e);n?n.value=t:this.items.push(new i.default(e,t))}toJSON(e,t,n){const i=n?new n:t&&t.mapAsMap?new Map:{};t&&t.onCreate&&t.onCreate(i);for(const e of this.items)e.addToJSMap(t,i);return i}toString(e,t,n){if(!e)return JSON.stringify(this);for(const e of this.items)if(!(e instanceof i.default))throw new Error(`Map items must all be pairs; found ${JSON.stringify(e)} instead`);return super.toString(e,{blockItem:e=>e.str,flowChars:{start:"{",end:"}"},isMap:!0,itemIndent:e.indent||""},t,n)}}t.default=a}));no(Ca);Ca.findPair;var Aa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(wa),i=s(ka),r=s(xa);function s(e){return e&&e.__esModule?e:{default:e}}function o(e){let t=e instanceof r.default?e.value:e;return t&&"string"==typeof t&&(t=Number(t)),Number.isInteger(t)&&t>=0?t:null}class a extends i.default{add(e){this.items.push(e)}delete(e){const t=o(e);return"number"==typeof t&&this.items.splice(t,1).length>0}get(e,t){const n=o(e);if("number"!=typeof n)return;const i=this.items[n];return!t&&i instanceof r.default?i.value:i}has(e){const t=o(e);return"number"==typeof t&&t<this.items.length}set(e,t){const n=o(e);if("number"!=typeof n)throw new Error(`Expected a valid index, not ${e}.`);this.items[n]=t}toJSON(e,t){const i=[];t&&t.onCreate&&t.onCreate(i);let r=0;for(const e of this.items)i.push((0,n.default)(e,String(r++),t));return i}toString(e,t,n){return e?super.toString(e,{blockItem:e=>"comment"===e.type?e.str:`- ${e.str}`,flowChars:{start:"[",end:"]"},isMap:!1,itemIndent:(e.indent||"")+"  "},t,n):JSON.stringify(this)}}t.default=a}));no(Aa);var Ea=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.MERGE_KEY=void 0;var n=o(Ca),i=o(Sa),r=o(xa),s=o(Aa);function o(e){return e&&e.__esModule?e:{default:e}}const a="<<";t.MERGE_KEY=a;class l extends i.default{constructor(e){if(e instanceof i.default){let t=e.value;t instanceof s.default||((t=new s.default).items.push(e.value),t.range=e.value.range),super(e.key,t),this.range=e.range}else super(new r.default(a),new s.default);this.type="MERGE_PAIR"}addToJSMap(e,t){for(const{source:i}of this.value.items){if(!(i instanceof n.default))throw new Error("Merge sources must be maps");const r=i.toJSON(null,e,Map);for(const[e,n]of r)t instanceof Map?t.has(e)||t.set(e,n):t instanceof Set?t.add(e):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=n)}return t}toString(e,t){const n=this.value;if(n.items.length>1)return super.toString(e,t);this.value=n.items[0];const i=super.toString(e,t);return this.value=n,i}}t.default=l}));no(Ea);Ea.MERGE_KEY;var La=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(Ma),i=a(Ca),r=a(Ea),s=a(xa),o=a(Aa);function a(e){return e&&e.__esModule?e:{default:e}}class l{static validAnchorNode(e){return e instanceof s.default||e instanceof o.default||e instanceof i.default}constructor(e){var t,n,i;i={},(n="map")in(t=this)?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i,this.prefix=e}createAlias(e,t){return this.setAnchor(e,t),new n.default(e)}createMergePair(...e){const t=new r.default;return t.value.items=e.map(e=>{if(e instanceof n.default){if(e.source instanceof i.default)return e}else if(e instanceof i.default)return this.createAlias(e);throw new Error("Merge sources must be Map nodes or their Aliases")}),t}getName(e){const{map:t}=this;return Object.keys(t).find(n=>t[n]===e)}getNode(e){return this.map[e]}newName(e){e||(e=this.prefix);const t=Object.keys(this.map);for(let n=1;;++n){const i=`${e}${n}`;if(!t.includes(i))return i}}resolveNodes(){const{map:e,_cstAliases:t}=this;Object.keys(e).forEach(t=>{e[t]=e[t].resolved}),t.forEach(e=>{e.source=e.source.resolved}),delete this._cstAliases}setAnchor(e,t){if(null!=e&&!l.validAnchorNode(e))throw new Error("Anchors may only be set for Scalar, Seq and Map nodes");if(t&&/[\x00-\x19\s,[\]{}]/.test(t))throw new Error("Anchor names must not contain whitespace or control characters");const{map:n}=this,i=e&&Object.keys(n).find(t=>n[t]===e);if(i){if(!t)return i;i!==t&&(delete n[i],n[t]=e)}else{if(!t){if(!e)return null;t=this.newName()}n[t]=e}return t}}t.default=l}));no(La);var Ta=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(ka),i=s(Sa),r=s(xa);function s(e){return e&&e.__esModule?e:{default:e}}const o=(e,t)=>{if(e&&"object"==typeof e){const{tag:s}=e;e instanceof n.default?(s&&(t[s]=!0),e.items.forEach(e=>o(e,t))):e instanceof i.default?(o(e.key,t),o(e.value,t)):e instanceof r.default&&s&&(t[s]=!0)}return t};t.default=e=>Object.keys(o(e,{}))}));no(Ta);var Oa=io((function(e,t){function n(e,t){if(to&&to._YAML_SILENCE_WARNINGS)return;const{emitWarning:n}=to&&to.process;n?n(e,t):console.warn(t?`${t}: ${e}`:e)}Object.defineProperty(t,"__esModule",{value:!0}),t.warn=n,t.warnFileDeprecation=function(e){if(to&&to._YAML_SILENCE_DEPRECATION_WARNINGS)return;n(`The endpoint 'yaml/${e.replace(/.*yaml[/\\]/i,"").replace(/\.js$/,"").replace(/\\/g,"/")}' will be removed in a future release.`,"DeprecationWarning")},t.warnOptionDeprecation=function(e,t){if(to&&to._YAML_SILENCE_DEPRECATION_WARNINGS)return;if(i[e])return;i[e]=!0;let r=`The option '${e}' will be removed in a future release`;n(r+=t?`, use '${t}' instead.`:".","DeprecationWarning")};const i={}}));no(Oa);Oa.warn,Oa.warnFileDeprecation,Oa.warnOptionDeprecation;var Ha=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,s,{indentAtStart:o,lineWidth:a=80,minContentWidth:l=20,onFold:c,onOverflow:h}){if(!a||a<0)return e;const d=Math.max(1+l,1+a-t.length);if(e.length<=d)return e;const p=[],u={};let f,g=a-("number"==typeof o?o:t.length),m=void 0,v=void 0,y=!1,_=-1;s===n&&-1!==(_=r(e,_))&&(g=_+d);for(;f=e[_+=1];){if(s===i&&"\\"===f)switch(e[_+1]){case"x":_+=3;break;case"u":_+=5;break;case"U":_+=9;break;default:_+=1}if("\n"===f)s===n&&(_=r(e,_)),g=_+d,m=void 0;else{if(" "===f&&v&&" "!==v&&"\n"!==v&&"\t"!==v){const t=e[_+1];t&&" "!==t&&"\n"!==t&&"\t"!==t&&(m=_)}if(_>=g)if(m)p.push(m),g=m+d,m=void 0;else if(s===i){for(;" "===v||"\t"===v;)v=f,f=e[_+=1],y=!0;p.push(_-2),u[_-2]=!0,g=_-2+d,m=void 0}else y=!0}v=f}y&&h&&h();if(0===p.length)return e;c&&c();let b=e.slice(0,p[0]);for(let n=0;n<p.length;++n){const r=p[n],o=p[n+1]||e.length;s===i&&u[r]&&(b+=`${e[r]}\\`),b+=`\n${t}${e.slice(r+1,o)}`}return b},t.FOLD_QUOTED=t.FOLD_BLOCK=t.FOLD_FLOW=void 0;t.FOLD_FLOW="flow";const n="block";t.FOLD_BLOCK=n;const i="quoted";t.FOLD_QUOTED=i;const r=(e,t)=>{let n=e[t+1];for(;" "===n||"\t"===n;){do{n=e[t+=1]}while(n&&"\n"!==n);n=e[t+1]}return t}}));no(Ha);Ha.FOLD_QUOTED,Ha.FOLD_BLOCK,Ha.FOLD_FLOW;var Pa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.strOptions=t.nullOptions=t.boolOptions=t.binaryOptions=void 0;const n={defaultType:ta.Type.BLOCK_LITERAL,lineWidth:76};t.binaryOptions=n;t.boolOptions={trueStr:"true",falseStr:"false"};t.nullOptions={nullStr:"null"};const i={defaultType:ta.Type.PLAIN,doubleQuoted:{jsonEncoding:!1,minMultiLineLength:40},fold:{lineWidth:80,minContentWidth:20}};t.strOptions=i}));no(Pa);Pa.strOptions,Pa.nullOptions,Pa.boolOptions,Pa.binaryOptions;var Na=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.stringifyNumber=function({format:e,minFractionDigits:t,tag:n,value:i}){if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let r=JSON.stringify(i);if(!e&&t&&(!n||"tag:yaml.org,2002:float"===n)&&/^\d/.test(r)){let e=r.indexOf(".");e<0&&(e=r.length,r+=".");let n=t-(r.length-e-1);for(;n-- >0;)r+="0"}return r},t.stringifyString=function(e,t,i,a){const{defaultType:l}=Pa.strOptions,{implicitKey:c,inFlow:h}=t;let{type:d,value:p}=e;"string"!=typeof p&&(p=String(p),e=Object.assign({},e,{value:p}));const u=l=>{switch(l){case ta.Type.BLOCK_FOLDED:case ta.Type.BLOCK_LITERAL:return o(e,t,i,a);case ta.Type.QUOTE_DOUBLE:return r(p,t);case ta.Type.QUOTE_SINGLE:return s(p,t);case ta.Type.PLAIN:return function(e,t,i,a){const{comment:l,type:c,value:h}=e,{actualString:d,implicitKey:p,indent:u,inFlow:f,tags:g}=t;if(p&&/[\n[\]{},]/.test(h)||f&&/[[\]{},]/.test(h))return r(h,t);if(!h||/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(h))return p||f||-1===h.indexOf("\n")?-1!==h.indexOf('"')&&-1===h.indexOf("'")?s(h,t):r(h,t):o(e,t,i,a);if(!p&&!f&&c!==ta.Type.PLAIN&&-1!==h.indexOf("\n"))return o(e,t,i,a);const m=h.replace(/\n+/g,`$&\n${u}`);if(d&&"string"!=typeof g.resolveScalar(m).value)return r(h,t);const v=p?m:(0,n.default)(m,u,n.FOLD_FLOW,Pa.strOptions.fold);if(l&&!f&&(-1!==v.indexOf("\n")||-1!==l.indexOf("\n")))return i&&i(),(0,ba.addCommentBefore)(v,u,l);return v}(e,t,i,a);default:return null}};d!==ta.Type.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(p)?d=ta.Type.QUOTE_DOUBLE:!c&&!h||d!==ta.Type.BLOCK_FOLDED&&d!==ta.Type.BLOCK_LITERAL||(d=ta.Type.QUOTE_DOUBLE);let f=u(d);if(null===f&&null===(f=u(l)))throw new Error(`Unsupported default string type ${l}`);return f};var n=function(e){if(e&&e.__esModule)return e;var t=i();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=r?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(n,s,o):n[s]=e[s]}}n.default=e,t&&t.set(e,n);return n}(Ha);function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function r(e,{implicitKey:t,indent:i}){const{jsonEncoding:r,minMultiLineLength:s}=Pa.strOptions.doubleQuoted,o=JSON.stringify(e);if(r)return o;let a="",l=0;for(let e=0,n=o[e];n;n=o[++e])if(" "===n&&"\\"===o[e+1]&&"n"===o[e+2]&&(a+=o.slice(l,e)+"\\ ",l=e+=1,n="\\"),"\\"===n)switch(o[e+1]){case"u":{a+=o.slice(l,e);const t=o.substr(e+2,4);switch(t){case"0000":a+="\\0";break;case"0007":a+="\\a";break;case"000b":a+="\\v";break;case"001b":a+="\\e";break;case"0085":a+="\\N";break;case"00a0":a+="\\_";break;case"2028":a+="\\L";break;case"2029":a+="\\P";break;default:"00"===t.substr(0,2)?a+="\\x"+t.substr(2):a+=o.substr(e,6)}l=(e+=5)+1}break;case"n":if(t||'"'===o[e+2]||o.length<s)e+=1;else{for(a+=o.slice(l,e)+"\n\n";"\\"===o[e+2]&&"n"===o[e+3]&&'"'!==o[e+4];)a+="\n",e+=2;a+=i," "===o[e+2]&&(a+="\\"),l=(e+=1)+1}break;default:e+=1}return a=l?a+o.slice(l):o,t?a:(0,n.default)(a,i,n.FOLD_QUOTED,Pa.strOptions.fold)}function s(e,t){const{indent:i,implicitKey:s}=t;if(s){if(/\n/.test(e))return r(e,t)}else if(/[ \t]\n|\n[ \t]/.test(e))return r(e,t);const o="'"+e.replace(/'/g,"''").replace(/\n+/g,`$&\n${i}`)+"'";return s?o:(0,n.default)(o,i,n.FOLD_FLOW,Pa.strOptions.fold)}function o({comment:e,type:t,value:i},s,o,a){if(/\n[\t ]+$/.test(i)||/^\s*$/.test(i))return r(i,s);const l=s.indent||(s.forceBlockIndent?" ":""),c=l?"2":"1",h=t!==ta.Type.BLOCK_FOLDED&&(t===ta.Type.BLOCK_LITERAL||!function(e,t){const n=e.length;if(n<=t)return!1;for(let i=0,r=0;i<n;++i)if("\n"===e[i]){if(i-r>t)return!0;if(n-(r=i+1)<=t)return!1}return!0}(i,Pa.strOptions.fold.lineWidth-l.length));let d=h?"|":">";if(!i)return d+"\n";let p="",u="";if(i=i.replace(/[\n\t ]*$/,e=>{const t=e.indexOf("\n");return-1===t?d+="-":i!==e&&t===e.length-1||(d+="+",a&&a()),u=e.replace(/\n$/,""),""}).replace(/^[\n ]*/,e=>{-1!==e.indexOf(" ")&&(d+=c);const t=e.match(/ +$/);return t?(p=e.slice(0,-t[0].length),t[0]):(p=e,"")}),u&&(u=u.replace(/\n+(?!\n|$)/g,`$&${l}`)),p&&(p=p.replace(/\n+/g,`$&${l}`)),e&&(d+=" #"+e.replace(/ ?[\r\n]+/g," "),o&&o()),!i)return`${d}${c}\n${l}${u}`;if(h)return i=i.replace(/\n+/g,`$&${l}`),`${d}\n${l}${p}${i}${u}`;i=i.replace(/\n+/g,"\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);const f=(0,n.default)(`${p}${i}${u}`,l,n.FOLD_BLOCK,Pa.strOptions.fold);return`${d}\n${l}${f}`}}));no(Na);Na.stringifyNumber,Na.stringifyString;var Va=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.checkFlowCollectionEnd=function(e,t){let n,i,r;switch(t.type){case ta.Type.FLOW_MAP:n="}",i="flow map";break;case ta.Type.FLOW_SEQ:n="]",i="flow sequence";break;default:return void e.push(new sa.YAMLSemanticError(t,"Not a flow collection!?"))}for(let e=t.items.length-1;e>=0;--e){const n=t.items[e];if(!n||n.type!==ta.Type.COMMENT){r=n;break}}if(r&&r.char!==n){const s=`Expected ${i} to end with ${n}`;let o;"number"==typeof r.offset?(o=new sa.YAMLSemanticError(t,s)).offset=r.offset+1:(o=new sa.YAMLSemanticError(r,s),r.range&&r.range.end&&(o.offset=r.range.end-r.range.start)),e.push(o)}},t.checkKeyLength=function(e,t,n,i,r){if(!i||"number"!=typeof r)return;const s=t.items[n];let o=s&&s.range&&s.range.start;if(!o)for(let e=n-1;e>=0;--e){const i=t.items[e];if(i&&i.range){o=i.range.end+2*(n-e);break}}if(o>r+1024){const n=String(i).substr(0,8)+"..."+String(i).substr(-8);e.push(new sa.YAMLSemanticError(t,`The "${n}" key is too long`))}},t.resolveComments=function(e,t){for(const{afterKey:n,before:i,comment:r}of t){let t=e.items[i];t?(n&&t.value&&(t=t.value),void 0===r?!n&&t.commentBefore||(t.spaceBefore=!0):t.commentBefore?t.commentBefore+="\n"+r:t.commentBefore=r):void 0!==r&&(e.comment?e.comment+="\n"+r:e.comment=r)}}}));no(Va);Va.checkFlowCollectionEnd,Va.checkKeyLength,Va.resolveComments;var Ia=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(t.type!==ta.Type.MAP&&t.type!==ta.Type.FLOW_MAP){const n=`A ${t.type} node cannot be resolved as a mapping`;return e.errors.push(new sa.YAMLSyntaxError(t,n)),null}const{comments:l,items:c}=t.type===ta.Type.FLOW_MAP?function(e,t){const n=[],i=[];let r=void 0,o=null,a=!1,l="{";for(let c=0;c<t.items.length;++c){(0,Va.checkKeyLength)(e.errors,t,c,r,o);const h=t.items[c];if("string"==typeof h.char){const{char:n,offset:d}=h;if("?"===n&&void 0===r&&!a){a=!0,l=":";continue}if(":"===n){if(void 0===r&&(r=null),":"===l){l=",";continue}}else if(a&&(void 0===r&&","!==n&&(r=null),a=!1),void 0!==r&&(i.push(new s.default(r)),r=void 0,o=null,","===n)){l=":";continue}if("}"===n){if(c===t.items.length-1)continue}else if(n===l){l=":";continue}const p=`Flow map contains an unexpected ${n}`,u=new sa.YAMLSyntaxError(t,p);u.offset=d,e.errors.push(u)}else h.type===ta.Type.BLANK_LINE?n.push({afterKey:!!r,before:i.length}):h.type===ta.Type.COMMENT?n.push({afterKey:!!r,before:i.length,comment:h.comment}):void 0===r?(","===l&&e.errors.push(new sa.YAMLSemanticError(h,"Separator , missing in flow map")),r=e.resolveNode(h),o=a?null:h.range.start):(","!==l&&e.errors.push(new sa.YAMLSemanticError(h,"Indicator : missing in flow map entry")),i.push(new s.default(r,e.resolveNode(h))),r=void 0,a=!1)}(0,Va.checkFlowCollectionEnd)(e.errors,t),void 0!==r&&i.push(new s.default(r));return{comments:n,items:i}}(e,t):function(e,t){const i=[],r=[];let o=void 0,a=null;for(let l=0;l<t.items.length;++l){const c=t.items[l];switch(c.type){case ta.Type.BLANK_LINE:i.push({afterKey:!!o,before:r.length});break;case ta.Type.COMMENT:i.push({afterKey:!!o,before:r.length,comment:c.comment});break;case ta.Type.MAP_KEY:void 0!==o&&r.push(new s.default(o)),c.error&&e.errors.push(c.error),o=e.resolveNode(c.node),a=null;break;case ta.Type.MAP_VALUE:{if(void 0===o&&(o=null),c.error&&e.errors.push(c.error),!c.context.atLineStart&&c.node&&c.node.type===ta.Type.MAP&&!c.node.context.atLineStart){const t="Nested mappings are not allowed in compact mappings";e.errors.push(new sa.YAMLSemanticError(c.node,t))}let i=c.node;if(!i&&c.props.length>0){(i=new n.default(ta.Type.PLAIN,[])).context={parent:c,src:c.context.src};const e=c.range.start+1;if(i.range={start:e,end:e},i.valueRange={start:e,end:e},"number"==typeof c.range.origStart){const e=c.range.origStart+1;i.range.origStart=i.range.origEnd=e,i.valueRange.origStart=i.valueRange.origEnd=e}}const h=new s.default(o,e.resolveNode(i));d(c,h),r.push(h),(0,Va.checkKeyLength)(e.errors,t,l,o,a),o=void 0,a=null}break;default:void 0!==o&&r.push(new s.default(o)),o=e.resolveNode(c),a=c.range.start,c.error&&e.errors.push(c.error);e:for(let n=l+1;;++n){const i=t.items[n];switch(i&&i.type){case ta.Type.BLANK_LINE:case ta.Type.COMMENT:continue e;case ta.Type.MAP_VALUE:break e;default:e.errors.push(new sa.YAMLSemanticError(c,"Implicit map keys need to be followed by map values"));break e}}if(c.valueRangeContainsNewline){const t="Implicit map keys need to be on a single line";e.errors.push(new sa.YAMLSemanticError(c,t))}}}void 0!==o&&r.push(new s.default(o));return{comments:i,items:r}}(e,t),h=new i.default;h.items=c,(0,Va.resolveComments)(h,l);let p=!1;for(let n=0;n<c.length;++n){const{key:i}=c[n];if(i instanceof a.default&&(p=!0),e.schema.merge&&i&&i.value===r.MERGE_KEY){c[n]=new r.default(c[n]);const i=c[n].value.items;let s=null;i.some(e=>{if(e instanceof o.default){const{type:t}=e.source;return t!==ta.Type.MAP&&t!==ta.Type.FLOW_MAP&&(s="Merge nodes aliases can only point to maps")}return s="Merge nodes can only have Alias nodes as values"}),s&&e.errors.push(new sa.YAMLSemanticError(t,s))}else for(let r=n+1;r<c.length;++r){const{key:n}=c[r];if(i===n||i&&n&&Object.prototype.hasOwnProperty.call(i,"value")&&i.value===n.value){const n=`Map keys must be unique; "${i}" is repeated`;e.errors.push(new sa.YAMLSemanticError(t,n));break}}}if(p&&!e.options.mapAsMap){const n="Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";e.warnings.push(new sa.YAMLWarning(t,n))}return t.resolved=h,h};var n=c(ga),i=c(Ca),r=function(e){if(e&&e.__esModule)return e;var t=l();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var s=i?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(n,r,s):n[r]=e[r]}}n.default=e,t&&t.set(e,n);return n}(Ea),s=c(Sa),o=c(Ma),a=c(ka);function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function c(e){return e&&e.__esModule?e:{default:e}}const h=({context:{lineStart:e,node:t,src:n},props:i})=>{if(0===i.length)return!1;const{start:r}=i[0];if(t&&r>t.valueRange.start)return!1;if(n[r]!==ta.Char.COMMENT)return!1;for(let t=e;t<r;++t)if("\n"===n[t])return!1;return!0};function d(e,t){if(!h(e))return;const n=e.getPropValue(0,ta.Char.COMMENT,!0);let i=!1;const r=t.value.commentBefore;if(r&&r.startsWith(n))t.value.commentBefore=r.substr(n.length+1),i=!0;else{const r=t.value.comment;!e.node&&r&&r.startsWith(n)&&(t.value.comment=r.substr(n.length+1),i=!0)}i&&(t.comment=n)}}));no(Ia);var Ra=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(Ca),i=r(Ia);function r(e){return e&&e.__esModule?e:{default:e}}var s={createNode:function(e,t,i){const r=new n.default;if(t instanceof Map)for(const[n,s]of t)r.items.push(e.createPair(n,s,i));else if(t&&"object"==typeof t)for(const n of Object.keys(t))r.items.push(e.createPair(n,t[n],i));return r},default:!0,nodeClass:n.default,tag:"tag:yaml.org,2002:map",resolve:i.default};t.default=s}));no(Ra);var Da=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(t.type!==ta.Type.SEQ&&t.type!==ta.Type.FLOW_SEQ){const n=`A ${t.type} node cannot be resolved as a sequence`;return e.errors.push(new sa.YAMLSyntaxError(t,n)),null}const{comments:s,items:o}=t.type===ta.Type.FLOW_SEQ?function(e,t){const i=[],r=[];let s=!1,o=void 0,a=null,l="[";for(let c=0;c<t.items.length;++c){const h=t.items[c];if("string"==typeof h.char){const{char:i,offset:d}=h;if(":"===i||!s&&void 0===o||(s&&void 0===o&&(o=l?r.pop():null),r.push(new n.default(o)),s=!1,o=void 0,a=null),i===l)l=null;else if(l||"?"!==i){if("["!==l&&":"===i&&void 0===o){if(","===l){if((o=r.pop())instanceof n.default){const n="Chaining flow sequence pairs is invalid",i=new sa.YAMLSemanticError(t,n);i.offset=d,e.errors.push(i)}s||(0,Va.checkKeyLength)(e.errors,t,c,o,a)}else o=null;a=null,s=!1,l=null}else if("["===l||"]"!==i||c<t.items.length-1){const n=`Flow sequence contains an unexpected ${i}`,r=new sa.YAMLSyntaxError(t,n);r.offset=d,e.errors.push(r)}}else s=!0}else if(h.type===ta.Type.BLANK_LINE)i.push({before:r.length});else if(h.type===ta.Type.COMMENT)i.push({comment:h.comment,before:r.length});else{if(l){const t=`Expected a ${l} in flow sequence`;e.errors.push(new sa.YAMLSemanticError(h,t))}const t=e.resolveNode(h);void 0===o?r.push(t):(r.push(new n.default(o,t)),o=void 0),a=h.range.start,l=","}}(0,Va.checkFlowCollectionEnd)(e.errors,t),void 0!==o&&r.push(new n.default(o));return{comments:i,items:r}}(e,t):function(e,t){const n=[],i=[];for(let r=0;r<t.items.length;++r){const s=t.items[r];switch(s.type){case ta.Type.BLANK_LINE:n.push({before:i.length});break;case ta.Type.COMMENT:n.push({comment:s.comment,before:i.length});break;case ta.Type.SEQ_ITEM:if(s.error&&e.errors.push(s.error),i.push(e.resolveNode(s.node)),s.hasProps){const t="Sequence items cannot have tags or anchors before the - indicator";e.errors.push(new sa.YAMLSemanticError(s,t))}break;default:s.error&&e.errors.push(s.error),e.errors.push(new sa.YAMLSyntaxError(s,`Unexpected ${s.type} node in sequence`))}}return{comments:n,items:i}}(e,t),a=new i.default;if(a.items=o,(0,Va.resolveComments)(a,s),!e.options.mapAsMap&&o.some(e=>e instanceof n.default&&e.key instanceof r.default)){const n="Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";e.warnings.push(new sa.YAMLWarning(t,n))}return t.resolved=a,a};var n=s(Sa),i=s(Aa),r=s(ka);function s(e){return e&&e.__esModule?e:{default:e}}}));no(Da);var Ba=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(Da),i=r(Aa);function r(e){return e&&e.__esModule?e:{default:e}}var s={createNode:function(e,t,n){const r=new i.default;if(t&&t[Symbol.iterator])for(const i of t){const t=e.createNode(i,n.wrapScalars,null,n);r.items.push(t)}return r},default:!0,nodeClass:i.default,tag:"tag:yaml.org,2002:seq",resolve:n.default};t.default=s}));no(Ba);var $a=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.resolveString=void 0;const n=(e,t)=>{const n=t.strValue;return n?"string"==typeof n?n:(n.errors.forEach(n=>{n.source||(n.source=t),e.errors.push(n)}),n.str):""};t.resolveString=n;var i={identify:e=>"string"==typeof e,default:!0,tag:"tag:yaml.org,2002:str",resolve:n,stringify:(e,t,n,i)=>(t=Object.assign({actualString:!0},t),(0,Na.stringifyString)(e,t,n,i)),options:Pa.strOptions};t.default=i}));no($a);$a.resolveString;var Fa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(Ra),i=s(Ba),r=s($a);function s(e){return e&&e.__esModule?e:{default:e}}var o=[n.default,i.default,r.default];t.default=o}));no(Fa);var ja=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(xa);function i(e){return e&&e.__esModule?e:{default:e}}var r=i(Fa).default.concat([{identify:e=>null==e,createNode:(e,t,i)=>i.wrapScalars?new n.default(null):null,default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>null,options:Pa.nullOptions,stringify:()=>Pa.nullOptions.nullStr},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:e=>"t"===e[0]||"T"===e[0],options:Pa.boolOptions,stringify:({value:e})=>e?Pa.boolOptions.trueStr:Pa.boolOptions.falseStr},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o([0-7]+)$/,resolve:(e,t)=>parseInt(t,8),stringify:({value:e})=>"0o"+e.toString(8)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:e=>parseInt(e,10),stringify:Na.stringifyNumber},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x([0-9a-fA-F]+)$/,resolve:(e,t)=>parseInt(t,16),stringify:({value:e})=>"0x"+e.toString(16)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.inf|(\.nan))$/i,resolve:(e,t)=>t?NaN:"-"===e[0]?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Na.stringifyNumber},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:0|[1-9][0-9]*)(\.[0-9]*)?[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e),stringify:({value:e})=>Number(e).toExponential()},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:0|[1-9][0-9]*)\.([0-9]*)$/,resolve(e,t){const i=new n.default(parseFloat(e));return t&&"0"===t[t.length-1]&&(i.minFractionDigits=t.length),i},stringify:Na.stringifyNumber}]);t.default=r}));no(ja);var Ua=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(Ra),i=s(Ba),r=s(xa);function s(e){return e&&e.__esModule?e:{default:e}}const o=[n.default,i.default,{identify:e=>"string"==typeof e,default:!0,tag:"tag:yaml.org,2002:str",resolve:$a.resolveString,stringify:e=>JSON.stringify(e)},{identify:e=>null==e,createNode:(e,t,n)=>n.wrapScalars?new r.default(null):null,default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:e=>JSON.stringify(e)},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$/,resolve:()=>!0,stringify:e=>JSON.stringify(e)},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^false$/,resolve:()=>!1,stringify:e=>JSON.stringify(e)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:e=>parseInt(e,10),stringify:e=>JSON.stringify(e)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:e=>parseFloat(e),stringify:e=>JSON.stringify(e)}];o.scalarFallback=e=>{throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(e)}`)};var a=o;t.default=a}));no(Ua);var Ya=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={identify:e=>e instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve:(e,t)=>{if("function"==typeof Buffer){const n=(0,$a.resolveString)(e,t);return Buffer.from(n,"base64")}if("function"==typeof atob){const n=atob((0,$a.resolveString)(e,t)),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}return e.errors.push(new sa.YAMLReferenceError(t,"This environment does not support reading binary tags; either Buffer or atob is required")),null},options:Pa.binaryOptions,stringify:({comment:e,type:t,value:n},i,r,s)=>{let o;if("function"==typeof Buffer)o=n instanceof Buffer?n.toString("base64"):Buffer.from(n.buffer).toString("base64");else{if("function"!=typeof btoa)throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");{let e="";for(let t=0;t<n.length;++t)e+=String.fromCharCode(n[t]);o=btoa(e)}}if(t||(t=Pa.binaryOptions.defaultType),t===ta.Type.QUOTE_DOUBLE)n=o;else{const{lineWidth:e}=Pa.binaryOptions,i=Math.ceil(o.length/e),r=new Array(i);for(let t=0,n=0;t<i;++t,n+=e)r[t]=o.substr(n,e);n=r.join(t===ta.Type.BLOCK_LITERAL?"\n":" ")}return(0,Na.stringifyString)({comment:e,type:t,value:n},i,r,s)}};t.default=n}));no(Ya);var Ka=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.parsePairs=a,t.createPairs=l,t.default=void 0;var n=o(Ca),i=o(Sa),r=o(Da),s=o(Aa);function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){const s=(0,r.default)(e,t);for(let e=0;e<s.items.length;++e){let r=s.items[e];if(!(r instanceof i.default)){if(r instanceof n.default){if(r.items.length>1){const e="Each pair must have its own sequence indicator";throw new sa.YAMLSemanticError(t,e)}const e=r.items[0]||new i.default;r.commentBefore&&(e.commentBefore=e.commentBefore?`${r.commentBefore}\n${e.commentBefore}`:r.commentBefore),r.comment&&(e.comment=e.comment?`${r.comment}\n${e.comment}`:r.comment),r=e}s.items[e]=r instanceof i.default?r:new i.default(r)}}return s}function l(e,t,n){const i=new s.default;i.tag="tag:yaml.org,2002:pairs";for(const r of t){let t,s;if(Array.isArray(r)){if(2!==r.length)throw new TypeError(`Expected [key, value] tuple: ${r}`);t=r[0],s=r[1]}else if(r&&r instanceof Object){const e=Object.keys(r);if(1!==e.length)throw new TypeError(`Expected { key: value } tuple: ${r}`);s=r[t=e[0]]}else t=r;const o=e.createPair(t,s,n);i.items.push(o)}return i}var c={default:!1,tag:"tag:yaml.org,2002:pairs",resolve:a,createNode:l};t.default=c}));no(Ka);Ka.parsePairs,Ka.createPairs;var qa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.YAMLOMap=void 0;var n=a(wa),i=a(Ca),r=a(Sa),s=a(xa),o=a(Aa);function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class c extends o.default{constructor(){super(),l(this,"add",i.default.prototype.add.bind(this)),l(this,"delete",i.default.prototype.delete.bind(this)),l(this,"get",i.default.prototype.get.bind(this)),l(this,"has",i.default.prototype.has.bind(this)),l(this,"set",i.default.prototype.set.bind(this)),this.tag=c.tag}toJSON(e,t){const i=new Map;t&&t.onCreate&&t.onCreate(i);for(const e of this.items){let s,o;if(e instanceof r.default?(s=(0,n.default)(e.key,"",t),o=(0,n.default)(e.value,s,t)):s=(0,n.default)(e,"",t),i.has(s))throw new Error("Ordered maps must not include duplicate keys");i.set(s,o)}return i}}t.YAMLOMap=c,l(c,"tag","tag:yaml.org,2002:omap");var h={identify:e=>e instanceof Map,nodeClass:c,default:!1,tag:"tag:yaml.org,2002:omap",resolve:function(e,t){const n=(0,Ka.parsePairs)(e,t),i=[];for(const{key:e}of n.items)if(e instanceof s.default){if(i.includes(e.value)){const e="Ordered maps must not include duplicate keys";throw new sa.YAMLSemanticError(t,e)}i.push(e.value)}return Object.assign(new c,n)},createNode:function(e,t,n){const i=(0,Ka.createPairs)(e,t,n),r=new c;return r.items=i.items,r}};t.default=h}));no(qa);qa.YAMLOMap;var Wa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.YAMLSet=void 0;var n,i,r,s=function(e){if(e&&e.__esModule)return e;var t=h();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var s=i?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(n,r,s):n[r]=e[r]}}n.default=e,t&&t.set(e,n);return n}(Ca),o=c(Sa),a=c(Ia),l=c(xa);function c(e){return e&&e.__esModule?e:{default:e}}function h(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return h=function(){return e},e}class d extends s.default{constructor(){super(),this.tag=d.tag}add(e){const t=e instanceof o.default?e:new o.default(e);(0,s.findPair)(this.items,t.key)||this.items.push(t)}get(e,t){const n=(0,s.findPair)(this.items,e);return!t&&n instanceof o.default?n.key instanceof l.default?n.key.value:n.key:n}set(e,t){if("boolean"!=typeof t)throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const n=(0,s.findPair)(this.items,e);n&&!t?this.items.splice(this.items.indexOf(n),1):!n&&t&&this.items.push(new o.default(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues())return super.toString(e,t,n);throw new Error("Set items must all have null values")}}t.YAMLSet=d,r="tag:yaml.org,2002:set",(i="tag")in(n=d)?Object.defineProperty(n,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[i]=r;var p={identify:e=>e instanceof Set,nodeClass:d,default:!1,tag:"tag:yaml.org,2002:set",resolve:function(e,t){const n=(0,a.default)(e,t);if(!n.hasAllNullValues())throw new sa.YAMLSemanticError(t,"Set items must all have null values");return Object.assign(new d,n)},createNode:function(e,t,n){const i=new d;for(const r of t)i.items.push(e.createPair(r,null,n));return i}};t.default=p}));no(Wa);Wa.YAMLSet;var Ja=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.timestamp=t.floatTime=t.intTime=void 0;const n=(e,t)=>{const n=t.split(":").reduce((e,t)=>60*e+Number(t),0);return"-"===e?-n:n},i=({value:e})=>{if(isNaN(e)||!isFinite(e))return(0,Na.stringifyNumber)(e);let t="";e<0&&(t="-",e=Math.abs(e));const n=[e%60];return e<60?n.unshift(0):(e=Math.round((e-n[0])/60),n.unshift(e%60),e>=60&&(e=Math.round((e-n[0])/60),n.unshift(e))),t+n.map(e=>e<10?"0"+String(e):String(e)).join(":").replace(/000000\d*$/,"")},r={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/,resolve:(e,t,i)=>n(t,i.replace(/_/g,"")),stringify:i};t.intTime=r;const s={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/,resolve:(e,t,i)=>n(t,i.replace(/_/g,"")),stringify:i};t.floatTime=s;const o={identify:e=>e instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"),resolve:(e,t,i,r,s,o,a,l,c)=>{l&&(l=(l+"00").substr(1,3));let h=Date.UTC(t,i-1,r,s||0,o||0,a||0,l||0);if(c&&"Z"!==c){let e=n(c[0],c.slice(1));Math.abs(e)<30&&(e*=60),h-=6e4*e}return new Date(h)},stringify:({value:e})=>e.toISOString().replace(/((T00:00)?:00)?\.000Z$/,"")};t.timestamp=o}));no(Ja);Ja.timestamp,Ja.floatTime,Ja.intTime;var Qa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(xa),i=l(Fa),r=l(Ya),s=l(qa),o=l(Ka),a=l(Wa);function l(e){return e&&e.__esModule?e:{default:e}}var c=i.default.concat([{identify:e=>null==e,createNode:(e,t,i)=>i.wrapScalars?new n.default(null):null,default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>null,options:Pa.nullOptions,stringify:()=>Pa.nullOptions.nullStr},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>!0,options:Pa.boolOptions,stringify:({value:e})=>e?Pa.boolOptions.trueStr:Pa.boolOptions.falseStr},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,resolve:()=>!1,options:Pa.boolOptions,stringify:({value:e})=>e?Pa.boolOptions.trueStr:Pa.boolOptions.falseStr},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^0b([0-1_]+)$/,resolve:(e,t)=>parseInt(t.replace(/_/g,""),2),stringify:({value:e})=>"0b"+e.toString(2)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0([0-7_]+)$/,resolve:(e,t)=>parseInt(t.replace(/_/g,""),8),stringify:({value:e})=>(e<0?"-0":"0")+e.toString(8)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:e=>parseInt(e.replace(/_/g,""),10),stringify:Na.stringifyNumber},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x([0-9a-fA-F_]+)$/,resolve:(e,t)=>parseInt(t.replace(/_/g,""),16),stringify:({value:e})=>(e<0?"-0x":"0x")+e.toString(16)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.inf|(\.nan))$/i,resolve:(e,t)=>t?NaN:"-"===e[0]?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Na.stringifyNumber},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e.replace(/_/g,"")),stringify:({value:e})=>Number(e).toExponential()},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/,resolve(e,t){const i=new n.default(parseFloat(e.replace(/_/g,"")));if(t){const e=t.replace(/_/g,"");"0"===e[e.length-1]&&(i.minFractionDigits=e.length)}return i},stringify:Na.stringifyNumber}],r.default,s.default,o.default,a.default,Ja.intTime,Ja.floatTime,Ja.timestamp);t.default=c}));no(Qa);var Ga=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.tags=t.schemas=void 0;var n=p(ja),i=p(Fa),r=p(Ua),s=p(Qa),o=p(Ra),a=p(Ba),l=p(Ya),c=p(qa),h=p(Ka),d=p(Wa);function p(e){return e&&e.__esModule?e:{default:e}}const u={core:n.default,failsafe:i.default,json:r.default,yaml11:s.default};t.schemas=u;const f={binary:l.default,floatTime:Ja.floatTime,intTime:Ja.intTime,map:o.default,omap:c.default,pairs:h.default,seq:a.default,set:d.default,timestamp:Ja.timestamp};t.tags=f}));no(Ga);Ga.tags,Ga.schemas;var Xa=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(Ma),i=a(ka),r=a(za),s=a(Sa),o=a(xa);function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const c=({type:e})=>e===ta.Type.FLOW_MAP||e===ta.Type.MAP,h=({type:e})=>e===ta.Type.FLOW_SEQ||e===ta.Type.SEQ;class d{constructor({customTags:e,merge:t,schema:n,tags:i}){if(this.merge=!!t,this.name=n,this.tags=Ga.schemas[n.replace(/\W/g,"")],!this.tags){const e=Object.keys(Ga.schemas).map(e=>JSON.stringify(e)).join(", ");throw new Error(`Unknown schema "${n}"; use one of ${e}`)}if(!e&&i&&(e=i,(0,Oa.warnOptionDeprecation)("tags","customTags")),Array.isArray(e))for(const t of e)this.tags=this.tags.concat(t);else"function"==typeof e&&(this.tags=e(this.tags.slice()));for(let e=0;e<this.tags.length;++e){const t=this.tags[e];if("string"==typeof t){const n=Ga.tags[t];if(!n){const e=Object.keys(Ga.tags).map(e=>JSON.stringify(e)).join(", ");throw new Error(`Unknown custom tag "${t}"; use one of ${e}`)}this.tags[e]=n}}}createNode(e,t,i,s){if(e instanceof r.default)return e;let a;if(i){i.startsWith("!!")&&(i=d.defaultPrefix+i.slice(2));const e=this.tags.filter(e=>e.tag===i);if(!(a=e.find(e=>!e.format)||e[0]))throw new Error(`Tag ${i} not found`)}else if(!(a=this.tags.find(t=>(t.identify&&t.identify(e)||t.class&&e instanceof t.class)&&!t.format))){if("function"==typeof e.toJSON&&(e=e.toJSON()),"object"!=typeof e)return t?new o.default(e):e;a=e instanceof Map?Ga.tags.map:e[Symbol.iterator]?Ga.tags.seq:Ga.tags.map}s?s.wrapScalars=t:s={wrapScalars:t},s.onTagObj&&(s.onTagObj(a),delete s.onTagObj);const l={};if(e&&"object"==typeof e&&s.prevObjects){const t=s.prevObjects.find(t=>t.value===e);if(t){const e=new n.default(t);return s.aliasNodes.push(e),e}l.value=e,s.prevObjects.push(l)}return l.node=a.createNode?a.createNode(this,e,s):t?new o.default(e):e,l.node}createPair(e,t,n){const i=this.createNode(e,n.wrapScalars,null,n),r=this.createNode(t,n.wrapScalars,null,n);return new s.default(i,r)}resolveScalar(e,t){t||(t=this.tags);for(let n=0;n<t.length;++n){const{format:i,test:r,resolve:s}=t[n];if(r){const t=e.match(r);if(t){let e=s.apply(null,t);return e instanceof o.default||(e=new o.default(e)),i&&(e.format=i),e}}}return this.tags.scalarFallback&&(e=this.tags.scalarFallback(e)),new o.default(e)}resolveNode(e,t,n){const r=this.tags.filter(({tag:e})=>e===n),s=r.find(({test:e})=>!e);t.error&&e.errors.push(t.error);try{if(s){let n=s.resolve(e,t);n instanceof i.default||(n=new o.default(n)),t.resolved=n}else{const n=(0,$a.resolveString)(e,t);"string"==typeof n&&r.length>0&&(t.resolved=this.resolveScalar(n,r))}}catch(n){n.source||(n.source=t),e.errors.push(n),t.resolved=null}return t.resolved?(n&&t.tag&&(t.resolved.tag=n),t.resolved):null}resolveNodeWithFallback(e,t,n){const i=this.resolveNode(e,t,n);if(Object.prototype.hasOwnProperty.call(t,"resolved"))return i;const r=c(t)?d.defaultTags.MAP:h(t)?d.defaultTags.SEQ:d.defaultTags.STR;if(r){e.warnings.push(new sa.YAMLWarning(t,`The tag ${n} is unavailable, falling back to ${r}`));const i=this.resolveNode(e,t,r);return i.tag=n,i}return e.errors.push(new sa.YAMLReferenceError(t,`The tag ${n} is unavailable`)),null}getTagObject(e){if(e instanceof n.default)return n.default;if(e.tag){const t=this.tags.filter(t=>t.tag===e.tag);if(t.length>0)return t.find(t=>t.format===e.format)||t[0]}let t,i;if(e instanceof o.default){i=e.value;const n=this.tags.filter(e=>e.identify&&e.identify(i)||e.class&&i instanceof e.class);t=n.find(t=>t.format===e.format)||n.find(e=>!e.format)}else i=e,t=this.tags.find(e=>e.nodeClass&&i instanceof e.nodeClass);if(!t){const e=i&&i.constructor?i.constructor.name:typeof i;throw new Error(`Tag not resolved for ${e} value`)}return t}stringifyProps(e,t,{anchors:n,doc:i}){const r=[],s=i.anchors.getName(e);return s&&(n[s]=e,r.push(`&${s}`)),e.tag?r.push(i.stringifyTag(e.tag)):t.default||r.push(i.stringifyTag(t.tag)),r.join(" ")}stringify(e,t,n,o){let a;if(!(e instanceof r.default)){const n={aliasNodes:[],onTagObj:e=>a=e,prevObjects:[]};e=this.createNode(e,!0,null,n);const{anchors:i}=t.doc;for(const e of n.aliasNodes){e.source=e.source.node;let t=i.getName(e.source);t||(t=i.newName(),i.map[t]=e.source)}}if(t.tags=this,e instanceof s.default)return e.toString(t,n,o);a||(a=this.getTagObject(e));const l=this.stringifyProps(e,a,t),c="function"==typeof a.stringify?a.stringify(e,t,n,o):e instanceof i.default?e.toString(t,n,o):(0,Na.stringifyString)(e,t,n,o);return l?e instanceof i.default&&"{"!==c[0]&&"["!==c[0]?`${l}\n${t.indent}${c}`:`${l} ${c}`:c}}t.default=d,l(d,"defaultPrefix","tag:yaml.org,2002:"),l(d,"defaultTags",{MAP:"tag:yaml.org,2002:map",SEQ:"tag:yaml.org,2002:seq",STR:"tag:yaml.org,2002:str"})}));no(Xa);var Za=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=p(ba),i=p(La),r=p(Ta),s=p(Xa),o=p(Ma),a=function(e){if(e&&e.__esModule)return e;var t=d();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var s=i?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(n,r,s):n[r]=e[r]}}n.default=e,t&&t.set(e,n);return n}(ka),l=p(za),c=p(xa),h=p(wa);function d(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}function p(e){return e&&e.__esModule?e:{default:e}}const u=e=>e&&[ta.Type.MAP_KEY,ta.Type.MAP_VALUE,ta.Type.SEQ_ITEM].includes(e.type);class f{constructor(e){this.anchors=new i.default(e.anchorPrefix),this.commentBefore=null,this.comment=null,this.contents=null,this.directivesEndMarker=null,this.errors=[],this.options=e,this.schema=null,this.tagPrefixes=[],this.version=null,this.warnings=[]}assertCollectionContents(){if(this.contents instanceof a.default)return!0;throw new Error("Expected a YAML collection as document contents")}add(e){return this.assertCollectionContents(),this.contents.add(e)}addIn(e,t){this.assertCollectionContents(),this.contents.addIn(e,t)}delete(e){return this.assertCollectionContents(),this.contents.delete(e)}deleteIn(e){return(0,a.isEmptyPath)(e)?null!=this.contents&&(this.contents=null,!0):(this.assertCollectionContents(),this.contents.deleteIn(e))}getDefaults(){return f.defaults[this.version]||f.defaults[this.options.version]||{}}get(e,t){return this.contents instanceof a.default?this.contents.get(e,t):void 0}getIn(e,t){return(0,a.isEmptyPath)(e)?!t&&this.contents instanceof c.default?this.contents.value:this.contents:this.contents instanceof a.default?this.contents.getIn(e,t):void 0}has(e){return this.contents instanceof a.default&&this.contents.has(e)}hasIn(e){return(0,a.isEmptyPath)(e)?void 0!==this.contents:this.contents instanceof a.default&&this.contents.hasIn(e)}set(e,t){this.assertCollectionContents(),this.contents.set(e,t)}setIn(e,t){(0,a.isEmptyPath)(e)?this.contents=t:(this.assertCollectionContents(),this.contents.setIn(e,t))}setSchema(e,t){if(!e&&!t&&this.schema)return;"number"==typeof e&&(e=e.toFixed(1)),"1.0"===e||"1.1"===e||"1.2"===e?(this.version?this.version=e:this.options.version=e,delete this.options.schema):e&&"string"==typeof e&&(this.options.schema=e),Array.isArray(t)&&(this.options.customTags=t);const n=Object.assign({},this.getDefaults(),this.options);this.schema=new s.default(n)}parse(e,t){this.options.keepCstNodes&&(this.cstNode=e),this.options.keepNodeTypes&&(this.type="DOCUMENT");const{directives:n=[],contents:i=[],directivesEndMarker:r,error:s,valueRange:o}=e;if(s&&(s.source||(s.source=this),this.errors.push(s)),this.parseDirectives(n,t),r&&(this.directivesEndMarker=!0),this.range=o?[o.start,o.end]:null,this.setSchema(),this.anchors._cstAliases=[],this.parseContents(i),this.anchors.resolveNodes(),this.options.prettyErrors){for(const e of this.errors)e instanceof sa.YAMLError&&e.makePretty();for(const e of this.warnings)e instanceof sa.YAMLError&&e.makePretty()}return this}parseDirectives(e,t){const n=[];let i=!1;if(e.forEach(e=>{const{comment:t,name:r}=e;switch(r){case"TAG":this.resolveTagDirective(e),i=!0;break;case"YAML":case"YAML:1.0":this.resolveYamlDirective(e),i=!0;break;default:if(r){const t=`YAML only supports %TAG and %YAML directives, and not %${r}`;this.warnings.push(new sa.YAMLWarning(e,t))}}t&&n.push(t)}),t&&!i&&"1.1"===(this.version||t.version||this.options.version)){const e=({handle:e,prefix:t})=>({handle:e,prefix:t});this.tagPrefixes=t.tagPrefixes.map(e),this.version=t.version}this.commentBefore=n.join("\n")||null}parseContents(e){const t={before:[],after:[]},n=[];let i=!1;switch(e.forEach(e=>{if(e.valueRange){if(1===n.length){const t="Document is not valid YAML (bad indentation?)";this.errors.push(new sa.YAMLSyntaxError(e,t))}const t=this.resolveNode(e);i&&(t.spaceBefore=!0,i=!1),n.push(t)}else if(null!==e.comment){(0===n.length?t.before:t.after).push(e.comment)}else e.type===ta.Type.BLANK_LINE&&(i=!0,0===n.length&&t.before.length>0&&!this.commentBefore&&(this.commentBefore=t.before.join("\n"),t.before=[]))}),n.length){case 0:this.contents=null,t.after=t.before;break;case 1:if(this.contents=n[0],this.contents){const e=t.before.join("\n")||null;if(e){const t=this.contents instanceof a.default&&this.contents.items[0]?this.contents.items[0]:this.contents;t.commentBefore=t.commentBefore?`${e}\n${t.commentBefore}`:e}}else t.after=t.before.concat(t.after);break;default:this.contents=n,this.contents[0]?this.contents[0].commentBefore=t.before.join("\n")||null:t.after=t.before.concat(t.after)}this.comment=t.after.join("\n")||null}resolveTagDirective(e){const[t,n]=e.parameters;if(t&&n)if(this.tagPrefixes.every(e=>e.handle!==t))this.tagPrefixes.push({handle:t,prefix:n});else{const t="The %TAG directive must only be given at most once per handle in the same document.";this.errors.push(new sa.YAMLSemanticError(e,t))}else{const t="Insufficient parameters given for %TAG directive";this.errors.push(new sa.YAMLSemanticError(e,t))}}resolveYamlDirective(e){let[t]=e.parameters;if("YAML:1.0"===e.name&&(t="1.0"),this.version){const t="The %YAML directive must only be given at most once per document.";this.errors.push(new sa.YAMLSemanticError(e,t))}if(t){if(!f.defaults[t]){const n=`Document will be parsed as YAML ${this.version||this.options.version} rather than YAML ${t}`;this.warnings.push(new sa.YAMLWarning(e,n))}this.version=t}else{const t="Insufficient parameters given for %YAML directive";this.errors.push(new sa.YAMLSemanticError(e,t))}}resolveTagName(e){const{tag:t,type:n}=e;let i=!1;if(t){const{handle:n,suffix:r,verbatim:s}=t;if(s){if("!"!==s&&"!!"!==s)return s;const t=`Verbatim tags aren't resolved, so ${s} is invalid.`;this.errors.push(new sa.YAMLSemanticError(e,t))}else if("!"!==n||r){let t=this.tagPrefixes.find(e=>e.handle===n);if(!t){const e=this.getDefaults().tagPrefixes;e&&(t=e.find(e=>e.handle===n))}if(t){if(r){if("!"===n&&"1.0"===(this.version||this.options.version)){if("^"===r[0])return r;if(/[:/]/.test(r)){const e=r.match(/^([a-z0-9-]+)\/(.*)/i);return e?`tag:${e[1]}.yaml.org,2002:${e[2]}`:`tag:${r}`}}return t.prefix+decodeURIComponent(r)}this.errors.push(new sa.YAMLSemanticError(e,`The ${n} tag has no suffix.`))}else{const t=`The ${n} tag handle is non-default and was not declared.`;this.errors.push(new sa.YAMLSemanticError(e,t))}}else i=!0}switch(n){case ta.Type.BLOCK_FOLDED:case ta.Type.BLOCK_LITERAL:case ta.Type.QUOTE_DOUBLE:case ta.Type.QUOTE_SINGLE:return s.default.defaultTags.STR;case ta.Type.FLOW_MAP:case ta.Type.MAP:return s.default.defaultTags.MAP;case ta.Type.FLOW_SEQ:case ta.Type.SEQ:return s.default.defaultTags.SEQ;case ta.Type.PLAIN:return i?s.default.defaultTags.STR:null;default:return null}}resolveNode(e){if(!e)return null;const{anchors:t,errors:n,schema:i}=this;let r=!1,s=!1;const a={before:[],after:[]},l=u(e.context.parent)?e.context.parent.props.concat(e.props):e.props;for(const{start:t,end:i}of l)switch(e.context.src[t]){case ta.Char.COMMENT:{if(!e.commentHasRequiredWhitespace(t)){const t="Comments must be separated from other tokens by white space characters";n.push(new sa.YAMLSemanticError(e,t))}const r=e.context.src.slice(t+1,i),{header:s,valueRange:o}=e;o&&(t>o.start||s&&t>s.start)?a.after.push(r):a.before.push(r)}break;case ta.Char.ANCHOR:if(r){const t="A node can have at most one anchor";n.push(new sa.YAMLSemanticError(e,t))}r=!0;break;case ta.Char.TAG:if(s){const t="A node can have at most one tag";n.push(new sa.YAMLSemanticError(e,t))}s=!0}if(r){const n=e.anchor,i=t.getNode(n);i&&(t.map[t.newName(n)]=i),t.map[n]=e}let c;if(e.type===ta.Type.ALIAS){if(r||s){const t="An alias node must not specify any properties";n.push(new sa.YAMLSemanticError(e,t))}const i=e.rawValue,a=t.getNode(i);if(!a){const t=`Aliased anchor not found: ${i}`;return n.push(new sa.YAMLReferenceError(e,t)),null}c=new o.default(a),t._cstAliases.push(c)}else{const t=this.resolveTagName(e);if(t)c=i.resolveNodeWithFallback(this,e,t);else{if(e.type!==ta.Type.PLAIN){const t=`Failed to resolve ${e.type} node here`;return n.push(new sa.YAMLSyntaxError(e,t)),null}try{c=i.resolveScalar(e.strValue||"")}catch(t){return t.source||(t.source=e),n.push(t),null}}}if(c){c.range=[e.range.start,e.range.end],this.options.keepCstNodes&&(c.cstNode=e),this.options.keepNodeTypes&&(c.type=e.type);const t=a.before.join("\n");t&&(c.commentBefore=c.commentBefore?`${c.commentBefore}\n${t}`:t);const n=a.after.join("\n");n&&(c.comment=c.comment?`${c.comment}\n${n}`:n)}return e.resolved=c}listNonDefaultTags(){return(0,r.default)(this.contents).filter(e=>0!==e.indexOf(s.default.defaultPrefix))}setTagPrefix(e,t){if("!"!==e[0]||"!"!==e[e.length-1])throw new Error("Handle must start and end with !");if(t){const n=this.tagPrefixes.find(t=>t.handle===e);n?n.prefix=t:this.tagPrefixes.push({handle:e,prefix:t})}else this.tagPrefixes=this.tagPrefixes.filter(t=>t.handle!==e)}stringifyTag(e){if("1.0"===(this.version||this.options.version)){const t=e.match(/^tag:private\.yaml\.org,2002:([^:/]+)$/);if(t)return"!"+t[1];const n=e.match(/^tag:([a-zA-Z0-9-]+)\.yaml\.org,2002:(.*)/);return n?`!${n[1]}/${n[2]}`:`!${e.replace(/^tag:/,"")}`}{let t=this.tagPrefixes.find(t=>0===e.indexOf(t.prefix));if(!t){const n=this.getDefaults().tagPrefixes;t=n&&n.find(t=>0===e.indexOf(t.prefix))}if(!t)return"!"===e[0]?e:`!<${e}>`;const n=e.substr(t.prefix.length).replace(/[!,[\]{}]/g,e=>({"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"})[e]);return t.handle+n}}toJSON(e){const{keepBlobsInJSON:t,mapAsMap:n,maxAliasCount:i}=this.options,r=t&&("string"!=typeof e||!(this.contents instanceof c.default)),s={doc:this,keep:r,mapAsMap:r&&!!n,maxAliasCount:i},o=Object.keys(this.anchors.map);return o.length>0&&(s.anchors=o.map(e=>({alias:[],aliasCount:0,count:1,node:this.anchors.map[e]}))),(0,h.default)(this.contents,e,s)}toString(){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");this.setSchema();const e=[];let t=!1;if(this.version){let n="%YAML 1.2";"yaml-1.1"===this.schema.name&&("1.0"===this.version?n="%YAML:1.0":"1.1"===this.version&&(n="%YAML 1.1")),e.push(n),t=!0}const i=this.listNonDefaultTags();this.tagPrefixes.forEach(({handle:n,prefix:r})=>{i.some(e=>0===e.indexOf(r))&&(e.push(`%TAG ${n} ${r}`),t=!0)}),(t||this.directivesEndMarker)&&e.push("---"),this.commentBefore&&(!t&&this.directivesEndMarker||e.unshift(""),e.unshift(this.commentBefore.replace(/^/gm,"#")));const r={anchors:{},doc:this,indent:""};let s=!1,o=null;if(this.contents){this.contents instanceof l.default&&(this.contents.spaceBefore&&(t||this.directivesEndMarker)&&e.push(""),this.contents.commentBefore&&e.push(this.contents.commentBefore.replace(/^/gm,"#")),r.forceBlockIndent=!!this.comment,o=this.contents.comment);const i=o?null:()=>s=!0,a=this.schema.stringify(this.contents,r,()=>o=null,i);e.push((0,n.default)(a,"",o))}else void 0!==this.contents&&e.push(this.schema.stringify(this.contents,r));return this.comment&&(s&&!o||""===e[e.length-1]||e.push(""),e.push(this.comment.replace(/^/gm,"#"))),e.join("\n")+"\n"}}var g,m,v;t.default=f,g=f,m="defaults",v={"1.0":{schema:"yaml-1.1",merge:!0,tagPrefixes:[{handle:"!",prefix:s.default.defaultPrefix},{handle:"!!",prefix:"tag:private.yaml.org,2002:"}]},1.1:{schema:"yaml-1.1",merge:!0,tagPrefixes:[{handle:"!",prefix:"!"},{handle:"!!",prefix:s.default.defaultPrefix}]},1.2:{schema:"core",merge:!1,tagPrefixes:[{handle:"!",prefix:"!"},{handle:"!!",prefix:s.default.defaultPrefix}]}},m in g?Object.defineProperty(g,m,{value:v,enumerable:!0,configurable:!0,writable:!0}):g[m]=v}));no(Za);var el=io((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(_a),i=s(Za),r=s(Xa);function s(e){return e&&e.__esModule?e:{default:e}}const o={anchorPrefix:"a",customTags:null,keepCstNodes:!1,keepNodeTypes:!0,keepBlobsInJSON:!0,mapAsMap:!1,maxAliasCount:100,prettyErrors:!1,simpleKeys:!1,version:"1.2"};class a extends i.default{constructor(e){super(Object.assign({},o,e))}}function l(e,t){const i=(0,n.default)(e),r=new a(t).parse(i[0]);if(i.length>1){const e="Source contains multiple documents; please use YAML.parseAllDocuments()";r.errors.unshift(new sa.YAMLSemanticError(i[1],e))}return r}var c={createNode:function(e,t=!0,n){void 0===n&&"string"==typeof t&&(n=t,t=!0);const s=Object.assign({},i.default.defaults[o.version],o);return new r.default(s).createNode(e,t,n)},defaultOptions:o,Document:a,parse:function(e,t){const n=l(e,t);if(n.warnings.forEach(e=>(0,Oa.warn)(e)),n.errors.length>0)throw n.errors[0];return n.toJSON()},parseAllDocuments:function(e,t){const i=[];let r;for(const s of(0,n.default)(e)){const e=new a(t);e.parse(s,r),i.push(e),r=e}return i},parseCST:n.default,parseDocument:l,stringify:function(e,t){const n=new a(t);return n.contents=e,String(n)}};t.default=c}));no(el);var tl=el.default,nl=io((function(e,t){var n,i;n=function(e){var t=[],n=Object.keys,i={},r={},s=/^(no-?highlight|plain|text)$/i,o=/\blang(?:uage)?-([\w-]+)\b/i,a=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,l="</span>",c={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},h="of and for in not or if then".split(" ");function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function p(e){return e.nodeName.toLowerCase()}function u(e){return s.test(e)}function f(e){var t,n={},i=Array.prototype.slice.call(arguments,1);for(t in e)n[t]=e[t];return i.forEach((function(e){for(t in e)n[t]=e[t]})),n}function g(e){var t=[];return function e(n,i){for(var r=n.firstChild;r;r=r.nextSibling)3===r.nodeType?i+=r.nodeValue.length:1===r.nodeType&&(t.push({event:"start",offset:i,node:r}),i=e(r,i),p(r).match(/br|hr|img|input/)||t.push({event:"stop",offset:i,node:r}));return i}(e,0),t}function m(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map((function(t){return f(e,{variants:null},t)}))),e.cached_variants?e.cached_variants:function e(t){return!!t&&(t.endsWithParent||e(t.starts))}(e)?[f(e,{starts:e.starts?f(e.starts):null})]:[e]}function v(e,t){return t?Number(t):(n=e,-1!=h.indexOf(n.toLowerCase())?0:1);var n}function y(e){function t(e){return e&&e.source||e}function i(n,i){return new RegExp(t(n),"m"+(e.case_insensitive?"i":"")+(i?"g":""))}function r(e){var n,r,s={},o=[],a={},l=1;function c(e,t){s[l]=e,o.push([e,t]),l+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(t)+1}for(var h=0;h<e.contains.length;h++)c(r=e.contains[h],r.beginKeywords?"\\.?(?:"+r.begin+")\\.?":r.begin);e.terminator_end&&c("end",e.terminator_end),e.illegal&&c("illegal",e.illegal);var d=o.map((function(e){return e[1]}));return n=i(function(e,n){for(var i=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,r=0,s="",o=0;o<e.length;o++){var a=r+=1,l=t(e[o]);for(o>0&&(s+=n),s+="(";l.length>0;){var c=i.exec(l);if(null==c){s+=l;break}s+=l.substring(0,c.index),l=l.substring(c.index+c[0].length),"\\"==c[0][0]&&c[1]?s+="\\"+String(Number(c[1])+a):(s+=c[0],"("==c[0]&&r++)}s+=")"}return s}(d,"|"),!0),a.lastIndex=0,a.exec=function(t){var i;if(0===o.length)return null;n.lastIndex=a.lastIndex;var r=n.exec(t);if(!r)return null;for(var l=0;l<r.length;l++)if(null!=r[l]&&null!=s[""+l]){i=s[""+l];break}return"string"==typeof i?(r.type=i,r.extra=[e.illegal,e.terminator_end]):(r.type="begin",r.rule=i),r},a}!function s(o,a){o.compiled||(o.compiled=!0,o.keywords=o.keywords||o.beginKeywords,o.keywords&&(o.keywords=function(e,t){var i={};return"string"==typeof e?r("keyword",e):n(e).forEach((function(t){r(t,e[t])})),i;function r(e,n){t&&(n=n.toLowerCase()),n.split(" ").forEach((function(t){var n=t.split("|");i[n[0]]=[e,v(n[0],n[1])]}))}}(o.keywords,e.case_insensitive)),o.lexemesRe=i(o.lexemes||/\w+/,!0),a&&(o.beginKeywords&&(o.begin="\\b("+o.beginKeywords.split(" ").join("|")+")\\b"),o.begin||(o.begin=/\B|\b/),o.beginRe=i(o.begin),o.endSameAsBegin&&(o.end=o.begin),o.end||o.endsWithParent||(o.end=/\B|\b/),o.end&&(o.endRe=i(o.end)),o.terminator_end=t(o.end)||"",o.endsWithParent&&a.terminator_end&&(o.terminator_end+=(o.end?"|":"")+a.terminator_end)),o.illegal&&(o.illegalRe=i(o.illegal)),null==o.relevance&&(o.relevance=1),o.contains||(o.contains=[]),o.contains=Array.prototype.concat.apply([],o.contains.map((function(e){return m("self"===e?o:e)}))),o.contains.forEach((function(e){s(e,o)})),o.starts&&s(o.starts,a),o.terminators=r(o))}(e)}function _(e,t,n,r){function s(e,t){var n=m.case_insensitive?t[0].toLowerCase():t[0];return e.keywords.hasOwnProperty(n)&&e.keywords[n]}function o(e,t,n,i){if(!n&&""===t)return"";if(!e)return t;var r='<span class="'+(i?"":c.classPrefix);return(r+=e+'">')+t+(n?"":l)}function a(){x+=null!=w.subLanguage?function(){var e="string"==typeof w.subLanguage;if(e&&!i[w.subLanguage])return d(k);var t=e?_(w.subLanguage,k,!0,z[w.subLanguage]):b(k,w.subLanguage.length?w.subLanguage:void 0);return w.relevance>0&&(M+=t.relevance),e&&(z[w.subLanguage]=t.top),o(t.language,t.value,!1,!0)}():function(){var e,t,n,i;if(!w.keywords)return d(k);for(i="",t=0,w.lexemesRe.lastIndex=0,n=w.lexemesRe.exec(k);n;)i+=d(k.substring(t,n.index)),(e=s(w,n))?(M+=e[1],i+=o(e[0],d(n[0]))):i+=d(n[0]),t=w.lexemesRe.lastIndex,n=w.lexemesRe.exec(k);return i+d(k.substr(t))}(),k=""}function h(e){x+=e.className?o(e.className,"",!0):"",w=Object.create(e,{parent:{value:w}})}function p(e){var t=e[0],n=e.rule;return n&&n.endSameAsBegin&&(n.endRe=function(e){return new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}(t)),n.skip?k+=t:(n.excludeBegin&&(k+=t),a(),n.returnBegin||n.excludeBegin||(k=t)),h(n),n.returnBegin?0:t.length}function u(e){var t=e[0],n=function e(t,n){if(function(e,t){var n=e&&e.exec(t);return n&&0===n.index}(t.endRe,n)){for(;t.endsParent&&t.parent;)t=t.parent;return t}if(t.endsWithParent)return e(t.parent,n)}(w,t);if(n){var i=w;i.skip?k+=t:(i.returnEnd||i.excludeEnd||(k+=t),a(),i.excludeEnd&&(k=t));do{w.className&&(x+=l),w.skip||w.subLanguage||(M+=w.relevance),w=w.parent}while(w!==n.parent);return n.starts&&(n.endSameAsBegin&&(n.starts.endRe=n.endRe),h(n.starts)),i.returnEnd?0:t.length}}var f={};function g(e,i){var r=i&&i[0];if(k+=e,null==r)return a(),0;if("begin"==f.type&&"end"==i.type&&f.index==i.index&&""===r)return k+=t.slice(i.index,i.index+1),1;if(f=i,"begin"===i.type)return p(i);if("illegal"===i.type&&!n)throw new Error('Illegal lexeme "'+r+'" for mode "'+(w.className||"<unnamed>")+'"');if("end"===i.type){var s=u(i);if(null!=s)return s}return k+=r,r.length}var m=S(e);if(!m)throw new Error('Unknown language: "'+e+'"');y(m);var v,w=r||m,z={},x="";for(v=w;v!==m;v=v.parent)v.className&&(x=o(v.className,"",!0)+x);var k="",M=0;try{for(var C,A,E=0;w.terminators.lastIndex=E,C=w.terminators.exec(t);)A=g(t.substring(E,C.index),C),E=C.index+A;for(g(t.substr(E)),v=w;v.parent;v=v.parent)v.className&&(x+=l);return{relevance:M,value:x,illegal:!1,language:e,top:w}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{illegal:!0,relevance:0,value:d(t)};throw e}}function b(e,t){t=t||c.languages||n(i);var r={relevance:0,value:d(e)},s=r;return t.filter(S).filter(k).forEach((function(t){var n=_(t,e,!1);n.language=t,n.relevance>s.relevance&&(s=n),n.relevance>r.relevance&&(s=r,r=n)})),s.language&&(r.second_best=s),r}function w(e){return c.tabReplace||c.useBR?e.replace(a,(function(e,t){return c.useBR&&"\n"===e?"<br>":c.tabReplace?t.replace(/\t/g,c.tabReplace):""})):e}function z(e){var n,i,s,a,l,h=function(e){var t,n,i,r,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",n=o.exec(s))return S(n[1])?n[1]:"no-highlight";for(t=0,i=(s=s.split(/\s+/)).length;t<i;t++)if(u(r=s[t])||S(r))return r}(e);u(h)||(c.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,l=n.textContent,s=h?_(h,l,!0):b(l),(i=g(n)).length&&((a=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=s.value,s.value=function(e,n,i){var r=0,s="",o=[];function a(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function l(e){s+="<"+p(e)+t.map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+d(e.value).replace('"',"&quot;")+'"'})).join("")+">"}function c(e){s+="</"+p(e)+">"}function h(e){("start"===e.event?l:c)(e.node)}for(;e.length||n.length;){var u=a();if(s+=d(i.substring(r,u[0].offset)),r=u[0].offset,u===e){o.reverse().forEach(c);do{h(u.splice(0,1)[0]),u=a()}while(u===e&&u.length&&u[0].offset===r);o.reverse().forEach(l)}else"start"===u[0].event?o.push(u[0].node):o.pop(),h(u.splice(0,1)[0])}return s+d(i.substr(r))}(i,g(a),l)),s.value=w(s.value),e.innerHTML=s.value,e.className=function(e,t,n){var i=t?r[t]:n,s=[e.trim()];return e.match(/\bhljs\b/)||s.push("hljs"),-1===e.indexOf(i)&&s.push(i),s.join(" ").trim()}(e.className,h,s.language),e.result={language:s.language,re:s.relevance},s.second_best&&(e.second_best={language:s.second_best.language,re:s.second_best.relevance}))}function x(){if(!x.called){x.called=!0;var e=document.querySelectorAll("pre code");t.forEach.call(e,z)}}function S(e){return e=(e||"").toLowerCase(),i[e]||i[r[e]]}function k(e){var t=S(e);return t&&!t.disableAutodetect}return e.highlight=_,e.highlightAuto=b,e.fixMarkup=w,e.highlightBlock=z,e.configure=function(e){c=f(c,e)},e.initHighlighting=x,e.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",x,!1),addEventListener("load",x,!1)},e.registerLanguage=function(t,n){var s=i[t]=n(e);s.rawDefinition=n.bind(null,e),s.aliases&&s.aliases.forEach((function(e){r[e]=t}))},e.listLanguages=function(){return n(i)},e.getLanguage=S,e.autoDetection=k,e.inherit=f,e.IDENT_RE="[a-zA-Z]\\w*",e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},e.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.COMMENT=function(t,n,i){var r=e.inherit({className:"comment",begin:t,end:n,contains:[]},i||{});return r.contains.push(e.PHRASAL_WORDS_MODE),r.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),r},e.C_LINE_COMMENT_MODE=e.COMMENT("//","$"),e.C_BLOCK_COMMENT_MODE=e.COMMENT("/\\*","\\*/"),e.HASH_COMMENT_MODE=e.COMMENT("#","$"),e.NUMBER_MODE={className:"number",begin:e.NUMBER_RE,relevance:0},e.C_NUMBER_MODE={className:"number",begin:e.C_NUMBER_RE,relevance:0},e.BINARY_NUMBER_MODE={className:"number",begin:e.BINARY_NUMBER_RE,relevance:0},e.CSS_NUMBER_MODE={className:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},e.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}]},e.TITLE_MODE={className:"title",begin:e.IDENT_RE,relevance:0},e.UNDERSCORE_TITLE_MODE={className:"title",begin:e.UNDERSCORE_IDENT_RE,relevance:0},e.METHOD_GUARD={begin:"\\.\\s*"+e.UNDERSCORE_IDENT_RE,relevance:0},e},i="object"==typeof window&&window||"object"==typeof self&&self,t.nodeType?i&&(i.hljs=n({})):n(t)}));
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
const il=new WeakMap,rl=(e=>(...n)=>{const i=e(...n);return t.set(i,!0),i})(e=>t=>{if(!(t instanceof x))throw new Error("unsafeHTML can only be used in text bindings");const n=il.get(t);if(void 0!==n&&_(e)&&e===n.value&&t.value===n.fragment)return;const i=document.createElement("template");i.innerHTML=e;const r=document.importNode(i.content,!0);t.setValue(r),il.set(t,{value:e,fragment:r})}),sl=ce`
  /*

github.com style (c) Vasily Polovnyov <vast@whiteants.net>

*/

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f8f8f8;
  }

  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #008080;
  }

  .hljs-string,
  .hljs-doctag {
    color: #d14;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #900;
    font-weight: bold;
  }

  .hljs-subst {
    font-weight: normal;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: #000080;
    font-weight: normal;
  }

  .hljs-regexp,
  .hljs-link {
    color: #009926;
  }

  .hljs-symbol,
  .hljs-bullet {
    color: #990073;
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: #0086b3;
  }

  .hljs-meta {
    color: #999;
    font-weight: bold;
  }

  .hljs-deletion {
    background: #fdd;
  }

  .hljs-addition {
    background: #dfd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`,ol=[ce`
  @font-face {
    font-family: octicons-link;
    src: url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAZwABAAAAAACFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEU0lHAAAGaAAAAAgAAAAIAAAAAUdTVUIAAAZcAAAACgAAAAoAAQAAT1MvMgAAAyQAAABJAAAAYFYEU3RjbWFwAAADcAAAAEUAAACAAJThvmN2dCAAAATkAAAABAAAAAQAAAAAZnBnbQAAA7gAAACyAAABCUM+8IhnYXNwAAAGTAAAABAAAAAQABoAI2dseWYAAAFsAAABPAAAAZwcEq9taGVhZAAAAsgAAAA0AAAANgh4a91oaGVhAAADCAAAABoAAAAkCA8DRGhtdHgAAAL8AAAADAAAAAwGAACfbG9jYQAAAsAAAAAIAAAACABiATBtYXhwAAACqAAAABgAAAAgAA8ASm5hbWUAAAToAAABQgAAAlXu73sOcG9zdAAABiwAAAAeAAAAME3QpOBwcmVwAAAEbAAAAHYAAAB/aFGpk3jaTY6xa8JAGMW/O62BDi0tJLYQincXEypYIiGJjSgHniQ6umTsUEyLm5BV6NDBP8Tpts6F0v+k/0an2i+itHDw3v2+9+DBKTzsJNnWJNTgHEy4BgG3EMI9DCEDOGEXzDADU5hBKMIgNPZqoD3SilVaXZCER3/I7AtxEJLtzzuZfI+VVkprxTlXShWKb3TBecG11rwoNlmmn1P2WYcJczl32etSpKnziC7lQyWe1smVPy/Lt7Kc+0vWY/gAgIIEqAN9we0pwKXreiMasxvabDQMM4riO+qxM2ogwDGOZTXxwxDiycQIcoYFBLj5K3EIaSctAq2kTYiw+ymhce7vwM9jSqO8JyVd5RH9gyTt2+J/yUmYlIR0s04n6+7Vm1ozezUeLEaUjhaDSuXHwVRgvLJn1tQ7xiuVv/ocTRF42mNgZGBgYGbwZOBiAAFGJBIMAAizAFoAAABiAGIAznjaY2BkYGAA4in8zwXi+W2+MjCzMIDApSwvXzC97Z4Ig8N/BxYGZgcgl52BCSQKAA3jCV8CAABfAAAAAAQAAEB42mNgZGBg4f3vACQZQABIMjKgAmYAKEgBXgAAeNpjYGY6wTiBgZWBg2kmUxoDA4MPhGZMYzBi1AHygVLYQUCaawqDA4PChxhmh/8ODDEsvAwHgMKMIDnGL0x7gJQCAwMAJd4MFwAAAHjaY2BgYGaA4DAGRgYQkAHyGMF8NgYrIM3JIAGVYYDT+AEjAwuDFpBmA9KMDEwMCh9i/v8H8sH0/4dQc1iAmAkALaUKLgAAAHjaTY9LDsIgEIbtgqHUPpDi3gPoBVyRTmTddOmqTXThEXqrob2gQ1FjwpDvfwCBdmdXC5AVKFu3e5MfNFJ29KTQT48Ob9/lqYwOGZxeUelN2U2R6+cArgtCJpauW7UQBqnFkUsjAY/kOU1cP+DAgvxwn1chZDwUbd6CFimGXwzwF6tPbFIcjEl+vvmM/byA48e6tWrKArm4ZJlCbdsrxksL1AwWn/yBSJKpYbq8AXaaTb8AAHja28jAwOC00ZrBeQNDQOWO//sdBBgYGRiYWYAEELEwMTE4uzo5Zzo5b2BxdnFOcALxNjA6b2ByTswC8jYwg0VlNuoCTWAMqNzMzsoK1rEhNqByEyerg5PMJlYuVueETKcd/89uBpnpvIEVomeHLoMsAAe1Id4AAAAAAAB42oWQT07CQBTGv0JBhagk7HQzKxca2sJCE1hDt4QF+9JOS0nbaaYDCQfwCJ7Au3AHj+LO13FMmm6cl7785vven0kBjHCBhfpYuNa5Ph1c0e2Xu3jEvWG7UdPDLZ4N92nOm+EBXuAbHmIMSRMs+4aUEd4Nd3CHD8NdvOLTsA2GL8M9PODbcL+hD7C1xoaHeLJSEao0FEW14ckxC+TU8TxvsY6X0eLPmRhry2WVioLpkrbp84LLQPGI7c6sOiUzpWIWS5GzlSgUzzLBSikOPFTOXqly7rqx0Z1Q5BAIoZBSFihQYQOOBEdkCOgXTOHA07HAGjGWiIjaPZNW13/+lm6S9FT7rLHFJ6fQbkATOG1j2OFMucKJJsxIVfQORl+9Jyda6Sl1dUYhSCm1dyClfoeDve4qMYdLEbfqHf3O/AdDumsjAAB42mNgYoAAZQYjBmyAGYQZmdhL8zLdDEydARfoAqIAAAABAAMABwAKABMAB///AA8AAQAAAAAAAAAAAAAAAAABAAAAAA==)
      format('woff');
  }
`,ce`
  .markdown-body .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  .markdown-body .anchor {
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
  }

  .markdown-body .anchor:focus {
    outline: none;
  }

  .markdown-body h1 .octicon-link,
  .markdown-body h2 .octicon-link,
  .markdown-body h3 .octicon-link,
  .markdown-body h4 .octicon-link,
  .markdown-body h5 .octicon-link,
  .markdown-body h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
  }

  .markdown-body h1:hover .anchor,
  .markdown-body h2:hover .anchor,
  .markdown-body h3:hover .anchor,
  .markdown-body h4:hover .anchor,
  .markdown-body h5:hover .anchor,
  .markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .markdown-body h1:hover .anchor .octicon-link,
  .markdown-body h2:hover .anchor .octicon-link,
  .markdown-body h3:hover .anchor .octicon-link,
  .markdown-body h4:hover .anchor .octicon-link,
  .markdown-body h5:hover .anchor .octicon-link,
  .markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }
  .markdown-body {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .markdown-body .pl-c {
    color: #6a737d;
  }

  .markdown-body .pl-c1,
  .markdown-body .pl-s .pl-v {
    color: #005cc5;
  }

  .markdown-body .pl-e,
  .markdown-body .pl-en {
    color: #6f42c1;
  }

  .markdown-body .pl-s .pl-s1,
  .markdown-body .pl-smi {
    color: #24292e;
  }

  .markdown-body .pl-ent {
    color: #22863a;
  }

  .markdown-body .pl-k {
    color: #d73a49;
  }

  .markdown-body .pl-pds,
  .markdown-body .pl-s,
  .markdown-body .pl-s .pl-pse .pl-s1,
  .markdown-body .pl-sr,
  .markdown-body .pl-sr .pl-cce,
  .markdown-body .pl-sr .pl-sra,
  .markdown-body .pl-sr .pl-sre {
    color: #032f62;
  }

  .markdown-body .pl-smw,
  .markdown-body .pl-v {
    color: #e36209;
  }

  .markdown-body .pl-bu {
    color: #b31d28;
  }

  .markdown-body .pl-ii {
    color: #fafbfc;
    background-color: #b31d28;
  }

  .markdown-body .pl-c2 {
    color: #fafbfc;
    background-color: #d73a49;
  }

  .markdown-body .pl-c2:before {
    content: '^M';
  }

  .markdown-body .pl-sr .pl-cce {
    font-weight: 700;
    color: #22863a;
  }

  .markdown-body .pl-ml {
    color: #735c0f;
  }

  .markdown-body .pl-mh,
  .markdown-body .pl-mh .pl-en,
  .markdown-body .pl-ms {
    font-weight: 700;
    color: #005cc5;
  }

  .markdown-body .pl-mi {
    font-style: italic;
    color: #24292e;
  }

  .markdown-body .pl-mb {
    font-weight: 700;
    color: #24292e;
  }

  .markdown-body .pl-md {
    color: #b31d28;
    background-color: #ffeef0;
  }

  .markdown-body .pl-mi1 {
    color: #22863a;
    background-color: #f0fff4;
  }

  .markdown-body .pl-mc {
    color: #e36209;
    background-color: #ffebda;
  }

  .markdown-body .pl-mi2 {
    color: #f6f8fa;
    background-color: #005cc5;
  }

  .markdown-body .pl-mdr {
    font-weight: 700;
    color: #6f42c1;
  }

  .markdown-body .pl-ba {
    color: #586069;
  }

  .markdown-body .pl-sg {
    color: #959da5;
  }

  .markdown-body .pl-corl {
    text-decoration: underline;
    color: #032f62;
  }

  .markdown-body details {
    display: block;
  }

  .markdown-body summary {
    display: list-item;
  }

  .markdown-body a {
    background-color: initial;
  }

  .markdown-body a:active,
  .markdown-body a:hover {
    outline-width: 0;
  }

  .markdown-body strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  .markdown-body h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  .markdown-body img {
    border-style: none;
  }

  .markdown-body code,
  .markdown-body kbd,
  .markdown-body pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  .markdown-body hr {
    box-sizing: initial;
    height: 0;
    overflow: visible;
  }

  .markdown-body input {
    font: inherit;
    margin: 0;
  }

  .markdown-body input {
    overflow: visible;
  }

  .markdown-body [type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
  }

  .markdown-body * {
    box-sizing: border-box;
  }

  .markdown-body input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .markdown-body a {
    color: #0366d6;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body strong {
    font-weight: 600;
  }

  .markdown-body hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
  }

  .markdown-body hr:after,
  .markdown-body hr:before {
    display: table;
    content: '';
  }

  .markdown-body hr:after {
    clear: both;
  }

  .markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .markdown-body td,
  .markdown-body th {
    padding: 0;
  }

  .markdown-body details summary {
    cursor: pointer;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body h1 {
    font-size: 32px;
  }

  .markdown-body h1,
  .markdown-body h2 {
    font-weight: 600;
  }

  .markdown-body h2 {
    font-size: 24px;
  }

  .markdown-body h3 {
    font-size: 20px;
  }

  .markdown-body h3,
  .markdown-body h4 {
    font-weight: 600;
  }

  .markdown-body h4 {
    font-size: 16px;
  }

  .markdown-body h5 {
    font-size: 14px;
  }

  .markdown-body h5,
  .markdown-body h6 {
    font-weight: 600;
  }

  .markdown-body h6 {
    font-size: 12px;
  }

  .markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .markdown-body blockquote {
    margin: 0;
  }

  .markdown-body ol,
  .markdown-body ul {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body ol ol,
  .markdown-body ul ol {
    list-style-type: lower-roman;
  }

  .markdown-body ol ol ol,
  .markdown-body ol ul ol,
  .markdown-body ul ol ol,
  .markdown-body ul ul ol {
    list-style-type: lower-alpha;
  }

  .markdown-body dd {
    margin-left: 0;
  }

  .markdown-body code,
  .markdown-body pre {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
  }

  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body input::-webkit-inner-spin-button,
  .markdown-body input::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body .border {
    border: 1px solid #e1e4e8 !important;
  }

  .markdown-body .border-0 {
    border: 0 !important;
  }

  .markdown-body .border-bottom {
    border-bottom: 1px solid #e1e4e8 !important;
  }

  .markdown-body .rounded-1 {
    border-radius: 3px !important;
  }

  .markdown-body .bg-white {
    background-color: #fff !important;
  }

  .markdown-body .bg-gray-light {
    background-color: #fafbfc !important;
  }

  .markdown-body .text-gray-light {
    color: #6a737d !important;
  }

  .markdown-body .mb-0 {
    margin-bottom: 0 !important;
  }

  .markdown-body .my-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  .markdown-body .pl-0 {
    padding-left: 0 !important;
  }

  .markdown-body .py-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .markdown-body .pl-1 {
    padding-left: 4px !important;
  }

  .markdown-body .pl-2 {
    padding-left: 8px !important;
  }

  .markdown-body .py-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }

  .markdown-body .pl-3,
  .markdown-body .px-3 {
    padding-left: 16px !important;
  }

  .markdown-body .px-3 {
    padding-right: 16px !important;
  }

  .markdown-body .pl-4 {
    padding-left: 24px !important;
  }

  .markdown-body .pl-5 {
    padding-left: 32px !important;
  }

  .markdown-body .pl-6 {
    padding-left: 40px !important;
  }

  .markdown-body .f6 {
    font-size: 12px !important;
  }

  .markdown-body .lh-condensed {
    line-height: 1.25 !important;
  }

  .markdown-body .text-bold {
    font-weight: 600 !important;
  }

  .markdown-body .pl-7 {
    padding-left: 48px !important;
  }

  .markdown-body .pl-8 {
    padding-left: 64px !important;
  }

  .markdown-body .pl-9 {
    padding-left: 80px !important;
  }

  .markdown-body .pl-10 {
    padding-left: 96px !important;
  }

  .markdown-body .pl-11 {
    padding-left: 112px !important;
  }

  .markdown-body .pl-12 {
    padding-left: 128px !important;
  }

  .markdown-body hr {
    border-bottom-color: #eee;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
  }

  .markdown-body:after,
  .markdown-body:before {
    display: table;
    content: '';
  }

  .markdown-body:after {
    clear: both;
  }

  .markdown-body > :first-child {
    margin-top: 0 !important;
  }

  .markdown-body > :last-child {
    margin-bottom: 0 !important;
  }

  .markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }
`,ce`
  .markdown-body blockquote,
  .markdown-body details,
  .markdown-body dl,
  .markdown-body ol,
  .markdown-body p,
  .markdown-body pre,
  .markdown-body table,
  .markdown-body ul {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .markdown-body hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }

  .markdown-body blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .markdown-body h1 {
    font-size: 2em;
  }

  .markdown-body h1,
  .markdown-body h2 {
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h2 {
    font-size: 1.5em;
  }

  .markdown-body h3 {
    font-size: 1.25em;
  }

  .markdown-body h4 {
    font-size: 1em;
  }

  .markdown-body h5 {
    font-size: 0.875em;
  }

  .markdown-body h6 {
    font-size: 0.85em;
    color: #6a737d;
  }

  .markdown-body ol,
  .markdown-body ul {
    padding-left: 2em;
  }

  .markdown-body ol ol,
  .markdown-body ol ul,
  .markdown-body ul ol,
  .markdown-body ul ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body li {
    word-wrap: break-all;
  }

  .markdown-body li > p {
    margin-top: 16px;
  }

  .markdown-body li + li {
    margin-top: 0.25em;
  }

  .markdown-body dl {
    padding: 0;
  }

  .markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .markdown-body table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .markdown-body table th {
    font-weight: 600;
  }

  .markdown-body table td,
  .markdown-body table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .markdown-body img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }

  .markdown-body img[align='right'] {
    padding-left: 20px;
  }

  .markdown-body img[align='left'] {
    padding-right: 20px;
  }

  .markdown-body code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .markdown-body pre {
    word-wrap: normal;
  }

  .markdown-body pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .markdown-body .highlight {
    margin-bottom: 16px;
  }

  .markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  .markdown-body pre code {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: initial;
    border: 0;
  }

  .markdown-body .commit-tease-sha {
    display: inline-block;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 90%;
    color: #444d56;
  }

  .markdown-body .full-commit .btn-outline:not(:disabled):hover {
    color: #005cc5;
    border-color: #005cc5;
  }

  .markdown-body .blob-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .markdown-body .blob-wrapper-embedded {
    max-height: 240px;
    overflow-y: auto;
  }

  .markdown-body .blob-num {
    width: 1%;
    min-width: 50px;
    padding-right: 10px;
    padding-left: 10px;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
    line-height: 20px;
    color: rgba(27, 31, 35, 0.3);
    text-align: right;
    white-space: nowrap;
    vertical-align: top;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .markdown-body .blob-num:hover {
    color: rgba(27, 31, 35, 0.6);
  }

  .markdown-body .blob-num:before {
    content: attr(data-line-number);
  }

  .markdown-body .blob-code {
    position: relative;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 20px;
    vertical-align: top;
  }

  .markdown-body .blob-code-inner {
    overflow: visible;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
    color: #24292e;
    word-wrap: normal;
    white-space: pre;
  }

  .markdown-body .pl-token.active,
  .markdown-body .pl-token:hover {
    cursor: pointer;
    background: #ffea7f;
  }

  .markdown-body :checked + .radio-label {
    position: relative;
    z-index: 1;
    border-color: #0366d6;
  }

  .markdown-body .select-menu-item input[type='radio']:not(:checked) + .octicon-check,
  .markdown-body .select-menu-item input[type='radio']:not(:checked) + .octicon-circle-slash {
    visibility: hidden;
  }

  .markdown-body .pl-7 {
    padding-left: 48px !important;
  }

  .markdown-body .pl-8 {
    padding-left: 64px !important;
  }

  .markdown-body .pl-9 {
    padding-left: 80px !important;
  }

  .markdown-body .pl-10 {
    padding-left: 96px !important;
  }

  .markdown-body .pl-11 {
    padding-left: 112px !important;
  }

  .markdown-body .pl-12 {
    padding-left: 128px !important;
  }

  .markdown-body .tab-size[data-tab-size='1'] {
    -moz-tab-size: 1;
    tab-size: 1;
  }

  .markdown-body .tab-size[data-tab-size='2'] {
    -moz-tab-size: 2;
    tab-size: 2;
  }

  .markdown-body .tab-size[data-tab-size='3'] {
    -moz-tab-size: 3;
    tab-size: 3;
  }

  .markdown-body .tab-size[data-tab-size='4'] {
    -moz-tab-size: 4;
    tab-size: 4;
  }

  .markdown-body .tab-size[data-tab-size='5'] {
    -moz-tab-size: 5;
    tab-size: 5;
  }

  .markdown-body .tab-size[data-tab-size='6'] {
    -moz-tab-size: 6;
    tab-size: 6;
  }

  .markdown-body .tab-size[data-tab-size='7'] {
    -moz-tab-size: 7;
    tab-size: 7;
  }

  .markdown-body .tab-size[data-tab-size='8'] {
    -moz-tab-size: 8;
    tab-size: 8;
  }

  .markdown-body .tab-size[data-tab-size='9'] {
    -moz-tab-size: 9;
    tab-size: 9;
  }

  .markdown-body .tab-size[data-tab-size='10'] {
    -moz-tab-size: 10;
    tab-size: 10;
  }

  .markdown-body .tab-size[data-tab-size='11'] {
    -moz-tab-size: 11;
    tab-size: 11;
  }

  .markdown-body .tab-size[data-tab-size='12'] {
    -moz-tab-size: 12;
    tab-size: 12;
  }

  .markdown-body .task-list-item {
    list-style-type: none;
  }

  .markdown-body .task-list-item + .task-list-item {
    margin-top: 3px;
  }

  .markdown-body .task-list-item input {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
  }
`];nl.registerLanguage("yaml",(function(e){var t={className:"string",relevance:0,variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,{className:"template-variable",variants:[{begin:"{{",end:"}}"},{begin:"%{",end:"}"}]}]};return{case_insensitive:!0,aliases:["yml","YAML","yaml"],contains:[{className:"attr",variants:[{begin:"\\w[\\w :\\/.-]*:(?=[ \t]|$)"},{begin:'"\\w[\\w :\\/.-]*":(?=[ \t]|$)'},{begin:"'\\w[\\w :\\/.-]*':(?=[ \t]|$)"}]},{className:"meta",begin:"^---s*$",relevance:10},{className:"string",begin:"[\\|>]([0-9]?[+-])?[ ]*\\n( *)[\\S ]+\\n(\\2[\\S ]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!"+e.UNDERSCORE_IDENT_RE},{className:"type",begin:"!!"+e.UNDERSCORE_IDENT_RE},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"\\-(?=[ ]|$)",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:"true false yes no null",keywords:{literal:"true false yes no null"}},{className:"number",begin:e.C_NUMBER_RE+"\\b"},t]}}));const al=nl,ll=ro;ll.setOptions({highlight:function(e,t){return al.highlight(t,e).value},breaks:!0,gfm:!0,tables:!0,langPrefix:""});let cl=class extends de{render(){const e=class{static html(e,t={}){if(e.includes("---\n")){var n=e.split("---\n");e=n[n.length-1]}return e=e.replace(/\:.+?\:/,""),P`
      <style>
        ${ol} ${sl}
      </style>
      <div class="markdown-body">
        ${rl(ea(ll(e,t)))}
      </div>
    `}static settings(e){var t={};return e.includes("---\n")&&3===e.split("---\n").length&&(t=tl.parse(e.split("---\n")[1])),t}}.html(this.content.content);return P`
      <paper-card>
        <div class="card-content">
          ${e}
        </div>
      </paper-card>
    `}static get styles(){return ce`
      paper-card {
        position: relative;
        width: 100%;
      }
    `}};e([se()],cl.prototype,"content",void 0),cl=e([ne("docs-card")],cl);let hl=class extends de{constructor(){super(...arguments),this.expanded=!1}firstUpdated(e){const t=window.location.hash;t.includes("#")&&(this.page=t.split("/")[1],this.category=t.replace("#","").split("/")[0]),super.firstUpdated(e),(()=>fetch(`${window.location.origin}${window.location.pathname}jsonfeed.json`).then(e=>e.json()))().then(e=>{this.docs=e})}changePage(e){this.page=e.detail.selected,window.history.pushState(null,"",`./#${this.category}/${this.page}`)}changeCategory(e){this.category=e.composedPath()[3].innerText.toLowerCase(),this.page=void 0,window.history.pushState(null,"",`./#${this.category}`)}toggleSidebar(){this.expanded=!this.expanded}render(){return void 0===this.docs?P``:(void 0===this.category&&(this.category=qs,window.history.pushState(null,"",`./#${this.category}`)),void 0===this.page&&(this.page=this.docs[this.category][0].title,window.history.pushState(null,"",`./#${this.category}/${this.page}`)),P`
    <app-header-layout has-scrolling-region>
        <div class="sidebar ${this.expanded?"expanded":""}">
          <div class="menu" @click=${this.toggleSidebar}>
            <paper-icon-item>
              <iron-icon class="iconify" icon="menu"></iron-icon>
              <span>MENU</span>
            </paper-icon-item>
          </div>
          <div class="sidebarTopItems">
          <paper-listbox>
            ${Ws.map(e=>P`
                <paper-icon-item @click=${this.changeCategory}>
                  <iron-icon class="iconify" icon=${e.icon}></iron-icon>
                  <span class="item-text">${e.category}</span>
                </paper-icon-item>
              `)}
          </paper-listbox>
          </div>

          <div class="sidebarBottomItems">
          <div class="divider"></div>
          <paper-listbox>
          ${Js.map(e=>P`
              <paper-icon-item @click=${this.changeCategory}>
                <iron-icon class="iconify" icon=${e.icon}></iron-icon>
                <span class="item-text">${e.category}</span>
              </paper-icon-item>
            `)}
              </paper-listbox>
          </div>
        </div>


        <app-header class="${this.expanded?"sidebarExpanded":""}" fixed slot="header">
          <app-toolbar>
            <div main-title>${Ks}</div>
            <iron-icon class="iconify" icon="av:mic"></iron-icon>
            <iron-icon class="iconify" icon="more-vert"></iron-icon>
          </app-toolbar>
            <paper-tabs .selected=${this.page} @iron-activate=${this.changePage} attr-for-selected="page-name" scrollable >
            ${this.docs[this.category].map(e=>P`
                <paper-tab page-name="${e.title}">${e.title}</paper-tab>
              `)}
            </paper-tabs>
        </app-header>

        ${this.docs[this.category].map(e=>e.title===this.page?P`
              <docs-card class="view ${this.expanded?"sidebarExpanded":""}" .content=${e}> </docs-card>
            `:void 0)}
  </docs-panel>
  </app-header-layout>
        `)}static get styles(){return Xs}};e([se()],hl.prototype,"docs",void 0),e([se()],hl.prototype,"page",void 0),e([se()],hl.prototype,"category",void 0),e([se()],hl.prototype,"expanded",void 0),hl=e([ne("docs-main")],hl);export{hl as Main};
