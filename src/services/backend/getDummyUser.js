import config from "../../config";
import Axios from "axios";
const { backendURL } = config();

const url = backendURL + "/users/placeholder";

export default async function getDummyUser() {
  const result = await Axios.get(url);

  return result.data;
}
