let mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fo7rn.mongodb.net/linkup?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("open", () => {
  console.log("Conncected to the database successfully");
});

db.once("error", () => {
  console.log("There was some problem connecting to the database");
});
