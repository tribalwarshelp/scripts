!function(){const e={pl_PL:{rename:"Zmień",name:"Nazwa"},en_DK:{rename:"Rename",name:"Name"},de_DE:{rename:"Umbenennen",name:"Name"}};var t=e=>new Promise((t=>setTimeout(t,e)));const n=e[window.game_data.locale]||e.en_DK,a=async e=>{e.preventDefault();const n=e.target[0].value;if(!n)return;const a=document.querySelectorAll("#incomings_table input:checked");e.target[1].disabled=!0;for(let e=0;e<a.length;e++){const c=a[e];if("select_all"===c.id)continue;c.parentElement.querySelector(".rename-icon").click(),await t(20);const o=c.parentElement.querySelector(".quickedit-edit");o.querySelector("input").value=n,o.querySelector('input[type="button"]').click(),await t(350)}e.target[1].disabled=!1};!async function(){try{(()=>{const e='\n    <input type="text" placeholder="'.concat(n.name,'" />\n    <button type="submit">').concat(n.rename,"</button>\n  "),t=document.createElement("form");t.innerHTML=e,t.addEventListener("submit",a),document.querySelector("#paged_view_content").insertBefore(t,document.querySelector("#incomings_form"))})()}catch(e){console.log("command renamer",e)}}()}();