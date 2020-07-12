import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import Editor from "../Editor/Editor";
import RichTextEditor from "react-rte";
import formatPrice from "../../services/formatPrice";

import "./ServiceForm.css";

export default function ServiceForm({
  service: { name, description, price },
  onChange,
  onRemove,
}) {
  const [currentDescription, setCurrentDescription] = useState(
    RichTextEditor.createValueFromString(description, "html")
  );

  const [currentPrice, setCurrentPrice] = useState(price);

  return (
    <Form>
      <Form.Field
        control={Editor}
        label="Beschreibung"
        value={currentDescription}
        onBlur={() => {
          onChange({
            name: "description",
            value: currentDescription.toString("html"),
          });
        }}
        onChange={setCurrentDescription}
        placeholder="Verfasse deine Beschreibung hier ..."
      />
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          name="price"
          label="Preis"
          value={currentPrice}
          onChange={(e, { value }) => {
            console.log(value);
            setCurrentPrice(value);
          }}
          onBlur={() => {
            const formatedPrice = formatPrice(currentPrice);
            setCurrentPrice(formatPrice);
            onChange({ name: "price", value: formatedPrice });
          }}
        />
        <div className="billeroo-service-form-remove-button-wrapper">
          <Button
            negative
            icon="trash"
            onClick={onRemove}
            className="billeroo-service-form-remove-button"
          />
        </div>
      </Form.Group>
    </Form>
  );
}
