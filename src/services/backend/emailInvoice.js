import config from "../../config";
import Axios from "axios";

const { backendURL } = config();

const url = backendURL + "/email/invoice";

export default async function emailInvoice(data) {
  await Axios.post(url, data);
}
