import useLocalStorage from "./useLocalStorage";
import { useCallback, useEffect } from "react";
import postData from "../services/backend/postData";
import getData from "../services/backend/getData";

export default function useArticles() {
  const [articles, setLocalStorageArticles] = useLocalStorage("articles", []);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (data && data.articles) {
        setLocalStorageArticles(data.articles);
      }
    }
    fetchData();
  }, []);

  const addArticle = useCallback(
    (article) => {
      const _articles = [...articles, article];
      setLocalStorageArticles(_articles);
      postData({ articles: _articles });
    },
    [articles]
  );

  const removeArticle = useCallback(
    (articleId) => {
      const _articles = [...articles];
      _articles[articleId] = undefined;
      setLocalStorageArticles(_articles);
      postData({ articles: _articles });
    },
    [articles]
  );

  const updateArticle = useCallback(
    (article) => {
      const _articles = [...articles];
      _articles[article.id] = article;
      setLocalStorageArticles(_articles);
      postData({ articles: _articles });
    },
    [articles]
  );

  const getArticleById = useCallback(
    (id) => {
      return articles[id];
    },
    [articles]
  );
  return [
    articles.filter((a) => a && typeof a === "object"),
    addArticle,
    removeArticle,
    updateArticle,
    articles.length,
    getArticleById,
  ];
}
