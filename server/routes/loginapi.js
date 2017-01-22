var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session')

router.post('/', function(req, res, next) {
  console.log('made it to the correct route');
  console.log('req.body:', req.body);
    knex('users')
        .where('email', req.body.email)
        .first()
        .then((user) => {
          console.log('user:', user);
            var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password)
            if (passwordMatch == false) {
                res.send('Bad email or password')
            } else {
                req.session.userInfo = user
                console.log(req.session.userInfo);
                res.send('success')
            }
        })
        .catch((err) => {
            next(err);
        })
})

module.exports = router;
