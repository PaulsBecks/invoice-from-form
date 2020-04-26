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
import { useInvoices } from "./hooks";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopNavigationBar from "./components/TopNavigationBar";

const App = () => {
  useMigration();
  const [invoices] = useInvoices();

  if (!invoices) {
    return null;
  }

  if (invoices.length === 0) {
    return <Home />;
  }

  return (
    <div className="invoice-app-container">
      <Router>
        <TopNavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/invoices">
            <Invoices />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/articles">
            <Articles />
          </Route>

          <Route path="/authors">
            <Authors />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
