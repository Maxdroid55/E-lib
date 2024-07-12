const express = require("express");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const flash = require("connect-flash");
const User = require("./Models/user");
const passport = require("passport");
const passportLocal = require("passport-local");

const AppError = require("./AppError");

const booksRouter = require("./routes/books");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");

const app = express();
const port = 3000;

// Connect to database
mongoose
  .connect("mongodb://127.0.0.1/booksDB")
  .then(() => console.log("Connected to database"))
  .catch((e) => {
    console.log("Failed to connect to database");
    console.log(e);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: "Dontshowthistoanyone",
  resave: false,
  saveUninitialized: true,
  expires: Date.now() + 604800000,
  maxAge: 604800000,
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", usersRouter);
app.use("/books", booksRouter);
app.use("/books/:id/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new AppError("page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong.";
  res.status(status).render("error", { err });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
