import React from "react";

import Customers from "./components/Customers";
import Articles from "./components/Articles";
import Invoices from "./components/Invoices";
import Authors from "./components/Authors/Authors";
import useMigration from "./hooks/useMigration";
import TopNavigationBar from "./components/TopNavigationBar";

import InvoiceNew from "./pages/InvoiceNew/InvoiceNew";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import FAQ from "./pages/FAQ/FAQ";

export default function Routes() {
  return (
    <Switch>
      <TopNavigationBar />
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/invoices">
        <div className="invoice-app-container">
          <Invoices />
        </div>
      </Route>
      <Route exact path="/invoices/new">
        <div className="invoice-app-container">
          <InvoiceNew />
        </div>
      </Route>
      <Route path="/customers">
        <div className="invoice-app-container">
          <Customers />
        </div>
      </Route>
      <Route path="/articles">
        <div className="invoice-app-container">
          <Articles />
        </div>
      </Route>

      <Route path="/authors">
        <div className="invoice-app-container">
          <Authors />
        </div>
      </Route>
      <Route path="/faq">
        <div className="invoice-app-container">
          <FAQ />
        </div>
      </Route>
    </Switch>
  );
}
