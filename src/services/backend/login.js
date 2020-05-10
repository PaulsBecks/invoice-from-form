import Axios from "axios";
import config from "../../config";
const { backendURL } = config();

const url = backendURL + "/login";

export default async function login(data) {
  try {
    const result = await Axios.post(url, data);
    if (result.data && result.status !== 200) {
      throw result.data.message;
    }
    return result.data;
  } catch (err) {
    throw "Die Email und das Passwort ist leider falsch.";
  }
}
