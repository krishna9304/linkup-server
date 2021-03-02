let router = require("express").Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  res.send("nice");
});

module.exports = router;
