const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const AppError = require("./AppError");
const booksRouter = require("./routes/books");
const reviewsRouter = require("./routes/reviews");
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
