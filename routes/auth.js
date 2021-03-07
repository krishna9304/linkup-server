let router = require("express").Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let User = require("../database/models/user");
var nodemailer = require("nodemailer");
let chalk = require("chalk");

router.post("/signup", (req, res, next) => {
  let data = req.body;
  User.exists({ email: data.email }, (err, result) => {
    if (err) next(err);
    if (result === false) {
      //passoword hashing and salting
      bcrypt.hash(data.password, 10, (err, enc_pass) => {
        if (err) next(err);
        
        data.password = enc_pass;
        data.verified = false;
        
        console.log(data);
        //saving the data to the database
        let user = new User(data);
        user
          .save()
          .then((doc) => {
            //generating the token
            // console.log("ID : ", doc._id);
            let token = jwt.sign(
              { id: doc._id, email: doc.email },
              process.env.JWT_PASS,
              {
                expiresIn: "24h",
              }
              );
              
            // console.log(chalk.red(token));

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.MAILER_ID,
                pass: process.env.MAILER_PASS,
              },
            });

            var mailOptions = {
              from: process.env.MAILER_ID,
              to: data.email,
              subject: "Welcome to Linkup",
              text: `Your Link to Verify: http://127.0.0.1:8080/api/v1/auth/verify/${token}`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res.cookie("jwt", token);
            res.send({
              userdata: doc,
              res: true,
              userData : data,
              msg: "User registerd successfully but not verified",
            });
          })
          .catch((err) => {
            next(err);
          });
      });
    } else {
      res.send({
        res: false,
        msg: "User with the give email already registered",
      });
    }
  });
});

/**
 * this is the login route [remember that the request type should be post]
 */

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.exists({ email }, (err, result) => {
    if (err) next(err);

    console.log({ err, result });

    if (result) {
      //getting the user data from the database
      User.find({ email })
        .then((doc) => {
          //now we will check the password
          let hash = doc.password;
          bcrypt.compare(password, hash, (err, same) => {
            if (err) next(err);
            if (same) {
              //successful login
              let token = jwt.sign(
                { name: doc.name, email: doc.email, id: doc._id },
                process.env.JWT_PASS,
                {
                  expiresIn: "2h",
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

router.get("/verify/:token", (req, res, next) => {
  let { token } = req.params;
  console.log("Trying to Update");
  jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
    if (err) next(err);
    console.log(decoded.id);
    User.findById(decoded.id, (err, user) => {
      if (err) next(err);
      user.verified = true;
      // console.log(user);
      user.save();
    });
    // User.findOneAndUpdate({ email: decoded.email }, { verified: true });
    res.send({
      result: true,
      msg: "You have been Verified successfully",
    });
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
