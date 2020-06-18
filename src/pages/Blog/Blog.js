import React from "react";
import { blogEntries } from "../../constants";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="invoice-blog">
      <div className="invoice-app-container">
        <h1>Blogeinträge</h1>
        {blogEntries.map((be) => (
          <BlogCard blockEntry={be} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
