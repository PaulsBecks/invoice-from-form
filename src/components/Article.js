import React, { useState, useMemo, useEffect } from "react";

import { Form, Input, Label, Dropdown } from "semantic-ui-react";
import { useAuthors } from "../hooks";
import { author as authorSceleton } from "../sceletons";
import Author from "./Author";
import { Segment } from "semantic-ui-react";

export default function Article({ article, setArticle }) {
  const [articlePrice, setArticlePrice] = useState(article.price);
  const [authorSearch, setAuthorSearch] = useState("");
  const [authors] = useAuthors();
  const [author, setAuthor] = useState();
  const filteredAuthors = useMemo(() => {
    return authors.filter((a) => a && a.name.includes(authorSearch));
  }, [authors, authorSearch]);

  function addAuthorToArticle(author) {
    setArticle({ ...article, authors: [...article.authors, author] });
  }

  useEffect(() => {
    setArticle({ ...article, authors: [author] });
  }, [author]);

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

  const authorOptions = [
    { key: undefined, value: undefined, text: "" },
    { key: authors.length, value: authors.length, text: "Neuer Kunde" },
  ].concat(
    authors.map((a) => ({
      key: a.id,
      value: a.id,
      text: a.name,
    }))
  );

  const handleAuthorChange = (e, { value }) => {
    console.log(value);
    if (value === undefined) {
      setAuthor();
    } else if (value < authors.length) {
      setAuthor(authors[value]);
    } else {
      setAuthor({ ...authorSceleton, id: authors.length });
    }
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
