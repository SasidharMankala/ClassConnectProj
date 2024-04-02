const express = require('express')
const Users = require('../models/usermodels')

const router = express.Router()


router.get('/univnames', async (req, res) => {
    try {
        const  users = await Users.find()
        res.json(users)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }
})

module.exports = router 