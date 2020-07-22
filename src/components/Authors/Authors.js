import React, { useState } from "react";
import { Button, Table, Modal } from "semantic-ui-react";
import { useAuthors, useGA, useArticleAuthors, useStats } from "../../hooks";
import { author as authorSceleton } from "../../sceletons";
import Author from "../Author";
import DeleteAckModal from "../DeleteAckModal";
import { parsePrice, formatPrice } from "../../services";

export default function Authors() {
  const [authors, , deleteAuthor, updateAuthor, authorsLength] = useAuthors();
  const [author, setAuthor] = useState();
  const [, articlesByAuthor, , , ,] = useArticleAuthors();
  const [{ articleStats }] = useStats();
  const [authorArticles, setAuthorArticles] = useState();
  useGA();

  return (
    <div>
      <Button
        onClick={() => setAuthor({ ...authorSceleton, id: authorsLength })}
        primary
      >
        Neuer Autor
      </Button>
      {authorArticles && (
        <Modal onClose={() => setAuthorArticles()} open={true}>
          <Modal.Header>Autoren Abrechnung</Modal.Header>
          <Modal.Content>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Artikel</Table.HeaderCell>
                  <Table.HeaderCell>Verkauft</Table.HeaderCell>
                  <Table.HeaderCell>Netto Erlös</Table.HeaderCell>
                  <Table.HeaderCell>Prozent</Table.HeaderCell>
                  <Table.HeaderCell>Honorar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Object.values(authorArticles).map((as) => {
                  const stats = articleStats[as.articleId];
                  if (!stats) {
                    return null;
                  }
                  return (
                    <Table.Row key={as.articleId}>
                      <Table.Cell>{stats.name}</Table.Cell>
                      <Table.Cell>{stats.totalSold}</Table.Cell>
                      <Table.Cell>
                        {formatPrice(stats.totalTurnoverNet)} €
                      </Table.Cell>
                      <Table.Cell>{as.percent}</Table.Cell>
                      <Table.Cell>
                        {formatPrice(
                          (stats.totalTurnoverNet * parsePrice(as.percent)) /
                            100
                        )}{" "}
                        €
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
      )}
      {author && (
        <Modal onClose={() => setAuthor()} open={true}>
          <Modal.Header>Author</Modal.Header>
          <Modal.Content>
            <Author author={author} setAuthor={setAuthor} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setAuthor()}
              content="Abbrechen"
              negative
              icon="close"
              labelPosition="right"
            ></Button>
            <Button
              onClick={() => {
                updateAuthor(author);
                setAuthor();
              }}
              content="Speichern"
              primary
              icon="check"
              labelPosition="right"
            ></Button>
          </Modal.Actions>
        </Modal>
      )}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Kontakt</Table.HeaderCell>
            <Table.HeaderCell>Prozent</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {authors.map(
            (a, i) =>
              a && (
                <Table.Row key={a._id}>
                  <Table.Cell>{a._id}</Table.Cell>
                  <Table.Cell>{a.name}</Table.Cell>
                  <Table.Cell>{a.contact}</Table.Cell>
                  <Table.Cell>{a.percent} %</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => setAuthor(a)}
                      icon="edit"
                      primary
                    ></Button>
                    <Button
                      onClick={() => {
                        setAuthorArticles(articlesByAuthor(a._id));
                      }}
                      icon="list"
                      secondary
                    />
                    <DeleteAckModal
                      onDelete={() => deleteAuthor(a._id)}
                      type="Autor"
                    />
                  </Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
