export default async function dataFromLocalStorage() {
  return {
    invoices: JSON.parse(localStorage.getItem("invoices", [])),
    customers: JSON.parse(localStorage.getItem("customers", [])),
    authors: JSON.parse(localStorage.getItem("authors", [])),
    articles: JSON.parse(localStorage.getItem("articles", [])),
    company: JSON.parse(localStorage.getItem("company", {})),
  };
}
