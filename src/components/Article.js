import React, { useState, useMemo } from "react";

import { Form, Input, Button, Label } from "semantic-ui-react";
import { useAuthors } from "../hooks";

export default function Article({ article, setArticle }) {
  const [articlePrice, setArticlePrice] = useState(article.price);
  const [authorSearch, setAuthorSearch] = useState("");
  const [authors] = useAuthors();

  const filteredAuthors = useMemo(() => {
    return authors.filter((a) => a && a.name.includes(authorSearch));
  }, [authors, authorSearch]);

  function addAuthorToArticle(author) {
    setArticle({ ...article, authors: [...article.authors, author] });
  }

  const handleArticleChange = (e, { name, value }) => {
    if (name === "price") {
      value = parseFloat(value);
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
          onBlur={(e) => {
            handleArticleChange(e, {
              name: e.target.name,
              value: e.target.value,
            });
          }}
          value={articlePrice}
        />
      </Form.Group>
      <div>
        <label>
          <b>Autoren</b>
        </label>
        <div>
          {article.authors.map((a) => (
            <Label>{a.name}</Label>
          ))}
        </div>
        <Input
          name="author"
          placeholder="Suche..."
          value={authorSearch}
          onChange={(e, { value }) => setAuthorSearch(value)}
        />
        {authorSearch != "" && (
          <div>
            {filteredAuthors.map((a) => (
              <Label onClick={() => addAuthorToArticle(a)}>{a.name}</Label>
            ))}
          </div>
        )}
      </div>
    </Form>
  );
}
