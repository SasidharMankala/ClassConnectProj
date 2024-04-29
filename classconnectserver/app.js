require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URI, { dbName: 'ClassConnect' });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/users')
app.use('/',userRoutes)

const regUnivnames = require('./routes/univreg')
app.use('/',regUnivnames)

const threadsRoutes = require('./routes/threads');
app.use('/',threadsRoutes)

const addDb = require('./routes/adduniversity');
app.use('/',addDb)

const addclass = require('./routes/createclass')
app.use('/',addclass)

const deleteclass = require('./routes/deleteclass')
app.use('/',deleteclass)

const addThreads = require('./routes/addthreads')
app.use('/',addThreads)

const joinClass = require('./routes/joinClass')
app.use('/',joinClass)

const addThreadReplies = require('./routes/addthreadreplies')
app.use('/',addThreadReplies)

const deleteThread = require('./routes/deletethread')
app.use('/',deleteThread)

const deleteReplyThreads = require('./routes/deletereplythreads')
app.use('/',deleteReplyThreads)

const upvote = require('./routes/upvote')
app.use('/',upvote)

const upvoteReply = require('./routes/upvotereply')
app.use('/',upvoteReply)

const setcorrect = require('./routes/setcorrect')
app.use('/',setcorrect)

const flagThread = require('./routes/flagthread')
app.use('/',flagThread)

const flagReplyThreads = require('./routes/flagreplythreads')
app.use('/',flagReplyThreads)


const _dirname = path.dirname("")
const buildPath = path.join(__dirname, "../classconnect/build");

app.use(express.static(buildPath));

app.get("/*", function(req, res) {
    res.sendFile(path.join(buildPath, "index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
