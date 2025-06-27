import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ExportTree({ exportRef }) {
  const downloadPDF = async () => {
    const input = exportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("family_tree.pdf");
  };

  const downloadImage = async () => {
    const input = exportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = img;
    a.download = "family_tree.png";
    a.click();
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <button onClick={downloadPDF}>📄 Export as PDF</button>
      <button onClick={downloadImage} style={{ marginLeft: "10px" }}>
        🖼️ Export as Image
      </button>
    </div>
  );
}

export default ExportTree;
