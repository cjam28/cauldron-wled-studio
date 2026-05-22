function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,C=t=>t,k=S.trustedTypes,P=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+$,E=`<${M}>`,A=document,L=()=>A.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,R="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,O=/>/g,U=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),j=new WeakMap,q=A.createTreeWalker(A,129);function K(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=((t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=D;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===D?"!--"===l[1]?o=N:void 0!==l[1]?o=O:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=n??D,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?U:'"'===l[3]?z:G):o===z||o===G?o=U:o===N||o===O?o=D:(o=U,n=void 0);const d=o===U&&t[e+1].startsWith("/>")?" ":"";r+=o===D?i+E:h>=0?(s.push(a),i.slice(0,h)+I+i.slice(h)+$+d):i+$+(-2===h?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=Y.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(I)){const e=h[r++],i=s.getAttribute(t).split($),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith($)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)a.push({type:7,index:n}),t+=$.length-1}n++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===V)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new J(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=q.nextNode(),r++)}return q.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let J=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),T(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==H&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new Y(t)),e}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const r of e)n===i.length?i.push(s=new t(this.O(L()),this.O(L()),this,this.options)):s=i[n],s._$AI(r),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=X(this,s[i+o],e,o),a===V&&(a=this._$AH[o]),r||=!T(a)||a!==this._$AH[o],a===H?t=H:t!==H&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==H)}}let it=class extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??H)===V)return;const i=this._$AH,s=t===H&&i!==H||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==H&&(i===H||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=S.litHtmlPolyfillSupport;nt?.(Y,J),(S.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let ot=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new J(e.insertBefore(L(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ct({...t,state:!0,attribute:!1})}function ut(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const pt=o`
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
`;class ft{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const _t=[pt,gt];class mt extends ot{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new ft(this),this._visible=!0,this._inView=!0}static{this.styles=_t}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ct({attribute:!1})],mt.prototype,"hass",void 0);const vt="0.10.23";function yt(t){return(e,i)=>{const s=customElements.get(t);return s||(customElements.define(t,e),e)}}const bt=/^[0-9a-fA-F]+$/;function xt(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",r=4*s;8===n.length?(i[r]=parseInt(n.slice(0,2),16),i[r+1]=parseInt(n.slice(2,4),16),i[r+2]=parseInt(n.slice(4,6),16),i[r+3]=parseInt(n.slice(6,8),16)):(i[r]=parseInt(n.slice(0,2),16),i[r+1]=parseInt(n.slice(2,4),16),i[r+2]=parseInt(n.slice(4,6),16),i[r+3]=255)}return i}function wt(t,e,i,s){let n,r=!1;const o=async()=>{n?.(),n=void 0,r||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&bt.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let r=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(r=t)}return{leds_hex:s,n:r,channels:n,scale:r/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};o();const a=function(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}(t,()=>{o()});return()=>{r=!0,a(),n?.(),n=void 0}}async function St(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function Ct(t){await St(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}function kt(t,e,i=100){let s,n,r;const o=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r){const e=r;r=void 0,t(...e)}},a=(...t)=>{r=t,s&&clearTimeout(s),s=setTimeout(o,e),n||(n=setTimeout(o,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,r=void 0},a}async function Pt(t,e){await St(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function It(t,e,i,s){await St(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}async function $t(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}function Mt(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function Et(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function At(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function Lt(t,e,i){const s=new Set(t),n=(i.length?i:t.map(t=>({id:t}))).map(t=>s.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:n}}function Tt(t,e){const i=new Set(t);return i.has(e)?i.delete(e):i.add(e),[...i].sort((t,e)=>t-e)}function Ft(t,e){const i=t.id,s=e.find(t=>t.wled_segment_id===i||t.segment_index===i||t.entity_id.endsWith(`_segment_${i}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||s?.name?.replace(/^.*\s—\s/,"")||`Seg ${i+1}`} (${t.start??"?"}–${t.stop??"?"})`}function Rt(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}const Dt={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Sound",palette:"Palette"};function Nt(t){return void 0!==t.Solid?t.Solid:0}const Ot="wled_studio.segment_snapshot",Ut="wled_studio.merge_for_effects",Gt=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function zt(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Bt(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Wt(t){return Boolean(zt(Ut)[t])}function Vt(t,e){const i=zt(Ut);e?i[t]=!0:delete i[t],Bt(Ut,i)}function Ht(t){return zt(Ot)[t]??null}function jt(t){return{seg:t.segments.map(t=>function(t){const e=t,i={id:t.id};for(const t of Gt){const s=e[t];void 0!==s&&(i[t]=s)}return i}(t))}}function qt(t,e){const i=t.find(t=>0===t.id);return i?[0]:t.length?[t[0].id]:[0]}function Kt(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:Et(t.col),awm:t.awm};return JSON.stringify(e)}function Yt(t,e,i){let s,n=null,r=0;const o=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await Pt(t,e)).segments??[]).find(t=>t.id===r);if(!s||!n)return;const o=Kt(n);if(o===Kt(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(Et(t.col))!==JSON.stringify(Et(e.col))}(n,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=kt((s,a)=>{n=a,r=a.id,It(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(n={...a,...i,id:a.id}),o()}).catch(t=>{i(a,`Failed to apply state to WLED: ${Rt(t)}`)})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var Xt,Zt,Jt,Qt,te,ee={},ie=[],se=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function ne(t,e){for(var i in e)t[i]=e[i];return t}function re(t){var e=t.parentNode;e&&e.removeChild(t)}function oe(t,e,i){var s,n,r,o,a=arguments;if(e=ne({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return o=e.key,null!=(r=e.ref)&&delete e.ref,null!=o&&delete e.key,ae(t,e,o,r)}function ae(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return Xt.vnode&&Xt.vnode(n),n}function le(t){return t.children}function he(t,e){this.props=t,this.context=e}function ce(t,e){if(null==e)return t.__p?ce(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?ce(t):null}function de(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return de(t)}}function ue(t){(!t.__d&&(t.__d=!0)&&1===Zt.push(t)||Qt!==Xt.debounceRendering)&&(Qt=Xt.debounceRendering,(Xt.debounceRendering||Jt)(pe))}function pe(){var t,e,i,s,n,r,o,a;for(Zt.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Zt.pop();)t.__d&&(i=void 0,s=void 0,r=(n=(e=t).__v).__e,o=e.__P,a=e.u,e.u=!1,o&&(i=[],s=ye(o,n,ne({},n),e.__n,void 0!==o.ownerSVGElement,null,i,a,null==r?ce(n):r),be(i,n),s!=r&&de(n)))}function ge(t,e,i,s,n,r,o,a,l){var h,c,d,u,p,g,f,_=i&&i.__k||ie,m=_.length;if(a==ee&&(a=null!=r?r[0]:m?ce(i,0):null),h=0,e.__k=fe(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=_[h])||d&&i.key==d.key&&i.type===d.type)_[h]=void 0;else for(c=0;c<m;c++){if((d=_[c])&&i.key==d.key&&i.type===d.type){_[c]=void 0;break}d=null}if(u=ye(t,i,d=d||ee,s,n,r,o,null,a,l),(c=i.ref)&&d.ref!=c&&(f||(f=[])).push(c,i.__c||u,i),null!=u){if(null==g&&(g=u),null!=i.l)u=i.l,i.l=null;else if(r==d||u!=a||null==u.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(u);else{for(p=a,c=0;(p=p.nextSibling)&&c<m;c+=2)if(p==u)break t;t.insertBefore(u,a)}"option"==e.type&&(t.value="")}a=u.nextSibling,"function"==typeof e.type&&(e.l=u)}}return h++,i}),e.__e=g,null!=r&&"function"!=typeof e.type)for(h=r.length;h--;)null!=r[h]&&re(r[h]);for(h=m;h--;)null!=_[h]&&Se(_[h],_[h]);if(f)for(h=0;h<f.length;h++)we(f[h],f[++h],f[++h])}function fe(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)fe(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return ae(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=ae(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function _e(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===se.test(e)?i+"px":null==i?"":i}function me(t,e,i,s,n){var r,o,a,l,h;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(r=t.style,"string"==typeof i)r.cssText=i;else{if("string"==typeof s&&(r.cssText="",s=null),s)for(o in s)i&&o in i||_e(r,o,"");if(i)for(a in i)s&&i[a]===s[a]||_e(r,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),h=e.toLowerCase(),e=(h in t?h:e).slice(2),i?(s||t.addEventListener(e,ve,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,ve,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function ve(t){return this.t[t.type](Xt.event?Xt.event(t):t)}function ye(t,e,i,s,n,r,o,a,l,h){var c,d,u,p,g,f,_,m,v,y,b=e.type;if(void 0!==e.constructor)return null;(c=Xt.__b)&&c(e);try{t:if("function"==typeof b){if(m=e.props,v=(c=b.contextType)&&s[c.__c],y=c?v?v.props.value:c.__p:s,i.__c?_=(d=e.__c=i.__c).__p=d.__E:("prototype"in b&&b.prototype.render?e.__c=d=new b(m,y):(e.__c=d=new he(m,y),d.constructor=b,d.render=Ce),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=y,d.__n=s,u=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=b.getDerivedStateFromProps&&ne(d.__s==d.state?d.__s=ne({},d.__s):d.__s,b.getDerivedStateFromProps(m,d.__s)),u)null==b.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&o.push(d);else{if(null==b.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,y),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,y)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,c=0;c<e.__k.length;c++)e.__k[c]&&(e.__k[c].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,y)}for(p=d.props,g=d.state,d.context=y,d.props=m,d.state=d.__s,(c=Xt.__r)&&c(e),d.__d=!1,d.__v=e,d.__P=t,c=d.render(d.props,d.state,d.context),e.__k=fe(null!=c&&c.type==le&&null==c.key?c.props.children:c),null!=d.getChildContext&&(s=ne(ne({},s),d.getChildContext())),u||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(p,g)),ge(t,e,i,s,n,r,o,l,h),d.base=e.__e;c=d.__h.pop();)d.__s&&(d.state=d.__s),c.call(d);u||null==p||null==d.componentDidUpdate||d.componentDidUpdate(p,g,f),_&&(d.__E=d.__p=null)}else e.__e=xe(i.__e,e,i,s,n,r,o,h);(c=Xt.diffed)&&c(e)}catch(t){Xt.__e(t,e,i)}return e.__e}function be(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){Xt.__e(t,i.__v)}Xt.__c&&Xt.__c(e)}function xe(t,e,i,s,n,r,o,a){var l,h,c,d,u=i.props,p=e.props;if(n="svg"===e.type||n,null==t&&null!=r)for(l=0;l<r.length;l++)if(null!=(h=r[l])&&(null===e.type?3===h.nodeType:h.localName===e.type)){t=h,r[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),r=null}return null===e.type?u!==p&&(null!=r&&(r[r.indexOf(t)]=null),t.data=p):e!==i&&(null!=r&&(r=ie.slice.call(t.childNodes)),c=(u=i.props||ee).dangerouslySetInnerHTML,d=p.dangerouslySetInnerHTML,a||(d||c)&&(d&&c&&d.__html==c.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var r;for(r in i)r in e||me(t,r,null,i[r],s);for(r in e)n&&"function"!=typeof e[r]||"value"===r||"checked"===r||i[r]===e[r]||me(t,r,e[r],i[r],s)}(t,p,u,n,a),e.__k=e.props.children,d||ge(t,e,i,s,"foreignObject"!==e.type&&n,r,o,ee,a),a||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function we(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){Xt.__e(t,i)}}function Se(t,e,i){var s,n,r;if(Xt.unmount&&Xt.unmount(t),(s=t.ref)&&we(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){Xt.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(r=0;r<s.length;r++)s[r]&&Se(s[r],e,i);null!=n&&re(n)}function Ce(t,e,i){return this.constructor(t,i)}function ke(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function Pe(){return Pe=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},Pe.apply(this,arguments)}Xt={},he.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=ne({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&ne(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),ue(this))},he.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,ue(this))},he.prototype.render=le,Zt=[],Jt="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Qt=Xt.debounceRendering,Xt.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return ue(s.__E=s)}catch(e){t=e}throw t},te=ee;var Ie="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",$e="[\\s|\\(]+("+Ie+")[,|\\s]+("+Ie+")[,|\\s]+("+Ie+")\\s*\\)?",Me="[\\s|\\(]+("+Ie+")[,|\\s]+("+Ie+")[,|\\s]+("+Ie+")[,|\\s]+("+Ie+")\\s*\\)?",Ee=new RegExp("rgb"+$e),Ae=new RegExp("rgba"+Me),Le=new RegExp("hsl"+$e),Te=new RegExp("hsla"+Me),Fe="^(?:#?|0x?)",Re="([0-9a-fA-F]{1})",De="([0-9a-fA-F]{2})",Ne=new RegExp(Fe+Re+Re+Re+"$"),Oe=new RegExp(Fe+Re+Re+Re+Re+"$"),Ue=new RegExp(Fe+De+De+De+"$"),Ge=new RegExp(Fe+De+De+De+De+"$"),ze=Math.log,Be=Math.round,We=Math.floor;function Ve(t,e,i){return Math.min(Math.max(t,e),i)}function He(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function je(t){return parseInt(t,16)}function qe(t){return t.toString(16).padStart(2,"0")}var Ke=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=Pe({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=Pe({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=We(e),r=e-n,o=s*(1-i),a=s*(1-r*i),l=s*(1-(1-r)*i),h=n%6,c=[l,s,s,a,o,o][h],d=[o,o,l,s,s,a][h];return{r:Ve(255*[s,a,o,o,l,s][h],0,255),g:Ve(255*c,0,255),b:Ve(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),r=Math.min(e,i,s),o=n-r,a=0,l=n,h=0===n?0:o/n;switch(n){case r:a=0;break;case e:a=(i-s)/o+(i<s?6:0);break;case i:a=(s-e)/o+2;break;case s:a=(e-i)/o+4}return{h:60*a%360,s:Ve(100*h,0,100),v:Ve(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,r=n<1e-9?0:e*i/n;return{h:t.h,s:Ve(100*r,0,100),l:Ve(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:Ve(100*s,0,100),v:Ve((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*ze(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*ze(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*ze(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*ze(i),s=255),{r:Ve(We(e),0,255),g:Ve(We(i),0,255),b:Ve(We(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,r=2e3,o=4e4;o-r>.4;){i=.5*(o+r);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?o=i:r=i}return i},ke(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=Pe({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return Pe({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=Pe({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=Pe({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=Pe({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=Pe({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:Be(i),g:Be(s),b:Be(n)}},set:function(e){this.hsv=Pe({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return Pe({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:Be(i),s:Be(s),l:Be(n)}},set:function(e){this.hsv=Pe({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return Pe({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,r=1;if((e=Ee.exec(t))?(i=He(e[1],255),s=He(e[2],255),n=He(e[3],255)):(e=Ae.exec(t))&&(i=He(e[1],255),s=He(e[2],255),n=He(e[3],255),r=He(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:r}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+qe(t.r)+qe(t.g)+qe(t.b)},set:function(t){var e,i,s,n,r=255;if((e=Ne.exec(t))?(i=17*je(e[1]),s=17*je(e[2]),n=17*je(e[3])):(e=Oe.exec(t))?(i=17*je(e[1]),s=17*je(e[2]),n=17*je(e[3]),r=17*je(e[4])):(e=Ue.exec(t))?(i=je(e[1]),s=je(e[2]),n=je(e[3])):(e=Ge.exec(t))&&(i=je(e[1]),s=je(e[2]),n=je(e[3]),r=je(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:r/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+qe(t.r)+qe(t.g)+qe(t.b)+qe(We(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,r=1;if((e=Le.exec(t))?(i=He(e[1],360),s=He(e[2],100),n=He(e[3],100)):(e=Te.exec(t))&&(i=He(e[1],360),s=He(e[2],100),n=He(e[3],100),r=He(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:r}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function Ye(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,r=t.handleRadius,o=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*o+2*r,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*o-2*r,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Xe(t,e){var i=Ye(t),s=i.width,n=i.height,r=i.handleRange,o=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,r=t.maxTemperature-n,o=(e.kelvin-n)/r*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),h=a?s/2:n/2,c=o+l/100*r;return a&&(c=-1*c+r+2*o),{x:a?h:c,y:a?c:h}}var Ze,Je=2*Math.PI,Qe=function(t,e){return Math.sqrt(t*t+e*e)};function ti(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function ei(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function ii(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function si(t,e,i){var s=ei(t),n=s.cx,r=s.cy,o=ti(t);e=n-e,i=r-i;var a=ii(t,Math.atan2(-i,-e)*(360/Je)),l=Math.min(Qe(e,i),o);return{h:Math.round(a),s:Math.round(100/o*l)}}function ni(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function ri(t,e,i){var s=ni(t),n=s.width,r=s.height,o=s.radius,a=(e-o)/(n-2*o)*100,l=(i-o)/(r-2*o)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function oi(t){Ze||(Ze=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Ze.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function ai(t,e,i,s){for(var n=0;n<s.length;n++){var r=s[n].x-e,o=s[n].y-i;if(Math.sqrt(r*r+o*o)<t.handleRadius)return n}return null}function li(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function hi(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function ci(t){return"string"==typeof t?t:t+"px"}var di=["mousemove","touchmove","mouseup","touchend"],ui=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,r={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(r[s?"marginLeft":"marginTop"]=n),oe(le,null,t.children(this.uid,i,r))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,r=n.clientX-s.left,o=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(r,o,0)&&di.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(r,o,1);break;case"mouseup":case"touchend":i(r,o,2),di.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(he);function pi(t){var e=t.r,i=t.url,s=e,n=e;return oe("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+ci(t.x)+", "+ci(t.y)+")",willChange:"transform",top:ci(-e),left:ci(-e),width:ci(2*e),height:ci(2*e),position:"absolute",overflow:"visible"}},i&&oe("use",Object.assign({xlinkHref:oi(i)},t.props)),!i&&oe("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&oe("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function gi(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=Ye(t),n=s.width,r=s.height,o=s.radius,a=Xe(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],r=t.minTemperature,o=t.maxTemperature,a=o-r,l=r,h=0;l<o;l+=a/8,h+=1){var c=Ke.kelvinToRgb(l),d=c.r,u=c.g,p=c.b;n.push([12.5*h,"rgb("+d+","+u+","+p+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var g=Ke.hsvToHsl({h:i.h,s:0,v:i.v}),f=Ke.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var _=Ke.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]]}}(t,i);return oe(ui,Object.assign({},t,{onInput:function(e,s,n){var r=function(t,e,i){var s,n=Ye(t),r=n.handleRange,o=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+r+o:e-o,s=Math.max(Math.min(s,r),0);var a=Math.round(100/r*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=r,t.onInput(n,t.id)}}),function(e,s,h){return oe("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:ci(n),height:ci(r),borderRadius:ci(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},h)}),oe("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:ci(o),background:hi("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},li(t))}),oe(pi,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function fi(t){var e=ni(t),i=e.width,s=e.height,n=e.radius,r=t.colors,o=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,h=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],c=r.map(function(e){return function(t,e){var i=ni(t),s=i.width,n=i.height,r=i.radius,o=e.hsv,a=r,l=s-2*r,h=n-2*r;return{x:a+o.s/100*l,y:a+(h-o.v/100*h)}}(t,e)});return oe(ui,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=ai(t,e,i,c);null!==n?o.setActiveColor(n):(o.inputActive=!0,l.hsv=ri(t,e,i),t.onInput(s,t.id))}else 1===s&&(o.inputActive=!0,l.hsv=ri(t,e,i));t.onInput(s,t.id)}}),function(e,o,a){return oe("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:ci(i),height:ci(s),position:"relative"},a)}),oe("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:ci(n)},li(t),{background:hi("linear","to bottom",h[1])+","+hi("linear","to right",h[0])})}),r.filter(function(t){return t!==l}).map(function(e){return oe(pi,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[e.index].x,y:c[e.index].y})}),oe(pi,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:c[l.index].x,y:c[l.index].y}))})}pi.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},gi.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function _i(t){var e=ei(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,r=n.hsv,o=i.map(function(e){return function(t,e){var i=e.hsv,s=ei(t),n=s.cx,r=s.cy,o=ti(t),a=(180+ii(t,i.h,!0))*(Je/360),l=i.s/100*o,h="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*h,y:r+l*Math.sin(a)*h}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return oe(ui,Object.assign({},t,{onInput:function(e,i,r){if(0===r){if(!function(t,e,i){var s=ei(t),n=s.cx,r=s.cy,o=t.width/2;return Qe(n-e,r-i)<o}(t,e,i))return!1;var a=ai(t,e,i,o);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=si(t,e,i),t.onInput(r,t.id))}else 1===r&&(s.inputActive=!0,n.hsv=si(t,e,i));t.onInput(r,t.id)}}),function(s,l,h){return oe("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:ci(e),height:ci(e),position:"relative"},h)}),oe("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),oe("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&oe("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-r.v/100})}),oe("div",{className:"IroWheelBorder",style:Object.assign({},a,li(t))}),i.filter(function(t){return t!==n}).map(function(e){return oe(pi,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})}),oe(pi,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[n.index].x,y:o[n.index].y}))})}var mi=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new Ke(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:_i},{component:gi}],e.transparency&&s.push({component:gi,options:{sliderType:"alpha"}})),oe("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,r=t.options;return oe(n,Object.assign({},e,r,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(he);mi.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var vi,yi,bi,xi=(yi=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,r;Xt.__p&&Xt.__p(t,e),n=(s=i===te)?null:e.__k,t=oe(le,null,[t]),r=[],ye(e,e.__k=t,n||ee,ee,void 0!==e.ownerSVGElement,n?null:ie.slice.call(e.childNodes),r,!1,ee,s),be(r,t)}(oe(vi,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},yi.prototype=(vi=mi).prototype,Object.assign(yi,vi),yi.__component=vi,yi);!function(t){var e;t.version="5.5.2",t.Color=Ke,t.ColorPicker=xi,(e=t.ui||(t.ui={})).h=oe,e.ComponentBase=ui,e.Handle=pi,e.Slider=gi,e.Wheel=_i,e.Box=fi}(bi||(bi={}));var wi=bi;const Si="wled_studio.color_swatches";function Ci(t){return t.trim()||"_default"}function ki(){try{const t=localStorage.getItem(Si);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function Pi(t){const e=ki()[Ci(t)];return Array.isArray(e)?[...e]:[]}function Ii(t,e){const i=ki();var s;i[Ci(t)]=e.slice(0,32),s=i,localStorage.setItem(Si,JSON.stringify(s))}function $i(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function Mi(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let Ei=class extends mt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName=""}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=Pi(this.controllerId)}_currentKey(){return $i(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=Mi(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=Pi(t),s=$i(e.rgb,e.white),n=i.find(t=>$i(t.rgb,t.white)===s);if(n)return n.name=e.name.trim()||n.name,Ii(t,i),n;const r={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||Mi(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(r),Ii(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=Pi(t),n=s.findIndex(t=>t.id===e);if(n<0)return null;const r=s[n],o={...r,...i,rgb:i.rgb?[...i.rgb]:r.rgb};void 0!==i.name&&(o.name=i.name.trim()||Mi(o.rgb,o.white)),s[n]=o,Ii(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e.stopPropagation(),function(t,e){const i=Pi(t).filter(t=>t.id!==e);Ii(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}render(){const t=this._currentKey();return W`
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

        ${this._saving?W`
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

        ${this._editingId?W`
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

        ${0!==this._swatches.length||this._saving?W`
              <div class="grid" role="list">
                ${this._swatches.map(e=>W`
                    <div
                      class="chip-wrap ${$i(e.rgb,e.white)===t?"active":""}"
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
            `:W`<p class="empty">Save colors you use often — tap a swatch to apply.</p>`}
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
    `]}};t([ct()],Ei.prototype,"controllerId",void 0),t([ct({type:Array})],Ei.prototype,"rgb",void 0),t([ct({type:Number})],Ei.prototype,"white",void 0),t([dt()],Ei.prototype,"_swatches",void 0),t([dt()],Ei.prototype,"_saving",void 0),t([dt()],Ei.prototype,"_saveName",void 0),t([dt()],Ei.prototype,"_editingId",void 0),t([dt()],Ei.prototype,"_editName",void 0),Ei=t([yt("wled-color-swatch-bar")],Ei);let Ai=class extends mt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&t.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const t=this._host;return!!t&&Boolean(t.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(t){const e=t.getBoundingClientRect();let i=e.width,s=e.height;if((i<8||s<8)&&(i=t.offsetWidth,s=t.offsetHeight),i<8||s<8){const e=getComputedStyle(t);i=parseFloat(e.width)||0,s=parseFloat(e.height)||0}return{width:i,height:s}}_wheelSize(t,e){const i=Math.min(t,e);return Math.max(120,Math.min(160,Math.floor(i)||140))}_tryMountOrResize(){const t=this._host;if(!t)return;const{width:e,height:i}=this._hostBox(t);if(e<8||i<8)return;const s=this._wheelSize(e,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(t,s)}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=wi.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:"#555",layout:[{component:wi.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return W`
      <div class="picker">
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
        ${this.controllerId?W`
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
        width: 140px;
        height: 140px;
        min-width: 140px;
        min-height: 140px;
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
    `]}};t([ct({type:Array,hasChanged:(t,e)=>!t||!e||!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],Ai.prototype,"rgb",void 0),t([ct({type:Number})],Ai.prototype,"white",void 0),t([ct({type:Number})],Ai.prototype,"awm",void 0),t([ct({type:Boolean})],Ai.prototype,"showWhite",void 0),t([ct()],Ai.prototype,"controllerId",void 0),t([ut(".wheel-host")],Ai.prototype,"_host",void 0),Ai=t([yt("wled-color-wheel-rgbw")],Ai);function Li(t,e="strip",i,s=0){let n=String(t);return s&&(n=`${n}_p${s}`),i?.trim()&&(n=`${n}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${n}_${e}.webp`}function Ti(t,e,i="strip",s,n,r){if(!t||e<0)return;const o=void 0!==r?function(t,e,i="strip",s){const n=e instanceof Set?e:new Set(e);if(!n.size)return;const r=[Li(t,i,s),Li(t,i)];for(const t of r)if(n.has(t))return t;const o=`${t}_`,a=`_${i}.webp`;for(const t of n)if(t.startsWith(o)&&t.endsWith(a))return t}(e,r,i,s):Li(e,i,s);return o?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,o),n):void 0}const Fi="wled_studio.recent_effects",Ri="wled_studio.recent_scenes";function Di(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Ni(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Oi(t){return t?Di(Fi)[t]??[]:[]}function Ui(t,e=72,i=6,s=10){if(t<=0)return 1;const n=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/n)))}let Gi=class extends mt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e;return W`
      <button
        class="tile"
        type="button"
        aria-label=${this.label||`Effect ${this.fxId}`}
        @mouseenter=${()=>{this._hover=!0}}
        @mouseleave=${()=>{this._hover=!1}}
        @focus=${()=>{this._hover=!0}}
        @blur=${()=>{this._hover=!1}}
      >
        ${i?W`<img
              class="thumb"
              src=${i}
              alt=""
              loading="lazy"
              decoding="async"
              @error=${t=>{t.target.style.display="none"}}
            />`:W`<span class="placeholder" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </button>
    `}static{this.styles=[..._t,o`
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
    `]}};t([ct({type:Number})],Gi.prototype,"fxId",void 0),t([ct()],Gi.prototype,"thumbUrl",void 0),t([ct()],Gi.prototype,"thumbUrlAnimated",void 0),t([ct()],Gi.prototype,"label",void 0),t([dt()],Gi.prototype,"_hover",void 0),Gi=t([yt("wled-effect-tile")],Gi);let zi=class extends mt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this._category="all",this._recentEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){this._recentEntries=Oi(this.controllerId)}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=Ui(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=Nt(this.effectsByName),s=e.filter(e=>!!function(t,e,i,s,n){if("all"===i)return!0;const r=s[e]??null,o=t.toLowerCase();return"solid"===i?e===Nt(n):"2d"===i?"2"===r||o.includes("2d"):"1d"===i?"2"!==r&&!o.includes("2d"):"sound"===i?"v"===r||"f"===r:"palette"!==i||o.includes("palette")||o.includes("colorloop")||o.includes("pride")||o.includes("cycle")}(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),n=this.showRecents&&!t&&this._recentEntries.length>0,r=this._recentEntries.slice(0,this._recentVisible);return W`
      <div class="wrap">
        ${n?W`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${r.map(t=>{const e=t.id,s=t.name,n=this.soundFlags[e],r=e===this.selectedFx;return W`
                      <button
                        type="button"
                        class="recent-chip ${r?"active":""}"
                        aria-pressed=${r}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===n?W`<span class="badge">♪</span>`:null}
                        ${"f"===n?W`<span class="badge">♫</span>`:null}
                        ${"2"===n?W`<span class="badge dim">2D</span>`:null}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        <div class="filters" role="tablist" aria-label="Effect categories">
          ${["all","1d","2d","sound","palette","solid"].map(t=>W`
              <button
                type="button"
                class="cat ${this._category===t?"active":""}"
                role="tab"
                aria-selected=${this._category===t}
                @click=${()=>{this._category=t}}
              >
                ${Dt[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?W`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],n=e===this.selectedFx,r=Ti(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames);return r?W`
                    <wled-effect-tile
                      class="chip-tile ${n?"active":""}"
                      role="option"
                      aria-selected=${n}
                      .fxId=${e}
                      .thumbUrl=${r}
                      .label=${t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"")}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:W`
                  <button
                    type="button"
                    class="chip ${n?"active":""}"
                    role="option"
                    aria-selected=${n}
                    @click=${()=>this._pick(e,i)}
                  >
                    ${t}
                    ${"v"===s?W`<span class="badge" title="Volume reactive">♪</span>`:null}
                    ${"f"===s?W`<span class="badge" title="Frequency reactive">♫</span>`:null}
                    ${"2"===s?W`<span class="badge dim" title="2D matrix">2D</span>`:null}
                  </button>
                `})}
        </div>
        <p class="count">${s.length} effects</p>
      </div>
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return Oi(t);const n=Di(Fi),r=(n[t]??[]).filter(t=>t.id!==e);return r.unshift({id:e,name:i}),n[t]=r.slice(0,10),Ni(Fi,n),n[t]}(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[..._t,o`
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
    `]}};t([ct({type:Object})],zi.prototype,"effectsByName",void 0),t([ct({type:Array})],zi.prototype,"soundFlags",void 0),t([ct({type:Number})],zi.prototype,"selectedFx",void 0),t([ct({type:String})],zi.prototype,"filter",void 0),t([ct()],zi.prototype,"controllerId",void 0),t([ct()],zi.prototype,"fwVer",void 0),t([ct({type:Array})],zi.prototype,"thumbBasenames",void 0),t([ct({type:Boolean})],zi.prototype,"toggleOff",void 0),t([ct({type:Boolean})],zi.prototype,"showRecents",void 0),t([dt()],zi.prototype,"_category",void 0),t([dt()],zi.prototype,"_recentEntries",void 0),t([dt()],zi.prototype,"_recentVisible",void 0),zi=t([yt("wled-effect-chips")],zi);let Bi=class extends mt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=Wt(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=Wt(this.controllerId))}render(){const t=Ht(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return W`
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
          ${e?W`<span class="saved">${e}</span>`:null}
        </span>
      </label>
      ${this._error?W`<p class="err">${this._error}</p>`:null}
      ${this._busy?W`<p class="busy">Updating segments…</p>`:null}
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await Pt(this.connection,this.controllerId),e=t.segments??this.segments,i=t.info?.leds,s=Number(i?.count)||this.pixelCount;!function(t,e,i){const s={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:i},n=zt(Ot);n[t]=s,Bt(Ot,n)}(this.controllerId,e,s);const n=function(t,e,i){const s=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],n=i?.length?new Set(i):null,r=n?s.filter(t=>n.has(t.id)):s,o=r.filter(t=>(t.stop??0)>(t.start??0)),a=o.length?o:r.length?r:s,l=Math.min(...a.map(t=>t.start??0)),h=Math.max(...a.map(t=>t.stop??e)),c=a[0],d={id:0,start:l,stop:h,on:!1!==c.on,sel:!0,bri:c.bri??255,fx:c.fx??0,n:"Merged (effects)"};void 0!==c.col&&(d.col=c.col),void 0!==c.pal&&(d.pal=c.pal);const u=[d];for(const t of s){if(0===t.id)continue;const e=t.stop??t.start??0;u.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:u}}(e,s,this.editIds.length?this.editIds:void 0);await It(this.connection,this.controllerId,n,{fullResponse:!0}),Vt(this.controllerId,!0),this._merged=!0}else{const t=Ht(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await It(this.connection,this.controllerId,jt(t),{fullResponse:!0}),Vt(this.controllerId,!1),function(t){const e=zt(Ot);delete e[t],Bt(Ot,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[..._t,o`
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
    `]}};t([ct({attribute:!1})],Bi.prototype,"connection",void 0),t([ct()],Bi.prototype,"controllerId",void 0),t([ct({type:Array})],Bi.prototype,"segments",void 0),t([ct({type:Array})],Bi.prototype,"editIds",void 0),t([ct({type:Number})],Bi.prototype,"pixelCount",void 0),t([dt()],Bi.prototype,"_merged",void 0),t([dt()],Bi.prototype,"_busy",void 0),t([dt()],Bi.prototype,"_error",void 0),Bi=t([yt("wled-effect-merge-toggle")],Bi);let Wi=class extends mt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return W`
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
    `]}};function Vi(t){return e=function(t){if(!t)return 0;const e=t.attributes?.brightness_pct;if("number"==typeof e&&Number.isFinite(e))return Math.max(0,Math.min(100,Math.round(e)));const i=t.attributes?.brightness;return"number"==typeof i&&Number.isFinite(i)?Math.round(Math.max(0,Math.min(255,i))/255*100):"on"===t.state?100:0}(t),Math.round(Math.max(0,Math.min(100,e))/100*255);var e}t([ct({type:Array})],Wi.prototype,"presets",void 0),Wi=t([yt("wled-preset-bar")],Wi);const Hi={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ji=class extends mt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.selectedSegId=-1,this.masterEntity="",this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._toast="",this._mergeActive=!1,this._lastMasterBri255=null}updated(t){super.updated(t),(t.has("hass")||t.has("masterEntity"))&&this.masterEntity&&this.hass&&this._syncFromMasterEntity()}applyGlobalBrightness(t){const e=Math.max(0,Math.min(255,Math.round(t)));this._lastMasterBri255=e,this._segments.length&&(this._segments=this._segments.map(t=>({...t,bri:e})),this.requestUpdate())}_syncFromMasterEntity(){if(!this.hass||!this.masterEntity)return;const t=Vi(this.hass.states[this.masterEntity]);this._lastMasterBri255!==t&&this.applyGlobalBrightness(t)}onPoweredConnect(){this._mergeActive=Wt(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=Yt(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await Pt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=Wt(this.controllerId);const e=this._pixelCount(),i=this._segments.find(t=>0===t.id),s=(i?.stop??0)-(i?.start??0);this._mergeActive&&this._segments.length>1&&e>0&&s<.9*e&&(Vt(this.controllerId,!1),this._mergeActive=!1,this._toast="Merge for effects was turned off — WLED is using a multi-segment layout."),this._mergeActive&&(this._editIds=qt(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(t=>t.id),this._segId=this._segments[0].id)}catch(t){this._error=Rt(t)}finally{this._loading=!1,null!==this._lastMasterBri255&&this.applyGlobalBrightness(this._lastMasterBri255)}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?(this._toast=e,this.requestUpdate(),window.setTimeout(()=>{this._toast="",this.requestUpdate()},4e3)):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await $t(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=function(t,e){for(const i of e){if(i.wled_segment_id===t)return i.entity_id;if(At(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=Mt(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(t=>t.id);if(this._mergeActive){const t=qt(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=Wt(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const i=[...this._segments];for(const s of e){const e=i.findIndex(t=>t.id===s);if(e<0)continue;const n=i[e];i[e]={...n,...t,id:s,sel:!0,on:void 0!==t.on?t.on:!1!==n.on},this._syncHaSegment(n,t)}this._segments=i;const s=this._activeSeg();this._optimistic.push(Lt(e,t,this._segments),s??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await It(this.connection,this.controllerId,function(t,e){const i=new Set(t);return{seg:e.map(t=>({id:t.id,sel:i.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=Tt(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:t,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(Mt(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail,n=this._cols(e);n[this._colorSlot]=[i[0],i[1],i[2],s];const r=Nt(this._snapshot?.effects_by_name??{});this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]]),fx:r}),this._refreshMeta()}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,i,s=0){return await St(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:i,bus_index:s})).rgbwm??i}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){this._toast=t instanceof Error?t.message:String(t),this.requestUpdate()}}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await It(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}render(){if(this._loading)return W`<p class="muted">Loading segments…</p>`;if(this._error)return W`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return W`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,n=s?.sliders??{},r=!1!==s?.colors_enabled?3:1,o=this._snapshot?.rgbwm??0;return W`
      <div class="controls ${this.compact?"compact":""}">
        ${this._toast?W`<p class="toast" role="status">${this._toast}</p>`:null}
        ${this.wholeMode?W`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?W`
              <wled-effect-merge-toggle
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this.wholeMode?null:this._mergeActive?W`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`:W`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode||this._mergeActive?null:W`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(t=>W`
              <button
                class="seg-tab ${this._editIds.includes(t.id)?"editing":""} ${t.id===this._segId?"focus":""}"
                aria-pressed=${this._editIds.includes(t.id)}
                @click=${()=>this._toggleSegEdit(t.id)}
              >
                ${Ft(t,this._snapshot?.segment_entities??[])}
              </button>
            `)}
        </div>
            `}

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
          .controllerId=${this.controllerId}
          .rgb=${[i[0],i[1],i[2]]}
          .white=${i[3]}
          .awm=${o}
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
          ${Object.entries(Hi).map(([e,i])=>{if(!n[e])return null;const s=t[e];return W`
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
    `}get segments(){return this._segments}static{this.styles=[..._t,o`
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
    `]}};t([ct({attribute:!1})],ji.prototype,"connection",void 0),t([ct({attribute:!1})],ji.prototype,"hass",void 0),t([ct()],ji.prototype,"controllerId",void 0),t([ct({type:Boolean})],ji.prototype,"compact",void 0),t([ct({type:Boolean})],ji.prototype,"wholeMode",void 0),t([ct({type:Number})],ji.prototype,"selectedSegId",void 0),t([ct()],ji.prototype,"masterEntity",void 0),t([dt()],ji.prototype,"_loading",void 0),t([dt()],ji.prototype,"_error",void 0),t([dt()],ji.prototype,"_segId",void 0),t([dt()],ji.prototype,"_editIds",void 0),t([dt()],ji.prototype,"_segments",void 0),t([dt()],ji.prototype,"_snapshot",void 0),t([dt()],ji.prototype,"_meta",void 0),t([dt()],ji.prototype,"_effectFilter",void 0),t([dt()],ji.prototype,"_presets",void 0),t([dt()],ji.prototype,"_colorSlot",void 0),t([dt()],ji.prototype,"_toast",void 0),t([dt()],ji.prototype,"_mergeActive",void 0),ji=t([yt("wled-segment-controls")],ji);let qi=class extends mt{constructor(){super(...arguments),this.heightPx=56,this.pixelCount=210,this.segments=[],this.selectedSegId=-1,this._status="waiting",this._hoverLed=-1,this._raf=0,this._onCanvasClick=t=>{const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this.requestUpdate(),this._lastPixels&&this._schedulePaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this.requestUpdate(),this._lastPixels&&this._schedulePaint())}}setFrame(t){t&&(this._lastPixels=xt(t,this.pixelCount),this._status="live",this.requestUpdate(),this.isPowered&&this._schedulePaint())}setStatus(t){this._status=t,this.requestUpdate()}onPoweredConnect(){this._lastPixels&&this._schedulePaint()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas&&(this._ctx=this._canvas.getContext("2d",{alpha:!1})??void 0,this._canvas.addEventListener("click",this._onCanvasClick),this._canvas.addEventListener("mousemove",this._onCanvasMove),this._canvas.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{this._canvas?.removeEventListener("click",this._onCanvasClick),this._canvas?.removeEventListener("mousemove",this._onCanvasMove),this._canvas?.removeEventListener("mouseleave",this._onCanvasLeave)}))}_ledAtEvent(t){const e=this._canvas;if(!e)return-1;const i=e.getBoundingClientRect(),s=(t.clientX-i.left)/i.width;return Math.min(this.pixelCount-1,Math.max(0,Math.floor(s*this.pixelCount)))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSelectedSeg(t){if(this.selectedSegId<0)return!1;const e=this.segments.find(t=>t.id===this.selectedSegId);if(!e)return!1;const i=e.start??0,s=e.stop??e.len??this.pixelCount;return t>=i&&t<s}_schedulePaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e||!this._lastPixels)return;const i=e.width,s=e.height,n=this.pixelCount,r=i/n;t.fillStyle="#111",t.fillRect(0,0,i,s);for(let e=0;e<n;e++){const i=4*e,n=this._lastPixels[i],o=this._lastPixels[i+1],a=this._lastPixels[i+2],l=this._ledInSelectedSeg(e),h=e===this._hoverLed;t.fillStyle=`rgb(${n},${o},${a})`,t.shadowColor=`rgba(${n},${o},${a},0.85)`,t.shadowBlur=this.remote.state.disableBloom?0:l||h?10:6;const c=l?0:2,d=l?s:s-4;t.fillRect(e*r,c,Math.max(1,r-1),d),l&&(t.strokeStyle="rgba(255,255,255,0.9)",t.lineWidth=2,t.strokeRect(e*r+.5,.5,Math.max(1,r-2),s-1))}t.shadowBlur=0}render(){const t=Math.max(320,3*this.pixelCount);return W`
      <div class="wrap" role="img" aria-label="Live LED strip preview — tap a pixel to select its segment">
        <canvas
          width=${t}
          height=${this.heightPx}
          style="cursor: crosshair"
        ></canvas>
        ${"live"!==this._status?W`<span class="overlay">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[..._t,o`
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
    `]}};t([ct({type:Number})],qi.prototype,"heightPx",void 0),t([ct({type:Number})],qi.prototype,"pixelCount",void 0),t([ct({type:Array})],qi.prototype,"segments",void 0),t([ct({type:Number})],qi.prototype,"selectedSegId",void 0),t([dt()],qi.prototype,"_status",void 0),t([dt()],qi.prototype,"_hoverLed",void 0),qi=t([yt("wled-strip-preview")],qi);let Ki=class extends mt{constructor(){super(...arguments),this.controllerId="",this.heightPx=56,this.selectedSegId=-1,this._pixelCount=210,this._segments=[],this._status="connecting"}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._bootstrap()}onPoweredConnect(){this._bootstrap()}onPoweredDisconnect(){this._unsubLive?.(),this._unsubLive=void 0}async _bootstrap(){if(this.connection&&this.controllerId){this._status="connecting",this._preview()?.setStatus(this._status);try{const t=(await Ct(this.connection)).find(t=>String(t.entry_id)===this.controllerId);this._pixelCount=Number(t?.pixel_count)||210;const e=await Pt(this.connection,this.controllerId);this._segments=e.segments??[]}catch{this._segments=[]}this._startLive()}}_startLive(){this.connection&&this.controllerId&&(this._unsubLive?.(),this._unsubLive=wt(this.connection,this.controllerId,t=>{this._status="live",this._preview()?.setStatus(this._status),this._preview()?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.()))}async refreshSegments(){if(this.connection&&this.controllerId)try{const t=await Pt(this.connection,this.controllerId);this._segments=t.segments??[]}catch{}}_preview(){return this.renderRoot.querySelector("wled-strip-preview")??void 0}_onSegmentSelect(t){this.dispatchEvent(new CustomEvent("segment-select",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return W`
      <div class="rail-preview">
        <p class="label">Live strip</p>
        <wled-strip-preview
          .heightPx=${this.heightPx}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${this.selectedSegId}
          @segment-select=${this._onSegmentSelect}
        ></wled-strip-preview>
        ${"live"!==this._status?W`<span class="status">${this._status}</span>`:null}
      </div>
    `}static{this.styles=[..._t,o`
      .rail-preview {
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .label {
        margin: 0 0 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
      }
      .status {
        display: block;
        margin-top: 4px;
        font-size: 0.75rem;
        opacity: 0.6;
      }
    `]}};async function Yi(t,e){return await St(t),t.sendMessagePromise({...e,schema_version:1})}async function Xi(t,e){return(await Yi(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}async function Zi(t,e,i){return(await Yi(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}async function Ji(t,e,i){return(await Yi(t,{type:"wled_studio/layout_save",controller_id:e,layout:i})).layout??i}async function Qi(t,e,i,s){return(await Yi(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}t([ct({attribute:!1})],Ki.prototype,"connection",void 0),t([ct()],Ki.prototype,"controllerId",void 0),t([ct({type:Number})],Ki.prototype,"heightPx",void 0),t([ct({type:Number})],Ki.prototype,"selectedSegId",void 0),t([dt()],Ki.prototype,"_pixelCount",void 0),t([dt()],Ki.prototype,"_segments",void 0),t([dt()],Ki.prototype,"_status",void 0),Ki=t([yt("wled-studio-live-preview")],Ki);const ts=new Set(["layout","default","fixture"]);function es(t){const e=t.trim();return e?e.split(/[-_]+/).filter(Boolean).map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join(" "):"Layout"}function is(t){const e=(t.name??"").trim();return e&&!ts.has(e.toLowerCase())?e:es(String(t.id??""))}async function ss(t){const e=await(i=createImageBitmap(t),s=15e3,n="Image decode timed out — try JPEG or PNG instead.",Promise.race([i,new Promise((t,e)=>{setTimeout(()=>e(new Error(n)),s)})]));var i,s,n;const r=Math.min(1,2048/Math.max(e.width,e.height)),o=Math.max(1,Math.round(e.width*r)),a=Math.max(1,Math.round(e.height*r)),l=document.createElement("canvas");l.width=o,l.height=a;const h=l.getContext("2d");if(!h)throw new Error("Canvas unavailable");h.drawImage(e,0,0,o,a),e.close();const c=l.toDataURL("image/jpeg",.92),d=new Image;return await new Promise((t,e)=>{d.onload=()=>t(),d.onerror=()=>e(new Error("Image decode failed")),d.src=c}),d}async function ns(t){if(function(t){const e=(t.type||"").toLowerCase();return e.includes("heic")||e.includes("heif")||/\.heic$/i.test(t.name)||/\.heif$/i.test(t.name)}(t))try{return await ss(t)}catch(t){throw new Error(t instanceof Error?`${t.message} Export HEIC to JPEG in Photos and try again.`:"HEIC not supported here. Export to JPEG in Photos and try again.")}try{return await async function(t){const e=URL.createObjectURL(t);try{const t=new Image;return await new Promise((i,s)=>{t.onload=()=>i(),t.onerror=()=>s(new Error("Image decode failed")),t.src=e}),t}finally{URL.revokeObjectURL(e)}}(t)}catch{return ss(t)}}async function rs(t){return async function(t,e=2048){const i=Math.min(1,e/Math.max(t.naturalWidth,t.naturalHeight,1)),s=Math.max(1,Math.round(t.naturalWidth*i)),n=Math.max(1,Math.round(t.naturalHeight*i)),r=document.createElement("canvas");r.width=s,r.height=n;const o=r.getContext("2d");if(!o)throw new Error("Canvas unavailable");return o.drawImage(t,0,0,s,n),new Promise((t,e)=>{r.toBlob(i=>i?t(i):e(new Error("Encode failed")),"image/jpeg",.88)})}(await ns(t))}async function os(t,e,i,s){if(!t)throw new Error("Not connected to Home Assistant");const n=await rs(s),r=await function(t){return new Promise((e,i)=>{const s=new FileReader;s.onload=()=>{const t=s.result;if("string"!=typeof t)return void i(new Error("Encode failed"));const n=t.indexOf(",");e(n>=0?t.slice(n+1):t)},s.onerror=()=>i(new Error("Encode failed")),s.readAsDataURL(t)})}(n),o=await async function(t,e){await St(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(Rt(t))}}(t,{type:"wled_studio/layout_upload_bg",controller_id:e,layout_id:i,data:r,content_type:n.type||"image/jpeg"});if(!o.background_url)throw new Error("Photo upload failed — no URL returned");return{background_url:o.background_url}}function as(t,e,i){const{segLens:s,total:n}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const n=t.length,r=e?n:n-1;for(let e=0;e<r;e++){const r=(e+1)%n,o=Math.hypot(t[r].x-t[e].x,t[r].y-t[e].y);i.push(o),s+=o}return{segLens:i,total:s}}(t,e);if(n<=0||0===t.length)return[0,0];let r=i%1*n;r<0&&(r+=n);const o=t.length,a=e?o:o-1;let l=0;for(let e=0;e<a;e++){const i=s[e]??0;if(i>0&&l+i>=r){const s=(r-l)/i,n=(e+1)%o;return[t[e].x+s*(t[n].x-t[e].x),t[e].y+s*(t[n].y-t[e].y)]}l+=i}return[t[t.length-1].x,t[t.length-1].y]}function ls(t,e,i){const s=[...new Set(e.filter(t=>t>=0))].sort((t,e)=>t-e);if(0===s.length)return t;let n=t.length>=2?t.map(t=>({...t,anchorLed:null})):[{x:0,y:0,anchorLed:null},{x:100,y:0,anchorLed:null},{x:100,y:80,anchorLed:null},{x:0,y:80,anchorLed:null}];n.length!==s.length&&(n=function(t,e,i){if(e<2)return t;const s=[];for(let n=0;n<e;n++){const r=1===e?0:n/(e-1),[o,a]=as(t,i,r);s.push({x:o,y:a,anchorLed:null})}return s}(n,s.length,i));for(let t=0;t<s.length;t++)n[t]={...n[t],anchorLed:s[t]};return n}const hs=.55,cs=1,ds=1,us=0,ps=0,gs=0,fs=1,_s=0,ms=0,vs=1,ys=1;function bs(t,e){return t?{url:t,opacity:e?.opacity??hs,brightness:e?.brightness??cs,saturation:e?.saturation??ds,rotation:e?.rotation??us,offsetX:e?.offsetX??ps,offsetY:e?.offsetY??gs,scale:e?.scale??fs,cropX:e?.cropX??_s,cropY:e?.cropY??ms,cropW:e?.cropW??vs,cropH:e?.cropH??ys}:null}function xs(t){return bs(t.background?.url??t.background_url,t.background??null)}function ws(t,e,i,s,n){const r=n.opacity??hs,o=n.brightness??1,a=n.saturation??1,l=(n.rotation??0)*Math.PI/180,h=(n.offsetX??0)*e,c=(n.offsetY??0)*i,d=n.scale??1,u=n.cropX??0,p=n.cropY??0,g=n.cropW??1,f=n.cropH??1,_=s.naturalWidth*g,m=s.naturalHeight*f,v=s.naturalWidth*u,y=s.naturalHeight*p,b=Math.max(e/_,i/m)*d,x=_*b,w=m*b;t.save(),t.globalAlpha=r,t.filter=`brightness(${o}) saturate(${a})`,t.translate(e/2+h,i/2+c),t.rotate(l),t.drawImage(s,v,y,_,m,-x/2,-w/2,x,w),t.restore()}const Ss={opacity:1,brightness:1,saturation:1,rotation:0,offsetX:0,offsetY:0,scale:1,cropX:0,cropY:0,cropW:1,cropH:1};let Cs=class extends mt{constructor(){super(...arguments),this.open=!1,this._img=null,this._layer=null,this._cropDrag=null,this._cropStart={x:0,y:0,cx:0,cy:0,cw:1,ch:1},this._loadError="",this._onDown=t=>{if(!this._layer)return;const[e,i]=this._normFromEvent(t),s=this._hitCropHandle(e,i);s&&(this._cropDrag=s,this._cropStart={x:e,y:i,cx:this._layer.cropX??0,cy:this._layer.cropY??0,cw:this._layer.cropW??1,ch:this._layer.cropH??1},this._canvas?.setPointerCapture(t.pointerId))},this._onMove=t=>{if(!this._cropDrag||!this._layer)return;const[e,i]=this._normFromEvent(t),s=e-this._cropStart.x,n=i-this._cropStart.y,r=this._cropStart;let o=r.cx,a=r.cy,l=r.cw,h=r.ch;if("move"===this._cropDrag)o=Math.max(0,Math.min(1-l,r.cx+s)),a=Math.max(0,Math.min(1-h,r.cy+n));else if("nw"===this._cropDrag){const t=r.cx+r.cw,e=r.cy+r.ch;o=Math.max(0,Math.min(t-.05,r.cx+s)),a=Math.max(0,Math.min(e-.05,r.cy+n)),l=t-o,h=e-a}else"se"===this._cropDrag&&(l=Math.max(.05,Math.min(1-r.cx,r.cw+s)),h=Math.max(.05,Math.min(1-r.cy,r.ch+n)));this._layer={...this._layer,cropX:o,cropY:a,cropW:l,cropH:h},this._paint()},this._onUp=t=>{this._cropDrag=null,this._canvas?.releasePointerCapture(t.pointerId)}}async openWithFile(t){this._file=t,this._loadError="",this._img=null,this._layer=null,this.open=!0,await this.updateComplete,this._bindCanvas(),this.requestUpdate();try{const e=await ns(t);this._img=e,this._layer=bs("local-preview",Ss),this._loadError="",this._paint()}catch(t){throw this._loadError=Rt(t),this._paint(),t}}updated(t){super.updated(t),t.has("open")&&(this.open?(this._bindCanvas(),requestAnimationFrame(()=>this._paint())):this._resizeObs?.disconnect())}_bindCanvas(){const t=this.renderRoot.querySelector("canvas")??void 0,e=this.renderRoot.querySelector(".preview-wrap")??void 0;t&&(t!==this._canvas&&(this._canvas?.removeEventListener("pointerdown",this._onDown),this._canvas?.removeEventListener("pointermove",this._onMove),this._canvas?.removeEventListener("pointerup",this._onUp),this._canvas=t,t.addEventListener("pointerdown",this._onDown),t.addEventListener("pointermove",this._onMove),t.addEventListener("pointerup",this._onUp)),e&&e!==this._previewWrap&&(this._resizeObs?.disconnect(),this._previewWrap=e,this._resizeObs=new ResizeObserver(()=>this._paint()),this._resizeObs.observe(e)))}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect()}_canvasRect(){return this._canvas.getBoundingClientRect()}_normFromEvent(t){const e=this._canvasRect();return[(t.clientX-e.left)/e.width,(t.clientY-e.top)/e.height]}_hitCropHandle(t,e){const i=this._layer;if(!i)return null;const s=i.cropX??0,n=i.cropY??0,r=i.cropW??1,o=i.cropH??1;return Math.hypot(t-s,e-n)<.04?"nw":Math.hypot(t-(s+r),e-(n+o))<.04?"se":t>=s&&t<=s+r&&e>=n&&e<=n+o?"move":null}_paint(){const t=this._canvas,e=t?.getContext("2d"),i=this._img,s=this._layer;if(!t||!e)return;const n=this._previewWrap?.getBoundingClientRect()??t.getBoundingClientRect(),r=window.devicePixelRatio||1,o=Math.max(1,Math.floor((n.width||640)*r)),a=Math.max(1,Math.floor((n.height||360)*r));if(!i?.complete||!i.naturalWidth||!s)return e.fillStyle="#0f172a",e.fillRect(0,0,o,a),void(this._loadError&&(e.fillStyle="rgba(255,255,255,0.7)",e.font="14px sans-serif",e.textAlign="center",e.fillText(this._loadError,o/2,a/2)));t.width===o&&t.height===a||(t.width=o,t.height=a),e.fillStyle="#0f172a",e.fillRect(0,0,o,a),ws(e,o,a,i,s);const l=(s.cropX??0)*o,h=(s.cropY??0)*a,c=(s.cropW??1)*o,d=(s.cropH??1)*a;e.fillStyle="rgba(0,0,0,0.55)",e.fillRect(0,0,o,h),e.fillRect(0,h+d,o,a-h-d),e.fillRect(0,h,l,d),e.fillRect(l+c,h,o-l-c,d),e.strokeStyle="#38bdf8",e.lineWidth=2,e.strokeRect(l,h,c,d);const u=10;e.fillStyle="#38bdf8",e.fillRect(l-5,h-5,u,u),e.fillRect(l+c-5,h+d-5,u,u)}_resetCrop(){this._layer&&(this._layer={...this._layer,cropX:0,cropY:0,cropW:1,cropH:1},this._paint())}_cancel(){this.open=!1,this._img=null,this._layer=null,this._file=void 0,this._loadError=""}async _apply(){if(this._img&&this._layer)try{const t=await async function(t,e,i=2048){const s=e.cropX??0,n=e.cropY??0,r=e.cropW??1,o=e.cropH??1,a=Math.max(1,Math.floor(t.naturalWidth*r)),l=Math.max(1,Math.floor(t.naturalHeight*o)),h=Math.floor(t.naturalWidth*s),c=Math.floor(t.naturalHeight*n),d=Math.min(1,i/Math.max(a,l)),u=Math.max(1,Math.floor(a*d)),p=Math.max(1,Math.floor(l*d)),g=document.createElement("canvas");g.width=u,g.height=p;const f=g.getContext("2d");if(!f)throw new Error("Canvas unavailable");const _=e.brightness??1,m=e.saturation??1,v=(e.rotation??0)*Math.PI/180;return f.filter=`brightness(${_}) saturate(${m})`,f.translate(u/2,p/2),f.rotate(v),f.drawImage(t,h,c,a,l,-u/2,-p/2,u,p),new Promise((t,e)=>{g.toBlob(i=>i?t(i):e(new Error("Encode failed")),"image/jpeg",.9)})}(this._img,this._layer),e=new File([t],this._file?.name?.replace(/\.\w+$/,"")+".jpg"||"floorplan.jpg",{type:"image/jpeg"});this.dispatchEvent(new CustomEvent("photo-apply",{detail:{file:e,layer:this._layer},bubbles:!0,composed:!0})),this._cancel()}catch(t){this.dispatchEvent(new CustomEvent("photo-error",{detail:{message:t instanceof Error?t.message:String(t)},bubbles:!0,composed:!0}))}}render(){if(!this.open)return W``;const t=this._layer;return W`
      <div class="overlay" role="dialog" aria-label="Edit floorplan photo">
        <div class="panel">
          <header>
            <h2>Photo overlay</h2>
            <button class="icon" @click=${this._cancel} aria-label="Close">✕</button>
          </header>
          <p class="hint">Crop the room photo, tune brightness, then apply. Draw your LED path on top in the designer.</p>
          <div class="preview-wrap">
            <canvas></canvas>
            ${this._img||this._loadError?null:W`<span class="loading">Loading photo…</span>`}
            ${this._loadError?W`<span class="load-error">${this._loadError}</span>`:null}
          </div>
          ${t?W`
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
    `}static{this.styles=[..._t,o`
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
        position: relative;
        height: min(50vh, 360px);
        min-height: 200px;
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      .loading,
      .load-error {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        text-align: center;
        font-size: 0.85rem;
        pointer-events: none;
      }
      .load-error {
        color: #fca5a5;
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
    `]}};t([ct({type:Boolean})],Cs.prototype,"open",void 0),t([dt()],Cs.prototype,"_img",void 0),t([dt()],Cs.prototype,"_layer",void 0),t([dt()],Cs.prototype,"_cropDrag",void 0),t([dt()],Cs.prototype,"_cropStart",void 0),Cs=t([yt("wled-layout-photo-editor")],Cs);var ks="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Ps(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Is,$s={exports:{}};var Ms,Es=(Is||(Is=1,Ms=$s,function(){function t(t,e){var i=t.x-e.x,s=t.y-e.y;return i*i+s*s}function e(t,e,i){var s=e.x,n=e.y,r=i.x-s,o=i.y-n;if(0!==r||0!==o){var a=((t.x-s)*r+(t.y-n)*o)/(r*r+o*o);a>1?(s=i.x,n=i.y):a>0&&(s+=r*a,n+=o*a)}return(r=t.x-s)*r+(o=t.y-n)*o}function i(t,s,n,r,o){for(var a,l=r,h=s+1;h<n;h++){var c=e(t[h],t[s],t[n]);c>l&&(a=h,l=c)}l>r&&(a-s>1&&i(t,s,a,r,o),o.push(t[a]),n-a>1&&i(t,a,n,r,o))}function s(t,e){var s=t.length-1,n=[t[0]];return i(t,0,s,e,n),n.push(t[s]),n}function n(e,i,n){if(e.length<=2)return e;var r=void 0!==i?i*i:1;return e=n?e:function(e,i){for(var s,n=e[0],r=[n],o=1,a=e.length;o<a;o++)t(s=e[o],n)>i&&(r.push(s),n=s);return n!==s&&r.push(s),r}(e,r),e=s(e,r)}Ms.exports=n,Ms.exports.default=n}()),$s.exports),As=Ps(Es);function Ls(t,e,i,s){const n=Math.min(t,i),r=Math.max(t,i),o=Math.min(e,s),a=Math.max(e,s);return{points:[[n,o],[r,o],[r,a],[n,a]],closed:!0,kind:"rect"}}function Ts(t,e,i,s,n=48){const r=[];for(let o=0;o<n;o++){const a=o/n*Math.PI*2;r.push([t+Math.cos(a)*i,e+Math.sin(a)*s])}return{points:r,closed:!0,kind:"ellipse"}}function Fs(t,e){return{points:[...t],closed:e,kind:"polyline"}}function Rs(t,e,i){const s=t.points;if(0===s.length)return{x:e,y:i,t:0,dist:1/0};if(1===s.length){const t=Math.hypot(e-s[0][0],i-s[0][1]);return{x:s[0][0],y:s[0][1],t:0,dist:t}}const{segLens:n,total:r}=function(t,e){if(t.length<2)return{segLens:[],total:0};const i=[];let s=0;const n=t.length,r=e?n:n-1;for(let e=0;e<r;e++){const r=(e+1)%n,o=Math.hypot(t[r][0]-t[e][0],t[r][1]-t[e][1]);i.push(o),s+=o}return{segLens:i,total:s}}(s,t.closed);if(r<=0)return{x:e,y:i,t:0,dist:1/0};let o=1/0,a=e,l=i,h=0,c=0;const d=s.length,u=t.closed?d:d-1;for(let t=0;t<u;t++){const u=(t+1)%d,p=s[t][0],g=s[t][1],f=s[u][0],_=s[u][1],m=n[t]??0;let v=0;m>0&&(v=Math.max(0,Math.min(1,((e-p)*(f-p)+(i-g)*(_-g))/(m*m))));const y=p+v*(f-p),b=g+v*(_-g),x=Math.hypot(e-y,i-b);x<o&&(o=x,a=y,l=b,h=(c+v*m)/r),c+=m}return{x:a,y:l,t:h,dist:o}}function Ds(t,e,i){return t<=0?0:function(t,e){const i=Math.max(0,e-1);return Math.max(0,Math.min(i,Math.round(t*i)))}(e,i)}const Ns=2e6,Os=/([MLHVCSQTAZmlhvcsqtaz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;function Us(t,e){const i=function(t){const e=[];let i;for(Os.lastIndex=0;null!==(i=Os.exec(t));)i[1]?e.push(i[1]):i[2]&&e.push(parseFloat(i[2]));return e}(t.trim()),s=[];let n=0,r=0,o=0,a=0,l=0,h="",c=0;const d=()=>{const t=i[n++];return"number"==typeof t&&Number.isFinite(t)?t:0},u=(t,e)=>{r=t,o=e,s.push([r,o])},p=(t,e,i,s,n=12)=>{const a=r,l=o;for(let r=1;r<=n;r++){const o=r/n,h=1-o;u(h*h*a+2*h*o*t+o*o*i,h*h*l+2*h*o*e+o*o*s)}},g=(t,e,i,s,n,a,l=16)=>{const h=r,c=o;for(let r=1;r<=l;r++){const o=r/l,d=1-o;u(d*d*d*h+3*d*d*o*t+3*d*o*o*i+o*o*o*n,d*d*d*c+3*d*d*o*e+3*d*o*o*s+o*o*o*a)}},f=t=>{const e=function(t){switch(t.toUpperCase()){case"A":return 7;case"C":return 6;case"S":case"Q":return 4;case"T":case"L":case"M":default:return 2;case"H":case"V":return 1;case"Z":return 0}}(t);for(let t=0;t<e&&n<i.length&&"number"==typeof i[n];t++)d();"A"===t.toUpperCase()&&s.length>0&&u(r,o)};for(;n<i.length&&c++<5e4;){const t=i[n];if("string"==typeof t&&(h=t,n++),!h){"number"==typeof i[n]&&n++;continue}const e=h===h.toLowerCase()&&"Z"!==h&&"z"!==h,c=h.toUpperCase(),_=n;let m=!1;if("M"===c){const t=d()+(e?r:0),h=d()+(e?o:0);for(r=t,o=h,a=t,l=h,s.push([r,o]);n<i.length&&"number"==typeof i[n];)u(d()+(e?r:0),d()+(e?o:0));m=!0}else if("L"===c){for(;n<i.length&&"number"==typeof i[n];)u(d()+(e?r:0),d()+(e?o:0));m=!0}else if("H"===c){for(;n<i.length&&"number"==typeof i[n];)u(d()+(e?r:0),o);m=!0}else if("V"===c){for(;n<i.length&&"number"==typeof i[n];)u(r,d()+(e?o:0));m=!0}else if("Q"===c){for(;n<i.length&&"number"==typeof i[n];)p(d()+(e?r:0),d()+(e?o:0),d()+(e?r:0),d()+(e?o:0));m=!0}else if("C"===c){for(;n<i.length&&"number"==typeof i[n];)g(d()+(e?r:0),d()+(e?o:0),d()+(e?r:0),d()+(e?o:0),d()+(e?r:0),d()+(e?o:0));m=!0}else if("A"===c)d(),d(),d(),d(),d(),u(d()+(e?r:0),d()+(e?o:0)),m=!0;else if("S"===c){for(;n<i.length&&"number"==typeof i[n];)g(r,o,d()+(e?r:0),d()+(e?o:0),d()+(e?r:0),d()+(e?o:0));m=!0}else if("T"===c){for(;n<i.length&&"number"==typeof i[n];)p(r,o,d()+(e?r:0),d()+(e?o:0));m=!0}else"Z"===c&&(s.length>0&&u(a,l),r=a,o=l,m=!0);m||(f(c),n===_&&n<i.length&&n++)}return zs(s,e)}function Gs(t,e){const i=function(t,e){if("undefined"==typeof document)return null;try{const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",t);const s=i.getTotalLength();if(!Number.isFinite(s)||s<=0)return null;const n=Math.max(2,Math.min(e,Math.ceil(s/2))),r=[];for(let t=0;t<=n;t++){const e=i.getPointAtLength(s*t/n);Number.isFinite(e.x)&&Number.isFinite(e.y)&&r.push([e.x,e.y])}return r.length>=2?r:null}catch{return null}}(t,e);return i&&i.length>=2?i:Us(t,e)}function zs(t,e){if(t.length<=e)return t;const i=t.length/e,s=[];for(let n=0;n<e;n++)s.push(t[Math.floor(n*i)]);return s}function Bs(t,e=200){if(0===t.length)return t;let i=1/0,s=-1/0,n=1/0,r=-1/0;for(const[e,o]of t)e<i&&(i=e),e>s&&(s=e),o<n&&(n=o),o>r&&(r=o);const o=s-i||1,a=r-n||1,l=e/Math.max(o,a);return t.map(([t,e])=>[(t-i)*l,(e-n)*l])}function Ws(t,e){const i=t.trim().split(/[\s,]+/).map(parseFloat).filter(t=>Number.isFinite(t)),s=[];for(let t=0;t+1<i.length;t+=2)s.push([i[t],i[t+1]]);return zs(s,e)}function Vs(t){if(t.length>Ns)throw new Error("SVG too large (max 2 MB)");const e=(new DOMParser).parseFromString(t,"image/svg+xml");if(e.querySelector("parsererror"))throw new Error("Invalid SVG file");const i=Array.from(e.querySelectorAll("path")).slice(0,80);let s=[],n=!1;for(const t of i){const e=t.getAttribute("d");if(!e?.trim())continue;const i=Gs(e,400);i.length>s.length&&(s=i,n=/z\s*$/i.test(e.trim()))}if(s.length<2){const t=Array.from(e.querySelectorAll("polygon, polyline")).slice(0,80);for(const e of t){const t=e.getAttribute("points");if(!t)continue;const i=Ws(t,400);i.length>s.length&&(s=i,n="polygon"===e.tagName.toLowerCase())}}if(s.length<2)throw new Error("No paths found in SVG (use path, polyline, or polygon)");return s=function(t,e){if(t.length<=4)return t;const i=As(t.map(([t,e])=>({x:t,y:e})),1.5,!0).map(t=>[t.x,t.y]);return zs(i,e)}(s,400),{points:Bs(s),closed:n,kind:"svg"}}function Hs(t,e=!1){return new Promise((i,s)=>{const n=new Image;n.onload=()=>i(n),n.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(n,t,e)})}var js,qs={exports:{}},Ks={},Ys={},Xs={};function Zs(){return js||(js=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t._registerNode=t.Konva=t.glob=void 0;const e=Math.PI/180;t.glob=void 0!==ks?ks:"undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope?self:{},t.Konva={_global:t.glob,version:"9.3.22",isBrowser:"undefined"!=typeof window&&("[object Window]"==={}.toString.call(window)||"[object global]"==={}.toString.call(window)),isUnminified:/param/.test(function(t){}.toString()),dblClickWindow:400,getAngle:i=>t.Konva.angleDeg?i*e:i,enableTrace:!1,pointerEventsEnabled:!0,autoDrawEnabled:!0,hitOnDragEnabled:!1,capturePointerEventsEnabled:!1,_mouseListenClick:!1,_touchListenClick:!1,_pointerListenClick:!1,_mouseInDblClickWindow:!1,_touchInDblClickWindow:!1,_pointerInDblClickWindow:!1,_mouseDblClickPointerId:null,_touchDblClickPointerId:null,_pointerDblClickPointerId:null,_fixTextRendering:!1,pixelRatio:"undefined"!=typeof window&&window.devicePixelRatio||1,dragDistance:3,angleDeg:!0,showWarnings:!0,dragButtons:[0,1],isDragging:()=>t.Konva.DD.isDragging,isTransforming(){var e;return null===(e=t.Konva.Transformer)||void 0===e?void 0:e.isTransforming()},isDragReady:()=>!!t.Konva.DD.node,releaseCanvasOnDestroy:!0,document:t.glob.document,_injectGlobal(e){t.glob.Konva=e}};t._registerNode=e=>{t.Konva[e.prototype.getClassName()]=e},t.Konva._injectGlobal(t.Konva)}(Xs)),Xs}var Js,Qs={};function tn(){return Js||(Js=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Util=t.Transform=void 0;const e=Zs();class i{constructor(t=[1,0,0,1,0,0]){this.dirty=!1,this.m=t&&t.slice()||[1,0,0,1,0,0]}reset(){this.m[0]=1,this.m[1]=0,this.m[2]=0,this.m[3]=1,this.m[4]=0,this.m[5]=0}copy(){return new i(this.m)}copyInto(t){t.m[0]=this.m[0],t.m[1]=this.m[1],t.m[2]=this.m[2],t.m[3]=this.m[3],t.m[4]=this.m[4],t.m[5]=this.m[5]}point(t){const e=this.m;return{x:e[0]*t.x+e[2]*t.y+e[4],y:e[1]*t.x+e[3]*t.y+e[5]}}translate(t,e){return this.m[4]+=this.m[0]*t+this.m[2]*e,this.m[5]+=this.m[1]*t+this.m[3]*e,this}scale(t,e){return this.m[0]*=t,this.m[1]*=t,this.m[2]*=e,this.m[3]*=e,this}rotate(t){const e=Math.cos(t),i=Math.sin(t),s=this.m[0]*e+this.m[2]*i,n=this.m[1]*e+this.m[3]*i,r=this.m[0]*-i+this.m[2]*e,o=this.m[1]*-i+this.m[3]*e;return this.m[0]=s,this.m[1]=n,this.m[2]=r,this.m[3]=o,this}getTranslation(){return{x:this.m[4],y:this.m[5]}}skew(t,e){const i=this.m[0]+this.m[2]*e,s=this.m[1]+this.m[3]*e,n=this.m[2]+this.m[0]*t,r=this.m[3]+this.m[1]*t;return this.m[0]=i,this.m[1]=s,this.m[2]=n,this.m[3]=r,this}multiply(t){const e=this.m[0]*t.m[0]+this.m[2]*t.m[1],i=this.m[1]*t.m[0]+this.m[3]*t.m[1],s=this.m[0]*t.m[2]+this.m[2]*t.m[3],n=this.m[1]*t.m[2]+this.m[3]*t.m[3],r=this.m[0]*t.m[4]+this.m[2]*t.m[5]+this.m[4],o=this.m[1]*t.m[4]+this.m[3]*t.m[5]+this.m[5];return this.m[0]=e,this.m[1]=i,this.m[2]=s,this.m[3]=n,this.m[4]=r,this.m[5]=o,this}invert(){const t=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),e=this.m[3]*t,i=-this.m[1]*t,s=-this.m[2]*t,n=this.m[0]*t,r=t*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),o=t*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);return this.m[0]=e,this.m[1]=i,this.m[2]=s,this.m[3]=n,this.m[4]=r,this.m[5]=o,this}getMatrix(){return this.m}decompose(){const e=this.m[0],i=this.m[1],s=this.m[2],n=this.m[3],r=e*n-i*s,o={x:this.m[4],y:this.m[5],rotation:0,scaleX:0,scaleY:0,skewX:0,skewY:0};if(0!=e||0!=i){const t=Math.sqrt(e*e+i*i);o.rotation=i>0?Math.acos(e/t):-Math.acos(e/t),o.scaleX=t,o.scaleY=r/t,o.skewX=(e*s+i*n)/r,o.skewY=0}else if(0!=s||0!=n){const t=Math.sqrt(s*s+n*n);o.rotation=Math.PI/2-(n>0?Math.acos(-s/t):-Math.acos(s/t)),o.scaleX=r/t,o.scaleY=t,o.skewX=0,o.skewY=(e*s+i*n)/r}return o.rotation=t.Util._getRotation(o.rotation),o}}t.Transform=i;const s=Math.PI/180,n=180/Math.PI,r="Konva error: ",o={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,132,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,255,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,203],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[119,128,144],slategrey:[119,128,144],snow:[255,255,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],transparent:[255,255,255,0],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,5]},a=/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;let l=[];const h="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame||function(t){setTimeout(t,60)};t.Util={_isElement:t=>!(!t||1!=t.nodeType),_isFunction:t=>!!(t&&t.constructor&&t.call&&t.apply),_isPlainObject:t=>!!t&&t.constructor===Object,_isArray:t=>"[object Array]"===Object.prototype.toString.call(t),_isNumber:t=>"[object Number]"===Object.prototype.toString.call(t)&&!isNaN(t)&&isFinite(t),_isString:t=>"[object String]"===Object.prototype.toString.call(t),_isBoolean:t=>"[object Boolean]"===Object.prototype.toString.call(t),isObject:t=>t instanceof Object,isValidSelector(t){if("string"!=typeof t)return!1;const e=t[0];return"#"===e||"."===e||e===e.toUpperCase()},_sign:t=>0===t||t>0?1:-1,requestAnimFrame(t){l.push(t),1===l.length&&h(function(){const t=l;l=[],t.forEach(function(t){t()})})},createCanvasElement(){const t=document.createElement("canvas");try{t.style=t.style||{}}catch(t){}return t},createImageElement:()=>document.createElement("img"),_isInDocument(t){for(;t=t.parentNode;)if(t==document)return!0;return!1},_urlToImage(e,i){const s=t.Util.createImageElement();s.onload=function(){i(s)},s.src=e},_rgbToHex:(t,e,i)=>((1<<24)+(t<<16)+(e<<8)+i).toString(16).slice(1),_hexToRgb(t){t=t.replace("#","");const e=parseInt(t,16);return{r:e>>16&255,g:e>>8&255,b:255&e}},getRandomColor(){let t=(16777215*Math.random()|0).toString(16);for(;t.length<6;)t="0"+t;return"#"+t},getRGB(t){let e;return t in o?(e=o[t],{r:e[0],g:e[1],b:e[2]}):"#"===t[0]?this._hexToRgb(t.substring(1)):"rgb("===t.substr(0,4)?(e=a.exec(t.replace(/ /g,"")),{r:parseInt(e[1],10),g:parseInt(e[2],10),b:parseInt(e[3],10)}):{r:0,g:0,b:0}},colorToRGBA:e=>(e=e||"black",t.Util._namedColorToRBA(e)||t.Util._hex3ColorToRGBA(e)||t.Util._hex4ColorToRGBA(e)||t.Util._hex6ColorToRGBA(e)||t.Util._hex8ColorToRGBA(e)||t.Util._rgbColorToRGBA(e)||t.Util._rgbaColorToRGBA(e)||t.Util._hslColorToRGBA(e)),_namedColorToRBA(t){const e=o[t.toLowerCase()];return e?{r:e[0],g:e[1],b:e[2],a:1}:null},_rgbColorToRGBA(t){if(0===t.indexOf("rgb(")){const e=(t=t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);return{r:e[0],g:e[1],b:e[2],a:1}}},_rgbaColorToRGBA(t){if(0===t.indexOf("rgba(")){const e=(t=t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map((t,e)=>"%"===t.slice(-1)?3===e?parseInt(t)/100:parseInt(t)/100*255:Number(t));return{r:e[0],g:e[1],b:e[2],a:e[3]}}},_hex8ColorToRGBA(t){if("#"===t[0]&&9===t.length)return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16),a:parseInt(t.slice(7,9),16)/255}},_hex6ColorToRGBA(t){if("#"===t[0]&&7===t.length)return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16),a:1}},_hex4ColorToRGBA(t){if("#"===t[0]&&5===t.length)return{r:parseInt(t[1]+t[1],16),g:parseInt(t[2]+t[2],16),b:parseInt(t[3]+t[3],16),a:parseInt(t[4]+t[4],16)/255}},_hex3ColorToRGBA(t){if("#"===t[0]&&4===t.length)return{r:parseInt(t[1]+t[1],16),g:parseInt(t[2]+t[2],16),b:parseInt(t[3]+t[3],16),a:1}},_hslColorToRGBA(t){if(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)){const[e,...i]=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),s=Number(i[0])/360,n=Number(i[1])/100,r=Number(i[2])/100;let o,a,l;if(0===n)return l=255*r,{r:Math.round(l),g:Math.round(l),b:Math.round(l),a:1};o=r<.5?r*(1+n):r+n-r*n;const h=2*r-o,c=[0,0,0];for(let t=0;t<3;t++)a=s+1/3*-(t-1),a<0&&a++,a>1&&a--,l=6*a<1?h+6*(o-h)*a:2*a<1?o:3*a<2?h+(o-h)*(2/3-a)*6:h,c[t]=255*l;return{r:Math.round(c[0]),g:Math.round(c[1]),b:Math.round(c[2]),a:1}}},haveIntersection:(t,e)=>!(e.x>t.x+t.width||e.x+e.width<t.x||e.y>t.y+t.height||e.y+e.height<t.y),cloneObject(t){const e={};for(const i in t)this._isPlainObject(t[i])?e[i]=this.cloneObject(t[i]):this._isArray(t[i])?e[i]=this.cloneArray(t[i]):e[i]=t[i];return e},cloneArray:t=>t.slice(0),degToRad:t=>t*s,radToDeg:t=>t*n,_degToRad:e=>(t.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead."),t.Util.degToRad(e)),_radToDeg:e=>(t.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."),t.Util.radToDeg(e)),_getRotation:i=>e.Konva.angleDeg?t.Util.radToDeg(i):i,_capitalize:t=>t.charAt(0).toUpperCase()+t.slice(1),throw(t){throw new Error(r+t)},error(t){console.error(r+t)},warn(t){e.Konva.showWarnings&&console.warn("Konva warning: "+t)},each(t,e){for(const i in t)e(i,t[i])},_inRange:(t,e,i)=>e<=t&&t<i,_getProjectionToSegment(t,e,i,s,n,r){let o,a,l;const h=(t-i)*(t-i)+(e-s)*(e-s);if(0==h)o=t,a=e,l=(n-i)*(n-i)+(r-s)*(r-s);else{const c=((n-t)*(i-t)+(r-e)*(s-e))/h;c<0?(o=t,a=e,l=(t-n)*(t-n)+(e-r)*(e-r)):c>1?(o=i,a=s,l=(i-n)*(i-n)+(s-r)*(s-r)):(o=t+c*(i-t),a=e+c*(s-e),l=(o-n)*(o-n)+(a-r)*(a-r))}return[o,a,l]},_getProjectionToLine(e,i,s){const n=t.Util.cloneObject(e);let r=Number.MAX_VALUE;return i.forEach(function(o,a){if(!s&&a===i.length-1)return;const l=i[(a+1)%i.length],h=t.Util._getProjectionToSegment(o.x,o.y,l.x,l.y,e.x,e.y),c=h[0],d=h[1],u=h[2];u<r&&(n.x=c,n.y=d,r=u)}),n},_prepareArrayForTween(e,i,s){const n=[],r=[];if(e.length>i.length){const t=i;i=e,e=t}for(let t=0;t<e.length;t+=2)n.push({x:e[t],y:e[t+1]});for(let t=0;t<i.length;t+=2)r.push({x:i[t],y:i[t+1]});const o=[];return r.forEach(function(e){const i=t.Util._getProjectionToLine(e,n,s);o.push(i.x),o.push(i.y)}),o},_prepareToStringify(e){let i;e.visitedByCircularReferenceRemoval=!0;for(const s in e)if(e.hasOwnProperty(s)&&e[s]&&"object"==typeof e[s])if(i=Object.getOwnPropertyDescriptor(e,s),e[s].visitedByCircularReferenceRemoval||t.Util._isElement(e[s])){if(!i.configurable)return null;delete e[s]}else if(null===t.Util._prepareToStringify(e[s])){if(!i.configurable)return null;delete e[s]}return delete e.visitedByCircularReferenceRemoval,e},_assign(t,e){for(const i in e)t[i]=e[i];return t},_getFirstPointerId:t=>t.touches?t.changedTouches[0].identifier:t.pointerId||999,releaseCanvas(...t){e.Konva.releaseCanvasOnDestroy&&t.forEach(t=>{t.width=0,t.height=0})},drawRoundedRectPath(t,e,i,s){let n=0,r=0,o=0,a=0;"number"==typeof s?n=r=o=a=Math.min(s,e/2,i/2):(n=Math.min(s[0]||0,e/2,i/2),r=Math.min(s[1]||0,e/2,i/2),a=Math.min(s[2]||0,e/2,i/2),o=Math.min(s[3]||0,e/2,i/2)),t.moveTo(n,0),t.lineTo(e-r,0),t.arc(e-r,r,r,3*Math.PI/2,0,!1),t.lineTo(e,i-a),t.arc(e-a,i-a,a,0,Math.PI/2,!1),t.lineTo(o,i),t.arc(o,i-o,o,Math.PI/2,Math.PI,!1),t.lineTo(0,n),t.arc(n,n,n,Math.PI,3*Math.PI/2,!1)}}}(Qs)),Qs}var en,sn,nn={},rn={},on={};function an(){if(en)return on;en=1,Object.defineProperty(on,"__esModule",{value:!0}),on.HitContext=on.SceneContext=on.Context=void 0;const t=tn(),e=Zs();const i=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createLinearGradient","createPattern","createRadialGradient","drawImage","ellipse","fill","fillText","getImageData","createImageData","lineTo","moveTo","putImageData","quadraticCurveTo","rect","roundRect","restore","rotate","save","scale","setLineDash","setTransform","stroke","strokeText","transform","translate"];let s=class{constructor(t){this.canvas=t,e.Konva.enableTrace&&(this.traceArr=[],this._enableTrace())}fillShape(t){t.fillEnabled()&&this._fill(t)}_fill(t){}strokeShape(t){t.hasStroke()&&this._stroke(t)}_stroke(t){}fillStrokeShape(t){t.attrs.fillAfterStrokeEnabled?(this.strokeShape(t),this.fillShape(t)):(this.fillShape(t),this.strokeShape(t))}getTrace(e,i){let s,n,r,o,a=this.traceArr,l=a.length,h="";for(s=0;s<l;s++)n=a[s],r=n.method,r?(o=n.args,h+=r,e?h+="()":t.Util._isArray(o[0])?h+="(["+o.join(",")+"])":(i&&(o=o.map(t=>"number"==typeof t?Math.floor(t):t)),h+="("+o.join(",")+")")):(h+=n.property,e||(h+="="+n.val)),h+=";";return h}clearTrace(){this.traceArr=[]}_trace(t){let e,i=this.traceArr;i.push(t),e=i.length,e>=100&&i.shift()}reset(){const t=this.getCanvas().getPixelRatio();this.setTransform(1*t,0,0,1*t,0,0)}getCanvas(){return this.canvas}clear(t){const e=this.getCanvas();t?this.clearRect(t.x||0,t.y||0,t.width||0,t.height||0):this.clearRect(0,0,e.getWidth()/e.pixelRatio,e.getHeight()/e.pixelRatio)}_applyLineCap(t){const e=t.attrs.lineCap;e&&this.setAttr("lineCap",e)}_applyOpacity(t){const e=t.getAbsoluteOpacity();1!==e&&this.setAttr("globalAlpha",e)}_applyLineJoin(t){const e=t.attrs.lineJoin;e&&this.setAttr("lineJoin",e)}setAttr(t,e){this._context[t]=e}arc(t,e,i,s,n,r){this._context.arc(t,e,i,s,n,r)}arcTo(t,e,i,s,n){this._context.arcTo(t,e,i,s,n)}beginPath(){this._context.beginPath()}bezierCurveTo(t,e,i,s,n,r){this._context.bezierCurveTo(t,e,i,s,n,r)}clearRect(t,e,i,s){this._context.clearRect(t,e,i,s)}clip(...t){this._context.clip.apply(this._context,t)}closePath(){this._context.closePath()}createImageData(t,e){const i=arguments;return 2===i.length?this._context.createImageData(t,e):1===i.length?this._context.createImageData(t):void 0}createLinearGradient(t,e,i,s){return this._context.createLinearGradient(t,e,i,s)}createPattern(t,e){return this._context.createPattern(t,e)}createRadialGradient(t,e,i,s,n,r){return this._context.createRadialGradient(t,e,i,s,n,r)}drawImage(t,e,i,s,n,r,o,a,l){const h=arguments,c=this._context;3===h.length?c.drawImage(t,e,i):5===h.length?c.drawImage(t,e,i,s,n):9===h.length&&c.drawImage(t,e,i,s,n,r,o,a,l)}ellipse(t,e,i,s,n,r,o,a){this._context.ellipse(t,e,i,s,n,r,o,a)}isPointInPath(t,e,i,s){return i?this._context.isPointInPath(i,t,e,s):this._context.isPointInPath(t,e,s)}fill(...t){this._context.fill.apply(this._context,t)}fillRect(t,e,i,s){this._context.fillRect(t,e,i,s)}strokeRect(t,e,i,s){this._context.strokeRect(t,e,i,s)}fillText(t,e,i,s){s?this._context.fillText(t,e,i,s):this._context.fillText(t,e,i)}measureText(t){return this._context.measureText(t)}getImageData(t,e,i,s){return this._context.getImageData(t,e,i,s)}lineTo(t,e){this._context.lineTo(t,e)}moveTo(t,e){this._context.moveTo(t,e)}rect(t,e,i,s){this._context.rect(t,e,i,s)}roundRect(t,e,i,s,n){this._context.roundRect(t,e,i,s,n)}putImageData(t,e,i){this._context.putImageData(t,e,i)}quadraticCurveTo(t,e,i,s){this._context.quadraticCurveTo(t,e,i,s)}restore(){this._context.restore()}rotate(t){this._context.rotate(t)}save(){this._context.save()}scale(t,e){this._context.scale(t,e)}setLineDash(t){this._context.setLineDash?this._context.setLineDash(t):"mozDash"in this._context?this._context.mozDash=t:"webkitLineDash"in this._context&&(this._context.webkitLineDash=t)}getLineDash(){return this._context.getLineDash()}setTransform(t,e,i,s,n,r){this._context.setTransform(t,e,i,s,n,r)}stroke(t){t?this._context.stroke(t):this._context.stroke()}strokeText(t,e,i,s){this._context.strokeText(t,e,i,s)}transform(t,e,i,s,n,r){this._context.transform(t,e,i,s,n,r)}translate(t,e){this._context.translate(t,e)}_enableTrace(){let e,s,n=this,r=i.length,o=this.setAttr;const a=function(e){let i,r=n[e];n[e]=function(){return s=function(e){const i=[],s=e.length,n=t.Util;for(let t=0;t<s;t++){let s=e[t];n._isNumber(s)?s=Math.round(1e3*s)/1e3:n._isString(s)||(s+=""),i.push(s)}return i}(Array.prototype.slice.call(arguments,0)),i=r.apply(n,arguments),n._trace({method:e,args:s}),i}};for(e=0;e<r;e++)a(i[e]);n.setAttr=function(){o.apply(n,arguments);const t=arguments[0];let e=arguments[1];"shadowOffsetX"!==t&&"shadowOffsetY"!==t&&"shadowBlur"!==t||(e/=this.canvas.getPixelRatio()),n._trace({property:t,val:e})}}_applyGlobalCompositeOperation(t){const e=t.attrs.globalCompositeOperation;!e||"source-over"===e||this.setAttr("globalCompositeOperation",e)}};on.Context=s,["fillStyle","strokeStyle","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","letterSpacing","lineCap","lineDashOffset","lineJoin","lineWidth","miterLimit","direction","font","textAlign","textBaseline","globalAlpha","globalCompositeOperation","imageSmoothingEnabled"].forEach(function(t){Object.defineProperty(s.prototype,t,{get(){return this._context[t]},set(e){this._context[t]=e}})});on.SceneContext=class extends s{constructor(t,{willReadFrequently:e=!1}={}){super(t),this._context=t._canvas.getContext("2d",{willReadFrequently:e})}_fillColor(t){const e=t.fill();this.setAttr("fillStyle",e),t._fillFunc(this)}_fillPattern(t){this.setAttr("fillStyle",t._getFillPattern()),t._fillFunc(this)}_fillLinearGradient(t){const e=t._getLinearGradient();e&&(this.setAttr("fillStyle",e),t._fillFunc(this))}_fillRadialGradient(t){const e=t._getRadialGradient();e&&(this.setAttr("fillStyle",e),t._fillFunc(this))}_fill(t){const e=t.fill(),i=t.getFillPriority();if(e&&"color"===i)return void this._fillColor(t);const s=t.getFillPatternImage();if(s&&"pattern"===i)return void this._fillPattern(t);const n=t.getFillLinearGradientColorStops();if(n&&"linear-gradient"===i)return void this._fillLinearGradient(t);const r=t.getFillRadialGradientColorStops();r&&"radial-gradient"===i?this._fillRadialGradient(t):e?this._fillColor(t):s?this._fillPattern(t):n?this._fillLinearGradient(t):r&&this._fillRadialGradient(t)}_strokeLinearGradient(t){const e=t.getStrokeLinearGradientStartPoint(),i=t.getStrokeLinearGradientEndPoint(),s=t.getStrokeLinearGradientColorStops(),n=this.createLinearGradient(e.x,e.y,i.x,i.y);if(s){for(let t=0;t<s.length;t+=2)n.addColorStop(s[t],s[t+1]);this.setAttr("strokeStyle",n)}}_stroke(t){const e=t.dash(),i=t.getStrokeScaleEnabled();if(t.hasStroke()){if(!i){this.save();const t=this.getCanvas().getPixelRatio();this.setTransform(t,0,0,t,0,0)}this._applyLineCap(t),e&&t.dashEnabled()&&(this.setLineDash(e),this.setAttr("lineDashOffset",t.dashOffset())),this.setAttr("lineWidth",t.strokeWidth()),t.getShadowForStrokeEnabled()||this.setAttr("shadowColor","rgba(0,0,0,0)");t.getStrokeLinearGradientColorStops()?this._strokeLinearGradient(t):this.setAttr("strokeStyle",t.stroke()),t._strokeFunc(this),i||this.restore()}}_applyShadow(t){var e,i,s;const n=null!==(e=t.getShadowRGBA())&&void 0!==e?e:"black",r=null!==(i=t.getShadowBlur())&&void 0!==i?i:5,o=null!==(s=t.getShadowOffset())&&void 0!==s?s:{x:0,y:0},a=t.getAbsoluteScale(),l=this.canvas.getPixelRatio(),h=a.x*l,c=a.y*l;this.setAttr("shadowColor",n),this.setAttr("shadowBlur",r*Math.min(Math.abs(h),Math.abs(c))),this.setAttr("shadowOffsetX",o.x*h),this.setAttr("shadowOffsetY",o.y*c)}};return on.HitContext=class extends s{constructor(t){super(t),this._context=t._canvas.getContext("2d",{willReadFrequently:!0})}_fill(t){this.save(),this.setAttr("fillStyle",t.colorKey),t._fillFuncHit(this),this.restore()}strokeShape(t){t.hasHitStroke()&&this._stroke(t)}_stroke(t){if(t.hasHitStroke()){const e=t.getStrokeScaleEnabled();if(!e){this.save();const t=this.getCanvas().getPixelRatio();this.setTransform(t,0,0,t,0,0)}this._applyLineCap(t);const i=t.hitStrokeWidth(),s="auto"===i?t.strokeWidth():i;this.setAttr("lineWidth",s),this.setAttr("strokeStyle",t.colorKey),t._strokeFuncHit(this),e||this.restore()}}},on}function ln(){if(sn)return rn;sn=1,Object.defineProperty(rn,"__esModule",{value:!0}),rn.HitCanvas=rn.SceneCanvas=rn.Canvas=void 0;const t=tn(),e=an(),i=Zs();let s;let n=class{constructor(e){this.pixelRatio=1,this.width=0,this.height=0,this.isCache=!1;const n=(e||{}).pixelRatio||i.Konva.pixelRatio||function(){if(s)return s;const e=t.Util.createCanvasElement(),n=e.getContext("2d");return s=(i.Konva._global.devicePixelRatio||1)/(n.webkitBackingStorePixelRatio||n.mozBackingStorePixelRatio||n.msBackingStorePixelRatio||n.oBackingStorePixelRatio||n.backingStorePixelRatio||1),t.Util.releaseCanvas(e),s}();this.pixelRatio=n,this._canvas=t.Util.createCanvasElement(),this._canvas.style.padding="0",this._canvas.style.margin="0",this._canvas.style.border="0",this._canvas.style.background="transparent",this._canvas.style.position="absolute",this._canvas.style.top="0",this._canvas.style.left="0"}getContext(){return this.context}getPixelRatio(){return this.pixelRatio}setPixelRatio(t){const e=this.pixelRatio;this.pixelRatio=t,this.setSize(this.getWidth()/e,this.getHeight()/e)}setWidth(t){this.width=this._canvas.width=t*this.pixelRatio,this._canvas.style.width=t+"px";const e=this.pixelRatio;this.getContext()._context.scale(e,e)}setHeight(t){this.height=this._canvas.height=t*this.pixelRatio,this._canvas.style.height=t+"px";const e=this.pixelRatio;this.getContext()._context.scale(e,e)}getWidth(){return this.width}getHeight(){return this.height}setSize(t,e){this.setWidth(t||0),this.setHeight(e||0)}toDataURL(e,i){try{return this._canvas.toDataURL(e,i)}catch(e){try{return this._canvas.toDataURL()}catch(e){return t.Util.error("Unable to get data URL. "+e.message+" For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."),""}}}};rn.Canvas=n;rn.SceneCanvas=class extends n{constructor(t={width:0,height:0,willReadFrequently:!1}){super(t),this.context=new e.SceneContext(this,{willReadFrequently:t.willReadFrequently}),this.setSize(t.width,t.height)}};return rn.HitCanvas=class extends n{constructor(t={width:0,height:0}){super(t),this.hitCanvas=!0,this.context=new e.HitContext(this),this.setSize(t.width,t.height)}},rn}var hn,cn={};function dn(){return hn||(hn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.DD=void 0;const e=Zs(),i=tn();t.DD={get isDragging(){let e=!1;return t.DD._dragElements.forEach(t=>{"dragging"===t.dragStatus&&(e=!0)}),e},justDragged:!1,get node(){let e;return t.DD._dragElements.forEach(t=>{e=t.node}),e},_dragElements:new Map,_drag(e){const s=[];t.DD._dragElements.forEach((t,n)=>{const{node:r}=t,o=r.getStage();o.setPointersPositions(e),void 0===t.pointerId&&(t.pointerId=i.Util._getFirstPointerId(e));const a=o._changedPointerPositions.find(e=>e.id===t.pointerId);if(a){if("dragging"!==t.dragStatus){const i=r.dragDistance();if(Math.max(Math.abs(a.x-t.startPointerPos.x),Math.abs(a.y-t.startPointerPos.y))<i)return;if(r.startDrag({evt:e}),!r.isDragging())return}r._setDragPosition(e,t),s.push(r)}}),s.forEach(t=>{t.fire("dragmove",{type:"dragmove",target:t,evt:e},!0)})},_endDragBefore(i){const s=[];t.DD._dragElements.forEach(n=>{const{node:r}=n,o=r.getStage();i&&o.setPointersPositions(i);if(!o._changedPointerPositions.find(t=>t.id===n.pointerId))return;"dragging"!==n.dragStatus&&"stopped"!==n.dragStatus||(t.DD.justDragged=!0,e.Konva._mouseListenClick=!1,e.Konva._touchListenClick=!1,e.Konva._pointerListenClick=!1,n.dragStatus="stopped");const a=n.node.getLayer()||n.node instanceof e.Konva.Stage&&n.node;a&&-1===s.indexOf(a)&&s.push(a)}),s.forEach(t=>{t.draw()})},_endDragAfter(e){t.DD._dragElements.forEach((i,s)=>{"stopped"===i.dragStatus&&i.node.fire("dragend",{type:"dragend",target:i.node,evt:e},!0),"dragging"!==i.dragStatus&&t.DD._dragElements.delete(s)})}},e.Konva.isBrowser&&(window.addEventListener("mouseup",t.DD._endDragBefore,!0),window.addEventListener("touchend",t.DD._endDragBefore,!0),window.addEventListener("touchcancel",t.DD._endDragBefore,!0),window.addEventListener("mousemove",t.DD._drag),window.addEventListener("touchmove",t.DD._drag),window.addEventListener("mouseup",t.DD._endDragAfter,!1),window.addEventListener("touchend",t.DD._endDragAfter,!1),window.addEventListener("touchcancel",t.DD._endDragAfter,!1))}(cn)),cn}var un,pn,gn,fn={},_n={};function mn(){if(un)return _n;un=1,Object.defineProperty(_n,"__esModule",{value:!0}),_n.RGBComponent=function(t){if(t>255)return 255;if(t<0)return 0;return Math.round(t)},_n.alphaComponent=function(t){if(t>1)return 1;if(t<1e-4)return 1e-4;return t},_n.getNumberValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isNumber(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a number.'),t}},_n.getNumberOrArrayOfNumbersValidator=function(s){if(t.Konva.isUnminified)return function(t,n){let r=e.Util._isNumber(t),o=e.Util._isArray(t)&&t.length==s;return r||o||e.Util.warn(i(t)+' is a not valid value for "'+n+'" attribute. The value should be a number or Array<number>('+s+")"),t}},_n.getNumberOrAutoValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isNumber(t)||"auto"===t||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a number or "auto".'),t}},_n.getStringValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isString(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a string.'),t}},_n.getStringOrGradientValidator=function(){if(t.Konva.isUnminified)return function(t,s){const n=e.Util._isString(t),r="[object CanvasGradient]"===Object.prototype.toString.call(t)||t&&t.addColorStop;return n||r||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a string or a native gradient.'),t}},_n.getFunctionValidator=function(){if(t.Konva.isUnminified)return function(t,s){return e.Util._isFunction(t)||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a function.'),t}},_n.getNumberArrayValidator=function(){if(t.Konva.isUnminified)return function(t,s){const n=Int8Array?Object.getPrototypeOf(Int8Array):null;return n&&t instanceof n||(e.Util._isArray(t)?t.forEach(function(t){e.Util._isNumber(t)||e.Util.warn('"'+s+'" attribute has non numeric element '+t+". Make sure that all elements are numbers.")}):e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a array of numbers.')),t}},_n.getBooleanValidator=function(){if(t.Konva.isUnminified)return function(t,s){return!0===t||!1===t||e.Util.warn(i(t)+' is a not valid value for "'+s+'" attribute. The value should be a boolean.'),t}},_n.getComponentValidator=function(s){if(t.Konva.isUnminified)return function(t,n){return null==t||e.Util.isObject(t)||e.Util.warn(i(t)+' is a not valid value for "'+n+'" attribute. The value should be an object with properties '+s),t}};const t=Zs(),e=tn();function i(t){return e.Util._isString(t)?'"'+t+'"':"[object Number]"===Object.prototype.toString.call(t)||e.Util._isBoolean(t)?t:Object.prototype.toString.call(t)}return _n}function vn(){return pn||(pn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Factory=void 0;const e=tn(),i=mn(),s="get",n="set";t.Factory={addGetterSetter(e,i,s,n,r){t.Factory.addGetter(e,i,s),t.Factory.addSetter(e,i,n,r),t.Factory.addOverloadedGetterSetter(e,i)},addGetter(t,i,n){const r=s+e.Util._capitalize(i);t.prototype[r]=t.prototype[r]||function(){const t=this.attrs[i];return void 0===t?n:t}},addSetter(i,s,r,o){const a=n+e.Util._capitalize(s);i.prototype[a]||t.Factory.overWriteSetter(i,s,r,o)},overWriteSetter(t,i,s,r){const o=n+e.Util._capitalize(i);t.prototype[o]=function(t){return s&&null!=t&&(t=s.call(this,t,i)),this._setAttr(i,t),r&&r.call(this),this}},addComponentsGetterSetter(r,o,a,l,h){const c=a.length,d=e.Util._capitalize,u=s+d(o),p=n+d(o);r.prototype[u]=function(){const t={};for(let e=0;e<c;e++){const i=a[e];t[i]=this.getAttr(o+d(i))}return t};const g=(0,i.getComponentValidator)(a);r.prototype[p]=function(t){const e=this.attrs[o];l&&(t=l.call(this,t,o)),g&&g.call(this,t,o);for(const e in t)t.hasOwnProperty(e)&&this._setAttr(o+d(e),t[e]);return t||a.forEach(t=>{this._setAttr(o+d(t),void 0)}),this._fireChangeEvent(o,e,t),h&&h.call(this),this},t.Factory.addOverloadedGetterSetter(r,o)},addOverloadedGetterSetter(t,i){const r=e.Util._capitalize(i),o=n+r,a=s+r;t.prototype[i]=function(){return arguments.length?(this[o](arguments[0]),this):this[a]()}},addDeprecatedGetterSetter(i,n,r,o){e.Util.error("Adding deprecated "+n);const a=s+e.Util._capitalize(n),l=n+" property is deprecated and will be removed soon. Look at Konva change log for more information.";i.prototype[a]=function(){e.Util.error(l);const t=this.attrs[n];return void 0===t?r:t},t.Factory.addSetter(i,n,o,function(){e.Util.error(l)}),t.Factory.addOverloadedGetterSetter(i,n)},backCompat(t,i){e.Util.each(i,function(i,r){const o=t.prototype[r],a=s+e.Util._capitalize(i),l=n+e.Util._capitalize(i);function h(){o.apply(this,arguments),e.Util.error('"'+i+'" method is deprecated and will be removed soon. Use ""'+r+'" instead.')}t.prototype[i]=h,t.prototype[a]=h,t.prototype[l]=h})},afterSetFilter(){this._filterUpToDate=!1}}}(fn)),fn}function yn(){if(gn)return nn;gn=1,Object.defineProperty(nn,"__esModule",{value:!0}),nn.Node=void 0;const t=ln(),e=dn(),i=vn(),s=Zs(),n=tn(),r=mn(),o="absoluteOpacity",a="allEventListeners",l="absoluteTransform",h="absoluteScale",c="canvas",d="listening",u="Shape",p=" ",g="stage",f="transform",_="visible",m=["xChange.konva","yChange.konva","scaleXChange.konva","scaleYChange.konva","skewXChange.konva","skewYChange.konva","rotationChange.konva","offsetXChange.konva","offsetYChange.konva","transformsEnabledChange.konva"].join(p);let v=1,y=class i{constructor(t){this._id=v++,this.eventListeners={},this.attrs={},this.index=0,this._allEventListeners=null,this.parent=null,this._cache=new Map,this._attachedDepsListeners=new Map,this._lastPos=null,this._batchingTransformChange=!1,this._needClearTransformCache=!1,this._filterUpToDate=!1,this._isUnderCache=!1,this._dragEventId=null,this._shouldFireChangeEvents=!1,this.setAttrs(t),this._shouldFireChangeEvents=!0}hasChildren(){return!1}_clearCache(t){t!==f&&t!==l||!this._cache.get(t)?t?this._cache.delete(t):this._cache.clear():this._cache.get(t).dirty=!0}_getCache(t,e){let i=this._cache.get(t);return(void 0===i||(t===f||t===l)&&!0===i.dirty)&&(i=e.call(this),this._cache.set(t,i)),i}_calculate(t,e,i){if(!this._attachedDepsListeners.get(t)){const i=e.map(t=>t+"Change.konva").join(p);this.on(i,()=>{this._clearCache(t)}),this._attachedDepsListeners.set(t,!0)}return this._getCache(t,i)}_getCanvasCache(){return this._cache.get(c)}_clearSelfAndDescendantCache(t){this._clearCache(t),t===l&&this.fire("absoluteTransformChange")}clearCache(){if(this._cache.has(c)){const{scene:t,filter:e,hit:i,buffer:s}=this._cache.get(c);n.Util.releaseCanvas(t,e,i,s),this._cache.delete(c)}return this._clearSelfAndDescendantCache(),this._requestDraw(),this}cache(e){const i=e||{};let s={};void 0!==i.x&&void 0!==i.y&&void 0!==i.width&&void 0!==i.height||(s=this.getClientRect({skipTransform:!0,relativeTo:this.getParent()||void 0}));let r=Math.ceil(i.width||s.width),a=Math.ceil(i.height||s.height),l=i.pixelRatio,d=void 0===i.x?Math.floor(s.x):i.x,u=void 0===i.y?Math.floor(s.y):i.y,p=i.offset||0,g=i.drawBorder||!1,f=i.hitCanvasPixelRatio||1;if(!r||!a)return void n.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");r+=2*p+(Math.abs(Math.round(s.x)-d)>.5?1:0),a+=2*p+(Math.abs(Math.round(s.y)-u)>.5?1:0),d-=p,u-=p;const _=new t.SceneCanvas({pixelRatio:l,width:r,height:a}),m=new t.SceneCanvas({pixelRatio:l,width:0,height:0,willReadFrequently:!0}),v=new t.HitCanvas({pixelRatio:f,width:r,height:a}),y=_.getContext(),b=v.getContext(),x=new t.SceneCanvas({width:_.width/_.pixelRatio+Math.abs(d),height:_.height/_.pixelRatio+Math.abs(u),pixelRatio:_.pixelRatio}),w=x.getContext();return v.isCache=!0,_.isCache=!0,this._cache.delete(c),this._filterUpToDate=!1,!1===i.imageSmoothingEnabled&&(_.getContext()._context.imageSmoothingEnabled=!1,m.getContext()._context.imageSmoothingEnabled=!1),y.save(),b.save(),w.save(),y.translate(-d,-u),b.translate(-d,-u),w.translate(-d,-u),x.x=d,x.y=u,this._isUnderCache=!0,this._clearSelfAndDescendantCache(o),this._clearSelfAndDescendantCache(h),this.drawScene(_,this,x),this.drawHit(v,this),this._isUnderCache=!1,y.restore(),b.restore(),g&&(y.save(),y.beginPath(),y.rect(0,0,r,a),y.closePath(),y.setAttr("strokeStyle","red"),y.setAttr("lineWidth",5),y.stroke(),y.restore()),this._cache.set(c,{scene:_,filter:m,hit:v,buffer:x,x:d,y:u}),this._requestDraw(),this}isCached(){return this._cache.has(c)}getClientRect(t){throw new Error('abstract "getClientRect" method call')}_transformedRect(t,e){const i=[{x:t.x,y:t.y},{x:t.x+t.width,y:t.y},{x:t.x+t.width,y:t.y+t.height},{x:t.x,y:t.y+t.height}];let s=1/0,n=1/0,r=-1/0,o=-1/0;const a=this.getAbsoluteTransform(e);return i.forEach(function(t){const e=a.point(t);void 0===s&&(s=r=e.x,n=o=e.y),s=Math.min(s,e.x),n=Math.min(n,e.y),r=Math.max(r,e.x),o=Math.max(o,e.y)}),{x:s,y:n,width:r-s,height:o-n}}_drawCachedSceneCanvas(t){t.save(),t._applyOpacity(this),t._applyGlobalCompositeOperation(this);const e=this._getCanvasCache();t.translate(e.x,e.y);const i=this._getCachedSceneCanvas(),s=i.pixelRatio;t.drawImage(i._canvas,0,0,i.width/s,i.height/s),t.restore()}_drawCachedHitCanvas(t){const e=this._getCanvasCache(),i=e.hit;t.save(),t.translate(e.x,e.y),t.drawImage(i._canvas,0,0,i.width/i.pixelRatio,i.height/i.pixelRatio),t.restore()}_getCachedSceneCanvas(){let t,e,i,s,r=this.filters(),o=this._getCanvasCache(),a=o.scene,l=o.filter,h=l.getContext();if(r){if(!this._filterUpToDate){const o=a.pixelRatio;l.setSize(a.width/a.pixelRatio,a.height/a.pixelRatio);try{for(t=r.length,h.clear(),h.drawImage(a._canvas,0,0,a.getWidth()/o,a.getHeight()/o),e=h.getImageData(0,0,l.getWidth(),l.getHeight()),i=0;i<t;i++)s=r[i],"function"==typeof s?(s.call(this,e),h.putImageData(e,0,0)):n.Util.error("Filter should be type of function, but got "+typeof s+" instead. Please check correct filters")}catch(t){n.Util.error("Unable to apply filter. "+t.message+" This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")}this._filterUpToDate=!0}return l}return a}on(t,e){if(this._cache&&this._cache.delete(a),3===arguments.length)return this._delegate.apply(this,arguments);const i=t.split(p);for(let t=0;t<i.length;t++){const s=i[t].split("."),n=s[0],r=s[1]||"";this.eventListeners[n]||(this.eventListeners[n]=[]),this.eventListeners[n].push({name:r,handler:e})}return this}off(t,e){let i,s,n,r,o,l,h=(t||"").split(p),c=h.length;if(this._cache&&this._cache.delete(a),!t)for(s in this.eventListeners)this._off(s);for(i=0;i<c;i++)if(n=h[i],r=n.split("."),o=r[0],l=r[1],o)this.eventListeners[o]&&this._off(o,l,e);else for(s in this.eventListeners)this._off(s,l,e);return this}dispatchEvent(t){const e={target:this,type:t.type,evt:t};return this.fire(t.type,e),this}addEventListener(t,e){return this.on(t,function(t){e.call(this,t.evt)}),this}removeEventListener(t){return this.off(t),this}_delegate(t,e,i){const s=this;this.on(t,function(t){const r=t.target.findAncestors(e,!0,s);for(let e=0;e<r.length;e++)(t=n.Util.cloneObject(t)).currentTarget=r[e],i.call(r[e],t)})}remove(){return this.isDragging()&&this.stopDrag(),e.DD._dragElements.delete(this._id),this._remove(),this}_clearCaches(){this._clearSelfAndDescendantCache(l),this._clearSelfAndDescendantCache(o),this._clearSelfAndDescendantCache(h),this._clearSelfAndDescendantCache(g),this._clearSelfAndDescendantCache(_),this._clearSelfAndDescendantCache(d)}_remove(){this._clearCaches();const t=this.getParent();t&&t.children&&(t.children.splice(this.index,1),t._setChildrenIndices(),this.parent=null)}destroy(){return this.remove(),this.clearCache(),this}getAttr(t){const e="get"+n.Util._capitalize(t);return n.Util._isFunction(this[e])?this[e]():this.attrs[t]}getAncestors(){let t=this.getParent(),e=[];for(;t;)e.push(t),t=t.getParent();return e}getAttrs(){return this.attrs||{}}setAttrs(t){return this._batchTransformChanges(()=>{let e,i;if(!t)return this;for(e in t)"children"!==e&&(i="set"+n.Util._capitalize(e),n.Util._isFunction(this[i])?this[i](t[e]):this._setAttr(e,t[e]))}),this}isListening(){return this._getCache(d,this._isListening)}_isListening(t){if(!this.listening())return!1;const e=this.getParent();return!e||e===t||this===t||e._isListening(t)}isVisible(){return this._getCache(_,this._isVisible)}_isVisible(t){if(!this.visible())return!1;const e=this.getParent();return!e||e===t||this===t||e._isVisible(t)}shouldDrawHit(t,i=!1){if(t)return this._isVisible(t)&&this._isListening(t);const n=this.getLayer();let r=!1;e.DD._dragElements.forEach(t=>{"dragging"===t.dragStatus&&("Stage"===t.node.nodeType||t.node.getLayer()===n)&&(r=!0)});const o=!i&&!s.Konva.hitOnDragEnabled&&(r||s.Konva.isTransforming());return this.isListening()&&this.isVisible()&&!o}show(){return this.visible(!0),this}hide(){return this.visible(!1),this}getZIndex(){return this.index||0}getAbsoluteZIndex(){let t,e,i,s,n=this.getDepth(),r=this,o=0;const a=this.getStage();return"Stage"!==r.nodeType&&a&&function a(l){for(t=[],e=l.length,i=0;i<e;i++)s=l[i],o++,s.nodeType!==u&&(t=t.concat(s.getChildren().slice())),s._id===r._id&&(i=e);t.length>0&&t[0].getDepth()<=n&&a(t)}(a.getChildren()),o}getDepth(){let t=0,e=this.parent;for(;e;)t++,e=e.parent;return t}_batchTransformChanges(t){this._batchingTransformChange=!0,t(),this._batchingTransformChange=!1,this._needClearTransformCache&&(this._clearCache(f),this._clearSelfAndDescendantCache(l)),this._needClearTransformCache=!1}setPosition(t){return this._batchTransformChanges(()=>{this.x(t.x),this.y(t.y)}),this}getPosition(){return{x:this.x(),y:this.y()}}getRelativePointerPosition(){const t=this.getStage();if(!t)return null;const e=t.getPointerPosition();if(!e)return null;const i=this.getAbsoluteTransform().copy();return i.invert(),i.point(e)}getAbsolutePosition(t){let e=!1,i=this.parent;for(;i;){if(i.isCached()){e=!0;break}i=i.parent}e&&!t&&(t=!0);const s=this.getAbsoluteTransform(t).getMatrix(),r=new n.Transform,o=this.offset();return r.m=s.slice(),r.translate(o.x,o.y),r.getTranslation()}setAbsolutePosition(t){const{x:e,y:i,...s}=this._clearTransform();this.attrs.x=e,this.attrs.y=i,this._clearCache(f);const n=this._getAbsoluteTransform().copy();return n.invert(),n.translate(t.x,t.y),t={x:this.attrs.x+n.getTranslation().x,y:this.attrs.y+n.getTranslation().y},this._setTransform(s),this.setPosition({x:t.x,y:t.y}),this._clearCache(f),this._clearSelfAndDescendantCache(l),this}_setTransform(t){let e;for(e in t)this.attrs[e]=t[e]}_clearTransform(){const t={x:this.x(),y:this.y(),rotation:this.rotation(),scaleX:this.scaleX(),scaleY:this.scaleY(),offsetX:this.offsetX(),offsetY:this.offsetY(),skewX:this.skewX(),skewY:this.skewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,t}move(t){let e=t.x,i=t.y,s=this.x(),n=this.y();return void 0!==e&&(s+=e),void 0!==i&&(n+=i),this.setPosition({x:s,y:n}),this}_eachAncestorReverse(t,e){let i,s,n=[],r=this.getParent();if(!e||e._id!==this._id){for(n.unshift(this);r&&(!e||r._id!==e._id);)n.unshift(r),r=r.parent;for(i=n.length,s=0;s<i;s++)t(n[s])}}rotate(t){return this.rotation(this.rotation()+t),this}moveToTop(){if(!this.parent)return n.Util.warn("Node has no parent. moveToTop function is ignored."),!1;const t=this.index;return t<this.parent.getChildren().length-1&&(this.parent.children.splice(t,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0)}moveUp(){if(!this.parent)return n.Util.warn("Node has no parent. moveUp function is ignored."),!1;const t=this.index;return t<this.parent.getChildren().length-1&&(this.parent.children.splice(t,1),this.parent.children.splice(t+1,0,this),this.parent._setChildrenIndices(),!0)}moveDown(){if(!this.parent)return n.Util.warn("Node has no parent. moveDown function is ignored."),!1;const t=this.index;return t>0&&(this.parent.children.splice(t,1),this.parent.children.splice(t-1,0,this),this.parent._setChildrenIndices(),!0)}moveToBottom(){if(!this.parent)return n.Util.warn("Node has no parent. moveToBottom function is ignored."),!1;const t=this.index;return t>0&&(this.parent.children.splice(t,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0)}setZIndex(t){if(!this.parent)return n.Util.warn("Node has no parent. zIndex parameter is ignored."),this;(t<0||t>=this.parent.children.length)&&n.Util.warn("Unexpected value "+t+" for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to "+(this.parent.children.length-1)+".");const e=this.index;return this.parent.children.splice(e,1),this.parent.children.splice(t,0,this),this.parent._setChildrenIndices(),this}getAbsoluteOpacity(){return this._getCache(o,this._getAbsoluteOpacity)}_getAbsoluteOpacity(){let t=this.opacity();const e=this.getParent();return e&&!e._isUnderCache&&(t*=e.getAbsoluteOpacity()),t}moveTo(t){return this.getParent()!==t&&(this._remove(),t.add(this)),this}toObject(){let t,e,i,s,r,o=this.getAttrs();const a={attrs:{},className:this.getClassName()};for(t in o)e=o[t],r=n.Util.isObject(e)&&!n.Util._isPlainObject(e)&&!n.Util._isArray(e),r||(i="function"==typeof this[t]&&this[t],delete o[t],s=i?i.call(this):null,o[t]=e,s!==e&&(a.attrs[t]=e));return n.Util._prepareToStringify(a)}toJSON(){return JSON.stringify(this.toObject())}getParent(){return this.parent}findAncestors(t,e,i){const s=[];e&&this._isMatch(t)&&s.push(this);let n=this.parent;for(;n;){if(n===i)return s;n._isMatch(t)&&s.push(n),n=n.parent}return s}isAncestorOf(t){return!1}findAncestor(t,e,i){return this.findAncestors(t,e,i)[0]}_isMatch(t){if(!t)return!1;if("function"==typeof t)return t(this);let e,i,s=t.replace(/ /g,"").split(","),r=s.length;for(e=0;e<r;e++)if(i=s[e],n.Util.isValidSelector(i)||(n.Util.warn('Selector "'+i+'" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'),n.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'),n.Util.warn("Konva is awesome, right?")),"#"===i.charAt(0)){if(this.id()===i.slice(1))return!0}else if("."===i.charAt(0)){if(this.hasName(i.slice(1)))return!0}else if(this.className===i||this.nodeType===i)return!0;return!1}getLayer(){const t=this.getParent();return t?t.getLayer():null}getStage(){return this._getCache(g,this._getStage)}_getStage(){const t=this.getParent();return t?t.getStage():null}fire(t,e={},i){return e.target=e.target||this,i?this._fireAndBubble(t,e):this._fire(t,e),this}getAbsoluteTransform(t){return t?this._getAbsoluteTransform(t):this._getCache(l,this._getAbsoluteTransform)}_getAbsoluteTransform(t){let e;if(t)return e=new n.Transform,this._eachAncestorReverse(function(t){const i=t.transformsEnabled();"all"===i?e.multiply(t.getTransform()):"position"===i&&e.translate(t.x()-t.offsetX(),t.y()-t.offsetY())},t),e;{e=this._cache.get(l)||new n.Transform,this.parent?this.parent.getAbsoluteTransform().copyInto(e):e.reset();const t=this.transformsEnabled();if("all"===t)e.multiply(this.getTransform());else if("position"===t){const t=this.attrs.x||0,i=this.attrs.y||0,s=this.attrs.offsetX||0,n=this.attrs.offsetY||0;e.translate(t-s,i-n)}return e.dirty=!1,e}}getAbsoluteScale(t){let e=this;for(;e;)e._isUnderCache&&(t=e),e=e.getParent();const i=this.getAbsoluteTransform(t).decompose();return{x:i.scaleX,y:i.scaleY}}getAbsoluteRotation(){return this.getAbsoluteTransform().decompose().rotation}getTransform(){return this._getCache(f,this._getTransform)}_getTransform(){var t,e;const i=this._cache.get(f)||new n.Transform;i.reset();const r=this.x(),o=this.y(),a=s.Konva.getAngle(this.rotation()),l=null!==(t=this.attrs.scaleX)&&void 0!==t?t:1,h=null!==(e=this.attrs.scaleY)&&void 0!==e?e:1,c=this.attrs.skewX||0,d=this.attrs.skewY||0,u=this.attrs.offsetX||0,p=this.attrs.offsetY||0;return 0===r&&0===o||i.translate(r,o),0!==a&&i.rotate(a),0===c&&0===d||i.skew(c,d),1===l&&1===h||i.scale(l,h),0===u&&0===p||i.translate(-1*u,-1*p),i.dirty=!1,i}clone(t){let e,i,s,r,o,a=n.Util.cloneObject(this.attrs);for(e in t)a[e]=t[e];const l=new this.constructor(a);for(e in this.eventListeners)for(i=this.eventListeners[e],s=i.length,r=0;r<s;r++)o=i[r],o.name.indexOf("konva")<0&&(l.eventListeners[e]||(l.eventListeners[e]=[]),l.eventListeners[e].push(o));return l}_toKonvaCanvas(e){e=e||{};const i=this.getClientRect(),s=this.getStage(),n=void 0!==e.x?e.x:Math.floor(i.x),r=void 0!==e.y?e.y:Math.floor(i.y),o=e.pixelRatio||1,a=new t.SceneCanvas({width:e.width||Math.ceil(i.width)||(s?s.width():0),height:e.height||Math.ceil(i.height)||(s?s.height():0),pixelRatio:o}),l=a.getContext(),h=new t.SceneCanvas({width:a.width/a.pixelRatio+Math.abs(n),height:a.height/a.pixelRatio+Math.abs(r),pixelRatio:a.pixelRatio});return!1===e.imageSmoothingEnabled&&(l._context.imageSmoothingEnabled=!1),l.save(),(n||r)&&l.translate(-1*n,-1*r),this.drawScene(a,void 0,h),l.restore(),a}toCanvas(t){return this._toKonvaCanvas(t)._canvas}toDataURL(t){const e=(t=t||{}).mimeType||null,i=t.quality||null,s=this._toKonvaCanvas(t).toDataURL(e,i);return t.callback&&t.callback(s),s}toImage(t){return new Promise((e,i)=>{try{const i=null==t?void 0:t.callback;i&&delete t.callback,n.Util._urlToImage(this.toDataURL(t),function(t){e(t),null==i||i(t)})}catch(t){i(t)}})}toBlob(t){return new Promise((e,i)=>{try{const i=null==t?void 0:t.callback;i&&delete t.callback,this.toCanvas(t).toBlob(t=>{e(t),null==i||i(t)},null==t?void 0:t.mimeType,null==t?void 0:t.quality)}catch(t){i(t)}})}setSize(t){return this.width(t.width),this.height(t.height),this}getSize(){return{width:this.width(),height:this.height()}}getClassName(){return this.className||this.nodeType}getType(){return this.nodeType}getDragDistance(){return void 0!==this.attrs.dragDistance?this.attrs.dragDistance:this.parent?this.parent.getDragDistance():s.Konva.dragDistance}_off(t,e,i){let s,n,r,o=this.eventListeners[t];for(s=0;s<o.length;s++)if(n=o[s].name,r=o[s].handler,!("konva"===n&&"konva"!==e||e&&n!==e||i&&i!==r)){if(o.splice(s,1),0===o.length){delete this.eventListeners[t];break}s--}}_fireChangeEvent(t,e,i){this._fire(t+"Change",{oldVal:e,newVal:i})}addName(t){if(!this.hasName(t)){const e=this.name(),i=e?e+" "+t:t;this.name(i)}return this}hasName(t){if(!t)return!1;const e=this.name();if(!e)return!1;return-1!==(e||"").split(/\s/g).indexOf(t)}removeName(t){const e=(this.name()||"").split(/\s/g),i=e.indexOf(t);return-1!==i&&(e.splice(i,1),this.name(e.join(" "))),this}setAttr(t,e){const i=this["set"+n.Util._capitalize(t)];return n.Util._isFunction(i)?i.call(this,e):this._setAttr(t,e),this}_requestDraw(){if(s.Konva.autoDrawEnabled){const t=this.getLayer()||this.getStage();null==t||t.batchDraw()}}_setAttr(t,e){const i=this.attrs[t];(i!==e||n.Util.isObject(e))&&(null==e?delete this.attrs[t]:this.attrs[t]=e,this._shouldFireChangeEvents&&this._fireChangeEvent(t,i,e),this._requestDraw())}_setComponentAttr(t,e,i){let s;void 0!==i&&(s=this.attrs[t],s||(this.attrs[t]=this.getAttr(t)),this.attrs[t][e]=i,this._fireChangeEvent(t,s,i))}_fireAndBubble(t,e,i){e&&this.nodeType===u&&(e.target=this);const s=["mouseenter","mouseleave","pointerenter","pointerleave","touchenter","touchleave"];if(!(-1!==s.indexOf(t)&&(i&&(this===i||this.isAncestorOf&&this.isAncestorOf(i))||"Stage"===this.nodeType&&!i))){this._fire(t,e);const n=-1!==s.indexOf(t)&&i&&i.isAncestorOf&&i.isAncestorOf(this)&&!i.isAncestorOf(this.parent);(e&&!e.cancelBubble||!e)&&this.parent&&this.parent.isListening()&&!n&&(i&&i.parent?this._fireAndBubble.call(this.parent,t,e,i):this._fireAndBubble.call(this.parent,t,e))}}_getProtoListeners(t){var e,i,s;const n=null!==(e=this._cache.get(a))&&void 0!==e?e:{};let r=null==n?void 0:n[t];if(void 0===r){r=[];let e=Object.getPrototypeOf(this);for(;e;){const n=null!==(s=null===(i=e.eventListeners)||void 0===i?void 0:i[t])&&void 0!==s?s:[];r.push(...n),e=Object.getPrototypeOf(e)}n[t]=r,this._cache.set(a,n)}return r}_fire(t,e){(e=e||{}).currentTarget=this,e.type=t;const i=this._getProtoListeners(t);if(i)for(let t=0;t<i.length;t++)i[t].handler.call(this,e);const s=this.eventListeners[t];if(s)for(let t=0;t<s.length;t++)s[t].handler.call(this,e)}draw(){return this.drawScene(),this.drawHit(),this}_createDragElement(t){const i=t?t.pointerId:void 0,s=this.getStage(),n=this.getAbsolutePosition();if(!s)return;const r=s._getPointerById(i)||s._changedPointerPositions[0]||n;e.DD._dragElements.set(this._id,{node:this,startPointerPos:r,offset:{x:r.x-n.x,y:r.y-n.y},dragStatus:"ready",pointerId:i})}startDrag(t,i=!0){e.DD._dragElements.has(this._id)||this._createDragElement(t);e.DD._dragElements.get(this._id).dragStatus="dragging",this.fire("dragstart",{type:"dragstart",target:this,evt:t&&t.evt},i)}_setDragPosition(t,e){const i=this.getStage()._getPointerById(e.pointerId);if(!i)return;let s={x:i.x-e.offset.x,y:i.y-e.offset.y};const r=this.dragBoundFunc();if(void 0!==r){const e=r.call(this,s,t);e?s=e:n.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")}this._lastPos&&this._lastPos.x===s.x&&this._lastPos.y===s.y||(this.setAbsolutePosition(s),this._requestDraw()),this._lastPos=s}stopDrag(t){const i=e.DD._dragElements.get(this._id);i&&(i.dragStatus="stopped"),e.DD._endDragBefore(t),e.DD._endDragAfter(t)}setDraggable(t){this._setAttr("draggable",t),this._dragChange()}isDragging(){const t=e.DD._dragElements.get(this._id);return!!t&&"dragging"===t.dragStatus}_listenDrag(){this._dragCleanup(),this.on("mousedown.konva touchstart.konva",function(t){if(!(!(void 0!==t.evt.button)||s.Konva.dragButtons.indexOf(t.evt.button)>=0))return;if(this.isDragging())return;let i=!1;e.DD._dragElements.forEach(t=>{this.isAncestorOf(t.node)&&(i=!0)}),i||this._createDragElement(t)})}_dragChange(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();if(!this.getStage())return;const t=e.DD._dragElements.get(this._id),i=t&&"dragging"===t.dragStatus,s=t&&"ready"===t.dragStatus;i?this.stopDrag():s&&e.DD._dragElements.delete(this._id)}}_dragCleanup(){this.off("mousedown.konva"),this.off("touchstart.konva")}isClientRectOnScreen(t={x:0,y:0}){const e=this.getStage();if(!e)return!1;const i={x:-t.x,y:-t.y,width:e.width()+2*t.x,height:e.height()+2*t.y};return n.Util.haveIntersection(i,this.getClientRect())}static create(t,e){return n.Util._isString(t)&&(t=JSON.parse(t)),this._createNode(t,e)}static _createNode(t,e){let r,o,a,l=i.prototype.getClassName.call(t),h=t.children;e&&(t.attrs.container=e),s.Konva[l]||(n.Util.warn('Can not find a node with class name "'+l+'". Fallback to "Shape".'),l="Shape");if(r=new(0,s.Konva[l])(t.attrs),h)for(o=h.length,a=0;a<o;a++)r.add(i._createNode(h[a]));return r}};nn.Node=y,y.prototype.nodeType="Node",y.prototype._attrsAffectingSize=[],y.prototype.eventListeners={},y.prototype.on.call(y.prototype,m,function(){this._batchingTransformChange?this._needClearTransformCache=!0:(this._clearCache(f),this._clearSelfAndDescendantCache(l))}),y.prototype.on.call(y.prototype,"visibleChange.konva",function(){this._clearSelfAndDescendantCache(_)}),y.prototype.on.call(y.prototype,"listeningChange.konva",function(){this._clearSelfAndDescendantCache(d)}),y.prototype.on.call(y.prototype,"opacityChange.konva",function(){this._clearSelfAndDescendantCache(o)});const b=i.Factory.addGetterSetter;return b(y,"zIndex"),b(y,"absolutePosition"),b(y,"position"),b(y,"x",0,(0,r.getNumberValidator)()),b(y,"y",0,(0,r.getNumberValidator)()),b(y,"globalCompositeOperation","source-over",(0,r.getStringValidator)()),b(y,"opacity",1,(0,r.getNumberValidator)()),b(y,"name","",(0,r.getStringValidator)()),b(y,"id","",(0,r.getStringValidator)()),b(y,"rotation",0,(0,r.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"scale",["x","y"]),b(y,"scaleX",1,(0,r.getNumberValidator)()),b(y,"scaleY",1,(0,r.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"skew",["x","y"]),b(y,"skewX",0,(0,r.getNumberValidator)()),b(y,"skewY",0,(0,r.getNumberValidator)()),i.Factory.addComponentsGetterSetter(y,"offset",["x","y"]),b(y,"offsetX",0,(0,r.getNumberValidator)()),b(y,"offsetY",0,(0,r.getNumberValidator)()),b(y,"dragDistance",void 0,(0,r.getNumberValidator)()),b(y,"width",0,(0,r.getNumberValidator)()),b(y,"height",0,(0,r.getNumberValidator)()),b(y,"listening",!0,(0,r.getBooleanValidator)()),b(y,"preventDefault",!0,(0,r.getBooleanValidator)()),b(y,"filters",void 0,function(t){return this._filterUpToDate=!1,t}),b(y,"visible",!0,(0,r.getBooleanValidator)()),b(y,"transformsEnabled","all",(0,r.getStringValidator)()),b(y,"size"),b(y,"dragBoundFunc"),b(y,"draggable",!1,(0,r.getBooleanValidator)()),i.Factory.backCompat(y,{rotateDeg:"rotate",setRotationDeg:"setRotation",getRotationDeg:"getRotation"}),nn}var bn,xn={};function wn(){if(bn)return xn;bn=1,Object.defineProperty(xn,"__esModule",{value:!0}),xn.Container=void 0;const t=vn(),e=yn(),i=mn();let s=class extends e.Node{constructor(){super(...arguments),this.children=[]}getChildren(t){const e=this.children||[];return t?e.filter(t):e}hasChildren(){return this.getChildren().length>0}removeChildren(){return this.getChildren().forEach(t=>{t.parent=null,t.index=0,t.remove()}),this.children=[],this._requestDraw(),this}destroyChildren(){return this.getChildren().forEach(t=>{t.parent=null,t.index=0,t.destroy()}),this.children=[],this._requestDraw(),this}add(...t){if(0===t.length)return this;if(t.length>1){for(let e=0;e<t.length;e++)this.add(t[e]);return this}const e=t[0];return e.getParent()?(e.moveTo(this),this):(this._validateAdd(e),e.index=this.getChildren().length,e.parent=this,e._clearCaches(),this.getChildren().push(e),this._fire("add",{child:e}),this._requestDraw(),this)}destroy(){return this.hasChildren()&&this.destroyChildren(),super.destroy(),this}find(t){return this._generalFind(t,!1)}findOne(t){const e=this._generalFind(t,!0);return e.length>0?e[0]:void 0}_generalFind(t,e){const i=[];return this._descendants(s=>{const n=s._isMatch(t);return n&&i.push(s),!(!n||!e)}),i}_descendants(t){let e=!1;const i=this.getChildren();for(const s of i){if(e=t(s),e)return!0;if(s.hasChildren()&&(e=s._descendants(t),e))return!0}return!1}toObject(){const t=e.Node.prototype.toObject.call(this);return t.children=[],this.getChildren().forEach(e=>{t.children.push(e.toObject())}),t}isAncestorOf(t){let e=t.getParent();for(;e;){if(e._id===this._id)return!0;e=e.getParent()}return!1}clone(t){const i=e.Node.prototype.clone.call(this,t);return this.getChildren().forEach(function(t){i.add(t.clone())}),i}getAllIntersections(t){const e=[];return this.find("Shape").forEach(i=>{i.isVisible()&&i.intersects(t)&&e.push(i)}),e}_clearSelfAndDescendantCache(t){var e;super._clearSelfAndDescendantCache(t),this.isCached()||null===(e=this.children)||void 0===e||e.forEach(function(e){e._clearSelfAndDescendantCache(t)})}_setChildrenIndices(){var t;null===(t=this.children)||void 0===t||t.forEach(function(t,e){t.index=e}),this._requestDraw()}drawScene(t,e,i){const s=this.getLayer(),n=t||s&&s.getCanvas(),r=n&&n.getContext(),o=this._getCanvasCache(),a=o&&o.scene,l=n&&n.isCache;if(!this.isVisible()&&!l)return this;if(a){r.save();const t=this.getAbsoluteTransform(e).getMatrix();r.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedSceneCanvas(r),r.restore()}else this._drawChildren("drawScene",n,e,i);return this}drawHit(t,e){if(!this.shouldDrawHit(e))return this;const i=this.getLayer(),s=t||i&&i.hitCanvas,n=s&&s.getContext(),r=this._getCanvasCache();if(r&&r.hit){n.save();const t=this.getAbsoluteTransform(e).getMatrix();n.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedHitCanvas(n),n.restore()}else this._drawChildren("drawHit",s,e);return this}_drawChildren(t,e,i,s){var n;const r=e&&e.getContext(),o=this.clipWidth(),a=this.clipHeight(),l=this.clipFunc(),h="number"==typeof o&&"number"==typeof a||l,c=i===this;if(h){r.save();const t=this.getAbsoluteTransform(i);let e,s=t.getMatrix();if(r.transform(s[0],s[1],s[2],s[3],s[4],s[5]),r.beginPath(),l)e=l.call(this,r,this);else{const t=this.clipX(),e=this.clipY();r.rect(t||0,e||0,o,a)}r.clip.apply(r,e),s=t.copy().invert().getMatrix(),r.transform(s[0],s[1],s[2],s[3],s[4],s[5])}const d=!c&&"source-over"!==this.globalCompositeOperation()&&"drawScene"===t;d&&(r.save(),r._applyGlobalCompositeOperation(this)),null===(n=this.children)||void 0===n||n.forEach(function(n){n[t](e,i,s)}),d&&r.restore(),h&&r.restore()}getClientRect(t={}){var e;const i=t.skipTransform,s=t.relativeTo;let n,r,o,a,l={x:1/0,y:1/0,width:0,height:0};const h=this;null===(e=this.children)||void 0===e||e.forEach(function(e){if(!e.visible())return;const i=e.getClientRect({relativeTo:h,skipShadow:t.skipShadow,skipStroke:t.skipStroke});0===i.width&&0===i.height||(void 0===n?(n=i.x,r=i.y,o=i.x+i.width,a=i.y+i.height):(n=Math.min(n,i.x),r=Math.min(r,i.y),o=Math.max(o,i.x+i.width),a=Math.max(a,i.y+i.height)))});const c=this.find("Shape");let d=!1;for(let t=0;t<c.length;t++){if(c[t]._isVisible(this)){d=!0;break}}return l=d&&void 0!==n?{x:n,y:r,width:o-n,height:a-r}:{x:0,y:0,width:0,height:0},i?l:this._transformedRect(l,s)}};return xn.Container=s,t.Factory.addComponentsGetterSetter(s,"clip",["x","y","width","height"]),t.Factory.addGetterSetter(s,"clipX",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipY",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipWidth",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipHeight",void 0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(s,"clipFunc"),xn}var Sn,Cn,kn={},Pn={};function In(){if(Sn)return Pn;Sn=1,Object.defineProperty(Pn,"__esModule",{value:!0}),Pn.getCapturedShape=function(t){return e.get(t)},Pn.createEvent=s,Pn.hasPointerCapture=function(t,i){return e.get(t)===i},Pn.setPointerCapture=function(t,r){n(t);if(!r.getStage())return;e.set(t,r),i&&r._fire("gotpointercapture",s(new PointerEvent("gotpointercapture")))},Pn.releaseCapture=n;const t=Zs(),e=new Map,i=void 0!==t.Konva._global.PointerEvent;function s(t){return{evt:t,pointerId:t.pointerId}}function n(t,n){const r=e.get(t);if(!r)return;const o=r.getStage();o&&o.content,e.delete(t),i&&r._fire("lostpointercapture",s(new PointerEvent("lostpointercapture")))}return Pn}var $n,Mn,En={},An={};function Ln(){return $n||($n=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Shape=t.shapes=void 0;const e=Zs(),i=tn(),s=vn(),n=yn(),r=mn(),o=Zs(),a=In(),l="hasShadow",h="shadowRGBA",c="patternImage",d="linearGradient",u="radialGradient";let p;function g(){return p||(p=i.Util.createCanvasElement().getContext("2d"),p)}t.shapes={};class f extends n.Node{constructor(e){let s;for(super(e);s=i.Util.getRandomColor(),!s||s in t.shapes;);this.colorKey=s,t.shapes[s]=this}getContext(){return i.Util.warn("shape.getContext() method is deprecated. Please do not use it."),this.getLayer().getContext()}getCanvas(){return i.Util.warn("shape.getCanvas() method is deprecated. Please do not use it."),this.getLayer().getCanvas()}getSceneFunc(){return this.attrs.sceneFunc||this._sceneFunc}getHitFunc(){return this.attrs.hitFunc||this._hitFunc}hasShadow(){return this._getCache(l,this._hasShadow)}_hasShadow(){return this.shadowEnabled()&&0!==this.shadowOpacity()&&!!(this.shadowColor()||this.shadowBlur()||this.shadowOffsetX()||this.shadowOffsetY())}_getFillPattern(){return this._getCache(c,this.__getFillPattern)}__getFillPattern(){if(this.fillPatternImage()){const t=g().createPattern(this.fillPatternImage(),this.fillPatternRepeat()||"repeat");if(t&&t.setTransform){const s=new i.Transform;s.translate(this.fillPatternX(),this.fillPatternY()),s.rotate(e.Konva.getAngle(this.fillPatternRotation())),s.scale(this.fillPatternScaleX(),this.fillPatternScaleY()),s.translate(-1*this.fillPatternOffsetX(),-1*this.fillPatternOffsetY());const n=s.getMatrix(),r="undefined"==typeof DOMMatrix?{a:n[0],b:n[1],c:n[2],d:n[3],e:n[4],f:n[5]}:new DOMMatrix(n);t.setTransform(r)}return t}}_getLinearGradient(){return this._getCache(d,this.__getLinearGradient)}__getLinearGradient(){const t=this.fillLinearGradientColorStops();if(t){const e=g(),i=this.fillLinearGradientStartPoint(),s=this.fillLinearGradientEndPoint(),n=e.createLinearGradient(i.x,i.y,s.x,s.y);for(let e=0;e<t.length;e+=2)n.addColorStop(t[e],t[e+1]);return n}}_getRadialGradient(){return this._getCache(u,this.__getRadialGradient)}__getRadialGradient(){const t=this.fillRadialGradientColorStops();if(t){const e=g(),i=this.fillRadialGradientStartPoint(),s=this.fillRadialGradientEndPoint(),n=e.createRadialGradient(i.x,i.y,this.fillRadialGradientStartRadius(),s.x,s.y,this.fillRadialGradientEndRadius());for(let e=0;e<t.length;e+=2)n.addColorStop(t[e],t[e+1]);return n}}getShadowRGBA(){return this._getCache(h,this._getShadowRGBA)}_getShadowRGBA(){if(!this.hasShadow())return;const t=i.Util.colorToRGBA(this.shadowColor());return t?"rgba("+t.r+","+t.g+","+t.b+","+t.a*(this.shadowOpacity()||1)+")":void 0}hasFill(){return this._calculate("hasFill",["fillEnabled","fill","fillPatternImage","fillLinearGradientColorStops","fillRadialGradientColorStops"],()=>this.fillEnabled()&&!!(this.fill()||this.fillPatternImage()||this.fillLinearGradientColorStops()||this.fillRadialGradientColorStops()))}hasStroke(){return this._calculate("hasStroke",["strokeEnabled","strokeWidth","stroke","strokeLinearGradientColorStops"],()=>this.strokeEnabled()&&this.strokeWidth()&&!(!this.stroke()&&!this.strokeLinearGradientColorStops()))}hasHitStroke(){const t=this.hitStrokeWidth();return"auto"===t?this.hasStroke():this.strokeEnabled()&&!!t}intersects(t){const e=this.getStage();if(!e)return!1;const i=e.bufferHitCanvas;i.getContext().clear(),this.drawHit(i,void 0,!0);return i.context.getImageData(Math.round(t.x),Math.round(t.y),1,1).data[3]>0}destroy(){return n.Node.prototype.destroy.call(this),delete t.shapes[this.colorKey],delete this.colorKey,this}_useBufferCanvas(t){var e;if(!(null===(e=this.attrs.perfectDrawEnabled)||void 0===e||e))return!1;const i=t||this.hasFill(),s=this.hasStroke(),n=1!==this.getAbsoluteOpacity();if(i&&s&&n)return!0;const r=this.hasShadow(),o=this.shadowForStrokeEnabled();return!!(i&&s&&r&&o)}setStrokeHitEnabled(t){i.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."),t?this.hitStrokeWidth("auto"):this.hitStrokeWidth(0)}getStrokeHitEnabled(){return 0!==this.hitStrokeWidth()}getSelfRect(){const t=this.size();return{x:this._centroid?-t.width/2:0,y:this._centroid?-t.height/2:0,width:t.width,height:t.height}}getClientRect(t={}){let e=!1,i=this.getParent();for(;i;){if(i.isCached()){e=!0;break}i=i.getParent()}const s=t.skipTransform,n=t.relativeTo||e&&this.getStage()||void 0,r=this.getSelfRect(),o=!t.skipStroke&&this.hasStroke()&&this.strokeWidth()||0,a=r.width+o,l=r.height+o,h=!t.skipShadow&&this.hasShadow(),c=h?this.shadowOffsetX():0,d=h?this.shadowOffsetY():0,u=a+Math.abs(c),p=l+Math.abs(d),g=h&&this.shadowBlur()||0,f={width:u+2*g,height:p+2*g,x:-(o/2+g)+Math.min(c,0)+r.x,y:-(o/2+g)+Math.min(d,0)+r.y};return s?f:this._transformedRect(f,n)}drawScene(t,e,i){const s=this.getLayer(),n=(t||s.getCanvas()).getContext(),r=this._getCanvasCache(),o=this.getSceneFunc(),a=this.hasShadow();let l;const h=e===this;if(!this.isVisible()&&!h)return this;if(r){n.save();const t=this.getAbsoluteTransform(e).getMatrix();return n.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedSceneCanvas(n),n.restore(),this}if(!o)return this;if(n.save(),this._useBufferCanvas()){l=this.getStage();const t=i||l.bufferCanvas,s=t.getContext();s.clear(),s.save(),s._applyLineJoin(this);const r=this.getAbsoluteTransform(e).getMatrix();s.transform(r[0],r[1],r[2],r[3],r[4],r[5]),o.call(this,s,this),s.restore();const h=t.pixelRatio;a&&n._applyShadow(this),n._applyOpacity(this),n._applyGlobalCompositeOperation(this),n.drawImage(t._canvas,t.x||0,t.y||0,t.width/h,t.height/h)}else{if(n._applyLineJoin(this),!h){const t=this.getAbsoluteTransform(e).getMatrix();n.transform(t[0],t[1],t[2],t[3],t[4],t[5]),n._applyOpacity(this),n._applyGlobalCompositeOperation(this)}a&&n._applyShadow(this),o.call(this,n,this)}return n.restore(),this}drawHit(t,e,s=!1){if(!this.shouldDrawHit(e,s))return this;const n=this.getLayer(),r=t||n.hitCanvas,o=r&&r.getContext(),a=this.hitFunc()||this.sceneFunc(),l=this._getCanvasCache(),h=l&&l.hit;if(this.colorKey||i.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"),h){o.save();const t=this.getAbsoluteTransform(e).getMatrix();return o.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this._drawCachedHitCanvas(o),o.restore(),this}if(!a)return this;o.save(),o._applyLineJoin(this);if(!(this===e)){const t=this.getAbsoluteTransform(e).getMatrix();o.transform(t[0],t[1],t[2],t[3],t[4],t[5])}return a.call(this,o,this),o.restore(),this}drawHitFromCache(t=0){const e=this._getCanvasCache(),s=this._getCachedSceneCanvas(),n=e.hit,r=n.getContext(),o=n.getWidth(),a=n.getHeight();r.clear(),r.drawImage(s._canvas,0,0,o,a);try{const e=r.getImageData(0,0,o,a),s=e.data,n=s.length,l=i.Util._hexToRgb(this.colorKey);for(let e=0;e<n;e+=4){s[e+3]>t?(s[e]=l.r,s[e+1]=l.g,s[e+2]=l.b,s[e+3]=255):s[e+3]=0}r.putImageData(e,0,0)}catch(t){i.Util.error("Unable to draw hit graph from cached scene canvas. "+t.message)}return this}hasPointerCapture(t){return a.hasPointerCapture(t,this)}setPointerCapture(t){a.setPointerCapture(t,this)}releaseCapture(t){a.releaseCapture(t,this)}}t.Shape=f,f.prototype._fillFunc=function(t){const e=this.attrs.fillRule;e?t.fill(e):t.fill()},f.prototype._strokeFunc=function(t){t.stroke()},f.prototype._fillFuncHit=function(t){const e=this.attrs.fillRule;e?t.fill(e):t.fill()},f.prototype._strokeFuncHit=function(t){t.stroke()},f.prototype._centroid=!1,f.prototype.nodeType="Shape",(0,o._registerNode)(f),f.prototype.eventListeners={},f.prototype.on.call(f.prototype,"shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",function(){this._clearCache(l)}),f.prototype.on.call(f.prototype,"shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",function(){this._clearCache(h)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva",function(){this._clearCache(c)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva",function(){this._clearCache(d)}),f.prototype.on.call(f.prototype,"fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva",function(){this._clearCache(u)}),s.Factory.addGetterSetter(f,"stroke",void 0,(0,r.getStringOrGradientValidator)()),s.Factory.addGetterSetter(f,"strokeWidth",2,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillAfterStrokeEnabled",!1),s.Factory.addGetterSetter(f,"hitStrokeWidth","auto",(0,r.getNumberOrAutoValidator)()),s.Factory.addGetterSetter(f,"strokeHitEnabled",!0,(0,r.getBooleanValidator)()),s.Factory.addGetterSetter(f,"perfectDrawEnabled",!0,(0,r.getBooleanValidator)()),s.Factory.addGetterSetter(f,"shadowForStrokeEnabled",!0,(0,r.getBooleanValidator)()),s.Factory.addGetterSetter(f,"lineJoin"),s.Factory.addGetterSetter(f,"lineCap"),s.Factory.addGetterSetter(f,"sceneFunc"),s.Factory.addGetterSetter(f,"hitFunc"),s.Factory.addGetterSetter(f,"dash"),s.Factory.addGetterSetter(f,"dashOffset",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowColor",void 0,(0,r.getStringValidator)()),s.Factory.addGetterSetter(f,"shadowBlur",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowOpacity",1,(0,r.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"shadowOffset",["x","y"]),s.Factory.addGetterSetter(f,"shadowOffsetX",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"shadowOffsetY",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternImage"),s.Factory.addGetterSetter(f,"fill",void 0,(0,r.getStringOrGradientValidator)()),s.Factory.addGetterSetter(f,"fillPatternX",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternY",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillLinearGradientColorStops"),s.Factory.addGetterSetter(f,"strokeLinearGradientColorStops"),s.Factory.addGetterSetter(f,"fillRadialGradientStartRadius",0),s.Factory.addGetterSetter(f,"fillRadialGradientEndRadius",0),s.Factory.addGetterSetter(f,"fillRadialGradientColorStops"),s.Factory.addGetterSetter(f,"fillPatternRepeat","repeat"),s.Factory.addGetterSetter(f,"fillEnabled",!0),s.Factory.addGetterSetter(f,"strokeEnabled",!0),s.Factory.addGetterSetter(f,"shadowEnabled",!0),s.Factory.addGetterSetter(f,"dashEnabled",!0),s.Factory.addGetterSetter(f,"strokeScaleEnabled",!0),s.Factory.addGetterSetter(f,"fillPriority","color"),s.Factory.addComponentsGetterSetter(f,"fillPatternOffset",["x","y"]),s.Factory.addGetterSetter(f,"fillPatternOffsetX",0,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternOffsetY",0,(0,r.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"fillPatternScale",["x","y"]),s.Factory.addGetterSetter(f,"fillPatternScaleX",1,(0,r.getNumberValidator)()),s.Factory.addGetterSetter(f,"fillPatternScaleY",1,(0,r.getNumberValidator)()),s.Factory.addComponentsGetterSetter(f,"fillLinearGradientStartPoint",["x","y"]),s.Factory.addComponentsGetterSetter(f,"strokeLinearGradientStartPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillLinearGradientStartPointX",0),s.Factory.addGetterSetter(f,"strokeLinearGradientStartPointX",0),s.Factory.addGetterSetter(f,"fillLinearGradientStartPointY",0),s.Factory.addGetterSetter(f,"strokeLinearGradientStartPointY",0),s.Factory.addComponentsGetterSetter(f,"fillLinearGradientEndPoint",["x","y"]),s.Factory.addComponentsGetterSetter(f,"strokeLinearGradientEndPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillLinearGradientEndPointX",0),s.Factory.addGetterSetter(f,"strokeLinearGradientEndPointX",0),s.Factory.addGetterSetter(f,"fillLinearGradientEndPointY",0),s.Factory.addGetterSetter(f,"strokeLinearGradientEndPointY",0),s.Factory.addComponentsGetterSetter(f,"fillRadialGradientStartPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillRadialGradientStartPointX",0),s.Factory.addGetterSetter(f,"fillRadialGradientStartPointY",0),s.Factory.addComponentsGetterSetter(f,"fillRadialGradientEndPoint",["x","y"]),s.Factory.addGetterSetter(f,"fillRadialGradientEndPointX",0),s.Factory.addGetterSetter(f,"fillRadialGradientEndPointY",0),s.Factory.addGetterSetter(f,"fillPatternRotation",0),s.Factory.addGetterSetter(f,"fillRule",void 0,(0,r.getStringValidator)()),s.Factory.backCompat(f,{dashArray:"dash",getDashArray:"getDash",setDashArray:"getDash",drawFunc:"sceneFunc",getDrawFunc:"getSceneFunc",setDrawFunc:"setSceneFunc",drawHitFunc:"hitFunc",getDrawHitFunc:"getHitFunc",setDrawHitFunc:"setHitFunc"})}(An)),An}function Tn(){if(Mn)return En;Mn=1,Object.defineProperty(En,"__esModule",{value:!0}),En.Layer=void 0;const t=tn(),e=wn(),i=yn(),s=vn(),n=ln(),r=mn(),o=Ln(),a=Zs(),l=[{x:0,y:0},{x:-1,y:-1},{x:1,y:-1},{x:1,y:1},{x:-1,y:1}],h=l.length;let c=class extends e.Container{constructor(t){super(t),this.canvas=new n.SceneCanvas,this.hitCanvas=new n.HitCanvas({pixelRatio:1}),this._waitingForDraw=!1,this.on("visibleChange.konva",this._checkVisibility),this._checkVisibility(),this.on("imageSmoothingEnabledChange.konva",this._setSmoothEnabled),this._setSmoothEnabled()}createPNGStream(){return this.canvas._canvas.createPNGStream()}getCanvas(){return this.canvas}getNativeCanvasElement(){return this.canvas._canvas}getHitCanvas(){return this.hitCanvas}getContext(){return this.getCanvas().getContext()}clear(t){return this.getContext().clear(t),this.getHitCanvas().getContext().clear(t),this}setZIndex(t){super.setZIndex(t);const e=this.getStage();return e&&e.content&&(e.content.removeChild(this.getNativeCanvasElement()),t<e.children.length-1?e.content.insertBefore(this.getNativeCanvasElement(),e.children[t+1].getCanvas()._canvas):e.content.appendChild(this.getNativeCanvasElement())),this}moveToTop(){i.Node.prototype.moveToTop.call(this);const t=this.getStage();return t&&t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.appendChild(this.getNativeCanvasElement())),!0}moveUp(){if(!i.Node.prototype.moveUp.call(this))return!1;const t=this.getStage();return!(!t||!t.content)&&(t.content.removeChild(this.getNativeCanvasElement()),this.index<t.children.length-1?t.content.insertBefore(this.getNativeCanvasElement(),t.children[this.index+1].getCanvas()._canvas):t.content.appendChild(this.getNativeCanvasElement()),!0)}moveDown(){if(i.Node.prototype.moveDown.call(this)){const t=this.getStage();if(t){const e=t.children;t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.insertBefore(this.getNativeCanvasElement(),e[this.index+1].getCanvas()._canvas))}return!0}return!1}moveToBottom(){if(i.Node.prototype.moveToBottom.call(this)){const t=this.getStage();if(t){const e=t.children;t.content&&(t.content.removeChild(this.getNativeCanvasElement()),t.content.insertBefore(this.getNativeCanvasElement(),e[1].getCanvas()._canvas))}return!0}return!1}getLayer(){return this}remove(){const e=this.getNativeCanvasElement();return i.Node.prototype.remove.call(this),e&&e.parentNode&&t.Util._isInDocument(e)&&e.parentNode.removeChild(e),this}getStage(){return this.parent}setSize({width:t,height:e}){return this.canvas.setSize(t,e),this.hitCanvas.setSize(t,e),this._setSmoothEnabled(),this}_validateAdd(e){const i=e.getType();"Group"!==i&&"Shape"!==i&&t.Util.throw("You may only add groups and shapes to a layer.")}_toKonvaCanvas(t){return(t=t||{}).width=t.width||this.getWidth(),t.height=t.height||this.getHeight(),t.x=void 0!==t.x?t.x:this.x(),t.y=void 0!==t.y?t.y:this.y(),i.Node.prototype._toKonvaCanvas.call(this,t)}_checkVisibility(){const t=this.visible();this.canvas._canvas.style.display=t?"block":"none"}_setSmoothEnabled(){this.getContext()._context.imageSmoothingEnabled=this.imageSmoothingEnabled()}getWidth(){if(this.parent)return this.parent.width()}setWidth(){t.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')}getHeight(){if(this.parent)return this.parent.height()}setHeight(){t.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')}batchDraw(){return this._waitingForDraw||(this._waitingForDraw=!0,t.Util.requestAnimFrame(()=>{this.draw(),this._waitingForDraw=!1})),this}getIntersection(t){if(!this.isListening()||!this.isVisible())return null;let e=1,i=!1;for(;;){for(let s=0;s<h;s++){const n=l[s],r=this._getIntersection({x:t.x+n.x*e,y:t.y+n.y*e}),o=r.shape;if(o)return o;if(i=!!r.antialiased,!r.antialiased)break}if(!i)return null;e+=1}}_getIntersection(e){const i=this.hitCanvas.pixelRatio,s=this.hitCanvas.context.getImageData(Math.round(e.x*i),Math.round(e.y*i),1,1).data,n=s[3];if(255===n){const e=t.Util._rgbToHex(s[0],s[1],s[2]),i=o.shapes["#"+e];return i?{shape:i}:{antialiased:!0}}return n>0?{antialiased:!0}:{}}drawScene(t,i,s){const n=this.getLayer(),r=t||n&&n.getCanvas();return this._fire("beforeDraw",{node:this}),this.clearBeforeDraw()&&r.getContext().clear(),e.Container.prototype.drawScene.call(this,r,i,s),this._fire("draw",{node:this}),this}drawHit(t,i){const s=this.getLayer(),n=t||s&&s.hitCanvas;return s&&s.clearBeforeDraw()&&s.getHitCanvas().getContext().clear(),e.Container.prototype.drawHit.call(this,n,i),this}enableHitGraph(){return this.hitGraphEnabled(!0),this}disableHitGraph(){return this.hitGraphEnabled(!1),this}setHitGraphEnabled(e){t.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),this.listening(e)}getHitGraphEnabled(e){return t.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),this.listening()}toggleHitCanvas(){if(!this.parent||!this.parent.content)return;const t=this.parent;!!this.hitCanvas._canvas.parentNode?t.content.removeChild(this.hitCanvas._canvas):t.content.appendChild(this.hitCanvas._canvas)}destroy(){return t.Util.releaseCanvas(this.getNativeCanvasElement(),this.getHitCanvas()._canvas),super.destroy()}};return En.Layer=c,c.prototype.nodeType="Layer",(0,a._registerNode)(c),s.Factory.addGetterSetter(c,"imageSmoothingEnabled",!0),s.Factory.addGetterSetter(c,"clearBeforeDraw",!0),s.Factory.addGetterSetter(c,"hitGraphEnabled",!0,(0,r.getBooleanValidator)()),En}var Fn,Rn={};var Dn,Nn={};function On(){if(Dn)return Nn;Dn=1,Object.defineProperty(Nn,"__esModule",{value:!0}),Nn.Group=void 0;const t=tn(),e=wn(),i=Zs();let s=class extends e.Container{_validateAdd(e){const i=e.getType();"Group"!==i&&"Shape"!==i&&t.Util.throw("You may only add groups and shapes to groups.")}};return Nn.Group=s,s.prototype.nodeType="Group",(0,i._registerNode)(s),Nn}var Un,Gn={};function zn(){if(Un)return Gn;Un=1,Object.defineProperty(Gn,"__esModule",{value:!0}),Gn.Animation=void 0;const t=Zs(),e=tn(),i=t.glob.performance&&t.glob.performance.now?function(){return t.glob.performance.now()}:function(){return(new Date).getTime()};let s=class t{constructor(e,s){this.id=t.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:i(),frameRate:0},this.func=e,this.setLayers(s)}setLayers(t){let e=[];return t&&(e=Array.isArray(t)?t:[t]),this.layers=e,this}getLayers(){return this.layers}addLayer(t){const e=this.layers,i=e.length;for(let s=0;s<i;s++)if(e[s]._id===t._id)return!1;return this.layers.push(t),!0}isRunning(){const e=t.animations,i=e.length;for(let t=0;t<i;t++)if(e[t].id===this.id)return!0;return!1}start(){return this.stop(),this.frame.timeDiff=0,this.frame.lastTime=i(),t._addAnimation(this),this}stop(){return t._removeAnimation(this),this}_updateFrameObject(t){this.frame.timeDiff=t-this.frame.lastTime,this.frame.lastTime=t,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}static _addAnimation(t){this.animations.push(t),this._handleAnimation()}static _removeAnimation(t){const e=t.id,i=this.animations,s=i.length;for(let t=0;t<s;t++)if(i[t].id===e){this.animations.splice(t,1);break}}static _runFrames(){const t={},e=this.animations;for(let s=0;s<e.length;s++){const n=e[s],r=n.layers,o=n.func;n._updateFrameObject(i());const a=r.length;let l;if(l=!o||!1!==o.call(n,n.frame),l)for(let e=0;e<a;e++){const i=r[e];void 0!==i._id&&(t[i._id]=i)}}for(const e in t)t.hasOwnProperty(e)&&t[e].batchDraw()}static _animationLoop(){const i=t;i.animations.length?(i._runFrames(),e.Util.requestAnimFrame(i._animationLoop)):i.animRunning=!1}static _handleAnimation(){this.animRunning||(this.animRunning=!0,e.Util.requestAnimFrame(this._animationLoop))}};return Gn.Animation=s,s.animations=[],s.animIdCounter=0,s.animRunning=!1,Gn}var Bn,Wn,Vn={};function Hn(){return Wn||(Wn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Konva=void 0;const e=Zs(),i=tn(),s=yn(),n=wn(),r=(Cn||(Cn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Stage=t.stages=void 0;const e=tn(),i=vn(),s=wn(),n=Zs(),r=ln(),o=dn(),a=Zs(),l=In(),h="mouseleave",c="mouseover",d="mouseenter",u="mousemove",p="mousedown",g="mouseup",f="pointermove",_="pointerdown",m="pointerup",v="pointercancel",y="pointerout",b="pointerleave",x="pointerover",w="pointerenter",S="contextmenu",C="touchstart",k="touchend",P="touchmove",I="touchcancel",$="wheel",M=[[d,"_pointerenter"],[p,"_pointerdown"],[u,"_pointermove"],[g,"_pointerup"],[h,"_pointerleave"],[C,"_pointerdown"],[P,"_pointermove"],[k,"_pointerup"],[I,"_pointercancel"],[c,"_pointerover"],[$,"_wheel"],[S,"_contextmenu"],[_,"_pointerdown"],[f,"_pointermove"],[m,"_pointerup"],[v,"_pointercancel"],[b,"_pointerleave"],["lostpointercapture","_lostpointercapture"]],E={mouse:{[y]:"mouseout",[b]:h,[x]:c,[w]:d,[f]:u,[_]:p,[m]:g,[v]:"mousecancel",pointerclick:"click",pointerdblclick:"dblclick"},touch:{[y]:"touchout",[b]:"touchleave",[x]:"touchover",[w]:"touchenter",[f]:P,[_]:C,[m]:k,[v]:I,pointerclick:"tap",pointerdblclick:"dbltap"},pointer:{[y]:y,[b]:b,[x]:x,[w]:w,[f]:f,[_]:_,[m]:m,[v]:v,pointerclick:"pointerclick",pointerdblclick:"pointerdblclick"}},A=t=>t.indexOf("pointer")>=0?"pointer":t.indexOf("touch")>=0?"touch":"mouse",L=t=>{const e=A(t);return"pointer"===e?n.Konva.pointerEventsEnabled&&E.pointer:"touch"===e?E.touch:"mouse"===e?E.mouse:void 0};function T(t={}){return(t.clipFunc||t.clipWidth||t.clipHeight)&&e.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups."),t}t.stages=[];class F extends s.Container{constructor(e){super(T(e)),this._pointerPositions=[],this._changedPointerPositions=[],this._buildDOM(),this._bindContentEvents(),t.stages.push(this),this.on("widthChange.konva heightChange.konva",this._resizeDOM),this.on("visibleChange.konva",this._checkVisibility),this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva",()=>{T(this.attrs)}),this._checkVisibility()}_validateAdd(t){const i="Layer"===t.getType(),s="FastLayer"===t.getType();i||s||e.Util.throw("You may only add layers to the stage.")}_checkVisibility(){if(!this.content)return;const t=this.visible()?"":"none";this.content.style.display=t}setContainer(t){if("string"==typeof t){let e;if("."===t.charAt(0)){const e=t.slice(1);t=document.getElementsByClassName(e)[0]}else e="#"!==t.charAt(0)?t:t.slice(1),t=document.getElementById(e);if(!t)throw"Can not find container in document with id "+e}return this._setAttr("container",t),this.content&&(this.content.parentElement&&this.content.parentElement.removeChild(this.content),t.appendChild(this.content)),this}shouldDrawHit(){return!0}clear(){const t=this.children,e=t.length;for(let i=0;i<e;i++)t[i].clear();return this}clone(t){return t||(t={}),t.container="undefined"!=typeof document&&document.createElement("div"),s.Container.prototype.clone.call(this,t)}destroy(){super.destroy();const i=this.content;i&&e.Util._isInDocument(i)&&this.container().removeChild(i);const s=t.stages.indexOf(this);return s>-1&&t.stages.splice(s,1),e.Util.releaseCanvas(this.bufferCanvas._canvas,this.bufferHitCanvas._canvas),this}getPointerPosition(){const t=this._pointerPositions[0]||this._changedPointerPositions[0];return t?{x:t.x,y:t.y}:(e.Util.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"),null)}_getPointerById(t){return this._pointerPositions.find(e=>e.id===t)}getPointersPositions(){return this._pointerPositions}getStage(){return this}getContent(){return this.content}_toKonvaCanvas(t){(t=t||{}).x=t.x||0,t.y=t.y||0,t.width=t.width||this.width(),t.height=t.height||this.height();const e=new r.SceneCanvas({width:t.width,height:t.height,pixelRatio:t.pixelRatio||1}),i=e.getContext()._context,s=this.children;return(t.x||t.y)&&i.translate(-1*t.x,-1*t.y),s.forEach(function(e){if(!e.isVisible())return;const s=e._toKonvaCanvas(t);i.drawImage(s._canvas,t.x,t.y,s.getWidth()/s.getPixelRatio(),s.getHeight()/s.getPixelRatio())}),e}getIntersection(t){if(!t)return null;const e=this.children;for(let i=e.length-1;i>=0;i--){const s=e[i].getIntersection(t);if(s)return s}return null}_resizeDOM(){const t=this.width(),e=this.height();this.content&&(this.content.style.width=t+"px",this.content.style.height=e+"px"),this.bufferCanvas.setSize(t,e),this.bufferHitCanvas.setSize(t,e),this.children.forEach(i=>{i.setSize({width:t,height:e}),i.draw()})}add(t,...i){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}super.add(t);const s=this.children.length;return s>5&&e.Util.warn("The stage has "+s+" layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."),t.setSize({width:this.width(),height:this.height()}),t.draw(),n.Konva.isBrowser&&this.content.appendChild(t.canvas._canvas),this}getParent(){return null}getLayer(){return null}hasPointerCapture(t){return l.hasPointerCapture(t,this)}setPointerCapture(t){l.setPointerCapture(t,this)}releaseCapture(t){l.releaseCapture(t,this)}getLayers(){return this.children}_bindContentEvents(){n.Konva.isBrowser&&M.forEach(([t,e])=>{this.content.addEventListener(t,t=>{this[e](t)},{passive:!1})})}_pointerenter(t){this.setPointersPositions(t);const e=L(t.type);e&&this._fire(e.pointerenter,{evt:t,target:this,currentTarget:this})}_pointerover(t){this.setPointersPositions(t);const e=L(t.type);e&&this._fire(e.pointerover,{evt:t,target:this,currentTarget:this})}_getTargetShape(t){let e=this[t+"targetShape"];return e&&!e.getStage()&&(e=null),e}_pointerleave(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);const s=this._getTargetShape(i),r=!(n.Konva.isDragging()||n.Konva.isTransforming())||n.Konva.hitOnDragEnabled;s&&r?(s._fireAndBubble(e.pointerout,{evt:t}),s._fireAndBubble(e.pointerleave,{evt:t}),this._fire(e.pointerleave,{evt:t,target:this,currentTarget:this}),this[i+"targetShape"]=null):r&&(this._fire(e.pointerleave,{evt:t,target:this,currentTarget:this}),this._fire(e.pointerout,{evt:t,target:this,currentTarget:this})),this.pointerPos=null,this._pointerPositions=[]}_pointerdown(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);let s=!1;this._changedPointerPositions.forEach(r=>{const a=this.getIntersection(r);if(o.DD.justDragged=!1,n.Konva["_"+i+"ListenClick"]=!0,!a||!a.isListening())return void(this[i+"ClickStartShape"]=void 0);n.Konva.capturePointerEventsEnabled&&a.setPointerCapture(r.id),this[i+"ClickStartShape"]=a,a._fireAndBubble(e.pointerdown,{evt:t,pointerId:r.id}),s=!0;const l=t.type.indexOf("touch")>=0;a.preventDefault()&&t.cancelable&&l&&t.preventDefault()}),s||this._fire(e.pointerdown,{evt:t,target:this,currentTarget:this,pointerId:this._pointerPositions[0].id})}_pointermove(t){const e=L(t.type),i=A(t.type);if(!e)return;if(n.Konva.isDragging()&&o.DD.node.preventDefault()&&t.cancelable&&t.preventDefault(),this.setPointersPositions(t),(n.Konva.isDragging()||n.Konva.isTransforming())&&!n.Konva.hitOnDragEnabled)return;const s={};let r=!1;const a=this._getTargetShape(i);this._changedPointerPositions.forEach(n=>{const o=l.getCapturedShape(n.id)||this.getIntersection(n),h=n.id,c={evt:t,pointerId:h},d=a!==o;if(d&&a&&(a._fireAndBubble(e.pointerout,{...c},o),a._fireAndBubble(e.pointerleave,{...c},o)),o){if(s[o._id])return;s[o._id]=!0}o&&o.isListening()?(r=!0,d&&(o._fireAndBubble(e.pointerover,{...c},a),o._fireAndBubble(e.pointerenter,{...c},a),this[i+"targetShape"]=o),o._fireAndBubble(e.pointermove,{...c})):a&&(this._fire(e.pointerover,{evt:t,target:this,currentTarget:this,pointerId:h}),this[i+"targetShape"]=null)}),r||this._fire(e.pointermove,{evt:t,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id})}_pointerup(t){const e=L(t.type),i=A(t.type);if(!e)return;this.setPointersPositions(t);const s=this[i+"ClickStartShape"],r=this[i+"ClickEndShape"],a={};let h=!1;this._changedPointerPositions.forEach(c=>{const d=l.getCapturedShape(c.id)||this.getIntersection(c);if(d){if(d.releaseCapture(c.id),a[d._id])return;a[d._id]=!0}const u=c.id,p={evt:t,pointerId:u};let g=!1;n.Konva["_"+i+"InDblClickWindow"]?(g=!0,clearTimeout(this[i+"DblTimeout"])):o.DD.justDragged||(n.Konva["_"+i+"InDblClickWindow"]=!0,clearTimeout(this[i+"DblTimeout"])),this[i+"DblTimeout"]=setTimeout(function(){n.Konva["_"+i+"InDblClickWindow"]=!1},n.Konva.dblClickWindow),d&&d.isListening()?(h=!0,this[i+"ClickEndShape"]=d,d._fireAndBubble(e.pointerup,{...p}),n.Konva["_"+i+"ListenClick"]&&s&&s===d&&(d._fireAndBubble(e.pointerclick,{...p}),g&&r&&r===d&&d._fireAndBubble(e.pointerdblclick,{...p}))):(this[i+"ClickEndShape"]=null,n.Konva["_"+i+"ListenClick"]&&this._fire(e.pointerclick,{evt:t,target:this,currentTarget:this,pointerId:u}),g&&this._fire(e.pointerdblclick,{evt:t,target:this,currentTarget:this,pointerId:u}))}),h||this._fire(e.pointerup,{evt:t,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id}),n.Konva["_"+i+"ListenClick"]=!1,t.cancelable&&"touch"!==i&&"pointer"!==i&&t.preventDefault()}_contextmenu(t){this.setPointersPositions(t);const e=this.getIntersection(this.getPointerPosition());e&&e.isListening()?e._fireAndBubble(S,{evt:t}):this._fire(S,{evt:t,target:this,currentTarget:this})}_wheel(t){this.setPointersPositions(t);const e=this.getIntersection(this.getPointerPosition());e&&e.isListening()?e._fireAndBubble($,{evt:t}):this._fire($,{evt:t,target:this,currentTarget:this})}_pointercancel(t){this.setPointersPositions(t);const e=l.getCapturedShape(t.pointerId)||this.getIntersection(this.getPointerPosition());e&&e._fireAndBubble(m,l.createEvent(t)),l.releaseCapture(t.pointerId)}_lostpointercapture(t){l.releaseCapture(t.pointerId)}setPointersPositions(t){const i=this._getContentPosition();let s=null,n=null;void 0!==(t=t||window.event).touches?(this._pointerPositions=[],this._changedPointerPositions=[],Array.prototype.forEach.call(t.touches,t=>{this._pointerPositions.push({id:t.identifier,x:(t.clientX-i.left)/i.scaleX,y:(t.clientY-i.top)/i.scaleY})}),Array.prototype.forEach.call(t.changedTouches||t.touches,t=>{this._changedPointerPositions.push({id:t.identifier,x:(t.clientX-i.left)/i.scaleX,y:(t.clientY-i.top)/i.scaleY})})):(s=(t.clientX-i.left)/i.scaleX,n=(t.clientY-i.top)/i.scaleY,this.pointerPos={x:s,y:n},this._pointerPositions=[{x:s,y:n,id:e.Util._getFirstPointerId(t)}],this._changedPointerPositions=[{x:s,y:n,id:e.Util._getFirstPointerId(t)}])}_setPointerPosition(t){e.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'),this.setPointersPositions(t)}_getContentPosition(){if(!this.content||!this.content.getBoundingClientRect)return{top:0,left:0,scaleX:1,scaleY:1};const t=this.content.getBoundingClientRect();return{top:t.top,left:t.left,scaleX:t.width/this.content.clientWidth||1,scaleY:t.height/this.content.clientHeight||1}}_buildDOM(){if(this.bufferCanvas=new r.SceneCanvas({width:this.width(),height:this.height()}),this.bufferHitCanvas=new r.HitCanvas({pixelRatio:1,width:this.width(),height:this.height()}),!n.Konva.isBrowser)return;const t=this.container();if(!t)throw"Stage has no container. A container is required.";t.innerHTML="",this.content=document.createElement("div"),this.content.style.position="relative",this.content.style.userSelect="none",this.content.className="konvajs-content",this.content.setAttribute("role","presentation"),t.appendChild(this.content),this._resizeDOM()}cache(){return e.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."),this}clearCache(){return this}batchDraw(){return this.getChildren().forEach(function(t){t.batchDraw()}),this}}t.Stage=F,F.prototype.nodeType="Stage",(0,a._registerNode)(F),i.Factory.addGetterSetter(F,"container"),n.Konva.isBrowser&&document.addEventListener("visibilitychange",()=>{t.stages.forEach(t=>{t.batchDraw()})})}(kn)),kn),o=Tn(),a=function(){if(Fn)return Rn;Fn=1,Object.defineProperty(Rn,"__esModule",{value:!0}),Rn.FastLayer=void 0;const t=tn(),e=Tn(),i=Zs();let s=class extends e.Layer{constructor(e){super(e),this.listening(!1),t.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.')}};return Rn.FastLayer=s,s.prototype.nodeType="FastLayer",(0,i._registerNode)(s),Rn}(),l=On(),h=dn(),c=Ln(),d=zn(),u=(Bn||(Bn=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Easings=t.Tween=void 0;const e=tn(),i=zn(),s=yn(),n=Zs(),r={node:1,duration:1,easing:1,onFinish:1,yoyo:1},o=["fill","stroke","shadowColor"];let a=0;class l{constructor(t,e,i,s,n,r,o){this.prop=t,this.propFunc=e,this.begin=s,this._pos=s,this.duration=r,this._change=0,this.prevPos=0,this.yoyo=o,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.func=i,this._change=n-this.begin,this.pause()}fire(t){const e=this[t];e&&e()}setTime(t){t>this.duration?this.yoyo?(this._time=this.duration,this.reverse()):this.finish():t<0?this.yoyo?(this._time=0,this.play()):this.reset():(this._time=t,this.update())}getTime(){return this._time}setPosition(t){this.prevPos=this._pos,this.propFunc(t),this._pos=t}getPosition(t){return void 0===t&&(t=this._time),this.func(t,this.begin,this._change,this.duration)}play(){this.state=2,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onPlay")}reverse(){this.state=3,this._time=this.duration-this._time,this._startTime=this.getTimer()-this._time,this.onEnterFrame(),this.fire("onReverse")}seek(t){this.pause(),this._time=t,this.update(),this.fire("onSeek")}reset(){this.pause(),this._time=0,this.update(),this.fire("onReset")}finish(){this.pause(),this._time=this.duration,this.update(),this.fire("onFinish")}update(){this.setPosition(this.getPosition(this._time)),this.fire("onUpdate")}onEnterFrame(){const t=this.getTimer()-this._startTime;2===this.state?this.setTime(t):3===this.state&&this.setTime(this.duration-t)}pause(){this.state=1,this.fire("onPause")}getTimer(){return(new Date).getTime()}}class h{constructor(s){const o=this,c=s.node,d=c._id,u=s.easing||t.Easings.Linear,p=!!s.yoyo;let g,f;g=void 0===s.duration?.3:0===s.duration?.001:s.duration,this.node=c,this._id=a++;const _=c.getLayer()||(c instanceof n.Konva.Stage?c.getLayers():null);for(f in _||e.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."),this.anim=new i.Animation(function(){o.tween.onEnterFrame()},_),this.tween=new l(f,function(t){o._tweenFunc(t)},u,0,1,1e3*g,p),this._addListeners(),h.attrs[d]||(h.attrs[d]={}),h.attrs[d][this._id]||(h.attrs[d][this._id]={}),h.tweens[d]||(h.tweens[d]={}),s)void 0===r[f]&&this._addAttr(f,s[f]);this.reset(),this.onFinish=s.onFinish,this.onReset=s.onReset,this.onUpdate=s.onUpdate}_addAttr(t,i){const s=this.node,n=s._id;let r,a,l,c,d;const u=h.tweens[n][t];u&&delete h.attrs[n][u][t];let p=s.getAttr(t);if(e.Util._isArray(i))if(r=[],a=Math.max(i.length,p.length),"points"===t&&i.length!==p.length&&(i.length>p.length?(c=p,p=e.Util._prepareArrayForTween(p,i,s.closed())):(l=i,i=e.Util._prepareArrayForTween(i,p,s.closed()))),0===t.indexOf("fill"))for(let t=0;t<a;t++)if(t%2==0)r.push(i[t]-p[t]);else{const s=e.Util.colorToRGBA(p[t]);d=e.Util.colorToRGBA(i[t]),p[t]=s,r.push({r:d.r-s.r,g:d.g-s.g,b:d.b-s.b,a:d.a-s.a})}else for(let t=0;t<a;t++)r.push(i[t]-p[t]);else-1!==o.indexOf(t)?(p=e.Util.colorToRGBA(p),d=e.Util.colorToRGBA(i),r={r:d.r-p.r,g:d.g-p.g,b:d.b-p.b,a:d.a-p.a}):r=i-p;h.attrs[n][this._id][t]={start:p,diff:r,end:i,trueEnd:l,trueStart:c},h.tweens[n][t]=this._id}_tweenFunc(t){const i=this.node,s=h.attrs[i._id][this._id];let n,r,a,l,c,d,u,p;for(n in s){if(r=s[n],a=r.start,l=r.diff,p=r.end,e.Util._isArray(a))if(c=[],u=Math.max(a.length,p.length),0===n.indexOf("fill"))for(d=0;d<u;d++)d%2==0?c.push((a[d]||0)+l[d]*t):c.push("rgba("+Math.round(a[d].r+l[d].r*t)+","+Math.round(a[d].g+l[d].g*t)+","+Math.round(a[d].b+l[d].b*t)+","+(a[d].a+l[d].a*t)+")");else for(d=0;d<u;d++)c.push((a[d]||0)+l[d]*t);else c=-1!==o.indexOf(n)?"rgba("+Math.round(a.r+l.r*t)+","+Math.round(a.g+l.g*t)+","+Math.round(a.b+l.b*t)+","+(a.a+l.a*t)+")":a+l*t;i.setAttr(n,c)}}_addListeners(){this.tween.onPlay=()=>{this.anim.start()},this.tween.onReverse=()=>{this.anim.start()},this.tween.onPause=()=>{this.anim.stop()},this.tween.onFinish=()=>{const t=this.node,e=h.attrs[t._id][this._id];e.points&&e.points.trueEnd&&t.setAttr("points",e.points.trueEnd),this.onFinish&&this.onFinish.call(this)},this.tween.onReset=()=>{const t=this.node,e=h.attrs[t._id][this._id];e.points&&e.points.trueStart&&t.points(e.points.trueStart),this.onReset&&this.onReset()},this.tween.onUpdate=()=>{this.onUpdate&&this.onUpdate.call(this)}}play(){return this.tween.play(),this}reverse(){return this.tween.reverse(),this}reset(){return this.tween.reset(),this}seek(t){return this.tween.seek(1e3*t),this}pause(){return this.tween.pause(),this}finish(){return this.tween.finish(),this}destroy(){const t=this.node._id,e=this._id,i=h.tweens[t];this.pause(),this.anim&&this.anim.stop();for(const e in i)delete h.tweens[t][e];delete h.attrs[t][e],h.tweens[t]&&(0===Object.keys(h.tweens[t]).length&&delete h.tweens[t],0===Object.keys(h.attrs[t]).length&&delete h.attrs[t])}}t.Tween=h,h.attrs={},h.tweens={},s.Node.prototype.to=function(t){const e=t.onFinish;t.node=this,t.onFinish=function(){this.destroy(),e&&e()},new h(t).play()},t.Easings={BackEaseIn(t,e,i,s){const n=1.70158;return i*(t/=s)*t*((n+1)*t-n)+e},BackEaseOut(t,e,i,s){const n=1.70158;return i*((t=t/s-1)*t*((n+1)*t+n)+1)+e},BackEaseInOut(t,e,i,s){let n=1.70158;return(t/=s/2)<1?i/2*(t*t*((1+(n*=1.525))*t-n))+e:i/2*((t-=2)*t*((1+(n*=1.525))*t+n)+2)+e},ElasticEaseIn(t,e,i,s,n,r){let o=0;return 0===t?e:1===(t/=s)?e+i:(r||(r=.3*s),!n||n<Math.abs(i)?(n=i,o=r/4):o=r/(2*Math.PI)*Math.asin(i/n),-n*Math.pow(2,10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/r)+e)},ElasticEaseOut(t,e,i,s,n,r){let o=0;return 0===t?e:1===(t/=s)?e+i:(r||(r=.3*s),!n||n<Math.abs(i)?(n=i,o=r/4):o=r/(2*Math.PI)*Math.asin(i/n),n*Math.pow(2,-10*t)*Math.sin((t*s-o)*(2*Math.PI)/r)+i+e)},ElasticEaseInOut(t,e,i,s,n,r){let o=0;return 0===t?e:2==(t/=s/2)?e+i:(r||(r=s*(.3*1.5)),!n||n<Math.abs(i)?(n=i,o=r/4):o=r/(2*Math.PI)*Math.asin(i/n),t<1?n*Math.pow(2,10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/r)*-.5+e:n*Math.pow(2,-10*(t-=1))*Math.sin((t*s-o)*(2*Math.PI)/r)*.5+i+e)},BounceEaseOut:(t,e,i,s)=>(t/=s)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e,BounceEaseIn:(e,i,s,n)=>s-t.Easings.BounceEaseOut(n-e,0,s,n)+i,BounceEaseInOut:(e,i,s,n)=>e<n/2?.5*t.Easings.BounceEaseIn(2*e,0,s,n)+i:.5*t.Easings.BounceEaseOut(2*e-n,0,s,n)+.5*s+i,EaseIn:(t,e,i,s)=>i*(t/=s)*t+e,EaseOut:(t,e,i,s)=>-i*(t/=s)*(t-2)+e,EaseInOut:(t,e,i,s)=>(t/=s/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e,StrongEaseIn:(t,e,i,s)=>i*(t/=s)*t*t*t*t+e,StrongEaseOut:(t,e,i,s)=>i*((t=t/s-1)*t*t*t*t+1)+e,StrongEaseInOut:(t,e,i,s)=>(t/=s/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e,Linear:(t,e,i,s)=>i*t/s+e}}(Vn)),Vn),p=an(),g=ln();t.Konva=i.Util._assign(e.Konva,{Util:i.Util,Transform:i.Transform,Node:s.Node,Container:n.Container,Stage:r.Stage,stages:r.stages,Layer:o.Layer,FastLayer:a.FastLayer,Group:l.Group,DD:h.DD,Shape:c.Shape,shapes:c.shapes,Animation:d.Animation,Tween:u.Tween,Easings:u.Easings,Context:p.Context,Canvas:g.Canvas}),t.default=t.Konva}(Ys)),Ys}var jn,qn={};var Kn,Yn={},Xn={};function Zn(){if(Kn)return Xn;Kn=1,Object.defineProperty(Xn,"__esModule",{value:!0}),Xn.Line=void 0;const t=vn(),e=Zs(),i=Ln(),s=mn();function n(t,e,i,s,n,r,o){const a=Math.sqrt(Math.pow(i-t,2)+Math.pow(s-e,2)),l=Math.sqrt(Math.pow(n-i,2)+Math.pow(r-s,2)),h=o*a/(a+l),c=o*l/(a+l);return[i-h*(n-t),s-h*(r-e),i+c*(n-t),s+c*(r-e)]}function r(t,e){const i=t.length,s=[];for(let r=2;r<i-2;r+=2){const i=n(t[r-2],t[r-1],t[r],t[r+1],t[r+2],t[r+3],e);isNaN(i[0])||(s.push(i[0]),s.push(i[1]),s.push(t[r]),s.push(t[r+1]),s.push(i[2]),s.push(i[3]))}return s}let o=class extends i.Shape{constructor(t){super(t),this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva",function(){this._clearCache("tensionPoints")})}_sceneFunc(t){const e=this.points(),i=e.length,s=this.tension(),n=this.closed(),r=this.bezier();if(!i)return;let o=0;if(t.beginPath(),t.moveTo(e[0],e[1]),0!==s&&i>4){const s=this.getTensionPoints(),r=s.length;for(o=n?0:4,n||t.quadraticCurveTo(s[0],s[1],s[2],s[3]);o<r-2;)t.bezierCurveTo(s[o++],s[o++],s[o++],s[o++],s[o++],s[o++]);n||t.quadraticCurveTo(s[r-2],s[r-1],e[i-2],e[i-1])}else if(r)for(o=2;o<i;)t.bezierCurveTo(e[o++],e[o++],e[o++],e[o++],e[o++],e[o++]);else for(o=2;o<i;o+=2)t.lineTo(e[o],e[o+1]);n?(t.closePath(),t.fillStrokeShape(this)):t.strokeShape(this)}getTensionPoints(){return this._getCache("tensionPoints",this._getTensionPoints)}_getTensionPoints(){return this.closed()?this._getTensionPointsClosed():r(this.points(),this.tension())}_getTensionPointsClosed(){const t=this.points(),e=t.length,i=this.tension(),s=n(t[e-2],t[e-1],t[0],t[1],t[2],t[3],i),o=n(t[e-4],t[e-3],t[e-2],t[e-1],t[0],t[1],i),a=r(t,i);return[s[2],s[3]].concat(a).concat([o[0],o[1],t[e-2],t[e-1],o[2],o[3],s[0],s[1],t[0],t[1]])}getWidth(){return this.getSelfRect().width}getHeight(){return this.getSelfRect().height}getSelfRect(){let t=this.points();if(t.length<4)return{x:t[0]||0,y:t[1]||0,width:0,height:0};t=0!==this.tension()?[t[0],t[1],...this._getTensionPoints(),t[t.length-2],t[t.length-1]]:this.points();let e,i,s=t[0],n=t[0],r=t[1],o=t[1];for(let a=0;a<t.length/2;a++)e=t[2*a],i=t[2*a+1],s=Math.min(s,e),n=Math.max(n,e),r=Math.min(r,i),o=Math.max(o,i);return{x:s,y:r,width:n-s,height:o-r}}};return Xn.Line=o,o.prototype.className="Line",o.prototype._attrsAffectingSize=["points","bezier","tension"],(0,e._registerNode)(o),t.Factory.addGetterSetter(o,"closed",!1),t.Factory.addGetterSetter(o,"bezier",!1),t.Factory.addGetterSetter(o,"tension",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(o,"points",[],(0,s.getNumberArrayValidator)()),Xn}var Jn,Qn,tr,er={},ir={};function sr(){if(Qn)return er;Qn=1,Object.defineProperty(er,"__esModule",{value:!0}),er.Path=void 0;const t=vn(),e=Zs(),i=Ln(),s=(Jn||(Jn=1,function(t){function e(t,e,s){const n=i(1,s,t),r=i(1,s,e),o=n*n+r*r;return Math.sqrt(o)}Object.defineProperty(t,"__esModule",{value:!0}),t.t2length=t.getQuadraticArcLength=t.getCubicArcLength=t.binomialCoefficients=t.cValues=t.tValues=void 0,t.tValues=[[],[],[-.5773502691896257,.5773502691896257],[0,-.7745966692414834,.7745966692414834],[-.33998104358485626,.33998104358485626,-.8611363115940526,.8611363115940526],[0,-.5384693101056831,.5384693101056831,-.906179845938664,.906179845938664],[.6612093864662645,-.6612093864662645,-.2386191860831969,.2386191860831969,-.932469514203152,.932469514203152],[0,.4058451513773972,-.4058451513773972,-.7415311855993945,.7415311855993945,-.9491079123427585,.9491079123427585],[-.1834346424956498,.1834346424956498,-.525532409916329,.525532409916329,-.7966664774136267,.7966664774136267,-.9602898564975363,.9602898564975363],[0,-.8360311073266358,.8360311073266358,-.9681602395076261,.9681602395076261,-.3242534234038089,.3242534234038089,-.6133714327005904,.6133714327005904],[-.14887433898163122,.14887433898163122,-.4333953941292472,.4333953941292472,-.6794095682990244,.6794095682990244,-.8650633666889845,.8650633666889845,-.9739065285171717,.9739065285171717],[0,-.26954315595234496,.26954315595234496,-.5190961292068118,.5190961292068118,-.7301520055740494,.7301520055740494,-.8870625997680953,.8870625997680953,-.978228658146057,.978228658146057],[-.1252334085114689,.1252334085114689,-.3678314989981802,.3678314989981802,-.5873179542866175,.5873179542866175,-.7699026741943047,.7699026741943047,-.9041172563704749,.9041172563704749,-.9815606342467192,.9815606342467192],[0,-.2304583159551348,.2304583159551348,-.44849275103644687,.44849275103644687,-.6423493394403402,.6423493394403402,-.8015780907333099,.8015780907333099,-.9175983992229779,.9175983992229779,-.9841830547185881,.9841830547185881],[-.10805494870734367,.10805494870734367,-.31911236892788974,.31911236892788974,-.5152486363581541,.5152486363581541,-.6872929048116855,.6872929048116855,-.827201315069765,.827201315069765,-.9284348836635735,.9284348836635735,-.9862838086968123,.9862838086968123],[0,-.20119409399743451,.20119409399743451,-.3941513470775634,.3941513470775634,-.5709721726085388,.5709721726085388,-.7244177313601701,.7244177313601701,-.8482065834104272,.8482065834104272,-.937273392400706,.937273392400706,-.9879925180204854,.9879925180204854],[-.09501250983763744,.09501250983763744,-.2816035507792589,.2816035507792589,-.45801677765722737,.45801677765722737,-.6178762444026438,.6178762444026438,-.755404408355003,.755404408355003,-.8656312023878318,.8656312023878318,-.9445750230732326,.9445750230732326,-.9894009349916499,.9894009349916499],[0,-.17848418149584785,.17848418149584785,-.3512317634538763,.3512317634538763,-.5126905370864769,.5126905370864769,-.6576711592166907,.6576711592166907,-.7815140038968014,.7815140038968014,-.8802391537269859,.8802391537269859,-.9506755217687678,.9506755217687678,-.9905754753144174,.9905754753144174],[-.0847750130417353,.0847750130417353,-.2518862256915055,.2518862256915055,-.41175116146284263,.41175116146284263,-.5597708310739475,.5597708310739475,-.6916870430603532,.6916870430603532,-.8037049589725231,.8037049589725231,-.8926024664975557,.8926024664975557,-.9558239495713977,.9558239495713977,-.9915651684209309,.9915651684209309],[0,-.16035864564022537,.16035864564022537,-.31656409996362983,.31656409996362983,-.46457074137596094,.46457074137596094,-.600545304661681,.600545304661681,-.7209661773352294,.7209661773352294,-.8227146565371428,.8227146565371428,-.9031559036148179,.9031559036148179,-.96020815213483,.96020815213483,-.9924068438435844,.9924068438435844],[-.07652652113349734,.07652652113349734,-.22778585114164507,.22778585114164507,-.37370608871541955,.37370608871541955,-.5108670019508271,.5108670019508271,-.636053680726515,.636053680726515,-.7463319064601508,.7463319064601508,-.8391169718222188,.8391169718222188,-.912234428251326,.912234428251326,-.9639719272779138,.9639719272779138,-.9931285991850949,.9931285991850949],[0,-.1455618541608951,.1455618541608951,-.2880213168024011,.2880213168024011,-.4243421202074388,.4243421202074388,-.5516188358872198,.5516188358872198,-.6671388041974123,.6671388041974123,-.7684399634756779,.7684399634756779,-.8533633645833173,.8533633645833173,-.9200993341504008,.9200993341504008,-.9672268385663063,.9672268385663063,-.9937521706203895,.9937521706203895],[-.06973927331972223,.06973927331972223,-.20786042668822127,.20786042668822127,-.34193582089208424,.34193582089208424,-.469355837986757,.469355837986757,-.5876404035069116,.5876404035069116,-.6944872631866827,.6944872631866827,-.7878168059792081,.7878168059792081,-.8658125777203002,.8658125777203002,-.926956772187174,.926956772187174,-.9700604978354287,.9700604978354287,-.9942945854823992,.9942945854823992],[0,-.1332568242984661,.1332568242984661,-.26413568097034495,.26413568097034495,-.3903010380302908,.3903010380302908,-.5095014778460075,.5095014778460075,-.6196098757636461,.6196098757636461,-.7186613631319502,.7186613631319502,-.8048884016188399,.8048884016188399,-.8767523582704416,.8767523582704416,-.9329710868260161,.9329710868260161,-.9725424712181152,.9725424712181152,-.9947693349975522,.9947693349975522],[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213]],t.cValues=[[],[],[1,1],[.8888888888888888,.5555555555555556,.5555555555555556],[.6521451548625461,.6521451548625461,.34785484513745385,.34785484513745385],[.5688888888888889,.47862867049936647,.47862867049936647,.23692688505618908,.23692688505618908],[.3607615730481386,.3607615730481386,.46791393457269104,.46791393457269104,.17132449237917036,.17132449237917036],[.4179591836734694,.3818300505051189,.3818300505051189,.27970539148927664,.27970539148927664,.1294849661688697,.1294849661688697],[.362683783378362,.362683783378362,.31370664587788727,.31370664587788727,.22238103445337448,.22238103445337448,.10122853629037626,.10122853629037626],[.3302393550012598,.1806481606948574,.1806481606948574,.08127438836157441,.08127438836157441,.31234707704000286,.31234707704000286,.26061069640293544,.26061069640293544],[.29552422471475287,.29552422471475287,.26926671930999635,.26926671930999635,.21908636251598204,.21908636251598204,.1494513491505806,.1494513491505806,.06667134430868814,.06667134430868814],[.2729250867779006,.26280454451024665,.26280454451024665,.23319376459199048,.23319376459199048,.18629021092773426,.18629021092773426,.1255803694649046,.1255803694649046,.05566856711617366,.05566856711617366],[.24914704581340277,.24914704581340277,.2334925365383548,.2334925365383548,.20316742672306592,.20316742672306592,.16007832854334622,.16007832854334622,.10693932599531843,.10693932599531843,.04717533638651183,.04717533638651183],[.2325515532308739,.22628318026289723,.22628318026289723,.2078160475368885,.2078160475368885,.17814598076194574,.17814598076194574,.13887351021978725,.13887351021978725,.09212149983772845,.09212149983772845,.04048400476531588,.04048400476531588],[.2152638534631578,.2152638534631578,.2051984637212956,.2051984637212956,.18553839747793782,.18553839747793782,.15720316715819355,.15720316715819355,.12151857068790319,.12151857068790319,.08015808715976021,.08015808715976021,.03511946033175186,.03511946033175186],[.2025782419255613,.19843148532711158,.19843148532711158,.1861610000155622,.1861610000155622,.16626920581699392,.16626920581699392,.13957067792615432,.13957067792615432,.10715922046717194,.10715922046717194,.07036604748810812,.07036604748810812,.03075324199611727,.03075324199611727],[.1894506104550685,.1894506104550685,.18260341504492358,.18260341504492358,.16915651939500254,.16915651939500254,.14959598881657674,.14959598881657674,.12462897125553388,.12462897125553388,.09515851168249279,.09515851168249279,.062253523938647894,.062253523938647894,.027152459411754096,.027152459411754096],[.17944647035620653,.17656270536699264,.17656270536699264,.16800410215645004,.16800410215645004,.15404576107681028,.15404576107681028,.13513636846852548,.13513636846852548,.11188384719340397,.11188384719340397,.08503614831717918,.08503614831717918,.0554595293739872,.0554595293739872,.02414830286854793,.02414830286854793],[.1691423829631436,.1691423829631436,.16427648374583273,.16427648374583273,.15468467512626524,.15468467512626524,.14064291467065065,.14064291467065065,.12255520671147846,.12255520671147846,.10094204410628717,.10094204410628717,.07642573025488905,.07642573025488905,.0497145488949698,.0497145488949698,.02161601352648331,.02161601352648331],[.1610544498487837,.15896884339395434,.15896884339395434,.15276604206585967,.15276604206585967,.1426067021736066,.1426067021736066,.12875396253933621,.12875396253933621,.11156664554733399,.11156664554733399,.09149002162245,.09149002162245,.06904454273764123,.06904454273764123,.0448142267656996,.0448142267656996,.019461788229726478,.019461788229726478],[.15275338713072584,.15275338713072584,.14917298647260374,.14917298647260374,.14209610931838204,.14209610931838204,.13168863844917664,.13168863844917664,.11819453196151841,.11819453196151841,.10193011981724044,.10193011981724044,.08327674157670475,.08327674157670475,.06267204833410907,.06267204833410907,.04060142980038694,.04060142980038694,.017614007139152118,.017614007139152118],[.14608113364969041,.14452440398997005,.14452440398997005,.13988739479107315,.13988739479107315,.13226893863333747,.13226893863333747,.12183141605372853,.12183141605372853,.10879729916714838,.10879729916714838,.09344442345603386,.09344442345603386,.0761001136283793,.0761001136283793,.057134425426857205,.057134425426857205,.036953789770852494,.036953789770852494,.016017228257774335,.016017228257774335],[.13925187285563198,.13925187285563198,.13654149834601517,.13654149834601517,.13117350478706238,.13117350478706238,.12325237681051242,.12325237681051242,.11293229608053922,.11293229608053922,.10041414444288096,.10041414444288096,.08594160621706773,.08594160621706773,.06979646842452049,.06979646842452049,.052293335152683286,.052293335152683286,.03377490158481415,.03377490158481415,.0146279952982722,.0146279952982722],[.13365457218610619,.1324620394046966,.1324620394046966,.12890572218808216,.12890572218808216,.12304908430672953,.12304908430672953,.11499664022241136,.11499664022241136,.10489209146454141,.10489209146454141,.09291576606003515,.09291576606003515,.07928141177671895,.07928141177671895,.06423242140852585,.06423242140852585,.04803767173108467,.04803767173108467,.030988005856979445,.030988005856979445,.013411859487141771,.013411859487141771],[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872]],t.binomialCoefficients=[[1],[1,1],[1,2,1],[1,3,3,1]],t.getCubicArcLength=(i,s,n)=>{let r,o;const a=n/2;r=0;for(let n=0;n<20;n++)o=a*t.tValues[20][n]+a,r+=t.cValues[20][n]*e(i,s,o);return a*r},t.getQuadraticArcLength=(t,e,i)=>{void 0===i&&(i=1);const s=t[0]-2*t[1]+t[2],n=e[0]-2*e[1]+e[2],r=2*t[1]-2*t[0],o=2*e[1]-2*e[0],a=4*(s*s+n*n),l=4*(s*r+n*o),h=r*r+o*o;if(0===a)return i*Math.sqrt(Math.pow(t[2]-t[0],2)+Math.pow(e[2]-e[0],2));const c=l/(2*a),d=i+c,u=h/a-c*c,p=d*d+u>0?Math.sqrt(d*d+u):0,g=c*c+u>0?Math.sqrt(c*c+u):0,f=c+Math.sqrt(c*c+u)!==0?u*Math.log(Math.abs((d+p)/(c+g))):0;return Math.sqrt(a)/2*(d*p-c*g+f)};const i=(e,s,n)=>{const r=n.length-1;let o,a;if(0===r)return 0;if(0===e){a=0;for(let e=0;e<=r;e++)a+=t.binomialCoefficients[r][e]*Math.pow(1-s,r-e)*Math.pow(s,e)*n[e];return a}o=new Array(r);for(let t=0;t<r;t++)o[t]=r*(n[t+1]-n[t]);return i(e-1,s,o)};t.t2length=(t,e,i)=>{let s=1,n=t/e,r=(t-i(n))/e,o=0;for(;s>.001;){const a=i(n+r),l=Math.abs(t-a)/e;if(l<s)s=l,n+=r;else{const o=i(n-r),a=Math.abs(t-o)/e;a<s?(s=a,n-=r):r/=2}if(o++,o>500)break}return n}}(ir)),ir);let n=class t extends i.Shape{constructor(t){super(t),this.dataArray=[],this.pathLength=0,this._readDataAttribute(),this.on("dataChange.konva",function(){this._readDataAttribute()})}_readDataAttribute(){this.dataArray=t.parsePathData(this.data()),this.pathLength=t.getPathLength(this.dataArray)}_sceneFunc(t){const e=this.dataArray;t.beginPath();let i=!1;for(let s=0;s<e.length;s++){const n=e[s].command,r=e[s].points;switch(n){case"L":t.lineTo(r[0],r[1]);break;case"M":t.moveTo(r[0],r[1]);break;case"C":t.bezierCurveTo(r[0],r[1],r[2],r[3],r[4],r[5]);break;case"Q":t.quadraticCurveTo(r[0],r[1],r[2],r[3]);break;case"A":const e=r[0],s=r[1],n=r[2],o=r[3],a=r[4],l=r[5],h=r[6],c=r[7],d=n>o?n:o,u=n>o?1:n/o,p=n>o?o/n:1;t.translate(e,s),t.rotate(h),t.scale(u,p),t.arc(0,0,d,a,a+l,1-c),t.scale(1/u,1/p),t.rotate(-h),t.translate(-e,-s);break;case"z":i=!0,t.closePath()}}i||this.hasFill()?t.fillStrokeShape(this):t.strokeShape(this)}getSelfRect(){let e=[];this.dataArray.forEach(function(i){if("A"===i.command){const s=i.points[4],n=i.points[5],r=i.points[4]+n;let o=Math.PI/180;if(Math.abs(s-r)<o&&(o=Math.abs(s-r)),n<0)for(let n=s-o;n>r;n-=o){const s=t.getPointOnEllipticalArc(i.points[0],i.points[1],i.points[2],i.points[3],n,0);e.push(s.x,s.y)}else for(let n=s+o;n<r;n+=o){const s=t.getPointOnEllipticalArc(i.points[0],i.points[1],i.points[2],i.points[3],n,0);e.push(s.x,s.y)}}else if("C"===i.command)for(let s=0;s<=1;s+=.01){const n=t.getPointOnCubicBezier(s,i.start.x,i.start.y,i.points[0],i.points[1],i.points[2],i.points[3],i.points[4],i.points[5]);e.push(n.x,n.y)}else e=e.concat(i.points)});let i,s,n=e[0],r=e[0],o=e[1],a=e[1];for(let t=0;t<e.length/2;t++)i=e[2*t],s=e[2*t+1],isNaN(i)||(n=Math.min(n,i),r=Math.max(r,i)),isNaN(s)||(o=Math.min(o,s),a=Math.max(a,s));return{x:n,y:o,width:r-n,height:a-o}}getLength(){return this.pathLength}getPointAtLength(e){return t.getPointAtLengthOfDataArray(e,this.dataArray)}static getLineLength(t,e,i,s){return Math.sqrt((i-t)*(i-t)+(s-e)*(s-e))}static getPathLength(t){let e=0;for(let i=0;i<t.length;++i)e+=t[i].pathLength;return e}static getPointAtLengthOfDataArray(e,i){let n,r=0,o=i.length;if(!o)return null;for(;r<o&&e>i[r].pathLength;)e-=i[r].pathLength,++r;if(r===o)return n=i[r-1].points.slice(-2),{x:n[0],y:n[1]};if(e<.01){return"M"===i[r].command?(n=i[r].points.slice(0,2),{x:n[0],y:n[1]}):{x:i[r].start.x,y:i[r].start.y}}const a=i[r],l=a.points;switch(a.command){case"L":return t.getPointOnLine(e,a.start.x,a.start.y,l[0],l[1]);case"C":return t.getPointOnCubicBezier((0,s.t2length)(e,t.getPathLength(i),t=>(0,s.getCubicArcLength)([a.start.x,l[0],l[2],l[4]],[a.start.y,l[1],l[3],l[5]],t)),a.start.x,a.start.y,l[0],l[1],l[2],l[3],l[4],l[5]);case"Q":return t.getPointOnQuadraticBezier((0,s.t2length)(e,t.getPathLength(i),t=>(0,s.getQuadraticArcLength)([a.start.x,l[0],l[2]],[a.start.y,l[1],l[3]],t)),a.start.x,a.start.y,l[0],l[1],l[2],l[3]);case"A":const n=l[0],r=l[1],o=l[2],h=l[3],c=l[5],d=l[6];let u=l[4];return u+=c*e/a.pathLength,t.getPointOnEllipticalArc(n,r,o,h,u,d)}return null}static getPointOnLine(t,e,i,s,n,r,o){r=null!=r?r:e,o=null!=o?o:i;const a=this.getLineLength(e,i,s,n);if(a<1e-10)return{x:e,y:i};if(s===e)return{x:r,y:o+(n>i?t:-t)};const l=(n-i)/(s-e),h=Math.sqrt(t*t/(1+l*l))*(s<e?-1:1),c=l*h;if(Math.abs(o-i-l*(r-e))<1e-10)return{x:r+h,y:o+c};const d=((r-e)*(s-e)+(o-i)*(n-i))/(a*a),u=e+d*(s-e),p=i+d*(n-i),g=this.getLineLength(r,o,u,p),f=Math.sqrt(t*t-g*g),_=Math.sqrt(f*f/(1+l*l))*(s<e?-1:1);return{x:u+_,y:p+l*_}}static getPointOnCubicBezier(t,e,i,s,n,r,o,a,l){function h(t){return t*t*t}function c(t){return 3*t*t*(1-t)}function d(t){return 3*t*(1-t)*(1-t)}function u(t){return(1-t)*(1-t)*(1-t)}return{x:a*h(t)+r*c(t)+s*d(t)+e*u(t),y:l*h(t)+o*c(t)+n*d(t)+i*u(t)}}static getPointOnQuadraticBezier(t,e,i,s,n,r,o){function a(t){return t*t}function l(t){return 2*t*(1-t)}function h(t){return(1-t)*(1-t)}return{x:r*a(t)+s*l(t)+e*h(t),y:o*a(t)+n*l(t)+i*h(t)}}static getPointOnEllipticalArc(t,e,i,s,n,r){const o=Math.cos(r),a=Math.sin(r),l=i*Math.cos(n),h=s*Math.sin(n);return{x:t+(l*o-h*a),y:e+(l*a+h*o)}}static parsePathData(t){if(!t)return[];let e=t;const i=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];e=e.replace(new RegExp(" ","g"),",");for(let t=0;t<i.length;t++)e=e.replace(new RegExp(i[t],"g"),"|"+i[t]);const s=e.split("|"),n=[],r=[];let o=0,a=0;const l=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;let h;for(let t=1;t<s.length;t++){let e=s[t],i=e.charAt(0);for(e=e.slice(1),r.length=0;h=l.exec(e);)r.push(h[0]);const c=[];for(let t=0,e=r.length;t<e;t++){if("00"===r[t]){c.push(0,0);continue}const e=parseFloat(r[t]);isNaN(e)?c.push(0):c.push(e)}for(;c.length>0&&!isNaN(c[0]);){let t="",e=[];const s=o,r=a;let l,h,d,u,p,g,f,_,m,v;switch(i){case"l":o+=c.shift(),a+=c.shift(),t="L",e.push(o,a);break;case"L":o=c.shift(),a=c.shift(),e.push(o,a);break;case"m":const s=c.shift(),r=c.shift();if(o+=s,a+=r,t="M",n.length>2&&"z"===n[n.length-1].command)for(let t=n.length-2;t>=0;t--)if("M"===n[t].command){o=n[t].points[0]+s,a=n[t].points[1]+r;break}e.push(o,a),i="l";break;case"M":o=c.shift(),a=c.shift(),t="M",e.push(o,a),i="L";break;case"h":o+=c.shift(),t="L",e.push(o,a);break;case"H":o=c.shift(),t="L",e.push(o,a);break;case"v":a+=c.shift(),t="L",e.push(o,a);break;case"V":a=c.shift(),t="L",e.push(o,a);break;case"C":e.push(c.shift(),c.shift(),c.shift(),c.shift()),o=c.shift(),a=c.shift(),e.push(o,a);break;case"c":e.push(o+c.shift(),a+c.shift(),o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="C",e.push(o,a);break;case"S":h=o,d=a,l=n[n.length-1],"C"===l.command&&(h=o+(o-l.points[2]),d=a+(a-l.points[3])),e.push(h,d,c.shift(),c.shift()),o=c.shift(),a=c.shift(),t="C",e.push(o,a);break;case"s":h=o,d=a,l=n[n.length-1],"C"===l.command&&(h=o+(o-l.points[2]),d=a+(a-l.points[3])),e.push(h,d,o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="C",e.push(o,a);break;case"Q":e.push(c.shift(),c.shift()),o=c.shift(),a=c.shift(),e.push(o,a);break;case"q":e.push(o+c.shift(),a+c.shift()),o+=c.shift(),a+=c.shift(),t="Q",e.push(o,a);break;case"T":h=o,d=a,l=n[n.length-1],"Q"===l.command&&(h=o+(o-l.points[0]),d=a+(a-l.points[1])),o=c.shift(),a=c.shift(),t="Q",e.push(h,d,o,a);break;case"t":h=o,d=a,l=n[n.length-1],"Q"===l.command&&(h=o+(o-l.points[0]),d=a+(a-l.points[1])),o+=c.shift(),a+=c.shift(),t="Q",e.push(h,d,o,a);break;case"A":u=c.shift(),p=c.shift(),g=c.shift(),f=c.shift(),_=c.shift(),m=o,v=a,o=c.shift(),a=c.shift(),t="A",e=this.convertEndpointToCenterParameterization(m,v,o,a,f,_,u,p,g);break;case"a":u=c.shift(),p=c.shift(),g=c.shift(),f=c.shift(),_=c.shift(),m=o,v=a,o+=c.shift(),a+=c.shift(),t="A",e=this.convertEndpointToCenterParameterization(m,v,o,a,f,_,u,p,g)}n.push({command:t||i,points:e,start:{x:s,y:r},pathLength:this.calcLength(s,r,t||i,e)})}"z"!==i&&"Z"!==i||n.push({command:"z",points:[],start:void 0,pathLength:0})}return n}static calcLength(e,i,n,r){let o,a,l,h;const c=t;switch(n){case"L":return c.getLineLength(e,i,r[0],r[1]);case"C":return(0,s.getCubicArcLength)([e,r[0],r[2],r[4]],[i,r[1],r[3],r[5]],1);case"Q":return(0,s.getQuadraticArcLength)([e,r[0],r[2]],[i,r[1],r[3]],1);case"A":o=0;const t=r[4],n=r[5],d=r[4]+n;let u=Math.PI/180;if(Math.abs(t-d)<u&&(u=Math.abs(t-d)),a=c.getPointOnEllipticalArc(r[0],r[1],r[2],r[3],t,0),n<0)for(h=t-u;h>d;h-=u)l=c.getPointOnEllipticalArc(r[0],r[1],r[2],r[3],h,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),a=l;else for(h=t+u;h<d;h+=u)l=c.getPointOnEllipticalArc(r[0],r[1],r[2],r[3],h,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),a=l;return l=c.getPointOnEllipticalArc(r[0],r[1],r[2],r[3],d,0),o+=c.getLineLength(a.x,a.y,l.x,l.y),o}return 0}static convertEndpointToCenterParameterization(t,e,i,s,n,r,o,a,l){const h=l*(Math.PI/180),c=Math.cos(h)*(t-i)/2+Math.sin(h)*(e-s)/2,d=-1*Math.sin(h)*(t-i)/2+Math.cos(h)*(e-s)/2,u=c*c/(o*o)+d*d/(a*a);u>1&&(o*=Math.sqrt(u),a*=Math.sqrt(u));let p=Math.sqrt((o*o*(a*a)-o*o*(d*d)-a*a*(c*c))/(o*o*(d*d)+a*a*(c*c)));n===r&&(p*=-1),isNaN(p)&&(p=0);const g=p*o*d/a,f=p*-a*c/o,_=(t+i)/2+Math.cos(h)*g-Math.sin(h)*f,m=(e+s)/2+Math.sin(h)*g+Math.cos(h)*f,v=function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])},y=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(v(t)*v(e))},b=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(y(t,e))},x=b([1,0],[(c-g)/o,(d-f)/a]),w=[(c-g)/o,(d-f)/a],S=[(-1*c-g)/o,(-1*d-f)/a];let C=b(w,S);return y(w,S)<=-1&&(C=Math.PI),y(w,S)>=1&&(C=0),0===r&&C>0&&(C-=2*Math.PI),1===r&&C<0&&(C+=2*Math.PI),[_,m,o,a,x,C,h,r]}};return er.Path=n,n.prototype.className="Path",n.prototype._attrsAffectingSize=["data"],(0,e._registerNode)(n),t.Factory.addGetterSetter(n,"data"),er}var nr,rr={};var or,ar={};var lr,hr={};var cr,dr={};var ur,pr={};function gr(){if(ur)return pr;ur=1,Object.defineProperty(pr,"__esModule",{value:!0}),pr.Rect=void 0;const t=vn(),e=Ln(),i=Zs(),s=tn(),n=mn();let r=class extends e.Shape{_sceneFunc(t){const e=this.cornerRadius(),i=this.width(),n=this.height();t.beginPath(),e?s.Util.drawRoundedRectPath(t,i,n,e):t.rect(0,0,i,n),t.closePath(),t.fillStrokeShape(this)}};return pr.Rect=r,r.prototype.className="Rect",(0,i._registerNode)(r),t.Factory.addGetterSetter(r,"cornerRadius",0,(0,n.getNumberOrArrayOfNumbersValidator)(4)),pr}var fr,_r={};var mr,vr={};var yr,br={};var xr,wr={};var Sr,Cr={};function kr(){if(Sr)return Cr;Sr=1,Object.defineProperty(Cr,"__esModule",{value:!0}),Cr.Text=void 0,Cr.stringToArray=o;const t=tn(),e=vn(),i=Ln(),s=Zs(),n=mn(),r=Zs();function o(t){return[...t].reduce((t,e,i,s)=>{if(/\p{Emoji}/u.test(e)){const n=s[i+1];n&&/\p{Emoji_Modifier}|\u200D/u.test(n)?(t.push(e+n),s[i+1]=""):t.push(e)}else/\p{Regional_Indicator}{2}/u.test(e+(s[i+1]||""))?t.push(e+s[i+1]):i>0&&/\p{Mn}|\p{Me}|\p{Mc}/u.test(e)?t[t.length-1]+=e:e&&t.push(e);return t},[])}const a="auto",l="inherit",h="justify",c="left",d="middle",u="normal",p=" ",g="none",f=["direction","fontFamily","fontSize","fontStyle","fontVariant","padding","align","verticalAlign","lineHeight","text","width","height","wrap","ellipsis","letterSpacing"],_=f.length;let m;function v(){return m||(m=t.Util.createCanvasElement().getContext("2d"),m)}let y=class extends i.Shape{constructor(t){super(function(t){return(t=t||{}).fillLinearGradientColorStops||t.fillRadialGradientColorStops||t.fillPatternImage||(t.fill=t.fill||"black"),t}(t)),this._partialTextX=0,this._partialTextY=0;for(let t=0;t<_;t++)this.on(f[t]+"Change.konva",this._setTextData);this._setTextData()}_sceneFunc(t){const e=this.textArr,i=e.length;if(!this.text())return;let n,r=this.padding(),a=this.fontSize(),u=this.lineHeight()*a,p=this.verticalAlign(),g=this.direction(),f=0,_=this.align(),m=this.getWidth(),v=this.letterSpacing(),y=this.fill(),b=this.textDecoration(),x=-1!==b.indexOf("underline"),w=-1!==b.indexOf("line-through");g=g===l?t.direction:g;let S=u/2,C=d;if(s.Konva._fixTextRendering){const t=this.measureSize("M");C="alphabetic",S=(t.fontBoundingBoxAscent-t.fontBoundingBoxDescent)/2+u/2}for("rtl"===g&&t.setAttr("direction",g),t.setAttr("font",this._getContextFont()),t.setAttr("textBaseline",C),t.setAttr("textAlign",c),p===d?f=(this.getHeight()-i*u-2*r)/2:"bottom"===p&&(f=this.getHeight()-i*u-2*r),t.translate(r,f+r),n=0;n<i;n++){let l=0,c=0;const d=e[n],p=d.text,f=d.width,b=d.lastInParagraph;if(t.save(),"right"===_?l+=m-f-2*r:"center"===_&&(l+=(m-f-2*r)/2),x){t.save(),t.beginPath();const e=l,i=S+c+(s.Konva._fixTextRendering?Math.round(a/4):Math.round(a/2));t.moveTo(e,i);const n=_!==h||b?f:m-2*r;t.lineTo(e+Math.round(n),i),t.lineWidth=a/15;const o=this._getLinearGradient();t.strokeStyle=o||y,t.stroke(),t.restore()}if(w){t.save(),t.beginPath();const e=s.Konva._fixTextRendering?-Math.round(a/4):0;t.moveTo(l,S+c+e);const i=_!==h||b?f:m-2*r;t.lineTo(l+Math.round(i),S+c+e),t.lineWidth=a/15;const n=this._getLinearGradient();t.strokeStyle=n||y,t.stroke(),t.restore()}if("rtl"===g||0===v&&_!==h)0!==v&&t.setAttr("letterSpacing",`${v}px`),this._partialTextX=l,this._partialTextY=S+c,this._partialText=p,t.fillStrokeShape(this);else{const e=p.split(" ").length-1,i=o(p);for(let s=0;s<i.length;s++){const n=i[s];" "!==n||b||_!==h||(l+=(m-2*r-f)/e),this._partialTextX=l,this._partialTextY=S+c,this._partialText=n,t.fillStrokeShape(this),l+=this.measureSize(n).width+v}}t.restore(),i>1&&(S+=u)}}_hitFunc(t){const e=this.getWidth(),i=this.getHeight();t.beginPath(),t.rect(0,0,e,i),t.closePath(),t.fillStrokeShape(this)}setText(e){const i=t.Util._isString(e)?e:null==e?"":e+"";return this._setAttr("text",i),this}getWidth(){return this.attrs.width===a||void 0===this.attrs.width?this.getTextWidth()+2*this.padding():this.attrs.width}getHeight(){return this.attrs.height===a||void 0===this.attrs.height?this.fontSize()*this.textArr.length*this.lineHeight()+2*this.padding():this.attrs.height}getTextWidth(){return this.textWidth}getTextHeight(){return t.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),this.textHeight}measureSize(t){var e,i,s,n,r,o,a,l,h,c,d;let u,p=v(),g=this.fontSize();p.save(),p.font=this._getContextFont(),u=p.measureText(t),p.restore();const f=g/100;return{actualBoundingBoxAscent:null!==(e=u.actualBoundingBoxAscent)&&void 0!==e?e:71.58203125*f,actualBoundingBoxDescent:null!==(i=u.actualBoundingBoxDescent)&&void 0!==i?i:0,actualBoundingBoxLeft:null!==(s=u.actualBoundingBoxLeft)&&void 0!==s?s:-7.421875*f,actualBoundingBoxRight:null!==(n=u.actualBoundingBoxRight)&&void 0!==n?n:75.732421875*f,alphabeticBaseline:null!==(r=u.alphabeticBaseline)&&void 0!==r?r:0,emHeightAscent:null!==(o=u.emHeightAscent)&&void 0!==o?o:100*f,emHeightDescent:null!==(a=u.emHeightDescent)&&void 0!==a?a:-20*f,fontBoundingBoxAscent:null!==(l=u.fontBoundingBoxAscent)&&void 0!==l?l:91*f,fontBoundingBoxDescent:null!==(h=u.fontBoundingBoxDescent)&&void 0!==h?h:21*f,hangingBaseline:null!==(c=u.hangingBaseline)&&void 0!==c?c:72.80000305175781*f,ideographicBaseline:null!==(d=u.ideographicBaseline)&&void 0!==d?d:-21*f,width:u.width,height:g}}_getContextFont(){return this.fontStyle()+p+this.fontVariant()+p+(this.fontSize()+"px ")+this.fontFamily().split(",").map(t=>{const e=(t=t.trim()).indexOf(" ")>=0,i=t.indexOf('"')>=0||t.indexOf("'")>=0;return e&&!i&&(t=`"${t}"`),t}).join(", ")}_addTextLine(t){this.align()===h&&(t=t.trim());const e=this._getTextWidth(t);return this.textArr.push({text:t,width:e,lastInParagraph:!1})}_getTextWidth(t){const e=this.letterSpacing(),i=t.length;return v().measureText(t).width+e*i}_setTextData(){let t=this.text().split("\n"),e=+this.fontSize(),i=0,s=this.lineHeight()*e,n=this.attrs.width,r=this.attrs.height,l=n!==a&&void 0!==n,h=r!==a&&void 0!==r,c=this.padding(),d=n-2*c,u=r-2*c,f=0,_=this.wrap(),m="char"!==_&&_!==g,y=this.ellipsis();this.textArr=[],v().font=this._getContextFont();const b=y?this._getTextWidth("…"):0;for(let e=0,n=t.length;e<n;++e){let r=t[e],a=this._getTextWidth(r);if(l&&a>d)for(;r.length>0;){let t=0,e=o(r).length,n="",l=0;for(;t<e;){const i=t+e>>>1,a=o(r).slice(0,i+1).join(""),c=this._getTextWidth(a);(y&&h&&f+s>u?c+b:c)<=d?(t=i+1,n=a,l=c):e=i}if(!n)break;if(m){const e=o(r),i=o(n),s=e[i.length];let a;if((s===p||"-"===s)&&l<=d)a=i.length;else{const t=i.lastIndexOf(p),e=i.lastIndexOf("-");a=Math.max(t,e)+1}a>0&&(t=a,n=e.slice(0,t).join(""),l=this._getTextWidth(n))}n=n.trimRight(),this._addTextLine(n),i=Math.max(i,l),f+=s;if(this._shouldHandleEllipsis(f)){this._tryToAddEllipsisToLastLine();break}if(r=o(r).slice(t).join("").trimLeft(),r.length>0&&(a=this._getTextWidth(r),a<=d)){this._addTextLine(r),f+=s,i=Math.max(i,a);break}}else this._addTextLine(r),f+=s,i=Math.max(i,a),this._shouldHandleEllipsis(f)&&e<n-1&&this._tryToAddEllipsisToLastLine();if(this.textArr[this.textArr.length-1]&&(this.textArr[this.textArr.length-1].lastInParagraph=!0),h&&f+s>u)break}this.textHeight=e,this.textWidth=i}_shouldHandleEllipsis(t){const e=+this.fontSize(),i=this.lineHeight()*e,s=this.attrs.height,n=s!==a&&void 0!==s,r=s-2*this.padding();return!(this.wrap()!==g)||n&&t+i>r}_tryToAddEllipsisToLastLine(){const t=this.attrs.width,e=t!==a&&void 0!==t,i=t-2*this.padding(),s=this.ellipsis(),n=this.textArr[this.textArr.length-1];if(n&&s){if(e){this._getTextWidth(n.text+"…")<i||(n.text=n.text.slice(0,n.text.length-3))}this.textArr.splice(this.textArr.length-1,1),this._addTextLine(n.text+"…")}}getStrokeScaleEnabled(){return!0}_useBufferCanvas(){const t=-1!==this.textDecoration().indexOf("underline")||-1!==this.textDecoration().indexOf("line-through"),e=this.hasShadow();return!(!t||!e)||super._useBufferCanvas()}};return Cr.Text=y,y.prototype._fillFunc=function(t){t.fillText(this._partialText,this._partialTextX,this._partialTextY)},y.prototype._strokeFunc=function(t){t.setAttr("miterLimit",2),t.strokeText(this._partialText,this._partialTextX,this._partialTextY)},y.prototype.className="Text",y.prototype._attrsAffectingSize=["text","fontSize","padding","wrap","lineHeight","letterSpacing"],(0,r._registerNode)(y),e.Factory.overWriteSetter(y,"width",(0,n.getNumberOrAutoValidator)()),e.Factory.overWriteSetter(y,"height",(0,n.getNumberOrAutoValidator)()),e.Factory.addGetterSetter(y,"direction",l),e.Factory.addGetterSetter(y,"fontFamily","Arial"),e.Factory.addGetterSetter(y,"fontSize",12,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(y,"fontStyle",u),e.Factory.addGetterSetter(y,"fontVariant",u),e.Factory.addGetterSetter(y,"padding",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(y,"align",c),e.Factory.addGetterSetter(y,"verticalAlign","top"),e.Factory.addGetterSetter(y,"lineHeight",1,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(y,"wrap","word"),e.Factory.addGetterSetter(y,"ellipsis",!1,(0,n.getBooleanValidator)()),e.Factory.addGetterSetter(y,"letterSpacing",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(y,"text","",(0,n.getStringValidator)()),e.Factory.addGetterSetter(y,"textDecoration",""),Cr}var Pr,Ir={};var $r,Mr={};function Er(){if($r)return Mr;$r=1,Object.defineProperty(Mr,"__esModule",{value:!0}),Mr.Transformer=void 0;const t=tn(),e=vn(),i=yn(),s=Ln(),n=gr(),r=On(),o=Zs(),a=mn(),l=Zs(),h="tr-konva",c=["resizeEnabledChange","rotateAnchorOffsetChange","rotateEnabledChange","enabledAnchorsChange","anchorSizeChange","borderEnabledChange","borderStrokeChange","borderStrokeWidthChange","borderDashChange","anchorStrokeChange","anchorStrokeWidthChange","anchorFillChange","anchorCornerRadiusChange","ignoreStrokeChange","anchorStyleFuncChange"].map(t=>t+`.${h}`).join(" "),d="nodesRect",u=["widthChange","heightChange","scaleXChange","scaleYChange","skewXChange","skewYChange","rotationChange","offsetXChange","offsetYChange","transformsEnabledChange","strokeWidthChange"],p={"top-left":-45,"top-center":0,"top-right":45,"middle-right":-90,"middle-left":90,"bottom-left":-135,"bottom-center":180,"bottom-right":135},g="ontouchstart"in o.Konva._global;const f=["top-left","top-center","top-right","middle-right","middle-left","bottom-left","bottom-center","bottom-right"];function _(t,e,i){const s=i.x+(t.x-i.x)*Math.cos(e)-(t.y-i.y)*Math.sin(e),n=i.y+(t.x-i.x)*Math.sin(e)+(t.y-i.y)*Math.cos(e);return{...t,rotation:t.rotation+e,x:s,y:n}}function m(t,e){const i=function(t){return{x:t.x+t.width/2*Math.cos(t.rotation)+t.height/2*Math.sin(-t.rotation),y:t.y+t.height/2*Math.cos(t.rotation)+t.width/2*Math.sin(t.rotation)}}(t);return _(t,e,i)}let v=0,y=class extends r.Group{constructor(t){super(t),this._movingAnchorName=null,this._transforming=!1,this._createElements(),this._handleMouseMove=this._handleMouseMove.bind(this),this._handleMouseUp=this._handleMouseUp.bind(this),this.update=this.update.bind(this),this.on(c,this.update),this.getNode()&&this.update()}attachTo(t){return this.setNode(t),this}setNode(e){return t.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."),this.setNodes([e])}getNode(){return this._nodes&&this._nodes[0]}_getEventNamespace(){return h+this._id}setNodes(e=[]){this._nodes&&this._nodes.length&&this.detach();const i=e.filter(e=>!e.isAncestorOf(this)||(t.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach"),!1));this._nodes=e=i,1===e.length&&this.useSingleNodeRotation()?this.rotation(e[0].getAbsoluteRotation()):this.rotation(0),this._nodes.forEach(t=>{const e=()=>{1===this.nodes().length&&this.useSingleNodeRotation()&&this.rotation(this.nodes()[0].getAbsoluteRotation()),this._resetTransformCache(),this._transforming||this.isDragging()||this.update()};if(t._attrsAffectingSize.length){const i=t._attrsAffectingSize.map(t=>t+"Change."+this._getEventNamespace()).join(" ");t.on(i,e)}t.on(u.map(t=>t+`.${this._getEventNamespace()}`).join(" "),e),t.on(`absoluteTransformChange.${this._getEventNamespace()}`,e),this._proxyDrag(t)}),this._resetTransformCache();return!!this.findOne(".top-left")&&this.update(),this}_proxyDrag(t){let e;t.on(`dragstart.${this._getEventNamespace()}`,i=>{e=t.getAbsolutePosition(),this.isDragging()||t===this.findOne(".back")||this.startDrag(i,!1)}),t.on(`dragmove.${this._getEventNamespace()}`,i=>{if(!e)return;const s=t.getAbsolutePosition(),n=s.x-e.x,r=s.y-e.y;this.nodes().forEach(e=>{if(e===t)return;if(e.isDragging())return;const s=e.getAbsolutePosition();e.setAbsolutePosition({x:s.x+n,y:s.y+r}),e.startDrag(i)}),e=null})}getNodes(){return this._nodes||[]}getActiveAnchor(){return this._movingAnchorName}detach(){this._nodes&&this._nodes.forEach(t=>{t.off("."+this._getEventNamespace())}),this._nodes=[],this._resetTransformCache()}_resetTransformCache(){this._clearCache(d),this._clearCache("transform"),this._clearSelfAndDescendantCache("absoluteTransform")}_getNodeRect(){return this._getCache(d,this.__getNodeRect)}__getNodeShape(t,e=this.rotation(),i){const s=t.getClientRect({skipTransform:!0,skipShadow:!0,skipStroke:this.ignoreStroke()}),n=t.getAbsoluteScale(i),r=t.getAbsolutePosition(i),a=s.x*n.x-t.offsetX()*n.x,l=s.y*n.y-t.offsetY()*n.y,h=(o.Konva.getAngle(t.getAbsoluteRotation())+2*Math.PI)%(2*Math.PI);return _({x:r.x+a*Math.cos(h)+l*Math.sin(-h),y:r.y+l*Math.cos(h)+a*Math.sin(h),width:s.width*n.x,height:s.height*n.y,rotation:h},-o.Konva.getAngle(e),{x:0,y:0})}__getNodeRect(){if(!this.getNode())return{x:-1e8,y:-1e8,width:0,height:0,rotation:0};const e=[];this.nodes().map(t=>{const i=t.getClientRect({skipTransform:!0,skipShadow:!0,skipStroke:this.ignoreStroke()}),s=[{x:i.x,y:i.y},{x:i.x+i.width,y:i.y},{x:i.x+i.width,y:i.y+i.height},{x:i.x,y:i.y+i.height}],n=t.getAbsoluteTransform();s.forEach(function(t){const i=n.point(t);e.push(i)})});const i=new t.Transform;i.rotate(-o.Konva.getAngle(this.rotation()));let s=1/0,n=1/0,r=-1/0,a=-1/0;e.forEach(function(t){const e=i.point(t);void 0===s&&(s=r=e.x,n=a=e.y),s=Math.min(s,e.x),n=Math.min(n,e.y),r=Math.max(r,e.x),a=Math.max(a,e.y)}),i.invert();const l=i.point({x:s,y:n});return{x:l.x,y:l.y,width:r-s,height:a-n,rotation:o.Konva.getAngle(this.rotation())}}getX(){return this._getNodeRect().x}getY(){return this._getNodeRect().y}getWidth(){return this._getNodeRect().width}getHeight(){return this._getNodeRect().height}_createElements(){this._createBack(),f.forEach(t=>{this._createAnchor(t)}),this._createAnchor("rotater")}_createAnchor(e){const i=new n.Rect({stroke:"rgb(0, 161, 255)",fill:"white",strokeWidth:1,name:e+" _anchor",dragDistance:0,draggable:!0,hitStrokeWidth:g?10:"auto"}),s=this;i.on("mousedown touchstart",function(t){s._handleMouseDown(t)}),i.on("dragstart",t=>{i.stopDrag(),t.cancelBubble=!0}),i.on("dragend",t=>{t.cancelBubble=!0}),i.on("mouseenter",()=>{const s=o.Konva.getAngle(this.rotation()),n=this.rotateAnchorCursor(),r=function(e,i,s){if("rotater"===e)return s;i+=t.Util.degToRad(p[e]||0);const n=(t.Util.radToDeg(i)%360+360)%360;return t.Util._inRange(n,337.5,360)||t.Util._inRange(n,0,22.5)?"ns-resize":t.Util._inRange(n,22.5,67.5)?"nesw-resize":t.Util._inRange(n,67.5,112.5)?"ew-resize":t.Util._inRange(n,112.5,157.5)?"nwse-resize":t.Util._inRange(n,157.5,202.5)?"ns-resize":t.Util._inRange(n,202.5,247.5)?"nesw-resize":t.Util._inRange(n,247.5,292.5)?"ew-resize":t.Util._inRange(n,292.5,337.5)?"nwse-resize":(t.Util.error("Transformer has unknown angle for cursor detection: "+n),"pointer")}(e,s,n);i.getStage().content&&(i.getStage().content.style.cursor=r),this._cursorChange=!0}),i.on("mouseout",()=>{i.getStage().content&&(i.getStage().content.style.cursor=""),this._cursorChange=!1}),this.add(i)}_createBack(){const e=new s.Shape({name:"back",width:0,height:0,draggable:!0,sceneFunc(e,i){const s=i.getParent(),n=s.padding();e.beginPath(),e.rect(-n,-n,i.width()+2*n,i.height()+2*n),e.moveTo(i.width()/2,-n),s.rotateEnabled()&&s.rotateLineVisible()&&e.lineTo(i.width()/2,-s.rotateAnchorOffset()*t.Util._sign(i.height())-n),e.fillStrokeShape(i)},hitFunc:(t,e)=>{if(!this.shouldOverdrawWholeArea())return;const i=this.padding();t.beginPath(),t.rect(-i,-i,e.width()+2*i,e.height()+2*i),t.fillStrokeShape(e)}});this.add(e),this._proxyDrag(e),e.on("dragstart",t=>{t.cancelBubble=!0}),e.on("dragmove",t=>{t.cancelBubble=!0}),e.on("dragend",t=>{t.cancelBubble=!0}),this.on("dragmove",t=>{this.update()})}_handleMouseDown(t){if(this._transforming)return;this._movingAnchorName=t.target.name().split(" ")[0];const e=this._getNodeRect(),i=e.width,s=e.height,n=Math.sqrt(Math.pow(i,2)+Math.pow(s,2));this.sin=Math.abs(s/n),this.cos=Math.abs(i/n),"undefined"!=typeof window&&(window.addEventListener("mousemove",this._handleMouseMove),window.addEventListener("touchmove",this._handleMouseMove),window.addEventListener("mouseup",this._handleMouseUp,!0),window.addEventListener("touchend",this._handleMouseUp,!0)),this._transforming=!0;const r=t.target.getAbsolutePosition(),o=t.target.getStage().getPointerPosition();this._anchorDragOffset={x:o.x-r.x,y:o.y-r.y},v++,this._fire("transformstart",{evt:t.evt,target:this.getNode()}),this._nodes.forEach(e=>{e._fire("transformstart",{evt:t.evt,target:e})})}_handleMouseMove(t){let e,i,s;const n=this.findOne("."+this._movingAnchorName),r=n.getStage();r.setPointersPositions(t);const a=r.getPointerPosition();let l={x:a.x-this._anchorDragOffset.x,y:a.y-this._anchorDragOffset.y};const h=n.getAbsolutePosition();this.anchorDragBoundFunc()&&(l=this.anchorDragBoundFunc()(h,l,t)),n.setAbsolutePosition(l);const c=n.getAbsolutePosition();if(h.x===c.x&&h.y===c.y)return;if("rotater"===this._movingAnchorName){const s=this._getNodeRect();e=n.x()-s.width/2,i=-n.y()+s.height/2;let r=Math.atan2(-i,e)+Math.PI/2;s.height<0&&(r-=Math.PI);const a=o.Konva.getAngle(this.rotation())+r,l=o.Konva.getAngle(this.rotationSnapTolerance()),h=function(t,e,i){let s=e;for(let n=0;n<t.length;n++){const r=o.Konva.getAngle(t[n]),a=Math.abs(r-e)%(2*Math.PI);Math.min(a,2*Math.PI-a)<i&&(s=r)}return s}(this.rotationSnaps(),a,l),c=m(s,h-s.rotation);return void this._fitNodesInto(c,t)}const d=this.shiftBehavior();let u;u="inverted"===d?this.keepRatio()&&!t.shiftKey:"none"===d?this.keepRatio():this.keepRatio()||t.shiftKey;let p=this.centeredScaling()||t.altKey;if("top-left"===this._movingAnchorName){if(u){const t=p?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".bottom-right").x(),y:this.findOne(".bottom-right").y()};s=Math.sqrt(Math.pow(t.x-n.x(),2)+Math.pow(t.y-n.y(),2));const r=this.findOne(".top-left").x()>t.x?-1:1,o=this.findOne(".top-left").y()>t.y?-1:1;e=s*this.cos*r,i=s*this.sin*o,this.findOne(".top-left").x(t.x-e),this.findOne(".top-left").y(t.y-i)}}else if("top-center"===this._movingAnchorName)this.findOne(".top-left").y(n.y());else if("top-right"===this._movingAnchorName){if(u){const t=p?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".bottom-left").x(),y:this.findOne(".bottom-left").y()};s=Math.sqrt(Math.pow(n.x()-t.x,2)+Math.pow(t.y-n.y(),2));const r=this.findOne(".top-right").x()<t.x?-1:1,o=this.findOne(".top-right").y()>t.y?-1:1;e=s*this.cos*r,i=s*this.sin*o,this.findOne(".top-right").x(t.x+e),this.findOne(".top-right").y(t.y-i)}var g=n.position();this.findOne(".top-left").y(g.y),this.findOne(".bottom-right").x(g.x)}else if("middle-left"===this._movingAnchorName)this.findOne(".top-left").x(n.x());else if("middle-right"===this._movingAnchorName)this.findOne(".bottom-right").x(n.x());else if("bottom-left"===this._movingAnchorName){if(u){const t=p?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".top-right").x(),y:this.findOne(".top-right").y()};s=Math.sqrt(Math.pow(t.x-n.x(),2)+Math.pow(n.y()-t.y,2));const r=t.x<n.x()?-1:1,o=n.y()<t.y?-1:1;e=s*this.cos*r,i=s*this.sin*o,n.x(t.x-e),n.y(t.y+i)}g=n.position(),this.findOne(".top-left").x(g.x),this.findOne(".bottom-right").y(g.y)}else if("bottom-center"===this._movingAnchorName)this.findOne(".bottom-right").y(n.y());else if("bottom-right"===this._movingAnchorName){if(u){const t=p?{x:this.width()/2,y:this.height()/2}:{x:this.findOne(".top-left").x(),y:this.findOne(".top-left").y()};s=Math.sqrt(Math.pow(n.x()-t.x,2)+Math.pow(n.y()-t.y,2));const r=this.findOne(".bottom-right").x()<t.x?-1:1,o=this.findOne(".bottom-right").y()<t.y?-1:1;e=s*this.cos*r,i=s*this.sin*o,this.findOne(".bottom-right").x(t.x+e),this.findOne(".bottom-right").y(t.y+i)}}else console.error(new Error("Wrong position argument of selection resizer: "+this._movingAnchorName));if(p=this.centeredScaling()||t.altKey,p){const t=this.findOne(".top-left"),e=this.findOne(".bottom-right"),i=t.x(),s=t.y(),n=this.getWidth()-e.x(),r=this.getHeight()-e.y();e.move({x:-i,y:-s}),t.move({x:n,y:r})}const f=this.findOne(".top-left").getAbsolutePosition();e=f.x,i=f.y;const _=this.findOne(".bottom-right").x()-this.findOne(".top-left").x(),v=this.findOne(".bottom-right").y()-this.findOne(".top-left").y();this._fitNodesInto({x:e,y:i,width:_,height:v,rotation:o.Konva.getAngle(this.rotation())},t)}_handleMouseUp(t){this._removeEvents(t)}getAbsoluteTransform(){return this.getTransform()}_removeEvents(t){var e;if(this._transforming){this._transforming=!1,"undefined"!=typeof window&&(window.removeEventListener("mousemove",this._handleMouseMove),window.removeEventListener("touchmove",this._handleMouseMove),window.removeEventListener("mouseup",this._handleMouseUp,!0),window.removeEventListener("touchend",this._handleMouseUp,!0));const i=this.getNode();v--,this._fire("transformend",{evt:t,target:i}),null===(e=this.getLayer())||void 0===e||e.batchDraw(),i&&this._nodes.forEach(e=>{var i;e._fire("transformend",{evt:t,target:e}),null===(i=e.getLayer())||void 0===i||i.batchDraw()}),this._movingAnchorName=null}}_fitNodesInto(e,i){const s=this._getNodeRect();if(t.Util._inRange(e.width,2*-this.padding()-1,1))return void this.update();if(t.Util._inRange(e.height,2*-this.padding()-1,1))return void this.update();const n=new t.Transform;if(n.rotate(o.Konva.getAngle(this.rotation())),this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf("left")>=0){const t=n.point({x:2*-this.padding(),y:0});e.x+=t.x,e.y+=t.y,e.width+=2*this.padding(),this._movingAnchorName=this._movingAnchorName.replace("left","right"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y}else if(this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf("right")>=0){const t=n.point({x:2*this.padding(),y:0});this._movingAnchorName=this._movingAnchorName.replace("right","left"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.width+=2*this.padding()}if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf("top")>=0){const t=n.point({x:0,y:2*-this.padding()});e.x+=t.x,e.y+=t.y,this._movingAnchorName=this._movingAnchorName.replace("top","bottom"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.height+=2*this.padding()}else if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf("bottom")>=0){const t=n.point({x:0,y:2*this.padding()});this._movingAnchorName=this._movingAnchorName.replace("bottom","top"),this._anchorDragOffset.x-=t.x,this._anchorDragOffset.y-=t.y,e.height+=2*this.padding()}if(this.boundBoxFunc()){const i=this.boundBoxFunc()(s,e);i?e=i:t.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!")}const r=1e7,a=new t.Transform;a.translate(s.x,s.y),a.rotate(s.rotation),a.scale(s.width/r,s.height/r);const l=new t.Transform,h=e.width/r,c=e.height/r;!1===this.flipEnabled()?(l.translate(e.x,e.y),l.rotate(e.rotation),l.translate(e.width<0?e.width:0,e.height<0?e.height:0),l.scale(Math.abs(h),Math.abs(c))):(l.translate(e.x,e.y),l.rotate(e.rotation),l.scale(h,c));const d=l.multiply(a.invert());this._nodes.forEach(e=>{var i;const s=e.getParent().getAbsoluteTransform(),n=e.getTransform().copy();n.translate(e.offsetX(),e.offsetY());const r=new t.Transform;r.multiply(s.copy().invert()).multiply(d).multiply(s).multiply(n);const o=r.decompose();e.setAttrs(o),null===(i=e.getLayer())||void 0===i||i.batchDraw()}),this.rotation(t.Util._getRotation(e.rotation)),this._nodes.forEach(t=>{this._fire("transform",{evt:i,target:t}),t._fire("transform",{evt:i,target:t})}),this._resetTransformCache(),this.update(),this.getLayer().batchDraw()}forceUpdate(){this._resetTransformCache(),this.update()}_batchChangeChild(t,e){this.findOne(t).setAttrs(e)}update(){var e;const i=this._getNodeRect();this.rotation(t.Util._getRotation(i.rotation));const s=i.width,n=i.height,r=this.enabledAnchors(),o=this.resizeEnabled(),a=this.padding(),l=this.anchorSize(),h=this.find("._anchor");h.forEach(t=>{t.setAttrs({width:l,height:l,offsetX:l/2,offsetY:l/2,stroke:this.anchorStroke(),strokeWidth:this.anchorStrokeWidth(),fill:this.anchorFill(),cornerRadius:this.anchorCornerRadius()})}),this._batchChangeChild(".top-left",{x:0,y:0,offsetX:l/2+a,offsetY:l/2+a,visible:o&&r.indexOf("top-left")>=0}),this._batchChangeChild(".top-center",{x:s/2,y:0,offsetY:l/2+a,visible:o&&r.indexOf("top-center")>=0}),this._batchChangeChild(".top-right",{x:s,y:0,offsetX:l/2-a,offsetY:l/2+a,visible:o&&r.indexOf("top-right")>=0}),this._batchChangeChild(".middle-left",{x:0,y:n/2,offsetX:l/2+a,visible:o&&r.indexOf("middle-left")>=0}),this._batchChangeChild(".middle-right",{x:s,y:n/2,offsetX:l/2-a,visible:o&&r.indexOf("middle-right")>=0}),this._batchChangeChild(".bottom-left",{x:0,y:n,offsetX:l/2+a,offsetY:l/2-a,visible:o&&r.indexOf("bottom-left")>=0}),this._batchChangeChild(".bottom-center",{x:s/2,y:n,offsetY:l/2-a,visible:o&&r.indexOf("bottom-center")>=0}),this._batchChangeChild(".bottom-right",{x:s,y:n,offsetX:l/2-a,offsetY:l/2-a,visible:o&&r.indexOf("bottom-right")>=0}),this._batchChangeChild(".rotater",{x:s/2,y:-this.rotateAnchorOffset()*t.Util._sign(n)-a,visible:this.rotateEnabled()}),this._batchChangeChild(".back",{width:s,height:n,visible:this.borderEnabled(),stroke:this.borderStroke(),strokeWidth:this.borderStrokeWidth(),dash:this.borderDash(),x:0,y:0});const c=this.anchorStyleFunc();c&&h.forEach(t=>{c(t)}),null===(e=this.getLayer())||void 0===e||e.batchDraw()}isTransforming(){return this._transforming}stopTransform(){if(this._transforming){this._removeEvents();const t=this.findOne("."+this._movingAnchorName);t&&t.stopDrag()}}destroy(){return this.getStage()&&this._cursorChange&&this.getStage().content&&(this.getStage().content.style.cursor=""),r.Group.prototype.destroy.call(this),this.detach(),this._removeEvents(),this}toObject(){return i.Node.prototype.toObject.call(this)}clone(t){return i.Node.prototype.clone.call(this,t)}getClientRect(){return this.nodes().length>0?super.getClientRect():{x:0,y:0,width:0,height:0}}};return Mr.Transformer=y,y.isTransforming=()=>v>0,y.prototype.className="Transformer",(0,l._registerNode)(y),e.Factory.addGetterSetter(y,"enabledAnchors",f,function(e){return e instanceof Array||t.Util.warn("enabledAnchors value should be an array"),e instanceof Array&&e.forEach(function(e){-1===f.indexOf(e)&&t.Util.warn("Unknown anchor name: "+e+". Available names are: "+f.join(", "))}),e||[]}),e.Factory.addGetterSetter(y,"flipEnabled",!0,(0,a.getBooleanValidator)()),e.Factory.addGetterSetter(y,"resizeEnabled",!0),e.Factory.addGetterSetter(y,"anchorSize",10,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"rotateEnabled",!0),e.Factory.addGetterSetter(y,"rotateLineVisible",!0),e.Factory.addGetterSetter(y,"rotationSnaps",[]),e.Factory.addGetterSetter(y,"rotateAnchorOffset",50,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"rotateAnchorCursor","crosshair"),e.Factory.addGetterSetter(y,"rotationSnapTolerance",5,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderEnabled",!0),e.Factory.addGetterSetter(y,"anchorStroke","rgb(0, 161, 255)"),e.Factory.addGetterSetter(y,"anchorStrokeWidth",1,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"anchorFill","white"),e.Factory.addGetterSetter(y,"anchorCornerRadius",0,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderStroke","rgb(0, 161, 255)"),e.Factory.addGetterSetter(y,"borderStrokeWidth",1,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"borderDash"),e.Factory.addGetterSetter(y,"keepRatio",!0),e.Factory.addGetterSetter(y,"shiftBehavior","default"),e.Factory.addGetterSetter(y,"centeredScaling",!1),e.Factory.addGetterSetter(y,"ignoreStroke",!1),e.Factory.addGetterSetter(y,"padding",0,(0,a.getNumberValidator)()),e.Factory.addGetterSetter(y,"nodes"),e.Factory.addGetterSetter(y,"node"),e.Factory.addGetterSetter(y,"boundBoxFunc"),e.Factory.addGetterSetter(y,"anchorDragBoundFunc"),e.Factory.addGetterSetter(y,"anchorStyleFunc"),e.Factory.addGetterSetter(y,"shouldOverdrawWholeArea",!1),e.Factory.addGetterSetter(y,"useSingleNodeRotation",!0),e.Factory.backCompat(y,{lineEnabled:"borderEnabled",rotateHandlerOffset:"rotateAnchorOffset",enabledHandlers:"enabledAnchors"}),Mr}var Ar,Lr={};var Tr,Fr={};function Rr(){if(Tr)return Fr;Tr=1,Object.defineProperty(Fr,"__esModule",{value:!0}),Fr.Blur=void 0;const t=vn(),e=yn(),i=mn();function s(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}const n=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],r=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];return Fr.Blur=function(t){const e=Math.round(this.blurRadius());e>0&&function(t,e){const i=t.data,o=t.width,a=t.height;let l,h,c,d,u,p,g,f,_,m,v,y,b,x,w,S,C,k,P,I;const $=e+e+1,M=o-1,E=a-1,A=e+1,L=A*(A+1)/2,T=new s,F=n[e],R=r[e];let D=null,N=T,O=null,U=null;for(let t=1;t<$;t++)N=N.next=new s,t===A&&(D=N);N.next=T,c=h=0;for(let t=0;t<a;t++){y=b=x=w=d=u=p=g=0,f=A*(S=i[h]),_=A*(C=i[h+1]),m=A*(k=i[h+2]),v=A*(P=i[h+3]),d+=L*S,u+=L*C,p+=L*k,g+=L*P,N=T;for(let t=0;t<A;t++)N.r=S,N.g=C,N.b=k,N.a=P,N=N.next;for(let t=1;t<A;t++)l=h+((M<t?M:t)<<2),d+=(N.r=S=i[l])*(I=A-t),u+=(N.g=C=i[l+1])*I,p+=(N.b=k=i[l+2])*I,g+=(N.a=P=i[l+3])*I,y+=S,b+=C,x+=k,w+=P,N=N.next;O=T,U=D;for(let t=0;t<o;t++)i[h+3]=P=g*F>>R,0!==P?(P=255/P,i[h]=(d*F>>R)*P,i[h+1]=(u*F>>R)*P,i[h+2]=(p*F>>R)*P):i[h]=i[h+1]=i[h+2]=0,d-=f,u-=_,p-=m,g-=v,f-=O.r,_-=O.g,m-=O.b,v-=O.a,l=c+((l=t+e+1)<M?l:M)<<2,y+=O.r=i[l],b+=O.g=i[l+1],x+=O.b=i[l+2],w+=O.a=i[l+3],d+=y,u+=b,p+=x,g+=w,O=O.next,f+=S=U.r,_+=C=U.g,m+=k=U.b,v+=P=U.a,y-=S,b-=C,x-=k,w-=P,U=U.next,h+=4;c+=o}for(let t=0;t<o;t++){b=x=w=y=u=p=g=d=0,h=t<<2,f=A*(S=i[h]),_=A*(C=i[h+1]),m=A*(k=i[h+2]),v=A*(P=i[h+3]),d+=L*S,u+=L*C,p+=L*k,g+=L*P,N=T;for(let t=0;t<A;t++)N.r=S,N.g=C,N.b=k,N.a=P,N=N.next;let s=o;for(let n=1;n<=e;n++)h=s+t<<2,d+=(N.r=S=i[h])*(I=A-n),u+=(N.g=C=i[h+1])*I,p+=(N.b=k=i[h+2])*I,g+=(N.a=P=i[h+3])*I,y+=S,b+=C,x+=k,w+=P,N=N.next,n<E&&(s+=o);h=t,O=T,U=D;for(let e=0;e<a;e++)l=h<<2,i[l+3]=P=g*F>>R,P>0?(P=255/P,i[l]=(d*F>>R)*P,i[l+1]=(u*F>>R)*P,i[l+2]=(p*F>>R)*P):i[l]=i[l+1]=i[l+2]=0,d-=f,u-=_,p-=m,g-=v,f-=O.r,_-=O.g,m-=O.b,v-=O.a,l=t+((l=e+A)<E?l:E)*o<<2,d+=y+=O.r=i[l],u+=b+=O.g=i[l+1],p+=x+=O.b=i[l+2],g+=w+=O.a=i[l+3],O=O.next,f+=S=U.r,_+=C=U.g,m+=k=U.b,v+=P=U.a,y-=S,b-=C,x-=k,w-=P,U=U.next,h+=o}}(t,e)},t.Factory.addGetterSetter(e.Node,"blurRadius",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Fr}var Dr,Nr={};var Or,Ur={};var Gr,zr={};var Br,Wr={};var Vr,Hr={};var jr,qr={};var Kr,Yr={};var Xr,Zr={};var Jr,Qr={};function to(){if(Jr)return Qr;Jr=1,Object.defineProperty(Qr,"__esModule",{value:!0}),Qr.Kaleidoscope=void 0;const t=vn(),e=yn(),i=tn(),s=mn();return Qr.Kaleidoscope=function(t){const e=t.width,s=t.height;let n,r,o,a,l,h,c,d,u,p,g=Math.round(this.kaleidoscopePower());const f=Math.round(this.kaleidoscopeAngle()),_=Math.floor(e*(f%360)/360);if(g<1)return;const m=i.Util.createCanvasElement();m.width=e,m.height=s;const v=m.getContext("2d").getImageData(0,0,e,s);i.Util.releaseCanvas(m),function(t,e,i){const s=t.data,n=e.data,r=t.width,o=t.height,a=i.polarCenterX||r/2,l=i.polarCenterY||o/2;let h=Math.sqrt(a*a+l*l),c=r-a,d=o-l;const u=Math.sqrt(c*c+d*d);h=u>h?u:h;const p=o,g=r,f=360/g*Math.PI/180;for(let t=0;t<g;t+=1){const e=Math.sin(t*f),i=Math.cos(t*f);for(let o=0;o<p;o+=1){c=Math.floor(a+h*o/p*i),d=Math.floor(l+h*o/p*e);let u=4*(d*r+c);const g=s[u+0],f=s[u+1],_=s[u+2],m=s[u+3];u=4*(t+o*r),n[u+0]=g,n[u+1]=f,n[u+2]=_,n[u+3]=m}}}(t,v,{polarCenterX:e/2,polarCenterY:s/2});let y=e/Math.pow(2,g);for(;y<=8;)y*=2,g-=1;y=Math.ceil(y);let b=y,x=0,w=b,S=1;for(_+y>e&&(x=b,w=0,S=-1),r=0;r<s;r+=1)for(n=x;n!==w;n+=S)o=Math.round(n+_)%e,u=4*(e*r+o),l=v.data[u+0],h=v.data[u+1],c=v.data[u+2],d=v.data[u+3],p=4*(e*r+n),v.data[p+0]=l,v.data[p+1]=h,v.data[p+2]=c,v.data[p+3]=d;for(r=0;r<s;r+=1)for(b=Math.floor(y),a=0;a<g;a+=1){for(n=0;n<b+1;n+=1)u=4*(e*r+n),l=v.data[u+0],h=v.data[u+1],c=v.data[u+2],d=v.data[u+3],p=4*(e*r+2*b-n-1),v.data[p+0]=l,v.data[p+1]=h,v.data[p+2]=c,v.data[p+3]=d;b*=2}!function(t,e,i){const s=t.data,n=e.data,r=t.width,o=t.height,a=i.polarCenterX||r/2,l=i.polarCenterY||o/2;let h=Math.sqrt(a*a+l*l),c=r-a,d=o-l;const u=Math.sqrt(c*c+d*d);h=u>h?u:h;const p=o,g=r;let f,_;for(c=0;c<r;c+=1)for(d=0;d<o;d+=1){const t=c-a,e=d-l,i=Math.sqrt(t*t+e*e)*p/h;let o=(180*Math.atan2(e,t)/Math.PI+360+0)%360;o=o*g/360,f=Math.floor(o),_=Math.floor(i);let u=4*(_*r+f);const m=s[u+0],v=s[u+1],y=s[u+2],b=s[u+3];u=4*(d*r+c),n[u+0]=m,n[u+1]=v,n[u+2]=y,n[u+3]=b}}(v,t,{})},t.Factory.addGetterSetter(e.Node,"kaleidoscopePower",2,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"kaleidoscopeAngle",0,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),Qr}var eo,io={};function so(){if(eo)return io;eo=1,Object.defineProperty(io,"__esModule",{value:!0}),io.Mask=void 0;const t=vn(),e=yn(),i=mn();function s(t,e,i){let s=4*(i*t.width+e);const n=[];return n.push(t.data[s++],t.data[s++],t.data[s++],t.data[s++]),n}function n(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)+Math.pow(t[2]-e[2],2))}return io.Mask=function(t){let e=function(t,e){const i=s(t,0,0),r=s(t,t.width-1,0),o=s(t,0,t.height-1),a=s(t,t.width-1,t.height-1),l=e||10;if(n(i,r)<l&&n(r,a)<l&&n(a,o)<l&&n(o,i)<l){const e=function(t){const e=[0,0,0];for(let i=0;i<t.length;i++)e[0]+=t[i][0],e[1]+=t[i][1],e[2]+=t[i][2];return e[0]/=t.length,e[1]/=t.length,e[2]/=t.length,e}([r,i,a,o]),s=[];for(let i=0;i<t.width*t.height;i++){const r=n(e,[t.data[4*i],t.data[4*i+1],t.data[4*i+2]]);s[i]=r<l?0:255}return s}}(t,this.threshold());return e&&(e=function(t,e,i){const s=[1,1,1,1,0,1,1,1,1],n=Math.round(Math.sqrt(s.length)),r=Math.floor(n/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<n;o++)for(let h=0;h<n;h++){const d=a+o-r,u=l+h-r;if(d>=0&&d<i&&u>=0&&u<e){const i=s[o*n+h];c+=t[d*e+u]*i}}o[h]=2040===c?255:0}return o}(e,t.width,t.height),e=function(t,e,i){const s=[1,1,1,1,1,1,1,1,1],n=Math.round(Math.sqrt(s.length)),r=Math.floor(n/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<n;o++)for(let h=0;h<n;h++){const d=a+o-r,u=l+h-r;if(d>=0&&d<i&&u>=0&&u<e){const i=s[o*n+h];c+=t[d*e+u]*i}}o[h]=c>=1020?255:0}return o}(e,t.width,t.height),e=function(t,e,i){const s=[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],n=Math.round(Math.sqrt(s.length)),r=Math.floor(n/2),o=[];for(let a=0;a<i;a++)for(let l=0;l<e;l++){const h=a*e+l;let c=0;for(let o=0;o<n;o++)for(let h=0;h<n;h++){const d=a+o-r,u=l+h-r;if(d>=0&&d<i&&u>=0&&u<e){const i=s[o*n+h];c+=t[d*e+u]*i}}o[h]=c}return o}(e,t.width,t.height),function(t,e){for(let i=0;i<t.width*t.height;i++)t.data[4*i+3]=e[i]}(t,e)),t},t.Factory.addGetterSetter(e.Node,"threshold",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),io}var no,ro={};var oo,ao={};var lo,ho={};var co,uo={};var po,go={};var fo,_o={};var mo,vo={};var yo,bo,xo={};function wo(){if(bo)return Ks;bo=1,Object.defineProperty(Ks,"__esModule",{value:!0}),Ks.Konva=void 0;const t=Hn(),e=function(){if(jn)return qn;jn=1,Object.defineProperty(qn,"__esModule",{value:!0}),qn.Arc=void 0;const t=vn(),e=Ln(),i=Zs(),s=mn(),n=Zs();let r=class extends e.Shape{_sceneFunc(t){const e=i.Konva.getAngle(this.angle()),s=this.clockwise();t.beginPath(),t.arc(0,0,this.outerRadius(),0,e,s),t.arc(0,0,this.innerRadius(),e,0,!s),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}getSelfRect(){const t=this.innerRadius(),e=this.outerRadius(),s=this.clockwise(),n=i.Konva.getAngle(s?360-this.angle():this.angle()),r=Math.cos(Math.min(n,Math.PI)),o=Math.sin(Math.min(Math.max(Math.PI,n),3*Math.PI/2)),a=Math.sin(Math.min(n,Math.PI/2)),l=r*(r>0?t:e),h=o*(o>0?t:e),c=a*(a>0?e:t);return{x:l,y:s?-1*c:h,width:1*e-l,height:c-h}}};return qn.Arc=r,r.prototype._centroid=!0,r.prototype.className="Arc",r.prototype._attrsAffectingSize=["innerRadius","outerRadius","angle","clockwise"],(0,n._registerNode)(r),t.Factory.addGetterSetter(r,"innerRadius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"outerRadius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"angle",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"clockwise",!1,(0,s.getBooleanValidator)()),qn}(),i=function(){if(tr)return Yn;tr=1,Object.defineProperty(Yn,"__esModule",{value:!0}),Yn.Arrow=void 0;const t=vn(),e=Zn(),i=mn(),s=Zs(),n=sr();let r=class extends e.Line{_sceneFunc(t){super._sceneFunc(t);const e=2*Math.PI,i=this.points();let s=i;const r=0!==this.tension()&&i.length>4;r&&(s=this.getTensionPoints());const o=this.pointerLength(),a=i.length;let l,h;if(r){const t=[s[s.length-4],s[s.length-3],s[s.length-2],s[s.length-1],i[a-2],i[a-1]],e=n.Path.calcLength(s[s.length-4],s[s.length-3],"C",t),r=n.Path.getPointOnQuadraticBezier(Math.min(1,1-o/e),t[0],t[1],t[2],t[3],t[4],t[5]);l=i[a-2]-r.x,h=i[a-1]-r.y}else l=i[a-2]-i[a-4],h=i[a-1]-i[a-3];const c=(Math.atan2(h,l)+e)%e,d=this.pointerWidth();this.pointerAtEnding()&&(t.save(),t.beginPath(),t.translate(i[a-2],i[a-1]),t.rotate(c),t.moveTo(0,0),t.lineTo(-o,d/2),t.lineTo(-o,-d/2),t.closePath(),t.restore(),this.__fillStroke(t)),this.pointerAtBeginning()&&(t.save(),t.beginPath(),t.translate(i[0],i[1]),r?(l=(s[0]+s[2])/2-i[0],h=(s[1]+s[3])/2-i[1]):(l=i[2]-i[0],h=i[3]-i[1]),t.rotate((Math.atan2(-h,-l)+e)%e),t.moveTo(0,0),t.lineTo(-o,d/2),t.lineTo(-o,-d/2),t.closePath(),t.restore(),this.__fillStroke(t))}__fillStroke(t){const e=this.dashEnabled();e&&(this.attrs.dashEnabled=!1,t.setLineDash([])),t.fillStrokeShape(this),e&&(this.attrs.dashEnabled=!0)}getSelfRect(){const t=super.getSelfRect(),e=this.pointerWidth()/2;return{x:t.x,y:t.y-e,width:t.width,height:t.height+2*e}}};return Yn.Arrow=r,r.prototype.className="Arrow",(0,s._registerNode)(r),t.Factory.addGetterSetter(r,"pointerLength",10,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"pointerWidth",10,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"pointerAtBeginning",!1),t.Factory.addGetterSetter(r,"pointerAtEnding",!0),Yn}(),s=function(){if(nr)return rr;nr=1,Object.defineProperty(rr,"__esModule",{value:!0}),rr.Circle=void 0;const t=vn(),e=Ln(),i=mn(),s=Zs();let n=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.attrs.radius||0,0,2*Math.PI,!1),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius()!==t/2&&this.radius(t/2)}setHeight(t){this.radius()!==t/2&&this.radius(t/2)}};return rr.Circle=n,n.prototype._centroid=!0,n.prototype.className="Circle",n.prototype._attrsAffectingSize=["radius"],(0,s._registerNode)(n),t.Factory.addGetterSetter(n,"radius",0,(0,i.getNumberValidator)()),rr}(),n=function(){if(or)return ar;or=1,Object.defineProperty(ar,"__esModule",{value:!0}),ar.Ellipse=void 0;const t=vn(),e=Ln(),i=mn(),s=Zs();let n=class extends e.Shape{_sceneFunc(t){const e=this.radiusX(),i=this.radiusY();t.beginPath(),t.save(),e!==i&&t.scale(1,i/e),t.arc(0,0,e,0,2*Math.PI,!1),t.restore(),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radiusX()}getHeight(){return 2*this.radiusY()}setWidth(t){this.radiusX(t/2)}setHeight(t){this.radiusY(t/2)}};return ar.Ellipse=n,n.prototype.className="Ellipse",n.prototype._centroid=!0,n.prototype._attrsAffectingSize=["radiusX","radiusY"],(0,s._registerNode)(n),t.Factory.addComponentsGetterSetter(n,"radius",["x","y"]),t.Factory.addGetterSetter(n,"radiusX",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"radiusY",0,(0,i.getNumberValidator)()),ar}(),r=function(){if(lr)return hr;lr=1,Object.defineProperty(hr,"__esModule",{value:!0}),hr.Image=void 0;const t=tn(),e=vn(),i=Ln(),s=Zs(),n=mn();class r extends i.Shape{constructor(t){super(t),this._loadListener=()=>{this._requestDraw()},this.on("imageChange.konva",t=>{this._removeImageLoad(t.oldVal),this._setImageLoad()}),this._setImageLoad()}_setImageLoad(){const t=this.image();t&&t.complete||t&&4===t.readyState||t&&t.addEventListener&&t.addEventListener("load",this._loadListener)}_removeImageLoad(t){t&&t.removeEventListener&&t.removeEventListener("load",this._loadListener)}destroy(){return this._removeImageLoad(this.image()),super.destroy(),this}_useBufferCanvas(){const t=!!this.cornerRadius(),e=this.hasShadow();return!(!t||!e)||super._useBufferCanvas(!0)}_sceneFunc(e){const i=this.getWidth(),s=this.getHeight(),n=this.cornerRadius(),r=this.attrs.image;let o;if(r){const t=this.attrs.cropWidth,e=this.attrs.cropHeight;o=t&&e?[r,this.cropX(),this.cropY(),t,e,0,0,i,s]:[r,0,0,i,s]}(this.hasFill()||this.hasStroke()||n)&&(e.beginPath(),n?t.Util.drawRoundedRectPath(e,i,s,n):e.rect(0,0,i,s),e.closePath(),e.fillStrokeShape(this)),r&&(n&&e.clip(),e.drawImage.apply(e,o))}_hitFunc(e){const i=this.width(),s=this.height(),n=this.cornerRadius();e.beginPath(),n?t.Util.drawRoundedRectPath(e,i,s,n):e.rect(0,0,i,s),e.closePath(),e.fillStrokeShape(this)}getWidth(){var t,e;return null!==(t=this.attrs.width)&&void 0!==t?t:null===(e=this.image())||void 0===e?void 0:e.width}getHeight(){var t,e;return null!==(t=this.attrs.height)&&void 0!==t?t:null===(e=this.image())||void 0===e?void 0:e.height}static fromURL(e,i,s=null){const n=t.Util.createImageElement();n.onload=function(){const t=new r({image:n});i(t)},n.onerror=s,n.crossOrigin="Anonymous",n.src=e}}return hr.Image=r,r.prototype.className="Image",(0,s._registerNode)(r),e.Factory.addGetterSetter(r,"cornerRadius",0,(0,n.getNumberOrArrayOfNumbersValidator)(4)),e.Factory.addGetterSetter(r,"image"),e.Factory.addComponentsGetterSetter(r,"crop",["x","y","width","height"]),e.Factory.addGetterSetter(r,"cropX",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(r,"cropY",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(r,"cropWidth",0,(0,n.getNumberValidator)()),e.Factory.addGetterSetter(r,"cropHeight",0,(0,n.getNumberValidator)()),hr}(),o=function(){if(cr)return dr;cr=1,Object.defineProperty(dr,"__esModule",{value:!0}),dr.Tag=dr.Label=void 0;const t=vn(),e=Ln(),i=On(),s=mn(),n=Zs(),r=["fontFamily","fontSize","fontStyle","padding","lineHeight","text","width","height","pointerDirection","pointerWidth","pointerHeight"],o="up",a="right",l="down",h="left",c=r.length;let d=class extends i.Group{constructor(t){super(t),this.on("add.konva",function(t){this._addListeners(t.child),this._sync()})}getText(){return this.find("Text")[0]}getTag(){return this.find("Tag")[0]}_addListeners(t){let e,i=this;const s=function(){i._sync()};for(e=0;e<c;e++)t.on(r[e]+"Change.konva",s)}getWidth(){return this.getText().width()}getHeight(){return this.getText().height()}_sync(){let t,e,i,s,n,r,c,d=this.getText(),u=this.getTag();if(d&&u){switch(t=d.width(),e=d.height(),i=u.pointerDirection(),s=u.pointerWidth(),c=u.pointerHeight(),n=0,r=0,i){case o:n=t/2,r=-1*c;break;case a:n=t+s,r=e/2;break;case l:n=t/2,r=e+c;break;case h:n=-1*s,r=e/2}u.setAttrs({x:-1*n,y:-1*r,width:t,height:e}),d.setAttrs({x:-1*n,y:-1*r})}}};dr.Label=d,d.prototype.className="Label",(0,n._registerNode)(d);class u extends e.Shape{_sceneFunc(t){const e=this.width(),i=this.height(),s=this.pointerDirection(),n=this.pointerWidth(),r=this.pointerHeight(),c=this.cornerRadius();let d=0,u=0,p=0,g=0;"number"==typeof c?d=u=p=g=Math.min(c,e/2,i/2):(d=Math.min(c[0]||0,e/2,i/2),u=Math.min(c[1]||0,e/2,i/2),g=Math.min(c[2]||0,e/2,i/2),p=Math.min(c[3]||0,e/2,i/2)),t.beginPath(),t.moveTo(d,0),s===o&&(t.lineTo((e-n)/2,0),t.lineTo(e/2,-1*r),t.lineTo((e+n)/2,0)),t.lineTo(e-u,0),t.arc(e-u,u,u,3*Math.PI/2,0,!1),s===a&&(t.lineTo(e,(i-r)/2),t.lineTo(e+n,i/2),t.lineTo(e,(i+r)/2)),t.lineTo(e,i-g),t.arc(e-g,i-g,g,0,Math.PI/2,!1),s===l&&(t.lineTo((e+n)/2,i),t.lineTo(e/2,i+r),t.lineTo((e-n)/2,i)),t.lineTo(p,i),t.arc(p,i-p,p,Math.PI/2,Math.PI,!1),s===h&&(t.lineTo(0,(i+r)/2),t.lineTo(-1*n,i/2),t.lineTo(0,(i-r)/2)),t.lineTo(0,d),t.arc(d,d,d,Math.PI,3*Math.PI/2,!1),t.closePath(),t.fillStrokeShape(this)}getSelfRect(){let t=0,e=0,i=this.pointerWidth(),s=this.pointerHeight(),n=this.pointerDirection(),r=this.width(),c=this.height();return n===o?(e-=s,c+=s):n===l?c+=s:n===h?(t-=1.5*i,r+=i):n===a&&(r+=1.5*i),{x:t,y:e,width:r,height:c}}}return dr.Tag=u,u.prototype.className="Tag",(0,n._registerNode)(u),t.Factory.addGetterSetter(u,"pointerDirection","none"),t.Factory.addGetterSetter(u,"pointerWidth",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(u,"pointerHeight",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(u,"cornerRadius",0,(0,s.getNumberOrArrayOfNumbersValidator)(4)),dr}(),a=Zn(),l=sr(),h=gr(),c=function(){if(fr)return _r;fr=1,Object.defineProperty(_r,"__esModule",{value:!0}),_r.RegularPolygon=void 0;const t=vn(),e=Ln(),i=mn(),s=Zs();let n=class extends e.Shape{_sceneFunc(t){const e=this._getPoints();t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i++)t.lineTo(e[i].x,e[i].y);t.closePath(),t.fillStrokeShape(this)}_getPoints(){const t=this.attrs.sides,e=this.attrs.radius||0,i=[];for(let s=0;s<t;s++)i.push({x:e*Math.sin(2*s*Math.PI/t),y:-1*e*Math.cos(2*s*Math.PI/t)});return i}getSelfRect(){const t=this._getPoints();let e=t[0].x,i=t[0].y,s=t[0].x,n=t[0].y;return t.forEach(t=>{e=Math.min(e,t.x),i=Math.max(i,t.x),s=Math.min(s,t.y),n=Math.max(n,t.y)}),{x:e,y:s,width:i-e,height:n-s}}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius(t/2)}setHeight(t){this.radius(t/2)}};return _r.RegularPolygon=n,n.prototype.className="RegularPolygon",n.prototype._centroid=!0,n.prototype._attrsAffectingSize=["radius"],(0,s._registerNode)(n),t.Factory.addGetterSetter(n,"radius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"sides",0,(0,i.getNumberValidator)()),_r}(),d=function(){if(mr)return vr;mr=1,Object.defineProperty(vr,"__esModule",{value:!0}),vr.Ring=void 0;const t=vn(),e=Ln(),i=mn(),s=Zs(),n=2*Math.PI;let r=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.innerRadius(),0,n,!1),t.moveTo(this.outerRadius(),0),t.arc(0,0,this.outerRadius(),n,0,!0),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}};return vr.Ring=r,r.prototype.className="Ring",r.prototype._centroid=!0,r.prototype._attrsAffectingSize=["innerRadius","outerRadius"],(0,s._registerNode)(r),t.Factory.addGetterSetter(r,"innerRadius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(r,"outerRadius",0,(0,i.getNumberValidator)()),vr}(),u=function(){if(yr)return br;yr=1,Object.defineProperty(br,"__esModule",{value:!0}),br.Sprite=void 0;const t=vn(),e=Ln(),i=zn(),s=mn(),n=Zs();let r=class extends e.Shape{constructor(t){super(t),this._updated=!0,this.anim=new i.Animation(()=>{const t=this._updated;return this._updated=!1,t}),this.on("animationChange.konva",function(){this.frameIndex(0)}),this.on("frameIndexChange.konva",function(){this._updated=!0}),this.on("frameRateChange.konva",function(){this.anim.isRunning()&&(clearInterval(this.interval),this._setInterval())})}_sceneFunc(t){const e=this.animation(),i=this.frameIndex(),s=4*i,n=this.animations()[e],r=this.frameOffsets(),o=n[s+0],a=n[s+1],l=n[s+2],h=n[s+3],c=this.image();if((this.hasFill()||this.hasStroke())&&(t.beginPath(),t.rect(0,0,l,h),t.closePath(),t.fillStrokeShape(this)),c)if(r){const s=r[e],n=2*i;t.drawImage(c,o,a,l,h,s[n+0],s[n+1],l,h)}else t.drawImage(c,o,a,l,h,0,0,l,h)}_hitFunc(t){const e=this.animation(),i=this.frameIndex(),s=4*i,n=this.animations()[e],r=this.frameOffsets(),o=n[s+2],a=n[s+3];if(t.beginPath(),r){const s=r[e],n=2*i;t.rect(s[n+0],s[n+1],o,a)}else t.rect(0,0,o,a);t.closePath(),t.fillShape(this)}_useBufferCanvas(){return super._useBufferCanvas(!0)}_setInterval(){const t=this;this.interval=setInterval(function(){t._updateIndex()},1e3/this.frameRate())}start(){if(this.isRunning())return;const t=this.getLayer();this.anim.setLayers(t),this._setInterval(),this.anim.start()}stop(){this.anim.stop(),clearInterval(this.interval)}isRunning(){return this.anim.isRunning()}_updateIndex(){const t=this.frameIndex(),e=this.animation();t<this.animations()[e].length/4-1?this.frameIndex(t+1):this.frameIndex(0)}};return br.Sprite=r,r.prototype.className="Sprite",(0,n._registerNode)(r),t.Factory.addGetterSetter(r,"animation"),t.Factory.addGetterSetter(r,"animations"),t.Factory.addGetterSetter(r,"frameOffsets"),t.Factory.addGetterSetter(r,"image"),t.Factory.addGetterSetter(r,"frameIndex",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"frameRate",17,(0,s.getNumberValidator)()),t.Factory.backCompat(r,{index:"frameIndex",getIndex:"getFrameIndex",setIndex:"setFrameIndex"}),br}(),p=function(){if(xr)return wr;xr=1,Object.defineProperty(wr,"__esModule",{value:!0}),wr.Star=void 0;const t=vn(),e=Ln(),i=mn(),s=Zs();let n=class extends e.Shape{_sceneFunc(t){const e=this.innerRadius(),i=this.outerRadius(),s=this.numPoints();t.beginPath(),t.moveTo(0,0-i);for(let n=1;n<2*s;n++){const r=n%2==0?i:e,o=r*Math.sin(n*Math.PI/s),a=-1*r*Math.cos(n*Math.PI/s);t.lineTo(o,a)}t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.outerRadius()}getHeight(){return 2*this.outerRadius()}setWidth(t){this.outerRadius(t/2)}setHeight(t){this.outerRadius(t/2)}};return wr.Star=n,n.prototype.className="Star",n.prototype._centroid=!0,n.prototype._attrsAffectingSize=["innerRadius","outerRadius"],(0,s._registerNode)(n),t.Factory.addGetterSetter(n,"numPoints",5,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"innerRadius",0,(0,i.getNumberValidator)()),t.Factory.addGetterSetter(n,"outerRadius",0,(0,i.getNumberValidator)()),wr}(),g=kr(),f=function(){if(Pr)return Ir;Pr=1,Object.defineProperty(Ir,"__esModule",{value:!0}),Ir.TextPath=void 0;const t=tn(),e=vn(),i=Ln(),s=sr(),n=kr(),r=mn(),o=Zs(),a="normal";function l(t){t.fillText(this.partialText,0,0)}function h(t){t.strokeText(this.partialText,0,0)}let c=class extends i.Shape{constructor(e){super(e),this.dummyCanvas=t.Util.createCanvasElement(),this.dataArray=[],this._readDataAttribute(),this.on("dataChange.konva",function(){this._readDataAttribute(),this._setTextData()}),this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva",this._setTextData),this._setTextData()}_getTextPathLength(){return s.Path.getPathLength(this.dataArray)}_getPointAtLength(t){return this.attrs.data?t-1>this.pathLength?null:s.Path.getPointAtLengthOfDataArray(t,this.dataArray):null}_readDataAttribute(){this.dataArray=s.Path.parsePathData(this.attrs.data),this.pathLength=this._getTextPathLength()}_sceneFunc(t){t.setAttr("font",this._getContextFont()),t.setAttr("textBaseline",this.textBaseline()),t.setAttr("textAlign","left"),t.save();const e=this.textDecoration(),i=this.fill(),s=this.fontSize(),n=this.glyphInfo;"underline"===e&&t.beginPath();for(let i=0;i<n.length;i++){t.save();const r=n[i].p0;t.translate(r.x,r.y),t.rotate(n[i].rotation),this.partialText=n[i].text,t.fillStrokeShape(this),"underline"===e&&(0===i&&t.moveTo(0,s/2+1),t.lineTo(s,s/2+1)),t.restore()}"underline"===e&&(t.strokeStyle=i,t.lineWidth=s/20,t.stroke()),t.restore()}_hitFunc(t){t.beginPath();const e=this.glyphInfo;if(e.length>=1){const i=e[0].p0;t.moveTo(i.x,i.y)}for(let i=0;i<e.length;i++){const s=e[i].p1;t.lineTo(s.x,s.y)}t.setAttr("lineWidth",this.fontSize()),t.setAttr("strokeStyle",this.colorKey),t.stroke()}getTextWidth(){return this.textWidth}getTextHeight(){return t.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),this.textHeight}setText(t){return n.Text.prototype.setText.call(this,t)}_getContextFont(){return n.Text.prototype._getContextFont.call(this)}_getTextSize(t){const e=this.dummyCanvas.getContext("2d");e.save(),e.font=this._getContextFont();const i=e.measureText(t);return e.restore(),{width:i.width,height:parseInt(`${this.fontSize()}`,10)}}_setTextData(){const{width:t,height:e}=this._getTextSize(this.attrs.text);if(this.textWidth=t,this.textHeight=e,this.glyphInfo=[],!this.attrs.data)return null;const i=this.letterSpacing(),r=this.align(),o=this.kerningFunc(),a=Math.max(this.textWidth+((this.attrs.text||"").length-1)*i,0);let l=0;"center"===r&&(l=Math.max(0,this.pathLength/2-a/2)),"right"===r&&(l=Math.max(0,this.pathLength-a));const h=(0,n.stringToArray)(this.text());let c=l;for(let t=0;t<h.length;t++){const e=this._getPointAtLength(c);if(!e)return;let n=this._getTextSize(h[t]).width+i;if(" "===h[t]&&"justify"===r){const t=this.text().split(" ").length-1;n+=(this.pathLength-a)/t}const l=this._getPointAtLength(c+n);if(!l)return;const d=s.Path.getLineLength(e.x,e.y,l.x,l.y);let u=0;if(o)try{u=o(h[t-1],h[t])*this.fontSize()}catch(t){u=0}e.x+=u,l.x+=u,this.textWidth+=u;const p=s.Path.getPointOnLine(u+d/2,e.x,e.y,l.x,l.y),g=Math.atan2(l.y-e.y,l.x-e.x);this.glyphInfo.push({transposeX:p.x,transposeY:p.y,text:h[t],rotation:g,p0:e,p1:l}),c+=n}}getSelfRect(){if(!this.glyphInfo.length)return{x:0,y:0,width:0,height:0};const t=[];this.glyphInfo.forEach(function(e){t.push(e.p0.x),t.push(e.p0.y),t.push(e.p1.x),t.push(e.p1.y)});let e,i,s=t[0]||0,n=t[0]||0,r=t[1]||0,o=t[1]||0;for(let a=0;a<t.length/2;a++)e=t[2*a],i=t[2*a+1],s=Math.min(s,e),n=Math.max(n,e),r=Math.min(r,i),o=Math.max(o,i);const a=this.fontSize();return{x:s-a/2,y:r-a/2,width:n-s+a,height:o-r+a}}destroy(){return t.Util.releaseCanvas(this.dummyCanvas),super.destroy()}};return Ir.TextPath=c,c.prototype._fillFunc=l,c.prototype._strokeFunc=h,c.prototype._fillFuncHit=l,c.prototype._strokeFuncHit=h,c.prototype.className="TextPath",c.prototype._attrsAffectingSize=["text","fontSize","data"],(0,o._registerNode)(c),e.Factory.addGetterSetter(c,"data"),e.Factory.addGetterSetter(c,"fontFamily","Arial"),e.Factory.addGetterSetter(c,"fontSize",12,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(c,"fontStyle",a),e.Factory.addGetterSetter(c,"align","left"),e.Factory.addGetterSetter(c,"letterSpacing",0,(0,r.getNumberValidator)()),e.Factory.addGetterSetter(c,"textBaseline","middle"),e.Factory.addGetterSetter(c,"fontVariant",a),e.Factory.addGetterSetter(c,"text",""),e.Factory.addGetterSetter(c,"textDecoration",""),e.Factory.addGetterSetter(c,"kerningFunc",void 0),Ir}(),_=Er(),m=function(){if(Ar)return Lr;Ar=1,Object.defineProperty(Lr,"__esModule",{value:!0}),Lr.Wedge=void 0;const t=vn(),e=Ln(),i=Zs(),s=mn(),n=Zs();let r=class extends e.Shape{_sceneFunc(t){t.beginPath(),t.arc(0,0,this.radius(),0,i.Konva.getAngle(this.angle()),this.clockwise()),t.lineTo(0,0),t.closePath(),t.fillStrokeShape(this)}getWidth(){return 2*this.radius()}getHeight(){return 2*this.radius()}setWidth(t){this.radius(t/2)}setHeight(t){this.radius(t/2)}};return Lr.Wedge=r,r.prototype.className="Wedge",r.prototype._centroid=!0,r.prototype._attrsAffectingSize=["radius"],(0,n._registerNode)(r),t.Factory.addGetterSetter(r,"radius",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"angle",0,(0,s.getNumberValidator)()),t.Factory.addGetterSetter(r,"clockwise",!1),t.Factory.backCompat(r,{angleDeg:"angle",getAngleDeg:"getAngle",setAngleDeg:"setAngle"}),Lr}(),v=Rr(),y=function(){if(Dr)return Nr;Dr=1,Object.defineProperty(Nr,"__esModule",{value:!0}),Nr.Brighten=void 0;const t=vn(),e=yn(),i=mn();return Nr.Brighten=function(t){const e=255*this.brightness(),i=t.data,s=i.length;for(let t=0;t<s;t+=4)i[t]+=e,i[t+1]+=e,i[t+2]+=e},t.Factory.addGetterSetter(e.Node,"brightness",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Nr}(),b=function(){if(Or)return Ur;Or=1,Object.defineProperty(Ur,"__esModule",{value:!0}),Ur.Contrast=void 0;const t=vn(),e=yn(),i=mn();return Ur.Contrast=function(t){const e=Math.pow((this.contrast()+100)/100,2),i=t.data,s=i.length;let n=150,r=150,o=150;for(let t=0;t<s;t+=4)n=i[t],r=i[t+1],o=i[t+2],n/=255,n-=.5,n*=e,n+=.5,n*=255,r/=255,r-=.5,r*=e,r+=.5,r*=255,o/=255,o-=.5,o*=e,o+=.5,o*=255,n=n<0?0:n>255?255:n,r=r<0?0:r>255?255:r,o=o<0?0:o>255?255:o,i[t]=n,i[t+1]=r,i[t+2]=o},t.Factory.addGetterSetter(e.Node,"contrast",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Ur}(),x=function(){if(Gr)return zr;Gr=1,Object.defineProperty(zr,"__esModule",{value:!0}),zr.Emboss=void 0;const t=vn(),e=yn(),i=tn(),s=mn();return zr.Emboss=function(t){const e=10*this.embossStrength(),s=255*this.embossWhiteLevel(),n=this.embossDirection(),r=this.embossBlend(),o=t.data,a=t.width,l=t.height,h=4*a;let c=0,d=0,u=l;switch(n){case"top-left":c=-1,d=-1;break;case"top":c=-1,d=0;break;case"top-right":c=-1,d=1;break;case"right":c=0,d=1;break;case"bottom-right":c=1,d=1;break;case"bottom":c=1,d=0;break;case"bottom-left":c=1,d=-1;break;case"left":c=0,d=-1;break;default:i.Util.error("Unknown emboss direction: "+n)}do{const t=(u-1)*h;let i=c;u+i<1&&(i=0),u+i>l&&(i=0);const n=(u-1+i)*a*4;let p=a;do{const i=t+4*(p-1);let l=d;p+l<1&&(l=0),p+l>a&&(l=0);const h=n+4*(p-1+l),c=o[i]-o[h],u=o[i+1]-o[h+1],g=o[i+2]-o[h+2];let f=c;const _=f>0?f:-f;if((u>0?u:-u)>_&&(f=u),(g>0?g:-g)>_&&(f=g),f*=e,r){const t=o[i]+f,e=o[i+1]+f,s=o[i+2]+f;o[i]=t>255?255:t<0?0:t,o[i+1]=e>255?255:e<0?0:e,o[i+2]=s>255?255:s<0?0:s}else{let t=s-f;t<0?t=0:t>255&&(t=255),o[i]=o[i+1]=o[i+2]=t}}while(--p)}while(--u)},t.Factory.addGetterSetter(e.Node,"embossStrength",.5,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossWhiteLevel",.5,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossDirection","top-left",void 0,t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"embossBlend",!1,void 0,t.Factory.afterSetFilter),zr}(),w=function(){if(Br)return Wr;Br=1,Object.defineProperty(Wr,"__esModule",{value:!0}),Wr.Enhance=void 0;const t=vn(),e=yn(),i=mn();function s(t,e,i,s,n){const r=i-e,o=n-s;if(0===r)return s+o/2;if(0===o)return s;let a=(t-e)/r;return a=o*a+s,a}return Wr.Enhance=function(t){const e=t.data,i=e.length;let n,r,o,a=e[0],l=a,h=e[1],c=h,d=e[2],u=d;const p=this.enhance();if(0===p)return;for(let t=0;t<i;t+=4)n=e[t+0],n<a?a=n:n>l&&(l=n),r=e[t+1],r<h?h=r:r>c&&(c=r),o=e[t+2],o<d?d=o:o>u&&(u=o);let g,f,_,m,v,y;if(l===a&&(l=255,a=0),c===h&&(c=255,h=0),u===d&&(u=255,d=0),p>0)g=l+p*(255-l),f=a-p*(a-0),_=c+p*(255-c),m=h-p*(h-0),v=u+p*(255-u),y=d-p*(d-0);else{const t=.5*(l+a);g=l+p*(l-t),f=a+p*(a-t);const e=.5*(c+h);_=c+p*(c-e),m=h+p*(h-e);const i=.5*(u+d);v=u+p*(u-i),y=d+p*(d-i)}for(let t=0;t<i;t+=4)e[t+0]=s(e[t+0],a,l,f,g),e[t+1]=s(e[t+1],h,c,m,_),e[t+2]=s(e[t+2],d,u,y,v)},t.Factory.addGetterSetter(e.Node,"enhance",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Wr}(),S=(Vr||(Vr=1,Object.defineProperty(Hr,"__esModule",{value:!0}),Hr.Grayscale=void 0,Hr.Grayscale=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4){const i=.34*e[t]+.5*e[t+1]+.16*e[t+2];e[t]=i,e[t+1]=i,e[t+2]=i}}),Hr),C=function(){if(jr)return qr;jr=1,Object.defineProperty(qr,"__esModule",{value:!0}),qr.HSL=void 0;const t=vn(),e=yn(),i=mn();return t.Factory.addGetterSetter(e.Node,"hue",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"saturation",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"luminance",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),qr.HSL=function(t){const e=t.data,i=e.length,s=Math.pow(2,this.saturation()),n=Math.abs(this.hue()+360)%360,r=127*this.luminance(),o=1*s*Math.cos(n*Math.PI/180),a=1*s*Math.sin(n*Math.PI/180),l=.299+.701*o+.167*a,h=.587-.587*o+.33*a,c=.114-.114*o-.497*a,d=.299-.299*o-.328*a,u=.587+.413*o+.035*a,p=.114-.114*o+.293*a,g=.299-.3*o+1.25*a,f=.587-.586*o-1.05*a,_=.114+.886*o-.2*a;let m,v,y,b;for(let t=0;t<i;t+=4)m=e[t+0],v=e[t+1],y=e[t+2],b=e[t+3],e[t+0]=l*m+h*v+c*y+r,e[t+1]=d*m+u*v+p*y+r,e[t+2]=g*m+f*v+_*y+r,e[t+3]=b},qr}(),k=function(){if(Kr)return Yr;Kr=1,Object.defineProperty(Yr,"__esModule",{value:!0}),Yr.HSV=void 0;const t=vn(),e=yn(),i=mn();return Yr.HSV=function(t){const e=t.data,i=e.length,s=Math.pow(2,this.value()),n=Math.pow(2,this.saturation()),r=Math.abs(this.hue()+360)%360,o=s*n*Math.cos(r*Math.PI/180),a=s*n*Math.sin(r*Math.PI/180),l=.299*s+.701*o+.167*a,h=.587*s-.587*o+.33*a,c=.114*s-.114*o-.497*a,d=.299*s-.299*o-.328*a,u=.587*s+.413*o+.035*a,p=.114*s-.114*o+.293*a,g=.299*s-.3*o+1.25*a,f=.587*s-.586*o-1.05*a,_=.114*s+.886*o-.2*a;for(let t=0;t<i;t+=4){const i=e[t+0],s=e[t+1],n=e[t+2],r=e[t+3];e[t+0]=l*i+h*s+c*n,e[t+1]=d*i+u*s+p*n,e[t+2]=g*i+f*s+_*n,e[t+3]=r}},t.Factory.addGetterSetter(e.Node,"hue",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"saturation",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"value",0,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),Yr}(),P=(Xr||(Xr=1,Object.defineProperty(Zr,"__esModule",{value:!0}),Zr.Invert=void 0,Zr.Invert=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4)e[t]=255-e[t],e[t+1]=255-e[t+1],e[t+2]=255-e[t+2]}),Zr),I=to(),$=so(),M=function(){if(no)return ro;no=1,Object.defineProperty(ro,"__esModule",{value:!0}),ro.Noise=void 0;const t=vn(),e=yn(),i=mn();return ro.Noise=function(t){const e=255*this.noise(),i=t.data,s=i.length,n=e/2;for(let t=0;t<s;t+=4)i[t+0]+=n-2*n*Math.random(),i[t+1]+=n-2*n*Math.random(),i[t+2]+=n-2*n*Math.random()},t.Factory.addGetterSetter(e.Node,"noise",.2,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),ro}(),E=function(){if(oo)return ao;oo=1,Object.defineProperty(ao,"__esModule",{value:!0}),ao.Pixelate=void 0;const t=vn(),e=tn(),i=yn(),s=mn();return ao.Pixelate=function(t){let i=Math.ceil(this.pixelSize()),s=t.width,n=t.height,r=Math.ceil(s/i),o=Math.ceil(n/i),a=t.data;if(i<=0)e.Util.error("pixelSize value can not be <= 0");else for(let t=0;t<r;t+=1)for(let e=0;e<o;e+=1){let r=0,o=0,l=0,h=0;const c=t*i,d=c+i,u=e*i,p=u+i;let g=0;for(let t=c;t<d;t+=1)if(!(t>=s))for(let e=u;e<p;e+=1){if(e>=n)continue;const i=4*(s*e+t);r+=a[i+0],o+=a[i+1],l+=a[i+2],h+=a[i+3],g+=1}r/=g,o/=g,l/=g,h/=g;for(let t=c;t<d;t+=1)if(!(t>=s))for(let e=u;e<p;e+=1){if(e>=n)continue;const i=4*(s*e+t);a[i+0]=r,a[i+1]=o,a[i+2]=l,a[i+3]=h}}},t.Factory.addGetterSetter(i.Node,"pixelSize",8,(0,s.getNumberValidator)(),t.Factory.afterSetFilter),ao}(),A=function(){if(lo)return ho;lo=1,Object.defineProperty(ho,"__esModule",{value:!0}),ho.Posterize=void 0;const t=vn(),e=yn(),i=mn();return ho.Posterize=function(t){const e=Math.round(254*this.levels())+1,i=t.data,s=i.length,n=255/e;for(let t=0;t<s;t+=1)i[t]=Math.floor(i[t]/n)*n},t.Factory.addGetterSetter(e.Node,"levels",.5,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),ho}(),L=function(){if(co)return uo;co=1,Object.defineProperty(uo,"__esModule",{value:!0}),uo.RGB=void 0;const t=vn(),e=yn(),i=mn();return uo.RGB=function(t){const e=t.data,i=e.length,s=this.red(),n=this.green(),r=this.blue();for(let t=0;t<i;t+=4){const i=(.34*e[t]+.5*e[t+1]+.16*e[t+2])/255;e[t]=i*s,e[t+1]=i*n,e[t+2]=i*r,e[t+3]=e[t+3]}},t.Factory.addGetterSetter(e.Node,"red",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"green",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"blue",0,i.RGBComponent,t.Factory.afterSetFilter),uo}(),T=function(){if(po)return go;po=1,Object.defineProperty(go,"__esModule",{value:!0}),go.RGBA=void 0;const t=vn(),e=yn(),i=mn();return go.RGBA=function(t){const e=t.data,i=e.length,s=this.red(),n=this.green(),r=this.blue(),o=this.alpha();for(let t=0;t<i;t+=4){const i=1-o;e[t]=s*o+e[t]*i,e[t+1]=n*o+e[t+1]*i,e[t+2]=r*o+e[t+2]*i}},t.Factory.addGetterSetter(e.Node,"red",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"green",0,function(t){return this._filterUpToDate=!1,t>255?255:t<0?0:Math.round(t)}),t.Factory.addGetterSetter(e.Node,"blue",0,i.RGBComponent,t.Factory.afterSetFilter),t.Factory.addGetterSetter(e.Node,"alpha",1,function(t){return this._filterUpToDate=!1,t>1?1:t<0?0:t}),go}(),F=(fo||(fo=1,Object.defineProperty(_o,"__esModule",{value:!0}),_o.Sepia=void 0,_o.Sepia=function(t){const e=t.data,i=e.length;for(let t=0;t<i;t+=4){const i=e[t+0],s=e[t+1],n=e[t+2];e[t+0]=Math.min(255,.393*i+.769*s+.189*n),e[t+1]=Math.min(255,.349*i+.686*s+.168*n),e[t+2]=Math.min(255,.272*i+.534*s+.131*n)}}),_o),R=(mo||(mo=1,Object.defineProperty(vo,"__esModule",{value:!0}),vo.Solarize=void 0,vo.Solarize=function(t){const e=t.data,i=t.width,s=4*i;let n=t.height;do{const t=(n-1)*s;let r=i;do{const i=t+4*(r-1);let s=e[i],n=e[i+1],o=e[i+2];s>127&&(s=255-s),n>127&&(n=255-n),o>127&&(o=255-o),e[i]=s,e[i+1]=n,e[i+2]=o}while(--r)}while(--n)}),vo),D=function(){if(yo)return xo;yo=1,Object.defineProperty(xo,"__esModule",{value:!0}),xo.Threshold=void 0;const t=vn(),e=yn(),i=mn();return xo.Threshold=function(t){const e=255*this.threshold(),i=t.data,s=i.length;for(let t=0;t<s;t+=1)i[t]=i[t]<e?0:255},t.Factory.addGetterSetter(e.Node,"threshold",.5,(0,i.getNumberValidator)(),t.Factory.afterSetFilter),xo}();return Ks.Konva=t.Konva.Util._assign(t.Konva,{Arc:e.Arc,Arrow:i.Arrow,Circle:s.Circle,Ellipse:n.Ellipse,Image:r.Image,Label:o.Label,Tag:o.Tag,Line:a.Line,Path:l.Path,Rect:h.Rect,RegularPolygon:c.RegularPolygon,Ring:d.Ring,Sprite:u.Sprite,Star:p.Star,Text:g.Text,TextPath:f.TextPath,Transformer:_.Transformer,Wedge:m.Wedge,Filters:{Blur:v.Blur,Brighten:y.Brighten,Contrast:b.Contrast,Emboss:x.Emboss,Enhance:w.Enhance,Grayscale:S.Grayscale,HSL:C.HSL,HSV:k.HSV,Invert:P.Invert,Kaleidoscope:I.Kaleidoscope,Mask:$.Mask,Noise:M.Noise,Pixelate:E.Pixelate,Posterize:A.Posterize,RGB:L.RGB,RGBA:T.RGBA,Sepia:F.Sepia,Solarize:R.Solarize,Threshold:D.Threshold}}),Ks}var So,Co=qs.exports;var ko=Ps(function(){if(So)return qs.exports;So=1,Object.defineProperty(Co,"__esModule",{value:!0});const t=wo();return qs.exports=t.Konva,qs.exports}());function Po(t){const e=Math.max(t,.01);return Math.max(9,Math.min(13,11/e))}function Io(t,e){return`v${t} · ${e}`}function $o(t){return`v${t}`}const Mo="#6366f1";function Eo(t){const e=[];for(const[i,s]of t.points)e.push(i,s);return e}function Ao(t,e){if(e<=0||t.length<3)return!1;const i=t.length-1;if(e!==i)return!1;const s=t[0],n=t[i];return Math.hypot(s.x-n.x,s.y-n.y)<.5}class Lo{constructor(t,e,i){this.viewOx=40,this.viewOy=40,this.viewScale=1,this.stage=new ko.Stage({container:t,width:e,height:i}),this._layer=new ko.Layer,this._bgCanvas=document.createElement("canvas"),this._bgImage=new ko.Image({image:this._bgCanvas,listening:!1}),this._world=new ko.Group,this._leds=new ko.Group({listening:!1}),this._guide=new ko.Group({listening:!1}),this._edges=new ko.Group({listening:!1}),this._vertices=new ko.Group,this._overlay=new ko.Group({listening:!1}),this._hint=new ko.Text({text:"Draw a shape, then use Place vertices",fontSize:14,fill:"rgba(255,255,255,0.25)",align:"center",verticalAlign:"middle",width:e,height:i,listening:!1}),this._world.add(this._leds),this._world.add(this._guide),this._world.add(this._edges),this._world.add(this._vertices),this._world.add(this._overlay),this._layer.add(this._bgImage),this._layer.add(this._world),this._layer.add(this._hint),this.stage.add(this._layer),this._applyWorldTransform()}resize(t,e){this.stage.width(t),this.stage.height(e),this._hint.width(t),this._hint.height(e),this._hint.position({x:0,y:e/2-10})}destroy(){this.stage.destroy()}updatePointerFromEvent(t){this.stage.setPointersPositions(t)}getModelPointer(t){t&&this.updatePointerFromEvent(t);const e=this._world.getRelativePointerPosition();return e?[e.x,e.y]:this._modelFromStagePointer()}_modelFromStagePointer(){const t=this.stage.getPointerPosition();return t?[(t.x-this.viewOx)/this.viewScaleSafe,(t.y-this.viewOy)/this.viewScaleSafe]:null}get viewScaleSafe(){return Math.max(this.viewScale,.01)}_applyWorldTransform(){this._world.position({x:this.viewOx,y:this.viewOy}),this._world.scale({x:this.viewScale,y:this.viewScale})}fitView(t,e){let i=1/0,s=-1/0,n=1/0,r=-1/0;const o=(t,e)=>{t<i&&(i=t),t>s&&(s=t),e<n&&(n=e),e>r&&(r=e)};for(const e of t)o(e.x,e.y);for(const t of e)o(t[0],t[1]);const a=this.stage.width(),l=this.stage.height();if(!Number.isFinite(i))return this.viewOx=40,this.viewOy=40,this.viewScale=1,void this._applyWorldTransform();const h=s-i||100,c=r-n||100;this.viewScale=Math.min((a-96)/h,(l-96)/c,4),this.viewOx=48-i*this.viewScale,this.viewOy=48-n*this.viewScale,this._applyWorldTransform()}setViewScale(t,e,i){const s=e??this.stage.width()/2,n=i??this.stage.height()/2,r=this.viewScale,o=Math.max(.15,Math.min(8,t)),a=(s-this.viewOx)/r,l=(n-this.viewOy)/r;this.viewScale=o,this.viewOx=s-a*o,this.viewOy=n-l*o,this._applyWorldTransform()}redraw(t){const e=this.stage.width(),i=this.stage.height();this._layer.getStage()?.container().style.setProperty("background","#111827"),this._drawBackground(e,i,t.bgImage,t.bgLayer),this._leds.destroyChildren(),this._guide.destroyChildren(),this._edges.destroyChildren(),this._vertices.destroyChildren(),this._overlay.destroyChildren();const s=2/this.viewScaleSafe,n=[8/this.viewScaleSafe,6/this.viewScaleSafe],r=(t,e=.75)=>{!t||t.points.length<2||this._guide.add(new ko.Line({points:Eo(t),stroke:`rgba(168,85,247,${e})`,strokeWidth:3/this.viewScaleSafe,lineCap:"round",lineJoin:"round",dash:n,closed:t.closed,listening:!1}))};if(r(t.guide),r(t.guidePreview,.55),t.polylinePts.length>=2&&r(Fs(t.polylinePts,!1),.75),t.penStroke.length>=2){const e=[];for(const[i,s]of t.penStroke)e.push(i,s);this._overlay.add(new ko.Line({points:e,stroke:"rgba(168,85,247,0.5)",strokeWidth:s,lineCap:"round",lineJoin:"round",listening:!1}))}const o=t.vertices,a=0===o.length&&!t.guide;this._hint.visible(a);const l=Boolean(t.bgImage?.naturalWidth);for(const{x:e,y:i}of t.ledPositions)this._leds.add(new ko.Circle({x:e,y:i,radius:(l?4:3)/this.viewScaleSafe,fill:"rgba(120,220,120,0.65)",shadowBlur:l?10/this.viewScaleSafe:0,shadowColor:"rgba(120,255,160,0.85)",listening:!1}));if(o.length>=2){const e=o.length>=2&&Ao(o,o.length-1)?o.slice(0,-1):o;if(e.length>=2){const i=[];for(const t of e)i.push(t.x,t.y);this._edges.add(new ko.Line({points:i,stroke:"rgba(99,102,241,0.6)",strokeWidth:s,closed:t.closed&&e.length>=3,listening:!1}))}}for(const[e,i]of t.calibPts)this._overlay.add(new ko.Circle({x:e,y:i,radius:6/this.viewScaleSafe,fill:"#22d3ee",listening:!1}));for(let e=0;e<o.length;e++){if(Ao(o,e))continue;const i=o[e],s=null!==i.anchorLed,n=e===t.selectedVtx,r=(s?5:4)/this.viewScaleSafe,a=new ko.Circle({x:i.x,y:i.y,radius:r,fill:n?"white":s?"#f59e0b":Mo,stroke:n?Mo:void 0,strokeWidth:n?2/this.viewScaleSafe:0,listening:"select"===t.tool||"place"===t.tool,name:`vertex-${e}`});this._vertices.add(a);const l=3/this.viewScaleSafe,h=Po(this.viewScaleSafe),c=s&&null!==i.anchorLed?Io(e,i.anchorLed):$o(e),d=new ko.Text({x:i.x+r+l,y:i.y-r-l,text:c,fontSize:h,fontStyle:"bold",fontFamily:"system-ui, -apple-system, sans-serif",fill:"#ffffff",shadowColor:"rgba(0,0,0,0.85)",shadowBlur:3/this.viewScaleSafe,shadowOffset:{x:0,y:1/this.viewScaleSafe},listening:!1});d.y(i.y-r-l-d.height()),this._vertices.add(d)}this._layer.batchDraw()}_drawBackground(t,e,i,s){const n=this._bgCanvas.getContext("2d");n&&i?.complete&&i.naturalWidth&&s?(this._bgCanvas.width===t&&this._bgCanvas.height===e||(this._bgCanvas.width=t,this._bgCanvas.height=e),n.clearRect(0,0,t,e),n.fillStyle="#111827",n.fillRect(0,0,t,e),ws(n,t,e,i,s),this._bgImage.image(this._bgCanvas),this._bgImage.width(t),this._bgImage.height(e),this._bgImage.visible(!0)):this._bgImage.visible(!1)}}const To=.15,Fo=.25;function Ro(t){const e=Math.max(To,Math.min(8,t)),i=(Math.log(e)-Math.log(To))/(Math.log(8)-Math.log(To));return Math.round(100*i)}function Do(t){const e=Math.max(Fo,Math.min(4,t)),i=(Math.log(e)-Math.log(Fo))/(Math.log(4)-Math.log(Fo));return Math.round(100*i)}function No(t){const e=Math.max(0,Math.min(100,t))/100;return Math.exp(Math.log(Fo)+e*(Math.log(4)-Math.log(Fo)))}const Oo=.3048;function Uo(t){const e=t?.config?.unit_system?.length;return"mi"!==e}function Go(t){return Uo(t)?"m":"ft"}function zo(t,e){if(e)return`${t.toFixed(1)} px/m`;return`${(t*Oo).toFixed(1)} px/ft`}function Bo(t,e,i){return t+(e-t)*i}let Wo=class extends mt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput="",this._status="",this._busy=!1,this._closed=!1,this._tool="select",this._guide=null,this._backgroundUrl=null,this._bgLayer=null,this._scalePxPerM=null,this._layoutName="Layout",this._fixtureName="Fixture",this._calibActive=!1,this._calibDistance="1",this._canUndo=!1,this._canRedo=!1,this._zoomSlider=50,this._anchorScaleEnd=-1,this._calibPts=[],this._undoStack=[],this._redoStack=[],this._suspendHistory=!1,this._penStroke=[],this._shapeStart=null,this._lineStart=null,this._polylinePts=[],this._bgImage=null,this._photoPan=null,this._drag=null,this._onWheel=t=>{t.preventDefault()},this._onKeyDown=t=>{(t.metaKey||t.ctrlKey)&&("z"!==t.key||t.shiftKey?("z"===t.key&&t.shiftKey||"y"===t.key)&&(t.preventDefault(),this._redo()):(t.preventDefault(),this._undo()))},this._onPointerDown=t=>{t.preventDefault();const e=this._pointerModel(t);if(!e)return;const[i,s]=e;if(this._calibActive)return this._calibPts.push([i,s]),this._calibPts.length>=2&&this._applyCalibration(),void this._syncStage();if("photo"===this._tool&&this._bgLayer){const e=this._konva?.stage,i=e?.getPointerPosition();return this._photoPan={px:i?.x??0,py:i?.y??0,ox:this._bgLayer.offsetX??0,oy:this._bgLayer.offsetY??0},void this._stageContainer()?.setPointerCapture(t.pointerId)}if("place"===this._tool){const t=this._hitVertex(i,s);return t>=0?(this._selectedVtx=t,this._anchorInput=String(this._vertices[t].anchorLed??"")):this._placeVertexOnGuide(i,s),void this._syncStage()}if("pen"===this._tool)return this._recordUndo(),this._beginNewGuideDrawing(),this._penStroke=[[i,s]],this._stageContainer()?.setPointerCapture(t.pointerId),void this._syncStage();if("line"===this._tool)return this._lineStart?(this._guide=function(t,e){return{points:[t,e],closed:!1,kind:"line"}}(this._lineStart,[i,s]),this._lineStart=null,this._status="Line guide ready — switch to Place vertices"):(this._recordUndo(),this._beginNewGuideDrawing(),this._lineStart=[i,s],this._status="Line: click end point"),void this._syncStage();if("rect"===this._tool||"ellipse"===this._tool)return this._recordUndo(),this._beginNewGuideDrawing(),this._shapeStart=[i,s],this._status="rect"===this._tool?"Rectangle: drag to size, release to finish":"Ellipse: drag to size, release to finish",this._stageContainer()?.setPointerCapture(t.pointerId),void this._syncStage();if("polyline"===this._tool)return 0===this._polylinePts.length&&(this._recordUndo(),this._beginNewGuideDrawing()),this._polylinePts=[...this._polylinePts,[i,s]],this._status=`Polyline: ${this._polylinePts.length} pts — double-click to finish`,void this._syncStage();const n=this._hitVertex(i,s);n>=0?(this._recordUndo(),this._selectedVtx=n,this._anchorInput=String(this._vertices[n].anchorLed??""),this._drag={idx:n},this._stageContainer()?.setPointerCapture(t.pointerId)):this._selectedVtx=-1,this._syncStage()},this._onPointerMove=t=>{const e=this._pointerModel(t);if(!e)return;const[i,s]=e;if(this._photoPan&&this._bgLayer&&this._konva){this._konva.updatePointerFromEvent(t);const e=this._konva.stage.getPointerPosition();if(!e)return;const i=this._konva.stage.width(),s=this._konva.stage.height(),n=(e.x-this._photoPan.px)/i,r=(e.y-this._photoPan.py)/s;return this._bgLayer={...this._bgLayer,offsetX:this._photoPan.ox+n,offsetY:this._photoPan.oy+r},void this._syncStage()}if("pen"===this._tool&&this._penStroke.length>0){const t=this._penStroke[this._penStroke.length-1],e=2/(this._konva?.viewScaleSafe??1);return void(Math.hypot(i-t[0],s-t[1])>e&&(this._penStroke=[...this._penStroke,[i,s]],this._syncStage()))}if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const[t,e]=this._shapeStart,n="rect"===this._tool?Ls(t,e,i,s):Ts((t+i)/2,(e+s)/2,Math.abs(i-t)/2,Math.abs(s-e)/2);return void this._syncStage(n)}if(!this._drag)return;const n=[...this._vertices];n[this._drag.idx]={...n[this._drag.idx],x:i,y:s},this._vertices=n,this._syncStage()},this._onPointerUp=t=>{if(this._photoPan)return this._stageContainer()?.releasePointerCapture(t.pointerId),void(this._photoPan=null);if("pen"===this._tool&&this._penStroke.length>0)return this._stageContainer()?.releasePointerCapture(t.pointerId),void this._finishPenGuide();if(this._shapeStart&&("rect"===this._tool||"ellipse"===this._tool)){const e=this._pointerModel(t);if(!e)return;const[i,s]=e,[n,r]=this._shapeStart,o=4/(this._konva?.viewScaleSafe??1);return Math.hypot(i-n,s-r)<o?(this._stageContainer()?.releasePointerCapture(t.pointerId),this._status="rect"===this._tool?"Rectangle: drag to size (release was too short)":"Ellipse: drag to size (release was too short)",void this._syncStage()):(this._guide="rect"===this._tool?Ls(n,r,i,s):Ts((n+i)/2,(r+s)/2,Math.abs(i-n)/2,Math.abs(s-r)/2),this._shapeStart=null,this._status="Shape guide ready — switch to Place vertices",this._stageContainer()?.releasePointerCapture(t.pointerId),void this._syncStage())}this._drag&&(this._stageContainer()?.releasePointerCapture(t.pointerId),this._drag=null,this._refreshPositions())},this._onDblClick=t=>{if("polyline"===this._tool)return t.preventDefault(),void this._finishPolyline();if("select"!==this._tool)return;const e=this._pointerModel(t);if(!e)return;const[i,s]=e;this._hitVertex(i,s)>=0||(this._recordUndo(),this._vertices=[...this._vertices,{x:i,y:s,anchorLed:null}],this._selectedVtx=this._vertices.length-1,this._anchorInput="",this._syncStage(),this._refreshPositions())},this._onContextMenu=t=>{t.preventDefault();const e=this._pointerModel(t);if(!e)return;const i=this._hitVertex(e[0],e[1]);i<0||(this._recordUndo(),this._vertices=this._vertices.filter((t,e)=>e!==i),this._selectedVtx===i?this._selectedVtx=-1:this._selectedVtx>i&&this._selectedVtx--,this._syncStage(),this._refreshPositions())}}onPoweredConnect(){this._loadLayout()}firstUpdated(){if(this._stageMount=this.renderRoot.querySelector(".stage-mount")??void 0,this._stageMount){const t=this._stageMount.getBoundingClientRect(),e=Math.max(1,Math.floor(t.width)),i=Math.max(1,Math.floor(t.height));this._konva=new Lo(this._stageMount,e,i);const s=this._konva.stage.container();s.addEventListener("pointerdown",this._onPointerDown),s.addEventListener("pointermove",this._onPointerMove),s.addEventListener("pointerup",this._onPointerUp),s.addEventListener("pointercancel",this._onPointerUp),s.addEventListener("dblclick",this._onDblClick),s.addEventListener("contextmenu",this._onContextMenu),s.addEventListener("wheel",this._onWheel,{passive:!1}),this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._stageMount),this._onResize(),this._syncZoomSliderFromView()}}updated(t){super.updated(t),(t.has("connection")||t.has("layoutId")||t.has("fixtureId"))&&this._loadLayout()}disconnectedCallback(){this._resizeObs?.disconnect();const t=this._konva?.stage.container();t&&(t.removeEventListener("pointerdown",this._onPointerDown),t.removeEventListener("pointermove",this._onPointerMove),t.removeEventListener("pointerup",this._onPointerUp),t.removeEventListener("pointercancel",this._onPointerUp),t.removeEventListener("dblclick",this._onDblClick),t.removeEventListener("contextmenu",this._onContextMenu),t.removeEventListener("wheel",this._onWheel)),this._konva?.destroy(),this._konva=void 0,super.disconnectedCallback()}_onResize(){const t=this._stageMount,e=this._konva;if(!t||!e)return;const i=t.getBoundingClientRect(),s=Math.max(1,Math.floor(i.width)),n=Math.max(1,Math.floor(i.height));e.resize(s,n),this._syncStage()}_fitView(){this._konva?.fitView(this._vertices,this._guide?.points??[]),this._syncZoomSliderFromView()}_captureSnapshot(){return{vertices:this._vertices.map(t=>({...t})),guide:this._guide?{points:this._guide.points.map(t=>[t[0],t[1]]),closed:this._guide.closed,kind:this._guide.kind}:null,closed:this._closed,bgLayer:this._bgLayer?{...this._bgLayer}:null,backgroundUrl:this._backgroundUrl,scalePxPerM:this._scalePxPerM,selectedVtx:this._selectedVtx,anchorInput:this._anchorInput}}_recordUndo(){this._suspendHistory||(this._undoStack.push(this._captureSnapshot()),this._undoStack.length>50&&this._undoStack.shift(),this._redoStack=[],this._canUndo=this._undoStack.length>0,this._canRedo=!1)}_applySnapshot(t){const e=function(t){return{vertices:t.vertices.map(t=>({...t})),guide:t.guide?{points:t.guide.points.map(t=>[t[0],t[1]]),closed:t.guide.closed,kind:t.guide.kind}:null,closed:t.closed,bgLayer:t.bgLayer?{...t.bgLayer}:null,backgroundUrl:t.backgroundUrl,scalePxPerM:t.scalePxPerM,selectedVtx:t.selectedVtx,anchorInput:t.anchorInput}}(t);this._vertices=e.vertices,this._guide=e.guide,this._closed=e.closed,this._bgLayer=e.bgLayer,this._backgroundUrl=e.backgroundUrl,this._scalePxPerM=e.scalePxPerM,this._selectedVtx=e.selectedVtx,this._anchorInput=e.anchorInput,this._penStroke=[],this._shapeStart=null,this._lineStart=null,this._polylinePts=[],this._backgroundUrl?this._loadBackgroundImage():this._bgImage=null,this._refreshPositions(),this._syncZoomSliderFromView(),this._syncStage()}_undo(){if(!this._undoStack.length)return;this._redoStack.push(this._captureSnapshot());const t=this._undoStack.pop();this._suspendHistory=!0,this._applySnapshot(t),this._suspendHistory=!1,this._canUndo=this._undoStack.length>0,this._canRedo=this._redoStack.length>0,this._status="Undo"}_redo(){if(!this._redoStack.length)return;this._undoStack.push(this._captureSnapshot());const t=this._redoStack.pop();this._suspendHistory=!0,this._applySnapshot(t),this._suspendHistory=!1,this._canUndo=this._undoStack.length>0,this._canRedo=this._redoStack.length>0,this._status="Redo"}_syncZoomSliderFromView(){"photo"===this._tool&&this._bgLayer?this._zoomSlider=Do(this._bgLayer.scale??1):this._konva&&(this._zoomSlider=Ro(this._konva.viewScale))}_onZoomSlider(t){const e=parseInt(t.target.value,10);isNaN(e)||(this._zoomSlider=e,"photo"===this._tool&&this._bgLayer?this._bgLayer={...this._bgLayer,scale:No(e)}:this._konva&&this._konva.setViewScale(function(t){const e=Math.max(0,Math.min(100,t))/100;return Math.exp(Math.log(To)+e*(Math.log(8)-Math.log(To)))}(e)),this._syncStage())}_nudgeZoom(t){if("photo"===this._tool&&this._bgLayer){const e=Math.max(.25,Math.min(4,(this._bgLayer.scale??1)*t));this._bgLayer={...this._bgLayer,scale:e},this._zoomSlider=Do(e)}else if(this._konva){const e=Math.max(.15,Math.min(8,this._konva.viewScale*t));this._konva.setViewScale(e),this._zoomSlider=Ro(e)}this._syncStage()}_pointerModel(t){return this._konva?.getModelPointer(t)??null}_stageContainer(){return this._konva?.stage.container()}_isClosingDuplicate(t){if(t<=0||this._vertices.length<3)return!1;const e=this._vertices.length-1;if(t!==e)return!1;const i=this._vertices[0],s=this._vertices[e];return Math.hypot(i.x-s.x,i.y-s.y)<.5}_hitVertex(t,e){const i=14/(this._konva?.viewScaleSafe??1);let s=-1,n=i+1;for(let r=0;r<this._vertices.length;r++){if(this._isClosingDuplicate(r))continue;const o=this._vertices[r],a=Math.hypot(t-o.x,e-o.y);if(a>i)continue;const l=null!==this._vertices[r].anchorLed,h=s>=0&&null!==this._vertices[s].anchorLed;(s<0||a<n-.5||Math.abs(a-n)<=1&&l&&!h)&&(s=r,n=a)}return s}_beginNewGuideDrawing(){this._guide=null,this._vertices=[],this._ledPositions=[],this._selectedVtx=-1,this._anchorInput=""}_placeVertexOnGuide(t,e){if(!this._guide||this._guide.points.length<2)return void(this._status="Draw a shape first (pen, line, rect, …), then place vertices.");const i=Rs(this._guide,t,e),s=24/(this._konva?.viewScaleSafe??1);if(i.dist>s)return void(this._status="Click closer to the purple guide line.");for(const t of this._vertices)if(Math.hypot(t.x-i.x,t.y-i.y)<.5*s)return void(this._status="Vertex already placed near here.");const n=Ds(this._vertices.length,i.t,this.pixelCount);this._recordUndo(),this._vertices=[...this._vertices,{x:i.x,y:i.y,anchorLed:n}],this._selectedVtx=this._vertices.length-1,this._anchorInput=String(n),this._status=0===this._selectedVtx?"Placed v0 @ LED 0 (start) — next clicks use position along guide":`Placed v${this._selectedVtx} @ LED ${n} (${Math.round(100*i.t)}% along guide)`,this._refreshPositions(),this._syncStage()}_finishPenGuide(){const t=this._penStroke;this._penStroke=[],t.length>=2&&(this._guide=function(t,e,i=!1){if(t.length<2)return{points:[],closed:!1,kind:"freehand"};const s=As(t.map(([t,e])=>({x:t,y:e})),4,!0),n=s.map(t=>e(t.x,t.y));return{points:n,closed:i,kind:"freehand"}}(t,(t,e)=>[t,e],this._closed)),this._status=this._guide&&this._guide.points.length>=2?"Smooth guide drawn — switch to Place vertices and click along the line":"Stroke too short",this._syncStage()}_finishPolyline(){this._polylinePts.length<2?this._status="Need at least 2 points":(this._recordUndo(),this._guide=Fs(this._polylinePts,this._closed),this._polylinePts=[],this._status="Polyline guide ready — Place vertices along the path",this._syncStage())}_lengthMetric(){return Uo(this.hass)}_applyCalibration(){if(this._calibPts.length<2)return;const[t,e]=this._calibPts,i=Math.hypot(e[0]-t[0],e[1]-t[1]),s=parseFloat(this._calibDistance),n=(r=s,this._lengthMetric()?r:r*Oo);var r;i>0&&n>0&&(this._scalePxPerM=i/n,this._status=`Scale: ${zo(this._scalePxPerM,this._lengthMetric())}`),this._calibActive=!1,this._calibPts=[]}_syncStage(t=null){const e=this._konva?.stage.container();e&&(e.style.cursor="photo"===this._tool&&this._bgLayer?"grab":"crosshair"),this._konva?.redraw({vertices:this._vertices,selectedVtx:this._selectedVtx,guide:this._guide,guidePreview:t,ledPositions:this._ledPositions,closed:this._closed,polylinePts:this._polylinePts,penStroke:this._penStroke,calibPts:this._calibPts,bgImage:this._bgImage,bgLayer:this._bgLayer,tool:this._tool})}async _loadLayout(){if(this.connection&&this.controllerId&&this.layoutId){this._suspendHistory=!0,this._undoStack=[],this._redoStack=[],this._canUndo=!1,this._canRedo=!1;try{const t=await Zi(this.connection,this.controllerId,this.layoutId);if(!t)return;const e=this._findFixture(t);if(!e)return void(this._vertices=[]);const i=e.points??[],s=e.anchors??[],n=new Map(s.map(t=>[t.vertex_index,t.led]));let r=i.map((t,e)=>({x:t[0],y:t[1],anchorLed:n.get(e)??null}));if(r.length>=2){const t=r[0],e=r[r.length-1];Math.hypot(t.x-e.x,t.y-e.y)<.5&&(r=r.slice(0,-1))}this._vertices=r;const o=e.guide_points,a=e.guide_kind;Array.isArray(o)&&o.length>=2&&(this._guide={points:o.map(t=>[Number(t[0]),Number(t[1])]),closed:Boolean(e.closed),kind:a??"polyline"}),this._closed=Boolean(e.closed),this._bgLayer=xs(t),this._backgroundUrl=this._bgLayer?.url??t.background_url??null,this._scalePxPerM=t.scale_px_per_m??null,this._layoutName=function(t,e){const i=(t??"").trim();return i&&!ts.has(i.toLowerCase())?i:es(e)}(t.name,this.layoutId),this._fixtureName=function(t,e){const i=(t??"").trim();return i&&!ts.has(i.toLowerCase())?i:es(e)}(String(e.name??""),this.fixtureId||String(e.id??"fixture-0")),this._loadBackgroundImage(),this._fitView(),await this._refreshPositions(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._suspendHistory=!1}}}_findFixture(t){const e=t.fixtures??[];return this.fixtureId?e.find(t=>t.id===this.fixtureId)??null:e[0]??null}async _refreshPositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{this._ledPositions=await Qi(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._syncStage()}catch{this._ledPositions=[]}}_buildLayout(){const t=this._vertices.map(t=>[t.x,t.y]),e=this._vertices.map((t,e)=>null!==t.anchorLed?{led:t.anchorLed,vertex_index:e}:null).filter(t=>null!==t);return{id:this.layoutId||"layout-0",controller_id:this.controllerId,name:this._layoutName,pixel_count:this.pixelCount,background_url:this._backgroundUrl,background:this._bgLayer,scale_px_per_m:this._scalePxPerM,fixtures:[{id:this.fixtureId||"fixture-0",name:this._fixtureName,kind:"polyline",closed:this._closed,points:t,anchors:e,guide_points:this._guide?.points??[],guide_kind:this._guide?.kind??null}]}}async _onSvgFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i)if(i.size>Ns)this._status="SVG too large (max 2 MB)";else{this._busy=!0,this._status="Importing SVG…";try{const t=await i.text();await new Promise(t=>setTimeout(t,0)),this._recordUndo(),this._beginNewGuideDrawing(),this._guide=Vs(t),this._status=`SVG guide loaded (${this._guide.points.length} pts) — Place vertices along the path`,this._fitView(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_clearGuide(){this._recordUndo(),this._guide=null,this._polylinePts=[],this._lineStart=null,this._beginNewGuideDrawing(),this._syncStage()}_loadBackgroundImage(t=!1){const e=this._backgroundUrl;e?Hs(e,t).then(t=>{this._bgImage=t,this._syncStage()}).catch(t=>{this._bgImage=null,this._status=Rt(t),this._syncStage()}):this._bgImage=null}async _importFromWled(){if(this.connection&&this.controllerId){this._busy=!0,this._status="Reading WLED segments…";try{const t=(await Pt(this.connection,this.controllerId)).segments.map(t=>t.start??0).filter((t,e,i)=>i.indexOf(t)===e).sort((t,e)=>t-e);this._recordUndo(),this._vertices=ls(this._vertices,t,this._closed),this._status=`Imported ${t.length} segment boundary(ies) from WLED`,this._refreshPositions(),this._syncStage()}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}async _onBackgroundFile(t){const e=t.target,i=e.files?.[0];if(e.value="",!i)return;const s=this.renderRoot.querySelector("wled-layout-photo-editor");if(s)try{await s.openWithFile(i)}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _onPhotoApply(t){const{file:e,layer:i}=t.detail;if(this.connection&&this.controllerId&&this.layoutId){this._busy=!0,this._status="Uploading photo…";try{const{background_url:t}=await os(this.connection,this.controllerId,this.layoutId,e);this._recordUndo(),this._backgroundUrl=t,this._bgLayer={...i,url:t,cropX:0,cropY:0,cropW:1,cropH:1},this._loadBackgroundImage(!0),this._status="Photo ready — align with Photo tool, then Save layout"}catch(t){this._status=Rt(t)}finally{this._busy=!1}}else this._status="Cannot upload photo — not connected to Home Assistant"}_updateBgLayer(t){this._bgLayer&&(this._bgLayer={...this._bgLayer,...t},this._syncStage())}_clearPhoto(){this._recordUndo(),this._bgLayer=null,this._backgroundUrl=null,this._bgImage=null,this._syncStage()}async _save(){if(this.connection&&this.controllerId&&!this._busy){this._busy=!0,this._status="Saving…";try{await Ji(this.connection,this.controllerId,this._buildLayout()),this._status="Saved",await this._refreshPositions(),this.dispatchEvent(new CustomEvent("layout-saved",{bubbles:!0,composed:!0}))}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_setAnchorLed(){const t=this._selectedVtx;if(t<0)return;this._recordUndo();const e=this._anchorInput.trim(),i=""===e?null:parseInt(e,10);if(null!==i&&(isNaN(i)||i<0||i>=this.pixelCount))return;const s=[...this._vertices];s[t]={...s[t],anchorLed:i},this._vertices=s,this._syncStage()}_anchorScaleMax(){return Math.max(0,this.pixelCount-1)}_anchorScaleSliderValue(){const t=this._anchorScaleMax();return this._anchorScaleEnd<0?t:Math.min(t,this._anchorScaleEnd)}_onAnchorScaleSlider(t){const e=t.target,i=parseInt(e.value,10);if(isNaN(i)||0===this._vertices.length)return;this._recordUndo();const s=this._anchorScaleMax(),n=[...this._vertices];for(let t=0;t<n.length;t++){const e=n[t].anchorLed;if(null===e)continue;const r=s>0?e/s:0,o=Math.round(Bo(0,i,r));n[t]={...n[t],anchorLed:o}}this._vertices=n,this._anchorScaleEnd=i,this._status=`Anchors rescaled to LEDs 0–${i} (spacing preserved)`,this._refreshPositions(),this._syncStage()}_zoomLabel(){return"photo"===this._tool&&this._bgLayer?`${Math.round(100*(this._bgLayer.scale??1))}%`:`${Math.round(100*(this._konva?.viewScale??1))}%`}render(){const t=this._vertices[this._selectedVtx],e="photo"===this._tool&&this._bgLayer?"Photo":"View";return W`
      <div class="designer-root" tabindex="0" @keydown=${this._onKeyDown}>
        <header class="edit-toolbar">
          <div class="toolbar-cluster">
            <span class="cluster-label">Edit</span>
            <div class="tool-row">
              <button
                class=${"select"===this._tool?"tool active":"tool"}
                @click=${()=>{this._tool="select",this._syncZoomSliderFromView()}}
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
                @click=${()=>{this._tool="photo",this._syncZoomSliderFromView()}}
              >
                Photo
              </button>
            </div>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster">
            <span class="cluster-label">Draw</span>
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
                Rect
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

          <label class="check-row compact">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${t=>{this._recordUndo(),this._closed=t.target.checked,this._syncStage(),this._refreshPositions()}}
            />
            Close path
          </label>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster stage-actions">
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canUndo}
              title="Undo (Ctrl+Z)"
              @click=${()=>this._undo()}
            >
              Undo
            </button>
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canRedo}
              title="Redo (Ctrl+Shift+Z)"
              @click=${()=>this._redo()}
            >
              Redo
            </button>
            <button
              type="button"
              class="secondary small"
              @click=${()=>{this._fitView(),this._syncStage()}}
            >
              Fit view
            </button>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster file-actions">
            <button class="secondary small" ?disabled=${this._busy} @click=${()=>this._importFromWled()}>
              Import WLED
            </button>
            <label class="file-btn secondary small">
              Photo…
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,.heic"
                capture="environment"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="file-btn secondary small">
              SVG…
              <input
                type="file"
                accept="image/svg+xml,.svg"
                hidden
                @change=${this._onSvgFile}
              />
            </label>
            <button class="secondary small" @click=${()=>this._clearGuide()}>
              Clear guide
            </button>
            ${"polyline"===this._tool&&this._polylinePts.length>=2?W`
                  <button class="secondary small" @click=${()=>this._finishPolyline()}>
                    Finish poly
                  </button>
                `:null}
            <button
              class="secondary small"
              ?disabled=${this._busy}
              @click=${()=>{this._calibActive=!0,this._calibPts=[],this._calibDistance=Uo(this.hass)?"1":"3.28",this._status=function(t){return`Click two points on the floorplan, then enter real distance (${Go(t)})`}(this.hass)}}
            >
              Calibrate
            </button>
          </div>

          ${void 0!==t?W`
                <div class="toolbar-cluster anchor-inline">
                  <label>
                    v${this._selectedVtx} LED
                    <input
                      type="number"
                      min="0"
                      max=${this.pixelCount-1}
                      .value=${this._anchorInput}
                      @input=${t=>{this._anchorInput=t.target.value}}
                      @change=${()=>this._setAnchorLed()}
                    />
                  </label>
                  <button class="secondary small" @click=${()=>this._setAnchorLed()}>
                    Set
                  </button>
                </div>
              `:null}

          <div class="toolbar-cluster scale-inline">
            <label title="Rescale all pinned anchors to LEDs 0…N (spacing preserved)">
              Scale anchors →
              <input
                type="range"
                min="0"
                max=${this._anchorScaleMax()}
                .value=${String(this._anchorScaleSliderValue())}
                @change=${this._onAnchorScaleSlider}
              />
              <span class="scale-val">${this._anchorScaleSliderValue()}</span>
            </label>
          </div>

          <div class="toolbar-spacer"></div>

          <details class="help-details">
            <summary>Help</summary>
            <p>Draw a purple guide → <strong>Place ●</strong>: first corner LED 0, then LED from click position along the path → Save.</p>
          </details>

          <button
            class="primary save-btn"
            ?disabled=${this._busy||this._vertices.length<2}
            @click=${()=>this._save()}
          >
            Save layout
          </button>
        </header>

        ${this._calibActive?W`
              <div class="context-bar">
                <label>
                  Distance (${Go(this.hass)})
                  <input
                    type="number"
                    min=${this._lengthMetric()?"0.01":"0.1"}
                    step=${this._lengthMetric()?"0.01":"0.1"}
                    .value=${this._calibDistance}
                    @input=${t=>{this._calibDistance=t.target.value}}
                  />
                </label>
              </div>
            `:null}
        ${this._bgLayer&&"photo"===this._tool?W`
              <div class="context-bar photo-tune">
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
                  >Rotation
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
                <button class="secondary small" @click=${()=>this._clearPhoto()}>
                  Remove photo
                </button>
              </div>
            `:null}

        ${this._status?W`<p class="status-bar">${this._status}</p>`:null}
        ${this._scalePxPerM?W`<p class="status-bar meta">
              Scale: ${zo(this._scalePxPerM,this._lengthMetric())}
            </p>`:null}

        <div class="split-body">
        <div class="workspace">
          <aside class="zoom-rail" aria-label="Zoom">
            <button
              type="button"
              class="zoom-btn"
              title="Zoom in"
              @click=${()=>this._nudgeZoom(1.2)}
            >
              +
            </button>
            <input
              type="range"
              class="zoom-slider"
              min="0"
              max="100"
              .value=${String(this._zoomSlider)}
              @input=${this._onZoomSlider}
              aria-label="${e} zoom"
            />
            <button
              type="button"
              class="zoom-btn"
              title="Zoom out"
              @click=${()=>this._nudgeZoom(1/1.2)}
            >
              −
            </button>
            <span class="zoom-pct">${this._zoomLabel()}</span>
            <span class="zoom-cap">${e}</span>
          </aside>
          <div class="canvas-wrap">
            <div class="stage-mount"></div>
          </div>
        </div>

        <div class="preview-pane">
          <slot name="preview"></slot>
        </div>
        </div>
      </div>
      <wled-layout-photo-editor
        @photo-apply=${t=>{this._onPhotoApply(t).catch(t=>{this._status=Rt(t),this._busy=!1})}}
        @photo-error=${t=>{this._status=t.detail.message}}
      ></wled-layout-photo-editor>
    `}static{this.styles=[..._t,o`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
      }
      .designer-root {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto 1fr;
        gap: 10px;
        height: 100%;
        min-height: 0;
        outline: none;
      }
      .split-body {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        min-height: 0;
        height: 100%;
        overflow: hidden;
      }
      .edit-toolbar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 10px;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--card-background-color, #1f2937);
        border: 1px solid var(--divider-color, #374151);
      }
      .toolbar-cluster {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .cluster-label {
        font-size: 0.68rem;
        opacity: 0.55;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        flex-shrink: 0;
      }
      .toolbar-divider {
        width: 1px;
        align-self: stretch;
        min-height: 28px;
        background: var(--divider-color, #374151);
        flex-shrink: 0;
      }
      .toolbar-spacer {
        flex: 1;
        min-width: 8px;
      }
      .context-bar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px 14px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid var(--divider-color, #374151);
      }
      .context-bar label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;
      }
      .context-bar input[type="range"] {
        width: 88px;
      }
      .photo-tune {
        gap: 12px;
      }
      .status-bar {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.78rem;
        opacity: 0.85;
        padding: 0 4px;
      }
      .status-bar.meta {
        opacity: 0.65;
        margin-top: -6px;
      }
      .workspace {
        display: flex;
        flex-direction: row;
        min-height: 0;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--divider-color, #374151);
      }
      .preview-pane {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--card-background-color, #111827);
        padding: 8px;
        box-sizing: border-box;
      }
      .preview-pane ::slotted(*) {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .zoom-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 40px;
        flex-shrink: 0;
        padding: 8px 4px;
        background: rgba(0, 0, 0, 0.45);
        border-radius: 8px 0 0 8px;
      }
      .zoom-btn {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.06);
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        padding: 0;
      }
      .zoom-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .zoom-slider {
        writing-mode: vertical-lr;
        direction: rtl;
        height: min(28vh, 200px);
        width: 28px;
        margin: 4px 0;
        accent-color: var(--primary-color, #6366f1);
      }
      .zoom-pct {
        font-size: 0.65rem;
        font-variant-numeric: tabular-nums;
        opacity: 0.85;
      }
      .zoom-cap {
        font-size: 0.6rem;
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .canvas-wrap {
        position: relative;
        flex: 1;
        overflow: hidden;
        background: #111827;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .stage-mount {
        flex: 1;
        width: 100%;
        min-height: 200px;
        cursor: crosshair;
        touch-action: none;
      }
      .stage-mount > div {
        width: 100% !important;
        height: 100% !important;
      }
      .tool-row {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tool {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .check-row.compact {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        white-space: nowrap;
        margin: 0;
      }
      .secondary,
      .file-btn {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .file-btn input {
        display: none;
      }
      .anchor-inline {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .anchor-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        margin: 0;
      }
      .anchor-inline input[type="number"] {
        width: 4.5rem;
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--primary-background-color, #111827);
        color: inherit;
        font-size: 0.85rem;
      }
      .scale-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        margin: 0;
        white-space: nowrap;
      }
      .scale-inline input[type="range"] {
        width: 100px;
      }
      .scale-val {
        font-variant-numeric: tabular-nums;
        min-width: 2ch;
      }
      .help-details {
        font-size: 0.75rem;
        opacity: 0.85;
      }
      .help-details summary {
        cursor: pointer;
        list-style: none;
      }
      .help-details p {
        margin: 6px 0 0;
        max-width: 280px;
        line-height: 1.4;
      }
      .save-btn {
        flex-shrink: 0;
      }
      .primary,
      .small {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.82rem;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.76rem;
      }
      .primary:disabled {
        opacity: 0.45;
        cursor: default;
      }
      @container wled-studio (max-width: 720px) {
        .split-body {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr minmax(200px, 36vh);
        }
        .workspace {
          min-height: min(42vh, 360px);
        }
      }
    `]}};t([ct({attribute:!1})],Wo.prototype,"connection",void 0),t([ct()],Wo.prototype,"controllerId",void 0),t([ct()],Wo.prototype,"layoutId",void 0),t([ct()],Wo.prototype,"fixtureId",void 0),t([ct({type:Number})],Wo.prototype,"pixelCount",void 0),t([dt()],Wo.prototype,"_vertices",void 0),t([dt()],Wo.prototype,"_ledPositions",void 0),t([dt()],Wo.prototype,"_selectedVtx",void 0),t([dt()],Wo.prototype,"_anchorInput",void 0),t([dt()],Wo.prototype,"_status",void 0),t([dt()],Wo.prototype,"_busy",void 0),t([dt()],Wo.prototype,"_closed",void 0),t([dt()],Wo.prototype,"_tool",void 0),t([dt()],Wo.prototype,"_guide",void 0),t([dt()],Wo.prototype,"_backgroundUrl",void 0),t([dt()],Wo.prototype,"_bgLayer",void 0),t([dt()],Wo.prototype,"_scalePxPerM",void 0),t([dt()],Wo.prototype,"_layoutName",void 0),t([dt()],Wo.prototype,"_fixtureName",void 0),t([dt()],Wo.prototype,"_calibActive",void 0),t([dt()],Wo.prototype,"_calibDistance",void 0),t([dt()],Wo.prototype,"_canUndo",void 0),t([dt()],Wo.prototype,"_canRedo",void 0),t([dt()],Wo.prototype,"_zoomSlider",void 0),t([dt()],Wo.prototype,"_anchorScaleEnd",void 0),Wo=t([yt("wled-layout-designer")],Wo);let Vo=class extends mt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=xt(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,n=i.stop??i.len??this.pixelCount;return t>=s&&t<n}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:n,h:r}=this._logicalCanvasSize();return[(t-s.left)/s.width*n,(e-s.top)/s.height*r]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,n]=i,{w:r,h:o}=this._logicalCanvasSize(),a=this._layoutMap(r,o);if(!a)return null;const{toCanvas:l,hitR:h}=a;let c=null,d=h*h;for(const t of this._positions){const[e,i]=l(t.x,t.y),r=e-s,o=i-n,a=r*r+o*o;a<d&&(d=a,c=t)}return c}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const n of this._positions)n.x<t&&(t=n.x),n.x>e&&(e=n.x),n.y<i&&(i=n.y),n.y>s&&(s=n.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:n,rangeX:r,rangeY:o}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,h=(t-2*l)/r,c=(e-2*l)/o,d=Math.min(h,c),u=Math.max(2.5,1.35*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-n)*d],hitR:Math.max(10,2.5*u),lineW:u}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--primary-color").trim()||"#18a0fb"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),n=Math.min(2,window.devicePixelRatio||1),r=Math.floor(i*n),o=Math.floor(s*n);if(t.width!==r||t.height!==o){t.width=r,t.height=o;const e=this._ctx;e&&e.setTransform(n,0,0,n,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await Zi(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=xs(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await Qi(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?Hs(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=wt(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle="#0d0d0d",t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&ws(t,i,s,this._bgImage,this._bgLayer);const n=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,r=[...this._positions].sort((t,e)=>t.led-e.led),o=this.dotRadius,a=this._layoutMap(i,s);if(r.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const o=(r,o)=>{const[a,l]=e(r.x,r.y),[h,c]=e(o.x,o.y),[d,u,p]=this._rgbForLed(n,r.led);!s&&(d>10||u>10||p>10)?(t.shadowColor=`rgba(${d},${u},${p},0.55)`,t.shadowBlur=1.5*i):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${u},${p})`,t.beginPath(),t.moveTo(a,l),t.lineTo(h,c),t.stroke()};for(let t=0;t<r.length-1;t++)o(r[t],r[t+1]);this._closed&&r.length>=2&&o(r[r.length-1],r[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of r){const[r,h]=e(i,a),[c,d,u]=this._rgbForLed(n,l);!s&&(c>10||d>10||u>10)?(t.shadowColor=`rgba(${c},${d},${u},0.7)`,t.shadowBlur=2.5*o):t.shadowBlur=0,t.beginPath(),t.arc(r,h,o,0,2*Math.PI),t.fillStyle=`rgb(${c},${d},${u})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,r,e):this._paintSegmentSelection(t,r,e,i)}else{const e=this.pixelCount,r=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(n){const t=4*i;e=n[t],s=n[t+1],l=n[t+2]}t.beginPath(),t.arc(4+i*r+r/2,a,o,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[n,r]=i(s.x,s.y),o=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(n,r,o,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(n-o-4,r),t.lineTo(n+o+4,r),t.moveTo(n,r-o-4),t.lineTo(n,r+o+4),t.stroke(),t.restore()}_paintSegmentSelection(t,e,i,s){const n=this.selectedSegId>=0?this.selectedSegId:this._hoverLed>=0?this._segmentForLed(this._hoverLed):-1;if(n<0||0===this.segments.length)return;const r=e.filter(t=>this._ledInSegment(t.led,n)).sort((t,e)=>t.led-e.led);if(r.length<2)return;const o=this._accentStroke(),a=()=>{const[e,s]=i(r[0].x,r[0].y);t.beginPath(),t.moveTo(e,s);for(let e=1;e<r.length;e++){const[s,n]=i(r[e].x,r[e].y);t.lineTo(s,n)}};t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0,t.strokeStyle="rgba(0, 0, 0, 0.45)",t.lineWidth=s+6,a(),t.stroke(),t.strokeStyle="rgba(255, 255, 255, 0.55)",t.lineWidth=s+3,a(),t.stroke(),t.strokeStyle=o,t.lineWidth=2,a(),t.stroke(),t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return W`
      <div class="preview-shell ${this.compact?"compact":""} ${this.paintMode?"paint":""}">
        ${this.compact||this.paintMode?null:W`
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
          ${e?W`<span class="overlay">${this._status}</span>`:null}
          ${this.paintMode&&0===this._positions.length?W`<span class="overlay">No layout — create one in Layout view</span>`:null}
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
    `]}};t([ct({attribute:!1})],Vo.prototype,"connection",void 0),t([ct()],Vo.prototype,"controllerId",void 0),t([ct()],Vo.prototype,"layoutId",void 0),t([ct()],Vo.prototype,"fixtureId",void 0),t([ct({type:Number})],Vo.prototype,"pixelCount",void 0),t([ct({type:Number})],Vo.prototype,"dotRadius",void 0),t([ct({type:Boolean,reflect:!0})],Vo.prototype,"compact",void 0),t([ct({type:Number})],Vo.prototype,"heightPx",void 0),t([ct({type:Boolean})],Vo.prototype,"externalLive",void 0),t([ct({type:Boolean,reflect:!0})],Vo.prototype,"paintMode",void 0),t([ct({type:Boolean})],Vo.prototype,"paintLivePreview",void 0),t([ct({type:Number})],Vo.prototype,"paintBrushSize",void 0),t([ct({type:Array})],Vo.prototype,"segments",void 0),t([ct({type:Number})],Vo.prototype,"selectedSegId",void 0),t([dt()],Vo.prototype,"_positions",void 0),t([dt()],Vo.prototype,"_status",void 0),t([dt()],Vo.prototype,"_showDots",void 0),t([dt()],Vo.prototype,"_closed",void 0),Vo=t([yt("wled-geometry-preview")],Vo);let Ho=class extends mt{constructor(){super(...arguments),this.controllerId="",this._layouts=[],this._status="Loading layouts…",this._busy=!1,this._viewMode="list",this._activeLayoutId="",this._activeFixtureId="",this._activePixelCount=210,this._onDesignerSave=async()=>{await this._load();const t=this.renderRoot.querySelector("wled-geometry-preview");await(t?.refresh()),this._activeLayoutId&&await this._applySegments(this._activeLayoutId)}}onPoweredConnect(){this._load(),this._attachLive()}onPoweredDisconnect(){this._liveUnsub?.(),this._liveUnsub=void 0}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId"))&&(this._load(),this._attachLive())}_attachLive(){this._liveUnsub?.(),this.connection&&this.controllerId&&(this._liveUnsub=wt(this.connection,this.controllerId,t=>{this._forwardFrame(t)}))}_forwardFrame(t){const e=this.renderRoot.querySelector("wled-geometry-preview");e?.setFrame(t)}async _load(){if(this.connection&&this.controllerId)try{this._layouts=await Xi(this.connection,this.controllerId),this._status=0===this._layouts.length?"No layouts yet — use the button below to seed the kitchen-island template.":`${this._layouts.length} layout(s) saved`}catch(t){this._status=t instanceof Error?t.message:String(t)}}async _seedKitchenIsland(){if(this.connection&&this.controllerId){this._busy=!0;try{await Ji(this.connection,this.controllerId,(t=this.controllerId,{id:"kitchen-island",controller_id:t,name:"Kitchen island",pixel_count:210,fixtures:[{id:"kitchen-island",name:"Kitchen island",kind:"polyline",closed:!0,points:[[0,0],[100,0],[110,10],[200,10]],anchors:[{led:0,vertex_index:0},{led:85,vertex_index:1},{led:96,vertex_index:2},{led:186,vertex_index:3}]}]})),await this._load()}finally{this._busy=!1}var t}}async _applySegments(t){if(this.connection&&this.controllerId){this._busy=!0;try{await async function(t,e,i,s){return Yi(t,{type:"wled_studio/layout_to_segments",controller_id:e,layout_id:i,fixture_id:s})}(this.connection,this.controllerId,t),this._status="WLED segments updated from layout anchors"}catch(t){this._status=t instanceof Error?t.message:String(t)}finally{this._busy=!1}}}_activeLayoutLabel(){const t=this._layouts.find(t=>String(t.id)===this._activeLayoutId);return t?is(t):this._activeLayoutId}_openDesigner(t){this._activeLayoutId=String(t.id);const e=t.fixtures[0];this._activeFixtureId=e?String(e.id??"fixture-0"):"fixture-0",this._activePixelCount=t.pixel_count??210,this._viewMode="designer"}render(){return"designer"===this._viewMode?this._renderDesigner():this._renderList()}_renderList(){return W`
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

        ${this._layouts.length>0?W`
              <ul class="layout-list">
                ${this._layouts.map(t=>W`
                    <li class="layout-item">
                      <div class="layout-info">
                        <span class="layout-name">${is(t)}</span>
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
    `}_renderDesigner(){return W`
      <div class="designer-view">
        <div class="designer-header">
          <button
            class="back"
            @click=${()=>{this._viewMode="list"}}
          >
            ← Back to layouts
          </button>
          <span class="layout-id-label">${this._activeLayoutLabel()}</span>
          <button
            class="small"
            ?disabled=${this._busy}
            @click=${()=>this._applySegments(this._activeLayoutId)}
          >
            Apply segments to WLED
          </button>
        </div>

        <wled-layout-designer
          class="designer-main"
          .connection=${this.connection}
          .hass=${this.hass}
          controllerId=${this.controllerId}
          layoutId=${this._activeLayoutId}
          fixtureId=${this._activeFixtureId}
          pixelCount=${this._activePixelCount}
          @layout-saved=${this._onDesignerSave}
        >
          <div slot="preview" class="preview-slot">
            <div class="preview-label">Live geometry preview</div>
            <wled-geometry-preview
              .connection=${this.connection}
              controllerId=${this.controllerId}
              layoutId=${this._activeLayoutId}
              fixtureId=${this._activeFixtureId}
              pixelCount=${this._activePixelCount}
            ></wled-geometry-preview>
          </div>
        </wled-layout-designer>

        ${this._status?W`<p class="status-line">${this._status}</p>`:null}
      </div>
    `}static{this.styles=[..._t,o`
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
        max-height: calc(100dvh - 8rem);
        overflow: hidden;
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
      .designer-main {
        flex: 1;
        min-height: min(78vh, calc(100dvh - 9rem));
        max-height: min(78vh, calc(100dvh - 9rem));
        overflow: hidden;
      }
      .preview-slot {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        min-height: 0;
      }
      .preview-label {
        font-size: 0.8rem;
        opacity: 0.65;
        flex-shrink: 0;
      }
      .preview-slot wled-geometry-preview {
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
    `]}};t([ct({attribute:!1})],Ho.prototype,"connection",void 0),t([ct({attribute:!1})],Ho.prototype,"hass",void 0),t([ct()],Ho.prototype,"controllerId",void 0),t([dt()],Ho.prototype,"_layouts",void 0),t([dt()],Ho.prototype,"_status",void 0),t([dt()],Ho.prototype,"_busy",void 0),t([dt()],Ho.prototype,"_viewMode",void 0),t([dt()],Ho.prototype,"_activeLayoutId",void 0),t([dt()],Ho.prototype,"_activeFixtureId",void 0),t([dt()],Ho.prototype,"_activePixelCount",void 0),Ho=t([yt("wled-view-layout")],Ho);class jo extends Error{constructor(t,e){super("Scene conflict"),this.name="SceneConflictError",this.remote=t,this.etag=e}}async function qo(t,e){return await St(t),t.sendMessagePromise({...e,schema_version:1})}async function Ko(t,e){return(await qo(t,{type:"wled_studio/scene_list",controller_id:e})).scenes??[]}let Yo=class extends mt{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle"}render(){return this.segments.length?W`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(t=>W`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(t.id)?"on":""}"
                aria-pressed=${this.selectedIds.includes(t.id)}
                @click=${()=>this._toggle(t.id)}
              >
                ${Ft(t,this.segmentEntities)}
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(t){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:t},bubbles:!0,composed:!0}))}static{this.styles=[..._t,o`
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
        background: transparent;
        outline: 2px solid var(--primary-color);
        outline-offset: 1px;
      }
    `]}};t([ct({type:Array})],Yo.prototype,"segments",void 0),t([ct({type:Array})],Yo.prototype,"selectedIds",void 0),t([ct({type:Array})],Yo.prototype,"segmentEntities",void 0),t([ct()],Yo.prototype,"hint",void 0),Yo=t([yt("wled-segment-bar")],Yo);let Xo=class extends mt{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._reload();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._rowEl&&(this._rowEl=e,this._ro?.observe(e),this._measure())}reload(){this._reload()}_reload(){var t;this._recents=(t=this.controllerId)?Di(Ri)[t]??[]:[]}_measure(){const t=this._rowEl;if(!t)return;const e=Ui(t.clientWidth,88,8,8);e!==this._visibleCount&&(this._visibleCount=e)}render(){const t=this._recents.filter(t=>this.scenes.some(e=>e.id===t.id)).slice(0,this._visibleCount);return t.length?W`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${t.map(t=>W`
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
    `]}};t([ct()],Xo.prototype,"controllerId",void 0),t([ct({type:Array})],Xo.prototype,"scenes",void 0),t([ct({type:Boolean})],Xo.prototype,"disabled",void 0),t([dt()],Xo.prototype,"_recents",void 0),t([dt()],Xo.prototype,"_visibleCount",void 0),Xo=t([yt("wled-recent-scenes-row")],Xo);let Zo=class extends mt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._toast="",this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[t,e]=await Promise.all([Ko(this.connection,this.controllerId),Pt(this.connection,this.controllerId)]);if(this._scenes=t,this._snapshot=e,this._segments=[...e.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(t=>t.id);else{const t=new Set(this._segments.map(t=>t.id));this._applySegIds=this._applySegIds.filter(e=>t.has(e)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(t=>t.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(t){this._toggleApplySeg(t)}_toggleApplySeg(t){let e=Tt(this._applySegIds,t);e.length||(e=[t]),this._applySegIds=e}render(){const t=this.compact;return W`
      <div class="wrap ${t?"compact":""}">
        <header class="head">
          ${t?W`<span class="card-label">Scenes</span>`:W`
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

        ${this._status?W`<p class="status">${this._status}</p>`:null}
        ${this._toast?W`<p class="toast" role="status">${this._toast}</p>`:null}

        ${!t&&this._segments.length?W`
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

        ${this._conflict?W`
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
    `}_sceneTile(t){const e=t.transition_ms??2500;return W`
      <article class="tile" role="listitem">
        <button
          type="button"
          class="tile-main"
          aria-label=${`Apply scene ${t.name}`}
          ?disabled=${this._busy}
          @click=${()=>this._apply(t)}
        >
          <span class="tile-name">${t.name}</span>
          ${t.seeded?W`<span class="badge">Starter</span>`:null}
          <span class="tile-meta">${(e/1e3).toFixed(1)}s fade</span>
        </button>
        ${t.seeded?null:W`
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
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(t){if(this.connection){this._busy=!0,this._toast="",this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const e=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(t,e,i,s){await St(t);const n={type:"wled_studio/scene_apply",schema_version:1,controller_id:e,scene_id:i,transition_ms:s?.transitionMs,segment_ids:s?.segmentIds?.length?s.segmentIds:void 0};return s?.signal?new Promise((e,i)=>{const r=()=>i(new DOMException("Aborted","AbortError"));s.signal?.aborted?r():(s.signal?.addEventListener("abort",r,{once:!0}),t.sendMessagePromise(n).then(t=>{s.signal?.removeEventListener("abort",r),e(t.state??{})}).catch(t=>{s.signal?.removeEventListener("abort",r),i(t)}))}):(await t.sendMessagePromise(n)).state??{}}(this.connection,this.controllerId,t.id,{signal:this._applyAbort.signal,segmentIds:e?void 0:[...this._applySegIds]}),function(t,e,i){if(!t)return[];const s=Di(Ri),n=(s[t]??[]).filter(t=>t.id!==e);n.unshift({id:e,name:i}),s[t]=n.slice(0,10),Ni(Ri,s),s[t]}(this.controllerId,t.id,t.name),this._recentScenesRow()?.reload(),await this._load(),this._toast=`Applied ${t.name}`,this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){if("AbortError"!==t.name){const e=t.message||t.message||"error";this._toast=`Apply failed: ${e}`}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const t=this._captureName.trim();if(t){this._busy=!0,this._toast="";try{const e=await async function(t,e,i,s){return(await qo(t,{type:"wled_studio/scene_capture",controller_id:e,name:i,scene_id:s?.sceneId,layout_id:s?.layoutId,transition_ms:2500})).scene??{id:"",controller_id:e,name:i,wled_state:{}}}(this.connection,this.controllerId,t);this._captureName="",this._toast=`Saved ${e.name}`,await this._load()}catch(t){this._toast=`Save failed: ${t.message||"error"}`}finally{this._busy=!1}}}async _delete(t){if(this.connection&&confirm(`Delete scene "${t.name}"?`)){this._busy=!0;try{await async function(t,e,i){await qo(t,{type:"wled_studio/scene_delete",controller_id:e,scene_id:i})}(this.connection,this.controllerId,t.id),this._toast=`Deleted ${t.name}`,await this._load()}catch{this._toast="Delete failed"}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const t=this._scenes.find(t=>t.id===this._conflict?.id);if(t){this._busy=!0;try{await async function(t,e,i,s){try{return(await qo(t,{type:"wled_studio/scene_save",controller_id:e,scene:i,if_match_etag:s?.ifMatchEtag})).scene??i}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new jo(e.data.scene,String(e.data.etag??e.message??""));throw t}}(this.connection,this.controllerId,t),this._conflict=void 0,this._toast="Scene overwritten",await this._load()}catch(t){t instanceof jo&&(this._conflict=t.remote)}finally{this._busy=!1}}}static{this.styles=[..._t,o`
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
      .status {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .toast {
        font-size: 0.9rem;
        opacity: 0.85;
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
    `]}};t([ct({attribute:!1})],Zo.prototype,"connection",void 0),t([ct()],Zo.prototype,"controllerId",void 0),t([ct({type:Boolean})],Zo.prototype,"compact",void 0),t([dt()],Zo.prototype,"_scenes",void 0),t([dt()],Zo.prototype,"_status",void 0),t([dt()],Zo.prototype,"_busy",void 0),t([dt()],Zo.prototype,"_toast",void 0),t([dt()],Zo.prototype,"_conflict",void 0),t([dt()],Zo.prototype,"_captureName",void 0),t([dt()],Zo.prototype,"_segments",void 0),t([dt()],Zo.prototype,"_applySegIds",void 0),t([dt()],Zo.prototype,"_snapshot",void 0),Zo=t([yt("wled-view-scenes")],Zo);let Jo=class extends mt{constructor(){super(...arguments),this._controllers=[],this._status="Loading…",this._cardUrl="",this._cardToast=""}onPoweredConnect(){this._load()}async _load(){if(this.connection)try{const t=await Ct(this.connection);this._controllers=t.map(t=>({entry_id:String(t.entry_id??""),title:t.title,host:t.host,pixel_count:t.pixel_count,fw_ver:t.fw_ver,master_entity_id:t.master_entity_id})),this._status=0===this._controllers.length?"No WLED Studio controllers. Add the integration under Settings → Devices & services.":""}catch{this._status="Could not list controllers."}}render(){return W`
      <div class="wrap">
        <h2>Devices</h2>
        <p class="hint">
          WLED Studio attaches to your stock WLED integration. Select a controller in the sidebar
          views (Layout, Scenes, Segments).
        </p>
        ${this._status?W`<p>${this._status}</p>`:null}
        <ul class="list">
          ${this._controllers.map(t=>W`
              <li class="card">
                <strong>${t.title??t.entry_id}</strong>
                <span>${t.host??"—"}</span>
                <span>${t.pixel_count??"?"} LEDs</span>
                ${t.fw_ver?W`<span class="dim">WLED ${t.fw_ver}</span>`:null}
                ${t.master_entity_id?W`<code class="entity">${t.master_entity_id}</code>`:null}
              </li>
            `)}
        </ul>

        <section class="card-section">
          <h3>Lovelace card</h3>
          <p class="hint">
            The dashboard card is registered automatically on startup. If it is missing from
            <strong>Settings → Dashboards → Resources</strong>, register it here or open
            <strong>Settings → Devices & services → WLED Studio → Configure</strong>.
          </p>
          ${this._cardUrl?W`<code class="resource-url">${this._cardUrl}</code>`:null}
          <button
            type="button"
            class="primary"
            ?disabled=${!this.connection}
            @click=${()=>this._registerCard()}
          >
            Register card resource
          </button>
          ${this._cardToast?W`<p class="toast" role="status">${this._cardToast}</p>`:null}
        </section>
      </div>
    `}async _registerCard(){if(this.connection){this._cardToast="";try{const{url:t}=await async function(t){return{url:(await t.sendMessagePromise({type:"wled_studio/register_lovelace_resource",schema_version:1})).url??""}}(this.connection);this._cardUrl=t,this._cardToast=t?"Card resource registered. Hard-refresh dashboards (Ctrl+F5).":"Registration sent — check HA logs if the card still does not appear."}catch(t){this._cardToast=t instanceof Error?t.message:String(t)}}}static{this.styles=[..._t,o`
      .wrap {
        max-width: 640px;
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 16px 0 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .card-section {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }
      .card-section h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .resource-url {
        display: block;
        margin: 8px 0;
        font-size: 0.75rem;
        word-break: break-all;
      }
      .primary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .toast {
        font-size: 0.85rem;
        color: var(--primary-color);
        margin-top: 8px;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 14px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .dim {
        opacity: 0.65;
        font-size: 0.85rem;
      }
      .entity {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    `]}};t([ct({attribute:!1})],Jo.prototype,"connection",void 0),t([dt()],Jo.prototype,"_controllers",void 0),t([dt()],Jo.prototype,"_status",void 0),t([dt()],Jo.prototype,"_cardUrl",void 0),t([dt()],Jo.prototype,"_cardToast",void 0),Jo=t([yt("wled-view-devices")],Jo);const Qo={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ta=class extends mt{constructor(){super(...arguments),this.controllerId="",this._segments=[],this._editIds=[],this._focusSegId=0,this._filter="",this._status="Loading effects…",this._toast="",this._mergeActive=!1}onPoweredConnect(){this._mergeActive=Wt(this.controllerId),this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _load(){if(this.connection&&this.controllerId){this._status="Loading effects…";try{if(this._snapshot=await Pt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id),e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:t,t.includes(this._focusSegId)||(this._focusSegId=this._segments[0].id)}this._mergeActive=Wt(this.controllerId),this._mergeActive&&(this._editIds=qt(this._segments),this._focusSegId=this._editIds[0]??0),await this._refreshMeta(),this._status=""}catch{this._status="Could not load device state."}}}_activeSeg(){return this._segments.find(t=>t.id===this._focusSegId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await $t(this.connection,this.controllerId,t.fx??0))}selectSegmentFromPreview(t){if(this._mergeActive)return this._focusSegId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._focusSegId=t,this._refreshMeta()}_onSegToggle(t){if(this._mergeActive)return;let e=Tt(this._editIds,t.detail.id);e.length||(e=[t.detail.id]),this._editIds=e,this._focusSegId=t.detail.id,this._refreshMeta()}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this._mergeActive){const t=qt(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._focusSegId]}_onMergeChanged(){this._mergeActive=Wt(this.controllerId),this._load()}render(){const t=this._snapshot,e=this._activeSeg(),i=e?.fx??0,s=this._meta,n=s?.sliders??{},r=this._targetIds().length;return W`
      <div class="wrap">
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
        ${this._status?W`<p>${this._status}</p>`:null}
        ${this._toast?W`<p class="toast" role="status">${this._toast}</p>`:null}

        ${this.connection&&this.controllerId?W`
              <wled-effect-merge-toggle
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `:null}
        ${this._segments.length&&!this._mergeActive?W`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${t?.segment_entities??[]}
                hint="Apply effects to highlighted segments"
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `:null}

        ${t&&e?W`
              <input
                class="search"
                type="search"
                placeholder="Search effects…"
                aria-label="Filter effects"
                .value=${this._filter}
                @input=${t=>{this._filter=t.target.value}}
              />
              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${t.fw_ver??t.info?.ver??""}
                .thumbBasenames=${t.thumb_basenames??[]}
                .effectsByName=${t.effects_by_name??{}}
                .soundFlags=${t.sound_flags??[]}
                .selectedFx=${i}
                .filter=${this._filter}
                @effect-select=${t=>this._onFx(t.detail.effectId,t.detail.toggledOff)}
              ></wled-effect-chips>

              <div class="sliders">
                ${Object.entries(Qo).map(([t,i])=>{if(!n[t])return null;const s=e[t];return W`
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
              <p class="meta">
                ${r} segment${1===r?"":"s"} · effect
                #${i}
              </p>
            `:null}
      </div>
    `}async _onFx(t,e){if(!this.connection||!this._snapshot)return;const i=this._targetIds(),s=Lt(i,{fx:t,on:!0},this._segments);try{await It(this.connection,this.controllerId,s);for(const e of i){const i=this._segments.findIndex(t=>t.id===e);if(i>=0){const e=[...this._segments];e[i]={...e[i],fx:t,on:!0},this._segments=e}}this._focusSegId=i[0],await this._refreshMeta();const n=Object.entries(this._snapshot.effects_by_name).find(([,e])=>e===t)?.[0]??(e?"Solid":`#${t}`);this._toast=e?`Solid on ${i.length} segment(s)`:`Applied ${n}`,this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){this._toast=`Apply failed: ${t.message||"error"}`}}_slider(t,e){if(!this.connection||!this._snapshot)return;const i=Number(e.target.value),s=this._targetIds(),n=Lt(s,{[t]:i},this._segments);It(this.connection,this.controllerId,n).then(()=>{const e=[...this._segments];for(const n of s){const s=e.findIndex(t=>t.id===n);s>=0&&(e[s]={...e[s],[t]:i})}this._segments=e})}static{this.styles=[..._t,o`
      .wrap {
        max-width: 100%;
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
      .toast {
        color: var(--primary-color);
        font-size: 0.9rem;
      }
      .sliders {
        display: grid;
        gap: 8px;
        max-width: 320px;
        margin-top: 12px;
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
    `]}};function ea(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function ia(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function sa(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function na(t,e){await St(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(Rt(t))}}async function ra(t,e,i,s){const n=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),r=s?.brush,o=s?.fill,a=r?sa(r,s?.effectsByName??{}):"color";await na(t,{type:"wled_studio/paint_frame",controller_id:e,data:n,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...r?{brush:r}:{},...o?{fill:o}:{},..."effect"===a&&r?{effect_id:r.fx}:{}})}async function oa(t,e,i=!0){await na(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function aa(t,e,i){const s=i?4:3,n=new Uint8ClampedArray(4*e);for(let r=0;r<e;r++){const e=r*s,o=4*r;n[o]=t[e]??0,n[o+1]=t[e+1]??0,n[o+2]=t[e+2]??0,n[o+3]=i?t[e+3]??0:255}return n}t([ct({attribute:!1})],ta.prototype,"connection",void 0),t([ct()],ta.prototype,"controllerId",void 0),t([dt()],ta.prototype,"_snapshot",void 0),t([dt()],ta.prototype,"_segments",void 0),t([dt()],ta.prototype,"_editIds",void 0),t([dt()],ta.prototype,"_focusSegId",void 0),t([dt()],ta.prototype,"_filter",void 0),t([dt()],ta.prototype,"_status",void 0),t([dt()],ta.prototype,"_toast",void 0),t([dt()],ta.prototype,"_meta",void 0),t([dt()],ta.prototype,"_mergeActive",void 0),ta=t([yt("wled-view-effects")],ta);const la={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let ha=class extends mt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await Pt(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=Rt(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await $t(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=Nt(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value,s=t.startsWith("o")?Number(i)>0:Number(i);this._emit({[t]:s})}render(){if(!this.settings)return null;const t=Mt(this.settings.col),e=this._meta,i=e?.sliders??{},s=this._snapshot?.rgbwm??0;return W`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error?W`<p class="err">${this._error}</p>`:null}
        ${this.showOnToggle?W`
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

        ${this._loadingEffects?W`<p class="muted">Loading effects…</p>`:W`
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
                ${Object.entries(la).map(([t,e])=>{if(!i[t])return null;const s=this.settings[t];return"boolean"==typeof s?W`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${s}
                          @change=${e=>this._slider(t,e)}
                        />
                        ${e}
                      </label>
                    `:W`
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
    `]}};t([ct({attribute:!1})],ha.prototype,"connection",void 0),t([ct({attribute:!1})],ha.prototype,"hass",void 0),t([ct()],ha.prototype,"controllerId",void 0),t([ct()],ha.prototype,"heading",void 0),t([ct({attribute:!1})],ha.prototype,"settings",void 0),t([ct({type:Boolean})],ha.prototype,"showOnToggle",void 0),t([dt()],ha.prototype,"_loadingEffects",void 0),t([dt()],ha.prototype,"_error",void 0),t([dt()],ha.prototype,"_snapshot",void 0),t([dt()],ha.prototype,"_meta",void 0),t([dt()],ha.prototype,"_effectFilter",void 0),ha=t([yt("wled-paint-settings")],ha);let ca=class extends mt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=ea(),this._fill=ia("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,n=0;const r=(...r)=>{s=r;const o=Date.now(),a=o-n;if(a>=e)return n=o,i&&(clearTimeout(i),i=void 0),void t(...r);i||(i=setTimeout(()=>{i=void 0,n=Date.now(),s&&t(...s)},e-a))};return r.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},r}(()=>{this._flushNow()},20),this._flushEffect=kt(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===sa(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([Pt(this.connection,this.controllerId),Xi(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=ea(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=Rt(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await oa(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return na(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=Rt(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=aa(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,n=4*s;i[n]=this._buffer[t]??0,i[n+1]=this._buffer[t+1]??0,i[n+2]=this._buffer[t+2]??0,i[n+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=aa(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await oa(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=Rt(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await ra(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=Rt(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=ia(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await oa(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=Rt(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await oa(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=Rt(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return W`
      <section class="paint ${e?"compact":""}">
        ${e?null:W`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn?W`<p class="warn">${this._warn}</p>`:null}

        ${!this.embedMode&&this._layouts.length>1?W`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(t=>W`<option value=${t.id}>${t.name||t.id}</option>`)}
                </select>
              </label>
            `:t?null:W`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode?W`open <strong>Studio → Layout</strong> first.`:W`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `}

        ${this.embedMode?null:W`
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
            ${"custom"===this._fill.mode?W`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${!0}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `:"preserve"===this._fill.mode?W`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`:W`<p class="hint">Unpainted LEDs commit as off.</p>`}
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
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};t([ct({attribute:!1})],ca.prototype,"connection",void 0),t([ct({attribute:!1})],ca.prototype,"hass",void 0),t([ct()],ca.prototype,"controllerId",void 0),t([ct({type:Boolean,attribute:"embed-mode"})],ca.prototype,"embedMode",void 0),t([ct()],ca.prototype,"embedLayoutId",void 0),t([ct()],ca.prototype,"embedFixtureId",void 0),t([ct({type:Number})],ca.prototype,"embedPixelCount",void 0),t([dt()],ca.prototype,"_pixelCount",void 0),t([dt()],ca.prototype,"_rgbw",void 0),t([dt()],ca.prototype,"_active",void 0),t([dt()],ca.prototype,"_brush",void 0),t([dt()],ca.prototype,"_fill",void 0),t([dt()],ca.prototype,"_brushSize",void 0),t([dt()],ca.prototype,"_status",void 0),t([dt()],ca.prototype,"_warn",void 0),t([dt()],ca.prototype,"_effectsByName",void 0),t([dt()],ca.prototype,"_layouts",void 0),t([dt()],ca.prototype,"_layoutId",void 0),t([dt()],ca.prototype,"_fixtureId",void 0),t([ut("wled-geometry-preview")],ca.prototype,"_internalPreview",void 0),ca=t([yt("wled-view-paint")],ca);let da=class extends mt{constructor(){super(...arguments),this.controllerId="",this._thumbStatus="",this._capturing=!1}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const e=t.subscribeEvents(t=>{const e=t.data??{},i=String(e.status??"");"started"===i?(this._thumbStatus=`Capturing 0/${e.total??"?"}`,this._capturing=!0):"progress"===i?(this._thumbStatus=`${e.done}/${e.total}: ${e.name}`,this._capturing=!0):"complete"===i||"cancelled"===i?(this._thumbStatus="complete"===i?"Thumbnails complete — open Effects to view tiles":"Cancelled",this._capturing=!1):"error"===i&&(this._thumbStatus=String(e.message??"Error"),this._capturing=!1),this.requestUpdate()},"wled_studio_thumb_progress");this.addUnsub(()=>{e.then(t=>t?.())})}async _recapture(){if(this.connection&&this.controllerId){this._capturing=!0,this._thumbStatus="Starting capture…";try{await async function(t,e){await na(t,{type:"wled_studio/thumb_capture_start",controller_id:e})}(this.connection,this.controllerId)}catch(t){this._capturing=!1,this._thumbStatus=Rt(t)}}}async _cancelCapture(){this.connection&&this.controllerId&&(await async function(t,e){await na(t,{type:"wled_studio/thumb_capture_cancel",controller_id:e})}(this.connection,this.controllerId),this._capturing=!1,this._thumbStatus="Cancel requested")}_clearOnboard(){localStorage.removeItem("wled_studio.onboarded"),this._thumbStatus="Onboarding flag cleared — reload Studio"}render(){return W`
      <section class="settings">
        <h2>Settings</h2>
        <div class="card">
          <h3>Effect thumbnails</h3>
          <p>Captures ~2s WebP loops per effect (several minutes total).</p>
          <div class="row">
            <button
              type="button"
              ?disabled=${this._capturing}
              @click=${()=>this._recapture()}
            >
              Recapture thumbnails
            </button>
            ${this._capturing?W`
                  <button type="button" @click=${()=>this._cancelCapture()}>
                    Cancel
                  </button>
                `:null}
          </div>
          <p class="status">${this._thumbStatus}</p>
        </div>
        <div class="card">
          <h3>Onboarding</h3>
          <button type="button" @click=${()=>this._clearOnboard()}>
            Reset first-run wizard
          </button>
        </div>
      </section>
    `}static{this.styles=[..._t,o`
      .settings h2 {
        margin: 0 0 12px;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin-bottom: 12px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};t([ct({attribute:!1})],da.prototype,"connection",void 0),t([ct()],da.prototype,"controllerId",void 0),t([dt()],da.prototype,"_thumbStatus",void 0),t([dt()],da.prototype,"_capturing",void 0),da=t([yt("wled-view-settings")],da);let ua=class extends mt{constructor(){super(...arguments),this.controllerId="",this._fft=Array(16).fill(0),this._peak=0}onPoweredConnect(){const t=this.hass?.connection;if(!t?.subscribeEvents)return;const e=t.subscribeEvents(t=>{const e=t.data??{};e.controller_id&&e.controller_id!==this.controllerId||(Array.isArray(e.fft)&&(this._fft=e.fft.slice(0,16)),"number"==typeof e.sample_peak&&(this._peak=e.sample_peak))},"wled_studio_audio_frame");this.addUnsub(()=>{e.then(t=>t?.())})}render(){const t=Math.max(1,...this._fft);return W`
      <section class="audio">
        <p>16-band FFT (UDP audiosync, 10 Hz)</p>
        <div class="bars" role="img" aria-label="FFT levels">
          ${this._fft.map((e,i)=>W`
              <div
                class="bar"
                style="height:${Math.round(e/t*100)}%"
                title="Band ${i+1}: ${e}"
              ></div>
            `)}
        </div>
        <p class="peak">Peak: ${this._peak}</p>
      </section>
    `}static{this.styles=[..._t,o`
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 120px;
      }
      .bar {
        flex: 1;
        min-width: 8px;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
      }
      .peak {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `]}};t([ct()],ua.prototype,"controllerId",void 0),t([dt()],ua.prototype,"_fft",void 0),t([dt()],ua.prototype,"_peak",void 0),ua=t([yt("wled-view-audio")],ua);let pa=class extends mt{constructor(){super(...arguments),this.controllerId="",this._scenes=[]}async onPoweredConnect(){if(this.connection&&this.controllerId)try{this._scenes=await Ko(this.connection,this.controllerId)}catch{this._scenes=[]}}render(){return W`
      <section class="voice">
        <p>
          Saved scenes are exposed as <code>scene.*</code> entities. Add aliases in
          Settings → Devices &amp; services → Entities for Assist phrases like
          “party mode” or “movie time”.
        </p>
        <p class="hint">
          Sentence trigger (integration): <em>make {entity} {effect}</em>
        </p>
        <ul>
          ${this._scenes.map(t=>W`
              <li>
                <strong>${t.name}</strong>
                <span class="id">scene.wled_studio_${t.id}</span>
              </li>
            `)}
        </ul>
      </section>
    `}static{this.styles=[..._t,o`
      .hint {
        opacity: 0.85;
      }
      ul {
        padding-left: 1.2rem;
      }
      .id {
        display: block;
        font-size: 0.8rem;
        opacity: 0.7;
        font-family: monospace;
      }
    `]}};t([ct({attribute:!1})],pa.prototype,"connection",void 0),t([ct()],pa.prototype,"controllerId",void 0),t([dt()],pa.prototype,"_scenes",void 0),pa=t([yt("wled-view-voice")],pa);let ga=class extends mt{constructor(){super(...arguments),this.controllerId="",this._minutes=15,this._status=""}async _sleepFade(){if(this.connection&&this.controllerId){this._status="Starting sleep fade…";try{const t=await Pt(this.connection,this.controllerId),e=t.state?.bri??t.segments?.[0]?.bri??128,i=Math.max(4,Math.min(30,Math.floor(2*this._minutes))),s=60*this._minutes*1e3/i;for(let t=0;t<=i;t++){const n=Math.round(e*(1-t/i));await It(this.connection,this.controllerId,{bri:n,on:t<i,tt:Math.min(25,Math.ceil(s/100))}),t<i&&await new Promise(t=>setTimeout(t,s))}this._status=`Sleep fade complete (${this._minutes} min)`}catch(t){this._status=t instanceof Error?t.message:String(t)}}}render(){return W`
      <section class="schedules">
        <h2>Schedules</h2>
        <p class="lead">
          Sleep timer fades brightness to off over the selected duration using device-side
          <code>tt</code> crossfade steps.
        </p>
        <div class="card">
          <h3>Sleep timer</h3>
          <label>
            Minutes
            <input
              type="number"
              min="1"
              max="120"
              .value=${String(this._minutes)}
              @change=${t=>{this._minutes=parseInt(t.target.value,10)}}
            />
          </label>
          <button type="button" @click=${()=>this._sleepFade()}>
            Start sleep fade
          </button>
        </div>
        <p class="status">${this._status}</p>
        <p class="hint">
          Sunrise alarms and multi-controller groups are planned; use HA automations with
          <code>wled_studio.notify</code> for doorbell flashes today.
        </p>
      </section>
    `}static{this.styles=[..._t,o`
      .schedules h2 {
        margin: 0 0 8px;
      }
      .lead {
        opacity: 0.85;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin: 12px 0;
      }
      .card h3 {
        margin: 0 0 8px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .status {
        font-size: 0.85rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    `]}};t([ct({attribute:!1})],ga.prototype,"connection",void 0),t([ct()],ga.prototype,"controllerId",void 0),t([dt()],ga.prototype,"_minutes",void 0),t([dt()],ga.prototype,"_status",void 0),ga=t([yt("wled-view-schedules")],ga);let fa=class extends mt{constructor(){super(...arguments),this.controllerId="",this.host="",this.controllerTitle="",this._frameKey=0,this._skinStatus="",this._skinBusy=!1}onPoweredConnect(){this._maybeApplyEmbedSkin()}updated(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._maybeApplyEmbedSkin()}_skinStorageKey(){return`wled_studio.embed_skin_applied.${this.controllerId}`}async _maybeApplyEmbedSkin(){if(this.connection&&this.controllerId&&this.host){try{if(localStorage.getItem(this._skinStorageKey()))return}catch{}await this._applyEmbedSkin(!0)}}async _applyEmbedSkin(t=!1){if(this.connection&&this.controllerId){this._skinBusy=!0,t||(this._skinStatus="Applying outline style to WLED…");try{await this.connection.sendMessagePromise({type:"wled_studio/apply_embed_skin",schema_version:1,controller_id:this.controllerId});try{localStorage.setItem(this._skinStorageKey(),"1")}catch{}this._skinStatus="Segment selection uses outline only (skin.css on device). Reload if needed.",this._reloadFrame()}catch(t){this._skinStatus=Rt(t)}finally{this._skinBusy=!1}}}_firmwareUrl(){const t=(this.host??"").trim();if(!t)return"";const e=/^https?:\/\//i.test(t)?t:`http://${t}`;if(!this._frameKey)return e;const i=e.includes("?")?"&":"?";return`${e}${i}_reload=${this._frameKey}`}_reloadFrame(){this._frameKey+=1}render(){const t=this._firmwareUrl(),e=this.controllerTitle||"WLED controller";return W`
      <section class="firmware" aria-label="WLED firmware UI">
        <header class="head">
          <h2>Controller</h2>
          <p class="hint">
            Native WLED web UI for <strong>${e}</strong>. Selected segments use
            an outline only (no gray fill) after Studio applies
            <code>skin.css</code> once per controller. Some browsers block HTTP
            devices inside HTTPS Home Assistant — use
            <strong>Open in new tab</strong> if the frame stays blank.
          </p>
        </header>

        ${t?W`
              <div class="toolbar">
                <a class="link" href=${t} target="_blank" rel="noopener noreferrer">
                  <ha-icon icon="mdi:open-in-new"></ha-icon>
                  Open in new tab
                </a>
                <button
                  type="button"
                  class="ghost"
                  ?disabled=${this._skinBusy}
                  @click=${()=>this._applyEmbedSkin(!1)}
                >
                  <ha-icon icon="mdi:format-textbox"></ha-icon>
                  Outline segments
                </button>
                <button type="button" class="ghost" @click=${this._reloadFrame}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  Reload
                </button>
                <span class="url" title=${t}>${t}</span>
              </div>
              ${this._skinStatus?W`<p class="skin-status">${this._skinStatus}</p>`:null}
              <div class="frame-wrap">
                <iframe
                  src=${t}
                  title=${`WLED firmware — ${e}`}
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                ></iframe>
              </div>
            `:W`
              <p class="empty">
                No host address for this controller. Reload the integration or pick
                another device in the header.
              </p>
            `}
      </section>
    `}static{this.styles=[..._t,o`
      .firmware {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 0;
      }
      .head h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.88rem;
        opacity: 0.8;
        max-width: 42rem;
      }
      .hint code {
        font-size: 0.85em;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }
      .link,
      .ghost {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }
      .link {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ghost {
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
      }
      .ghost:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .skin-status {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .url {
        font-size: 0.78rem;
        opacity: 0.65;
        word-break: break-all;
        flex: 1;
        min-width: 8rem;
      }
      .frame-wrap {
        flex: 1;
        min-height: min(72vh, 720px);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: #111;
      }
      iframe {
        display: block;
        width: 100%;
        height: min(72vh, 720px);
        border: none;
        background: #111;
      }
      .empty {
        opacity: 0.75;
        font-size: 0.9rem;
      }
    `]}};t([ct({attribute:!1})],fa.prototype,"connection",void 0),t([ct()],fa.prototype,"controllerId",void 0),t([ct()],fa.prototype,"host",void 0),t([ct()],fa.prototype,"controllerTitle",void 0),t([dt()],fa.prototype,"_frameKey",void 0),t([dt()],fa.prototype,"_skinStatus",void 0),t([dt()],fa.prototype,"_skinBusy",void 0),fa=t([yt("wled-view-firmware")],fa);const _a="wled-studio-panel",ma="wled_studio.onboarded";class va extends mt{constructor(){super(...arguments),this._view="devices",this._controllerId="",this._controllers=[],this._drawerOpen=!1,this._previewSegId=-1,this._showOnboard=!1}onPoweredConnect(){try{this._showOnboard=!localStorage.getItem(ma)}catch{this._showOnboard=!1}this._loadController()}async _loadController(){if(this.hass?.connection)try{const t=await Ct(this.hass.connection);if(this._controllers=t,this._controllerId&&t.some(t=>t.entry_id===this._controllerId))return;const e=t[0];e?.entry_id&&(this._controllerId=String(e.entry_id))}catch{}}_dismissOnboard(){try{localStorage.setItem(ma,"1")}catch{}this._showOnboard=!1}_onControllerPick(t){const e=t.target.value;e&&(this._controllerId=e)}render(){const t=this.remote.state;return W`
      <div class="shell" role="application" aria-label="WLED Studio">
        ${Boolean(window.__WLED_STUDIO_STALE__)?W`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `:null}
        <div
          class="drawer-backdrop ${this._drawerOpen?"visible":""}"
          aria-hidden=${this._drawerOpen?"false":"true"}
          @click=${()=>this._closeDrawer()}
        ></div>
        <aside
          class="rail ${this._drawerOpen?"open":""}"
          aria-label="Navigation"
        >
          <div class="rail-head">
            <span class="rail-title">Sections</span>
            <button
              type="button"
              class="drawer-close cq-compact"
              aria-label="Close menu"
              @click=${()=>this._closeDrawer()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <nav class="rail-nav">
            ${this._navItem("devices","Devices","mdi:devices")}
            ${this._navItem("layout","Layout","mdi:vector-polygon")}
            ${this._navItem("scenes","Scenes","mdi:palette-swatch")}
            ${this._navItem("effects","Effects","mdi:auto-fix")}
            ${this._navItem("paint","Paint","mdi:brush")}
            ${this._navItem("segments","Segments","mdi:vector-line")}
            ${this._navItem("firmware","Controller","mdi:web")}
            ${this._navItem("audio","Audio","mdi:music")}
            ${this._navItem("voice","Voice","mdi:microphone-message")}
            ${this._navItem("schedules","Schedules","mdi:clock-outline")}
            ${this._navItem("settings","Settings","mdi:cog")}
          </nav>
        </aside>
        <main class="stage">
          <header class="top">
            <button
              type="button"
              class="hamburger cq-compact"
              aria-label="Open menu"
              aria-expanded=${this._drawerOpen?"true":"false"}
              @click=${()=>this._toggleDrawer()}
            >
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>
            <h1>WLED Studio</h1>
            ${this._controllers.length>1?W`
                  <label class="controller-pick">
                    <span class="sr-only">Controller</span>
                    <select
                      aria-label="WLED controller"
                      @change=${this._onControllerPick}
                    >
                      ${this._controllers.map(t=>W`
                          <option
                            value=${t.entry_id}
                            ?selected=${t.entry_id===this._controllerId}
                          >
                            ${t.title??t.entry_id}
                          </option>
                        `)}
                    </select>
                  </label>
                `:null}
            ${t.isRemote?W`<span class="remote-pill">Remote preview</span>`:null}
          </header>
          <section
            class="content"
            aria-live="polite"
            @wled-preview-refresh=${()=>this.refreshLivePreview()}
          >
            ${this._showOnboard?W`
                  <div class="onboard" role="dialog" aria-label="Welcome">
                    <h2>Welcome to WLED Studio</h2>
                    <p>
                      Draw your install in <strong>Layout</strong>, save
                      <strong>Scenes</strong>, browse <strong>Effects</strong> with captured
                      thumbnails, and paint in realtime over DDP.
                    </p>
                    <ol>
                      <li>Pick your controller in the header (if you have several).</li>
                      <li>Open Layout → apply segments from anchors.</li>
                      <li>Settings → Recapture thumbnails once (takes several minutes).</li>
                    </ol>
                    <button type="button" @click=${()=>this._dismissOnboard()}>
                      Get started
                    </button>
                  </div>
                `:null}
            ${this._renderPreview()}
            ${this._renderView()}
          </section>
        </main>
      </div>
    `}_navItem(t,e,i){const s=this._view===t;return W`
      <button
        class="nav ${s?"active":""}"
        aria-current=${s?"page":"false"}
        @click=${()=>this._selectView(t)}
      >
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </button>
    `}_viewsWithStripPreview(){return"scenes"===this._view||"effects"===this._view||"segments"===this._view}_renderPreview(){const t=this.hass?.connection,e=this._controllerId;return t&&e&&this._viewsWithStripPreview()?W`
      <wled-studio-live-preview
        .connection=${t}
        .controllerId=${e}
        .selectedSegId=${this._previewSegId}
        @segment-select=${this._onPreviewSegmentSelect}
      ></wled-studio-live-preview>
    `:null}_onPreviewSegmentSelect(t){const e=t.detail.segmentId;this._previewSegId=e,"segments"===this._view?this.renderRoot.querySelector("wled-segment-controls")?.selectSegment(e):"effects"===this._view?this.renderRoot.querySelector("wled-view-effects")?.selectSegmentFromPreview(e):"scenes"===this._view&&this.renderRoot.querySelector("wled-view-scenes")?.selectSegmentFromPreview(e)}_livePreview(){return this.renderRoot.querySelector("wled-studio-live-preview")??null}refreshLivePreview(){this._livePreview()?.refreshSegments()}_renderView(){const t=this.hass?.connection,e=this._controllerId;if("devices"!==this._view&&"settings"!==this._view&&!e)return W`
        <p>
          Connect a WLED Studio controller under
          <strong>Settings → Devices & services</strong>, then reload this panel.
        </p>
      `;if("devices"===this._view&&t)return W`
        <wled-view-devices .connection=${t}></wled-view-devices>
      `;if("layout"===this._view&&t&&e)return W`
        <wled-view-layout
          .connection=${t}
          .hass=${this.hass}
          .controllerId=${e}
        ></wled-view-layout>
      `;if("scenes"===this._view&&t&&e)return W`
        <wled-view-scenes .connection=${t} .controllerId=${e}></wled-view-scenes>
      `;if("effects"===this._view&&t&&e)return W`
        <wled-view-effects
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
        ></wled-view-effects>
      `;if("segments"===this._view&&t&&e){const i=this._controllers.find(t=>t.entry_id===e)?.master_entity_id??"";return W`
        <wled-segment-controls
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
          .masterEntity=${i}
        ></wled-segment-controls>
      `}if("paint"===this._view&&t&&e)return W`
        <wled-view-paint
          .hass=${this.hass}
          .connection=${t}
          .controllerId=${e}
        ></wled-view-paint>
      `;if("firmware"===this._view&&t&&e){const i=this._controllers.find(t=>t.entry_id===e);return W`
        <wled-view-firmware
          .connection=${t}
          .controllerId=${e}
          .host=${i?.host??""}
          .controllerTitle=${i?.title??e}
        ></wled-view-firmware>
      `}return"audio"===this._view&&e?W`<wled-view-audio .controllerId=${e}></wled-view-audio>`:"voice"===this._view&&t&&e?W`
        <wled-view-voice .connection=${t} .controllerId=${e}></wled-view-voice>
      `:"schedules"===this._view&&t&&e?W`
        <wled-view-schedules .connection=${t} .controllerId=${e}></wled-view-schedules>
      `:"settings"===this._view&&t&&e?W`
        <wled-view-settings .connection=${t} .controllerId=${e}></wled-view-settings>
      `:W`<p>Select a section from the menu.</p>`}_selectView(t){const e="paint"===this._view&&"paint"!==t;e&&this._abortActivePaint(),this._view=t,this._closeDrawer(),e&&this.refreshLivePreview()}async _abortActivePaint(){const t=this.renderRoot.querySelector("wled-view-paint");if(!t||!("cancelLiveIfActive"in t))return;const e=t;await e.cancelLiveIfActive()}_toggleDrawer(){this._drawerOpen=!this._drawerOpen}_closeDrawer(){this._drawerOpen=!1}static{this.styles=[..._t,o`
        .shell {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          min-height: 100%;
          background: var(--primary-background-color);
          position: relative;
        }
        .stale-banner {
          display: block;
          margin: 8px 12px 0;
          grid-column: 1 / -1;
        }
        @container wled-studio (min-width: 600px) {
          .shell {
            grid-template-columns: 200px 1fr;
          }
        }
        .drawer-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0, 0, 0, 0.45);
        }
        .drawer-backdrop.visible {
          display: block;
        }
        @container wled-studio (min-width: 600px) {
          .drawer-backdrop {
            display: none !important;
          }
        }
        .rail {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          width: min(280px, 86vw);
          height: 100%;
          max-height: 100dvh;
          padding: 8px;
          box-sizing: border-box;
          border-right: 1px solid var(--divider-color);
          background: var(--card-background-color, var(--primary-background-color));
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
          transform: translateX(-105%);
          transition: transform 0.2s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .rail.open {
          transform: translateX(0);
        }
        @container wled-studio (min-width: 600px) {
          .rail {
            position: static;
            z-index: auto;
            width: auto;
            height: auto;
            max-height: none;
            transform: none;
            box-shadow: none;
            transition: none;
          }
        }
        .rail-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 4px 12px;
        }
        .rail-title {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.65;
        }
        .drawer-close {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }
        @container wled-studio (min-width: 600px) {
          .drawer-close {
            display: none;
          }
          .rail-head {
            display: none;
          }
        }
        .rail-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
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
          font-size: 0.95rem;
        }
        .nav.active,
        .nav:hover {
          background: var(--secondary-background-color);
        }
        .stage {
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
          flex-shrink: 0;
        }
        .top h1 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .hamburger {
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          flex-shrink: 0;
        }
        @container wled-studio (min-width: 600px) {
          .hamburger {
            display: none;
          }
        }
        .controller-pick select {
          max-width: 200px;
          font-size: 0.85rem;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .onboard {
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 12px;
          border: 1px solid var(--primary-color);
          background: var(--secondary-background-color);
        }
        .onboard h2 {
          margin: 0 0 8px;
        }
        .onboard ol {
          margin: 8px 0 12px;
          padding-left: 1.2rem;
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
          min-height: 0;
          flex: 1;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
      `]}}t([dt()],va.prototype,"_view",void 0),t([dt()],va.prototype,"_controllerId",void 0),t([dt()],va.prototype,"_controllers",void 0),t([dt()],va.prototype,"_drawerOpen",void 0),t([dt()],va.prototype,"_previewSegId",void 0),t([dt()],va.prototype,"_showOnboard",void 0),function(){const t=window.__WLED_STUDIO_BUILD__;t&&t!==vt&&(window.__WLED_STUDIO_STALE__=!0),window.__WLED_STUDIO_BUILD__=vt}(),function(t,e){const i=customElements.get(t);i||customElements.define(t,e)}(_a,va),console.info("[wled-studio] panel bundle loaded",{panel:_a});export{_a as PANEL_TAG,va as WledStudioPanel};
//# sourceMappingURL=wled-studio-panel.js.map
