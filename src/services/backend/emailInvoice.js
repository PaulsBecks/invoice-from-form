import config from "../../config";
import postData from "./postData";

const { backendURL } = config();

const url = backendURL + "/email/invoice";

export default async function emailInvoice(data) {
  await postData(url, data);
}
