
import jsPDF from "jspdf";
import logo from "../assets/logos.png";
import React, { useEffect, useState } from "react";
import QRcode from "qrcode";

function GeneratePdf({ detailsForPdf,id }) {
  const [pdfUrl, setPdfUrl] = useState("");

  // const createPdf = async() => {
  //   const pdf = new jsPDF();

   
  //   pdf.addImage(logo, "PNG", 15, 15, 25, 25);
  //   const urll=`${window.location.origin}/verification/${id}`
  //   const qrImage=await QRcode.toDataURL(urll)
  //   pdf.addImage(qrImage, "PNG", 150, 15, 25, 25);

  //   pdf.setFont("helvetica", "bold");
  //   pdf.setFontSize(28);
  //   pdf.text("Vumi", 48, 30);

  //   pdf.setFont("helvetica", "normal");
  //   pdf.setFontSize(11);
  //   pdf.text("Land Ownership Verification Record", 48, 38);

  //   pdf.setDrawColor(100);
  //   pdf.line(15, 48, 195, 48);

  //   // PDF title
  //   pdf.setFont("helvetica", "bold");
  //   pdf.setFontSize(16);
  //   pdf.text("Deed Details", 15, 60);

  //   // Label and value columns
  //   const rows = [
  //     ["Owner", detailsForPdf?.name],
  //     ["NID", detailsForPdf?.nid],
  //     ["District", detailsForPdf?.district],
  //     ["Upazila", detailsForPdf?.upazila],
  //     ["Mouza", detailsForPdf?.mouza],
  //     ["Khatian No", detailsForPdf?.khatianNo],
  //     ["Document Hash", detailsForPdf?.hash],
  //   ];

  //   let y = 75;

  //   rows.forEach(([label, value]) => {
  //     pdf.setFont("helvetica", "bold");
  //     pdf.setFontSize(11);
  //     pdf.text(label, 20, y);

  //     pdf.text(":", 65, y);

  //     pdf.setFont("helvetica", "normal");

  //     const text = String(value || "Not entered yet");

  //     // Wrap long values such as document hashes
  //     const lines = pdf.splitTextToSize(text, 115);

  //     pdf.text(lines, 72, y);

  //     y += Math.max(lines.length, 1) * 7 + 5;

  //   });

  //   // Create a PDF preview URL
  //   const blob = pdf.output("blob");
  //   const url = URL.createObjectURL(blob);

  //   setPdfUrl((previousUrl) => {
  //     if (previousUrl) URL.revokeObjectURL(previousUrl);
  //     return url;
  //   });
  // };

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const downloadPdf = async() => {
    const pdf = new jsPDF();
    const urll=`${window.location.origin}/verification/${id}`
    const qrImage=await QRcode.toDataURL(urll)
    pdf.addImage(qrImage, "PNG", 150, 15, 25, 25);
    pdf.addImage(logo, "PNG", 15, 15, 25, 25);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.text("Vumi", 48, 30);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("Land Ownership Verification Record", 48, 38);
    pdf.line(15, 48, 195, 48);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Deed Details", 15, 60);

    const rows = [
      ["Owner", detailsForPdf?.name],
      ["NID", detailsForPdf?.nid],
      ["District", detailsForPdf?.district],
      ["Upazila", detailsForPdf?.upazila],
      ["Mouza", detailsForPdf?.mouza],
      ["Khatian No", detailsForPdf?.khatianNo],
      ["Document Hash", detailsForPdf?.hash],
    ];

    let y = 75;

    rows.forEach(([label, value]) => {
      const lines = pdf.splitTextToSize(
        String(value || "Not entered yet"),
        115
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text(label, 20, y);
      pdf.text(":", 65, y);

      pdf.setFont("helvetica", "normal");
      pdf.text(lines, 72, y);

      y += Math.max(lines.length, 1) * 7 + 5;
    });

    pdf.save("Vumi-Deed-Details.pdf");
  };

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button 
          onClick={downloadPdf}
          className="rounded bg-green-600 px-4 py-2 text-white cursor-pointer"
        >
          Download PDF
        </button>

        {/* <button
          onClick={createPdf}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Preview PDF
        </button> */}
      </div>
{/* 
      {pdfUrl && (
        <iframe
          title="PDF Preview"
          src={pdfUrl}
          className="mt-5 w-full border"
          style={{ height: "700px" }}
        />
      )} */}
    </div>
  );
}

export default GeneratePdf;
