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
    showLatestEnnoblements: 'Show the latest ennoblements',
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
  de_DE: {
    showLatestEnnoblements: 'Zeige letzten Adelungen',
    village: 'Dorf',
    newOwner: 'Neuer Besitzer',
    newOwnerTribe: 'Neuer Stamm',
    oldOwner: 'Alter Besitzer',
    oldOwnerTribe: 'Alter Stamm',
    filters: 'Filter',
    date: 'Datum',
    apply: 'Anwenden',
    ennoblements: 'Adelungen',
    devNote: `Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :).`,
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
