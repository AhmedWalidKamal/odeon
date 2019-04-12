const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
