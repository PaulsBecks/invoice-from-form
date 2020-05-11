import React, { useState } from "react";

import { Form, Input } from "semantic-ui-react";
import { parsePrice, formatPrice } from "../../services";

export default function Author({ author, setAuthor }) {
  const [authorPrice, setAuthorPrice] = useState(author.percent);

  const handleAuthorChange = (e, { name, value }) => {
    if (name === "percent") {
      value = parsePrice(value);
      if (isNaN(value)) {
        setAuthorPrice("");
        return;
      }
      value = formatPrice(value);
      setAuthorPrice(value);
    }
    setAuthor({ ...author, [name]: value });
  };

  return (
    <Form>
      <Form.Group width="equal">
        <Form.Field
          id="form-input-control-name"
          control={Input}
          label="Name"
          placeholder="Name"
          name="name"
          onChange={handleAuthorChange}
          value={author.name}
        />
        <Form.Field
          id="form-input-control-name"
          control={Input}
          label="Kontakt"
          placeholder="Tel, Email, ..."
          onChange={handleAuthorChange}
          name="contact"
          value={author.contact}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Prozent"
          placeholder="Prozent"
          name="percent"
          icon="percent"
          onChange={(e, { value }) => setAuthorPrice(value)}
          onBlur={(e) => {
            handleAuthorChange(e, {
              name: e.target.name,
              value: e.target.value,
            });
          }}
          value={authorPrice}
        />
      </Form.Group>
    </Form>
  );
}
