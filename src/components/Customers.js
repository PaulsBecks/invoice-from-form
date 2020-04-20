import React, { useState } from "react";
import { useLocalStorage } from "../hooks";
import { customer as customerSceleton } from "../sceletons";
import { Table, Button, Modal } from "semantic-ui-react";
import CustomerForm from "./CustomerForm/CustomerForm";
export default () => {
  const [customers, setCustomers] = useLocalStorage("customers", []);
  const [customer, setCustomer] = useState();

  const saveCustomer = () => {
    setCustomers([...customers, customer]);
    setCustomer();
  };
  return (
    <div>
      <Button
        onClick={() =>
          setCustomer({ ...customerSceleton, id: customers.length })
        }
        primary
      >
        Neuer Kunde
      </Button>
      {customer && (
        <Modal onClose={() => setCustomer()} open={true}>
          <Modal.Header>Kunde</Modal.Header>
          <Modal.Content>
            <CustomerForm customer={customer} setCustomer={setCustomer} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setCustomer()}
              content="Abbrechen"
              negative
              icon="close"
              labelPosition="right"
            ></Button>
            <Button
              onClick={saveCustomer}
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
            <Table.HeaderCell>Rechnungsadresse</Table.HeaderCell>
            <Table.HeaderCell>Lieferadress</Table.HeaderCell>
            <Table.HeaderCell>Rabatt</Table.HeaderCell>
            <Table.HeaderCell>MwST</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((c) => (
            <Table.Row>
              <Table.Cell>{c.name}</Table.Cell>
              <Table.Cell>
                <div dangerouslySetInnerHTML={{ __html: c.invoiceAddress }} />
              </Table.Cell>
              <Table.Cell>
                <div dangerouslySetInnerHTML={{ __html: c.shippingAddress }} />
              </Table.Cell>
              <Table.Cell>{c.discount}</Table.Cell>
              <Table.Cell>{c.ust}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
