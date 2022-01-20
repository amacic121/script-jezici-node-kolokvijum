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
const tasks = require('./routes/tasks');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


app.use(express.static("./views"));
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/admin/users', users);
app.use('/admin/auth', auth);
app.use('/admin', tasks);



app.listen(port, function(err){
    if(err){
        console.log(`error : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});







