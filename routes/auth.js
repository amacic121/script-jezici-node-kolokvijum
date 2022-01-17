const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const { func } = require('joi');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


router.post('/login', function (req, res) {

    let user = findUserByUsername(req, res);

    const token = jwt.sign({ user }, 'password');
    res.json({
        token: token
    });

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

async function findUserByUsername(req, res) {
    let user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user === null) {
        console.log("Ne postoji takav user");
    }
    return user;
}

module.exports = router;