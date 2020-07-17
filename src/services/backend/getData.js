import Axios from "axios";

export default async function getData(url) {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;

  const request = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return request.data.body;
}
