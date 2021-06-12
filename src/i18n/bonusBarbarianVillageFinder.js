const translations = {
  pl_PL: {
    actualCoords: 'Aktualne koordynaty',
    searchBonusBarbarianVillages: 'Wyszukaj koczownicze',
    village: 'Wioska',
    distance: 'Dystans',
    action: 'Akcja',
    center: 'Wycentruj',
  },
  en_DK: {
    actualCoords: 'Actual coords',
    searchBonusBarbarianVillages: 'Search bonus barbarian villages',
    village: 'Village',
    distance: 'Distance',
    action: 'Action',
    center: 'Center',
  },
  de_DE: {
    actualCoords: 'Aktuelle Koordinaten',
    searchBonusBarbarianVillages: 'Suche Bonus-Barbarendörfer',
    village: 'Dorf',
    distance: 'Distanz',
    action: 'Aktion',
    center: 'Center',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
