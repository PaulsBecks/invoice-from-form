import useInvoices from "./useInvoices";
import { useMemo, useEffect } from "react";
import { parsePrice } from "../services";

export default function useInvoiceStats() {
  const [invoices, , , , , , , loadMoreInvoices] = useInvoices();
  useEffect(() => {
    loadMoreInvoices(-1);
  }, []);

  const invoiceStats = useMemo(() => {
    let invoiceStats = [[], [], [], [], [], [], [], [], [], [], [], []];

    for (let i in invoices) {
      const invoice = invoices[i];
      const invoiceDate = new Date(invoice.invoiceDate);
      const { totalPrice } = invoice;
      const month = invoiceDate.getMonth();
      invoiceStats[month].push({
        totalPrice: parsePrice(totalPrice),
        totalPriceNet:
          parsePrice(totalPrice) / (1 + parsePrice(invoice.customer.ust) / 100),
      });
    }
    return invoiceStats;
  }, [invoices]);
  return invoiceStats;
}
