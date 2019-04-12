const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Checking with isEmpty if data.username is empty, and converting it to a string, because Validator.isEmpty only expects a string not an object.
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Username field validations
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 3, max: 15 })) {
    errors.username = "Username must be between 3 and 15 characters!";
  }

  // email field validations
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email entered is invalid";
  }

  // Password field validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // // Password2 field validations
  // if (!Validator.equals(data.password, data.password2)) {
  //   errors.password2 = "Passwords must match";
  // }

  if (!isEmpty(errors)) {
    errors.error = "Registration failed";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
