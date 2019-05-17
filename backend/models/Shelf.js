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
      movieId: {
        type: Number
      },
      watchDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model("shelf", ShelfSchema);
