import React, { useState, useMemo } from "react";
import { useLocalStorage } from "../hooks";
import {
  Accordion,
  Container,
  Form,
  Icon,
  Input,
  Card,
  Modal,
  Label,
  Button
} from "semantic-ui-react";

import DatePicker from "react-datepicker";

import {
  article as articleSceleton,
  customer as customerSceleton
} from "../sceletons";

import "react-datepicker/dist/react-datepicker.css";
import "./InvoiceForm.css";
import { calculateTotalPrice } from "../services";

export default ({ invoice, setInvoice }) => {
  const [customers, setCustomers] = useLocalStorage("customers", []);
  const [customer, setCustomer] = useState(customerSceleton);
  const [newCustomer, setNewCustomer] = useState(undefined);
  const [customerSearch, setCustomerSearch] = useState("");
  const [articles, setArticles] = useLocalStorage("articles", []);
  const [article, setArticle] = useState(articleSceleton);
  const [articleAmount, setArticleAmount] = useState(1);
  const [articleSearch, setArticleSearch] = useState("");
  const [newArticle, setNewArticle] = useState(undefined);
  const [invoices, setInvoices] = useLocalStorage("invoices", []);

  const toggleNewArticle = () => setNewArticle(!newArticle);

  const filteredCustomers = useMemo(
    () =>
      customers.filter(c =>
        c.name.toLowerCase().includes(customerSearch.toLowerCase())
      ),
    [customers, customerSearch]
  );

  const filteredArticles = useMemo(
    () =>
      articles.filter(a =>
        a.name.toLowerCase().includes(articleSearch.toLowerCase())
      ),
    [articles, articleSearch]
  );

  const addNewCustomer = () => {
    setCustomers([...customers, customer]);
    setInvoice({ ...invoice, customer });
    toggleNewCustomer();
  };

  const removeCustomer = () => {
    setInvoice({ ...invoice, customer: undefined });
  };

  const handleCustomerChange = (e, { name, value }) => {
    if (name === "ust" || name === "discount") {
      value = parseFloat(value);
      if (isNaN(value)) return;
    }
    setCustomer({ ...customer, [name]: value });
  };

  const handleArticleChange = (e, { name, value }) => {
    if (name === "price") {
      value = parseFloat(value);
      if (isNaN(value)) return;
      value = value.toFixed(2);
    }
    setArticle({ ...article, [name]: value });
  };

  const addArticleToInvoice = article => {
    setInvoice({
      ...invoice,
      articles: [
        ...invoice.articles,
        { ...article, articleAmount: articleAmount }
      ]
    });
  };

  const addNewArticle = () => {
    setArticles([...articles, article]);
    addArticleToInvoice(article);
    toggleNewArticle();
  };

  const removeArticle = pos => {
    setInvoice({
      ...invoice,
      articles: invoice.articles.filter((a, i) => i !== pos)
    });
  };

  const toggleNewCustomer = () => {
    setNewCustomer(!newCustomer);
  };

  const saveInvoice = () => {
    invoice["totalPrice"] = calculateTotalPrice(invoice);
    let _invoices = [...invoices];
    _invoices[invoice.id] = invoice;
    setInvoices(_invoices);
    setInvoice();
  };

  const updateInvoiceDate = (value, name) => {
    setInvoice({ ...invoice, [name]: value.toString() });
  };

  return (
    <div className="invoice-form">
      <Container>
        <Card fluid>
          <Card.Content>
            <Card.Header>Rechnungsdaten</Card.Header>
          </Card.Content>
          <Card.Content>
            <Accordion>
              <Accordion.Title index={0}>
                <Icon name="dropdown" />
                Kunde
              </Accordion.Title>
              <Accordion.Content active={true}>
                {invoice.customer ? (
                  <div class="invoice-form-label-container">
                    <Label>
                      {invoice.customer.name}
                      <Icon name="delete" onClick={removeCustomer} />
                    </Label>
                  </div>
                ) : (
                  <div>
                    <Input
                      placeholder="Suche..."
                      onChange={(e, { value }) => setCustomerSearch(value)}
                      value={customerSearch}
                    />
                    {customerSearch == "" ? (
                      <Button onClick={toggleNewCustomer}>Neuer Kunde</Button>
                    ) : (
                      <div className="invoice-form-label-container">
                        {filteredCustomers.map(fc => (
                          <Label
                            onClick={() =>
                              setInvoice({ ...invoice, customer: fc })
                            }
                          >
                            {fc.name}
                          </Label>
                        ))}
                        {filteredCustomers.length == 0 && (
                          <p>No Customers found.</p>
                        )}
                      </div>
                    )}

                    <Modal open={newCustomer} onClose={toggleNewCustomer}>
                      <Modal.Header>Neuer Kunde</Modal.Header>
                      <Modal.Content>
                        <Form>
                          <Form.Group width="equal">
                            <Form.Field
                              id="form-input-control-name"
                              control={Input}
                              label="Name"
                              placeholder="Name"
                              name="name"
                              onChange={handleCustomerChange}
                              value={customer.name}
                            />
                            <Form.Field
                              id="form-input-control-name"
                              control={Input}
                              label="Geschäftsform"
                              placeholder="Geschäftsform"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Field
                              id="form-input-control-last-name"
                              control={Input}
                              label="Anschrift"
                              placeholder="Musterschstraße 3"
                              name="address"
                              onChange={handleCustomerChange}
                              value={customer.address}
                            />
                            <Form.Field
                              id="form-input-control-last-name"
                              control={Input}
                              label="PLZ"
                              placeholder="PLZ"
                              name="postCode"
                              onChange={handleCustomerChange}
                              value={customer.postCode}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Field
                              id="form-input-control-last-name"
                              control={Input}
                              label="Stadt"
                              placeholder="Stadt"
                              name="city"
                              onChange={handleCustomerChange}
                              value={customer.city}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Field
                              id="form-input-control-last-name"
                              control={Input}
                              label="MwST"
                              placeholder="7"
                              name="ust"
                              icon="percent"
                              onChange={handleCustomerChange}
                              value={customer.ust}
                            />
                            <Form.Field
                              id="form-input-control-last-name"
                              control={Input}
                              label="Rabat"
                              placeholder="0"
                              icon="percent"
                              name="discount"
                              onChange={handleCustomerChange}
                              value={customer.discount}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          onClick={toggleNewCustomer}
                          content="Abbrechen"
                          negative
                          icon="close"
                          labelPosition="right"
                        ></Button>
                        <Button
                          onClick={addNewCustomer}
                          content="Anlegen"
                          primary
                          icon="check"
                          labelPosition="right"
                        ></Button>
                      </Modal.Actions>
                    </Modal>
                  </div>
                )}
              </Accordion.Content>
              <Accordion.Title index={1}>
                <Icon name="dropdown" />
                Artikel
              </Accordion.Title>
              <Accordion.Content active={true}>
                <div className="invoice-form-label-container">
                  {invoice.articles.map((a, i) => {
                    return (
                      <Label>
                        {a.name}
                        <Label.Detail>{a.articleAmount}</Label.Detail>
                        <Icon
                          name="delete"
                          onClick={() => removeArticle(i)}
                        ></Icon>
                      </Label>
                    );
                  })}
                </div>
                <div>
                  <Input
                    name="amount"
                    type="number"
                    label="Menge"
                    value={articleAmount}
                    onChange={(e, { value }) => setArticleAmount(value)}
                  />

                  <Input
                    name="article"
                    placeholder="Suche..."
                    value={articleSearch}
                    onChange={(e, { value }) => setArticleSearch(value)}
                  />
                  {articleSearch == "" ? (
                    <Button onClick={toggleNewArticle}>Neuer Artikel</Button>
                  ) : (
                    <div className="invoice-form-label-container">
                      {filteredArticles.map(a => (
                        <Label onClick={() => addArticleToInvoice(a)}>
                          {a.name}
                        </Label>
                      ))}
                    </div>
                  )}
                </div>
                <Modal open={newArticle} onClose={toggleNewArticle}>
                  <Modal.Header>Neuer Artikel</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Form.Group width="equal">
                        <Form.Field
                          id="form-input-control-name"
                          control={Input}
                          label="Name"
                          placeholder="Name"
                          name="name"
                          onChange={handleArticleChange}
                          value={article.name}
                        />
                        <Form.Field
                          id="form-input-control-name"
                          control={Input}
                          label="Menge"
                          placeholder="Menge"
                          type="number"
                          onChange={handleArticleChange}
                          name="amount"
                          value={article.amount}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Field
                          id="form-input-control-last-name"
                          control={Input}
                          label="ISBN"
                          placeholder="ISBN"
                          name="isbn"
                          onChange={handleArticleChange}
                          value={article.isbn}
                        />
                        <Form.Field
                          id="form-input-control-last-name"
                          control={Input}
                          label="Preis"
                          placeholder="Preis"
                          name="price"
                          icon="euro sign"
                          onChange={handleArticleChange}
                          value={article.price}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      onClick={toggleNewCustomer}
                      content="Abbrechen"
                      negative
                      icon="close"
                      labelPosition="right"
                    ></Button>
                    <Button
                      onClick={addNewCustomer}
                      content="Anlegen"
                      primary
                      icon="check"
                      labelPosition="right"
                    ></Button>
                  </Modal.Actions>
                </Modal>
              </Accordion.Content>
              <Accordion.Title>
                <Icon name="dropdown" />
                Allgemein
              </Accordion.Title>
              <Accordion.Content active={true}>
                <Form>
                  <Form.Field
                    label="Rechnungsdatum"
                    name="invoiceDate"
                    selected={new Date(invoice.invoiceDate)}
                    onChange={v => updateInvoiceDate(v, "invoiceDate")}
                    control={DatePicker}
                    dateFormat="dd/MM/yyyy"
                  />
                  <Form.Field
                    label="Bestelldatum"
                    name="orderDate"
                    selected={new Date(invoice.orderDate)}
                    onChange={v => updateInvoiceDate(v, "orderDate")}
                    control={DatePicker}
                    dateFormat="dd/MM/yyyy"
                  />
                  <Form.Field
                    label="Versanddatum"
                    name="shippingDate"
                    selected={new Date(invoice.shippingDate)}
                    onChange={v => updateInvoiceDate(v, "shippingDate")}
                    control={DatePicker}
                    dateFormat="dd/MM/yyyy"
                  />
                  <Form.Field
                    label="Rechnungsnummer"
                    name="invoiceNumber"
                    value={invoice.invoiceNumber}
                    onChange={(e, { name, value }) =>
                      setInvoice({ ...invoice, [name]: value })
                    }
                    control={Input}
                  />
                </Form>
              </Accordion.Content>
            </Accordion>
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
