import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/companies";

export default async function postAuthor(data) {
  return postData(url, data);
}
