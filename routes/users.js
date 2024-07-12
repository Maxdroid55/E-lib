const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const flash = require("connect-flash");
const { asyncWrapper } = require("../utils");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post(
  "/register",
  asyncWrapper(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.flash("success", `Welcome to e-Lib, ${username}!`);
      res.redirect("/books");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Successfully logged in");
    res.redirect("/books");
  }
);

module.exports = router;
