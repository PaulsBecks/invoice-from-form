import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/companies";

export default async function getCompany() {
  return getData(url);
}
