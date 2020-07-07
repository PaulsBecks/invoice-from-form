import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/invoices";

export default async function getData() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const invoices = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return invoices.data.body;
}
