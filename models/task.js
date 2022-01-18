
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

// function validateUser(user){
//     const schema = Joi.object({
//         username: Joi.string().min(3).max(100).required(),
//         name: Joi.string().min(3).max(100).required(),
//         email: Joi.string().min(6).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required(),
//         phoneNumber: Joi.string().min(7).max(100).required()
//     });
//     return schema.validate(user);
// }

const Task = mongoose.model('Task', taskSchema);

// exporting the Schema
module.exports = Task;
