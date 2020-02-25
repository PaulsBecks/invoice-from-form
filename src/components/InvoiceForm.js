import React, { useState } from "react";
import {
  Accordion,
  Container,
  Form,
  Icon,
  Input,
  Card
} from "semantic-ui-react";
import { article as articleSceleton } from "../sceletons";

export default ({ invoice, setInvoice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const setIndex = (e, props) => {
    setActiveIndex(props.index);
  };

  const handleCustomerChange = (e, { name, value }) => {
    if (name === "ust" || name === "discount") {
      value = parseFloat(value);
      if (isNaN(value)) return;
    }

    setInvoice({
      ...invoice,
      customer: { ...invoice.customer, [name]: value }
    });
  };

  console.log(invoice.articles);
  const handleArticleChange = (article, position, { name, value }) => {
    if (name === "price") {
      value = parseFloat(value);
      if (isNaN(value)) return;
      value = value.toFixed(2);
    }
    let articles = invoice.articles;
    let updatedArticle = { ...article, [name]: value };
    if (updatedArticle.empty) {
      updatedArticle.empty = false;
      articles.push(articleSceleton);
    }
    articles[position] = { ...updatedArticle };
    setInvoice({ ...invoice, articles });
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
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={setIndex}
              >
                <Icon name="dropdown" />
                Kunde
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Form>
                  <Form.Group width="equal">
                    <Form.Field
                      id="form-input-control-name"
                      control={Input}
                      label="Name"
                      placeholder="Name"
                      name="name"
                      onChange={handleCustomerChange}
                      value={invoice.customer.name}
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
                      value={invoice.customer.address}
                    />
                    <Form.Field
                      id="form-input-control-last-name"
                      control={Input}
                      label="PLZ"
                      placeholder="PLZ"
                      name="postCode"
                      onChange={handleCustomerChange}
                      value={invoice.customer.postCode}
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
                      value={invoice.customer.city}
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
                      value={invoice.customer.ust}
                    />
                    <Form.Field
                      id="form-input-control-last-name"
                      control={Input}
                      label="Rabat"
                      placeholder="0"
                      icon="percent"
                      name="discount"
                      onChange={handleCustomerChange}
                      value={invoice.customer.discount}
                    />
                  </Form.Group>
                </Form>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={setIndex}
              >
                <Icon name="dropdown" />
                Artikel
              </Accordion.Title>
              {invoice.articles.map((a, i) => (
                <Accordion.Content active={activeIndex === 1} index={1}>
                  <Form>
                    <Form.Group width="equal">
                      <Form.Field
                        id="form-input-control-name"
                        control={Input}
                        label="Name"
                        placeholder="Name"
                        name="name"
                        onChange={(e, props) =>
                          handleArticleChange(a, i, props)
                        }
                        value={a.name}
                      />
                      <Form.Field
                        id="form-input-control-name"
                        control={Input}
                        label="Menge"
                        placeholder="Menge"
                        type="number"
                        onChange={(e, props) =>
                          handleArticleChange(a, i, props)
                        }
                        name="amount"
                        value={a.amount}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Field
                        id="form-input-control-last-name"
                        control={Input}
                        label="ISBN"
                        placeholder="ISBN"
                        name="isbn"
                        onChange={(e, props) =>
                          handleArticleChange(a, i, props)
                        }
                        value={a.isbn}
                      />
                      <Form.Field
                        id="form-input-control-last-name"
                        control={Input}
                        label="Preis"
                        placeholder="Preis"
                        name="price"
                        icon="euro sign"
                        onChange={(e, props) =>
                          handleArticleChange(a, i, props)
                        }
                        value={a.price}
                      />
                    </Form.Group>
                  </Form>
                </Accordion.Content>
              ))}
            </Accordion>
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};
