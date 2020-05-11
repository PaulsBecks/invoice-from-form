import React, { useState } from "react";
import { useInvoices, useCompany, useCustomers } from "../../hooks";
import Invoice from "../../components/Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../../sceletons";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [company] = useCompany();
  const [customers] = useCustomers();
  const history = useHistory();

  const [invoices, , , updateInvoice] = useInvoices();
  const [invoice, setInvoice] = useState({
    ...invoiceSceleton,
    id: invoices.length,
    customer: {
      ...customerSceleton,
      id: customers.length,
    },
    company,
  });

  return (
    <Invoice
      invoice={invoice}
      setInvoice={setInvoice}
      updateInvoice={updateInvoice}
      invoices={invoices}
      edit={true}
      onSave={() => {
        history.push("/invoices");
      }}
    />
  );
}
