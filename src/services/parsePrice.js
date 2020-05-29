export default function parsePrice(price) {
  return parseFloat((price + "").replace(",", "."));
}
