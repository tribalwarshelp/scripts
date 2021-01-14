export const POPUP_SELECTOR = '.popup_box';

const showPopup = ({ html, id, title } = {}) => {
  Dialog.show(id, `<h3>${title}</h3>` + html);
  const popup = document.querySelector(POPUP_SELECTOR);
  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '1000px';
  }
};

export default showPopup;
