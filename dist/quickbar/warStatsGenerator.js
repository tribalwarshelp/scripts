!function(){var e=({query:e,variables:t={}}={})=>fetch("https://api.tribalwarshelp.com/graphql",{method:"POST",body:JSON.stringify({query:e,variables:t}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((({data:e,errors:t})=>{if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise((t=>t(e)))}));const t={pl_PL:{conquers:"Przejęcia",sideOne:"Strona 1",sideTwo:"Strona 2",difference:"Różnica",tribeTag:"Skrót plemienia",delete:"Usuń",notEnoughTribesSideOne:"Musisz dodać jakiekolwiek plemię do strony 1.",notEnoughTribesSideTwo:"Musisz dodać jakiekolwiek plemię do strony 2.",from:"Od",to:"Do",warStatsGenerator:"Generator statystyk wojennych",generateWarStats:"Wygeneruj statystyki wojenne",addTribe:"Dodaj plemię",devNote:"Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :)."},en_DK:{conquers:"Conquers",sideOne:"Side one",sideTwo:"Side two",difference:"Difference",tribeTag:"Tribe tag",delete:"Delete",notEnoughTribesSideOne:"Not enough tribes added to the side one.",notEnoughTribesSideTwo:"Not enough tribes added to the side two.",from:"From",to:"To",warStatsGenerator:"War stats generator",generateWarStats:"Generate war stats",addTribe:"Add tribe",devNote:"Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."},de_DE:{conquers:"Eroberungen",sideOne:"Partei A",sideTwo:"Partei B",difference:"Differenz",tribeTag:"Stammeskürzel",delete:"Löschen",notEnoughTribesSideOne:"Nicht genügend Stämme hinzugefügt zu Partei A.",notEnoughTribesSideTwo:"Nicht genügend Stämme hinzugefügt zu Partei B.",from:"Von",to:"Zu",warStatsGenerator:"Kriegsstatistik Generator",generateWarStats:"Generiere Statistik",addTribe:"Stamm Hinzufügen",devNote:"Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :)."}};const n=(e="",t="")=>`https://${e}.tribalwarshelp.com/server/${t}`,r=".popup_box";var i=({html:e,id:t,title:n}={})=>{Dialog.show(t,`<h3>${n}</h3>`+e);const i=document.querySelector(r);i&&(i.style.width="auto",i.style.maxWidth="1000px")};const o=window.location.host.split(".")[0],s=t[window.game_data.locale]||t.en_DK,a=e=>()=>{const t=document.createElement("div");t.innerHTML=`\n        <label>${s.tribeTag}: </label>\n        <input type="text" required />\n        <button type="button" class="btn">${s.delete}</button>\n    `,t.querySelector("button").addEventListener("click",(()=>{t.remove()})),e.appendChild(t)},d=async t=>{t.preventDefault();const n=[],r=[];if(t.target.querySelectorAll("#sideOneInputs input").forEach((e=>{e.value.trim()&&n.push(e.value.trim())})),t.target.querySelectorAll("#sideTwoInputs input").forEach((e=>{e.value.trim()&&r.push(e.value.trim())})),console.log("sideOneTags",n,"sideTwoTags",r),0===n.length)return UI.ErrorMessage(s.notEnoughTribesSideOne);if(0===r.length)return UI.ErrorMessage(s.notEnoughTribesSideTwo);const i=document.querySelectorAll(".popup_box form #from input");let a;2===i.length&&i[0].value&&i[1].value&&(a=new Date(`${i[0].value}T${i[1].value}:00`));const d=document.querySelectorAll(".popup_box form #to input");let l;2===d.length&&d[0].value&&d[1].value&&(l=new Date(`${d[0].value}T${d[1].value}:00`)),t.target.querySelectorAll("button").forEach((e=>{e.disabled=!0}));try{const{tribes:t}=await e({query:"\n  query tribes($server: String!, $filter: TribeFilter) {\n    tribes(server: $server, filter: $filter) {\n      items {\n        id\n        tag\n      }\n    }\n  }\n",variables:{server:o,filter:{tag:[...n,...r]}}}),i=t.items.filter((e=>n.some((t=>e.tag===t)))).map((e=>e.id)),d=t.items.filter((e=>r.some((t=>e.tag===t)))).map((e=>e.id)),{sideOneEnnoblements:u,sideTwoEnnoblements:m}=await e({query:"\n  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {\n    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {\n      total\n    }\n    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {\n      total\n    }\n  }\n",variables:{server:o,sideOneFilter:{newOwnerTribeID:i,oldOwnerTribeID:d,ennobledAtGTE:a,ennobledAtLTE:l},sideTwoFilter:{newOwnerTribeID:d,oldOwnerTribeID:i,ennobledAtGTE:a,ennobledAtLTE:l}}});console.log("sideOneEnnoblements",u,"sideTwoEnnoblements",m),((e=0,t=0)=>{const n=`\n    <div>\n      <h3>${s.conquers}:</h3>\n      <p style="margin: 0;"><strong>${s.sideOne}: ${e}</strong></p>\n      <p style="margin: 0;"><strong>${s.sideTwo}: ${t}</strong></p>\n      <p style="margin: 0;"><strong>${s.difference}: ${Math.abs(e-t)}</strong></p>\n      <hr style="margin: 10px 0;" />\n    </div>\n  `;document.querySelector("#warStatsResult").innerHTML=n})(u.total,m.total)}catch(e){console.log("handleFormSubmit",e)}t.target.querySelectorAll("button").forEach((e=>{e.disabled=!1}))},l=e=>{const t=`\n        <form>\n        <h1 style="margin-bottom: 0px; text-align: center;"><a href="${n(((e="")=>e.substr(0,2))(o),o)}">TWHelp</a></h1>\n            <h3 style="margin-bottom: 10px; margin-top: 0;">${s.devNote}</h3>\n            <div id="warStatsResult">\n            </div>\n            <div style="margin-bottom: 10px;">\n              <div id="from">\n                <label>${s.from}: </label>\n                <input type="date" required />\n                <input type="time" required />\n              </div>\n              <div id="to">\n                <label>${s.to}: </label>\n                <input type="date" required />\n                <input type="time" required />\n              </div>\n            </div>\n            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;">\n                <div>\n                    <h3>${s.sideOne}</h3>\n                    <div id="sideOneInputs">\n                    </div>\n                    <button id="sideOneAdd" class="btn" type="button">${s.addTribe}</button>\n                </div>\n                <div style="margin: 0 5px;"></div>\n                <div>\n                    <h3>${s.sideTwo}</h3>\n                    <div id="sideTwoInputs">\n                    </div>\n                    <button id="sideTwoAdd" class="btn" type="button">${s.addTribe}</button>\n                </div>\n            </div>\n            <div style="text-align: center;">\n              <button class="btn" type="submit">${s.generateWarStats}</button>\n            </div>\n        </form>\n    `;i({title:s.warStatsGenerator,id:"warStats",html:t,e:e}),document.querySelector(".popup_box form #sideOneAdd").addEventListener("click",a(document.querySelector("#sideOneInputs"))),document.querySelector(".popup_box form #sideTwoAdd").addEventListener("click",a(document.querySelector("#sideTwoInputs"))),document.querySelector(".popup_box form").addEventListener("submit",d)};!function(){try{(()=>{const e=document.createElement("div"),t=document.createElement("button");t.innerHTML=s.generateWarStats,t.addEventListener("click",l),e.appendChild(t),document.querySelector("#wars_ranking_table").parentElement.prepend(e)})()}catch(e){console.log("war stats",e)}}()}();