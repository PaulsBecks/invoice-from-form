import postInvoice from "../services/backend/postInvoice";
import { useCallback, useEffect, useState } from "react";
import getInvoices from "../services/backend/getInvoices";

export default function useInvoices(options = { defaultLimit: 10 }) {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(options.defaultLimit);

  const fetchInvoices = useCallback(async (options) => {
    setIsLoading(true);
    const invoices = await getInvoices(options);
    if (invoices) {
      setInvoices(invoices);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    fetchInvoices({ limit });
  }, [limit]);

  const addInvoice = async (invoice) => {
    await postInvoice(invoice);
    fetchInvoices();
  };

  const removeInvoice = async (invoiceId) => {
    await postInvoice({ _id: invoiceId, deleted: true });
    fetchInvoices();
  };

  const updateInvoice = async (invoice) => {
    await postInvoice(invoice);
    fetchInvoices();
  };

  const getInvoiceById = useCallback(
    (invoiceId) => {
      const invoice = invoices.find((i) => {
        return i._id === invoiceId;
      });
      return invoice;
    },
    [invoices]
  );

  const loadMoreInvoices = useCallback(() => {
    if (limit < invoices.length + 10) setLimit(limit + 10);
  }, [limit, invoices]);

  return [
    invoices.filter((i) => i && typeof i === "object" && !i.deleted),
    addInvoice,
    removeInvoice,
    updateInvoice,
    invoices.length,
    getInvoiceById,
    isLoading,
    loadMoreInvoices,
  ];
}
