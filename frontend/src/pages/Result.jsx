import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { questions, answers } = location.state || {};
  const navigate = useNavigate();

  if (!questions) return <p>No result to show.</p>;

  const score = questions.reduce(
    (acc, q) => acc + (answers[q._id] === q.correctAnswer ? 1 : 0),
    0
  );

  return (
    <div>
      <h2>Result</h2>
      <p>Score: {score}/{questions.length}</p>
      <p>Status: {score >= questions.length / 2 ? "Pass" : "Fail"}</p>
      <button onClick={() => navigate("/certificate", { state: { score } })}>
        Download Certificate
      </button>
    </div>
  );
}

export default Result;
