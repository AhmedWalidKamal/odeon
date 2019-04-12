const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data)) {
    errors.error = "Login failed";
    return {
      errors,
      isValid: false
    };
  }

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // email field validations
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email entered is invalid";
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
