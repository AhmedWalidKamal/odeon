const decode = require("jwt-decode");

const express = require("express");
const router = express.Router();
const passport = require("passport");

// User functions
const users = require("../../user");
// Movies functions
const moviesUtil = require("../../moviesUtil");

keys = require("../../config/keys");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  moviesUtil
    .getMovie(id)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put(
  "/rate/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const info = decode(req.headers.authorization);
    const movieId = req.params.id;
    const newRating = req.body.rating;
    console.log("New Rating:");
    console.log(newRating);
    console.log("token info:");
    console.log(info);
    const user = users.getUser(info.id);
    user.ratings = moviesUtil.updateRating(user.ratings, movieId, newRating);
    errors = {};
    users
      .editUser(info.id, user)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

module.exports = router;
