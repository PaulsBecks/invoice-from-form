import useLocalStorage from "./useLocalStorage";

export default function useAuthors() {
  return useLocalStorage("authors", []);
}
