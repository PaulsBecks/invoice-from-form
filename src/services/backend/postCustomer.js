import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/customers";

export default async function postCustomer(data) {
  return postData(url, data);
}
