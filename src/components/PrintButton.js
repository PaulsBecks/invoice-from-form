import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { printInvoice } from "../services";

const PrintButton = ({ id, label, fileName }) => {
  const [isCreatingPDF, setIsCreatingPDF] = useState(false);
  return (
    <Button
      primary
      onClick={async () => {
        setIsCreatingPDF(true);
        await printInvoice(id, fileName);
        setIsCreatingPDF(false);
      }}
      icon="download"
      labelPosition="right"
      content="Download"
      loading={isCreatingPDF}
    ></Button>
  );
};

export default PrintButton;
