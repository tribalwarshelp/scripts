const translations = {
  pl_PL: {
    startCoordsPicker: 'Uruchom zbieracza koordynat',
    stopCoordsPicker: 'Zatrzymaj zbieracza koordynat',
    exportedVillages: 'Wyeksportowane wioski',
    cannotDeleteSelectedGroup: 'Nie można usunąć wybranej grupy!',
    select: 'Wybierz',
    delete: 'Usuń',
    add: 'Dodaj',
    save: 'Zapisz',
    groupName: 'Nazwa grupy',
    export: 'Eksport',
  },
  en_DK: {
    startCoordsPicker: 'Start coords picker',
    stopCoordsPicker: 'Stop coords picker',
    exportedVillages: 'Exported villages',
    cannotDeleteSelectedGroup: 'Cannot delete selected group!',
    select: 'Select',
    delete: 'Delete',
    add: 'Add',
    save: 'Save',
    groupName: 'Group name',
    export: 'Export',
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
