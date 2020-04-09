import React, { useState, useMemo } from "react";
import { useArticles, useInvoices } from "../../hooks";
import { article as articleSceleton } from "../../sceletons";
import { Table, Button, Icon, Modal } from "semantic-ui-react";
import Article from "../Article";

import "./Articles.css";
import { formatDate } from "../../services";

export default () => {
  const [articles, setArticles] = useArticles();
  const [article, setArticle] = useState();
  const [invoiceArticle, setInvoiceArticle] = useState();
  const [invoices] = useInvoices();
  const filteredInvoices = useMemo(() => {
    if (!invoiceArticle) {
      return null;
    }
    return invoices.reduce((list, i) => {
      for (let a in i.articles) {
        const article = i.articles[a];
        if (article.id == invoiceArticle.id) {
          return [
            ...list,
            {
              ...i,
              article,
            },
          ];
        }
      }
      return list;
    }, []);
  });
  const updateArticle = () => {
    let _articles = [...articles];
    _articles[article.id] = article;
    setArticles(_articles);
    setArticle();
  };

  const deleteArticle = (pos) => {
    const _articles = [...articles];
    _articles[pos] = undefined;
    setArticles(_articles);
  };

  return (
    <div className="articles-tab-container">
      <Button
        onClick={() => setArticle({ ...articleSceleton, id: articles.length })}
        primary
      >
        Neuer Artikel
      </Button>
      {article && (
        <Modal onClose={() => setArticle()} open={true}>
          <Modal.Header>Edit Article</Modal.Header>
          <Modal.Content>
            <Article article={article} setArticle={setArticle} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setArticle()}
              content="Abbrechen"
              negative
              icon="close"
              labelPosition="right"
            ></Button>
            <Button
              onClick={updateArticle}
              content="Speichern"
              primary
              icon="check"
              labelPosition="right"
            ></Button>
          </Modal.Actions>
        </Modal>
      )}
      {invoiceArticle && (
        <Modal onClose={() => setInvoiceArticle()} open={true}>
          <Modal.Header>Rechnungen</Modal.Header>
          <Modal.Content>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rechnungsnummer</Table.HeaderCell>
                  <Table.HeaderCell>Kunde</Table.HeaderCell>
                  <Table.HeaderCell>Verkaufte Exemplare</Table.HeaderCell>
                  <Table.HeaderCell>Umsatz</Table.HeaderCell>
                  <Table.HeaderCell>Zahlungsdatum</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredInvoices.map((invoice) => (
                  <Table.Row>
                    <Table.Cell>{invoice.invoiceNumber}</Table.Cell>
                    <Table.Cell>{invoice.customer.name}</Table.Cell>
                    <Table.Cell>{invoice.article.amount}</Table.Cell>
                    <Table.Cell>{invoice.article.price}</Table.Cell>
                    <Table.Cell>{formatDate(invoice.paymentDate)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
      )}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Menge</Table.HeaderCell>
            <Table.HeaderCell>Preis</Table.HeaderCell>
            <Table.HeaderCell>Autoren</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {articles.map(
            (a, i) =>
              a && (
                <Table.Row>
                  <Table.Cell>{a.id}</Table.Cell>
                  <Table.Cell>{a.name}</Table.Cell>
                  <Table.Cell>{a.isbn}</Table.Cell>
                  <Table.Cell>{a.amount}</Table.Cell>
                  <Table.Cell>{a.price}</Table.Cell>
                  <Table.Cell>
                    {a.authors.map((a) => (
                      <p>{a.name}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => setArticle(a)} icon="edit"></Button>
                    <Button
                      onClick={() => setInvoiceArticle(a)}
                      icon="list"
                    ></Button>
                    <Button
                      onClick={() => deleteArticle(i)}
                      icon="delete"
                    ></Button>
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
