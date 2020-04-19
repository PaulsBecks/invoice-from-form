export default (invoice) =>
  invoice.articles
    .map(({ price, toBePayed }) => {
      const totalPrice = price * toBePayed;
      return totalPrice - totalPrice * (invoice.customer.discount / 100);
    })
    .reduce((total, x) => x + total, 0);
