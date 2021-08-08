(function () {
  const $c0d320b9a99b0a41aa9ca0954410051e$var$translations = {
    pl_PL: {
      startCoordsPicker: 'Uruchom zbieracza koordynat',
      stopCoordsPicker: 'Zatrzymaj zbieracza koordynat',
      exportedVillages: 'Wyeksportowane wioski',
      cannotDeleteSelectedGroup: 'Nie można usunąć wybranej grupy!',
      select: 'Wybierz',
      delete: 'Usuń',
      add: 'Dodaj',
      save: 'Zapisz',
      groupName: 'Nazwa grupy',
      export: 'Eksport'
    },
    en_DK: {
      startCoordsPicker: 'Start coords picker',
      stopCoordsPicker: 'Stop coords picker',
      exportedVillages: 'Exported villages',
      cannotDeleteSelectedGroup: 'Cannot delete selected group!',
      select: 'Select',
      delete: 'Delete',
      add: 'Add',
      save: 'Save',
      groupName: 'Group name',
      export: 'Export'
    },
    de_DE: {
      startCoordsPicker: 'Starte Koordinaten-Selektor',
      stopCoordsPicker: 'Stoppe Koordinaten-Selektor',
      exportedVillages: 'Exportierte Dörfer',
      cannotDeleteSelectedGroup: 'Gruppe kann nicht gelöscht werden!',
      select: 'Selektieren',
      delete: 'Löschen',
      add: 'Hinzufügen',
      save: 'Speichern',
      groupName: 'Gruppen-Name',
      export: 'Exportieren'
    }
  };
  var $c0d320b9a99b0a41aa9ca0954410051e$export$default = () => $c0d320b9a99b0a41aa9ca0954410051e$var$translations[window.game_data.locale] || $c0d320b9a99b0a41aa9ca0954410051e$var$translations.en_DK;
  const $3d935538f644f492fe681e00121114a4$export$getItem = function getItem(key) {
    let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const json = localStorage.getItem(key);
    let obj = d;
    if (json) {
      obj = JSON.parse(json);
    }
    return obj;
  };
  const $3d935538f644f492fe681e00121114a4$export$setItem = (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
  };
  function $bfe8b11df18d9acc480580699499dd1a$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function $bfe8b11df18d9acc480580699499dd1a$var$_objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        $bfe8b11df18d9acc480580699499dd1a$var$ownKeys(Object(source), true).forEach(function (key) {
          $bfe8b11df18d9acc480580699499dd1a$var$_defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        $bfe8b11df18d9acc480580699499dd1a$var$ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function $bfe8b11df18d9acc480580699499dd1a$var$_defineProperty(obj, key, value) {
    if ((key in obj)) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  // ==UserScript==
  // @name         Map coords picker
  // @namespace    https://github.com/tribalwarshelp/scripts
  // @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
  // @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
  // @version      0.7.6
  // @description  Map coords picker
  // @author       Kichiyaki https://dwysokinski.me/
  // @match        *://*/game.php*screen=map*
  // @grant        none
  // ==/UserScript==
  const $bfe8b11df18d9acc480580699499dd1a$var$LOCAL_STORAGE_KEY = 'kichiyaki_map_coords_picker';
  const $bfe8b11df18d9acc480580699499dd1a$var$container = document.querySelector('#content_value > h2');
  let $bfe8b11df18d9acc480580699499dd1a$var$button;
  let $bfe8b11df18d9acc480580699499dd1a$var$formsContainer;
  let $bfe8b11df18d9acc480580699499dd1a$var$actionsContainer;
  let $bfe8b11df18d9acc480580699499dd1a$var$config = $3d935538f644f492fe681e00121114a4$export$getItem($bfe8b11df18d9acc480580699499dd1a$var$LOCAL_STORAGE_KEY, {
    started: false,
    groups: {
      All: {
        villages: [],
        color: '#ffffff'
      }
    },
    selectedGroup: 'All'
  });
  let $bfe8b11df18d9acc480580699499dd1a$var$intervalID;
  const $bfe8b11df18d9acc480580699499dd1a$var$translations = $c0d320b9a99b0a41aa9ca0954410051e$export$default();
  const $bfe8b11df18d9acc480580699499dd1a$var$saveConfig = () => {
    $3d935538f644f492fe681e00121114a4$export$setItem($bfe8b11df18d9acc480580699499dd1a$var$LOCAL_STORAGE_KEY, $bfe8b11df18d9acc480580699499dd1a$var$config);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$getVillageIDByCoords = (x, y) => {
    const xy = parseInt(("").concat(x).concat(y), 10);
    const village = TWMap.villages[xy];
    if (!village) {
      return NaN;
    }
    return village.id;
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillage = function addBorderToVillage(x, y) {
    let color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'transparent';
    const village = document.querySelector('#map_village_' + $bfe8b11df18d9acc480580699499dd1a$var$getVillageIDByCoords(x, y));
    if (village) {
      village.style.boxSizing = 'border-box';
      village.style.border = color !== 'transparent' ? ("5px solid ").concat(color) : 'none';
    }
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillagesInGroup = function addBorderToVillagesInGroup(name) {
    let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].villages.forEach(village => {
      $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillage(village.x, village.y, color ? color : $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].color);
    });
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$addBorderToSelectedVillages = function addBorderToSelectedVillages() {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    for (let name in $bfe8b11df18d9acc480580699499dd1a$var$config.groups) {
      $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillagesInGroup(name, color);
    }
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$deleteVillageFromOtherGroups = key => {
    for (let name in $bfe8b11df18d9acc480580699499dd1a$var$config.groups) {
      if (name === $bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup) return;
      $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].villages = $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].villages.filter(village => village.key !== key);
    }
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleMapClick = (x, y, e) => {
    e.preventDefault();
    if (isNaN($bfe8b11df18d9acc480580699499dd1a$var$getVillageIDByCoords(x, y))) {
      return;
    }
    const key = ("").concat(x, "|").concat(y);
    if ($bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].villages.some(village => village.key === key)) {
      $bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].villages = $bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].villages.filter(village => village.key !== key);
      $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillage(x, y, 'transparent');
      return;
    }
    $bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].villages = [...$bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].villages, {
      x,
      y,
      key
    }];
    $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillage(x, y, $bfe8b11df18d9acc480580699499dd1a$var$config.groups[$bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup].color);
    $bfe8b11df18d9acc480580699499dd1a$var$deleteVillageFromOtherGroups(key);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$renderForm = (container, group) => {
    const selected = group && group.name !== $bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup;
    const html = ("\n            <input type=\"color\" value=\"").concat(group ? group.color : '', "\" required />\n            <input type=\"text\" required placeholder=\"").concat($bfe8b11df18d9acc480580699499dd1a$var$translations.groupName, "\" value=\"").concat(group ? group.name : '', "\" />\n            <button type=\"submit\">").concat(group ? $bfe8b11df18d9acc480580699499dd1a$var$translations.save : $bfe8b11df18d9acc480580699499dd1a$var$translations.add, "</button>\n            ").concat(group ? ("<button type=\"button\">").concat($bfe8b11df18d9acc480580699499dd1a$var$translations.delete, "</button>") : '', "\n            ").concat(selected ? ("<button class=\"selectButton\" type=\"button\">").concat($bfe8b11df18d9acc480580699499dd1a$var$translations.select, "</button>") : '', "\n    ");
    const form = document.createElement('form');
    form.innerHTML = html;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (group) {
        if (group.name === $bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup) $bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup = e.target[1].value;
        $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillagesInGroup(group.name, e.target[0].value);
        $bfe8b11df18d9acc480580699499dd1a$var$config.groups[e.target[1].value] = $bfe8b11df18d9acc480580699499dd1a$var$_objectSpread($bfe8b11df18d9acc480580699499dd1a$var$_objectSpread({}, $bfe8b11df18d9acc480580699499dd1a$var$config.groups[group.name]), {}, {
          color: e.target[0].value
        });
        if (group.name !== e.target[1].value) delete $bfe8b11df18d9acc480580699499dd1a$var$config.groups[group.name];
      } else {
        $bfe8b11df18d9acc480580699499dd1a$var$config.groups[e.target[1].value] = {
          color: e.target[0].value,
          villages: []
        };
      }
      $bfe8b11df18d9acc480580699499dd1a$var$renderGroups();
    });
    if (group) {
      form.querySelector('button[type="button"]').addEventListener('click', () => {
        if ($bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup === group.name) {
          return UI.ErrorMessage($bfe8b11df18d9acc480580699499dd1a$var$translations.cannotDeleteSelectedGroup);
        }
        $bfe8b11df18d9acc480580699499dd1a$var$addBorderToVillagesInGroup(group.name, 'transparent');
        delete $bfe8b11df18d9acc480580699499dd1a$var$config.groups[group.name];
        form.remove();
      });
      const selectButton = form.querySelector('.selectButton');
      if (selectButton) {
        selectButton.addEventListener('click', e => {
          $bfe8b11df18d9acc480580699499dd1a$var$config.selectedGroup = group.name;
          $bfe8b11df18d9acc480580699499dd1a$var$renderGroups();
        });
      }
    }
    container.appendChild(form);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$renderGroups = () => {
    $bfe8b11df18d9acc480580699499dd1a$var$formsContainer.innerHTML = '';
    for (let name in $bfe8b11df18d9acc480580699499dd1a$var$config.groups) {
      $bfe8b11df18d9acc480580699499dd1a$var$renderForm($bfe8b11df18d9acc480580699499dd1a$var$formsContainer, $bfe8b11df18d9acc480580699499dd1a$var$_objectSpread($bfe8b11df18d9acc480580699499dd1a$var$_objectSpread({}, $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name]), {}, {
        name
      }));
    }
    $bfe8b11df18d9acc480580699499dd1a$var$renderForm($bfe8b11df18d9acc480580699499dd1a$var$formsContainer);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleExportVillages = () => {
    const groups = [];
    for (let name in $bfe8b11df18d9acc480580699499dd1a$var$config.groups) {
      groups.push(("<div style=\"margin-bottom: 30px;\">\n      <h3>").concat(name, "</h3>\n      <textarea cols=30 rows=8 readonly>").concat($bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].villages.map(village => village.key).join(' ').trim(), "</textarea>\n    </div>"));
    }
    const html = ("\n    ").concat(groups.join(''), "\n  ");
    Dialog.show($bfe8b11df18d9acc480580699499dd1a$var$translations.exportedVillages, html);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$renderActions = () => {
    const exportVillages = document.createElement('button');
    exportVillages.innerHTML = $bfe8b11df18d9acc480580699499dd1a$var$translations.export;
    exportVillages.addEventListener('click', $bfe8b11df18d9acc480580699499dd1a$var$handleExportVillages);
    $bfe8b11df18d9acc480580699499dd1a$var$actionsContainer.appendChild(exportVillages);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleSpawnSector = (data, sector) => {
    TWMap.mapHandler.__spawnSector(data, sector);
    $bfe8b11df18d9acc480580699499dd1a$var$addBorderToSelectedVillages();
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleStart = () => {
    TWMap.map.handler.__onClick = TWMap.map.handler.onClick;
    TWMap.map.handler.onClick = $bfe8b11df18d9acc480580699499dd1a$var$handleMapClick;
    TWMap.mapHandler.__spawnSector = TWMap.map.handler.spawnSector;
    TWMap.mapHandler.spawnSector = $bfe8b11df18d9acc480580699499dd1a$var$handleSpawnSector;
    $bfe8b11df18d9acc480580699499dd1a$var$button.innerHTML = $bfe8b11df18d9acc480580699499dd1a$var$translations.stopCoordsPicker;
    $bfe8b11df18d9acc480580699499dd1a$var$renderActions();
    $bfe8b11df18d9acc480580699499dd1a$var$addBorderToSelectedVillages();
    $bfe8b11df18d9acc480580699499dd1a$var$renderGroups();
    $bfe8b11df18d9acc480580699499dd1a$var$intervalID = setInterval($bfe8b11df18d9acc480580699499dd1a$var$saveConfig, 500);
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleStop = () => {
    if (typeof TWMap.map.handler.__onClick === 'function') {
      TWMap.map.handler.onClick = TWMap.map.handler.__onClick;
    }
    if (typeof TWMap.map.handler.__spawnSector === 'function') {
      TWMap.mapHandler.spawnSector = TWMap.map.handler.__spawnSector;
    }
    $bfe8b11df18d9acc480580699499dd1a$var$button.innerHTML = $bfe8b11df18d9acc480580699499dd1a$var$translations.startCoordsPicker;
    $bfe8b11df18d9acc480580699499dd1a$var$formsContainer.innerHTML = '';
    $bfe8b11df18d9acc480580699499dd1a$var$actionsContainer.innerHTML = '';
    $bfe8b11df18d9acc480580699499dd1a$var$addBorderToSelectedVillages('transparent');
    if ($bfe8b11df18d9acc480580699499dd1a$var$intervalID) {
      clearInterval($bfe8b11df18d9acc480580699499dd1a$var$intervalID);
    }
    for (let name in $bfe8b11df18d9acc480580699499dd1a$var$config.groups) {
      $bfe8b11df18d9acc480580699499dd1a$var$config.groups[name].villages = [];
    }
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$handleButtonClick = () => {
    if ($bfe8b11df18d9acc480580699499dd1a$var$config.started) {
      $bfe8b11df18d9acc480580699499dd1a$var$handleStop();
    } else {
      $bfe8b11df18d9acc480580699499dd1a$var$handleStart();
    }
    $bfe8b11df18d9acc480580699499dd1a$var$config.started = !$bfe8b11df18d9acc480580699499dd1a$var$config.started;
    $bfe8b11df18d9acc480580699499dd1a$var$saveConfig();
  };
  const $bfe8b11df18d9acc480580699499dd1a$var$renderUI = () => {
    $bfe8b11df18d9acc480580699499dd1a$var$button = document.createElement('button');
    $bfe8b11df18d9acc480580699499dd1a$var$button.style.marginLeft = '5px';
    $bfe8b11df18d9acc480580699499dd1a$var$button.innerHTML = $bfe8b11df18d9acc480580699499dd1a$var$config.started ? $bfe8b11df18d9acc480580699499dd1a$var$translations.stopCoordsPicker : $bfe8b11df18d9acc480580699499dd1a$var$translations.startCoordsPicker;
    $bfe8b11df18d9acc480580699499dd1a$var$button.addEventListener('click', $bfe8b11df18d9acc480580699499dd1a$var$handleButtonClick);
    $bfe8b11df18d9acc480580699499dd1a$var$container.appendChild($bfe8b11df18d9acc480580699499dd1a$var$button);
    $bfe8b11df18d9acc480580699499dd1a$var$formsContainer = document.createElement('div');
    $bfe8b11df18d9acc480580699499dd1a$var$container.parentElement.insertBefore($bfe8b11df18d9acc480580699499dd1a$var$formsContainer, $bfe8b11df18d9acc480580699499dd1a$var$container.nextSibling);
    $bfe8b11df18d9acc480580699499dd1a$var$actionsContainer = document.createElement('div');
    $bfe8b11df18d9acc480580699499dd1a$var$container.parentElement.insertBefore($bfe8b11df18d9acc480580699499dd1a$var$actionsContainer, $bfe8b11df18d9acc480580699499dd1a$var$container.nextSibling);
    if ($bfe8b11df18d9acc480580699499dd1a$var$config.started) {
      $bfe8b11df18d9acc480580699499dd1a$var$handleStart();
    }
  };
  (function () {
    try {
      $bfe8b11df18d9acc480580699499dd1a$var$renderUI();
    } catch (error) {
      console.log('Map Coords Picker', error);
    }
  })();
})();

