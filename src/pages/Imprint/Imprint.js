import React from "react";
import { Icon } from "semantic-ui-react";

import "./Imprint.css";
import Footer from "../../components/Footer";

export default function Imprint() {
  return (
    <div className="billeroo-imprint">
      <div className="invoice-app-container ">
        <h1 className="billeroo-imprint-title">Impressum</h1>
        <div>
          <p>
            Billeroo
            <br />
            Kniprodestraße 22
            <br />
            10407 Berlin
            <br />
            Deutschland
          </p>

          <p>
            <b>Service Kontakt</b>
            <br />
            <Icon name="phone" /> +49 152 06555043
            <br />
            <Icon name="mail" /> service@billeroo.de
          </p>

          <p>
            <b>Geschäftsführung</b>
            <br />
            Paul David Beck
          </p>

          <p>
            <b>Urheberrecht</b>
            <br />
            Die Inhalte dieser Website sind urheberrechtlich geschützt. Diese
            dürfen weder <br />
            ganz, noch teilweise ohne vorherige schriftliche Genehmigung des
            Urhebers
            <br /> vervielfältigt und/oder veröffentlicht werden.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
