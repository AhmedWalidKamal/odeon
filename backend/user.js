const User = require("./models/User");
const empty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

// Load validation rules
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");
const validateProfileInput = require("./validation/profile");

module.exports.register = function(username, password, phone) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateRegisterInput({
      username,
      password,
      phone
    });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }

    User.find({ username: username }).then(function(result) {
      if (!empty(result)) {
        errors.error = "Username already exists";
        return reject(errors);
      }

      const newUser = new User({
        username: username,
        password: password,
        phone: phone
      });

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
            return resolve({ success: true });
          });
        });
      });
    });
  });
};

module.exports.login = function(username, password) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateLoginInput({ username, password });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }
    // Find user by Username
    User.findOne({ username }).then(user => {
      if (!user) {
        errors.error = "Username not found";
        return reject(errors); // User not found
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          const payload = {
            id: user._id,
            username: user.username,
            phone: user.phone,
            address: user.address,
            type: user.type,
            cart: user.cart
          }; // Create JWT payload, this gives information about the user

          // Sign token, returned to the frontend, has user info in the payload.
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 86400 }, // time in seconds for the token to be expired and the user needs to login and get a new token.
            (err, token) => {
              return resolve({ success: true, token: "Bearer " + token });
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

module.exports.editUser = function(
  user_id,
  username,
  phone,
  address,
  password,
  confirmPassword
) {
  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateProfileInput({
      username,
      phone,
      address,
      password,
      confirmPassword
    });

    // Check validation
    if (!isValid) {
      return reject(errors);
    }

    // Check for existing username
    User.findOne({ username: username }).then(function(result) {
      if (!empty(result) && result._id != user_id) {
        errors.error = "Username already exists";
        return reject(errors);
      } else {
        // Update user's data
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            User.findOneAndUpdate(
              { _id: user_id },
              {
                username: username,
                phone: phone,
                address: address,
                password: hash
              },
              { new: true }
            ).then(function(user) {
              if (empty(user)) {
                errors.error = "User doesn't exist.";
                return reject(errors);
              }

              // Create new jwt and return it
              const payload = {
                id: user._id,
                username: user.username,
                phone: user.phone,
                address: user.address,
                type: user.type,
                cart: user.cart
              }; // Create JWT payload, this gives information about the user

              // Sign token, returned to the frontend, has user info in the payload.
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 86400 }, // time in seconds for the token to be expired and the user needs to login and get a new token.
                (err, token) => {
                  return resolve({ success: true, token: "Bearer " + token });
                }
              );
            });
          });
        });
      }
    });
  });
};
