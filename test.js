var nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OTP_MAILER_ID,
    pass: process.env.OTP_MAILER_PASS,
  },
});

var mailOptions = {
  from: process.env.OTP_MAILER_ID,
  to: "krishhtrishh9304@gmail.com",
  subject: "Welcome to Linkup",
  text: "Here will be your OTP",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
