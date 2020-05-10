import useLocalStorage from "./useLocalStorage";

export default function useUser() {
  return useLocalStorage("user", {});
}
