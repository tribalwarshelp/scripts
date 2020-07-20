const POPUP_WRAPPER_SELECTOR = '.popup_helper';
const POPUP_SELECTOR = '#inline_popup';

export default ({ e, title, html, id } = {}) => {
  inlinePopup(e, id, null, { offset_x: 0, offset_y: 0 }, html, title);
  const popup = document.querySelector(POPUP_SELECTOR);
  if (popup) {
    popup.style.width = 'auto';
    popup.style.maxWidth = '800px';
  }
  const popupWrapper = document.querySelector(POPUP_WRAPPER_SELECTOR);
  if (popupWrapper) {
    popupWrapper.style.width = 'auto';
    popupWrapper.style.position = 'fixed';
    popupWrapper.style.zIndex = '50001';
  }
};
