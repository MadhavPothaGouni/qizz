// backend/seedQuestions.js
const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("./src/models/Question");

const questions = [
  {
    quizId: "defaultQuiz",
    questionText: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    quizId: "defaultQuiz",
    questionText: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    correctAnswer: "Delhi",
  },
  {
    quizId: "defaultQuiz",
    questionText: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Jupiter",
  },
  {
    quizId: "defaultQuiz",
    questionText: "What color do you get by mixing red and blue?",
    options: ["Purple", "Green", "Orange", "Yellow"],
    correctAnswer: "Purple",
  },
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.insertMany(questions);
    console.log("Sample questions inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedQuestions();
