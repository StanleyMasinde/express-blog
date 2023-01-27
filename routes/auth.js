// eslint-disable-next-line new-cap
const router = require('express').Router()
const authenticate = require('../app/middleware/authenticate')

router
	.get('/login', (req, res) => {
		res.render('login')
	})
	.post('/login', authenticate())
	.post('/logout', (req, res) => {
		req.logOut()
		res.json('Logged out')
	})

module.exports = router
