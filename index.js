require("dotenv").config();
const bodyParser = require("body-parser");
let express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
let routes = require("./routes");
let cors = require("cors");
let app = express();

//constants
const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== "production";

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
