'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./config.js');
var db = require('./db/api')

var api = require('./routes/api');
var signupapi = require('./routes/signupapi');
var loginapi = require('./routes/loginapi');

var app = express();

app.use(cookieParser());
app.use(cookieSession({
  name: 'stubbypencilscoring',
  secret: process.env.SESSION_SECRET,
  secure: app.get('env') === 'production'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '../client')));

app.use(passport.initialize());

app.use('/api', api);
app.use('/signupapi', signupapi);
app.use('/loginapi', loginapi);

app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

app.get('/auth/callback/facebook',
    passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

passport.use(new FacebookStrategy({
        clientID: configAuth.clientID,
        clientSecret: configAuth.clientSecret,
        callbackURL: configAuth.callbackURL,
        profileFields: ['email', 'name', 'displayName', 'picture'],
        enableProof: true,
        passReqToCallback: true
    },

    function(req, accessToken, refreshToken, profile, done) {
        db.createOrLogin(profile, (err, user) => {
            req.session.userInfo = user;
            return done(null, user);
        });
    }

))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = app;
