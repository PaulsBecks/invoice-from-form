import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "semantic-ui-react";

const pxToMm = (px) => {
  return Math.floor(px / document.getElementById("myMm").offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById("myMm").offsetHeight * mm;
};

const range = (start, end) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map(function (val, id) {
      return id + start;
    });
};

const PrintButton = ({ id, label, fileName }) => (
  <Button
    primary
    onClick={() => {
      const input = document.getElementById(id);

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1);
        let pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save(`${fileName}.pdf`);
      });

      ////////////////////////////////////////////////////////
      // System to manually handle page breaks
      // Wasn't able to get it working !
      // The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
      // If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
      ////////////////////////////////////////////////////////
      // range(0, numPages).forEach((page) => {
      //   console.log(`Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page*a4HeightPx}`);
      //   html2canvas(input, {height: a4HeightPx, y: page*a4HeightPx})
      //     .then((canvas) => {
      //       const imgData = canvas.toDataURL('image/png');
      //       console.log(imgData)
      //       if (page > 0) {
      //         pdf.addPage();
      //       }
      //       pdf.addImage(imgData, 'PNG', 0, 0);
      //     });
      //   ;
      // });

      // setTimeout(() => {
      //   pdf.save(`${id}.pdf`);
      // }, 5000);
    }}
    icon="download"
    labelPosition="right"
    content="Download"
  ></Button>
);

export default PrintButton;
