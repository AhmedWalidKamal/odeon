const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  /*
  displayName,
      avatar,
      social,
      location,
      bio
  */
  data.social = !isEmpty(data.social) ? data.social : {};

  const twitter = !isEmpty(data.twitter) ? data.twitter : "";
  const facebook = !isEmpty(data.facebook) ? data.facebook : "";
  const website = !isEmpty(data.website) ? data.website : "";

  if (!Validator.isEmpty(twitter) && !Validator.isURL(twitter)) {
    errors.twitter = "Invalid twitter URL";
  }

  if (!Validator.isEmpty(facebook) && !Validator.isURL(facebook)) {
    errors.facebook = "Invalid facebook URL";
  }

  if (!Validator.isEmpty(website) && !Validator.isURL(website)) {
    errors.website = "Invalid website URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
