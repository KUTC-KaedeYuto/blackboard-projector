(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[488],{5740:function(e,t,n){Promise.resolve().then(n.bind(n,4343))},4343:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r,o,i=n(7437),s=n(2265),a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},u=(0,s.createContext)(void 0),c="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML",l="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js",d=function(e){var t=e.config,n=e.version,n=void 0===n?3:n,i=e.src,i=void 0===i?2===n?c:l:i,d=e.onStartup,h=e.onLoad,f=e.onError,p=e.typesettingOptions,v=e.renderMode,v=void 0===v?"post":v,y=e.hideUntilTypeset,e=e.children,m=(0,s.useContext)(u);if(void 0!==(null==m?void 0:m.version)&&(null==m?void 0:m.version)!==n)throw Error("Cannot nest MathJaxContexts with different versions. MathJaxContexts should not be nested at all but if they are, they cannot have different versions. Stick with one version of MathJax in your app and avoid using more than one MathJaxContext.");if(2===n&&void 0!==o||3===n&&void 0!==r)throw Error("Cannot use MathJax versions 2 and 3 simultaneously in the same app due to how MathJax is set up in the browser; either you have multiple MathJaxContexts with different versions or you have mounted and unmounted MathJaxContexts with different versions. Please stick with one version of MathJax in your app. File an issue in the project Github page if you need this feature.");var w=(0,s.useRef)(m),m=(0,s.useRef)((null==m?void 0:m.version)||null);if(null===m.current)m.current=n;else if(m.current!==n)throw Error("Cannot change version of MathJax in a MathJaxContext after it has mounted. Reload the page with a new version when this must happen.");var x=i||(2===n?c:l);function b(e,n){t&&(window.MathJax=t);var r=document.createElement("script");r.type="text/javascript",r.src=x,r.async=!1,r.addEventListener("load",function(){var t=window.MathJax;d&&d(t),e(t),h&&h()}),r.addEventListener("error",function(e){return n(e)}),document.getElementsByTagName("head")[0].appendChild(r)}return void 0===w.current&&(m={typesettingOptions:p,renderMode:v,hideUntilTypeset:y},2===n?void 0===r&&("undefined"!=typeof window?(r=new Promise(b)).catch(function(e){if(!f)throw Error("Failed to download MathJax version 2 from '".concat(x,"' due to: ").concat(e));f(e)}):(r=Promise.reject()).catch(function(e){})):void 0===o&&("undefined"!=typeof window?(o=new Promise(b)).catch(function(e){if(!f)throw Error("Failed to download MathJax version 3 from '".concat(x,"' due to: ").concat(e));f(e)}):(o=Promise.reject()).catch(function(e){})),w.current=a(a({},m),2===n?{version:2,promise:r}:{version:3,promise:o})),s.createElement(u.Provider,{value:w.current},e)},h=function(){return(h=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},f=function(e,t){var n={};for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)0>t.indexOf(o[r])&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]]);return n},p=function(e){return"Typesetting failed: ".concat(void 0!==e.message?e.message:e.toString())},v=function(e){function t(){var e;"every"===b&&E&&"post"===M&&null!==w.current&&(w.current.style.visibility=null!=(e=null==(e=y.style)?void 0:e.visibility)?e:"visible"),j.current||("first"===b&&null!==w.current&&(w.current.style.visibility="visible"),o&&o(),j.current=!0),i&&i(),O.current=!1}var n=e.inline,r=void 0!==n&&n,n=e.hideUntilTypeset,o=e.onInitTypeset,i=e.onTypeset,a=e.text,c=e.dynamic,l=e.typesettingOptions,d=e.renderMode,v=e.children,y=f(e,["inline","hideUntilTypeset","onInitTypeset","onTypeset","text","dynamic","typesettingOptions","renderMode","children"]),m=(0,s.useRef)(""),w=(0,s.useRef)(null),x=(0,s.useContext)(u),b=null!=n?n:null==x?void 0:x.hideUntilTypeset,M=null!=d?d:null==x?void 0:x.renderMode,g=null!=l?l:null==x?void 0:x.typesettingOptions,E=!1!==c&&(c||!1),j=(0,s.useRef)(!1),O=(0,s.useRef)(!1);return!O.current&&null!==w.current&&E&&"every"===b&&"post"===M&&(w.current.style.visibility="hidden"),("undefined"!=typeof window?s.useLayoutEffect:s.useEffect)(function(){if((E||!j.current)&&null!==w.current){if(!x)throw Error("MathJax was not loaded, did you use the MathJax component outside of a MathJaxContext?");if("pre"===M){if(!("string"==typeof a&&0<a.length))throw Error("Render mode 'pre' requires text prop to be set and non-empty, which was currently \"".concat(a,'"'));if(!l||!l.fn)throw Error("Render mode 'pre' requires 'typesettingOptions' prop with 'fn' property to be set on MathJax element or in the MathJaxContext");if(2===x.version)throw Error("Render mode 'pre' only available with MathJax 3, and version 2 is currently in use")}"post"!==M&&a===m.current||O.current||(O.current=!0,3===x.version?x.promise.then(function(e){var n;"pre"===M?(n=function(n){m.current=a,e.startup.document.clear(),e.startup.document.updateDocument(),null!==w.current&&(w.current.innerHTML=n.outerHTML),t()},l.fn.endsWith("Promise")?e.startup.promise.then(function(){return e[g.fn](a,h(h({},(null==g?void 0:g.options)||{}),{display:!r}))}).then(n).catch(function(e){throw t(),Error(p(e))}):e.startup.promise.then(function(){n(e[g.fn](a,h(h({},(null==g?void 0:g.options)||{}),{display:!r})))}).catch(function(e){throw t(),Error(p(e))})):e.startup.promise.then(function(){return e.typesetClear([w.current]),e.typesetPromise([w.current])}).then(t).catch(function(e){throw t(),Error(p(e))})}).catch(function(e){throw t(),Error(p(e))}):x.promise.then(function(e){e.Hub.Queue(["Typeset",e.Hub,w.current]),e.Hub.Queue(t)}).catch(function(e){throw t(),Error(p(e))}))}}),s.createElement("span",h({},y,{style:h(h({display:r?"inline":"block"},y.style),{visibility:b?"hidden":null==(e=y.style)?void 0:e.visibility}),ref:w}),v)};function y(){let[e,t]=(0,s.useState)([]);return(0,s.useEffect)(()=>{t(["a = g = -9.8","v_{0y} &= v_{0}\\sin\\theta","v_{y} &= \\int_{0}^{t} a \\, dt + v_{0y} \\\\ &= -9.8t + v_{0}\\sin\\theta","y &= \\int_{0}^{t} v_{y} \\, dt + h \\\\ &= -4.9t^{2} + v_{0}t\\sin\\theta + h"])},[]),(0,i.jsx)("div",{children:(0,i.jsxs)(d,{version:2,children:[(0,i.jsx)("h1",{children:"数式表示例"}),e.map((e,t)=>(0,i.jsx)(m,{formula:e},t))]})})}function m(e){let{formula:t}=e,[n,r]=(0,s.useState)("black"),[o,a]=(0,s.useState)(!1);return(0,i.jsx)(v,{style:{color:n,marginBottom:"10px"},onMouseEnter:()=>{o||r("red")},onMouseLeave:()=>{o||r("black")},onClick:()=>{a(!o),r(o?"black":"red")},children:"\\begin{align}".concat(t,"\\end{align}")})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=5740)}),_N_E=e.O()}]);