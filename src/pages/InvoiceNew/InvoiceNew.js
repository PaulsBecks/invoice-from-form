import React, { useState } from "react";
import { useInvoices, useCompany, useCustomers, useGA } from "../../hooks";
import Invoice from "../../components/Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../../sceletons";
import { useHistory } from "react-router-dom";

export default function InvoiceNew({ updateInvoice: _updateInvoice }) {
  const [company] = useCompany();
  const [customers] = useCustomers();
  const history = useHistory();
  const today = new Date();
  useGA();

  const [, , , __updateInvoice, invoicesLength] = useInvoices();
  const [invoice, setInvoice] = useState({
    ...invoiceSceleton,
    id: invoicesLength,
    customer: {
      ...customerSceleton,
      id: customers.length,
    },
    invoiceNumber: `${today.getFullYear()}${
      today.getMonth() < 10 ? "0" + today.getMonth() : today.getMonth()
    }${174 + invoicesLength}`,
    company,
  });
  // if the parent component needs to update invoices it can put the function in the props
  const updateInvoice =
    typeof _updateInvoice === "function" ? _updateInvoice : __updateInvoice;
  return (
    <Invoice
      invoice={invoice}
      setInvoice={setInvoice}
      updateInvoice={updateInvoice}
      newInvoice
      edit={true}
      onSave={() => {
        history.push("/invoices");
      }}
    />
  );
}
