// eslint-disable-next-line new-cap
const router = require('express').Router()
const authenticate = require('../app/middleware/authenticate')

router
	.get('/login', (req, res) => {
		res.render('login')
	})
	.post('/login', authenticate())
	.post('/logout', (req, res, next) => {
		try {
			req.session.destroy()
			res.redirect('/auth/login')
		} catch (err) {
			next(err)
		}
	})

module.exports = router
