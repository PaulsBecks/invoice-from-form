import useMigrationWrapper from "./useMigrationWrapper";
import { useArticles } from "../hooks";

const VERSION = 2;

function useAddAuthorsToArticles() {
  const [articles, setArticles] = useArticles();

  setArticles(articles.map((a) => ({ ...a, authors: [] })));
}

export default () => useMigrationWrapper(useAddAuthorsToArticles, VERSION);
