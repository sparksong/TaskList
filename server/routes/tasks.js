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

router.get('/', function(req, res) {
    console.log('Entering Router GET');
    Task.find({}).then(function(mongoRes) {
        console.log('Response from mongoDB: ', mongoRes);
        res.send(mongoRes);
    }).catch(function(err) {
        console.log('Error in Router on GET', err);
        res.sendStatus(500);        
    });
});

router.delete('/:id', function(req, res) {
    console.log('Entering Router DELETE');
    Task.findByIdAndRemove({
        _id: req.params.id
    }).then(function(mongoRes) {
        console.log('Response from mongoDB: ', mongoRes);
        res.sendStatus(201);
    }).catch(function(err) {
        console.log('Error in Router on DELETE', err);
        res.sendStatus(500);
    });
});

module.exports = router;