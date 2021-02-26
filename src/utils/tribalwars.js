export const buildTribeURL = id => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_ally',
      id,
    })
  );
};

export const buildPlayerURL = id => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_player',
      id,
    })
  );
};

export const buildVillageURL = id => {
  return (
    window.location.origin +
    TribalWars.buildURL('', {
      screen: 'info_village',
      id,
    })
  );
};

export const buildVillageName = (n = '', x = 500, y = 500) => {
  const continent = 'K' + String(y)[0] + String(x)[0];
  return `${n} (${x}|${y}) ${continent}`;
};

export const calcAttackDuration = (distance, baseSpeed) => {
  return Math.round(distance * baseSpeed);
};

export const buildImgURL = img => {
  return image_base + img;
};
