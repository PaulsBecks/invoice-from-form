import useLocalStorage from "./useLocalStorage";

export default function useArticles() {
  return useLocalStorage("articles", []);
}
