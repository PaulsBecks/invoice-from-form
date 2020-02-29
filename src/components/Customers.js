import React from "react";
import { useLocalStorage } from "../hooks";

import { Table } from "semantic-ui-react";
export default () => {
  const [customers, setCustomer] = useLocalStorage("customers", []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Adresse</Table.HeaderCell>
          <Table.HeaderCell>PLZ</Table.HeaderCell>
          <Table.HeaderCell>Stadt</Table.HeaderCell>
          <Table.HeaderCell>Rabatt</Table.HeaderCell>
          <Table.HeaderCell>MwST</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {customers.map(c => (
          <Table.Row>
            <Table.Cell>{c.name}</Table.Cell>
            <Table.Cell>{c.address}</Table.Cell>
            <Table.Cell>{c.postCode}</Table.Cell>
            <Table.Cell>{c.city}</Table.Cell>
            <Table.Cell>{c.discount}</Table.Cell>
            <Table.Cell>{c.ust}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
