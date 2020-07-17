import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/articles";

export default async function getArticles() {
  return getData(url);
}
