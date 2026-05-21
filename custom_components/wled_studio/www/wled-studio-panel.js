function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,_=f.trustedTypes,g=_?_.emptyScript:"",v=f.reactiveElementPolyfillSupport,m=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,A=$.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,P=`<${I}>`,O=document,T=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,L=/"/g,z=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,K=O.createTreeWalker(O,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=H:void 0!==l[1]?o=D:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=n??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?L:q):o===L||o===q?o=j:o===H||o===D?o=U:(o=j,n=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";r+=o===U?i+P:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=G.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[r++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),K.nextNode(),a.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===I)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=K.nextNode(),r++)}return K.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Y=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),R(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const r of e)n===i.length?i.push(s=new t(this.O(T()),this.O(T()),this,this.options)):s=i[n],s._$AI(r),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,s[i+o],e,o),a===B&&(a=this._$AH[o]),r||=!R(a)||a!==this._$AH[o],a===F?t=F:t!==F&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}let it=class extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===B)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(G,Y),($.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let ot=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function ut(t){return(e,i)=>(customElements.get(t)||customElements.define(t,e),e)}const pt=o`
  :host {
    container-type: inline-size;
    container-name: wled-studio;
    display: block;
    --wled-bp-sm: 600px;
    --wled-bp-md: 900px;
    --wled-bp-lg: 1200px;
  }

  .cq-compact {
    display: block;
  }
  .cq-medium {
    display: none;
  }
  .cq-wide {
    display: none;
  }

  @container wled-studio (min-width: 600px) {
    .cq-compact {
      display: none;
    }
    .cq-medium {
      display: block;
    }
  }

  @container wled-studio (min-width: 900px) {
    .cq-wide {
      display: block;
    }
  }
`,ft=o`
  :host {
    --m-tap: 100ms;
    --m-slider-settle: 180ms;
    --m-scene-confirm: 120ms;
    --m-view-transition: 180ms;
    --m-bottom-sheet: 240ms;
    --m-toast: 4000ms;
    --m-crossfade-default: 2500ms;
    --m-bloom-pulse: 600ms;
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      --m-tap: 1ms;
      --m-slider-settle: 1ms;
      --m-scene-confirm: 1ms;
      --m-view-transition: 1ms;
      --m-bottom-sheet: 1ms;
      --m-bloom-pulse: 1ms;
    }
  }
`;class _t{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const gt=[pt,ft];class vt extends ot{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new _t(this),this._visible=!0,this._inView=!0}static{this.styles=gt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ht({attribute:!1})],vt.prototype,"hass",void 0);async function mt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function bt(t,e){await mt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function yt(t,e,i,s){await mt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}function wt(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function xt(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function $t(t,e){return{seg:[{...e,id:t,sel:!0,on:void 0===e.on||e.on}]}}function St(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:xt(t.col),awm:t.awm};return JSON.stringify(e)}function At(t,e,i){let s,n=null,r=0;const o=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await bt(t,e)).segments??[]).find(t=>t.id===r);if(!s||!n)return;const o=St(n);if(o===St(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(xt(t.col))!==JSON.stringify(xt(e.col))}(n,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=function(t,e,i=100){let s,n,r;const o=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r){const e=r;r=void 0,t(...e)}},a=(...t)=>{r=t,s&&clearTimeout(s),s=setTimeout(o,e),n||(n=setTimeout(o,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r=void 0},a}((s,a)=>{n=a,r=a.id,yt(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(n={...a,...i,id:a.id}),o()}).catch(()=>{i(a,"Failed to apply state to WLED")})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var kt,Et,Ct,It,Pt,Ot={},Tt=[],Rt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Mt(t,e){for(var i in e)t[i]=e[i];return t}function Nt(t){var e=t.parentNode;e&&e.removeChild(t)}function Ut(t,e,i){var s,n,r,o,a=arguments;if(e=Mt({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return o=e.key,null!=(r=e.ref)&&delete e.ref,null!=o&&delete e.key,Ht(t,e,o,r)}function Ht(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return kt.vnode&&kt.vnode(n),n}function Dt(t){return t.children}function jt(t,e){this.props=t,this.context=e}function qt(t,e){if(null==e)return t.__p?qt(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?qt(t):null}function Lt(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return Lt(t)}}function zt(t){(!t.__d&&(t.__d=!0)&&1===Et.push(t)||It!==kt.debounceRendering)&&(It=kt.debounceRendering,(kt.debounceRendering||Ct)(Wt))}function Wt(){var t,e,i,s,n,r,o,a;for(Et.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Et.pop();)t.__d&&(i=void 0,s=void 0,r=(n=(e=t).__v).__e,o=e.__P,a=e.u,e.u=!1,o&&(i=[],s=Gt(o,n,Mt({},n),e.__n,void 0!==o.ownerSVGElement,null,i,a,null==r?qt(n):r),Zt(i,n),s!=r&&Lt(n)))}function Bt(t,e,i,s,n,r,o,a,l){var c,h,d,u,p,f,_,g=i&&i.__k||Tt,v=g.length;if(a==Ot&&(a=null!=r?r[0]:v?qt(i,0):null),c=0,e.__k=Ft(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=g[c])||d&&i.key==d.key&&i.type===d.type)g[c]=void 0;else for(h=0;h<v;h++){if((d=g[h])&&i.key==d.key&&i.type===d.type){g[h]=void 0;break}d=null}if(u=Gt(t,i,d=d||Ot,s,n,r,o,null,a,l),(h=i.ref)&&d.ref!=h&&(_||(_=[])).push(h,i.__c||u,i),null!=u){if(null==f&&(f=u),null!=i.l)u=i.l,i.l=null;else if(r==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,h=0;(p=p.nextSibling)&&h<v;h+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return c++,i}),e.__e=f,null!=r&&"function"!=typeof e.type)for(c=r.length;c--;)null!=r[c]&&Nt(r[c]);for(c=v;c--;)null!=g[c]&&Qt(g[c],g[c]);if(_)for(c=0;c<_.length;c++)Yt(_[c],_[++c],_[++c])}function Ft(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Ft(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return Ht(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=Ht(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Vt(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Rt.test(e)?i+"px":null==i?"":i}function Kt(t,e,i,s,n){var r,o,a,l,c;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(r=t.style,"string"==typeof i)r.cssText=i;else{if("string"==typeof s&&(r.cssText="",s=null),s)for(o in s)i&&o in i||Vt(r,o,"");if(i)for(a in i)s&&i[a]===s[a]||Vt(r,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Jt,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Jt,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Jt(t){return this.t[t.type](kt.event?kt.event(t):t)}function Gt(t,e,i,s,n,r,o,a,l,c){var h,d,u,p,f,_,g,v,m,b,y=e.type;if(void 0!==e.constructor)return null;(h=kt.__b)&&h(e);try{t:if("function"==typeof y){if(v=e.props,m=(h=y.contextType)&&s[h.__c],b=h?m?m.props.value:h.__p:s,i.__c?g=(d=e.__c=i.__c).__p=d.__E:("prototype"in y&&y.prototype.render?e.__c=d=new y(v,b):(e.__c=d=new jt(v,b),d.constructor=y,d.render=te),m&&m.sub(d),d.props=v,d.state||(d.state={}),d.context=b,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=y.getDerivedStateFromProps&&Mt(d.__s==d.state?d.__s=Mt({},d.__s):d.__s,y.getDerivedStateFromProps(v,d.__s)),u)null==y.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==y.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(v,b),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(v,d.__s,b)){for(d.props=v,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(v,d.__s,b)}for(p=d.props,f=d.state,d.context=b,d.props=v,d.state=d.__s,(h=kt.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=Ft(null!=h&&h.type==Dt&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=Mt(Mt({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(_=d.getSnapshotBeforeUpdate(p,f)),Bt(t,e,i,s,n,r,o,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,f,_),g&&(d.__E=d.__p=null)}else e.__e=Xt(i.__e,e,i,s,n,r,o,c);(h=kt.diffed)&&h(e)}catch(t){kt.__e(t,e,i)}return e.__e}function Zt(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){kt.__e(t,i.__v)}kt.__c&&kt.__c(e)}function Xt(t,e,i,s,n,r,o,a){var l,c,h,d,u=i.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=r)for(l=0;l<r.length;l++)if(null!=(c=r[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,r[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),r=null}return null===e.type?u!==p&&(null!=r&&(r[r.indexOf(t)]=null),t.data=p):e!==i&&(null!=r&&(r=Tt.slice.call(t.childNodes)),h=(u=i.props||Ot).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var r;for(r in i)r in e||Kt(t,r,null,i[r],s);for(r in e)n&&"function"!=typeof e[r]||"value"===r||"checked"===r||i[r]===e[r]||Kt(t,r,e[r],i[r],s)}(t,p,u,n,a),e.__k=e.props.children,d||Bt(t,e,i,s,"foreignObject"!==e.type&&n,r,o,Ot,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function Yt(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){kt.__e(t,i)}}function Qt(t,e,i){var s,n,r;if(kt.unmount&&kt.unmount(t),(s=t.ref)&&Yt(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){kt.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(r=0;r<s.length;r++)s[r]&&Qt(s[r],e,i);null!=n&&Nt(n)}function te(t,e,i){return this.constructor(t,i)}function ee(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function ie(){return ie=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},ie.apply(this,arguments)}kt={},jt.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=Mt({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&Mt(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),zt(this))},jt.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,zt(this))},jt.prototype.render=Dt,Et=[],Ct="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,It=kt.debounceRendering,kt.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return zt(s.__E=s)}catch(e){t=e}throw t},Pt=Ot;var se="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ne="[\\s|\\(]+("+se+")[,|\\s]+("+se+")[,|\\s]+("+se+")\\s*\\)?",re="[\\s|\\(]+("+se+")[,|\\s]+("+se+")[,|\\s]+("+se+")[,|\\s]+("+se+")\\s*\\)?",oe=new RegExp("rgb"+ne),ae=new RegExp("rgba"+re),le=new RegExp("hsl"+ne),ce=new RegExp("hsla"+re),he="^(?:#?|0x?)",de="([0-9a-fA-F]{1})",ue="([0-9a-fA-F]{2})",pe=new RegExp(he+de+de+de+"$"),fe=new RegExp(he+de+de+de+de+"$"),_e=new RegExp(he+ue+ue+ue+"$"),ge=new RegExp(he+ue+ue+ue+ue+"$"),ve=Math.log,me=Math.round,be=Math.floor;function ye(t,e,i){return Math.min(Math.max(t,e),i)}function we(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function xe(t){return parseInt(t,16)}function $e(t){return t.toString(16).padStart(2,"0")}var Se=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ie({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=ie({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=be(e),r=e-n,o=s*(1-i),a=s*(1-r*i),l=s*(1-(1-r)*i),c=n%6,h=[l,s,s,a,o,o][c],d=[o,o,l,s,s,a][c];return{r:ye(255*[s,a,o,o,l,s][c],0,255),g:ye(255*h,0,255),b:ye(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),r=Math.min(e,i,s),o=n-r,a=0,l=n,c=0===n?0:o/n;switch(n){case r:a=0;break;case e:a=(i-s)/o+(i<s?6:0);break;case i:a=(s-e)/o+2;break;case s:a=(e-i)/o+4}return{h:60*a%360,s:ye(100*c,0,100),v:ye(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,r=n<1e-9?0:e*i/n;return{h:t.h,s:ye(100*r,0,100),l:ye(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:ye(100*s,0,100),v:ye((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*ve(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*ve(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*ve(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*ve(i),s=255),{r:ye(be(e),0,255),g:ye(be(i),0,255),b:ye(be(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,r=2e3,o=4e4;o-r>.4;){i=.5*(o+r);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?o=i:r=i}return i},ee(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ie({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return ie({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ie({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ie({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ie({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ie({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:me(i),g:me(s),b:me(n)}},set:function(e){this.hsv=ie({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ie({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:me(i),s:me(s),l:me(n)}},set:function(e){this.hsv=ie({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ie({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,r=1;if((e=oe.exec(t))?(i=we(e[1],255),s=we(e[2],255),n=we(e[3],255)):(e=ae.exec(t))&&(i=we(e[1],255),s=we(e[2],255),n=we(e[3],255),r=we(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:r}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+$e(t.r)+$e(t.g)+$e(t.b)},set:function(t){var e,i,s,n,r=255;if((e=pe.exec(t))?(i=17*xe(e[1]),s=17*xe(e[2]),n=17*xe(e[3])):(e=fe.exec(t))?(i=17*xe(e[1]),s=17*xe(e[2]),n=17*xe(e[3]),r=17*xe(e[4])):(e=_e.exec(t))?(i=xe(e[1]),s=xe(e[2]),n=xe(e[3])):(e=ge.exec(t))&&(i=xe(e[1]),s=xe(e[2]),n=xe(e[3]),r=xe(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:r/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+$e(t.r)+$e(t.g)+$e(t.b)+$e(be(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,r=1;if((e=le.exec(t))?(i=we(e[1],360),s=we(e[2],100),n=we(e[3],100)):(e=ce.exec(t))&&(i=we(e[1],360),s=we(e[2],100),n=we(e[3],100),r=we(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:r}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function Ae(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,r=t.handleRadius,o=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*o+2*r,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*o-2*r,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function ke(t,e){var i=Ae(t),s=i.width,n=i.height,r=i.handleRange,o=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,r=t.maxTemperature-n,o=(e.kelvin-n)/r*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:n/2,h=o+l/100*r;return a&&(h=-1*h+r+2*o),{x:a?c:h,y:a?h:c}}var Ee,Ce=2*Math.PI,Ie=function(t,e){return Math.sqrt(t*t+e*e)};function Pe(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Oe(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Te(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function Re(t,e,i){var s=Oe(t),n=s.cx,r=s.cy,o=Pe(t);e=n-e,i=r-i;var a=Te(t,Math.atan2(-i,-e)*(360/Ce)),l=Math.min(Ie(e,i),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function Me(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function Ne(t,e,i){var s=Me(t),n=s.width,r=s.height,o=s.radius,a=(e-o)/(n-2*o)*100,l=(i-o)/(r-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function Ue(t){Ee||(Ee=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Ee.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function He(t,e,i,s){for(var n=0;n<s.length;n++){var r=s[n].x-e,o=s[n].y-i;if(Math.sqrt(r*r+o*o)<t.handleRadius)return n}return null}function De(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function je(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function qe(t){return"string"==typeof t?t:t+"px"}var Le=["mousemove","touchmove","mouseup","touchend"],ze=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,r={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(r[s?"marginLeft":"marginTop"]=n),Ut(Dt,null,t.children(this.uid,i,r))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,r=n.clientX-s.left,o=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(r,o,0)&&Le.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(r,o,1);break;case"mouseup":case"touchend":i(r,o,2),Le.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(jt);function We(t){var e=t.r,i=t.url,s=e,n=e;return Ut("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+qe(t.x)+", "+qe(t.y)+")",willChange:"transform",top:qe(-e),left:qe(-e),width:qe(2*e),height:qe(2*e),position:"absolute",overflow:"visible"}},i&&Ut("use",Object.assign({xlinkHref:Ue(i)},t.props)),!i&&Ut("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Ut("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Be(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=Ae(t),n=s.width,r=s.height,o=s.radius,a=ke(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],r=t.minTemperature,o=t.maxTemperature,a=o-r,l=r,c=0;l<o;l+=a/8,c+=1){var h=Se.kelvinToRgb(l),d=h.r,u=h.g,p=h.b;n.push([12.5*c,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var f=Se.hsvToHsl({h:i.h,s:0,v:i.v}),_=Se.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]];default:var g=Se.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]]}}(t,i);return Ut(ze,Object.assign({},t,{onInput:function(e,s,n){var r=function(t,e,i){var s,n=Ae(t),r=n.handleRange,o=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+r+o:e-o,s=Math.max(Math.min(s,r),0);var a=Math.round(100/r*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=r,t.onInput(n,t.id)}}),function(e,s,c){return Ut("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:qe(n),height:qe(r),borderRadius:qe(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Ut("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:qe(o),background:je("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},De(t))}),Ut(We,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Fe(t){var e=Me(t),i=e.width,s=e.height,n=e.radius,r=t.colors,o=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=r.map(function(e){return function(t,e){var i=Me(t),s=i.width,n=i.height,r=i.radius,o=e.hsv,a=r,l=s-2*r,c=n-2*r;return{x:a+o.s/100*l,y:a+(c-o.v/100*c)}}(t,e)});return Ut(ze,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=He(t,e,i,h);null!==n?o.setActiveColor(n):(o.inputActive=!0,l.hsv=Ne(t,e,i),t.onInput(s,t.id))}else 1===s&&(o.inputActive=!0,l.hsv=Ne(t,e,i));t.onInput(s,t.id)}}),function(e,o,a){return Ut("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:qe(i),height:qe(s),position:"relative"},a)}),Ut("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:qe(n)},De(t),{background:je("linear","to bottom",c[1])+","+je("linear","to right",c[0])})}),r.filter(function(t){return t!==l}).map(function(e){return Ut(We,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Ut(We,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}We.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Be.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Ve(t){var e=Oe(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,r=n.hsv,o=i.map(function(e){return function(t,e){var i=e.hsv,s=Oe(t),n=s.cx,r=s.cy,o=Pe(t),a=(180+Te(t,i.h,!0))*(Ce/360),l=i.s/100*o,c="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:r+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Ut(ze,Object.assign({},t,{onInput:function(e,i,r){if(0===r){if(!function(t,e,i){var s=Oe(t),n=s.cx,r=s.cy,o=t.width/2;return Ie(n-e,r-i)<o}(t,e,i))return!1;var a=He(t,e,i,o);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=Re(t,e,i),t.onInput(r,t.id))}else 1===r&&(s.inputActive=!0,n.hsv=Re(t,e,i));t.onInput(r,t.id)}}),function(s,l,c){return Ut("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:qe(e),height:qe(e),position:"relative"},c)}),Ut("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Ut("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Ut("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-r.v/100})}),Ut("div",{className:"IroWheelBorder",style:Object.assign({},a,De(t))}),i.filter(function(t){return t!==n}).map(function(e){return Ut(We,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})}),Ut(We,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[n.index].x,y:o[n.index].y}))})}var Ke=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Se(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Ve},{component:Be}],e.transparency&&s.push({component:Be,options:{sliderType:"alpha"}})),Ut("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,r=t.options;return Ut(n,Object.assign({},e,r,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(jt);Ke.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Je,Ge,Ze,Xe=(Ge=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,r;kt.__p&&kt.__p(t,e),n=(s=i===Pt)?null:e.__k,t=Ut(Dt,null,[t]),r=[],Gt(e,e.__k=t,n||Ot,Ot,void 0!==e.ownerSVGElement,n?null:Tt.slice.call(e.childNodes),r,!1,Ot,s),Zt(r,t)}(Ut(Je,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},Ge.prototype=(Je=Ke).prototype,Object.assign(Ge,Je),Ge.__component=Je,Ge);!function(t){var e;t.version="5.5.2",t.Color=Se,t.ColorPicker=Xe,(e=t.ui||(t.ui={})).h=Ut,e.ComponentBase=ze,e.Handle=We,e.Slider=Be,e.Wheel=Ve,e.Box=Fe}(Ze||(Ze={}));var Ye=Ze;let Qe=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this._suppress=!1}updated(){this._host&&!this._picker&&(this._picker=Ye.ColorPicker(this._host,{width:140,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"var(--divider-color, #444)",layout:[{component:Ye.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}willUpdate(){this._picker&&this._syncPicker()}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}render(){return W`
      <div class="wrap">
        <div class="wheel-host" aria-label="Color wheel"></div>
        <div class="extras">
          ${this.showWhite?W`
                <label>
                  W
                  <ha-slider
                    min="0"
                    max="255"
                    step="1"
                    .value=${this.white}
                    @change=${this._onWhite}
                  ></ha-slider>
                </label>
              `:null}
          <label>
            Auto-white
            <select @change=${this._onAwm}>
              <option value="0" ?selected=${0===this.awm}>Manual</option>
              <option value="1" ?selected=${1===this.awm}>Brighter</option>
              <option value="2" ?selected=${2===this.awm}>Accurate</option>
              <option value="3" ?selected=${3===this.awm}>Dual</option>
              <option value="4" ?selected=${4===this.awm}>Max</option>
            </select>
          </label>
        </div>
      </div>
    `}static{this.styles=[...gt,o`
      .wrap {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .extras {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 120px;
        flex: 1;
      }
      label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      select {
        border-radius: 6px;
        padding: 4px 8px;
        background: var(--card-background-color);
        color: inherit;
      }
    `]}};t([ht({type:Array})],Qe.prototype,"rgb",void 0),t([ht({type:Number})],Qe.prototype,"white",void 0),t([ht({type:Number})],Qe.prototype,"awm",void 0),t([ht({type:Boolean})],Qe.prototype,"showWhite",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".wheel-host")],Qe.prototype,"_host",void 0),Qe=t([ut("wled-color-wheel-rgbw")],Qe);let ti=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter=""}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=t?e.filter(e=>e.toLowerCase().includes(t)):e.slice(0,48);return W`
      <div class="strip" role="listbox" aria-label="Effects">
        ${i.map(t=>{const e=this.effectsByName[t],i=this.soundFlags[e],s=e===this.selectedFx;return W`
            <button
              class="chip ${s?"active":""}"
              role="option"
              aria-selected=${s}
              @click=${()=>this._pick(e)}
            >
              ${t}
              ${"v"===i?W`<span class="badge" title="Volume reactive">♪</span>`:null}
              ${"f"===i?W`<span class="badge" title="Frequency reactive">♫</span>`:null}
              ${"2"===i?W`<span class="badge dim" title="2D only">2D</span>`:null}
            </button>
          `})}
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t},bubbles:!0,composed:!0}))}static{this.styles=[...gt,o`
      .strip {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding: 4px 0;
        scrollbar-width: thin;
      }
      .chip {
        flex: 0 0 auto;
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 6px 12px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        white-space: nowrap;
      }
      .chip.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .badge {
        margin-left: 4px;
        font-size: 0.7rem;
      }
      .badge.dim {
        opacity: 0.7;
      }
    `]}};t([ht({type:Object})],ti.prototype,"effectsByName",void 0),t([ht({type:Array})],ti.prototype,"soundFlags",void 0),t([ht({type:Number})],ti.prototype,"selectedFx",void 0),t([ht({type:String})],ti.prototype,"filter",void 0),ti=t([ut("wled-effect-chips")],ti);let ei=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return W`
      <div class="bar" aria-label="WLED presets">
        ${t.length?W`
              <div class="ql-row">
                ${t.map(t=>W`
                    <button
                      class="ql"
                      title=${t.name}
                      @click=${()=>this._pick(t.id)}
                    >
                      ${t.ql}
                    </button>
                  `)}
              </div>
            `:null}
        <ul class="named-list">
          ${e.map(t=>W`
              <li>
                <button class="named" @click=${()=>this._pick(t.id)}>
                  <span class="id">${t.id}</span>
                  <span class="name">${t.name}</span>
                  ${t.ql?W`<span class="ql-badge">${t.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...gt,o`
      .ql-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      .ql {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--secondary-background-color, #333);
        cursor: pointer;
        font-size: 1rem;
      }
      .named-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 160px;
        overflow-y: auto;
      }
      .named {
        width: 100%;
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        border-radius: 6px;
      }
      .named:hover {
        background: var(--secondary-background-color, rgba(128, 128, 128, 0.2));
      }
      .id {
        opacity: 0.6;
        font-size: 0.75rem;
        min-width: 1.5rem;
      }
      .name {
        flex: 1;
        font-size: 0.85rem;
      }
      .ql-badge {
        font-size: 0.75rem;
        opacity: 0.8;
      }
    `]}};t([ht({type:Array})],ei.prototype,"presets",void 0),ei=t([ut("wled-preset-bar")],ei);const ii={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let si=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.selectedSegId=-1,this._loading=!0,this._error="",this._segId=0,this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast=""}onPoweredConnect(){this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=At(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){this._selectSeg(t),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await bt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id)}await this._refreshMeta(),await this._loadPresets()}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await async function(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}(this.connection,this.controllerId,t.fx??0))}_patchSeg(t){const e=this._activeSeg();if(!e||!this._optimistic)return;const i={...e,...t,id:e.id,sel:!0,on:void 0!==t.on?t.on:!1!==e.on},s=this._segments.findIndex(t=>t.id===e.id);if(s>=0){const t=[...this._segments];t[s]=i,this._segments=t}this._optimistic.push($t(e.id,t),i)}_selectSeg(t){this._segId=t,this._colorSlot=0,this._refreshMeta(),this.connection&&this.controllerId&&yt(this.connection,this.controllerId,$t(t,{sel:!0}));const e=this._segments.findIndex(e=>e.id===t);if(e>=0){const e=this._segments.map(e=>({...e,sel:e.id===t}));this._segments=e}}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(wt(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail,n=this._cols(e);n[this._colorSlot]=[i[0],i[1],i[2],s],this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]])})}_onAwm(t){this._patchSeg({awm:t.detail.awm})}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await yt(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return W`<p class="muted">Loading segments…</p>`;if(this._error)return W`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return W`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,n=s?.sliders??{},r=!1!==s?.colors_enabled?3:1;return W`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?W`<p class="toast" role="status">${this._toast}</p>`:null}
        <div class="seg-bar" role="tablist" aria-label="Segments">
          ${this._segments.map(t=>W`
              <button
                class="seg-tab ${t.id===this._segId?"active":""}"
                role="tab"
                aria-selected=${t.id===this._segId}
                @click=${()=>this.selectSegment(t.id)}
              >
                ${this._labelForSeg(t)}
              </button>
            `)}
        </div>

        ${!this.compact&&this._presets.length?W`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${r>1?W`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,r).map((t,e)=>W`
                    <button
                      class="slot ${this._colorSlot===e?"active":""}"
                      role="tab"
                      @click=${()=>{this._colorSlot=e}}
                    >
                      ${t}
                    </button>
                  `)}
              </div>
            `:null}

        <label class="bri-label">
          Segment brightness
          <ha-slider
            min="0"
            max="255"
            step="1"
            .value=${t.bri??255}
            @change=${t=>this._slider("bri",t)}
          ></ha-slider>
        </label>

        <wled-color-wheel-rgbw
          .rgb=${[i[0],i[1],i[2]]}
          .white=${i[3]}
          .awm=${t.awm??0}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${this.compact?null:W`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />
            `}

        <wled-effect-chips
          .effectsByName=${this._snapshot?.effects_by_name??{}}
          .soundFlags=${this._snapshot?.sound_flags??[]}
          .selectedFx=${t.fx??0}
          .filter=${this.compact?"":this._effectFilter}
          @effect-select=${this._onEffectSelect}
        ></wled-effect-chips>

        <div class="sliders">
          ${Object.entries(ii).map(([e,i])=>{if(!n[e])return null;const s=t[e];return W`
              <label>
                ${i}
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${s??128}
                  @change=${t=>this._slider(e,t)}
                ></ha-slider>
              </label>
            `})}
        </div>
      </div>
    `}_labelForSeg(t){const e=this._snapshot?.segment_entities?.find(e=>e.segment_index===t.id);return e?.name?e.name.replace(/^.*\s—\s/,""):`Seg ${t.id+1}`}get segments(){return this._segments}static{this.styles=[...gt,o`
      .controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .seg-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .seg-tab {
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-tab.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ql-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .ql {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--secondary-background-color, #333);
        cursor: pointer;
        font-size: 1rem;
      }
      .fx-search {
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
      }
      .sliders {
        display: grid;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.85rem;
      }
      .compact .sliders {
        display: none;
      }
      .color-slots {
        display: flex;
        gap: 6px;
      }
      .slot {
        flex: 1;
        padding: 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .slot.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .toast {
        font-size: 0.8rem;
        color: var(--warning-color, orange);
        margin: 0;
      }
      .bri-label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `]}};t([ht({attribute:!1})],si.prototype,"connection",void 0),t([ht()],si.prototype,"controllerId",void 0),t([ht({type:Boolean})],si.prototype,"compact",void 0),t([ht({type:Number})],si.prototype,"selectedSegId",void 0),t([dt()],si.prototype,"_loading",void 0),t([dt()],si.prototype,"_error",void 0),t([dt()],si.prototype,"_segId",void 0),t([dt()],si.prototype,"_segments",void 0),t([dt()],si.prototype,"_snapshot",void 0),t([dt()],si.prototype,"_meta",void 0),t([dt()],si.prototype,"_effectFilter",void 0),t([dt()],si.prototype,"_presets",void 0),t([dt()],si.prototype,"_colorSlot",void 0),t([dt()],si.prototype,"_toast",void 0),si=t([ut("wled-segment-controls")],si);let ni=class extends vt{constructor(){super(...arguments),this.controllerId="",this._layouts=[],this._status="Loading layouts…"}onPoweredConnect(){this._load()}willUpdate(){this.connection&&this.controllerId&&this._load()}async _load(){if(this.connection&&this.controllerId)try{const t=await this.connection.sendMessagePromise({type:"wled_studio/layout_list",schema_version:1,controller_id:this.controllerId});this._layouts=t.layouts??[],this._status=0===this._layouts.length?"No layouts yet — Konva designer ships in the next Phase 3 increment.":`${this._layouts.length} layout(s) saved`}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _seedKitchenIsland(){if(!this.connection||!this.controllerId)return;const t={id:"kitchen-island",controller_id:this.controllerId,name:"Kitchen island",pixel_count:210,fixtures:[{id:"kitchen-island",name:"Kitchen island",kind:"polyline",closed:!0,points:[[0,0],[100,0],[110,10],[200,10],[0,0]],anchors:[{led:0,vertex_index:0},{led:85,vertex_index:1},{led:96,vertex_index:2},{led:186,vertex_index:3},{led:209,vertex_index:4}]}]};await this.connection.sendMessagePromise({type:"wled_studio/layout_save",schema_version:1,controller_id:this.controllerId,layout:t}),await this._load()}render(){return W`
      <div class="layout-view">
        <p>${this._status}</p>
        <button class="primary" @click=${()=>this._seedKitchenIsland()}>
          Add kitchen-island template
        </button>
        <ul>
          ${this._layouts.map(t=>W`
              <li>${t.name??t.id} <span class="meta">${t.pixel_count} px</span></li>
            `)}
        </ul>
        <p class="hint">
          Phase 3 continues: Konva editor, background upload, geometry preview on live
          frames.
        </p>
      </div>
    `}static{this.styles=[...gt,o`
      .layout-view {
        padding: 8px 0;
      }
      .primary {
        padding: 10px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-bottom: 12px;
      }
      ul {
        margin: 0;
        padding-left: 1.2rem;
      }
      .meta {
        opacity: 0.7;
        font-size: 0.8rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
        margin-top: 16px;
      }
    `]}};t([ht({attribute:!1})],ni.prototype,"connection",void 0),t([ht()],ni.prototype,"controllerId",void 0),t([dt()],ni.prototype,"_layouts",void 0),t([dt()],ni.prototype,"_status",void 0),ni=t([ut("wled-view-layout")],ni);const ri="wled-studio-panel";let oi=class extends vt{constructor(){super(...arguments),this._view="devices",this._controllerId=""}onPoweredConnect(){this._loadController()}async _loadController(){if(this.hass?.connection)try{const t=await async function(t){await mt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}(this.hass.connection),e=t[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}catch{}}render(){const t=this.remote.state;return W`
      <div class="shell" role="application" aria-label="WLED Studio">
        <aside class="rail cq-medium" aria-label="Navigation">
          ${this._navItem("devices","Devices","mdi:devices")}
          ${this._navItem("layout","Layout","mdi:vector-polygon")}
          ${this._navItem("scenes","Scenes","mdi:palette-swatch")}
          ${this._navItem("effects","Effects","mdi:auto-fix")}
          ${this._navItem("segments","Segments","mdi:vector-line")}
        </aside>
        <main class="stage">
          <header class="top">
            <button
              class="hamburger cq-compact"
              aria-label="Open menu"
              @click=${()=>this._toggleDrawer()}
            >
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>
            <h1>WLED Studio</h1>
            ${t.isRemote?W`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <section class="content" aria-live="polite">
            ${"layout"===this._view&&this._controllerId&&this.hass?.connection?W`
                  <wled-view-layout
                    .connection=${this.hass.connection}
                    .controllerId=${this._controllerId}
                  ></wled-view-layout>
                `:"segments"===this._view&&this._controllerId&&this.hass?.connection?W`
                    <wled-segment-controls
                      .connection=${this.hass.connection}
                      .controllerId=${this._controllerId}
                    ></wled-segment-controls>
                  `:W`
                  <p>
                    View: <strong>${this._view}</strong>
                    ${"segments"===this._view?" — connect a WLED Studio controller first.":" — expanded in later phases."}
                  </p>
                `}
          </section>
        </main>
      </div>
    `}_navItem(t,e,i){const s=this._view===t;return W`
      <button
        class="nav ${s?"active":""}"
        aria-current=${s?"page":"false"}
        @click=${()=>{this._view=t}}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_toggleDrawer(){}static{this.styles=[...gt,o`
        .shell {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 100%;
          background: var(--primary-background-color);
        }
        @container wled-studio (min-width: 600px) {
          .shell {
            grid-template-columns: 200px 1fr;
          }
        }
        .rail {
          padding: 8px;
          border-right: 1px solid var(--divider-color);
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          border-radius: 8px;
          transition: background var(--m-view-transition) ease;
        }
        .nav.active,
        .nav:hover {
          background: var(--secondary-background-color);
        }
        .top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
        }
        .hamburger {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        @container wled-studio (min-width: 600px) {
          .hamburger {
            display: none;
          }
        }
        .remote-pill {
          margin-left: auto;
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--warning-color, #e65100);
        }
        .content {
          padding: 16px;
        }
      `]}};t([dt()],oi.prototype,"_view",void 0),t([dt()],oi.prototype,"_controllerId",void 0),oi=t([ut(ri)],oi),customElements.get(ri)||customElements.define(ri,oi),console.info("[wled-studio] panel bundle loaded",{panel:ri});export{ri as PANEL_TAG,oi as WledStudioPanel};
//# sourceMappingURL=wled-studio-panel.js.map
