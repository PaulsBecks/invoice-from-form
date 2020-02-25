import React, { useState } from "react";
import { render } from "react-dom";
import { article as articleSceleton } from "./sceletons";
import SinglePage from "./components/SinglePage";
import MultiPage from "./components/MultiPage";
import PrintButton from "./components/PrintButton";
import InvoiceForm from "./components/InvoiceForm";

import "./index.css";
const invoiceSceleton = {
  customer: {
    name: "",
    address: "",
    postCode: "",
    city: "",
    discount: 0,
    ust: 7
  },
  articles: [articleSceleton]
};

const App = () => {
  const [invoice, setInvoice] = useState(invoiceSceleton);
  console.log(invoice);
  return (
    <div className=" bg-black-80 w-100 pv5">
      <div className="white mt3 tc f3">Rechnung erstellen</div>
      <div className="invoice-page">
        <div className="invoice-form-wrapper">
          <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        </div>
        <div className="invoice-page-wrapper">
          <PrintButton id={"singlePage"} label={"Print single page"} />
          <SinglePage id={"singlePage"} invoice={invoice} />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
