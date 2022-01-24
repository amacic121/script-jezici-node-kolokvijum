const express = require('express');
const { Task, validate } = require('../models/task');
const router = express.Router();
const Joi = require('joi');

router.get('/', function (req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
    )
});

/* pravimo taskove */
router.post('/task-lists/create-task', function (req, res) {

    const { error } = validate(req.body);
    if (error) {
        console.log('error in creating task', error);
        return res.redirect('/admin');
    }

    Task.create({
        description: req.body.description,
        typeOfTask: req.body.typeOfTask,
        startingDate: req.body.startingDate,
        dueDate: req.body.dueDate
    }, function (err) {
        if (err) { console.log('error in creating task', err); return; }

        return res.redirect('/admin');

    });
});


router.post('/task-lists/update-task', function (req, res) {         /* updateujemo taskove */

    Task.findByIdAndUpdate(
        req.body.id,
        {
            description: req.body.description,
            typeOfTask: req.body.typeOfTask,
            startingDate: req.body.startingDate,
            dueDate: req.body.dueDate
        },
        { new: true },
        function (err, res) {

            if (err) {
                console.log("we hit an error" + err);
                res.json({
                    message: 'Database Update Failure'
                });
            }
            console.log("This is the Response: " + res);
        }
    );

    return res.redirect('/admin');
});


router.get('/task-lists/delete-task', function (req, res) {          /* brisemo taskove */
    // uzimamo id iz query
    let id = req.query;


    // proveravamo koliko taskova brisemo u zavisnosti koliko smo ih stiklirali
    let count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {


        Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error in deleting task');
            }
        })
    }
    return res.redirect('/admin');
});


module.exports = router;





router.get('/get-all-tasks', function (req, res) {
    Task.find({}, function (err) {
        if (err) {
            console.log('Error in fetching tasks from db');
            return;
        }

        return res;
    }
    )
});