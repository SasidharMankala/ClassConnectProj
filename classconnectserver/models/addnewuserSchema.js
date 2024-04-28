const mongoose = require('mongoose');

const addnewuserthread = new mongoose.Schema({
  name: String,
  users: 
    {
      admins: [Array],
      professors:[Array],
      students:[Array]
    }
});

module.exports = mongoose.model('users', addnewuserthread);
