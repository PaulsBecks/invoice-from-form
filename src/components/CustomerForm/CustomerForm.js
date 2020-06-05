import React, { useState, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import RichTextEditor from "react-rte";
import Editor from "../Editor/Editor";

export default function CustomerForm({ customer, setCustomer }) {
  const [invoiceAddress, setInvoiceAddress] = useState(
    RichTextEditor.createValueFromString(customer.invoiceAddress, "html")
  );

  const [shippingAddress, setShippingAddress] = useState(
    RichTextEditor.createValueFromString(customer.shippingAddress, "html")
  );

  const updateAddresses = (customer) => {
    setInvoiceAddress(
      RichTextEditor.createValueFromString(customer.invoiceAddress, "html")
    );
    setShippingAddress(
      RichTextEditor.createValueFromString(customer.shippingAddress, "html")
    );
  };

  useEffect(() => {
    setInvoiceAddress(
      RichTextEditor.createValueFromString(customer.invoiceAddress, "html")
    );
    setShippingAddress(
      RichTextEditor.createValueFromString(customer.shippingAddress, "html")
    );
  }, [customer]);

  const handleCustomerChange = (e, { name, value }) => {
    if (name === "ust" || name === "discount") {
      value = parseFloat(value);
      if (isNaN(value)) return;
    }
    setCustomer({ ...customer, [name]: value });
    updateAddresses(customer);
  };

  const updateRichtext = (name, value) => {
    setCustomer({ ...customer, [name]: value.toString("html") });
    updateAddresses(customer);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Field
          control={Input}
          label="Kundenname"
          value={customer.name}
          name="name"
          onChange={handleCustomerChange}
        />
      </Form.Group>
      <Form.Field
        control={Editor}
        label={"Rechnungsadresse"}
        onChange={setInvoiceAddress}
        value={invoiceAddress}
        onBlur={() => {
          updateRichtext("invoiceAddress", invoiceAddress);
        }}
      />
      <Form.Field
        control={Editor}
        label={"Lieferadresse"}
        onChange={setShippingAddress}
        value={shippingAddress}
        onBlur={() => {
          updateRichtext("shippingAddress", shippingAddress);
        }}
      />
      <Form.Group>
        <Form.Field
          control={Input}
          label="MwST"
          placeholder="7"
          name="ust"
          icon="percent"
          onChange={handleCustomerChange}
          value={customer.ust}
        />
        <Form.Field
          control={Input}
          label="Kundenrabatt"
          placeholder="0"
          icon="percent"
          name="discount"
          onChange={handleCustomerChange}
          value={customer.discount}
        />
      </Form.Group>
    </Form>
  );
}
