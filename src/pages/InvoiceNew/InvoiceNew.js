import React, { useState, useEffect } from "react";
import { useInvoices, useCompany, useGA } from "../../hooks";
import Invoice from "../../components/Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../../sceletons";
import { useHistory } from "react-router-dom";

export default function InvoiceNew({ updateInvoice: _updateInvoice }) {
  const [company, , companyIsLoading] = useCompany();
  const history = useHistory();
  const today = new Date();
  useGA();

  const [, , , __updateInvoice, invoicesLength] = useInvoices();

  const [invoice, setInvoice] = useState({
    ...invoiceSceleton,
    customer: {
      ...customerSceleton,
    },
    company,
  });

  // update invoice number after invoices have loaded
  useEffect(() => {
    setInvoice({
      ...invoice,
      invoiceNumber: `${today.getFullYear()}${
        today.getMonth() < 10 ? "0" + today.getMonth() : today.getMonth()
      }${174 + invoicesLength}`,
    });
  }, [invoicesLength]); // eslint-disable-line

  // if company was empty first update invoice if company updates
  useEffect(() => {
    if (!companyIsLoading) {
      setInvoice({ ...invoice, company });
    }
  }, [companyIsLoading]); // eslint-disable-line

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
    />
  );
}
