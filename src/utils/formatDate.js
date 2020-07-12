export default (date, options) => {
  return new Date(date).toLocaleDateString(
    window.game_data.locale.replace('_', '-'),
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
