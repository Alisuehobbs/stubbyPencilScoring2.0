var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session')

router.post('/', function(req, res, next) {
  knex('users')
      .where('email', req.body.email)
      .then(function(user) {
          if (user.length === 0) {
              const hashed_password = bcrypt.hashSync(req.body.password, 8)

              const newUser = {
                  email: req.body.email,
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  image: req.body.image,
                  user_name: req.body.user_name,
                  type: req.body.type,
                  hashed_password: hashed_password
              }

              knex('users')
                  .insert(newUser, '*')
                  .then(function(user) {
                    req.session.userInfo = user[0]
                    res.json(user)
                  })

          } else {
            const error = ['Email is already in use.']
            res.json(error)
          }

      })
})

module.exports = router;
