import React, { useEffect, useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { formatPrice } from "../../services";
import { useAuthors } from "../../hooks";

export default function ArticleAuthorForm({
  articleAuthor,
  updateArticleAuthor,
}) {
  const [percent, setPercent] = useState(articleAuthor.percent);
  const [, , , , , getAuthorById] = useAuthors();

  useEffect(() => {
    setPercent(articleAuthor.percent);
  }, [articleAuthor]);

  return (
    <div key={articleAuthor.authorId}>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          disabled
          value={getAuthorById(articleAuthor.authorId).name}
          label="Name"
        />
        <Form.Field
          control={Input}
          label="Prozent"
          value={percent}
          name="percent"
          onChange={(e, { value }) => setPercent(value)}
          onBlur={() =>
            updateArticleAuthor({
              ...articleAuthor,
              percent: formatPrice(percent),
            })
          }
        />
      </Form.Group>
    </div>
  );
}
