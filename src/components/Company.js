import React from "react";
import { Form, Input, Segment, Button, TextArea } from "semantic-ui-react";
import { useLocalStorage } from "../hooks";
import { company as companySceleton } from "../sceletons";
import DropZone from "./DropZone";

export default function Company() {
  const [company, setCompany] = useLocalStorage("company", companySceleton);

  const updateCompany = (e, { name, value }) => {
    setCompany({ ...company, [name]: value });
  };

  const updateFirstAddress = (e, { name, value }) => {
    setCompany({
      ...company,
      firstAddress: { ...company.firstAddress, [name]: value },
    });
  };

  const updateSecondAddress = (e, { name, value }) => {
    setCompany({
      ...company,
      secondAddress: { ...company.secondAddress, [name]: value },
    });
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
    <div>
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
          {company.logo != "" ? (
            <div>
              <img src={company.logo} />
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
        <Segment>
          <h4>Erste Adresse</h4>
          <Form.Group width="equal">
            <Form.Field
              id="form-input-control-name"
              control={Input}
              label="Name"
              name="name"
              onChange={updateFirstAddress}
              value={company.firstAddress.name}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Anschrift"
              name="address"
              onChange={updateFirstAddress}
              value={company.firstAddress.address}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="PLZ"
              name="postCode"
              onChange={updateFirstAddress}
              value={company.firstAddress.postcode}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Stadt"
              name="city"
              onChange={updateFirstAddress}
              value={company.firstAddress.city}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Telefon"
              name="phone"
              onChange={updateFirstAddress}
              value={company.firstAddress.phone}
            />
          </Form.Group>
        </Segment>

        <Segment>
          <h4>Zweite Adresse</h4>
          <Form.Group width="equal">
            <Form.Field
              id="form-input-control-name"
              control={Input}
              label="Name"
              name="name"
              onChange={updateSecondAddress}
              value={company.secondAddress.name}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Anschrift"
              name="address"
              onChange={updateSecondAddress}
              value={company.secondAddress.address}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="PLZ"
              name="postCode"
              onChange={updateSecondAddress}
              value={company.secondAddress.postcode}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Stadt"
              name="city"
              onChange={updateSecondAddress}
              value={company.secondAddress.city}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Telefon"
              name="phone"
              onChange={updateSecondAddress}
              value={company.secondAddress.phone}
            />
          </Form.Group>
        </Segment>

        <Form.Field
          label="1. Email"
          control={Input}
          name="firstEmail"
          onChange={updateCompany}
          value={company.firstEmail}
        />
        <Form.Field
          label="2. Email"
          control={Input}
          name="secondEmail"
          onChange={updateCompany}
          value={company.secondEmail}
        />
        <Form.Field
          label="Steuernummer"
          control={Input}
          name="taxNumber"
          onChange={updateCompany}
          value={company.taxNumber}
        />
        <Form.Field
          label="Finanzamt"
          control={Input}
          name="taxOffice"
          onChange={updateCompany}
          value={company.taxOffice}
        />
        <Form.Field
          label="Ust-Nr."
          control={Input}
          name="ustNr"
          onChange={updateCompany}
          value={company.ustNr}
        />
        <Segment>
          <h4>Bankinformationen</h4>
          <Form.Field
            label="Bank"
            control={Input}
            name="bank"
            onChange={updateCompany}
            value={company.bank}
          />
          <Form.Field
            label="IBAN"
            control={Input}
            name="iban"
            onChange={updateCompany}
            value={company.iban}
          />
          <Form.Field
            label="BIC"
            control={Input}
            name="bic"
            onChange={updateCompany}
            value={company.bic}
          />
        </Segment>
        <Form.Field>
          <Form.TextArea
            label="Standard Freitext"
            value={company.finalText}
            onChange={updateCompany}
            name="finalText"
          />
        </Form.Field>
      </Form>
    </div>
  );
}
