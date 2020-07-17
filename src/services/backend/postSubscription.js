import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/subscriptions";

export default async function postSubscription(data) {
  console.log(data);
  return postData(url, data);
}
