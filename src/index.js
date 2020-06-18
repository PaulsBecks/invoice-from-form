import React from "react";
import { render } from "react-dom";
import Customers from "./components/Customers";

import "./index.css";
import Articles from "./components/Articles";
import Invoices from "./components/Invoices";
import Authors from "./components/Authors/Authors";
import ScrollToTop from "./components/ScrollToTop";
import InvoiceNew from "./pages/InvoiceNew/InvoiceNew";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNavigationBar from "./components/TopNavigationBar";

import "semantic-ui-less/semantic.less";
import LandingPage from "./pages/Landing";
import FAQ from "./pages/FAQ/FAQ";
import Imprint from "./pages/Imprint/Imprint";
import DataProtection from "./pages/DataProtection/DataProtection";
import Stats from "./pages/Stats";
import { Pricing } from "./pages";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogEntry from "./pages/BlogEntry/BlogEntry";

const App = () => {
  //useMigration();

  return (
    <Router
      getUserConfirmation={(message, callback) => {
        // this is the default behavior
        const allowTransition = window.confirm(
          "Sind Sie sich sicher, dass sie die Seite verlassen wollen? Ungespreicherte Informationen gehen verloren."
        );
        callback(allowTransition);
      }}
    >
      <TopNavigationBar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/invoices">
          <div className="invoice-app-container">
            <Invoices />
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
        <Route path="/stats">
          <div className="invoice-app-container">
            <Stats />
          </div>
        </Route>
        <Route path="/faq">
          <FAQ />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route path="/blog/:blogId">
          <BlogEntry />
        </Route>
        <Route path="/imprint">
          <Imprint />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/dataprotection">
          <DataProtection />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
