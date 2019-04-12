const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  console.log(data);

  // Username field validations
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 3, max: 15 })) {
    errors.username = "Username must be between 3 and 15 characters!";
  }

  // Phone field validations
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  } else if (!Validator.isMobilePhone(data.phone, "ar-EG")) {
    errors.phone = "Phone entered is invalid";
  }

  // Address field validations
  if (!Validator.isLength(data.address, { min: 0, max: 50 })) {
    errors.address = "Address must be less than 50 characters!";
  }

  // Password field validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // confirmPassword field validations
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  if (!isEmpty(errors)) {
    errors.error = "Failed to update profile";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
