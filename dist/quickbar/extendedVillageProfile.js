!function(){const e="https://api.tribalwarshelp.com/graphql";var t=function(){let{query:t,variables:n={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:t,variables:n}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{let{data:t,errors:n}=e;if(n&&Array.isArray(n)&&n.length>0)throw new Error(n[0].message);return new Promise((e=>e(t)))}))};const n={pl_PL:{loaded:"Załadowano",pop:"Populacja",mySupport:"Moje wsparcie",allySupport:"Wsparcie plemienia",total:"Łącznie",possibleLoyalty:"Prawdopodobne poparcie",ennobledAt:"Podbita o",never:"Nigdy",action:{linkToTWHelp:"Akta wioski (TWHelp)",showEnnoblements:"Pokaż przejęcia",countIncomingSupport:"Policz nadchodzące wsparcie"}},en_DK:{loaded:"Loaded",pop:"Pop",mySupport:"My support",allySupport:"Ally support",total:"Total",possibleLoyalty:"Possible loyalty",never:"Never",ennobledAt:"Ennobled at",action:{linkToTWHelp:"Village file (TWHelp)",showEnnoblements:"Show ennoblements",countIncomingSupport:"Count incoming support"}},de_DE:{loaded:"Geladen",pop:"Pop",mySupport:"Meine Unterstützung",allySupport:"Verbündete Unterstützung",total:"Total",possibleLoyalty:"Mögliche Zustimmung",never:"Niemals",ennobledAt:"Geadelt am",action:{linkToTWHelp:"Dorfakte (TWHelp)",showEnnoblements:"Zeige Adelungen",countIncomingSupport:"Zähle ankommende Unterstützung"}}};const o="data-page",r=(e,t)=>{if("number"!=typeof e)throw new Error("Expected number as the first argument");if("number"!=typeof t)throw new Error("Expected number as the second argument");return e>0?Math.ceil(e/t):1},a=function(){let{total:e,limit:t,marginRight:n=3,currentPage:a=0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const i=r(e,t),l=[];for(let e=1;e<=i;e++)e===a?l.push('<strong style="margin-right: '.concat(n,'px">>').concat(e,"<</strong>")):l.push('<a style="margin-right: '.concat(n,'px" href="#" ').concat(o,'="').concat(e,'">').concat(e,"</a>"));return l};const i=e=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:e}),l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const o="K"+String(n)[0]+String(t)[0];return"".concat(e," (").concat(t,"|").concat(n,") ").concat(o)};var c=e=>{return t="unit/unit_".concat(e,".png"),image_base+t;var t};const s=(e,t)=>new Date(e).toLocaleDateString(void 0,t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});var d=e=>new Promise((t=>setTimeout(t,e)));const p=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};function u(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function g(e){u(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function h(e,t){u(2,arguments);var n=g(e),o=g(t);return n.getTime()-o.getTime()}const m=(e,t)=>{let n=25+Math.abs(function(e,t){u(2,arguments);var n=h(e,t)/6e4;return n>0?Math.floor(n):Math.ceil(n)}(e,new Date))*(t/60);return n>100&&(n=100),Math.floor(n)};const b="tribalwarshelp.com",f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(e,".").concat(b,"/server/").concat(t)},y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return"".concat(f(e,t),"/").concat(o,"/").concat(n)},w={pl_PL:{date:"Data",newOwner:"Nowy właściciel",oldOwner:"Poprzedni właściciel",village:"Wioska",title:"Przejęcia"},en_DK:{date:"Date",newOwner:"New owner",oldOwner:"Old owner",village:"Village",title:"Ennoblements"},de_DE:{date:"Datum",newOwner:"Neuer Besitzer",oldOwner:"Alter Besitzer",village:"Dorf",title:"Adelungen"}};const v=".popup_box",S=function(){let{html:e,id:t,title:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Dialog.show(t,"<h3>".concat(n,"</h3>")+e);const o=document.querySelector(v);o&&(o.style.width="auto",o.style.maxWidth="1000px")},E="ennoblementsPagination",O=w[window.game_data.locale]||w.en_DK,T=(e,t)=>{return e?'<td><a href="'.concat((n=e.id,window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:n})),'">').concat(e.name," (").concat(t?'<a href="'.concat((e=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:e}))(t.id),'">').concat(t.tag,"</a>"):"-",")</a></td>"):"<td>-</td>";var n};function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){j(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const A=window.location.host.split(".")[0],_=(L=window.location.search,parseInt(new URLSearchParams(L).get("id")));var L;const k="kiszkowaty_extended_village_profile_server_cfg",x=document.querySelector("#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody"),q=document.querySelector("#content_value table.vis tbody");let M={};const $=n[window.game_data.locale]||n.en_DK,C=()=>function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=localStorage.getItem(e);let o=t;return n&&(o=JSON.parse(n)),o}(k),I=async()=>{let e=C();var n;return e.server&&(n=new Date(e.loadedAt),!(Math.abs(n.getTime()-(new Date).getTime())>864e5))&&e.server.unitConfig&&e.server.config||(e=await t({query:"\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n              speed\n            }\n            unitConfig {\n              spear {\n                pop\n              }\n              sword {\n                pop\n              }\n              axe {\n                pop\n              }\n              archer {\n                pop\n              }\n              spy {\n                pop\n              }\n              light {\n                pop\n              }\n              marcher {\n                pop\n              }\n              heavy {\n                pop\n              }\n              ram {\n                pop\n              }\n              catapult {\n                pop\n              }\n              knight {\n                pop\n              }\n              snob {\n                pop\n              }\n            }\n        }\n    }\n",variables:{key:A}}),e.loadedAt=new Date,function(){p(k,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}(e)),e.server},H=async e=>{e.preventDefault();const n=!(r=e.target)instanceof HTMLElement?0:parseInt(r.getAttribute(o));var r;if(!isNaN(n)){!function(e,t){let{limit:n=0,currentPage:o=1,onPageChange:r=(()=>{})}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const c=a({total:t.total,limit:n,currentPage:o}),d='\n    <div style="'.concat("display: flex; flex-direction: row; flex-wrap: wrap;",'" id="').concat(E,'">\n      ').concat(c.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(O.date,"\n          </th>\n          <th>\n            ").concat(O.village,"\n          </th>\n          <th>\n            ").concat(O.newOwner,"\n          </th>\n          <th>\n            ").concat(O.oldOwner,"\n          </th>\n        </tr>\n        ").concat(t.items.map((e=>{let t="<tr>"+"<td>".concat(s(e.ennobledAt),"</td>");return e.village?t+='<td><a href="'.concat(i(e.village.id),'">').concat(l(e.village.name,e.village.x,e.village.y),"</a></td>"):t+="<td>-</td>",t+=T(e.newOwner,e.newOwnerTribe),t+=T(e.oldOwner,e.oldOwnerTribe),t+"</tr>"})).join(""),"\n      </tbody>\n    </table>\n  ");S({e:e,title:O.title,id:"ennoblements",html:d}),document.querySelectorAll("#ennoblementsPagination a").forEach((e=>{e.addEventListener("click",r)}))}(e,(await t({query:"\n    query ennoblements($server: String!, $offset: Int, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n",variables:{filter:{villageID:[_]},offset:15*(n-1),limit:15,sort:["ennobledAt DESC"],server:A}})).ennoblements,{currentPage:n,limit:15,onPageChange:H})}},N=e=>{const t=[];let n=0;for(let o in e)n+=e[o]*M.unitConfig[o].pop,t.push("<td>".concat(e[o].toLocaleString(),"</td>"));return t.push("<td><strong>".concat(n.toLocaleString(),"</strong></td>")),t},W=async e=>{e.preventDefault();const t=[],n={};document.querySelectorAll('span.command_hover_details[data-command-type="support"]').forEach((e=>{const o=parseInt(e.getAttribute("data-command-id"));e.classList.contains("commandicon-ally")?n[o]=!0:n[o]=!1,t.push(o)}));const o={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0},r=P({},o),a=P({},o);for(let e=0;e<t.length;e++){Dialog.show("incomingSupport","".concat($.loaded,": <strong>").concat(e," / ").concat(t.length,"</strong>"));const i=t[e],l=TribalWars.buildURL("",{screen:"info_command",ajax:"details",id:i});try{const e=await fetch(l),{units:t}=await e.json();if(t)for(let e in o){const l=parseInt(t[e].count);n[i]?r[e]+=l:o[e]+=l,a[e]+=l}await d(200)}catch(e){console.log("count incoming support",e)}}const i=["<th></th>"];for(let e in o)i.push('<th><img src="'.concat(c(e),'" /></th>'));i.push("<th>".concat($.pop,"</th>"));const l=["<th>".concat($.mySupport,"</th>"),...N(o)],s=["<th>".concat($.allySupport,"</th>"),...N(r)],p=["<th>".concat($.total,"</th>"),...N(a)];Dialog.show("incomingSupport",'\n    <table class="vis" style="width: 100%;">\n      <tbody>\n          <tr>\n            '.concat(i.join(""),"\n          </tr>\n          <tr>\n            ").concat(l.join(""),"\n          </tr>\n          <tr>\n            ").concat(s.join(""),"\n          </tr>\n          <tr>\n            ").concat(p.join(""),"\n          </tr>\n      </tbody>\n    </table>\n  "));const u=document.querySelector(".popup_box");u&&(u.style.width="auto",u.style.maxWidth="900px")},z=e=>{const t=document.createElement("td");t.colSpan="2",t.append(e);const n=document.createElement("tr");return n.appendChild(t),n},U=()=>{const e=document.createElement("a");e.href=function(){return y(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,"village")}(function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").substr(0,2)}(A),A,_),e.innerHTML=$.action.linkToTWHelp,x.appendChild(z(e));const t=document.createElement("a");t.href="#",function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(!e instanceof HTMLElement)throw new Error("Expected HTMLElement as the first argument");if(t=parseInt(t),"number"!=typeof t||isNaN(t))throw new Error("Expected number or string as the second argument");e.setAttribute(o,t+"")}(t,"1"),t.innerHTML=$.action.showEnnoblements,t.addEventListener("click",H),x.appendChild(z(t));const n=document.createElement("a");n.href="#",n.innerHTML=$.action.countIncomingSupport,n.addEventListener("click",W),x.appendChild(z(n))},R=e=>{let{title:t,data:n,id:o}=e,r=document.querySelector("#"+o);r||(r=document.createElement("tr"),r.id=o,r.appendChild(document.createElement("td")),r.appendChild(document.createElement("td")),q.append(r)),r.children[0].innerHTML=t,r.children[1].innerHTML=n},K=()=>{const e=document.querySelectorAll("#content_value > div tbody tr"),t=[];if(0===e.length)throw new Error;e[0].querySelectorAll(".unit_link").forEach((()=>{t.push(0)}));for(let n=1;n<e.length;n++){e[n].querySelectorAll(".unit-item").forEach(((e,n)=>{t[n]+=parseInt(e.innerHTML)}))}return t};!async function(){try{const e=await(async()=>await t({query:"\n    query ennoblements($server: String!, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n        ennoblements(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n",variables:{server:A,filter:{villageID:[_]},sort:["ennobledAt DESC"],limit:1}}))();M=await I(),function(){let{config:e,ennoblements:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=t&&Array.isArray(t.items)&&t.items[0]?t.items[0]:void 0;R({id:"loyalty",title:"".concat($.possibleLoyalty,":"),data:n?m(new Date(n.ennobledAt),e.speed):100}),R({id:"ennobledAt",title:"".concat($.ennobledAt,":"),data:n?s(n.ennobledAt):$.never});try{const e=K(),t=document.createElement("tr");t.style.textAlign="center",t.style.fontWeight="bold",t.appendChild(document.createElement("td")),e.forEach((e=>{const n=document.createElement("td");n.innerHTML=e,t.appendChild(n)})),document.querySelector("#content_value > div tbody").appendChild(t)}catch(e){}}({config:M.config,ennoblements:e.ennoblements}),U()}catch(e){console.log("extended village profile",e)}}()}();