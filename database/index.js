import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster.sxsst.mongodb.net/linkup?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to the database!");
});

db.once("error", (err) => {
  console.log("Database Error");
  console.log(err);
});
