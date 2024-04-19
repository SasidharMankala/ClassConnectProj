const express = require('express')

const router = express.Router()
const { University, Course, Thread, Reply } = require('../models/university');

// getting university data
router.get('/universities', async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
