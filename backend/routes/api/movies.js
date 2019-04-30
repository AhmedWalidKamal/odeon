const decode = require("jwt-decode");

const express = require("express");
const router = express.Router();
const passport = require("passport");

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
