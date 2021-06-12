(function () {
  const $3af05e958b2a20a26445518aba292c50$export$API_URI = 'https://api.tribalwarshelp.com/graphql';
  var $3af05e958b2a20a26445518aba292c50$export$default = function () {
    let {query, variables = {}} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return fetch($3af05e958b2a20a26445518aba292c50$export$API_URI, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(_ref => {
      let {data, errors} = _ref;
      if (errors && Array.isArray(errors) && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      return new Promise(resolve => resolve(data));
    });
  };
  const $5adf165e6af4801598a359969d322bf5$var$translations = {
    pl_PL: {
      conquers: 'Przejęcia',
      sideOne: 'Strona 1',
      sideTwo: 'Strona 2',
      difference: 'Różnica',
      tribeTag: 'Skrót plemienia',
      delete: 'Usuń',
      notEnoughTribesSideOne: 'Musisz dodać jakiekolwiek plemię do strony 1.',
      notEnoughTribesSideTwo: 'Musisz dodać jakiekolwiek plemię do strony 2.',
      from: 'Od',
      to: 'Do',
      warStatsGenerator: 'Generator statystyk wojennych',
      generateWarStats: 'Wygeneruj statystyki wojenne',
      addTribe: 'Dodaj plemię',
      devNote: 'Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :).'
    },
    en_DK: {
      conquers: 'Conquers',
      sideOne: 'Side one',
      sideTwo: 'Side two',
      difference: 'Difference',
      tribeTag: 'Tribe tag',
      delete: 'Delete',
      notEnoughTribesSideOne: 'Not enough tribes added to the side one.',
      notEnoughTribesSideTwo: 'Not enough tribes added to the side two.',
      from: 'From',
      to: 'To',
      warStatsGenerator: 'War stats generator',
      generateWarStats: 'Generate war stats',
      addTribe: 'Add tribe',
      devNote: "Information from the author - I've just launched a new stat tracking website, don't forget to check it out :)."
    },
    de_DE: {
      conquers: 'Eroberungen',
      sideOne: 'Partei A',
      sideTwo: 'Partei B',
      difference: 'Differenz',
      tribeTag: 'Stammeskürzel',
      delete: 'Löschen',
      notEnoughTribesSideOne: 'Nicht genügend Stämme hinzugefügt zu Partei A.',
      notEnoughTribesSideTwo: 'Nicht genügend Stämme hinzugefügt zu Partei B.',
      from: 'Von',
      to: 'Zu',
      warStatsGenerator: 'Kriegsstatistik Generator',
      generateWarStats: 'Generiere Statistik',
      addTribe: 'Stamm Hinzufügen',
      devNote: "Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :)."
    }
  };
  var $5adf165e6af4801598a359969d322bf5$export$default = () => $5adf165e6af4801598a359969d322bf5$var$translations[window.game_data.locale] || $5adf165e6af4801598a359969d322bf5$var$translations.en_DK;
  var $075335fbc46b1a64d60d11b353f74662$export$default = () => window.location.host.split('.')[0];
  var $1f14636dcc53402ba1b7661b758ca0aa$export$default = function () {
    let server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return server.substr(0, 2);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$BASE_URL = 'tribalwarshelp.com';
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage = function buildURLToServerPage() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return ("https://").concat(version, ".").concat($d147509fefd1cb8b3b83e8f38f763543$export$BASE_URL, "/server/").concat(server);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile = function buildURLToProfile() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let entity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return ("").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage(version, server), "/").concat(entity, "/").concat(id);
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildPlayerURL = function buildPlayerURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'player');
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildTribeURL = function buildTribeURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'tribe');
  };
  const $d147509fefd1cb8b3b83e8f38f763543$export$buildVillageURL = function buildVillageURL() {
    let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let server = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return $d147509fefd1cb8b3b83e8f38f763543$export$buildURLToProfile(version, server, id, 'village');
  };
  const $6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR = '.popup_box';
  const $6412e4d8722bc72f55b3c382206290ed$export$default = function showPopup() {
    let {html, id, title} = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Dialog.show(id, ("<h3>").concat(title, "</h3>") + html);
    const popup = document.querySelector($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR);
    if (popup) {
      popup.style.width = 'auto';
      popup.style.maxWidth = '1000px';
    }
  };
  // ==UserScript==
  // @name         War stats generator
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
  // @version      0.3.4
  // @description  War stats generator
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=ranking*mode=wars*
  // @grant        none
  // @run-at       document-end
  // ==/UserScript==
  const $1f04f025e20ce30abc71521ae440de01$var$SERVER = $075335fbc46b1a64d60d11b353f74662$export$default();
  const $1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_BUTTON_ID = 'sideOneAdd';
  const $1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_INPUT_CONTAINER_ID = 'sideOneInputs';
  const $1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_BUTTON_ID = 'sideTwoAdd';
  const $1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_INPUT_CONTAINER_ID = 'sideTwoInputs';
  const $1f04f025e20ce30abc71521ae440de01$var$TO_INPUT_ID = 'to';
  const $1f04f025e20ce30abc71521ae440de01$var$FROM_INPUT_ID = 'from';
  const $1f04f025e20ce30abc71521ae440de01$var$RESULT_CONTAINER_ID = 'warStatsResult';
  const $1f04f025e20ce30abc71521ae440de01$var$TRIBES_QUERY = "\n  query tribes($server: String!, $filter: TribeFilter) {\n    tribes(server: $server, filter: $filter) {\n      items {\n        id\n        tag\n      }\n    }\n  }\n";
  const $1f04f025e20ce30abc71521ae440de01$var$ENNOBLEMENTS_QUERY = "\n  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {\n    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {\n      total\n    }\n    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {\n      total\n    }\n  }\n";
  const $1f04f025e20ce30abc71521ae440de01$var$translations = $5adf165e6af4801598a359969d322bf5$export$default();
  const $1f04f025e20ce30abc71521ae440de01$var$showResult = function showResult() {
    let sideOne = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let sideTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const html = ("\n    <div>\n      <h3>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.conquers, ":</h3>\n      <p style=\"margin: 0;\"><strong>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.sideOne, ": ").concat(sideOne, "</strong></p>\n      <p style=\"margin: 0;\"><strong>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.sideTwo, ": ").concat(sideTwo, "</strong></p>\n      <p style=\"margin: 0;\"><strong>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.difference, ": ").concat(Math.abs(sideOne - sideTwo), "</strong></p>\n      <hr style=\"margin: 10px 0;\" />\n    </div>\n  ");
    document.querySelector('#' + $1f04f025e20ce30abc71521ae440de01$var$RESULT_CONTAINER_ID).innerHTML = html;
  };
  const $1f04f025e20ce30abc71521ae440de01$var$createAddTribeHandler = container => {
    return () => {
      const div = document.createElement('div');
      div.innerHTML = ("\n        <label>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.tribeTag, ": </label>\n        <input type=\"text\" required />\n        <button type=\"button\" class=\"btn\">").concat($1f04f025e20ce30abc71521ae440de01$var$translations.delete, "</button>\n    ");
      div.querySelector('button').addEventListener('click', () => {
        div.remove();
      });
      container.appendChild(div);
    };
  };
  const $1f04f025e20ce30abc71521ae440de01$var$handleFormSubmit = async e => {
    e.preventDefault();
    const sideOneTags = [];
    const sideTwoTags = [];
    e.target.querySelectorAll(("#").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_INPUT_CONTAINER_ID, " input")).forEach(el => {
      if (el.value.trim()) {
        sideOneTags.push(el.value.trim());
      }
    });
    e.target.querySelectorAll(("#").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_INPUT_CONTAINER_ID, " input")).forEach(el => {
      if (el.value.trim()) {
        sideTwoTags.push(el.value.trim());
      }
    });
    console.log('sideOneTags', sideOneTags, 'sideTwoTags', sideTwoTags);
    if (sideOneTags.length === 0) return UI.ErrorMessage($1f04f025e20ce30abc71521ae440de01$var$translations.notEnoughTribesSideOne);
    if (sideTwoTags.length === 0) return UI.ErrorMessage($1f04f025e20ce30abc71521ae440de01$var$translations.notEnoughTribesSideTwo);
    const fromInputs = document.querySelectorAll(("").concat($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR, " form #").concat($1f04f025e20ce30abc71521ae440de01$var$FROM_INPUT_ID, " input"));
    let ennobledAtGTE;
    if (fromInputs.length === 2 && fromInputs[0].value && fromInputs[1].value) {
      ennobledAtGTE = new Date(("").concat(fromInputs[0].value, "T").concat(fromInputs[1].value, ":00"));
    }
    const toInputs = document.querySelectorAll(("").concat($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR, " form #").concat($1f04f025e20ce30abc71521ae440de01$var$TO_INPUT_ID, " input"));
    let ennobledAtLTE;
    if (toInputs.length === 2 && toInputs[0].value && toInputs[1].value) {
      ennobledAtLTE = new Date(("").concat(toInputs[0].value, "T").concat(toInputs[1].value, ":00"));
    }
    e.target.querySelectorAll('button').forEach(button => {
      button.disabled = true;
    });
    try {
      const {tribes} = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $1f04f025e20ce30abc71521ae440de01$var$TRIBES_QUERY,
        variables: {
          server: $1f04f025e20ce30abc71521ae440de01$var$SERVER,
          filter: {
            tag: [...sideOneTags, ...sideTwoTags]
          }
        }
      });
      const sideOneTribes = tribes.items.filter(item => sideOneTags.some(tag => item.tag === tag)).map(tribe => tribe.id);
      const sideTwoTribes = tribes.items.filter(item => sideTwoTags.some(tag => item.tag === tag)).map(tribe => tribe.id);
      const {sideOneEnnoblements, sideTwoEnnoblements} = await $3af05e958b2a20a26445518aba292c50$export$default({
        query: $1f04f025e20ce30abc71521ae440de01$var$ENNOBLEMENTS_QUERY,
        variables: {
          server: $1f04f025e20ce30abc71521ae440de01$var$SERVER,
          sideOneFilter: {
            newOwnerTribeID: sideOneTribes,
            oldOwnerTribeID: sideTwoTribes,
            ennobledAtGTE,
            ennobledAtLTE
          },
          sideTwoFilter: {
            newOwnerTribeID: sideTwoTribes,
            oldOwnerTribeID: sideOneTribes,
            ennobledAtGTE,
            ennobledAtLTE
          }
        }
      });
      console.log('sideOneEnnoblements', sideOneEnnoblements, 'sideTwoEnnoblements', sideTwoEnnoblements);
      $1f04f025e20ce30abc71521ae440de01$var$showResult(sideOneEnnoblements.total, sideTwoEnnoblements.total);
    } catch (error) {
      console.log('handleFormSubmit', error);
    }
    e.target.querySelectorAll('button').forEach(button => {
      button.disabled = false;
    });
  };
  const $1f04f025e20ce30abc71521ae440de01$var$showWarStatsForm = e => {
    const html = ("\n        <form>\n        <h1 style=\"margin-bottom: 0px; text-align: center;\"><a href=\"").concat($d147509fefd1cb8b3b83e8f38f763543$export$buildURLToServerPage($1f14636dcc53402ba1b7661b758ca0aa$export$default($1f04f025e20ce30abc71521ae440de01$var$SERVER), $1f04f025e20ce30abc71521ae440de01$var$SERVER), "\">TWHelp</a></h1>\n            <h3 style=\"margin-bottom: 10px; margin-top: 0;\">").concat($1f04f025e20ce30abc71521ae440de01$var$translations.devNote, "</h3>\n            <div id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$RESULT_CONTAINER_ID, "\">\n            </div>\n            <div style=\"margin-bottom: 10px;\">\n              <div id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$FROM_INPUT_ID, "\">\n                <label>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.from, ": </label>\n                <input type=\"date\" required />\n                <input type=\"time\" required />\n              </div>\n              <div id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$TO_INPUT_ID, "\">\n                <label>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.to, ": </label>\n                <input type=\"date\" required />\n                <input type=\"time\" required />\n              </div>\n            </div>\n            <div style=\"display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;\">\n                <div>\n                    <h3>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.sideOne, "</h3>\n                    <div id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_INPUT_CONTAINER_ID, "\">\n                    </div>\n                    <button id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_BUTTON_ID, "\" class=\"btn\" type=\"button\">").concat($1f04f025e20ce30abc71521ae440de01$var$translations.addTribe, "</button>\n                </div>\n                <div style=\"margin: 0 5px;\"></div>\n                <div>\n                    <h3>").concat($1f04f025e20ce30abc71521ae440de01$var$translations.sideTwo, "</h3>\n                    <div id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_INPUT_CONTAINER_ID, "\">\n                    </div>\n                    <button id=\"").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_BUTTON_ID, "\" class=\"btn\" type=\"button\">").concat($1f04f025e20ce30abc71521ae440de01$var$translations.addTribe, "</button>\n                </div>\n            </div>\n            <div style=\"text-align: center;\">\n              <button class=\"btn\" type=\"submit\">").concat($1f04f025e20ce30abc71521ae440de01$var$translations.generateWarStats, "</button>\n            </div>\n        </form>\n    ");
    $6412e4d8722bc72f55b3c382206290ed$export$default({
      title: $1f04f025e20ce30abc71521ae440de01$var$translations.warStatsGenerator,
      id: 'warStats',
      html,
      e
    });
    document.querySelector(("").concat($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR, " form #").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_BUTTON_ID)).addEventListener('click', $1f04f025e20ce30abc71521ae440de01$var$createAddTribeHandler(document.querySelector('#' + $1f04f025e20ce30abc71521ae440de01$var$SIDE_ONE_INPUT_CONTAINER_ID)));
    document.querySelector(("").concat($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR, " form #").concat($1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_BUTTON_ID)).addEventListener('click', $1f04f025e20ce30abc71521ae440de01$var$createAddTribeHandler(document.querySelector('#' + $1f04f025e20ce30abc71521ae440de01$var$SIDE_TWO_INPUT_CONTAINER_ID)));
    document.querySelector(("").concat($6412e4d8722bc72f55b3c382206290ed$export$POPUP_SELECTOR, " form")).addEventListener('submit', $1f04f025e20ce30abc71521ae440de01$var$handleFormSubmit);
  };
  const $1f04f025e20ce30abc71521ae440de01$var$renderUI = () => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.innerHTML = $1f04f025e20ce30abc71521ae440de01$var$translations.generateWarStats;
    button.addEventListener('click', $1f04f025e20ce30abc71521ae440de01$var$showWarStatsForm);
    div.appendChild(button);
    document.querySelector('#wars_ranking_table').parentElement.prepend(div);
  };
  (function () {
    try {
      $1f04f025e20ce30abc71521ae440de01$var$renderUI();
    } catch (error) {
      console.log('war stats', error);
    }
  })();
})();

