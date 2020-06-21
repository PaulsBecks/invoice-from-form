import React, { useState } from "react";

import InvoiceForm from "../InvoiceForm";
import PrintButton from "../PrintButton";
import SinglePage from "../SinglePage/SinglePage";
import { Button, Message } from "semantic-ui-react";

import "./Invoice.css";
import { useCustomers } from "../../hooks";
import { calculateTotalPrice } from "../../services";
import { useHistory } from "react-router";

export default ({
  edit = true,
  invoice,
  setInvoice,
  updateInvoice,
  onSave,
  newInvoice,
}) => {
  if (!invoice) {
    return (
      <div>
        404 - Diese Rechnung wurde nicht gefunden. Bitte wenden Sie sich bei
        fehlern an den Service: service@billeroo.de
      </div>
    );
  }
  const [active, setActive] = useState(edit);
  const [formSelected, setFormSelected] = useState([]);
  const [, , , updateCustomer] = useCustomers();
  const history = useHistory();

  const saveInvoice = () => {
    invoice["totalPrice"] = calculateTotalPrice(invoice);
    updateInvoice(invoice);
    updateCustomer(invoice.customer);
    if (typeof onSave === "function") {
      onSave();
    }
    history.push("/invoices");
  };

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
                    content={
                      newInvoice
                        ? "Anlegen & Schließen"
                        : "Speichern & Schließen"
                    }
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
            formSelected={formSelected}
            setFormSelected={setFormSelected}
          />
        )}
      </div>
    </div>
  );
};
