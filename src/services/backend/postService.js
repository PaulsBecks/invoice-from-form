import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/services";

export default async function postService(data) {
  return postData(url, data);
}
