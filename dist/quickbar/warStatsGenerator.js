parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ph2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.API_URI=void 0;const e="https://api.tribalwarshelp.com/graphql";exports.API_URI=e;var r=function(){let{query:r,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:r,variables:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let{data:r,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise(e=>e(r))})};exports.default=r;
},{}],"vPH5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{conquers:"Przejęcia",sideOne:"Strona 1",sideTwo:"Strona 2",difference:"Różnica",tribeTag:"Skrót plemienia",delete:"Usuń",notEnoughTribesSideOne:"Musisz dodać jakiekolwiek plemię do strony 1.",notEnoughTribesSideTwo:"Musisz dodać jakiekolwiek plemię do strony 2.",from:"Od",to:"Do",warStatsGenerator:"Generator statystyk wojennych",generateWarStats:"Wygeneruj statystyki wojenne",addTribe:"Dodaj plemię",devNote:"Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :)."},en_DK:{conquers:"Conquers",sideOne:"Side one",sideTwo:"Side two",difference:"Difference",tribeTag:"Tribe tag",delete:"Delete",notEnoughTribesSideOne:"Not enough tribes added to the side one.",notEnoughTribesSideTwo:"Not enough tribes added to the side two.",from:"From",to:"To",warStatsGenerator:"War stats generator",generateWarStats:"Generate war stats",addTribe:"Add tribe",devNote:"Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."}};var t=()=>e[window.game_data.locale]||e.en_DK;exports.default=t;
},{}],"DMkL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=()=>window.location.host.split(".")[0];exports.default=e;
},{}],"J1Ly":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").substr(0,2)};exports.default=e;
},{}],"gvXE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildVillageURL=exports.buildTribeURL=exports.buildPlayerURL=exports.buildURLToProfile=exports.buildURLToServerPage=exports.BASE_URL=void 0;const e="tribalwarshelp.com";exports.BASE_URL=e;const t=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(t,".").concat(e,"/server/").concat(o)};exports.buildURLToServerPage=t;const o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return"".concat(t(e,o),"/").concat(n,"/").concat(l)};exports.buildURLToProfile=o;const l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"player")};exports.buildPlayerURL=l;const n=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"tribe")};exports.buildTribeURL=n;const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return o(e,t,l,"village")};exports.buildVillageURL=i;
},{}],"chDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.POPUP_SELECTOR=void 0;const e=".popup_helper",t="#inline_popup";exports.POPUP_SELECTOR=t;var o=function(){let{e:e,title:o,html:n,id:l}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const p=document.querySelector(t);p&&(p.style.width="auto",p.style.maxWidth="1000px"),p.classList.contains("show")?(p.querySelector("#inline_popup_title").innerHTML=o,p.querySelector("#inline_popup_content").innerHTML=n):inlinePopup(e,l,null,{offset_x:0,offset_y:0},n,o);const i=document.querySelector(".popup_helper");i&&(i.style.width="auto",i.style.position="fixed",i.style.zIndex="50001")};exports.default=o;
},{}],"H9GS":[function(require,module,exports) {
"use strict";var e=c(require("./libs/requestCreator")),t=c(require("./i18n/warStatsGenerator")),n=c(require("./utils/getCurrentServer")),r=c(require("./utils/getServerVersionCode")),o=l(require("./utils/twhelp")),i=l(require("./utils/showPopup"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}return n.default=e,t&&t.set(e,n),n}function c(e){return e&&e.__esModule?e:{default:e}}const s=(0,n.default)(),d="sideOneAdd",u="sideOneInputs",b="sideTwoAdd",m="sideTwoInputs",p="to",v="from",f="warStatsResult",g="\n  query tribes($server: String!, $filter: TribeFilter) {\n    tribes(server: $server, filter: $filter) {\n      items {\n        id\n        tag\n      }\n    }\n  }\n",y="\n  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {\n    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {\n      total\n    }\n    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {\n      total\n    }\n  }\n",T=(0,t.default)(),w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;const n="\n    <div>\n      <h3>".concat(T.conquers,':</h3>\n      <p style="margin: 0;"><strong>').concat(T.sideOne,": ").concat(e,'</strong></p>\n      <p style="margin: 0;"><strong>').concat(T.sideTwo,": ").concat(t,'</strong></p>\n      <p style="margin: 0;"><strong>').concat(T.difference,": ").concat(Math.abs(e-t),'</strong></p>\n      <hr style="margin: 10px 0;" />\n    </div>\n  ');document.querySelector("#warStatsResult").innerHTML=n},E=e=>()=>{const t=document.createElement("div");t.innerHTML="\n        <label>".concat(T.tribeTag,': </label>\n        <input type="text" required />\n        <button type="button" class="btn">').concat(T.delete,"</button>\n    "),t.querySelector("button").addEventListener("click",()=>{t.remove()}),e.appendChild(t)},O=async t=>{t.preventDefault();const n=[],r=[];if(t.target.querySelectorAll("#".concat("sideOneInputs"," input")).forEach(e=>{e.value.trim()&&n.push(e.value.trim())}),t.target.querySelectorAll("#".concat("sideTwoInputs"," input")).forEach(e=>{e.value.trim()&&r.push(e.value.trim())}),console.log("sideOneTags",n,"sideTwoTags",r),0===n.length)return UI.ErrorMessage(T.notEnoughTribesSideOne);if(0===r.length)return UI.ErrorMessage(T.notEnoughTribesSideTwo);const o=document.querySelectorAll("".concat(i.POPUP_SELECTOR," form #").concat("from"," input"));let a;2===o.length&&o[0].value&&o[1].value&&(a=new Date("".concat(o[0].value,"T").concat(o[1].value,":00")));const l=document.querySelectorAll("".concat(i.POPUP_SELECTOR," form #").concat("to"," input"));let c;2===l.length&&l[0].value&&l[1].value&&(c=new Date("".concat(l[0].value,"T").concat(l[1].value,":00"))),t.target.querySelectorAll("button").forEach(e=>{e.disabled=!0});try{const{tribes:t}=await(0,e.default)({query:g,variables:{server:s,filter:{tag:[...n,...r]}}}),o=t.items.filter(e=>n.some(t=>e.tag===t)).map(e=>e.id),i=t.items.filter(e=>r.some(t=>e.tag===t)).map(e=>e.id),{sideOneEnnoblements:l,sideTwoEnnoblements:u}=await(0,e.default)({query:y,variables:{server:s,sideOneFilter:{newOwnerTribeID:o,oldOwnerTribeID:i,ennobledAtGTE:a,ennobledAtLTE:c},sideTwoFilter:{newOwnerTribeID:i,oldOwnerTribeID:o,ennobledAtGTE:a,ennobledAtLTE:c}}});console.log("sideOneEnnoblements",l,"sideTwoEnnoblements",u),w(l.total,u.total)}catch(d){console.log("handleFormSubmit",d)}t.target.querySelectorAll("button").forEach(e=>{e.disabled=!1})},h=e=>{const t='\n        <form>\n        <h1 style="margin-bottom: 0px; text-align: center;"><a href="'.concat(o.buildURLToServerPage((0,r.default)(s),s),'">TWHelp</a></h1>\n            <h3 style="margin-bottom: 10px; margin-top: 0;">').concat(T.devNote,'</h3>\n            <div id="').concat("warStatsResult",'">\n            </div>\n            <div style="margin-bottom: 10px;">\n              <div id="').concat("from",'">\n                <label>').concat(T.from,': </label>\n                <input type="date" required />\n                <input type="time" required />\n              </div>\n              <div id="').concat("to",'">\n                <label>').concat(T.to,': </label>\n                <input type="date" required />\n                <input type="time" required />\n              </div>\n            </div>\n            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;">\n                <div>\n                    <h3>').concat(T.sideOne,'</h3>\n                    <div id="').concat("sideOneInputs",'">\n                    </div>\n                    <button id="').concat("sideOneAdd",'" class="btn" type="button">').concat(T.addTribe,'</button>\n                </div>\n                <div style="margin: 0 5px;"></div>\n                <div>\n                    <h3>').concat(T.sideTwo,'</h3>\n                    <div id="').concat("sideTwoInputs",'">\n                    </div>\n                    <button id="').concat("sideTwoAdd",'" class="btn" type="button">').concat(T.addTribe,'</button>\n                </div>\n            </div>\n            <div style="text-align: center;">\n              <button class="btn" type="submit">').concat(T.generateWarStats,"</button>\n            </div>\n        </form>\n    ");(0,i.default)({title:T.warStatsGenerator,id:"warStats",html:t,e:e}),document.querySelector("".concat(i.POPUP_SELECTOR," form #").concat("sideOneAdd")).addEventListener("click",E(document.querySelector("#sideOneInputs"))),document.querySelector("".concat(i.POPUP_SELECTOR," form #").concat("sideTwoAdd")).addEventListener("click",E(document.querySelector("#sideTwoInputs"))),document.querySelector("".concat(i.POPUP_SELECTOR," form")).addEventListener("submit",O)},S=()=>{const e=document.createElement("div"),t=document.createElement("button");t.innerHTML=T.generateWarStats,t.addEventListener("click",h),e.appendChild(t),document.querySelector("#wars_ranking_table").parentElement.prepend(e)};!function(){try{S()}catch(e){console.log("war stats",e)}}();
},{"./libs/requestCreator":"Ph2E","./i18n/warStatsGenerator":"vPH5","./utils/getCurrentServer":"DMkL","./utils/getServerVersionCode":"J1Ly","./utils/twhelp":"gvXE","./utils/showPopup":"chDM"}]},{},["H9GS"], null)