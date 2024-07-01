const mongoose = require("mongoose");

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
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
