import useInvoices from "./useInvoices";
import { useMemo } from "react";

export default function useInvoiceStats() {
  const [invoices] = useInvoices();

  const invoiceStats = useMemo(() => {
    let invoiceStats = [[], [], [], [], [], [], [], [], [], [], [], []];

    for (let i in invoices) {
      const invoice = invoices[i];
      const invoiceDate = new Date(invoice.invoiceDate);
      const { totalPrice } = invoice;
      const month = invoiceDate.getMonth();
      invoiceStats[month].push({ totalPrice });
    }
    return invoiceStats;
  }, [invoices]);
  return invoiceStats;
}
