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
import LandingPage from "./pages/Landing";

const App = () => {
  //useMigration();

  return (
    <Router>
      <TopNavigationBar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/invoices">
          <div className="invoice-app-container">
            <Invoices />
          </div>
        </Route>
        <Route exact path="/invoices/new">
          <div className="invoice-app-container">
            <Home />
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
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
