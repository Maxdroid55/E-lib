const mongoose = require("mongoose");
const categories = require("../categories");

const bookSchema = new mongoose.Schema({
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
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
