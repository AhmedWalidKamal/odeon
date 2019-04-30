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
    if (
      hasDuplicates(shelf.movies, val => {
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
  const { errors, isValid } = validateReg(data);

  console.log(data);

  shelves = empty(data.shelves) ? [] : data.shelves;
  ratings = empty(data.ratings) ? [] : data.ratings;

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
