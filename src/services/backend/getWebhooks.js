import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/webhooks";

export default async function getWebhooks() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const webhooks = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return webhooks.data.body;
}
