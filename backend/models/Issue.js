const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, required: true, default: Date.now },
  returnDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
  fineAmount: { type: Number, default: 0 }, // Fine field added
});

module.exports = mongoose.model("Issue", issueSchema);
