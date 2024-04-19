require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
