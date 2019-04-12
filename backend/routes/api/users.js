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
    .register(req.body.username, req.body.password, req.body.phone)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// @route   POST api/users/login
// @desc    Login user -> Returns jwt if authorization successful
// @access  Public
router.post("/login", (req, res) => {
  users
    .login(req.body.username, req.body.password)
    .then(data => {
      console.log("user: " + data.username + " Signed in successfully.");
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // The request is first sent to be authenticated in /config/passport, then if verified, the user is returned in done and can be accessed by req.user
    res.json({
      id: req.user.id,
      username: req.user.username,
      phone: req.user.phone,
      address: req.user.address,
      cart: req.user.cart,
      type: req.user.type
    });
  }
);

// @route   POST /api/users/change-user-role/:id
// @desc    Changes user's role from admin to user or vice verse -- Admin functionality only
// @access  Private
router.post(
  "/change-user-role/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if this user is an admin
    if (req.user.type !== "admin") {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
    users
      .changeUserRole(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  }
);

// @route   PUT /api/users/edit
// @desc    Edits user's information stored in database -> Returns new jwt
// @access  Private
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    users
      .editUser(
        req.user.id,
        req.body.username,
        req.body.phone,
        req.body.address,
        req.body.password,
        req.body.confirmPassword
      )
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  }
);

// @route   DELETE /api/users/:id
// @desc    Deletes user given id -- Admin functionality only
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if this user is an admin
    if (req.user.type !== "admin") {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
    console.log(`Received user id: ${req.params.id}`);
    users
      .removeUser(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET /api/users
// @desc    Returns all users stored in database -- Admin functionality only
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if this user is an admin
    if (req.user.type !== "admin") {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
    users
      .getUsers()
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err));
  }
);

// TODO
router.get("/addToCart", (req, res) => {
  users
    .addToCart(req.body.user, req.body.productId, req.body.quantity)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// TODO
router.post("/removeFromCart", (req, res) => {
  users
    .removeFromCart(req.body.user, req.body.itemId)
    .then(data => res.json(data))
    .catch(err => err.status(400).json(err));
});

module.exports = router;
