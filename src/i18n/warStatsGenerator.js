const translations = {
  pl_PL: {
    conquers: 'Przejęcia',
    sideOne: 'Strona 1',
    sideTwo: 'Strona 2',
    difference: 'Różnica',
    tribeTag: 'Skrót plemienia',
    delete: 'Usuń',
    notEnoughTribesSideOne: 'Musisz dodać jakiekolwiek plemię do strony 1.',
    notEnoughTribesSideTwo: 'Musisz dodać jakiekolwiek plemię do strony 2.',
    from: 'Od',
    to: 'Do',
    warStatsGenerator: 'Generator statystyk wojennych',
    generateWarStats: 'Wygeneruj statystyki wojenne',
    addTribe: 'Dodaj plemię',
  },
  en_DK: {
    conquers: 'Conquers',
    sideOne: 'Side one',
    sideTwo: 'Side two',
    difference: 'Difference',
    tribeTag: 'Tribe tag',
    delete: 'Delete',
    notEnoughTribesSideOne: 'Not enough tribes added to the side one.',
    notEnoughTribesSideTwo: 'Not enough tribes added to the side two.',
    from: 'From',
    to: 'To',
    warStatsGenerator: 'War stats generator',
    generateWarStats: 'Generate war stats',
    addTribe: 'Add tribe',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
