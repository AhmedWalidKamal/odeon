const Movie = require("./models/Movie");
const Shelf = require("./models/Shelf");
const empty = require("is-empty");
const keys = require("./config/keys");
const tmdb = require("moviedb")(keys.tmdbApiKey);

// Get config
const getConfig = function() {
  return new Promise((resolve, reject) => {
    tmdb.configuration((err, res) => {
      if (!err) {
        const { base_url, poster_sizes } = res.images;
        return resolve({ base_url, poster_sizes });
      }
      console.log(err);
      return reject(err);
    });
  });
};

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
    getConfig()
      .then(data => {
        console.log(data);
        const { base_url, poster_sizes } = data;
        const poster_size = poster_sizes[poster_sizes.length - 1];
        movie.poster_path = base_url + poster_size + movieInfo.poster_path;
      })
      .catch(err => console.log(err));
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

module.exports.updateRating = function(ratings, movieId, newRating) {
  var updated = false;
  for (var i = 0; i < ratings.length; i++) {
    if (ratings[i].movieId === movieId) {
      updated = true;
      ratings[i].rating = newRating;
    }
  }
  if (!updated) {
    ratings.push({ movieId, rating: newRating });
  }

  return ratings;
};

module.exports.updateShelf = function(shelfId, newShelf) {
  Shelf.findByIdAndUpdate(shelfId, newShelf).then(shelf => {
    if (empty(shelf)) {
      console.log("Shelf " + shelfId + " not found");
      errors.error = "Shelf not found";
      return reject(errors);
    } else {
      return resolve({
        success: true
      });
    }
  });
};

module.exports.addToShelf = function(shelfId, movieId) {
  return new Promise((resolve, reject) => {
    Shelf.findById(shelfId).then(shelf => {
      if (empty(user)) {
        console.log("Shelf " + shelfId + " not found");
        errors.error = "Shelf not found";
        return reject(errors);
      } else {
        if (!shelf.movies.includes(movieId)) {
          shelf.movies.push(movieId);
          updateShelf(shelfId, shelf).then(success => {
            return resolve({ success });
          });
        } else {
          errors.error = "Shelf already contains movieId = " + movieId;
          console.log(errors.error);
          return reject(errors);
        }
      }
    });
  });
};

module.exports.removeFromShelf = function(shelfId, movieId) {
  return new Promise((resolve, reject) => {
    Shelf.findById(shelfId).then(shelf => {
      if (empty(user)) {
        console.log("Shelf " + shelfId + " not found");
        errors.error = "Shelf not found";
        return reject(errors);
      } else {
        var index = shelf.movies.indexOf(movieId);
        if (index > -1) {
          shelf.movies.splice(index, 1);
          updateShelf(shelfId, shelf).then(success => {
            return resolve({ success });
          });
        } else {
          errors.error = "Shelf does not contain movieId = " + movieId;
          console.log(errors.error);
          return reject(errors);
        }
      }
    });
  });
};

module.exports.getMovieCollection = function(collectionName, page) {
  return new Promise((resolve, reject) => {
    collection = {};
    const callBack = function(err, res) {
      if (!err) {
        return resolve(res);
      }
      console.log(err);
      return reject(err);
    };
    params = { page };
    switch (collectionName) {
      case "top_rated":
        tmdb.miscTopRatedMovies(params, callBack);
        break;
      case "popular":
        tmdb.miscPopularMovies(params, callBack);
        break;
      case "latest":
        tmdb.miscLatestMovies(params, callBack);
        break;
      case "upcoming":
        tmdb.miscUpcomingMovies(params, callBack);
        break;
      case "now_playing":
        tmdb.miscNowPlayingMovies(params, callBack);
        break;
      default:
        errors = { error: collectionName + " is not a valid collection name" };
        console.log(errors);
        return reject(errors);
    }
  });
};
