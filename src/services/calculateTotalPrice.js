import parsePrice from "./parsePrice";

export default (invoice) => {
  const articlesPrice = invoice.articles
    .map(({ price, toBePayed }) => {
      const totalPrice = parsePrice(price) * toBePayed;
      return totalPrice - totalPrice * (invoice.customer.discount / 100);
    })
    .reduce((total, x) => x + total, 0);

  if (invoice.shippingDisabled) {
    return articlesPrice;
  }

  const price =
    articlesPrice +
    +parsePrice(invoice.porto) * (1 + invoice.customer.ust / 100);
  return price;
};
