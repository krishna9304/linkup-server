require("dotenv").config();
<<<<<<< HEAD
import express from "express";
=======
const bodyParser = require("body-parser");
let express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
let routes = require("./routes");
let cors = require("cors");
>>>>>>> b571e1f0b188f49736f6da9e4c4ae8a93cabf84f
let app = express();

//constants
const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== "production";

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send({
    data: "Some JSON data",
  });
});

// Database stuffs

require("./database");

//error_handler
let errorHandler = (error, req, res, next) => {
  res.send({
=======
//database
require("./database");

//middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use("/api/v1", routes);

//error_handler
let errorHandler = (error, req, res, next) => {
  res.status(500).send({
>>>>>>> b571e1f0b188f49736f6da9e4c4ae8a93cabf84f
    msg: isDev ? error.message : "There was some internal server error!",
    stack: isDev ? error.stack : "Contact the developer",
  });
};
<<<<<<< HEAD

=======
>>>>>>> b571e1f0b188f49736f6da9e4c4ae8a93cabf84f
app.use(errorHandler);

app.listen(PORT, () => {
  console.clear();
  console.log(
    `Server started succesfully on PORT ${PORT} at ${Date()} as ${
      isDev ? "Development" : "Production"
    }`
  );
});
