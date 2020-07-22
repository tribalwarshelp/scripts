const translations = {
  pl_PL: {
    action: {
      showEnnoblements: 'Pokaż przejęcia',
    },
  },
  en_DK: {
    action: {
      showEnnoblements: 'Show ennoblements',
    },
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
