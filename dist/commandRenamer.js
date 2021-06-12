(function () {
  const $f9de81cfe3f8a296e0e5a7ba4108bc8c$var$translations = {
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
  var $f9de81cfe3f8a296e0e5a7ba4108bc8c$export$default = () => $f9de81cfe3f8a296e0e5a7ba4108bc8c$var$translations[window.game_data.locale] || $f9de81cfe3f8a296e0e5a7ba4108bc8c$var$translations.en_DK;
  var $393a22f746cd1f6e45eff96c71b28370$export$default = t => new Promise(resolve => setTimeout(resolve, t));
  // ==UserScript==
  // @name         Command renamer
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
  // @version      0.2.4
  // @description  Command renamer
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*mode=incomings*
  // @grant        none
  // ==/UserScript==
  const $a00f5166aafbcf4ccffe3cfb8f4b9923$var$translations = $f9de81cfe3f8a296e0e5a7ba4108bc8c$export$default();
  const $a00f5166aafbcf4ccffe3cfb8f4b9923$var$handleSubmit = async e => {
    e.preventDefault();
    const name = e.target[0].value;
    if (!name) return;
    const checkboxes = document.querySelectorAll('#incomings_table input:checked');
    e.target[1].disabled = true;
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      if (checkbox.id === 'select_all') continue;
      const icon = checkbox.parentElement.querySelector('.rename-icon');
      icon.click();
      await $393a22f746cd1f6e45eff96c71b28370$export$default(20);
      const quickeditForm = checkbox.parentElement.querySelector('.quickedit-edit');
      quickeditForm.querySelector('input').value = name;
      quickeditForm.querySelector('input[type="button"]').click();
      await $393a22f746cd1f6e45eff96c71b28370$export$default(350);
    }
    e.target[1].disabled = false;
  };
  const $a00f5166aafbcf4ccffe3cfb8f4b9923$var$renderUI = () => {
    const html = ("\n    <input type=\"text\" placeholder=\"").concat($a00f5166aafbcf4ccffe3cfb8f4b9923$var$translations.name, "\" />\n    <button type=\"submit\">").concat($a00f5166aafbcf4ccffe3cfb8f4b9923$var$translations.rename, "</button>\n  ");
    const form = document.createElement('form');
    form.innerHTML = html;
    form.addEventListener('submit', $a00f5166aafbcf4ccffe3cfb8f4b9923$var$handleSubmit);
    document.querySelector('#paged_view_content').insertBefore(form, document.querySelector('#incomings_form'));
  };
  (async function () {
    try {
      $a00f5166aafbcf4ccffe3cfb8f4b9923$var$renderUI();
    } catch (error) {
      console.log('command renamer', error);
    }
  })();
})();

