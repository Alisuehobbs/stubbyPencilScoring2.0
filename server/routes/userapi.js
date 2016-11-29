var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
  }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

createOrLogin: (profile, callback) => {
        knex('users')
            .where('email', profile.emails[0].value)
            .first()
            .then((user) => {
                if (user) {
                    console.log('There is a user with this email.');
                    knex('users')
                        .where('email', profile.emails[0].value)
                        .first()
                        .then((user) => {
                            callback(null, user);
                        })
                } else {
                    knex('users')
                        .insert({
                            first_name: profile._json.first_name,
                            last_name: profile._json.last_name,
                            email: profile.emails[0].value,
                            user_name: profile._json.name,
                            image: profile.photos[0].value,
                            type: 'facebook'
                        }, '*')
                        .then((user) => {
                            knex('users')
                                .where('email', profile.emails[0].value)
                                .first()
                                .then((user) => {
                                    callback(null, user);
                                })
                        })
                }
            })
    }

module.exports = router;
