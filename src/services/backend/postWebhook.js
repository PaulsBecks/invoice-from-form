import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/webhooks";

export default function postWebhook(data) {
  return postData(url, data);
}
