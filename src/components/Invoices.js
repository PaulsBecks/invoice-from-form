import React from "react";
import { useLocalStorage } from "../hooks";

import { Table } from "semantic-ui-react";
export default () => {
  const [invoices, setInvoices] = useLocalStorage("invoices", []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kunde</Table.HeaderCell>
          <Table.HeaderCell>Artikel</Table.HeaderCell>
          <Table.HeaderCell>Menge</Table.HeaderCell>
          <Table.HeaderCell>Preis</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {invoices.map(i => (
          <Table.Row>
            <Table.Cell>{i.customer.name}</Table.Cell>
            <Table.Cell>
              {i.articles.map(a => (
                <p>{a.name}</p>
              ))}
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
