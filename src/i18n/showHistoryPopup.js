const translations = {
  pl_PL: {
    title: `Historia`,
    date: 'Data',
    tribe: 'Plemię',
    points: 'Punkty',
    rank: 'Ranking',
    villages: 'Liczba wiosek',
    members: 'Liczba członków',
    oda: 'Pokonani przeciwnicy jako agresor',
    odd: 'Pokonani przeciwnicy jako obrońca',
    ods: 'Pokonani przeciwnicy jako wspierający',
    od: 'Pokonani przeciwnicy',
  },
  en_DK: {
    title: `History`,
    date: 'Date',
    tribe: 'Tribe',
    points: 'Points',
    villages: 'Villages',
    members: 'Members',
    oda: 'ODA',
    odd: 'ODD',
    ods: 'ODS',
    od: 'OD',
  },
  de_DE: {
    title: `Verlauf`,
    date: 'Datum',
    tribe: 'Stamm',
    points: 'Punkte',
    villages: 'Dörfer',
    members: 'Mitglieder',
    oda: 'BGA',
    odd: 'BGV',
    ods: 'BGS',
    od: 'BP',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
