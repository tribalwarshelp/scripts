export const getItem = (key) => {
  const json = localStorage.getItem(key);
  let obj = {};
  if (json) {
    obj = JSON.parse(json);
  }
  return obj;
};

export const setItem = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};
