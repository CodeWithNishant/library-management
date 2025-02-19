const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Add Book
router.post("/add", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Issue Book
router.post("/issue/:bookId", async (req, res) => {
  try {
    const { userId } = req.body; // User who is borrowing the book
    const book = await Book.findById(req.params.bookId);

    if (!book || book.isIssued) {
      return res.status(400).json({ message: "Book not available" });
    }

    const issueDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(issueDate.getDate() + 14); // Default return period = 14 days

    book.isIssued = true;
    book.issuedTo = userId;
    book.issueDate = issueDate;
    book.returnDate = returnDate;

    await book.save();
    res.status(200).json({ message: "Book issued successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Issued Books
router.get("/books/issued", async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find(); // Fetch issued books from DB
    res.json(issuedBooks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Return Book
router.post("/return/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || !book.isIssued) {
      return res.status(400).json({ message: "Book was not issued" });
    }

    const today = new Date();
    let fine = 0;

    if (today > book.returnDate) {
      const overdueDays = Math.ceil(
        (today - book.returnDate) / (1000 * 60 * 60 * 24)
      ); // Convert ms to days
      fine = overdueDays * 5; // ₹5 per overdue day
    }

    book.isIssued = false;
    book.issuedTo = null;
    book.issueDate = null;
    book.returnDate = null;
    book.fine = fine;

    await book.save();
    res.status(200).json({ message: "Book returned successfully", fine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Pay Fine
router.post("/pay-fine", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const issue = await Issue.findOne({ userId, bookId, returned: true });

    if (!issue || issue.fineAmount === 0) {
      return res.status(400).json({ message: "No pending fine for this book" });
    }

    issue.fineAmount = 0; // Mark fine as paid
    await issue.save();

    res.status(200).json({ message: "Fine paid successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
