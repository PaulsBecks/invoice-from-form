import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/services";

export default async function getServices() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const services = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return services.data.body;
}
