import React from "react";
import { useHistory } from "react-router";
import { Icon, Button, Card } from "semantic-ui-react";

import "./PlanCard.css";

export default function PlanCard({
  plans,
  actionActive = true,
  yearly = false,
}) {
  const history = useHistory();

  return (
    <Card.Group centered>
      {plans.map((plan) => (
        <Card key={plan.name}>
          <Card.Header className="billeroo-plan-card-header" textAlign="center">
            <Icon name={plan.iconName} size="big" />
            <h3>{plan.name}</h3>
          </Card.Header>
          <Card.Content className="billeroo-plan-card-price-container">
            <b>
              {yearly ? plan.pricePerMonthYearly : plan.pricePerMonthMonthly} €
            </b>
            <br />
            <span className="billeroo-plan-card-price-month">/Monat</span>
          </Card.Content>
          <Card.Content>
            <div>
              <div className="billeroo-plan-card-content-item">
                <span>Rechnungen</span>
                <span>{plan.invoiceAmount}</span>
              </div>
              <div className="billeroo-plan-card-content-item">
                <span>Woocommercehook</span>
                <span>
                  <Icon name={plan.woocommerceIcon} />
                </span>
              </div>
              <div className="billeroo-plan-card-content-item">
                <span>Support</span>
                <span>
                  <Icon name={plan.supportIcon} />
                </span>
              </div>
            </div>
          </Card.Content>
          {actionActive && (
            <Card.Content textAlign="center">
              <Button
                primary
                onClick={() =>
                  history.push(
                    plan.onClickLink + (yearly ? "?yearly=true" : "")
                  )
                }
                content={plan.buttonText}
              />
            </Card.Content>
          )}
        </Card>
      ))}
    </Card.Group>
  );
}
