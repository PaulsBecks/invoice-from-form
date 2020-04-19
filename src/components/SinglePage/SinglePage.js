import React from "react";
import Page from "../Page";
import "./SinglePage.css";
import { formatDate } from "../../services";
import { useCompany } from "../../hooks";
import { Button } from "semantic-ui-react";

const SinglePage = ({
  id,
  invoice: {
    orderDate,
    invoiceDate,
    shippingDate,
    invoiceNumber,
    porto,
    customer,
    articles = [],
    company,
  },
  invoice,
  setInvoice,
}) => {
  const articles_net_price = articles
    .map(({ price, toBePayed }) => {
      const totalPrice = price * toBePayed;
      const totalPriceWithDiscount =
        totalPrice - totalPrice * (customer.discount / 100);
      const net = totalPriceWithDiscount / (1 + customer.ust / 100);
      return net;
    })
    .reduce((total, x) => parseFloat(x) + total, 0);

  const updateInvoice = ({ target: { name, value } }) => {
    setInvoice({ ...invoice, [name]: value });
  };

  if (!customer) {
    return null;
  }

  return (
    <Page singleMode={true} id={id}>
      <div
        className="invoice-folding-line"
        style={
          company.companyColor ? { borderColor: company.companyColor } : {}
        }
      />
      <div className="invoice-page-pdf">
        <div className="invoice-page-top">
          <img
            className="invoice-header-company-logo"
            src={company.logo}
            alt="company logo"
          />
          <div className="invoice-header">
            <div className="invoice-header-customer-address">
              <div
                className="invoice-header-customer-company"
                dangerouslySetInnerHTML={{
                  __html: company.aboveClientInvoiceAddress,
                }}
              ></div>
              {customer ? (
                <div
                  className="invoice-header-customer-info"
                  dangerouslySetInnerHTML={{ __html: customer.invoiceAddress }}
                ></div>
              ) : (
                <Button>Kunde hinzufügen</Button>
              )}
            </div>
            <div
              className="invoice-header-company-info"
              dangerouslySetInnerHTML={{ __html: company.contactInformation }}
            ></div>
          </div>
        </div>
        <div className="invoice-body">
          <div className="invoice-body-top">
            <div className="invoice-subject">
              <div
                className="invoice-subject-and-below"
                dangerouslySetInnerHTML={{ __html: company.subjectAndBelow }}
              />
              <div className="invoice-body-subject-key-values">
                <div className="invoice-body-subject-keys">
                  <div className="invoice-body-order-date">
                    <p>
                      <b>Bestelldatum:</b>
                    </p>
                  </div>
                  <div className="invoice-body-send-date">
                    <p>
                      <b>Versanddatum:</b>
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
                  {customer && (
                    <div
                      className="invoice-body-send-to"
                      dangerouslySetInnerHTML={{
                        __html: customer.shippingAddress,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            <div className="invoice-body-top-right">
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
                <p>(Bitte bei Zahlung angeben)</p>
              </div>
            </div>
          </div>
          <div className="invoice-body-bottom">
            <div className="invoice-body-article-wrapper">
              {articles.map(({ toBePayed, toBeSend, price, name, isbn }) => {
                const multiple = parseInt(toBePayed) > 1;
                const totalPrice = price * toBePayed;
                const totalPriceWithDiscount =
                  totalPrice - totalPrice * (customer.discount / 100);
                const net = totalPriceWithDiscount / (1 + customer.ust / 100);
                return (
                  <div className="invoice-body-article">
                    <div className="invoice-body-article-left">
                      <div className="invoice-body-article-description">
                        <div>
                          <b>
                            {toBePayed !== toBeSend && toBeSend + "/"}
                            {toBePayed} Exemplar
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
                        customer.discount > 0
                          ? `, abzüglich ${
                              customer.discount
                            } % Rabatt = ${totalPriceWithDiscount.toFixed(2)} €`
                          : ""
                      } (beinhaltet ${customer.ust} % MwST = ${(
                        totalPriceWithDiscount - net
                      ).toFixed(2)})`}</div>
                    </div>
                    <div className="invoice-body-article-price">
                      <b>{articles.length > 1 && `${net.toFixed(2)} €`}</b>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="invoice-body-price-calculation">
              <div>
                <p>Netto</p>
                <p>
                  <b>{articles_net_price.toFixed(2)} €</b>
                </p>
              </div>
              <div>
                <p>Versandkosten</p>
                <p>
                  <b>{porto} €</b>
                </p>
              </div>
              <div>
                <p>{`+${customer.ust}% Mehrwertsteuer`}</p>
                <p>
                  <b>
                    {(
                      ((articles_net_price + parseFloat(porto)) *
                        parseFloat(customer.ust)) /
                      100
                    ).toFixed(2)}{" "}
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
                    (1 + parseFloat(customer.ust) / 100)
                  ).toFixed(2)}{" "}
                  €
                </b>
              </p>
            </div>
            <div>
              <p
                className="invoice-body-final-text"
                dangerouslySetInnerHTML={{ __html: company.invoiceText }}
              ></p>
            </div>
          </div>
        </div>
        <div
          className="invoice-footer"
          style={
            company.companyColor ? { borderColor: company.companyColor } : {}
          }
          dangerouslySetInnerHTML={{ __html: company.footerText }}
        ></div>
      </div>
    </Page>
  );
};

export default SinglePage;
