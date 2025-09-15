import React from "react";
import { useLocation } from "react-router-dom";
import { submitAnswers } from "../services/api";

function Certificate() {
  const location = useLocation();
  const { score } = location.state || {};
  const username = localStorage.getItem("username");

  const handleDownload = async () => {
    const response = await submitAnswers({ username, quizTitle: "Default Quiz", score });
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${username}-certificate.pdf`;
    link.click();
  };

  return (
    <div>
      <h2>Certificate</h2>
      <p>Score: {score}</p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default Certificate;
