const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  name: String,
  courses: [
    {
      id: String,
      name: String,
      threads: [
        {
          id: Number,
          title: String,
          description: String,
          upvotes: Number,
          flagged: Boolean,
          posted_user: String,
          tags: [String],
          replies: [
            {
              id: Number,
              description: String,
              upvotes: Number,
              user_posted: String,
              flagged: Boolean
            }
          ]
        }
      ]
    }
  ]
});

module.exports = mongoose.model('threads', threadSchema);
