export const API_URI = 'https://api.tribalwarshelp.com/graphql';

export default ({ query, variables = {} } = {}) => {
  return fetch(API_URI, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(({ data, errors }) => {
      if (errors && Array.isArray(errors) && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      return new Promise((resolve) => resolve(data));
    });
};
