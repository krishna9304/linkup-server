require("dotenv").config();
import express from "express";
let app = express();

//constants
const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== "production";

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
    msg: isDev ? error.message : "There was some internal server error!",
    stack: isDev ? error.stack : "Contact the developer",
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.clear();
  console.log(
    `Server started succesfully on PORT ${PORT} at ${Date()} as ${
      isDev ? "Development" : "Production"
    }`
  );
});
