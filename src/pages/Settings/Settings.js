import React from "react";
import "./Settings.css";
import { Table, Button } from "semantic-ui-react";
import { useUser, useWebhooks } from "../../hooks";
import PlanCard from "../../components/PlanCard/PlanCard";

import { plans } from "../../constants";
import { useHistory } from "react-router";
import useCurrentSubscription from "../../hooks/useCurrentSubscription";
export default function Settings() {
  const [user, setUser] = useUser();
  const [webhooks, addWebhook, deleteWebhook] = useWebhooks();
  const history = useHistory();
  const [currentSubscription] = useCurrentSubscription();

  if (!user || !user.user || user.user.placeholder) {
    return null;
  }

  return (
    <div className="billeroo-settings-container">
      <div>
        <h3>Nutzer</h3>
        <div className="billeroo-user-container">
          <p>Angemeldet als {user.user.email}</p>
          <Button
            content="Abmelden"
            onClick={() => {
              setUser({});
              window.document.location.href = "/";
            }}
          />
        </div>
      </div>
      <div>
        <h3>Aktuell Abonniert</h3>
        <div className="billeroo-current-subscription">
          <div>
            <PlanCard
              plans={
                currentSubscription && currentSubscription.plan
                  ? [currentSubscription.plan]
                  : [plans.starter]
              }
              yearly={plans.yearly}
              actionActive={false}
            />
          </div>
          <div>
            <Button
              secondary
              content={"Upgrade"}
              onClick={() => history.push("/plans")}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Webhooks</h3>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>URL</Table.HeaderCell>
              <Table.HeaderCell>Secret</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {webhooks.map((wh) => (
              <Table.Row key={wh._id}>
                <Table.Cell>
                  https://api.billeroo.de/data/webhooks/{wh._id}
                </Table.Cell>
                <Table.Cell>{wh.secret}</Table.Cell>
                <Table.Cell>
                  <Button
                    negative
                    onClick={() => deleteWebhook(wh._id)}
                    icon="trash"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Button content="Webhook anlegen" onClick={addWebhook} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
