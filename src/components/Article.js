import React, { useState } from "react";

import { Form, Input, Dropdown } from "semantic-ui-react";
import { useAuthors } from "../hooks";
import { author as authorSceleton } from "../sceletons";
import Author from "./Author";
import { Segment } from "semantic-ui-react";
import { formatPrice } from "../services";

export default function Article({ article, setArticle }) {
  const [articlePrice, setArticlePrice] = useState(article.price);
  const [authors, , , , authorsLength, getAuthorById] = useAuthors();
  const [author, setAuthor] = useState(article.authors[0]);

  const handleArticleChange = (e, { name, value }) => {
    if (name === "price") {
      value = parseFloat(value.replace(",", "."));
      if (isNaN(value)) {
        setArticlePrice("0,00");
        return;
      }
      value = formatPrice(value);
      setArticlePrice(value);
    }
    setArticle({ ...article, [name]: value });
  };

  const authorOptions = [
    { key: undefined, value: undefined, text: "" },
    { key: authorsLength, value: authorsLength, text: "Neuer Autor" },
  ].concat(
    authors.map((a) => ({
      key: a.id,
      value: a.id,
      text: a.name,
    }))
  );

  const handleAuthorChange = (e, { value }) => {
    let author;
    if (value === undefined) {
      author = undefined;
    } else if (value < authorsLength) {
      author = getAuthorById(value);
    } else {
      author = { ...authorSceleton, id: authorsLength };
    }
    console.log(author, value);
    setAuthor(author);
    setArticle({ ...article, authors: author ? [author] : [] });
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
      <Form.Field
        label="Wählen Sie einen Autoren aus:"
        control={Dropdown}
        search
        selection
        options={authorOptions}
        value={author ? author.id : undefined}
        onChange={handleAuthorChange}
      />
      {author && (
        <Segment>
          <Author author={author} setAuthor={setAuthor} />
        </Segment>
      )}
    </Form>
  );
}
