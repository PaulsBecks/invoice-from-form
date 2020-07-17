import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/subscriptions";

export default async function getSubscriptions() {
  return getData(url);
}
