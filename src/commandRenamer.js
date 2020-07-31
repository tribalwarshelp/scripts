import wait from './utils/wait';

// ==UserScript==
// @name         Command renamer
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandRenamer.js
// @version      0.4.2
// @description  Command renamer
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*mode=incomings*
// @grant        none
// ==/UserScript==

const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  if (!name) return;
  const checkboxes = document.querySelectorAll(
    '#incomings_table input:checked'
  );
  e.target[1].disabled = true;
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    if (checkbox.id === 'select_all') continue;
    const icon = checkbox.parentElement.querySelector('.rename-icon');
    icon.click();
    await wait(20);
    const quickeditForm = checkbox.parentElement.querySelector(
      '.quickedit-edit'
    );
    quickeditForm.querySelector('input').value = name;
    quickeditForm.querySelector('input[type="button"]').click();
    await wait(350);
  }
  e.target[1].disabled = false;
};

const renderUI = () => {
  const html = `
    <input type="text" placeholder="Name" />
    <button type="submit">Rename</button>
  `;

  const form = document.createElement('form');
  form.innerHTML = html;
  form.addEventListener('submit', handleSubmit);

  document
    .querySelector('#paged_view_content')
    .insertBefore(form, document.querySelector('#incomings_form'));
};

(async function () {
  try {
    renderUI();
  } catch (error) {
    console.log('command renamer', error);
  }
})();
