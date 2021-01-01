parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ph2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.API_URI=void 0;const e="https://api.tribalwarshelp.com/graphql";exports.API_URI=e;var r=function(){let{query:r,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:r,variables:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let{data:r,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise(e=>e(r))})};exports.default=r;
},{}],"chDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.POPUP_SELECTOR=void 0;const e=".popup_helper",t="#inline_popup";exports.POPUP_SELECTOR=t;var o=function(){let{e:e,title:o,html:n,id:l}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const p=document.querySelector(t);p&&(p.style.width="auto",p.style.maxWidth="1000px"),p.classList.contains("show")?(p.querySelector("#inline_popup_title").innerHTML=o,p.querySelector("#inline_popup_content").innerHTML=n):inlinePopup(e,l,null,{offset_x:0,offset_y:0},n,o);const i=document.querySelector(".popup_helper");i&&(i.style.width="auto",i.style.position="fixed",i.style.zIndex="50001")};exports.default=o;
},{}],"DMkL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=()=>window.location.host.split(".")[0];exports.default=e;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=(e,t)=>new Date(e).toLocaleDateString(window.game_data.locale.replace("_","-"),t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});exports.default=e;
},{}],"fHHP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildImgURL=exports.calcAttackDuration=exports.formatVillageName=exports.formatVillageURL=exports.formatPlayerURL=exports.formatTribeURL=void 0;const o=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:o});exports.formatTribeURL=o;const t=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:o});exports.formatPlayerURL=t;const r=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:o});exports.formatVillageURL=r;const e=function(){let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const e="K"+String(r)[0]+String(t)[0];return"".concat(o," (").concat(t,"|").concat(r,") ").concat(e)};exports.formatVillageName=e;const i=(o,t,r)=>Math.round(o*r/t);exports.calcAttackDuration=i;const a=o=>image_base+o;exports.buildImgURL=a;
},{}],"KWxH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setItem=exports.getItem=void 0;const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=localStorage.getItem(e);let s=t;return o&&(s=JSON.parse(o)),s};exports.getItem=e;const t=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};exports.setItem=t;
},{}],"gvXE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildVillageURL=exports.buildTribeURL=exports.buildPlayerURL=exports.buildURLToProfile=exports.buildURLToServerPage=exports.BASE_URL=void 0;const e="tribalwarshelp.com";exports.BASE_URL=e;const t=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(t,".").concat(e,"/server/").concat(o)};exports.buildURLToServerPage=t;const o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return"".concat(t(e,o),"/").concat(n,"/").concat(l)};exports.buildURLToProfile=o;const l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"player")};exports.buildPlayerURL=l;const n=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"tribe")};exports.buildTribeURL=n;const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"village")};exports.buildVillageURL=i;
},{}],"J1Ly":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").substr(0,2)};exports.default=e;
},{}],"FxgK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{showLatestEnnoblements:"Pokaż najnowsze przejęcia",village:"Wioska",newOwner:"Nowy właściciel",newOwnerTribe:"Plemię nowego właściciela",oldOwner:"Poprzedni właściciel",oldOwnerTribe:"Plemię poprzedniego właściciela",date:"Data",filters:"Filtry",apply:"Zastosuj",ennoblements:"Przejęcia",devNote:"Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :)."},en_DK:{showLatestEnnoblements:"Show latest ennoblements",village:"Village",newOwner:"New owner",newOwnerTribe:"New owner tribe",oldOwner:"Old owner",oldOwnerTribe:"Old owner tribe",filters:"Filters",date:"Date",apply:"Apply",ennoblements:"Ennoblements",devNote:"Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."}};var n=()=>e[window.game_data.locale]||e.en_DK;exports.default=n;
},{}],"hkfB":[function(require,module,exports) {
"use strict";var e=s(require("./libs/requestCreator")),t=s(require("./utils/showPopup")),n=s(require("./utils/getCurrentServer")),r=s(require("./utils/formatDate")),o=require("./utils/tribalwars"),a=require("./utils/localStorage"),l=require("./utils/twhelp"),i=s(require("./utils/getServerVersionCode")),c=s(require("./i18n/latestEnnoblements"));function s(e){return e&&e.__esModule?e:{default:e}}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach(function(t){b(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const w=(0,n.default)(),m="sle_form",p="sle_table",f="kiszkowaty_show_latest_ennoblements_cache",h="kiszkowaty_show_latest_ennoblements_filter",O="https://i.imgur.com/4WP4098.png",g="\n    query liveEnnoblements($server: String!) {\n      liveEnnoblements(server: $server) {\n        newOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        oldOwner {\n          id\n          name\n          tribe {\n            id\n            name\n            tag\n          }\n        }\n        ennobledAt\n        village {\n          id\n          name\n          x\n          y\n        }\n      }\n    }\n  ",v={newOwner:"",newOwnerTribe:"",oldOwner:"",oldOwnerTribe:""},y=(0,c.default)(),x=()=>(0,a.getItem)(f),E=()=>(0,a.getItem)(h),L=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,a.setItem)(f,e)},T=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,a.setItem)(h,e)},j=()=>(0,e.default)({query:g,variables:{server:w}}).then(e=>(L(e),new Promise(t=>t(e)))),q=(e,t)=>e&&e.name.toLowerCase().includes(t.toLowerCase()),P=(e,t)=>e&&e.tribe&&(e.tribe.name.toLowerCase().includes(t.toLowerCase())||e.tribe.tag.toLowerCase().includes(t.toLowerCase())),_=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],{newOwner:t,newOwnerTribe:n,oldOwner:r,oldOwnerTribe:o}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(e=>!(t&&!q(e.newOwner,t))&&(!(n&&!P(e.newOwner,n))&&(!(r&&!q(e.oldOwner,r))&&!(o&&!P(e.oldOwner,o)))))},C=(e,t)=>{e.preventDefault();const n=u(u({},v),{},{newOwner:e.target[0].value,newOwnerTribe:e.target[1].value,oldOwner:e.target[2].value,oldOwnerTribe:e.target[3].value});document.querySelector("#".concat(p," tbody")).innerHTML=I(_(t,n)).join(""),T(n)},S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];document.querySelector("#sle_form").addEventListener("submit",t=>{C(t,e)})},k=e=>e&&e.name?'<a href="'.concat((0,o.formatPlayerURL)(e.id),'">').concat(e.name,"</a> (").concat(e.tribe&&e.tribe.tag?'<a href="'.concat((0,o.formatTribeURL)(e.tribe.id),'">').concat(e.tribe.tag,"</a>"):"-",")"):"-",D=e=>'<a href="'.concat((0,o.formatVillageURL)(e.id),'">').concat((0,o.formatVillageName)(e.name,e.x,e.y),"</a>"),I=e=>e.reverse().map(e=>"<tr>\n              <td>".concat(D(e.village),"</td>\n              <td>").concat(k(e.newOwner),"</td>\n              <td>").concat(k(e.oldOwner),"</td>\n              <td>").concat((0,r.default)(e.ennobledAt),"</td>\n            </tr>")),A=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=u(u({},v),n),o='\n        <form style="margin-bottom: 15px" id="'.concat("sle_form",'">\n        <h1 style="margin-bottom: 0px; text-align: center;"><a href="').concat((0,l.buildURLToServerPage)((0,i.default)(w),w),'">TWHelp</a></h1>\n            <h3 style="margin-bottom: 10px; margin-top: 0;">').concat(y.devNote,'</h3>\n          <h3 style="margin-bottom: 5px">').concat(y.filters,'</h3>\n          <input type="text" placeholder="').concat(y.newOwner,'" value="').concat(r.newOwner,'" />\n          <input type="text" placeholder="').concat(y.newOwnerTribe,'" value="').concat(r.newOwnerTribe,'" />\n          <input type="text" placeholder="').concat(y.oldOwner,'" value="').concat(r.oldOwner,'" />\n          <input type="text" placeholder="').concat(y.oldOwnerTribe,'" value="').concat(r.oldOwnerTribe,'" />\n          <div>\n            <button type="submit">').concat(y.apply,'</button>\n          </div>\n        </form>\n        <table class="vis" id="').concat(p,'" style="width: 100%">\n          <thead>\n            <tr>\n              <th>').concat(y.village,"</th>\n              <th>").concat(y.newOwner,"</th>\n              <th>").concat(y.oldOwner,"</th>\n              <th>").concat(y.date,"</th>\n            </tr>\n          </thead>\n          <tbody>\n            ").concat(I(_(e,r)).join(""),"\n          </tbody>\n        </table>\n        ");(0,t.default)({e:{clientY:60},title:y.ennoblements,id:"ennoblements",html:o}),S(e)},R=async()=>{try{const t=x(),n=E();Array.isArray(t.liveEnnoblements)&&t.liveEnnoblements.length>0&&A(t.liveEnnoblements,n);const{liveEnnoblements:r}=await j();A(r,n)}catch(e){console.log("latestEnnoblements",e)}},U=()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="5px",e.style.left="4px",e.style.zIndex="50000";const t=document.createElement("a");t.innerHTML='<img src="'.concat(O,'">'),t.title=y.showLatestEnnoblements,t.style.cursor="pointer",t.addEventListener("click",R),e.append(t),document.body.appendChild(e)};U();
},{"./libs/requestCreator":"Ph2E","./utils/showPopup":"chDM","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/tribalwars":"fHHP","./utils/localStorage":"KWxH","./utils/twhelp":"gvXE","./utils/getServerVersionCode":"J1Ly","./i18n/latestEnnoblements":"FxgK"}]},{},["hkfB"], null)