var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "idk0user@gmail.com",
    pass: "IdkPassword",
  },
});

var mailOptions = {
  from: "idk0user@gmail.com",
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
