export const inTZ = (d = new Date(), tz = 'UTC') => {
  return new Date(new Date(d).toLocaleString('en-US', { timeZone: tz }));
};

export const inUTC = (d = new Date()) => {
  return inTZ(d);
};
