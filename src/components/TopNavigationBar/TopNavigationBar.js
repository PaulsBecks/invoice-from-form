import React from "react";
import { Button } from "semantic-ui-react";
import { useInvoices } from "../../hooks";
import { useHistory } from "react-router-dom";

import "./TopNavigationBar.css";

export default function TopNavigationBar() {
  const [invoices] = useInvoices();
  const history = useHistory();

  return (
    <div className="oi-top-navigation-bar">
      <div>
        <h2 className="oi-top-navigation-bar-heading">Online Rechnung</h2>
      </div>
      {invoices.length > 0 && (
        <div>
          <Button.Group>
            <Button
              content="Rechnungen"
              onClick={() => history.push("invoices")}
            />
            <Button
              content="Artikel"
              onClick={() => history.push("articles")}
            />
            <Button
              content="Kunden"
              onClick={() => history.push("customers")}
            />
            <Button content="Autoren" onClick={() => history.push("authors")} />
          </Button.Group>
          <Button
            size="large"
            className="oi-top-navigation-bar-new-invoice"
            content="Neue Rechnung"
            onClick={() => history.push("/")}
            secondary
          />
        </div>
      )}
    </div>
  );
}
