import parsePrice from "./parsePrice";

export default (invoice) => {
  return (
    invoice.articles
      .map(({ price, toBePayed }) => {
        const totalPrice = parsePrice(price) * toBePayed;
        return totalPrice - totalPrice * (invoice.customer.discount / 100);
      })
      .reduce((total, x) => x + total, 0) +
    parsePrice(invoice.porto) +
    (parsePrice(invoice.porto) * invoice.customer.ust) / 100
  );
};
