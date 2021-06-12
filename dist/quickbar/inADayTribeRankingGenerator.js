!function(){var e=e=>parseInt(new URLSearchParams(e).get("id"));class t{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.dom=(new DOMParser).parseFromString(e,"text/html"),this.trs=this.dom.querySelectorAll("#in_a_day_ranking_table tbody tr"),this.filters=t}isValidRow(e){return!!e&&((!this.filters.playerID||e.playerID===this.filters.playerID)&&!(this.filters.tribes&&Array.isArray(this.filters.tribes)&&!this.filters.tribes.some((t=>t===e.tribe))))}parseRow(t){if(!t||!t instanceof HTMLTableRowElement)return;let r={};return r.rank=parseInt(t.children[0].innerText.trim()),r.name=t.children[1].innerText.trim(),r.playerID=e(t.children[1].querySelector("a").getAttribute("href")),r.tribe=t.children[2].innerText.trim(),r.tribeID=0,r.tribe&&(r.tribeID=e(t.children[2].querySelector("a").getAttribute("href"))),r.score=parseInt(t.children[3].innerText.trim().replace(/\./g,"")),r.date=t.children[4].innerText.trim(),r}parse(){const e=[];for(let t=1;t<this.trs.length;t++){const r=this.trs[t],n=this.parseRow(r);this.isValidRow(n)&&e.push(n)}return e}}const r={pl_PL:{addTribe:"Dodaj plemię",generate:"Wygeneruj",delete:"Usuń",player:"Gracz",tribe:"Plemię",rank:"Ranking",score:"Wynik",date:"Data",loaded:"Załadowano"},en_DK:{addTribe:"Add tribe",generate:"Generate",delete:"Delete",player:"Player",tribe:"Tribe",rank:"Rank",score:"Score",date:"Date",loaded:"Loaded"},de_DE:{addTribe:"Stamm hinzufügen",generate:"Generieren",delete:"Löschen",player:"Spieler",tribe:"Stamm",rank:"Rang",score:"Punkte",date:"Datum",loaded:"Geladen"}};var n=e=>new Promise((t=>setTimeout(t,e)));const a="iad_tribes",i="iad_limit",o=r[window.game_data.locale]||r.en_DK,l=()=>{const e=document.querySelector("#iad_tribes"),t=document.createElement("div");t.innerHTML="\n        <label>".concat(o.tribe,': </label>\n        <input type="text" required />\n        <button type="button">').concat(o.delete,"</button>\n    "),t.querySelector("button").addEventListener("click",(()=>{e.children.length>1&&t.remove()})),e.appendChild(t)},c=async e=>{e.preventDefault();const r=parseInt(document.querySelector("#iad_limit").value),a=[],i=new URLSearchParams(window.location.search).get("type")||"kill_att";document.querySelectorAll("#iad_tribes input").forEach((e=>{e.value&&a.push(e.value.trim())}));let l=[],c=0;for(;l.length<r;){Dialog.show("iad_loading","".concat(o.loaded,": <strong>").concat(l.length,"/").concat(r,"</strong>"));try{const e=await fetch(TribalWars.buildURL("",{screen:"ranking",mode:"in_a_day",type:i,offset:25*c})),r=await e.text(),o=new t(r,{tribes:a});if(26!==o.trs.length)break;l=[...l,...o.parse()],c++,await n(200)}catch(e){break}}l.length>r&&(l=l.slice(0,r)),Dialog.show("iad_result","\n    <textarea cols=30 rows=8 readonly>[table]\n[**][||]".concat(o.player,"[||]").concat(o.tribe,"[||]").concat(o.rank,"[||]").concat(o.score,"[||]").concat(o.date,"[/**]\n").concat(l.map(((e,t)=>"[*]".concat(t+1,".[|][player]").concat(e.name,"[/player][|][ally]").concat(e.tribe,"[/ally][|]").concat(e.rank,"[|]").concat(e.score.toLocaleString(),"[|]").concat(e.date))).join("\n"),"\n[/table]</textarea>\n  "))};!function(){try{(()=>{const e="iad_add",t=document.createElement("div"),r='\n    <form>\n        <div id="'.concat(a,'">\n        </div>\n        <div>\n            <label>Limit: </label>\n            <input id="').concat(i,'" type="number" min="1" value="10" required />\n        </div>\n        <button type="submit">').concat(o.generate,'</button>\n        <button id="').concat(e,'" type="button">').concat(o.addTribe,"</button>\n    </form>\n  ");t.innerHTML=r,document.querySelector("#content_value > table > tbody > tr > td:nth-child(2)").prepend(t),t.querySelector("form").addEventListener("submit",c),t.querySelector("#iad_add").addEventListener("click",l),l()})()}catch(e){console.log("'In A Day' Tribe Ranking Generator",e)}}()}();