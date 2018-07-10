const express = require('express')
const Task = require('../public/models/tasks.schema');
let router = express.Router();

router.post('/', function (req, res) {
    console.log('Got to router POST', req.body);
    let newTask = new Task(req.body);
    newTask.save().then( (data) => {
    res.sendStatus(201);        
    }).catch( (err) => {
        console.log('Error from POST', err);
        res.sendStatus(500);        
    });
});

module.exports = router;