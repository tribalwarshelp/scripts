export default (date, options = {}) => {
  return new Date(date).toLocaleDateString(
    window.game_data.locale.replace('_', '-'),
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      ...options,
    }
  );
};
