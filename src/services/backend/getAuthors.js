import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/authors";

export default async function getAuthors() {
  return getData(url);
}
