let express = require("express");
let router = express.Router();
let auth = require("./auth");

router.use("/auth", auth);

module.exports = router;
