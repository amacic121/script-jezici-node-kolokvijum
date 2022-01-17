const { json } = require('body-parser');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2056, 
    },
    role: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);


function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().min(2).max(100).required(),
        phoneNumber: Joi.string().min(7).max(100).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;