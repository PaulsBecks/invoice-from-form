import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/customers";

export default async function getCustomers() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const result = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return result.data.body;
}
