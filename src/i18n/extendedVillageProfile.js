const translations = {
  pl_PL: {
    loaded: 'Załadowano',
    pop: 'Populacja',
    mySupport: 'Moje wsparcie',
    allySupport: 'Wsparcie plemienia',
    total: 'Łącznie',
    action: {
      showEnnoblements: 'Pokaż przejęcia',
      countIncomingSupport: 'Policz nadchodzące wsparcie',
    },
  },
  en_DK: {
    loaded: 'Loaded',
    pop: 'Pop',
    mySupport: 'My support',
    allySupport: 'Ally support',
    total: 'Total',
    action: {
      showEnnoblements: 'Show ennoblements',
      countIncomingSupport: 'Count incoming support',
    },
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
