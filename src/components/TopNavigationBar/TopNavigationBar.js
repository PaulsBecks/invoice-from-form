import React, { useState } from "react";
import { Button, Modal, Form, Input, Icon, Message } from "semantic-ui-react";
import { useInvoices, useUser } from "../../hooks";
import { useHistory } from "react-router-dom";

import "./TopNavigationBar.css";
import login from "../../services/backend/login";
import register from "../../services/backend/register";
import getData from "../../services/backend/getData";
import dataToLocalStorage from "../../services/localStorage/dataToLocalStorage";
import dataFromLocalStorage from "../../services/localStorage/dataFromLocalStorage";
import postData from "../../services/backend/postData";

export default function TopNavigationBar() {
  const [invoices] = useInvoices();
  const history = useHistory();
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useUser();
  const [modalUse, setModalUse] = useState("register");
  const [error, setError] = useState("");

  return (
    <div className="oi-top-navigation-bar">
      <div>
        <h2 className="oi-top-navigation-bar-heading">Billeroo</h2>
      </div>
      <div className="billeroo-top-navigation-bar-buttons">
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
              <Button
                content="Autoren"
                onClick={() => history.push("authors")}
              />
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
        <Button
          className="oi-top-navigation-bar-new-invoice"
          onClick={() => setModalIsOpen(true)}
          {...(user && user.user
            ? { content: user.user.email }
            : { icon: "user" })}
          primary
        />

        {user && user.user ? (
          <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <Modal.Header>Nutzer</Modal.Header>
            <Modal.Content>
              <div>
                <p>Angemeldet als {user.user.email}</p>
                <Button
                  content="Abmelden"
                  onClick={() => {
                    setUser({});
                    dataToLocalStorage({
                      articles: [],
                      invoices: [],
                      customers: [],
                      authors: [],
                    });
                    window.document.location.href = "/";
                  }}
                />
              </div>
            </Modal.Content>
          </Modal>
        ) : (
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
                  ? "Melden Sie sich an, um diesen Browser mit ihren Daten zu synchronisieren."
                  : "Registrieren Sie sich, um ihre Daten auch auf anderen Geräten zu nutzen."}
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
                  onClick={() => {
                    setModalUse(modalUse === "register" ? "login" : "register");
                    setError("");
                  }}
                  type="button"
                >
                  {modalUse === "register" ? "Anmelden" : "Registrieren"}
                </Button>
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
                        const data = await getData();
                        dataToLocalStorage(data);
                      } else {
                        user = await register(loginValues);
                        await localStorage.setItem(
                          "user",
                          JSON.stringify(user)
                        );
                        const data = await dataFromLocalStorage();
                        postData(data);
                      }
                      setUser(user);
                      setModalIsOpen(false);
                      window.document.location.href = "/";
                    } catch (err) {
                      setError(err);
                    }
                  }}
                >
                  {modalUse === "login" ? "Anmelden" : "Registrieren"}
                  <Icon name="right chevron" />
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        )}
      </div>
    </div>
  );
}
