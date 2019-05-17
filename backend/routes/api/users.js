const decode = require("jwt-decode");

const express = require("express");
const router = express.Router();
const passport = require("passport");

// User functions
const users = require("../../user");
const moviesUtil = require("../../moviesUtil");

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
  console.log(req.body);

  users
    .register(req.body.username, req.body.email, req.body.password)
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// @route   POST api/users/login
// @desc    Login user -> Returns jwt if authorization successful
// @access  Public
router.post("/login", (req, res) => {
  users
    .login(req.body.email, req.body.password)
    .then(data => {
      console.log(`${req.body.email} signed in successfully.`);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get(
  "/profile/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const id = req.params.id;
    users
      .getProfile(id)
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

router.put(
  "/edit-profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const info = decode(req.headers.authorization);
    console.log("New Profile:");
    console.log(req.body.profile);
    console.log("token info:");
    console.log(info);
    const {
      _id,
      displayName,
      avatar,
      social,
      location,
      bio
    } = req.body.profile;
    errors = {};
    if (info.profileId !== _id) {
      errors.profile = "Profile id is different from user's profile id";
      res.status(400).json(errors);
    } else {
      users
        .editProfile(_id, displayName, avatar, social, location, bio)
        .then(data => {
          console.log(data);
          res.json(data);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  }
);

router.get("/shelves/:id", (req, res) => {
  const id = req.params.id;
  users
    .getUser(id)
    .then(data => {
      console.log(data);
      res.json(data.shelves);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/ratings/:id", (req, res) => {
  const id = req.params.id;
  users
    .getUser(id)
    .then(data => {
      console.log(data);
      res.json(data.ratings);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/statistics/:id", (req, res) => {
  const id = req.params.id;
  const metrics = {};
  users
    .getUser(id)
    .then(user => {
      const shelves = user.shelves;
      const ratings = user.ratings;
      metrics.countMoviesPerRating = moviesUtil.countMoviesPerRating(ratings);
      const index = shelves
        .map(shelf => shelf.name.toLowerCase())
        .indexOf("watched");
      if (index > -1) {
        shelf = shelves[index];
        metrics.countMoviesPerMonth = moviesUtil.countMoviesPerMonth(shelf);
        moviesUtil
          .getMovies(shelf.movies.map(movie => movie.movieId))
          .then(movies => {
            metrics.countMoviesPerGenre = moviesUtil.countMoviesPerGenre(
              movies
            );

            console.log(metrics);
            res.json(metrics);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
