import config from "../../config";
import getData from "./getData";
const { backendURL } = config();

const url = backendURL + "/data/customers";

export default async function getCustomers() {
  return getData(url);
}
