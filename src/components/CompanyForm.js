import React, { useState } from "react";
import { Form, Input, Segment, Button } from "semantic-ui-react";
import DropZone from "./DropZone";
import RichTextEditor from "react-rte";

export default function CompanyForm({ company, setCompany }) {
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
      <Form.Field
        label="Firmename"
        control={Input}
        name="name"
        onChange={updateCompany}
        value={company.name}
      />
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
      <Form.Field
        label="Firmenführung"
        control={Input}
        name="executive"
        onChange={updateCompany}
        value={company.executive}
      />
      <Form.Field
        control={RichTextEditor}
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
      <Form.Field
        control={RichTextEditor}
        value={contactInformation}
        onChange={setContactInformation}
        onBlur={() => {
          updateRichText("contactInformation", contactInformation);
        }}
        label="Kontakt Informationen"
        name="contactInformation"
      />
      <Form.Field
        control={RichTextEditor}
        value={subjectAndBelow}
        onChange={setSubjectAndBelow}
        onBlur={() => {
          updateRichText("subjectAndBelow", subjectAndBelow);
        }}
        label="Betreff und Begrüßung"
        name="subjectAndBelow"
      />
      <Form.Field
        control={RichTextEditor}
        value={invoiceText}
        onChange={setInvoiceText}
        onBlur={() => {
          updateRichText("invoiceText", invoiceText);
        }}
        label="Rechnungstext"
        name="invoiceText"
      />
      <Form.Field
        control={RichTextEditor}
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
      <Form.Field
        label="Farbe"
        control={Input}
        placeholder="z.B. #ffffff oder rgb(120,0,0)"
        name="companyColor"
        onChange={updateCompany}
        value={company.color}
      />
    </Form>
  );
}
