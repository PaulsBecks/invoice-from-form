import React from "react";

import "./Landing.css";
import { Button, Icon, Card, Table } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function LandingPage() {
  const history = useHistory();
  const openNewInvoice = () => {
    history.push("/invoice/new");
  };
  return (
    <div className="billeroo-landing-page">
      <div className="billeroo-title-section">
        <div className="billeroo-title-section-text">
          <h1 className="billeroo-title-section-text-title">
            Rechnungen anlegen und verwalten
          </h1>
          <p className="billeroo-title-section-text-text ">
            Erstelle schnell und einfach Rechnungen für deinen Verlag. Behalte
            den Überblick deiner bereits angelegte Rechnungen auf allen Geräten.
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
              Billeroo rechnet aus allen Angaben, wie Preisen, Rabatten oder der
              Mehrwertsteuer direkt die Netto- und Bruttobeträge aus.
            </p>
          </div>
          <div className="billeroo-added-value-section-value">
            <div className="billeroo-added-value-section-value-icon-wrapper">
              <Icon name="list" size="big" color="primary" />
            </div>
            <h2>Übersicht</h2>
            <p>
              Alle Daten auf einen Blick. Rechnungen, Kunden und Artikel findest
              du gut sortiert, um dir deine Arbeit zu erleichtern.
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
      <div className="billeroo-price-section">
        <div className="billeroo-price-section-text">
          <h1 className="billeroo-price-section-text-title">Preise</h1>
        </div>
        <Table celled color="teal" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>
                <div>
                  <Icon name="paper plane" size="big" />
                </div>
                <div>Starter</div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div>
                  <Icon name="plane" size="big" />
                </div>
                <div>Basic</div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div>
                  <Icon name="rocket" size="big" />
                </div>
                <div>Premium</div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Preis</Table.Cell>
              <Table.Cell>0 €/Monat</Table.Cell>
              <Table.Cell>10 €/Monat</Table.Cell>
              <Table.Cell>ab 50 €/Monat</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Rechnungen</Table.Cell>
              <Table.Cell>20/Monat</Table.Cell>
              <Table.Cell>200/Monat</Table.Cell>
              <Table.Cell>Endlos</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Accounts</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Beliebig</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Support</Table.Cell>
              <Table.Cell>
                <Icon name="times" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="check" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="check" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Individuelles Desgin</Table.Cell>
              <Table.Cell>
                <Icon name="times" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="times" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="check" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Button
                  content="Jetzt Starten"
                  onClick={openNewInvoice}
                  primary
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  content="Jetzt Testen"
                  onClick={openNewInvoice}
                  secondary
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  primary
                  content="Jetzt Testen"
                  onClick={openNewInvoice}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
