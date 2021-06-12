!function(){function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function a(n){t(1,arguments);var a=e(n);return a.setHours(0,0,0,0),a}var r=864e5;function o(e,o){t(2,arguments);var i=a(e),l=a(o),c=i.getTime()-n(i),s=l.getTime()-n(l);return Math.round((c-s)/r)}function i(t,e){var n=t.getFullYear()-e.getFullYear()||t.getMonth()-e.getMonth()||t.getDate()-e.getDate()||t.getHours()-e.getHours()||t.getMinutes()-e.getMinutes()||t.getSeconds()-e.getSeconds()||t.getMilliseconds()-e.getMilliseconds();return n<0?-1:n>0?1:n}function l(n,a){t(2,arguments);var r=e(n),l=e(a),c=i(r,l),s=Math.abs(o(r,l));r.setDate(r.getDate()-c*s);var d=Number(i(r,l)===-c),g=c*(s-d);return 0===g?0:g}const c={pl_PL:{date:"Data",createdAt:"Data założenia",dominance:"Dominacja",bestRank:"Najlepszy ranking",mostPoints:"Najwięcej punktów",mostVillages:"Najwięcej wiosek",player:"Gracz",points:"Punkty",villages:"Wioski",opponentsDefeated:"Pokonani przeciwnicy",opponentsDefeatedAsAttacker:"Pokonani przeciwnicy jako agresor",opponentsDefeatedAsDefender:"Pokonani przeciwnicy jako obrońca",opponentsDefeatedAsSupporter:"Pokonani przeciwnicy jako wspierający",change:"Zmień",left:"Opuścił",joined:"Dołączył",tribeChanges:"Zmiany plemion",membersGrowth:"Rozwój graczy",act:"Akcja",total:"Razem",oda:"RA",odd:"RO",ods:"RW",od:"Pokonani ogólnie",dailyGrowth:"Dzienny przyrost",playerLinks:"Linki",action:{linkToTWHelp:"Akta plemienia (TWHelp)",showTribeChanges:"Pokaż zmiany plemion",showEnnoblements:"Pokaż przejęcia",showMembersGrowth:"Pokaż rozwój graczy",showHistory:"Pokaż historię",generateMailingList:"Wygeneruj listę mailingową",exportVillages:"Wyeksportuj wioski"}},en_DK:{date:"Date",createdAt:"Created at",dominance:"Dominance",bestRank:"Best rank",mostPoints:"Most points",mostVillages:"Most villages",player:"Player",points:"Points",villages:"Villages",opponentsDefeated:"Opponents defeated",opponentsDefeatedAsAttacker:"Opponents defeated as attacker",opponentsDefeatedAsDefender:"Opponents defeated as defender",opponentsDefeatedAsSupporter:"Opponents defeated as supporter",change:"Change",membersGrowth:"Members growth",tribeChanges:"Tribe changes",left:"Left",joined:"Joined",act:"Action",total:"Total",oda:"ODA",odd:"ODD",ods:"ODS",od:"OD",dailyGrowth:"Daily growth",playerLinks:"Player links",action:{linkToTWHelp:"Tribal file (TWHelp)",showTribeChanges:"Show tribe changes",showEnnoblements:"Show ennoblements",showMembersGrowth:"Show members growth",showHistory:"Show history",generateMailingList:"Generate mailing list",exportVillages:"Export villages"}},de_DE:{date:"Datum",createdAt:"Erstellt am",dominance:"Dominanz",bestRank:"Bester Rang",mostPoints:"Meiste Punkte",mostVillages:"Meiste Dörfer",player:"Spieler",points:"Punkte",villages:"Dörfer",opponentsDefeated:"Besiegte Gegner",opponentsDefeatedAsAttacker:"Besiegte Gegner als Angreifer",opponentsDefeatedAsDefender:"Besiegte Gegner als Verteidiger",opponentsDefeatedAsSupporter:"Besiegte Gegner als Unterstützer",change:"Änderungen",membersGrowth:"Mitglieder Wachstum",tribeChanges:"Stammeswechsel",left:"Verlassen",joined:"Beigetreten",act:"Aktion",total:"Total",oda:"BGA",odd:"BGV",ods:"BGS",od:"BP",dailyGrowth:"Tägl. Wachstum",playerLinks:"Spieler Links",action:{linkToTWHelp:"Stammesakte (TWHelp)",showTribeChanges:"Zeige Stammeswechsel",showEnnoblements:"Zeige Adelungen",showMembersGrowth:"Zeige Mitglieder-Wachstum",showHistory:"Zeige Verlauf",generateMailingList:"Maillisten-Generator",exportVillages:"Dörfer exportieren"}}};const s="https://api.tribalwarshelp.com/graphql";var d=function(){let{query:t,variables:e={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(s,{method:"POST",body:JSON.stringify({query:t,variables:e}),headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((t=>{let{data:e,errors:n}=t;if(n&&Array.isArray(n)&&n.length>0)throw new Error(n[0].message);return new Promise((t=>t(e)))}))};const g="data-page",p=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(!t instanceof HTMLElement)throw new Error("Expected HTMLElement as the first argument");if(e=parseInt(e),"number"!=typeof e||isNaN(e))throw new Error("Expected number or string as the second argument");t.setAttribute(g,e+"")},m=t=>!t instanceof HTMLElement?0:parseInt(t.getAttribute(g)),u=(t,e)=>{if("number"!=typeof t)throw new Error("Expected number as the first argument");if("number"!=typeof e)throw new Error("Expected number as the second argument");return t>0?Math.ceil(t/e):1},h=function(){let{total:t,limit:e,marginRight:n=3,currentPage:a=0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=u(t,e),o=[];for(let t=1;t<=r;t++)t===a?o.push('<strong style="margin-right: '.concat(n,'px">>').concat(t,"<</strong>")):o.push('<a style="margin-right: '.concat(n,'px" href="#" ').concat(g,'="').concat(t,'">').concat(t,"</a>"));return o},b={pl_PL:{title:"Dzisiejsze zmiany w statystykach",points:"Punkty",rank:"Ranking",villages:"Liczba wiosek",members:"Liczba członków",oda:"Pokonani przeciwnicy jako agresor",odaRank:"RA",odd:"Pokonani przeciwnicy jako obrońca",oddRank:"RO",ods:"Pokonani przeciwnicy jako wspierający",odsRank:"RW",od:"Pokonani przeciwnicy",odRank:"Pokonani przeciwnicy razem ranking"},en_DK:{title:"Today's stat changes",points:"Points",rank:"Rank",villages:"Villages",members:"Members",oda:"ODA",odaRank:"ODA Rank",odd:"ODD",oddRank:"ODD Rank",ods:"ODS",odsRank:"ODS Rank",od:"OD",odRank:"OD Rank"},de_DE:{title:"Heutige Werte Änderungen",points:"Punkte",rank:"Rang",villages:"Dörfer",members:"Mitglieder",oda:"BGA",odaRank:"BGA Rang",odd:"BGD",oddRank:"BGD Rang",ods:"BGS",odsRank:"BGS Rang",od:"BP",odRank:"BP Rang"}};const y=b[window.game_data.locale]||b.en_DK,f=t=>t>0?"color: #000; background-color: #0f0":t<0?"color: #000; background-color: #f00":"color: #000; background-color: #808080";const w={pl_PL:{date:"Data",newOwner:"Nowy właściciel",oldOwner:"Poprzedni właściciel",village:"Wioska",title:"Przejęcia"},en_DK:{date:"Date",newOwner:"New owner",oldOwner:"Old owner",village:"Village",title:"Ennoblements"},de_DE:{date:"Datum",newOwner:"Neuer Besitzer",oldOwner:"Alter Besitzer",village:"Dorf",title:"Adelungen"}};const v=".popup_box",D=function(){let{html:t,id:e,title:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Dialog.show(e,"<h3>".concat(n,"</h3>")+t);const a=document.querySelector(v);a&&(a.style.width="auto",a.style.maxWidth="1000px")},k=(t,e)=>new Date(t).toLocaleDateString(void 0,e||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),S=t=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:t}),T=t=>window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:t}),A=t=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:t}),L=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const a="K"+String(n)[0]+String(e)[0];return"".concat(t," (").concat(e,"|").concat(n,") ").concat(a)},P="ennoblementsPagination",E=w[window.game_data.locale]||w.en_DK,$=(t,e)=>t?'<td><a href="'.concat(T(t.id),'">').concat(t.name," (").concat(e?'<a href="'.concat(S(e.id),'">').concat(e.tag,"</a>"):"-",")</a></td>"):"<td>-</td>";function M(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function O(n,a){t(2,arguments);var r=e(n),o=M(a);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}function j(e,n){t(2,arguments);var a=M(n);return O(e,-a)}const R={pl_PL:{title:"Historia",date:"Data",tribe:"Plemię",points:"Punkty",rank:"Ranking",villages:"Liczba wiosek",members:"Liczba członków",oda:"Pokonani przeciwnicy jako agresor",odd:"Pokonani przeciwnicy jako obrońca",ods:"Pokonani przeciwnicy jako wspierający",od:"Pokonani przeciwnicy"},en_DK:{title:"History",date:"Date",tribe:"Tribe",points:"Points",villages:"Villages",members:"Members",oda:"ODA",odd:"ODD",ods:"ODS",od:"OD"},de_DE:{title:"Verlauf",date:"Datum",tribe:"Stamm",points:"Punkte",villages:"Dörfer",members:"Mitglieder",oda:"BGA",odd:"BGV",ods:"BGS",od:"BP"}};const x="historyPagination",H=R[window.game_data.locale]||R.en_DK,C=t=>t>0?"+"+t:t;var z=t=>parseInt(new URLSearchParams(t).get("id"));const G=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))};const q=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"http://www.twstats.com/in/".concat(t,"/player/").concat(e)},_="tribalwarshelp.com",N=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(t,".").concat(_,"/server/").concat(e)},I=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return"".concat(N(t,e),"/").concat(a,"/").concat(n)},F=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return I(t,e,n,"player")};function V(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function B(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?V(Object(n),!0).forEach((function(e){W(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function W(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const K=window.location.host.split(".")[0],U=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.substr(0,2)}(K),Y=z(window.location.search),Z="kichiyaki_extended_tribe_profile"+Y,J="\nquery tribeMembersDailyStats($server: String!,\n     $filter: DailyPlayerStatsFilter!,\n     $limit: Int,\n     $sort: [String!]) {\n  dailyPlayerStats(server: $server, limit: $limit, sort: $sort, filter: $filter) {\n    items {\n        player {\n          id\n          name\n        }\n        points\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n";let X="points";const Q="tribeChangesPagination",tt=document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody"),et=tt,nt=document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)"),at=document.querySelector("#content_value h3").nextElementSibling.querySelector("tbody"),rt=c[window.game_data.locale]||c.en_DK,ot=()=>function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=localStorage.getItem(t);let a=e;return n&&(a=JSON.parse(n)),a}(Z),it=()=>{const t=[];return at.querySelectorAll("a").forEach((e=>{const n=e.getAttribute("href");n.includes("info_player")&&t.push(z(n))})),t},lt=async()=>{const t=it(),e=await d({query:"\n  query tribe(\n    $server: String!\n    $id: Int!\n    $dailyTribeStatsSort: [String!]\n    $dailyTribeStatsLimit: Int\n    $playersLimit: Int\n    $playersSort: [String!]\n    $playerFilter: PlayerFilter!\n    $dailyTribeStatsFilter: DailyTribeStatsFilter!\n  ) {\n    tribe(server: $server, id: $id) {\n      id\n      bestRank\n      bestRankAt\n      mostPoints\n      mostPointsAt\n      mostVillages\n      mostVillagesAt\n      createdAt\n      dominance\n    }\n    dailyTribeStats(\n      server: $server\n      limit: $dailyTribeStatsLimit\n      sort: $dailyTribeStatsSort\n      filter: $dailyTribeStatsFilter\n    ) {\n      items {\n        rank\n        rankAtt\n        rankDef\n        rankTotal\n        points\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        members\n      }\n    }\n    players(server: $server, sort: $playersSort, filter: $playerFilter, limit: $playersLimit) {\n      items {\n        id\n        rankAtt\n        rankDef\n        rankSup\n        rankTotal\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        dailyGrowth\n      }\n    }\n  }\n",variables:{server:K,id:Y,dailyTribeStatsSort:["createDate DESC"],dailyTribeStatsLimit:1,dailyTribeStatsFilter:{tribeID:[Y]},playersSort:["rank ASC"],playersLimit:t.length,playerFilter:{id:t}}});return function(){G(Z,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}(e),e},ct=t=>{let{tribe:e,dailyTribeStats:n,players:a}=t;[{title:rt.createdAt+":",data:k(e.createdAt),id:"created_at"},{title:rt.dominance+":",data:e.dominance.toFixed(2)+"%",id:"dominance"},{title:rt.bestRank+":",data:e.bestRank+" "+"(".concat(k(e.bestRankAt),")"),id:"best_rank"},{title:rt.mostPoints+":",data:e.mostPoints.toLocaleString()+" "+"(".concat(k(e.mostPointsAt),")"),id:"most_points"},{title:rt.mostVillages+":",data:e.mostVillages+" "+"(".concat(k(e.mostVillagesAt),")"),id:"most_villages"}].forEach((t=>{(t=>{let{title:e,data:n,id:a}=t,r=document.querySelector("#"+a);r||(r=document.createElement("tr"),r.id=a,r.appendChild(document.createElement("td")),r.appendChild(document.createElement("td")),tt.append(r)),r.children[0].innerHTML=e,r.children[1].innerHTML=n})(t)})),n&&n.items.length>0&&((t,e)=>{let n=t.querySelector("#todaysStats");n||(n=document.createElement("div"),n.id="todaysStats",n.width="100%",t.prepend(n));const a=!(null==e.rankSup);n.innerHTML='\n      <table width="100%" class="vis">\n        <tbody>\n          <tr>\n            <th colspan="2">\n              '.concat(y.title,"\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat(y.points,':\n              </td>\n              <td style="').concat(f(e.points),'">\n                ').concat(Math.abs(e.points).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.rank,':\n              </td>\n              <td style="').concat(f(e.rank),'">\n                ').concat(Math.abs(e.rank),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.villages,':\n              </td>\n              <td style="').concat(f(e.villages),'">\n                ').concat(Math.abs(e.villages).toLocaleString(),"\n              </td>\n            </tr>\n            ").concat(a?"":"<tr>\n              <td>\n                ".concat(y.members,':\n              </td>\n              <td style="').concat(f(e.members),'">\n                ').concat(Math.abs(e.members),"\n              </td>\n            </tr>"),"\n            <tr>\n              <td>\n                ").concat(y.oda,':\n              </td>\n              <td style="').concat(f(e.scoreAtt),'">\n                ').concat(Math.abs(e.scoreAtt).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.odaRank,':\n              </td>\n              <td style="').concat(f(e.rankAtt),'">\n                ').concat(Math.abs(e.rankAtt),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.odd,':\n              </td>\n              <td style="').concat(f(e.scoreDef),'">\n                ').concat(Math.abs(e.scoreDef).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.oddRank,':\n              </td>\n              <td style="').concat(f(e.rankDef),'">\n                ').concat(Math.abs(e.rankDef),"\n              </td>\n            </tr>\n            ").concat(a?"<tr>\n              <td>\n                ".concat(y.ods,':\n              </td>\n              <td style="').concat(f(e.scoreSup),'">\n                ').concat(Math.abs(e.scoreSup).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.odsRank,':\n              </td>\n              <td style="').concat(f(e.rankSup),'">\n                ').concat(Math.abs(e.rankSup),"\n              </td>\n            </tr>"):"","\n            <tr>\n              <td>\n                ").concat(y.od,':\n              </td>\n              <td style="').concat(f(e.scoreTotal),'">\n                ').concat(Math.abs(e.scoreTotal).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(y.odRank,':\n              </td>\n              <td style="').concat(f(e.rankTotal),'">\n                ').concat(Math.abs(e.rankTotal),"\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ")})(nt,n.items[0]),a&&a.items.length>0&&(t=>{at.parentElement.style.width="100%";const e=at.querySelector("tr:first-child");11!==e.children.length&&[rt.oda,rt.odd,rt.ods,rt.od,rt.dailyGrowth,rt.playerLinks].forEach((t=>{const n=document.createElement("th");n.innerHTML=t,e.appendChild(n)})),at.querySelectorAll("tr").forEach((e=>{const n=e.querySelector("a");if(!n)return;const a=z(n.getAttribute("href")),r=t.items.find((t=>t.id===a));r&&[[r.scoreAtt,r.rankAtt],[r.scoreDef,r.rankDef],[r.scoreSup,r.rankSup],[r.scoreTotal,r.rankTotal],r.dailyGrowth,[{link:F(U,K,r.id),label:"TWHelp"},{link:q(K,r.id),label:"TWStats"}]].forEach(((t,n)=>{let a=e.children[5+n];a||(a=document.createElement("td"),e.appendChild(a)),Array.isArray(t)?"number"==typeof t[0]?a.innerHTML="".concat(t[0].toLocaleString()," (<strong>").concat(t[1],"</strong>)"):t[0].link&&(a.innerHTML=t.map((t=>{let{link:e,label:n}=t;return'<a target="_blank" href="'.concat(e,'">').concat(n,"</a>")})).join("<br>")):"number"==typeof t&&(a.innerHTML=t.toLocaleString())}))}))})(a)},st=async t=>{t.preventDefault();const e=m(t.target);if(!isNaN(e)){!function(t,e){let{limit:n=0,currentPage:a=1,onPageChange:r=(()=>{})}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const o=h({total:e.total,limit:n,currentPage:a}),i='\n    <div style="'.concat("display: flex; flex-direction: row; flex-wrap: wrap;",'" id="').concat(P,'">\n      ').concat(o.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(E.date,"\n          </th>\n          <th>\n            ").concat(E.village,"\n          </th>\n          <th>\n            ").concat(E.newOwner,"\n          </th>\n          <th>\n            ").concat(E.oldOwner,"\n          </th>\n        </tr>\n        ").concat(e.items.map((t=>{let e="<tr>"+"<td>".concat(k(t.ennobledAt),"</td>");return t.village?e+='<td><a href="'.concat(A(t.village.id),'">').concat(L(t.village.name,t.village.x,t.village.y),"</a></td>"):e+="<td>-</td>",e+=$(t.newOwner,t.newOwnerTribe),e+=$(t.oldOwner,t.oldOwnerTribe),e+"</tr>"})).join(""),"\n      </tbody>\n    </table>\n  ");D({e:t,title:E.title,id:"ennoblements",html:i}),document.querySelectorAll("#ennoblementsPagination a").forEach((t=>{t.addEventListener("click",r)}))}(t,(await d({query:"\n    query ennoblements($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, limit: $limit, offset: $offset, sort: $sort, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n",variables:{filter:{or:{oldOwnerTribeID:[Y],newOwnerTribeID:[Y]}},offset:15*(e-1),limit:15,sort:["ennobledAt DESC"],server:K}})).ennoblements,{currentPage:e,limit:15,onPageChange:st})}},dt=async t=>{t.preventDefault();const e=m(t.target);if(!isNaN(e))try{const n={tribeID:[Y]},{tribeHistory:a,dailyTribeStats:r}=await d({query:"\nquery tribeHistoryAndTribeDailyStats($server: String!,\n     $tribeHistoryFilter: TribeHistoryFilter!,\n     $dailyTribeStatsFilter: DailyTribeStatsFilter!,\n     $sort: [String!],\n     $offset: Int,\n     $limit: Int) {\n  tribeHistory(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $tribeHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreTotal\n      rankTotal\n      createDate\n      totalMembers\n    }\n  }\n  dailyTribeStats(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $dailyTribeStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreDef\n        scoreTotal\n        villages\n        createDate\n        members\n      }\n    }\n}\n",variables:{server:K,offset:15*(e-1),limit:15,sort:["createDate DESC"],tribeHistoryFilter:n,dailyTribeStatsFilter:n}});!function(t,e,n){let{currentPage:a=1,limit:r=0,onPageChange:o=(()=>{}),tribe:i=!1}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const l=h({total:e.total,limit:r,currentPage:a}),c='\n    <div style="'.concat("display: flex; flex-direction: row; flex-wrap: wrap;",'" id="').concat(x,'">\n      ').concat(l.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(H.date,"\n          </th>\n          ").concat(i?"":"<th>".concat(H.tribe,"</th>"),"\n          <th>\n          ").concat(H.points,"\n          </th>\n          <th>\n          ").concat(H.villages,"\n          </th>\n          ").concat(i?"<th>".concat(H.members,"</th>"):"","\n          <th>\n            ").concat(H.od,"\n          </th>\n          <th>\n            ").concat(H.oda,"\n          </th>\n          <th>\n            ").concat(H.odd,"\n          </th>\n          ").concat(i?"":"<th>".concat(H.ods,"</th>"),"\n        </tr>\n        ").concat(e.items.map((t=>{const e=j(new Date(t.createDate),1).toISOString().split(".")[0]+"Z",a=n.items.find((t=>t.createDate===e));let r="<tr>"+"<td>".concat(k(t.createDate,{year:"numeric",month:"2-digit",day:"2-digit"}),"</td>");return!i&&t.tribe?r+='<td><a href="'.concat(S(t.tribe.id),'">').concat(t.tribe.tag,"</a></td>"):i||(r+="<td>-</td>"),r+='\n              <td title="'.concat(a?C(a.points):"",'">\n                ').concat(t.points.toLocaleString()," (<strong>").concat(t.rank,'</strong>)\n              </td>\n              <td title="').concat(a?C(a.villages):"",'">\n                ').concat(t.totalVillages.toLocaleString(),"\n              </td>\n              ").concat(i?'\n                  <td title="'.concat(a?C(a.members):"",'">\n                    ').concat(t.totalMembers,"\n                </td>\n              "):"",'\n              <td title="').concat(a?C(a.scoreTotal):"",'">\n                ').concat(t.scoreTotal.toLocaleString()," (<strong>").concat(t.rankTotal,'</strong>)\n              </td>\n              <td title="').concat(a?C(a.scoreAtt):"",'">\n                ').concat(t.scoreAtt.toLocaleString()," (<strong>").concat(t.rankAtt,'</strong>)\n              </td>\n              <td title="').concat(a?C(a.scoreDef):"",'">\n                ').concat(t.scoreDef.toLocaleString()," (<strong>").concat(t.rankDef,"</strong>)\n              </td>\n              ").concat(i?"":'\n                  <td title="'.concat(a?C(a.scoreSup):"",'">\n                    ').concat(t.scoreSup.toLocaleString()," (<strong>").concat(t.rankSup,"</strong>)\n                </td>\n              "),"\n            ")+"</tr>",r})).join(""),"\n      </tbody>\n    </table>\n  ");D({e:t,title:H.title,id:"history",html:c}),document.querySelectorAll("#historyPagination a").forEach((t=>{t.addEventListener("click",o)}))}(t,a,r,{currentPage:e,limit:15,tribe:!0,onPageChange:dt})}catch(t){console.log("couldnt load tribe history",t)}},gt=t=>t>0?"color: #000; background-color: #0f0":t<0?"color: #000; background-color: #f00":"color: #000; background-color: #808080",pt=t=>{switch(X){case"points":return t.points;case"villages":return t.villages;case"od":return t.scoreTotal;case"oda":return t.scoreAtt;case"odd":return t.scoreDef;case"ods":return t.scoreSup;default:return 0}},mt=t=>{const e=[...new Set(t.items.map((t=>t.createDate)))].reverse();return"\n    <tbody>\n        <tr>\n          <th>".concat(rt.player,"</th>\n          ").concat(e.map((t=>"<th>".concat(k(t,{year:"numeric",month:"2-digit",day:"2-digit"}),"</th>"))).join(""),"\n          <th>").concat(rt.total,"</th>\n        </tr>\n        ").concat(it().map((n=>{const a=t.items.filter((t=>t.player&&t.player.id===n)).reverse();let r;a.length>0&&(r=a[0].player);const o=[];let i=0;for(let t of e){const e=a.find((e=>e.createDate===t));let n=0;e&&(n=pt(e)),i+=n,o.push('<td style="'.concat(gt(n),'">').concat(n.toLocaleString(),"</td>"))}return"<tr>\n            <td>\n              ".concat(r?'<a href="'.concat(T(n),'">').concat(r.name,"</a>"):"-","\n            </td>\n            ").concat(o.join(""),'\n            <td style="').concat(gt(i),'"><strong>').concat(i.toLocaleString(),"</strong></td>\n          </tr>")})).join(""),"\n      </tbody>\n  ")},ut="membersGrowth",ht="membersGrowthForm",bt=(t,e)=>{const n=[["points",rt.points],["villages",rt.villages],["od",rt.opponentsDefeated],["oda",rt.opponentsDefeatedAsAttacker],["odd",rt.opponentsDefeatedAsDefender],["ods",rt.opponentsDefeatedAsSupporter]].map((t=>"<option ".concat(X===t[0]?'selected="selected"':"",' value="').concat(t[0],'">').concat(t[1],"</option>"))),a='\n    <form id="'.concat(ht,'">\n      <select>\n        ').concat(n.join(""),'\n      </select>\n      <button type="submit">').concat(rt.change,'</button>\n    </form>\n    <table id="').concat(ut,'" class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      ').concat(mt(e),"\n    </table>\n  ");D({e:t,title:rt.membersGrowth,id:"mg",html:a}),document.querySelector("#membersGrowthForm").addEventListener("submit",(t=>e=>{e.preventDefault(),X=e.target[0].value,document.querySelector("#membersGrowth").innerHTML=mt(t)})(e))},yt=async t=>{t.preventDefault();const e=new Date;e.setDate(e.getDate()-7);const n=await async function(){let{createDateLTE:t,createDateGT:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=it(),a=n.length*l(t,e),r={playerID:n,createDateLTE:t,createDateGT:e};return await d({query:J,variables:{filter:r,limit:a,sort:["createDate DESC"],server:K}})}({createDateLTE:new Date,createDateGT:e});bt(t,n.dailyPlayerStats)},ft=async t=>{t.preventDefault();const e=m(t.target);if(!isNaN(e)){((t,e,n)=>{const a=h({total:n.total,limit:15,currentPage:e}),r='\n    <div style="'.concat("display: flex; flex-direction: row; flex-wrap: wrap;",'" id="').concat(Q,'">\n      ').concat(a.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(rt.date,"\n          </th>\n          <th>\n            ").concat(rt.player,"\n          </th>\n          <th>\n            ").concat(rt.act,"\n          </th>\n        </tr>\n        ").concat(n.items.map((t=>{let e="<tr>"+"<td>".concat(k(t.createdAt),"</td>");return t.player?e+='<td><a href="'.concat(T(t.player.id),'">').concat(t.player.name,"</a></td>"):e+="<td>-</td>",e+="<td><strong>".concat(t.newTribe&&t.newTribe.id===Y?rt.joined:rt.left,"</strong></td>"),e+"</tr>"})).join(""),"\n      </tbody>\n    </table>\n  ");D({e:t,title:rt.tribeChanges,id:"tribeChanges",html:r}),document.querySelectorAll("#tribeChangesPagination a").forEach((t=>{t.addEventListener("click",ft)}))})(t,e,(await d({query:"\n    query tribeChanges($server: String!, $limit: Int, $offset: Int, $sort: [String!], $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, offset: $offset, limit: $limit, sort: $sort, filter: $filter) {\n        total\n        items {\n          player {\n            id\n            name\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n",variables:{filter:{or:{oldTribeID:[Y],newTribeID:[Y]}},offset:15*(e-1),limit:15,sort:["createdAt DESC"],server:K}})).tribeChanges)}},wt=t=>{t.preventDefault();const e=(()=>{const t=[];return at.querySelectorAll("a").forEach((e=>{e.getAttribute("href").includes("info_player")&&t.push(e.innerText.trim())})),t})(),n=[];for(let t=0;t<e.length;t+=50)n.push(e.slice(t,t+50));let a="";n.forEach(((t,e)=>{a+='<h3 style="margin-bottom: 5px;">'.concat(e+1,'.</h3>\n    <textarea cols=30 rows=8 readonly style="margin-bottom: 15px;">').concat(t.join(";"),"</textarea>")})),Dialog.show("mailinglist",a)},vt=async function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{const n=await d({variables:t,query:"\n        query villages($server: String!, $sort: [String!], $limit: Int, $offset: Int, $filter: VillageFilter!) {\n          villages(server: $server, sort: $sort, limit: $limit, offset: $offset, filter: $filter) {\n            ".concat(e?"total":"","\n            items {\n              id\n              x\n              y\n            }\n          }\n        }\n      ")});if(n&&n.villages&&Array.isArray(n.villages.items))return n.villages}catch(t){console.log("load villages",t)}return{total:0,items:[]}},Dt=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t&&e?Dialog.show("loading","Loaded: <strong>".concat(t,"</strong>/<strong>").concat(e,"</strong>")):Dialog.show("loading","<strong>Loading...</strong>")},kt=async t=>{t.preventDefault();let e=parseInt(t.target[4].value);const n={filter:{xLTE:parseInt(t.target[0].value),xGTE:parseInt(t.target[1].value),yLTE:parseInt(t.target[2].value),yGTE:parseInt(t.target[3].value),playerID:it()},limit:isNaN(e)||!e?0:e,sort:["id ASC"],server:K};Dt();let{total:a,items:r}=await vt(n,!0);const o=r.length;if(0!==e&&e<a&&(a=e),isNaN(e)||!e||e>o)for(let t=o;t<a;t+=o){Dt(t,a);const e=await vt(B(B({},n),{},{filter:B({},n.filter),offset:t}));r=[...r,...e.items]}Dialog.show("exportTribeVillages","\n    <textarea cols=60 rows=8 readonly>".concat(r.map((t=>"".concat(t.x,"|").concat(t.y))).join(" "),"</textarea>\n  "))},St=t=>{t.preventDefault();const e="etvForm",n='\n    <div style="display: flex; align-items: center; justify-content: center;">\n      <form id="'.concat(e,'">\n        <div>\n          <label>X <= </label>\n          <input type="number" min="0" value="1000" required />\n        </div>\n        <div>\n          <label>X >= </label>\n          <input type="number" min="0" value="0" required />\n        </div>\n        <div>\n          <label>Y <= </label>\n          <input type="number" min="0" value="1000" required />\n        </div>\n        <div>\n          <label>Y >= </label>\n          <input type="number" min="0" value="0" required />\n        </div>\n        <div>\n          <label>Limit: </label>\n          <input type="number" min="0" value="0" required />\n        </div>\n        <button type="submit">Export</button>\n      </form>\n    </div>\n  ');Dialog.show("exportTribeVillages",n),document.querySelector("#etvForm").addEventListener("submit",kt)},Tt=t=>{const e=document.createElement("td");e.colSpan="2",e.append(t);const n=document.createElement("tr");return n.appendChild(e),n},At=()=>{const t=document.createElement("a");t.href=function(){return I(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,"tribe")}(U,K,Y),t.innerHTML=rt.action.linkToTWHelp,et.appendChild(Tt(t));const e=document.createElement("a");e.href="#",p(e,"1"),e.innerHTML=rt.action.showEnnoblements,e.addEventListener("click",st),et.appendChild(Tt(e));const n=document.createElement("a");n.href="#",p(n,"1"),n.innerHTML=rt.action.showHistory,n.addEventListener("click",dt),et.appendChild(Tt(n));const a=document.createElement("a");a.href="#",p(a,"1"),a.innerHTML=rt.action.showTribeChanges,a.addEventListener("click",ft),et.appendChild(Tt(a));const r=document.createElement("a");r.href="#",r.innerHTML=rt.action.showMembersGrowth,r.addEventListener("click",yt),et.appendChild(Tt(r));const o=document.createElement("a");o.href="#",o.innerHTML=rt.action.generateMailingList,o.addEventListener("click",wt),et.appendChild(Tt(o));const i=document.createElement("a");i.href="#",i.innerHTML=rt.action.exportVillages,i.addEventListener("click",St),et.appendChild(Tt(i))};!async function(){try{At();const t=ot();t&&t.tribe&&ct(t);const e=await lt();e&&ct(e)}catch(t){console.log("extended tribe profile",t)}}()}();