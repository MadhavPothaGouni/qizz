import React from "react";

const QuestionCard = ({ question, selected, onSelect }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
      <h3>{question.questionText}</h3>
      <div>
        {question.options.map((option, idx) => (
          <div key={idx} style={{ margin: "5px 0" }}>
            <label>
              <input
                type="radio"
                name={question._id}
                value={option}
                checked={selected === option}
                onChange={() => onSelect(option)}
              />{" "}
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
