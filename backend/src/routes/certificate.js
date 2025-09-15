const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Result = require("../models/Result");

router.post("/", async (req, res) => {
  try {
    const { username, quizTitle, score } = req.body;

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${username}-certificate.pdf`);
    doc.pipe(res);

    doc.fontSize(30).text("Certificate of Completion", { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`Awarded to: ${username}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Quiz: ${quizTitle}`, { align: "center" });
    doc.fontSize(16).text(`Score: ${score}`, { align: "center" });
    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Error generating certificate" });
  }
});

module.exports = router;
