import React from "react";
import { Icon } from "semantic-ui-react";

import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="billeroo-footer">
      <div className="billeroo-footer-row">
        <div className="billeroo-footer-column">
          <div className="billeroo-footer-cell">
            <h3>Social Media</h3>
            <ul>
              <li>
                <a href="https://www.instagram.com/billeroo.de/">
                  <Icon name="Instagram" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="billeroo-footer-cell">
            <h3>Entdecke Billeroo</h3>
            <ul>
              <li>
                <Link to="/invoices/new">Rechnung erstellen</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/pricing">Preise</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="billeroo-footer-column">
          <div className="billeroo-footer-cell">
            <h3>Kontakt</h3>
            <p>
              <Icon name="mail" />
              service@billeroo.de <br />
            </p>
            <p>
              <Icon name="phone" />
              +49 152 065543
              <br />
            </p>
            <p>
              Billeroo
              <br />
              Kniprodestraße 22
              <br />
              10407 Berlin
              <br />
              Deutschland
            </p>
          </div>
        </div>

        <div className="billeroo-footer-column">
          <div className="billeroo-footer-cell">
            <h3>Rechtliches</h3>
            <ul>
              <li>
                <Link to="/imprint">Impressum</Link>
              </li>
              <li>
                <Link to="/dataprotection">Datenschutzerklärung</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="billeroo-footer-row">
        <p>Made with ❤ by Billeroo</p>
      </div>
    </div>
  );
}
