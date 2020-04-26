import React, { useState } from "react";
import { Form, Input, Segment, Button } from "semantic-ui-react";
import DropZone from "./DropZone";
import RichTextEditor from "react-rte";
import Editor from "./Editor/Editor";

export default function CompanyForm({ company, setCompany, selected }) {
  const [footerText, setFooterText] = useState(
    RichTextEditor.createValueFromString(company.footerText, "html")
  );
  const [subjectAndBelow, setSubjectAndBelow] = useState(
    RichTextEditor.createValueFromString(company.subjectAndBelow, "html")
  );
  const [invoiceText, setInvoiceText] = useState(
    RichTextEditor.createValueFromString(company.invoiceText, "html")
  );
  const [contactInformation, setContactInformation] = useState(
    RichTextEditor.createValueFromString(company.contactInformation, "html")
  );
  const [aboveClientInvoiceAddress, setAboveClientInvoiceAddress] = useState(
    RichTextEditor.createValueFromString(
      company.aboveClientInvoiceAddress,
      "html"
    )
  );

  const updateRichText = (name, value) => {
    setCompany({ ...company, [name]: value.toString("html") });
  };

  const updateCompany = (e, { name, value }) => {
    setCompany({ ...company, [name]: value });
  };

  const onDropHandler = (files) => {
    var file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setCompany({ ...company, logo: event.target.result });
    };
    reader.readAsDataURL(file);
  };
  return (
    <Form>
      {selected === "advancedSettings" && (
        <Form.Field
          label="Firmename"
          control={Input}
          name="name"
          onChange={updateCompany}
          value={company.name}
        />
      )}
      {selected === "logo" && (
        <Segment>
          <h4>Logo</h4>
          {company.logo !== "" ? (
            <div>
              <img src={company.logo} alt="company logo" />
              <Button
                negative
                onClick={() => setCompany({ ...company, logo: "" })}
              >
                Löschen
              </Button>
            </div>
          ) : (
            <DropZone onDrop={onDropHandler} />
          )}
        </Segment>
      )}
      {selected === "aboveClientInvoiceAddress" && (
        <Form.Field
          control={Editor}
          value={aboveClientInvoiceAddress}
          onChange={setAboveClientInvoiceAddress}
          onBlur={() => {
            updateRichText(
              "aboveClientInvoiceAddress",
              aboveClientInvoiceAddress
            );
          }}
          label="Absender"
          name="aboveClientInvoiceAddress"
        />
      )}
      {selected === "contactInformation" && (
        <Form.Field
          control={Editor}
          value={contactInformation}
          onChange={setContactInformation}
          onBlur={() => {
            updateRichText("contactInformation", contactInformation);
          }}
          label="Kontakt Informationen"
          name="contactInformation"
        />
      )}
      {selected === "subjectAndBelow" && (
        <Form.Field
          control={Editor}
          value={subjectAndBelow}
          onChange={setSubjectAndBelow}
          onBlur={() => {
            updateRichText("subjectAndBelow", subjectAndBelow);
          }}
          label="Betreff und Begrüßung"
          name="subjectAndBelow"
        />
      )}
      {selected === "invoiceText" && (
        <Form.Field
          control={Editor}
          value={invoiceText}
          onChange={setInvoiceText}
          onBlur={() => {
            updateRichText("invoiceText", invoiceText);
          }}
          label="Rechnungstext"
          name="invoiceText"
        />
      )}
      {selected === "footerText" && (
        <Form.Field
          control={Editor}
          value={footerText}
          onChange={(value) => {
            setFooterText(value);
          }}
          onBlur={() => {
            updateRichText("footerText", footerText);
          }}
          label="Fußzeile"
          name="footerText"
        />
      )}
      {selected === "advancedSettings" && (
        <Form.Field
          label="Farbe"
          control={Input}
          placeholder="z.B. #ffffff oder rgb(120,0,0)"
          name="companyColor"
          onChange={updateCompany}
          value={company.color}
        />
      )}
    </Form>
  );
}
