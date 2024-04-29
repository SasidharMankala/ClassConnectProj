const express = require('express');
const router = express.Router();

const Thread = require('../models/threadsSchema')

router.post('/addreply', async (req, res) => {
    // console.log(req.body)
    pushData = req.body.pushData
    // console.log('pushData', pushData)
    const threadsData = await Thread.find()
    const university = threadsData.find(univ => univ.name === pushData.univName);
    // console.log('university', university)

    if (university) {
        // Find the course in the university's courses array
        if(pushData.course){
            const course = university.courses.find(course => course.id === pushData.course.id && course.name === pushData.course.name);
            // console.log('coursess', course) 

            if (course) {
                // Find the thread in the course's threads array
                const { ObjectId } = require('bson'); 
                const threadId = new ObjectId(pushData.thread_id);
                const thread = course.threads.find(thread => thread._id.equals(threadId));
                // console.log('before thread', thread)
        
                if (thread) {
                    // Push the text into the replies of the thread
                    thread.replies.push({
                        id: Math.random(), // Assuming you generate a unique ID for the reply
                        description: pushData.text,
                        upvotes: 0, // You can initialize with default values
                        user_posted: pushData.email,
                        flagged: false,
                        prof_marked_correct: false
                    });
                }
                // console.log('after thread', )
                await Thread.updateOne({ name: pushData.univName }, { $set: university });
                res.status(200).json({ message: 'Added the reply successfully' });
            }
        }
        else{
            console.log('Select a course first')
            res.status(500).json({ message: 'Select a course first' });
        }
    
       
    }
    
    // console.log('threads', threads)
});

module.exports = router;