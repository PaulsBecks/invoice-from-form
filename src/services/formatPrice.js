import parsePrice from "./parsePrice";
import roundPrice from "./roundPrice";

export default function formatPrice(price) {
  if (typeof price !== "number") {
    price = parsePrice(price);
  }
  return `${roundPrice(price).toFixed(2)}`.replace(".", ",");
}
