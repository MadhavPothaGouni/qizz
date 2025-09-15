import React from "react";
import { generateCertificate } from "../services/api";

const Certificate = () => {
  const handleDownload = async () => {
    try {
      const result = JSON.parse(localStorage.getItem("lastResult"));
      if (!result) {
        alert("No result found!");
        return;
      }

      const res = await generateCertificate(result.userId);

      // Create a Blob from the PDF response
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link to download
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate_${result.username}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate certificate.");
    }
  };

  return (
    <div>
      <h2>Certificate</h2>
      <button onClick={handleDownload}>Download PDF Certificate</button>
    </div>
  );
};

export default Certificate;
