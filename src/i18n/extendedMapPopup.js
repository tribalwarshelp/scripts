const translations = {
  pl_PL: {
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    possibleLoyalty: 'Możliwe poparcie',
    canSendNobles: 'Można wysłać szlachciców',
    yes: 'Tak',
    no: 'Nie',
  },
  en_DK: {
    ennobledAt: 'Ennobled at',
    never: 'Never',
    possibleLoyalty: 'Possible loyalty',
    canSendNobles: 'Can send nobles',
    yes: 'Yes',
    no: 'No',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
