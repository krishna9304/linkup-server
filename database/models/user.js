let mongoose = require("mongoose");
let User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  img: String,
  verified: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("user", User);
