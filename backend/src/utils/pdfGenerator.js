const PDFDocument = require("pdfkit");

const generatePDF = (user, quiz, score) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // PDF content
      doc.fontSize(20).text("Micro-Certification Platform", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text(`Certificate of Completion`, { align: "center" });
      doc.moveDown(2);
      doc.fontSize(14).text(`This certifies that: ${user.username}`, { align: "center" });
      doc.moveDown();
      doc.text(`has successfully completed the quiz: ${quiz.title}`, { align: "center" });
      doc.moveDown();
      doc.text(`Score: ${score}`, { align: "center" });
      doc.moveDown(2);
      doc.text("Congratulations!", { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generatePDF;
