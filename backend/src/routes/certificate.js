const express = require("express");
const router = express.Router();
const generatePDF = require("../utils/pdfGenerator");
const User = require("../models/User");
const Result = require("../models/Result");
const Quiz = require("../models/Question"); // assuming quiz info stored here

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const result = await Result.findOne({ userId: req.params.userId }).sort({ date: -1 });
    const quiz = await Quiz.findOne({ _id: result.quizId });

    if (!user || !result || !quiz) return res.status(404).json({ message: "Data not found" });

    const pdfData = await generatePDF(user, quiz, result.score);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Certificate_${user.username}.pdf`,
      "Content-Length": pdfData.length,
    });

    res.send(pdfData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate certificate" });
  }
});

module.exports = router;
