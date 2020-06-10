import createInvoice from "./createInvoice";
import emailInvoice from "./backend/emailInvoice";
export default async function sendInvoice(id, options) {
  const pdf = await createInvoice(id);
  var data = pdf.output("datauristring");
  emailInvoice({
    data,
    ...options,
  });
}
