import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Icon, Message } from "semantic-ui-react";
import { useInvoices, useUser } from "../../hooks";
import { useHistory } from "react-router-dom";

import "./TopNavigationBar.css";
import login from "../../services/backend/login";
import register from "../../services/backend/register";

export default function TopNavigationBar() {
  const [invoices, , , , , , , loadMoreInvoices] = useInvoices();
  useEffect(() => {
    loadMoreInvoices(10);
  }, []); // eslint-disable-line
  const history = useHistory();
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useUser();
  const [modalUse, setModalUse] = useState("register");
  const [error, setError] = useState("");
  const isLoggedIn = user && user.user && !user.user.placeholder;

  return (
    <div>
      <div className="oi-top-navigation-bar">
        <div className="billeroo-top-navigation-left">
          <div>
            <img
              src="/logo.png"
              alt="Billeroo Logo"
              className="billeroo-top-navigation-left-logo"
            />
          </div>
          <Button primary onClick={() => history.push("/")}>
            <h2 className="oi-top-navigation-bar-heading">Billeroo</h2>
          </Button>
        </div>
        <div className="billeroo-top-navigation-bar-buttons">
          {(invoices.length > 0 || isLoggedIn) && (
            <div className="billeroo-tabs-desktop">
              <Button.Group>
                <Button
                  content="Rechnungen"
                  onClick={() => history.push("/invoices")}
                />
                <Button
                  content="Artikel"
                  onClick={() => history.push("/articles")}
                />
                <Button
                  content="Kunden"
                  onClick={() => history.push("/customers")}
                />
                <Button
                  content="Autoren"
                  onClick={() => history.push("/authors")}
                />
              </Button.Group>
            </div>
          )}
          <Button
            size="large"
            className="oi-top-navigation-bar-new-invoice"
            content="Neue Rechnung"
            onClick={() => history.push("/invoices/new")}
            secondary
          />
          {isLoggedIn ? (
            <Button
              className="oi-top-navigation-bar-new-invoice"
              onClick={() => {
                history.push("/settings");
              }}
              content={user.user.email}
              primary
            />
          ) : (
            <div className="billeroo-top-navigation-sign-buttons ">
              <Button
                className="oi-top-navigation-bar-new-invoice billeroo-top-navigation-sign-in-button"
                onClick={() => {
                  setModalIsOpen(true);
                  setModalUse("login");
                }}
                content="Anmelden"
                inverted
                basic
              />
              <Button
                className="oi-top-navigation-bar-new-invoice"
                onClick={() => {
                  setModalIsOpen(true);
                  setModalUse("register");
                }}
                content="Registrieren"
                inverted
              />
            </div>
          )}
          <Modal
            open={modalIsOpen}
            onClose={() => {
              setModalIsOpen(false);
              setError("");
            }}
          >
            <Modal.Header>
              {modalUse === "login" ? "Anmelden" : "Registrieren"}
            </Modal.Header>
            <Modal.Content>
              <Message info>
                {modalUse === "login"
                  ? "Melden Sie sich an, um diesen Browser mit Ihren Daten zu synchronisieren."
                  : "Registrieren Sie sich, um Ihre Daten auch auf anderen Geräten zu nutzen."}
              </Message>
              {error && <Message error>{error}</Message>}
              <Form>
                <Form.Field
                  label="Email"
                  placeholder="Email"
                  control={Input}
                  value={loginValues.email}
                  onChange={(e, { value }) =>
                    setLoginValues({ ...loginValues, email: value })
                  }
                />
                <Form.Field
                  label="Passwort"
                  placeholder="Passwort"
                  control={Input}
                  type="password"
                  value={loginValues.password}
                  onChange={(e, { value }) =>
                    setLoginValues({ ...loginValues, password: value })
                  }
                />
                <Button
                  type="submit"
                  primary
                  onClick={async () => {
                    let user;
                    try {
                      if (modalUse === "login") {
                        user = await login(loginValues);
                        await localStorage.setItem(
                          "user",
                          JSON.stringify(user)
                        );
                      } else {
                        user = await register(loginValues);
                        await localStorage.setItem(
                          "user",
                          JSON.stringify(user)
                        );
                      }
                      setUser(user);
                      setModalIsOpen(false);
                      window.document.location.href = "/";
                    } catch (err) {
                      setError(err.toString());
                    }
                  }}
                >
                  {modalUse === "login" ? "Anmelden" : "Registrieren"}
                  <Icon name="right chevron" />
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
      </div>
      <div className="billeroo-tabs-menu">
        {(invoices.length > 0 || isLoggedIn) && (
          <div>
            <div
              style={{
                widht: "100%",
                paddingTop: "3px",
                paddingLeft: "3px",
              }}
            >
              <Button
                size="small"
                content="Rechnungen"
                onClick={() => history.push("/invoices")}
              />
              <Button
                size="small"
                content="Artikel"
                onClick={() => history.push("/articles")}
              />
              <Button
                size="small"
                content="Kunden"
                onClick={() => history.push("/customers")}
              />
              <Button
                size="small"
                content="Autoren"
                onClick={() => history.push("/authors")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
