const translations = {
  pl_PL: {
    title: `Dzisiejsze zmiany w statystykach`,
    points: 'Punkty',
    rank: 'Ranking',
    villages: 'Liczba wiosek',
    members: 'Liczba członków',
    oda: 'Pokonani przeciwnicy jako agresor',
    odaRank: 'RA',
    odd: 'Pokonani przeciwnicy jako obrońca',
    oddRank: 'RO',
    ods: 'Pokonani przeciwnicy jako wspierający',
    odsRank: 'RW',
    od: 'Pokonani przeciwnicy',
    odRank: 'Pokonani przeciwnicy razem ranking',
  },
  en_DK: {
    title: `Today's stat changes`,
    points: 'Points',
    rank: 'Rank',
    villages: 'Villages',
    members: 'Members',
    oda: 'ODA',
    odaRank: 'ODA Rank',
    odd: 'ODD',
    oddRank: 'ODD Rank',
    ods: 'ODS',
    odsRank: 'ODS Rank',
    od: 'OD',
    odRank: 'OD Rank',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
