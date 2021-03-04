let router = require("express").Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let User = require("../database/models/user");
var nodemailer = require("nodemailer");
let otpGenerator = require("otp-generator");

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
  to: "mrcircuit1234@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

router.post("/signup", (req, res, next) => {
  let otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });
  let data = req.body;
  console.log(data);
  User.exists(
    {
      email: data.email,
    },
    (err, result) => {
      if (err) {
        next(err);
      }
      if (result === false) {
        bcrypt.hash(data.password, 10, (err, encPass) => {
          if (err) {
            next(err);
          }
          data.password = encPass;
          let user = new User(data);
          user
            .save()
            .then((doc) => {
              let token = jwt.sign(
                {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  email: doc.email,
                },
                process.env.JWT_PASS,
                { expiresIn: "24h" }
              );
              res.cookie("jwt", token);
              res.send({
                userdata: doc,
                res: true,
                msg: "User registered succesfully!",
              });
            })
            .catch((err) => {
              next(err);
            });
        });
      } else {
        res.send({
          res: false,
          msg: "User with the given email already exists.",
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.exists({ email }, (err, result) => {
    if (err) next(err);

    console.log({ err, result });

    if (result) {
      //getting the user data from the database
      User.findOne({ email })
        .then((doc) => {
          //now we will check the password
          let hash = doc.password;
          bcrypt.compare(password, hash, (err, same) => {
            if (err) next(err);
            if (same) {
              //successful login
              let token = jwt.sign(
                {
                  firstName: doc.firstName,
                  lastName: doc.lastName,
                  email: doc.email,
                },
                process.env.JWT_PASS,
                {
                  expiresIn: "24h",
                }
              );
              res.cookie("jwt", token);

              res.send({
                userdata: doc,
                res: true,
                msg: "Your login successful.",
              });
            } else {
              res.status(403).send({
                res: false,
                msg: "The password you have entered is incorrect",
              });
            }
          });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(403).send({
        res: false,
        msg: "No user was found from the given detail",
      });
    }
  });
});

router.post("/verifyToken", (req, res) => {
  let token = req.body.token;
  jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
    if (err) next(err);
    User.exists({ email: decoded.email }, (err, result) => {
      if (err) next(err);
      console.log(decoded);
      if (result === true) {
        User.findOne({ email: decoded.email }, (err, doc) => {
          if (err) next(err);
          console.log(doc);
          res.send({
            userdata: doc,
            res: true,
          });
        });
      } else {
        res.send({
          res: false,
          msg: "User with the following token does not found in the database",
        });
      }
    });
  });
});

module.exports = router;
