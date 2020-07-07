import { useEffect, useCallback, useMemo, useState } from "react";
import getArticleAuthors from "../services/backend/getArticleAuthors";
import postArticleAuthors from "../services/backend/postArticleAuthor";

export default function useArticleAuthors() {
  const [articleAuthors, setLocalStorageArticleAuthors] = useState([]);

  async function fetchArticleAuthors() {
    const data = await getArticleAuthors();
    if (data) {
      setLocalStorageArticleAuthors(data);
    }
  }

  useEffect(() => {
    fetchArticleAuthors();
  }, []);

  const addArticleAuthor = async (articleAuthor) => {
    await postArticleAuthors(articleAuthor);
    fetchArticleAuthors();
  };

  const removeArticleAuthor = async (articleAuthorId) => {
    await postArticleAuthors({ _id: articleAuthorId, deleted: true });
    fetchArticleAuthors();
  };

  const updateArticleAuthor = async (articleAuthor) => {
    await postArticleAuthors(articleAuthor);
    fetchArticleAuthors();
  };

  const getArticleAuthorById = useCallback(
    (id) => {
      return articleAuthors.find((aa) => aa._id === id);
    },
    [articleAuthors]
  );

  const exists = (a) => a && typeof a === "object" && !a.deleted;

  const { articlesByAuthor, authorsByArticle } = useMemo(() => {
    return articleAuthors.reduce(
      ({ articlesByAuthor, authorsByArticle }, a) => {
        if (!exists(a)) {
          return { articlesByAuthor, authorsByArticle };
        }
        const { authorId, articleId } = a;
        if (!articlesByAuthor[authorId]) {
          articlesByAuthor[authorId] = [];
        }
        articlesByAuthor[authorId].push(a);
        if (!authorsByArticle[articleId]) {
          authorsByArticle[articleId] = [];
        }
        authorsByArticle[articleId].push(a);
        return { authorsByArticle, articlesByAuthor };
      },
      { articlesByAuthor: {}, authorsByArticle: {} }
    );
  }, [articleAuthors]);

  return [
    articleAuthors.filter(exists),
    (id) => articlesByAuthor[id] || [],
    (id) => authorsByArticle[id] || [],
    addArticleAuthor,
    removeArticleAuthor,
    updateArticleAuthor,
    articleAuthors.length,
    getArticleAuthorById,
  ];
}
