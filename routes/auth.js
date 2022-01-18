const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const { func } = require('joi');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', async function (req, res) {

    let user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).send("Nepostoji user");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();

    res.send(token);
    // res.json({
    //     token: token
    // });

});

router.get('/hidden', ensureToken, function (req, res) {
    jwt.verify(req.token, 'password', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'this is password',
                data: data
            });
        }

    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["autorizacija"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

async function findUserByUsername(req){
    let user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (user === null || user.password != req.body.password) {
        return;
    }
    user = await User.findOne({ username: req.body.username, password: req.body.password }).select("-password");
    return user;
}

module.exports = router;