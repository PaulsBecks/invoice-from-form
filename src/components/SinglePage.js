import React from "react";
import Page from "./Page";
import "./SinglePage.css";
const SinglePage = ({
  id,
  invoice: {
    order_date = "24.02.2020",
    send_date = "24.02.2020",
    invoice_date = "24.02.2020",
    invoice_number = "142787164221",
    customer: { name, ust, discount, address, city, postCode },
    articles = [],
    send_default_price = 5.0
  }
}) => {
  const articles_net_price = articles
    .filter(a => !a.empty)
    .map(({ price, amount }) => {
      const totalPrice = price * amount;
      const totalPriceWithDiscount = totalPrice - totalPrice * (discount / 100);
      const net = totalPriceWithDiscount / (1 + ust / 100);
      return net;
    })
    .reduce((total, x) => parseFloat(x) + total, 0);

  return (
    <Page singleMode={true} id={id}>
      <div className="invoice-header">
        <div className="invoice-header-customer-address"></div>
        <div className="invoice-header-company-address"></div>
      </div>
      <div className="invoice-body">
        <div className="invoice-body-top">
          <div className="invoice-subject">
            <h2>Rechnung</h2>
            <p>Wir erlauben uns in Rechnung zu stellen:</p>
            <div className="invoice-body-subject-key-values">
              <div className="invoice-body-subject-keys">
                <div className="invoice-body-order-date">
                  <p>
                    <b>Bestelldatum:</b>
                  </p>
                </div>
                <div className="invoice-body-send-date">
                  <p>
                    <b>Versand am:</b>
                  </p>
                </div>
                <div className="invoice-body-send-to">
                  <p>
                    <b>Versand an:</b>
                  </p>
                </div>
              </div>
              <div className="invoice-body-subject-values">
                <div className="invoice-body-order-date">
                  <p>
                    <b>{order_date}</b>
                  </p>
                </div>
                <div className="invoice-body-send-date">
                  <p>
                    <b>{send_date}</b>
                  </p>
                </div>
                <div className="invoice-body-send-to">
                  <p>
                    <b>
                      {name} • {}
                    </b>
                  </p>
                  <p>
                    <b>
                      {address} • {postCode} {city}
                    </b>
                  </p>
                </div>
              </div>
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
            <div className="invoice-body-invoice-hint">
              <p>(Bitte bei Zahlungen angeben)</p>
            </div>
          </div>
        </div>
        <div className="invoice-body-article-wrapper">
          {articles
            .filter(a => !a.empty)
            .map(({ amount, price, name, isbn }) => {
              const multiple = parseInt(amount) > 1;
              const totalPrice = price * amount;
              const totalPriceWithDiscount =
                totalPrice - totalPrice * (discount / 100);
              const net = totalPriceWithDiscount / (1 + ust / 100);
              return (
                <div className="invoice-body-article">
                  <div className="invoice-body-article-left">
                    <div className="invoice-body-article-description">
                      <div>
                        <b>
                          {amount} Exemplar
                          {multiple && "e"}
                        </b>
                      </div>
                      <div className="invoice-body-article-title">
                        <b>„{name}“</b>
                      </div>
                      <div className="invoice-body-article-title">{isbn}</div>
                    </div>
                    <div className="invoice-body-artivle-price-calc">{`Preis ${
                      multiple ? "je" : ""
                    } ${price} €${
                      multiple ? ` = ${totalPrice.toFixed(2)}€` : ""
                    }${
                      discount > 0
                        ? `, abzüglich ${discount} % Rabatt = ${totalPriceWithDiscount.toFixed(
                            2
                          )} €`
                        : ""
                    } (beinhaltet ${ust} % MwST = ${(
                      totalPriceWithDiscount - net
                    ).toFixed(2)})`}</div>
                  </div>
                  <div className="invoice-body-article-price">
                    <b>{net.toFixed(2)}€</b>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="invoice-body-price-calculation">
          <div>
            <p>Netto</p>
            <p>
              <b>{articles_net_price.toFixed(2)}€</b>
            </p>
          </div>
          <div>
            <p>Versandpauschale</p>
            <p>
              <b>{send_default_price.toFixed(2)}€</b>
            </p>
          </div>
          <div>
            <p>{`+${ust}% Mehrwertsteuer`}</p>
            <p>
              <b>
                {(
                  ((articles_net_price + send_default_price) *
                    parseFloat(ust)) /
                  100
                ).toFixed(2)}
                €
              </b>
            </p>
          </div>
        </div>
        <div className="invoice-body-price">
          <p>Rechnungsbetrag</p>
          <p>
            <b>
              {(
                (articles_net_price + send_default_price) *
                (1 + parseFloat(ust) / 100)
              ).toFixed(2)}
              €
            </b>
          </p>
        </div>
        <div>
          <p>
            Zahlen Sie bitte den Rechnungsbetrag bis zum 16. März 2020 unter
            Angabe der Rechnungsnummer auf unten stehendes Konto. <br />
            <br /> Die gelieferte Ware bleibt bis zur vollständigen Bezahlung
            Eigentum des Test Verlages. <br />
            Vielen Dank für Ihre Bestellung.
            <br />
            <br /> Mit herzlichen Grüßen, Test Verlag.
            <br /> Werneuchen, den 24. Februar 2020
          </p>
        </div>
      </div>
    </Page>
  );
};

export default SinglePage;
