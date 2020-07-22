import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/stats";

export default async function getStats() {
  return getData(url);
}
