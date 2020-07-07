import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data";

export default async function getData() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const invoicesPromise = Axios.get(url + "/invoices", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  const articlesPromise = Axios.get(url + "/articles", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  const customersPromise = Axios.get(url + "/customers", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  const authorsPromise = Axios.get(url + "/authors", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  const [invoices, articles, customers, authors] = await Promise.all([
    invoicesPromise,
    articlesPromise,
    customersPromise,
    authorsPromise,
  ]);
  return {
    invoices: invoices.data.body,
    articles: articles.data.body,
    customers: customers.data.body,
    authors: authors.data.body,
  };
}
