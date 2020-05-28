import useLocalStorage from "./useLocalStorage";
import postData from "../services/backend/postData";
import { useCallback, useEffect } from "react";
import getData from "../services/backend/getData";

export default function useInvoices() {
  const [invoices, setLocalStorageInvoices] = useLocalStorage("invoices", []);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (data && data.invoices) {
        setLocalStorageInvoices(data.invoices);
      }
    }
    fetchData();
  }, []);

  const addInvoice = useCallback(
    (invoice) => {
      const _invoices = [...invoices, invoice];
      setLocalStorageInvoices(_invoices);
      postData({ invoices: _invoices });
    },
    [invoices]
  );

  const removeInvoice = useCallback(
    (invoiceId) => {
      const _invoices = [...invoices];
      _invoices[invoiceId] = undefined;
      setLocalStorageInvoices(_invoices);
      postData({ invoices: _invoices });
    },
    [invoices]
  );

  const updateInvoice = useCallback(
    (invoice) => {
      const _invoices = [...invoices];
      _invoices[invoice.id] = invoice;
      setLocalStorageInvoices(_invoices);
      postData({ invoices: _invoices });
    },
    [invoices]
  );

  return [
    invoices.filter((i) => i && typeof i === "object"),
    addInvoice,
    removeInvoice,
    updateInvoice,
    invoices.length,
  ];
}
