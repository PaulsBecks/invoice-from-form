export default async function dataToLocalStorage(data) {
  const { customers, articles, invoices, authors } = data;

  if (customers) {
    await localStorage.setItem("customers", JSON.stringify(customers));
  }
  if (articles) {
    await localStorage.setItem("articles", JSON.stringify(articles));
  }
  if (invoices) {
    await localStorage.setItem("invoices", JSON.stringify(invoices));
  }
  if (authors) {
    await localStorage.setItem("authors", JSON.stringify(authors));
  }
}
