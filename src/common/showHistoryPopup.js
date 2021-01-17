import subDays from 'date-fns/subDays';
import getTranslations from '../i18n/showHistoryPopup';
import showPopup from '../utils/showPopup';
import {
  generatePaginationItems,
  getContainerStyles,
} from '../utils/pagination';
import { formatDate } from '../utils/date';
import * as twutils from '../utils/tribalwars';

const PAGINATION_CONTAINER_ID = 'historyPagination';
const translations = getTranslations();

const addMathSymbol = (v) => {
  return v > 0 ? '+' + v : v;
};

export default (
  e,
  history,
  daily,
  { currentPage = 1, limit = 0, onPageChange = () => {}, tribe = false } = {}
) => {
  const paginationItems = generatePaginationItems({
    total: history.total,
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
          ${tribe ? '' : `<th>${translations.tribe}</th>`}
          <th>
          ${translations.points}
          </th>
          <th>
          ${translations.villages}
          </th>
          ${tribe ? `<th>${translations.members}</th>` : ''}
          <th>
            ${translations.od}
          </th>
          <th>
            ${translations.oda}
          </th>
          <th>
            ${translations.odd}
          </th>
          ${tribe ? '' : `<th>${translations.ods}</th>`}
        </tr>
        ${history.items
          .map((history) => {
            const subtracted =
              subDays(new Date(history.createDate), 1)
                .toISOString()
                .split('.')[0] + 'Z';
            const stats = daily.items.find((stats) => {
              return stats.createDate === subtracted;
            });

            let rowHTML =
              '<tr>' +
              `<td>${formatDate(history.createDate, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}</td>`;
            if (!tribe && history.tribe) {
              rowHTML += `<td><a href="${twutils.buildTribeURL(
                history.tribe.id
              )}">${history.tribe.tag}</a></td>`;
            } else if (!tribe) {
              rowHTML += '<td>-</td>';
            }
            rowHTML +=
              `
              <td title="${stats ? addMathSymbol(stats.points) : ''}">
                ${history.points.toLocaleString()} (<strong>${
                history.rank
              }</strong>)
              </td>
              <td title="${stats ? addMathSymbol(stats.villages) : ''}">
                ${history.totalVillages.toLocaleString()}
              </td>
              ${
                !tribe
                  ? ''
                  : `
                  <td title="${stats ? addMathSymbol(stats.members) : ''}">
                    ${history.totalMembers}
                </td>
              `
              }
              <td title="${stats ? addMathSymbol(stats.scoreTotal) : ''}">
                ${history.scoreTotal.toLocaleString()} (<strong>${
                history.rankTotal
              }</strong>)
              </td>
              <td title="${stats ? addMathSymbol(stats.scoreAtt) : ''}">
                ${history.scoreAtt.toLocaleString()} (<strong>${
                history.rankAtt
              }</strong>)
              </td>
              <td title="${stats ? addMathSymbol(stats.scoreDef) : ''}">
                ${history.scoreDef.toLocaleString()} (<strong>${
                history.rankDef
              }</strong>)
              </td>
              ${
                tribe
                  ? ''
                  : `
                  <td title="${stats ? addMathSymbol(stats.scoreSup) : ''}">
                    ${history.scoreSup.toLocaleString()} (<strong>${
                      history.rankSup
                    }</strong>)
                </td>
              `
              }
            ` + '</tr>';

            return rowHTML;
          })
          .join('')}
      </tbody>
    </table>
  `;

  showPopup({
    e,
    title: translations.title,
    id: 'history',
    html,
  });

  document
    .querySelectorAll('#' + PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', onPageChange);
    });
};
