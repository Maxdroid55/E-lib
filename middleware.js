module.exports = requireLogin(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash("error");
        return res.redirect("/login")
    }
    next();
}