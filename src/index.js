import React, { useState } from "react";
import { render } from "react-dom";
import { article as articleSceleton } from "./sceletons";
import SinglePage from "./components/SinglePage";
import MultiPage from "./components/MultiPage";
import PrintButton from "./components/PrintButton";
import InvoiceForm from "./components/InvoiceForm";
import Customers from "./components/Customers";

import "./index.css";
import { Tab, Container } from "semantic-ui-react";
import Articles from "./components/Articles";
import Invoices from "./components/Invoices";
const invoiceSceleton = {
  articles: []
};

const App = () => {
  const [invoice, setInvoice] = useState(invoiceSceleton);

  console.log(invoice);
  return (
    <div className="invoice-app-container">
      <Container>
        <Tab
          panes={[
            {
              menuItem: "Rechnung erstellen",
              render: () => (
                <div className="invoice-page">
                  <div className="invoice-form-wrapper">
                    <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
                  </div>
                  <div className="invoice-page-wrapper">
                    <PrintButton id={"singlePage"} label={"Rechnung Drucken"} />
                    {invoice.customer && (
                      <SinglePage id={"singlePage"} invoice={invoice} />
                    )}
                  </div>
                </div>
              )
            },
            {
              menuItem: "Kunden",
              render: () => (
                <div className="">
                  <Customers />
                </div>
              )
            },
            {
              menuItem: "Artikel",
              render: () => (
                <div className="">
                  <Articles />
                </div>
              )
            },
            {
              menuItem: "Rechnungen",
              render: () => (
                <div className="">
                  <Invoices />
                </div>
              )
            }
          ]}
        />
      </Container>
    </div>
  );
};

render(<App />, document.getElementById("root"));
