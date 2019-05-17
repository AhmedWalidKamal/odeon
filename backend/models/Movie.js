const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const defaults = require("../config/defaults");

// create Schema
const MovieSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    dropDups: true,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  imdb_id: {
    type: String
  },
  release_date: {
    type: Date
  },
  plot_summary: {
    type: String
  },
  poster_path: {
    type: String,
    default: defaults.poster_path
  },
  avg_rating: {
    type: Number
  },
  ratings_count: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number
  },
  language: {
    type: String,
    default: "en"
  },
  adult: {
    type: Boolean
  },
  genres: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  cast: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  directors: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = User = mongoose.model("movie", MovieSchema);
