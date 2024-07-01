const mongoose = require("mongoose");
const book = require("./Models/Book");

const Book = book;

// const newBook = new Book({
//   title: "The 48 Laws of Power",
//   author: "Robert Greene",
//   numOfPages: 478,
//   synopsis:
//     "In The 48 Laws of Power, Robert Greene asserts that whether you like it or not, you're part of a never-ending game of power. You're either striving for and wielding power, or you're a pawn being played by someone more powerful than you. You choose your role.",
//   imgUrl:
//     "https://exclusivebooks.co.za/cdn/shop/products/9781861972781_0638107b-ca3d-4899-b9b5-3931acc54175.jpg?v=1707640844",
// });

// newBook.save();

const books = [
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    numOfPages: 478,
    synopsis:
      "In The 48 Laws of Power, Robert Greene asserts that whether you like it or not, you're part of a never-ending game of power. You're either striving for and wielding power, or you're a pawn being played by someone more powerful than you. You choose your role.",
    imgUrl:
      "https://exclusivebooks.co.za/cdn/shop/products/9781861972781_0638107b-ca3d-4899-b9b5-3931acc54175.jpg?v=1707640844",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    numOfPages: 320,
    synopsis:
      "Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    imgUrl:
      "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX342_SY445_QL70_ML2_.jpg",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    numOfPages: 464,
    synopsis:
      "In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical—and sometimes devastating—breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.",
    imgUrl: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    numOfPages: 499,
    synopsis:
      "Thinking, Fast and Slow takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    imgUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41w8wPu0e-L._SX322_BO1,204,203,200_.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    numOfPages: 352,
    synopsis:
      "Educated is an account of the struggle for self-invention. It is a tale of fierce family loyalty, and of the grief that comes with severing the closest of ties. With the acute insight that distinguishes all great writers, Westover has crafted a universal coming-of-age story that gets to the heart of what an education is and what it offers.",
    imgUrl: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
  },
];

// Book.insertMany(books);
console.log(Book);
