const translations = {
  pl_PL: {
    actualCoords: 'Aktualne koordynaty',
    searchBonusBarbarianVillages: 'Wyszukaj koczownicze',
    village: 'Wioska',
    distance: 'Dystans',
    action: 'Akcja',
  },
  en_DK: {
    actualCoords: 'Actual coords',
    searchBonusBarbarianVillages: 'Search bonus barbarian villages',
    village: 'Village',
    distance: 'Distance',
    action: 'Action',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
