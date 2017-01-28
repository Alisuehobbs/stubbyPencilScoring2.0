var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session')

router.post('/', function(req, res, next) {
    knex('users')
        .where('email', req.body.email)
        .first()
        .then((user) => {
            var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password)
            if (passwordMatch == false) {
                res.send('Bad email or password')
            } else {
                req.session.userInfo = user
                res.json(user)
            }
        })
        .catch((err) => {
            next(err);
        })
})

module.exports = router;
