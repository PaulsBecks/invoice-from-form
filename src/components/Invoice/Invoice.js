import React, { useState } from "react";

import InvoiceForm from "../InvoiceForm";
import PrintButton from "../PrintButton";
import SinglePage from "../SinglePage/SinglePage";
import { Button, Segment, Icon, Message } from "semantic-ui-react";

import "./Invoice.css";
import { useCustomers } from "../../hooks";
import { calculateTotalPrice } from "../../services";

export default ({
  edit,
  invoice,
  setInvoice,
  invoices,
  setInvoices,
  onSave,
}) => {
  if (!invoice || !invoices) {
    return null;
  }
  const [active, setActive] = useState(edit);
  const [formSelected, setFormSelected] = useState([]);
  const [customers, setCustomers] = useCustomers();

  const saveInvoice = () => {
    invoice["totalPrice"] = calculateTotalPrice(invoice);
    let _invoices = [...invoices];
    _invoices[invoice.id] = invoice;
    setInvoices(_invoices);
    setInvoice();
    const _customers = [...customers];
    _customers[invoice.customer.id] = invoice.customer;
    setCustomers(_customers);
    if (typeof onSave === "function") {
      onSave();
    }
  };

  const newInvoice = invoice.id === invoices.length;

  return (
    <div>
      <div className="invoice-page-header">
        <Message
          info
          header="Neue Rechnung erstellen"
          content="Klicken Sie auf den Bereich, den Sie anpassen wollen. Rechts können Sie Artikel zur Rechnung hinzufügen oder neue erstellen."
          icon="bell"
        />
      </div>
      <div className="invoice-page">
        <div className="invoice-page-wrapper">
          {active ? (
            <div className="invoice-page-button-container">
              <div>
                <PrintButton
                  id={"singlePage"}
                  label={"Rechnung Herunterladen"}
                  fileName={invoice.invoiceNumber}
                />
              </div>
              <div>
                <Button
                  onClick={() => setInvoice()}
                  content="Abbrechen"
                  negative
                  icon="close"
                  labelPosition="right"
                ></Button>
                {invoice.customer && (
                  <Button
                    onClick={saveInvoice}
                    content={newInvoice ? "Anlegen" : "Speichern"}
                    positive
                    icon="check"
                    labelPosition="right"
                  ></Button>
                )}
              </div>
            </div>
          ) : (
            <div className="invoice-button-wrapper">
              <Button onClick={() => setActive(true)} primary>
                Neue Rechnung erstellen
              </Button>
            </div>
          )}
          <SinglePage
            id={"singlePage"}
            invoice={invoice}
            setInvoice={setInvoice}
            setFormSelected={setFormSelected}
          />
        </div>
        {active && (
          <InvoiceForm
            wrapperClass="invoice-form-wrapper"
            invoice={invoice}
            setInvoice={setInvoice}
            setInvoices={setInvoices}
            formSelected={formSelected}
            setFormSelected={setFormSelected}
          />
        )}
      </div>
    </div>
  );
};
