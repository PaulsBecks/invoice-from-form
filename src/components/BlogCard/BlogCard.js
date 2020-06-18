import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function BlogCard({ blogEntry }) {
  return (
    <Card>
      <Image src={blogEntry.imgSrc} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{blogEntry.title}</Card.Header>
        <Card.Description>{blogEntry.shortText}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/blog/${blogEntry.id}`}>Mehr lesen</Link>
      </Card.Content>
    </Card>
  );
}
