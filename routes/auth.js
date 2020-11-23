// eslint-disable-next-line new-cap
const router = require('express').Router()
const passport = require('passport')
const User = require('../app/models/user')

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json(req.user)
})

router.post('/register', async (req, res) => {
	// TODO add validation
	try {
		const result = await new User().create(req.body)
		res.status(result.status).json(result.message)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
