const translations = {
  pl_PL: {
    ennobledAt: 'Podbita o',
    never: 'Nigdy',
    possibleLoyalty: 'Możliwe poparcie',
  },
  en_DK: {
    ennobledAt: 'Ennobled at',
    never: 'Never',
    possibleLoyalty: 'Possible loyalty',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
