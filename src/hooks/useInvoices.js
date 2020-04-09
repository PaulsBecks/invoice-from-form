import useLocalStorage from "./useLocalStorage";

export default function useInvoices() {
  return useLocalStorage("invoices", []);
}
