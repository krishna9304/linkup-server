let mongoose = require("mongoose");
let chalk = require("chalk");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.sxsst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("open", () => {
  console.log(chalk.greenBright("Connected to the database successfully"));
});

db.once("error", () => {
  // console.log(process.env);
  console.log("There was some problem connecting to the database");
});
