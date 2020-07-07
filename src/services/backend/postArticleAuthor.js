import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/articleAuthor";

export default async function postArticleAuthor(data) {
  return postData(url, data);
}
