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
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy {
  color: var(--pico-del-color);
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy a,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy a {
  color: var(--pico-primary);
  text-decoration: none;
  padding: 0 5px;
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__in-trial___DUyv4,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__in-trial___DUyv4 {
  color: var(--pico-code-color);
}
#PNLReader .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_,
#PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_ {
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
  #PNLTTSPlayerContainer .errorMessages-module__pnl-reader-error-banner___Qrqdy.errorMessages-module__for-audio___ez0R_ {
    width: 100%;
    max-width: 98vw;
    font-size: 0.97em;
    padding: 0.5em 1.2em;
    border-radius: 6px;
    bottom: calc(48px + 1.4rem + 0.5em);
  }
}`, "",{"version":3,"sources":["webpack://./src/content/errorMessages.module.scss"],"names":[],"mappings":"AAQE;;EACE,4BAAA;AANJ;AAQI;;EACE,0BAAA;EACA,qBAAA;EACA,cAAA;AALN;AAQI;;EACE,6BAAA;AALN;AAQI;;EACE,eAAA;EACA,SAAA;EACA,wCAAA;EAGA,2BAAA;EACA,6CAAA;EACA,gDAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,UAAA;AAPN;AASM;EAfF;;IAgBI,WAAA;IACA,eAAA;IACA,iBAAA;IACA,oBAAA;IACA,kBAAA;IACA,mCAAA;EALN;AACF","sourcesContent":[":global(#PNLReader),\n:global(#PNLTTSPlayerContainer) {\n  $playBarBottomSpacing: 2em;\n  $playBarPaddingVertical: 1.2em;\n\n  $playBarBottomSpacingOnMobile: 0px;\n  $playBarPaddingVerticalOnMobile: 0.7rem;\n\n  .pnl-reader-error-banner {\n    color: var(--pico-del-color);\n\n    a {\n      color: var(--pico-primary);\n      text-decoration: none;\n      padding: 0 5px;\n    }\n\n    &.in-trial {\n      color: var(--pico-code-color);\n    }\n\n    &.for-audio {\n      position: fixed;\n      left: 50%;\n      bottom: calc(\n        80px + $playBarBottomSpacing + $playBarPaddingVertical * 2 + 0.5em\n      );\n      transform: translateX(-50%);\n      background: var(--pico-code-background-color);\n      border: 1px solid var(--pico-table-border-color);\n      border-radius: 8px;\n      padding: 10px 20px;\n      margin-bottom: 0;\n      max-width: 80vw;\n      z-index: 2;\n\n      @media (max-width: 768px) {\n        width: 100%;\n        max-width: 98vw;\n        font-size: 0.97em;\n        padding: 0.5em 1.2em;\n        border-radius: 6px;\n        bottom: calc(\n          48px + $playBarBottomSpacingOnMobile + $playBarPaddingVerticalOnMobile *\n            2 + 0.5em\n        );\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/ttsPlayer/ttsPlayer.module.scss":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/ttsPlayer/ttsPlayer.module.scss ***!
  \**************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr {
  padding: 20px;
  margin: 0 2em;
  display: block;
  cursor: pointer;
  border: none;
  border-radius: 10px 0px;
  transition: all 0.3s;
  font-size: 0;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr svg,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr svg {
  font-size: 40px;
  width: 40px;
  height: 40px;
  color: #fff;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__play___UlsOV,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__play___UlsOV {
  background: #6fcf97;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__pause___Sd7r9,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__pause___Sd7r9 {
  background: #eb5757;
  transform: rotate(90deg);
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__pause___Sd7r9 svg,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr.ttsPlayer-module__pause___Sd7r9 svg {
  transform: rotate(-90deg);
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr[data-error=true],
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr[data-error=true] {
  background: linear-gradient(120deg, #ff5f6d 0%, #ffc371 25%, #fff 30%, #ff5f6d 45%, #ffc371 60%, #ffb199 80%, #ff5f6d 100%);
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr {
    padding: 0;
    margin: 0;
    width: 48px;
    height: 48px;
  }
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr svg,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-play-btn___nXjSr svg {
    font-size: 28px;
    width: 28px;
    height: 28px;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-loading-spinner___kvBAZ,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-loading-spinner___kvBAZ {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.8) 25%, #fffbe6 50%, rgba(255, 215, 0, 0.8) 75%);
  background-size: 200% 100%;
  animation: ttsPlayer-module__tts-shimmer___CCGNr 1.2s linear infinite;
  box-shadow: 0 0 0 0.8em rgba(255, 215, 0, 0.2666666667);
}
@keyframes ttsPlayer-module__tts-shimmer___CCGNr {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0 0;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 2.5em;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV::before,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2.2em;
  width: 48px;
  height: 4.5em;
  background: transparent;
  z-index: 1;
  pointer-events: auto;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-btn___kuqw5,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-btn___kuqw5 {
  z-index: 1;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND {
  position: absolute;
  left: 50%;
  bottom: 63px;
  transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  transform-origin: left center;
  width: 160px;
  height: 32px;
  display: block;
  accent-color: var(--pico-primary, #ffd700);
  background: #23272f;
  border-radius: 16px;
  border: 1px solid #888;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 0 10px;
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND {
    bottom: 3em;
  }
}
@media (max-width: 576px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND {
    width: 120px;
    bottom: 2.4em;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND:focus,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND:focus {
  outline: 2px solid var(--pico-primary, #ffd700);
  outline-offset: 2px;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-webkit-slider-thumb,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-webkit-slider-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--pico-primary, #ffd700);
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  appearance: none;
  margin-top: -8px;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-webkit-slider-runnable-track,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 8px;
  background: #e6e6e6;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-moz-range-thumb,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--pico-primary, #ffd700);
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-moz-range-track,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-volume-container___jh2NV .ttsPlayer-module__tts-volume-slider___SFaND::-moz-range-track {
  height: 8px;
  border-radius: 8px;
  background: #e6e6e6;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 1.2em !important;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 0;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: #222;
  box-shadow: 0 0 0 2px var(--pico-muted-border-color, #222);
  display: block;
  margin: 0 auto;
  transition: box-shadow 0.2s;
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G {
    margin: 0 0.7em !important;
  }
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY {
    width: 56px;
    height: 56px;
  }
}
@media (max-width: 576px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G {
    margin: 0 0.3em !important;
  }
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-avatar-btn___cQI6G .ttsPlayer-module__tts-voice-avatar-round___udhkY {
    width: 48px;
    height: 48px;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa {
  position: absolute;
  left: 0;
  bottom: 120px;
  background: var(--pico-background-color, #23272f);
  border-radius: 0.5em;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 0.3em 0;
  width: max-content;
  min-width: 11em;
  z-index: 10;
  list-style: none;
  margin: 0;
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa {
    bottom: 90px;
  }
}
@media (max-width: 576px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa {
    bottom: 70px;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v {
  display: flex;
  align-items: flex-start !important;
  gap: 8px !important;
  padding: 0.4em 1em;
  cursor: pointer;
  border-radius: 0.4em;
  text-decoration: none;
  color: inherit;
  transition: background 0.18s;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v:hover, #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v:focus,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v:hover,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v:focus {
  background: var(--pico-muted-background-color, #353a45);
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__tts-voice-avatar-round___udhkY,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__tts-voice-avatar-round___udhkY {
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  object-fit: cover;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceInfo___ddnnV,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceInfo___ddnnV {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceName___zVYCH,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceName___zVYCH {
  font-weight: 500;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceTag___P2Bk6,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceTag___P2Bk6 {
  font-size: 0.75rem;
  color: var(--pico-color);
  font-weight: 600;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceNote___OF7P2,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-voice-dropdown-item___bv_1v .ttsPlayer-module__ttsVoiceNote___OF7P2 {
  font-size: 0.7rem;
  color: var(--pico-muted-color);
  font-style: italic;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg::after,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg::after {
  display: none !important;
  content: none !important;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg .ttsPlayer-module__tts-speed-label___LWklY,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg .ttsPlayer-module__tts-speed-label___LWklY {
  font-weight: 600;
  letter-spacing: 0.05em;
  font-family: inherit;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg .ttsPlayer-module__tts-speed-label___LWklY .ttsPlayer-module__tts-speed-x___UgVBO,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO summary.ttsPlayer-module__tts-speed-btn___GBuhg .ttsPlayer-module__tts-speed-label___LWklY .ttsPlayer-module__tts-speed-x___UgVBO {
  font-family: "Inter", "Arial", sans-serif;
  font-weight: 400;
  margin-left: 0.1em;
  font-size: 0.9em;
  opacity: 0.8;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ {
  position: absolute;
  left: 50%;
  bottom: 104px;
  transform: translateX(-50%);
  background: var(--pico-background-color, #23272f);
  border-radius: 0.5em;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 0.3em 0;
  min-width: 6em;
  z-index: 10;
  list-style: none;
  margin: 0;
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ {
    bottom: 86px;
  }
}
@media (max-width: 576px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ {
    bottom: 70px;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1 {
  display: block;
  padding: 0.5em 1.2em;
  font-size: 1.1em;
  color: var(--pico-color, #fff);
  text-align: center;
  border-radius: 0.4em;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.18s;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1:hover, #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1:focus, #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1.ttsPlayer-module__selected___IfIm6,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1:hover,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1:focus,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1.ttsPlayer-module__selected___IfIm6 {
  background: var(--pico-muted-background-color, #353a45);
  color: var(--pico-primary, #36b37e);
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1 .ttsPlayer-module__tts-speed-x___UgVBO,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-speed-dropdown___i8xVO .ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ .ttsPlayer-module__tts-speed-dropdown-item___kyeD1 .ttsPlayer-module__tts-speed-x___UgVBO {
  font-family: "Inter", "Arial", sans-serif;
  font-weight: 400;
  margin-left: 0.1em;
  font-size: 0.9em;
  opacity: 0.8;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-exit-btn___VQiqa,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-exit-btn___VQiqa {
  font-size: 1.2em !important;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 {
  position: fixed;
  left: 50%;
  bottom: 2em;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pico-background-color, #23272f);
  border-radius: 2em 2em 1.2em 2.2em;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
  padding: 1.2em 2.2em;
  width: auto;
  min-width: 560px;
  max-width: 90vw;
  z-index: 2147483647;
  gap: 1.2em;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 [type="button"],
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 details.dropdown,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 [type="button"],
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 details.dropdown {
  margin-bottom: 0;
}
@media (max-width: 1024px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 {
    width: 90%;
  }
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 {
    width: 100%;
    font-size: 1em;
    padding: 0.7rem 0.5rem;
    gap: 0.7rem;
    bottom: 0px;
  }
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo {
  background: none;
  border: none;
  color: var(--pico-code-color);
  width: 48px;
  height: 48px;
  font-size: 1.6em;
  cursor: pointer;
  margin: 0 0.2rem;
  padding: 0.4em;
  border-radius: 1.2em 1.2em 0.8em 1.6em;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo svg,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo svg {
  width: 1.4em;
  height: 1.4em;
  min-width: 1.4em;
  min-height: 1.4em;
  display: inline-block;
  vertical-align: middle;
  transition: color 0.18s;
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:hover, #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:focus,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:hover,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:focus {
  background: var(--pico-muted-background-color, #353a45);
  color: var(--pico-primary, #ffd700);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
#PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:hover svg, #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:focus svg,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:hover svg,
#PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo:focus svg {
  color: var(--pico-primary, #36b37e);
}
@media (max-width: 768px) {
  #PNLReader .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo,
  #PNLTTSPlayerContainer .ttsPlayer-module__tts-player-bar____2rF8 .ttsPlayer-module__tts-player-btn___ii1fo {
    margin: 0;
  }
}`, "",{"version":3,"sources":["webpack://./src/content/ttsPlayer/ttsPlayerPlayBtn.scss","webpack://./src/content/ttsPlayer/ttsPlayer.module.scss","webpack://./src/content/ttsPlayer/ttsVolumeBtn.scss","webpack://./src/content/ttsPlayer/ttsVoiceSelector.scss","webpack://./src/content/ttsPlayer/ttsSpeedSelector.scss","webpack://./src/content/ttsPlayer/ttsExitBtn.scss"],"names":[],"mappings":"AAME;;EACE,aAAA;EACA,aAAA;EACA,cAAA;EACA,eAAA;EACA,YAAA;EACA,uBAAA;EACA,oBAAA;EACA,YAAA;ACJJ;ADMI;;EACE,eAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;EACA,cAAA;EACA,0BAAA;ACHN;ADMI;;EACE,mBA1BG;ACuBT;ADKI;;EACE,mBA5BI;EA6BJ,wBAAA;ACFN;ADIM;;EACE,yBAAA;ACDR;ADII;;EACE,2HAAA;ACDN;ADeE;EACE;;IACE,UAAA;IACA,SAAA;IACA,WAAA;IACA,YAAA;ECZJ;EDcI;;IACE,eAAA;IACA,WAAA;IACA,YAAA;ECXN;AACF;ADeE;;EACE,uGAAA;EAMA,0BAAA;EACA,qEAAA;EACA,uDAAA;ACjBJ;ADoBE;EACE;IACE,2BAAA;EClBJ;EDoBE;IACE,wBAAA;EClBJ;AACF;AClEE;;EACE,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,gBAAA;ADqEJ;AClEI;;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EACA,2BAAA;EACA,aAAA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,UAAA;EACA,oBAAA;ADqEN;AClEI;;EACE,UAAA;ADqEN;AClEI;;EACE,kBAAA;EACA,SAAA;EACA,YAAA;EACA,yBAAA;EACA,8BAAA;EACA,6BAAA;EACA,YAAA;EACA,YAAA;EACA,cAAA;EACA,0CAAA;EACA,mBAAA;EACA,mBAAA;EACA,sBAAA;EACA,yCAAA;EACA,WAAA;EACA,eAAA;ADqEN;ACnEM;EAlBF;;IAmBI,WAAA;EDuEN;AACF;ACrEM;EAtBF;;IAuBI,YAAA;IACA,aAAA;EDyEN;AACF;ACvEM;;EACE,+CAAA;EACA,mBAAA;AD0ER;ACtEM;;EACE,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wCAAA;EACA,sBAAA;EACA,yCAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;ADyER;ACvEM;;EACE,WAAA;EACA,kBAAA;EACA,mBAAA;AD0ER;ACtEM;;EACE,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wCAAA;EACA,sBAAA;EACA,yCAAA;EACA,eAAA;ADyER;ACvEM;;EACE,WAAA;EACA,kBAAA;EACA,mBAAA;AD0ER;AEjKE;;EACE,2BAAA;EACA,uBAAA;EACA,2BAAA;EACA,qBAAA;EACA,0BAAA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,kBAAA;EACA,YAAA;AFoKJ;AElKI;;EACE,WAAA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,0DAAA;EACA,cAAA;EACA,cAAA;EACA,2BAAA;AFqKN;AEhKE;EACE;;IACE,0BAAA;EFmKJ;EEjKI;;IACE,WAAA;IACA,YAAA;EFoKN;AACF;AEhKE;EACE;;IACE,0BAAA;EFmKJ;EEjKI;;IACE,WAAA;IACA,YAAA;EFoKN;AACF;AEhKE;;EACE,kBAAA;EACA,OAAA;EACA,aAAA;EACA,iDAAA;EACA,oBAAA;EACA,0CAAA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,SAAA;AFmKJ;AElKI;EAbF;;IAcI,YAAA;EFsKJ;AACF;AEpKI;EAjBF;;IAkBI,YAAA;EFwKJ;AACF;AErKE;;EACE,aAAA;EACA,kCAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,oBAAA;EACA,qBAAA;EACA,cAAA;EACA,4BAAA;AFwKJ;AEtKI;;;EAEE,uDAAA;AFyKN;AEtKI;;EACE,YAAA;EACA,aAAA;EACA,kBAAA;EACA,iBAAA;AFyKN;AEtKI;;EACE,aAAA;EACA,sBAAA;EACA,QAAA;AFyKN;AEtKI;;EACE,gBAAA;AFyKN;AEtKI;;EACE,kBAAA;EACA,wBAAA;EACA,gBAAA;AFyKN;AEtKI;;EACE,iBAAA;EACA,8BAAA;EACA,kBAAA;AFyKN;AGtRM;;EACE,wBAAA;EACA,wBAAA;AHyRR;AGtRM;;EACE,gBAAA;EACA,sBAAA;EACA,oBAAA;AHyRR;AGvRQ;;EACE,yCAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;AH0RV;AGrRI;;EACE,kBAAA;EACA,SAAA;EACA,aAAA;EACA,2BAAA;EACA,iDAAA;EACA,oBAAA;EACA,0CAAA;EACA,gBAAA;EACA,cAAA;EACA,WAAA;EACA,gBAAA;EACA,SAAA;AHwRN;AGvRM;EAbF;;IAcI,YAAA;EH2RN;AACF;AG1RM;EAhBF;;IAiBI,YAAA;EH8RN;AACF;AG5RM;;EACE,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,8BAAA;EACA,kBAAA;EACA,oBAAA;EACA,eAAA;EACA,qBAAA;EACA,4BAAA;AH+RR;AG7RQ;;;;EAGE,uDAAA;EACA,mCAAA;AHgSV;AG7RQ;;EACE,yCAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;AHgSV;AIlWE;;EAEE,2BAAA;AJoWJ;AAzVE;;EAOE,eAAA;EACA,SAAA;EACA,WAfqB;EAgBrB,2BAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,iDAAA;EAEA,kCAAA;EACA,0CAAA;EACA,oBAAA;EACA,WAAA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,UAAA;AAqVJ;AA1WI;;;;EAEE,gBAAA;AA8WN;AAzVI;EAzBF;;IA0BI,UAAA;EA6VJ;AACF;AA5VI;EA5BF;;IA6BI,WAAA;IACA,cAAA;IACA,sBAAA;IACA,WAAA;IACA,WApC2B;EAoY/B;AACF;AA9VI;;EACE,gBAAA;EACA,YAAA;EACA,6BAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,cAAA;EACA,sCAAA;EACA,2DAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AAiWN;AA/VM;;EACE,YAAA;EACA,aAAA;EACA,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,uBAAA;AAkWR;AA/VM;;;EAEE,uDAAA;EACA,mCAAA;EACA,wCAAA;AAkWR;AAhWQ;;;EACE,mCAAA;AAoWV;AAhWM;EAtCF;;IAuCI,SAAA;EAoWN;AACF","sourcesContent":[".tts-player-bar {\n  $play: #6fcf97; // soft green\n  $pause: #eb5757; // soft red\n\n  $playBtnHeight: 80px; // padding: 20px + svg height 40px + padding 20px\n\n  .tts-play-btn {\n    padding: 20px;\n    margin: 0 2em;\n    display: block;\n    cursor: pointer;\n    border: none;\n    border-radius: 10px 0px;\n    transition: all 0.3s;\n    font-size: 0; // hide text if any\n\n    svg {\n      font-size: 40px;\n      width: 40px;\n      height: 40px;\n      color: #fff;\n      display: block;\n      margin: 0 auto;\n      transition: transform 0.3s;\n    }\n\n    &.play {\n      background: $play;\n    }\n    &.pause {\n      background: $pause;\n      transform: rotate(90deg);\n\n      svg {\n        transform: rotate(-90deg);\n      }\n    }\n    &[data-error=\"true\"] {\n      background: linear-gradient(\n        120deg,\n        #ff5f6d 0%,\n        #ffc371 25%,\n        #fff 30%,\n        #ff5f6d 45%,\n        #ffc371 60%,\n        #ffb199 80%,\n        #ff5f6d 100%\n      ); // broken-ish, patchy error gradient\n    }\n  }\n\n  // Responsive styles\n  @media (max-width: 768px) {\n    .tts-play-btn {\n      padding: 0;\n      margin: 0;\n      width: 48px;\n      height: 48px;\n\n      svg {\n        font-size: 28px;\n        width: 28px;\n        height: 28px;\n      }\n    }\n  }\n\n  .tts-loading-spinner {\n    background: linear-gradient(\n      90deg,\n      #ffd700cc 25%,\n      #fffbe6 50%,\n      #ffd700cc 75%\n    );\n    background-size: 200% 100%;\n    animation: tts-shimmer 1.2s linear infinite;\n    box-shadow: 0 0 0 0.8em #ffd70044;\n  }\n\n  @keyframes tts-shimmer {\n    0% {\n      background-position: 200% 0;\n    }\n    100% {\n      background-position: 0 0;\n    }\n  }\n}\n",":global(#PNLReader),\n:global(#PNLTTSPlayerContainer) {\n  @import \"./ttsPlayerPlayBtn.scss\";\n  @import \"./ttsVolumeBtn.scss\";\n  @import \"./ttsVoiceSelector.scss\";\n  @import \"./ttsSpeedSelector.scss\";\n  @import \"./ttsExitBtn.scss\";\n\n  $playBarBottomSpacing: 2em;\n  $playBarPaddingVertical: 1.2em;\n\n  $playBarBottomSpacingOnMobile: 0px;\n  $playBarPaddingVerticalOnMobile: 0.7rem;\n\n  .tts-player-bar {\n    // some overrides to make it fit Pico.css theme\n    :global([type=\"button\"]),\n    :global(details.dropdown) {\n      margin-bottom: 0;\n    }\n\n    position: fixed;\n    left: 50%;\n    bottom: $playBarBottomSpacing;\n    transform: translateX(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: var(--pico-background-color, #23272f);\n    // Refined corners to match play button's style\n    border-radius: 2em 2em 1.2em 2.2em;\n    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);\n    padding: $playBarPaddingVertical 2.2em;\n    width: auto;\n    min-width: 560px;\n    max-width: 90vw;\n    z-index: 2147483647;\n    gap: 1.2em;\n\n    @media (max-width: 1024px) {\n      width: 90%;\n    }\n    @media (max-width: 768px) {\n      width: 100%;\n      font-size: 1em;\n      padding: $playBarPaddingVerticalOnMobile 0.5rem;\n      gap: 0.7rem;\n      bottom: $playBarBottomSpacingOnMobile;\n    }\n\n    .tts-player-btn {\n      background: none;\n      border: none;\n      color: var(--pico-code-color);\n      width: 48px;\n      height: 48px;\n      font-size: 1.6em;\n      cursor: pointer;\n      margin: 0 0.2rem;\n      padding: 0.4em;\n      border-radius: 1.2em 1.2em 0.8em 1.6em;\n      transition: background 0.18s, color 0.18s, box-shadow 0.18s;\n      outline: none;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n\n      svg {\n        width: 1.4em;\n        height: 1.4em;\n        min-width: 1.4em;\n        min-height: 1.4em;\n        display: inline-block;\n        vertical-align: middle;\n        transition: color 0.18s;\n      }\n\n      &:hover,\n      &:focus {\n        background: var(--pico-muted-background-color, #353a45);\n        color: var(--pico-primary, #ffd700);\n        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n\n        svg {\n          color: var(--pico-primary, #36b37e);\n        }\n      }\n\n      @media (max-width: 768px) {\n        margin: 0;\n      }\n    }\n  }\n}\n",".tts-player-bar {\n  .tts-volume-container {\n    position: relative;\n    display: flex;\n    align-items: center;\n    min-width: 2.5em;\n\n    // Invisible hover bridge\n    &::before {\n      content: \"\";\n      position: absolute;\n      left: 50%;\n      transform: translateX(-50%);\n      bottom: 2.2em; // match slider's bottom\n      width: 48px; // match or slightly wider than slider/button\n      height: 4.5em; // vertical space between button and slider\n      background: transparent;\n      z-index: 1;\n      pointer-events: auto;\n    }\n\n    .tts-volume-btn {\n      z-index: 1; // ensure button stays below the slider\n    }\n\n    .tts-volume-slider {\n      position: absolute;\n      left: 50%;\n      bottom: 63px; // further above the volume icon\n      transform: rotate(-90deg);\n      -moz-transform: rotate(-90deg);\n      transform-origin: left center;\n      width: 160px;\n      height: 32px;\n      display: block;\n      accent-color: var(--pico-primary, #ffd700);\n      background: #23272f;\n      border-radius: 16px;\n      border: 1px solid #888;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n      z-index: 10; // ensure slider is above the button\n      padding: 0 10px;\n\n      @media (max-width: 768px) {\n        bottom: 3em;\n      }\n\n      @media (max-width: 576px) {\n        width: 120px;\n        bottom: 2.4em;\n      }\n\n      &:focus {\n        outline: 2px solid var(--pico-primary, #ffd700);\n        outline-offset: 2px;\n      }\n\n      // Webkit browsers (Chrome, Safari)\n      &::-webkit-slider-thumb {\n        width: 22px;\n        height: 22px;\n        border-radius: 50%;\n        background: var(--pico-primary, #ffd700);\n        border: 2px solid #fff;\n        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n        cursor: pointer;\n        appearance: none;\n        margin-top: -8px;\n      }\n      &::-webkit-slider-runnable-track {\n        height: 8px;\n        border-radius: 8px;\n        background: #e6e6e6;\n      }\n\n      // Firefox\n      &::-moz-range-thumb {\n        width: 22px;\n        height: 22px;\n        border-radius: 50%;\n        background: var(--pico-primary, #ffd700);\n        border: 2px solid #fff;\n        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n        cursor: pointer;\n      }\n      &::-moz-range-track {\n        height: 8px;\n        border-radius: 8px;\n        background: #e6e6e6;\n      }\n    }\n  }\n}\n",".tts-player-bar {\n  .tts-voice-avatar-btn {\n    background: none !important;\n    border: none !important;\n    box-shadow: none !important;\n    padding: 0 !important;\n    margin: 0 1.2em !important; // space to align with play button\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n    border-radius: 50%;\n    font-size: 0;\n\n    .tts-voice-avatar-round {\n      width: 80px;\n      height: 80px;\n      border-radius: 50%;\n      object-fit: cover;\n      background: #222;\n      box-shadow: 0 0 0 2px var(--pico-muted-border-color, #222);\n      display: block;\n      margin: 0 auto;\n      transition: box-shadow 0.2s;\n    }\n  }\n\n  // Responsive styles for smaller screens\n  @media (max-width: 768px) {\n    .tts-voice-avatar-btn {\n      margin: 0 0.7em !important;\n\n      .tts-voice-avatar-round {\n        width: 56px;\n        height: 56px;\n      }\n    }\n  }\n\n  @media (max-width: 576px) {\n    .tts-voice-avatar-btn {\n      margin: 0 0.3em !important;\n\n      .tts-voice-avatar-round {\n        width: 48px;\n        height: 48px;\n      }\n    }\n  }\n\n  .tts-voice-dropdown-list-top {\n    position: absolute;\n    left: 0;\n    bottom: 120px; // show above the summary/avatar\n    background: var(--pico-background-color, #23272f);\n    border-radius: 0.5em;\n    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);\n    padding: 0.3em 0;\n    width: max-content;\n    min-width: 11em;\n    z-index: 10;\n    list-style: none;\n    margin: 0;\n    @media (max-width: 768px) {\n      bottom: 90px;\n    }\n\n    @media (max-width: 576px) {\n      bottom: 70px;\n    }\n  }\n\n  .tts-voice-dropdown-item {\n    display: flex;\n    align-items: flex-start !important;\n    gap: 8px !important;\n    padding: 0.4em 1em;\n    cursor: pointer;\n    border-radius: 0.4em;\n    text-decoration: none;\n    color: inherit;\n    transition: background 0.18s;\n\n    &:hover,\n    &:focus {\n      background: var(--pico-muted-background-color, #353a45);\n    }\n\n    .tts-voice-avatar-round {\n      width: 1.6em;\n      height: 1.6em;\n      border-radius: 50%;\n      object-fit: cover;\n    }\n\n    .ttsVoiceInfo {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .ttsVoiceName {\n      font-weight: 500;\n    }\n\n    .ttsVoiceTag {\n      font-size: 0.75rem;\n      color: var(--pico-color);\n      font-weight: 600;\n    }\n\n    .ttsVoiceNote {\n      font-size: 0.7rem;\n      color: var(--pico-muted-color);\n      font-style: italic;\n    }\n  }\n}\n",".tts-player-bar {\n  .tts-speed-dropdown {\n    summary.tts-speed-btn {\n      // Remove Pico's dropdown indicator\n      &::after {\n        display: none !important;\n        content: none !important;\n      }\n\n      .tts-speed-label {\n        font-weight: 600;\n        letter-spacing: 0.05em;\n        font-family: inherit;\n\n        .tts-speed-x {\n          font-family: \"Inter\", \"Arial\", sans-serif;\n          font-weight: 400;\n          margin-left: 0.1em;\n          font-size: 0.9em;\n          opacity: 0.8;\n        }\n      }\n    }\n\n    .tts-speed-dropdown-list-top {\n      position: absolute;\n      left: 50%;\n      bottom: 104px;\n      transform: translateX(-50%);\n      background: var(--pico-background-color, #23272f);\n      border-radius: 0.5em;\n      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);\n      padding: 0.3em 0;\n      min-width: 6em;\n      z-index: 10;\n      list-style: none;\n      margin: 0;\n      @media (max-width: 768px) {\n        bottom: 86px;\n      }\n      @media (max-width: 576px) {\n        bottom: 70px;\n      }\n\n      .tts-speed-dropdown-item {\n        display: block;\n        padding: 0.5em 1.2em;\n        font-size: 1.1em;\n        color: var(--pico-color, #fff);\n        text-align: center;\n        border-radius: 0.4em;\n        cursor: pointer;\n        text-decoration: none;\n        transition: background 0.18s;\n\n        &:hover,\n        &:focus,\n        &.selected {\n          background: var(--pico-muted-background-color, #353a45);\n          color: var(--pico-primary, #36b37e);\n        }\n        // Style the 'x' in the dropdown list\n        .tts-speed-x {\n          font-family: \"Inter\", \"Arial\", sans-serif;\n          font-weight: 400;\n          margin-left: 0.1em;\n          font-size: 0.9em;\n          opacity: 0.8;\n        }\n      }\n    }\n  }\n}\n",".tts-player-bar {\n  .tts-exit-btn {\n    // Overide the size of the exit button, it's a bit too large\n    font-size: 1.2em !important;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"tts-player-bar": `ttsPlayer-module__tts-player-bar____2rF8`,
	"ttsPlayerBar": `ttsPlayer-module__tts-player-bar____2rF8`,
	"tts-play-btn": `ttsPlayer-module__tts-play-btn___nXjSr`,
	"ttsPlayBtn": `ttsPlayer-module__tts-play-btn___nXjSr`,
	"play": `ttsPlayer-module__play___UlsOV`,
	"pause": `ttsPlayer-module__pause___Sd7r9`,
	"tts-loading-spinner": `ttsPlayer-module__tts-loading-spinner___kvBAZ`,
	"ttsLoadingSpinner": `ttsPlayer-module__tts-loading-spinner___kvBAZ`,
	"tts-shimmer": `ttsPlayer-module__tts-shimmer___CCGNr`,
	"ttsShimmer": `ttsPlayer-module__tts-shimmer___CCGNr`,
	"tts-volume-container": `ttsPlayer-module__tts-volume-container___jh2NV`,
	"ttsVolumeContainer": `ttsPlayer-module__tts-volume-container___jh2NV`,
	"tts-volume-btn": `ttsPlayer-module__tts-volume-btn___kuqw5`,
	"ttsVolumeBtn": `ttsPlayer-module__tts-volume-btn___kuqw5`,
	"tts-volume-slider": `ttsPlayer-module__tts-volume-slider___SFaND`,
	"ttsVolumeSlider": `ttsPlayer-module__tts-volume-slider___SFaND`,
	"tts-voice-avatar-btn": `ttsPlayer-module__tts-voice-avatar-btn___cQI6G`,
	"ttsVoiceAvatarBtn": `ttsPlayer-module__tts-voice-avatar-btn___cQI6G`,
	"tts-voice-avatar-round": `ttsPlayer-module__tts-voice-avatar-round___udhkY`,
	"ttsVoiceAvatarRound": `ttsPlayer-module__tts-voice-avatar-round___udhkY`,
	"tts-voice-dropdown-list-top": `ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa`,
	"ttsVoiceDropdownListTop": `ttsPlayer-module__tts-voice-dropdown-list-top___g0bSa`,
	"tts-voice-dropdown-item": `ttsPlayer-module__tts-voice-dropdown-item___bv_1v`,
	"ttsVoiceDropdownItem": `ttsPlayer-module__tts-voice-dropdown-item___bv_1v`,
	"ttsVoiceInfo": `ttsPlayer-module__ttsVoiceInfo___ddnnV`,
	"ttsVoiceName": `ttsPlayer-module__ttsVoiceName___zVYCH`,
	"ttsVoiceTag": `ttsPlayer-module__ttsVoiceTag___P2Bk6`,
	"ttsVoiceNote": `ttsPlayer-module__ttsVoiceNote___OF7P2`,
	"tts-speed-dropdown": `ttsPlayer-module__tts-speed-dropdown___i8xVO`,
	"ttsSpeedDropdown": `ttsPlayer-module__tts-speed-dropdown___i8xVO`,
	"tts-speed-btn": `ttsPlayer-module__tts-speed-btn___GBuhg`,
	"ttsSpeedBtn": `ttsPlayer-module__tts-speed-btn___GBuhg`,
	"tts-speed-label": `ttsPlayer-module__tts-speed-label___LWklY`,
	"ttsSpeedLabel": `ttsPlayer-module__tts-speed-label___LWklY`,
	"tts-speed-x": `ttsPlayer-module__tts-speed-x___UgVBO`,
	"ttsSpeedX": `ttsPlayer-module__tts-speed-x___UgVBO`,
	"tts-speed-dropdown-list-top": `ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ`,
	"ttsSpeedDropdownListTop": `ttsPlayer-module__tts-speed-dropdown-list-top___kdKXJ`,
	"tts-speed-dropdown-item": `ttsPlayer-module__tts-speed-dropdown-item___kyeD1`,
	"ttsSpeedDropdownItem": `ttsPlayer-module__tts-speed-dropdown-item___kyeD1`,
	"selected": `ttsPlayer-module__selected___IfIm6`,
	"tts-exit-btn": `ttsPlayer-module__tts-exit-btn___VQiqa`,
	"ttsExitBtn": `ttsPlayer-module__tts-exit-btn___VQiqa`,
	"tts-player-btn": `ttsPlayer-module__tts-player-btn___ii1fo`,
	"ttsPlayerBtn": `ttsPlayer-module__tts-player-btn___ii1fo`
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

/***/ "./src/content/ttsPlayer/ttsPlayer.module.scss":
/*!*****************************************************!*\
  !*** ./src/content/ttsPlayer/ttsPlayer.module.scss ***!
  \*****************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!./ttsPlayer.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/content/ttsPlayer/ttsPlayer.module.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


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

/***/ "./src/content/ttsPlayer/icons.js":
/*!****************************************!*\
  !*** ./src/content/ttsPlayer/icons.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoReadNextPageIcon: () => (/* binding */ AutoReadNextPageIcon),
/* harmony export */   MutedIcon: () => (/* binding */ MutedIcon),
/* harmony export */   NoRepeatIcon: () => (/* binding */ NoRepeatIcon),
/* harmony export */   PauseIcon: () => (/* binding */ PauseIcon),
/* harmony export */   PlayIcon: () => (/* binding */ PlayIcon),
/* harmony export */   ReadPageIcon: () => (/* binding */ ReadPageIcon),
/* harmony export */   RepeatIcon: () => (/* binding */ RepeatIcon),
/* harmony export */   VolumeIcon: () => (/* binding */ VolumeIcon)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");


const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);

const PlayIcon = () => html`
  <svg
    viewBox="0 0 48 48"
    width="2.5em"
    height="2.5em"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="16,10 40,24 16,38" />
  </svg>
`;

const PauseIcon = () => html`
  <svg
    viewBox="0 0 48 48"
    width="2.5em"
    height="2.5em"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="14" y="12" width="7" height="24" rx="2" />
    <rect x="27" y="12" width="7" height="24" rx="2" />
  </svg>
`;

const RepeatIcon = () => html`
  <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    version="1.1"
    id="svg822"
    inkscape:version="0.92.4 (f8dce91, 2019-08-02)"
    sodipodi:docname="repeat.svg"
  >
    <defs id="defs816" />
    <sodipodi:namedview
      id="base"
      pagecolor="#ffffff"
      bordercolor="#666666"
      borderopacity="1.0"
      inkscape:pageopacity="0.0"
      inkscape:pageshadow="2"
      inkscape:zoom="32"
      inkscape:cx="14.349319"
      inkscape:cy="19.133748"
      inkscape:document-units="px"
      inkscape:current-layer="layer1"
      showgrid="true"
      units="px"
      inkscape:window-width="1366"
      inkscape:window-height="713"
      inkscape:window-x="0"
      inkscape:window-y="0"
      inkscape:window-maximized="1"
      showguides="false"
    >
      <inkscape:grid type="xygrid" id="grid816" />
    </sodipodi:namedview>
    <metadata id="metadata819">
      <rdf:RDF>
        <cc:Work rdf:about="">
          <dc:format>image/svg+xml</dc:format>
          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title> </dc:title>
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <g
      inkscape:label="Layer 1"
      inkscape:groupmode="layer"
      id="layer1"
      transform="translate(0,-289.0625)"
    >
      <path
        style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#36b37e;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
        d="M 15 3 L 15 6 C 10.041282 6 6 10.04128 6 15 C 6 19.95872 10.041282 24 15 24 C 19.958718 24 24 19.95872 24 15 C 24 13.029943 23.355254 11.209156 22.275391 9.7246094 L 20.849609 11.150391 C 21.575382 12.253869 22 13.575008 22 15 C 22 18.87784 18.877838 22 15 22 C 11.122162 22 8 18.87784 8 15 C 8 11.12216 11.122162 8 15 8 L 15 11 L 20 7 L 15 3 z "
        transform="translate(0,289.0625)"
        id="path852"
      />
    </g>
  </svg>
`;

const NoRepeatIcon = () => html`
  <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    version="1.1"
    id="svg822"
    inkscape:version="0.92.4 (f8dce91, 2019-08-02)"
    sodipodi:docname="repeat.svg"
  >
    <defs id="defs816" />
    <sodipodi:namedview
      id="base"
      pagecolor="#ffffff"
      bordercolor="#666666"
      borderopacity="1.0"
      inkscape:pageopacity="0.0"
      inkscape:pageshadow="2"
      inkscape:zoom="32"
      inkscape:cx="14.349319"
      inkscape:cy="19.133748"
      inkscape:document-units="px"
      inkscape:current-layer="layer1"
      showgrid="true"
      units="px"
      inkscape:window-width="1366"
      inkscape:window-height="713"
      inkscape:window-x="0"
      inkscape:window-y="0"
      inkscape:window-maximized="1"
      showguides="false"
    >
      <inkscape:grid type="xygrid" id="grid816" />
    </sodipodi:namedview>
    <metadata id="metadata819">
      <rdf:RDF>
        <cc:Work rdf:about="">
          <dc:format>image/svg+xml</dc:format>
          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title> </dc:title>
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <g
      inkscape:label="Layer 1"
      inkscape:groupmode="layer"
      id="layer1"
      transform="translate(0,-289.0625)"
    >
      <path
        style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#888;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
        d="M 15 3 L 15 6 C 10.041282 6 6 10.04128 6 15 C 6 19.95872 10.041282 24 15 24 C 19.958718 24 24 19.95872 24 15 C 24 13.029943 23.355254 11.209156 22.275391 9.7246094 L 20.849609 11.150391 C 21.575382 12.253869 22 13.575008 22 15 C 22 18.87784 18.877838 22 15 22 C 11.122162 22 8 18.87784 8 15 C 8 11.12216 11.122162 8 15 8 L 15 11 L 20 7 L 15 3 z "
        transform="translate(0,289.0625)"
        id="path852"
      />
      <!-- Red slash for no-repeat -->
      <line
        x1="10"
        y1="314"
        x2="23"
        y2="296"
        stroke="#fa9a9aff"
        stroke-width="2.5"
        stroke-linecap="round"
        opacity="0.6"
      />
    </g>
  </svg>
`;

const VolumeIcon = () => html`
  <svg
    viewBox="0 0 48 48"
    width="2.5em"
    height="2.5em"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="12,18 20,18 28,10 28,38 20,30 12,30" />
    <path
      d="M34 18a6 6 0 010 12"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
    />
    <path
      d="M38 14a12 12 0 010 20"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
    />
  </svg>
`;

const MutedIcon = () => html`
  <svg
    viewBox="0 0 48 48"
    width="2.5em"
    height="2.5em"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="12,18 20,18 28,10 28,38 20,30 12,30" />
    <line
      x1="36"
      y1="16"
      x2="44"
      y2="32"
      stroke="currentColor"
      stroke-width="4"
    />
    <line
      x1="44"
      y1="16"
      x2="36"
      y2="32"
      stroke="currentColor"
      stroke-width="4"
    />
  </svg>
`;

const ReadPageIcon = () => html`
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>voice_fill</title>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g
        id="Media"
        transform="translate(-960.000000, -144.000000)"
        fill-rule="nonzero"
      >
        <g id="voice_fill" transform="translate(960.000000, 144.000000)">
          <path
            d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
            id="MingCute"
            fill-rule="nonzero"
          ></path>
          <path
            d="M12,2.5 C12.7796706,2.5 13.4204457,3.09488554 13.4931332,3.85553954 L13.5,4 L13.5,20 C13.5,20.8284 12.8284,21.5 12,21.5 C11.2203294,21.5 10.5795543,20.9050879 10.5068668,20.1444558 L10.5,20 L10.5,4 C10.5,3.17157 11.1716,2.5 12,2.5 Z M8,5.5 C8.82843,5.5 9.5,6.17157 9.5,7 L9.5,17 C9.5,17.8284 8.82843,18.5 8,18.5 C7.17157,18.5 6.5,17.8284 6.5,17 L6.5,7 C6.5,6.17157 7.17157,5.5 8,5.5 Z M16,5.5 C16.8284,5.5 17.5,6.17157 17.5,7 L17.5,17 C17.5,17.8284 16.8284,18.5 16,18.5 C15.1716,18.5 14.5,17.8284 14.5,17 L14.5,7 C14.5,6.17157 15.1716,5.5 16,5.5 Z M4,8.5 C4.82843,8.5 5.5,9.17157 5.5,10 L5.5,14 C5.5,14.8284 4.82843,15.5 4,15.5 C3.17157,15.5 2.5,14.8284 2.5,14 L2.5,10 C2.5,9.17157 3.17157,8.5 4,8.5 Z M20,8.5 C20.7796706,8.5 21.4204457,9.09488554 21.4931332,9.85553954 L21.5,10 L21.5,14 C21.5,14.8284 20.8284,15.5 20,15.5 C19.2203294,15.5 18.5795543,14.9050879 18.5068668,14.1444558 L18.5,14 L18.5,10 C18.5,9.17157 19.1716,8.5 20,8.5 Z"
            fill="#09244B"
          ></path>
        </g>
      </g>
    </g>
  </svg>
`;

const AutoReadNextPageIcon = () => html`
  <svg viewBox="-4 -4 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 10C14 9.44771 13.5523 9 13 9H12.5C9.46243 9 7 11.4624 7 14.5C7 17.5376 9.46243 20 12.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 12.0091 21.3441 9.90488 19.073 9.22823C18.5098 9.06042 18 9.52887 18 10.1166V10.1683C18 10.6659 18.3745 11.0735 18.8345 11.2634C20.1055 11.788 21 13.0395 21 14.5C21 16.433 19.433 18 17.5 18H12.5C10.567 18 9 16.433 9 14.5C9 12.567 10.567 11 12.5 11H13C13.5523 11 14 10.5523 14 10Z"
      fill="#6fcf97"
    />
    <path
      d="M11.5 4C14.5376 4 17 6.46243 17 9.5C17 12.5376 14.5376 15 11.5 15H11C10.4477 15 10 14.5523 10 14C10 13.4477 10.4477 13 11 13H11.5C13.433 13 15 11.433 15 9.5C15 7.567 13.433 6 11.5 6H6.5C4.567 6 3 7.567 3 9.5C3 10.9605 3.89451 12.212 5.16553 12.7366C5.62548 12.9264 6 13.3341 6 13.8317V13.8834C6 14.4711 5.49024 14.9396 4.92699 14.7718C2.65592 14.0951 1 11.9909 1 9.5C1 6.46243 3.46243 4 6.5 4H11.5Z"
      fill="#6fcf97"
    />
  </svg>
`;




/***/ }),

/***/ "./src/content/ttsPlayer/text2Audio.js":
/*!*********************************************!*\
  !*** ./src/content/ttsPlayer/text2Audio.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/utils.js");


const CACHE_KEY = "PNLReader-tts-cache";
const CACHE_LIMIT = 10;

function getCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (e) {
    console.warn("Failed to read TTS cache from localStorage:", e);
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
          "Storage quota exceeded when saving TTS cache, removing oldest cache item.",
          e
        );
        arr.shift();
      } else {
        console.error("Failed to save TTS cache to localStorage:", e);
        return;
      }
    }
  }
  // If we get here, nothing could be saved
  console.warn("Unable to save any cache due to storage quota limits.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (
  { text = "", lang = "en", voice = "Luna" },
  prefetch = false
) => {
  let speakResult;

  let cacheArr = getCache();

  // Find cached result
  const cachedSpeakResult = cacheArr.find(
    (item) => item.text === text && item.voice === voice
  );

  if (cachedSpeakResult) {
    // console.log(
    //   `${prefetch ? "[prefetch] " : "[speak]"}[from cache] Speaking text:`,
    //   text
    // );
    speakResult = cachedSpeakResult;
  } else {
    speakResult = await utils__WEBPACK_IMPORTED_MODULE_0__["default"].send("speak text", {
      text,
      lang,
      voice,
    });

    // console.log(
    //   `${prefetch ? "[prefetch] " : "[speak]"}[new] Speaking text:`,
    //   text,
    //   "lang:",
    //   lang,
    //   "voice:",
    //   voice,
    //   "result:",
    //   speakResult.audio ? "success" : "error"
    // );

    // Add to cache, keep only last CACHE_LIMIT items
    if (speakResult.audio) {
      cacheArr.push({ text, voice, audio: speakResult.audio });
      if (cacheArr.length > CACHE_LIMIT) {
        cacheArr.shift();
      }
      setCache(cacheArr);
    }
  }

  if (speakResult.audio) {
    if (prefetch) {
      return;
    }
    const uint8 = new Uint8Array(speakResult.audio);
    const blob = new Blob([uint8], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    return {
      url,
      trialsUsed: speakResult.trialsUsed,
      isProUser: speakResult.isProUser,
      trialsMaxAllowed: speakResult.trialsMaxAllowed,
    };
  } else {
    console.error("No audio received:", speakResult.error || "Unknown error");
    throw new Error(speakResult.error || "Unknown error");
  }
});


/***/ }),

/***/ "./src/content/ttsPlayer/ttsPlayer.js":
/*!********************************************!*\
  !*** ./src/content/ttsPlayer/ttsPlayer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _images_male_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/male.png */ "./src/images/male.png");
/* harmony import */ var _images_male_old_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/male-old.png */ "./src/images/male-old.png");
/* harmony import */ var _images_female_old_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../images/female-old.png */ "./src/images/female-old.png");
/* harmony import */ var _images_female_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../images/female.png */ "./src/images/female.png");
/* harmony import */ var _images_male_realistic_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../images/male-realistic.png */ "./src/images/male-realistic.png");
/* harmony import */ var _images_female_realistic_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../images/female-realistic.png */ "./src/images/female-realistic.png");
/* harmony import */ var _icons_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icons.js */ "./src/content/ttsPlayer/icons.js");
/* harmony import */ var _text2Audio_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./text2Audio.js */ "./src/content/ttsPlayer/text2Audio.js");
/* harmony import */ var _errorMessages_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../errorMessages.js */ "./src/content/errorMessages.js");
/* harmony import */ var _ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ttsPlayer.module.scss */ "./src/content/ttsPlayer/ttsPlayer.module.scss");
















const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);

const voices = [
  { name: "Luna", title: "Female Voice", icon: _images_female_png__WEBPACK_IMPORTED_MODULE_6__ },
  { name: "Owen", title: "Male Voice", icon: _images_male_png__WEBPACK_IMPORTED_MODULE_3__ },
  { name: "Mona", title: "Female Voice", icon: _images_female_old_png__WEBPACK_IMPORTED_MODULE_5__ },
  { name: "Bob", title: "Male Voice", icon: _images_male_old_png__WEBPACK_IMPORTED_MODULE_4__ },
  {
    name: "Lawrence",
    title: "Female Voice",
    icon: _images_female_realistic_png__WEBPACK_IMPORTED_MODULE_8__,
    realisticAI: true,
  },
  {
    name: "Vincent",
    title: "Male Voice",
    icon: _images_male_realistic_png__WEBPACK_IMPORTED_MODULE_7__,
    realisticAI: true,
  },
];

const speeds = [0.5, 0.8, 1, 1.2, 1.5, 2];

const TTSPlayer = ({
  text,
  nextParagraphText,
  lang,
  settings,
  saveSettings,
  exitVoiceMode,
  startTimestamp,
  readingWholePageTimestamp,
  nextPageLink,
  onAudioPlayEnded,
}) => {
  const {
    voice = "Luna",
    repeat = false,
    speed = 1,
    volume = 1,
    autoReadNextPage = false,
  } = settings || {};
  const audioRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const [isPlaying, setIsPlaying] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [showVolume, setShowVolume] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [prevVolume, setPrevVolume] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(volume);
  const [audioUrl, setAudioUrl] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [loading, setLoading] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [showVoiceDropdown, setShowVoiceDropdown] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [showSpeedDropdown, setShowSpeedDropdown] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [error, setError] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(null);

  const currentCharacter = voices.find((v) => v.name === voice) || voices[0];

  // Fetch audio URL when text changes, and only if volume > 0
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    let revokedUrl;
    setAudioUrl(null);
    setError(null);
    setShowVoiceDropdown(false);
    setShowSpeedDropdown(false);
    if (!text || volume === 0) {
      return;
    }
    setLoading(true);
    (0,_text2Audio_js__WEBPACK_IMPORTED_MODULE_10__["default"])({ text, lang, voice })
      .then((audioResult) => {
        setAudioUrl(audioResult.url);
        revokedUrl = audioResult.url;
        if (audioResult.isProUser === false) {
          setError({
            type: "in-trial",
            ...audioResult,
          });
        } else {
          setError(null);
        }
      })
      .catch((err) => {
        setAudioUrl(null);
        setError(err);
      })
      .finally(() => setLoading(false));
    return () => {
      if (revokedUrl) {
        URL.revokeObjectURL(revokedUrl);
      }
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioPlayEnded);
      }
    };
  }, [text, voice]);

  // Prefetch the audio for the next paragraph
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!nextParagraphText || volume === 0 || nextParagraphText === text) {
      return;
    }
    (0,_text2Audio_js__WEBPACK_IMPORTED_MODULE_10__["default"])({ text: nextParagraphText, lang, voice }, true);
  }, [nextParagraphText, voice]);

  // Repeat handler for <audio>
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set the loop property based on repeat and readingWholePageTimestamp
    audio.loop = !!repeat && !readingWholePageTimestamp;

    // // Restart playback when repeat is toggled on while paused:
    // if (repeat && audio.paused && audioUrl) {
    //   audio.currentTime = 0;
    //   audio.play().catch(() => {});
    // }
  }, [repeat, audioUrl]);

  // Restart the audio if startTimestamp changed, which means user re-triggered playing again
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setShowVoiceDropdown(false);
    setShowSpeedDropdown(false);
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime > 0) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [startTimestamp]);

  const setVoice = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (v) => saveSettings && saveSettings({ voice: v }),
    [saveSettings]
  );
  const setRepeat = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (r) => saveSettings && saveSettings({ repeat: r }),
    [saveSettings]
  );
  const setSpeed = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (s) => saveSettings && saveSettings({ speed: s }),
    [saveSettings]
  );
  const setVolume = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (v) => saveSettings && saveSettings({ volume: v }),
    [saveSettings]
  );
  const setAutoReadNextPage = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
    (v) => saveSettings && saveSettings({ autoReadNextPage: v }),
    [saveSettings]
  );

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  // Sync play/pause state
  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);

  const handleAudioPlayEnded = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    onAudioPlayEnded && onAudioPlayEnded({ text, voice, startTimestamp });
  }, [text, voice, startTimestamp, onAudioPlayEnded]);

  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.removeEventListener("ended", handleAudioPlayEnded);
    audio.addEventListener("ended", handleAudioPlayEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioPlayEnded);
    };
  }, [audioUrl, startTimestamp, handleAudioPlayEnded]);

  // Sync speed and volume
  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = speed;
      audio.volume = volume;
      // Auto play when loaded
      audio.play().catch((error) => {
        /* Auto-play might be blocked */
        console.error("Auto-play was prevented:", error);
      });
    }
  };

  const onAudioError = () => {
    const audio = audioRef.current;
    if (audio?.error) {
      if (
        audio.error.message.includes("Empty src attribute") ||
        audio.error.message.includes("MediaLoadInvalidURI")
      ) {
        // Ignore this error which happens when src is set to null
        return;
      }
      setError(audio.error);
    }
  };

  const handleVolumeBtnClick = () => {
    if (volume === 0) {
      setVolume(prevVolume || 1);
      if (audioRef.current) audioRef.current.volume = prevVolume || 1;
    } else {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const onVolumeChange = (e) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) audioRef.current.volume = Number(e.target.value);
  };

  const onExitClicked = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    exitVoiceMode && exitVoiceMode();
  };

  return html`
    <div>
      ${error && (0,_errorMessages_js__WEBPACK_IMPORTED_MODULE_11__["default"])(error)}
      <div class=${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBar}>
        <!-- 1. Voice/avatar selector -->
        <div class=${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceDropdown}>
          <details class="dropdown" open=${showVoiceDropdown}>
            <summary
              role="button"
              class=${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceAvatarBtn}
              aria-label="Select voice"
              onClick=${(e) => {
                e.preventDefault();
                setShowVoiceDropdown((v) => !v);
              }}
            >
              <img
                src=${currentCharacter.icon}
                alt=${currentCharacter.name}
                class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceAvatarRound}"
              />
            </summary>
            <ul class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceDropdownListTop}">
              ${voices.map(
                (v) => html`
                  <li>
                    <a
                      href="#"
                      class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceDropdownItem}"
                      title="Select ${v.title}${v.realisticAI
                        ? " (Realistic AI - Experimental, Slower)"
                        : ""}"
                      onClick=${(e) => {
                        e.preventDefault();
                        setVoice(v.name);
                        setShowVoiceDropdown(false);
                      }}
                    >
                      <img
                        src=${v.icon}
                        alt=${v.name}
                        class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceAvatar} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceAvatarRound}"
                      />
                      <div class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceInfo}">
                        <span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceName}">${v.name}</span>
                        ${v.realisticAI &&
                        html`
                          <span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceTag}">
                            🤖 Realistic AI
                          </span>
                          <span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVoiceNote}">
                            Experimental • Slower
                          </span>
                        `}
                      </div>
                    </a>
                  </li>
                `
              )}
            </ul>
          </details>
        </div>
        <!-- 2. Speed selector -->
        <div class=${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedDropdown}>
          <details class="dropdown" open=${showSpeedDropdown}>
            <summary
              role="button"
              class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBtn} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedBtn}"
              aria-label="Select speed"
              onClick=${(e) => {
                e.preventDefault();
                setShowSpeedDropdown((v) => !v);
              }}
            >
              <span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedLabel}">
                ${speed}<span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedX}">x</span>
              </span>
            </summary>
            <ul class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedDropdownListTop}">
              ${speeds.map(
                (s) => html`
                  <li>
                    <a
                      href="#"
                      class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedDropdownItem}${speed === s
                        ? ` ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].selected}`
                        : ""}"
                      onClick=${(e) => {
                        e.preventDefault();
                        setSpeed(s);
                        setShowSpeedDropdown(false);
                        if (audioRef.current) audioRef.current.playbackRate = s;
                      }}
                    >
                      ${s}<span class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsSpeedX}">x</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </details>
        </div>
        <!-- 3. Big play button -->
        <button
          class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayBtn} ${loading
            ? _ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsLoadingSpinner
            : isPlaying
            ? _ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].pause
            : _ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].play}"
          title=${isPlaying ? "Pause" : "Play"}
          onClick=${handlePlayPause}
          aria-label=${isPlaying ? "Pause" : "Play"}
          type="button"
          disabled=${loading || !audioUrl}
          data-error=${error && error.type !== "in-trial" ? "true" : "false"}
        >
          ${loading ? (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.PlayIcon)() : isPlaying ? (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.PauseIcon)() : (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.PlayIcon)()}
        </button>
        <!-- 4. Repeat button or Auto Read Next Page button -->
        ${readingWholePageTimestamp &&
        html`<button
          disabled=${!readingWholePageTimestamp || !nextPageLink}
          class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBtn} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsRepeatBtn}"
          title=${autoReadNextPage
            ? "Auto Turn & Read Next Page On"
            : "Auto Turn & Read Next Page Off"}
          aria-pressed=${autoReadNextPage}
          onClick=${() => setAutoReadNextPage(!autoReadNextPage)}
          type="button"
        >
          ${autoReadNextPage && readingWholePageTimestamp && nextPageLink
            ? (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.AutoReadNextPageIcon)()
            : (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.NoRepeatIcon)()}
        </button>`}
        ${!readingWholePageTimestamp &&
        html`<button
          disabled=${!!readingWholePageTimestamp}
          class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBtn} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsRepeatBtn}"
          title=${repeat ? "Repeat On" : "Repeat Off"}
          aria-pressed=${repeat}
          onClick=${() => setRepeat(!repeat)}
          type="button"
        >
          ${repeat && !readingWholePageTimestamp
            ? (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.RepeatIcon)()
            : (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.NoRepeatIcon)()}
        </button>`}
        <!-- 5. Volume button with hover vertical bar -->
        <div
          class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVolumeContainer}"
          onMouseEnter=${() => setShowVolume(true)}
          onMouseLeave=${() => setShowVolume(false)}
        >
          <button
            class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBtn} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVolumeBtn}"
            title="Volume"
            onClick=${handleVolumeBtnClick}
            aria-pressed=${volume === 0}
          >
            ${volume == 0 ? (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.MutedIcon)() : (0,_icons_js__WEBPACK_IMPORTED_MODULE_9__.VolumeIcon)()}
          </button>
          ${showVolume &&
          html`<input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value=${volume}
            onInput=${onVolumeChange}
            class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsVolumeSlider}"
          />`}
        </div>
        <audio
          ref=${audioRef}
          src=${audioUrl || ""}
          onPlay=${onPlay}
          onPause=${onPause}
          onLoadedMetadata=${onLoadedMetadata}
          onError=${onAudioError}
          style="display:none"
        />
        <button
          class="${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsPlayerBtn} ${_ttsPlayer_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].ttsExitBtn}"
          title="Exit Voice Mode"
          onClick=${onExitClicked}
        >
          ❌
        </button>
      </div>
    </div>
  `;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TTSPlayer);


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


/***/ }),

/***/ "./src/images/female-old.png":
/*!***********************************!*\
  !*** ./src/images/female-old.png ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/images/female-realistic.png":
/*!*****************************************!*\
  !*** ./src/images/female-realistic.png ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/images/female.png":
/*!*******************************!*\
  !*** ./src/images/female.png ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/images/male-old.png":
/*!*********************************!*\
  !*** ./src/images/male-old.png ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/images/male-realistic.png":
/*!***************************************!*\
  !*** ./src/images/male-realistic.png ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACACAYAAAAh4nqyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAIXrSURBVHhefP150GZZftcHfs5yl2d993xzr8zK2qu6eq1e1N3qTQgJAZKQIARjWQaMPSAMlsGzBNhREcN4IsYRjokZx8wwgWccOBhskJFBLEJCSGhBqKVeq7q69szKPd/12Z+7nXPmj9+5z/Nm28x98+az33uW7/ntv99RH/nUHwsBcM5RNxVlU1I0FVVV0HgHaY7ub2EG29DbgryLUwZflYTlGBYTQjEjNDU4B8ERvIfgCQTqjV38l/4wVz77aT5/eZ8XBh2GWtEpHLunJTv35pw/LdjpKdLdBNUx4AN+UlMeFZy+O+Nvff3f8PPj13C+wrsC1xQ0TUnTVDS+wXlHCD6erI4QAkqegAryCARAIW+BWr2GQFDyBXn9/+9QoAIBhVJyLwClFPGunGnK6g6PvxXfU/JfCAp0/K2SaxGvE5QmKEXQGtCglbxWBqUtIbGEj38O9ZUvcf7Zyzy70aNnNA+ahndHc+ZfexP/D/8h6s774BvwHhW8POLjTXwco4AKAe19QKEw2mBNgtUJqbby3Fi01mht0EqjUShAB48O8eJBhlaGRC6qQgA8ikDQmmA0BEUTFCGA9xCCx4RAZqHTNyRbKXYzxWxkmGGCGVhszxDSQOk9SimsUlhlSUyCNQkmtk8pHQdyPQEqxMFVMpbEiZO2yhEUBBUIBHlsP1DtZ+tzNZGoeN3w2OQrJe/HUYgAOXs+/r1V2xSgNEHJhMuX1teVe+sz919/rmJfQtsv58A5Cu+ZESgIOAUeZA5sAjqCTGlpo9IE5L3H7qNAe+9lhSmF0ZrEGKy2GG3RxmJsglYGjUarFhwBFbygK8jYq7jaZDWujxb9zjtq76mcp/Ee1wTwARsCOgGdK3SmsJlBJxqTKJTROB9wQcBhlCY1hlQbUmOxxmC0QSsDCEBWq63FRWyfPjMp6++1z+NonD1bsK1Ap1aD6GVtweq37epuv7/u+xoIkSooJROuFSgTJ4kVVRPMRKCps9dtfyNfCkoLFVFa+hoQKtAEaq+Yh8AUz0wFXAgEY8EmAsIWBJEatW1eLQIlfdWNb/BhDRCtNVYbEpNgTIpRBm0MKq5QE6mECQEdZJgIa6oRu7MeIED5QFM5itqzdI6y8TTOUzcNrvSExoML4BTBOfAO33hCHQg1OB8wKLQ2JNqQmWR1Gt22TaGUXk04cWBZzdV68Ns323lsAfLYGX/VjhcqoFRAKZms0FKJ+Jx47/b+LUjbi8g1IzCUUFAVQIW4/lvK04JH0BAnUsDYAnLVsPba7cpvHD4EgndUHpYo5kHhFSitIEnazqzu176U+7RURRG0QtdNReNqhIJIB1AKrTRGa4yxKGUi6Y6TEJSwD4jrqR2WM2dopyMQqoqyrJiXDbPSsagallVFWdRUi5pm0dAsHG7WEKY1Ydbg5w2UAd8IxaEFrjFkNiW3CamRM9FG2EsLjPW4EcJZUr9aoGdG999+nJ1fGdAWfO1YRP7/2Ai0v40Ia0ER7//4KK1/sfr++gKriRSQr1+fmdH4eQSo9/JTWWdUWuGMEmAYC0kibdZCOVr2cpadrKicUuiqKamamtpFwQ7hD0ohckYceOHtcoHIwkVwe5xQQGycakl63aAWS8rZgpPZkqNFzfGi5nRRM5oXTGYFxaTCjWvCqMKNHG7kCTMPhcfVjiZ4UGC0whpLaiyZzchsSmpSYS9n5I7Vyo0D/hg4zo5vHNz2d2sq8Ph12mutPv+3HI99X94AJSu3nQhZUlF6U+vvPMZCWvZx5porMDw2mS17kOuEKO8pINHQUZAB2mh0kkCarvqxutxjbEZu2t5PN3VFXVfUTU3tamon2oYKAo6VsKelkdKtSDWC+l+QNWKvAjIddQnTMdVkytFkzr3pgvuzJfenS+5PFxyMJsxOStyoJkyEcjCvCUuHL2qqsmEZKgIKrcAYTZJY8iQhNympFeHZaBvbG5vRtmc1YetVHtB4ohAYBTKURnoXqcCZiWvB8m87FKyuc/YkyKmCRgW5slZKqKkGrxVetwKl/EbF3wWEtK9YTNuP1T2ljTLRIf7OoRDCMLCac8awaQ3WGlRiIc1in8/0awUSAV6I46SURtd1wfqsaZqGxjtc8HF8hXqgFFop9IpXtsRUhroFyKrxSoBjqyXJ8QHq6JjxyYS7pzNujxbcHM15dzTh1ukJo8MZ1UlFM2nw8xq/aHCLgFs4JkXJqS8iRdMYbbE2IbUpWZKSmJTUGIzRqAjg9v7tMLbn2ZXdnise20pLj63yM+djA/o9p34cPGe1HK8gaPlOSx2+F2wyMW17Hhds5bPVN9ftaidyRTFFtlMR4l1gQ8GmgsxqSDQhzQjaRFCtf9/KGivwxfvrui6p64KqWVLXYjuoG2ExApCWUwoziQJ3PCIoENDolpVIN4CAdg41OoTDB1SHhxwfnPDg6JT7x6fcPDrgnZNDDk/GLMYl9ayhmTmamadZNjSF52Q547RZ4IkCs9FYIwBJbEJqExJjsVo0l5ZMivC27jxqxQzhccjIM61lEtvXj01US8bbz85eIJLpVuxoB+jMhLeH0NuzR3sROdbgieyvBWykbOt+rduo4iTLbwMhyOmDaJUpYFFgDKRJbN+aesjCkOvJvdu+gva+oW4qqrqkbgqqusQ1FY2vcN6L2nZmpUnb1Rm6LZJnawOJfZPn8Q2znGEO7qMf3MM/eMji4SMmjx5xdHTE/eMDJos5TS22mVAFQgmhgqaC46KgCI0MrRKybLQAJLH2jOpthLLFAROQtO2N7fqe1y3s46yuhbWomUmvzgib8dpnJz4umSgMi1ot31lP8llq0FKq9h5yn7Y9UXOJj6plT/He7Tyswdf+Mr4OgeA9jQuMfWCKogK8EhZFIqrsio3Gvqyv+fhi0oGA9zXO1dRNSdOU1K6kaUSD8SEifgWQ2O9ANHitQfG9hw5yT+Mb7OSE7NEdsvt3Se/dw95/QHj4ADc9RQHGKMRc085pgOBpgsNpmVilFCoKxyaq3EIxNEZFoXml1sbJi4/mDLC00ajIhrQCHdmRqITxREDS8n2l9UqmsShSrbFKkaWGzY5hf6PD3iBjs5uSJdFqGbUC6dDjE7ASkFuQrr7WgrUFSXuN7xlcZEygnZOorXiHDzAPMEIxQ+EU0habgjGrvspNz7AXfabvSqOV0kKKGpE3alfRNA3ONfjQAGKabpsr/0f5P4jpdd1NQHmUavEeRTylsK7BzCckxw/IH94he3gPe3JIz8NmJydJNDbRGCNna/nMjcW2nV8BRKGMAqMwOp5Go1rq4T2hKaGcE4oxmZvT9Qu6bsmGbthQDbsJXOhlnB9m7PVSNnNLxygS32BdjfEO4wPG1eiqwJRzdDEhq6b0VcleEtjWDRu+Zi9NGHjPUDkud3I+tL/P9d1tUmNA2fUEtrwCYQGrQwnl0UGGdyUHncXJClwRFLpVYRFhVinwQjmUb2mizA5Kg1WoLAVtVqxDhE8RFOU6cYyjtqS1ssK3QiD4Bu8a8WH4huDDY76KVdfOCp6tgHqmH6p9P8oJQm41NigSV2PqAtsUGOcYqIQNkyKEI4Dzckb/TOSEcQHGFdQ+RpAorfCuYTk9ZTl6RDm6hxs/IsxPUNWMYnbKYjaiKWaU8wm+nLOYjpgcHVBPJ3RwDJSj0yzJ6wVpMSMpxuj5IYwPUfNjVDEhV47cakJdcHp8xGI+Jbia5XxKWc6oywKra3q24OmtnJcv7JEnskBkjjxGBxKjQZu14KsUPp7rgT7Dglr5J8ofsrrlmuHsb3xAeZE5LJCrQBIpptKaYA0YjYqiAloEU1SUuSLoWuBotRLiEKdZcAKSVhiNk7Em1ZFKrHworbEjztcZ9RYVOagyaG0wgGlVOkDhSZQiCQbfeOrCURcN1bLBFQ1V7Zk3DWEFMlkFQWm8CqAMLsBofMLR4R3qxQhfzFHOYdp2OllJvnGUVc18seRkMmVZin3nZHzMnbu3uHf/NqPRMcvljKpeUBYzmnKJx6GswdoE3zgWsxnz2ZIm2oUWywWjyYiT8QiNp64LDo9OuPvgHkk558XdbbZzw7WtDV68cJ6PX77Mi/vnub6zR2IToYKCnDgpcXkpFUcpAiGylxVFiZPYLhpRZT3By9wkPpCEQE4gaZmINQLKaDB8jIJEEMopLEavhK/YqJW9YkUyIu8OUSOJpvIoiQgIVpSjfU/JL88y03gP6YgYbAIQvKNsaupFTTmrqKY11aymnNeMZgtuFic0uNX9ggo0QNlY7jy8xWvf/Sp3775JOT/F1wUmypTBy/edd9FrG2gahw+exFiCc5RVSdM0+BDE7BwCwXlc04iHl4DSIjDWdUVVldRVBZHCNnXNcrmkaRo6WUbd1Nx7dMBoMefh4THv3fmA2dEDLuaWXl0SZhOWk1N8tWA+PqVjheW0i6iVR1bCcLtoz0zcSs6If+3IgwLvMHUDIVB7qBswTpH4gFUij2GS9UKL91xdM7KToAVwWgSeaABqZzryPoioXJ0RLFEYbYlG/OrqWMMqdky36NQRVnJ6AgduzvvLU45mS+aTitm4ZDoqOB4tee3oIW8sHtLQoFQgGPDKMFnO+eabv8V7996mbgqxtSgxNAXncbVQG+fcqjEumpatsXjvaJwAYNUYxFPsvYvPAzpSVZG/PE3TxGs1oAJNUxMIaGNo6pqjkxOstRwdHzFbzihdzaPRMXfu3+Xh8SPGsxE+NFTzCak1lEVBlmSIF76VAdSKrrZHCwJZ7WfmIc7dipoE8CqwEeB6MDwVDC94w/NesR1tRJhoJW2F8Dgvch2Zr3a+TXfzwqsEJ5pCpBZaKbS2mLSDzrvYrIfJcoxJUCiRR+oKmgLVlOBkZdI64qLWgSLq1zk67aCtOPJMCCjnCc5RO4kbMcHgXaAsaw4Xc147fci/PH6T95sTShXQicEmKeVywtvvfZO6XGCNpi7nMozBQ3D4pkFb04YloJVMtEKEVtHOBACENfiFkongTZAJxxiC92gUoRF1GqEnqwlLrEWjWC6XGKOoqpq68XjnaeoGWUMKrQKDbk4/77KsS4xO6PU32MwTPvPkNa6d32dzo8fJdIYLZ/ChIj1u4zgUKyq8oiRagzKQd+k9/RQfvXSBl7o5141hn8Cmh6QIHB6PWNx6HxazFnePL+W4wFolwnQ2L7wagnhCibwdBBw67WAiOGyay4ABwdX4pkTVJbgK5SXQRmZEPLxyT4UyFpV0UGkHbTLx04SA8h7lHY2vGTVTDqoJ96ox7ywO+fr0Nl+d3uSD5pi5cmDBJAmuKbl5+zvk/S3c4oR6MRdQSIAI3ruVKhu8RxsRtNvJFiORR6toWzhD8oRSCEhk0LX0CaGOwXsRfCPQtIn3AVzj8N5jraYoanz7u1Z0CLDR77G7sc3B0SHjyYRyuYBqyoV+SqYaTo4OmRyOeOLSRR7N5jgihVCIsLiiGi2L1oRWXtQi4NLJ2X/uOT52YZ+nBzn7maFvoBPAVp7j8ZxH779PmI1kYcS+teKAjIr0X+J3Vsh5/FDRC7pyvLXmc4KYzls3fRxh6UeMIFoZDOO7ZyTylp20xvlAYE7FzeaY31ve5LcW7/GN4i53w5S59pAotE1w3nP/0U06+YBidB9XLEVdDZ4QKZ8K0ubgHFpIhqjhutXGxHsRonzRts9HQLTCHK0M4CVmxUeHpI8gRFhzvAY0TR0plMg4K7IVqVSWirPw4eEBj44PmC1nLIoZm52MTAUeHZxy//CE48WMD27e4nx/ACrIeLWsRsWbtpQuIi9EyhKUsJmeMmyiGSjFQMFAKzasZifR7GUpJs2/B2Rnrr0CoIgZWvqx8q/HiRY5QQAhK0QUoMflDfldBEeQ37UD3j5rO0C7ypTCgZztAGiLM4bGGFxiCXmKyTNMlmF0inMNhw/eoZ4cMTu4STMb4VwjfNo1MlHOCzB8G2Miq73tUWi1q2hFJJqbCWJ5VbACCeos62lZ5fpQKvYugiAEJ5QkKILyURKPvwmQZxnHp6fMlgsa5/DesTnoYY3hnTsPePfBQ0bzORZN2ThCXYqXWct6blmfTGhcki1Zie/JspU+GgIGj1FglSJVilxrOtZi02QNCunMihKtgLEiBKuOR4rQLoszX2zPlhpIs+T7q8d4L0HE+rm0XRoQtMZpRaN0BEk0I2uLSRLSLCfPOuRZhyzNSE0KwXFw9y2K0/u4xRiaEoKLtnaxhbR9CAS8k6gxOQJK6aiWC61aASDOnwBEqMCq7UGohmZNHeT9FjzStxDZqVIBa+x6DFZfD2RZSuMcjXPMlwsg0O3kdLKUo9NTlNHs7wzZ7OeU1ZxullJWFbm10XPcmhlb4h+vHYXR1UJUoLwiNAHnon2qZR3xW0YpTIwGa4VPoUw6xuyYqJiIZqNbqnFmrUePwuNIalFLBIawFRmwx3DRLpgVxuRmAS2GnvhZQK0oh9IaFUMSbZKS2pTUZlhjOD69R1NOUM5J+xTimg4SZghiGZR7y0SFENam+NgfsU7K+y37a13c637EnkSK40PszP9s1pHrR2uwUtHGQLTz0BKPQCfvUBYF6IBzNdZaUpsymy1w3rM96PPEuX0+ceMGL12/ivcNOoBpW6aisBlJvbwX5REiO2ypMx7vGwkL9AKnEJT0VwXxP1kxn68oEiv0gGrtSVEpWQ1OOzAtUFqhRMdH1TKW1XUixTgzGBHbawrUNnwdPLt2RAWCUjil8FqMM5hE7P9JjrIZ48Upy+UYfCtXxOhkH68RJ68VIkNABjHGZiptRJgzGmUNyhiUsXEVRorWUg0iFWmvJx/ImKxHZ3W0gq4CYWeRCglhUUDAJgneiwrcNA1KQZqmlHXNdLlgtlxQ1BXv3HqPe3c/oFtVPLu3hQo1Pi7OllLJwjhzxjl6rGEh4J3DRcu2W3VBvqe1Qpu1bUXY/RkK1LKTNsirve467C++btlJ/JGK0qyOjWjploBiLYC2yGtJSCtNB9UGr4hOHn+NV5rSaKZZh6P+Fg939nl46QoPL13k7ugh9XxEaKpo/XMCDiUWvlUbjZiFtTFobVExrrRV/zQiD4hOL4HLGGnTiirG9stjBIqKMkoEH/G7K2X2zO9Xgdpafk2UNVpQOOewNoEQKMuC2jXkSYrRmtPJlAejEwKB3BdcG3bJxKH0WLuI5nJpdzvnLVjkts411N7ReAksdtEj4SNFM8Y+DrIIkHZsUAqFaEGRcrRrKbah7XRUlSQEjxW5aKmE/K2PFTWJcsAaJNIh8R3EOypwRlOmGePNXQ5eeI7TL38S98e+wPAnv0j6wiXcYiTtRYRDIY+tGhrVN2NXziSR3KNa7SPbiaDybT5N1Eikj208JcIe2ta1g01sf6Qgq3fPdFoGUQRe5xzWWGFdOgrEIcSVrNBB470IpInRDAZ9ZtMpG/0enU6X48mYNOmQNDX7SRqpdQRJXFDS1jOAWDeE4MW+UvuAC0qAEcSzTtTktBGBVC4p144kINpRhHooYS3xJt+7ilpNJcJHiagiLEPF+KgzaQnxEvFsryOoFDTKdQMiZ3hjaZKU2d4+y4+9zPD7PsZLH3meL1x7ghd3dzl64zuimtbCg88Kno+tFiIIPJGixbfb1Y+8/5gssAJOfK2i3LMagzN9aJ/He34vgNpmhHh7FR+11mKhVSraVuRaTeNQChJrKRcFVdOwXCxZLOaUruFwdEJR12wZxWaaPO72V8S7y9GCZAWWCNIQXRMyV/JEaUiMxiZnc1fWDrjH5j/2Wbe3k06tZ/ls/GgrnLT5Ki1LaU9ZddKgx2hJvAkqZmopAUswGpeklJtb1M88xe7Lz/HhJy7xsZ0Nnh1k3Lv1PtN33yZUc4ISM7eOE7M62jZ4L8JhDCtYfXy2HdG2EhBZBxXZaJBv6oBALhobtdYYExO5tHitJfajXVHtXEiWWghRow/C64WaGHzrXfZi+wl4fPBYmxBcwOMpqpIKibAfz8Tk3uv1WCwmvLh/DskHi8E6EaQrFhB7fHbp+TZAK4T4iXzVaCQQO5MI9NZTK9eKUXCrOZcElCgmtqtg/SgDIgPUgla1skUcWGFHYihqP4+XELDRguIs+mPn8pxmZ4/ek1e5fn6HZ/odnswtQ6PIao87uIdyDVpMElEAlGuDXDLQZqnJhK8Aodphib+LHZBVFTHdHkEarVUbS2Kw1sqZWKw1GKsxRsmjFZnFA9rY1fWNEsdViH4ezrAarRQmWmiVEvLuI7k3xtLJcvqdLvvbOxR1zXQxp9frc/zgLlf6ndWKXlGI2GwRKOPiIw5+kHH3BJoQYuSDOE4TrciSFGUTlDLCakQiW1PG1VzptUDaHu0ES2OiStMiMMjqOPvYyheEKLfEVSgXWze+PeW+BrKcsL3F5rktrnZzLqYJ20ZzOpnx9V/55/jZeCVryBp4vJEyJ+2ARW0oTpCsrjMDioDlsQFWAhgZE0WSWLIsJc/XZ5Yl5Jklzy15mpInlm6W0csTupmlk1pSq+iklsQaIduR6iixegMeY+MCUwpjLMEHbOv/QbMoG05nC07GE566cp0QPBu9jGVQZI3HxuCn2NiVjaJt/woo8TA62jSUkvZoibTLjKGTZWRZTtdm9G1O1qa8rmQNAS/iko3CY4hhfe2aiwE6LUjikEcC/bjVUK0MMqv2rp63JDh2TciXMSiTovp9dnoddjPLhoWuUUzqmu3dPVRTRT09srEg7AvlZXB01Pu1OMho1WFtwVohmVrUV+GJa34gABF1FyWajbGWNM9J8w5p1iHLOnTzDp28Qy/P6Xcyht2cYSdjq5uz2+9wbthlf9jj3KDDTi9jq9ehl6dkqSGxitQaEmvIrMS42pjCqZXG6ARtxBho8z50+pzUjq+9+SZX989jdWBrOOC4aHCNixJfa5tobR7rEL9WUNcEkhgZl2pILKRGkVnNIEvY72/w0vYVPtG/zEd7l3ihu89eMiTTFhtNF2gFJkGrVqiMpEHscYK62Jw15SAg1uE2TzaqdO3vV0uxRce6Qy1cFJH8Go3OEoZpxlBbulHNHRdLbv/ub8bAIwGgCLFtoGwEhDaQJGhjUcaCsUIurWgvwdgImjPf10aolpLwfGGdAhAiGzU2xaYZSTTGZYlEuKfWktmEzCbk1tJNEjaylL1+j0ubQ67tbHBjb4PrO0P2Bx02uxkbecp2N2OrmzHsJPTSlE5i6XVz8jwn6W6QbZ3DKw1Jjt2+wLK/xbdvfkBdlewPhyyBoCRnWLSxKN+cWYJCSeRVcA6DxMxGjR2rA6lW9BPD1e6AT21e49O9J/l05zqvZNd4Mb/EMB1gtWQ3oi0+76AjnYhXjsLa95LmiEghFnEVR+Yt1Eaen6XWIBQntKh+jG+KgGesJTeaXIORC+EdNMsC5SXWogWIUkom11gxaKUpOk1RSYJKEkx8VDaRbPJITcTmsT7RccSMEXuHlrZE4nTmWCv36z7JYwgxJVQZrFJ0bcJ2r8/lzU2eu7jHy1fP89TeFheGffb7fZ7Y2+bicIPtfo+tfp+NwZDOcBuX92lsBzPYwNUNTmlcPmCeZByNjwmLsbgK2oGNUp6MoTRMPlovSu893geCV3ixFArRxJMZzW7W4cnBOZ7q7PFM9zzPdi/yXOcCF7NtrEkkhsUYOhubPOaVXcNkTX5Va0aFyH7OWvrbERUKcjbhaTWgSgmgznSQaPdQiSHRGhtlm0Rr9od90iw9o7qKsCs6uEHZBJ1mmDyPAMkwaYZKsxUwBEByEh+VjZTEtJbSCBAdBzWEVcTYSmxadfwMOiKKnHc452VFA6k1dNOUrf6AK9u7fOT6VT757DU+9ewT/ODHX+InvvQKn3j2ChuDLZLeNkvbp9IWpw3O5qisQ8dYQpJRJV3mi5rjw3vsDnrrRQVieT4zP21T28M7T+WcVDJYCaSgUFit2Egz9joDtvMeO2mPc3mfS90t9rINUpOJid0Y+tvba1UWBIErQES9v2UpbTC9aCpRdWzzVc6mRSINUd9zvZZChfgdp0EbtY5vjN8o5jOR6s90WQEYhUoTVJ5jOl10lmOyHJVmkqyTWMkHTSzaCqtp2U2wcgpQBDxiPItURGk8gdqFaEAKOKT0g2g464y+FXmJBqbKOYpGXPqJ1fQ6ORvDATvDDa6dv8DLzz/LRz/8YT7x8of5ke/7LGa4wdT2qdMu/eEOSdahUhaVd8hUIFOakHZYVI75fMJ2mqzn54w6ux6c+DwuQlfX1M6LhdSLhdTHOTIocqNIU02epHRtQi9J2Uo7DJIuiUkl1tcYer1hK5Cuo7wJsoohSq9nTOPat06rs2gVIVFsDZEFPPa/QmHkWRD+KDmikm/SGtGEo3ku7+7Q1OKGFzuESOJKW5EF8g4qywQYNsWkGTrJMSYDm6BNIvJGEsEQWU170oLESP0RZRKCkaBbj4oWRVF5xcApTiwfTeMyJi0bksyysmkoK0fjIbEJibV0ux2yvMPG9g7D3R16/R4X93f48HNPM0v6zHXKcVXhTYI3msakVFUl6Qza4LUmTVOWs5nIRHEkFZwpBbEa5jheCucqqtpRNo3UQnEhmtJlfkQhEMFTGUkKS42hY63Mh9YoI5qXbtnA6oj8oE30WQujcdX4GMUVhdLvNXoJI4iNPUP64hugxJ/ilFicWl26daoHBbrTi67kuCC0lklOM3SSYbMOJhFgqCTKFzY61ayFNCUkOSHJxJGXZpDIo1AaeR2SVDLP01ReG0kX8K0RldZ5JYFArU0jKggro1gIgdp5yrrGB2hqR5pmJEkSbSYJSadLpz/giy/dICiPU4FSaebe47ShUhqnDf1EhGOnDB7LsqrjOES2HAX3s2xltVKDRKUt6oZp7ZnVnnkdKCrPsvaUjafyHqFzMrMajcWQ60TcJPEvOIcW3r6+voK1u56zdo7WVxJb0fpPIMofcf4haj1yNUXsVCxFIPkZkRpEAIhBSBCepAnp1maEnMBMWSuBP3mOSTK0SVBJKuxDGfE0rjSWFJXmEpaYDVDdAXSGhO6Q0OnjuwN8Z0DoDVH9TehtQn+L0N8kdIa4NCdg23UgQUk+4H0bCdZqxa3VVLLvZJkomsZFm4Q4AhWagMckFtvp8OSlczyx1cVhcErTKC3BTlpeb+Wp1ETRhkVV486orasRboGyOtboaOqGybLgdFEyWtaMioqTZcVpUTKal8yWBWVd44TfgBczWKIMllYEEAdeFLlk/QswW3P52igi7VjLGisz+xm6Eb+y0l7ETL023KiocgkDEgqhohXRRxLeeOimlstPPxVtEkI1sBadpBibCsUwCUZZlIoe2KiGKmPRNsV2BqQXr7D7iY9x/vs+z6Xv+z6ufub7uPbZz3H9c5/n+he+wLUvfpmrX/4yl3/gK5z/wR/gQz/z03S+9AXK4QaNFlCI91goiQuB2nuxOsZOKzSoIKmWiFbgXIMxwrdb0ztKLJZKQ5ZYnr64F0cvRsZF87i1hp6FVGtSo6nRlFoqHKzltrP2Dlm4IFZrQqBZlhyNxjwcTXk0KXg4LXg4KXgwWnJ3PONwOmc2r2jqNsdFfmujOKFUS4Fq0VbWAGg7HcFxxsYh8YRr2SREzfYsfttD2FQ7uQIOcfLI5yEOvFIK7xW1h9JD5UF7z/nrN/BJIt/RCpOm2CzHZhkmScQ13xpsVFRxtVANOj3SSxf5yT/77/HSp7+PF154jqeff4Ybzz/Nteee5uozT3HlyetceuIKF5+4wuVrV3niyRvkg03QKYbo3m9bGoEQEC9n5cXrKQCJ5nii/BGDhDp5hrWGNEtRSuGcVE1qc2mu7QxwRBalFMRErZ2NDXAOVTcoH1hkA6ZYuQGyeltWrds5ahcxoLynmY05ePiAmw+O+OBwzAfHM24eT7l5NOHm4Sn3j06ZHC1xZZBAuihWtHSp/d85hxkOd1+N/RQgGI1NMpKsj806pGmGiRZHvCDKNUUsLdms3NJCRc5myenI0zv4NMfbDGfEy6i0xnW75BfPc2Fnk608IY9peh7Pg9GM7/7KP8OUBdommG6PtNfHJrloGrEPbSVE4YIaleb0Lp3nB3/0R/nn/+yXePPXfpXb3/h9bn/zW9z+1re49c3XuP2Nb3Hrm9/kg298g3vf/BYPXv8OD7/5LQ6+9nW49T62mGO8WwVStywzihsQfTiC++iQjIX2cmsZdjr0ewM2NjfIOzlpntHpdMAHMatreDRe8itv340ToWTwlSKtCmxTs2jAzUeM+7t4bUFHehH9XBJfqrEtHYmrLoSAdw2lh3nTsKhqZsuSo/GUR0enPHx0QHlwxBOzjPNk5FqBChTUPGomvFcesfQFXimyXh/dqqGtYKiUWDB160xaqZoyQqLKfq+NI9o24jXayROBKTZ8NbBR+NQGj6JsAsvGs3SBwgUKH0h6fZEhlEZZi01TjE0kbyaq2VrFbHktXkRjc9IL5/nij/4ov/yLv8j4tW+jpiPcYoFbLmgWC8JyQSgWqKrENjVpU5KWc7JyTlJOsdUC42MClYr5pau2r/tCUDQuUDkn6q/zLJuaRVWyrCtC8GRpQqfTIcuzFR8P0Y4y7OaI2NBSDrERBe+pfCANJcsspzGJ5NeuqASkSmGV4WqS84fPXeGnL9zgBzbPcc5YLApdVIRH95m+/w7vv/Edvv3at/nOd17jnTde59HbbzJ9eA9XLyU4KYI+IADXKgq7MVOwdeesJ/SMULLWVFqARNYSr6oi55CVFPnX6lLxl2cGQHh49Mxos1IDF7VnEQFSNkRrZnSVW4ktNVZItG7dzW37tBJZ5MI5vvwjP8y//IV/wOztN1DlglCXUFcEV4vpNeYBK1dhQoPVCsNa+2J1TQFdUDHKTGu0lfhL8Y9YjDG4oKicp6gdRR2YFQ2T+ZKqLjFWk3VysixDKyVJTlWDVppOamV8WoBE9p1nOUZD1TTMO5tx/GUhtI40pS1P533+2kc+y1975fv5y698H3/tk5/jP3ruI1y2llSBKpZweJ/m1lsUb77G7LvfYvHed2gO7kKxoA6SPiGyY1zccWxpeYBzQjDWE9qeglKZ2PheQDSUKPi0Drv24uvnAqQWGCF2vpVD2nsFrWlCYNE0zCJAZo1j4QL9fo+Q50LBbFuwLtZFNTa2K3oSbYo5v88XfuSH+bVf/CdM330bypLgmthEAW47AFJl2ZN2Mkx0HgjQJCyuddiRJKioCqskQ6cpJpHCuMaKFzdJNMoomiBq7KJpGM2XnE6mlFVNp9fFpiIjEQJ1WeGdp5dl6LZsQmRPKCXaSemYaYs3aRx7YbcKMS/0tOJPvfBhPv3kNXYvbrJzYZMrV8/xI888x49cuUGiFRaPDgHd1KhqiSmW6KpEO48LjoYqBk87ggox+FqMZCEqHt414ttUrEHwuJayFkiJgstZ28b6f3kmpFdexf6u4LAC2Bl7hneBonHMaifAaDzLxtPt9Ojs7ECsqqyNDLCKpG9lawF0f8BXfuQP81v/5JeZvfMGqixQzkWnoI+SVuuRjQM82IjZ/rGfbS0xbVYBziHtQj5AZT2wGc5BUTbMipLJsmJe1VQOfNBokxK0oVGwbByj6ZyDg0Nc3dDp9TBK4kFcXeObhovbA7ZyuwZsXIy51UyVpky6cU7OzENkpdt5ziuXLzHc7ZDv5OS7Od29LluXhnz66lV6SgxZjwmq8UQpPI6GhiDhdXFeFSYYDHolKnjniWGCrVQul1k3rJ1goRSB1oUu+r443+KNH9PEz/7J6xVbasEVwDWeZe1YNg3z2rFsHGUjgtv2E9cl2Rci9Yi1Rr2HxQI/n+GKJa6G3/ilf87kja/jS8nbjWasiAmhMkpbVACbJOvYhwjetr861rAINgVlKJZzpqNjRkcHnJ4cMxqNGE2mjKZTjsZTDsZzjucF08pReS22C2CyLDk4PObe3TsUZYVzEhTtfIPWmmE34+n9bfGAoiEKmdQNpzqJaY4yajq2q3XL5zpho5+RDzOyYY4dpKTDlM5mxt5mn0wnaAwy1S3ohZZrotCKxymHb1esioJt/B4BaLMG18iKHtlVBvaKGKzYSSuQtpLMYzJLS0Diy8dQe+Z3rVrnmoaiblg2a2A0weGAc089F723sjIVkFYlyeSUdDkmmZ+iTg8o3nudk6/9a1jMMU2F8u4MPEVY1dpK/IYPUq6blte3FE5aHFAoF/BlQTE+phyfUC2mNFWJa2q8awi+wTlHVVUslwtG0ykPT065czzig+MJ92clR2XDyXzBvTv3OLp3l8npIcvplOnphLqssEbzxM5A7tuySDzOpJRGwLuOyJJT6wheJf4gm1lMajCZQWUGnVnSVCo6n6X8Krr52/7qM3Ym4SZinxGZZm0/8S4KpOsV3w7r+kvt0U5wy0VaNa99/dj32sbEEwVaRSNa+4Mg4CgbR9GIlF6HgAsGFQIXn3xKSiZpiWfsE1DHR0we3GF2fEC9nKOamryaYeYjtKsxrpGi/VGDkdgNGdBW85DMNGEpJgpgtF3wDl8taRYzdLkgCY5MG7LEivaRp/S7XbaGfc7vbHBxZ4NhnuB9xbKYMZqOuXNwxOu37/OtDx7y9u17vP/mW5w8OuDk8JCD+w+4+c5NlrM5T+4MBfha2pH5gFMJKq74oADdCseRsiFxHWXjpL0R2C1VDoSVhimgk9kQzhVfBzHorYSDyBkMYLQW1q/AOS+qbDul8iyahaMopBEDWIirvi1yIutM2E3byBWZiR0TUqhiLEhcqb6lIA6cxzlP7cV8rhSiPQTFuStXCL0BIcY+qvGIk/s3qRZTfPDUdUVZLNBak6UWowLKi7HZaBNN0K0QKywJwtrZJ2gXcc9LcoevG0JVoVyFCjJgWims0lIDPsZVJkozSHIubOzw1IWLnBsM6GQJiVY4V7MoFjw4PuLRyQn37j9gPp1x+OgRdx8e8Pqb7/Gbv/s6ae1J0xhGgGYjF/dAG1+iIhtRSoKTBOyKBijqmqZptxARS6dvJGZ0FQHXAiQaCtv+Qoi17qMjLs6kwWCVVFGQN6O2sprQOGhy4TNkAJEvzhaIa5/L986QjjNH+5HYUlqWJAAR4iFg83ESYpcgwHCwweD60wTX0NEwe3gH5Tw2z0m7PbRScY+YBmuSuJOCJommZ23Myg6Ckvu3fLVVC1cLIIByHpqK0FSoaODzztHUNUVZsiwKZouC0XzOg/GYdx4+4Lv37vDtmzc5mkwgSHR3mhhSa9AqMJ0vKWtHYi3T6ZL3Hp7wC7//Tf6r//4X+Lu//KskJoOkK3KQzpj4ECldFL5birGiwhI44YIIjN4FgmtTEQJWi49EsQaFzOaaP7SWXE/Ar1JHZXEnMdhY1nwblX+GarRUoGUrLVtYzVqrzhLD8FtC0VIS1S7LiNb4exUkuz1EHZsgnq0QvbsKxLEfG69QXHr5YzSuxvqALwqMsSTdnoT2B1GbHQFtbey+ioFDkBiD8mdqlEW+qlaUo+2j5OAYHCZ4DA4dpLCMa0S7cE4CZ4JWBG3QGHr9TT720oskicUBVe2oa0/jxJNbO0/ReLIsoT8Y8vBkxM1Hh5zOp1Sqpr+7QXLlCfTWHj7vMPawjMnmIm8IO2zlj5Yyty4F4Yhn39MkVkpvyrhHYaF1IZ+hAw1SjlIovxwWoZAKJa4S76UOaUtu5P6ttzEOXutnaAVSwd8KA2eNX4/JLrGBipZqeIx3Z9z9XjSPqJaepSTOBxrvuPzSy9QqwbaYSy1pr4u2Gt3JSHs9krSDr+tIYsVPZLQisSYWmamgqUW9FUv7qp0tuZVFIEk/mTHkqSZPhAIZq7BWk6aWTpbSTVJ63Zz93U1euHqZbmJJtEW1qRJBvLiVDzTBM9zcoNaWf/K1b3FvOuLi5gZ/5oe+wo/89H/AS3/wB+k//zxNb4O5UvhI5cQlL5FvtFX+ooAalMJrhU40KrGolkpaTZIYbCwq8zgwBEQreSJWHGhP4sIySkvtNxTa+TXlkN9HlLYC6do8sAIEK5khrvgzUevxMmtyrbS8jnuzaN+egszgGkLTEJwjeIfzcaMeL/ux7F69ht7YxeExSmPTFGstygWUV5TFkuXpEc1yKTIMIuuI3KGlHmlZEOoSXxeyP4yXDH0BR9txMR9bY+gkln6WMuhkDLsZgzyT1AMtVGmQJ9zY2uCje9sksxOeu3iOQTcly9I4F7KoAppF7Tk6mfHocMzdRUVh+7z26IR/+sYD9I2neOX6JZ559gZquIGL7n0JiI6scHWu5Y6gFE0QUiiLWaG09McasCYCQR5k7pTMjcyGwuFj0ke7WGIaQ5SpdADjPFLqVEW+pFpHkjRIq4BSHqmkEe0bwpDiTWO225mbC8luqUY0WgWhDsY3JE2DqWts1aCqmqaqKetGIpcaT90EqkYCU1SSce6FlykbhzGGpNOFsqJYzFlOp/hSipw0vqFpHLbTwSTRguocVkOoSgFItJqq1pQerbko4WdGSX6H1prUWHpZxkYnZ7ubs9XLGeQpmVVYAlVTM13OOJ7M6NqEfpaiVWta17J6tWbZeN65/xBTN/zBj3ycD11/lhsf+zgXP/859jc3udLNubq9QbIxkDBIEz3MqgVJy/pkprWSuJHai9NRitN4ghddpdV8WlTEX6KURxNwSuRFCfaRhU2kmlppEoxErgdZwGtGFOULcWTJc2LD9Io1iNVRABVft9+VS6yvpiINR7QVE5yomr7GNAWmmMFiTrMoWCwrZsuaWdWwqBtRbetA03jOv/gR5lWDyjsYm9AsS5qyRIWwirRqakfjAr3hBqrVrr0Eq3hXg6txVYFqGqFWq9jQNauUCgCxdIMSDambWoadjL1+h6vbfZ47v8NTF3e4ujdkZ3NAb9inO+jJkgie1Jq4xYewg4rA/fGMt27e5A984iNcvnadn/yz/zE/++f/PNeHPbYSxWbMlRFf0plxX1Hw9XyoyN1L5yQybeXNaMUCyayTeVtTDSXhW+ioIrsIEKLxywBJEGFWQn8QE/waGvJF4b+tCqpWQovMuwykjkLcChRtQ1a/P3PqSLq8xzhHUlck5RI7n6FnE9x0xmK6YDJfMlmWTMuaeVmzrBrqumH72nWmRYXpDsAHGi8V+kxMWQwE0FqeO4crK0ItoQRaiznYNw00TZRB2rOJJR0EJG0t0lZecCGgNfQSy2aestfrcX4w4OrGJs9eusQT+/sMsjyWtUTyWtKENDGSkxqpx6R2vH94QD/X/Pif+FF+4IuvsJlqUhNIjaJjFTZJV84+1Blz/kqdXcuAoHDeR7onlqz1WGuJ/YyqcCThcW6icSqIL8ivpk4oiEGRKLu6TyufRYOWEvKilWz4p2TNtygUAIhGIohcUa/HWEvbULmOOLN01ERs8BhXk1QFdjElGY+xozHFZMpoMmM0KxgtSyZlxbysKKuGznAT3R1QJSmhbjBWOmDagTQGYw3Oe6rlUvwXviGENn5CEZrWFiDFZcXSWQtYvCPEOl21d1ReWFrZeOpGUg+stnSShE6a0OtkpImkNM6LgkVZorUS66SJ++GtItoVVYAHkxnv37nD3jCnn6ckKmC1IlGaVGtMEmtmRFayEkJjUf6WvbQD7gko29Z/lyL/xEiyNNpNVtRDCQDkiQQdNTGiLUS8EGUXG/fwMzEvRyuZ0TjZglRx2og9QDRf0TZW6QktP4sCq6jUEgbXAkWuIxZ+q8AqSIInC57E1+TLKdnkGHN6BCfHFKMRk8mM6bRgNi+ZLytmZUETNP0r1xiXJd5oEhRZJyeoIHuvZNEppxTlfI6i5cUhenO1CGxacjp83IkK51ZA8a4R4DQBF0FR1o6icpSN1PPSKBJjSIzse1sUBcuioHFOZJWVUhyXzyqQGsaN5607Dxl/cEuqCQMWUa2TaBYn+pE4o67K7J6Z6EiifQix5nurjAjVMFra2NLwdlWvlneQzYHq4CVlISAsNs6paSnUSlBdrfw29H7t1ZNJbsmEXF0UoyAAivIvyEWlnfG51qtqdpKWFyQ1TynSEMjqJZ3pKdnpAcnhIfXREcXJKcvxhOV0znI+p1rUVMuSvaeeY7GcEfIuVSVpC3mS0+sNGW7s0uv2UcFTLmdorWIlQFkWNpV6FEZLW4OTuA0f5L+WaoilUYDjQ0PlZRfLsm4oqoZFVdE0IuM77yirkrKqcM6hMEjhA7l2aAvVRC2jDorbJ6e8+drrVLPpij0YFctOKw06ifnJcrarf03BowyClj3vWvU+qpsKYSepiXXhV6AQoIYIOvDURJkrGsJAUls1IpivWItcOqIvTqqsttbwImBQ0UGzkjciUM5ebMVSVAxQiWg2SmOVJtGS4ZZqQ4YiqxZ0pidkp4ckR0dwdERzckozmuAmc9x0QTNbsn31SdAZs7oi2diU/eiqkrqspEqwg8SmZFmOaxyuKleWvyRJIpmXtrlGZASicIcSJ+DKDB08wXmp5eU9VeMo6oZ5WTFdlowXBZNFwWxZUtSNJEHFa63tg1K3Q6y/ikYZToqat958k/Hb7xCUwqhGVqcS63Arq7WTqqKw2L6/NoQJW3Der7LZiMJ1gJUhqwVgpBlroCCUp83PWR1RxpT6APJN3V6oZSXitIoN0hG5UW6IFCx+98zZCrORd62vF0sBnNk4JzGWxFgybeiEQLdckM/G5KMT7PExnB4TRqf40ZgwnuHHCzLdo7e7T1VVhE6X3vY+WX+A7XTQWUptJe+jagJVWVEXJa6RuucmsRJsE/m3a9lKHJD2aFcSrf/IB1xMKay8Z1HVTIuC8WzO6XTOtChZ1DVl09DEiRIXjaQxBB89nzFBqQxw6/CQ9776O1BWEOJCi3KeLEYZP1mQcT6QORBtRNoswIjBzaFFucxPEq/Tsrb4o0g15PDBr7ZoO0tjWtrUHloaEtnBKg8j+h7OgELYSStfRHlkBQSkFNQZYJgINKNF0LFahKVMGzKbkCYJaZKSKcirBdlygpmNsaenmNEpZjxBTcYwmeCXJbuXrohxzBhU3iVJO9gko8FgXvks+qOvUGcdgjErF7sLsa2xZntQkpzkojYjFs04wi3/bT2Wq1waYryoZ15VTIqC0XLBeLlkvChYVmJj8cHHQm0uUnKRvXRi0YnFKcV0WXHzu99h8u67MqcyL+hV7GYcP4RSROFDpm+lfCicj0Bpecvqc6HQAjC5g4r3kG/LE4+nRhZP2waFIlEGo5WwGUCrmHdhW5++bn374iFdTTzyqKIgJShrkb2mNqtVcMYdLezEkJqELEnIkzSeCR1rybUnq5fkyzHJfIyZjdCzU5ieoqYT9GzG3vkrKLREnHc6hDynaioWZc1y6VhMl9RYAobGVbi6iub06GuIhCKEIDtSNXGzobNUIw5he4Qg1KPxjsZJYNKsqplVFeNFwXRRUdRizW0iG9LWYpOUTq/PcDAkSxIIUDeOeVNzPBpz8Pq3YlVEVuy3VQbahdo+EuU+JYhDIakOqGiN1axUYJTUPkEbvJG0z6BlWat2EFpZA79GjQAB27KViCidGBj2DOe3M85vJGykIg9IiWQxfZuwljmi1vRYw5TQxujqFy1FBFKJELcxdD8zcT/YJBXVMMnI04zcpuQxmMcuZ5jFDL2YomZTmE5QkxHDfIg2Ft80UvG428N0eiTaM3/7OzSnp9jgqcu52A1Q4rMRxrnqMEoE1qapaJoqCq9nk2pay6Goky5ICmEZs9erpqaoHMta1N4m1uBysdRkG7HmG0cxn1JMxpTTCYv5lOPJlNtHR0BDqEqZHhWDmFu2HCesXWwClFbYl0lsfAM+5utKoyMVUaRpB9PfJNnYQw93oL9BSPNY5EXGIKgQI8FCFKJFhhTlIRaxVaC3hpaXrg35/g+d449+5jI//n0X+OxzXS73FUmoMUHiMQ1eAkJatqGj/0JFzUQLHZHPosbTnkaoR2YtHZvSTVO6aUY3TekkKR2bkBtDBqRNhS2XmGKBKub4YoabT0g8DAZD6WA072MtqbVs+ZL+YkTm5qSZoTPcIOl0CZGSySHkUsUaFngJopV6FiL9t0cgZru1+bK+TUaWYVRakVhNnoqjy+gYoOMacI66KphNx4xOT5hNx5TFQvbQqxtmZcVxWRAyqfUl4xWrD8UV3v6t5by48iPrKV1bg6NN+pZTG8XW5hY7+9fY3H+CwbknyHevoLb2CVlHvLyRajhcFFXifVESXii6sYzdxe2cDz+1zSsv7fOZj13my5+9xo9/5Ul+4kvn+eRTHYZphcJhQkAroSa2pQqRJAprEcC0mk6rDusoc6Qt5bAJnSSlm2R000yq3aQZXZvStYauho5vSOsKU5foukDVBbquGQ43xVCEUKwQV10aarJmIQXRsg5Z3iUfDLBJ3JUoqrGyuGRVBB9wcU8U72Iy1ve4A2RdKRE0o9HIBzHo9bJEfC6ZpZtoOolsU1Ys5sxnU+azKa6uRbbxjiTRPPn0RX7wT/xRPvyjP7Haz61dbNKp1eKOXGINFJk8+UK9iuGQVrYue5Mk7G9vcnVvn4s759jfPsfO1h79rX3McAeMlXxlRNBe5wBLHQ/ltQQZK+mz+cGPP/XqJ1+6yJPX99m/eI6Nczts7myyt93n3GZKxwRm05KiEnOzbC8hOpQCqdMVG9+6lnUsjWCTRDLMtQTj5EaTKZGoZf/5uPebEmeVjSUBEmNJtCbTsdq/1nSUoSxnTBZTkkTC9sVG0eCcBOeA+BZMlpHlXdmXzTXURYlvYrY6kSS0YIiyxeo4MzFh9TxqFK3qrhWJ0bGwRDuJUhkwRBZjYnzFpZ0hf/Czr/Bn/tc/y8/81f89z3zi87g0wwVY1p6H84pv3nnA6e0PsJWLJjS5Xqs9tPc0SpMozYu723z8qUuk3USsq0Z+Udeeg8owyXukeU6Wphhr8UFRuhK/nJHg6ZkOT9ht9pT4hZyH0jWcujn3qmOmzQKvQF/e7nDl/IDdvU16Wxvkww3SzS1653a4fG2HT354jx/+1C6ff7HD8xcte11DpvxKspVTvJmtzUMEWpGcLbL/aqLlFAqS0LUpvSShlyT0k3R1DtKUQZowTBM2EsuGMWwYzUDBbmcgPhQhHtEHocVpFYuxBFpTfmuziZFR8XVbiEVsHMK3vfc4J3vBtT4WH8SYJaQ41u4AmgCVDyyqhkXVxFUssoDRKoJcAL/XH/DlD3+cJzd3OXfjWZq0S4GjcoGiCSwaz6SqqcpqnVQVwMTU1PZcEX619rvoxMSYDoWK25GbzLIxyLm43ePCRo/zwz7n+gN2+gO6nT7GZgQ0LnjmvmTWNMxrz7xumLuGwslGQi0lMz/15Zdefe7ZfQY7O6T9TXQ+wKQdSeQxBpsohj3Fpe2MJy8MeOpCh82+pawqitoRgl6b1GWJSRZ8kmKTFJskpMaSak3WGsCUPFoTbR9aAmZyIzLJRpKzmXTYSTqcS7rsJV32khzlHe/PDiPtFatT8D460WLwUACtDTaV8tDee+pSNukTShHD4BS0TsUQhIq0FKTVvnRL8iMrQomG6KN/ovZQuxiHEiTwt3SOpmlIrOH5SxdoiiV1E9h97iN09vcpmkDReKa159Gi4o1HE1579x3qhwfYmGV2FhjCnqM2ERfbC3tbvPLcVZJuug6FROFqx0kN07irltUSMFw2ntliRjk+Rjc1qTH0TcpW6BF8YBkapn7BoR/zsDmlpMJrMH/qKy+9euP6Obob29juBjrtQZIRtI2DJKbvNDH0epatjZRrF4Y8c3mLc5sJrqlZVo4mKImc1rKzkk2kIp+xosZmERyZ0uRRe0m0CKqpMnRswkaSsZ/2uZRvcLWzyZOdbW50d7jW2+Ryb4BTnt8/urUON/SSthe8E1e8FxOlDypm42t840UraRzBrXdtkvkWMKj4TOyZcrQTIpsARkEUFQU6qL1nXlYsaid+mMazqKSajtWK7V7OZ156kaIomC0Ldp79EPnFq8ybwLh0PFp43jqe8tX3b/Po3fcwo7HEUUQzgeTHtn4uYWtiFlA8s7PFp565SpInInAr6VNdNhyXcGoSkWQB5wKLumE8nbI8PcA0JakW52CmJBNv6UtGYcYjd8pxmOMMssj/5Jeff/Xq1T3yjW10PoC0g9JS4VZInQM82liSLCXt5uSDDltbfS5fGPLs5S0ubeekylNWnsqD0iJrWGsxJiExZylGexpyJYE1qbZ0bcpW2mWvM+Rid4ur/S2ubGxyYXOL/c0N9jY2mLiSX731HZyrV7Go7U4KwcnmPOJ2kChso42YwcsCV4nZXCZaoKAjWxGARGUgZu6vSPgqKktUQQ9U3jEvoq9FvFfUTlILs9Rybjjk8sYm5zp9PvvJj/PsMzeoN3bQ569wXDTcm1W8cTjj996/x80338Q/eEBSVStKpYNQL2HRQsUkUkui0Z7c3OBTT18hycVDDWLcK4uGg6XnOGgaFI0X+8psWXE6HrOI4MiUJmhoVE2laqZhwQETjvyMyniJONMK8ye+//lXL1/eozPYROc9VJKDSqOBrUb5GkKQHNFUanTaPMdmKWknpdfP2dvq8uTFDZ66OGB7mOFcTdnomBaQrFzTAg6pGpjEVWCVxlqhHIO0y17W53xnyH5/k83hJv1Bl+6gQzbIuXVywL94/1s4X6+cZMJdJPxPbNhRNY2RUd47mqrGNbKhcsuOTFxtIB5biCWtIgsJCHtSSuSWlqS4EKhrUYE7qaGXJhLyoBVZYulaSxYUxWzO3YcPqJc1k9GUaW+HjWde5OG84a3TGb9/6y63vvsG/vYdbLEQO1IEqWnN5qvSUmuLs1WKKxtDPnXjKmka3fUoghNwPJzUPAqaOkapF3XDZFFyMpmwGB+h6lJkIq0JKlBQMWPJPJR4LRQDpfFyb7W20xMltdB6keI+9tE9btIU2+liO31st0/a2yDf3GSwt8nelV2ef+E8P/KFG/y5H32Zf+eLV/j4tQ7nOo5MOywOHcPVJNpbyLlWgvDXTo745sPb3JuMUNqSpTk20dhUYRJJqD5ZTCUWo6lxTS0Z80G27VpNapQ2XVVSl0WM3YjsJgqeAgWhiCpaTYlWwtURBdWzhw+S36ID9FPDZqdLVdfigKsb6mXFfLrgdDRlvKhY1vDeB/d4584Ddp94gk6qJXSRwKKoKCcjTDkXg2M0NopT80wKSKRwrfaCUrIbduPiFK02VJHYXh9lljMyk42Kg1wnCrhxrLwOBAs6UTGYWqoxYqzIHOcv7JAPNzF5F0wug+QbgitxVSGToFTMBUlj+WiLMqkUVzEGm1qSvEOn12Ow0eXC+QHPXdnk+vkew1Q2q3EuYILEZKwShVC8cXLIz7/7Lb5683V++Tu/zT957bf57tFdqsazM9ih281RxvBL3/wdvv7wXZqmki3VnWzDFWQmRfeP1EN5JxX0AN9ImsFKxlgJtFEybd3fcRLiF0QDi7EiKxAFTzcxnBt2cE3DyWxO1UgbUmPZ7nS5vrvHc+f3efGJy5w7v8Wy3+cP/dk/R56nNCFQBDhZVhw/fICdTKINScSE1u7Rnu2kGrU2Nl4Z9PnsM9fIuynatga0QFU7RjWM01y2JkdsIvOyZjSdMhsfQ7UkNVEJaDWr1vyutZTmNBIJb/7dP/jyq+cv7NAZbmDzPspmIni5El8tcMWcUFdRFVSSRaZSoK15FfmztZg0w6Q5NklJspQsTxn2Ei7udLl6rsPuVoYyAVeLMNiSzDfHh7wzPqGpSxpXMqnmvPHoff7RG7/D3/6NX+R33nqDYlnza+98g3uTA5oY6hecUDat1EpzCV5KLARkh8dWE/ERPG3Ajw+SG6NAwLSiPnEnyTgZq/4FccYlWrPTS0m1pmgcGCMOxMTSSVN2eh2u72zz4uUrfOzlF3nxxZe48qU/wNVnnyHIrSgcHCxLHt65C6ejqLq2PqsYKxMF0Fb2UPG10ZqrG30+9/x18l6CSoxEhKFo6sDEKUY2AR3LVDWBRVkzms6ZnB6hijmp0iRtMLSOyWRKryoyYg3KWnSW2VjVP4q3QAiO0JS4ck41n1JNZzTLBa4q8E74fVtqUimpBGxMik0ybJZjOh1st0/S75ANewx2e1y+us3HXjrPD372Kl/+/D5PPdOnO5C8hsJ7QppKHbA0jUVlDUHDSJX88s2v8hf//n/JL73xW5yeHFMt5jRlQVNJsLGrRS5Ssp/iikIQkHhR34hhNcgKV5EyrNhMfN2aoYlUZD0eYvsgSBZYUTZMlxXee4lTUUEMexo8jqX3nDYNdw7HHI3H7O2fRyvINfQSxTDV9HKDsRZWWnL8i1RKnbVxtACNlE0pKXzfRoOhY4qLUSRGkZogaQoy31gTjXZarqhh5UwVO5FsomysJc0yslyszFpiH1PQVqKvQyCEBtcsKWYTJkennDwaMT6eUE7nNMUSXy/wrsR5icFcmRK1QWu5nk1SkrRD2umQ9Xrkgy69rQE7F7d48tl9PvPpS3z+s/vceKrDzM3FAxhriqrWmKU9ykihl6AU3gWWyyWj0YjpdEpVltRVFWWL2I44wCJSirDaajTicSZaVcXbGs7IIq2M0fqEWoCoGJ+hgiQqzauGZd3QONm7VQRrkReWdcnN44f882/9Lr/01V/n/smplIpWQv0TDbk1dG2CsW2ZBPlMQKHRYV0+QQARUzYJaNqNDmMAaCxYCwqlxcNuWpd7FGDtys8lYCSCTEASnafGSu3UPCXPc/JOju7kKTqN9cJb3uPA147FZMHtD4554zuPeP/tAw7vj5iPxhSTMdVsgivnhLqApozUJOJdaVGFzXoXAtvpYHpdkl6HfNBhuDvg6rVdXnxpi7IpUa5G1aWE7ilaSWL1OrSjG+uYlnXDdDqjmC+pCgFJaI1csAqxb9mGmPtl75I0SbBaEqjb4J+zFOPsKS0RIbetRdp4L9WBvQi0qdX0UsvuIOf85gDwZHnO809dZ/+lF9k8t7cSEk2MEM9j9LwmJoW1Qd4RLG0/pFHrdkGMhfWScL7yECI5yaGtL4qkgrb1xFpt5zGK2MaRaClrZbOULMtIs5Q0y9DdboZJUykWv4pnbLegUMyWBTfvHfH6W/d5++1H3Lt5yOG9Q0YHx8xOTilmY+piLoKrKwm+keyzNgFKEUmWWE11IoXsbZaS9jKC0Syrimp0hFpMUa5ZC0erXrRhKiK1tSbkgKKoKmbTGcv5QhxdoU3ujl+PZPusFqYIGGtIU4vWEllFdMqtz5adyNZbQb4gMsmqkJxMYTexbPc7XNrZoJuk1FXNdqfLhf2LPPPpz8fVL8DVMbi4TfZW0eh1pslyxCcCl/WbKoYJ+kYSqWnzV6LG6RqHi1HzqxTRVVxOC7+IqfYeCpQx6EQSsxIrp04zuy4lqaR5SomFsb8x5MZTF3jlw5d4/vo2nVTz8O4R3/32bd56/TZ33r7P4a0DpgenFNMpdTGnqQu8qyQ9IAqHbQtUFPK0Nhht0TZhvChkJ+VlgapKVCUeWFlJ8QhBMvPj5MSltKYkBOaLObPZjMadiXCKh6wWETTbQ0iqJk1kIEKQ/V9b9iLqfRxwL9HaAbEDGCV5Mqk1pKmh38nYG/bY3xqy0U148doFvvCZj/DkR19m58plhElKSkEr1+jocpCutIBcx820VE8ez7IYsbU4L7GzLSgI8lyGKKqtWhamvJb+rsauHZs4Pm0UoIredKM02lrROKQJrXQjBqy002X73A7Xnr7I0y9d4unnz3Pl2h7dTs74ZM6tdx/y5nfu8d53H3DwwQGTgxPKyYhmOceXC3y1JDRl3FpcPI7rVimU8tw7mkgIgJUgFFwNTS2/OdMBEBYjZ5unewYwCpZlyXgyparlt23H2xW37ufZgY8Cm5XNeJva0TSepnbUtYQAOieOuDacv41mT21CZlIsiuAVdem4vLfHh556ho9/5BX2rj4ppQ6C+F5qL2cT3eSRsMbVHP9iX6R90nPNGREjsrkVLW0pI0JRrTFkibAuUVVj/G7crqv9/hl8QFw4beikR+EU6BDzJ8XviExgkOgobSxZN6O7PWS4t8Pm+V3OX9vn6Rcv8tyzF7h6dZutzRwIjE9mHN495PjeI6bHJywnpxSzCfViTl0V4jJ3DfgaQkMIDuUD79w+xGlFN+/GPFElMoKL1AKi/OEhNKtE6JbPtkPVBlk655hMpxRFKVxE+n5m9Z0dkmgwitbIxIrkXjcNtatlL9rgJTwmUo/GSxXjyoXoXXUsasdkUXA8nuEDbAwGLJYl77x/h1nlWThJkioaL2U1y5p50RAaMc6FaIxr2xSnXf4pgYNQlfYbEtgjVWpFzW2lS2sldqYNuFLtjk1RW2nvIn2XI0QAO++pQ6AMjkVw6LJwuCbGaXjJBMM3MpFBfCo275D0+iT9IZ2tLTYv7HHu2j6Xnz7PjRcv89RLV7ny9EX6wz7LWcnBnUMe3nrE8b0jpkcnlNOJFHerlvimwDclIbKe128e4OuavNMDmxC0jWyktWxGeeDMSo89imLEWv0UaIuQNV8umS0LXARYK6e0gUhr+iGUR6sYzhg38vNeam5UkXpU8SybhrKWnN5F7ZlWjknVMCsbitrx6HjC+7duc+vdd/jmN7/N3dMZ4yIwKhpOFw1H84aH05rDkwn1cr6qUKDO1Fdrs81aSiEAiT2M/iABe2RJes1KVmGccTyUisa8Mzab0PLdKLtKiIII2EXTUKUJF597Ej06XFDP5/iylKKusbqNnDWBKKyYFGNzkqxL0h3Q2RzS29mid26XwflzDC+cZ++JC5y7skfeTVlOl5w+OGV8OGY5nlPOp5SLCfViRlOKzWQ8mvPBwQSbWhxKfJGt8Ok9umlQ8cRL9bsQ94eTTXRWa0wOLYJsQKrjlHXDbLGkaQGi1hFs4uqOA8yaPJuofWSpxII6HysVe0ftHLUTqlE6z7x2LOrAuGgYlzWny5Lj2ZzxcskH9x7w8HTEifMcFw0PZzV3xjW3jhe8df+Y9+/cw52MVtZRpYSKrShc1DLavonBUL73mLtDnRkBJQI3URCVUEIBUlusvwWaYGP9vwtQ+0C6NeTFT7zE5z70DPrdWxMOHp6ymIyo5mOa5QRXiHBZFwW+rsFFO7+WbbC0TdBpgs1ykryD7fRIOj3S/oDu1iY753fZv7zN3oUNehs9jNW4uqGazyknY6rplGY25dtvfsCjwnNaOKbLQrSCdkGjolu+Pb2UZop+hBDpZbtPm/ymJTEt79Y0QTNblFS1FG9pUxATFWM/28j5OCmt2TrVmm5iyZNYTywofND4AHWAKmiWPjBvHIvaMypqTpcVh7Mld49HvH3vgHF/m2UFo8Jxd1rxxsGIr996wLfffIuTd99FT2ZratFSgQiI9j1a8EaJUK1Er7VwGyL/9D7QVA3LyrEsHUXpWJY1ZSWmBtOOSysYE6kvQkFUr8vTLz7LS09c4PpWB3Pl/LVXu8aQa4PCE+qKermgWiyoi1IcOaqtsZWAimWUgpMaHjZD247seqQUGIU2CpsZ0m5GOuiR9nrYNEN5JYarRYGrHf+PX36Hr92ZUNQV9XIOrhJZxEWnWGglwHi2QmiIK6SlCO3/cTUp1jpsu1LqRvJJOokEMxsjg83ZyTjzpxUkCjKr6VpLJ02wwyGu06PxGh2kfGX08+IDNIRVjstJ2ucP/8Wf49z+ORofOC0cbx2M+M5bbzO+9T5mdEzi3KoonUbsEq09pAWKXkX0txF2sk/bF557kk63zeYT51tTNhyMKm6WMCoD07JmvCwYzRacjMdMTk+o52NJ4IihmmIAM3ir2b52mQ+9cIPrW132coNpLn301dlS05QOX3iKxYJiUjAbL1lMS7xzMpCxsAghxk44L+5sk6B0FidCS0ypRiKR0kzklU4Xk4ttwxqLcw1vfzDnv/mN24xnc+rllFAsVjXKZdWI7CBTt5bsiSbs9vlaj2tZh4AhoiQ+Cj1unGTfD/MOncyQJbK7o9YSTKM10YMZQwwSQz+1nBv0ePHKJf7Dn/2P+Et/5a/yxLPP8bCYczJdxFuLLOO8Amsp8gGf+RM/xQ/+gS+Tm4BFUXmp1XH73ffQR4fYWPlwrbLKxKszbnqlIjBWzjdhicM05YvPX6PTTeOGP2LBrUvHvcMpr40KjsuaybJkPFtwOp0xGo+Yj45xy8UqnNG0hX+NJSQpl248wQvXLrA/zNnILGb6kz/76v3+OT5Y5Nw9VTw8qnlwWHHv0YLDo4VsSRWlIxV8rHFRisCqQRsxJEG70aS4+hXR+JWkaJuitWy8q2yCsZZX/+//mK9963XK0SH1coSv4zWjmkoMotEyWjF4eUVjIwURIa7lvwKYeNKCdT3QBC2F7Jua/eGQ88Ocfp7QSRKZnJilniWabmLY7OZc2Nrg+v4eL734Aj/2p/99Ll/Y4SMvPcuP/tAf4hOf/zy9q1c4DYYq7UC/y+b1p/ixn/kZfvInfoxhakjjpAYVGFcNNz+4Szg+iaWwRANZG6jaLp4BR1wg4q0VCjJME7703HW63RRjI0v14OqGD+6f8Dt3DjmqasaLgtF0zmg6YTY6oZmcol0Vd80Wj7OOTrZgEy49eZVnruyz003oJwaz+Zf/+qvdK1cpL17l4eY+bzHgtYnmjeOGO8c1k5nDVRBqCFWFq0p8WUnInYph/5GPiYpaR6EoGmSMlQrEbQlEAsXM8Tu/c5PxFKzN8MrglMxycGdkjOjrCFGrb++3gkKkDBEvLYFfEYz2s1ZwbT+ofWC0XLK/scETOxv08gyFWByNVqQxnrWfJFzY2mR/Z5uXv/BlXvjYx8SXgqJnNU+c3+EzL7/MZ7/4JT71xS/zyhd/kD/xY3+Ez33kJfq5IVHi/FIogofTwvHmzdu4wyPxvsbMdhWBoVvgr+SfNbi1jimoGjbThK+8cINudNm3i8LXjrv3j/ntN9/jeLZgvJgxnY5ZjE9pxkdQLEg0WB1N98bIHr1GcoAuPHGJpy/vstWx9KzCvPIf//VXr2wOOb+1yebuJvm5c7gL+0x39nmYDXh/aXn/xPHgsObktGY+rlksJNimjTUIBEKQYijB1bJRjxeQCE9LpdfBMT6t+Bv/xd/nW28/RDvPSblgGm0KioBOEnGPxzoUwUXpW4nWtLJGRXIqWImzvjKzx9GCNeFu8aGl2k8T4HAyYXdryJXNAVprqqqOK1mSllJr2Oh02D+3y/f/xJ9iuDOM5gSZTIMoTXma0MkzOt2czV5KP9PkWoJstBJZqHJwVDR8+90PqB8dSrzoys5C9CavBdKVq34lJLcJY4qNNOXLLzxJd5BJBLpWQMA3nocHI77+3h3miynFdEw9HePnI3S1xOr17pViFLMS7aYNITHsXdrnqYvn2OhYulZjfuiv/PVXr/ZzLnYzznUytrsdtvs9hpsDsr1d/P55jjb2eJ8e750G3n+w4MGDJZORw1cB7RqoS5qyoilLSfOrakJdgXdoo8QbiOLRnQn/5//j/8DDR3PK2vPufMw01HEHBC85niqI6z5JwUqFIUk4jFFYSQpa0+l2JMrLuRjfKVRJYBEHulV9VJviuKYiIQSaoHk0mnFpd4eNLKEopXSDUaLN9JKMrWGXFz7zeT72pS9hW1tJzBluMSdTI9fMjKab6MhO5F4eKBo4mFd8650PqA8Oo4VXqEabg/w4FXmctawAYhTDJOXLLz5Jd5BjUhEqQYKaHh2M+ebNexS+JrgK7SqprWoUiUlIbNwWxAgolPj6Ccawtb/HU5f32egkdK3C/PH/9D9/9XKesJ9atrOEzdSymaZs5hkb3R79foe036fpD5j1NlionMms4sHBlFsPZtx7OGd0XLAYzSkmC/GSLkrqoiQ4jzYJDV1+81e+w9/6r/8p9w4XvD8e8db8lEWQKPK2cIztb5B96gvkX/kB8pc/gr56nbCzS+j1ZNtPJQq5MhrfNLL7mRLNAi9BxYKCgBDnduaEoZ0hKyLLhEAZAofjCTcu7BPqEue9VASwln6ec/7yeX7wz/x5trb6EuwU2WUr3AhhUNRxd0ujFLnVJBGsQYlVddkEHs4qvvnOB9QPH8VqfREIkeIJMOLf/wIwTJSLBonhSy88TX+QSfmn2C9XOw4PpnzzgzuUXhyGCi8GPmNJEpH3dMtKosCjxYTKcHebp5+4wGZLOf7d/81//uq5TLOVGIZWMbCaQaLoJ7LHaT+WSjBpQmMTCq1RXmHqCld6jmcNNx/NeevOnDt3x5w8mjM5LWgWBSpoZlPL3/l//Qa/8Etf55tHB7w3PeGgLqk8+NZgE9VVXxa4owO2O112tMXUNRvnL7L97Ic49/FPM/jIKyzznGoxQ5WVUBxjCZIvjUfYGEomUQ4ZOQFKHEWl5B0tQvSiccyLkht7u1KeylqGec7u1pDP/LGf4pmPfDymgBKpk/y+vbIPSmwfMbwg0ULxQpAkqNoF5lXg/qzkW+/eon70KKquawfcY+BQ8XkbHrjKQRZW1beGLz3/FP1+hrZCNUIAXzUcHc749q27lN7hIgU1WmPaHaassBJad72K46ANg91Nnn7iElu9lI7VmD/9v/vrr26nioGVraw7RknaojF0jCazmiw6cYLSFN5D5bBVhfWN7E0WAsu65tGs4v2Hc966O+HWgwX3H5b84j99g3/9/h1uFWMmlaOMpaKdak24YrtwxKCa4JndfJvDN77N7K3vMv3Ot5m+/i1OX3+D5Z17nL/+JDsf+wTHJ2PcdIZumuhVDdhEkph0LGUgZp44kaqt4BuBEQdGKZnF8bIiz3KuDHv0s5SdQZ+rzz/HR/7YnyLPU7K2JFYUEtsjAC4o6qAoGvFP6HYlB0XtPaULzErPvWnB6+99QPPo4bp6QQzMaUGxams7bwoxGUQKYpViYC1feOZJen3RVtqQDl95Tg5nfPvWHQFH9CorpbFadrmSXbjPxMu1Y6ANvc0Nnrl+ia1uRsdqdMdAR0FXQVcrukaAspEotlLNXmrY7yRc7GWcH+bsDAdkwz56MMR3e7g0p7EWpywuKBbO83Ba8e07E379tfu8dnrEoVuydIEqOJq2XtZKZIwTFmUNn9iYUCUDFLzDFUv8+Ij67nvc+Wf/kLu//Zt84t/7GfyVKzRph9JD0JCnOUmaSpij1iglVfpEYI53WxnS1oJu0OL2//qdB8yCYdjvsrU9ZPD8p6jTHEIr9ZxxvQtTkalV8pkPQTY0rGUH6EUtu0PPK8e8qhkvKlxVQXT2KRUNcVH2aIEhAuraGysaWGx39IU45yUB3AeUj5sN+CjUy7bJ2BBIANsGMEfnm+Qox9idKBOBp3YS3dbEikY6RZEoKVRqgYRASqCjAn0DQ6vYSgw7mWW/k7Lb79Dpd9HdLjrvQ5bjkxSnpTBa5SXFP8kTjqo5p2VB0UQFMwqOMpiygIMCbw1aWcxgQPCtf0SJAhsFJkLA1yWhbnD3HnD4+9/i5T/646SXL6By2Q58WTfYds96JZ5KtXKyCYVrH1dOrTgxnkDdeP7Ve3dIsgG9/jb/1d/+eX7h999k6m3McyPm2sZlHQHu4xMXFLPaia9l2TBaOkZLz2jR8GhWcf9kQjWdrhOwVxQjMigl9K6VnltWI0eUS4KwTx/dCLQG4xAIkYRIyQwBicgzAdMGVK9CBtd+FuLicY1Q9tIFSifDLuiN/FTGVACTasiNomcVgwQ2UsNmntDvZKRZhslyQprjTYpTBqfEfRxM4NH4hHldxziGhrKpqV2zWnXRuh1JpsYnGUEnBKPxSYrq9KDbI3Tz9X7z1ormMTvlwS/9I976b/8/+ONjgnOUVb3qjdUSqCSb8USXdpzIsAJFZGtKPtFAUJ6jyYzXj6a8dbTkwc33+G//xn/B3/yV3+K0li3MUS39eDycMcQk6+NFzf1pwYNZxaNZwaNZyZ3Rkrcfjnj/1gc0o1NURFOEfxz3SIvUajJWVK91yLX38T7IdhrxDWlB7GELjlgqQseFQDTLa63RNnppo2FFfDOBpqqYLiumRcO8asS4KcQlojfExsZ3xFEFmdF0rGaQGPJMUg/IEnyeRsqh8UqxaCqOJmMaFLVzlMFTK4U3iqAD3lf4eokrF/hiRrOcUZVLdCdnWRXiefWBpq5oygK/XIrHuKllzKxBZSlP3LjBxb0dVFlIDoZNyHPDyy++QDLs4DsDEiQZKhYKjXR6PaGySIVcy0RLOP+vv/k2v3f7HuBIF6f8T/+X/yt/4x/8Ex414H0ke2cmpjW9VM7zYF7x9uGCd4/mvHs0551HE964e8xr737AwfsfYJbFanxXwx5ZihwrCWT9MbGx8QjR8aZC1NJCfDM+6GiDkSsJC1VtEdoYu2oTUWdFcobgPdWy4nS65GRecbyUaodnGvY/P9qOaKRuWKbFOKSTBJVmqCzH2wSvNcu65Hg8ApWwrGqqEGhcxXx+zPT0gNnomOV8SlkWONcIOdbRDFQ5kqoRN733aCxGpxiboZMUZRNCzJpXwPHhAQ/v3JI5Uo4r5/b4k3/gJ7hx+QUGnV28SQmJwaa5pAC05JE4Ge3TSJpbwHgVmJUFD0YjVJC4lk5V8mv/zd/mP/v//mMeVVJCciV/BCl00gRP6T2PZhXfuXvIa3cOef32Id+++YBvvn2Lu7c+gOmY1PtVdPhKzlhB4PF5EDfV+j2FgDlEmSPykxYtsVRmLM+FVCLWbdVCor/LWqmZEgGiTLSwOs9yNufBwQmPxgseTaQys1QDPovMOFQqPlctG4zobJurjBZDirEUdc2Dg3vUzrNwJUUoODq5z8noAOcCNu/R6W/R7W3R7WzSTQd00w7dJKOjDbqckzQVSRML6LsK7WrJno+OPh0UWskm3Yv5JJLcwEefe5nrl57mF3/zV/kff/kXGJ0eEMbH6CQXC6uxdAebreh/ZiKCTI5H+HV87Z3ndDJiY3uHxjV4V9FrCn73v/s7/Nzf+rt8UMY4zgiKJgRZCF4EaI0jM4FeqhhkikFuGHY79Lrd6DaPRq71kK8WoAZ0mxO0/nhlEyEKsx4RRmMpHRGYIxUUVi2xKaq1wMZcF6EaCTaJu3yfiUivFnPu3LrD7QfHPDiYYv7M//avv5oZsdufbYxECLVqGhQuMKkdp0vH0XRJOZ6iIrlfnBzw3pvfwFc1yhhOx8dMxockaUa3v0GSdklNRtekbNsOl/INzqcDttI+HZvG/dik3IGOBd7ayK1WiG07EBBLaQiyEtI0oypr3v3gPRblApSsSKMU53Y2efLaDY5HI4w2pHlOVRYtuZRrhlijs/XZtBK8d/R7A5mSppHyB8Fz77vv8Lvjgo+9/BE6iZex8YFFHZiWsnvkE8OcZ3d6PLnV5cpGh3ODnE6aUC0Kytls7Zdq2xApmY59FAts1FxWWfZtAT7Y7eZ8/7PXGW51MW3GmxIL6ehkzpu374nWEeIOU0p2xUzyHJPnmCRBaYlNcT6WvQqe0DgWyzll5eg4ha58oI7FR1ysfeWiWtbEJJ7Gy8qovKfwsg9s7SSm0tUl777+eygvyb0P7t+kqRcMtnbJexukOmcn7XEj3+aj3XN8sn+Fp+0O26pLFmJktBaLpVJtPENEc1RnBRSyvEysaWqVRjnxRI6mI0L0ECutyfKMz3z84zx//QUePTwkhFie0Wn2dndjQJEIe+3yleCXSKKj0Pfw0UO6gz7OOZqqgqrEVEve/Ef/iJ/7m/8db00V0xoWNSwbydG92kt5cbfPc7tdntrt8sxun5fPb/Dxq7s8fe0ina7kIrfAaBfkmi6sgSELIrIEhPBZFHu9Dv1+BqlGxV2xlVFoKxULZK+3WF89Cqgt9Wg1ldUeeCvnnrAfsyxoHtzn/OQUPa8D8yawaILsJS82LkqnqGJe5yLW4JxXnnHVMKkrKtfQhMA73/59lGtYTGccHN0m73XpDLZJdM6G7nAp3+SyHnJR97lqtzinuiRKUVIzCxWL0LD0XiKzg6cKgZpA01IvIvXQhqAMXmn8KgdQSxlpH4dUS42xbrfPnQcH/MY3vsqj8bHkdyCrrt/fxCSyFTrRPvHYITwVVKB2NY+ODulvbuCakrqpoKkw5YI3fuEf8p/81/9vXjtxnJQ1i1oi7IepZquTsJGnbOSWzW7C7iDj/GaXSzubDAeDCI41QFaaW3uuQKNiLXTZ2DAxhjxNuLq7Td7NMZlFpxYVC+FqG/d5iwYzg5goNK1I0KZDRJU27gtDW+9MiyljO3ieG3bQx5XjtPKM6sA4npM6MG08kzowqT2TyjGqPMel41FVM12W1HXDo5vvMD94wOT0iMn0mM3tPdK8R5502cu32E+G9L3Uq/DB87Ce8Z3ygNfqA95rTrnv55z4imlwLHCUBEoFlVLUSlMrg0PjlNTjckrhlKJSUGpNow1Oi7u/CdAAGMt0seDOwYPoWwClA3mq+IFPv8L3f+r7OL+/T2ITCf+LE9IuYbGFxNQBYDadUHgnFfjqGu8EINRT3v5H/4D/7L/8v/GNRwsmhQiIHa3IDZKzGneszBPDINVs91MG/V40QEXKGDG5MgG1pDKCpqvgcp7y4taQT+xt8NGdIVc3eyQdg07FR6JMDJpe7bUSUHjZ0LA1+omUIrKJgmAN2CSaB4SCaBRJ8Aw07HYt5pP/4V95NXhF48XwUfjAwsHCBRaNY1oLeA6KiruLktuTKbPjU8KjI+7/m19j/PA2dVOxsbGDUpCZDlvdIZ1g8a6h8jUjX3DfzbnnZjz0S6a+Ya48hdGUaULd6dAMB7jNTfzWJmFri7C5QRgO8L0uZBnBCOVYFVtVyJYVQfR/H4Nkq7hXnI511mVTHMUXPvkZApZf+q1/xXQxJTGWPM2omloGazUpQQYrTlpQgcViwc7eHvVsLvcOSG5LcCzu3eRbb9/iyvMvcb6XMTSKLDEkVqLLiICra8dkXvLB/UNOjk5gFe66tmOIWaF9rulow1ODPh8/t8tzu5tc2+xzYdBjf3vI3sUdbJ6gzRl5rHZMjmZ8570PqOpa6pY5T03AGw1ZB9PpkW5s0t3eojMcYNNcqi9XJco5lHdsW8srVy+ifvo3b4YLnZxhasiMxhohR0GJ/LF0Qj0eLZfcnC24e3yKeXBI8Sv/mMV7bxKCp9vJ8dWSRCdsD/cxQVHMJxRVwTI0NN5Ra4VLLfX2EH3lEsmNa2xeu87w/AW621v0uh3yNAahROeZ7BvrWBYFi8mU6dEJs4ePmN65w/LWHcoHD1FHx+iqQDWy42RrFldIgnMeC9km2rAoS2rXbgDo2N3Z5OoT1/it3/xNVAjr3YtiZlhAUhpAMxxusrfRYzmaoWzG3DlqFCZN0Dqlc+M5/sLP/RxfuLLBbkfSGwKys3NdN4xnS96+e8ov/fa3eP+dm1EIlBWuotqpUIS4c6MhcD5P+fTuHte2+nTThCQR6rB7bpPrLz5JMshWAnxwnmZWcOuN+/y9X/kNpkXBvBZ2t1CeOs0xOxfYfOpJ9q9cZBhjWOZFwcOHx9x7533KowN0ueSK1fz0pz+Beulv/mq4OBiy2c3IsxSTWkwsf+AJLIJnUjsOlyX3Z3OWByf0vv57LL76L7E+0M0zisWCXt7h8v4VgoPD0QmTsqDAUVpwT15m61Mf5+JHP8a5q0+wu7XBRp6SKdlasPFxmwgCTVTRdAyNS4wmUV6Ca6M4UAeYLysOJxPu3bnHwzfe4PRb32b51ttwdIKuK7SL9EQFMq3pJSkATS3GtCvnz/Plz3+R//4f/DzLcrHapoMQhDq1lkOlVjnEFy5cIHENTdEIC/QOa1NMklIG6Fx/jv/0r/5Vvnxjn27ixNTtZM+W4+mSb7/3iF/57W9wcP9RrLseSFTgQrfDteGQfmo4mZfcHI2Y1Z4b3ZxP7e5wrp+TZyk2SzAKNneGPPnCdQFHrM0RGkfVguNf/iaTZcG8qcW/g6dKO3SfeJJrn/gIVy+fY9jNsFpRNg33Txe89+b73H/jDZiOGNQVP/T0M6iX/9z/KextbNHrCvmus5xF1mGWJcwTQ6FhTmBZFJSjGZsH9/G/+ktotyBXimo559xgixcuX2daON4+PeHIL1ludsk/9iLXf+AHePaFF9nvD9AoprXnZFlyOp1zenzK7OCIxckJ5XhMM4v5M048qzpLsb0O6XCTfHeb7t4Wm7sb7G0M2etnbBuN1iLInhQ1tw+PuPmt13j0G7/N8luvwekxtnayVakOZErRTRK6Wb4qDV3WFVVdkyQJk9GIEKQWaRC2L6s7CpDaWK5cvko5G9HUniYogiambCQ0SpNefZaf+0t/ia88d5FMSyrlvKw4OJ7ye2/e5avffJP5aELwnhTPJ89v86XrV9jv5VIB2QfeOjjmX7zzAQNt+cTONnu9nDxPZHtzBcPNAU8+e42kn6ElqAXfeIrpgvfeuMsv/NbvMioK5nXFsnEsCFRJh52XXublz77ClfObDPMEq6FygcNJyVvv3+Gd3/k9mocP0Ispe3mO+pE/938Ie/0BnTSFEJjVjuOi4qHzHGvDzFoqrfEhYLwjf+P30Yf3sdbi64JL/SEfunidh+M535iPGO1tsPnlT/Hil7/CpatX8VoznjTcf3DIwTvvcfrmWyzv3CI8fEAYn6KKhWwPHks1gVgsVTtBSAmiYKSwixoM0fuX6Vy7wfCFZzj3zA0uX97hyqBL34JzcFiWvH/nAW/9xq9x8i9+HXXzDtQF2ntsCHTTlEGng/JQRxlla3sL50q8d3xw63a8f2s9FfYSAiRpxhNXn2ByckJZVXhAa0vS7aC1YVyU6M3z/Mxf+Iv88EeeJw0Vk2XJnYMJb35wyPsf3GV6dEJoKp7opfz0Cze4POxjbaRWXjTDX3/vNu88OualzW0uD7p004Q8k/LU3V6XGzeukvUzZPt5qZa0GC94/a1b/NOvf5tRVbJsapbOsQzg0g4XPvYxPvXFT/PEXj+CI1A7OJqWvPX+A77zL3+T5Z3b+GKBcw3m81/6sVfPbw7YHvTod3O6iYa6oppPCZMJ6XhEPp0yWEzJZxOq2++Qpwm+KdhLOrx4/hrvTRf8fmrQf/QHeOUv/Gk+8pnPobMe77x/n9//la/y+v/w97j/8/8j03/1KzRvfBt19wPU6Bi9mKDLElXX6KZGNw7lGhGMnJO0TN+gfINxJaZcomYT1KN7VO+8zuzf/A4Pf/1f8f7vfJM3Pjjk0CUk/Q573Zwre1s89aGPsPf5zzK7cI7ZyQlhuiAE2R6jcY1EV8WyTWXtuHz+Mq6sOT45EkS0Wm7wkb2I9XQ2n7O7t0dVVzR1jTaGbpZRlzUOj1rO+NrXvs6x6bC1c5HRouJoXjKvGoplRblcop3jw1tDPrq3SZ4msqVJlHQUjqrxvHl4ggqKrjWkUfD0TWBcVHRsRhIgVB5X1lTzmtHJjO/efsA7J6csQ6AESpT4vYxl8/Jlnnr6CXaHGf1UNCmjNY3zTMZzjt+7iZ9OIJbuNF/8Qz/16s7GgI1+j26ekiYWBVJjM0CqpdBI1yYcf/AmHSWpB0Nlub57mdcaz61Pf4hn//Kf49Pf/zm0ynjt62/ytb//i9z5ez9P9du/Rrj9Pnpyii4LVF1JiqMTHwr+TC2vWPVvfbZucvEbiA9BrHnK12JiX84Ih/do3vg2B7/1m7z1+6/z3mHBIu+zPexxaXPAjReeY/f7P89ke8D8/hF6PiMET40iSVIWdY1KM5649gTWBO7dv7sqg71CSZBkZ6WgaRrmizkbmxsYIyUrnWtYFEU0i3syHLff/i73ZjVPPPks2lpq51kuChbTGbiaJ3spz21vkllRRSFmormG0aLi9cNTxlUtpbCd43hZc3M05bVHBxS1Z5OMUHrKecV4XPDBo1O+9uABp1VFpQQQJCk6nhvn97lx4wo7vZSOlSLBASirhpPTGcfvfYCfT2ULVucwP/THfubV3WGfQb9DnmekxkoCczTxZmlCnqWMTw9YHj/EVeIF3cyGfDtRJD/7v+KTf/In6Hf6fOdrb/KNv/s/cfDLv4x7+zX06RGqLKCuVsnZalXQTfa1J0Qtg1YfX58hvnf2pF1dq6/Fz3yDLgs4us/89a9z/1//Hm998IhxvkF/c5PLWz2ufehD9D77GY41FPcOpLB+UOR5zisvvsDP/PgP08l6fOfttymWyxVrI5qzRbsQgLimYblYMBj06XY7jEYjmljbwxhFJ0vx5ZLjm29RNHD92Rdw3jGfLZmORpI8ruC5nS0G6Tq9IPhAUTvePhzz5qnYWMZlzaPFnDuzOfdmC06ahrvjKSfLiukSHowr3jqZ8Y2jYx4WS4IBZROyTkav36Hb6dDtdBlsbXH12iU2+ymZ1ai4vciyrDk5mXF66w5uMcO7hqapMX/kp/79V3eHwlKyLMVayWprvZ+JNViref/d71At56A0GYq35yfs/Cc/yys/+AM8uPWAd3/hVzj51V/H372Nn43xxQLqmLF/hipIWYV4toPNmeifuHqUipFAa4vDSgZZ4ad9WEWXy/W1c6jFlOa9t3n0b36P9z44ZD7YYWt7i2u7W1z6xCdZvvA0o5NT7KzgSy++zLMXzzM+HvGbv/9NiuWSyWQSi9qebQOxeoX8ee8o5gv2z53j+PQUH6RGWCdLaZqGolxiPDSu5rmPfhoPTMZjJqcjXF2zqGs2bMp+t0uqxYNae8/d0YJ/fechR2Upim30xDat9VjBAs1dH3hHWd4zGXe1Za5AK0diNYN+l3PbW5zb3GBvo8/moM/O9gbb+7sMehmJES3MeViWDacnE04/uEezmOGaisbVmD/6U3/21Y1uh04mFW6koJrHNRJylhrNo8MD3n3vTcDQtSn3H96GZ17i5f/gz3A4OuKN/+ff4cbdB4TlgvlygSsLiGUg2zIKK+rQziqt4Hl26OP7YuN9/D1YTVRrr2qxs8LV6kHAEnDocom7/S4Pf/dr3Hwwotjd58Juj+tXr9D51CscdDKW797nCWO4ffs2X/3um62Pk7qOgnK8e3v9s2323rMsCqq6RiPBySooyqJEAWm3y+f+yB/n4rUbzOdzxsenTEdjAYeHm8ua0mQ0psOphzcnBb92+wHvTiYEfPSLCNUSVV9JqGWaY85dIr1wmXR7i+6gTydP6FrYSDX7WwMu7W6yt9lne9hlo99jMOzT3R7S7URw0KrajslkwfjgkKaWuia195gf+eN/+tVhlpAlMWLae5qmpq6lqKvSit/5+u8xnUzIOhmnB3cp8aQvfZSLP/A5Dt+9x9Fv/xbdKOSBp3JN3E5TZIRViuNqktcDvXpUrD6PEFjx+JVZWUVHgSICSB7bSK9Vnkq8soo7OoQQMMWS5ta7PPjaa9xeeroXLnJ9b4O9Gzf4oCp4clbwlQ8/y9feepvRZEq/36MolzjXREC3bTvThxCwiZUkbaRAilZayl8jKRQvfu7LfOaHfpy6qhmdnHJ6dMx8OpNAKAyTwSZ3ds/xTn/At23GN1HcqRxusSCNlMgi5naPiiUoDHprl/7Fy+xubbLf77LdsWxkii2r2OmlnNscsLfVY6Of0+vkpHlC2skxgy6dPMFoCSl0TioYzRYFi8lMqLDWeK0wP/yTf/rVbmpFGkbiEaqylm06vef+w0d89bXXUEbhiiWj00fYzR1cd8DFP/hlxienjL7+GpSlhPuFQB0CXlupJ0qQ3NlWPVUxpJrW27RyKqw281lRjrOvlTja5DiDGtZAkYDZVcj26lTaEGLEm15OKN55m9v3D+m8+AzPD7r4oLl6eExXeX7rnVvMxmP63Q5agXPNCiDRZhr/BWySEJTIPFoRC/EHaiVbng0vPslX/p2/gFaGk5NTTg6PmY7HVFVNHQJVt4t98jq9Jy5hdjZg2EP1u4Ruh6ooyMuSjlLk0QuttRSVVWmHwbmLPLu/wyv7m3x4t8P1fsZOouhaz1aesDXssLnRo9frkGYp1loJmMozTCLtdE2grj1l2TCfFpTjqQQja1nYuqgqyrKmLCuqqqKua9mYN0Y2f/Ot7+Kcx+iE08O76J1zqG6fUC1Aa2xHcl2ndcO0rhnXNZU2+G4Pv7ULm7uE/hDfyQlZRrCJ7MpgEgGPMVKMJdb+iDWKCObMax29h9E7u3qtY87FGWrRgkz8JbHYS0tpFOKndI5qfETSBJTzpKOKwiV8Y6npffQTdLc2yfMO3awrNdit7PAobFBkAGMMr3z8k1y4eI0kTyUGNFZIVihIOrz0Qz9OYzocnk4ZTRdUVQPEyopphhkM2Di/y9VzA57ZG/LcuSHP7u9w9dI+/UsXMd2B5AzFeBuLJJYPbcIPnj/Hn33hGj/27AU+e2OXT9/Y4QvPXOD7rl7g4kafYTej08vIujlZJyPNEiwQKkdZNiyWNfNFxWxRsVhKxqINQaoLGEOeWPR0NmcyXzCdFcxmBfNZyXy+pChLTsZj3r99F60C1XJO7RrM/mVcucTXNcEFsiwHrah9w6yuKJXCZTluYxu29lBbe5jeELIOJDkqyQhphovByeRdQqeH63TxeRef9fFJl5B0CKZDsDnBZgQTPYgxja/dCrxN51MRMOt6pe3nUkcjGCvXSBJUp8fmpz7OU1sD5kVDqQxvdAbcfeZpXvrDf4D+xYvsnTtHVVUMej3yLI9bcAIqYFRgb3ubw4NHHN2/w7C/yWBjG+cdQSt0CGw9/SGe+dhnyDJLlid0Oxl5NyXPMzr9LoPtbQbbGzy1O+TlrQEfGua8NMj50FbOx85t8PzVS+xcuUQ66MteuQhFdsHx3NYuP/TCU1y8NCDZTtGDBD1ISHdydi5vc/ncDt0sxRophGtTqb2qCYSi4P9X1ZnEyHWcd/xXb+t9mZ7pGZIzXMRlSJEyLUKmREmkpECKYytWFgNJgCBOAF9yySWXBMiJlxxzDQwDCZAEyM12ADuAnSCWLXlJJNqiSQ734XDI4Wzd0/vb6r2qyqF66OTQeJc+NBrfq/q+//df0igliVLiKCEdJ6hRhBNGeFlCkKe4Slts6eXLH1x1DZDnyDQliSKiSUgSxVy/d5f1rS1c36O/tYYq12F+Ed3bxRRKLH3lyyhg639+iYhTXOFCsQjNGWjP4VZqmCTExJF14ZmfxTv1AuUL56hfeoXGlTdpvvMWzXfeZubtt6i/+QbVSy9T/Pw53OXjsLSAqVdQ3tRdmWlROL8+bczzqMtfnzDGcez3pnwF6+ft4fgFTKmEOvsiF7/6Pl9o1Wn4AQcPNvnE8ygfbvHagTYt4SC3dxkPB4ChUiqCUWiVPz89qtU6m9vbdmKJJjgY5lqzRFGIKBR59U/+nJMnTxJ4VvydJ4m118ozhAPFSoWFpQVeOjLP0VrAXOBYrZDv0ghcyp6H5wUIIUiiCJlKlFL4wuHLy+c4e/4wXjNAFKx+1vJTpv4eypDJDONZpjnC8l5lpomTjFzmqDSlYXJONTyW2wHLC0VOL5Y4OuPhx2N6u33E1//mG2a+VqEeuHjGoDNJHEckqeR7P/mY3miAURm7Gw9wj72EbrZg4wFmbp4vfPPvcQKf//67b1Ls7jETFJFeQDa/QDxTR5uMatWnfXiBxWPHmGsvUC2VKAYuJcfBE1Zbuo8naAEKY/UvBmKVE+WSyTik0+nQWV2nf+ceyb2HqK1tiGLcfIqbTD1Bft3LCHA8e6q4U+5CsYiaPcD8177K1668ynKxQNGx5vH/uL3D5XqdF3NN4+kW//SNf+D2zVuQJ3iuIVeKJImI4hHt2Tbdbp9JHOFMeyIHzWxrFq/gMzl0kj/767+lUSmQx5Lh3pDB9g6j7W3SMMQIQ1BvsLh8nHOnDnOwXqbi2fwZR1jEsjOM2O5O6O506aw9orP2hCyJKQn4iyu/ySvvnMVtlRCFKUvHTAeALCfvTtjp9AgD652mMEipGUeScayQSjPrC15enqHWDMAD7XoWmU4mZHvP+OzHv8Q9df7KVV+AUDl5KokjK4be3dvj5upDHBcGm+sY10OcOIOZxnmaSoW5996l0qrz9LMVnDAiKNeRSwsUzh9j+fXPceXKa1y++ArnT57gyFyLmWKRgm9zxzKtiZUizDVjpRgrw0RPTfKNIQBqjkPL91moFDk+2+bk6ROcuvQFjrz7FvVLlzCHF4k9DyUlIt/vQfavGBdcmxuCN2XKl2pw4TxXvvgWr9XraKM4KBy2M4UCXi0WKGcZL9fLfPjTT3n69CkF38EYZYsAEFi1erlaYTQePcdqDJDEEa25A5z7va9x9NRxuyeJU0ajMaNuj9HuDtFkRCZThHCpt5o0m3VKnmXgO8aOxlmWE6YZUZoj4xQZp0SDISpPETrn3Nwix44dRFQcKwkQU7KyNogsJxvGdAcTIq3ItI3aSNKcMJFImePnGSfnirTnC1hR4NSc1ijQGZ6KaBZy3BPnLl0NAFdbnmQaRaRxwr2NJ+yO+5g0Jhx1EfOL6CPHEcM+QjiYcoXGG69z8sgiI19gWlUOffF1Lr17mcvnznJ2bp6GXyTVgq1U83AYs7I94MbqFtdvP+L69bvcvHabX127wcq1G6z84hZ3bjzgzu017j7a5u5mnwfDiGcxdJVgMh0TS67LXMnnyPwsp8++yJkrl5l54yLxkUPEuUHFU/dj17WZMJ5nBVGFEmphniO/+yV++8QSdSGoTO2drkcp50tFatrwYjnADSO+9f0fsdhqMpmMyXM7iYEFjrp7HdozswSBz3gynqL91uS14PlcfP+ruLUGSZoRTWLGgxH9zg7D7Q2icY80jlDGUKrVKdVrOI5rVfrKIHNNmOYMQskkSoiHY+LhmLTXt+Y5WqITw+ePnqDQ2DdvmYKLucFMJJ31XdY7XaI8J5Y5k1gyDBOGo4g0lrgy44V2kWrT6mbFdIIUWoGSiGSEkEPEb/3BX5pmpUq14OMbTSYlqZT8+PZ1cmPob66Ra4X7uYvkrXnE2gOEW0AvHeDQn/4xH7z3BihwtKLuuCjt0E81T0YRa8+22H3wiOjBKvnGBqazjQmHkMQ4WWo9wKYuQP930sBx7NteqEB9BmfhEM6RY5RPnKS1fJylQ22WGkXmPEPdsW/NyBh2JxG3Vh+y9tHPia7dwBmOcDUY34dKFe+dN/ngj77CO40amRK84AvW0pxEGJYdhyBXvFkL+OF/fcI/f+f7LDdL/OCjj5DpBEd41nNc5yRJhFaSw0tHWX/6hMFg8BxaLwY+73/9r/BefRvfaOR4wqjTpbu+Su/RCulkiAaK9VmWTp/j+LmXaM/NUS0XKQU2RTPLciaTiHA8IdrdI9zZJnz2DJklZCrDSXN+5/wl3v+NN6ks1XAK9uhSkaTzaINrK3fZMxmiVMQEvvVOlVYHG7gBFc/j7eU5Tr40h1OaJlW4AVqliHSEHuygtjdwF4+9dBWVk8sUmSTEcUR3MmKjvwd5TNTfw2ktwNILaCkR3W0olfCOnESVSxw/e4pFx0Voh9Veyke3HvPT//gR97/1bfa++2/kH3+IuvMZPFvF2dtGjAeIeIJIY8hiHCkhk4hcIjKJIxNcmeCkMSIa4ww6sPkYff8m8trPGX78U57+4iZr612eKo/YL+EWPZqeYL7gcXLhIEdfeRnvwjmGnkMynuAYl/zwImd+/0u8tTCH0TDjOmTAeqY4GwRomXGhUkDEMZ98cocDjQr3H97h3qNVatUaWSat4QmCQlAgiiMwgoMLC/SGeyhlkVSjNRVXsDeQKFFkMugx6ezQe7bOcPMR0WiPJBoh0xjX9TFTAdgkjAlje1qMRhOG/SGTXo94d4doe5ssHKHyjCyXjNOIlfVVNh6skz8dMlzbZev2Ovd/eYdf3bzF7a0NNvs9+qMx3f6AjZ0Ou3t9wjBGKUOuBSqVHG5V8Ss+OMauBfIMEw8x4yGPVh4hLr79h6YUBPiOa6OqtWJj1GN3MiLe2yKVKcHxs8jWPIQjxPYGujmH+/p7aJFz7IMPaDXrbDxYpfuTn6Du3IL+LiIeY6REG2WZ31PGs9k3YN/fuk7RUzPFDwxWvWXvcQuD6ylCiBAYV0z7iCKmPoM4vkz1ldc4eukiZ15YYKlsNb4g6ErDysZTVlZuU2+3+cqF8yx5Pp4xHAt87qSSQ77HjDEcQPNKyeXejYc829zi9r01/uVb3+bJxmNOvnCMcDyyAi4ciwMJRXevw9HFwwS+w8q9uzZWzBjOnnmJ1GsRHD6NWyoSD7qMttaY9DbJMhviI7yAxtxB2gePU221KVQqlEtlO4Ia0HFMPh6gBn1UkqB1ZiUiKiOWKXEaU9Tw8vxhjtRmcR2QJqMvQzZD22/4pRLa8RilCVIr6pU6czNt6pUaRd9nuVHhwrl52rMlHNegZIQa9Xh89yHf+cGniM9ffN/4rvc8sEUbeDzpo5KI/uY6Tn0G98SLKC0woz6MepjaDO67H5BtPEHkKUIL2HmKGOzavYrBRkEVirh+wd79xiCUwuipZ1huBUDsy/qeQ9T78PQU1Pr/gPV0V4vFN/YbzqCEah+ifOESh774HufPHeNI1aUpDBmCntKUMTSEYDWRnAkCykIwFoZlP0DGMe/VCySb26yuPCTLFf/63e/zvR9+SMG3upoDc23GkxGu46ENaK1I0xCVZczPzSOzhLXHa2itac+0WTq2zJNuj2b7EDIJCSdDknhElkurc8Uq0MqlGtVqk1KlRqlYplwo4DuuPaXzHGdKabDJDQapc2IpSWSMkikNN2C2XKXsFzBApHImeUaqchQG4zhEWUqiMmYabQ7OLjJbb9nIViNwtMbJJeQJpAlZPKEf9tkY9XFnWktXtbIzfJ6nhHnGMEnIRj1ymeLPzaOLZUQ4gXHPLtBcH+/ICUwUwf1bmK2nEI7Qnoeo1HBrDdxSBccLEMpgZIJOQ4t5JDFGptaQVk23tkY9z2gR+3uYfUfCfWXJdDy1nfVU9KOn5KAsxRn3ydbu0fv056w+6bJZbqEbDRq+R8tx8ID7ccZ/buwQK5t3cqpcYJRKTvswF0WsfHoTF5fbjx5z/f599nodhCMYj4a0WnN2GekIjNHWV8vxSNIIx3VoVGpoo5jEExwEyyeXebbxhEa1CRhkEiKzFK2tWg8MWkOWZ2iV4Rvro4ExqDxDpgkyjZBZSppn04+0hZElxFli48vQZLkilCkTmRJJyUSmjGTEIBozCAeE8ZgkieyuSGtypZFSEiYJw2hCLw7pxzGdOGI7HLExGrAT9nGbrUNXMdYYX2vFaJp4FHa2MIGPW5+x73M4giTCeAE6CPDml/APLpD7QLGAaM3hFSs4RmGSECccQzjGRCNEPIHU5qmQZTaVad/o1mjE1IDE2gVMi2F6mthCmZ4j06cQVr5ofa0cjJhaR6kMEcfoJ48YXLvG6pMOa36NTcfhTpqyLiXVgk9uNBdbNXQG4d6Y133DvU+vMxmNCJOUf//oZ3x2+wbzrRk6vT7VUpkwHNNsNqebZqu8E65DEATsdXep1+rUa3UGwz46y5mpNwmCgCiJaM/OMxgPybLUWmk+pyooyz4XTKPbPRwESmUkMiWVKXkmkXmGVDkyz5EqI1XSFprK8acLSmUgM4pUZ8QqJcmlZapNTfX2iy6WEaGMiLOEYTSkN+nTD/v0x332Jnt0Rl32wh5xFuO2Zw9dtQiK5VJOtCJPYmQ4wC2VLXiEQUQjhNaYUhVRrWKKJUqnzyKa8xCnmF4XutuI/i5mPITIuhILmSByWxDoKQVQ7xN97FM8397afoPnPch+kdjn8wtm+oaxz/twPIuCOjbylExCPEasrzK6fp2t9W06+NTnW7yzMMvlRgNfCD68/oAzGzvE9+/x5NEa7ZkWP752g+9+/CGTyZDF9gJ7vT2KxSKDfo/2fBuZpNZ+yfPt79R2MzsYD5ipN6lVK3T2OszONCn4JVzXEPgV4jQmTiO0zu3luF/8wpaJ43gWn0HYmLA8Q+aSTFn9iTIapRXZtEhyJdHKuiCL6T+TaYVU1gtF5il5nj2PKDPTfk4bQ6Yz0iwhyRISGZHIiCgNmSQhcRrakEdj+F+zyV3ENHPJUwAAAABJRU5ErkJggg==";

/***/ }),

/***/ "./src/images/male.png":
/*!*****************************!*\
  !*** ./src/images/male.png ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

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
/*!***********************************************!*\
  !*** ./src/content/ttsPlayer/webcomponent.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
/* harmony import */ var _ttsPlayer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ttsPlayer.js */ "./src/content/ttsPlayer/ttsPlayer.js");
/* harmony import */ var _picocss_pico_scss_pico_scss_inline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @picocss/pico/scss/pico.scss?inline */ "./node_modules/@picocss/pico/scss/pico.scss?inline");
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @webcomponents/custom-elements */ "./node_modules/@webcomponents/custom-elements/custom-elements.min.js");
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_4__);






const html = htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);

let ttsPlayerStyles = "";
for (const node of document.head.childNodes) {
  if (node.tagName === "STYLE") {
    const style = node.innerHTML;
    if (style.includes("PNLTTSPlayerContainer")) {
      ttsPlayerStyles += style;
    }
  }
}

class PNLTTSPlayerElement extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM for isolation
    this.shadow = this.attachShadow({ mode: "closed" });

    // Create and inject styles
    this.injectStyles();

    // Create render target
    this.renderTarget = document.createElement("div");
    this.renderTarget.id = "PNLTTSPlayerContainer";
    this.shadow.appendChild(this.renderTarget);

    // Internal state
    this._isVisible = false;
    this._settings = this.loadSettings();
  }

  // Inject styles into shadow DOM
  injectStyles() {
    // Inject Pico CSS
    const picoStyleElement = document.createElement("style");
    picoStyleElement.textContent = _picocss_pico_scss_pico_scss_inline__WEBPACK_IMPORTED_MODULE_3__["default"];
    this.shadow.appendChild(picoStyleElement);

    const styleElement = document.createElement("style");
    styleElement.textContent = ttsPlayerStyles;
    this.shadow.appendChild(styleElement);
  }

  // Add this helper method to update the player
  updatePlayer() {
    const playerElement = html`
      <${_ttsPlayer_js__WEBPACK_IMPORTED_MODULE_2__["default"]}
        text=${this._currentText}
        lang=${this._currentLang}
        settings=${this._settings}
        saveSettings=${(update) => this.handleSaveSettings(update)}
        exitVoiceMode=${() => this.hide()}
        ...${this._currentOptions}
      />
    `;

    (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(playerElement, this.renderTarget);
  }

  // Show the player with text and language
  show(text, lang = "en", options = {}) {
    if (!text || !text.trim()) {
      console.warn("No text provided to TTS player");
      return;
    }

    this._isVisible = true;
    this._currentText = text;
    this._currentLang = lang;
    this._currentOptions = options;

    this.updatePlayer();

    // Position the web component itself
    this.style.cssText = `
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 2147483647 !important;
  pointer-events: none !important;
`;
    // Make sure the render target allows pointer events
    this.renderTarget.style.pointerEvents = "auto";

    // Add to DOM if not already there
    if (!this.parentNode) {
      document.body.appendChild(this);
    }

    // Dispatch show event
    this.dispatchEvent(
      new CustomEvent("show", {
        detail: { text, lang, options },
        bubbles: true,
      })
    );
    return this;
  }

  // Hide the player
  hide() {
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
    return this;
  }

  // Handle settings updates
  handleSaveSettings(update) {
    this._settings = { ...this._settings, ...update };
    this.saveSettings(this._settings);

    // Force a re-render by calling show again with updated settings
    if (this._isVisible && this._currentText) {
      this.updatePlayer();
    }

    // Dispatch settings change event
    this.dispatchEvent(
      new CustomEvent("settingschange", {
        detail: update,
        bubbles: true,
      })
    );
  }

  // Load settings from localStorage
  loadSettings() {
    try {
      const stored = localStorage.getItem("pnl-tts-settings");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  // Save settings to localStorage
  saveSettings(settings) {
    try {
      localStorage.setItem("pnl-tts-settings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to save TTS settings");
    }
  }

  // Get current visibility state
  isVisible() {
    return this._isVisible;
  }

  disconnectedCallback() {
    if (this.renderTarget) {
      (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, this.renderTarget);
    }
  }
}

// Register the custom element
if (!customElements.get("pnl-tts-player")) {
  customElements.define("pnl-tts-player", PNLTTSPlayerElement);
}

// At the end of the file, add these for easy usage:
window.createTTSPlayer = () => document.createElement("pnl-tts-player");
window.showTTSPlayer = (text, lang, options) => {
  if (!window._pnlTTSPlayerInstance) {
    window._pnlTTSPlayerInstance = window.createTTSPlayer();
  }
  return window._pnlTTSPlayerInstance.show(text, lang, options);
};

window.addEventListener("message", (event) => {
  if (event.source !== window) return; // Only accept messages from the same window
  // Only accept messages from same origin for security
  if (event.origin !== window.location.origin) {
    return;
  }

  const { command, text, lang } = event.data;
  if (text && command === "pnl-tts-play") {
    window.showTTSPlayer(text, lang);
  }
});

})();

/******/ })()
;
//# sourceMappingURL=tts-player-webcomponent.bundle.js.map