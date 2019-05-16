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
  const query = req.body.query;
  const page = req.body.page || 1;
  console.log("Searching for query=" + query + ", page=" + page);
  moviesUtil
    .searchMovies(query, page)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  moviesUtil
    .getMovie(id)
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
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
      console.log(err);
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
    const movieId = parseInt(req.params.id);
    const newRating = parseFloat(req.body.rating);
    console.log("New Rating:");
    console.log(newRating);
    console.log("token info:");
    console.log(info);
    users.getUser(info.id).then(user => {
      user.ratings = moviesUtil.updateRating(user.ratings, movieId, newRating);
      errors = {};
      users
        .updateUser(info.id, user)
        .then(data => {
          console.log("new ratings");

          console.log(data);
          res.json(data);
        })
        .catch(err => {
          console.log(err);
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
    const info = decode(req.headers.authorization);
    const { movieId, shelfId } = req.body;

    console.log(`AddMovie(ShelfId=${shelfId}, MovieId=${movieId})`);
    console.log("token info:");
    console.log(info);

    errors = {};

    users.getUser(info.id).then(user => {
      if (!user.shelves.map(id => id.toString()).includes(shelfId)) {
        errors.shelf = "Requested shelf id does not belong to user";
        res.status(400).json(errors);
      } else {
        moviesUtil
          .addToShelf(shelfId, parseInt(movieId))
          .then(data => {
            console.log(data);
            res.json(data);
          })
          .catch(err => {
            console.log(err);
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
    console.log(
      "RemoveMovie(ShelfId=" + shelfId + ", MovieId=" + movieId + ")"
    );
    console.log("token info:");
    console.log(info);
    errors = {};
    users.getUser(info.id).then(user => {
      if (!user.shelves.map(shelf => shelf.toString()).includes(shelfId)) {
        errors.shelf = "Requested shelf id does not belong to user";
        res.status(400).json(errors);
      } else {
        moviesUtil
          .removeFromShelf(shelfId, parseInt(movieId))
          .then(data => {
            console.log(data);
            res.json(data);
          })
          .catch(err => {
            console.log(err);
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
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
