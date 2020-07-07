import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/companies";

export default async function getData() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const company = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
  return company.data.body;
}
