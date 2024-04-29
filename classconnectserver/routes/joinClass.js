const express = require('express');
const router = express.Router();
// ... other imports
// const University = require('../models/university'); // Assuming individual model export
const Thread = require('../models/threadsSchema')
const Users = require('../models/usermodels');

router.post('/joinclass',async (req,res)=>{
    // console.log('req.body',req.body)
    univName = req.body.univName
    courseObject = req.body.courseObject
    email = req.body.email
    role = 'student'
    // console.log(univName,email,courseObject)
    const thread = await Users.findOne({name:univName})
    // console.log('thread',thread.users.students)
  
    const user = thread.users.students.find(user => user.email === req.body.email)
    // console.log('user',user)
    const temp_course = user.courses_enrolled
    function isCoursePresent(courses, courseObject) {
        for (const course of courses) {
          if (course.id === courseObject.id && course.name === courseObject.name) {
            return true;
          }
        } 
        return false; 
      }
    //   console.log(isCoursePresent(temp_course.courses, courseObject))
     try {
        if (!isCoursePresent(temp_course.courses, courseObject)) {
            temp_course.courses.push(courseObject);
            console.log('temp_course',temp_course)
            await Users.updateOne({name:univName},thread)
            res.status(200).json({message:"Joined the class successfully"});
     
          } else {
            console.log("Course object already exists in the array");
            // res.status(400).json({ message: `You are already enrolled in this course` });
          }
     } catch (error) {
        res.send('Error' + error)
     }
            

    

})

module.exports = router;