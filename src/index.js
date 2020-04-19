import React from "react";
import { render } from "react-dom";
import Customers from "./components/Customers";

import "./index.css";
import { Tab, Container } from "semantic-ui-react";
import Articles from "./components/Articles";
import Invoices from "./components/Invoices";
import Company from "./components/Company";
import Authors from "./components/Authors/Authors";
import useMigration from "./hooks/useMigration";

const App = () => {
  useMigration();

  return (
    <div className="invoice-app-container">
      <Tab
        panes={[
          {
            menuItem: "Rechnungen",
            render: () => (
              <div className="">
                <Invoices />
              </div>
            ),
          },
          {
            menuItem: "Kunden",
            render: () => (
              <div className="">
                <Customers />
              </div>
            ),
          },
          {
            menuItem: "Artikel",
            render: () => (
              <div className="">
                <Articles />
              </div>
            ),
          },
          {
            menuItem: "Autoren",
            render: () => (
              <div className="">
                <Authors />
              </div>
            ),
          },
          {
            menuItem: "Firma",
            render: () => (
              <div className="">
                <Company />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

render(<App />, document.getElementById("root"));
