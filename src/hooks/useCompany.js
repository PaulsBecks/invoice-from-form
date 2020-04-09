import useLocalStorage from "./useLocalStorage";
import { company as companySceleton } from "../sceletons";

export default function useCompany() {
  return useLocalStorage("company", companySceleton);
}
