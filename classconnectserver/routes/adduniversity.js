// universityRoutes.js
const express = require('express');
const router = express.Router();
// ... other imports
// const University = require('../models/university'); // Assuming individual model export
const Thread = require('../models/threadsSchema')
const Users = require('../models/addnewuserSchema')

router.post('/universities', async (req, res) => {
    try {
       
        console.log(req.body)
        const name = req.body.univName
        // const filter = {name :name}
        const existingUniversity = await Thread.findOne({ name });
        console.log(existingUniversity)
        if (existingUniversity) {
            return res.status(409).send("University already exists.");
        }
         // for threads
        const addDatabase = await Thread.insertMany(
            [
                {
                    name: name,
                    courses: []
                }
            ]
        )

         //for users
        const newUserdb = await Users.insertMany(
                {
                    name:name,
                    users:{
                        admins :[],
                        professors:[],
                        students:[]
                    }
                }
        )
        if (addDatabase) {
            res.status(200).send("University added successfully!");
        } else {
            res.status(404).send("Collection not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding university.");
    }
});

//route for delete database

router.delete('/universities', async (req, res) => {
    try {
        const name = req.body.univName; // Assuming the name to be deleted is provided in the request body

        // Find and delete the document with the specified name
        const deletedThread = await Thread.findOneAndDelete({ name });

        if (!deletedThread) {
            return res.status(404).send("University not found.");
        }

        // Also delete the associated user database for the university
        await Users.findOneAndDelete({ name });

        res.status(200).send("University deleted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting university.");
    }
});



module.exports = router;
