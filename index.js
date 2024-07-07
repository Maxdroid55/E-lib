const express = require("express");
const mongoose = require("mongoose");
const Book = require("./Models/Book");
const Review = require("./Models/Review");
const methodOverride = require("method-override");
const path = require("path");
const categories = require("./categories");
const ejsMate = require("ejs-mate");
const capitalizeFirstLetter = require("./utils");
const asyncWrapper = require("./utils");
const AppError = require("./AppError");
const { joiBookSchema, joiReviewSchema } = require("./schemas");
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

const validateBook = (req, res, next) => {
  const { error } = joiBookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { review } = req.body;
  const { error } = joiReviewSchema.validate(review);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

// books routes
app.get(
  "/books",
  asyncWrapper(async (req, res) => {
    if ("category" in req.query) {
      const books = await Book.find({ category: req.query.category });
      res.render("books", {
        books,
        categories,
        cat: capitalizeFirstLetter(req.query.category),
      });
    } else {
      const books = await Book.find();
      res.render("books/index", { books, categories, cat: "All" });
    }
  })
);

app.get("/books/new", (req, res) => {
  res.render("books/new", { categories });
});

app.get(
  "/books/:id",
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const foundBook = await Book.findById(id).populate("reviews");
    res.render("books/details", { book: foundBook });
  })
);

app.get(
  "/books/:id/edit",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const foundBook = await Book.findById(id);
    res.render("books/edit", { book: foundBook, categories });
  })
);

app.post(
  "/books",
  validateBook,
  asyncWrapper(async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect("/books");
  })
);

app.patch(
  "/books/:id",
  validateBook,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const foundBook = await Book.findByIdAndUpdate(id, req.body);
    res.redirect(`/books/${id}`);
  })
);

app.delete(
  "/books/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
  })
);

// review routes
app.post(
  "/books/:id/reviews",
  validateReview,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;

    const book = await Book.findById(id);
    const newReview = new Review(review);

    await newReview.save();
    book.reviews.push(newReview);
    await book.save();

    res.redirect(`/books/${id}`);
  })
);

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
