const nodemailer = require("nodemailer");

module.exports = async (email, subject, html) => {
  try {
    // Creating a nodemailer transporter with email server settings
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });
    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email Not Sent!");
    console.log(error);
    return error;
  }
};