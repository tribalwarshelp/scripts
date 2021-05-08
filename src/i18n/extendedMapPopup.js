const translations = {
  pl_PL: {
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    possibleLoyalty: 'Prawdopodobne poparcie',
    canSendNoble: 'Można wysłać szlachcica',
    yes: 'Tak',
    no: 'Nie',
  },
  en_DK: {
    ennobledAt: 'Ennobled at',
    never: 'Never',
    possibleLoyalty: 'Possible loyalty',
    canSendNoble: 'Can send noble',
    yes: 'Yes',
    no: 'No',
  },
  de_DE: {
    ennobledAt: 'Adelung bei',
    never: 'Nie',
    possibleLoyalty: 'Mögliche Zustimmung',
    canSendNoble: 'Kann Adelsgeschlecht senden',
    yes: 'Ja',
    no: 'Nein',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
