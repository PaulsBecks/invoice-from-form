export default invoice =>
  invoice.articles
    .map(({ price, amount }) => {
      const totalPrice = price * amount;
      return totalPrice - totalPrice * (invoice.customer.discount / 100);
    })
    .reduce((total, x) => x + total, 0);
