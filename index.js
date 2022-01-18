const bp = require('body-parser')
const express = require('express');
const port = 3000;
const db = require('./config/mongoose');
const  Task  = require('./models/task');
const app = express();
const User = require('./models/user');
const users = require('./routes/users');
const auth = require('./routes/auth')
const jwt = require('jsonwebtoken');
const admin = require('./roleManagement/admin');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


app.use(express.static("./views"));
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/users', users);
app.use('/auth', auth);


app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});

app.get('/get-all-tasks', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res;
    }
)});


app.post('/task-lists/create-task', admin ,function(req, res){         /* pravimo taskove */
    
    Task.create({
        description: req.body.description,
        typeOfTask: req.body.typeOfTask,
        startingDate: req.body.startingDate,
        dueDate: req.body.dueDate
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        
        return res.redirect('/');

    });
});




app.post('/task-lists/update-task', function(req, res){         /* updateujemo taskove */
    Task.findByIdAndUpdate(
        req.body.id,
        {
            description: req.body.description,
            typeOfTask: req.body.typeOfTask,
            startingDate: req.body.startingDate,
            dueDate: req.body.dueDate
        },
        {new: true},
        function (err, res) {
          // Handle any possible database errors
          if (err) {
            console.log("we hit an error" + err);
            res.json({
              message: 'Database Update Failure'
            });
          }
          console.log("This is the Response: " + res);
        }
      );

      return res.redirect('/');
});

app.get('/task-lists/delete-task', function(req, res){          /* brisemo taskove */
    // uzimamo id iz query
    let id = req.query;
    

    // proveravamo koliko taskova brisemo u zavisnosti koliko smo ih stiklirali
    let count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('/'); 
});


app.listen(port, function(err){
    if(err){
        console.log(`error : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});