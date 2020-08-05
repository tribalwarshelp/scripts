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

export const formatVillageName = (n = '', x = 500, y = 500) => {
  const continent = 'K' + String(y)[0] + String(x)[0];
  return `${n} (${x}|${y}) ${continent}`;
};

export const calcAttackDuration = (distance, unitSpeed, baseSpeed) => {
  return Math.round((distance * baseSpeed) / unitSpeed);
};

export const buildImgURL = (img) => {
  return image_base + img;
};
