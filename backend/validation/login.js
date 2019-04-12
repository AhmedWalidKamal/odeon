const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Username field validations
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 3, max: 15 })) {
    errors.username = "Username must be between 3 and 15 characters!";
  }

  // Password field validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    errors.error = "Login failed";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
