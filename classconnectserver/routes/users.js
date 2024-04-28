const express = require('express')
const Users = require('../models/usermodels')
const Admins = require('../models/adminSchema')

const router = express.Router()
const { ObjectId } = require('mongodb');



router.post('/register', async (req, res) => {
    const { fname, lname, email, univName, id, role, password, _id } = req.body;
    let courses_created ={courses:[]}
    let courses_enrolled={courses:[]}
    // console.log(univName)
    const filter = { _id: _id };
    try {
        let userData;
        if (role === 'admin') {
            userData = { 'users.admins': { $elemMatch: { email: email } } };
        } else if (role === 'professor') {
            userData = { 'users.professors': { $elemMatch: { email: email } } };
        } else {
            userData = { 'users.students': { $elemMatch: { email: email } } };
        }
        
        const userExists = await Users.findOne({ name: univName, ...userData });

        if (userExists) {
            return res.status(400).send({ message: 'User already exists' });
        }

        if (role == 'admin') {
            const adminData = { fname, lname, id, email, password };
            try {
          
                const result = await Users.updateOne(
                    { name: univName },
                    { $push: { 'users.admins': adminData } }
                );
                // console.log('User registered successfully');
                res.status(200).send('User registered successfully');
            } catch (err) {
                console.log('Error occurred while updating document:', err);
                res.status(500).send('Error occurred while updating document');
            }
        } else if (role == 'professor') {
          
            const profData = { fname, lname, id, email, password, courses_created }
            try {
                const result = await Users.updateOne(
                    { name: univName },
                    { $push: { 'users.professors': profData } }
                );
                console.log('User registered successfully');
                res.status(200).send('User registered successfully');
            } catch (err) {
                console.log('Error occurred while updating document:', err);
                res.status(500).send('Error occurred while updating document');
            }
        } else {
    
            const stuData = { fname, lname, id, email, password, courses_enrolled }
            try {
                const result = await Users.updateOne(
                    { name: univName },
                    { $push: { 'users.students': stuData } }
                );
                console.log('User registered successfully');
                res.status(200).send('User registered successfully');
            } catch (err) {
                console.log('Error occurred while updating document:', err);
                res.status(500).send('Error occurred while updating document');
            }
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }
    res.send()
});


module.exports = router