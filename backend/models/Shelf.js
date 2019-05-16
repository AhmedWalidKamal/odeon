const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema
const ShelfSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  movies: [
    {
      type: Number,
      unique: true
    }
  ]
});

module.exports = User = mongoose.model("shelf", ShelfSchema);
