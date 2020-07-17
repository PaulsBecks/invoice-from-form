import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/services";

export default async function getServices() {
  return getData(url);
}
