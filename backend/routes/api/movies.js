const decode = require("jwt-decode");
var mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
const passport = require("passport");

// User functions
const users = require("../../user");
// Movies functions
const moviesUtil = require("../../moviesUtil");

keys = require("../../config/keys");

router.get("/search", (req, res) => {
  const query = req.query.query;
  const page = req.query.page || 1;
  console.log("Searching for query=" + query + ", page=" + page);
  moviesUtil
    .searchMovies(query, page)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  moviesUtil
    .getMovie(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get movies given shelf id
router.get("/shelf/ids/:id", (req, res) => {
  const shelfId = req.params.id;
  moviesUtil
    .getShelfMoviesIds(shelfId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get movies given shelf id
router.get("/shelf/:id", (req, res) => {
  const shelfId = req.params.id;
  moviesUtil
    .getShelfMovies(shelfId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
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
    const movieId = parseInt(req.params.id);
    const newRating = parseFloat(req.body.rating);

    users.getUser(info.id).then(user => {
      user.ratings = moviesUtil.updateRating(user.ratings, movieId, newRating);
      errors = {};
      users
        .updateUser(info.id, user)
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
  }
);

router.put(
  "/add-to-shelf",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    console.log("test");
    const info = decode(req.headers.authorization);
    const { movieId, shelfId } = req.body;

    errors = {};

    users.getUser(info.id).then(user => {
      if (!user.shelves.map(shelf => shelf._id.toString()).includes(shelfId)) {
        errors.shelf = "Requested shelf id does not belong to user";
        console.log(errors);
        res.status(400).json(errors);
      } else {
        moviesUtil
          .addToShelf(shelfId, parseInt(movieId))
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

router.delete(
  "/remove-from-shelf",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const info = decode(req.headers.authorization);
    const movieId = req.body.movieId;
    const shelfId = req.body.shelfId;

    errors = {};
    users.getUser(info.id).then(user => {
      if (!user.shelves.map(shelf => shelf._id.toString()).includes(shelfId)) {
        errors.shelf = "Requested shelf id does not belong to user";
        console.log(errors);
        res.status(400).json(errors);
      } else {
        moviesUtil
          .removeFromShelf(shelfId, parseInt(movieId))
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

router.get("/collection/:name", (req, res) => {
  const collectionName = req.params.name;
  const page = req.body.page || 1;
  moviesUtil
    .getMovieCollection(collectionName, page)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
