import React from "react";
import Page from "./Page";
import "./SinglePage.css";
import { formatDate } from "../services";
import { useLocalStorage } from "../hooks";
import { company as companySceleton, invoice } from "../sceletons";

const SinglePage = ({
  id,
  invoice: {
    orderDate,
    invoiceDate,
    shippingDate,
    invoiceNumber,
    porto,
    finalText,
    customer: { name, ust, discount, address, city, postCode, addition },
    articles = []
  }
}) => {
  const [company] = useLocalStorage("company", companySceleton);
  const articles_net_price = articles
    .map(({ price, amount }) => {
      const totalPrice = price * amount;
      const totalPriceWithDiscount = totalPrice - totalPrice * (discount / 100);
      const net = totalPriceWithDiscount / (1 + ust / 100);
      return net;
    })
    .reduce((total, x) => parseFloat(x) + total, 0);

  return (
    <Page singleMode={true} id={id}>
      <div className="invoice-page-pdf">
        <div className="invoice-page-top">
          <img className="invoice-header-company-logo" src={company.logo} />
          <div className="invoice-header">
            <div className="invoice-header-customer-address">
              <div className="invoice-header-customer-company">
                {company.name} • {company.firstAddress.address} •{" "}
                {company.firstAddress.postCode} {company.firstAddress.city}
              </div>
              <div className="invoice-header-customer-info">
                <p>
                  <b>{name}</b>
                </p>
                <p className="invoice-header-customer-info-name">
                  <b>{addition}</b>
                </p>
                <p>
                  <b>{address}</b>
                </p>
                <p>
                  <b>
                    {postCode} {city}
                  </b>
                </p>
              </div>
            </div>
            <div className="invoice-header-company-info">
              <p>{company.name}</p>
              <p>{company.executive}</p>
              <br />
              <p>{company.firstAddress.name}</p>
              <p>{company.firstAddress.address}</p>
              <p>
                {company.firstAddress.postCode} {company.firstAddress.city}
              </p>
              <p>Telefon {company.firstAddress.phone}</p>
              <br />
              <p>{company.firstEmail}</p>
              <p>{company.secondEmail}</p>
              <br />
              <p>Steuernummer {company.taxNumber}</p>
              <p>{company.taxOffice}</p>
            </div>
          </div>
        </div>
        <div className="invoice-body">
          <div className="invoice-body-top">
            <div className="invoice-subject">
              <h4>Rechnung</h4>
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
                      <b>{formatDate(orderDate)}</b>
                    </p>
                  </div>
                  <div className="invoice-body-send-date">
                    <p>
                      <b>{formatDate(shippingDate)}</b>
                    </p>
                  </div>
                  <div className="invoice-body-send-to">
                    <p>
                      <b>
                        {name} • {addition}
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
                  Rechnungsdatum: <b>{formatDate(invoiceDate)}</b>
                </p>
              </div>
              <div className="invoice-body-invoice-nr">
                <p>
                  Rechnungsnummer: <b>{invoiceNumber}</b>
                </p>
              </div>
              <div className="invoice-body-invoice-hint">
                <p>(Bitte bei Zahlungen angeben)</p>
              </div>
            </div>
          </div>
          <div className="invoice-body-article-wrapper">
            {articles.map(({ amount, price, name, isbn }) => {
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
                <b>{porto}€</b>
              </p>
            </div>
            <div>
              <p>{`+${ust}% Mehrwertsteuer`}</p>
              <p>
                <b>
                  {(
                    ((articles_net_price + parseFloat(porto)) *
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
                  (articles_net_price + parseFloat(porto)) *
                  (1 + parseFloat(ust) / 100)
                ).toFixed(2)}
                €
              </b>
            </p>
          </div>
          <div>
            <p className="invoice-body-final-text">{finalText}</p>
          </div>
        </div>
        <div className="invoice-footer">
          <div className="invoice-footer-executive">
            <b>Geschäftsführung</b> {company.executive}
          </div>
          <div className="invoice-footer-bank-account">
            <b>Bankverbindung</b> {company.bank} • IBAN {company.iban} • BIC{" "}
            {company.bic}
          </div>
          <div className="invoice-footer-tax">
            <b>Steuernummer</b> {company.taxNumber} | <b>USt-IdNr.</b>{" "}
            {company.ustNr}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SinglePage;
