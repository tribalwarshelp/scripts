(function () {
const $76945efd441c6f3e$var$translations = {
    pl_PL: {
        rename: 'Zmień',
        name: 'Nazwa'
    },
    en_DK: {
        rename: 'Rename',
        name: 'Name'
    },
    de_DE: {
        rename: 'Umbenennen',
        name: 'Name'
    }
};
var $76945efd441c6f3e$export$2e2bcd8739ae039 = ()=>$76945efd441c6f3e$var$translations[window.game_data.locale] || $76945efd441c6f3e$var$translations.en_DK
;


var $fc029eaf0e980c2d$export$2e2bcd8739ae039 = (t)=>new Promise((resolve)=>setTimeout(resolve, t)
    )
;


// ==UserScript==
// @name         Command renamer
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @version      0.2.5
// @description  Command renamer
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*mode=incomings*
// @grant        none
// ==/UserScript==
const $1e4faa846c4448db$var$translations = $76945efd441c6f3e$export$2e2bcd8739ae039();
const $1e4faa846c4448db$var$handleSubmit = async (e)=>{
    e.preventDefault();
    const name = e.target[0].value;
    if (!name) return;
    const checkboxes = document.querySelectorAll('#incomings_table input:checked');
    e.target[1].disabled = true;
    for(let i = 0; i < checkboxes.length; i++){
        const checkbox = checkboxes[i];
        if (checkbox.id === 'select_all') continue;
        const icon = checkbox.parentElement.querySelector('.rename-icon');
        icon.click();
        await $fc029eaf0e980c2d$export$2e2bcd8739ae039(20);
        const quickeditForm = checkbox.parentElement.querySelector('.quickedit-edit');
        quickeditForm.querySelector('input').value = name;
        quickeditForm.querySelector('input[type="button"]').click();
        await $fc029eaf0e980c2d$export$2e2bcd8739ae039(350);
    }
    e.target[1].disabled = false;
};
const $1e4faa846c4448db$var$renderUI = ()=>{
    const html = `
    <input type="text" placeholder="${$1e4faa846c4448db$var$translations.name}" />
    <button type="submit">${$1e4faa846c4448db$var$translations.rename}</button>
  `;
    const form = document.createElement('form');
    form.innerHTML = html;
    form.addEventListener('submit', $1e4faa846c4448db$var$handleSubmit);
    document.querySelector('#paged_view_content').insertBefore(form, document.querySelector('#incomings_form'));
};
(async function() {
    try {
        $1e4faa846c4448db$var$renderUI();
    } catch (error) {
        console.log('command renamer', error);
    }
})();

})();
