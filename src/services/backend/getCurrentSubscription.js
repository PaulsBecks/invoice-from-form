import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/subscriptions/last";

export default async function getCurrentSubscription() {
  return getData(url);
}
