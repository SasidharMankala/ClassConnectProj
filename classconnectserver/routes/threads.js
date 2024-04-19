// threads.js
const express = require('express');
const router = express.Router();
const Threads = require('../models/threadsSchema');

// Route to get all threads
router.get('/threads', async (req, res) => {
  try {
    const threads = await Threads.find();
    res.json(threads);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
