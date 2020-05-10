import Axios from "axios";
import config from "../../config";

const { backendURL } = config();

const url = backendURL + "/register";

export default async function register(data) {
  const result = await Axios.post(url, data);
  return result.data;
}
