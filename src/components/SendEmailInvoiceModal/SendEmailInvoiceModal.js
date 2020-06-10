import React, { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import Editor from "../Editor/Editor";
import RichTextEditor from "react-rte";

export default function SendEmailInvoiceModal({ invoice, setInvoice, onSend }) {
  const [form, setForm] = useState({
    to: "",
    fileName: invoice.invoiceNumber,
  });

  const [isSending, setIsSending] = useState(false);

  const [text, setText] = useState(
    RichTextEditor.createValueFromString(
      `<b>Versandadresse des Kunden</b><br/>` +
        invoice.customer.shippingAddress,
      "html"
    )
  );

  return (
    <Modal open={true} onClose={() => setInvoice()}>
      <Modal.Header>Rechnungs-PDF per Email Verschicken</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="An"
            name="to"
            value={form.to}
            placeholder="max-mustermann@email.de"
            onChange={(e, { name, value }) =>
              setForm({ ...form, [name]: value })
            }
          />
          <Form.Input
            label="Rechnungsdateiname"
            name="fileName"
            value={form.fileName}
            onChange={(e, { name, value }) =>
              setForm({ ...form, [name]: value })
            }
          />
          <Form.Field
            label="Emailtext"
            name="text"
            value={text}
            control={Editor}
            onChange={setText}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          icon="close"
          labelPosition="right"
          content="Abbrechen"
          onClick={() => setInvoice()}
        />
        <Button
          primary
          icon="send"
          labelPosition="right"
          content="Senden"
          onClick={() => {
            setIsSending(true);
            onSend({ text: text.toString("html"), ...form });
          }}
          loading={isSending}
        />
      </Modal.Actions>
    </Modal>
  );
}
