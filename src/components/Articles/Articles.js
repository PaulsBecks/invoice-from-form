import React, { useState } from "react";
import { useArticles, useArticleStats, useGA } from "../../hooks";
import { article as articleSceleton } from "../../sceletons";
import { Table, Button, Modal } from "semantic-ui-react";
import Article from "../Article";
import DeleteAckModal from "../DeleteAckModal";
import "./Articles.css";
import { formatDate, parsePrice, formatPrice } from "../../services";

export default () => {
  const [
    articles,
    ,
    removeArticle,
    updateArticle,
    articlesLength,
  ] = useArticles();
  const [article, setArticle] = useState();
  const [invoiceArticle, setInvoiceArticle] = useState();
  const invoiceStats = useArticleStats();
  useGA();

  return (
    <div className="articles-tab-container">
      <Button
        onClick={() => setArticle({ ...articleSceleton, id: articlesLength })}
        primary
      >
        Neuer Artikel
      </Button>
      {article && (
        <Modal onClose={() => setArticle()} open={true}>
          <Modal.Header>Artikel</Modal.Header>
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
              onClick={() => {
                updateArticle(article);
                setArticle();
              }}
              content="Speichern"
              positive
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
                {invoiceStats[invoiceArticle.id] &&
                  invoiceStats[invoiceArticle.id].invoices.map((invoice) => (
                    <Table.Row>
                      <Table.Cell>{invoice.invoiceNumber}</Table.Cell>
                      <Table.Cell>{invoice.customerName}</Table.Cell>
                      <Table.Cell>{invoice.payed}</Table.Cell>
                      <Table.Cell>
                        {formatPrice(
                          invoice.payed * parsePrice(invoiceArticle.price)
                        )}{" "}
                        €
                      </Table.Cell>
                      <Table.Cell>
                        {invoice.paymentDate
                          ? formatDate(invoice.paymentDate)
                          : "Ausstehend"}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {invoiceStats[invoiceArticle.id] && (
                  <Table.Row active>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell>
                      {invoiceStats[invoiceArticle.id].totalSold}
                    </Table.Cell>
                    <Table.Cell>
                      {formatPrice(
                        invoiceStats[invoiceArticle.id].totalSold *
                          parsePrice(invoiceArticle.price)
                      )}{" "}
                      €
                    </Table.Cell>
                    <Table.Cell />
                  </Table.Row>
                )}
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
            <Table.HeaderCell>Lagerbestand</Table.HeaderCell>
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
                  <Table.Cell>
                    {invoiceStats[a.id]
                      ? parseInt(a.amount + "") - invoiceStats[a.id].totalSend
                      : a.amount}
                  </Table.Cell>
                  <Table.Cell>{a.price} €</Table.Cell>
                  <Table.Cell>
                    {a.authors.map((a) => (
                      <p>{a.name}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => setArticle(a)}
                      primary
                      icon="edit"
                    ></Button>
                    <Button
                      onClick={() => setInvoiceArticle(a)}
                      icon="list"
                      secondary
                    ></Button>
                    <DeleteAckModal
                      type="Artikel"
                      onClick={() => removeArticle(i)}
                    />
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
