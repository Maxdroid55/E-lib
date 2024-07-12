const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const flash = require("connect-flash");
const { asyncWrapper } = require("../utils");
const passport = require("passport");
const { requireLogin } = require("../middleware");

let redirectUrl;

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post(
  "/register",
  asyncWrapper(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", `Welcome to e-Lib, ${username}!`);
        res.redirect("/books");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  redirectUrl = req.session.returnTo || "/Books";
  delete req.session.returnTo;
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
    res.redirect(redirectUrl);
  }
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  req.flash("success", "Successfully logged out");
  res.redirect("/");
});

module.exports = router;
