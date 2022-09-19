// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jVgwi":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = "0.0.0.0";
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d8d61997c1afb360";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8lRBv":[function(require,module,exports) {
var _scrollToTopJs = require("./_scroll_to_top.js");
var _sectionArrayJs = require("./_section_array.js");
var _simpleRouterJs = require("./_simple_router.js");
var _buildNavJs = require("./_build_nav.js");
var _networkJs = require("./_network.js");
const app = document.querySelector("#app");
(0, _networkJs.network)();
(0, _buildNavJs.buildNav)(app, (0, _sectionArrayJs.aSections));
(0, _simpleRouterJs.simpleRouter)() // kicks off _fetchArticles.js
;
(0, _scrollToTopJs.scrollToTop)("#newsfeed-wrap");

},{"./_scroll_to_top.js":"b8vdJ","./_section_array.js":"87X6z","./_simple_router.js":"lomgT","./_build_nav.js":"bw8Vm","./_network.js":"88AZM"}],"b8vdJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scrollToTop", ()=>scrollToTop);
const scrollToTop = function(targetEl, triggerPoint = 100) {
    const scrollingEl = document.querySelector(targetEl);
    const sttEl = document.querySelector("#stt");
    function elTrigger(el) {
        // window does not have scrollTop
        if (el.scrollTop || el.scrollY > triggerPoint) {
            document.body.classList.add("scrolled");
            sttEl.classList.add("-is-revealed");
        } else {
            document.body.classList.remove("scrolled");
            sttEl.classList.remove("-is-revealed");
        }
    }
    window.addEventListener("scroll", (e)=>elTrigger(window));
    scrollingEl.addEventListener("scroll", (e)=>elTrigger(scrollingEl));
    sttEl.addEventListener("click", (e)=>{
        document.scrollingElement.scrollTo(0, 0);
        scrollingEl.scrollTo(0, 0);
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"87X6z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "aSections", ()=>aSections);
const aSections = [
    "home",
    "arts",
    "automobiles",
    "books",
    "business",
    "climate",
    "dining",
    "fashion",
    "food",
    "health",
    "insider",
    "magazine",
    "movies",
    "nyregion",
    "obituaries",
    "opinion",
    "politics",
    "realestate",
    "science",
    "sports",
    "style",
    "sundayreview",
    "technology",
    "theater",
    "t-magazine",
    "travel",
    "upshot",
    "us",
    "world"
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lomgT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "simpleRouter", ()=>simpleRouter);
var _fetchArticles = require("./_fetch_articles");
const simpleRouter = function() {
    let currentPg = window.location.hash.replace("#", "");
    currentPg = currentPg || "home";
    (0, _fetchArticles.fetchArticles)(currentPg) // kickoff _getArticles.js
    ;
};
addEventListener("hashchange", simpleRouter);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./_fetch_articles":"d36jY"}],"d36jY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fetchArticles", ()=>fetchArticles);
var _buildArticles = require("./_build_articles");
const KEY = ".json?api-key=phTGaNCB3ipdmBV1gZ1OlGVX6rne7i8Z";
const API = "https://api.nytimes.com/svc/topstories/v2/";
const fetchArticles = function(sSecton = "home") {
    const loader = document.querySelector("#loader");
    loader.style.opacity = 1;
    document.body.classList.add("loading");
    if (!navigator.onLine) return;
    const articles = new Promise(function(resolve, reject) {
        fetch(API + sSecton + KEY).then(function(resp) {
            if (resp.ok) {
                document.body.classList.remove("loading");
                return resp.json();
            } else {
                document.body.classList.remove("loading");
                throw resp;
            }
        }).then(function(data) {
            (0, _buildArticles.buildArticles)(data);
            document.body.querySelector("#newsfeed-wrap").scrollTo(0, 0);
            return data;
        }).catch(function(err, data) {
            loader.style.opacity = 0;
            const articles = document.querySelector("#articles");
            console.error(err);
            const errors = `<div id="ohnos">
                        <h3><span aria-hidden="true">⥀.⥀ <br/></span>Oh Nooos!</h3>
                        <p class="sr-only">There has been a crittical error:</p>
                        <div>
                            ${err.stack ? "<pre>" + err.stack + "<pre>" : ""}
                            ${err.status ? "<pre>" + err.statusText + ": " + err.status + "<pre>" : ""}
                        </div>
                    </div>`;
            if (articles) articles.innerHTML = errors;
        });
    });
    return articles;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./_build_articles":"4Vxgw"}],"4Vxgw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildArticles", ()=>buildArticles);
var _snitiz = require("./_snitiz");
var _navActiveLink = require("./_nav_active_link");
var _sectionArray = require("./_section_array");
var _observer = require("./observer");
const buildArticles = function(oData) {
    const articleList = document.querySelector("#articles");
    const loader = document.querySelector("#loader");
    loader.style.opacity = 1;
    (0, _navActiveLink.navActiveLink)();
    // prettier-ignore
    articleList.innerHTML = oData.results.map(function(article) {
        const vaidSection = (0, _sectionArray.aSections).indexOf((0, _snitiz.snitiz)(article.section)) >= 0;
        if (!vaidSection) {
            // console.error ('invalid article type')
            // console.log(article)
            if (article.section === "admin") return "" // remove empty 'admin' sections
            ;
        }
        if (!article.abstract) return "" // remove orpahaned articles
        ;
        let assembly = `<li>
                                    <article class="news-item ${(0, _snitiz.snitiz)(article.section)}">
                                        <header>`;
        // Account for multimedia not coming in as expeced.
        if ("multimedia" in article && article.multimedia !== null && article.multimedia.length >= 3) assembly += `<a href="${(0, _snitiz.snitiz)(article?.short_url)}" title="${(0, _snitiz.snitiz)(article.title)}">
                                                <img class="loading-bg"
                                                scrset="${(0, _snitiz.snitiz)(article.multimedia[0]?.url)} ${(0, _snitiz.snitiz)(article?.multimedia[0]?.width)}w,
                                                    ${(0, _snitiz.snitiz)(article.multimedia[1]?.url)} ${(0, _snitiz.snitiz)(article?.multimedia[1]?.width)}w,
                                                    ${(0, _snitiz.snitiz)(article.multimedia[2]?.url)} ${(0, _snitiz.snitiz)(article?.multimedia[2]?.width)}w,
                                                    ${(0, _snitiz.snitiz)(article.multimedia[3]?.url)} ${(0, _snitiz.snitiz)(article?.multimedia[3]?.width)}w"
                                                src="${(0, _snitiz.snitiz)(article.multimedia[1]?.url)}"
                                                 height="${(0, _snitiz.snitiz)(article.multimedia[1]?.height)}"
                                                 width="${(0, _snitiz.snitiz)(article?.multimedia[1]?.width)}"
                                                alt="${(0, _snitiz.snitiz)(article?.multimedia[1]?.copyright)}" role="presentation"/>
                                            </a>`;
        assembly += `</header>
                                        <section class="news-content">
                                            <header>
                                                <h3 class="hyphens"><a href="${(0, _snitiz.snitiz)(article.short_url)}">${article.title}</a></h3>
                                                  <p class="details">`;
        if (vaidSection) assembly += `<a class="pill ${(0, _snitiz.snitiz)(article.section)}" href="https://www.nytimes.com/section/${(0, _snitiz.snitiz)(article.section)}">`;
        else if (article.section) assembly += `<span class="pill ${(0, _snitiz.snitiz)(article.section)}">`;
        assembly += `${(0, _snitiz.snitiz)(article.section)} ${vaidSection ? "</a>" : "</span>"}
                                                    ${article?.byline ? '<span class="byline">' : ""}
                                                    ${article?.byline ? (0, _snitiz.snitiz)(article?.byline) : ""}
                                                    ${article?.byline ? "</span>" : ""}
                                                </p>
                                            </header>
                                            <div class="abstract">`;
        if (article.abstract) assembly += `<p class="hyphens">${(0, _snitiz.snitiz)(article?.abstract)}
                                                    <a href="${(0, _snitiz.snitiz)(article.short_url)}" title="${(0, _snitiz.snitiz)(article.title)}" class="read-more">[...more]</a>
                                                </p>`;
        assembly += `</div>
                                        </section>
                                    </article>
                                </li>`;
        return assembly;
    }).join("");
    loader.style.opacity = 0;
    (0, _observer.observer)({
        root: document.querySelector("#newsfeed-wrap"),
        threshold: 0.25
    }, ".news-item");
};

},{"./_snitiz":"kP26l","./_nav_active_link":"li6sc","./_section_array":"87X6z","./observer":"7r1z4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kP26l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "snitiz", ()=>snitiz);
const snitiz = function(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"li6sc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "navActiveLink", ()=>navActiveLink);
parcelHelpers.export(exports, "navLink", ()=>navLink);
const navActiveLink = function(navLink) {
    const currentPg = window.location.hash.replace("#", "");
    const nav = document.querySelector("nav.noise");
    if (navLink) {
        // iterate over each link
        const pills = nav.querySelectorAll(".pill");
        pills.forEach(function(pill) {
            pill.classList.remove("active");
            if (pill.classList.contains(currentPg)) pill.classList.add("active");
        });
    }
};
const navLink = function(e) {
    if ("section" in e.target.dataset) e.target.classList.add("active");
};
addEventListener("click", navLink);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7r1z4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "observer", ()=>observer);
const observer = function(options = {}, targets = ".observable", targetObservedClass = "loaded") {
    const defaults = {
        root: document.querySelector("body"),
        rootMargin: "0px",
        threshold: 1.0
    };
    options = {
        ...defaults,
        ...options
    };
    const targetEls = document.querySelectorAll(targets);
    if (!targetEls.length) {
        console.warn("No observerable elements named", targets);
        return;
    }
    const handelIntersection = function(targetEls) {
        targetEls.forEach((el)=>{
            if (el.isIntersecting) el.target.classList.add(targetObservedClass);
        });
    };
    const observer = new IntersectionObserver(handelIntersection, options);
    targetEls.forEach((el)=>observer.observe(el));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bw8Vm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildNav", ()=>buildNav);
const buildNav = function(rootEl, navEls) {
    const navItems = rootEl.querySelector("nav");
    navItems.innerHTML = "<ul>" + navEls.map(function(navEl) {
        return `<li><a href="#${navEl}" class="pill ${navEl}" data-section="${navEl}">${navEl}</a></li>`;
    }).join("") + "</ul>";
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"88AZM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "network", ()=>network);
var _simpleRouter = require("./_simple_router");
var _toastJs = require("./_toast.js");
const disableEnableLinks = function(navEls, disable = true) {
    if (!navEls) return;
    navEls.forEach(function(el) {
        if (disable) {
            el.setAttribute("data-href", el.href);
            el.removeAttribute("href", "href-disabled");
            el.setAttribute("aria-disabled", true);
        } else {
            el.setAttribute("href", el.dataset.href);
            el.removeAttribute("aria-disabled");
            el.removeAttribute("data-href");
        }
    });
};
const network = function() {
    const status = navigator.onLine ? "online" : "offline";
    document.body.setAttribute("data-network", status);
    const networkNotice = new (0, _toastJs.Toast)();
    let curentNotice = "";
    let timeStamp = Date.now().toString();
    window.addEventListener("offline", (e)=>{
        const nav = document.querySelectorAll(".noise .pill");
        console.log(nav);
        console.warn("Network unavailable");
        timeStamp = Date.now();
        disableEnableLinks(nav);
        document.body.setAttribute("data-network", "offline");
        curentNotice = networkNotice.create("Sorry, you are currently off line", 0, false, true, [
            "offline-notice"
        ]);
    });
    window.addEventListener("online", ()=>{
        const nav = document.querySelectorAll(".noise .pill");
        console.log(nav);
        console.warn("Network available");
        document.body.setAttribute("data-network", "online");
        disableEnableLinks(nav, false);
        if (Date.now() - timeStamp > 30000) (0, _simpleRouter.simpleRouter)();
        networkNotice.destroy(curentNotice);
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./_simple_router":"lomgT","./_toast.js":"aVji6"}],"aVji6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Toast", ()=>Toast);
const Toast = function(options = {}) {
    const settings = {
        selector: "body",
        className: "toast",
        prepend: false
    };
    const Constructor = function(options) {
        let ID = 0;
        const publicAPIs = {};
        publicAPIs.settings = {
            ...options,
            ...settings
        };
        publicAPIs.target = document.querySelector(publicAPIs.settings.selector);
        publicAPIs.className = publicAPIs.settings.className;
        // Private Methods
        /**
     * Simple unique ID generator for toasts.
     * ID's are unique for the current session only.
     *
     * @returns string ID, unique to the current session
     */ const toastID = function() {
            return (ID++).toString();
        };
        /**
     * Create new toast messages
     *
     * @param {string} message
     * @param {int} autohide default 0 or autohide after specified milliseconds
     * @param {boolean} dismiss outputs a dismiss button
     * @param {boolean} prepend prepend instead of append the toast
     * @param {array} classes an array of suplimental classes
     * @param {string} id pass in your own ID insead of using the internal methods
     * @returns {string} ID for the toast message just created
     */ publicAPIs.create = function(message, autohide = 0, dismiss = false, prepend = false, classes = [], id = false) {
            if (!this.target || !message) return;
            id = id || toastID();
            const toast = document.createElement("div");
            toast.setAttribute("role", "alert");
            toast.setAttribute("data-toast", id);
            toast.classList.add(this.className, ...classes);
            if (autohide) setTimeout(function() {
                toast.remove();
            }, autohide);
            if (dismiss) {
                toast.innerHTML = `${message} <button class="toast-close" arial-lable="close">&#x2715</button>`;
                toast.addEventListener("click", function(e) {
                    if (!e.target.matches(".toast-close")) return;
                    toast.remove();
                    toast.removeEventListener("click", close);
                });
            } else toast.innerHTML = `${message}`;
            prepend ? publicAPIs.target.prepend(toast) : publicAPIs.target.append(toast);
            // append message 1ms later so it will be announced by screen readers
            setTimeout(()=>toast.innerHTML, 1);
            return id;
        };
        /**
     * Remove toasts from DOM
     *
     * @param {string} id of the toast to be reomved from the DOM
     * @returns
     */ publicAPIs.destroy = function(id) {
            if (!id) return;
            const target = document.querySelector(`[data-toast="${id}"]`);
            if (target) target.remove();
        };
        return publicAPIs;
    };
    return Constructor;
}();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jVgwi","8lRBv"], "8lRBv", "parcelRequire2c69")

//# sourceMappingURL=index.c1afb360.js.map
