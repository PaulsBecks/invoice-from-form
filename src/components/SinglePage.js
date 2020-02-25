import React from "react";
import Page from "./Page";
import "./SinglePage.css";
const SinglePage = ({
  invoice: {
    id,
    order_date,
    send_date,
    customer: { name, ust, discount },
    articles = [],
    invoice_date,
    invoice_number,
    send_default_price = 5.0
  }
}) => {
  const articles_net_price = articles
    .filter(a => !a.empty)
    .map(a => a.price)
    .reduce((total, x) => parseFloat(x) + total, 0);

  return (
    <Page singleMode={true} id={id}>
      <div className="invoice-header">
        <div className="invoice-header-customer-address"></div>
        <div className="invoice-header-company-address"></div>
      </div>
      <div className="invoice-body">
        <div className="invoice-subject">
          <h2>Rechnung</h2>
          <p>Wir erlauben uns in Rechnung zu stellen:</p>
          <div className="invoice-body-order-date">
            <p>
              <b>Bestelldatum: {order_date}</b>
            </p>
          </div>
          <div className="invoice-body-send-date">
            <p>
              <b>Versand am: {send_date}</b>
            </p>
          </div>
          <div className="invoice-body-send-to">
            <p>
              <b>Versand am: {name}</b>
            </p>
          </div>
        </div>
        <div>
          <div className="invoice-body-invoice-date">
            <p>
              Rechnungsdatum: <b>{invoice_date}</b>
            </p>
          </div>
          <div className="invoice-body-invoice-nr">
            <p>
              Rechnungsnummer: <b>{invoice_number}</b>
            </p>
          </div>
        </div>
        <div className="invoice-body-article-wrapper">
          {articles
            .filter(a => !a.empty)
            .map(article => (
              <div className="invoice-body-article">
                <div className="invoice-body-article-left">
                  <div className="invoice-body-article-description">
                    <div>
                      <b>
                        {article.amount} Exemplar
                        {parseInt(article.amount) > 1 && "e"}
                      </b>
                    </div>
                    <div className="invoice-body-article-title">
                      <b>„{article.name}“</b>
                    </div>
                    <div className="invoice-body-article-title">
                      {article.isbn}
                    </div>
                  </div>
                  <div className="invoice-body-artivle-price-calc">{`Preis ${
                    article.price
                  } €${
                    discount > 0
                      ? `, abzüglich ${discount} % Rabat = ${(
                          article.price -
                          (article.price * discount) / 100
                        ).toFixed(2)} €`
                      : ""
                  } (beinhaltet ${ust} % MwST = ${(
                    article.price -
                    article.price * (discount / 100) -
                    (article.price - article.price * (discount / 100)) /
                      (1 + ust / 100)
                  ).toFixed(2)})`}</div>
                </div>
                <div className="invoice-body-article-price">
                  {article.price}€
                </div>
              </div>
            ))}
        </div>
        <div className="invoice-body-price-calculation">
          <div>
            <p>Netto</p>
            <p>{articles_net_price.toFixed(2)}€</p>
          </div>
          <div>
            <p>Versandpauschale</p>
            <p>{send_default_price.toFixed(2)}€</p>
          </div>
          <div>
            <p>{`+${ust}% Mehrwertsteuer`}</p>
            <p>
              {(
                ((articles_net_price + send_default_price) * parseFloat(ust)) /
                100
              ).toFixed(2)}
              €
            </p>
          </div>
        </div>
        <div className="invoice-body-price">
          <p>Rechnungsbetrag</p>
          <p>{(articles_net_price + send_default_price * 1.07).toFixed(2)}€</p>
        </div>
        <div>
          <p>
            Zahlen Sie bitte den Rechnungsbetrag bis zum 16. März 2020 unter
            Angabe der Rechnungsnummer auf unten stehendes Konto. <br /> Die
            gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des
            Findling Verlages. <br />
            Vielen Dank für Ihre Bestellung. Mit herzlichen Grüßen, Findling
            Verlag. Werneuchen, den 24. Februar 2020
          </p>
        </div>
      </div>
    </Page>
  );
};

export default SinglePage;
