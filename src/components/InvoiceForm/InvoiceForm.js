import React, { useState, useMemo } from "react";
import { useCompany, useCustomers, useAuthors, useArticles } from "../../hooks";
import {
  Container,
  Form,
  Input,
  Card,
  Modal,
  Button,
  Checkbox,
  Dropdown,
  Segment,
} from "semantic-ui-react";

import DatePicker from "react-datepicker";

import {
  article as articleSceleton,
  customer as customerSceleton,
} from "../../sceletons";

import "react-datepicker/dist/react-datepicker.css";
import "./InvoiceForm.css";
import Article from "../Article";
import CustomerForm from "../CustomerForm/CustomerForm";
import CompanyForm from "../CompanyForm";
import { formatPrice } from "../../services";

export default ({
  invoice,
  setInvoice,
  formSelected = [],
  wrapperClass,
  setFormSelected,
}) => {
  const [customers] = useCustomers();
  const [company, setCompany] = useCompany();
  const [customer, setCustomer] = useState(
    customers[invoice.customer.id] || invoice.customer
  );
  const [articles, addToArticles] = useArticles();
  const [selectedArticles, setSelectedArticles] = useState(invoice.articles);
  const [article, setArticle] = useState({
    ...articleSceleton,
    id: articles.length,
  });
  const [toBePayed, setToBePayed] = useState(1);
  const [toBeSend, setToBeSend] = useState(1);
  const [newArticle, setNewArticle] = useState(undefined);
  const [porto, setPorto] = useState(invoice.porto);
  const [, , , updateAuthor] = useAuthors();

  const updateInvoice = (e, { name, value, checked }) => {
    if (name === "porto") {
      value = parseFloat(value.replace(",", "."));
      if (isNaN(value)) {
        setPorto("");
        return;
      }
      value = formatPrice(value);
      setPorto(value);
    }
    if (name === "payed") {
      value = checked;
    }
    setInvoice({ ...invoice, [name]: value });
  };

  const toggleNewArticle = () => setNewArticle(!newArticle);

  const addNewArticle = () => {
    addToArticles(article);
    setArticle({
      ...articleSceleton,
      id: articles.length + 1,
    });
    toggleNewArticle();
    if (article.authors.length > 0) {
      updateAuthor(article.authors[0]);
    }
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
    const list = [];
    return list.concat(
      articles.map((a) => {
        let text = a.name.slice(0, 7);
        if (text !== a.name) {
          text += "...";
        }
        return {
          key: a.id,
          value: a.id,
          text,
        };
      })
    );
  }, [articles]);

  const handleCustomerChange = (e, { value }) => {
    let customer;
    if (value < customers.length) customer = customers[value];
    else customer = { ...customerSceleton, id: customers.length };
    setCustomer(customer);
    setInvoice({
      ...invoice,
      customer,
    });
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
      const _articles = [...selectedArticles];
      _articles[id][name] = value;
      setSelectedArticles(_articles);
    }
    setInvoice({
      ...invoice,
      articles: selectedArticles.map((a) => ({
        ...articles[a.articleId],
        ...a,
      })),
    });
  };

  const removeArticle = (id) => {
    setSelectedArticles(selectedArticles.filter((a, i) => i !== id));
    setInvoice({
      ...invoice,
      articles: selectedArticles.map((a) => ({
        ...articles[a.articleId],
        ...a,
      })),
    });
  };

  return (
    <div className={wrapperClass}>
      <div className="invoice-form-buttons">
        <Button onClick={toggleNewArticle} primary>
          Neuen Artikel Anlegen
        </Button>
      </div>
      <div className={"invoice-form "}>
        {formSelected[0] === "customer" && (
          <Modal open onClose={() => setFormSelected([])} closeIcon>
            <div className="invoice-form-wrap">
              <Form>
                <Form.Field
                  label="Wählen Sie einen Kunden aus:"
                  control={Dropdown}
                  search
                  selection
                  options={customerOptions}
                  value={customer.id}
                  onChange={handleCustomerChange}
                />
              </Form>
              <Segment>
                <CustomerForm
                  customer={customer}
                  setCustomer={(customer) => {
                    setCustomer(customer);
                    setInvoice({
                      ...invoice,
                      customer,
                    });
                  }}
                />
              </Segment>
            </div>
          </Modal>
        )}
        <Container>
          <Card fluid>
            <Card.Content>
              <div className="invoice-form-wrap">
                <div>
                  <Form>
                    {selectedArticles.length > 0 && (
                      <div>
                        <h3>Artikel in der Rechnung</h3>
                        {selectedArticles.map((a, i) => (
                          <div>
                            <Form.Group widths="equal">
                              <Form.Input
                                fluid
                                name="toBeSend"
                                type="number"
                                label="Senden"
                                value={a.toBeSend}
                                onChange={(e, { value, name }) =>
                                  handleArticleChange(i, name, value)
                                }
                              />
                              <Form.Input
                                fluid
                                name="toBePayed"
                                type="number"
                                label="Bezahlen"
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
                              <Form.Field>
                                <label>&nbsp;</label>
                                <Button
                                  icon="trash"
                                  negative
                                  onClick={() => removeArticle(i)}
                                />
                              </Form.Field>
                            </Form.Group>
                          </div>
                        ))}
                        <hr></hr>
                      </div>
                    )}
                    <h3>Artikel hinzufügen</h3>

                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        name="amount"
                        type="number"
                        label="Zu Senden"
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
                </div>
                <Modal open={newArticle} onClose={toggleNewArticle} closeIcon>
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
                      positive
                      icon="check"
                      labelPosition="right"
                    ></Button>
                  </Modal.Actions>
                </Modal>
              </div>
            </Card.Content>
          </Card>
          {formSelected[0] === "general" && (
            <Modal open onClose={() => setFormSelected([])} closeIcon>
              <div className="invoice-form-wrap">
                <Form>
                  <Form.Group fluid widths="equal">
                    {formSelected[1] === "invoiceDate" && (
                      <Form.Field
                        label="Rechnungsdatum"
                        name="invoiceDate"
                        selected={new Date(invoice.invoiceDate)}
                        onChange={(v) => updateInvoiceDate(v, "invoiceDate")}
                        control={DatePicker}
                        dateFormat="dd/MM/yyyy"
                      />
                    )}
                    {formSelected[1] === "orderDate" && (
                      <Form.Field
                        label="Bestelldatum"
                        name="orderDate"
                        selected={new Date(invoice.orderDate)}
                        onChange={(v) => updateInvoiceDate(v, "orderDate")}
                        control={DatePicker}
                        dateFormat="dd/MM/yyyy"
                      />
                    )}
                    {formSelected[1] === "shippingDate" && (
                      <Form.Field
                        label="Versanddatum"
                        name="shippingDate"
                        selected={new Date(invoice.shippingDate)}
                        onChange={(v) => updateInvoiceDate(v, "shippingDate")}
                        control={DatePicker}
                        dateFormat="dd/MM/yyyy"
                      />
                    )}
                  </Form.Group>
                  <Form.Group fluid widths="equal">
                    {formSelected[1] === "porto" && (
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
                    )}
                    {formSelected[1] === "invoiceNumber" && (
                      <Form.Field
                        label="Rechnungsnummer"
                        name="invoiceNumber"
                        value={invoice.invoiceNumber}
                        onChange={updateInvoice}
                        control={Input}
                      />
                    )}
                  </Form.Group>

                  {formSelected[1] === "payed" && (
                    <div>
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
                    </div>
                  )}
                </Form>
                <CompanyForm
                  company={company}
                  setCompany={(company) => {
                    setCompany(company);
                    setInvoice({
                      ...invoice,
                      company,
                    });
                  }}
                  selected={formSelected[1]}
                />
              </div>
            </Modal>
          )}
        </Container>
      </div>
    </div>
  );
};
