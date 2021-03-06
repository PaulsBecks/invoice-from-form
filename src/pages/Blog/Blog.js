import React from "react";
import { blogEntries } from "../../constants";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import Helmet from "react-helmet";

import "./Blog.css";
import { Card } from "semantic-ui-react";

export default function Blog() {
  return (
    <div className="invoice-blog">
      <Helmet>
        <title>Billeroo | Blogeinträge</title>
        <meta
          name="description"
          content="Finde heraus was so spannend an Billeroo ist. Eine Liste aller veröffentlichten Blogeinträge von Billeroo. "
        />
      </Helmet>
      <div className="invoice-app-container">
        <h1>Blogeinträge</h1>
        <Card.Group>
          {blogEntries.map((be) => (
            <BlogCard blogEntry={be} />
          ))}
        </Card.Group>
      </div>
      <Footer />
    </div>
  );
}
