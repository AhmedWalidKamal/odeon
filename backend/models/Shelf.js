const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema
const ShelfSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "movie",
      unique: true
    }
  ]
});

module.exports = User = mongoose.model("shelf", ShelfSchema);
