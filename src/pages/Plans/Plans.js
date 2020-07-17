import React, { useState } from "react";
import { Checkbox } from "semantic-ui-react";
import Footer from "../../components/Footer";
import Helmet from "react-helmet";
import { plans } from "../../constants";
import PlanCard from "../../components/PlanCard/PlanCard";

import "./Plans.css";
import { useGA } from "../../hooks";
export default function Plans() {
  const [yearlyPrices, setYearlyPrices] = useState(true);
  useGA();
  return (
    <div>
      <Helmet>
        <title>Billeroo | Preise</title>
        <meta
          name="description"
          content="Bis zu 20 Rechnungen kostenlos erstellen pro Monat. Hier findest du die Übersicht über alle Preise und enthaltenen Features."
        />
      </Helmet>
      <div className="invoice-app-container">
        <div className="billeroo-price-section">
          <div className="billeroo-price-section-text">
            <h1 className="billeroo-price-section-text-title">Preise</h1>
          </div>
          <div className="billeroo-price-yearly-toggle-container">
            <Checkbox
              toggle
              label={`Preise bei ${
                yearlyPrices ? "Jahresabonnement" : "Monatsabonnement"
              }`}
              value={yearlyPrices}
              onChange={() => {
                setYearlyPrices(!yearlyPrices);
              }}
            />
          </div>
          <PlanCard plans={Object.values(plans)} yearly={yearlyPrices} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
