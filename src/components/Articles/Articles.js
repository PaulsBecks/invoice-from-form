import React, { useState } from "react";
import { useArticles, useGA, useAuthors, useStats } from "../../hooks";
import { article as articleSceleton } from "../../sceletons";
import { Table, Button, Modal } from "semantic-ui-react";
import Article from "../Article";
import DeleteAckModal from "../DeleteAckModal";
import "./Articles.css";
import { formatDate, parsePrice, formatPrice } from "../../services";
import useArticleAuthors from "../../hooks/useArticleAuthors";

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
  const [{ articleStats }] = useStats();
  const [, , authorsByArticle] = useArticleAuthors();
  const [, , , , , getAuthorById] = useAuthors();
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
            <Article
              article={article}
              setArticle={setArticle}
              totalSend={
                articleStats[article._id]
                  ? articleStats[article._id].totalSend
                  : 0
              }
            />
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
                {articleStats[invoiceArticle._id] &&
                  articleStats[invoiceArticle._id].invoices.map((invoice) => (
                    <Table.Row key={invoice._id}>
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
                {articleStats[invoiceArticle._id] && (
                  <Table.Row active key="final-row">
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell>
                      {articleStats[invoiceArticle._id].totalSold}
                    </Table.Cell>
                    <Table.Cell>
                      {formatPrice(
                        articleStats[invoiceArticle._id].totalSold *
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
                <Table.Row key={a._id}>
                  <Table.Cell key="_id">{a._id}</Table.Cell>
                  <Table.Cell key="name">{a.name}</Table.Cell>
                  <Table.Cell key="isbn">{a.isbn}</Table.Cell>
                  <Table.Cell key="amount">
                    {articleStats[a._id]
                      ? parseInt(a.amount + "") - articleStats[a._id].totalSend
                      : a.amount}
                  </Table.Cell>
                  <Table.Cell key="price">{a.price} €</Table.Cell>
                  <Table.Cell key="authors">
                    {authorsByArticle(a._id).map((a) => (
                      <p key={a._id}>{getAuthorById(a.authorId).name}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell key="buttons">
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
                      onDelete={() => removeArticle(a._id)}
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
