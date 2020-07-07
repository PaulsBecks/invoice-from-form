import postInvoice from "../services/backend/postInvoice";
import { useCallback, useEffect, useState } from "react";
import getInvoices from "../services/backend/getInvoices";

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);

  async function fetchInvoices() {
    const invoices = await getInvoices();
    if (invoices) {
      setInvoices(invoices);
    }
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

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

  return [
    invoices.filter((i) => i && typeof i === "object" && !i.deleted),
    addInvoice,
    removeInvoice,
    updateInvoice,
    invoices.length,
    getInvoiceById,
  ];
}
