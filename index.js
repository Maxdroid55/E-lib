const express = require("express");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", (req, res) => {
  res.send("All books");
});

app.get("*", (req, res) => {
  res.send("404: Not found");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
