const Validator = require("validator");
const isEmpty = require("is-empty");

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

const validateShelf = function(shelf) {
  if (
    hasDuplicates(shelf, val => {
      return val.toString();
    })
  ) {
    return false;
  }
  return true;
};

module.exports = function validateShelfUpdate(shelf, movieId, add) {
  let errors = {};

  if (add == null) {
    errors.operation = "Unsupported operation " + add;
  } else {
    // shelf validations
    if (!shelf && shelf !== []) {
      errors.shelf = "Shelf is required";
    } else if (!validateShelf(shelf)) {
      errors.shelf = "Shelf contains duplicates";
    }

    // movieId field validations
    if (!movieId && movieId !== 0) {
      errors.movie = "movieId is required";
    } else if (!Validator.isInt(movieId.toString(), { min: 0 })) {
      errors.movie = "movieId can't be less than 0";
    }

    if (movieId && shelf) {
      const exists = shelf.includes(movieId);

      if (exists && add) {
        errors.add = "Shelf already contains movieId = " + movieId;
      }

      if (!exists && !add) {
        errors.remove = "Shelf does not contain movieId = " + movieId;
      }
    }
  }

  if (!isEmpty(errors)) {
    errors.error = "Failed to modify shelf";
  }

  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
