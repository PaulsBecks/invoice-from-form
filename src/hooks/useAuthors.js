import { useEffect, useCallback, useContext } from "react";
import postAuthor from "../services/backend/postAuthor";
import getAuthors from "../services/backend/getAuthors";
import { Context } from "../store/Store";

export default function useAuthors() {
  const [state, dispatch] = useContext(Context);

  const authors = state.authors;

  const setAuthors = (authors) => {
    dispatch({ type: "SET_AUTHORS", payload: authors });
  };

  async function fetchAuthors() {
    const authors = await getAuthors();
    if (authors) {
      setAuthors(authors);
    }
  }

  useEffect(() => {
    if (authors && authors.length === 0) {
      fetchAuthors();
    }
  }, []);

  const addAuthor = async (author) => {
    await postAuthor(author);
    fetchAuthors();
  };

  const removeAuthor = async (authorId) => {
    await postAuthor({ _id: authorId, deleted: true });
    fetchAuthors();
  };

  const updateAuthor = async (author) => {
    await postAuthor(author);
    fetchAuthors();
  };

  const getAuthorById = useCallback(
    (id) => {
      return authors.find((a) => a._id === id) || {};
    },
    [authors]
  );

  return [
    authors.filter((a) => a && typeof a === "object" && !a.deleted),
    addAuthor,
    removeAuthor,
    updateAuthor,
    authors.length,
    getAuthorById,
  ];
}
