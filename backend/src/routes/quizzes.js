const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find(); // fetch all questions
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// Submit quiz answers
router.post("/submit", async (req, res) => {
  try {
    const { answers, userId } = req.body;
    let score = 0;

    const questions = await Question.find();

    questions.forEach((q) => {
      if (answers[q._id] && answers[q._id] === q.correctAnswer) {
        score += 1;
      }
    });

    const passed = score >= Math.ceil(questions.length / 2);

    // Save result in DB
    const Result = require("../models/Result");
    const newResult = new Result({
      userId,
      quizId: "defaultQuiz",
      score,
      date: new Date(),
      passed,
    });
    await newResult.save();

    res.json({ score, passed, userId, username: req.body.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
});

module.exports = router;
