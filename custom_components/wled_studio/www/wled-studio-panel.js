function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,v=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,k=$.trustedTypes,I=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,M=document,O=()=>M.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,U=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,W=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,X=M.createTreeWalker(M,129);function Y(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(e):e}class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===N?"!--"===l[1]?r=D:void 0!==l[1]?r=U:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=n??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?j:H):r===j||r===H?r=z:r===D||r===U?r=N:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+P:c>=0?(s.push(a),i.slice(0,c)+A+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=K.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=c[o++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),X.nextNode(),a.push({type:2,index:++n});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=X.nextNode(),o++)}return X.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),R(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of e)n===i.length?i.push(s=new t(this.O(O()),this.O(O()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!R(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}let it=class extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??B)===F)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(K,Z),($.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Z(e.insertBefore(O(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function ut(t){return(e,i)=>(customElements.get(t)||customElements.define(t,e),e)}const pt=r`
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
`;class ft{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const vt=[pt,_t];class gt extends rt{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new ft(this),this._visible=!0,this._inView=!0}static{this.styles=vt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ht({attribute:!1})],gt.prototype,"hass",void 0);const mt=/^[0-9a-fA-F]+$/;function yt(t,e,i,s){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&mt.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let o=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:s,n:o,channels:n,scale:o/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:!1}))};r();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}async function bt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function xt(t,e){await bt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function wt(t,e,i,s){await bt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}function $t(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function St(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function kt(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function It(t,e){for(const i of e){if(kt(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}function At(t,e,i){const s=(i.length?i:[{id:t}]).map(i=>i.id===t?{...e,id:t,sel:!0,on:void 0!==e.on?e.on:!1===i.on||i.on}:{id:i.id,sel:!1});return{seg:s}}function Et(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:St(t.col),awm:t.awm};return JSON.stringify(e)}function Ct(t,e,i){let s,n=null,o=0;const r=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await xt(t,e)).segments??[]).find(t=>t.id===o);if(!s||!n)return;const r=Et(n);if(r===Et(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(St(t.col))!==JSON.stringify(St(e.col))}(n,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=function(t,e,i=100){let s,n,o;const r=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o){const e=o;o=void 0,t(...e)}},a=(...t)=>{o=t,s&&clearTimeout(s),s=setTimeout(r,e),n||(n=setTimeout(r,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o=void 0},a}((s,a)=>{n=a,o=a.id,wt(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(n={...a,...i,id:a.id}),r()}).catch(()=>{i(a,"Failed to apply state to WLED")})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var Pt,Mt,Ot,Rt,Lt,Tt={},Nt=[],Dt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function Ut(t,e){for(var i in e)t[i]=e[i];return t}function zt(t){var e=t.parentNode;e&&e.removeChild(t)}function Ht(t,e,i){var s,n,o,r,a=arguments;if(e=Ut({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return r=e.key,null!=(o=e.ref)&&delete e.ref,null!=r&&delete e.key,jt(t,e,r,o)}function jt(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return Pt.vnode&&Pt.vnode(n),n}function Wt(t){return t.children}function qt(t,e){this.props=t,this.context=e}function Ft(t,e){if(null==e)return t.__p?Ft(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?Ft(t):null}function Bt(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return Bt(t)}}function Vt(t){(!t.__d&&(t.__d=!0)&&1===Mt.push(t)||Rt!==Pt.debounceRendering)&&(Rt=Pt.debounceRendering,(Pt.debounceRendering||Ot)(Xt))}function Xt(){var t,e,i,s,n,o,r,a;for(Mt.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Mt.pop();)t.__d&&(i=void 0,s=void 0,o=(n=(e=t).__v).__e,r=e.__P,a=e.u,e.u=!1,r&&(i=[],s=Qt(r,n,Ut({},n),e.__n,void 0!==r.ownerSVGElement,null,i,a,null==o?Ft(n):o),te(i,n),s!=o&&Bt(n)))}function Yt(t,e,i,s,n,o,r,a,l){var c,h,d,u,p,_,f,v=i&&i.__k||Nt,g=v.length;if(a==Tt&&(a=null!=o?o[0]:g?Ft(i,0):null),c=0,e.__k=Kt(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=v[c])||d&&i.key==d.key&&i.type===d.type)v[c]=void 0;else for(h=0;h<g;h++){if((d=v[h])&&i.key==d.key&&i.type===d.type){v[h]=void 0;break}d=null}if(u=Qt(t,i,d=d||Tt,s,n,o,r,null,a,l),(h=i.ref)&&d.ref!=h&&(f||(f=[])).push(h,i.__c||u,i),null!=u){if(null==_&&(_=u),null!=i.l)u=i.l,i.l=null;else if(o==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,h=0;(p=p.nextSibling)&&h<g;h+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return c++,i}),e.__e=_,null!=o&&"function"!=typeof e.type)for(c=o.length;c--;)null!=o[c]&&zt(o[c]);for(c=g;c--;)null!=v[c]&&se(v[c],v[c]);if(f)for(c=0;c<f.length;c++)ie(f[c],f[++c],f[++c])}function Kt(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Kt(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return jt(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=jt(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Jt(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Dt.test(e)?i+"px":null==i?"":i}function Gt(t,e,i,s,n){var o,r,a,l,c;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(o=t.style,"string"==typeof i)o.cssText=i;else{if("string"==typeof s&&(o.cssText="",s=null),s)for(r in s)i&&r in i||Jt(o,r,"");if(i)for(a in i)s&&i[a]===s[a]||Jt(o,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Zt,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Zt,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Zt(t){return this.t[t.type](Pt.event?Pt.event(t):t)}function Qt(t,e,i,s,n,o,r,a,l,c){var h,d,u,p,_,f,v,g,m,y,b=e.type;if(void 0!==e.constructor)return null;(h=Pt.__b)&&h(e);try{t:if("function"==typeof b){if(g=e.props,m=(h=b.contextType)&&s[h.__c],y=h?m?m.props.value:h.__p:s,i.__c?v=(d=e.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?e.__c=d=new b(g,y):(e.__c=d=new qt(g,y),d.constructor=b,d.render=ne),m&&m.sub(d),d.props=g,d.state||(d.state={}),d.context=y,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&Ut(d.__s==d.state?d.__s=Ut({},d.__s):d.__s,b.getDerivedStateFromProps(g,d.__s)),u)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&r.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(g,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(g,d.__s,y)){for(d.props=g,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(g,d.__s,y)}for(p=d.props,_=d.state,d.context=y,d.props=g,d.state=d.__s,(h=Pt.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=Kt(null!=h&&h.type==Wt&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=Ut(Ut({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(p,_)),Yt(t,e,i,s,n,o,r,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,_,f),v&&(d.__E=d.__p=null)}else e.__e=ee(i.__e,e,i,s,n,o,r,c);(h=Pt.diffed)&&h(e)}catch(t){Pt.__e(t,e,i)}return e.__e}function te(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){Pt.__e(t,i.__v)}Pt.__c&&Pt.__c(e)}function ee(t,e,i,s,n,o,r,a){var l,c,h,d,u=i.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=o)for(l=0;l<o.length;l++)if(null!=(c=o[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,o[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),o=null}return null===e.type?u!==p&&(null!=o&&(o[o.indexOf(t)]=null),t.data=p):e!==i&&(null!=o&&(o=Nt.slice.call(t.childNodes)),h=(u=i.props||Tt).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var o;for(o in i)o in e||Gt(t,o,null,i[o],s);for(o in e)n&&"function"!=typeof e[o]||"value"===o||"checked"===o||i[o]===e[o]||Gt(t,o,e[o],i[o],s)}(t,p,u,n,a),e.__k=e.props.children,d||Yt(t,e,i,s,"foreignObject"!==e.type&&n,o,r,Tt,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function ie(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){Pt.__e(t,i)}}function se(t,e,i){var s,n,o;if(Pt.unmount&&Pt.unmount(t),(s=t.ref)&&ie(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){Pt.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(o=0;o<s.length;o++)s[o]&&se(s[o],e,i);null!=n&&zt(n)}function ne(t,e,i){return this.constructor(t,i)}function oe(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function re(){return re=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},re.apply(this,arguments)}Pt={},qt.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=Ut({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&Ut(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),Vt(this))},qt.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,Vt(this))},qt.prototype.render=Wt,Mt=[],Ot="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Rt=Pt.debounceRendering,Pt.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return Vt(s.__E=s)}catch(e){t=e}throw t},Lt=Tt;var ae="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",le="[\\s|\\(]+("+ae+")[,|\\s]+("+ae+")[,|\\s]+("+ae+")\\s*\\)?",ce="[\\s|\\(]+("+ae+")[,|\\s]+("+ae+")[,|\\s]+("+ae+")[,|\\s]+("+ae+")\\s*\\)?",he=new RegExp("rgb"+le),de=new RegExp("rgba"+ce),ue=new RegExp("hsl"+le),pe=new RegExp("hsla"+ce),_e="^(?:#?|0x?)",fe="([0-9a-fA-F]{1})",ve="([0-9a-fA-F]{2})",ge=new RegExp(_e+fe+fe+fe+"$"),me=new RegExp(_e+fe+fe+fe+fe+"$"),ye=new RegExp(_e+ve+ve+ve+"$"),be=new RegExp(_e+ve+ve+ve+ve+"$"),xe=Math.log,we=Math.round,$e=Math.floor;function Se(t,e,i){return Math.min(Math.max(t,e),i)}function ke(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function Ie(t){return parseInt(t,16)}function Ae(t){return t.toString(16).padStart(2,"0")}var Ee=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=re({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=re({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=$e(e),o=e-n,r=s*(1-i),a=s*(1-o*i),l=s*(1-(1-o)*i),c=n%6,h=[l,s,s,a,r,r][c],d=[r,r,l,s,s,a][c];return{r:Se(255*[s,a,r,r,l,s][c],0,255),g:Se(255*h,0,255),b:Se(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),r=n-o,a=0,l=n,c=0===n?0:r/n;switch(n){case o:a=0;break;case e:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-e)/r+2;break;case s:a=(e-i)/r+4}return{h:60*a%360,s:Se(100*c,0,100),v:Se(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,o=n<1e-9?0:e*i/n;return{h:t.h,s:Se(100*o,0,100),l:Se(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:Se(100*s,0,100),v:Se((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*xe(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*xe(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*xe(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*xe(i),s=255),{r:Se($e(e),0,255),g:Se($e(i),0,255),b:Se($e(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,o=2e3,r=4e4;r-o>.4;){i=.5*(r+o);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?r=i:o=i}return i},oe(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=re({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return re({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=re({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=re({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=re({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=re({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:we(i),g:we(s),b:we(n)}},set:function(e){this.hsv=re({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return re({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:we(i),s:we(s),l:we(n)}},set:function(e){this.hsv=re({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return re({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,o=1;if((e=he.exec(t))?(i=ke(e[1],255),s=ke(e[2],255),n=ke(e[3],255)):(e=de.exec(t))&&(i=ke(e[1],255),s=ke(e[2],255),n=ke(e[3],255),o=ke(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:o}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+Ae(t.r)+Ae(t.g)+Ae(t.b)},set:function(t){var e,i,s,n,o=255;if((e=ge.exec(t))?(i=17*Ie(e[1]),s=17*Ie(e[2]),n=17*Ie(e[3])):(e=me.exec(t))?(i=17*Ie(e[1]),s=17*Ie(e[2]),n=17*Ie(e[3]),o=17*Ie(e[4])):(e=ye.exec(t))?(i=Ie(e[1]),s=Ie(e[2]),n=Ie(e[3])):(e=be.exec(t))&&(i=Ie(e[1]),s=Ie(e[2]),n=Ie(e[3]),o=Ie(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:o/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+Ae(t.r)+Ae(t.g)+Ae(t.b)+Ae($e(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,o=1;if((e=ue.exec(t))?(i=ke(e[1],360),s=ke(e[2],100),n=ke(e[3],100)):(e=pe.exec(t))&&(i=ke(e[1],360),s=ke(e[2],100),n=ke(e[3],100),o=ke(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:o}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function Ce(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,o=t.handleRadius,r=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*r+2*o,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*r-2*o,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Pe(t,e){var i=Ce(t),s=i.width,n=i.height,o=i.handleRange,r=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,o=t.maxTemperature-n,r=(e.kelvin-n)/o*100;return Math.max(0,Math.min(r,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:n/2,h=r+l/100*o;return a&&(h=-1*h+o+2*r),{x:a?c:h,y:a?h:c}}var Me,Oe=2*Math.PI,Re=function(t,e){return Math.sqrt(t*t+e*e)};function Le(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Te(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Ne(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function De(t,e,i){var s=Te(t),n=s.cx,o=s.cy,r=Le(t);e=n-e,i=o-i;var a=Ne(t,Math.atan2(-i,-e)*(360/Oe)),l=Math.min(Re(e,i),r);return{h:Math.round(a),s:Math.round(100/r*l)}}function Ue(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function ze(t,e,i){var s=Ue(t),n=s.width,o=s.height,r=s.radius,a=(e-r)/(n-2*r)*100,l=(i-r)/(o-2*r)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function He(t){Me||(Me=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Me.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function je(t,e,i,s){for(var n=0;n<s.length;n++){var o=s[n].x-e,r=s[n].y-i;if(Math.sqrt(o*o+r*r)<t.handleRadius)return n}return null}function We(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function qe(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function Fe(t){return"string"==typeof t?t:t+"px"}var Be=["mousemove","touchmove","mouseup","touchend"],Ve=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,o={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(o[s?"marginLeft":"marginTop"]=n),Ht(Wt,null,t.children(this.uid,i,o))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,o=n.clientX-s.left,r=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(o,r,0)&&Be.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(o,r,1);break;case"mouseup":case"touchend":i(o,r,2),Be.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(qt);function Xe(t){var e=t.r,i=t.url,s=e,n=e;return Ht("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+Fe(t.x)+", "+Fe(t.y)+")",willChange:"transform",top:Fe(-e),left:Fe(-e),width:Fe(2*e),height:Fe(2*e),position:"absolute",overflow:"visible"}},i&&Ht("use",Object.assign({xlinkHref:He(i)},t.props)),!i&&Ht("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Ht("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Ye(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=Ce(t),n=s.width,o=s.height,r=s.radius,a=Pe(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],o=t.minTemperature,r=t.maxTemperature,a=r-o,l=o,c=0;l<r;l+=a/8,c+=1){var h=Ee.kelvinToRgb(l),d=h.r,u=h.g,p=h.b;n.push([12.5*c,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var _=Ee.hsvToHsl({h:i.h,s:0,v:i.v}),f=Ee.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var v=Ee.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+v.h+","+v.s+"%,"+v.l+"%)"]]}}(t,i);return Ht(Ve,Object.assign({},t,{onInput:function(e,s,n){var o=function(t,e,i){var s,n=Ce(t),o=n.handleRange,r=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+o+r:e-r,s=Math.max(Math.min(s,o),0);var a=Math.round(100/o*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=o,t.onInput(n,t.id)}}),function(e,s,c){return Ht("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:Fe(n),height:Fe(o),borderRadius:Fe(r),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Ht("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:Fe(r),background:qe("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},We(t))}),Ht(Xe,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Ke(t){var e=Ue(t),i=e.width,s=e.height,n=e.radius,o=t.colors,r=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=o.map(function(e){return function(t,e){var i=Ue(t),s=i.width,n=i.height,o=i.radius,r=e.hsv,a=o,l=s-2*o,c=n-2*o;return{x:a+r.s/100*l,y:a+(c-r.v/100*c)}}(t,e)});return Ht(Ve,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=je(t,e,i,h);null!==n?r.setActiveColor(n):(r.inputActive=!0,l.hsv=ze(t,e,i),t.onInput(s,t.id))}else 1===s&&(r.inputActive=!0,l.hsv=ze(t,e,i));t.onInput(s,t.id)}}),function(e,r,a){return Ht("div",Object.assign({},r,{className:"IroBox",style:Object.assign({},{width:Fe(i),height:Fe(s),position:"relative"},a)}),Ht("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:Fe(n)},We(t),{background:qe("linear","to bottom",c[1])+","+qe("linear","to right",c[0])})}),o.filter(function(t){return t!==l}).map(function(e){return Ht(Xe,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Ht(Xe,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}Xe.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Ye.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Je(t){var e=Te(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,o=n.hsv,r=i.map(function(e){return function(t,e){var i=e.hsv,s=Te(t),n=s.cx,o=s.cy,r=Le(t),a=(180+Ne(t,i.h,!0))*(Oe/360),l=i.s/100*r,c="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:o+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Ht(Ve,Object.assign({},t,{onInput:function(e,i,o){if(0===o){if(!function(t,e,i){var s=Te(t),n=s.cx,o=s.cy,r=t.width/2;return Re(n-e,o-i)<r}(t,e,i))return!1;var a=je(t,e,i,r);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=De(t,e,i),t.onInput(o,t.id))}else 1===o&&(s.inputActive=!0,n.hsv=De(t,e,i));t.onInput(o,t.id)}}),function(s,l,c){return Ht("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:Fe(e),height:Fe(e),position:"relative"},c)}),Ht("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Ht("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Ht("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-o.v/100})}),Ht("div",{className:"IroWheelBorder",style:Object.assign({},a,We(t))}),i.filter(function(t){return t!==n}).map(function(e){return Ht(Xe,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[e.index].x,y:r[e.index].y})}),Ht(Xe,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[n.index].x,y:r[n.index].y}))})}var Ge=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Ee(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Je},{component:Ye}],e.transparency&&s.push({component:Ye,options:{sliderType:"alpha"}})),Ht("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,o=t.options;return Ht(n,Object.assign({},e,o,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(qt);Ge.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Ze,Qe,ti,ei=(Qe=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,o;Pt.__p&&Pt.__p(t,e),n=(s=i===Lt)?null:e.__k,t=Ht(Wt,null,[t]),o=[],Qt(e,e.__k=t,n||Tt,Tt,void 0!==e.ownerSVGElement,n?null:Nt.slice.call(e.childNodes),o,!1,Tt,s),te(o,t)}(Ht(Ze,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},Qe.prototype=(Ze=Ge).prototype,Object.assign(Qe,Ze),Qe.__component=Ze,Qe);!function(t){var e;t.version="5.5.2",t.Color=Ee,t.ColorPicker=ei,(e=t.ui||(t.ui={})).h=Ht,e.ComponentBase=Ve,e.Handle=Xe,e.Slider=Ye,e.Wheel=Je,e.Box=Ke}(ti||(ti={}));var ii=ti;let si=class extends gt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this._suppress=!1}updated(){this._host&&!this._picker&&(this._picker=ii.ColorPicker(this._host,{width:140,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"var(--divider-color, #444)",layout:[{component:ii.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}willUpdate(){this._picker&&this._syncPicker()}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}render(){return q`
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
    `}static{this.styles=[...vt,r`
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
    `]}};t([ht({type:Array})],si.prototype,"rgb",void 0),t([ht({type:Number})],si.prototype,"white",void 0),t([ht({type:Number})],si.prototype,"awm",void 0),t([ht({type:Boolean})],si.prototype,"showWhite",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".wheel-host")],si.prototype,"_host",void 0),si=t([ut("wled-color-wheel-rgbw")],si);let ni=class extends gt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e;return q`
      <button
        class="tile"
        type="button"
        aria-label=${this.label||`Effect ${this.fxId}`}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${i?q`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
            />`:q`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...vt,r`
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
    `]}};t([ht({type:Number})],ni.prototype,"fxId",void 0),t([ht()],ni.prototype,"thumbUrl",void 0),t([ht()],ni.prototype,"thumbUrlAnimated",void 0),t([ht()],ni.prototype,"label",void 0),t([dt()],ni.prototype,"_hover",void 0),ni=t([ut("wled-effect-tile")],ni);let oi=class extends gt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId=""}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=t?e.filter(e=>e.toLowerCase().includes(t)):e.slice(0,48);return q`
      <div class="strip" role="listbox" aria-label="Effects">
        ${i.map(t=>{const e=this.effectsByName[t],i=this.soundFlags[e],s=e===this.selectedFx,n=void this.controllerId;return n?q`
              <wled-effect-tile
                class="chip-tile ${s?"active":""}"
                role="option"
                aria-selected=${s}
                .fxId=${e}
                .thumbUrl=${n}
                .label=${t+("v"===i?" ♪":"")+("f"===i?" ♫":"")+("2"===i?" 2D":"")}
                @click=${()=>this._pick(e)}
              ></wled-effect-tile>
            `:q`
            <button
              class="chip ${s?"active":""}"
              role="option"
              aria-selected=${s}
              @click=${()=>this._pick(e)}
            >
              ${t}
              ${"v"===i?q`<span class="badge" title="Volume reactive">♪</span>`:null}
              ${"f"===i?q`<span class="badge" title="Frequency reactive">♫</span>`:null}
              ${"2"===i?q`<span class="badge dim" title="2D only">2D</span>`:null}
            </button>
          `})}
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t},bubbles:!0,composed:!0}))}static{this.styles=[...vt,r`
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
    `]}};t([ht({type:Object})],oi.prototype,"effectsByName",void 0),t([ht({type:Array})],oi.prototype,"soundFlags",void 0),t([ht({type:Number})],oi.prototype,"selectedFx",void 0),t([ht({type:String})],oi.prototype,"filter",void 0),t([ht()],oi.prototype,"controllerId",void 0),oi=t([ut("wled-effect-chips")],oi);let ri=class extends gt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return q`
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
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...vt,r`
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
    `]}};t([ht({type:Array})],ri.prototype,"presets",void 0),ri=t([ut("wled-preset-bar")],ri);const ai={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let li=class extends gt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.selectedSegId=-1,this._loading=!0,this._error="",this._segId=0,this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast=""}onPoweredConnect(){this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=Ct(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){this._selectSeg(t),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await xt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id)}await this._refreshMeta(),await this._loadPresets()}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await async function(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=It(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=$t(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_patchSeg(t){const e=this._activeSeg();if(!e||!this._optimistic)return;const i={...e,...t,id:e.id,sel:!0,on:void 0!==t.on?t.on:!1!==e.on},s=this._segments.findIndex(t=>t.id===e.id);if(s>=0){const t=[...this._segments];t[s]=i,this._segments=t}this._syncHaSegment(e,t),this._optimistic.push(At(e.id,t,this._segments),i)}_selectSeg(t){this._segId=t,this._colorSlot=0,this._refreshMeta(),this.connection&&this.controllerId&&wt(this.connection,this.controllerId,At(t,{sel:!0},this._segments));const e=this._segments.findIndex(e=>e.id===t);if(e>=0){const e=this._segments.map(e=>({...e,sel:e.id===t}));this._segments=e}}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push($t(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail,n=this._cols(e);n[this._colorSlot]=[i[0],i[1],i[2],s],this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]])})}_onAwm(t){this._patchSeg({awm:t.detail.awm})}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await wt(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return q`<p class="muted">Loading segments…</p>`;if(this._error)return q`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return q`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,n=s?.sliders??{},o=!1!==s?.colors_enabled?3:1;return q`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?q`<p class="toast" role="status">${this._toast}</p>`:null}
        <div class="seg-bar" role="tablist" aria-label="Segments">
          ${this._segments.map(t=>q`
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

        ${!this.compact&&this._presets.length?q`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${o>1?q`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,o).map((t,e)=>q`
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
          .controllerId=${this.controllerId}
          .effectsByName=${this._snapshot?.effects_by_name??{}}
          .soundFlags=${this._snapshot?.sound_flags??[]}
          .selectedFx=${t.fx??0}
          .filter=${this.compact?"":this._effectFilter}
          @effect-select=${this._onEffectSelect}
        ></wled-effect-chips>

        <div class="sliders">
          ${Object.entries(ai).map(([e,i])=>{if(!n[e])return null;const s=t[e];return q`
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
    `}_labelForSeg(t){const e=this._snapshot?.segment_entities??[],i=e.find(e=>It(t.id,[e])===e.entity_id)??e.find(e=>e.segment_index===t.id);return`${i?.name?.replace(/^.*\s—\s/,"")??`Seg ${t.id+1}`} (${t.start??"?"}–${t.stop??"?"})`}get segments(){return this._segments}static{this.styles=[...vt,r`
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
    `]}};async function ci(t,e){return await bt(t),t.sendMessagePromise({...e,schema_version:1})}async function hi(t,e,i){return(await ci(t,{type:"wled_studio/layout_save",controller_id:e,layout:i})).layout??i}async function di(t,e,i,s){return(await ci(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}t([ht({attribute:!1})],li.prototype,"connection",void 0),t([ht({attribute:!1})],li.prototype,"hass",void 0),t([ht()],li.prototype,"controllerId",void 0),t([ht({type:Boolean})],li.prototype,"compact",void 0),t([ht({type:Number})],li.prototype,"selectedSegId",void 0),t([dt()],li.prototype,"_loading",void 0),t([dt()],li.prototype,"_error",void 0),t([dt()],li.prototype,"_segId",void 0),t([dt()],li.prototype,"_segments",void 0),t([dt()],li.prototype,"_snapshot",void 0),t([dt()],li.prototype,"_meta",void 0),t([dt()],li.prototype,"_effectFilter",void 0),t([dt()],li.prototype,"_presets",void 0),t([dt()],li.prototype,"_colorSlot",void 0),t([dt()],li.prototype,"_toast",void 0),li=t([ut("wled-segment-controls")],li);const ui="#6366f1";function pi(t,e,i){return t+(e-t)*i}let _i=class extends gt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput="",this._status="",this._busy=!1,this._drag=null,this._viewOx=0,this._viewOy=0,this._viewScale=1,this._onPointerDown=t=>{t.preventDefault();const[e,i]=this._canvasXY(t),s=this._hitVertex(e,i);s>=0&&(this._selectedVtx=s,this._anchorInput=String(this._vertices[s].anchorLed??""),this._drag={idx:s,ox:e,oy:i},this._canvas?.setPointerCapture(t.pointerId)),this._paint()},this._onPointerMove=t=>{if(!this._drag)return;const[e,i]=this._canvasXY(t),[s,n]=this._canvasToModel(e,i),o=[...this._vertices];o[this._drag.idx]={...o[this._drag.idx],x:s,y:n},this._vertices=o,this._paint()},this._onPointerUp=t=>{this._drag&&(this._canvas?.releasePointerCapture(t.pointerId),this._drag=null,this._refreshPositions())},this._onDblClick=t=>{const[e,i]=this._pointerCanvasXY(t.clientX,t.clientY);if(this._hitVertex(e,i)>=0)return;const[s,n]=this._canvasToModel(e,i);this._vertices=[...this._vertices,{x:s,y:n,anchorLed:null}],this._selectedVtx=this._vertices.length-1,this._anchorInput="",this._paint(),this._refreshPositions()},this._onContextMenu=t=>{t.preventDefault();const[e,i]=this._pointerCanvasXY(t.clientX,t.clientY),s=this._hitVertex(e,i);s<0||(this._vertices=this._vertices.filter((t,e)=>e!==s),this._selectedVtx===s?this._selectedVtx=-1:this._selectedVtx>s&&this._selectedVtx--,this._paint(),this._refreshPositions())}}onPoweredConnect(){this._loadLayout()}firstUpdated(){this._canvasWrap=this.renderRoot.querySelector(".canvas-wrap")??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._canvasWrap&&this._resizeObs.observe(this._canvasWrap),this._bindCanvas(),this._onResize()}updated(t){super.updated(t),this._bindCanvas(),(t.has("connection")||t.has("layoutId")||t.has("fixtureId"))&&this._loadLayout()}_bindCanvas(){const t=this.renderRoot.querySelector("canvas")??void 0;t&&t!==this._boundCanvas&&(this._unbindCanvas(),this._canvas=t,this._boundCanvas=t,this._ctx=t.getContext("2d",{alpha:!0})??void 0,t.addEventListener("pointerdown",this._onPointerDown),t.addEventListener("pointermove",this._onPointerMove),t.addEventListener("pointerup",this._onPointerUp),t.addEventListener("pointercancel",this._onPointerUp),t.addEventListener("dblclick",this._onDblClick),t.addEventListener("contextmenu",this._onContextMenu))}_unbindCanvas(){const t=this._boundCanvas;t&&(t.removeEventListener("pointerdown",this._onPointerDown),t.removeEventListener("pointermove",this._onPointerMove),t.removeEventListener("pointerup",this._onPointerUp),t.removeEventListener("pointercancel",this._onPointerUp),t.removeEventListener("dblclick",this._onDblClick),t.removeEventListener("contextmenu",this._onContextMenu),this._boundCanvas=void 0)}disconnectedCallback(){this._resizeObs?.disconnect(),this._unbindCanvas(),super.disconnectedCallback()}_onResize(){const t=this._canvas,e=this._canvasWrap;if(!t||!e)return;const i=e.getBoundingClientRect(),s=window.devicePixelRatio||1,n=Math.max(1,Math.floor(i.width*s)),o=Math.max(1,Math.floor(i.height*s));t.width===n&&t.height===o||(t.width=n,t.height=o),this._fitView(),this._paint()}_fitView(){if(0===this._vertices.length)return this._viewOx=40,this._viewOy=40,void(this._viewScale=1);const t=this._canvas;if(!t)return;let e=1/0,i=-1/0,s=1/0,n=-1/0;for(const t of this._vertices)t.x<e&&(e=t.x),t.x>i&&(i=t.x),t.y<s&&(s=t.y),t.y>n&&(n=t.y);const o=i-e||100,r=n-s||100,a=Math.min((t.width-96)/o,(t.height-96)/r,4);this._viewScale=a,this._viewOx=48-e*a,this._viewOy=48-s*a}_vtxToCanvas(t){return[t.x*this._viewScale+this._viewOx,t.y*this._viewScale+this._viewOy]}_canvasToModel(t,e){return[(t-this._viewOx)/this._viewScale,(e-this._viewOy)/this._viewScale]}_pointerCanvasXY(t,e){const i=this._canvas,s=i.getBoundingClientRect(),n=s.width>0?i.width/s.width:1,o=s.height>0?i.height/s.height:1;return[(t-s.left)*n,(e-s.top)*o]}_isClosingDuplicate(t){if(t<=0||this._vertices.length<3)return!1;const e=this._vertices.length-1;if(t!==e)return!1;const i=this._vertices[0],s=this._vertices[e];return Math.hypot(i.x-s.x,i.y-s.y)<.5}_hitVertex(t,e){let i=-1,s=15;for(let n=0;n<this._vertices.length;n++){if(this._isClosingDuplicate(n))continue;const[o,r]=this._vtxToCanvas(this._vertices[n]),a=Math.hypot(t-o,e-r);if(a>14)continue;const l=null!==this._vertices[n].anchorLed,c=i>=0&&null!==this._vertices[i].anchorLed;(i<0||a<s-.5||Math.abs(a-s)<=1&&l&&!c)&&(i=n,s=a)}return i}_canvasXY(t){return this._pointerCanvasXY(t.clientX,t.clientY)}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const i=e.width,s=e.height;t.clearRect(0,0,i,s),t.fillStyle="#111827",t.fillRect(0,0,i,s);const n=this._vertices;if(0===n.length)return t.fillStyle="rgba(255,255,255,0.25)",t.font="14px sans-serif",t.textAlign="center",void t.fillText("Double-click to add vertices",i/2,s/2);t.fillStyle="rgba(120,220,120,0.65)";for(const{x:e,y:i}of this._ledPositions){const s=e*this._viewScale+this._viewOx,n=i*this._viewScale+this._viewOy;t.beginPath(),t.arc(s,n,3,0,2*Math.PI),t.fill()}const o=n.length>=2&&this._isClosingDuplicate(n.length-1)?n.slice(0,-1):n;if(o.length>=2){t.beginPath(),t.strokeStyle="rgba(99,102,241,0.6)",t.lineWidth=2;const[e,i]=this._vtxToCanvas(o[0]);t.moveTo(e,i);for(let e=1;e<o.length;e++){const[i,s]=this._vtxToCanvas(o[e]);t.lineTo(i,s)}n.length>=3&&(this._isClosingDuplicate(n.length-1)||Math.hypot(n[0].x-n[n.length-1].x,n[0].y-n[n.length-1].y)<.5)&&t.closePath(),t.stroke()}for(let e=0;e<n.length;e++){const i=n[e],[s,o]=this._vtxToCanvas(i),r=null!==i.anchorLed,a=e===this._selectedVtx,l=r?9:7;t.beginPath(),t.arc(s,o,l,0,2*Math.PI),t.fillStyle=a?"white":r?"#f59e0b":ui,t.fill(),a&&(t.strokeStyle=ui,t.lineWidth=2,t.stroke()),r&&null!==i.anchorLed&&(t.fillStyle="#111",t.font=`bold ${Math.max(9,l-1)}px monospace`,t.textAlign="center",t.textBaseline="middle",t.fillText(String(i.anchorLed),s,o)),t.fillStyle="rgba(255,255,255,0.5)",t.font="10px sans-serif",t.textBaseline="bottom",t.textAlign="left",t.fillText(`v${e}`,s+l+2,o-2)}}async _loadLayout(){if(this.connection&&this.controllerId&&this.layoutId)try{const t=await async function(t,e,i){return(await ci(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}(this.connection,this.controllerId,this.layoutId);if(!t)return;const e=this._findFixture(t);if(!e)return void(this._vertices=[]);const i=e.points??[],s=e.anchors??[],n=new Map(s.map(t=>[t.vertex_index,t.led]));let o=i.map((t,e)=>({x:t[0],y:t[1],anchorLed:n.get(e)??null}));if(o.length>=2){const t=o[0],e=o[o.length-1];Math.hypot(t.x-e.x,t.y-e.y)<.5&&(o=o.slice(0,-1))}this._vertices=o,this._fitView(),await this._refreshPositions(),this._paint()}catch(t){this._status=t instanceof Error?t.message:String(t)}}_findFixture(t){const e=t.fixtures??[];return this.fixtureId?e.find(t=>t.id===this.fixtureId)??null:e[0]??null}async _refreshPositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{this._ledPositions=await di(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._paint()}catch{this._ledPositions=[]}}_buildLayout(){const t=this._vertices.map(t=>[t.x,t.y]),e=this._vertices.map((t,e)=>null!==t.anchorLed?{led:t.anchorLed,vertex_index:e}:null).filter(t=>null!==t);return{id:this.layoutId||"layout-0",controller_id:this.controllerId,name:"Layout",pixel_count:this.pixelCount,fixtures:[{id:this.fixtureId||"fixture-0",name:"Fixture",kind:"polyline",closed:!1,points:t,anchors:e}]}}async _save(){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._status="Saving…";try{await hi(this.connection,this.controllerId,this._buildLayout()),this._status="Saved",await this._refreshPositions()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_setAnchorLed(){const t=this._selectedVtx;if(t<0)return;const e=this._anchorInput.trim(),i=""===e?null:parseInt(e,10);if(null!==i&&(isNaN(i)||i<0||i>=this.pixelCount))return;const s=[...this._vertices];s[t]={...s[t],anchorLed:i},this._vertices=s,this._paint()}_mirrorSliderMax(){return Math.max(0,this.pixelCount-1)}_onMirrorSlider(t){const e=t.target,i=parseInt(e.value,10);if(isNaN(i)||0===this._vertices.length)return;const s=[...this._vertices];for(let t=0;t<s.length;t++){const e=s[t].anchorLed;if(null===e)continue;const n=e/this._mirrorSliderMax(),o=Math.round(pi(0,i,n));s[t]={...s[t],anchorLed:o}}this._vertices=s,this._paint()}render(){const t=this._vertices[this._selectedVtx];return q`
      <div class="designer">
        <div class="canvas-wrap">
          <canvas></canvas>
        </div>
        <div class="sidebar">
          <div class="instructions">
            <strong>Controls</strong>
            <ul>
              <li>Double-click canvas → add vertex</li>
              <li>Drag vertex → move</li>
              <li>Right-click vertex → delete</li>
              <li>Click vertex → select & set anchor LED</li>
            </ul>
          </div>

          ${void 0!==t?q`
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

          ${this._status?q`<p class="status">${this._status}</p>`:null}

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
    `}static{this.styles=[...vt,r`
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
    `]}};t([ht({attribute:!1})],_i.prototype,"connection",void 0),t([ht()],_i.prototype,"controllerId",void 0),t([ht()],_i.prototype,"layoutId",void 0),t([ht()],_i.prototype,"fixtureId",void 0),t([ht({type:Number})],_i.prototype,"pixelCount",void 0),t([dt()],_i.prototype,"_vertices",void 0),t([dt()],_i.prototype,"_ledPositions",void 0),t([dt()],_i.prototype,"_selectedVtx",void 0),t([dt()],_i.prototype,"_anchorInput",void 0),t([dt()],_i.prototype,"_status",void 0),t([dt()],_i.prototype,"_busy",void 0),_i=t([ut("wled-layout-designer")],_i);let fi=class extends gt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this._positions=[],this._status="waiting",this._raf=0}setFrame(t){t&&(this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",o=4*s;8===n.length?(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=parseInt(n.slice(6,8),16)):(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._resolvePositions(),this._attachLiveStream()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect()}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._attachLiveStream())}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this)),this._onResize()}_onResize(){const t=this._canvas;if(!t)return;const e=this.getBoundingClientRect(),i=Math.max(320,e.width||320),s=Math.max(200,e.height||200);t.width===i&&t.height===s||(t.width=i,t.height=s,this._schedPaint())}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{this._positions=await di(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._schedPaint()}catch{this._positions=[]}}_attachLiveStream(){if(!this.connection||!this.controllerId)return;const t=yt(this.connection,this.controllerId,t=>{this.setFrame(t)});this.addUnsub(t)}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const i=e.width,s=e.height;t.clearRect(0,0,i,s),t.fillStyle="#0d0d0d",t.fillRect(0,0,i,s);const n=this._pixels,o=this._positions,r=this.dotRadius;if(o.length>0){let e=1/0,a=-1/0,l=1/0,c=-1/0;for(const t of o)t.x<e&&(e=t.x),t.x>a&&(a=t.x),t.y<l&&(l=t.y),t.y>c&&(c=t.y);const h=3*r,d=(i-2*h)/(a-e||1),u=(s-2*h)/(c-l||1),p=Math.min(d,u),_=this.remote.state.disableBloom;for(const{x:i,y:s,led:a}of o){const o=h+(i-e)*p,c=h+(s-l)*p;let d=80,u=80,f=80;if(n){const t=4*a;d=n[t],u=n[t+1],f=n[t+2]}!_&&(d>10||u>10||f>10)?(t.shadowColor=`rgba(${d},${u},${f},0.7)`,t.shadowBlur=2.5*r):t.shadowBlur=0,t.beginPath(),t.arc(o,c,r,0,2*Math.PI),t.fillStyle=`rgb(${d},${u},${f})`,t.fill()}t.shadowBlur=0}else{const e=this.pixelCount,o=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(n){const t=4*i;e=n[t],s=n[t+1],l=n[t+2]}t.beginPath(),t.arc(4+i*o+o/2,a,r,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}render(){return q`
      <div
        class="wrap"
        role="img"
        aria-label="LED geometry preview — positions mapped from fixture layout"
      >
        <canvas></canvas>
        ${"live"!==this._status?q`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[...vt,r`
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
    `]}};t([ht({attribute:!1})],fi.prototype,"connection",void 0),t([ht()],fi.prototype,"controllerId",void 0),t([ht()],fi.prototype,"layoutId",void 0),t([ht()],fi.prototype,"fixtureId",void 0),t([ht({type:Number})],fi.prototype,"pixelCount",void 0),t([ht({type:Number})],fi.prototype,"dotRadius",void 0),t([dt()],fi.prototype,"_positions",void 0),t([dt()],fi.prototype,"_status",void 0),fi=t([ut("wled-geometry-preview")],fi);let vi=class extends gt{constructor(){super(...arguments),this.controllerId="",this._layouts=[],this._status="Loading layouts…",this._busy=!1,this._viewMode="list",this._activeLayoutId="",this._activeFixtureId="",this._activePixelCount=210,this._onDesignerSave=async()=>{await this._load(),this._activeLayoutId&&await this._applySegments(this._activeLayoutId)}}onPoweredConnect(){this._load(),this._attachLive()}onPoweredDisconnect(){this._liveUnsub?.(),this._liveUnsub=void 0}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId"))&&(this._load(),this._attachLive())}_attachLive(){this._liveUnsub?.(),this.connection&&this.controllerId&&(this._liveUnsub=yt(this.connection,this.controllerId,t=>{this._forwardFrame(t)}))}_forwardFrame(t){const e=this.renderRoot.querySelector("wled-geometry-preview");e?.setFrame(t)}async _load(){if(this.connection&&this.controllerId)try{this._layouts=await async function(t,e){return(await ci(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}(this.connection,this.controllerId),this._status=0===this._layouts.length?"No layouts yet — use the button below to seed the kitchen-island template.":`${this._layouts.length} layout(s) saved`}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _seedKitchenIsland(){if(this.connection&&this.controllerId){this._busy=!0;try{await hi(this.connection,this.controllerId,(t=this.controllerId,{id:"kitchen-island",controller_id:t,name:"Kitchen island",pixel_count:210,fixtures:[{id:"kitchen-island",name:"Kitchen island",kind:"polyline",closed:!0,points:[[0,0],[100,0],[110,10],[200,10]],anchors:[{led:0,vertex_index:0},{led:85,vertex_index:1},{led:96,vertex_index:2},{led:186,vertex_index:3}]}]})),await this._load()}finally{this._busy=!1}var t}}async _applySegments(t){if(this.connection&&this.controllerId){this._busy=!0;try{await async function(t,e,i,s){return ci(t,{type:"wled_studio/layout_to_segments",controller_id:e,layout_id:i,fixture_id:s})}(this.connection,this.controllerId,t),this._status="WLED segments updated from layout anchors"}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_openDesigner(t){this._activeLayoutId=String(t.id);const e=t.fixtures[0];this._activeFixtureId=e?String(e.id??"fixture-0"):"fixture-0",this._activePixelCount=t.pixel_count??210,this._viewMode="designer"}render(){return"designer"===this._viewMode?this._renderDesigner():this._renderList()}_renderList(){return q`
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

        ${this._layouts.length>0?q`
              <ul class="layout-list">
                ${this._layouts.map(t=>q`
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
    `}_renderDesigner(){return q`
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

        ${this._status?q`<p class="status-line">${this._status}</p>`:null}
      </div>
    `}static{this.styles=[...vt,r`
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
    `]}};t([ht({attribute:!1})],vi.prototype,"connection",void 0),t([ht()],vi.prototype,"controllerId",void 0),t([dt()],vi.prototype,"_layouts",void 0),t([dt()],vi.prototype,"_status",void 0),t([dt()],vi.prototype,"_busy",void 0),t([dt()],vi.prototype,"_viewMode",void 0),t([dt()],vi.prototype,"_activeLayoutId",void 0),t([dt()],vi.prototype,"_activeFixtureId",void 0),t([dt()],vi.prototype,"_activePixelCount",void 0),vi=t([ut("wled-view-layout")],vi);const gi="wled-studio-panel";let mi=class extends gt{constructor(){super(...arguments),this._view="devices",this._controllerId=""}onPoweredConnect(){this._loadController()}async _loadController(){if(this.hass?.connection)try{const t=await async function(t){await bt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}(this.hass.connection),e=t[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}catch{}}render(){const t=this.remote.state;return q`
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
            ${t.isRemote?q`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <section class="content" aria-live="polite">
            ${"layout"===this._view&&this._controllerId&&this.hass?.connection?q`
                  <wled-view-layout
                    .connection=${this.hass.connection}
                    .controllerId=${this._controllerId}
                  ></wled-view-layout>
                `:"segments"===this._view&&this._controllerId&&this.hass?.connection?q`
                    <wled-segment-controls
                      .hass=${this.hass}
                      .connection=${this.hass.connection}
                      .controllerId=${this._controllerId}
                    ></wled-segment-controls>
                  `:q`
                  <p>
                    View: <strong>${this._view}</strong>
                    ${"segments"===this._view?" — connect a WLED Studio controller first.":" — expanded in later phases."}
                  </p>
                `}
          </section>
        </main>
      </div>
    `}_navItem(t,e,i){const s=this._view===t;return q`
      <button
        class="nav ${s?"active":""}"
        aria-current=${s?"page":"false"}
        @click=${()=>{this._view=t}}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_toggleDrawer(){}static{this.styles=[...vt,r`
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
      `]}};t([dt()],mi.prototype,"_view",void 0),t([dt()],mi.prototype,"_controllerId",void 0),mi=t([ut(gi)],mi),customElements.get(gi)||customElements.define(gi,mi),console.info("[wled-studio] panel bundle loaded",{panel:gi});export{gi as PANEL_TAG,mi as WledStudioPanel};
//# sourceMappingURL=wled-studio-panel.js.map
