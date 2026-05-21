function t(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??y)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,E=$.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+A,P=`<${I}>`,R=document,M=()=>R.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,D=/>/g,W=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,H=/"/g,z=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,G=R.createTreeWalker(R,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=((t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=L:void 0!==l[1]?o=D:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=W):void 0!==l[3]&&(o=W):o===W?">"===l[0]?(o=n??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?W:'"'===l[3]?H:j):o===H||o===j?o=W:o===L||o===D?o=U:(o=W,n=void 0);const d=o===W&&t[e+1].startsWith("/>")?" ":"";r+=o===U?s+P:c>=0?(i.push(a),s.slice(0,c)+k+s.slice(c)+A+d):s+A+(-2===c?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]})(t,e);if(this.el=K.createElement(l,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=c[r++],s=i.getAttribute(t).split(A),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(A),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),G.nextNode(),a.push({type:2,index:++n});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===I)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const s=R.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===B)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=N(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??R).importNode(e,!0);G.currentNode=i;let n=G.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=G.nextNode(),r++)}return G.currentNode=R,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}let Y=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,n=0;for(const r of e)n===s.length?s.push(i=new t(this.O(M()),this.O(M()),this,this.options)):i=s[n],i._$AI(r),n++;n<s.length&&(this._$AR(i&&i._$AB.nextSibling,n),s.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,i[s+o],e,o),a===B&&(a=this._$AH[o]),r||=!N(a)||a!==this._$AH[o],a===F?t=F:t!==F&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}let st=class extends Q{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===B)return;const s=this._$AH,i=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==F&&(s===F||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(K,Y),($.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let ot=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Y(e.insertBefore(M(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ct=(t=lt,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,s)=>"object"==typeof s?ct(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function dt(t){return ht({...t,state:!0,attribute:!1})}function ut(t,e){return(e,s,i)=>((t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s))(e,s,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}function pt(t){return(e,s)=>(customElements.get(t)||customElements.define(t,e),e)}const ft=o`
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
`,gt=o`
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
`;class _t{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,s=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||s}}const mt=[ft,gt];class vt extends ot{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new _t(this),this._visible=!0,this._inView=!0}static{this.styles=mt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(s=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(s)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}function bt(t,e){const s=()=>e();return t.addEventListener("ready",s),()=>t.removeEventListener("ready",s)}t([ht({attribute:!1})],vt.prototype,"hass",void 0);const yt=/^[0-9a-fA-F]+$/;function wt(t,e,s,i){let n,r=!1;const o=async()=>{n?.(),n=void 0,r||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const i=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),s=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:s,channels:4===e.channels?4:3,scale:s/t.length,count:t.length}}const s=e.leds;if(!Array.isArray(s)||0===s.length)return null;const i=[];let n=3;for(const t of s){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&yt.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;i.push(e.toLowerCase())}}if(0===i.length)return null;let r=i.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(r=t)}return{leds_hex:i,n:r,channels:n,scale:r/i.length,count:i.length}}(e);i&&s({...i,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:i?.remote??!1}))};o();const a=bt(t,()=>{o()});return()=>{r=!0,a(),n?.(),n=void 0}}async function xt(t){t.connected||await new Promise((e,s)=>{const i=window.setTimeout(()=>{t.removeEventListener("ready",n),s(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(i),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function $t(t){await xt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,s=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${s}`)}}async function St(t,e){await xt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function Et(t,e,s,i){await xt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:s,full_response:i?.fullResponse??!1})).state??{}}function Ct(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function kt(t){if(!Array.isArray(t))return[];const e=[];for(const s of t){if("string"==typeof s){const t=s.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(s)&&e.push([Number(s[0])||0,Number(s[1])||0,Number(s[2])||0,Number(s[3])||0])}return e}function At(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}let It=class extends vt{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this.segments=[],this.selectedSegId=-1,this._status="waiting",this._hoverLed=-1,this._raf=0,this._onCanvasClick=t=>{const e=this._ledAtEvent(t);if(e<0)return;const s=this._segmentForLed(e);s<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:s,ledIndex:e},bubbles:!0,composed:!0}))},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this.requestUpdate(),this._lastPixels&&this._schedulePaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this.requestUpdate(),this._lastPixels&&this._schedulePaint())}}setFrame(t){t&&(this._lastPixels=function(t,e){const s=new Uint8ClampedArray(4*e);for(let i=0;i<e;i++){const e=Math.min(t.count-1,Math.max(0,Math.round(i/t.scale))),n=t.leds_hex[e]??"000000",r=4*i;8===n.length?(s[r]=parseInt(n.slice(0,2),16),s[r+1]=parseInt(n.slice(2,4),16),s[r+2]=parseInt(n.slice(4,6),16),s[r+3]=parseInt(n.slice(6,8),16)):(s[r]=parseInt(n.slice(0,2),16),s[r+1]=parseInt(n.slice(2,4),16),s[r+2]=parseInt(n.slice(4,6),16),s[r+3]=255)}return s}(t,this.pixelCount),this._status="live",this.requestUpdate(),this.isPowered&&this._schedulePaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._lastPixels&&this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0,this._canvas.addEventListener("click",this._onCanvasClick),this._canvas.addEventListener("mousemove",this._onCanvasMove),this._canvas.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{this._canvas?.removeEventListener("click",this._onCanvasClick),this._canvas?.removeEventListener("mousemove",this._onCanvasMove),this._canvas?.removeEventListener("mouseleave",this._onCanvasLeave)}))}_ledAtEvent(t){const e=this._canvas;if(!e)return-1;const s=e.getBoundingClientRect(),i=(t.clientX-s.left)/s.width;return Math.min(this.pixelCount-1,Math.max(0,Math.floor(i*this.pixelCount)))}_segmentForLed(t){for(const e of this.segments){const s=e.start??0,i=e.stop??e.len??this.pixelCount;if(t>=s&&t<i)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSelectedSeg(t){if(this.selectedSegId<0)return!1;const e=this.segments.find(t=>t.id===this.selectedSegId);if(!e)return!1;const s=e.start??0,i=e.stop??e.len??this.pixelCount;return t>=s&&t<i}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e||!this._lastPixels)return;const s=e.width,i=e.height,n=this.pixelCount,r=s/n;t.fillStyle="#111",t.fillRect(0,0,s,i);for(let e=0;e<n;e++){const s=4*e,n=this._lastPixels[s],o=this._lastPixels[s+1],a=this._lastPixels[s+2],l=this._ledInSelectedSeg(e),c=e===this._hoverLed;t.fillStyle=`rgb(${n},${o},${a})`,t.shadowColor=`rgba(${n},${o},${a},0.85)`,t.shadowBlur=this.remote.state.disableBloom?0:l||c?10:6;const h=l?0:2,d=l?i:i-4;t.fillRect(e*r,h,Math.max(1,r-1),d),l&&(t.strokeStyle="rgba(255,255,255,0.9)",t.lineWidth=2,t.strokeRect(e*r+.5,.5,Math.max(1,r-2),i-1))}t.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return q`
      <div class="wrap" role="img" aria-label="Live LED strip preview — tap a pixel to select its segment">
        <canvas
          width=${t}
          height=${this.heightPx}
          style="cursor: crosshair"
        ></canvas>
        ${"live"!==this._status?q`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...mt,o`
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      canvas {
        display: block;
        width: 100%;
        height: auto;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.35);
      }
    `]}};t([ht({type:Number})],It.prototype,"heightPx",void 0),t([ht({type:Number})],It.prototype,"pixelCount",void 0),t([ht({type:Array})],It.prototype,"segments",void 0),t([ht({type:Number})],It.prototype,"selectedSegId",void 0),t([dt()],It.prototype,"_status",void 0),t([dt()],It.prototype,"_hoverLed",void 0),It=t([pt("wled-strip-preview")],It);const Pt="wled_studio.segment_snapshot",Rt="wled_studio.merge_for_effects",Mt=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function Nt(t){try{const e=localStorage.getItem(t);if(!e)return{};const s=JSON.parse(e);return"object"==typeof s&&s?s:{}}catch{return{}}}function Ot(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Tt(t){return Boolean(Nt(Rt)[t])}function Ut(t,e){const s=Nt(Rt);e?s[t]=!0:delete s[t],Ot(Rt,s)}function Lt(t){return Nt(Pt)[t]??null}function Dt(t){return{seg:t.segments.map(t=>function(t){const e=t,s={id:t.id};for(const t of Mt){const i=e[t];void 0!==i&&(s[t]=i)}return s}(t))}}function Wt(t,e){const s=t.find(t=>0===t.id);return s?[0]:t.length?[t[0].id]:[0]}function jt(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:kt(t.col),awm:t.awm};return JSON.stringify(e)}function Ht(t,e,s){let i,n=null,r=0;const o=()=>{i&&clearTimeout(i),i=setTimeout(()=>{(async()=>{try{const i=((await St(t,e)).segments??[]).find(t=>t.id===r);if(!i||!n)return;const o=jt(n);if(o===jt(i))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(kt(t.col))!==JSON.stringify(kt(e.col))}(n,i)?s(i):s(i,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=function(t,e,s=100){let i,n,r;const o=()=>{if(i&&clearTimeout(i),n&&clearTimeout(n),i=n=void 0,r){const e=r;r=void 0,t(...e)}},a=(...t)=>{r=t,i&&clearTimeout(i),i=setTimeout(o,e),n||(n=setTimeout(o,s))};return a.cancel=()=>{i&&clearTimeout(i),n&&clearTimeout(n),i=n=void 0,r=void 0},a}((i,a)=>{n=a,r=a.id,Et(t,e,i,{fullResponse:!0}).then(t=>{const e=t.seg,s=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;s&&(n={...a,...s,id:a.id}),o()}).catch(()=>{s(a,"Failed to apply state to WLED")})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),i&&clearTimeout(i)}}}var zt,qt,Bt,Ft,Vt,Gt={},Jt=[],Kt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Zt(t,e){for(var s in e)t[s]=e[s];return t}function Xt(t){var e=t.parentNode;e&&e.removeChild(t)}function Yt(t,e,s){var i,n,r,o,a=arguments;if(e=Zt({},e),arguments.length>3)for(s=[s],i=3;i<arguments.length;i++)s.push(a[i]);if(null!=s&&(e.children=s),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return o=e.key,null!=(r=e.ref)&&delete e.ref,null!=o&&delete e.key,Qt(t,e,o,r)}function Qt(t,e,s,i){var n={type:t,props:e,key:s,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return zt.vnode&&zt.vnode(n),n}function te(t){return t.children}function ee(t,e){this.props=t,this.context=e}function se(t,e){if(null==e)return t.__p?se(t.__p,t.__p.__k.indexOf(t)+1):null;for(var s;e<t.__k.length;e++)if(null!=(s=t.__k[e])&&null!=s.__e)return s.__e;return"function"==typeof t.type?se(t):null}function ie(t){var e,s;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(s=t.__k[e])&&null!=s.__e){t.__e=t.__c.base=s.__e;break}return ie(t)}}function ne(t){(!t.__d&&(t.__d=!0)&&1===qt.push(t)||Ft!==zt.debounceRendering)&&(Ft=zt.debounceRendering,(zt.debounceRendering||Bt)(re))}function re(){var t,e,s,i,n,r,o,a;for(qt.sort(function(t,e){return e.__v.__b-t.__v.__b});t=qt.pop();)t.__d&&(s=void 0,i=void 0,r=(n=(e=t).__v).__e,o=e.__P,a=e.u,e.u=!1,o&&(s=[],i=de(o,n,Zt({},n),e.__n,void 0!==o.ownerSVGElement,null,s,a,null==r?se(n):r),ue(s,n),i!=r&&ie(n)))}function oe(t,e,s,i,n,r,o,a,l){var c,h,d,u,p,f,g,_=s&&s.__k||Jt,m=_.length;if(a==Gt&&(a=null!=r?r[0]:m?se(s,0):null),c=0,e.__k=ae(e.__k,function(s){if(null!=s){if(s.__p=e,s.__b=e.__b+1,null===(d=_[c])||d&&s.key==d.key&&s.type===d.type)_[c]=void 0;else for(h=0;h<m;h++){if((d=_[h])&&s.key==d.key&&s.type===d.type){_[h]=void 0;break}d=null}if(u=de(t,s,d=d||Gt,i,n,r,o,null,a,l),(h=s.ref)&&d.ref!=h&&(g||(g=[])).push(h,s.__c||u,s),null!=u){if(null==f&&(f=u),null!=s.l)u=s.l,s.l=null;else if(r==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,h=0;(p=p.nextSibling)&&h<m;h+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return c++,s}),e.__e=f,null!=r&&"function"!=typeof e.type)for(c=r.length;c--;)null!=r[c]&&Xt(r[c]);for(c=m;c--;)null!=_[c]&&ge(_[c],_[c]);if(g)for(c=0;c<g.length;c++)fe(g[c],g[++c],g[++c])}function ae(t,e,s){if(null==s&&(s=[]),null==t||"boolean"==typeof t)e&&s.push(e(null));else if(Array.isArray(t))for(var i=0;i<t.length;i++)ae(t[i],e,s);else s.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return Qt(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=Qt(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return s}function le(t,e,s){"-"===e[0]?t.setProperty(e,s):t[e]="number"==typeof s&&!1===Kt.test(e)?s+"px":null==s?"":s}function ce(t,e,s,i,n){var r,o,a,l,c;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(r=t.style,"string"==typeof s)r.cssText=s;else{if("string"==typeof i&&(r.cssText="",i=null),i)for(o in i)s&&o in s||le(r,o,"");if(s)for(a in s)i&&s[a]===i[a]||le(r,a,s[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),s?(i||t.addEventListener(e,he,l),(t.t||(t.t={}))[e]=s):t.removeEventListener(e,he,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==s?"":s:"function"!=typeof s&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==s||!1===s?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),s):null==s||!1===s?t.removeAttribute(e):t.setAttribute(e,s))}function he(t){return this.t[t.type](zt.event?zt.event(t):t)}function de(t,e,s,i,n,r,o,a,l,c){var h,d,u,p,f,g,_,m,v,b,y=e.type;if(void 0!==e.constructor)return null;(h=zt.__b)&&h(e);try{t:if("function"==typeof y){if(m=e.props,v=(h=y.contextType)&&i[h.__c],b=h?v?v.props.value:h.__p:i,s.__c?_=(d=e.__c=s.__c).__p=d.__E:("prototype"in y&&y.prototype.render?e.__c=d=new y(m,b):(e.__c=d=new ee(m,b),d.constructor=y,d.render=_e),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=b,d.__n=i,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=y.getDerivedStateFromProps&&Zt(d.__s==d.state?d.__s=Zt({},d.__s):d.__s,y.getDerivedStateFromProps(m,d.__s)),u)null==y.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==y.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,b),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,b)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==s.__e?l:s.__e:null,e.__k=s.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,b)}for(p=d.props,f=d.state,d.context=b,d.props=m,d.state=d.__s,(h=zt.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=ae(null!=h&&h.type==te&&null==h.key?h.props.children:h),null!=d.getChildContext&&(i=Zt(Zt({},i),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(p,f)),oe(t,e,s,i,n,r,o,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,f,g),_&&(d.__E=d.__p=null)}else e.__e=pe(s.__e,e,s,i,n,r,o,c);(h=zt.diffed)&&h(e)}catch(t){zt.__e(t,e,s)}return e.__e}function ue(t,e){for(var s;s=t.pop();)try{s.componentDidMount()}catch(t){zt.__e(t,s.__v)}zt.__c&&zt.__c(e)}function pe(t,e,s,i,n,r,o,a){var l,c,h,d,u=s.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=r)for(l=0;l<r.length;l++)if(null!=(c=r[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,r[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),r=null}return null===e.type?u!==p&&(null!=r&&(r[r.indexOf(t)]=null),t.data=p):e!==s&&(null!=r&&(r=Jt.slice.call(t.childNodes)),h=(u=s.props||Gt).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,s,i,n){var r;for(r in s)r in e||ce(t,r,null,s[r],i);for(r in e)n&&"function"!=typeof e[r]||"value"===r||"checked"===r||s[r]===e[r]||ce(t,r,e[r],s[r],i)}(t,p,u,n,a),e.__k=e.props.children,d||oe(t,e,s,i,"foreignObject"!==e.type&&n,r,o,Gt,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function fe(t,e,s){try{"function"==typeof t?t(e):t.current=e}catch(t){zt.__e(t,s)}}function ge(t,e,s){var i,n,r;if(zt.unmount&&zt.unmount(t),(i=t.ref)&&fe(i,null,e),s||"function"==typeof t.type||(s=null!=(n=t.__e)),t.__e=t.l=null,null!=(i=t.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(t){zt.__e(t,e)}i.base=i.__P=null}if(i=t.__k)for(r=0;r<i.length;r++)i[r]&&ge(i[r],e,s);null!=n&&Xt(n)}function _e(t,e,s){return this.constructor(t,s)}function me(t,e,s){return e&&function(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(t.prototype,e),t}function ve(){return ve=Object.assign||function(t){for(var e=arguments,s=1;s<arguments.length;s++){var i=e[s];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},ve.apply(this,arguments)}zt={},ee.prototype.setState=function(t,e){var s=this.__s!==this.state&&this.__s||(this.__s=Zt({},this.state));("function"!=typeof t||(t=t(s,this.props)))&&Zt(s,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),ne(this))},ee.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,ne(this))},ee.prototype.render=te,qt=[],Bt="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ft=zt.debounceRendering,zt.__e=function(t,e,s){for(var i;e=e.__p;)if((i=e.__c)&&!i.__p)try{if(i.constructor&&null!=i.constructor.getDerivedStateFromError)i.setState(i.constructor.getDerivedStateFromError(t));else{if(null==i.componentDidCatch)continue;i.componentDidCatch(t)}return ne(i.__E=i)}catch(e){t=e}throw t},Vt=Gt;var be="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ye="[\\s|\\(]+("+be+")[,|\\s]+("+be+")[,|\\s]+("+be+")\\s*\\)?",we="[\\s|\\(]+("+be+")[,|\\s]+("+be+")[,|\\s]+("+be+")[,|\\s]+("+be+")\\s*\\)?",xe=new RegExp("rgb"+ye),$e=new RegExp("rgba"+we),Se=new RegExp("hsl"+ye),Ee=new RegExp("hsla"+we),Ce="^(?:#?|0x?)",ke="([0-9a-fA-F]{1})",Ae="([0-9a-fA-F]{2})",Ie=new RegExp(Ce+ke+ke+ke+"$"),Pe=new RegExp(Ce+ke+ke+ke+ke+"$"),Re=new RegExp(Ce+Ae+Ae+Ae+"$"),Me=new RegExp(Ce+Ae+Ae+Ae+Ae+"$"),Ne=Math.log,Oe=Math.round,Te=Math.floor;function Ue(t,e,s){return Math.min(Math.max(t,e),s)}function Le(t,e){var s=t.indexOf("%")>-1,i=parseFloat(t);return s?e/100*i:i}function De(t){return parseInt(t,16)}function We(t){return t.toString(16).padStart(2,"0")}var je=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ve({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,s){var i;this[t]=ve({},this[t],((i={})[e]=s,i))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,s=t.s/100,i=t.v/100,n=Te(e),r=e-n,o=i*(1-s),a=i*(1-r*s),l=i*(1-(1-r)*s),c=n%6,h=[l,i,i,a,o,o][c],d=[o,o,l,i,i,a][c];return{r:Ue(255*[i,a,o,o,l,i][c],0,255),g:Ue(255*h,0,255),b:Ue(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,s=t.g/255,i=t.b/255,n=Math.max(e,s,i),r=Math.min(e,s,i),o=n-r,a=0,l=n,c=0===n?0:o/n;switch(n){case r:a=0;break;case e:a=(s-i)/o+(s<i?6:0);break;case s:a=(i-e)/o+2;break;case i:a=(e-s)/o+4}return{h:60*a%360,s:Ue(100*c,0,100),v:Ue(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,s=t.v/100,i=(2-e)*s,n=i<=1?i:2-i,r=n<1e-9?0:e*s/n;return{h:t.h,s:Ue(100*r,0,100),l:Ue(50*i,0,100)}},t.hslToHsv=function(t){var e=2*t.l,s=t.s*(e<=100?e:200-e)/100,i=e+s<1e-9?0:2*s/(e+s);return{h:t.h,s:Ue(100*i,0,100),v:Ue((e+s)/2,0,100)}},t.kelvinToRgb=function(t){var e,s,i,n=t/100;return n<66?(e=255,s=-155.25485562709179-.44596950469579133*(s=n-2)+104.49216199393888*Ne(s),i=n<20?0:.8274096064007395*(i=n-10)-254.76935184120902+115.67994401066147*Ne(i)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*Ne(e),s=325.4494125711974+.07943456536662342*(s=n-50)-28.0852963507957*Ne(s),i=255),{r:Ue(Te(e),0,255),g:Ue(Te(s),0,255),b:Ue(Te(i),0,255)}},t.rgbToKelvin=function(e){for(var s,i=e.r,n=e.b,r=2e3,o=4e4;o-r>.4;){s=.5*(o+r);var a=t.kelvinToRgb(s);a.b/a.r>=n/i?o=s:r=s}return s},me(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ve({},e,t),this.onChange){var s={h:!1,v:!1,s:!1,a:!1};for(var i in e)s[i]=t[i]!=e[i];this.$=t,(s.h||s.s||s.v||s.a)&&this.onChange(this,s)}else this.$=t}},{key:"hsva",get:function(){return ve({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ve({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ve({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ve({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ve({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),s=e.r,i=e.g,n=e.b;return{r:Oe(s),g:Oe(i),b:Oe(n)}},set:function(e){this.hsv=ve({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ve({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),s=e.h,i=e.s,n=e.l;return{h:Oe(s),s:Oe(i),l:Oe(n)}},set:function(e){this.hsv=ve({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ve({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,s,i,n,r=1;if((e=xe.exec(t))?(s=Le(e[1],255),i=Le(e[2],255),n=Le(e[3],255)):(e=$e.exec(t))&&(s=Le(e[1],255),i=Le(e[2],255),n=Le(e[3],255),r=Le(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:s,g:i,b:n,a:r}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+We(t.r)+We(t.g)+We(t.b)},set:function(t){var e,s,i,n,r=255;if((e=Ie.exec(t))?(s=17*De(e[1]),i=17*De(e[2]),n=17*De(e[3])):(e=Pe.exec(t))?(s=17*De(e[1]),i=17*De(e[2]),n=17*De(e[3]),r=17*De(e[4])):(e=Re.exec(t))?(s=De(e[1]),i=De(e[2]),n=De(e[3])):(e=Me.exec(t))&&(s=De(e[1]),i=De(e[2]),n=De(e[3]),r=De(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:s,g:i,b:n,a:r/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+We(t.r)+We(t.g)+We(t.b)+We(Te(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,s,i,n,r=1;if((e=Se.exec(t))?(s=Le(e[1],360),i=Le(e[2],100),n=Le(e[3],100)):(e=Ee.exec(t))&&(s=Le(e[1],360),i=Le(e[2],100),n=Le(e[3],100),r=Le(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:s,s:i,l:n,a:r}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function He(t){var e,s=t.width,i=t.sliderSize,n=t.borderWidth,r=t.handleRadius,o=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return i=null!=(e=i)?e:2*o+2*r,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:s-2*o-2*r,width:s,height:s,cx:s/2,cy:s/2,radius:s/2-n/2}:{handleStart:i/2,handleRange:s-i,radius:i/2,x:0,y:0,width:l?i:s,height:l?s:i}}function ze(t,e){var s=He(t),i=s.width,n=s.height,r=s.handleRange,o=s.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var s=e.hsva,i=e.rgb;switch(t.sliderType){case"red":return i.r/2.55;case"green":return i.g/2.55;case"blue":return i.b/2.55;case"alpha":return 100*s.a;case"kelvin":var n=t.minTemperature,r=t.maxTemperature-n,o=(e.kelvin-n)/r*100;return Math.max(0,Math.min(o,100));case"hue":return s.h/=3.6;case"saturation":return s.s;default:return s.v}}(t,e),c=a?i/2:n/2,h=o+l/100*r;return a&&(h=-1*h+r+2*o),{x:a?c:h,y:a?h:c}}var qe,Be=2*Math.PI,Fe=function(t,e){return Math.sqrt(t*t+e*e)};function Ve(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Ge(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Je(t,e,s){var i=t.wheelAngle,n=t.wheelDirection;return s&&"clockwise"===n?e=i+e:"clockwise"===n?e=360-i+e:s&&"anticlockwise"===n?e=i+180-e:"anticlockwise"===n&&(e=i-e),function(t,e){return(t%e+e)%e}(e,360)}function Ke(t,e,s){var i=Ge(t),n=i.cx,r=i.cy,o=Ve(t);e=n-e,s=r-s;var a=Je(t,Math.atan2(-s,-e)*(360/Be)),l=Math.min(Fe(e,s),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function Ze(t){var e=t.width,s=t.boxHeight;return{width:e,height:null!=s?s:e,radius:t.padding+t.handleRadius}}function Xe(t,e,s){var i=Ze(t),n=i.width,r=i.height,o=i.radius,a=(e-o)/(n-2*o)*100,l=(s-o)/(r-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function Ye(t){qe||(qe=document.getElementsByTagName("base"));var e=window.navigator.userAgent,s=/^((?!chrome|android).)*safari/i.test(e),i=/iPhone|iPod|iPad/i.test(e),n=window.location;return(s||i)&&qe.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function Qe(t,e,s,i){for(var n=0;n<i.length;n++){var r=i[n].x-e,o=i[n].y-s;if(Math.sqrt(r*r+o*o)<t.handleRadius)return n}return null}function ts(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function es(t,e,s){return t+"-gradient("+e+", "+s.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function ss(t){return"string"==typeof t?t:t+"px"}var is=["mousemove","touchmove","mouseup","touchend"],ns=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),s={onMouseDown:e,ontouchstart:e},i="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,r={overflow:"visible",display:i?"inline-block":"block"};return t.index>0&&(r[i?"marginLeft":"marginTop"]=n),Yt(te,null,t.children(this.uid,s,r))},e.prototype.handleEvent=function(t){var e=this,s=this.props.onInput,i=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,r=n.clientX-i.left,o=n.clientY-i.top;switch(t.type){case"mousedown":case"touchstart":!1!==s(r,o,0)&&is.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":s(r,o,1);break;case"mouseup":case"touchend":s(r,o,2),is.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(ee);function rs(t){var e=t.r,s=t.url,i=e,n=e;return Yt("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+ss(t.x)+", "+ss(t.y)+")",willChange:"transform",top:ss(-e),left:ss(-e),width:ss(2*e),height:ss(2*e),position:"absolute",overflow:"visible"}},s&&Yt("use",Object.assign({xlinkHref:Ye(s)},t.props)),!s&&Yt("circle",{cx:i,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!s&&Yt("circle",{cx:i,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function os(t){var e=t.activeIndex,s=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,i=He(t),n=i.width,r=i.height,o=i.radius,a=ze(t,s),l=function(t,e){var s=e.hsv,i=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+i.g+","+i.b+")"],[100,"rgb(255,"+i.g+","+i.b+")"]];case"green":return[[0,"rgb("+i.r+",0,"+i.b+")"],[100,"rgb("+i.r+",255,"+i.b+")"]];case"blue":return[[0,"rgb("+i.r+","+i.g+",0)"],[100,"rgb("+i.r+","+i.g+",255)"]];case"alpha":return[[0,"rgba("+i.r+","+i.g+","+i.b+",0)"],[100,"rgb("+i.r+","+i.g+","+i.b+")"]];case"kelvin":for(var n=[],r=t.minTemperature,o=t.maxTemperature,a=o-r,l=r,c=0;l<o;l+=a/8,c+=1){var h=je.kelvinToRgb(l),d=h.r,u=h.g,p=h.b;n.push([12.5*c,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var f=je.hsvToHsl({h:s.h,s:0,v:s.v}),g=je.hsvToHsl({h:s.h,s:100,v:s.v});return[[0,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]];default:var _=je.hsvToHsl({h:s.h,s:s.s,v:100});return[[0,"#000"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]]}}(t,s);return Yt(ns,Object.assign({},t,{onInput:function(e,i,n){var r=function(t,e,s){var i,n=He(t),r=n.handleRange,o=n.handleStart;i="horizontal"===t.layoutDirection?-1*s+r+o:e-o,i=Math.max(Math.min(i,r),0);var a=Math.round(100/r*i);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,i);t.parent.inputActive=!0,s[t.sliderType]=r,t.onInput(n,t.id)}}),function(e,i,c){return Yt("div",Object.assign({},i,{className:"IroSlider",style:Object.assign({},{position:"relative",width:ss(n),height:ss(r),borderRadius:ss(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Yt("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:ss(o),background:es("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},ts(t))}),Yt(rs,{isActive:!0,index:s.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function as(t){var e=Ze(t),s=e.width,i=e.height,n=e.radius,r=t.colors,o=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=r.map(function(e){return function(t,e){var s=Ze(t),i=s.width,n=s.height,r=s.radius,o=e.hsv,a=r,l=i-2*r,c=n-2*r;return{x:a+o.s/100*l,y:a+(c-o.v/100*c)}}(t,e)});return Yt(ns,Object.assign({},t,{onInput:function(e,s,i){if(0===i){var n=Qe(t,e,s,h);null!==n?o.setActiveColor(n):(o.inputActive=!0,l.hsv=Xe(t,e,s),t.onInput(i,t.id))}else 1===i&&(o.inputActive=!0,l.hsv=Xe(t,e,s));t.onInput(i,t.id)}}),function(e,o,a){return Yt("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:ss(s),height:ss(i),position:"relative"},a)}),Yt("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:ss(n)},ts(t),{background:es("linear","to bottom",c[1])+","+es("linear","to right",c[0])})}),r.filter(function(t){return t!==l}).map(function(e){return Yt(rs,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Yt(rs,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}rs.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},os.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function ls(t){var e=Ge(t).width,s=t.colors;t.borderWidth;var i=t.parent,n=t.color,r=n.hsv,o=s.map(function(e){return function(t,e){var s=e.hsv,i=Ge(t),n=i.cx,r=i.cy,o=Ve(t),a=(180+Je(t,s.h,!0))*(Be/360),l=s.s/100*o,c="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:r+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Yt(ns,Object.assign({},t,{onInput:function(e,s,r){if(0===r){if(!function(t,e,s){var i=Ge(t),n=i.cx,r=i.cy,o=t.width/2;return Fe(n-e,r-s)<o}(t,e,s))return!1;var a=Qe(t,e,s,o);null!==a?i.setActiveColor(a):(i.inputActive=!0,n.hsv=Ke(t,e,s),t.onInput(r,t.id))}else 1===r&&(i.inputActive=!0,n.hsv=Ke(t,e,s));t.onInput(r,t.id)}}),function(i,l,c){return Yt("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:ss(e),height:ss(e),position:"relative"},c)}),Yt("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Yt("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Yt("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-r.v/100})}),Yt("div",{className:"IroWheelBorder",style:Object.assign({},a,ts(t))}),s.filter(function(t){return t!==n}).map(function(e){return Yt(rs,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})}),Yt(rs,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[n.index].x,y:o[n.index].y}))})}var cs=function(t){function e(e){var s=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return s.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var s=new je(t,this.onColorChange.bind(this));this.colors.splice(e,0,s),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",s)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var s=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return s.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var s=this,i=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(i[t]||(i[t]=[])).push(e),s.deferredEvents[t]&&(s.deferredEvents[t].forEach(function(t){e.apply(null,t)}),s.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var s=this;(Array.isArray(t)?t:[t]).forEach(function(t){var i=s.events[t];i&&i.splice(i.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,s=[],i=arguments.length-1;i-- >0;)s[i]=arguments[i+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,s)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,s=[],i=arguments.length-1;i-- >0;)s[i]=arguments[i+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(s)),(n[t]||(n[t]=[])).push(s)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var s=this,i=e.layout;return Array.isArray(i)||(i=[{component:ls},{component:os}],e.transparency&&i.push({component:os,options:{sliderType:"alpha"}})),Yt("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},i.map(function(t,i){var n=t.component,r=t.options;return Yt(n,Object.assign({},e,r,{ref:void 0,onInput:s.emitInputEvent.bind(s),parent:s,index:i}))}))},e}(ee);cs.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var hs,ds,us,ps=(ds=function(t,e){var s,i=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(s.base),s.onMount(e)}return function(t,e,s){var i,n,r;zt.__p&&zt.__p(t,e),n=(i=s===Vt)?null:e.__k,t=Yt(te,null,[t]),r=[],de(e,e.__k=t,n||Gt,Gt,void 0!==e.ownerSVGElement,n?null:Jt.slice.call(e.childNodes),r,!1,Gt,i),ue(r,t)}(Yt(hs,Object.assign({},{ref:function(t){return s=t}},e)),i),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),s},ds.prototype=(hs=cs).prototype,Object.assign(ds,hs),ds.__component=hs,ds);!function(t){var e;t.version="5.5.2",t.Color=je,t.ColorPicker=ps,(e=t.ui||(t.ui={})).h=Yt,e.ComponentBase=ns,e.Handle=rs,e.Slider=os,e.Wheel=ls,e.Box=as}(us||(us={}));var fs=us;let gs=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this._suppress=!1}updated(){this._host&&!this._picker&&(this._picker=fs.ColorPicker(this._host,{width:140,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"var(--divider-color, #444)",layout:[{component:fs.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}willUpdate(){this._picker&&this._syncPicker()}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}render(){return q`
      <div class="wrap">
        <div class="wheel-host" aria-label="Color wheel"></div>
        <div class="extras">
          ${this.showWhite?q`
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
            Auto-calculate W
            <select @change=${this._onAwm} aria-label="Auto-calculate W channel from RGB">
              <option value="0" ?selected=${0===this.awm}>Manual</option>
              <option value="1" ?selected=${1===this.awm}>Brighter</option>
              <option value="2" ?selected=${2===this.awm}>Accurate</option>
              <option value="3" ?selected=${3===this.awm}>Dual</option>
              <option value="4" ?selected=${4===this.awm}>Max</option>
            </select>
          </label>
          <p class="w-hint">
            Auto-calculate W is saved in WLED LED settings (device-wide). The W slider sets
            manual white in the segment color — full control in Manual; in Accurate, WLED still
            derives white from RGB and the slider can add extra W.
          </p>
        </div>
      </div>
    `}static{this.styles=[...mt,o`
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
      .w-hint {
        margin: 0;
        font-size: 0.7rem;
        opacity: 0.72;
        line-height: 1.35;
        max-width: 18rem;
      }
    `]}};t([ht({type:Array})],gs.prototype,"rgb",void 0),t([ht({type:Number})],gs.prototype,"white",void 0),t([ht({type:Number})],gs.prototype,"awm",void 0),t([ht({type:Boolean})],gs.prototype,"showWhite",void 0),t([ut(".wheel-host")],gs.prototype,"_host",void 0),gs=t([pt("wled-color-wheel-rgbw")],gs);function _s(t,e="strip",s,i=0){let n=String(t);return i&&(n=`${n}_p${i}`),s?.trim()&&(n=`${n}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(s)}`),`${n}_${e}.webp`}function ms(t,e,s="strip",i,n,r){if(!t||e<0)return;const o=void 0!==r?function(t,e,s="strip",i){const n=e instanceof Set?e:new Set(e);if(!n.size)return;const r=[_s(t,s,i),_s(t,s)];for(const t of r)if(n.has(t))return t;const o=`${t}_`,a=`_${s}.webp`;for(const t of n)if(t.startsWith(o)&&t.endsWith(a))return t}(e,r,s,i):_s(e,s,i);return o?function(t,e){if(!t.startsWith("/"))return t;const s=e?.auth?.data?.access_token;if(!s)return t;const i=t.includes("?")?"&":"?";return`${t}${i}auth=${encodeURIComponent(s)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,o),n):void 0}const vs={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Sound",palette:"Palette"};function bs(t){return void 0!==t.Solid?t.Solid:0}const ys="wled_studio.recent_effects";function ws(t){try{const e=localStorage.getItem(t);if(!e)return{};const s=JSON.parse(e);return"object"==typeof s&&s?s:{}}catch{return{}}}function xs(t){return t?ws(ys)[t]??[]:[]}function $s(t,e,s,i){if(!t)return[];if(e===(i.solidId??0))return xs(t);const n=ws(ys),r=(n[t]??[]).filter(t=>t.id!==e);return r.unshift({id:e,name:s}),n[t]=r.slice(0,10),function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(ys,n),n[t]}let Ss=class extends vt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,s=this._hover&&t?t:e;return q`
      <button
        class="tile"
        type="button"
        aria-label=${this.label||`Effect ${this.fxId}`}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${s?q`<img
              class="thumb"
              src=${s}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:q`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...mt,o`
      .tile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        min-width: 72px;
        max-width: 96px;
      }
      .thumb,
      .placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 4px;
        background: var(--secondary-background-color, #333);
      }
      .placeholder {
        display: block;
      }
      .label {
        font-size: 0.7rem;
        line-height: 1.2;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `]}};t([ht({type:Number})],Ss.prototype,"fxId",void 0),t([ht()],Ss.prototype,"thumbUrl",void 0),t([ht()],Ss.prototype,"thumbUrlAnimated",void 0),t([ht()],Ss.prototype,"label",void 0),t([dt()],Ss.prototype,"_hover",void 0),Ss=t([pt("wled-effect-tile")],Ss);let Es=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this._category="all",this._recentEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){this._recentEntries=xs(this.controllerId)}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=function(t,e=72,s=6,i=10){if(t<=0)return 1;const n=e+s;return Math.max(1,Math.min(i,Math.floor((t+s)/n)))}(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),s=bs(this.effectsByName),i=e.filter(e=>!!function(t,e,s,i,n){if("all"===s)return!0;const r=i[e]??null,o=t.toLowerCase();return"solid"===s?e===bs(n):"2d"===s?"2"===r||o.includes("2d"):"1d"===s?"2"!==r&&!o.includes("2d"):"sound"===s?"v"===r||"f"===r:"palette"!==s||o.includes("palette")||o.includes("colorloop")||o.includes("pride")||o.includes("cycle")}(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),n=this.showRecents&&!t&&this._recentEntries.length>0,r=this._recentEntries.slice(0,this._recentVisible);return q`
      <div class="wrap">
        ${n?q`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${r.map(t=>{const e=t.id,i=t.name,n=this.soundFlags[e],r=e===this.selectedFx;return q`
                      <button
                        type="button"
                        class="recent-chip ${r?"active":""}"
                        aria-pressed=${r}
                        @click=${()=>this._pick(e,s)}
                      >
                        ${i}
                        ${"v"===n?q`<span class="badge">♪</span>`:null}
                        ${"f"===n?q`<span class="badge">♫</span>`:null}
                        ${"2"===n?q`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>q`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t}
                @click=${()=>{this._category=t}}
              >
                ${vs[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===i.length?q`<p class="empty">No effects match this filter.</p>`:i.map(t=>{const e=this.effectsByName[t],i=this.soundFlags[e],n=e===this.selectedFx,r=ms(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames);return r?q`
                    <wled-effect-tile
                      class="chip-tile ${n?"active":""}"
                      role="option"
                      aria-selected=${n}
                      .fxId=${e}
                      .thumbUrl=${r}
                      .label=${t+("v"===i?" ♪":"")+("f"===i?" ♫":"")+("2"===i?" 2D":"")}
                      @click=${()=>this._pick(e,s)}
                    ></wled-effect-tile>
                  `:q`
                  <button
                    type="button"
                    class="chip ${n?"active":""}"
                    role="option"
                    aria-selected=${n}
                    @click=${()=>this._pick(e,s)}
                  >
                    ${t}
                    ${"v"===i?q`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===i?q`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===i?q`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <p class="count">${i.length} effects</p>
      </div>
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=$s(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...mt,o`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .recent-block {
        margin-bottom: 2px;
      }
      .recent-label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
      }
      .recent-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 6px;
        overflow: hidden;
      }
      .recent-chip {
        flex: 1 1 0;
        min-width: 0;
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 6px 10px;
        background: var(--secondary-background-color, transparent);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .recent-chip.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .cat {
        border: 1px solid var(--divider-color, #555);
        border-radius: 999px;
        padding: 4px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .cat.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
        gap: 8px;
        max-height: min(280px, 42vh);
        min-height: 132px;
        overflow-y: auto;
        padding: 4px 2px;
        scrollbar-width: thin;
        align-content: start;
      }
      .chip {
        border: 1px solid var(--divider-color, #555);
        border-radius: 10px;
        padding: 8px 10px;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        text-align: left;
        min-height: 2.5rem;
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
      .chip-tile {
        min-height: 2.5rem;
      }
      .chip-tile.active .tile {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .empty {
        grid-column: 1 / -1;
        margin: 0;
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        opacity: 0.55;
      }
    `]}};t([ht({type:Object})],Es.prototype,"effectsByName",void 0),t([ht({type:Array})],Es.prototype,"soundFlags",void 0),t([ht({type:Number})],Es.prototype,"selectedFx",void 0),t([ht({type:String})],Es.prototype,"filter",void 0),t([ht()],Es.prototype,"controllerId",void 0),t([ht()],Es.prototype,"fwVer",void 0),t([ht({type:Array})],Es.prototype,"thumbBasenames",void 0),t([ht({type:Boolean})],Es.prototype,"toggleOff",void 0),t([ht({type:Boolean})],Es.prototype,"showRecents",void 0),t([dt()],Es.prototype,"_category",void 0),t([dt()],Es.prototype,"_recentEntries",void 0),t([dt()],Es.prototype,"_recentVisible",void 0),Es=t([pt("wled-effect-chips")],Es);let Cs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=Tt(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=Tt(this.controllerId))}render(){const t=Lt(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return q`
      <label class="merge-row ${this._merged?"on":""}">
        <input
          type="checkbox"
          .checked=${this._merged}
          ?disabled=${this._busy||!this.connection}
          @change=${this._onToggle}
        />
        <span class="merge-label">
          <strong>Merge for effects</strong>
          <span class="sub">
            Combine highlighted segments into one span so chase-style effects run
            across LED indices. Uncheck to restore the layout saved when you merged.
          </span>
          ${e?q`<span class="saved">${e}</span>`:null}
        </span>
      </label>
      ${this._error?q`<p class="err">${this._error}</p>`:null}
      ${this._busy?q`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await St(this.connection,this.controllerId),e=t.segments??this.segments,s=t.info?.leds,i=Number(s?.count)||this.pixelCount;!function(t,e,s){const i={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:s},n=Nt(Pt);n[t]=i,Ot(Pt,n)}(this.controllerId,e,i);const n=function(t,e,s){const i=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],n=s?.length?new Set(s):null,r=n?i.filter(t=>n.has(t.id)):i,o=r.filter(t=>(t.stop??0)>(t.start??0)),a=o.length?o:r.length?r:i,l=Math.min(...a.map(t=>t.start??0)),c=Math.max(...a.map(t=>t.stop??e)),h=a[0],d={id:0,start:l,stop:c,on:!1!==h.on,sel:!0,bri:h.bri??255,fx:h.fx??0,n:"Merged (effects)"};void 0!==h.col&&(d.col=h.col),void 0!==h.pal&&(d.pal=h.pal);const u=[d];for(const t of i){if(0===t.id)continue;const e=t.stop??t.start??0;u.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:u}}(e,i,this.editIds.length?this.editIds:void 0);await Et(this.connection,this.controllerId,n,{fullResponse:!0}),Ut(this.controllerId,!0),this._merged=!0}else{const t=Lt(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await Et(this.connection,this.controllerId,Dt(t),{fullResponse:!0}),Ut(this.controllerId,!1),function(t){const e=Nt(Pt);delete e[t],Ot(Pt,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[...mt,o`
      .merge-row {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px 12px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        cursor: pointer;
      }
      .merge-row.on {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      }
      .merge-row input {
        margin-top: 4px;
        flex-shrink: 0;
      }
      .merge-label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .sub {
        opacity: 0.75;
        font-size: 0.78rem;
        line-height: 1.35;
        font-weight: normal;
      }
      .saved {
        font-size: 0.72rem;
        opacity: 0.6;
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.8rem;
        margin: 4px 0 0;
      }
      .busy {
        font-size: 0.8rem;
        opacity: 0.7;
        margin: 4px 0 0;
      }
    `]}};t([ht({attribute:!1})],Cs.prototype,"connection",void 0),t([ht()],Cs.prototype,"controllerId",void 0),t([ht({type:Array})],Cs.prototype,"segments",void 0),t([ht({type:Array})],Cs.prototype,"editIds",void 0),t([ht({type:Number})],Cs.prototype,"pixelCount",void 0),t([dt()],Cs.prototype,"_merged",void 0),t([dt()],Cs.prototype,"_busy",void 0),t([dt()],Cs.prototype,"_error",void 0),Cs=t([pt("wled-effect-merge-toggle")],Cs);let ks=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return q`
      <div class="bar" aria-label="WLED presets">
        ${t.length?q`
              <div class="ql-row">
                ${t.map(t=>q`
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
          ${e.map(t=>q`
              <li>
                <button class="named" @click=${()=>this._pick(t.id)}>
                  <span class="id">${t.id}</span>
                  <span class="name">${t.name}</span>
                  ${t.ql?q`<span class="ql-badge">${t.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,o`
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
    `]}};t([ht({type:Array})],ks.prototype,"presets",void 0),ks=t([pt("wled-preset-bar")],ks);const As={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Is=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.selectedSegId=-1,this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast="",this._mergeActive=!1}onPoweredConnect(){this._mergeActive=Tt(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=Ht(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await St(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=Tt(this.controllerId),this._mergeActive&&(this._editIds=Wt(this._segments),this._segId=this._editIds[0]??0)}catch(t){this._error=function(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const s=e.error;if(s&&"object"==typeof s){const t=s;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}(t)}finally{this._loading=!1}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[s,i]of Object.entries(t)){if(!i||"object"!=typeof i)continue;const t=i;e.push({id:s,name:String(t.n??t.name??`Preset ${s}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const s=this._segments.findIndex(e=>e.id===t.id);if(s>=0){const e=[...this._segments];e[s]={...e[s],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await async function(t,e,s){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:s})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const s=function(t,e){for(const s of e){if(At(s.entity_id)===t)return s.entity_id;if(s.segment_index===t)return s.entity_id}}(t.id,this._snapshot?.segment_entities??[]);if(!s)return;const i={entity_id:s};if(e.col?.length){const t=Ct(e.col[0]);t[3]>0?i.rgbw_color=[t[0],t[1],t[2],t[3]]:i.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(i.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(i.effect=t)}!1!==e.on?Object.keys(i).length>1&&await this.hass.callService("light","turn_on",i):await this.hass.callService("light","turn_off",{entity_id:s})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this._mergeActive){const t=Wt(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=Tt(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const s=[...this._segments];for(const i of e){const e=s.findIndex(t=>t.id===i);if(e<0)continue;const n=s[e];s[e]={...n,...t,id:i,sel:!0,on:void 0!==t.on?t.on:!1!==n.on},this._syncHaSegment(n,t)}this._segments=s;const i=this._activeSeg();this._optimistic.push(function(t,e,s){const i=new Set(t),n=(s.length?s:t.map(t=>({id:t}))).map(t=>i.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:n}}(e,t,this._segments),i??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await Et(this.connection,this.controllerId,function(t,e){const s=new Set(t);return{seg:e.map(t=>({id:t.id,sel:s.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=function(t,e){const s=new Set(t);return s.has(e)?s.delete(e):s.add(e),[...s].sort((t,e)=>t-e)}(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],s=[];for(let t=0;t<3;t++)s.push(Ct(e[t]));return s}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:s,white:i}=t.detail,n=this._cols(e);n[this._colorSlot]=[s[0],s[1],s[2],i],this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]])})}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,s,i=0){return await xt(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:s,bus_index:i})).rgbwm??s}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){this._toast=t instanceof Error?t.message:String(t),this.requestUpdate()}}_slider(t,e){const s=Number(e.target.value);this._patchSeg({[t]:s})}async _loadPreset(t){this.connection&&this.controllerId&&(await Et(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return q`<p class="muted">Loading segments…</p>`;if(this._error)return q`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return q`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),s=e[this._colorSlot]??e[0],i=this._meta,n=i?.sliders??{},r=!1!==i?.colors_enabled?3:1,o=this._snapshot?.rgbwm??0;return q`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?q`<p class="toast" role="status">${this._toast}</p>`:null}
        ${this.connection&&this.controllerId?q`
              <wled-effect-merge-toggle
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this._mergeActive?q`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:q`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this._mergeActive?null:q`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(t=>q`
              <button
                class="seg-tab ${this._editIds.includes(t.id)?"editing":""} ${t.id===this._segId?"focus":""}"
                aria-pressed=${this._editIds.includes(t.id)}
                @click=${()=>this._toggleSegEdit(t.id)}
              >
                ${function(t,e){const s=t.id,i=e.find(t=>t.segment_index===s||t.entity_id.endsWith(`_segment_${s}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||i?.name?.replace(/^.*\s—\s/,"")||`Seg ${s+1}`} (${t.start??"?"}–${t.stop??"?"})`}(t,this._snapshot?.segment_entities??[])}
              </button>
            `)}
        </div>
            `}

        ${!this.compact&&this._presets.length?q`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${r>1?q`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,r).map((t,e)=>q`
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
          .rgb=${[s[0],s[1],s[2]]}
          .white=${s[3]}
          .awm=${o}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${this.compact?null:q`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />
            `}

        <wled-effect-chips
          .hass=${this.hass}
          .controllerId=${this.controllerId}
          .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
          .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
          .effectsByName=${this._snapshot?.effects_by_name??{}}
          .soundFlags=${this._snapshot?.sound_flags??[]}
          .selectedFx=${t.fx??0}
          .filter=${this.compact?"":this._effectFilter}
          @effect-select=${this._onEffectSelect}
        ></wled-effect-chips>

        <div class="sliders">
          ${Object.entries(As).map(([e,s])=>{if(!n[e])return null;const i=t[e];return q`
              <label>
                ${s}
                <ha-slider
                  min="0"
                  max="255"
                  step="1"
                  .value=${i??128}
                  @change=${t=>this._slider(e,t)}
                ></ha-slider>
              </label>
            `})}
        </div>
      </div>
    `}get segments(){return this._segments}static{this.styles=[...mt,o`
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
      .seg-hint {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.72;
      }
      .seg-tab.editing {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
      }
      .seg-tab.focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 1px;
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
    `]}};var Ps;t([ht({attribute:!1})],Is.prototype,"connection",void 0),t([ht({attribute:!1})],Is.prototype,"hass",void 0),t([ht()],Is.prototype,"controllerId",void 0),t([ht({type:Boolean})],Is.prototype,"compact",void 0),t([ht({type:Number})],Is.prototype,"selectedSegId",void 0),t([dt()],Is.prototype,"_loading",void 0),t([dt()],Is.prototype,"_error",void 0),t([dt()],Is.prototype,"_segId",void 0),t([dt()],Is.prototype,"_editIds",void 0),t([dt()],Is.prototype,"_segments",void 0),t([dt()],Is.prototype,"_snapshot",void 0),t([dt()],Is.prototype,"_meta",void 0),t([dt()],Is.prototype,"_effectFilter",void 0),t([dt()],Is.prototype,"_presets",void 0),t([dt()],Is.prototype,"_colorSlot",void 0),t([dt()],Is.prototype,"_toast",void 0),t([dt()],Is.prototype,"_mergeActive",void 0),Is=t([pt("wled-segment-controls")],Is);const Rs="wled-studio-card";let Ms=class extends vt{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._previewStatus="connecting",this._hint="",this._selectedSegId=-1,this._segments=[],this._bootstrapGen=0,this._bootstrapControllerKey=""}static{Ps=this}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 5}static getConfigElement(){const t=document.createElement("wled-studio-card-editor");return t.setConfig(Ps.getStubConfig()),t}static getStubConfig(){return{type:`custom:${Rs}`,controller:"Cloud",height:56}}updated(t){if(super.updated(t),this._syncSegmentsFromControls(),t.has("config"))return this._bindConnectionReady(),void this._bootstrap(!0);t.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0}_bindConnectionReady(){this.hass?.connection&&!this._offConnReady&&(this._offConnReady=bt(this.hass.connection,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(t){const e=(this.config?.controller??"").trim();if(!e)return t[0];const s=e.toLowerCase();return t.find(t=>{const i=String(t.title??"");return String(t.entry_id??"")===e||i===e||i.toLowerCase().includes(s)||i.toLowerCase().endsWith(`— ${s}`)||i.toLowerCase().endsWith(`- ${s}`)})??t[0]}async _bootstrap(t=!1){if(!this.hass?.connection)return;const e=(this.config?.controller??"").trim();if(!t&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===e)return;const s=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this.requestUpdate());const i=[0,400,1200,2500];for(const t of i){if(s!==this._bootstrapGen||!this.isConnected)return;t>0&&await new Promise(e=>setTimeout(e,t));try{const t=await $t(this.hass.connection),i=this._pickController(t);if(!i?.entry_id){s===this._bootstrapGen&&(this._hint=0===t.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(s!==this._bootstrapGen)return;return this._controllerId=String(i.entry_id),this._masterEntity=String(i.master_entity_id??""),this._pixelCount=Number(i.pixel_count)||210,this._bootstrapControllerKey=e,this._hint="",this._startLive(),this._loadSegments(),void this.requestUpdate()}catch(t){const e=t instanceof Error?t.message:String(t??"unknown");s===this._bootstrapGen&&(this._hint=`Connecting… (${e})`,this.requestUpdate())}}s===this._bootstrapGen&&(this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}_startLive(){if(!this.hass?.connection||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=wt(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}_onStripSegmentSelect(t){this._selectedSegId=t.detail.segmentId,this._segmentControls?.selectSegment(t.detail.segmentId)}_onSegmentChange(t){this._selectedSegId=t.detail.segmentId,this.requestUpdate()}async _loadSegments(){if(this.hass?.connection&&this._controllerId)try{const t=await St(this.hass.connection,this._controllerId);this._segments=t.segments??[],this._segments.length&&this._selectedSegId<0&&(this._selectedSegId=this._segments[0].id),this.requestUpdate()}catch{}}_syncSegmentsFromControls(){const t=this._segmentControls?.segments;t?.length&&(this._segments=t)}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_setBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e})}render(){const t=this.config?.height??56,e=this.remote.state;return q`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller??"WLED Studio"}</span>
          ${e.isRemote?q`<span class="badge">Remote</span>`:null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <wled-strip-preview
          .heightPx=${t}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${this._selectedSegId}
          .hass=${this.hass}
          @segment-select=${this._onStripSegmentSelect}
        ></wled-strip-preview>

        <div class="controls">
          <label class="sr-only" for="brightness">Brightness</label>
          <ha-slider
            id="brightness"
            min="0"
            max="100"
            step="1"
            ?disabled=${!this._masterEntity}
            @change=${this._setBrightness}
          ></ha-slider>
        </div>

        ${this._controllerId&&this.hass?.connection?q`
              <wled-segment-controls
                class="segment-block"
                .hass=${this.hass}
                .connection=${this.hass.connection}
                .controllerId=${this._controllerId}
                .selectedSegId=${this._selectedSegId}
                compact
                @segment-change=${this._onSegmentChange}
              ></wled-segment-controls>
            `:null}

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${this._hint?q`<p class="hint">${this._hint}</p>`:null}
      </div>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...mt,o`
      .card {
        padding: 12px 16px;
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .title {
        font-weight: 600;
        flex: 1;
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--warning-color, orange);
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .controls {
        margin: 10px 0;
      }
      .segment-block {
        margin: 8px 0 4px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
        padding-top: 10px;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
        margin: 8px 0 0;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
      }
    `]}};function Ns(){return{type:`custom:${Rs}`,controller:"",height:56}}t([ht({attribute:!1})],Ms.prototype,"config",void 0),t([dt()],Ms.prototype,"_controllerId",void 0),t([dt()],Ms.prototype,"_masterEntity",void 0),t([dt()],Ms.prototype,"_pixelCount",void 0),t([dt()],Ms.prototype,"_previewStatus",void 0),t([dt()],Ms.prototype,"_hint",void 0),t([ut("wled-strip-preview")],Ms.prototype,"_preview",void 0),t([ut("wled-segment-controls")],Ms.prototype,"_segmentControls",void 0),t([dt()],Ms.prototype,"_selectedSegId",void 0),t([dt()],Ms.prototype,"_segments",void 0),Ms=Ps=t([pt(Rs)],Ms);const Os=()=>({type:`custom:${Rs}`,controller:"Cloud",height:56});let Ts=class extends ot{constructor(){super(...arguments),this._config=Os()}setConfig(t){this._config={...Os(),...t,type:t.type??`custom:${Rs}`}}render(){const t=this._config??Os();return q`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${t.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(t.height??56)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
      </div>
    `}_onController(t){const e=t.detail.value;this._fire({...this._config??Os(),controller:e})}_onHeight(t){const e=Number(t.detail.value);this._fire({...this._config??Os(),height:Number.isFinite(e)?e:56})}_fire(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};t([ht({attribute:!1})],Ts.prototype,"hass",void 0),t([dt()],Ts.prototype,"_config",void 0),Ts=t([pt("wled-studio-card-editor")],Ts),customElements.get(Rs)||customElements.define(Rs,Ms),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===Rs)||window.customCards.push({type:Rs,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:Rs});export{Rs as CARD_TAG,Ms as WledStudioCard,Ns as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map
