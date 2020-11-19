require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('./app/models/user')

/**
 * Configure passport
 */
// TODO add proper auth
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {

    new User().whereFirst({ email: username })
        .then(u => {
            done(null, u)
        }).catch(e => {
            done(e)
        })
}))
passport.serializeUser(function (user, done) {
    done(null, user);
});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'super-secret-cookie', resave: false, saveUninitialized: true, name: 'blog_session' }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

module.exports = app;
