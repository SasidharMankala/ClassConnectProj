const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/deletethread', async (req, res) => {
    // console.log('req.body', req.body);
    const selectedCourse = req.body.selectedCourse;
    const univData = await Thread.findOne({ name: req.body.univName });

    if (!univData) {
        return res.status(404).json({ message: "University not found" });
    }

    const university = univData.toObject();
    const courses = university.courses;
    const foundCourseIndex = courses.findIndex(course => course.id === selectedCourse.id && course.name === selectedCourse.name);

    if (foundCourseIndex === -1) {
        return res.status(404).json({ message: "Course not found" });
    }

    courses[foundCourseIndex].threads = courses[foundCourseIndex].threads.filter(thread => thread._id.toString() !== req.body.thread_id);

    try {
        await Thread.updateOne({ name: req.body.univName }, { $set: { courses: courses } });
        res.status(200).json({ message: "Thread deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
