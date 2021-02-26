const ATTRIBUTE = 'data-page';

export const getContainerStyles = () => {
  return 'display: flex; flex-direction: row; flex-wrap: wrap;';
};

export const setPage = (el, page = 1) => {
  if (!el instanceof HTMLElement) {
    throw new Error('Expected HTMLElement as the first argument');
  }
  page = parseInt(page);
  if (typeof page !== 'number' || isNaN(page)) {
    throw new Error('Expected number or string as the second argument');
  }
  el.setAttribute(ATTRIBUTE, page + '');
};

export const getPage = el => {
  if (!el instanceof HTMLElement) {
    return 0;
  }
  return parseInt(el.getAttribute(ATTRIBUTE));
};

export const calcNumberOfPages = (total, limit) => {
  if (typeof total !== 'number') {
    throw new Error('Expected number as the first argument');
  }
  if (typeof limit !== 'number') {
    throw new Error('Expected number as the second argument');
  }
  return total > 0 ? Math.ceil(total / limit) : 1;
};

export const generatePaginationItems = ({
  total,
  limit,
  marginRight = 3,
  currentPage = 0,
} = {}) => {
  const numberOfPages = calcNumberOfPages(total, limit);
  const paginationItems = [];
  for (let i = 1; i <= numberOfPages; i++) {
    if (i === currentPage) {
      paginationItems.push(
        `<strong style="margin-right: ${marginRight}px">>${i}<</strong>`
      );
    } else {
      paginationItems.push(
        `<a style="margin-right: ${marginRight}px" href="#" ${ATTRIBUTE}="${i}">${i}</a>`
      );
    }
  }
  return paginationItems;
};
