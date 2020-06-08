import React from "react";

import "./Landing.css";
import { Button, Icon, Card, Table } from "semantic-ui-react";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import { useGA } from "../../hooks";

export default function LandingPage() {
  useGA();
  const history = useHistory();
  const openNewInvoice = () => {
    history.push("/invoices/new");
  };
  return (
    <div>
      <div className="invoice-app-container">
        <div className="billeroo-landing-page">
          <div className="billeroo-title-section">
            <div className="billeroo-title-section-text">
              <h1 className="billeroo-title-section-text-title">
                Rechnungen anlegen und verwalten
              </h1>
              <p className="billeroo-title-section-text-text ">
                Erstelle schnell und einfach Rechnungen für deinen Verlag.
                Behalte den Überblick deiner bereits angelegte Rechnungen auf
                allen Geräten.
              </p>
              <Button
                content="Rechnung erstellen"
                secondary
                onClick={openNewInvoice}
              />
            </div>
            <div className="billeroo-title-section-image">
              <img src="/img/invoice-example.png" />
            </div>
          </div>
          <div className="billeroo-reference-section">
            <div className="billeroo-reference-section-text">
              <h1 className="billeroo-reference-section-text-title">
                Diese Unternehmen arbeiten bereits mit uns
              </h1>
            </div>
            <div className="billeroo-reference-section-images">
              <img
                src="/img/findling-logo.png"
                className="billeroo-reference-section-images-logo"
              />
            </div>
          </div>
          <div className="billeroo-added-value-section billeroo-alternate-section">
            <div className="billeroo-added-value-section-text">
              <h1 className="billeroo-added-value-section-text-title">
                Billeroo erleichtert die ...
              </h1>
            </div>
            <div className="billeroo-added-value-section-values">
              <div className="billeroo-added-value-section-value">
                <div className="billeroo-added-value-section-value-icon-wrapper">
                  <Icon name="calculator" size="big" color="primary" />
                </div>
                <h2>Kalkulation</h2>
                <p>
                  Billeroo rechnet aus allen Angaben, wie Preisen, Rabatten oder
                  der Mehrwertsteuer direkt die Netto- und Bruttobeträge aus.
                </p>
              </div>
              <div className="billeroo-added-value-section-value">
                <div className="billeroo-added-value-section-value-icon-wrapper">
                  <Icon name="list" size="big" color="primary" />
                </div>
                <h2>Übersicht</h2>
                <p>
                  Alle Daten auf einen Blick. Rechnungen, Kunden und Artikel
                  findest du gut sortiert, um dir deine Arbeit zu erleichtern.
                </p>
              </div>
              <div className="billeroo-added-value-section-value">
                <div className="billeroo-added-value-section-value-icon-wrapper">
                  <Icon name="slideshare" size="big" color="primary" />
                </div>

                <h2>Kooperation</h2>
                <p>
                  Greife von überall auf deine Daten zu und teile sie mit deinen
                  Kollegen.
                </p>
              </div>
            </div>
          </div>
          <div className="billeroo-call-to-action-section">
            <Button
              onClick={openNewInvoice}
              content="Erste Rechnung erstellen"
              secondary
              size="huge"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
