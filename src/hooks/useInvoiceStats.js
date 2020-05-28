import useInvoices from "./useInvoices";
import { useMemo } from "react";

export default function useInvoiceStats() {
  const [invoices] = useInvoices();
  const invoicesStats = useMemo(() => {
    return invoices.reduce((stats, i) => {
      for (const aId in i.articles) {
        const article = i.articles[aId];
        if (!stats[article.articleId]) {
          stats[article.articleId] = {
            totalSold: 0,
            invoices: [],
            totalSend: 0,
          };
        }
        stats[article.articleId].totalSold += parseInt(article.toBePayed + "");
        stats[article.articleId].totalSend += parseInt(article.toBeSend + "");
        stats[article.articleId].invoices.push({
          id: i.id,
          send: article.toBeSend,
          payed: article.toBePayed,
          invoiceNumber: i.invoiceNumber,
          customerName: i.customer.name,
        });
      }
      return stats;
    }, {});
  }, [invoices]);

  return invoicesStats;
}
