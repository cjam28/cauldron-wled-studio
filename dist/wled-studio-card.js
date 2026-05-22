function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,I=t=>t,S=$.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,A=`<${P}>`,M=document,L=()=>M.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,B=/>/g,U=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,F=/"/g,W=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,G=M.createTreeWalker(M,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===z?"!--"===l[1]?r=O:void 0!==l[1]?r=B:void 0!==l[2]?(W.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=o??z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?F:D):r===F||r===D?r=U:r===O||r===B?r=z:(r=U,o=void 0);const d=r===U&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+A:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=X.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[n++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Z}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===j)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=R(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Q=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new X(t)),e}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const n of e)o===i.length?i.push(s=new t(this.O(L()),this.O(L()),this,this.options)):s=i[o],s._$AI(n),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=I(t).nextSibling;I(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Y(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Y(this,s[i+r],e,r),a===j&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}};class et extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}let it=class extends Z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??q)===j)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(X,Q),($.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(L(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ct=(t=lt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function pt(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}function ut(t){return(e,i)=>(customElements.get(t)||customElements.define(t,e),e)}const _t=r`
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
`,ft=r`
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
`;class gt{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const mt=[_t,ft];class vt extends rt{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new gt(this),this._visible=!0,this._inView=!0}static{this.styles=mt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}function bt(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}t([ht({attribute:!1})],vt.prototype,"hass",void 0);const yt=/^[0-9a-fA-F]+$/;function wt(t,e,i,s){let o,n=!1;const r=async()=>{o?.(),o=void 0,n||(o=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let o=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&yt.test(e)){if(8===e.length)o=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let n=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(n=t)}return{leds_hex:s,n:n,channels:o,scale:n/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};r();const a=bt(t,()=>{r()});return()=>{n=!0,a(),o?.(),o=void 0}}async function xt(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",o),i(new Error("Home Assistant WebSocket not connected"))},15e3),o=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",o),e())};t.addEventListener("ready",o)})}async function $t(t){await xt(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}function It(t,e,i=100){let s,o,n;const r=()=>{if(s&&clearTimeout(s),o&&clearTimeout(o),s=o=void 0,n){const e=n;n=void 0,t(...e)}},a=(...t)=>{n=t,s&&clearTimeout(s),s=setTimeout(r,e),o||(o=setTimeout(r,i))};return a.cancel=()=>{s&&clearTimeout(s),o&&clearTimeout(o),s=o=void 0,n=void 0},a}async function St(t,e){await xt(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function kt(t,e,i,s){await xt(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}async function Et(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}function Ct(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function Pt(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function At(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}async function Mt(t,e){return await xt(t),t.sendMessagePromise({...e,schema_version:1})}async function Lt(t,e){return(await Mt(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}const Rt=.55,Nt=1,Tt=1,zt=0,Ot=0,Bt=0,Ut=1,Dt=0,Ft=0,Wt=1,Ht=1;function jt(t){return function(t,e){return t?{url:t,opacity:e?.opacity??Rt,brightness:e?.brightness??Nt,saturation:e?.saturation??Tt,rotation:e?.rotation??zt,offsetX:e?.offsetX??Ot,offsetY:e?.offsetY??Bt,scale:e?.scale??Ut,cropX:e?.cropX??Dt,cropY:e?.cropY??Ft,cropW:e?.cropW??Wt,cropH:e?.cropH??Ht}:null}(t.background?.url??t.background_url,t.background??null)}function qt(t,e=!1){return new Promise((i,s)=>{const o=new Image;o.onload=()=>i(o),o.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(o,t,e)})}let Vt=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),o=t.leds_hex[e]??"000000",n=4*s;8===o.length?(i[n]=parseInt(o.slice(0,2),16),i[n+1]=parseInt(o.slice(2,4),16),i[n+2]=parseInt(o.slice(4,6),16),i[n+3]=parseInt(o.slice(6,8),16)):(i[n]=parseInt(o.slice(0,2),16),i[n+1]=parseInt(o.slice(2,4),16),i[n+2]=parseInt(o.slice(4,6),16),i[n+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,o=i.stop??i.len??this.pixelCount;return t>=s&&t<o}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:o,h:n}=this._logicalCanvasSize();return[(t-s.left)/s.width*o,(e-s.top)/s.height*n]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,o]=i,{w:n,h:r}=this._logicalCanvasSize(),a=this._layoutMap(n,r);if(!a)return null;const{toCanvas:l,hitR:c}=a;let h=null,d=c*c;for(const t of this._positions){const[e,i]=l(t.x,t.y),n=e-s,r=i-o,a=n*n+r*r;a<d&&(d=a,h=t)}return h}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const o of this._positions)o.x<t&&(t=o.x),o.x>e&&(e=o.x),o.y<i&&(i=o.y),o.y>s&&(s=o.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:o,rangeX:n,rangeY:r}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,c=(t-2*l)/n,h=(e-2*l)/r,d=Math.min(c,h),p=Math.max(2.5,1.35*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-o)*d],hitR:Math.max(10,2.5*p),lineW:p}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--primary-color").trim()||"#18a0fb"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),o=Math.min(2,window.devicePixelRatio||1),n=Math.floor(i*o),r=Math.floor(s*o);if(t.width!==n||t.height!==r){t.width=n,t.height=r;const e=this._ctx;e&&e.setTransform(o,0,0,o,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await async function(t,e,i){return(await Mt(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=jt(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await async function(t,e,i,s){return(await Mt(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?qt(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=wt(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle="#0d0d0d",t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&function(t,e,i,s,o){const n=o.opacity??Rt,r=o.brightness??1,a=o.saturation??1,l=(o.rotation??0)*Math.PI/180,c=(o.offsetX??0)*e,h=(o.offsetY??0)*i,d=o.scale??1,p=o.cropX??0,u=o.cropY??0,_=o.cropW??1,f=o.cropH??1,g=s.naturalWidth*_,m=s.naturalHeight*f,v=s.naturalWidth*p,b=s.naturalHeight*u,y=Math.max(e/g,i/m)*d,w=g*y,x=m*y;t.save(),t.globalAlpha=n,t.filter=`brightness(${r}) saturate(${a})`,t.translate(e/2+c,i/2+h),t.rotate(l),t.drawImage(s,v,b,g,m,-w/2,-x/2,w,x),t.restore()}(t,i,s,this._bgImage,this._bgLayer);const o=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,n=[...this._positions].sort((t,e)=>t.led-e.led),r=this.dotRadius,a=this._layoutMap(i,s);if(n.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const r=(n,r)=>{const[a,l]=e(n.x,n.y),[c,h]=e(r.x,r.y),[d,p,u]=this._rgbForLed(o,n.led);!s&&(d>10||p>10||u>10)?(t.shadowColor=`rgba(${d},${p},${u},0.55)`,t.shadowBlur=1.5*i):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${p},${u})`,t.beginPath(),t.moveTo(a,l),t.lineTo(c,h),t.stroke()};for(let t=0;t<n.length-1;t++)r(n[t],n[t+1]);this._closed&&n.length>=2&&r(n[n.length-1],n[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of n){const[n,c]=e(i,a),[h,d,p]=this._rgbForLed(o,l);!s&&(h>10||d>10||p>10)?(t.shadowColor=`rgba(${h},${d},${p},0.7)`,t.shadowBlur=2.5*r):t.shadowBlur=0,t.beginPath(),t.arc(n,c,r,0,2*Math.PI),t.fillStyle=`rgb(${h},${d},${p})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,n,e):this._paintSegmentSelection(t,n,e,i)}else{const e=this.pixelCount,n=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(o){const t=4*i;e=o[t],s=o[t+1],l=o[t+2]}t.beginPath(),t.arc(4+i*n+n/2,a,r,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[o,n]=i(s.x,s.y),r=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(o,n,r,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(o-r-4,n),t.lineTo(o+r+4,n),t.moveTo(o,n-r-4),t.lineTo(o,n+r+4),t.stroke(),t.restore()}_paintSegmentSelection(t,e,i,s){const o=this.selectedSegId>=0?this.selectedSegId:this._hoverLed>=0?this._segmentForLed(this._hoverLed):-1;if(o<0||0===this.segments.length)return;const n=e.filter(t=>this._ledInSegment(t.led,o)).sort((t,e)=>t.led-e.led);if(n.length<2)return;const r=this._accentStroke(),a=()=>{const[e,s]=i(n[0].x,n[0].y);t.beginPath(),t.moveTo(e,s);for(let e=1;e<n.length;e++){const[s,o]=i(n[e].x,n[e].y);t.lineTo(s,o)}};t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0,t.strokeStyle="rgba(0, 0, 0, 0.45)",t.lineWidth=s+6,a(),t.stroke(),t.strokeStyle="rgba(255, 255, 255, 0.55)",t.lineWidth=s+3,a(),t.stroke(),t.strokeStyle=r,t.lineWidth=2,a(),t.stroke(),t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return H`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:H`
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
          ${e?H`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?H`<span class="overlay">No layout — create one in Layout view</span>`:null}
        </div>
      </div>
    `}static{this.styles=[...mt,r`
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
        border-radius: 8px;
        overflow: hidden;
        background: #0d0d0d;
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
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
    `]}};function Gt(t,e){const i=new Set(t);return i.has(e)?i.delete(e):i.add(e),[...i].sort((t,e)=>t-e)}function Jt(t,e){const i=t.id,s=e.find(t=>t.wled_segment_id===i||t.segment_index===i||t.entity_id.endsWith(`_segment_${i}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||s?.name?.replace(/^.*\s—\s/,"")||`Seg ${i+1}`} (${t.start??"?"}–${t.stop??"?"})`}function Xt(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}t([ht({attribute:!1})],Vt.prototype,"connection",void 0),t([ht()],Vt.prototype,"controllerId",void 0),t([ht()],Vt.prototype,"layoutId",void 0),t([ht()],Vt.prototype,"fixtureId",void 0),t([ht({type:Number})],Vt.prototype,"pixelCount",void 0),t([ht({type:Number})],Vt.prototype,"dotRadius",void 0),t([ht({type:Boolean,reflect:!0})],Vt.prototype,"compact",void 0),t([ht({type:Number})],Vt.prototype,"heightPx",void 0),t([ht({type:Boolean})],Vt.prototype,"externalLive",void 0),t([ht({type:Boolean,reflect:!0})],Vt.prototype,"paintMode",void 0),t([ht({type:Boolean})],Vt.prototype,"paintLivePreview",void 0),t([ht({type:Number})],Vt.prototype,"paintBrushSize",void 0),t([ht({type:Array})],Vt.prototype,"segments",void 0),t([ht({type:Number})],Vt.prototype,"selectedSegId",void 0),t([dt()],Vt.prototype,"_positions",void 0),t([dt()],Vt.prototype,"_status",void 0),t([dt()],Vt.prototype,"_showDots",void 0),t([dt()],Vt.prototype,"_closed",void 0),Vt=t([ut("wled-geometry-preview")],Vt);const Yt={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Sound",palette:"Palette"};function Kt(t){return void 0!==t.Solid?t.Solid:0}const Qt="wled_studio.segment_snapshot",Zt="wled_studio.merge_for_effects",te=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function ee(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function ie(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function se(t){return Boolean(ee(Zt)[t])}function oe(t,e){const i=ee(Zt);e?i[t]=!0:delete i[t],ie(Zt,i)}function ne(t){return ee(Qt)[t]??null}function re(t){return{seg:t.segments.map(t=>function(t){const e=t,i={id:t.id};for(const t of te){const s=e[t];void 0!==s&&(i[t]=s)}return i}(t))}}function ae(t,e){const i=t.find(t=>0===t.id);return i?[0]:t.length?[t[0].id]:[0]}function le(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:Pt(t.col),awm:t.awm};return JSON.stringify(e)}function ce(t,e,i){let s,o=null,n=0;const r=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await St(t,e)).segments??[]).find(t=>t.id===n);if(!s||!o)return;const r=le(o);if(r===le(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(Pt(t.col))!==JSON.stringify(Pt(e.col))}(o,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=It((s,a)=>{o=a,n=a.id,kt(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(o={...a,...i,id:a.id}),r()}).catch(t=>{i(a,`Failed to apply state to WLED: ${Xt(t)}`)})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var he,de,pe,ue,_e,fe={},ge=[],me=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function ve(t,e){for(var i in e)t[i]=e[i];return t}function be(t){var e=t.parentNode;e&&e.removeChild(t)}function ye(t,e,i){var s,o,n,r,a=arguments;if(e=ve({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(o in t.defaultProps)void 0===e[o]&&(e[o]=t.defaultProps[o]);return r=e.key,null!=(n=e.ref)&&delete e.ref,null!=r&&delete e.key,we(t,e,r,n)}function we(t,e,i,s){var o={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return he.vnode&&he.vnode(o),o}function xe(t){return t.children}function $e(t,e){this.props=t,this.context=e}function Ie(t,e){if(null==e)return t.__p?Ie(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?Ie(t):null}function Se(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return Se(t)}}function ke(t){(!t.__d&&(t.__d=!0)&&1===de.push(t)||ue!==he.debounceRendering)&&(ue=he.debounceRendering,(he.debounceRendering||pe)(Ee))}function Ee(){var t,e,i,s,o,n,r,a;for(de.sort(function(t,e){return e.__v.__b-t.__v.__b});t=de.pop();)t.__d&&(i=void 0,s=void 0,n=(o=(e=t).__v).__e,r=e.__P,a=e.u,e.u=!1,r&&(i=[],s=Re(r,o,ve({},o),e.__n,void 0!==r.ownerSVGElement,null,i,a,null==n?Ie(o):n),Ne(i,o),s!=n&&Se(o)))}function Ce(t,e,i,s,o,n,r,a,l){var c,h,d,p,u,_,f,g=i&&i.__k||ge,m=g.length;if(a==fe&&(a=null!=n?n[0]:m?Ie(i,0):null),c=0,e.__k=Pe(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=g[c])||d&&i.key==d.key&&i.type===d.type)g[c]=void 0;else for(h=0;h<m;h++){if((d=g[h])&&i.key==d.key&&i.type===d.type){g[h]=void 0;break}d=null}if(p=Re(t,i,d=d||fe,s,o,n,r,null,a,l),(h=i.ref)&&d.ref!=h&&(f||(f=[])).push(h,i.__c||p,i),null!=p){if(null==_&&(_=p),null!=i.l)p=i.l,i.l=null;else if(n==d||p!=a||null==p.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(p);else{for(u=a,h=0;(u=u.nextSibling)&&h<m;h+=2)if(u==p)break t;t.insertBefore(p,a)}"option"==e.type&&(t.value="")}a=p.nextSibling,"function"==typeof e.type&&(e.l=p)}}return c++,i}),e.__e=_,null!=n&&"function"!=typeof e.type)for(c=n.length;c--;)null!=n[c]&&be(n[c]);for(c=m;c--;)null!=g[c]&&Oe(g[c],g[c]);if(f)for(c=0;c<f.length;c++)ze(f[c],f[++c],f[++c])}function Pe(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Pe(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return we(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=we(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Ae(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===me.test(e)?i+"px":null==i?"":i}function Me(t,e,i,s,o){var n,r,a,l,c;if("key"===(e=o?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(n=t.style,"string"==typeof i)n.cssText=i;else{if("string"==typeof s&&(n.cssText="",s=null),s)for(r in s)i&&r in i||Ae(n,r,"");if(i)for(a in i)s&&i[a]===s[a]||Ae(n,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Le,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Le,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!o&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Le(t){return this.t[t.type](he.event?he.event(t):t)}function Re(t,e,i,s,o,n,r,a,l,c){var h,d,p,u,_,f,g,m,v,b,y=e.type;if(void 0!==e.constructor)return null;(h=he.__b)&&h(e);try{t:if("function"==typeof y){if(m=e.props,v=(h=y.contextType)&&s[h.__c],b=h?v?v.props.value:h.__p:s,i.__c?g=(d=e.__c=i.__c).__p=d.__E:("prototype"in y&&y.prototype.render?e.__c=d=new y(m,b):(e.__c=d=new $e(m,b),d.constructor=y,d.render=Be),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=b,d.__n=s,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=y.getDerivedStateFromProps&&ve(d.__s==d.state?d.__s=ve({},d.__s):d.__s,y.getDerivedStateFromProps(m,d.__s)),p)null==y.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&r.push(d);else{if(null==y.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,b),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,b)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,b)}for(u=d.props,_=d.state,d.context=b,d.props=m,d.state=d.__s,(h=he.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=Pe(null!=h&&h.type==xe&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=ve(ve({},s),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(u,_)),Ce(t,e,i,s,o,n,r,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);p||null==u||null==d.componentDidUpdate||d.componentDidUpdate(u,_,f),g&&(d.__E=d.__p=null)}else e.__e=Te(i.__e,e,i,s,o,n,r,c);(h=he.diffed)&&h(e)}catch(t){he.__e(t,e,i)}return e.__e}function Ne(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){he.__e(t,i.__v)}he.__c&&he.__c(e)}function Te(t,e,i,s,o,n,r,a){var l,c,h,d,p=i.props,u=e.props;if(o="svg"===e.type||o,null==t&&null!=n)for(l=0;l<n.length;l++)if(null!=(c=n[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,n[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(u);t=o?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),n=null}return null===e.type?p!==u&&(null!=n&&(n[n.indexOf(t)]=null),t.data=u):e!==i&&(null!=n&&(n=ge.slice.call(t.childNodes)),h=(p=i.props||fe).dangerouslySetInnerHTML,d=u.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,o){var n;for(n in i)n in e||Me(t,n,null,i[n],s);for(n in e)o&&"function"!=typeof e[n]||"value"===n||"checked"===n||i[n]===e[n]||Me(t,n,e[n],i[n],s)}(t,u,p,o,a),e.__k=e.props.children,d||Ce(t,e,i,s,"foreignObject"!==e.type&&o,n,r,fe,a),a||("value"in u&&void 0!==u.value&&u.value!==t.value&&(t.value=null==u.value?"":u.value),"checked"in u&&void 0!==u.checked&&u.checked!==t.checked&&(t.checked=u.checked))),t}function ze(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){he.__e(t,i)}}function Oe(t,e,i){var s,o,n;if(he.unmount&&he.unmount(t),(s=t.ref)&&ze(s,null,e),i||"function"==typeof t.type||(i=null!=(o=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){he.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(n=0;n<s.length;n++)s[n]&&Oe(s[n],e,i);null!=o&&be(o)}function Be(t,e,i){return this.constructor(t,i)}function Ue(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function De(){return De=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t},De.apply(this,arguments)}he={},$e.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=ve({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&ve(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),ke(this))},$e.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,ke(this))},$e.prototype.render=xe,de=[],pe="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ue=he.debounceRendering,he.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return ke(s.__E=s)}catch(e){t=e}throw t},_e=fe;var Fe="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",We="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",He="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",je=new RegExp("rgb"+We),qe=new RegExp("rgba"+He),Ve=new RegExp("hsl"+We),Ge=new RegExp("hsla"+He),Je="^(?:#?|0x?)",Xe="([0-9a-fA-F]{1})",Ye="([0-9a-fA-F]{2})",Ke=new RegExp(Je+Xe+Xe+Xe+"$"),Qe=new RegExp(Je+Xe+Xe+Xe+Xe+"$"),Ze=new RegExp(Je+Ye+Ye+Ye+"$"),ti=new RegExp(Je+Ye+Ye+Ye+Ye+"$"),ei=Math.log,ii=Math.round,si=Math.floor;function oi(t,e,i){return Math.min(Math.max(t,e),i)}function ni(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function ri(t){return parseInt(t,16)}function ai(t){return t.toString(16).padStart(2,"0")}var li=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=De({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=De({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,o=si(e),n=e-o,r=s*(1-i),a=s*(1-n*i),l=s*(1-(1-n)*i),c=o%6,h=[l,s,s,a,r,r][c],d=[r,r,l,s,s,a][c];return{r:oi(255*[s,a,r,r,l,s][c],0,255),g:oi(255*h,0,255),b:oi(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,o=Math.max(e,i,s),n=Math.min(e,i,s),r=o-n,a=0,l=o,c=0===o?0:r/o;switch(o){case n:a=0;break;case e:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-e)/r+2;break;case s:a=(e-i)/r+4}return{h:60*a%360,s:oi(100*c,0,100),v:oi(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,o=s<=1?s:2-s,n=o<1e-9?0:e*i/o;return{h:t.h,s:oi(100*n,0,100),l:oi(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:oi(100*s,0,100),v:oi((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,o=t/100;return o<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=o-2)+104.49216199393888*ei(i),s=o<20?0:.8274096064007395*(s=o-10)-254.76935184120902+115.67994401066147*ei(s)):(e=351.97690566805693+.114206453784165*(e=o-55)-40.25366309332127*ei(e),i=325.4494125711974+.07943456536662342*(i=o-50)-28.0852963507957*ei(i),s=255),{r:oi(si(e),0,255),g:oi(si(i),0,255),b:oi(si(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,o=e.b,n=2e3,r=4e4;r-n>.4;){i=.5*(r+n);var a=t.kelvinToRgb(i);a.b/a.r>=o/s?r=i:n=i}return i},Ue(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=De({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return De({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=De({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=De({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=De({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=De({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,o=e.b;return{r:ii(i),g:ii(s),b:ii(o)}},set:function(e){this.hsv=De({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return De({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,o=e.l;return{h:ii(i),s:ii(s),l:ii(o)}},set:function(e){this.hsv=De({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return De({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,o,n=1;if((e=je.exec(t))?(i=ni(e[1],255),s=ni(e[2],255),o=ni(e[3],255)):(e=qe.exec(t))&&(i=ni(e[1],255),s=ni(e[2],255),o=ni(e[3],255),n=ni(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:o,a:n}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+ai(t.r)+ai(t.g)+ai(t.b)},set:function(t){var e,i,s,o,n=255;if((e=Ke.exec(t))?(i=17*ri(e[1]),s=17*ri(e[2]),o=17*ri(e[3])):(e=Qe.exec(t))?(i=17*ri(e[1]),s=17*ri(e[2]),o=17*ri(e[3]),n=17*ri(e[4])):(e=Ze.exec(t))?(i=ri(e[1]),s=ri(e[2]),o=ri(e[3])):(e=ti.exec(t))&&(i=ri(e[1]),s=ri(e[2]),o=ri(e[3]),n=ri(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:o,a:n/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+ai(t.r)+ai(t.g)+ai(t.b)+ai(si(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,o,n=1;if((e=Ve.exec(t))?(i=ni(e[1],360),s=ni(e[2],100),o=ni(e[3],100)):(e=Ge.exec(t))&&(i=ni(e[1],360),s=ni(e[2],100),o=ni(e[3],100),n=ni(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:o,a:n}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function ci(t){var e,i=t.width,s=t.sliderSize,o=t.borderWidth,n=t.handleRadius,r=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*r+2*n,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*r-2*n,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-o/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function hi(t,e){var i=ci(t),s=i.width,o=i.height,n=i.handleRange,r=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var o=t.minTemperature,n=t.maxTemperature-o,r=(e.kelvin-o)/n*100;return Math.max(0,Math.min(r,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:o/2,h=r+l/100*n;return a&&(h=-1*h+n+2*r),{x:a?c:h,y:a?h:c}}var di,pi=2*Math.PI,ui=function(t,e){return Math.sqrt(t*t+e*e)};function _i(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function fi(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function gi(t,e,i){var s=t.wheelAngle,o=t.wheelDirection;return i&&"clockwise"===o?e=s+e:"clockwise"===o?e=360-s+e:i&&"anticlockwise"===o?e=s+180-e:"anticlockwise"===o&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function mi(t,e,i){var s=fi(t),o=s.cx,n=s.cy,r=_i(t);e=o-e,i=n-i;var a=gi(t,Math.atan2(-i,-e)*(360/pi)),l=Math.min(ui(e,i),r);return{h:Math.round(a),s:Math.round(100/r*l)}}function vi(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function bi(t,e,i){var s=vi(t),o=s.width,n=s.height,r=s.radius,a=(e-r)/(o-2*r)*100,l=(i-r)/(n-2*r)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function yi(t){di||(di=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),o=window.location;return(i||s)&&di.length>0?o.protocol+"//"+o.host+o.pathname+o.search+t:t}function wi(t,e,i,s){for(var o=0;o<s.length;o++){var n=s[o].x-e,r=s[o].y-i;if(Math.sqrt(n*n+r*r)<t.handleRadius)return o}return null}function xi(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function $i(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function Ii(t){return"string"==typeof t?t:t+"px"}var Si=["mousemove","touchmove","mouseup","touchend"],ki=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,o=null===t.margin?t.sliderMargin:t.margin,n={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(n[s?"marginLeft":"marginTop"]=o),ye(xe,null,t.children(this.uid,i,n))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var o=t.touches?t.changedTouches[0]:t,n=o.clientX-s.left,r=o.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(n,r,0)&&Si.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(n,r,1);break;case"mouseup":case"touchend":i(n,r,2),Si.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}($e);function Ei(t){var e=t.r,i=t.url,s=e,o=e;return ye("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+Ii(t.x)+", "+Ii(t.y)+")",willChange:"transform",top:Ii(-e),left:Ii(-e),width:Ii(2*e),height:Ii(2*e),position:"absolute",overflow:"visible"}},i&&ye("use",Object.assign({xlinkHref:yi(i)},t.props)),!i&&ye("circle",{cx:s,cy:o,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&ye("circle",{cx:s,cy:o,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Ci(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=ci(t),o=s.width,n=s.height,r=s.radius,a=hi(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var o=[],n=t.minTemperature,r=t.maxTemperature,a=r-n,l=n,c=0;l<r;l+=a/8,c+=1){var h=li.kelvinToRgb(l),d=h.r,p=h.g,u=h.b;o.push([12.5*c,"rgb("+d+","+p+","+u+")"])}return o;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var _=li.hsvToHsl({h:i.h,s:0,v:i.v}),f=li.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var g=li.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]]}}(t,i);return ye(ki,Object.assign({},t,{onInput:function(e,s,o){var n=function(t,e,i){var s,o=ci(t),n=o.handleRange,r=o.handleStart;s="horizontal"===t.layoutDirection?-1*i+n+r:e-r,s=Math.max(Math.min(s,n),0);var a=Math.round(100/n*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=n,t.onInput(o,t.id)}}),function(e,s,c){return ye("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:Ii(o),height:Ii(n),borderRadius:Ii(r),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),ye("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:Ii(r),background:$i("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},xi(t))}),ye(Ei,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Pi(t){var e=vi(t),i=e.width,s=e.height,o=e.radius,n=t.colors,r=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=n.map(function(e){return function(t,e){var i=vi(t),s=i.width,o=i.height,n=i.radius,r=e.hsv,a=n,l=s-2*n,c=o-2*n;return{x:a+r.s/100*l,y:a+(c-r.v/100*c)}}(t,e)});return ye(ki,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var o=wi(t,e,i,h);null!==o?r.setActiveColor(o):(r.inputActive=!0,l.hsv=bi(t,e,i),t.onInput(s,t.id))}else 1===s&&(r.inputActive=!0,l.hsv=bi(t,e,i));t.onInput(s,t.id)}}),function(e,r,a){return ye("div",Object.assign({},r,{className:"IroBox",style:Object.assign({},{width:Ii(i),height:Ii(s),position:"relative"},a)}),ye("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:Ii(o)},xi(t),{background:$i("linear","to bottom",c[1])+","+$i("linear","to right",c[0])})}),n.filter(function(t){return t!==l}).map(function(e){return ye(Ei,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),ye(Ei,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}Ei.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Ci.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Ai(t){var e=fi(t).width,i=t.colors;t.borderWidth;var s=t.parent,o=t.color,n=o.hsv,r=i.map(function(e){return function(t,e){var i=e.hsv,s=fi(t),o=s.cx,n=s.cy,r=_i(t),a=(180+gi(t,i.h,!0))*(pi/360),l=i.s/100*r,c="clockwise"===t.wheelDirection?-1:1;return{x:o+l*Math.cos(a)*c,y:n+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return ye(ki,Object.assign({},t,{onInput:function(e,i,n){if(0===n){if(!function(t,e,i){var s=fi(t),o=s.cx,n=s.cy,r=t.width/2;return ui(o-e,n-i)<r}(t,e,i))return!1;var a=wi(t,e,i,r);null!==a?s.setActiveColor(a):(s.inputActive=!0,o.hsv=mi(t,e,i),t.onInput(n,t.id))}else 1===n&&(s.inputActive=!0,o.hsv=mi(t,e,i));t.onInput(n,t.id)}}),function(s,l,c){return ye("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:Ii(e),height:Ii(e),position:"relative"},c)}),ye("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),ye("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&ye("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-n.v/100})}),ye("div",{className:"IroWheelBorder",style:Object.assign({},a,xi(t))}),i.filter(function(t){return t!==o}).map(function(e){return ye(Ei,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[e.index].x,y:r[e.index].y})}),ye(Ei,{isActive:!0,index:o.index,fill:o.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[o.index].x,y:r[o.index].y}))})}var Mi=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new li(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var o=this.activeEvents;!!o.hasOwnProperty(t)&&o[t]||(o[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),o[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var o=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(o[t]||(o[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Ai},{component:Ci}],e.transparency&&s.push({component:Ci,options:{sliderType:"alpha"}})),ye("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var o=t.component,n=t.options;return ye(o,Object.assign({},e,n,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}($e);Mi.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Li,Ri,Ni,Ti=(Ri=function(t,e){var i,s=document.createElement("div");function o(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,o,n;he.__p&&he.__p(t,e),o=(s=i===_e)?null:e.__k,t=ye(xe,null,[t]),n=[],Re(e,e.__k=t,o||fe,fe,void 0!==e.ownerSVGElement,o?null:ge.slice.call(e.childNodes),n,!1,fe,s),Ne(n,t)}(ye(Li,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o),i},Ri.prototype=(Li=Mi).prototype,Object.assign(Ri,Li),Ri.__component=Li,Ri);!function(t){var e;t.version="5.5.2",t.Color=li,t.ColorPicker=Ti,(e=t.ui||(t.ui={})).h=ye,e.ComponentBase=ki,e.Handle=Ei,e.Slider=Ci,e.Wheel=Ai,e.Box=Pi}(Ni||(Ni={}));var zi=Ni;const Oi="wled_studio.color_swatches";function Bi(t){return t.trim()||"_default"}function Ui(){try{const t=localStorage.getItem(Oi);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function Di(t){const e=Ui()[Bi(t)];return Array.isArray(e)?[...e]:[]}function Fi(t,e){const i=Ui();var s;i[Bi(t)]=e.slice(0,32),s=i,localStorage.setItem(Oi,JSON.stringify(s))}function Wi(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function Hi(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let ji=class extends vt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName=""}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=Di(this.controllerId)}_currentKey(){return Wi(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=Hi(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=Di(t),s=Wi(e.rgb,e.white),o=i.find(t=>Wi(t.rgb,t.white)===s);if(o)return o.name=e.name.trim()||o.name,Fi(t,i),o;const n={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||Hi(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(n),Fi(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=Di(t),o=s.findIndex(t=>t.id===e);if(o<0)return null;const n=s[o],r={...n,...i,rgb:i.rgb?[...i.rgb]:n.rgb};void 0!==i.name&&(r.name=i.name.trim()||Hi(r.rgb,r.white)),s[o]=r,Fi(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e.stopPropagation(),function(t,e){const i=Di(t).filter(t=>t.id!==e);Fi(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}render(){const t=this._currentKey();return H`
      <section class="swatches" aria-label="Saved color swatches">
        <div class="head">
          <span class="label">Saved colors</span>
          <button
            type="button"
            class="save-btn"
            ?disabled=${this._saving}
            @click=${()=>this._openSave()}
            aria-label="Save current color as swatch"
          >
            <ha-icon icon="mdi:bookmark-plus-outline"></ha-icon>
            Save swatch
          </button>
        </div>

        ${this._saving?H`
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

        ${this._editingId?H`
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

        ${0!==this._swatches.length||this._saving?H`
              <div class="grid" role="list">
                ${this._swatches.map(e=>H`
                    <div
                      class="chip-wrap ${Wi(e.rgb,e.white)===t?"active":""}"
                      role="listitem"
                    >
                      <button
                        type="button"
                        class="chip"
                        title=${e.name}
                        style="background: ${this._swatchCss(e)}"
                        @click=${()=>this._apply(e)}
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
                          @click=${t=>this._delete(e.id,t)}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    </div>
                  `)}
              </div>
            `:H`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
      </section>
    `}static{this.styles=[...mt,r`
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
        opacity: 0.85;
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
        opacity: 0.65;
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
      .chip-wrap:focus-within .chip-actions {
        opacity: 1;
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
    `]}};t([ht()],ji.prototype,"controllerId",void 0),t([ht({type:Array})],ji.prototype,"rgb",void 0),t([ht({type:Number})],ji.prototype,"white",void 0),t([dt()],ji.prototype,"_swatches",void 0),t([dt()],ji.prototype,"_saving",void 0),t([dt()],ji.prototype,"_saveName",void 0),t([dt()],ji.prototype,"_editingId",void 0),t([dt()],ji.prototype,"_editName",void 0),ji=t([ut("wled-color-swatch-bar")],ji);let qi=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}firstUpdated(){this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this._picker?t.has("rgb")&&this._syncPicker():this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>this._tryMountOrResize()),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this._tryMountOrResize())}_wheelSize(t){const e=Math.min(t.width,t.height);return Math.max(120,Math.min(160,Math.floor(e)||140))}_tryMountOrResize(){const t=this._host;if(!t)return;const e=t.getBoundingClientRect();if(e.width<8||e.height<8)return;const i=this._wheelSize(e);this._picker?i!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(i),this._lastSize=i):this._createPicker(t,i)}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=zi.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"#555",layout:[{component:zi.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return H`
      <div class="picker">
        <div class="wrap">
        <div class="wheel-host" aria-label="Color wheel"></div>
        <div class="extras">
          ${this.showWhite?H`
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
        ${this.controllerId?H`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `:null}
      </div>
    `}static{this.styles=[...mt,r`
      .picker {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .wheel-host {
        width: 140px;
        height: 140px;
        flex-shrink: 0;
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
    `]}};t([ht({type:Array,hasChanged:(t,e)=>!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],qi.prototype,"rgb",void 0),t([ht({type:Number})],qi.prototype,"white",void 0),t([ht({type:Number})],qi.prototype,"awm",void 0),t([ht({type:Boolean})],qi.prototype,"showWhite",void 0),t([ht()],qi.prototype,"controllerId",void 0),t([pt(".wheel-host")],qi.prototype,"_host",void 0),qi=t([ut("wled-color-wheel-rgbw")],qi);function Vi(t,e="strip",i,s=0){let o=String(t);return s&&(o=`${o}_p${s}`),i?.trim()&&(o=`${o}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${o}_${e}.webp`}function Gi(t,e,i="strip",s,o,n){if(!t||e<0)return;const r=void 0!==n?function(t,e,i="strip",s){const o=e instanceof Set?e:new Set(e);if(!o.size)return;const n=[Vi(t,i,s),Vi(t,i)];for(const t of n)if(o.has(t))return t;const r=`${t}_`,a=`_${i}.webp`;for(const t of o)if(t.startsWith(r)&&t.endsWith(a))return t}(e,n,i,s):Vi(e,i,s);return r?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,r),o):void 0}const Ji="wled_studio.recent_effects",Xi="wled_studio.recent_scenes";function Yi(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Ki(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Qi(t){return t?Yi(Ji)[t]??[]:[]}function Zi(t,e=72,i=6,s=10){if(t<=0)return 1;const o=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/o)))}let ts=class extends vt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e;return H`
      <button
        class="tile"
        type="button"
        aria-label=${this.label||`Effect ${this.fxId}`}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${i?H`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:H`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Number})],ts.prototype,"fxId",void 0),t([ht()],ts.prototype,"thumbUrl",void 0),t([ht()],ts.prototype,"thumbUrlAnimated",void 0),t([ht()],ts.prototype,"label",void 0),t([dt()],ts.prototype,"_hover",void 0),ts=t([ut("wled-effect-tile")],ts);let es=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this._category="all",this._recentEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){this._recentEntries=Qi(this.controllerId)}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=Zi(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=Kt(this.effectsByName),s=e.filter(e=>!!function(t,e,i,s,o){if("all"===i)return!0;const n=s[e]??null,r=t.toLowerCase();return"solid"===i?e===Kt(o):"2d"===i?"2"===n||r.includes("2d"):"1d"===i?"2"!==n&&!r.includes("2d"):"sound"===i?"v"===n||"f"===n:"palette"!==i||r.includes("palette")||r.includes("colorloop")||r.includes("pride")||r.includes("cycle")}(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),o=this.showRecents&&!t&&this._recentEntries.length>0,n=this._recentEntries.slice(0,this._recentVisible);return H`
      <div class="wrap">
        ${o?H`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${n.map(t=>{const e=t.id,s=t.name,o=this.soundFlags[e],n=e===this.selectedFx;return H`
                      <button
                        type="button"
                        class="recent-chip ${n?"active":""}"
                        aria-pressed=${n}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===o?H`<span class="badge">♪</span>`:null}
                        ${"f"===o?H`<span class="badge">♫</span>`:null}
                        ${"2"===o?H`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>H`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t}
                @click=${()=>{this._category=t}}
              >
                ${Yt[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?H`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],o=e===this.selectedFx,n=Gi(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames);return n?H`
                    <wled-effect-tile
                      class="chip-tile ${o?"active":""}"
                      role="option"
                      aria-selected=${o}
                      .fxId=${e}
                      .thumbUrl=${n}
                      .label=${t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"")}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:H`
                  <button
                    type="button"
                    class="chip ${o?"active":""}"
                    role="option"
                    aria-selected=${o}
                    @click=${()=>this._pick(e,i)}
                  >
                    ${t}
                    ${"v"===s?H`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?H`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?H`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <p class="count">${s.length} effects</p>
      </div>
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return Qi(t);const o=Yi(Ji),n=(o[t]??[]).filter(t=>t.id!==e);return n.unshift({id:e,name:i}),o[t]=n.slice(0,10),Ki(Ji,o),o[t]}(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Object})],es.prototype,"effectsByName",void 0),t([ht({type:Array})],es.prototype,"soundFlags",void 0),t([ht({type:Number})],es.prototype,"selectedFx",void 0),t([ht({type:String})],es.prototype,"filter",void 0),t([ht()],es.prototype,"controllerId",void 0),t([ht()],es.prototype,"fwVer",void 0),t([ht({type:Array})],es.prototype,"thumbBasenames",void 0),t([ht({type:Boolean})],es.prototype,"toggleOff",void 0),t([ht({type:Boolean})],es.prototype,"showRecents",void 0),t([dt()],es.prototype,"_category",void 0),t([dt()],es.prototype,"_recentEntries",void 0),t([dt()],es.prototype,"_recentVisible",void 0),es=t([ut("wled-effect-chips")],es);let is=class extends vt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=se(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=se(this.controllerId))}render(){const t=ne(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return H`
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
          ${e?H`<span class="saved">${e}</span>`:null}
        </span>
      </label>
      ${this._error?H`<p class="err">${this._error}</p>`:null}
      ${this._busy?H`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await St(this.connection,this.controllerId),e=t.segments??this.segments,i=t.info?.leds,s=Number(i?.count)||this.pixelCount;!function(t,e,i){const s={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:i},o=ee(Qt);o[t]=s,ie(Qt,o)}(this.controllerId,e,s);const o=function(t,e,i){const s=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],o=i?.length?new Set(i):null,n=o?s.filter(t=>o.has(t.id)):s,r=n.filter(t=>(t.stop??0)>(t.start??0)),a=r.length?r:n.length?n:s,l=Math.min(...a.map(t=>t.start??0)),c=Math.max(...a.map(t=>t.stop??e)),h=a[0],d={id:0,start:l,stop:c,on:!1!==h.on,sel:!0,bri:h.bri??255,fx:h.fx??0,n:"Merged (effects)"};void 0!==h.col&&(d.col=h.col),void 0!==h.pal&&(d.pal=h.pal);const p=[d];for(const t of s){if(0===t.id)continue;const e=t.stop??t.start??0;p.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:p}}(e,s,this.editIds.length?this.editIds:void 0);await kt(this.connection,this.controllerId,o,{fullResponse:!0}),oe(this.controllerId,!0),this._merged=!0}else{const t=ne(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await kt(this.connection,this.controllerId,re(t),{fullResponse:!0}),oe(this.controllerId,!1),function(t){const e=ee(Qt);delete e[t],ie(Qt,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[...mt,r`
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
    `]}};t([ht({attribute:!1})],is.prototype,"connection",void 0),t([ht()],is.prototype,"controllerId",void 0),t([ht({type:Array})],is.prototype,"segments",void 0),t([ht({type:Array})],is.prototype,"editIds",void 0),t([ht({type:Number})],is.prototype,"pixelCount",void 0),t([dt()],is.prototype,"_merged",void 0),t([dt()],is.prototype,"_busy",void 0),t([dt()],is.prototype,"_error",void 0),is=t([ut("wled-effect-merge-toggle")],is);let ss=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return H`
      <div class="bar" aria-label="WLED presets">
        ${t.length?H`
              <div class="ql-row">
                ${t.map(t=>H`
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
          ${e.map(t=>H`
              <li>
                <button class="named" @click=${()=>this._pick(t.id)}>
                  <span class="id">${t.id}</span>
                  <span class="name">${t.name}</span>
                  ${t.ql?H`<span class="ql-badge">${t.ql}</span>`:null}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `}_pick(t){this.dispatchEvent(new CustomEvent("preset-select",{detail:{presetId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Array})],ss.prototype,"presets",void 0),ss=t([ut("wled-preset-bar")],ss);const os={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ns=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.selectedSegId=-1,this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast="",this._mergeActive=!1}onPoweredConnect(){this._mergeActive=se(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=ce(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await St(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=se(this.controllerId);const e=this._pixelCount(),i=this._segments.find(t=>0===t.id),s=(i?.stop??0)-(i?.start??0);this._mergeActive&&this._segments.length>1&&e>0&&s<.9*e&&(oe(this.controllerId,!1),this._mergeActive=!1,this._toast="Merge for effects was turned off — WLED is using a multi-segment layout."),this._mergeActive&&(this._editIds=ae(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(t=>t.id),this._segId=this._segments[0].id)}catch(t){this._error=Xt(t)}finally{this._loading=!1}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Et(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=function(t,e){for(const i of e){if(i.wled_segment_id===t)return i.entity_id;if(At(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=Ct(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(t=>t.id);if(this._mergeActive){const t=ae(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=se(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const i=[...this._segments];for(const s of e){const e=i.findIndex(t=>t.id===s);if(e<0)continue;const o=i[e];i[e]={...o,...t,id:s,sel:!0,on:void 0!==t.on?t.on:!1!==o.on},this._syncHaSegment(o,t)}this._segments=i;const s=this._activeSeg();this._optimistic.push(function(t,e,i){const s=new Set(t),o=(i.length?i:t.map(t=>({id:t}))).map(t=>s.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:o}}(e,t,this._segments),s??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await kt(this.connection,this.controllerId,function(t,e){const i=new Set(t);return{seg:e.map(t=>({id:t.id,sel:i.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=Gt(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(Ct(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail,o=this._cols(e);o[this._colorSlot]=[i[0],i[1],i[2],s];const n=Kt(this._snapshot?.effects_by_name??{});this._patchSeg({col:o.map(t=>[t[0],t[1],t[2],t[3]]),fx:n}),this._refreshMeta()}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,i,s=0){return await xt(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:i,bus_index:s})).rgbwm??i}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){this._toast=t instanceof Error?t.message:String(t),this.requestUpdate()}}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await kt(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return H`<p class="muted">Loading segments…</p>`;if(this._error)return H`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return H`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,o=s?.sliders??{},n=!1!==s?.colors_enabled?3:1,r=this._snapshot?.rgbwm??0;return H`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?H`<p class="toast" role="status">${this._toast}</p>`:null}
        ${this.wholeMode?H`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?H`
              <wled-effect-merge-toggle
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this.wholeMode?null:this._mergeActive?H`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:H`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode||this._mergeActive?null:H`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(t=>H`
              <button
                class="seg-tab ${this._editIds.includes(t.id)?"editing":""} ${t.id===this._segId?"focus":""}"
                aria-pressed=${this._editIds.includes(t.id)}
                @click=${()=>this._toggleSegEdit(t.id)}
              >
                ${Jt(t,this._snapshot?.segment_entities??[])}
              </button>
            `)}
        </div>
            `}

        ${!this.compact&&this._presets.length?H`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${t=>this._loadPreset(t.detail.presetId)}
              ></wled-preset-bar>
            `:null}

        ${n>1?H`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${["Primary","Secondary","Tertiary"].slice(0,n).map((t,e)=>H`
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
          .controllerId=${this.controllerId}
          .rgb=${[i[0],i[1],i[2]]}
          .white=${i[3]}
          .awm=${r}
          .showWhite=${(this._snapshot?.led_order??0)>0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${this.compact?null:H`
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
          ${Object.entries(os).map(([e,i])=>{if(!o[e])return null;const s=t[e];return H`
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
    `}get segments(){return this._segments}static{this.styles=[...mt,r`
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
    `]}};t([ht({attribute:!1})],ns.prototype,"connection",void 0),t([ht({attribute:!1})],ns.prototype,"hass",void 0),t([ht()],ns.prototype,"controllerId",void 0),t([ht({type:Boolean})],ns.prototype,"compact",void 0),t([ht({type:Boolean})],ns.prototype,"wholeMode",void 0),t([ht({type:Number})],ns.prototype,"selectedSegId",void 0),t([dt()],ns.prototype,"_loading",void 0),t([dt()],ns.prototype,"_error",void 0),t([dt()],ns.prototype,"_segId",void 0),t([dt()],ns.prototype,"_editIds",void 0),t([dt()],ns.prototype,"_segments",void 0),t([dt()],ns.prototype,"_snapshot",void 0),t([dt()],ns.prototype,"_meta",void 0),t([dt()],ns.prototype,"_effectFilter",void 0),t([dt()],ns.prototype,"_presets",void 0),t([dt()],ns.prototype,"_colorSlot",void 0),t([dt()],ns.prototype,"_toast",void 0),t([dt()],ns.prototype,"_mergeActive",void 0),ns=t([ut("wled-segment-controls")],ns);class rs extends Error{constructor(t,e){super("Scene conflict"),this.name="SceneConflictError",this.remote=t,this.etag=e}}async function as(t,e){return await xt(t),t.sendMessagePromise({...e,schema_version:1})}async function ls(t,e){return(await as(t,{type:"wled_studio/scene_list",controller_id:e})).scenes??[]}let cs=class extends vt{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle"}render(){return this.segments.length?H`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(t=>H`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(t.id)?"on":""}"
                aria-pressed=${this.selectedIds.includes(t.id)}
                @click=${()=>this._toggle(t.id)}
              >
                ${Jt(t,this.segmentEntities)}
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(t){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,r`
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
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .btn.on {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
      }
    `]}};t([ht({type:Array})],cs.prototype,"segments",void 0),t([ht({type:Array})],cs.prototype,"selectedIds",void 0),t([ht({type:Array})],cs.prototype,"segmentEntities",void 0),t([ht()],cs.prototype,"hint",void 0),cs=t([ut("wled-segment-bar")],cs);let hs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._reload();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._rowEl&&(this._rowEl=e,this._ro?.observe(e),this._measure())}reload(){this._reload()}_reload(){var t;this._recents=(t=this.controllerId)?Yi(Xi)[t]??[]:[]}_measure(){const t=this._rowEl;if(!t)return;const e=Zi(t.clientWidth,88,8,8);e!==this._visibleCount&&(this._visibleCount=e)}render(){const t=this._recents.filter(t=>this.scenes.some(e=>e.id===t.id)).slice(0,this._visibleCount);return t.length?H`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${t.map(t=>H`
              <button
                type="button"
                class="chip"
                ?disabled=${this.disabled}
                @click=${()=>this.dispatchEvent(new CustomEvent("scene-select",{detail:{sceneId:t.id},bubbles:!0,composed:!0}))}
              >
                ${t.name}
              </button>
            `)}
        </div>
      </div>
    `:null}static{this.styles=[...mt,r`
      .block {
        margin-bottom: 14px;
      }
      .label {
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
        gap: 8px;
        overflow: hidden;
      }
      .chip {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 8px 10px;
        background: var(--card-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chip:hover:not(:disabled) {
        background: var(--secondary-background-color);
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `]}};t([ht()],hs.prototype,"controllerId",void 0),t([ht({type:Array})],hs.prototype,"scenes",void 0),t([ht({type:Boolean})],hs.prototype,"disabled",void 0),t([dt()],hs.prototype,"_recents",void 0),t([dt()],hs.prototype,"_visibleCount",void 0),hs=t([ut("wled-recent-scenes-row")],hs);let ds=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._toast="",this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[t,e]=await Promise.all([ls(this.connection,this.controllerId),St(this.connection,this.controllerId)]);if(this._scenes=t,this._snapshot=e,this._segments=[...e.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(t=>t.id);else{const t=new Set(this._segments.map(t=>t.id));this._applySegIds=this._applySegIds.filter(e=>t.has(e)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(t=>t.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(t){this._toggleApplySeg(t)}_toggleApplySeg(t){let e=Gt(this._applySegIds,t);e.length||(e=[t]),this._applySegIds=e}render(){const t=this.compact;return H`
      <div class="wrap ${t?"compact":""}">
        <header class="head">
          ${t?H`<span class="card-label">Scenes</span>`:H`
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

        ${this._status?H`<p class="status">${this._status}</p>`:null}
        ${this._toast?H`<p class="toast" role="status">${this._toast}</p>`:null}

        ${!t&&this._segments.length?H`
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

        ${this._conflict?H`
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
    `}_sceneTile(t){const e=t.transition_ms??2500;return H`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${t.name}`}
          ?disabled=${this._busy}
          @click=${()=>this._apply(t)}
        >
          <span class="tile-name">${t.name}</span>
          ${t.seeded?H`<span class="badge">Starter</span>`:null}
          <span class="tile-meta">${(e/1e3).toFixed(1)}s fade</span>
        </button>
        ${t.seeded?null:H`
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
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(t){if(this.connection){this._busy=!0,this._toast="",this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const e=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(t,e,i,s){await xt(t);const o={type:"wled_studio/scene_apply",schema_version:1,controller_id:e,scene_id:i,transition_ms:s?.transitionMs,segment_ids:s?.segmentIds?.length?s.segmentIds:void 0};return s?.signal?new Promise((e,i)=>{const n=()=>i(new DOMException("Aborted","AbortError"));s.signal?.aborted?n():(s.signal?.addEventListener("abort",n,{once:!0}),t.sendMessagePromise(o).then(t=>{s.signal?.removeEventListener("abort",n),e(t.state??{})}).catch(t=>{s.signal?.removeEventListener("abort",n),i(t)}))}):(await t.sendMessagePromise(o)).state??{}}(this.connection,this.controllerId,t.id,{signal:this._applyAbort.signal,segmentIds:e?void 0:[...this._applySegIds]}),function(t,e,i){if(!t)return[];const s=Yi(Xi),o=(s[t]??[]).filter(t=>t.id!==e);o.unshift({id:e,name:i}),s[t]=o.slice(0,10),Ki(Xi,s),s[t]}(this.controllerId,t.id,t.name),this._recentScenesRow()?.reload(),await this._load(),this._toast=`Applied ${t.name}`,this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){if("AbortError"!==t.name){const e=t.message||t.message||"error";this._toast=`Apply failed: ${e}`}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const t=this._captureName.trim();if(t){this._busy=!0,this._toast="";try{const e=await async function(t,e,i,s){return(await as(t,{type:"wled_studio/scene_capture",controller_id:e,name:i,scene_id:s?.sceneId,layout_id:s?.layoutId,transition_ms:2500})).scene??{id:"",controller_id:e,name:i,wled_state:{}}}(this.connection,this.controllerId,t);this._captureName="",this._toast=`Saved ${e.name}`,await this._load()}catch(t){this._toast=`Save failed: ${t.message||"error"}`}finally{this._busy=!1}}}async _delete(t){if(this.connection&&confirm(`Delete scene "${t.name}"?`)){this._busy=!0;try{await async function(t,e,i){await as(t,{type:"wled_studio/scene_delete",controller_id:e,scene_id:i})}(this.connection,this.controllerId,t.id),this._toast=`Deleted ${t.name}`,await this._load()}catch{this._toast="Delete failed"}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const t=this._scenes.find(t=>t.id===this._conflict?.id);if(t){this._busy=!0;try{await async function(t,e,i,s){try{return(await as(t,{type:"wled_studio/scene_save",controller_id:e,scene:i,if_match_etag:s?.ifMatchEtag})).scene??i}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new rs(e.data.scene,String(e.data.etag??e.message??""));throw t}}(this.connection,this.controllerId,t),this._conflict=void 0,this._toast="Scene overwritten",await this._load()}catch(t){t instanceof rs&&(this._conflict=t.remote)}finally{this._busy=!1}}}static{this.styles=[...mt,r`
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
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
      }
      .wrap.compact .tile-main {
        padding: 10px 8px;
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
        opacity: 0.75;
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
      .primary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .status,
      .toast {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .toast {
        color: var(--primary-color);
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
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
      @container wled-studio (min-width: 600px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
      }
      @container wled-studio (min-width: 900px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }
      .tile {
        display: flex;
        align-items: stretch;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .tile-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        padding: 14px 12px;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: left;
        transition: background var(--m-scene-confirm) ease;
      }
      .tile-main:hover:not(:disabled) {
        background: var(--secondary-background-color);
      }
      .tile-name {
        font-weight: 600;
        font-size: 0.95rem;
      }
      .badge {
        font-size: 0.7rem;
        opacity: 0.65;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tile-meta {
        font-size: 0.75rem;
        opacity: 0.6;
      }
      .icon-btn {
        border: none;
        border-left: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        padding: 0 10px;
        cursor: pointer;
      }
    `]}};function ps(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function us(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function _s(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function fs(t,e){await xt(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(Xt(t))}}async function gs(t,e,i,s){const o=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),n=s?.brush,r=s?.fill,a=n?_s(n,s?.effectsByName??{}):"color";await fs(t,{type:"wled_studio/paint_frame",controller_id:e,data:o,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...n?{brush:n}:{},...r?{fill:r}:{},..."effect"===a&&n?{effect_id:n.fx}:{}})}async function ms(t,e,i=!0){await fs(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function vs(t,e,i){const s=i?4:3,o=new Uint8ClampedArray(4*e);for(let n=0;n<e;n++){const e=n*s,r=4*n;o[r]=t[e]??0,o[r+1]=t[e+1]??0,o[r+2]=t[e+2]??0,o[r+3]=i?t[e+3]??0:255}return o}t([ht({attribute:!1})],ds.prototype,"connection",void 0),t([ht()],ds.prototype,"controllerId",void 0),t([ht({type:Boolean})],ds.prototype,"compact",void 0),t([dt()],ds.prototype,"_scenes",void 0),t([dt()],ds.prototype,"_status",void 0),t([dt()],ds.prototype,"_busy",void 0),t([dt()],ds.prototype,"_toast",void 0),t([dt()],ds.prototype,"_conflict",void 0),t([dt()],ds.prototype,"_captureName",void 0),t([dt()],ds.prototype,"_segments",void 0),t([dt()],ds.prototype,"_applySegIds",void 0),t([dt()],ds.prototype,"_snapshot",void 0),ds=t([ut("wled-view-scenes")],ds);const bs={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ys=class extends vt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await St(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=Xt(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await Et(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=Kt(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value,s=t.startsWith("o")?Number(i)>0:Number(i);this._emit({[t]:s})}render(){if(!this.settings)return null;const t=Ct(this.settings.col),e=this._meta,i=e?.sliders??{},s=this._snapshot?.rgbwm??0;return H`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?H`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?H`
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

        ${this._loadingEffects?H`<p class="muted">Loading effects…</p>`:H`
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
                ${Object.entries(bs).map(([t,e])=>{if(!i[t])return null;const s=this.settings[t];return"boolean"==typeof s?H`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${s}
                          @change=${e=>this._slider(t,e)}
                        />
                        ${e}
                      </label>
                    `:H`
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
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht({attribute:!1})],ys.prototype,"connection",void 0),t([ht({attribute:!1})],ys.prototype,"hass",void 0),t([ht()],ys.prototype,"controllerId",void 0),t([ht()],ys.prototype,"heading",void 0),t([ht({attribute:!1})],ys.prototype,"settings",void 0),t([ht({type:Boolean})],ys.prototype,"showOnToggle",void 0),t([dt()],ys.prototype,"_loadingEffects",void 0),t([dt()],ys.prototype,"_error",void 0),t([dt()],ys.prototype,"_snapshot",void 0),t([dt()],ys.prototype,"_meta",void 0),t([dt()],ys.prototype,"_effectFilter",void 0),ys=t([ut("wled-paint-settings")],ys);let ws=class extends vt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=ps(),this._fill=us("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,o=0;const n=(...n)=>{s=n;const r=Date.now(),a=r-o;if(a>=e)return o=r,i&&(clearTimeout(i),i=void 0),void t(...n);i||(i=setTimeout(()=>{i=void 0,o=Date.now(),s&&t(...s)},e-a))};return n.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},n}(()=>{this._flushNow()},20),this._flushEffect=It(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===_s(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([St(this.connection,this.controllerId),Lt(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=ps(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=Xt(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await ms(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return fs(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=Xt(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=vs(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,o=4*s;i[o]=this._buffer[t]??0,i[o+1]=this._buffer[t+1]??0,i[o+2]=this._buffer[t+2]??0,i[o+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=vs(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await ms(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=Xt(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await gs(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=Xt(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=us(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await ms(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=Xt(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await ms(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=Xt(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return H`
      <section class="paint ${e?"compact":""}">
        ${e?null:H`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?H`<p class="warn">${this._warn}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?H`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(t=>H`<option value=${t.id}>${t.name||t.id}</option>`)}
                </select>
              </label>
            `:t?null:H`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?H`open <strong>Studio → Layout</strong> first.`:H`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:H`
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
            ${"custom"===this._fill.mode?H`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?H`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:H`<p class="hint">Unpainted LEDs commit as off.</p>`}
          </div>
        </div>

        <div class="tools">
          <label>
            Brush size
            <input
              type="range"
              min="1"
              max="20"
              .value=${String(this._brushSize)}
              @input=${t=>{this._brushSize=parseInt(t.target.value,10),this._emitPaintConfig()}}
            />
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
    `}static{this.styles=[...mt,r`
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
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};var xs;t([ht({attribute:!1})],ws.prototype,"connection",void 0),t([ht({attribute:!1})],ws.prototype,"hass",void 0),t([ht()],ws.prototype,"controllerId",void 0),t([ht({type:Boolean,attribute:"embed-mode"})],ws.prototype,"embedMode",void 0),t([ht()],ws.prototype,"embedLayoutId",void 0),t([ht()],ws.prototype,"embedFixtureId",void 0),t([ht({type:Number})],ws.prototype,"embedPixelCount",void 0),t([dt()],ws.prototype,"_pixelCount",void 0),t([dt()],ws.prototype,"_rgbw",void 0),t([dt()],ws.prototype,"_active",void 0),t([dt()],ws.prototype,"_brush",void 0),t([dt()],ws.prototype,"_fill",void 0),t([dt()],ws.prototype,"_brushSize",void 0),t([dt()],ws.prototype,"_status",void 0),t([dt()],ws.prototype,"_warn",void 0),t([dt()],ws.prototype,"_effectsByName",void 0),t([dt()],ws.prototype,"_layouts",void 0),t([dt()],ws.prototype,"_layoutId",void 0),t([dt()],ws.prototype,"_fixtureId",void 0),t([pt("wled-geometry-preview")],ws.prototype,"_internalPreview",void 0),ws=t([ut("wled-view-paint")],ws);const $s="wled-studio-card",Is=[{id:"solid",label:"Solid",icon:"mdi:palette"},{id:"segments",label:"Segments",icon:"mdi:vector-line"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch"},{id:"paint",label:"Paint",icon:"mdi:brush"}];let Ss=class extends vt{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._previewStatus="connecting",this._hint="",this._layoutId="",this._fixtureId="",this._cardTab="solid",this._selectedSegId=-1,this._globalBriPct=null,this._segments=[],this._bootstrapGen=0,this._bootstrapControllerKey=""}static{xs=this}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 8}static getConfigElement(){const t=document.createElement("wled-studio-card-editor");return t.setConfig(xs.getStubConfig()),t}static getStubConfig(){return{type:`custom:${$s}`,controller:"Cloud",height:200}}updated(t){if(super.updated(t),this._syncSegmentsFromControls(),t.has("hass")&&null!==this._globalBriPct){const t=this._readGlobalBrightnessPct();Math.abs(t-this._globalBriPct)<=1&&(this._globalBriPct=null)}if(t.has("_cardTab")&&this._onCardTabChanged(t.get("_cardTab")),(t.has("_cardTab")||t.has("_paintPanel"))&&this._syncPaintPreview(),t.has("config"))return this._bindConnectionReady(),void this._bootstrap(!0);t.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}async _onCardTabChanged(t){"paint"===t&&"paint"!==this._cardTab&&await(this._paintPanel?.cancelLiveIfActive()),this._syncPaintPreview()}_syncPaintPreview(){const t="paint"===this._cardTab;this._preview&&(this._preview.paintMode=t,t&&this._paintPanel&&(this._preview.paintBrushSize=this._paintPanel.brushSize,this._preview.externalLive=this._paintPanel.paintExternalLive,this._preview.paintLivePreview=this._paintPanel.paintLivePreview,this._paintPanel.bindExternalPreview(this._preview)))}_onPaintStroke(t){this._paintPanel?.handleExternalPaintStroke(t)}_onPaintConfigChange(){this._syncPaintPreview()}_selectCardTab(t){t!==this._cardTab&&(this._cardTab=t)}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0,this._paintPanel?.cancelLiveIfActive()}_bindConnectionReady(){this.hass?.connection&&!this._offConnReady&&(this._offConnReady=bt(this.hass.connection,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(t){const e=(this.config?.controller??"").trim();if(!e)return t[0];const i=e.toLowerCase();return t.find(t=>{const s=String(t.title??"");return String(t.entry_id??"")===e||s===e||s.toLowerCase().includes(i)||s.toLowerCase().endsWith(`— ${i}`)||s.toLowerCase().endsWith(`- ${i}`)})??t[0]}_pickLayout(t){const e=(this.config?.layout_id??"").trim();return e?t.find(t=>t.id===e||t.name===e):t[0]}async _bootstrap(t=!1){if(!this.hass?.connection)return;const e=(this.config?.controller??"").trim();if(!t&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===e)return;const i=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this.requestUpdate());const s=[0,400,1200,2500];for(const t of s){if(i!==this._bootstrapGen||!this.isConnected)return;t>0&&await new Promise(e=>setTimeout(e,t));try{const t=await $t(this.hass.connection),s=this._pickController(t);if(!s?.entry_id){i===this._bootstrapGen&&(this._hint=0===t.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(i!==this._bootstrapGen)return;return this._controllerId=String(s.entry_id),this._masterEntity=String(s.master_entity_id??""),this._pixelCount=Number(s.pixel_count)||210,this._bootstrapControllerKey=e,this._hint="",await this._loadLayout(),this._startLive(),this._loadSegments(),void this.requestUpdate()}catch(t){const e=t instanceof Error?t.message:String(t??"unknown");i===this._bootstrapGen&&(this._hint=`Connecting… (${e})`,this.requestUpdate())}}i===this._bootstrapGen&&(this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}async _loadLayout(){if(this.hass?.connection&&this._controllerId)try{const t=await Lt(this.hass.connection,this._controllerId),e=this._pickLayout(t);if(!e)return this._layoutId="",void(this._fixtureId="");this._layoutId=e.id;const i=e.fixtures[0];this._fixtureId=i?String(i.id??"fixture-0"):"fixture-0",e.pixel_count&&(this._pixelCount=e.pixel_count),await(this._preview?.refresh())}catch{this._layoutId="",this._fixtureId=""}}_startLive(){if(!this.hass?.connection||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=wt(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}_onStripSegmentSelect(t){"segments"===this._cardTab&&(this._selectedSegId=t.detail.segmentId,this._segmentControls?.selectSegment(t.detail.segmentId))}_onSegmentChange(t){this._selectedSegId=t.detail.segmentId,this.requestUpdate()}async _loadSegments(){if(this.hass?.connection&&this._controllerId)try{const t=await St(this.hass.connection,this._controllerId);this._segments=t.segments??[],this._segments.length&&this._selectedSegId<0&&(this._selectedSegId=this._segments[0].id),this.requestUpdate()}catch{}}_syncSegmentsFromControls(){const t=this._segmentControls?.segments;t?.length&&(this._segments=t)}_readGlobalBrightnessPct(){if(!this.hass||!this._masterEntity)return 0;const t=this.hass.states[this._masterEntity];if(!t)return 0;const e=t.attributes.brightness_pct;if("number"==typeof e&&Number.isFinite(e))return Math.max(0,Math.min(100,Math.round(e)));const i=t.attributes.brightness;return"number"==typeof i&&Number.isFinite(i)?Math.round(Math.max(0,Math.min(255,i))/255*100):"on"===t.state?100:0}_globalBrightnessPct(){return null!==this._globalBriPct?this._globalBriPct:this._readGlobalBrightnessPct()}_onGlobalBriInput(t){this._globalBriPct=Number(t.target.value)}_setGlobalBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);this._globalBriPct=e;const i=Math.round(e/100*255);this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e}),this.hass.connection&&this._controllerId&&kt(this.hass.connection,this._controllerId,{bri:i,on:!0})}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_renderModeTabs(){return H`
      <div class="mode-tabs" role="tablist" aria-label="Control mode">
        ${Is.map(t=>H`
            <button
              type="button"
              role="tab"
              class="mode-tab ${this._cardTab===t.id?"active":""}"
              aria-selected=${this._cardTab===t.id?"true":"false"}
              @click=${()=>this._selectCardTab(t.id)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `)}
      </div>
    `}_renderTabPanel(){if(!this._controllerId||!this.hass?.connection)return null;const t=this.hass.connection,e=this.hass;switch(this._cardTab){case"solid":return H`
          <wled-segment-controls
            class="tab-panel"
            .hass=${e}
            .connection=${t}
            .controllerId=${this._controllerId}
            wholeMode
            compact
          ></wled-segment-controls>
        `;case"segments":return H`
          <wled-segment-controls
            class="tab-panel"
            .hass=${e}
            .connection=${t}
            .controllerId=${this._controllerId}
            .selectedSegId=${this._selectedSegId}
            compact
            @segment-change=${this._onSegmentChange}
          ></wled-segment-controls>
        `;case"scenes":return H`
          <wled-view-scenes
            class="tab-panel"
            .connection=${t}
            .controllerId=${this._controllerId}
            compact
          ></wled-view-scenes>
        `;case"paint":return H`
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
        `;default:return null}}render(){const t=this.config?.height??200,e=this.remote.state,i=`--wled-preview-height: ${t}px`,s="paint"===this._cardTab,o=this._paintPanel?.brushSize??6,n=!s||(this._paintPanel?.paintExternalLive??!0),r=s&&(this._paintPanel?.paintLivePreview??!1);return H`
      <div class="card" role="region" aria-label="WLED Studio card">
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller??"WLED Studio"}</span>
          ${e.isRemote?H`<span class="badge">Remote</span>`:null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <div class="controls">
          <label class="bri-label" for="global-brightness">Brightness</label>
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

        ${this._renderModeTabs()}

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
          .paintMode=${s}
          .paintBrushSize=${o}
          .paintLivePreview=${r}
          .externalLive=${n}
          @segment-select=${this._onStripSegmentSelect}
          @paint-stroke=${this._onPaintStroke}
        ></wled-geometry-preview>

        <div class="tab-body">${this._renderTabPanel()}</div>

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${this._hint?H`<p class="hint">${this._hint}</p>`:null}
        ${!this._layoutId&&this._controllerId?H`<p class="hint layout-hint">
              No saved layout — create one in Studio → Layout to show your floorplan here.
            </p>`:null}
      </div>
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...mt,r`
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
      .layout-preview {
        display: block;
        width: 100%;
        margin-bottom: 4px;
      }
      .controls {
        margin: 0 0 10px;
      }
      .bri-label {
        display: block;
        font-size: 0.8rem;
        opacity: 0.85;
        margin-bottom: 4px;
      }
      .mode-tabs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 10px;
      }
      .mode-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 8px 4px;
        border: none;
        border-radius: 10px;
        background: var(--secondary-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.68rem;
        line-height: 1.2;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .mode-tab ha-icon {
        --mdc-icon-size: 22px;
      }
      .mode-tab.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .tab-body {
        max-height: min(48vh, 380px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        margin: 8px 0 4px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
        padding-top: 10px;
      }
      .tab-panel {
        display: block;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-top: 8px;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
        margin: 8px 0 0;
      }
      .layout-hint {
        font-style: italic;
      }
    `]}};function ks(){return{type:`custom:${$s}`,controller:"",height:200}}t([ht({attribute:!1})],Ss.prototype,"config",void 0),t([dt()],Ss.prototype,"_controllerId",void 0),t([dt()],Ss.prototype,"_masterEntity",void 0),t([dt()],Ss.prototype,"_pixelCount",void 0),t([dt()],Ss.prototype,"_previewStatus",void 0),t([dt()],Ss.prototype,"_hint",void 0),t([dt()],Ss.prototype,"_layoutId",void 0),t([dt()],Ss.prototype,"_fixtureId",void 0),t([dt()],Ss.prototype,"_cardTab",void 0),t([pt("wled-geometry-preview")],Ss.prototype,"_preview",void 0),t([pt("wled-segment-controls")],Ss.prototype,"_segmentControls",void 0),t([pt("wled-view-paint")],Ss.prototype,"_paintPanel",void 0),t([dt()],Ss.prototype,"_selectedSegId",void 0),t([dt()],Ss.prototype,"_globalBriPct",void 0),t([dt()],Ss.prototype,"_segments",void 0),Ss=xs=t([ut($s)],Ss);const Es=()=>({type:`custom:${$s}`,controller:"Cloud",height:200});let Cs=class extends rt{constructor(){super(...arguments),this._config=Es()}setConfig(t){this._config={...Es(),...t,type:t.type??`custom:${$s}`}}render(){const t=this._config??Es();return H`
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
      </div>
    `}_onController(t){const e=t.detail.value;this._fire({...this._config??Es(),controller:e})}_onHeight(t){const e=Number(t.detail.value);this._fire({...this._config??Es(),height:Number.isFinite(e)?e:200})}_onLayoutId(t){const e=t.detail.value.trim(),i={...this._config??Es()};e?i.layout_id=e:delete i.layout_id,this._fire(i)}_fire(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};t([ht({attribute:!1})],Cs.prototype,"hass",void 0),t([dt()],Cs.prototype,"_config",void 0),Cs=t([ut("wled-studio-card-editor")],Cs),customElements.get($s)||customElements.define($s,Ss),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===$s)||window.customCards.push({type:$s,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:$s});export{$s as CARD_TAG,Ss as WledStudioCard,ks as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map
