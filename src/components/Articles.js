import React from "react";
import { useLocalStorage } from "../hooks";

import { Table } from "semantic-ui-react";
export default () => {
  const [articles, setArticles] = useLocalStorage("articles", []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>ISBN</Table.HeaderCell>
          <Table.HeaderCell>Menge</Table.HeaderCell>
          <Table.HeaderCell>Preis</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {articles.map(a => (
          <Table.Row>
            <Table.Cell>{a.name}</Table.Cell>
            <Table.Cell>{a.isbn}</Table.Cell>
            <Table.Cell>{a.amount}</Table.Cell>
            <Table.Cell>{a.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
