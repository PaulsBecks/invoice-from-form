import React from "react";

import InvoiceForm from "./InvoiceForm";
import PrintButton from "./PrintButton";
import SinglePage from "./SinglePage";

export default ({ invoice, setInvoice }) => {
  return (
    <div className="invoice-page">
      <div className="invoice-form-wrapper">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
      </div>
      {invoice.customer && (
        <div className="invoice-page-wrapper">
          <PrintButton
            id={"singlePage"}
            label={"Rechnung Drucken"}
            fileName={invoice.invoiceNumber}
          />
          <SinglePage id={"singlePage"} invoice={invoice} />
        </div>
      )}
    </div>
  );
};
