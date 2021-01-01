const translations = {
  pl_PL: {
    loaded: 'Załadowano',
    pop: 'Populacja',
    mySupport: 'Moje wsparcie',
    allySupport: 'Wsparcie plemienia',
    total: 'Łącznie',
    possibleLoyalty: 'Prawdopodobne poparcie',
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    action: {
      linkToTWHelp:
        'Akta wioski - TWHelp - nowa strona ze statystykami i narzędziami',
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
    possibleLoyalty: 'Possible loyalty',
    never: 'Never',
    ennobledAt: 'Ennobled at',
    action: {
      linkToTWHelp:
        'Village file (external link) - TWHelp - A new stat tracking website.',
      showEnnoblements: 'Show ennoblements',
      countIncomingSupport: 'Count incoming support',
    },
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
