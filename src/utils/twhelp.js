export const BASE_URL = 'tribalwarshelp.com';

export const buildURLToServerPage = (version = '', server = '') => {
  return `https://${version}.${BASE_URL}/server/${server}`;
};

export const buildURLToProfile = (
  version = '',
  server = '',
  id = 0,
  entity = ''
) => {
  return `${buildURLToServerPage(version, server)}/${entity}/${id}`;
};

export const buildPlayerURL = (version = '', server = '', id = 0) => {
  return buildURLToProfile(version, server, id, 'player');
};

export const buildTribeURL = (version = '', server = '', id = 0) => {
  return buildURLToProfile(version, server, id, 'tribe');
};

export const buildVillageURL = (version = '', server = '', id = 0) => {
  return buildURLToProfile(version, server, id, 'village');
};
