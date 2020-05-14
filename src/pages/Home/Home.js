import React, { useState } from "react";
import { useInvoices, useCompany, useCustomers, useUser } from "../../hooks";
import Invoice from "../../components/Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../../sceletons";
import { useHistory } from "react-router-dom";
import LandingPage from "../Landing";

export default function Home() {
  const [company] = useCompany();
  const [customers] = useCustomers();
  const history = useHistory();
  const [user] = useUser();

  const [invoices, , , updateInvoice, invoicesLength] = useInvoices();
  const [invoice, setInvoice] = useState({
    ...invoiceSceleton,
    id: invoicesLength,
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
