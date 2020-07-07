import Axios from "axios";

export default async function postData(url, data) {
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

  return result.data.body;
}
