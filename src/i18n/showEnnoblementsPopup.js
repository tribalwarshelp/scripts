const translations = {
  pl_PL: {
    date: 'Data',
    newOwner: 'Nowy właściciel',
    oldOwner: 'Stary właściciel',
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
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
