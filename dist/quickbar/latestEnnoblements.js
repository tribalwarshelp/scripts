!function(){const e="https://api.tribalwarshelp.com/graphql";const n=".popup_box",t=function(){let{html:e,id:t,title:o}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Dialog.show(t,"<h3>".concat(o,"</h3>")+e);const r=document.querySelector(n);r&&(r.style.width="auto",r.style.maxWidth="1000px")};const o=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=localStorage.getItem(e);let o=n;return t&&(o=JSON.parse(t)),o},r=(e,n)=>{localStorage.setItem(e,JSON.stringify(n))},i="tribalwarshelp.com",a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"https://".concat(e,".").concat(i,"/server/").concat(n)};var l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.substr(0,2)};const c={pl_PL:{showLatestEnnoblements:"Pokaż najnowsze przejęcia",village:"Wioska",newOwner:"Nowy właściciel",newOwnerTribe:"Plemię nowego właściciela",oldOwner:"Poprzedni właściciel",oldOwnerTribe:"Plemię poprzedniego właściciela",date:"Data",filters:"Filtry",apply:"Zastosuj",ennoblements:"Przejęcia",devNote:"Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :)."},en_DK:{showLatestEnnoblements:"Show latest ennoblements",village:"Village",newOwner:"New owner",newOwnerTribe:"New owner tribe",oldOwner:"Old owner",oldOwnerTribe:"Old owner tribe",filters:"Filters",date:"Date",apply:"Apply",ennoblements:"Ennoblements",devNote:"Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."},de_DE:{showLatestEnnoblements:"Zeige letzten Adelungen",village:"Dorf",newOwner:"Neuer Besitzer",newOwnerTribe:"Neuer Stamm",oldOwner:"Alter Besitzer",oldOwnerTribe:"Alter Stamm",filters:"Filter",date:"Datum",apply:"Anwenden",ennoblements:"Adelungen",devNote:"Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :)."}};function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){w(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}const m=window.location.host.split(".")[0],b="le_form",u="le_table",h="kiszkowaty_show_latest_ennoblements_cache",g="kiszkowaty_show_latest_ennoblements_filter",p={newOwner:"",newOwnerTribe:"",oldOwner:"",oldOwnerTribe:""},y=c[window.game_data.locale]||c.en_DK,O=()=>function(){let{query:n,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:n,variables:t}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{let{data:n,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise((e=>e(n)))}))}({query:"\n    query ennoblements($server: String!, $sort: [String!], $limit: Int) {\n      ennoblements(server: $server, sort: $sort, limit: $limit) {\n        items {\n          newOwner {\n            id\n            name\n            tribe {\n              id\n              name\n              tag\n            }\n          }\n          oldOwner {\n            id\n            name\n            tribe {\n              id\n              name\n              tag\n            }\n          }\n          ennobledAt\n          village {\n            id\n            name\n            x\n            y\n          }\n        }\n      }\n    }\n  ",variables:{server:m,limit:50,sort:["ennobledAt DESC"]}}).then((e=>(function(){r(h,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}(e),new Promise((n=>n(e)))))),v=(e,n)=>e&&e.name.toLowerCase().includes(n.toLowerCase()),f=(e,n)=>e&&e.tribe&&(e.tribe.name.toLowerCase().includes(n.toLowerCase())||e.tribe.tag.toLowerCase().includes(n.toLowerCase())),j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],{newOwner:n,newOwnerTribe:t,oldOwner:o,oldOwnerTribe:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter((e=>!(n&&!v(e.newOwner,n))&&(!(t&&!f(e.newOwner,t))&&(!(o&&!v(e.oldOwner,o))&&!(r&&!f(e.oldOwner,r))))))},T=(e,n)=>{e.preventDefault();const t=d(d({},p),{},{newOwner:e.target[0].value,newOwnerTribe:e.target[1].value,oldOwner:e.target[2].value,oldOwnerTribe:e.target[3].value});document.querySelector("#".concat(u," tbody")).innerHTML=P(j(n,t)).join(""),function(){r(g,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}(t)},S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];document.querySelector("#le_form").addEventListener("submit",(n=>{T(n,e)}))},_=e=>{return e&&e.name?'<a href="'.concat((n=e.id,window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:n})),'">').concat(e.name,"</a> (").concat(e.tribe&&e.tribe.tag?'<a href="'.concat((e=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:e}))(e.tribe.id),'">').concat(e.tribe.tag,"</a>"):"-",")"):"-";var n},L=e=>{return'<a href="'.concat((n=e.id,window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:n})),'">').concat(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const o="K"+String(t)[0]+String(n)[0];return"".concat(e," (").concat(n,"|").concat(t,") ").concat(o)}(e.name,e.x,e.y),"</a>");var n},P=e=>e.map((e=>{return"<tr>\n              <td>".concat(L(e.village),"</td>\n              <td>").concat(_(e.newOwner),"</td>\n              <td>").concat(_(e.oldOwner),"</td>\n              <td>").concat((n=e.ennobledAt,new Date(n).toLocaleDateString(void 0,t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})),"</td>\n            </tr>");var n,t})),x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=d(d({},p),n),r='\n        <form style="margin-bottom: 15px" id="'.concat(b,'">\n        <h1 style="margin-bottom: 0px; text-align: center;"><a href="').concat(a(l(m),m),'">TWHelp</a></h1>\n            <h3 style="margin-bottom: 10px; margin-top: 0;">').concat(y.devNote,'</h3>\n          <h3 style="margin-bottom: 5px">').concat(y.filters,'</h3>\n          <input type="text" placeholder="').concat(y.newOwner,'" value="').concat(o.newOwner,'" />\n          <input type="text" placeholder="').concat(y.newOwnerTribe,'" value="').concat(o.newOwnerTribe,'" />\n          <input type="text" placeholder="').concat(y.oldOwner,'" value="').concat(o.oldOwner,'" />\n          <input type="text" placeholder="').concat(y.oldOwnerTribe,'" value="').concat(o.oldOwnerTribe,'" />\n          <div>\n            <button type="submit">').concat(y.apply,'</button>\n          </div>\n        </form>\n        <table class="vis" id="').concat(u,'" style="width: 100%">\n          <thead>\n            <tr>\n              <th>').concat(y.village,"</th>\n              <th>").concat(y.newOwner,"</th>\n              <th>").concat(y.oldOwner,"</th>\n              <th>").concat(y.date,"</th>\n            </tr>\n          </thead>\n          <tbody>\n            ").concat(P(j(e,o)).join(""),"\n          </tbody>\n        </table>\n        ");t({title:y.ennoblements,id:"ennoblements",html:r}),S(e)},D=async()=>{try{const e=o(h),n=o(g);e.ennoblements&&Array.isArray(e.ennoblements.items)&&e.ennoblements.items.length>0&&x(e.ennoblements.items,n);const{ennoblements:t}=await O();x(t.items,n)}catch(e){console.log("latestEnnoblements",e)}};(()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="5px",e.style.left="4px",e.style.zIndex="50000";const n=document.createElement("a");n.innerHTML='<img src="'.concat("https://i.imgur.com/4WP4098.png",'">'),n.title=y.showLatestEnnoblements,n.style.cursor="pointer",n.addEventListener("click",D),e.append(n),document.body.appendChild(e)})()}();