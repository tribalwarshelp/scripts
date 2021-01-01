const translations = {
  pl_PL: {
    showLatestEnnoblements: 'Pokaż najnowsze przejęcia',
    village: 'Wioska',
    newOwner: 'Nowy właściciel',
    newOwnerTribe: 'Plemię nowego właściciela',
    oldOwner: 'Poprzedni właściciel',
    oldOwnerTribe: 'Plemię poprzedniego właściciela',
    date: 'Data',
    filters: 'Filtry',
    apply: 'Zastosuj',
    ennoblements: 'Przejęcia',
    devNote:
      'Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :).',
  },
  en_DK: {
    showLatestEnnoblements: 'Show latest ennoblements',
    village: 'Village',
    newOwner: 'New owner',
    newOwnerTribe: 'New owner tribe',
    oldOwner: 'Old owner',
    oldOwnerTribe: 'Old owner tribe',
    filters: 'Filters',
    date: 'Date',
    apply: 'Apply',
    ennoblements: 'Ennoblements',
    devNote: `Information from the author - I've just launched a new stat tracking website, don't forget to check it out :).`,
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
