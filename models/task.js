const Joi = require('joi');
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

function validateTask(task) {
    const schema = Joi.object({
        description: Joi.string().min(1).max(500).required(),
        typeOfTask: Joi.string().required(),
        startingDate: Joi.date().required(),
        // dueDate: Joi.string().min(5).max(255).required(),
        dueDate: Joi.date().greater(Joi.ref('startingDate')).required()
    });
    return schema.validate(task);
}

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
exports.validate = validateTask;
