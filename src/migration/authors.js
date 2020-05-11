import useMigrationWrapper from "./useMigrationWrapper";
import { useArticles } from "../hooks";

const VERSION = 2;

function useAddAuthorsToArticles() {}

export default () => useMigrationWrapper(useAddAuthorsToArticles, VERSION);
