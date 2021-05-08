const translations = {
  pl_PL: {
    rename: 'Zmień',
    name: 'Nazwa',
  },
  en_DK: {
    rename: 'Rename',
    name: 'Name',
  },
  de_DE: {
    rename: 'Umbenennen',
    name: 'Name',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
