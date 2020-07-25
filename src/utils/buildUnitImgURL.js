import { buildImgURL } from './tribalwars';

export default (unit) => {
  return buildImgURL(`unit/unit_${unit}.png`);
};
