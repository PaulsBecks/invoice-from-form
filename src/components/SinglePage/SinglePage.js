import React from "react";
import Page from "../Page";
import "./SinglePage.css";
import { formatDate, formatPrice, parsePrice } from "../../services";
import { Button } from "semantic-ui-react";
import SinglePageOverlay from "./SinglePageOverlay";

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
    shippingDisabled,
  },
  setFormSelected,
}) => {
  const articles_net_price = articles
    .map(({ price, toBePayed }) => {
      const totalPrice = parsePrice(price) * toBePayed;
      const totalPriceWithDiscount =
        totalPrice - totalPrice * (customer.discount / 100);
      const net = totalPriceWithDiscount / (1 + customer.ust / 100);
      return net;
    })
    .reduce((total, x) => x + total, 0);

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
          <SinglePageOverlay
            onClick={() => setFormSelected(["general", "logo"])}
          >
            <div className="invoice-page-image-wrapper">
              <img className="invoice-header-company-logo" src={company.logo} />
            </div>
          </SinglePageOverlay>
          <div className="invoice-header">
            <div className="invoice-header-customer-address">
              <SinglePageOverlay
                wrapperClass="invoice-header-customer-company"
                onClick={() =>
                  setFormSelected(["general", "aboveClientInvoiceAddress"])
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: company.aboveClientInvoiceAddress,
                  }}
                />
              </SinglePageOverlay>
              {customer ? (
                <SinglePageOverlay
                  wrapperClass="invoice-header-customer-info"
                  onClick={() => setFormSelected(["customer"])}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: customer.invoiceAddress,
                    }}
                  />
                </SinglePageOverlay>
              ) : (
                <Button>Kunde hinzufügen</Button>
              )}
            </div>
            <SinglePageOverlay
              wrapperClass="invoice-header-company-info"
              onClick={() => setFormSelected(["general", "contactInformation"])}
            >
              <div
                dangerouslySetInnerHTML={{ __html: company.contactInformation }}
              ></div>
            </SinglePageOverlay>
          </div>
        </div>
        <div className="invoice-body">
          <div className="invoice-body-top">
            <div className="invoice-subject">
              <SinglePageOverlay
                wrapperClass="invoice-subject-and-below"
                onClick={() => setFormSelected(["general", "subjectAndBelow"])}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: company.subjectAndBelow }}
                />
              </SinglePageOverlay>
              <div className="invoice-body-subject-key-values">
                <div className="invoice-body-subject-keys">
                  <div className="invoice-body-order-date">
                    <p>
                      <b>Bestelldatum:</b>
                    </p>
                  </div>
                  {!shippingDisabled && (
                    <div className="invoice-body-send-date">
                      <p>
                        <b>Versanddatum:</b>
                      </p>
                    </div>
                  )}
                  {!shippingDisabled && (
                    <div className="invoice-body-send-to">
                      <p>
                        <b>Versand an:</b>
                      </p>
                    </div>
                  )}
                </div>
                <div className="invoice-body-subject-values">
                  <SinglePageOverlay
                    onClick={() => setFormSelected(["general", "orderDate"])}
                    wrapperClass="invoice-body-order-date"
                  >
                    <p>
                      <b>{formatDate(orderDate)}</b>
                    </p>
                  </SinglePageOverlay>
                  {!shippingDisabled && (
                    <SinglePageOverlay
                      onClick={() =>
                        setFormSelected(["general", "shippingDate"])
                      }
                      wrapperClass="invoice-body-send-date"
                    >
                      <p>
                        <b>{formatDate(shippingDate)}</b>
                      </p>
                    </SinglePageOverlay>
                  )}
                  {!shippingDisabled && (
                    <SinglePageOverlay
                      onClick={() => setFormSelected(["customer"])}
                    >
                      <div
                        className="invoice-body-send-to"
                        dangerouslySetInnerHTML={{
                          __html: customer.shippingAddress,
                        }}
                      ></div>
                    </SinglePageOverlay>
                  )}
                </div>
              </div>
            </div>
            <div className="invoice-body-invoice-date">
              <SinglePageOverlay
                onClick={() => setFormSelected(["general", "invoiceDate"])}
              >
                <div className="invoice-body-top-right">
                  <p>
                    Rechnungsdatum: <b>{formatDate(invoiceDate)}</b>
                  </p>
                </div>
              </SinglePageOverlay>
              <SinglePageOverlay
                onClick={() => setFormSelected(["general", "invoiceNumber"])}
              >
                <div className="invoice-body-invoice-nr">
                  <p>
                    Rechnungsnummer: <b>{invoiceNumber}</b>
                  </p>
                </div>
              </SinglePageOverlay>
              <div className="invoice-body-invoice-hint">
                <p>(Bitte bei Zahlung angeben)</p>
              </div>
            </div>
          </div>
          <div className="invoice-body-bottom">
            <div className="invoice-body-article-wrapper">
              {articles.map(({ toBePayed, toBeSend, price, name, isbn }) => {
                const multiple = parseInt(toBePayed) > 1;
                const totalPrice = parsePrice(price) * toBePayed;
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
                          <b>{name && `„${name}“,`}</b>
                        </div>
                        <div className="invoice-body-article-title">
                          {isbn && `${isbn},`}
                        </div>
                      </div>
                      <div className="invoice-body-artivle-price-calc">{`Preis ${
                        multiple ? "je" : ""
                      } ${price} €${
                        multiple ? ` = ${formatPrice(totalPrice)} €` : ""
                      }${
                        customer.discount > 0
                          ? `, abzüglich ${
                              customer.discount
                            } % Rabatt = ${formatPrice(
                              totalPriceWithDiscount
                            )} €`
                          : ""
                      } (beinhaltet ${customer.ust} % MwST = ${formatPrice(
                        totalPriceWithDiscount - net
                      )} €)`}</div>
                    </div>
                    <div className="invoice-body-article-price">
                      <b>{articles.length > 1 && `${formatPrice(net)} €`}</b>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="invoice-body-price-calculation">
              <div className="invoice-body-price-calculation-label-and-number">
                <p>Netto</p>
                <p>
                  <b>{formatPrice(articles_net_price)} €</b>
                </p>
              </div>
              {!shippingDisabled && (
                <SinglePageOverlay
                  onClick={() => setFormSelected(["general", "porto"])}
                >
                  <div className="invoice-body-price-calculation-label-and-number">
                    <p>Versandkosten (Netto)</p>
                    <p>
                      <b>{porto.replace(".", ",")} €</b>
                    </p>
                  </div>
                </SinglePageOverlay>
              )}
              <SinglePageOverlay onClick={() => setFormSelected(["customer"])}>
                <div className="invoice-body-price-calculation-label-and-number">
                  <p>{`+${customer.ust}% Mehrwertsteuer`}</p>
                  <p>
                    <b>
                      {formatPrice(
                        ((articles_net_price +
                          (shippingDisabled ? 0 : parsePrice(porto))) *
                          parsePrice(customer.ust)) /
                          100
                      )}{" "}
                      €
                    </b>
                  </p>
                </div>
              </SinglePageOverlay>
            </div>
            <div className="invoice-body-price">
              <p>Rechnungsbetrag</p>
              <p>
                <b>
                  {formatPrice(
                    articles_net_price * (1 + parsePrice(customer.ust) / 100) +
                      (shippingDisabled ? 0 : parsePrice(porto)) *
                        (1 + parsePrice(customer.ust) / 100)
                  )}{" "}
                  €
                </b>
              </p>
            </div>
            <SinglePageOverlay
              onClick={() => setFormSelected(["general", "invoiceText"])}
              wrapperClass="invoice-body-final-text"
            >
              <div>
                <p
                  dangerouslySetInnerHTML={{ __html: company.invoiceText }}
                ></p>
              </div>
            </SinglePageOverlay>
          </div>
        </div>
        <SinglePageOverlay
          onClick={() => setFormSelected(["general", "footerText"])}
        >
          <div
            className="invoice-footer"
            style={
              company.companyColor ? { borderColor: company.companyColor } : {}
            }
            dangerouslySetInnerHTML={{ __html: company.footerText }}
          ></div>
        </SinglePageOverlay>
      </div>
    </Page>
  );
};

export default SinglePage;
