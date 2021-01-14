parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ph2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.API_URI=void 0;const e="https://api.tribalwarshelp.com/graphql";exports.API_URI=e;var r=function(){let{query:r,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:r,variables:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let{data:r,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise(e=>e(r))})};exports.default=r;
},{}],"chDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.POPUP_SELECTOR=void 0;const t=".popup_box";exports.POPUP_SELECTOR=".popup_box";const o=function(){let{html:t,id:o,title:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Dialog.show(o,"<h3>".concat(e,"</h3>")+t);const p=document.querySelector(".popup_box");p&&(p.style.width="auto",p.style.maxWidth="1000px")};var e=o;exports.default=e;
},{}],"DMkL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=()=>window.location.host.split(".")[0];exports.default=e;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=(e,t)=>new Date(e).toLocaleDateString(window.game_data.locale.replace("_","-"),t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});exports.default=e;
},{}],"fHHP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildImgURL=exports.calcAttackDuration=exports.buildVillageName=exports.buildVillageURL=exports.buildPlayerURL=exports.buildTribeURL=void 0;const i=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:i});exports.buildTribeURL=i;const o=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:i});exports.buildPlayerURL=o;const e=i=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:i});exports.buildVillageURL=e;const t=function(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const t="K"+String(e)[0]+String(o)[0];return"".concat(i," (").concat(o,"|").concat(e,") ").concat(t)};exports.buildVillageName=t;const l=(i,o)=>Math.round(i*o);exports.calcAttackDuration=l;const r=i=>image_base+i;exports.buildImgURL=r;
},{}],"KWxH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setItem=exports.getItem=void 0;const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=localStorage.getItem(e);let s=t;return o&&(s=JSON.parse(o)),s};exports.getItem=e;const t=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};exports.setItem=t;
},{}],"gvXE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildVillageURL=exports.buildTribeURL=exports.buildPlayerURL=exports.buildURLToProfile=exports.buildURLToServerPage=exports.BASE_URL=void 0;const e="tribalwarshelp.com";exports.BASE_URL=e;const t=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(t,".").concat(e,"/server/").concat(o)};exports.buildURLToServerPage=t;const o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return"".concat(t(e,o),"/").concat(n,"/").concat(l)};exports.buildURLToProfile=o;const l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"player")};exports.buildPlayerURL=l;const n=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"tribe")};exports.buildTribeURL=n;const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"village")};exports.buildVillageURL=i;
},{}],"J1Ly":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").substr(0,2)};exports.default=e;
},{}],"FxgK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{showLatestEnnoblements:"Pokaż najnowsze przejęcia",village:"Wioska",newOwner:"Nowy właściciel",newOwnerTribe:"Plemię nowego właściciela",oldOwner:"Poprzedni właściciel",oldOwnerTribe:"Plemię poprzedniego właściciela",date:"Data",filters:"Filtry",apply:"Zastosuj",ennoblements:"Przejęcia",devNote:"Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :)."},en_DK:{showLatestEnnoblements:"Show latest ennoblements",village:"Village",newOwner:"New owner",newOwnerTribe:"New owner tribe",oldOwner:"Old owner",oldOwnerTribe:"Old owner tribe",filters:"Filters",date:"Date",apply:"Apply",ennoblements:"Ennoblements",devNote:"Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."}};var n=()=>e[window.game_data.locale]||e.en_DK;exports.default=n;
},{}],"hkfB":[function(require,module,exports) {
"use strict";var e=d(require("./libs/requestCreator")),t=d(require("./utils/showPopup")),n=d(require("./utils/getCurrentServer")),r=d(require("./utils/formatDate")),o=u(require("./utils/tribalwars")),l=require("./utils/localStorage"),a=u(require("./utils/twhelp")),i=d(require("./utils/getServerVersionCode")),c=d(require("./i18n/latestEnnoblements"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var l=r?Object.getOwnPropertyDescriptor(e,o):null;l&&(l.get||l.set)?Object.defineProperty(n,o,l):n[o]=e[o]}return n.default=e,t&&t.set(e,n),n}function d(e){return e&&e.__esModule?e:{default:e}}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach(function(t){p(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const f=(0,n.default)(),m="sle_form",O="sle_table",y="kiszkowaty_show_latest_ennoblements_cache",v="kiszkowaty_show_latest_ennoblements_filter",g="https://i.imgur.com/4WP4098.png",h="\n    query liveEnnoblements($server: String!) {\n      liveEnnoblements(server: $server) {\n        newOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        oldOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        ennobledAt\n        village {\n          id\n          name\n          x\n          y\n        }\n      }\n    }\n  ",j={newOwner:"",newOwnerTribe:"",oldOwner:"",oldOwnerTribe:""},P=(0,c.default)(),_=()=>(0,l.getItem)(y),x=()=>(0,l.getItem)(v),E=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,l.setItem)(y,e)},L=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,l.setItem)(v,e)},T=()=>(0,e.default)({query:h,variables:{server:f}}).then(e=>(E(e),new Promise(t=>t(e)))),q=(e,t)=>e&&e.name.toLowerCase().includes(t.toLowerCase()),C=(e,t)=>e&&e.tribe&&(e.tribe.name.toLowerCase().includes(t.toLowerCase())||e.tribe.tag.toLowerCase().includes(t.toLowerCase())),S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],{newOwner:t,newOwnerTribe:n,oldOwner:r,oldOwnerTribe:o}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(e=>!(t&&!q(e.newOwner,t))&&(!(n&&!C(e.newOwner,n))&&(!(r&&!q(e.oldOwner,r))&&!(o&&!C(e.oldOwner,o)))))},k=(e,t)=>{e.preventDefault();const n=w(w({},j),{},{newOwner:e.target[0].value,newOwnerTribe:e.target[1].value,oldOwner:e.target[2].value,oldOwnerTribe:e.target[3].value});document.querySelector("#".concat(O," tbody")).innerHTML=A(S(t,n)).join(""),L(n)},D=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];document.querySelector("#sle_form").addEventListener("submit",t=>{k(t,e)})},M=e=>e&&e.name?'<a href="'.concat(o.buildPlayerURL(e.id),'">').concat(e.name,"</a> (").concat(e.tribe&&e.tribe.tag?'<a href="'.concat(o.buildTribeURL(e.tribe.id),'">').concat(e.tribe.tag,"</a>"):"-",")"):"-",I=e=>'<a href="'.concat(o.buildVillageURL(e.id),'">').concat(o.buildVillageName(e.name,e.x,e.y),"</a>"),A=e=>e.reverse().map(e=>"<tr>\n              <td>".concat(I(e.village),"</td>\n              <td>").concat(M(e.newOwner),"</td>\n              <td>").concat(M(e.oldOwner),"</td>\n              <td>").concat((0,r.default)(e.ennobledAt),"</td>\n            </tr>")),R=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=w(w({},j),n),o='\n        <form style="margin-bottom: 15px" id="'.concat("sle_form",'">\n        <h1 style="margin-bottom: 0px; text-align: center;"><a href="').concat(a.buildURLToServerPage((0,i.default)(f),f),'">TWHelp</a></h1>\n            <h3 style="margin-bottom: 10px; margin-top: 0;">').concat(P.devNote,'</h3>\n          <h3 style="margin-bottom: 5px">').concat(P.filters,'</h3>\n          <input type="text" placeholder="').concat(P.newOwner,'" value="').concat(r.newOwner,'" />\n          <input type="text" placeholder="').concat(P.newOwnerTribe,'" value="').concat(r.newOwnerTribe,'" />\n          <input type="text" placeholder="').concat(P.oldOwner,'" value="').concat(r.oldOwner,'" />\n          <input type="text" placeholder="').concat(P.oldOwnerTribe,'" value="').concat(r.oldOwnerTribe,'" />\n          <div>\n            <button type="submit">').concat(P.apply,'</button>\n          </div>\n        </form>\n        <table class="vis" id="').concat(O,'" style="width: 100%">\n          <thead>\n            <tr>\n              <th>').concat(P.village,"</th>\n              <th>").concat(P.newOwner,"</th>\n              <th>").concat(P.oldOwner,"</th>\n              <th>").concat(P.date,"</th>\n            </tr>\n          </thead>\n          <tbody>\n            ").concat(A(S(e,r)).join(""),"\n          </tbody>\n        </table>\n        ");(0,t.default)({e:{clientY:60},title:P.ennoblements,id:"ennoblements",html:o}),D(e)},U=async()=>{try{const t=_(),n=x();Array.isArray(t.liveEnnoblements)&&t.liveEnnoblements.length>0&&R(t.liveEnnoblements,n);const{liveEnnoblements:r}=await T();R(r,n)}catch(e){console.log("latestEnnoblements",e)}},W=()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="5px",e.style.left="4px",e.style.zIndex="50000";const t=document.createElement("a");t.innerHTML='<img src="'.concat(g,'">'),t.title=P.showLatestEnnoblements,t.style.cursor="pointer",t.addEventListener("click",U),e.append(t),document.body.appendChild(e)};W();
},{"./libs/requestCreator":"Ph2E","./utils/showPopup":"chDM","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/tribalwars":"fHHP","./utils/localStorage":"KWxH","./utils/twhelp":"gvXE","./utils/getServerVersionCode":"J1Ly","./i18n/latestEnnoblements":"FxgK"}]},{},["hkfB"], null)