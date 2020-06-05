import React, { useState, useEffect } from "react";
import { useInvoices, useGA } from "../hooks";

import { Button, Table } from "semantic-ui-react";
import { formatDate, formatPrice, printInvoice } from "../services";
import SinglePage from "./SinglePage/SinglePage";
import { Switch, Route, useRouteMatch, useHistory } from "react-router";
import InvoiceNew from "../pages/InvoiceNew/InvoiceNew";
import InvoiceDetail from "../pages/InvoiceDetail/InvoiceDetail";

export default () => {
  const [invoices, , removeInvoice, updateInvoice] = useInvoices();
  const [invoiceDownloadSelected, setInvoiceDownloadSelected] = useState();
  useGA();
  const history = useHistory();
  let { path } = useRouteMatch();

  useEffect(() => {
    if (invoiceDownloadSelected) {
      async function print() {
        await printInvoice("singlePage", invoiceDownloadSelected.invoiceNumber);
        setInvoiceDownloadSelected();
      }
      print();
    }
  }, [invoiceDownloadSelected]);

  return (
    <Switch>
      <Route exact path={path}>
        <div className="invoice-tab-container">
          <Button onClick={() => history.push(`${path}/new`)} primary>
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
                        {i.paymentDate
                          ? formatDate(i.paymentDate)
                          : "Ausstehend"}
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
                          onClick={() => history.push(`${path}/${i.id}`)}
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
      </Route>
      <Route exact path={`${path}/new`}>
        <InvoiceNew updateInvoice={updateInvoice} />
      </Route>
      <Route path={`${path}/:invoiceId`}>
        <InvoiceDetail updateInvoice={updateInvoice} />
      </Route>
    </Switch>
  );
};
