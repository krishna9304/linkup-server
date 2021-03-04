<<<<<<< HEAD
import mongoose from "mongoose";
=======
let mongoose = require("mongoose");
>>>>>>> b571e1f0b188f49736f6da9e4c4ae8a93cabf84f

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.sxsst.mongodb.net/linkup?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("open", () => {
<<<<<<< HEAD
  console.log("Connected to the database!");
});

db.once("error", (err) => {
  console.log("Database Error");
  console.log(err);
=======
  console.log("Connected to the database successfully");
});

db.once("error", () => {
  console.log("There was some problem connecting to the database");
>>>>>>> b571e1f0b188f49736f6da9e4c4ae8a93cabf84f
});
