import { useEffect, useCallback, useMemo, useContext } from "react";
import getArticleAuthors from "../services/backend/getArticleAuthors";
import postArticleAuthors from "../services/backend/postArticleAuthor";
import { Context } from "../store/Store";

export default function useArticleAuthors() {
  const [state, dispatch] = useContext(Context);

  const articleAuthors = state.articleAuthors;

  const setArticleAuthors = (articleAuthors) => {
    dispatch({ type: "SET_ARTICLE_AUTHORS", payload: articleAuthors });
  };

  async function fetchArticleAuthors() {
    const data = await getArticleAuthors();
    if (data) {
      setArticleAuthors(data);
    }
  }

  useEffect(() => {
    if (articleAuthors && articleAuthors.length === 0) {
      fetchArticleAuthors();
    }
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
