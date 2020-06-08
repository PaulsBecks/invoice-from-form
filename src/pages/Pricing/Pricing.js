import React from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
export default function Pricing() {
  const history = useHistory();
  const openNewInvoice = () => {
    history.push("/invoices/new");
  };
  return (
    <div>
      <div className="invoice-app-container">
        <div className="billeroo-price-section">
          <div className="billeroo-price-section-text">
            <h1 className="billeroo-price-section-text-title">Preise</h1>
          </div>
          <Table celled color="teal" unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>
                  <div>
                    <Icon name="paper plane" size="big" />
                  </div>
                  <div>Starter</div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div>
                    <Icon name="plane" size="big" />
                  </div>
                  <div>Basic</div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div>
                    <Icon name="rocket" size="big" />
                  </div>
                  <div>Premium</div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Preis</Table.Cell>
                <Table.Cell>0 €/Monat</Table.Cell>
                <Table.Cell>10 €/Monat</Table.Cell>
                <Table.Cell>ab 50 €/Monat</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Rechnungen</Table.Cell>
                <Table.Cell>20/Monat</Table.Cell>
                <Table.Cell>200/Monat</Table.Cell>
                <Table.Cell>Endlos</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Accounts</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Beliebig</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Support</Table.Cell>
                <Table.Cell>
                  <Icon name="times" />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="check" />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="check" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Individuelles Desgin</Table.Cell>
                <Table.Cell>
                  <Icon name="times" />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="times" />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="check" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <Button
                    content="Jetzt Starten"
                    onClick={openNewInvoice}
                    primary
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    content="Jetzt Testen"
                    onClick={openNewInvoice}
                    secondary
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    primary
                    content="Jetzt Testen"
                    onClick={openNewInvoice}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
