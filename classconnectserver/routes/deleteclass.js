const express = require('express');
const router = express.Router();
const Course = require('../models/usermodels');
const Thread = require('../models/threadsSchema')

router.delete('/delete-course/:universityName/:professorEmail/:courseId', async (req, res) => {
    const universityName = req.params.universityName;
    const professorEmail = req.params.professorEmail;
    const courseId = req.params.courseId
    const courseData = req.body;
    console.log('hi',universityName,professorEmail,courseId)
    try {
        // console.log(courseData,universityName,professorEmail)
        const university = await Course.findOne({ name: universityName });
        if (!university) {
            throw new Error('University not found');
        }

        const professor = university.users.professors.find(prof => prof.email === professorEmail);
        if (!professor) {
            throw new Error('Professor not found');
        }

        // Find the index of the course to delete
        // console.log(professor.courses_created.courses)
        // console.log(courseId)
        const courseIndex = professor.courses_created.courses.findIndex(course => course.id === courseId);
        // console.log('courseIndex',courseIndex)

        console.log(courseId,courseIndex)
        if (courseIndex === -1) {
            return res.status(400).json({ message: 'Course not Found' });
        }
        // console.log(courseIndex)
        // Delete the course
        // console.log('before',professor)
        professor.courses_created.courses.splice(courseIndex, 1);
        // console.log('after',professor)
        await Course.updateOne({ name: universityName }, { $set: university });

        // thread deletion
        const threadUniv = await Thread.findOne({name: universityName})
        // console.log(threadUniv)
        const threadCourse = threadUniv.courses
        // console.log(threadCourse) 
        const newcourseIndex = threadCourse.findIndex(course => course.id === courseId);
        // console.log(newcourseIndex)
        if(newcourseIndex==-1){
            return
        }
        threadCourse.splice(newcourseIndex,1)
        // console.log(threadUniv)
        await Thread.updateOne({name: universityName},{$set : threadUniv})

        res.status(200).json({message:'Course deleted succesfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } 
});



module.exports = router;