const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate university names
  },
  threads: [Array], // Reference to Thread model (if applicable)
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Reference to Course model (if applicable)
});

module.exports = mongoose.model('University', universitySchema);
