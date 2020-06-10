import createInvoice from "./createInvoice";
export default async function printInvoice(id, fileName) {
  const pdf = await createInvoice(id);
  pdf.save(`${fileName}.pdf`);
}
