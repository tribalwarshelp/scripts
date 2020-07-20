import getTranslations from '../i18n/renderTodaysStats';
import isNil from './isNil';

const translations = getTranslations();

const getTodaysStatsTdStyle = (value) => {
  const statIncreaseStyle = 'color: #000; background-color: #0f0';
  const statDecreaseStyle = 'color: #000; background-color: #f00';
  const defaultStyle = 'color: #000; background-color: #808080';

  return value > 0
    ? statIncreaseStyle
    : value < 0
    ? statDecreaseStyle
    : defaultStyle;
};

export default (container, stats) => {
  let todaysStats = container.querySelector('#todaysStats');
  if (!todaysStats) {
    todaysStats = document.createElement('div');
    todaysStats.id = 'todaysStats';
    todaysStats.width = '100%';
    container.prepend(todaysStats);
  }

  const player = !isNil(stats.rankSup);
  todaysStats.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              ${translations.title}
            </th>
          </tr>
            <tr>
              <td>
                ${translations.points}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.points)}">
                ${Math.abs(stats.points).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.rank}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rank)}">
                ${Math.abs(stats.rank)}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.villages}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.villages)}">
                ${Math.abs(stats.villages).toLocaleString()}
              </td>
            </tr>
            ${
              !player
                ? `<tr>
              <td>
                ${translations.members}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.members)}">
                ${Math.abs(stats.members)}
              </td>
            </tr>`
                : ''
            }
            <tr>
              <td>
                ${translations.oda}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreAtt)}">
                ${Math.abs(stats.scoreAtt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.odaRank}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankAtt)}">
                ${Math.abs(stats.rankAtt)}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.odd}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreDef)}">
                ${Math.abs(stats.scoreDef).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.oddRank}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankDef)}">
                ${Math.abs(stats.rankDef)}
              </td>
            </tr>
            ${
              player
                ? `<tr>
              <td>
                ${translations.ods}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreSup)}">
                ${Math.abs(stats.scoreSup).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.odsRank}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankSup)}">
                ${Math.abs(stats.rankSup)}
              </td>
            </tr>`
                : ''
            }
            <tr>
              <td>
                ${translations.od}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreTotal)}">
                ${Math.abs(stats.scoreTotal).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ${translations.odRank}:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankTotal)}">
                ${Math.abs(stats.rankTotal)}
              </td>
            </tr>
      </tbody>
      </table>
  `;
};
