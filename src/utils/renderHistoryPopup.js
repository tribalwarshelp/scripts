import subDays from 'date-fns/subDays';
import renderPopup from './renderPopup';
import { generatePaginationItems, getContainerStyles } from './pagination';
import formatDate from './formatDate';
import { formatTribeURL } from './tribalwars';

const HISTORY_PAGINATION_CONTAINER_ID = 'historyPagination';

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
    <div style="${getContainerStyles()}" id="${HISTORY_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            Date
          </th>
          ${tribe ? '' : '<th>Tribe</th>'}
          <th>
          Points
          </th>
          <th>
          Villages
          </th>
          ${tribe ? '<th>Members</th>' : ''}
          <th>
            OD
          </th>
          <th>
            ODA
          </th>
          <th>
            ODD
          </th>
          ${tribe ? '' : '<th>ODS</th>'}
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
              rowHTML += `<td><a href="${formatTribeURL(history.tribe.id)}">${
                history.tribe.tag
              }</a></td>`;
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

  renderPopup({
    e,
    title: `History`,
    id: 'history',
    html,
  });

  document
    .querySelectorAll('#' + HISTORY_PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', onPageChange);
    });
};
