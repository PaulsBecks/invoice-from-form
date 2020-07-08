import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Message,
  Table,
} from "semantic-ui-react";
import { useInvoices, useUser, useWebhooks } from "../../hooks";
import { useHistory } from "react-router-dom";

import "./TopNavigationBar.css";
import login from "../../services/backend/login";
import register from "../../services/backend/register";

export default function TopNavigationBar() {
  const [invoices] = useInvoices();
  const history = useHistory();
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useUser();
  const [modalUse, setModalUse] = useState("register");
  const [error, setError] = useState("");
  const [webhooks, addWebhook, deleteWebhook] = useWebhooks();
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
          {(invoices.length > 0 || (user && user.user)) && (
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
          <Button
            className="oi-top-navigation-bar-new-invoice"
            onClick={() => setModalIsOpen(true)}
            {...(isLoggedIn ? { content: user.user.email } : { icon: "user" })}
            primary
          />

          {isLoggedIn ? (
            <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
              <Modal.Header>Nutzer</Modal.Header>
              <Modal.Content>
                <div className="oi-top-navigation-bar-modal-user-container">
                  <p>Angemeldet als {user.user.email}</p>
                  <Button
                    content="Abmelden"
                    onClick={() => {
                      setUser({});
                      window.document.location.href = "/";
                    }}
                  />
                </div>
                <div>
                  <h3>Webhooks</h3>
                  <Table>
                    <Table.Header>
                      <Table.HeaderCell>URL</Table.HeaderCell>
                      <Table.HeaderCell>Secret</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Header>

                    <Table.Body>
                      {webhooks.map((wh) => (
                        <Table.Row key={wh._id}>
                          <Table.Cell>
                            https://api.billeroo.de/data/webhooks/{wh._id}
                          </Table.Cell>
                          <Table.Cell>{wh.secret}</Table.Cell>
                          <Table.Cell>
                            <Button
                              negative
                              onClick={() => deleteWebhook(wh._id)}
                              icon="trash"
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell colSpan="3">
                          <Button
                            content="Webhook anlegen"
                            onClick={addWebhook}
                          />
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
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
                    onClick={() => {
                      setModalUse(
                        modalUse === "register" ? "login" : "register"
                      );
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
