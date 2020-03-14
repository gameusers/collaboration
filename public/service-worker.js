// --------------------------------------------------
//   Push Event
// --------------------------------------------------

self.addEventListener('push', function(eventObj) {
  
  
  // --------------------------------------------------
  //   Payload
  // --------------------------------------------------
  console.log('eventObj', eventObj);
  
  // alert(eventObj);
  
  if (eventObj.data) {
    
    
    // --------------------------------------------------
    //   Payload Object
    // --------------------------------------------------
    
    let payloadObj = {};
    
    try {
      
      payloadObj = eventObj.data.json();
      
    } catch (errorObj) {
      
      payloadObj = {
        body: eventObj.data.text()
      };
      
    }
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = payloadObj.title || 'Game Users';
    
    
    // --------------------------------------------------
    //   Options
    // --------------------------------------------------
    
    const optionsObj = {
      
      body: payloadObj.body,
      icon: payloadObj.icon,
      tag: payloadObj.tag,
      
    };
    
    console.log('title', title);
    console.log('optionsObj', optionsObj);
    
    
    // --------------------------------------------------
    //   Notification
    // --------------------------------------------------
  
    eventObj.waitUntil(
      self.registration.showNotification(title, optionsObj)
    );
    
  }
  
  
});




try{self["workbox:core:5.0.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.0.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class c{constructor(e,t,c="GET"){this.handler=s(t),this.match=e,this.method=c}}class a extends c{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const n=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href};class i{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;let c,{params:a,route:n}=this.findMatchingRoute({url:s,request:e,event:t}),i=n&&n.handler;if(!i&&this.s&&(i=this.s),i){try{c=i.handle({url:s,request:e,event:t,params:a})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this.i&&(c=c.catch(c=>this.i.handle({url:s,request:e,event:t}))),c}}findMatchingRoute({url:e,request:t,event:s}){const c=this.t.get(t.method)||[];for(const a of c){let c,n=a.match({url:e,request:t,event:s});if(n)return c=n,(Array.isArray(n)&&0===n.length||n.constructor===Object&&0===Object.keys(n).length||"boolean"==typeof n)&&(c=void 0),{route:a,params:c}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new i,r.addFetchListener(),r.addCacheListener()),r);const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[f.prefix,e,f.suffix].filter(e=>e&&e.length>0).join("-"),d=e=>e||u(f.precache),h=e=>e||u(f.runtime);function l(e){e.then(()=>{})}const b=new Set;class w{constructor(e,t,{onupgradeneeded:s,onversionchange:c}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=c||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const c=indexedDB.open(this.u,this.h);c.onerror=()=>t(c.error),c.onupgradeneeded=e=>{s?(c.transaction.abort(),c.result.close()):"function"==typeof this.l&&this.l(e)},c.onsuccess=()=>{const t=c.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:c="next",count:a,includeKeys:n=!1}={}){return await this.transaction([e],"readonly",(i,r)=>{const o=i.objectStore(e),f=t?o.index(t):o,u=[],d=f.openCursor(s,c);d.onsuccess=()=>{const e=d.result;e?(u.push(n?e:e.value),a&&u.length>=a?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((c,a)=>{const n=this.o.transaction(e,t);n.onabort=()=>a(n.error),n.oncomplete=()=>c(),s(n,e=>c(e))})}async g(e,t,s,...c){return await this.transaction([t],s,(s,a)=>{const n=s.objectStore(t),i=n[e].apply(n,c);i.onsuccess=()=>a(i.result)})}close(){this.o&&(this.o.close(),this.o=null)}}w.prototype.OPEN_TIMEOUT=2e3;const p={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(p))for(const s of t)s in IDBObjectStore.prototype&&(w.prototype[s]=async function(t,...c){return await this.g(s,t,e,...c)});try{self["workbox:expiration:5.0.0"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class v{constructor(e){this.v=e,this.o=new w("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const c=indexedDB.deleteDatabase(e);c.onerror=()=>{s(c.error)},c.onblocked=()=>{s(new Error("Delete blocked"))},c.onsuccess=()=>{t()}})})(this.v)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.v,id:this._(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this._(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,c)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),n=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const c=s.value;c.cacheName===this.v&&(e&&c.timestamp<e||t&&i>=t?n.push(s.value):i++),s.continue()}else c(n)}}),c=[];for(const e of s)await this.o.delete("cache-entries",e.id),c.push(e.url);return c}_(e){return this.v+"|"+g(e)}}class y{constructor(e,t={}){this.j=!1,this.R=!1,this.q=t.maxEntries,this.U=t.maxAgeSeconds,this.v=e,this.k=new v(e)}async expireEntries(){if(this.j)return void(this.R=!0);this.j=!0;const e=this.U?Date.now()-1e3*this.U:0,t=await this.k.expireEntries(e,this.q),s=await self.caches.open(this.v);for(const e of t)await s.delete(e);this.j=!1,this.R&&(this.R=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.k.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.U){return await this.k.getTimestamp(e)<Date.now()-1e3*this.U}return!1}async delete(){this.R=!1,await this.k.expireEntries(1/0)}}const m=(e,t)=>e.filter(e=>t in e),x=async({cacheName:e,request:t,event:s,matchOptions:c,plugins:a=[]})=>{const n=await self.caches.open(e),i=await R({plugins:a,request:t,mode:"read"});let r=await n.match(i,c);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;r=await a.call(t,{cacheName:e,event:s,matchOptions:c,cachedResponse:r,request:i})}return r},j=async({request:e,response:t,event:s,plugins:c=[]})=>{let a=t,n=!1;for(let t of c)if("cacheWillUpdate"in t){n=!0;const c=t.cacheWillUpdate;if(a=await c.call(t,{request:e,response:a,event:s}),!a)break}return n||(a=a&&200===a.status?a:void 0),a||null},R=async({request:e,mode:t,plugins:s=[]})=>{const c=m(s,"cacheKeyWillBeUsed");let a=e;for(const e of c)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},q={put:async({cacheName:e,request:s,response:c,event:a,plugins:i=[],matchOptions:r})=>{const o=await R({plugins:i,request:s,mode:"write"});if(!c)throw new t("cache-put-with-no-response",{url:n(o.url)});let f=await j({event:a,plugins:i,response:c,request:o});if(!f)return;const u=await self.caches.open(e),d=m(i,"cacheDidUpdate");let h=d.length>0?await x({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,f)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(let t of d)await t.cacheDidUpdate.call(t,{cacheName:e,event:a,oldResponse:h,newResponse:f,request:o})},match:x},U=async({request:e,fetchOptions:s,event:c,plugins:a=[]})=>{if("string"==typeof e&&(e=new Request(e)),c instanceof FetchEvent&&c.preloadResponse){const e=await c.preloadResponse;if(e)return e}const n=m(a,"fetchDidFail"),i=n.length>0?e.clone():null;try{for(let t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:c})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}let r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of a)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:c,request:r,response:t}));return t}catch(e){for(const t of n)await t.fetchDidFail.call(t,{error:e,event:c,originalRequest:i.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.0.0"]&&_()}catch(e){}const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let I;async function E(e,t){const s=e.clone(),c={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(c):c,n=function(){if(void 0===I){const e=new Response("");if("body"in e)try{new Response(e.body),I=!0}catch(e){I=!1}I=!1}return I}()?s.body:await s.blob();return new Response(n,a)}try{self["workbox:precaching:5.0.0"]&&_()}catch(e){}function M(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:c}=e;if(!c)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(c,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(c,location.href),n=new URL(c,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:n.href}}class T{constructor(e){this.v=d(e),this.I=new Map,this.M=new Map,this.T=new Map}addToCacheList(e){const s=[];for(const c of e){"string"==typeof c?s.push(c):c&&void 0===c.revision&&s.push(c.url);const{cacheKey:e,url:a}=M(c),n="string"!=typeof c&&c.revision?"reload":"default";if(this.I.has(a)&&this.I.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.I.get(a),secondEntry:e});if("string"!=typeof c&&c.integrity){if(this.T.has(e)&&this.T.get(e)!==c.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this.T.set(e,c.integrity)}if(this.I.set(a,e),this.M.set(a,n),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],c=[],a=await self.caches.open(this.v),n=await a.keys(),i=new Set(n.map(e=>e.url));for(const[e,t]of this.I)i.has(t)?c.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:c})=>{const a=this.T.get(s),n=this.M.get(c);return this.L({cacheKey:s,cacheMode:n,event:e,integrity:a,plugins:t,url:c})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:c}}async activate(){const e=await self.caches.open(this.v),t=await e.keys(),s=new Set(this.I.values()),c=[];for(const a of t)s.has(a.url)||(await e.delete(a),c.push(a.url));return{deletedURLs:c}}async L({cacheKey:e,url:s,cacheMode:c,event:a,plugins:n,integrity:i}){const r=new Request(s,{integrity:i,cache:c,credentials:"same-origin"});let o,f=await U({event:a,plugins:n,request:r});for(const e of n||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:a,request:r,response:f}):f.status<400))throw new t("bad-precaching-response",{url:s,status:f.status});f.redirected&&(f=await E(f)),await q.put({event:a,plugins:n,response:f,request:e===s?r:new Request(e),cacheName:this.v,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.I}getCachedURLs(){return[...this.I.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.I.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.v)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.v,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const c=this.createHandler(s),a=new Request(e);return()=>c({request:a})}}let L;const H=()=>(L||(L=new T),L);const D=(e,t)=>{const s=H().getURLsToCacheKeys();for(const c of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:c,urlManipulation:a}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(n,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(c){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:n});for(const t of e)yield t.href}}(e,t)){const e=s.get(c);if(e)return e}};let N=!1;function Q(e){N||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:c}={})=>{const a=d();self.addEventListener("fetch",n=>{const i=D(n.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:c});if(!i)return;let r=self.caches.open(a).then(e=>e.match(i)).then(e=>e||fetch(i));n.respondWith(r)})})(e),N=!0)}const Z=[],C={get:()=>Z,add(e){Z.push(...e)}},K=e=>{const t=H(),s=C.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},P=e=>{const t=H();e.waitUntil(t.activate())};var O;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),O={},function(e){H().addToCacheList(e),e.length>0&&(self.addEventListener("install",K),self.addEventListener("activate",P))}([{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/_buildManifest.js",revision:"54cd6f56419c1ae143bc8595cb94433b"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/_app.js",revision:"9a94aa180ee4675cb1f7a052f06fbdc4"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/_error.js",revision:"49c14b8e7e0dcd815c3e6fe4ed21b084"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/confirm/email/[emailConfirmationID].js",revision:"3a06972e9131363f40c83ed06f22e96e"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/confirm/reset-password/[emailConfirmationID].js",revision:"cad56d477978ea9cff3cc7ac170ab280"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/index.js",revision:"ac1135d1ccef5676242f13e65b529568"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/initialize.js",revision:"2aa4c5a3047580b39a7b618247e7f13f"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/login.js",revision:"098095b4cddce1c81c97c1e8c49afa5c"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/login/account.js",revision:"34155c641fd2fa55575b19fdee0c80c9"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/login/reset-password.js",revision:"7e7bc5a755bf7dc9beb1887404748d5c"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/logout.js",revision:"74bed1369be2a14e6353f97ae7a0ab67"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/test.js",revision:"0a56b6aab0c9224da0ba89f42df5eb58"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/uc/[userCommunityID].js",revision:"65adaef1a29f83c6189675d953d65e22"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/uc/[userCommunityID]/forum/[forumID].js",revision:"264e9a9f8c5003f37bd4f098bc0b6e85"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/uc/[userCommunityID]/member.js",revision:"51b12c02aee3219ef109e9b7e6ba845e"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/uc/[userCommunityID]/settings.js",revision:"6fc2f1b456214d0034f41258b2b5066e"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/ur/[userID].js",revision:"e129a336fc5e6da149ddfb0e9840f1d1"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/ur/[userID]/follow.js",revision:"720e39e1b4aa53dbbe6704106afe8818"},{url:"_next/static/I5hRl87bMuT7iEjUQcZHf/pages/ur/[userID]/settings.js",revision:"98e9a4e6e0a89eda7dee77114f4785e9"},{url:"_next/static/chunks/0239af51.0147c2663e37e3159be8.js",revision:"29ca455075c04f9a91aadba6a8e86937"},{url:"_next/static/chunks/082638d1.0f59b51208a6ea2a35e3.js",revision:"ae02023e1bf1e6c9a7e74f31438bbe4b"},{url:"_next/static/chunks/08682650.07e6de4b93572c8bc67d.js",revision:"09df32a9a2c995ec757d6d5febf9d543"},{url:"_next/static/chunks/0eed79454eae9cd4532c0101b1c068c8b5f58806.af481a23e4be3f0c73ab.js",revision:"525f723d6b7bba67162809bd01016d13"},{url:"_next/static/chunks/0f1f73b73808ece1148e5fe2e9fd048fd89bf119.812913f05fa51bc99b98.js",revision:"30b2f875e0f6f85ac020de62041c1439"},{url:"_next/static/chunks/16233b7e349b7fd0b212c8c9b30d81f7bc4bbff0.33f66094bf54c9f3eb1c.js",revision:"61478c9221d9843819de9855a733d49e"},{url:"_next/static/chunks/1c9e7aa8508d918763b6c7b36073b5e844ee92fe.30db9bc01eee4a0ec8fd.js",revision:"c45f52bec3ab5748a7670b00b65169aa"},{url:"_next/static/chunks/218a5cc5.c4ba4543a984ae921e22.js",revision:"89a9c87e9ed1a5792ba139e55ec27569"},{url:"_next/static/chunks/219bf002.13be486a1588f6d573bc.js",revision:"3996660e1ddfe5ee2f5eb9a515cf5679"},{url:"_next/static/chunks/255559b1.75a0e44c63db2f9fbdda.js",revision:"8e9ae94b2595eb55cbf40299a2375ff7"},{url:"_next/static/chunks/258abd4f.e104cc3aae2a4bd0f8fa.js",revision:"5c3b5979d897fddffa7e6c6038f538c0"},{url:"_next/static/chunks/303fa4ef.b1dddf9672684a072880.js",revision:"782818a4a1e35abe01ae7586073886ec"},{url:"_next/static/chunks/31d037dc.bc0c0c056b1e479a73ae.js",revision:"7820dac8b336bbc4376c9273b4f52fd9"},{url:"_next/static/chunks/3eb7a4c924122f39090e31aa168b7e8880448e81.16db7df0e6913b35f7da.js",revision:"e5eaa1be6f43d232fa26fd3014728617"},{url:"_next/static/chunks/4afafdf3.16aabfd2d5d2ec91f224.js",revision:"db8c90bd6d7312909fab89fc3d2f5b5f"},{url:"_next/static/chunks/4f02d4a4.74c6d2cbf255d8e936b4.js",revision:"d99e06aad6b6b8a26cd860ea016dab3b"},{url:"_next/static/chunks/5bad2f18.f4092a345664ea352184.js",revision:"4218bd965a19f69c771a4ea75e46451b"},{url:"_next/static/chunks/7471bb6e.e17453ed381d53a26d33.js",revision:"a83bb2783107b6a85fbace42804d8a58"},{url:"_next/static/chunks/7958a10e.85f3f1c21a29efa1f03a.js",revision:"829bcfe43bb5a4c737d3016570963297"},{url:"_next/static/chunks/7e60debb0abcee16aa39035b24aa603a4a2ad8d4.6bae9ed76300191977a1.js",revision:"26cca55639460755bbc53f9c46102c50"},{url:"_next/static/chunks/8313d723.920e4cd23dea61d19b5b.js",revision:"b4a4563d14610a47ee42e2c3137c23f6"},{url:"_next/static/chunks/85aff285.eebbc63fa1421bb32d52.js",revision:"eb7bf1dc19f58b535e9ee56809170699"},{url:"_next/static/chunks/8b391809.dd9867a31fedb194e549.js",revision:"de391aacf6563f3f53e63643011b6eca"},{url:"_next/static/chunks/8b58c885.d7b9fc70da348b830726.js",revision:"27ea749d7e396c8a569b514b31735fb7"},{url:"_next/static/chunks/93acc752.7b79dfe9f68245266ff5.js",revision:"83ce62ec50b6f266f385ccd16b914b0c"},{url:"_next/static/chunks/a10d18ff.6ea062253c2e4d0ff10f.js",revision:"d92f3b74325a9083e25a138f07ddf39d"},{url:"_next/static/chunks/a315db6cd4753adcc41946d63a6f18adff26a6bc.08438696d68bd6455f38.js",revision:"862d7d3ee669b45bc8ef0dc30bd00376"},{url:"_next/static/chunks/a6b36605.a5520cc5a3a5e7b2d1bb.js",revision:"4160c9920103776860873f539fd01652"},{url:"_next/static/chunks/a9080e9bfc7f309b8e40cabb2c9529923688a4fe.62da5ef0efa6a483f296.js",revision:"b17930abb7e3a27eb9e3324c472b9b43"},{url:"_next/static/chunks/ac1c44fc.d15c8a62967ef426fd45.js",revision:"22a6dbdf3a156702eafdb3c7638f147e"},{url:"_next/static/chunks/b89f6950.f2c518185b1230089d4c.js",revision:"aa572bf2ca83fe1995af7f1ab392a005"},{url:"_next/static/chunks/c0c67054.168d0e0a294de4cdced4.js",revision:"244d7513495bf1fc6721928074093291"},{url:"_next/static/chunks/c59cfcd44b762975620f24bec22acb14022a41e6.eab3a5f40fe43baa812e.js",revision:"90dc60df1352b0c7c918bf26022eac99"},{url:"_next/static/chunks/ce82e3a01a17b07d94179fdbdae7c08788e331a6.c64b8eb31dcc749094c6.js",revision:"511f0c46bdae729d1cc8f5cbf088ac7d"},{url:"_next/static/chunks/commons.9320dc8dfeffd0a94a07.js",revision:"17de8ece343846eb76aa204b69219a6b"},{url:"_next/static/chunks/d6c2798b535c2a030001b418981c15b8bae8984c.f8481ab0748f7d4c3274.js",revision:"db752cfb34ea2c5a1ac88eb362a658d5"},{url:"_next/static/chunks/d881252dd78d7db28e7af9fe8227b08aea1916c3.c8245bbd737fae7c5055.js",revision:"f2f9c8dc8f15bd777d77a24db19291d6"},{url:"_next/static/chunks/de82a06a3e87c0ab99ef1d8521fafbb7566a6d47.6da78acd6fbd149c44a6.js",revision:"4905f12c6a898a6a5cb670811b9c6a72"},{url:"_next/static/chunks/ec79132e.c2678e2550d6f19ae195.js",revision:"52e0d2f8eb1fa071f85722b2680b5ceb"},{url:"_next/static/chunks/f2eea262.40c7bbe838521c6fa537.js",revision:"9157a46e1c281fb2fdb4a593ad011ae1"},{url:"_next/static/chunks/f64e9096.1d6387c2a64ea6a1ba6d.js",revision:"3eef552201f2d7f38293eddcf60f55ac"},{url:"_next/static/chunks/fe6737a90bb672ebf0c46e6a14ec138f91ac53b5.6cad04dc0935c81ff069.js",revision:"a970165ff278b201f253f12b213abd7c"},{url:"_next/static/chunks/framework.5fcc7199ef0beb206d2f.js",revision:"a6ffcc3fbc51a136797bdccc32a2fe32"},{url:"_next/static/css/46a968ae19db829c0c64.css",revision:"4872d898345f3833774478344912cab7"},{url:"_next/static/runtime/main-37c2f970070f2cc259cb.js",revision:"471f0cde6f7d5d8b4cc8e2d65b5b3cb4"},{url:"_next/static/runtime/polyfills-ef12bcd53c57355d04dc.js",revision:"4830f2ed3ed229dbde416d78f1f10c70"},{url:"_next/static/runtime/webpack-b65cab0b00afd201cbda.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}]),Q(O),function(e,s,n){let i;if("string"==typeof e){const t=new URL(e,location.href);i=new c(({url:e})=>e.href===t.href,s,n)}else if(e instanceof RegExp)i=new a(e,s,n);else if("function"==typeof e)i=new c(e,s,n);else{if(!(e instanceof c))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=e}o().registerRoute(i)}(/^https?.*/,new class{constructor(e={}){if(this.v=h(e.cacheName),e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this.H=t?e.plugins:[k,...e.plugins]}else this.H=[k];this.D=e.networkTimeoutSeconds||0,this.N=e.fetchOptions,this.Z=e.matchOptions}async handle({event:e,request:s}){const c=[];"string"==typeof s&&(s=new Request(s));const a=[];let n;if(this.D){const{id:t,promise:i}=this.C({request:s,event:e,logs:c});n=t,a.push(i)}const i=this.K({timeoutId:n,request:s,event:e,logs:c});a.push(i);let r=await Promise.race(a);if(r||(r=await i),!r)throw new t("no-response",{url:s.url});return r}C({request:e,logs:t,event:s}){let c;return{promise:new Promise(t=>{c=setTimeout(async()=>{t(await this.P({request:e,event:s}))},1e3*this.D)}),id:c}}async K({timeoutId:e,request:t,logs:s,event:c}){let a,n;try{n=await U({request:t,event:c,fetchOptions:this.N,plugins:this.H})}catch(e){a=e}if(e&&clearTimeout(e),a||!n)n=await this.P({request:t,event:c});else{const e=n.clone(),s=q.put({cacheName:this.v,request:t,response:e,event:c,plugins:this.H});if(c)try{c.waitUntil(s)}catch(e){}}return n}P({event:e,request:t}){return q.match({cacheName:this.v,request:t,event:e,matchOptions:this.Z,plugins:this.H})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:c})=>{if(!c)return null;let a=this.O(c);const n=this.A(s);l(n.expireEntries());const i=n.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return a?c:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.A(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.S=e,this.U=e.maxAgeSeconds,this.W=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),b.add(t))}A(e){if(e===h())throw new t("expire-custom-caches-only");let s=this.W.get(e);return s||(s=new y(e,this.S),this.W.set(e,s)),s}O(e){if(!this.U)return!0;const t=this.B(e);return null===t||t>=Date.now()-1e3*this.U}B(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.W)await self.caches.delete(e),await t.delete();this.W=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
