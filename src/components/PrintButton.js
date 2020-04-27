import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "semantic-ui-react";

const PrintButton = ({ id, label, fileName }) => (
  <Button
    primary
    onClick={() => {
      const input = document.getElementById(id);

      html2canvas(input, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5);
        let pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        pdf.save(`${fileName}.pdf`);
      });
    }}
    icon="download"
    labelPosition="right"
    content="Download"
  ></Button>
);

export default PrintButton;
