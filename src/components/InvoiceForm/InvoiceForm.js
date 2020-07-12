import React, { useState, useMemo } from "react";
import { useCompany, useCustomers, useArticles } from "../../hooks";
import {
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
  service as serviceSceleton,
} from "../../sceletons";

import "react-datepicker/dist/react-datepicker.css";
import "./InvoiceForm.css";
import Article from "../Article";
import CustomerForm from "../CustomerForm";
import CompanyForm from "../CompanyForm";
import { formatPrice } from "../../services";
import ServiceForm from "../ServiceForm";

export default ({
  invoice,
  setInvoice,
  formSelected = [],
  wrapperClass,
  setFormSelected,
}) => {
  const [customers, , , , customersLength, getCustomerById] = useCustomers();
  const [company, setCompany] = useCompany();
  const [customer, setCustomer] = useState(
    getCustomerById(invoice.customer._id) || invoice.customer
  );
  const [articles, addToArticles, , , , getArticleById] = useArticles();
  const [selectedArticles, setSelectedArticles] = useState(invoice.articles);
  const [article, setArticle] = useState(articleSceleton);
  const [toBePayed, setToBePayed] = useState(1);
  const [toBeSend, setToBeSend] = useState(1);
  const [newArticle, setNewArticle] = useState(undefined);
  const [porto, setPorto] = useState(invoice.porto);
  const [showAdvancedSetting, setShowAdvancedSetting] = useState();

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
    toggleNewArticle();
  };

  const updateInvoiceDate = (value, name) => {
    setInvoice({ ...invoice, [name]: value.toString() });
  };

  const customerOptions = useMemo(() => {
    let list = [
      {
        key: "empty",
        value: undefined,
        text: `Neuer Kunde`,
      },
    ];
    return list.concat(
      customers.map((c) => ({
        key: c._id,
        text: c.name,
        value: c._id,
      }))
    );
  }, [customers]);

  const articlesOptions = useMemo(() => {
    const list = [{ text: "", key: undefined, value: undefined }];
    return list.concat(
      articles.map((a) => {
        let text = a.name;
        return {
          key: a._id,
          value: a._id,
          text,
        };
      })
    );
  }, [articles]);

  const handleCustomerChange = (e, { value }) => {
    let customer;
    if (value < customersLength) customer = getCustomerById(value);
    else customer = { ...customerSceleton, id: customersLength };
    setCustomer(customer);
    setInvoice({
      ...invoice,
      customer,
    });
  };

  const handleArticleChange = (id, name, value) => {
    let _selectedArticles;
    if (id >= selectedArticles.length) {
      _selectedArticles = [
        ...selectedArticles,
        { toBeSend, toBePayed, ...getArticleById(value) },
      ];
      setToBeSend(1);
      setToBePayed(1);
    } else {
      _selectedArticles = [...selectedArticles];
      _selectedArticles[id][name] = value;
    }
    setSelectedArticles(_selectedArticles);
    setInvoice({
      ...invoice,
      articles: _selectedArticles.map((a) => ({
        ...a,
        ...getArticleById(a._id),
      })),
    });
  };

  const removeArticle = (id) => {
    const _selectedArticles = selectedArticles.filter((a, i) => i !== id);
    setSelectedArticles(_selectedArticles);
    setInvoice({
      ...invoice,
      articles: _selectedArticles.map((a) => ({
        ...getArticleById(a._id),
        ...a,
      })),
    });
  };

  const setService = (id, { name, value }) => {
    const _services = [...invoice.services];
    _services[id][name] = value;
    setInvoice({ ...invoice, services: _services });
  };

  const removeService = (id) => {
    console.log(id);
    setInvoice({
      ...invoice,
      services: invoice.services.filter((s, i) => {
        console.log(i, id);
        return i !== id;
      }),
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
                  value={customer._id}
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
        <div>
          <Card fluid>
            <Card.Content>
              <div className="invoice-form-wrap">
                <div>
                  <Form>
                    {selectedArticles.length > 0 && (
                      <div>
                        <h3>Artikel in der Rechnung</h3>
                        {selectedArticles.map((a, i) => (
                          <div className="billeroo-invoice-form-selected-article-card">
                            <Form.Group widths="equal">
                              <Form.Field
                                control={Dropdown}
                                fluid
                                label="Artikel"
                                name="articleId"
                                search
                                selection
                                options={articlesOptions}
                                value={a._id}
                                onChange={(e, { value, name }) =>
                                  handleArticleChange(i, name, value)
                                }
                              />
                            </Form.Group>
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
                      <Form.Field
                        control={Dropdown}
                        fluid
                        label="Artikel"
                        name="articleId"
                        search
                        selection
                        options={articlesOptions}
                        value={"empty"}
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
                    <Article
                      article={article}
                      setArticle={setArticle}
                      authorsEnabled={false}
                    />
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
          <Card fluid>
            <Card.Content>
              <h3>Dienstleistungen in der Rechnung</h3>
              <div>
                {invoice.services.map((service, i) => (
                  <div className="billeroo-invoice-form-service-form">
                    <ServiceForm
                      key={service}
                      service={service}
                      onChange={({ name, value }) =>
                        setService(i, { name, value })
                      }
                      onRemove={() => removeService(i)}
                    />
                  </div>
                ))}
              </div>
              <Button
                primary
                content="Dienstleistung hinzufügen"
                icon="plus"
                onClick={() =>
                  setInvoice({
                    ...invoice,
                    services: [...invoice.services, serviceSceleton],
                  })
                }
              />
            </Card.Content>
          </Card>
          <Button
            content="Erweiterte Einstellungen"
            onClick={() => setShowAdvancedSetting(true)}
          />
          <Modal
            open={showAdvancedSetting}
            onClose={() => setShowAdvancedSetting(false)}
          >
            <Modal.Header>Erweiterte Einstellungen</Modal.Header>
            <Modal.Content>
              <Checkbox
                toggle
                label="Versand anzeigen"
                onChange={() => {
                  console.log("hey");
                  updateInvoice(undefined, {
                    name: "shippingDisabled",
                    value: !invoice.shippingDisabled,
                  });
                }}
                checked={!invoice.shippingDisabled}
              />
            </Modal.Content>
          </Modal>
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
                        label="Versandkosten (Netto)"
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
        </div>
      </div>
    </div>
  );
};
