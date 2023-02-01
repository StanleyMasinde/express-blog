/* eslint-disable max-len */
require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')
const dashboardRouter = require('./routes/dashboard')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: 'super-secret-cookie', resave: false, saveUninitialized: true, name: 'blog_session',
}))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/dashboard', dashboardRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
	res.status(500).send(err.stack)
})

module.exports = app
