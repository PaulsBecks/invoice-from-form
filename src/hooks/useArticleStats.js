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
          if (!stats[article.articleId]) {
            stats[article.articleId] = {
              totalSold: 0,
              invoices: [],
              totalSend: 0,
              totalTurnover: 0,
              name: article.name,
            };
          }
          const toBePayed = parseInt(article.toBePayed + "");
          console.log(toBePayed * parsePrice(article.price));
          stats[article.articleId].totalSold += toBePayed;
          stats[article.articleId].totalSend += parseInt(article.toBeSend + "");
          stats[article.articleId].totalTurnover +=
            toBePayed * parsePrice(article.price);
          stats[article.articleId].invoices.push({
            id: i.id,
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
