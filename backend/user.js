const User = require("./models/User");
const Profile = require("./models/Profile");
const empty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

// Load validation rules
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");
const validateProfileInput = require("./validation/profile");

module.exports.register = function(username, email, password) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateRegisterInput({
      username,
      email,
      password
    });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }

    User.findOne({
      $or: [
        {
          username: username
        },
        {
          email: email
        }
      ]
    }).then(function(result) {
      if (!empty(result)) {
        console.log(result);
        if (result.username === username) {
          errors.username = "Username already exists";
        }
        if (result.email === email) {
          errors.email = "Email already exists";
        }
        console.log(errors);
        return reject(errors);
      }

      const newUser = new User({
        username: username,
        email: email,
        password: password
      });
      const newProfile = new Profile({
        user: newUser._id
      });
      newUser.profile = newProfile._id;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.save().then(function() {
            if (newUser.isNew) {
              errors.error = "Registration error";
              return reject(errors);
            }
            console.log("User: " + newUser.username + " Signed Up.");
            return resolve({
              success: true
            });
          });
          newProfile.save().then(function() {
            if (newProfile.isNew) {
              errors.error = "Registration error";
              return reject(errors);
            }
            console.log("Profile: " + newUser.username + " Created.");
            return resolve({
              success: true
            });
          });
        });
      });
    });
  });
};

module.exports.login = function(email, password) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateLoginInput({
      email,
      password
    });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }
    // Find user by Username
    User.findOne({
      email
    })
      .populate("profile", ["displayName", "avatar"])
      .then(user => {
        if (!user) {
          errors.error = "User not found";
          return reject(errors); // User not found
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // user matched
            console.log(user);
            const payload = {
              id: user._id,
              profileId: user.profile._id,
              username: user.username,
              email: user.email,
              displayName: user.displayName,
              avatar: user.avatar
            }; // Create JWT payload, this gives information about the user

            // Sign token, returned to the frontend, has user info in the payload.
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 86400
              }, // time in seconds for the token to be expired and the user needs to login and get a new token.
              (err, token) => {
                return resolve({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.error = "Incorrect password";
            return reject(errors);
          }
        });
      });
  });
};

module.exports.getProfile = function(userId) {
  return new Promise((resolve, reject) => {
    // Check for existing username
    const errors = {};
    Profile.findOne({
      user: userId
    }).then(function(profile) {
      if (empty(profile)) {
        errors.error = "Profile does not exist";
        return reject(errors);
      } else {
        return resolve(profile);
      }
    });
  });
};

module.exports.editProfile = function(
  profileId,
  displayName,
  avatar,
  social,
  location,
  bio
) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateProfileInput({
      displayName,
      avatar,
      social,
      location,
      bio
    });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }

    // Check for existing username
    Profile.findByIdAndUpdate(profileId, {
      displayName,
      avatar,
      social,
      location,
      bio
    }).then(function(profile) {
      if (empty(profile)) {
        console.log("Profile " + profileId + " not found");
        errors.error = "Profile not found";
        return reject(errors);
      } else {
        return resolve({
          success: true
        });
      }
    });
  });
};
