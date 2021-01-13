/* eslint-disable max-len */
require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./app/models/user')
const { compare } = require('bcryptjs')

/**
 * Configure passport
 */
// TODO add proper auth
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, (username, password, done) => {
	new User().whereFirst({ email: username })
		.then((u) => {
			compare(password, u.password, (err, same) => {
				if (err) {
					done(err)
				}
				if (same) {
					done(null, u)
				} else {
					done('Invalid credentials')
				}
			})

		}).catch((e) => {
			done(e)
		})
}))
passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((id, done) => {
	new User().whereFirst({ id })
		.then((user) => {
			done(null, user)
		}).catch((e) => {
			done(e)
		})
})

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: 'super-secret-cookie', resave: false, saveUninitialized: true, name: 'blog_session',
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

module.exports = app
