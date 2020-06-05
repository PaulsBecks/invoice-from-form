import React, { useState, useEffect } from "react";
import { useCompany, useInvoices, useCustomers, useGA } from "../hooks";

import { Button, Table } from "semantic-ui-react";
import Invoice from "./Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../sceletons";
import { formatDate, formatPrice, printInvoice } from "../services";
import SinglePage from "./SinglePage/SinglePage";

export default () => {
  const [
    invoices,
    ,
    removeInvoice,
    updateInvoice,
    invoicesLength,
  ] = useInvoices();
  const [invoiceSelected, setInvoiceSelected] = useState();
  const [invoiceDownloadSelected, setInvoiceDownloadSelected] = useState();
  const [company] = useCompany();
  const [, , , , customersLength] = useCustomers();
  useGA();

  useEffect(() => {
    if (invoiceDownloadSelected) {
      async function print() {
        await printInvoice("singlePage", invoiceDownloadSelected.invoiceNumber);
        setInvoiceDownloadSelected();
      }
      print();
    }
  }, [invoiceDownloadSelected]);

  if (invoiceSelected) {
    return (
      <Invoice
        edit
        invoice={invoiceSelected}
        setInvoice={setInvoiceSelected}
        updateInvoice={updateInvoice}
        invoices={invoices}
      />
    );
  }

  return (
    <div className="invoice-tab-container">
      <Button
        onClick={() =>
          setInvoiceSelected({
            ...invoiceSceleton,
            id: invoicesLength,
            customer: {
              ...customerSceleton,
              id: customersLength,
            },
            company,
          })
        }
        primary
      >
        Neue Rechnung
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rechnungsnummer</Table.HeaderCell>
            <Table.HeaderCell>Rechnungsdatum</Table.HeaderCell>
            <Table.HeaderCell>Kunde</Table.HeaderCell>
            <Table.HeaderCell>Artikel</Table.HeaderCell>
            <Table.HeaderCell>Gesamtpreis</Table.HeaderCell>
            <Table.HeaderCell>Zahlungseingang</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {invoices.map(
            (i) =>
              i &&
              typeof i === "object" && (
                <Table.Row key={i.id}>
                  <Table.Cell>{i.invoiceNumber}</Table.Cell>
                  <Table.Cell>{formatDate(i.invoiceDate)}</Table.Cell>
                  <Table.Cell>{i.customer.name}</Table.Cell>
                  <Table.Cell>
                    {i.articles.map((a) => (
                      <p>{a.name}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>{formatPrice(i.totalPrice)} €</Table.Cell>
                  <Table.Cell>
                    {i.paymentDate ? formatDate(i.paymentDate) : "Ausstehend"}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      primary
                      icon="download"
                      onClick={() => setInvoiceDownloadSelected(i)}
                    ></Button>
                    <Button
                      primary
                      icon="edit"
                      onClick={() => setInvoiceSelected(i)}
                    ></Button>
                    <Button
                      negative
                      icon="trash"
                      onClick={() => removeInvoice(i.id)}
                    ></Button>
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
      <div style={{ position: "absolute", opacity: "0.0" }}>
        {invoiceDownloadSelected && (
          <SinglePage id="singlePage" invoice={invoiceDownloadSelected} />
        )}
      </div>
    </div>
  );
};
