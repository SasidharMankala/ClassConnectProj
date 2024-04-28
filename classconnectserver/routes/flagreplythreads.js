const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/flagreplythread', async (req, res) => {
    console.log('req.body', req.body);
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
    const reply = thread.replies.find(reply => reply._id.toString() === req.body.reply_id);
    console.log('reply121221', reply);
    reply.flagged = true;
    console.log('replyydajkaskjas', reply);
    await Thread.updateOne(
        {
            name: req.body.univName,
            'courses.threads._id': req.body.thread_id,
            'courses.threads.replies._id': req.body.reply_id
        },
        {
            $set: { 'courses.$[course].threads.$[thread].replies.$[reply].flagged': true }
        },
        {
            arrayFilters: [
                { 'course.id': { $exists: true } },
                { 'thread._id': req.body.thread_id },
                { 'reply._id': req.body.reply_id }
            ]
        }
    );

    // await univData.save();

    
})

module.exports = router;