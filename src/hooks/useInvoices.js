import postInvoice from "../services/backend/postInvoice";
import { useCallback, useState, useContext } from "react";
import getInvoices from "../services/backend/getInvoices";
import { Context } from "../store/Store";

export default function useInvoices() {
  const [state, dispatch] = useContext(Context);
  const invoices = state.invoices;
  const setInvoices = (invoices) => {
    dispatch({ type: "SET_INVOICES", payload: invoices });
  };
  const limit = state.invoicesLimit;
  const setLimit = (_limit) => {
    if (limit < 0) {
      return;
    }
    dispatch({ type: "SET_INVOICES_LIMIT", payload: _limit });
  };

  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoices = useCallback(
    async (options = {}) => {
      setIsLoading(true);
      const _invoices = await getInvoices(options);
      if (_invoices) {
        setInvoices(_invoices);
      }
      setIsLoading(false);
    },
    [invoices, limit]
  );

  const addInvoice = async (invoice) => {
    await postInvoice(invoice);
    fetchInvoices({ limit });
  };

  const removeInvoice = async (invoiceId) => {
    await postInvoice({ _id: invoiceId, deleted: true });
    fetchInvoices({ limit });
  };

  const updateInvoice = async (invoice) => {
    await postInvoice(invoice);
    fetchInvoices({ limit });
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

  const loadMoreInvoices = useCallback(
    (_limit) => {
      if (limit < 0) {
        return;
      }
      if ((_limit && _limit > invoices.length) || _limit < 0) {
        setLimit(_limit);
        fetchInvoices({ limit: _limit });
      } else if (limit < invoices.length + 10) {
        setLimit(limit + 10);
        fetchInvoices({ limit: limit + 10 });
      }
    },
    [limit, invoices]
  );

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
