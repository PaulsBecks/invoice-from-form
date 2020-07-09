import parsePrice from "./parsePrice";

const precision = 2;

export default function formatPrice(price) {
  if (typeof price !== "number") {
    price = parsePrice(price);
  }
  return `${(+(
    Math.round(+(price + "e" + precision)) +
    "e" +
    -precision
  )).toFixed(2)}`.replace(".", ",");
}
