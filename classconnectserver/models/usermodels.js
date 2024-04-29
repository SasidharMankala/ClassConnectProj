const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const courseenrolled = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    dynamicFields: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    university :{
        type: Object
    },
    users: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    professors: {
        type: [mongoose.Schema.Types.Mixed],
        default: [courseSchema]
    },
    students: {
        type: [mongoose.Schema.Types.Mixed],
        default: [courseenrolled]
    },
    admins: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;

