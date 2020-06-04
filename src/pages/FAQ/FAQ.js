import React, { useDebugValue } from "react";
import { Accordion } from "semantic-ui-react";
import { useGA } from "../../hooks";
import "./FAQ.css";

export default function FAQ() {
  useGA();
  const panels = [
    {
      key: "panel-1",
      title: "Wie lege ich eine Rechnung an?",
      content:
        'Um eine Rechnung zu erstellen, klickst du in der Navigationleiste auf den Button "Neue Rechnung". Es öffnet sich eine neue Seite auf der du links die Rechnung siehst. Du kannst nun anfangen den Kunden und Artikel in die Rechnung einzutragen.',
    },
  ];
  return (
    <div className="billeroo-faq-page">
      <h1 className="billeroo-faq-page-title">FAQ - Häufig gestellte Fragen</h1>
      <Accordion defaultActiveIndex={1} panels={panels} />
    </div>
  );
}
