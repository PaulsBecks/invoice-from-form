import React, { useState } from "react";
import { useInvoices, useCompany, useCustomers } from "../../hooks";
import Invoice from "../../components/Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../../sceletons";

export default function Home() {
  const [company] = useCompany();
  const [customers] = useCustomers();
  const [invoice, setInvoice] = useState({
    ...invoiceSceleton,
    id: 0,
    customer: {
      ...customerSceleton,
      id: customers.length,
    },
    company,
  });

  const [invoices, setInvoices] = useInvoices();

  return (
    <Invoice
      invoice={invoice}
      setInvoice={setInvoice}
      setInvoices={setInvoices}
      invoices={invoices}
    />
  );
}
