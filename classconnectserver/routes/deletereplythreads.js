const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/deletereplythread', async (req, res) => {
    // console.log('req.body', req.body);
    const univData = await Thread.findOne({ name: req.body.univName });
    if (!univData) {
        return res.status(404).json({ message: "University not found" });
    }

    const university = univData.toObject();
    const courses = university.courses;

    // Find the course
    const selectedCourse = courses.find(course => course.id === req.body.selectedCourse.id && course.name === req.body.selectedCourse.name);
    if (!selectedCourse) {
        return res.status(404).json({ message: "Course not found" });
    }

    // Find the thread
    const thread = selectedCourse.threads.find(thread => thread._id.toString() === req.body.thread_id);
    if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
    }

    // Find and remove the reply
    const replyIndex = thread.replies.findIndex(reply => reply._id.toString() === req.body.reply_id);
    if (replyIndex === -1) {
        return res.status(404).json({ message: "Reply not found" });
    }
    thread.replies.splice(replyIndex, 1);

    try {
        // await univData.save();
        await Thread.updateOne({ name: req.body.univName }, { $set: { courses: courses } });
        res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
