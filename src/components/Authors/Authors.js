import React, { useState } from "react";
import { Button, Table, Modal } from "semantic-ui-react";
import { useAuthors } from "../../hooks";
import { author as authorSceleton } from "../../sceletons";
import Author from "../Author";

export default function Authors() {
  const [authors, setAuthors] = useAuthors();
  const [author, setAuthor] = useState();

  function deleteAuthor(id) {
    const _authors = [...authors];
    _authors[id] = undefined;
    setAuthors(_authors);
  }

  function updateAuthors(id) {
    const _authors = [...authors];
    _authors[author.id] = author;
    setAuthors(_authors);
    setAuthor();
  }

  return (
    <div>
      <Button
        onClick={() => setAuthor({ authorSceleton, id: authors.length })}
        primary
      >
        Neuer Autor
      </Button>
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
              onClick={updateAuthors}
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
                <Table.Row>
                  <Table.Cell>{a.id}</Table.Cell>
                  <Table.Cell>{a.name}</Table.Cell>
                  <Table.Cell>{a.contact}</Table.Cell>
                  <Table.Cell>{a.percent} %</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => setAuthor(a)} icon="eye"></Button>
                    <Button
                      onClick={() => deleteAuthor(i)}
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
}
