import InADayParser from '../libs/InADayParser';

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

export const loadInADayData = async (type, { name, ...rest } = {}) => {
  try {
    const response = await fetch(
      TribalWars.buildURL('', {
        screen: 'ranking',
        mode: 'in_a_day',
        type,
        name: name ? name : '',
      })
    );
    const html = await response.text();
    if (!html) {
      throw new Error();
    }
    const res = new InADayParser(html, rest).parse();
    if (res.length === 0) {
      throw new Error();
    }
    return res[0];
  } catch (error) {
    return {
      rank: 0,
      playerID: 0,
      score: 0,
      tribeID: 0,
      date: new Date(),
    };
  }
};
