import Axios from "axios";
import config from "../../config";

const { backendURL } = config();

const url = backendURL + "/register";

export default async function register(data) {
  try {
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
  } catch (err) {
    const {
      response: {
        data: { message },
      },
    } = err;
    throw message;
  }
}
