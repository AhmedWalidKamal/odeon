const decode = require("jwt-decode");

const express = require("express");
const router = express.Router();
const passport = require("passport");

// User functions
const users = require("../../user");

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
  console.log(req.body);

  users
    .register(req.body.username, req.body.email, req.body.password)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// @route   POST api/users/login
// @desc    Login user -> Returns jwt if authorization successful
// @access  Public
router.post("/login", (req, res) => {
  users
    .login(req.body.email, req.body.password)
    .then(data => {
      console.log("user: " + data.email + " Signed in successfully.");
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/profile", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    const { id } = req.body;
    users.getProfile(id).then(data => {
      console.log(data);
      res.json(data);
    }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
})

router.put("/edit-profile", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const info = decode(req.headers.authorization);
    console.log(info);
    const { _id, displayName, avatar, social, location, bio } = req.body.profile;
    errors = {};
    if (info.profileId !== _id) {
      errors.profile = "Profile id is different from user's profile id";
      req.status(400).json(errors);
    } else {
      users.editProfile(_id, displayName, avatar, social, location, bio).then(data => {
        console.log(data);
        res.json(data);
      }).catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    }
})

module.exports = router;
