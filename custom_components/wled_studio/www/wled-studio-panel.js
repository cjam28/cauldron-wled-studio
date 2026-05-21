function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",v=_.reactiveElementPolyfillSupport,y=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,v?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,k=$.trustedTypes,I=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,A=`<${C}>`,M=document,L=()=>M.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,H=/"/g,F=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,Y=M.createTreeWalker(M,129);function X(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(e):e}let G=class t{constructor({strings:e,_$litType$:i},s){let n;this.parts=[];let o=0,r=0;const a=e.length-1,l=this.parts,[c,h]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=D;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===D?"!--"===l[1]?r=U:void 0!==l[1]?r=N:void 0!==l[2]?(F.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=n??D,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?H:W):r===H||r===W?r=z:r===U||r===N?r=D:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===D?i+A:c>=0?(s.push(a),i.slice(0,c)+P+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(e,i);if(this.el=t.createElement(c,s),Y.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&l.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(P)){const e=h[r++],i=n.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?it:Q}),n.removeAttribute(t)}else t.startsWith(E)&&(l.push({type:6,index:o}),n.removeAttribute(t));if(F.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],L()),Y.nextNode(),l.push({type:2,index:++o});n.append(t[e],L())}}}else if(8===n.nodeType)if(n.data===C)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)l.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}};function K(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,s)),e}let Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);Y.currentNode=s;let n=Y.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new J(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},J=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of e)n===i.length?i.push(s=new t(this.O(L()),this.O(L()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=K(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!R(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}},et=class extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}},it=class extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===B)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(G,J),($.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new J(e.insertBefore(L(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function ut(t){return(e,i)=>(customElements.get(t)||customElements.define(t,e),e)}const pt=r`
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
`,_t=r`
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
`;class ft{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const gt=[pt,_t];class vt extends rt{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new ft(this),this._visible=!0,this._inView=!0}static{this.styles=gt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ht({attribute:!1})],vt.prototype,"hass",void 0);const yt=/^[0-9a-fA-F]+$/;function mt(t,e,i,s){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&yt.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let o=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:s,n:o,channels:n,scale:o/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:!1}))};r();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}async function bt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function xt(t,e){await bt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function wt(t,e,i,s){await bt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}function $t(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function St(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function kt(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function It(t,e){for(const i of e){if(kt(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}function Pt(t,e,i){const s=(i.length?i:[{id:t}]).map(i=>i.id===t?{...e,id:t,sel:!0,on:void 0!==e.on?e.on:!1===i.on||i.on}:{id:i.id,sel:!1});return{seg:s}}function Et(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:St(t.col),awm:t.awm};return JSON.stringify(e)}function Ct(t,e,i){let s,n=null,o=0;const r=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await xt(t,e)).segments??[]).find(t=>t.id===o);if(!s||!n)return;const r=Et(n);if(r===Et(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(St(t.col))!==JSON.stringify(St(e.col))}(n,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=function(t,e,i=100){let s,n,o;const r=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o){const e=o;o=void 0,t(...e)}},a=(...t)=>{o=t,s&&clearTimeout(s),s=setTimeout(r,e),n||(n=setTimeout(r,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o=void 0},a}((s,a)=>{n=a,o=a.id,wt(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(n={...a,...i,id:a.id}),r()}).catch(()=>{i(a,"Failed to apply state to WLED")})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var At,Mt,Lt,Rt,Ot,Tt={},Dt=[],Ut=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Nt(t,e){for(var i in e)t[i]=e[i];return t}function zt(t){var e=t.parentNode;e&&e.removeChild(t)}function Wt(t,e,i){var s,n,o,r,a=arguments;if(e=Nt({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return r=e.key,null!=(o=e.ref)&&delete e.ref,null!=r&&delete e.key,Ht(t,e,r,o)}function Ht(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return At.vnode&&At.vnode(n),n}function Ft(t){return t.children}function jt(t,e){this.props=t,this.context=e}function Bt(t,e){if(null==e)return t.__p?Bt(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?Bt(t):null}function qt(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return qt(t)}}function Vt(t){(!t.__d&&(t.__d=!0)&&1===Mt.push(t)||Rt!==At.debounceRendering)&&(Rt=At.debounceRendering,(At.debounceRendering||Lt)(Yt))}function Yt(){var t,e,i,s,n,o,r,a;for(Mt.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Mt.pop();)t.__d&&(i=void 0,s=void 0,o=(n=(e=t).__v).__e,r=e.__P,a=e.u,e.u=!1,r&&(i=[],s=Qt(r,n,Nt({},n),e.__n,void 0!==r.ownerSVGElement,null,i,a,null==o?Bt(n):o),te(i,n),s!=o&&qt(n)))}function Xt(t,e,i,s,n,o,r,a,l){var c,h,d,u,p,_,f,g=i&&i.__k||Dt,v=g.length;if(a==Tt&&(a=null!=o?o[0]:v?Bt(i,0):null),c=0,e.__k=Gt(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=g[c])||d&&i.key==d.key&&i.type===d.type)g[c]=void 0;else for(h=0;h<v;h++){if((d=g[h])&&i.key==d.key&&i.type===d.type){g[h]=void 0;break}d=null}if(u=Qt(t,i,d=d||Tt,s,n,o,r,null,a,l),(h=i.ref)&&d.ref!=h&&(f||(f=[])).push(h,i.__c||u,i),null!=u){if(null==_&&(_=u),null!=i.l)u=i.l,i.l=null;else if(o==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,h=0;(p=p.nextSibling)&&h<v;h+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return c++,i}),e.__e=_,null!=o&&"function"!=typeof e.type)for(c=o.length;c--;)null!=o[c]&&zt(o[c]);for(c=v;c--;)null!=g[c]&&ie(g[c],g[c]);if(f)for(c=0;c<f.length;c++)ee(f[c],f[++c],f[++c])}function Gt(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Gt(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return Ht(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=Ht(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Kt(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Ut.test(e)?i+"px":null==i?"":i}function Zt(t,e,i,s,n){var o,r,a,l,c;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(o=t.style,"string"==typeof i)o.cssText=i;else{if("string"==typeof s&&(o.cssText="",s=null),s)for(r in s)i&&r in i||Kt(o,r,"");if(i)for(a in i)s&&i[a]===s[a]||Kt(o,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Jt,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Jt,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Jt(t){return this.t[t.type](At.event?At.event(t):t)}function Qt(t,e,i,s,n,o,r,a,l,c){var h,d,u,p,_,f,g,v,y,m,b=e.type;if(void 0!==e.constructor)return null;(h=At.__b)&&h(e);try{t:if("function"==typeof b){if(v=e.props,y=(h=b.contextType)&&s[h.__c],m=h?y?y.props.value:h.__p:s,i.__c?g=(d=e.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?e.__c=d=new b(v,m):(e.__c=d=new jt(v,m),d.constructor=b,d.render=se),y&&y.sub(d),d.props=v,d.state||(d.state={}),d.context=m,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&Nt(d.__s==d.state?d.__s=Nt({},d.__s):d.__s,b.getDerivedStateFromProps(v,d.__s)),u)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&r.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(v,m),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(v,d.__s,m)){for(d.props=v,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(v,d.__s,m)}for(p=d.props,_=d.state,d.context=m,d.props=v,d.state=d.__s,(h=At.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=Gt(null!=h&&h.type==Ft&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=Nt(Nt({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(p,_)),Xt(t,e,i,s,n,o,r,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,_,f),g&&(d.__E=d.__p=null)}else e.__e=function(t,e,i,s,n,o,r,a){var l,c,h,d,u=i.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=o)for(l=0;l<o.length;l++)if(null!=(c=o[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,o[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),o=null}return null===e.type?u!==p&&(null!=o&&(o[o.indexOf(t)]=null),t.data=p):e!==i&&(null!=o&&(o=Dt.slice.call(t.childNodes)),h=(u=i.props||Tt).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var o;for(o in i)o in e||Zt(t,o,null,i[o],s);for(o in e)n&&"function"!=typeof e[o]||"value"===o||"checked"===o||i[o]===e[o]||Zt(t,o,e[o],i[o],s)}(t,p,u,n,a),e.__k=e.props.children,d||Xt(t,e,i,s,"foreignObject"!==e.type&&n,o,r,Tt,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}(i.__e,e,i,s,n,o,r,c);(h=At.diffed)&&h(e)}catch(t){At.__e(t,e,i)}return e.__e}function te(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){At.__e(t,i.__v)}At.__c&&At.__c(e)}function ee(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){At.__e(t,i)}}function ie(t,e,i){var s,n,o;if(At.unmount&&At.unmount(t),(s=t.ref)&&ee(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){At.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(o=0;o<s.length;o++)s[o]&&ie(s[o],e,i);null!=n&&zt(n)}function se(t,e,i){return this.constructor(t,i)}function ne(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function oe(){return oe=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},oe.apply(this,arguments)}At={},jt.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=Nt({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&Nt(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),Vt(this))},jt.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,Vt(this))},jt.prototype.render=Ft,Mt=[],Lt="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Rt=At.debounceRendering,At.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return Vt(s.__E=s)}catch(e){t=e}throw t},Ot=Tt;var re="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ae="[\\s|\\(]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")\\s*\\)?",le="[\\s|\\(]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")[,|\\s]+("+re+")\\s*\\)?",ce=new RegExp("rgb"+ae),he=new RegExp("rgba"+le),de=new RegExp("hsl"+ae),ue=new RegExp("hsla"+le),pe="^(?:#?|0x?)",_e="([0-9a-fA-F]{1})",fe="([0-9a-fA-F]{2})",ge=new RegExp(pe+_e+_e+_e+"$"),ve=new RegExp(pe+_e+_e+_e+_e+"$"),ye=new RegExp(pe+fe+fe+fe+"$"),me=new RegExp(pe+fe+fe+fe+fe+"$"),be=Math.log,xe=Math.round,we=Math.floor;function $e(t,e,i){return Math.min(Math.max(t,e),i)}function Se(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function ke(t){return parseInt(t,16)}function Ie(t){return t.toString(16).padStart(2,"0")}var Pe=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=oe({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=oe({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=we(e),o=e-n,r=s*(1-i),a=s*(1-o*i),l=s*(1-(1-o)*i),c=n%6,h=[l,s,s,a,r,r][c],d=[r,r,l,s,s,a][c];return{r:$e(255*[s,a,r,r,l,s][c],0,255),g:$e(255*h,0,255),b:$e(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),r=n-o,a=0,l=n,c=0===n?0:r/n;switch(n){case o:a=0;break;case e:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-e)/r+2;break;case s:a=(e-i)/r+4}return{h:60*a%360,s:$e(100*c,0,100),v:$e(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,o=n<1e-9?0:e*i/n;return{h:t.h,s:$e(100*o,0,100),l:$e(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:$e(100*s,0,100),v:$e((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*be(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*be(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*be(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*be(i),s=255),{r:$e(we(e),0,255),g:$e(we(i),0,255),b:$e(we(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,o=2e3,r=4e4;r-o>.4;){i=.5*(r+o);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?r=i:o=i}return i},ne(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=oe({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return oe({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=oe({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=oe({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=oe({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=oe({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:xe(i),g:xe(s),b:xe(n)}},set:function(e){this.hsv=oe({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return oe({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:xe(i),s:xe(s),l:xe(n)}},set:function(e){this.hsv=oe({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return oe({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,o=1;if((e=ce.exec(t))?(i=Se(e[1],255),s=Se(e[2],255),n=Se(e[3],255)):(e=he.exec(t))&&(i=Se(e[1],255),s=Se(e[2],255),n=Se(e[3],255),o=Se(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:o}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+Ie(t.r)+Ie(t.g)+Ie(t.b)},set:function(t){var e,i,s,n,o=255;if((e=ge.exec(t))?(i=17*ke(e[1]),s=17*ke(e[2]),n=17*ke(e[3])):(e=ve.exec(t))?(i=17*ke(e[1]),s=17*ke(e[2]),n=17*ke(e[3]),o=17*ke(e[4])):(e=ye.exec(t))?(i=ke(e[1]),s=ke(e[2]),n=ke(e[3])):(e=me.exec(t))&&(i=ke(e[1]),s=ke(e[2]),n=ke(e[3]),o=ke(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:o/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+Ie(t.r)+Ie(t.g)+Ie(t.b)+Ie(we(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,o=1;if((e=de.exec(t))?(i=Se(e[1],360),s=Se(e[2],100),n=Se(e[3],100)):(e=ue.exec(t))&&(i=Se(e[1],360),s=Se(e[2],100),n=Se(e[3],100),o=Se(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:o}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function Ee(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,o=t.handleRadius,r=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*r+2*o,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*r-2*o,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Ce(t,e){var i=Ee(t),s=i.width,n=i.height,o=i.handleRange,r=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,o=t.maxTemperature-n,r=(e.kelvin-n)/o*100;return Math.max(0,Math.min(r,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:n/2,h=r+l/100*o;return a&&(h=-1*h+o+2*r),{x:a?c:h,y:a?h:c}}var Ae,Me=2*Math.PI,Le=function(t,e){return Math.sqrt(t*t+e*e)};function Re(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Oe(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Te(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function De(t,e,i){var s=Oe(t),n=s.cx,o=s.cy,r=Re(t);e=n-e,i=o-i;var a=Te(t,Math.atan2(-i,-e)*(360/Me)),l=Math.min(Le(e,i),r);return{h:Math.round(a),s:Math.round(100/r*l)}}function Ue(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function Ne(t,e,i){var s=Ue(t),n=s.width,o=s.height,r=s.radius,a=(e-r)/(n-2*r)*100,l=(i-r)/(o-2*r)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function ze(t){Ae||(Ae=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Ae.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function We(t,e,i,s){for(var n=0;n<s.length;n++){var o=s[n].x-e,r=s[n].y-i;if(Math.sqrt(o*o+r*r)<t.handleRadius)return n}return null}function He(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function Fe(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function je(t){return"string"==typeof t?t:t+"px"}var Be=["mousemove","touchmove","mouseup","touchend"],qe=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,o={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(o[s?"marginLeft":"marginTop"]=n),Wt(Ft,null,t.children(this.uid,i,o))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,o=n.clientX-s.left,r=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(o,r,0)&&Be.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(o,r,1);break;case"mouseup":case"touchend":i(o,r,2),Be.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(jt);function Ve(t){var e=t.r,i=t.url,s=e,n=e;return Wt("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+je(t.x)+", "+je(t.y)+")",willChange:"transform",top:je(-e),left:je(-e),width:je(2*e),height:je(2*e),position:"absolute",overflow:"visible"}},i&&Wt("use",Object.assign({xlinkHref:ze(i)},t.props)),!i&&Wt("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Wt("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Ye(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=Ee(t),n=s.width,o=s.height,r=s.radius,a=Ce(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],o=t.minTemperature,r=t.maxTemperature,a=r-o,l=o,c=0;l<r;l+=a/8,c+=1){var h=Pe.kelvinToRgb(l),d=h.r,u=h.g,p=h.b;n.push([12.5*c,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var _=Pe.hsvToHsl({h:i.h,s:0,v:i.v}),f=Pe.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var g=Pe.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]]}}(t,i);return Wt(qe,Object.assign({},t,{onInput:function(e,s,n){var o=function(t,e,i){var s,n=Ee(t),o=n.handleRange,r=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+o+r:e-r,s=Math.max(Math.min(s,o),0);var a=Math.round(100/o*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=o,t.onInput(n,t.id)}}),function(e,s,c){return Wt("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:je(n),height:je(o),borderRadius:je(r),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Wt("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:je(r),background:Fe("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},He(t))}),Wt(Ve,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Xe(t){var e=Ue(t),i=e.width,s=e.height,n=e.radius,o=t.colors,r=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=o.map(function(e){return function(t,e){var i=Ue(t),s=i.width,n=i.height,o=i.radius,r=e.hsv,a=o,l=s-2*o,c=n-2*o;return{x:a+r.s/100*l,y:a+(c-r.v/100*c)}}(t,e)});return Wt(qe,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=We(t,e,i,h);null!==n?r.setActiveColor(n):(r.inputActive=!0,l.hsv=Ne(t,e,i),t.onInput(s,t.id))}else 1===s&&(r.inputActive=!0,l.hsv=Ne(t,e,i));t.onInput(s,t.id)}}),function(e,r,a){return Wt("div",Object.assign({},r,{className:"IroBox",style:Object.assign({},{width:je(i),height:je(s),position:"relative"},a)}),Wt("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:je(n)},He(t),{background:Fe("linear","to bottom",c[1])+","+Fe("linear","to right",c[0])})}),o.filter(function(t){return t!==l}).map(function(e){return Wt(Ve,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Wt(Ve,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}Ve.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Ye.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Ge(t){var e=Oe(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,o=n.hsv,r=i.map(function(e){return function(t,e){var i=e.hsv,s=Oe(t),n=s.cx,o=s.cy,r=Re(t),a=(180+Te(t,i.h,!0))*(Me/360),l=i.s/100*r,c="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:o+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Wt(qe,Object.assign({},t,{onInput:function(e,i,o){if(0===o){if(!function(t,e,i){var s=Oe(t),n=s.cx,o=s.cy,r=t.width/2;return Le(n-e,o-i)<r}(t,e,i))return!1;var a=We(t,e,i,r);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=De(t,e,i),t.onInput(o,t.id))}else 1===o&&(s.inputActive=!0,n.hsv=De(t,e,i));t.onInput(o,t.id)}}),function(s,l,c){return Wt("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:je(e),height:je(e),position:"relative"},c)}),Wt("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Wt("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Wt("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-o.v/100})}),Wt("div",{className:"IroWheelBorder",style:Object.assign({},a,He(t))}),i.filter(function(t){return t!==n}).map(function(e){return Wt(Ve,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[e.index].x,y:r[e.index].y})}),Wt(Ve,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[n.index].x,y:r[n.index].y}))})}var Ke=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Pe(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Ge},{component:Ye}],e.transparency&&s.push({component:Ye,options:{sliderType:"alpha"}})),Wt("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,o=t.options;return Wt(n,Object.assign({},e,o,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(jt);Ke.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Ze,Je,Qe,ti=(Je=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,o;At.__p&&At.__p(t,e),n=(s=i===Ot)?null:e.__k,t=Wt(Ft,null,[t]),o=[],Qt(e,e.__k=t,n||Tt,Tt,void 0!==e.ownerSVGElement,n?null:Dt.slice.call(e.childNodes),o,!1,Tt,s),te(o,t)}(Wt(Ze,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},Je.prototype=(Ze=Ke).prototype,Object.assign(Je,Ze),Je.__component=Ze,Je);!function(t){var e;t.version="5.5.2",t.Color=Pe,t.ColorPicker=ti,(e=t.ui||(t.ui={})).h=Wt,e.ComponentBase=qe,e.Handle=Ve,e.Slider=Ye,e.Wheel=Ge,e.Box=Xe}(Qe||(Qe={}));var ei=Qe;let ii=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this._suppress=!1}updated(){this._host&&!this._picker&&(this._picker=ei.ColorPicker(this._host,{width:140,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"var(--divider-color, #444)",layout:[{component:ei.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}willUpdate(){this._picker&&this._syncPicker()}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}render(){return j`
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
    `}static{this.styles=[...gt,r`
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
    `]}};t([ht({type:Array})],ii.prototype,"rgb",void 0),t([ht({type:Number})],ii.prototype,"white",void 0),t([ht({type:Number})],ii.prototype,"awm",void 0),t([ht({type:Boolean})],ii.prototype,"showWhite",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".wheel-host")],ii.prototype,"_host",void 0),ii=t([ut("wled-color-wheel-rgbw")],ii);let si=class extends vt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e;return j`
      <button
        class="tile"
        type="button"
        aria-label=${this.label||`Effect ${this.fxId}`}
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
            />`:j`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...gt,r`
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
    `]}};t([ht({type:Number})],si.prototype,"fxId",void 0),t([ht()],si.prototype,"thumbUrl",void 0),t([ht()],si.prototype,"thumbUrlAnimated",void 0),t([ht()],si.prototype,"label",void 0),t([dt()],si.prototype,"_hover",void 0),si=t([ut("wled-effect-tile")],si);let ni=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId=""}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=t?e.filter(e=>e.toLowerCase().includes(t)):e.slice(0,48);return j`
      <div class="strip" role="listbox" aria-label="Effects">
        ${i.map(t=>{const e=this.effectsByName[t],i=this.soundFlags[e],s=e===this.selectedFx,n=void this.controllerId;return n?j`
              <wled-effect-tile
                class="chip-tile ${s?"active":""}"
                role="option"
                aria-selected=${s}
                .fxId=${e}
                .thumbUrl=${n}
                .label=${t+("v"===i?" ♪":"")+("f"===i?" ♫":"")+("2"===i?" 2D":"")}
                @click=${()=>this._pick(e)}
              ></wled-effect-tile>
            `:j`
            <button
              class="chip ${s?"active":""}"
              role="option"
              aria-selected=${s}
              @click=${()=>this._pick(e)}
            >
              ${t}
              ${"v"===i?j`<span class="badge" title="Volume reactive">♪</span>`:null}
              ${"f"===i?j`<span class="badge" title="Frequency reactive">♫</span>`:null}
              ${"2"===i?j`<span class="badge dim" title="2D only">2D</span>`:null}
            </button>
          `})}
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t},bubbles:!0,composed:!0}))}static{this.styles=[...gt,r`
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
      .chip-tile {
        flex: 0 0 auto;
      }
      .chip-tile.active .tile {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    `]}};t([ht({type:Object})],ni.prototype,"effectsByName",void 0),t([ht({type:Array})],ni.prototype,"soundFlags",void 0),t([ht({type:Number})],ni.prototype,"selectedFx",void 0),t([ht({type:String})],ni.prototype,"filter",void 0),t([ht()],ni.prototype,"controllerId",void 0),ni=t([ut("wled-effect-chips")],ni);let oi=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return j`
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
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...gt,r`
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
    `]}};t([ht({type:Array})],oi.prototype,"presets",void 0),oi=t([ut("wled-preset-bar")],oi);const ri={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ai=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.selectedSegId=-1,this._loading=!0,this._error="",this._segId=0,this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast=""}onPoweredConnect(){this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=Ct(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){this._selectSeg(t),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await xt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id)}await this._refreshMeta(),await this._loadPresets()}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await async function(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=It(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=$t(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_patchSeg(t){const e=this._activeSeg();if(!e||!this._optimistic)return;const i={...e,...t,id:e.id,sel:!0,on:void 0!==t.on?t.on:!1!==e.on},s=this._segments.findIndex(t=>t.id===e.id);if(s>=0){const t=[...this._segments];t[s]=i,this._segments=t}this._syncHaSegment(e,t),this._optimistic.push(Pt(e.id,t,this._segments),i)}_selectSeg(t){this._segId=t,this._colorSlot=0,this._refreshMeta(),this.connection&&this.controllerId&&wt(this.connection,this.controllerId,Pt(t,{sel:!0},this._segments));const e=this._segments.findIndex(e=>e.id===t);if(e>=0){const e=this._segments.map(e=>({...e,sel:e.id===t}));this._segments=e}}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push($t(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail,n=this._cols(e);n[this._colorSlot]=[i[0],i[1],i[2],s],this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]])})}_onAwm(t){this._patchSeg({awm:t.detail.awm})}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await wt(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return j`<p class="muted">Loading segments…</p>`;if(this._error)return j`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return j`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,n=s?.sliders??{},o=!1!==s?.colors_enabled?3:1;return j`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?j`<p class="toast" role="status">${this._toast}</p>`:null}
        <div class="seg-bar" role="tablist" aria-label="Segments">
          ${this._segments.map(t=>j`
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

        ${!this.compact&&this._presets.length?j`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${o>1?j`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,o).map((t,e)=>j`
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

        ${this.compact?null:j`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${t=>{this._effectFilter=t.target.value}}
              />
            `}

        <wled-effect-chips
          .controllerId=${this.controllerId}
          .effectsByName=${this._snapshot?.effects_by_name??{}}
          .soundFlags=${this._snapshot?.sound_flags??[]}
          .selectedFx=${t.fx??0}
          .filter=${this.compact?"":this._effectFilter}
          @effect-select=${this._onEffectSelect}
        ></wled-effect-chips>

        <div class="sliders">
          ${Object.entries(ri).map(([e,i])=>{if(!n[e])return null;const s=t[e];return j`
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
    `}_labelForSeg(t){const e=this._snapshot?.segment_entities??[],i=e.find(e=>It(t.id,[e])===e.entity_id)??e.find(e=>e.segment_index===t.id);return`${i?.name?.replace(/^.*\s—\s/,"")??`Seg ${t.id+1}`} (${t.start??"?"}–${t.stop??"?"})`}get segments(){return this._segments}static{this.styles=[...gt,r`
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
    `]}};async function li(t,e){return await bt(t),t.sendMessagePromise({...e,schema_version:1})}async function ci(t,e,i){return(await li(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}async function hi(t,e,i){return(await li(t,{type:"wled_studio/layout_save",controller_id:e,layout:i})).layout??i}async function di(t,e,i,s){return(await li(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}t([ht({attribute:!1})],ai.prototype,"connection",void 0),t([ht({attribute:!1})],ai.prototype,"hass",void 0),t([ht()],ai.prototype,"controllerId",void 0),t([ht({type:Boolean})],ai.prototype,"compact",void 0),t([ht({type:Number})],ai.prototype,"selectedSegId",void 0),t([dt()],ai.prototype,"_loading",void 0),t([dt()],ai.prototype,"_error",void 0),t([dt()],ai.prototype,"_segId",void 0),t([dt()],ai.prototype,"_segments",void 0),t([dt()],ai.prototype,"_snapshot",void 0),t([dt()],ai.prototype,"_meta",void 0),t([dt()],ai.prototype,"_effectFilter",void 0),t([dt()],ai.prototype,"_presets",void 0),t([dt()],ai.prototype,"_colorSlot",void 0),t([dt()],ai.prototype,"_toast",void 0),ai=t([ut("wled-segment-controls")],ai);async function ui(t,e,i){const s=await async function(t){const e=await createImageBitmap(t),i=Math.min(1,2048/Math.max(e.width,e.height)),s=Math.max(1,Math.round(e.width*i)),n=Math.max(1,Math.round(e.height*i)),o=document.createElement("canvas");o.width=s,o.height=n;const r=o.getContext("2d");if(!r)throw new Error("Canvas unavailable");return r.drawImage(e,0,0,s,n),e.close(),new Promise((e,i)=>{o.toBlob(t=>t?e(t):i(new Error("Encode failed")),t.type.startsWith("image/png")?"image/png":"image/jpeg",.88)})}(i),n="image/png"===s.type?"png":"jpg",o=new FormData;o.append("file",new File([s],`background.${n}`,{type:s.type}));const r=await fetch(`/api/wled_studio/layout_bg/${encodeURIComponent(t)}/${encodeURIComponent(e)}`,{method:"POST",body:o,credentials:"same-origin"});if(!r.ok){const t=await r.text();throw new Error(t||`Upload failed (${r.status})`)}return await r.json()}function pi(t,e,i){const{segLens:s,total:n}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const n=t.length,o=e?n:n-1;for(let e=0;e<o;e++){const o=(e+1)%n,r=Math.hypot(t[o].x-t[e].x,t[o].y-t[e].y);i.push(r),s+=r}return{segLens:i,total:s}}(t,e);if(n<=0||0===t.length)return[0,0];let o=i%1*n;o<0&&(o+=n);const r=t.length,a=e?r:r-1;let l=0;for(let e=0;e<a;e++){const i=s[e]??0;if(i>0&&l+i>=o){const s=(o-l)/i,n=(e+1)%r;return[t[e].x+s*(t[n].x-t[e].x),t[e].y+s*(t[n].y-t[e].y)]}l+=i}return[t[t.length-1].x,t[t.length-1].y]}function _i(t,e,i){const s=[...new Set(e.filter(t=>t>=0))].sort((t,e)=>t-e);if(0===s.length)return t;let n=t.length>=2?t.map(t=>({...t,anchorLed:null})):[{x:0,y:0,anchorLed:null},{x:100,y:0,anchorLed:null},{x:100,y:80,anchorLed:null},{x:0,y:80,anchorLed:null}];n.length!==s.length&&(n=function(t,e,i){if(e<2)return t;const s=[];for(let n=0;n<e;n++){const o=1===e?0:n/(e-1),[r,a]=pi(t,i,o);s.push({x:r,y:a,anchorLed:null})}return s}(n,s.length,i));for(let t=0;t<s.length;t++)n[t]={...n[t],anchorLed:s[t]};return n}const fi={opacity:.55,brightness:1,saturation:1,rotation:0,offsetX:0,offsetY:0,scale:1,cropX:0,cropY:0,cropW:1,cropH:1};function gi(t,e){return t?{url:t,opacity:e?.opacity??fi.opacity,brightness:e?.brightness??fi.brightness,saturation:e?.saturation??fi.saturation,rotation:e?.rotation??fi.rotation,offsetX:e?.offsetX??fi.offsetX,offsetY:e?.offsetY??fi.offsetY,scale:e?.scale??fi.scale,cropX:e?.cropX??fi.cropX,cropY:e?.cropY??fi.cropY,cropW:e?.cropW??fi.cropW,cropH:e?.cropH??fi.cropH}:null}function vi(t){return gi(t.background?.url??t.background_url,t.background??null)}function yi(t,e,i,s,n){const o=n.opacity??fi.opacity,r=n.brightness??1,a=n.saturation??1,l=(n.rotation??0)*Math.PI/180,c=(n.offsetX??0)*e,h=(n.offsetY??0)*i,d=n.scale??1,u=n.cropX??0,p=n.cropY??0,_=n.cropW??1,f=n.cropH??1,g=s.naturalWidth*_,v=s.naturalHeight*f,y=s.naturalWidth*u,m=s.naturalHeight*p,b=Math.max(e/g,i/v)*d,x=g*b,w=v*b;t.save(),t.globalAlpha=o,t.filter=`brightness(${r}) saturate(${a})`,t.translate(e/2+c,i/2+h),t.rotate(l),t.drawImage(s,y,m,g,v,-x/2,-w/2,x,w),t.restore()}let mi=class extends vt{constructor(){super(...arguments),this.open=!1,this._img=null,this._layer=null,this._cropDrag=null,this._cropStart={x:0,y:0,cx:0,cy:0,cw:1,ch:1},this._onDown=t=>{if(!this._layer)return;const[e,i]=this._normFromEvent(t),s=this._hitCropHandle(e,i);s&&(this._cropDrag=s,this._cropStart={x:e,y:i,cx:this._layer.cropX??0,cy:this._layer.cropY??0,cw:this._layer.cropW??1,ch:this._layer.cropH??1},this._canvas?.setPointerCapture(t.pointerId))},this._onMove=t=>{if(!this._cropDrag||!this._layer)return;const[e,i]=this._normFromEvent(t),s=e-this._cropStart.x,n=i-this._cropStart.y,o=this._cropStart;let r=o.cx,a=o.cy,l=o.cw,c=o.ch;if("move"===this._cropDrag)r=Math.max(0,Math.min(1-l,o.cx+s)),a=Math.max(0,Math.min(1-c,o.cy+n));else if("nw"===this._cropDrag){const t=o.cx+o.cw,e=o.cy+o.ch;r=Math.max(0,Math.min(t-.05,o.cx+s)),a=Math.max(0,Math.min(e-.05,o.cy+n)),l=t-r,c=e-a}else"se"===this._cropDrag&&(l=Math.max(.05,Math.min(1-o.cx,o.cw+s)),c=Math.max(.05,Math.min(1-o.cy,o.ch+n)));this._layer={...this._layer,cropX:r,cropY:a,cropW:l,cropH:c},this._paint()},this._onUp=t=>{this._cropDrag=null,this._canvas?.releasePointerCapture(t.pointerId)}}async openWithFile(t){this._file=t;const e=URL.createObjectURL(t),i=new Image;await new Promise((t,s)=>{i.onload=()=>t(),i.onerror=()=>s(new Error("Could not load image")),i.src=e}),this._img=i,this._layer=gi(e,fi),this.open=!0,await this.updateComplete,this._paint()}updated(t){super.updated(t),t.has("open")&&this.open&&requestAnimationFrame(()=>this._paint())}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._canvas.addEventListener("pointerdown",this._onDown),this._canvas.addEventListener("pointermove",this._onMove),this._canvas.addEventListener("pointerup",this._onUp))}_canvasRect(){return this._canvas.getBoundingClientRect()}_normFromEvent(t){const e=this._canvasRect();return[(t.clientX-e.left)/e.width,(t.clientY-e.top)/e.height]}_hitCropHandle(t,e){const i=this._layer;if(!i)return null;const s=i.cropX??0,n=i.cropY??0,o=i.cropW??1,r=i.cropH??1;return Math.hypot(t-s,e-n)<.04?"nw":Math.hypot(t-(s+o),e-(n+r))<.04?"se":t>=s&&t<=s+o&&e>=n&&e<=n+r?"move":null}_paint(){const t=this._canvas,e=t?.getContext("2d"),i=this._img,s=this._layer;if(!(t&&e&&i&&s))return;const n=t.parentElement?.getBoundingClientRect(),o=Math.max(320,Math.floor((n?.width??640)*(window.devicePixelRatio||1))),r=Math.max(240,Math.floor((n?.height??400)*(window.devicePixelRatio||1)));t.width===o&&t.height===r||(t.width=o,t.height=r),e.fillStyle="#0f172a",e.fillRect(0,0,o,r),yi(e,o,r,i,s);const a=(s.cropX??0)*o,l=(s.cropY??0)*r,c=(s.cropW??1)*o,h=(s.cropH??1)*r;e.fillStyle="rgba(0,0,0,0.55)",e.fillRect(0,0,o,l),e.fillRect(0,l+h,o,r-l-h),e.fillRect(0,l,a,h),e.fillRect(a+c,l,o-a-c,h),e.strokeStyle="#38bdf8",e.lineWidth=2,e.strokeRect(a,l,c,h);const d=10;e.fillStyle="#38bdf8",e.fillRect(a-5,l-5,d,d),e.fillRect(a+c-5,l+h-5,d,d)}_resetCrop(){this._layer&&(this._layer={...this._layer,cropX:0,cropY:0,cropW:1,cropH:1},this._paint())}_cancel(){this.open=!1,this._img=null,this._layer=null,this._file=void 0}async _apply(){if(this._img&&this._layer)try{const t=await async function(t,e,i=2048){const s=e.cropX??0,n=e.cropY??0,o=e.cropW??1,r=e.cropH??1,a=Math.max(1,Math.floor(t.naturalWidth*o)),l=Math.max(1,Math.floor(t.naturalHeight*r)),c=Math.floor(t.naturalWidth*s),h=Math.floor(t.naturalHeight*n),d=Math.min(1,i/Math.max(a,l)),u=Math.max(1,Math.floor(a*d)),p=Math.max(1,Math.floor(l*d)),_=document.createElement("canvas");_.width=u,_.height=p;const f=_.getContext("2d");if(!f)throw new Error("Canvas unavailable");const g=e.brightness??1,v=e.saturation??1,y=(e.rotation??0)*Math.PI/180;return f.filter=`brightness(${g}) saturate(${v})`,f.translate(u/2,p/2),f.rotate(y),f.drawImage(t,c,h,a,l,-u/2,-p/2,u,p),new Promise((t,e)=>{_.toBlob(i=>i?t(i):e(new Error("Encode failed")),"image/jpeg",.9)})}(this._img,this._layer),e=new File([t],this._file?.name?.replace(/\.\w+$/,"")+".jpg"||"floorplan.jpg",{type:"image/jpeg"});this.dispatchEvent(new CustomEvent("photo-apply",{detail:{file:e,layer:this._layer},bubbles:!0,composed:!0})),this._cancel()}catch(t){this.dispatchEvent(new CustomEvent("photo-error",{detail:{message:t instanceof Error?t.message:String(t)},bubbles:!0,composed:!0}))}}render(){if(!this.open)return j``;const t=this._layer;return j`
      <div class="overlay" role="dialog" aria-label="Edit floorplan photo">
        <div class="panel">
          <header>
            <h2>Photo overlay</h2>
            <button class="icon" @click=${this._cancel} aria-label="Close">✕</button>
          </header>
          <p class="hint">Crop the room photo, tune brightness, then apply. Draw your LED path on top in the designer.</p>
          <div class="preview-wrap">
            <canvas></canvas>
          </div>
          ${t?j`
                <div class="sliders">
                  <label
                    >Opacity
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      .value=${String(t.opacity??.55)}
                      @input=${e=>{this._layer={...t,opacity:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Brightness
                    <input
                      type="range"
                      min="0.4"
                      max="1.8"
                      step="0.05"
                      .value=${String(t.brightness??1)}
                      @input=${e=>{this._layer={...t,brightness:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Saturation
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.05"
                      .value=${String(t.saturation??1)}
                      @input=${e=>{this._layer={...t,saturation:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                  <label
                    >Rotation (°)
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      .value=${String(t.rotation??0)}
                      @input=${e=>{this._layer={...t,rotation:parseFloat(e.target.value)},this._paint()}}
                    />
                  </label>
                </div>
              `:null}
          <div class="actions">
            <button class="secondary" @click=${this._resetCrop}>Reset crop</button>
            <button class="secondary" @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${()=>this._apply()}>Use photo</button>
          </div>
        </div>
      </div>
    `}static{this.styles=[...gt,r`
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.72);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }
      .panel {
        background: var(--card-background-color, #1e293b);
        border-radius: 12px;
        max-width: 720px;
        width: 100%;
        max-height: 95vh;
        overflow: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
      }
      .hint {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .preview-wrap {
        height: min(50vh, 360px);
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .sliders input[type="range"] {
        width: 100%;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .primary,
      .secondary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .secondary {
        background: var(--card-background-color, #334155);
        color: inherit;
        border: 1px solid var(--divider-color, #475569);
      }
    `]}};t([ht({type:Boolean})],mi.prototype,"open",void 0),t([dt()],mi.prototype,"_img",void 0),t([dt()],mi.prototype,"_layer",void 0),t([dt()],mi.prototype,"_cropDrag",void 0),t([dt()],mi.prototype,"_cropStart",void 0),mi=t([ut("wled-layout-photo-editor")],mi);const{PI:bi}=Math,xi=bi+1e-4,wi=[1,1];function $i(t,e,i,s=t=>t){return t*s(.5-e*(.5-i))}const{min:Si}=Math;function ki(t,e,i){let s=Si(1,e/i);return Si(1,t+(Si(1,1-s)-t)*(.275*s))}function Ii(t,e){return[t[0]+e[0],t[1]+e[1]]}function Pi(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function Ei(t,e){return[t[0]-e[0],t[1]-e[1]]}function Ci(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function Ai(t,e){return[t[0]*e,t[1]*e]}function Mi(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function Li(t){return[t[1],-t[0]]}function Ri(t,e){let i=e[0];return t[0]=e[1],t[1]=-i,t}function Oi(t,e){return t[0]*e[0]+t[1]*e[1]}function Ti(t,e){return t[0]===e[0]&&t[1]===e[1]}function Di(t,e){let i=t[0]-e[0],s=t[1]-e[1];return i*i+s*s}function Ui(t){return function(t,e){return[t[0]/e,t[1]/e]}(t,function(t){return Math.hypot(t[0],t[1])}(t))}function Ni(t,e){return Math.hypot(t[1]-e[1],t[0]-e[0])}function zi(t,e,i){let s=Math.sin(i),n=Math.cos(i),o=t[0]-e[0],r=t[1]-e[1],a=o*s+r*n;return[o*n-r*s+e[0],a+e[1]]}function Wi(t,e,i,s){let n=Math.sin(s),o=Math.cos(s),r=e[0]-i[0],a=e[1]-i[1],l=r*o-a*n,c=r*n+a*o;return t[0]=l+i[0],t[1]=c+i[1],t}function Hi(t,e,i){return Ii(t,Ai(Ei(e,t),i))}function Fi(t,e,i,s){let n=i[0]-e[0],o=i[1]-e[1];return t[0]=e[0]+n*s,t[1]=e[1]+o*s,t}function ji(t,e,i){return Ii(t,Ai(e,i))}const Bi=[0,0],qi=[0,0],Vi=[0,0];function Yi(t,e){let i=ji(t,Ui(Li(Ei(t,Ii(t,[1,1])))),-e),s=[],n=1/13;for(let e=n;e<=1;e+=n)s.push(zi(i,t,2*xi*e));return s}function Xi(t,e,i){let s=[],n=1/i;for(let i=n;i<=1;i+=n)s.push(zi(e,t,xi*i));return s}function Gi(t,e,i){let s=Ei(e,i),n=Ai(s,.5),o=Ai(s,.51);return[Ei(t,n),Ei(t,o),Ii(t,o),Ii(t,n)]}function Ki(t,e,i,s){let n=[],o=ji(t,e,i),r=1/s;for(let e=r;e<1;e+=r)n.push(zi(o,t,3*xi*e));return n}function Zi(t,e,i){return[Ii(t,Ai(e,i)),Ii(t,Ai(e,.99*i)),Ei(t,Ai(e,.99*i)),Ei(t,Ai(e,i))]}function Ji(t,e,i){return!1===t||void 0===t?0:!0===t?Math.max(e,i):t}function Qi(t,e={}){let{size:i=16,smoothing:s=.5,thinning:n=.5,simulatePressure:o=!0,easing:r=t=>t,start:a={},end:l={},last:c=!1}=e,{cap:h=!0,easing:d=t=>t*(2-t)}=a,{cap:u=!0,easing:p=t=>--t*t*t+1}=l;if(0===t.length||i<=0)return[];let _,f=t[t.length-1].runningLength,g=Ji(a.taper,i,f),v=Ji(l.taper,i,f),y=(i*s)**2,m=[],b=[],x=function(t,e,i){return t.slice(0,10).reduce((t,s)=>{let n=s.pressure;return e&&(n=ki(t,s.distance,i)),(t+n)/2},t[0].pressure)}(t,o,i),w=$i(i,n,t[t.length-1].pressure,r),$=t[0].vector,S=t[0].point,k=S,I=S,P=k,E=!1;for(let e=0;e<t.length;e++){let{pressure:s}=t[e],{point:a,vector:l,distance:c,runningLength:h}=t[e],u=e===t.length-1;if(!u&&f-h<3)continue;n?(o&&(s=ki(x,c,i)),w=$i(i,n,s,r)):w=i/2,void 0===_&&(_=w);let C=h<g?d(h/g):1,A=f-h<v?p((f-h)/v):1;w=Math.max(.01,w*Math.min(C,A));let M=(u?t[e]:t[e+1]).vector,L=u?1:Oi(l,M),R=null!==L&&L<0;if(Oi(l,$)<0&&!E||R){Ri(Bi,$),Mi(Bi,Bi,w);for(let t=0;t<=1;t+=.07692307692307693)Ci(qi,a,Bi),Wi(qi,qi,a,xi*t),I=[qi[0],qi[1]],m.push(I),Pi(Vi,a,Bi),Wi(Vi,Vi,a,xi*-t),P=[Vi[0],Vi[1]],b.push(P);S=I,k=P,R&&(E=!0)}else E=!1,u?(Ri(Bi,l),Mi(Bi,Bi,w),m.push(Ei(a,Bi)),b.push(Ii(a,Bi))):(Fi(Bi,M,l,L),Ri(Bi,Bi),Mi(Bi,Bi,w),Ci(qi,a,Bi),I=[qi[0],qi[1]],(e<=1||Di(S,I)>y)&&(m.push(I),S=I),Pi(Vi,a,Bi),P=[Vi[0],Vi[1]],(e<=1||Di(k,P)>y)&&(b.push(P),k=P),x=s,$=l)}let C=[t[0].point[0],t[0].point[1]],A=t.length>1?[t[t.length-1].point[0],t[t.length-1].point[1]]:Ii(t[0].point,[1,1]),M=[],L=[];if(1===t.length){if(!g&&!v||c)return Yi(C,_||w)}else{g||v&&1===t.length||(h?M.push(...Xi(C,b[0],13)):M.push(...Gi(C,m[0],b[0])));let e=Li(function(t){return[-t[0],-t[1]]}(t[t.length-1].vector));v||g&&1===t.length?L.push(A):u?L.push(...Ki(A,e,w,29)):L.push(...Zi(A,e,w))}return m.concat(L,b.reverse(),M)}const ts=[0,0];function es(t){return null!=t&&t>=0}function is(t,e={}){return Qi(function(t,e={}){let{streamline:i=.5,size:s=16,last:n=!1}=e;if(0===t.length)return[];let o=.15+.85*(1-i),r=Array.isArray(t[0])?t:t.map(({x:t,y:e,pressure:i=.5})=>[t,e,i]);if(2===r.length){let t=r[1];r=r.slice(0,-1);for(let e=1;e<5;e++)r.push(Hi(r[0],t,e/4))}1===r.length&&(r=[...r,[...Ii(r[0],wi),...r[0].slice(2)]]);let a=[{point:[r[0][0],r[0][1]],pressure:es(r[0][2])?r[0][2]:.25,vector:[...wi],distance:0,runningLength:0}],l=!1,c=0,h=a[0],d=r.length-1;for(let t=1;t<r.length;t++){let e=n&&t===d?[r[t][0],r[t][1]]:Hi(h.point,r[t],o);if(Ti(h.point,e))continue;let i=Ni(e,h.point);if(c+=i,t<d&&!l){if(c<s)continue;l=!0}Ci(ts,h.point,e),h={point:e,pressure:es(r[t][2])?r[t][2]:.5,vector:Ui(ts),distance:i,runningLength:c},a.push(h)}return a[0].vector=a[1]?.vector||[0,0],a}(t,e),e)}function ss(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ns,os={exports:{}};var rs,as=(ns||(ns=1,rs=os,function(){function t(t,e){var i=t.x-e.x,s=t.y-e.y;return i*i+s*s}function e(t,e,i){var s=e.x,n=e.y,o=i.x-s,r=i.y-n;if(0!==o||0!==r){var a=((t.x-s)*o+(t.y-n)*r)/(o*o+r*r);a>1?(s=i.x,n=i.y):a>0&&(s+=o*a,n+=r*a)}return(o=t.x-s)*o+(r=t.y-n)*r}function i(t,s,n,o,r){for(var a,l=o,c=s+1;c<n;c++){var h=e(t[c],t[s],t[n]);h>l&&(a=c,l=h)}l>o&&(a-s>1&&i(t,s,a,o,r),r.push(t[a]),n-a>1&&i(t,a,n,o,r))}function s(t,e){var s=t.length-1,n=[t[0]];return i(t,0,s,e,n),n.push(t[s]),n}function n(e,i,n){if(e.length<=2)return e;var o=void 0!==i?i*i:1;return e=n?e:function(e,i){for(var s,n=e[0],o=[n],r=1,a=e.length;r<a;r++)t(s=e[r],n)>i&&(o.push(s),n=s);return n!==s&&o.push(s),o}(e,o),e=s(e,o)}rs.exports=n,rs.exports.default=n}()),os.exports),ls=ss(as);function cs(t,e,i,s){const n=Math.min(t,i),o=Math.max(t,i),r=Math.min(e,s),a=Math.max(e,s);return{points:[[n,r],[o,r],[o,a],[n,a]],closed:!0,kind:"rect"}}function hs(t,e,i,s,n=48){const o=[];for(let r=0;r<n;r++){const a=r/n*Math.PI*2;o.push([t+Math.cos(a)*i,e+Math.sin(a)*s])}return{points:o,closed:!0,kind:"ellipse"}}function ds(t,e){return{points:[...t],closed:e,kind:"polyline"}}function us(t,e,i){const s=t.points;if(0===s.length)return{x:e,y:i,t:0,dist:1/0};if(1===s.length){const t=Math.hypot(e-s[0][0],i-s[0][1]);return{x:s[0][0],y:s[0][1],t:0,dist:t}}const{segLens:n,total:o}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const n=t.length,o=e?n:n-1;for(let e=0;e<o;e++){const o=(e+1)%n,r=Math.hypot(t[o][0]-t[e][0],t[o][1]-t[e][1]);i.push(r),s+=r}return{segLens:i,total:s}}(s,t.closed);if(o<=0)return{x:e,y:i,t:0,dist:1/0};let r=1/0,a=e,l=i,c=0,h=0;const d=s.length,u=t.closed?d:d-1;for(let t=0;t<u;t++){const u=(t+1)%d,p=s[t][0],_=s[t][1],f=s[u][0],g=s[u][1],v=n[t]??0;let y=0;v>0&&(y=Math.max(0,Math.min(1,((e-p)*(f-p)+(i-_)*(g-_))/(v*v))));const m=p+y*(f-p),b=_+y*(g-_),x=Math.hypot(e-m,i-b);x<r&&(r=x,a=m,l=b,c=(h+y*v)/o),h+=v}return{x:a,y:l,t:c,dist:r}}function ps(t,e,i){if(!i||i.points.length<2)return;t.save(),t.strokeStyle="rgba(168,85,247,0.75)",t.lineWidth=3,t.lineJoin="round",t.lineCap="round",t.setLineDash([8,6]),t.beginPath();const[s,n]=e(i.points[0][0],i.points[0][1]);t.moveTo(s,n);for(let s=1;s<i.points.length;s++){const[n,o]=e(i.points[s][0],i.points[s][1]);t.lineTo(n,o)}i.closed&&t.closePath(),t.stroke(),t.setLineDash([]),t.restore()}const _s=/([MLHVCSQTAZmlhvcsqtaz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;function fs(t,e=400){const i=function(t){const e=[];let i;for(_s.lastIndex=0;null!==(i=_s.exec(t));)i[1]?e.push(i[1]):i[2]&&e.push(parseFloat(i[2]));return e}(t.trim()),s=[];let n=0,o=0,r=0,a=0,l=0,c="";const h=()=>{const t=i[n++];return"number"==typeof t?t:0},d=(t,e)=>{o=t,r=e,s.push([o,r])},u=(t,e,i,s,n=12)=>{const a=o,l=r;for(let o=1;o<=n;o++){const r=o/n,c=1-r;d(c*c*a+2*c*r*t+r*r*i,c*c*l+2*c*r*e+r*r*s)}},p=(t,e,i,s,n,a,l=16)=>{const c=o,h=r;for(let o=1;o<=l;o++){const r=o/l,u=1-r;d(u*u*u*c+3*u*u*r*t+3*u*r*r*i+r*r*r*n,u*u*u*h+3*u*u*r*e+3*u*r*r*s+r*r*r*a)}};for(;n<i.length;){const t=i[n];"string"==typeof t&&(c=t,n++);const e=c===c.toLowerCase()&&"Z"!==c&&"z"!==c,_=c.toUpperCase();if("M"===_){const t=h()+(e?o:0),c=h()+(e?r:0);for(o=t,r=c,a=t,l=c,s.push([o,r]);n<i.length&&"number"==typeof i[n];){const t=h()+(e?o:0),i=h()+(e?r:0);d(t,i)}}else if("L"===_)for(;n<i.length&&"number"==typeof i[n];){const t=h()+(e?o:0),i=h()+(e?r:0);d(t,i)}else if("H"===_)for(;n<i.length&&"number"==typeof i[n];){const t=h()+(e?o:0);d(t,r)}else if("V"===_)for(;n<i.length&&"number"==typeof i[n];){const t=h()+(e?r:0);d(o,t)}else if("Q"===_)for(;n<i.length&&"number"==typeof i[n];){u(h()+(e?o:0),h()+(e?r:0),h()+(e?o:0),h()+(e?r:0))}else if("C"===_)for(;n<i.length&&"number"==typeof i[n];){p(h()+(e?o:0),h()+(e?r:0),h()+(e?o:0),h()+(e?r:0),h()+(e?o:0),h()+(e?r:0))}else"Z"===_&&(s.length>0&&d(a,l),o=a,r=l)}if(s.length>e){const t=s.length/e,i=[];for(let n=0;n<e;n++)i.push(s[Math.floor(n*t)]);return i}return s}function gs(t,e=200){if(0===t.length)return t;let i=1/0,s=-1/0,n=1/0,o=-1/0;for(const[e,r]of t)e<i&&(i=e),e>s&&(s=e),r<n&&(n=r),r>o&&(o=r);const r=s-i||1,a=o-n||1,l=e/Math.max(r,a);return t.map(([t,e])=>[(t-i)*l,(e-n)*l])}const vs="#6366f1";function ys(t,e,i){return t+(e-t)*i}let ms=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput="",this._status="",this._busy=!1,this._closed=!1,this._tool="select",this._guide=null,this._backgroundUrl=null,this._bgLayer=null,this._scalePxPerM=null,this._calibActive=!1,this._calibMeters="1",this._calibPts=[],this._penStroke=[],this._shapeStart=null,this._lineStart=null,this._polylinePts=[],this._bgImage=null,this._photoPan=null,this._drag=null,this._viewOx=0,this._viewOy=0,this._viewScale=1,this._onWheel=t=>{if("photo"!==this._tool||!this._bgLayer)return;t.preventDefault();const e=t.deltaY>0?-.04:.04,i=Math.max(.25,Math.min(4,(this._bgLayer.scale??1)+e));this._bgLayer={...this._bgLayer,scale:i},this._paint()},this._onPointerDown=t=>{t.preventDefault();const[e,i]=this._canvasXY(t),[s,n]=this._canvasToModel(e,i);if(this._calibActive)return this._calibPts.push([s,n]),this._calibPts.length>=2&&this._applyCalibration(),void this._paint();if("photo"===this._tool&&this._bgLayer)return this._photoPan={px:e,py:i,ox:this._bgLayer.offsetX??0,oy:this._bgLayer.offsetY??0},void this._canvas?.setPointerCapture(t.pointerId);if("place"===this._tool){const t=this._hitVertex(e,i);return t>=0?(this._selectedVtx=t,this._anchorInput=String(this._vertices[t].anchorLed??"")):this._placeVertexOnGuide(s,n),void this._paint()}if("pen"===this._tool)return this._penStroke=[[e,i]],this._canvas?.setPointerCapture(t.pointerId),void this._paint();if("line"===this._tool)return this._lineStart?(this._guide=function(t,e){return{points:[t,e],closed:!1,kind:"line"}}(this._lineStart,[s,n]),this._lineStart=null,this._status="Line guide ready — switch to Place vertices"):(this._lineStart=[s,n],this._status="Line: click end point"),void this._paint();if("rect"===this._tool||"ellipse"===this._tool)return this._shapeStart=[s,n],void this._canvas?.setPointerCapture(t.pointerId);if("polyline"===this._tool)return this._polylinePts=[...this._polylinePts,[s,n]],this._status=`Polyline: ${this._polylinePts.length} pts — double-click to finish`,void this._paint();const o=this._hitVertex(e,i);o>=0?(this._selectedVtx=o,this._anchorInput=String(this._vertices[o].anchorLed??""),this._drag={idx:o,ox:e,oy:i},this._canvas?.setPointerCapture(t.pointerId)):this._selectedVtx=-1,this._paint()},this._onPointerMove=t=>{const[e,i]=this._canvasXY(t);if(this._photoPan&&this._bgLayer){const t=this._canvas,s=(e-this._photoPan.px)/t.width,n=(i-this._photoPan.py)/t.height;return this._bgLayer={...this._bgLayer,offsetX:this._photoPan.ox+s,offsetY:this._photoPan.oy+n},void this._paint()}if("pen"===this._tool&&this._penStroke.length>0){const t=this._penStroke[this._penStroke.length-1];return void(Math.hypot(e-t[0],i-t[1])>2&&(this._penStroke=[...this._penStroke,[e,i]],this._paint()))}if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const[t,s]=this._canvasToModel(e,i),[n,o]=this._shapeStart;if("rect"===this._tool){const e=cs(n,o,t,s);this._paint(e)}else{const e=hs((n+t)/2,(o+s)/2,Math.abs(t-n)/2,Math.abs(s-o)/2);this._paint(e)}return}if(!this._drag)return;const[s,n]=this._canvasToModel(e,i),o=[...this._vertices];o[this._drag.idx]={...o[this._drag.idx],x:s,y:n},this._vertices=o,this._paint()},this._onPointerUp=t=>{if(this._photoPan)return this._canvas?.releasePointerCapture(t.pointerId),void(this._photoPan=null);if("pen"===this._tool&&this._penStroke.length>0)return this._canvas?.releasePointerCapture(t.pointerId),void this._finishPenGuide();if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const[e,i]=this._canvasXY(t),[s,n]=this._canvasToModel(e,i),[o,r]=this._shapeStart;return this._guide="rect"===this._tool?cs(o,r,s,n):hs((o+s)/2,(r+n)/2,Math.abs(s-o)/2,Math.abs(n-r)/2),this._shapeStart=null,this._status="Shape guide ready — switch to Place vertices",this._canvas?.releasePointerCapture(t.pointerId),void this._paint()}this._drag&&(this._canvas?.releasePointerCapture(t.pointerId),this._drag=null,this._refreshPositions())},this._onDblClick=t=>{if("polyline"===this._tool)return t.preventDefault(),void this._finishPolyline();if("select"!==this._tool)return;const[e,i]=this._pointerCanvasXY(t.clientX,t.clientY);if(this._hitVertex(e,i)>=0)return;const[s,n]=this._canvasToModel(e,i);this._vertices=[...this._vertices,{x:s,y:n,anchorLed:null}],this._selectedVtx=this._vertices.length-1,this._anchorInput="",this._paint(),this._refreshPositions()},this._onContextMenu=t=>{t.preventDefault();const[e,i]=this._pointerCanvasXY(t.clientX,t.clientY),s=this._hitVertex(e,i);s<0||(this._vertices=this._vertices.filter((t,e)=>e!==s),this._selectedVtx===s?this._selectedVtx=-1:this._selectedVtx>s&&this._selectedVtx--,this._paint(),this._refreshPositions())}}onPoweredConnect(){this._loadLayout()}firstUpdated(){this._canvasWrap=this.renderRoot.querySelector(".canvas-wrap")??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._canvasWrap&&this._resizeObs.observe(this._canvasWrap),this._bindCanvas(),this._onResize()}updated(t){super.updated(t),this._bindCanvas(),(t.has("connection")||t.has("layoutId")||t.has("fixtureId"))&&this._loadLayout()}_bindCanvas(){const t=this.renderRoot.querySelector("canvas")??void 0;t&&t!==this._boundCanvas&&(this._unbindCanvas(),this._canvas=t,this._boundCanvas=t,this._ctx=t.getContext("2d",{alpha:!0})??void 0,t.addEventListener("pointerdown",this._onPointerDown),t.addEventListener("pointermove",this._onPointerMove),t.addEventListener("pointerup",this._onPointerUp),t.addEventListener("pointercancel",this._onPointerUp),t.addEventListener("dblclick",this._onDblClick),t.addEventListener("contextmenu",this._onContextMenu),t.addEventListener("wheel",this._onWheel,{passive:!1}))}_unbindCanvas(){const t=this._boundCanvas;t&&(t.removeEventListener("pointerdown",this._onPointerDown),t.removeEventListener("pointermove",this._onPointerMove),t.removeEventListener("pointerup",this._onPointerUp),t.removeEventListener("pointercancel",this._onPointerUp),t.removeEventListener("dblclick",this._onDblClick),t.removeEventListener("contextmenu",this._onContextMenu),t.removeEventListener("wheel",this._onWheel),this._boundCanvas=void 0)}disconnectedCallback(){this._resizeObs?.disconnect(),this._unbindCanvas(),super.disconnectedCallback()}_onResize(){const t=this._canvas,e=this._canvasWrap;if(!t||!e)return;const i=e.getBoundingClientRect(),s=window.devicePixelRatio||1,n=Math.max(1,Math.floor(i.width*s)),o=Math.max(1,Math.floor(i.height*s));t.width===n&&t.height===o||(t.width=n,t.height=o),this._fitView(),this._paint()}_fitView(){const t=this._canvas;if(!t)return;let e=1/0,i=-1/0,s=1/0,n=-1/0;const o=(t,o)=>{t<e&&(e=t),t>i&&(i=t),o<s&&(s=o),o>n&&(n=o)};for(const t of this._vertices)o(t.x,t.y);for(const t of this._guide?.points??[])o(t[0],t[1]);if(!Number.isFinite(e))return this._viewOx=40,this._viewOy=40,void(this._viewScale=1);const r=i-e||100,a=n-s||100,l=Math.min((t.width-96)/r,(t.height-96)/a,4);this._viewScale=l,this._viewOx=48-e*l,this._viewOy=48-s*l}_vtxToCanvas(t){return[t.x*this._viewScale+this._viewOx,t.y*this._viewScale+this._viewOy]}_canvasToModel(t,e){return[(t-this._viewOx)/this._viewScale,(e-this._viewOy)/this._viewScale]}_pointerCanvasXY(t,e){const i=this._canvas,s=i.getBoundingClientRect(),n=s.width>0?i.width/s.width:1,o=s.height>0?i.height/s.height:1;return[(t-s.left)*n,(e-s.top)*o]}_isClosingDuplicate(t){if(t<=0||this._vertices.length<3)return!1;const e=this._vertices.length-1;if(t!==e)return!1;const i=this._vertices[0],s=this._vertices[e];return Math.hypot(i.x-s.x,i.y-s.y)<.5}_hitVertex(t,e){let i=-1,s=15;for(let n=0;n<this._vertices.length;n++){if(this._isClosingDuplicate(n))continue;const[o,r]=this._vtxToCanvas(this._vertices[n]),a=Math.hypot(t-o,e-r);if(a>14)continue;const l=null!==this._vertices[n].anchorLed,c=i>=0&&null!==this._vertices[i].anchorLed;(i<0||a<s-.5||Math.abs(a-s)<=1&&l&&!c)&&(i=n,s=a)}return i}_canvasXY(t){return this._pointerCanvasXY(t.clientX,t.clientY)}_placeVertexOnGuide(t,e){if(!this._guide||this._guide.points.length<2)return void(this._status="Draw a shape first (pen, line, rect, …), then place vertices.");const i=us(this._guide,t,e),s=24/Math.max(this._viewScale,.01);if(i.dist>s)return void(this._status="Click closer to the purple guide line.");for(const t of this._vertices)if(Math.hypot(t.x-i.x,t.y-i.y)<.5*s)return void(this._status="Vertex already placed near here.");const n=function(t,e){const i=Math.max(0,e-1);return Math.max(0,Math.min(i,Math.round(t*i)))}(i.t,this.pixelCount);this._vertices=[...this._vertices,{x:i.x,y:i.y,anchorLed:n}],this._selectedVtx=this._vertices.length-1,this._anchorInput=String(n),this._status=`Placed v${this._selectedVtx} @ LED ${n} — add more or set anchors manually`,this._refreshPositions(),this._paint()}_finishPenGuide(){const t=this._penStroke;this._penStroke=[],this._guide=function(t,e){if(t.length<2)return{points:[],closed:!1,kind:"freehand"};const i=is(t.map(([t,e])=>[t,e,.5]),{size:12,thinning:.65,smoothing:.55,streamline:.35}),s=ls(i.map(([t,e])=>({x:t,y:e})),4,!1),n=s.map(t=>e(t.x,t.y));return{points:n,closed:!1,kind:"freehand"}}(t,(t,e)=>this._canvasToModel(t,e)),this._status=this._guide.points.length>=2?"Smooth guide drawn — switch to Place vertices and click along the line":"Stroke too short",this._paint()}_finishPolyline(){this._polylinePts.length<2?this._status="Need at least 2 points":(this._guide=ds(this._polylinePts,this._closed),this._polylinePts=[],this._status="Polyline guide ready — Place vertices along the path",this._paint())}_applyCalibration(){if(this._calibPts.length<2)return;const[t,e]=this._calibPts,i=Math.hypot(e[0]-t[0],e[1]-t[1]),s=parseFloat(this._calibMeters);i>0&&s>0&&(this._scalePxPerM=i/s,this._status=`Scale: ${this._scalePxPerM.toFixed(1)} px/m`),this._calibActive=!1,this._calibPts=[]}_paint(t=null){const e=this._ctx,i=this._canvas;if(!e||!i)return;const s=i.width,n=i.height;e.clearRect(0,0,s,n),e.fillStyle="#111827",e.fillRect(0,0,s,n),this._bgImage?.complete&&this._bgImage.naturalWidth>0&&this._bgLayer&&yi(e,s,n,this._bgImage,this._bgLayer);const o=(t,e)=>this._vtxToCanvas({x:t,y:e,anchorLed:null});if(ps(e,o,this._guide),t&&ps(e,o,t),this._polylinePts.length>=2&&ps(e,o,ds(this._polylinePts,!1)),this._penStroke.length>=2){e.beginPath(),e.strokeStyle="rgba(168,85,247,0.5)",e.lineWidth=2,e.moveTo(this._penStroke[0][0],this._penStroke[0][1]);for(let t=1;t<this._penStroke.length;t++)e.lineTo(this._penStroke[t][0],this._penStroke[t][1]);e.stroke()}const r=this._vertices;if(0===r.length&&!this._guide)return e.fillStyle="rgba(255,255,255,0.25)",e.font="14px sans-serif",e.textAlign="center",void e.fillText("Draw a shape, then use Place vertices",s/2,n/2);const a=Boolean(this._bgImage);for(const{x:t,y:i}of this._ledPositions){const s=t*this._viewScale+this._viewOx,n=i*this._viewScale+this._viewOy;a&&(e.shadowBlur=10,e.shadowColor="rgba(120,255,160,0.85)"),e.beginPath(),e.arc(s,n,a?4:3,0,2*Math.PI),e.fillStyle="rgba(120,220,120,0.65)",e.fill(),e.shadowBlur=0}if(r.length>=2){const t=r.length>=2&&this._isClosingDuplicate(r.length-1)?r.slice(0,-1):r;if(t.length>=2){e.beginPath(),e.strokeStyle="rgba(99,102,241,0.6)",e.lineWidth=2;const[i,s]=this._vtxToCanvas(t[0]);e.moveTo(i,s);for(let i=1;i<t.length;i++){const[s,n]=this._vtxToCanvas(t[i]);e.lineTo(s,n)}this._closed&&t.length>=3&&e.closePath(),e.stroke()}}for(const[t,i]of this._calibPts){const[s,n]=this._vtxToCanvas({x:t,y:i,anchorLed:null});e.beginPath(),e.arc(s,n,6,0,2*Math.PI),e.fillStyle="#22d3ee",e.fill()}for(let t=0;t<r.length;t++){const i=r[t],[s,n]=this._vtxToCanvas(i),o=null!==i.anchorLed,a=t===this._selectedVtx,l=o?9:7;e.beginPath(),e.arc(s,n,l,0,2*Math.PI),e.fillStyle=a?"white":o?"#f59e0b":vs,e.fill(),a&&(e.strokeStyle=vs,e.lineWidth=2,e.stroke()),o&&null!==i.anchorLed&&(e.fillStyle="#111",e.font=`bold ${Math.max(9,l-1)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(String(i.anchorLed),s,n)),e.fillStyle="rgba(255,255,255,0.5)",e.font="10px sans-serif",e.textBaseline="bottom",e.textAlign="left",e.fillText(`v${t}`,s+l+2,n-2)}}async _loadLayout(){if(this.connection&&this.controllerId&&this.layoutId)try{const t=await ci(this.connection,this.controllerId,this.layoutId);if(!t)return;const e=this._findFixture(t);if(!e)return void(this._vertices=[]);const i=e.points??[],s=e.anchors??[],n=new Map(s.map(t=>[t.vertex_index,t.led]));let o=i.map((t,e)=>({x:t[0],y:t[1],anchorLed:n.get(e)??null}));if(o.length>=2){const t=o[0],e=o[o.length-1];Math.hypot(t.x-e.x,t.y-e.y)<.5&&(o=o.slice(0,-1))}this._vertices=o;const r=e.guide_points,a=e.guide_kind;Array.isArray(r)&&r.length>=2&&(this._guide={points:r.map(t=>[Number(t[0]),Number(t[1])]),closed:Boolean(e.closed),kind:a??"polyline"}),this._closed=Boolean(e.closed),this._bgLayer=vi(t),this._backgroundUrl=this._bgLayer?.url??t.background_url??null,this._scalePxPerM=t.scale_px_per_m??null,this._loadBackgroundImage(),this._fitView(),await this._refreshPositions(),this._paint()}catch(t){this._status=t instanceof Error?t.message:String(t)}}_findFixture(t){const e=t.fixtures??[];return this.fixtureId?e.find(t=>t.id===this.fixtureId)??null:e[0]??null}async _refreshPositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{this._ledPositions=await di(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._paint()}catch{this._ledPositions=[]}}_buildLayout(){const t=this._vertices.map(t=>[t.x,t.y]),e=this._vertices.map((t,e)=>null!==t.anchorLed?{led:t.anchorLed,vertex_index:e}:null).filter(t=>null!==t);return{id:this.layoutId||"layout-0",controller_id:this.controllerId,name:"Layout",pixel_count:this.pixelCount,background_url:this._backgroundUrl,background:this._bgLayer,scale_px_per_m:this._scalePxPerM,fixtures:[{id:this.fixtureId||"fixture-0",name:"Fixture",kind:"polyline",closed:this._closed,points:t,anchors:e,guide_points:this._guide?.points??[],guide_kind:this._guide?.kind??null}]}}async _onSvgFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i)try{const t=await i.text();this._guide=function(t){const e=(new DOMParser).parseFromString(t,"image/svg+xml");if(e.querySelector("parsererror"))throw new Error("Invalid SVG file");const i=e.querySelectorAll("path");let s=[],n=!1;i.forEach(t=>{const e=t.getAttribute("d");if(!e)return;const i=fs(e);i.length&&(s=s.concat(i),"Z"===(e.trim().slice(-1)||"").toUpperCase()&&(n=!0))}),0===s.length&&e.querySelectorAll("polygon, polyline").forEach(t=>{const e=t.getAttribute("points");if(!e)return;const i=e.trim().split(/[\s,]+/).map(parseFloat);for(let t=0;t+1<i.length;t+=2)s.push([i[t],i[t+1]]);"polygon"===t.tagName.toLowerCase()&&(n=!0)});if(s.length<2)throw new Error("No paths found in SVG (use path, polyline, or polygon)");return{points:gs(s),closed:n,kind:"svg"}}(t),this._status="SVG guide loaded — Place vertices along the path",this._fitView(),this._paint()}catch(t){this._status=t instanceof Error?t.message:String(t)}}_clearGuide(){this._guide=null,this._polylinePts=[],this._lineStart=null,this._paint()}_loadBackgroundImage(){const t=this._backgroundUrl;if(!t)return void(this._bgImage=null);const e=new Image;e.crossOrigin="anonymous",e.onload=()=>{this._bgImage=e,this._paint()},e.onerror=()=>{this._bgImage=null},e.src=t}async _importFromWled(){if(this.connection&&this.controllerId){this._busy=!0,this._status="Reading WLED segments…";try{const t=(await xt(this.connection,this.controllerId)).segments.map(t=>t.start??0).filter((t,e,i)=>i.indexOf(t)===e).sort((t,e)=>t-e);this._vertices=_i(this._vertices,t,this._closed),this._status=`Imported ${t.length} segment boundary(ies) from WLED`,this._refreshPositions(),this._paint()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}async _onBackgroundFile(t){const e=t.target,i=e.files?.[0];if(e.value="",!i)return;const s=this.renderRoot.querySelector("wled-layout-photo-editor");if(s)try{await s.openWithFile(i)}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _onPhotoApply(t){const{file:e,layer:i}=t.detail;if(this.controllerId&&this.layoutId){this._busy=!0,this._status="Uploading photo…";try{const{background_url:t}=await ui(this.controllerId,this.layoutId,e);this._backgroundUrl=t,this._bgLayer={...i,url:t,cropX:0,cropY:0,cropW:1,cropH:1},this._loadBackgroundImage(),this._status="Photo ready — align with Photo tool, then Save layout"}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_updateBgLayer(t){this._bgLayer&&(this._bgLayer={...this._bgLayer,...t},this._paint())}_clearPhoto(){this._bgLayer=null,this._backgroundUrl=null,this._bgImage=null,this._paint()}async _save(){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._status="Saving…";try{await hi(this.connection,this.controllerId,this._buildLayout()),this._status="Saved",await this._refreshPositions(),this.dispatchEvent(new CustomEvent("layout-saved",{bubbles:!0,composed:!0}))}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_setAnchorLed(){const t=this._selectedVtx;if(t<0)return;const e=this._anchorInput.trim(),i=""===e?null:parseInt(e,10);if(null!==i&&(isNaN(i)||i<0||i>=this.pixelCount))return;const s=[...this._vertices];s[t]={...s[t],anchorLed:i},this._vertices=s,this._paint()}_mirrorSliderMax(){return Math.max(0,this.pixelCount-1)}_onMirrorSlider(t){const e=t.target,i=parseInt(e.value,10);if(isNaN(i)||0===this._vertices.length)return;const s=[...this._vertices];for(let t=0;t<s.length;t++){const e=s[t].anchorLed;if(null===e)continue;const n=e/this._mirrorSliderMax(),o=Math.round(ys(0,i,n));s[t]={...s[t],anchorLed:o}}this._vertices=s,this._paint()}render(){const t=this._vertices[this._selectedVtx];return j`
      <div class="designer">
        <div class="canvas-wrap">
          <canvas></canvas>
        </div>
        <div class="sidebar">
          <div class="tool-group">
            <span class="tool-label">Edit</span>
            <div class="tool-row">
              <button
                class=${"select"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="select"}}
              >
                Select
              </button>
              <button
                class=${"place"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="place"}}
              >
                Place ●
              </button>
              <button
                class=${"photo"===this._tool?"tool active":"tool"}
                ?disabled=${!this._bgLayer}
                @click=${()=>{this._tool="photo"}}
              >
                Photo
              </button>
            </div>
          </div>
          <div class="tool-group">
            <span class="tool-label">Draw shape (guide)</span>
            <div class="tool-row wrap">
              <button
                class=${"pen"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="pen"}}
              >
                Freehand
              </button>
              <button
                class=${"line"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="line",this._lineStart=null}}
              >
                Line
              </button>
              <button
                class=${"rect"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="rect"}}
              >
                Rectangle
              </button>
              <button
                class=${"ellipse"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="ellipse"}}
              >
                Oval
              </button>
              <button
                class=${"polyline"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="polyline",this._polylinePts=[]}}
              >
                Polyline
              </button>
            </div>
          </div>

          <label class="check-row">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${t=>{this._closed=t.target.checked,this._paint(),this._refreshPositions()}}
            />
            Close path (wrap last LED → first)
          </label>

          <div class="instructions">
            <strong>Workflow</strong>
            <ol>
              <li>Draw a <em>purple guide</em> (shape tools)</li>
              <li><strong>Place ●</strong> — click the guide to drop corners (suggests LED #)</li>
              <li>Set anchor LEDs → Save → Apply segments</li>
            </ol>
            <strong>Place ●</strong>
            <ul>
              <li>Clicks snap to the guide; LED index from position along strip</li>
            </ul>
            <strong>Shapes</strong>
            <ul>
              <li>Line: two clicks</li>
              <li>Rect / Oval: drag</li>
              <li>Polyline: clicks, double-click to finish</li>
              <li>Freehand: smooth stroke (not hundreds of vertices)</li>
            </ul>
          </div>

          <div class="action-stack">
            <button class="secondary" ?disabled=${this._busy} @click=${()=>this._importFromWled()}>
              Import segments from WLED
            </button>
            <label class="file-btn secondary">
              Add room photo…
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,.heic"
                capture="environment"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="file-btn secondary">
              Import SVG guide
              <input
                type="file"
                accept="image/svg+xml,.svg"
                hidden
                @change=${this._onSvgFile}
              />
            </label>
            <button class="secondary" @click=${()=>this._clearGuide()}>
              Clear shape guide
            </button>
            ${"polyline"===this._tool&&this._polylinePts.length>=2?j`
                  <button class="secondary" @click=${()=>this._finishPolyline()}>
                    Finish polyline
                  </button>
                `:null}
            ${this._bgLayer?j`
                  <div class="photo-tune">
                    <label
                      >Opacity
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        .value=${String(this._bgLayer.opacity??.55)}
                        @input=${t=>this._updateBgLayer({opacity:parseFloat(t.target.value)})}
                      />
                    </label>
                    <label
                      >Brightness
                      <input
                        type="range"
                        min="0.4"
                        max="1.8"
                        step="0.05"
                        .value=${String(this._bgLayer.brightness??1)}
                        @input=${t=>this._updateBgLayer({brightness:parseFloat(t.target.value)})}
                      />
                    </label>
                    <label
                      >Saturation
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.05"
                        .value=${String(this._bgLayer.saturation??1)}
                        @input=${t=>this._updateBgLayer({saturation:parseFloat(t.target.value)})}
                      />
                    </label>
                    <label
                      >Rotation (°)
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        .value=${String(this._bgLayer.rotation??0)}
                        @input=${t=>this._updateBgLayer({rotation:parseFloat(t.target.value)})}
                      />
                    </label>
                    <label
                      >Zoom
                      <input
                        type="range"
                        min="0.25"
                        max="4"
                        step="0.05"
                        .value=${String(this._bgLayer.scale??1)}
                        @input=${t=>this._updateBgLayer({scale:parseFloat(t.target.value)})}
                      />
                    </label>
                    <button class="secondary" @click=${()=>this._clearPhoto()}>
                      Remove photo
                    </button>
                  </div>
                `:null}
            <button
              class="secondary"
              ?disabled=${this._busy}
              @click=${()=>{this._calibActive=!0,this._calibPts=[],this._status="Click two points on the floorplan, then enter real distance (m)"}}
            >
              Calibrate scale
            </button>
            ${this._calibActive?j`
                  <label>
                    Distance between points (m)
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      .value=${this._calibMeters}
                      @input=${t=>{this._calibMeters=t.target.value}}
                    />
                  </label>
                `:null}
            ${this._scalePxPerM?j`<p class="meta">Scale: ${this._scalePxPerM.toFixed(1)} layout px per meter</p>`:null}
          </div>

          ${void 0!==t?j`
                <div class="anchor-panel">
                  <label>
                    LED index for v${this._selectedVtx}
                    <input
                      type="number"
                      min="0"
                      max=${this.pixelCount-1}
                      .value=${this._anchorInput}
                      @input=${t=>{this._anchorInput=t.target.value}}
                      @change=${()=>this._setAnchorLed()}
                      placeholder="unanchored"
                    />
                  </label>
                  <button
                    class="small"
                    @click=${()=>this._setAnchorLed()}
                  >Set anchor</button>
                </div>
              `:null}

          <div class="mirror-panel">
            <label>
              Mirror anchor at LED
              <input
                type="range"
                min="0"
                max=${this._mirrorSliderMax()}
                value=${this.pixelCount-1}
                @change=${this._onMirrorSlider}
              />
            </label>
          </div>

          ${this._status?j`<p class="status">${this._status}</p>`:null}

          <div class="actions">
            <button
              class="primary"
              ?disabled=${this._busy||this._vertices.length<2}
              @click=${()=>this._save()}
            >
              Save layout
            </button>
          </div>
        </div>
      </div>
      <wled-layout-photo-editor
        @photo-apply=${this._onPhotoApply}
        @photo-error=${t=>{this._status=t.detail.message}}
      ></wled-layout-photo-editor>
    `}static{this.styles=[...gt,r`
      .designer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        height: 100%;
      }
      @container wled-studio (min-width: 600px) {
        .designer {
          grid-template-columns: 1fr 220px;
        }
      }
      .canvas-wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #111827;
        min-height: 320px;
        height: min(55vh, 480px);
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        cursor: crosshair;
        touch-action: none;
      }
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 4px 0;
      }
      .instructions {
        font-size: 0.78rem;
        opacity: 0.75;
        line-height: 1.5;
      }
      .instructions ul {
        margin: 4px 0 0;
        padding-left: 1.1rem;
      }
      .tool-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tool-label {
        font-size: 0.72rem;
        opacity: 0.65;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tool-row {
        display: flex;
        gap: 6px;
      }
      .tool-row.wrap {
        flex-wrap: wrap;
      }
      .tool {
        flex: 1;
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .check-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
      }
      .check-row input[type="range"] {
        flex: 1;
      }
      .action-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .secondary,
      .file-btn {
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--card-background-color, #1f2937);
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        text-align: center;
      }
      .file-btn input {
        display: none;
      }
      .meta {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.7;
      }
      .photo-tune {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.2);
      }
      .photo-tune label {
        font-size: 0.78rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .anchor-panel {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 10px;
        border-radius: 8px;
        background: var(--card-background-color, #1f2937);
      }
      .anchor-panel label {
        font-size: 0.82rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .anchor-panel input {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--primary-background-color, #111827);
        color: var(--primary-text-color, #f9fafb);
        font-size: 0.9rem;
        width: 100%;
        box-sizing: border-box;
      }
      .mirror-panel {
        font-size: 0.82rem;
      }
      .mirror-panel label {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .mirror-panel input[type="range"] {
        width: 100%;
      }
      .status {
        font-size: 0.8rem;
        opacity: 0.8;
        margin: 0;
      }
      .actions {
        margin-top: auto;
        padding-top: 8px;
      }
      .primary,
      .small {
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
        width: 100%;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.78rem;
        width: auto;
      }
      .primary:disabled {
        opacity: 0.45;
        cursor: default;
      }
    `]}};t([ht({attribute:!1})],ms.prototype,"connection",void 0),t([ht()],ms.prototype,"controllerId",void 0),t([ht()],ms.prototype,"layoutId",void 0),t([ht()],ms.prototype,"fixtureId",void 0),t([ht({type:Number})],ms.prototype,"pixelCount",void 0),t([dt()],ms.prototype,"_vertices",void 0),t([dt()],ms.prototype,"_ledPositions",void 0),t([dt()],ms.prototype,"_selectedVtx",void 0),t([dt()],ms.prototype,"_anchorInput",void 0),t([dt()],ms.prototype,"_status",void 0),t([dt()],ms.prototype,"_busy",void 0),t([dt()],ms.prototype,"_closed",void 0),t([dt()],ms.prototype,"_tool",void 0),t([dt()],ms.prototype,"_guide",void 0),t([dt()],ms.prototype,"_backgroundUrl",void 0),t([dt()],ms.prototype,"_bgLayer",void 0),t([dt()],ms.prototype,"_scalePxPerM",void 0),t([dt()],ms.prototype,"_calibActive",void 0),t([dt()],ms.prototype,"_calibMeters",void 0),ms=t([ut("wled-layout-designer")],ms);let bs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this._positions=[],this._status="waiting",this._bgLayer=null,this._bgImage=null,this._raf=0}setFrame(t){t&&(this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",o=4*s;8===n.length?(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=parseInt(n.slice(6,8),16)):(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._resolvePositions(),this._attachLiveStream()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect()}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._attachLiveStream())}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this)),this._onResize()}_onResize(){const t=this._canvas;if(!t)return;const e=this.getBoundingClientRect(),i=Math.max(320,e.width||320),s=Math.max(200,e.height||200);t.width===i&&t.height===s||(t.width=i,t.height=s,this._schedPaint())}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await ci(this.connection,this.controllerId,this.layoutId);t&&(this._bgLayer=vi(t),this._loadBackgroundImage())}this._positions=await di(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._schedPaint()}catch{this._positions=[]}}_loadBackgroundImage(){const t=this._bgLayer?.url;if(!t)return void(this._bgImage=null);const e=new Image;e.crossOrigin="anonymous",e.onload=()=>{this._bgImage=e,this._schedPaint()},e.src=t}_attachLiveStream(){if(!this.connection||!this.controllerId)return;const t=mt(this.connection,this.controllerId,t=>{this.setFrame(t)});this.addUnsub(t)}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const i=e.width,s=e.height;t.clearRect(0,0,i,s),t.fillStyle="#0d0d0d",t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&yi(t,i,s,this._bgImage,this._bgLayer);const n=this._pixels,o=this._positions,r=this.dotRadius;if(o.length>0){let e=1/0,a=-1/0,l=1/0,c=-1/0;for(const t of o)t.x<e&&(e=t.x),t.x>a&&(a=t.x),t.y<l&&(l=t.y),t.y>c&&(c=t.y);const h=3*r,d=(i-2*h)/(a-e||1),u=(s-2*h)/(c-l||1),p=Math.min(d,u),_=this.remote.state.disableBloom;for(const{x:i,y:s,led:a}of o){const o=h+(i-e)*p,c=h+(s-l)*p;let d=80,u=80,f=80;if(n){const t=4*a;d=n[t],u=n[t+1],f=n[t+2]}!_&&(d>10||u>10||f>10)?(t.shadowColor=`rgba(${d},${u},${f},0.7)`,t.shadowBlur=2.5*r):t.shadowBlur=0,t.beginPath(),t.arc(o,c,r,0,2*Math.PI),t.fillStyle=`rgb(${d},${u},${f})`,t.fill()}t.shadowBlur=0}else{const e=this.pixelCount,o=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(n){const t=4*i;e=n[t],s=n[t+1],l=n[t+2]}t.beginPath(),t.arc(4+i*o+o/2,a,r,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}render(){return j`
      <div
        class="wrap"
        role="img"
        aria-label="LED geometry preview — positions mapped from fixture layout"
      >
        <canvas></canvas>
        ${"live"!==this._status?j`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...gt,r`
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #0d0d0d;
        width: 100%;
        height: 100%;
        min-height: 200px;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
    `]}};t([ht({attribute:!1})],bs.prototype,"connection",void 0),t([ht()],bs.prototype,"controllerId",void 0),t([ht()],bs.prototype,"layoutId",void 0),t([ht()],bs.prototype,"fixtureId",void 0),t([ht({type:Number})],bs.prototype,"pixelCount",void 0),t([ht({type:Number})],bs.prototype,"dotRadius",void 0),t([dt()],bs.prototype,"_positions",void 0),t([dt()],bs.prototype,"_status",void 0),bs=t([ut("wled-geometry-preview")],bs);let xs=class extends vt{constructor(){super(...arguments),this.controllerId="",this._layouts=[],this._status="Loading layouts…",this._busy=!1,this._viewMode="list",this._activeLayoutId="",this._activeFixtureId="",this._activePixelCount=210,this._onDesignerSave=async()=>{await this._load(),this._activeLayoutId&&await this._applySegments(this._activeLayoutId)}}onPoweredConnect(){this._load(),this._attachLive()}onPoweredDisconnect(){this._liveUnsub?.(),this._liveUnsub=void 0}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId"))&&(this._load(),this._attachLive())}_attachLive(){this._liveUnsub?.(),this.connection&&this.controllerId&&(this._liveUnsub=mt(this.connection,this.controllerId,t=>{this._forwardFrame(t)}))}_forwardFrame(t){const e=this.renderRoot.querySelector("wled-geometry-preview");e?.setFrame(t)}async _load(){if(this.connection&&this.controllerId)try{this._layouts=await async function(t,e){return(await li(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}(this.connection,this.controllerId),this._status=0===this._layouts.length?"No layouts yet — use the button below to seed the kitchen-island template.":`${this._layouts.length} layout(s) saved`}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _seedKitchenIsland(){if(this.connection&&this.controllerId){this._busy=!0;try{await hi(this.connection,this.controllerId,(t=this.controllerId,{id:"kitchen-island",controller_id:t,name:"Kitchen island",pixel_count:210,fixtures:[{id:"kitchen-island",name:"Kitchen island",kind:"polyline",closed:!0,points:[[0,0],[100,0],[110,10],[200,10]],anchors:[{led:0,vertex_index:0},{led:85,vertex_index:1},{led:96,vertex_index:2},{led:186,vertex_index:3}]}]})),await this._load()}finally{this._busy=!1}var t}}async _applySegments(t){if(this.connection&&this.controllerId){this._busy=!0;try{await async function(t,e,i,s){return li(t,{type:"wled_studio/layout_to_segments",controller_id:e,layout_id:i,fixture_id:s})}(this.connection,this.controllerId,t),this._status="WLED segments updated from layout anchors"}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_openDesigner(t){this._activeLayoutId=String(t.id);const e=t.fixtures[0];this._activeFixtureId=e?String(e.id??"fixture-0"):"fixture-0",this._activePixelCount=t.pixel_count??210,this._viewMode="designer"}render(){return"designer"===this._viewMode?this._renderDesigner():this._renderList()}_renderList(){return j`
      <div class="layout-view">
        <p class="status-line">${this._status}</p>

        <div class="actions">
          <button
            class="primary"
            ?disabled=${this._busy}
            @click=${()=>this._seedKitchenIsland()}
          >
            Add kitchen-island template
          </button>
        </div>

        ${this._layouts.length>0?j`
              <ul class="layout-list">
                ${this._layouts.map(t=>j`
                    <li class="layout-item">
                      <div class="layout-info">
                        <span class="layout-name">${t.name??t.id}</span>
                        <span class="meta">${t.pixel_count} px</span>
                      </div>
                      <div class="layout-btns">
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${()=>this._openDesigner(t)}
                        >
                          Edit
                        </button>
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${()=>this._applySegments(String(t.id))}
                        >
                          Apply segments
                        </button>
                      </div>
                    </li>
                  `)}
              </ul>
            `:null}
      </div>
    `}_renderDesigner(){return j`
      <div class="designer-view">
        <div class="designer-header">
          <button
            class="back"
            @click=${()=>{this._viewMode="list"}}
          >
            ← Back to layouts
          </button>
          <span class="layout-id-label">${this._activeLayoutId}</span>
          <button
            class="small"
            ?disabled=${this._busy}
            @click=${()=>this._applySegments(this._activeLayoutId)}
          >
            Apply segments to WLED
          </button>
        </div>

        <div class="designer-body">
          <div class="designer-col">
            <wled-layout-designer
              .connection=${this.connection}
              controllerId=${this.controllerId}
              layoutId=${this._activeLayoutId}
              fixtureId=${this._activeFixtureId}
              pixelCount=${this._activePixelCount}
              @layout-saved=${this._onDesignerSave}
            ></wled-layout-designer>
          </div>

          <div class="preview-col">
            <div class="preview-label">Live geometry preview</div>
            <wled-geometry-preview
              .connection=${this.connection}
              controllerId=${this.controllerId}
              layoutId=${this._activeLayoutId}
              fixtureId=${this._activeFixtureId}
              pixelCount=${this._activePixelCount}
            ></wled-geometry-preview>
          </div>
        </div>

        ${this._status?j`<p class="status-line">${this._status}</p>`:null}
      </div>
    `}static{this.styles=[...gt,r`
      /* ── list view ─────────────────────────────────────── */
      .layout-view {
        padding: 8px 0;
      }
      .status-line {
        margin: 0 0 10px;
        font-size: 0.85rem;
        opacity: 0.8;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .layout-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .layout-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 8px;
        background: var(--card-background-color, #1f2937);
      }
      .layout-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .layout-name {
        font-weight: 500;
      }
      .meta {
        font-size: 0.78rem;
        opacity: 0.65;
      }
      .layout-btns {
        display: flex;
        gap: 6px;
      }

      /* ── designer view ──────────────────────────────────── */
      .designer-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;
      }
      .designer-header {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .layout-id-label {
        flex: 1;
        font-size: 0.85rem;
        opacity: 0.7;
        font-family: monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .designer-body {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        flex: 1;
        min-height: 0;
      }
      @container wled-studio (min-width: 900px) {
        .designer-body {
          grid-template-columns: 1fr 1fr;
        }
      }
      .designer-col,
      .preview-col {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-height: 400px;
      }
      .preview-label {
        font-size: 0.8rem;
        opacity: 0.65;
      }
      wled-layout-designer,
      wled-geometry-preview {
        flex: 1;
        min-height: 0;
      }

      /* ── shared buttons ─────────────────────────────────── */
      .primary,
      .small,
      .back {
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.78rem;
      }
      .back {
        background: transparent;
        border: 1px solid var(--divider-color, #374151);
        color: var(--primary-text-color);
      }
      .primary:disabled,
      .small:disabled {
        opacity: 0.45;
        cursor: default;
      }
    `]}};t([ht({attribute:!1})],xs.prototype,"connection",void 0),t([ht()],xs.prototype,"controllerId",void 0),t([dt()],xs.prototype,"_layouts",void 0),t([dt()],xs.prototype,"_status",void 0),t([dt()],xs.prototype,"_busy",void 0),t([dt()],xs.prototype,"_viewMode",void 0),t([dt()],xs.prototype,"_activeLayoutId",void 0),t([dt()],xs.prototype,"_activeFixtureId",void 0),t([dt()],xs.prototype,"_activePixelCount",void 0),xs=t([ut("wled-view-layout")],xs);const ws="wled-studio-panel";let $s=class extends vt{constructor(){super(...arguments),this._view="devices",this._controllerId=""}onPoweredConnect(){this._loadController()}async _loadController(){if(this.hass?.connection)try{const t=await async function(t){await bt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}(this.hass.connection),e=t[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}catch{}}render(){const t=this.remote.state;return j`
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
            ${t.isRemote?j`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <section class="content" aria-live="polite">
            ${"layout"===this._view&&this._controllerId&&this.hass?.connection?j`
                  <wled-view-layout
                    .connection=${this.hass.connection}
                    .controllerId=${this._controllerId}
                  ></wled-view-layout>
                `:"segments"===this._view&&this._controllerId&&this.hass?.connection?j`
                    <wled-segment-controls
                      .hass=${this.hass}
                      .connection=${this.hass.connection}
                      .controllerId=${this._controllerId}
                    ></wled-segment-controls>
                  `:j`
                  <p>
                    View: <strong>${this._view}</strong>
                    ${"segments"===this._view?" — connect a WLED Studio controller first.":" — expanded in later phases."}
                  </p>
                `}
          </section>
        </main>
      </div>
    `}_navItem(t,e,i){const s=this._view===t;return j`
      <button
        class="nav ${s?"active":""}"
        aria-current=${s?"page":"false"}
        @click=${()=>{this._view=t}}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_toggleDrawer(){}static{this.styles=[...gt,r`
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
      `]}};t([dt()],$s.prototype,"_view",void 0),t([dt()],$s.prototype,"_controllerId",void 0),$s=t([ut(ws)],$s),customElements.get(ws)||customElements.define(ws,$s),console.info("[wled-studio] panel bundle loaded",{panel:ws});export{ws as PANEL_TAG,$s as WledStudioPanel};
//# sourceMappingURL=wled-studio-panel.js.map
