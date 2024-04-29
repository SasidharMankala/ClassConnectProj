const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema');

router.post('/flagthread', async (req, res) => {
    try {
        // console.log('req.body', req.body);
        const selectedCourse = req.body.selectedCourse;
        const univData = await Thread.findOne({ name: req.body.univName });

        if (!univData) {
            return res.status(404).json({ message: "University not found" });
        }

        const university = univData.toObject();
        const courses = university.courses;
        const course = courses.find(course => course.id === selectedCourse.id && course.name === selectedCourse.name);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const thread = course.threads.find(thread => String(thread._id) === req.body.thread_id);

        if (!thread) {
            return res.status(404).json({ message: "Thread not found" });
        }

        // Update the flag
        // console.log(' before thread', thread);
        thread.flagged = true;
        // console.log('after thread', thread);
        // Save the changes back to the database
        univData.markModified('courses');
        // await univData.save();
        await Thread.updateOne(
            { 
              name: req.body.univName,
              'courses.id': selectedCourse.id,
              'courses.name': selectedCourse.name,
              'courses.threads._id': req.body.thread_id
            },
            { $set: { 'courses.$[course].threads.$[thread].flagged': true }},
            { arrayFilters: [{ 'course.id': selectedCourse.id }, { 'thread._id': req.body.thread_id }] }
          );
          
          res.status(200).json({ message: "Thread flagged successfully" });
          
        // await Thread.updateOne({ name: req.body.univName }, { $set: univData });

        // res.status(200).json({ message: "Thread flagged successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
