const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    unique: true
  },
  displayName: {
    type: String,
    max: 100
  },
  avatar: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String,
    max: 100
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    website: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);