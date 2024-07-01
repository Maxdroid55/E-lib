const express = require("express");
const mongoose = require("mongoose");
const Book = require("./Models/Book");
const methodOverride = require("method-override");
const path = require("path");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  //console.log(books);
  res.render("books", { books });
});

app.get("/books/new", (req, res) => {
  res.render("new");
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const foundBook = await Book.findById(id);
  //   console.log(foundBook);
  res.render("details", { book: foundBook });
});

app.get("/books/:id/edit", async (req, res) => {
  const { id } = req.params;
  const foundBook = await Book.findById(id);
  res.render("edit", { book: foundBook });
});

app.post("/books", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.redirect("/books");
});

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  const foundBook = await Book.findByIdAndUpdate(id, req.body);
  res.redirect(`/books/${id}`);
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  const foundBook = await Book.findByIdAndDelete(id);
  res.redirect("/books");
});

app.get("*", (req, res) => {
  res.send("404: Not found");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
