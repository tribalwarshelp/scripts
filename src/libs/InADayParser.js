import getIDFromURL from '../utils/getIDFromURL';

export default class InADayParser {
  constructor(html = '', filters = {}) {
    this.dom = new DOMParser().parseFromString(html, 'text/html');
    this.trs = this.dom.querySelectorAll('#in_a_day_ranking_table tbody tr');
    this.filters = filters;
  }
  isValidRow(row) {
    if (!row) {
      return false;
    }
    if (this.filters.playerID && row.playerID !== this.filters.playerID) {
      return false;
    }
    if (
      this.filters.tribes &&
      Array.isArray(this.filters.tribes) &&
      !this.filters.tribes.some(tribe => tribe === row.tribe)
    ) {
      return false;
    }
    return true;
  }
  parseRow(row) {
    if (!row || !row instanceof HTMLTableRowElement) {
      return undefined;
    }
    let obj = {};
    obj.rank = parseInt(row.children[0].innerText.trim());
    obj.name = row.children[1].innerText.trim();
    obj.playerID = getIDFromURL(
      row.children[1].querySelector('a').getAttribute('href')
    );
    obj.tribe = row.children[2].innerText.trim();
    obj.tribeID = 0;
    if (obj.tribe) {
      obj.tribeID = getIDFromURL(
        row.children[2].querySelector('a').getAttribute('href')
      );
    }
    obj.score = parseInt(row.children[3].innerText.trim().replace(/\./g, ''));
    obj.date = row.children[4].innerText.trim();
    return obj;
  }
  parse() {
    const result = [];
    for (let i = 1; i < this.trs.length; i++) {
      const row = this.trs[i];
      const parsed = this.parseRow(row);
      if (this.isValidRow(parsed)) {
        result.push(parsed);
      }
    }
    return result;
  }
}
