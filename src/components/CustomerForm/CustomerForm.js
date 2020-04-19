import React, { useState, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import RichTextEditor from "react-rte";

export default function CustomerForm({ customer, setCustomer }) {
  const [invoiceAddress, setInvoiceAddress] = useState(
    RichTextEditor.createValueFromString(customer.invoiceAddress, "html")
  );

  const [shippingAddress, setShippingAddress] = useState(
    RichTextEditor.createValueFromString(customer.shippingAddress, "html")
  );

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
  };

  const updateRichtext = (name, value) => {
    setCustomer({ ...customer, [name]: value.toString("html") });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Field
          control={Input}
          label="Name"
          value={customer.name}
          name="name"
          onChange={handleCustomerChange}
        />
      </Form.Group>
      <Form.Field
        control={RichTextEditor}
        label={"Rechnungsadresse"}
        onChange={setInvoiceAddress}
        value={invoiceAddress}
        onBlur={() => {
          updateRichtext("invoiceAddress", invoiceAddress);
        }}
      />
      <Form.Field
        control={RichTextEditor}
        label={"Lieferadress"}
        onChange={setShippingAddress}
        value={shippingAddress}
        onBlur={() => {
          updateRichtext("shippingAddress", shippingAddress);
        }}
      />
      <Form.Group>
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="MwST"
          placeholder="7"
          name="ust"
          icon="percent"
          onChange={handleCustomerChange}
          value={customer.ust}
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Rabat"
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
