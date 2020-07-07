import React, { useState, useEffect } from "react";
import Invoice from "../../components/Invoice";
import { useParams } from "react-router";
import { useInvoices } from "../../hooks";

export default function InvoiceDetail({ updateInvoice: _updateInvoice }) {
  const { invoiceId } = useParams();
  const [invoices, , , __updateInvoice, , getInvoiceById] = useInvoices();
  const [invoice, setInvoice] = useState();

  useEffect(() => {
    if (!invoice) {
      setInvoice(getInvoiceById(invoiceId));
    }
  }, [invoices]); // eslint-disable-line

  // if the parent component needs to update invoices it can put the function in the props
  const updateInvoice =
    typeof _updateInvoice === "function" ? _updateInvoice : __updateInvoice;

  return (
    <Invoice
      {...{
        invoice,
        setInvoice,
        updateInvoice,
      }}
    />
  );
}
