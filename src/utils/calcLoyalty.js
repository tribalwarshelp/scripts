import differenceInMinutes from 'date-fns/differenceInMinutes';

const calcLoyalty = (ennobledAt, speed) => {
  let loyalty =
    25 + Math.abs(differenceInMinutes(ennobledAt, new Date())) * (speed / 60);
  if (loyalty > 100) {
    loyalty = 100;
  }
  return Math.floor(loyalty);
};

export default calcLoyalty;
