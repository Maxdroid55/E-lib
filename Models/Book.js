const mongoose = require("mongoose");
const categories = require("../categories");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: "Unknown",
  },
  numOfPages: {
    type: Number,
    default: 0,
  },
  synopsis: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "none",
    enum: categories,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Review",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
