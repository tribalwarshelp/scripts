import isNil from './isNil';

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

  const renderODS = !isNil(stats.rankSup);
  todaysStats.innerHTML = `
      <table width="100%" class="vis">
        <tbody>
          <tr>
            <th colspan="2">
              Today's stats
            </th>
          </tr>
            <tr>
              <td>
                Points:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.points)}">
                ${Math.abs(stats.points).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                Rank:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rank)}">
                ${Math.abs(stats.rank)}
              </td>
            </tr>
            <tr>
              <td>
                Villages:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.villages)}">
                ${Math.abs(stats.villages).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ODA:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreAtt)}">
                ${Math.abs(stats.scoreAtt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ODA Rank:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankAtt)}">
                ${Math.abs(stats.rankAtt)}
              </td>
            </tr>
            <tr>
              <td>
                ODD:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreDef)}">
                ${Math.abs(stats.scoreDef).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ODD Rank:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankDef)}">
                ${Math.abs(stats.rankDef)}
              </td>
            </tr>
            ${
              renderODS
                ? `<tr>
              <td>
                ODS:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreSup)}">
                ${Math.abs(stats.scoreSup).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                ODS Rank:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankSup)}">
                ${Math.abs(stats.rankSup)}
              </td>
            </tr>`
                : ''
            }
            <tr>
              <td>
                OD:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.scoreTotal)}">
                ${Math.abs(stats.scoreTotal).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                OD Rank:
              </td>
              <td style="${getTodaysStatsTdStyle(stats.rankTotal)}">
                ${Math.abs(stats.rankTotal)}
              </td>
            </tr>
      </tbody>
      </table>
  `;
};
