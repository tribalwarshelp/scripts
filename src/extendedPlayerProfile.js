// ==UserScript==
// @name         Extended Player Profile
// @namespace    https://gist.github.com/Kichiyaki/3c273582cc6856512e22c86c375f795a
// @version      0.1
// @description  Extended Player Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*.plemiona.pl/game.php*&screen=info_player*
// @match        *://*.tribalwars.net/game.php*&screen=info_player*
// @grant        none
// ==/UserScript==

const SERVER = window.location.host.split('.')[0];
const PLAYER_ID = parseInt(
  new URLSearchParams(window.location.search).get('id')
);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_player_profile' + PLAYER_ID;
const PLAYER_QUERY = `
    query player($server: String!, $id: Int!) {
        player(server: $server, id: $id) {
            id
            servers
            nameChanges {
                oldName
                newName
                changedOn
            }
            dailyGrowth
        }
    }
`;
