import React, { useState } from "react";

import { Form, Input } from "semantic-ui-react";

export default function Article({ article, setArticle }) {
  const [articlePrice, setArticlePrice] = useState(article.price);

  const handleArticleChange = (e, { name, value }) => {
    console.log(name, value);
    if (name === "price") {
      value = parseFloat(value);
      console.log(value);
      if (isNaN(value)) {
        setArticlePrice("");
        return;
      }
      value = value.toFixed(2);
      setArticlePrice(value);
    }
    setArticle({ ...article, [name]: value });
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
          onChange={handleArticleChange}
          value={article.name}
        />
        <Form.Field
          id="form-input-control-name"
          control={Input}
          label="Lagerbestand"
          placeholder="Menge"
          type="number"
          onChange={handleArticleChange}
          name="amount"
          value={article.amount}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="ISBN"
          placeholder="ISBN"
          name="isbn"
          onChange={handleArticleChange}
          value={article.isbn}
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Preis"
          placeholder="Preis"
          name="price"
          icon="euro sign"
          onChange={(e, { value }) => setArticlePrice(value)}
          onBlur={e => {
            console.log("blur");
            handleArticleChange(e, {
              name: e.target.name,
              value: e.target.value
            });
          }}
          value={articlePrice}
        />
      </Form.Group>
    </Form>
  );
}
