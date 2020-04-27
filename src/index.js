import React from "react";
import { render } from "react-dom";
import Customers from "./components/Customers";

import "./index.css";
import Articles from "./components/Articles";
import Invoices from "./components/Invoices";
import Authors from "./components/Authors/Authors";
import useMigration from "./hooks/useMigration";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNavigationBar from "./components/TopNavigationBar";

import "semantic-ui-less/semantic.less";

const App = () => {
  useMigration();

  return (
    <Router>
      <TopNavigationBar />
      <div className="invoice-app-container">
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
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
