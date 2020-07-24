export const getItem = (key, d = {}) => {
  const json = localStorage.getItem(key);
  let obj = d;
  if (json) {
    obj = JSON.parse(json);
  }
  return obj;
};

export const setItem = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};
