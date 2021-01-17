export const inTZ = (d = new Date(), tz = 'UTC') => {
  return new Date(new Date(d).toLocaleString('en-US', { timeZone: tz }));
};

export const inUTC = (d = new Date()) => {
  return inTZ(d);
};

export const formatDate = (date, options) => {
  return new Date(date).toLocaleDateString(
    undefined,
    options
      ? options
      : {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }
  );
};
