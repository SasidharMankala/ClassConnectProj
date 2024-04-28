const mongoose = require('mongoose');

// Define schema for the course
const courseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

// Define schema for the professor
const professorSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses_created: [courseSchema] // Embedding the course schema here
});

const Course = mongoose.model('Users', courseSchema);
const Professor = mongoose.model('Users', professorSchema);


module.exports ={Course, Professor}