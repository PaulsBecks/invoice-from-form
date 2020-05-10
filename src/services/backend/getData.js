import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data";

export default async function getData() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  console.log(user, user.token, user.user);
  if (!user.token) {
    return;
  }
  const jwt = user.token;
  console.log(jwt);
  const result = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  console.log(result);
  return result.data;
}
