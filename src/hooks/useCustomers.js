import useLocalStorage from "./useLocalStorage";

export default function useCustomers() {
  return useLocalStorage("customers", []);
}
