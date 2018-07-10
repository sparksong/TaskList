const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const tasks = require('./routes/tasks');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const databaseURL = 'mongodb://localhost:27017/Tasks';

mongoose.connect(databaseURL);

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${databaseURL}`);
});

mongoose.connection.on('error', (err) => {
    console.log('mongoose connection error: ', err);
});

app.use(express.static('server/public'));

app.use('/tasks', tasks);
app.listen(PORT, () => {
    console.log('Running on port: ', PORT);
})