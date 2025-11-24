// This file is auto-copied. Do not edit directly.

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@webcomponents/custom-elements/custom-elements.min.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@webcomponents/custom-elements/custom-elements.min.js ***!
  \****************************************************************************/
/***/ (() => {

(function(){
/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';var n=window.Document.prototype.createElement,p=window.Document.prototype.createElementNS,aa=window.Document.prototype.importNode,ba=window.Document.prototype.prepend,ca=window.Document.prototype.append,da=window.DocumentFragment.prototype.prepend,ea=window.DocumentFragment.prototype.append,q=window.Node.prototype.cloneNode,r=window.Node.prototype.appendChild,t=window.Node.prototype.insertBefore,u=window.Node.prototype.removeChild,v=window.Node.prototype.replaceChild,w=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),y=window.Element.prototype.attachShadow,z=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),A=window.Element.prototype.getAttribute,B=window.Element.prototype.setAttribute,C=window.Element.prototype.removeAttribute,D=window.Element.prototype.toggleAttribute,E=window.Element.prototype.getAttributeNS,F=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,H=window.Element.prototype.insertAdjacentElement,fa=window.Element.prototype.insertAdjacentHTML,
ha=window.Element.prototype.prepend,ia=window.Element.prototype.append,ja=window.Element.prototype.before,ka=window.Element.prototype.after,la=window.Element.prototype.replaceWith,ma=window.Element.prototype.remove,na=window.HTMLElement,I=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),oa=window.HTMLElement.prototype.insertAdjacentElement,pa=window.HTMLElement.prototype.insertAdjacentHTML;var qa=new Set;"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(a){return qa.add(a)});function ra(a){var b=qa.has(a);a=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);return!b&&a}var sa=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);
function J(a){var b=a.isConnected;if(void 0!==b)return b;if(sa(a))return!0;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}function K(a){var b=a.children;if(b)return Array.prototype.slice.call(b);b=[];for(a=a.firstChild;a;a=a.nextSibling)a.nodeType===Node.ELEMENT_NODE&&b.push(a);return b}
function L(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
function M(a,b,d){for(var f=a;f;){if(f.nodeType===Node.ELEMENT_NODE){var c=f;b(c);var e=c.localName;if("link"===e&&"import"===c.getAttribute("rel")){f=c.import;void 0===d&&(d=new Set);if(f instanceof Node&&!d.has(f))for(d.add(f),f=f.firstChild;f;f=f.nextSibling)M(f,b,d);f=L(a,c);continue}else if("template"===e){f=L(a,c);continue}if(c=c.__CE_shadowRoot)for(c=c.firstChild;c;c=c.nextSibling)M(c,b,d)}f=f.firstChild?f.firstChild:L(a,f)}};function N(){var a=!(null===O||void 0===O||!O.noDocumentConstructionObserver),b=!(null===O||void 0===O||!O.shadyDomFastWalk);this.m=[];this.g=[];this.j=!1;this.shadyDomFastWalk=b;this.I=!a}function P(a,b,d,f){var c=window.ShadyDOM;if(a.shadyDomFastWalk&&c&&c.inUse){if(b.nodeType===Node.ELEMENT_NODE&&d(b),b.querySelectorAll)for(a=c.nativeMethods.querySelectorAll.call(b,"*"),b=0;b<a.length;b++)d(a[b])}else M(b,d,f)}function ta(a,b){a.j=!0;a.m.push(b)}function ua(a,b){a.j=!0;a.g.push(b)}
function Q(a,b){a.j&&P(a,b,function(d){return R(a,d)})}function R(a,b){if(a.j&&!b.__CE_patched){b.__CE_patched=!0;for(var d=0;d<a.m.length;d++)a.m[d](b);for(d=0;d<a.g.length;d++)a.g[d](b)}}function S(a,b){var d=[];P(a,b,function(c){return d.push(c)});for(b=0;b<d.length;b++){var f=d[b];1===f.__CE_state?a.connectedCallback(f):T(a,f)}}function U(a,b){var d=[];P(a,b,function(c){return d.push(c)});for(b=0;b<d.length;b++){var f=d[b];1===f.__CE_state&&a.disconnectedCallback(f)}}
function V(a,b,d){d=void 0===d?{}:d;var f=d.J,c=d.upgrade||function(g){return T(a,g)},e=[];P(a,b,function(g){a.j&&R(a,g);if("link"===g.localName&&"import"===g.getAttribute("rel")){var h=g.import;h instanceof Node&&(h.__CE_isImportDocument=!0,h.__CE_registry=document.__CE_registry);h&&"complete"===h.readyState?h.__CE_documentLoadHandled=!0:g.addEventListener("load",function(){var k=g.import;if(!k.__CE_documentLoadHandled){k.__CE_documentLoadHandled=!0;var l=new Set;f&&(f.forEach(function(m){return l.add(m)}),
l.delete(k));V(a,k,{J:l,upgrade:c})}})}else e.push(g)},f);for(b=0;b<e.length;b++)c(e[b])}
function T(a,b){try{var d=b.ownerDocument,f=d.__CE_registry;var c=f&&(d.defaultView||d.__CE_isImportDocument)?W(f,b.localName):void 0;if(c&&void 0===b.__CE_state){c.constructionStack.push(b);try{try{if(new c.constructorFunction!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(k){throw b.__CE_state=2,k;}b.__CE_state=1;b.__CE_definition=c;if(c.attributeChangedCallback&&b.hasAttributes()){var e=c.observedAttributes;
for(c=0;c<e.length;c++){var g=e[c],h=b.getAttribute(g);null!==h&&a.attributeChangedCallback(b,g,null,h,null)}}J(b)&&a.connectedCallback(b)}}catch(k){X(k)}}N.prototype.connectedCallback=function(a){var b=a.__CE_definition;if(b.connectedCallback)try{b.connectedCallback.call(a)}catch(d){X(d)}};N.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;if(b.disconnectedCallback)try{b.disconnectedCallback.call(a)}catch(d){X(d)}};
N.prototype.attributeChangedCallback=function(a,b,d,f,c){var e=a.__CE_definition;if(e.attributeChangedCallback&&-1<e.observedAttributes.indexOf(b))try{e.attributeChangedCallback.call(a,b,d,f,c)}catch(g){X(g)}};
function va(a,b,d,f){var c=b.__CE_registry;if(c&&(null===f||"http://www.w3.org/1999/xhtml"===f)&&(c=W(c,d)))try{var e=new c.constructorFunction;if(void 0===e.__CE_state||void 0===e.__CE_definition)throw Error("Failed to construct '"+d+"': The returned value was not constructed with the HTMLElement constructor.");if("http://www.w3.org/1999/xhtml"!==e.namespaceURI)throw Error("Failed to construct '"+d+"': The constructed element's namespace must be the HTML namespace.");if(e.hasAttributes())throw Error("Failed to construct '"+
d+"': The constructed element must not have any attributes.");if(null!==e.firstChild)throw Error("Failed to construct '"+d+"': The constructed element must not have any children.");if(null!==e.parentNode)throw Error("Failed to construct '"+d+"': The constructed element must not have a parent node.");if(e.ownerDocument!==b)throw Error("Failed to construct '"+d+"': The constructed element's owner document is incorrect.");if(e.localName!==d)throw Error("Failed to construct '"+d+"': The constructed element's local name is incorrect.");
return e}catch(g){return X(g),b=null===f?n.call(b,d):p.call(b,f,d),Object.setPrototypeOf(b,HTMLUnknownElement.prototype),b.__CE_state=2,b.__CE_definition=void 0,R(a,b),b}b=null===f?n.call(b,d):p.call(b,f,d);R(a,b);return b}
function X(a){var b="",d="",f=0,c=0;a instanceof Error?(b=a.message,d=a.sourceURL||a.fileName||"",f=a.line||a.lineNumber||0,c=a.column||a.columnNumber||0):b="Uncaught "+String(a);var e=void 0;void 0===ErrorEvent.prototype.initErrorEvent?e=new ErrorEvent("error",{cancelable:!0,message:b,filename:d,lineno:f,colno:c,error:a}):(e=document.createEvent("ErrorEvent"),e.initErrorEvent("error",!1,!0,b,d,f),e.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0}})});
void 0===e.error&&Object.defineProperty(e,"error",{configurable:!0,enumerable:!0,get:function(){return a}});window.dispatchEvent(e);e.defaultPrevented||console.error(a)};function wa(){var a=this;this.g=void 0;this.F=new Promise(function(b){a.l=b})}wa.prototype.resolve=function(a){if(this.g)throw Error("Already resolved.");this.g=a;this.l(a)};function xa(a){var b=document;this.l=void 0;this.h=a;this.g=b;V(this.h,this.g);"loading"===this.g.readyState&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}))}function ya(a){a.l&&a.l.disconnect()}xa.prototype.G=function(a){var b=this.g.readyState;"interactive"!==b&&"complete"!==b||ya(this);for(b=0;b<a.length;b++)for(var d=a[b].addedNodes,f=0;f<d.length;f++)V(this.h,d[f])};function Y(a){this.s=new Map;this.u=new Map;this.C=new Map;this.A=!1;this.B=new Map;this.o=function(b){return b()};this.i=!1;this.v=[];this.h=a;this.D=a.I?new xa(a):void 0}Y.prototype.H=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");za(this,a);this.s.set(a,b);this.v.push(a);this.i||(this.i=!0,this.o(function(){return Aa(d)}))};
Y.prototype.define=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");za(this,a);Ba(this,a,b);this.v.push(a);this.i||(this.i=!0,this.o(function(){return Aa(d)}))};function za(a,b){if(!ra(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(W(a,b))throw Error("A custom element with name '"+(b+"' has already been defined."));if(a.A)throw Error("A custom element is already being defined.");}
function Ba(a,b,d){a.A=!0;var f;try{var c=d.prototype;if(!(c instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var e=function(m){var x=c[m];if(void 0!==x&&!(x instanceof Function))throw Error("The '"+m+"' callback must be a function.");return x};var g=e("connectedCallback");var h=e("disconnectedCallback");var k=e("adoptedCallback");var l=(f=e("attributeChangedCallback"))&&d.observedAttributes||[]}catch(m){throw m;}finally{a.A=!1}d={localName:b,
constructorFunction:d,connectedCallback:g,disconnectedCallback:h,adoptedCallback:k,attributeChangedCallback:f,observedAttributes:l,constructionStack:[]};a.u.set(b,d);a.C.set(d.constructorFunction,d);return d}Y.prototype.upgrade=function(a){V(this.h,a)};
function Aa(a){if(!1!==a.i){a.i=!1;for(var b=[],d=a.v,f=new Map,c=0;c<d.length;c++)f.set(d[c],[]);V(a.h,document,{upgrade:function(k){if(void 0===k.__CE_state){var l=k.localName,m=f.get(l);m?m.push(k):a.u.has(l)&&b.push(k)}}});for(c=0;c<b.length;c++)T(a.h,b[c]);for(c=0;c<d.length;c++){for(var e=d[c],g=f.get(e),h=0;h<g.length;h++)T(a.h,g[h]);(e=a.B.get(e))&&e.resolve(void 0)}d.length=0}}Y.prototype.get=function(a){if(a=W(this,a))return a.constructorFunction};
Y.prototype.whenDefined=function(a){if(!ra(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.B.get(a);if(b)return b.F;b=new wa;this.B.set(a,b);var d=this.u.has(a)||this.s.has(a);a=-1===this.v.indexOf(a);d&&a&&b.resolve(void 0);return b.F};Y.prototype.polyfillWrapFlushCallback=function(a){this.D&&ya(this.D);var b=this.o;this.o=function(d){return a(function(){return b(d)})}};
function W(a,b){var d=a.u.get(b);if(d)return d;if(d=a.s.get(b)){a.s.delete(b);try{return Ba(a,b,d())}catch(f){X(f)}}}Y.prototype.define=Y.prototype.define;Y.prototype.upgrade=Y.prototype.upgrade;Y.prototype.get=Y.prototype.get;Y.prototype.whenDefined=Y.prototype.whenDefined;Y.prototype.polyfillDefineLazy=Y.prototype.H;Y.prototype.polyfillWrapFlushCallback=Y.prototype.polyfillWrapFlushCallback;function Z(a,b,d){function f(c){return function(e){for(var g=[],h=0;h<arguments.length;++h)g[h]=arguments[h];h=[];for(var k=[],l=0;l<g.length;l++){var m=g[l];m instanceof Element&&J(m)&&k.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)h.push(m);else h.push(m)}c.apply(this,g);for(g=0;g<k.length;g++)U(a,k[g]);if(J(this))for(g=0;g<h.length;g++)k=h[g],k instanceof Element&&S(a,k)}}void 0!==d.prepend&&(b.prepend=f(d.prepend));void 0!==d.append&&(b.append=f(d.append))};function Ca(a){Document.prototype.createElement=function(b){return va(a,this,b,null)};Document.prototype.importNode=function(b,d){b=aa.call(this,b,!!d);this.__CE_registry?V(a,b):Q(a,b);return b};Document.prototype.createElementNS=function(b,d){return va(a,this,d,b)};Z(a,Document.prototype,{prepend:ba,append:ca})};function Da(a){function b(f){return function(c){for(var e=[],g=0;g<arguments.length;++g)e[g]=arguments[g];g=[];for(var h=[],k=0;k<e.length;k++){var l=e[k];l instanceof Element&&J(l)&&h.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)g.push(l);else g.push(l)}f.apply(this,e);for(e=0;e<h.length;e++)U(a,h[e]);if(J(this))for(e=0;e<g.length;e++)h=g[e],h instanceof Element&&S(a,h)}}var d=Element.prototype;void 0!==ja&&(d.before=b(ja));void 0!==ka&&(d.after=b(ka));void 0!==la&&
(d.replaceWith=function(f){for(var c=[],e=0;e<arguments.length;++e)c[e]=arguments[e];e=[];for(var g=[],h=0;h<c.length;h++){var k=c[h];k instanceof Element&&J(k)&&g.push(k);if(k instanceof DocumentFragment)for(k=k.firstChild;k;k=k.nextSibling)e.push(k);else e.push(k)}h=J(this);la.apply(this,c);for(c=0;c<g.length;c++)U(a,g[c]);if(h)for(U(a,this),c=0;c<e.length;c++)g=e[c],g instanceof Element&&S(a,g)});void 0!==ma&&(d.remove=function(){var f=J(this);ma.call(this);f&&U(a,this)})};function Ea(a){function b(c,e){Object.defineProperty(c,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(g){var h=this,k=void 0;J(this)&&(k=[],P(a,this,function(x){x!==h&&k.push(x)}));e.set.call(this,g);if(k)for(var l=0;l<k.length;l++){var m=k[l];1===m.__CE_state&&a.disconnectedCallback(m)}this.ownerDocument.__CE_registry?V(a,this):Q(a,this);return g}})}function d(c,e){c.insertAdjacentElement=function(g,h){var k=J(h);g=e.call(this,g,h);k&&U(a,h);J(g)&&S(a,h);return g}}function f(c,
e){function g(h,k){for(var l=[];h!==k;h=h.nextSibling)l.push(h);for(k=0;k<l.length;k++)V(a,l[k])}c.insertAdjacentHTML=function(h,k){h=h.toLowerCase();if("beforebegin"===h){var l=this.previousSibling;e.call(this,h,k);g(l||this.parentNode.firstChild,this)}else if("afterbegin"===h)l=this.firstChild,e.call(this,h,k),g(this.firstChild,l);else if("beforeend"===h)l=this.lastChild,e.call(this,h,k),g(l||this.firstChild,null);else if("afterend"===h)l=this.nextSibling,e.call(this,h,k),g(this.nextSibling,l);
else throw new SyntaxError("The value provided ("+String(h)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");}}y&&(Element.prototype.attachShadow=function(c){c=y.call(this,c);if(a.j&&!c.__CE_patched){c.__CE_patched=!0;for(var e=0;e<a.m.length;e++)a.m[e](c)}return this.__CE_shadowRoot=c});z&&z.get?b(Element.prototype,z):I&&I.get?b(HTMLElement.prototype,I):ua(a,function(c){b(c,{enumerable:!0,configurable:!0,get:function(){return q.call(this,!0).innerHTML},set:function(e){var g=
"template"===this.localName,h=g?this.content:this,k=p.call(document,this.namespaceURI,this.localName);for(k.innerHTML=e;0<h.childNodes.length;)u.call(h,h.childNodes[0]);for(e=g?k.content:k;0<e.childNodes.length;)r.call(h,e.childNodes[0])}})});Element.prototype.setAttribute=function(c,e){if(1!==this.__CE_state)return B.call(this,c,e);var g=A.call(this,c);B.call(this,c,e);e=A.call(this,c);a.attributeChangedCallback(this,c,g,e,null)};Element.prototype.setAttributeNS=function(c,e,g){if(1!==this.__CE_state)return F.call(this,
c,e,g);var h=E.call(this,c,e);F.call(this,c,e,g);g=E.call(this,c,e);a.attributeChangedCallback(this,e,h,g,c)};Element.prototype.removeAttribute=function(c){if(1!==this.__CE_state)return C.call(this,c);var e=A.call(this,c);C.call(this,c);null!==e&&a.attributeChangedCallback(this,c,e,null,null)};D&&(Element.prototype.toggleAttribute=function(c,e){if(1!==this.__CE_state)return D.call(this,c,e);var g=A.call(this,c),h=null!==g;e=D.call(this,c,e);h!==e&&a.attributeChangedCallback(this,c,g,e?"":null,null);
return e});Element.prototype.removeAttributeNS=function(c,e){if(1!==this.__CE_state)return G.call(this,c,e);var g=E.call(this,c,e);G.call(this,c,e);var h=E.call(this,c,e);g!==h&&a.attributeChangedCallback(this,e,g,h,c)};oa?d(HTMLElement.prototype,oa):H&&d(Element.prototype,H);pa?f(HTMLElement.prototype,pa):fa&&f(Element.prototype,fa);Z(a,Element.prototype,{prepend:ha,append:ia});Da(a)};var Fa={};function Ga(a){function b(){var d=this.constructor;var f=document.__CE_registry.C.get(d);if(!f)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var c=f.constructionStack;if(0===c.length)return c=n.call(document,f.localName),Object.setPrototypeOf(c,d.prototype),c.__CE_state=1,c.__CE_definition=f,R(a,c),c;var e=c.length-1,g=c[e];if(g===Fa)throw Error("Failed to construct '"+f.localName+"': This element was already constructed.");c[e]=Fa;
Object.setPrototypeOf(g,d.prototype);R(a,g);return g}b.prototype=na.prototype;Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});window.HTMLElement=b};function Ha(a){function b(d,f){Object.defineProperty(d,"textContent",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(c){if(this.nodeType===Node.TEXT_NODE)f.set.call(this,c);else{var e=void 0;if(this.firstChild){var g=this.childNodes,h=g.length;if(0<h&&J(this)){e=Array(h);for(var k=0;k<h;k++)e[k]=g[k]}}f.set.call(this,c);if(e)for(c=0;c<e.length;c++)U(a,e[c])}}})}Node.prototype.insertBefore=function(d,f){if(d instanceof DocumentFragment){var c=K(d);d=t.call(this,d,f);if(J(this))for(f=
0;f<c.length;f++)S(a,c[f]);return d}c=d instanceof Element&&J(d);f=t.call(this,d,f);c&&U(a,d);J(this)&&S(a,d);return f};Node.prototype.appendChild=function(d){if(d instanceof DocumentFragment){var f=K(d);d=r.call(this,d);if(J(this))for(var c=0;c<f.length;c++)S(a,f[c]);return d}f=d instanceof Element&&J(d);c=r.call(this,d);f&&U(a,d);J(this)&&S(a,d);return c};Node.prototype.cloneNode=function(d){d=q.call(this,!!d);this.ownerDocument.__CE_registry?V(a,d):Q(a,d);return d};Node.prototype.removeChild=function(d){var f=
d instanceof Element&&J(d),c=u.call(this,d);f&&U(a,d);return c};Node.prototype.replaceChild=function(d,f){if(d instanceof DocumentFragment){var c=K(d);d=v.call(this,d,f);if(J(this))for(U(a,f),f=0;f<c.length;f++)S(a,c[f]);return d}c=d instanceof Element&&J(d);var e=v.call(this,d,f),g=J(this);g&&U(a,f);c&&U(a,d);g&&S(a,d);return e};w&&w.get?b(Node.prototype,w):ta(a,function(d){b(d,{enumerable:!0,configurable:!0,get:function(){for(var f=[],c=this.firstChild;c;c=c.nextSibling)c.nodeType!==Node.COMMENT_NODE&&
f.push(c.textContent);return f.join("")},set:function(f){for(;this.firstChild;)u.call(this,this.firstChild);null!=f&&""!==f&&r.call(this,document.createTextNode(f))}})})};var O=window.customElements;function Ia(){var a=new N;Ga(a);Ca(a);Z(a,DocumentFragment.prototype,{prepend:da,append:ea});Ha(a);Ea(a);window.CustomElementRegistry=Y;a=new Y(a);document.__CE_registry=a;Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:a})}O&&!O.forcePolyfill&&"function"==typeof O.define&&"function"==typeof O.get||Ia();window.__CE_installPolyfill=Ia;
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/errorMessages.module.scss":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/errorMessages.module.scss ***!
  \********************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy,
#PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy {
  color: var(--pico-del-color);
  visibility: visible !important;
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy a,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy a,
#PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy a {
  color: var(--pico-primary);
  text-decoration: none;
  padding: 0 5px;
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__in-trial___DUyv4,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__in-trial___DUyv4,
#PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__in-trial___DUyv4 {
  color: var(--pico-code-color);
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
#PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_ {
  position: fixed;
  left: 50%;
  bottom: calc(80px + 2em + 2.4em + 0.5em);
  transform: translateX(-50%);
  background: var(--pico-code-background-color);
  border: 1px solid var(--pico-table-border-color);
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 0;
  max-width: 80vw;
  z-index: 2;
}
@media (max-width: 768px) {
  #PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
  #PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
  #PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_ {
    width: max-content;
    max-width: 98vw;
    font-size: 0.97em;
    padding: 0.5em 1.2em;
    border-radius: 6px;
    bottom: calc(48px + 1.4rem + 0.5em);
  }
}
@media (max-width: 576px) {
  #PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
  #PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
  #PNLTranslatorContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_ {
    width: max-content;
    max-width: 98vw;
    padding: 0.5em 0.5em;
  }
}`, "",{"version":3,"sources":["webpack://./src/content/errorMessages.module.scss"],"names":[],"mappings":"AASE;;;EACE,4BAAA;EACA,8BAAA;AANJ;AAQI;;;EACE,0BAAA;EACA,qBAAA;EACA,cAAA;AAJN;AAOI;;;EACE,6BAAA;AAHN;AAMI;;;EACE,eAAA;EACA,SAAA;EACA,wCAAA;EAGA,2BAAA;EACA,6CAAA;EACA,gDAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,UAAA;AAJN;AAMM;EAfF;;;IAgBI,kBAAA;IACA,eAAA;IACA,iBAAA;IACA,oBAAA;IACA,kBAAA;IACA,mCAAA;EADN;AACF;AAKM;EA1BF;;;IA2BI,kBAAA;IACA,eAAA;IACA,oBAAA;EAAN;AACF","sourcesContent":[":global(#PNLReader),\n:global(#PNLTTSPlayerContainer),\n:global(#PNLTranslatorContainer) {\n  $playBarBottomSpacing: 2em;\n  $playBarPaddingVertical: 1.2em;\n\n  $playBarBottomSpacingOnMobile: 0px;\n  $playBarPaddingVerticalOnMobile: 0.7rem;\n\n  .pnl-reader-error-banner {\n    color: var(--pico-del-color);\n    visibility: visible !important; // override some website(reddit) styles that hide it\n\n    a {\n      color: var(--pico-primary);\n      text-decoration: none;\n      padding: 0 5px;\n    }\n\n    &.in-trial {\n      color: var(--pico-code-color);\n    }\n\n    &.for-audio {\n      position: fixed;\n      left: 50%;\n      bottom: calc(\n        80px + $playBarBottomSpacing + $playBarPaddingVertical * 2 + 0.5em\n      );\n      transform: translateX(-50%);\n      background: var(--pico-code-background-color);\n      border: 1px solid var(--pico-table-border-color);\n      border-radius: 8px;\n      padding: 10px 20px;\n      margin-bottom: 0;\n      max-width: 80vw;\n      z-index: 2;\n\n      @media (max-width: 768px) {\n        width: max-content;\n        max-width: 98vw;\n        font-size: 0.97em;\n        padding: 0.5em 1.2em;\n        border-radius: 6px;\n        bottom: calc(\n          48px + $playBarBottomSpacingOnMobile + $playBarPaddingVerticalOnMobile *\n            2 + 0.5em\n        );\n      }\n      @media (max-width: 576px) {\n        width: max-content;\n        max-width: 98vw;\n        padding: 0.5em 0.5em;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"pnl-reader-error-banner": `errorMessages-module__pnl-reader-error-banner___Qrqdy`,
	"pnlReaderErrorBanner": `errorMessages-module__pnl-reader-error-banner___Qrqdy`,
	"in-trial": `errorMessages-module__in-trial___DUyv4`,
	"inTrial": `errorMessages-module__in-trial___DUyv4`,
	"for-audio": `errorMessages-module__for-audio___ez0R_`,
	"forAudio": `errorMessages-module__for-audio___ez0R_`
};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/translation/translator.module.scss":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/translation/translator.module.scss ***!
  \*****************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@media (max-width: 960px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent .translator-module__hide-sm___vYT7I,
  #PNLTranslatorContainer .translator-module__hide-sm___vYT7I {
    display: none !important;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c {
  max-width: none;
  margin-bottom: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: var(--pico-code-background-color);
  padding: 1em 18px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (max-width: 768px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c,
  #PNLTranslatorContainer article.translator-module__translator-panel___N_B9c {
    padding: 0.2em 6px;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 {
  margin: -1em -18px;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow: hidden;
}
@media (max-width: 768px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7,
  #PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 {
    margin: -0.2em -6px;
    margin-bottom: 0.5em;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}
@media (max-width: 768px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB,
  #PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB {
    flex: none;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  flex-shrink: 1;
  padding: 18px 24px;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE,
  #PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE {
    padding: 5px;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-from-label___YZNh5,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-from-lang___atzOF,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-to-label___oILgI,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-from-label___YZNh5,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-from-lang___atzOF,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-to-label___oILgI {
  color: var(--pico-muted-color);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-arrow___A0iNP,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-lang-info___MKkKE .translator-module__translator-arrow___A0iNP {
  font-size: 1rem;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0 {
  max-width: max-content;
  flex-shrink: 0;
  font-weight: bolder;
  border: none;
  border-bottom: 1px solid var(--pico-muted-border-color);
  border-radius: 0;
  padding: 0.25rem 1.2rem 0.25rem 0.45rem;
  margin-bottom: 0;
  font-size: 0.9rem;
  height: auto;
  min-height: unset;
  background-image: url("data:image/svg+xml;charset=utf-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23495057' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-position: right 0 center;
  background-size: 16px 12px;
  background-repeat: no-repeat;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0:focus,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0:focus {
  outline: none;
  box-shadow: none;
  border-bottom-color: var(--pico-primary);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0:hover,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-lang-selector___GFfSB .translator-module__translator-target-select___K8ne0:hover {
  border-bottom-color: var(--pico-primary);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--pico-muted-color);
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  padding: 0;
  margin: 0;
  margin-right: 18px;
}
@media (max-width: 768px) {
  #PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R,
  #PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R {
    margin-right: 0;
  }
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R:hover,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-header___o6u_7 .translator-module__translator-close-btn___okE2R:hover {
  filter: brightness(1.5);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR {
  text-align: center;
  padding: 1.5rem;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-text____Ae7v,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-warning-text___t7Mk4,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-prompt-text____Ae7v,
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-text___t7Mk4,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-text____Ae7v,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-warning-text___t7Mk4,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-prompt-text____Ae7v,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-text___t7Mk4 {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-text____Ae7v,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-text____Ae7v {
  color: var(--pico-muted-color);
  font-style: italic;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-icon___i9GEj,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-prompt___pNtno .translator-module__translator-prompt-icon___i9GEj {
  font-size: 1.1rem;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 0.25rem;
  margin: 1rem;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-text___t7Mk4,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-text___t7Mk4 {
  color: var(--pico-warning, #856404);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-icon___nONHk,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-warning___1IIbR .translator-module__translator-warning-icon___nONHk {
  color: var(--pico-warning, #ffc107);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap___bZy8l,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap___bZy8l {
  display: block;
  padding-left: 0;
  margin-left: 0;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap___bZy8l .translator-module__tts-paragraph___FKlby,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap___bZy8l .translator-module__tts-paragraph___FKlby {
  text-decoration: none !important;
  color: var(--pico-color);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap--active___qxtAy .translator-module__tts-paragraph___FKlby,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN.translator-module__tts-paragraph-wrap--active___qxtAy .translator-module__tts-paragraph___FKlby {
  color: var(--pico-primary, #ffd700);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN .translator-module__translator-footer___dQwqw,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c .translator-module__translator-content___P9eDN .translator-module__translator-footer___dQwqw {
  width: 100%;
  text-align: right;
  margin-top: 1rem;
  position: relative;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c button,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c button {
  background: none;
  border: none;
  color: var(--pico-muted-color);
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
  margin-bottom: 0;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c button[hidden=true],
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c button[hidden=true] {
  display: none;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c button:hover,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c button:hover {
  opacity: 1;
  background: var(--pico-primary-focus);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c button:focus,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c button:focus {
  outline: none;
  opacity: 1;
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c.translator-module__translator-entering___PyPDr,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c.translator-module__translator-entering___PyPDr {
  animation: translator-module__translatorScaleIn___yA0YD 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
#PNLReader #PNLReaderArticle #PNLReaderArticleContent article.translator-module__translator-panel___N_B9c.translator-module__translator-closing___ll24Q,
#PNLTranslatorContainer article.translator-module__translator-panel___N_B9c.translator-module__translator-closing___ll24Q {
  transform: scale(0.96);
  opacity: 0;
  pointer-events: none;
}
@keyframes translator-module__translatorScaleIn___yA0YD {
  from {
    transform: scale(0.96);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}`, "",{"version":3,"sources":["webpack://./src/content/translation/translator.module.scss"],"names":[],"mappings":"AAII;EAFF;;IAGI,wBAAA;EADJ;AACF;AAIE;;EACE,eAAA;EACA,gBAAA;EACA,wCAAA;EACA,6CAAA;EACA,iBAAA;EACA,kBAAA;EACA,iDAAA;AADJ;AAGI;EATF;;IAUI,kBAAA;EACJ;AACF;AACI;;EACE,kBAAA;EAKA,kBAAA;EACA,UAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,WAAA;EACA,iBAAA;EACA,gBAAA;AAFN;AATM;EAFF;;IAGI,mBAAA;IACA,oBAAA;EAaN;AACF;AAHM;;EACE,aAAA;EACA,mBAAA;EACA,OAAA;EACA,YAAA;AAMR;AALQ;EALF;;IAMI,UAAA;EASR;AACF;AAPQ;;EACE,aAAA;EACA,mBAAA;EACA,YAAA;EACA,mBAAA;EACA,cAAA;EACA,kBAAA;EACA,iBAAA;AAUV;AARU;EATF;;IAUI,YAAA;EAYV;AACF;AAVU;;;;;;EAGE,8BAAA;AAeZ;AAZU;;EACE,eAAA;AAeZ;AAXQ;;EACE,sBAAA;EACA,cAAA;EACA,mBAAA;EAGA,YAAA;EACA,uDAAA;EACA,gBAAA;EACA,uCAAA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;EACA,iBAAA;EAGA,+PAAA;EACA,mCAAA;EACA,0BAAA;EACA,4BAAA;AAUV;AARU;;EACE,aAAA;EACA,gBAAA;EACA,wCAAA;AAWZ;AARU;;EACE,wCAAA;AAWZ;AANM;;EACE,gBAAA;EACA,YAAA;EACA,eAAA;EACA,8BAAA;EACA,sBAAA;EACA,yBAAA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,kBAAA;AASR;AAPQ;EAjBF;;IAkBI,eAAA;EAWR;AACF;AATQ;;EACE,uBAAA;AAYV;AAPI;;;;EAEE,kBAAA;EACA,eAAA;AAWN;AATM;;;;;;;;EAEE,SAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,iBAAA;AAiBR;AAZM;;EACE,8BAAA;EACA,kBAAA;AAeR;AAZM;;EACE,iBAAA;AAeR;AAXI;;EACE,kCAAA;EACA,wCAAA;EACA,sBAAA;EACA,YAAA;AAcN;AAZM;;EACE,mCAAA;AAeR;AAZM;;EACE,mCAAA;AAeR;AAVM;;EACE,cAAA;EACA,eAAA;EACA,cAAA;AAaR;AAZQ;;EACE,gCAAA;EACA,wBAAA;AAeV;AAZU;;EACE,mCAAA;AAeZ;AARM;;EACE,WAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;AAWR;AARI;;EACE,gBAAA;EACA,YAAA;EACA,8BAAA;EACA,gBAAA;EACA,sBAAA;EACA,eAAA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;AAWN;AAVM;;EACE,aAAA;AAaR;AAVM;;EACE,UAAA;EACA,qCAAA;AAaR;AAVM;;EACE,aAAA;EACA,UAAA;AAaR;AATI;;EACE,0FAAA;AAYN;AATI;;EACE,sBAAA;EACA,UAAA;EACA,oBAAA;AAYN;AATI;EACE;IACE,sBAAA;IACA,UAAA;EAWN;EATI;IACE,mBAAA;IACA,UAAA;EAWN;AACF","sourcesContent":[":global(#PNLReader #PNLReaderArticle #PNLReaderArticleContent),\n:global(#PNLTranslatorContainer) {\n  .hide-sm {\n    // copied from inject.scss\n    @media (max-width: 960px) {\n      display: none !important;\n    }\n  }\n\n  article.translator-panel {\n    max-width: none; // Allow full width within paragraph\n    margin-bottom: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n    background: var(--pico-code-background-color);\n    padding: 1em 18px;\n    position: relative;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n\n    @media (max-width: 768px) {\n      padding: 0.2em 6px;\n    }\n\n    .translator-header {\n      margin: -1em -18px;\n      @media (max-width: 768px) {\n        margin: -0.2em -6px;\n        margin-bottom: 0.5em;\n      }\n      margin-bottom: 1em;\n      padding: 0;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 0.5rem; // Reduce gap\n      flex-wrap: nowrap; // Prevent wrapping\n      overflow: hidden; // Prevent overflow\n\n      .translator-lang-selector {\n        display: flex;\n        align-items: center;\n        flex: 1;\n        min-width: 0; // Allow shrinking\n        @media (max-width: 768px) {\n          flex: none;\n        }\n\n        .translator-lang-info {\n          display: flex;\n          align-items: center;\n          gap: 0.25rem; // Reduce gap\n          white-space: nowrap;\n          flex-shrink: 1; // Allow this to shrink first\n          padding: 18px 24px;\n          font-size: 0.9rem;\n\n          @media (max-width: 768px) {\n            padding: 5px; // Remove padding on small screens\n          }\n\n          .translator-from-label,\n          .translator-from-lang,\n          .translator-to-label {\n            color: var(--pico-muted-color);\n          }\n\n          .translator-arrow {\n            font-size: 1rem; // Smaller arrow\n          }\n        }\n\n        .translator-target-select {\n          max-width: max-content;\n          flex-shrink: 0;\n          font-weight: bolder;\n\n          // Minimal bottom-border style\n          border: none;\n          border-bottom: 1px solid var(--pico-muted-border-color);\n          border-radius: 0;\n          padding: 0.25rem 1.2rem 0.25rem 0.45rem;\n          margin-bottom: 0;\n          font-size: 0.9rem;\n          height: auto;\n          min-height: unset;\n\n          // Style the dropdown arrow\n          background-image: url(\"data:image/svg+xml;charset=utf-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23495057' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\");\n          background-position: right 0 center;\n          background-size: 16px 12px;\n          background-repeat: no-repeat;\n\n          &:focus {\n            outline: none;\n            box-shadow: none;\n            border-bottom-color: var(--pico-primary);\n          }\n\n          &:hover {\n            border-bottom-color: var(--pico-primary);\n          }\n        }\n      }\n\n      .translator-close-btn {\n        background: none;\n        border: none;\n        cursor: pointer;\n        color: var(--pico-muted-color);\n        border-radius: 0.25rem;\n        transition: all 0.2s ease;\n        flex-shrink: 0;\n        width: 32px;\n        height: 32px;\n        font-size: 16px;\n        line-height: 32px;\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        margin-right: 18px;\n\n        @media (max-width: 768px) {\n          margin-right: 0;\n        }\n\n        &:hover {\n          filter: brightness(1.5);\n        }\n      }\n    }\n\n    .translator-prompt,\n    .translator-warning {\n      text-align: center;\n      padding: 1.5rem;\n\n      .translator-prompt-text,\n      .translator-warning-text {\n        margin: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 0.5rem;\n        font-size: 0.9rem;\n      }\n    }\n\n    .translator-prompt {\n      .translator-prompt-text {\n        color: var(--pico-muted-color);\n        font-style: italic;\n      }\n\n      .translator-prompt-icon {\n        font-size: 1.1rem;\n      }\n    }\n\n    .translator-warning {\n      background: rgba(255, 193, 7, 0.1);\n      border: 1px solid rgba(255, 193, 7, 0.3);\n      border-radius: 0.25rem;\n      margin: 1rem;\n\n      .translator-warning-text {\n        color: var(--pico-warning, #856404);\n      }\n\n      .translator-warning-icon {\n        color: var(--pico-warning, #ffc107);\n      }\n    }\n\n    .translator-content {\n      &.tts-paragraph-wrap {\n        display: block;\n        padding-left: 0;\n        margin-left: 0;\n        .tts-paragraph {\n          text-decoration: none !important;\n          color: var(--pico-color);\n        }\n        &--active {\n          .tts-paragraph {\n            color: var(\n              --pico-primary,\n              #ffd700\n            ); // subtle text highlight using theme color\n          }\n        }\n      }\n      .translator-footer {\n        width: 100%;\n        text-align: right;\n        margin-top: 1rem;\n        position: relative;\n      }\n    }\n    button {\n      background: none;\n      border: none;\n      color: var(--pico-muted-color);\n      padding: 0.25rem;\n      border-radius: 0.25rem;\n      cursor: pointer;\n      opacity: 0.7;\n      transition: all 0.2s ease;\n      margin-bottom: 0;\n      &[hidden=\"true\"] {\n        display: none;\n      }\n\n      &:hover {\n        opacity: 1;\n        background: var(--pico-primary-focus);\n      }\n\n      &:focus {\n        outline: none;\n        opacity: 1;\n      }\n    }\n\n    &.translator-entering {\n      animation: translatorScaleIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    &.translator-closing {\n      transform: scale(0.96);\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    @keyframes translatorScaleIn {\n      from {\n        transform: scale(0.96);\n        opacity: 0;\n      }\n      to {\n        transform: scale(1);\n        opacity: 1;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"hide-sm": `translator-module__hide-sm___vYT7I`,
	"hideSm": `translator-module__hide-sm___vYT7I`,
	"translator-panel": `translator-module__translator-panel___N_B9c`,
	"translatorPanel": `translator-module__translator-panel___N_B9c`,
	"translator-header": `translator-module__translator-header___o6u_7`,
	"translatorHeader": `translator-module__translator-header___o6u_7`,
	"translator-lang-selector": `translator-module__translator-lang-selector___GFfSB`,
	"translatorLangSelector": `translator-module__translator-lang-selector___GFfSB`,
	"translator-lang-info": `translator-module__translator-lang-info___MKkKE`,
	"translatorLangInfo": `translator-module__translator-lang-info___MKkKE`,
	"translator-from-label": `translator-module__translator-from-label___YZNh5`,
	"translatorFromLabel": `translator-module__translator-from-label___YZNh5`,
	"translator-from-lang": `translator-module__translator-from-lang___atzOF`,
	"translatorFromLang": `translator-module__translator-from-lang___atzOF`,
	"translator-to-label": `translator-module__translator-to-label___oILgI`,
	"translatorToLabel": `translator-module__translator-to-label___oILgI`,
	"translator-arrow": `translator-module__translator-arrow___A0iNP`,
	"translatorArrow": `translator-module__translator-arrow___A0iNP`,
	"translator-target-select": `translator-module__translator-target-select___K8ne0`,
	"translatorTargetSelect": `translator-module__translator-target-select___K8ne0`,
	"translator-close-btn": `translator-module__translator-close-btn___okE2R`,
	"translatorCloseBtn": `translator-module__translator-close-btn___okE2R`,
	"translator-prompt": `translator-module__translator-prompt___pNtno`,
	"translatorPrompt": `translator-module__translator-prompt___pNtno`,
	"translator-warning": `translator-module__translator-warning___1IIbR`,
	"translatorWarning": `translator-module__translator-warning___1IIbR`,
	"translator-prompt-text": `translator-module__translator-prompt-text____Ae7v`,
	"translatorPromptText": `translator-module__translator-prompt-text____Ae7v`,
	"translator-warning-text": `translator-module__translator-warning-text___t7Mk4`,
	"translatorWarningText": `translator-module__translator-warning-text___t7Mk4`,
	"translator-prompt-icon": `translator-module__translator-prompt-icon___i9GEj`,
	"translatorPromptIcon": `translator-module__translator-prompt-icon___i9GEj`,
	"translator-warning-icon": `translator-module__translator-warning-icon___nONHk`,
	"translatorWarningIcon": `translator-module__translator-warning-icon___nONHk`,
	"translator-content": `translator-module__translator-content___P9eDN`,
	"translatorContent": `translator-module__translator-content___P9eDN`,
	"tts-paragraph-wrap": `translator-module__tts-paragraph-wrap___bZy8l`,
	"ttsParagraphWrap": `translator-module__tts-paragraph-wrap___bZy8l`,
	"tts-paragraph": `translator-module__tts-paragraph___FKlby`,
	"ttsParagraph": `translator-module__tts-paragraph___FKlby`,
	"tts-paragraph-wrap--active": `translator-module__tts-paragraph-wrap--active___qxtAy`,
	"ttsParagraphWrapActive": `translator-module__tts-paragraph-wrap--active___qxtAy`,
	"translator-footer": `translator-module__translator-footer___dQwqw`,
	"translatorFooter": `translator-module__translator-footer___dQwqw`,
	"translator-entering": `translator-module__translator-entering___PyPDr`,
	"translatorEntering": `translator-module__translator-entering___PyPDr`,
	"translatorScaleIn": `translator-module__translatorScaleIn___yA0YD`,
	"translator-closing": `translator-module__translator-closing___ll24Q`,
	"translatorClosing": `translator-module__translator-closing___ll24Q`
};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/htm/dist/htm.module.js":
/*!*********************************************!*\
  !*** ./node_modules/htm/dist/htm.module.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var n=function(t,s,r,e){var u;s[0]=0;for(var h=1;h<s.length;h++){var p=s[h++],a=s[h]?(s[0]|=p?1:2,r[s[h++]]):s[++h];3===p?e[0]=a:4===p?e[1]=Object.assign(e[1]||{},a):5===p?(e[1]=e[1]||{})[s[++h]]=a:6===p?e[1][s[++h]]+=a+"":p?(u=t.apply(a,n(t,a,r,["",null])),e.push(u),a[0]?s[0]|=2:(s[h-2]=0,s[h]=u)):e.push(a)}return e},t=new Map;/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(s){var r=t.get(this);return r||(r=new Map,t.set(this,r)),(r=n(this,r.get(s)||(r.set(s,r=function(n){for(var t,s,r=1,e="",u="",h=[0],p=function(n){1===r&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?h.push(0,n,e):3===r&&(n||e)?(h.push(3,n,e),r=2):2===r&&"..."===e&&n?h.push(4,n,0):2===r&&e&&!n?h.push(5,0,!0,e):r>=5&&((e||!n&&5===r)&&(h.push(r,0,e,s),r=6),n&&(h.push(r,n,0,s),r=6)),e=""},a=0;a<n.length;a++){a&&(1===r&&p(),p(a));for(var l=0;l<n[a].length;l++)t=n[a][l],1===r?"<"===t?(p(),h=[h],r=3):e+=t:4===r?"--"===e&&">"===t?(r=1,e=""):e=t+e[0]:u?t===u?u="":e+=t:'"'===t||"'"===t?u=t:">"===t?(p(),r=1):r&&("="===t?(r=5,s=e,e=""):"/"===t&&(r<5||">"===n[a][l+1])?(p(),3===r&&(h=h[0]),r=h,(h=h[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(p(),r=2):e+=t),3===r&&"!--"===e&&(r=4,h=h[0])}return p(),h}(s)),r),arguments,[])).length>1?r:r[0]}


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ x),
/* harmony export */   Fragment: () => (/* binding */ k),
/* harmony export */   cloneElement: () => (/* binding */ G),
/* harmony export */   createContext: () => (/* binding */ J),
/* harmony export */   createElement: () => (/* binding */ _),
/* harmony export */   createRef: () => (/* binding */ b),
/* harmony export */   h: () => (/* binding */ _),
/* harmony export */   hydrate: () => (/* binding */ E),
/* harmony export */   isValidElement: () => (/* binding */ t),
/* harmony export */   options: () => (/* binding */ l),
/* harmony export */   render: () => (/* binding */ D),
/* harmony export */   toChildArray: () => (/* binding */ H)
/* harmony export */ });
var n,l,u,t,i,r,o,e,f,c,s,a,h,p={},v=[],y=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function w(n,l){for(var u in l)n[u]=l[u];return n}function g(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function _(l,u,t){var i,r,o,e={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o];if(arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps)void 0===e[o]&&(e[o]=l.defaultProps[o]);return m(l,e,i,r,null)}function m(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u:o,__i:-1,__u:0};return null==o&&null!=l.vnode&&l.vnode(e),e}function b(){return{current:null}}function k(n){return n.children}function x(n,l){this.props=n,this.context=l}function S(n,l){if(null==l)return n.__?S(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?S(n):null}function C(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C(n)}}function M(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!$.__r++||r!==l.debounceRendering)&&((r=l.debounceRendering)||o)($)}function $(){for(var n,u,t,r,o,f,c,s=1;i.length;)i.length>s&&i.sort(e),n=i.shift(),s=i.length,n.__d&&(t=void 0,o=(r=(u=n).__v).__e,f=[],c=[],u.__P&&((t=w({},r)).__v=r.__v+1,l.vnode&&l.vnode(t),j(u.__P,t,r,u.__n,u.__P.namespaceURI,32&r.__u?[o]:null,f,null==o?S(r):o,!!(32&r.__u),c),t.__v=r.__v,t.__.__k[t.__i]=t,z(f,t,c),t.__e!=o&&C(t)));$.__r=0}function I(n,l,u,t,i,r,o,e,f,c,s){var a,h,y,d,w,g,_=t&&t.__k||v,m=l.length;for(f=P(u,l,_,f,m),a=0;a<m;a++)null!=(y=u.__k[a])&&(h=-1===y.__i?p:_[y.__i]||p,y.__i=a,g=j(n,y,h,i,r,o,e,f,c,s),d=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&V(h.ref,null,y),s.push(y.ref,y.__c||d,y)),null==w&&null!=d&&(w=d),4&y.__u||h.__k===y.__k?f=A(y,f,n):"function"==typeof y.type&&void 0!==g?f=g:d&&(f=d.nextSibling),y.__u&=-7);return u.__e=w,f}function P(n,l,u,t,i){var r,o,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),r=0;r<i;r++)null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?(f=r+h,(o=n.__k[r]="string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?m(null,o,null,null,null):d(o)?m(k,{children:o},null,null,null):void 0===o.constructor&&o.__b>0?m(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,e=null,-1!==(c=o.__i=L(o,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null===e.__v?(-1==c&&h--,"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null;if(a)for(r=0;r<s;r++)null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=S(e)),q(e,e));return t}function A(n,l,u){var t,i;if("function"==typeof n.type){for(t=n.__k,i=0;t&&i<t.length;i++)t[i]&&(t[i].__=n,l=A(t[i],l,u));return l}n.__e!=l&&(l&&n.type&&!u.contains(l)&&(l=S(n)),u.insertBefore(n.__e,l||null),l=n.__e);do{l=l&&l.nextSibling}while(null!=l&&8==l.nodeType);return l}function H(n,l){return l=l||[],null==n||"boolean"==typeof n||(d(n)?n.some(function(n){H(n,l)}):l.push(n)),l}function L(n,l,u,t){var i,r,o=n.key,e=n.type,f=l[u];if(null===f||f&&o==f.key&&e===f.type&&0==(2&f.__u))return u;if(t>(null!=f&&0==(2&f.__u)?1:0))for(i=u-1,r=u+1;i>=0||r<l.length;){if(i>=0){if((f=l[i])&&0==(2&f.__u)&&o==f.key&&e===f.type)return i;i--}if(r<l.length){if((f=l[r])&&0==(2&f.__u)&&o==f.key&&e===f.type)return r;r++}}return-1}function T(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y.test(l)?u:u+"px"}function F(n,l,u,t,i){var r;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||T(n.style,l,u[l])}else if("o"==l[0]&&"n"==l[1])r=l!=(l=l.replace(f,"$1")),l=l.toLowerCase()in n||"onFocusOut"==l||"onFocusIn"==l?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u.u=t.u:(u.u=c,n.addEventListener(l,r?a:s,r)):n.removeEventListener(l,r?a:s,r);else{if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u))}}function O(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=c++;else if(u.t<t.u)return;return t(l.event?l.event(u):u)}}}function j(n,u,t,i,r,o,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,F,O=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof O)try{if(b=u.props,S="prototype"in O&&O.prototype.render,C=(a=O.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new O(b,M):(u.__c=h=new x(b,M),h.constructor=O,h.render=B),C&&C.sub(h),h.props=b,h.state||(h.state={}),h.context=M,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=O.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=w({},h.__s)),w(h.__s,O.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p)S&&null==O.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(S&&null==O.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),!h.__e&&(null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)||u.__v==t.__v)){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u)}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_)})}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[]}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s}while(h.__d&&++A<25);h.state=h.__s,null!=h.getChildContext&&(i=w(w({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),T=(L=null!=a&&a.type===k&&null==a.key)?a.props.children:a,L&&(a.props.children=null),f=I(n,d(T)?T:[T],u,t,i,r,o,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null)}catch(n){if(u.__v=null,c||null!=o)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;o[o.indexOf(f)]=null,u.__e=f}else for(F=o.length;F--;)g(o[F]);else u.__e=t.__e,u.__k=t.__k;l.__e(n,u,t)}else null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=N(t.__e,u,t,i,r,o,e,c,s);return(a=l.diffed)&&a(u),128&u.__u?void 0:f}function z(n,u,t){for(var i=0;i<t.length;i++)V(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function N(u,t,i,r,o,e,f,c,s){var a,h,v,y,w,_,m,b=i.props,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e)for(a=0;a<e.length;a++)if((w=e[a])&&"setAttribute"in w==!!x&&(x?w.localName==x:3==w.nodeType)){u=w,e[a]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(o,x,k.is&&k),c&&(l.__m&&l.__m(t,e),c=!1),e=null}if(null===x)b===k||c&&u.data===k||(u.data=k);else{if(e=e&&n.call(u.childNodes),b=i.props||p,!c&&null!=e)for(b={},a=0;a<u.attributes.length;a++)b[(w=u.attributes[a]).name]=w.value;for(a in b)if(w=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)v=w;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;F(u,a,null,w,o)}for(a in k)w=k[a],"children"==a?y=w:"dangerouslySetInnerHTML"==a?h=w:"value"==a?_=w:"checked"==a?m=w:c&&"function"!=typeof w||b[a]===w||F(u,a,w,b[a],o);if(h)c||v&&(h.__html===v.__html||h.__html===u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(v&&(u.innerHTML=""),I("template"===t.type?u.content:u,d(y)?y:[y],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&S(i,0),c,s),null!=e)for(a=e.length;a--;)g(e[a]);c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):void 0!==_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!==b[a])&&F(u,a,_,b[a],o),a="checked",void 0!==m&&m!==u[a]&&F(u,a,m,b[a],o))}return u}function V(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u))}else n.current=u}catch(n){l.__e(n,t)}}function q(n,u,t){var i,r;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||V(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&q(i[r],u,t||"function"!=typeof n.type);t||g(n.__e),n.__c=n.__=n.__e=void 0}function B(n,l,u){return this.constructor(n,u)}function D(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l.__&&l.__(u,t),o=(r="function"==typeof i)?null:i&&i.__k||t.__k,e=[],f=[],j(t,u=(!r&&i||t).__k=_(k,null,[u]),o||p,p,t.namespaceURI,!r&&i?[i]:o?null:t.firstChild?n.call(t.childNodes):null,e,!r&&i?i:o?o.__e:t.firstChild,r,f),z(e,u,f)}function E(n,l){D(n,l,E)}function G(l,u,t){var i,r,o,e,f=w({},l.props);for(o in l.type&&l.type.defaultProps&&(e=l.type.defaultProps),u)"key"==o?i=u[o]:"ref"==o?r=u[o]:f[o]=void 0===u[o]&&void 0!==e?e[o]:u[o];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),m(l.type,f,i||l.key,r||l.ref,null)}function J(n){function l(n){var u,t;return this.getChildContext||(u=new Set,(t={})[l.__c]=this,this.getChildContext=function(){return t},this.componentWillUnmount=function(){u=null},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.forEach(function(n){n.__e=!0,M(n)})},this.sub=function(n){u.add(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u&&u.delete(n),l&&l.call(n)}}),n.children}return l.__c="__cC"+h++,l.__=n,l.Provider=l.__l=(l.Consumer=function(n,l){return n.children(l)}).contextType=l,l}n=v.slice,l={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&null==n.constructor},x.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=w({},this.state),"function"==typeof n&&(n=n(w({},u),this.props)),n&&w(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this))},x.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),M(this))},x.prototype.render=k,i=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e=function(n,l){return n.__v.__b-l.__v.__b},$.__r=0,f=/(PointerCapture)$|Capture$/i,c=0,s=O(!1),a=O(!0),h=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ q),
/* harmony export */   useContext: () => (/* binding */ x),
/* harmony export */   useDebugValue: () => (/* binding */ P),
/* harmony export */   useEffect: () => (/* binding */ y),
/* harmony export */   useErrorBoundary: () => (/* binding */ b),
/* harmony export */   useId: () => (/* binding */ g),
/* harmony export */   useImperativeHandle: () => (/* binding */ F),
/* harmony export */   useLayoutEffect: () => (/* binding */ _),
/* harmony export */   useMemo: () => (/* binding */ T),
/* harmony export */   useReducer: () => (/* binding */ h),
/* harmony export */   useRef: () => (/* binding */ A),
/* harmony export */   useState: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,r,u,i,o=0,f=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options,e=c.__b,a=c.__r,v=c.diffed,l=c.__c,m=c.unmount,s=c.__;function p(n,t){c.__h&&c.__h(r,n,o||t),o=0;var u=r.__H||(r.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function d(n){return o=1,h(D,n)}function h(n,u,i){var o=p(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.__f)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return!!n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=o.__c.props!==n;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),c&&c.call(this,n,t,r)||i};r.__f=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function y(n,u){var i=p(t++,3);!c.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r.__H.__h.push(i))}function _(n,u){var i=p(t++,4);!c.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r.__h.push(i))}function A(n){return o=5,T(function(){return{current:n}},[])}function F(n,t,r){o=6,_(function(){if("function"==typeof n){var r=n(t());return function(){n(null),r&&"function"==typeof r&&r()}}if(n)return n.current=t(),function(){return n.current=null}},null==r?r:r.concat(n))}function T(n,r){var u=p(t++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function q(n,t){return o=8,T(function(){return n},t)}function x(n){var u=r.context[n.__c],i=p(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function P(n,t){c.useDebugValue&&c.useDebugValue(t?t(n):n)}function b(n){var u=p(t++,10),i=d();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function g(){var n=p(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++}return n.__}function j(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B),n.__H.__h=[]}catch(t){n.__H.__h=[],c.__e(t,n.__v)}}c.__b=function(n){r=null,e&&e(n)},c.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s&&s(n,t)},c.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(i.__h.forEach(z),i.__h.forEach(B),i.__h=[],t=0)),u=r},c.diffed=function(n){v&&v(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===c.requestAnimationFrame||((i=c.requestAnimationFrame)||w)(j)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),u=r=null},c.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return!n.__||B(n)})}catch(r){t.some(function(n){n.__h&&(n.__h=[])}),t=[],c.__e(r,n.__v)}}),l&&l(n,t)},c.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n)}catch(n){t=n}}),r.__H=void 0,t&&c.__e(t,r.__v))};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);k&&(t=requestAnimationFrame(r))}function z(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t}function B(n){var t=r;n.__c=n.__(),r=t}function C(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/@picocss/pico/scss/pico.scss?inline":
/*!**********************************************************!*\
  !*** ./node_modules/@picocss/pico/scss/pico.scss?inline ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("@charset \"UTF-8\";\n/*!\n * Pico CSS ✨ v2.1.1 (https://picocss.com)\n * Copyright 2019-2025 - Licensed under MIT\n */\n/**\n * Styles\n */\n:root,\n:host {\n  --pico-font-family-emoji: \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --pico-font-family-sans-serif: system-ui, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, Helvetica, Arial, \"Helvetica Neue\", sans-serif, var(--pico-font-family-emoji);\n  --pico-font-family-monospace: ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace, var(--pico-font-family-emoji);\n  --pico-font-family: var(--pico-font-family-sans-serif);\n  --pico-line-height: 1.5;\n  --pico-font-weight: 400;\n  --pico-font-size: 100%;\n  --pico-text-underline-offset: 0.1rem;\n  --pico-border-radius: 0.25rem;\n  --pico-border-width: 0.0625rem;\n  --pico-outline-width: 0.125rem;\n  --pico-transition: 0.2s ease-in-out;\n  --pico-spacing: 1rem;\n  --pico-typography-spacing-vertical: 1rem;\n  --pico-block-spacing-vertical: var(--pico-spacing);\n  --pico-block-spacing-horizontal: var(--pico-spacing);\n  --pico-grid-column-gap: var(--pico-spacing);\n  --pico-grid-row-gap: var(--pico-spacing);\n  --pico-form-element-spacing-vertical: 0.75rem;\n  --pico-form-element-spacing-horizontal: 1rem;\n  --pico-group-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);\n  --pico-group-box-shadow-focus-with-input: 0 0 0 0.0625rem var(--pico-form-element-border-color);\n  --pico-modal-overlay-backdrop-filter: blur(0.375rem);\n  --pico-nav-element-spacing-vertical: 1rem;\n  --pico-nav-element-spacing-horizontal: 0.5rem;\n  --pico-nav-link-spacing-vertical: 0.5rem;\n  --pico-nav-link-spacing-horizontal: 0.5rem;\n  --pico-nav-breadcrumb-divider: \">\";\n  --pico-icon-checkbox: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(255, 255, 255)' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  --pico-icon-minus: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(255, 255, 255)' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E\");\n  --pico-icon-chevron: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n  --pico-icon-date: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E\");\n  --pico-icon-time: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E\");\n  --pico-icon-search: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E\");\n  --pico-icon-close: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(136, 145, 164)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E\");\n  --pico-icon-loading: url(\"data:image/svg+xml,%3Csvg fill='none' height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' %3E%3Cstyle%3E g %7B animation: rotate 2s linear infinite; transform-origin: center center; %7D circle %7B stroke-dasharray: 75,100; stroke-dashoffset: -5; animation: dash 1.5s ease-in-out infinite; stroke-linecap: round; %7D @keyframes rotate %7B 0%25 %7B transform: rotate(0deg); %7D 100%25 %7B transform: rotate(360deg); %7D %7D @keyframes dash %7B 0%25 %7B stroke-dasharray: 1,100; stroke-dashoffset: 0; %7D 50%25 %7B stroke-dasharray: 44.5,100; stroke-dashoffset: -17.5; %7D 100%25 %7B stroke-dasharray: 44.5,100; stroke-dashoffset: -62; %7D %7D %3C/style%3E%3Cg%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='rgb(136, 145, 164)' stroke-width='4' /%3E%3C/g%3E%3C/svg%3E\");\n}\n@media (min-width: 576px) {\n  :root,\n  :host {\n    --pico-font-size: 106.25%;\n  }\n}\n@media (min-width: 768px) {\n  :root,\n  :host {\n    --pico-font-size: 112.5%;\n  }\n}\n@media (min-width: 1024px) {\n  :root,\n  :host {\n    --pico-font-size: 118.75%;\n  }\n}\n@media (min-width: 1280px) {\n  :root,\n  :host {\n    --pico-font-size: 125%;\n  }\n}\n@media (min-width: 1536px) {\n  :root,\n  :host {\n    --pico-font-size: 131.25%;\n  }\n}\n\na {\n  --pico-text-decoration: underline;\n}\na.secondary, a.contrast {\n  --pico-text-decoration: underline;\n}\n\nsmall {\n  --pico-font-size: 0.875em;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  --pico-font-weight: 700;\n}\n\nh1 {\n  --pico-font-size: 2rem;\n  --pico-line-height: 1.125;\n  --pico-typography-spacing-top: 3rem;\n}\n\nh2 {\n  --pico-font-size: 1.75rem;\n  --pico-line-height: 1.15;\n  --pico-typography-spacing-top: 2.625rem;\n}\n\nh3 {\n  --pico-font-size: 1.5rem;\n  --pico-line-height: 1.175;\n  --pico-typography-spacing-top: 2.25rem;\n}\n\nh4 {\n  --pico-font-size: 1.25rem;\n  --pico-line-height: 1.2;\n  --pico-typography-spacing-top: 1.874rem;\n}\n\nh5 {\n  --pico-font-size: 1.125rem;\n  --pico-line-height: 1.225;\n  --pico-typography-spacing-top: 1.6875rem;\n}\n\nh6 {\n  --pico-font-size: 1rem;\n  --pico-line-height: 1.25;\n  --pico-typography-spacing-top: 1.5rem;\n}\n\nthead th,\nthead td,\ntfoot th,\ntfoot td {\n  --pico-font-weight: 600;\n  --pico-border-width: 0.1875rem;\n}\n\npre,\ncode,\nkbd,\nsamp {\n  --pico-font-family: var(--pico-font-family-monospace);\n}\n\nkbd {\n  --pico-font-weight: bolder;\n}\n\ninput:not([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[type=file]),\n:where(select, textarea) {\n  --pico-outline-width: 0.0625rem;\n}\n\n[type=search] {\n  --pico-border-radius: 5rem;\n}\n\n[type=checkbox],\n[type=radio] {\n  --pico-border-width: 0.125rem;\n}\n\n[type=checkbox][role=switch] {\n  --pico-border-width: 0.1875rem;\n}\n\ndetails.dropdown summary:not([role=button]) {\n  --pico-outline-width: 0.0625rem;\n}\n\nnav details.dropdown summary:focus-visible {\n  --pico-outline-width: 0.125rem;\n}\n\n[role=search] {\n  --pico-border-radius: 5rem;\n}\n\n[role=search]:has(button.secondary:focus,\n[type=submit].secondary:focus,\n[type=button].secondary:focus,\n[role=button].secondary:focus),\n[role=group]:has(button.secondary:focus,\n[type=submit].secondary:focus,\n[type=button].secondary:focus,\n[role=button].secondary:focus) {\n  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);\n}\n[role=search]:has(button.contrast:focus,\n[type=submit].contrast:focus,\n[type=button].contrast:focus,\n[role=button].contrast:focus),\n[role=group]:has(button.contrast:focus,\n[type=submit].contrast:focus,\n[type=button].contrast:focus,\n[role=button].contrast:focus) {\n  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);\n}\n[role=search] button,\n[role=search] [type=submit],\n[role=search] [type=button],\n[role=search] [role=button],\n[role=group] button,\n[role=group] [type=submit],\n[role=group] [type=button],\n[role=group] [role=button] {\n  --pico-form-element-spacing-horizontal: 2rem;\n}\n\ndetails summary[role=button]:not(.outline)::after {\n  filter: brightness(0) invert(1);\n}\n\n[aria-busy=true]:not(input, select, textarea):is(button, [type=submit], [type=button], [type=reset], [role=button]):not(.outline)::before {\n  filter: brightness(0) invert(1);\n}\n\n/**\n * Color schemes\n */\n[data-theme=light],\n:root:not([data-theme=dark]),\n:host(:not([data-theme=dark])) {\n  color-scheme: light;\n  --pico-background-color: #fff;\n  --pico-color: #373c44;\n  --pico-text-selection-color: rgba(2, 154, 232, 0.25);\n  --pico-muted-color: #646b79;\n  --pico-muted-border-color: rgb(231, 234, 239.5);\n  --pico-primary: #0172ad;\n  --pico-primary-background: #0172ad;\n  --pico-primary-border: var(--pico-primary-background);\n  --pico-primary-underline: rgba(1, 114, 173, 0.5);\n  --pico-primary-hover: #015887;\n  --pico-primary-hover-background: #02659a;\n  --pico-primary-hover-border: var(--pico-primary-hover-background);\n  --pico-primary-hover-underline: var(--pico-primary-hover);\n  --pico-primary-focus: rgba(2, 154, 232, 0.5);\n  --pico-primary-inverse: #fff;\n  --pico-secondary: #5d6b89;\n  --pico-secondary-background: #525f7a;\n  --pico-secondary-border: var(--pico-secondary-background);\n  --pico-secondary-underline: rgba(93, 107, 137, 0.5);\n  --pico-secondary-hover: #48536b;\n  --pico-secondary-hover-background: #48536b;\n  --pico-secondary-hover-border: var(--pico-secondary-hover-background);\n  --pico-secondary-hover-underline: var(--pico-secondary-hover);\n  --pico-secondary-focus: rgba(93, 107, 137, 0.25);\n  --pico-secondary-inverse: #fff;\n  --pico-contrast: #181c25;\n  --pico-contrast-background: #181c25;\n  --pico-contrast-border: var(--pico-contrast-background);\n  --pico-contrast-underline: rgba(24, 28, 37, 0.5);\n  --pico-contrast-hover: #000;\n  --pico-contrast-hover-background: #000;\n  --pico-contrast-hover-border: var(--pico-contrast-hover-background);\n  --pico-contrast-hover-underline: var(--pico-secondary-hover);\n  --pico-contrast-focus: rgba(93, 107, 137, 0.25);\n  --pico-contrast-inverse: #fff;\n  --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(129, 145, 181, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(129, 145, 181, 0.024), 0.0625rem 0.125rem 0.75rem rgba(129, 145, 181, 0.03), 0.1125rem 0.225rem 1.35rem rgba(129, 145, 181, 0.036), 0.2085rem 0.417rem 2.502rem rgba(129, 145, 181, 0.04302), 0.5rem 1rem 6rem rgba(129, 145, 181, 0.06), 0 0 0 0.0625rem rgba(129, 145, 181, 0.015);\n  --pico-h1-color: #2d3138;\n  --pico-h2-color: #373c44;\n  --pico-h3-color: #424751;\n  --pico-h4-color: #4d535e;\n  --pico-h5-color: #5c6370;\n  --pico-h6-color: #646b79;\n  --pico-mark-background-color: rgb(252.5, 230.5, 191.5);\n  --pico-mark-color: #0f1114;\n  --pico-ins-color: rgb(28.5, 105.5, 84);\n  --pico-del-color: rgb(136, 56.5, 53);\n  --pico-blockquote-border-color: var(--pico-muted-border-color);\n  --pico-blockquote-footer-color: var(--pico-muted-color);\n  --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-table-border-color: var(--pico-muted-border-color);\n  --pico-table-row-stripped-background-color: rgba(111, 120, 135, 0.0375);\n  --pico-code-background-color: rgb(243, 244.5, 246.75);\n  --pico-code-color: #646b79;\n  --pico-code-kbd-background-color: var(--pico-color);\n  --pico-code-kbd-color: var(--pico-background-color);\n  --pico-form-element-background-color: rgb(251, 251.5, 252.25);\n  --pico-form-element-selected-background-color: #dfe3eb;\n  --pico-form-element-border-color: #cfd5e2;\n  --pico-form-element-color: #23262c;\n  --pico-form-element-placeholder-color: var(--pico-muted-color);\n  --pico-form-element-active-background-color: #fff;\n  --pico-form-element-active-border-color: var(--pico-primary-border);\n  --pico-form-element-focus-color: var(--pico-primary-border);\n  --pico-form-element-disabled-opacity: 0.5;\n  --pico-form-element-invalid-border-color: rgb(183.5, 105.5, 106.5);\n  --pico-form-element-invalid-active-border-color: rgb(200.25, 79.25, 72.25);\n  --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);\n  --pico-form-element-valid-border-color: rgb(76, 154.5, 137.5);\n  --pico-form-element-valid-active-border-color: rgb(39, 152.75, 118.75);\n  --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);\n  --pico-switch-background-color: #bfc7d9;\n  --pico-switch-checked-background-color: var(--pico-primary-background);\n  --pico-switch-color: #fff;\n  --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-range-border-color: #dfe3eb;\n  --pico-range-active-border-color: #bfc7d9;\n  --pico-range-thumb-border-color: var(--pico-background-color);\n  --pico-range-thumb-color: var(--pico-secondary-background);\n  --pico-range-thumb-active-color: var(--pico-primary-background);\n  --pico-accordion-border-color: var(--pico-muted-border-color);\n  --pico-accordion-active-summary-color: var(--pico-primary-hover);\n  --pico-accordion-close-summary-color: var(--pico-color);\n  --pico-accordion-open-summary-color: var(--pico-muted-color);\n  --pico-card-background-color: var(--pico-background-color);\n  --pico-card-border-color: var(--pico-muted-border-color);\n  --pico-card-box-shadow: var(--pico-box-shadow);\n  --pico-card-sectioning-background-color: rgb(251, 251.5, 252.25);\n  --pico-dropdown-background-color: #fff;\n  --pico-dropdown-border-color: #eff1f4;\n  --pico-dropdown-box-shadow: var(--pico-box-shadow);\n  --pico-dropdown-color: var(--pico-color);\n  --pico-dropdown-hover-background-color: #eff1f4;\n  --pico-loading-spinner-opacity: 0.5;\n  --pico-modal-overlay-background-color: rgba(232, 234, 237, 0.75);\n  --pico-progress-background-color: #dfe3eb;\n  --pico-progress-color: var(--pico-primary-background);\n  --pico-tooltip-background-color: var(--pico-contrast-background);\n  --pico-tooltip-color: var(--pico-contrast-inverse);\n  --pico-icon-valid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(76, 154.5, 137.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  --pico-icon-invalid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(200.25, 79.25, 72.25)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E\");\n}\n[data-theme=light] input:is([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[type=file]),\n:root:not([data-theme=dark]) input:is([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[type=file]),\n:host(:not([data-theme=dark])) input:is([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[type=file]) {\n  --pico-form-element-focus-color: var(--pico-primary-focus);\n}\n\n@media only screen and (prefers-color-scheme: dark) {\n  :root:not([data-theme]),\n  :host(:not([data-theme])) {\n    color-scheme: dark;\n    --pico-background-color: rgb(19, 22.5, 30.5);\n    --pico-color: #c2c7d0;\n    --pico-text-selection-color: rgba(1, 170, 255, 0.1875);\n    --pico-muted-color: #7b8495;\n    --pico-muted-border-color: #202632;\n    --pico-primary: #01aaff;\n    --pico-primary-background: #0172ad;\n    --pico-primary-border: var(--pico-primary-background);\n    --pico-primary-underline: rgba(1, 170, 255, 0.5);\n    --pico-primary-hover: #79c0ff;\n    --pico-primary-hover-background: #017fc0;\n    --pico-primary-hover-border: var(--pico-primary-hover-background);\n    --pico-primary-hover-underline: var(--pico-primary-hover);\n    --pico-primary-focus: rgba(1, 170, 255, 0.375);\n    --pico-primary-inverse: #fff;\n    --pico-secondary: #969eaf;\n    --pico-secondary-background: #525f7a;\n    --pico-secondary-border: var(--pico-secondary-background);\n    --pico-secondary-underline: rgba(150, 158, 175, 0.5);\n    --pico-secondary-hover: #b3b9c5;\n    --pico-secondary-hover-background: #5d6b89;\n    --pico-secondary-hover-border: var(--pico-secondary-hover-background);\n    --pico-secondary-hover-underline: var(--pico-secondary-hover);\n    --pico-secondary-focus: rgba(144, 158, 190, 0.25);\n    --pico-secondary-inverse: #fff;\n    --pico-contrast: #dfe3eb;\n    --pico-contrast-background: #eff1f4;\n    --pico-contrast-border: var(--pico-contrast-background);\n    --pico-contrast-underline: rgba(223, 227, 235, 0.5);\n    --pico-contrast-hover: #fff;\n    --pico-contrast-hover-background: #fff;\n    --pico-contrast-hover-border: var(--pico-contrast-hover-background);\n    --pico-contrast-hover-underline: var(--pico-contrast-hover);\n    --pico-contrast-focus: rgba(207, 213, 226, 0.25);\n    --pico-contrast-inverse: #000;\n    --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(7, 8.5, 12, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(7, 8.5, 12, 0.024), 0.0625rem 0.125rem 0.75rem rgba(7, 8.5, 12, 0.03), 0.1125rem 0.225rem 1.35rem rgba(7, 8.5, 12, 0.036), 0.2085rem 0.417rem 2.502rem rgba(7, 8.5, 12, 0.04302), 0.5rem 1rem 6rem rgba(7, 8.5, 12, 0.06), 0 0 0 0.0625rem rgba(7, 8.5, 12, 0.015);\n    --pico-h1-color: #f0f1f3;\n    --pico-h2-color: #e0e3e7;\n    --pico-h3-color: #c2c7d0;\n    --pico-h4-color: #b3b9c5;\n    --pico-h5-color: #a4acba;\n    --pico-h6-color: #8891a4;\n    --pico-mark-background-color: #014063;\n    --pico-mark-color: #fff;\n    --pico-ins-color: #62af9a;\n    --pico-del-color: rgb(205.5, 126, 123);\n    --pico-blockquote-border-color: var(--pico-muted-border-color);\n    --pico-blockquote-footer-color: var(--pico-muted-color);\n    --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    --pico-table-border-color: var(--pico-muted-border-color);\n    --pico-table-row-stripped-background-color: rgba(111, 120, 135, 0.0375);\n    --pico-code-background-color: rgb(26, 30.5, 40.25);\n    --pico-code-color: #8891a4;\n    --pico-code-kbd-background-color: var(--pico-color);\n    --pico-code-kbd-color: var(--pico-background-color);\n    --pico-form-element-background-color: rgb(28, 33, 43.5);\n    --pico-form-element-selected-background-color: #2a3140;\n    --pico-form-element-border-color: #2a3140;\n    --pico-form-element-color: #e0e3e7;\n    --pico-form-element-placeholder-color: #8891a4;\n    --pico-form-element-active-background-color: rgb(26, 30.5, 40.25);\n    --pico-form-element-active-border-color: var(--pico-primary-border);\n    --pico-form-element-focus-color: var(--pico-primary-border);\n    --pico-form-element-disabled-opacity: 0.5;\n    --pico-form-element-invalid-border-color: rgb(149.5, 74, 80);\n    --pico-form-element-invalid-active-border-color: rgb(183.25, 63.5, 59);\n    --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);\n    --pico-form-element-valid-border-color: #2a7b6f;\n    --pico-form-element-valid-active-border-color: rgb(22, 137, 105.5);\n    --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);\n    --pico-switch-background-color: #333c4e;\n    --pico-switch-checked-background-color: var(--pico-primary-background);\n    --pico-switch-color: #fff;\n    --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    --pico-range-border-color: #202632;\n    --pico-range-active-border-color: #2a3140;\n    --pico-range-thumb-border-color: var(--pico-background-color);\n    --pico-range-thumb-color: var(--pico-secondary-background);\n    --pico-range-thumb-active-color: var(--pico-primary-background);\n    --pico-accordion-border-color: var(--pico-muted-border-color);\n    --pico-accordion-active-summary-color: var(--pico-primary-hover);\n    --pico-accordion-close-summary-color: var(--pico-color);\n    --pico-accordion-open-summary-color: var(--pico-muted-color);\n    --pico-card-background-color: #181c25;\n    --pico-card-border-color: var(--pico-card-background-color);\n    --pico-card-box-shadow: var(--pico-box-shadow);\n    --pico-card-sectioning-background-color: rgb(26, 30.5, 40.25);\n    --pico-dropdown-background-color: #181c25;\n    --pico-dropdown-border-color: #202632;\n    --pico-dropdown-box-shadow: var(--pico-box-shadow);\n    --pico-dropdown-color: var(--pico-color);\n    --pico-dropdown-hover-background-color: #202632;\n    --pico-loading-spinner-opacity: 0.5;\n    --pico-modal-overlay-background-color: rgba(7.5, 8.5, 10, 0.75);\n    --pico-progress-background-color: #202632;\n    --pico-progress-color: var(--pico-primary-background);\n    --pico-tooltip-background-color: var(--pico-contrast-background);\n    --pico-tooltip-color: var(--pico-contrast-inverse);\n    --pico-icon-valid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(42, 123, 111)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n    --pico-icon-invalid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(149.5, 74, 80)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E\");\n  }\n  :root:not([data-theme]) input:is([type=submit],\n  [type=button],\n  [type=reset],\n  [type=checkbox],\n  [type=radio],\n  [type=file]),\n  :host(:not([data-theme])) input:is([type=submit],\n  [type=button],\n  [type=reset],\n  [type=checkbox],\n  [type=radio],\n  [type=file]) {\n    --pico-form-element-focus-color: var(--pico-primary-focus);\n  }\n  :root:not([data-theme]) details summary[role=button].contrast:not(.outline)::after,\n  :host(:not([data-theme])) details summary[role=button].contrast:not(.outline)::after {\n    filter: brightness(0);\n  }\n  :root:not([data-theme]) [aria-busy=true]:not(input, select, textarea).contrast:is(button,\n  [type=submit],\n  [type=button],\n  [type=reset],\n  [role=button]):not(.outline)::before,\n  :host(:not([data-theme])) [aria-busy=true]:not(input, select, textarea).contrast:is(button,\n  [type=submit],\n  [type=button],\n  [type=reset],\n  [role=button]):not(.outline)::before {\n    filter: brightness(0);\n  }\n}\n[data-theme=dark] {\n  color-scheme: dark;\n  --pico-background-color: rgb(19, 22.5, 30.5);\n  --pico-color: #c2c7d0;\n  --pico-text-selection-color: rgba(1, 170, 255, 0.1875);\n  --pico-muted-color: #7b8495;\n  --pico-muted-border-color: #202632;\n  --pico-primary: #01aaff;\n  --pico-primary-background: #0172ad;\n  --pico-primary-border: var(--pico-primary-background);\n  --pico-primary-underline: rgba(1, 170, 255, 0.5);\n  --pico-primary-hover: #79c0ff;\n  --pico-primary-hover-background: #017fc0;\n  --pico-primary-hover-border: var(--pico-primary-hover-background);\n  --pico-primary-hover-underline: var(--pico-primary-hover);\n  --pico-primary-focus: rgba(1, 170, 255, 0.375);\n  --pico-primary-inverse: #fff;\n  --pico-secondary: #969eaf;\n  --pico-secondary-background: #525f7a;\n  --pico-secondary-border: var(--pico-secondary-background);\n  --pico-secondary-underline: rgba(150, 158, 175, 0.5);\n  --pico-secondary-hover: #b3b9c5;\n  --pico-secondary-hover-background: #5d6b89;\n  --pico-secondary-hover-border: var(--pico-secondary-hover-background);\n  --pico-secondary-hover-underline: var(--pico-secondary-hover);\n  --pico-secondary-focus: rgba(144, 158, 190, 0.25);\n  --pico-secondary-inverse: #fff;\n  --pico-contrast: #dfe3eb;\n  --pico-contrast-background: #eff1f4;\n  --pico-contrast-border: var(--pico-contrast-background);\n  --pico-contrast-underline: rgba(223, 227, 235, 0.5);\n  --pico-contrast-hover: #fff;\n  --pico-contrast-hover-background: #fff;\n  --pico-contrast-hover-border: var(--pico-contrast-hover-background);\n  --pico-contrast-hover-underline: var(--pico-contrast-hover);\n  --pico-contrast-focus: rgba(207, 213, 226, 0.25);\n  --pico-contrast-inverse: #000;\n  --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(7, 8.5, 12, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(7, 8.5, 12, 0.024), 0.0625rem 0.125rem 0.75rem rgba(7, 8.5, 12, 0.03), 0.1125rem 0.225rem 1.35rem rgba(7, 8.5, 12, 0.036), 0.2085rem 0.417rem 2.502rem rgba(7, 8.5, 12, 0.04302), 0.5rem 1rem 6rem rgba(7, 8.5, 12, 0.06), 0 0 0 0.0625rem rgba(7, 8.5, 12, 0.015);\n  --pico-h1-color: #f0f1f3;\n  --pico-h2-color: #e0e3e7;\n  --pico-h3-color: #c2c7d0;\n  --pico-h4-color: #b3b9c5;\n  --pico-h5-color: #a4acba;\n  --pico-h6-color: #8891a4;\n  --pico-mark-background-color: #014063;\n  --pico-mark-color: #fff;\n  --pico-ins-color: #62af9a;\n  --pico-del-color: rgb(205.5, 126, 123);\n  --pico-blockquote-border-color: var(--pico-muted-border-color);\n  --pico-blockquote-footer-color: var(--pico-muted-color);\n  --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-table-border-color: var(--pico-muted-border-color);\n  --pico-table-row-stripped-background-color: rgba(111, 120, 135, 0.0375);\n  --pico-code-background-color: rgb(26, 30.5, 40.25);\n  --pico-code-color: #8891a4;\n  --pico-code-kbd-background-color: var(--pico-color);\n  --pico-code-kbd-color: var(--pico-background-color);\n  --pico-form-element-background-color: rgb(28, 33, 43.5);\n  --pico-form-element-selected-background-color: #2a3140;\n  --pico-form-element-border-color: #2a3140;\n  --pico-form-element-color: #e0e3e7;\n  --pico-form-element-placeholder-color: #8891a4;\n  --pico-form-element-active-background-color: rgb(26, 30.5, 40.25);\n  --pico-form-element-active-border-color: var(--pico-primary-border);\n  --pico-form-element-focus-color: var(--pico-primary-border);\n  --pico-form-element-disabled-opacity: 0.5;\n  --pico-form-element-invalid-border-color: rgb(149.5, 74, 80);\n  --pico-form-element-invalid-active-border-color: rgb(183.25, 63.5, 59);\n  --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);\n  --pico-form-element-valid-border-color: #2a7b6f;\n  --pico-form-element-valid-active-border-color: rgb(22, 137, 105.5);\n  --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);\n  --pico-switch-background-color: #333c4e;\n  --pico-switch-checked-background-color: var(--pico-primary-background);\n  --pico-switch-color: #fff;\n  --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n  --pico-range-border-color: #202632;\n  --pico-range-active-border-color: #2a3140;\n  --pico-range-thumb-border-color: var(--pico-background-color);\n  --pico-range-thumb-color: var(--pico-secondary-background);\n  --pico-range-thumb-active-color: var(--pico-primary-background);\n  --pico-accordion-border-color: var(--pico-muted-border-color);\n  --pico-accordion-active-summary-color: var(--pico-primary-hover);\n  --pico-accordion-close-summary-color: var(--pico-color);\n  --pico-accordion-open-summary-color: var(--pico-muted-color);\n  --pico-card-background-color: #181c25;\n  --pico-card-border-color: var(--pico-card-background-color);\n  --pico-card-box-shadow: var(--pico-box-shadow);\n  --pico-card-sectioning-background-color: rgb(26, 30.5, 40.25);\n  --pico-dropdown-background-color: #181c25;\n  --pico-dropdown-border-color: #202632;\n  --pico-dropdown-box-shadow: var(--pico-box-shadow);\n  --pico-dropdown-color: var(--pico-color);\n  --pico-dropdown-hover-background-color: #202632;\n  --pico-loading-spinner-opacity: 0.5;\n  --pico-modal-overlay-background-color: rgba(7.5, 8.5, 10, 0.75);\n  --pico-progress-background-color: #202632;\n  --pico-progress-color: var(--pico-primary-background);\n  --pico-tooltip-background-color: var(--pico-contrast-background);\n  --pico-tooltip-color: var(--pico-contrast-inverse);\n  --pico-icon-valid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(42, 123, 111)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  --pico-icon-invalid: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(149.5, 74, 80)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E\");\n}\n[data-theme=dark] input:is([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[type=file]) {\n  --pico-form-element-focus-color: var(--pico-primary-focus);\n}\n[data-theme=dark] details summary[role=button].contrast:not(.outline)::after {\n  filter: brightness(0);\n}\n[data-theme=dark] [aria-busy=true]:not(input, select, textarea).contrast:is(button,\n[type=submit],\n[type=button],\n[type=reset],\n[role=button]):not(.outline)::before {\n  filter: brightness(0);\n}\n\nprogress,\n[type=checkbox],\n[type=radio],\n[type=range] {\n  accent-color: var(--pico-primary);\n}\n\n/**\n * Document\n * Content-box & Responsive typography\n */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  background-repeat: no-repeat;\n}\n\n::before,\n::after {\n  text-decoration: inherit;\n  vertical-align: inherit;\n}\n\n:where(:root),\n:where(:host) {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n  background-color: var(--pico-background-color);\n  color: var(--pico-color);\n  font-weight: var(--pico-font-weight);\n  font-size: var(--pico-font-size);\n  line-height: var(--pico-line-height);\n  font-family: var(--pico-font-family);\n  text-underline-offset: var(--pico-text-underline-offset);\n  text-rendering: optimizeLegibility;\n  overflow-wrap: break-word;\n  tab-size: 4;\n}\n\n/**\n * Landmarks\n */\nbody {\n  width: 100%;\n  margin: 0;\n}\n\nmain {\n  display: block;\n}\n\nbody > header,\nbody > main,\nbody > footer {\n  padding-block: var(--pico-block-spacing-vertical);\n}\n\n/**\n * Section\n */\nsection {\n  margin-bottom: var(--pico-block-spacing-vertical);\n}\n\n/**\n * Container\n */\n.container,\n.container-fluid {\n  width: 100%;\n  margin-right: auto;\n  margin-left: auto;\n  padding-right: var(--pico-spacing);\n  padding-left: var(--pico-spacing);\n}\n\n@media (min-width: 576px) {\n  .container {\n    max-width: 510px;\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 768px) {\n  .container {\n    max-width: 700px;\n  }\n}\n@media (min-width: 1024px) {\n  .container {\n    max-width: 950px;\n  }\n}\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1200px;\n  }\n}\n@media (min-width: 1536px) {\n  .container {\n    max-width: 1450px;\n  }\n}\n\n/**\n * Grid\n * Minimal grid system with auto-layout columns\n */\n.grid {\n  grid-column-gap: var(--pico-grid-column-gap);\n  grid-row-gap: var(--pico-grid-row-gap);\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: repeat(auto-fit, minmax(0%, 1fr));\n  }\n}\n.grid > * {\n  min-width: 0;\n}\n\n/**\n * Overflow auto\n */\n.overflow-auto {\n  overflow: auto;\n}\n\n/**\n * Typography\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\nsub,\nsup {\n  position: relative;\n  font-size: 0.75em;\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\naddress,\nblockquote,\ndl,\nol,\np,\npre,\ntable,\nul {\n  margin-top: 0;\n  margin-bottom: var(--pico-typography-spacing-vertical);\n  color: var(--pico-color);\n  font-style: normal;\n  font-weight: var(--pico-font-weight);\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 0;\n  margin-bottom: var(--pico-typography-spacing-vertical);\n  color: var(--pico-color);\n  font-weight: var(--pico-font-weight);\n  font-size: var(--pico-font-size);\n  line-height: var(--pico-line-height);\n  font-family: var(--pico-font-family);\n}\n\nh1 {\n  --pico-color: var(--pico-h1-color);\n}\n\nh2 {\n  --pico-color: var(--pico-h2-color);\n}\n\nh3 {\n  --pico-color: var(--pico-h3-color);\n}\n\nh4 {\n  --pico-color: var(--pico-h4-color);\n}\n\nh5 {\n  --pico-color: var(--pico-h5-color);\n}\n\nh6 {\n  --pico-color: var(--pico-h6-color);\n}\n\n:where(article, address, blockquote, dl, figure, form, ol, p, pre, table, ul) ~ :is(h1, h2, h3, h4, h5, h6) {\n  margin-top: var(--pico-typography-spacing-top);\n}\n\np {\n  margin-bottom: var(--pico-typography-spacing-vertical);\n}\n\nhgroup {\n  margin-bottom: var(--pico-typography-spacing-vertical);\n}\nhgroup > * {\n  margin-top: 0;\n  margin-bottom: 0;\n}\nhgroup > *:not(:first-child):last-child {\n  --pico-color: var(--pico-muted-color);\n  --pico-font-weight: unset;\n  font-size: 1rem;\n}\n\n:where(ol, ul) li {\n  margin-bottom: calc(var(--pico-typography-spacing-vertical) * 0.25);\n}\n\n:where(dl, ol, ul) :where(dl, ol, ul) {\n  margin: 0;\n  margin-top: calc(var(--pico-typography-spacing-vertical) * 0.25);\n}\n\nul li {\n  list-style: square;\n}\n\nmark {\n  padding: 0.125rem 0.25rem;\n  background-color: var(--pico-mark-background-color);\n  color: var(--pico-mark-color);\n  vertical-align: baseline;\n}\n\nblockquote {\n  display: block;\n  margin: var(--pico-typography-spacing-vertical) 0;\n  padding: var(--pico-spacing);\n  border-right: none;\n  border-left: 0.25rem solid var(--pico-blockquote-border-color);\n  border-inline-start: 0.25rem solid var(--pico-blockquote-border-color);\n  border-inline-end: none;\n}\nblockquote footer {\n  margin-top: calc(var(--pico-typography-spacing-vertical) * 0.5);\n  color: var(--pico-blockquote-footer-color);\n}\n\nabbr[title] {\n  border-bottom: 1px dotted;\n  text-decoration: none;\n  cursor: help;\n}\n\nins {\n  color: var(--pico-ins-color);\n  text-decoration: none;\n}\n\ndel {\n  color: var(--pico-del-color);\n}\n\n::selection {\n  background-color: var(--pico-text-selection-color);\n}\n\n/**\n * Link\n */\n:where(a:not([role=button])),\n[role=link] {\n  --pico-color: var(--pico-primary);\n  --pico-background-color: transparent;\n  --pico-underline: var(--pico-primary-underline);\n  outline: none;\n  background-color: var(--pico-background-color);\n  color: var(--pico-color);\n  text-decoration: var(--pico-text-decoration);\n  text-decoration-color: var(--pico-underline);\n  text-underline-offset: 0.125em;\n  transition: background-color var(--pico-transition), color var(--pico-transition), text-decoration var(--pico-transition), box-shadow var(--pico-transition);\n}\n:where(a:not([role=button])):is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[role=link]:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-color: var(--pico-primary-hover);\n  --pico-underline: var(--pico-primary-hover-underline);\n  --pico-text-decoration: underline;\n}\n:where(a:not([role=button])):focus-visible,\n[role=link]:focus-visible {\n  box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);\n}\n:where(a:not([role=button])).secondary,\n[role=link].secondary {\n  --pico-color: var(--pico-secondary);\n  --pico-underline: var(--pico-secondary-underline);\n}\n:where(a:not([role=button])).secondary:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[role=link].secondary:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-color: var(--pico-secondary-hover);\n  --pico-underline: var(--pico-secondary-hover-underline);\n}\n:where(a:not([role=button])).contrast,\n[role=link].contrast {\n  --pico-color: var(--pico-contrast);\n  --pico-underline: var(--pico-contrast-underline);\n}\n:where(a:not([role=button])).contrast:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[role=link].contrast:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-color: var(--pico-contrast-hover);\n  --pico-underline: var(--pico-contrast-hover-underline);\n}\n\na[role=button] {\n  display: inline-block;\n}\n\n/**\n * Button\n */\nbutton {\n  margin: 0;\n  overflow: visible;\n  font-family: inherit;\n  text-transform: none;\n}\n\nbutton,\n[type=submit],\n[type=reset],\n[type=button] {\n  -webkit-appearance: button;\n}\n\nbutton,\n[type=submit],\n[type=reset],\n[type=button],\n[type=file]::file-selector-button,\n[role=button] {\n  --pico-background-color: var(--pico-primary-background);\n  --pico-border-color: var(--pico-primary-border);\n  --pico-color: var(--pico-primary-inverse);\n  --pico-box-shadow: var(--pico-button-box-shadow, 0 0 0 rgba(0, 0, 0, 0));\n  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);\n  border: var(--pico-border-width) solid var(--pico-border-color);\n  border-radius: var(--pico-border-radius);\n  outline: none;\n  background-color: var(--pico-background-color);\n  box-shadow: var(--pico-box-shadow);\n  color: var(--pico-color);\n  font-weight: var(--pico-font-weight);\n  font-size: 1rem;\n  line-height: var(--pico-line-height);\n  text-align: center;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);\n}\nbutton:is([aria-current]:not([aria-current=false])), button:is(:hover, :active, :focus),\n[type=submit]:is([aria-current]:not([aria-current=false])),\n[type=submit]:is(:hover, :active, :focus),\n[type=reset]:is([aria-current]:not([aria-current=false])),\n[type=reset]:is(:hover, :active, :focus),\n[type=button]:is([aria-current]:not([aria-current=false])),\n[type=button]:is(:hover, :active, :focus),\n[type=file]::file-selector-button:is([aria-current]:not([aria-current=false])),\n[type=file]::file-selector-button:is(:hover, :active, :focus),\n[role=button]:is([aria-current]:not([aria-current=false])),\n[role=button]:is(:hover, :active, :focus) {\n  --pico-background-color: var(--pico-primary-hover-background);\n  --pico-border-color: var(--pico-primary-hover-border);\n  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0));\n  --pico-color: var(--pico-primary-inverse);\n}\nbutton:focus, button:is([aria-current]:not([aria-current=false])):focus,\n[type=submit]:focus,\n[type=submit]:is([aria-current]:not([aria-current=false])):focus,\n[type=reset]:focus,\n[type=reset]:is([aria-current]:not([aria-current=false])):focus,\n[type=button]:focus,\n[type=button]:is([aria-current]:not([aria-current=false])):focus,\n[type=file]::file-selector-button:focus,\n[type=file]::file-selector-button:is([aria-current]:not([aria-current=false])):focus,\n[role=button]:focus,\n[role=button]:is([aria-current]:not([aria-current=false])):focus {\n  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);\n}\n\n[type=submit],\n[type=reset],\n[type=button] {\n  margin-bottom: var(--pico-spacing);\n}\n\n:is(button, [type=submit], [type=button], [role=button]).secondary,\n[type=reset],\n[type=file]::file-selector-button {\n  --pico-background-color: var(--pico-secondary-background);\n  --pico-border-color: var(--pico-secondary-border);\n  --pico-color: var(--pico-secondary-inverse);\n  cursor: pointer;\n}\n:is(button, [type=submit], [type=button], [role=button]).secondary:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[type=reset]:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[type=file]::file-selector-button:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-background-color: var(--pico-secondary-hover-background);\n  --pico-border-color: var(--pico-secondary-hover-border);\n  --pico-color: var(--pico-secondary-inverse);\n}\n:is(button, [type=submit], [type=button], [role=button]).secondary:focus, :is(button, [type=submit], [type=button], [role=button]).secondary:is([aria-current]:not([aria-current=false])):focus,\n[type=reset]:focus,\n[type=reset]:is([aria-current]:not([aria-current=false])):focus,\n[type=file]::file-selector-button:focus,\n[type=file]::file-selector-button:is([aria-current]:not([aria-current=false])):focus {\n  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);\n}\n\n:is(button, [type=submit], [type=button], [role=button]).contrast {\n  --pico-background-color: var(--pico-contrast-background);\n  --pico-border-color: var(--pico-contrast-border);\n  --pico-color: var(--pico-contrast-inverse);\n}\n:is(button, [type=submit], [type=button], [role=button]).contrast:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-background-color: var(--pico-contrast-hover-background);\n  --pico-border-color: var(--pico-contrast-hover-border);\n  --pico-color: var(--pico-contrast-inverse);\n}\n:is(button, [type=submit], [type=button], [role=button]).contrast:focus, :is(button, [type=submit], [type=button], [role=button]).contrast:is([aria-current]:not([aria-current=false])):focus {\n  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);\n}\n\n:is(button, [type=submit], [type=button], [role=button]).outline,\n[type=reset].outline {\n  --pico-background-color: transparent;\n  --pico-color: var(--pico-primary);\n  --pico-border-color: var(--pico-primary);\n}\n:is(button, [type=submit], [type=button], [role=button]).outline:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[type=reset].outline:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-background-color: transparent;\n  --pico-color: var(--pico-primary-hover);\n  --pico-border-color: var(--pico-primary-hover);\n}\n\n:is(button, [type=submit], [type=button], [role=button]).outline.secondary,\n[type=reset].outline {\n  --pico-color: var(--pico-secondary);\n  --pico-border-color: var(--pico-secondary);\n}\n:is(button, [type=submit], [type=button], [role=button]).outline.secondary:is([aria-current]:not([aria-current=false]), :hover, :active, :focus),\n[type=reset].outline:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-color: var(--pico-secondary-hover);\n  --pico-border-color: var(--pico-secondary-hover);\n}\n\n:is(button, [type=submit], [type=button], [role=button]).outline.contrast {\n  --pico-color: var(--pico-contrast);\n  --pico-border-color: var(--pico-contrast);\n}\n:is(button, [type=submit], [type=button], [role=button]).outline.contrast:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  --pico-color: var(--pico-contrast-hover);\n  --pico-border-color: var(--pico-contrast-hover);\n}\n\n:where(button, [type=submit], [type=reset], [type=button], [role=button])[disabled],\n:where(fieldset[disabled]) :is(button, [type=submit], [type=button], [type=reset], [role=button]) {\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n/**\n * Table\n */\n:where(table) {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  text-indent: 0;\n}\n\nth,\ntd {\n  padding: calc(var(--pico-spacing) / 2) var(--pico-spacing);\n  border-bottom: var(--pico-border-width) solid var(--pico-table-border-color);\n  background-color: var(--pico-background-color);\n  color: var(--pico-color);\n  font-weight: var(--pico-font-weight);\n  text-align: left;\n  text-align: start;\n}\n\ntfoot th,\ntfoot td {\n  border-top: var(--pico-border-width) solid var(--pico-table-border-color);\n  border-bottom: 0;\n}\n\ntable.striped tbody tr:nth-child(odd) th,\ntable.striped tbody tr:nth-child(odd) td {\n  background-color: var(--pico-table-row-stripped-background-color);\n}\n\n/**\n * Embedded content\n */\n:where(audio, canvas, iframe, img, svg, video) {\n  vertical-align: middle;\n}\n\naudio,\nvideo {\n  display: inline-block;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n:where(iframe) {\n  border-style: none;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n  border-style: none;\n}\n\n:where(svg:not([fill])) {\n  fill: currentColor;\n}\n\nsvg:not(:root),\nsvg:not(:host) {\n  overflow: hidden;\n}\n\n/**\n * Code\n */\npre,\ncode,\nkbd,\nsamp {\n  font-size: 0.875em;\n  font-family: var(--pico-font-family);\n}\n\npre code,\npre samp {\n  font-size: inherit;\n  font-family: inherit;\n}\n\npre {\n  -ms-overflow-style: scrollbar;\n  overflow: auto;\n}\n\npre,\ncode,\nkbd,\nsamp {\n  border-radius: var(--pico-border-radius);\n  background: var(--pico-code-background-color);\n  color: var(--pico-code-color);\n  font-weight: var(--pico-font-weight);\n  line-height: initial;\n}\n\ncode,\nkbd,\nsamp {\n  display: inline-block;\n  padding: 0.375rem;\n}\n\npre {\n  display: block;\n  margin-bottom: var(--pico-spacing);\n  overflow-x: auto;\n}\npre > code,\npre > samp {\n  display: block;\n  padding: var(--pico-spacing);\n  background: none;\n  line-height: var(--pico-line-height);\n}\n\nkbd {\n  background-color: var(--pico-code-kbd-background-color);\n  color: var(--pico-code-kbd-color);\n  vertical-align: baseline;\n}\n\n/**\n * Figure\n */\nfigure {\n  display: block;\n  margin: 0;\n  padding: 0;\n}\nfigure figcaption {\n  padding: calc(var(--pico-spacing) * 0.5) 0;\n  color: var(--pico-muted-color);\n}\n\n/**\n * Misc\n */\nhr {\n  height: 0;\n  margin: var(--pico-typography-spacing-vertical) 0;\n  border: 0;\n  border-top: 1px solid var(--pico-muted-border-color);\n  color: inherit;\n}\n\n[hidden],\ntemplate {\n  display: none !important;\n}\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Basics form elements\n */\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n  font-size: 1rem;\n  line-height: var(--pico-line-height);\n  font-family: inherit;\n  letter-spacing: inherit;\n}\n\ninput {\n  overflow: visible;\n}\n\nselect {\n  text-transform: none;\n}\n\nlegend {\n  max-width: 100%;\n  padding: 0;\n  color: inherit;\n  white-space: normal;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=checkbox],\n[type=radio] {\n  padding: 0;\n}\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=search] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\n::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\n:-moz-focusring {\n  outline: none;\n}\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n::-ms-expand {\n  display: none;\n}\n\n[type=file],\n[type=range] {\n  padding: 0;\n  border-width: 0;\n}\n\ninput:not([type=checkbox], [type=radio], [type=range]) {\n  height: calc(1rem * var(--pico-line-height) + var(--pico-form-element-spacing-vertical) * 2 + var(--pico-border-width) * 2);\n}\n\nfieldset {\n  width: 100%;\n  margin: 0;\n  margin-bottom: var(--pico-spacing);\n  padding: 0;\n  border: 0;\n}\n\nlabel,\nfieldset legend {\n  display: block;\n  margin-bottom: calc(var(--pico-spacing) * 0.375);\n  color: var(--pico-color);\n  font-weight: var(--pico-form-label-font-weight, var(--pico-font-weight));\n}\n\nfieldset legend {\n  margin-bottom: calc(var(--pico-spacing) * 0.5);\n}\n\ninput:not([type=checkbox], [type=radio]),\nbutton[type=submit],\nselect,\ntextarea {\n  width: 100%;\n}\n\ninput:not([type=checkbox], [type=radio], [type=range], [type=file]),\nselect,\ntextarea {\n  appearance: none;\n  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);\n}\n\ninput,\nselect,\ntextarea {\n  --pico-background-color: var(--pico-form-element-background-color);\n  --pico-border-color: var(--pico-form-element-border-color);\n  --pico-color: var(--pico-form-element-color);\n  --pico-box-shadow: none;\n  border: var(--pico-border-width) solid var(--pico-border-color);\n  border-radius: var(--pico-border-radius);\n  outline: none;\n  background-color: var(--pico-background-color);\n  box-shadow: var(--pico-box-shadow);\n  color: var(--pico-color);\n  font-weight: var(--pico-font-weight);\n  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);\n}\n\ninput:not([type=submit],\n[type=button],\n[type=reset],\n[type=checkbox],\n[type=radio],\n[readonly]):is(:active, :focus),\n:where(select, textarea):not([readonly]):is(:active, :focus) {\n  --pico-background-color: var(--pico-form-element-active-background-color);\n}\n\ninput:not([type=submit], [type=button], [type=reset], [role=switch], [readonly]):is(:active, :focus),\n:where(select, textarea):not([readonly]):is(:active, :focus) {\n  --pico-border-color: var(--pico-form-element-active-border-color);\n}\n\ninput:not([type=submit],\n[type=button],\n[type=reset],\n[type=range],\n[type=file],\n[readonly]):focus,\n:where(select, textarea):not([readonly]):focus {\n  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);\n}\n\ninput:not([type=submit], [type=button], [type=reset])[disabled],\nselect[disabled],\ntextarea[disabled],\nlabel[aria-disabled=true],\n:where(fieldset[disabled]) :is(input:not([type=submit], [type=button], [type=reset]), select, textarea) {\n  opacity: var(--pico-form-element-disabled-opacity);\n  pointer-events: none;\n}\n\nlabel[aria-disabled=true] input[disabled] {\n  opacity: 1;\n}\n\n:where(input, select, textarea):not([type=checkbox],\n[type=radio],\n[type=date],\n[type=datetime-local],\n[type=month],\n[type=time],\n[type=week],\n[type=range])[aria-invalid] {\n  padding-right: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem) !important;\n  padding-left: var(--pico-form-element-spacing-horizontal);\n  padding-inline-start: var(--pico-form-element-spacing-horizontal) !important;\n  padding-inline-end: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem) !important;\n  background-position: center right 0.75rem;\n  background-size: 1rem auto;\n  background-repeat: no-repeat;\n}\n:where(input, select, textarea):not([type=checkbox],\n[type=radio],\n[type=date],\n[type=datetime-local],\n[type=month],\n[type=time],\n[type=week],\n[type=range])[aria-invalid=false]:not(select) {\n  background-image: var(--pico-icon-valid);\n}\n:where(input, select, textarea):not([type=checkbox],\n[type=radio],\n[type=date],\n[type=datetime-local],\n[type=month],\n[type=time],\n[type=week],\n[type=range])[aria-invalid=true]:not(select) {\n  background-image: var(--pico-icon-invalid);\n}\n:where(input, select, textarea)[aria-invalid=false] {\n  --pico-border-color: var(--pico-form-element-valid-border-color);\n}\n:where(input, select, textarea)[aria-invalid=false]:is(:active, :focus) {\n  --pico-border-color: var(--pico-form-element-valid-active-border-color) !important;\n}\n:where(input, select, textarea)[aria-invalid=false]:is(:active, :focus):not([type=checkbox], [type=radio]) {\n  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-valid-focus-color) !important;\n}\n:where(input, select, textarea)[aria-invalid=true] {\n  --pico-border-color: var(--pico-form-element-invalid-border-color);\n}\n:where(input, select, textarea)[aria-invalid=true]:is(:active, :focus) {\n  --pico-border-color: var(--pico-form-element-invalid-active-border-color) !important;\n}\n:where(input, select, textarea)[aria-invalid=true]:is(:active, :focus):not([type=checkbox], [type=radio]) {\n  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-invalid-focus-color) !important;\n}\n\n[dir=rtl] :where(input, select, textarea):not([type=checkbox], [type=radio]):is([aria-invalid], [aria-invalid=true], [aria-invalid=false]) {\n  background-position: center left 0.75rem;\n}\n\ninput::placeholder,\ninput::-webkit-input-placeholder,\ntextarea::placeholder,\ntextarea::-webkit-input-placeholder,\nselect:invalid {\n  color: var(--pico-form-element-placeholder-color);\n  opacity: 1;\n}\n\ninput:not([type=checkbox], [type=radio]),\nselect,\ntextarea {\n  margin-bottom: var(--pico-spacing);\n}\n\nselect::-ms-expand {\n  border: 0;\n  background-color: transparent;\n}\nselect:not([multiple], [size]) {\n  padding-right: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem);\n  padding-left: var(--pico-form-element-spacing-horizontal);\n  padding-inline-start: var(--pico-form-element-spacing-horizontal);\n  padding-inline-end: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem);\n  background-image: var(--pico-icon-chevron);\n  background-position: center right 0.75rem;\n  background-size: 1rem auto;\n  background-repeat: no-repeat;\n}\nselect[multiple] option:checked {\n  background: var(--pico-form-element-selected-background-color);\n  color: var(--pico-form-element-color);\n}\n\n[dir=rtl] select:not([multiple], [size]) {\n  background-position: center left 0.75rem;\n}\n\ntextarea {\n  display: block;\n  resize: vertical;\n}\ntextarea[aria-invalid] {\n  --pico-icon-height: calc(1rem * var(--pico-line-height) + var(--pico-form-element-spacing-vertical) * 2 + var(--pico-border-width) * 2);\n  background-position: top right 0.75rem !important;\n  background-size: 1rem var(--pico-icon-height) !important;\n}\n\n:where(input, select, textarea, fieldset, .grid) + small {\n  display: block;\n  width: 100%;\n  margin-top: calc(var(--pico-spacing) * -0.75);\n  margin-bottom: var(--pico-spacing);\n  color: var(--pico-muted-color);\n}\n:where(input, select, textarea, fieldset, .grid)[aria-invalid=false] + small {\n  color: var(--pico-ins-color);\n}\n:where(input, select, textarea, fieldset, .grid)[aria-invalid=true] + small {\n  color: var(--pico-del-color);\n}\n\nlabel > :where(input, select, textarea) {\n  margin-top: calc(var(--pico-spacing) * 0.25);\n}\n\n/**\n * Checkboxes, Radios and Switches\n */\nlabel:has([type=checkbox], [type=radio]) {\n  width: fit-content;\n  cursor: pointer;\n}\n\n[type=checkbox],\n[type=radio] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  width: 1.25em;\n  height: 1.25em;\n  margin-top: -0.125em;\n  margin-inline-end: 0.5em;\n  border-width: var(--pico-border-width);\n  vertical-align: middle;\n  cursor: pointer;\n}\n[type=checkbox]::-ms-check,\n[type=radio]::-ms-check {\n  display: none;\n}\n[type=checkbox]:checked, [type=checkbox]:checked:active, [type=checkbox]:checked:focus,\n[type=radio]:checked,\n[type=radio]:checked:active,\n[type=radio]:checked:focus {\n  --pico-background-color: var(--pico-primary-background);\n  --pico-border-color: var(--pico-primary-border);\n  background-image: var(--pico-icon-checkbox);\n  background-position: center;\n  background-size: 0.75em auto;\n  background-repeat: no-repeat;\n}\n[type=checkbox] ~ label,\n[type=radio] ~ label {\n  display: inline-block;\n  margin-bottom: 0;\n  cursor: pointer;\n}\n[type=checkbox] ~ label:not(:last-of-type),\n[type=radio] ~ label:not(:last-of-type) {\n  margin-inline-end: 1em;\n}\n\n[type=checkbox]:indeterminate {\n  --pico-background-color: var(--pico-primary-background);\n  --pico-border-color: var(--pico-primary-border);\n  background-image: var(--pico-icon-minus);\n  background-position: center;\n  background-size: 0.75em auto;\n  background-repeat: no-repeat;\n}\n\n[type=radio] {\n  border-radius: 50%;\n}\n[type=radio]:checked, [type=radio]:checked:active, [type=radio]:checked:focus {\n  --pico-background-color: var(--pico-primary-inverse);\n  border-width: 0.35em;\n  background-image: none;\n}\n\n[type=checkbox][role=switch] {\n  --pico-background-color: var(--pico-switch-background-color);\n  --pico-color: var(--pico-switch-color);\n  width: 2.25em;\n  height: 1.25em;\n  border: var(--pico-border-width) solid var(--pico-border-color);\n  border-radius: 1.25em;\n  background-color: var(--pico-background-color);\n  line-height: 1.25em;\n}\n[type=checkbox][role=switch]:not([aria-invalid]) {\n  --pico-border-color: var(--pico-switch-background-color);\n}\n[type=checkbox][role=switch]:before {\n  display: block;\n  aspect-ratio: 1;\n  height: 100%;\n  border-radius: 50%;\n  background-color: var(--pico-color);\n  box-shadow: var(--pico-switch-thumb-box-shadow);\n  content: \"\";\n  transition: margin 0.1s ease-in-out;\n}\n[type=checkbox][role=switch]:focus {\n  --pico-background-color: var(--pico-switch-background-color);\n  --pico-border-color: var(--pico-switch-background-color);\n}\n[type=checkbox][role=switch]:checked {\n  --pico-background-color: var(--pico-switch-checked-background-color);\n  --pico-border-color: var(--pico-switch-checked-background-color);\n  background-image: none;\n}\n[type=checkbox][role=switch]:checked::before {\n  margin-inline-start: calc(2.25em - 1.25em);\n}\n[type=checkbox][role=switch][disabled] {\n  --pico-background-color: var(--pico-border-color);\n}\n\n[type=checkbox][aria-invalid=false]:checked, [type=checkbox][aria-invalid=false]:checked:active, [type=checkbox][aria-invalid=false]:checked:focus,\n[type=checkbox][role=switch][aria-invalid=false]:checked,\n[type=checkbox][role=switch][aria-invalid=false]:checked:active,\n[type=checkbox][role=switch][aria-invalid=false]:checked:focus {\n  --pico-background-color: var(--pico-form-element-valid-border-color);\n}\n[type=checkbox]:checked[aria-invalid=true], [type=checkbox]:checked:active[aria-invalid=true], [type=checkbox]:checked:focus[aria-invalid=true],\n[type=checkbox][role=switch]:checked[aria-invalid=true],\n[type=checkbox][role=switch]:checked:active[aria-invalid=true],\n[type=checkbox][role=switch]:checked:focus[aria-invalid=true] {\n  --pico-background-color: var(--pico-form-element-invalid-border-color);\n}\n\n[type=checkbox][aria-invalid=false]:checked, [type=checkbox][aria-invalid=false]:checked:active, [type=checkbox][aria-invalid=false]:checked:focus,\n[type=radio][aria-invalid=false]:checked,\n[type=radio][aria-invalid=false]:checked:active,\n[type=radio][aria-invalid=false]:checked:focus,\n[type=checkbox][role=switch][aria-invalid=false]:checked,\n[type=checkbox][role=switch][aria-invalid=false]:checked:active,\n[type=checkbox][role=switch][aria-invalid=false]:checked:focus {\n  --pico-border-color: var(--pico-form-element-valid-border-color);\n}\n[type=checkbox]:checked[aria-invalid=true], [type=checkbox]:checked:active[aria-invalid=true], [type=checkbox]:checked:focus[aria-invalid=true],\n[type=radio]:checked[aria-invalid=true],\n[type=radio]:checked:active[aria-invalid=true],\n[type=radio]:checked:focus[aria-invalid=true],\n[type=checkbox][role=switch]:checked[aria-invalid=true],\n[type=checkbox][role=switch]:checked:active[aria-invalid=true],\n[type=checkbox][role=switch]:checked:focus[aria-invalid=true] {\n  --pico-border-color: var(--pico-form-element-invalid-border-color);\n}\n\n/**\n * Input type color\n */\n[type=color]::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n[type=color]::-moz-focus-inner {\n  padding: 0;\n}\n[type=color]::-webkit-color-swatch {\n  border: 0;\n  border-radius: calc(var(--pico-border-radius) * 0.5);\n}\n[type=color]::-moz-color-swatch {\n  border: 0;\n  border-radius: calc(var(--pico-border-radius) * 0.5);\n}\n\n/**\n * Input type datetime\n */\ninput:not([type=checkbox], [type=radio], [type=range], [type=file]):is([type=date], [type=datetime-local], [type=month], [type=time], [type=week]) {\n  --pico-icon-position: 0.75rem;\n  --pico-icon-width: 1rem;\n  padding-right: calc(var(--pico-icon-width) + var(--pico-icon-position));\n  background-image: var(--pico-icon-date);\n  background-position: center right var(--pico-icon-position);\n  background-size: var(--pico-icon-width) auto;\n  background-repeat: no-repeat;\n}\ninput:not([type=checkbox], [type=radio], [type=range], [type=file])[type=time] {\n  background-image: var(--pico-icon-time);\n}\n\n[type=date]::-webkit-calendar-picker-indicator,\n[type=datetime-local]::-webkit-calendar-picker-indicator,\n[type=month]::-webkit-calendar-picker-indicator,\n[type=time]::-webkit-calendar-picker-indicator,\n[type=week]::-webkit-calendar-picker-indicator {\n  width: var(--pico-icon-width);\n  margin-right: calc(var(--pico-icon-width) * -1);\n  margin-left: var(--pico-icon-position);\n  opacity: 0;\n}\n\n@-moz-document url-prefix() {\n  [type=date],\n  [type=datetime-local],\n  [type=month],\n  [type=time],\n  [type=week] {\n    padding-right: var(--pico-form-element-spacing-horizontal) !important;\n    background-image: none !important;\n  }\n}\n[dir=rtl] :is([type=date], [type=datetime-local], [type=month], [type=time], [type=week]) {\n  text-align: right;\n}\n\n/**\n * Input type file\n */\n[type=file] {\n  --pico-color: var(--pico-muted-color);\n  margin-left: calc(var(--pico-outline-width) * -1);\n  padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) 0;\n  padding-left: var(--pico-outline-width);\n  border: 0;\n  border-radius: 0;\n  background: none;\n}\n[type=file]::file-selector-button {\n  margin-right: calc(var(--pico-spacing) / 2);\n  padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) var(--pico-form-element-spacing-horizontal);\n}\n[type=file]:is(:hover, :active, :focus)::file-selector-button {\n  --pico-background-color: var(--pico-secondary-hover-background);\n  --pico-border-color: var(--pico-secondary-hover-border);\n}\n[type=file]:focus::file-selector-button {\n  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);\n}\n\n/**\n * Input type range\n */\n[type=range] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 1.25rem;\n  background: none;\n}\n[type=range]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 0.375rem;\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-range-border-color);\n  transition: background-color var(--pico-transition), box-shadow var(--pico-transition);\n}\n[type=range]::-moz-range-track {\n  width: 100%;\n  height: 0.375rem;\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-range-border-color);\n  transition: background-color var(--pico-transition), box-shadow var(--pico-transition);\n}\n[type=range]::-ms-track {\n  width: 100%;\n  height: 0.375rem;\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-range-border-color);\n  transition: background-color var(--pico-transition), box-shadow var(--pico-transition);\n}\n[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 1.25rem;\n  height: 1.25rem;\n  margin-top: -0.4375rem;\n  border: 2px solid var(--pico-range-thumb-border-color);\n  border-radius: 50%;\n  background-color: var(--pico-range-thumb-color);\n  cursor: pointer;\n  transition: background-color var(--pico-transition), transform var(--pico-transition);\n}\n[type=range]::-moz-range-thumb {\n  -webkit-appearance: none;\n  width: 1.25rem;\n  height: 1.25rem;\n  margin-top: -0.4375rem;\n  border: 2px solid var(--pico-range-thumb-border-color);\n  border-radius: 50%;\n  background-color: var(--pico-range-thumb-color);\n  cursor: pointer;\n  transition: background-color var(--pico-transition), transform var(--pico-transition);\n}\n[type=range]::-ms-thumb {\n  -webkit-appearance: none;\n  width: 1.25rem;\n  height: 1.25rem;\n  margin-top: -0.4375rem;\n  border: 2px solid var(--pico-range-thumb-border-color);\n  border-radius: 50%;\n  background-color: var(--pico-range-thumb-color);\n  cursor: pointer;\n  transition: background-color var(--pico-transition), transform var(--pico-transition);\n}\n[type=range]:active, [type=range]:focus-within {\n  --pico-range-border-color: var(--pico-range-active-border-color);\n  --pico-range-thumb-color: var(--pico-range-thumb-active-color);\n}\n[type=range]:active::-webkit-slider-thumb {\n  transform: scale(1.25);\n}\n[type=range]:active::-moz-range-thumb {\n  transform: scale(1.25);\n}\n[type=range]:active::-ms-thumb {\n  transform: scale(1.25);\n}\n\n/**\n * Input type search\n */\ninput:not([type=checkbox], [type=radio], [type=range], [type=file])[type=search] {\n  padding-inline-start: calc(var(--pico-form-element-spacing-horizontal) + 1.75rem);\n  background-image: var(--pico-icon-search);\n  background-position: center left calc(var(--pico-form-element-spacing-horizontal) + 0.125rem);\n  background-size: 1rem auto;\n  background-repeat: no-repeat;\n}\ninput:not([type=checkbox], [type=radio], [type=range], [type=file])[type=search][aria-invalid] {\n  padding-inline-start: calc(var(--pico-form-element-spacing-horizontal) + 1.75rem) !important;\n  background-position: center left 1.125rem, center right 0.75rem;\n}\ninput:not([type=checkbox], [type=radio], [type=range], [type=file])[type=search][aria-invalid=false] {\n  background-image: var(--pico-icon-search), var(--pico-icon-valid);\n}\ninput:not([type=checkbox], [type=radio], [type=range], [type=file])[type=search][aria-invalid=true] {\n  background-image: var(--pico-icon-search), var(--pico-icon-invalid);\n}\n\n[dir=rtl] :where(input):not([type=checkbox], [type=radio], [type=range], [type=file])[type=search] {\n  background-position: center right 1.125rem;\n}\n[dir=rtl] :where(input):not([type=checkbox], [type=radio], [type=range], [type=file])[type=search][aria-invalid] {\n  background-position: center right 1.125rem, center left 0.75rem;\n}\n\n/**\n * Accordion (<details>)\n */\ndetails {\n  display: block;\n  margin-bottom: var(--pico-spacing);\n}\ndetails summary {\n  line-height: 1rem;\n  list-style-type: none;\n  cursor: pointer;\n  transition: color var(--pico-transition);\n}\ndetails summary:not([role]) {\n  color: var(--pico-accordion-close-summary-color);\n}\ndetails summary::-webkit-details-marker {\n  display: none;\n}\ndetails summary::marker {\n  display: none;\n}\ndetails summary::-moz-list-bullet {\n  list-style-type: none;\n}\ndetails summary::after {\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  margin-inline-start: calc(var(--pico-spacing, 1rem) * 0.5);\n  float: right;\n  transform: rotate(-90deg);\n  background-image: var(--pico-icon-chevron);\n  background-position: right center;\n  background-size: 1rem auto;\n  background-repeat: no-repeat;\n  content: \"\";\n  transition: transform var(--pico-transition);\n}\ndetails summary:focus {\n  outline: none;\n}\ndetails summary:focus:not([role]) {\n  color: var(--pico-accordion-active-summary-color);\n}\ndetails summary:focus-visible:not([role]) {\n  outline: var(--pico-outline-width) solid var(--pico-primary-focus);\n  outline-offset: calc(var(--pico-spacing, 1rem) * 0.5);\n  color: var(--pico-primary);\n}\ndetails summary[role=button] {\n  width: 100%;\n  text-align: left;\n}\ndetails summary[role=button]::after {\n  height: calc(1rem * var(--pico-line-height, 1.5));\n}\ndetails[open] > summary {\n  margin-bottom: var(--pico-spacing);\n}\ndetails[open] > summary:not([role]):not(:focus) {\n  color: var(--pico-accordion-open-summary-color);\n}\ndetails[open] > summary::after {\n  transform: rotate(0);\n}\n\n[dir=rtl] details summary {\n  text-align: right;\n}\n[dir=rtl] details summary::after {\n  float: left;\n  background-position: left center;\n}\n\n/**\n * Card (<article>)\n */\narticle {\n  margin-bottom: var(--pico-block-spacing-vertical);\n  padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);\n  border-radius: var(--pico-border-radius);\n  background: var(--pico-card-background-color);\n  box-shadow: var(--pico-card-box-shadow);\n}\narticle > header,\narticle > footer {\n  margin-right: calc(var(--pico-block-spacing-horizontal) * -1);\n  margin-left: calc(var(--pico-block-spacing-horizontal) * -1);\n  padding: calc(var(--pico-block-spacing-vertical) * 0.66) var(--pico-block-spacing-horizontal);\n  background-color: var(--pico-card-sectioning-background-color);\n}\narticle > header {\n  margin-top: calc(var(--pico-block-spacing-vertical) * -1);\n  margin-bottom: var(--pico-block-spacing-vertical);\n  border-bottom: var(--pico-border-width) solid var(--pico-card-border-color);\n  border-top-right-radius: var(--pico-border-radius);\n  border-top-left-radius: var(--pico-border-radius);\n}\narticle > footer {\n  margin-top: var(--pico-block-spacing-vertical);\n  margin-bottom: calc(var(--pico-block-spacing-vertical) * -1);\n  border-top: var(--pico-border-width) solid var(--pico-card-border-color);\n  border-bottom-right-radius: var(--pico-border-radius);\n  border-bottom-left-radius: var(--pico-border-radius);\n}\n\n/**\n * Dropdown (details.dropdown)\n */\ndetails.dropdown {\n  position: relative;\n  border-bottom: none;\n}\ndetails.dropdown > summary::after,\ndetails.dropdown > button::after,\ndetails.dropdown > a::after {\n  display: block;\n  width: 1rem;\n  height: calc(1rem * var(--pico-line-height, 1.5));\n  margin-inline-start: 0.25rem;\n  float: right;\n  transform: rotate(0deg) translateX(0.2rem);\n  background-image: var(--pico-icon-chevron);\n  background-position: right center;\n  background-size: 1rem auto;\n  background-repeat: no-repeat;\n  content: \"\";\n}\n\nnav details.dropdown {\n  margin-bottom: 0;\n}\n\ndetails.dropdown > summary:not([role]) {\n  height: calc(1rem * var(--pico-line-height) + var(--pico-form-element-spacing-vertical) * 2 + var(--pico-border-width) * 2);\n  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);\n  border: var(--pico-border-width) solid var(--pico-form-element-border-color);\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-form-element-background-color);\n  color: var(--pico-form-element-placeholder-color);\n  line-height: inherit;\n  cursor: pointer;\n  user-select: none;\n  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);\n}\ndetails.dropdown > summary:not([role]):active, details.dropdown > summary:not([role]):focus {\n  border-color: var(--pico-form-element-active-border-color);\n  background-color: var(--pico-form-element-active-background-color);\n}\ndetails.dropdown > summary:not([role]):focus {\n  box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);\n}\ndetails.dropdown > summary:not([role]):focus-visible {\n  outline: none;\n}\ndetails.dropdown > summary:not([role])[aria-invalid=false] {\n  --pico-form-element-border-color: var(--pico-form-element-valid-border-color);\n  --pico-form-element-active-border-color: var(--pico-form-element-valid-focus-color);\n  --pico-form-element-focus-color: var(--pico-form-element-valid-focus-color);\n}\ndetails.dropdown > summary:not([role])[aria-invalid=true] {\n  --pico-form-element-border-color: var(--pico-form-element-invalid-border-color);\n  --pico-form-element-active-border-color: var(--pico-form-element-invalid-focus-color);\n  --pico-form-element-focus-color: var(--pico-form-element-invalid-focus-color);\n}\n\nnav details.dropdown {\n  display: inline;\n  margin: calc(var(--pico-nav-element-spacing-vertical) * -1) 0;\n}\nnav details.dropdown > summary::after {\n  transform: rotate(0deg) translateX(0rem);\n}\nnav details.dropdown > summary:not([role]) {\n  height: calc(1rem * var(--pico-line-height) + var(--pico-nav-link-spacing-vertical) * 2);\n  padding: calc(var(--pico-nav-link-spacing-vertical) - var(--pico-border-width) * 2) var(--pico-nav-link-spacing-horizontal);\n}\nnav details.dropdown > summary:not([role]):focus-visible {\n  box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);\n}\n\ndetails.dropdown > summary + ul {\n  display: flex;\n  z-index: 99;\n  position: absolute;\n  left: 0;\n  flex-direction: column;\n  width: 100%;\n  min-width: fit-content;\n  margin: 0;\n  margin-top: var(--pico-outline-width);\n  padding: 0;\n  border: var(--pico-border-width) solid var(--pico-dropdown-border-color);\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-dropdown-background-color);\n  box-shadow: var(--pico-dropdown-box-shadow);\n  color: var(--pico-dropdown-color);\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity var(--pico-transition), transform 0s ease-in-out 1s;\n}\ndetails.dropdown > summary + ul[dir=rtl] {\n  right: 0;\n  left: auto;\n}\ndetails.dropdown > summary + ul li {\n  width: 100%;\n  margin-bottom: 0;\n  padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) var(--pico-form-element-spacing-horizontal);\n  list-style: none;\n}\ndetails.dropdown > summary + ul li:first-of-type {\n  margin-top: calc(var(--pico-form-element-spacing-vertical) * 0.5);\n}\ndetails.dropdown > summary + ul li:last-of-type {\n  margin-bottom: calc(var(--pico-form-element-spacing-vertical) * 0.5);\n}\ndetails.dropdown > summary + ul li a {\n  display: block;\n  margin: calc(var(--pico-form-element-spacing-vertical) * -0.5) calc(var(--pico-form-element-spacing-horizontal) * -1);\n  padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) var(--pico-form-element-spacing-horizontal);\n  overflow: hidden;\n  border-radius: 0;\n  color: var(--pico-dropdown-color);\n  text-decoration: none;\n  text-overflow: ellipsis;\n}\ndetails.dropdown > summary + ul li a:hover, details.dropdown > summary + ul li a:focus, details.dropdown > summary + ul li a:active, details.dropdown > summary + ul li a:focus-visible, details.dropdown > summary + ul li a[aria-current]:not([aria-current=false]) {\n  background-color: var(--pico-dropdown-hover-background-color);\n}\ndetails.dropdown > summary + ul li label {\n  width: 100%;\n}\ndetails.dropdown > summary + ul li:has(label):hover {\n  background-color: var(--pico-dropdown-hover-background-color);\n}\n\ndetails.dropdown[open] > summary {\n  margin-bottom: 0;\n}\n\ndetails.dropdown[open] > summary + ul {\n  transform: scaleY(1);\n  opacity: 1;\n  transition: opacity var(--pico-transition), transform 0s ease-in-out 0s;\n}\n\ndetails.dropdown[open] > summary::before {\n  display: block;\n  z-index: 1;\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  inset: 0;\n  background: none;\n  content: \"\";\n  cursor: default;\n}\n\nlabel > details.dropdown {\n  margin-top: calc(var(--pico-spacing) * 0.25);\n}\n\n/**\n * Group ([role=\"group\"], [role=\"search\"])\n */\n[role=search],\n[role=group] {\n  display: inline-flex;\n  position: relative;\n  width: 100%;\n  margin-bottom: var(--pico-spacing);\n  border-radius: var(--pico-border-radius);\n  box-shadow: var(--pico-group-box-shadow, 0 0 0 rgba(0, 0, 0, 0));\n  vertical-align: middle;\n  transition: box-shadow var(--pico-transition);\n}\n[role=search] > *,\n[role=search] input:not([type=checkbox], [type=radio]),\n[role=search] select,\n[role=group] > *,\n[role=group] input:not([type=checkbox], [type=radio]),\n[role=group] select {\n  position: relative;\n  flex: 1 1 auto;\n  margin-bottom: 0;\n}\n[role=search] > *:not(:first-child),\n[role=search] input:not([type=checkbox], [type=radio]):not(:first-child),\n[role=search] select:not(:first-child),\n[role=group] > *:not(:first-child),\n[role=group] input:not([type=checkbox], [type=radio]):not(:first-child),\n[role=group] select:not(:first-child) {\n  margin-left: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n[role=search] > *:not(:last-child),\n[role=search] input:not([type=checkbox], [type=radio]):not(:last-child),\n[role=search] select:not(:last-child),\n[role=group] > *:not(:last-child),\n[role=group] input:not([type=checkbox], [type=radio]):not(:last-child),\n[role=group] select:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[role=search] > *:focus,\n[role=search] input:not([type=checkbox], [type=radio]):focus,\n[role=search] select:focus,\n[role=group] > *:focus,\n[role=group] input:not([type=checkbox], [type=radio]):focus,\n[role=group] select:focus {\n  z-index: 2;\n}\n[role=search] button:not(:first-child),\n[role=search] [type=submit]:not(:first-child),\n[role=search] [type=reset]:not(:first-child),\n[role=search] [type=button]:not(:first-child),\n[role=search] [role=button]:not(:first-child),\n[role=search] input:not([type=checkbox], [type=radio]):not(:first-child),\n[role=search] select:not(:first-child),\n[role=group] button:not(:first-child),\n[role=group] [type=submit]:not(:first-child),\n[role=group] [type=reset]:not(:first-child),\n[role=group] [type=button]:not(:first-child),\n[role=group] [role=button]:not(:first-child),\n[role=group] input:not([type=checkbox], [type=radio]):not(:first-child),\n[role=group] select:not(:first-child) {\n  margin-left: calc(var(--pico-border-width) * -1);\n}\n[role=search] button,\n[role=search] [type=submit],\n[role=search] [type=reset],\n[role=search] [type=button],\n[role=search] [role=button],\n[role=group] button,\n[role=group] [type=submit],\n[role=group] [type=reset],\n[role=group] [type=button],\n[role=group] [role=button] {\n  width: auto;\n}\n@supports selector(:has(*)) {\n  [role=search]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus),\n  [role=group]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus) {\n    --pico-group-box-shadow: var(--pico-group-box-shadow-focus-with-button);\n  }\n  [role=search]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus) input:not([type=checkbox], [type=radio]),\n  [role=search]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus) select,\n  [role=group]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus) input:not([type=checkbox], [type=radio]),\n  [role=group]:has(button:focus, [type=submit]:focus, [type=button]:focus, [role=button]:focus) select {\n    border-color: transparent;\n  }\n  [role=search]:has(input:not([type=submit], [type=button]):focus, select:focus),\n  [role=group]:has(input:not([type=submit], [type=button]):focus, select:focus) {\n    --pico-group-box-shadow: var(--pico-group-box-shadow-focus-with-input);\n  }\n  [role=search]:has(input:not([type=submit], [type=button]):focus, select:focus) button,\n  [role=search]:has(input:not([type=submit], [type=button]):focus, select:focus) [type=submit],\n  [role=search]:has(input:not([type=submit], [type=button]):focus, select:focus) [type=button],\n  [role=search]:has(input:not([type=submit], [type=button]):focus, select:focus) [role=button],\n  [role=group]:has(input:not([type=submit], [type=button]):focus, select:focus) button,\n  [role=group]:has(input:not([type=submit], [type=button]):focus, select:focus) [type=submit],\n  [role=group]:has(input:not([type=submit], [type=button]):focus, select:focus) [type=button],\n  [role=group]:has(input:not([type=submit], [type=button]):focus, select:focus) [role=button] {\n    --pico-button-box-shadow: 0 0 0 var(--pico-border-width) var(--pico-primary-border);\n    --pico-button-hover-box-shadow: 0 0 0 var(--pico-border-width) var(--pico-primary-hover-border);\n  }\n  [role=search] button:focus,\n  [role=search] [type=submit]:focus,\n  [role=search] [type=reset]:focus,\n  [role=search] [type=button]:focus,\n  [role=search] [role=button]:focus,\n  [role=group] button:focus,\n  [role=group] [type=submit]:focus,\n  [role=group] [type=reset]:focus,\n  [role=group] [type=button]:focus,\n  [role=group] [role=button]:focus {\n    box-shadow: none;\n  }\n}\n\n[role=search] > *:first-child {\n  border-top-left-radius: 5rem;\n  border-bottom-left-radius: 5rem;\n}\n[role=search] > *:last-child {\n  border-top-right-radius: 5rem;\n  border-bottom-right-radius: 5rem;\n}\n\n/**\n * Loading ([aria-busy=true])\n */\n[aria-busy=true]:not(input, select, textarea, html, form) {\n  white-space: nowrap;\n}\n[aria-busy=true]:not(input, select, textarea, html, form)::before {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  background-image: var(--pico-icon-loading);\n  background-size: 1em auto;\n  background-repeat: no-repeat;\n  content: \"\";\n  vertical-align: -0.125em;\n}\n[aria-busy=true]:not(input, select, textarea, html, form):not(:empty)::before {\n  margin-inline-end: calc(var(--pico-spacing) * 0.5);\n}\n[aria-busy=true]:not(input, select, textarea, html, form):empty {\n  text-align: center;\n}\n\nbutton[aria-busy=true],\n[type=submit][aria-busy=true],\n[type=button][aria-busy=true],\n[type=reset][aria-busy=true],\n[role=button][aria-busy=true],\na[aria-busy=true] {\n  pointer-events: none;\n}\n\n/**\n * Modal (<dialog>)\n */\n:root,\n:host {\n  --pico-scrollbar-width: 0px;\n}\n\ndialog {\n  display: flex;\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  align-items: center;\n  justify-content: center;\n  width: inherit;\n  min-width: 100%;\n  height: inherit;\n  min-height: 100%;\n  padding: 0;\n  border: 0;\n  backdrop-filter: var(--pico-modal-overlay-backdrop-filter);\n  background-color: var(--pico-modal-overlay-background-color);\n  color: var(--pico-color);\n}\ndialog > article {\n  width: 100%;\n  max-height: calc(100vh - var(--pico-spacing) * 2);\n  margin: var(--pico-spacing);\n  overflow: auto;\n}\n@media (min-width: 576px) {\n  dialog > article {\n    max-width: 510px;\n  }\n}\n@media (min-width: 768px) {\n  dialog > article {\n    max-width: 700px;\n  }\n}\ndialog > article > header > * {\n  margin-bottom: 0;\n}\ndialog > article > header .close, dialog > article > header :is(a, button)[rel=prev] {\n  margin: 0;\n  margin-left: var(--pico-spacing);\n  padding: 0;\n  float: right;\n}\ndialog > article > footer {\n  text-align: right;\n}\ndialog > article > footer button,\ndialog > article > footer [role=button] {\n  margin-bottom: 0;\n}\ndialog > article > footer button:not(:first-of-type),\ndialog > article > footer [role=button]:not(:first-of-type) {\n  margin-left: calc(var(--pico-spacing) * 0.5);\n}\ndialog > article .close, dialog > article :is(a, button)[rel=prev] {\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  margin-top: calc(var(--pico-spacing) * -1);\n  margin-bottom: var(--pico-spacing);\n  margin-left: auto;\n  border: none;\n  background-image: var(--pico-icon-close);\n  background-position: center;\n  background-size: auto 1rem;\n  background-repeat: no-repeat;\n  background-color: transparent;\n  opacity: 0.5;\n  transition: opacity var(--pico-transition);\n}\ndialog > article .close:is([aria-current]:not([aria-current=false]), :hover, :active, :focus), dialog > article :is(a, button)[rel=prev]:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {\n  opacity: 1;\n}\ndialog:not([open]), dialog[open=false] {\n  display: none;\n}\n\n.modal-is-open {\n  padding-right: var(--pico-scrollbar-width, 0px);\n  overflow: hidden;\n  pointer-events: none;\n  touch-action: none;\n}\n.modal-is-open dialog {\n  pointer-events: auto;\n  touch-action: auto;\n}\n\n:where(.modal-is-opening, .modal-is-closing) dialog,\n:where(.modal-is-opening, .modal-is-closing) dialog > article {\n  animation-duration: 0.2s;\n  animation-timing-function: ease-in-out;\n  animation-fill-mode: both;\n}\n:where(.modal-is-opening, .modal-is-closing) dialog {\n  animation-duration: 0.8s;\n  animation-name: modal-overlay;\n}\n:where(.modal-is-opening, .modal-is-closing) dialog > article {\n  animation-delay: 0.2s;\n  animation-name: modal;\n}\n\n.modal-is-closing dialog,\n.modal-is-closing dialog > article {\n  animation-delay: 0s;\n  animation-direction: reverse;\n}\n\n@keyframes modal-overlay {\n  from {\n    backdrop-filter: none;\n    background-color: transparent;\n  }\n}\n@keyframes modal {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n}\n/**\n * Nav\n */\n:where(nav li)::before {\n  float: left;\n  content: \"​\";\n}\n\nnav,\nnav ul {\n  display: flex;\n}\n\nnav {\n  justify-content: space-between;\n  overflow: visible;\n}\nnav ol,\nnav ul {\n  align-items: center;\n  margin-bottom: 0;\n  padding: 0;\n  list-style: none;\n}\nnav ol:first-of-type,\nnav ul:first-of-type {\n  margin-left: calc(var(--pico-nav-element-spacing-horizontal) * -1);\n}\nnav ol:last-of-type,\nnav ul:last-of-type {\n  margin-right: calc(var(--pico-nav-element-spacing-horizontal) * -1);\n}\nnav li {\n  display: inline-block;\n  margin: 0;\n  padding: var(--pico-nav-element-spacing-vertical) var(--pico-nav-element-spacing-horizontal);\n}\nnav li :where(a, [role=link]) {\n  display: inline-block;\n  margin: calc(var(--pico-nav-link-spacing-vertical) * -1) calc(var(--pico-nav-link-spacing-horizontal) * -1);\n  padding: var(--pico-nav-link-spacing-vertical) var(--pico-nav-link-spacing-horizontal);\n  border-radius: var(--pico-border-radius);\n}\nnav li :where(a, [role=link]):not(:hover) {\n  text-decoration: none;\n}\nnav li button,\nnav li [role=button],\nnav li [type=button],\nnav li input:not([type=checkbox], [type=radio], [type=range], [type=file]),\nnav li select {\n  height: auto;\n  margin-right: inherit;\n  margin-bottom: 0;\n  margin-left: inherit;\n  padding: calc(var(--pico-nav-link-spacing-vertical) - var(--pico-border-width) * 2) var(--pico-nav-link-spacing-horizontal);\n}\nnav[aria-label=breadcrumb] {\n  align-items: center;\n  justify-content: start;\n}\nnav[aria-label=breadcrumb] ul li:not(:first-child) {\n  margin-inline-start: var(--pico-nav-link-spacing-horizontal);\n}\nnav[aria-label=breadcrumb] ul li a {\n  margin: calc(var(--pico-nav-link-spacing-vertical) * -1) 0;\n  margin-inline-start: calc(var(--pico-nav-link-spacing-horizontal) * -1);\n}\nnav[aria-label=breadcrumb] ul li:not(:last-child)::after {\n  display: inline-block;\n  position: absolute;\n  width: calc(var(--pico-nav-link-spacing-horizontal) * 4);\n  margin: 0 calc(var(--pico-nav-link-spacing-horizontal) * -1);\n  content: var(--pico-nav-breadcrumb-divider);\n  color: var(--pico-muted-color);\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n}\nnav[aria-label=breadcrumb] a[aria-current]:not([aria-current=false]) {\n  background-color: transparent;\n  color: inherit;\n  text-decoration: none;\n  pointer-events: none;\n}\n\naside nav,\naside ol,\naside ul,\naside li {\n  display: block;\n}\naside li {\n  padding: calc(var(--pico-nav-element-spacing-vertical) * 0.5) var(--pico-nav-element-spacing-horizontal);\n}\naside li a {\n  display: block;\n}\naside li [role=button] {\n  margin: inherit;\n}\n\n[dir=rtl] nav[aria-label=breadcrumb] ul li:not(:last-child) ::after {\n  content: \"\\\\\";\n}\n\n/**\n * Progress\n */\nprogress {\n  display: inline-block;\n  vertical-align: baseline;\n}\n\nprogress {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  display: inline-block;\n  appearance: none;\n  width: 100%;\n  height: 0.5rem;\n  margin-bottom: calc(var(--pico-spacing) * 0.5);\n  overflow: hidden;\n  border: 0;\n  border-radius: var(--pico-border-radius);\n  background-color: var(--pico-progress-background-color);\n  color: var(--pico-progress-color);\n}\nprogress::-webkit-progress-bar {\n  border-radius: var(--pico-border-radius);\n  background: none;\n}\nprogress[value]::-webkit-progress-value {\n  background-color: var(--pico-progress-color);\n  transition: inline-size var(--pico-transition);\n}\nprogress::-moz-progress-bar {\n  background-color: var(--pico-progress-color);\n}\n@media (prefers-reduced-motion: no-preference) {\n  progress:indeterminate {\n    background: var(--pico-progress-background-color) linear-gradient(to right, var(--pico-progress-color) 30%, var(--pico-progress-background-color) 30%) top left/150% 150% no-repeat;\n    animation: progress-indeterminate 1s linear infinite;\n  }\n  progress:indeterminate[value]::-webkit-progress-value {\n    background-color: transparent;\n  }\n  progress:indeterminate::-moz-progress-bar {\n    background-color: transparent;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  [dir=rtl] progress:indeterminate {\n    animation-direction: reverse;\n  }\n}\n\n@keyframes progress-indeterminate {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/**\n * Tooltip ([data-tooltip])\n */\n[data-tooltip] {\n  position: relative;\n}\n[data-tooltip]:not(a, button, input, [role=button]) {\n  border-bottom: 1px dotted;\n  text-decoration: none;\n  cursor: help;\n}\n[data-tooltip][data-placement=top]::before, [data-tooltip][data-placement=top]::after, [data-tooltip]::before, [data-tooltip]::after {\n  display: block;\n  z-index: 99;\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  padding: 0.25rem 0.5rem;\n  overflow: hidden;\n  transform: translate(-50%, -0.25rem);\n  border-radius: var(--pico-border-radius);\n  background: var(--pico-tooltip-background-color);\n  content: attr(data-tooltip);\n  color: var(--pico-tooltip-color);\n  font-style: normal;\n  font-weight: var(--pico-font-weight);\n  font-size: 0.875rem;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  opacity: 0;\n  pointer-events: none;\n}\n[data-tooltip][data-placement=top]::after, [data-tooltip]::after {\n  padding: 0;\n  transform: translate(-50%, 0rem);\n  border-top: 0.3rem solid;\n  border-right: 0.3rem solid transparent;\n  border-left: 0.3rem solid transparent;\n  border-radius: 0;\n  background-color: transparent;\n  content: \"\";\n  color: var(--pico-tooltip-background-color);\n}\n[data-tooltip][data-placement=bottom]::before, [data-tooltip][data-placement=bottom]::after {\n  top: 100%;\n  bottom: auto;\n  transform: translate(-50%, 0.25rem);\n}\n[data-tooltip][data-placement=bottom]:after {\n  transform: translate(-50%, -0.3rem);\n  border: 0.3rem solid transparent;\n  border-bottom: 0.3rem solid;\n}\n[data-tooltip][data-placement=left]::before, [data-tooltip][data-placement=left]::after {\n  top: 50%;\n  right: 100%;\n  bottom: auto;\n  left: auto;\n  transform: translate(-0.25rem, -50%);\n}\n[data-tooltip][data-placement=left]:after {\n  transform: translate(0.3rem, -50%);\n  border: 0.3rem solid transparent;\n  border-left: 0.3rem solid;\n}\n[data-tooltip][data-placement=right]::before, [data-tooltip][data-placement=right]::after {\n  top: 50%;\n  right: auto;\n  bottom: auto;\n  left: 100%;\n  transform: translate(0.25rem, -50%);\n}\n[data-tooltip][data-placement=right]:after {\n  transform: translate(-0.3rem, -50%);\n  border: 0.3rem solid transparent;\n  border-right: 0.3rem solid;\n}\n[data-tooltip]:focus::before, [data-tooltip]:focus::after, [data-tooltip]:hover::before, [data-tooltip]:hover::after {\n  opacity: 1;\n}\n@media (hover: hover) and (pointer: fine) {\n  [data-tooltip]:focus::before, [data-tooltip]:focus::after, [data-tooltip]:hover::before, [data-tooltip]:hover::after {\n    --pico-tooltip-slide-to: translate(-50%, -0.25rem);\n    transform: translate(-50%, 0.75rem);\n    animation-duration: 0.2s;\n    animation-fill-mode: forwards;\n    animation-name: tooltip-slide;\n    opacity: 0;\n  }\n  [data-tooltip]:focus::after, [data-tooltip]:hover::after {\n    --pico-tooltip-caret-slide-to: translate(-50%, 0rem);\n    transform: translate(-50%, -0.25rem);\n    animation-name: tooltip-caret-slide;\n  }\n  [data-tooltip][data-placement=bottom]:focus::before, [data-tooltip][data-placement=bottom]:focus::after, [data-tooltip][data-placement=bottom]:hover::before, [data-tooltip][data-placement=bottom]:hover::after {\n    --pico-tooltip-slide-to: translate(-50%, 0.25rem);\n    transform: translate(-50%, -0.75rem);\n    animation-name: tooltip-slide;\n  }\n  [data-tooltip][data-placement=bottom]:focus::after, [data-tooltip][data-placement=bottom]:hover::after {\n    --pico-tooltip-caret-slide-to: translate(-50%, -0.3rem);\n    transform: translate(-50%, -0.5rem);\n    animation-name: tooltip-caret-slide;\n  }\n  [data-tooltip][data-placement=left]:focus::before, [data-tooltip][data-placement=left]:focus::after, [data-tooltip][data-placement=left]:hover::before, [data-tooltip][data-placement=left]:hover::after {\n    --pico-tooltip-slide-to: translate(-0.25rem, -50%);\n    transform: translate(0.75rem, -50%);\n    animation-name: tooltip-slide;\n  }\n  [data-tooltip][data-placement=left]:focus::after, [data-tooltip][data-placement=left]:hover::after {\n    --pico-tooltip-caret-slide-to: translate(0.3rem, -50%);\n    transform: translate(0.05rem, -50%);\n    animation-name: tooltip-caret-slide;\n  }\n  [data-tooltip][data-placement=right]:focus::before, [data-tooltip][data-placement=right]:focus::after, [data-tooltip][data-placement=right]:hover::before, [data-tooltip][data-placement=right]:hover::after {\n    --pico-tooltip-slide-to: translate(0.25rem, -50%);\n    transform: translate(-0.75rem, -50%);\n    animation-name: tooltip-slide;\n  }\n  [data-tooltip][data-placement=right]:focus::after, [data-tooltip][data-placement=right]:hover::after {\n    --pico-tooltip-caret-slide-to: translate(-0.3rem, -50%);\n    transform: translate(-0.05rem, -50%);\n    animation-name: tooltip-caret-slide;\n  }\n}\n@keyframes tooltip-slide {\n  to {\n    transform: var(--pico-tooltip-slide-to);\n    opacity: 1;\n  }\n}\n@keyframes tooltip-caret-slide {\n  50% {\n    opacity: 0;\n  }\n  to {\n    transform: var(--pico-tooltip-caret-slide-to);\n    opacity: 1;\n  }\n}\n\n/**\n * Accessibility & User interaction\n */\n[aria-controls] {\n  cursor: pointer;\n}\n\n[aria-disabled=true],\n[disabled] {\n  cursor: not-allowed;\n}\n\n[aria-hidden=false][hidden] {\n  display: initial;\n}\n\n[aria-hidden=false][hidden]:not(:focus) {\n  clip: rect(0, 0, 0, 0);\n  position: absolute;\n}\n\na,\narea,\nbutton,\ninput,\nlabel,\nselect,\nsummary,\ntextarea,\n[tabindex] {\n  -ms-touch-action: manipulation;\n}\n\n[dir=rtl] {\n  direction: rtl;\n}\n\n/**\n * Reduce Motion Features\n */\n@media (prefers-reduced-motion: reduce) {\n  *:not([aria-busy=true]),\n  :not([aria-busy=true])::before,\n  :not([aria-busy=true])::after {\n    background-attachment: initial !important;\n    animation-duration: 1ms !important;\n    animation-delay: -1ms !important;\n    animation-iteration-count: 1 !important;\n    scroll-behavior: auto !important;\n    transition-delay: 0s !important;\n    transition-duration: 0s !important;\n  }\n}");

/***/ }),

/***/ "./src/content/errorMessages.module.scss":
/*!***********************************************!*\
  !*** ./src/content/errorMessages.module.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../node_modules/sass-loader/dist/cjs.js!./errorMessages.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/errorMessages.module.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./src/content/translation/translator.module.scss":
/*!********************************************************!*\
  !*** ./src/content/translation/translator.module.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!./translator.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/translation/translator.module.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_translator_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/content/errorMessages.js":
/*!**************************************!*\
  !*** ./src/content/errorMessages.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getErrorBanner)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
/* harmony import */ var _errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorMessages.module.scss */ "./src/content/errorMessages.module.scss");


const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);



const pnlBase =
   true
    ? "http://localhost:4567"
    : 0;

// Map error messages to user-friendly messages and actions
function getErrorBanner(error, classType = "Audio") {
  if (!error) return null;
  const errorClassName = `${_errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].pnlReaderErrorBanner} ${
    _errorMessages_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"][`for${classType}`]
  }`;
  const serviceName = classType === "Audio" ? "text-to-speech" : "translation";
  const getPrettyMessage = (msg) => {
    if (!msg) return "";

    const lowermsg = msg.toLowerCase();

    if (
      lowermsg.includes("failed to fetch") ||
      lowermsg.includes("networkerror") ||
      lowermsg.includes("network error") ||
      lowermsg.includes("fetch failed")
    ) {
      return "Network error or server is unreachable. Please try again later.";
    }
    if (lowermsg.includes("timeout")) {
      return "The request timed out. Please check your internet connection and try again.";
    }
    if (lowermsg.includes("forbidden")) {
      return "You do not have permission to access this resource.";
    }

    if (lowermsg.includes("internal server error")) {
      return "Server encountered an error. Please try again later.";
    }

    return msg;
  };
  const errorMsg = getPrettyMessage(
    error.message || error.status?.message || String(error)
  );

  if (errorMsg === "Unauthorized" || error.statusCode === 401) {
    return html`
      <div class="${errorClassName}">
        To use ${serviceName}, please
        <a href="${pnlBase}/login" target="_blank"> log in or sign up </a>
        at pnl.dev.
      </div>
    `;
  } else if (error.type === "trial-limit-reached") {
    const { trialsUsed, maxTrialsAllowed } = error;
    return html`
      <div class="${errorClassName}">
        Your trial limit (${trialsUsed}/${maxTrialsAllowed} used) has been
        reached. To continue using ${serviceName}, please
        <a href="${pnlBase}/pro" target="_blank"> upgrade your account </a>
        .
      </div>
    `;
  } else if (error.type === "in-trial") {
    const { trialsUsed, trialsMaxAllowed } = error;
    const usedStr = `${trialsUsed}/${trialsMaxAllowed}`;
    return html`
      <div class="${errorClassName} in-trial">
        You've used ${usedStr} of your trial quota. Our ${serviceName} service
        uses a proprietary API, which incurs real costs for each request. To
        continue using ${serviceName}, please
        <a href="${pnlBase}/pro" target="_blank"> upgrade your account </a>
        .
      </div>
    `;
  } else if (errorMsg.includes("Media load rejected by URL safety check")) {
    return html`<div class="${errorClassName}">
      The audio is blocked by the site's csp policy. To help us prioritize this
      issue, please report this site at:
      <a href="https://pnl.dev/category/3/feedback" target="_blank">pnl.dev</a>
    </div>`;
  }
  // Add more mappings as needed
  // if (/quota/i.test(errorMsg)) { ... }

  // Default: show the error message
  return html`<div class="${errorClassName}">${errorMsg}</div>`;
}


/***/ }),

/***/ "./src/content/translation/text2Translation.js":
/*!*****************************************************!*\
  !*** ./src/content/translation/text2Translation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/utils.js");


const CACHE_KEY = "PNLReader-translation-cache";
const CACHE_LIMIT = 10;

function getCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (e) {
    console.warn("Failed to read translation cache from localStorage:", e);
    return [];
  }
}

function setCache(cacheArr) {
  let arr = [...cacheArr];
  while (arr.length > 0) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(arr));
      return;
    } catch (e) {
      if (
        e instanceof DOMException &&
        (e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        console.warn(
          "Storage quota exceeded when saving translation cache, removing oldest cache item.",
          e
        );
        arr.shift();
      } else {
        console.error("Failed to save translation cache to localStorage:", e);
        return;
      }
    }
  }
  // If we get here, nothing could be saved
  console.warn("Unable to save any cache due to storage quota limits.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async ({ text = "", fromLang, targetLang }) => {
  let result;

  let cacheArr = getCache();

  // Find cached result
  const cachedTranslationResult = cacheArr.find(
    (item) =>
      item.text === text &&
      item.fromLang === fromLang &&
      item.targetLang === targetLang
  );

  if (cachedTranslationResult) {
    result = cachedTranslationResult;
  } else {
    result = await utils__WEBPACK_IMPORTED_MODULE_0__["default"].send("translate text", {
      text,
      fromLang,
      targetLang,
    });

    if (result.translation) {
      // Add to cache, keep only last CACHE_LIMIT items
      cacheArr.push({
        text,
        fromLang,
        targetLang,
        translation: result.translation,
      });
      if (cacheArr.length > CACHE_LIMIT) {
        cacheArr.shift();
      }
      setCache(cacheArr);
    }
  }

  if (result.translation) {
    return result;
  } else {
    console.error("No translation received:", result.error || "Unknown error");
    throw new Error(result.error || "Unknown error");
  }
});


/***/ }),

/***/ "./src/content/translation/translatorPanel.js":
/*!****************************************************!*\
  !*** ./src/content/translation/translatorPanel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _text2Translation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text2Translation.js */ "./src/content/translation/text2Translation.js");
/* harmony import */ var _errorMessages_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errorMessages.js */ "./src/content/errorMessages.js");
/* harmony import */ var _translator_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./translator.module.scss */ "./src/content/translation/translator.module.scss");







const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);

// Common languages for translation
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "pl", name: "Polish" },
  { code: "tr", name: "Turkish" },
];

const getLanguageName = (code) => {
  const lang = languages.find((l) => l.code === code);
  return lang ? lang.name : code;
};

const Translator = ({
  text,
  lang,
  settings,
  saveSettings,
  onTranslationComplete,
  onError,
  onClose,
}) => {
  const [targetLang, setTargetLang] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(
    settings.translateTargetLang || ""
  );
  const [translatedText, setTranslatedText] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)("");
  const [loading, setLoading] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [error, setError] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [hasError, setHasError] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [copySuccess, setCopySuccess] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [isClosing, setIsClosing] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Translate when text or target language changes
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!text || !lang || !targetLang || targetLang === lang) {
      setTranslatedText("");
      setError(null);
      setHasError(false);
      return;
    }

    performTranslation();
  }, [text, targetLang, lang]);

  const performTranslation = async () => {
    if (!text || !text.trim()) return;

    setLoading(true);
    setError(null);
    setHasError(false);

    try {
      const data = await (0,_text2Translation_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        text,
        fromLang: lang,
        targetLang: targetLang,
      });

      setTranslatedText(data.translation || "");
      if (data.isProUser === false) {
        setError({
          type: "in-trial",
          ...data,
        });
      }

      if (onTranslationComplete) {
        onTranslationComplete({
          text: text,
          fromLang: lang,
          targetLang: targetLang,
          ...data,
        });
      }
    } catch (err) {
      console.error("Translation error:", err);
      setError(err);
      setHasError(true);
      setTranslatedText("");

      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTargetLangChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (e) => {
      const lang = e.target.value;
      setTargetLang(lang);

      if (saveSettings) {
        saveSettings({ translateTargetLang: lang });
      }
    },
    [saveSettings]
  );

  const copyTranslation = async () => {
    if (!translatedText) return;

    try {
      await navigator.clipboard.writeText(translatedText);
      setCopySuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy translation:", err);
    }
  };

  const handleClose = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
      setIsClosing(false); // Reset for next re-open
    }, 300);
  }, [onClose]);

  return html`
    <article
      class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorPanel} ${isClosing
        ? _translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorClosing
        : _translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorEntering}"
    >
      <header class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorHeader}">
        <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorLangSelector}">
          <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorLangInfo}">
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorFromLabel} ${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hideSm}"
              >From:</span
            >
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorFromLang} ${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hideSm}"
              >${getLanguageName(lang)}</span
            >
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorArrow}">→</span>
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorToLabel} ${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hideSm}"
              >To:</span
            >
          </div>

          <select
            class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorTargetSelect}"
            value=${targetLang}
            onChange=${handleTargetLangChange}
            aria-label="Select target language"
          >
            ${languages
              .filter((l) => l.code !== "auto")
              .map(
                (lang) => html`
                  <option
                    value=${lang.code}
                    selected=${targetLang === lang.code}
                  >
                    ${lang.name}
                  </option>
                `
              )}
          </select>
        </div>
        ${onClose &&
        html`
          <button
            onClick=${handleClose}
            type="button"
            class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorCloseBtn}"
            aria-label="Close translator"
            data-tooltip="Close translator"
            data-placement="left"
          >
            ✕
          </button>
        `}
      </header>

      <!-- Loading State -->
      ${loading &&
      html`
        <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorLoading}">
          <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorSpinner}"></div>
          <p class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorLoadingText}">Translating...</p>
        </div>
      `}

      <!-- No Target Language Selected -->
      ${!loading &&
      !hasError &&
      !targetLang &&
      html`
        <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorPrompt}">
          <p class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorPromptText}">
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorPromptIcon}">👆</span>
            Please select a target language to translate
          </p>
        </div>
      `}
      <!-- Same Language Warning -->
      ${!loading &&
      !hasError &&
      targetLang &&
      lang === targetLang &&
      html`
        <div class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorWarning}">
          <p class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorWarningText}">
            <span class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorWarningIcon}">⚠️</span>
            Source and target languages are the same. Please choose a different
            target language.
          </p>
        </div>
      `}

      <!-- Success State -->
      ${!loading &&
      !hasError &&
      translatedText &&
      html`
        <div
          class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorContent} ${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].ttsParagraphWrap} tts-paragraph-wrap"
        >
          <p
            class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].ttsParagraph} tts-paragraph"
            data-tts-lang=${targetLang}
          >
            ${translatedText}
          </p>

          <footer class="${_translator_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].translatorFooter}">
            <button
              type="button"
              class="pnl-reader-paragraph-speaker"
              data-tooltip="Read translation"
              data-placement="top"
            >
              🔊
            </button>
            <button
              onClick=${copyTranslation}
              type="button"
              data-tooltip=${copySuccess ? "Copied!" : "Copy translation"}
              data-placement="top"
            >
              ${copySuccess ? "✓" : "📋"}
            </button>
          </footer>
        </div>
      `}

      <!-- Error State -->
      ${error &&
      html`
        <div>
          ${(0,_errorMessages_js__WEBPACK_IMPORTED_MODULE_4__["default"])(error, "Translation")}

          <button
            onClick=${performTranslation}
            type="button"
            hidden=${error.type === "in-trial" ? true : false}
            class="secondary"
          >
            🔄 Retry
          </button>
        </div>
      `}

      <!-- Empty State -->
      ${!loading &&
      !hasError &&
      !translatedText &&
      targetLang &&
      lang !== targetLang &&
      text &&
      html`
        <div>
          <p>No translation available</p>
        </div>
      `}
    </article>
  `;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Translator);


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ErrorWithMoreInfo extends Error {
  constructor(msg, moreInfo) {
    super(msg);
    Object.assign(this, moreInfo);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getRandomInt(min, max) {
    min ??= 1;
    max ??= 10;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  extraKeyMap: {
    Enter: 13,
    Space: 32,
    Tab: 9,
    End: 35,
    Home: 36,
    PageDown: 34,
    PageUp: 33,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    Escape: 27,
  },
  checkEventKey(event, sk1, sk2, key) {
    if (key === "Disabled") {
      return false;
    }
    if (sk1 && !event[sk1.toLowerCase() + "Key"]) {
      return false;
    }
    if (sk2 && !event[sk2.toLowerCase() + "Key"]) {
      return false;
    }
    if (this.extraKeyMap[key]) {
      if (event.keyCode !== this.extraKeyMap[key]) {
        return false;
      }
    } else if (key && event.keyCode !== key.charCodeAt(0)) {
      return false;
    }

    return true;
  },

  promisify(cb) {
    return new Promise((resolve) => cb(resolve));
  },

  promisifiedTimeout(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  },

  async checkInTime(func, t = 5000) {
    let timeIsUp = false;
    this.promisifiedTimeout(t).then(() => (timeIsUp = true));

    const _check = () => {
      return new Promise(async (resolve, reject) => {
        await this.promisifiedTimeout(200);
        if (func()) {
          resolve();
        } else if (timeIsUp) {
          reject();
        } else {
          _check().then(resolve, reject);
        }
      });
    };

    return await _check();
  },

  promiseInTime(promise, t = 3000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("timeout")), t);

      promise
        .then((value) => {
          clearTimeout(timer);
          return resolve(value);
        })
        .catch((reason) => {
          clearTimeout(timer);
          return reject(reason);
        });
    });
  },

  send(type, data = {}, callback) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    }

    const p = new Promise((resolve, reject) => {
      data.type = type;
      chrome.runtime.sendMessage(data, (ret) => {
        if (ret?.error) {
          reject(
            typeof ret.error === "string"
              ? new ErrorWithMoreInfo(ret.error, ret)
              : ret.error
          );
        } else {
          resolve(ret);
        }
      });
    });

    if (callback) {
      return p.then(callback);
    }
    return p;
  },

  sendToDict(action, data = {}, callback) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    }
    data.action = action;

    return this.send("sendToDict", data, callback);
  },

  sendToTab(tabId, data = {}, callback = null) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    } else if (typeof data === "string") {
      data = { type: data };
    }

    const p = new Promise((resolve, reject) =>
      chrome.tabs.sendMessage(tabId, data, (ret) => {
        if (ret?.error) {
          reject(
            typeof ret.error === "string" ? new Error(ret.error) : ret.error
          );
        } else {
          resolve(ret);
        }
      })
    );
    if (callback) {
      return p.then(callback);
    }
    return p;
  },

  listenToBackground(type, callback) {
    if (window.self === window.top) {
      if (!window.dictionariezBackgroundListeners) {
        window.dictionariezBackgroundListeners = {};
        window.dictionariezBackgroundListeners[type] = callback;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
          window.dictionariezBackgroundListeners[request.type]?.(
            request,
            sender,
            sendResponse
          )
        );
      } else {
        window.dictionariezBackgroundListeners[type] = callback;
      }
    }
  },

  hasJapanese(str) {
    const REGEX_JAPANESE =
      /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
    return REGEX_JAPANESE.test(str);
  },
  isJapanese(str) {
    const jregex =
      /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g;
    return str.match(jregex)?.length === str.length;
  },

  hasChinese(str) {
    const REGEX_CHINESE =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    return REGEX_CHINESE.test(str);
  },
  isChinese(str) {
    const cregex =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/gu;
    return str.match(cregex)?.length === str.length;
  },
  hasKorean(str) {
    const REGEX_KOREAN = /\p{sc=Hangul}/u;
    return REGEX_KOREAN.test(str);
  },

  isValidWordOrPhrase(text = "") {
    if (!this.isSentence(text) && text) {
      if (text.split(/\s/).length > 1) {
        const allValid = text
          .split(/\s/)
          .map((word) => this.isValidWordOrPhrase(word));
        return allValid.every((v) => v);
      }
      let w = text.trim();
      // Remove up to two trailing punctuation marks
      w = w.replace(/[,:;“”'"-?!.]{1,2}$/, "");
      // Remove up to two leading punctuation marks
      w = w.replace(/^[,:;“”'"-?!.]{1,2}/, "");
      // Ignore single English letters (likely not a word)
      if (this.hasEnglish(w) && w.length === 1) {
        return false;
      }

      // Only allow one hyphen in the middle, no other punctuation
      // (e.g., "co-operate" is OK, "co--operate" or "co,operate" is not)
      const hyphenSplit = w.split("-");
      if (hyphenSplit.length > 2) return false; // More than one hyphen

      // Only allow letters (any language) and at most one hyphen
      // \p{L}: any kind of letter from any language
      // \p{M}: any kind of combining mark (accents, diacritics, etc.)
      if (!/^[\p{L}\p{M}]+(-[\p{L}\p{M}]+)?$/u.test(w)) return false;
      return true;
    }
  },

  isSentence(str = "") {
    if (this.hasChinese(str) || this.hasJapanese(str) || this.hasKorean(str)) {
      return str.length > 4;
    } else {
      const simpleStopWords = [
        "a",
        "an",
        "en",
        "ett",
        "the",
        "to",
        "in",
        "on",
        "at",
        "of",
        "for",
        "with",
        "by",
        "and",
        "or",
        "but",
        "nor",
        "so",
        "yet",
        "as",
        "if",
      ];
      return (
        str
          .split(/\s/)
          .filter(
            (w) => w.length > 1 && !simpleStopWords.includes(w.toLowerCase())
          ).length > 3
      );
    }
  },

  hasEnglish(str) {
    return /\w/.test(str);
  },

  isEnglish(str) {
    // not match: I'll  don't  Mr.Jackson
    const REGEX_ENG = /[a-zA-Z\s-]+/;
    return str.match(REGEX_ENG)?.[0] === str;
  },

  isLinux() {
    return navigator.platform.includes("Linux");
  },

  isMac() {
    return navigator.platform.includes("Mac");
  },

  isWindows() {
    return navigator.platform.includes("Win");
  },

  sanitizeHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  },

  imageToDataUrl(src) {
    return new Promise((resolve, reject) => {
      if (src.startsWith("data:")) {
        resolve(src);
      } else {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
      }
    });
  },

  imageSize(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve({ width: this.width, height: this.height });
      };

      img.src = src;
    });
  },

  toUpperFirst(text) {
    return text[0].toUpperCase() + text.slice(1);
  },

  isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  },
  async isFirefox() {
    // Check if browser API exists (Firefox) or use userAgent as fallback
    if (typeof browser !== "undefined" && browser?.runtime?.getBrowserInfo) {
      try {
        const ret = await browser.runtime.getBrowserInfo();
        return ret?.name === "Firefox";
      } catch (e) {
        // Fallback to userAgent if browser API fails
        return navigator.userAgent.includes("Firefox");
      }
    }
    return false;
  },

  loadHTML(url, credentials = "omit") {
    return this.promiseInTime(
      fetch(url, {
        method: "GET",
        credentials,
      }),
      5000
    ).then((resp) => {
      if (!resp.ok) {
        const err = new Error(resp.statusText);
        err.status = resp.status;
        throw err;
      }

      return resp.text();
    });
  },

  loadJson(url, credentials) {
    return this.promiseInTime(
      fetch(url, {
        method: "GET",
        credentials,
      }),
      5000
    ).then((resp) => {
      if (!resp.ok) {
        const err = new Error(resp.statusText);
        err.status = resp.status;
        throw err;
      }

      return resp.json();
    });
  },
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./src/content/translation/webcomponent.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils.js");
/* harmony import */ var _translatorPanel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translatorPanel.js */ "./src/content/translation/translatorPanel.js");
/* harmony import */ var _picocss_pico_scss_pico_scss_inline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @picocss/pico/scss/pico.scss?inline */ "./node_modules/@picocss/pico/scss/pico.scss?inline");
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @webcomponents/custom-elements */ "./node_modules/@webcomponents/custom-elements/custom-elements.min.js");
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_5__);







const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);

let translatorStyles = "";
for (const node of document.head.childNodes) {
  if (node.tagName === "STYLE") {
    const style = node.innerHTML;
    if (style.includes("PNLTranslatorContainer")) {
      translatorStyles += style;
    }
  }
}

class PNLTranslatorElement extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM for isolation
    this.shadow = this.attachShadow({ mode: "closed" });

    // Create render target
    this.renderTarget = document.createElement("div");
    this.renderTarget.id = "PNLTranslatorContainer";
    this.shadow.appendChild(this.renderTarget);

    // Internal state
    this._isVisible = false;
    this._stylesInjected = false;
    this._settings = {};
  }

  disconnectedCallback() {
    if (this.renderTarget) {
      (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, this.renderTarget);
    }
  }

  connectedCallback() {
    // Inject styles into shadow DOM
    const injectStyles = () => {
      // Inject Pico CSS
      const picoStyleElement = document.createElement("style");
      picoStyleElement.textContent = _picocss_pico_scss_pico_scss_inline__WEBPACK_IMPORTED_MODULE_4__["default"];
      this.shadow.appendChild(picoStyleElement);

      const styleElement = document.createElement("style");
      styleElement.textContent = translatorStyles;
      this.shadow.appendChild(styleElement);
    };

    const handleSaveSettings = async (update) => {
      this._settings = { ...this._settings, ...update };
      try {
        await utils__WEBPACK_IMPORTED_MODULE_2__["default"].send("save setting", {
          key: "translatorSettings",
          value: JSON.stringify(this._settings),
        });
      } catch (e) {
        console.warn("Failed to save translator settings", e);
      }

      // Force a re-render by calling show again with updated settings
      if (this._isVisible && this._currentText) {
        updateTranslator();
      }

      // Dispatch settings change event
      this.dispatchEvent(
        new CustomEvent("settingschange", {
          detail: update,
          bubbles: true,
        })
      );
    };

    const updateTranslator = () => {
      const translatorElement = html`
        <${_translatorPanel_js__WEBPACK_IMPORTED_MODULE_3__["default"]}
          text=${this._currentText}
          lang=${this._currentLang}
          settings=${this._settings}
          saveSettings=${handleSaveSettings}
          onClose=${hide}
        />
      `;

      (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(translatorElement, this.renderTarget);
    };

    // Show the translator with text and language
    const show = (text, lang = "en", settings = {}) => {
      if (!text || !text.trim()) {
        console.warn("No text provided to Translator");
        return;
      }

      this._isVisible = true;
      this._currentText = text;
      this._currentLang = lang;
      this._settings = settings;

      updateTranslator();

      // Make sure the render target allows pointer events
      this.renderTarget.style.pointerEvents = "auto";

      // Add to DOM if not already there
      if (!this.parentNode) {
        document.body.appendChild(this);
      }

      // Dispatch show event
      this.dispatchEvent(
        new CustomEvent("show", {
          detail: { text, lang, settings },
          bubbles: true,
        })
      );
    };

    const hide = () => {
      this._isVisible = false;
      (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, this.renderTarget);

      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }

      // Dispatch hide event
      this.dispatchEvent(
        new CustomEvent("hide", {
          bubbles: true,
        })
      );
    };

    if (!this._stylesInjected) {
      injectStyles();
      this._stylesInjected = true;
    }
    this.show = show;
    this.hide = hide;
    console.log("PNL Translator Web Component connected");
  }
}

function adjustTranslatorPosition(translator, selectionRect) {
  let translatorX = selectionRect.x + window.scrollX;
  let translatorY =
    selectionRect.y + selectionRect.height + window.scrollY + 50;
  let translatorRight;
  // Ensure translator stays within viewport bounds
  const viewportWidth = window.innerWidth;
  //   const viewportHeight = window.innerHeight;
  // Adjust if translator goes off-screen horizontally
  if (translatorX < 0) {
    translatorX = window.scrollX;
  }
  if (viewportWidth - translatorX < 400) {
    translatorRight = 30;
  }

  translator.style.cssText = `
        position: absolute;
        ${
          translatorRight
            ? `right: ${translatorRight}px`
            : `left: ${translatorX}px`
        };
        top: ${translatorY}px;
        width: ${selectionRect.width}px;
        min-width: min-content;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 99999999;
        `;
}

// Register the custom element
if (!customElements.get("pnl-translator")) {
  customElements.define("pnl-translator", PNLTranslatorElement);
}

window.createTranslator = () => {
  if (document.querySelector("pnl-translator")) {
    return document.querySelector("pnl-translator");
  }
  const element = document.createElement("pnl-translator");
  document.documentElement.appendChild(element);
  return element;
};

window.addEventListener("message", (event) => {
  if (event.source !== window) return; // Only accept messages from the same window
  // Only accept messages from same origin for security
  if (event.origin !== window.location.origin) {
    return;
  }

  const { command, text, lang, selectionRect, translatorSettings } = event.data;
  if (text && command === "pnl-translate") {
    const translator = window.createTranslator();
    translator.show(text, lang, translatorSettings);
    if (selectionRect) {
      adjustTranslatorPosition(translator, selectionRect);
    }
  }
});

})();

/******/ })()
;
//# sourceMappingURL=translator-webcomponent.bundle.js.map