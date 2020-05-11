import useLocalStorage from "./useLocalStorage";
import { company as companySceleton } from "../sceletons";
import postData from "../services/backend/postData";
import { useEffect } from "react";
import getData from "../services/backend/getData";

export default function useCompany() {
  const [company, setCompany] = useLocalStorage("companies", companySceleton);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (data && data.company) {
        setCompany(data.company);
      }
    }
    fetchData();
  }, []);

  const updateCompany = (company) => {
    setCompany(company);
    postData({ company });
  };

  return [company, updateCompany];
}
