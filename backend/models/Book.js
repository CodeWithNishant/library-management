const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isIssued: { type: Boolean, default: false }, // Tracks whether the book is issued
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  issueDate: { type: Date, default: null },
  returnDate: { type: Date, default: null },
  fine: { type: Number, default: 0 }, // Fine amount for late return
});

module.exports = mongoose.model("Book", bookSchema);
