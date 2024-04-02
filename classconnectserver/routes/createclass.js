const express = require('express');
const router = express.Router();
const Course = require('../models/usermodels');
const Thread = require('../models/threadsSchema')

// Endpoint to add a course
router.post('/add-course/:universityName/:professorEmail', async (req, res) => {
    const universityName = req.params.universityName;
    const professorEmail = req.params.professorEmail;
    const courseData = req.body;

    try {

        // Add the course to users
        const university = await Course.findOne({ name: universityName });
        if (!university) {
            throw new Error('University not found');
        }

        const professor = university.users.professors.find(prof => prof.email === professorEmail);
        if (!professor) {
            throw new Error('Professor not found');
        }

        // Check if the course already exists
        const exists = professor.courses_created.courses;
        console.log(exists)
        console.log()
        const isDuplicate = exists.some(data => data.courseId === courseData.courseId && data.courseName === courseData.courseName);
        console.log(isDuplicate)
        if (isDuplicate) {
            return res.status(400).json({ message: 'Course already exists' });
        }
        professor.courses_created.courses.push(courseData);
        // console.log('before',university)
        await Course.updateOne({ name: universityName }, { $set: university });
        // console.log(university)

        //Add course to threads
        const threadUniv = await Thread.findOne({name: universityName})
        // console.log(threadUniv)
        const threadCourse = threadUniv.courses
        // console.log(threadCourse) 

        const pushData = {
            'id': courseData.courseId,
            'name': courseData.courseName,
            'threads':[]
        } 
        const existsin = threadCourse
        // console.log(existsin)
        const alreadyin = existsin.some(data => data.id === courseData.courseId && data.name === courseData.courseName);
        // console.log(pushData)
        if(alreadyin){
            return
        }
        // console.log(alreadyin)
        threadCourse.push(pushData)
        // console.log('threadUniv',threadCourse)
        await Thread.updateOne({name:universityName},{$set:threadUniv})
 
        res.status(200).json({ message: 'Course added successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
