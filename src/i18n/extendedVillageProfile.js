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
      linkToTWHelp: 'Akta wioski (TWHelp)',
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
      linkToTWHelp: 'Village file (TWHelp)',
      showEnnoblements: 'Show ennoblements',
      countIncomingSupport: 'Count incoming support',
    },
  },
  de_DE: {
    loaded: 'Geladen',
    pop: 'Pop',
    mySupport: 'Meine Unterstützung',
    allySupport: 'Verbündete Unterstützung',
    total: 'Total',
    possibleLoyalty: 'Mögliche Zustimmung',
    never: 'Niemals',
    ennobledAt: 'Geadelt am',
    action: {
      linkToTWHelp: 'Dorfakte (TWHelp)',
      showEnnoblements: 'Zeige Adelungen',
      countIncomingSupport: 'Zähle ankommende Unterstützung'
    },
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
