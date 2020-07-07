import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/data/authors";

export default async function getAuthors() {
  const user = JSON.parse(localStorage.getItem("user"), "{}");
  if (!user || !user.token) {
    return;
  }
  const jwt = user.token;
  const authors = await Axios.get(url, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  return authors.data.body;
}
