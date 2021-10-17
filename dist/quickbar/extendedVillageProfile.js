!function(){function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),o.forEach((function(n){e(t,n,r[n])}))}return t}var n=({query:e,variables:t={}}={})=>fetch("https://api.tribalwarshelp.com/graphql",{method:"POST",body:JSON.stringify({query:e,variables:t}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((({data:e,errors:t})=>{if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise((t=>t(e)))}));const r={pl_PL:{loaded:"Załadowano",pop:"Populacja",mySupport:"Moje wsparcie",allySupport:"Wsparcie plemienia",total:"Łącznie",possibleLoyalty:"Prawdopodobne poparcie",ennobledAt:"Podbita o",never:"Nigdy",action:{linkToTWHelp:"Akta wioski (TWHelp)",showEnnoblements:"Pokaż przejęcia",countIncomingSupport:"Policz nadchodzące wsparcie"}},en_DK:{loaded:"Loaded",pop:"Pop",mySupport:"My support",allySupport:"Ally support",total:"Total",possibleLoyalty:"Possible loyalty",never:"Never",ennobledAt:"Ennobled at",action:{linkToTWHelp:"Village file (TWHelp)",showEnnoblements:"Show ennoblements",countIncomingSupport:"Count incoming support"}},de_DE:{loaded:"Geladen",pop:"Pop",mySupport:"Meine Unterstützung",allySupport:"Verbündete Unterstützung",total:"Total",possibleLoyalty:"Mögliche Zustimmung",never:"Niemals",ennobledAt:"Geadelt am",action:{linkToTWHelp:"Dorfakte (TWHelp)",showEnnoblements:"Zeige Adelungen",countIncomingSupport:"Zähle ankommende Unterstützung"}}};const o="data-page",a=({total:e,limit:t,marginRight:n=3,currentPage:r=0}={})=>{const o=((e,t)=>{if("number"!=typeof e)throw new Error("Expected number as the first argument");if("number"!=typeof t)throw new Error("Expected number as the second argument");return e>0?Math.ceil(e/t):1})(e,t),a=[];for(let e=1;e<=o;e++)e===r?a.push(`<strong style="margin-right: ${n}px">>${e}<</strong>`):a.push(`<a style="margin-right: ${n}px" href="#" data-page="${e}">${e}</a>`);return a};var i=e=>image_base+`unit/unit_${e}.png`;const l=(e,t)=>new Date(e).toLocaleDateString(void 0,t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});var s=e=>new Promise((t=>setTimeout(t,e)));function c(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function d(e){c(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function p(e,t){c(2,arguments);var n=d(e),r=d(t);return n.getTime()-r.getTime()}var u=(e,t)=>{let n=25+Math.abs(function(e,t){c(2,arguments);var n=p(e,t)/6e4;return n>0?Math.floor(n):Math.ceil(n)}(e,new Date))*(t/60);return n>100&&(n=100),Math.floor(n)};const m=(e="",t="",n=0,r="")=>`${((e="",t="")=>`https://${e}.tribalwarshelp.com/server/${t}`)(e,t)}/${r}/${n}`,g={pl_PL:{date:"Data",newOwner:"Nowy właściciel",oldOwner:"Poprzedni właściciel",village:"Wioska",title:"Przejęcia"},en_DK:{date:"Date",newOwner:"New owner",oldOwner:"Old owner",village:"Village",title:"Ennoblements"},de_DE:{date:"Datum",newOwner:"Neuer Besitzer",oldOwner:"Alter Besitzer",village:"Dorf",title:"Adelungen"}};var h=({html:e,id:t,title:n}={})=>{Dialog.show(t,`<h3>${n}</h3>`+e);const r=document.querySelector(".popup_box");r&&(r.style.width="auto",r.style.maxWidth="1000px")};const b=g[window.game_data.locale]||g.en_DK,y=(e,t)=>{return e?`<td><a href="${n=e.id,window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:n})}">${e.name} (${t?`<a href="${(e=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:e}))(t.id)}">${t.tag}</a>`:"-"})</a></td>`:"<td>-</td>";var n};var w=(e,t,{limit:n=0,currentPage:r=1,onPageChange:o=(()=>{})}={})=>{const i=`\n    <div style="display: flex; flex-direction: row; flex-wrap: wrap;" id="ennoblementsPagination">\n      ${a({total:t.total,limit:n,currentPage:r}).join("")}\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ${b.date}\n          </th>\n          <th>\n            ${b.village}\n          </th>\n          <th>\n            ${b.newOwner}\n          </th>\n          <th>\n            ${b.oldOwner}\n          </th>\n        </tr>\n        ${t.items.map((e=>{let t=`<tr><td>${l(e.ennobledAt)}</td>`;var n;return e.village?t+=`<td><a href="${n=e.village.id,window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:n})}">${((e="",t=500,n=500)=>`${e} (${t}|${n}) ${"K"+String(n)[0]+String(t)[0]}`)(e.village.name,e.village.x,e.village.y)}</a></td>`:t+="<td>-</td>",t+=y(e.newOwner,e.newOwnerTribe),t+=y(e.oldOwner,e.oldOwnerTribe),t+"</tr>"})).join("")}\n      </tbody>\n    </table>\n  `;h({e:e,title:b.title,id:"ennoblements",html:i}),document.querySelectorAll("#ennoblementsPagination a").forEach((e=>{e.addEventListener("click",o)}))};const f=window.location.host.split(".")[0],v=($=window.location.search,parseInt(new URLSearchParams($).get("id")));var $;const S="kiszkowaty_extended_village_profile_server_cfg",E=document.querySelector("#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody"),T=document.querySelector("#content_value table.vis tbody");let D={};const A=r[window.game_data.locale]||r.en_DK,O=()=>((e,t={})=>{const n=localStorage.getItem(e);let r=t;return n&&(r=JSON.parse(n)),r})(S),_=(e={})=>{var t,n;t=S,n=e,localStorage.setItem(t,JSON.stringify(n))},L=async()=>{let e=O();var t;return e.server&&(t=new Date(e.loadedAt),!(Math.abs(t.getTime()-(new Date).getTime())>864e5))&&e.server.unitConfig&&e.server.config||(e=await n({query:"\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n              speed\n            }\n            unitConfig {\n              spear {\n                pop\n              }\n              sword {\n                pop\n              }\n              axe {\n                pop\n              }\n              archer {\n                pop\n              }\n              spy {\n                pop\n              }\n              light {\n                pop\n              }\n              marcher {\n                pop\n              }\n              heavy {\n                pop\n              }\n              ram {\n                pop\n              }\n              catapult {\n                pop\n              }\n              knight {\n                pop\n              }\n              snob {\n                pop\n              }\n            }\n        }\n    }\n",variables:{key:f}}),e.loadedAt=new Date,_(e)),e.server},P=async e=>{e.preventDefault();const t=!(r=e.target)instanceof HTMLElement?0:parseInt(r.getAttribute(o));var r;if(!isNaN(t)){const r=await n({query:"\n    query ennoblements($server: String!, $offset: Int, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n",variables:{filter:{villageID:[v]},offset:15*(t-1),limit:15,sort:["ennobledAt DESC"],server:f}});w(e,r.ennoblements,{currentPage:t,limit:15,onPageChange:P})}},j=e=>{const t=[];let n=0;for(let r in e)n+=e[r]*D.unitConfig[r].pop,t.push(`<td>${e[r].toLocaleString()}</td>`);return t.push(`<td><strong>${n.toLocaleString()}</strong></td>`),t},k=async e=>{e.preventDefault();const n=[],r={};document.querySelectorAll('span.command_hover_details[data-command-type="support"]').forEach((e=>{const t=parseInt(e.getAttribute("data-command-id"));e.classList.contains("commandicon-ally")?r[t]=!0:r[t]=!1,n.push(t)}));const o={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0},a=t({},o),l=t({},o);for(let e=0;e<n.length;e++){Dialog.show("incomingSupport",`${A.loaded}: <strong>${e} / ${n.length}</strong>`);const t=n[e],i=TribalWars.buildURL("",{screen:"info_command",ajax:"details",id:t});try{const e=await fetch(i),{units:n}=await e.json();if(n)for(let e in o){const i=parseInt(n[e].count);r[t]?a[e]+=i:o[e]+=i,l[e]+=i}await s(200)}catch(e){console.log("count incoming support",e)}}const c=["<th></th>"];for(let e in o)c.push(`<th><img src="${i(e)}" /></th>`);c.push(`<th>${A.pop}</th>`);const d=[`<th>${A.mySupport}</th>`,...j(o)],p=[`<th>${A.allySupport}</th>`,...j(a)],u=[`<th>${A.total}</th>`,...j(l)];Dialog.show("incomingSupport",`\n    <table class="vis" style="width: 100%;">\n      <tbody>\n          <tr>\n            ${c.join("")}\n          </tr>\n          <tr>\n            ${d.join("")}\n          </tr>\n          <tr>\n            ${p.join("")}\n          </tr>\n          <tr>\n            ${u.join("")}\n          </tr>\n      </tbody>\n    </table>\n  `);const m=document.querySelector(".popup_box");m&&(m.style.width="auto",m.style.maxWidth="900px")},x=e=>{const t=document.createElement("td");t.colSpan="2",t.append(e);const n=document.createElement("tr");return n.appendChild(t),n},q=()=>{const e=document.createElement("a");e.href=((e="",t="",n=0)=>m(e,t,n,"village"))(((e="")=>e.substr(0,2))(f),f,v),e.innerHTML=A.action.linkToTWHelp,E.appendChild(x(e));const t=document.createElement("a");t.href="#",((e,t=1)=>{if(!e instanceof HTMLElement)throw new Error("Expected HTMLElement as the first argument");if("number"!=typeof(t=parseInt(t))||isNaN(t))throw new Error("Expected number or string as the second argument");e.setAttribute(o,t+"")})(t,"1"),t.innerHTML=A.action.showEnnoblements,t.addEventListener("click",P),E.appendChild(x(t));const n=document.createElement("a");n.href="#",n.innerHTML=A.action.countIncomingSupport,n.addEventListener("click",k),E.appendChild(x(n))},M=({title:e,data:t,id:n})=>{let r=document.querySelector("#"+n);r||(r=document.createElement("tr"),r.id=n,r.appendChild(document.createElement("td")),r.appendChild(document.createElement("td")),T.append(r)),r.children[0].innerHTML=e,r.children[1].innerHTML=t},C=({config:e,ennoblements:t}={})=>{const n=t&&Array.isArray(t.items)&&t.items[0]?t.items[0]:void 0;M({id:"loyalty",title:`${A.possibleLoyalty}:`,data:n?u(new Date(n.ennobledAt),e.speed):100}),M({id:"ennobledAt",title:`${A.ennobledAt}:`,data:n?l(n.ennobledAt):A.never});try{const e=(()=>{const e=document.querySelectorAll("#content_value > div tbody tr"),t=[];if(0===e.length)throw new Error;e[0].querySelectorAll(".unit_link").forEach((()=>{t.push(0)}));for(let n=1;n<e.length;n++)e[n].querySelectorAll(".unit-item").forEach(((e,n)=>{t[n]+=parseInt(e.innerHTML)}));return t})(),t=document.createElement("tr");t.style.textAlign="center",t.style.fontWeight="bold",t.appendChild(document.createElement("td")),e.forEach((e=>{const n=document.createElement("td");n.innerHTML=e,t.appendChild(n)})),document.querySelector("#content_value > div tbody").appendChild(t)}catch(e){}};!async function(){try{const e=await(async()=>await n({query:"\n    query ennoblements($server: String!, $limit: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n        ennoblements(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n",variables:{server:f,filter:{villageID:[v]},sort:["ennobledAt DESC"],limit:1}}))();D=await L(),C({config:D.config,ennoblements:e.ennoblements}),q()}catch(e){console.log("extended village profile",e)}}()}();