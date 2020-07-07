import parsePrice from "./parsePrice";

export default function formatPrice(price) {
  if (typeof price !== "number") {
    price = parsePrice(price);
  }
  return `${price.toFixed(2)}`.replace(".", ",");
}
