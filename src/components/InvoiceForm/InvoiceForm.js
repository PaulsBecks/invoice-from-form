import React, { useState, useMemo } from "react";
import { useLocalStorage } from "../../hooks";
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

export default ({ invoice, setInvoice, setInvoices }) => {
  const [customers, setCustomers] = useLocalStorage("customers", []);
  const [customer, setCustomer] = useState({
    ...customerSceleton,
    id: customers.length,
  });
  const [newCustomer, setNewCustomer] = useState(undefined);
  const [customerSearch, setCustomerSearch] = useState("");
  const [articles, setArticles] = useLocalStorage("articles", []);
  const [article, setArticle] = useState({
    ...articleSceleton,
    id: articles.length,
  });
  const [articleAmount, setArticleAmount] = useState(1);
  const [articleSearch, setArticleSearch] = useState("");
  const [newArticle, setNewArticle] = useState(undefined);
  const [invoices] = useLocalStorage("invoices", []);
  const [porto, setPorto] = useState(invoice.porto);

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

  const filteredCustomers = useMemo(
    () =>
      customers.filter((c) =>
        c.name.toLowerCase().includes(customerSearch.toLowerCase())
      ),
    [customers, customerSearch]
  );

  const filteredArticles = useMemo(
    () =>
      articles.filter((a) =>
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

  const updateArticleAmount = (id, amountChange) => {
    let _articles = [...articles];
    const article = _articles[id];
    _articles[id] = {
      ...article,
      amount: parseFloat(article.amount) + amountChange,
    };
    setArticles(_articles);
  };

  const addArticleToInvoice = (article) => {
    setInvoice({
      ...invoice,
      articles: [...invoice.articles, { ...article, amount: articleAmount }],
    });
    setArticle();
    setArticleAmount(1);
  };

  const addNewArticle = () => {
    setArticles([...articles, article]);
    addArticleToInvoice(article);
    toggleNewArticle();
  };

  const removeArticle = (pos) => {
    setInvoice({
      ...invoice,
      articles: invoice.articles.filter((a, i) => i !== pos),
    });
  };

  const toggleNewCustomer = () => {
    setNewCustomer(!newCustomer);
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
  };

  const updateInvoiceDate = (value, name) => {
    setInvoice({ ...invoice, [name]: value.toString() });
  };

  console.log(invoice);

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
                  <div className="invoice-form-label-container">
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
                    {customerSearch === "" ? (
                      <Button onClick={toggleNewCustomer}>Neuer Kunde</Button>
                    ) : (
                      <div className="invoice-form-label-container">
                        {filteredCustomers.map((fc) => (
                          <Label
                            onClick={() =>
                              setInvoice({ ...invoice, customer: fc })
                            }
                          >
                            {fc.name}
                          </Label>
                        ))}
                        {filteredCustomers.length === 0 && (
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
                              label="Zusatz"
                              placeholder="Zusatz"
                              name="addition"
                              onChange={handleCustomerChange}
                              value={customer.addition}
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
                  {articleSearch === "" ? (
                    <Button onClick={toggleNewArticle}>Neuer Artikel</Button>
                  ) : (
                    <div className="invoice-form-label-container">
                      {filteredArticles.map((a) => (
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
                  <Form.TextArea
                    label="Freitext"
                    value={invoice.finalText}
                    onChange={updateInvoice}
                    name="finalText"
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
                      onChange={(v) => updateInvoiceDate(v, "paymentDate")}
                      control={DatePicker}
                      dateFormat="dd/MM/yyyy"
                    />
                  )}
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
