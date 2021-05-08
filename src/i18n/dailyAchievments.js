const translations = {
  pl_PL: {
    title: 'Dzienne osiągnięcia - prawdopodobni gracze',
    warning:
      'Pamiętaj! Ten skrypt pokazuje wykalkulowane przez TribalWars wyniki, nie pokonane jednostki.',
    aotd: 'Agresor dnia',
    dotd: 'Obrońca dnia',
    sotd: 'Pomocnik dnia',
    gpotd: 'Mocarstwo dnia',
    devNote:
      'Informacja od autora - Właśnie uruchomiłem nową stronę ze statystykami, nie zapomnij jej sprawdzić :).',
  },
  en_DK: {
    title: 'Daily achievements - probable players',
    warning: 'Remember! This script shows scores, not defeated units.',
    aotd: 'Attacker of the day',
    dotd: 'Defender of the day',
    sotd: 'Supporter of the day',
    gpotd: 'Great power of the day',
    devNote: `Information from the author - I've just launched a new stat tracking website, don't forget to check it out :).`,
  },
  de_DE: {
    title: 'Tägliche Erfolge - Wahrscheinliche Spieler',
    warning: 'Hinweis! Das Script zeigt die Punke, nicht besiegte Einheiten.',
    aotd: 'Angreifer des Tages',
    dotd: 'Verteidiger des Tages',
    sotd: 'Unterstützer des Tages',
    gpotd: 'Großmacht des Tages',
    devNote: `Information vom Entwickler - Ich habe eine neue Statistik-Website gestartet, vergiss nicht diese zu testen :).`,
  },
};

export default () =>
  translations[window.game_data.locale] || translations.en_DK;
