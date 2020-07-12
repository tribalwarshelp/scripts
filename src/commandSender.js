// ==UserScript==
// @name         Command sender
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandSender.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/commandSender.js
// @version      0.1
// @description  Command sender
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php?*&screen=place&try=confirm*
// @match        *://*.tribalwars.net/game.php?*&screen=place&try=confirm*
// @grant        none
// ==/UserScript==

let timeoutID;
const INPUT_ID = 'kichiyaki_command_sender_input';
const START_BUTTON_ID = 'kichiyaki_command_sender_start_button';
const CANCEL_BUTTON_ID = 'kichiyaki_command_sender_cancel_button';

const getDuration = () => {
  const span = document.querySelector('#date_arrival > span');
  if (span) {
    return parseInt(span.getAttribute('data-duration')) * 1000;
  }
  return 0;
};

const getInputInitialValue = () => {
  const date = new Date(Timing.getCurrentServerTime() + getDuration());
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }`;
};

const calcMillisecondsToAttack = (date) => {
  return (
    Math.floor(
      new Date(date).getTime() - getDuration() - Timing.getCurrentServerTime()
    ) + 35
  );
};

const handleStart = () => {
  const ms = calcMillisecondsToAttack(
    document.querySelector('#' + INPUT_ID).value
  );
  if (ms <= 0 || isNaN(ms))
    return UI.ErrorMessage('Wprowadzono nieprawidłowy czas!');

  document.querySelector('#' + START_BUTTON_ID).disabled = true;
  document.querySelector('#' + CANCEL_BUTTON_ID).disabled = false;

  timeoutID = setTimeout(() => {
    document.querySelector('#troop_confirm_go').click();
  }, ms);
};

const handleCancel = () => {
  document.querySelector('#' + START_BUTTON_ID).disabled = false;
  document.querySelector('#' + CANCEL_BUTTON_ID).disabled = true;
  clearTimeout(timeoutID);
};

const render = () => {
  const container = document.createElement('div');
  const label = document.createElement('label');
  label.innerHTML = 'Czas dotarcia ataku:';
  label.style.marginRight = '15px';
  container.appendChild(label);
  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.step = '.001';
  input.value = getInputInitialValue();
  input.id = INPUT_ID;
  container.append(input);

  const buttonContainer = document.createElement('div');
  container.appendChild(buttonContainer);

  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'OK';
  submitButton.addEventListener('click', handleStart);
  submitButton.id = START_BUTTON_ID;
  submitButton.type = 'button';
  buttonContainer.appendChild(submitButton);

  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.disabled = true;
  cancelButton.id = CANCEL_BUTTON_ID;
  cancelButton.type = 'button';
  cancelButton.addEventListener('click', handleCancel);
  buttonContainer.appendChild(cancelButton);

  document.querySelector('.vis').appendChild(container);
};

(function () {
  render();
})();
