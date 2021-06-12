!function(){function e(e){if(null===e||!0===e||!1===e)return NaN;var n=Number(e);return isNaN(n)?n:n<0?Math.ceil(n):Math.floor(n)}function n(e,n){if(n.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+n.length+" present")}function t(e){n(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function o(o,r){n(2,arguments);var a=t(o).getTime(),i=e(r);return new Date(a+i)}const r={pl_PL:{ennobledAt:"Podbita o",never:"Nigdy",possibleLoyalty:"Prawdopodobne poparcie",canSendNoble:"Można wysłać szlachcica",yes:"Tak",no:"Nie"},en_DK:{ennobledAt:"Ennobled at",never:"Never",possibleLoyalty:"Possible loyalty",canSendNoble:"Can send noble",yes:"Yes",no:"No"},de_DE:{ennobledAt:"Adelung bei",never:"Nie",possibleLoyalty:"Mögliche Zustimmung",canSendNoble:"Kann Adelsgeschlecht senden",yes:"Ja",no:"Nein"}};const a="https://api.tribalwarshelp.com/graphql";var i=function(){let{query:e,variables:n={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(a,{method:"POST",body:JSON.stringify({query:e,variables:n}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{let{data:n,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise((e=>e(n)))}))};const l=(e,n)=>new Date(e).toLocaleDateString(void 0,n||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});var s=e=>{return n="unit/unit_".concat(e,".png"),image_base+n;var n};const c=(e,n)=>{localStorage.setItem(e,JSON.stringify(n))};function p(e,o){n(2,arguments);var r=t(e),a=t(o);return r.getTime()-a.getTime()}const d=(e,t)=>{let o=25+Math.abs(function(e,t){n(2,arguments);var o=p(e,t)/6e4;return o>0?Math.floor(o):Math.ceil(o)}(e,new Date))*(t/60);return o>100&&(o=100),Math.floor(o)};function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function g(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){y(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function y(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}const b=window.location.host.split(".")[0],m="\n    query ennoblements($server: String!, $filter: EnnoblementFilter!, $sort: [String!], $limit: Int) {\n        ennoblements(server: $server, filter: $filter, sort: $sort, limit: $limit) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n",f="kiszkowaty_extended_map_popup_server_cfg",h=r[window.game_data.locale]||r.en_DK,v=()=>function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=localStorage.getItem(e);let o=n;return t&&(o=JSON.parse(t)),o}(f),w=async()=>{let e=v();var n;return e&&e.server&&(n=new Date(e.loadedAt),!(Math.abs(n.getTime()-(new Date).getTime())>864e5))&&e.server.config&&e.server.config.speed&&e.server.config.snob&&e.server.config.snob.maxDist&&e.server.config.unitSpeed&&e.server.unitConfig||(e=await i({query:"\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n                speed\n                unitSpeed\n                snob {\n                  maxDist\n                }\n            }\n            unitConfig {\n              spear {\n                speed\n              }\n              sword {\n                speed\n              }\n              axe {\n                speed\n              }\n              archer {\n                speed\n              }\n              spy {\n                speed\n              }\n              light {\n                speed\n              }\n              marcher {\n                speed\n              }\n              heavy {\n                speed\n              }\n              ram {\n                speed\n              }\n              catapult {\n                speed\n              }\n              knight {\n                speed\n              }\n              snob {\n                speed\n              }\n            }\n        }\n    }\n",variables:{key:b}}),e.loadedAt=new Date,function(){c(f,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}(e)),e&&e.server&&e.server.config?{config:e.server.config,unitConfig:e.server.unitConfig}:{}},M=async function(e){let{cacheOnly:n=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n||TWMap.popup.extendedMapPopupCache[e])return TWMap.popup.extendedMapPopupCache[e];try{const n=await i({query:m,variables:{server:b,sort:["ennobledAt DESC"],filter:{villageID:[e]},limit:1}});return TWMap.popup.extendedMapPopupCache[e]=n,n}catch(e){console.log("loadVillageData",e)}},S=e=>e%2==0?"#f8f4e8":"#ded3b9;",T=(e,n)=>'\n    <td style="padding: 2px; background-color: '.concat(S(n),';">\n      <img\n        src="').concat(e.img,'"\n        title="').concat(e.name,'"\n        alt="').concat(e.name,'"\n      />\n    </td>\n  '),D=(t,r)=>'\n    <td style="padding: 2px; background-color: '.concat(S(r),';">\n      ').concat(l(function(t,r){n(2,arguments);var a=e(r);return o(t,6e4*a)}(Timing.getCurrentServerTime(),t)),"\n    </td>\n  "),O=(e,n,t)=>{let{config:o,unitConfig:r}=t;const a=TWMap.CoordByXY(TWMap.villageKey[e]),i=((e,n,t,o)=>{const r=e-t,a=n-o;return Math.sqrt(r*r+a*a)})(a[0],a[1],window.game_data.village.x,window.game_data.village.y),c=n&&n.ennoblements&&n.ennoblements.items&&n.ennoblements.items.length>0?n.ennoblements.items[0]:void 0,p=document.querySelector("#map_popup #info_content tbody");let u=p.querySelector("#units");u||(u=document.createElement("tr"),u.id="units",p.appendChild(u));const y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=[];for(let t in e)0!==e[t].speed&&n.push(g(g({},e[t]),{},{name:t,img:s(t)}));return n}(r);u.innerHTML='\n          <td colspan="2">\n            <table style="border: 1px solid #ded3b9; max-width: 450px;"\n              width="100%"\n              cellpadding="0"\n              cellspacing="0">\n              <tbody>\n                <tr class="center">\n                  '.concat(y.map(T).join(""),'\n                </tr>\n                <tr class="center">\n                  ').concat(y.map(((e,n)=>D(((e,n)=>Math.round(e*n))(i,e.speed),n))).join(""),"\n                </tr>\n              </tbody>\n            </table>\n          </td>\n      ");let b=p.querySelector("#lastEnnobledAt");b||(b=document.createElement("tr"),b.id="lastEnnobledAt",p.appendChild(b)),b.innerHTML="\n          <td>\n              ".concat(h.ennobledAt,":\n          </td>\n          <td>\n              ").concat(c?l(c.ennobledAt):h.never,"\n          </td>\n      ");let m=p.querySelector("#loyalty");m||(m=document.createElement("tr"),m.id="loyalty",p.appendChild(m)),m.innerHTML="\n          <td>\n              ".concat(h.possibleLoyalty,":\n          </td>\n          <td>\n              ").concat(c?d(new Date(c.ennobledAt),o.speed):100,"\n          </td>\n      ");let f=p.querySelector("#canSendNoble");f||(f=document.createElement("tr"),f.id="canSendNoble",p.appendChild(f)),f.innerHTML="\n          <td>\n              ".concat(h.canSendNoble,":\n          </td>\n          <td>\n              ").concat(i<o.snob.maxDist?h.yes:h.no,"\n          </td>\n      ")};!async function(){try{const n=await w();TWMap.popup.extendedMapPopupCache={},TWMap.popup._loadVillage=TWMap.popup.loadVillage,TWMap.popup.loadVillage=(e=n,async n=>{TWMap.popup._loadVillage(n);const t=await M(parseInt(n));O(parseInt(n),t,e)}),TWMap.popup._displayForVillage=TWMap.popup.displayForVillage,TWMap.popup.displayForVillage=(e=>async(n,t,o)=>{TWMap.popup._displayForVillage(n,t,o);const r=await M(parseInt(n.id),{cacheOnly:window.game_data.features.Premium.active});O(parseInt(n.id),r,e)})(n)}catch(e){console.log("extended map popup",e)}var e}()}();