import getTranslations from '../i18n/showEnnoblementsPopup';
import {
  generatePaginationItems,
  getContainerStyles,
} from '../utils/pagination';
import showPopup from '../utils/showPopup';
import formatDate from '../utils/formatDate';
import {
  formatTribeURL,
  formatPlayerURL as formatPlayerURLTribalWars,
  formatVillageName,
  formatVillageURL,
} from '../utils/tribalwars';

const PAGINATION_CONTAINER_ID = 'ennoblementsPagination';
const translations = getTranslations();

const getPlayerTd = (player, tribe) => {
  if (player) {
    return `<td><a href="${formatPlayerURLTribalWars(player.id)}">${
      player.name
    } (${
      tribe ? `<a href="${formatTribeURL(tribe.id)}">${tribe.tag}</a>` : '-'
    })</a></td>`;
  }
  return '<td>-</td>';
};

export default (
  e,
  ennoblements,
  { limit = 0, currentPage = 1, onPageChange = () => {} } = {}
) => {
  const paginationItems = generatePaginationItems({
    total: ennoblements.total,
    limit,
    currentPage,
  });
  const html = `
    <div style="${getContainerStyles()}" id="${PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            ${translations.date}
          </th>
          <th>
            ${translations.village}
          </th>
          <th>
            ${translations.newOwner}
          </th>
          <th>
            ${translations.oldOwner}
          </th>
        </tr>
        ${ennoblements.items
          .map((ennoblement) => {
            let rowHTML =
              '<tr>' + `<td>${formatDate(ennoblement.ennobledAt)}</td>`;
            if (ennoblement.village) {
              rowHTML += `<td><a href="${formatVillageURL(
                ennoblement.village.id
              )}">${formatVillageName(
                ennoblement.village.name,
                ennoblement.village.x,
                ennoblement.village.y
              )}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }

            rowHTML += getPlayerTd(
              ennoblement.newOwner,
              ennoblement.newOwnerTribe
            );
            rowHTML += getPlayerTd(
              ennoblement.oldOwner,
              ennoblement.oldOwnerTribe
            );

            return rowHTML + '</tr>';
          })
          .join('')}
      </tbody>
    </table>
  `;

  showPopup({
    e,
    title: translations.title,
    id: 'ennoblements',
    html,
  });

  document
    .querySelectorAll('#' + PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', onPageChange);
    });
};
