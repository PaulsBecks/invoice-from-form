import parsePrice from "./parsePrice";

export default (invoice) => {
  const articlesPrice = invoice.articles
    .map(({ price, toBePayed }) => {
      const totalPrice = parsePrice(price) * toBePayed;
      return totalPrice - totalPrice * (invoice.customer.discount / 100);
    })
    .reduce((total, x) => x + total, 0);

  const servicesPrice = invoice.services.reduce((total, s) => {
    return total + parsePrice(s.price) * (1 - invoice.customer.discount / 100);
  }, 0);

  if (invoice.shippingDisabled) {
    return articlesPrice + servicesPrice;
  }

  const price =
    articlesPrice +
    servicesPrice +
    parsePrice(invoice.porto) * (1 + invoice.customer.ust / 100);

  console.log(price);
  return price;
};
