module.exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must log in first.");
    return res.redirect("/login");
  }
  next();
};
