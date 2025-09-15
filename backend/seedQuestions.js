const mongoose = require("mongoose");
const Question = require("./src/models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const seed = async () => {
  await Question.deleteMany({});
  await Question.insertMany([
    { quizId: "defaultQuiz", questionText: "2 + 2?", options: ["3","4","5","6"], correctAnswer: "4" },
    { quizId: "defaultQuiz", questionText: "Capital of India?", options: ["Mumbai","Delhi","Bangalore","Chennai"], correctAnswer: "Delhi" }
  ]);
  console.log("Seed questions created");
  mongoose.disconnect();
};
seed();
