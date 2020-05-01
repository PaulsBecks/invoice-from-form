import React, { useState } from "react";
import { useCompany, useInvoices, useCustomers } from "../hooks";

import { Button, Icon, Table } from "semantic-ui-react";
import Invoice from "./Invoice";
import {
  invoice as invoiceSceleton,
  customer as customerSceleton,
} from "../sceletons";
import { formatDate, formatPrice } from "../services";

export default () => {
  const [invoices, setInvoices] = useInvoices();
  const [invoiceSelected, setInvoiceSelected] = useState();
  const [company] = useCompany();
  const [customers] = useCustomers();

  if (invoiceSelected) {
    return (
      <Invoice
        edit
        invoice={invoiceSelected}
        setInvoice={setInvoiceSelected}
        setInvoices={setInvoices}
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
            id: invoices.length,
            customer: {
              ...customerSceleton,
              id: customers.length,
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
          {invoices.map((i) => (
            <Table.Row>
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
                  icon="edit"
                  onClick={() => setInvoiceSelected(i)}
                ></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
