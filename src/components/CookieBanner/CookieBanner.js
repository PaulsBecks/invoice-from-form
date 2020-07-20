import React from "react";

import "./CookieBanner.css";
import { useLocalStorage } from "../../hooks";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function CookieBanner() {
  const [cookiesOptions, setCookiesOptions] = useLocalStorage("cookies", {
    accepted: false,
  });

  if (cookiesOptions.accepted) {
    return null;
  }

  function acceptCookies() {
    setCookiesOptions({ accepted: true });
  }

  return (
    <div className="billeroo-cookie-banner">
      <div>
        Wir verwenden Cookies um Billeroo stetig zu verbessern. Mehr erfährst du
        in unserer <Link to="/dataprotection">Datenschutzerklärung</Link>. Mit
        "Akzeptieren" willigst du der Verwendung dieser Technologie ein.
      </div>
      <Button content="Akzeptieren" onClick={acceptCookies} secondary />
    </div>
  );
}
