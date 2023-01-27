// eslint-disable-next-line new-cap
const router = require('express').Router()
const User = require('../app/models/user')

router

	// Show the login form to the user
	.get('/login', (req, res) => {
		res.render('login')
	})

	.post('/login', (req, res) => {
		res.json(req.user)
	})

	.post('/register', async (req, res) => {
		// TODO add validation
		try {
			const result = await new User().register(req.body)
			res.status(result.status).json(result.message)
		} catch (error) {
			res.status(500).json(error)
		}
	})

	.post('/logout', (req, res) => {
		req.logOut()
		res.json('Logged out')
	})

module.exports = router
