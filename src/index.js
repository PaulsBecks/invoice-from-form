import React, { Suspense } from "react";
import { hydrate, render } from "react-dom";

import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNavigationBar from "./components/TopNavigationBar";

import "semantic-ui-less/semantic.less";
import Imprint from "./pages/Imprint/Imprint";
import DataProtection from "./pages/DataProtection/DataProtection";
import { Pricing } from "./pages";
const Stats = React.lazy(() => import("./pages/Stats"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogEntry = React.lazy(() => import("./pages/BlogEntry/BlogEntry"));
const Home = React.lazy(() => import("./pages/Home"));
const Invoices = React.lazy(() => import("./components/Invoices"));
const Customers = React.lazy(() => import("./components/Customers"));
const Authors = React.lazy(() => import("./components/Authors/Authors"));
const Articles = React.lazy(() => import("./components/Articles"));

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
            <Suspense fallback={<div></div>}>
              <Invoices />
            </Suspense>
          </div>
        </Route>
        <Route path="/customers">
          <div className="invoice-app-container">
            <Suspense fallback={<div></div>}>
              <Customers />
            </Suspense>
          </div>
        </Route>
        <Route path="/articles">
          <div className="invoice-app-container">
            <Suspense fallback={<div></div>}>
              <Articles />
            </Suspense>
          </div>
        </Route>

        <Route path="/authors">
          <div className="invoice-app-container">
            <Suspense fallback={<div></div>}>
              <Authors />
            </Suspense>
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

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
