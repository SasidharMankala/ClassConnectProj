const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/upvotethread', async (req, res) => {
    console.log('req.body', req.body);
    // const univData = await Thread.find({ name: req.body.univName });
    try {
        // Find the university data
        const univData = await Thread.findOne({ name: req.body.univName });
        if (!univData) {
            return res.status(404).json({ message: "University not found" });
        }

        // Find the course
        const course = univData.courses.find(course => course.id === req.body.selectedCourse.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find the thread
        console.log(course.threads)
        const thread = course.threads.find(thread => String(thread._id) === req.body.thread_id);
        if (!thread) {
            return res.status(404).json({ message: "Thread not found" });
        }

        // Increase the upvotes count by 1
        thread.upvotes += 1;

        // Save the updated data
        await univData.save();

        return res.status(200).json({ message: "Upvote count increased successfully", thread });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }


})


module.exports = router;