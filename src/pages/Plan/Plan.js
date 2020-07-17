import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import { useParams, useLocation, useHistory } from "react-router";
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
import { useUser, useGA } from "../../hooks";
import { plans } from "../../constants";
import PlanCard from "../../components/PlanCard/PlanCard";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForḿ";
import postSubscription from "../../services/backend/postSubscription";
import { PayPalButton } from "react-paypal-button-v2";
import { parsePrice, formatPrice } from "../../services";
import useScript from "../../hooks/useScript";

const config = getConfig();

export default function Plan() {
  useScript(
    "https://www.paypal.com/sdk/js?client-id=AbwB2ya2xnKMusFqpFcMWxvdQedgb1bLnbVJTp1LCnmGUUk2oGqOCGgRri6qheSnAuk2qSzMRl0p3bJH&vault=true"
  );
  const history = useHistory();
  const location = useLocation();
  const [yearly, setYearly] = useState({});
  useGA();
  useEffect(() => {
    setYearly(new URLSearchParams(location.search).get("yearly"));
  }, [location]);
  const [funnelState, setFunnelState] = useState(0);
  const [nextStepButtonDisabled, setNextStepButtonDisabled] = useState([
    true,
    true,
    true,
  ]);
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
  plan["id"] = config.paypalPlanIds[yearly ? "yearly" : "monthly"][planName];
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
  }, [user, address, agbAccepted]); //eslint-disable-line

  return (
    <div className="billeroo-plan-container">
      <div className="billeroo-plan-funnel">
        <div className="billeroo-plan-funnel-header">
          <FunnelStep id={0} activeStep={funnelState}>
            1. Kontakt
          </FunnelStep>
          <FunnelStep id={1} activeStep={funnelState}>
            2. Rechnungsaddresse
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
                <div className="billeroo-plan-funnel-step-ack">
                  <h4>Account</h4>
                  <p>
                    {plan.name} erwerben für den Account{" "}
                    <b>{user.user.email}</b>
                  </p>
                </div>

                <div className="billeroo-plan-funnel-step-ack">
                  <h4>Rechnungsaddresse</h4>
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

                  <div className="billeroo-plan-funnel-step-ack">
                    <h4>Preis </h4>
                    <p>
                      {yearly
                        ? "12 x " +
                          formatPrice(plan.pricePerMonthYearly) +
                          " € = " +
                          formatPrice(parsePrice(plan.pricePerMonthYearly) * 12)
                        : formatPrice(plan.pricePerMonthMonthly)}{" "}
                      €
                    </p>
                  </div>
                </div>
                <Form>
                  <Checkbox
                    label="Ich erkläre mich mit den AGB von Billeroo einverstanden."
                    checked={agbAccepted}
                    onChange={(e, a) => {
                      setAgbAccepted(a.checked);
                    }}
                  />
                </Form>
                {!nextStepButtonDisabled[2] && (
                  <PayPalButton
                    options={{ vault: true }}
                    createSubscription={(data, actions) => {
                      return actions.subscription.create({
                        plan_id: plan.id,
                      });
                    }}
                    onApprove={async function (data, actions) {
                      await postSubscription({
                        paypalData: data,
                        billingAddress: address,
                        plan,
                        yearly,
                      });
                      history.push("/thankyou");
                    }}
                  />
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
