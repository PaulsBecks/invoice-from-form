import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/articles";

export default async function postArticle(data) {
  return postData(url, data);
}
