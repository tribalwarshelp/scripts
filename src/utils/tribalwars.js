export const formatTribeURL = (id) => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_ally',
      id,
    })
  );
};

export const formatPlayerURL = (id) => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_player',
      id,
    })
  );
};

export const formatVillageURL = (id) => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_village',
      id,
    })
  );
};
