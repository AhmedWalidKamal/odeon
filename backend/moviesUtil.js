const Movie = require("./models/Movie");
const empty = require("is-empty");
const keys = require("./config/keys");
const tmdb = require("moviedb")(keys.tmdbApiKey);

const initConfig = function() {
  const { base_url, poster_sizes } = tmdb.configuration();
  return { base_url, poster_sizes };
};

const { base_url, poster_sizes } = initConfig;

const poster_size = poster_sizes[poster_sizes.length - 1];

const parseCredits = function(movieCredits) {
  movieCast = [];
  directors = [];

  const { cast } = movieCredits;
  cast.forEach(person => {
    castMember = {
      id: person.id,
      name: person.name
    };
    if (!empty(person.job) && person.job === "Director") {
      directors.push(castMember);
    } else {
      movieCast.push(castMember);
    }
  });
  return { cast: movieCast, directors: directors };
};

const createMovie = function(movieInfo, movieCredits) {
  const { cast, directors } = parseCredits(movieCredits);
  movie = new Movie();
  movie._id = movieInfo.id;
  movie.title = movieInfo.title;
  movie.imdb_id = movieInfo.imdb_id;
  movie.release_date = new Date(movieInfo.release_date);
  movie.plot_summary = movieInfo.overview;
  if (!empty(poster_path)) {
    movie.poster_path = base_url + poster_size + movieInfo.poster_path;
  }
  movie.avg_rating = movieInfo.vote_average;
  movie.ratings_count = movieInfo.vote_count;
  movie.duration = movieInfo.runtime;
  movie.language = movieInfo.original_language;
  movie.adult = movieInfo.adult;
  movie.genres = movieInfo.genres;
  movie.cast = cast;
  movie.directors = directors;

  return movie;
};

module.exports.getMovie = function(id) {
  return new Promise((resolve, reject) => {
    tmdb.movieInfo({ id }, (movieErr, movieInfo) => {
      errors = {};
      if (movieErr) {
        return reject(movieErr);
      }
      if (empty(movieInfo)) {
        errors.error = "Empty Movie Response";
        return reject(errors);
      }
      console.log(movieInfo);
      tmdb.movieCredits({ id }, (credErr, movieCredits) => {
        if (credErr) {
          return reject(credErr);
        }
        if (empty(movieCredits)) {
          errors.error = "Empty Credits Response";
        }
        console.log(movieCredits);
        return resolve(getMovie(movieInfo, movieCredits));
      });
    });
  });
};
