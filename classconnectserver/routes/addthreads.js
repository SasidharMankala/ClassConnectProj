const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/addthread',async(req,res)=>{
    
    try {
        const name = req.body.univName
        console.log('req.body',req.body)
        const courseId = req.body.selectedCourse
        const univ = await Thread.findOne({name})
  
        const courses = univ.courses

        const foundCourse = courses.find(course => course.id === courseId.id && course.name === courseId.name);


        const threads = foundCourse.threads
        const generateRandomNumber = () => {
           
            const randomNumber = Math.floor(Math.random() * 900000) + 100000;
            return randomNumber;
          };
          
         
          const id = generateRandomNumber();
          
        const pushData = {
            id:id,
            title : req.body.title,
            description : req.body.description,
            upvotes : 0,
            flagged :false,
            posted_user : req.body.useremail,
            tags : req.body.tagsArray.toString(),
            replies : []
        }
        threads.push(pushData)
        // console.log(pushData)
        await Thread.updateOne({name:name},{$set:univ})
        res.status(200).json({message:"Added the thread successfully"});

    } catch (error) {
        console.log('error adding thread',error)
        res.status(500).json({ message: 'An error occured while adding thread' });

    }
})

module.exports = router