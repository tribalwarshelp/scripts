const translations = {
  pl_PL: {
    date: 'Data',
    newOwner: 'Nowy właściciel',
    oldOwner: 'Poprzedni właściciel',
    village: 'Wioska',
    title: 'Przejęcia',
  },
  en_DK: {
    date: 'Date',
    newOwner: 'New owner',
    oldOwner: 'Old owner',
    village: 'Village',
    title: 'Ennoblements',
  },
  de_DE: {
    date: 'Datum',
    newOwner: 'Neuer Besitzer',
    oldOwner: 'Alter Besitzer',
    village: 'Dorf',
    title: 'Adelungen',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
