const { json } = require('body-parser');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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
    phoneNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isModerator: { 
      type: Boolean,
      default: false
    },
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isModerator: this.isModerator }, 'jwtPrivateKey');
    return token;
  }

const User = mongoose.model('User', userSchema);


function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(7).max(100).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;