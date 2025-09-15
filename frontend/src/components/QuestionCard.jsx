import React from "react";

const QuestionCard = ({ question, selectedAnswer, onSelect }) => {
  return (
    <div>
      <h3>{question.questionText}</h3>
      {question.options.map((opt, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name={question._id}
            value={opt}
            checked={selectedAnswer === opt}
            onChange={() => onSelect(question._id, opt)}
          />
          <label>{opt}</label>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
