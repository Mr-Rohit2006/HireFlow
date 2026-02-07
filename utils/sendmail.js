const nodemailer = require("nodemailer");

module.exports = async (to, subject, html) => {
  // Fake email account (auto-created)
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: "Job Portal <no-reply@jobportal.com>",
    to,
    subject,
    html
  });

  console.log("📩 Email Preview URL:", nodemailer.getTestMessageUrl(info));
};
