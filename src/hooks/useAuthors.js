import { useEffect, useState, useCallback } from "react";
import postAuthor from "../services/backend/postAuthor";
import getAuthors from "../services/backend/getAuthors";

export default function useAuthors() {
  const [authors, setLocalStorageAuthors] = useState([]);

  async function fetchAuthors() {
    const authors = await getAuthors();
    if (authors) {
      setLocalStorageAuthors(authors);
    }
  }

  useEffect(() => {
    fetchAuthors();
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
