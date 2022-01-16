
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    typeOfTask: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
});


const Task = mongoose.model('Task', taskSchema);

// exporting the Schema
module.exports = Task;
