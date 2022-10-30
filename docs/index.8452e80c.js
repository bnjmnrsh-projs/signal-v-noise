/*! signal-v-noise v1.0.0 | (c) 2022 benjmnrsh@gmail.com | ISC License | https://github.com/bnjmnrsh-projs/signal-v-noise */

var t=["home","arts","automobiles","books","business","climate","dining","fashion","food","health","insider","magazine","movies","nyregion","obituaries","opinion","politics","realestate","science","sports","style","sundayreview","technology","theater","t-magazine","travel","upshot","us","world"];function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function n(t){if(Array.isArray(t))return e(t)}function o(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,n){if(t){if("string"==typeof t)return e(t,n);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(o):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(t,n):void 0}}function a(t){return n(t)||o(t)||i(t)||r()}var l=function(t){var e=document.createElement("div");return e.textContent=t,e.innerHTML};function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),o.forEach((function(e){c(t,e,n[e])}))}return t}addEventListener("click",(function(t){"section"in t.target.dataset&&(document.querySelector("#app").setAttribute("data-section",t.target.dataset.section),t.target.classList.add("active"))}));var u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".observable",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"loaded",o={root:document.querySelector("body"),rootMargin:"0px",threshold:1};t=s({},o,t);var r=document.querySelectorAll(e);if(r.length){var i=function(t){t.forEach((function(t){t.isIntersecting&&t.target.classList.add(n)}))},a=new IntersectionObserver(i,t);r.forEach((function(t){return a.observe(t)}))}else console.warn("No observerable elements named",e)},d=function(e){var n,o,r,i=document.querySelector("#articles"),a=document.querySelector("#loader");a.style.opacity=1,o=window.location.hash.replace("#",""),r=document.querySelector("nav.noise"),n&&r.querySelectorAll(".pill").forEach((function(t){t.classList.remove("active"),t.classList.contains(o)&&t.classList.add("active")})),i.innerHTML=e.top_stories.results.map((function(e){var n,o,r,i,a,c,s,u,d,h,v,f,m=t.indexOf(l(e.section))>=0;if(!m&&"admin"===e.section)return"";if(!e.abstract)return"";var y='<li>\n                                    <article class="news-item '.concat(l(e.section),'">\n                                        <header>');return"multimedia"in e&&null!==e.multimedia&&e.multimedia.length>=3&&(y+='<a href="'.concat(l(null==e?void 0:e.short_url),'" title="').concat(l(e.title),'">\n                                                <img class="loading-bg"\n                                                scrset="').concat(l(null===(n=e.multimedia[0])||void 0===n?void 0:n.url)," ").concat(l(null===(o=null==e?void 0:e.multimedia[0])||void 0===o?void 0:o.width),"w,\n                                                    ").concat(l(null===(r=e.multimedia[1])||void 0===r?void 0:r.url)," ").concat(l(null===(i=null==e?void 0:e.multimedia[1])||void 0===i?void 0:i.width),"w,\n                                                    ").concat(l(null===(a=e.multimedia[2])||void 0===a?void 0:a.url)," ").concat(l(null===(c=null==e?void 0:e.multimedia[2])||void 0===c?void 0:c.width),"w,\n                                                    ").concat(l(null===(s=e.multimedia[3])||void 0===s?void 0:s.url)," ").concat(l(null===(u=null==e?void 0:e.multimedia[3])||void 0===u?void 0:u.width),'w"\n                                                src="').concat(l(null===(d=e.multimedia[1])||void 0===d?void 0:d.url),'"\n                                                 height="').concat(l(null===(h=e.multimedia[1])||void 0===h?void 0:h.height),'"\n                                                 width="').concat(l(null===(v=null==e?void 0:e.multimedia[1])||void 0===v?void 0:v.width),'"\n                                                alt="').concat(l(null===(f=null==e?void 0:e.multimedia[1])||void 0===f?void 0:f.copyright),'" loading="lazy" role="presentation"/>\n                                            </a>')),y+='</header>\n                                        <section class="news-content">\n                                            <header>\n                                                <h3 class="hyphens"><a href="'.concat(l(e.short_url),'">').concat(e.title,'</a></h3>\n                                                  <p class="details">'),m?y+='<a class="pill '.concat(l(e.section),'" href="https://www.nytimes.com/section/').concat(l(e.section),'">'):e.section&&(y+='<span class="pill '.concat(l(e.section),'">')),y+="".concat(l(e.section)," ").concat(m?"</a>":"</span>","\n                                                    ").concat((null==e?void 0:e.byline)?'<span class="byline">':"","\n                                                    ").concat((null==e?void 0:e.byline)?l(null==e?void 0:e.byline):"","\n                                                    ").concat((null==e?void 0:e.byline)?"</span>":"",'\n                                                </p>\n                                            </header>\n                                            <div class="abstract">'),e.abstract&&(y+='<p class="hyphens">'.concat(l(null==e?void 0:e.abstract),'\n                                        <a href="').concat(l(e.short_url),'" title="').concat(l(e.title),'" class="read-more">[...more]</a>\n                                      </p>')),y+="</div>\n                                        </section>\n                                    </article>\n                                </li>"})).join(""),a.style.opacity=0,u({root:document.querySelector("#newsfeed-wrap"),threshold:.25},".news-item")};function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function f(t,e){return e.get?e.get.call(t):e.value}function m(t,e){return f(t,v(t,e,"get"))}function y(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function p(t,e,n){y(t,e),e.set(t,n)}function w(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}function g(t,e,n){return w(t,v(t,e,"set"),n),n}function b(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function S(t,e){y(t,e),e.add(t)}function k(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function E(t,e){if(t!==e)throw new TypeError("Private static access of wrong provenance")}function L(t,e,n){return E(t,e),n}var A=new WeakMap,O=new WeakMap,q=new WeakMap,T=new WeakSet,_=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"pocket";if(h(this,t),S(this,T),p(this,A,{writable:!0,value:void 0}),p(this,O,{writable:!0,value:void 0}),p(this,q,{writable:!0,value:void 0}),g(this,O,o?window.localStorage:window.sessionStorage),!e)throw new Error('Satchel: a "key" is required.');if("string"!=typeof e)throw new Error('Satchel: "key" must be a string.');if(!b(this,T,N).call(this,n))throw new Error("Satchel: {cargo} must be an object.");if("boolean"!=typeof o)throw new Error('Satchel: "local" must be a boolean.');if("string"!=typeof r)throw new Error('Satchel: "pocket" must be a string.');g(this,A,"".concat(t.stcl,".").concat(r,".").concat(e)),g(this,q,{data:void 0,expiry:null}),n=s({},m(this,q),n),this.set(n)}var e,n,o;return e=t,n=[{key:"age",value:function(){var t=JSON.parse(m(this,O).getItem(m(this,A)));return t?{age:Date.now()-t._creation,creation:t._creation,expiry:t.expiry?t.expiry:null,fresh:this.isFresh()}:null}},{key:"bin",value:function(){var e=m(this,O).getItem(m(this,A));return e?(m(this,O).removeItem(m(this,A)),L(t,t,j).call(t,{key:m(this,A),oldValue:e,storageArea:L(t,t,x).call(t,m(this,O)),action:"bin"}),!0):null}},{key:"get",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=m(this,O).getItem(m(this,A));return e?!!(this.isFresh()&&!t||t)&&JSON.parse(e):null}},{key:"set",value:function(e){var n=e.data,o=e.expiry,r=JSON.parse(m(this,O).getItem(m(this,A)));if(n=(null==r?void 0:r.data)&&!n?r.data:n,o=(null==r?void 0:r.expiry)&&!o?r.expiry:o,n&&"string"!=typeof n&&"number"!=typeof n&&!b(this,T,N).call(this,n))throw new Error("Satchel.set({data}): must be either null or a number, string or object.");if("number"!=typeof o&&null!==o)throw new Error('Satchel.set({expiry}): "expiry" must be null or a number.');if(n&&b(this,T,N).call(this,n))try{JSON.parse(JSON.stringify(n))}catch(t){throw new Error("Satchel.set({data}): ".concat(t))}var i=this.get(!0),a={};return a.data=n||null,a.expiry=o||null,a._creation=(null==i?void 0:i._creation)||Date.now(),m(this,O).setItem(m(this,A),JSON.stringify(a)),L(t,t,j).call(t,{key:m(this,A),newValue:JSON.stringify(a),oldValue:i?JSON.stringify(i):null,storageArea:L(t,t,x).call(t,m(this,O)),action:"set"}),this}},{key:"isFresh",value:function(){var t=JSON.parse(m(this,O).getItem(m(this,A)));return t?!(null==t?void 0:t.expiry)||t.expiry-Date.now()>0:null}},{key:"getKey",value:function(){return m(this,A)}}],o=[{key:"stcl",get:function(){return this._stcl?this._stcl:"stcl"},set:function(t){if("string"!=typeof t)throw new Error("Satchel.stcl must be a string.");this._stcl=t}},{key:"getSatchel",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"pocket";if(!e)throw new Error('Satchel.getSatchel(key): a "key" is required.');if("string"!=typeof e)throw new Error('Satchel.getSatchel(key): "key" must be a string.');if("boolean"!=typeof n)throw new Error('Satchel.getSatchel(key, local): "local" must be a boolean.');if("string"!=typeof o)throw new Error('Satchel.getSatchel(key, local, pocket): "pocket" must be an string.');var r="".concat(t.stcl,".").concat(o,".").concat(e),i=n?window.localStorage:window.sessionStorage,a=JSON.parse(i.getItem(r));return a&&0!==a.length?new t(e,a,n,o):null}},{key:"setKey",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"pocket";new t(e,n,o,r)}}],n&&k(e.prototype,n),o&&k(e,o),t}();
/* ! @preserve @bnjmnrsh/satchel v0.2.4.1 | (c) 2022 bnjmnrsh | ISC | https://github.com/bnjmnrsh/satchel */function j(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t=s({key:null,newValue:null,oldValue:null,storageArea:null,url:window.location.href,action:null},t);var e=new CustomEvent("Satchel",{bubbles:!0,cancelable:!0,detail:t});return document.dispatchEvent(e)}function x(t){return t===window.localStorage?"LocalStorage":"SessionStorage"}function N(t){return t&&"object"==typeof t&&t.constructor===Object}c(_,"_stcl",void 0);var I=function(t){var e,n,o,r;return console.warn("err",t),'\n<div id="ohnos">\n  <h3><span aria-hidden="true">⥀.⥀ <br/></span>Oh Nooos!</h3>\n  <p class="sr-only">There has been a crittical error:</p>\n    <div>\n<pre>\n'.concat(t.stack||"","\n").concat(t.type||"","\n").concat("".concat(t.statusText||""," ").concat(t.status||""),"\n").concat(429===(null===(e=t.top_stories)||void 0===e?void 0:e.status)?"".concat(t.top_stories.status," too many requests"):null===(n=t.top_stories)||void 0===n?void 0:n.status,"\n").concat((null===(o=t.top_stories)||void 0===o?void 0:o.error)||"","\n").concat((null===(r=t.top_stories)||void 0===r?void 0:r.error_message)?" Route not found: ".concat(t.top_stories.error_message.split("/").pop().replace(".json","")):"","\n</pre>\n    </div>\n</div>")};function M(t){var e,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=_.getSatchel(t,!0,"svn-store");if((null==o?void 0:o.isFresh())||n)return!!(null===(e=null==o?void 0:o.get())||void 0===e?void 0:e.data)&&(console.log("loading from store ..."),d(o.get().data),document.body.querySelector("#newsfeed-wrap").scrollTo(0,0),document.body.classList.remove("loading"),!0)}var J=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",e=document.querySelector("#loader");if(e.style.opacity=1,document.body.classList.add("loading"),!(navigator.onLine?M(t):M(t,!0))){var n=new Promise((function(n,o){var r;console.log("fetching fresh articles..."),fetch("https://signal-v-noise-worker.bnjmnrsh.workers.dev?section="+t).then((function(t){if(document.body.classList.remove("loading"),r=t.json(),t.ok&&200===t.status)return r;throw t})).then((function(e){if("OK"!==e.top_stories.status)throw e;d(e);var n=Date.now()+12e4;return _.setKey(t,{data:e,expiry:n},!0,"svn-store"),document.body.querySelector("#newsfeed-wrap").scrollTo(0,0),e})).catch((function(t){e.style.opacity=0;var n=document.querySelector("#articles");console.error(t),n&&(n.innerHTML=I(t))}))}));return n}},D=function(){var t=window.location.hash.replace("#",""),e=document.querySelector("#app").getAttribute("data-section");t=t||"home",!e&&t&&(e=t,document.querySelector("#app").setAttribute("data-section",t)),"null"===t||"head"===t?(window.removeEventListener("hashchange",D),window.location.hash=e,setTimeout((function(){return window.addEventListener("hashchange",D)}),1)):J(t)};function H(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"pocket",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"stcl",o=t?window.localStorage:window.sessionStorage,r=Object.keys(o).map((function(t){return t.startsWith(n+"."+e)?t:""})).filter((function(t){return t}));return Array.from(r)}window.addEventListener("hashchange",D);window.addEventListener("Satchel",(function(t){if("Satchel"!==t.type)return;if("svn-store"!==t.detail.key.split(".")[1])return;var e=t.detail.key.split(".")[2];document.querySelectorAll('[data-section="'.concat(e,'"]')).forEach((function(t){t.setAttribute("data-stored",!0)}))}));var P,C,V,W=function(){var t={selector:"body",className:"toast",prepend:!1},e=function(e){var n=0,o={};o.settings=s({},e,t),o.target=document.querySelector(o.settings.selector),o.className=o.settings.className;var r=function(){return(n++).toString()};return o.create=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],l=arguments.length>3&&void 0!==arguments[3]&&arguments[3],c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(this.target&&t){s=s||r();var u=document.createElement("div");return u.setAttribute("role","alert"),u.setAttribute("data-toast",s),(e=u.classList).add.apply(e,[this.className].concat(a(c))),n&&setTimeout((function(){u.remove()}),n),i?(u.innerHTML="".concat(t,' <button class="toast-close" arial-lable="close">&#x2715</button>'),u.addEventListener("click",(function(t){t.target.matches(".toast-close")&&(u.remove(),u.removeEventListener("click",close))}))):u.innerHTML="".concat(t),l?o.target.prepend(u):o.target.append(u),setTimeout((function(){return u.innerHTML}),1),s}},o.destroy=function(t){if(t){var e=document.querySelector('[data-toast="'.concat(t,'"]'));e&&e.remove()}},o};return e}(),z=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t&&t.forEach((function(t){e?(t.setAttribute("data-href",t.href),t.removeAttribute("href","href-disabled"),t.setAttribute("aria-disabled",!0)):(t.setAttribute("href",t.dataset.href),t.removeAttribute("aria-disabled"),t.removeAttribute("data-href"))}))},F=document.querySelector("#app");!function(){var t=navigator.onLine?"online":"offline";document.body.setAttribute("data-network",t);var e=new W,n="",o=Date.now().toString();window.addEventListener("offline",(function(t){var r=document.querySelectorAll(".noise .pill");console.log(r),console.warn("Network unavailable"),o=Date.now(),z(r),document.body.setAttribute("data-network","offline"),n=e.create("Sorry, you are currently off line",0,!1,!0,["offline-notice"])})),window.addEventListener("online",(function(){var t=document.querySelectorAll(".noise .pill");console.log(t),console.warn("Network available"),document.body.setAttribute("data-network","online"),z(t,!1),Date.now()-o>3e4&&D(),e.destroy(n)}))}(),P=F,C=t,V=H(!0),P.querySelector("nav").innerHTML="<ul>"+C.map((function(t){var e=V.includes(t);return'<li><a href="#'.concat(t,'" class="pill ').concat(t,'" data-section="').concat(t,'" data-stored="').concat(e,'">').concat(t,"</a></li>")})).join("")+"</ul>",D(),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:125,n=document.querySelector(t),o=document.querySelector("#stt"),r=function(t){(t.scrollY||t.scrollTop)>e?(document.body.classList.add("scrolled"),o.classList.add("-is-revealed")):(document.body.classList.remove("scrolled"),o.classList.remove("-is-revealed"))};window.addEventListener("scroll",(function(t){return r(window)})),n.addEventListener("scroll",(function(t){return r(n)})),o.addEventListener("click",(function(t){document.scrollingElement.scrollTo(0,0),n.scrollTo(0,0)}))}("#newsfeed-wrap");
//# sourceMappingURL=index.8452e80c.js.map
