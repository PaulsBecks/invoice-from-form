import { useCallback, useEffect, useState } from "react";
import postArticle from "../services/backend/postArticle";
import getArticles from "../services/backend/getArticles";

export default function useArticles() {
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const articles = await getArticles();
    if (articles) {
      setArticles(articles);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (article) => {
    const _article = await postArticle(article);
    if (_article) {
      setArticles([...articles, _article]);
    }
  };

  const removeArticle = async (id) => {
    await postArticle({ _id: id, deleted: true });
    fetchArticles();
  };

  const updateArticle = async (article) => {
    await postArticle(article);
    fetchArticles();
  };

  const getArticleById = useCallback(
    (id) => {
      return articles.find((a) => a._id === id);
    },
    [articles]
  );

  return [
    articles.filter((a) => a && typeof a === "object" && !a.deleted),
    addArticle,
    removeArticle,
    updateArticle,
    articles.length,
    getArticleById,
  ];
}
