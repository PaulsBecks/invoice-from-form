import React, { useState } from "react";
import { useLocalStorage } from "../hooks";

import { Table, Button, Icon, Modal } from "semantic-ui-react";
import Article from "./Article";
export default () => {
  const [articles, setArticles] = useLocalStorage("articles", []);
  const [article, setArticle] = useState();

  const updateArticle = () => {
    let _articles = [...articles];
    _articles[article.id] = article;
    setArticles(_articles);
    setArticle();
  };

  const deleteArticle = pos => {
    setArticles(articles.filter((a, i) => i !== pos));
  };

  return (
    <div>
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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Menge</Table.HeaderCell>
            <Table.HeaderCell>Preis</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {articles.map((a, i) => (
            <Table.Row>
              <Table.Cell>{a.name}</Table.Cell>
              <Table.Cell>{a.isbn}</Table.Cell>
              <Table.Cell>{a.amount}</Table.Cell>
              <Table.Cell>{a.price}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => setArticle(a)} icon="eye"></Button>
                <Button onClick={() => deleteArticle(i)} icon="delete"></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
