// universityModel.js
const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: String,
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }],
  courses: []
});

module.exports = mongoose.model('University', universitySchema);
