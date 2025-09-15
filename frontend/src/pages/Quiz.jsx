import React, { useEffect, useState } from "react";
import { getQuizQuestions } from "../services/api";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await getQuizQuestions("defaultQuiz");
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setError(err.response?.data?.message || "Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[current]._id]: answer });
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", { state: { questions, answers } });
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!questions.length) return <p>No questions available.</p>;

  const q = questions[current];
  return (
    <div>
      <h3>{q.questionText}</h3>
      {q.options.map((opt) => (
        <button key={opt} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Quiz;
