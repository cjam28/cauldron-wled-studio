function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,I=$.trustedTypes,k=I?I.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+P,M=`<${E}>`,A=document,T=()=>A.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,N="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,R=/>/g,F=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,G=A.createTreeWalker(A,129);function Y(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=B;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===B?"!--"===l[1]?o=O:void 0!==l[1]?o=R:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=F):void 0!==l[3]&&(o=F):o===F?">"===l[0]?(o=r??B,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?F:'"'===l[3]?U:z):o===U||o===z?o=F:o===O||o===R?o=B:(o=F,r=void 0);const d=o===F&&t[e+1].startsWith("/>")?" ":"";n+=o===B?i+M:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+P+d):i+P+(-2===c?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=K.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=s.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=I?I.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),G.nextNode(),a.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=L(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);G.currentNode=s;let r=G.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=G.nextNode(),n++)}return G.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),L(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const n of e)r===i.length?i.push(s=new t(this.O(T()),this.O(T()),this,this.options)):s=i[r],s._$AI(n),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,s[i+o],e,o),a===W&&(a=this._$AH[o]),n||=!L(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}let it=class extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===W)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(K,Z),($.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;let ot=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ct=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function pt(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut=o`
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
`,ft=o`
  :host {
    /* ---------------------------------------------------------------------
     * M3 shape — corner radius scale (plain literals; M3 spec values).
     * Stock M3 "large" is 16px. The dashboards use 24px cards — that is a
     * bespoke radius, exposed as --wled-radius below, NOT by overloading the
     * standard --md-sys-shape-corner-large token.
     * ------------------------------------------------------------------- */
    --md-sys-shape-corner-none: 0px;
    --md-sys-shape-corner-extra-small: 4px;
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-large: 16px;
    --md-sys-shape-corner-large-increased: 20px;
    --md-sys-shape-corner-extra-large: 28px;
    --md-sys-shape-corner-full: 9999px;

    /* ---------------------------------------------------------------------
     * M3 typescale — size / line-height / weight per role.
     * Weights are exposed as their own *-weight tokens so callers can build
     * shorthand (font: weight size/line-height) or use pieces individually.
     * ------------------------------------------------------------------- */

    /* Display */
    --md-sys-typescale-display-large-size: 57px;
    --md-sys-typescale-display-large-line-height: 64px;
    --md-sys-typescale-display-large-weight: 400;
    --md-sys-typescale-display-medium-size: 45px;
    --md-sys-typescale-display-medium-line-height: 52px;
    --md-sys-typescale-display-medium-weight: 400;
    --md-sys-typescale-display-small-size: 36px;
    --md-sys-typescale-display-small-line-height: 44px;
    --md-sys-typescale-display-small-weight: 400;

    /* Headline */
    --md-sys-typescale-headline-large-size: 32px;
    --md-sys-typescale-headline-large-line-height: 40px;
    --md-sys-typescale-headline-large-weight: 400;
    --md-sys-typescale-headline-medium-size: 28px;
    --md-sys-typescale-headline-medium-line-height: 36px;
    --md-sys-typescale-headline-medium-weight: 400;
    --md-sys-typescale-headline-small-size: 24px;
    --md-sys-typescale-headline-small-line-height: 32px;
    --md-sys-typescale-headline-small-weight: 400;

    /* Title */
    --md-sys-typescale-title-large-size: 22px;
    --md-sys-typescale-title-large-line-height: 28px;
    --md-sys-typescale-title-large-weight: 400;
    --md-sys-typescale-title-medium-size: 16px;
    --md-sys-typescale-title-medium-line-height: 24px;
    --md-sys-typescale-title-medium-weight: 500;
    --md-sys-typescale-title-small-size: 14px;
    --md-sys-typescale-title-small-line-height: 20px;
    --md-sys-typescale-title-small-weight: 500;

    /* Body */
    --md-sys-typescale-body-large-size: 16px;
    --md-sys-typescale-body-large-line-height: 24px;
    --md-sys-typescale-body-large-weight: 400;
    --md-sys-typescale-body-medium-size: 14px;
    --md-sys-typescale-body-medium-line-height: 20px;
    --md-sys-typescale-body-medium-weight: 400;
    --md-sys-typescale-body-small-size: 12px;
    --md-sys-typescale-body-small-line-height: 16px;
    --md-sys-typescale-body-small-weight: 400;

    /* Label */
    --md-sys-typescale-label-large-size: 14px;
    --md-sys-typescale-label-large-line-height: 20px;
    --md-sys-typescale-label-large-weight: 500;
    --md-sys-typescale-label-medium-size: 12px;
    --md-sys-typescale-label-medium-line-height: 16px;
    --md-sys-typescale-label-medium-weight: 500;
    --md-sys-typescale-label-small-size: 11px;
    --md-sys-typescale-label-small-line-height: 16px;
    --md-sys-typescale-label-small-weight: 500;

    /* ---------------------------------------------------------------------
     * M3 elevation — tonal/shadow levels.
     * Dashboards use 0 6px 18px rgba(0,0,0,.10) for cards (level-2-ish).
     * The --wled-shadow alias below maps to level 2.
     * ------------------------------------------------------------------- */
    --md-sys-elevation-level0: none;
    --md-sys-elevation-level1: 0 1px 2px rgba(0, 0, 0, 0.3),
      0 1px 3px 1px rgba(0, 0, 0, 0.15);
    --md-sys-elevation-level2: var(
      --ha-card-box-shadow,
      0 6px 18px rgba(0, 0, 0, 0.1)
    );
    --md-sys-elevation-level3: 0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level4: 0 6px 10px 4px rgba(0, 0, 0, 0.15),
      0 2px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level5: 0 8px 12px 6px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.3);

    /* =====================================================================
     * Legacy --wled-* aliases — the resilient consumer-facing layer.
     * Each alias carries the FULL non-cyclic fallback cascade
     *   var(--md-sys-color-X, var(--ha-fallback, <M3 baseline literal>))
     * so every existing var(--wled-X) consumer resolves in all 3 scenarios:
     * Material You on :root, HA theme var, or bare baseline (panel/tests).
     * The alias name differs from the role it references, so there is no
     * self-cycle. Migrate references per-file as phases touch them.
     * =================================================================== */
    --wled-accent: var(--md-sys-color-primary, var(--primary-color, #6750a4));
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    --wled-surface: var(
      --md-sys-color-surface,
      var(--card-background-color, #fef7ff)
    );
    --wled-surface-elevated: var(
      --md-sys-color-surface-container-high,
      var(--secondary-background-color, #ece6f0)
    );
    --wled-text: var(
      --md-sys-color-on-surface,
      var(--primary-text-color, #1d1b20)
    );
    --wled-text-muted: var(
      --md-sys-color-on-surface-variant,
      var(--secondary-text-color, #49454f)
    );
    --wled-border: var(
      --md-sys-color-outline-variant,
      var(--divider-color, #cac4d0)
    );
    /* Dashboards use 24px cards — a bespoke radius, not a standard M3 step. */
    --wled-radius: 24px;
    --wled-radius-sm: var(--md-sys-shape-corner-small);
    --wled-radius-lg: var(--md-sys-shape-corner-extra-large);
    --wled-shadow: var(--md-sys-elevation-level2);
    --wled-tap: 44px;
  }
`;class mt{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const _t=[ft,ut,gt,o`
  :host {
    --wled-transition-fast: var(--m-tap) ease;
    --wled-transition: var(--m-view-transition) ease;
  }

  button:focus-visible,
  [role="tab"]:focus-visible,
  .tile:focus-visible,
  .btn:focus-visible {
    outline: 2px solid var(--wled-accent);
    outline-offset: 2px;
  }

  .primary {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: transform var(--wled-transition-fast);
  }
  .primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .primary:active:not(:disabled) {
    transform: scale(0.97);
  }
`];class bt extends ot{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new mt(this),this._visible=!0,this._inView=!0}static{this.styles=_t}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ht({attribute:!1})],bt.prototype,"hass",void 0);const yt="0.11.5";function vt(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}const wt=/^[0-9a-fA-F]+$/;function xt(t,e,i,s){let r,n=!1;const o=async()=>{r?.(),r=void 0,n||(r=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let r=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&wt.test(e)){if(8===e.length)r=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let n=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(n=t)}return{leds_hex:s,n:n,channels:r,scale:n/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};o();const a=vt(t,()=>{o()});return()=>{n=!0,a(),r?.(),r=void 0}}async function $t(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",r),i(new Error("Home Assistant WebSocket not connected"))},15e3),r=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",r),e())};t.addEventListener("ready",r)})}async function St(t){await $t(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}function It(t,e,i=100){let s,r,n;const o=()=>{if(s&&clearTimeout(s),r&&clearTimeout(r),s=r=void 0,n){const e=n;n=void 0,t(...e)}},a=(...t)=>{n=t,s&&clearTimeout(s),s=setTimeout(o,e),r||(r=setTimeout(o,i))};return a.cancel=()=>{s&&clearTimeout(s),r&&clearTimeout(r),s=r=void 0,n=void 0},a}async function kt(t,e){await $t(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function Ct(t,e,i,s){await $t(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}async function Pt(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}async function Et(t,e){await $t(t);return(await t.sendMessagePromise({type:"wled_studio/get_palette_previews",schema_version:1,controller_id:e})).palette_previews??{}}function Mt(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function At(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function Tt(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function Lt(t,e){for(const i of e){if(i.wled_segment_id===t)return i.entity_id;if(Tt(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}function Dt(t,e,i){const s=new Set(t),r=(i.length?i:t.map(t=>({id:t}))).map(t=>s.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:r}}async function Nt(t,e){return await $t(t),t.sendMessagePromise({...e,schema_version:1})}async function Bt(t,e){return(await Nt(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}function Ot(t){if(!t)return 0;const e=t.attributes?.brightness_pct;if("number"==typeof e&&Number.isFinite(e))return Math.max(0,Math.min(100,Math.round(e)));const i=t.attributes?.brightness;return"number"==typeof i&&Number.isFinite(i)?Math.round(Math.max(0,Math.min(255,i))/255*100):"on"===t.state?100:0}function Rt(t){return Math.round(Math.max(0,Math.min(100,t))/100*255)}class Ft{constructor(t){this.host=t,this._selectedSegId=-1,this._highlightSegIds=[],this._segments=[],t.addController(this)}hostConnected(){}get selectedSegId(){return this._selectedSegId}get highlightSegIds(){return this._highlightSegIds}get segments(){return this._segments}selectSegment(t){this._selectedSegId!==t&&(this._selectedSegId=t,this.host.requestUpdate())}applyTargetsChanged(t){this._selectedSegId=t.segmentId,t.highlightIds?.length?this._highlightSegIds=[...t.highlightIds]:t.editIds?.length?this._highlightSegIds=[...t.editIds]:this._highlightSegIds=[t.segmentId],this.host.requestUpdate()}applySegmentChange(t){this._selectedSegId=t.segmentId,t.editIds?.length&&(this._highlightSegIds=[...t.editIds]),this.host.requestUpdate()}setSegments(t){this._segments=t,this.host.requestUpdate()}}function zt(t){return t<0?-1:0===t?0:1}function Ut(t,e,i){return(1-i)*t+i*e}function Ht(t,e,i){return i<t?t:i>e?e:i}function jt(t){return(t%=360)<0&&(t+=360),t}function Wt(t,e){return[t[0]*e[0][0]+t[1]*e[0][1]+t[2]*e[0][2],t[0]*e[1][0]+t[1]*e[1][1]+t[2]*e[1][2],t[0]*e[2][0]+t[1]*e[2][1]+t[2]*e[2][2]]}const Vt=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],qt=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],Gt=[95.047,100,108.883];function Yt(t,e,i){return(255<<24|(255&t)<<16|(255&e)<<8|255&i)>>>0}function Kt(t){return Yt(se(t[0]),se(t[1]),se(t[2]))}function Xt(t){return t>>16&255}function Jt(t){return t>>8&255}function Zt(t){return 255&t}function Qt(t){const e=function(t){return Wt([ie(Xt(t)),ie(Jt(t)),ie(Zt(t))],Vt)}(t)[1];return 116*re(e/100)-16}function te(t){return 100*function(t){const e=216/24389,i=24389/27,s=t*t*t;return s>e?s:(116*t-16)/i}((t+16)/116)}function ee(t){return 116*re(t/100)-16}function ie(t){const e=t/255;return e<=.040449936?e/12.92*100:100*Math.pow((e+.055)/1.055,2.4)}function se(t){const e=t/100;let i=0;return i=e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055,s=0,r=255,(n=Math.round(255*i))<s?s:n>r?r:n;var s,r,n}function re(t){const e=24389/27;return t>216/24389?Math.pow(t,1/3):(e*t+16)/116}class ne{static make(t=function(){return Gt}(),e=200/Math.PI*te(50)/100,i=50,s=2,r=!1){const n=t,o=.401288*n[0]+.650173*n[1]+-.051461*n[2],a=-.250268*n[0]+1.204414*n[1]+.045854*n[2],l=-.002079*n[0]+.048952*n[1]+.953127*n[2],c=.8+s/10,h=c>=.9?Ut(.59,.69,10*(c-.9)):Ut(.525,.59,10*(c-.8));let d=r?1:c*(1-1/3.6*Math.exp((-e-42)/92));d=d>1?1:d<0?0:d;const p=c,u=[d*(100/o)+1-d,d*(100/a)+1-d,d*(100/l)+1-d],g=1/(5*e+1),f=g*g*g*g,m=1-f,_=f*e+.1*m*m*Math.cbrt(5*e),b=te(i)/t[1],y=1.48+Math.sqrt(b),v=.725/Math.pow(b,.2),w=v,x=[Math.pow(_*u[0]*o/100,.42),Math.pow(_*u[1]*a/100,.42),Math.pow(_*u[2]*l/100,.42)],$=[400*x[0]/(x[0]+27.13),400*x[1]/(x[1]+27.13),400*x[2]/(x[2]+27.13)];return new ne(b,(2*$[0]+$[1]+.05*$[2])*v,v,w,h,p,u,_,Math.pow(_,.25),y)}constructor(t,e,i,s,r,n,o,a,l,c){this.n=t,this.aw=e,this.nbb=i,this.ncb=s,this.c=r,this.nc=n,this.rgbD=o,this.fl=a,this.fLRoot=l,this.z=c}}ne.DEFAULT=ne.make();class oe{constructor(t,e,i,s,r,n,o,a,l){this.hue=t,this.chroma=e,this.j=i,this.q=s,this.m=r,this.s=n,this.jstar=o,this.astar=a,this.bstar=l}distance(t){const e=this.jstar-t.jstar,i=this.astar-t.astar,s=this.bstar-t.bstar,r=Math.sqrt(e*e+i*i+s*s);return 1.41*Math.pow(r,.63)}static fromInt(t){return oe.fromIntInViewingConditions(t,ne.DEFAULT)}static fromIntInViewingConditions(t,e){const i=(65280&t)>>8,s=255&t,r=ie((16711680&t)>>16),n=ie(i),o=ie(s),a=.41233895*r+.35762064*n+.18051042*o,l=.2126*r+.7152*n+.0722*o,c=.01932141*r+.11916382*n+.95034478*o,h=.401288*a+.650173*l-.051461*c,d=-.250268*a+1.204414*l+.045854*c,p=-.002079*a+.048952*l+.953127*c,u=e.rgbD[0]*h,g=e.rgbD[1]*d,f=e.rgbD[2]*p,m=Math.pow(e.fl*Math.abs(u)/100,.42),_=Math.pow(e.fl*Math.abs(g)/100,.42),b=Math.pow(e.fl*Math.abs(f)/100,.42),y=400*zt(u)*m/(m+27.13),v=400*zt(g)*_/(_+27.13),w=400*zt(f)*b/(b+27.13),x=(11*y+-12*v+w)/11,$=(y+v-2*w)/9,S=(20*y+20*v+21*w)/20,I=(40*y+20*v+w)/20,k=180*Math.atan2($,x)/Math.PI,C=k<0?k+360:k>=360?k-360:k,P=C*Math.PI/180,E=I*e.nbb,M=100*Math.pow(E/e.aw,e.c*e.z),A=4/e.c*Math.sqrt(M/100)*(e.aw+4)*e.fLRoot,T=C<20.14?C+360:C,L=5e4/13*(.25*(Math.cos(T*Math.PI/180+2)+3.8))*e.nc*e.ncb*Math.sqrt(x*x+$*$)/(S+.305),D=Math.pow(L,.9)*Math.pow(1.64-Math.pow(.29,e.n),.73),N=D*Math.sqrt(M/100),B=N*e.fLRoot,O=50*Math.sqrt(D*e.c/(e.aw+4)),R=(1+100*.007)*M/(1+.007*M),F=1/.0228*Math.log(1+.0228*B),z=F*Math.cos(P),U=F*Math.sin(P);return new oe(C,N,M,A,B,O,R,z,U)}static fromJch(t,e,i){return oe.fromJchInViewingConditions(t,e,i,ne.DEFAULT)}static fromJchInViewingConditions(t,e,i,s){const r=4/s.c*Math.sqrt(t/100)*(s.aw+4)*s.fLRoot,n=e*s.fLRoot,o=e/Math.sqrt(t/100),a=50*Math.sqrt(o*s.c/(s.aw+4)),l=i*Math.PI/180,c=(1+100*.007)*t/(1+.007*t),h=1/.0228*Math.log(1+.0228*n),d=h*Math.cos(l),p=h*Math.sin(l);return new oe(i,e,t,r,n,a,c,d,p)}static fromUcs(t,e,i){return oe.fromUcsInViewingConditions(t,e,i,ne.DEFAULT)}static fromUcsInViewingConditions(t,e,i,s){const r=e,n=i,o=Math.sqrt(r*r+n*n),a=(Math.exp(.0228*o)-1)/.0228/s.fLRoot;let l=Math.atan2(n,r)*(180/Math.PI);l<0&&(l+=360);const c=t/(1-.007*(t-100));return oe.fromJchInViewingConditions(c,a,l,s)}toInt(){return this.viewed(ne.DEFAULT)}viewed(t){const e=0===this.chroma||0===this.j?0:this.chroma/Math.sqrt(this.j/100),i=Math.pow(e/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),s=this.hue*Math.PI/180,r=.25*(Math.cos(s+2)+3.8),n=t.aw*Math.pow(this.j/100,1/t.c/t.z),o=r*(5e4/13)*t.nc*t.ncb,a=n/t.nbb,l=Math.sin(s),c=Math.cos(s),h=23*(a+.305)*i/(23*o+11*i*c+108*i*l),d=h*c,p=h*l,u=(460*a+451*d+288*p)/1403,g=(460*a-891*d-261*p)/1403,f=(460*a-220*d-6300*p)/1403,m=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),_=zt(u)*(100/t.fl)*Math.pow(m,1/.42),b=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),y=zt(g)*(100/t.fl)*Math.pow(b,1/.42),v=Math.max(0,27.13*Math.abs(f)/(400-Math.abs(f))),w=zt(f)*(100/t.fl)*Math.pow(v,1/.42),x=_/t.rgbD[0],$=y/t.rgbD[1],S=w/t.rgbD[2],I=function(t,e,i){const s=qt,r=s[0][0]*t+s[0][1]*e+s[0][2]*i,n=s[1][0]*t+s[1][1]*e+s[1][2]*i,o=s[2][0]*t+s[2][1]*e+s[2][2]*i;return Yt(se(r),se(n),se(o))}(1.86206786*x-1.01125463*$+.14918677*S,.38752654*x+.62144744*$-.00897398*S,-.0158415*x-.03412294*$+1.04996444*S);return I}static fromXyzInViewingConditions(t,e,i,s){const r=.401288*t+.650173*e-.051461*i,n=-.250268*t+1.204414*e+.045854*i,o=-.002079*t+.048952*e+.953127*i,a=s.rgbD[0]*r,l=s.rgbD[1]*n,c=s.rgbD[2]*o,h=Math.pow(s.fl*Math.abs(a)/100,.42),d=Math.pow(s.fl*Math.abs(l)/100,.42),p=Math.pow(s.fl*Math.abs(c)/100,.42),u=400*zt(a)*h/(h+27.13),g=400*zt(l)*d/(d+27.13),f=400*zt(c)*p/(p+27.13),m=(11*u+-12*g+f)/11,_=(u+g-2*f)/9,b=(20*u+20*g+21*f)/20,y=(40*u+20*g+f)/20,v=180*Math.atan2(_,m)/Math.PI,w=v<0?v+360:v>=360?v-360:v,x=w*Math.PI/180,$=y*s.nbb,S=100*Math.pow($/s.aw,s.c*s.z),I=4/s.c*Math.sqrt(S/100)*(s.aw+4)*s.fLRoot,k=w<20.14?w+360:w,C=5e4/13*(1/4*(Math.cos(k*Math.PI/180+2)+3.8))*s.nc*s.ncb*Math.sqrt(m*m+_*_)/(b+.305),P=Math.pow(C,.9)*Math.pow(1.64-Math.pow(.29,s.n),.73),E=P*Math.sqrt(S/100),M=E*s.fLRoot,A=50*Math.sqrt(P*s.c/(s.aw+4)),T=(1+100*.007)*S/(1+.007*S),L=Math.log(1+.0228*M)/.0228,D=L*Math.cos(x),N=L*Math.sin(x);return new oe(w,E,S,I,M,A,T,D,N)}xyzInViewingConditions(t){const e=0===this.chroma||0===this.j?0:this.chroma/Math.sqrt(this.j/100),i=Math.pow(e/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),s=this.hue*Math.PI/180,r=.25*(Math.cos(s+2)+3.8),n=t.aw*Math.pow(this.j/100,1/t.c/t.z),o=r*(5e4/13)*t.nc*t.ncb,a=n/t.nbb,l=Math.sin(s),c=Math.cos(s),h=23*(a+.305)*i/(23*o+11*i*c+108*i*l),d=h*c,p=h*l,u=(460*a+451*d+288*p)/1403,g=(460*a-891*d-261*p)/1403,f=(460*a-220*d-6300*p)/1403,m=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),_=zt(u)*(100/t.fl)*Math.pow(m,1/.42),b=Math.max(0,27.13*Math.abs(g)/(400-Math.abs(g))),y=zt(g)*(100/t.fl)*Math.pow(b,1/.42),v=Math.max(0,27.13*Math.abs(f)/(400-Math.abs(f))),w=zt(f)*(100/t.fl)*Math.pow(v,1/.42),x=_/t.rgbD[0],$=y/t.rgbD[1],S=w/t.rgbD[2];return[1.86206786*x-1.01125463*$+.14918677*S,.38752654*x+.62144744*$-.00897398*S,-.0158415*x-.03412294*$+1.04996444*S]}}class ae{static sanitizeRadians(t){return(t+8*Math.PI)%(2*Math.PI)}static trueDelinearized(t){const e=t/100;let i=0;return i=e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055,255*i}static chromaticAdaptation(t){const e=Math.pow(Math.abs(t),.42);return 400*zt(t)*e/(e+27.13)}static hueOf(t){const e=Wt(t,ae.SCALED_DISCOUNT_FROM_LINRGB),i=ae.chromaticAdaptation(e[0]),s=ae.chromaticAdaptation(e[1]),r=ae.chromaticAdaptation(e[2]),n=(11*i+-12*s+r)/11,o=(i+s-2*r)/9;return Math.atan2(o,n)}static areInCyclicOrder(t,e,i){return ae.sanitizeRadians(e-t)<ae.sanitizeRadians(i-t)}static intercept(t,e,i){return(e-t)/(i-t)}static lerpPoint(t,e,i){return[t[0]+(i[0]-t[0])*e,t[1]+(i[1]-t[1])*e,t[2]+(i[2]-t[2])*e]}static setCoordinate(t,e,i,s){const r=ae.intercept(t[s],e,i[s]);return ae.lerpPoint(t,r,i)}static isBounded(t){return 0<=t&&t<=100}static nthVertex(t,e){const i=ae.Y_FROM_LINRGB[0],s=ae.Y_FROM_LINRGB[1],r=ae.Y_FROM_LINRGB[2],n=e%4<=1?0:100,o=e%2==0?0:100;if(e<4){const e=n,a=o,l=(t-e*s-a*r)/i;return ae.isBounded(l)?[l,e,a]:[-1,-1,-1]}if(e<8){const e=n,a=o,l=(t-a*i-e*r)/s;return ae.isBounded(l)?[a,l,e]:[-1,-1,-1]}{const e=n,a=o,l=(t-e*i-a*s)/r;return ae.isBounded(l)?[e,a,l]:[-1,-1,-1]}}static bisectToSegment(t,e){let i=[-1,-1,-1],s=i,r=0,n=0,o=!1,a=!0;for(let l=0;l<12;l++){const c=ae.nthVertex(t,l);if(c[0]<0)continue;const h=ae.hueOf(c);o?(a||ae.areInCyclicOrder(r,h,n))&&(a=!1,ae.areInCyclicOrder(r,e,h)?(s=c,n=h):(i=c,r=h)):(i=c,s=c,r=h,n=h,o=!0)}return[i,s]}static midpoint(t,e){return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}static criticalPlaneBelow(t){return Math.floor(t-.5)}static criticalPlaneAbove(t){return Math.ceil(t-.5)}static bisectToLimit(t,e){const i=ae.bisectToSegment(t,e);let s=i[0],r=ae.hueOf(s),n=i[1];for(let t=0;t<3;t++)if(s[t]!==n[t]){let i=-1,o=255;s[t]<n[t]?(i=ae.criticalPlaneBelow(ae.trueDelinearized(s[t])),o=ae.criticalPlaneAbove(ae.trueDelinearized(n[t]))):(i=ae.criticalPlaneAbove(ae.trueDelinearized(s[t])),o=ae.criticalPlaneBelow(ae.trueDelinearized(n[t])));for(let a=0;a<8&&!(Math.abs(o-i)<=1);a++){const a=Math.floor((i+o)/2),l=ae.CRITICAL_PLANES[a],c=ae.setCoordinate(s,l,n,t),h=ae.hueOf(c);ae.areInCyclicOrder(r,e,h)?(n=c,o=a):(s=c,r=h,i=a)}}return ae.midpoint(s,n)}static inverseChromaticAdaptation(t){const e=Math.abs(t),i=Math.max(0,27.13*e/(400-e));return zt(t)*Math.pow(i,1/.42)}static findResultByJ(t,e,i){let s=11*Math.sqrt(i);const r=ne.DEFAULT,n=1/Math.pow(1.64-Math.pow(.29,r.n),.73),o=.25*(Math.cos(t+2)+3.8)*(5e4/13)*r.nc*r.ncb,a=Math.sin(t),l=Math.cos(t);for(let t=0;t<5;t++){const c=s/100,h=0===e||0===s?0:e/Math.sqrt(c),d=Math.pow(h*n,1/.9),p=r.aw*Math.pow(c,1/r.c/r.z)/r.nbb,u=23*(p+.305)*d/(23*o+11*d*l+108*d*a),g=u*l,f=u*a,m=(460*p+451*g+288*f)/1403,_=(460*p-891*g-261*f)/1403,b=(460*p-220*g-6300*f)/1403,y=Wt([ae.inverseChromaticAdaptation(m),ae.inverseChromaticAdaptation(_),ae.inverseChromaticAdaptation(b)],ae.LINRGB_FROM_SCALED_DISCOUNT);if(y[0]<0||y[1]<0||y[2]<0)return 0;const v=ae.Y_FROM_LINRGB[0],w=ae.Y_FROM_LINRGB[1],x=ae.Y_FROM_LINRGB[2],$=v*y[0]+w*y[1]+x*y[2];if($<=0)return 0;if(4===t||Math.abs($-i)<.002)return y[0]>100.01||y[1]>100.01||y[2]>100.01?0:Kt(y);s-=($-i)*s/(2*$)}return 0}static solveToInt(t,e,i){if(e<1e-4||i<1e-4||i>99.9999)return function(t){const e=se(te(t));return Yt(e,e,e)}(i);const s=(t=jt(t))/180*Math.PI,r=te(i),n=ae.findResultByJ(s,e,r);if(0!==n)return n;return Kt(ae.bisectToLimit(r,s))}static solveToCam(t,e,i){return oe.fromInt(ae.solveToInt(t,e,i))}}ae.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]],ae.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]],ae.Y_FROM_LINRGB=[.2126,.7152,.0722],ae.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class le{static from(t,e,i){return new le(ae.solveToInt(t,e,i))}static fromInt(t){return new le(t)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(t){this.setInternalState(ae.solveToInt(t,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(t){this.setInternalState(ae.solveToInt(this.internalHue,t,this.internalTone))}get tone(){return this.internalTone}set tone(t){this.setInternalState(ae.solveToInt(this.internalHue,this.internalChroma,t))}constructor(t){this.argb=t;const e=oe.fromInt(t);this.internalHue=e.hue,this.internalChroma=e.chroma,this.internalTone=Qt(t),this.argb=t}setInternalState(t){const e=oe.fromInt(t);this.internalHue=e.hue,this.internalChroma=e.chroma,this.internalTone=Qt(t),this.argb=t}inViewingConditions(t){const e=oe.fromInt(this.toInt()).xyzInViewingConditions(t),i=oe.fromXyzInViewingConditions(e[0],e[1],e[2],ne.make());return le.from(i.hue,i.chroma,ee(e[1]))}}class ce{static ratioOfTones(t,e){return t=Ht(0,100,t),e=Ht(0,100,e),ce.ratioOfYs(te(t),te(e))}static ratioOfYs(t,e){const i=t>e?t:e;return(i+5)/((i===e?t:e)+5)}static lighter(t,e){if(t<0||t>100)return-1;const i=te(t),s=e*(i+5)-5,r=ce.ratioOfYs(s,i),n=Math.abs(r-e);if(r<e&&n>.04)return-1;const o=ee(s)+.4;return o<0||o>100?-1:o}static darker(t,e){if(t<0||t>100)return-1;const i=te(t),s=(i+5)/e-5,r=ce.ratioOfYs(i,s),n=Math.abs(r-e);if(r<e&&n>.04)return-1;const o=ee(s)-.4;return o<0||o>100?-1:o}static lighterUnsafe(t,e){const i=ce.lighter(t,e);return i<0?100:i}static darkerUnsafe(t,e){const i=ce.darker(t,e);return i<0?0:i}}class he{static isDisliked(t){const e=Math.round(t.hue)>=90&&Math.round(t.hue)<=111,i=Math.round(t.chroma)>16,s=Math.round(t.tone)<65;return e&&i&&s}static fixIfDisliked(t){return he.isDisliked(t)?le.from(t.hue,t.chroma,70):t}}class de{static fromPalette(t){return new de(t.name??"",t.palette,t.tone,t.isBackground??!1,t.background,t.secondBackground,t.contrastCurve,t.toneDeltaPair)}constructor(t,e,i,s,r,n,o,a){if(this.name=t,this.palette=e,this.tone=i,this.isBackground=s,this.background=r,this.secondBackground=n,this.contrastCurve=o,this.toneDeltaPair=a,this.hctCache=new Map,!r&&n)throw new Error(`Color ${t} has secondBackgrounddefined, but background is not defined.`);if(!r&&o)throw new Error(`Color ${t} has contrastCurvedefined, but background is not defined.`);if(r&&!o)throw new Error(`Color ${t} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(t){return this.getHct(t).toInt()}getHct(t){const e=this.hctCache.get(t);if(null!=e)return e;const i=this.getTone(t),s=this.palette(t).getHct(i);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(t,s),s}getTone(t){const e=t.contrastLevel<0;if(this.toneDeltaPair){const i=this.toneDeltaPair(t),s=i.roleA,r=i.roleB,n=i.delta,o=i.polarity,a=i.stayTogether,l=this.background(t).getTone(t),c="nearer"===o||"lighter"===o&&!t.isDark||"darker"===o&&t.isDark,h=c?s:r,d=c?r:s,p=this.name===h.name,u=t.isDark?1:-1,g=h.contrastCurve.get(t.contrastLevel),f=d.contrastCurve.get(t.contrastLevel),m=h.tone(t);let _=ce.ratioOfTones(l,m)>=g?m:de.foregroundTone(l,g);const b=d.tone(t);let y=ce.ratioOfTones(l,b)>=f?b:de.foregroundTone(l,f);return e&&(_=de.foregroundTone(l,g),y=de.foregroundTone(l,f)),(y-_)*u>=n||(y=Ht(0,100,_+n*u),(y-_)*u>=n||(_=Ht(0,100,y-n*u))),50<=_&&_<60?u>0?(_=60,y=Math.max(y,_+n*u)):(_=49,y=Math.min(y,_+n*u)):50<=y&&y<60&&(a?u>0?(_=60,y=Math.max(y,_+n*u)):(_=49,y=Math.min(y,_+n*u)):y=u>0?60:49),p?_:y}{let i=this.tone(t);if(null==this.background)return i;const s=this.background(t).getTone(t),r=this.contrastCurve.get(t.contrastLevel);if(ce.ratioOfTones(s,i)>=r||(i=de.foregroundTone(s,r)),e&&(i=de.foregroundTone(s,r)),this.isBackground&&50<=i&&i<60&&(i=ce.ratioOfTones(49,s)>=r?49:60),this.secondBackground){const[e,s]=[this.background,this.secondBackground],[n,o]=[e(t).getTone(t),s(t).getTone(t)],[a,l]=[Math.max(n,o),Math.min(n,o)];if(ce.ratioOfTones(a,i)>=r&&ce.ratioOfTones(l,i)>=r)return i;const c=ce.lighter(a,r),h=ce.darker(l,r),d=[];-1!==c&&d.push(c),-1!==h&&d.push(h);return de.tonePrefersLightForeground(n)||de.tonePrefersLightForeground(o)?c<0?100:c:1===d.length?d[0]:h<0?0:h}return i}}static foregroundTone(t,e){const i=ce.lighterUnsafe(t,e),s=ce.darkerUnsafe(t,e),r=ce.ratioOfTones(i,t),n=ce.ratioOfTones(s,t);if(de.tonePrefersLightForeground(t)){const t=Math.abs(r-n)<.1&&r<e&&n<e;return r>=e||r>=n||t?i:s}return n>=e||n>=r?s:i}static tonePrefersLightForeground(t){return Math.round(t)<60}static toneAllowsLightForeground(t){return Math.round(t)<=49}static enableLightForeground(t){return de.tonePrefersLightForeground(t)&&!de.toneAllowsLightForeground(t)?49:t}}class pe{static fromInt(t){const e=le.fromInt(t);return pe.fromHct(e)}static fromHct(t){return new pe(t.hue,t.chroma,t)}static fromHueAndChroma(t,e){const i=new ue(t,e).create();return new pe(t,e,i)}constructor(t,e,i){this.hue=t,this.chroma=e,this.keyColor=i,this.cache=new Map}tone(t){let e=this.cache.get(t);return void 0===e&&(e=le.from(this.hue,this.chroma,t).toInt(),this.cache.set(t,e)),e}getHct(t){return le.fromInt(this.tone(t))}}class ue{constructor(t,e){this.hue=t,this.requestedChroma=e,this.chromaCache=new Map,this.maxChromaValue=200}create(){let t=0,e=100;for(;t<e;){const i=Math.floor((t+e)/2),s=this.maxChroma(i)<this.maxChroma(i+1);if(this.maxChroma(i)>=this.requestedChroma-.01)if(Math.abs(t-50)<Math.abs(e-50))e=i;else{if(t===i)return le.from(this.hue,this.requestedChroma,t);t=i}else s?t=i+1:e=i}return le.from(this.hue,this.requestedChroma,t)}maxChroma(t){if(this.chromaCache.has(t))return this.chromaCache.get(t);const e=le.from(this.hue,this.maxChromaValue,t).chroma;return this.chromaCache.set(t,e),e}}class ge{constructor(t,e,i,s){this.low=t,this.normal=e,this.medium=i,this.high=s}get(t){return t<=-1?this.low:t<0?Ut(this.low,this.normal,(t- -1)/1):t<.5?Ut(this.normal,this.medium,(t-0)/.5):t<1?Ut(this.medium,this.high,(t-.5)/.5):this.high}}class fe{constructor(t,e,i,s,r){this.roleA=t,this.roleB=e,this.delta=i,this.polarity=s,this.stayTogether=r}}var me;function _e(t){return t.variant===me.FIDELITY||t.variant===me.CONTENT}function be(t){return t.variant===me.MONOCHROME}!function(t){t[t.MONOCHROME=0]="MONOCHROME",t[t.NEUTRAL=1]="NEUTRAL",t[t.TONAL_SPOT=2]="TONAL_SPOT",t[t.VIBRANT=3]="VIBRANT",t[t.EXPRESSIVE=4]="EXPRESSIVE",t[t.FIDELITY=5]="FIDELITY",t[t.CONTENT=6]="CONTENT",t[t.RAINBOW=7]="RAINBOW",t[t.FRUIT_SALAD=8]="FRUIT_SALAD"}(me||(me={}));class ye{static highestSurface(t){return t.isDark?ye.surfaceBright:ye.surfaceDim}}ye.contentAccentToneDelta=15,ye.primaryPaletteKeyColor=de.fromPalette({name:"primary_palette_key_color",palette:t=>t.primaryPalette,tone:t=>t.primaryPalette.keyColor.tone}),ye.secondaryPaletteKeyColor=de.fromPalette({name:"secondary_palette_key_color",palette:t=>t.secondaryPalette,tone:t=>t.secondaryPalette.keyColor.tone}),ye.tertiaryPaletteKeyColor=de.fromPalette({name:"tertiary_palette_key_color",palette:t=>t.tertiaryPalette,tone:t=>t.tertiaryPalette.keyColor.tone}),ye.neutralPaletteKeyColor=de.fromPalette({name:"neutral_palette_key_color",palette:t=>t.neutralPalette,tone:t=>t.neutralPalette.keyColor.tone}),ye.neutralVariantPaletteKeyColor=de.fromPalette({name:"neutral_variant_palette_key_color",palette:t=>t.neutralVariantPalette,tone:t=>t.neutralVariantPalette.keyColor.tone}),ye.background=de.fromPalette({name:"background",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0}),ye.onBackground=de.fromPalette({name:"on_background",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>ye.background,contrastCurve:new ge(3,3,4.5,7)}),ye.surface=de.fromPalette({name:"surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0}),ye.surfaceDim=de.fromPalette({name:"surface_dim",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:new ge(87,87,80,75).get(t.contrastLevel),isBackground:!0}),ye.surfaceBright=de.fromPalette({name:"surface_bright",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(24,24,29,34).get(t.contrastLevel):98,isBackground:!0}),ye.surfaceContainerLowest=de.fromPalette({name:"surface_container_lowest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(4,4,2,0).get(t.contrastLevel):100,isBackground:!0}),ye.surfaceContainerLow=de.fromPalette({name:"surface_container_low",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(10,10,11,12).get(t.contrastLevel):new ge(96,96,96,95).get(t.contrastLevel),isBackground:!0}),ye.surfaceContainer=de.fromPalette({name:"surface_container",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(12,12,16,20).get(t.contrastLevel):new ge(94,94,92,90).get(t.contrastLevel),isBackground:!0}),ye.surfaceContainerHigh=de.fromPalette({name:"surface_container_high",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(17,17,21,25).get(t.contrastLevel):new ge(92,92,88,85).get(t.contrastLevel),isBackground:!0}),ye.surfaceContainerHighest=de.fromPalette({name:"surface_container_highest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new ge(22,22,26,30).get(t.contrastLevel):new ge(90,90,84,80).get(t.contrastLevel),isBackground:!0}),ye.onSurface=de.fromPalette({name:"on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>ye.highestSurface(t),contrastCurve:new ge(4.5,7,11,21)}),ye.surfaceVariant=de.fromPalette({name:"surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:90,isBackground:!0}),ye.onSurfaceVariant=de.fromPalette({name:"on_surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?80:30,background:t=>ye.highestSurface(t),contrastCurve:new ge(3,4.5,7,11)}),ye.inverseSurface=de.fromPalette({name:"inverse_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:20}),ye.inverseOnSurface=de.fromPalette({name:"inverse_on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?20:95,background:t=>ye.inverseSurface,contrastCurve:new ge(4.5,7,11,21)}),ye.outline=de.fromPalette({name:"outline",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?60:50,background:t=>ye.highestSurface(t),contrastCurve:new ge(1.5,3,4.5,7)}),ye.outlineVariant=de.fromPalette({name:"outline_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:80,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5)}),ye.shadow=de.fromPalette({name:"shadow",palette:t=>t.neutralPalette,tone:t=>0}),ye.scrim=de.fromPalette({name:"scrim",palette:t=>t.neutralPalette,tone:t=>0}),ye.surfaceTint=de.fromPalette({name:"surface_tint",palette:t=>t.primaryPalette,tone:t=>t.isDark?80:40,isBackground:!0}),ye.primary=de.fromPalette({name:"primary",palette:t=>t.primaryPalette,tone:t=>be(t)?t.isDark?100:0:t.isDark?80:40,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(3,4.5,7,7),toneDeltaPair:t=>new fe(ye.primaryContainer,ye.primary,10,"nearer",!1)}),ye.onPrimary=de.fromPalette({name:"on_primary",palette:t=>t.primaryPalette,tone:t=>be(t)?t.isDark?10:90:t.isDark?20:100,background:t=>ye.primary,contrastCurve:new ge(4.5,7,11,21)}),ye.primaryContainer=de.fromPalette({name:"primary_container",palette:t=>t.primaryPalette,tone:t=>_e(t)?t.sourceColorHct.tone:be(t)?t.isDark?85:25:t.isDark?30:90,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.primaryContainer,ye.primary,10,"nearer",!1)}),ye.onPrimaryContainer=de.fromPalette({name:"on_primary_container",palette:t=>t.primaryPalette,tone:t=>_e(t)?de.foregroundTone(ye.primaryContainer.tone(t),4.5):be(t)?t.isDark?0:100:t.isDark?90:30,background:t=>ye.primaryContainer,contrastCurve:new ge(3,4.5,7,11)}),ye.inversePrimary=de.fromPalette({name:"inverse_primary",palette:t=>t.primaryPalette,tone:t=>t.isDark?40:80,background:t=>ye.inverseSurface,contrastCurve:new ge(3,4.5,7,7)}),ye.secondary=de.fromPalette({name:"secondary",palette:t=>t.secondaryPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(3,4.5,7,7),toneDeltaPair:t=>new fe(ye.secondaryContainer,ye.secondary,10,"nearer",!1)}),ye.onSecondary=de.fromPalette({name:"on_secondary",palette:t=>t.secondaryPalette,tone:t=>be(t)?t.isDark?10:100:t.isDark?20:100,background:t=>ye.secondary,contrastCurve:new ge(4.5,7,11,21)}),ye.secondaryContainer=de.fromPalette({name:"secondary_container",palette:t=>t.secondaryPalette,tone:t=>{const e=t.isDark?30:90;return be(t)?t.isDark?30:85:_e(t)?function(t,e,i,s){let r=i,n=le.from(t,e,i);if(n.chroma<e){let i=n.chroma;for(;n.chroma<e;){r+=s?-1:1;const o=le.from(t,e,r);if(i>o.chroma)break;if(Math.abs(o.chroma-e)<.4)break;Math.abs(o.chroma-e)<Math.abs(n.chroma-e)&&(n=o),i=Math.max(i,o.chroma)}}return r}(t.secondaryPalette.hue,t.secondaryPalette.chroma,e,!t.isDark):e},isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.secondaryContainer,ye.secondary,10,"nearer",!1)}),ye.onSecondaryContainer=de.fromPalette({name:"on_secondary_container",palette:t=>t.secondaryPalette,tone:t=>be(t)?t.isDark?90:10:_e(t)?de.foregroundTone(ye.secondaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>ye.secondaryContainer,contrastCurve:new ge(3,4.5,7,11)}),ye.tertiary=de.fromPalette({name:"tertiary",palette:t=>t.tertiaryPalette,tone:t=>be(t)?t.isDark?90:25:t.isDark?80:40,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(3,4.5,7,7),toneDeltaPair:t=>new fe(ye.tertiaryContainer,ye.tertiary,10,"nearer",!1)}),ye.onTertiary=de.fromPalette({name:"on_tertiary",palette:t=>t.tertiaryPalette,tone:t=>be(t)?t.isDark?10:90:t.isDark?20:100,background:t=>ye.tertiary,contrastCurve:new ge(4.5,7,11,21)}),ye.tertiaryContainer=de.fromPalette({name:"tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>{if(be(t))return t.isDark?60:49;if(!_e(t))return t.isDark?30:90;const e=t.tertiaryPalette.getHct(t.sourceColorHct.tone);return he.fixIfDisliked(e).tone},isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.tertiaryContainer,ye.tertiary,10,"nearer",!1)}),ye.onTertiaryContainer=de.fromPalette({name:"on_tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>be(t)?t.isDark?0:100:_e(t)?de.foregroundTone(ye.tertiaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>ye.tertiaryContainer,contrastCurve:new ge(3,4.5,7,11)}),ye.error=de.fromPalette({name:"error",palette:t=>t.errorPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(3,4.5,7,7),toneDeltaPair:t=>new fe(ye.errorContainer,ye.error,10,"nearer",!1)}),ye.onError=de.fromPalette({name:"on_error",palette:t=>t.errorPalette,tone:t=>t.isDark?20:100,background:t=>ye.error,contrastCurve:new ge(4.5,7,11,21)}),ye.errorContainer=de.fromPalette({name:"error_container",palette:t=>t.errorPalette,tone:t=>t.isDark?30:90,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.errorContainer,ye.error,10,"nearer",!1)}),ye.onErrorContainer=de.fromPalette({name:"on_error_container",palette:t=>t.errorPalette,tone:t=>be(t)?t.isDark?90:10:t.isDark?90:30,background:t=>ye.errorContainer,contrastCurve:new ge(3,4.5,7,11)}),ye.primaryFixed=de.fromPalette({name:"primary_fixed",palette:t=>t.primaryPalette,tone:t=>be(t)?40:90,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.primaryFixed,ye.primaryFixedDim,10,"lighter",!0)}),ye.primaryFixedDim=de.fromPalette({name:"primary_fixed_dim",palette:t=>t.primaryPalette,tone:t=>be(t)?30:80,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.primaryFixed,ye.primaryFixedDim,10,"lighter",!0)}),ye.onPrimaryFixed=de.fromPalette({name:"on_primary_fixed",palette:t=>t.primaryPalette,tone:t=>be(t)?100:10,background:t=>ye.primaryFixedDim,secondBackground:t=>ye.primaryFixed,contrastCurve:new ge(4.5,7,11,21)}),ye.onPrimaryFixedVariant=de.fromPalette({name:"on_primary_fixed_variant",palette:t=>t.primaryPalette,tone:t=>be(t)?90:30,background:t=>ye.primaryFixedDim,secondBackground:t=>ye.primaryFixed,contrastCurve:new ge(3,4.5,7,11)}),ye.secondaryFixed=de.fromPalette({name:"secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>be(t)?80:90,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.secondaryFixed,ye.secondaryFixedDim,10,"lighter",!0)}),ye.secondaryFixedDim=de.fromPalette({name:"secondary_fixed_dim",palette:t=>t.secondaryPalette,tone:t=>be(t)?70:80,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.secondaryFixed,ye.secondaryFixedDim,10,"lighter",!0)}),ye.onSecondaryFixed=de.fromPalette({name:"on_secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>10,background:t=>ye.secondaryFixedDim,secondBackground:t=>ye.secondaryFixed,contrastCurve:new ge(4.5,7,11,21)}),ye.onSecondaryFixedVariant=de.fromPalette({name:"on_secondary_fixed_variant",palette:t=>t.secondaryPalette,tone:t=>be(t)?25:30,background:t=>ye.secondaryFixedDim,secondBackground:t=>ye.secondaryFixed,contrastCurve:new ge(3,4.5,7,11)}),ye.tertiaryFixed=de.fromPalette({name:"tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>be(t)?40:90,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.tertiaryFixed,ye.tertiaryFixedDim,10,"lighter",!0)}),ye.tertiaryFixedDim=de.fromPalette({name:"tertiary_fixed_dim",palette:t=>t.tertiaryPalette,tone:t=>be(t)?30:80,isBackground:!0,background:t=>ye.highestSurface(t),contrastCurve:new ge(1,1,3,4.5),toneDeltaPair:t=>new fe(ye.tertiaryFixed,ye.tertiaryFixedDim,10,"lighter",!0)}),ye.onTertiaryFixed=de.fromPalette({name:"on_tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>be(t)?100:10,background:t=>ye.tertiaryFixedDim,secondBackground:t=>ye.tertiaryFixed,contrastCurve:new ge(4.5,7,11,21)}),ye.onTertiaryFixedVariant=de.fromPalette({name:"on_tertiary_fixed_variant",palette:t=>t.tertiaryPalette,tone:t=>be(t)?90:30,background:t=>ye.tertiaryFixedDim,secondBackground:t=>ye.tertiaryFixed,contrastCurve:new ge(3,4.5,7,11)});class ve{constructor(t){this.sourceColorArgb=t.sourceColorArgb,this.variant=t.variant,this.contrastLevel=t.contrastLevel,this.isDark=t.isDark,this.sourceColorHct=le.fromInt(t.sourceColorArgb),this.primaryPalette=t.primaryPalette,this.secondaryPalette=t.secondaryPalette,this.tertiaryPalette=t.tertiaryPalette,this.neutralPalette=t.neutralPalette,this.neutralVariantPalette=t.neutralVariantPalette,this.errorPalette=pe.fromHueAndChroma(25,84)}static getRotatedHue(t,e,i){const s=t.hue;if(e.length!==i.length)throw new Error(`mismatch between hue length ${e.length} & rotations ${i.length}`);if(1===i.length)return jt(t.hue+i[0]);const r=e.length;for(let t=0;t<=r-2;t++){const r=e[t],n=e[t+1];if(r<s&&s<n)return jt(s+i[t])}return s}getArgb(t){return t.getArgb(this)}getHct(t){return t.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(ye.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(ye.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(ye.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(ye.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(ye.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(ye.background)}get onBackground(){return this.getArgb(ye.onBackground)}get surface(){return this.getArgb(ye.surface)}get surfaceDim(){return this.getArgb(ye.surfaceDim)}get surfaceBright(){return this.getArgb(ye.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(ye.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(ye.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(ye.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(ye.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(ye.surfaceContainerHighest)}get onSurface(){return this.getArgb(ye.onSurface)}get surfaceVariant(){return this.getArgb(ye.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(ye.onSurfaceVariant)}get inverseSurface(){return this.getArgb(ye.inverseSurface)}get inverseOnSurface(){return this.getArgb(ye.inverseOnSurface)}get outline(){return this.getArgb(ye.outline)}get outlineVariant(){return this.getArgb(ye.outlineVariant)}get shadow(){return this.getArgb(ye.shadow)}get scrim(){return this.getArgb(ye.scrim)}get surfaceTint(){return this.getArgb(ye.surfaceTint)}get primary(){return this.getArgb(ye.primary)}get onPrimary(){return this.getArgb(ye.onPrimary)}get primaryContainer(){return this.getArgb(ye.primaryContainer)}get onPrimaryContainer(){return this.getArgb(ye.onPrimaryContainer)}get inversePrimary(){return this.getArgb(ye.inversePrimary)}get secondary(){return this.getArgb(ye.secondary)}get onSecondary(){return this.getArgb(ye.onSecondary)}get secondaryContainer(){return this.getArgb(ye.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(ye.onSecondaryContainer)}get tertiary(){return this.getArgb(ye.tertiary)}get onTertiary(){return this.getArgb(ye.onTertiary)}get tertiaryContainer(){return this.getArgb(ye.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(ye.onTertiaryContainer)}get error(){return this.getArgb(ye.error)}get onError(){return this.getArgb(ye.onError)}get errorContainer(){return this.getArgb(ye.errorContainer)}get onErrorContainer(){return this.getArgb(ye.onErrorContainer)}get primaryFixed(){return this.getArgb(ye.primaryFixed)}get primaryFixedDim(){return this.getArgb(ye.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(ye.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(ye.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(ye.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(ye.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(ye.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(ye.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(ye.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(ye.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(ye.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(ye.onTertiaryFixedVariant)}}class we extends ve{constructor(t,e,i){super({sourceColorArgb:t.toInt(),variant:me.EXPRESSIVE,contrastLevel:i,isDark:e,primaryPalette:pe.fromHueAndChroma(jt(t.hue+240),40),secondaryPalette:pe.fromHueAndChroma(ve.getRotatedHue(t,we.hues,we.secondaryRotations),24),tertiaryPalette:pe.fromHueAndChroma(ve.getRotatedHue(t,we.hues,we.tertiaryRotations),32),neutralPalette:pe.fromHueAndChroma(t.hue+15,8),neutralVariantPalette:pe.fromHueAndChroma(t.hue+15,12)})}}we.hues=[0,21,51,121,151,191,271,321,360],we.secondaryRotations=[45,95,45,20,45,90,45,45,45],we.tertiaryRotations=[120,120,20,45,20,15,20,120,120];class xe extends ve{constructor(t,e,i){super({sourceColorArgb:t.toInt(),variant:me.TONAL_SPOT,contrastLevel:i,isDark:e,primaryPalette:pe.fromHueAndChroma(t.hue,36),secondaryPalette:pe.fromHueAndChroma(t.hue,16),tertiaryPalette:pe.fromHueAndChroma(jt(t.hue+60),24),neutralPalette:pe.fromHueAndChroma(t.hue,6),neutralVariantPalette:pe.fromHueAndChroma(t.hue,8)})}}class $e extends ve{constructor(t,e,i){super({sourceColorArgb:t.toInt(),variant:me.VIBRANT,contrastLevel:i,isDark:e,primaryPalette:pe.fromHueAndChroma(t.hue,200),secondaryPalette:pe.fromHueAndChroma(ve.getRotatedHue(t,$e.hues,$e.secondaryRotations),24),tertiaryPalette:pe.fromHueAndChroma(ve.getRotatedHue(t,$e.hues,$e.tertiaryRotations),32),neutralPalette:pe.fromHueAndChroma(t.hue,10),neutralVariantPalette:pe.fromHueAndChroma(t.hue,12)})}}function Se(t){const e=Xt(t),i=Jt(t),s=Zt(t),r=[e.toString(16),i.toString(16),s.toString(16)];for(const[t,e]of r.entries())1===e.length&&(r[t]="0"+e);return"#"+r.join("")}$e.hues=[0,41,61,101,131,181,251,301,360],$e.secondaryRotations=[18,15,10,12,15,18,15,12,12],$e.tertiaryRotations=[35,30,20,25,30,35,30,25,25];const Ie={"--md-sys-color-primary":ye.primary,"--md-sys-color-on-primary":ye.onPrimary,"--md-sys-color-primary-container":ye.primaryContainer,"--md-sys-color-on-primary-container":ye.onPrimaryContainer,"--md-sys-color-secondary":ye.secondary,"--md-sys-color-on-secondary":ye.onSecondary,"--md-sys-color-secondary-container":ye.secondaryContainer,"--md-sys-color-on-secondary-container":ye.onSecondaryContainer,"--md-sys-color-tertiary":ye.tertiary,"--md-sys-color-on-tertiary":ye.onTertiary,"--md-sys-color-tertiary-container":ye.tertiaryContainer,"--md-sys-color-on-tertiary-container":ye.onTertiaryContainer,"--md-sys-color-error":ye.error,"--md-sys-color-on-error":ye.onError,"--md-sys-color-error-container":ye.errorContainer,"--md-sys-color-on-error-container":ye.onErrorContainer,"--md-sys-color-background":ye.background,"--md-sys-color-on-background":ye.onBackground,"--md-sys-color-surface":ye.surface,"--md-sys-color-on-surface":ye.onSurface,"--md-sys-color-surface-variant":ye.surfaceVariant,"--md-sys-color-on-surface-variant":ye.onSurfaceVariant,"--md-sys-color-surface-container-lowest":ye.surfaceContainerLowest,"--md-sys-color-surface-container-low":ye.surfaceContainerLow,"--md-sys-color-surface-container":ye.surfaceContainer,"--md-sys-color-surface-container-high":ye.surfaceContainerHigh,"--md-sys-color-surface-container-highest":ye.surfaceContainerHighest,"--md-sys-color-outline":ye.outline,"--md-sys-color-outline-variant":ye.outlineVariant,"--md-sys-color-inverse-surface":ye.inverseSurface,"--md-sys-color-inverse-on-surface":ye.inverseOnSurface,"--md-sys-color-inverse-primary":ye.inversePrimary,"--md-sys-color-shadow":ye.shadow,"--md-sys-color-scrim":ye.scrim,"--md-sys-color-surface-tint":ye.surfaceTint},ke=Object.keys(Ie);function Ce(t,e,i,s={}){return function(t){const e={};for(const i of ke){const s=Ie[i];e[i]=Se(s.getArgb(t))}return e}(function(t,e,i,s={}){const r=s.dark??!1,n=t=>Math.max(0,Math.min(255,Math.round(t))),o=Yt(n(t),n(e),n(i)),a=le.fromInt(o);return new xe(a,r,0)}(t,e,i,s))}function Pe(t,e,i,s,r={}){const n=Ce(e,i,s,r);return function(t,e){const i=function(t){return function(t){return void 0!==t.style}(t)?t.style:t}(t);for(const t of ke)i.setProperty(t,e[t])}(t,n),n}class Ee{constructor(t){this.host=t,this._controllerId="",this._controllers=[],this._lastSeed=null,this._applyAccentDebounced=It((t,e)=>{const i=this.host.style;i&&Pe({style:i},t[0],t[1],t[2],e)},50,100),t.addController(this)}hostConnected(){}hostDisconnected(){this._applyAccentDebounced.cancel()}get controllerId(){return this._controllerId}get controllers(){return this._controllers}masterEntityFor(t){return this._controllers.find(e=>e.entry_id===t)?.master_entity_id??""}get masterEntity(){return this.masterEntityFor(this._controllerId)}setControllerId(t){t&&t!==this._controllerId&&(this._controllerId=t,this.host.requestUpdate())}applyAccentFromSegment(t,e={}){const i=function(t){const e=At(t?.col)[0];if(!e)return null;const[i,s,r]=[e[0]??0,e[1]??0,e[2]??0];return 0===i&&0===s&&0===r?null:[i,s,r]}(t);if(!i)return void this.clearAccent();const s=function(t){if("boolean"==typeof t)return t;try{return"function"==typeof matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches}catch{return!1}}(e.dark),r=`${i[0]},${i[1]},${i[2]},${s?1:0}`;r!==this._lastSeed&&(this._lastSeed=r,this._applyAccentDebounced(i,{...e,dark:s}))}clearAccent(){if(this._applyAccentDebounced.cancel(),null===this._lastSeed)return;this._lastSeed=null;const t=this.host.style;if(t)for(const e of ke)t.removeProperty?.(e)}async loadControllers(t){try{const e=await St(t);this._controllers=e;const i=this._controllerId&&e.some(t=>t.entry_id===this._controllerId);if(!i){const t=e[0];t?.entry_id&&(this._controllerId=String(t.entry_id))}this.host.requestUpdate()}catch{}}}function Me(t){return(e,i)=>{const s=customElements.get(t);return s||(customElements.define(t,e),e)}}const Ae=.55,Te=1,Le=1,De=0,Ne=0,Be=0,Oe=1,Re=0,Fe=0,ze=1,Ue=1;function He(t){return function(t,e){return t?{url:t,opacity:e?.opacity??Ae,brightness:e?.brightness??Te,saturation:e?.saturation??Le,rotation:e?.rotation??De,offsetX:e?.offsetX??Ne,offsetY:e?.offsetY??Be,scale:e?.scale??Oe,cropX:e?.cropX??Re,cropY:e?.cropY??Fe,cropW:e?.cropW??ze,cropH:e?.cropH??Ue}:null}(t.background?.url??t.background_url,t.background??null)}function je(t,e=!1){return new Promise((i,s)=>{const r=new Image;r.onload=()=>i(r),r.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(r,t,e)})}let We=class extends bt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),r=t.leds_hex[e]??"000000",n=4*s;8===r.length?(i[n]=parseInt(r.slice(0,2),16),i[n+1]=parseInt(r.slice(2,4),16),i[n+2]=parseInt(r.slice(4,6),16),i[n+3]=parseInt(r.slice(6,8),16)):(i[n]=parseInt(r.slice(0,2),16),i[n+1]=parseInt(r.slice(2,4),16),i[n+2]=parseInt(r.slice(4,6),16),i[n+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("highlightSegIds")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,r=i.stop??i.len??this.pixelCount;return t>=s&&t<r}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:r,h:n}=this._logicalCanvasSize();return[(t-s.left)/s.width*r,(e-s.top)/s.height*n]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,r]=i,{w:n,h:o}=this._logicalCanvasSize(),a=this._layoutMap(n,o);if(!a)return null;const{toCanvas:l,hitR:c}=a;let h=null,d=c*c;for(const t of this._positions){const[e,i]=l(t.x,t.y),n=e-s,o=i-r,a=n*n+o*o;a<d&&(d=a,h=t)}return h}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const r of this._positions)r.x<t&&(t=r.x),r.x>e&&(e=r.x),r.y<i&&(i=r.y),r.y>s&&(s=r.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:r,rangeX:n,rangeY:o}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,c=(t-2*l)/n,h=(e-2*l)/o,d=Math.min(c,h),p=this.compact?Math.max(8,3*a):Math.max(3.5,1.75*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-r)*d],hitR:Math.max(10,2.5*p),lineW:p}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--wled-accent").trim()||"#03a9f4"}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),r=Math.min(2,window.devicePixelRatio||1),n=Math.floor(i*r),o=Math.floor(s*r);if(t.width!==n||t.height!==o){t.width=n,t.height=o;const e=this._ctx;e&&e.setTransform(r,0,0,r,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await async function(t,e,i){return(await Nt(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=He(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await async function(t,e,i,s){return(await Nt(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?je(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=xt(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle=this._surfaceFill(),t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&function(t,e,i,s,r){const n=r.opacity??Ae,o=r.brightness??1,a=r.saturation??1,l=(r.rotation??0)*Math.PI/180,c=(r.offsetX??0)*e,h=(r.offsetY??0)*i,d=r.scale??1,p=r.cropX??0,u=r.cropY??0,g=r.cropW??1,f=r.cropH??1,m=s.naturalWidth*g,_=s.naturalHeight*f,b=s.naturalWidth*p,y=s.naturalHeight*u,v=Math.max(e/m,i/_)*d,w=m*v,x=_*v;t.save(),t.globalAlpha=n,t.filter=`brightness(${o}) saturate(${a})`,t.translate(e/2+c,i/2+h),t.rotate(l),t.drawImage(s,b,y,m,_,-w/2,-x/2,w,x),t.restore()}(t,i,s,this._bgImage,this._bgLayer);const r=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,n=[...this._positions].sort((t,e)=>t.led-e.led),o=this.dotRadius,a=this._layoutMap(i,s);if(n.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const o=(n,o)=>{const[a,l]=e(n.x,n.y),[c,h]=e(o.x,o.y),[d,p,u]=this._rgbForLed(r,n.led);!s&&(d>10||p>10||u>10)?(t.shadowColor=`rgba(${d},${p},${u},0.55)`,t.shadowBlur=i*(this.compact?2:1.5)):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${p},${u})`,t.beginPath(),t.moveTo(a,l),t.lineTo(c,h),t.stroke()};for(let t=0;t<n.length-1;t++)o(n[t],n[t+1]);this._closed&&n.length>=2&&o(n[n.length-1],n[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of n){const[n,c]=e(i,a),[h,d,p]=this._rgbForLed(r,l);!s&&(h>10||d>10||p>10)?(t.shadowColor=`rgba(${h},${d},${p},0.7)`,t.shadowBlur=2.5*o):t.shadowBlur=0,t.beginPath(),t.arc(n,c,o,0,2*Math.PI),t.fillStyle=`rgb(${h},${d},${p})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,n,e):this._paintSegmentSelection(t,n,e,i)}else{const e=this.pixelCount,n=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(r){const t=4*i;e=r[t],s=r[t+1],l=r[t+2]}t.beginPath(),t.arc(4+i*n+n/2,a,o,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[r,n]=i(s.x,s.y),o=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(r,n,o,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(r-o-4,n),t.lineTo(r+o+4,n),t.moveTo(r,n-o-4),t.lineTo(r,n+o+4),t.stroke(),t.restore()}_highlightIds(){if(this.highlightSegIds.length)return[...new Set(this.highlightSegIds)];if(this.selectedSegId>=0)return[this.selectedSegId];if(this._hoverLed>=0){const t=this._segmentForLed(this._hoverLed);return t>=0?[t]:[]}return[]}_paintSegmentSelection(t,e,i,s){const r=this._highlightIds();if(!r.length||0===this.segments.length)return;const n=this._accentStroke(),o=Math.max(1.25,Math.min(2.5,.45*s));t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0;for(const s of r){const r=e.filter(t=>this._ledInSegment(t.led,s)).sort((t,e)=>t.led-e.led);if(r.length<2)continue;const[a,l]=i(r[0].x,r[0].y);t.beginPath(),t.moveTo(a,l);for(let e=1;e<r.length;e++){const[s,n]=i(r[e].x,r[e].y);t.lineTo(s,n)}t.strokeStyle="rgba(0, 0, 0, 0.55)",t.lineWidth=o+1.5,t.stroke(),t.strokeStyle=n,t.lineWidth=o,t.stroke()}t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return j`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:j`
              <label class="mode-toggle">
                <input
                  type="checkbox"
                  .checked=${this._showDots}
                  @change=${t=>{this._showDots=t.target.checked,this._schedPaint()}}
                />
                LED dots
              </label>
            `}
        <div class="wrap" role="img" aria-label=${t}>
          <canvas></canvas>
          ${e?j`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?j`<span class="overlay">No layout — create one in Layout view</span>`:null}
        </div>
      </div>
    `}static{this.styles=[..._t,o`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      :host([paintmode]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      :host([compact]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      .preview-shell {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      .mode-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        opacity: 0.85;
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
      }
      .mode-toggle input {
        margin: 0;
      }
      .preview-shell.compact .wrap {
        min-height: var(--wled-preview-height, 200px);
        aspect-ratio: 16 / 9;
        max-height: none;
        flex: none;
      }
      .preview-shell.paint .wrap {
        width: 100%;
        max-width: 100%;
        max-height: min(70vh, 480px);
        aspect-ratio: var(--wled-layout-aspect, 1);
        min-height: 120px;
        flex: none;
        height: auto;
      }
      .wrap {
        position: relative;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        background: var(--wled-surface);
        width: 100%;
        flex: 1;
        min-height: 160px;
        max-height: 100%;
      }
      .preview-shell.paint {
        height: auto;
        max-height: none;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        max-height: 100%;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--wled-text-muted);
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
    `]}};t([ht({attribute:!1})],We.prototype,"connection",void 0),t([ht()],We.prototype,"controllerId",void 0),t([ht()],We.prototype,"layoutId",void 0),t([ht()],We.prototype,"fixtureId",void 0),t([ht({type:Number})],We.prototype,"pixelCount",void 0),t([ht({type:Number})],We.prototype,"dotRadius",void 0),t([ht({type:Boolean,reflect:!0})],We.prototype,"compact",void 0),t([ht({type:Number})],We.prototype,"heightPx",void 0),t([ht({type:Boolean})],We.prototype,"externalLive",void 0),t([ht({type:Boolean,reflect:!0})],We.prototype,"paintMode",void 0),t([ht({type:Boolean})],We.prototype,"paintLivePreview",void 0),t([ht({type:Number})],We.prototype,"paintBrushSize",void 0),t([ht({type:Array})],We.prototype,"segments",void 0),t([ht({type:Number})],We.prototype,"selectedSegId",void 0),t([ht({type:Array})],We.prototype,"highlightSegIds",void 0),t([dt()],We.prototype,"_positions",void 0),t([dt()],We.prototype,"_status",void 0),t([dt()],We.prototype,"_showDots",void 0),t([dt()],We.prototype,"_closed",void 0),We=t([Me("wled-geometry-preview")],We);const Ve="wled-toast";function qe(t,e){const i=e.trim();i&&t.dispatchEvent(new CustomEvent(Ve,{detail:{message:i},bubbles:!0,composed:!0}))}class Ge extends Error{constructor(t,e){super("Scene conflict"),this.name="SceneConflictError",this.remote=t,this.etag=e}}async function Ye(t,e){return await $t(t),t.sendMessagePromise({...e,schema_version:1})}async function Ke(t,e){return(await Ye(t,{type:"wled_studio/scene_list",controller_id:e})).scenes??[]}async function Xe(t,e,i,s){try{return(await Ye(t,{type:"wled_studio/scene_capture",controller_id:e,name:i,scene_id:s?.sceneId,layout_id:s?.layoutId,transition_ms:s?.transitionMs??2500})).scene??{id:"",controller_id:e,name:i,wled_state:{}}}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new Ge(e.data.scene,String(e.data.etag??e.message??""));throw t}}function Je(t,e){const i=new Set(t);return i.has(e)?i.delete(e):i.add(e),[...i].sort((t,e)=>t-e)}function Ze(t,e){const i=t.id,s=e.find(t=>t.wled_segment_id===i||t.segment_index===i||t.entity_id.endsWith(`_segment_${i}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||s?.name?.replace(/^.*\s—\s/,"")||`Seg ${i+1}`} (${t.start??"?"}–${t.stop??"?"})`}const Qe="wled_studio.effect_defaults",ti="wled_studio.effect_library";function ei(t){return Number.isFinite(t)?Math.min(255,Math.max(0,Math.round(t))):null}function ii(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function si(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function ri(t,e){if(!t)return null;const i=function(t){return ii(Qe)[t]??{}}(t)[String(e)];return i??null}function ni(t){return t?ii(ti)[t]??[]:[]}function oi(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}const ai={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Music",palette:"Palette"};function li(t){return void 0!==t.Solid?t.Solid:0}const ci=/\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;function hi(t,e,i,s,r){if("all"===i)return!0;const n=s[e]??null,o=t.toLowerCase();return"solid"===i?e===li(r):"2d"===i?"2"===n||o.includes("2d"):"1d"===i?"2"!==n&&!o.includes("2d"):"sound"===i?function(t,e,i){const s=i[e]??null;return"v"===s||"f"===s||ci.test(t)}(t,e,s):"palette"!==i||(o.includes("palette")||o.includes("colorloop")||o.includes("pride")||o.includes("cycle"))}const di="wled_studio.segment_snapshot",pi="wled_studio.merge_for_effects",ui=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function gi(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function fi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function mi(t){if(!t)return!1;const e=gi(pi);return!(t in e)||Boolean(e[t])}function _i(t){if(!t)return!1;const e=gi(pi);return t in e&&Boolean(e[t])}function bi(t,e){const i=t.find(t=>0===t.id);if(!i||e<=0)return!1;return(i.stop??0)-(i.start??0)>=.9*e}function yi(t,e){const i=gi(pi);e?i[t]=!0:delete i[t],fi(pi,i)}function vi(t){return gi(di)[t]??null}function wi(t,e,i){const s={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:i},r=gi(di);return r[t]=s,fi(di,r),s}function xi(t){return{seg:t.segments.map(t=>function(t){const e=t,i={id:t.id};for(const t of ui){const s=e[t];void 0!==s&&(i[t]=s)}return i}(t))}}function $i(t,e,i){const s=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],r=i?.length?new Set(i):null,n=r?s.filter(t=>r.has(t.id)):s,o=n.filter(t=>(t.stop??0)>(t.start??0)),a=o.length?o:n.length?n:s,l=Math.min(...a.map(t=>t.start??0)),c=Math.max(...a.map(t=>t.stop??e)),h=a[0],d={id:0,start:l,stop:c,on:!1!==h.on,sel:!0,bri:h.bri??255,fx:h.fx??0,n:"Merged (effects)"};void 0!==h.col&&(d.col=h.col),void 0!==h.pal&&(d.pal=h.pal);const p=[d];for(const t of s){if(0===t.id)continue;const e=t.stop??t.start??0;p.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:p}}function Si(t,e){const i=t.find(t=>0===t.id);return i?[0]:t.length?[t[0].id]:[0]}function Ii(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:At(t.col),awm:t.awm};return JSON.stringify(e)}function ki(t,e,i){let s,r=null,n=0;const o=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await kt(t,e)).segments??[]).find(t=>t.id===n);if(!s||!r)return;const o=Ii(r);if(o===Ii(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(At(t.col))!==JSON.stringify(At(e.col))}(r,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=It((s,a)=>{r=a,n=a.id,Ct(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(r={...a,...i,id:a.id}),o()}).catch(t=>{i(a,`Failed to apply state to WLED: ${oi(t)}`)})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var Ci,Pi,Ei,Mi,Ai,Ti={},Li=[],Di=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Ni(t,e){for(var i in e)t[i]=e[i];return t}function Bi(t){var e=t.parentNode;e&&e.removeChild(t)}function Oi(t,e,i){var s,r,n,o,a=arguments;if(e=Ni({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(r in t.defaultProps)void 0===e[r]&&(e[r]=t.defaultProps[r]);return o=e.key,null!=(n=e.ref)&&delete e.ref,null!=o&&delete e.key,Ri(t,e,o,n)}function Ri(t,e,i,s){var r={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return Ci.vnode&&Ci.vnode(r),r}function Fi(t){return t.children}function zi(t,e){this.props=t,this.context=e}function Ui(t,e){if(null==e)return t.__p?Ui(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?Ui(t):null}function Hi(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return Hi(t)}}function ji(t){(!t.__d&&(t.__d=!0)&&1===Pi.push(t)||Mi!==Ci.debounceRendering)&&(Mi=Ci.debounceRendering,(Ci.debounceRendering||Ei)(Wi))}function Wi(){var t,e,i,s,r,n,o,a;for(Pi.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Pi.pop();)t.__d&&(i=void 0,s=void 0,n=(r=(e=t).__v).__e,o=e.__P,a=e.u,e.u=!1,o&&(i=[],s=Xi(o,r,Ni({},r),e.__n,void 0!==o.ownerSVGElement,null,i,a,null==n?Ui(r):n),Ji(i,r),s!=n&&Hi(r)))}function Vi(t,e,i,s,r,n,o,a,l){var c,h,d,p,u,g,f,m=i&&i.__k||Li,_=m.length;if(a==Ti&&(a=null!=n?n[0]:_?Ui(i,0):null),c=0,e.__k=qi(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=m[c])||d&&i.key==d.key&&i.type===d.type)m[c]=void 0;else for(h=0;h<_;h++){if((d=m[h])&&i.key==d.key&&i.type===d.type){m[h]=void 0;break}d=null}if(p=Xi(t,i,d=d||Ti,s,r,n,o,null,a,l),(h=i.ref)&&d.ref!=h&&(f||(f=[])).push(h,i.__c||p,i),null!=p){if(null==g&&(g=p),null!=i.l)p=i.l,i.l=null;else if(n==d||p!=a||null==p.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(p);else{for(u=a,h=0;(u=u.nextSibling)&&h<_;h+=2)if(u==p)break t;t.insertBefore(p,a)}"option"==e.type&&(t.value="")}a=p.nextSibling,"function"==typeof e.type&&(e.l=p)}}return c++,i}),e.__e=g,null!=n&&"function"!=typeof e.type)for(c=n.length;c--;)null!=n[c]&&Bi(n[c]);for(c=_;c--;)null!=m[c]&&ts(m[c],m[c]);if(f)for(c=0;c<f.length;c++)Qi(f[c],f[++c],f[++c])}function qi(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)qi(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return Ri(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=Ri(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Gi(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Di.test(e)?i+"px":null==i?"":i}function Yi(t,e,i,s,r){var n,o,a,l,c;if("key"===(e=r?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(n=t.style,"string"==typeof i)n.cssText=i;else{if("string"==typeof s&&(n.cssText="",s=null),s)for(o in s)i&&o in i||Gi(n,o,"");if(i)for(a in i)s&&i[a]===s[a]||Gi(n,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Ki,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Ki,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!r&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Ki(t){return this.t[t.type](Ci.event?Ci.event(t):t)}function Xi(t,e,i,s,r,n,o,a,l,c){var h,d,p,u,g,f,m,_,b,y,v=e.type;if(void 0!==e.constructor)return null;(h=Ci.__b)&&h(e);try{t:if("function"==typeof v){if(_=e.props,b=(h=v.contextType)&&s[h.__c],y=h?b?b.props.value:h.__p:s,i.__c?m=(d=e.__c=i.__c).__p=d.__E:("prototype"in v&&v.prototype.render?e.__c=d=new v(_,y):(e.__c=d=new zi(_,y),d.constructor=v,d.render=es),b&&b.sub(d),d.props=_,d.state||(d.state={}),d.context=y,d.__n=s,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=v.getDerivedStateFromProps&&Ni(d.__s==d.state?d.__s=Ni({},d.__s):d.__s,v.getDerivedStateFromProps(_,d.__s)),p)null==v.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==v.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(_,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(_,d.__s,y)){for(d.props=_,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(_,d.__s,y)}for(u=d.props,g=d.state,d.context=y,d.props=_,d.state=d.__s,(h=Ci.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=qi(null!=h&&h.type==Fi&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=Ni(Ni({},s),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(u,g)),Vi(t,e,i,s,r,n,o,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);p||null==u||null==d.componentDidUpdate||d.componentDidUpdate(u,g,f),m&&(d.__E=d.__p=null)}else e.__e=Zi(i.__e,e,i,s,r,n,o,c);(h=Ci.diffed)&&h(e)}catch(t){Ci.__e(t,e,i)}return e.__e}function Ji(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){Ci.__e(t,i.__v)}Ci.__c&&Ci.__c(e)}function Zi(t,e,i,s,r,n,o,a){var l,c,h,d,p=i.props,u=e.props;if(r="svg"===e.type||r,null==t&&null!=n)for(l=0;l<n.length;l++)if(null!=(c=n[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,n[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(u);t=r?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),n=null}return null===e.type?p!==u&&(null!=n&&(n[n.indexOf(t)]=null),t.data=u):e!==i&&(null!=n&&(n=Li.slice.call(t.childNodes)),h=(p=i.props||Ti).dangerouslySetInnerHTML,d=u.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,r){var n;for(n in i)n in e||Yi(t,n,null,i[n],s);for(n in e)r&&"function"!=typeof e[n]||"value"===n||"checked"===n||i[n]===e[n]||Yi(t,n,e[n],i[n],s)}(t,u,p,r,a),e.__k=e.props.children,d||Vi(t,e,i,s,"foreignObject"!==e.type&&r,n,o,Ti,a),a||("value"in u&&void 0!==u.value&&u.value!==t.value&&(t.value=null==u.value?"":u.value),"checked"in u&&void 0!==u.checked&&u.checked!==t.checked&&(t.checked=u.checked))),t}function Qi(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){Ci.__e(t,i)}}function ts(t,e,i){var s,r,n;if(Ci.unmount&&Ci.unmount(t),(s=t.ref)&&Qi(s,null,e),i||"function"==typeof t.type||(i=null!=(r=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){Ci.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(n=0;n<s.length;n++)s[n]&&ts(s[n],e,i);null!=r&&Bi(r)}function es(t,e,i){return this.constructor(t,i)}function is(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function ss(){return ss=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},ss.apply(this,arguments)}Ci={},zi.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=Ni({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&Ni(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),ji(this))},zi.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,ji(this))},zi.prototype.render=Fi,Pi=[],Ei="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Mi=Ci.debounceRendering,Ci.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return ji(s.__E=s)}catch(e){t=e}throw t},Ai=Ti;var rs="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ns="[\\s|\\(]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")\\s*\\)?",os="[\\s|\\(]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")\\s*\\)?",as=new RegExp("rgb"+ns),ls=new RegExp("rgba"+os),cs=new RegExp("hsl"+ns),hs=new RegExp("hsla"+os),ds="^(?:#?|0x?)",ps="([0-9a-fA-F]{1})",us="([0-9a-fA-F]{2})",gs=new RegExp(ds+ps+ps+ps+"$"),fs=new RegExp(ds+ps+ps+ps+ps+"$"),ms=new RegExp(ds+us+us+us+"$"),_s=new RegExp(ds+us+us+us+us+"$"),bs=Math.log,ys=Math.round,vs=Math.floor;function ws(t,e,i){return Math.min(Math.max(t,e),i)}function xs(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function $s(t){return parseInt(t,16)}function Ss(t){return t.toString(16).padStart(2,"0")}var Is=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ss({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=ss({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,r=vs(e),n=e-r,o=s*(1-i),a=s*(1-n*i),l=s*(1-(1-n)*i),c=r%6,h=[l,s,s,a,o,o][c],d=[o,o,l,s,s,a][c];return{r:ws(255*[s,a,o,o,l,s][c],0,255),g:ws(255*h,0,255),b:ws(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,r=Math.max(e,i,s),n=Math.min(e,i,s),o=r-n,a=0,l=r,c=0===r?0:o/r;switch(r){case n:a=0;break;case e:a=(i-s)/o+(i<s?6:0);break;case i:a=(s-e)/o+2;break;case s:a=(e-i)/o+4}return{h:60*a%360,s:ws(100*c,0,100),v:ws(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,r=s<=1?s:2-s,n=r<1e-9?0:e*i/r;return{h:t.h,s:ws(100*n,0,100),l:ws(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:ws(100*s,0,100),v:ws((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,r=t/100;return r<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=r-2)+104.49216199393888*bs(i),s=r<20?0:.8274096064007395*(s=r-10)-254.76935184120902+115.67994401066147*bs(s)):(e=351.97690566805693+.114206453784165*(e=r-55)-40.25366309332127*bs(e),i=325.4494125711974+.07943456536662342*(i=r-50)-28.0852963507957*bs(i),s=255),{r:ws(vs(e),0,255),g:ws(vs(i),0,255),b:ws(vs(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,r=e.b,n=2e3,o=4e4;o-n>.4;){i=.5*(o+n);var a=t.kelvinToRgb(i);a.b/a.r>=r/s?o=i:n=i}return i},is(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ss({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return ss({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ss({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ss({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ss({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ss({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,r=e.b;return{r:ys(i),g:ys(s),b:ys(r)}},set:function(e){this.hsv=ss({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ss({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,r=e.l;return{h:ys(i),s:ys(s),l:ys(r)}},set:function(e){this.hsv=ss({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ss({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,r,n=1;if((e=as.exec(t))?(i=xs(e[1],255),s=xs(e[2],255),r=xs(e[3],255)):(e=ls.exec(t))&&(i=xs(e[1],255),s=xs(e[2],255),r=xs(e[3],255),n=xs(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:r,a:n}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+Ss(t.r)+Ss(t.g)+Ss(t.b)},set:function(t){var e,i,s,r,n=255;if((e=gs.exec(t))?(i=17*$s(e[1]),s=17*$s(e[2]),r=17*$s(e[3])):(e=fs.exec(t))?(i=17*$s(e[1]),s=17*$s(e[2]),r=17*$s(e[3]),n=17*$s(e[4])):(e=ms.exec(t))?(i=$s(e[1]),s=$s(e[2]),r=$s(e[3])):(e=_s.exec(t))&&(i=$s(e[1]),s=$s(e[2]),r=$s(e[3]),n=$s(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:r,a:n/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+Ss(t.r)+Ss(t.g)+Ss(t.b)+Ss(vs(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,r,n=1;if((e=cs.exec(t))?(i=xs(e[1],360),s=xs(e[2],100),r=xs(e[3],100)):(e=hs.exec(t))&&(i=xs(e[1],360),s=xs(e[2],100),r=xs(e[3],100),n=xs(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:r,a:n}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function ks(t){var e,i=t.width,s=t.sliderSize,r=t.borderWidth,n=t.handleRadius,o=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*o+2*n,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*o-2*n,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-r/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Cs(t,e){var i=ks(t),s=i.width,r=i.height,n=i.handleRange,o=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var r=t.minTemperature,n=t.maxTemperature-r,o=(e.kelvin-r)/n*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:r/2,h=o+l/100*n;return a&&(h=-1*h+n+2*o),{x:a?c:h,y:a?h:c}}var Ps,Es=2*Math.PI,Ms=function(t,e){return Math.sqrt(t*t+e*e)};function As(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Ts(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Ls(t,e,i){var s=t.wheelAngle,r=t.wheelDirection;return i&&"clockwise"===r?e=s+e:"clockwise"===r?e=360-s+e:i&&"anticlockwise"===r?e=s+180-e:"anticlockwise"===r&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function Ds(t,e,i){var s=Ts(t),r=s.cx,n=s.cy,o=As(t);e=r-e,i=n-i;var a=Ls(t,Math.atan2(-i,-e)*(360/Es)),l=Math.min(Ms(e,i),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function Ns(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function Bs(t,e,i){var s=Ns(t),r=s.width,n=s.height,o=s.radius,a=(e-o)/(r-2*o)*100,l=(i-o)/(n-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function Os(t){Ps||(Ps=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),r=window.location;return(i||s)&&Ps.length>0?r.protocol+"//"+r.host+r.pathname+r.search+t:t}function Rs(t,e,i,s){for(var r=0;r<s.length;r++){var n=s[r].x-e,o=s[r].y-i;if(Math.sqrt(n*n+o*o)<t.handleRadius)return r}return null}function Fs(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function zs(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function Us(t){return"string"==typeof t?t:t+"px"}var Hs=["mousemove","touchmove","mouseup","touchend"],js=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,r=null===t.margin?t.sliderMargin:t.margin,n={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(n[s?"marginLeft":"marginTop"]=r),Oi(Fi,null,t.children(this.uid,i,n))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var r=t.touches?t.changedTouches[0]:t,n=r.clientX-s.left,o=r.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(n,o,0)&&Hs.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(n,o,1);break;case"mouseup":case"touchend":i(n,o,2),Hs.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(zi);function Ws(t){var e=t.r,i=t.url,s=e,r=e;return Oi("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+Us(t.x)+", "+Us(t.y)+")",willChange:"transform",top:Us(-e),left:Us(-e),width:Us(2*e),height:Us(2*e),position:"absolute",overflow:"visible"}},i&&Oi("use",Object.assign({xlinkHref:Os(i)},t.props)),!i&&Oi("circle",{cx:s,cy:r,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Oi("circle",{cx:s,cy:r,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Vs(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=ks(t),r=s.width,n=s.height,o=s.radius,a=Cs(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var r=[],n=t.minTemperature,o=t.maxTemperature,a=o-n,l=n,c=0;l<o;l+=a/8,c+=1){var h=Is.kelvinToRgb(l),d=h.r,p=h.g,u=h.b;r.push([12.5*c,"rgb("+d+","+p+","+u+")"])}return r;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var g=Is.hsvToHsl({h:i.h,s:0,v:i.v}),f=Is.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var m=Is.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+m.h+","+m.s+"%,"+m.l+"%)"]]}}(t,i);return Oi(js,Object.assign({},t,{onInput:function(e,s,r){var n=function(t,e,i){var s,r=ks(t),n=r.handleRange,o=r.handleStart;s="horizontal"===t.layoutDirection?-1*i+n+o:e-o,s=Math.max(Math.min(s,n),0);var a=Math.round(100/n*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=n,t.onInput(r,t.id)}}),function(e,s,c){return Oi("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:Us(r),height:Us(n),borderRadius:Us(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Oi("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:Us(o),background:zs("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},Fs(t))}),Oi(Ws,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function qs(t){var e=Ns(t),i=e.width,s=e.height,r=e.radius,n=t.colors,o=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=n.map(function(e){return function(t,e){var i=Ns(t),s=i.width,r=i.height,n=i.radius,o=e.hsv,a=n,l=s-2*n,c=r-2*n;return{x:a+o.s/100*l,y:a+(c-o.v/100*c)}}(t,e)});return Oi(js,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var r=Rs(t,e,i,h);null!==r?o.setActiveColor(r):(o.inputActive=!0,l.hsv=Bs(t,e,i),t.onInput(s,t.id))}else 1===s&&(o.inputActive=!0,l.hsv=Bs(t,e,i));t.onInput(s,t.id)}}),function(e,o,a){return Oi("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:Us(i),height:Us(s),position:"relative"},a)}),Oi("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:Us(r)},Fs(t),{background:zs("linear","to bottom",c[1])+","+zs("linear","to right",c[0])})}),n.filter(function(t){return t!==l}).map(function(e){return Oi(Ws,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Oi(Ws,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}Ws.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Vs.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Gs(t){var e=Ts(t).width,i=t.colors;t.borderWidth;var s=t.parent,r=t.color,n=r.hsv,o=i.map(function(e){return function(t,e){var i=e.hsv,s=Ts(t),r=s.cx,n=s.cy,o=As(t),a=(180+Ls(t,i.h,!0))*(Es/360),l=i.s/100*o,c="clockwise"===t.wheelDirection?-1:1;return{x:r+l*Math.cos(a)*c,y:n+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Oi(js,Object.assign({},t,{onInput:function(e,i,n){if(0===n){if(!function(t,e,i){var s=Ts(t),r=s.cx,n=s.cy,o=t.width/2;return Ms(r-e,n-i)<o}(t,e,i))return!1;var a=Rs(t,e,i,o);null!==a?s.setActiveColor(a):(s.inputActive=!0,r.hsv=Ds(t,e,i),t.onInput(n,t.id))}else 1===n&&(s.inputActive=!0,r.hsv=Ds(t,e,i));t.onInput(n,t.id)}}),function(s,l,c){return Oi("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:Us(e),height:Us(e),position:"relative"},c)}),Oi("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Oi("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Oi("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-n.v/100})}),Oi("div",{className:"IroWheelBorder",style:Object.assign({},a,Fs(t))}),i.filter(function(t){return t!==r}).map(function(e){return Oi(Ws,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})}),Oi(Ws,{isActive:!0,index:r.index,fill:r.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[r.index].x,y:o[r.index].y}))})}var Ys=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Is(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var r=this.activeEvents;!!r.hasOwnProperty(t)&&r[t]||(r[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),r[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var r=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(r[t]||(r[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Gs},{component:Vs}],e.transparency&&s.push({component:Vs,options:{sliderType:"alpha"}})),Oi("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var r=t.component,n=t.options;return Oi(r,Object.assign({},e,n,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(zi);Ys.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Ks,Xs,Js,Zs=(Xs=function(t,e){var i,s=document.createElement("div");function r(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,r,n;Ci.__p&&Ci.__p(t,e),r=(s=i===Ai)?null:e.__k,t=Oi(Fi,null,[t]),n=[],Xi(e,e.__k=t,r||Ti,Ti,void 0!==e.ownerSVGElement,r?null:Li.slice.call(e.childNodes),n,!1,Ti,s),Ji(n,t)}(Oi(Ks,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?r():document.addEventListener("DOMContentLoaded",r),i},Xs.prototype=(Ks=Ys).prototype,Object.assign(Xs,Ks),Xs.__component=Ks,Xs);!function(t){var e;t.version="5.5.2",t.Color=Is,t.ColorPicker=Zs,(e=t.ui||(t.ui={})).h=Oi,e.ComponentBase=js,e.Handle=Ws,e.Slider=Vs,e.Wheel=Gs,e.Box=qs}(Js||(Js={}));var Qs=Js;const tr="wled_studio.color_swatches";function er(t){return t.trim()||"_default"}function ir(){try{const t=localStorage.getItem(tr);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function sr(t){const e=ir()[er(t)];return Array.isArray(e)?[...e]:[]}function rr(t,e){const i=ir();var s;i[er(t)]=e.slice(0,32),s=i,localStorage.setItem(tr,JSON.stringify(s))}function nr(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function or(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let ar=class extends bt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName="",this._pressTimer=null,this._pressSwatch=null,this._suppressChipClick=!1}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=sr(this.controllerId)}_currentKey(){return nr(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=or(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=sr(t),s=nr(e.rgb,e.white),r=i.find(t=>nr(t.rgb,t.white)===s);if(r)return r.name=e.name.trim()||r.name,rr(t,i),r;const n={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||or(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(n),rr(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=sr(t),r=s.findIndex(t=>t.id===e);if(r<0)return null;const n=s[r],o={...n,...i,rgb:i.rgb?[...i.rgb]:n.rgb};void 0!==i.name&&(o.name=i.name.trim()||or(o.rgb,o.white)),s[r]=o,rr(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e?.stopPropagation(),function(t,e){const i=sr(t).filter(t=>t.id!==e);rr(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_clearPressTimer(){null!==this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._pressSwatch=null}_confirmDelete(t){confirm(`Delete swatch "${t.name}"?`)&&this._delete(t.id),this._suppressChipClick=!1}_onChipTouchStart(t){this._clearPressTimer(),this._pressSwatch=t,this._pressTimer=setTimeout(()=>{this._pressTimer=null,this._suppressChipClick=!0,this._confirmDelete(t)},500)}_onChipTouchEnd(){this._clearPressTimer()}_onChipTouchMove(t){if(!this._pressSwatch||1!==t.touches.length)return;const e=t.touches[0],i=t.currentTarget.getBoundingClientRect();(e.clientX<i.left-12||e.clientX>i.right+12||e.clientY<i.top-12||e.clientY>i.bottom+12)&&this._clearPressTimer()}_onChipClick(t,e){if(this._suppressChipClick)return this._suppressChipClick=!1,e.preventDefault(),void e.stopPropagation();this._apply(t)}render(){const t=this._currentKey();return j`
      <section class="swatches" aria-label="Saved color swatches">
        <div class="head">
          <span class="label">Color library</span>
          <button
            type="button"
            class="save-btn"
            ?disabled=${this._saving}
            @click=${()=>this._openSave()}
            aria-label="Save current color to library"
          >
            <ha-icon icon="mdi:bookmark-plus-outline"></ha-icon>
            Save to library
          </button>
        </div>

        ${this._saving?j`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  placeholder="Swatch name"
                  .value=${this._saveName}
                  @input=${t=>{this._saveName=t.target.value}}
                  @keydown=${t=>{"Enter"===t.key&&this._confirmSave(),"Escape"===t.key&&this._cancelSave()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmSave()}>
                  Save
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelSave()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${this._editingId?j`
              <div class="inline-form" role="form">
                <input
                  type="text"
                  class="name-input"
                  .value=${this._editName}
                  @input=${t=>{this._editName=t.target.value}}
                  @keydown=${t=>{"Enter"===t.key&&this._confirmEdit(),"Escape"===t.key&&this._cancelEdit()}}
                />
                <button type="button" class="primary" @click=${()=>this._confirmEdit()}>
                  Rename
                </button>
                <button type="button" class="ghost" @click=${()=>this._cancelEdit()}>
                  Cancel
                </button>
              </div>
            `:null}

        ${0!==this._swatches.length||this._saving?j`
              <div class="grid" role="list">
                ${this._swatches.map(e=>j`
                    <div
                      class="chip-wrap ${nr(e.rgb,e.white)===t?"active":""}"
                      role="listitem"
                    >
                      <button
                        type="button"
                        class="chip"
                        title=${e.name}
                        style="background: ${this._swatchCss(e)}"
                        @click=${t=>this._onChipClick(e,t)}
                        @touchstart=${()=>this._onChipTouchStart(e)}
                        @touchend=${()=>this._onChipTouchEnd()}
                        @touchcancel=${()=>this._onChipTouchEnd()}
                        @touchmove=${t=>this._onChipTouchMove(t)}
                        aria-label=${`Apply ${e.name}`}
                      ></button>
                      <span class="chip-name">${e.name}</span>
                      <div class="chip-actions">
                        <button
                          type="button"
                          class="icon"
                          aria-label=${`Rename ${e.name}`}
                          @click=${t=>this._startEdit(e,t)}
                        >
                          <ha-icon icon="mdi:pencil-outline"></ha-icon>
                        </button>
                        <button
                          type="button"
                          class="icon danger"
                          aria-label=${`Remove ${e.name}`}
                          @click=${t=>{t.stopPropagation(),this._confirmDelete(e)}}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    </div>
                  `)}
              </div>
            `:j`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
      </section>
    `}static{this.styles=[..._t,o`
      .swatches {
        width: 100%;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.25));
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .label {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--wled-text-muted);
      }
      .save-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.35));
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 0.72rem;
        background: var(--card-background-color, transparent);
        color: inherit;
        cursor: pointer;
      }
      .save-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      .save-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        margin-bottom: 10px;
      }
      .name-input {
        flex: 1;
        min-width: 120px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #444);
        padding: 6px 10px;
        font-size: 0.8rem;
        background: var(--card-background-color);
        color: inherit;
      }
      .primary,
      .ghost {
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 0.75rem;
        cursor: pointer;
        border: none;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ghost {
        background: transparent;
        color: inherit;
        border: 1px solid var(--divider-color, #444);
      }
      .empty {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .chip-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 52px;
        position: relative;
      }
      .chip-wrap.active .chip {
        box-shadow:
          0 0 0 2px var(--card-background-color, #1a1a1a),
          0 0 0 4px var(--primary-color, #18a0fb);
      }
      .chip {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        cursor: pointer;
        padding: 0;
        transition: transform 0.12s ease;
      }
      .chip:hover {
        transform: scale(1.06);
      }
      .chip-name {
        font-size: 0.62rem;
        opacity: 0.75;
        max-width: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      .chip-actions {
        display: flex;
        gap: 2px;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .chip-wrap:hover .chip-actions,
      .chip-wrap:focus-within .chip-actions,
      .chip-wrap:active .chip-actions,
      .chip-wrap.active .chip-actions {
        opacity: 1;
      }
      @media (hover: none) {
        .chip-actions {
          opacity: 1;
        }
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        opacity: 0.7;
        line-height: 0;
      }
      .icon:hover {
        opacity: 1;
        color: var(--primary-color);
      }
      .icon.danger:hover {
        color: var(--error-color, #e74c3c);
      }
      .icon ha-icon {
        --mdc-icon-size: 14px;
      }
    `]}};t([ht()],ar.prototype,"controllerId",void 0),t([ht({type:Array})],ar.prototype,"rgb",void 0),t([ht({type:Number})],ar.prototype,"white",void 0),t([dt()],ar.prototype,"_swatches",void 0),t([dt()],ar.prototype,"_saving",void 0),t([dt()],ar.prototype,"_saveName",void 0),t([dt()],ar.prototype,"_editingId",void 0),t([dt()],ar.prototype,"_editName",void 0),ar=t([Me("wled-color-swatch-bar")],ar);let lr=class extends bt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&t.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const t=this._host;return!!t&&Boolean(t.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(t){const e=t.getBoundingClientRect();let i=e.width,s=e.height;if((i<8||s<8)&&(i=t.offsetWidth,s=t.offsetHeight),i<8||s<8){const e=getComputedStyle(t);i=parseFloat(e.width)||0,s=parseFloat(e.height)||0}if(i<8||s<8){const t=this.getBoundingClientRect();i=t.width||this.offsetWidth,s=t.height||this.offsetHeight}if(i>=8&&s<8&&(s=i),i<8&&s>=8&&(i=s),i<8&&s<8){const t=this.offsetWidth||280;i=Math.min(280,t),s=i}return{width:i,height:s}}_wheelSize(t,e){return function(t){const e=Math.floor(.7*t);return Math.max(180,Math.min(280,e||180))}(Math.min(t,e))}_tryMountOrResize(){const t=this._host;if(!t)return;const{width:e,height:i}=this._hostBox(t);if(e<8||i<8)return;const s=this._wheelSize(e,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(t,s)}_borderColor(){return getComputedStyle(this).getPropertyValue("--wled-border").trim()||"rgba(255, 255, 255, 0.12)"}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=Qs.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:this._borderColor(),layout:[{component:Qs.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return j`
      <div class="picker">
        <div class="wrap">
          <div class="wheel-host" aria-label="Color wheel"></div>
          <div class="extras">
            ${this.showWhite?j`
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
        ${this.controllerId?j`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `:null}
      </div>
    `}static{this.styles=[..._t,o`
      :host {
        display: block;
        width: 100%;
      }
      .picker {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      .wheel-host {
        width: 100%;
        max-width: 280px;
        min-width: 180px;
        aspect-ratio: 1;
        flex-shrink: 0;
        position: relative;
      }
      .wheel-host .IroColorPicker {
        display: block;
      }
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
        border-radius: var(--wled-radius-sm);
        padding: 4px 8px;
        background: var(--wled-surface);
        color: var(--wled-text);
        border: 1px solid var(--wled-border);
      }
      .w-hint {
        margin: 0;
        font-size: 0.7rem;
        opacity: 0.72;
        line-height: 1.35;
        max-width: 18rem;
      }
    `]}};t([ht({type:Array,hasChanged:(t,e)=>!t||!e||!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],lr.prototype,"rgb",void 0),t([ht({type:Number})],lr.prototype,"white",void 0),t([ht({type:Number})],lr.prototype,"awm",void 0),t([ht({type:Boolean})],lr.prototype,"showWhite",void 0),t([ht()],lr.prototype,"controllerId",void 0),t([pt(".wheel-host")],lr.prototype,"_host",void 0),lr=t([Me("wled-color-wheel-rgbw")],lr);function cr(t,e="strip",i,s=0){let r=String(t);return s&&(r=`${r}_p${s}`),i?.trim()&&(r=`${r}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${r}_${e}.webp`}function hr(t,e,i="strip",s,r=0){const n=e instanceof Set?e:new Set(e);if(!n.size)return;const o=[cr(t,i,s,r),cr(t,i,s),cr(t,i,void 0,r),cr(t,i)];for(const t of o)if(n.has(t))return t;const a=r?`${t}_p${r}_`:`${t}_`,l=`_${i}.webp`;for(const t of n)if(t.startsWith(a)&&t.endsWith(l))return t;return r?hr(t,n,i,s,0):void 0}function dr(t,e,i="strip",s,r,n,o=0){if(!t||e<0)return;const a=void 0!==n?hr(e,n,i,s,o):cr(e,i,s,o);return a?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,a),r):void 0}const pr="wled_studio.recent_effects",ur="wled_studio.recent_scenes";function gr(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function fr(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function mr(t){return t?gr(pr)[t]??[]:[]}function _r(t,e=72,i=6,s=10){if(t<=0)return 1;const r=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/r)))}const br="wled_studio.pinned_effects";function yr(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function vr(t,e,i){if(!t)return[];const s=yr(br),r=s[t]??[],n=r.findIndex(t=>t.id===e);return n>=0?r.splice(n,1):r.unshift({id:e,name:i}),s[t]=r,function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(br,s),s[t]}let wr=class extends bt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this.listboxOption=!1,this.selected=!1,this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e,s=this.label||`Effect ${this.fxId}`;return j`
      <button
        class="tile"
        type="button"
        aria-label=${s}
        role=${this.listboxOption?"option":void 0}
        aria-selected=${this.listboxOption?this.selected?"true":"false":void 0}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${i?j`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:j`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[..._t,o`
      .tile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        min-width: 72px;
        max-width: 96px;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .thumb,
      .placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 4px;
        background: var(--wled-surface-elevated);
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
    `]}};t([ht({type:Number})],wr.prototype,"fxId",void 0),t([ht()],wr.prototype,"thumbUrl",void 0),t([ht()],wr.prototype,"thumbUrlAnimated",void 0),t([ht()],wr.prototype,"label",void 0),t([ht({type:Boolean,attribute:"listbox-option"})],wr.prototype,"listboxOption",void 0),t([ht({type:Boolean})],wr.prototype,"selected",void 0),t([dt()],wr.prototype,"_hover",void 0),wr=t([Me("wled-effect-tile")],wr);let xr=class extends bt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this.tileGrid=!1,this.scrollPane=!1,this.selectedPalette=0,this.paletteAware=!1,this._category="all",this._recentEntries=[],this._pinnedEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){var t;this._recentEntries=mr(this.controllerId),this._pinnedEntries=(t=this.controllerId)?yr(br)[t]??[]:[],this.soundFlags.length&&!this.soundFlags.some(t=>"v"===t||"f"===t)&&console.debug(`[wled-studio] sound_flags for ${this.controllerId} contain no v/f entries — Music filter will rely on name heuristics`)}_togglePin(t,e){e.stopPropagation(),this.controllerId&&(this._pinnedEntries=vr(this.controllerId,t,this._effectName(t)))}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=_r(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=li(this.effectsByName),s=e.filter(e=>!!hi(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),r=this.showRecents&&!t&&this._recentEntries.length>0,n=this._recentEntries.slice(0,this._recentVisible),o=!t&&this._pinnedEntries.length>0;return j`
      <div
        class="wrap ${this.tileGrid?"tile-grid":""} ${this.scrollPane?"scroll-pane":""}"
      >
        ${o?j`
              <div class="recent-block">
                <span class="recent-label">Library</span>
                <div class="recent-row" role="group" aria-label="Pinned effects">
                  ${this._pinnedEntries.map(t=>{const e=t.id,s=t.name,r=e===this.selectedFx;return j`
                      <button
                        type="button"
                        class="recent-chip library ${r?"active":""}"
                        aria-label=${`Apply pinned effect ${s}`}
                        aria-pressed=${r?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${r?j`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${n.map(t=>{const e=t.id,s=t.name,r=this.soundFlags[e],n=e===this.selectedFx;return j`
                      <button
                        type="button"
                        class="recent-chip ${n?"active":""}"
                        aria-label=${`Apply effect ${s}`}
                        aria-pressed=${n?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===r?j`<span class="badge">♪</span>`:null}
                        ${"f"===r?j`<span class="badge">♫</span>`:null}
                        ${"2"===r?j`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>j`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t?"true":"false"}
                @click=${()=>{this._category=t}}
              >
                ${ai[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?j`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],r=e===this.selectedFx,n=dr(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames,this.paletteAware?this.selectedPalette:0),o=t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"");return n?j`
                    <wled-effect-tile
                      class="chip-tile ${r?"active":""}"
                      listbox-option
                      .selected=${r}
                      .fxId=${e}
                      .thumbUrl=${n}
                      .label=${o}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:j`
                  <button
                    type="button"
                    class="chip ${r?"active":""}"
                    role="option"
                    aria-selected=${r?"true":"false"}
                    aria-label=${o}
                    @click=${()=>this._pick(e,i)}
                  >
                    ${t}
                    ${"v"===s?j`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?j`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?j`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <div class="footer-row">
          <p class="count">${s.length} effects</p>
          ${this.controllerId&&this.selectedFx>=0?j`
                <button
                  type="button"
                  class="pin-btn"
                  title="Pin to library"
                  aria-label="Pin current effect to library"
                  @click=${t=>this._togglePin(this.selectedFx,t)}
                >
                  <ha-icon
                    .icon=${this._pinnedEntries.some(t=>t.id===this.selectedFx)?"mdi:star":"mdi:star-outline"}
                  ></ha-icon>
                </button>
              `:null}
        </div>
      </div>
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return mr(t);const r=gr(pr),n=(r[t]??[]).filter(t=>t.id!==e);return n.unshift({id:e,name:i}),r[t]=n.slice(0,10),fr(pr,r),r[t]}(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[..._t,o`
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
        color: var(--wled-text-muted);
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
      .recent-chip.library {
        border-color: color-mix(in srgb, var(--primary-color) 40%, var(--divider-color));
      }
      .footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .pin-btn {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 0;
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
      .tile-grid .grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        max-height: none;
        min-height: 0;
      }
      .scroll-pane {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .scroll-pane .grid {
        flex: 1 1 auto;
        min-height: 100px;
        max-height: min(240px, 36vh);
        overflow-y: auto;
      }
      .tile-grid.scroll-pane .grid {
        flex: 1 1 auto;
        min-height: 80px;
        max-height: none;
        overflow-y: auto;
      }
      .tile-grid .chip-tile {
        min-height: 0;
        max-width: none;
      }
      .tile-grid .chip-tile .tile {
        max-width: none;
        min-width: 0;
      }
      .tile-grid .chip-tile.active .tile {
        outline: 2px solid var(--wled-accent);
        outline-offset: 2px;
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
        color: var(--wled-text-muted);
        font-size: 0.85rem;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
    `]}};t([ht({type:Object})],xr.prototype,"effectsByName",void 0),t([ht({type:Array})],xr.prototype,"soundFlags",void 0),t([ht({type:Number})],xr.prototype,"selectedFx",void 0),t([ht({type:String})],xr.prototype,"filter",void 0),t([ht()],xr.prototype,"controllerId",void 0),t([ht()],xr.prototype,"fwVer",void 0),t([ht({type:Array})],xr.prototype,"thumbBasenames",void 0),t([ht({type:Boolean})],xr.prototype,"toggleOff",void 0),t([ht({type:Boolean})],xr.prototype,"showRecents",void 0),t([ht({type:Boolean,attribute:"tile-grid"})],xr.prototype,"tileGrid",void 0),t([ht({type:Boolean,attribute:"scroll-pane"})],xr.prototype,"scrollPane",void 0),t([ht({type:Number})],xr.prototype,"selectedPalette",void 0),t([ht({type:Boolean,attribute:"palette-aware"})],xr.prototype,"paletteAware",void 0),t([dt()],xr.prototype,"_category",void 0),t([dt()],xr.prototype,"_recentEntries",void 0),t([dt()],xr.prototype,"_pinnedEntries",void 0),t([dt()],xr.prototype,"_recentVisible",void 0),xr=t([Me("wled-effect-chips")],xr);let $r=class extends bt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this.compact=!1,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=mi(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=mi(this.controllerId))}render(){const t=vi(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return j`
      <label class="merge-row ${this._merged?"on":""}">
        <input
          type="checkbox"
          .checked=${this._merged}
          ?disabled=${this._busy||!this.connection}
          @change=${this._onToggle}
        />
        <span class="merge-label">
          <strong>Merge for effects</strong>
          ${this.compact?null:j`
                <span class="sub">
                  Combine highlighted segments into one span so chase-style effects
                  run across LED indices. Uncheck to restore the layout saved when
                  you merged.
                </span>
              `}
          ${e&&!this.compact?j`<span class="saved">${e}</span>`:null}
        </span>
      </label>
      ${this._error?j`<p class="err">${this._error}</p>`:null}
      ${this._busy?j`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await kt(this.connection,this.controllerId),e=t.segments??this.segments,i=t.info?.leds,s=Number(i?.count)||this.pixelCount;wi(this.controllerId,e,s);const r=$i(e,s,this.editIds.length?this.editIds:void 0);await Ct(this.connection,this.controllerId,r,{fullResponse:!0}),yi(this.controllerId,!0),this._merged=!0}else{const t=vi(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await Ct(this.connection,this.controllerId,xi(t),{fullResponse:!0}),yi(this.controllerId,!1),function(t){const e=gi(di);delete e[t],fi(di,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[..._t,o`
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
      :host([compact]) .merge-row {
        padding: 6px 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      :host([compact]) .merge-row .merge-label {
        font-size: 0.8rem;
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
    `]}};t([ht({attribute:!1})],$r.prototype,"connection",void 0),t([ht()],$r.prototype,"controllerId",void 0),t([ht({type:Array})],$r.prototype,"segments",void 0),t([ht({type:Array})],$r.prototype,"editIds",void 0),t([ht({type:Number})],$r.prototype,"pixelCount",void 0),t([ht({type:Boolean,reflect:!0})],$r.prototype,"compact",void 0),t([dt()],$r.prototype,"_merged",void 0),t([dt()],$r.prototype,"_busy",void 0),t([dt()],$r.prototype,"_error",void 0),$r=t([Me("wled-effect-merge-toggle")],$r);const Sr={default:"linear-gradient(90deg, #000 0%, #444 50%, #fff 100%)","random cycle":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",lava:"linear-gradient(90deg, #000 0%, #800 25%, #f40 55%, #fc0 100%)",ocean:"linear-gradient(90deg, #001028 0%, #004080 40%, #0088cc 70%, #aaf 100%)",forest:"linear-gradient(90deg, #020 0%, #060 30%, #080 55%, #0a0 80%, #5f5 100%)",rainbow:"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)","rainbow bands":"repeating-linear-gradient(90deg, #f00 0 8%, #ff0 8% 16%, #0f0 16% 24%, #0ff 24% 32%, #00f 32% 40%, #f0f 40% 48%)",sunset:"linear-gradient(90deg, #102 0%, #804 35%, #f60 65%, #fc0 100%)",rivendell:"linear-gradient(90deg, #234 0%, #356 45%, #8ab 100%)",breeze:"linear-gradient(90deg, #246 0%, #48a 50%, #bdf 100%)","red & blue":"linear-gradient(90deg, #900 0%, #900 45%, #009 55%, #009 100%)",yellowout:"linear-gradient(90deg, #000 0%, #880 40%, #ff0 100%)",analogous:"linear-gradient(90deg, #f80, #ff0, #8f0, #0f8)",splash:"linear-gradient(90deg, #08f, #0fa, #8f0, #fa0, #f08)",pastel:"linear-gradient(90deg, #f9a, #fd9, #9f9, #9cf, #c9f)","sunset 2":"linear-gradient(90deg, #201 0%, #906 40%, #f84 75%, #fe8 100%)",beech:"linear-gradient(90deg, #210 0%, #630 35%, #a80 70%, #da8 100%)",mint:"linear-gradient(90deg, #042 0%, #086 50%, #6fc 100%)","april night":"linear-gradient(90deg, #012 0%, #248 45%, #48c 75%, #acf 100%)",orangery:"linear-gradient(90deg, #310 0%, #f70 55%, #fc8 100%)",c9:"linear-gradient(90deg, #f00 0%, #f00 20%, #0f0 20%, #0f0 40%, #08f 40%, #08f 60%, #ff0 60%, #ff0 80%, #f0f 80%, #f0f 100%)",sakura:"linear-gradient(90deg, #304 0%, #c68 50%, #fbd 100%)",aurora:"linear-gradient(90deg, #020 0%, #0a6 35%, #28f 65%, #8af 100%)",atlantica:"linear-gradient(90deg, #024 0%, #068 40%, #0ac 70%, #4ef 100%)","c9 2":"linear-gradient(90deg, #f44, #4f4, #44f, #ff4, #f4f)","c9 new":"linear-gradient(90deg, #e33, #3e3, #33e, #ee3, #e3e)",magenta:"linear-gradient(90deg, #400 0%, #808 50%, #f0f 100%)",magred:"linear-gradient(90deg, #808 0%, #c04 50%, #f00 100%)",yelmag:"linear-gradient(90deg, #ff0 0%, #f80 50%, #f0f 100%)",yelblu:"linear-gradient(90deg, #ff0 0%, #0af 100%)","orange & teal":"linear-gradient(90deg, #f70 0%, #f70 48%, #088 52%, #088 100%)",tiamat:"linear-gradient(90deg, #208 0%, #408 30%, #80c 60%, #c4f 100%)","fire & ice":"linear-gradient(90deg, #f40 0%, #fc0 35%, #08f 65%, #acf 100%)",cyberpunk:"linear-gradient(90deg, #f0f 0%, #0ff 50%, #ff0 100%)","cyberpunk 2":"linear-gradient(90deg, #80f 0%, #0fa 45%, #f08 100%)","color gradient":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)","color bands":"repeating-linear-gradient(90deg, #f00 0 12%, #ff0 12% 24%, #0f0 24% 36%, #0ff 36% 48%, #00f 48% 60%, #f0f 60% 72%)",party:"linear-gradient(90deg, #f00, #0f0, #00f, #ff0, #f0f, #0ff)",cloud:"linear-gradient(90deg, #456 0%, #789 50%, #cde 100%)",lava2:"linear-gradient(90deg, #100 0%, #a00 40%, #f60 75%, #ff0 100%)",ocean2:"linear-gradient(90deg, #012 0%, #036 40%, #09c 75%, #6df 100%)",pinkpurple:"linear-gradient(90deg, #608 0%, #a0a 50%, #f8f 100%)",esrever:"linear-gradient(90deg, #fff 0%, #888 50%, #000 100%)","empty slot":"linear-gradient(90deg, #333 0%, #555 50%, #333 100%)"};function Ir(t,e,i){const s=i?.[String(e)];return s||function(t){const e=t.toLowerCase().trim(),i=Sr[e];if(i)return i;const s=function(t){let e=0;for(let i=0;i<t.length;i++)e=31*e+t.charCodeAt(i)>>>0;return e%360}(e);return`linear-gradient(90deg, hsl(${s} 75% 35%), hsl(${(s+72)%360} 80% 48%), hsl(${(s+144)%360} 75% 58%))`}(t)}let kr=class extends bt{constructor(){super(...arguments),this.palettesByName={},this.palettePreviews={},this.selectedPal=0,this.filter="",this.deviceHost="",this.compact=!1,this.collapsible=!1,this._open=!0,this._localFilter="",this._editorOpen=!1}willUpdate(t){t.has("filter")&&this.filter!==this._localFilter&&(this._localFilter=this.filter)}_paletteName(t){return Object.entries(this.palettesByName).find(([,e])=>e===t)?.[0]??`Palette ${t}`}_gradient(t,e){return Ir(t,e,this.palettePreviews)}_editorUrl(){const t=this.deviceHost.trim();if(!t)return null;return`${t.startsWith("http")?t.replace(/\/$/,""):`http://${t}`}/cpal.htm`}_renderEditorActions(t){return t?j`
      <div class="editor-actions">
        <button type="button" class="editor-btn" @click=${()=>this._openEditor()}>
          <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
          Edit palettes
        </button>
        <a class="editor-link" href=${t} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>
    `:null}_openEditor(){this._editorOpen=!0}_closeEditor(){this._editorOpen=!1,this.dispatchEvent(new CustomEvent("palette-catalog-changed",{bubbles:!0,composed:!0}))}render(){const t=(this._localFilter||this.filter).trim().toLowerCase(),e=Object.keys(this.palettesByName).sort((t,e)=>t.localeCompare(e)),i=e.filter(e=>!t||e.toLowerCase().includes(t)),s=this._paletteName(this.selectedPal),r=this._editorUrl(),n=j`
      <input
        class="search"
        type="search"
        placeholder="Search palettes…"
        aria-label="Filter palettes"
        .value=${this._localFilter}
        @input=${t=>{this._localFilter=t.target.value}}
      />
      <div class="list" role="listbox" aria-label="Palettes">
        ${0===i.length?j`<p class="empty">No palettes match.</p>`:i.map(t=>{const e=this.palettesByName[t],i=e===this.selectedPal;return j`
                <button
                  type="button"
                  class="row ${i?"active":""}"
                  role="option"
                  aria-selected=${i?"true":"false"}
                  aria-label=${t}
                  @click=${()=>this._pick(e)}
                >
                  <span
                    class="swatch"
                    style=${`background:${this._gradient(t,e)}`}
                  ></span>
                  <span class="name">${t}</span>
                  ${i?j`<span class="dot" aria-hidden="true"></span>`:null}
                </button>
              `})}
      </div>
      ${this._renderEditorActions(r)}
      <p class="count">${i.length} palette${1===i.length?"":"s"}</p>
    `,o=this._editorOpen&&r?j`
            <div
              class="editor-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="WLED palette editor"
            >
              <div class="editor-panel">
                <header class="editor-header">
                  <span>Palette editor</span>
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label="Close palette editor"
                    @click=${()=>this._closeEditor()}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </header>
                <p class="editor-hint">
                  Uses the WLED device UI. Custom palettes save on the controller; close
                  when done to refresh previews.
                </p>
                <iframe
                  class="editor-frame"
                  title="WLED palette editor"
                  src=${r}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                ></iframe>
              </div>
            </div>
          `:null;return this.collapsible?j`
        <details
          class="wrap collapsible ${this.compact?"compact":""}"
          ?open=${this._open}
          @toggle=${t=>{this._open=t.target.open}}
        >
          <summary class="summary">
            <span class="summary-label">Palette</span>
            <span
              class="summary-preview"
              style=${`background:${this._gradient(s,this.selectedPal)}`}
            ></span>
            <span class="summary-name">${s}</span>
          </summary>
          ${n}
        </details>
        ${o}
      `:j`
      <div class="wrap ${this.compact?"compact":""}">
        <div class="head">
          <span class="head-label">Palette</span>
          ${r?j`
                <button
                  type="button"
                  class="editor-link inline"
                  title="Edit palettes on WLED device"
                  @click=${()=>this._openEditor()}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  Edit
                </button>
              `:null}
        </div>
        ${n}
      </div>
      ${o}
    `}_pick(t){this.dispatchEvent(new CustomEvent("palette-select",{detail:{paletteId:t},bubbles:!0,composed:!0}))}static{this.styles=[..._t,o`
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .head-label,
      .summary-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wled-text-muted);
      }
      .summary {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 10px;
        background: color-mix(in srgb, var(--card-background-color) 80%, transparent);
      }
      .summary::marker,
      .summary::-webkit-details-marker {
        color: var(--wled-text-muted);
      }
      .summary {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        list-style: disclosure-closed;
      }
      details[open] > .summary {
        list-style: disclosure-open;
        margin-bottom: 8px;
      }
      .summary-preview {
        flex: 0 0 48px;
        height: 14px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 80%, transparent);
      }
      .summary-name {
        flex: 1 1 auto;
        font-size: 0.82rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .search {
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: min(200px, 28vh);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .wrap.compact .list {
        max-height: min(160px, 24vh);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        font-size: 0.82rem;
      }
      .row:hover {
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      }
      .row.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      }
      .swatch {
        flex: 0 0 56px;
        height: 16px;
        border-radius: 4px;
        border: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
      }
      .name {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dot {
        flex: 0 0 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
      }
      .empty {
        margin: 0;
        font-size: 0.82rem;
        color: var(--wled-text-muted);
      }
      .editor-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .editor-btn,
      .editor-link.inline {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.78rem;
        border-radius: 6px;
        cursor: pointer;
      }
      .editor-btn {
        padding: 4px 8px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
      }
      .editor-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.78rem;
      }
      .editor-link.inline {
        padding: 2px 6px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
      }
      .editor-link ha-icon,
      .editor-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .count {
        margin: 0;
        font-size: 0.72rem;
        color: var(--wled-text-muted);
      }
      .editor-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
      }
      .editor-panel {
        width: min(960px, 100%);
        max-height: min(92vh, 820px);
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--card-background-color);
        border-radius: var(--wled-radius, 12px);
        border: 1px solid var(--divider-color);
        box-shadow: var(--wled-shadow);
        overflow: hidden;
      }
      .editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid var(--divider-color);
        font-weight: 600;
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        line-height: 0;
      }
      .editor-hint {
        margin: 0;
        padding: 0 12px;
        font-size: 0.78rem;
        color: var(--wled-text-muted);
      }
      .editor-frame {
        flex: 1 1 auto;
        min-height: 360px;
        width: 100%;
        border: none;
        background: #111;
      }
    `]}};t([ht({type:Object})],kr.prototype,"palettesByName",void 0),t([ht({type:Object})],kr.prototype,"palettePreviews",void 0),t([ht({type:Number})],kr.prototype,"selectedPal",void 0),t([ht()],kr.prototype,"filter",void 0),t([ht()],kr.prototype,"deviceHost",void 0),t([ht({type:Boolean})],kr.prototype,"compact",void 0),t([ht({type:Boolean,attribute:"collapsible"})],kr.prototype,"collapsible",void 0),t([dt()],kr.prototype,"_open",void 0),t([dt()],kr.prototype,"_localFilter",void 0),t([dt()],kr.prototype,"_editorOpen",void 0),kr=t([Me("wled-palette-chips")],kr);let Cr=class extends bt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return j`
      <div class="bar" aria-label="WLED presets">
        ${t.length?j`
              <div class="ql-row">
                ${t.map(t=>j`
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
          ${e.map(t=>j`
              <li>
                <button class="named" @click=${()=>this._pick(t.id)}>
                  <span class="id">${t.id}</span>
                  <span class="name">${t.name}</span>
                  ${t.ql?j`<span class="ql-badge">${t.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[..._t,o`
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
    `]}};t([ht({type:Array})],Cr.prototype,"presets",void 0),Cr=t([Me("wled-preset-bar")],Cr);const Pr=["For each","Bar","Arc","Corner"],Er=["Replace","Add","Subtract","Multiply","Lighten","Darken"],Mr=["Off","GEQ pulse","WaveSin","Sweep"];let Ar=class extends bt{constructor(){super(...arguments),this.compact=!1}_emit(t){this.dispatchEvent(new CustomEvent("segment-patch",{detail:t,bubbles:!0,composed:!0}))}_num(t,e,i,s){const r=this.segment;if(!r)return null;const n=r[t]??i;return j`
      <label class="cell">
        <span class="cell-label">${e}<span class="cell-val">${n}</span></span>
        <ha-slider
          min=${i}
          max=${s}
          step="1"
          .value=${n}
          @change=${e=>{const i=Number(e.target.value);this._emit({[t]:i})}}
        ></ha-slider>
      </label>
    `}_bool(t,e){const i=this.segment;if(!i)return null;const s=Boolean(i[t]);return j`
      <label class="check">
        <input
          type="checkbox"
          .checked=${s}
          @change=${e=>this._emit({[t]:e.target.checked})}
        />
        <span>${e}</span>
      </label>
    `}_select(t,e,i){const s=this.segment;if(!s)return null;const r=s[t]??0;return j`
      <label class="cell">
        <span class="cell-label">${e}</span>
        <select
          .value=${String(r)}
          @change=${e=>{const i=Number(e.target.value);this._emit({[t]:i})}}
        >
          ${i.map((t,e)=>j`<option value=${e} ?selected=${e===r}>${t}</option>`)}
        </select>
      </label>
    `}render(){if(!this.segment)return null;const t=this.meta,e=[];for(const i of["o1","o2","o3"])if(t?.sliders?.[i]){const s="string"==typeof t.defaults?.[i]&&t.defaults[i].trim()?t.defaults[i]:i.toUpperCase();e.push({key:i,label:s})}return j`
      <details class="adv" ?open=${!this.compact}>
        <summary>Advanced segment options</summary>
        <div class="grid">
          ${this._num("grp","Grouping",1,255)}
          ${this._num("spc","Spacing",0,255)}
          ${this._num("of","Offset",0,255)}
        </div>
        <div class="flags">
          ${this._bool("rev","Reverse")}
          ${this._bool("mi","Mirror")}
          ${this._bool("frz","Freeze effect")}
          ${this._bool("sel","Selected")}
        </div>
        ${e.length?j`
              <div class="flags">
                ${e.map(t=>this._bool(t.key,t.label))}
              </div>
            `:null}
        <div class="grid">
          ${this._select("si","Sound simulation",Mr)}
          ${this._select("m12","1D-in-2D mode",Pr)}
          ${this._select("bm","Blend mode",Er)}
        </div>
      </details>
    `}static{this.styles=[..._t,o`
      .adv {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 12px;
        background: color-mix(in srgb, var(--secondary-background-color) 40%, transparent);
      }
      summary {
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 600;
        padding: 4px 0;
        outline: none;
      }
      summary:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 8px 14px;
        margin-top: 8px;
      }
      .flags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin-top: 10px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.78rem;
      }
      .cell-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .cell-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.8rem;
      }
    `]}};t([ht({attribute:!1})],Ar.prototype,"segment",void 0),t([ht({attribute:!1})],Ar.prototype,"meta",void 0),t([ht({type:Boolean})],Ar.prototype,"compact",void 0),Ar=t([Me("wled-segment-advanced")],Ar);let Tr=class extends bt{constructor(){super(...arguments),this.width="100%",this.height="1rem",this.roundedFull=!1}render(){return j`
      <div
        class="block ${this.roundedFull?"pill":""}"
        style="width:${this.width};height:${this.height}"
        aria-hidden="true"
      ></div>
    `}static{this.styles=[..._t,o`
      :host {
        display: block;
      }
      .block {
        border-radius: var(--wled-radius-sm);
        background: linear-gradient(
          90deg,
          var(--wled-surface) 0%,
          var(--wled-surface-elevated) 45%,
          var(--wled-surface) 90%
        );
        background-size: 200% 100%;
        animation: wled-shimmer 1.2s ease-in-out infinite;
      }
      .block.pill {
        border-radius: 999px;
      }
      @keyframes wled-shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .block {
          animation: none;
          background: var(--wled-surface-elevated);
        }
      }
    `]}};t([ht()],Tr.prototype,"width",void 0),t([ht()],Tr.prototype,"height",void 0),t([ht({type:Boolean,attribute:"rounded-full"})],Tr.prototype,"roundedFull",void 0),Tr=t([Me("wled-skeleton")],Tr);const Lr={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Dr=class extends bt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.hideSegmentBrightness=!1,this.selectedSegId=-1,this.masterEntity="",this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._mergeActive=!1,this._saveSceneOpen=!1,this._saveSceneName="",this._lastMasterBri255=null,this._lastHaColorKey="",this._dragSegId=null}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this.masterEntity&&this._syncFromMasterEntity(),this._syncColorFromHaEntity()),t.has("masterEntity")&&this.masterEntity&&this.hass&&this._syncFromMasterEntity(),(t.has("_segId")||t.has("_colorSlot"))&&this.hass&&this._syncColorFromHaEntity()}applyGlobalBrightness(t){const e=Math.max(0,Math.min(255,Math.round(t)));this._lastMasterBri255=e,this._segments.length&&(this._segments=this._segments.map(t=>({...t,bri:e})),this.requestUpdate())}_syncFromMasterEntity(){if(!this.hass||!this.masterEntity)return;const t=function(t){return Rt(Ot(t))}(this.hass.states[this.masterEntity]);this._lastMasterBri255!==t&&this.applyGlobalBrightness(t)}_syncColorFromHaEntity(){if(!this.hass)return;const t=this._colorEntityId();if(!t)return;const e=function(t){if(!t)return null;const e=t.attributes?.rgbw_color;if(Array.isArray(e)&&e.length>=3)return[Number(e[0])||0,Number(e[1])||0,Number(e[2])||0,Number(e[3])||0];const i=t.attributes?.rgb_color;return Array.isArray(i)&&i.length>=3?[Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,0]:null}(this.hass.states[t]);if(!e)return;const i=`${t}:${e[0]},${e[1]},${e[2]},${e[3]}`;if(i===this._lastHaColorKey)return;const s=this._activeSeg();if(!s)return;const r=this._cols(s),n=r[this._colorSlot]??r[0];if(n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]&&n[3]===e[3])return void(this._lastHaColorKey=i);this._lastHaColorKey=i,r[this._colorSlot]=e;const o=this._segments.findIndex(t=>t.id===s.id);if(o<0)return;const a=[...this._segments];a[o]={...a[o],col:r.map(t=>[t[0],t[1],t[2],t[3]])},this._segments=a,this.requestUpdate()}_colorEntityId(){if(this.wholeMode&&this.masterEntity)return this.masterEntity;const t=this._activeSeg();return t?Lt(t.id,this._snapshot?.segment_entities??[])??"":""}onPoweredConnect(){this._mergeActive=mi(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=ki(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._segId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:this._segId,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Et(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await kt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=mi(this.controllerId);const e=this._pixelCount();_i(this.controllerId)&&bi(this._segments,e)&&(this._editIds=Si(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(t=>t.id),this._segId=this._segments[0].id),this._emitTargetsChanged()}catch(t){this._error=oi(t)}finally{this._loading=!1,null!==this._lastMasterBri255&&this.applyGlobalBrightness(this._lastMasterBri255)}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?qe(this,e):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Pt(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=Lt(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=Mt(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(t=>t.id);if(this._mergeActive){const t=Si(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=mi(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const i=[...this._segments];for(const s of e){const e=i.findIndex(t=>t.id===s);if(e<0)continue;const r=i[e];i[e]={...r,...t,id:s,sel:!0,on:void 0!==t.on?t.on:!1!==r.on},this._syncHaSegment(r,t)}this._segments=i;const s=this._activeSeg();this._optimistic.push(Dt(e,t,this._segments),s??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await Ct(this.connection,this.controllerId,function(t,e){const i=new Set(t);return{seg:e.map(t=>({id:t.id,sel:i.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=Je(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}_reorderSegmentsVisual(t,e){const i=this._segments.findIndex(e=>e.id===t),s=this._segments.findIndex(t=>t.id===e);if(i<0||s<0||i===s)return;const r=[...this._segments],[n]=r.splice(i,1);r.splice(s,0,n),this._segments=r}_onSegDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onSegDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move")}_onSegDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this._reorderSegmentsVisual(i,t)}_onSegDragEnd(){this._dragSegId=null}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(Mt(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail;this._lastHaColorKey=`${this._colorEntityId()}:${i[0]},${i[1]},${i[2]},${s}`;const r=this._cols(e);r[this._colorSlot]=[i[0],i[1],i[2],s];const n=li(this._snapshot?.effects_by_name??{});this._patchSeg({col:r.map(t=>[t[0],t[1],t[2],t[3]]),fx:n}),this._refreshMeta()}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,i,s=0){return await $t(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:i,bus_index:s})).rgbwm??i}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){qe(this,t instanceof Error?t.message:String(t))}}_slider(t,e){const i=ei(Number(e.target.value));null!==i&&this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await Ct(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}_renderSkeleton(){return j`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading segments">
        <wled-skeleton height="2rem" width="100%"></wled-skeleton>
        <wled-skeleton height="220px" width="min(100%, 280px)"></wled-skeleton>
        <wled-skeleton height="1rem" width="70%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>j`<wled-skeleton height="56px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){if(this._loading)return this._renderSkeleton();if(this._error)return j`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return j`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,r=s?.sliders??{},n=!1!==s?.colors_enabled?3:1,o=this._snapshot?.rgbwm??0;return j`
      <div class="controls ${this.compact?"compact":""}">
        ${this.wholeMode?j`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?j`
              <wled-effect-merge-toggle
                ?compact=${this.compact}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this.wholeMode?null:this._mergeActive?j`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:j`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode||this._mergeActive?null:j`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(t=>j`
              <button
                class="seg-tab ${this._editIds.includes(t.id)?"editing":""} ${t.id===this._segId?"focus":""} ${this._dragSegId===t.id?"dragging":""}"
                aria-pressed=${this._editIds.includes(t.id)}
                @click=${()=>this._toggleSegEdit(t.id)}
                @dragover=${e=>this._onSegDragOver(t.id,e)}
                @drop=${e=>this._onSegDrop(t.id,e)}
              >
                ${this.compact?null:j`
                      <span
                        class="seg-drag-handle"
                        draggable="true"
                        aria-hidden="true"
                        title="Drag to reorder (preview only)"
                        @dragstart=${e=>this._onSegDragStart(t.id,e)}
                        @dragend=${()=>this._onSegDragEnd()}
                        @click=${t=>t.stopPropagation()}
                        @mousedown=${t=>t.stopPropagation()}
                      >
                        <ha-icon icon="mdi:drag-vertical"></ha-icon>
                      </span>
                    `}
                <span class="seg-label">${Ze(t,this._snapshot?.segment_entities??[])}</span>
              </button>
            `)}
        </div>
            `}

        ${!this.compact&&this._presets.length?j`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${n>1?j`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,n).map((t,e)=>j`
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

        ${this.hideSegmentBrightness?null:j`
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
            `}

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[i[0],i[1],i[2]]}
          .white=${i[3]}
          .awm=${o}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${!1!==s?.palette_enabled&&Object.keys(this._snapshot?.palettes_by_name??{}).length?j`
              <wled-palette-chips
                ?compact=${this.compact}
                ?collapsible=${this.compact}
                .palettesByName=${this._snapshot?.palettes_by_name??{}}
                .palettePreviews=${this._snapshot?.palette_previews??{}}
                .selectedPal=${t.pal??0}
                .deviceHost=${this._snapshot?.host??""}
                @palette-select=${t=>{this._patchSeg({pal:t.detail.paletteId})}}
                @palette-catalog-changed=${()=>{this._refreshPalettePreviews()}}
              ></wled-palette-chips>
            `:null}

        <wled-segment-advanced
          .segment=${t}
          .meta=${s}
          ?compact=${this.compact}
          @segment-patch=${t=>this._patchSeg(t.detail)}
        ></wled-segment-advanced>

        ${this.compact?null:j`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />
            `}

        ${this.wholeMode&&this.compact&&this.hideSegmentBrightness?null:j`
              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
                .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
                .effectsByName=${this._snapshot?.effects_by_name??{}}
                .soundFlags=${this._snapshot?.sound_flags??[]}
                .selectedFx=${t.fx??0}
                .filter=${this.compact?"":this._effectFilter}
                .selectedPalette=${t.pal??0}
                .paletteAware=${!1!==s?.palette_enabled}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>
            `}

        <div class="sliders">
          ${Object.entries(Lr).map(([e,i])=>{if(!r[e])return null;const s=t[e];return j`
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

        ${this.compact&&this.connection&&this.controllerId?j`
              <div class="scene-row">
                ${this._saveSceneOpen?j`
                      <input
                        type="text"
                        class="scene-input"
                        placeholder="Scene name"
                        .value=${this._saveSceneName}
                        @input=${t=>{this._saveSceneName=t.target.value}}
                      />
                      <button
                        type="button"
                        class="scene-primary"
                        @click=${()=>{this._confirmSaveScene()}}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="scene-ghost"
                        @click=${()=>{this._saveSceneOpen=!1}}
                      >
                        Cancel
                      </button>
                    `:j`
                      <button
                        type="button"
                        class="scene-ghost"
                        @click=${()=>{this._saveSceneName="Color scene",this._saveSceneOpen=!0}}
                      >
                        <ha-icon icon="mdi:content-save-outline"></ha-icon>
                        Save as scene
                      </button>
                    `}
              </div>
            `:null}
      </div>
    `}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await Xe(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,qe(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){qe(this,t instanceof Error?t.message:String(t))}}get segments(){return this._segments}static{this.styles=[..._t,o`
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
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .seg-drag-handle:active {
        cursor: grabbing;
      }
      .seg-drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .seg-tab.dragging {
        opacity: 0.65;
      }
      .seg-label {
        white-space: nowrap;
      }
      .seg-hint {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.72;
      }
      .scene-row {
        display: flex;
        gap: 6px;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 6px;
      }
      .scene-input {
        flex: 1 1 140px;
        min-width: 120px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.78rem;
      }
      .scene-primary,
      .scene-ghost {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .scene-primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .seg-tab.editing,
      .seg-tab.focus {
        background: transparent;
        border-color: var(--primary-color);
        outline: 2px solid var(--primary-color);
        outline-offset: 1px;
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
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
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
      .bri-label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `]}};t([ht({attribute:!1})],Dr.prototype,"connection",void 0),t([ht({attribute:!1})],Dr.prototype,"hass",void 0),t([ht()],Dr.prototype,"controllerId",void 0),t([ht({type:Boolean})],Dr.prototype,"compact",void 0),t([ht({type:Boolean})],Dr.prototype,"wholeMode",void 0),t([ht({type:Boolean,attribute:"hide-segment-brightness"})],Dr.prototype,"hideSegmentBrightness",void 0),t([ht({type:Number})],Dr.prototype,"selectedSegId",void 0),t([ht()],Dr.prototype,"masterEntity",void 0),t([dt()],Dr.prototype,"_loading",void 0),t([dt()],Dr.prototype,"_error",void 0),t([dt()],Dr.prototype,"_segId",void 0),t([dt()],Dr.prototype,"_editIds",void 0),t([dt()],Dr.prototype,"_segments",void 0),t([dt()],Dr.prototype,"_snapshot",void 0),t([dt()],Dr.prototype,"_meta",void 0),t([dt()],Dr.prototype,"_effectFilter",void 0),t([dt()],Dr.prototype,"_presets",void 0),t([dt()],Dr.prototype,"_colorSlot",void 0),t([dt()],Dr.prototype,"_mergeActive",void 0),t([dt()],Dr.prototype,"_saveSceneOpen",void 0),t([dt()],Dr.prototype,"_saveSceneName",void 0),Dr=t([Me("wled-segment-controls")],Dr);let Nr=class extends bt{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle",this._dragSegId=null}render(){return this.segments.length?j`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(t=>j`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(t.id)?"on":""} ${this._dragSegId===t.id?"dragging":""}"
                aria-pressed=${this.selectedIds.includes(t.id)}
                @click=${()=>this._toggle(t.id)}
                @dragover=${t=>{t.preventDefault()}}
                @drop=${e=>this._onDrop(t.id,e)}
              >
                <span
                  class="drag-handle"
                  draggable="true"
                  aria-hidden="true"
                  title="Drag to reorder (preview only)"
                  @dragstart=${e=>this._onDragStart(t.id,e)}
                  @dragend=${()=>{this._dragSegId=null}}
                  @click=${t=>t.stopPropagation()}
                  @mousedown=${t=>t.stopPropagation()}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <span class="btn-label">${Ze(t,this.segmentEntities)}</span>
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(t){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:t},bubbles:!0,composed:!0}))}_onDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this.dispatchEvent(new CustomEvent("segment-reorder",{detail:{fromId:i,toId:t},bubbles:!0,composed:!0}))}static{this.styles=[..._t,o`
      .hint {
        margin: 0 0 8px;
        font-size: 0.8rem;
        opacity: 0.75;
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        min-height: var(--wled-tap);
        transition:
          border-color var(--wled-transition-fast),
          background var(--wled-transition-fast),
          outline-color var(--wled-transition-fast);
      }
      .drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .btn.dragging {
        opacity: 0.65;
      }
      .btn-label {
        white-space: nowrap;
      }
      .btn.on {
        border-color: var(--wled-accent);
        background: var(--wled-accent-soft);
        outline: 2px solid var(--wled-accent);
        outline-offset: 1px;
      }
    `]}};t([ht({type:Array})],Nr.prototype,"segments",void 0),t([ht({type:Array})],Nr.prototype,"selectedIds",void 0),t([ht({type:Array})],Nr.prototype,"segmentEntities",void 0),t([ht()],Nr.prototype,"hint",void 0),t([dt()],Nr.prototype,"_dragSegId",void 0),Nr=t([Me("wled-segment-bar")],Nr);const Br={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Or=class extends bt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._segments=[],this._editIds=[],this._focusSegId=0,this._filter="",this._status="Loading effects…",this._mergeActive=!1,this._library=[],this._saveCopyOpen=!1,this._saveCopyName="",this._saveSceneOpen=!1,this._saveSceneName="",this._needsMergeApply=!1}onPoweredConnect(){this._mergeActive=mi(this.controllerId),this._library=ni(this.controllerId),this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Et(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}_onPaletteCatalogChanged(){this._refreshPalettePreviews()}async _load(){if(this.connection&&this.controllerId){this._status="Loading effects…";try{if(this._snapshot=await kt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id),e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:t,t.includes(this._focusSegId)||(this._focusSegId=this._segments[0].id)}const t=this._pixelCount();this._mergeActive=mi(this.controllerId);const e=bi(this._segments,t);this._needsMergeApply=this._mergeActive&&this._segments.length>1&&!e,_i(this.controllerId)&&e&&(this._editIds=Si(this._segments),this._focusSegId=this._editIds[0]??0),await this._refreshMeta(),this._status="",this._emitTargetsChanged()}catch{this._status="Could not load device state."}}}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._focusSegId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0}))}async confirmMergeApply(){await this._applyMergeOnDevice(this._pixelCount()),this._needsMergeApply=!1,await this._load()}async _applyMergeOnDevice(t){if(!this.connection||!this.controllerId||!this._snapshot)return;wi(this.controllerId,this._segments,t);const e=$i(this._segments,t,this._editIds.length?this._editIds:void 0);await Ct(this.connection,this.controllerId,e,{fullResponse:!0}),yi(this.controllerId,!0),this._snapshot=await kt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id)}_activeSeg(){return this._segments.find(t=>t.id===this._focusSegId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Pt(this.connection,this.controllerId,t.fx??0))}selectSegmentFromPreview(t){if(this._mergeActive)return this._focusSegId=0,this._refreshMeta(),void this._emitTargetsChanged();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._focusSegId=t,this._refreshMeta(),this._emitTargetsChanged()}_onSegToggle(t){if(this._mergeActive)return;let e=Je(this._editIds,t.detail.id);e.length||(e=[t.detail.id]),this._editIds=e,this._focusSegId=t.detail.id,this._refreshMeta(),this._emitTargetsChanged()}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this._mergeActive){const t=Si(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._focusSegId]}_onMergeChanged(){this._mergeActive=mi(this.controllerId),this._load(),this._emitTargetsChanged()}_effectName(t){return Object.entries(this._snapshot?.effects_by_name??{}).find(([,e])=>e===t)?.[0]??`Effect ${t}`}_sliderValuesFromSeg(){const t=this._activeSeg();return t?function(t){const e={};for(const i of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[i];"number"==typeof s&&(e[i]=s)}return e}(t):{}}_saveAsDefault(){const t=this._activeSeg();t&&this.controllerId&&(!function(t,e,i){if(!t)return;const s=ii(Qe),r={...s[t]??{}};r[String(e)]={...i},s[t]=r,si(Qe,s)}(this.controllerId,t.fx??0,this._sliderValuesFromSeg()),qe(this,`Saved default options for ${this._effectName(t.fx??0)}`))}_openSaveCopy(){const t=this._activeSeg();t&&(this._saveCopyName=`${this._effectName(t.fx??0)} copy`,this._saveCopyOpen=!0)}_confirmSaveCopy(){const t=this._activeSeg();t&&this.controllerId&&this._saveCopyName.trim()&&(!function(t,e){const i={...e,id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,savedAt:Date.now()},s=ii(ti),r=[i,...s[t]??[]];s[t]=r.slice(0,48),si(ti,s)}(this.controllerId,{name:this._saveCopyName.trim(),effectId:t.fx??0,effectName:this._effectName(t.fx??0),pinned:!0,...this._sliderValuesFromSeg()}),this._library=ni(this.controllerId),this._saveCopyOpen=!1,qe(this,`Saved "${this._saveCopyName.trim()}" to library`))}_openSaveScene(){const t=this._activeSeg();t&&(this._saveSceneName=`${this._effectName(t.fx??0)} scene`,this._saveSceneOpen=!0)}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await Xe(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,qe(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){qe(this,t instanceof Error?t.message:String(t))}}async _applyLibraryEntry(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i={fx:t.effectId,on:!0};for(const e of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[e];"number"==typeof s&&(i[e]=s)}const s=Dt(e,i,this._segments);await Ct(this.connection,this.controllerId,s),await this._load(),qe(this,`Applied ${t.name}`)}_isLoading(){return"Loading effects…"===this._status}_renderSkeleton(){return j`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading effects">
        <wled-skeleton height="2rem" width="min(100%, 360px)"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:6},()=>j`<wled-skeleton height="72px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const t=this._snapshot,e=this._activeSeg(),i=e?.fx??0,s=this._meta,r=s?.sliders??{},n=this._targetIds().length,o=this.compact;return j`
      <div class="wrap ${o?"compact":""}">
        ${o?null:j`
              <h2>Effects</h2>
              <p class="hint">
                Tap segments to choose targets. Tap the active effect again to return to Solid.
              </p>
              <details class="seg-note">
                <summary>Why do chase effects restart on each segment?</summary>
                <p>
                  WLED runs effects <strong>per segment</strong>: each segment’s effect uses LED
                  indices <code>start…stop</code> only inside that segment. The same effect on
                  neighbors does not continue across segment boundaries. For one motion across the
                  whole strip, use a <strong>single segment</strong> spanning all LEDs (Layout →
                  Apply segments) or external tools (LedFX / xLights). WLED+ uses the same model;
                  grouping is planned in firmware, not shipped yet.
                </p>
              </details>
            `}
        ${this._isLoading()?this._renderSkeleton():this._status?j`<p class="status">${this._status}</p>`:null}

        ${this._needsMergeApply?j`
              <div class="merge-prompt">
                <p>
                  Merge for effects is on, but WLED currently has
                  ${this._segments.length} segments. Apply merge so chase-style
                  effects span the whole strip?
                </p>
                <div class="merge-prompt-row">
                  <button
                    type="button"
                    class="primary"
                    @click=${()=>{this.confirmMergeApply()}}
                  >
                    Apply merge
                  </button>
                  <button
                    type="button"
                    class="ghost"
                    @click=${()=>{yi(this.controllerId,!1),this._mergeActive=!1,this._needsMergeApply=!1,this._emitTargetsChanged()}}
                  >
                    Keep ${this._segments.length} segments
                  </button>
                </div>
              </div>
            `:null}

        ${this.connection&&this.controllerId&&t&&e?j`
              <wled-effect-merge-toggle
                ?compact=${o}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this._segments.length&&!this._mergeActive?j`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${t?.segment_entities??[]}
                hint=${o?"Tap segments to target effects":"Apply effects to highlighted segments"}
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `:null}

        ${t&&e?j`
              <div class="effects-workspace ${o?"compact":""}">
                <div class="effects-toolbar">
                  <input
                    class="search"
                    type="search"
                    placeholder="Search effects…"
                    aria-label="Filter effects"
                    .value=${this._filter}
                    @input=${t=>{this._filter=t.target.value}}
                  />
                </div>
                <div class="effects-scroll">
                  <wled-effect-chips
                    scroll-pane
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    .fwVer=${t.fw_ver??t.info?.ver??""}
                    .thumbBasenames=${t.thumb_basenames??[]}
                    .effectsByName=${t.effects_by_name??{}}
                    .soundFlags=${t.sound_flags??[]}
                    .selectedFx=${i}
                    .filter=${this._filter}
                    .tileGrid=${o}
                    .selectedPalette=${e.pal??0}
                    .paletteAware=${!1!==s?.palette_enabled}
                    @effect-select=${t=>this._onFx(t.detail.effectId,t.detail.toggledOff)}
                  ></wled-effect-chips>
                </div>

                <div class="effects-tuning">
                  ${!1!==s?.palette_enabled&&Object.keys(t.palettes_by_name??{}).length?j`
                        <wled-palette-chips
                          ?compact=${o}
                          ?collapsible=${o}
                          .palettesByName=${t.palettes_by_name??{}}
                          .palettePreviews=${t.palette_previews??{}}
                          .selectedPal=${e.pal??0}
                          .deviceHost=${t.host??""}
                          @palette-select=${t=>{this._segPatch({pal:t.detail.paletteId})}}
                          @palette-catalog-changed=${()=>this._onPaletteCatalogChanged()}
                        ></wled-palette-chips>
                      `:null}

                  <wled-segment-advanced
                    .segment=${e}
                    .meta=${s}
                    ?compact=${o}
                    @segment-patch=${t=>{this._segPatch(t.detail)}}
                  ></wled-segment-advanced>

                  <div class="sliders ${o?"compact":""}">
                    ${Object.entries(Br).map(([t,i])=>{if(!r[t])return null;const s=e[t];return j`
                        <label>
                          ${i}
                          <ha-slider
                            min="0"
                            max="255"
                            step="1"
                            .value=${s??128}
                            @change=${e=>this._slider(t,e)}
                          ></ha-slider>
                        </label>
                      `})}
                  </div>

                  ${Object.keys(r).length?j`
                        <div class="save-row">
                          <button type="button" class="ghost" @click=${()=>this._saveAsDefault()}>
                            Save as default
                          </button>
                          <button type="button" class="ghost" @click=${()=>this._openSaveCopy()}>
                            Save copy…
                          </button>
                          <button type="button" class="ghost" @click=${()=>this._openSaveScene()}>
                            Save as scene
                          </button>
                        </div>
                      `:null}

                  ${this._saveCopyOpen?j`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Preset name"
                            .value=${this._saveCopyName}
                            @input=${t=>{this._saveCopyName=t.target.value}}
                          />
                          <button type="button" class="primary" @click=${()=>this._confirmSaveCopy()}>
                            Save
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${()=>{this._saveCopyOpen=!1}}
                          >
                            Cancel
                          </button>
                        </div>
                      `:null}

                  ${this._saveSceneOpen?j`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Scene name"
                            .value=${this._saveSceneName}
                            @input=${t=>{this._saveSceneName=t.target.value}}
                          />
                          <button type="button" class="primary" @click=${()=>{this._confirmSaveScene()}}>
                            Save scene
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${()=>{this._saveSceneOpen=!1}}
                          >
                            Cancel
                          </button>
                        </div>
                      `:null}

                  ${this._library.length?j`
                        <div class="library-block">
                          <span class="library-label">Library</span>
                          <div class="library-row">
                            ${this._library.slice(0,o?6:12).map(t=>j`
                                <button
                                  type="button"
                                  class="library-chip"
                                  @click=${()=>{this._applyLibraryEntry(t)}}
                                >
                                  ${t.name}
                                </button>
                              `)}
                          </div>
                        </div>
                      `:null}

                  <p class="meta">
                    ${n} segment${1===n?"":"s"} · effect
                    #${i}
                    ${!1!==s?.palette_enabled&&void 0!==e.pal?j` · palette #${e.pal}`:null}
                  </p>
                </div>
              </div>
            `:null}
      </div>
    `}async _onFx(t,e){if(!this.connection||!this._snapshot)return;const i=this._targetIds(),s=Dt(i,{fx:t,on:!0},this._segments);try{await Ct(this.connection,this.controllerId,s);for(const e of i){const i=this._segments.findIndex(t=>t.id===e);if(i>=0){const e=[...this._segments];e[i]={...e[i],fx:t,on:!0},this._segments=e}}this._focusSegId=i[0],await this._refreshMeta();const r=Object.entries(this._snapshot.effects_by_name).find(([,e])=>e===t)?.[0]??(e?"Solid":`#${t}`),n=ri(this.controllerId,t);if(n&&Object.keys(n).length){const t=Dt(i,n,this._segments);await Ct(this.connection,this.controllerId,t)}qe(this,e?`Solid on ${i.length} segment(s)`:`Applied ${r}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){qe(this,`Apply failed: ${t.message||"error"}`)}}_slider(t,e){const i=ei(Number(e.target.value));null!==i&&this._segPatch({[t]:i})}async _segPatch(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i=Dt(e,t,this._segments);try{await Ct(this.connection,this.controllerId,i)}catch(t){return void qe(this,`Apply failed: ${t.message||"error"}`)}const s=[...this._segments];for(const i of e){const e=s.findIndex(t=>t.id===i);e>=0&&(s[e]={...s[e],...t})}this._segments=s}static{this.styles=[..._t,o`
      .wrap {
        max-width: 100%;
      }
      :host {
        display: block;
      }
      :host([compact]) {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
      }
      .wrap.compact {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-workspace {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
      }
      .effects-workspace.compact {
        flex: 1 1 auto;
        min-height: 0;
        height: 100%;
      }
      .effects-toolbar {
        flex: 0 0 auto;
      }
      .effects-scroll {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .effects-scroll wled-effect-chips {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-tuning {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
        max-height: min(42vh, 280px);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .effects-workspace.compact .effects-tuning {
        max-height: min(46vh, 300px);
      }
      .wrap.compact .search {
        max-width: 100%;
      }
      .merge-prompt {
        margin: 0 0 12px;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--warning-color, orange);
        background: color-mix(in srgb, var(--warning-color) 12%, transparent);
        font-size: 0.85rem;
      }
      .merge-prompt p {
        margin: 0 0 8px;
      }
      .merge-prompt-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .merge-prompt .primary,
      .merge-prompt .ghost {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .merge-prompt .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
        margin: 0 0 8px;
      }
      .seg-note {
        margin: 0 0 12px;
        font-size: 0.82rem;
        opacity: 0.85;
      }
      .seg-note p {
        margin: 8px 0 0;
        line-height: 1.4;
        opacity: 0.9;
      }
      .search {
        width: 100%;
        max-width: 360px;
        margin: 0 0 10px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .status {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
      .sliders {
        display: grid;
        gap: 8px;
        max-width: 320px;
        margin-top: 12px;
      }
      .sliders.compact {
        max-width: 100%;
      }
      .save-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
      }
      .save-row .ghost,
      .inline-form .ghost,
      .inline-form .primary {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .inline-form .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
        align-items: center;
      }
      .inline-form input {
        flex: 1 1 140px;
        min-width: 120px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .library-block {
        margin-top: 10px;
      }
      .library-label {
        display: block;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
        margin-bottom: 6px;
      }
      .library-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .library-chip {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
        cursor: pointer;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .meta {
        font-size: 0.75rem;
        opacity: 0.6;
        margin: 8px 0 0;
      }
    `]}};function Rr(t,e){return Math.max(0,Math.min(255,Math.round(t*e)))}function Fr(t,e,i){return`rgb(${t}, ${e}, ${i})`}function zr(t){return function(t){if(!t.length)return"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";if(1===t.length){const e=t[0];return`linear-gradient(135deg, ${e}, color-mix(in srgb, ${e} 55%, rgb(0 0 0)))`}const e=t.map((e,i)=>`${e} ${Math.round(i/(t.length-1)*100)}%`).join(", ");return`linear-gradient(135deg, ${e})`}(function(t){const e=t??{};if(!1===e.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const i="number"==typeof e.bri&&Number.isFinite(e.bri)?Math.max(0,Math.min(255,e.bri)):128,s=(Array.isArray(e.seg)?e.seg:[])[0]??{};if(!1===s.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const r=("number"==typeof s.bri&&Number.isFinite(s.bri)?Math.max(0,Math.min(255,s.bri)):i)/255,n=[];if(Array.isArray(s.col))for(const t of s.col.slice(0,3)){const[e,i,s]=Mt(t);n.push(Fr(Rr(e,r),Rr(i,r),Rr(s,r)))}if(!n.length){const t=Rr(255,r),e=Rr(220,r);n.push(Fr(t,e,Math.min(255,e-20)))}return n}(t.wled_state))}function Ur(t){return Boolean(t.scene_thumb_url?.trim())}t([ht({attribute:!1})],Or.prototype,"connection",void 0),t([ht()],Or.prototype,"controllerId",void 0),t([ht({type:Boolean,reflect:!0})],Or.prototype,"compact",void 0),t([dt()],Or.prototype,"_snapshot",void 0),t([dt()],Or.prototype,"_segments",void 0),t([dt()],Or.prototype,"_editIds",void 0),t([dt()],Or.prototype,"_focusSegId",void 0),t([dt()],Or.prototype,"_filter",void 0),t([dt()],Or.prototype,"_status",void 0),t([dt()],Or.prototype,"_meta",void 0),t([dt()],Or.prototype,"_mergeActive",void 0),t([dt()],Or.prototype,"_library",void 0),t([dt()],Or.prototype,"_saveCopyOpen",void 0),t([dt()],Or.prototype,"_saveCopyName",void 0),t([dt()],Or.prototype,"_saveSceneOpen",void 0),t([dt()],Or.prototype,"_saveSceneName",void 0),t([dt()],Or.prototype,"_needsMergeApply",void 0),Or=t([Me("wled-view-effects")],Or);let Hr=class extends bt{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._reload();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._rowEl&&(this._rowEl=e,this._ro?.observe(e),this._measure())}reload(){this._reload()}_reload(){var t;this._recents=(t=this.controllerId)?gr(ur)[t]??[]:[]}_measure(){const t=this._rowEl;if(!t)return;const e=_r(t.clientWidth,104,8,8);e!==this._visibleCount&&(this._visibleCount=e)}_sceneFor(t){return this.scenes.find(e=>e.id===t)}render(){const t=this._recents.filter(t=>this.scenes.some(e=>e.id===t.id)).slice(0,this._visibleCount);return t.length?j`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${t.map(t=>{const e=this._sceneFor(t.id),i=e?.name??t.name,s=e?zr(e):"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))",r=e&&Ur(e)?e.scene_thumb_url.trim():"";return j`
              <button
                type="button"
                class="chip"
                aria-label=${`Apply scene ${i}`}
                ?disabled=${this.disabled}
                @click=${()=>this.dispatchEvent(new CustomEvent("scene-select",{detail:{sceneId:t.id},bubbles:!0,composed:!0}))}
              >
                <span class="chip-visual">
                  <span
                    class="chip-gradient"
                    style="background:${s}"
                    aria-hidden="true"
                  ></span>
                  ${r?j`<img
                        class="chip-thumb"
                        src=${r}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        @error=${t=>{t.target.style.display="none"}}
                      />`:null}
                  <span class="chip-scrim">
                    <span class="chip-name">${i}</span>
                  </span>
                </span>
              </button>
            `})}
        </div>
      </div>
    `:null}static{this.styles=[..._t,o`
      .block {
        margin-bottom: 14px;
      }
      .label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wled-text-muted);
      }
      .recent-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 8px;
        overflow: hidden;
      }
      .chip {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
        min-height: 120px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 0;
        background: var(--wled-surface);
        color: inherit;
        cursor: pointer;
        overflow: hidden;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .chip-visual {
        position: relative;
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        background: var(--wled-surface-elevated);
      }
      .chip-gradient,
      .chip-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .chip-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .chip-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        padding: 16px 8px 6px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        pointer-events: none;
      }
      .chip-name {
        display: block;
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--wled-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .chip:hover:not(:disabled) {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `]}};t([ht()],Hr.prototype,"controllerId",void 0),t([ht({type:Array})],Hr.prototype,"scenes",void 0),t([ht({type:Boolean})],Hr.prototype,"disabled",void 0),t([dt()],Hr.prototype,"_recents",void 0),t([dt()],Hr.prototype,"_visibleCount",void 0),Hr=t([Me("wled-recent-scenes-row")],Hr);let jr=class extends bt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[t,e]=await Promise.all([Ke(this.connection,this.controllerId),kt(this.connection,this.controllerId)]);if(this._scenes=t,this._snapshot=e,this._segments=[...e.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(t=>t.id);else{const t=new Set(this._segments.map(t=>t.id));this._applySegIds=this._applySegIds.filter(e=>t.has(e)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(t=>t.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(t){this._toggleApplySeg(t)}_toggleApplySeg(t){let e=Je(this._applySegIds,t);e.length||(e=[t]),this._applySegIds=e}_isLoading(){return"Loading scenes…"===this._status}_renderSkeleton(){return j`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading scenes">
        <wled-skeleton height="2.5rem" width="100%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>j`<wled-skeleton height="120px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const t=this.compact;return j`
      <div class="wrap ${t?"compact":""}">
        <header class="head">
          ${t?j`<span class="card-label">Scenes</span>`:j`
                <div>
                  <h2>Scenes</h2>
                  <p class="hint">
                    Apply uses WLED crossfade (<code>tt</code>) on the device — one POST, no
                    client tweening.
                  </p>
                </div>
              `}
          <div class="actions">
            <input
              class="name-in"
              type="text"
              placeholder="Scene name"
              aria-label="New scene name"
              .value=${this._captureName}
              @input=${t=>{this._captureName=t.target.value}}
            />
            <button
              type="button"
              class="primary"
              ?disabled=${this._busy||!this._captureName.trim()}
              @click=${()=>this._capture()}
            >
              ${t?"Save":"Save current look"}
            </button>
          </div>
        </header>

        ${this._isLoading()?this._renderSkeleton():this._status?j`<p class="status">${this._status}</p>`:null}

        ${!t&&this._segments.length?j`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._applySegIds}
                .segmentEntities=${this._snapshot?.segment_entities??[]}
                hint="Apply scenes to highlighted segments"
                @segment-toggle=${t=>this._toggleApplySeg(t.detail.id)}
              ></wled-segment-bar>
            `:null}

        <wled-recent-scenes-row
          .controllerId=${this.controllerId}
          .scenes=${this._scenes}
          ?disabled=${this._busy}
          @scene-select=${t=>{const e=this._scenes.find(e=>e.id===t.detail.sceneId);e&&this._apply(e)}}
        ></wled-recent-scenes-row>

        ${this._conflict?j`
              <div class="conflict" role="alert">
                <p>
                  <strong>${this._conflict.name}</strong> changed on another client.
                  Reload or overwrite?
                </p>
                <div class="row">
                  <button type="button" @click=${()=>this._dismissConflict()}>
                    Reload list
                  </button>
                  <button
                    type="button"
                    class="warn"
                    @click=${()=>this._overwriteConflict()}
                  >
                    Overwrite anyway
                  </button>
                </div>
              </div>
            `:null}

        <div class="grid" role="list">
          ${this._scenes.map(t=>this._sceneTile(t))}
        </div>
      </div>
    `}_sceneTile(t){const e=t.transition_ms??2500,i=zr(t),s=Ur(t)?t.scene_thumb_url.trim():"";return j`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${t.name}`}
          ?disabled=${this._busy}
          @click=${()=>this._apply(t)}
        >
          <div class="tile-visual">
            <div
              class="tile-gradient"
              style="background:${i}"
              aria-hidden="true"
            ></div>
            ${s?j`<img
                  class="tile-thumb"
                  src=${s}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  @error=${t=>{t.target.style.display="none"}}
                />`:null}
            <div class="tile-scrim">
              <span class="tile-name">${t.name}</span>
              ${t.seeded?j`<span class="badge">Starter</span>`:null}
              <span class="tile-meta">${(e/1e3).toFixed(1)}s fade</span>
            </div>
          </div>
        </button>
        ${t.seeded?null:j`
              <button
                type="button"
                class="icon-btn"
                aria-label=${`Delete ${t.name}`}
                ?disabled=${this._busy}
                @click=${()=>this._delete(t)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            `}
      </article>
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(t){if(this.connection){this._busy=!0,this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const e=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(t,e,i,s){await $t(t);const r={type:"wled_studio/scene_apply",schema_version:1,controller_id:e,scene_id:i,transition_ms:s?.transitionMs,segment_ids:s?.segmentIds?.length?s.segmentIds:void 0};return s?.signal?new Promise((e,i)=>{const n=()=>i(new DOMException("Aborted","AbortError"));s.signal?.aborted?n():(s.signal?.addEventListener("abort",n,{once:!0}),t.sendMessagePromise(r).then(t=>{s.signal?.removeEventListener("abort",n),e(t.state??{})}).catch(t=>{s.signal?.removeEventListener("abort",n),i(t)}))}):(await t.sendMessagePromise(r)).state??{}}(this.connection,this.controllerId,t.id,{signal:this._applyAbort.signal,segmentIds:e?void 0:[...this._applySegIds]}),function(t,e,i){if(!t)return[];const s=gr(ur),r=(s[t]??[]).filter(t=>t.id!==e);r.unshift({id:e,name:i}),s[t]=r.slice(0,10),fr(ur,s),s[t]}(this.controllerId,t.id,t.name),this._recentScenesRow()?.reload(),await this._load(),qe(this,`Applied ${t.name}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){if("AbortError"!==t.name){qe(this,`Apply failed: ${t.message||t.message||"error"}`)}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const t=this._captureName.trim();if(t){this._busy=!0;try{const e=await Xe(this.connection,this.controllerId,t);this._captureName="",qe(this,`Saved ${e.name}`),await this._load()}catch(e){qe(this,e instanceof Ge?`"${t}" was changed on another device — reload and save again.`:`Save failed: ${e.message||"error"}`)}finally{this._busy=!1}}}async _delete(t){if(this.connection&&confirm(`Delete scene "${t.name}"?`)){this._busy=!0;try{await async function(t,e,i){await Ye(t,{type:"wled_studio/scene_delete",controller_id:e,scene_id:i})}(this.connection,this.controllerId,t.id),qe(this,`Deleted ${t.name}`),await this._load()}catch{qe(this,"Delete failed")}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const t=this._scenes.find(t=>t.id===this._conflict?.id);if(t){this._busy=!0;try{await async function(t,e,i,s){try{return(await Ye(t,{type:"wled_studio/scene_save",controller_id:e,scene:i,if_match_etag:s?.ifMatchEtag})).scene??i}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new Ge(e.data.scene,String(e.data.etag??e.message??""));throw t}}(this.connection,this.controllerId,t,{ifMatchEtag:this._conflict.etag}),this._conflict=void 0,qe(this,"Scene overwritten"),await this._load()}catch(t){t instanceof Ge?this._conflict=t.remote:qe(this,`Overwrite failed: ${t.message||"error"}`)}finally{this._busy=!1}}}static{this.styles=[..._t,o`
      .wrap {
        max-width: 960px;
      }
      .wrap.compact {
        max-width: none;
      }
      .wrap.compact .head {
        margin-bottom: 8px;
      }
      .wrap.compact .card-label {
        font-weight: 600;
        font-size: 0.85rem;
      }
      .wrap.compact .name-in {
        min-width: 6rem;
        padding: 6px 8px;
        font-size: 0.85rem;
      }
      .wrap.compact .primary {
        padding: 6px 10px;
        font-size: 0.85rem;
      }
      .wrap.compact .grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
      }
      .wrap.compact .tile-main {
        padding: 0;
      }
      .head {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }
      .head h2 {
        margin: 0 0 4px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        color: var(--wled-text-muted);
        max-width: 28rem;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .name-in {
        min-width: 10rem;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .status {
        font-size: 0.9rem;
        color: var(--wled-text-muted);
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 12px;
      }
      .sk-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      .conflict {
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 8px;
        background: var(--error-color, #b71c1c);
        color: #fff;
      }
      .conflict .row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      .warn {
        background: rgba(0, 0, 0, 0.25);
      }
      .grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      @container wled-studio (min-width: 600px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }
      @container wled-studio (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }
      .tile {
        display: flex;
        align-items: stretch;
        min-height: 120px;
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        border: 1px solid var(--wled-border);
        background: var(--wled-surface);
        transition: border-color var(--wled-transition-fast);
      }
      .tile:hover {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
      }
      .tile-main {
        flex: 1;
        display: block;
        min-width: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
      }
      .tile-main:hover:not(:disabled) {
        background: transparent;
      }
      .tile-main:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .tile-visual {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        overflow: hidden;
        background: var(--wled-surface-elevated);
      }
      .tile-gradient,
      .tile-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .tile-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .tile-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 18px 10px 8px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        color: var(--wled-text);
        pointer-events: none;
      }
      .tile-name {
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .badge {
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .tile-meta {
        font-size: 0.68rem;
        color: var(--wled-text-muted);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .icon-btn {
        align-self: stretch;
        border: none;
        border-left: 1px solid var(--wled-border);
        background: transparent;
        color: var(--wled-text-muted);
        padding: 0 10px;
        cursor: pointer;
        transition: background var(--wled-transition-fast);
      }
      .icon-btn:hover:not(:disabled) {
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
      }
    `]}};function Wr(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Vr(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function qr(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function Gr(t,e){await $t(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(oi(t))}}async function Yr(t,e,i,s){const r=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),n=s?.brush,o=s?.fill,a=n?qr(n,s?.effectsByName??{}):"color";await Gr(t,{type:"wled_studio/paint_frame",controller_id:e,data:r,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...n?{brush:n}:{},...o?{fill:o}:{},..."effect"===a&&n?{effect_id:n.fx}:{}})}async function Kr(t,e,i=!0){await Gr(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function Xr(t,e,i){const s=i?4:3,r=new Uint8ClampedArray(4*e);for(let n=0;n<e;n++){const e=n*s,o=4*n;r[o]=t[e]??0,r[o+1]=t[e+1]??0,r[o+2]=t[e+2]??0,r[o+3]=i?t[e+3]??0:255}return r}t([ht({attribute:!1})],jr.prototype,"connection",void 0),t([ht()],jr.prototype,"controllerId",void 0),t([ht({type:Boolean})],jr.prototype,"compact",void 0),t([dt()],jr.prototype,"_scenes",void 0),t([dt()],jr.prototype,"_status",void 0),t([dt()],jr.prototype,"_busy",void 0),t([dt()],jr.prototype,"_conflict",void 0),t([dt()],jr.prototype,"_captureName",void 0),t([dt()],jr.prototype,"_segments",void 0),t([dt()],jr.prototype,"_applySegIds",void 0),t([dt()],jr.prototype,"_snapshot",void 0),jr=t([Me("wled-view-scenes")],jr);const Jr={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Zr=class extends bt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await kt(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=oi(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await Pt(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=li(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value;if(t.startsWith("o"))return void this._emit({[t]:Number(i)>0});const s=ei(Number(i));null!==s&&this._emit({[t]:s})}render(){if(!this.settings)return null;const t=Mt(this.settings.col),e=this._meta,i=e?.sliders??{},s=this._snapshot?.rgbwm??0;return j`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?j`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?j`
              <label class="row">
                <input
                  type="checkbox"
                  .checked=${this.settings.on}
                  @change=${t=>this._emit({on:t.target.checked})}
                />
                On
              </label>
            `:null}
        <label class="bri-label">
          Brightness
          <ha-slider
            min="0"
            max="255"
            step="1"
            .value=${this.settings.bri}
            @change=${t=>this._slider("bri",t)}
          ></ha-slider>
        </label>

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[t[0],t[1],t[2]]}
          .white=${t[3]}
          .awm=${s}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
        ></wled-color-wheel-rgbw>

        ${this._loadingEffects?j`<p class="muted">Loading effects…</p>`:j`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />

              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver??this._snapshot?.info?.ver??""}
                .thumbBasenames=${this._snapshot?.thumb_basenames??[]}
                .effectsByName=${this._snapshot?.effects_by_name??{}}
                .soundFlags=${this._snapshot?.sound_flags??[]}
                .selectedFx=${this.settings.fx}
                .filter=${this._effectFilter}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>

              <div class="sliders">
                ${Object.entries(Jr).map(([t,e])=>{if(!i[t])return null;const s=this.settings[t];return"boolean"==typeof s?j`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${s}
                          @change=${e=>this._slider(t,e)}
                        />
                        ${e}
                      </label>
                    `:j`
                    <label>
                      ${e}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${s}
                        @change=${e=>this._slider(t,e)}
                      ></ha-slider>
                    </label>
                  `})}
              </div>
            `}
      </div>
    `}static{this.styles=[..._t,o`
      .block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .bri-label,
      .sliders label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
      }
      .fx-search {
        width: 100%;
        box-sizing: border-box;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .err {
        color: var(--error-color, #cf6679);
      }
    `]}};t([ht({attribute:!1})],Zr.prototype,"connection",void 0),t([ht({attribute:!1})],Zr.prototype,"hass",void 0),t([ht()],Zr.prototype,"controllerId",void 0),t([ht()],Zr.prototype,"heading",void 0),t([ht({attribute:!1})],Zr.prototype,"settings",void 0),t([ht({type:Boolean})],Zr.prototype,"showOnToggle",void 0),t([dt()],Zr.prototype,"_loadingEffects",void 0),t([dt()],Zr.prototype,"_error",void 0),t([dt()],Zr.prototype,"_snapshot",void 0),t([dt()],Zr.prototype,"_meta",void 0),t([dt()],Zr.prototype,"_effectFilter",void 0),Zr=t([Me("wled-paint-settings")],Zr);let Qr=class extends bt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=Wr(),this._fill=Vr("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,r=0;const n=(...n)=>{s=n;const o=Date.now(),a=o-r;if(a>=e)return r=o,i&&(clearTimeout(i),i=void 0),void t(...n);i||(i=setTimeout(()=>{i=void 0,r=Date.now(),s&&t(...s)},e-a))};return n.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},n}(()=>{this._flushNow()},20),this._flushEffect=It(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===qr(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([kt(this.connection,this.controllerId),Bt(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=Wr(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=oi(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await Kr(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return Gr(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=oi(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=Xr(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,r=4*s;i[r]=this._buffer[t]??0,i[r+1]=this._buffer[t+1]??0,i[r+2]=this._buffer[t+2]??0,i[r+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=Xr(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await Kr(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=oi(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await Yr(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=oi(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=Vr(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await Kr(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=oi(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await Kr(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=oi(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return j`
      <section class="paint ${e?"compact":""}">
        ${e?null:j`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?j`<p class="warn">${this._warn}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?j`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(t=>j`<option value=${t.id}>${t.name||t.id}</option>`)}
                </select>
              </label>
            `:t?null:j`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?j`open <strong>Studio → Layout</strong> first.`:j`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:j`
              <div class="layout-canvas">
                <wled-geometry-preview
                  paintMode
                  .externalLive=${!this._brushIsEffect()}
                  .paintLivePreview=${this._brushIsEffect()}
                  .connection=${this.connection}
                  .controllerId=${this.controllerId}
                  .layoutId=${this._layoutId}
                  .fixtureId=${this._fixtureId}
                  .pixelCount=${this._pixelCount}
                  .paintBrushSize=${this._brushSize}
                  @paint-stroke=${this._onPaintStroke}
                ></wled-geometry-preview>
              </div>
            `}

        <div class="settings-grid">
          <wled-paint-settings
            .connection=${this.connection}
            .hass=${this.hass}
            .controllerId=${this.controllerId}
            heading="Brush"
            .settings=${this._brush}
            @settings-change=${this._onBrushChange}
          ></wled-paint-settings>

          <div class="fill-panel">
            <h3 class="heading">Unpainted areas</h3>
            <label class="fill-mode">
              Fill
              <select
                .value=${this._fill.mode}
                @change=${t=>this._onFillModeChange(t.target.value)}
              >
                <option value="off">Off</option>
                <option value="preserve">Keep current look</option>
                <option value="custom">Custom look</option>
              </select>
            </label>
            ${"custom"===this._fill.mode?j`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?j`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:j`<p class="hint">Unpainted LEDs commit as off.</p>`}
          </div>
        </div>

        <div class="tools">
          <label class="brush-row">
            <span>Brush · ${this._brushSize} px</span>
            <ha-slider
              min="1"
              max="20"
              step="1"
              .value=${this._brushSize}
              @change=${t=>{this._brushSize=Number(t.target.value),this._emitPaintConfig()}}
            ></ha-slider>
          </label>
          <button type="button" ?disabled=${!this._active} @click=${()=>this._commit()}>
            End live &amp; commit
          </button>
          <button type="button" ?disabled=${!this._active} @click=${()=>this._cancel()}>
            Cancel live
          </button>
        </div>

        <p class="status">${this._status}</p>
      </section>
    `}static{this.styles=[..._t,o`
      .paint {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .paint.compact {
        gap: 8px;
      }
      .paint.compact .settings-grid {
        grid-template-columns: 1fr;
      }
      .paint.compact .tools {
        gap: 8px;
      }
      .paint.compact .tools button {
        font-size: 0.82rem;
        padding: 6px 10px;
      }
      .lead {
        margin: 0;
        opacity: 0.85;
        font-size: 0.9rem;
      }
      .warn,
      .warn-layout {
        color: var(--warning-color, #e6a700);
        margin: 0;
      }
      .layout-pick {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
        max-width: 320px;
      }
      .layout-canvas {
        width: 100%;
        max-height: min(70vh, 480px);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
      }
      .layout-canvas wled-geometry-preview {
        display: block;
        width: 100%;
      }
      .settings-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr;
      }
      @media (min-width: 900px) {
        .settings-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      .fill-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .fill-mode {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.75;
      }
      .tools {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .brush-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 160px;
        font-size: 0.85rem;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};t([ht({attribute:!1})],Qr.prototype,"connection",void 0),t([ht({attribute:!1})],Qr.prototype,"hass",void 0),t([ht()],Qr.prototype,"controllerId",void 0),t([ht({type:Boolean,attribute:"embed-mode"})],Qr.prototype,"embedMode",void 0),t([ht()],Qr.prototype,"embedLayoutId",void 0),t([ht()],Qr.prototype,"embedFixtureId",void 0),t([ht({type:Number})],Qr.prototype,"embedPixelCount",void 0),t([dt()],Qr.prototype,"_pixelCount",void 0),t([dt()],Qr.prototype,"_rgbw",void 0),t([dt()],Qr.prototype,"_active",void 0),t([dt()],Qr.prototype,"_brush",void 0),t([dt()],Qr.prototype,"_fill",void 0),t([dt()],Qr.prototype,"_brushSize",void 0),t([dt()],Qr.prototype,"_status",void 0),t([dt()],Qr.prototype,"_warn",void 0),t([dt()],Qr.prototype,"_effectsByName",void 0),t([dt()],Qr.prototype,"_layouts",void 0),t([dt()],Qr.prototype,"_layoutId",void 0),t([dt()],Qr.prototype,"_fixtureId",void 0),t([pt("wled-geometry-preview")],Qr.prototype,"_internalPreview",void 0),Qr=t([Me("wled-view-paint")],Qr);let tn=class extends bt{constructor(){super(...arguments),this._toasts=[],this._nextId=0,this._timers=new Map,this._onToast=t=>{const e=t.detail;if(!e?.message)return;const i=++this._nextId;this._toasts=[...this._toasts,{id:i,message:e.message}];const s=this._toastDurationMs(),r=window.setTimeout(()=>this._dismiss(i),s);this._timers.set(i,r)}}onPoweredConnect(){this.getRootNode().addEventListener(Ve,this._onToast,{signal:this.abort.signal})}onPoweredDisconnect(){for(const t of this._timers.values())window.clearTimeout(t);this._timers.clear()}_toastDurationMs(){const t=getComputedStyle(this).getPropertyValue("--m-toast").trim(),e=Number.parseInt(t,10);return Number.isFinite(e)&&e>0?e:4e3}_dismiss(t){const e=this._timers.get(t);void 0!==e&&(window.clearTimeout(e),this._timers.delete(t)),this._toasts=this._toasts.filter(e=>e.id!==t)}render(){return this._toasts.length?j`
      <div class="stack" aria-live="polite">
        ${this._toasts.map(t=>j`
            <p class="toast" role="status">${t.message}</p>
          `)}
      </div>
    `:null}static{this.styles=[..._t,o`
      :host {
        position: fixed;
        inset: auto 12px 12px;
        z-index: 100;
        display: flex;
        justify-content: center;
        pointer-events: none;
      }
      .stack {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 8px;
        width: min(100%, 420px);
      }
      .toast {
        margin: 0;
        padding: 10px 14px;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-surface-elevated);
        color: var(--wled-text);
        border: 1px solid var(--wled-border);
        box-shadow: var(--wled-shadow);
        font-size: 0.875rem;
        line-height: 1.35;
        pointer-events: auto;
        animation: wled-toast-in var(--m-view-transition) ease;
      }
      @keyframes wled-toast-in {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    `]}};t([dt()],tn.prototype,"_toasts",void 0),tn=t([Me("wled-toast-host")],tn);const en="wled-studio-card",sn=[{id:"color",label:"Color",icon:"mdi:palette"},{id:"effects",label:"Effects",icon:"mdi:animation-play"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch"},{id:"segments",label:"Segments",icon:"mdi:vector-line"},{id:"paint",label:"Paint",icon:"mdi:brush"}];class rn extends bt{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._previewStatus="connecting",this._hint="",this._layoutId="",this._fixtureId="",this._cardTab="color",this._selection=new Ft(this),this._session=new Ee(this),this._globalBriPct=null,this._lastNonZeroBri=100,this._bootstrapGen=0,this._bootstrapControllerKey="",this._tabTouchStartX=0,this._tabTouchStartY=0,this._tabSwiping=!1}get _selectedSegId(){return this._selection.selectedSegId}get _highlightSegIds(){return this._selection.highlightSegIds}get _segments(){return this._selection.segments}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 8}static getConfigElement(){const t=document.createElement("wled-studio-card-editor");return t.setConfig(rn.getStubConfig()),t}static getStubConfig(){return{type:`custom:${en}`,controller:"Cloud",height:200,show_segments:!1}}_visibleModeTabs(){return sn.filter(t=>("scenes"!==t.id||!1!==this.config?.show_scenes)&&(("paint"!==t.id||!1!==this.config?.show_paint)&&(("segments"!==t.id||!0===this.config?.show_segments)&&("effects"!==t.id||!1!==this.config?.show_effects))))}_tabId(t){return`wled-card-tab-${t}`}_panelId(t){return`wled-card-panel-${t}`}willUpdate(t){super.willUpdate(t);const e=this._visibleModeTabs().map(t=>t.id);e.includes(this._cardTab)||(this._cardTab=e[0]??"color")}updated(t){if(super.updated(t),this._syncSegmentsFromControls(),t.has("hass")&&null!==this._globalBriPct){const t=this._readGlobalBrightnessPct();(0===t||Math.abs(t-this._globalBriPct)<=1)&&(this._globalBriPct=null)}if((t.has("hass")||t.has("_globalBriPct"))&&this._syncGlobalBriToSegmentControls(),t.has("_cardTab")&&this._onCardTabChanged(t.get("_cardTab")),(t.has("_cardTab")||t.has("_paintPanel"))&&this._syncPaintPreview(),!t.has("_cardTab")||"color"!==this._cardTab&&"segments"!==this._cardTab||this.scheduleRaf(()=>this._syncGlobalBriToSegmentControls()),t.has("config"))return this._bindConnectionReady(),void this._bootstrap(!0);t.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}async _onCardTabChanged(t){"paint"===t&&"paint"!==this._cardTab&&await(this._paintPanel?.cancelLiveIfActive()),this._syncPaintPreview()}_syncPaintPreview(){const t="paint"===this._cardTab;this._preview&&(this._preview.paintMode=t,t&&this._paintPanel&&(this._preview.paintBrushSize=this._paintPanel.brushSize,this._preview.externalLive=this._paintPanel.paintExternalLive,this._preview.paintLivePreview=this._paintPanel.paintLivePreview,this._paintPanel.bindExternalPreview(this._preview)))}_onPaintStroke(t){this._paintPanel?.handleExternalPaintStroke(t)}_onPaintConfigChange(){this._syncPaintPreview()}_selectCardTab(t){t!==this._cardTab&&(this._cardTab=t)}_swipeTab(t){const e=this._visibleModeTabs(),i=e.findIndex(t=>t.id===this._cardTab);i<0||(t<0&&i<e.length-1?this._selectCardTab(e[i+1].id):t>0&&i>0&&this._selectCardTab(e[i-1].id))}_onTabPanelTouchStart(t){1===t.touches.length&&(this._tabTouchStartX=t.touches[0].clientX,this._tabTouchStartY=t.touches[0].clientY,this._tabSwiping=!1)}_onTabPanelTouchMove(t){if(1!==t.touches.length)return;const e=t.touches[0].clientX-this._tabTouchStartX,i=t.touches[0].clientY-this._tabTouchStartY;Math.abs(e)>Math.abs(i)&&Math.abs(e)>10&&(this._tabSwiping=!0)}_onTabPanelTouchEnd(t){if(!this._tabSwiping||1!==t.changedTouches.length)return void(this._tabSwiping=!1);const e=t.changedTouches[0].clientX-this._tabTouchStartX;Math.abs(e)>=50&&this._swipeTab(e),this._tabSwiping=!1}_focusModeTab(t){const e=this.renderRoot.querySelector(`#${this._tabId(t)}`);e?.focus()}_onModeTabsKeydown(t){const e=this._visibleModeTabs(),i=e.findIndex(t=>t.id===this._cardTab);if(i<0)return;let s=i;switch(t.key){case"ArrowRight":case"ArrowDown":s=(i+1)%e.length;break;case"ArrowLeft":case"ArrowUp":s=(i-1+e.length)%e.length;break;case"Home":s=0;break;case"End":s=e.length-1;break;default:return}t.preventDefault();const r=e[s].id;this._selectCardTab(r),this.scheduleRaf(()=>this._focusModeTab(r))}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0,this._paintPanel?.cancelLiveIfActive()}_bindConnectionReady(){this.hass?.connection&&!this._offConnReady&&(this._offConnReady=vt(this.hass.connection,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(t){const e=(this.config?.controller??"").trim();if(!e)return t[0];const i=e.toLowerCase();return t.find(t=>{const s=String(t.title??"");return String(t.entry_id??"")===e||s===e||s.toLowerCase().includes(i)||s.toLowerCase().endsWith(`— ${i}`)||s.toLowerCase().endsWith(`- ${i}`)})??t[0]}_pickLayout(t){const e=(this.config?.layout_id??"").trim();return e?t.find(t=>t.id===e||t.name===e):t[0]}async _bootstrap(t=!1){if(!this.hass?.connection)return;const e=(this.config?.controller??"").trim();if(!t&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===e)return;const i=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this.requestUpdate());const s=[0,400,1200,2500];for(const t of s){if(i!==this._bootstrapGen||!this.isConnected)return;t>0&&await new Promise(e=>setTimeout(e,t));try{const t=await St(this.hass.connection),s=this._pickController(t);if(!s?.entry_id){i===this._bootstrapGen&&(this._hint=0===t.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(i!==this._bootstrapGen)return;return this._controllerId=String(s.entry_id),this._masterEntity=String(s.master_entity_id??""),this._pixelCount=Number(s.pixel_count)||210,this._bootstrapControllerKey=e,this._hint="",await this._loadLayout(),this._startLive(),this._loadSegments(),void this.requestUpdate()}catch(t){const e=t instanceof Error?t.message:String(t??"unknown");i===this._bootstrapGen&&(this._hint=`Connecting… (${e})`,this.requestUpdate())}}i===this._bootstrapGen&&(this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}async _loadLayout(){if(this.hass?.connection&&this._controllerId)try{const t=await Bt(this.hass.connection,this._controllerId),e=this._pickLayout(t);if(!e)return this._layoutId="",void(this._fixtureId="");this._layoutId=e.id;const i=e.fixtures[0];this._fixtureId=i?String(i.id??"fixture-0"):"fixture-0",e.pixel_count&&(this._pixelCount=e.pixel_count),await(this._preview?.refresh())}catch{this._layoutId="",this._fixtureId=""}}_startLive(){if(!this.hass?.connection||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=xt(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}_onStripSegmentSelect(t){"paint"!==this._cardTab&&(this._selection.selectSegment(t.detail.segmentId),this._refreshAccent(),"color"===this._cardTab?this._segmentControls?.selectSegment(t.detail.segmentId):"effects"===this._cardTab?this._effectsView?.selectSegmentFromPreview(t.detail.segmentId):"segments"===this._cardTab&&this._segmentControls?.selectSegment(t.detail.segmentId))}_onSegmentTargetsChanged(t){this._selection.applyTargetsChanged(t.detail)}_onSegmentChange(t){this._selection.applySegmentChange(t.detail),this._refreshAccent()}async _loadSegments(){if(this.hass?.connection&&this._controllerId)try{const t=(await kt(this.hass.connection,this._controllerId)).segments??[];this._selection.setSegments(t),t.length&&this._selection.selectedSegId<0&&this._selection.selectSegment(t[0].id),this._refreshAccent()}catch{}}_syncSegmentsFromControls(){const t=this._segmentControls?.segments;t?.length&&this._selection.setSegments(t),this._refreshAccent()}_refreshAccent(){const t=this._selection.segments,e=this._selection.selectedSegId,i=t.find(t=>t.id===e);this._session.applyAccentFromSegment(i)}_readGlobalBrightnessPct(){return this.hass&&this._masterEntity?Ot(this.hass.states[this._masterEntity]):0}_syncGlobalBriToSegmentControls(){const t=Rt(this._globalBrightnessPct());for(const e of this.renderRoot.querySelectorAll("wled-segment-controls"))e.applyGlobalBrightness(t)}_globalBrightnessPct(){return null!==this._globalBriPct?this._globalBriPct:this._readGlobalBrightnessPct()}_onGlobalBriInput(t){const e=t.target;let i=Number(e.value);0===(this._globalBriPct??this._readGlobalBrightnessPct())&&i>0&&this._lastNonZeroBri>0&&(i=this._lastNonZeroBri,e.value=String(i)),i>0&&(this._lastNonZeroBri=i),this._globalBriPct=i,this._syncGlobalBriToSegmentControls()}_setGlobalBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);if(0===e){const t=this._globalBriPct??this._readGlobalBrightnessPct();t>0&&(this._lastNonZeroBri=t)}else this._lastNonZeroBri=e;this._globalBriPct=e;const i=Rt(e);this._syncGlobalBriToSegmentControls(),0===e?this.hass.callService("light","turn_off",{entity_id:this._masterEntity}):this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e}),this.hass.connection&&this._controllerId&&Ct(this.hass.connection,this._controllerId,{bri:i,on:e>0})}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_renderModeTabs(){const t=this._visibleModeTabs();return j`
      <div
        class="mode-tabs"
        role="tablist"
        aria-label="Control mode"
        @keydown=${this._onModeTabsKeydown}
      >
        ${t.map(t=>{const e=this._cardTab===t.id;return j`
            <button
              type="button"
              id=${this._tabId(t.id)}
              role="tab"
              class="mode-tab ${e?"active":""}"
              aria-label=${t.label}
              aria-selected=${e?"true":"false"}
              aria-controls=${this._panelId(t.id)}
              tabindex=${e?"0":"-1"}
              @click=${()=>this._selectCardTab(t.id)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span class="mode-tab-label">${t.label}</span>
            </button>
          `})}
      </div>
    `}_renderTabPanel(){if(!this._controllerId||!this.hass?.connection)return null;const t=this.hass.connection,e=this.hass,i=this._panelId(this._cardTab),s=this._tabId(this._cardTab);switch(this._cardTab){case"color":return j`
          <div
            id=${i}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${s}
          >
            <wled-segment-controls
              class="tab-panel"
              .hass=${e}
              .connection=${t}
              .controllerId=${this._controllerId}
              .masterEntity=${this._masterEntity}
              .selectedSegId=${this._selectedSegId}
              compact
              hideSegmentBrightness
              @segment-change=${this._onSegmentChange}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-segment-controls>
          </div>
        `;case"effects":return j`
          <div
            id=${i}
            class="tab-panel-host effects-panel"
            role="tabpanel"
            aria-labelledby=${s}
          >
            <wled-view-effects
              class="tab-panel"
              compact
              .hass=${e}
              .connection=${t}
              .controllerId=${this._controllerId}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-view-effects>
          </div>
        `;case"scenes":return j`
          <div
            id=${i}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${s}
          >
            <wled-view-scenes
              class="tab-panel"
              .connection=${t}
              .controllerId=${this._controllerId}
              compact
            ></wled-view-scenes>
          </div>
        `;case"segments":return j`
          <div
            id=${i}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${s}
          >
            <wled-segment-controls
              class="tab-panel"
              .hass=${e}
              .connection=${t}
              .controllerId=${this._controllerId}
              .masterEntity=${this._masterEntity}
              .selectedSegId=${this._selectedSegId}
              compact
              @segment-change=${this._onSegmentChange}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-segment-controls>
          </div>
        `;case"paint":return j`
          <div
            id=${i}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${s}
          >
            <wled-view-paint
              class="tab-panel"
              embed-mode
              .connection=${t}
              .hass=${e}
              .controllerId=${this._controllerId}
              .embedLayoutId=${this._layoutId}
              .embedFixtureId=${this._fixtureId}
              .embedPixelCount=${this._pixelCount}
              @paint-config-change=${this._onPaintConfigChange}
            ></wled-view-paint>
          </div>
        `;default:return null}}render(){const t=this.config?.height??200,e=this.remote.state,i=`--wled-preview-height: ${t}px`,s="paint"===this._cardTab,r=this._paintPanel?.brushSize??6,n=!s||(this._paintPanel?.paintExternalLive??!0),o=s&&(this._paintPanel?.paintLivePreview??!1);return j`
      <div class="card" role="region" aria-label="WLED Studio card">
        ${Boolean(window.__WLED_STUDIO_STALE__)?j`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `:null}
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller??"WLED Studio"}</span>
          ${e.isRemote?j`<span class="badge">Remote</span>`:null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <wled-geometry-preview
          class="layout-preview"
          style=${i}
          compact
          externalLive
          .heightPx=${t}
          .connection=${this.hass?.connection}
          .controllerId=${this._controllerId}
          .layoutId=${this._layoutId}
          .fixtureId=${this._fixtureId}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${s?-1:this._selectedSegId}
          .highlightSegIds=${s?[]:this._highlightSegIds}
          .paintMode=${s}
          .paintBrushSize=${r}
          .paintLivePreview=${o}
          .externalLive=${n}
          @segment-select=${this._onStripSegmentSelect}
          @paint-stroke=${this._onPaintStroke}
        ></wled-geometry-preview>

        ${this._renderModeTabs()}

        <div
          class="tab-body ${"effects"===this._cardTab?"tab-body-effects":""}"
          @touchstart=${this._onTabPanelTouchStart}
          @touchmove=${this._onTabPanelTouchMove}
          @touchend=${this._onTabPanelTouchEnd}
          @touchcancel=${()=>{this._tabSwiping=!1}}
        >${this._renderTabPanel()}</div>

        <div class="controls">
          <div class="bri-row">
            <label class="bri-label" for="global-brightness">Brightness</label>
            <span class="bri-pct" aria-live="polite">${this._globalBrightnessPct()}%</span>
          </div>
          <ha-slider
            id="global-brightness"
            min="0"
            max="100"
            step="1"
            .value=${this._globalBrightnessPct()}
            ?disabled=${!this._masterEntity}
            @input=${this._onGlobalBriInput}
            @change=${this._setGlobalBrightness}
          ></ha-slider>
        </div>

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${this._hint?j`<p class="hint">${this._hint}</p>`:null}
        ${!this._layoutId&&this._controllerId?j`<p class="hint layout-hint">
              No saved layout — create one in Studio → Layout to show your floorplan here.
            </p>`:null}
      </div>
      <wled-toast-host></wled-toast-host>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[..._t,o`
      .card {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;
        background: var(--wled-surface);
        border-radius: var(--wled-radius);
        box-shadow: var(--wled-shadow);
      }
      .stale-banner {
        display: block;
        margin-bottom: 10px;
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
        color: var(--wled-text);
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--warning-color, orange);
        color: var(--primary-text-color, #1a1200);
        font-weight: 600;
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        min-width: var(--wled-tap);
        min-height: var(--wled-tap);
      }
      .layout-preview {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      .mode-tabs {
        display: flex;
        flex-wrap: nowrap;
        gap: 4px;
        min-height: 48px;
        margin-bottom: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        border-bottom: 1px solid var(--wled-border);
      }
      .mode-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        flex: 0 0 auto;
        min-width: var(--wled-tap);
        min-height: 48px;
        padding: 6px 8px 4px;
        border: none;
        border-bottom: 3px solid transparent;
        border-radius: 0;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        font-size: 11px;
        line-height: 1.2;
        transition:
          color var(--wled-transition-fast),
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .mode-tab ha-icon {
        --mdc-icon-size: 24px;
      }
      .mode-tab-label {
        font-size: 11px;
        white-space: nowrap;
      }
      .mode-tab.active {
        color: var(--wled-text);
        border-bottom-color: var(--wled-accent);
        font-weight: 600;
      }
      .mode-tab:active {
        transform: scale(0.97);
      }
      .tab-body {
        flex: 1 1 auto;
        max-height: min(48vh, 380px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        margin: 0 0 10px;
        border-top: 1px solid var(--wled-border);
        padding-top: 10px;
      }
      .tab-body-effects {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .tab-body-effects .effects-panel {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .tab-body-effects .effects-panel .tab-panel {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .tab-panel-host {
        display: block;
        animation: tab-fade-in var(--m-view-transition) ease;
      }
      @keyframes tab-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tab-panel-host {
          animation: none;
        }
      }
      .tab-panel {
        display: block;
      }
      .controls {
        margin: 0;
        padding-top: 10px;
        border-top: 1px solid var(--wled-border);
      }
      .bri-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 4px;
      }
      .bri-label {
        font-size: 0.8rem;
        color: var(--wled-text-muted);
      }
      .bri-pct {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--wled-text);
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-accent);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-top: 10px;
        min-height: var(--wled-tap);
        transition: transform var(--wled-transition-fast);
      }
      .studio-link:active {
        transform: scale(0.97);
      }
      .hint {
        font-size: 0.8rem;
        color: var(--wled-text-muted);
        margin: 8px 0 0;
      }
      .layout-hint {
        font-style: italic;
      }
    `]}}function nn(){return{type:`custom:${en}`,controller:"",height:200,show_segments:!1}}t([ht({attribute:!1})],rn.prototype,"config",void 0),t([dt()],rn.prototype,"_controllerId",void 0),t([dt()],rn.prototype,"_masterEntity",void 0),t([dt()],rn.prototype,"_pixelCount",void 0),t([dt()],rn.prototype,"_previewStatus",void 0),t([dt()],rn.prototype,"_hint",void 0),t([dt()],rn.prototype,"_layoutId",void 0),t([dt()],rn.prototype,"_fixtureId",void 0),t([dt()],rn.prototype,"_cardTab",void 0),t([pt("wled-geometry-preview")],rn.prototype,"_preview",void 0),t([pt("wled-segment-controls")],rn.prototype,"_segmentControls",void 0),t([pt("wled-view-effects")],rn.prototype,"_effectsView",void 0),t([pt("wled-view-paint")],rn.prototype,"_paintPanel",void 0),t([dt()],rn.prototype,"_globalBriPct",void 0),t([dt()],rn.prototype,"_lastNonZeroBri",void 0);const on=[{key:"show_effects",label:"Show Effects tab"},{key:"show_scenes",label:"Show Scenes tab"},{key:"show_segments",label:"Show Segments tab (legacy)"},{key:"show_paint",label:"Show Paint tab"}];let an=class extends ot{constructor(){super(...arguments),this._config=nn()}setConfig(t){this._config={...nn(),...t,type:t.type??`custom:${en}`}}render(){const t=this._config;return j`
      <div class="editor">
        <p>WLED Studio card — pick the controller name (e.g. Cloud).</p>
        <ha-textfield
          .label=${"Controller"}
          .value=${t.controller??""}
          @value-changed=${this._onController}
        ></ha-textfield>
        <ha-textfield
          .label=${"Preview height (px)"}
          .value=${String(t.height??200)}
          @value-changed=${this._onHeight}
        ></ha-textfield>
        <ha-textfield
          .label=${"Layout id (optional)"}
          .value=${t.layout_id??""}
          @value-changed=${this._onLayoutId}
        ></ha-textfield>
        <fieldset class="tabs">
          <legend>Visible tabs</legend>
          ${on.map(({key:e,label:i})=>j`
              <label class="toggle">
                <input
                  type="checkbox"
                  .checked=${"show_segments"===e?!0===t[e]:!1!==t[e]}
                  @change=${t=>this._onTabToggle(e,t)}
                />
                <span>${i}</span>
              </label>
            `)}
        </fieldset>
      </div>
    `}_onController(t){this._fire({...this._config,controller:t.detail.value})}_onHeight(t){const e=Number(t.detail.value);this._fire({...this._config,height:Number.isFinite(e)?e:200})}_onLayoutId(t){const e=t.detail.value.trim(),i={...this._config};e?i.layout_id=e:delete i.layout_id,this._fire(i)}_onTabToggle(t,e){const i=e.target.checked;this._fire({...this._config,[t]:i})}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static{this.styles=o`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .tabs {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      padding: 12px;
      margin: 0;
    }
    .tabs legend {
      padding: 0 4px;
      font-size: 0.9rem;
    }
    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .toggle:first-of-type {
      margin-top: 4px;
    }
    .toggle input {
      width: 16px;
      height: 16px;
      margin: 0;
    }
  `}};t([ht({attribute:!1})],an.prototype,"hass",void 0),t([dt()],an.prototype,"_config",void 0),an=t([Me("wled-studio-card-editor")],an),function(){const t=window.__WLED_STUDIO_BUILD__;t&&t!==yt&&(window.__WLED_STUDIO_STALE__=!0),window.__WLED_STUDIO_BUILD__=yt}(),function(t,e){const i=customElements.get(t);i||customElements.define(t,e)}(en,rn),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===en)||window.customCards.push({type:en,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:en});export{en as CARD_TAG,rn as WledStudioCard,nn as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map
