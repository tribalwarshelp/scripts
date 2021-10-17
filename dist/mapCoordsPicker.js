(function () {
function $6a49e4c969cec444$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


function $f1e9793517c51c58$export$2e2bcd8739ae039(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            $6a49e4c969cec444$export$2e2bcd8739ae039(target, key, source[key]);
        });
    }
    return target;
}

function $b1520df0e3a4699c$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}


function $f26b272b176e5476$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {
    };
    var target = $b1520df0e3a4699c$export$2e2bcd8739ae039(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}



const $79a03938b25da972$var$translations = {
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
var $79a03938b25da972$export$2e2bcd8739ae039 = ()=>$79a03938b25da972$var$translations[window.game_data.locale] || $79a03938b25da972$var$translations.en_DK
;


const $362bcac9fa8968ec$export$f92dfeb71e9bb569 = (key, d = {
})=>{
    const json = localStorage.getItem(key);
    let obj = d;
    if (json) obj = JSON.parse(json);
    return obj;
};
const $362bcac9fa8968ec$export$8a8216c44337cd5 = (key, payload)=>{
    localStorage.setItem(key, JSON.stringify(payload));
};


// ==UserScript==
// @name         Map coords picker
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/mapCoordsPicker.js
// @version      0.7.8
// @description  Map coords picker
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const $5889b22941d0d214$var$LOCAL_STORAGE_KEY = 'kichiyaki_map_coords_picker';
const $5889b22941d0d214$var$container = document.querySelector('#content_value > h2');
let $5889b22941d0d214$var$button;
let $5889b22941d0d214$var$formsContainer;
let $5889b22941d0d214$var$actionsContainer;
let $5889b22941d0d214$var$config = $362bcac9fa8968ec$export$f92dfeb71e9bb569($5889b22941d0d214$var$LOCAL_STORAGE_KEY, {
    started: false,
    groups: {
        All: {
            villages: [],
            color: '#ffffff'
        }
    },
    selectedGroup: 'All'
});
let $5889b22941d0d214$var$intervalID;
const $5889b22941d0d214$var$translations = $79a03938b25da972$export$2e2bcd8739ae039();
const $5889b22941d0d214$var$saveConfig = ()=>{
    $362bcac9fa8968ec$export$8a8216c44337cd5($5889b22941d0d214$var$LOCAL_STORAGE_KEY, $5889b22941d0d214$var$config);
};
const $5889b22941d0d214$var$getVillageIDByCoords = (x, y)=>{
    const xy = parseInt(`${x}${y}`, 10);
    const village = TWMap.villages[xy];
    if (!village) return NaN;
    return village.id;
};
const $5889b22941d0d214$var$addBorderToVillage = (x, y, color = 'transparent')=>{
    const village = document.querySelector('#map_village_' + $5889b22941d0d214$var$getVillageIDByCoords(x, y));
    if (village) {
        village.style.boxSizing = 'border-box';
        village.style.border = color !== 'transparent' ? `5px solid ${color}` : 'none';
    }
};
const $5889b22941d0d214$var$addBorderToVillagesInGroup = (name, color = '')=>{
    $5889b22941d0d214$var$config.groups[name].villages.forEach((village)=>{
        $5889b22941d0d214$var$addBorderToVillage(village.x, village.y, color ? color : $5889b22941d0d214$var$config.groups[name].color);
    });
};
const $5889b22941d0d214$var$addBorderToSelectedVillages = (color = '')=>{
    for(let name in $5889b22941d0d214$var$config.groups)$5889b22941d0d214$var$addBorderToVillagesInGroup(name, color);
};
const $5889b22941d0d214$var$deleteVillageFromOtherGroups = (key)=>{
    for(let name in $5889b22941d0d214$var$config.groups){
        if (name === $5889b22941d0d214$var$config.selectedGroup) return;
        $5889b22941d0d214$var$config.groups[name].villages = $5889b22941d0d214$var$config.groups[name].villages.filter((village)=>village.key !== key
        );
    }
};
const $5889b22941d0d214$var$handleMapClick = (x, y, e)=>{
    e.preventDefault();
    if (isNaN($5889b22941d0d214$var$getVillageIDByCoords(x, y))) return;
    const key = `${x}|${y}`;
    if ($5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].villages.some((village)=>village.key === key
    )) {
        $5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].villages = $5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].villages.filter((village)=>village.key !== key
        );
        $5889b22941d0d214$var$addBorderToVillage(x, y, 'transparent');
        return;
    }
    $5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].villages = [
        ...$5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].villages,
        {
            x: x,
            y: y,
            key: key
        }, 
    ];
    $5889b22941d0d214$var$addBorderToVillage(x, y, $5889b22941d0d214$var$config.groups[$5889b22941d0d214$var$config.selectedGroup].color);
    $5889b22941d0d214$var$deleteVillageFromOtherGroups(key);
};
const $5889b22941d0d214$var$renderForm = (container, group)=>{
    const selected = group && group.name !== $5889b22941d0d214$var$config.selectedGroup;
    const html = `
            <input type="color" value="${group ? group.color : ''}" required />
            <input type="text" required placeholder="${$5889b22941d0d214$var$translations.groupName}" value="${group ? group.name : ''}" />
            <button type="submit">${group ? $5889b22941d0d214$var$translations.save : $5889b22941d0d214$var$translations.add}</button>
            ${group ? `<button type="button">${$5889b22941d0d214$var$translations.delete}</button>` : ''}
            ${selected ? `<button class="selectButton" type="button">${$5889b22941d0d214$var$translations.select}</button>` : ''}
    `;
    const form = document.createElement('form');
    form.innerHTML = html;
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if (group) {
            if (group.name === $5889b22941d0d214$var$config.selectedGroup) $5889b22941d0d214$var$config.selectedGroup = e.target[1].value;
            $5889b22941d0d214$var$addBorderToVillagesInGroup(group.name, e.target[0].value);
            $5889b22941d0d214$var$config.groups[e.target[1].value] = $f1e9793517c51c58$export$2e2bcd8739ae039({
            }, $5889b22941d0d214$var$config.groups[group.name], {
                color: e.target[0].value
            });
            if (group.name !== e.target[1].value) delete $5889b22941d0d214$var$config.groups[group.name];
        } else $5889b22941d0d214$var$config.groups[e.target[1].value] = {
            color: e.target[0].value,
            villages: []
        };
        $5889b22941d0d214$var$renderGroups();
    });
    if (group) {
        form.querySelector('button[type="button"]').addEventListener('click', ()=>{
            if ($5889b22941d0d214$var$config.selectedGroup === group.name) return UI.ErrorMessage($5889b22941d0d214$var$translations.cannotDeleteSelectedGroup);
            $5889b22941d0d214$var$addBorderToVillagesInGroup(group.name, 'transparent');
            delete $5889b22941d0d214$var$config.groups[group.name];
            form.remove();
        });
        const selectButton = form.querySelector('.selectButton');
        if (selectButton) selectButton.addEventListener('click', (e)=>{
            $5889b22941d0d214$var$config.selectedGroup = group.name;
            $5889b22941d0d214$var$renderGroups();
        });
    }
    container.appendChild(form);
};
const $5889b22941d0d214$var$renderGroups = ()=>{
    $5889b22941d0d214$var$formsContainer.innerHTML = '';
    for(let name in $5889b22941d0d214$var$config.groups)$5889b22941d0d214$var$renderForm($5889b22941d0d214$var$formsContainer, $f1e9793517c51c58$export$2e2bcd8739ae039({
    }, $5889b22941d0d214$var$config.groups[name], {
        name: name
    }));
    $5889b22941d0d214$var$renderForm($5889b22941d0d214$var$formsContainer);
};
const $5889b22941d0d214$var$handleExportVillages = ()=>{
    const groups = [];
    for(let name in $5889b22941d0d214$var$config.groups)groups.push(`<div style="margin-bottom: 30px;">
      <h3>${name}</h3>
      <textarea cols=30 rows=8 readonly>${$5889b22941d0d214$var$config.groups[name].villages.map((village)=>village.key
    ).join(' ').trim()}</textarea>
    </div>`);
    const html = `
    ${groups.join('')}
  `;
    Dialog.show($5889b22941d0d214$var$translations.exportedVillages, html);
};
const $5889b22941d0d214$var$renderActions = ()=>{
    const exportVillages = document.createElement('button');
    exportVillages.innerHTML = $5889b22941d0d214$var$translations.export;
    exportVillages.addEventListener('click', $5889b22941d0d214$var$handleExportVillages);
    $5889b22941d0d214$var$actionsContainer.appendChild(exportVillages);
};
const $5889b22941d0d214$var$handleSpawnSector = (data, sector)=>{
    TWMap.mapHandler.__spawnSector(data, sector);
    $5889b22941d0d214$var$addBorderToSelectedVillages();
};
const $5889b22941d0d214$var$handleStart = ()=>{
    TWMap.map.handler.__onClick = TWMap.map.handler.onClick;
    TWMap.map.handler.onClick = $5889b22941d0d214$var$handleMapClick;
    TWMap.mapHandler.__spawnSector = TWMap.map.handler.spawnSector;
    TWMap.mapHandler.spawnSector = $5889b22941d0d214$var$handleSpawnSector;
    $5889b22941d0d214$var$button.innerHTML = $5889b22941d0d214$var$translations.stopCoordsPicker;
    $5889b22941d0d214$var$renderActions();
    $5889b22941d0d214$var$addBorderToSelectedVillages();
    $5889b22941d0d214$var$renderGroups();
    $5889b22941d0d214$var$intervalID = setInterval($5889b22941d0d214$var$saveConfig, 500);
};
const $5889b22941d0d214$var$handleStop = ()=>{
    if (typeof TWMap.map.handler.__onClick === 'function') TWMap.map.handler.onClick = TWMap.map.handler.__onClick;
    if (typeof TWMap.map.handler.__spawnSector === 'function') TWMap.mapHandler.spawnSector = TWMap.map.handler.__spawnSector;
    $5889b22941d0d214$var$button.innerHTML = $5889b22941d0d214$var$translations.startCoordsPicker;
    $5889b22941d0d214$var$formsContainer.innerHTML = '';
    $5889b22941d0d214$var$actionsContainer.innerHTML = '';
    $5889b22941d0d214$var$addBorderToSelectedVillages('transparent');
    if ($5889b22941d0d214$var$intervalID) clearInterval($5889b22941d0d214$var$intervalID);
    for(let name in $5889b22941d0d214$var$config.groups)$5889b22941d0d214$var$config.groups[name].villages = [];
};
const $5889b22941d0d214$var$handleButtonClick = ()=>{
    if ($5889b22941d0d214$var$config.started) $5889b22941d0d214$var$handleStop();
    else $5889b22941d0d214$var$handleStart();
    $5889b22941d0d214$var$config.started = !$5889b22941d0d214$var$config.started;
    $5889b22941d0d214$var$saveConfig();
};
const $5889b22941d0d214$var$renderUI = ()=>{
    $5889b22941d0d214$var$button = document.createElement('button');
    $5889b22941d0d214$var$button.style.marginLeft = '5px';
    $5889b22941d0d214$var$button.innerHTML = $5889b22941d0d214$var$config.started ? $5889b22941d0d214$var$translations.stopCoordsPicker : $5889b22941d0d214$var$translations.startCoordsPicker;
    $5889b22941d0d214$var$button.addEventListener('click', $5889b22941d0d214$var$handleButtonClick);
    $5889b22941d0d214$var$container.appendChild($5889b22941d0d214$var$button);
    $5889b22941d0d214$var$formsContainer = document.createElement('div');
    $5889b22941d0d214$var$container.parentElement.insertBefore($5889b22941d0d214$var$formsContainer, $5889b22941d0d214$var$container.nextSibling);
    $5889b22941d0d214$var$actionsContainer = document.createElement('div');
    $5889b22941d0d214$var$container.parentElement.insertBefore($5889b22941d0d214$var$actionsContainer, $5889b22941d0d214$var$container.nextSibling);
    if ($5889b22941d0d214$var$config.started) $5889b22941d0d214$var$handleStart();
};
(function() {
    try {
        $5889b22941d0d214$var$renderUI();
    } catch (error) {
        console.log('Map Coords Picker', error);
    }
})();

})();
