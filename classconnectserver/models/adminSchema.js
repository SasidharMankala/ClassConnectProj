const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,4}$/.test(email),
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const Admins = mongoose.model('Admins', adminSchema);

module.exports = Admins; 
