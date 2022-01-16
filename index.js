const express = require('express');
const port = 3000;
const db = require('./config/mongoose');
const  Task  = require('./models/task');
const app = express();


app.use(express.static("./views"));
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');


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



app.post('/task-lists/create-task', function(req, res){         /* pravimo taskove */
    
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

app.get('/task-lists/update-task', function(req, res){         /* updateujemo taskove */
    
    Task.put({
        description: req.body.description,
        typeOfTask: req.body.typeOfTask,
        startingDate: req.body.startingDate,
        dueDate: req.body.dueDate
        }, function(err, newtask){
        if(err){console.log('error in updating task', err); return;}
    
        return res.redirect('/');
    });
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