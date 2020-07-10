import React, { Suspense } from "react";
import { hydrate, render } from "react-dom";

import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNavigationBar from "./components/TopNavigationBar";

import "semantic-ui-less/semantic.less";
import "./index.css";
import Imprint from "./pages/Imprint/Imprint";
import DataProtection from "./pages/DataProtection/DataProtection";
import { Pricing } from "./pages";
import Store from "./store/Store";

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
    <Store>
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
            <Suspense fallback={<div></div>}>
              <Home />
            </Suspense>
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
          <Route path="/faq">
            <Suspense fallback={<div></div>}>
              <FAQ />
            </Suspense>
          </Route>
          <Route exact path="/blog">
            <Suspense fallback={<div></div>}>
              <Blog />
            </Suspense>
          </Route>
          <Route path="/blog/:blogId">
            <Suspense fallback={<div></div>}>
              <BlogEntry />
            </Suspense>
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
    </Store>
  );
};

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
