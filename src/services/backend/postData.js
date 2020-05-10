import config from "../../config";
import Axios from "axios";

const { backendURL } = config();

const url = backendURL + "/data";

export default async function postData(data) {
  const user = JSON.parse(localStorage.getItem("user", "{}"));

  if (!user.token) {
    return;
  }

  const jwt = user.token;

  const result = await Axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return result.data;
}
