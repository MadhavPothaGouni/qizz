const PDFDocument = require("pdfkit");
const getStream = require("get-stream");

// Function to generate PDF and return buffer
const generatePDF = async ({ username, quizTitle, score }) => {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  // Pipe to buffer
  const stream = doc.pipe(require("stream").PassThrough());

  // Background & Border
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f5f5f5");
  doc.strokeColor("#000").lineWidth(2).rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

  // Title
  doc
    .fontSize(28)
    .fillColor("#333")
    .text("Certificate of Completion", { align: "center", underline: true });

  doc.moveDown(2);

  // Recipient
  doc
    .fontSize(20)
    .fillColor("#000")
    .text(`This is to certify that`, { align: "center" });

  doc.moveDown(1);

  doc
    .fontSize(24)
    .fillColor("#000")
    .text(`${username}`, { align: "center", bold: true });

  doc.moveDown(1);

  doc
    .fontSize(18)
    .text(`has successfully completed the quiz`, { align: "center" });

  doc.moveDown(1);

  doc
    .fontSize(20)
    .fillColor("#333")
    .text(`"${quizTitle}"`, { align: "center", italics: true });

  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("#000")
    .text(`Score: ${score}`, { align: "center" });

  doc.moveDown(3);

  // Footer / signature
  doc
    .fontSize(16)
    .fillColor("#555")
    .text("Powered by Micro-Certification Platform", { align: "center" });

  doc.end();

  const buffer = await getStream.buffer(stream);
  return buffer;
};

module.exports = { generatePDF };
