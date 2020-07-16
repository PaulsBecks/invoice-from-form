import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import { useParams, useLocation } from "react-router";
import "./Plan.css";
import {
  Input,
  Form,
  Button,
  Message,
  Card,
  Checkbox,
} from "semantic-ui-react";
import FunnelStep from "../../components/FunnelStep/FunnelStep";
import { useUser } from "../../hooks";
import { plans } from "../../constants";
import PlanCard from "../../components/PlanCard/PlanCard";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForḿ";

const config = getConfig();

export default function Plan() {
  const location = useLocation();
  const [yearly, setYearly] = useState({});
  useEffect(() => {
    setYearly(new URLSearchParams(location.search).get("yearly"));
  }, [location]);
  const [funnelState, setFunnelState] = useState(0);
  const [nextStepButtonDisabled, setNextStepButtonDisabled] = useState([
    true,
    true,
    true,
  ]);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState();
  const [user, setUser] = useUser();
  const [address, setAddress] = useState({
    name: "",
    streetAndHousenumber: "",
    town: "",
    postcode: "",
    addition: "",
  });

  const onAddressChange = (e, { name, value }) => {
    setAddress({ ...address, [name]: value });
  };

  const [agbAccepted, setAgbAccepted] = useState(false);

  const { planName } = useParams();
  const plan = plans[planName];
  plan["id"] = config.paypalPlanIds[planName];
  // control step one button
  useEffect(() => {
    const steps = [...nextStepButtonDisabled];
    if (
      user &&
      user.user &&
      !user.user.placeholder &&
      nextStepButtonDisabled[0]
    ) {
      steps[0] = false;
      setNextStepButtonDisabled(steps);
    }
    if (
      (!user || !user.user || user.user.placeholder) &&
      !nextStepButtonDisabled[0]
    ) {
      steps[1] = true;
      setNextStepButtonDisabled(steps);
    }
    const secondTabDone = Object.values(address).reduce(
      (b, a) => b && a !== "",
      true
    );
    steps[1] = !secondTabDone;
    steps[2] = !agbAccepted;
    setNextStepButtonDisabled(steps);
  }, [user, address, agbAccepted]);

  useEffect(() => {
    if (!nextStepButtonDisabled.reduce((b, d) => b || d, false)) {
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "subscribe",
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              plan_id: plan.id,
            });
          },
          onApprove: function (data, actions) {
            alert(data.subscriptionID);
          },
        })
        .render("#paypal-button-container");
    }
  }, [nextStepButtonDisabled]);

  return (
    <div className="billeroo-plan-container">
      <div className="billeroo-plan-funnel">
        <div className="billeroo-plan-funnel-header">
          <FunnelStep id={0} activeStep={funnelState}>
            1. Kontakt
          </FunnelStep>
          <FunnelStep id={1} activeStep={funnelState}>
            2. Adresse
          </FunnelStep>
          <FunnelStep id={2} activeStep={funnelState}>
            3. Bestätigung
          </FunnelStep>
        </div>
        <Card fluid>
          <Card.Content>
            {funnelState === 0 && (
              <div className="billeroo-plan-funnel-step">
                {user && user.user && !user.user.placeholder ? (
                  <p>
                    {plan.name} erwerben für den Account{" "}
                    <b>{user.user.email}</b>
                  </p>
                ) : (
                  <div>
                    <Message info>
                      <b>
                        Du bist aktuell nicht eingeloggt, wenn du deinen
                        aktuellen Account ugraden möchtest melde dich bitte
                        zuerst an.
                      </b>
                    </Message>
                    <RegistrationForm setUser={setUser} />
                  </div>
                )}
              </div>
            )}

            {funnelState === 1 && (
              <div>
                <Form>
                  <Form.Field
                    label="Name"
                    name="name"
                    control={Input}
                    onChange={onAddressChange}
                    value={address.name}
                  />
                  <Form.Field
                    label="Straße, Hausnummer"
                    name="streetAndHousenumber"
                    control={Input}
                    onChange={onAddressChange}
                    value={address.streetAndHousenumber}
                  />
                  <Form.Field
                    label="Addresszusatz"
                    name="addition"
                    control={Input}
                    onChange={onAddressChange}
                    value={address.addition}
                  />
                  <Form.Field
                    label="Postleitzahl"
                    name="postcode"
                    control={Input}
                    onChange={onAddressChange}
                    value={address.napostcodeme}
                  />

                  <Form.Field
                    label="Ort"
                    name="town"
                    control={Input}
                    onChange={onAddressChange}
                    value={address.town}
                  />
                </Form>
              </div>
            )}

            {funnelState === 2 && (
              <div className="billeroo-plan-funnel-step">
                <p>
                  {plan.name} erwerben für den Account <b>{user.user.email}</b>
                </p>

                <div>
                  <h5>Rechnungsaddresse</h5>
                  <div className="billeroo-plan-funnel-billing-address">
                    <div>
                      <span>Name:</span>
                      <span>{address.name}</span>
                    </div>
                    <div>
                      <span>Straße, Hausnummer:</span>
                      <span>{address.streetAndHousenumber}</span>
                    </div>
                    <div>
                      <span>Addresszusatz:</span>
                      <span>{address.addition}</span>
                    </div>
                    <div>
                      <span>Postleitzahl:</span>
                      <span>{address.postcode}</span>
                    </div>
                    <div>
                      <span>Ort:</span>
                      <span>{address.town}</span>
                    </div>
                  </div>
                </div>
                <Form>
                  <Checkbox
                    label="Ich erkläre mich mit den AGB von Billeroo einverstanden."
                    value={agbAccepted}
                    onChange={(e, a) => {
                      setAgbAccepted(a.checked);
                    }}
                  />
                </Form>
                {!nextStepButtonDisabled[2] && (
                  <div id="paypal-button-container"></div>
                )}
              </div>
            )}
          </Card.Content>
        </Card>
        <div className="billeroo-plan-funnel-actions">
          {funnelState > 0 && (
            <Button
              content="Zurück"
              onClick={() => setFunnelState(funnelState - 1)}
            />
          )}
          {funnelState < 2 && (
            <Button
              content="Weiter"
              disabled={nextStepButtonDisabled[funnelState]}
              primary
              onClick={() => setFunnelState(funnelState + 1)}
            />
          )}
        </div>
      </div>
      <div>
        <PlanCard plans={[plan]} actionActive={false} yearly={yearly} />
      </div>
    </div>
  );
}
