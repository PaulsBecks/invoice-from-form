const precision = 2;

export default function roundPrice(price) {
  return +(Math.round(+(price + "e" + precision)) + "e" + -precision);
}
