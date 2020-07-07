import React, { useState, useEffect } from "react";
import { useInvoices, useGA } from "../../hooks";

import { Button, Table, Checkbox, Form } from "semantic-ui-react";
import { formatDate, formatPrice, printInvoice } from "../../services";
import SinglePage from "../SinglePage/SinglePage";
import { Switch, Route, useRouteMatch, useHistory } from "react-router";
import InvoiceNew from "../../pages/InvoiceNew/InvoiceNew";
import InvoiceDetail from "../../pages/InvoiceDetail/InvoiceDetail";
import ReactDatePicker from "react-datepicker";
import sendInvoice from "../../services/sendInvoice";
import SendEmailInvoiceModal from "../SendEmailInvoiceModal/SendEmailInvoiceModal";
import DeleteAckModal from "../DeleteAckModal";

export default () => {
  const [invoices, , removeInvoice, updateInvoice] = useInvoices();
  const [invoiceDownloadSelected, setInvoiceDownloadSelected] = useState();
  const [invoiceEmailSelected, setInvoiceEmailSelected] = useState();
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

  async function send(options) {
    await sendInvoice("singlePage", options);
    setInvoiceEmailSelected();
  }

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
                <Table.HeaderCell>Gesamtpreis</Table.HeaderCell>
                <Table.HeaderCell>Zahlungseingang</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {invoices.map((invoice, index, invoices) => {
                const i = invoices[invoices.length - 1 - index];
                return (
                  <Table.Row key={i._id}>
                    <Table.Cell>{i.invoiceNumber}</Table.Cell>
                    <Table.Cell>{formatDate(i.invoiceDate)}</Table.Cell>
                    <Table.Cell>{i.customer.name}</Table.Cell>
                    <Table.Cell>{formatPrice(i.totalPrice)} €</Table.Cell>
                    <Table.Cell>
                      <Form style={{ marginBottom: 0 }}>
                        <Form.Group
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0",
                          }}
                        >
                          <Checkbox
                            onChange={(e, { name, checked }) => {
                              if (checked) {
                                updateInvoice({
                                  ...i,
                                  [name]: checked,
                                  paymentDate: new Date(),
                                });
                              } else {
                                updateInvoice({
                                  ...i,
                                  [name]: checked,
                                  paymentDate: undefined,
                                });
                              }
                            }}
                            name="payed"
                            checked={i.payed}
                            toggle
                          />
                          {i.payed && i.paymentDate ? (
                            <Form.Field
                              selected={new Date(i.paymentDate)}
                              onChange={(v) =>
                                updateInvoice({ ...i, paymentDate: v })
                              }
                              control={ReactDatePicker}
                              dateFormat="dd/MM/yyyy"
                              transparent
                            />
                          ) : (
                            <span style={{ marginLeft: "0.5em" }}>
                              Ausstehend
                            </span>
                          )}
                        </Form.Group>
                      </Form>
                    </Table.Cell>
                    <Table.Cell style={{}}>
                      <Button
                        primary
                        icon="edit"
                        onClick={() => history.push(`${path}/${i._id}`)}
                      ></Button>
                      <Button.Group>
                        <Button
                          secondary
                          icon="download"
                          onClick={() => setInvoiceDownloadSelected(i)}
                        ></Button>
                        <Button
                          style={{
                            borderLeft: "1px solid white",
                            marginRight: "2px",
                          }}
                          secondary
                          icon="mail"
                          onClick={() => setInvoiceEmailSelected(i)}
                        ></Button>
                      </Button.Group>{" "}
                      <DeleteAckModal
                        onDelete={() => removeInvoice(i._id)}
                        type="Rechnung"
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <div style={{ position: "absolute", opacity: "0.0" }}>
            {(invoiceDownloadSelected || invoiceEmailSelected) && (
              <SinglePage
                id="singlePage"
                invoice={invoiceDownloadSelected || invoiceEmailSelected}
              />
            )}
          </div>
          {invoiceEmailSelected && (
            <SendEmailInvoiceModal
              invoice={invoiceEmailSelected}
              setInvoice={setInvoiceEmailSelected}
              onSend={send}
            />
          )}
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
