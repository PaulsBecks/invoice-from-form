import useInvoices from "./useInvoices";
import { useMemo } from "react";
import { parsePrice } from "../services";

export default function useArticleStats() {
  const [invoices] = useInvoices();

  const invoicesStats = useMemo(
    () =>
      invoices.reduce((stats, i) => {
        for (const aId in i.articles) {
          const article = i.articles[aId];
          if (!stats[article._id]) {
            stats[article._id] = {
              totalSold: 0,
              invoices: [],
              totalSend: 0,
              totalTurnover: 0,
              name: article.name,
            };
          }
          const toBePayed = parseInt(article.toBePayed + "");
          stats[article._id].totalSold += toBePayed;
          stats[article._id].totalSend += parseInt(article.toBeSend + "");
          stats[article._id].totalTurnover +=
            toBePayed * parsePrice(article.price);
          stats[article._id].invoices.push({
            _id: i._id,
            send: article.toBeSend,
            payed: article.toBePayed,
            invoiceNumber: i.invoiceNumber,
            customerName: i.customer.name,
          });
        }
        return stats;
      }, {}),
    [invoices]
  );

  return invoicesStats;
}
