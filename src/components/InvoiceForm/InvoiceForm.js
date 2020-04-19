import React, { useState, useMemo, useEffect } from "react";
import {
  useLocalStorage,
  useInvoices,
  useCompany,
  useCustomers,
} from "../../hooks";
import {
  Accordion,
  Container,
  Form,
  Icon,
  Input,
  Card,
  Modal,
  Label,
  Button,
  Checkbox,
  Dropdown,
  Tab,
} from "semantic-ui-react";

import DatePicker from "react-datepicker";

import {
  article as articleSceleton,
  customer as customerSceleton,
} from "../../sceletons";

import "react-datepicker/dist/react-datepicker.css";
import "./InvoiceForm.css";
import { calculateTotalPrice } from "../../services";
import Article from "../Article";
import CustomerForm from "../CustomerForm/CustomerForm";
import CompanyForm from "../CompanyForm";

export default ({ invoice, setInvoice, setInvoices }) => {
  const [customers, setCustomers] = useCustomers();
  const [company, setCompany] = useCompany();
  const [customer, setCustomer] = useState(
    customers[invoice.customer.id] || invoice.customer
  );
  const [articles, setArticles] = useLocalStorage("articles", []);
  const [selectedArticles, setSelectedArticles] = useState(invoice.articles);
  const [article, setArticle] = useState({
    ...articleSceleton,
    id: articles.length,
  });
  const [toBePayed, setToBePayed] = useState(1);
  const [toBeSend, setToBeSend] = useState(1);
  const [newArticle, setNewArticle] = useState(undefined);
  const [invoices] = useInvoices();
  const [porto, setPorto] = useState(invoice.porto);

  useEffect(() => {
    setInvoice({
      ...invoice,
      customer,
      articles: selectedArticles.map((a) => ({
        ...articles[a.articleId],
        ...a,
      })),
      company,
    });
  }, [customer, selectedArticles, company]);

  const updateInvoice = (e, { name, value, checked }) => {
    if (name === "porto") {
      value = parseFloat(value);
      if (isNaN(value)) {
        setPorto("");
        return;
      }
      value = value.toFixed(2);
      setPorto(value);
    }
    if (name === "payed") {
      value = checked;
    }
    setInvoice({ ...invoice, [name]: value });
  };

  const toggleNewArticle = () => setNewArticle(!newArticle);

  const updateArticleAmount = (id, amountChange) => {
    let _articles = [...articles];
    const article = _articles[id];
    _articles[id] = {
      ...article,
      amount: parseFloat(article.amount) + amountChange,
    };
    setArticles(_articles);
  };

  const addNewArticle = () => {
    setArticles([...articles, article]);
    toggleNewArticle();
  };

  const saveInvoice = () => {
    const updateInvoiceArticles = (invoice, mul = 1) => {
      if (invoice) {
        for (let a in invoice.articles) {
          updateArticleAmount(
            invoice.articles[a].id,
            mul * invoice.articles[a].amount
          );
        }
      }
    };
    invoice["totalPrice"] = calculateTotalPrice(invoice);
    let _invoices = [...invoices];
    updateInvoiceArticles(invoices[invoice.id]);
    _invoices[invoice.id] = invoice;
    updateInvoiceArticles(_invoices[invoice.id], -1);
    setInvoices(_invoices);
    setInvoice();
    const _customers = [...customers];
    _customers[customer.id] = customer;
    setCustomers(_customers);
  };

  const updateInvoiceDate = (value, name) => {
    setInvoice({ ...invoice, [name]: value.toString() });
  };

  const customerOptions = useMemo(() => {
    let list = [
      {
        key: customers.length,
        value: customers.length,
        text: `Neuer Kunde`,
      },
    ];
    return list.concat(
      customers.map((c) => ({
        key: c.id,
        text: c.name,
        value: c.id,
      }))
    );
  }, [customers, customer]);

  const articlesOptions = useMemo(() => {
    const list = [{ key: articles.length, value: articles.length, text: "" }];
    return list.concat(
      articles.map((a) => ({
        key: a.id,
        value: a.id,
        text: a.name,
      }))
    );
  }, [articles]);

  const handleCustomerChange = (e, { value }) => {
    if (value < customers.length) setCustomer(customers[value]);
    else setCustomer({ ...customerSceleton, id: customers.length });
  };

  const handleArticleChange = (id, name, value) => {
    if (id >= selectedArticles.length) {
      if (value >= articles.length) {
        return;
      }
      setSelectedArticles([
        ...selectedArticles,
        { toBeSend, toBePayed, articleId: value },
      ]);
      setToBeSend(1);
      setToBePayed(1);
    } else {
      if (name === "articleId" && value >= articles.length) {
        setSelectedArticles(selectedArticles.filter((a, i) => i !== id));
        return;
      }
      const _articles = [...selectedArticles];
      _articles[id][name] = value;
      setSelectedArticles(_articles);
    }
  };

  return (
    <div className="invoice-form">
      <Container>
        <Card fluid>
          <Card.Content>
            <Card.Header>Rechnungsdaten</Card.Header>
          </Card.Content>
          <Card.Content>
            <Tab
              panes={[
                {
                  menuItem: "Kunde",
                  render: () => (
                    <div className="">
                      <Form>
                        <Form.Field
                          label="Kunden"
                          control={Dropdown}
                          search
                          selection
                          options={customerOptions}
                          value={customer.id}
                          onChange={handleCustomerChange}
                        />
                      </Form>
                      <CustomerForm
                        customer={customer}
                        setCustomer={setCustomer}
                      />
                    </div>
                  ),
                },
                {
                  menuItem: "Artikel",
                  render: () => (
                    <div>
                      <div>
                        <Form>
                          {selectedArticles.map((a, i) => (
                            <div>
                              <Form.Group widths="equal">
                                <Form.Input
                                  fluid
                                  name="toBeSend"
                                  type="number"
                                  label="Zu Senden"
                                  value={a.toBeSend}
                                  onChange={(e, { value, name }) =>
                                    handleArticleChange(i, name, value)
                                  }
                                />
                                <Form.Input
                                  fluid
                                  name="toBePayed"
                                  type="number"
                                  label="Zu Bezahlen"
                                  value={a.toBePayed}
                                  onChange={(e, { value, name }) =>
                                    handleArticleChange(i, name, value)
                                  }
                                />

                                <Form.Field
                                  control={Dropdown}
                                  fluid
                                  label="Artikel"
                                  name="articleId"
                                  search
                                  selection
                                  options={articlesOptions}
                                  value={a.articleId}
                                  onChange={(e, { value, name }) =>
                                    handleArticleChange(i, name, value)
                                  }
                                />
                              </Form.Group>
                            </div>
                          ))}
                          <Form.Group widths="equal">
                            <Form.Input
                              fluid
                              name="amount"
                              type="number"
                              label="Erhalten"
                              value={toBeSend}
                              onChange={(e, { value }) => setToBeSend(value)}
                            />
                            <Form.Input
                              fluid
                              name="amountPayed"
                              type="number"
                              label="Zu Bezahlen"
                              value={toBePayed}
                              onChange={(e, { value }) => setToBePayed(value)}
                            />

                            <Form.Field
                              control={Dropdown}
                              fluid
                              label="Artikel"
                              name="articleId"
                              search
                              selection
                              options={articlesOptions}
                              value={article.id}
                              onChange={(e, { value }) =>
                                handleArticleChange(
                                  selectedArticles.length,
                                  "articleId",
                                  value
                                )
                              }
                            />
                          </Form.Group>
                        </Form>
                        <Button onClick={toggleNewArticle}>
                          Neuen Artikel Anlegen
                        </Button>
                      </div>
                      <Modal open={newArticle} onClose={toggleNewArticle}>
                        <Modal.Header>Neuer Artikel</Modal.Header>
                        <Modal.Content>
                          <Article article={article} setArticle={setArticle} />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            onClick={toggleNewArticle}
                            content="Abbrechen"
                            negative
                            icon="close"
                            labelPosition="right"
                          ></Button>
                          <Button
                            onClick={addNewArticle}
                            content="Anlegen"
                            primary
                            icon="check"
                            labelPosition="right"
                          ></Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  ),
                },
                {
                  menuItem: "Allgemein",
                  render: () => (
                    <div>
                      <Form>
                        <Form.Field
                          label="Rechnungsdatum"
                          name="invoiceDate"
                          selected={new Date(invoice.invoiceDate)}
                          onChange={(v) => updateInvoiceDate(v, "invoiceDate")}
                          control={DatePicker}
                          dateFormat="dd/MM/yyyy"
                        />
                        <Form.Field
                          label="Bestelldatum"
                          name="orderDate"
                          selected={new Date(invoice.orderDate)}
                          onChange={(v) => updateInvoiceDate(v, "orderDate")}
                          control={DatePicker}
                          dateFormat="dd/MM/yyyy"
                        />
                        <Form.Field
                          label="Versanddatum"
                          name="shippingDate"
                          selected={new Date(invoice.shippingDate)}
                          onChange={(v) => updateInvoiceDate(v, "shippingDate")}
                          control={DatePicker}
                          dateFormat="dd/MM/yyyy"
                        />
                        <Form.Field
                          label="Porto"
                          value={porto}
                          name="porto"
                          onChange={(e, { value }) => setPorto(value)}
                          control={Input}
                          onBlur={(e) =>
                            updateInvoice(e, {
                              name: e.target.name,
                              value: e.target.value,
                            })
                          }
                          icon="euro"
                        />
                        <Form.Field
                          label="Rechnungsnummer"
                          name="invoiceNumber"
                          value={invoice.invoiceNumber}
                          onChange={updateInvoice}
                          control={Input}
                        />
                        <Form.Field>
                          <label>Bezahlt</label>
                          <Checkbox
                            onChange={(e, { name, checked }) => {
                              if (checked) {
                                setInvoice({
                                  ...invoice,
                                  [name]: checked,
                                  paymentDate: new Date(),
                                });
                              } else {
                                setInvoice({
                                  ...invoice,
                                  [name]: checked,
                                  paymentDate: undefined,
                                });
                              }
                            }}
                            name="payed"
                            checked={invoice.payed}
                            toggle
                          />
                        </Form.Field>
                        {invoice.payed && (
                          <Form.Field
                            label="Zahlungseingangsdatum"
                            name="paymentDate"
                            selected={new Date(invoice.paymentDate)}
                            onChange={(v) =>
                              updateInvoiceDate(v, "paymentDate")
                            }
                            control={DatePicker}
                            dateFormat="dd/MM/yyyy"
                          />
                        )}
                      </Form>
                    </div>
                  ),
                },
                {
                  menuItem: "Firma",
                  render: () => (
                    <CompanyForm company={company} setCompany={setCompany} />
                  ),
                },
              ]}
            ></Tab>
          </Card.Content>
        </Card>
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
            content="Speichern"
            primary
            icon="check"
            labelPosition="right"
          ></Button>
        )}
      </Container>
    </div>
  );
};
