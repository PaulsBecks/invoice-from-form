import React from "react";
import { useCompany } from "../hooks";
import CompanyForm from "./CompanyForm";

export default function Company() {
  const [company, setCompany] = useCompany();

  return (
    <div>
      <CompanyForm {...{ company, setCompany }} />
    </div>
  );
}
