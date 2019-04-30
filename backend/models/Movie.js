const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imdb_id: {
    type: String
  },
  release_date: {
    type: String
  },
  plot_summary: {
    type: String
  },
  poster_path: {
    type: String,
    default:
      "https://in.bmscdn.com/iedb/movies/images/website/poster/large/ET00021963.jpg"
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
  genres: [
    {
      id: {
        type: Number,
        unique: true,
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
        unique: true,
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
        unique: true,
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
