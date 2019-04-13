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

  if (isEmpty(data)) {
    errors.error = "Failed to edit profile";
    return {
      errors,
      isValid: false
    };
  }

  data.social = !isEmpty(data.social) ? data.social : {};

  console.log(data);

  data.displayName = !isEmpty(data.displayName) ? data.displayName : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";
  const twitter = !isEmpty(data.social.twitter) ? data.social.twitter : "";
  const facebook = !isEmpty(data.social.facebook) ? data.social.facebook : "";
  const website = !isEmpty(data.social.website) ? data.social.website : "";

  if (!isEmpty(data.bio) && !Validator.isLength(data.bio, {
      min: 0,
      max: 100
    })) {
    errors.bio = "Bio should be less than 100 characters";
  }

  if (!isEmpty(data.displayName) && !Validator.isLength(data.displayName, {
      min: 3,
      max: 100
    })) {
    errors.displayName = "Display name should be more than 3 characters and less than 100 characters";
  }

  if (!isEmpty(data.avatar) && !Validator.isURL(data.avatar)) {
    errors.avatar = "Invalid avatar URL";
  }

  if (!isEmpty(twitter) && !Validator.isURL(twitter)) {
    errors.twitter = "Invalid twitter URL";
  }

  if (!isEmpty(facebook) && !Validator.isURL(facebook)) {
    errors.facebook = "Invalid facebook URL";
  }

  if (!isEmpty(website) && !Validator.isURL(website)) {
    errors.website = "Invalid website URL";
  }

  if (!isEmpty(errors)) {
    errors.error = "Failed to edit profile";
  }

  console.log(errors)

  return {
    errors,
    isValid: isEmpty(errors)
  };
};