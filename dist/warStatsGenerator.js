(function () {
const $902f167bfdc7b30b$export$fb18762d0c18fa09 = 'https://api.tribalwarshelp.com/graphql';
var $902f167bfdc7b30b$export$2e2bcd8739ae039 = ({ query: query , variables: variables = {
}  } = {
})=>{
    return fetch($902f167bfdc7b30b$export$fb18762d0c18fa09, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            variables: variables
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        return res.json();
    }).then(({ data: data , errors: errors  })=>{
        if (errors && Array.isArray(errors) && errors.length > 0) throw new Error(errors[0].message);
        return new Promise((resolve)=>resolve(data)
        );
    });
};


const $dd2f3b715639879a$var$translations = {
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
        devNote: `Information from the author - I've just launched a new stat tracking website, don't forget to check it out :).`
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
        devNote: `Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :).`
    }
};
var $dd2f3b715639879a$export$2e2bcd8739ae039 = ()=>$dd2f3b715639879a$var$translations[window.game_data.locale] || $dd2f3b715639879a$var$translations.en_DK
;


var $9412d55e353d4b8b$export$2e2bcd8739ae039 = ()=>window.location.host.split('.')[0]
;


var $5b3edb3901c8177a$export$2e2bcd8739ae039 = (server = '')=>server.substr(0, 2)
;


const $f3b273bd698d94bc$export$ca6dda5263526f75 = 'tribalwarshelp.com';
const $f3b273bd698d94bc$export$5d5850cc00079a21 = (version = '', server = '')=>{
    return `https://${version}.${$f3b273bd698d94bc$export$ca6dda5263526f75}/server/${server}`;
};
const $f3b273bd698d94bc$export$a4588dcb88e3f9db = (version = '', server = '', id = 0, entity = '')=>{
    return `${$f3b273bd698d94bc$export$5d5850cc00079a21(version, server)}/${entity}/${id}`;
};
const $f3b273bd698d94bc$export$3df7b9b48f38839e = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'player');
};
const $f3b273bd698d94bc$export$7345792e21cfc457 = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'tribe');
};
const $f3b273bd698d94bc$export$e537a41a0fc85cc5 = (version = '', server = '', id = 0)=>{
    return $f3b273bd698d94bc$export$a4588dcb88e3f9db(version, server, id, 'village');
};


const $20636c16dad2c11a$export$21d4bed11ae27f0b = '.popup_box';
const $20636c16dad2c11a$var$showPopup = ({ html: html , id: id , title: title  } = {
})=>{
    Dialog.show(id, `<h3>${title}</h3>` + html);
    const popup = document.querySelector($20636c16dad2c11a$export$21d4bed11ae27f0b);
    if (popup) {
        popup.style.width = 'auto';
        popup.style.maxWidth = '1000px';
    }
};
var $20636c16dad2c11a$export$2e2bcd8739ae039 = $20636c16dad2c11a$var$showPopup;


// ==UserScript==
// @name         War stats generator
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/warStatsGenerator.js
// @version      0.3.5
// @description  War stats generator
// @author       Kichiyaki https://dwysokinski.me/
// @match        *://*/game.php*screen=ranking*mode=wars*
// @grant        none
// @run-at       document-end
// ==/UserScript==
const $813af46890790f24$var$SERVER = $9412d55e353d4b8b$export$2e2bcd8739ae039();
const $813af46890790f24$var$SIDE_ONE_BUTTON_ID = 'sideOneAdd';
const $813af46890790f24$var$SIDE_ONE_INPUT_CONTAINER_ID = 'sideOneInputs';
const $813af46890790f24$var$SIDE_TWO_BUTTON_ID = 'sideTwoAdd';
const $813af46890790f24$var$SIDE_TWO_INPUT_CONTAINER_ID = 'sideTwoInputs';
const $813af46890790f24$var$TO_INPUT_ID = 'to';
const $813af46890790f24$var$FROM_INPUT_ID = 'from';
const $813af46890790f24$var$RESULT_CONTAINER_ID = 'warStatsResult';
const $813af46890790f24$var$TRIBES_QUERY = `
  query tribes($server: String!, $filter: TribeFilter) {
    tribes(server: $server, filter: $filter) {
      items {
        id
        tag
      }
    }
  }
`;
const $813af46890790f24$var$ENNOBLEMENTS_QUERY = `
  query ennoblements($server: String!, $sideOneFilter: EnnoblementFilter, $sideTwoFilter: EnnoblementFilter) {
    sideOneEnnoblements: ennoblements(server: $server, filter: $sideOneFilter) {
      total
    }
    sideTwoEnnoblements: ennoblements(server: $server, filter: $sideTwoFilter) {
      total
    }
  }
`;
const $813af46890790f24$var$translations = $dd2f3b715639879a$export$2e2bcd8739ae039();
const $813af46890790f24$var$showResult = (sideOne = 0, sideTwo = 0)=>{
    const html = `
    <div>
      <h3>${$813af46890790f24$var$translations.conquers}:</h3>
      <p style="margin: 0;"><strong>${$813af46890790f24$var$translations.sideOne}: ${sideOne}</strong></p>
      <p style="margin: 0;"><strong>${$813af46890790f24$var$translations.sideTwo}: ${sideTwo}</strong></p>
      <p style="margin: 0;"><strong>${$813af46890790f24$var$translations.difference}: ${Math.abs(sideOne - sideTwo)}</strong></p>
      <hr style="margin: 10px 0;" />
    </div>
  `;
    document.querySelector('#' + $813af46890790f24$var$RESULT_CONTAINER_ID).innerHTML = html;
};
const $813af46890790f24$var$createAddTribeHandler = (container)=>{
    return ()=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <label>${$813af46890790f24$var$translations.tribeTag}: </label>
        <input type="text" required />
        <button type="button" class="btn">${$813af46890790f24$var$translations.delete}</button>
    `;
        div.querySelector('button').addEventListener('click', ()=>{
            div.remove();
        });
        container.appendChild(div);
    };
};
const $813af46890790f24$var$handleFormSubmit = async (e)=>{
    e.preventDefault();
    const sideOneTags = [];
    const sideTwoTags = [];
    e.target.querySelectorAll(`#${$813af46890790f24$var$SIDE_ONE_INPUT_CONTAINER_ID} input`).forEach((el)=>{
        if (el.value.trim()) sideOneTags.push(el.value.trim());
    });
    e.target.querySelectorAll(`#${$813af46890790f24$var$SIDE_TWO_INPUT_CONTAINER_ID} input`).forEach((el)=>{
        if (el.value.trim()) sideTwoTags.push(el.value.trim());
    });
    console.log('sideOneTags', sideOneTags, 'sideTwoTags', sideTwoTags);
    if (sideOneTags.length === 0) return UI.ErrorMessage($813af46890790f24$var$translations.notEnoughTribesSideOne);
    if (sideTwoTags.length === 0) return UI.ErrorMessage($813af46890790f24$var$translations.notEnoughTribesSideTwo);
    const fromInputs = document.querySelectorAll(`${$20636c16dad2c11a$export$21d4bed11ae27f0b} form #${$813af46890790f24$var$FROM_INPUT_ID} input`);
    let ennobledAtGTE;
    if (fromInputs.length === 2 && fromInputs[0].value && fromInputs[1].value) ennobledAtGTE = new Date(`${fromInputs[0].value}T${fromInputs[1].value}:00`);
    const toInputs = document.querySelectorAll(`${$20636c16dad2c11a$export$21d4bed11ae27f0b} form #${$813af46890790f24$var$TO_INPUT_ID} input`);
    let ennobledAtLTE;
    if (toInputs.length === 2 && toInputs[0].value && toInputs[1].value) ennobledAtLTE = new Date(`${toInputs[0].value}T${toInputs[1].value}:00`);
    e.target.querySelectorAll('button').forEach((button)=>{
        button.disabled = true;
    });
    try {
        const { tribes: tribes  } = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $813af46890790f24$var$TRIBES_QUERY,
            variables: {
                server: $813af46890790f24$var$SERVER,
                filter: {
                    tag: [
                        ...sideOneTags,
                        ...sideTwoTags
                    ]
                }
            }
        });
        const sideOneTribes = tribes.items.filter((item)=>sideOneTags.some((tag)=>item.tag === tag
            )
        ).map((tribe)=>tribe.id
        );
        const sideTwoTribes = tribes.items.filter((item)=>sideTwoTags.some((tag)=>item.tag === tag
            )
        ).map((tribe)=>tribe.id
        );
        const { sideOneEnnoblements: sideOneEnnoblements , sideTwoEnnoblements: sideTwoEnnoblements  } = await $902f167bfdc7b30b$export$2e2bcd8739ae039({
            query: $813af46890790f24$var$ENNOBLEMENTS_QUERY,
            variables: {
                server: $813af46890790f24$var$SERVER,
                sideOneFilter: {
                    newOwnerTribeID: sideOneTribes,
                    oldOwnerTribeID: sideTwoTribes,
                    ennobledAtGTE: ennobledAtGTE,
                    ennobledAtLTE: ennobledAtLTE
                },
                sideTwoFilter: {
                    newOwnerTribeID: sideTwoTribes,
                    oldOwnerTribeID: sideOneTribes,
                    ennobledAtGTE: ennobledAtGTE,
                    ennobledAtLTE: ennobledAtLTE
                }
            }
        });
        console.log('sideOneEnnoblements', sideOneEnnoblements, 'sideTwoEnnoblements', sideTwoEnnoblements);
        $813af46890790f24$var$showResult(sideOneEnnoblements.total, sideTwoEnnoblements.total);
    } catch (error) {
        console.log('handleFormSubmit', error);
    }
    e.target.querySelectorAll('button').forEach((button)=>{
        button.disabled = false;
    });
};
const $813af46890790f24$var$showWarStatsForm = (e)=>{
    const html = `
        <form>
        <h1 style="margin-bottom: 0px; text-align: center;"><a href="${$f3b273bd698d94bc$export$5d5850cc00079a21($5b3edb3901c8177a$export$2e2bcd8739ae039($813af46890790f24$var$SERVER), $813af46890790f24$var$SERVER)}">TWHelp</a></h1>
            <h3 style="margin-bottom: 10px; margin-top: 0;">${$813af46890790f24$var$translations.devNote}</h3>
            <div id="${$813af46890790f24$var$RESULT_CONTAINER_ID}">
            </div>
            <div style="margin-bottom: 10px;">
              <div id="${$813af46890790f24$var$FROM_INPUT_ID}">
                <label>${$813af46890790f24$var$translations.from}: </label>
                <input type="date" required />
                <input type="time" required />
              </div>
              <div id="${$813af46890790f24$var$TO_INPUT_ID}">
                <label>${$813af46890790f24$var$translations.to}: </label>
                <input type="date" required />
                <input type="time" required />
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; min-width: 800px;">
                <div>
                    <h3>${$813af46890790f24$var$translations.sideOne}</h3>
                    <div id="${$813af46890790f24$var$SIDE_ONE_INPUT_CONTAINER_ID}">
                    </div>
                    <button id="${$813af46890790f24$var$SIDE_ONE_BUTTON_ID}" class="btn" type="button">${$813af46890790f24$var$translations.addTribe}</button>
                </div>
                <div style="margin: 0 5px;"></div>
                <div>
                    <h3>${$813af46890790f24$var$translations.sideTwo}</h3>
                    <div id="${$813af46890790f24$var$SIDE_TWO_INPUT_CONTAINER_ID}">
                    </div>
                    <button id="${$813af46890790f24$var$SIDE_TWO_BUTTON_ID}" class="btn" type="button">${$813af46890790f24$var$translations.addTribe}</button>
                </div>
            </div>
            <div style="text-align: center;">
              <button class="btn" type="submit">${$813af46890790f24$var$translations.generateWarStats}</button>
            </div>
        </form>
    `;
    $20636c16dad2c11a$export$2e2bcd8739ae039({
        title: $813af46890790f24$var$translations.warStatsGenerator,
        id: 'warStats',
        html: html,
        e: e
    });
    document.querySelector(`${$20636c16dad2c11a$export$21d4bed11ae27f0b} form #${$813af46890790f24$var$SIDE_ONE_BUTTON_ID}`).addEventListener('click', $813af46890790f24$var$createAddTribeHandler(document.querySelector('#' + $813af46890790f24$var$SIDE_ONE_INPUT_CONTAINER_ID)));
    document.querySelector(`${$20636c16dad2c11a$export$21d4bed11ae27f0b} form #${$813af46890790f24$var$SIDE_TWO_BUTTON_ID}`).addEventListener('click', $813af46890790f24$var$createAddTribeHandler(document.querySelector('#' + $813af46890790f24$var$SIDE_TWO_INPUT_CONTAINER_ID)));
    document.querySelector(`${$20636c16dad2c11a$export$21d4bed11ae27f0b} form`).addEventListener('submit', $813af46890790f24$var$handleFormSubmit);
};
const $813af46890790f24$var$renderUI = ()=>{
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.innerHTML = $813af46890790f24$var$translations.generateWarStats;
    button.addEventListener('click', $813af46890790f24$var$showWarStatsForm);
    div.appendChild(button);
    document.querySelector('#wars_ranking_table').parentElement.prepend(div);
};
(function() {
    try {
        $813af46890790f24$var$renderUI();
    } catch (error) {
        console.log('war stats', error);
    }
})();

})();
