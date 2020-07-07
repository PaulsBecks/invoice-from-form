import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/data/invoices";

export default async function postInvoice(data) {
  return postData(url, data);
}
