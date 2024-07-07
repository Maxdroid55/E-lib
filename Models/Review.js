const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
