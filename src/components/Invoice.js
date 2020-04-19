import React from "react";

import InvoiceForm from "./InvoiceForm";
import PrintButton from "./PrintButton";
import SinglePage from "./SinglePage/SinglePage";

export default ({ invoice, setInvoice, setInvoices }) => {
  return (
    <div className="invoice-page">
      <div className="invoice-form-wrapper">
        <InvoiceForm
          invoice={invoice}
          setInvoice={setInvoice}
          setInvoices={setInvoices}
        />
      </div>
      <div className="invoice-page-wrapper">
        <PrintButton
          id={"singlePage"}
          label={"Rechnung Drucken"}
          fileName={invoice.invoiceNumber}
        />
        <SinglePage
          id={"singlePage"}
          invoice={invoice}
          setInvoice={setInvoice}
        />
      </div>
    </div>
  );
};
