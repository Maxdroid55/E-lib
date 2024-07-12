const express = require("express");
const router = express.Router({ mergeParams: true });

const Book = require("../Models/Book");
const categories = require("../categories");
const { asyncWrapper, capitalizeFirstLetter } = require("../utils");
const AppError = require("../AppError");
const { joiBookSchema } = require("../schemas");
const { requireLogin } = require("../middleware");

const validateBook = (req, res, next) => {
  const { error } = joiBookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
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

router.get("/new", requireLogin, (req, res) => {
  res.render("books/new", { categories });
});

router.get(
  "/:id",
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const foundBook = await Book.findById(id).populate("reviews");
    if (!foundBook) {
      req.flash("error", "Book not found");
      return res.redirect("/books");
    }
    res.render("books/details", { book: foundBook });
  })
);

router.get(
  "/:id/edit",
  requireLogin,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const foundBook = await Book.findById(id);
    if (!foundBook) {
      req.flash("error", "Book not found");
      return res.redirect("/books");
    }
    res.render("books/edit", { book: foundBook, categories });
  })
);

router.post(
  "/",
  requireLogin,
  validateBook,
  asyncWrapper(async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    req.flash("success", "Successfuly added new book.");
    res.redirect("/books");
  })
);

router.patch(
  "/:id",
  requireLogin,
  validateBook,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const foundBook = await Book.findByIdAndUpdate(id, req.body);
    req.flash("success", "Successfuly edited book.");
    res.redirect(`/books/${id}`);
  })
);

router.delete(
  "/:id",
  requireLogin,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    req.flash("success", "Successfuly deleted book.");
    res.redirect("/books");
  })
);

module.exports = router;
