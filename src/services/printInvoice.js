import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default async function printInvoice(id, fileName) {
  const input = document.getElementById(id);
  const canvas = await html2canvas(input, { scale: 3 });
  const imgData = canvas.toDataURL("image/jpeg", 0.5);
  let pdf = new jsPDF();
  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
  pdf.save(`${fileName}.pdf`);
}
