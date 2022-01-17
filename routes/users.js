const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const req = require('express/lib/request');

router.post('/register', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already exists')

    user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber
    });
   
    await user.save();

    res.send(user);
}); 

router.get('/findUserByUsername', async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    if(!user && user === null){
        return res.status(300).send('No user found')
    }
    return user;
});

module.exports = router;