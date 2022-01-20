
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

function validateTask(tasl){
    const schema = Joi.object({
        description: Joi.string().min(3).max(500).required(),
        typeOfTask: Joi.string().required(),
        startingDate: Joi.string().min(6).max(255).required().email(),
        dueDate: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(task);
}

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
