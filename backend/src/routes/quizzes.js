const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// GET quiz by quizId
router.get("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: `No quiz found with id: ${quizId}` });
    }

    res.json(questions);
  } catch (err) {
    console.error("Error fetching quiz:", err.message);
    res.status(500).json({ message: "Server error while fetching quiz" });
  }
});

module.exports = router;
