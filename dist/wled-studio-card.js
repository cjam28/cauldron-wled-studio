function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,S=t=>t,I=$.trustedTypes,k=I?I.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,A=`<${P}>`,M=document,T=()=>M.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,R=/>/g,D=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,U=/"/g,W=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,G=M.createTreeWalker(M,129);function X(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===z?"!--"===l[1]?r=B:void 0!==l[1]?r=R:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=n??z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?U:F):r===U||r===F?r=D:r===B||r===R?r=z:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===z?i+A:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=Y.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=I?I.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),G.nextNode(),a.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===H)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=L(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);G.currentNode=s;let n=G.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=G.nextNode(),o++)}return G.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),L(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of e)n===i.length?i.push(s=new t(this.O(T()),this.O(T()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!L(t)||t!==this._$AH&&t!==H,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],e,r),a===H&&(a=this._$AH[r]),o||=!L(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}};class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}let it=class extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===H)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(Y,Z),($.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Z(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}function pt(t,e){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut=r`
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
`,gt=r`
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
`,ft=r`
  :host {
    --wled-accent: var(--primary-color, #03a9f4);
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    --wled-surface: var(--card-background-color, #1e1e1e);
    --wled-surface-elevated: var(--secondary-background-color, #2a2a2a);
    --wled-text: var(--primary-text-color, #fff);
    --wled-text-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --wled-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --wled-radius: var(--ha-card-border-radius, 12px);
    --wled-radius-sm: 8px;
    --wled-radius-lg: 20px;
    --wled-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
    --wled-tap: 44px;
  }
`;class _t{constructor(t,e){this.host=t,this._hass=e,this._isRemote=!1,t.addController(this)}hostConnected(){this._refresh()}setHass(t){this._hass=t,this._refresh(),this.host.requestUpdate()}get state(){return{isRemote:this._isRemote,previewFps:this._isRemote?10:20,useBinaryPack:this._isRemote,disableBloom:this._isRemote}}_refresh(){if("undefined"==typeof location)return void(this._isRemote=!1);const t=location.hostname.endsWith(".ui.nabu.casa"),e=this._hass?.config?.external_url,i=!!e&&e.replace(/\/$/,"")===location.origin;this._isRemote=t||i}}const mt=[ft,ut,gt,r`
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
`];class vt extends rt{constructor(){super(...arguments),this.abort=new AbortController,this.rafIds=new Set,this.unsubs=new Set,this.remote=new _t(this),this._visible=!0,this._inView=!0}static{this.styles=mt}connectedCallback(){super.connectedCallback(),this._bindVisibility(),this._bindIntersection(),this.remote.setHass(this.hass),this.onPoweredConnect()}disconnectedCallback(){this.onPoweredDisconnect(),this._io?.disconnect(),this._io=void 0,this.abort.abort();for(const t of this.rafIds)cancelAnimationFrame(t);this.rafIds.clear();for(const t of this.unsubs)t();this.unsubs.clear(),super.disconnectedCallback()}updated(t){super.updated(t),t.has("hass")&&this.remote.setHass(this.hass)}get isPowered(){return this._visible&&this._inView}scheduleRaf(t){const e=requestAnimationFrame(i=>{this.rafIds.delete(e),this.isConnected&&!this.abort.signal.aborted&&t(i)});this.rafIds.add(e)}addUnsub(t){this.unsubs.add(t)}onPoweredConnect(){}onPoweredDisconnect(){}_bindVisibility(){document.addEventListener("visibilitychange",()=>{this._visible="visible"===document.visibilityState,this.requestUpdate()},{signal:this.abort.signal}),this._visible="visible"===document.visibilityState}_bindIntersection(){this._io=new IntersectionObserver(t=>{this._inView=t.some(t=>t.isIntersecting),this.requestUpdate()},{threshold:.01}),this._io.observe(this)}}t([ht({attribute:!1})],vt.prototype,"hass",void 0);const bt="0.11.4";function yt(t,e){const i=()=>e();return t.addEventListener("ready",i),()=>t.removeEventListener("ready",i)}const wt=/^[0-9a-fA-F]+$/;function xt(t,e,i,s){let n,o=!1;const r=async()=>{n?.(),n=void 0,o||(n=await t.subscribeMessage(t=>{const e=t.event?.data??("wled_studio_live_frame"===t.type?t.data:void 0);if(!e)return;const s=function(t){if(!t||"object"!=typeof t)return null;const e=t;if(Array.isArray(e.leds_hex)&&e.leds_hex.length>0){const t=e.leds_hex.map(t=>String(t).toLowerCase()),i=Number(e.n)>0?Number(e.n):t.length;return{leds_hex:t,n:i,channels:4===e.channels?4:3,scale:i/t.length,count:t.length}}const i=e.leds;if(!Array.isArray(i)||0===i.length)return null;const s=[];let n=3;for(const t of i){if("string"!=typeof t)continue;const e=t.trim().replace(/^#/,"");if(e&&e.length%2==0&&wt.test(e)){if(8===e.length)n=4;else if(6!==e.length)continue;s.push(e.toLowerCase())}}if(0===s.length)return null;let o=s.length;if(void 0!==e.n){const t=Number(e.n);Number.isFinite(t)&&t>0&&(o=t)}return{leds_hex:s,n:o,channels:n,scale:o/s.length,count:s.length}}(e);s&&i({...s,entry_id:e.entry_id,controller_id:e.controller_id,fps:e.fps})},{type:"wled_studio/subscribe_live",schema_version:1,controller_id:e,remote:s?.remote??!1}))};r();const a=yt(t,()=>{r()});return()=>{o=!0,a(),n?.(),n=void 0}}async function $t(t){t.connected||await new Promise((e,i)=>{const s=window.setTimeout(()=>{t.removeEventListener("ready",n),i(new Error("Home Assistant WebSocket not connected"))},15e3),n=()=>{t.connected&&(window.clearTimeout(s),t.removeEventListener("ready",n),e())};t.addEventListener("ready",n)})}async function St(t){await $t(t);try{return(await t.sendMessagePromise({type:"wled_studio/list_controllers",schema_version:1})).controllers??[]}catch(t){const e=t,i=e?.code?`${e.code}: ${e.message??"failed"}`:t instanceof Error?t.message:String(t);throw new Error(`wled_studio/list_controllers — ${i}`)}}function It(t,e,i=100){let s,n,o;const r=()=>{if(s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o){const e=o;o=void 0,t(...e)}},a=(...t)=>{o=t,s&&clearTimeout(s),s=setTimeout(r,e),n||(n=setTimeout(r,i))};return a.cancel=()=>{s&&clearTimeout(s),n&&clearTimeout(n),s=n=void 0,o=void 0},a}async function kt(t,e){await $t(t);return await t.sendMessagePromise({type:"wled_studio/get_state",schema_version:1,controller_id:e})}async function Ct(t,e,i,s){await $t(t);return(await t.sendMessagePromise({type:"wled_studio/apply_state",schema_version:1,controller_id:e,state:i,full_response:s?.fullResponse??!1})).state??{}}async function Et(t,e,i){return(await t.sendMessagePromise({type:"wled_studio/effect_meta",schema_version:1,controller_id:e,effect_id:i})).meta??{sliders:{},colors_enabled:!0,palette_enabled:!0,flag:null,defaults:{}}}async function Pt(t,e){await $t(t);return(await t.sendMessagePromise({type:"wled_studio/get_palette_previews",schema_version:1,controller_id:e})).palette_previews??{}}function At(t){return!t||t.length<3?[255,255,255,0]:[t[0]??0,t[1]??0,t[2]??0,t[3]??0]}function Mt(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){if("string"==typeof i){const t=i.replace("#","").trim();if(t.length>=6){e.push([parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),t.length>=8?parseInt(t.slice(6,8),16):0]);continue}}Array.isArray(i)&&e.push([Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,Number(i[3])||0])}return e}function Tt(t){const e=t.match(/_segment_(\d+)$/);return e?Number(e[1]):void 0}function Lt(t,e){for(const i of e){if(i.wled_segment_id===t)return i.entity_id;if(Tt(i.entity_id)===t)return i.entity_id;if(i.segment_index===t)return i.entity_id}}function Nt(t,e,i){const s=new Set(t),n=(i.length?i:t.map(t=>({id:t}))).map(t=>s.has(t.id)?{...e,id:t.id,sel:!0,on:void 0!==e.on?e.on:!1===t.on||t.on}:{id:t.id,sel:!1});return{seg:n}}async function Ot(t,e){return await $t(t),t.sendMessagePromise({...e,schema_version:1})}async function zt(t,e){return(await Ot(t,{type:"wled_studio/layout_list",controller_id:e})).layouts??[]}function Bt(t){if(!t)return 0;const e=t.attributes?.brightness_pct;if("number"==typeof e&&Number.isFinite(e))return Math.max(0,Math.min(100,Math.round(e)));const i=t.attributes?.brightness;return"number"==typeof i&&Number.isFinite(i)?Math.round(Math.max(0,Math.min(255,i))/255*100):"on"===t.state?100:0}function Rt(t){return Math.round(Math.max(0,Math.min(100,t))/100*255)}function Dt(t){return(e,i)=>{const s=customElements.get(t);return s||(customElements.define(t,e),e)}}const Ft=.55,Ut=1,Wt=1,jt=0,Ht=0,qt=0,Vt=1,Gt=0,Xt=0,Yt=1,Jt=1;function Kt(t){return function(t,e){return t?{url:t,opacity:e?.opacity??Ft,brightness:e?.brightness??Ut,saturation:e?.saturation??Wt,rotation:e?.rotation??jt,offsetX:e?.offsetX??Ht,offsetY:e?.offsetY??qt,scale:e?.scale??Vt,cropX:e?.cropX??Gt,cropY:e?.cropY??Xt,cropW:e?.cropW??Yt,cropH:e?.cropH??Jt}:null}(t.background?.url??t.background_url,t.background??null)}function Zt(t,e=!1){return new Promise((i,s)=>{const n=new Image;n.onload=()=>i(n),n.onerror=()=>s(new Error(`Could not load image (${t})`)),function(t,e,i=!1){let s=e;if(i&&!s.includes("?")&&(s=`${s}?v=${Date.now()}`),t.removeAttribute("crossorigin"),s.startsWith("http://")||s.startsWith("https://"))try{new URL(s,window.location.href).origin!==window.location.origin&&(t.crossOrigin="anonymous")}catch{t.crossOrigin="anonymous"}t.src=s}(n,t,e)})}let Qt=class extends vt{constructor(){super(...arguments),this.controllerId="",this.layoutId="",this.fixtureId="",this.pixelCount=210,this.dotRadius=4,this.compact=!1,this.heightPx=200,this.externalLive=!1,this.paintMode=!1,this.paintLivePreview=!1,this.paintBrushSize=6,this.segments=[],this.selectedSegId=-1,this.highlightSegIds=[],this._positions=[],this._status="waiting",this._showDots=!1,this._closed=!1,this._bgLayer=null,this._bgImage=null,this._raf=0,this._hoverLed=-1,this._painting=!1,this._lastLivePaintMs=0,this._onCanvasClick=t=>{if(this.paintMode)return;const e=this._ledAtEvent(t);if(e<0)return;const i=this._segmentForLed(e);i<0||this.dispatchEvent(new CustomEvent("segment-select",{detail:{segmentId:i,ledIndex:e},bubbles:!0,composed:!0}))},this._onPaintPointerDown=t=>{if(!this.paintMode)return;this._painting=!0,t.target.setPointerCapture(t.pointerId);const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerMove=t=>{if(!this.paintMode||!this._painting)return;const e=this._ledAtEvent(t);this._emitPaintStroke(e)},this._onPaintPointerUp=t=>{if(this.paintMode){this._painting=!1;try{t.target.releasePointerCapture(t.pointerId)}catch{}}},this._onPaintPointerLeave=()=>{this._painting=!1},this._onCanvasMove=t=>{const e=this._ledAtEvent(t);e!==this._hoverLed&&(this._hoverLed=e,this._schedPaint())},this._onCanvasLeave=()=>{this._hoverLed>=0&&(this._hoverLed=-1,this._schedPaint())}}setFrame(t){if(t&&(!this.paintMode||this.paintLivePreview)){if(this.paintMode&&this.paintLivePreview){const t=performance.now();if(t-this._lastLivePaintMs<50)return;this._lastLivePaintMs=t}this._pixels=function(t,e){const i=new Uint8ClampedArray(4*e);for(let s=0;s<e;s++){const e=Math.min(t.count-1,Math.max(0,Math.round(s/t.scale))),n=t.leds_hex[e]??"000000",o=4*s;8===n.length?(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=parseInt(n.slice(6,8),16)):(i[o]=parseInt(n.slice(0,2),16),i[o+1]=parseInt(n.slice(2,4),16),i[o+2]=parseInt(n.slice(4,6),16),i[o+3]=255)}return i}(t,this.pixelCount),this._status="live",this._schedPaint()}}setPaintPixels(t){this._paintPixels=t??void 0,this.paintMode&&(this._status=t?"paint":"ready"),this._schedPaint()}setStatus(t){this._status=t,this.requestUpdate()}async refresh(){await this._resolvePositions()}onPoweredConnect(){this._resolvePositions(),this._syncLiveSubscription()}onPoweredDisconnect(){this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObs?.disconnect(),this._unsubLive?.(),this._unsubLive=void 0}_wantsLiveStream(){return!this.externalLive||this.paintMode&&this.paintLivePreview}_syncLiveSubscription(){this._wantsLiveStream()?this._unsubLive||this._attachLiveStream():(this._unsubLive?.(),this._unsubLive=void 0)}updated(t){super.updated(t),(t.has("connection")||t.has("controllerId")||t.has("layoutId")||t.has("fixtureId"))&&(this._resolvePositions(),this._syncLiveSubscription()),(t.has("externalLive")||t.has("paintLivePreview")||t.has("paintMode"))&&this._syncLiveSubscription(),(t.has("selectedSegId")||t.has("highlightSegIds")||t.has("segments")||t.has("paintMode"))&&(this._schedPaint(),t.has("paintMode")&&this._canvas&&(this._canvas.style.cursor=this.paintMode?"crosshair":"pointer",this.paintMode&&queueMicrotask(()=>this._onResize())))}firstUpdated(){if(this._canvas=this.renderRoot.querySelector("canvas")??void 0,this._canvas){this._ctx=this._canvas.getContext("2d",{alpha:!0})??void 0,this._resizeObs=new ResizeObserver(()=>this._onResize()),this._resizeObs.observe(this._canvas);const t=this._canvas;t.style.touchAction="none",t.addEventListener("pointerdown",this._onPaintPointerDown),t.addEventListener("pointermove",this._onPaintPointerMove),t.addEventListener("pointerup",this._onPaintPointerUp),t.addEventListener("pointerleave",this._onPaintPointerLeave),t.addEventListener("click",this._onCanvasClick),t.addEventListener("mousemove",this._onCanvasMove),t.addEventListener("mouseleave",this._onCanvasLeave),this.addUnsub(()=>{t.removeEventListener("pointerdown",this._onPaintPointerDown),t.removeEventListener("pointermove",this._onPaintPointerMove),t.removeEventListener("pointerup",this._onPaintPointerUp),t.removeEventListener("pointerleave",this._onPaintPointerLeave),t.removeEventListener("click",this._onCanvasClick),t.removeEventListener("mousemove",this._onCanvasMove),t.removeEventListener("mouseleave",this._onCanvasLeave)})}this._onResize()}_emitPaintStroke(t){if(t<0)return;const e=Math.max(1,Math.floor(this.paintBrushSize/2)),i=[];for(let s=-e;s<=e;s++){const e=t+s;e>=0&&e<this.pixelCount&&i.push(e)}i.length&&this.dispatchEvent(new CustomEvent("paint-stroke",{detail:{led:t,leds:i},bubbles:!0,composed:!0}))}_segmentForLed(t){for(const e of this.segments){const i=e.start??0,s=e.stop??e.len??this.pixelCount;if(t>=i&&t<s)return e.id}return 1===this.segments.length?this.segments[0].id:-1}_ledInSegment(t,e){if(e<0)return!1;const i=this.segments.find(t=>t.id===e);if(!i)return!1;const s=i.start??0,n=i.stop??i.len??this.pixelCount;return t>=s&&t<n}_ledAtEvent(t){const e=this._hitTest(t.clientX,t.clientY);return e?.led??-1}_logicalCanvasSize(){const t=this._canvas;if(!t)return{w:0,h:0};const e=Math.min(2,window.devicePixelRatio||1);return{w:t.width/e,h:t.height/e}}_pointerToLogical(t,e){const i=this._canvas;if(!i)return null;const s=i.getBoundingClientRect();if(s.width<1||s.height<1)return null;const{w:n,h:o}=this._logicalCanvasSize();return[(t-s.left)/s.width*n,(e-s.top)/s.height*o]}_hitTest(t,e){if(!this._canvas||0===this._positions.length)return null;const i=this._pointerToLogical(t,e);if(!i)return null;const[s,n]=i,{w:o,h:r}=this._logicalCanvasSize(),a=this._layoutMap(o,r);if(!a)return null;const{toCanvas:l,hitR:c}=a;let h=null,d=c*c;for(const t of this._positions){const[e,i]=l(t.x,t.y),o=e-s,r=i-n,a=o*o+r*r;a<d&&(d=a,h=t)}return h}_positionExtents(){if(0===this._positions.length)return null;let t=1/0,e=-1/0,i=1/0,s=-1/0;for(const n of this._positions)n.x<t&&(t=n.x),n.x>e&&(e=n.x),n.y<i&&(i=n.y),n.y>s&&(s=n.y);return{minX:t,maxX:e,minY:i,maxY:s,rangeX:e-t||1,rangeY:s-i||1}}_applyLayoutAspectCss(){if(!this.paintMode)return void this.style.removeProperty("--wled-layout-aspect");const t=this._positionExtents();if(!t)return void this.style.removeProperty("--wled-layout-aspect");const e=Math.max(.35,Math.min(3.5,t.rangeX/t.rangeY));this.style.setProperty("--wled-layout-aspect",String(e)),queueMicrotask(()=>this._onResize())}_layoutMap(t,e){const i=this._positionExtents();if(!i)return null;const{minX:s,minY:n,rangeX:o,rangeY:r}=i,a=this.dotRadius,l=this.paintMode?2*a:3*a,c=(t-2*l)/o,h=(e-2*l)/r,d=Math.min(c,h),p=Math.max(2.5,1.35*a);return{toCanvas:(t,e)=>[l+(t-s)*d,l+(e-n)*d],hitR:Math.max(10,2.5*p),lineW:p}}_accentStroke(){return getComputedStyle(this).getPropertyValue("--wled-accent").trim()||"#03a9f4"}_surfaceFill(){return getComputedStyle(this).getPropertyValue("--wled-surface").trim()||"#1e1e1e"}_onResize(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect();if(e.width<2||e.height<2)return;const i=Math.min(1200,Math.max(1,Math.floor(e.width))),s=Math.min(600,Math.max(1,Math.floor(e.height))),n=Math.min(2,window.devicePixelRatio||1),o=Math.floor(i*n),r=Math.floor(s*n);if(t.width!==o||t.height!==r){t.width=o,t.height=r;const e=this._ctx;e&&e.setTransform(n,0,0,n,0,0),this._schedPaint()}}async _resolvePositions(){if(this.connection&&this.controllerId&&this.fixtureId)try{if(this.layoutId){const t=await async function(t,e,i){return(await Ot(t,{type:"wled_studio/layout_get",controller_id:e,layout_id:i})).layout??null}(this.connection,this.controllerId,this.layoutId);if(t){this._bgLayer=Kt(t),this._loadBackgroundImage();const e=t.fixtures??[],i=this.fixtureId?e.find(t=>String(t.id??"")===this.fixtureId):e[0];this._closed=Boolean(i?.closed??!1)}}this._positions=await async function(t,e,i,s){return(await Ot(t,{type:"wled_studio/layout_resolve_positions",controller_id:e,fixture_id:i,layout_id:s})).positions??[]}(this.connection,this.controllerId,this.fixtureId,this.layoutId||void 0),this._applyLayoutAspectCss(),queueMicrotask(()=>this._onResize()),this._schedPaint()}catch{this._positions=[],this._applyLayoutAspectCss()}}_loadBackgroundImage(){const t=this._bgLayer?.url;t?Zt(t).then(t=>{this._bgImage=t,this._schedPaint()},()=>{this._bgImage=null}):this._bgImage=null}_attachLiveStream(){this.connection&&this.controllerId&&!this._unsubLive&&(this._unsubLive=xt(this.connection,this.controllerId,t=>{this.setFrame(t)}),this.addUnsub(()=>{this._unsubLive?.(),this._unsubLive=void 0}))}_schedPaint(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this._paint()}))}_rgbForLed(t,e){if(!t)return[80,80,80];const i=4*e;return[t[i],t[i+1],t[i+2]]}_paint(){const t=this._ctx,e=this._canvas;if(!t||!e)return;const{w:i,h:s}=this._logicalCanvasSize();if(i<1||s<1)return;t.clearRect(0,0,i,s),t.fillStyle=this._surfaceFill(),t.fillRect(0,0,i,s),this._bgImage?.complete&&this._bgLayer&&function(t,e,i,s,n){const o=n.opacity??Ft,r=n.brightness??1,a=n.saturation??1,l=(n.rotation??0)*Math.PI/180,c=(n.offsetX??0)*e,h=(n.offsetY??0)*i,d=n.scale??1,p=n.cropX??0,u=n.cropY??0,g=n.cropW??1,f=n.cropH??1,_=s.naturalWidth*g,m=s.naturalHeight*f,v=s.naturalWidth*p,b=s.naturalHeight*u,y=Math.max(e/_,i/m)*d,w=_*y,x=m*y;t.save(),t.globalAlpha=o,t.filter=`brightness(${r}) saturate(${a})`,t.translate(e/2+c,i/2+h),t.rotate(l),t.drawImage(s,v,b,_,m,-w/2,-x/2,w,x),t.restore()}(t,i,s,this._bgImage,this._bgLayer);const n=this.paintMode&&this._paintPixels&&!this.paintLivePreview?this._paintPixels:this._pixels,o=[...this._positions].sort((t,e)=>t.led-e.led),r=this.dotRadius,a=this._layoutMap(i,s);if(o.length>0&&a){const{toCanvas:e,lineW:i}=a,s=this.remote.state.disableBloom;if(!this._showDots){t.lineCap="round",t.lineJoin="round",t.lineWidth=i;const r=(o,r)=>{const[a,l]=e(o.x,o.y),[c,h]=e(r.x,r.y),[d,p,u]=this._rgbForLed(n,o.led);!s&&(d>10||p>10||u>10)?(t.shadowColor=`rgba(${d},${p},${u},0.55)`,t.shadowBlur=1.5*i):t.shadowBlur=0,t.strokeStyle=`rgb(${d},${p},${u})`,t.beginPath(),t.moveTo(a,l),t.lineTo(c,h),t.stroke()};for(let t=0;t<o.length-1;t++)r(o[t],o[t+1]);this._closed&&o.length>=2&&r(o[o.length-1],o[0]),t.shadowBlur=0}if(this._showDots){for(const{x:i,y:a,led:l}of o){const[o,c]=e(i,a),[h,d,p]=this._rgbForLed(n,l);!s&&(h>10||d>10||p>10)?(t.shadowColor=`rgba(${h},${d},${p},0.7)`,t.shadowBlur=2.5*r):t.shadowBlur=0,t.beginPath(),t.arc(o,c,r,0,2*Math.PI),t.fillStyle=`rgb(${h},${d},${p})`,t.fill()}t.shadowBlur=0}this.paintMode?this._hoverLed>=0&&this._paintBrushHover(t,o,e):this._paintSegmentSelection(t,o,e,i)}else{const e=this.pixelCount,o=(i-8)/e,a=s/2;for(let i=0;i<e;i++){let e=80,s=80,l=80;if(n){const t=4*i;e=n[t],s=n[t+1],l=n[t+2]}t.beginPath(),t.arc(4+i*o+o/2,a,r,0,2*Math.PI),t.fillStyle=`rgb(${e},${s},${l})`,t.fill()}}}_paintBrushHover(t,e,i){const s=e.find(t=>t.led===this._hoverLed);if(!s)return;const[n,o]=i(s.x,s.y),r=Math.max(8,2.5*this.dotRadius);t.save(),t.strokeStyle="rgba(255, 255, 255, 0.9)",t.lineWidth=2,t.beginPath(),t.arc(n,o,r,0,2*Math.PI),t.stroke(),t.strokeStyle=this._accentStroke(),t.lineWidth=1.5,t.beginPath(),t.moveTo(n-r-4,o),t.lineTo(n+r+4,o),t.moveTo(n,o-r-4),t.lineTo(n,o+r+4),t.stroke(),t.restore()}_highlightIds(){if(this.highlightSegIds.length)return[...new Set(this.highlightSegIds)];if(this.selectedSegId>=0)return[this.selectedSegId];if(this._hoverLed>=0){const t=this._segmentForLed(this._hoverLed);return t>=0?[t]:[]}return[]}_paintSegmentSelection(t,e,i,s){const n=this._highlightIds();if(!n.length||0===this.segments.length)return;const o=this._accentStroke(),r=Math.max(1.25,Math.min(2.5,.45*s));t.save(),t.lineCap="round",t.lineJoin="round",t.shadowBlur=0;for(const s of n){const n=e.filter(t=>this._ledInSegment(t.led,s)).sort((t,e)=>t.led-e.led);if(n.length<2)continue;const[a,l]=i(n[0].x,n[0].y);t.beginPath(),t.moveTo(a,l);for(let e=1;e<n.length;e++){const[s,o]=i(n[e].x,n[e].y);t.lineTo(s,o)}t.strokeStyle="rgba(0, 0, 0, 0.55)",t.lineWidth=r+1.5,t.stroke(),t.strokeStyle=o,t.lineWidth=r,t.stroke()}t.restore()}render(){const t=this.paintMode?"Paint on layout — drag along the fixture path":this.compact?"Live layout preview — tap the strip to select a segment":"LED geometry preview — positions mapped from fixture layout",e=!this.paintMode&&"live"!==this._status&&"paint"!==this._status;return j`
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
    `]}};t([ht({attribute:!1})],Qt.prototype,"connection",void 0),t([ht()],Qt.prototype,"controllerId",void 0),t([ht()],Qt.prototype,"layoutId",void 0),t([ht()],Qt.prototype,"fixtureId",void 0),t([ht({type:Number})],Qt.prototype,"pixelCount",void 0),t([ht({type:Number})],Qt.prototype,"dotRadius",void 0),t([ht({type:Boolean,reflect:!0})],Qt.prototype,"compact",void 0),t([ht({type:Number})],Qt.prototype,"heightPx",void 0),t([ht({type:Boolean})],Qt.prototype,"externalLive",void 0),t([ht({type:Boolean,reflect:!0})],Qt.prototype,"paintMode",void 0),t([ht({type:Boolean})],Qt.prototype,"paintLivePreview",void 0),t([ht({type:Number})],Qt.prototype,"paintBrushSize",void 0),t([ht({type:Array})],Qt.prototype,"segments",void 0),t([ht({type:Number})],Qt.prototype,"selectedSegId",void 0),t([ht({type:Array})],Qt.prototype,"highlightSegIds",void 0),t([dt()],Qt.prototype,"_positions",void 0),t([dt()],Qt.prototype,"_status",void 0),t([dt()],Qt.prototype,"_showDots",void 0),t([dt()],Qt.prototype,"_closed",void 0),Qt=t([Dt("wled-geometry-preview")],Qt);const te="wled-toast";function ee(t,e){const i=e.trim();i&&t.dispatchEvent(new CustomEvent(te,{detail:{message:i},bubbles:!0,composed:!0}))}class ie extends Error{constructor(t,e){super("Scene conflict"),this.name="SceneConflictError",this.remote=t,this.etag=e}}async function se(t,e){return await $t(t),t.sendMessagePromise({...e,schema_version:1})}async function ne(t,e){return(await se(t,{type:"wled_studio/scene_list",controller_id:e})).scenes??[]}async function oe(t,e,i,s){return(await se(t,{type:"wled_studio/scene_capture",controller_id:e,name:i,scene_id:s?.sceneId,layout_id:s?.layoutId,transition_ms:2500})).scene??{id:"",controller_id:e,name:i,wled_state:{}}}function re(t,e){const i=new Set(t);return i.has(e)?i.delete(e):i.add(e),[...i].sort((t,e)=>t-e)}function ae(t,e){const i=t.id,s=e.find(t=>t.wled_segment_id===i||t.segment_index===i||t.entity_id.endsWith(`_segment_${i}`));return`${("string"==typeof t.n&&t.n.trim()?t.n.trim():"")||s?.name?.replace(/^.*\s—\s/,"")||`Seg ${i+1}`} (${t.start??"?"}–${t.stop??"?"})`}function le(t){if(t instanceof Error)return t.message;if("string"==typeof t)return t;if(t&&"object"==typeof t){const e=t;if("string"==typeof e.message)return"string"==typeof e.code?`${e.code}: ${e.message}`:e.message;const i=e.error;if(i&&"object"==typeof i){const t=i;if("string"==typeof t.message)return"string"==typeof t.code?`${t.code}: ${t.message}`:t.message}if("string"==typeof e.code)return e.code}try{return JSON.stringify(t)}catch{return"Unknown error"}}const ce={all:"All","1d":"1D","2d":"2D",solid:"Solid",sound:"Music",palette:"Palette"};function he(t){return void 0!==t.Solid?t.Solid:0}const de=/\b(dj|sound|music|audio|beat|freq|grav|jugg|ripple|water|pixel|rock|streak|popcorn|balls|fireworks|matrix|stream|peak|level|radio|sync|reactive|volume|puddle|ripple|noisem|noisep|noisemove|pixels|juggle|sinelon|phased|blurz|djlight)\b/i;function pe(t,e,i,s,n){if("all"===i)return!0;const o=s[e]??null,r=t.toLowerCase();return"solid"===i?e===he(n):"2d"===i?"2"===o||r.includes("2d"):"1d"===i?"2"!==o&&!r.includes("2d"):"sound"===i?function(t,e,i){const s=i[e]??null;return"v"===s||"f"===s||de.test(t)}(t,e,s):"palette"!==i||(r.includes("palette")||r.includes("colorloop")||r.includes("pride")||r.includes("cycle"))}const ue="wled_studio.segment_snapshot",ge="wled_studio.merge_for_effects",fe=["start","stop","len","grp","spc","of","on","bri","col","fx","sx","ix","c1","c2","c3","o1","o2","o3","pal","n","rev","mi","sel","awm"];function _e(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function me(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function ve(t){if(!t)return!1;const e=_e(ge);return!(t in e)||Boolean(e[t])}function be(t,e){const i=t.find(t=>0===t.id);if(!i||e<=0)return!1;return(i.stop??0)-(i.start??0)>=.9*e}function ye(t,e){const i=_e(ge);e?i[t]=!0:delete i[t],me(ge,i)}function we(t){return _e(ue)[t]??null}function xe(t,e,i){const s={savedAt:Date.now(),segments:e.map(t=>({...t})),pixelCount:i},n=_e(ue);return n[t]=s,me(ue,n),s}function $e(t){return{seg:t.segments.map(t=>function(t){const e=t,i={id:t.id};for(const t of fe){const s=e[t];void 0!==s&&(i[t]=s)}return i}(t))}}function Se(t,e,i){const s=t.length?[...t].sort((t,e)=>t.id-e.id):[{id:0,start:0,stop:e,on:!0}],n=i?.length?new Set(i):null,o=n?s.filter(t=>n.has(t.id)):s,r=o.filter(t=>(t.stop??0)>(t.start??0)),a=r.length?r:o.length?o:s,l=Math.min(...a.map(t=>t.start??0)),c=Math.max(...a.map(t=>t.stop??e)),h=a[0],d={id:0,start:l,stop:c,on:!1!==h.on,sel:!0,bri:h.bri??255,fx:h.fx??0,n:"Merged (effects)"};void 0!==h.col&&(d.col=h.col),void 0!==h.pal&&(d.pal=h.pal);const p=[d];for(const t of s){if(0===t.id)continue;const e=t.stop??t.start??0;p.push({id:t.id,start:e,stop:e,on:!1,sel:!1})}return{seg:p}}function Ie(t,e){const i=t.find(t=>0===t.id);return i?[0]:t.length?[t[0].id]:[0]}function ke(t){const e={id:t.id,on:t.on,bri:t.bri,fx:t.fx,sx:t.sx,ix:t.ix,c1:t.c1,c2:t.c2,c3:t.c3,o1:t.o1,o2:t.o2,o3:t.o3,pal:t.pal,col:Mt(t.col),awm:t.awm};return JSON.stringify(e)}function Ce(t,e,i){let s,n=null,o=0;const r=()=>{s&&clearTimeout(s),s=setTimeout(()=>{(async()=>{try{const s=((await kt(t,e)).segments??[]).find(t=>t.id===o);if(!s||!n)return;const r=ke(n);if(r===ke(s))return;!function(t,e){return t.fx!==e.fx||JSON.stringify(Mt(t.col))!==JSON.stringify(Mt(e.col))}(n,s)?i(s):i(s,"WLED applied a different color or effect than requested")}catch{}})()},500)},a=It((s,a)=>{n=a,o=a.id,Ct(t,e,s,{fullResponse:!0}).then(t=>{const e=t.seg,i=Array.isArray(e)?e.find(t=>t.id===a.id):void 0;i&&(n={...a,...i,id:a.id}),r()}).catch(t=>{i(a,`Failed to apply state to WLED: ${le(t)}`)})},50,100);return{push(t,e){a(t,e)},cancel(){a.cancel(),s&&clearTimeout(s)}}}var Ee,Pe,Ae,Me,Te,Le={},Ne=[],Oe=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function ze(t,e){for(var i in e)t[i]=e[i];return t}function Be(t){var e=t.parentNode;e&&e.removeChild(t)}function Re(t,e,i){var s,n,o,r,a=arguments;if(e=ze({},e),arguments.length>3)for(i=[i],s=3;s<arguments.length;s++)i.push(a[s]);if(null!=i&&(e.children=i),null!=t&&null!=t.defaultProps)for(n in t.defaultProps)void 0===e[n]&&(e[n]=t.defaultProps[n]);return r=e.key,null!=(o=e.ref)&&delete e.ref,null!=r&&delete e.key,De(t,e,r,o)}function De(t,e,i,s){var n={type:t,props:e,key:i,ref:s,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return Ee.vnode&&Ee.vnode(n),n}function Fe(t){return t.children}function Ue(t,e){this.props=t,this.context=e}function We(t,e){if(null==e)return t.__p?We(t.__p,t.__p.__k.indexOf(t)+1):null;for(var i;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e)return i.__e;return"function"==typeof t.type?We(t):null}function je(t){var e,i;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(i=t.__k[e])&&null!=i.__e){t.__e=t.__c.base=i.__e;break}return je(t)}}function He(t){(!t.__d&&(t.__d=!0)&&1===Pe.push(t)||Me!==Ee.debounceRendering)&&(Me=Ee.debounceRendering,(Ee.debounceRendering||Ae)(qe))}function qe(){var t,e,i,s,n,o,r,a;for(Pe.sort(function(t,e){return e.__v.__b-t.__v.__b});t=Pe.pop();)t.__d&&(i=void 0,s=void 0,o=(n=(e=t).__v).__e,r=e.__P,a=e.u,e.u=!1,r&&(i=[],s=Ke(r,n,ze({},n),e.__n,void 0!==r.ownerSVGElement,null,i,a,null==o?We(n):o),Ze(i,n),s!=o&&je(n)))}function Ve(t,e,i,s,n,o,r,a,l){var c,h,d,p,u,g,f,_=i&&i.__k||Ne,m=_.length;if(a==Le&&(a=null!=o?o[0]:m?We(i,0):null),c=0,e.__k=Ge(e.__k,function(i){if(null!=i){if(i.__p=e,i.__b=e.__b+1,null===(d=_[c])||d&&i.key==d.key&&i.type===d.type)_[c]=void 0;else for(h=0;h<m;h++){if((d=_[h])&&i.key==d.key&&i.type===d.type){_[h]=void 0;break}d=null}if(p=Ke(t,i,d=d||Le,s,n,o,r,null,a,l),(h=i.ref)&&d.ref!=h&&(f||(f=[])).push(h,i.__c||p,i),null!=p){if(null==g&&(g=p),null!=i.l)p=i.l,i.l=null;else if(o==d||p!=a||null==p.parentNode){t:if(null==a||a.parentNode!==t)t.appendChild(p);else{for(u=a,h=0;(u=u.nextSibling)&&h<m;h+=2)if(u==p)break t;t.insertBefore(p,a)}"option"==e.type&&(t.value="")}a=p.nextSibling,"function"==typeof e.type&&(e.l=p)}}return c++,i}),e.__e=g,null!=o&&"function"!=typeof e.type)for(c=o.length;c--;)null!=o[c]&&Be(o[c]);for(c=m;c--;)null!=_[c]&&ei(_[c],_[c]);if(f)for(c=0;c<f.length;c++)ti(f[c],f[++c],f[++c])}function Ge(t,e,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)e&&i.push(e(null));else if(Array.isArray(t))for(var s=0;s<t.length;s++)Ge(t[s],e,i);else i.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return De(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=De(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return i}function Xe(t,e,i){"-"===e[0]?t.setProperty(e,i):t[e]="number"==typeof i&&!1===Oe.test(e)?i+"px":null==i?"":i}function Ye(t,e,i,s,n){var o,r,a,l,c;if("key"===(e=n?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(o=t.style,"string"==typeof i)o.cssText=i;else{if("string"==typeof s&&(o.cssText="",s=null),s)for(r in s)i&&r in i||Xe(o,r,"");if(i)for(a in i)s&&i[a]===s[a]||Xe(o,a,i[a])}else"o"===e[0]&&"n"===e[1]?(l=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),i?(s||t.addEventListener(e,Je,l),(t.t||(t.t={}))[e]=i):t.removeEventListener(e,Je,l)):"list"!==e&&"tagName"!==e&&"form"!==e&&!n&&e in t?t[e]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),i):null==i||!1===i?t.removeAttribute(e):t.setAttribute(e,i))}function Je(t){return this.t[t.type](Ee.event?Ee.event(t):t)}function Ke(t,e,i,s,n,o,r,a,l,c){var h,d,p,u,g,f,_,m,v,b,y=e.type;if(void 0!==e.constructor)return null;(h=Ee.__b)&&h(e);try{t:if("function"==typeof y){if(m=e.props,v=(h=y.contextType)&&s[h.__c],b=h?v?v.props.value:h.__p:s,i.__c?_=(d=e.__c=i.__c).__p=d.__E:("prototype"in y&&y.prototype.render?e.__c=d=new y(m,b):(e.__c=d=new Ue(m,b),d.constructor=y,d.render=ii),v&&v.sub(d),d.props=m,d.state||(d.state={}),d.context=b,d.__n=s,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=y.getDerivedStateFromProps&&ze(d.__s==d.state?d.__s=ze({},d.__s):d.__s,y.getDerivedStateFromProps(m,d.__s)),p)null==y.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&r.push(d);else{if(null==y.getDerivedStateFromProps&&null==a&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(m,b),!a&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(m,d.__s,b)){for(d.props=m,d.state=d.__s,d.__d=!1,d.__v=e,e.__e=null!=l?l!==i.__e?l:i.__e:null,e.__k=i.__k,h=0;h<e.__k.length;h++)e.__k[h]&&(e.__k[h].__p=e);break t}null!=d.componentWillUpdate&&d.componentWillUpdate(m,d.__s,b)}for(u=d.props,g=d.state,d.context=b,d.props=m,d.state=d.__s,(h=Ee.__r)&&h(e),d.__d=!1,d.__v=e,d.__P=t,h=d.render(d.props,d.state,d.context),e.__k=Ge(null!=h&&h.type==Fe&&null==h.key?h.props.children:h),null!=d.getChildContext&&(s=ze(ze({},s),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(f=d.getSnapshotBeforeUpdate(u,g)),Ve(t,e,i,s,n,o,r,l,c),d.base=e.__e;h=d.__h.pop();)d.__s&&(d.state=d.__s),h.call(d);p||null==u||null==d.componentDidUpdate||d.componentDidUpdate(u,g,f),_&&(d.__E=d.__p=null)}else e.__e=Qe(i.__e,e,i,s,n,o,r,c);(h=Ee.diffed)&&h(e)}catch(t){Ee.__e(t,e,i)}return e.__e}function Ze(t,e){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){Ee.__e(t,i.__v)}Ee.__c&&Ee.__c(e)}function Qe(t,e,i,s,n,o,r,a){var l,c,h,d,p=i.props,u=e.props;if(n="svg"===e.type||n,null==t&&null!=o)for(l=0;l<o.length;l++)if(null!=(c=o[l])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,o[l]=null;break}if(null==t){if(null===e.type)return document.createTextNode(u);t=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),o=null}return null===e.type?p!==u&&(null!=o&&(o[o.indexOf(t)]=null),t.data=u):e!==i&&(null!=o&&(o=Ne.slice.call(t.childNodes)),h=(p=i.props||Le).dangerouslySetInnerHTML,d=u.dangerouslySetInnerHTML,a||(d||h)&&(d&&h&&d.__html==h.__html||(t.innerHTML=d&&d.__html||"")),function(t,e,i,s,n){var o;for(o in i)o in e||Ye(t,o,null,i[o],s);for(o in e)n&&"function"!=typeof e[o]||"value"===o||"checked"===o||i[o]===e[o]||Ye(t,o,e[o],i[o],s)}(t,u,p,n,a),e.__k=e.props.children,d||Ve(t,e,i,s,"foreignObject"!==e.type&&n,o,r,Le,a),a||("value"in u&&void 0!==u.value&&u.value!==t.value&&(t.value=null==u.value?"":u.value),"checked"in u&&void 0!==u.checked&&u.checked!==t.checked&&(t.checked=u.checked))),t}function ti(t,e,i){try{"function"==typeof t?t(e):t.current=e}catch(t){Ee.__e(t,i)}}function ei(t,e,i){var s,n,o;if(Ee.unmount&&Ee.unmount(t),(s=t.ref)&&ti(s,null,e),i||"function"==typeof t.type||(i=null!=(n=t.__e)),t.__e=t.l=null,null!=(s=t.__c)){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(t){Ee.__e(t,e)}s.base=s.__P=null}if(s=t.__k)for(o=0;o<s.length;o++)s[o]&&ei(s[o],e,i);null!=n&&Be(n)}function ii(t,e,i){return this.constructor(t,i)}function si(t,e,i){return e&&function(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}(t.prototype,e),t}function ni(){return ni=Object.assign||function(t){for(var e=arguments,i=1;i<arguments.length;i++){var s=e[i];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},ni.apply(this,arguments)}Ee={},Ue.prototype.setState=function(t,e){var i=this.__s!==this.state&&this.__s||(this.__s=ze({},this.state));("function"!=typeof t||(t=t(i,this.props)))&&ze(i,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),He(this))},Ue.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,He(this))},Ue.prototype.render=Fe,Pe=[],Ae="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Me=Ee.debounceRendering,Ee.__e=function(t,e,i){for(var s;e=e.__p;)if((s=e.__c)&&!s.__p)try{if(s.constructor&&null!=s.constructor.getDerivedStateFromError)s.setState(s.constructor.getDerivedStateFromError(t));else{if(null==s.componentDidCatch)continue;s.componentDidCatch(t)}return He(s.__E=s)}catch(e){t=e}throw t},Te=Le;var oi="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",ri="[\\s|\\(]+("+oi+")[,|\\s]+("+oi+")[,|\\s]+("+oi+")\\s*\\)?",ai="[\\s|\\(]+("+oi+")[,|\\s]+("+oi+")[,|\\s]+("+oi+")[,|\\s]+("+oi+")\\s*\\)?",li=new RegExp("rgb"+ri),ci=new RegExp("rgba"+ai),hi=new RegExp("hsl"+ri),di=new RegExp("hsla"+ai),pi="^(?:#?|0x?)",ui="([0-9a-fA-F]{1})",gi="([0-9a-fA-F]{2})",fi=new RegExp(pi+ui+ui+ui+"$"),_i=new RegExp(pi+ui+ui+ui+ui+"$"),mi=new RegExp(pi+gi+gi+gi+"$"),vi=new RegExp(pi+gi+gi+gi+gi+"$"),bi=Math.log,yi=Math.round,wi=Math.floor;function xi(t,e,i){return Math.min(Math.max(t,e),i)}function $i(t,e){var i=t.indexOf("%")>-1,s=parseFloat(t);return i?e/100*s:s}function Si(t){return parseInt(t,16)}function Ii(t){return t.toString(16).padStart(2,"0")}var ki=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=ni({},this.$)}var e=t.prototype;return e.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},e.setChannel=function(t,e,i){var s;this[t]=ni({},this[t],((s={})[e]=i,s))},e.reset=function(){this.hsva=this.initialValue},e.clone=function(){return new t(this)},e.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,i=t.s/100,s=t.v/100,n=wi(e),o=e-n,r=s*(1-i),a=s*(1-o*i),l=s*(1-(1-o)*i),c=n%6,h=[l,s,s,a,r,r][c],d=[r,r,l,s,s,a][c];return{r:xi(255*[s,a,r,r,l,s][c],0,255),g:xi(255*h,0,255),b:xi(255*d,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),r=n-o,a=0,l=n,c=0===n?0:r/n;switch(n){case o:a=0;break;case e:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-e)/r+2;break;case s:a=(e-i)/r+4}return{h:60*a%360,s:xi(100*c,0,100),v:xi(100*l,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,i=t.v/100,s=(2-e)*i,n=s<=1?s:2-s,o=n<1e-9?0:e*i/n;return{h:t.h,s:xi(100*o,0,100),l:xi(50*s,0,100)}},t.hslToHsv=function(t){var e=2*t.l,i=t.s*(e<=100?e:200-e)/100,s=e+i<1e-9?0:2*i/(e+i);return{h:t.h,s:xi(100*s,0,100),v:xi((e+i)/2,0,100)}},t.kelvinToRgb=function(t){var e,i,s,n=t/100;return n<66?(e=255,i=-155.25485562709179-.44596950469579133*(i=n-2)+104.49216199393888*bi(i),s=n<20?0:.8274096064007395*(s=n-10)-254.76935184120902+115.67994401066147*bi(s)):(e=351.97690566805693+.114206453784165*(e=n-55)-40.25366309332127*bi(e),i=325.4494125711974+.07943456536662342*(i=n-50)-28.0852963507957*bi(i),s=255),{r:xi(wi(e),0,255),g:xi(wi(i),0,255),b:xi(wi(s),0,255)}},t.rgbToKelvin=function(e){for(var i,s=e.r,n=e.b,o=2e3,r=4e4;r-o>.4;){i=.5*(r+o);var a=t.kelvinToRgb(i);a.b/a.r>=n/s?r=i:o=i}return i},si(t,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=ni({},e,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var s in e)i[s]=t[s]!=e[s];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return ni({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=ni({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=ni({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=ni({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=ni({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),i=e.r,s=e.g,n=e.b;return{r:yi(i),g:yi(s),b:yi(n)}},set:function(e){this.hsv=ni({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return ni({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),i=e.h,s=e.s,n=e.l;return{h:yi(i),s:yi(s),l:yi(n)}},set:function(e){this.hsv=ni({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return ni({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,i,s,n,o=1;if((e=li.exec(t))?(i=$i(e[1],255),s=$i(e[2],255),n=$i(e[3],255)):(e=ci.exec(t))&&(i=$i(e[1],255),s=$i(e[2],255),n=$i(e[3],255),o=$i(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:i,g:s,b:n,a:o}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+Ii(t.r)+Ii(t.g)+Ii(t.b)},set:function(t){var e,i,s,n,o=255;if((e=fi.exec(t))?(i=17*Si(e[1]),s=17*Si(e[2]),n=17*Si(e[3])):(e=_i.exec(t))?(i=17*Si(e[1]),s=17*Si(e[2]),n=17*Si(e[3]),o=17*Si(e[4])):(e=mi.exec(t))?(i=Si(e[1]),s=Si(e[2]),n=Si(e[3])):(e=vi.exec(t))&&(i=Si(e[1]),s=Si(e[2]),n=Si(e[3]),o=Si(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:i,g:s,b:n,a:o/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+Ii(t.r)+Ii(t.g)+Ii(t.b)+Ii(wi(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,i,s,n,o=1;if((e=hi.exec(t))?(i=$i(e[1],360),s=$i(e[2],100),n=$i(e[3],100)):(e=di.exec(t))&&(i=$i(e[1],360),s=$i(e[2],100),n=$i(e[3],100),o=$i(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:i,s:s,l:n,a:o}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),t}();function Ci(t){var e,i=t.width,s=t.sliderSize,n=t.borderWidth,o=t.handleRadius,r=t.padding,a=t.sliderShape,l="horizontal"===t.layoutDirection;return s=null!=(e=s)?e:2*r+2*o,"circle"===a?{handleStart:t.padding+t.handleRadius,handleRange:i-2*r-2*o,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-n/2}:{handleStart:s/2,handleRange:i-s,radius:s/2,x:0,y:0,width:l?s:i,height:l?i:s}}function Ei(t,e){var i=Ci(t),s=i.width,n=i.height,o=i.handleRange,r=i.handleStart,a="horizontal"===t.layoutDirection,l=function(t,e){var i=e.hsva,s=e.rgb;switch(t.sliderType){case"red":return s.r/2.55;case"green":return s.g/2.55;case"blue":return s.b/2.55;case"alpha":return 100*i.a;case"kelvin":var n=t.minTemperature,o=t.maxTemperature-n,r=(e.kelvin-n)/o*100;return Math.max(0,Math.min(r,100));case"hue":return i.h/=3.6;case"saturation":return i.s;default:return i.v}}(t,e),c=a?s/2:n/2,h=r+l/100*o;return a&&(h=-1*h+o+2*r),{x:a?c:h,y:a?h:c}}var Pi,Ai=2*Math.PI,Mi=function(t,e){return Math.sqrt(t*t+e*e)};function Ti(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Li(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Ni(t,e,i){var s=t.wheelAngle,n=t.wheelDirection;return i&&"clockwise"===n?e=s+e:"clockwise"===n?e=360-s+e:i&&"anticlockwise"===n?e=s+180-e:"anticlockwise"===n&&(e=s-e),function(t,e){return(t%e+e)%e}(e,360)}function Oi(t,e,i){var s=Li(t),n=s.cx,o=s.cy,r=Ti(t);e=n-e,i=o-i;var a=Ni(t,Math.atan2(-i,-e)*(360/Ai)),l=Math.min(Mi(e,i),r);return{h:Math.round(a),s:Math.round(100/r*l)}}function zi(t){var e=t.width,i=t.boxHeight;return{width:e,height:null!=i?i:e,radius:t.padding+t.handleRadius}}function Bi(t,e,i){var s=zi(t),n=s.width,o=s.height,r=s.radius,a=(e-r)/(n-2*r)*100,l=(i-r)/(o-2*r)*100;return{s:Math.max(0,Math.min(a,100)),v:Math.max(0,Math.min(100-l,100))}}function Ri(t){Pi||(Pi=document.getElementsByTagName("base"));var e=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(e),s=/iPhone|iPod|iPad/i.test(e),n=window.location;return(i||s)&&Pi.length>0?n.protocol+"//"+n.host+n.pathname+n.search+t:t}function Di(t,e,i,s){for(var n=0;n<s.length;n++){var o=s[n].x-e,r=s[n].y-i;if(Math.sqrt(o*o+r*r)<t.handleRadius)return n}return null}function Fi(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function Ui(t,e,i){return t+"-gradient("+e+", "+i.map(function(t){var e=t[0];return t[1]+" "+e+"%"}).join(",")+")"}function Wi(t){return"string"==typeof t?t:t+"px"}var ji=["mousemove","touchmove","mouseup","touchend"],Hi=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),i={onMouseDown:e,ontouchstart:e},s="horizontal"===t.layoutDirection,n=null===t.margin?t.sliderMargin:t.margin,o={overflow:"visible",display:s?"inline-block":"block"};return t.index>0&&(o[s?"marginLeft":"marginTop"]=n),Re(Fe,null,t.children(this.uid,i,o))},e.prototype.handleEvent=function(t){var e=this,i=this.props.onInput,s=this.base.getBoundingClientRect();t.preventDefault();var n=t.touches?t.changedTouches[0]:t,o=n.clientX-s.left,r=n.clientY-s.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(o,r,0)&&ji.forEach(function(t){document.addEventListener(t,e,{passive:!1})});break;case"mousemove":case"touchmove":i(o,r,1);break;case"mouseup":case"touchend":i(o,r,2),ji.forEach(function(t){document.removeEventListener(t,e,{passive:!1})})}},e}(Ue);function qi(t){var e=t.r,i=t.url,s=e,n=e;return Re("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+Wi(t.x)+", "+Wi(t.y)+")",willChange:"transform",top:Wi(-e),left:Wi(-e),width:Wi(2*e),height:Wi(2*e),position:"absolute",overflow:"visible"}},i&&Re("use",Object.assign({xlinkHref:Ri(i)},t.props)),!i&&Re("circle",{cx:s,cy:n,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!i&&Re("circle",{cx:s,cy:n,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function Vi(t){var e=t.activeIndex,i=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,s=Ci(t),n=s.width,o=s.height,r=s.radius,a=Ei(t,i),l=function(t,e){var i=e.hsv,s=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+s.g+","+s.b+")"],[100,"rgb(255,"+s.g+","+s.b+")"]];case"green":return[[0,"rgb("+s.r+",0,"+s.b+")"],[100,"rgb("+s.r+",255,"+s.b+")"]];case"blue":return[[0,"rgb("+s.r+","+s.g+",0)"],[100,"rgb("+s.r+","+s.g+",255)"]];case"alpha":return[[0,"rgba("+s.r+","+s.g+","+s.b+",0)"],[100,"rgb("+s.r+","+s.g+","+s.b+")"]];case"kelvin":for(var n=[],o=t.minTemperature,r=t.maxTemperature,a=r-o,l=o,c=0;l<r;l+=a/8,c+=1){var h=ki.kelvinToRgb(l),d=h.r,p=h.g,u=h.b;n.push([12.5*c,"rgb("+d+","+p+","+u+")"])}return n;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var g=ki.hsvToHsl({h:i.h,s:0,v:i.v}),f=ki.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]];default:var _=ki.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+_.h+","+_.s+"%,"+_.l+"%)"]]}}(t,i);return Re(Hi,Object.assign({},t,{onInput:function(e,s,n){var o=function(t,e,i){var s,n=Ci(t),o=n.handleRange,r=n.handleStart;s="horizontal"===t.layoutDirection?-1*i+o+r:e-r,s=Math.max(Math.min(s,o),0);var a=Math.round(100/o*s);switch(t.sliderType){case"kelvin":var l=t.minTemperature;return l+(t.maxTemperature-l)*(a/100);case"alpha":return a/100;case"hue":return 3.6*a;case"red":case"blue":case"green":return 2.55*a;default:return a}}(t,e,s);t.parent.inputActive=!0,i[t.sliderType]=o,t.onInput(n,t.id)}}),function(e,s,c){return Re("div",Object.assign({},s,{className:"IroSlider",style:Object.assign({},{position:"relative",width:Wi(n),height:Wi(o),borderRadius:Wi(r),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Re("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:Wi(r),background:Ui("linear","horizontal"===t.layoutDirection?"to top":"to right",l)},Fi(t))}),Re(qi,{isActive:!0,index:i.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:a.x,y:a.y}))})}function Gi(t){var e=zi(t),i=e.width,s=e.height,n=e.radius,o=t.colors,r=t.parent,a=t.activeIndex,l=void 0!==a&&a<t.colors.length?t.colors[a]:t.color,c=[[[0,"#fff"],[100,"hsl("+l.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],h=o.map(function(e){return function(t,e){var i=zi(t),s=i.width,n=i.height,o=i.radius,r=e.hsv,a=o,l=s-2*o,c=n-2*o;return{x:a+r.s/100*l,y:a+(c-r.v/100*c)}}(t,e)});return Re(Hi,Object.assign({},t,{onInput:function(e,i,s){if(0===s){var n=Di(t,e,i,h);null!==n?r.setActiveColor(n):(r.inputActive=!0,l.hsv=Bi(t,e,i),t.onInput(s,t.id))}else 1===s&&(r.inputActive=!0,l.hsv=Bi(t,e,i));t.onInput(s,t.id)}}),function(e,r,a){return Re("div",Object.assign({},r,{className:"IroBox",style:Object.assign({},{width:Wi(i),height:Wi(s),position:"relative"},a)}),Re("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:Wi(n)},Fi(t),{background:Ui("linear","to bottom",c[1])+","+Ui("linear","to right",c[0])})}),o.filter(function(t){return t!==l}).map(function(e){return Re(qi,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[e.index].x,y:h[e.index].y})}),Re(qi,{isActive:!0,index:l.index,fill:l.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:h[l.index].x,y:h[l.index].y}))})}qi.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},Vi.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function Xi(t){var e=Li(t).width,i=t.colors;t.borderWidth;var s=t.parent,n=t.color,o=n.hsv,r=i.map(function(e){return function(t,e){var i=e.hsv,s=Li(t),n=s.cx,o=s.cy,r=Ti(t),a=(180+Ni(t,i.h,!0))*(Ai/360),l=i.s/100*r,c="clockwise"===t.wheelDirection?-1:1;return{x:n+l*Math.cos(a)*c,y:o+l*Math.sin(a)*c}}(t,e)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Re(Hi,Object.assign({},t,{onInput:function(e,i,o){if(0===o){if(!function(t,e,i){var s=Li(t),n=s.cx,o=s.cy,r=t.width/2;return Mi(n-e,o-i)<r}(t,e,i))return!1;var a=Di(t,e,i,r);null!==a?s.setActiveColor(a):(s.inputActive=!0,n.hsv=Oi(t,e,i),t.onInput(o,t.id))}else 1===o&&(s.inputActive=!0,n.hsv=Oi(t,e,i));t.onInput(o,t.id)}}),function(s,l,c){return Re("div",Object.assign({},l,{className:"IroWheel",style:Object.assign({},{width:Wi(e),height:Wi(e),position:"relative"},c)}),Re("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Re("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Re("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-o.v/100})}),Re("div",{className:"IroWheelBorder",style:Object.assign({},a,Fi(t))}),i.filter(function(t){return t!==n}).map(function(e){return Re(qi,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[e.index].x,y:r[e.index].y})}),Re(qi,{isActive:!0,index:n.index,fill:n.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:r[n.index].x,y:r[n.index].y}))})}var Yi=function(t){function e(e){var i=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach(function(t){return i.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var i=new ki(t,this.onColorChange.bind(this));this.colors.splice(e,0,i),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach(function(t,e){return t.index=e}),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var i=this;void 0===e&&(e=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var i=this,s=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(s[t]||(s[t]=[])).push(e),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){e.apply(null,t)}),i.deferredEvents[t]=[])})},e.prototype.off=function(t,e){var i=this;(Array.isArray(t)?t:[t]).forEach(function(t){var s=i.events[t];s&&s.splice(s.indexOf(e),1)})},e.prototype.emit=function(t){for(var e=this,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.activeEvents;!!n.hasOwnProperty(t)&&n[t]||(n[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(e,i)}),n[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,i=[],s=arguments.length-1;s-- >0;)i[s]=arguments[s+1];var n=this.deferredEvents;(e=this).emit.apply(e,[t].concat(i)),(n[t]||(n[t]=[])).push(i)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var i=this,s=e.layout;return Array.isArray(s)||(s=[{component:Xi},{component:Vi}],e.transparency&&s.push({component:Vi,options:{sliderType:"alpha"}})),Re("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},s.map(function(t,s){var n=t.component,o=t.options;return Re(n,Object.assign({},e,o,{ref:void 0,onInput:i.emitInputEvent.bind(i),parent:i,index:s}))}))},e}(Ue);Yi.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Ji,Ki,Zi,Qi=(Ki=function(t,e){var i,s=document.createElement("div");function n(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(i.base),i.onMount(e)}return function(t,e,i){var s,n,o;Ee.__p&&Ee.__p(t,e),n=(s=i===Te)?null:e.__k,t=Re(Fe,null,[t]),o=[],Ke(e,e.__k=t,n||Le,Le,void 0!==e.ownerSVGElement,n?null:Ne.slice.call(e.childNodes),o,!1,Le,s),Ze(o,t)}(Re(Ji,Object.assign({},{ref:function(t){return i=t}},e)),s),"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n),i},Ki.prototype=(Ji=Yi).prototype,Object.assign(Ki,Ji),Ki.__component=Ji,Ki);!function(t){var e;t.version="5.5.2",t.Color=ki,t.ColorPicker=Qi,(e=t.ui||(t.ui={})).h=Re,e.ComponentBase=Hi,e.Handle=qi,e.Slider=Vi,e.Wheel=Xi,e.Box=Gi}(Zi||(Zi={}));var ts=Zi;const es="wled_studio.color_swatches";function is(t){return t.trim()||"_default"}function ss(){try{const t=localStorage.getItem(es);if(!t)return{};const e=JSON.parse(t);return e&&"object"==typeof e?e:{}}catch{return{}}}function ns(t){const e=ss()[is(t)];return Array.isArray(e)?[...e]:[]}function os(t,e){const i=ss();var s;i[is(t)]=e.slice(0,32),s=i,localStorage.setItem(es,JSON.stringify(s))}function rs(t,e){return`${t[0]},${t[1]},${t[2]},${e}`}function as(t,e){const i="#"+[t[0],t[1],t[2]].map(t=>Math.max(0,Math.min(255,t)).toString(16).padStart(2,"0")).join("");return e>0?`${i} +W`:i.toUpperCase()}let ls=class extends vt{constructor(){super(...arguments),this.controllerId="",this.rgb=[255,128,0],this.white=0,this._swatches=[],this._saving=!1,this._saveName="",this._editingId=null,this._editName="",this._pressTimer=null,this._pressSwatch=null,this._suppressChipClick=!1}onPoweredConnect(){this._reload()}updated(t){super.updated(t),t.has("controllerId")&&this._reload()}_reload(){this._swatches=ns(this.controllerId)}_currentKey(){return rs(this.rgb,this.white)}_swatchCss(t){const[e,i,s]=t.rgb;return t.white>0?`linear-gradient(135deg, rgb(${e},${i},${s}) 55%, rgba(255,255,255,0.95) 55%)`:`rgb(${e},${i},${s})`}_apply(t){this.dispatchEvent(new CustomEvent("swatch-select",{detail:{rgb:[...t.rgb],white:t.white},bubbles:!0,composed:!0}))}_openSave(){this._saveName=as(this.rgb,this.white),this._saving=!0,this._editingId=null}_confirmSave(){!function(t,e){const i=ns(t),s=rs(e.rgb,e.white),n=i.find(t=>rs(t.rgb,t.white)===s);if(n)return n.name=e.name.trim()||n.name,os(t,i),n;const o={id:`sw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,name:e.name.trim()||as(e.rgb,e.white),rgb:[...e.rgb],white:e.white};i.unshift(o),os(t,i)}(this.controllerId,{name:this._saveName,rgb:this.rgb,white:this.white}),this._saving=!1,this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_cancelSave(){this._saving=!1}_startEdit(t,e){e.stopPropagation(),this._editingId=t.id,this._editName=t.name,this._saving=!1}_confirmEdit(){this._editingId&&(!function(t,e,i){const s=ns(t),n=s.findIndex(t=>t.id===e);if(n<0)return null;const o=s[n],r={...o,...i,rgb:i.rgb?[...i.rgb]:o.rgb};void 0!==i.name&&(r.name=i.name.trim()||as(r.rgb,r.white)),s[n]=r,os(t,s)}(this.controllerId,this._editingId,{name:this._editName}),this._editingId=null,this._reload())}_cancelEdit(){this._editingId=null}_delete(t,e){e?.stopPropagation(),function(t,e){const i=ns(t).filter(t=>t.id!==e);os(t,i)}(this.controllerId,t),this._editingId===t&&(this._editingId=null),this._reload(),this.dispatchEvent(new CustomEvent("swatches-changed",{bubbles:!0,composed:!0}))}_clearPressTimer(){null!==this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null),this._pressSwatch=null}_confirmDelete(t){confirm(`Delete swatch "${t.name}"?`)&&this._delete(t.id),this._suppressChipClick=!1}_onChipTouchStart(t){this._clearPressTimer(),this._pressSwatch=t,this._pressTimer=setTimeout(()=>{this._pressTimer=null,this._suppressChipClick=!0,this._confirmDelete(t)},500)}_onChipTouchEnd(){this._clearPressTimer()}_onChipTouchMove(t){if(!this._pressSwatch||1!==t.touches.length)return;const e=t.touches[0],i=t.currentTarget.getBoundingClientRect();(e.clientX<i.left-12||e.clientX>i.right+12||e.clientY<i.top-12||e.clientY>i.bottom+12)&&this._clearPressTimer()}_onChipClick(t,e){if(this._suppressChipClick)return this._suppressChipClick=!1,e.preventDefault(),void e.stopPropagation();this._apply(t)}render(){const t=this._currentKey();return j`
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
                      class="chip-wrap ${rs(e.rgb,e.white)===t?"active":""}"
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
    `]}};t([ht()],ls.prototype,"controllerId",void 0),t([ht({type:Array})],ls.prototype,"rgb",void 0),t([ht({type:Number})],ls.prototype,"white",void 0),t([dt()],ls.prototype,"_swatches",void 0),t([dt()],ls.prototype,"_saving",void 0),t([dt()],ls.prototype,"_saveName",void 0),t([dt()],ls.prototype,"_editingId",void 0),t([dt()],ls.prototype,"_editName",void 0),ls=t([Dt("wled-color-swatch-bar")],ls);let cs=class extends vt{constructor(){super(...arguments),this.rgb=[255,128,0],this.white=0,this.awm=0,this.showWhite=!0,this.controllerId="",this._suppress=!1,this._lastSize=0}onPoweredConnect(){this.isPowered&&this.scheduleRaf(()=>{this.isPowered&&this._ensurePicker()})}firstUpdated(){this.isPowered&&this._bindResizeObserver()}onPoweredDisconnect(){this._destroyPicker(),super.onPoweredDisconnect()}updated(t){super.updated(t),this.isPowered?this.updateComplete.then(()=>{this.isConnected&&this.isPowered&&(this._ensurePicker(),this._picker&&t.has("rgb")&&this._syncPicker())}):this._destroyPicker()}_pickerInDom(){const t=this._host;return!!t&&Boolean(t.querySelector(".IroColorPicker, .IroWheel"))}_ensurePicker(){this._picker&&!this._pickerInDom()&&this._destroyPicker(),this._picker||this._tryMountOrResize()}_bindResizeObserver(){const t=this._host;t&&!this._ro&&(this._ro=new ResizeObserver(()=>{this.isPowered&&this._ensurePicker()}),this._ro.observe(t),this.addUnsub(()=>{this._ro?.disconnect(),this._ro=void 0}),this.isPowered&&this._ensurePicker())}_hostBox(t){const e=t.getBoundingClientRect();let i=e.width,s=e.height;if((i<8||s<8)&&(i=t.offsetWidth,s=t.offsetHeight),i<8||s<8){const e=getComputedStyle(t);i=parseFloat(e.width)||0,s=parseFloat(e.height)||0}if(i<8||s<8){const t=this.getBoundingClientRect();i=t.width||this.offsetWidth,s=t.height||this.offsetHeight}if(i>=8&&s<8&&(s=i),i<8&&s>=8&&(i=s),i<8&&s<8){const t=this.offsetWidth||280;i=Math.min(280,t),s=i}return{width:i,height:s}}_wheelSize(t,e){return function(t){const e=Math.floor(.7*t);return Math.max(180,Math.min(280,e||180))}(Math.min(t,e))}_tryMountOrResize(){const t=this._host;if(!t)return;const{width:e,height:i}=this._hostBox(t);if(e<8||i<8)return;const s=this._wheelSize(e,i);this._picker?s!==this._lastSize&&"function"==typeof this._picker.resize&&(this._picker.resize(s),this._lastSize=s):this._createPicker(t,s)}_borderColor(){return getComputedStyle(this).getPropertyValue("--wled-border").trim()||"rgba(255, 255, 255, 0.12)"}_createPicker(t,e){this._picker||(t.replaceChildren(),this._lastSize=e,this._picker=ts.ColorPicker(t,{width:e,color:{r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},borderWidth:1,borderColor:this._borderColor(),layout:[{component:ts.ui.Wheel}]}),this._picker.on("color:change",t=>{this._suppress||this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:[t.rgb.r,t.rgb.g,t.rgb.b],white:this.white},bubbles:!0,composed:!0}))}),this._syncPicker())}_destroyPicker(){this._host?.replaceChildren(),this._picker=void 0,this._lastSize=0}_syncPicker(){this._picker&&(this._suppress=!0,this._picker.color.rgb={r:this.rgb[0],g:this.rgb[1],b:this.rgb[2]},this._suppress=!1)}_onWhite(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("color-change",{detail:{rgb:this.rgb,white:e},bubbles:!0,composed:!0}))}_onAwm(t){const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("awm-change",{detail:{awm:e},bubbles:!0,composed:!0}))}_onSwatchSelect(t){this.dispatchEvent(new CustomEvent("color-change",{detail:t.detail,bubbles:!0,composed:!0}))}render(){return j`
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
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Array,hasChanged:(t,e)=>!t||!e||!function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}(t,e)})],cs.prototype,"rgb",void 0),t([ht({type:Number})],cs.prototype,"white",void 0),t([ht({type:Number})],cs.prototype,"awm",void 0),t([ht({type:Boolean})],cs.prototype,"showWhite",void 0),t([ht()],cs.prototype,"controllerId",void 0),t([pt(".wheel-host")],cs.prototype,"_host",void 0),cs=t([Dt("wled-color-wheel-rgbw")],cs);function hs(t,e="strip",i,s=0){let n=String(t);return s&&(n=`${n}_p${s}`),i?.trim()&&(n=`${n}_${function(t){return(t||"").trim().replace(/[^\w.-]+/g,"_")||"unknown"}(i)}`),`${n}_${e}.webp`}function ds(t,e,i="strip",s,n=0){const o=e instanceof Set?e:new Set(e);if(!o.size)return;const r=[hs(t,i,s,n),hs(t,i,s),hs(t,i,void 0,n),hs(t,i)];for(const t of r)if(o.has(t))return t;const a=n?`${t}_p${n}_`:`${t}_`,l=`_${i}.webp`;for(const t of o)if(t.startsWith(a)&&t.endsWith(l))return t;return n?ds(t,o,i,s,0):void 0}function ps(t,e,i="strip",s,n,o,r=0){if(!t||e<0)return;const a=void 0!==o?ds(e,o,i,s,r):hs(e,i,s,r);return a?function(t,e){if(!t.startsWith("/"))return t;const i=e?.auth?.data?.access_token;if(!i)return t;const s=t.includes("?")?"&":"?";return`${t}${s}auth=${encodeURIComponent(i)}`}(function(t,e){return`/local/wled_studio/thumbs/${encodeURIComponent(t)}/${encodeURIComponent(e)}`}(t,a),n):void 0}const us="wled_studio.recent_effects",gs="wled_studio.recent_scenes";function fs(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function _s(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function ms(t){return t?fs(us)[t]??[]:[]}function vs(t,e=72,i=6,s=10){if(t<=0)return 1;const n=e+i;return Math.max(1,Math.min(s,Math.floor((t+i)/n)))}const bs="wled_studio.pinned_effects";function ys(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function ws(t,e,i){if(!t)return[];const s=ys(bs),n=s[t]??[],o=n.findIndex(t=>t.id===e);return o>=0?n.splice(o,1):n.unshift({id:e,name:i}),s[t]=n,function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}(bs,s),s[t]}let xs=class extends vt{constructor(){super(...arguments),this.fxId=0,this.thumbUrl="",this.thumbUrlAnimated="",this.label="",this.listboxOption=!1,this.selected=!1,this._hover=!1}render(){const t=this.thumbUrlAnimated||(this.thumbUrl.endsWith(".webp")?this.thumbUrl:""),e=this.thumbUrl||t,i=this._hover&&t?t:e,s=this.label||`Effect ${this.fxId}`;return j`
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
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Number})],xs.prototype,"fxId",void 0),t([ht()],xs.prototype,"thumbUrl",void 0),t([ht()],xs.prototype,"thumbUrlAnimated",void 0),t([ht()],xs.prototype,"label",void 0),t([ht({type:Boolean,attribute:"listbox-option"})],xs.prototype,"listboxOption",void 0),t([ht({type:Boolean})],xs.prototype,"selected",void 0),t([dt()],xs.prototype,"_hover",void 0),xs=t([Dt("wled-effect-tile")],xs);let $s=class extends vt{constructor(){super(...arguments),this.effectsByName={},this.soundFlags=[],this.selectedFx=0,this.filter="",this.controllerId="",this.fwVer="",this.thumbBasenames=[],this.toggleOff=!0,this.showRecents=!0,this.tileGrid=!1,this.scrollPane=!1,this.selectedPalette=0,this.paletteAware=!1,this._category="all",this._recentEntries=[],this._pinnedEntries=[],this._recentVisible=6}onPoweredConnect(){this._loadRecents(),this._ro=new ResizeObserver(()=>this._measureRecents()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._loadRecents();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._recentRowEl&&(this._recentRowEl=e,this._ro?.observe(e),this._measureRecents())}_loadRecents(){var t;this._recentEntries=ms(this.controllerId),this._pinnedEntries=(t=this.controllerId)?ys(bs)[t]??[]:[],this.soundFlags.length&&!this.soundFlags.some(t=>"v"===t||"f"===t)&&console.debug(`[wled-studio] sound_flags for ${this.controllerId} contain no v/f entries — Music filter will rely on name heuristics`)}_togglePin(t,e){e.stopPropagation(),this.controllerId&&(this._pinnedEntries=ws(this.controllerId,t,this._effectName(t)))}_measureRecents(){const t=this._recentRowEl;if(!t)return;const e=vs(t.clientWidth,76,6,10);e!==this._recentVisible&&(this._recentVisible=e)}_effectName(t){return Object.entries(this.effectsByName).find(([,e])=>e===t)?.[0]??`Effect ${t}`}render(){const t=this.filter.trim().toLowerCase(),e=Object.keys(this.effectsByName).sort((t,e)=>t.localeCompare(e)),i=he(this.effectsByName),s=e.filter(e=>!!pe(e,this.effectsByName[e],this._category,this.soundFlags,this.effectsByName)&&!(t&&!e.toLowerCase().includes(t))),n=this.showRecents&&!t&&this._recentEntries.length>0,o=this._recentEntries.slice(0,this._recentVisible),r=!t&&this._pinnedEntries.length>0;return j`
      <div
        class="wrap ${this.tileGrid?"tile-grid":""} ${this.scrollPane?"scroll-pane":""}"
      >
        ${r?j`
              <div class="recent-block">
                <span class="recent-label">Library</span>
                <div class="recent-row" role="group" aria-label="Pinned effects">
                  ${this._pinnedEntries.map(t=>{const e=t.id,s=t.name,n=e===this.selectedFx;return j`
                      <button
                        type="button"
                        class="recent-chip library ${n?"active":""}"
                        aria-label=${`Apply pinned effect ${s}`}
                        aria-pressed=${n?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${n?j`
              <div class="recent-block">
                <span class="recent-label">Recent</span>
                <div class="recent-row" role="group" aria-label="Recent effects">
                  ${o.map(t=>{const e=t.id,s=t.name,n=this.soundFlags[e],o=e===this.selectedFx;return j`
                      <button
                        type="button"
                        class="recent-chip ${o?"active":""}"
                        aria-label=${`Apply effect ${s}`}
                        aria-pressed=${o?"true":"false"}
                        @click=${()=>this._pick(e,i)}
                      >
                        ${s}
                        ${"v"===n?j`<span class="badge">♪</span>`:null}
                        ${"f"===n?j`<span class="badge">♫</span>`:null}
                        ${"2"===n?j`<span class="badge dim">2D</span>`:null}
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
                ${ce[t]}
              </button>
            `)}
        </div>
        <div class="grid" role="listbox" aria-label="Effects">
          ${0===s.length?j`<p class="empty">No effects match this filter.</p>`:s.map(t=>{const e=this.effectsByName[t],s=this.soundFlags[e],n=e===this.selectedFx,o=ps(this.controllerId,e,"strip",this.fwVer,this.hass,this.thumbBasenames,this.paletteAware?this.selectedPalette:0),r=t+("v"===s?" ♪":"")+("f"===s?" ♫":"")+("2"===s?" 2D":"");return o?j`
                    <wled-effect-tile
                      class="chip-tile ${n?"active":""}"
                      listbox-option
                      .selected=${n}
                      .fxId=${e}
                      .thumbUrl=${o}
                      .label=${r}
                      @click=${()=>this._pick(e,i)}
                    ></wled-effect-tile>
                  `:j`
                  <button
                    type="button"
                    class="chip ${n?"active":""}"
                    role="option"
                    aria-selected=${n?"true":"false"}
                    aria-label=${r}
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
    `}_pick(t,e){this.toggleOff&&t===this.selectedFx?this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:e,toggledOff:!0},bubbles:!0,composed:!0})):(this.showRecents&&this.controllerId&&(this._recentEntries=function(t,e,i,s){if(!t)return[];if(e===(s.solidId??0))return ms(t);const n=fs(us),o=(n[t]??[]).filter(t=>t.id!==e);return o.unshift({id:e,name:i}),n[t]=o.slice(0,10),_s(us,n),n[t]}(this.controllerId,t,this._effectName(t),{solidId:e})),this.dispatchEvent(new CustomEvent("effect-select",{detail:{effectId:t,toggledOff:!1},bubbles:!0,composed:!0})))}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Object})],$s.prototype,"effectsByName",void 0),t([ht({type:Array})],$s.prototype,"soundFlags",void 0),t([ht({type:Number})],$s.prototype,"selectedFx",void 0),t([ht({type:String})],$s.prototype,"filter",void 0),t([ht()],$s.prototype,"controllerId",void 0),t([ht()],$s.prototype,"fwVer",void 0),t([ht({type:Array})],$s.prototype,"thumbBasenames",void 0),t([ht({type:Boolean})],$s.prototype,"toggleOff",void 0),t([ht({type:Boolean})],$s.prototype,"showRecents",void 0),t([ht({type:Boolean,attribute:"tile-grid"})],$s.prototype,"tileGrid",void 0),t([ht({type:Boolean,attribute:"scroll-pane"})],$s.prototype,"scrollPane",void 0),t([ht({type:Number})],$s.prototype,"selectedPalette",void 0),t([ht({type:Boolean,attribute:"palette-aware"})],$s.prototype,"paletteAware",void 0),t([dt()],$s.prototype,"_category",void 0),t([dt()],$s.prototype,"_recentEntries",void 0),t([dt()],$s.prototype,"_pinnedEntries",void 0),t([dt()],$s.prototype,"_recentVisible",void 0),$s=t([Dt("wled-effect-chips")],$s);let Ss=class extends vt{constructor(){super(...arguments),this.controllerId="",this.segments=[],this.editIds=[],this.pixelCount=210,this.compact=!1,this._merged=!1,this._busy=!1,this._error=""}onPoweredConnect(){this._merged=ve(this.controllerId)}willUpdate(t){t.has("controllerId")&&(this._merged=ve(this.controllerId))}render(){const t=we(this.controllerId),e=t&&this._merged?`${t.segments.length} segment layout saved`:null;return j`
      <label class="merge-row ${this._merged?"on":""} ${this.compact?"compact":""}">
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
    `}async _onToggle(t){const e=t.target.checked;if(this.connection&&this.controllerId){this._busy=!0,this._error="";try{if(e){const t=await kt(this.connection,this.controllerId),e=t.segments??this.segments,i=t.info?.leds,s=Number(i?.count)||this.pixelCount;xe(this.controllerId,e,s);const n=Se(e,s,this.editIds.length?this.editIds:void 0);await Ct(this.connection,this.controllerId,n,{fullResponse:!0}),ye(this.controllerId,!0),this._merged=!0}else{const t=we(this.controllerId);if(!t)throw new Error("No saved segment layout to restore");await Ct(this.connection,this.controllerId,$e(t),{fullResponse:!0}),ye(this.controllerId,!1),function(t){const e=_e(ue);delete e[t],me(ue,e)}(this.controllerId),this._merged=!1}this.dispatchEvent(new CustomEvent("merge-changed",{detail:{merged:this._merged},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(e){this._error=e instanceof Error?e.message:String(e),t.target.checked=this._merged}finally{this._busy=!1}}}static{this.styles=[...mt,r`
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
      .merge-row.compact {
        padding: 6px 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      .merge-row.compact .merge-label {
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
    `]}};t([ht({attribute:!1})],Ss.prototype,"connection",void 0),t([ht()],Ss.prototype,"controllerId",void 0),t([ht({type:Array})],Ss.prototype,"segments",void 0),t([ht({type:Array})],Ss.prototype,"editIds",void 0),t([ht({type:Number})],Ss.prototype,"pixelCount",void 0),t([ht({type:Boolean,reflect:!0})],Ss.prototype,"compact",void 0),t([dt()],Ss.prototype,"_merged",void 0),t([dt()],Ss.prototype,"_busy",void 0),t([dt()],Ss.prototype,"_error",void 0),Ss=t([Dt("wled-effect-merge-toggle")],Ss);const Is={default:"linear-gradient(90deg, #000 0%, #444 50%, #fff 100%)","random cycle":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",lava:"linear-gradient(90deg, #000 0%, #800 25%, #f40 55%, #fc0 100%)",ocean:"linear-gradient(90deg, #001028 0%, #004080 40%, #0088cc 70%, #aaf 100%)",forest:"linear-gradient(90deg, #020 0%, #060 30%, #080 55%, #0a0 80%, #5f5 100%)",rainbow:"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)","rainbow bands":"repeating-linear-gradient(90deg, #f00 0 8%, #ff0 8% 16%, #0f0 16% 24%, #0ff 24% 32%, #00f 32% 40%, #f0f 40% 48%)",sunset:"linear-gradient(90deg, #102 0%, #804 35%, #f60 65%, #fc0 100%)",rivendell:"linear-gradient(90deg, #234 0%, #356 45%, #8ab 100%)",breeze:"linear-gradient(90deg, #246 0%, #48a 50%, #bdf 100%)","red & blue":"linear-gradient(90deg, #900 0%, #900 45%, #009 55%, #009 100%)",yellowout:"linear-gradient(90deg, #000 0%, #880 40%, #ff0 100%)",analogous:"linear-gradient(90deg, #f80, #ff0, #8f0, #0f8)",splash:"linear-gradient(90deg, #08f, #0fa, #8f0, #fa0, #f08)",pastel:"linear-gradient(90deg, #f9a, #fd9, #9f9, #9cf, #c9f)","sunset 2":"linear-gradient(90deg, #201 0%, #906 40%, #f84 75%, #fe8 100%)",beech:"linear-gradient(90deg, #210 0%, #630 35%, #a80 70%, #da8 100%)",mint:"linear-gradient(90deg, #042 0%, #086 50%, #6fc 100%)","april night":"linear-gradient(90deg, #012 0%, #248 45%, #48c 75%, #acf 100%)",orangery:"linear-gradient(90deg, #310 0%, #f70 55%, #fc8 100%)",c9:"linear-gradient(90deg, #f00 0%, #f00 20%, #0f0 20%, #0f0 40%, #08f 40%, #08f 60%, #ff0 60%, #ff0 80%, #f0f 80%, #f0f 100%)",sakura:"linear-gradient(90deg, #304 0%, #c68 50%, #fbd 100%)",aurora:"linear-gradient(90deg, #020 0%, #0a6 35%, #28f 65%, #8af 100%)",atlantica:"linear-gradient(90deg, #024 0%, #068 40%, #0ac 70%, #4ef 100%)","c9 2":"linear-gradient(90deg, #f44, #4f4, #44f, #ff4, #f4f)","c9 new":"linear-gradient(90deg, #e33, #3e3, #33e, #ee3, #e3e)",magenta:"linear-gradient(90deg, #400 0%, #808 50%, #f0f 100%)",magred:"linear-gradient(90deg, #808 0%, #c04 50%, #f00 100%)",yelmag:"linear-gradient(90deg, #ff0 0%, #f80 50%, #f0f 100%)",yelblu:"linear-gradient(90deg, #ff0 0%, #0af 100%)","orange & teal":"linear-gradient(90deg, #f70 0%, #f70 48%, #088 52%, #088 100%)",tiamat:"linear-gradient(90deg, #208 0%, #408 30%, #80c 60%, #c4f 100%)","fire & ice":"linear-gradient(90deg, #f40 0%, #fc0 35%, #08f 65%, #acf 100%)",cyberpunk:"linear-gradient(90deg, #f0f 0%, #0ff 50%, #ff0 100%)","cyberpunk 2":"linear-gradient(90deg, #80f 0%, #0fa 45%, #f08 100%)","color gradient":"linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)","color bands":"repeating-linear-gradient(90deg, #f00 0 12%, #ff0 12% 24%, #0f0 24% 36%, #0ff 36% 48%, #00f 48% 60%, #f0f 60% 72%)",party:"linear-gradient(90deg, #f00, #0f0, #00f, #ff0, #f0f, #0ff)",cloud:"linear-gradient(90deg, #456 0%, #789 50%, #cde 100%)",lava2:"linear-gradient(90deg, #100 0%, #a00 40%, #f60 75%, #ff0 100%)",ocean2:"linear-gradient(90deg, #012 0%, #036 40%, #09c 75%, #6df 100%)",pinkpurple:"linear-gradient(90deg, #608 0%, #a0a 50%, #f8f 100%)",esrever:"linear-gradient(90deg, #fff 0%, #888 50%, #000 100%)","empty slot":"linear-gradient(90deg, #333 0%, #555 50%, #333 100%)"};function ks(t,e,i){const s=i?.[String(e)];return s||function(t){const e=t.toLowerCase().trim(),i=Is[e];if(i)return i;const s=function(t){let e=0;for(let i=0;i<t.length;i++)e=31*e+t.charCodeAt(i)>>>0;return e%360}(e);return`linear-gradient(90deg, hsl(${s} 75% 35%), hsl(${(s+72)%360} 80% 48%), hsl(${(s+144)%360} 75% 58%))`}(t)}let Cs=class extends vt{constructor(){super(...arguments),this.palettesByName={},this.palettePreviews={},this.selectedPal=0,this.filter="",this.deviceHost="",this.compact=!1,this.collapsible=!1,this._open=!0,this._localFilter="",this._editorOpen=!1}willUpdate(t){t.has("filter")&&this.filter!==this._localFilter&&(this._localFilter=this.filter)}_paletteName(t){return Object.entries(this.palettesByName).find(([,e])=>e===t)?.[0]??`Palette ${t}`}_gradient(t,e){return ks(t,e,this.palettePreviews)}_editorUrl(){const t=this.deviceHost.trim();if(!t)return null;return`${t.startsWith("http")?t.replace(/\/$/,""):`http://${t}`}/cpal.htm`}_renderEditorActions(t){return t?j`
      <div class="editor-actions">
        <button type="button" class="editor-btn" @click=${()=>this._openEditor()}>
          <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
          Edit palettes
        </button>
        <a class="editor-link" href=${t} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>
    `:null}_openEditor(){this._editorOpen=!0}_closeEditor(){this._editorOpen=!1,this.dispatchEvent(new CustomEvent("palette-catalog-changed",{bubbles:!0,composed:!0}))}render(){const t=(this._localFilter||this.filter).trim().toLowerCase(),e=Object.keys(this.palettesByName).sort((t,e)=>t.localeCompare(e)),i=e.filter(e=>!t||e.toLowerCase().includes(t)),s=this._paletteName(this.selectedPal),n=this._editorUrl(),o=j`
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
      ${this._renderEditorActions(n)}
      <p class="count">${i.length} palette${1===i.length?"":"s"}</p>
    `,r=this._editorOpen&&n?j`
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
                  src=${n}
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
          ${o}
        </details>
        ${r}
      `:j`
      <div class="wrap ${this.compact?"compact":""}">
        <div class="head">
          <span class="head-label">Palette</span>
          ${n?j`
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
        ${o}
      </div>
      ${r}
    `}_pick(t){this.dispatchEvent(new CustomEvent("palette-select",{detail:{paletteId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Object})],Cs.prototype,"palettesByName",void 0),t([ht({type:Object})],Cs.prototype,"palettePreviews",void 0),t([ht({type:Number})],Cs.prototype,"selectedPal",void 0),t([ht()],Cs.prototype,"filter",void 0),t([ht()],Cs.prototype,"deviceHost",void 0),t([ht({type:Boolean})],Cs.prototype,"compact",void 0),t([ht({type:Boolean,attribute:"collapsible"})],Cs.prototype,"collapsible",void 0),t([dt()],Cs.prototype,"_open",void 0),t([dt()],Cs.prototype,"_localFilter",void 0),t([dt()],Cs.prototype,"_editorOpen",void 0),Cs=t([Dt("wled-palette-chips")],Cs);let Es=class extends vt{constructor(){super(...arguments),this.presets=[]}render(){const t=this.presets.filter(t=>t.ql),e=this.presets.filter(t=>!t.ql||t.name);return j`
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
    `]}};t([ht({type:Array})],Es.prototype,"presets",void 0),Es=t([Dt("wled-preset-bar")],Es);const Ps=["For each","Bar","Arc","Corner"],As=["Replace","Add","Subtract","Multiply","Lighten","Darken"],Ms=["Off","GEQ pulse","WaveSin","Sweep"];let Ts=class extends vt{constructor(){super(...arguments),this.compact=!1}_emit(t){this.dispatchEvent(new CustomEvent("segment-patch",{detail:t,bubbles:!0,composed:!0}))}_num(t,e,i,s){const n=this.segment;if(!n)return null;const o=n[t]??i;return j`
      <label class="cell">
        <span class="cell-label">${e}<span class="cell-val">${o}</span></span>
        <ha-slider
          min=${i}
          max=${s}
          step="1"
          .value=${o}
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
    `}_select(t,e,i){const s=this.segment;if(!s)return null;const n=s[t]??0;return j`
      <label class="cell">
        <span class="cell-label">${e}</span>
        <select
          .value=${String(n)}
          @change=${e=>{const i=Number(e.target.value);this._emit({[t]:i})}}
        >
          ${i.map((t,e)=>j`<option value=${e} ?selected=${e===n}>${t}</option>`)}
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
          ${this._select("si","Sound simulation",Ms)}
          ${this._select("m12","1D-in-2D mode",Ps)}
          ${this._select("bm","Blend mode",As)}
        </div>
      </details>
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht({attribute:!1})],Ts.prototype,"segment",void 0),t([ht({attribute:!1})],Ts.prototype,"meta",void 0),t([ht({type:Boolean})],Ts.prototype,"compact",void 0),Ts=t([Dt("wled-segment-advanced")],Ts);let Ls=class extends vt{constructor(){super(...arguments),this.width="100%",this.height="1rem",this.roundedFull=!1}render(){return j`
      <div
        class="block ${this.roundedFull?"pill":""}"
        style="width:${this.width};height:${this.height}"
        aria-hidden="true"
      ></div>
    `}static{this.styles=[...mt,r`
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
    `]}};t([ht()],Ls.prototype,"width",void 0),t([ht()],Ls.prototype,"height",void 0),t([ht({type:Boolean,attribute:"rounded-full"})],Ls.prototype,"roundedFull",void 0),Ls=t([Dt("wled-skeleton")],Ls);const Ns={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Os=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this.wholeMode=!1,this.hideSegmentBrightness=!1,this.selectedSegId=-1,this.masterEntity="",this._loading=!0,this._error="",this._segId=0,this._editIds=[],this._segments=[],this._effectFilter="",this._presets=[],this._colorSlot=0,this._mergeActive=!1,this._saveSceneOpen=!1,this._saveSceneName="",this._lastMasterBri255=null,this._lastHaColorKey="",this._dragSegId=null}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this.masterEntity&&this._syncFromMasterEntity(),this._syncColorFromHaEntity()),t.has("masterEntity")&&this.masterEntity&&this.hass&&this._syncFromMasterEntity(),(t.has("_segId")||t.has("_colorSlot"))&&this.hass&&this._syncColorFromHaEntity()}applyGlobalBrightness(t){const e=Math.max(0,Math.min(255,Math.round(t)));this._lastMasterBri255=e,this._segments.length&&(this._segments=this._segments.map(t=>({...t,bri:e})),this.requestUpdate())}_syncFromMasterEntity(){if(!this.hass||!this.masterEntity)return;const t=function(t){return Rt(Bt(t))}(this.hass.states[this.masterEntity]);this._lastMasterBri255!==t&&this.applyGlobalBrightness(t)}_syncColorFromHaEntity(){if(!this.hass)return;const t=this._colorEntityId();if(!t)return;const e=function(t){if(!t)return null;const e=t.attributes?.rgbw_color;if(Array.isArray(e)&&e.length>=3)return[Number(e[0])||0,Number(e[1])||0,Number(e[2])||0,Number(e[3])||0];const i=t.attributes?.rgb_color;return Array.isArray(i)&&i.length>=3?[Number(i[0])||0,Number(i[1])||0,Number(i[2])||0,0]:null}(this.hass.states[t]);if(!e)return;const i=`${t}:${e[0]},${e[1]},${e[2]},${e[3]}`;if(i===this._lastHaColorKey)return;const s=this._activeSeg();if(!s)return;const n=this._cols(s),o=n[this._colorSlot]??n[0];if(o[0]===e[0]&&o[1]===e[1]&&o[2]===e[2]&&o[3]===e[3])return void(this._lastHaColorKey=i);this._lastHaColorKey=i,n[this._colorSlot]=e;const r=this._segments.findIndex(t=>t.id===s.id);if(r<0)return;const a=[...this._segments];a[r]={...a[r],col:n.map(t=>[t[0],t[1],t[2],t[3]])},this._segments=a,this.requestUpdate()}_colorEntityId(){if(this.wholeMode&&this.masterEntity)return this.masterEntity;const t=this._activeSeg();return t?Lt(t.id,this._snapshot?.segment_entities??[])??"":""}onPoweredConnect(){this._mergeActive=ve(this.controllerId),this._load()}willUpdate(t){t.has("selectedSegId")&&this.selectedSegId>=0&&(this._segId=this.selectedSegId,this._refreshMeta()),(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&(this._optimistic?.cancel(),this._optimistic=Ce(this.connection,this.controllerId,(t,e)=>this._reconcile(t,e)),this._load())}onPoweredDisconnect(){this._optimistic?.cancel(),this._optimistic=void 0}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._segId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("segment-change",{detail:{segmentId:this._segId,editIds:[...this._editIds]},bubbles:!0,composed:!0}))}selectSegment(t){if(this._mergeActive)return this._segId=0,void this._refreshMeta();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Pt(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}async _load(){if(this.connection&&this.controllerId){this._loading=!0,this._error="";try{const t=await kt(this.connection,this.controllerId);if(this._snapshot=t,this._segments=[...t.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id);t.includes(this._segId)||(this._segId=this._segments[0].id);const e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:[this._segId]}await this._refreshMeta(),await this._loadPresets(),this._mergeActive=ve(this.controllerId);const e=this._pixelCount();this._mergeActive&&be(this._segments,e)&&(this._editIds=Ie(this._segments),this._segId=this._editIds[0]??0),this.wholeMode&&this._segments.length&&(this._editIds=this._segments.map(t=>t.id),this._segId=this._segments[0].id),this._emitTargetsChanged()}catch(t){this._error=le(t)}finally{this._loading=!1,null!==this._lastMasterBri255&&this.applyGlobalBrightness(this._lastMasterBri255)}}}async _loadPresets(){if(this.connection&&this.controllerId)try{const t=await async function(t,e){return(await t.sendMessagePromise({type:"wled_studio/get_presets",schema_version:1,controller_id:e})).presets??{}}(this.connection,this.controllerId),e=[];for(const[i,s]of Object.entries(t)){if(!s||"object"!=typeof s)continue;const t=s;e.push({id:i,name:String(t.n??t.name??`Preset ${i}`),ql:t.ql?String(t.ql):void 0})}e.sort((t,e)=>Number(t.id)-Number(e.id)),this._presets=e}catch{this._presets=[]}}_reconcile(t,e){const i=this._segments.findIndex(e=>e.id===t.id);if(i>=0){const e=[...this._segments];e[i]={...e[i],...t,id:t.id},this._segments=e}e?ee(this,e):this.requestUpdate()}_activeSeg(){return this._segments.find(t=>t.id===this._segId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Et(this.connection,this.controllerId,t.fx??0))}async _syncHaSegment(t,e){if(!this.hass)return;const i=Lt(t.id,this._snapshot?.segment_entities??[]);if(!i)return;const s={entity_id:i};if(e.col?.length){const t=At(e.col[0]);t[3]>0?s.rgbw_color=[t[0],t[1],t[2],t[3]]:s.rgb_color=[t[0],t[1],t[2]]}if(void 0!==e.bri&&(s.brightness=e.bri),void 0!==e.fx&&this._snapshot?.effects_by_name){const t=Object.entries(this._snapshot.effects_by_name).find(([,t])=>t===e.fx)?.[0];t&&(s.effect=t)}!1!==e.on?Object.keys(s).length>1&&await this.hass.callService("light","turn_on",s):await this.hass.callService("light","turn_off",{entity_id:i})}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this.wholeMode&&this._segments.length)return this._segments.map(t=>t.id);if(this._mergeActive){const t=Ie(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._segId]}_onMergeChanged(){this._mergeActive=ve(this.controllerId),this._load(),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}_patchSeg(t){const e=this._targetIds();if(!e.length||!this._optimistic)return;const i=[...this._segments];for(const s of e){const e=i.findIndex(t=>t.id===s);if(e<0)continue;const n=i[e];i[e]={...n,...t,id:s,sel:!0,on:void 0!==t.on?t.on:!1!==n.on},this._syncHaSegment(n,t)}this._segments=i;const s=this._activeSeg();this._optimistic.push(Nt(e,t,this._segments),s??{id:e[0]})}async _syncSelToDevice(){if(!this.connection||!this.controllerId||!this._segments.length)return;const t=this._targetIds();await Ct(this.connection,this.controllerId,function(t,e){const i=new Set(t);return{seg:e.map(t=>({id:t.id,sel:i.has(t.id)}))}}(t,this._segments)),this._segments=this._segments.map(e=>({...e,sel:t.includes(e.id)}))}_toggleSegEdit(t){if(this._mergeActive)return;let e=re(this._editIds,t);e.length||(e=[t]),this._editIds=e,this._segId=t,this._colorSlot=0,this._refreshMeta(),this._syncSelToDevice(),this._emitTargetsChanged()}_reorderSegmentsVisual(t,e){const i=this._segments.findIndex(e=>e.id===t),s=this._segments.findIndex(t=>t.id===e);if(i<0||s<0||i===s)return;const n=[...this._segments],[o]=n.splice(i,1);n.splice(s,0,o),this._segments=n}_onSegDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onSegDragOver(t,e){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move")}_onSegDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this._reorderSegmentsVisual(i,t)}_onSegDragEnd(){this._dragSegId=null}async _onEffectSelect(t){this._patchSeg({fx:t.detail.effectId}),await this._refreshMeta()}_cols(t){const e=t.col??[],i=[];for(let t=0;t<3;t++)i.push(At(e[t]));return i}_onColor(t){const e=this._activeSeg();if(!e)return;const{rgb:i,white:s}=t.detail;this._lastHaColorKey=`${this._colorEntityId()}:${i[0]},${i[1]},${i[2]},${s}`;const n=this._cols(e);n[this._colorSlot]=[i[0],i[1],i[2],s];const o=he(this._snapshot?.effects_by_name??{});this._patchSeg({col:n.map(t=>[t[0],t[1],t[2],t[3]]),fx:o}),this._refreshMeta()}async _onAwm(t){const e=t.detail.awm;if(this.connection&&this.controllerId)try{const t=await async function(t,e,i,s=0){return await $t(t),(await t.sendMessagePromise({type:"wled_studio/apply_rgbwm",schema_version:1,controller_id:e,rgbwm:i,bus_index:s})).rgbwm??i}(this.connection,this.controllerId,e);this._snapshot&&(this._snapshot={...this._snapshot,rgbwm:t}),this.requestUpdate()}catch(t){ee(this,t instanceof Error?t.message:String(t))}}_slider(t,e){const i=Number(e.target.value);this._patchSeg({[t]:i})}async _loadPreset(t){this.connection&&this.controllerId&&(await Ct(this.connection,this.controllerId,{ps:Number(t)}),await this._load())}_renderSkeleton(){return j`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading segments">
        <wled-skeleton height="2rem" width="100%"></wled-skeleton>
        <wled-skeleton height="220px" width="min(100%, 280px)"></wled-skeleton>
        <wled-skeleton height="1rem" width="70%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:4},()=>j`<wled-skeleton height="56px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){if(this._loading)return this._renderSkeleton();if(this._error)return j`<p class="err">${this._error}</p>`;const t=this._activeSeg();if(!t)return j`<p class="muted">No segments on this controller.</p>`;const e=this._cols(t),i=e[this._colorSlot]??e[0],s=this._meta,n=s?.sliders??{},o=!1!==s?.colors_enabled?3:1,r=this._snapshot?.rgbwm??0;return j`
      <div class="controls ${this.compact?"compact":""}">
        ${this.wholeMode?j`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`:null}
        ${!this.wholeMode&&this.connection&&this.controllerId?j`
              <wled-effect-merge-toggle
                ?compact=${this.compact}
                class=${this.compact?"compact-merge":""}
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
                <span class="seg-label">${ae(t,this._snapshot?.segment_entities??[])}</span>
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
          .awm=${r}
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
          ${Object.entries(Ns).map(([e,i])=>{if(!n[e])return null;const s=t[e];return j`
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
    `}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await oe(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,ee(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){ee(this,t instanceof Error?t.message:String(t))}}get segments(){return this._segments}static{this.styles=[...mt,r`
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
    `]}};t([ht({attribute:!1})],Os.prototype,"connection",void 0),t([ht({attribute:!1})],Os.prototype,"hass",void 0),t([ht()],Os.prototype,"controllerId",void 0),t([ht({type:Boolean})],Os.prototype,"compact",void 0),t([ht({type:Boolean})],Os.prototype,"wholeMode",void 0),t([ht({type:Boolean,attribute:"hide-segment-brightness"})],Os.prototype,"hideSegmentBrightness",void 0),t([ht({type:Number})],Os.prototype,"selectedSegId",void 0),t([ht()],Os.prototype,"masterEntity",void 0),t([dt()],Os.prototype,"_loading",void 0),t([dt()],Os.prototype,"_error",void 0),t([dt()],Os.prototype,"_segId",void 0),t([dt()],Os.prototype,"_editIds",void 0),t([dt()],Os.prototype,"_segments",void 0),t([dt()],Os.prototype,"_snapshot",void 0),t([dt()],Os.prototype,"_meta",void 0),t([dt()],Os.prototype,"_effectFilter",void 0),t([dt()],Os.prototype,"_presets",void 0),t([dt()],Os.prototype,"_colorSlot",void 0),t([dt()],Os.prototype,"_mergeActive",void 0),t([dt()],Os.prototype,"_saveSceneOpen",void 0),t([dt()],Os.prototype,"_saveSceneName",void 0),Os=t([Dt("wled-segment-controls")],Os);const zs="wled_studio.effect_defaults",Bs="wled_studio.effect_library";function Rs(t){try{const e=localStorage.getItem(t);if(!e)return{};const i=JSON.parse(e);return"object"==typeof i&&i?i:{}}catch{return{}}}function Ds(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}function Fs(t,e){if(!t)return null;const i=function(t){return Rs(zs)[t]??{}}(t)[String(e)];return i??null}function Us(t){return t?Rs(Bs)[t]??[]:[]}let Ws=class extends vt{constructor(){super(...arguments),this.segments=[],this.selectedIds=[],this.segmentEntities=[],this.hint="Tap segments to toggle",this._dragSegId=null}render(){return this.segments.length?j`
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
                <span class="btn-label">${ae(t,this.segmentEntities)}</span>
              </button>
            `)}
        </div>
      </div>
    `:null}_toggle(t){this.dispatchEvent(new CustomEvent("segment-toggle",{detail:{id:t},bubbles:!0,composed:!0}))}_onDragStart(t,e){this._dragSegId=t,e.dataTransfer?.setData("text/plain",String(t)),e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_onDrop(t,e){e.preventDefault();const i=this._dragSegId;this._dragSegId=null,null!==i&&i!==t&&this.dispatchEvent(new CustomEvent("segment-reorder",{detail:{fromId:i,toId:t},bubbles:!0,composed:!0}))}static{this.styles=[...mt,r`
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
    `]}};t([ht({type:Array})],Ws.prototype,"segments",void 0),t([ht({type:Array})],Ws.prototype,"selectedIds",void 0),t([ht({type:Array})],Ws.prototype,"segmentEntities",void 0),t([ht()],Ws.prototype,"hint",void 0),t([dt()],Ws.prototype,"_dragSegId",void 0),Ws=t([Dt("wled-segment-bar")],Ws);const js={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let Hs=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._segments=[],this._editIds=[],this._focusSegId=0,this._filter="",this._status="Loading effects…",this._mergeActive=!1,this._library=[],this._saveCopyOpen=!1,this._saveCopyName="",this._saveSceneOpen=!1,this._saveSceneName="",this._needsMergeApply=!1}onPoweredConnect(){this._mergeActive=ve(this.controllerId),this._library=Us(this.controllerId),this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}async _refreshPalettePreviews(){if(this.connection&&this.controllerId&&this._snapshot)try{const t=await Pt(this.connection,this.controllerId);this._snapshot={...this._snapshot,palette_previews:t}}catch{}}_onPaletteCatalogChanged(){this._refreshPalettePreviews()}async _load(){if(this.connection&&this.controllerId){this._status="Loading effects…";try{if(this._snapshot=await kt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length){const t=this._segments.map(t=>t.id),e=this._editIds.filter(e=>t.includes(e));this._editIds=e.length?e:t,t.includes(this._focusSegId)||(this._focusSegId=this._segments[0].id)}const t=this._pixelCount();this._mergeActive=ve(this.controllerId);const e=be(this._segments,t);this._needsMergeApply=this._mergeActive&&this._segments.length>1&&!e,this._mergeActive&&e&&(this._editIds=Ie(this._segments),this._focusSegId=this._editIds[0]??0),await this._refreshMeta(),this._status="",this._emitTargetsChanged()}catch{this._status="Could not load device state."}}}get highlightSegmentIds(){return this._targetIds()}_emitTargetsChanged(){this.dispatchEvent(new CustomEvent("segment-targets-changed",{detail:{segmentId:this._focusSegId,editIds:[...this._editIds],mergeActive:this._mergeActive,highlightIds:this.highlightSegmentIds},bubbles:!0,composed:!0}))}async confirmMergeApply(){await this._applyMergeOnDevice(this._pixelCount()),this._needsMergeApply=!1,await this._load()}async _applyMergeOnDevice(t){if(!this.connection||!this.controllerId||!this._snapshot)return;xe(this.controllerId,this._segments,t);const e=Se(this._segments,t,this._editIds.length?this._editIds:void 0);await Ct(this.connection,this.controllerId,e,{fullResponse:!0}),ye(this.controllerId,!0),this._snapshot=await kt(this.connection,this.controllerId),this._segments=[...this._snapshot.segments??[]].sort((t,e)=>t.id-e.id)}_activeSeg(){return this._segments.find(t=>t.id===this._focusSegId)??this._segments[0]}async _refreshMeta(){const t=this._activeSeg();this.connection&&this.controllerId&&t&&(this._meta=await Et(this.connection,this.controllerId,t.fx??0))}selectSegmentFromPreview(t){if(this._mergeActive)return this._focusSegId=0,this._refreshMeta(),void this._emitTargetsChanged();this._editIds.includes(t)||(this._editIds=[...this._editIds,t].sort((t,e)=>t-e)),this._focusSegId=t,this._refreshMeta(),this._emitTargetsChanged()}_onSegToggle(t){if(this._mergeActive)return;let e=re(this._editIds,t.detail.id);e.length||(e=[t.detail.id]),this._editIds=e,this._focusSegId=t.detail.id,this._refreshMeta(),this._emitTargetsChanged()}_pixelCount(){const t=this._snapshot?.info?.leds;return Number(t?.count)||210}_targetIds(){if(this._mergeActive){const t=Ie(this._segments);return t.length?t:[0]}return this._editIds.length?this._editIds:[this._focusSegId]}_onMergeChanged(){this._mergeActive=ve(this.controllerId),this._load(),this._emitTargetsChanged()}_effectName(t){return Object.entries(this._snapshot?.effects_by_name??{}).find(([,e])=>e===t)?.[0]??`Effect ${t}`}_sliderValuesFromSeg(){const t=this._activeSeg();return t?function(t){const e={};for(const i of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[i];"number"==typeof s&&(e[i]=s)}return e}(t):{}}_saveAsDefault(){const t=this._activeSeg();t&&this.controllerId&&(!function(t,e,i){if(!t)return;const s=Rs(zs),n={...s[t]??{}};n[String(e)]={...i},s[t]=n,Ds(zs,s)}(this.controllerId,t.fx??0,this._sliderValuesFromSeg()),ee(this,`Saved default options for ${this._effectName(t.fx??0)}`))}_openSaveCopy(){const t=this._activeSeg();t&&(this._saveCopyName=`${this._effectName(t.fx??0)} copy`,this._saveCopyOpen=!0)}_confirmSaveCopy(){const t=this._activeSeg();t&&this.controllerId&&this._saveCopyName.trim()&&(!function(t,e){const i={...e,id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,savedAt:Date.now()},s=Rs(Bs),n=[i,...s[t]??[]];s[t]=n.slice(0,48),Ds(Bs,s)}(this.controllerId,{name:this._saveCopyName.trim(),effectId:t.fx??0,effectName:this._effectName(t.fx??0),pinned:!0,...this._sliderValuesFromSeg()}),this._library=Us(this.controllerId),this._saveCopyOpen=!1,ee(this,`Saved "${this._saveCopyName.trim()}" to library`))}_openSaveScene(){const t=this._activeSeg();t&&(this._saveSceneName=`${this._effectName(t.fx??0)} scene`,this._saveSceneOpen=!0)}async _confirmSaveScene(){if(this.connection&&this.controllerId&&this._saveSceneName.trim())try{await oe(this.connection,this.controllerId,this._saveSceneName.trim()),this._saveSceneOpen=!1,ee(this,`Scene "${this._saveSceneName.trim()}" saved`)}catch(t){ee(this,t instanceof Error?t.message:String(t))}}async _applyLibraryEntry(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i={fx:t.effectId,on:!0};for(const e of["sx","ix","c1","c2","c3","o1","o2","o3"]){const s=t[e];"number"==typeof s&&(i[e]=s)}const s=Nt(e,i,this._segments);await Ct(this.connection,this.controllerId,s),await this._load(),ee(this,`Applied ${t.name}`)}_isLoading(){return"Loading effects…"===this._status}_renderSkeleton(){return j`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading effects">
        <wled-skeleton height="2rem" width="min(100%, 360px)"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({length:6},()=>j`<wled-skeleton height="72px"></wled-skeleton>`)}
        </div>
      </div>
    `}render(){const t=this._snapshot,e=this._activeSeg(),i=e?.fx??0,s=this._meta,n=s?.sliders??{},o=this._targetIds().length,r=this.compact;return j`
      <div class="wrap ${r?"compact":""}">
        ${r?null:j`
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
                    @click=${()=>{ye(this.controllerId,!1),this._mergeActive=!1,this._needsMergeApply=!1,this._emitTargetsChanged()}}
                  >
                    Keep ${this._segments.length} segments
                  </button>
                </div>
              </div>
            `:null}

        ${this.connection&&this.controllerId&&t&&e?j`
              <wled-effect-merge-toggle
                ?compact=${r}
                class=${r?"compact-merge":""}
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
                hint=${r?"Tap segments to target effects":"Apply effects to highlighted segments"}
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `:null}

        ${t&&e?j`
              <div class="effects-workspace ${r?"compact":""}">
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
                    .tileGrid=${r}
                    .selectedPalette=${e.pal??0}
                    .paletteAware=${!1!==s?.palette_enabled}
                    @effect-select=${t=>this._onFx(t.detail.effectId,t.detail.toggledOff)}
                  ></wled-effect-chips>
                </div>

                <div class="effects-tuning">
                  ${!1!==s?.palette_enabled&&Object.keys(t.palettes_by_name??{}).length?j`
                        <wled-palette-chips
                          ?compact=${r}
                          ?collapsible=${r}
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
                    ?compact=${r}
                    @segment-patch=${t=>{this._segPatch(t.detail)}}
                  ></wled-segment-advanced>

                  <div class="sliders ${r?"compact":""}">
                    ${Object.entries(js).map(([t,i])=>{if(!n[t])return null;const s=e[t];return j`
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

                  ${Object.keys(n).length?j`
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
                            ${this._library.slice(0,r?6:12).map(t=>j`
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
                    ${o} segment${1===o?"":"s"} · effect
                    #${i}
                    ${!1!==s?.palette_enabled&&void 0!==e.pal?j` · palette #${e.pal}`:null}
                  </p>
                </div>
              </div>
            `:null}
      </div>
    `}async _onFx(t,e){if(!this.connection||!this._snapshot)return;const i=this._targetIds(),s=Nt(i,{fx:t,on:!0},this._segments);try{await Ct(this.connection,this.controllerId,s);for(const e of i){const i=this._segments.findIndex(t=>t.id===e);if(i>=0){const e=[...this._segments];e[i]={...e[i],fx:t,on:!0},this._segments=e}}this._focusSegId=i[0],await this._refreshMeta();const n=Object.entries(this._snapshot.effects_by_name).find(([,e])=>e===t)?.[0]??(e?"Solid":`#${t}`),o=Fs(this.controllerId,t);if(o&&Object.keys(o).length){const t=Nt(i,o,this._segments);await Ct(this.connection,this.controllerId,t)}ee(this,e?`Solid on ${i.length} segment(s)`:`Applied ${n}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){ee(this,`Apply failed: ${t.message||"error"}`)}}_slider(t,e){const i=Number(e.target.value);this._segPatch({[t]:i})}async _segPatch(t){if(!this.connection||!this._snapshot)return;const e=this._targetIds(),i=Nt(e,t,this._segments);try{await Ct(this.connection,this.controllerId,i)}catch(t){return void ee(this,`Apply failed: ${t.message||"error"}`)}const s=[...this._segments];for(const i of e){const e=s.findIndex(t=>t.id===i);e>=0&&(s[e]={...s[e],...t})}this._segments=s}static{this.styles=[...mt,r`
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
      .compact-merge {
        display: block;
      }
      :host(.compact-merge) .merge-row,
      .compact-merge .merge-row {
        padding: 8px 10px;
        margin-bottom: 8px;
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
    `]}};function qs(t,e){return Math.max(0,Math.min(255,Math.round(t*e)))}function Vs(t,e,i){return`rgb(${t}, ${e}, ${i})`}function Gs(t){return function(t){if(!t.length)return"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";if(1===t.length){const e=t[0];return`linear-gradient(135deg, ${e}, color-mix(in srgb, ${e} 55%, rgb(0 0 0)))`}const e=t.map((e,i)=>`${e} ${Math.round(i/(t.length-1)*100)}%`).join(", ");return`linear-gradient(135deg, ${e})`}(function(t){const e=t??{};if(!1===e.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const i="number"==typeof e.bri&&Number.isFinite(e.bri)?Math.max(0,Math.min(255,e.bri)):128,s=(Array.isArray(e.seg)?e.seg:[])[0]??{};if(!1===s.on)return["rgb(26, 26, 26)","rgb(13, 13, 13)"];const n=("number"==typeof s.bri&&Number.isFinite(s.bri)?Math.max(0,Math.min(255,s.bri)):i)/255,o=[];if(Array.isArray(s.col))for(const t of s.col.slice(0,3)){const[e,i,s]=At(t);o.push(Vs(qs(e,n),qs(i,n),qs(s,n)))}if(!o.length){const t=qs(255,n),e=qs(220,n);o.push(Vs(t,e,Math.min(255,e-20)))}return o}(t.wled_state))}function Xs(t){return Boolean(t.scene_thumb_url?.trim())}t([ht({attribute:!1})],Hs.prototype,"connection",void 0),t([ht()],Hs.prototype,"controllerId",void 0),t([ht({type:Boolean,reflect:!0})],Hs.prototype,"compact",void 0),t([dt()],Hs.prototype,"_snapshot",void 0),t([dt()],Hs.prototype,"_segments",void 0),t([dt()],Hs.prototype,"_editIds",void 0),t([dt()],Hs.prototype,"_focusSegId",void 0),t([dt()],Hs.prototype,"_filter",void 0),t([dt()],Hs.prototype,"_status",void 0),t([dt()],Hs.prototype,"_meta",void 0),t([dt()],Hs.prototype,"_mergeActive",void 0),t([dt()],Hs.prototype,"_library",void 0),t([dt()],Hs.prototype,"_saveCopyOpen",void 0),t([dt()],Hs.prototype,"_saveCopyName",void 0),t([dt()],Hs.prototype,"_saveSceneOpen",void 0),t([dt()],Hs.prototype,"_saveSceneName",void 0),t([dt()],Hs.prototype,"_needsMergeApply",void 0),Hs=t([Dt("wled-view-effects")],Hs);let Ys=class extends vt{constructor(){super(...arguments),this.controllerId="",this.scenes=[],this.disabled=!1,this._recents=[],this._visibleCount=6}onPoweredConnect(){this._reload(),this._ro=new ResizeObserver(()=>this._measure()),this.addUnsub(()=>this._ro?.disconnect())}updated(t){t.has("controllerId")&&this._reload();const e=this.renderRoot.querySelector(".recent-row");e&&e!==this._rowEl&&(this._rowEl=e,this._ro?.observe(e),this._measure())}reload(){this._reload()}_reload(){var t;this._recents=(t=this.controllerId)?fs(gs)[t]??[]:[]}_measure(){const t=this._rowEl;if(!t)return;const e=vs(t.clientWidth,104,8,8);e!==this._visibleCount&&(this._visibleCount=e)}_sceneFor(t){return this.scenes.find(e=>e.id===t)}render(){const t=this._recents.filter(t=>this.scenes.some(e=>e.id===t.id)).slice(0,this._visibleCount);return t.length?j`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${t.map(t=>{const e=this._sceneFor(t.id),i=e?.name??t.name,s=e?Gs(e):"linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))",n=e&&Xs(e)?e.scene_thumb_url.trim():"";return j`
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
                  ${n?j`<img
                        class="chip-thumb"
                        src=${n}
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
    `]}};t([ht()],Ys.prototype,"controllerId",void 0),t([ht({type:Array})],Ys.prototype,"scenes",void 0),t([ht({type:Boolean})],Ys.prototype,"disabled",void 0),t([dt()],Ys.prototype,"_recents",void 0),t([dt()],Ys.prototype,"_visibleCount",void 0),Ys=t([Dt("wled-recent-scenes-row")],Ys);let Js=class extends vt{constructor(){super(...arguments),this.controllerId="",this.compact=!1,this._scenes=[],this._status="Loading scenes…",this._busy=!1,this._captureName="",this._segments=[],this._applySegIds=[]}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load()}onPoweredDisconnect(){this._applyAbort?.abort(),this._applyAbort=void 0}async _load(){if(this.connection&&this.controllerId){this._status="Loading scenes…";try{const[t,e]=await Promise.all([ne(this.connection,this.controllerId),kt(this.connection,this.controllerId)]);if(this._scenes=t,this._snapshot=e,this._segments=[...e.segments??[]].sort((t,e)=>t.id-e.id),this._segments.length&&!this._applySegIds.length)this._applySegIds=this._segments.map(t=>t.id);else{const t=new Set(this._segments.map(t=>t.id));this._applySegIds=this._applySegIds.filter(e=>t.has(e)),!this._applySegIds.length&&this._segments.length&&(this._applySegIds=this._segments.map(t=>t.id))}this._status=0===this._scenes.length?"No scenes yet — capture the current look or use starter scenes after reload.":""}catch{this._status="Could not load scenes."}}}selectSegmentFromPreview(t){this._toggleApplySeg(t)}_toggleApplySeg(t){let e=re(this._applySegIds,t);e.length||(e=[t]),this._applySegIds=e}_isLoading(){return"Loading scenes…"===this._status}_renderSkeleton(){return j`
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
    `}_sceneTile(t){const e=t.transition_ms??2500,i=Gs(t),s=Xs(t)?t.scene_thumb_url.trim():"";return j`
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
    `}_recentScenesRow(){return this.renderRoot.querySelector("wled-recent-scenes-row")??null}async _apply(t){if(this.connection){this._busy=!0,this._applyAbort?.abort(),this._applyAbort=new AbortController;try{const e=this._segments.length>0&&this._applySegIds.length===this._segments.length;await async function(t,e,i,s){await $t(t);const n={type:"wled_studio/scene_apply",schema_version:1,controller_id:e,scene_id:i,transition_ms:s?.transitionMs,segment_ids:s?.segmentIds?.length?s.segmentIds:void 0};return s?.signal?new Promise((e,i)=>{const o=()=>i(new DOMException("Aborted","AbortError"));s.signal?.aborted?o():(s.signal?.addEventListener("abort",o,{once:!0}),t.sendMessagePromise(n).then(t=>{s.signal?.removeEventListener("abort",o),e(t.state??{})}).catch(t=>{s.signal?.removeEventListener("abort",o),i(t)}))}):(await t.sendMessagePromise(n)).state??{}}(this.connection,this.controllerId,t.id,{signal:this._applyAbort.signal,segmentIds:e?void 0:[...this._applySegIds]}),function(t,e,i){if(!t)return[];const s=fs(gs),n=(s[t]??[]).filter(t=>t.id!==e);n.unshift({id:e,name:i}),s[t]=n.slice(0,10),_s(gs,s),s[t]}(this.controllerId,t.id,t.name),this._recentScenesRow()?.reload(),await this._load(),ee(this,`Applied ${t.name}`),this.dispatchEvent(new CustomEvent("wled-preview-refresh",{bubbles:!0,composed:!0}))}catch(t){if("AbortError"!==t.name){ee(this,`Apply failed: ${t.message||t.message||"error"}`)}}finally{this._busy=!1}}}async _capture(){if(!this.connection)return;const t=this._captureName.trim();if(t){this._busy=!0;try{const e=await oe(this.connection,this.controllerId,t);this._captureName="",ee(this,`Saved ${e.name}`),await this._load()}catch(t){ee(this,`Save failed: ${t.message||"error"}`)}finally{this._busy=!1}}}async _delete(t){if(this.connection&&confirm(`Delete scene "${t.name}"?`)){this._busy=!0;try{await async function(t,e,i){await se(t,{type:"wled_studio/scene_delete",controller_id:e,scene_id:i})}(this.connection,this.controllerId,t.id),ee(this,`Deleted ${t.name}`),await this._load()}catch{ee(this,"Delete failed")}finally{this._busy=!1}}}_dismissConflict(){this._conflict=void 0,this._load()}async _overwriteConflict(){if(!this.connection||!this._conflict)return;const t=this._scenes.find(t=>t.id===this._conflict?.id);if(t){this._busy=!0;try{await async function(t,e,i,s){try{return(await se(t,{type:"wled_studio/scene_save",controller_id:e,scene:i,if_match_etag:s?.ifMatchEtag})).scene??i}catch(t){const e=t;if("conflict"===e?.code&&e.data?.scene)throw new ie(e.data.scene,String(e.data.etag??e.message??""));throw t}}(this.connection,this.controllerId,t),this._conflict=void 0,ee(this,"Scene overwritten"),await this._load()}catch(t){t instanceof ie&&(this._conflict=t.remote)}finally{this._busy=!1}}}static{this.styles=[...mt,r`
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
    `]}};function Ks(t=0,e=[255,51,102,0]){return{on:!0,bri:255,fx:t,pal:0,col:e,sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Zs(t="off"){return{mode:t,on:"off"!==t,bri:"off"===t?0:128,fx:0,pal:0,col:"custom"===t?[72,72,72,0]:[0,0,0,0],sx:128,ix:128,c1:128,c2:128,c3:128,o1:!1,o2:!1,o3:!1}}function Qs(t,e){const i=e.Solid??0;return t.fx===i?"color":"effect"}async function tn(t,e){await $t(t);try{return await t.sendMessagePromise({...e,schema_version:1})}catch(t){throw new Error(le(t))}}async function en(t,e,i,s){const n=function(t){let e="";for(let i=0;i<t.length;i+=32768){const s=t.subarray(i,i+32768);e+=String.fromCharCode(...s)}return btoa(e)}(i),o=s?.brush,r=s?.fill,a=o?Qs(o,s?.effectsByName??{}):"color";await tn(t,{type:"wled_studio/paint_frame",controller_id:e,data:n,rgbw:s?.rgbw??!0,paint_mode:a,...s?.touched?.length?{touched:s.touched}:{},...o?{brush:o}:{},...r?{fill:r}:{},..."effect"===a&&o?{effect_id:o.fx}:{}})}async function sn(t,e,i=!0){await tn(t,{type:"wled_studio/paint_stop",controller_id:e,commit:i})}function nn(t,e,i){const s=i?4:3,n=new Uint8ClampedArray(4*e);for(let o=0;o<e;o++){const e=o*s,r=4*o;n[r]=t[e]??0,n[r+1]=t[e+1]??0,n[r+2]=t[e+2]??0,n[r+3]=i?t[e+3]??0:255}return n}t([ht({attribute:!1})],Js.prototype,"connection",void 0),t([ht()],Js.prototype,"controllerId",void 0),t([ht({type:Boolean})],Js.prototype,"compact",void 0),t([dt()],Js.prototype,"_scenes",void 0),t([dt()],Js.prototype,"_status",void 0),t([dt()],Js.prototype,"_busy",void 0),t([dt()],Js.prototype,"_conflict",void 0),t([dt()],Js.prototype,"_captureName",void 0),t([dt()],Js.prototype,"_segments",void 0),t([dt()],Js.prototype,"_applySegIds",void 0),t([dt()],Js.prototype,"_snapshot",void 0),Js=t([Dt("wled-view-scenes")],Js);const on={sx:"Speed",ix:"Intensity",c1:"Custom 1",c2:"Custom 2",c3:"Custom 3",o1:"Option 1",o2:"Option 2",o3:"Option 3"};let rn=class extends vt{constructor(){super(...arguments),this.controllerId="",this.heading="Brush",this.showOnToggle=!1,this._loadingEffects=!0,this._error="",this._effectFilter=""}onPoweredConnect(){this._load()}willUpdate(t){(t.has("connection")||t.has("controllerId"))&&this.connection&&this.controllerId&&this._load(),t.has("settings")&&void 0!==this.settings?.fx&&this._refreshMeta()}async _load(){if(this.connection&&this.controllerId){this._loadingEffects=!0,this._error="";try{this._snapshot=await kt(this.connection,this.controllerId),await this._refreshMeta()}catch(t){this._error=le(t)}finally{this._loadingEffects=!1}}}async _refreshMeta(){this.connection&&this.controllerId&&this.settings&&(this._meta=await Et(this.connection,this.controllerId,this.settings.fx))}_emit(t){const e={...this.settings,...t};this.dispatchEvent(new CustomEvent("settings-change",{detail:e,bubbles:!0,composed:!0}))}_onColor(t){const{rgb:e,white:i}=t.detail,s={col:[e[0],e[1],e[2],i]};"Fill look"!==this.heading&&(s.fx=he(this._snapshot?.effects_by_name??{})),this._emit(s)}async _onEffectSelect(t){this._emit({fx:t.detail.effectId}),await this._refreshMeta()}_slider(t,e){const i=e.target.value,s=t.startsWith("o")?Number(i)>0:Number(i);this._emit({[t]:s})}render(){if(!this.settings)return null;const t=At(this.settings.col),e=this._meta,i=e?.sliders??{},s=this._snapshot?.rgbwm??0;return j`
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
                ${Object.entries(on).map(([t,e])=>{if(!i[t])return null;const s=this.settings[t];return"boolean"==typeof s?j`
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
    `]}};t([ht({attribute:!1})],rn.prototype,"connection",void 0),t([ht({attribute:!1})],rn.prototype,"hass",void 0),t([ht()],rn.prototype,"controllerId",void 0),t([ht()],rn.prototype,"heading",void 0),t([ht({attribute:!1})],rn.prototype,"settings",void 0),t([ht({type:Boolean})],rn.prototype,"showOnToggle",void 0),t([dt()],rn.prototype,"_loadingEffects",void 0),t([dt()],rn.prototype,"_error",void 0),t([dt()],rn.prototype,"_snapshot",void 0),t([dt()],rn.prototype,"_meta",void 0),t([dt()],rn.prototype,"_effectFilter",void 0),rn=t([Dt("wled-paint-settings")],rn);let an=class extends vt{constructor(){super(...arguments),this.controllerId="",this.embedMode=!1,this.embedLayoutId="",this.embedFixtureId="",this.embedPixelCount=0,this._pixelCount=210,this._rgbw=!0,this._active=!1,this._brush=Ks(),this._fill=Zs("off"),this._brushSize=6,this._status="",this._warn="",this._effectsByName={},this._layouts=[],this._layoutId="",this._fixtureId="",this._buffer=null,this._previewPixels=null,this._touched=new Set,this._flushInFlight=!1,this._flushQueued=!1,this._flushColor=function(t,e){let i,s,n=0;const o=(...o)=>{s=o;const r=Date.now(),a=r-n;if(a>=e)return n=r,i&&(clearTimeout(i),i=void 0),void t(...o);i||(i=setTimeout(()=>{i=void 0,n=Date.now(),s&&t(...s)},e-a))};return o.cancel=()=>{i&&clearTimeout(i),i=void 0,s=void 0},o}(()=>{this._flushNow()},20),this._flushEffect=It(()=>{this._flushNow()},60,180)}_previewEl(){return this.embedMode?this._externalPreview:this._internalPreview}get brushSize(){return this._brushSize}get paintLivePreview(){return this._brushIsEffect()}get paintExternalLive(){return!this._brushIsEffect()}bindExternalPreview(t){this._externalPreview=t,t&&this._active&&t.setStatus("live paint"),t&&this._previewPixels?this._syncPreviewPixels():t&&t.refresh()}handleExternalPaintStroke(t){this._onPaintStroke(t)}_emitPaintConfig(){this.dispatchEvent(new CustomEvent("paint-config-change",{bubbles:!0,composed:!0}))}_brushIsEffect(){return"effect"===Qs(this._brush,this._effectsByName)}updated(t){(t.has("_fill")||t.has("_brush")||t.has("_buffer")||t.has("_layoutId"))&&(this._applyFillToBuffer(),this._brushIsEffect()?this._previewEl()?.setPaintPixels(null):this._syncPreviewPixels()),(t.has("_brush")||t.has("_brushSize"))&&(this.requestUpdate(),this._emitPaintConfig()),this.embedMode&&(t.has("embedLayoutId")||t.has("embedFixtureId")||t.has("embedPixelCount"))&&(this.embedLayoutId&&(this._layoutId=this.embedLayoutId),this.embedFixtureId&&(this._fixtureId=this.embedFixtureId),this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount),this._previewEl()?.refresh())}async onPoweredConnect(){if(this.connection&&this.controllerId)try{const[t,e]=await Promise.all([kt(this.connection,this.controllerId),zt(this.connection,this.controllerId)]),i=t.info?.leds;i?.count&&(this._pixelCount=i.count),"boolean"==typeof i?.rgbw&&(this._rgbw=i.rgbw),this._effectsByName=t.effects_by_name??{};const s=t.segments?.[0];if(s){const t=s.col?.[0],e=Array.isArray(t)&&t.length>=3?[t[0],t[1],t[2],t[3]??0]:void 0;this._brush=Ks(s.fx??0,e)}this._layouts=e,this.embedMode&&this.embedLayoutId?(this._layoutId=this.embedLayoutId,this._fixtureId=this.embedFixtureId||"fixture-0",this.embedPixelCount>0&&(this._pixelCount=this.embedPixelCount)):this._applyLayout(e[0]),this._allocBuffer(),this._status=this.embedMode?this._layoutId?"Drag on the strip preview to paint":"Create a layout in Studio → Layout first":e.length?"Drag on the layout to paint":"Create a layout in the Layout tab first"}catch(t){this._status=le(t)}}_applyLayout(t){if(!t)return this._layoutId="",void(this._fixtureId="");this._layoutId=t.id;const e=t.fixtures[0];this._fixtureId=e?String(e.id??"fixture-0"):"fixture-0",t.pixel_count&&(this._pixelCount=t.pixel_count),this._previewEl()?.refresh()}_onLayoutPick(t){const e=t.target.value,i=this._layouts.find(t=>t.id===e);this._applyLayout(i),this._allocBuffer()}async onPoweredDisconnect(){if(this._flushColor.cancel(),this._flushEffect.cancel(),this._active&&this.connection&&this.controllerId)try{await sn(this.connection,this.controllerId,!1)}catch{}this._active=!1,this._touched.clear()}async _ensureSession(){if(this._active||!this.connection||!this.controllerId)return this._active;try{const t=await async function(t,e){return tn(t,{type:"wled_studio/paint_start",controller_id:e})}(this.connection,this.controllerId);return this._active=!0,this._touched.clear(),this._warn=t.wifi_sleep_warning??"",t.pixel_count&&(this._pixelCount=t.pixel_count),"boolean"==typeof t.rgbw&&(this._rgbw=t.rgbw),this._allocBuffer(),this._previewEl()?.setStatus("live paint"),this._status="Live paint",!0}catch(t){return this._status=le(t),!1}}_allocBuffer(){const t=this._rgbw?4:3;this._buffer=new Uint8Array(this._pixelCount*t),this._previewPixels=null,this._applyFillToBuffer(),this._syncPreviewPixels()}_syncPreviewPixels(t){const e=this._previewEl();if(!this._buffer||!e)return;if(!this._previewPixels||this._previewPixels.length!==4*this._pixelCount)this._previewPixels=nn(this._buffer,this._pixelCount,this._rgbw);else if(t?.length){const e=this._rgbw?4:3,i=this._previewPixels;for(const s of t){const t=s*e,n=4*s;i[n]=this._buffer[t]??0,i[n+1]=this._buffer[t+1]??0,i[n+2]=this._buffer[t+2]??0,i[n+3]=this._rgbw?this._buffer[t+3]??0:255}}else this._previewPixels=nn(this._buffer,this._pixelCount,this._rgbw);e.setPaintPixels(this._previewPixels)}_brushRgb(){const t=Math.max(0,Math.min(255,this._brush.bri))/255;return[Math.round(this._brush.col[0]*t),Math.round(this._brush.col[1]*t),Math.round(this._brush.col[2]*t)]}async cancelLiveIfActive(){if(!this._active||!this.connection||!this.controllerId)return!1;this._flushColor.cancel(),this._flushEffect.cancel();try{await sn(this.connection,this.controllerId,!1),this._status="Live paint ended — layout segments restored",this._previewEl()?.setStatus("ready")}catch(t){return this._status=le(t),!1}return this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels(),this.dispatchEvent(new CustomEvent("wled-paint-ended",{bubbles:!0,composed:!0})),this._emitPaintConfig(),!0}_writeLed(t,e){if(!this._buffer)return;const i=t*(this._rgbw?4:3);this._buffer[i]=e[0],this._buffer[i+1]=e[1],this._buffer[i+2]=e[2],this._rgbw&&(this._buffer[i+3]=0)}_applyFillToBuffer(){if(!this._buffer)return;const t="off"===this._fill.mode?[0,0,0]:"custom"===this._fill.mode?[this._fill.col[0],this._fill.col[1],this._fill.col[2]]:[40,40,40];for(let e=0;e<this._pixelCount;e++)this._touched.has(e)||this._writeLed(e,t)}_scheduleFlush(){this._brushIsEffect()?this._flushEffect():this._flushColor()}_strokeLeds(t){if(!this._buffer||!t.length)return;if(this._brushIsEffect()){for(const e of t)this._touched.add(e);this._previewEl()?.setPaintPixels(null)}else{const e=this._brushRgb();for(const i of t)this._writeLed(i,e),this._touched.add(i);this._syncPreviewPixels(t)}this._scheduleFlush()}async _onPaintStroke(t){await this._ensureSession()&&this._strokeLeds(t.detail.leds)}async _flushNow(){if(this._active&&this.connection&&this._buffer)if(this._flushInFlight)this._flushQueued=!0;else{this._flushInFlight=!0;try{await en(this.connection,this.controllerId,this._buffer,{rgbw:this._rgbw,touched:[...this._touched],brush:this._brush,fill:this._fill,effectsByName:this._effectsByName});const t=this._brushIsEffect()?"effect (device preview)":"color";this._status=`Live paint · ${this._touched.size} LEDs · ${t} · fill: ${this._fill.mode}`}catch(t){this._status=le(t)}finally{this._flushInFlight=!1,this._flushQueued&&(this._flushQueued=!1,this._flushNow())}}}_onBrushChange(t){this._brush=t.detail,this._emitPaintConfig(),this._active&&this._scheduleFlush()}_onFillChange(t){this._fill={...t.detail,mode:this._fill.mode},this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._scheduleFlush()}_onFillModeChange(t){this._fill=Zs(t),this._applyFillToBuffer(),this._syncPreviewPixels(),this._active&&this._flushNow()}async _commit(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel(),await this._flushNow();try{await sn(this.connection,this.controllerId,!0),this._status="Committed to WLED",this._previewEl()?.setStatus("committed")}catch(t){this._status=le(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}async _cancel(){if(this.connection&&this._active){this._flushColor.cancel(),this._flushEffect.cancel();try{await sn(this.connection,this.controllerId,!1),this._status="Live mode released",this._previewEl()?.setStatus("ready")}catch(t){this._status=le(t)}this._active=!1,this._touched.clear(),this._applyFillToBuffer(),this._syncPreviewPixels()}}render(){const t=Boolean(this._layoutId),e=this.embedMode;return j`
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
    `]}};t([ht({attribute:!1})],an.prototype,"connection",void 0),t([ht({attribute:!1})],an.prototype,"hass",void 0),t([ht()],an.prototype,"controllerId",void 0),t([ht({type:Boolean,attribute:"embed-mode"})],an.prototype,"embedMode",void 0),t([ht()],an.prototype,"embedLayoutId",void 0),t([ht()],an.prototype,"embedFixtureId",void 0),t([ht({type:Number})],an.prototype,"embedPixelCount",void 0),t([dt()],an.prototype,"_pixelCount",void 0),t([dt()],an.prototype,"_rgbw",void 0),t([dt()],an.prototype,"_active",void 0),t([dt()],an.prototype,"_brush",void 0),t([dt()],an.prototype,"_fill",void 0),t([dt()],an.prototype,"_brushSize",void 0),t([dt()],an.prototype,"_status",void 0),t([dt()],an.prototype,"_warn",void 0),t([dt()],an.prototype,"_effectsByName",void 0),t([dt()],an.prototype,"_layouts",void 0),t([dt()],an.prototype,"_layoutId",void 0),t([dt()],an.prototype,"_fixtureId",void 0),t([pt("wled-geometry-preview")],an.prototype,"_internalPreview",void 0),an=t([Dt("wled-view-paint")],an);let ln=class extends vt{constructor(){super(...arguments),this._toasts=[],this._nextId=0,this._timers=new Map,this._onToast=t=>{const e=t.detail;if(!e?.message)return;const i=++this._nextId;this._toasts=[...this._toasts,{id:i,message:e.message}];const s=this._toastDurationMs(),n=window.setTimeout(()=>this._dismiss(i),s);this._timers.set(i,n)}}onPoweredConnect(){this.getRootNode().addEventListener(te,this._onToast,{signal:this.abort.signal})}onPoweredDisconnect(){for(const t of this._timers.values())window.clearTimeout(t);this._timers.clear()}_toastDurationMs(){const t=getComputedStyle(this).getPropertyValue("--m-toast").trim(),e=Number.parseInt(t,10);return Number.isFinite(e)&&e>0?e:4e3}_dismiss(t){const e=this._timers.get(t);void 0!==e&&(window.clearTimeout(e),this._timers.delete(t)),this._toasts=this._toasts.filter(e=>e.id!==t)}render(){return this._toasts.length?j`
      <div class="stack" aria-live="polite">
        ${this._toasts.map(t=>j`
            <p class="toast" role="status">${t.message}</p>
          `)}
      </div>
    `:null}static{this.styles=[...mt,r`
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
    `]}};t([dt()],ln.prototype,"_toasts",void 0),ln=t([Dt("wled-toast-host")],ln);const cn="wled-studio-card",hn=[{id:"color",label:"Color",icon:"mdi:palette"},{id:"effects",label:"Effects",icon:"mdi:animation-play"},{id:"scenes",label:"Scenes",icon:"mdi:palette-swatch"},{id:"segments",label:"Segments",icon:"mdi:vector-line"},{id:"paint",label:"Paint",icon:"mdi:brush"}];class dn extends vt{constructor(){super(...arguments),this._controllerId="",this._masterEntity="",this._pixelCount=210,this._previewStatus="connecting",this._hint="",this._layoutId="",this._fixtureId="",this._cardTab="color",this._selectedSegId=-1,this._highlightSegIds=[],this._globalBriPct=null,this._lastNonZeroBri=100,this._segments=[],this._bootstrapGen=0,this._bootstrapControllerKey="",this._tabTouchStartX=0,this._tabTouchStartY=0,this._tabSwiping=!1}setConfig(t){if(!t.type?.startsWith("custom:"))throw new Error("Invalid card type");this.config=t}getCardSize(){return 8}static getConfigElement(){const t=document.createElement("wled-studio-card-editor");return t.setConfig(dn.getStubConfig()),t}static getStubConfig(){return{type:`custom:${cn}`,controller:"Cloud",height:200,show_segments:!1}}_visibleModeTabs(){return hn.filter(t=>("scenes"!==t.id||!1!==this.config?.show_scenes)&&(("paint"!==t.id||!1!==this.config?.show_paint)&&(("segments"!==t.id||!0===this.config?.show_segments)&&("effects"!==t.id||!1!==this.config?.show_effects))))}_tabId(t){return`wled-card-tab-${t}`}_panelId(t){return`wled-card-panel-${t}`}updated(t){super.updated(t);const e=this._visibleModeTabs().map(t=>t.id);if(e.includes(this._cardTab)||(this._cardTab=e[0]??"color"),this._syncSegmentsFromControls(),t.has("hass")&&null!==this._globalBriPct){const t=this._readGlobalBrightnessPct();(0===t||Math.abs(t-this._globalBriPct)<=1)&&(this._globalBriPct=null)}if((t.has("hass")||t.has("_globalBriPct"))&&this._syncGlobalBriToSegmentControls(),t.has("_cardTab")&&this._onCardTabChanged(t.get("_cardTab")),(t.has("_cardTab")||t.has("_paintPanel"))&&this._syncPaintPreview(),!t.has("_cardTab")||"color"!==this._cardTab&&"segments"!==this._cardTab||this.scheduleRaf(()=>this._syncGlobalBriToSegmentControls()),t.has("config"))return this._bindConnectionReady(),void this._bootstrap(!0);t.has("hass")&&this.hass&&!this._controllerId&&(this._bindConnectionReady(),this._bootstrap())}async _onCardTabChanged(t){"paint"===t&&"paint"!==this._cardTab&&await(this._paintPanel?.cancelLiveIfActive()),this._syncPaintPreview()}_syncPaintPreview(){const t="paint"===this._cardTab;this._preview&&(this._preview.paintMode=t,t&&this._paintPanel&&(this._preview.paintBrushSize=this._paintPanel.brushSize,this._preview.externalLive=this._paintPanel.paintExternalLive,this._preview.paintLivePreview=this._paintPanel.paintLivePreview,this._paintPanel.bindExternalPreview(this._preview)))}_onPaintStroke(t){this._paintPanel?.handleExternalPaintStroke(t)}_onPaintConfigChange(){this._syncPaintPreview()}_selectCardTab(t){t!==this._cardTab&&(this._cardTab=t)}_swipeTab(t){const e=this._visibleModeTabs(),i=e.findIndex(t=>t.id===this._cardTab);i<0||(t<0&&i<e.length-1?this._selectCardTab(e[i+1].id):t>0&&i>0&&this._selectCardTab(e[i-1].id))}_onTabPanelTouchStart(t){1===t.touches.length&&(this._tabTouchStartX=t.touches[0].clientX,this._tabTouchStartY=t.touches[0].clientY,this._tabSwiping=!1)}_onTabPanelTouchMove(t){if(1!==t.touches.length)return;const e=t.touches[0].clientX-this._tabTouchStartX,i=t.touches[0].clientY-this._tabTouchStartY;Math.abs(e)>Math.abs(i)&&Math.abs(e)>10&&(this._tabSwiping=!0)}_onTabPanelTouchEnd(t){if(!this._tabSwiping||1!==t.changedTouches.length)return void(this._tabSwiping=!1);const e=t.changedTouches[0].clientX-this._tabTouchStartX;Math.abs(e)>=50&&this._swipeTab(e),this._tabSwiping=!1}_focusModeTab(t){const e=this.renderRoot.querySelector(`#${this._tabId(t)}`);e?.focus()}_onModeTabsKeydown(t){const e=this._visibleModeTabs(),i=e.findIndex(t=>t.id===this._cardTab);if(i<0)return;let s=i;switch(t.key){case"ArrowRight":case"ArrowDown":s=(i+1)%e.length;break;case"ArrowLeft":case"ArrowUp":s=(i-1+e.length)%e.length;break;case"Home":s=0;break;case"End":s=e.length-1;break;default:return}t.preventDefault();const n=e[s].id;this._selectCardTab(n),this.scheduleRaf(()=>this._focusModeTab(n))}onPoweredConnect(){this._bindConnectionReady(),this._bootstrap()}onPoweredDisconnect(){this._bootstrapGen+=1,this._offConnReady?.(),this._offConnReady=void 0,this._unsubLive?.(),this._unsubLive=void 0,this._paintPanel?.cancelLiveIfActive()}_bindConnectionReady(){this.hass?.connection&&!this._offConnReady&&(this._offConnReady=yt(this.hass.connection,()=>{this._bootstrap()}),this.addUnsub(()=>this._offConnReady?.()))}_pickController(t){const e=(this.config?.controller??"").trim();if(!e)return t[0];const i=e.toLowerCase();return t.find(t=>{const s=String(t.title??"");return String(t.entry_id??"")===e||s===e||s.toLowerCase().includes(i)||s.toLowerCase().endsWith(`— ${i}`)||s.toLowerCase().endsWith(`- ${i}`)})??t[0]}_pickLayout(t){const e=(this.config?.layout_id??"").trim();return e?t.find(t=>t.id===e||t.name===e):t[0]}async _bootstrap(t=!1){if(!this.hass?.connection)return;const e=(this.config?.controller??"").trim();if(!t&&this._controllerId&&this._unsubLive&&this._bootstrapControllerKey===e)return;const i=++this._bootstrapGen;this._controllerId||(this._hint="Connecting to WLED Studio…",this.requestUpdate());const s=[0,400,1200,2500];for(const t of s){if(i!==this._bootstrapGen||!this.isConnected)return;t>0&&await new Promise(e=>setTimeout(e,t));try{const t=await St(this.hass.connection),s=this._pickController(t);if(!s?.entry_id){i===this._bootstrapGen&&(this._hint=0===t.length?"No WLED Studio controllers found. Add the integration under Settings → Devices & services.":"Controller not found in list.",this.requestUpdate());continue}if(i!==this._bootstrapGen)return;return this._controllerId=String(s.entry_id),this._masterEntity=String(s.master_entity_id??""),this._pixelCount=Number(s.pixel_count)||210,this._bootstrapControllerKey=e,this._hint="",await this._loadLayout(),this._startLive(),this._loadSegments(),void this.requestUpdate()}catch(t){const e=t instanceof Error?t.message:String(t??"unknown");i===this._bootstrapGen&&(this._hint=`Connecting… (${e})`,this.requestUpdate())}}i===this._bootstrapGen&&(this._previewStatus="offline",this._preview?.setStatus(this._previewStatus),this._hint="WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).",this.requestUpdate())}async _loadLayout(){if(this.hass?.connection&&this._controllerId)try{const t=await zt(this.hass.connection,this._controllerId),e=this._pickLayout(t);if(!e)return this._layoutId="",void(this._fixtureId="");this._layoutId=e.id;const i=e.fixtures[0];this._fixtureId=i?String(i.id??"fixture-0"):"fixture-0",e.pixel_count&&(this._pixelCount=e.pixel_count),await(this._preview?.refresh())}catch{this._layoutId="",this._fixtureId=""}}_startLive(){if(!this.hass?.connection||!this._controllerId)return;const t="live"===this._previewStatus;this._unsubLive?.(),t||(this._previewStatus="connecting",this._preview?.setStatus(this._previewStatus)),this._unsubLive=xt(this.hass.connection,this._controllerId,t=>{this._previewStatus="live",this._preview?.setFrame(t)},{remote:this.remote.state.isRemote}),this.addUnsub(()=>this._unsubLive?.())}_onStripSegmentSelect(t){"paint"!==this._cardTab&&(this._selectedSegId=t.detail.segmentId,"color"===this._cardTab?this._segmentControls?.selectSegment(t.detail.segmentId):"effects"===this._cardTab?this._effectsView?.selectSegmentFromPreview(t.detail.segmentId):"segments"===this._cardTab&&this._segmentControls?.selectSegment(t.detail.segmentId))}_onSegmentTargetsChanged(t){this._selectedSegId=t.detail.segmentId,t.detail.highlightIds?.length?this._highlightSegIds=t.detail.highlightIds:t.detail.editIds?.length?this._highlightSegIds=t.detail.editIds:this._highlightSegIds=[t.detail.segmentId],this.requestUpdate()}_onSegmentChange(t){this._selectedSegId=t.detail.segmentId,t.detail.editIds?.length&&(this._highlightSegIds=t.detail.editIds),this.requestUpdate()}async _loadSegments(){if(this.hass?.connection&&this._controllerId)try{const t=await kt(this.hass.connection,this._controllerId);this._segments=t.segments??[],this._segments.length&&this._selectedSegId<0&&(this._selectedSegId=this._segments[0].id),this.requestUpdate()}catch{}}_syncSegmentsFromControls(){const t=this._segmentControls?.segments;t?.length&&(this._segments=t)}_readGlobalBrightnessPct(){return this.hass&&this._masterEntity?Bt(this.hass.states[this._masterEntity]):0}_syncGlobalBriToSegmentControls(){const t=Rt(this._globalBrightnessPct());for(const e of this.renderRoot.querySelectorAll("wled-segment-controls"))e.applyGlobalBrightness(t)}_globalBrightnessPct(){return null!==this._globalBriPct?this._globalBriPct:this._readGlobalBrightnessPct()}_onGlobalBriInput(t){const e=t.target;let i=Number(e.value);0===(this._globalBriPct??this._readGlobalBrightnessPct())&&i>0&&this._lastNonZeroBri>0&&(i=this._lastNonZeroBri,e.value=String(i)),i>0&&(this._lastNonZeroBri=i),this._globalBriPct=i,this._syncGlobalBriToSegmentControls()}_setGlobalBrightness(t){if(!this.hass||!this._masterEntity)return;const e=Number(t.target.value);if(0===e){const t=this._globalBriPct??this._readGlobalBrightnessPct();t>0&&(this._lastNonZeroBri=t)}else this._lastNonZeroBri=e;this._globalBriPct=e;const i=Rt(e);this._syncGlobalBriToSegmentControls(),0===e?this.hass.callService("light","turn_off",{entity_id:this._masterEntity}):this.hass.callService("light","turn_on",{entity_id:this._masterEntity,brightness_pct:e}),this.hass.connection&&this._controllerId&&Ct(this.hass.connection,this._controllerId,{bri:i,on:e>0})}_togglePower(){this.hass&&this._masterEntity&&this.hass.callService("light","toggle",{entity_id:this._masterEntity})}_renderModeTabs(){const t=this._visibleModeTabs();return j`
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
        `;default:return null}}render(){const t=this.config?.height??200,e=this.remote.state,i=`--wled-preview-height: ${t}px`,s="paint"===this._cardTab,n=this._paintPanel?.brushSize??6,o=!s||(this._paintPanel?.paintExternalLive??!0),r=s&&(this._paintPanel?.paintLivePreview??!1);return j`
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
          .paintBrushSize=${n}
          .paintLivePreview=${r}
          .externalLive=${o}
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
    `}_openStudio(){history.pushState(null,"","/wled-studio"),window.dispatchEvent(new CustomEvent("location-changed"))}static{this.styles=[...mt,r`
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
    `]}}function pn(){return{type:`custom:${cn}`,controller:"",height:200,show_segments:!1}}t([ht({attribute:!1})],dn.prototype,"config",void 0),t([dt()],dn.prototype,"_controllerId",void 0),t([dt()],dn.prototype,"_masterEntity",void 0),t([dt()],dn.prototype,"_pixelCount",void 0),t([dt()],dn.prototype,"_previewStatus",void 0),t([dt()],dn.prototype,"_hint",void 0),t([dt()],dn.prototype,"_layoutId",void 0),t([dt()],dn.prototype,"_fixtureId",void 0),t([dt()],dn.prototype,"_cardTab",void 0),t([pt("wled-geometry-preview")],dn.prototype,"_preview",void 0),t([pt("wled-segment-controls")],dn.prototype,"_segmentControls",void 0),t([pt("wled-view-effects")],dn.prototype,"_effectsView",void 0),t([pt("wled-view-paint")],dn.prototype,"_paintPanel",void 0),t([dt()],dn.prototype,"_selectedSegId",void 0),t([dt()],dn.prototype,"_highlightSegIds",void 0),t([dt()],dn.prototype,"_globalBriPct",void 0),t([dt()],dn.prototype,"_lastNonZeroBri",void 0),t([dt()],dn.prototype,"_segments",void 0);const un=[{key:"show_effects",label:"Show Effects tab"},{key:"show_scenes",label:"Show Scenes tab"},{key:"show_segments",label:"Show Segments tab (legacy)"},{key:"show_paint",label:"Show Paint tab"}];let gn=class extends rt{constructor(){super(...arguments),this._config=pn()}setConfig(t){this._config={...pn(),...t,type:t.type??`custom:${cn}`}}render(){const t=this._config;return j`
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
          ${un.map(({key:e,label:i})=>j`
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
    `}_onController(t){this._fire({...this._config,controller:t.detail.value})}_onHeight(t){const e=Number(t.detail.value);this._fire({...this._config,height:Number.isFinite(e)?e:200})}_onLayoutId(t){const e=t.detail.value.trim(),i={...this._config};e?i.layout_id=e:delete i.layout_id,this._fire(i)}_onTabToggle(t,e){const i=e.target.checked;this._fire({...this._config,[t]:i})}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static{this.styles=r`
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
  `}};t([ht({attribute:!1})],gn.prototype,"hass",void 0),t([dt()],gn.prototype,"_config",void 0),gn=t([Dt("wled-studio-card-editor")],gn),function(){const t=window.__WLED_STUDIO_BUILD__;t&&t!==bt&&(window.__WLED_STUDIO_STALE__=!0),window.__WLED_STUDIO_BUILD__=bt}(),function(t,e){const i=customElements.get(t);i||customElements.define(t,e)}(cn,dn),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===cn)||window.customCards.push({type:cn,name:"WLED Studio",description:"Live LED strip preview and controls",preview:!0}),console.info("[wled-studio] lovelace bundle loaded",{card:cn});export{cn as CARD_TAG,dn as WledStudioCard,pn as getStubConfig};
//# sourceMappingURL=wled-studio-card.js.map
