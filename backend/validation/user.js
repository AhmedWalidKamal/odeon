const Validator = require("validator");
const isEmpty = require("is-empty");

const validateReg = require("./register");

const hasDuplicates = function(array, getStringValue) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = getStringValue(array[i]);
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
};

const validateShelves = function(shelves) {
  shelves.forEach(shelf => {
    const movies = isEmpty(shelf.movies) ? [] : shelf.movies;
    if (
      hasDuplicates(movies, val => {
        return val.toString();
      })
    ) {
      return false;
    }
  });
  return true;
};

const validateRatings = function(ratings) {
  if (
    hasDuplicates(ratings, val => {
      return val.movieId.toString();
    })
  ) {
    return false;
  }
  for (var i = 0; i < ratings.length; i++) {
    if (ratings[i].rating < 0 || ratings[i].rating > 10) {
      return false;
    }
  }
  return true;
};

module.exports = function validateUserUpdate(data) {
  let errors = {};

  if (isEmpty(data)) {
    errors.error = "Failed to edit user";
    return {
      errors,
      isValid: false
    };
  }

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  // Username field validations
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (
    !Validator.isLength(data.username, {
      min: 3,
      max: 15
    })
  ) {
    errors.username = "Username must be between 3 and 15 characters!";
  }

  // email field validations
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email entered is invalid";
  }

  console.log(data);

  shelves = isEmpty(data.shelves) ? [] : data.shelves;
  ratings = isEmpty(data.ratings) ? [] : data.ratings;

  if (!validateShelves(shelves)) {
    errors.shelves = "Shelves contain duplicates";
  }

  if (!validateRatings(ratings)) {
    errors.ratings = "Ratings contain duplicates";
  }

  if (!isEmpty(errors)) {
    errors.error = "Failed to edit user";
  }

  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
