const translations = {
  pl_PL: {
    addTribe: 'Dodaj plemię',
    generate: 'Wygeneruj',
    delete: 'Usuń',
    player: 'Gracz',
    tribe: 'Plemię',
    rank: 'Ranking',
    score: 'Wynik',
    date: 'Data',
    loaded: 'Załadowano',
  },
  en_DK: {
    addTribe: 'Add tribe',
    generate: 'Generate',
    delete: 'Delete',
    player: 'Player',
    tribe: 'Tribe',
    rank: 'Rank',
    score: 'Score',
    date: 'Date',
    loaded: 'Loaded',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
