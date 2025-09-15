import React from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("lastResult"));

  if (!result) return <p>No result found.</p>;

  return (
    <div>
      <h2>Result</h2>
      <p>Score: {result.score}</p>
      <p>Status: {result.passed ? "Pass ✅" : "Fail ❌"}</p>
      <button onClick={() => navigate("/certificate")}>Download Certificate</button>
      <button onClick={() => navigate("/quiz")}>Retake Quiz</button>
    </div>
  );
};

export default Result;
