parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"VYL5":[function(require,module,exports) {
"use strict";function e(e){if(null===e||!0===e||!1===e)return NaN;var r=Number(e);return isNaN(r)?r:r<0?Math.ceil(r):Math.floor(r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"kK6Q":[function(require,module,exports) {
"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"KYJg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=t(require("../_lib/requiredArgs/index.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t){(0,e.default)(1,arguments);var r=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===r?new Date(t.getTime()):"number"==typeof t||"[object Number]"===r?new Date(t):("string"!=typeof t&&"[object String]"!==r||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"umce":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=u(require("../_lib/toInteger/index.js")),r=u(require("../toDate/index.js")),t=u(require("../_lib/requiredArgs/index.js"));function u(e){return e&&e.__esModule?e:{default:e}}function i(u,i){(0,t.default)(2,arguments);var d=(0,r.default)(u).getTime(),n=(0,e.default)(i);return new Date(d+n)}
},{"../_lib/toInteger/index.js":"VYL5","../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"pfh4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=u(require("../_lib/toInteger/index.js")),r=u(require("../addMilliseconds/index.js")),t=u(require("../_lib/requiredArgs/index.js"));function u(e){return e&&e.__esModule?e:{default:e}}var d=6e4;function i(u,i){(0,t.default)(2,arguments);var l=(0,e.default)(i);return(0,r.default)(u,l*d)}
},{"../_lib/toInteger/index.js":"VYL5","../addMilliseconds/index.js":"umce","../_lib/requiredArgs/index.js":"kK6Q"}],"ddIN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{ennobledAt:"Podbita o",never:"Nigdy",possibleLoyalty:"Prawdopodobne poparcie",canSendNoble:"Można wysłać szlachcica",yes:"Tak",no:"Nie"},en_DK:{ennobledAt:"Ennobled at",never:"Never",possibleLoyalty:"Possible loyalty",canSendNoble:"Can send noble",yes:"Yes",no:"No"}};var o=()=>e[window.game_data.locale]||e.en_DK;exports.default=o;
},{}],"Ph2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.API_URI=void 0;const e="https://api.tribalwarshelp.com/graphql";exports.API_URI=e;var r=function(){let{query:r,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:r,variables:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let{data:r,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise(e=>e(r))})};exports.default=r;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=(e,t)=>new Date(e).toLocaleDateString(window.game_data.locale.replace("_","-"),t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});exports.default=e;
},{}],"DMkL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=()=>window.location.host.split(".")[0];exports.default=e;
},{}],"XOOL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.calcDistanceBetweenTwoPoints=void 0;const e=(e,t,s,o)=>{const c=e-s,n=t-o;return Math.sqrt(c*c+n*n)};exports.calcDistanceBetweenTwoPoints=e;
},{}],"fHHP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildImgURL=exports.calcAttackDuration=exports.buildVillageName=exports.buildVillageURL=exports.buildPlayerURL=exports.buildTribeURL=void 0;const i=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:i});exports.buildTribeURL=i;const o=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:i});exports.buildPlayerURL=o;const e=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:i});exports.buildVillageURL=e;const t=function(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const t="K"+String(e)[0]+String(o)[0];return"".concat(i," (").concat(o,"|").concat(e,") ").concat(t)};exports.buildVillageName=t;const l=(i,o)=>Math.round(i*o);exports.calcAttackDuration=l;const r=i=>image_base+i;exports.buildImgURL=r;
},{}],"KX6P":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./tribalwars"),t=t=>(0,e.buildImgURL)("unit/unit_".concat(t,".png"));exports.default=t;
},{"./tribalwars":"fHHP"}],"KWxH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setItem=exports.getItem=void 0;const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=localStorage.getItem(e);let s=t;return o&&(s=JSON.parse(o)),s};exports.getItem=e;const t=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};exports.setItem=t;
},{}],"H70G":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=r(require("../toDate/index.js")),t=r(require("../_lib/requiredArgs/index.js"));function r(e){return e&&e.__esModule?e:{default:e}}function u(r,u){(0,t.default)(2,arguments);var i=(0,e.default)(r),d=(0,e.default)(u);return i.getTime()-d.getTime()}
},{"../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"oGJj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=t(require("../differenceInMilliseconds/index.js")),r=t(require("../_lib/requiredArgs/index.js"));function t(e){return e&&e.__esModule?e:{default:e}}var u=6e4;function i(t,i){(0,r.default)(2,arguments);var d=(0,e.default)(t,i)/u;return d>0?Math.floor(d):Math.ceil(d)}
},{"../differenceInMilliseconds/index.js":"H70G","../_lib/requiredArgs/index.js":"kK6Q"}],"kcC2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("date-fns/differenceInMinutes"));function t(e){return e&&e.__esModule?e:{default:e}}const r=(t,r)=>{let u=25+Math.abs((0,e.default)(t,new Date))*(r/60);return u>100&&(u=100),Math.floor(u)};var u=r;exports.default=u;
},{"date-fns/differenceInMinutes":"oGJj"}],"HdqX":[function(require,module,exports) {
"use strict";var e=c(require("date-fns/addMinutes")),n=c(require("./i18n/extendedMapPopup")),t=c(require("./libs/requestCreator")),r=c(require("./utils/formatDate")),a=c(require("./utils/getCurrentServer")),o=require("./utils/math"),i=c(require("./utils/buildUnitImgURL")),l=require("./utils/localStorage"),p=require("./utils/tribalwars"),d=c(require("./utils/calcLoyalty"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach(function(n){g(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function g(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}const m=(0,a.default)(),y="\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n                speed\n                unitSpeed\n                snob {\n                  maxDist\n                }\n            }\n            unitConfig {\n              spear {\n                speed\n              }\n              sword {\n                speed\n              }\n              axe {\n                speed\n              }\n              archer {\n                speed\n              }\n              spy {\n                speed\n              }\n              light {\n                speed\n              }\n              marcher {\n                speed\n              }\n              heavy {\n                speed\n              }\n              ram {\n                speed\n              }\n              catapult {\n                speed\n              }\n              knight {\n                speed\n              }\n              snob {\n                speed\n              }\n            }\n        }\n    }\n",f="\n    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {\n        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n",b="kiszkowaty_extended_map_popup_server_cfg",v=(0,n.default)(),h=()=>(0,l.getItem)(b),w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,l.setItem)(b,e)},M=e=>Math.abs(e.getTime()-(new Date).getTime())>864e5,T=async()=>{let e=h();return e&&e.server&&!M(new Date(e.loadedAt))&&e.server.config&&e.server.config.speed&&e.server.config.snob&&e.server.config.snob.maxDist&&e.server.config.unitSpeed&&e.server.unitConfig||((e=await(0,t.default)({query:y,variables:{key:m}})).loadedAt=new Date,w(e)),e&&e.server&&e.server.config?{config:e.server.config,unitConfig:e.server.unitConfig}:{}},q=async function(e){let{cacheOnly:n=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n||TWMap.popup.extendedMapPopupCache[e])return TWMap.popup.extendedMapPopupCache[e];try{const n=await(0,t.default)({query:f,variables:{server:m,sort:["ennobledAt DESC"],filter:{villageID:[e]},limit:1}});return TWMap.popup.extendedMapPopupCache[e]=n,n}catch(r){console.log("loadVillageData",r)}},O=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=[];for(let t in e)0!==e[t].speed&&n.push(u(u({},e[t]),{},{name:t,img:(0,i.default)(t)}));return n},S=e=>e%2==0?"#f8f4e8":"#ded3b9;",C=(e,n)=>'\n    <td style="padding: 2px; background-color: '.concat(S(n),';">\n      <img\n        src="').concat(e.img,'"\n        title="').concat(e.name,'"\n        alt="').concat(e.name,'"\n      />\n    </td>\n  '),x=(n,t)=>'\n    <td style="padding: 2px; background-color: '.concat(S(t),';">\n      ').concat((0,r.default)((0,e.default)(Timing.getCurrentServerTime(),n)),"\n    </td>\n  "),D=(e,n,t)=>{let{config:a,unitConfig:i}=t;const l=TWMap.CoordByXY(TWMap.villageKey[e]),c=(0,o.calcDistanceBetweenTwoPoints)(l[0],l[1],window.game_data.village.x,window.game_data.village.y),s=n&&n.ennoblements&&n.ennoblements.items&&n.ennoblements.items.length>0?n.ennoblements.items[0]:void 0,u=document.querySelector("#map_popup #info_content tbody");let g=u.querySelector("#units");g||((g=document.createElement("tr")).id="units",u.appendChild(g));const m=O(i);g.innerHTML='\n          <td colspan="2">\n            <table style="border: 1px solid #ded3b9; max-width: 450px;"\n              width="100%"\n              cellpadding="0"\n              cellspacing="0">\n              <tbody>\n                <tr class="center">\n                  '.concat(m.map(C).join(""),'\n                </tr>\n                <tr class="center">\n                  ').concat(m.map((e,n)=>x((0,p.calcAttackDuration)(c,e.speed),n)).join(""),"\n                </tr>\n              </tbody>\n            </table>\n          </td>\n      ");let y=u.querySelector("#lastEnnobledAt");y||((y=document.createElement("tr")).id="lastEnnobledAt",u.appendChild(y)),y.innerHTML="\n          <td>\n              ".concat(v.ennobledAt,":\n          </td>\n          <td>\n              ").concat(s?(0,r.default)(s.ennobledAt):v.never,"\n          </td>\n      ");let f=u.querySelector("#loyalty");f||((f=document.createElement("tr")).id="loyalty",u.appendChild(f)),f.innerHTML="\n          <td>\n              ".concat(v.possibleLoyalty,":\n          </td>\n          <td>\n              ").concat(s?(0,d.default)(new Date(s.ennobledAt),a.speed):100,"\n          </td>\n      ");let b=u.querySelector("#canSendNoble");b||((b=document.createElement("tr")).id="canSendNoble",u.appendChild(b)),b.innerHTML="\n          <td>\n              ".concat(v.canSendNoble,":\n          </td>\n          <td>\n              ").concat(c<a.snob.maxDist?v.yes:v.no,"\n          </td>\n      ")},P=e=>async n=>{TWMap.popup._loadVillage(n);const t=await q(parseInt(n));D(parseInt(n),t,e)},_=e=>async(n,t,r)=>{TWMap.popup._displayForVillage(n,t,r);const a=await q(parseInt(n.id),{cacheOnly:window.game_data.features.Premium.active});D(parseInt(n.id),a,e)};!async function(){try{const n=await T();TWMap.popup.extendedMapPopupCache={},TWMap.popup._loadVillage=TWMap.popup.loadVillage,TWMap.popup.loadVillage=P(n),TWMap.popup._displayForVillage=TWMap.popup.displayForVillage,TWMap.popup.displayForVillage=_(n)}catch(e){console.log("extended map popup",e)}}();
},{"date-fns/addMinutes":"pfh4","./i18n/extendedMapPopup":"ddIN","./libs/requestCreator":"Ph2E","./utils/formatDate":"V6Mf","./utils/getCurrentServer":"DMkL","./utils/math":"XOOL","./utils/buildUnitImgURL":"KX6P","./utils/localStorage":"KWxH","./utils/tribalwars":"fHHP","./utils/calcLoyalty":"kcC2"}]},{},["HdqX"], null)