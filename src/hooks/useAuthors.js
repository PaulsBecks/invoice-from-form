import useLocalStorage from "./useLocalStorage";
import { useCallback, useEffect } from "react";
import postData from "../services/backend/postData";
import getData from "../services/backend/getData";

export default function useAuthors() {
  const [authors, setLocalStorageAuthors] = useLocalStorage("authors", []);
  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (data && data.authors) {
        setLocalStorageAuthors(data.authors);
      }
    }
    fetchData();
  }, []);

  const addAuthor = useCallback(
    (author) => {
      const _authors = [...authors, author];
      setLocalStorageAuthors(_authors);
      postData({ authors: _authors });
    },
    [authors]
  );

  const removeAuthor = useCallback(
    (authorId) => {
      const _authors = [...authors];
      _authors[authorId] = undefined;
      setLocalStorageAuthors(_authors);
      postData({ authors: _authors });
    },
    [authors]
  );

  const updateAuthor = useCallback(
    (author) => {
      const _authors = [...authors];
      _authors[author.id] = author;
      setLocalStorageAuthors(_authors);
      postData({ authors: _authors });
    },
    [authors]
  );

  const getAuthorById = useCallback(
    (id) => {
      return authors[id];
    },
    [authors]
  );

  return [
    authors.filter((a) => a && typeof a === "object"),
    addAuthor,
    removeAuthor,
    updateAuthor,
    authors.length,
    getAuthorById,
  ];
}
