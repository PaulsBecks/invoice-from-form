import React from "react";
import { Button } from "semantic-ui-react";
import { printInvoice } from "../services";

const PrintButton = ({ id, label, fileName }) => (
  <Button
    primary
    onClick={() => printInvoice(id, fileName)}
    icon="download"
    labelPosition="right"
    content="Download"
  ></Button>
);

export default PrintButton;
