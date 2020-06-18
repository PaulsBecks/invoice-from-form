import React from "react";
import { blogEntries } from "../../constants";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import Helmet from 'react-helmet';

import "./BlogEntry.css";

export default function BlogEntry() {
  const { blogId } = useParams();
  const blogEntry = blogEntries.find((entry) => entry.id === blogId);
  if (!blogEntry) {
    //TODO: redirect to 404
    return " 404 Not found";
  }

  return (
    <div className="invoice-blog-entry">
      <Helmet>
        <title>{blogEntry.title}</title>
        <meta name="description" content={blogEntry.shortText} />
      </Helmet>
      <div className="invoice-app-container invoice-blog-entry-text">
        <img src={blogEntry.imgSrc} />
        <h1>{blogEntry.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blogEntry.text }}></div>
      </div>
      <Footer />
    </div>
  );
}
