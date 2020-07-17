import postCompany from "../services/backend/postCompany";
import { useEffect, useState } from "react";
import getCompany from "../services/backend/getCompany";

export default function useCompany() {
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const company = await getCompany();
      setCompany(company);
      setIsLoading(false);
    }
    fetchData();
  }, []); //eslint-disable-line

  const updateCompany = (company) => {
    setCompany(company);
    postCompany(company);
  };

  return [company, updateCompany, isLoading];
}
