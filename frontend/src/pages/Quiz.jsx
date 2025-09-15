import React, { useEffect, useState } from "react";
import { fetchQuiz, submitQuiz } from "../services/api";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetchQuiz();
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz({ answers });
      localStorage.setItem("lastResult", JSON.stringify(res.data));
      navigate("/result");
    } catch (err) {
      console.error(err);
    }
  };

  if (!questions.length) return <p>Loading quiz...</p>;

  return (
    <div>
      <h2>Quiz</h2>
      <QuestionCard
        question={questions[currentIndex]}
        selectedAnswer={answers[questions[currentIndex]._id]}
        onSelect={handleAnswer}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
