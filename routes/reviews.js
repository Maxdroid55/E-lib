const express = require("express");
const router = express.Router({ mergeParams: true });

const { asyncWrapper } = require("../utils");
const Book = require("../Models/Book");
const Review = require("../Models/Review");
const { joiReviewSchema } = require("../schemas");
const flash = require("connect-flash");
const { requireLogin } = require("../middleware");

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

router.post(
  "/",
  requireLogin,
  validateReview,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;

    const book = await Book.findById(id);
    const newReview = new Review(review);

    await newReview.save();
    book.reviews.push(newReview);
    await book.save();

    req.flash("success", "Successfuly added review.");

    res.redirect(`/books/${id}`);
  })
);
router.delete(
  "/:reviewId",
  requireLogin,
  asyncWrapper(async (req, res) => {
    const { id, reviewId } = req.params;
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfuly delete review.");
    res.redirect(`/books/${id}`);
  })
);

module.exports = router;
