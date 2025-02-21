const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
